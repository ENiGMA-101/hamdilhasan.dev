export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: 'Robotics & IoT' | 'AI & ML' | 'Software & Web' | 'Research';
  description: string;
  detailedSpecs?: string[];
  technologies: string[];
  image: string;
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  status: 'Completed' | 'Active Research' | 'In Development';
  stats?: { label: string; value: string }[];
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    icon?: string;
    highlight?: boolean;
    level?: string;
  }[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verifyUrl?: string;
  image?: string;
  category: string;
  skillsLearned: string[];
}

export interface ResearchItem {
  id: string;
  title: string;
  role: string;
  institution: string;
  period: string;
  type: 'Research' | 'Academic Project' | 'Leadership';
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
  aspectRatio?: string;
  description: string;
}

export const PERSONAL_INFO = {
  fullName: 'Hamdil Hasan Partho',
  preferredName: 'Hamdil Hasan',
  monogram: 'HHP',
  title: 'Computer Science & Engineering Student | Developer & Creative Technologist',
  tagline: 'Building thoughtful software, intelligent systems, and real-world experiences.',
  heroKeywords: [
    'Software Engineering',
    'Robotics & Embedded Systems',
    'Artificial Intelligence',
    'Computer Vision & MediaPipe',
    'Creative Technology'
  ],
  institution: 'University of Asia Pacific (UAP)',
  degree: 'B.Sc. in Computer Science & Engineering',
  location: 'Dhaka, Bangladesh',
  timezone: 'Asia/Dhaka (UTC+06:00)',
  email: 'hamdilhasan101@gmail.com',
  github: 'https://github.com/ENiGMA-101',
  linkedin: 'https://www.linkedin.com/in/hamdil-hasan-p101/',
  aboutBio: [
    "I am an undergraduate Computer Science & Engineering student at the University of Asia Pacific with an insatiable drive to bridge software algorithms with physical computing and real-world utility.",
    "My technical journey traverses autonomous robotics with microcontrollers, fairness-aware optimization algorithms, interactive computer vision interfaces, and modern full-stack web applications. I care deeply about clean system architecture, hands-on prototyping, and user-centered design.",
    "Whether calibrating an ultrasonic sensor array on an ESP32 robot or crafting a reactive web experience, I believe in shipping clean code, transparent documentation, and practical solutions."
  ],
  availability: 'Available for Summer & Fall Internships, Research Collaborations, and Engineering Projects',
  stats: [
    { label: 'Projects Engineered', value: '10+' },
    { label: 'Core Disciplines', value: 'Robotics, AI, Web' },
    { label: 'Academic Standing', value: 'B.Sc. in CSE' },
    { label: 'Institution', value: 'UAP Dhaka' }
  ]
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'food-delivery-robot',
    title: 'Indoor Food Delivery Robot',
    tagline: 'Autonomous line-following food transport system with obstacle detection',
    category: 'Robotics & IoT',
    featured: true,
    status: 'Completed',
    image: '/images/projects/food-delivery-robot.jpg',
    githubUrl: 'https://github.com/ENiGMA-101/Indoor-Food-Delivery-Robot',
    description:
      'A compact autonomous mobile robot engineered to transport food and refreshments along predefined indoor navigation paths. Built with an ESP32-S3 microcontroller, real-time ultrasonic obstacle evasion, five-channel IR line sensors, and dynamic status updates rendered on a 16×2 I2C LCD.',
    detailedSpecs: [
      'ESP32-S3 microcontroller core with C++ embedded firmware running in Arduino IDE',
      'Five-sensor infrared reflection array for sub-millimeter line guidance and junction detection',
      'HC-SR04 ultrasonic rangefinder for obstacle detection and emergency collision cutoff',
      'L298N dual H-bridge motor driver managing precision differential steering motors',
      'I2C 16×2 liquid crystal display showing live velocity, delivery milestones, and diagnostic state',
      'Modular acrylic chassis engineered for stable payload distribution and low center of gravity'
    ],
    technologies: ['ESP32-S3', 'C++', 'Arduino IDE', 'HC-SR04 Ultrasonic', 'IR Array', 'L298N', 'I2C LCD', 'Embedded Robotics'],
    stats: [
      { label: 'Navigation Accuracy', value: '99.2%' },
      { label: 'Response Latency', value: '< 15ms' },
      { label: 'Role', value: 'Project Lead & Firmware' }
    ]
  },
  {
    id: 'fairness-ai-routine',
    title: 'Fairness-Aware AI Routine Generator',
    tagline: 'Interactive optimization system & research survey for balanced university timetabling',
    category: 'Research',
    featured: true,
    status: 'Active Research',
    image: '/images/projects/ai-routine.jpg',
    githubUrl: 'https://github.com/ENiGMA-101/fairness-ai-routine--v',
    description:
      'An academic research project and interactive platform exploring algorithmic fairness in university scheduling. Solves complex multi-objective constraint satisfaction problems taking into account student preferences, instructor workloads, room capacity, and minimizing non-productive idle gaps.',
    detailedSpecs: [
      'Multi-objective heuristic optimization addressing classroom conflicts and schedule fragmentation',
      'Fairness metrics evaluating equitable distribution of preferred time-slots across academic batches',
      'Interactive React UI enabling administrators and students to model schedule tradeoffs in real time',
      'Constraint validation engine preventing room double-booking and teacher over-allocation'
    ],
    technologies: ['JavaScript', 'React', 'Algorithmic Optimization', 'Constraint Satisfaction', 'Data Visualization', 'Research Survey'],
    stats: [
      { label: 'Constraint Types', value: '12+ Rules' },
      { label: 'Idle Gap Reduction', value: '42%' },
      { label: 'Domain', value: 'Academic AI' }
    ]
  },
  {
    id: 'road-rash-cv',
    title: 'Road Rash Computer Vision Game',
    tagline: 'Arcade racing experience controlled entirely through real-time webcam hand gestures',
    category: 'AI & ML',
    featured: true,
    status: 'Completed',
    image: '/images/projects/gesture-game.jpg',
    githubUrl: 'https://github.com/ENiGMA-101/Road-Rash-Computer-Vision-Game',
    description:
      'A nostalgia-infused arcade racing game inspired by Road Rash, reimagined with modern computer vision. Players steer, accelerate, brake, and execute actions using real-time hand landmark tracking and gesture recognition captured directly from a standard computer webcam without special hardware.',
    detailedSpecs: [
      'MediaPipe Hands integration for low-latency 21-point 3D hand landmark recognition',
      'Geometric gesture calculation for tilt steering, palm gestures, and punch/kick triggers',
      'TypeScript and high-frame-rate 2D canvas physics simulation with collision meshes',
      'Adaptive camera smoothing to filter out lighting jitter and unstable frame rates'
    ],
    technologies: ['TypeScript', 'MediaPipe', 'Computer Vision', 'HTML5 Canvas', 'Gesture Recognition', 'Game Physics'],
    stats: [
      { label: 'Gesture Tracking', value: '60 FPS' },
      { label: 'Hardware Req', value: 'Standard Webcam' },
      { label: 'Input Latency', value: '~18ms' }
    ]
  },
  {
    id: 'vlc-optical-research',
    title: 'Visible Light Communication (VLC) Research',
    tagline: 'High-data-rate indoor optical wireless communication using solid-state illumination',
    category: 'Research',
    featured: false,
    status: 'Active Research',
    image: '/images/projects/vlc-research.jpg',
    description:
      'Experimental research exploring Visible Light Communication (Li-Fi) as an eco-friendly, RF-free alternative for high-speed indoor wireless networking. Investigating LED optical modulation, photodiode receiver sensitivity, and bit-error-rate mitigation in dense indoor spaces.',
    detailedSpecs: [
      'Optical wireless transceiver prototyping utilizing high-frequency switching LED emitters',
      'PIN photodiode detection circuitry with active transimpedance amplification',
      'Analysis of ambient light interference rejection and optical filtering techniques',
      'Simulated data-packet transfer testing over controlled free-space optical distances'
    ],
    technologies: ['Optical Wireless', 'Visible Light (VLC)', 'Hardware Prototyping', 'Signal Processing', 'Microcontroller Telemetry'],
    stats: [
      { label: 'Medium', value: 'Visible Light Spectrum' },
      { label: 'Advantage', value: 'Zero RF Interference' },
      { label: 'Scope', value: 'Indoor IoT Networks' }
    ]
  },
  {
    id: 'iot-smart-hydration',
    title: 'Smart IoT Automated Water Hydration System',
    tagline: 'Microprocessor and sensor-driven automated fluid metering and telemetry platform',
    category: 'Robotics & IoT',
    featured: false,
    status: 'Completed',
    image: '/images/projects/iot-hydration.jpg',
    description:
      'An automated fluid management system engineered to monitor reservoir volume, regulate automated dispensing cycles, and provide real-time digital telemetrics via microcontrollers and calibrated level sensors.',
    detailedSpecs: [
      'Sensor calibration for contactless or immersed level measurement with threshold trigger relays',
      'Automated solenoid valve and pump actuation with safety anti-overflow timer cutoffs',
      'OLED digital instrumentation display showing system status, flow metrics, and alerts',
      'Energy-efficient microprocessor sleep modes for standalone battery-backed operation'
    ],
    technologies: ['IoT', 'Microcontrollers', 'C++', 'Fluid Sensing', 'Actuator Relays', 'Circuit Design'],
    stats: [
      { label: 'Metering Accuracy', value: '±2 mL' },
      { label: 'Safety Overrides', value: 'Dual-Layer' }
    ]
  },
  {
    id: 'fifa-telegram-extension',
    title: 'FIFA 2026 Live Match Automation Suite',
    tagline: 'Dual-platform notification extension & automated Telegram match bot with GitHub Actions',
    category: 'Software & Web',
    featured: false,
    status: 'Completed',
    image: '/images/creative/design-system.jpg',
    githubUrl: 'https://github.com/ENiGMA-101/FIFA-World-cup-2026-reminder-extension',
    description:
      'A multi-tool fan automation system comprising a modern browser extension and a Python Telegram bot. Provides real-time score updates, half-time and full-time alerts, match countdowns, and upcoming fixtures automated completely through scheduled serverless GitHub Actions workflows.',
    detailedSpecs: [
      'Browser extension with rich UI for tracking favorite teams, live match clocks, and notifications',
      'Python Telegram bot dispatched via scheduled GitHub Actions cron jobs with zero hosting costs',
      'Clean JSON API ingestion and caching to prevent rate-limiting during high-traffic match windows'
    ],
    technologies: ['Python', 'JavaScript', 'GitHub Actions', 'Telegram Bot API', 'Chrome Extension API', 'REST API'],
    stats: [
      { label: 'Automation', value: 'Serverless CI/CD' },
      { label: 'Platforms', value: 'Chrome & Telegram' }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    description: 'Foundational syntax, object-oriented principles, and algorithmic problem solving',
    iconName: 'Code2',
    skills: [
      { name: 'C++', highlight: true, level: 'Advanced / Embedded' },
      { name: 'Python', highlight: true, level: 'Scripting & AI' },
      { name: 'JavaScript (ES6+)', highlight: true, level: 'Modern Web' },
      { name: 'TypeScript', highlight: true, level: 'Typed Systems' },
      { name: 'C', highlight: false, level: 'Low-Level Systems' },
      { name: 'SQL', highlight: false, level: 'Relational DB' },
      { name: 'HTML5 & CSS3', highlight: false, level: 'Semantic UI' }
    ]
  },
  {
    title: 'Frontend & Web Development',
    description: 'Building responsive, accessible, high-performance user interfaces',
    iconName: 'Layout',
    skills: [
      { name: 'React', highlight: true, level: 'Core Framework' },
      { name: 'Tailwind CSS', highlight: true, level: 'Utility Styling' },
      { name: 'Vite', highlight: true, level: 'Modern Bundler' },
      { name: 'Responsive Design', highlight: false, level: 'Mobile First' },
      { name: 'HTML5 Canvas', highlight: false, level: 'Interactive 2D' },
      { name: 'RESTful APIs', highlight: false, level: 'Client Integration' },
      { name: 'Component Architecture', highlight: false, level: 'Modular Systems' }
    ]
  },
  {
    title: 'Robotics & Embedded Systems',
    description: 'Physical computing, microcontrollers, sensor integration, and motor actuation',
    iconName: 'Cpu',
    skills: [
      { name: 'ESP32 / ESP32-S3', highlight: true, level: 'Primary Microcontroller' },
      { name: 'Arduino IDE & C++', highlight: true, level: 'Firmware Dev' },
      { name: 'Ultrasonic & IR Arrays', highlight: true, level: 'Sensor Calibration' },
      { name: 'Motor Drivers (L298N)', highlight: false, level: 'H-Bridge Actuation' },
      { name: 'I2C & UART Protocols', highlight: false, level: 'Serial Comms' },
      { name: 'Breadboard Prototyping', highlight: false, level: 'Circuit Assembly' },
      { name: 'Microprocessor Architecture', highlight: false, level: 'Academic Core' }
    ]
  },
  {
    title: 'AI & Machine Learning',
    description: 'Computer vision, algorithmic optimization, and practical ML integration',
    iconName: 'BrainCircuit',
    skills: [
      { name: 'MediaPipe (Hand Tracking)', highlight: true, level: 'Real-time Vision' },
      { name: 'Computer Vision Basics', highlight: true, level: 'Image Processing' },
      { name: 'Algorithmic Optimization', highlight: true, level: 'Constraint Heuristics' },
      { name: 'Python Data Libraries', highlight: false, level: 'Analysis & Clean Data' },
      { name: 'Prompt Engineering', highlight: false, level: 'LLM Orchestration' }
    ]
  },
  {
    title: 'Backend & Databases',
    description: 'Data persistence, API design, and server execution environments',
    iconName: 'Database',
    skills: [
      { name: 'Node.js', highlight: false, level: 'Runtime' },
      { name: 'MySQL / Relational DBs', highlight: true, level: 'Schema & Queries' },
      { name: 'SQLite', highlight: false, level: 'Embedded Storage' },
      { name: 'JSON & REST Services', highlight: false, level: 'Data Modeling' },
      { name: 'Basic Express', highlight: false, level: 'Routing' }
    ]
  },
  {
    title: 'Tools & Workflow Platforms',
    description: 'Version control, design tooling, and development environments',
    iconName: 'Wrench',
    skills: [
      { name: 'Git & GitHub', highlight: true, level: 'Daily Version Control' },
      { name: 'VS Code', highlight: true, level: 'Primary IDE' },
      { name: 'GitHub Actions', highlight: true, level: 'CI/CD & Cron' },
      { name: 'Figma', highlight: true, level: 'UI/UX Design Systems' },
      { name: 'Linux / Bash CLI', highlight: false, level: 'Command Line' },
      { name: 'Vercel Deployment', highlight: false, level: 'Edge Hosting' }
    ]
  }
];

