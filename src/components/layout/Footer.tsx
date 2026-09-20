import React from 'react';
import { CreatorCard } from './CreatorCard';
import { BookOpen, FlaskConical, GraduationCap, ChevronRight, Code2 } from 'lucide-react';
import { ActiveView } from './Sidebar';
import { PlatformLogo } from '../common/PlatformLogo';

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

      {/* 2. SEO Crawlable Semantic Links Grid (Agile & React M204) */}
      <div className="mb-10 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-6 sm:p-8 backdrop-blur-md shadow-xs dark:shadow-none">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
          {/* Col 1: Agile Course Parts */}
          <div>
            <div className="flex items-center gap-2 text-[#10B981] font-bold uppercase tracking-wider mb-3">
              <BookOpen className="h-4 w-4" />
              <span>Programme EFM · Agile</span>
            </div>
            <ul className="space-y-2 text-black/80 dark:text-white/85">
              <li>
                <a
                  href="/course/part1"
                  onClick={(e) => handleLinkClick(e, 'part1')}
                  className="hover:text-[#10B981] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Partie 1 : Fondamentaux &amp; Cycle de vie</span>
                </a>
              </li>
              <li>
                <a
                  href="/course/part2"
                  onClick={(e) => handleLinkClick(e, 'part2')}
                  className="hover:text-[#10B981] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Partie 2 : Réseau PERT &amp; Gantt</span>
                </a>
              </li>
              <li>
                <a
                  href="/course/part3"
                  onClick={(e) => handleLinkClick(e, 'part3')}
                  className="hover:text-[#10B981] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Partie 3 : Méthode Agile, Scrum &amp; Jira</span>
                </a>
              </li>
              <li>
                <a
                  href="/course/part4"
                  onClick={(e) => handleLinkClick(e, 'part4')}
                  className="hover:text-[#10B981] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Partie 4 : Architecture Git 4 Zones</span>
                </a>
              </li>
              <li>
                <a
                  href="/course/part5"
                  onClick={(e) => handleLinkClick(e, 'part5')}
                  className="hover:text-[#10B981] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Partie 5 : Culture DevOps &amp; GitLab CI</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: React Course Modules */}
          <div>
            <div className="flex items-center gap-2 text-[#22C55E] font-bold uppercase tracking-wider mb-3">
              <Code2 className="h-4 w-4" />
              <span>Cursus EFM · React.js</span>
            </div>
            <ul className="space-y-2 text-black/80 dark:text-white/85">
              <li>
                <a
                  href="/react-course"
                  onClick={(e) => handleLinkClick(e, 'react-module1')}
                  className="hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Module 1 : Architecture Web &amp; SPA</span>
                </a>
              </li>
              <li>
                <a
                  href="/react-course"
                  onClick={(e) => handleLinkClick(e, 'react-module2')}
                  className="hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Module 2 : JavaScript Moderne ES6+</span>
                </a>
              </li>
              <li>
                <a
                  href="/react-course"
                  onClick={(e) => handleLinkClick(e, 'react-module3')}
                  className="hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Module 3 : React Architecture &amp; Vite</span>
                </a>
              </li>
              <li>
                <a
                  href="/react-course"
                  onClick={(e) => handleLinkClick(e, 'react-module4')}
                  className="hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Module 4 : Composants, JSX &amp; Props</span>
                </a>
              </li>
              <li>
                <a
                  href="/react-course"
                  onClick={(e) => handleLinkClick(e, 'react-module5')}
                  className="hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Module 5 : State &amp; Hooks Essentiels</span>
                </a>
              </li>
              <li>
                <a
                  href="/react-course"
                  onClick={(e) => handleLinkClick(e, 'react-module6')}
                  className="hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Module 6 : Formulaires &amp; Événements</span>
                </a>
              </li>
              <li>
                <a
                  href="/react-course"
                  onClick={(e) => handleLinkClick(e, 'react-module7')}
                  className="hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Module 7 : Routage, Tests &amp; Qualité</span>
                </a>
              </li>
              <li>
                <a
                  href="/react-course"
                  onClick={(e) => handleLinkClick(e, 'react-module8')}
                  className="hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Module 8 : Redux Toolkit &amp; RTK Query</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Laboratory & Simulators */}
          <div>
            <div className="flex items-center gap-2 text-[#10B981] font-bold uppercase tracking-wider mb-3">
              <FlaskConical className="h-4 w-4" />
              <span>Simulateurs &amp; Labo</span>
            </div>
            <ul className="space-y-2 text-black/80 dark:text-white/85">
              <li>
                <a
                  href="/react-lab"
                  onClick={(e) => handleLinkClick(e, 'react-laboratory')}
                  className="hover:text-[#10B981] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Ateliers React : 10 TP Interactifs</span>
                </a>
              </li>
              <li>
                <a
                  href="/react-playground"
                  onClick={(e) => handleLinkClick(e, 'react-playground')}
                  className="hover:text-[#10B981] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Mini React Code Playground</span>
                </a>
              </li>
              <li>
                <a
                  href="/simulators"
                  onClick={(e) => handleLinkClick(e, 'simulators')}
                  className="hover:text-[#10B981] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Calculateur Réseau PERT &amp; Marges</span>
                </a>
              </li>
              <li>
                <a
                  href="/simulators"
                  onClick={(e) => handleLinkClick(e, 'simulators')}
                  className="hover:text-[#10B981] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Diagramme de Gantt avec Dépendances</span>
                </a>
              </li>
              <li>
                <a
                  href="/simulators"
                  onClick={(e) => handleLinkClick(e, 'simulators')}
                  className="hover:text-[#10B981] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Scrum Board &amp; Poker Planning</span>
                </a>
              </li>
              <li>
                <a
                  href="/simulators"
                  onClick={(e) => handleLinkClick(e, 'simulators')}
                  className="hover:text-[#10B981] dark:hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Terminal Git CLI &amp; Pipeline CI/CD</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Exams & Active Recall */}
          <div>
            <div className="flex items-center gap-2 text-[#22C55E] font-bold uppercase tracking-wider mb-3">
              <GraduationCap className="h-4 w-4" />
              <span>Examens &amp; Mémorisation</span>
            </div>
            <ul className="space-y-2 text-black/80 dark:text-white/85">
              <li>
                <a
                  href="/react-exam"
                  onClick={(e) => handleLinkClick(e, 'react-final-exam')}
                  className="hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span className="font-semibold text-[#10B981]">Examen Blanc React (50 QCM)</span>
                </a>
              </li>
              <li>
                <a
                  href="/exam"
                  onClick={(e) => handleLinkClick(e, 'final-exam')}
                  className="hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Examen Blanc Agile (50 QCM)</span>
                </a>
              </li>
              <li>
                <a
                  href="/react-flashcards"
                  onClick={(e) => handleLinkClick(e, 'react-flashcards')}
                  className="hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Flashcards 3D React &amp; Redux</span>
                </a>
              </li>
              <li>
                <a
                  href="/flashcards"
                  onClick={(e) => handleLinkClick(e, 'flashcards')}
                  className="hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Flashcards 3D Approche Agile</span>
                </a>
              </li>
              <li>
                <a
                  href="/react-errors"
                  onClick={(e) => handleLinkClick(e, 'react-errors')}
                  className="hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Carnet Erreurs React</span>
                </a>
              </li>
              <li>
                <a
                  href="/errors"
                  onClick={(e) => handleLinkClick(e, 'errors')}
                  className="hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-black/40 dark:text-white/40 shrink-0" />
                  <span>Carnet Erreurs Agile</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Platform Branding & Copyright */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-black/60 dark:text-white/60">
        <div className="flex items-center gap-2.5">
          <PlatformLogo size={26} />
          <span className="font-bold text-black dark:text-white">FULLSTACK <span className="text-[#10B981]">2A</span></span>
          <span className="text-black/20 dark:text-white/20">|</span>
          <span>Développement Digital · Web &amp; Mobile</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-medium text-black/60 dark:text-white/60">
          <span className="text-[#10B981] font-bold">Cursus Agile EFM &amp; React.js</span>
          <span>•</span>
          <span>320+ Questions d'examen</span>
          <span>•</span>
          <span>15 Ateliers &amp; Simulateurs</span>
          <span>•</span>
          <span>Flashcards 3D</span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-black dark:text-white font-semibold bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 px-3 py-1 rounded-lg">
            Conçu pour les stagiaires de la filière Développement Digital (Full Stack 2ème Année) · OFPPT Maroc
          </span>
        </div>
      </div>
    </footer>
  );
}
