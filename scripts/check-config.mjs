// Placeholders parked by the founder: warn in development, fail when RELAY_LAUNCH=1.
import fs from "node:fs";
const src = fs.readFileSync("lib/site.ts", "utf8");
const placeholders = [...src.matchAll(/"\{([A-Z_]+)\}"/g)].map((m) => m[1]);
// An empty GA4 id is resolved only when the analytics statement says the site runs no analytics (decision 24 Sep 2026).
const ga = /ga4MeasurementId:\s*""/.test(src) && !/runs no analytics/.test(src);
const problems = [...placeholders, ...(ga ? ["GA4_MEASUREMENT_ID"] : [])];
if (problems.length) {
  const msg = `check-config: unresolved: ${problems.join(", ")}`;
  if (process.env.RELAY_LAUNCH === "1") { console.error(`${msg}. Launch blocked.`); process.exit(1); }
  console.warn(`${msg} (allowed until RELAY_LAUNCH=1)`);
} else console.log("check-config: all config resolved.");
