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
    <TiltPanel className="relative aspect-[4/3] rounded-md overflow-hidden border border-[var(--line)] bg-[var(--surface-2)]">
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
          <div className="w-12 h-12 rounded-full border border-dashed border-[var(--line-strong)] grid place-items-center text-[var(--ink-faint)]">
            <FiPlay size={18} />
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
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-12 sm:py-16 border-t border-[var(--line)] ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Media project={project} />

      <div>
        <div className="font-mono text-[11.5px] text-[var(--accent)] mb-3">{project.path}</div>
        <h3 className="text-[1.3rem] sm:text-[1.5rem] font-semibold mb-1">{project.title}</h3>
        <div className="text-[var(--ink-faint)] text-[0.85rem] font-mono mb-4">{project.company}</div>
        <p className="text-[var(--ink-soft)] text-[0.95rem] leading-relaxed mb-5">{project.desc}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] px-2.5 py-1 rounded border border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink-soft)]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="rounded-md border border-dashed border-[var(--line-strong)] px-4 py-3">
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
    <section id="projects" className="py-16 sm:py-24 border-t border-[var(--line)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-4">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--ink-faint)] mb-2">
            02 — Case studies
          </div>
          <h2 className="font-mono font-semibold text-[clamp(1.5rem,3.4vw,2.1rem)] mb-3">Featured work</h2>
          <p className="text-[var(--ink-soft)] max-w-[58ch]">
            Six projects pulled from the roles above. Each one has a slot for a recorded walkthrough — wired up as
            I add them.
          </p>
        </div>

        <div>
          {projects.map((p, i) => (
            <ProjectRow key={p.path} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
