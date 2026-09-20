import React from 'react';

interface PlatformLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

/**
 * Authentic, transparent brand logo for FullStack 2A platform.
 * Features an isometric code stack glyph in emerald & green gradients with 0 background.
 */
export function PlatformLogo({
  size = 36,
  className = '',
  showText = false,
  textClassName = ''
}: PlatformLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* 100% Transparent SVG Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 hover:scale-105"
        aria-label="FullStack 2A Logo"
      >
        <defs>
          {/* Strict 4-color gradients: #10B981, #22C55E, #FFFFFF */}
          <linearGradient id="fsGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          <linearGradient id="fsGradAccent" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <linearGradient id="fsGradGlow" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <filter id="fsGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#10B981" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Isometric 3D Hexagonal Tech Prism */}
        <g filter="url(#fsGlowFilter)">
          {/* Top Diamond Facet */}
          <path
            d="M24 3L42 13.5L24 24L6 13.5L24 3Z"
            fill="url(#fsGradPrimary)"
          />
          {/* Top highlight overlay */}
          <path
            d="M24 3L42 13.5L24 24L6 13.5L24 3Z"
            fill="url(#fsGradGlow)"
          />

          {/* Left Isometric Facet */}
          <path
            d="M6 13.5L24 24V45L6 34.5V13.5Z"
            fill="url(#fsGradAccent)"
          />

          {/* Right Isometric Facet */}
          <path
            d="M24 24L42 13.5V34.5L24 45V24Z"
            fill="url(#fsGradPrimary)"
            fillOpacity="0.9"
          />

          {/* Stylized Code Bracket "<" on Left Facet */}
          <path
            d="M17 26.5L11.5 29.5L17 32.5"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Stylized Code Bracket ">" on Right Facet */}
          <path
            d="M31 26.5L36.5 29.5L31 32.5"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Slash "/" in Center Axis */}
          <line
            x1="26"
            y1="25.5"
            x2="22"
            y2="33.5"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Inner Core Accent on Top Face */}
          <polygon
            points="24,9 33,14 24,19 15,14"
            fill="#FFFFFF"
            fillOpacity="0.25"
          />
          <circle cx="24" cy="14" r="2.2" fill="#FFFFFF" />
        </g>
      </svg>

      {/* Optional Platform Title Lockup */}
      {showText && (
        <div className={`flex flex-col leading-tight ${textClassName}`}>
          <div className="flex items-center gap-1.5 font-sans font-black tracking-tight text-black dark:text-white">
            <span>FULLSTACK</span>
            <span className="rounded-md bg-gradient-to-r from-[#10B981] to-[#22C55E] px-1.5 py-0.5 text-[11px] font-bold text-white shadow-sm">
              2A
            </span>
          </div>
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-black/50 dark:text-white/50">
            OFPPT · DÉV DIGITAL
          </span>
        </div>
      )}
    </div>
  );
}
