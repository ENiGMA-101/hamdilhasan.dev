import { useState } from "react";
import { SKILL_CATEGORIES, SKILL_MARQUEE } from "../data/portfolioData";

/* ==========================================================================
   Skills — continuous marquee track + tabbed category detail
   No proficiency percentages: only the tool and how it is actually used.
   ========================================================================== */

export function SkillsSection() {
  const [active, setActive] = useState(0);
  const category = SKILL_CATEGORIES[active];

  return (
    <section
      id="focus"
      className="relative scroll-mt-24 overflow-hidden border-b border-[var(--line-subtle)] bg-[var(--surface-sunken)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <header className="max-w-2xl">
          <p className="rule-label">Toolbox</p>
          <h2 className="mt-3 font-display text-headline font-bold text-[var(--content-primary)]">
            What I build with
          </h2>
          <p className="mt-4 text-body-lg text-[var(--content-muted)]">
            Grouped by what the tool is for. Every entry here appears in a project or a
            course I've actually completed — no invented proficiency scores.
          </p>
        </header>

        {/* Continuous marquee of core tools */}
        <div
          className="hhp-marquee-host relative mt-12 overflow-hidden"
          aria-hidden="true"
        >
          <div className="hhp-marquee" style={{ ["--marquee-duration" as string]: "46s" }}>
            {[...SKILL_MARQUEE, ...SKILL_MARQUEE].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="mx-1.5 flex shrink-0 items-center gap-2 rounded-full border border-[var(--line-subtle)] bg-[var(--surface-raised)] px-4 py-2 font-mono text-[13px] text-[var(--content-secondary)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-solid)]" />
                {skill}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--surface-sunken)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--surface-sunken)] to-transparent" />
        </div>

        {/* Category tabs */}
        <div
          role="tablist"
          aria-label="Skill categories"
          className="mt-12 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6"
        >
          {SKILL_CATEGORIES.map((cat, i) => {
            const isActive = i === active;
            return (
              <button
                key={cat.title}
                role="tab"
                type="button"
                id={`skill-tab-${i}`}
                aria-selected={isActive}
                aria-controls={`skill-panel-${i}`}
                onClick={() => setActive(i)}
                className={`rounded-2xl border p-3.5 text-left transition ${
                  isActive
                    ? "border-[var(--accent-solid)] bg-[var(--accent-softBg)]"
                    : "border-[var(--line-subtle)] bg-[var(--surface-raised)] hover:border-[var(--line-strong)]"
                }`}
              >
                <span
                  className={`block font-display text-[13px] font-bold leading-tight ${
                    isActive ? "text-[var(--accent-text)]" : "text-[var(--content-primary)]"
                  }`}
                >
                  {cat.title}
                </span>
                <span className="mt-1 block font-mono text-[10px] text-[var(--content-faint)]">
                  {cat.skills.length} tools
                </span>
              </button>
            );
          })}
        </div>

        {/* Active panel */}
        <div
          role="tabpanel"
          id={`skill-panel-${active}`}
          aria-labelledby={`skill-tab-${active}`}
          className="mt-6 rounded-[24px] border border-[var(--line-subtle)] bg-[var(--surface-raised)] p-6 shadow-[var(--shadow-card)] sm:p-8"
        >
          <div className="flex flex-col gap-2 border-b border-[var(--line-subtle)] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-display text-title font-bold text-[var(--content-primary)]">
                {category.title}
              </h3>
              <p className="mt-1.5 max-w-[60ch] text-body text-[var(--content-muted)]">
                {category.description}
              </p>
            </div>
            <span className="self-start rounded-full border border-[var(--line-subtle)] bg-[var(--surface-sunken)] px-3 py-1 font-mono text-[11px] text-[var(--content-muted)] sm:self-auto">
              {category.skills.length} entries
            </span>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {category.skills.map((skill) => (
              <li
                key={skill.name}
                className={`rounded-2xl border p-4 transition ${
                  skill.core
                    ? "border-[var(--accent-solid)] bg-[var(--accent-softBg)]"
                    : "border-[var(--line-subtle)] bg-[var(--surface-sunken)]"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-display text-[14px] font-bold text-[var(--content-primary)]">
                    {skill.name}
                  </h4>
                  {skill.core && (
                    <span className="rounded bg-[var(--accent-solid)] px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide text-white">
                      Core
                    </span>
                  )}
                </div>
                {skill.note && (
                  <p className="mt-1 font-mono text-[11px] text-[var(--content-muted)]">{skill.note}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
