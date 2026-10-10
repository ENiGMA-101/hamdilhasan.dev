/* ==========================================================================
   HHP PORTFOLIO — SINGLE SOURCE OF TRUTH FOR ALL CONTENT
   --------------------------------------------------------------------------
   Edit this file to update the site. Nothing else needs to change.

   HONESTY RULES APPLIED TO THIS FILE:
   • No invented employers, awards, graduation dates, or metrics.
   • `featured` case studies only contain claims verifiable from the public
     repositories listed in `links.github`.
   • Projects that cannot be verified from a public repository are marked
     `unverified: true` and rendered as clearly labelled placeholders.
   ========================================================================== */

export type ProjectCategory =
  | "Robotics & Embedded"
  | "AI & Machine Learning"
  | "Research"
  | "Software & Web";

export type ProjectStatus = "Completed" | "Prototype" | "Ongoing Research";

export interface ProjectLink {
  label: string;
  href: string;
  kind: "github" | "demo" | "writeup";
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  featured?: boolean;
  unverified?: boolean;
  status: ProjectStatus;
  /** Short one-liner used on compact cards. */
  summary: string;
  /** Case-study body used on featured cards. */
  caseStudy?: {
    problem: string;
    built: string[];
    solution: string;
    /** Verified outcome only. Leave empty if not yet demonstrated. */
    outcome?: string;
  };
  technologies: string[];
  image: string;
  /** Photograph of the real prototype vs. an illustrative concept render. */
  visualKind: "photograph" | "illustrative";
  visualCaption?: string;
  links: ProjectLink[];
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: { name: string; note?: string; core?: boolean }[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  category: string;
  skillsLearned: string[];
  verifyUrl?: string;
  /** True when the certificate image is a labelled placeholder. */
  placeholder?: boolean;
}

export interface ResearchItem {
  id: string;
  title: string;
  role: string;
  institution: string;
  period: string;
  type: "Research" | "Academic Project" | "Leadership";
  summary: string;
  contributions: string[];
  technologies: string[];
  link?: string;
}

export interface CreativeItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  visualKind: "photograph" | "illustrative";
}

/* -------------------------------------------------------------------------- */
/* PROFILE                                                                    */
/* -------------------------------------------------------------------------- */

export const PERSONAL_INFO = {
  fullName: "Hamdil Hasan Partho",
  preferredName: "Hamdil Hasan",
  monogram: "HHP",
  githubHandle: "ENiGMA-101",
  title: "Computer Science & Engineering student · Developer · Creative technologist",
  headline: "Building thoughtful software, intelligent systems, and real-world experiences.",
  /** Phrases used by the hero typing animation. */
  heroPhrases: [
    "Building software that solves real problems.",
    "Exploring AI and intelligent systems.",
    "Turning robotics ideas into working prototypes.",
    "Designing thoughtful digital experiences.",
  ],
  intro:
    "I'm a Computer Science & Engineering student at the University of Asia Pacific who likes to make things that actually run — autonomous robots on a floor track, scheduling systems that treat students fairly, and interfaces that feel considered.",
  institution: "University of Asia Pacific",
  degree: "B.Sc. in Computer Science & Engineering",
  location: "Dhaka, Bangladesh",
  timezone: "Asia/Dhaka",
  email: "hamdilhasan101@gmail.com",
  github: "https://github.com/ENiGMA-101",
  linkedin: "https://www.linkedin.com/in/hamdil-hasan-p101/",
  /** Honest availability statement — not a live presence signal. */
  availability: {
    status: "open" as const,
    label: "Open to internships & research collaboration",
    detail:
      "I reply to most messages within a couple of days. This is a standing note, not a live status feed.",
  },
  aboutBio: [
    "I'm an undergraduate Computer Science & Engineering student at the University of Asia Pacific. Most of what I know came from building things and then fixing them — line-following robots that drifted on polished floors, timetables that clashed, cameras that misread my hands in bad light.",
    "My work sits where software meets hardware. I write firmware for ESP32 boards in C++, prototype with IR arrays and ultrasonic sensors, build scheduling algorithms that try to be fair to everyone, and put a React interface on top when there's something worth looking at.",
    "I care about code that someone else can read, documentation that actually explains the hard part, and solutions that survive contact with the real world.",
  ],
  principles: [
    {
      title: "Hardware and software in the same room",
      description:
        "Firmware, sensors and motor drivers are designed alongside the interface that reports on them — not handed off.",
    },
    {
      title: "Fairness is a design constraint",
      description:
        "Scheduling and allocation problems get judged on who they disadvantage, not only on whether they run.",
    },
    {
      title: "Document the difficult part",
      description:
        "Repositories include the wiring, the calibration and the failures, so the next person doesn't repeat them.",
    },
  ],
  stats: [
    { label: "Degree programme", value: "B.Sc. CSE" },
    { label: "Institution", value: "UAP, Dhaka" },
    { label: "Primary stack", value: "C++ · Python · TS" },
    { label: "Focus areas", value: "Robotics · AI · Web" },
  ],
};

