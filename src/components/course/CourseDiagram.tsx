import React from 'react';

interface CourseDiagramProps {
  type?: 'lifecycle' | 'gantt_preview' | 'pert_preview' | 'scrum_workflow' | 'git_flow' | 'devops_cycle' | 'raci_matrix';
}

export function CourseDiagram({ type }: CourseDiagramProps) {
  if (!type) return null;

  return (
    <div className="my-6 overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] backdrop-blur-xl p-5 sm:p-7 shadow-lg">
      {type === 'lifecycle' && (
        <div className="space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-black/50 dark:text-white/50">
            Comparatif Visuel : Cascade vs Agile
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-4 sm:p-5 shadow-sm">
              <span className="inline-block rounded-lg bg-black/10 dark:bg-white/10 px-2.5 py-1 text-xs font-bold text-black dark:text-white mb-3 border border-black/10 dark:border-white/10">
                Modèle Séquentiel (Cascade)
              </span>
              <div className="space-y-2 font-mono text-xs text-black/80 dark:text-white/80">
                <div className="rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 p-2 text-center shadow-xs">01. Spécifications figées</div>
                <div className="text-center text-black/40 dark:text-white/40">↓</div>
                <div className="rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 p-2 text-center shadow-xs">02. Conception architecturale</div>
                <div className="text-center text-black/40 dark:text-white/40">↓</div>
                <div className="rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 p-2 text-center shadow-xs">03. Développement global</div>
                <div className="text-center text-black/40 dark:text-white/40">↓</div>
                <div className="rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 p-2 text-center shadow-xs">04. Tests & Recette tardive</div>
              </div>
              <p className="mt-3 text-[11px] text-[#22C55E] font-medium">⚠️ Le feedback intervient à la fin : changement très coûteux.</p>
            </div>

            <div className="rounded-2xl border border-[#10B981]/30 bg-[#10B981]/10 p-4 sm:p-5 shadow-sm">
              <span className="inline-block rounded-lg bg-[#10B981]/20 px-2.5 py-1 text-xs font-bold text-[#10B981] mb-3 border border-[#10B981]/40">
                Approche Agile (Scrum)
              </span>
              <div className="space-y-2 font-mono text-xs text-black dark:text-white">
                <div className="rounded-xl bg-white dark:bg-[#0A0A0A] border border-[#10B981]/30 p-2 text-center font-bold shadow-xs">
                  Sprint 1 (2-4 sem) ➔ Incrément testé + Feedback
                </div>
                <div className="text-center text-[#10B981] font-bold">↓ Adaptation</div>
                <div className="rounded-xl bg-white dark:bg-[#0A0A0A] border border-[#10B981]/30 p-2 text-center font-bold shadow-xs">
                  Sprint 2 (2-4 sem) ➔ Incrément enrichi + Démo
                </div>
                <div className="text-center text-[#10B981] font-bold">↓ Ajustement</div>
                <div className="rounded-xl bg-white dark:bg-[#0A0A0A] border border-[#10B981]/30 p-2 text-center font-bold shadow-xs">
                  Sprint N (Livraison continue de valeur)
                </div>
              </div>
              <p className="mt-3 text-[11px] text-[#10B981] font-medium">✓ Feedback continu : le client valide à chaque Sprint.</p>
            </div>
          </div>
        </div>
      )}

      {type === 'raci_matrix' && (
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-3">
            Exemple de Matrice RACI
          </div>
          <div className="overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-4">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 font-bold font-mono">
                  <th className="py-2.5 pr-4">Activité / Livrable</th>
                  <th className="py-2.5 px-3 text-center">Chef de projet</th>
                  <th className="py-2.5 px-3 text-center">MOA (Client)</th>
                  <th className="py-2.5 px-3 text-center">Développeur</th>
                  <th className="py-2.5 px-3 text-center">Architecte</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 dark:divide-white/10 font-medium">
                <tr>
                  <td className="py-3 pr-4 text-black dark:text-white font-medium">Validation Cahier des charges</td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white font-bold font-mono">C</span></td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-[#10B981] text-white font-black shadow-xs font-mono">A</span></td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-black/40 dark:text-white/40 font-bold font-mono">I</span></td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white font-bold font-mono">C</span></td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-black dark:text-white font-medium">Développement de l’API REST</td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-[#10B981] text-white font-black shadow-xs font-mono">A</span></td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-black/40 dark:text-white/40 font-bold font-mono">I</span></td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-[#22C55E] text-white font-black shadow-xs font-mono">R</span></td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white font-bold font-mono">C</span></td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-black dark:text-white font-medium">Tests de recette finale</td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white font-bold font-mono">C</span></td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-[#10B981] text-white font-black shadow-xs font-mono">A</span></td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white font-bold font-mono">C</span></td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-black/40 dark:text-white/40 font-bold font-mono">I</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11px] text-black/60 dark:text-white/60 leading-relaxed">
            Règles d’or : Strictement <b className="text-black dark:text-white">1 seul Accountable (A)</b> par ligne. <b className="text-[#10B981]">R</b> réalise concrètement le livrable.
          </p>
        </div>
      )}

      {type === 'gantt_preview' && (
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-3">
            Structure d’un Diagramme de Gantt avec Dépendances
          </div>
          <div className="space-y-3 font-sans text-xs">
            <div className="flex items-center gap-3">
              <span className="w-28 font-semibold text-black/80 dark:text-white/80 truncate">1. Cadrage</span>
              <div className="flex-1 bg-black/5 dark:bg-white/5 h-5 rounded-lg overflow-hidden flex items-center border border-black/10 dark:border-white/5">
                <div className="bg-[#10B981] text-white text-[10px] font-bold px-2 h-full flex items-center rounded-lg w-1/4 font-mono">
                  2 sem
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-28 font-semibold text-black/80 dark:text-white/80 truncate">2. Maquettage</span>
              <div className="flex-1 bg-black/5 dark:bg-white/5 h-5 rounded-lg overflow-hidden flex items-center border border-black/10 dark:border-white/5">
                <div className="ml-[25%] bg-[#22C55E] text-white text-[10px] font-bold px-2 h-full flex items-center rounded-lg w-1/4 font-mono">
                  2 sem
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-28 font-semibold text-black/80 dark:text-white/80 truncate">3. Développement</span>
              <div className="flex-1 bg-black/5 dark:bg-white/5 h-5 rounded-lg overflow-hidden flex items-center border border-black/10 dark:border-white/5">
                <div className="ml-[50%] bg-[#10B981] text-white text-[10px] font-bold px-2 h-full flex items-center rounded-lg w-2/5 font-mono">
                  4 sem
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-28 font-semibold text-black/80 dark:text-white/80 truncate">4. Recette (Jalon)</span>
              <div className="flex-1 bg-black/5 dark:bg-white/5 h-5 rounded-lg flex items-center relative border border-black/10 dark:border-white/5">
                <div className="absolute left-[90%] -top-0.5 w-4 h-4 bg-[#22C55E] rotate-45 rounded-sm shadow-md" title="Jalon (durée = 0)" />
              </div>
            </div>
          </div>
          <p className="mt-4 text-[11px] text-black/60 dark:text-white/60">
            Le losange vert représente le <b className="text-[#22C55E]">Jalon</b> : durée nulle, point décisionnel d’achèvement majeur.
          </p>
        </div>
      )}

      {type === 'pert_preview' && (
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-3">
            Structure d’un Nœud de Tâche PERT
          </div>
          <div className="flex justify-center my-2">
            <div className="w-48 rounded-2xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] shadow-md overflow-hidden text-center text-xs">
              <div className="grid grid-cols-2 bg-[#10B981]/10 border-b border-[#10B981]/20 py-1.5 font-bold text-[#10B981] font-mono">
                <div>ES (Plus tôt)</div>
                <div className="border-l border-[#10B981]/20">EF (Fin tôt)</div>
              </div>
              <div className="py-2.5 font-black text-sm text-black dark:text-white bg-black/5 dark:bg-white/5">
                Tâche A (3 jours)
              </div>
              <div className="grid grid-cols-2 bg-white dark:bg-[#0A0A0A] border-t border-black/10 dark:border-white/10 py-1.5 text-black/60 dark:text-white/60 font-semibold font-mono">
                <div>LS (Plus tard)</div>
                <div className="border-l border-black/10 dark:border-white/10">LF (Fin tard)</div>
              </div>
            </div>
          </div>
          <p className="text-center text-[11px] text-black/60 dark:text-white/60 mt-2">
            Marge Totale = LS − ES = LF − EF. Si Marge = 0 ➔ La tâche est sur le <b className="text-[#10B981]">Chemin Critique</b>.
          </p>
        </div>
      )}

      {type === 'scrum_workflow' && (
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-3">
            La Boucle Itérative Scrum
          </div>
          <div className="grid sm:grid-cols-4 gap-2.5 text-center text-xs">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-3.5 shadow-xs">
              <div className="font-bold text-black dark:text-white">1. Product Backlog</div>
              <div className="text-[11px] text-black/60 dark:text-white/60 mt-1">Ordonné par le PO selon la valeur</div>
            </div>
            <div className="rounded-2xl border border-[#10B981]/30 bg-[#10B981]/10 p-3.5 shadow-xs">
              <div className="font-bold text-[#10B981]">2. Sprint Planning</div>
              <div className="text-[11px] text-black/70 dark:text-white/70 mt-1">Sprint Goal + Sprint Backlog</div>
            </div>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-3.5 shadow-xs">
              <div className="font-bold text-black dark:text-white">3. Sprint (1-4 sem)</div>
              <div className="text-[11px] text-black/60 dark:text-white/60 mt-1">Daily Scrum 15 min chaque jour</div>
            </div>
            <div className="rounded-2xl border border-[#22C55E]/30 bg-[#22C55E]/10 p-3.5 shadow-xs">
              <div className="font-bold text-[#22C55E]">4. Review & Retro</div>
              <div className="text-[11px] text-black/70 dark:text-white/70 mt-1">Incrément testé + Amélioration</div>
            </div>
          </div>
        </div>
      )}

      {type === 'git_flow' && (
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-3">
            Flux des 4 Zones Git
          </div>
          <div className="grid sm:grid-cols-4 gap-2.5 text-center text-xs font-mono">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-3.5 shadow-xs">
              <div className="font-bold text-black dark:text-white font-sans">Working Tree</div>
              <div className="text-[10px] text-black/50 dark:text-white/50 mt-1">Fichiers modifiés</div>
            </div>
            <div className="rounded-2xl border border-[#22C55E]/30 bg-[#22C55E]/10 p-3.5 shadow-xs">
              <div className="text-[10px] text-[#22C55E] font-bold mb-1">git add ➔</div>
              <div className="font-bold text-black dark:text-white font-sans">Staging Area</div>
              <div className="text-[10px] text-black/60 dark:text-white/60 mt-1">Index préparé</div>
            </div>
            <div className="rounded-2xl border border-[#10B981]/30 bg-[#10B981]/10 p-3.5 shadow-xs">
              <div className="text-[10px] text-[#10B981] font-bold mb-1">git commit ➔</div>
              <div className="font-bold text-black dark:text-white font-sans">Local Repo</div>
              <div className="text-[10px] text-black/60 dark:text-white/60 mt-1">Historique .git</div>
            </div>
            <div className="rounded-2xl border border-[#22C55E]/30 bg-[#22C55E]/10 p-3.5 shadow-xs">
              <div className="text-[10px] text-[#22C55E] font-bold mb-1">git push ➔</div>
              <div className="font-bold text-black dark:text-white font-sans">Remote Repo</div>
              <div className="text-[10px] text-black/60 dark:text-white/60 mt-1">GitLab / GitHub</div>
            </div>
          </div>
        </div>
      )}

      {type === 'devops_cycle' && (
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-3">
            Le Cycle Continu DevOps
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold font-mono">
            <span className="rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 px-3 py-1.5 text-[#10B981] shadow-xs">PLAN</span>
            <span className="text-black/40 dark:text-white/40">➔</span>
            <span className="rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 px-3 py-1.5 text-[#10B981] shadow-xs">CODE</span>
            <span className="text-black/40 dark:text-white/40">➔</span>
            <span className="rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 px-3 py-1.5 text-[#10B981] shadow-xs">BUILD</span>
            <span className="text-black/40 dark:text-white/40">➔</span>
            <span className="rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 px-3 py-1.5 text-[#22C55E] shadow-xs">TEST</span>
            <span className="text-black/40 dark:text-white/40">➔</span>
            <span className="rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 px-3 py-1.5 text-[#22C55E] shadow-xs">RELEASE</span>
            <span className="text-black/40 dark:text-white/40">➔</span>
            <span className="rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 px-3 py-1.5 text-[#10B981] shadow-xs">DEPLOY</span>
            <span className="text-black/40 dark:text-white/40">➔</span>
            <span className="rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 px-3 py-1.5 text-[#10B981] shadow-xs">OPERATE & MONITOR</span>
          </div>
          <p className="text-center text-[11px] text-black/60 dark:text-white/60 mt-3">
            Boucle infinie unifiant développement et exploitation via l’automatisation CI/CD.
          </p>
        </div>
      )}
    </div>
  );
}
