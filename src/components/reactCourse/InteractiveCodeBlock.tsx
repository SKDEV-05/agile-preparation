import React, { useState } from 'react';
import { Copy, Check, Play, Terminal } from 'lucide-react';

interface InteractiveCodeBlockProps {
  title: string;
  description: string;
  code: string;
  outputPreview?: string;
  onOpenPlayground?: (code: string) => void;
}

export function InteractiveCodeBlock({
  title,
  description,
  code,
  outputPreview,
  onOpenPlayground
}: InteractiveCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0A0A0A] text-slate-800 dark:text-white overflow-hidden shadow-xs transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-2.5 bg-slate-100/80 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="text-xs font-bold font-mono text-emerald-600 dark:text-[#10B981]">{title}</div>
          <p className="text-[11px] text-slate-600 dark:text-white/60">{description}</p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {onOpenPlayground && (
            <button
              onClick={() => onOpenPlayground(code)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#10B981] hover:bg-[#22C55E] text-white text-[11px] font-mono font-bold transition-colors shadow-2xs cursor-pointer"
            >
              <Play className="h-3 w-3" />
              <span>Tester en Direct</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            title="Copier le code"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-white/10 hover:bg-slate-200/70 dark:hover:bg-white/20 border border-slate-200 dark:border-transparent text-slate-700 dark:text-white text-[11px] font-mono transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-600 dark:text-[#10B981]" />
                <span className="text-emerald-600 dark:text-[#10B981]">Copié</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copier</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Area */}
      <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto text-slate-800 dark:text-white/90 bg-transparent selection:bg-[#10B981]/25 dark:selection:bg-[#10B981]/30">
        <code>{code}</code>
      </pre>

      {/* Optional Output Preview */}
      {outputPreview && (
        <div className="px-4 py-2.5 bg-slate-100/90 dark:bg-black/40 border-t border-slate-200 dark:border-white/10 flex items-start gap-2 text-xs font-mono text-slate-700 dark:text-white/70">
          <Terminal className="h-3.5 w-3.5 text-emerald-600 dark:text-[#10B981] shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] text-slate-500 dark:text-white/40 block">Aperçu du résultat console :</span>
            <span className="text-emerald-700 dark:text-[#10B981] font-medium">{outputPreview}</span>
          </div>
        </div>
      )}
    </div>
  );
}
