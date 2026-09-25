"use client";
import { site } from "@/lib/site";
// Scenes and cards for the inner pages. Same system as the home page: Paper cards, hairlines, in-house icons, springs.
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Icon } from "./DashboardScene";
import { SerpScene, AdScene, SiteScene, SocialGrid, CreativePack } from "./serviceScenes";
import { DrawLine } from "./motion";

type Item = { title: string; text: string };
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
function useRise(reduce: boolean | null) {
  return (i: number) => (reduce ? {} : { initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.5, delay: 0.06 * i, ease } });
}

export function IconCards({ items, icons, cols = 3 }: { items: Item[]; icons: string[]; cols?: 2 | 3 | 4 }) {
  const reduce = useReducedMotion(); const rise = useRise(reduce);
  return (
    <div className={`icards cols-${cols}`}>
      {items.map((it, i) => (
        <motion.article className="icard" key={it.title} {...rise(i)}>
          <span className="icard-ic"><Icon name={icons[i % icons.length]} /></span>
          <h3>{it.title}</h3>
          <p>{it.text}</p>
        </motion.article>
      ))}
    </div>
  );
}

export function Chips({ text }: { text: string }) {
  return <ul className="chips">{text.split(" · ").map((p) => <li key={p}>{p.replace(/\.$/, "")}</li>)}</ul>;
}

function CreativeScene() {
  return (
    <div className="lv lv-creative">
      <div className="mono lbl">two variants, one winner</div>
      <div className="ads">
        <div className="ad"><span className="mono">A</span><b>Clear skin in 8 weeks. Book a consult.</b><i>₹612 per enquiry</i></div>
        <motion.div className="ad win" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4, ease }}><span className="mono">B</span><b>Dr Mehra sees acne patients on Saturdays.</b><i>₹412 per enquiry</i><em className="mono">moved the campaign</em></motion.div>
      </div>
    </div>
  );
}

