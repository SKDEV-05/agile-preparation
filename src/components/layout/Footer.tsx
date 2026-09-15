import React from 'react';
import { CreatorCard } from './CreatorCard';
import { BookOpen, ShieldCheck, Heart } from 'lucide-react';
import { ActiveView } from './Sidebar';

import logoImg from '../../assets/logo.jpg';

interface FooterProps {
  onNavigate?: (view: ActiveView) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="mt-16 border-t border-slate-200/80 pt-10 pb-12">
      {/* 1. Saad Korma Creator Highlight Card */}
      <div className="mb-10">
        <CreatorCard variant="full" />
      </div>

      {/* 2. Platform Information and Links */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg overflow-hidden border border-slate-200 shrink-0">
            <img src={logoImg} alt="Logo FullStack Master" className="h-full w-full object-cover" />
          </div>
          <span className="font-bold text-slate-800">FULLSTACK MASTER · 2ème Année</span>
          <span className="text-slate-300">|</span>
          <span>Développement Digital & Gestion de Projet</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-medium text-slate-400">
          <span>200 Questions officielles</span>
          <span>•</span>
          <span>5 Simulateurs interactifs</span>
          <span>•</span>
          <span>Modèles 3D & Vidéos</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-slate-600 font-semibold bg-slate-100 px-2.5 py-1 rounded-lg">
            Conçu avec <Heart className="h-3 w-3 text-red-500 fill-red-500" /> pour les stagiaires de la filière Développement Digital (Full Stack 2ème Année) · OFPPT Maroc
          </span>
        </div>
      </div>
    </footer>
  );
}
