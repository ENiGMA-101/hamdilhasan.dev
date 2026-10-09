import { RESEARCH_TIMELINE } from "../data/portfolioData";

/* ==========================================================================
   Research & academic timeline — verified activities only
   ========================================================================== */

export function ResearchTimeline() {
  return (
    <section id="research" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <header className="max-w-2xl">
          <p className="rule-label">Research &amp; activities</p>
          <h2 className="mt-3 font-display text-headline font-bold text-[var(--content-primary)]">
            Investigations &amp; team work
          </h2>
          <p className="mt-4 text-body-lg text-[var(--content-muted)]">
            Academic research and project leadership carried out at the University of Asia
            Pacific. Each entry links to its repository where one is public.
          </p>
        </header>

        <ol className="mt-14 space-y-10 border-l border-[var(--line-subtle)] pl-6 sm:pl-8">
          {RESEARCH_TIMELINE.map((item) => (
            <li key={item.id} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[calc(1.5rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--accent-solid)] bg-[var(--surface-canvas)] sm:-left-[calc(2rem+5px)]"
              />
              <article className="rounded-[22px] border border-[var(--line-subtle)] bg-[var(--surface-raised)] p-6 shadow-[var(--shadow-card)] transition hover:border-[var(--accent-solid)] sm:p-7">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="rounded-full bg-[var(--accent-softBg)] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-[var(--accent-text)]">
                    {item.type}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--content-faint)]">{item.period}</span>
                  <span className="font-mono text-[11px] text-[var(--content-faint)]">
                    · {item.institution}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-title font-bold text-[var(--content-primary)]">
                  {item.title}
                </h3>
                <p className="mt-1 text-body font-semibold text-[var(--accent-text)]">{item.role}</p>
                <p className="mt-3 max-w-[70ch] text-body text-[var(--content-secondary)]">
                  {item.summary}
                </p>

                <h4 className="mt-6 rule-label">Contributions</h4>
                <ul className="mt-3 space-y-2">
                  {item.contributions.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-body text-[var(--content-secondary)]">
                      <span
                        aria-hidden="true"
                        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--aqua-solid)]"
                      />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-[var(--line-subtle)] pt-5">
                  {item.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg bg-[var(--surface-sunken)] px-2.5 py-1 font-mono text-[11px] text-[var(--content-secondary)]"
                    >
                      {t}
                    </span>
                  ))}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent-text)] transition hover:underline"
                    >
                      Repository
                      <ExternalIcon />
                    </a>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
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

export default ResearchTimeline;
