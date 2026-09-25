"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion, useInView } from "motion/react";
import { spring } from "./motion";

// The pinned story: three beats about the visitor's customer, on Ink. One theme flip per page, deliberate.
type Beat = { k: string; title: string; body: string; figure: string; label: string; source: string; vis?: React.ReactNode };

export function Story({ beats }: { beats: Beat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [i, setI] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setI(Math.min(beats.length - 1, Math.floor(v * beats.length))));
  if (reduce) return (
    <div className="story-static">{beats.map((b) => <div className="beat" key={b.k}><h3>{b.title}</h3>{b.vis && <div className="beat-vis">{b.vis}</div>}{b.figure && <div className="beat-figure">{b.figure}</div>}<div className="beat-label">{b.label}</div><p>{b.body}</p></div>)}</div>
  );
  return (
    <div className="story" ref={ref} style={{ height: `${beats.length * 100}vh` }}>
      <div className="story-pin">
        <div className="story-progress" aria-hidden="true">{beats.map((b, k) => <span key={b.k} className={k <= i ? "on" : ""} />)}</div>
        <div className="story-grid">
          <div className="story-text">
            {beats.map((b, k) => (
              <motion.div key={b.k} className="beat" initial={false} animate={{ opacity: k === i ? 1 : 0, y: k === i ? 0 : k < i ? -14 : 14 }} transition={spring} style={{ position: k === 0 ? "relative" : "absolute", inset: 0, pointerEvents: k === i ? "auto" : "none" }}>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </motion.div>
            ))}
          </div>
          <div className="story-figure">
            {beats.map((b, k) => (
              <motion.div key={b.k} className="beat-num" initial={false} animate={{ opacity: k === i ? 1 : 0, scale: k === i ? 1 : 0.96 }} transition={spring} style={{ position: k === 0 ? "relative" : "absolute", inset: 0 }}>
                {b.vis && <div className="beat-vis">{b.vis}</div>}
                {b.figure && <div className="beat-figure">{b.figure}</div>}
                <div className="beat-label">{b.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// The visibility ladder. Single series, one hue, the visitor's tier marked in red. Direct labels, no legend needed.
export function Ladder() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const rows = [
    { name: "Household names", v: 73, you: false },
    { name: "Mid-sized brands", v: 44, you: false },
    { name: "Small brands. You.", v: 11, you: true },
  ];
  const W = 560, H = 214, L = 170, R = 60, rowH = 52, barH = 22;
  const w11 = ((W - L - R) * 11) / 100, w44 = ((W - L - R) * 44) / 100;
  return (
    <figure className="ladder">
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="How often brands are named in relevant AI answers: household names 73 percent, mid-sized brands 44 percent, small brands 11 percent">
        {rows.map((r, k) => {
          const y = 16 + k * rowH; const w = ((W - L - R) * r.v) / 100;
          return (
            <g key={r.name}>
              <text x={L - 12} y={y + barH / 2 + 5} textAnchor="end" className={`ladder-name${r.you ? " you" : ""}`}>{r.name}</text>
              <rect x={L} y={y} width={W - L - R} height={barH} className="ladder-track" />
              <motion.rect x={L} y={y} height={barH} className={`ladder-bar${r.you ? " you" : ""}`} initial={reduce ? { width: w } : { width: 0 }} animate={inView ? { width: w } : undefined} transition={{ duration: 1.0, delay: 0.1 + k * 0.15, ease: [0.16, 1, 0.3, 1] }} />
              <motion.text x={L + w + 10} y={y + barH / 2 + 5} className={`ladder-val${r.you ? " you" : ""}`} initial={reduce ? false : { opacity: 0 }} animate={inView ? { opacity: 1 } : undefined} transition={{ delay: 0.9 + k * 0.15 }}>{r.v}%</motion.text>
            </g>
          );
        })}
        <motion.g initial={reduce ? false : { opacity: 0 }} animate={inView ? { opacity: 1 } : undefined} transition={{ delay: 1.5 }}>
          <line x1={L + w11} y1={16 + 2 * rowH + barH + 8} x2={L + w44} y2={16 + 2 * rowH + barH + 8} className="ladder-gap" />
          <line x1={L + w11} y1={16 + 2 * rowH + barH + 3} x2={L + w11} y2={16 + 2 * rowH + barH + 13} className="ladder-gap" />
          <line x1={L + w44} y1={16 + 2 * rowH + barH + 3} x2={L + w44} y2={16 + 2 * rowH + barH + 13} className="ladder-gap" />
          <text x={L + (w11 + w44) / 2} y={16 + 2 * rowH + barH + 26} textAnchor="middle" className="ladder-gap-lbl">the climb: 11% to 44%</text>
        </motion.g>
      </svg>
      <figcaption>How often an AI answer about a category names a brand of each size.</figcaption>
    </figure>
  );
}
