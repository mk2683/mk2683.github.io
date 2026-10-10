import { motion } from "framer-motion";
import { FiMail, FiLinkedin, FiMapPin } from "react-icons/fi";
import { profile } from "../data/content";

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28 border-t border-[var(--line)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--ink-faint)] mb-4">
          05 — Contact
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono font-semibold text-[clamp(1.8rem,6vw,3.2rem)] leading-tight mb-5 max-w-[16ch]"
        >
          Let's build something fast & well-made.
        </motion.h2>

        <p className="text-[var(--ink-soft)] max-w-[58ch] mb-10">
          Open to conversations about senior and staff-track frontend roles, design-systems work, and anything
          React / performance related.
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          <motion.a
            href={`mailto:${profile.email}`}
            data-cursor="link"
            whileHover={{ y: -3 }}
            className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-5 flex flex-col gap-2 hover:border-[var(--accent)] transition-colors"
          >
            <FiMail className="text-[var(--accent)]" />
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-[var(--ink-faint)]">Email</span>
            <span className="text-[0.92rem]">{profile.email}</span>
          </motion.a>

          <motion.a
            href={profile.linkedin}
            target="_blank"
            rel="noopener"
            data-cursor="link"
            whileHover={{ y: -3 }}
            className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-5 flex flex-col gap-2 hover:border-[var(--accent)] transition-colors"
          >
            <FiLinkedin className="text-[var(--accent)]" />
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-[var(--ink-faint)]">LinkedIn</span>
            <span className="text-[0.92rem]">linkedin.com/in/mohit83</span>
          </motion.a>

          <div className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-5 flex flex-col gap-2">
            <FiMapPin className="text-[var(--accent)]" />
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-[var(--ink-faint)]">Location</span>
            <span className="text-[0.92rem]">{profile.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
