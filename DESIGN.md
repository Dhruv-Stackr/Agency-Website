---
version: 1
name: Relay-design-system
description: "Editorial print minimalism for an agency you can watch working. Paper ground (#F4F1EC), Ink text (#0E0E0E), Ash for secondary and every source line (#8A8781), and one editor's red (#E8380D) used as annotation only, under 5% of any surface. Switzer for everything narrative, JetBrains Mono for eyebrows, source lines and figures. Hairlines instead of boxes. Flat print: no gradients, no icon sets, no stock photography, no shadows. Every statistic is a component that carries its source and the date it was checked. The page reads like a well-edited audit, because that is what it sells."

colors:
  paper: "#F4F1EC"
  paper-deep: "#EDE9E2"
  ink: "#0E0E0E"
  ink-soft: "#2A2926"
  ash: "#8A8781"
  ash-soft: "#B5B2AB"
  red: "#E8380D"
  hairline: "rgba(14,14,14,0.18)"
  hairline-soft: "rgba(14,14,14,0.055)"
  on-ink: "#F4F1EC"
  focus: "#E8380D"

typography:
  display:
    fontFamily: Switzer
    fontSize: clamp(40px, 6vw, 84px)
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: -0.025em
  headline:
    fontFamily: Switzer
    fontSize: clamp(28px, 3.6vw, 44px)
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: -0.02em
  subhead:
    fontFamily: Switzer
    fontSize: clamp(20px, 2vw, 24px)
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: -0.01em
  lede:
    fontFamily: Switzer
    fontSize: clamp(18px, 1.6vw, 21px)
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: Switzer
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: Switzer
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
  figure:
    fontFamily: Switzer
    fontSize: clamp(40px, 5vw, 64px)
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: -0.03em
    fontFeature: tnum
  eyebrow:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.06em
    textTransform: uppercase
  source:
    fontFamily: JetBrains Mono
    fontSize: 11.5px
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: tnum
  code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: Switzer
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.2

rounded:
  none: 0px
  code: 2px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  section: clamp(72px, 10vw, 128px)
  gutter: clamp(20px, 4vw, 48px)
  measure: 68ch

components:
  nav:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    height: 64px
    borderBottom: "1px solid {colors.hairline}"
  nav-cta:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "10px 16px"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
    active: "translateY(1px)"
  link-cta:
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    underline: "2px solid {colors.red}, offset 6px"
    note: "The one place the red budget concentrates."
  stat:
    figure: "{typography.figure}"
    rule: "1px solid {colors.hairline}"
    label: "{typography.body-sm}"
    source: "{typography.source} in {colors.ash}"
    note: "Never a card. Figure, hairline, label, source line with as-of date. Build fails if source or date is missing."
  ledger-row:
    grid: "minmax(120px, 0.3fr) 1fr"
    typography: "label {typography.eyebrow}, value {typography.body}"
    divider: "1px solid {colors.hairline}"
    note: "Trust facts (address, phone, WhatsApp) and dashboard contents use this. Never badges."
  fit-rule:
    layout: "two columns split by one vertical hairline"
    typography: "{typography.body}"
    note: "Left: for. Right: not for. Collapses to stacked with a horizontal hairline below 720px."
  process:
    layout: "one horizontal hairline as the spine, steps hang from it"
    stepLabel: "{typography.eyebrow}"
    note: "Steps are the verb, never 'Step 1'."
  faq:
    element: "details/summary"
    divider: "1px solid {colors.hairline}"
    toggle: "mono + and -"
  cta-band:
    borderTop: "1px solid {colors.ink}"
    padding: "{spacing.xxl} 0"
    typography: "{typography.headline}"
  footer-ledger:
    borderTop: "1px solid {colors.ink}"
    typography: "{typography.source}"
    note: "Email, phone, WhatsApp, address, legal links as label and value rows. No social icon row."
  prose:
    measure: "{spacing.measure}"
    typography: "{typography.body}"
    sourceParagraph: "{typography.source} in {colors.ash}, pulled up under the preceding statistic"
  code-block:
    backgroundColor: "{colors.hairline-soft}"
    typography: "{typography.code}"
    rounded: "{rounded.code}"
    padding: "12px 14px"
    note: "Real commands and real responses only. Never a fake terminal window."
  logo-wall:
    layout: "single row, wrapping, logos in Ink, opacity 0.85"
    caption: "{typography.source}: 'Where our founder has worked, as employee or contractor. None of these is a Relay client.'"
    note: "Logos only. The caption is the honesty, not decoration."
  audit-page-figure:
    note: "The site's image family: real pages from the audit-deck template, rendered at 1600x900 and shown in a hairline frame. The hero shows them as a fanned stack; the gallery shows them one at a time with a caption naming the page. Never a div mockup, never a stock image."
  numbers-panel:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    figure: "JetBrains Mono 600, clamp(40px, 5vw, 72px), tabular, counts in once"
    source: "{typography.source} at 55% opacity on ink"
    note: "The deck's dark panel, brought to the site as a component inside a paper section. The page theme does not flip; one panel carries the numbers."
  dashboard-module:
    layout: "two real components side by side: the weekly note and the decisions queue"
    label: "{typography.eyebrow}: 'Example. Sample numbers.' Always present."
    note: "A working mini-version of the dashboard, not a picture of one. Sample data is marked as sample on the component itself."
  live-check:
    note: "Planned after the design is approved: a URL field in the hero that runs the first real checks server-side and renders the Source Line rows as they complete. Rate-limited, timed out, never stores the URL."

