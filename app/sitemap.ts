import type { MetadataRoute } from "next";
import { listSlugs, loadDoc, routeFor } from "@/lib/content";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = listSlugs("page").map((s) => loadDoc("page", s)!).map((d) => ({ url: `${site.url}${routeFor(d)}`, lastModified: new Date("2026-09-16"), changeFrequency: "monthly" as const, priority: d.slug === "home" ? 1 : 0.7 }));
  const notes = listSlugs("note").map((s) => loadDoc("note", s)!).map((d) => ({ url: `${site.url}/notes/${d.slug}`, lastModified: new Date(d.fm.date || "2026-09-16"), changeFrequency: "yearly" as const, priority: 0.5 }));
  return [...pages, ...notes];
}
