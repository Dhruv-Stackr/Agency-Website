"use client";

import React, { useState } from 'react';
import { ArrowRight, ChevronDown, CheckCircle2, Workflow } from 'lucide-react';

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-white/5">
    <div className="container mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <span className="text-2xl font-display leading-tight tracking-tight text-zinc-100">
          Relay
        </span>
      </div>
      <div className="flex items-center gap-6">
        <a href="#sprints" className="hidden sm:block text-sm font-sans text-zinc-400 hover:text-zinc-100 transition-colors">
          Sprints
        </a>
        <a href="#process" className="hidden sm:block text-sm font-sans text-zinc-400 hover:text-zinc-100 transition-colors">
          Process
        </a>
        <a href="mailto:hello@relay.com" className="px-5 py-2.5 bg-zinc-100 text-zinc-950 text-sm font-semibold rounded-full transition-transform hover:scale-105">
          Book a fit call
        </a>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative w-full pt-40 pb-24 lg:pt-56 lg:pb-32 px-6 flex flex-col items-center text-center overflow-hidden">
    <div className="max-w-[1000px] z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-medium text-emerald-400 tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        AVAILABLE FOR 2 NEW SPRINTS
      </div>
      <h1 className="font-display text-5xl sm:text-7xl lg:text-[100px] leading-[0.95] tracking-tight text-zinc-100 mb-8 text-balance mx-auto">
        Senior marketing sprints for Web3 and AI teams <span className="italic text-zinc-500">— before you hire full-time.</span>
      </h1>
      <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto font-sans leading-relaxed mb-12">
        We plug into technical teams for 10–30 days to sharpen positioning, build launch-ready assets, and create a repeatable content system.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <a href="mailto:hello@relay.com" className="w-full sm:w-auto px-8 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold rounded-full transition-all flex items-center justify-center gap-2">
          Book a sprint fit call <ArrowRight className="w-4 h-4" />
        </a>
        <a href="#" className="w-full sm:w-auto px-8 py-3.5 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 text-sm font-semibold rounded-full transition-all flex items-center justify-center">
          Send a brief
        </a>
      </div>

      <div className="pt-8 border-t border-white/5 inline-block mx-auto">
        <p className="text-sm text-zinc-500 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <span>✓ Experienced across consumer, EdTech & Web3</span>
          <span>✓ Operator-led, no junior handoffs</span>
          <span>✓ Fixed scope & timeline</span>
        </p>
      </div>
    </div>
    
    {/* Subtle gradient glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-900/5 blur-[120px] rounded-full pointer-events-none" />
  </section>
);

const ProblemValue = () => (
  <section className="py-24 lg:py-32 px-6 border-t border-white/5 relative bg-[#09090b]">
    <div className="container mx-auto max-w-5xl">
      <div className="mb-16 text-center sm:text-left">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-zinc-100 mb-4 tracking-tight text-balance">You have a strong product,<br className="hidden sm:block"/>but the external story is weak.</h2>
        <p className="text-zinc-400 text-lg">Sound familiar? Here is what we fix.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-px bg-zinc-800/50 rounded-2xl overflow-hidden border border-zinc-800/50">
        <div className="bg-[#09090b] p-8 sm:p-12 h-full">
          <div className="text-zinc-500 font-mono text-xs mb-10 uppercase tracking-widest">The Current Pain</div>
          <ul className="space-y-10">
            <li className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 mt-2 rounded-full bg-zinc-700 shrink-0" />
              <div>
                <h4 className="text-zinc-200 font-medium mb-2">Strong product, weak narrative</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">The tech is impressive, but explaining it to non-engineers feels clunky and complicated.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 mt-2 rounded-full bg-zinc-700 shrink-0" />
              <div>
                <h4 className="text-zinc-200 font-medium mb-2">Launches without messaging</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">You ship features fast, but the announcements are reactive and lack a cohesive story.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 mt-2 rounded-full bg-zinc-700 shrink-0" />
              <div>
                <h4 className="text-zinc-200 font-medium mb-2">Founder-led comms that don't scale</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">You're writing all the tweets and blog posts, taking time away from building the product.</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-zinc-900/40 p-8 sm:p-12 relative overflow-hidden h-full">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0" />
          <div className="text-emerald-500 font-mono text-xs mb-10 uppercase tracking-widest">The Relay Fix</div>
          <ul className="space-y-10">
            <li className="flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-600 shrink-0" />
              <div>
                <h4 className="text-zinc-100 font-medium mb-2">Clear positioning</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">We distill your technical complexity into a sharp, credible narrative that resonates with users and investors.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-600 shrink-0" />
              <div>
                <h4 className="text-zinc-100 font-medium mb-2">Ship-ready launch assets</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">Landing page copy, flagship explainers, and messaging frameworks ready to deploy.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-600 shrink-0" />
              <div>
                <h4 className="text-zinc-100 font-medium mb-2">A repeatable content system</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">A structured engine for ongoing distribution that your team can keep running without us.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const SprintOffers = () => (
  <section id="sprints" className="py-24 lg:py-32 px-6 border-t border-white/5 bg-[#09090b]">
    <div className="container mx-auto max-w-5xl">
      <div className="text-center mb-20">
        <h2 className="text-4xl sm:text-5xl font-display text-zinc-100 mb-6 tracking-tight">Fixed scope. High impact.</h2>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto">Two focused sprints designed to give you marketing infrastructure without the overhead of a full-time hire.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Foundation Sprint */}
        <div className="group rounded-2xl border border-zinc-800/60 bg-zinc-900/20 p-8 sm:p-10 flex flex-col hover:border-zinc-700 transition-colors">
          <div className="mb-8">
            <h3 className="text-2xl font-display text-zinc-100 mb-3 tracking-tight">Foundation Sprint</h3>
            <p className="text-zinc-400 text-sm leading-relaxed h-10">For teams with a real product but no coherent external story.</p>
          </div>
          
          <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-white/5">
            <span className="text-4xl font-display text-zinc-100">$800</span>
            <span className="text-zinc-500 text-sm">/ 10–14 days</span>
          </div>

          <div className="flex-grow">
            <h4 className="text-xs font-mono text-zinc-500 mb-6 uppercase tracking-widest">What you get</h4>
            <ul className="space-y-4">
              {['Positioning clarity', 'Landing page copy', 'One flagship explainer', '4-week content plan', 'One simple demo video', 'Lightweight newsletter/brand starter system'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                  <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Launch Sprint */}
        <div className="group rounded-2xl border border-emerald-900/40 bg-zinc-900/30 p-8 sm:p-10 flex flex-col relative overflow-hidden hover:border-emerald-800/60 transition-colors">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-900/10 blur-[60px] pointer-events-none" />
          
          <div className="mb-8">
            <div className="text-[10px] font-medium text-emerald-500 uppercase tracking-widest mb-3 border border-emerald-900/50 bg-emerald-950/30 inline-block px-2 py-1 rounded">Most Popular</div>
            <h3 className="text-2xl font-display text-zinc-100 mb-3 tracking-tight">Launch & Distribution Sprint</h3>
            <p className="text-zinc-400 text-sm leading-relaxed h-10">For teams preparing to launch or relaunch a major product.</p>
          </div>
          
          <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-white/5">
            <span className="text-4xl font-display text-zinc-100">$1,200</span>
            <span className="text-zinc-500 text-sm">/ 21–30 days</span>
          </div>

          <div className="flex-grow">
            <h4 className="text-xs font-mono text-zinc-500 mb-6 uppercase tracking-widest">What you get</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-emerald-400/90 font-medium">
                <div className="w-1 h-1 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <span>Everything in Foundation, plus:</span>
              </li>
              {['2 videos', 'Lean visual system', '6-week content engine', 'Launch messaging & content pack', 'Partner/investor one-pager', 'Outreach system'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                  <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <a href="mailto:hello@relay.com" className="inline-flex items-center gap-2 px-8 py-3.5 bg-zinc-100 hover:bg-white text-zinc-950 text-sm font-semibold rounded-full transition-transform hover:scale-105">
          Book a sprint fit call <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  </section>
);

const ProofSystem = () => (
  <section id="process" className="py-24 lg:py-32 px-6 border-t border-white/5 bg-[#09090b] relative">
    <div className="container mx-auto max-w-5xl">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* How it Works */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-display text-zinc-100 mb-12 tracking-tight">How It Works</h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px before:h-full before:w-px before:bg-zinc-800">
            
            {[
              { num: '1', title: 'Fit call', desc: 'A 30-minute sync to align on goals, scope, and ensure we are the right fit for your stage.' },
              { num: '2', title: 'Context intake', desc: 'Async deep dive into your product, repos, docs, and existing user conversations.' },
              { num: '3', title: 'Sprint build', desc: 'We go heads down. Weekly async updates. Minimal meetings. Fast iteration.' },
              { num: '4', title: 'Handoff + system', desc: 'You receive ready-to-ship assets and a documented system your team can run.' },
            ].map((step, i) => (
              <div key={i} className="relative flex items-start gap-6 group">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-zinc-700 bg-[#09090b] text-[10px] font-medium text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/50 transition-colors z-10 shrink-0 mt-0.5 shadow-[0_0_0_8px_#09090b]">
                  {step.num}
                </div>
                <div>
                  <h4 className="text-base font-medium text-zinc-200 mb-1.5">{step.title}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
            
          </div>
        </div>

        {/* Proof / Credibility */}
        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/20 p-8 sm:p-12">
          <h3 className="text-2xl font-display text-zinc-100 mb-10 tracking-tight">Operator-led execution</h3>
          <ul className="space-y-8">
            <li className="flex items-start gap-4">
              <Workflow className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-zinc-200 text-sm font-medium mb-1.5">Cross-industry experience</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">Worked across consumer, EdTech, finance, Web3, and AI teams.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Workflow className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-zinc-200 text-sm font-medium mb-1.5">Technical translation</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">Translating complex technical products into clear, compelling external narratives.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Workflow className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-zinc-200 text-sm font-medium mb-1.5">Zero-to-one expertise</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">Built community systems from scratch and operated as the first or only marketer.</p>
              </div>
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  </section>
);

const FinalCTA = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Who is Relay best for?",
      a: "Early-stage technical teams (Web3, AI, devtools) who have a working product but lack a clear external narrative or a senior marketing operator."
    },
    {
      q: "How much founder time is needed?",
      a: "Very little. We need a 30-minute kickoff, access to your existing materials, and async feedback loops via Slack or your preferred channel."
    },
    {
      q: "What happens after the sprint?",
      a: "You walk away with ship-ready assets and a documented system. You can execute it internally, or we can discuss a retainer if you need ongoing execution."
    },
    {
      q: "Is the work AI-assisted?",
      a: "We use AI to speed up research, analysis, and early drafting. However, the core strategic narrative, positioning, and final outputs are human-shaped, edited, and refined."
    }
  ];

  return (
    <section className="py-24 lg:py-32 px-6 border-t border-white/5 bg-[#09090b]">
      <div className="container mx-auto max-w-4xl">
        
        <div className="text-center mb-24">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display text-zinc-100 mb-6 tracking-tight text-balance mx-auto">
            Get your first real marketing system in place <span className="text-zinc-500 italic">— without hiring full-time.</span>
          </h2>
          <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto">
            For early Web3 and AI teams that need clarity, assets, and momentum now.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:hello@relay.com" className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold rounded-full transition-all">
              Book a sprint fit call
            </a>
            <a href="#" className="px-8 py-3.5 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 text-sm font-semibold rounded-full transition-all">
              Send a brief
            </a>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-32">
          <h3 className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-8 text-center">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-zinc-800/50 bg-zinc-900/20 rounded-xl overflow-hidden transition-colors hover:border-zinc-700/50">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                >
                  <span className="font-medium text-zinc-200 text-sm">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed border-t border-white/5 pt-4 mt-2">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-xl font-display text-zinc-100">Relay</div>
          <div className="flex items-center gap-8 text-sm text-zinc-500">
            <a href="mailto:hello@relay.com" className="hover:text-zinc-200 transition-colors">hello@relay.com</a>
            <a href="#" className="hover:text-zinc-200 transition-colors">Twitter / X</a>
          </div>
        </footer>
        
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <main className="bg-[#09090b] min-h-screen text-zinc-100 font-sans selection:bg-emerald-900/50 selection:text-emerald-100">
      <div className="grain-overlay pointer-events-none opacity-[0.03]" />
      <Navbar />
      <Hero />
      <ProblemValue />
      <SprintOffers />
      <ProofSystem />
      <FinalCTA />
    </main>
  );
}