motion:
  intensity: 6
  library: "motion/react, isolated in client leaf components; springs (stiffness 120, damping 22), never linear"
  hero: "headline lines rise from a mask in sequence on load; the deck stack fans in behind it; lede and CTA follow. One sequence, once."
  entry: "sections rise 16px and fade over 600ms as they enter, staggered children; from a visible resting state without JS"
  scroll: "one scroll-linked sequence per page at most: the process spine draws as it enters; the deck gallery advances with horizontal scroll-snap"
  figures: "count in when they enter the viewport, once, 900ms, then settle. Numbers perform once because they are the argument."
  hover: "service rows open to their Inside / Measured / Never; nav underline travels; links underline in ink; buttons press"
  dashboardModule: "the weekly note arrives line by line when in view; a decision in the queue moves to decided with a layout animation"
  reducedMotion: "every sequence collapses to its final state under prefers-reduced-motion"
  banned: "parallax, scroll hijack that traps the wheel, marquee, WebGL, cursor effects, perpetual loops, gradient motion"

dials:
  variance: 9
  motion: 8
  density: 3
---

## Design read

Reading this as: a B2B agency site for two audiences, Indian clinic, hotel and D2C owners on phones and technical founders in the US, with an editorial print language, leaning toward native CSS, Switzer plus JetBrains Mono, hairline structure and restrained motion. It is a redesign in overhaul mode: the content and routes are new, the brand system is the deck's and is locked.

The site sells transparency. So the page must behave like the product: every number sourced and dated, every claim checkable, nothing decorative that pretends to be information.

## Where this system overrides the taste skills, and why

The taste skills were read in full and are applied wherever they do not collide with the locked brand. Where they collide, the brand wins, and the reason is written here so nobody re-litigates it.

- **Warm paper ground.** The skills ban cream backgrounds as an AI default for premium-consumer briefs. Paper #F4F1EC is the brand's named colour, chosen for the deck in July 2026 and carried on every artefact since. It stays.
- **No photography.** The skills require real images on every landing page. The brand bans stock photography and the founder has declined photos. The site's image family is real rendered pages from the audit-deck template, shown as a fanned stack in the hero and as a gallery. The dashboard is shown as a working module with sample data, which the skills allow and a screenshot mockup would not be.
- **Light only, with one dark panel.** The skills require dark mode unless the brief is print-emulating editorial; the founder declined dark mode for v1. The deck's Ink panel is used once per page as a component for the numbers. It is not a theme flip.

**Revision, 16 Sep 2026, after the founder's review of build v1.** Version 1 read as a document: text only, no interaction. The print system had been applied to a screen, and the taste skill's warnings on images and motion had been overridden in the brand's name. The dials moved from 5/3/3 to 7/6/3, the motion section above replaced the old one, and four components were added: the deck gallery, the numbers panel, the dashboard module, and, after design approval, the live check.
- **Fontshare CDN.** The skills prefer self-hosted fonts. Switzer's licence requires written consent to self-host and the founder chose the CDN. Preconnect plus font-display swap, and the decision is recorded.
- **No icon library.** The skills forbid hand-rolled icons and suggest Phosphor. The brand forbids icon sets. Resolution: no icon sets; since v8 a small in-house set drawn to the brand lives inside the dashboard scene only. Toggles use mono characters, links use words.
- **Middle dots.** The skills ration the middle dot. It appears only inside source lines and the footer ledger, where it is the brand's documented separator, and nowhere in headlines or body.
- **Hairlines.** The skills warn against hairline rules as decoration. Here every hairline separates real content: rows, columns, sections. None is drawn to look designed.

