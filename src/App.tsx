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

export function App() {
  useScrollReveal();
  // Default entry view: Curriculum Hub (Choose from 2nd Year Modules)
  const [activeView, setActiveView] = useState<ActiveView>('curriculum-hub');

  const [quizPartId, setQuizPartId] = useState<PartId | null>(null);

  const handleNavigate = (view: ActiveView, partId?: PartId) => {
    // Reset quiz mode on any navigation
    setQuizPartId(null);
    const target = partId || view;
    if (partId) {
      setActiveView(partId as ActiveView);
    } else {
      setActiveView(view);
    }
    trackPageView(`/${target}`);
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
