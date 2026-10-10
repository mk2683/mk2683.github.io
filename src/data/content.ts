// ---------------------------------------------------------------------------
// All site copy lives here. Edit this file to update content without
// touching components. `video` / `demo` fields are intentionally `null` —
// drop an .mp4 into /public/videos (or a hosted URL) and fill them in.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Mohit Kumar",
  role: "Senior Frontend Engineer",
  rolesCycle: [
    "Senior Frontend Engineer",
    "React Architect",
    "Performance Nerd",
    "Design-Systems Builder",
  ],
  location: "Hyderabad, India",
  email: "mohitk.2683@gmail.com",
  linkedin: "https://www.linkedin.com/in/mohit83/",
  tagline:
    "Building fast, maintainable UI at scale — from design-system primitives to the dashboards and partner tools that sit on top of them.",
  summary:
    "7+ years shaping frontend architecture across fintech, food-delivery and enterprise software — from an AngularJS → React re-platform used by thousands of restaurant partners, to the component library behind two production apps, to the beneficiary-card experience millions of Pluxee cardholders use today.",
  // Record a 60–90s self-intro and drop the file at /public/videos/intro.mp4,
  // or paste a hosted URL (YouTube/Loom/mp4) here.
  introVideo: null as string | null,
};

export const stats = [
  { value: "7+", label: "Years shipping production frontend" },
  { value: "30%", label: "Render performance lift, Pluxee cards" },
  { value: "3", label: "Companies — startup to enterprise" },
  { value: "2×", label: "Star of the Month, TCS" },
];

export type Commit = {
  hash: string;
  range: string;
  company: string;
  role: string;
  branch: string;
  summary: string;
  diff: { type: "+" | "~"; text: string }[];
  tags: string[];
};

export const commits: Commit[] = [
  {
    hash: "a3f9c21",
    range: "Jul 2024 — Present",
    company: "Zeta (Directi)",
    role: "Senior Frontend Engineer (SDE III)",
    branch: "main",
    summary: "feat(pluxee): lead frontend for beneficiary card programs",
    diff: [
      { type: "+", text: "Lead frontend development for Pluxee's beneficiary card programs, used by millions of customers." },
      { type: "+", text: "Engineer features that streamline program workflows and operational efficiency." },
      { type: "~", text: "Partner across teams to find bottlenecks and ship fixes without disrupting live programs." },
      { type: "+", text: "Lift system performance 30% through UI rendering optimization and scalable component design." },
    ],
    tags: ["React", "TypeScript", "Redux", "Performance"],
  },
  {
    hash: "7c1e4de",
    range: "Oct 2021 — Feb 2024",
    company: "Swiggy",
    role: "Software Development Engineer II",
    branch: "main",
    summary: "feat(platform): self-serve ads, portal migration, DLS",
    diff: [
      { type: "+", text: "Built and maintained applications across Swiggy's vendor and consumer platforms." },
      { type: "+", text: "Spearheaded the Self-Serve Ads platform, driving incremental revenue for restaurant partners." },
      { type: "~", text: "Migrated the Restaurant Portal from legacy AngularJS to React — maintainability + performance." },
      { type: "+", text: "Contributed to Swiggy's Design Language System (DLS) across Partner and Instamart." },
      { type: "+", text: "Implemented GraphQL-based APIs, cutting network requests and improving app performance." },
    ],
    tags: ["React", "AngularJS → React", "GraphQL", "Design Systems"],
  },
  {
    hash: "1f08b6a",
    range: "Jun 2019 — Aug 2021",
    company: "Tata Consultancy Services",
    role: "Software Development Engineer",
    branch: "main",
    summary: "feat(bancs): architect test-automation UI from scratch",
    diff: [
      { type: "+", text: "Architected and built the UI for the BaNCS Test Automation product from scratch." },
      { type: "+", text: "Designed a dynamic, data-dense dashboard for the Channels product using D3.js." },
      { type: "~", text: "Delivered cross-browser, cross-device compatibility using modern front-end practices." },
      { type: "+", text: "Recognized with the Star of the Month award twice for performance." },
    ],
    tags: ["JavaScript", "D3.js", "UI Architecture"],
  },
];

export type Project = {
  path: string;
  title: string;
  company: string;
  desc: string;
  tags: string[];
  videoDesc: string;
  demoUrl: string | null;
  videoUrl: string | null;
};