Everything else from the skills applies: no em-dashes anywhere, hero fits the viewport with a two-line headline and a subtext under twenty words, one CTA intent per page, eyebrows rationed to one per three sections, no three-equal-card rows, no fake product UI, no version stamps, no scroll cues, no decorative dots, no section numbering in eyebrows, sentence case, reduced-motion honoured, Core Web Vitals targets, WCAG AA contrast on every control.

**Revision, 17 Sep 2026, v6: two 21st.dev components, rebuilt in the brand.** With the founder's 21st.dev key connected, two components were pulled on the free tier and ported to this system with no Tailwind, no icon library and no third-party CSS. `ChatDemo` (from nexus-ui "Chat Messages", id 20129) replaces the hero conversation: the customer's question arrives as an Ink bubble, a typing indicator holds for a beat, the answer card lists three businesses with the third line in red, and the scene cycles through a clinic, a hotel and a D2C brand; a Replay control and a three-bar scene indicator sit on the card; the log is `role="log" aria-live="polite"` and reduced motion shows the whole scene at rest. `DeckStack` (from educalvolpz "Scrollable Card Stack", id 25296) replaces the four-up gallery of audit pages: one page at a time, the next three peeking above it at 26 px steps and a 7 % scale per step, springs at stiffness 250 / damping 22, turned by wheel, arrow keys, touch or the dots; the wheel is released at the first and last page so the page never traps scroll, turned pages fade at scale 1 (a scale above 1 bled 5 px past the mobile viewport and was clipped), and the dots carry 24 px hit targets with the 10 px mark drawn by a pseudo-element. Both files name their source in a header comment; the pulled originals are kept under `design/21st/`. Lighthouse on the home page after the change: desktop 98 / 100 / 100 / 100; mobile under real devtools throttling 100 / 100 / 100 / 100 with a 1.5 s LCP; the simulated mobile model reports 84 because it attributes the check label's paint to script download, a model artefact recorded here so nobody chases it.

**Revision, 17 Sep 2026, v7, after the founder's seven notes on v6.** The search strip is gone. The hero wrap widens to 1360 px above 820 px with a larger gap, an 88 px three-line headline and a 52 ch lede, so the two columns fill the width instead of floating in it. The headline reads "Be the business your customers find first."; "they" had no antecedent. Story beat two now carries its numbers inside the creative, 15 % under the column without an AI answer and 8 % in red under the column with one, and the title says the same thing in the same order; the big figure under the visual is dropped for that beat (`figure` is optional on a beat). The ladder section names the numbers in the heading, explains the chart in one line and draws a dashed red bracket from the 11 % bar end to the 44 % bar end labelled "the climb". The dashboard section opens by saying what the dashboard is before showing three of its modules. The audit card stack leaves the home page (kept as `DeckStack` for /process) and "What you can hold us to" is removed; in their place `Benefits` shows six cards, each a small illustrative scene with a red mono eyebrow: recognition (an answer naming you), customers (a weekly count with bars), queries (two questions and your page), rankings (three searches with positions across two Mondays), brand value (a template snippet against your own), revenue (a rupee ledger). Sample numbers are labelled inside each scene in mono.

**Revision, 17 Sep 2026, v8: the dashboard as a sample week, and icons return.** The founder asked for the dashboard trio to be "much more animated and immersive with icons showing different things and numbers". `DashboardScene` replaces the three side-by-side modules with one framed app: a rail of seven section icons on Paper, a top bar with the client name, the week and a pulsing "live" pill, four number tiles (enquiries counting up with a drawing sparkline, cost per enquiry counting down from ₹612 to ₹412, bookings with a red ring filling to 5 of 14, AI-answer visibility as seven dots showing a band of 3 to 5), a "where the 14 came from" panel of bars with a source icon each, a log that arrives line by line and then keeps arriving every few seconds with relative times, then the weekly note and the decisions queue inside the frame. The enquiries tile flashes when an enquiry lands in the log. One footer line says it is a sample week. **Icons:** the earlier resolution ("no icons at all") is superseded for this scene by the founder's request. The icons are drawn in this file's style, not taken from a set: 24-unit grid, 1.5 px stroke, round caps, currentColor, eleven of them in `DashboardScene.tsx` (grid, chat, target, search, sparkle, check, doc, calendar, phone, rupee, clock). They live only inside dashboard and creative scenes, never in navigation or body copy.

