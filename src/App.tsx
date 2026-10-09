import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import IntroSequence from './components/IntroSequence';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import CertificationsSection from './components/CertificationsSection';
import ResearchTimeline from './components/ResearchTimeline';
import CreativeLabSection from './components/CreativeLabSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export function App() {
  // Theme state: dark mode initial default
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('hhp_portfolio_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      // If user has system light preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    return 'dark';
  });

  // Intro sequence state
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      // Check session storage to avoid annoyance on every page refresh in same session
      const hasSeenIntro = sessionStorage.getItem('hhp_has_seen_intro');
      return !hasSeenIntro;
    }
    return true;
  });

  // Apply theme to document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('hhp_portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('hhp_has_seen_intro', 'true');
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#0B1220] text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-blue-600 selection:text-white relative">
      {/* Signature Opening Intro Animation */}
      {showIntro && <IntroSequence onComplete={handleIntroComplete} />}

      {/* Persistent Navigation Bar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onReplayIntro={handleReplayIntro}
      />

      {/* Main Content Layout */}
      <main id="main-content" className="relative">
        <Hero />
        <ProjectsSection />
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <CertificationsSection />
        <ResearchTimeline />
        <CreativeLabSection />
        <ContactSection />
      </main>

      {/* Branded Footer */}
      <Footer onReplayIntro={handleReplayIntro} />
    </div>
  );
}

export default App;
