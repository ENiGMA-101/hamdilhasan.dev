import { FOCUS, PROJECTS, TOOLBOX } from "../data";

export function SectionHead({
  n,
  kicker,
  title,
  aside,
}: {
  n: string;
  kicker: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="reveal mb-12 md:mb-16">
      <div className="mb-6 flex items-center gap-4">
        <span className="font-display text-sm font-600 text-amber">{n}</span>
        <span className="h-px w-10 bg-amber/50" />
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          {kicker}
        </p>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-3xl font-display text-3xl font-600 uppercase leading-[1.08] tracking-tight text-paper md:text-5xl">
          {title}
        </h2>
        {aside}
      </div>
    </div>
  );
}

/* ------------------------------------------------ 01 · ABOUT */
const STATS = [
  { value: "04+", label: "Projects built & shipped" },
  { value: "15+", label: "Tools in the toolbox" },
  { value: "03", label: "Fields — SW · AI · Robotics" },
  { value: "∞", label: "Curiosity, still compounding" },
];

const TAGS = [
  "Python",
  "Web Development",
  "AI / ML",
  "Robotics",
  "Photography",
  "Problem Solving",
  "Creative Projects",
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <SectionHead n="01" kicker="The short version" title={<>About me</>} />
      <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        {/* sticky headline */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h3 className="reveal font-display text-2xl font-600 leading-snug text-paper md:text-[2.1rem] md:leading-[1.25]">
            Curious enough to <span className="text-amber">explore.</span>
            <br />
            Practical enough to <span className="text-outline">build.</span>
          </h3>
          <p className="reveal mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-dim" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            {`// from "what if?" to "it works"`}
          </p>
        </div>

        <div>
          <p className="reveal text-lg leading-relaxed text-muted">
            I&rsquo;m{" "}
            <span className="font-semibold text-paper">Hamdil Hasan</span> — a
            Computer Science &amp; Engineering undergraduate at{" "}
            <span className="text-paper">UAP, Dhaka</span>, interested in
            practical software, databases, IoT, web development and visual
            storytelling. I like taking ideas from{" "}
            <em className="text-amber not-italic">&ldquo;what if?&rdquo;</em> to
            something that actually works — Python and Flask applications, AI
            concepts, Arduino prototypes, tools for everyday problems.
          </p>
          <p className="reveal mt-5 text-lg leading-relaxed text-muted" style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
            This site is my corner of the internet: a living record of projects,
            lessons learned, experiments and moments from everyday life — part
            workshop log, part photo album.
          </p>

          {/* info cards */}
          <div className="reveal mt-9 grid gap-4 sm:grid-cols-2" style={{ "--reveal-delay": "180ms" } as React.CSSProperties}>
            <div className="group border border-line bg-panel/70 p-5 transition-colors duration-300 hover:border-amber/50">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber">
                Education
              </p>
              <h4 className="mt-3 font-display text-sm font-600 uppercase leading-snug text-paper">
                Computer Science
                <br />&amp; Engineering
              </h4>
              <p className="mt-2 text-sm text-muted">
                Undergraduate · UAP, Dhaka
              </p>
            </div>
            <div className="group border border-line bg-panel/70 p-5 transition-colors duration-300 hover:border-mint/50">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-mint">
                Based in
              </p>
              <h4 className="mt-3 font-display text-sm font-600 uppercase leading-snug text-paper">
                Dhaka,
                <br />
                Bangladesh
              </h4>
              <p className="mt-2 text-sm text-muted">UTC+6 · building worldwide</p>
            </div>
          </div>

          {/* tags */}
          <div className="reveal mt-9 flex flex-wrap gap-2.5" style={{ "--reveal-delay": "240ms" } as React.CSSProperties}>
            {TAGS.map((t) => (
              <span
                key={t}
                className="cursor-default border border-line px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-amber hover:text-amber"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* stats strip */}
      <div className="reveal mt-20 grid grid-cols-2 border border-line bg-ink-2/60 md:grid-cols-4" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`group p-6 transition-colors duration-300 hover:bg-panel md:p-8 ${
              i > 0 ? "border-l border-line-soft max-md:border-l-0" : ""
            } ${i >= 2 ? "max-md:border-t max-md:border-line-soft" : ""} ${i === 2 ? "md:border-l" : ""}`}
          >
            <p className="font-display text-3xl font-800 text-paper transition-colors duration-300 group-hover:text-amber md:text-4xl">
              {s.value}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------ 02 · WORK */
export function Work() {
  return (
    <section id="work" className="border-y border-line bg-ink-2/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          n="02"
          kicker="Selected work"
          title={
            <>
              What I&rsquo;m <span className="text-amber">building.</span>
            </>
          }
          aside={
            <a
              href="https://github.com/ENiGMA-101"
              target="_blank"
              rel="noreferrer"
              className="u-slide pb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-amber"
            >
              All code on GitHub ↗
            </a>
          }
        />

        <div className="border-t border-line">
          {PROJECTS.map((p, i) => (
            <a
              key={p.index}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="reveal group relative grid gap-4 border-b border-line py-8 transition-all duration-500 hover:bg-panel/70 hover:pl-5 md:grid-cols-[72px_1fr_auto] md:items-center md:gap-8 md:py-10 md:hover:pl-8"
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <span className="pointer-events-none absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-amber transition-transform duration-500 group-hover:scale-y-100" />
              <span className="font-display text-sm font-600 text-dim transition-colors duration-300 group-hover:text-amber">
                /{p.index}
              </span>
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em]">
                  <span className="text-mint">{p.kind}</span>
                  <span className="text-dim">· {p.year}</span>
                  {p.featured && (
                    <span className="flex items-center gap-1.5 text-amber">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber" /> Featured
                    </span>
                  )}
                </div>
                <h3 className="font-display text-xl font-600 uppercase tracking-tight text-paper transition-colors duration-300 group-hover:text-amber md:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="border border-line-soft bg-ink/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors duration-300 group-hover:border-line group-hover:text-paper/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-3">
                <span className="grid h-11 w-11 place-items-center border border-line text-lg text-muted transition-all duration-300 group-hover:border-amber group-hover:bg-amber group-hover:text-ink">
                  ↗
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                  {p.linkLabel}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------ 03 · FOCUS */
export function Focus() {
  return (
    <section id="focus" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <SectionHead
        n="03"
        kicker="Where I'm headed"
        title={
          <>
            Growing from student to{" "}
            <span className="text-amber">problem solver.</span>
          </>
        }
      />
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="space-y-0 border-t border-line">
          {FOCUS.map((f, i) => (
            <div
              key={f.n}
              className="reveal group border-b border-line py-7 transition-all duration-500 hover:pl-4"
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <div className="flex items-baseline gap-5">
                <span className="font-mono text-xs text-amber">{f.n}</span>
                <div>
                  <h3 className="font-display text-lg font-600 uppercase tracking-tight text-paper transition-colors duration-300 group-hover:text-amber md:text-xl">
                    {f.title}
                  </h3>
                  <p className="mt-2.5 max-w-md leading-relaxed text-muted">
                    {f.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* toolbox */}
        <div className="reveal border border-line bg-panel/60 p-6 md:p-8" style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
          <div className="mb-7 flex items-center justify-between border-b border-line-soft pb-5">
            <h3 className="font-display text-lg font-600 uppercase text-paper">
              The toolbox
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-dim">
              v2026.1
            </span>
          </div>
          <div className="grid gap-7 sm:grid-cols-2">
            {TOOLBOX.map((g, i) => (
              <div key={g.group}>
                <p className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-amber">
                  <span className="text-dim">0{i + 1}</span> {g.group}
                </p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <span
                      key={t}
                      className="border border-line-soft bg-ink/50 px-2.5 py-1 text-[12.5px] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-mint/60 hover:text-mint"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-7 border-t border-line-soft pt-5 font-mono text-[11px] leading-relaxed text-dim">
            <span className="text-mint">$</span> currently learning: deeper ML
            practice, embedded systems, and whatever the next &ldquo;what
            if?&rdquo; demands.
          </p>
        </div>
      </div>
    </section>
  );
}
