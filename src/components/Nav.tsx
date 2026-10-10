import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";

const LINKS = [
  { href: "#journey", label: "Journey" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div
        className={`transition-colors duration-300 border-b ${
          scrolled
            ? "bg-[var(--surface)]/90 backdrop-blur border-[var(--line)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <a
            href="#top"
            data-cursor="link"
            className="font-mono text-[13px] font-semibold tracking-wide whitespace-nowrap"
          >
            MOHIT<span className="text-[var(--accent)]">.</span>KUMAR
          </a>

          <nav className="hidden sm:flex items-center gap-5 font-mono text-[11px] uppercase tracking-widest text-[var(--ink-soft)]">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor="link"
                className="py-1 border-b-2 border-transparent hover:border-[var(--accent)] hover:text-[var(--ink)] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={toggle}
            data-cursor="link"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className="w-8 h-8 shrink-0 grid place-items-center rounded-full border border-[var(--line-strong)] text-[var(--ink-soft)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
          >
            {theme === "dark" ? <FiSun size={14} /> : <FiMoon size={14} />}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
