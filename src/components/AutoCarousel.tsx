import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

/* ==========================================================================
   AutoCarousel — seamless right-to-left marquee rail
   --------------------------------------------------------------------------
   Root cause of the previous bug:
   The old implementation drove the rail with setInterval + scrollBy({left:1}).
   That produced 1px stutter every 35ms, fought the CSS `scroll-behavior:smooth`
   setting, and used `scrollTo({left:0})` at the end which produced a visible
   jump back to the start. It also never paused while the tab was hidden and
   had no drag support.

   This implementation instead:
   • renders the track twice with an identical trailing gap and silently wraps
     scrollLeft at the seam, so the loop is truly seamless — no reset flash and
     no duplicated/missing gap at the seam;
   • advances scrollLeft from a single requestAnimationFrame loop with a
     delta-time normalised speed, so motion is smooth on any refresh rate;
   • pauses on hover, focus-within, pointer drag, visibility change and the
     user's play/pause control, and resumes cleanly on leave;
   • falls back to a plain scrollable rail with arrow controls when the user
     prefers reduced motion.
   ========================================================================== */

export interface AutoCarouselProps {
  children: React.ReactNode;
  /** Pixels per second the rail travels. Default 46. */
  speed?: number;
  /** Gap between cards in px. Default 24. */
  gap?: number;
  /** Accessible label for the rail region. */
  label: string;
  /** Show the built-in arrow + play/pause controls. */
  showControls?: boolean;
  /** Fade the left/right edges into the page background. */
  edgeFade?: boolean;
  /** Extra class on the outer wrapper. */
  className?: string;
  /** Extra class on the scrolling rail. */
  railClassName?: string;
  /** Extra class applied to every cloned copy wrapper. */
  copyClassName?: string;
}

const DRAG_THRESHOLD_PX = 6;

