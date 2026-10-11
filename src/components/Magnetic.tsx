import { useRef, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

/**
 * Wraps an inline element and nudges it toward the pointer within `range`px,
 * springing back on leave. Desktop mouse only — no-op on touch.
 */
export default function Magnetic({
  children,
  range = 60,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  range?: number;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < range) {
      x.set(dx * strength);
      y.set(dy * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x, y, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
