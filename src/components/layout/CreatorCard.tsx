import React, { useState, useEffect } from 'react';
import saadImage from '../../assets/saadimage.webp';
import { ExternalLink, Clock } from 'lucide-react';

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface CreatorCardProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export function CreatorCard({ variant = 'full', className = '' }: CreatorCardProps) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    if (variant !== 'compact') return;

    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [variant]);

  if (variant === 'compact') {
    return (
      <div className={`group relative rounded-xl p-[1px] bg-gradient-to-r from-slate-700/60 via-indigo-500/40 to-slate-700/60 hover:from-indigo-500 hover:via-pink-500 hover:to-amber-500 transition-all duration-500 shadow-md ${className}`}>
        <div className="relative rounded-xl bg-slate-900/90 backdrop-blur-md p-2.5 flex items-center justify-between gap-2.5 shadow-md border border-white/5">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Picture with Instagram gradient ring on hover */}
            <div className="relative shrink-0">
              <div className="h-9 w-9 rounded-lg p-[1.5px] bg-gradient-to-tr from-amber-500 via-pink-500 to-indigo-600 transition-transform duration-300 group-hover:scale-105 shadow-sm">
                <img
                  src={saadImage}
                  alt="Saâd Korma"
                  width={36}
                  height={36}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover rounded-[6px]"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-slate-900">
                <span className="h-1 w-1 rounded-full bg-white animate-pulse" />
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold text-white truncate">Saâd Korma</span>
                <span className="text-[9px] text-indigo-400 font-bold">✓</span>
              </div>
              <p className="text-[10px] text-slate-400 truncate font-mono">Web & Mobile Dev</p>
              <div className="flex items-center gap-1 text-[9px] text-slate-400 font-mono mt-0.5">
                <Clock className="h-2.5 w-2.5 text-slate-400" />
                <span>{timeStr || '--:--:--'}</span>
              </div>
            </div>
          </div>

          {/* Instagram Button */}
          <a
            href="https://www.instagram.com/saadkorma_dev/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visiter le profil Instagram de Saâd Korma"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-pink-500 to-indigo-600 text-white shadow-md transition-transform duration-200 hover:scale-110 hover:shadow-indigo-500/30"
            title="Instagram @saadkorma_dev"
          >
            <InstagramIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    );
  }

  // Full Variant (for Footers & Highlights)
  return (
    <div className={`group relative rounded-3xl p-[1.5px] bg-gradient-to-r from-slate-700/60 via-indigo-500/30 to-slate-700/60 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-500 shadow-xl ${className}`}>
      <div className="relative rounded-3xl bg-slate-900/95 backdrop-blur-xl p-5 sm:p-7 overflow-hidden border border-white/10">
        {/* Subtle background decorative shapes */}
        <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />
        <div className="absolute right-20 -top-10 h-32 w-32 rounded-full bg-pink-500/10 blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative z-10">
          {/* Creator Profile Info */}
          <div className="flex items-start sm:items-center gap-4">
            {/* Real Picture with Animated Gradient Ring */}
            <div className="relative shrink-0">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl p-[3px] bg-gradient-to-tr from-amber-400 via-pink-500 to-indigo-600 shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:rotate-1">
                <img
                  src={saadImage}
                  alt="Saâd Korma"
                  width={80}
                  height={80}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover rounded-[13px] filter contrast-[1.02]"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-3 ring-slate-900 shadow-xs" title="En direct / En ligne">
                <span className="h-2 w-2 rounded-full bg-white animate-ping opacity-75" />
                <span className="absolute h-2 w-2 rounded-full bg-white" />
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/20 px-2.5 py-0.5 rounded-lg border border-indigo-500/30">
                  Créateur & Développeur
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-lg border border-white/5">
                  <Clock className="h-3 w-3 text-slate-400" />
                  <span>{timeStr || 'Maroc'}</span>
                </span>
              </div>

              <h3 className="mt-1.5 text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>Saâd Korma</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white text-[11px]" title="Créateur vérifié">
                  ✓
                </span>
              </h3>

              <p className="text-xs text-slate-300 font-medium mt-1 leading-snug">
                💻 Web & Mobile Developer · 🎮 Game Design & Animation <span className="text-indigo-400 font-semibold font-mono">@ensad.ma</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-1 max-w-xl">
                Créé avec rigueur et passion pour accompagner les stagiaires dans leur réussite aux examens finaux de formation.
              </p>
            </div>
          </div>

          {/* Social CTAs */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
            <a
              href="https://www.instagram.com/saadkorma_dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white text-xs font-bold shadow-md shadow-pink-500/20 hover:shadow-pink-500/40 hover:scale-105 transition-all"
            >
              <InstagramIcon className="h-4 w-4" />
              <span>@saadkorma_dev</span>
              <ExternalLink className="h-3 w-3 opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