export function AutoCarousel({
  children,
  speed = 46,
  gap = 24,
  label,
  showControls = true,
  edgeFade = true,
  className = "",
  railClassName = "",
  copyClassName = "",
}: AutoCarouselProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const lapWidthRef = useRef(0);

  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const dragState = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startScroll: 0,
    moved: 0,
  });

  const statusId = useId();

  /* ---- reduced motion ---------------------------------------------------- */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* ---- tab visibility ---------------------------------------------------- */
  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /* ---- measure one copy's width (the seamless seam) ---------------------- */
  /* Measured from the first copy's own offsetWidth rather than
     rail.scrollWidth / 2. The rail may carry horizontal padding (it is bled
     to the section edges with `-mx-* px-*`), and scrollWidth includes that
     padding — which would push the wrap point off by the padding amount and
     produce a visible jump at the seam. */
  const measure = useCallback(() => {
    const copy = copyRef.current;
    if (!copy) return;
    lapWidthRef.current = copy.offsetWidth;
  }, []);

  useEffect(() => {
    measure();
    const rail = railRef.current;
    if (!rail) return;

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(measure);
      ro.observe(rail);
      const cleanup = () => ro.disconnect();
      // Images and web fonts change width after first paint.
      const timers = [250, 700, 1600].map((ms) => window.setTimeout(measure, ms));
      return () => {
        cleanup();
        timers.forEach(window.clearTimeout);
      };
    }
    const timers = [250, 700, 1600].map((ms) => window.setTimeout(measure, ms));
    return () => timers.forEach(window.clearTimeout);
  }, [measure, children]);

  /* ---- the single rAF animation loop ------------------------------------ */
  const running =
    !reducedMotion && !userPaused && !hovered && !focused && !dragging && !tabHidden;

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || !running) {
      lastTimeRef.current = null;
      return;
    }

    const step = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      // Clamp delta so a stalled frame can never produce a huge jump.
      const delta = Math.min(time - lastTimeRef.current, 48);
      lastTimeRef.current = time;

      const lap = lapWidthRef.current;
      if (lap > 0) {
        // Modulo rather than a single subtraction: correct even if the rail
        // drifted (e.g. a drag left it beyond one lap).
        const next = (((rail.scrollLeft + (speed * delta) / 1000) % lap) + lap) % lap;
        rail.scrollLeft = next;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimeRef.current = null;
    };
  }, [running, speed]);

  /* ---- manual arrows ----------------------------------------------------- */
  const page = useCallback((direction: "prev" | "next") => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.firstElementChild?.firstElementChild as HTMLElement | null;
    const amount = card ? card.offsetWidth + gap : rail.clientWidth * 0.8;
    rail.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  }, [gap]);

  /* ---- pointer dragging (mouse / touch / pen) ---------------------------- */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const rail = railRef.current;
    if (!rail) return;
    dragState.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startScroll: rail.scrollLeft,
      moved: 0,
    };
    setDragging(true);
    try {
      rail.setPointerCapture(e.pointerId);
    } catch {
      /* some engines throw for synthetic pointers — safe to ignore */
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    const st = dragState.current;
    if (!rail || !st.active || st.pointerId !== e.pointerId) return;
    const dx = e.clientX - st.startX;
    st.moved = Math.max(st.moved, Math.abs(dx));
    const lap = lapWidthRef.current;
    // Clamp into one lap so the drag can never reach the hard end of the
    // doubled track — the clone is identical, so it always looks continuous.
    const target = st.startScroll - dx;
    rail.scrollLeft = lap > 0 ? Math.max(0, Math.min(lap, target)) : target;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = dragState.current;
    const rail = railRef.current;
    if (!st.active) return;
    st.active = false;
    setDragging(false);
    try {
      if (rail?.hasPointerCapture(e.pointerId)) {
        rail.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* ignore */
    }
  };

  // Suppress the click that follows a real drag so cards don't open by accident.
  const captureClick = (e: React.MouseEvent) => {
    if (dragState.current.moved > DRAG_THRESHOLD_PX) {
      e.preventDefault();
      e.stopPropagation();
      dragState.current.moved = 0;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Status live-region: announces state, never every character/frame */}
      <span id={statusId} role="status" aria-live="polite" className="sr-only">
        {running
          ? `${label} is scrolling automatically.`
          : `${label} is paused. Use the arrow buttons or drag to browse.`}
      </span>

      <div
        ref={railRef}
        role="group"
        aria-labelledby={statusId}
        tabIndex={0}
        data-dragging={dragging ? "true" : "false"}
        className={`marquee-rail no-scrollbar relative flex overflow-x-auto pb-2 ${
          reducedMotion ? "snap-x snap-mandatory" : ""
        } ${railClassName}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setFocused(false);
          }
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={captureClick}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            page("next");
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            page("prev");
          }
        }}
      >
        {/* Copy 1 — the real content. paddingRight reproduces the inter-card
            gap at the seam so the loop has no missing or doubled gap. */}
        <div
          ref={copyRef}
          className={`flex shrink-0 ${copyClassName}`}
          style={{ gap, paddingRight: gap }}
        >
          {children}
        </div>
        {/* Copy 2 — identical clone that makes the wrap invisible */}
        {!reducedMotion && (
          <div
            aria-hidden="true"
            data-clone="true"
            className={`flex shrink-0 ${copyClassName}`}
            style={{ gap, paddingRight: gap }}
          >
            {children}
          </div>
        )}
      </div>

      {edgeFade && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--surface-canvas)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--surface-canvas)] to-transparent" />
        </>
      )}

      {showControls && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <CarouselButton
            label={`Scroll ${label} backwards`}
            onClick={() => page("prev")}
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </CarouselButton>

          <CarouselButton
            label={userPaused ? `Resume ${label} autoscroll` : `Pause ${label} autoscroll`}
            pressed={userPaused}
            onClick={() => setUserPaused((p) => !p)}
          >
            {userPaused ? (
              <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
            ) : (
              <path d="M7 4h3v16H7zM14 4h3v16h-3z" />
            )}
          </CarouselButton>

          <CarouselButton
            label={`Scroll ${label} forwards`}
            onClick={() => page("next")}
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </CarouselButton>
        </div>
      )}
    </div>
  );
}

function CarouselButton({
  label,
  onClick,
  pressed,
  children,
}: {
  label: string;
  onClick: () => void;
  pressed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={pressed}
      className={`grid h-11 w-11 place-items-center rounded-full border transition active:scale-95 ${
        pressed
          ? "border-[var(--accent-solid)] bg-[var(--accent-solid)] text-white"
          : "border-[var(--line-strong)] bg-[var(--surface-raised)] text-[var(--content-secondary)] hover:border-[var(--accent-solid)] hover:text-[var(--accent-text)]"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill={pressed ? "currentColor" : "none"}
        stroke={pressed ? "none" : "currentColor"}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    </button>
  );
}

export default AutoCarousel;
