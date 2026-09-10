import { useState } from "react";
import { PROFILE } from "../data";

const SOCIALS = [
  {
    label: "GitHub",
    value: "@ENiGMA-101",
    href: PROFILE.github,
    note: "code, experiments & source",
  },
  {
    label: "LinkedIn",
    value: "hamdil-hasan-p101",
    href: PROFILE.linkedin,
    note: "professional story & updates",
  },
  {
    label: "Email",
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    note: "the fastest way to reach me",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — mailto link still works */
    }
  };

  return (
    <section id="contact" className="relative border-t border-line bg-ink-2/50">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="reveal mb-10 flex items-center gap-4">
          <span className="font-display text-sm font-600 text-amber">06</span>
          <span className="h-px w-10 bg-amber/50" />
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
            Let&rsquo;s make something
          </p>
        </div>

        <h2 className="reveal font-display font-800 uppercase leading-[1.02] tracking-tight">
          <span className="block text-4xl text-paper sm:text-6xl lg:text-7xl">
            Have an idea worth
          </span>
          <span className="block text-4xl text-outline sm:text-6xl lg:text-7xl">
            exploring<span className="text-amber">?</span>
          </span>
        </h2>

        <p className="reveal mt-8 max-w-xl text-lg leading-relaxed text-muted" style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
          Tell me what you&rsquo;re working on, what you&rsquo;re learning, or
          what you want to build next. Projects, collaborations, photography —
          or just saying hello.
        </p>

        <div className="reveal mt-10 flex flex-wrap items-center gap-5" style={{ "--reveal-delay": "180ms" } as React.CSSProperties}>
          <a
            href={`mailto:${PROFILE.email}`}
            className="group inline-flex items-center gap-3 bg-amber px-7 py-4 font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-paper hover:shadow-[0_16px_40px_rgba(245,184,65,0.25)]"
          >
            Start a conversation
            <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
          <button
            onClick={copyEmail}
            className={`inline-flex items-center gap-3 border px-6 py-4 font-mono text-[12px] uppercase tracking-[0.14em] transition-all duration-300 ${
              copied
                ? "border-mint bg-mint/10 text-mint"
                : "border-line text-muted hover:-translate-y-0.5 hover:border-amber hover:text-amber"
            }`}
          >
            {copied ? "✓ Copied to clipboard" : PROFILE.email}
            {!copied && <span className="text-dim">⧉</span>}
          </button>
        </div>

        {/* social rows */}
        <div className="reveal mt-16 border-t border-line" style={{ "--reveal-delay": "220ms" } as React.CSSProperties}>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              {...(s.label !== "Email" ? { target: "_blank", rel: "noreferrer" } : {})}
              className="group grid grid-cols-[90px_1fr_auto] items-center gap-4 border-b border-line py-5 transition-all duration-300 hover:bg-panel/60 hover:pl-4 md:grid-cols-[140px_1fr_1fr_auto] md:gap-8"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-dim transition-colors group-hover:text-amber">
                {s.label}
              </span>
              <span className="truncate font-display text-sm font-500 text-paper transition-colors group-hover:text-amber md:text-base">
                {s.value}
              </span>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-dim md:block">
                {s.note}
              </span>
              <span className="grid h-9 w-9 place-items-center border border-line text-muted transition-all duration-300 group-hover:border-amber group-hover:bg-amber group-hover:text-ink">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* footer */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-5 py-8 md:flex-row md:items-center md:px-8">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-dim">
            © 2026 Hamdil Hasan — Dhaka, Bangladesh
          </p>
          <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-dim">
            React · Tailwind · Deployed on
            <span className="text-paper">▲ Vercel</span>
          </p>
          <div className="flex items-center gap-6">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-dim">
              hamdilhasan.dev <span className="text-amber">v2.0</span>
            </p>
            <a
              href="#top"
              className="u-slide font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-amber"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
