# hamdilhasan.dev — Hamdil Hasan Partho (HHP)

Premium personal portfolio for **Hamdil Hasan Partho** — Computer Science & Engineering
student at the University of Asia Pacific, building software, robotics and intelligent
systems.

- **Live:** https://hamdilhasan-dev.vercel.app/
- **GitHub:** https://github.com/ENiGMA-101
- **LinkedIn:** https://www.linkedin.com/in/hamdil-hasan-p101/
- **Email:** hamdilhasan101@gmail.com

---

## Stack

| Layer      | Choice                                            |
| ---------- | ------------------------------------------------- |
| Framework  | React 19 + TypeScript                             |
| Styling    | Tailwind CSS v4 (`@tailwindcss/vite`)             |
| Build      | Vite 7                                            |
| Icons      | Inline SVG + `lucide-react`                       |
| Typography | Space Grotesk (display) · Inter (body) · JetBrains Mono (meta) |
| Email      | Vercel Edge Function → Resend REST API            |
| Deploy     | Vercel (static `dist/` + `api/` serverless)       |

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

Type-check (the build does not type-check on its own):

```bash
npx tsc --noEmit
```

---

## Editing content

**Everything you would normally want to change lives in one file:**
`src/data/portfolioData.ts`.

### Add or edit a project

```ts
{
  id: "my-project",
  title: "Project name",
  tagline: "One-line description",
  category: "Robotics & Embedded",   // Robotics & Embedded | AI & Machine Learning | Research | Software & Web
  featured: false,                   // true → full case-study layout
  status: "Completed",               // Completed | Prototype | Ongoing Research
  summary: "Short copy for the compact card.",
  caseStudy: {                       // only needed when featured: true
    problem: "What was wrong or missing.",
    built: ["Thing I implemented", "Another thing I implemented"],
    solution: "How the pieces fit together.",
    outcome: "Verified result. Omit if not yet demonstrated.",
  },
  technologies: ["ESP32", "C++"],
  image: "/images/projects/my-project.jpg",
  visualKind: "photograph",          // or "illustrative"
  visualCaption: "Shown under the image. Use it to label concept renders.",
  links: [{ label: "View repository", href: "https://github.com/…", kind: "github" }],
}
```

**Rules the data file follows — please keep them:**

- Never claim a metric, award, employer or graduation date that isn't real.
- Set `unverified: true` on anything you can't back with a public repository; the UI
  renders a visible **Unverified** badge.
- Set `visualKind` honestly. `"illustrative"` adds a caption telling visitors the image
  is a concept render, not a photograph of the prototype.

### Add a certificate

Append to `CERTIFICATIONS`. Set `placeholder: true` while no issued image exists — the
card then shows an "Image pending" label instead of a fabricated design.

### Change the hero typing phrases

Edit `PERSONAL_INFO.heroPhrases`.

### Add a skill

Append to `SKILL_CATEGORIES`. `core: true` puts the tool in the hero marquee and gives it
a highlighted card. There are deliberately **no proficiency percentages** anywhere.

---

## Theming

Dark mode is the default; light mode is a separate, intentionally designed surface set —
not a recoloured dark mode.

- All colours come from CSS custom properties defined once in `src/index.css`
  (`:root` / `.dark`).
- Components reference them as `var(--surface-raised)`, `var(--content-primary)`,
  `var(--line-subtle)`, `var(--accent-solid)`, `var(--aqua-solid)`, etc.
- Choice is persisted in `localStorage` under `hhp-theme`.
- If nothing is stored, the OS preference is followed.
- An inline script in `index.html` applies the theme **before first paint**, so there is
  no flash of the wrong theme.
- Toggling adds a short-lived `.theme-transition` class for a restrained cross-fade.

**To change the brand palette, edit the token blocks at the top of `src/index.css`** —
no component needs to change.

---

## Contact form — email delivery setup (required)

