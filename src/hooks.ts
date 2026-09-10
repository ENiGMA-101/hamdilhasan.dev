import { useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

const GLYPHS = "█▓▒░<>/\\#01ENIGMA*+=?!";

/** Scramble-decode text effect: characters resolve left to right. */
export function useScramble(text: string, startDelay = 0, speed = 28) {
  const reduced = usePrefersReducedMotion();
  const [out, setOut] = useState(reduced ? text : "");
  useEffect(() => {
    if (reduced) {
      setOut(text);
      return;
    }
    let frame = 0;
    let raf = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        frame++;
        const settled = Math.floor(frame / 2.4);
        let s = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === " " || i < settled) s += ch;
          else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setOut(s);
        if (settled >= text.length && interval) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
      cancelAnimationFrame(raf);
    };
  }, [text, startDelay, speed, reduced]);
  return out;
}

/** Typewriter effect with a fixed cursor rendered by the caller. */
export function useTypewriter(lines: string[], typeSpeed = 42, pause = 350) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState<string[]>(reduced ? lines : []);
  const [typing, setTyping] = useState(!reduced);
  useEffect(() => {
    if (reduced) {
      setDisplay(lines);
      setTyping(false);
      return;
    }
    let line = 0;
    let col = 0;
    let timer: ReturnType<typeof setTimeout>;
    const current: string[] = [];
    const tick = () => {
      if (line >= lines.length) {
        setTyping(false);
        return;
      }
      col++;
      current[line] = lines[line].slice(0, col);
      setDisplay([...current]);
      if (col >= lines[line].length) {
        line++;
        col = 0;
        timer = setTimeout(tick, pause);
      } else {
        timer = setTimeout(tick, typeSpeed);
      }
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [lines, typeSpeed, pause, reduced]);
  return { display, typing };
}

/** Adds .is-in to any descendant with .reveal when it enters the viewport. */
export function useRevealScope<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

/** Live clock pinned to Asia/Dhaka (UTC+6). */
export function useDhakaClock() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Dhaka",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const update = () => setNow(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/** 0..1 scroll progress of the whole document. */
export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}
