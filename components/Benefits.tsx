"use client";
// What changes for the owner. Six cards, each with a small illustrative scene, no account screenshots.
import { motion, useReducedMotion } from "motion/react";

const rise = (i: number) => ({ initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.5, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } });

function Recognition() {
  return (
    <div className="bn-vis bn-answer">
      <div className="bn-q">best physio at home, Bangalore</div>
      <div className="bn-a"><span className="mono">AI answer</span><ol><li>Restore Physio, Indiranagar</li><li>MoveWell Home Care</li><li className="you">your clinic</li></ol></div>
    </div>
  );
}
function Customers() {
  const bars = [6, 8, 7, 9, 11, 14];
  return (
    <div className="bn-vis bn-count">
      <div className="bn-big">14<span>enquiries this week</span></div>
      <div className="bn-bars">{bars.map((v, k) => <motion.i key={k} initial={{ height: 0 }} whileInView={{ height: `${v * 6}%` }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 * k }} className={k === bars.length - 1 ? "on" : ""} />)}</div>
      <div className="mono bn-src">each one traced to its search or campaign</div>
    </div>
  );
}
function Queries() {
  return (
    <div className="bn-vis bn-queries">
      <div className="bn-bubble">is IVF covered by insurance in India?</div>
      <div className="bn-bubble">what does one cycle cost in Gurugram?</div>
      <div className="bn-page"><span className="mono">your page</span>Answered in your words, so the answer quotes you.</div>
    </div>
  );
}
function Rankings() {
  const rows = [["best dermatologist near me", "7", "4"], ["acne treatment gurugram", "12", "6"], ["laser hair removal sector 29", "3", "3"]];
  return (
    <div className="bn-vis bn-rank">
      <div className="bn-row head mono"><span>search</span><span>last Mon</span><span>this Mon</span></div>
      {rows.map((r) => <div className="bn-row" key={r[0]}><span>{r[0]}</span><span className="mono">#{r[1]}</span><span className={`mono${r[1] !== r[2] ? " up" : ""}`}>#{r[2]}</span></div>)}
    </div>
  );
}
function BrandValue() {
  return (
    <div className="bn-vis bn-brand">
      <div className="bn-serp old"><span className="mono">template</span><b>Home | Online Store</b><i>Secure payment options and seamless shopping.</i></div>
      <div className="bn-serp new"><span className="mono">your voice</span><b>Barefoot Bars. Protein bars with five ingredients, made in Pune.</b><i>No sugar, no whey. Ships across India in two days.</i></div>
    </div>
  );
}
function Revenue() {
  return (
    <div className="bn-vis bn-rev">
      <div className="bn-kv"><span>cost per enquiry</span><b>₹412</b></div>
      <div className="bn-kv"><span>enquiries, this month</span><b>51</b></div>
      <div className="bn-kv"><span>booked</span><b>19</b></div>
      <div className="bn-kv total"><span>from search and campaigns</span><b>₹3.8L</b></div>
    </div>
  );
}

const CARDS = [
  { k: "Recognition", line: "Your name in the answer when a customer asks for what you sell, on Google and inside AI answers.", vis: <Recognition /> },
  { k: "Customers", line: "Enquiries, bookings and orders you can count, each traced to the search or campaign that brought it.", vis: <Customers /> },
  { k: "Queries", line: "The questions your customers ask, answered on your pages in your own words, so the answer quotes you.", vis: <Queries /> },
  { k: "Rankings", line: "The searches that bring buyers, tracked by position every Monday and worked page by page.", vis: <Rankings /> },
  { k: "Brand value", line: "The two lines that introduce you everywhere, written in your voice instead of a template's.", vis: <BrandValue /> },
  { k: "Revenue", line: "What each enquiry cost and what it brought, in rupees, on one page you can open any hour.", vis: <Revenue /> },
];

export default function Benefits() {
  const reduce = useReducedMotion();
  return (
    <div className="bn-grid">
      {CARDS.map((c, i) => (
        <motion.article className="bn-card" key={c.k} {...(reduce ? {} : rise(i))}>
          <div className="mono bn-k">{c.k}</div>
          {c.vis}
          <p>{c.line}</p>
        </motion.article>
      ))}
    </div>
  );
}
