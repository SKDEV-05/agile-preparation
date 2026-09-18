import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  Terminal as TerminalIcon,
  GitCommit,
  GitBranch,
  RotateCcw,
  CheckCircle2,
  Send,
  HelpCircle,
  Trash2,
  Sparkles,
  FileCode2
} from 'lucide-react';

interface TerminalEntry {
  type: 'cmd' | 'output' | 'error' | 'success' | 'info';
  text: string;
}

export function GitLabVisualizer() {
  // 4 Git Zones State
  const [workingFiles, setWorkingFiles] = useState<string[]>([
    'src/components/Auth.tsx',
    'src/services/api.ts'
  ]);
  const [stagedFiles, setStagedFiles] = useState<string[]>([]);
  const [localCommits, setLocalCommits] = useState<Array<{ hash: string; msg: string; branch: string; files: string[] }>>([
    { hash: 'c1a2f3e', msg: 'Initial commit: setup structure OFPPT', branch: 'main', files: ['package.json', 'README.md'] }
  ]);
  const [remoteCommits, setRemoteCommits] = useState<Array<{ hash: string; msg: string; branch: string; files: string[] }>>([
    { hash: 'c1a2f3e', msg: 'Initial commit: setup structure OFPPT', branch: 'main', files: ['package.json', 'README.md'] }
  ]);

  // Branching State
  const [branches, setBranches] = useState<string[]>(['main', 'feature/login']);
  const [activeBranch, setActiveBranch] = useState<string>('main');

  // Terminal State
  const [commandInput, setCommandInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<TerminalEntry[]>([
    { type: 'info', text: 'Bienvenue dans le simulateur interactif Git CLI (OFPPT Full Stack 2A).' },
    { type: 'info', text: 'Tapez "help" pour afficher la liste des commandes ou cliquez sur les suggestions ci-dessous.' },
    { type: 'cmd', text: 'git status' },
    { type: 'output', text: 'Sur la branche main. Votre branche est à jour avec \'origin/main\'.' },
    { type: 'error', text: 'Fichiers non indexés (Working Directory) :\n  - src/components/Auth.tsx\n  - src/services/api.ts' },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (entry: TerminalEntry) => {
    setLogs(prev => [...prev, entry]);
  };

  const addLogs = (entries: TerminalEntry[]) => {
    setLogs(prev => [...prev, ...entries]);
  };

  const generateHash = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  // Process typed command
  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    addLog({ type: 'cmd', text: `stagiaire@ofppt:~/app (${activeBranch}) $ ${trimmed}` });

    const lower = trimmed.toLowerCase();
    const parts = trimmed.split(/\s+/);
    const gitSubCmd = parts[0] === 'git' ? (parts[1] || '').toLowerCase() : '';

    if (lower === 'help' || lower === 'git --help' || lower === 'git help') {
      addLogs([
        { type: 'info', text: '════════════════════════════════════════════════════════════' },
        { type: 'info', text: 'COMMANDES GIT RECONNUES PAR LE SIMULATEUR :' },
        { type: 'info', text: '  • git status                   : Vérifier l\'état des 4 zones' },
        { type: 'info', text: '  • git add <fichier> ou git add . : Déplacer vers la Staging Area' },
        { type: 'info', text: '  • git commit -m "message"      : Enregistrer dans le Local Repo' },
        { type: 'info', text: '  • git push origin <branche>    : Envoyer vers GitLab (Remote)' },
        { type: 'info', text: '  • git branch                   : Lister les branches locales' },
        { type: 'info', text: '  • git switch -c <nom>          : Créer et basculer sur une branche' },
        { type: 'info', text: '  • git switch <nom>             : Changer de branche active' },
        { type: 'info', text: '  • git merge <branche>          : Fusionner une branche dans la courante' },
        { type: 'info', text: '  • git log --oneline            : Afficher l\'historique des commits' },
        { type: 'info', text: '  • git diff                     : Examiner les différences non indexées' },
        { type: 'info', text: '  • touch <fichier>              : Créer un nouveau fichier de travail' },
        { type: 'info', text: '  • clear                        : Effacer l\'écran du terminal' },
        { type: 'info', text: '════════════════════════════════════════════════════════════' }
      ]);
      return;
    }

    if (lower === 'clear' || lower === 'cls') {
      setLogs([]);
      return;
    }

    if (parts[0] === 'touch' || parts[0] === 'new') {
      const fileName = parts[1] || `src/module_${Math.floor(Math.random() * 90 + 10)}.ts`;
      setWorkingFiles(prev => [...new Set([...prev, fileName])]);
      addLog({ type: 'success', text: `Fichier créé dans le Working Directory : ${fileName}` });
      return;
    }

    if (parts[0] !== 'git') {
      addLog({
        type: 'error',
        text: `bash: commande introuvable : "${parts[0]}". Tapez "help" pour voir les commandes disponibles.`
      });
      return;
    }

    // GIT STATUS
    if (gitSubCmd === 'status') {
      const isClean = workingFiles.length === 0 && stagedFiles.length === 0;
      const unpushedCount = localCommits.length - remoteCommits.length;

      const outputEntries: TerminalEntry[] = [
        { type: 'output', text: `Sur la branche ${activeBranch}` }
      ];

      if (unpushedCount > 0) {
        outputEntries.push({
          type: 'info',
          text: `Votre branche est en avance sur 'origin/${activeBranch}' de ${unpushedCount} commit(s).\n  (utilisez "git push" pour publier vos commits locaux)`
        });
      } else {
        outputEntries.push({
          type: 'output',
          text: `Votre branche est à jour avec 'origin/${activeBranch}'.`
        });
      }

      if (stagedFiles.length > 0) {
        outputEntries.push({
          type: 'success',
          text: `Modifications qui seront validées (Staging Area) :\n  (utilisez "git restore --staged <fichier>..." pour désindexer)\n` +
            stagedFiles.map(f => `\tmodifié :   ${f}`).join('\n')
        });
      }

      if (workingFiles.length > 0) {
        outputEntries.push({
          type: 'error',
          text: `Modifications qui ne sont pas indexées pour validation (Working Directory) :\n  (utilisez "git add <fichier>..." pour indexer)\n` +
            workingFiles.map(f => `\tmodifié :   ${f}`).join('\n')
        });
      }

      if (isClean) {
        outputEntries.push({
          type: 'output',
          text: 'Rien à valider, la copie de travail est propre.'
        });
      }

      addLogs(outputEntries);
      return;
    }

    // GIT ADD
    if (gitSubCmd === 'add') {
      const target = parts.slice(2).join(' ').trim();
      if (!target) {
        addLog({ type: 'error', text: 'Erreur : rien de spécifié, rien d\'ajouté. Exemple: git add . ou git add src/auth.ts' });
        return;
      }

      if (workingFiles.length === 0) {
        addLog({ type: 'output', text: 'Rien à indexer : le répertoire de travail est déjà propre.' });
        return;
      }

      if (target === '.' || target === '-A' || target === '*' || target === 'all') {
        const addedCount = workingFiles.length;
        setStagedFiles(prev => [...new Set([...prev, ...workingFiles])]);
        setWorkingFiles([]);
        addLog({
          type: 'success',
          text: `✓ ${addedCount} fichier(s) déplacé(s) de Working Directory vers Staging Area (Index).`
        });
      } else {
        const matched = workingFiles.filter(f => f.toLowerCase().includes(target.toLowerCase()));
        if (matched.length === 0) {
          addLog({ type: 'error', text: `fatal: le chemin '${target}' ne correspond à aucun fichier modifié.` });
        } else {
          setStagedFiles(prev => [...new Set([...prev, ...matched])]);
          setWorkingFiles(prev => prev.filter(f => !matched.includes(f)));
          addLog({
            type: 'success',
            text: `✓ Fichier indexé avec succès : ${matched.join(', ')}.`
          });
        }
      }
      return;
    }

    // GIT COMMIT
    if (gitSubCmd === 'commit') {
      if (stagedFiles.length === 0) {
        addLog({
          type: 'error',
          text: 'Échec de commit : aucune modification en zone de staging.\nFaites d\'abord "git add ." avant de valider avec "git commit".'
        });
        return;
      }

      let commitMessage = 'feat: travail effectué sur le projet';
      const mMatch = trimmed.match(/-m\s+["']([^"']+)["']/);
      if (mMatch && mMatch[1]) {
        commitMessage = mMatch[1];
      } else if (trimmed.includes('-m')) {
        commitMessage = trimmed.substring(trimmed.indexOf('-m') + 2).trim().replace(/^["']|["']$/g, '') || commitMessage;
      }

      const newHash = generateHash();
      const committedFiles = [...stagedFiles];
      const newCommit = {
        hash: newHash,
        msg: commitMessage,
        branch: activeBranch,
        files: committedFiles
      };

      setLocalCommits(prev => [newCommit, ...prev]);
      setStagedFiles([]);

      addLogs([
        {
          type: 'success',
          text: `[${activeBranch} ${newHash}] ${commitMessage}\n ${committedFiles.length} fichier(s) modifié(s), ${committedFiles.length * 18} insertions(+)`
        },
        {
          type: 'info',
          text: `✓ Commit enregistré dans le Local Repository (.git). Prêt pour "git push origin ${activeBranch}".`
        }
      ]);
      return;
    }

    // GIT PUSH
    if (gitSubCmd === 'push') {
      const unpushed = localCommits.length - remoteCommits.length;
      if (unpushed <= 0) {
        addLog({ type: 'output', text: 'Everything up-to-date. Aucun commit local en attente de publication.' });
        return;
      }

      setRemoteCommits([...localCommits]);
      addLogs([
        { type: 'output', text: `Énumération des objets : ${unpushed * 3}, fait.` },
        { type: 'output', text: `Compression des objets : 100% (${unpushed * 3}/${unpushed * 3}), fait.` },
        { type: 'output', text: `Écriture des objets : 100% (${unpushed * 3}/${unpushed * 3}), fait.` },
        {
          type: 'success',
          text: `To https://gitlab.com/ofppt-fullstack/projet-master.git\n   ${remoteCommits[0]?.hash || 'a1b2c3d'}..${localCommits[0].hash}  ${activeBranch} -> ${activeBranch}`
        },
        {
          type: 'success',
          text: `✓ ${unpushed} commit(s) synchronisé(s) avec succès sur le Remote GitLab.`
        }
      ]);
      return;
    }

    // GIT BRANCH
    if (gitSubCmd === 'branch') {
      const branchArg = parts[2]?.trim();
      if (!branchArg) {
        addLog({
          type: 'output',
          text: branches.map(b => (b === activeBranch ? `* ${b}  (branche courante)` : `  ${b}`)).join('\n')
        });
        return;
      }

      if (branches.includes(branchArg)) {
        addLog({ type: 'error', text: `fatal: une branche nommée '${branchArg}' existe déjà.` });
      } else {
        setBranches(prev => [...prev, branchArg]);
        addLog({ type: 'success', text: `✓ Branche '${branchArg}' créée. Utilisez "git switch ${branchArg}" pour y basculer.` });
      }
      return;
    }

    // GIT SWITCH or GIT CHECKOUT
    if (gitSubCmd === 'switch' || gitSubCmd === 'checkout') {
      const hasCFlag = parts.includes('-c') || parts.includes('-b');
      let targetBranch = '';

      if (hasCFlag) {
        const flagIdx = parts.findIndex(p => p === '-c' || p === '-b');
        targetBranch = parts[flagIdx + 1];
        if (!targetBranch) {
          addLog({ type: 'error', text: 'fatal: nom de branche manquant après le flag -c ou -b.' });
          return;
        }

        if (branches.includes(targetBranch)) {
          addLog({ type: 'error', text: `fatal: une branche nommée '${targetBranch}' existe déjà.` });
          return;
        }

        setBranches(prev => [...prev, targetBranch]);
        setActiveBranch(targetBranch);
        setWorkingFiles(prev => [...prev, `src/features/${targetBranch.replace('/', '_')}.tsx`]);

        addLogs([
          { type: 'success', text: `Basculement sur la nouvelle branche '${targetBranch}'.` },
          { type: 'info', text: `Nouveau fichier de feature généré dans le Working Directory.` }
        ]);
        return;
      } else {
        targetBranch = parts[2];
        if (!targetBranch) {
          addLog({ type: 'error', text: 'fatal: vous devez spécifier la branche vers laquelle basculer.' });
          return;
        }

        if (!branches.includes(targetBranch)) {
          addLog({ type: 'error', text: `error: la branche '${targetBranch}' est introuvable. Créez-la avec "git switch -c ${targetBranch}".` });
          return;
        }

        if (targetBranch === activeBranch) {
          addLog({ type: 'output', text: `Déjà sur la branche '${activeBranch}'.` });
          return;
        }

        setActiveBranch(targetBranch);
        addLog({ type: 'success', text: `Basculement sur la branche '${targetBranch}'.` });
        return;
      }
    }

    // GIT MERGE
    if (gitSubCmd === 'merge') {
      const sourceBranch = parts[2];
      if (!sourceBranch) {
        addLog({ type: 'error', text: 'fatal: nom de branche manquant pour la fusion. Exemple: git merge feature/login' });
        return;
      }

      if (sourceBranch === activeBranch) {
        addLog({ type: 'output', text: 'Already up to date. Vous ne pouvez pas fusionner une branche sur elle-même.' });
        return;
      }

      if (!branches.includes(sourceBranch)) {
        addLog({ type: 'error', text: `merge: ${sourceBranch} - branche non trouvée.` });
        return;
      }

      const mergeHash = generateHash();
      const mergeCommit = {
        hash: mergeHash,
        msg: `Merge branch '${sourceBranch}' into ${activeBranch}`,
        branch: activeBranch,
        files: [`merged-from-${sourceBranch.replace('/', '-')}`]
      };

      setLocalCommits(prev => [mergeCommit, ...prev]);

      addLogs([
        { type: 'output', text: `Mise à jour Fast-forward...` },
        { type: 'success', text: `✓ Fusion réussie : la branche '${sourceBranch}' a été fusionnée dans '${activeBranch}'.` },
        { type: 'info', text: `Nouveau commit de fusion : [${mergeHash}] Merge branch '${sourceBranch}'.` }
      ]);
      return;
    }

    // GIT LOG
    if (gitSubCmd === 'log') {
      const logLines: TerminalEntry[] = [
        { type: 'info', text: `HISTORIQUE DES COMMITS (HEAD -> ${activeBranch}, origin/${activeBranch}) :` }
      ];

      localCommits.forEach((c, idx) => {
        const isHead = idx === 0 ? ` (HEAD -> ${activeBranch})` : '';
        const isRemote = remoteCommits.some(rc => rc.hash === c.hash) ? ' [origin]' : ' [unpushed]';
        logLines.push({
          type: idx === 0 ? 'success' : 'output',
          text: `* ${c.hash} - ${c.msg}${isHead}${isRemote}`
        });
      });

      addLogs(logLines);
      return;
    }

    // GIT DIFF
    if (gitSubCmd === 'diff') {
      if (workingFiles.length === 0) {
        addLog({ type: 'output', text: 'Aucune différence dans le répertoire de travail.' });
        return;
      }

      addLogs([
        { type: 'info', text: `diff --git a/src/components/Auth.tsx b/src/components/Auth.tsx` },
        { type: 'error', text: `- const API_URL = "http://localhost:3000";` },
        { type: 'success', text: `+ const API_URL = "https://api.production-ofppt.ma/v1";` },
        { type: 'success', text: `+ export async function verifyToken(jwt: string) { return true; }` }
      ]);
      return;
    }

    // GIT RESET / RESTORE
    if (gitSubCmd === 'reset' || gitSubCmd === 'restore') {
      if (stagedFiles.length === 0) {
        addLog({ type: 'output', text: 'Aucun fichier dans la Staging Area à désindexer.' });
        return;
      }

      setWorkingFiles(prev => [...new Set([...prev, ...stagedFiles])]);
      setStagedFiles([]);
      addLog({
        type: 'info',
        text: '✓ Modifications retirées de la zone de staging (remises dans le Working Directory).'
      });
      return;
    }

    addLog({
      type: 'error',
      text: `git: '${gitSubCmd}' n'est pas une commande reconnue par ce simulateur. Tapez "help" pour la liste.`
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(commandInput);
      setCommandInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setCommandInput(commandHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandHistory.length) {
        setHistoryIndex(-1);
        setCommandInput('');
      } else {
        setHistoryIndex(nextIdx);
        setCommandInput(commandHistory[nextIdx]);
      }
    }
  };

  const handleReset = () => {
    setWorkingFiles(['src/components/Auth.tsx', 'src/services/api.ts']);
    setStagedFiles([]);
    setLocalCommits([
      { hash: 'c1a2f3e', msg: 'Initial commit: setup structure OFPPT', branch: 'main', files: ['package.json', 'README.md'] }
    ]);
    setRemoteCommits([
      { hash: 'c1a2f3e', msg: 'Initial commit: setup structure OFPPT', branch: 'main', files: ['package.json', 'README.md'] }
    ]);
    setBranches(['main', 'feature/login']);
    setActiveBranch('main');
    setLogs([
      { type: 'info', text: 'Dépôt Git réinitialisé à l\'état initial.' },
      { type: 'cmd', text: 'git status' },
      { type: 'output', text: 'Sur la branche main. Copie de travail réinitialisée avec 2 fichiers modifiés.' }
    ]);
  };

  const quickActions = [
    { label: '$ git status', cmd: 'git status' },
    { label: '$ git add .', cmd: 'git add .' },
    { label: '$ git commit -m "feat: login"', cmd: 'git commit -m "feat: auth stagiaire ofppt"' },
    { label: `$ git push origin ${activeBranch}`, cmd: `git push origin ${activeBranch}` },
    { label: '$ git switch -c feature/pay', cmd: 'git switch -c feature/paiement-ligne' },
    { label: '$ git log --oneline', cmd: 'git log --oneline' },
    { label: '$ touch src/utils.ts', cmd: 'touch src/utils.ts' },
    { label: '$ clear', cmd: 'clear' }
  ];

  return (
    <Card className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] backdrop-blur-xl shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

      <CardHeader className="relative z-10 border-b border-black/10 dark:border-white/10 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="warning" size="sm" className="bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                Laboratoire 04 · Pratique Interactive
              </Badge>
              <Badge variant="outline" size="sm" className="border-black/10 dark:border-white/15 text-black dark:text-white">
                Git CLI & 4 Zones
              </Badge>
            </div>
            <CardTitle className="text-xl sm:text-2xl mt-1 text-black dark:text-white font-black flex items-center gap-2">
              <span>Terminal Git & Visualiseur des 4 Zones</span>
            </CardTitle>
            <CardDescription className="text-black/60 dark:text-white/60 text-xs sm:text-sm">
              Saisis directement tes commandes Git dans la console interactive ci-dessous. Observe en temps réel les fichiers et commits naviguer entre les 4 zones fondamentales.
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-black dark:text-white flex items-center gap-1.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-xl shadow-sm">
              <GitBranch className="h-3.5 w-3.5 text-[#10B981]" />
              Branche : <b className="text-[#10B981]">{activeBranch}</b>
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="gap-1.5 border-black/10 dark:border-white/15 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Réinitialiser</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 pt-6 space-y-6">
        {/* Visual 4-Zone Board */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-black/50 dark:text-white/50">
              Flux Visuel des 4 Zones Git
            </span>
            <span className="text-[11px] text-black/40 dark:text-white/40 font-mono">
              Working Dir ➔ Staging ➔ Local Repo ➔ Remote GitLab
            </span>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Zone 1 : Working Directory */}
            <div className="rounded-2xl border border-[#22C55E]/40 bg-[#22C55E]/10 p-4 shadow-sm transition-all">
              <div className="flex items-center justify-between pb-2 border-b border-[#22C55E]/20 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
                  <span className="text-xs font-bold text-[#22C55E]">1. Working Directory</span>
                </div>
                <span className="rounded-md bg-[#22C55E]/20 border border-[#22C55E]/40 px-2 py-0.5 text-[10px] font-bold text-[#22C55E] font-mono">
                  {workingFiles.length}
                </span>
              </div>
              <div className="min-h-[120px] space-y-2">
                {workingFiles.length === 0 ? (
                  <div className="text-xs text-black/40 dark:text-white/40 italic py-8 text-center">
                    ✓ Répertoire propre
                  </div>
                ) : (
                  workingFiles.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#22C55E]/30 p-2 text-xs font-mono text-black dark:text-white shadow-xs"
                    >
                      <FileCode2 className="h-3.5 w-3.5 text-[#22C55E] shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-3 pt-2 border-t border-[#22C55E]/15 flex items-center justify-between text-[10px] text-[#22C55E] font-mono">
                <span>Modifications locales</span>
                <span className="text-black/50 dark:text-white/50">git add</span>
              </div>
            </div>

            {/* Zone 2 : Staging Area */}
            <div className="rounded-2xl border border-[#10B981]/40 bg-[#10B981]/10 p-4 shadow-sm transition-all">
              <div className="flex items-center justify-between pb-2 border-b border-[#10B981]/20 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                  <span className="text-xs font-bold text-[#10B981]">2. Staging Area (Index)</span>
                </div>
                <span className="rounded-md bg-[#10B981]/20 border border-[#10B981]/40 px-2 py-0.5 text-[10px] font-bold text-[#10B981] font-mono">
                  {stagedFiles.length}
                </span>
              </div>
              <div className="min-h-[120px] space-y-2">
                {stagedFiles.length === 0 ? (
                  <div className="text-xs text-black/40 dark:text-white/40 italic py-8 text-center">
                    Index vide (utilise git add)
                  </div>
                ) : (
                  stagedFiles.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#10B981]/30 p-2 text-xs font-mono text-black dark:text-white shadow-xs"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-3 pt-2 border-t border-[#10B981]/15 flex items-center justify-between text-[10px] text-[#10B981] font-mono">
                <span>Prêt pour validation</span>
                <span className="text-black/50 dark:text-white/50">git commit</span>
              </div>
            </div>

            {/* Zone 3 : Local Repository */}
            <div className="rounded-2xl border border-[#22C55E]/40 bg-[#22C55E]/10 p-4 shadow-sm transition-all">
              <div className="flex items-center justify-between pb-2 border-b border-[#22C55E]/20 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
                  <span className="text-xs font-bold text-[#22C55E]">3. Local Repository</span>
                </div>
                <span className="rounded-md bg-[#22C55E]/20 border border-[#22C55E]/40 px-2 py-0.5 text-[10px] font-bold text-[#22C55E] font-mono">
                  {localCommits.length}
                </span>
              </div>
              <div className="min-h-[120px] space-y-2">
                {localCommits.slice(0, 3).map((c, i) => {
                  const isUnpushed = !remoteCommits.some(rc => rc.hash === c.hash);
                  return (
                    <div
                      key={i}
                      className={`flex items-start gap-2 rounded-lg border p-2 text-xs font-mono transition-all ${
                        isUnpushed
                          ? 'bg-white dark:bg-[#0A0A0A] border-[#22C55E] text-black dark:text-white'
                          : 'bg-white dark:bg-[#0A0A0A] border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 shadow-xs'
                      }`}
                    >
                      <GitCommit className="h-3.5 w-3.5 text-[#22C55E] shrink-0 mt-0.5" />
                      <div className="truncate">
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-[#22C55E]">{c.hash}</span>
                          {isUnpushed && (
                            <span className="text-[9px] bg-[#22C55E]/20 text-[#22C55E] px-1 rounded font-sans font-medium">
                              en attente
                            </span>
                          )}
                        </div>
                        <span className="truncate block text-[11px] text-black/70 dark:text-white/70">{c.msg}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 pt-2 border-t border-[#22C55E]/15 flex items-center justify-between text-[10px] text-[#22C55E] font-mono">
                <span>Base .git locale</span>
                <span className="text-black/50 dark:text-white/50">git push</span>
              </div>
            </div>

            {/* Zone 4 : Remote Repository */}
            <div className="rounded-2xl border border-[#10B981]/40 bg-[#10B981]/10 p-4 shadow-sm transition-all">
              <div className="flex items-center justify-between pb-2 border-b border-[#10B981]/20 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                  <span className="text-xs font-bold text-[#10B981]">4. Remote (GitLab)</span>
                </div>
                <span className="rounded-md bg-[#10B981]/20 border border-[#10B981]/40 px-2 py-0.5 text-[10px] font-bold text-[#10B981] font-mono">
                  {remoteCommits.length}
                </span>
              </div>
              <div className="min-h-[120px] space-y-2">
                {remoteCommits.slice(0, 3).map((c, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#10B981]/30 p-2 text-xs font-mono text-black dark:text-white shadow-xs"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                    <div className="truncate">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-[#10B981]">{c.hash}</span>
                        <span className="text-[9px] text-[#10B981] font-sans font-medium">✓ origin/{c.branch}</span>
                      </div>
                      <span className="truncate block text-[11px] text-black/70 dark:text-white/70">{c.msg}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2 border-t border-[#10B981]/15 flex items-center justify-between text-[10px] text-[#10B981] font-mono">
                <span>Dépôt distant synchronisé</span>
                <span className="text-black/50 dark:text-white/50">origin/main</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Suggested Commands Chips */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-black/50 dark:text-white/50">
              Suggestions de Commandes Rapides (Clique ou Tape au clavier) :
            </span>
            <button
              onClick={() => executeCommand('help')}
              className="text-[11px] font-semibold text-[#10B981] hover:underline flex items-center gap-1"
            >
              <HelpCircle className="h-3 w-3" />
              <span>Aide CLI (help)</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => {
                  setCommandInput(action.cmd);
                  executeCommand(action.cmd);
                }}
                className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:border-[#10B981] px-3 py-1.5 text-xs font-mono text-black dark:text-white transition-all shadow-xs active:scale-95"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Real Interactive Terminal Console */}
        <div className="rounded-2xl border border-black/10 dark:border-white/15 bg-[#0A0A0A] shadow-2xl overflow-hidden">
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-black/80 border-b border-white/10 text-xs font-mono text-white/60">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#22C55E] inline-block" />
              <span className="h-3 w-3 rounded-full bg-white/60 inline-block" />
              <span className="h-3 w-3 rounded-full bg-[#10B981] inline-block" />
              <span className="ml-2 font-bold text-white flex items-center gap-1.5">
                <TerminalIcon className="h-3.5 w-3.5 text-[#10B981]" />
                bash — stagiaire@ofppt: ~/mon-projet-git ({activeBranch})
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/40 hidden sm:inline">
                ↑/↓ pour l'historique · Entrée pour exécuter
              </span>
              <button
                onClick={() => setLogs([])}
                className="text-white/60 hover:text-white transition-colors"
                title="Effacer le terminal (clear)"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Output Log Area */}
          <div
            className="p-4 space-y-2 max-h-72 overflow-y-auto font-mono text-xs leading-relaxed select-text text-white"
            onClick={() => inputRef.current?.focus()}
          >
            {logs.map((log, i) => {
              if (log.type === 'cmd') {
                return (
                  <div key={i} className="text-[#10B981] font-bold flex items-start gap-1 pt-1">
                    <span>{log.text}</span>
                  </div>
                );
              }
              if (log.type === 'success') {
                return (
                  <div key={i} className="text-[#10B981] whitespace-pre-wrap pl-2 border-l-2 border-[#10B981]">
                    {log.text}
                  </div>
                );
              }
              if (log.type === 'error') {
                return (
                  <div key={i} className="text-[#22C55E] whitespace-pre-wrap pl-2 border-l-2 border-[#22C55E]">
                    {log.text}
                  </div>
                );
              }
              if (log.type === 'info') {
                return (
                  <div key={i} className="text-white/80 whitespace-pre-wrap">
                    {log.text}
                  </div>
                );
              }
              return (
                <div key={i} className="text-white/60 whitespace-pre-wrap">
                  {log.text}
                </div>
              );
            })}
            <div ref={terminalEndRef} />
          </div>

          {/* Interactive Command Input Line */}
          <div className="flex items-center gap-2 px-4 py-3 bg-black border-t border-white/10">
            <span className="font-mono text-xs font-bold text-[#10B981] shrink-0 flex items-center gap-1">
              <span>stagiaire@ofppt:~$</span>
            </span>
            <input
              ref={inputRef}
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Écris ta commande ici... (ex: git add ., git commit -m 'feat', git status)"
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder:text-white/30 caret-[#10B981]"
              autoFocus
            />
            <button
              onClick={() => {
                executeCommand(commandInput);
                setCommandInput('');
              }}
              disabled={!commandInput.trim()}
              className="rounded-lg bg-[#10B981]/20 hover:bg-[#10B981]/40 disabled:opacity-30 border border-[#10B981]/40 text-[#10B981] p-1.5 transition-all shrink-0"
              title="Exécuter la commande (Entrée)"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Pedagogical OFPPT Tip Banner */}
        <div className="rounded-2xl border border-[#10B981]/30 bg-[#10B981]/10 p-4 flex items-start gap-3 text-xs text-black dark:text-white">
          <Sparkles className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
          <div>
            <b className="text-black dark:text-white font-bold">Rappel officiel pour l'examen OFPPT :</b>
            <p className="mt-0.5 text-black/70 dark:text-white/70 leading-relaxed">
              La commande <code className="text-[#10B981] bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded font-mono">git add</code> fait passer les fichiers du <b>Working Directory</b> à la <b>Staging Area</b> (Index). La commande <code className="text-[#10B981] bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded font-mono">git commit</code> crée l'instantané dans le <b>Local Repository</b>. Enfin, <code className="text-[#10B981] bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded font-mono">git push</code> synchronise avec le serveur distant (GitLab / GitHub).
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
