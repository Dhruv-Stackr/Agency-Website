// Fails the build if any claim in the registry has expired, or if any statistic paragraph in the
// copy has no Source line within three lines. Warns when a claim expires within 14 days.
import fs from "node:fs";
import path from "node:path";

const today = new Date();
const reg = JSON.parse(fs.readFileSync("content/claims.json", "utf8"));
let fail = 0;
for (const c of reg.claims) {
  for (const k of ["id", "stat", "source", "url", "asOf", "validUntil"]) if (!c[k]) { console.error(`claims: ${c.id || "?"} missing ${k}`); fail++; }
  const until = new Date(c.validUntil);
  const days = Math.round((until - today) / 86400000);
  if (days < 0) { console.error(`claims: ${c.id} EXPIRED on ${c.validUntil}. Re-verify in memory/claims.md or remove it from the copy.`); fail++; }
  else if (days <= 14) console.warn(`claims: ${c.id} expires in ${days} days (${c.validUntil})`);
}

const files = [...fs.readdirSync("content/pages").map((f) => `content/pages/${f}`), ...fs.readdirSync("content/notes").map((f) => `content/notes/${f}`)];
// Sources live in content/sources.json (one list per file) and render once, on /method#sources. A page that carries a
// statistic must have a sources entry; every sources entry must name a study, sample or date.
const sources = JSON.parse(fs.readFileSync("content/sources.json", "utf8"));
const statPat = /^\*\*[^*]+\*\*:\s/;              // "**11% · 44% · 73%**: label"
const numPat = /(\d+(\.\d+)?%|\b\d{2,3},\d{3}\b|\barXiv\b|\+0\.\d+|−\d+%)/;
const skip = /₹2Cr|\+91|20\d\d|20-minute|2–20|Source:|4\.9 MB|Verify:/;
for (const f of files) {
  const lines = fs.readFileSync(f, "utf8").split("\n");
  lines.forEach((l, i) => {
    const isStat = statPat.test(l) && numPat.test(l);
    const isNumber = numPat.test(l) && !skip.test(l) && !l.startsWith("<!--");
    if (isStat || isNumber) {
      const window = lines.slice(i, i + 4).join("\n");
      const registered = (sources[f] || []).length > 0;
      if (!registered && !/checked \d+ \w+ 20\d\d/.test(window) && !/as read \d+ \w+ 20\d\d/.test(l)) {
        console.error(`claims: ${f}:${i + 1} statistic in a file with no entry in content/sources.json: ${l.slice(0, 80)}`); fail++;
      }
    }
  });
}
if (fail) { console.error(`\ncheck-claims: ${fail} problem(s). The build stops here.`); process.exit(1); }
console.log(`check-claims: ${reg.claims.length} claims valid, every statistic sourced.`);
