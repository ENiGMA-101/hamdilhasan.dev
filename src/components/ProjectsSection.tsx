import React, { useState, useRef, useEffect } from 'react';
import { PROJECTS, ProjectItem } from '../data/portfolioData';
import { ArrowLeft, ArrowRight, Play, Pause, ExternalLink, Cpu, Sparkles, CheckCircle2, X } from 'lucide-react';
import { GitHubIcon } from './SocialIcons';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Robotics & IoT', 'AI & ML', 'Research', 'Software & Web'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  // Manual scroll buttons
  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.75;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Continuous right-to-left auto-scroll tick
  useEffect(() => {
    if (!isAutoPlaying) return;

    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsAutoPlaying(false);
      return;
    }

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        // If reached end, smooth scroll back to 0
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 1, behavior: 'auto' });
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-[#0B1220]/60">
      {/* Background accents */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-mono text-blue-600 dark:text-blue-400 mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>VERIFIED ENGINEERING WORKS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Featured Projects & Real-World Systems
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Authentic academic research, embedded robotics prototypes, and applied AI software engineered with real microcontrollers and modern frameworks.
            </p>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
              title={isAutoPlaying ? 'Pause continuous motion' : 'Play continuous motion'}
              aria-label={isAutoPlaying ? 'Pause carousel' : 'Play carousel'}
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-900/90 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Moving Carousel Gallery */}
        <div
          ref={carouselRef}
          onMouseEnter={() => setIsAutoPlaying(false)}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-8 snap-x snap-mandatory focus:outline-none"
          tabIndex={0}
          aria-label="Horizontal projects gallery"
        >
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="flex-shrink-0 w-[300px] sm:w-[380px] lg:w-[420px] snap-start rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-black/40 hover:border-blue-500/50 dark:hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group flex flex-col justify-between"
            >
              {/* Project Image Box */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Status & Category Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-blue-600/90 text-white backdrop-blur-md">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-900/80 text-teal-400 border border-teal-500/30 backdrop-blur-md">
                    {project.status}
                  </span>
                </div>

                {project.featured && (
                  <div className="absolute bottom-3 left-4 flex items-center gap-1 text-[11px] font-mono text-teal-300 font-medium bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-sm">
                    <Sparkles className="w-3 h-3 text-teal-400" />
                    <span>Featured Engineering Work</span>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-teal-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1 mb-3">
                    {project.tagline}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags and Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-500">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-teal-400">
                    <span className="group-hover:underline">View System Specs</span>
                    <span className="font-mono text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Continuous Marquee Ticker of Key Projects & Repository highlights */}
        <div className="mt-12 py-4 px-6 rounded-2xl bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 overflow-hidden">
          <div className="flex items-center gap-4">
            <span className="flex-shrink-0 text-xs font-mono font-bold text-blue-600 dark:text-teal-400 tracking-wider uppercase">
              // PIPELINE:
            </span>
            <div className="overflow-hidden relative w-full pause-hover">
              <div className="animate-marquee-left flex items-center gap-8 text-xs font-mono text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  Indoor Food Delivery Robot (ESP32-S3 + C++ + Ultrasonic)
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Fairness-Aware Routine Optimization Research
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  Road Rash Hand Gesture CV (MediaPipe + TypeScript)
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Visible Light Communication (Optical Wireless)
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Smart IoT Hydration Telemetry System
                </span>
                {/* Duplicate for seamless infinite loop */}
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  Indoor Food Delivery Robot (ESP32-S3 + C++ + Ultrasonic)
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Fairness-Aware Routine Optimization Research
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  Road Rash Hand Gesture CV (MediaPipe + TypeScript)
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Visible Light Communication (Optical Wireless)
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Project Deep-Dive Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0E1726] border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 text-slate-900 dark:text-slate-100"
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-teal-400 mb-2">
              <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800">
                {selectedProject.category}
              </span>
              <span>•</span>
              <span>Status: {selectedProject.status}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
              {selectedProject.title}
            </h3>

            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">
              {selectedProject.tagline}
            </p>

            {/* Image Preview */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-slate-900 border border-slate-200 dark:border-slate-800">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Detailed Description */}
            <div className="space-y-4 mb-6">
              <h4 className="text-sm font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                // System Overview & Architecture
              </h4>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Stats Grid if available */}
            {selectedProject.stats && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                {selectedProject.stats.map((s, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {s.value}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Detailed Specs list */}
            {selectedProject.detailedSpecs && (
              <div className="space-y-2 mb-6">
                <h4 className="text-sm font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  // Key Technical Highlights
                </h4>
                <ul className="space-y-2">
                  {selectedProject.detailedSpecs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            <div className="mb-8">
              <h4 className="text-sm font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                // Technologies & Hardware
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs hover:opacity-90 transition-opacity"
                >
                  <GitHubIcon className="w-4 h-4" />
                  <span>Inspect Source Code</span>
                </a>
              )}
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-500 transition-colors"
                >
                  <span>Launch Live System</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ml-auto"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
