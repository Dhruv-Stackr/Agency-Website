"use client";
// Adapted from 21st.dev "Scrollable Card Stack" by educalvolpz (id 25296): snap stack with scale/blur depth,
// keyboard, touch and dot navigation. Changes: wheel is released at both ends so the page keeps scrolling,
// cards carry audit pages with captions, styled to the Relay system.
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export type DeckCard = { id: string; src: string; alt: string; name: string; caption: string };
const OFFSET = -26, VISIBLE = 3, SCALE = 0.07, MIN_INTERVAL = 320;

export default function DeckStack({ items, className }: { items: DeckCard[]; className?: string }) {
  const [i, setI] = useState(0);
  const [busy, setBusy] = useState(false);
  const last = useRef(0);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const max = items.length - 1;

  const go = useCallback((dir: 1 | -1) => {
    const now = Date.now(); if (busy || now - last.current < MIN_INTERVAL) return false;
    const n = Math.min(max, Math.max(0, i + dir)); if (n === i) return false;
    last.current = now; setBusy(true); setI(n); setTimeout(() => setBusy(false), 300); return true;
  }, [busy, i, max]);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 20) return;
      const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;
      const atEnd = (dir === 1 && i === max) || (dir === -1 && i === 0);
      if (atEnd) return;            // let the page scroll
      e.preventDefault(); go(dir);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [go, i, max]);

  const t0 = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { t0.current = e.touches[0].clientY; };
  const onTouchMove = (e: React.TouchEvent) => { const d = t0.current - e.touches[0].clientY; if (Math.abs(d) > 70) { if (go(d > 0 ? 1 : -1)) t0.current = e.touches[0].clientY; } };
  const onKey = (e: React.KeyboardEvent) => { if (["ArrowDown", "ArrowRight"].includes(e.key)) { e.preventDefault(); go(1); } if (["ArrowUp", "ArrowLeft"].includes(e.key)) { e.preventDefault(); go(-1); } };

  return (
    <section className={`dstack ${className || ""}`} aria-label="The audit, page by page">
      <div className="dstack-stage" ref={ref} role="application" tabIndex={0} onKeyDown={onKey} onTouchStart={onTouchStart} onTouchMove={onTouchMove} aria-roledescription="carousel">
        {items.map((it, k) => {
          const off = k - i; const behind = k < i;
          const scale = reduce || behind ? 1 : Math.max(0.6, 1 - off * SCALE);
          const y = reduce ? 0 : behind ? 24 : Math.max(OFFSET * VISIBLE, off * OFFSET);
          const active = k === i;
          return (
            <motion.figure key={it.id} className="dstack-card" aria-hidden={!active} initial={false}
              animate={{ scale, y, opacity: behind ? 0 : 1 }} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 250, damping: 22, mass: 0.6 }}
              style={{ zIndex: items.length - k, filter: !reduce && behind ? "blur(2px)" : "none", pointerEvents: active ? "auto" : "none" }}>
              <img src={it.src} alt={it.alt} width="1280" height="720" loading="lazy" draggable={false} />
              <figcaption><strong>{it.name}</strong> {it.caption}</figcaption>
            </motion.figure>
          );
        })}
      </div>
      <div className="dstack-nav">
        <button type="button" className="txt" onClick={() => go(-1)} disabled={i === 0}>Previous page</button>
        <div className="dstack-dots" role="tablist" aria-label="Pages">{items.map((it, k) => <button key={it.id} type="button" role="tab" aria-selected={k === i} aria-label={`Page ${k + 1} of ${items.length}: ${it.name}`} className={k === i ? "on" : ""} onClick={() => { if (k !== i && !busy) { setBusy(true); setI(k); setTimeout(() => setBusy(false), 300); } }} />)}</div>
        <button type="button" className="txt" onClick={() => go(1)} disabled={i === max}>Next page</button>
      </div>
      <p className="sr-only" aria-live="polite">Page {i + 1} of {items.length}: {items[i].name}. Use the arrow keys or the dots.</p>
    </section>
  );
}
