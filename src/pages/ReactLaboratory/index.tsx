import React, { useState, useMemo } from 'react';
import { 
  FlaskConical, 
  Code2, 
  Layers, 
  GitFork, 
  Activity, 
  CheckCircle2, 
  Sparkles,
  Bug, 
  ArrowRight,
  Clock,
  FileCode,
  Check,
  ChevronRight,
  BookOpen,
  Filter,
  Search,
  LayoutGrid,
  Zap,
  Terminal,
  ShieldAlert,
  ArrowLeft
} from 'lucide-react';
import { useReactProgress } from '../../store/reactProgressStore';
import { ALL_REACT_LABS, getLabById } from '../../data/reactLabs';
import { LabWorkspace } from '../../components/reactLaboratory/LabWorkspace';
import { LabExercise } from '../../types/reactLabTypes';

interface ReactLaboratoryPageProps {
  initialLabId?: string;
  onNavigateToCourse?: (moduleId?: string) => void;
  onBackToDashboard?: () => void;
}

export function ReactLaboratoryPage({
  initialLabId,
  onNavigateToCourse,
  onBackToDashboard
}: ReactLaboratoryPageProps) {
  const { progress, markLabSolved } = useReactProgress();
  const [selectedLabId, setSelectedLabId] = useState<string | null>(initialLabId || null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Check if a lab is solved (supporting both new and legacy IDs)
  const isLabSolved = (lab: LabExercise) => {
    return (
      progress.solvedLabIds.includes(lab.id) ||
      progress.solvedLabIds.includes(lab.id.replace('-jsx', '').replace('-props', '').replace('-state', '').replace('-forms', '').replace('-effects', '').replace('-routing', '').replace('-redux', '').replace('-debug', ''))
    );
  };

  const solvedCount = useMemo(() => {
    return ALL_REACT_LABS.filter(isLabSolved).length;
  }, [progress.solvedLabIds]);

  const progressPercentage = Math.round((solvedCount / ALL_REACT_LABS.length) * 100);

  // Find currently selected exercise
  const currentExerciseIndex = ALL_REACT_LABS.findIndex(l => l.id === selectedLabId);
  const currentExercise = currentExerciseIndex >= 0 ? ALL_REACT_LABS[currentExerciseIndex] : null;

  // Filter labs
  const filteredLabs = useMemo(() => {
    return ALL_REACT_LABS.filter(lab => {
      // Filter by category
      if (selectedFilter === 'bases' && !['module-1'].includes(lab.moduleId)) return false;
      if (selectedFilter === 'components' && !['module-4'].includes(lab.moduleId)) return false;
      if (selectedFilter === 'hooks-routing' && !['module-5', 'module-6'].includes(lab.moduleId)) return false;
      if (selectedFilter === 'redux' && !['module-7'].includes(lab.moduleId)) return false;
      if (selectedFilter === 'debug' && !['module-exam'].includes(lab.moduleId)) return false;

      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = lab.title.toLowerCase().includes(q);
        const matchDesc = lab.subtitle.toLowerCase().includes(q);
        const matchConcepts = lab.concepts.some(c => c.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchConcepts) return false;
      }

      return true;
    });
  }, [selectedFilter, searchQuery]);

  // Navigate between exercises
  const handleNextExercise = () => {
    if (currentExerciseIndex < ALL_REACT_LABS.length - 1) {
      setSelectedLabId(ALL_REACT_LABS[currentExerciseIndex + 1].id);
    }
  };

  const handlePrevExercise = () => {
    if (currentExerciseIndex > 0) {
      setSelectedLabId(ALL_REACT_LABS[currentExerciseIndex - 1].id);
    }
  };

  // If a lab is actively selected, show the full In-App IDE workspace!
  if (currentExercise) {
    return (
      <div className="w-full">
        <LabWorkspace
          exercise={currentExercise}
          currentIndex={currentExerciseIndex}
          totalExercises={ALL_REACT_LABS.length}
          isSolved={isLabSolved(currentExercise)}
          onPrevious={handlePrevExercise}
          onNext={handleNextExercise}
          onValidateLab={() => markLabSolved(currentExercise.id)}
          onBackToOverview={() => setSelectedLabId(null)}
          onOpenLesson={() => {
            if (onNavigateToCourse) {
              onNavigateToCourse(currentExercise.moduleId);
            }
          }}
        />
      </div>
    );
  }

  // Otherwise, display the Lab Selection Hub / Curriculum Map
  return (
    <div className="space-y-8 max-w-6xl mx-auto text-[#0A0A0A] dark:text-white select-none pb-16 px-3 sm:px-6">
      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-white via-white to-[#10B981]/5 dark:from-[#0A0A0A] dark:via-[#0A0A0A] dark:to-[#10B981]/10 p-6 sm:p-10 shadow-sm">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
              <FlaskConical className="h-3.5 w-3.5" />
              LABORATOIRE D'IMMERSION REACT &amp; REDUX
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-[#0A0A0A]/60 dark:text-white/60 bg-black/5 dark:bg-white/5">
              <Code2 className="h-3 w-3" />
              Environnement IDE Complet
            </span>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[#0A0A0A] dark:text-white">
              Développez, Testez et Déboguez en Direct
            </h1>
            <p className="text-xs sm:text-sm text-[#0A0A0A]/70 dark:text-white/70 leading-relaxed">
              Un véritable studio de développement React directement dans votre navigateur. Écrivez le code dans une structure multi-fichiers, observez le rendu instantané, lancez les tests unitaires et comprenez en profondeur les mécanismes clés exigés à l'examen OFPPT.
            </p>
          </div>

          {/* Progress Stats Strip */}
          <div className="pt-3 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#0A0A0A]/70 dark:text-white/70">
                    Progression globale
                  </span>
                  <span className="text-xs font-mono font-black text-[#10B981]">
                    {solvedCount} / {ALL_REACT_LABS.length} ateliers ({progressPercentage}%)
                  </span>
                </div>
                <div className="w-48 sm:w-64 h-2.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#10B981] to-[#22C55E] rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  // Find first unsolved or start with lab-1
                  const firstUnsolved = ALL_REACT_LABS.find(l => !isLabSolved(l));
                  setSelectedLabId(firstUnsolved ? firstUnsolved.id : ALL_REACT_LABS[0].id);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#22C55E] text-white font-mono text-xs font-bold shadow-md shadow-[#10B981]/20 transition-all cursor-pointer"
              >
                <span>{solvedCount === ALL_REACT_LABS.length ? "Reprendre un atelier" : "Continuer le parcours"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER & SEARCH TOOLBAR ── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Pills - Edge-to-edge full bleed on mobile */}
        <div className="relative -mx-3 px-3 sm:mx-0 sm:px-0 min-w-0">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth pr-8 sm:pr-0">
            {[
              { id: 'all', label: 'Tous les ateliers', count: ALL_REACT_LABS.length },
              { id: 'bases', label: 'JSX & Bases', count: 1 },
              { id: 'components', label: 'Composants & Formulaires', count: 3 },
              { id: 'hooks-routing', label: 'useEffect & Routing', count: 2 },
              { id: 'redux', label: 'Redux Store', count: 1 },
              { id: 'debug', label: 'Débogage Exam', count: 1 }
            ].map(tab => {
              const isActive = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#10B981] text-white shadow-xs'
                      : 'bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 text-[#0A0A0A]/70 dark:text-white/70 hover:border-[#10B981]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/10 text-[#0A0A0A]/60 dark:text-white/60'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
          {/* Subtle fade cue on mobile */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 dark:from-[#0A0A0A] to-transparent sm:hidden" />
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#0A0A0A]/40 dark:text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrer (ex: useState, Redux)..."
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs font-mono bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 text-[#0A0A0A] dark:text-white placeholder-[#0A0A0A]/40 dark:placeholder-white/40 focus:outline-none focus:border-[#10B981]"
          />
        </div>
      </div>

      {/* ── LAB EXERCISES GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredLabs.map((lab, index) => {
          const solved = isLabSolved(lab);
          
          return (
            <div
              key={lab.id}
              onClick={() => setSelectedLabId(lab.id)}
              className={`group flex flex-col justify-between rounded-3xl border transition-all duration-200 p-6 cursor-pointer bg-white dark:bg-[#0A0A0A] ${
                solved
                  ? 'border-[#10B981]/40 hover:border-[#10B981] hover:shadow-md hover:shadow-[#10B981]/5'
                  : 'border-black/10 dark:border-white/10 hover:border-[#10B981] hover:shadow-lg'
              }`}
            >
              <div className="space-y-4">
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-black/5 dark:bg-white/5 text-[#0A0A0A]/70 dark:text-white/70">
                      {lab.moduleLabel}
                    </span>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase ${
                      lab.difficulty === 'intro'
                        ? 'bg-[#10B981]/15 text-[#10B981]'
                        : lab.difficulty === 'practice'
                        ? 'bg-[#22C55E]/15 text-[#22C55E]'
                        : 'bg-black/10 dark:bg-white/10 text-slate-800 dark:text-white border border-slate-300 dark:border-white/20'
                    }`}>
                      {lab.difficulty === 'intro' ? 'Débutant' : lab.difficulty === 'practice' ? 'Pratique' : 'Défi Examen'}
                    </span>
                  </div>

                  {solved ? (
                    <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-full border border-[#10B981]/20">
                      <Check className="h-3.5 w-3.5" />
                      Validé
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-[#0A0A0A]/50 dark:text-white/50 bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-full">
                      À faire
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-[#0A0A0A] dark:text-white group-hover:text-[#10B981] transition-colors">
                    {lab.title}
                  </h3>
                  <p className="text-xs text-[#0A0A0A]/60 dark:text-white/60 line-clamp-2 leading-relaxed">
                    {lab.subtitle}
                  </p>
                </div>

                {/* Concepts list */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {lab.concepts.map(concept => (
                    <span
                      key={concept}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/5 dark:bg-white/5 text-[#0A0A0A]/80 dark:text-white/80 border border-black/5 dark:border-white/5"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-5 mt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3 text-[#0A0A0A]/50 dark:text-white/50 text-[11px]">
                  <span className="flex items-center gap-1">
                    <FileCode className="h-3 w-3" />
                    {lab.files.length} fichiers
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {lab.files.length * 5 + 5} min
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLabId(lab.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                    solved
                      ? 'bg-black/5 dark:bg-white/5 text-[#0A0A0A] dark:text-white hover:bg-[#10B981] hover:text-white'
                      : 'bg-[#10B981]/15 text-[#10B981] group-hover:bg-[#10B981] group-hover:text-white'
                  }`}
                >
                  <span>{solved ? 'Revoir' : 'Ouvrir'}</span>
                  <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredLabs.length === 0 && (
        <div className="text-center py-16 space-y-3 rounded-3xl border border-dashed border-black/10 dark:border-white/10">
          <p className="text-xs font-mono text-[#0A0A0A]/50 dark:text-white/50">
            Aucun atelier ne correspond à votre recherche.
          </p>
          <button
            onClick={() => { setSelectedFilter('all'); setSearchQuery(''); }}
            className="text-xs font-mono text-[#10B981] underline cursor-pointer"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {/* ── PEDAGOGICAL WORKFLOW EXPLANATION ── */}
      <section className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-6 sm:p-8 space-y-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#10B981]">
            <Zap className="h-4 w-4" />
            <span>MÉTHODE D'APPRENTISSAGE IMMERSIF REACT</span>
          </div>
          <h2 className="text-lg font-black text-[#0A0A0A] dark:text-white">
            Comment fonctionne chaque atelier pratique ?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 space-y-2 border border-black/5 dark:border-white/5">
            <div className="w-7 h-7 rounded-lg bg-[#10B981]/20 text-[#10B981] font-mono font-black flex items-center justify-center text-xs">
              01
            </div>
            <h4 className="text-xs font-bold text-[#0A0A0A] dark:text-white">
              Énoncé &amp; Règle d'or
            </h4>
            <p className="text-[11px] text-[#0A0A0A]/60 dark:text-white/60 leading-relaxed">
              Consignes précises, checklist des étapes et schéma architectural "Avant de coder" pour éviter les erreurs d'examen.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 space-y-2 border border-black/5 dark:border-white/5">
            <div className="w-7 h-7 rounded-lg bg-[#10B981]/20 text-[#10B981] font-mono font-black flex items-center justify-center text-xs">
              02
            </div>
            <h4 className="text-xs font-bold text-[#0A0A0A] dark:text-white">
              Éditeur VS Code &amp; Preview
            </h4>
            <p className="text-[11px] text-[#0A0A0A]/60 dark:text-white/60 leading-relaxed">
              Navigation multi-fichiers, coloration syntaxique, indentation automatique intelligente et rendu JSX en temps réel.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 space-y-2 border border-black/5 dark:border-white/5">
            <div className="w-7 h-7 rounded-lg bg-[#10B981]/20 text-[#10B981] font-mono font-black flex items-center justify-center text-xs">
              03
            </div>
            <h4 className="text-xs font-bold text-[#0A0A0A] dark:text-white">
              Tests &amp; Terminal Bash
            </h4>
            <p className="text-[11px] text-[#0A0A0A]/60 dark:text-white/60 leading-relaxed">
              Vérification unitaire automatisée avec explications pédagogiques pas à pas et terminal simulé <span className="font-mono">npm start / npm test</span>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 space-y-2 border border-black/5 dark:border-white/5">
            <div className="w-7 h-7 rounded-lg bg-[#10B981]/20 text-[#10B981] font-mono font-black flex items-center justify-center text-xs">
              04
            </div>
            <h4 className="text-xs font-bold text-[#0A0A0A] dark:text-white">
              Inspecteur &amp; Mini-QCM
            </h4>
            <p className="text-[11px] text-[#0A0A0A]/60 dark:text-white/60 leading-relaxed">
              Arborescence DOM virtuel, détection des hooks actifs et question QCM de consolidation immédiate avant validation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
