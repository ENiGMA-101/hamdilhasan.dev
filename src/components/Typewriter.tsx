import { useEffect, useRef, useState } from "react";

/* ==========================================================================
   Typewriter — type / hold / delete loop with a blinking caret
   --------------------------------------------------------------------------
   Accessibility:
   • The animated glyphs are `aria-hidden` so screen readers never announce
     characters one at a time.
   • A visually-hidden copy of the full phrase list is announced once instead.
   • `prefers-reduced-motion: reduce` renders the first phrase statically.
   • The wrapper reserves a single-line box so nothing reflows while typing
     (no layout shift).
   ========================================================================== */

export interface TypewriterProps {
  phrases: string[];
  /** ms per character while typing */
  typeSpeed?: number;
  /** ms per character while deleting */
  deleteSpeed?: number;
  /** ms to hold a completed phrase */
  holdTime?: number;
  className?: string;
  /** Accessible label describing the rotating content. */
  ariaLabel?: string;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export function Typewriter({
  phrases,
  typeSpeed = 62,
  deleteSpeed = 32,
  holdTime = 1500,
  className = "",
  ariaLabel = "Areas of focus",
}: TypewriterProps) {
  const [reduced, setReduced] = useState(prefersReducedMotion);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(reduced ? phrases[0] : "");
  const [deleting, setDeleting] = useState(false);
  const timer = useRef<number | null>(null);

  /* React to the user changing the OS setting while the page is open. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduced(mq.matches);
      if (mq.matches) {
        setText(phrases[0]);
        setDeleting(false);
        setIndex(0);
      }
    };
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [phrases]);

  useEffect(() => {
    if (reduced || phrases.length === 0) return;

    const current = phrases[index % phrases.length];

    const tick = () => {
      if (!deleting) {
        // Typing forward
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
          timer.current = window.setTimeout(tick, typeSpeed);
        } else {
          // Complete — hold, then start deleting
          timer.current = window.setTimeout(() => setDeleting(true), holdTime);
        }
      } else {
        // Deleting
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1));
          timer.current = window.setTimeout(tick, deleteSpeed);
        } else {
          setDeleting(false);
          setIndex((i) => (i + 1) % phrases.length);
        }
      }
    };

    timer.current = window.setTimeout(tick, typeSpeed);
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, [text, deleting, index, phrases, typeSpeed, deleteSpeed, holdTime, reduced]);

  // Static, screen-reader friendly description of everything that rotates.
  const staticList = phrases.join("; ");

  return (
    <span className={`inline-flex flex-col max-w-full break-words ${className}`}>
      {/* prevents layout shift as text grows/shrinks */}
      <span className="relative block min-h-[1.7em] max-w-full break-words">
        <span aria-hidden="true" className="inline whitespace-pre-wrap break-words">
          {text}
        </span>
        {!reduced && <span aria-hidden="true" className="hhp-caret" />}
      </span>
      <span className="sr-only">
        {ariaLabel}: {staticList}.
      </span>
    </span>
  );
}

export default Typewriter;