**Revision, 17 Sep 2026, v9: the ladder is gone; a hundred customers walk instead.** The founder's read of the ladder section ("Small brands are named in 11%…", bars with a bracket): still unclear, scrap the style, find a more important insight, make it easy, make the diagram amazing. The replacement, `HundredCustomers`, tells one thing: where 100 people who search for what you sell end up. One hundred dots start in a box; 52 move to "AI answer first" and 48 to "results list"; then 48 of the 52 gather under an answer that names three businesses and "your clinic?", 4 go to "a result below it", and the 48 in the results list fade. Three stops, each with its own number, as a stepper above the stage that plays on entry and can be clicked or replayed; hairline curves draw between the boxes as the flow reaches them; the punch line turns from Ash to Ink at the end: "If your name is in the answer, those 48 are your enquiries. If it is not, they never knew you existed." The numbers are the two cleared statistics already on the page, rounded to whole people (51.5 % of searches show an AI answer first; 8 % of those visits click a result below it), and the Markdown twin says so. Dot targets are measured from the boxes' rectangles at layout time and on resize, so the same component runs the three-column stage at desktop and a single column on phones, where the connectors are dropped because they would cut through the stacked boxes. Boxes that the flow has left or not yet reached dim by colour (Paper ground, Ash text), never by opacity, so the contrast audit passes at every stage. `Ladder` stays exported from `Story.tsx` but is unused.

**Revision, 17 Sep 2026, v10: the inner pages get the home treatment, and the site gets a deep test.** Every inner page now opens with the same two-column hero as the home page (headline and lede left, a scene right) and uses split-word headings, reveals and the in-house icons. `components/inner.tsx` holds the new pieces: `IconCards` (a grid of icon, title, line), `Chips` (an "Inside" list as pills instead of a paragraph), `ServiceScenes` (one row per service with its lever creative beside it; the creative service gets a two-variant ad scene), `Terminal` (the dev-tools hero types the curl for this site's Markdown twin and prints the answer), `BandDots` (the method hero: seven runs, a band of three to five), `ComplaintCards` (three things owners say about the last agency, each answered), `OwnersVsAgencies` (the cleared survey numbers as two pairs of bars: what owners rank first, how agencies report), `Findings` (audit-format rows with status, fair reason and the verify command), `StepsWithIcons`, `AddressCard`, `Roles` (the founder's employers with their logos). `Sections` in `Page.tsx` gained hooks so a page can put a scene before, after or in place of any markdown section by heading, and the Markdown twin keeps the prose. Page by page: services is five rows with scenes; dashboard opens with the sample-week scene, then icon cards, the note beside its WhatsApp twin, and the survey bars; process has the call as four icon steps, the four audit pages as the card stack with five icon cards, the dashboard trio, and three real findings as rows; India mirrors the home stance with the chat hero, the complaints, the live check, the steps, the six benefit cards, six owner cards and the address; dev-tools has the terminal and six check cards; about has the roles with logos, three icon cards and the address; method has the band hero and the two clocks under rule three; book has the call scene and four icon cards over the form. Inner headlines are capped at three lines at desktop, so three were shortened. A Content-Security-Policy header now closes every origin except this one and the Fontshare CDN; scripts and styles allow inline because Next.js and the html.js gate use inline snippets. `scripts/deep-test.mjs` runs the whole site: status, canonical, Open Graph, JSON-LD validity, hreflang, the Markdown twin by Accept header and at /md, robots and every sitemap URL, the Open Graph image, a true 404, the live check on a real site plus three bad inputs, then every route at three viewports for console errors, failed requests, horizontal overflow, blocks stuck hidden after scrolling, images without alt, broken images, tap targets under 24 px, headline line counts, wrapped buttons and visible keyboard focus, then reduced motion at rest, the intake form's validation, the check form end to end, and a crawl of every internal and external link. It writes `.work/relay-site/deep/report.json`.

