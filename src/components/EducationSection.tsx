import { EDUCATION } from "../data/portfolioData";

/* ==========================================================================
   Education — degree programme and coursework
   No graduation dates or results are claimed anywhere in this section.
   ========================================================================== */

export function EducationSection() {
  return (
    <section id="education" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <header className="max-w-2xl">
          <p className="rule-label">Education</p>
          <h2 className="mt-3 font-display text-headline font-bold text-[var(--content-primary)]">
            {EDUCATION.degree}
          </h2>
          <p className="mt-4 text-body-lg text-[var(--content-muted)]">{EDUCATION.description}</p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Programme card */}
          <div className="lg:col-span-5">
            <div className="h-full rounded-[24px] border border-[var(--line-subtle)] bg-[var(--surface-raised)] p-6 shadow-[var(--shadow-card)] sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line-subtle)] bg-[var(--surface-sunken)] px-3 py-1 font-mono text-[11px] text-[var(--content-muted)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--aqua-solid)] opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--aqua-solid)]" />
                </span>
                {EDUCATION.status}
              </span>

              <h3 className="mt-5 font-display text-title font-bold text-[var(--content-primary)]">
                {EDUCATION.institution}
              </h3>
              <p className="mt-1.5 text-body text-[var(--content-secondary)]">
                {EDUCATION.department}
              </p>
              <p className="mt-1 font-mono text-caption text-[var(--content-faint)]">
                {EDUCATION.location}
              </p>

              <div className="mt-7 border-t border-[var(--line-subtle)] pt-6">
                <p className="rule-label">Areas of focus</p>
                <p className="mt-2 text-body text-[var(--content-secondary)]">{EDUCATION.focus}</p>
              </div>
            </div>
          </div>

          {/* Coursework */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-[24px] border border-[var(--line-subtle)] bg-[var(--surface-raised)] p-6 shadow-[var(--shadow-card)] sm:p-8">
              <p className="rule-label">Coursework completed or in progress</p>
              <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {EDUCATION.coursework.map((course) => (
                  <li
                    key={course}
                    className="flex items-center gap-2.5 rounded-xl border border-[var(--line-subtle)] bg-[var(--surface-sunken)] px-3.5 py-3 text-caption font-medium text-[var(--content-secondary)]"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-solid)]"
                    />
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EducationSection;
