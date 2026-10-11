import { motion } from "framer-motion";
import { education, awards } from "../data/content";

export default function Education() {
  return (
    <section id="education" className="py-16 sm:py-24 border-t border-[var(--line)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--ink-faint)] mb-2">
            04 — Education
          </div>
          <h2 className="font-display font-semibold text-[clamp(1.8rem,4.2vw,2.6rem)]">Background</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {education.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl glass glow-ring p-6"
            >
              <div className="font-mono text-[11px] text-[var(--accent)] mb-2">{e.when}</div>
              <h3 className="font-display font-semibold text-[1.1rem] mb-1">{e.title}</h3>
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
          <span className="text-gradient font-mono font-semibold">★★</span> {awards}
        </motion.div>
      </div>
    </section>
  );
}
