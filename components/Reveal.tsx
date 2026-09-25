"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
// Adds the reveal behaviour only when JS runs. Server HTML is fully visible at rest.
// Re-arms on every route change, watches for sections added later, reveals anything already above the fold,
// and never leaves a section hidden for longer than a moment if the observer does not fire.
export default function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealAll = () => document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((e) => e.classList.add("in"));
    if (!("IntersectionObserver" in window) || reduce) { revealAll(); return; }
    const io = new IntersectionObserver((entries) => { for (const en of entries) if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }, { rootMargin: "0px 0px -5% 0px", threshold: 0 });
    const arm = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)").forEach((e) => {
        const r = e.getBoundingClientRect();
        if (r.bottom < 0) e.classList.add("in"); else io.observe(e);
      });
    };
    arm();
    const mo = new MutationObserver(() => arm());
    mo.observe(document.body, { childList: true, subtree: true });
    const fallback = window.setTimeout(() => { document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)").forEach((e) => { const r = e.getBoundingClientRect(); if (r.top < window.innerHeight * 1.2) e.classList.add("in"); }); }, 2500);
    return () => { io.disconnect(); mo.disconnect(); window.clearTimeout(fallback); };
  }, [pathname]);
  return null;
}
