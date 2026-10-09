import React from 'react';
import { EDUCATION } from '../data/portfolioData';
import { GraduationCap, BookOpen, MapPin, Building, Sparkles } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-mono text-blue-600 dark:text-blue-400 mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION // CSE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Education & Academic Curriculum
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Rigorous undergraduate computer science and engineering coursework pairing fundamental algorithmic theory with embedded systems and systems software.
          </p>
        </div>

        {/* Education Main Card */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl shadow-slate-200/50 dark:shadow-black/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Degree Summary */}
            <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 pb-6 lg:pb-0 lg:pr-8">
              <div>
                <div className="p-3 w-fit rounded-2xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-teal-400 mb-4">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                  {EDUCATION.degree}
                </h3>
                <h4 className="text-base font-semibold text-blue-600 dark:text-teal-400 mt-1">
                  {EDUCATION.institution}
                </h4>

                <div className="flex flex-col gap-2 mt-4 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{EDUCATION.department}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{EDUCATION.location}</span>
                  </span>
                </div>

                <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-xs font-mono text-teal-700 dark:text-teal-300">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                  <span>{EDUCATION.status}</span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  // Academic Focus
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {EDUCATION.academicFocus}
                </p>
              </div>
            </div>

            {/* Coursework Matrix */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span>Key Completed & In-Progress Coursework</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {EDUCATION.coreCoursework.map((course, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800/80 flex items-center gap-2.5 text-xs font-medium text-slate-800 dark:text-slate-200 hover:border-blue-400/50 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/30 border border-blue-200/60 dark:border-blue-900/40 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-teal-400 flex-shrink-0" />
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white">Active Research Track:</strong> Leading lab investigations in visible light optical wireless communication and heuristic timetable fairness algorithms.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default EducationSection;
