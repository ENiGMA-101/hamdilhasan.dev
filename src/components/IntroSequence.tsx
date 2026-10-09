import React, { useEffect, useState } from 'react';
import HHPLogo from './HHPLogo';
import { FastForward } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'logo' | 'name' | 'subtitle' | 'exit'>('logo');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    // Phase timers
    const timer1 = setTimeout(() => setPhase('name'), 800);
    const timer2 = setTimeout(() => setPhase('subtitle'), 1600);
    const timer3 = setTimeout(() => setPhase('exit'), 2600);
    const timer4 = setTimeout(() => onComplete(), 3100);

    // Progress interval
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 100 / 31;
      });
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B1220] text-white transition-all duration-700 select-none overflow-hidden ${
        phase === 'exit' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Opening identity animation"
    >
      {/* Background subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.22),rgba(20,184,166,0.08),transparent)] pointer-events-none" />

      {/* Cybernetic grid lines */}
      <div className="absolute inset-0 bg-tech-grid-dark opacity-40 pointer-events-none" />

      {/* Subtle light streak sweep */}
      <div className="absolute -top-[100%] left-0 right-0 h-48 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent transform -skew-y-12 animate-[pulse_4s_ease-in-out_infinite] pointer-events-none" />

      {/* Main monogram presentation */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl">
        <div className="relative mb-6 transform transition-transform duration-700 hover:scale-105">
          {/* Glowing ring */}
          <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-blue-600/30 via-teal-500/30 to-blue-500/30 blur-2xl animate-pulse" />

          {/* Logo vector */}
          <div className="relative z-10 drop-shadow-[0_15px_35px_rgba(37,99,235,0.45)]">
            <HHPLogo size={140} showGlow={true} />
          </div>
        </div>

        {/* Revealed Name */}
        <div
          className={`transition-all duration-700 transform ${
            phase !== 'logo'
              ? 'opacity-100 translate-y-0 filter blur-none'
              : 'opacity-0 translate-y-6 filter blur-sm'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-xs font-mono text-blue-300 tracking-wider">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
            INITIALIZING IDENTITY // HHP
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-[0.25em] text-white uppercase drop-shadow-md">
            Hamdil Hasan Partho
          </h1>
        </div>

        {/* Subtitle / Focus */}
        <div
          className={`transition-all duration-700 delay-100 transform ${
            phase === 'subtitle' || phase === 'exit'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="mt-3 text-xs sm:text-sm font-medium tracking-[0.2em] text-slate-400 uppercase">
            Computer Science & Engineering <span className="text-teal-400 mx-1.5">•</span> Developer <span className="text-blue-400 mx-1.5">•</span> Technologist
          </p>
        </div>
      </div>

      {/* Skip button and progress bar */}
      <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3 px-6 z-20">
        <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-teal-400 transition-all duration-100 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <button
          onClick={onComplete}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700/60 hover:border-slate-500 hover:bg-slate-800/60 transition-all duration-200 cursor-pointer"
        >
          <span>Skip Intro</span>
          <FastForward className="w-3.5 h-3.5" />
          <span className="text-[10px] text-slate-500 ml-1 font-mono">[ESC]</span>
        </button>
      </div>
    </div>
  );
};

export default IntroSequence;
