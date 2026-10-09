import React, { useState, useEffect, useRef } from 'react';
import HHPLogo from './HHPLogo';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowDown, ArrowUpRight, Cpu, Layers, Sparkles, Terminal } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './SocialIcons';

export const Hero: React.FC = () => {
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Rotate through interests
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeywordIndex((prev) => (prev + 1) % PERSONAL_INFO.heroKeywords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // 3D Mouse Tilt interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[500px] bg-gradient-to-tr from-blue-600/15 via-teal-500/10 to-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Tech grid texture */}
      <div className="absolute inset-0 bg-tech-grid-dark dark:opacity-30 opacity-15 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Intro */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-sm mb-6 text-xs text-slate-700 dark:text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="font-medium text-slate-900 dark:text-slate-200">
                CSE Undergraduate @ University of Asia Pacific
              </span>
              <span className="hidden sm:inline text-slate-400">• Dhaka</span>
            </div>

            {/* Name with subtle monogram mark */}
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Hamdil Hasan <span className="bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">Partho</span>
              </h1>
            </div>

            {/* Dynamic Rotating Focus Statement */}
            <div className="h-10 sm:h-12 flex items-center mb-6 overflow-hidden">
              <span className="text-base sm:text-2xl font-medium text-slate-500 dark:text-slate-400 mr-2.5">
                Focusing on
              </span>
              <div className="relative inline-block">
                <span
                  key={currentKeywordIndex}
                  className="inline-block text-base sm:text-2xl font-bold text-blue-600 dark:text-teal-400 animate-[fadeIn_0.5s_ease-out]"
                >
                  {PERSONAL_INFO.heroKeywords[currentKeywordIndex]}
                </span>
              </div>
            </div>

            {/* Core Headline & Brief */}
            <p className="text-lg sm:text-xl font-normal text-slate-800 dark:text-slate-200 mb-4 max-w-2xl leading-relaxed">
              {PERSONAL_INFO.tagline}
            </p>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-8 max-w-xl leading-relaxed">
              Bridging modern software development, applied artificial intelligence, and embedded robotics. Currently researching algorithmic scheduling fairness and optical wireless communication.
            </p>

            {/* CTAs and Social Links */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-blue-600/35"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="w-4 h-4 text-blue-500" />
              </a>

              {/* Direct Social Links */}
              <div className="flex items-center gap-2 sm:ml-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all hover:scale-105"
                  title="GitHub: ENiGMA-101"
                >
                  <GitHubIcon className="w-4 h-4" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all hover:scale-105"
                  title="LinkedIn: hamdil-hasan-p101"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Stats Pill Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800/80 w-full max-w-xl">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Interactive 3D Monogram & Engineering Deck */}
          <div className="lg:col-span-5 flex justify-center perspective-1000">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
              }}
              className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl p-7 flex flex-col justify-between bg-gradient-to-b from-white/90 via-slate-50/70 to-slate-100/90 dark:from-slate-900/90 dark:via-[#0E1726]/80 dark:to-[#0B1220]/95 border border-slate-200/80 dark:border-slate-800 shadow-2xl shadow-blue-900/10 dark:shadow-black/50 backdrop-blur-xl transform-style-3d group select-none"
            >
              {/* Corner decorative indicators */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 dark:text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-blue-500" />
                  <span>HHP.ENG // ID</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 dark:text-teal-400 border border-blue-500/20">
                  UAP • CSE
                </span>
              </div>

              {/* Center 3D Monogram Hero */}
              <div className="flex flex-col items-center justify-center my-auto py-4 relative">
                {/* Concentric subtle radar circles */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-56 h-56 rounded-full border border-blue-500/10 dark:border-blue-400/10 animate-ping opacity-25" />
                  <div className="w-44 h-44 rounded-full border border-slate-300 dark:border-slate-800" />
                </div>

                <div className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                  <HHPLogo size={180} showGlow={true} />
                </div>

                <div className="mt-5 text-center">
                  <span className="text-xs font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase">
                    Hamdil Hasan Partho
                  </span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    Geometric Monogram Identity
                  </p>
                </div>
              </div>

              {/* Bottom Interactive Engineering Badges */}
              <div className="space-y-2.5 pt-4 border-t border-slate-200/60 dark:border-slate-800/70">
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                    <Cpu className="w-3.5 h-3.5 text-teal-500" />
                    <span className="truncate">ESP32 & C++</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    <span className="truncate">Computer Vision</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    <span>Interactive 3D Deck</span>
                  </span>
                  <span className="text-[10px] text-teal-500 dark:text-teal-400 font-mono">
                    Move cursor to tilt
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