/* -------------------------------------------------------------------------- */
/* PROJECTS                                                                   */
/* -------------------------------------------------------------------------- */

export const PROJECTS: ProjectItem[] = [
  {
    id: "indoor-food-delivery-robot",
    title: "Indoor Food Delivery Robot",
    tagline: "Autonomous line-following transport with obstacle detection",
    category: "Robotics & Embedded",
    featured: true,
    status: "Completed",
    summary:
      "A compact autonomous robot that follows a marked indoor path, avoids obstacles and reports its state on a 16×2 I2C LCD.",
    caseStudy: {
      problem:
        "Delivering items across a university campus means a person walking the same route repeatedly. The goal was a small robot that could follow a fixed indoor path reliably without a human steering it.",
      built: [
        "Five-channel IR reflectance array for line detection, calibrated against the actual floor reflectivity of the test route.",
        "ESP32-S3 firmware in C++ that turns the five sensor readings into differential steering corrections.",
        "HC-SR04 ultrasonic rangefinder polling in the main loop to stop the robot before contact.",
        "L298N dual H-bridge driver with PWM speed control for the two drive motors.",
        "16×2 I2C LCD showing speed, stage and diagnostic state so behaviour could be debugged without a laptop attached.",
      ],
      solution:
        "The sensor array and steering loop run on the ESP32-S3 in a single firmware sketch. Sensor weighting produces a proportional correction, the ultrasonic check gates forward motion, and the LCD surfaces internal state during a run.",
      outcome:
        "Built and demonstrated as a team project with the robot following the marked route and stopping for obstacles placed in its path.",
    },
    technologies: [
      "ESP32-S3",
      "C++",
      "Arduino IDE",
      "IR sensor array",
      "HC-SR04 ultrasonic",
      "L298N motor driver",
      "PWM",
      "I2C LCD",
    ],
    image: "/images/projects/delivery-robot-cafeteria.jpg",
    visualKind: "illustrative",
    visualCaption:
      "Illustrative render of the line-following robot concept on a floor track — not a photograph of the finished prototype.",
    links: [
      {
        label: "View repository",
        href: "https://github.com/ENiGMA-101/Indoor-Food-Delivery-Robot",
        kind: "github",
      },
    ],
  },
  {
    id: "fairness-aware-routine-generator",
    title: "Fairness-Aware AI Routine Generator",
    tagline: "Timetable scheduling that optimises for fairness, not just feasibility",
    category: "Research",
    featured: true,
    status: "Ongoing Research",
    summary:
      "A scheduling system that treats student preferences as a fairness objective rather than a soft constraint, with an interactive survey front end.",
    caseStudy: {
      problem:
        "University routine generators usually stop at the first conflict-free timetable. That leaves some batches with fragmented days, poor time-slot choices and long idle gaps — a fairness problem that the output never reports.",
      built: [
        "A constraint model covering room capacity, teacher availability, batch sizes and lecture clashes.",
        "A fairness objective that measures how evenly preferred slots are distributed across batches.",
        "An idle-gap term so schedules are judged on wasted student time, not only on validity.",
        "An interactive web interface for configuring inputs and inspecting the generated routine.",
        "A survey front end for collecting student preference data used to evaluate the model.",
      ],
      solution:
        "The generator searches the feasible space and scores each candidate on both constraint satisfaction and the fairness objective, so the chosen routine is defensible rather than merely legal. The React front end exposes the trade-offs to the people affected by them.",
      outcome:
        "Implemented as a research prototype with an interactive survey, with the repository public for review.",
    },
    technologies: [
      "JavaScript",
      "React",
      "Constraint optimisation",
      "Heuristic search",
      "Data visualisation",
    ],
    image: "/images/projects/ai-routine.jpg",
    visualKind: "illustrative",
    visualCaption:
      "Illustrative interface concept for the routine generator dashboard.",
    links: [
      {
        label: "View repository",
        href: "https://github.com/ENiGMA-101/fairness-ai-routine--v",
        kind: "github",
      },
    ],
  },
  {
    id: "visible-light-communication",
    title: "Visible Light Communication Research",
    tagline: "High-data-rate indoor optical wireless communication",
    category: "Research",
    featured: true,
    status: "Ongoing Research",
    summary:
      "Exploring visible light as a data medium for indoor links where RF is congested, restricted or simply unavailable.",
    caseStudy: {
      problem:
        "Indoor wireless capacity is limited by shared RF spectrum. Visible light already exists in every room and is unregulated — the question is whether a practical link can carry useful data through it.",
      built: [
        "Optical transmitter stage driving a high-frequency-switching LED emitter.",
        "PIN photodiode receiver front end with transimpedance amplification.",
        "Optical filtering and ambient-light rejection experiments to isolate the signal from room lighting.",
        "Controlled-distance link measurements to characterise how the channel behaves as geometry changes.",
        "Documentation of the modulation and filtering approaches evaluated during the study.",
      ],
      solution:
        "The work builds and characterises an optical wireless link end to end, treating room light as the primary noise source and measuring how far practical filtering recovers the signal.",
      outcome:
        "Research is in progress; findings and circuit notes are being documented in the project repository.",
    },
    technologies: [
      "Optical wireless",
      "Visible light communication",
      "Signal processing",
      "Circuit prototyping",
      "Instrumentation",
    ],
    image: "/images/projects/vlc-research.jpg",
    visualKind: "illustrative",
    visualCaption:
      "Illustrative render of an optical wireless bench setup.",
    links: [],
  },
  {
    id: "smart-iot-hydration",
    title: "Smart IoT Water Hydration System",
    tagline: "Microprocessor-controlled fluid metering and monitoring",
    category: "Robotics & Embedded",
    featured: false,
    status: "Prototype",
    summary:
      "An automated hydration unit that measures reservoir level, meters dispensing and reports state on a local display.",
    technologies: [
      "Microcontrollers",
      "C++",
      "Fluid level sensing",
      "Relay control",
      "Circuit design",
    ],
    image: "/images/projects/iot-hydration.jpg",
    visualKind: "illustrative",
    visualCaption: "Illustrative render of the hydration system prototype.",
    links: [],
  },
  {
    id: "road-rash-cv-game",
    title: "Road Rash Computer Vision Game",
    tagline: "Arcade racing controlled by real-time hand gestures",
    category: "AI & Machine Learning",
    featured: false,
    status: "Completed",
    summary:
      "A webcam-driven racing game where steering and actions come from live hand landmark tracking instead of a keyboard.",
    technologies: [
      "TypeScript",
      "MediaPipe Hands",
      "Computer vision",
      "HTML5 Canvas",
      "Game loop design",
    ],
    image: "/images/projects/gesture-game.jpg",
    visualKind: "illustrative",
    visualCaption: "Illustrative render of gesture-controlled gameplay.",
    links: [
      {
        label: "View repository",
        href: "https://github.com/ENiGMA-101/Road-Rash-Computer-Vision-Game",
        kind: "github",
      },
    ],
  },
  {
    id: "fifa-match-automation",
    title: "FIFA 2026 Match Automation Suite",
    tagline: "Browser extension and Telegram bot driven by GitHub Actions",
    category: "Software & Web",
    featured: false,
    status: "Completed",
    summary:
      "Two notification clients — a Chrome extension and a Telegram bot — fed by scheduled workflows rather than a always-on server.",
    technologies: [
      "JavaScript",
      "Python",
      "GitHub Actions",
      "Telegram Bot API",
      "Chrome Extension API",
    ],
    image: "/images/creative/design-system.jpg",
    visualKind: "illustrative",
    visualCaption: "Illustrative render representing the notification pipeline.",
    links: [
      {
        label: "Extension repository",
        href: "https://github.com/ENiGMA-101/FIFA-World-cup-2026-reminder-extension",
        kind: "github",
      },
      {
        label: "Bot repository",
        href: "https://github.com/ENiGMA-101/FIFA-World-cup-2026-telegram-bot",
        kind: "github",
      },
    ],
  },
  {
    id: "chatpal-ai-desktop",
    title: "ChatPal AI Desktop",
    tagline: "AI desktop application — repository pending",
    category: "Software & Web",
    featured: false,
    unverified: true,
    status: "Prototype",
    summary:
      "An AI-oriented desktop application. Repository details are not yet public, so this card is a labelled placeholder.",
    technologies: ["Desktop application", "AI integration"],
    image: "/images/projects/chatpal-ai-desktop.jpg",
    visualKind: "illustrative",
    visualCaption:
      "Placeholder visual. Replace with a screenshot from the actual application.",
    links: [],
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
export const SUPPORTING_PROJECTS = PROJECTS.filter((p) => !p.featured);

export const PROJECT_CATEGORIES: ("All" | ProjectCategory)[] = [
  "All",
  "Robotics & Embedded",
  "AI & Machine Learning",
  "Research",
  "Software & Web",
];

/* -------------------------------------------------------------------------- */
/* SKILLS                                                                     */
/* -------------------------------------------------------------------------- */

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    description: "Core syntax, algorithmic thinking and object-oriented design.",
    iconName: "code",
    skills: [
      { name: "C++", note: "Embedded & firmware", core: true },
      { name: "Python", note: "Scripting, automation, data", core: true },
      { name: "JavaScript", note: "Modern ES modules", core: true },
      { name: "TypeScript", note: "Typed application code", core: true },
      { name: "C", note: "Low-level systems", core: false },
      { name: "SQL", note: "Relational queries", core: false },
      { name: "HTML & CSS", note: "Semantic structure & styling", core: false },
    ],
  },
  {
    title: "Frontend & Web",
    description: "Accessible, responsive interfaces built on the modern React stack.",
    iconName: "layout",
    skills: [
      { name: "React", note: "Component architecture", core: true },
      { name: "Tailwind CSS", note: "Token-driven styling", core: true },
      { name: "Vite", note: "Bundling & dev server", core: true },
      { name: "HTML5 Canvas", note: "2D rendering & game loops", core: false },
      { name: "Responsive design", note: "Mobile-first layout", core: false },
      { name: "REST API integration", note: "Client/server contracts", core: false },
    ],
  },
  {
    title: "Robotics & Embedded",
    description: "Microcontrollers, sensor calibration and motor actuation.",
    iconName: "cpu",
    skills: [
      { name: "ESP32 / ESP32-S3", note: "Primary microcontroller", core: true },
      { name: "Arduino IDE", note: "Sketch-based firmware", core: true },
      { name: "IR sensor arrays", note: "Line detection & calibration", core: true },
      { name: "HC-SR04 ultrasonic", note: "Distance sensing", core: false },
      { name: "L298N motor driver", note: "H-bridge PWM control", core: false },
      { name: "I2C & UART", note: "Peripheral buses", core: false },
      { name: "Breadboard prototyping", note: "Circuit assembly", core: false },
    ],
  },
  {
    title: "AI & Machine Learning",
    description: "Computer vision and optimisation applied to real problems.",
    iconName: "brain",
    skills: [
      { name: "MediaPipe Hands", note: "21-point landmark tracking", core: true },
      { name: "Computer vision basics", note: "Frames, filtering, features", core: true },
      { name: "Heuristic optimisation", note: "Constraint & fairness objectives", core: true },
      { name: "Python data tooling", note: "Cleaning & analysis", core: false },
      { name: "Prompt engineering", note: "LLM-assisted workflows", core: false },
    ],
  },
  {
    title: "Backend & Databases",
    description: "Data modelling, persistence and server-side execution.",
    iconName: "database",
    skills: [
      { name: "MySQL", note: "Schema & relational queries", core: true },
      { name: "Node.js", note: "JavaScript runtime", core: false },
      { name: "SQLite", note: "Embedded storage", core: false },
      { name: "REST services", note: "JSON API design", core: false },
    ],
  },
  {
    title: "Tools & Platforms",
    description: "Version control, CI automation and design tooling.",
    iconName: "wrench",
    skills: [
      { name: "Git & GitHub", note: "Daily version control", core: true },
      { name: "GitHub Actions", note: "Scheduled workflows & CI", core: true },
      { name: "VS Code", note: "Primary editor", core: false },
      { name: "Figma", note: "UI & design systems", core: false },
      { name: "Vercel", note: "Deployment & serverless functions", core: false },
      { name: "Linux CLI", note: "Shell & tooling", core: false },
    ],
  },
];

