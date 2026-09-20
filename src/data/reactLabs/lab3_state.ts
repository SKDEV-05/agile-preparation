import { LabExercise } from '../../types/reactLabTypes';

export const LAB_3_STATE: LabExercise = {
  id: 'lab-3-state',
  moduleId: 'module4',
  moduleLabel: 'Module 4 : Composants & State',
  chapterTitle: 'Gestion d\'État Local avec useState & Fonction Updater',
  title: 'Atelier 3 : Compteur Réactif & Mises à Jour Atomiques',
  subtitle: 'Déclarez et mettez à jour un état avec la fonction updater prev => prev + 1.',
  difficulty: 'practice',
  concepts: ['useState', 'Updater Function', 'Re-render', 'Immutabilité'],
  taskInstructions: [
    'Ouvrez "src/App.jsx".',
    'Déclarez un état local `compteur` initialisé à 0 avec `useState(0)`.',
    'Créez deux boutons : "+1" (incrémentation) et "-1" (décrémentation sécurisée avec minimum 0).',
    'Utilisez impérativement la fonction de mise à jour fonctionnelle `prev => prev + 1` pour éviter les race conditions de batching.',
    'Testez le bouton Reset pour réinitialiser le compteur à 0.'
  ],
  conceptReminder: {
    title: 'Fonction Updater vs Mise à Jour Directe',
    explanation: 'React regroupe (batch) les mises à jour d\'état pour des raisons de performance. Si vous écrivez setCount(count + 1) plusieurs fois de suite, count fait référence à l\'ancienne valeur capturée dans la fermeture. En écrivant setCount(prev => prev + 1), vous garantissez que React applique le calcul sur la valeur la plus récente.',
    diagramText: 'Action Utilisateur ──► setCount(prev => prev + 1) ──► File d\'attente React ──► Nouveau Rendu (Re-render)',
    keyRule: 'Dès qu\'un état dépend de sa valeur précédente, utilisez TOUJOURS la forme fonctionnelle : setState(prev => ...).'
  },
  entryFile: 'src/App.jsx',
  files: [
    {
      name: 'App.jsx',
      path: 'src/App.jsx',
      content: `import React, { useState } from 'react';

export default function App() {
  // TODO 1 : Déclarez un état 'compteur' initialisé à 0 avec useState(0)
  

  // TODO 2 : Écrivez la fonction incrementer avec la syntaxe updater fonctionnelle : prev => prev + 1
  

  // TODO 3 : Écrivez la fonction decrementer (minimum 0 : Math.max(0, prev - 1))
  

  // TODO 4 : Écrivez la fonction reinitialiser pour remettre le compteur à 0
  

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h2 style={{ color: '#0F172A', fontSize: '20px' }}>Compteur avec Updater Function</h2>
      
      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#10B981',
        margin: '20px 0'
      }}>
        {/* Affichez la valeur du compteur */}
        0
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
        {/* Liez vos gestionnaires de clics onClick */}
        <button
          style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', cursor: 'pointer' }}
        >
          - 1
        </button>

        <button
          style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: '#10B981', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
          + 1
        </button>

        <button
          style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', cursor: 'pointer' }}
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
}`
    }
  ],
  tests: [
    {
      id: 'test-use-state',
      title: 'Déclaration useState',
      description: 'useState doit être importé et initialisé à 0.',
      check: (code) => /useState\(\s*0\s*\)/.test(code)
    },
    {
      id: 'test-updater',
      title: 'Utilisation de l\'updater fonctionnel',
      description: 'L\'incrémentation doit utiliser la syntaxe prev => prev + 1.',
      check: (code) => /prev\s*=>\s*prev\s*\+\s*1/.test(code) || /\(prev\)\s*=>/.test(code)
    },
    {
      id: 'test-reset',
      title: 'Bouton de réinitialisation',
      description: 'Une fonction doit remettre le compteur à 0.',
      check: (code) => /set(?:Compteur|State|Count|[A-Za-z0-9_$]+)\s*\(\s*0\s*\)/.test(code)
    }
  ],
  hints: [
    {
      level: 1,
      title: 'Déclaration de base',
      content: 'const [compteur, setCompteur] = useState(0);'
    },
    {
      level: 2,
      title: 'Fonction updater',
      content: 'setCompteur(prev => prev + 1); garantit la prise en compte de la valeur la plus fraîche.'
    },
    {
      level: 3,
      title: 'Borne minimum',
      content: 'Pour bloquer à 0, utilisez Math.max(0, prev - 1).'
    }
  ],
  solution: {
    explanation: 'La fonction updater est la recommandation officielle d\'OFPPT pour les examens pour garantir l\'absence de désynchronisation lors de clics rapides.',
    files: [
      {
        path: 'src/App.jsx',
        content: `import React, { useState } from 'react';

export default function App() {
  const [compteur, setCompteur] = useState(0);

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>{compteur}</h1>
      <button onClick={() => setCompteur(prev => Math.max(0, prev - 1))}>- 1</button>
      <button onClick={() => setCompteur(prev => prev + 1)}>+ 1</button>
      <button onClick={() => setCompteur(0)}>Reset</button>
    </div>
  );
}`
      }
    ]
  },
  microQcm: {
    question: 'Pourquoi écrire setCount(prev => prev + 1) est-il plus sûr que setCount(count + 1) ?',
    options: [
      'Parce que prev est stocké dans le cloud.',
      'Parce que si plusieurs appels setCount sont regroupés dans le même cycle (batching), prev garantit de calculer sur l\'état le plus récent.',
      'Parce que count + 1 est une syntaxe interdite par Babel.',
      'Il n\'y a aucune différence technique.'
    ],
    correctIndex: 1,
    explanation: 'En React 18, le batching automatique regroupe les mises à jour. Utiliser la fonction updater garantit de recevoir l\'état pending le plus récent.'
  }
};