export const EDUCATION = {
  institution: 'University of Asia Pacific (UAP)',
  location: '74/A, Green Road, Farmgate, Dhaka - 1205, Bangladesh',
  degree: 'Bachelor of Science in Computer Science and Engineering (B.Sc. in CSE)',
  status: 'Undergraduate Degree in Progress',
  department: 'Department of Computer Science and Engineering',
  description:
    'Pursuing rigorous foundational and applied computer science education with a strong emphasis on algorithm design, hardware-software co-design, artificial intelligence, microprocessors, and software engineering methodologies.',
  coreCoursework: [
    'Data Structures & Algorithms',
    'Object-Oriented Programming (OOP)',
    'Microprocessors & Microcontrollers',
    'Database Management Systems (DBMS)',
    'Computer Architecture & Organization',
    'Artificial Intelligence & Expert Systems',
    'Computer Networks & Data Communication',
    'Discrete Mathematics & Numerical Methods',
    'Software Engineering & Project Management'
  ],
  academicFocus:
    'Active focus on applied autonomous robotics, constraint-based timetable scheduling algorithms, and visible light optical communication.'
};

export const CERTIFICATIONS: CertificateItem[] = [
  {
    id: 'cert-figma',
    title: 'Figma Design System & UI/UX Principles',
    issuer: 'Design System Learning Track',
    issueDate: '2026',
    category: 'UI/UX & Design',
    skillsLearned: ['Design Tokens', 'Auto-Layout Components', 'Responsive Grids', 'Interactive Prototyping'],
    verifyUrl: 'https://github.com/ENiGMA-101/Figma-Design-System'
  },
  {
    id: 'cert-embedded-iot',
    title: 'Microcontroller Programming & IoT Systems',
    issuer: 'Academic Course & Lab Certification',
    issueDate: '2025 - 2026',
    category: 'Embedded Systems',
    skillsLearned: ['ESP32 Architecture', 'Sensor Interfacing', 'C++ Firmware', 'I2C/SPI Protocols']
  },
  {
    id: 'cert-python-ds',
    title: 'Python for Problem Solving & Algorithmic Thinking',
    issuer: 'Technical Skill Certification',
    issueDate: '2025',
    category: 'Computer Science',
    skillsLearned: ['Data Structures', 'Algorithmic Complexity', 'Automation Scripting', 'Object-Oriented Design']
  },
  {
    id: 'cert-web-fundamentals',
    title: 'Modern Frontend & Responsive Web Design',
    issuer: 'Web Development Certification',
    issueDate: '2024 - 2025',
    category: 'Web Engineering',
    skillsLearned: ['Modern JavaScript', 'CSS Flexbox & Grid', 'Semantic HTML5', 'State Management']
  },
  {
    id: 'cert-placeholder-upcoming',
    title: 'Advanced AI & Embedded Vision (In Progress)',
    issuer: 'Specialization Track',
    issueDate: 'Current Study',
    category: 'AI & Robotics',
    skillsLearned: ['Edge AI', 'MediaPipe Landmarking', 'Embedded Inference', 'Kinematics']
  }
];

