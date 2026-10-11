import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { profile, stats } from "../data/content";
import GridField from "./GridField";
import AuroraField from "./AuroraField";
import Magnetic from "./Magnetic";

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
          className="absolute left-0 top-0 text-gradient font-medium"
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

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const spotX = useTransform(sx, (v) => `${v * 100}%`);
  const spotY = useTransform(sy, (v) => `${v * 100}%`);
  const parallaxX = useTransform(sx, [0, 1], [-14, 14]);
  const parallaxY = useTransform(sy, [0, 1], [-10, 10]);
  const spotlightBg = useTransform(
    [spotX, spotY],
    ([x, y]) => `radial-gradient(420px circle at ${x} ${y}, var(--accent-soft), transparent 70%)`
  );

  useEffect(() => {
    if (reduced) return;
    const move = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my, reduced]);

  return (
    <section id="top" className="relative pt-32 sm:pt-40 pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <AuroraField />
      </div>
      <div className="absolute inset-0 -z-10 opacity-60 dark:opacity-40">
        <GridField />
      </div>
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 hidden sm:block"
          style={{ background: spotlightBg }}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 65% 55% at 50% 0%, var(--paper) 0%, transparent 72%)",
        }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--accent)] mb-6"
        >
          <span className="w-2 h-3.5 bg-[var(--accent)] blink-cursor" />
          Available for staff-track conversations
        </motion.div>

        <motion.div style={reduced ? undefined : { x: parallaxX, y: parallaxY }}>
          <h1 className="font-display font-semibold leading-[0.95] text-[clamp(3.2rem,11vw,7.5rem)] tracking-tight">
            {NAME.map((ch, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 48, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.15 + idx * 0.04, ease: EASE }}
                className={`inline-block ${ch !== " " && idx >= 6 ? "text-gradient" : ""}`}
              >
                {ch === " " ? " " : ch}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="mt-5 font-display text-[clamp(1.2rem,2.8vw,1.6rem)] text-[var(--ink-soft)]"
        >
          <RoleCycle />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-6 max-w-[58ch] text-[var(--ink-soft)] text-[1.02rem] leading-relaxed"
        >
          {profile.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.15 }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <Magnetic>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="link"
              className="relative font-mono text-[13px] px-6 py-3.5 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] overflow-hidden group inline-block"
            >
              <span className="relative z-10">Email me</span>
              <span className="absolute inset-0 bg-[var(--accent-warm)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener"
              data-cursor="link"
              className="font-mono text-[13px] px-6 py-3.5 rounded-full border border-[var(--line-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors inline-block"
            >
              LinkedIn ↗
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#journey"
              data-cursor="link"
              className="font-mono text-[13px] px-6 py-3.5 rounded-full border border-[var(--line-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors inline-block"
            >
              See the journey ↓
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 rounded-2xl overflow-hidden glass glow-ring"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -3 }}
              className={`px-5 py-6 ${i !== 0 ? "border-l border-[var(--line)]" : ""} ${
                i >= 2 ? "border-t sm:border-t-0 border-[var(--line)]" : ""
              }`}
            >
              <div className="font-display font-semibold text-[clamp(1.6rem,4vw,2.3rem)] text-gradient tabular-nums">
                {s.value}
              </div>
              <div className="mt-1 text-[12px] text-[var(--ink-soft)] leading-snug">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="hidden sm:flex justify-center mt-16"
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-[var(--line-strong)] flex justify-center pt-1.5"
        >
          <span className="w-1 h-1.5 rounded-full bg-[var(--accent)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
