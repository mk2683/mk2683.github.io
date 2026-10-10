import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile, stats } from "../data/content";
import GridField from "./GridField";

const NAME = profile.name.split("");

function RoleCycle() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((v) => (v + 1) % profile.rolesCycle.length), 2200);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <span className="relative inline-block h-[1.4em] overflow-hidden align-bottom min-w-[17ch]">
      {profile.rolesCycle.map((label, idx) => (
        <motion.span
          key={label}
          className="absolute left-0 top-0 text-[var(--accent)]"
          initial={false}
          animate={
            reduced
              ? { opacity: idx === 0 ? 1 : 0 }
              : { y: `${(idx - i) * 100}%`, opacity: idx === i ? 1 : 0 }
          }
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {label}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative pt-32 sm:pt-40 pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-70 dark:opacity-50">
        <GridField />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, var(--paper) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--accent)] mb-5"
        >
          <span className="w-2 h-3.5 bg-[var(--accent)] blink-cursor" />
          Available for staff-track conversations
        </motion.div>

        <h1 className="font-mono font-semibold leading-[1.02] text-[clamp(2.4rem,8vw,4.6rem)] tracking-tight">
          {NAME.map((ch, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 + idx * 0.035, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="mt-3 text-[clamp(1.05rem,2.6vw,1.3rem)] text-[var(--ink-soft)]"
        >
          <RoleCycle />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-6 max-w-[58ch] text-[var(--ink-soft)] text-[0.98rem] leading-relaxed"
        >
          {profile.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.05 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a
            href={`mailto:${profile.email}`}
            data-cursor="link"
            className="font-mono text-[13px] px-5 py-3 rounded-sm bg-[var(--accent)] text-[var(--accent-ink)] hover:brightness-110 transition"
          >
            Email me
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener"
            data-cursor="link"
            className="font-mono text-[13px] px-5 py-3 rounded-sm border border-[var(--line-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
          >
            LinkedIn ↗
          </a>
          <a
            href="#journey"
            data-cursor="link"
            className="font-mono text-[13px] px-5 py-3 rounded-sm border border-[var(--line-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
          >
            See the journey ↓
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 border border-[var(--line)] divide-x divide-y sm:divide-y-0 divide-[var(--line)]"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-[var(--surface)] px-4 py-5">
              <div className="font-mono font-bold text-[clamp(1.4rem,3.6vw,2rem)] text-[var(--accent)] tabular-nums">
                {s.value}
              </div>
              <div className="mt-1 text-[12px] text-[var(--ink-soft)] leading-snug">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
