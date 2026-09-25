"use client";
// Adapted from 21st.dev "Chat Messages" by nexus-ui (id 20129): sequential reveal, typing indicator, replay.
// Restyled to the Relay system; the assistant's last message is the answer that names businesses.
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SCENES } from "./creative";

type Msg = { id: string; sender: "user" | "assistant"; content: React.ReactNode };

function scene(i: number): Msg[] {
  const s = SCENES[i];
  return [
    { id: `u${i}`, sender: "user", content: s.q },
    { id: `a${i}`, sender: "assistant", content: (<><div className="cd-label">AI answer</div><ol className="cd-list">{s.ans.map((t, k) => <li key={t} className={k === s.ans.length - 1 ? "you" : ""}>{t}</li>)}</ol></>) },
  ];
}

function Typing() {
  return (
    <motion.div className="cd-typing" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}>
      {[0, 1, 2].map((i) => <motion.span key={i} animate={{ opacity: [0.4, 1, 0.4], y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }} />)}
    </motion.div>
  );
}

export default function ChatDemo({ typingDuration = 1100, gap = 1600, hold = 4200 }: { typingDuration?: number; gap?: number; hold?: number }) {
  const reduce = useReducedMotion();
  const [si, setSi] = useState(0);
  const [msgs, setMsgs] = useState<Msg[]>(() => scene(0));
  const [visible, setVisible] = useState(reduce ? 2 : 0);
  const [typing, setTyping] = useState(false);
  const alive = useRef(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const later = (fn: () => void, ms: number) => { const t = setTimeout(() => { if (alive.current) fn(); }, ms); timers.current.push(t); };

  const play = useCallback((list: Msg[]) => {
    timers.current.forEach(clearTimeout); timers.current = [];
    setVisible(0); setTyping(false);
    let t = 400;
    list.forEach((m, k) => {
      if (m.sender === "assistant") { later(() => setTyping(true), t); t += typingDuration; later(() => setTyping(false), t); }
      later(() => setVisible(k + 1), t); t += gap;
    });
    later(() => setSi((s) => (s + 1) % SCENES.length), t + hold - gap);
  }, [typingDuration, gap, hold]);

  useEffect(() => { alive.current = true; return () => { alive.current = false; timers.current.forEach(clearTimeout); }; }, []);
  useEffect(() => { const list = scene(si); setMsgs(list); if (reduce) { setVisible(list.length); return; } play(list); }, [si, reduce, play]);

  return (
    <div className="cd" aria-label="How a customer's question becomes an answer that names businesses">
      <div className="cd-head">
        <span className="mono">{SCENES[si].who} asks</span>
        <button type="button" className="txt" onClick={() => play(msgs)} aria-label="Replay the conversation">Replay</button>
      </div>
      <div className="cd-log" role="log" aria-live="polite">
        {msgs.slice(0, visible).map((m) => (
          <motion.div key={m.id} className={`cd-row ${m.sender}`} initial={reduce ? false : { opacity: 0, y: 12, scale: 0.96, x: m.sender === "user" ? 16 : -16 }} animate={{ opacity: 1, y: 0, scale: 1, x: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            {m.sender === "assistant" && <span className="cd-spark" aria-hidden="true">✦</span>}
            <div className="cd-bub">{m.content}</div>
          </motion.div>
        ))}
        <AnimatePresence>{typing && <Typing />}</AnimatePresence>
      </div>
      <div className="cd-dots" aria-hidden="true">{SCENES.map((_, k) => <span key={k} className={k === si ? "on" : ""} />)}</div>
    </div>
  );
}
