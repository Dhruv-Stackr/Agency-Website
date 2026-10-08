"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { spring } from "./motion";
import { site } from "@/lib/site";

// The free written audit: the visitor leaves a website and an email; Dhruv sends the audit as a private link.
// Replaced the instant LiveCheck on 8 Oct 2026. The handler is app/api/audit-request.
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,24}$/i;
type Field = "website" | "email";

export default function AuditRequest({ ctaHref = site.bookingUrl, cta = site.cta }: { ctaHref?: string; cta?: string }) {
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [trap, setTrap] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [err, setErr] = useState<{ field?: Field; msg: string } | null>(null);
  const [done, setDone] = useState<{ host: string; due: string; email: string } | null>(null);
  const opened = useRef(0);
  useEffect(() => { opened.current = Date.now(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!website.trim()) return setErr({ field: "website", msg: "Type your website address." });
    if (!EMAIL.test(email.trim())) return setErr({ field: "email", msg: "Enter an email address we can send the audit to." });
    setErr(null); setState("sending");
    try {
      const r = await fetch("/api/audit-request", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website, email, hp: trap, t: opened.current, page: window.location.pathname }) });
      const j = await r.json();
      if (!r.ok) { setErr({ field: j.field, msg: j.error || "Something went wrong. Try again." }); setState("idle"); return; }
      setDone({ host: j.host || website.trim(), due: j.due, email: email.trim() }); setState("done");
    } catch { setErr({ msg: `We could not send that. Email ${site.contactEmail} with your website and we will send the audit.` }); setState("idle"); }
  }

  const invalid = (f: Field) => err?.field === f;
  return (
    <div className="check" id="check">
      <AnimatePresence mode="wait">
        {state !== "done" ? (
          <motion.form key="form" className="check-form" onSubmit={submit} noValidate exit={{ opacity: 0 }}>
            <p className="check-label" id="check-title">Get a free written audit: how Google and AI introduce your business, and the first three fixes.</p>
            <div className="check-row two">
              <label className="sr-only" htmlFor="audit-website">Your website</label>
              <input id="audit-website" name="website" type="text" inputMode="url" autoComplete="url" placeholder="yourclinic.in" value={website}
                onChange={(e) => { setWebsite(e.target.value); if (invalid("website")) setErr(null); }} aria-invalid={invalid("website")} aria-describedby={err ? "check-err" : "check-help"} />
              <label className="sr-only" htmlFor="audit-email">Your email</label>
              <input id="audit-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@yourclinic.in" value={email}
                onChange={(e) => { setEmail(e.target.value); if (invalid("email")) setErr(null); }} aria-invalid={invalid("email")} aria-describedby={err ? "check-err" : "check-help"} />
              <button className="btn" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send me my audit"}</button>
            </div>
            <div className="hp" aria-hidden="true"><label htmlFor="audit-hp">Leave this empty</label><input id="audit-hp" name="relay_hp" type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} /></div>
            {err ? <p className="err" id="check-err" role="alert">{err.msg}</p>
              : <p className="check-help" id="check-help">In your inbox within {site.auditTurnaround}, from {site.contactEmail}. We use your email for this audit and one follow-up, nothing else.</p>}
          </motion.form>
        ) : done && (
          <motion.div key="done" className="check-done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={spring} role="status">
            <p className="check-label">Got it. Your audit of {done.host} reaches {done.email} by {done.due}.</p>
            <p>It arrives as a private link: what your customers see when they search for what you sell, what is in the way, and the first three fixes. Want to go through it sooner? Book twenty minutes on your own numbers.</p>
            <p className="cta"><a className="btn" href={ctaHref}>{cta}</a> <button type="button" className="link" onClick={() => { setState("idle"); setDone(null); setWebsite(""); }}>Request another</button></p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
