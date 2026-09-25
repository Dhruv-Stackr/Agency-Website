"use client";
// Where 100 of your customers go. One hundred dots, three stops, two cleared numbers rounded to whole people:
// 51.5% of searches show an AI answer first (52 of 100); 8% of those visits click a result below it (4 of 52).
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Icon } from "./DashboardScene";

const N = 100, AI = 52, CLICK = 4, ACT = AI - CLICK;
const CELL = 11, DOT = 7;
const INK = "#0E0E0E", RED = "#E8380D", ASH = "#B9B5AE";
type Pt = { x: number; y: number };
const STEPS = [
  { n: "100", t: "people search for what you sell this week." },
  { n: "52", t: "of them see an AI answer before any result." },
  { n: "48", t: "of those 52 never click a website. They act on the answer, and it names three or four businesses. The other 4 click a result below it." },
];

function gridIn(rect: DOMRect, base: DOMRect, count: number): Pt[] {
  const cols = Math.max(1, Math.min(count, Math.floor(rect.width / CELL)));
  const rows = Math.ceil(count / cols);
  const x0 = rect.left - base.left + (rect.width - cols * CELL) / 2 + CELL / 2;
  const y0 = rect.top - base.top + (rect.height - rows * CELL) / 2 + CELL / 2;
  return Array.from({ length: count }, (_, i) => ({ x: x0 + (i % cols) * CELL, y: y0 + Math.floor(i / cols) * CELL }));
}
function link(a: DOMRect, b: DOMRect, base: DOMRect, vertical: boolean) {
  if (vertical) { const x1 = a.left - base.left + a.width / 2, y1 = a.bottom - base.top, x2 = b.left - base.left + b.width / 2, y2 = b.top - base.top; const m = (y1 + y2) / 2; return `M${x1},${y1} C${x1},${m} ${x2},${m} ${x2},${y2}`; }
  const x1 = a.right - base.left, y1 = a.top - base.top + a.height / 2, x2 = b.left - base.left, y2 = b.top - base.top + b.height / 2; const m = (x1 + x2) / 2;
  return `M${x1},${y1} C${m},${y1} ${m},${y2} ${x2},${y2}`;
}

