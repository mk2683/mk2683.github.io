import { motion } from "framer-motion";
import { FiPlay, FiExternalLink } from "react-icons/fi";
import { projects, type Project } from "../data/content";
import TiltPanel from "./TiltPanel";

function isEmbeddable(url: string) {
  return /youtube\.com|youtu\.be|loom\.com/.test(url);
}
function toEmbedSrc(url: string) {
  const yt = url.match(/(?:youtu\.be\/|v=)([\w-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  return url.replace("/share/", "/embed/");
}

function Media({ project }: { project: Project }) {
  const { videoUrl } = project;
  return (
    <TiltPanel className="aspect-[4/3] rounded-2xl overflow-hidden glow-ring bg-[var(--surface-2)]">
      {videoUrl && isEmbeddable(videoUrl) ? (
        <iframe
          src={toEmbedSrc(videoUrl)}
          title={`${project.title} walkthrough`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : videoUrl ? (
        <video src={videoUrl} controls preload="metadata" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
          <div
            className="w-14 h-14 rounded-full grid place-items-center text-[var(--accent)]"
            style={{ background: "var(--accent-soft)" }}
          >
            <FiPlay size={20} />
          </div>
          <p className="font-mono text-[11px] text-[var(--ink-faint)] max-w-[28ch]">
            // walkthrough not recorded yet
          </p>
        </div>
      )}
    </TiltPanel>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center py-12 sm:py-20 border-t border-[var(--line)] ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Media project={project} />

      <div>
        <div className="font-mono text-[11.5px] text-gradient font-medium mb-3">{project.path}</div>
        <h3 className="font-display text-[1.5rem] sm:text-[1.8rem] font-semibold mb-1">{project.title}</h3>
        <div className="text-[var(--ink-faint)] text-[0.85rem] font-mono mb-4">{project.company}</div>
        <p className="text-[var(--ink-soft)] text-[0.97rem] leading-relaxed mb-5">{project.desc}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink-soft)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="rounded-xl glass px-4 py-3.5">
          <p className="font-mono text-[11.5px] text-[var(--ink-faint)] italic leading-relaxed mb-2">
            "{project.videoDesc}"
          </p>
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener"
              data-cursor="link"
              className="inline-flex items-center gap-1.5 font-mono text-[11.5px] text-[var(--accent)] hover:underline"
            >
              <FiExternalLink size={12} /> view live demo
            </a>
          ) : (
            <span className="font-mono text-[11.5px] text-[var(--ink-faint)]">▸ add demo link</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-16 sm:py-24 border-t border-[var(--line)] overflow-hidden">
      <div
        aria-hidden
        className="absolute -right-40 top-10 w-[480px] h-[480px] rounded-full opacity-[0.06] blur-[110px] -z-10"
        style={{ background: "var(--accent-warm)" }}
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--ink-faint)] mb-2">
            02 — Case studies
          </div>
          <h2 className="font-display font-semibold text-[clamp(1.8rem,4.2vw,2.6rem)] mb-3">Featured work</h2>
          <p className="text-[var(--ink-soft)] max-w-[58ch]">
            Six projects pulled from the roles above. Each one has a slot for a recorded walkthrough — wired up as
            I add them.
          </p>
        </motion.div>

        <div>
          {projects.map((p, i) => (
            <ProjectRow key={p.path} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
