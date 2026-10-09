import HHPLogo from "./HHPLogo";
import { GitHubIcon, LinkedInIcon } from "./SocialIcons";
import { NAV_LINKS, PERSONAL_INFO } from "../data/portfolioData";

interface FooterProps {
  onReplayIntro?: () => void;
}

export function Footer({ onReplayIntro }: FooterProps) {
  return (
    <footer className="border-t border-[var(--line-subtle)] bg-[var(--surface-sunken)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-10 py-12 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <HHPLogo size={40} />
              <span className="font-display text-[15px] font-bold text-[var(--content-primary)]">
                {PERSONAL_INFO.fullName}
              </span>
            </div>
            <p className="mt-4 text-body text-[var(--content-muted)]">
              {PERSONAL_INFO.degree} at {PERSONAL_INFO.institution}. Building software,
              robotics and intelligent systems in Dhaka, Bangladesh.
            </p>
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer">
            <p className="rule-label">Sections</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-caption text-[var(--content-secondary)] transition hover:text-[var(--accent-text)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Elsewhere */}
          <div>
            <p className="rule-label">Elsewhere</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-caption text-[var(--content-secondary)] transition hover:text-[var(--accent-text)]"
                >
                  <GitHubIcon className="h-4 w-4" />
                  github.com/{PERSONAL_INFO.githubHandle}
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-caption text-[var(--content-secondary)] transition hover:text-[var(--accent-text)]"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  linkedin.com/in/hamdil-hasan-p101
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-caption text-[var(--content-secondary)] transition hover:text-[var(--accent-text)]"
                >
                  {PERSONAL_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-start gap-3">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--line-strong)] bg-[var(--surface-raised)] px-4 py-2.5 text-[13px] font-semibold text-[var(--content-primary)] transition hover:border-[var(--accent-solid)] hover:text-[var(--accent-text)]"
            >
              <TopIcon />
              Back to top
            </button>
            {onReplayIntro && (
              <button
                type="button"
                onClick={onReplayIntro}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 font-mono text-[11px] text-[var(--content-muted)] transition hover:text-[var(--accent-text)]"
              >
                Replay intro sequence
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-[var(--line-subtle)] py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-[var(--content-faint)]">
            © {new Date().getFullYear()} {PERSONAL_INFO.fullName} · HHP
          </p>
          <p className="font-mono text-[11px] text-[var(--content-faint)]">
            Built with React, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

function TopIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </svg>
  );
}

export default Footer;