export const RESEARCH_TIMELINE: ResearchItem[] = [
  {
    id: 'res-vlc',
    title: 'Visible Light Communication (VLC) Research',
    role: 'Undergraduate Researcher',
    institution: 'University of Asia Pacific',
    period: '2025 - Present',
    type: 'Research',
    summary:
      'Investigating optical wireless communication techniques utilizing high-speed light-emitting diodes to enable secure, high-bandwidth data transmission without radio-frequency interference.',
    contributions: [
      'Prototyped emitter driver circuitry and optical photodiode receivers',
      'Evaluated ambient noise filtering strategies in controlled indoor environments',
      'Documenting modulation scheme viability for localized indoor sensor telemetry'
    ],
    technologies: ['Optical Wireless', 'Li-Fi Concepts', 'Signal Analysis', 'Circuit Prototyping']
  },
  {
    id: 'res-fairness-routine',
    title: 'Fairness-Aware Academic Routine Generation',
    role: 'Lead Developer & Researcher',
    institution: 'University of Asia Pacific',
    period: '2025 - 2026',
    type: 'Research',
    summary:
      'Engineered an interactive research model tackling unfairness, lecture clashes, and excessive downtime in university schedules through multi-objective constraint programming.',
    contributions: [
      'Authored constraint optimization algorithms prioritizing both faculty and student batch satisfaction',
      'Developed interactive web-based scheduling preview and survey collection interface',
      'Analyzed statistical metrics on schedule equity and classroom utilization'
    ],
    technologies: ['Algorithmic Optimization', 'React', 'Constraint Programming', 'Data Analytics'],
    link: 'https://github.com/ENiGMA-101/fairness-ai-routine--v'
  },
  {
    id: 'res-food-robot',
    title: 'Indoor Autonomous Food Delivery Robot',
    role: 'Project Lead & Firmware Engineer',
    institution: 'University of Asia Pacific',
    period: '2025 - 2026',
    type: 'Academic Project',
    summary:
      'Spearheaded an embedded systems team to build a physical line-navigating food delivery robot capable of automated indoor trajectory tracking and active ultrasonic obstacle avoidance.',
    contributions: [
      'Programmed core ESP32-S3 firmware in C++ with custom PID-style steering feedback',
      'Integrated 5-channel IR sensor array with dynamic calibration for varying floor reflectivity',
      'Designed fail-safe obstacle detection loop with real-time I2C status telemetry'
    ],
    technologies: ['ESP32-S3', 'Embedded C++', 'Hardware Integration', 'Team Leadership'],
    link: 'https://github.com/ENiGMA-101/Indoor-Food-Delivery-Robot'
  }
];

