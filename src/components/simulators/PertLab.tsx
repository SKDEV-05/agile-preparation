import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Play, RotateCcw, CheckCircle2, Sparkles } from 'lucide-react';

interface PertTask {
  id: string;
  name: string;
  duration: number;
  antecedents: string[];
  es: number;
  ef: number;
  ls: number;
  lf: number;
  margin: number;
  isCritical: boolean;
}

const initialTasks: PertTask[] = [
  { id: 'A', name: 'Étude des besoins', duration: 2, antecedents: [], es: 0, ef: 2, ls: 0, lf: 2, margin: 0, isCritical: true },
  { id: 'B', name: 'Maquettage UI', duration: 1, antecedents: ['A'], es: 2, ef: 3, ls: 4, lf: 5, margin: 2, isCritical: false },
  { id: 'C', name: 'Architecture BDD', duration: 3, antecedents: ['A'], es: 2, ef: 5, ls: 2, lf: 5, margin: 0, isCritical: true },
  { id: 'D', name: 'Développement API', duration: 4, antecedents: ['B', 'C'], es: 5, ef: 9, ls: 5, lf: 9, margin: 0, isCritical: true },
  { id: 'E', name: 'Tests d’intégration', duration: 2, antecedents: ['D'], es: 9, ef: 11, ls: 9, lf: 11, margin: 0, isCritical: true },
  { id: 'F', name: 'Déploiement final', duration: 1, antecedents: ['E'], es: 11, ef: 12, ls: 11, lf: 12, margin: 0, isCritical: true },
];

