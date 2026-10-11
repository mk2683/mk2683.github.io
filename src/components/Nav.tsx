import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";
import Magnetic from "./Magnetic";

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
        className={`transition-all duration-300 border-b ${
          scrolled ? "glass border-[var(--glass-border)]" : "bg-transparent border-transparent"
        }`}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <Magnetic range={70} strength={0.25}>
            <a
              href="#top"
              data-cursor="link"
              className="font-mono text-[13px] font-semibold tracking-wide whitespace-nowrap"
            >
              MOHIT<span className="text-gradient">.</span>KUMAR
            </a>
          </Magnetic>

          <nav className="hidden sm:flex items-center gap-5 font-mono text-[11px] uppercase tracking-widest text-[var(--ink-soft)]">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor="link"
                className="relative py-1 hover:text-[var(--ink)] transition-colors group"
              >
                {l.label}
                <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-warm)] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <Magnetic range={50} strength={0.3}>
            <button
              type="button"
              onClick={toggle}
              data-cursor="link"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="relative w-8 h-8 shrink-0 grid place-items-center rounded-full border border-[var(--line-strong)] text-[var(--ink-soft)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors overflow-hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid place-items-center"
                >
                  {theme === "dark" ? <FiSun size={14} /> : <FiMoon size={14} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </Magnetic>
        </div>
      </div>
    </motion.header>
  );
}
