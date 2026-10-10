import { motion } from "framer-motion";
import { education, awards } from "../data/content";

export default function Education() {
  return (
    <section id="education" className="py-16 sm:py-24 border-t border-[var(--line)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-10">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--ink-faint)] mb-2">
            04 — Education
          </div>
          <h2 className="font-mono font-semibold text-[clamp(1.5rem,3.4vw,2.1rem)]">Background</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {education.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-5"
            >
              <div className="font-mono text-[11px] text-[var(--ink-faint)] mb-2">{e.when}</div>
              <h3 className="font-semibold mb-1">{e.title}</h3>
              <div className="text-[var(--ink-soft)] text-[0.9rem]">{e.where}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-[var(--ink-soft)] text-[0.9rem]"
        >
          <span className="text-[var(--accent)] font-mono">★★</span> {awards}
        </motion.div>
      </div>
    </section>
  );
}
