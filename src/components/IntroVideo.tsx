import { motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";
import { profile } from "../data/content";

function isEmbeddable(url: string) {
  return /youtube\.com|youtu\.be|loom\.com/.test(url);
}

function toEmbedSrc(url: string) {
  const yt = url.match(/(?:youtu\.be\/|v=)([\w-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  return url.replace("/share/", "/embed/"); // Loom share -> embed
}

export default function IntroVideo() {
  const src = profile.introVideo;

  return (
    <section className="py-16 sm:py-24 border-t border-[var(--line)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--ink-faint)] mb-2">
              00 — Intro
            </div>
            <h2 className="font-display font-semibold text-[clamp(1.6rem,3.6vw,2.1rem)]">A 60-second hello</h2>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-video w-full rounded-2xl overflow-hidden glow-ring bg-[var(--surface-2)]"
        >
          {src && isEmbeddable(src) ? (
            <iframe
              src={toEmbedSrc(src)}
              title="Mohit Kumar — intro"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : src ? (
            <video
              src={src}
              controls
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6">
              <div
                className="w-16 h-16 rounded-full grid place-items-center text-[var(--accent)]"
                style={{ background: "var(--accent-soft)" }}
              >
                <FiPlay size={22} />
              </div>
              <p className="font-mono text-[12px] text-[var(--ink-faint)] max-w-[40ch]">
                // not recorded yet — add a file at /public/videos/intro.mp4, or a YouTube /
                Loom link in src/data/content.ts (profile.introVideo)
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
