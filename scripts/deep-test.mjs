// Deep test of the whole site against a running production build (default http://localhost:3001).
// Playwright is loaded from the playwright-skill install so the site itself carries no test dependency.
//   node scripts/deep-test.mjs [baseUrl] > report.json
import { chromium, devices } from "/Users/dhruv/Agency-Website/.agents/skills/playwright-skill/node_modules/playwright/index.mjs";
import fs from "node:fs";

const BASE = process.argv[2] || "http://localhost:3001";
const ROUTES = ["/", "/services", "/dashboard", "/process", "/india", "/dev-tools", "/about", "/book", "/choose", "/sources", "/privacy", "/terms"];
const VIEWPORTS = { wide: { width: 1680, height: 1000 }, desktop: { width: 1440, height: 900 }, tablet: { width: 1024, height: 768 }, mobile: { width: 390, height: 844 } };
const report = { base: BASE, at: new Date().toISOString(), pages: {}, http: {}, links: {}, summary: {} };
const problems = [];
const bad = (route, vp, what, detail) => problems.push({ route, vp, what, detail });

// ---- 1. Plain HTTP checks: status, headers, markdown twin, robots, sitemap, og, 404 ----
const head = async (url, opts = {}) => { const r = await fetch(url, { redirect: "manual", ...opts }); return r; };
for (const route of ROUTES) {
  const r = await head(BASE + route); const html = await r.text();
  const h = Object.fromEntries(r.headers);
  const twin = await head(BASE + route, { headers: { Accept: "text/markdown" } });
  const twinType = twin.headers.get("content-type") || "";
  const md = await head(BASE + "/md" + (route === "/" ? "" : route));
  const canonical = (html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/) || [])[1] || (html.match(/<link[^>]+href="([^"]+)"[^>]+rel="canonical"/) || [])[1];
  const og = /property="og:title"/.test(html); const desc = /name="description"/.test(html);
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([^]*?)<\/script>/g)].map((m) => { try { return JSON.parse(m[1])["@type"]; } catch { return "INVALID"; } });
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  const hreflang = (html.match(/hreflang="[^"]+"/gi) || []).length;
  const placeholders = (html.match(/\{[A-Z_]+\}/g) || []).length;
  const emdash = (html.replace(/<script[^]*?<\/script>/g, "").match(/—/g) || []).length;
  report.http[route] = { status: r.status, cache: h["cache-control"], csp: !!h["content-security-policy"], xfo: h["x-frame-options"], twin: twinType, mdRoute: md.status + " " + (md.headers.get("content-type") || ""), canonical, og, desc, ld, h1s, hreflang, placeholders, emdash, bytes: html.length };
  if (r.status !== 200) bad(route, "http", "status", r.status);
  if (!h["content-security-policy"]) bad(route, "http", "no Content-Security-Policy header", "");
  if ((route === "/india" || route === "/dev-tools") && hreflang < 2) bad(route, "http", "hreflang alternates missing", hreflang);
  if (!/text\/markdown/.test(twinType)) bad(route, "http", "markdown twin via Accept", twinType);
  if (md.status !== 200) bad(route, "http", "/md route", md.status);
  if (!canonical) bad(route, "http", "canonical missing", "");
  if (!og || !desc) bad(route, "http", "og/description missing", `${og}/${desc}`);
  if (ld.includes("INVALID")) bad(route, "http", "JSON-LD invalid", "");
  if (h1s !== 1) bad(route, "http", "h1 count", h1s);
  if (emdash) bad(route, "http", "em-dash in html", emdash);
}
for (const [path, must] of [["/robots.txt", /Sitemap:/], ["/sitemap.xml", /<urlset/], ["/og?t=Relay", null], ["/nope-404", null]]) {
  const r = await head(BASE + path); const t = must ? await r.text() : ""; const type = r.headers.get("content-type") || "";
  report.http[path] = { status: r.status, type };
  if (path === "/nope-404" ? r.status !== 404 : r.status !== 200) bad(path, "http", "status", r.status);
  if (must && !must.test(t)) bad(path, "http", "content", "pattern missing");
  if (path.startsWith("/og") && !/image\/png/.test(type)) bad(path, "http", "og image type", type);
}
// sitemap URLs all reachable
const sm = await (await head(BASE + "/sitemap.xml")).text(); const smUrls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const u of smUrls) { const path = new URL(u).pathname; const r = await head(BASE + path); if (r.status !== 200) bad(path, "http", "sitemap url status", r.status); }
report.http["sitemap"] = { urls: smUrls.length };
// robots: named AI crawlers
const robots = await (await head(BASE + "/robots.txt")).text();
report.http["robots"] = { named: ["GPTBot", "OAI-SearchBot", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended"].filter((b) => robots.includes(b)) };
// live check API on a real site
try { const r = await fetch(BASE + "/api/check", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: "thewholetruthfoods.com" }) }); const j = await r.json(); report.http["/api/check"] = { status: r.status, rows: j.rows?.length, host: j.host }; if (r.status !== 200 || !j.rows?.length) bad("/api/check", "http", "live check", r.status); } catch (e) { bad("/api/check", "http", "live check threw", String(e)); }
for (const badInput of ["localhost", "10.0.0.1", "not a url"]) { const r = await fetch(BASE + "/api/check", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: badInput }) }); if (r.status === 200) bad("/api/check", "http", "accepted bad input", badInput); }

