import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Terminal, GitCommit, GitBranch, RotateCcw, CheckCircle2 } from 'lucide-react';

export function GitLabVisualizer() {
  const [workingFiles, setWorkingFiles] = useState<string[]>(['src/auth.ts', 'src/login.tsx']);
  const [stagedFiles, setStagedFiles] = useState<string[]>([]);
  const [localCommits, setLocalCommits] = useState<string[]>(['c1a2f3 : Initial commit']);
  const [remoteCommits, setRemoteCommits] = useState<string[]>(['c1a2f3 : Initial commit']);
  const [activeBranch, setActiveBranch] = useState<string>('main');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '$ git status',
    'Sur la branche main. Dépôt initialisé.',
    'Fichiers modifiés non indexés : src/auth.ts, src/login.tsx'
  ]);

  const addLog = (cmd: string, output: string) => {
    setTerminalLogs(prev => [cmd, output, ...prev.slice(0, 10)]);
  };

  const handleGitAdd = () => {
    if (workingFiles.length === 0) {
      addLog('$ git add .', 'Rien à indexer : le répertoire de travail est propre.');
      return;
    }
    setStagedFiles(prev => [...prev, ...workingFiles]);
    setWorkingFiles([]);
    addLog('$ git add .', '✓ 2 fichiers placés dans la zone de staging (Index).');
  };

  const handleGitCommit = () => {
    if (stagedFiles.length === 0) {
      addLog('$ git commit -m "feat: login"', 'Échec : aucun fichier dans la zone de staging (faites d’abord git add).');
      return;
    }
    const newHash = Math.random().toString(36).substring(2, 8);
    const msg = `${newHash} : feat(auth): implémentation connexion stagiaire`;
    setLocalCommits(prev => [msg, ...prev]);
    setStagedFiles([]);
    addLog('$ git commit -m "feat(auth): implémentation connexion"', `✓ [${activeBranch} ${newHash}] Commit local créé avec succès.`);
  };

  const handleGitPush = () => {
    if (localCommits.length === remoteCommits.length) {
      addLog('$ git push origin main', 'Everything up-to-date : aucun commit en attente.');
      return;
    }
    setRemoteCommits([...localCommits]);
    addLog('$ git push origin ' + activeBranch, `✓ ${localCommits.length - remoteCommits.length} commit(s) poussé(s) vers GitLab (origin/${activeBranch}).`);
  };

  const handleCreateBranch = () => {
    if (activeBranch !== 'main') {
      addLog('$ git switch -c feature/payment', 'Vous êtes déjà sur une branche secondaire.');
      return;
    }
    setActiveBranch('feature/payment');
    setWorkingFiles(['src/payment.ts']);
    addLog('$ git switch -c feature/payment', '✓ Basculé sur la nouvelle branche "feature/payment". Fichier src/payment.ts créé.');
  };

  const handleGitMerge = () => {
    if (activeBranch === 'main') {
      addLog('$ git merge feature/payment', 'La branche feature/payment est déjà fusionnée ou introuvable.');
      return;
    }
    setActiveBranch('main');
    addLog('$ git switch main && git merge feature/payment', '✓ Fusion Fast-forward réussie de feature/payment dans main.');
  };

  const handleReset = () => {
    setWorkingFiles(['src/auth.ts', 'src/login.tsx']);
    setStagedFiles([]);
    setLocalCommits(['c1a2f3 : Initial commit']);
    setRemoteCommits(['c1a2f3 : Initial commit']);
    setActiveBranch('main');
    setTerminalLogs(['$ git status', 'Dépôt réinitialisé à l’état initial.']);
  };

  return (
    <Card className="rounded-3xl border-slate-200/90 shadow-card">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="warning" size="sm">Laboratoire 04</Badge>
              <Badge variant="outline" size="sm">Flux Git & GitLab</Badge>
            </div>
            <CardTitle className="text-xl sm:text-2xl mt-1">Git Lab · Visualiseur des 4 Zones</CardTitle>
            <CardDescription>
              Exécute les commandes canoniques et observe les fichiers et commits traverser les 4 zones fondamentales : Working Directory ➔ Staging ➔ Local Repo ➔ Remote Repo.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl">
              <GitBranch className="h-3.5 w-3.5 text-primary" />
              Branche : <b className="text-slate-900">{activeBranch}</b>
            </span>
            <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5">
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Réinitialiser</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Visual 4-Zone Board */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {/* Zone 1 : Working Directory */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <span className="text-xs font-bold text-slate-700">1. Working Directory</span>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                {workingFiles.length} fichier(s)
              </span>
            </div>
            <div className="min-h-[110px] space-y-2">
              {workingFiles.length === 0 ? (
                <div className="text-xs text-slate-400 italic py-6 text-center">Répertoire propre</div>
              ) : (
                workingFiles.map(f => (
                  <div key={f} className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-100 p-2 text-xs font-mono text-red-900">
                    <span className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
                    <span className="truncate">{f}</span>
                  </div>
                ))
              )}
            </div>
            <p className="mt-2 text-[10px] text-slate-400">Modifications non indexées</p>
          </div>

          {/* Zone 2 : Staging Area */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/30 p-4 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-amber-200/60 mb-3">
              <span className="text-xs font-bold text-amber-900">2. Staging Area</span>
              <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                {stagedFiles.length} fichier(s)
              </span>
            </div>
            <div className="min-h-[110px] space-y-2">
              {stagedFiles.length === 0 ? (
                <div className="text-xs text-slate-400 italic py-6 text-center">Zone vide (git add)</div>
              ) : (
                stagedFiles.map(f => (
                  <div key={f} className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-2 text-xs font-mono text-emerald-900">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="truncate">{f}</span>
                  </div>
                ))
              )}
            </div>
            <p className="mt-2 text-[10px] text-amber-700/80">Prêt pour git commit</p>
          </div>

          {/* Zone 3 : Local Repository */}
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50/30 p-4 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-indigo-200/60 mb-3">
              <span className="text-xs font-bold text-indigo-950">3. Local Repository</span>
              <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-primary">
                {localCommits.length} commit(s)
              </span>
            </div>
            <div className="min-h-[110px] space-y-2">
              {localCommits.slice(0, 3).map((c, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg bg-white border border-indigo-100 p-2 text-xs font-mono text-indigo-950 truncate">
                  <GitCommit className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="truncate">{c}</span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[10px] text-indigo-700/80">Base de données .git locale</p>
          </div>

          {/* Zone 4 : Remote Repository */}
          <div className="rounded-2xl border border-teal-200 bg-teal-50/30 p-4 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-teal-200/60 mb-3">
              <span className="text-xs font-bold text-teal-950">4. Remote (GitLab)</span>
              <span className="rounded-md bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-800">
                {remoteCommits.length} commit(s)
              </span>
            </div>
            <div className="min-h-[110px] space-y-2">
              {remoteCommits.slice(0, 3).map((c, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg bg-white border border-teal-100 p-2 text-xs font-mono text-teal-950 truncate">
                  <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                  <span className="truncate">{c}</span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[10px] text-teal-700/80">origin/main sur GitLab</p>
          </div>
        </div>

        {/* Command Terminal Bar */}
        <div className="mb-6 rounded-2xl border border-slate-200/90 bg-white p-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Lancer une commande Git interactive :
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={handleGitAdd}
              disabled={workingFiles.length === 0}
              className="font-mono text-xs font-bold"
            >
              $ git add .
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGitCommit}
              disabled={stagedFiles.length === 0}
              className="font-mono text-xs font-bold"
            >
              $ git commit -m "feat..."
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGitPush}
              disabled={localCommits.length === remoteCommits.length}
              className="font-mono text-xs font-bold text-teal-700 border-teal-200 hover:bg-teal-50"
            >
              $ git push origin {activeBranch}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCreateBranch}
              className="font-mono text-xs font-bold"
            >
              $ git switch -c feature/payment
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGitMerge}
              disabled={activeBranch === 'main'}
              className="font-mono text-xs font-bold"
            >
              $ git merge feature/payment
            </Button>
          </div>
        </div>

        {/* Console Log Output */}
        <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-4 text-xs font-mono text-slate-300 shadow-inner">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-700/80 mb-3 text-slate-400">
            <Terminal className="h-3.5 w-3.5 text-emerald-400" />
            <span>Terminal Git Bash — Journaux d’exécution</span>
          </div>
          <div className="space-y-1 overflow-y-auto max-h-36">
            {terminalLogs.map((log, i) => (
              <div key={i} className={log.startsWith('$') ? 'text-emerald-400 font-bold' : log.includes('✓') ? 'text-teal-300' : 'text-slate-300'}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
