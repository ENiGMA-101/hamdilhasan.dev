export const PROFILE = {
  name: "Hamdil Hasan",
  handle: "ENiGMA-101",
  role: "Developer & Builder",
  tagline: "I build ideas into reality.",
  university: "University of Asia Pacific (UAP)",
  degree: "BSc in Computer Science & Engineering",
  location: "Dhaka, Bangladesh",
  email: "hamdilhasan101@gmail.com",
  github: "https://github.com/ENiGMA-101",
  linkedin: "https://www.linkedin.com/in/hamdil-hasan-p101/",
  repo: "https://github.com/ENiGMA-101/hamdilhasan.dev",
};

export const PORTRAIT = "/images/dp.jpg";

const IMG = (f: string) => `/images/${f}`;

export type Project = {
  index: string;
  title: string;
  year: string;
  kind: string;
  description: string;
  tech: string[];
  link: string;
  linkLabel: string;
  featured: boolean;
};

export const PROJECTS: Project[] = [
  {
    index: "01",
    title: "Fairness-Aware AI Timetable",
    year: "2025",
    kind: "AI · Optimization",
    description:
      "A university timetable engine built around a hard question: how do you schedule fairly? Constraint balancing, room conflicts and lecturer workload handled as one optimization problem.",
    tech: ["Python", "AI", "Optimization"],
    link: "https://github.com/ENiGMA-101/Food-Delivery-Robot",
    linkLabel: "View on GitHub",
    featured: true,
  },
  {
    index: "02",
    title: "Autonomous Delivery Robot",
    year: "2025",
    kind: "Robotics · Embedded",
    description:
      "A prototype delivery robot that senses, decides and moves — sensor input fused into an Arduino-based control loop driving L298N motors. Hardware meets software in the messiest, best way.",
    tech: ["Arduino", "C++", "L298N", "Sensors"],
    link: PROFILE.github,
    linkLabel: "View on GitHub",
    featured: true,
  },
  {
    index: "03",
    title: "hamdilhasan.dev — v1",
    year: "2025",
    kind: "Full-stack Web",
    description:
      "The first home of this portfolio: a Flask + SQLite site with a password-protected admin dashboard, blog engine and zero external database. Shipped, learned from, and now evolved.",
    tech: ["Python", "Flask", "SQLite", "HTML/CSS/JS"],
    link: PROFILE.repo,
    linkLabel: "Source code",
    featured: false,
  },
  {
    index: "04",
    title: "hamdilhasan.dev — v2",
    year: "2026",
    kind: "Frontend · Static",
    description:
      "The site you are looking at. Rebuilt as a fast static experience in React & Tailwind, deployed free on Vercel's edge network — same story, sharper tools.",
    tech: ["React", "TypeScript", "Tailwind", "Vercel"],
    link: PROFILE.github,
    linkLabel: "You are here ↗",
    featured: false,
  },
];

export const FOCUS = [
  {
    n: "01",
    title: "Build useful software",
    body: "Web apps, tools and systems that solve real problems — from timetable engines to the site serving this sentence.",
  },
  {
    n: "02",
    title: "Explore intelligent systems",
    body: "AI, optimization, IoT and robotics — learned hands-on, one prototype and one burnt LED at a time.",
  },
  {
    n: "03",
    title: "Keep creating",
    body: "Writing, photography and small experiments that keep the curiosity honest and the learning compounding.",
  },
];

export const TOOLBOX: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "C++", "TypeScript", "SQL", "JavaScript"] },
  { group: "Web", items: ["React", "Flask", "Tailwind CSS", "SQLite", "REST"] },
  { group: "AI · Robotics", items: ["AI / ML concepts", "Optimization", "Arduino", "Sensors & Motors", "IoT"] },
  { group: "Creative", items: ["Photography", "Visual storytelling", "Technical writing"] },
];

export type Photo = {
  src: string;
  alt: string;
  caption: string;
  meta: string;
  tall?: boolean;
};

export const PHOTOS: Photo[] = [
  {
    src: IMG("IMG_20240730_154201.jpg"),
    alt: "Railway landscape photographed by Hamdil",
    caption: "Tracks leading somewhere",
    meta: "RAILWAY · 2024",
  },
  {
    src: IMG("IMG_7474.jpg"),
    alt: "Night scene photographed by Hamdil",
    caption: "After the light left",
    meta: "NIGHT · 2024",
    tall: true,
  },
  {
    src: IMG("PXL_20251002_115043946.jpg"),
    alt: "Everyday moment photographed by Hamdil",
    caption: "An ordinary Tuesday",
    meta: "STREET · 2025",
  },
  {
    src: IMG("IMG_20260408_133718.jpg.jpeg"),
    alt: "Portrait photographed by Hamdil",
    caption: "Portrait study",
    meta: "PEOPLE · 2026",
  },
  {
    src: IMG("IMG_20240815_112311.jpg"),
    alt: "Photography by Hamdil",
    caption: "A quiet frame",
    meta: "EVERYDAY · 2024",
  },
];

export type Note = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  read: string;
};

export const NOTES: Note[] = [
  {
    category: "Personal",
    date: "First entry",
    title: "Hello, World — My Personal Space",
    excerpt:
      "Welcome to my corner of the internet. I'm a CSE undergraduate who enjoys building software, learning new technologies, and documenting ideas through writing and photography.",
    read: "2 min",
  },
  {
    category: "AI",
    date: "Field notes",
    title: "Fairness is a constraint, not a feature",
    excerpt:
      "What building the AI timetable taught me: the hard part was never the algorithm — it was deciding what 'fair' even means for lecturers, rooms and time slots.",
    read: "4 min",
  },
  {
    category: "Robotics",
    date: "Workbench log",
    title: "Motors, sensors & first smoke-free runs",
    excerpt:
      "Notes from the delivery robot bench: wiring the L298N, debouncing sensor noise, and the strange joy of a chassis that finally drives straight.",
    read: "3 min",
  },
  {
    category: "Web",
    date: "2026",
    title: "Flask to Vercel: rebuilding my home online",
    excerpt:
      "My Flask site needed a Python host; free tiers moved on. So v2 became static — React, Tailwind, and a free Vercel deployment that loads in a blink.",
    read: "3 min",
  },
];

export const TICKER = [
  "BASED IN BANGLADESH",
  "CSE UNDERGRADUATE @ UAP",
  "SOFTWARE",
  "ARTIFICIAL INTELLIGENCE",
  "ROBOTICS",
  "PHOTOGRAPHY",
  "OPEN TO COLLABORATE",
];

export const NAV_ITEMS = [
  { id: "about", n: "01", label: "About" },
  { id: "work", n: "02", label: "Work" },
  { id: "focus", n: "03", label: "Focus" },
  { id: "photography", n: "04", label: "Photos" },
  { id: "writing", n: "05", label: "Writing" },
  { id: "contact", n: "06", label: "Contact" },
];
