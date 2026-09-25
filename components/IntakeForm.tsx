"use client";
import { useState } from "react";
import { site, isPlaceholder } from "@/lib/site";

const Q = [
  { id: "site", label: "Your website", help: "The address we will look at on the call.", type: "url", placeholder: "https://" },
  { id: "number", label: "What does working look like, in a number?", help: "Enquiries a month, demo requests, orders, citations for a set of prompts. \"Not sure\" is an honest answer.", type: "text", placeholder: "" },
  { id: "owner", label: "Who owns the outcome on your side?", help: "The person who will open Search Console with us and say yes or no to a fix.", type: "text", placeholder: "" },
  { id: "firms", label: "How many firms are you talking to?", help: "An honest answer helps us both.", type: "text", placeholder: "" },
] as const;

export default function IntakeForm() {
  const [v, setV] = useState<Record<string, string>>({});
  const [err, setErr] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const ready = !isPlaceholder(site.bookingUrl);
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const ne: Record<string, string> = {};
    if (!v.site || !/^https?:\/\/.+\..+/.test(v.site.trim())) ne.site = "Enter the full address, starting with https://";
    if (!v.number) ne.number = "A number, or \"not sure\".";
    if (!v.owner) ne.owner = "A name or a role is enough.";
    if (!v.firms) ne.firms = "A number is enough.";
    setErr(ne);
    if (Object.keys(ne).length) return;
    const notes = Q.map((q) => `${q.label} ${v[q.id]}`).join("\n");
    if (ready) { window.location.href = `${site.bookingUrl}?notes=${encodeURIComponent(notes)}`; return; }
    setDone(true);
  }
  return (
    <form className="form" onSubmit={submit} noValidate>
      {Q.map((q) => (
        <div className="field" key={q.id}>
          <label htmlFor={q.id}>{q.label}</label>
          <p className="help">{q.help}</p>
          <input id={q.id} name={q.id} type={q.type} placeholder={q.placeholder} value={v[q.id] || ""} onChange={(e) => setV({ ...v, [q.id]: e.target.value })} aria-invalid={!!err[q.id]} aria-describedby={err[q.id] ? `${q.id}-err` : undefined} />
          {err[q.id] && <p className="err" id={`${q.id}-err`}>{err[q.id]}</p>}
        </div>
      ))}
      <div className="actions">
        <button className="btn" type="submit">Continue to the calendar</button>
        {!ready && <p className="note">The calendar link is not connected yet. Your answers stay on this page; email us below to book.</p>}
        {done && !ready && <p className="note" role="status">Noted. Email {site.contactEmail} with your website and we will find a time.</p>}
      </div>
    </form>
  );
}
