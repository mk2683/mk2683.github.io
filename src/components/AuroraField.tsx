import { motion } from "framer-motion";

type Blob = { color: string; size: number; top: string; left: string; duration: number; delay: number };

const BLOBS: Blob[] = [
  { color: "var(--accent)", size: 520, top: "-12%", left: "4%", duration: 22, delay: 0 },
  { color: "var(--accent-warm)", size: 440, top: "10%", left: "58%", duration: 26, delay: 2 },
  { color: "var(--accent-2)", size: 380, top: "48%", left: "22%", duration: 30, delay: 4 },
];

export default function AuroraField({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden ${className}`}>
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full animate-float-slow"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            filter: "blur(60px)",
            opacity: 0.35,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1.5, delay: b.delay * 0.15 }}
        />
      ))}
    </div>
  );
}