**Revision, 17 Sep 2026, v11: method and notes retired; wrong creatives and thin sections fixed.** The founder removed /method and /notes (and both notes articles) from the site; the files sit in `content/retired/`, the nav is Services, Dashboard, Process, About, and the footer's "Sources" link now opens a bare `/sources` page that lists the registry, kept so every number on the site stays checkable. Creatives that did not match their copy were replaced: the services hero is a ledger (one service, one sample number each, `ServiceLedger`), the social row shows a post about real work with the enquiries it produced (`SocialScene`) instead of a WhatsApp chat, and the about hero shows who does what (`TeamScene`). Dev-tools had five prose-only sections in a row; "Then the rest of the stack" is four icon cards, "This site does what it asks of yours" fetches the page's own Markdown twin through the Accept-header rewrite and prints the response live (`TwinProof`), and "Who this is for" carries the four month-one steps. Two things the fixes taught: a request for the twin must go to the page path with the Accept header, not to `/md/…`, because the rewrite prefixes `/md` again; and a nowrap number column in a card overflows a phone by a few pixels without anything looking wrong at a glance, so the ledger rows stack below 600 px. The margin index is shown only from 1440 px, the horizontal pan starts at the wrap's edge and is masked there, and the deep test hit-tests the index label against painted content at every scroll step.

**Revision, 17 Sep 2026, v12: the services page in the owner's words, with the creatives owners already know.** The founder's read of v11: the services copy had to make the offer obvious in plain language, and the creatives had to be the things owners see around those services; "website made fast" did not say we build websites. Every service heading now starts with the verb: "We get you found on Google and in AI answers", "We run your Google and Meta ads", "We build your website", "We run your social media", "We make your ads, videos and creatives". Under each: what it means for the owner in one paragraph, "What we do" as pills, and "How you know it is working". The scenes live in `components/serviceScenes.tsx` and are drawn as the real surfaces, in the brand's palette: a Google results page with the search, an AI Overview naming three clinics with yours first, and your listing with stars, hours and reviews (`SerpScene`); a sponsored Google result over a sponsored Instagram post with its Book now bar (`AdScene`); the clinic's homepage in a browser window with a WhatsApp button and the load time (`SiteScene`); an Instagram profile grid with two reels and the new post (`SocialGrid`); a creative pack of a feed square, a reel and a banner with the variant that won (`CreativePack`). Sample content is labelled in mono at the foot of each. Blue for links in the Google scenes is the one colour outside the palette, used because the scene is a Google page. One collision to remember: `.sq` is the live check's status square; a tile named `.sq` collapses to ten pixels. Scene classes are prefixed now.

**Revision, 17 Sep 2026, v14: the process page rebuilt; the first-generation scenes retired.** The founder's read: the process page used outdated creatives. It did: the two-bubble call, the audit-deck page photographs, the first dashboard trio and the status-square findings all predate the v8 language. `components/processScenes.tsx` replaces them. `MonthCalendar` is the hero: six weeks, Monday to Sunday, the five events as Ink cells with an icon and a legend under the grid, a red dot on every Monday for the note. `CallScene` is the call as a screen-share: a window bar with a twenty-minute timer whose red underline drains over forty seconds, the owner's Search Console on the left as four rows of query, impressions, clicks and position, and the three gaps arriving on the right with a pill for what each costs; a compact variant stacks the panes and shows two rows, and it now stands in for the old bubbles on the home page's month stack and the book page's hero. `AuditPages` draws the five pages the deck holds, each a card with a mini scene: the scorecard with a pill per check, a finding with its check command, the plan with a measure per week, the plain-English note, and the day-one baseline as three tiles; the scorecard also replaces the audit photograph in the home page's month stack. `MondayNotes` is four cards, week one to week four, the enquiries climbing from 11 to 14 and the cost per enquiry falling to ₹412, consistent with the dashboard scene. `Findings` now uses the in-house icons and pills instead of the live check's status squares, with "check it yourself" over the command. The pill component (working, costs you today, costs you soon) is the one new primitive and is shared across the scenes. The `DeckStack`, `RevealFigure` gallery and the audit JPGs under `public/figures/` are no longer used by any page.

