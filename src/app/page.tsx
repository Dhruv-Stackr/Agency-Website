"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, FileText, Globe, BookOpen, Calendar, Play, Mail, Package, Film, Palette, BarChart2, Rocket, Users, Link2 } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { AnimatedHero } from '@/components/ui/animated-hero';
import { GlowButton } from '@/components/ui/glow-button';
import { ShimmerButton } from '@/components/ui/shimmer-button';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const Navbar = () => {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ['rgba(9,9,11,0)', 'rgba(9,9,11,0.95)']);
  const border = useTransform(scrollY, [0, 80], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.05)']);

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md"
      style={{ backgroundColor: bg, borderBottom: '1px solid', borderColor: border }}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src="/relay%20logo.svg" alt="Relay" className="h-8 w-auto" />
        </motion.div>
        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a href="#sprints" className="hidden sm:block text-sm font-sans text-zinc-400 hover:text-zinc-100 transition-colors">
            Sprints
          </a>
          <a href="#process" className="hidden sm:block text-sm font-sans text-zinc-400 hover:text-zinc-100 transition-colors">
            Process
          </a>
          <ShimmerButton
            background="rgba(4, 120, 87, 1)"
            shimmerColor="rgba(167, 243, 208, 0.6)"
            shimmerDuration="2.5s"
            className="!px-4 !py-2 text-sm font-semibold font-sans tracking-wide"
            onClick={() => { window.location.href = "mailto:hello@relay.com"; }}
          >
            Book a sprint fit call
          </ShimmerButton>
        </motion.div>
      </div>
    </motion.nav>
  );
};


