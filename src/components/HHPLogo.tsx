/* ==========================================================================
   HHPLogo — the HHP monogram as a theme-aware vector
   --------------------------------------------------------------------------
   Geometric interwoven lettering: navy H pillars, electric-blue ribbon H,
   navy P bowl, teal circuit trace terminating in a node.
   Colours resolve from the theme tokens, so the mark inverts correctly in
   light mode (navy → ink) and keeps its blue/teal accents in both themes.
   ========================================================================== */

interface HHPLogoProps {
  className?: string;
  size?: number;
  /** Slow breathing glow behind the mark (used in hero/intro only). */
  showGlow?: boolean;
  title?: string;
}

export function HHPLogo({
  className = "",
  size,
  showGlow = false,
  title = "HHP monogram",
}: HHPLogoProps) {
  return (
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
      style={size ? { width: size, height: size * 0.68 } : undefined}
    >
      {showGlow && (
        <span
          aria-hidden="true"
          className="absolute -inset-3 -z-10 rounded-2xl bg-[var(--accent-solid)] opacity-20 blur-2xl"
        />
      )}
      <svg
        viewBox="0 0 600 420"
        role="img"
        aria-label={title}
        className="h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="hhpBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent-solid)" />
            <stop offset="100%" stopColor="var(--aqua-solid)" />
          </linearGradient>
          <linearGradient id="hhpBlueDeep" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-solid)" />
            <stop offset="100%" stopColor="var(--accent-text)" />
          </linearGradient>
        </defs>

        {/* Left "H" — pillar + crossbar (navy in dark, ink in light) */}
        <path
          d="M142 190 178 170v200l-36 20Z"
          fill="var(--content-primary)"
        />
        <path d="M178 270 232 238v52l-54 32Z" fill="var(--content-primary)" opacity="0.72" />
        <path d="M239 262 272 242v134l-33 20Z" fill="var(--content-primary)" />

        {/* Centre "H" — the electric-blue 3D ribbon */}
        <path d="M240 160 272 178v72l-32-18Z" fill="var(--accent-solid)" />
        <path d="M232 238 348 304v71l-33 21-83-108Z" fill="url(#hhpBlue)" />
        <path d="M232 238 272 215l76 44v45l-76-45Z" fill="var(--accent-solid)" opacity="0.55" />
        <path d="M315 320 347 302v78l-32 22Z" fill="url(#hhpBlueDeep)" />
        <path d="M356 270 386 280v105l-30-13Z" fill="var(--accent-solid)" />

        {/* Right "P" — navy bowl with teal circuit trace */}
        <path
          d="M315 152c0 0 5 10 20 13l70 0c40 0 65 23 65 65s-25 65-65 65h-25v-33h22c24 0 36-14 36-32s-12-32-36-32h-54v92l-33-20Z"
          fill="var(--content-primary)"
        />
        <path
          d="M350 215h65"
          stroke="var(--aqua-solid)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M350 205v20"
          stroke="var(--aqua-solid)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="424" cy="215" r="13" fill="var(--aqua-solid)" />
        <circle cx="424" cy="215" r="6" fill="var(--surface-canvas)" />
      </svg>
    </span>
  );
}

export default HHPLogo;
