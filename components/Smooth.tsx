"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Smooth scroll (Lenis) driving GSAP ScrollTrigger. Off under reduced motion and on coarse pointers without hover.
export default function Smooth() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add("lenis-on");
    (window as unknown as { __lenis?: Lenis; __st?: typeof ScrollTrigger }).__lenis = lenis;
    (window as unknown as { __st?: typeof ScrollTrigger }).__st = ScrollTrigger;
    return () => { gsap.ticker.remove(tick); lenis.destroy(); document.documentElement.classList.remove("lenis-on"); };
  }, []);
  return null;
}
