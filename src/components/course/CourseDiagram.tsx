import React from 'react';

interface CourseDiagramProps {
  type?: 'lifecycle' | 'gantt_preview' | 'pert_preview' | 'scrum_workflow' | 'git_flow' | 'devops_cycle' | 'raci_matrix';
}

export function CourseDiagram({ type }: CourseDiagramProps) {
  if (!type) return null;

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-50/60 p-4 sm:p-6">
      {type === 'lifecycle' && (
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Comparatif Visuel : Cascade vs Agile
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <span className="inline-block rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700 mb-2">
                Modèle Séquentiel (Cascade)
              </span>
              <div className="space-y-1.5 font-mono text-xs text-slate-600">
                <div className="rounded-lg bg-slate-50 border border-slate-200 p-2 text-center">01. Spécifications figées</div>
                <div className="text-center text-slate-400">↓</div>
                <div className="rounded-lg bg-slate-50 border border-slate-200 p-2 text-center">02. Conception architecturale</div>
                <div className="text-center text-slate-400">↓</div>
                <div className="rounded-lg bg-slate-50 border border-slate-200 p-2 text-center">03. Développement global</div>
                <div className="text-center text-slate-400">↓</div>
                <div className="rounded-lg bg-slate-50 border border-slate-200 p-2 text-center">04. Tests & Recette tardive</div>
              </div>
              <p className="mt-3 text-[11px] text-amber-700 font-medium">⚠️ Le feedback intervient à la fin : changement coûteux.</p>
            </div>

            <div className="rounded-xl border border-indigo-200 bg-white p-4 shadow-sm">
              <span className="inline-block rounded-md bg-indigo-50 px-2 py-1 text-xs font-bold text-primary mb-2">
                Approche Agile (Scrum)
              </span>
              <div className="space-y-1.5 font-mono text-xs text-indigo-900">
                <div className="rounded-lg bg-indigo-50/80 border border-indigo-100 p-2 text-center font-bold">
                  Sprint 1 (2-4 sem) ➔ Incrément testé + Feedback
                </div>
                <div className="text-center text-primary font-bold">↓ Adaptation</div>
                <div className="rounded-lg bg-indigo-50/80 border border-indigo-100 p-2 text-center font-bold">
                  Sprint 2 (2-4 sem) ➔ Incrément enrichi + Démo
                </div>
                <div className="text-center text-primary font-bold">↓ Ajustement</div>
                <div className="rounded-lg bg-indigo-50/80 border border-indigo-100 p-2 text-center font-bold">
                  Sprint N (Livraison continue de valeur)
                </div>
              </div>
              <p className="mt-3 text-[11px] text-emerald-700 font-medium">✓ Feedback continu : le client valide à chaque Sprint.</p>
            </div>
          </div>
        </div>
      )}

      {type === 'raci_matrix' && (
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Exemple de Matrice RACI
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold">
                  <th className="py-2 pr-4">Activité / Livrable</th>
                  <th className="py-2 px-2 text-center">Chef de projet</th>
                  <th className="py-2 px-2 text-center">MOA (Client)</th>
                  <th className="py-2 px-2 text-center">Développeur</th>
                  <th className="py-2 px-2 text-center">Architecte</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr>
                  <td className="py-2.5 pr-4 text-slate-800">Validation Cahier des charges</td>
                  <td className="py-2 px-2 text-center font-bold text-slate-600">C</td>
                  <td className="py-2 px-2 text-center font-black text-primary bg-indigo-50/60 rounded">A</td>
                  <td className="py-2 px-2 text-center font-bold text-slate-600">I</td>
                  <td className="py-2 px-2 text-center font-bold text-slate-600">C</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 text-slate-800">Développement de l’API REST</td>
                  <td className="py-2 px-2 text-center font-black text-primary bg-indigo-50/60 rounded">A</td>
                  <td className="py-2 px-2 text-center font-bold text-slate-600">I</td>
                  <td className="py-2 px-2 text-center font-black text-emerald-700 bg-emerald-50 rounded">R</td>
                  <td className="py-2 px-2 text-center font-bold text-slate-600">C</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 text-slate-800">Tests de recette finale</td>
                  <td className="py-2 px-2 text-center font-bold text-slate-600">C</td>
                  <td className="py-2 px-2 text-center font-black text-primary bg-indigo-50/60 rounded">A</td>
                  <td className="py-2 px-2 text-center font-bold text-slate-600">C</td>
                  <td className="py-2 px-2 text-center font-bold text-slate-600">I</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11px] text-slate-500">
            Règles d’or : Strictement <b>1 seul Accountable (A)</b> par ligne. R réalise concrètement le livrable.
          </p>
        </div>
      )}

      {type === 'gantt_preview' && (
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Structure d’un Diagramme de Gantt avec Dépendances
          </div>
          <div className="space-y-3 font-sans text-xs">
            <div className="flex items-center gap-3">
              <span className="w-28 font-semibold text-slate-700 truncate">1. Cadrage</span>
              <div className="flex-1 bg-slate-100 h-5 rounded-lg overflow-hidden flex items-center">
                <div className="bg-primary text-white text-[10px] font-bold px-2 h-full flex items-center rounded-lg w-1/4">
                  2 sem
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-28 font-semibold text-slate-700 truncate">2. Maquettage</span>
              <div className="flex-1 bg-slate-100 h-5 rounded-lg overflow-hidden flex items-center">
                <div className="ml-[25%] bg-teal-600 text-white text-[10px] font-bold px-2 h-full flex items-center rounded-lg w-1/4">
                  2 sem
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-28 font-semibold text-slate-700 truncate">3. Développement</span>
              <div className="flex-1 bg-slate-100 h-5 rounded-lg overflow-hidden flex items-center">
                <div className="ml-[50%] bg-indigo-500 text-white text-[10px] font-bold px-2 h-full flex items-center rounded-lg w-2/5">
                  4 sem
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-28 font-semibold text-slate-700 truncate">4. Recette (Jalon)</span>
              <div className="flex-1 bg-slate-100 h-5 rounded-lg flex items-center relative">
                <div className="absolute left-[90%] -top-0.5 w-4 h-4 bg-amber-500 rotate-45 rounded-sm shadow-sm" title="Jalon (durée = 0)" />
              </div>
            </div>
          </div>
          <p className="mt-4 text-[11px] text-slate-500">
            Le losange orange représente le <b>Jalon</b> : durée nulle, point décisionnel d’achèvement majeur.
          </p>
        </div>
      )}

      {type === 'pert_preview' && (
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Structure d’un Nœud de Tâche PERT
          </div>
          <div className="flex justify-center my-2">
            <div className="w-48 rounded-xl border-2 border-primary bg-white shadow-sm overflow-hidden text-center text-xs">
              <div className="grid grid-cols-2 bg-indigo-50 border-b border-indigo-100 py-1 font-bold text-indigo-950">
                <div>ES (Plus tôt)</div>
                <div className="border-l border-indigo-200">EF (Fin tôt)</div>
              </div>
              <div className="py-2 font-black text-sm text-slate-900 bg-white">
                Tâche A (3 jours)
              </div>
              <div className="grid grid-cols-2 bg-slate-50 border-t border-slate-200 py-1 text-slate-600 font-semibold">
                <div>LS (Plus tard)</div>
                <div className="border-l border-slate-200">LF (Fin tard)</div>
              </div>
            </div>
          </div>
          <p className="text-center text-[11px] text-slate-500 mt-2">
            Marge Totale = LS − ES = LF − EF. Si Marge = 0 ➔ La tâche est sur le <b>Chemin Critique</b>.
          </p>
        </div>
      )}

      {type === 'scrum_workflow' && (
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            La Boucle Itérative Scrum
          </div>
          <div className="grid sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="font-bold text-slate-800">1. Product Backlog</div>
              <div className="text-[11px] text-slate-500 mt-1">Ordonné par le PO selon la valeur</div>
            </div>
            <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-3">
              <div className="font-bold text-primary">2. Sprint Planning</div>
              <div className="text-[11px] text-slate-600 mt-1">Sprint Goal + Sprint Backlog</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="font-bold text-slate-800">3. Sprint (1-4 sem)</div>
              <div className="text-[11px] text-slate-500 mt-1">Daily Scrum 15 min chaque jour</div>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
              <div className="font-bold text-emerald-800">4. Review & Retro</div>
              <div className="text-[11px] text-slate-600 mt-1">Incrément testé + Amélioration</div>
            </div>
          </div>
        </div>
      )}

      {type === 'git_flow' && (
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Flux des 4 Zones Git
          </div>
          <div className="grid sm:grid-cols-4 gap-2 text-center text-xs font-mono">
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="font-bold text-slate-800 font-sans">Working Tree</div>
              <div className="text-[10px] text-slate-400 mt-1">Fichiers modifiés</div>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3">
              <div className="text-[10px] text-amber-700 font-bold mb-1">git add ➔</div>
              <div className="font-bold text-amber-900 font-sans">Staging Area</div>
              <div className="text-[10px] text-slate-500 mt-1">Index préparé</div>
            </div>
            <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 p-3">
              <div className="text-[10px] text-indigo-700 font-bold mb-1">git commit ➔</div>
              <div className="font-bold text-indigo-900 font-sans">Local Repo</div>
              <div className="text-[10px] text-slate-500 mt-1">Historique .git</div>
            </div>
            <div className="rounded-xl border border-teal-200 bg-teal-50/70 p-3">
              <div className="text-[10px] text-teal-700 font-bold mb-1">git push ➔</div>
              <div className="font-bold text-teal-900 font-sans">Remote Repo</div>
              <div className="text-[10px] text-slate-500 mt-1">GitLab / GitHub</div>
            </div>
          </div>
        </div>
      )}

      {type === 'devops_cycle' && (
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Le Cycle Continu DevOps
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
            <span className="rounded-lg bg-indigo-50 border border-indigo-200 px-3 py-1.5 text-primary">PLAN</span>
            <span>➔</span>
            <span className="rounded-lg bg-indigo-50 border border-indigo-200 px-3 py-1.5 text-primary">CODE</span>
            <span>➔</span>
            <span className="rounded-lg bg-indigo-50 border border-indigo-200 px-3 py-1.5 text-primary">BUILD</span>
            <span>➔</span>
            <span className="rounded-lg bg-teal-50 border border-teal-200 px-3 py-1.5 text-teal-800">TEST</span>
            <span>➔</span>
            <span className="rounded-lg bg-teal-50 border border-teal-200 px-3 py-1.5 text-teal-800">RELEASE</span>
            <span>➔</span>
            <span className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-emerald-800">DEPLOY</span>
            <span>➔</span>
            <span className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-emerald-800">OPERATE & MONITOR</span>
          </div>
          <p className="text-center text-[11px] text-slate-500 mt-3">
            Boucle infinie unifiant développement et exploitation via l’automatisation CI/CD.
          </p>
        </div>
      )}
    </div>
  );
}
