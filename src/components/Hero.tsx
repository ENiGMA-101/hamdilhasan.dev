import { useEffect, useRef, useState } from "react";
import HHPLogo from "./HHPLogo";
import Typewriter from "./Typewriter";
import { GitHubIcon, LinkedInIcon } from "./SocialIcons";
import { PERSONAL_INFO } from "../data/portfolioData";

/* ==========================================================================
   Hero — editorial headline, typing focus line, 3D identity card
   • Static headline is rendered first so the page is meaningful without JS.
   • The typing line is decorative and screen-reader friendly (see Typewriter).
   • Mouse tilt is disabled for coarse pointers and reduced-motion users.
   ========================================================================== */

const REDUCED = "(prefers-reduced-motion: reduce)";

export function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!finePointer || !cardRef.current) return;
    if (window.matchMedia(REDUCED).matches) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -11, y: px * 13 });
  };

  const reset = () => setTilt({ x: 0, y: 0 });
  const tilting = tilt.x !== 0 || tilt.y !== 0;

  return (
    <section id="hero" className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28">
      {/* Ambient depth layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-12%] h-[420px] w-[760px] max-w-[95vw] -translate-x-1/2 rounded-full bg-[var(--glow-ambient)] blur-[110px]" />
        <div className="absolute -right-24 top-1/3 h-[320px] w-[320px] rounded-full bg-[var(--aqua-solid)] opacity-[0.07] blur-[100px]" />
        <div className="bg-tech-grid absolute inset-0" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 md:grid-cols-12 md:gap-6 lg:gap-10 lg:px-10">
        {/* ---------------- Narrative column ---------------- */}
        <div className="md:col-span-7 lg:col-span-7 min-w-0 max-w-full">
          {/* Availability indicator */}
          <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[var(--line-subtle)] bg-[var(--surface-raised)] px-3.5 py-1.5 text-[13px] text-[var(--content-secondary)]">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--aqua-solid)] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--aqua-solid)]" />
            </span>
            <span className="font-medium text-[var(--content-primary)]">
              {PERSONAL_INFO.availability.label}
            </span>
          </p>

          <h1 className="font-display text-display font-bold text-[var(--content-primary)]">
            Hamdil Hasan
            <br />
            <span className="text-gradient-brand">Partho</span>
          </h1>

          {/* Typing focus line */}
          <p className="mt-6 flex flex-col text-hero-headline font-medium text-[var(--content-secondary)] sm:block min-w-0 max-w-full overflow-wrap-break-word">
            <span className="sr-only">{PERSONAL_INFO.headline}</span>
            <span aria-hidden="true" className="inline max-w-full">
              <Typewriter
                phrases={PERSONAL_INFO.heroPhrases}
                className="text-[var(--accent-text)] max-w-full"
                ariaLabel="Focus areas"
              />
            </span>
          </p>

          <p className="mt-5 max-w-[54ch] text-body-lg text-[var(--content-muted)]">
            {PERSONAL_INFO.intro}
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-solid)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-solidHover)] active:scale-[0.98]"
            >
              Explore my work
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--line-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm font-semibold text-[var(--content-primary)] transition hover:border-[var(--accent-solid)] hover:text-[var(--accent-text)] active:scale-[0.98]"
            >
              Get in touch
            </a>
            <span className="mx-1 hidden h-8 w-px bg-[var(--line-subtle)] sm:block" aria-hidden="true" />
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--content-secondary)] transition hover:text-[var(--content-primary)]"
            >
              <GitHubIcon className="h-[18px] w-[18px]" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--content-secondary)] transition hover:text-[var(--accent-text)]"
            >
              <LinkedInIcon className="h-[18px] w-[18px]" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </div>

          {/* Facts strip */}
          <dl className="mt-11 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-5 border-t border-[var(--line-subtle)] pt-7 sm:grid-cols-4">
            {PERSONAL_INFO.stats.map((s) => (
              <div key={s.label}>
                <dt className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--content-faint)]">
                  {s.label}
                </dt>
                <dd className="mt-1.5 font-display text-[17px] font-bold text-[var(--content-primary)]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ---------------- Identity card column ---------------- */}
        <div className="md:col-span-5 lg:col-span-5">
          <div className="perspective-1200 mx-auto w-full max-w-[420px]">
            <div
              ref={cardRef}
              onMouseMove={handleMove}
              onMouseLeave={reset}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: tilting ? "transform 120ms linear" : "transform 600ms cubic-bezier(0.2,0.8,0.2,1)",
              }}
              className="transform-style-3d relative rounded-[26px] border border-[var(--line-subtle)] bg-[var(--surface-raised)] p-6 shadow-[var(--shadow-pop)] sm:p-7"
            >
              {/* Card header */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.1em] text-[var(--content-faint)]">
                  HHP · IDENTITY
                </span>
                <span className="rounded-full border border-[var(--line-subtle)] bg-[var(--surface-sunken)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--content-muted)]">
                  UAP · CSE
                </span>
              </div>

              {/* Monogram plate */}
              <div className="relative my-8 grid place-items-center py-4">
                <span
                  aria-hidden="true"
                  className="absolute h-52 w-52 rounded-full border border-[var(--line-subtle)]"
                />
                <span
                  aria-hidden="true"
                  className="absolute h-72 w-72 rounded-full border border-[var(--line-subtle)] opacity-50"
                />
                <HHPLogo size={190} showGlow className="relative" />
              </div>

              <div className="text-center">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--content-muted)]">
                  {PERSONAL_INFO.fullName}
                </p>
                <p className="mt-1 text-sm font-semibold text-[var(--content-primary)]">
                  Geometric monogram · interwoven H H P
                </p>
              </div>

              {/* Spec rows */}
              <dl className="mt-7 space-y-0 border-t border-[var(--line-subtle)] pt-5 text-[13px]">
                {[
                  ["Programme", PERSONAL_INFO.degree],
                  ["Institution", PERSONAL_INFO.institution],
                  ["Based in", PERSONAL_INFO.location],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 py-1.5">
                    <dt className="text-[var(--content-faint)]">{k}</dt>
                    <dd className="text-right font-medium text-[var(--content-secondary)]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
