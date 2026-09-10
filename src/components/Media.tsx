import { NOTES, PHOTOS } from "../data";
import { SectionHead } from "./Sections";

/* ------------------------------------------------ 04 · PHOTOGRAPHY */
export function Gallery() {
  return (
    <section
      id="photography"
      className="border-y border-line bg-ink-2/40 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          n="04"
          kicker="Personal interest"
          title={
            <>
              When I&rsquo;m not coding,
              <br className="hidden md:block" /> I take{" "}
              <span className="text-amber">photos.</span>
            </>
          }
          aside={
            <p className="max-w-xs pb-1 text-sm leading-relaxed text-muted">
              Photography is my way to slow down and notice the details — the
              same habit that makes better software.
            </p>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PHOTOS.map((ph, i) => (
            <figure
              key={ph.src}
              className={`reveal group relative overflow-hidden border border-line bg-panel ${
                i === 0 ? "sm:col-span-2 lg:row-span-2" : ""
              } ${i === 1 ? "lg:row-span-2" : ""}`}
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <div className={`w-full overflow-hidden ${i === 0 || i === 1 ? "h-full min-h-[320px] lg:min-h-[420px]" : "aspect-[4/3]"}`}>
                <img
                  src={ph.src}
                  alt={ph.alt}
                  loading="lazy"
                  className="h-full w-full object-cover saturate-[0.8] transition-all duration-[1.8s] ease-out group-hover:scale-[1.07] group-hover:saturate-100"
                />
              </div>
              {/* corner ticks */}
              <span className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 border-l border-t border-paper/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="pointer-events-none absolute bottom-2.5 right-2.5 h-3.5 w-3.5 border-b border-r border-paper/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="pointer-events-none absolute left-2.5 top-2.5 font-mono text-[9px] tracking-[0.2em] text-mint opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                ◉ AF
              </span>
              {/* caption bar */}
              <figcaption className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-3 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-4 pt-10 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="font-display text-sm font-500 text-paper">
                  {ph.caption}
                </span>
                <span className="font-mono text-[9.5px] tracking-[0.2em] text-amber">
                  {ph.meta}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="reveal mt-6 text-right font-mono text-[10px] uppercase tracking-[0.25em] text-dim" style={{ "--reveal-delay": "200ms" } as React.CSSProperties}>
          Shot on whatever was in my pocket — the eye matters more than the gear.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------ 05 · WRITING */
const CATEGORY_COLORS: Record<string, string> = {
  Personal: "text-mint border-mint/40",
  AI: "text-amber border-amber/40",
  Robotics: "text-rust border-rust/40",
  Web: "text-paper border-line",
};

export function Writing() {
  return (
    <section id="writing" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <SectionHead
        n="05"
        kicker="From the notebook"
        title={
          <>
            Notes, experiments
            <br className="hidden md:block" /> &amp;{" "}
            <span className="text-amber">lessons.</span>
          </>
        }
      />

      <div className="border-t border-line">
        {NOTES.map((note, i) => (
          <a
            key={note.title}
            href="#writing"
            aria-label={`Read note: ${note.title}`}
            className="reveal group grid cursor-default gap-3 border-b border-line py-7 transition-all duration-500 hover:bg-panel/50 hover:pl-4 md:grid-cols-[150px_1fr_auto] md:items-center md:gap-8 md:py-8 md:hover:pl-6"
            style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
          >
            <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2">
              <span
                className={`border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.2em] ${
                  CATEGORY_COLORS[note.category] ?? "text-muted border-line"
                }`}
              >
                {note.category}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                {note.date}
              </span>
            </div>
            <div>
              <h3 className="font-display text-lg font-600 leading-snug text-paper transition-colors duration-300 group-hover:text-amber md:text-xl">
                {note.title}
              </h3>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">
                {note.excerpt}
              </p>
            </div>
            <div className="flex items-center gap-3 md:flex-col md:items-end md:gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                {note.read} read
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber">
                Read →
              </span>
            </div>
          </a>
        ))}
      </div>

      <p className="reveal mt-6 font-mono text-[11px] text-dim" style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
        <span className="text-amber">$</span> the full blog engine shipped in v1
        (Flask + SQLite) — long-form posts are moving here soon.
      </p>
    </section>
  );
}
