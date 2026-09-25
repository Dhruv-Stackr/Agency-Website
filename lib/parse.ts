// Structured readers over the markdown copy, so rich components render the same words the Markdown twin serves.
import { loadDoc } from "./content";

export type Service = { name: string; blurb: string; inside: string; measured: string };
export function readServices(): Service[] {
  const doc = loadDoc("page", "services")!;
  const parts = doc.body.split(/\n(?=## )/).slice(1);
  const out: Service[] = [];
  for (const p of parts) {
    const name = (p.match(/^## (.+)$/m) || [])[1] || "";
    if (/fit together/i.test(name)) continue;
    const grab = (k: string) => ((p.match(new RegExp(`\\*\\*${k}:\\*\\*\\s*([^\\n]+)`)) || [])[1] || "").trim();
    const blurb = (p.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#") && !l.startsWith("**"))[0]) || "";
    out.push({ name: name.replace(/\.$/, ""), blurb, inside: grab("Inside"), measured: grab("Measured by") });
  }
  return out;
}

export type Step = { title: string; body: string };
export function readSteps(slug: string, heading: RegExp): Step[] {
  const doc = loadDoc("page", slug)!;
  const sec = doc.body.split(/\n(?=## )/).find((s) => heading.test(s)) || "";
  return [...sec.matchAll(/^\d+\.\s+\*\*([^*]+)\*\*\s*(.*)$/gm)].map((m) => ({ title: m[1].replace(/[.,]$/, ""), body: m[2].trim() }));
}

export type Stat = { figure: string; label: string; source: string; note: string };
export function readStats(slug: string, heading: RegExp): { heading: string; stats: Stat[]; tail: string } {
  const doc = loadDoc("page", slug)!;
  const sec = doc.body.split(/\n(?=## )/).find((s) => heading.test(s)) || "";
  const h = (sec.match(/^## (.+)$/m) || [])[1] || "";
  const lines = sec.split("\n");
  const stats: Stat[] = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\*\*([^*]+)\*\*:\s*(.+)$/);
    if (m && /[\d%]/.test(m[1])) {
      const source = (lines[i + 1] || "").replace(/^Source:\s*/, "");
      const note = (lines.slice(i + 2).find((l) => l.trim() && !l.startsWith("**") && !l.startsWith("[")) || "").trim();
      stats.push({ figure: m[1], label: m[2], source, note });
    }
  }
  const tail = (sec.match(/^\[([^\]]+)\]\(([^)]+)\)$/m) || [])[0] || "";
  return { heading: h, stats, tail };
}

// The prose that follows the statistics in a section, rendered on its own.
export function readSectionTail(slug: string, heading: RegExp): string {
  const doc = loadDoc("page", slug)!;
  const sec = doc.body.split(/\n(?=## )/).find((s) => heading.test(s)) || "";
  const lines = sec.split("\n").slice(1);
  const out: string[] = [];
  for (const l of lines) {
    const t = l.trim();
    if (!t || t.startsWith("**") || t.startsWith("Source:") || t.startsWith("<!--") || t.startsWith("[")) continue;
    out.push(t);
  }
  return out.map((p) => `<p>${p}</p>`).join("\n");
}

// Bulleted items "- **Title.** text" or "- **Title**: text" inside one section.
export type Bullet = { title: string; text: string };
export function readBullets(slug: string, heading: RegExp): Bullet[] {
  const doc = loadDoc("page", slug)!;
  const sec = doc.body.split(/\n(?=## )/).find((s) => heading.test(s)) || "";
  return [...sec.matchAll(/^- \*\*([^*]+)\*\*:?\s*(.*)$/gm)].map((m) => ({ title: m[1].replace(/[.:]$/, ""), text: m[2].trim() }));
}
// Paragraph items "**Title.** text" inside one section (the lead paragraphs are excluded).
export function readItems(slug: string, heading: RegExp): Bullet[] {
  const doc = loadDoc("page", slug)!;
  const sec = doc.body.split(/\n(?=## )/).find((s) => heading.test(s)) || "";
  return [...sec.matchAll(/^\*\*([^*]+)\*\*\s+(.+)$/gm)].filter((m) => !/^(Inside|Measured by|Who|Best fit when|Never|For|Not for):$/.test(m[1].trim())).map((m) => ({ title: m[1].replace(/\.$/, ""), text: m[2].trim() }));
}
// Audit-format findings: a bold label, the finding, a Verify line, an optional Fair reason line.
export type Finding = { label: string; status: "fine" | "today" | "tomorrow"; text: string; verify: string; fair: string };
export function readFindings(slug: string, heading: RegExp): Finding[] {
  const doc = loadDoc("page", slug)!;
  const sec = doc.body.split(/\n(?=## )/).find((s) => heading.test(s)) || "";
  return sec.split(/\n\n+/).filter((b) => b.startsWith("**")).map((b) => {
    const lines = b.split("\n"); const m = lines[0].match(/^\*\*([^*]+)\*\*\s*(.*)$/);
    const label = (m?.[1] || "").replace(/\.$/, ""); const text = m?.[2] || "";
    const verify = (lines.find((l) => l.startsWith("Verify:")) || "").replace(/^Verify:\s*`?/, "").replace(/`\s*$/, "");
    const fair = (lines.find((l) => l.startsWith("Fair reason:")) || "").replace(/^Fair reason:\s*/, "");
    const status: Finding["status"] = /today/i.test(label) ? "today" : /tomorrow/i.test(label) ? "tomorrow" : "fine";
    return { label, status, text, verify, fair };
  });
}