const SprintDashboardMock = () => (
  <div className="h-full w-full flex flex-col bg-[#09090b] text-zinc-100 font-sans overflow-hidden">
    {/* Top bar */}
    <div className="flex items-center justify-between px-3 md:px-5 py-2 md:py-3 border-b border-white/5 shrink-0">
      <div className="flex items-center gap-2 md:gap-3 min-w-0">
        <img src="/relay%20logo.svg" alt="Relay" className="h-4 w-auto shrink-0" />
        <span className="text-zinc-700">/</span>
        <span className="text-xs md:text-sm text-zinc-500 truncate">Foundation Sprint</span>
      </div>
      <div className="flex items-center gap-1.5 shrink-0 ml-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] md:text-xs text-emerald-400 font-medium whitespace-nowrap">Active · Day 8 of 10</span>
      </div>
    </div>

    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar — hidden on mobile */}
      <div className="hidden md:flex w-40 border-r border-white/5 flex-col gap-1 p-3 shrink-0">
        {[
          { label: 'Overview', active: true },
          { label: 'Positioning', done: true },
          { label: 'Landing Copy', done: true },
          { label: 'Explainer', active: false },
          { label: 'Content Plan', active: false },
          { label: 'Handoff', active: false },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs ${
              item.active ? 'bg-emerald-950/40 text-emerald-300' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <span>{item.label}</span>
            {item.done && <span className="text-emerald-500 text-[10px]">✓</span>}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden flex flex-col p-3 md:p-5 gap-3 md:gap-4">
        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-[10px] md:text-[11px] text-zinc-500 mb-1.5">
            <span>Sprint Progress</span>
            <span className="text-emerald-400">57%</span>
          </div>
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full w-[57%] bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" />
          </div>
        </div>

        {/* Deliverables grid — 1 col on mobile, 2 on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 flex-1 overflow-hidden">
          {/* Positioning Doc */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-3 md:p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Positioning</span>
              <span className="text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-900/40 px-2 py-0.5 rounded-full shrink-0">Done</span>
            </div>
            <p className="text-[11px] md:text-xs text-zinc-300 leading-relaxed line-clamp-3">"Relay is the embedded marketing sprint for technical teams who need a real narrative, not another agency retainer."</p>
            <div className="mt-auto flex gap-1.5 flex-wrap">
              {['Web3', 'AI', 'Devtools'].map(t => (
                <span key={t} className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded">{t}</span>
              ))}
            </div>
          </div>

          {/* Content Plan */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-3 md:p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">4-Week Plan</span>
              <span className="text-[10px] bg-zinc-800 text-zinc-400 border border-zinc-700/40 px-2 py-0.5 rounded-full shrink-0">In Progress</span>
            </div>
            <div className="flex flex-col gap-1 mt-1">
              {[
                { week: 'Wk 1', label: 'Founder story thread', done: true },
                { week: 'Wk 2', label: 'Product explainer post', done: true },
                { week: 'Wk 3', label: 'Community launch', done: false },
                { week: 'Wk 4', label: 'Distribution push', done: false },
              ].map(row => (
                <div key={row.week} className="flex items-center gap-2 text-[10px] md:text-[11px]">
                  <span className="text-zinc-600 w-7 shrink-0">{row.week}</span>
                  <span className={`truncate ${row.done ? 'text-zinc-400 line-through' : 'text-zinc-300'}`}>{row.label}</span>
                  {row.done && <span className="ml-auto text-emerald-500 shrink-0">✓</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Landing Copy — hidden on mobile to avoid overflow */}
          <div className="hidden md:flex bg-zinc-900/50 border border-white/5 rounded-xl p-3 md:p-4 flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Landing Copy</span>
              <span className="text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-900/40 px-2 py-0.5 rounded-full">Done</span>
            </div>
            <div className="flex flex-col gap-1">
              {['Hero headline', 'Value props (x3)', 'Social proof block', 'CTA copy'].map(item => (
                <div key={item} className="flex items-center gap-2 text-[11px] text-zinc-400">
                  <span className="text-emerald-500 shrink-0">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Comms System — hidden on mobile to avoid overflow */}
          <div className="hidden md:flex bg-zinc-900/50 border border-white/5 rounded-xl p-3 md:p-4 flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Comms System</span>
              <span className="text-[10px] bg-zinc-800 text-zinc-400 border border-zinc-700/40 px-2 py-0.5 rounded-full">Up next</span>
            </div>
            <div className="flex flex-col gap-1.5 mt-1">
              {['Newsletter template', 'Discord welcome flow', 'Brand voice guide'].map(item => (
                <div key={item} className="flex items-center gap-2 text-[11px] text-zinc-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const logoList = [
  { name: 'Amazon',     file: 'amazon.svg'     },
  { name: 'Google',     file: 'Google.svg'     },
  { name: 'Lightspeed', file: 'Lightspeed.svg' },
  { name: 'Catalysis',  file: 'Catalysis.svg'  },
  { name: 'Unhashed',   file: 'Unhashed.svg'   },
  { name: 'Byzantine',  file: 'Byzantine.svg'  },
  { name: 'Pulpkey',    file: 'Pulpkey.svg'    },
];

const LogoStrip = () => (
  <section className="py-14 px-6 border-t border-white/5 bg-[#09090b]">
    <div className="container mx-auto max-w-5xl">
      <p className="text-center text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em] mb-10">
        Previously worked with teams at
      </p>
      <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-evenly gap-x-8 gap-y-5">
        {logoList.map(({ name, file }) => (
          <div
            key={name}
            className="w-24 h-7 shrink-0 flex items-center justify-center opacity-35 hover:opacity-60 transition-opacity duration-300"
          >
            <img
              src={`/logos/${file}`}
              alt={name}
              className="max-h-full max-w-full object-contain"
              style={{ filter: 'contrast(10) brightness(0) invert(1)' }}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ProductPreview = () => (
  <section className="bg-[#09090b] overflow-hidden">
    <ContainerScroll
      titleComponent={
        <div className="mb-6 px-6">
          <p className="text-xs font-mono text-emerald-500 uppercase tracking-widest mb-4">What a sprint looks like</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-zinc-100 tracking-tight text-balance">
            Clarity, assets, and a system —<br className="hidden sm:block" />
            <span className="text-zinc-500 italic"> in 10 days.</span>
          </h2>
        </div>
      }
    >
      <SprintDashboardMock />
    </ContainerScroll>
  </section>
);

const diffPairs = [
  {
    before: { text: "Strong product, weak narrative",  comment: "// non-engineers can't follow along → no word-of-mouth" },
    after:  { text: "Clear, credible positioning",    comment: "// one sentence that lands for devs, investors & users" },
  },
  {
    before: { text: "Launches without messaging",     comment: "// reactive posts, no cohesive story across channels" },
    after:  { text: "Ship-ready launch assets",       comment: "// landing copy, explainers & frameworks ready to go" },
  },
  {
    before: { text: "Founder writing every post",     comment: "// steals time away from actually building the product" },
    after:  { text: "A repeatable content system",    comment: "// structured engine your team can run without us" },
  },
];

const ProblemValue = () => (
  <section className="pt-16 pb-10 lg:pt-24 lg:pb-12 px-6 border-t border-white/5 relative bg-[#09090b]">
    <div className="container mx-auto max-w-4xl">
      <motion.div
        className="mb-10 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-zinc-100 mb-4 tracking-tight text-balance">
          You have a strong product,<br className="hidden sm:block" />but the external story is weak.
        </h2>
        <p className="text-zinc-400 text-lg">Sound familiar? Here's what we fix.</p>
      </motion.div>

      <motion.div
        className="rounded-2xl border border-zinc-800/50 font-mono text-sm overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Terminal chrome */}
        <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900/80 border-b border-zinc-800/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
          </div>
          <span className="text-zinc-500 text-xs">narrative.diff</span>
        </div>

        <div className="bg-[#0d0d10]">
          {/* Hunk header */}
          <div className="px-4 py-1.5 bg-zinc-900/30 border-b border-zinc-800/20 text-zinc-600 text-xs">
            @@ -1,6 +1,6 @@ external narrative
          </div>

          {diffPairs.map((pair, i) => (
            <div key={i} className={i > 0 ? 'border-t border-zinc-800/20' : ''}>
              {/* Removed line */}
              <div className="flex items-baseline hover:bg-red-950/20 transition-colors">
                <span className="text-zinc-700 text-xs w-8 py-2.5 px-2 shrink-0 text-right select-none">{i * 2 + 1}</span>
                <span className="text-red-400/60 w-5 py-2.5 shrink-0 select-none">−</span>
                <div className="py-2.5 pr-4 flex flex-wrap gap-x-3 min-w-0">
                  <span className="text-red-300/70 shrink-0">{pair.before.text}</span>
                  <span className="text-zinc-600 text-xs">{pair.before.comment}</span>
                </div>
              </div>
              {/* Added line */}
              <div className="flex items-baseline hover:bg-emerald-950/20 transition-colors bg-emerald-950/5">
                <span className="text-zinc-700 text-xs w-8 py-2.5 px-2 shrink-0 text-right select-none">{i * 2 + 2}</span>
                <span className="text-emerald-400/70 w-5 py-2.5 shrink-0 select-none">+</span>
                <div className="py-2.5 pr-4 flex flex-wrap gap-x-3 min-w-0">
                  <span className="text-emerald-300 shrink-0">{pair.after.text}</span>
                  <span className="text-zinc-600 text-xs">{pair.after.comment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary bar */}
        <div className="px-4 py-3 bg-zinc-900/60 border-t border-zinc-800/50 flex items-center gap-6 text-xs">
          <span className="text-red-400/60">−3 pain points</span>
          <span className="text-emerald-400">+3 fixes</span>
          <span className="text-zinc-600 ml-auto">relay sprint applied ✓</span>
        </div>
      </motion.div>

      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-sm text-zinc-500 mb-5">Sound familiar? Let's fix it in 10 days.</p>
        <GlowButton
          label="Book a sprint fit call"
          onClick={() => { window.location.href = "mailto:hello@relay.com"; }}
        />
      </motion.div>
    </div>
  </section>
);

const SprintOffers = () => (
  <section id="sprints" className="py-16 lg:py-24 px-6 border-t border-white/5 bg-[#09090b]">
    <div className="container mx-auto max-w-5xl">
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
      >
        <h2 className="text-4xl sm:text-5xl font-display text-zinc-100 mb-6 tracking-tight">Two sprints. One fixed scope each.</h2>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto">
          Pick the sprint that fits your stage. Everything is scoped upfront and handed off at the end.
        </p>
      </motion.div>

      <div className="flex justify-center mb-12">
        <p className="text-sm text-zinc-500 border border-zinc-800/40 rounded-full px-5 py-2">
          No retainer. No account manager. One operator who knows your ecosystem.
        </p>
      </div>

      {/* Side-by-side sprint cards */}
      <motion.div
        className="grid lg:grid-cols-2 gap-6 items-start"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        {/* ── Foundation Sprint ── */}
        <motion.div
          className="relative rounded-2xl border border-zinc-800/60 bg-zinc-900/20 p-8 sm:p-10 flex flex-col"
          variants={fadeUp}
        >
          <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />

          <div className="mb-8">
            <h3 className="text-2xl font-display text-zinc-100 mb-2.5 tracking-tight">Foundation Sprint</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">For teams with a real product and a messy, incomplete, or non-existent external story.</p>
          </div>

          <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-white/5">
            <span className="text-4xl font-display text-zinc-100">$800</span>
            <span className="text-zinc-500 text-sm">/ 10 days</span>
          </div>

          <h4 className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-5">What you get</h4>
          <ul className="space-y-4">
            {[
              { Icon: FileText,  title: 'Positioning clarity',        desc: "Who you're for, why now, why you — and what you don't want to sound like" },
              { Icon: Globe,     title: 'Landing page copy',          desc: 'Full rewrite or new core page: hero, problem, solution, proof, and CTA' },
              { Icon: BookOpen,  title: 'Flagship explainer',         desc: 'Article, X thread, or Notion — non-generic, sendable to users, investors, and partners' },
              { Icon: Calendar,  title: '4-week content plan',        desc: "Topics, formats, channels, and 4–8 post outlines so you're not starting from zero" },
              { Icon: Play,      title: 'Demo video',                 desc: '60–90s screen recording + voiceover, reusable on your site, decks, and socials' },
              { Icon: Mail,      title: 'Newsletter & brand starter', desc: 'First issue drafted, template set, and a prompt system for future issues' },
            ].map(({ Icon, title, desc }, i) => (
              <li key={i} className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-lg bg-zinc-800/70 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-3.5 h-3.5 text-zinc-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-200 font-medium leading-snug">{title}</p>
                  <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ── Launch & Distribution Sprint — PREMIUM ── */}
        <motion.div
          className="relative rounded-2xl border border-emerald-900/50 bg-zinc-900/30 p-8 sm:p-10 flex flex-col"
          variants={fadeUp}
        >
          <GlowingEffect spread={50} glow={true} disabled={false} proximity={70} inactiveZone={0.01} borderWidth={2} variant="emerald" />

          {/* Ambient glow blob */}
          <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
            <motion.div
              className="absolute -top-8 -right-8 w-80 h-80 bg-emerald-900/20 blur-[100px] rounded-full"
              animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Emerald top accent line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent rounded-t-2xl" />

          <div className="mb-8 relative z-10">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-medium text-emerald-400 uppercase tracking-widest border border-emerald-800/60 bg-emerald-950/50 px-2.5 py-1 rounded-full mb-3">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
              Recommended
            </div>
            <h3 className="text-2xl font-display text-zinc-100 mb-2.5 tracking-tight">Launch & Distribution Sprint</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">For teams ready to launch or relaunch with a full content engine and distribution system behind it.</p>
          </div>

          <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-emerald-900/30 relative z-10">
            <span className="text-4xl font-display text-zinc-100">$1,200</span>
            <span className="text-zinc-500 text-sm">/ 20 days</span>
          </div>

          <h4 className="text-xs font-mono text-emerald-700 uppercase tracking-widest mb-5 relative z-10">What you get</h4>
          <ul className="space-y-3.5 relative z-10">
            {/* Foundation+ highlight row */}
            <li className="flex items-center gap-3 rounded-xl border border-emerald-900/35 bg-emerald-950/25 px-3.5 py-2.5">
              <Package className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="text-sm text-emerald-300/90 font-medium">Everything in Foundation, plus:</span>
            </li>
            {[
              { Icon: Film,      title: '2 videos',               desc: 'Main 60–90s demo + 20–30s snackable clip from the same source material' },
              { Icon: Palette,   title: 'Lean visual system',     desc: 'Figma library: buttons, cards, layout patterns, and a deck template' },
              { Icon: BarChart2, title: '6-week content engine',  desc: 'Anchor pieces written, frameworks for the rest — built around your launch window' },
              { Icon: Rocket,    title: 'Launch messaging pack',  desc: 'X/LinkedIn threads, Discord/Telegram copy, and an optional founder essay' },
              { Icon: Users,     title: 'Partner & investor kit', desc: 'One-pager and outreach boilerplate so partners can talk about you accurately' },
              { Icon: Link2,     title: 'Outreach system',        desc: 'Notion CRM, DM/email scripts, and a 4–8 week follow-up rhythm' },
            ].map(({ Icon, title, desc }, i) => (
              <li key={i} className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-900/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-200 font-medium leading-snug">{title}</p>
                  <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <GlowButton
          label="Book a sprint fit call"
          onClick={() => { window.location.href = "mailto:hello@relay.com"; }}
        />
      </motion.div>
    </div>
  </section>
);

const proofSteps = [
  { num: '01', title: 'Fit call',        desc: 'A 20-minute call to understand where you are and whether a sprint makes sense.' },
  { num: '02', title: 'Discovery',       desc: 'A deep discovery call plus async access to your product, docs, and internal context.' },
  { num: '03', title: 'Sprint build',    desc: 'Heads-down execution. Async updates, fast turnarounds, minimal meetings.' },
  { num: '04', title: 'Handoff',         desc: 'All assets in editable formats plus a content system your team can run without us.' },
];

const proofStats = [
  { value: '10',   unit: 'days',           desc: 'Foundation sprint length' },
  { value: '0',    unit: 'junior handoffs', desc: 'Operator-led throughout' },
  { value: '3+',   unit: 'sectors',        desc: 'Web3, AI infra & more' },
  { value: '100%', unit: 'fixed scope',    desc: 'No retainers, no surprises' },
];

const ProofSystem = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Emerald fill line across the connector
  const lineScaleX = useTransform(scrollYProgress, [0.04, 0.78], [0, 1]);

  // Each step starts ghosted (0.15) and reveals to full opacity — single layer, no overlap
  const op0 = useTransform(scrollYProgress, [0.04, 0.20], [0.15, 1]);
  const op1 = useTransform(scrollYProgress, [0.24, 0.40], [0.15, 1]);
  const op2 = useTransform(scrollYProgress, [0.46, 0.62], [0.15, 1]);
  const op3 = useTransform(scrollYProgress, [0.64, 0.80], [0.15, 1]);
  const stepOpacities = [op0, op1, op2, op3];

  // Stats fade in after all steps are revealed
  const statsOpacity = useTransform(scrollYProgress, [0.82, 0.94], [0, 1]);
  const statsY       = useTransform(scrollYProgress, [0.82, 0.94], [24, 0]);

  return (
    <div
      ref={containerRef}
      id="process"
      className="relative bg-[#09090b] border-t border-white/5"
      style={{ height: '230vh' }}
    >
      <div className="sticky top-0 min-h-screen flex flex-col justify-center px-6 py-10">
        <div className="container mx-auto max-w-5xl">

          {/* Section header */}
          <div className="mb-14 text-center">
            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em] mb-3">The process</p>
            <h2 className="text-3xl sm:text-4xl font-display text-zinc-100 tracking-tight">How It Works</h2>
          </div>

          {/* Horizontal stepper with scroll-reveal */}
          <div className="relative mb-14">
            {/* Base connector line */}
            <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-zinc-800/70" />
            {/* Emerald fill — grows left to right with scroll */}
            <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-600/60 via-emerald-500/40 to-emerald-600/20 origin-left"
                style={{ scaleX: lineScaleX }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-14 md:gap-6">
              {proofSteps.map((step, i) => (
                <motion.div
                  key={i}
                  style={{ opacity: stepOpacities[i] }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full border border-zinc-600 bg-[#09090b] flex items-center justify-center text-sm font-mono text-zinc-300 z-10 mb-5 shadow-[0_0_0_8px_#09090b]">
                    {step.num}
                  </div>
                  <h4 className="text-base font-semibold text-zinc-100 mb-2">{step.title}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-[180px]">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats — fade in once stepper is complete */}
          <motion.div
            style={{ opacity: statsOpacity, y: statsY }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {proofStats.map((stat, i) => (
              <div
                key={i}
                className="relative rounded-2xl border border-zinc-800/60 bg-zinc-900/20 p-6 flex flex-col gap-1"
              >
                <GlowingEffect spread={30} glow={true} disabled={false} proximity={60} inactiveZone={0.01} borderWidth={1} />
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-3xl font-display text-zinc-100">{stat.value}</span>
                  <span className="text-sm text-zinc-500">{stat.unit}</span>
                </div>
                <span className="text-xs text-zinc-600">{stat.desc}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

const FinalCTA = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: 'Who is Relay best for?', a: 'Early-stage technical teams in Web3 and AI infra who have a working product but a weak or inconsistent external story — and no senior marketing operator on the team.' },
    { q: 'What do you need from us to start?', a: 'A working product, whatever internal docs or context you can share, and a deep discovery call in the first day or two to go deep on your product, users, and goals. After that, async feedback as we build.' },
    { q: "What if we're not in Web3 or AI?", a: "Relay is built with Web3 and AI infra teams in mind, but the sprint model works for any developer-first product in a similar situation. Book a fit call — if there's a good match, we'll know quickly." },
    { q: 'Do we need a launch date?', a: "No. Relay can help at any stage — pre-launch, mid-traction, or ahead of a relaunch. Pre-launch is usually the highest-leverage moment, but the sprint is useful whenever your story and assets aren't where they need to be." },
    { q: 'What happens after the sprint?', a: 'You get everything in editable formats plus a content system your team can run. Every engagement is a discrete scope — no automatic continuation. If a next sprint makes sense, we can define it.' },
  ];

  return (
    <section className="py-16 lg:py-24 px-6 border-t border-white/5 bg-[#09090b]">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-display text-zinc-100 mb-6 tracking-tight text-balance mx-auto"
            variants={fadeUp}
          >
            Ready to get your story straight?
          </motion.h2>
          <motion.p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto" variants={fadeUp}>
            A fit call takes 20 minutes. We look at where you are, what you need, and whether a sprint makes sense. If it does, we scope it and start.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row justify-center gap-4" variants={fadeUp}>
            <GlowButton
              label="Book a sprint fit call"
              onClick={() => { window.location.href = "mailto:hello@relay.com"; }}
            />
            <GlowButton
              label="Send a brief"
              className="glow-btn-outline"
              onClick={() => { window.location.href = "mailto:hello@relay.com"; }}
            />
          </motion.div>
        </motion.div>

        <div className="max-w-2xl mx-auto mb-16">
          <motion.h3
            className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h3>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="border border-zinc-800/50 bg-zinc-900/20 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ borderColor: 'rgba(63,63,70,0.5)' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                >
                  <span className="font-medium text-zinc-200 text-sm">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.footer
          className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img src="/relay%20logo.svg" alt="Relay" className="h-6 w-auto" />
          <div className="flex items-center gap-8 text-sm text-zinc-500">
            <a href="mailto:hello@relay.com" className="hover:text-zinc-200 transition-colors">hello@relay.com</a>
            <a href="#" className="hover:text-zinc-200 transition-colors">Twitter / X</a>
          </div>
        </motion.footer>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <main className="bg-[#09090b] min-h-screen text-zinc-100 font-sans selection:bg-emerald-900/50 selection:text-emerald-100">
      <div className="grain-overlay pointer-events-none opacity-[0.03]" />
      <Navbar />
      <AnimatedHero />
      <LogoStrip />
      <ProductPreview />
      <ProblemValue />
      <ProofSystem />
      <SprintOffers />
      <FinalCTA />
    </main>
  );
}
