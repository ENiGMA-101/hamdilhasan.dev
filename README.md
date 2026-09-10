# hamdilhasan.dev

<p align="center">
  <strong>A personal website and digital workspace for software, ideas, projects, writing, and photography.</strong>
</p>

<p align="center">
  <a href="https://hamdilhasan-dev.vercel.app/"><img src="https://img.shields.io/badge/Live%20Website-hamdilhasan.dev-111827?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Website"></a>
  <a href="https://github.com/ENiGMA-101/hamdilhasan.dev"><img src="https://img.shields.io/badge/Source-GitHub-111827?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=111827" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel">
</p>

---

## Overview

**hamdilhasan.dev** is my personal website — built as more than a traditional developer profile.

It brings together the work I build, the technologies I explore, the ideas I write about, and the moments I capture through photography.

> **I build ideas into reality.**

The website is designed as an evolving digital space rather than a static résumé: concise enough to explore quickly, but flexible enough to grow with new projects, experiments, writing, and creative work.

---

## What the website brings together

| Section | Purpose |
| --- | --- |
| **About** | Background, education, interests, and technical direction |
| **Work** | Selected software, AI, robotics, and web projects |
| **Focus** | Areas I am actively learning and building around |
| **Photography** | A curated collection of personal photographs |
| **Writing** | Short notes, observations, and lessons from building |
| **Contact** | Ways to connect and collaborate |

---

## Technical direction

The website reflects the areas where I enjoy connecting software with real-world systems:

- **Software Engineering** — practical applications, tools, and systems
- **Artificial Intelligence** — intelligent systems, optimization, and problem solving
- **Robotics & Embedded Systems** — sensors, motors, microcontrollers, and control
- **IoT** — connecting physical systems with software
- **Web Development** — responsive and accessible user experiences
- **Creative Work** — photography, visual storytelling, and technical writing

---

## Selected work

### Fairness-Aware AI Timetable
A scheduling system exploring how timetable generation can balance room conflicts, lecturer workload, and fairness.

**Focus:** Python · AI · Optimization

### Autonomous Delivery Robot
An Arduino-based robotics prototype combining sensor input, motor control, and embedded decision-making.

**Focus:** Arduino · C++ · L298N · Sensors · Motors

### hamdilhasan.dev — v1
The earlier version of this website, built with Flask and SQLite with server-side pages and an admin dashboard.

**Focus:** Python · Flask · SQLite

### hamdilhasan.dev — v2
The current website — rebuilt as a lightweight static experience with a modern frontend stack and simple deployment workflow.

**Focus:** React · TypeScript · Tailwind CSS · Vite · Vercel

More experiments and projects live across my GitHub.

---

## Technology

| Layer | Technology |
| --- | --- |
| Frontend | React + TypeScript |
| Styling | Tailwind CSS |
| Build tool | Vite |
| Version control | Git + GitHub |
| Deployment | Vercel |

### Technical interests

```text
Python          C++
TypeScript      JavaScript
React           Flask
Tailwind CSS    SQLite
AI / ML         Optimization
Arduino         IoT
Sensors         Motors
Photography     Technical Writing
```

---

## Design & experience

The visual direction is intentionally **minimal, editorial, and technical**.

### Design principles

- Strong typography and visual hierarchy
- Responsive layouts for desktop and mobile
- Motion used as enhancement rather than distraction
- Focused dark visual atmosphere
- Short, contextual project descriptions
- Photography treated as part of the site's identity
- Accessibility-conscious motion behavior
- Lightweight architecture for straightforward deployment

The interface also respects users who prefer reduced motion.

---

## Architecture

```text
hamdilhasan.dev/
│
├── public/
│   └── images/              # Profile and photography assets
│
├── src/
│   ├── components/          # Reusable website sections
│   ├── data.ts              # Content and project data
│   ├── App.tsx              # Main application
│   └── ...
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json
├── DEPLOY.md
├── LICENSE
└── README.md
```

---

## Run locally

### Requirements

- Node.js
- npm
- Git

### Clone

```bash
git clone https://github.com/ENiGMA-101/hamdilhasan.dev.git
cd hamdilhasan.dev
```

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## Deployment

The website is designed for static deployment and is currently deployed with **Vercel**.

```text
Framework:        Vite
Build command:    npm run build
Output directory: dist
```

The repository includes `vercel.json` to keep deployment simple and reproducible.

See [`DEPLOY.md`](./DEPLOY.md) for deployment instructions.

---

## Why static?

The current version deliberately avoids unnecessary backend infrastructure.

It does not require:

- a Python runtime
- a database
- server-side rendering
- an external image-hosting service for core assets

The result is a fast, predictable, easy-to-maintain website that can be deployed as a static application.

---

## From v1 to v2

This project is also an example of evolving a product instead of continuously adding complexity.

### v1

```text
Python
Flask
SQLite
Server-side pages
Admin dashboard
```

### v2

```text
React
TypeScript
Tailwind CSS
Vite
Static deployment
Vercel
```

The goal was simple:

> **Keep the identity and content, but make the experience faster, cleaner, easier to maintain, and easier to deploy.**

---

## Photography

Photography is intentionally part of the website rather than a separate project.

Image assets are bundled locally under:

```text
public/images/
```

This keeps the site's core visual content inside the same version-controlled project and avoids depending on external raw-image hosting.

---

## Project status

**Active and evolving.**

The website is a foundation for future project case studies, technical writing, experiments, and photography collections.

---

## Connect

**Website:** https://hamdilhasan-dev.vercel.app/

**GitHub:** https://github.com/ENiGMA-101

**LinkedIn:** https://www.linkedin.com/in/hamdil-hasan-p101/

**Email:** hamdilhasan101@gmail.com

---

<p align="center">
  <strong>Built with curiosity, iteration, and a lot of debugging.</strong><br>
  <sub>© Hamdil Hasan · hamdilhasan.dev</sub>
</p>
