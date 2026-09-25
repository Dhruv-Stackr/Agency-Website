"use client";
import { site } from "@/lib/site";
// The dashboard and about pages in the current language: module previews, the Monday note on three channels,
// numbers with their targets, a work log with a name on every row, and a drawn map. Sample content, labelled.
import { motion, useReducedMotion } from "motion/react";
import { Icon } from "./DashboardScene";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const up = (reduce: boolean | null, delay = 0) => (reduce ? {} : { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.25 }, transition: { duration: 0.5, delay, ease } });

function PlanMini() { return (<div className="mini"><div className="mini-bar"><span>6 of 14 items shipped</span><i><b style={{ width: "43%" }} /></i></div>{[["Rewrite title and description", "Dhruv", "shipped 23 Sep"], ["Fix double-counted tracking", "in-house", "shipped 25 Sep"], ["Cut the booking page weight", "in-house", "this week"]].map((r) => <div className="mini-row" key={r[0]}><span>{r[0]}</span><span className="mono dim">{r[1]} · {r[2]}</span></div>)}</div>); }
function WorkMini() { return (<div className="mini">{[["Tue", "Title and description rewritten", "brand-search clicks"], ["Wed", "Tracking counts each enquiry once", "enquiries"], ["Thu", "Campaign 2 live", "₹ per enquiry"]].map((r) => <div className="wl" key={r[1]}><span className="mono dim">{r[0]}</span><div><b>{r[1]}</b><span className="mono meas"><Icon name="eye" />{r[2]}</span></div></div>)}</div>); }
function NumbersMini() { return (<div className="mini"><div className="tiles3"><div><b>14</b><span>enquiries</span></div><div><b>₹412</b><span>per enquiry</span></div><div><b>5</b><span>booked</span></div></div><div className="mono dim">this week · in your words, not ours</div></div>); }
function SourceMini() { return (<div className="mini"><div className="src-tile"><b>14</b><span>enquiries this week</span><div className="mono srcline"><Icon name="doc" />source: your GA4 · refreshed 9:02 today</div></div><div className="src-tile off"><b className="mono">no data</b><span>Meta ads</span><div className="mono srcline"><Icon name="clock" />source disconnected since Tue</div></div></div>); }
function BandMini() { return (<div className="mini"><div className="band-row sm">{[0, 1, 2, 3, 4, 5, 6].map((k) => <i key={k} className={k < 3 ? "on" : k < 5 ? "half" : ""} />)}</div><div className="band-big sm"><b>3 to 5</b><span>of 7 runs, ChatGPT</span></div><div className="mono dim">Google AI: 2 to 4 · Perplexity: 4 to 6</div></div>); }
function QueueMini() { return (<div className="mini">{[["Approve the Diwali landing-page copy", "by Thu"], ["Pause campaign 3 or move its budget", "by Fri"]].map((r) => <div className="qrow" key={r[0]}><span className="qbtn">Decide</span><span>{r[0]}</span><span className="mono dim">{r[1]}</span></div>)}</div>); }
function CallMini() { return (<div className="mini center"><span className="callbtn"><Icon name="phone" />Ask for a call</span><div className="mono dim">you pick the time · usually the same day</div></div>); }

export function ModuleCards({ items }: { items: { title: string; text: string }[] }) {
  const reduce = useReducedMotion();
  const scenes = [<PlanMini key="a" />, <WorkMini key="b" />, <NumbersMini key="c" />, <SourceMini key="d" />, <BandMini key="e" />, <QueueMini key="f" />, <CallMini key="g" />];
  const icons = ["flag", "doc", "rupee", "clock", "sparkle", "check", "phone"];
  return (
    <div className="mcards">
      {items.map((it, i) => (
        <motion.article className="mcard" key={it.title} {...up(reduce, 0.06 * i)}>
          <div className="mcard-top"><span className="icard-ic"><Icon name={icons[i % icons.length]} /></span><span className="mono">module {String(i + 1).padStart(2, "0")} · sample</span></div>
          {scenes[i % scenes.length]}
          <h3>{it.title}</h3>
          <p>{it.text}</p>
        </motion.article>
      ))}
    </div>
  );
}

