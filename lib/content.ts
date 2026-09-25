import fs from "node:fs";
import path from "node:path";
import { site } from "./site";

export type Frontmatter = { route?: string; slug?: string; title: string; description: string; lang?: string; date?: string; author?: string };
export type Doc = { fm: Frontmatter; body: string; raw: string; kind: "page" | "note"; slug: string };

const ROOT = path.join(process.cwd(), "content");

function parse(raw: string): { fm: Frontmatter; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const fm: Record<string, string> = {};
  if (m) for (const line of m[1].split("\n")) { const i = line.indexOf(":"); if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim(); }
  return { fm: fm as unknown as Frontmatter, body: m ? m[2] : raw };
}

// Copy placeholders resolve from site config. While a value is still a placeholder it renders
// as-is, so a preview cannot hide it and the launch check cannot miss it.
export function fill(text: string): string {
  return text
    .replaceAll("{CONTACT_EMAIL}", site.contactEmail)
    .replaceAll("{ANALYTICS_STATEMENT}", site.analyticsStatement)
    .replaceAll("{BOOKING_URL}", site.bookingUrl);
}

export function loadDoc(kind: "page" | "note", slug: string): Doc | null {
  const file = path.join(ROOT, kind === "page" ? "pages" : "notes", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { fm, body } = parse(raw);
  return { fm, body: fill(body), raw, kind, slug };
}

export function listSlugs(kind: "page" | "note"): string[] {
  const dir = path.join(ROOT, kind === "page" ? "pages" : "notes");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
}

export function routeFor(doc: Doc): string {
  if (doc.kind === "note") return `/notes/${doc.slug}`;
  return doc.fm.route || (doc.slug === "home" ? "/" : `/${doc.slug}`);
}

// The Markdown twin served to any client that asks for text/markdown. Build notes are stripped;
// placeholders are filled the same way the HTML is.
export function markdownTwin(doc: Doc): string {
  const { fm, body } = parse(doc.raw);
  const clean = fill(body).replace(/<!--[\s\S]*?-->\n?/g, "").replace(/\n{3,}/g, "\n\n").trim();
  const head = [`# ${fm.title}`, "", fm.description, "", `Canonical: ${site.url}${routeFor(doc)}`, fm.date ? `Date: ${fm.date}` : "", fm.author ? `Author: ${fm.author}` : ""].filter((l, i) => !(l === "" && i > 4)).join("\n");
  // The body already begins with the H1; keep one, prefer the body's.
  return `${head.replace(/^# .*\n\n/, "")}\n\n${clean}\n`.replace(/^\n+/, "");
}
