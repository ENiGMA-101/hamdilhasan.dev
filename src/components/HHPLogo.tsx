import React from 'react';

interface HHPLogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
  theme?: 'dark' | 'light' | 'auto';
  showGlow?: boolean;
}

export const HHPLogo: React.FC<HHPLogoProps> = ({
  className = 'w-10 h-10',
  size,
  animated = false,
  showGlow = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={size ? { width: size, height: size * 0.68 } : undefined}
    >
      {showGlow && (
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 via-teal-500/20 to-blue-500/30 rounded-2xl blur-xl opacity-75 -z-10 pointer-events-none" />
      )}
      <svg
        viewBox="0 0 600 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full overflow-visible transition-transform duration-300 ${
          animated ? 'hover:scale-105' : ''
        }`}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="hhp-blue-main" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          <linearGradient id="hhp-blue-light" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>

          <linearGradient id="hhp-blue-dark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>

          <linearGradient id="hhp-teal-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="hhp-node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Group with perspective styling */}
        <g className="transition-all duration-500">
          {/* ================= LEFT 'H' (Navy / Dark Elements) ================= */}
          {/* Left vertical pillar */}
          <path
            d="M 142 190 L 178 170 L 178 370 L 142 390 Z"
            className="fill-[#0B1220] dark:fill-slate-100 transition-colors duration-300"
          />

          {/* Left top diagonal fin */}
          <path
            d="M 142 190 L 178 170 L 178 245 L 142 265 Z"
            className="fill-[#111827] dark:fill-slate-200 transition-colors duration-300"
          />

          {/* Left diagonal cross connector (lower left upward) */}
          <path
            d="M 178 270 L 232 238 L 232 290 L 178 322 Z"
            className="fill-[#0B1220] dark:fill-slate-200 transition-colors duration-300"
          />

          {/* First inner vertical pillar */}
          <path
            d="M 239 262 L 272 242 L 272 376 L 239 396 Z"
            className="fill-[#0B1220] dark:fill-slate-100 transition-colors duration-300"
          />

          {/* ================= CENTER 'H' (Electric Blue 3D Ribbon) ================= */}
          {/* Blue top vertical facet */}
          <path
            d="M 240 160 L 272 178 L 272 250 L 240 232 Z"
            fill="url(#hhp-blue-light)"
          />

          {/* Blue diagonal descending cross ribbon - Main face */}
          <path
            d="M 232 238 L 348 304 L 348 375 L 315 396 L 232 290 Z"
            fill="url(#hhp-blue-main)"
          />

          {/* Blue diagonal top edge highlight */}
          <path
            d="M 232 238 L 272 215 L 348 259 L 348 304 Z"
            fill="url(#hhp-blue-light)"
            opacity="0.9"
          />

          {/* Lower right vertical facet (underneath the ribbon) */}
          <path
            d="M 315 320 L 347 302 L 347 380 L 315 402 Z"
            fill="url(#hhp-blue-dark)"
          />
          <path
            d="M 347 302 L 356 297 L 356 375 L 347 380 Z"
            fill="url(#hhp-blue-light)"
          />

          {/* Right vertical pillar facet beside P */}
          <path
            d="M 356 270 L 386 280 L 386 385 L 356 372 Z"
            fill="url(#hhp-blue-main)"
          />

          {/* ================= RIGHT 'P' (Navy / Dark with Curved Head & Circuit Node) ================= */}
          {/* Main top stem & bowl of the 'P' */}
          <path
            d="M 315 152 
               C 315 152 320 162 335 165
               L 405 165
               C 445 165 470 188 470 230
               C 470 272 445 295 405 295
               L 380 295
               L 380 262
               L 402 262
               C 426 262 438 248 438 230
               C 438 212 426 198 402 198
               L 348 198
               L 348 290
               L 315 270
               Z"
            className="fill-[#0B1220] dark:fill-slate-100 transition-colors duration-300"
          />

          {/* Inner circuit trace in the P loop */}
          {/* Circuit line */}
          <path
            d="M 350 215 L 415 215"
            stroke="#14B8A6"
            strokeWidth="5"
            strokeLinecap="round"
            className="transition-colors duration-300"
          />
          {/* Circuit vertical connector */}
          <path
            d="M 350 205 L 350 225"
            stroke="#14B8A6"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Circuit terminal node circle with teal glow */}
          <circle
            cx="424"
            cy="215"
            r="12"
            fill="url(#hhp-teal-glow)"
            filter="url(#hhp-node-glow)"
            className="animate-pulse"
          />
          <circle
            cx="424"
            cy="215"
            r="6"
            fill="#FFFFFF"
          />
        </g>
      </svg>
    </div>
  );
};

export default HHPLogo;
