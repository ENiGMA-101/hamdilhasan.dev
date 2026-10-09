import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Code2, Layout, Cpu, BrainCircuit, Database, Wrench, Layers } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-blue-500" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-teal-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-5 h-5 text-cyan-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-blue-400" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-teal-500" />;
      default:
        return <Layers className="w-5 h-5 text-blue-500" />;
    }
  };

  const currentCategory = SKILL_CATEGORIES[selectedCategory];

  // Flat list of all high-impact skills for the continuous marquee
  const highlightSkills = [
    'ESP32-S3',
    'C++',
    'Python',
    'React',
    'TypeScript',
    'MediaPipe CV',
    'Arduino IDE',
    'Tailwind CSS',
    'GitHub Actions',
    'MySQL',
    'I2C & Sensors',
    'Figma Design',
    'Heuristic Optimization',
    'Vite',
    'Embedded C'
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-100/40 dark:bg-[#0E1726]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-mono text-blue-600 dark:text-blue-400 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL TOOLBOX // STACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Technologies, Frameworks & Hardware
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            A verified repertoire grounded in academic computer science and validated through hardware prototypes and active software repositories.
          </p>
        </div>

        {/* Continuous Horizontal Marquee of Primary Skills */}
        <div className="mb-14 overflow-hidden pause-hover select-none py-2 border-y border-slate-200/80 dark:border-slate-800/80">
          <div className="animate-marquee-left flex items-center gap-4 text-xs font-mono">
            {highlightSkills.concat(highlightSkills).map((tech, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-800 dark:text-slate-200 whitespace-nowrap hover:border-blue-500 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="font-semibold">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Category Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-10">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isSelected = selectedCategory === idx;
            return (
              <button
                key={cat.title}
                onClick={() => setSelectedCategory(idx)}
                className={`p-3.5 rounded-2xl flex flex-col items-center text-center transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 -translate-y-1'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className={`mb-2 p-2 rounded-xl ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                  {getCategoryIcon(cat.iconName)}
                </div>
                <span className="text-xs font-bold leading-tight line-clamp-1">{cat.title}</span>
                <span className={`text-[10px] mt-1 font-mono ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                  {cat.skills.length} skills
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Skill Matrix */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xl shadow-slate-200/40 dark:shadow-black/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {getCategoryIcon(currentCategory.iconName)}
                <span>{currentCategory.title}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {currentCategory.description}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-teal-400 border border-blue-200 dark:border-blue-900/50 self-start sm:self-auto">
              Verified Technical Competencies
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentCategory.skills.map((skill, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl border transition-all duration-200 ${
                  skill.highlight
                    ? 'bg-gradient-to-br from-blue-500/5 to-teal-500/5 dark:from-blue-500/10 dark:to-teal-500/10 border-blue-200 dark:border-blue-900/60 shadow-sm'
                    : 'bg-slate-50/50 dark:bg-slate-950/40 border-slate-200/60 dark:border-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${skill.highlight ? 'bg-teal-400' : 'bg-slate-400'}`} />
                    <span>{skill.name}</span>
                  </h4>
                  {skill.highlight && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      Core
                    </span>
                  )}
                </div>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {skill.level}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
