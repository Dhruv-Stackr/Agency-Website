import { NextResponse } from "next/server";
import dns from "node:dns/promises";
import net from "node:net";

// The live check. Fetches the visitor's homepage and robots.txt, runs the first checks of the audit,
// and returns Source Line rows with verify commands. Nothing is stored. Rate-limited per IP.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE = new Map<string, number[]>();
const WINDOW = 60_000, LIMIT = 8, MAX_BYTES = 2_500_000, TIMEOUT = 9_000;
const UA = "Mozilla/5.0 (compatible; RelayCheck/1.0; +https://we-relay.studio/process)";
const CITATION_BOTS = ["OAI-SearchBot", "Claude-SearchBot", "PerplexityBot", "Googlebot"];
const TRAINING_BOTS = ["GPTBot", "ClaudeBot", "Google-Extended", "CCBot"];

type Row = { key: string; name: string; status: "today" | "tomorrow" | "structural" | "fine"; finding: string; verify: string };

function isPrivate(ip: string) {
  if (net.isIPv4(ip)) { const [a, b] = ip.split(".").map(Number); return a === 10 || a === 127 || a === 0 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 169 && b === 254); }
  const l = ip.toLowerCase(); return l === "::1" || l.startsWith("fc") || l.startsWith("fd") || l.startsWith("fe80") || l.startsWith("::ffff:");
}

async function fetchCapped(url: string, accept = "text/html") {
  const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), TIMEOUT);
  const t0 = Date.now();
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA, Accept: accept }, redirect: "follow", signal: ctrl.signal, cache: "no-store" });
    const reader = res.body?.getReader(); let received = 0; const chunks: Uint8Array[] = [];
    if (reader) { while (true) { const { done, value } = await reader.read(); if (done) break; received += value.length; chunks.push(value); if (received > MAX_BYTES) { ctrl.abort(); break; } } }
    const buf = Buffer.concat(chunks.map((c) => Buffer.from(c)));
    return { ok: res.ok, status: res.status, url: res.url, type: res.headers.get("content-type") || "", bytes: received, text: buf.toString("utf8"), ms: Date.now() - t0, truncated: received > MAX_BYTES };
  } finally { clearTimeout(t); }
}

