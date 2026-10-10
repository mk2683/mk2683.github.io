export default function Footer() {
  return (
    <footer
      className="border-t border-[var(--line)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 flex flex-wrap justify-between gap-2 font-mono text-[11px] text-[var(--ink-faint)]">
        <span>© {new Date().getFullYear()} Mohit Kumar</span>
        <span>Built with React, TypeScript & Framer Motion</span>
      </div>
    </footer>
  );
}
