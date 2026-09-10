import { PORTRAIT, PROFILE, TICKER } from "../data";
import { useScramble, useTypewriter } from "../hooks";

function Terminal() {
  const { display, typing } = useTypewriter(
    ["whoami", "developer & builder — CSE undergrad @ UAP"],
    46,
    420
  );
  return (
    <div className="mb-7 max-w-xl border border-line bg-ink-2/80 p-4 font-mono text-[12.5px] leading-relaxed shadow-[0_0_40px_rgba(245,184,65,0.05)]">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rust/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-mint/80" />
        <span className="ml-2 text-[10px] tracking-[0.2em] text-dim">
          enigma101@dhaka — bash
        </span>
      </div>
      <p className="text-muted">
        <span className="text-mint">enigma101@dhaka</span>
        <span className="text-dim">:~$</span>{" "}
        <span className="text-paper">{display[0] ?? ""}</span>
        {display.length < 2 && (
          <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 animate-blink bg-amber" />
        )}
      </p>
      {display[1] !== undefined && (
        <p className="text-paper/90">
          <span className="text-amber">→</span> {display[1]}
          {typing && (
            <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 animate-blink bg-amber" />
          )}
        </p>
      )}
    </div>
  );
}

function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
      {/* orbit rings */}
      <div className="pointer-events-none absolute -inset-6 lg:-inset-10">
        <div className="absolute inset-0 animate-orbit-slow rounded-full border border-dashed border-line" />
        <div className="absolute inset-6 animate-orbit-rev rounded-full border border-line-soft lg:inset-9">
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-amber shadow-[0_0_12px_rgba(245,184,65,0.9)]" />
        </div>
      </div>

      {/* HUD frame */}
      <div className="relative aspect-[4/5] overflow-hidden border border-line bg-panel">
        {/* corner brackets */}
        {[
          "left-2 top-2 border-l-2 border-t-2",
          "right-2 top-2 border-r-2 border-t-2",
          "bottom-2 left-2 border-b-2 border-l-2",
          "bottom-2 right-2 border-b-2 border-r-2",
        ].map((c) => (
          <span key={c} className={`absolute z-10 h-5 w-5 border-amber ${c}`} />
        ))}
        {/* scanline */}
        <span className="absolute left-0 z-10 h-px w-full animate-scan bg-mint/70 shadow-[0_0_14px_rgba(143,227,192,0.8)]" />
        {/* labels */}
        <span className="absolute left-4 top-4 z-10 font-mono text-[9.5px] tracking-[0.22em] text-mint">
          CAM_01 · LIVE
        </span>
        <span className="absolute right-4 top-4 z-10 flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.22em] text-rust">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-rust" /> REC
        </span>
        <span className="absolute bottom-4 left-4 z-10 font-mono text-[9.5px] tracking-[0.18em] text-paper/70">
          23.8103° N, 90.4125° E
        </span>
        <span className="absolute bottom-4 right-4 z-10 font-mono text-[9.5px] tracking-[0.18em] text-paper/70">
          DHAKA / BD
        </span>

        <img
          src={PORTRAIT}
          alt="Hamdil Hasan"
          className="h-full w-full object-cover saturate-[0.85] transition-transform duration-[2.5s] ease-out hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/20" />
      </div>

      {/* badge */}
      <div className="absolute -bottom-5 -left-3 border border-line bg-ink-2 px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.45)] lg:-left-8">
        <p className="font-mono text-[10px] tracking-[0.25em] text-amber">
          {PROFILE.handle}
        </p>
        <p className="mt-1 font-display text-sm font-600 uppercase leading-tight text-paper">
          Developer
          <br />&amp; Builder
        </p>
      </div>

      {/* vertical year */}
      <p className="absolute -right-7 top-0 hidden origin-top-right rotate-90 font-mono text-[10px] tracking-[0.5em] text-dim md:block">
        PORTFOLIO — 2026
      </p>
    </div>
  );
}

export default function Hero() {
  const first = useScramble("HAMDIL", 400);
  const last = useScramble("HASAN", 900);

  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-8">
        <div>
          <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
            <span className="h-2 w-2 rounded-full bg-mint animate-pulse-dot" />
            Hello, I&rsquo;m {PROFILE.name}
          </p>

          <Terminal />

          <h1 className="font-display font-800 uppercase leading-[0.95] tracking-tight">
            <span className="block text-[15vw] text-paper sm:text-7xl lg:text-[5.2rem] xl:text-[5.8rem]">
              {first || "\u00A0"}
            </span>
            <span className="block text-[15vw] text-outline sm:text-7xl lg:text-[5.2rem] xl:text-[5.8rem]">
              {last || "\u00A0"}
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted md:text-xl">
            I build ideas into{" "}
            <em className="font-semibold not-italic text-amber">reality.</em>{" "}
            <span className="text-paper/85">
              CSE undergraduate at UAP
            </span>{" "}
            making practical software — and exploring AI, robotics and creative
            technology along the way.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 bg-amber px-6 py-3.5 font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-paper hover:shadow-[0_14px_35px_rgba(245,184,65,0.25)]"
            >
              Explore my work
              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
            <a
              href="#contact"
              className="u-slide font-mono text-[12px] uppercase tracking-[0.18em] text-paper transition-colors hover:text-amber"
            >
              Start a conversation →
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line-soft pt-6">
            {[
              { label: "GitHub", href: PROFILE.github, ext: true },
              { label: "LinkedIn", href: PROFILE.linkedin, ext: true },
              { label: "Email", href: `mailto:${PROFILE.email}`, ext: false },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.ext ? { target: "_blank", rel: "noreferrer" } : {})}
                className="u-slide font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-mint"
              >
                {l.label} <span className="text-amber">↗</span>
              </a>
            ))}
          </div>
        </div>

        <Portrait />
      </div>

      {/* scroll cue */}
      <div className="mx-auto mt-16 flex max-w-7xl items-center gap-4 px-5 pb-8 md:px-8">
        <span className="font-mono text-[10px] tracking-[0.4em] text-dim">
          SCROLL
        </span>
        <span className="relative h-px flex-1 overflow-hidden bg-line-soft">
          <span className="absolute inset-y-0 w-1/4 animate-[marquee_2.4s_linear_infinite] bg-amber/60" />
        </span>
        <span className="animate-bounce text-amber">↓</span>
      </div>

      {/* ticker */}
      <div className="relative border-y border-line bg-ink-2/70 py-3.5">
        <div className="flex overflow-hidden">
          <div className="flex min-w-max animate-marquee items-center">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span
                key={i}
                className="flex items-center font-mono text-[11px] uppercase tracking-[0.28em] text-muted"
              >
                <span className="px-6">{t}</span>
                <span className="text-amber">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