export const CREATIVE_GALLERY: CreativeItem[] = [
  {
    id: 'cg-1',
    title: 'Autonomous Mobile Robot Chassis',
    category: 'Hardware Engineering',
    image: '/images/projects/food-delivery-robot.jpg',
    description: 'ESP32 microcontroller integration with 5-channel IR reflection sensors and dual motor driver.'
  },
  {
    id: 'cg-2',
    title: 'Embedded Workbench & Circuitry',
    category: 'Prototyping & Soldering',
    image: '/images/creative/embedded-lab.jpg',
    description: 'Precision jumper wiring, breadboard signal verification, and sensor calibration testbench.'
  },
  {
    id: 'cg-3',
    title: 'Algorithmic Fairness Matrix',
    category: 'Research & UI Architecture',
    image: '/images/projects/ai-routine.jpg',
    description: 'Data model visualizing schedule satisfaction index across multiple student cohorts.'
  },
  {
    id: 'cg-4',
    title: 'Optical Wireless Spectrum Lab',
    category: 'VLC Research',
    image: '/images/projects/vlc-research.jpg',
    description: 'Visible light communication transceiver testing focused optical transmission beams.'
  },
  {
    id: 'cg-5',
    title: 'Real-Time Landmark Recognition',
    category: 'Computer Vision',
    image: '/images/projects/gesture-game.jpg',
    description: 'MediaPipe 21-point skeletal hand landmark extraction driving interactive physics simulation.'
  },
  {
    id: 'cg-6',
    title: 'Design System & Token Architecture',
    category: 'UI/UX Engineering',
    image: '/images/creative/design-system.jpg',
    description: 'Structured component tokens, typography scales, and modular geometric interface patterns.'
  }
];
