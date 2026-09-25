"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { spring } from "./motion";
import { site } from "@/lib/site";

type Row = { key: string; name: string; status: "today" | "tomorrow" | "structural" | "fine"; finding: string; verify: string };
type Result = { host: string; origin: string; title: string; description: string; rows: Row[]; summary: { today: number; tomorrow: number; fine: number; total: number }; checkedAt: string };

const LABEL = { today: "costs you today", tomorrow: "costs you soon", structural: "hygiene", fine: "working, keep" };

export default function LiveCheck({ ctaHref = site.bookingUrl, cta = "Book the free 20-minute audit call" }: { ctaHref?: string; cta?: string }) {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [err, setErr] = useState("");
  const [res, setRes] = useState<Result | null>(null);
  const reduce = useReducedMotion();

  async function run(e: React.FormEvent) {
    e.preventDefault();
    const v = url.trim(); if (!v) { setErr("Type your website address first."); return; }
    setErr(""); setState("loading"); setRes(null);
    try {
      const r = await fetch("/api/check", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: v }) });
      const j = await r.json();
      if (!r.ok) { setErr(j.error || "Something went wrong."); setState("error"); return; }
      setRes(j); setState("done");
    } catch { setErr("We could not reach the site. Check the address and try again."); setState("error"); }
  }

  return (
    <div className="check" id="check">
      <form className="check-form" onSubmit={run} noValidate>
        <label htmlFor="check-url" className="check-label">Type your website. In ten seconds, see how Google and AI introduce you.</label>
        <div className="check-row">
          <input id="check-url" name="url" type="text" inputMode="url" autoComplete="url" placeholder="yourclinic.in" value={url} onChange={(e) => setUrl(e.target.value)} aria-invalid={!!err} aria-describedby={err ? "check-err" : "check-help"} />
          <button className="btn" type="submit" disabled={state === "loading"}>{state === "loading" ? "Checking…" : "Check my website"}</button>
        </div>
        {err ? <p className="err" id="check-err" role="alert">{err}</p> : <p className="check-help" id="check-help">Seven checks, live, in about a second.</p>}
      </form>

      <AnimatePresence mode="wait">
        {state === "loading" && (
          <motion.div key="skel" className="check-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-live="polite" aria-busy="true">
            <div className="serp skel"><div className="skel-line w40" /><div className="skel-line w90" /><div className="skel-line w70" /></div>
            {[0, 1, 2, 3].map((i) => <div className="crow skel" key={i}><div className="skel-line w30" /><div className="skel-line w80" /></div>)}
          </motion.div>
        )}
        {state === "done" && res && (
          <motion.div key="res" className="check-result" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={spring} aria-live="polite">
            <div className="serp">
              <div className="serp-eyebrow">How a search result introduces {res.host} right now</div>
              <div className="serp-url">{res.origin}</div>
              <div className="serp-title">{res.title || <em>No title. Google will write one for you.</em>}</div>
              <div className="serp-desc">{res.description || <em>No description. Google will pick a sentence at random.</em>}</div>
            </div>
            <div className="check-summary mono">
              <span className="sq r" />{res.summary.today} costing you today
              <span className="sq o" />{res.summary.tomorrow} costing you soon
              <span className="sq e" />{res.summary.fine} working
            </div>
            <ol className="crows">
              {res.rows.map((r, i) => (
                <motion.li className={`crow s-${r.status}`} key={r.key} initial={reduce ? false : { opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ ...spring, delay: 0.15 + i * 0.16 }}>
                  <div className="crow-head"><span className={`sq ${r.status === "today" ? "r" : r.status === "tomorrow" ? "o" : r.status === "structural" ? "k" : "e"}`} /><strong>{r.name}</strong><span className="mono tag">{LABEL[r.status]}</span></div>
                  <p>{r.finding}</p>
                  <code className="verify">{r.verify}</code>
                </motion.li>
              ))}
            </ol>
            <div className="check-foot">
              <p>That is the first two minutes of the audit. The other eighteen happen on a call, on your own Search Console and ad accounts, where the numbers that move your business live.</p>
              <p className="cta"><a className="btn" href={ctaHref}>{cta}</a></p>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
