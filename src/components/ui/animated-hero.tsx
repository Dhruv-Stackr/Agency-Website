"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { GlowButton } from "@/components/ui/glow-button";

function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Your story isn't.", "Your copy isn't.", "Your site isn't.", "Your pitch isn't.", "Your launch isn't."],
    []
  );

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section
      ref={ref}
      className="relative w-full pt-28 pb-16 lg:pt-36 lg:pb-24 px-6 flex flex-col items-center text-center overflow-hidden min-h-screen"
    >
      {/* WebGL shader — deepest layer, toned-down emerald wave */}
      <WebGLShader className="absolute inset-0 w-full h-full block" />

      {/* Grid pattern — sits above shader */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

      {/* Glow blobs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-emerald-900/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-emerald-950/20 blur-[80px] rounded-full pointer-events-none" />

      <motion.div className="max-w-[1000px] z-10" style={{ opacity, y }}>
        {/* Badge */}
        <motion.div
          className="gradient-button emerald-pill inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full text-xs font-medium text-emerald-400 tracking-wider"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Marketing sprints for developer-first teams
        </motion.div>

        {/* Headline with rotating audience */}
        <motion.h1
          className="font-display text-5xl sm:text-7xl lg:text-[96px] leading-[0.95] tracking-tight text-zinc-100 mb-8 mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block">Your product is real.</span>
          <span className="relative flex w-full justify-center overflow-hidden h-[1.05em] mt-3">
            &nbsp;
            {titles.map((title, index) => (
              <motion.span
                key={index}
                className="absolute italic text-emerald-400"
                initial={{ opacity: 0, y: 80 }}
                transition={{ type: "spring", stiffness: 50, damping: 12 }}
                animate={
                  titleNumber === index
                    ? { y: 0, opacity: 1 }
                    : { y: titleNumber > index ? -80 : 80, opacity: 0 }
                }
              >
                {title}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto font-sans leading-relaxed mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          We embed with early-stage Web3 and AI infra teams for 10–20 days to lock your narrative, ship core assets, and set up a content engine you can run yourselves.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlowButton
            label="Book a sprint fit call"
            className="glow-btn-shine w-full sm:w-auto"
            onClick={() => { window.location.href = "mailto:hello@relay.com"; }}
          />
          <GlowButton
            label="Send a brief"
            className="glow-btn-outline w-full sm:w-auto"
            onClick={() => { window.location.href = "mailto:hello@relay.com"; }}
          />
        </motion.div>

        {/* Social proof */}
        <motion.div
          className="pt-8 border-t border-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-sm text-zinc-500 flex flex-wrap justify-center gap-x-6 gap-y-2">
            <span>✓ Worked with teams at Amazon, Google &amp; Lightspeed</span>
            <span>✓ Operator-led, no junior handoffs</span>
            <span>✓ Fixed price, no retainer</span>
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          className="w-6 h-9 rounded-full border border-zinc-700 flex items-start justify-center p-1.5"
          animate={{ borderColor: ["rgba(63,63,70,0.6)", "rgba(16,185,129,0.4)", "rgba(63,63,70,0.6)"] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-emerald-500 rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export { AnimatedHero };
