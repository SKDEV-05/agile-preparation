import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  Layers, 
  ShieldCheck, 
  Code2, 
  Flame, 
  BookOpen,
  ArrowRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { CodeReviewReport } from '../../utils/reactCodeAnalyzer';

interface LabCodeReviewProps {
  report: CodeReviewReport | null;
  isRunningAnalysis: boolean;
  onRunAnalysis: () => void;
  onValidateLab?: () => void;
  isSolved: boolean;
}

export function LabCodeReview({
  report,
  isRunningAnalysis,
  onRunAnalysis,
  onValidateLab,
  isSolved
}: LabCodeReviewProps) {
  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4 bg-white dark:bg-[#121212] text-slate-800 dark:text-white transition-colors">
        <div className="w-14 h-14 rounded-2xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center border border-[#10B981]/30">
          <Award className="h-7 w-7" />
        </div>
        <div className="space-y-1 max-w-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono">
            Revue de Code Pédagogique (0 à 100)
          </h3>
          <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed font-mono">
            Analysez votre code en profondeur : conformité aux tests, immutabilité React, conventions officielles OFPPT et architecture modulaire.
          </p>
        </div>
        <button
          onClick={onRunAnalysis}
          disabled={isRunningAnalysis}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#22C55E] text-white text-xs font-mono font-bold transition-all shadow-md shadow-[#10B981]/20 cursor-pointer disabled:opacity-50"
        >
          <Cpu className={`h-4 w-4 ${isRunningAnalysis ? 'animate-spin' : ''}`} />
          <span>{isRunningAnalysis ? 'Analyse du code en cours...' : 'Lancer l\'Analyse & Noter mon Code'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#121212] text-slate-800 dark:text-white overflow-y-auto p-4 sm:p-6 space-y-6 font-mono select-none transition-colors">
      {/* ── TOP SCORE BANNER ── */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#181818] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Circular / Block Score */}
          <div 
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center border text-center shrink-0 shadow-lg"
            style={{ 
              borderColor: `${report.gradeColor}50`, 
              backgroundColor: `${report.gradeColor}15`,
              color: report.gradeColor 
            }}
          >
            <span className="text-2xl sm:text-3xl font-black leading-none">{report.totalScore}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">/ 100</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span 
                className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider"
                style={{ backgroundColor: `${report.gradeColor}25`, color: report.gradeColor }}
              >
                Grade {report.gradeBadge}
              </span>
              {report.isPassing ? (
                <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-[#10B981] font-bold">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Seuil Réussi (≥70)
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  À perfectionner (&lt;70)
                </span>
              )}
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              {report.gradeLabel}
            </h3>
            <p className="text-[11px] text-slate-600 dark:text-white/60">
              {report.isEmptyCode 
                ? "Vous n'avez pas encore rédigé de code. Complétez les étapes de l'atelier pour augmenter votre note."
                : `Audit terminé. ${report.strengths.length} point(s) fort(s) et ${report.improvements.length} axe(s) d'amélioration détectés.`
              }
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={onRunAnalysis}
            disabled={isRunningAnalysis}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-200/80 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-white border border-slate-200 dark:border-transparent text-xs font-bold transition-all cursor-pointer"
          >
            <RotateCcw className={`h-3.5 w-3.5 ${isRunningAnalysis ? 'animate-spin' : ''}`} />
            <span>Re-analyser</span>
          </button>

          {report.isPassing && onValidateLab && (
            <button
              onClick={onValidateLab}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isSolved 
                  ? 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-white/70' 
                  : 'bg-[#10B981] hover:bg-[#22C55E] text-white shadow-md shadow-[#10B981]/25'
              }`}
            >
              <Award className="h-3.5 w-3.5" />
              <span>{isSolved ? 'Validé ✓' : 'Valider l\'Atelier'}</span>
            </button>
          )}
        </div>
      </div>

      {/* ── 4 PEDAGOGICAL PILLARS PROGRESS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Pillar 1: Tests */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-white/60 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-[#10B981]" />
              Tests Unitaires
            </span>
            <span className="font-bold text-emerald-600 dark:text-[#10B981]">{report.functionalScore} / 40</span>
          </div>
          <div className="h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#10B981] rounded-full transition-all duration-300"
              style={{ width: `${(report.functionalScore / 40) * 100}%` }}
            />
          </div>
        </div>

        {/* Pillar 2: Best Practices */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-white/60 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#22C55E]" />
              Bonnes Pratiques
            </span>
            <span className="font-bold text-[#22C55E]">{report.bestPracticesScore} / 25</span>
          </div>
          <div className="h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#22C55E] rounded-full transition-all duration-300"
              style={{ width: `${(report.bestPracticesScore / 25) * 100}%` }}
            />
          </div>
        </div>

        {/* Pillar 3: OFPPT Conventions */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-white/60 flex items-center gap-1.5">
              <Code2 className="h-3.5 w-3.5 text-[#10B981]" />
              Conventions OFPPT
            </span>
            <span className="font-bold text-[#10B981]">{report.conventionsScore} / 20</span>
          </div>
          <div className="h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#10B981] rounded-full transition-all duration-300"
              style={{ width: `${(report.conventionsScore / 20) * 100}%` }}
            />
          </div>
        </div>

        {/* Pillar 4: Architecture */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-white/60 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-[#22C55E]" />
              Découpage Modulaire
            </span>
            <span className="font-bold text-[#22C55E]">{report.architectureScore} / 15</span>
          </div>
          <div className="h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#22C55E] rounded-full transition-all duration-300"
              style={{ width: `${(report.architectureScore / 15) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── STRENGTHS & IMPROVEMENTS DUAL COLUMN ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Points forts */}
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#181818] p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-[#10B981]">
            <CheckCircle2 className="h-4 w-4" />
            <span>Points Forts du Code ({report.strengths.length})</span>
          </div>
          {report.strengths.length > 0 ? (
            <ul className="space-y-2 text-xs">
              {report.strengths.map((str, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-white/80 leading-relaxed">
                  <span className="text-emerald-600 dark:text-[#10B981] font-bold shrink-0">✓</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400 dark:text-white/40 italic">
              Complétez le code pour débloquer les points forts.
            </p>
          )}
        </div>

        {/* Points à améliorer */}
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#181818] p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-500 dark:text-amber-400">
            <AlertTriangle className="h-4 w-4" />
            <span>Conseils &amp; Axes de Progrès ({report.improvements.length})</span>
          </div>
          {report.improvements.length > 0 ? (
            <ul className="space-y-2 text-xs">
              {report.improvements.map((imp, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-white/80 leading-relaxed">
                  <span className="text-amber-500 font-bold shrink-0">⚠</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-emerald-600 dark:text-[#10B981] flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Aucun axe critique détecté, excellent niveau de code !
            </p>
          )}
        </div>
      </div>

      {/* ── DETAILED CRITERIA AUDIT ── */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#181818] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <Sparkles className="h-4 w-4 text-emerald-600 dark:text-[#10B981]" />
            <span>Détail de l'Audit des Métriques</span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-white/50">{report.metrics.length} critères vérifiés</span>
        </div>

        <div className="space-y-2">
          {report.metrics.map((metric, idx) => (
            <div 
              key={idx}
              className="p-3 rounded-xl bg-white dark:bg-black/30 border border-slate-200 dark:border-white/5 space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  {metric.status === 'passed' && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-[#10B981]" />}
                  {metric.status === 'warning' && <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />}
                  {metric.status === 'failed' && <XCircle className="h-3.5 w-3.5 text-red-500" />}
                  {metric.title}
                </span>
                <span className={`text-[11px] font-bold ${
                  metric.score === metric.maxScore ? 'text-emerald-600 dark:text-[#10B981]' : 'text-amber-500'
                }`}>
                  {metric.score} / {metric.maxScore} pts
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-white/70 leading-relaxed">
                {metric.feedback}
              </p>
              {metric.codeSuggestion && (
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-white/10 font-mono text-[11px] text-emerald-700 dark:text-[#10B981]">
                  <span className="text-slate-500 dark:text-white/40 block text-[9px] uppercase font-bold">Suggestion :</span>
                  <code>{metric.codeSuggestion}</code>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── OFPPT EXAM TIP ── */}
      <div className="rounded-2xl border border-emerald-300 dark:border-[#10B981]/30 bg-emerald-50 dark:bg-[#10B981]/10 p-4 flex items-start gap-3">
        <BookOpen className="h-5 w-5 text-emerald-600 dark:text-[#10B981] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-700 dark:text-[#10B981] uppercase tracking-wider block">
            Rappel d'Examen Régional / National OFPPT
          </span>
          <p className="text-xs text-slate-700 dark:text-white/80 leading-relaxed">
            {report.examTip}
          </p>
        </div>
      </div>
    </div>
  );
}
