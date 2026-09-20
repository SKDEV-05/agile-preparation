import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Layout } from './components/layout/Layout';
import { ActiveView } from './components/layout/Sidebar';
import { CurriculumHub } from './pages/CurriculumHub';
import { ViewSkeleton } from './components/common/ViewSkeleton';
import { PartId } from './types';
import { ReactModuleId } from './types/reactTypes';
import { useScrollReveal } from './hooks/useScrollReveal';
import { trackPageView, analytics } from './lib/analytics';
import { InteractiveGridBackground } from './components/common/InteractiveGridBackground';
import { useActiveTrack } from './store/trackStore';

// Lazy-load CommandPalette so heavy course & lab datasets are excluded from initial render
const CommandPalette = lazy(() => import('./components/common/CommandPalette').then(m => ({ default: m.CommandPalette })));

// Lazy-load secondary views & heavy dependencies for optimal LCP/FCP
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const MethodologyPage = lazy(() => import('./pages/Methodology').then(m => ({ default: m.MethodologyPage })));
const ProfileSettingsPage = lazy(() => import('./pages/ProfileSettings').then(m => ({ default: m.ProfileSettingsPage })));
const LaboratoryPage = lazy(() => import('./pages/Laboratory').then(m => ({ default: m.LaboratoryPage })));
const FinalExamPage = lazy(() => import('./pages/FinalExam').then(m => ({ default: m.FinalExamPage })));
const ErrorsPage = lazy(() => import('./pages/Errors').then(m => ({ default: m.ErrorsPage })));
const FlashcardsPage = lazy(() => import('./pages/Flashcards').then(m => ({ default: m.FlashcardsPage })));
const CourseViewer = lazy(() => import('./components/course/CourseViewer').then(m => ({ default: m.CourseViewer })));
const QuizRunner = lazy(() => import('./components/quiz/QuizRunner').then(m => ({ default: m.QuizRunner })));

// React Module Lazy Loaded Views
const ReactDashboardPage = lazy(() => import('./pages/ReactDashboard').then(m => ({ default: m.ReactDashboardPage })));
const ReactCourseViewer = lazy(() => import('./components/reactCourse/ReactCourseViewer').then(m => ({ default: m.ReactCourseViewer })));
const ReactQuizRunner = lazy(() => import('./components/quiz/ReactQuizRunner').then(m => ({ default: m.ReactQuizRunner })));
const ReactPlayground = lazy(() => import('./components/reactPlayground/ReactPlayground').then(m => ({ default: m.ReactPlayground })));
const ReactLaboratoryPage = lazy(() => import('./pages/ReactLaboratory').then(m => ({ default: m.ReactLaboratoryPage })));
const ReactFlashcardsPage = lazy(() => import('./pages/ReactFlashcards').then(m => ({ default: m.ReactFlashcardsPage })));
const ReactErrorsPage = lazy(() => import('./pages/ReactErrors').then(m => ({ default: m.ReactErrorsPage })));
const ReactFinalExamPage = lazy(() => import('./pages/ReactFinalExam').then(m => ({ default: m.ReactFinalExamPage })));

// Map URL pathname to internal ActiveView
function getInitialView(): ActiveView {
  if (typeof window === 'undefined') return 'curriculum-hub';
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (path.startsWith('course/part')) {
    const p = path.replace('course/', '');
    if (['part1', 'part2', 'part3', 'part4', 'part5'].includes(p)) {
      return p as ActiveView;
    }
  }
  if (path === 'part1' || path === 'part2' || path === 'part3' || path === 'part4' || path === 'part5') {
    return path as ActiveView;
  }
  if (path.startsWith('react/module')) {
    const m = path.replace('react/', '');
    return `react-${m}` as ActiveView;
  }
  if (path.startsWith('react-module')) {
    return path as ActiveView;
  }
  if (path === 'react' || path === 'react-dashboard') return 'react-dashboard';
  if (path === 'react-playground' || path === 'playground') return 'react-playground';
  if (path === 'react-laboratory' || path === 'react-labs') return 'react-laboratory';
  if (path === 'react-flashcards') return 'react-flashcards';
  if (path === 'react-errors') return 'react-errors';
  if (path === 'react-final-exam' || path === 'react-exam') return 'react-final-exam';

  if (path === 'methodology' || path === 'methode' || path === 'how-to-learn') return 'methodology';
  if (path === 'profile' || path === 'settings' || path === 'profil') return 'profile-settings';
  if (path === 'simulators' || path === 'laboratory') return 'simulators';
  if (path === 'flashcards') return 'flashcards';
  if (path === 'final-exam' || path === 'exam') return 'final-exam';
  if (path === 'errors') return 'errors';
  if (path === 'agile' || path === 'dashboard') return 'dashboard';
  return 'curriculum-hub';
}

