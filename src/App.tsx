import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { ActiveView } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { LaboratoryPage } from './pages/Laboratory';
import { FinalExamPage } from './pages/FinalExam';
import { ErrorsPage } from './pages/Errors';
import { FlashcardsPage } from './pages/Flashcards';
import { CourseViewer } from './components/course/CourseViewer';
import { QuizRunner } from './components/quiz/QuizRunner';
import { COURSE_MAP } from './data/course';
import { QUESTIONS_BY_PART } from './data/questions';
import { PartId } from './types';
import { CurriculumHub } from './pages/CurriculumHub';
import { AntigravityParticleField } from './components/3d/AntigravityParticleField';
import { useScrollReveal } from './hooks/useScrollReveal';
import { trackPageView, analytics } from './lib/analytics';

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
  if (target === 'final-exam') return '/final-exam';
  return `/${target}`;
}

export function App() {
  useScrollReveal();
  const [activeView, setActiveView] = useState<ActiveView>(getInitialView);
  const [quizPartId, setQuizPartId] = useState<PartId | null>(null);

  // Sync document title and meta description per route for Googlebot indexing
  React.useEffect(() => {
    const titles: Record<string, string> = {
      'curriculum-hub': 'Full Stack Web Master · 2ème Année | Plateforme d’Excellence OFPPT',
      'dashboard': 'Module Approche Agile & Gestion de Projet (M201) | Full Stack 2A',
      'part1': 'Partie 1 : Fondamentaux & Cycle de Vie Informatique | Full Stack 2A',
      'part2': 'Partie 2 : Planifier un projet · Réseau PERT & Gantt | Full Stack 2A',
      'part3': 'Partie 3 : Méthode Agile, Framework Scrum & Jira | Full Stack 2A',
      'part4': 'Partie 4 : Architecture Git 4 Zones & SonarQube | Full Stack 2A',
      'part5': 'Partie 5 : Culture DevOps & Pipelines GitLab CI/CD | Full Stack 2A',
      'simulators': 'Laboratoire Pratique · 5 Simulateurs Temps Réel (PERT, Gantt, Git, CI/CD) | Full Stack 2A',
      'final-exam': 'Examen Blanc Officiel (50 QCM Minutés 45 min) | Full Stack 2A',
      'flashcards': 'Flashcards 3D de Mémorisation Rapide | Full Stack 2A',
      'errors': 'Carnet Pédagogique de Révision des Erreurs | Full Stack 2A',
    };

    const targetKey = quizPartId ? `Quiz ${quizPartId}` : activeView;
    if (titles[activeView]) {
      document.title = titles[activeView];
    }
  }, [activeView, quizPartId]);

  // Handle browser Back/Forward buttons (popstate)
  React.useEffect(() => {
    const handlePopState = () => {
      setActiveView(getInitialView());
      setQuizPartId(null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (view: ActiveView, partId?: PartId) => {
    setQuizPartId(null);
    const target = partId || view;
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

  // Render view based on active state
  const renderContent = () => {
    // 1. If currently in a Part Quiz (30 QCM)
    if (quizPartId) {
      const questions = QUESTIONS_BY_PART[quizPartId] || [];
      const course = COURSE_MAP[quizPartId];
      return (
        <QuizRunner
          questions={questions}
          partId={quizPartId}
          title={`Évaluation · 30 QCM · Partie ${course.orderNumber}`}
          subtitle={course.title}
          onExit={handleExitQuiz}
          onGoToErrors={() => {
            setQuizPartId(null);
            setActiveView('errors');
          }}
        />
      );
    }

    // 1. Curriculum Hub (Choose from 2nd Year Modules: Agile, React, Laravel, Database)
    if (activeView === 'curriculum-hub') {
      return <CurriculumHub onSelectAgile={() => handleNavigate('dashboard')} />;
    }

    // 2. Final Exam Mode (50 QCM)
    if (activeView === 'final-exam') {
      return (
        <FinalExamPage
          onExit={() => setActiveView('dashboard')}
          onGoToErrors={() => setActiveView('errors')}
        />
      );
    }

    // 3. Laboratory Mode
    if (activeView === 'simulators') {
      return <LaboratoryPage />;
    }

    // 4. Flashcards Mode
    if (activeView === 'flashcards') {
      return <FlashcardsPage />;
    }

    // 5. Errors Mode
    if (activeView === 'errors') {
      return <ErrorsPage onBackToDashboard={() => setActiveView('dashboard')} />;
    }

    // 6. Course Modules (part1, part2, part3, part4, part5)
    if (activeView.startsWith('part')) {
      const partId = activeView as PartId;
      const coursePart = COURSE_MAP[partId];
      if (coursePart) {
        return (
          <CourseViewer
            coursePart={coursePart}
            onStartQuiz={handleStartQuiz}
            onOpenSimulators={() => setActiveView('simulators')}
          />
        );
      }
    }

    // 7. Default: Dashboard
    return <Dashboard onNavigate={handleNavigate} />;
  };

  return (
    <div className="relative min-h-screen bg-[#070B14] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Global Google Antigravity Particle Field Canvas across ALL pages */}
      <AntigravityParticleField />

      {/* Foreground Website Content */}
      <div className="relative z-10">
        <Layout activeView={activeView} onNavigate={handleNavigate}>
          {renderContent()}
        </Layout>
      </div>
    </div>
  );
}

export default App;
