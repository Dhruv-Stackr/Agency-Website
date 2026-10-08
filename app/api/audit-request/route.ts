import { NextResponse } from "next/server";
import crypto from "node:crypto";
import dns from "node:dns/promises";
import fs from "node:fs/promises";
import path from "node:path";
import { put, get } from "@vercel/blob";
import { site } from "@/lib/site";

// The free-audit request. Stores the visitor's website and email so Dhruv can prepare a written audit and send it
// as a private link. Stored privately in Vercel Blob (leads/<id>.json); in development without a token, appended
// to .data/audit-requests.jsonl. No IP address is kept. Rate-limited per IP; a hidden field and a minimum fill
// time turn away most bots without a captcha.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE = new Map<string, number[]>();
const WINDOW = 10 * 60_000, LIMIT = 5, MIN_FILL_MS = 1500;
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,24}$/i;

type Lead = { id: string; email: string; website: string; host: string; createdAt: string; lastAt: string; count: number; status: "new" | "audited" | "sent" | "declined"; country: string | null; city: string | null; page: string | null };

// The day the audit is due, counted in working days, India time.
function dueDate(days: number) {
  const ist = new Date(Date.now() + 5.5 * 3600_000);
  const d = new Date(Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate()));
  for (let added = 0; added < days;) { d.setUTCDate(d.getUTCDate() + 1); if (d.getUTCDay() !== 0 && d.getUTCDay() !== 6) added++; }
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
}

async function save(lead: Lead) {
  const key = `leads/${lead.id}.json`;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const prev = await get(key, { access: "private", useCache: false }).then((r) => (r ? new Response(r.stream).json() as Promise<Lead> : null)).catch(() => null);
    const rec = prev ? { ...prev, lastAt: lead.lastAt, count: (prev.count || 1) + 1 } : lead;
    await put(key, JSON.stringify(rec), { access: "private", addRandomSuffix: false, allowOverwrite: true, contentType: "application/json" });
    return true;
  }
  if (process.env.NODE_ENV !== "production") {
    const dir = path.join(process.cwd(), ".data");
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(path.join(dir, "audit-requests.jsonl"), JSON.stringify(lead) + "\n");
    return true;
  }
  return false;
}

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") || "local").split(",")[0].trim();
  const now = Date.now(); const hits = (RATE.get(ip) || []).filter((t) => now - t < WINDOW);
  if (hits.length >= LIMIT) return NextResponse.json({ error: "Too many requests from this connection. Try again in a few minutes." }, { status: 429 });
  RATE.set(ip, [...hits, now]);

  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Send your website and email." }, { status: 400 }); }
  const email = String(body.email || "").trim().toLowerCase();
  let input = String(body.website || "").trim();
  const due = dueDate(site.auditTurnaroundDays);

  // Bots fill the hidden field or submit faster than a person can type; tell them it worked and keep nothing.
  if (String(body.hp || "") || !(Number(body.t) > 0) || now - Number(body.t) < MIN_FILL_MS) return NextResponse.json({ ok: true, host: "", due });

  if (!input) return NextResponse.json({ error: "Type your website address.", field: "website" }, { status: 400 });
  if (!EMAIL.test(email)) return NextResponse.json({ error: "Enter an email address we can send the audit to.", field: "email" }, { status: 400 });
  if (!/^https?:\/\//i.test(input)) input = "https://" + input;
  let u: URL; try { u = new URL(input); } catch { return NextResponse.json({ error: "That does not look like a web address.", field: "website" }, { status: 400 }); }
  if (!/^https?:$/.test(u.protocol) || !u.hostname.includes(".")) return NextResponse.json({ error: "Enter a public website address, like yourclinic.in", field: "website" }, { status: 400 });
  try { await dns.lookup(u.hostname); } catch { return NextResponse.json({ error: "We could not find that website. Check the address.", field: "website" }, { status: 400 }); }

  const host = u.hostname.toLowerCase().replace(/^www\./, "");
  const stamp = new Date(now).toISOString();
  const lead: Lead = {
    id: crypto.createHash("sha256").update(`${email}|${host}`).digest("hex").slice(0, 16),
    email, website: `https://${u.hostname.toLowerCase()}`, host, createdAt: stamp, lastAt: stamp, count: 1, status: "new",
    country: req.headers.get("x-vercel-ip-country"), city: decodeURIComponent(req.headers.get("x-vercel-ip-city") || "") || null,
    page: String(body.page || "").slice(0, 80) || null,
  };
  try {
    if (!(await save(lead))) throw new Error("no store configured");
  } catch (e) {
    console.error("audit-request: could not save", e);
    return NextResponse.json({ error: `The form is down for a moment. Email ${site.contactEmail} with your website and we will send the audit.` }, { status: 503 });
  }
  return NextResponse.json({ ok: true, host, due }, { headers: { "Cache-Control": "no-store" } });
}