**Revision, 18 Sep 2026, v15: the dashboard and about pages rebuilt; the last first-generation scenes retired.** `components/dashScenes.tsx` adds `ModuleCards` (seven cards, each a working preview of a dashboard module: plan progress, work log, number tiles, a source line and a disconnected source, the band per engine, the queue, the call button), `ThreeChannels` (the same Monday note as a WhatsApp bubble, an email with a subject line and the dashboard's notes list, arriving in turn; a compact variant drops the third), `TargetsScene` (three numbers against the target named on the call, with a bar), `WorkLog` (a week of rows with day, icon, what was done and who, the founder's rows in red; a compact variant) and `MapCard` (a drawn map, abstract roads and a pulsing pin, beside the address). The old `WeeklyNote` and the `.wa` WhatsApp card no longer appear on any page except inside the dashboard scene's own frame; the home page's month stack now uses the call scene, the scorecard, the work log and the three channels. Green in the WhatsApp bubble is the one colour outside the palette, used because that is what the app paints. The two employer logos Pulpkey and Unhashed are raster images wrapped in SVG and render soft; the founder has asked for them to be replaced and proper files are awaited.

**Revision, 18 Sep 2026, v16: the logo wall.** Pulpkey and Unhashed, both raster images wrapped in SVG, are gone from `public/logos/`. Digistay joins the wall from its own site's `dslogo.png` (744 × 160, rendered at 22 px through the wall's `brightness(0)` filter like the others), with its role on the about page taken from the founder's CV. Camp K12 is chosen and its role line is in, but its site did not answer from here, so its logo waits on a file. The wall reads Amazon India, Google India, Digistay, Catalysis, Byzantine, Lightspeed. The Content-Security-Policy now admits `https://vercel.live` in script-src, connect-src and frame-src: Vercel injects its preview toolbar from that host on preview deployments only, and without the allowance every preview page logged a blocked script.

**Revision, 18 Sep 2026, v17: favicon and title.** The favicon is the Relay mark cut from the wordmark file, Ink on a Paper rounded square (`app/icon.svg`, with `app/apple-icon.png` rendered from it at 180 px), replacing the previous site's green icon that had survived in `app/icon.svg`. The home page's browser title now carries the headline, "Relay · Be the business your customers find first"; the old title reused the ambiguous "they" the founder had already struck from the headline. Rule: the tab title, the Open Graph title and the H1 say the same thing on the home page.

