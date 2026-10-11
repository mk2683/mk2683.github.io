import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";

export default function TiltPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rx = useSpring(0, { stiffness: 220, damping: 20 });
  const ry = useSpring(0, { stiffness: 220, damping: 20 });
  const glareX = useSpring(50, { stiffness: 220, damping: 24 });
  const glareY = useSpring(50, { stiffness: 220, damping: 24 });
  const glareOpacity = useSpring(0, { stiffness: 220, damping: 24 });
  const transform = useMotionTemplate`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  const glareBg = useMotionTemplate`radial-gradient(240px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18), transparent 60%)`;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 10);
    rx.set(py * -10);
    glareX.set((px + 0.5) * 100);
    glareY.set((py + 0.5) * 100);
    glareOpacity.set(1);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
    glareOpacity.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ transform }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: glareBg, opacity: glareOpacity }}
      />
    </motion.div>
  );
}
