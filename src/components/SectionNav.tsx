import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

const SECTIONS = [
  { id: "top", label: "Intro" },
  { id: "journey", label: "Journey" },
  { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function SectionNav() {
  const [active, setActive] = useState("top");
  const lenis = useLenis();

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (els.length < 2) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-4"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            data-cursor="link"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(s.id);
              if (el && lenis) lenis.scrollTo(el, { duration: 1.1 });
              else el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-3"
          >
            <span
              className={`font-mono text-[10.5px] uppercase tracking-wider transition-all duration-300 ${
                isActive ? "opacity-100 text-[var(--accent)]" : "opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 text-[var(--ink-soft)]"
              }`}
            >
              {s.label}
            </span>
            <span className="relative w-2.5 h-2.5 grid place-items-center">
              {isActive && (
                <motion.span
                  layoutId="section-dot-ring"
                  className="absolute inset-[-5px] rounded-full border border-[var(--accent)]"
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                />
              )}
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  isActive ? "bg-[var(--accent)]" : "bg-[var(--line-strong)] group-hover:bg-[var(--ink-soft)]"
                }`}
              />
            </span>
          </a>
        );
      })}
    </nav>
  );
}
