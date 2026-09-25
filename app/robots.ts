import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
// Citation-class crawlers allowed by name; training-class crawlers allowed by decision (recorded in DESIGN.md and memory/website-brief.md).
const allowAll = { allow: "/", disallow: ["/md/", "/og"] };
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", ...allowAll },
      { userAgent: "Googlebot", ...allowAll },
      { userAgent: "OAI-SearchBot", ...allowAll },
      { userAgent: "Claude-SearchBot", ...allowAll },
      { userAgent: "PerplexityBot", ...allowAll },
      { userAgent: "Bingbot", ...allowAll },
      { userAgent: "GPTBot", ...allowAll },
      { userAgent: "ClaudeBot", ...allowAll },
      { userAgent: "Google-Extended", ...allowAll },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
