import React, { useState } from 'react';
import { Database, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

export function ReduxFlowVisualizer() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    { title: '1. Composant UI', desc: 'L\'utilisateur clique sur "+1 Article". Le composant appelle dispatch({ type: "AJOUT_ARTICLE", payload: { id: 101, prix: 150 } }).' },
    { title: '2. Middleware', desc: 'Redux-Logger ou Redux-Thunk intercepte l\'action, l\'enregistre ou gère l\'asynchronisme avant qu\'elle n\'arrive aux reducers.' },
    { title: '3. Reducer Pur', desc: 'La fonction pure panierReducer(state, action) calcule le nouvel état sans muter l\'ancien, en retournant une nouvelle référence.' },
    { title: '4. Store Global', desc: 'Le Store central est mis à jour avec le nouveau total (150 DH) et stocke la nouvelle vérité de l\'application.' },
    { title: '5. useSelector & Re-rendu', desc: 'Les composants abonnés via useSelector(state => state.panier) sont notifiés et se redessinent automatiquement à 60 FPS.' }
  ];

  const handleNext = () => {
    setActiveStep(prev => (prev + 1) % steps.length);
  };

  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-4 sm:p-6 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/10 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider">
            <Database className="h-4 w-4" />
            <span>Flux Unidirectionnel Redux & RTK</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-[#0A0A0A] dark:text-white mt-0.5">
            Cycle d'une Action : UI $\rightarrow$ Dispatch $\rightarrow$ Reducer $\rightarrow$ Store $\rightarrow$ Re-rendu
          </h4>
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#10B981] hover:bg-[#22C55E] text-white font-mono font-bold text-xs shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Play className="h-3 w-3" />
          <span>Étape Suivante</span>
        </button>
      </div>

      {/* Stepper Timeline */}
      <div className="grid grid-cols-5 gap-1.5 text-center font-mono text-[10px] sm:text-xs">
        {steps.map((st, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className={`p-2 rounded-xl border transition-all cursor-pointer truncate ${
              activeStep === i
                ? 'bg-[#10B981] text-white border-[#10B981] font-bold shadow-xs scale-105'
                : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/10 dark:border-white/10 text-[#0A0A0A]/60 dark:text-white/60 hover:border-[#10B981]'
            }`}
          >
            {i + 1}. {st.title.split('.')[1] || st.title}
          </button>
        ))}
      </div>

      {/* Detail Card for Active Step */}
      <div className="rounded-xl border border-[#10B981]/30 bg-[#10B981]/10 p-4 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm text-[#10B981]">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{steps[activeStep].title}</span>
        </div>
        <p className="text-xs text-[#0A0A0A]/85 dark:text-white/85 leading-relaxed">
          {steps[activeStep].desc}
        </p>
      </div>
    </div>
  );
}
