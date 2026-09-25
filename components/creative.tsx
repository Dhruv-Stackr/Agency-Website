"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, useInView } from "motion/react";
import { spring } from "./motion";
import { CallScene, ScorecardMini } from "./processScenes";
import { WorkLog, ThreeChannels } from "./dashScenes";

// Illustrative creatives. Every name is invented; every card is a drawing of a situation, not a screenshot.
export const SCENES = [
  { q: "best dermatologist near me", who: "a patient in Gurugram", ans: ["Dr Mehra Skin Clinic, Sector 29", "Lumen Dermatology, Golf Course Road", "your clinic?"], you: "your clinic" },
  { q: "boutique hotel in jaipur with a pool", who: "a couple planning a weekend", ans: ["Haveli Aarna, Civil Lines", "The Courtyard, Bani Park", "your hotel?"], you: "your hotel" },
  { q: "protein bar without sugar", who: "someone at the gym", ans: ["Barefoot Bars, cocoa and date", "Nutri Nook, peanut", "your brand?"], you: "your brand" },
];

export function Bubble({ text, side = "right", typing = false, delay = 0 }: { text: string; side?: "left" | "right"; typing?: boolean; delay?: number }) {
  return (
    <motion.div className={`bub ${side}`} initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6 }} transition={{ ...spring, delay }}>
      {typing ? <span className="typing"><i /><i /><i /></span> : text}
    </motion.div>
  );
}

export function AnswerCard({ items, delay = 0, label = "AI answer" }: { items: string[]; delay?: number; label?: string }) {
  return (
    <motion.div className="acard" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ ...spring, delay }}>
      <div className="acard-head"><span className="spark" aria-hidden="true">✦</span>{label}</div>
      <ol>{items.map((t, i) => (<motion.li key={t} className={i === items.length - 1 ? "you" : ""} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ ...spring, delay: delay + 0.25 + i * 0.18 }}>{t}</motion.li>))}</ol>
    </motion.div>
  );
}

// The hero conversation: question, thinking, answer; cycles through the scenes.
export function Conversation() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0); const [stage, setStage] = useState<0 | 1 | 2>(reduce ? 2 : 0);
  useEffect(() => {
    if (reduce) return;
    const t: ReturnType<typeof setTimeout>[] = [];
    setStage(0);
    t.push(setTimeout(() => setStage(1), 1400));
    t.push(setTimeout(() => setStage(2), 2400));
    t.push(setTimeout(() => setI((k) => (k + 1) % SCENES.length), 7600));
    return () => t.forEach(clearTimeout);
  }, [i, reduce]);
  const s = SCENES[i];
  return (
    <div className="convo" aria-label="How a customer's question becomes an answer that names businesses">
      <div className="convo-who mono">{s.who} asks</div>
      <AnimatePresence mode="popLayout">
        <Bubble key={`q${i}`} text={s.q} side="right" />
        {stage === 1 && <Bubble key={`t${i}`} text="" side="left" typing delay={0.1} />}
        {stage === 2 && <AnswerCard key={`a${i}`} items={s.ans} delay={0.05} />}
      </AnimatePresence>
      <div className="convo-dots" aria-hidden="true">{SCENES.map((_, k) => <span key={k} className={k === i ? "on" : ""} />)}</div>
    </div>
  );
}

// Beat 1: the answer covers the results.
export function AnswerOverResults() {
  return (
    <div className="serpfig">
      <div className="serpfig-box"><span className="mono">best dermatologist near me</span></div>
      <motion.div className="serpfig-ans" initial={{ height: 0, opacity: 0 }} whileInView={{ height: "auto", opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ ...spring, delay: 0.3 }}>
        <div className="acard-head"><span className="spark">✦</span>AI answer</div>
        <p>Three clinics near you are well reviewed for acne and pigmentation:</p>
        <ol><li>Dr Mehra Skin Clinic</li><li>Lumen Dermatology</li><li className="you">your clinic?</li></ol>
      </motion.div>
      {[0, 1, 2].map((k) => <div className="serpfig-row" key={k}><i style={{ width: `${62 - k * 9}%` }} /><i style={{ width: `${88 - k * 5}%` }} /></div>)}
    </div>
  );
}

