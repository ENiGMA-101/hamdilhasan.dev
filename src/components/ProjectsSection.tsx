import { useMemo, useState } from "react";
import AutoCarousel from "./AutoCarousel";
import { GitHubIcon } from "./SocialIcons";
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  SUPPORTING_PROJECTS,
  type ProjectCategory,
  type ProjectItem,
} from "../data/portfolioData";

/* ==========================================================================
   ProjectsSection — compact gallery for the supporting work
   Uses the shared AutoCarousel so it inherits the seamless right-to-left
   motion, hover pause, drag support and reduced-motion fallback.
   ========================================================================== */

export function ProjectsSection() {
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");

  const projects = useMemo(
    () => (filter === "All" ? SUPPORTING_PROJECTS : SUPPORTING_PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  const counts = useMemo(() => {
    const map = new Map<string, number>([["All", SUPPORTING_PROJECTS.length]]);
    SUPPORTING_PROJECTS.forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1));
    return map;
  }, []);

  return (
    <section id="projects" className="relative scroll-mt-24 border-y border-[var(--line-subtle)] bg-[var(--surface-sunken)] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="rule-label">Also built</p>
            <h2 className="mt-3 font-display text-headline font-bold text-[var(--content-primary)]">
              Other projects &amp; experiments
            </h2>
            <p className="mt-4 text-body-lg text-[var(--content-muted)]">
              Smaller builds and work in progress. Drag the track, use the arrows, or hover
              to pause it.
            </p>
          </div>

          {/* Category filters */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2"
          >
            {PROJECT_CATEGORIES.map((cat) => {
              const isActive = filter === cat;
              const count = counts.get(cat) ?? 0;
              if (cat !== "All" && count === 0) return null;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-3.5 py-2 text-[13px] font-medium transition ${
                    isActive
                      ? "border-[var(--accent-solid)] bg-[var(--accent-solid)] text-white"
                      : "border-[var(--line-strong)] bg-[var(--surface-raised)] text-[var(--content-secondary)] hover:border-[var(--accent-solid)] hover:text-[var(--accent-text)]"
                  }`}
                >
                  {cat}
                  <span className={`ml-1.5 font-mono text-[11px] ${isActive ? "text-white/70" : "text-[var(--content-faint)]"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </header>

        <div className="mt-12">
          {projects.length === 0 ? (
            <EmptyState />
          ) : (
            <AutoCarousel
              label="Supporting projects"
              speed={40}
              gap={24}
              edgeFade={false}
              railClassName="-mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10"
            >
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </AutoCarousel>
          )}
        </div>

        <p className="mt-4 text-center text-caption text-[var(--content-faint)]">
          Showing {projects.length} of {PROJECTS.length} projects · the three case studies
          above are the ones I'd walk you through first.
        </p>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article className="group flex w-[290px] flex-col overflow-hidden rounded-2xl border border-[var(--line-subtle)] bg-[var(--surface-raised)] shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-solid)] hover:shadow-[var(--shadow-lift)] sm:w-[330px]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-sunken)]">
        <img
          src={project.image}
          alt={`${project.title} — ${project.tagline}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] font-medium text-white backdrop-blur-sm">
            {project.category}
          </span>
          {project.unverified && (
            <span className="rounded-full bg-amber-500/90 px-2.5 py-1 font-mono text-[10px] font-semibold text-black backdrop-blur-sm">
              Unverified
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[17px] font-bold leading-snug text-[var(--content-primary)]">
          {project.title}
        </h3>
        <p className="mt-1.5 text-caption text-[var(--content-muted)]">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-md bg-[var(--surface-sunken)] px-2 py-0.5 font-mono text-[10px] text-[var(--content-secondary)]"
            >
              {t}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="rounded-md bg-[var(--surface-sunken)] px-2 py-0.5 font-mono text-[10px] text-[var(--content-faint)]">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center gap-3 border-t border-[var(--line-subtle)] pt-4">
          {project.links.length > 0 ? (
            project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent-text)] transition hover:underline"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                {l.label.replace("View ", "").replace(" repository", "")}
              </a>
            ))
          ) : (
            <span className="font-mono text-[11px] text-[var(--content-faint)]">
              {project.unverified ? "Repository not public yet" : "Repository private / coursework"}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--line-strong)] bg-[var(--surface-raised)] p-12 text-center">
      <p className="font-display text-lg font-bold text-[var(--content-primary)]">
        No projects in this category yet
      </p>
      <p className="mx-auto mt-2 max-w-md text-body text-[var(--content-muted)]">
        Try another filter, or add one in{" "}
        <code className="rounded bg-[var(--surface-sunken)] px-1.5 py-0.5 font-mono text-[12px]">
          src/data/portfolioData.ts
        </code>
        .
      </p>
    </div>
  );
}

export default ProjectsSection;
