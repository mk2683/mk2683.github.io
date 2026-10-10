# Mohit Kumar — Portfolio

A scroll-driven portfolio for a Senior Frontend Engineer — built as a "career as a commit
log" journey, with per-project video slots, a dot-grid cursor field, and full dark-mode
support. Built with React, TypeScript, Vite, Tailwind CSS v4, and Framer Motion.

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS v4** (CSS-first theme, class-based dark mode)
- **Framer Motion** — scroll-linked animation, the commit-graph fill line, card reveals
- **Lenis** — smooth scrolling
- **react-icons**

## Local development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # serve the production build locally
```

## Editing content

All resume/portfolio copy lives in one place: [`src/data/content.ts`](src/data/content.ts).
Update your profile, experience ("commits"), projects, skills, education, and stats there —
no component code needs to change.

### Adding video

- **Self-intro** — set `profile.introVideo` to a YouTube/Loom URL, or drop an `.mp4` into
  `public/videos/` and point to `/videos/your-file.mp4`.
- **Per-project walkthrough** — same pattern on each project's `videoUrl` field.
- **Live demo link** — each project's `demoUrl` field; renders as a "view live demo" link
  when set, a muted "add demo link" placeholder when not.

Until these are filled in, each slot shows an honest "not recorded yet" placeholder instead
of a broken link.

## Deployment

Deployed on Netlify, auto-building from the `main` branch on every push (`netlify.toml`
defines the build command and publish directory). No manual deploy step needed after the
initial setup.
