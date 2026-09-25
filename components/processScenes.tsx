"use client";
// The process page in the current language: a calendar of the first six weeks, the call as a screen-share,
// the audit as five drawn pages, the month you watch as four Monday notes. Sample content, labelled.
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Icon } from "./DashboardScene";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const up = (reduce: boolean | null, delay = 0) => (reduce ? {} : { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.25 }, transition: { duration: 0.5, delay, ease } });

const EVENTS: Record<number, { icon: string; t: string }> = { 0: { icon: "phone", t: "day 1, the call" }, 1: { icon: "doc", t: "day 2, the proposal" }, 9: { icon: "search", t: "week 2, the audit" }, 16: { icon: "bolt", t: "weeks 3 and 4, the first fixes" }, 28: { icon: "eye", t: "week 5 on, the plan runs" } };
export function MonthCalendar() {
  const reduce = useReducedMotion();
  return (
    <div className="cal">
      <div className="cal-head"><span className="mono lbl">your first six weeks</span><span className="mono lbl"><i className="cal-dot" /> a note every Monday</span></div>
      <div className="cal-dow">{["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i} className="mono">{d}</span>)}</div>
      <div className="cal-grid">
        {Array.from({ length: 42 }, (_, d) => { const ev = EVENTS[d]; const monday = d % 7 === 0 && d > 0; return (
          <motion.div key={d} className={`cal-day${ev ? " ev" : ""}${d % 7 > 4 ? " we" : ""}`} {...(reduce ? {} : { initial: { opacity: 0, scale: 0.8 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, transition: { duration: 0.3, delay: 0.012 * d, ease } })}>
            <span className="cal-n mono">{d + 1}</span>
            {ev && <span className="cal-ic"><Icon name={ev.icon} /></span>}
            {monday && !ev && <i className="cal-dot" />}
          </motion.div>
        ); })}
      </div>
      <ul className="cal-legend">{Object.values(EVENTS).map((e) => <li key={e.t}><Icon name={e.icon} />{e.t}</li>)}</ul>
    </div>
  );
}

const SC_ROWS = [["best dermatologist gurugram", "1,240", "31", "9.2"], ["acne treatment gurugram", "880", "12", "14.1"], ["laser hair removal sector 29", "310", "22", "3.4"], ["dr mehra skin clinic", "260", "96", "1.1"]];
const GAPS = [["today", "Your title and description are the template's"], ["today", "Tracking counts every enquiry twice"], ["soon", "The booking page takes six seconds on a phone"]];
export function CallScene({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null); const inView = useInView(ref, { once: true, amount: 0.4 }); const reduce = useReducedMotion();
  return (
    <div className={`callsc${compact ? " compact" : ""}`} ref={ref} role="figure" aria-label="The audit call as a screen-share: your Search Console on the left, the three gaps on the right">
      <div className="call-bar"><span className="mono"><Icon name="eye" />audit call · screen-share</span><span className="mono call-timer"><Icon name="clock" />20:00<i style={{ animationPlayState: inView && !reduce ? "running" : "paused" }} /></span></div>
      <div className="call-body">
        <div className="call-left">
          <div className="mono lbl">your Search Console, live</div>
          <div className="sc-row head"><span className="mono">search</span><span className="mono">shown</span><span className="mono">clicks</span><span className="mono">pos</span></div>
          {SC_ROWS.map((r, k) => <motion.div className="sc-row" key={r[0]} {...up(reduce, 0.1 + k * 0.1)}><span>{r[0]}</span><span className="mono">{r[1]}</span><span className="mono">{r[2]}</span><span className="mono">{r[3]}</span></motion.div>)}
        </div>
        <div className="call-right">
          <div className="mono lbl">the three gaps, as they come up</div>
          {GAPS.map((g, k) => <motion.div className={`gap ${g[0]}`} key={g[1]} {...up(reduce, 0.4 + k * 0.3)}><span className="spill">{g[0] === "today" ? "costs you today" : "costs you soon"}</span><b>{g[1]}</b></motion.div>)}
          <motion.div className="call-next mono" {...up(reduce, 1.3)}><Icon name="doc" />a one-page proposal, tomorrow</motion.div>
        </div>
      </div>
    </div>
  );
}

const CHECKS: [string, "fine" | "today" | "soon"][] = [["Crawler access", "fine"], ["Title and description", "today"], ["Page weight on a phone", "soon"], ["Product structured data", "fine"], ["Canonicals and sitemap", "fine"], ["Enquiry tracking", "today"]];
const PILL = { fine: "working", today: "costs you today", soon: "costs you soon" };
export function ScorecardMini() {
  const reduce = useReducedMotion();
  return (
    <div className="mini scorecard">
      {CHECKS.map((c, k) => <motion.div className={`mini-row s-${c[1]}`} key={c[0]} {...up(reduce, 0.05 * k)}><span>{c[0]}</span><span className={`spill ${c[1]}`}>{PILL[c[1]]}</span></motion.div>)}
    </div>
  );
}
function FindingMini() {
  return (
    <div className="mini finding-mini">
      <span className="spill today">costs you today</span>
      <b>Your title is the template's: "Online Store".</b>
      <p>Every search result and AI answer introduces you with a template's words.</p>
      <code className="mono">curl -sL yourclinic.in | grep -o '&lt;title&gt;[^&lt;]*'</code>
    </div>
  );
}
function PlanMini() {
  const rows = [["wk 2", "Rewrite the title and description", "clicks on brand searches, 14 days"], ["wk 3", "Fix the tracking that counts twice", "each enquiry counted once"], ["wk 4", "Cut the booking page to 0.6 MB", "Google's field data, 28 days"]];
  return (
    <div className="mini plan-mini">
      {rows.map((r) => <div className="plan-row" key={r[1]}><span className="mono">{r[0]}</span><div><b>{r[1]}</b><span className="mono meas"><Icon name="eye" />{r[2]}</span></div></div>)}
    </div>
  );
}
function PlainMini() {
  return (
    <div className="mini plain-mini">
      <div className="mono lbl">in plain English</div>
      <p>Google introduces you with the template's words. Every enquiry from your ads is counted twice. Your booking page is slow on a phone. We fix them in that order, and we measure each one before the next.</p>
    </div>
  );
}
function BaselineMini() {
  return (
    <div className="mini base-mini">
      <div className="mono lbl">day one, yours to keep</div>
      <div className="base-tiles">
        <div><b>11</b><span>enquiries a week</span></div>
        <div><b>₹612</b><span>per enquiry</span></div>
        <div><b>1 to 3</b><span>of 7 AI answers name you</span></div>
      </div>
    </div>
  );
}
export function AuditPages({ items }: { items: { title: string; text: string }[] }) {
  const reduce = useReducedMotion();
  const scenes = [<ScorecardMini key="a" />, <FindingMini key="b" />, <PlanMini key="c" />, <PlainMini key="d" />, <BaselineMini key="e" />];
  return (
    <div className="apages">
      {items.map((it, i) => (
        <motion.article className="apage" key={it.title} {...up(reduce, 0.08 * i)}>
          <div className="apage-top mono"><span>page {String(i + 1).padStart(2, "0")}</span><span>the audit · sample</span></div>
          <div className="apage-scene">{scenes[i % scenes.length]}</div>
          <h3>{it.title}</h3>
          <p>{it.text}</p>
        </motion.article>
      ))}
    </div>
  );
}

const NOTES = [
  { d: "Mon 29 Sep", w: "week 1", n: "11", nl: "enquiries this week", lines: ["Audit delivered, thirteen pages, the plain-English page on top.", "Day-one numbers set: 11 enquiries a week, ₹612 per enquiry.", "Next: the title rewrite and the tracking fix."] },
  { d: "Mon 6 Oct", w: "week 2", n: "12", nl: "enquiries this week", lines: ["Title and description rewritten in your words.", "Tracking now counts each enquiry once.", "Next: campaign 2 goes live on Thursday."] },
  { d: "Mon 13 Oct", w: "week 3", n: "₹480", nl: "per enquiry", lines: ["Campaign 2 live: 6 enquiries at ₹480 each.", "Booking page cut from 4.9 MB to 0.6 MB.", "Waiting on you: the Diwali offer copy."] },
  { d: "Mon 20 Oct", w: "week 4", n: "14", nl: "enquiries this week", lines: ["14 enquiries, up from 11 on day one.", "Campaign 2 now at ₹412 per enquiry.", "Next: the AI-visibility run, seven runs, twenty prompts."] },
];
export function MondayNotes() {
  const reduce = useReducedMotion();
  return (
    <div className="mnotes">
      {NOTES.map((n, i) => (
        <motion.article className="mnote" key={n.d} {...up(reduce, 0.15 * i)}>
          <div className="mnote-head"><span className="mono">{n.d} · {n.w}</span><span className="mono red">9:02</span></div>
          <div className="mnote-n"><b>{n.n}</b><span>{n.nl}</span></div>
          <ol>{n.lines.map((l) => <li key={l}>{l}</li>)}</ol>
          <div className="mnote-foot mono">on WhatsApp, by email, in the dashboard</div>
        </motion.article>
      ))}
    </div>
  );
}

// The one-page proposal, as a page.
export function ProposalPage() {
  const reduce = useReducedMotion();
  return (
    <motion.div className="prop" {...up(reduce, 0.1)} role="figure" aria-label="The shape of the one-page proposal">
      <div className="prop-head"><div><b>Proposal</b><span className="mono">Dr Mehra Skin Clinic · one page · sample</span></div><span className="mono">sent the next business day</span></div>
      <div className="prop-sec"><div className="mono lbl">the three gaps, in the order they cost you</div>
        <div className="prop-gap"><span className="spill today">costs you today</span><b>Your title and description are the template's</b></div>
        <div className="prop-gap"><span className="spill today">costs you today</span><b>Tracking counts every enquiry twice</b></div>
        <div className="prop-gap"><span className="spill soon">costs you soon</span><b>The booking page takes six seconds on a phone</b></div>
      </div>
      <div className="prop-two">
        <div className="prop-sec"><div className="mono lbl">first</div><p>Rewrite the two lines and fix the tracking, in week two.</p></div>
        <div className="prop-sec"><div className="mono lbl">measured before the second step</div><p>Clicks on brand searches over fourteen days, and each enquiry counted once.</p></div>
      </div>
      <div className="prop-sec"><div className="mono lbl">the services this plan needs</div><ul className="chips"><li>found on Google and in AI answers</li><li>Google and Meta ads</li><li>website fixes</li></ul></div>
      <div className="prop-two">
        <div className="prop-sec"><div className="mono lbl">the fee</div><p className="prop-fee">said once, on the call</p></div>
        <div className="prop-sec"><div className="mono lbl">the terms, the same for everyone</div><p>Monthly in advance. Fifteen days' notice. Month four free if the number has not moved by the end of month three.</p></div>
      </div>
      <div className="prop-foot mono">stands for thirty days · accounts in your name from day one</div>
    </motion.div>
  );
}
