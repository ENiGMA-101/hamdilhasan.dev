import React, { useRef, useState, useEffect } from 'react';
import { CERTIFICATIONS, CertificateItem } from '../data/portfolioData';
import { Award, ArrowLeft, ArrowRight, Play, Pause, ExternalLink, ShieldCheck, Check } from 'lucide-react';
import HHPLogo from './HHPLogo';

export const CertificationsSection: React.FC = () => {
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Continuous right-to-left scroll
  useEffect(() => {
    if (!isAutoPlaying) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsAutoPlaying(false);
      return;
    }

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 1, behavior: 'auto' });
        }
      }
    }, 35);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-[#0B1220]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-xs font-mono text-teal-600 dark:text-teal-400 mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>ACCREDITATIONS & TRAININGS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Certifications & Technical Credentials
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Verified domain competencies spanning UI design systems, microcontrollers, algorithms, and web fundamentals.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
              title={isAutoPlaying ? 'Pause continuous motion' : 'Play continuous motion'}
              aria-label={isAutoPlaying ? 'Pause certificate carousel' : 'Play certificate carousel'}
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Previous certificate"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Next certificate"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Moving Certificate Track */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsAutoPlaying(false)}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-8 snap-x snap-mandatory focus:outline-none"
          tabIndex={0}
          aria-label="Horizontal certificates track"
        >
          {CERTIFICATIONS.map((cert) => {
            const isPlaceholder = cert.id.includes('placeholder');
            return (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className={`flex-shrink-0 w-[290px] sm:w-[350px] snap-start rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 cursor-pointer border ${
                  isPlaceholder
                    ? 'border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 opacity-80'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-black/30 hover:border-teal-500/50'
                }`}
              >
                <div>
                  {/* Top Header Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-teal-400 border border-blue-200 dark:border-blue-900">
                      {cert.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {cert.issueDate}
                    </span>
                  </div>

                  {/* Certificate Graphical Embellishment */}
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-5 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 p-4 flex flex-col justify-between border border-slate-800/80">
                    <div className="flex items-center justify-between">
                      <HHPLogo size={32} showGlow={false} />
                      <ShieldCheck className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                        CERTIFICATE OF COMPLETION
                      </span>
                      <p className="text-xs font-bold text-white line-clamp-1 mt-0.5">
                        {cert.title}
                      </p>
                    </div>
                  </div>

                  {/* Title & Issuer */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4 font-mono">
                    Issuer: {cert.issuer}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cert.skillsLearned.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-700 dark:text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Link */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  {cert.verifyUrl ? (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-teal-400 hover:underline"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-teal-500" />
                      <span>Verified Coursework</span>
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400 font-mono">HHP.CERT</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Dialog */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedCert(null)}
          role="dialog"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-teal-500 uppercase">
                {selectedCert.category}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {selectedCert.issueDate}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              {selectedCert.title}
            </h3>
            <p className="text-xs font-mono text-blue-600 dark:text-teal-400 mb-4">
              Issued by: {selectedCert.issuer}
            </p>

            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-mono uppercase text-slate-400">
                // Competencies Validated:
              </h4>
              <ul className="space-y-1.5">
                {selectedCert.skillsLearned.map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <Check className="w-3.5 h-3.5 text-teal-400" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              {selectedCert.verifyUrl && (
                <a
                  href={selectedCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
                >
                  <span>Open Verification Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold ml-auto"
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

export default CertificationsSection;
