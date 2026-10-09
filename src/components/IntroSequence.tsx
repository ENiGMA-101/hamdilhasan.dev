import { useEffect, useRef, useState } from "react";
import HHPLogo from "./HHPLogo";

/* ==========================================================================
   IntroSequence — the signature opening
   --------------------------------------------------------------------------
   1. Dark canvas with a technical grid and a single light source.
   2. The HHP monogram rotates in on the X axis with a specular sweep.
   3. The full name resolves from a blur, letter-spaced and tracked in.
   4. The whole plate scales up and fades, revealing the hero beneath.

   • ~2.4s total, skippable with the button or the Escape/Space keys.
   • Runs once per session (sessionStorage) so refreshes aren't punished.
   • Entirely skipped when prefers-reduced-motion is set.
   • Never blocks the page: the hero is already mounted behind it.
   ========================================================================== */

const DURATION = 2400;

interface IntroSequenceProps {
  onDone: () => void;
}

export function IntroSequence({ onDone }: IntroSequenceProps) {
  const [phase, setPhase] = useState<"mark" | "name" | "exit">("mark");
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setPhase("exit");
    window.setTimeout(onDone, 620);
  };

  useEffect(() => {
    /* Reduced motion: skip straight through. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      doneRef.current = true;
      onDone();
      return;
    }

    const t1 = window.setTimeout(() => setPhase("name"), 760);
    const t2 = window.setTimeout(() => setPhase("exit"), DURATION);
    const t3 = window.setTimeout(onDone, DURATION + 620);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        finish();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exiting = phase === "exit";

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[var(--surface-canvas)] transition-all duration-[600ms] ease-[cubic-bezier(0.7,0,0.3,1)] ${
        exiting ? "pointer-events-none scale-[1.12] opacity-0" : "scale-100 opacity-100"
      }`}
    >
      {/* Light source + grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--glow-ambient)] blur-[120px]" />
        <div className="bg-tech-grid absolute inset-0" />
      </div>

      {/* Specular sweep across the monogram */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          phase === "mark" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[70px] -translate-x-1/2 -translate-y-1/2 rotate-[24deg] bg-gradient-to-b from-transparent via-white/25 to-transparent blur-md animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center px-6 text-center">
        {/* Monogram with a genuine 3D entrance */}
        <div
          className="transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform:
              phase === "mark"
                ? "perspective(900px) rotateX(28deg) scale(0.86)"
                : "perspective(900px) rotateX(0deg) scale(1)",
            opacity: phase === "mark" ? 0 : 1,
          }}
        >
          <HHPLogo size={150} showGlow className="drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)]" />
        </div>

        {/* Identity line */}
        <div
          className={`mt-7 transition-all duration-700 ${
            phase === "mark" ? "translate-y-3 opacity-0 blur-sm" : "translate-y-0 opacity-100 blur-0"
          }`}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--content-faint)]">
            Initialising
          </p>
          <p className="mt-2.5 font-display text-[22px] font-bold uppercase tracking-[0.16em] text-[var(--content-primary)] sm:text-[30px]">
            Hamdil Hasan Partho
          </p>
          <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--content-muted)]">
            Computer Science &amp; Engineering
          </p>
        </div>
      </div>

      {/* Progress + skip */}
      <div className="absolute bottom-9 left-0 right-0 flex flex-col items-center gap-3.5 px-6">
        <div className="h-px w-44 overflow-hidden bg-[var(--line-subtle)]">
          <div
            className="h-full bg-[var(--accent-solid)]"
            style={{
              animation: `hhp-intro-progress ${DURATION}ms linear forwards`,
            }}
          />
        </div>
        <button
          type="button"
          onClick={finish}
          className="rounded-lg px-3 py-1.5 font-mono text-[11px] text-[var(--content-muted)] transition hover:text-[var(--content-primary)]"
        >
          Skip intro <span className="text-[var(--content-faint)]">[Esc]</span>
        </button>
      </div>

      <style>{`@keyframes hhp-intro-progress{from{width:0}to{width:100%}}`}</style>
    </div>
  );
}

export default IntroSequence;
