import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { commits } from "../data/content";

function CommitNode({ commit, index }: { commit: (typeof commits)[number]; index: number }) {
  const isLast = index === commits.length - 1;

  return (
    <div className="relative grid grid-cols-[28px_1fr] gap-x-3 sm:gap-x-6">
      {/* rail */}
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40% 0px -40% 0px" }}
          transition={{ duration: 0.5, ease: "backOut" }}
          className="relative z-10 w-3.5 h-3.5 rounded-full mt-1.5"
          style={{
            background: "linear-gradient(135deg, var(--accent), var(--accent-warm))",
            boxShadow: "0 0 0 4px var(--paper), 0 0 18px 2px var(--glow)",
          }}
        />
        {!isLast && (
          <div className="flex-1 w-px mt-2 bg-gradient-to-b from-[var(--line)] to-transparent" />
        )}
      </div>

      {/* content */}
      <motion.div
        initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -2 }}
        className="pb-12 sm:pb-16"
      >
        <div className="font-mono text-[11px] text-[var(--ink-faint)] mb-2 flex flex-wrap items-center gap-2">
          <span>{commit.hash}</span>
          <span className="px-1.5 py-0.5 rounded border border-[var(--line)] text-[var(--ink-soft)]">
            {commit.branch}
          </span>
          <span>{commit.range}</span>
        </div>

        <div className="font-mono text-[13px] sm:text-[14px] text-gradient font-medium mb-1">
          {commit.summary}
        </div>
        <h3 className="font-display text-[1.2rem] sm:text-[1.4rem] font-semibold mb-0.5">{commit.role}</h3>
        <div className="text-[var(--ink-soft)] text-[0.9rem] mb-4">{commit.company}</div>

        <div className="rounded-xl glass glow-ring font-mono text-[12.5px] overflow-hidden">
          {commit.diff.map((d, i) => (
            <div
              key={i}
              className={`px-4 py-2.5 border-b border-[var(--glass-border)] last:border-b-0 flex gap-2 ${
                d.type === "+" ? "text-[var(--accent-2)]" : "text-[var(--ink-soft)]"
              }`}
            >
              <span className="select-none opacity-70">{d.type}</span>
              <span className="text-[var(--ink)]">{d.text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {commit.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink-soft)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function CommitGraph() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.25", "end 0.75"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <section id="journey" className="relative py-16 sm:py-24 border-t border-[var(--line)] overflow-hidden">
      <div
        aria-hidden
        className="absolute -left-40 top-1/3 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[100px] -z-10"
        style={{ background: "var(--accent)" }}
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14"
        >
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--ink-faint)] mb-2">
            01 — git log --graph
          </div>
          <h2 className="font-display font-semibold text-[clamp(1.8rem,4.2vw,2.6rem)] mb-3">
            The commit history
          </h2>
          <p className="text-[var(--ink-soft)] max-w-[58ch]">
            Three companies, three very different scales of UI problem — read top to bottom like a branch log,
            most recent first.
          </p>
        </motion.div>

        <div ref={sectionRef} className="relative">
          {/* scroll-filled rail line, aligned under the commit dots */}
          <div aria-hidden className="absolute left-[13px] top-0 bottom-0 w-px bg-[var(--line)]" />
          <motion.div
            aria-hidden
            style={{
              scaleY: lineScale,
              background: "linear-gradient(to bottom, var(--accent), var(--accent-warm))",
            }}
            className="absolute left-[13px] top-0 bottom-0 w-px origin-top"
          />

          {commits.map((c, i) => (
            <CommitNode key={c.hash} commit={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