The contact form posts to **`/api/send-email`**, a Vercel Edge Function that forwards the
message to `hamdilhasan101@gmail.com` via [Resend](https://resend.com). The API key is
read from the environment on the server and is **never** bundled into client code.

### 1. Create a Resend account and API key

1. Sign up at https://resend.com.
2. **API Keys → Create API Key** (permission: *Sending access*).
3. Copy the key — it starts with `re_`.

### 2. Add the environment variables in Vercel

**Vercel dashboard → your project → Settings → Environment Variables**

| Variable             | Required | Value                                                        |
| -------------------- | -------- | ------------------------------------------------------------ |
| `RESEND_API_KEY`     | **yes**  | `re_xxxxxxxxxxxxxxxxxxxx`                                    |
| `RESEND_FROM_EMAIL`  | **yes**  | A verified sender, e.g. `Portfolio <noreply@hamdilhasan.dev>` |
| `CONTACT_TO_EMAIL`   | no       | Recipient. Defaults to `hamdilhasan101@gmail.com`            |
| `RESEND_REPLY_TO`    | no       | Fallback reply-to address                                    |

Add them for **Production**, **Preview** and **Development**, then **redeploy** —
environment variables only take effect on a new deployment.

### 3. Verify a sending domain (needed to deliver to Gmail)

Resend's built-in `onboarding@resend.dev` sender works immediately, but it can **only
deliver to the email address that owns the Resend account**. To deliver reliably to
`hamdilhasan101@gmail.com` from your own address:

1. Resend dashboard → **Domains → Add Domain** → add `hamdilhasan.dev`.
2. Add the DNS records Resend gives you (SPF, DKIM, and the MX/SPF for the subdomain)
   at your domain registrar.
3. Wait for verification, then set
   `RESEND_FROM_EMAIL=Portfolio <noreply@hamdilhasan.dev>`.

> If you don't own a domain yet, use `onboarding@resend.dev` and sign up to Resend with
> `hamdilhasan101@gmail.com` — delivery to that address works out of the box.

### 4. What the endpoint does

- Accepts `POST` with JSON only; rejects other methods with `405`.
- Hard-codes the recipient — a visitor can never redirect mail elsewhere.
- Length-limits, type-checks, trims and strips control characters from every field.
- Rejects CRLF in the subject (header-injection protection).
- Requires a minimum fill time and a silent honeypot field.
- Rate limits to 5 messages per IP per 10 minutes (`429`).
- Uses the visitor's address as `reply-to` only after it passes validation.
- Returns generic error messages; provider failures are logged server-side only.
- Answers `503` with a clear message if the service isn't configured yet, so the form
  degrades gracefully instead of silently failing.

### 5. Local development of the form

`npm run dev` does **not** serve `/api`. To test locally:

```bash
npm i -g vercel
vercel dev          # serves both the app and api/send-email.ts
```

Put the same variables in a local `.env` file (never commit it — it's git-ignored by
Vercel's default `.gitignore`).

---

## Deploying to Vercel

The repo is already Vercel-ready:

- `vercel.json` sets the build command, output directory and framework.
- `api/send-email.ts` is auto-detected as an Edge Function.
- A catch-all rewrite serves `index.html` for unknown routes (API routes are matched
  first by Vercel's filesystem check, so they are not shadowed).
- `public/404.html` is a branded not-found page.

```bash
git add .
git commit -m "Your message"
git push origin main
```

Vercel builds and deploys automatically. If you use the CLI:

```bash
vercel --prod
```

---

## Architecture

```
index.html                      Inline theme script, fonts, SEO/OG metadata
vercel.json                     Build output, function config, rewrites, headers
api/send-email.ts               Edge Function — validated, rate-limited email relay
public/
  favicon.svg                   HHP monogram
  404.html                      Branded not-found page
  images/…                      Project, portrait and lab visuals
src/
  index.css                     Design tokens, base styles, keyframes, utilities
  data/portfolioData.ts         ALL content — edit here
  components/
    AutoCarousel.tsx            Shared seamless marquee rail (the carousel fix)
    Typewriter.tsx              Hero typing animation (a11y + reduced motion)
    HHPLogo.tsx                 Theme-aware vector monogram
    IntroSequence.tsx           Opening animation
    Navbar.tsx  Hero.tsx  Footer.tsx
    FeaturedProjects.tsx        Large case studies
    ProjectsSection.tsx         Compact project gallery
    AboutSection.tsx  SkillsSection.tsx  EducationSection.tsx
    CertificationsSection.tsx   Certificate carousel
    ResearchTimeline.tsx  CreativeLabSection.tsx  ContactSection.tsx
```

### The carousel fix

The previous certificate track advanced with `setInterval` + `scrollBy({ left: 1 })`,
then jumped back to `scrollLeft = 0` at the end. That produced 1px stutter, fought CSS
`scroll-behavior: smooth`, showed a visible reset, never paused on tab-hide, and had no
drag support.

`AutoCarousel.tsx` replaces it:

- Renders the track twice with an identical trailing gap, and wraps `scrollLeft` at one
  lap width using modulo arithmetic — **no reset flash, no missing or doubled gap**.
- Drives the rail from a single `requestAnimationFrame` loop with delta-time normalised
  speed, so motion is smooth at any refresh rate and never produces a huge jump.
- Pauses on hover, focus-within, pointer drag, `visibilitychange`, and the user's
  play/pause button; resumes on leave.
- Supports mouse, touch and pen drag, and suppresses the click that follows a real drag
  so cards don't open accidentally.
- Falls back to a plain scrollable rail with arrows and keyboard support when
  `prefers-reduced-motion: reduce` is set.
- The lap width is measured from the first copy's `offsetWidth` (not
  `scrollWidth / 2`), because the rail is bled to the section edges with horizontal
  padding that `scrollWidth` would include.

The same component powers the **certificates**, **projects** and **visual archive**
tracks.

---

## Accessibility

- Semantic landmarks, one `h1`, ordered heading levels.
- Skip-to-content link; visible keyboard focus rings on every control.
- Carousels are `role="group"` with arrow-key support and a polite status region that
  announces play/pause — never every frame.
- The hero typing line is `aria-hidden`; a static phrase list is exposed to screen
  readers once instead of character by character.
- Reduced-motion support across the intro, all marquees, reveals and the caret.
- Colour contrast is enforced by the token pairs in `src/index.css`.
- Dialogs trap scroll, close on `Escape`, and move focus to the close button.
- Decorative layers are `aria-hidden`; all content images carry descriptive `alt`.

---

## Performance notes

- The production bundle is a single inlined `index.html` (~96 kB gzipped) plus images.
- Images are `loading="lazy"` + `decoding="async"` inside fixed-ratio containers, so
  there is no layout shift.
- No 3D library is used. Depth comes from CSS transforms, `perspective` and layered
  shadows, which keeps the bundle small and works on low-powered devices.
- Hover-driven tilt is gated behind `(hover: hover) and (pointer: fine)` so touch
  devices never pay for it.

---

## Licence

Personal portfolio. Content is © Hamdil Hasan Partho.
