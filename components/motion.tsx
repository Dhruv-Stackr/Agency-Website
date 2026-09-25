"use client";
import { motion, useInView, useReducedMotion, useScroll, useTransform, useMotionValue, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const spring = { type: "spring", stiffness: 120, damping: 22, mass: 0.9 } as const;

export function Rise({ children, delay = 0, className, as = "div" }: { children: React.ReactNode; delay?: number; className?: string; as?: "div" | "section" | "li" | "p" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag className={className} initial={reduce ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ ...spring, delay }}>
      {children}
    </Tag>
  );
}

export function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? "show" : "hide"} whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={{ hide: {}, show: { transition: { staggerChildren: 0.08 } } }}>
      {children}
    </motion.div>
  );
}
export const item = { hide: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: spring } };

// Counts a figure in once when it enters. Handles "11% · 44% · 73%", "7 runs", "89.3% vs 49.3%", "Up to 45%".
export function Counter({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!inView || reduce) return;
    const nums = [...text.matchAll(/\d+(\.\d+)?/g)];
    if (!nums.length) return;
    const controls = animate(0, 1, { duration: 1.1, ease: [0.16, 1, 0.3, 1], onUpdate: (t) => {
      let i = 0;
      setOut(text.replace(/\d+(\.\d+)?/g, (m) => { const n = parseFloat(nums[i++][0]); const dec = (m.split(".")[1] || "").length; return (n * t).toFixed(dec); }));
    } });
    return () => controls.stop();
  }, [inView, reduce, text]);
  return <span ref={ref} className={className}>{out}</span>;
}

// A hairline that draws across as the element scrolls into view.
export function DrawLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "start 35%"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <div ref={ref} className={className} aria-hidden="true"><motion.div className="draw" style={{ scaleX: reduce ? 1 : scaleX }} /></div>;
}

export function HeroText({ h1, ledeHtml, cta, ctaHref }: { h1: string; ledeHtml: string; cta: string; ctaHref: string }) {
  const words = h1.split(" ");
  return (
    <div className="hero-text">
      <h1 aria-label={h1}>
        {words.map((w, i) => (<span key={i}><span className="mask"><span className="w" style={{ animationDelay: `${0.05 + i * 0.045}s` }}>{w}</span></span>{i < words.length - 1 ? " " : ""}</span>))}
      </h1>
      <div className="rise-in" style={{ animationDelay: "0.42s" }} dangerouslySetInnerHTML={{ __html: ledeHtml }} />
      {cta && <p className="cta rise-in" style={{ animationDelay: "0.56s" }}><a className="btn" href={ctaHref}>{cta}</a></p>}
    </div>
  );
}

