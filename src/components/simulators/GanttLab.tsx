import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { RotateCcw, Calendar, CheckCircle2 } from 'lucide-react';

interface GanttTask {
  id: string;
  name: string;
  startWeek: number;
  durationWeeks: number;
  color: string;
  isMilestone?: boolean;
}

const defaultGanttTasks: GanttTask[] = [
  { id: '1', name: '1. Cadrage & Cahier des charges', startWeek: 1, durationWeeks: 2, color: 'bg-primary' },
  { id: '2', name: '2. Conception & Maquettes UI', startWeek: 3, durationWeeks: 2, color: 'bg-teal-600' },
  { id: '3', name: '3. Dév Backend & API REST', startWeek: 5, durationWeeks: 4, color: 'bg-indigo-500' },
  { id: '4', name: '4. Dév Frontend & Composants', startWeek: 6, durationWeeks: 4, color: 'bg-violet-600' },
  { id: '5', name: '5. Tests d’intégration & QA', startWeek: 9, durationWeeks: 2, color: 'bg-emerald-600' },
  { id: '6', name: '6. Recette & Clôture', startWeek: 11, durationWeeks: 0, color: 'bg-amber-500', isMilestone: true },
];

export function GanttLab() {
  const [tasks, setTasks] = useState<GanttTask[]>(defaultGanttTasks);

  const handleDurationChange = (taskId: string, newDuration: number) => {
    const dur = Math.max(1, Math.min(6, newDuration));
    setTasks(prev => {
      const updated = [...prev];
      const target = updated.find(t => t.id === taskId);
      if (target) {
        target.durationWeeks = dur;
      }

      // Re-anchor sequential start dates
      updated[1].startWeek = updated[0].startWeek + updated[0].durationWeeks;
      updated[2].startWeek = updated[1].startWeek + updated[1].durationWeeks;
      updated[3].startWeek = updated[2].startWeek + 1; // Slight overlap
      const maxDevEnd = Math.max(
        updated[2].startWeek + updated[2].durationWeeks,
        updated[3].startWeek + updated[3].durationWeeks
      );
      updated[4].startWeek = maxDevEnd;
      updated[5].startWeek = updated[4].startWeek + updated[4].durationWeeks;

      return updated;
    });
  };

  const handleReset = () => {
    setTasks(defaultGanttTasks);
  };

  const totalWeeks = tasks[tasks.length - 1].startWeek;
  const weeks = Array.from({ length: Math.max(12, totalWeeks + 1) }, (_, i) => i + 1);

  return (
    <Card className="rounded-3xl border-slate-200/90 shadow-card">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">Laboratoire 02</Badge>
              <Badge variant="outline" size="sm">Planning dynamique</Badge>
            </div>
            <CardTitle className="text-xl sm:text-2xl mt-1">Gantt Lab · Calendrier & Dépendances</CardTitle>
            <CardDescription>
              Ajuste la durée des phases à l’aide des curseurs. Constate en temps réel le décalage automatique des activités dépendantes et de la date du jalon de livraison.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5">
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Valeurs par défaut</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Total Calendar Duration Alert */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-indigo-50/60 border border-indigo-100 p-4">
          <div className="flex items-center gap-2.5">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="text-xs sm:text-sm font-semibold text-slate-700">
              Durée globale projet : <b className="text-slate-900 text-base">{totalWeeks} semaines</b>
            </span>
          </div>
          <Badge variant="outline" size="md" className="bg-white text-primary border-indigo-200 font-bold">
            Jalon final à la semaine {totalWeeks}
          </Badge>
        </div>

        {/* Visual Gantt Chart Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white p-4">
          {/* Week Headers */}
          <div className="flex items-center border-b border-slate-200 pb-2 text-[11px] font-bold text-slate-400 min-w-[700px]">
            <div className="w-56 shrink-0 pl-2">Activité</div>
            <div className="flex-1 grid grid-cols-12 gap-1 text-center">
              {weeks.slice(0, 12).map(w => (
                <div key={w} className="truncate">S{w}</div>
              ))}
            </div>
          </div>

          {/* Task Rows */}
          <div className="divide-y divide-slate-100 min-w-[700px]">
            {tasks.map(t => {
              const startOffsetPct = ((t.startWeek - 1) / 12) * 100;
              const widthPct = t.isMilestone ? 0 : (t.durationWeeks / 12) * 100;

              return (
                <div key={t.id} className="flex items-center py-3">
                  <div className="w-56 shrink-0 pr-4">
                    <div className="text-xs font-bold text-slate-800 truncate">{t.name}</div>
                    <div className="text-[10px] text-slate-400">
                      {t.isMilestone ? 'Jalon (0 sem)' : `${t.durationWeeks} sem · Début S${t.startWeek}`}
                    </div>
                  </div>

                  {/* Visual Bar Area */}
                  <div className="flex-1 relative h-7 bg-slate-50/60 rounded-xl flex items-center px-1">
                    {/* Background week guide grid */}
                    <div className="absolute inset-0 grid grid-cols-12 pointer-events-none">
                      {weeks.slice(0, 12).map(w => (
                        <div key={w} className="border-r border-slate-200/30 h-full" />
                      ))}
                    </div>

                    {/* Task Bar or Milestone Diamond */}
                    {!t.isMilestone ? (
                      <div
                        className={`absolute h-5 rounded-lg text-white font-bold text-[10px] flex items-center px-2 shadow-sm transition-all duration-300 ${t.color}`}
                        style={{
                          left: `${startOffsetPct}%`,
                          width: `${Math.max(widthPct, 6)}%`,
                        }}
                      >
                        <span className="truncate">{t.durationWeeks}s</span>
                      </div>
                    ) : (
                      <div
                        className="absolute w-4 h-4 bg-amber-500 rotate-45 rounded-sm shadow-sm transition-all duration-300 -translate-x-2"
                        style={{ left: `${startOffsetPct}%` }}
                        title="Jalon de recette"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Task Control Sliders */}
        <div className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            Ajuster la durée des activités
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.filter(t => !t.isMilestone).map(t => (
              <div key={t.id} className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                  <span className="truncate">{t.name.split('.')[1]}</span>
                  <span className="text-primary">{t.durationWeeks} sem</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={6}
                  value={t.durationWeeks}
                  onChange={(e) => handleDurationChange(t.id, parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
