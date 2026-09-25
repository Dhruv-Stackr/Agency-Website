"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

// A control that leans toward the cursor by up to `pull` px and snaps back. Pointer-only; no effect on touch.
export default function Magnetic({ children, pull = 12, className }: { children: React.ReactNode; pull?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 }), sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });
  function move(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * pull);
    y.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * pull);
  }
  return <motion.div ref={ref} className={className} style={{ x: sx, y: sy, display: "inline-block" }} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }}>{children}</motion.div>;
}