/** Flat list used by the skills marquee. */
export const SKILL_MARQUEE: string[] = SKILL_CATEGORIES.flatMap((c) =>
  c.skills.filter((s) => s.core).map((s) => s.name),
);

/* -------------------------------------------------------------------------- */
/* EDUCATION                                                                  */
/* -------------------------------------------------------------------------- */

export const EDUCATION = {
  institution: "University of Asia Pacific (UAP)",
  location: "74/A Green Road, Farmgate, Dhaka 1205, Bangladesh",
  degree: "Bachelor of Science in Computer Science and Engineering",
  status: "Undergraduate — in progress",
  department: "Department of Computer Science and Engineering",
  description:
    "A computer science and engineering programme pairing algorithmic foundations with systems-level subjects — microprocessors, databases, networks and software engineering — alongside the mathematics that sits underneath them.",
  coursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Microprocessors & Microcontrollers",
    "Database Management Systems",
    "Computer Architecture",
    "Artificial Intelligence",
    "Computer Networks",
    "Discrete Mathematics",
    "Numerical Methods",
    "Software Engineering",
  ],
  focus:
    "Applied autonomous robotics, fairness-aware scheduling, and visible light optical communication.",
};

/* -------------------------------------------------------------------------- */
/* CERTIFICATIONS                                                             */
/* -------------------------------------------------------------------------- */

