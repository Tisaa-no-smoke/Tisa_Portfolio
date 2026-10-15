// All site copy lives here. Edit this file to update the portfolio.
// TODO: replace the placeholder links below with your real ones.

import {
  siBootstrap,
  siCss,
  siFigma,
  siFlask,
  siGithub,
  siGsap,
  siHtml5,
  siJavascript,
  siLaravel,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siSqlite,
  siTailwindcss,
  siTelegram,
  siThreedotjs,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

export const profile = {
  name: "Sao Kuntisa",
  short: "Tisa",
  role: "Full Stack Developer",
  subtitle: "Software Development Student",
  city: "Phnom Penh",
  location: "Phnom Penh, Cambodia",
  intro: "A developer who loves turning ideas into reality.",
  email: "kuntisa77@gmail.com",
  phone: "(+855) 78 640 648",
  phoneHref: "tel:+85578640648",
};

export const socials: { label: string; href: string; logo: SimpleIcon }[] = [
  { label: "Telegram", href: "https://t.me/kuntisa12", logo: siTelegram },
  { label: "GitHub", href: "https://github.com/Tisaa-no-smoke", logo: siGithub },
];

export type Accent = "yellow" | "pink" | "blue" | "mint";

export type Project = {
  title: string;
  tag: string;
  accent: Accent;
  tilt: string;
  year: string;
  award?: string;
  summary: string;
  points: string[];
  stack: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    title: "Diabetes Expert System",
    tag: "Award winner",
    accent: "blue",
    tilt: "-1.5deg",
    year: "2026",
    award: "1st Place · AI Expert System & Innovation 2026, Norton University",
    summary:
      "A bilingual diabetes decision-support system. It analyzes symptoms and lab results, then gives explainable assessments and personalized care guidance.",
    points: [
      "Patient and clinician workflows for assessments and clinical review",
      "Secure record management with role-based access",
      "Explainable results: every assessment shows how it was reached",
      "Personalized care guidance for each user",
    ],
    stack: ["React", "Flask", "SQLite", "PostgreSQL"],
    links: [
      { label: "Case study", href: "#" }, // TODO
      { label: "Code", href: "https://github.com/" }, // TODO
    ],
  },
  {
    title: "Tisa POS Commerce",
    tag: "Web app",
    accent: "pink",
    tilt: "2deg",
    year: "2026",
    summary:
      "A coffee shop POS and online store that share one database: cashiers ring up sales, customers order online, admins see it all.",
    points: [
      "Fast POS register with product search and checkout",
      "Storefront with cart and online orders",
      "Inventory, suppliers and sales reports for admins",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind"],
    links: [
      { label: "Case study", href: "#" }, // TODO
      { label: "Code", href: "https://github.com/" }, // TODO
    ],
  },
  {
    title: "MLBB Team Tracker",
    tag: "Esports",
    accent: "mint",
    tilt: "-2deg",
    year: "2026",
    summary:
      "Stats for a Mobile Legends team. Players submit match results with screenshots; the coach approves them before they count.",
    points: [
      "Roster, invite codes and scrim scheduling",
      "Coach approval flow for every result",
      "Hero and player performance dashboards",
    ],
    stack: ["Next.js", "Supabase", "SQLite", "shadcn/ui"],
    links: [
      { label: "Case study", href: "#" }, // TODO
      { label: "Code", href: "https://github.com/" }, // TODO
    ],
  },
];

// Skills render as toy bricks. `logo` is a Simple Icons slug-object; skills without one get a line icon.
export type Skill = { name: string; logo?: SimpleIcon };
export type SkillGroup = {
  group: string;
  km: string;
  icon: "frontend" | "frameworks" | "backend" | "data";
  color: Accent | "surface";
  items: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    group: "Frontend",
    km: "ផ្នែកមុខ",
    icon: "frontend",
    color: "yellow",
    items: [
      { name: "HTML", logo: siHtml5 },
      { name: "CSS", logo: siCss },
      { name: "JavaScript", logo: siJavascript },
      { name: "TypeScript", logo: siTypescript },
      { name: "Tailwind CSS", logo: siTailwindcss },
      { name: "Bootstrap", logo: siBootstrap },
    ],
  },
  {
    group: "Frameworks",
    km: "ក្របខ័ណ្ឌ",
    icon: "frameworks",
    color: "pink",
    items: [
      { name: "React", logo: siReact },
      { name: "Next.js", logo: siNextdotjs },
      { name: "Laravel", logo: siLaravel },
      { name: "Flask", logo: siFlask },
    ],
  },
  {
    group: "Backend",
    km: "ផ្នែកក្រោយ",
    icon: "backend",
    color: "blue",
    items: [
      { name: "Node.js", logo: siNodedotjs },
      { name: "PHP", logo: siPhp },
      { name: "Python", logo: siPython },
      { name: "Java", logo: siOpenjdk },
    ],
  },
  {
    group: "Data & tools",
    km: "ទិន្នន័យ និងឧបករណ៍",
    icon: "data",
    color: "surface",
    items: [
      { name: "MySQL", logo: siMysql },
      { name: "PostgreSQL", logo: siPostgresql },
      { name: "SQLite", logo: siSqlite },
      { name: "pgAdmin" },
      { name: "Figma", logo: siFigma },
      { name: "GitHub", logo: siGithub },
    ],
  },
];

export const learning: Skill[] = [
  { name: "Three.js", logo: siThreedotjs },
  { name: "React Three Fiber" },
  { name: "GSAP", logo: siGsap },
];

export const softSkills = [
  "Critical thinking",
  "Problem solving",
  "Teamwork",
  "Communication",
  "Adaptability",
  "Willingness to learn",
];

export const languages = ["Khmer", "English"];

export const achievements = [
  {
    title: "1st Place",
    event: "AI Expert System & Innovation 2026",
    org: "Norton University",
    detail: "Awarded for the Diabetes Expert System.",
  },
];

export const education = [
  {
    school: "Norton University",
    course: "Software Development",
    when: "Year 3 · Current",
    accent: "blue" as Accent,
    logo: { src: "/logos/norton-university.png" },
  },
  {
    school: "Australian Centre for Education (ACE)",
    course: "General English Program, GEP 12",
    when: "2023",
    accent: "pink" as Accent,
    logo: { src: "/logos/ace.png" },
  },
];

// Scrolling strip under the hero. `km: true` renders the item in the Khmer font.
export const ticker: { text: string; km?: boolean }[] = [
  { text: "Always learning" },
  { text: "Always building" },
  { text: "Always improving" },
];
