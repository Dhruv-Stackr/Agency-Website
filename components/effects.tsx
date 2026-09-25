"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function useReduced() { const [r, setR] = useState(false); useEffect(() => setR(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []); return r; }
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Headline split into words; each word rises from a mask as the heading enters. Once.
export function SplitHeading({ text, as: Tag = "h2", className }: { text: string; as?: "h2" | "h3"; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReduced();
  useEffect(() => {
    if (reduce || !ref.current) return;
    const words = ref.current.querySelectorAll<HTMLElement>(".w");
    const ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 110 });
      gsap.to(words, { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.035, scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);
  return (
    <Tag ref={ref} className={`split ${className || ""}`} aria-label={text}>
      {text.split(" ").map((w, i) => (<span key={i}><span className="mask"><span className="w">{w}</span></span>{" "}</span>))}
    </Tag>
  );
}

// Pinned horizontal track: the wrapper pins while the inner track pans. The canonical Awwwards move.
export function HorizontalPan({ children, className }: { children: React.ReactNode; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null); const track = useRef<HTMLDivElement>(null);
  const reduce = useReduced();
  useEffect(() => {
    if (reduce || !wrap.current || !track.current) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      const distance = () => track.current!.scrollWidth - window.innerWidth;
      const tween = gsap.to(track.current, { x: () => -distance(), ease: "none", scrollTrigger: { trigger: wrap.current, start: "top 64px", end: () => `+=${distance()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 } });
      return () => tween.scrollTrigger?.kill();
    });
    return () => mm.revert();
  }, [reduce]);
  return <section ref={wrap} className={`hpan ${className || ""}`}><div ref={track} className="hpan-track">{children}</div></section>;
}

// Sticky stack: each card pins at the top; as the next arrives, the previous scales down and dims.
export function StickyStack({ cards }: { cards: { title: string; body: string; k: string; scene?: React.ReactNode }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReduced();
  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>(".stk-card");
      els.forEach((card, i) => {
        if (i === els.length - 1) return;
        const inner = card.querySelector(".stk-inner")!;
        gsap.to(inner, { scale: 0.94, ease: "none", scrollTrigger: { trigger: els[i + 1], start: "top bottom", end: "top top", scrub: true } });
        gsap.to(inner.children, { opacity: 0.3, ease: "none", scrollTrigger: { trigger: els[i + 1], start: "top bottom", end: "top top", scrub: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);
  return (
    <div ref={ref} className="stk">
      {cards.map((c, i) => (
        <div className="stk-card" key={c.k} style={{ top: `calc(64px + ${i * 12}px)` }}>
          <div className="stk-inner">
            <div className="stk-n">{String(i + 1).padStart(2, "0")}</div>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
            {c.scene}
          </div>
        </div>
      ))}
    </div>
  );
}

// Figure that reveals through a clip-path as it enters, with a light parallax after.
export function RevealFigure({ src, alt, caption, width = 1280, height = 720 }: { src: string; alt: string; caption?: string; width?: number; height?: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReduced();
  useEffect(() => {
    if (reduce || !ref.current) return;
    const img = ref.current.querySelector("img");
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "power4.inOut", scrollTrigger: { trigger: ref.current, start: "top 80%", once: true } });
      gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);
  return <figure ref={ref} className="rfig"><div className="rfig-clip"><img src={src} alt={alt} width={width} height={height} loading="lazy" /></div>{caption && <figcaption>{caption}</figcaption>}</figure>;
}

// A strip of the searches an owner's customers make, moving slowly and reversing with scroll direction. One per page.
export function SearchStrip({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReduced();
  useEffect(() => {
    if (reduce || !ref.current) return;
    const track = ref.current.querySelector<HTMLElement>(".strip-track")!;
    const ctx = gsap.context(() => {
      const w = track.scrollWidth / 2;
      const tween = gsap.to(track, { x: -w, duration: w / 60, ease: "none", repeat: -1 });
      ScrollTrigger.create({ onUpdate: (self) => { gsap.to(tween, { timeScale: self.direction === -1 ? -1 : 1, duration: 0.6, overwrite: true }); } });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);
  const all = [...items, ...items];
  return (
    <div ref={ref} className="strip" aria-label="Searches your customers make">
      <div className="strip-track">{all.map((t, i) => <span className="strip-item" key={i} aria-hidden={i >= items.length}>{t}</span>)}</div>
    </div>
  );
}

// Spotlight border: a soft highlight follows the cursor across the surface. Pointer-only.
export function Spotlight({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  function move(e: React.PointerEvent) { if (e.pointerType !== "mouse" || !ref.current) return; const r = ref.current.getBoundingClientRect(); ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`); ref.current.style.setProperty("--my", `${e.clientY - r.top}px`); }
  return <div ref={ref} className={`spot ${className || ""}`} onPointerMove={move}>{children}</div>;
}


// A margin index that stays on screen and follows the reader: the one element whose motion never resets between sections.
export function MarginIndex({ items, darkIds = [] }: { items: { id: string; label: string }[]; darkIds?: string[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((ents) => { for (const e of ents) if (e.isIntersecting) setActive(e.target.id); }, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);
  return (
    <nav className={`mindex${darkIds.includes(active) ? " dark" : ""}`} aria-label="On this page">
      {items.map((i) => (<a key={i.id} href={`#${i.id}`} className={active === i.id ? "on" : ""}><span className="dot" /><span className="lbl">{i.label}</span></a>))}
    </nav>
  );
}