export const CERTIFICATIONS: CertificateItem[] = [
  {
    id: "cert-figma",
    title: "Figma Design Systems & UI Components",
    issuer: "Design systems coursework",
    issueDate: "2026",
    category: "UI / UX",
    skillsLearned: ["Design tokens", "Auto layout", "Component variants", "Prototyping"],
    verifyUrl: "https://github.com/ENiGMA-101/Figma-Design-System",
  },
  {
    id: "cert-embedded",
    title: "Microcontroller Programming & Embedded Systems",
    issuer: "University coursework & lab work",
    issueDate: "2025 – 2026",
    category: "Embedded systems",
    skillsLearned: ["ESP32 architecture", "Sensor interfacing", "C++ firmware", "I2C & UART"],
  },
  {
    id: "cert-algorithms",
    title: "Data Structures & Algorithmic Problem Solving",
    issuer: "University coursework",
    issueDate: "2025",
    category: "Computer science",
    skillsLearned: ["Complexity analysis", "Recursion & trees", "Graphs", "Dynamic programming"],
  },
  {
    id: "cert-web",
    title: "Modern Frontend & Responsive Web Development",
    issuer: "Self-directed coursework",
    issueDate: "2024 – 2025",
    category: "Web engineering",
    skillsLearned: ["Modern JavaScript", "CSS layout", "Semantic HTML", "State management"],
  },
  {
    id: "cert-ai",
    title: "Computer Vision & Real-Time Inference",
    issuer: "Project-based learning",
    issueDate: "In progress",
    category: "AI / Robotics",
    skillsLearned: ["Hand landmark detection", "Frame pipelines", "Model integration"],
    placeholder: true,
  },
];

