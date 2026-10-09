import React from 'react';
import { RESEARCH_TIMELINE } from '../data/portfolioData';
import { Microscope, Calendar, Building2, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const ResearchTimeline: React.FC = () => {
  return (
    <section id="research" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-mono text-blue-600 dark:text-blue-400 mb-3">
            <Microscope className="w-3.5 h-3.5" />
            <span>RESEARCH & ENGINEERING INITIATIVES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Academic Research & Technical Roles
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Documented experimental studies and hands-on project leadership carried out during undergraduate studies at University of Asia Pacific.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-8 space-y-12">
          {RESEARCH_TIMELINE.map((item) => (
            <div key={item.id} className="relative pl-6 sm:pl-10 group">
              
              {/* Timeline Node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-600 group-hover:scale-125 group-hover:border-teal-400 transition-all duration-200" />

              {/* Timeline Card */}
              <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-xl shadow-slate-200/30 dark:shadow-black/20 hover:border-blue-500/50 transition-all duration-300">
                
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-teal-400 border border-blue-200 dark:border-blue-900">
                      {item.type}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{item.period}</span>
                    </span>
                  </div>

                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{item.institution}</span>
                  </span>
                </div>

                {/* Title & Role */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <h4 className="text-sm font-semibold text-blue-600 dark:text-teal-400 mt-1 mb-4">
                  {item.role}
                </h4>

                {/* Summary */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {item.summary}
                </p>

                {/* Key Contributions */}
                <div className="space-y-2 mb-6">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    // Key Contributions & Methodology:
                  </h5>
                  <ul className="space-y-1.5">
                    {item.contributions.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Technologies and Link */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {item.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-teal-400 hover:underline"
                    >
                      <span>Explore Repository Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ResearchTimeline;
