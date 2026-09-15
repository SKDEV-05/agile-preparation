import React from 'react';
import { CreatorCard } from './CreatorCard';
import { Heart } from 'lucide-react';
import { ActiveView } from './Sidebar';
import logoImg from '../../assets/logo.jpg';

interface FooterProps {
  onNavigate?: (view: ActiveView) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="mt-16 border-t border-white/10 pt-10 pb-12 text-slate-400">
      {/* 1. Saad Korma Creator Highlight Card */}
      <div className="mb-10">
        <CreatorCard variant="full" />
      </div>

      {/* 2. Platform Information and Links */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg overflow-hidden border border-white/10 shrink-0">
            <img src={logoImg} alt="Logo FullStack 2A" className="h-full w-full object-cover" />
          </div>
          <span className="font-bold text-white">FULLSTACK <span className="text-indigo-400">2A</span></span>
          <span className="text-slate-600">|</span>
          <span>Développement Digital · Web & Mobile</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-medium text-slate-400">
          <span>200 Questions d'examen</span>
          <span>•</span>
          <span>5 Simulateurs temps réel</span>
          <span>•</span>
          <span>Modèles 3D & Vidéos FR/EN</span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-slate-300 font-semibold bg-slate-900/90 border border-white/10 px-3 py-1 rounded-lg">
            Conçu avec <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> pour les stagiaires de la filière Développement Digital (Full Stack 2ème Année) · OFPPT Maroc
          </span>
        </div>
      </div>
    </footer>
  );
}