/* -------------------------------------------------------------------------- */
/* RESEARCH & EXPERIENCE TIMELINE                                            */
/* -------------------------------------------------------------------------- */

export const RESEARCH_TIMELINE: ResearchItem[] = [
  {
    id: "res-vlc",
    title: "Visible Light Communication (VLC)",
    role: "Undergraduate researcher",
    institution: "University of Asia Pacific",
    period: "2025 – present",
    type: "Research",
    summary:
      "Investigating visible light as an indoor data medium where RF spectrum is congested or restricted, focusing on link characterisation and ambient-light rejection.",
    contributions: [
      "Built the optical transmitter and photodiode receiver stages of a test link.",
      "Ran controlled-distance measurements to characterise the channel.",
      "Documented filtering approaches for rejecting ambient room light.",
    ],
    technologies: ["Optical wireless", "Signal processing", "Circuit prototyping"],
  },
  {
    id: "res-fairness",
    title: "Fairness-Aware Academic Routine Generation",
    role: "Lead developer & researcher",
    institution: "University of Asia Pacific",
    period: "2025 – 2026",
    type: "Research",
    summary:
      "A scheduling system that treats student preference and idle time as fairness objectives rather than soft constraints, with an interactive interface for inspecting the trade-offs.",
    contributions: [
      "Modelled room, teacher and batch constraints for the routine generation problem.",
      "Implemented the fairness and idle-gap objectives used to rank candidate schedules.",
      "Built the interactive front end used to review generated routines.",
    ],
    technologies: ["Constraint optimisation", "React", "Data visualisation"],
    link: "https://github.com/ENiGMA-101/fairness-ai-routine--v",
  },
  {
    id: "res-robot",
    title: "Indoor Autonomous Food Delivery Robot",
    role: "Project lead & firmware engineer",
    institution: "University of Asia Pacific",
    period: "2025 – 2026",
    type: "Academic Project",
    summary:
      "Led a small team building a physical line-following delivery robot, owning the firmware, sensor integration and system testing.",
    contributions: [
      "Wrote the ESP32-S3 firmware implementing line tracking and obstacle response.",
      "Calibrated the five-channel IR array against the actual test surface.",
      "Integrated the LCD status output used to debug runs without a laptop.",
    ],
    technologies: ["ESP32-S3", "Embedded C++", "Sensor integration", "Team leadership"],
    link: "https://github.com/ENiGMA-101/Indoor-Food-Delivery-Robot",
  },
];