export const projects: Project[] = [
  {
    path: "zeta/pluxee-beneficiary-cards",
    title: "Pluxee Beneficiary Card Platform",
    company: "Zeta (Directi)",
    desc: "Leading the frontend for Pluxee's beneficiary card programs — the day-to-day experience millions of cardholders use. Re-architected rendering paths to cut UI overhead by 30% while shipping new workflow features for program operators.",
    tags: ["React", "TypeScript", "Redux", "Perf"],
    videoDesc:
      "A walkthrough of the beneficiary card experience, covering the rendering optimizations behind the 30% performance lift and the operator workflow redesign underneath it.",
    demoUrl: null,
    videoUrl: null,
  },
  {
    path: "swiggy/self-serve-ads",
    title: "Self-Serve Ads Platform",
    company: "Swiggy",
    desc: "Spearheaded a self-serve advertising platform letting restaurant partners configure and launch their own promoted-listing campaigns — built to drive incremental ad revenue without manual sales-side setup.",
    tags: ["React", "GraphQL", "Node.js"],
    videoDesc:
      "How restaurant partners configure and launch their own campaigns — the self-serve flow built from the ground up to put campaign control in partners' hands.",
    demoUrl: null,
    videoUrl: null,
  },
  {
    path: "swiggy/restaurant-portal-migration",
    title: "Restaurant Portal: AngularJS → React",
    company: "Swiggy",
    desc: "Re-platformed Swiggy's restaurant partner portal off a legacy AngularJS codebase onto React, improving long-term maintainability and delivering a measurable performance jump across the partner-facing surface.",
    tags: ["React", "AngularJS", "Migration"],
    videoDesc:
      "A before/after look at re-platforming the restaurant portal — the incremental migration strategy that kept features shipping throughout, and the performance gains on the other side.",
    demoUrl: null,
    videoUrl: null,
  },
  {
    path: "swiggy/design-language-system",
    title: "Swiggy Design Language System",
    company: "Swiggy",
    desc: "Contributed shared components and tokens to Swiggy's Design Language System (DLS), standardizing UI behavior and visuals across the Partner and Instamart apps.",
    tags: ["React", "Component Architecture", "Design Tokens"],
    videoDesc:
      "A tour of the shared component library behind two production apps — the tokens and primitives that keep Partner and Instamart visually and behaviorally consistent.",
    demoUrl: null,
    videoUrl: null,
  },
  {
    path: "tcs/bancs-test-automation",
    title: "BaNCS Test Automation UI",
    company: "Tata Consultancy Services",
    desc: "Architected and built the UI for the BaNCS Test Automation product from zero — the foundational structure test engineers still work inside today.",
    tags: ["JavaScript", "UI Architecture", "Cross-browser"],
    videoDesc:
      "A from-scratch look at the BaNCS Test Automation UI and the early architecture decisions that shaped how test engineers interact with it.",
    demoUrl: null,
    videoUrl: null,
  },
  {
    path: "tcs/channels-dashboard",
    title: "Channels Product Dashboard",
    company: "Tata Consultancy Services",
    desc: "Designed a dynamic, data-dense dashboard for the Channels product using D3.js, turning live channel data into something operators could actually act on.",
    tags: ["D3.js", "JavaScript", "Data Viz"],
    videoDesc:
      "A walkthrough of the dynamic Channels dashboard — built with D3.js to surface live channel data at a glance.",
    demoUrl: null,
    videoUrl: null,
  },
];

export const skills = {
  Frontend: ["React.js", "TypeScript", "JavaScript (ES6+)", "Redux", "D3.js", "HTML5", "CSS3"],
  "Backend & data": ["Node.js", "Express.js", "REST APIs", "GraphQL"],
  "Tooling & infra": ["AWS", "Jest", "Mocha", "Git", "Robo 3T", "Linux", "VS Code"],
  "Languages & fundamentals": ["JavaScript", "Java", "C++", "Data Structures", "Algorithms"],
};

export const education = [
  {
    when: "Jun 2015 – Jun 2019",
    title: "B.Tech, Information Technology",
    where: "Guru Gobind Singh Indraprastha University, Delhi",
  },
  {
    when: "Apr 2014 – Mar 2015",
    title: "Senior Secondary",
    where: "Sainik School Sujanpur Tira, Himachal Pradesh",
  },
];

export const awards = "Star of the Month — Tata Consultancy Services (awarded twice)";
