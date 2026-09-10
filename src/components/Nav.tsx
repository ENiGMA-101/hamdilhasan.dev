import { useEffect, useState } from "react";
import { NAV_ITEMS, PROFILE } from "../data";
import { useDhakaClock, useScrollProgress } from "../hooks";

export default function Nav() {
  const clock = useDhakaClock();
  const progress = useScrollProgress();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line-soft bg-ink/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        {/* scroll progress */}
        <div
          className="absolute left-0 top-0 h-[2px] bg-amber transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a
            href="#top"
            className="group flex items-center gap-2 font-mono text-sm tracking-tight text-paper"
          >
            <span className="grid h-8 w-8 place-items-center border border-amber/60 bg-amber/10 font-display text-[13px] font-600 text-amber transition-colors group-hover:bg-amber group-hover:text-ink">
              H
            </span>
            <span>
              ENiGMA<span className="text-amber">-</span>101
              <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 animate-blink bg-mint" />
            </span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="u-slide font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-paper"
                >
                  <span className="mr-1 text-amber/70">{item.n}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted md:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse-dot" />
              DHAKA {clock}
            </span>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="relative z-[70] flex h-9 w-9 flex-col items-center justify-center gap-[5px] border border-line bg-panel/60 lg:hidden"
            >
              <span
                className={`h-[1.5px] w-4 bg-paper transition-transform duration-300 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[1.5px] w-4 bg-paper transition-transform duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col justify-center bg-ink/97 px-8 transition-all duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
          {PROFILE.handle} / menu
        </p>
        <ul className="space-y-1">
          {NAV_ITEMS.map((item, i) => (
            <li
              key={item.id}
              style={{ transitionDelay: open ? `${i * 60 + 100}ms` : "0ms" }}
              className={`transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 py-2"
              >
                <span className="font-mono text-xs text-amber">{item.n}</span>
                <span className="font-display text-3xl font-600 uppercase tracking-tight text-paper transition-colors group-hover:text-amber">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <a className="u-slide hover:text-paper" href={PROFILE.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a className="u-slide hover:text-paper" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a className="u-slide hover:text-paper" href={`mailto:${PROFILE.email}`}>
            Email ↗
          </a>
        </div>
      </div>
    </>
  );
}