// Beat 2: clicks below the answer fall by half.
export function ClicksFall() {
  const ref = useRef<HTMLDivElement>(null); const inView = useInView(ref, { once: true, amount: 0.5 });
  const rows = [15, 12, 9, 7];
  return (
    <div className="clicks" ref={ref}>
      <div className="clicks-col"><div className="mono lbl">Without an AI answer</div>{rows.map((v, k) => <div className="clicks-row" key={k}><i /><motion.b initial={{ width: 0 }} animate={inView ? { width: `${v * 5}%` } : undefined} transition={{ duration: 0.9, delay: 0.2 + k * 0.1, ease: [0.16, 1, 0.3, 1] }} /></div>)}<div className="clicks-num">15%<span>click a result</span></div></div>
      <div className="clicks-col"><div className="mono lbl">With an AI answer on top</div>{rows.map((v, k) => <div className="clicks-row" key={k}><i /><motion.b className="half" initial={{ width: 0 }} animate={inView ? { width: `${v * 5 * 0.53}%` } : undefined} transition={{ duration: 0.9, delay: 0.6 + k * 0.1, ease: [0.16, 1, 0.3, 1] }} /></div>)}<div className="clicks-num r">8%<span>click a result</span></div></div>
    </div>
  );
}

// Lever cards.
export function LeverFound() {
  return (
    <div className="lv lv-found">
      <div className="mono lbl">what they see</div>
      <div className="res"><span className="res-url">yourclinic.in</span><span className="res-title">Dr Mehra Skin Clinic, Sector 29. Acne, pigmentation, laser.</span><span className="res-desc">Book a consultation today. Open Mon to Sat, 10 to 7.</span></div>
      <motion.div className="res you" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: 0.4 }}><span className="res-url">your site</span><span className="res-title">Your clinic, named in your own words.</span><span className="res-desc">The two lines a search result and an AI answer quote first.</span></motion.div>
    </div>
  );
}
export function LeverChosen() {
  const ref = useRef<HTMLDivElement>(null); const inView = useInView(ref, { once: true, amount: 0.5 }); const reduce = useReducedMotion();
  const [v, setV] = useState(612);
  useEffect(() => { if (!inView || reduce) return; let n = 612; const id = setInterval(() => { n = Math.max(412, n - 7); setV(n); if (n <= 412) clearInterval(id); }, 40); return () => clearInterval(id); }, [inView, reduce]);
  return (
    <div className="lv lv-chosen" ref={ref}>
      <div className="mono lbl">cost per enquiry, this week</div>
      <div className="tick"><span className="rupee">₹</span>{reduce ? 412 : v}</div>
      <div className="tick-sub">tracking fixed Tuesday · budget moved to the campaign that converts</div>
      <div className="adrow"><span className="pill">Campaign 2</span><span className="adbar"><i style={{ width: "72%" }} /></span><span className="mono">9 enquiries</span></div>
      <div className="adrow"><span className="pill dim">Campaign 3</span><span className="adbar"><i style={{ width: "22%" }} /></span><span className="mono">2 enquiries</span></div>
    </div>
  );
}
export function LeverConverted() {
  return (
    <div className="lv lv-conv">
      <div className="phone"><div className="phone-bar" /><div className="phone-h">Book a consultation</div><div className="phone-p">Mon to Sat, 10 to 7. Sector 29.</div><motion.div className="phone-btn" initial={{ scale: 1 }} whileInView={{ scale: [1, 0.96, 1] }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.5 }}>Enquire on WhatsApp</motion.div><div className="phone-load mono">loads in 1.2 s on a phone</div></div>
      <motion.div className="count" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: 1.1 }}><b>14</b> enquiries this week<span className="mono">last week 11</span></motion.div>
    </div>
  );
}
export function LeverRemembered() {
  return (
    <div className="lv lv-rem">
      <div className="mono lbl">a customer, six weeks later</div>
      <Bubble text="Hi, I came in for the acne treatment in August. Can I book my sister in for Saturday?" side="left" />
      <Bubble text="Of course. Saturday 11 am is free." side="right" delay={0.5} />
      <motion.div className="rem-note mono" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.1 }}>the number you chose: patients who come back, and who they bring</motion.div>
    </div>
  );
}