export function PertLab() {
  const [tasks, setTasks] = useState<PertTask[]>(initialTasks);
  const [isCalculated, setIsCalculated] = useState(false);

  const handleCalculate = () => {
    setIsCalculated(true);
  };

  const handleReset = () => {
    setIsCalculated(false);
  };

  const updateDuration = (id: string, newDuration: number) => {
    const val = Math.max(1, Math.min(10, newDuration));
    setTasks(prev => {
      const updated = prev.map(t => t.id === id ? { ...t, duration: val } : t);
      // Recalculate forward pass
      const A = updated.find(t => t.id === 'A')!;
      A.ef = A.duration;
      const B = updated.find(t => t.id === 'B')!;
      B.es = A.ef;
      B.ef = B.es + B.duration;
      const C = updated.find(t => t.id === 'C')!;
      C.es = A.ef;
      C.ef = C.es + C.duration;
      const D = updated.find(t => t.id === 'D')!;
      D.es = Math.max(B.ef, C.ef);
      D.ef = D.es + D.duration;
      const E = updated.find(t => t.id === 'E')!;
      E.es = D.ef;
      E.ef = E.es + E.duration;
      const F = updated.find(t => t.id === 'F')!;
      F.es = E.ef;
      F.ef = F.es + F.duration;

      // Backward pass
      F.lf = F.ef;
      F.ls = F.lf - F.duration;
      E.lf = F.ls;
      E.ls = E.lf - E.duration;
      D.lf = E.ls;
      D.ls = D.lf - D.duration;
      C.lf = D.ls;
      C.ls = C.lf - C.duration;
      B.lf = D.ls;
      B.ls = B.lf - B.duration;
      A.lf = Math.min(B.ls, C.ls);
      A.ls = A.lf - A.duration;

      // Margins
      return updated.map(t => {
        const margin = t.ls - t.es;
        return { ...t, margin, isCritical: margin === 0 };
      });
    });
  };

  const totalDuration = tasks.find(t => t.id === 'F')?.ef || 12;
  const criticalPathString = tasks.filter(t => t.isCritical).map(t => t.id).join(' ➔ ');

  return (
    <Card className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] backdrop-blur-2xl shadow-xl overflow-hidden transition-all duration-300">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#22C55E]/10 rounded-full blur-3xl pointer-events-none" />

      <CardHeader className="relative z-10 border-b border-black/10 dark:border-white/10 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="accent" size="sm">Laboratoire 01</Badge>
              <Badge variant="outline" size="sm" className="border-[#10B981]/30 text-[#10B981]">Calcul automatique</Badge>
            </div>
            <CardTitle className="text-xl sm:text-2xl mt-1 text-black dark:text-white">PERT Lab · Chemin Critique & Marges</CardTitle>
            <CardDescription className="text-black/60 dark:text-white/60">
              Modifie les durées des tâches, lance le calcul automatique des dates (ES, EF, LS, LF) et observe le chemin critique s’illuminer en direct.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleCalculate}
              className="gap-2 font-bold shadow-md shadow-[#10B981]/25 bg-[#10B981] hover:bg-[#22C55E] text-white"
            >
              <Play className="h-4 w-4" />
              <span>Calculer le réseau</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="gap-1.5 border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 text-black dark:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Réinitialiser</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 pt-6">
        {/* Network Diagram View */}
        <div className="my-4 rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-6 overflow-x-auto shadow-inner">
          <div className="text-xs font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-6 text-center">
            Représentation Graphique du Réseau d’Activités
          </div>

          <div className="flex items-center justify-between min-w-[720px] gap-4 py-4">
            {/* Task A */}
            <TaskNode task={tasks[0]} isHighlighted={isCalculated && tasks[0].isCritical} />

            <div className="text-black/40 dark:text-white/40 font-bold">➔</div>

            {/* Parallel Tasks B & C */}
            <div className="flex flex-col gap-6">
              <TaskNode task={tasks[1]} isHighlighted={isCalculated && tasks[1].isCritical} />
              <TaskNode task={tasks[2]} isHighlighted={isCalculated && tasks[2].isCritical} />
            </div>

            <div className="text-black/40 dark:text-white/40 font-bold">➔</div>

            {/* Task D */}
            <TaskNode task={tasks[3]} isHighlighted={isCalculated && tasks[3].isCritical} />

            <div className="text-black/40 dark:text-white/40 font-bold">➔</div>

            {/* Task E */}
            <TaskNode task={tasks[4]} isHighlighted={isCalculated && tasks[4].isCritical} />

            <div className="text-black/40 dark:text-white/40 font-bold">➔</div>

            {/* Task F */}
            <TaskNode task={tasks[5]} isHighlighted={isCalculated && tasks[5].isCritical} />
          </div>
        </div>

        {/* Calculation Result Banner */}
        {isCalculated && (
          <div className="mt-6 rounded-2xl border border-[#10B981]/30 bg-[#10B981]/10 p-5 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[#10B981] font-bold text-sm">
                  <CheckCircle2 className="h-5 w-5 text-[#10B981]" />
                  <span>Chemin critique identifié : <b className="text-black dark:text-white tracking-wide">{criticalPathString}</b></span>
                </div>
                <p className="text-xs text-black/70 dark:text-white/70 mt-1">
                  Durée totale incompressible du projet : <b className="text-black dark:text-white">{totalDuration} jours</b>. La tâche B dispose d’une marge totale de <b className="text-[#22C55E]">{tasks[1].margin} jour(s)</b>.
                </p>
              </div>
              <Badge variant="success" size="md" className="gap-1 font-bold text-xs py-1 border border-[#10B981]/30">
                <Sparkles className="h-3.5 w-3.5" />
                Marge nulle = Critique
              </Badge>
            </div>
          </div>
        )}

        {/* Interactive Data Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-black/10 dark:border-white/10 text-black/50 dark:text-white/50 font-bold">
                <th className="py-2.5 px-3">Tâche</th>
                <th className="py-2.5 px-3">Désignation</th>
                <th className="py-2.5 px-3">Antécédents</th>
                <th className="py-2.5 px-3 text-center">Durée (j)</th>
                <th className="py-2.5 px-3 text-center">ES (Tôt)</th>
                <th className="py-2.5 px-3 text-center">EF (Fin tôt)</th>
                <th className="py-2.5 px-3 text-center">LS (Tard)</th>
                <th className="py-2.5 px-3 text-center">LF (Fin tard)</th>
                <th className="py-2.5 px-3 text-center">Marge</th>
                <th className="py-2.5 px-3 text-center">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 dark:border-white/10 font-medium">
              {tasks.map(t => (
                <tr key={t.id} className={t.isCritical && isCalculated ? "bg-[#10B981]/15" : ""}>
                  <td className="py-3 px-3 font-bold text-black dark:text-white">{t.id}</td>
                  <td className="py-3 px-3 text-black/80 dark:text-white/80">{t.name}</td>
                  <td className="py-3 px-3 text-black/50 dark:text-white/50">{t.antecedents.join(', ') || '—'}</td>
                  <td className="py-3 px-3 text-center">
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={t.duration}
                      onChange={(e) => updateDuration(t.id, parseInt(e.target.value) || 1)}
                      className="w-12 text-center rounded-lg border border-black/20 dark:border-white/20 bg-white dark:bg-[#0A0A0A] py-1 text-xs font-bold text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    />
                  </td>
                  <td className="py-3 px-3 text-center text-black/80 dark:text-white/80">{t.es}</td>
                  <td className="py-3 px-3 text-center text-black/80 dark:text-white/80">{t.ef}</td>
                  <td className="py-3 px-3 text-center text-black/80 dark:text-white/80">{t.ls}</td>
                  <td className="py-3 px-3 text-center text-black/80 dark:text-white/80">{t.lf}</td>
                  <td className="py-3 px-3 text-center font-bold text-[#10B981]">{t.margin} j</td>
                  <td className="py-3 px-3 text-center">
                    {t.isCritical ? (
                      <span className="inline-block rounded-md bg-[#10B981]/20 border border-[#10B981]/40 px-2 py-0.5 text-[10px] font-bold text-[#10B981]">
                        Critique
                      </span>
                    ) : (
                      <span className="inline-block rounded-md bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 px-2 py-0.5 text-[10px] font-medium text-black/70 dark:text-white/70">
                        Marge {t.margin}j
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function TaskNode({ task, isHighlighted }: { task: PertTask; isHighlighted: boolean }) {
  return (
    <div className={`w-32 rounded-2xl border transition-all duration-300 overflow-hidden shadow-md ${
      isHighlighted
        ? 'border-[#10B981] bg-white dark:bg-[#0A0A0A] ring-4 ring-[#10B981]/30 shadow-[#10B981]/20 scale-105'
        : 'border-black/10 dark:border-white/15 bg-white dark:bg-[#0A0A0A]'
    }`}>
      {/* Node Header */}
      <div className={`grid grid-cols-2 py-1 text-[10px] font-bold text-center border-b ${
        isHighlighted ? 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40' : 'bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 border-black/10 dark:border-white/10'
      }`}>
        <span>ES: {task.es}</span>
        <span className="border-l border-inherit">EF: {task.ef}</span>
      </div>

      {/* Node Body */}
      <div className="py-2.5 px-1 text-center bg-white dark:bg-[#0A0A0A]">
        <div className="font-black text-sm text-black dark:text-white">Tâche {task.id}</div>
        <div className="text-[10px] text-black/50 dark:text-white/50 truncate mt-0.5">{task.name} ({task.duration}j)</div>
      </div>

      {/* Node Footer */}
      <div className={`grid grid-cols-2 py-1 text-[10px] font-bold text-center border-t ${
        isHighlighted ? 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40' : 'bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 border-black/10 dark:border-white/10'
      }`}>
        <span>LS: {task.ls}</span>
        <span className="border-l border-inherit">LF: {task.lf}</span>
      </div>
    </div>
  );
}
