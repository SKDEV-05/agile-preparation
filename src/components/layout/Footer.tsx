import React from 'react';
import { CreatorCard } from './CreatorCard';
import { BookOpen, FlaskConical, GraduationCap, ChevronRight } from 'lucide-react';
import { ActiveView } from './Sidebar';
import logoImg from '../../assets/logo.webp';

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
    <footer className="mt-16 border-t border-black/10 dark:border-white/10 pt-10 pb-12 text-black/70 dark:text-white/70 transition-colors">
      {/* 1. Saad Korma Creator Highlight Card */}
      <div className="mb-10">
        <CreatorCard variant="full" />
      </div>

      {/* 2. SEO Crawlable Semantic Links Grid */}
      <div className="mb-10 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-6 sm:p-8 backdrop-blur-md shadow-xs dark:shadow-none">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
          {/* Col 1: Course Parts */}
          <div>
            <div className="flex items-center gap-2 text-[#10B981] font-bold uppercase tracking-wider mb-3">
              <BookOpen className="h-4 w-4" />
              <span>Programme EFM · Approche Agile</span>
            </div>
            <ul className="space-y-2 text-black/80 dark:text-white/85">
              <li>
                <a
                  href="/course/part1"
                  onClick={(e) => handleLinkClick(e, 'part1')}
                  className="hover:text-[#10B981] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40" />
                  <span>Partie 1 : Fondamentaux & Cycle de vie</span>
                </a>
              </li>
              <li>
                <a
                  href="/course/part2"
                  onClick={(e) => handleLinkClick(e, 'part2')}
                  className="hover:text-[#10B981] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40" />
                  <span>Partie 2 : Réseau PERT & Diagramme de Gantt</span>
                </a>
              </li>
              <li>
                <a
                  href="/course/part3"
                  onClick={(e) => handleLinkClick(e, 'part3')}
                  className="hover:text-[#10B981] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40" />
                  <span>Partie 3 : Méthode Agile, Scrum & Jira</span>
                </a>
              </li>
              <li>
                <a
                  href="/course/part4"
                  onClick={(e) => handleLinkClick(e, 'part4')}
                  className="hover:text-[#10B981] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40" />
                  <span>Partie 4 : Architecture Git 4 Zones & Sonar</span>
                </a>
              </li>
              <li>
                <a
                  href="/course/part5"
                  onClick={(e) => handleLinkClick(e, 'part5')}
                  className="hover:text-[#10B981] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40" />
                  <span>Partie 5 : Culture DevOps & GitLab CI</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Laboratory Simulators */}
          <div>
            <div className="flex items-center gap-2 text-[#22C55E] font-bold uppercase tracking-wider mb-3">
              <FlaskConical className="h-4 w-4" />
              <span>Simulateurs Pratiques</span>
            </div>
            <ul className="space-y-2 text-black/80 dark:text-white/85">
              <li>
                <a
                  href="/simulators"
                  onClick={(e) => handleLinkClick(e, 'simulators')}
                  className="hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40" />
                  <span>Calculateur Réseau PERT & Marges</span>
                </a>
              </li>
              <li>
                <a
                  href="/simulators"
                  onClick={(e) => handleLinkClick(e, 'simulators')}
                  className="hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40" />
                  <span>Diagramme de Gantt avec Dépendances</span>
                </a>
              </li>
              <li>
                <a
                  href="/simulators"
                  onClick={(e) => handleLinkClick(e, 'simulators')}
                  className="hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40" />
                  <span>Scrum Board & Poker Planning</span>
                </a>
              </li>
              <li>
                <a
                  href="/simulators"
                  onClick={(e) => handleLinkClick(e, 'simulators')}
                  className="hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40" />
                  <span>Terminal Git CLI & 4 Zones interactives</span>
                </a>
              </li>
              <li>
                <a
                  href="/simulators"
                  onClick={(e) => handleLinkClick(e, 'simulators')}
                  className="hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40" />
                  <span>Pipeline CI/CD .gitlab-ci.yml</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Exams & Tools */}
          <div>
            <div className="flex items-center gap-2 text-[#10B981] font-bold uppercase tracking-wider mb-3">
              <GraduationCap className="h-4 w-4" />
              <span>Examens & Entraînements</span>
            </div>
            <ul className="space-y-2 text-black/80 dark:text-white/85">
              <li>
                <a
                  href="/exam"
                  onClick={(e) => handleLinkClick(e, 'final-exam')}
                  className="hover:text-[#10B981] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40" />
                  <span>Examen Blanc 50 QCM (Chronomètre 45 min)</span>
                </a>
              </li>
              <li>
                <a
                  href="/flashcards"
                  onClick={(e) => handleLinkClick(e, 'flashcards')}
                  className="hover:text-[#10B981] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40" />
                  <span>Flashcards 3D de Révision Rapide</span>
                </a>
              </li>
              <li>
                <a
                  href="/errors"
                  onClick={(e) => handleLinkClick(e, 'errors')}
                  className="hover:text-[#10B981] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40" />
                  <span>Carnet Pédagogique des Erreurs</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Platform Branding & Copyright */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-black/60 dark:text-white/60">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg overflow-hidden border border-black/10 dark:border-white/10 shrink-0 shadow-xs">
            <img src={logoImg} alt="Logo FullStack 2A" width={28} height={28} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
          <span className="font-bold text-black dark:text-white">FULLSTACK <span className="text-[#10B981]">2A</span></span>
          <span className="text-black/20 dark:text-white/20">|</span>
          <span>Développement Digital · Web & Mobile</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-medium text-black/60 dark:text-white/60">
          <span>200 Questions d'examen</span>
          <span>•</span>
          <span>5 Simulateurs temps réel</span>
          <span>•</span>
          <span>Modèles 3D Interactifs</span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-black dark:text-white font-semibold bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 px-3 py-1 rounded-lg">
            Conçu pour les stagiaires de la filière Développement Digital (Full Stack 2ème Année) · OFPPT Maroc
          </span>
        </div>
      </div>
    </footer>
  );
}
