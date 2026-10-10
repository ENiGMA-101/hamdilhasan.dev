import { useEffect, useState } from "react";
import HHPLogo from "./HHPLogo";
import { GitHubIcon, LinkedInIcon } from "./SocialIcons";
import { NAV_ITEMS, PERSONAL_INFO } from "../data/portfolioData";

/* ==========================================================================
   Navbar — monogram, section links, theme toggle, contact CTA
   • Active section is tracked with an IntersectionObserver.
   • Mobile drawer locks body scroll and closes on Escape / route change.
   ========================================================================== */

interface NavbarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  onReplayIntro?: () => void;
}

export function Navbar({ theme, onToggleTheme, onReplayIntro }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("hero");

  /* Scroll state */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active-section tracking */
  useEffect(() => {
    const ids = ["hero", "about", "work", "focus", "photography", "writing", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* Lock scroll + Escape to close for the mobile drawer */
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isDark = theme === "dark";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-b border-[var(--line-subtle)] bg-[var(--surface-overlay)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[68px] sm:px-6 lg:px-6 xl:px-10 relative">
        {/* Brand */}
        <a
          href="#hero"
          className="group flex items-center gap-2.5 rounded-lg z-10"
          aria-label={`${PERSONAL_INFO.fullName} — back to top`}
        >
          <HHPLogo size={36} className="transition-transform duration-300 group-hover:scale-105" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[15px] font-bold tracking-tight text-[var(--content-primary)]">
              Hamdil Hasan Partho
            </span>
            <span className="mt-1 font-mono text-[10px] tracking-[0.14em] text-[var(--content-muted)]">
              CSE · DEVELOPER
            </span>
          </span>
        </a>

        {/* Desktop links — centered pill, visible from 1024px up */}
        <nav aria-label="Primary" className="hidden lg:block lg:absolute lg:left-1/2 lg:-translate-x-1/2 z-0">
          <ul className="flex items-center gap-0.5 xl:gap-1 rounded-full border border-[var(--line-subtle)] bg-[var(--surface-pill)] p-1 backdrop-blur-md">
            {NAV_ITEMS.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`inline-flex items-center rounded-full px-2 py-1 xl:px-3.5 xl:py-1.5 text-[12px] xl:text-[13px] font-medium transition-colors ${
                      isActive
                        ? "bg-[var(--accent-solid)] text-white"
                        : "text-[var(--content-secondary)] hover:text-[var(--content-primary)]"
                    }`}
                  >
                    <span>{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 z-10">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
            className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--line-subtle)] bg-[var(--surface-raised)] text-[var(--content-secondary)] transition hover:border-[var(--line-strong)] hover:text-[var(--content-primary)]"
          >
            <GitHubIcon className="h-[17px] w-[17px]" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in a new tab)"
            className="hidden h-10 w-10 place-items-center rounded-xl border border-[var(--line-subtle)] bg-[var(--surface-raised)] text-[var(--content-secondary)] transition hover:border-[var(--line-strong)] hover:text-[var(--accent-text)] sm:grid"
          >
            <LinkedInIcon className="h-[17px] w-[17px]" />
          </a>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            title={`Switch to ${isDark ? "light" : "dark"} theme`}
            className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--line-subtle)] bg-[var(--surface-raised)] text-[var(--content-secondary)] transition hover:border-[var(--line-strong)] hover:text-[var(--content-primary)]"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <a
            href="#contact"
            className="hidden items-center gap-1.5 rounded-xl bg-[var(--accent-solid)] px-3 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[var(--accent-solidHover)] sm:inline-flex xl:px-4"
          >
            Get in touch
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--line-subtle)] bg-[var(--surface-raised)] text-[var(--content-secondary)] transition hover:text-[var(--content-primary)] lg:hidden"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-[var(--line-subtle)] bg-[var(--surface-canvas)] px-4 pb-6 pt-3 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium transition-colors ${
                      isActive
                        ? "bg-[var(--accent-softBg)] text-[var(--accent-text)]"
                        : "text-[var(--content-secondary)] hover:bg-[var(--surface-sunken)]"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span aria-hidden="true" className="font-mono text-xs text-[var(--content-faint)]">
                      →
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-4 flex flex-col gap-2 border-t border-[var(--line-subtle)] pt-4">
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center rounded-xl bg-[var(--accent-solid)] px-4 py-3 text-sm font-semibold text-white"
          >
            Get in touch
          </a>
          <div className="flex gap-2">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--line-subtle)] bg-[var(--surface-raised)] px-4 py-3 text-sm font-medium text-[var(--content-secondary)]"
            >
              <GitHubIcon className="h-4 w-4" /> GitHub
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--line-subtle)] bg-[var(--surface-raised)] px-4 py-3 text-sm font-medium text-[var(--content-secondary)]"
            >
              <LinkedInIcon className="h-4 w-4" /> LinkedIn
            </a>
          </div>
          {onReplayIntro && (
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onReplayIntro();
              }}
              className="mt-1 rounded-xl px-3 py-2 font-mono text-xs text-[var(--content-muted)] transition hover:text-[var(--accent-text)]"
            >
              Replay intro sequence
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

/* --- Inline icons (kept local so the navbar stays a single unit) ---------- */

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export default Navbar;
