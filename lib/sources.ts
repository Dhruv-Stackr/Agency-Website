import sources from "@/content/sources.json";
// One list of every source used on the site, rendered once on /method#sources.
export function allSources(): { page: string; items: string[] }[] {
  const s = sources as Record<string, string[]>;
  const label = (f: string) => f.replace(/^content\/(pages|notes)\//, "").replace(/\.md$/, "").replace(/^home$/, "/").replace(/^(?!\/)/, "/").replace(/^\/([^/]+)$/, (m, a) => (f.includes("/notes/") ? `/notes/${a}` : `/${a}`));
  return Object.entries(s).map(([f, items]) => ({ page: label(f), items }));
}