export default function HundredCustomers() {
  const wrap = useRef<HTMLDivElement>(null);
  const slots = { a: useRef<HTMLDivElement>(null), b1: useRef<HTMLDivElement>(null), b2: useRef<HTMLDivElement>(null), c1: useRef<HTMLDivElement>(null), c2: useRef<HTMLDivElement>(null) };
  const boxes = { a: useRef<HTMLDivElement>(null), b1: useRef<HTMLDivElement>(null), b2: useRef<HTMLDivElement>(null), c1: useRef<HTMLDivElement>(null), c2: useRef<HTMLDivElement>(null) };
  const inView = useInView(wrap, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const [pos, setPos] = useState<Pt[][] | null>(null);
  const [paths, setPaths] = useState<string[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [stage, setStage] = useState(reduce ? 2 : 0);
  const [shown, setShown] = useState(!!reduce);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const layout = useCallback(() => {
    const el = wrap.current; if (!el) return;
    const base = el.getBoundingClientRect();
    const r = Object.fromEntries(Object.entries(slots).map(([k, ref]) => [k, ref.current!.getBoundingClientRect()])) as Record<keyof typeof slots, DOMRect>;
    const bx = Object.fromEntries(Object.entries(boxes).map(([k, ref]) => [k, ref.current!.getBoundingClientRect()])) as Record<keyof typeof boxes, DOMRect>;
    const a = gridIn(r.a, base, N), b1 = gridIn(r.b1, base, AI), b2 = gridIn(r.b2, base, N - AI), c1 = gridIn(r.c1, base, ACT), c2 = gridIn(r.c2, base, CLICK);
    const s0 = a;
    const s1 = Array.from({ length: N }, (_, i) => (i < AI ? b1[i] : b2[i - AI]));
    const s2 = Array.from({ length: N }, (_, i) => (i < ACT ? c1[i] : i < AI ? c2[i - ACT] : b2[i - AI]));
    const vertical = base.width < 700;
    setPaths(vertical ? [] : [link(bx.a, bx.b1, base, false), link(bx.a, bx.b2, base, false), link(bx.b1, bx.c1, base, false), link(bx.b1, bx.c2, base, false)]);
    setSize({ w: base.width, h: base.height }); setPos([s0, s1, s2]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => { layout(); const ro = new ResizeObserver(() => layout()); if (wrap.current) ro.observe(wrap.current); return () => ro.disconnect(); }, [layout]);

  const play = useCallback(() => {
    clear(); setShown(true); setStage(0);
    timers.current.push(setTimeout(() => setStage(1), 2000), setTimeout(() => setStage(2), 4200));
  }, []);
  useEffect(() => { if (inView && !reduce) play(); return clear; }, [inView, reduce, play]);
  const jump = (k: number) => { clear(); setShown(true); setStage(k); };

  const dot = (i: number) => stage === 0 ? [INK, 1] : stage === 1 ? (i < AI ? [RED, 1] : [ASH, 0.9]) : i < ACT ? [RED, 1] : i < AI ? [INK, 1] : [ASH, 0.4];
  const on = (k: string) => (stage === 0 && k === "a") || (stage === 1 && k === "b1") || (stage === 2 && k === "c1");
  const dim = (k: string) => (stage === 0 && k !== "a") || (stage >= 1 && k === "a") || (stage === 1 && (k === "c1" || k === "c2")) || (stage === 2 && k === "b2");

  return (
    <div className="hc" ref={wrap}>
      <div className="hc-steps" role="group" aria-label="The three stops">
        {STEPS.map((s, k) => (
          <button type="button" key={s.n} className={k === stage ? "on" : k < stage ? "done" : ""} aria-pressed={k === stage} onClick={() => jump(k)}><b>{s.n}</b><span>{s.t}</span></button>
        ))}
        <button type="button" className="txt hc-replay" onClick={play}>Replay</button>
      </div>

      <div className="hc-stage">
        <div className="hc-col">
          <div ref={boxes.a} className={`hc-box${on("a") ? " on" : ""}${dim("a") ? " dim" : ""}`}><div className="hc-lbl"><Icon name="search" />this week</div><div className="hc-slots big" ref={slots.a} /><div className="hc-cap"><b>100</b> people search for what you sell</div></div>
        </div>
        <div className="hc-col">
          <div ref={boxes.b1} className={`hc-box red${on("b1") ? " on" : ""}${dim("b1") ? " dim" : ""}`}><div className="hc-lbl"><Icon name="sparkle" />AI answer first</div><div className="hc-slots" ref={slots.b1} /><div className="hc-cap"><b>52</b> see an AI answer before any result</div></div>
          <div ref={boxes.b2} className={`hc-box${dim("b2") ? " dim" : ""}`}><div className="hc-lbl"><Icon name="doc" />results list</div><div className="hc-slots" ref={slots.b2} /><div className="hc-cap"><b>48</b> see the results list</div></div>
        </div>
        <div className="hc-col">
          <div ref={boxes.c1} className={`hc-box red ans${on("c1") ? " on" : ""}${dim("c1") ? " dim" : ""}`}>
            <div className="hc-lbl"><Icon name="sparkle" />the answer</div>
            <ol className="hc-ans"><li>Dr Mehra Skin Clinic, Sector 29</li><li>Lumen Dermatology, Golf Course Road</li><li className="you">your clinic?</li></ol>
            <div className="hc-slots" ref={slots.c1} />
            <div className="hc-cap"><b>48</b> act on the answer. They never click a website.</div>
          </div>
          <div ref={boxes.c2} className={`hc-box${dim("c2") ? " dim" : ""}`}><div className="hc-lbl"><Icon name="grid" />a result below it</div><div className="hc-slots small" ref={slots.c2} /><div className="hc-cap"><b>4</b> click a website below the answer</div></div>
        </div>
      </div>

      <svg className="hc-lines" width={size.w} height={size.h} viewBox={`0 0 ${size.w || 1} ${size.h || 1}`} aria-hidden="true">
        {paths.map((d, k) => <motion.path key={k} d={d} fill="none" initial={false} animate={{ pathLength: (k < 2 ? stage >= 1 : stage >= 2) ? 1 : 0, opacity: (k < 2 ? stage >= 1 : stage >= 2) ? 1 : 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />)}
      </svg>
      <div className="hc-dots" aria-hidden="true">
        {pos && shown && pos[stage].map((p, i) => { const [bg, op] = dot(i) as [string, number]; return (
          <motion.span key={i} initial={reduce ? false : { x: p.x - DOT / 2, y: p.y - DOT / 2, scale: 0, backgroundColor: INK, opacity: 1 }} animate={{ x: p.x - DOT / 2, y: p.y - DOT / 2, scale: 1, backgroundColor: bg, opacity: op }} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 70, damping: 16, mass: 0.8, delay: i * 0.007 }} />
        ); })}
      </div>

      <motion.p className="hc-punch" initial={false} animate={{ color: stage === 2 ? INK : "#6B6862" }} transition={{ duration: 0.5 }}>
        If your name is in the answer, those <b>48</b> are your enquiries. If it is not, they never knew you existed.
      </motion.p>
      <p className="sr-only">Of 100 people who search, 52 see an AI answer first. 48 of those 52 never click a website; they act on the answer, which names three or four businesses. 4 click a result below it. 48 see the results list.</p>
    </div>
  );
}