// Real deck pages, fanned. CSS-only: fans in on load, spreads on hover or focus-within.
export function DeckStack({ pages }: { pages: { src: string; alt: string; name: string }[] }) {
  return (
    <div className="stack" tabIndex={0} aria-label="Four pages from a Relay audit">
      {pages.map((p, i) => (
        <figure key={p.src} className="stack-page" style={{ zIndex: i + 1, animationDelay: `${0.15 + i * 0.09}s` }}>
          <img src={p.src} alt={p.alt} width="1280" height="720" fetchPriority={i === pages.length - 1 ? "high" : "auto"} loading={i === pages.length - 1 ? "eager" : "lazy"} />
          <figcaption>{p.name}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function NumbersPanel({ stats }: { stats: { figure: string; label: string; source: string }[] }) {
  return (
    <Stagger className="numbers">
      {stats.map((s) => (
        <motion.div className="num" key={s.figure} variants={item}>
          <div className="num-figure"><Counter text={s.figure} /></div>
          <div className="num-label">{s.label}</div>
          <div className="num-source">{s.source}</div>
        </motion.div>
      ))}
    </Stagger>
  );
}

export function ProcessSpine({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <div className="spine">
      <DrawLine className="spine-line" />
      <Stagger className="spine-steps">
        {steps.map((s) => (
          <motion.div className="spine-step" key={s.title} variants={item}>
            <strong>{s.title}</strong>
            <p>{s.body}</p>
          </motion.div>
        ))}
      </Stagger>
    </div>
  );
}

// ---- Dashboard module: two real components with sample data, labelled as an example ----
const NOTE = [
  "Homepage title and description rewritten Tuesday; Search Console re-fetch scheduled for the 30th.",
  "Enquiries this week 14, last week 11. Paid campaign 2 is producing 9 of them at ₹412 each.",
  "All-products page cut from 4.9 MB to 0.6 MB of HTML. Google's field data will show it in about four weeks.",
  "Waiting on you: the landing-page copy for the Diwali offer, in the decisions queue.",
  "Next week: the AI-visibility run, seven repetitions, twenty prompts; the band lands in the dashboard Monday.",
];
export function WeeklyNote({ foot = "Posted here, on WhatsApp and by email. Approved by Dhruv before it goes out." }: { foot?: string | null } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  return (
    <div className="dash-card" ref={ref}>
      <div className="dash-head"><span>Weekly note</span><span className="mono">Week of 22 Sep</span></div>
      <ol className="note">
        {NOTE.map((l, i) => (
          <motion.li key={i} initial={reduce ? false : { opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : undefined} transition={{ ...spring, delay: 0.25 + i * 0.35 }}>{l}</motion.li>
        ))}
      </ol>
      {foot && <div className="dash-foot mono">{foot}</div>}
    </div>
  );
}
const QUEUE = [
  { id: 1, text: "Approve the Diwali landing-page copy", due: "by Thu" },
  { id: 2, text: "Choose: pause campaign 3 or move its budget to campaign 2", due: "by Fri" },
  { id: 3, text: "Confirm the three competitor names for the AI-visibility prompts", due: "by Mon" },
];
export function DecisionsQueue({ foot = "Example. Sample numbers. This is the module as it will look in your dashboard." }: { foot?: string | null } = {}) {
  const [done, setDone] = useState<number[]>([]);
  return (
    <div className="dash-card">
      <div className="dash-head"><span>Needs your decision</span><span className="mono">{QUEUE.length - done.length} open</span></div>
      <ul className="queue">
        {QUEUE.filter((q) => !done.includes(q.id)).map((q) => (
          <motion.li key={q.id} layout transition={spring} exit={{ opacity: 0 }}>
            <button type="button" className="queue-btn" onClick={() => setDone([...done, q.id])} aria-label={`Mark decided: ${q.text}`}>Decide</button>
            <span>{q.text}</span><span className="mono due">{q.due}</span>
          </motion.li>
        ))}
        {done.length > 0 && (
          <motion.li layout className="decided" transition={spring}><span className="mono">{done.length} decided this week. Each one moves to the work log with your name on it.</span></motion.li>
        )}
      </ul>
      {foot && <div className="dash-foot mono">{foot}</div>}
    </div>
  );
}

export function DeckGallery({ pages }: { pages: { src: string; alt: string; name: string; caption: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  function go(n: number) { const el = ref.current; if (!el) return; const k = Math.max(0, Math.min(pages.length - 1, n)); el.scrollTo({ left: k * el.clientWidth, behavior: "smooth" }); setI(k); }
  return (
    <div className="gallery">
      <div className="gallery-track" ref={ref} onScroll={(e) => { const el = e.currentTarget; setI(Math.round(el.scrollLeft / el.clientWidth)); }}>
        {pages.map((p) => (
          <figure className="gallery-page" key={p.src}><img src={p.src} alt={p.alt} width="1280" height="720" loading="lazy" /><figcaption><strong>{p.name}</strong> {p.caption}</figcaption></figure>
        ))}
      </div>
      <div className="gallery-nav">
        <button type="button" className="txt" onClick={() => go(i - 1)} disabled={i === 0}>Previous page</button>
        <span className="mono">{pages[i].name}</span>
        <button type="button" className="txt" onClick={() => go(i + 1)} disabled={i === pages.length - 1}>Next page</button>
      </div>
    </div>
  );
}

export function Levers({ items }: { items: { name: string; what: string; see?: string }[] }) {
  return (
    <Stagger className="levers">
      {items.map((l) => (<motion.div className="lever" key={l.name} variants={item}><strong>{l.name}</strong><p>{l.what}</p>{l.see && <span className="see">You see it as {l.see}</span>}</motion.div>))}
    </Stagger>
  );
}