const NOTE3 = ["Title and description rewritten Tuesday; re-fetch on the 30th.", "Enquiries this week 14, last week 11. Campaign 2 at ₹412 each.", "Waiting on you: the Diwali landing-page copy."];
export function ThreeChannels({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className={`chan${compact ? " compact" : ""}`}>
      <motion.div className="ch phone" {...up(reduce, 0.1)}>
        <div className="mono lbl"><Icon name="phone" />WhatsApp · Mon 9:02</div>
        <div className="ch-bub"><b>Relay · week of 22 Sep</b><ol>{NOTE3.map((l) => <li key={l}>{l}</li>)}</ol></div>
      </motion.div>
      <motion.div className="ch mail" {...up(reduce, 0.35)}>
        <div className="mono lbl"><Icon name="mail" />Email · Mon 9:02</div>
        <div className="ch-mail"><div className="ch-subj">Week of 22 Sep: what changed, and what needs you</div><div className="mono dim">from Relay · to you</div><ol>{NOTE3.map((l) => <li key={l}>{l}</li>)}</ol></div>
      </motion.div>
      <motion.div className="ch dash" {...up(reduce, 0.6)}>
        <div className="mono lbl"><Icon name="grid" />Dashboard · weekly notes</div>
        <div className="ch-card"><div className="ch-row on"><span>Week of 22 Sep</span><span className="mono">new</span></div><div className="ch-row"><span>Week of 15 Sep</span><span className="mono dim">read</span></div><div className="ch-row"><span>Week of 8 Sep</span><span className="mono dim">read</span></div></div>
      </motion.div>
    </div>
  );
}

export function TargetsScene() {
  const reduce = useReducedMotion();
  const tiles = [["Enquiries a week", "14", "20", 70], ["Cost per enquiry", "₹412", "₹400", 97], ["Bookings a week", "5", "6", 83]];
  return (
    <div className="targets">
      {tiles.map((t, i) => (
        <motion.div className="target" key={t[0]} {...up(reduce, 0.1 * i)}>
          <span className="mono dim">{t[0]}</span>
          <div className="target-n"><b>{t[1]}</b><span className="mono">target {t[2]}</span></div>
          <div className="target-bar"><motion.i initial={reduce ? false : { width: 0 }} whileInView={{ width: `${t[3]}%` }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 + 0.1 * i, ease }} /></div>
        </motion.div>
      ))}
    </div>
  );
}

const LOG = [["Mon", "Weekly note posted and sent", "Dhruv", "chat"], ["Tue", "Homepage title and description rewritten", "Dhruv", "doc"], ["Wed", "Tracking fixed: each enquiry counted once", "in-house", "bolt"], ["Thu", "Campaign 2 live, budget moved from campaign 3", "in-house", "target"], ["Fri", "Booking page cut from 4.9 MB to 0.6 MB", "in-house", "code"]];
export function WorkLog({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className={`wlog${compact ? " compact" : ""}`}>
      <div className="wlog-head"><span className="mono lbl">this week's work, with a name on every row</span><span className="mono dim">week of 22 Sep · sample</span></div>
      {LOG.slice(0, compact ? 4 : 5).map((r, i) => (
        <motion.div className="wlog-row" key={r[1]} {...up(reduce, 0.08 * i)}><span className="mono dim">{r[0]}</span><span className="icard-ic sm"><Icon name={r[3]} /></span><b>{r[1]}</b><span className={`who${r[2] === "Dhruv" ? " me" : ""}`}>{r[2]}</span></motion.div>
      ))}
    </div>
  );
}

export function MapCard({ email }: { email?: string }) {
  return (
    <div className="mapcard">
      <div className="map" aria-hidden="true">
        <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">
          <g className="map-grid">{Array.from({ length: 9 }, (_, i) => <line key={"v" + i} x1={i * 40} y1="0" x2={i * 40} y2="180" />)}{Array.from({ length: 5 }, (_, i) => <line key={"h" + i} x1="0" y1={i * 45} x2="320" y2={i * 45} />)}</g>
          <g className="map-roads"><path d="M0 120 C 80 110, 140 130, 200 100 S 300 60, 320 70" /><path d="M120 0 C 130 60, 150 90, 170 180" /><path d="M0 40 L 320 30" /></g>
          <g className="map-pin"><circle cx="176" cy="96" r="14" className="halo" /><path d="M176 108 c-9-9-14-16-14-23a14 14 0 0 1 28 0c0 7-5 14-14 23z" /><circle cx="176" cy="85" r="4.5" className="dot" /></g>
        </svg>
      </div>
      <div className="addr">
        <div className="addr-row"><Icon name="pin" /><div><b>WeWork Forum, Gurugram</b><span>Haryana, India</span></div></div>
        {email && <div className="addr-row"><Icon name="mail" /><div><b>{email}</b><span>one line about your site is enough to start</span></div></div>}
        <div className="addr-row"><Icon name="calendar" /><div><b><a href={site.bookingUrl}>Book the free 20-minute audit call</a></b><span>your data, three gaps, a proposal the next business day</span></div></div>
      </div>
    </div>
  );
}

