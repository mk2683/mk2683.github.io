import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A small dot-and-ring cursor follower, desktop/fine-pointer only.
 * Grows over anything with [data-cursor="link"].
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const ringX = useSpring(mx, { stiffness: 500, damping: 40, mass: 0.4 });
  const ringY = useSpring(my, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-capable");

    const move = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest('[data-cursor="link"]'));
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.classList.remove("cursor-none-capable");
    };
  }, [mx, my]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[70] rounded-full"
        style={{
          x: mx,
          y: my,
          width: 6,
          height: 6,
          translateX: "-50%",
          translateY: "-50%",
          background: "linear-gradient(135deg, var(--accent), var(--accent-warm))",
          boxShadow: "0 0 12px 1px var(--glow)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[70] rounded-full border"
        animate={{
          width: hovering ? 52 : 26,
          height: hovering ? 52 : 26,
          opacity: hovering ? 0.95 : 0.5,
          borderColor: hovering ? "var(--accent-warm)" : "var(--accent)",
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
