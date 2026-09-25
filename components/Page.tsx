import type { ReactNode } from "react";
import type { Rendered } from "@/lib/markdown";
import { site } from "@/lib/site";
import Magnetic from "@/components/Magnetic";
import { HeroText } from "@/components/motion";
import { SplitHeading } from "@/components/effects";

export function Hero({ r, figure, scene }: { r: Rendered; figure?: { src: string; alt: string; caption: string }; scene?: ReactNode }) {
  if (scene) return (
    <section className="hero hero-v3 inner"><div className="wrap">
      <HeroText h1={r.h1} ledeHtml={r.heroHtml.replace(/<p>/, '<p class="lede">')} cta="" ctaHref={site.bookingUrl} />
      <div className="hero-scene">{scene}</div>
    </div></section>
  );
  return (
    <section className={`hero${figure ? "" : " plain"}`}>
      <div className="wrap">
        <div>
          <h1>{r.h1}</h1>
          <div className="lede-wrap" dangerouslySetInnerHTML={{ __html: r.heroHtml.replace(/<p>/, '<p class="lede">') }} />
        </div>
        {figure && (
          <figure className="figure">
            <img src={figure.src} alt={figure.alt} width="1280" height="720" fetchPriority="high" />
            <figcaption>{figure.caption}</figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}

// Sections from the markdown, with per-section hooks: something before the body, after it, in place of it,
// or a transform of the body html. Keys are section ids (the heading slug) or a regex source matched against the heading.
type Hooks = Record<string, ReactNode>;
type Transform = Record<string, (html: string) => string>;
function pick<T>(map: Record<string, T> | undefined, s: { id: string; heading: string }): T | undefined {
  if (!map) return undefined;
  if (map[s.id] !== undefined) return map[s.id];
  for (const k of Object.keys(map)) if (k.startsWith("/") && new RegExp(k.slice(1), "i").test(s.heading)) return map[k];
  return undefined;
}

export function Sections({ r, skip = [], before, after, replace, transform, wide = [] }: { r: Rendered; skip?: string[]; before?: Hooks; after?: Hooks; replace?: Hooks; transform?: Transform; wide?: string[] }) {
  return (
    <>
      {r.sections.filter((s) => !skip.includes(s.id)).map((s, i) => {
        const isBand = i === r.sections.length - 1 && /<a class="btn"|href="#check"/.test(s.html) && s.html.replace(/<p class="cta">[^]*<\/p>/, "").trim().length < 40;
        if (isBand) return (
          <section key={s.id} id={s.id} className="band"><div className="wrap"><h2>{s.heading}</h2><Magnetic><div dangerouslySetInnerHTML={{ __html: s.html }} /></Magnetic></div></section>
        );
        const rep = pick(replace, s); const pre = pick(before, s); const post = pick(after, s); const tf = pick(transform, s);
        const html = tf ? tf(s.html) : s.html;
        const inner = s.layout === "stats" ? `<div class="stats">${html}</div>` : html;
        const isWide = wide.includes(s.id) || !!rep || !!pre || !!post;
        return (
          <section key={s.id} id={s.id} className={`sec sec-${isWide ? "wide" : s.layout}`}>
            <div className="wrap" data-reveal>
              <SplitHeading text={s.heading} />
              {pre}
              {rep !== undefined ? rep : <div className="body" dangerouslySetInnerHTML={{ __html: inner }} />}
              {post}
            </div>
          </section>
        );
      })}
    </>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export const orgJsonLd = {
  "@context": "https://schema.org", "@type": "ProfessionalService", name: "Relay", url: site.url,
  description: site.description, email: site.contactEmail,
  address: { "@type": "PostalAddress", streetAddress: site.address.street, addressLocality: site.address.locality, addressRegion: site.address.region, addressCountry: site.address.country },
  founder: { "@type": "Person", name: "Dhruv Sharma" }, areaServed: ["IN", "US"],
  logo: `${site.url}/relay-logo.svg`,
};
