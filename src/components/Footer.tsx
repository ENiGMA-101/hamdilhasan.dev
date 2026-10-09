import React from 'react';
import HHPLogo from './HHPLogo';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './SocialIcons';

interface FooterProps {
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-14 border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#080D17] text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-100 dark:border-slate-800/60">
          
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <HHPLogo size={44} showGlow={false} />
            <div>
              <span className="font-extrabold text-base text-slate-900 dark:text-white block">
                Hamdil Hasan Partho
              </span>
              <span className="text-xs font-mono text-slate-500">
                CSE Undergraduate • University of Asia Pacific
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <a href="#projects" className="hover:text-blue-500 transition-colors">Projects</a>
            <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
            <a href="#skills" className="hover:text-blue-500 transition-colors">Skills</a>
            <a href="#education" className="hover:text-blue-500 transition-colors">Education</a>
            <a href="#research" className="hover:text-blue-500 transition-colors">Research</a>
            <a href="#creative-lab" className="hover:text-blue-500 transition-colors">Lab</a>
            <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
          </div>

          {/* Socials & Replay Intro */}
          <div className="flex items-center gap-3">
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                title="Replay intro monogram sequence"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Replay Intro</span>
              </button>
            )}

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer ml-2 shadow-sm"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Copyright notice & Editorial Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} Hamdil Hasan Partho (HHP). All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>in Dhaka, Bangladesh</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