// Two clocks: campaigns in weeks, search in months.
export function TwoClocks() {
  const ref = useRef<HTMLDivElement>(null); const inView = useInView(ref, { once: true, amount: 0.5 });
  const Clock = ({ label, turns, sub }: { label: string; turns: number; sub: string }) => (
    <div className="clock">
      <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" /><motion.line x1="50" y1="50" x2="50" y2="14" initial={{ rotate: 0 }} animate={inView ? { rotate: 360 * turns } : undefined} transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }} style={{ originX: "50px", originY: "50px" }} /><circle cx="50" cy="50" r="3" className="pin" /></svg>
      <div className="clock-l">{label}</div><div className="clock-s mono">{sub}</div>
    </div>
  );
  return <div className="clocks" ref={ref}><Clock label="Campaigns" turns={0.75} sub="weeks" /><Clock label="Search" turns={3} sub="months" /></div>;
}

// Enquiries tile with a sparkline.
export function EnquiriesTile() {
  const pts = [6, 8, 7, 9, 11, 10, 14];
  const ref = useRef<HTMLDivElement>(null); const inView = useInView(ref, { once: true, amount: 0.5 });
  const W = 220, H = 60; const d = pts.map((p, i) => `${(i / (pts.length - 1)) * W},${H - (p / 16) * H}`).join(" L ");
  return (
    <div className="dash-card tile" ref={ref}>
      <div className="dash-head"><span>Enquiries this week</span><span className="mono">vs last week</span></div>
      <div className="tile-big"><b>14</b><span className="delta">+3</span></div>
      <svg viewBox={`0 0 ${W} ${H}`} className="spark" aria-hidden="true"><motion.path d={`M ${d}`} fill="none" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : undefined} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} /><circle cx={W} cy={H - (14 / 16) * H} r="4" className="end" /></svg>
      <div className="dash-foot mono">Example. Sample numbers.</div>
    </div>
  );
}

// Small scene per month card.
export function MonthScene({ k }: { k: number }) {
  if (k === 0) return <div className="scene"><CallScene compact /></div>;
  if (k === 1) return <div className="scene"><div className="apage solo"><div className="apage-top mono"><span>page 01</span><span>the audit · sample</span></div><ScorecardMini /></div></div>;
  if (k === 2) return <div className="scene"><WorkLog compact /></div>;
  return <div className="scene"><ThreeChannels compact /></div>;
}


export function WhoCards() {
  const cards = [
    { who: "a clinic owner", q: "IVF clinic in Gurugram, cost?", a: ["Two clinics named. Yours?"] },
    { who: "a homestay owner", q: "homestay in Coorg for a family", a: ["Three stays named. Yours?"] },
    { who: "a D2C founder", q: "ayurvedic hair oil that works", a: ["Two brands named. Yours?"] },
    { who: "a coaching institute owner", q: "best CA coaching in Pune", a: ["Three institutes named. Yours?"] },
    { who: "a showroom owner", q: "modular kitchen showroom, Jaipur", a: ["Two showrooms named. Yours?"] },
    { who: "a software founder", q: "billing software for small clinics", a: ["Four tools named. Yours?"] },
  ];
  return (
    <div className="who-cards">
      {cards.map((c, i) => (
        <motion.div className="who-card" key={c.who} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: i * 0.12 }}>
          <span className="mono">{c.who}, whose customer asks</span>
          <div className="bub right">{c.q}</div>
          <div className="acard"><div className="acard-head"><span className="spark">✦</span>AI answer</div><ol><li className="you">{c.a[0]}</li></ol></div>
        </motion.div>
      ))}
    </div>
  );
}
