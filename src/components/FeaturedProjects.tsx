import { useEffect, useRef, useState } from "react";
import { FEATURED_PROJECTS, type ProjectItem } from "../data/portfolioData";

/* ==========================================================================
   FeaturedProjects — editorial case studies for the strongest work
   • Alternating asymmetric layouts (image left / image right).
   • Restrained 3D: a mouse-parallax sheen plus a small translateZ lift.
   • Honest labelling of illustrative visuals vs. prototype photographs.
   ========================================================================== */

export function FeaturedProjects() {
  return (
    <section id="work" className="relative scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeading />

        <div className="mt-14 space-y-20 sm:space-y-24 lg:space-y-28">
          {FEATURED_PROJECTS.map((project, i) => (
            <CaseStudy key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading() {
  return (
    <header className="max-w-3xl">
      <p className="rule-label">Selected work</p>
      <h2 className="mt-3 font-display text-headline font-bold text-[var(--content-primary)]">
        Three projects I can explain end to end
      </h2>
      <p className="mt-4 max-w-[62ch] text-body-lg text-[var(--content-muted)]">
        Each of these started as a question I couldn't answer from a textbook. The case
        notes below cover the problem, what I built myself, and what actually worked —
        with nothing claimed that isn't in the repository.
      </p>
    </header>
  );
}

function CaseStudy({ project, index }: { project: ProjectItem; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const flip = index % 2 === 1;

  /* Scroll-triggered reveal (runs once) */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -5, y: px * 7 });
  };

  const cs = project.caseStudy;

  return (
    <article
      ref={ref}
      className={`grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12 transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {/* ---------- Visual ---------- */}
      <div
        className={`lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      >
        <div className="perspective-1200">
          <div
            className="transform-style-3d relative overflow-hidden rounded-[24px] border border-[var(--line-subtle)] bg-[var(--surface-sunken)] shadow-[var(--shadow-lift)] transition-transform duration-200 ease-out"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: tilt.x || tilt.y ? "transform 120ms linear" : "transform 700ms cubic-bezier(0.2,0.8,0.2,1)",
            }}
          >
            <div className="relative aspect-[16/11]">
              <img
                src={project.image}
                alt={`${project.title} — ${project.tagline}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              {/* Editorial bottom scrim for legibility of overlaid meta */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <span className="rounded-full bg-black/55 px-3 py-1 font-mono text-[11px] font-medium text-white backdrop-blur-sm">
                  {project.category}
                </span>
                <span className="rounded-full bg-black/55 px-3 py-1 font-mono text-[11px] font-medium text-white backdrop-blur-sm">
                  {project.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {project.visualCaption && (
          <p className="mt-3 flex items-start gap-2 text-caption text-[var(--content-faint)]">
            <InfoIcon />
            <span>{project.visualCaption}</span>
          </p>
        )}
      </div>

      {/* ---------- Case notes ---------- */}
      <div className={`lg:col-span-6 ${flip ? "lg:order-1 lg:col-start-1 lg:row-start-1" : ""}`}>
        <p className="font-mono text-xs font-medium text-[var(--accent-text)]">
          {String(index + 1).padStart(2, "0")} — {project.category}
        </p>
        <h3 className="mt-2 font-display text-title font-bold text-[var(--content-primary)] sm:text-[26px]">
          {project.title}
        </h3>
        <p className="mt-2 text-body text-[var(--content-secondary)]">{project.tagline}</p>

        {cs && (
          <div className="mt-7 space-y-7">
            <Block label="The problem">{cs.problem}</Block>

            <Block label="What I built">
              <ul className="space-y-2.5">
                {cs.built.map((item, i) => (
                  <li key={i} className="flex gap-3 text-body text-[var(--content-secondary)]">
                    <span
                      aria-hidden="true"
                      className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-solid)]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block label="How it works">{cs.solution}</Block>

            {cs.outcome && (
              <div className="rounded-2xl border border-[var(--line-subtle)] bg-[var(--surface-sunken)] p-5">
                <p className="rule-label">Where it stands</p>
                <p className="mt-2 text-body text-[var(--content-secondary)]">{cs.outcome}</p>
              </div>
            )}
          </div>
        )}

        {/* Tech tags */}
        <div className="mt-7 flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="rounded-lg border border-[var(--line-subtle)] bg-[var(--surface-raised)] px-2.5 py-1 font-mono text-[11px] text-[var(--content-secondary)]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        {project.links.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-solid)] px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[var(--accent-solidHover)]"
              >
                {link.label}
                <ExternalIcon />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="rule-label">{label}</h4>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-[2px] h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  );
}

export default FeaturedProjects;
