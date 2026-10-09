import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Compass, GraduationCap, MapPin, Sparkles, Terminal, CheckCircle } from 'lucide-react';
import HHPLogo from './HHPLogo';

export const AboutSection: React.FC = () => {
  const philosophies = [
    {
      title: 'Practical Hardware-Software Synthesis',
      description: 'Bridging low-level firmware (C++, ESP32, sensors) with responsive web and desktop graphical interfaces.'
    },
    {
      title: 'Algorithmic Fairness & Utility',
      description: 'Tackling real academic and civic scheduling conflicts through constraint optimization, not just theoretical toy problems.'
    },
    {
      title: 'Build in Public & Clean Documentation',
      description: 'Commitment to maintainable code, descriptive READMEs, and open source collaboration on GitHub.'
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-xs font-mono text-teal-600 dark:text-teal-400 mb-4">
          <Terminal className="w-3.5 h-3.5" />
          <span>DEVELOPER PROFILE // UAP CSE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Portrait & Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              
              {/* Outer Decorative Glow */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-600/20 via-teal-500/20 to-indigo-600/20 blur-xl opacity-70 -z-10" />

              {/* Card Container */}
              <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
                
                {/* Editorial Portrait */}
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-950">
                  <img
                    src="/images/about/portrait-hamdil.jpg"
                    alt="Hamdil Hasan Partho - Computer Science & Engineering"
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />

                  {/* Overlaid Badges */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3">
                      <HHPLogo size={48} showGlow={true} />
                      <div>
                        <h3 className="text-lg font-bold text-white tracking-wide">
                          Hamdil Hasan Partho
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-teal-300 font-mono">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Dhaka, Bangladesh</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Quick Info */}
                <div className="p-5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-mono">CURRENT INSTITUTION</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Univ. of Asia Pacific</span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-slate-500 dark:text-slate-400 font-mono">PROGRAM</span>
                    <span className="font-semibold text-blue-600 dark:text-teal-400">B.Sc. in CSE</span>
                  </div>
                </div>

              </div>

              {/* Floating Monogram Chip */}
              <div className="absolute -bottom-5 -right-5 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl hidden sm:flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-teal-500" />
                <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  HHP IDENTITY
                </span>
              </div>

            </div>
          </div>

          {/* Right Column: Editorial Narrative & Principles */}
          <div className="lg:col-span-7 flex flex-col">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-6">
              Engineering with curiosity, precision, and practical purpose.
            </h2>

            <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              {PERSONAL_INFO.aboutBio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* University & Degree Callout Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 to-teal-50/80 dark:from-blue-950/40 dark:to-teal-950/30 border border-blue-200/80 dark:border-blue-900/60 mb-8">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-blue-600 text-white flex-shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {PERSONAL_INFO.degree}
                  </h4>
                  <p className="text-xs text-blue-700 dark:text-teal-400 font-medium mt-0.5">
                    {PERSONAL_INFO.institution} • {PERSONAL_INFO.location}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                    Focus on Algorithms, Microprocessors, Database Management Systems, and Artificial Intelligence research.
                  </p>
                </div>
              </div>
            </div>

            {/* Engineering Principles */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-blue-500" />
                <span>HOW I APPROACH ENGINEERING</span>
              </h4>

              <div className="space-y-3">
                {philosophies.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/40 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </h5>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