export function ServiceScenes({ services }: { services: { name: string; blurb: string; inside: string; measured: string }[] }) {
  const scenes = [<SerpScene key="a" />, <AdScene key="b" />, <SiteScene key="c" />, <SocialGrid key="d" />, <CreativePack key="e" />];
  const reduce = useReducedMotion(); const rise = useRise(reduce);
  return (
    <div className="svc-scenes">
      {services.map((s, i) => (
        <motion.article className={`svc-scene${i % 2 ? " flip" : ""}`} key={s.name} id={s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")} {...rise(0)}>
          <div className="svc-text">
            <div className="mono svc-n">{String(i + 1).padStart(2, "0")} of {services.length}</div>
            <h2>{s.name}.</h2>
            <p className="svc-out">{s.blurb}</p>
            <div className="svc-block"><div className="mono lbl">What we do</div><Chips text={s.inside} /></div>
            <div className="svc-block"><div className="mono lbl"><Icon name="eye" />How you know it is working</div><p>{s.measured}</p></div>
          </div>
          <div className="svc-vis">{scenes[i % scenes.length]}</div>
        </motion.article>
      ))}
    </div>
  );
}

const TERM_CMD = 'curl -sL -H "Accept: text/markdown" https://we-relay.studio/dev-tools';
const TERM_LINES = ["# Marketing for developer tools, with the evidence attached", "", "Canonical: https://we-relay.studio/dev-tools", "", "## The evidence, before the pitch.", "", "**89.3% vs 49.3%**: strict task success for browser agents…"];
export function Terminal({ cmd = TERM_CMD, lines = TERM_LINES }: { cmd?: string; lines?: string[] }) {
  const ref = useRef<HTMLDivElement>(null); const inView = useInView(ref, { once: true, amount: 0.4 }); const reduce = useReducedMotion();
  const [typed, setTyped] = useState(reduce ? cmd.length : 0); const [shown, setShown] = useState(reduce ? lines.length : 0);
  const started = useRef(false);
  useEffect(() => {
    if (!inView || reduce || started.current) return; started.current = true; let i = 0; const t: ReturnType<typeof setTimeout>[] = [];
    const type = () => { i += 1; setTyped(i); if (i < cmd.length) t.push(setTimeout(type, 18 + Math.random() * 30)); else { lines.forEach((_, k) => t.push(setTimeout(() => setShown(k + 1), 350 + k * 140))); } };
    t.push(setTimeout(type, 400)); return () => t.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);
  return (
    <div className="term" ref={ref} role="figure" aria-label="A terminal asking this site for Markdown and receiving it">
      <div className="term-bar"><i /><i /><i /><span className="mono">zsh</span></div>
      <pre className="term-body"><span className="term-ps">$ </span>{cmd.slice(0, typed)}<span className="term-cur" />{"\n"}{lines.slice(0, shown).map((l, k) => <span key={k} className={l.startsWith("#") ? "term-h" : l.startsWith("**") ? "term-b" : ""}>{l + "\n"}</span>)}</pre>
    </div>
  );
}

export function BandDots({ on = 3, band = 2, total = 7, label = "named in 3 to 5 of 7 runs" }: { on?: number; band?: number; total?: number; label?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="bandcard">
      <div className="mono lbl">best dermatologist gurugram · ChatGPT · this week</div>
      <div className="band-row" aria-hidden="true">{Array.from({ length: total }, (_, k) => <motion.i key={k} className={k < on ? "on" : k < on + band ? "half" : ""} initial={reduce ? false : { scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + k * 0.12, type: "spring", stiffness: 300, damping: 18 }} />)}</div>
      <div className="band-big"><b>{on} to {on + band}</b><span>of {total} runs</span></div>
      <p>{label}. Seven runs, because one run is a coin flip. A band, because the engines disagree with themselves.</p>
    </div>
  );
}

export function ComplaintCards({ items }: { items: Item[] }) {
  const reduce = useReducedMotion(); const rise = useRise(reduce);
  return (
    <div className="complaints">
      {items.map((it, i) => (
        <motion.article className="complaint" key={it.title} {...rise(i)}>
          <div className="mono lbl">an owner, about the last agency</div>
          <div className="cbub">{it.title.replace(/^"|"$/g, "")}</div>
          <div className="mono lbl red"><Icon name="check" />with Relay</div>
          <p>{it.text}</p>
        </motion.article>
      ))}
    </div>
  );
}

export function OwnersVsAgencies() {
  const ref = useRef<HTMLDivElement>(null); const inView = useInView(ref, { once: true, amount: 0.4 }); const reduce = useReducedMotion();
  const groups = [
    { title: "What owners say matters most", rows: [{ name: "conversions", v: 44, top: true }, { name: "traffic", v: 6 }] },
    { title: "How often agencies report", rows: [{ name: "monthly", v: 69 }, { name: "weekly", v: 11, top: true }] },
  ];
  return (
    <div className="ova" ref={ref} role="figure" aria-label="Owners rank conversions first and traffic last; most agencies report monthly, few weekly">
      {groups.map((g, gi) => (
        <div className="ova-g" key={g.title}>
          <div className="ova-t">{g.title}</div>
          {g.rows.map((r, k) => (
            <div className={`ova-row${r.top ? " top" : ""}`} key={r.name}>
              <span className="ova-n">{r.name}</span>
              <div className="ova-bar"><motion.b initial={reduce ? false : { width: 0 }} animate={inView ? { width: `${r.v}%` } : undefined} transition={{ duration: 1, delay: 0.2 + gi * 0.3 + k * 0.15, ease }} /></div>
              <span className="mono ova-v">{r.v}%</span>
            </div>
          ))}
        </div>
      ))}
      <div className="ova-punch">Owners want enquiries counted every week. Most agencies send traffic once a month. The dashboard lives in that gap.</div>
    </div>
  );
}

export function Findings({ items }: { items: { label: string; status: "fine" | "today" | "tomorrow"; text: string; verify: string; fair: string }[] }) {
  const reduce = useReducedMotion(); const rise = useRise(reduce);
  const tag = { fine: "working, keep", today: "costs you today", tomorrow: "costs you soon" };
  return (
    <ol className="findings">
      {items.map((f, i) => (
        <motion.li className={`finding s-${f.status}`} key={f.label} {...rise(i)}>
          <div className="finding-head"><span className="icard-ic"><Icon name={f.status === "fine" ? "check" : f.status === "today" ? "flag" : "clock"} /></span><strong>{f.label}</strong><span className={`spill ${f.status === "tomorrow" ? "soon" : f.status}`}>{tag[f.status]}</span></div>
          <p>{f.text}</p>
          {f.fair && <p className="fair">Fair reason: {f.fair}</p>}
          {f.verify && <div className="finding-check"><span className="mono lbl">check it yourself</span><code className="verify">{f.verify}</code></div>}
        </motion.li>
      ))}
    </ol>
  );
}

export function StepsWithIcons({ steps, icons }: { steps: { title: string; body: string }[]; icons: string[] }) {
  const reduce = useReducedMotion(); const rise = useRise(reduce);
  return (
    <div className="steps-i">
      <DrawLine className="spine-line" />
      <div className="steps-grid">
        {steps.map((s, i) => (
          <motion.div className="step-i" key={s.title} {...rise(i)}>
            <div className="step-top"><span className="icard-ic"><Icon name={icons[i % icons.length]} /></span><span className="mono">{String(i + 1).padStart(2, "0")}</span></div>
            <strong>{s.title}</strong>
            <p>{s.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function AddressCard({ email }: { email?: string }) {
  return (
    <div className="addr">
      <div className="addr-row"><Icon name="pin" /><div><b>WeWork Forum, Gurugram</b><span>Haryana, India</span></div></div>
      {email && <div className="addr-row"><Icon name="mail" /><div><b>{email}</b><span>one line about your site is enough to start</span></div></div>}
      <div className="addr-row"><Icon name="calendar" /><div><b><a href={site.bookingUrl}>Book the free 20-minute audit call</a></b><span>your data, three gaps, a proposal the next business day</span></div></div>
    </div>
  );
}

const LOGO: Record<string, string[]> = { Digistay: ["Digistay.png"], "Amazon India and Google India": ["amazon.svg", "Google.svg"], Catalysis: ["Catalysis.svg"], "Byzantine Finance": ["Byzantine.svg"], Lightspeed: ["Lightspeed.svg"] };
export function Roles({ items }: { items: Item[] }) {
  const reduce = useReducedMotion(); const rise = useRise(reduce);
  return (
    <div className="roles">
      {items.map((it, i) => (
        <motion.article className="role" key={it.title} {...rise(i)}>
          <div className="role-logos">{(LOGO[it.title] || []).map((f) => <img key={f} src={`/logos/${f}`} alt="" height="18" loading="lazy" />)}</div>
          <h3>{it.title}</h3>
          <p>{it.text}</p>
        </motion.article>
      ))}
    </div>
  );
}

// One team, one number each: the services hero.
export function ServiceLedger() {
  const rows = [["search", "Found on Google and in AI answers", "named in 4 of 7 answers"], ["target", "Google and Meta ads", "₹412 per enquiry"], ["code", "Your website", "14 enquiries this week"], ["chat", "Social media", "5 enquiries from DMs"], ["bolt", "Ads, videos and creatives", "variant B, ₹200 less per enquiry"]];
  const reduce = useReducedMotion(); const rise = useRise(reduce);
  return (
    <div className="ledger-scene">
      <div className="mono lbl">one team, one number each · a sample week</div>
      {rows.map(([ic, name, n], i) => (
        <motion.div className="ledger-row" key={name} {...rise(i)}><span className="icard-ic"><Icon name={ic} /></span><b>{name}</b><span className="mono n">{n}</span></motion.div>
      ))}
    </div>
  );
}

// A post about real work, with the number it produced.
export function SocialScene() {
  return (
    <div className="lv lv-social">
      <div className="mono lbl">a post, from real work</div>
      <div className="post">
        <div className="post-head"><i /><div><b>Dr Mehra Skin Clinic</b><span className="mono">Tue · Instagram</span></div></div>
        <div className="post-img"><span className="mono">the new laser room, Monday</span></div>
        <p>The new laser room opened Monday. Saturday slots are open, and the first consult is on us.</p>
        <motion.div className="post-foot" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5, ease }}><span className="mono">218 saw it</span><span className="mono red"><Icon name="chat" />3 enquiries from this post</span></motion.div>
      </div>
    </div>
  );
}

// Who does what: the about hero.
export function TeamScene() {
  const rows = [["user", "Strategy, SEO and AI search", "Dhruv, the person on the call"], ["layers", "Design and build", "in-house, people he has worked with for years"], ["target", "Campaigns", "in-house, in your accounts"], ["bolt", "Creative", "in-house, tagged to what it moved"]];
  const reduce = useReducedMotion(); const rise = useRise(reduce);
  return (
    <div className="ledger-scene">
      <div className="mono lbl">who does what</div>
      {rows.map(([ic, name, who], i) => (
        <motion.div className="ledger-row" key={name} {...rise(i)}><span className="icard-ic"><Icon name={ic} /></span><b>{name}</b><span className="who">{who}</span></motion.div>
      ))}
      <p className="ledger-note">Every piece of work appears in your dashboard with a name on it.</p>
    </div>
  );
}

// This page fetching its own Markdown twin, live.
export function TwinProof({ path = "/dev-tools" }: { path?: string }) {
  const ref = useRef<HTMLDivElement>(null); const inView = useInView(ref, { once: true, amount: 0.3 });
  const [state, setState] = useState<{ status: string; type: string; lines: string[] } | null>(null);
  useEffect(() => {
    if (!inView) return; let alive = true;
    fetch(path, { headers: { Accept: "text/markdown" } }).then(async (r) => { const t = await r.text(); if (alive) setState({ status: String(r.status), type: r.headers.get("content-type") || "", lines: t.split("\n").slice(0, 12) }); }).catch(() => { if (alive) setState({ status: "offline", type: "", lines: ["The twin could not be fetched from here. Run the curl above."] }); });
    return () => { alive = false; };
  }, [inView, path]);
  return (
    <div className="term twin" ref={ref} role="figure" aria-label="This page's Markdown twin, fetched live">
      <div className="term-bar"><i /><i /><i /><span className="mono">GET {path} · Accept: text/markdown</span><span className="mono term-status">{state ? `${state.status} ${state.type.split(";")[0]}` : "fetching…"}</span></div>
      <pre className="term-body">{state ? state.lines.map((l, k) => <span key={k} className={l.startsWith("#") ? "term-h" : l.startsWith("**") ? "term-b" : ""}>{l + "\n"}</span>) : "\n"}</pre>
    </div>
  );
}