// ---- 2. Browser checks per route per viewport ----
const b = await chromium.launch();
const internal = new Set(); const external = new Set();
for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
  for (const route of ROUTES) {
    const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 1 }); const p = await ctx.newPage();
    const errs = []; p.on("pageerror", (e) => errs.push(e.message.slice(0, 160))); p.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 160)); });
    const failed = []; p.on("requestfailed", (rq) => { if (!/fontshare|gstatic/.test(rq.url())) failed.push(rq.url().slice(0, 120)); });
    const resp = await p.goto(BASE + route, { waitUntil: "networkidle" }); await p.waitForTimeout(600);
    // slow scroll to trigger every reveal and pin
    const H = await p.evaluate(() => document.body.scrollHeight); let y = 0; await p.mouse.move(vp.width / 2, vp.height / 2);
    let indexOverlap = 0;
    while (y < H) { await p.mouse.wheel(0, 450); y += 450; await p.waitForTimeout(55);
      indexOverlap += await p.evaluate(() => { const lbl = document.querySelector(".mindex a.on .lbl"); if (!lbl || getComputedStyle(lbl).opacity === "0" || !lbl.offsetParent) return 0; const r = lbl.getBoundingClientRect();
        const pts = [[r.left + 2, r.top + r.height / 2], [r.left + r.width / 2, r.top + r.height / 2], [r.right - 2, r.top + r.height / 2], [r.right - 2, r.top + 1], [r.right - 2, r.bottom - 1]];
        return pts.some(([x, y]) => { const under = document.elementsFromPoint(x, y).filter((e) => !e.closest(".mindex"))[0]; if (!under || !under.closest("main")) return false; const ownText = [...under.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()); return ownText || ["IMG", "SVG", "CANVAS", "VIDEO"].includes(under.tagName) || under.classList.contains("bn-vis") || under.classList.contains("hc-slots"); }) ? 1 : 0; });
    }
    await p.waitForTimeout(700);
    const m = await p.evaluate(() => {
      const w = document.documentElement.clientWidth;
      const over = [...document.querySelectorAll("body *")].filter((el) => { const r = el.getBoundingClientRect(); return r.right > w + 1 && r.width > 0 && !el.closest(".strip") && !el.closest(".navmenu") && getComputedStyle(el).position !== "fixed"; }).slice(0, 4).map((el) => el.tagName + "." + [...el.classList].join("."));
      const stuck = [...document.querySelectorAll("[data-reveal], .icard, .bn-card, .svc-scene, .complaint, .role, .hc-box, .who-card, .finding")].filter((el) => { const cs = getComputedStyle(el); return cs.opacity === "0" || cs.visibility === "hidden"; }).length;
      const imgs = [...document.images]; const noAlt = imgs.filter((i) => !i.hasAttribute("alt")).length; const broken = imgs.filter((i) => i.complete && i.naturalWidth === 0 && !i.loading).map((i) => i.getAttribute("src")).slice(0, 3);
      const smallTargets = [...document.querySelectorAll("a, button")].filter((el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); const inlineText = cs.display === "inline" && el.closest("p, li, td, figcaption, .ledger, footer"); return r.width > 0 && r.height > 0 && (r.width < 24 || r.height < 24) && !inlineText; }).map((el) => (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30)).slice(0, 4);
      const h1 = document.querySelector("h1"); const h1Lines = h1 ? Math.round(h1.getBoundingClientRect().height / parseFloat(getComputedStyle(h1).lineHeight)) : 0;
      const wrappedBtn = [...document.querySelectorAll(".btn")].filter((el) => { const range = document.createRange(); range.selectNodeContents(el); const lines = new Set([...range.getClientRects()].map((r) => Math.round(r.top))); return lines.size > 1; }).length;
      const links = [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href"));
      const placeholders = (document.body.innerText.match(/\{[A-Z_]+\}/g) || []).length;
      const skipLink = !!document.querySelector('a[href="#main"]');
      return { sw: document.documentElement.scrollWidth - w, over, stuck, noAlt, broken, smallTargets, h1Lines, wrappedBtn, links, placeholders, skipLink, height: document.body.scrollHeight };
    });
    // keyboard: first Tab lands somewhere visible with a focus ring
    await p.evaluate(() => window.scrollTo(0, 0)); await p.keyboard.press("Tab"); await p.keyboard.press("Tab");
    const focus = await p.evaluate(() => { const el = document.activeElement; if (!el || el === document.body) return "none"; const cs = getComputedStyle(el); return (el.tagName + " " + (el.textContent || "").trim().slice(0, 24) + " | outline:" + cs.outlineStyle + " " + cs.outlineWidth); });
    m.links.forEach((h) => { if (!h || h.startsWith("#") || h.startsWith("mailto:") || h.startsWith("tel:") || h.startsWith("https://wa.me")) return; (h.startsWith("http") ? external : internal).add(h.split("#")[0]); });
    report.pages[`${route} @${vpName}`] = { status: resp?.status(), errs, failed, ...m, links: undefined, focus };
    if (resp?.status() !== 200) bad(route, vpName, "status", resp?.status());
    if (errs.length) bad(route, vpName, "console/page errors", errs.join(" | "));
    if (failed.length) bad(route, vpName, "failed requests", failed.join(" | "));
    if (m.sw > 0) bad(route, vpName, "horizontal overflow", `${m.sw}px ${m.over.join(",")}`);
    if (indexOverlap) bad(route, vpName, "margin index overlaps content", `${indexOverlap} scroll positions`);
    if (m.stuck) bad(route, vpName, "blocks stuck hidden after scroll", m.stuck);
    if (m.noAlt) bad(route, vpName, "images without alt", m.noAlt);
    if (m.broken.length) bad(route, vpName, "broken images", m.broken.join(","));
    if (m.smallTargets.length && vpName === "mobile") bad(route, vpName, "tap targets under 24px", m.smallTargets.join(" | "));
    if (vpName === "desktop" && m.h1Lines > 3) bad(route, vpName, "h1 over 3 lines", m.h1Lines);
    if (m.wrappedBtn && vpName !== "mobile") bad(route, vpName, "wrapped button", m.wrappedBtn);
    if (m.placeholders) report.pages[`${route} @${vpName}`].placeholdersVisible = m.placeholders;
    if (/none/.test(focus) || /outline:none/.test(focus)) bad(route, vpName, "keyboard focus not visible", focus);
    await ctx.close();
  }
}
// ---- 2b. in-site navigation: sections must reveal after a client-side route change, not only on a direct load ----
{
  const ctx = await b.newContext({ viewport: VIEWPORTS.desktop }); const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" }); await p.waitForTimeout(500);
  for (const label of ["Services", "Dashboard", "Process", "About"]) {
    await p.locator("header.nav ul.desktop a", { hasText: label }).first().click(); await p.waitForURL((u) => u.pathname !== "/", { timeout: 15000 }).catch(() => {}); await p.waitForTimeout(700);
    const H = await p.evaluate(() => document.body.scrollHeight); let y = 0; await p.mouse.move(700, 450); while (y < H) { await p.mouse.wheel(0, 450); y += 450; await p.waitForTimeout(50); }
    await p.waitForTimeout(700);
    const stuck = await p.evaluate(() => [...document.querySelectorAll("[data-reveal]")].filter((el) => getComputedStyle(el).opacity === "0").length);
    const path = new URL(p.url()).pathname; report.pages[`${path} @nav`] = { stuckAfterNav: stuck };
    if (stuck) bad(path, "nav", "sections hidden after in-site navigation", stuck);
    await p.goto(BASE + "/", { waitUntil: "networkidle" }); await p.waitForTimeout(400);
  }
  await ctx.close();
}
// ---- 2c. phone, as a real device profile (C-018): text jammed into a narrow column, grid tracks wider than their box, nowrap overflow, text under 12px, code blocks clipped, the open menu ----
{
  const ctx = await b.newContext({ ...devices["Pixel 7"] }); const p = await ctx.newPage();
  for (const route of ROUTES) {
    await p.goto(BASE + route, { waitUntil: "networkidle" }); await p.waitForTimeout(500);
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 700) { await p.evaluate((yy) => { if (window.__lenis) window.__lenis.scrollTo(yy, { immediate: true, force: true }); window.scrollTo(0, yy); }, y); await p.waitForTimeout(50); }
    await p.evaluate(() => { if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true, force: true }); window.scrollTo(0, 0); }); await p.waitForTimeout(250);
    const m = await p.evaluate(async () => {
      const vw = document.documentElement.clientWidth;
      const vis = (e) => { const cs = getComputedStyle(e); if (cs.display === "none" || cs.visibility === "hidden" || cs.clip === "rect(0px, 0px, 0px, 0px)" || e.closest("details:not([open]) > :not(summary)")) return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
      const path = (e) => { const parts = []; let n = e; while (n && n !== document.body && parts.length < 4) { parts.unshift(n.tagName.toLowerCase() + (typeof n.className === "string" && n.className ? "." + n.className.trim().split(/\s+/).slice(0, 2).join(".") : "")); n = n.parentElement; } return parts.join(">"); };
      const jam = [], tracks = [], nowrap = [], tiny = [], clipped = [];
      for (const e of document.body.querySelectorAll("*")) {
        if (["SCRIPT", "STYLE", "SVG", "PATH", "NOSCRIPT"].includes(e.tagName) || !vis(e)) continue;
        const cs = getComputedStyle(e); const r = e.getBoundingClientRect();
        const own = [...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join("").trim();
        if (own.length >= 24) { const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.4; const lines = Math.round(r.height / lh); if (r.width < 0.42 * vw && lines >= 4 && own.length / Math.max(1, lines) < 16) jam.push(path(e) + " " + Math.round(r.width) + "px/" + lines + "L"); }
        if (cs.display === "grid" || cs.display === "inline-grid") { const cols = cs.gridTemplateColumns.split(" ").map(parseFloat).filter((n) => !isNaN(n)); const sum = cols.reduce((a, c) => a + c, 0) + (parseFloat(cs.columnGap) || 0) * Math.max(0, cols.length - 1); const inner = e.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight); if (sum > inner + 2) tracks.push(path(e) + " " + Math.round(sum) + ">" + Math.round(inner)); }
        if (cs.whiteSpace === "nowrap" && cs.overflow === "visible" && own.length && e.scrollWidth > e.clientWidth + 2) nowrap.push(path(e));
        if (own.length && parseFloat(cs.fontSize) < 12) tiny.push(path(e) + " " + parseFloat(cs.fontSize) + "px");
        if (e.tagName === "PRE" && e.scrollWidth > e.clientWidth + 2) clipped.push(path(e) + " " + e.scrollWidth + ">" + e.clientWidth);
      }
      let menu = null; const d = document.querySelector("details.navmenu");
      if (d) { d.open = true; await new Promise((r) => setTimeout(r, 120)); const items = [...d.querySelectorAll(".panel a")].map((a) => a.getBoundingClientRect()); menu = { pageW: document.documentElement.scrollWidth, bad: items.filter((b) => b.right > vw + 1 || b.left < -1 || b.height > 80).length }; d.open = false; }
      return { vw, pageW: document.documentElement.scrollWidth, jam, tracks, nowrap, tinyCount: tiny.length, tiny: tiny.slice(0, 5), clipped, menu };
    });
    report.pages[`${route} @phone`] = m;
    if (m.pageW > m.vw) bad(route, "phone", "horizontal overflow", m.pageW - m.vw + "px");
    if (m.jam.length) bad(route, "phone", "text jammed into a narrow column", m.jam.join(" | "));
    if (m.tracks.length) bad(route, "phone", "grid tracks wider than their box", m.tracks.join(" | "));
    if (m.nowrap.length) bad(route, "phone", "nowrap text overflowing", m.nowrap.join(" | "));
    if (m.tinyCount) bad(route, "phone", "text under 12px", m.tinyCount + ": " + m.tiny.join(" | "));
    if (m.clipped.length) bad(route, "phone", "code block clipped", m.clipped.join(" | "));
    if (m.menu && (m.menu.bad || m.menu.pageW > m.vw)) bad(route, "phone", "open menu overflows", JSON.stringify(m.menu));
  }
  await ctx.close();
}
// ---- 3. reduced motion: everything visible at rest on the home page ----
{
  const ctx = await b.newContext({ viewport: VIEWPORTS.desktop, reducedMotion: "reduce" }); const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" }); await p.waitForTimeout(800);
  const hidden = await p.evaluate(() => [...document.querySelectorAll("main h2, main h3, main p, main .bn-card, main .hc-dots span")].filter((el) => getComputedStyle(el).opacity === "0").length);
  report.summary.reducedMotionHidden = hidden; if (hidden) bad("/", "reduced-motion", "hidden at rest", hidden);
  await ctx.close();
}
// ---- 4. the intake form validates and the check form runs in the browser ----
{
  const ctx = await b.newContext({ viewport: VIEWPORTS.desktop }); const p = await ctx.newPage();
  await p.goto(BASE + "/book", { waitUntil: "networkidle" });
  const submit = p.locator("form button[type=submit]").first(); if (await submit.count()) { await submit.click(); await p.waitForTimeout(400); const alerts = await p.locator('[role=alert], .err, [aria-invalid=true]').count(); report.summary.intakeValidation = alerts; if (!alerts) bad("/book", "form", "no validation on empty submit", ""); }
  await p.goto(BASE + "/", { waitUntil: "networkidle" }); await p.fill("#check-url", "thewholetruthfoods.com"); await p.click(".check-row .btn"); await p.waitForSelector(".crows .crow", { timeout: 20000 }).catch(() => bad("/", "form", "live check produced no rows in 20 s", ""));
  report.summary.liveCheckRows = await p.locator(".crows .crow").count();
  await ctx.close();
}
await b.close();
// ---- 5. link crawl ----
for (const h of internal) { const path = h.startsWith("/") ? h : "/" + h; const r = await head(BASE + path); report.links[path] = r.status; if (r.status >= 400) bad(path, "link", "internal link status", r.status); }
for (const h of external) { try { const r = await fetch(h, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(8000) }); report.links[h] = r.status; if (r.status >= 400 && r.status !== 403 && r.status !== 405) bad(h, "link", "external link status", r.status); } catch (e) { report.links[h] = "ERR"; bad(h, "link", "external link unreachable", String(e).slice(0, 80)); } }
report.summary.routes = ROUTES.length; report.summary.viewports = Object.keys(VIEWPORTS).length; report.summary.problems = problems.length; report.problems = problems;
fs.mkdirSync("/Users/dhruv/relay-operator/.work/relay-site/deep", { recursive: true });
fs.writeFileSync("/Users/dhruv/relay-operator/.work/relay-site/deep/report.json", JSON.stringify(report, null, 1));
console.log(JSON.stringify({ problems: problems.length, list: problems.slice(0, 40) }, null, 1));
