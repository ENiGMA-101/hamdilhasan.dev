import { useEffect, useRef, useState } from "react";
import AutoCarousel from "./AutoCarousel";
import { CREATIVE_GALLERY, type CreativeItem } from "../data/portfolioData";

/* ==========================================================================
   Creative Lab — horizontal filmstrip of prototyping artefacts
   Same AutoCarousel behaviour as the certificate track.
   ========================================================================== */

export function CreativeLabSection() {
  const [open, setOpen] = useState<CreativeItem | null>(null);

  return (
    <section
      id="photography"
      className="relative scroll-mt-24 overflow-hidden border-y border-[var(--line-subtle)] bg-[var(--surface-sunken)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <header className="max-w-2xl">
          <p className="rule-label">Visual archive</p>
          <h2 className="mt-3 font-display text-headline font-bold text-[var(--content-primary)]">
            Lab, bench &amp; interfaces
          </h2>
          <p className="mt-4 text-body-lg text-[var(--content-muted)]">
            Supporting visuals from the build process. These are art-directed concept
            renders of the systems — they stand in until photographs of the finished
            prototypes are published.
          </p>
        </header>

        <div className="mt-12">
          <AutoCarousel
            label="Visual archive"
            speed={42}
            gap={20}
            edgeFade={false}
            railClassName="-mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10"
          >
            {CREATIVE_GALLERY.map((item) => (
              <figure
                key={item.id}
                className="group w-[260px] shrink-0 cursor-pointer overflow-hidden rounded-[20px] border border-[var(--line-subtle)] bg-[var(--surface-raised)] shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-solid)] sm:w-[320px]"
                onClick={() => setOpen(item)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.title} — ${item.description}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] text-white backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
                <figcaption className="p-4">
                  <h3 className="font-display text-[15px] font-bold text-[var(--content-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-caption text-[var(--content-muted)]">
                    {item.description}
                  </p>
                </figcaption>
              </figure>
            ))}
          </AutoCarousel>
        </div>
      </div>

      {open && <Lightbox item={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

function Lightbox({ item, onClose }: { item: CreativeItem; onClose: () => void }) {
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
      className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lab-lightbox-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-[24px] border border-[var(--line-subtle)] bg-[var(--surface-raised)] shadow-[var(--shadow-pop)]"
      >
        <div className="relative aspect-[16/10] bg-black">
          <img
            src={item.image}
            alt={`${item.title} — ${item.description}`}
            className="h-full w-full object-contain"
          />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--accent-text)]">
            {item.category}
          </p>
          <h3 id="lab-lightbox-title" className="mt-1.5 font-display text-title font-bold text-[var(--content-primary)]">
            {item.title}
          </h3>
          <p className="mt-2 max-w-[65ch] text-body text-[var(--content-secondary)]">
            {item.description}
          </p>
          <p className="mt-4 rounded-xl border border-dashed border-[var(--line-strong)] bg-[var(--surface-sunken)] p-3 text-caption text-[var(--content-muted)]">
            {item.visualKind === "photograph"
              ? "Photograph of the actual prototype."
              : "Art-directed concept render — not a photograph of the finished prototype."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreativeLabSection;
