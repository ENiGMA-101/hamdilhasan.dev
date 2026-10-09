import { useEffect, useRef, useState } from "react";
import AutoCarousel from "./AutoCarousel";
import HHPLogo from "./HHPLogo";
import { CERTIFICATIONS, type CertificateItem } from "../data/portfolioData";

/* ==========================================================================
   Certifications — seamless right-to-left gallery
   Uses the shared AutoCarousel, which fixes the previous janky
   setInterval + scrollBy implementation:
   • continuous, smooth right-to-left travel at a constant speed
   • pauses immediately on hover, resumes on leave
   • drag / touch supported, with accidental clicks suppressed after a drag
   • loops seamlessly with no visible reset and no duplicated gap
   • pauses while the tab is hidden
   • respects prefers-reduced-motion (falls back to a scrollable rail)
   ========================================================================== */

export function CertificationsSection() {
  const [selected, setSelected] = useState<CertificateItem | null>(null);

  return (
    <section
      id="certifications"
      className="relative scroll-mt-24 border-y border-[var(--line-subtle)] bg-[var(--surface-sunken)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <header className="max-w-2xl">
          <p className="rule-label">Certifications</p>
          <h2 className="mt-3 font-display text-headline font-bold text-[var(--content-primary)]">
            Coursework &amp; credentials
          </h2>
          <p className="mt-4 text-body-lg text-[var(--content-muted)]">
            Formal coursework and structured self-study, listed with what each one actually
            covered. Certificate images are labelled placeholders until the issued PDFs are
            added to the repository.
          </p>
        </header>

        <div className="mt-12">
          <AutoCarousel
            label="Certificates"
            speed={38}
            gap={24}
            edgeFade={false}
            railClassName="-mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10"
          >
            {CERTIFICATIONS.map((cert) => (
              <CertificateCard
                key={cert.id}
                cert={cert}
                onOpen={() => setSelected(cert)}
              />
            ))}
          </AutoCarousel>
        </div>
      </div>

      {selected && <CertificateDialog cert={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function CertificateCard({
  cert,
  onOpen,
}: {
  cert: CertificateItem;
  onOpen: () => void;
}) {
  return (
    <article className="flex w-[290px] flex-col rounded-[22px] border border-[var(--line-subtle)] bg-[var(--surface-raised)] p-5 shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-solid)] hover:shadow-[var(--shadow-lift)] sm:w-[340px]">
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full border border-[var(--line-subtle)] bg-[var(--surface-sunken)] px-2.5 py-1 font-mono text-[10px] font-medium text-[var(--content-secondary)]">
          {cert.category}
        </span>
        <span className="font-mono text-[11px] text-[var(--content-faint)]">{cert.issueDate}</span>
      </div>

      {/* Certificate plate — clearly a placeholder, not a fabricated design */}
      <div className="relative mt-4 flex aspect-[16/9] flex-col justify-between overflow-hidden rounded-2xl border border-[var(--line-subtle)] bg-[var(--surface-sunken)] p-4">
        <div className="flex items-center justify-between">
          <HHPLogo size={30} />
          {cert.placeholder ? (
            <span className="rounded-full border border-dashed border-[var(--line-strong)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-[var(--content-faint)]">
              Image pending
            </span>
          ) : (
            <span className="rounded-full border border-[var(--line-subtle)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-[var(--content-faint)]">
              No image
            </span>
          )}
        </div>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--content-faint)]">
            Certificate record
          </p>
          <p className="mt-0.5 line-clamp-2 font-display text-[13px] font-bold leading-snug text-[var(--content-primary)]">
            {cert.title}
          </p>
        </div>
      </div>

      <h3 className="mt-4 font-display text-[15px] font-bold leading-snug text-[var(--content-primary)]">
        {cert.title}
      </h3>
      <p className="mt-1 font-mono text-[11px] text-[var(--content-muted)]">{cert.issuer}</p>

      <ul className="mt-3.5 flex flex-wrap gap-1.5">
        {cert.skillsLearned.map((s) => (
          <li
            key={s}
            className="rounded-md bg-[var(--surface-sunken)] px-2 py-0.5 font-mono text-[10px] text-[var(--content-secondary)]"
          >
            {s}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-[var(--line-subtle)] pt-4">
        <button
          type="button"
          onClick={onOpen}
          className="text-[13px] font-semibold text-[var(--accent-text)] transition hover:underline"
        >
          Details
        </button>
        {cert.verifyUrl && (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[12px] font-medium text-[var(--content-muted)] transition hover:text-[var(--accent-text)]"
          >
            Source
            <ExternalIcon />
          </a>
        )}
      </div>
    </article>
  );
}

function CertificateDialog({
  cert,
  onClose,
}: {
  cert: CertificateItem;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/65 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-dialog-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-[24px] border border-[var(--line-subtle)] bg-[var(--surface-raised)] p-6 shadow-[var(--shadow-pop)] sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--accent-text)]">
              {cert.category}
            </p>
            <h3
              id="cert-dialog-title"
              className="mt-1.5 font-display text-title font-bold text-[var(--content-primary)]"
            >
              {cert.title}
            </h3>
            <p className="mt-1.5 text-caption text-[var(--content-muted)]">
              {cert.issuer} · {cert.issueDate}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close certificate details"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--line-subtle)] text-[var(--content-secondary)] transition hover:text-[var(--content-primary)]"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="mt-6">
          <p className="rule-label">What it covered</p>
          <ul className="mt-3 space-y-2">
            {cert.skillsLearned.map((s) => (
              <li key={s} className="flex items-start gap-2.5 text-body text-[var(--content-secondary)]">
                <CheckIcon />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {cert.placeholder && (
          <p className="mt-6 rounded-xl border border-dashed border-[var(--line-strong)] bg-[var(--surface-sunken)] p-4 text-caption text-[var(--content-muted)]">
            No certificate image is published for this entry yet. Add the issued PDF or image
            to the repository and reference it in{" "}
            <code className="font-mono">src/data/portfolioData.ts</code>.
          </p>
        )}

        <div className="mt-7 flex flex-wrap gap-3 border-t border-[var(--line-subtle)] pt-5">
          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-solid)] px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[var(--accent-solidHover)]"
            >
              Open source material
              <ExternalIcon />
            </a>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-auto rounded-xl border border-[var(--line-strong)] px-4 py-2.5 text-[13px] font-semibold text-[var(--content-secondary)] transition hover:text-[var(--content-primary)]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
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

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-[3px] h-3.5 w-3.5 shrink-0 text-[var(--aqua-solid)]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

export default CertificationsSection;
