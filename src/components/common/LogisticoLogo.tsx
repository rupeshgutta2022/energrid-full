import React from 'react';

export interface LogisticoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showSubtext?: boolean;
  variant?: 'light' | 'dark' | 'monochrome';
}

/**
 * Logistico Bespoke Brand Identity Mark
 * 
 * Crafted human-designer identity featuring:
 * 1. An isometric multi-planar geometric emblem: fusing an architectural "L" monogram,
 *    an interconnected 3D freight cube, and a precision forward-motion speed chevron.
 * 2. Mathematical 30° isometric perspective with optical chamfering and layered shadow planes.
 * 3. Humanist geometric wordmark with custom letter tracking and signature isometric dot.
 */
export const LogisticoLogo: React.FC<LogisticoLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  showSubtext = false,
  variant = 'dark'
}) => {
  const dimensions = {
    sm: { box: 28, mark: 28, text: 'text-sm font-black', subtext: 'text-[8px] tracking-[0.18em]' },
    md: { box: 36, mark: 36, text: 'text-lg font-black', subtext: 'text-[9px] tracking-[0.2em]' },
    lg: { box: 46, mark: 46, text: 'text-2xl font-black', subtext: 'text-[10px] tracking-[0.22em]' },
    xl: { box: 58, mark: 58, text: 'text-3xl font-black', subtext: 'text-[11px] tracking-[0.24em]' }
  }[size];

  // Variant color mappings
  const textColor = variant === 'light' ? 'text-white' : variant === 'monochrome' ? 'text-current' : 'text-slate-900';
  const subtextColor = variant === 'light' ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Hand-crafted Isometric Monogram Emblem */}
      <div className="shrink-0 flex items-center justify-center relative">
        <svg
          width={dimensions.box}
          height={dimensions.box}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xs"
        >
          <defs>
            {/* Top Plane: High-light orange */}
            <linearGradient id="logistico_top" x1="24" y1="4" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF7E5F" />
              <stop offset="100%" stopColor="#FF5733" />
            </linearGradient>
            
            {/* Left Plane: Signature Brand Orange */}
            <linearGradient id="logistico_left" x1="6" y1="14" x2="24" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF4D2A" />
              <stop offset="100%" stopColor="#E03616" />
            </linearGradient>

            {/* Right Plane: Deep Crimson Shadow */}
            <linearGradient id="logistico_right" x1="24" y1="24" x2="42" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D6280B" />
              <stop offset="100%" stopColor="#9E1B05" />
            </linearGradient>

            {/* Dynamic Speed Ribbon Accent */}
            <linearGradient id="logistico_ribbon" x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FFF2EE" stopOpacity="0.85" />
            </linearGradient>

            {/* Soft Ambient Shadow below mark */}
            <radialGradient id="logistico_shadow" cx="24" cy="44" r="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ground Contact Shadow */}
          <ellipse cx="24" cy="44.5" rx="16" ry="2.5" fill="url(#logistico_shadow)" />

          {/* Left Facet: Monogram "L" Spine */}
          <path
            d="M6 14.5L24 24.8V44L6 33.7V14.5Z"
            fill="url(#logistico_left)"
          />

          {/* Right Facet: Cube Dimension */}
          <path
            d="M24 24.8L42 14.5V33.7L24 44V24.8Z"
            fill="url(#logistico_right)"
          />

          {/* Top Facet: Horizon Cargo Deck */}
          <path
            d="M24 4.5L42 14.5L24 24.8L6 14.5L24 4.5Z"
            fill="url(#logistico_top)"
          />

          {/* Human-Designer Stylized Geometric "L" Ribbon Fold & Forward Arrow */}
          {/* Vertical 'L' ribbon bar with 3D isometric bevel */}
          <path
            d="M13 13.5L19 10L19 32L13 28.5V13.5Z"
            fill="url(#logistico_ribbon)"
            fillOpacity="0.92"
          />
          
          {/* Base 'L' ribbon wing reaching forward across transit planes */}
          <path
            d="M19 32L34 23.5L34 28L19 36.5V32Z"
            fill="#FFFFFF"
          />

          {/* Dynamic Forward Speed Notch / Origin Transit Dot */}
          <polygon
            points="31,11 38,15 31,19 24,15"
            fill="#FFEBE5"
            fillOpacity="0.9"
          />

          {/* Outer Vertex Chamfers & Edge Precision Highlights */}
          <path
            d="M24 4.5L42 14.5M24 4.5L6 14.5M24 4.5V24.8"
            stroke="#FFFFFF"
            strokeWidth="0.8"
            strokeOpacity="0.4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Bespoke Wordmark */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center">
            <span className={`${dimensions.text} ${textColor} tracking-tight font-sans flex items-baseline`}>
              <span>LOGISTIC</span>
              <span className="relative inline-block text-[#FF4D2A]">
                O
                {/* Subtle internal crosshair dot on the terminal O, representing delivery pin */}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-[#FF4D2A]/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </span>
            </span>
          </div>
          {showSubtext && (
            <span className={`${dimensions.subtext} ${subtextColor} uppercase font-bold mt-0.5 tracking-wider font-mono`}>
              Global Supply Chain OS
            </span>
          )}
        </div>
      )}
    </div>
  );
};
