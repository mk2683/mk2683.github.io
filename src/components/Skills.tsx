import { motion } from "framer-motion";
import { skills } from "../data/content";

function MarqueeRow({ items, reverse, delay }: { items: string[]; reverse?: boolean; delay: number }) {
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className={`flex w-max gap-3 py-1.5 animate-marquee ${reverse ? "[animation-direction:reverse]" : ""}`}
        style={{ animationDuration: `${items.length * 3.2}s` }}
      >
        {loop.map((s, i) => (
          <span
            key={`${s}-${i}`}
            className="font-mono text-[12.5px] px-3.5 py-2 rounded-full border border-[var(--line)] bg-[var(--surface)] whitespace-nowrap text-[var(--ink)]"
          >
            {s}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const groups = Object.entries(skills);

  return (
    <section id="skills" className="py-16 sm:py-24 border-t border-[var(--line)] overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-10">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--ink-faint)] mb-2">
            03 — Toolkit
          </div>
          <h2 className="font-mono font-semibold text-[clamp(1.5rem,3.4vw,2.1rem)]">Skills & tools</h2>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {groups.map(([cat, items], i) => (
          <div key={cat}>
            <div className="mx-auto max-w-5xl px-4 sm:px-6 mb-2">
              <span className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-[var(--ink-faint)]">
                {cat}
              </span>
            </div>
            <MarqueeRow items={items} reverse={i % 2 === 1} delay={i * 0.08} />
          </div>
        ))}
      </div>
    </section>
  );
}
