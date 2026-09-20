import React, { useState } from 'react';
import { Database, Copy, Check, Globe } from 'lucide-react';
import { LabExercise, LabFile, LabResourceItem } from '../../types/reactLabTypes';

interface LabResourcesProps {
  exercise: LabExercise;
  files: LabFile[];
}

export function LabResources({ exercise, files }: LabResourcesProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Compile resources from exercise.resources or extract from data files
  const resources: LabResourceItem[] = [];

  if (exercise.resources && exercise.resources.length > 0) {
    resources.push(...exercise.resources);
  }

  // Also auto-extract data files from project files
  for (const file of files) {
    if (file.path.includes('data/') || file.name.endsWith('.json') || file.name === 'stagiaire.js' || file.name === 'stagiaires.js') {
      if (!resources.some(r => r.title === file.name)) {
        resources.push({
          id: `file-${file.name}`,
          title: `Fichier de données : ${file.name}`,
          type: file.content.includes('[') ? 'array' : 'object',
          description: `Données prêtes à l'emploi définies dans ${file.path}`,
          content: file.content
        });
      }
    }
  }

  // If no explicit resources, provide default educational resource reference for the module
  if (resources.length === 0) {
    resources.push({
      id: 'default-resource',
      title: 'Structure de Données Pédagogiques',
      type: 'array',
      description: 'Données simulées disponibles pour cet atelier',
      content: `// Tableau de données d'exemple\nconst data = [\n  { id: 1, nom: "Sara Bennani", note: 16 },\n  { id: 2, nom: "Karim Alami", note: 14 }\n];`
    });
  }

  const getTypeBadge = (type: LabResourceItem['type']) => {
    switch (type) {
      case 'array':
        return <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold">Tableau (Array)</span>;
      case 'object':
        return <span className="text-[10px] px-2 py-0.5 rounded bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 font-bold">Objet (JSON)</span>;
      case 'api':
        return <span className="text-[10px] px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 text-slate-800 dark:text-white border border-slate-300 dark:border-white/20 font-bold">API Simulée</span>;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#141414] text-slate-800 dark:text-white overflow-y-auto p-4 space-y-4 text-xs font-mono select-none transition-colors">
      {/* Educational Notice Banner */}
      <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-xs">
          <Database className="h-4 w-4 text-[#10B981]" />
          <span>Ressources Pédagogiques React</span>
        </div>
        <p className="text-[11px] text-slate-600 dark:text-white/70 font-sans leading-relaxed">
          Retrouvez ici les <strong>tableaux, objets JSON et endpoints d'API</strong> mis à votre disposition.
          Le code des composants est vide : c'est à vous de programmer et de vous entraîner !
        </p>
      </div>

      {/* List of Resource Cards */}
      <div className="space-y-3">
        {resources.map((item) => (
          <div key={item.id} className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#181818] overflow-hidden transition-colors">
            {/* Resource Card Header */}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-100/75 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 dark:text-white text-xs">{item.title}</span>
                {getTypeBadge(item.type)}
              </div>

              <button
                onClick={() => handleCopy(item.id, item.content)}
                title="Copier cette ressource"
                className="flex items-center gap-1 px-2 py-1 rounded text-[11px] text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-transparent transition-colors cursor-pointer"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="h-3 w-3 text-[#10B981]" />
                    <span className="text-[#10B981]">Copié</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copier</span>
                  </>
                )}
              </button>
            </div>

            {/* Description */}
            {item.description && (
              <p className="px-3 pt-2 text-[11px] text-slate-500 dark:text-white/50 font-sans">
                {item.description}
              </p>
            )}

            {/* Code / Data Block */}
            <div className="p-2.5">
              <pre className="p-2.5 rounded-lg bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/5 text-[11px] text-[#10B981] font-mono leading-relaxed overflow-x-auto whitespace-pre select-text">
                {item.content}
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* Mock API Endpoints Info if applicable */}
      <div className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#181818] space-y-2">
        <div className="flex items-center gap-2 font-bold text-xs text-slate-800 dark:text-white">
          <Globe className="h-3.5 w-3.5 text-[#10B981]" />
          <span>Endpoint API Simulé dans le Bac à Sable</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-white/50 font-sans leading-relaxed">
          Les requêtes <code>fetch('https://api.ofppt.ma/v1/stagiaires')</code> sont interceptées localement et renvoient instantanément la liste des stagiaires OFPPT au format JSON.
        </p>
      </div>
    </div>
  );
}
