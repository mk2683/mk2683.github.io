import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const WORD = "MOHIT KUMAR";

export default function Preloader() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduced) return;
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem("intro-seen") === "1";
    } catch {
      // ignore
    }
    if (alreadySeen) return;

    setShow(true);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      try {
        sessionStorage.setItem("intro-seen", "1");
      } catch {
        // ignore
      }
    }, 1500);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "var(--paper)" }}
        >
          <div className="font-mono font-semibold text-[clamp(1.4rem,5vw,2.4rem)] tracking-tight flex">
            {WORD.split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.035, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
                style={{ color: "var(--ink)" }}
              >
                {ch === " " ? " " : ch}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + WORD.length * 0.035 }}
              className="inline-block w-[0.5ch] h-[1em] ml-1 self-center"
              style={{ background: "var(--accent)" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
