import { useEffect, useRef, useState } from "react";
import HHPLogo from "./HHPLogo";
import { PERSONAL_INFO } from "../data/portfolioData";

/* ==========================================================================
   About — editorial two-column narrative with a portrait plate
   ========================================================================== */

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div
          ref={ref}
          className={`grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          {/* Portrait plate */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-3 -z-10 rounded-[28px] bg-[var(--glow-ambient)] blur-2xl"
              />
              <figure className="overflow-hidden rounded-[24px] border border-[var(--line-subtle)] bg-[var(--surface-raised)] shadow-[var(--shadow-lift)]">
                <div className="relative aspect-[4/5]">
                  <img
                    src="/images/about/portrait-hamdil.jpg"
                    alt="Hamdil Hasan Partho, Computer Science and Engineering student"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-5">
                    <HHPLogo size={44} />
                    <span>
                      <span className="block font-display text-[15px] font-bold text-white">
                        {PERSONAL_INFO.fullName}
                      </span>
                      <span className="block font-mono text-[11px] text-white/75">
                        {PERSONAL_INFO.location}
                      </span>
                    </span>
                  </figcaption>
                </div>
              </figure>
            </div>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-7">
            <p className="rule-label">About</p>
            <h2 className="mt-3 font-display text-headline font-bold text-[var(--content-primary)]">
              I like the part where the thing has to work
            </h2>

            <div className="mt-6 max-w-[62ch] space-y-4">
              {PERSONAL_INFO.aboutBio.map((p, i) => (
                <p key={i} className="text-body-lg text-[var(--content-secondary)]">
                  {p}
                </p>
              ))}
            </div>

            {/* Degree callout */}
            <div className="mt-9 rounded-2xl border border-[var(--line-subtle)] bg-[var(--surface-raised)] p-6 shadow-[var(--shadow-card)]">
              <p className="rule-label">Currently studying</p>
              <h3 className="mt-2 font-display text-title font-bold text-[var(--content-primary)]">
                {PERSONAL_INFO.degree}
              </h3>
              <p className="mt-1 text-body text-[var(--accent-text)]">
                {PERSONAL_INFO.institution} · Dhaka, Bangladesh
              </p>
            </div>

            {/* Principles */}
            <h3 className="mt-11 rule-label">How I work</h3>
            <ul className="mt-4 space-y-3">
              {PERSONAL_INFO.principles.map((p, i) => (
                <li
                  key={i}
                  className="rounded-2xl border border-[var(--line-subtle)] bg-[var(--surface-raised)] p-5 transition hover:border-[var(--accent-solid)]"
                >
                  <h4 className="font-display text-[15px] font-bold text-[var(--content-primary)]">
                    {p.title}
                  </h4>
                  <p className="mt-1.5 text-body text-[var(--content-muted)]">{p.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