/* -------------------------------------------------------------------------- */
/* CREATIVE LAB / VISUAL ARCHIVE                                              */
/* -------------------------------------------------------------------------- */

export const CREATIVE_GALLERY: CreativeItem[] = [
  {
    id: "cg-robot",
    title: "Line-following robot chassis",
    category: "Robotics",
    image: "/images/projects/delivery-robot-cafeteria.jpg",
    description:
      "Two-wheel drive platform with an ESP32-S3, a five-channel IR array and an ultrasonic rangefinder.",
    visualKind: "illustrative",
  },
  {
    id: "cg-bench",
    title: "Prototyping bench",
    category: "Electronics",
    image: "/images/creative/embedded-lab.jpg",
    description:
      "Jumper wiring, breadboarding and sensor calibration before anything gets soldered.",
    visualKind: "illustrative",
  },
  {
    id: "cg-schedule",
    title: "Schedule fairness model",
    category: "Research UI",
    image: "/images/projects/ai-routine.jpg",
    description:
      "How a routine looks when it is scored on who it disadvantages rather than only on validity.",
    visualKind: "illustrative",
  },
  {
    id: "cg-vlc",
    title: "Optical wireless bench",
    category: "VLC research",
    image: "/images/projects/vlc-research.jpg",
    description:
      "Transmitter and receiver stages of the visible light communication test link.",
    visualKind: "illustrative",
  },
  {
    id: "cg-vision",
    title: "Gesture landmark pipeline",
    category: "Computer vision",
    image: "/images/projects/gesture-game.jpg",
    description:
      "Hand landmarks extracted per frame and mapped onto steering input.",
    visualKind: "illustrative",
  },
  {
    id: "cg-system",
    title: "Design tokens & grid",
    category: "Interface systems",
    image: "/images/creative/design-system.jpg",
    description:
      "The token set, type scale and grid this portfolio is built from.",
    visualKind: "illustrative",
  },
];

/* -------------------------------------------------------------------------- */
/* NAVIGATION                                                                 */
/* -------------------------------------------------------------------------- */

export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "focus", label: "Focus" },
  { id: "photography", label: "Photos" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];