function robotsAllows(robots: string, agent: string): "allowed" | "blocked" | "unnamed" {
  const lines = robots.split(/\r?\n/).map((l) => l.replace(/#.*/, "").trim()).filter(Boolean);
  const groups: { agents: string[]; rules: { type: string; path: string }[] }[] = [];
  let cur: typeof groups[number] | null = null; let lastWasAgent = false;
  for (const l of lines) {
    const m = l.match(/^(user-agent|allow|disallow|sitemap|host)\s*:\s*(.*)$/i); if (!m) continue;
    const k = m[1].toLowerCase(), v = m[2].trim();
    if (k === "user-agent") { if (!cur || !lastWasAgent) { cur = { agents: [], rules: [] }; groups.push(cur); } cur.agents.push(v.toLowerCase()); lastWasAgent = true; }
    else { lastWasAgent = false; if (k === "allow" || k === "disallow") cur?.rules.push({ type: k, path: v }); }
  }
  const named = groups.find((g) => g.agents.includes(agent.toLowerCase()));
  const star = groups.find((g) => g.agents.includes("*"));
  const g = named || star; if (!g) return "unnamed";
  const rootBlocked = g.rules.some((r) => r.type === "disallow" && (r.path === "/" || r.path === "/*"));
  if (!named) return rootBlocked ? "blocked" : "unnamed";
  return rootBlocked ? "blocked" : "allowed";
}

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") || "local").split(",")[0].trim();
  const now = Date.now(); const hits = (RATE.get(ip) || []).filter((t) => now - t < WINDOW);
  if (hits.length >= LIMIT) return NextResponse.json({ error: "Too many checks from this connection. Try again in a minute." }, { status: 429 });
  RATE.set(ip, [...hits, now]);

  let input = "";
  try { input = String((await req.json()).url || "").trim(); } catch { return NextResponse.json({ error: "Send a URL." }, { status: 400 }); }
  if (!/^https?:\/\//i.test(input)) input = "https://" + input;
  let u: URL; try { u = new URL(input); } catch { return NextResponse.json({ error: "That does not look like a web address." }, { status: 400 }); }
  if (!/^https?:$/.test(u.protocol) || !u.hostname.includes(".")) return NextResponse.json({ error: "Enter a public website address, like example.in" }, { status: 400 });
  try { const a = await dns.lookup(u.hostname); if (isPrivate(a.address)) throw new Error("private"); } catch { return NextResponse.json({ error: "We could not resolve that address." }, { status: 400 }); }

  let home; try { home = await fetchCapped(u.origin + "/"); } catch { return NextResponse.json({ error: "The site did not answer within nine seconds." }, { status: 502 }); }
  const origin = new URL(home.url).origin;
  let robots = ""; try { const r = await fetchCapped(origin + "/robots.txt", "text/plain"); if (r.ok && /text\/plain|text\/html/.test(r.type) && r.text.length < 200_000) robots = r.text; } catch { /* absent */ }
  const html = home.text;
  const pick = (re: RegExp) => (html.match(re) || [])[1];
  const title = (pick(/<title[^>]*>([^<]*)<\/title>/i) || "").replace(/\s+/g, " ").trim();
  const desc = (pick(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) || pick(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i) || "").replace(/\s+/g, " ").trim();
  const canonical = pick(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) || pick(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i) || "";
  const ld = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  const ldTypes = [...new Set(ld.flatMap((b) => [...b.matchAll(/"@type"\s*:\s*"([^"]+)"/g)].map((m) => m[1])))];
  const h1s = (html.match(/<h1[\s>]/gi) || []).length;
  const viewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  const host = u.hostname.replace(/^www\./, "");
  const brand = host.split(".")[0];

  const rows: Row[] = [];
  const defaultTitle = !title || /online store|home page|^home$|welcome|untitled|- home$|shopify|wordpress|just another/i.test(title) || title.toLowerCase() === host;
  const defaultDesc = !desc || /secure payment options|seamless online shopping|order online from|welcome to our website|lorem/i.test(desc) || desc.length < 40;
  rows.push({ key: "intro", name: "How Google and AI introduce you", status: defaultTitle || defaultDesc ? "today" : "fine",
    finding: !title ? "There is no title tag. Google will write one for you, and it will not be flattering." : defaultTitle || defaultDesc ? `Your title or description is the platform's default, not your own words. These are the two lines a search result and an AI answer quote first.` : `Title and description are your own words. Title ${title.length} characters, description ${desc.length}.`,
    verify: `curl -sL ${origin}/ | grep -o '<title>[^<]*'` });
  const citation = CITATION_BOTS.map((b) => [b, robotsAllows(robots, b)] as const);
  const blocked = citation.filter(([, s]) => s === "blocked").map(([b]) => b);
  const unnamed = citation.filter(([, s]) => s === "unnamed").map(([b]) => b);
  const training = TRAINING_BOTS.map((b) => [b, robotsAllows(robots, b)] as const);
  rows.push({ key: "robots", name: "Which AI systems may read you", status: !robots ? "structural" : blocked.length ? "today" : unnamed.length === CITATION_BOTS.length ? "structural" : "fine",
    finding: !robots ? "No robots.txt. Every crawler is guessing, and so is every AI answer." : blocked.length ? `${blocked.join(", ")} ${blocked.length > 1 ? "are" : "is"} blocked. Sites that block the search crawlers do not appear in those AI answers.` : unnamed.length === CITATION_BOTS.length ? "No AI crawler is named. They are admitted only by the wildcard, which means nobody decided." : `${citation.filter(([, s]) => s === "allowed").map(([b]) => b).join(", ")} allowed by name. Training crawlers: ${training.filter(([, s]) => s === "allowed").length} of ${TRAINING_BOTS.length} allowed by name.`,
    verify: `curl -sL ${origin}/robots.txt` });
  const kb = Math.round(home.bytes / 1024);
  rows.push({ key: "weight", name: "Homepage weight before any image", status: home.bytes > 1_500_000 ? "today" : home.bytes > 600_000 ? "tomorrow" : "fine",
    finding: `${kb} KB of HTML on the first response${home.truncated ? " (capped; more than 2.5 MB)" : ""}, answered in ${home.ms} ms from our server. ${home.bytes > 600_000 ? "On a phone on a train that is the difference between a browse and a bounce." : "Light enough that the phone is not the problem."}`,
    verify: `curl -sL ${origin}/ -o /dev/null -w '%{size_download}'` });
  rows.push({ key: "schema", name: "What you tell Google about yourself", status: ldTypes.length ? "fine" : "structural",
    finding: ldTypes.length ? `${ldTypes.length} structured-data type${ldTypes.length > 1 ? "s" : ""} on the homepage: ${ldTypes.slice(0, 5).join(", ")}${ldTypes.length > 5 ? "…" : ""}.` : "No structured data. Google and AI systems get no machine-readable facts about the business: no name, no address, no phone.",
    verify: `curl -sL ${origin}/ | grep -c 'application/ld+json'` });
  rows.push({ key: "canon", name: "One address per page", status: canonical ? "fine" : "structural",
    finding: canonical ? `Canonical set to ${canonical.slice(0, 60)}${canonical.length > 60 ? "…" : ""}.` : "No canonical tag. Duplicate addresses split whatever authority the page earns.",
    verify: `curl -sL ${origin}/ | grep -o 'rel="canonical"[^>]*'` });
  rows.push({ key: "h1", name: "One headline the page is about", status: h1s === 1 ? "fine" : h1s === 0 ? "tomorrow" : "structural",
    finding: h1s === 1 ? "One H1. Clear." : h1s === 0 ? "No H1 at all. The page does not say what it is about." : `${h1s} H1 headings. The page is about several things, so it is about none.`,
    verify: `curl -sL ${origin}/ | grep -c '<h1'` });
  rows.push({ key: "mobile", name: "Built for a phone", status: viewport ? "fine" : "today",
    finding: viewport ? "Viewport meta present; the page scales on a phone." : "No viewport meta. On a phone the page renders as a shrunk desktop.",
    verify: `curl -sL ${origin}/ | grep -c 'name="viewport"'` });

  const today = rows.filter((r) => r.status === "today").length, tomorrow = rows.filter((r) => r.status === "tomorrow").length, fine = rows.filter((r) => r.status === "fine").length;
  return NextResponse.json({ host, brand, origin, title, description: desc, rows, summary: { today, tomorrow, fine, total: rows.length }, checkedAt: new Date().toISOString() }, { headers: { "Cache-Control": "no-store" } });
}
