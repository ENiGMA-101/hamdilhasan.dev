import React, { useState } from 'react';
import { CREATIVE_GALLERY, CreativeItem } from '../data/portfolioData';
import { Camera, Maximize2, X, Sparkles } from 'lucide-react';

export const CreativeLabSection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<CreativeItem | null>(null);

  return (
    <section id="creative-lab" className="py-24 relative overflow-hidden bg-slate-100/30 dark:bg-[#0E1726]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-xs font-mono text-teal-600 dark:text-teal-400 mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>VISUAL ARCHIVE // LAB & CODE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Creative Lab & Prototyping Gallery
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Glimpses into the workbench: microcontroller circuits, sensor breadboards, computer vision landmarks, and computational interface systems.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            6 Selected Artifacts
          </span>
        </div>

        {/* Editorial Masonry/Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CREATIVE_GALLERY.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-black/40 cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/50"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

                {/* Overlaid Category Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-black/60 text-teal-300 border border-teal-500/30 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                {/* Expand icon on hover */}
                <div className="absolute top-4 right-4 p-2 rounded-xl bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom text info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
              aria-label="Close image viewer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] max-h-[70vh] bg-black">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-[#0B1220] border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block mb-1">
                  {selectedPhoto.category}
                </span>
                <h4 className="text-xl font-bold text-white">
                  {selectedPhoto.title}
                </h4>
                <p className="text-sm text-slate-300 mt-1">
                  {selectedPhoto.description}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>Lab Photography</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CreativeLabSection;
