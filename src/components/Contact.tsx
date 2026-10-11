import { motion } from "framer-motion";
import { FiMail, FiLinkedin, FiMapPin } from "react-icons/fi";
import { profile } from "../data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32 border-t border-[var(--line)] overflow-hidden">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-[0.1] blur-[120px] -z-10"
        style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-warm))" }}
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--ink-faint)] mb-4"
        >
          05 — Contact
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-display font-semibold text-[clamp(2.2rem,7vw,4.2rem)] leading-[1.02] mb-5 max-w-[16ch]"
        >
          Let's build something <span className="text-gradient">fast &amp; well-made</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-[var(--ink-soft)] max-w-[58ch] mb-10"
        >
          Open to conversations about senior and staff-track frontend roles, design-systems work, and anything
          React / performance related.
        </motion.p>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { href: `mailto:${profile.email}`, icon: FiMail, k: "Email", v: profile.email, external: false },
            { href: profile.linkedin, icon: FiLinkedin, k: "LinkedIn", v: "linkedin.com/in/mohit83", external: true },
          ].map((c, i) => (
            <motion.a
              key={c.k}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener" : undefined}
              data-cursor="link"
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * i, ease: EASE }}
              whileHover={{ y: -5, scale: 1.015 }}
              className="rounded-xl glass glow-ring p-6 flex flex-col gap-2.5"
            >
              <c.icon className="text-[var(--accent)]" size={18} />
              <span className="font-mono text-[10.5px] uppercase tracking-wider text-[var(--ink-faint)]">
                {c.k}
              </span>
              <span className="text-[0.95rem]">{c.v}</span>
            </motion.a>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="rounded-xl glass glow-ring p-6 flex flex-col gap-2.5"
          >
            <FiMapPin className="text-[var(--accent)]" size={18} />
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-[var(--ink-faint)]">
              Location
            </span>
            <span className="text-[0.95rem]">{profile.location}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
