# Hamdil Hasan Partho (HHP) — Personal Portfolio Website

A premium, interactive, 3D personal technology portfolio designed for **Hamdil Hasan Partho** — Computer Science & Engineering undergraduate at the University of Asia Pacific (UAP), developer, and technology enthusiast.

- **Live URL:** [https://hamdilhasan-dev.vercel.app/](https://hamdilhasan-dev.vercel.app/)
- **GitHub Profile:** [@ENiGMA-101](https://github.com/ENiGMA-101)
- **LinkedIn:** [hamdil-hasan-p101](https://www.linkedin.com/in/hamdil-hasan-p101/)
- **Contact:** [hamdilhasan101@gmail.com](mailto:hamdilhasan101@gmail.com)

---

## 🎨 Visual Identity & Brand System

- **Monogram:** **HHP** — Custom interwoven geometric typography combining midnight navy (`#0B1220`), electric blue (`#2563EB`), teal (`#14B8A6`), and white negative space with a circuit trace terminal.
- **Color Palette:**
  - **Midnight Navy:** `#0B1220` (Dark surface primary)
  - **Deep Charcoal:** `#111827` (Card surface dark)
  - **Electric Blue:** `#2563EB` (Primary brand accent)
  - **Teal / Cyan:** `#14B8A6` (Secondary accent & circuit node)
  - **Light Background:** `#F7F8FA` (Light mode base)
  - **Text Primary (Light Mode):** `#111827`
  - **Muted Slate:** `#94A3B8`
- **Themes:** Dark Mode (default) & Light Mode with instant toggle and local storage persistence.

---

## 🚀 Key Features

1. **Intro Sequence:** High-impact geometric monogram reveal featuring the HHP identity, circuit pulsation, and full name typography with auto-transition and `[ESC]` skip support.
2. **Interactive 3D Hero:** Dynamic rotating skill interests ("Robotics & Embedded Systems", "Artificial Intelligence", "Software Engineering") paired with a 3D perspective mouse-tilt card.
3. **Projects Showcase:**
   - Horizontally moving carousel with manual scroll arrows, drag support, and pause-on-hover.
   - Category filtering (Robotics & IoT, AI & ML, Research, Software & Web).
   - Deep-dive modal revealing hardware components, pinouts, and GitHub repository links.
   - Real verified projects: *Indoor Food Delivery Robot (ESP32-S3)*, *Fairness-Aware AI Routine Generator*, *Visible Light Communication (VLC) Research*, *Road Rash Computer Vision Game*, *Smart IoT Hydration System*, and *FIFA 2026 Match Bot*.
4. **Editorial About Section:** Authentic narrative on CSE studies at University of Asia Pacific, hardware-software co-design philosophy, and engineering values.
5. **Skills & Stack Matrix:** Bidirectional continuous marquees, categorized into Programming Languages, Web Development, Embedded Systems, AI/ML, Databases, and Tools. Zero arbitrary progress bars.
6. **Education & Certifications:**
   - Separate education showcase detailing degree coursework at UAP Dhaka.
   - Continuous horizontal certificate gallery moving right-to-left with manual navigation and modal inspector.
7. **Research & Experience Timeline:** Academic investigations in optical wireless communications (Li-Fi) and university scheduling algorithms.
8. **Creative Lab & Photography:** Prototyping artifacts, breadboard setups, and computer vision landmarks with a lightbox viewer.
9. **Functional Contact Dispatcher:** Real `mailto:` client launch with pre-filled structured inquiry templates, one-click draft copying, and a live Dhaka time clock (UTC+06:00).

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4 (configured via `@tailwindcss/vite`)
- **Icons:** Lucide React + custom vector SVGs
- **Build Tool:** Vite 7 (optimized single-file distribution ready for Vercel)

---

## 📁 Project Structure

```text
├── index.html                     # HTML entry point, SEO metadata & font preloads
├── public/
│   ├── favicon.svg               # SVG HHP brand icon
│   └── images/
│       ├── about/                # Editorial portraits
│       ├── creative/             # Lab and electronics photography
│       └── projects/             # Real-world project renders
├── src/
│   ├── components/
│   │   ├── AboutSection.tsx      # Editorial bio & UAP profile
│   │   ├── CertificationsSection.tsx # Horizontal certificate track
│   │   ├── ContactSection.tsx    # Mailto dispatcher & live timezone
│   │   ├── CreativeLabSection.tsx# Hardware photography & lightbox
│   │   ├── EducationSection.tsx  # Academic degree & coursework
│   │   ├── Footer.tsx            # Branded footer & replay intro
│   │   ├── Hero.tsx              # 3D interactive hero
│   │   ├── HHPLogo.tsx           # Vector SVG monogram component
│   │   ├── IntroSequence.tsx     # Opening 3D animation sequence
│   │   ├── Navbar.tsx            # Sticky header with theme toggle
│   │   ├── ProjectsSection.tsx   # Horizontal project carousel & modal
│   │   ├── ResearchTimeline.tsx  # Academic timeline
│   │   ├── SkillsSection.tsx     # Animated skill marquees & tabs
│   │   └── SocialIcons.tsx       # GitHub, LinkedIn brand vectors
│   ├── data/
│   │   └── portfolioData.ts      # Centralized source of truth for all content!
│   ├── App.tsx                   # Top-level composition & theme manager
│   ├── index.css                 # Base theme styles & custom animations
│   └── main.tsx                  # React DOM entry
```

---

## ✏️ How to Edit Content

All data is decoupled from the UI components and centralized in **`src/data/portfolioData.ts`**.

### 1. Add or Edit a Project
Open `src/data/portfolioData.ts` and update the `PROJECTS` array:

```ts
{
  id: 'my-new-project',
  title: 'Autonomous Drone Navigation',
  tagline: 'Edge AI computer vision path planning',
  category: 'Robotics & IoT', // 'Robotics & IoT' | 'AI & ML' | 'Software & Web' | 'Research'
  featured: true,
  status: 'Completed',
  image: '/images/projects/drone.jpg',
  githubUrl: 'https://github.com/ENiGMA-101/drone-navigation',
  description: 'Detailed description...',
  detailedSpecs: ['ROS2 on Raspberry Pi 5', 'YOLOv8 nano model'],
  technologies: ['Python', 'ROS2', 'OpenCV', 'C++'],
  stats: [
    { label: 'Latency', value: '24ms' }
  ]
}
```

### 2. Add or Edit a Certificate
In `src/data/portfolioData.ts`, update `CERTIFICATIONS`:

```ts
{
  id: 'cert-cloud',
  title: 'AWS Certified Cloud Practitioner',
  issuer: 'Amazon Web Services',
  issueDate: '2026',
  category: 'Cloud Computing',
  skillsLearned: ['Cloud Architecture', 'IAM', 'S3 & Lambda'],
  verifyUrl: 'https://aws.amazon.com/verification'
}
```

### 3. Update Skills or Coursework
- Update `SKILL_CATEGORIES` for technical skills.
- Update `EDUCATION.coreCoursework` for completed university subjects.
- Update `RESEARCH_TIMELINE` for new lab projects.

### 4. Replace the Logo
- The SVG monogram is defined in `src/components/HHPLogo.tsx`.
- The browser favicon is in `public/favicon.svg`.

---

## 💻 Development & Deployment

### Run Locally:
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

### Build for Production:
```bash
npm run build
```
The output will be created in the `dist/` directory.

### Deploy to Vercel:
The project is built using standard Vite. To deploy to your existing Vercel project:
1. Push your changes to the `main` branch on GitHub:
   ```bash
   git add .
   git commit -m "Redesign: Premium HHP Portfolio with 3D depth & verified projects"
   git push origin main
   ```
2. Vercel will automatically detect Vite and deploy the production build.

---

## 👤 Author

**Hamdil Hasan Partho (HHP)**  
- Email: [hamdilhasan101@gmail.com](mailto:hamdilhasan101@gmail.com)  
- GitHub: [@ENiGMA-101](https://github.com/ENiGMA-101)  
- LinkedIn: [hamdil-hasan-p101](https://www.linkedin.com/in/hamdil-hasan-p101/)