// The dashboard on a phone: the hero of the dashboard page.
export function PhoneDash() {
  return (
    <div className="pd">
      <div className="pd-frame">
        <div className="pd-notch" />
        <div className="pd-top"><b>Dr Mehra Skin Clinic</b><span className="mono">Mon 9:04</span></div>
        <div className="pd-tile"><span className="mono dim">enquiries this week</span><div className="pd-n"><b>14</b><span className="delta">+3</span></div></div>
        <div className="pd-tile"><span className="mono dim">named in AI answers</span><div className="band-row sm">{[0, 1, 2, 3, 4, 5, 6].map((k) => <i key={k} className={k < 3 ? "on" : k < 5 ? "half" : ""} />)}</div><span className="mono dim">3 to 5 of 7 runs</span></div>
        <div className="pd-tile note"><span className="mono dim">Monday note</span><ol><li>Title rewritten; re-fetch on the 30th.</li><li>Enquiries 14, last week 11.</li></ol></div>
        <div className="pd-tile queue"><span className="qbtn">Decide</span><span>Approve the Diwali page</span></div>
      </div>
    </div>
  );
}

// A decision, from the queue to the log to the note.
export function DecisionFlow() {
  const reduce = useReducedMotion();
  return (
    <div className="dflow">
      <motion.div className="df" {...up(reduce, 0.1)}>
        <div className="mono lbl"><Icon name="check" />needs your decision · Thu 10:40</div>
        <div className="df-card"><span className="qbtn pressed">Decide</span><b>Approve the Diwali landing-page copy</b><span className="mono dim">by Thu</span></div>
        <p>One tap. Nothing to type, nothing to forward.</p>
      </motion.div>
      <div className="df-arrow" aria-hidden="true" />
      <motion.div className="df" {...up(reduce, 0.3)}>
        <div className="mono lbl"><Icon name="doc" />work log · Thu 10:41</div>
        <div className="wlog compact inline"><div className="wlog-row"><span className="mono dim">Thu</span><span className="icard-ic sm"><Icon name="check" /></span><b>Diwali landing page approved</b><span className="who me">you</span></div><div className="wlog-row"><span className="mono dim">Fri</span><span className="icard-ic sm"><Icon name="bolt" /></span><b>Diwali landing page live</b><span className="who">in-house</span></div></div>
        <p>It lands in the log with your name and the time, and the work that follows sits under it.</p>
      </motion.div>
      <div className="df-arrow" aria-hidden="true" />
      <motion.div className="df" {...up(reduce, 0.55)}>
        <div className="mono lbl"><Icon name="chat" />Monday note · line 4</div>
        <div className="ch-bub"><b>Relay · week of 29 Sep</b><ol start={4}><li>Diwali page live Friday; 3 enquiries from it by Sunday.</li></ol></div>
        <p>Monday's note says what your decision did.</p>
      </motion.div>
    </div>
  );
}

// Your accounts stay yours.
export function AccountsScene() {
  const reduce = useReducedMotion();
  const accounts = [["search", "Google Search Console", "how you appear and get clicked"], ["eye", "Google Analytics", "what visitors do on your site"], ["target", "Google Ads", "search campaigns and their cost"], ["layers", "Meta Ads", "Instagram and Facebook campaigns"], ["code", "Your website and domain", "the site itself, and its address"]];
  return (
    <div className="accts">
      {accounts.map((a, i) => (
        <motion.div className="acct" key={a[1]} {...up(reduce, 0.08 * i)}>
          <span className="icard-ic"><Icon name={a[0]} /></span>
          <b>{a[1]}</b>
          <span className="acct-what">{a[2]}</span>
          <div className="acct-rows"><span><em className="spill fine">owner</em>you</span><span><em className="spill">access</em>Relay, removed when you leave</span></div>
        </motion.div>
      ))}
      <motion.div className="acct export" {...up(reduce, 0.5)}>
        <span className="icard-ic"><Icon name="export" /></span>
        <b>If you leave</b>
        <span className="acct-what">every account stays with you, and you get an export of your dashboard: the work log, the numbers, the notes.</span>
      </motion.div>
    </div>
  );
}
