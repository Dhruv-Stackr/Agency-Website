import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

export type Section = { id: string; heading: string; html: string; layout: string };
export type Rendered = { h1: string; heroHtml: string; ctaHref: string | null; sections: Section[] };

const slug = (s: string) => s.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48);

// Post-processing that turns plain marked output into the editorial system's components.
function decorate(html: string): string {
  let h = html;
  // Lines that follow a statistic without a blank line arrive inside the same <p>. Split them out first.
  h = h.replace(/\n(Source[^<:]*:)/g, "</p><p>$1").replace(/\nVerify: /g, "</p><p>Verify: ").replace(/\nFair reason: /g, "</p><p>Fair reason: ");
  // Source lines: mono, Ash, pulled up under the preceding element.
  h = h.replace(/<p>(Source[^<:]*:)/g, '<p class="source">$1');
  h = h.replace(/<p>Verify: /g, '<p class="verify">Verify: ');
  h = h.replace(/<p>Fair reason: /g, '<p class="fair">Fair reason: ');
  // Stat: "**FIGURE**: label"
  h = h.replace(/<p><strong>([^<]+)<\/strong>: ([^]*?)<\/p>/g, (_m, fig, label) => {
    if (/[\d%]/.test(fig) && fig.length <= 24) return `<div class="stat"><div class="stat-figure">${fig}</div><div class="stat-label">${label}</div></div>`;
    return `<p><strong>${fig}</strong>: ${label}</p>`;
  });
  // FAQ: "**Question?**\nAnswer"
  h = h.replace(/<p><strong>([^<]*\?)<\/strong>\n([^]*?)<\/p>/g, '<details class="faq"><summary>$1</summary><div class="faq-a"><p>$2</p></div></details>');
  // Lone CTA links
  h = h.replace(/<p><a href="(\/book|https:\/\/cal\.com[^"]*)">([^<]+)<\/a><\/p>/g, '<p class="cta"><a class="btn" href="$1">$2</a></p>');
  h = h.replace(/<p><a href="#check">([^<]+)<\/a><\/p>/g, '<p class="cta"><a class="btn" href="#check">$1</a></p>');
  h = h.replace(/<p><a href="(\/book|https:\/\/cal\.com[^"]*)">([^<]+)<\/a> · ([^<]*)<\/p>/g, '<p class="cta"><a class="btn" href="$1">$2</a> <span class="cta-alt">$3</span></p>');
  h = h.replace(/<p>(<a href="[^"]+">[^<]+<\/a>)<\/p>/g, '<p class="more">$1</p>');
  h = h.replace(/<p>(<a href="[^"]+">[^<]+<\/a>) · (<a href="[^"]+">[^<]+<\/a>)<\/p>/g, '<p class="more">$1 <span class="sep">·</span> $2</p>');
  // Lead-in paragraphs
  h = h.replace(/<p><strong>(For|Not for|Inside|Never|Measured by):<\/strong>/g, '<p class="lead lead-$1"><strong>$1:</strong>').replace(/lead-Not for/g, "lead-notfor").replace(/lead-Measured by/g, "lead-measured");
  // Services trio: Inside / Measured by / Never
  h = h.replace(/(<p class="lead lead-Inside">[^]*?<\/p>)\n(<p class="lead lead-measured">[^]*?<\/p>)\n(<p class="lead lead-Never">[^]*?<\/p>)/g, '<div class="svc-grid">$1$2$3</div>');
  // Items led by a bold phrase (refusals, dashboard contents): hairline rows
  h = h.replace(/<p><strong>([^<]+\.)<\/strong> /g, '<p class="item"><strong>$1</strong> ');
  // Code blocks
  h = h.replace(/<pre><code>/g, '<pre class="code"><code>');
  return h;
}

function wrapStatGroups(html: string): string {
  // Group stat + source + explanatory paragraph into .stat-group for grid layouts.
  return html.replace(/(<div class="stat">[^]*?<\/div><\/div>)\n?(<p class="source">[^]*?<\/p>)\n?(<p>(?!<strong>|<a )[^]*?<\/p>)?/g, (_m, stat, src, para) => `<div class="stat-group">${stat}${src}${para || ""}</div>`);
}

export function renderDoc(body: string): Rendered {
  const src = body.replace(/\r/g, "");
  const h1m = src.match(/^# (.+)$/m);
  const h1 = h1m ? h1m[1] : "";
  const afterH1 = h1m ? src.slice(h1m.index! + h1m[0].length) : src;
  const parts = afterH1.split(/\n(?=## )/);
  const heroSrc = parts.shift() || "";
  const hints = (s: string) => Object.fromEntries([...s.matchAll(/<!--\s*([a-z]+):\s*([^>]*?)\s*-->/g)].map((m) => [m[1], m[2]]));
  const strip = (s: string) => s.replace(/<!--[^]*?-->/g, "");
  const heroHtml = decorate(marked.parse(strip(heroSrc)) as string);
  const ctaM = heroHtml.match(/<a class="btn" href="(\/book)">/);
  const sections: Section[] = parts.map((p) => {
    const hm = p.match(/^## (.+)$/m);
    const heading = hm ? hm[1] : "";
    const bodySrc = hm ? p.slice(hm[0].length) : p;
    const ht = hints(bodySrc);
    let html = decorate(marked.parse(strip(bodySrc)) as string);
    let layout = ht.layout || "prose";
    if (!ht.layout) {
      if (/<div class="stat">/.test(html)) layout = "stats";
      else if (/<details class="faq">/.test(html)) layout = "faq";
      else if (/lead-For/.test(html) && /lead-notfor/.test(html)) layout = "fit";
      else if (/lead-Inside/.test(html) && /lead-Never/.test(html)) layout = "fit";
      else if (/^<ol>/m.test(html)) layout = "steps";
      else if (/<ul>\n<li><strong>[^<]+<\/strong>: /.test(html)) layout = "ledger";
    }
    if (layout === "stats") html = wrapStatGroups(html);
    if (layout === "fit") {
      html = html.replace(/(<p class="lead lead-(?:For|Inside)">[^]*?<\/p>)\n(<p class="lead lead-(?:notfor|Never)">[^]*?<\/p>)/, '<div class="fit-grid">$1$2</div>');
    }
    return { id: ht.id || slug(heading), heading, html, layout };
  });
  return { h1, heroHtml, ctaHref: ctaM ? ctaM[1] : null, sections };
}