**Revision, 18 Sep 2026, v18: one more section on three pages; the services drawn as the real interfaces.** The founder's read: the dashboard, process and about pages still had empty-feeling sections, and the services scenes were good but not the real thing. Added: `PhoneDash` as the dashboard page's hero (the dashboard on a phone: enquiries, the band, the note, one decision), `DecisionFlow` (a decision from the queue to the work log to Monday's note, three cards joined by hairline arrows), `ProposalPage` on the process page (the one-page proposal as a page: gaps in cost order, first and measured-by, services as pills, the fee "said once, on the call", the terms), and `AccountsScene` on the about page (five accounts with an owner pill for the client and an access pill for Relay, plus the export tile). The services scenes were redrawn to the platforms' own chrome: Google's wordmark colours, the pill search bar with mic and lens, the result tabs, the AI Overview panel with its gradient spark, the blue link title and green breadcrumb, the star row; Instagram's gradient ring, the Sponsored line, the blue Book now bar, the heart, comment, send and save row, the caption and hashtags; the browser's traffic lights, tab, padlocked address bar and reload; the profile's counts, bio, Follow and Message and tab icons; and the ad formats with the story's progress bars and swipe-up and the display banner's Ad badge. These are depictions of where the owner appears, so they use those surfaces' colours by design (Google blue and green, Instagram blue and the ring gradient, WhatsApp green); they live only inside the service scenes. The banner tile runs full width under the feed and story tiles so its copy does not wrap.

**Revision, 18 Sep 2026, v19: the reveal follows the route.** The founder saw five empty sections on the dashboard page on the Vercel preview and more on the other pages; every automated check had said the pages were full. Cause: `Reveal`, mounted once in the layout, armed its IntersectionObserver on first load only, so after a client-side navigation the new page's `[data-reveal]` sections were never observed and stayed at opacity 0. Every check had loaded pages directly. `Reveal` now re-arms on `usePathname()` changes, watches the DOM with a MutationObserver for sections added later, reveals anything already above the fold on arrival, and after 2.5 s reveals anything within 1.2 viewports that has not fired. The deep test gained an in-site navigation scenario. Rule recorded in the corrections log as C-017: no reveal-on-scroll without a route key and a timed fallback; no site test without in-site navigation.

**Revision, 18 Sep 2026, v20: the phone view.** The founder checked the site in Chrome's phone view and said issues remained. Found on a 412px Pixel 7 profile: the month-stack cards set their text in an 80px column, because the month-scenes block re-declared the card grid after the 720px query that collapses it (equal specificity, later wins); labels at 10 and 11px across the scenes; the dev-tools code block scrolling sideways; the call-scene gaps and the decision-flow cards arriving up to two seconds after entering view. Fixed: the one-column form re-asserted at the end of the cascade; a 12px floor at 600px and below on every small label; code blocks wrap on phones; staggers shortened so every scene fills within about a second of entering view. Rule: a phone override lives at the end of the cascade or beside the rule it overrides, and any appended block that re-declares a base grid re-declares its phone form in the same block. The deep test now runs every route on a phone device profile and fails on jammed text, grid tracks wider than their box, nowrap overflow, text under 12px, a clipped code block and an overflowing menu.

**Revision, 24 Sep 2026, launch.** Live at https://we-relay.studio, replacing the sprint-era site. Contact email and Cal.com booking link supplied by the founder and wired through `lib/site.ts`; the four pages that print the address link it with mailto. No analytics at launch by decision: the privacy page says so in one sentence, `ga4MeasurementId` stays empty, and the launch gate accepts that state only while the statement says the site runs no analytics. The old site was a single page with no other routes, so nothing needed a redirect. Deploy with the pinned CLI, `npx -y vercel@59.23.1`; 59.26.0 refused the production deploy with an authorization error that was the tool's, not the account's.

**Revision, 24 Sep 2026, the call in one tap.** The founder's read: the navbar button did not take him to the call; it took him to the four-questions page with the calendar behind the form. Every audit-call button now opens the Cal.com page directly, the navbar included; the book page remains as the preparation page, linked from the process hero, with a direct calendar link at its top. Rule: a button that names the outcome ("Book the call") opens the thing itself, not a page about it; qualifying questions belong on the booking form, not in front of it.

**Revision, 25 Sep 2026, v21: the logo wall centred, caption lines gone.** The founder's read: centre the logos and remove the caption under them, and every line like it. Gone: the logo-wall caption, the dashboard scene's footer sentence, the targets and phone-dash foot lines, the two benefit-card foot lines. Rule: a creative carries no caption or footer sentence explaining what it is or is not; the in-frame label at the top of a scene ("· sample") stays, because it is what keeps invented names from reading as clients. The logo row centres; on phones each wrapped row centres on its own.

## Two recorded limitations

- **Vary: Accept on HTML.** Next 16 overwrites the Vary header on app-router HTML responses, so the header cannot be set on the page itself. The negotiation is routing-based (a `has`-header rewrite evaluated before any cache lookup) and the Markdown twin also has its own URL at `/md/<route>` with `Vary: Accept` set. Re-check when Next exposes Vary control.
- **Headline line count.** The home hero holds the two-line rule. Inner-page heroes carry full assertion sentences and may run to three lines at desktop at 54px; four is a failure.

## Page rhythm

Sections alternate layout families so that no two neighbours share one: a split hero with the audit figure on the right, a stat row, a ledger, a process spine, a two-column fit rule, a stacked list with hairlines, prose, a details list, a CTA band. Vertical rhythm is the section token. Bottom padding is optically larger than top.

## The red

One thing per page. On the home page it is the underline of the primary CTA. On a page with a stat that costs money today, it may be that figure instead, and then the CTA underline is Ink. It never marks two things.

## Copy rules the components enforce

- A `Stat` cannot render without a claim id, and the claim registry cannot contain an entry without a source and a valid-until date. The build fails otherwise.
- A `Source` paragraph is any paragraph beginning "Source:". It renders in mono, Ash, pulled up under the preceding element.
- Headlines are sentence case, end with a full stop when they are sentences, and carry `text-wrap: balance`.
- Buttons and links carry the exact labels from `content/strings.md`. One label per intent.