function getUrlForView(view: ActiveView, partId?: PartId): string {
  const target = partId || view;
  if (target === 'curriculum-hub') return '/';
  if (target.startsWith('part')) return `/course/${target}`;
  if (target.startsWith('react-module')) return `/react/${target.replace('react-', '')}`;
  if (target === 'react-dashboard') return '/react';
  if (target === 'final-exam') return '/final-exam';
  return `/${target}`;
}

export function App() {
  useScrollReveal();
  const [activeView, setActiveView] = useState<ActiveView>(getInitialView);
  const [activeTrack, setActiveTrack] = useActiveTrack();
  const [quizPartId, setQuizPartId] = useState<PartId | null>(null);
  const [reactQuizModuleId, setReactQuizModuleId] = useState<ReactModuleId | null>(null);
  const [playgroundCustomCode, setPlaygroundCustomCode] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync active track automatically when entering track-specific views
  useEffect(() => {
    if (activeView.startsWith('react')) {
      setActiveTrack('react');
    } else if (
      activeView.startsWith('part') || 
      ['dashboard', 'simulators', 'flashcards', 'errors', 'final-exam'].includes(activeView)
    ) {
      setActiveTrack('agile');
    }
  }, [activeView, setActiveTrack]);

  // Global Ctrl+K / Cmd+K listener for Command Palette search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync document title and meta description per route for Googlebot indexing
  useEffect(() => {
    const titles: Record<string, string> = {
      'curriculum-hub': 'FullStack Master · 2ème Année Développement Digital',
      'dashboard': 'Tableau de bord · Approche Agile | Full Stack 2A',
      'methodology': 'Comment Apprendre · Méthode active en 6 étapes | Full Stack 2A',
      'profile-settings': 'Profil & Paramètres d’étude | Full Stack 2A',
      'part1': 'Partie 1 : Fondamentaux & Cycle de Vie Informatique | Full Stack 2A',
      'part2': 'Partie 2 : Planifier un projet · Réseau PERT & Gantt | Full Stack 2A',
      'part3': 'Partie 3 : Méthode Agile, Framework Scrum & Jira | Full Stack 2A',
      'part4': 'Partie 4 : Architecture Git 4 Zones & SonarQube | Full Stack 2A',
      'part5': 'Partie 5 : Culture DevOps & Pipelines GitLab CI/CD | Full Stack 2A',
      'simulators': 'Laboratoire Pratique · 5 Simulateurs Temps Réel (PERT, Gantt, Git, CI/CD) | Full Stack 2A',
      'final-exam': 'Examen Blanc Officiel (50 QCM Minutés 45 min) | Full Stack 2A',
      'flashcards': 'Flashcards 3D de Mémorisation Rapide | Full Stack 2A',
      'errors': 'Carnet Pédagogique de Révision des Erreurs | Full Stack 2A',
      'react-dashboard': 'Tableau de bord · React.js & Frontend Moderne | Full Stack 2A',
      'react-module1': 'Module 1 : Architecture Web & SPA | Full Stack 2A',
      'react-module2': 'Module 2 : JavaScript Moderne ES6+ | Full Stack 2A',
      'react-module3': 'Module 3 : React & Virtual DOM | Full Stack 2A',
      'react-module4': 'Module 4 : Composants & State | Full Stack 2A',
      'react-module5': 'Module 5 : Styles & Cycle de Vie | Full Stack 2A',
      'react-module6': 'Module 6 : Routage & Tests RTL/Jest | Full Stack 2A',
      'react-module7': 'Module 7 : Redux Fondamentaux | Full Stack 2A',
      'react-module8': 'Module 8 : Redux Toolkit & Thunk | Full Stack 2A',
      'react-playground': 'Playground React Interactif en Direct | Full Stack 2A',
      'react-laboratory': 'Laboratoire Pratique React (7 Labs) | Full Stack 2A',
      'react-flashcards': 'Flashcards 3D React & Redux | Full Stack 2A',
      'react-errors': 'Carnet d’Erreurs React | Full Stack 2A',
      'react-final-exam': 'Examen Blanc Officiel React (40 QCM) | Full Stack 2A',
    };

    if (titles[activeView]) {
      document.title = titles[activeView];
    }

    // Keep canonical and OpenGraph URL in sync with active route
    try {
      const currentPath = window.location.pathname === '/' ? '' : window.location.pathname;
      const canonicalUrl = `https://fullstack-2a.vercel.app${currentPath}`;
      const canonicalEl = document.querySelector('link[rel="canonical"]');
      if (canonicalEl) canonicalEl.setAttribute('href', canonicalUrl);
      const ogUrlEl = document.querySelector('meta[property="og:url"]');
      if (ogUrlEl) ogUrlEl.setAttribute('content', canonicalUrl);
    } catch (e) {
      // Ignore in non-browser environments
    }
  }, [activeView, quizPartId, reactQuizModuleId]);

  // Handle browser Back/Forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      setActiveView(getInitialView());
      setQuizPartId(null);
      setReactQuizModuleId(null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (view: ActiveView, partId?: PartId, customPlaygroundCode?: string | null) => {
    setQuizPartId(null);
    setReactQuizModuleId(null);
    // Reset custom playground code so direct entry always defaults to clean starter template
    setPlaygroundCustomCode(customPlaygroundCode ?? null);

    if (partId) {
      setActiveView(partId as ActiveView);
    } else {
      setActiveView(view);
    }

    const newUrl = getUrlForView(view, partId);
    if (window.location.pathname !== newUrl) {
      window.history.pushState(null, '', newUrl);
    }

    trackPageView(newUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuiz = (partId: PartId) => {
    setQuizPartId(partId);
    analytics.startQuiz(partId, 30);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitQuiz = () => {
    setQuizPartId(null);
  };

  // Determine grid intensity based on active context
  const gridIntensity = (activeView === 'curriculum-hub' || activeView === 'dashboard' || activeView === 'react-dashboard') 
    ? 'hero' 
    : (activeView.startsWith('part') || activeView.startsWith('react-module') || !!quizPartId || !!reactQuizModuleId) 
    ? 'subtle' 
    : 'default';

  // Render view based on active state
  const renderContent = () => {
    // 0. If currently in React Module Quiz
    if (reactQuizModuleId) {
      return (
        <ReactQuizRunner
          moduleId={reactQuizModuleId}
          onExit={() => setReactQuizModuleId(null)}
          onGoToErrors={() => {
            setReactQuizModuleId(null);
            handleNavigate('react-errors');
          }}
        />
      );
    }

    // 1. If currently in a Part Quiz (30 QCM)
    if (quizPartId) {
      return (
        <QuizRunner
          partId={quizPartId}
          onExit={handleExitQuiz}
          onGoToErrors={() => {
            setQuizPartId(null);
            setActiveView('errors');
          }}
        />
      );
    }

    // 2. Curriculum Hub (Choose from 2nd Year Modules: Agile, React, Laravel, Database)
    if (activeView === 'curriculum-hub') {
      return (
        <CurriculumHub 
          onSelectAgile={() => handleNavigate('dashboard')}
          onSelectReact={() => handleNavigate('react-dashboard')}
          onOpenMethodology={() => handleNavigate('methodology')} 
        />
      );
    }

    // 2b. React Dashboard
    if (activeView === 'react-dashboard') {
      return (
        <ReactDashboardPage
          onNavigateModule={(moduleId) => handleNavigate(`react-${moduleId}` as ActiveView)}
          onOpenPlayground={() => {
            setPlaygroundCustomCode(null);
            handleNavigate('react-playground');
          }}
          onOpenLaboratory={() => handleNavigate('react-laboratory')}
          onOpenFlashcards={() => handleNavigate('react-flashcards')}
          onOpenExam={() => handleNavigate('react-final-exam')}
          onOpenErrors={() => handleNavigate('react-errors')}
          onSwitchCurriculum={() => handleNavigate('curriculum-hub')}
        />
      );
    }

    // 2c. React Course Viewer
    if (activeView.startsWith('react-module')) {
      const moduleId = activeView.replace('react-', '') as ReactModuleId;
      return (
        <ReactCourseViewer
          moduleId={moduleId}
          onStartModuleQuiz={(modId) => {
            setReactQuizModuleId(modId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenPlayground={(code) => {
            handleNavigate('react-playground', undefined, code);
          }}
          onOpenLaboratory={() => handleNavigate('react-laboratory')}
        />
      );
    }

    // 2d. React Playground
    if (activeView === 'react-playground') {
      return (
        <ReactPlayground
          customCode={playgroundCustomCode || undefined}
          title={playgroundCustomCode ? "Test en Direct · Exemple du Cours" : undefined}
          onClearCustomCode={() => setPlaygroundCustomCode(null)}
        />
      );
    }

    // 2e. React Laboratory
    if (activeView === 'react-laboratory') {
      return <ReactLaboratoryPage />;
    }

    // 2f. React Flashcards
    if (activeView === 'react-flashcards') {
      return <ReactFlashcardsPage />;
    }

    // 2g. React Errors
    if (activeView === 'react-errors') {
      return <ReactErrorsPage onBackToDashboard={() => handleNavigate('react-dashboard')} />;
    }

    // 2h. React Final Exam
    if (activeView === 'react-final-exam') {
      return (
        <ReactFinalExamPage
          onExit={() => handleNavigate('react-dashboard')}
          onGoToErrors={() => handleNavigate('react-errors')}
        />
      );
    }

    // 3. How to Learn Methodology Guide
    if (activeView === 'methodology') {
      return <MethodologyPage onNavigate={handleNavigate} />;
    }

    // 4. Student Profile & Settings
    if (activeView === 'profile-settings') {
      return (
        <ProfileSettingsPage 
          onBackToDashboard={() => handleNavigate(activeTrack === 'react' ? 'react-dashboard' : 'dashboard')} 
        />
      );
    }

    // 5. Final Exam Mode (50 QCM)
    if (activeView === 'final-exam') {
      return (
        <FinalExamPage
          onExit={() => handleNavigate('dashboard')}
          onGoToErrors={() => handleNavigate('errors')}
        />
      );
    }

    // 6. Laboratory Mode
    if (activeView === 'simulators') {
      return <LaboratoryPage />;
    }

    // 7. Flashcards Mode
    if (activeView === 'flashcards') {
      return <FlashcardsPage />;
    }

    // 8. Errors Mode
    if (activeView === 'errors') {
      return <ErrorsPage onBackToDashboard={() => handleNavigate('dashboard')} />;
    }

    // 9. Course Modules (part1, part2, part3, part4, part5)
    if (activeView.startsWith('part')) {
      const partId = activeView as PartId;
      return (
        <CourseViewer
          partId={partId}
          onStartQuiz={handleStartQuiz}
          onOpenSimulators={() => handleNavigate('simulators')}
        />
      );
    }

    // 10. Default: Dashboard
    return <Dashboard onNavigate={handleNavigate} />;
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-white transition-colors selection:bg-[#10B981]/30 selection:text-[#10B981]">
      {/* 2026 Digital Notebook Micro-Grid Background with Cursor Proximity Illumination */}
      <InteractiveGridBackground intensity={gridIntensity} />

      {/* Global Command Palette (Cmd+K / Ctrl+K) - Lazy loaded on demand */}
      {isSearchOpen && (
        <Suspense fallback={null}>
          <CommandPalette 
            isOpen={isSearchOpen} 
            onClose={() => setIsSearchOpen(false)} 
            onNavigate={handleNavigate} 
            activeView={activeView}
          />
        </Suspense>
      )}

      {/* Foreground Website Content */}
      <div className="relative z-10">
        <Layout 
          activeView={activeView} 
          onNavigate={handleNavigate}
          onOpenSearch={() => setIsSearchOpen(true)}
        >
          <Suspense fallback={<ViewSkeleton />}>
            {renderContent()}
          </Suspense>
        </Layout>
      </div>
    </div>
  );
}

export default App;
