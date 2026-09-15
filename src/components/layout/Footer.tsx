import React from 'react';
import { CreatorCard } from './CreatorCard';
import { Heart, BookOpen, FlaskConical, GraduationCap, ChevronRight } from 'lucide-react';
import { ActiveView } from './Sidebar';
import logoImg from '../../assets/logo.jpg';

interface FooterProps {
  onNavigate?: (view: ActiveView) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, view: ActiveView) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="mt-16 border-t border-white/10 pt-10 pb-12 text-slate-400">
      {/* 1. Saad Korma Creator Highlight Card */}
      <div className="mb-10">
        <CreatorCard variant="full" />
      </div>

      {/* 2. SEO Crawlable Semantic Links Grid (Accelerates Google Sitelinks & Subpage Indexing) */}
      <div className="mb-10 rounded-2xl border border-white/10 bg-[#070B14]/80 p-6 sm:p-8 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
          {/* Col 1: Course Parts */}
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-wider mb-3">
              <BookOpen className="h-4 w-4" />
              <span>Programme EFM · Approche Agile</span>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a
                  href="/course/part1"
                  onClick={(e) => handleLinkClick(e, 'part1')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-slate-500" />
                  <span>Partie 1 : Fondamentaux & Cycle de vie</span>
                </a>
              </li>
              <li>
                <a
                  href="/course/part2"
                  onClick={(e) => handleLinkClick(e, 'part2')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-slate-500" />
                  <span>Partie 2 : Réseau PERT & Diagramme de Gantt</span>
                </a>
              </li>
              <li>
                <a
                  href="/course/part3"
                  onClick={(e) => handleLinkClick(e, 'part3')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-slate-500" />
                  <span>Partie 3 : Méthode Agile, Scrum & Jira</span>
                </a>
              </li>
              <li>
                <a
                  href="/course/part4"
                  onClick={(e) => handleLinkClick(e, 'part4')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-slate-500" />
                  <span>Partie 4 : Architecture Git 4 Zones & Sonar</span>
                </a>
              </li>
              <li>
                <a
                  href="/course/part5"
                  onClick={(e) => handleLinkClick(e, 'part5')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-slate-500" />
                  <span>Partie 5 : Culture DevOps & GitLab CI</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Laboratory Simulators */}
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider mb-3">
              <FlaskConical className="h-4 w-4" />
              <span>Simulateurs Pratiques</span>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a
                  href="/simulators"
                  onClick={(e) => handleLinkClick(e, 'simulators')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-slate-500" />
                  <span>Calculateur Réseau PERT & Marges</span>
                </a>
              </li>
              <li>
                <a
                  href="/simulators"
                  onClick={(e) => handleLinkClick(e, 'simulators')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-slate-500" />
                  <span>Diagramme de Gantt avec Dépendances</span>
                </a>
              </li>
              <li>
                <a
                  href="/simulators"
                  onClick={(e) => handleLinkClick(e, 'simulators')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-slate-500" />
                  <span>Scrum Board & Poker Planning</span>
                </a>
              </li>
              <li>
                <a
                  href="/simulators"
                  onClick={(e) => handleLinkClick(e, 'simulators')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-slate-500" />
                  <span>Terminal Git CLI & 4 Zones interactives</span>
                </a>
              </li>
              <li>
                <a
                  href="/simulators"
                  onClick={(e) => handleLinkClick(e, 'simulators')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-slate-500" />
                  <span>Pipeline CI/CD .gitlab-ci.yml</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Exams & Tools */}
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider mb-3">
              <GraduationCap className="h-4 w-4" />
              <span>Examens & Entraînements</span>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a
                  href="/exam"
                  onClick={(e) => handleLinkClick(e, 'final-exam')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-slate-500" />
                  <span>Examen Blanc 50 QCM (Chronomètre 45 min)</span>
                </a>
              </li>
              <li>
                <a
                  href="/flashcards"
                  onClick={(e) => handleLinkClick(e, 'flashcards')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-slate-500" />
                  <span>Flashcards 3D de Révision Rapide</span>
                </a>
              </li>
              <li>
                <a
                  href="/errors"
                  onClick={(e) => handleLinkClick(e, 'errors')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-slate-500" />
                  <span>Carnet Pédagogique des Erreurs</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Platform Branding & Copyright */}
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
          <span>Modèles 3D Interactifs</span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-slate-300 font-semibold bg-slate-900/90 border border-white/10 px-3 py-1 rounded-lg">
            Conçu avec <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> pour les stagiaires de la filière Développement Digital (Full Stack 2ème Année) · OFPPT Maroc
          </span>
        </div>
      </div>
    </footer>
  );
}
