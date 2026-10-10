import { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import IntroSequence from "./components/IntroSequence";
import Hero from "./components/Hero";
import FeaturedProjects from "./components/FeaturedProjects";
import ProjectsSection from "./components/ProjectsSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import EducationSection from "./components/EducationSection";
import CertificationsSection from "./components/CertificationsSection";
import ResearchTimeline from "./components/ResearchTimeline";
import CreativeLabSection from "./components/CreativeLabSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

/* ==========================================================================
   App shell — theme state, intro gating, section order
   --------------------------------------------------------------------------
   The theme is applied by the inline script in index.html before first
   paint, so there is no flash of the wrong theme. This component only
   reconciles React state with what that script already decided.
   ========================================================================== */

type Theme = "dark" | "light";

const THEME_KEY = "hhp-theme";
const INTRO_KEY = "hhp-intro-seen";

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

export function App() {
  const [theme, setTheme] = useState<Theme>(readTheme);
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof sessionStorage === "undefined") return false;
    return sessionStorage.getItem(INTRO_KEY) !== "1";
  });

  /* Keep <html> and storage in sync with state. */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    root.style.colorScheme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* storage blocked (private mode) — theme still applies for this visit */
    }
  }, [theme]);

  /* Follow the OS while the visitor hasn't made an explicit choice. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(THEME_KEY);
      } catch {
        /* ignore */
      }
      if (!stored) setTheme(e.matches ? "light" : "dark");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* Restrained colour transition only around an actual toggle. */
  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    setTheme((t) => (t === "dark" ? "light" : "dark"));
    window.setTimeout(() => root.classList.remove("theme-transition"), 320);
  }, []);

  const endIntro = useCallback(() => {
    setShowIntro(false);
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const replayIntro = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setShowIntro(true);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-xl focus:bg-[var(--accent-solid)] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      {showIntro && <IntroSequence onDone={endIntro} />}

      <Navbar theme={theme} onToggleTheme={toggleTheme} onReplayIntro={replayIntro} />

      <main id="main">
        {/* About leads: identity first, then work — matching the nav order. */}
        <Hero />
        <AboutSection />
        <FeaturedProjects />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <CertificationsSection />
        <ResearchTimeline />
        <CreativeLabSection />
        <ContactSection />
      </main>

      <Footer onReplayIntro={replayIntro} />
    </>
  );
}

export default App;
