"use client";
// The dashboard as a sample week: a framed app with a rail of sections, four numbers, where the enquiries came from,
// a log that keeps arriving, the weekly note and the decisions queue. Icons are drawn here for the brand, not taken from a set.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "motion/react";
import { WeeklyNote, DecisionsQueue } from "./motion";

const PATHS: Record<string, React.ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M16.5 16.5L21 21" /></>,
  sparkle: <path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z" />,
  check: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 12l3.5 3.5L17 8.5" /></>,
  doc: <><path d="M6 3h9l4 4v14H6z" /><path d="M9 12h6M9 16h6" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  rupee: <path d="M7 4h10M7 9h10M7 4c5 0 7 2 7 5s-2 5-7 5l7 7" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  pin: <><path d="M12 21s-6-5.6-6-10a6 6 0 0 1 12 0c0 4.4-6 10-6 10z" /><circle cx="12" cy="11" r="2" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  bolt: <path d="M13 3L5 14h6l-1 7 8-11h-6z" />,
  layers: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>,
  code: <><path d="M8 8l-4 4 4 4M16 8l4 4-4 4" /><path d="M14 5l-4 14" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  flag: <><path d="M5 21V4" /><path d="M5 4h12l-2 4 2 4H5" /></>,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  send: <path d="M21 3L10 14M21 3l-7 18-4-7-7-4z" />,
  bookmark: <path d="M6 3h12v18l-6-4-6 4z" />,
  dots: <><circle cx="5" cy="12" r="1.5" fill="currentColor" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /><circle cx="19" cy="12" r="1.5" fill="currentColor" /></>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>,
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></>,
  lens: <><circle cx="12" cy="12" r="4" /><path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" /></>,
  play: <path d="M8 5l11 7-11 7z" fill="currentColor" />,
  chevron: <path d="M9 6l6 6-6 6" />,
  star: <path d="M12 3l2.7 5.6 6.2.9-4.5 4.3 1.1 6.2L12 17l-5.5 3 1.1-6.2L3.1 9.5l6.2-.9z" fill="currentColor" />,
  reload: <><path d="M20 12a8 8 0 1 1-2.3-5.7" /><path d="M20 4v5h-5" /></>,
  export: <><path d="M12 3v12M7 10l5 5 5-5" /><path d="M4 17v3h16v-3" /></>,
};
export function Icon({ name, className }: { name: keyof typeof PATHS | string; className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{PATHS[name]}</svg>;
}

function useCount(target: number, go: boolean, from = 0, dur = 1.1, delay = 0) {
  const [v, setV] = useState(from);
  useEffect(() => { if (!go) return; const c = animate(from, target, { duration: dur, delay, ease: [0.16, 1, 0.3, 1], onUpdate: (x) => setV(Math.round(x)) }); return () => c.stop(); }, [go, target, from, dur, delay]);
  return v;
}

const RAIL = [["grid", "Overview"], ["chat", "Enquiries"], ["target", "Campaigns"], ["search", "Search"], ["sparkle", "AI answers"], ["check", "Decisions"], ["doc", "Weekly notes"]] as const;
const SOURCES = [{ icon: "target", name: "Campaign 2, Meta", n: 9, top: true }, { icon: "search", name: "Google search", n: 3 }, { icon: "sparkle", name: "AI answers", n: 1 }, { icon: "phone", name: "WhatsApp, direct", n: 1 }];
const EVENTS = [
  { icon: "chat", kind: "enquiry", text: "Enquiry on WhatsApp: acne consultation, Sector 29" },
  { icon: "target", kind: "work", text: "Campaign 3 paused; its budget moved to campaign 2" },
  { icon: "doc", kind: "work", text: "Homepage title and description rewritten, in your words" },
  { icon: "calendar", kind: "booking", text: "Booking: Thursday 5 pm, laser consultation" },
  { icon: "search", kind: "work", text: "Search Console re-fetch requested for the homepage" },
  { icon: "chat", kind: "enquiry", text: "Enquiry from Google search: laser hair removal cost" },
  { icon: "sparkle", kind: "work", text: "AI-visibility run scheduled: Monday, seven runs, twenty prompts" },
  { icon: "phone", kind: "call", text: "Call: twenty minutes on the Diwali offer, notes in the log" },
];
const AGO = ["now", "4 min", "12 min", "31 min", "1 h", "2 h", "3 h", "5 h"];
const VISIBLE = 6;

export default function DashboardScene() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();
  const go = inView && !reduce;
  const enquiries = useCount(14, go, 0, 1.2, 0.2);
  const cost = useCount(412, go, 612, 1.6, 0.5);
  const booked = useCount(5, go, 0, 1.0, 0.7);
  const [log, setLog] = useState<{ id: number; i: number }[]>(() => (reduce ? EVENTS.slice(0, VISIBLE).map((_, k) => ({ id: k, i: k })) : []));
  const [flash, setFlash] = useState(false);
  const [live, setLive] = useState("updated 2 min ago");
  const next = useRef(0);

  useEffect(() => {
    if (!go) return;
    let stop = false; const timers: ReturnType<typeof setTimeout>[] = [];
    const push = () => {
      if (stop) return;
      const i = next.current % EVENTS.length; next.current += 1;
      setLog((l) => [{ id: next.current, i }, ...l].slice(0, VISIBLE));
      if (EVENTS[i].kind === "enquiry") { setFlash(true); timers.push(setTimeout(() => setFlash(false), 900)); }
      setLive("updated just now"); timers.push(setTimeout(() => setLive("updated 1 min ago"), 2600));
    };
    for (let k = 0; k < VISIBLE; k++) timers.push(setTimeout(push, 600 + k * 420));
    const iv = setInterval(push, 3400);
    return () => { stop = true; clearInterval(iv); timers.forEach(clearTimeout); };
  }, [go]);

  const pts = [6, 8, 7, 9, 11, 10, 14]; const W = 200, H = 40;
  const d = pts.map((p, i) => `${(i / (pts.length - 1)) * W},${H - 4 - (p / 16) * (H - 8)}`).join(" L ");
  const show = inView || reduce;

  return (
    <div className="dapp" ref={ref} role="figure" aria-label="A sample week in your dashboard: enquiries, cost per enquiry, bookings, AI-answer visibility, where enquiries came from, the log, the weekly note and the decisions queue">
      <nav className="dapp-rail" aria-label="Dashboard sections">
        {RAIL.map(([icon, label], k) => <span key={icon} className={k === 0 ? "on" : ""} title={label}><Icon name={icon} /><span className="sr-only">{label}</span></span>)}
      </nav>
      <div className="dapp-main">
        <header className="dapp-top">
          <div><b>Dr Mehra Skin Clinic</b> <span className="mono">Week of 22 Sep</span></div>
          <span className="live"><i />{live}</span>
        </header>

        <div className="dapp-kpis">
          <motion.div className={`kpi${flash ? " flash" : ""}`} animate={flash ? { backgroundColor: ["rgba(232,56,13,.10)", "rgba(232,56,13,0)"] } : {}} transition={{ duration: 0.9 }}>
            <div className="kpi-h"><Icon name="chat" />Enquiries this week</div>
            <div className="kpi-v"><b>{reduce ? 14 : enquiries}</b><span className="delta">+3 vs last week</span></div>
            <svg viewBox={`0 0 ${W} ${H}`} className="spark" aria-hidden="true"><motion.path d={`M ${d}`} fill="none" initial={reduce ? false : { pathLength: 0 }} animate={show ? { pathLength: 1 } : undefined} transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} /><circle cx={W} cy={H - 4 - (14 / 16) * (H - 8)} r="3.5" className="end" /></svg>
          </motion.div>
          <div className="kpi">
            <div className="kpi-h"><Icon name="rupee" />Cost per enquiry</div>
            <div className="kpi-v"><b>₹{reduce ? 412 : cost}</b><span className="delta down">from ₹612</span></div>
            <div className="kpi-s">campaign 2, this week. Ad spend goes from your account to Meta directly.</div>
          </div>
          <div className="kpi">
            <div className="kpi-h"><Icon name="calendar" />Booked</div>
            <div className="kpi-v ring-row"><svg viewBox="0 0 40 40" className="ring" aria-hidden="true"><circle cx="20" cy="20" r="16" className="track" /><motion.circle cx="20" cy="20" r="16" className="arc" initial={reduce ? false : { pathLength: 0 }} animate={show ? { pathLength: 5 / 14 } : undefined} transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }} /></svg><b>{reduce ? 5 : booked}</b><span className="delta">of 14 enquiries</span></div>
            <div className="kpi-s">each one traced back to the search or campaign that brought it.</div>
          </div>
          <div className="kpi">
            <div className="kpi-h"><Icon name="sparkle" />Named in AI answers</div>
            <div className="kpi-v"><b>3 to 5</b><span className="delta">of 7 runs</span></div>
            <div className="dots" aria-hidden="true">{[0, 1, 2, 3, 4, 5, 6].map((k) => <motion.i key={k} className={k < 3 ? "on" : k < 5 ? "half" : ""} initial={reduce ? false : { scale: 0 }} animate={show ? { scale: 1 } : undefined} transition={{ delay: 0.9 + k * 0.12, type: "spring", stiffness: 300, damping: 18 }} />)}</div>
            <div className="kpi-s">for the questions your patients ask. A band, never a score. Next run Monday.</div>
          </div>
        </div>

        <div className="dapp-mid">
          <div className="dpanel">
            <div className="dpanel-h"><span>Where the 14 came from</span><span className="mono">this week</span></div>
            {SOURCES.map((s, k) => (
              <div className={`src-row${s.top ? " top" : ""}`} key={s.name}>
                <Icon name={s.icon} />
                <div><div className="src-name">{s.name}</div><div className="bar"><motion.b initial={reduce ? false : { width: 0 }} animate={show ? { width: `${(s.n / 14) * 100}%` } : undefined} transition={{ duration: 1.0, delay: 0.4 + k * 0.15, ease: [0.16, 1, 0.3, 1] }} /></div></div>
                <span className="mono n">{s.n}</span>
              </div>
            ))}
          </div>
          <div className="dpanel">
            <div className="dpanel-h"><span>This week, as it happened</span><span className="mono"><Icon name="clock" className="ic" /> live</span></div>
            <ul className="log" aria-live="off">
              <AnimatePresence initial={false}>
                {log.map((e, k) => (
                  <motion.li key={e.id} layout className={k === 0 ? "new" : ""} initial={reduce ? false : { y: -10, height: 0 }} animate={{ y: 0, height: "auto" }} exit={{ height: 0 }} transition={{ type: "spring", stiffness: 260, damping: 26 }}>
                    <Icon name={EVENTS[e.i].icon} /><span>{EVENTS[e.i].text}</span><span className="t">{AGO[k]}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>

        <div className="dapp-bottom">
          <WeeklyNote />
          <DecisionsQueue foot={null} />
        </div>
      </div>
    </div>
  );
}
