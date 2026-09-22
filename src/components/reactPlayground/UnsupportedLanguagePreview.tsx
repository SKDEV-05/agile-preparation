import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle, Code2, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { LanguageInfo } from '../../utils/codeLanguageDetector';

interface UnsupportedLanguagePreviewProps {
  languageInfo: LanguageInfo;
  onResetToReact?: () => void;
  onInsertHtmlExample?: () => void;
}

export function UnsupportedLanguagePreview({
  languageInfo,
  onResetToReact,
  onInsertHtmlExample
}: UnsupportedLanguagePreviewProps) {
  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full p-4 sm:p-8 bg-gradient-to-b from-rose-500/[0.03] via-transparent to-transparent select-none overflow-y-auto">
      {/* Background Decorative Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 overflow-hidden">
        <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-rose-500/10 animate-pulse" />
        <div className="absolute w-52 h-52 sm:w-72 sm:h-72 rounded-full border border-rose-500/15" />
      </div>

      <div className="relative z-10 max-w-lg w-full flex flex-col items-center text-center space-y-4">
        {/* Main Alert Icon */}
        <div className="relative">
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-rose-500/10 dark:bg-rose-500/15 text-rose-500 border border-rose-500/30 flex items-center justify-center shadow-lg shadow-rose-500/10 transition-transform duration-300 hover:scale-105">
            <span className="text-2xl sm:text-3xl mb-1">{languageInfo.icon || '⚠️'}</span>
          </div>
          <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-rose-600 text-white flex items-center justify-center border-2 border-white dark:border-[#0A0A0A] shadow-xs">
            <XCircle className="h-4 w-4" />
          </div>
        </div>

        {/* Heading & Detected Language Badge */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Code {languageInfo.name} non supporté</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-[#0A0A0A] dark:text-white tracking-tight">
            Ce code / langage n'est pas supporté
          </h3>

          <p className="text-xs sm:text-sm text-[#0A0A0A]/70 dark:text-white/70 max-w-sm mx-auto leading-relaxed">
            Cet aperçu en direct est un moteur d'exécution dédié à la spécialité <strong>React &amp; Développement Web (OFPPT)</strong>. Les langages serveurs, systèmes ou requêtes brutes ne peuvent pas être exécutés ici.
          </p>
        </div>

        {/* Acceptable Languages Pill List */}
        <div className="w-full bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-2xl p-3.5 sm:p-4 text-left space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#0A0A0A]/60 dark:text-white/60 uppercase tracking-wider">
            <span>Langages Acceptés &amp; Exécutables</span>
            <span className="text-[#10B981] font-bold">4 Technologies Web</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-white/5 border border-[#10B981]/30 text-[#0A0A0A] dark:text-white shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[#10B981]" />
              <div className="flex flex-col">
                <span className="font-bold text-[#10B981]">React</span>
                <span className="text-[10px] text-[#0A0A0A]/50 dark:text-white/50">JSX / TSX / Hooks</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-white/5 border border-[#10B981]/30 text-[#0A0A0A] dark:text-white shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[#10B981]" />
              <div className="flex flex-col">
                <span className="font-bold text-[#10B981]">HTML5</span>
                <span className="text-[10px] text-[#0A0A0A]/50 dark:text-white/50">Balises &amp; DOM natif</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-white/5 border border-[#10B981]/30 text-[#0A0A0A] dark:text-white shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[#10B981]" />
              <div className="flex flex-col">
                <span className="font-bold text-[#10B981]">CSS3</span>
                <span className="text-[10px] text-[#0A0A0A]/50 dark:text-white/50">Styles &amp; Sélecteurs</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-white/5 border border-[#10B981]/30 text-[#0A0A0A] dark:text-white shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[#10B981]" />
              <div className="flex flex-col">
                <span className="font-bold text-[#10B981]">JavaScript</span>
                <span className="text-[10px] text-[#0A0A0A]/50 dark:text-white/50">ES6+ / Logique</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Helpers */}
        {(onResetToReact || onInsertHtmlExample) && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {onResetToReact && (
              <button
                type="button"
                onClick={onResetToReact}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10B981] hover:bg-[#22C55E] text-white text-xs font-mono font-bold transition-all shadow-sm hover:shadow cursor-pointer active:scale-95"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Charger un Exemple React Valide</span>
              </button>
            )}

            {onInsertHtmlExample && (
              <button
                type="button"
                onClick={onInsertHtmlExample}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-[#0A0A0A] dark:text-white border border-black/10 dark:border-white/10 text-xs font-mono font-bold transition-colors cursor-pointer"
              >
                <Code2 className="h-3.5 w-3.5 text-[#10B981]" />
                <span>Essayer du HTML5</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
