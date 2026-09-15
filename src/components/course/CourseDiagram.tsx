import React from 'react';

interface CourseDiagramProps {
  type?: 'lifecycle' | 'gantt_preview' | 'pert_preview' | 'scrum_workflow' | 'git_flow' | 'devops_cycle' | 'raci_matrix';
}

export function CourseDiagram({ type }: CourseDiagramProps) {
  if (!type) return null;

  return (
    <div className="my-6 overflow-hidden rounded-3xl border border-white/10 bg-[#0D1526]/85 backdrop-blur-xl p-5 sm:p-7 shadow-xl">
      {type === 'lifecycle' && (
        <div className="space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Comparatif Visuel : Cascade vs Agile
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-[#070B14]/80 p-4 sm:p-5 shadow-md">
              <span className="inline-block rounded-lg bg-white/10 px-2.5 py-1 text-xs font-bold text-slate-300 mb-3 border border-white/10">
                Modèle Séquentiel (Cascade)
              </span>
              <div className="space-y-2 font-mono text-xs text-slate-300">
                <div className="rounded-xl bg-[#0D1526] border border-white/10 p-2 text-center">01. Spécifications figées</div>
                <div className="text-center text-slate-500">↓</div>
                <div className="rounded-xl bg-[#0D1526] border border-white/10 p-2 text-center">02. Conception architecturale</div>
                <div className="text-center text-slate-500">↓</div>
                <div className="rounded-xl bg-[#0D1526] border border-white/10 p-2 text-center">03. Développement global</div>
                <div className="text-center text-slate-500">↓</div>
                <div className="rounded-xl bg-[#0D1526] border border-white/10 p-2 text-center">04. Tests & Recette tardive</div>
              </div>
              <p className="mt-3 text-[11px] text-amber-300 font-medium">⚠️ Le feedback intervient à la fin : changement très coûteux.</p>
            </div>

            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/20 p-4 sm:p-5 shadow-md">
              <span className="inline-block rounded-lg bg-indigo-500/20 px-2.5 py-1 text-xs font-bold text-indigo-300 mb-3 border border-indigo-500/40">
                Approche Agile (Scrum)
              </span>
              <div className="space-y-2 font-mono text-xs text-indigo-200">
                <div className="rounded-xl bg-[#070B14] border border-indigo-500/30 p-2 text-center font-bold">
                  Sprint 1 (2-4 sem) ➔ Incrément testé + Feedback
                </div>
                <div className="text-center text-indigo-400 font-bold">↓ Adaptation</div>
                <div className="rounded-xl bg-[#070B14] border border-indigo-500/30 p-2 text-center font-bold">
                  Sprint 2 (2-4 sem) ➔ Incrément enrichi + Démo
                </div>
                <div className="text-center text-indigo-400 font-bold">↓ Ajustement</div>
                <div className="rounded-xl bg-[#070B14] border border-indigo-500/30 p-2 text-center font-bold">
                  Sprint N (Livraison continue de valeur)
                </div>
              </div>
              <p className="mt-3 text-[11px] text-emerald-300 font-medium">✓ Feedback continu : le client valide à chaque Sprint.</p>
            </div>
          </div>
        </div>
      )}

      {type === 'raci_matrix' && (
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
            Exemple de Matrice RACI
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#070B14]/80 p-4">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-bold">
                  <th className="py-2.5 pr-4">Activité / Livrable</th>
                  <th className="py-2.5 px-3 text-center">Chef de projet</th>
                  <th className="py-2.5 px-3 text-center">MOA (Client)</th>
                  <th className="py-2.5 px-3 text-center">Développeur</th>
                  <th className="py-2.5 px-3 text-center">Architecte</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 font-medium">
                <tr>
                  <td className="py-3 pr-4 text-slate-200 font-medium">Validation Cahier des charges</td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-bold">C</span></td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-indigo-600/30 border border-indigo-500/50 text-indigo-300 font-black shadow-sm">A</span></td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-400 font-bold">I</span></td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-bold">C</span></td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-slate-200 font-medium">Développement de l’API REST</td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-indigo-600/30 border border-indigo-500/50 text-indigo-300 font-black shadow-sm">A</span></td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-400 font-bold">I</span></td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 font-black shadow-sm">R</span></td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-bold">C</span></td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-slate-200 font-medium">Tests de recette finale</td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-bold">C</span></td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-indigo-600/30 border border-indigo-500/50 text-indigo-300 font-black shadow-sm">A</span></td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-bold">C</span></td>
                  <td className="py-3 px-3 text-center"><span className="inline-block px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-400 font-bold">I</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11px] text-slate-400 leading-relaxed">
            Règles d’or : Strictement <b className="text-white">1 seul Accountable (A)</b> par ligne. <b className="text-emerald-400">R</b> réalise concrètement le livrable.
          </p>
        </div>
      )}

      {type === 'gantt_preview' && (
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
            Structure d’un Diagramme de Gantt avec Dépendances
          </div>
          <div className="space-y-3 font-sans text-xs">
            <div className="flex items-center gap-3">
              <span className="w-28 font-semibold text-slate-300 truncate">1. Cadrage</span>
              <div className="flex-1 bg-[#070B14] h-5 rounded-lg overflow-hidden flex items-center border border-white/5">
                <div className="bg-indigo-600 text-white text-[10px] font-bold px-2 h-full flex items-center rounded-lg w-1/4">
                  2 sem
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-28 font-semibold text-slate-300 truncate">2. Maquettage</span>
              <div className="flex-1 bg-[#070B14] h-5 rounded-lg overflow-hidden flex items-center border border-white/5">
                <div className="ml-[25%] bg-cyan-600 text-white text-[10px] font-bold px-2 h-full flex items-center rounded-lg w-1/4">
                  2 sem
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-28 font-semibold text-slate-300 truncate">3. Développement</span>
              <div className="flex-1 bg-[#070B14] h-5 rounded-lg overflow-hidden flex items-center border border-white/5">
                <div className="ml-[50%] bg-indigo-500 text-white text-[10px] font-bold px-2 h-full flex items-center rounded-lg w-2/5">
                  4 sem
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-28 font-semibold text-slate-300 truncate">4. Recette (Jalon)</span>
              <div className="flex-1 bg-[#070B14] h-5 rounded-lg flex items-center relative border border-white/5">
                <div className="absolute left-[90%] -top-0.5 w-4 h-4 bg-amber-400 rotate-45 rounded-sm shadow-md shadow-amber-500/40" title="Jalon (durée = 0)" />
              </div>
            </div>
          </div>
          <p className="mt-4 text-[11px] text-slate-400">
            Le losange orange représente le <b className="text-amber-300">Jalon</b> : durée nulle, point décisionnel d’achèvement majeur.
          </p>
        </div>
      )}

      {type === 'pert_preview' && (
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
            Structure d’un Nœud de Tâche PERT
          </div>
          <div className="flex justify-center my-2">
            <div className="w-48 rounded-2xl border border-white/15 bg-[#070B14] shadow-xl overflow-hidden text-center text-xs">
              <div className="grid grid-cols-2 bg-indigo-950/60 border-b border-white/10 py-1.5 font-bold text-indigo-300">
                <div>ES (Plus tôt)</div>
                <div className="border-l border-white/10">EF (Fin tôt)</div>
              </div>
              <div className="py-2.5 font-black text-sm text-white bg-[#0D1526]">
                Tâche A (3 jours)
              </div>
              <div className="grid grid-cols-2 bg-[#070B14] border-t border-white/10 py-1.5 text-slate-400 font-semibold">
                <div>LS (Plus tard)</div>
                <div className="border-l border-white/10">LF (Fin tard)</div>
              </div>
            </div>
          </div>
          <p className="text-center text-[11px] text-slate-400 mt-2">
            Marge Totale = LS − ES = LF − EF. Si Marge = 0 ➔ La tâche est sur le <b className="text-emerald-400">Chemin Critique</b>.
          </p>
        </div>
      )}

      {type === 'scrum_workflow' && (
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
            La Boucle Itérative Scrum
          </div>
          <div className="grid sm:grid-cols-4 gap-2.5 text-center text-xs">
            <div className="rounded-2xl border border-white/10 bg-[#070B14] p-3.5">
              <div className="font-bold text-white">1. Product Backlog</div>
              <div className="text-[11px] text-slate-400 mt-1">Ordonné par le PO selon la valeur</div>
            </div>
            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/30 p-3.5">
              <div className="font-bold text-indigo-300">2. Sprint Planning</div>
              <div className="text-[11px] text-slate-300 mt-1">Sprint Goal + Sprint Backlog</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#070B14] p-3.5">
              <div className="font-bold text-white">3. Sprint (1-4 sem)</div>
              <div className="text-[11px] text-slate-400 mt-1">Daily Scrum 15 min chaque jour</div>
            </div>
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-3.5">
              <div className="font-bold text-emerald-300">4. Review & Retro</div>
              <div className="text-[11px] text-slate-300 mt-1">Incrément testé + Amélioration</div>
            </div>
          </div>
        </div>
      )}

      {type === 'git_flow' && (
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
            Flux des 4 Zones Git
          </div>
          <div className="grid sm:grid-cols-4 gap-2.5 text-center text-xs font-mono">
            <div className="rounded-2xl border border-white/10 bg-[#070B14] p-3.5">
              <div className="font-bold text-white font-sans">Working Tree</div>
              <div className="text-[10px] text-slate-400 mt-1">Fichiers modifiés</div>
            </div>
            <div className="rounded-2xl border border-amber-500/30 bg-amber-950/30 p-3.5">
              <div className="text-[10px] text-amber-400 font-bold mb-1">git add ➔</div>
              <div className="font-bold text-amber-200 font-sans">Staging Area</div>
              <div className="text-[10px] text-slate-400 mt-1">Index préparé</div>
            </div>
            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/30 p-3.5">
              <div className="text-[10px] text-indigo-400 font-bold mb-1">git commit ➔</div>
              <div className="font-bold text-indigo-200 font-sans">Local Repo</div>
              <div className="text-[10px] text-slate-400 mt-1">Historique .git</div>
            </div>
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/30 p-3.5">
              <div className="text-[10px] text-cyan-400 font-bold mb-1">git push ➔</div>
              <div className="font-bold text-cyan-200 font-sans">Remote Repo</div>
              <div className="text-[10px] text-slate-400 mt-1">GitLab / GitHub</div>
            </div>
          </div>
        </div>
      )}

      {type === 'devops_cycle' && (
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
            Le Cycle Continu DevOps
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
            <span className="rounded-xl bg-indigo-950/50 border border-indigo-500/40 px-3 py-1.5 text-indigo-300">PLAN</span>
            <span className="text-slate-500">➔</span>
            <span className="rounded-xl bg-indigo-950/50 border border-indigo-500/40 px-3 py-1.5 text-indigo-300">CODE</span>
            <span className="text-slate-500">➔</span>
            <span className="rounded-xl bg-indigo-950/50 border border-indigo-500/40 px-3 py-1.5 text-indigo-300">BUILD</span>
            <span className="text-slate-500">➔</span>
            <span className="rounded-xl bg-cyan-950/50 border border-cyan-500/40 px-3 py-1.5 text-cyan-300">TEST</span>
            <span className="text-slate-500">➔</span>
            <span className="rounded-xl bg-cyan-950/50 border border-cyan-500/40 px-3 py-1.5 text-cyan-300">RELEASE</span>
            <span className="text-slate-500">➔</span>
            <span className="rounded-xl bg-emerald-950/50 border border-emerald-500/40 px-3 py-1.5 text-emerald-300">DEPLOY</span>
            <span className="text-slate-500">➔</span>
            <span className="rounded-xl bg-emerald-950/50 border border-emerald-500/40 px-3 py-1.5 text-emerald-300">OPERATE & MONITOR</span>
          </div>
          <p className="text-center text-[11px] text-slate-400 mt-3">
            Boucle infinie unifiant développement et exploitation via l’automatisation CI/CD.
          </p>
        </div>
      )}
    </div>
  );
}
