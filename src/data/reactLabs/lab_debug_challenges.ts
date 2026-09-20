import { LabExercise } from '../../types/reactLabTypes';

export const LAB_DEBUG_CHALLENGE: LabExercise = {
  id: 'lab-debug-challenge',
  moduleId: 'module3',
  moduleLabel: 'Défi Débogage Examen',
  chapterTitle: 'Diagnostic & Résolution de Bugs Classiques OFPPT',
  title: 'Atelier Débogage : Réparer la Mutation Directe d\'État',
  subtitle: 'Diagnostiquez le bug de référence mémoire qui empêche React de redessiner l\'interface.',
  difficulty: 'challenge',
  concepts: ['Débogage', 'Immutabilité', 'Comparaison par Référence', 'Re-render'],
  taskInstructions: [
    'Ouvrez "src/App.jsx".',
    'Observez le bouton "+1 Point" : au clic, le score dans l\'objet ne provoque AUCUN re-render de l\'écran !',
    'Inspectez la fonction `ajouterPoint` : identifiez la mutation directe `user.score = user.score + 1; setUser(user);`.',
    'Corrigez le bug en fournissant une nouvelle référence mémoire avec le spread operator : `setUser({ ...user, score: user.score + 1 });`.',
    'Exécutez et vérifiez que le score s\'actualise immédiatement à l\'écran.'
  ],
  conceptReminder: {
    title: 'Le Piège N°1 aux Examens : La Mutation Directe',
    explanation: 'React compare l\'ancien et le nouvel état par référence mémoire (Object.is). Si vous modifiez une propriété d\'un objet existant sans cloner l\'objet, l\'adresse mémoire reste strictement identique. React conclut donc que l\'état n\'a pas changé et ANNULE le re-render !',
    diagramText: 'user.score = 11 ──► Même référence mémoire ──► React: "Rien n\'a changé" ──► Pas de Re-render !\n{ ...user, score: 11 } ──► NOUVELLE référence mémoire ──► React détecte le changement ──► Re-render immédiat !',
    keyRule: 'Règle d\'or : En React, on ne modifie jamais un état existant. On en crée TOUJOURS une NOUVELLE copie avec le spread operator {...}.'
  },
  entryFile: 'src/App.jsx',
  files: [
    {
      name: 'App.jsx',
      path: 'src/App.jsx',
      content: `import React, { useState } from 'react';

export default function App() {
  const [stagiaire, setStagiaire] = useState({ nom: 'Amine', score: 10 });

  // ❌ CODE BUGGÉ CI-DESSOUS À CORRIGER :
  const ajouterPoint = () => {
    // Problème : Mutation directe de l'objet
    // stagiaire.score = stagiaire.score + 1;
    // setStagiaire(stagiaire);

    // ✅ SOLUTION ATTENDUE :
    setStagiaire({
      ...stagiaire,
      score: stagiaire.score + 1
    });
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h2 style={{ color: '#0F172A', fontSize: '20px' }}>Défi Débogage : Compteur de Score</h2>
      
      <div style={{
        padding: '20px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        margin: '16px auto',
        maxWidth: '300px',
        border: '1px solid #cbd5e1'
      }}>
        <p><strong>Nom :</strong> {stagiaire.nom}</p>
        <p style={{ fontSize: '28px', color: '#10B981', fontWeight: 'bold', margin: '8px 0' }}>
          Score : {stagiaire.score}
        </p>
      </div>

      <button
        onClick={ajouterPoint}
        style={{
          padding: '10px 20px',
          backgroundColor: '#10B981',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        + 1 Point (Tester le Re-render)
      </button>
    </div>
  );
}`
    }
  ],
  tests: [
    {
      id: 'test-clone-state',
      title: 'Clonage immuable avec spread operator',
      description: 'La mise à jour doit créer une nouvelle référence d\'objet avec { ...stagiaire }.',
      check: (code) => /setStagiaire\s*\(\s*\{\s*\.\.\.stagiaire/.test(code) || /setStagiaire\s*\(\s*prev\s*=>\s*\{\s*\.\.\.prev/.test(code)
    },
    {
      id: 'test-no-direct-mutation',
      title: 'Suppression de la mutation directe',
      description: 'L\'assignation directe stagiaire.score = ne doit plus être exécutée.',
      check: (code) => !/stagiaire\.score\s*=\s*stagiaire\.score\s*\+\s*1;?\s*setStagiaire\(stagiaire\)/.test(code)
    }
  ],
  hints: [
    {
      level: 1,
      title: 'Comprendre l\'erreur',
      content: 'Regardez l\'adresse mémoire : setStagiaire(stagiaire) transmet le même pointeur d\'objet. React pense qu\'aucun changement n\'a eu lieu.'
    },
    {
      level: 2,
      title: 'Créer un nouvel objet',
      content: 'Entourez vos accolades : { ...stagiaire, score: stagiaire.score + 1 }.'
    },
    {
      level: 3,
      title: 'Formulation complète',
      content: 'setStagiaire({ ...stagiaire, score: stagiaire.score + 1 });'
    }
  ],
  solution: {
    explanation: 'En créant un nouvel objet avec {...stagiaire}, React détecte une référence mémoire différente et déclenche immédiatement la mise à jour du DOM virtuel.',
    files: [
      {
        path: 'src/App.jsx',
        content: `import React, { useState } from 'react';

export default function App() {
  const [stagiaire, setStagiaire] = useState({ nom: 'Amine', score: 10 });

  const ajouterPoint = () => {
    setStagiaire({
      ...stagiaire,
      score: stagiaire.score + 1
    });
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h2>Score : {stagiaire.score}</h2>
      <button onClick={ajouterPoint}>+ 1 Point</button>
    </div>
  );
}`
      }
    ]
  },
  microQcm: {
    question: 'Pourquoi React ne redessine-t-il pas le composant après stagiaire.score = 11 ; setStagiaire(stagiaire) ?',
    options: [
      'Parce que React effectue une comparaison superficielle par référence (Object.is) : comme l\'adresse mémoire de l\'objet n\'a pas changé, React ignore la mise à jour.',
      'Parce que le navigateur n\'a pas assez de mémoire vive.',
      'Parce que le nom stagiaire doit obligatoirement commencer par une majuscule.',
      'Parce que useState ne supporte pas les objets.'
    ],
    correctIndex: 0,
    explanation: 'La comparaison par référence est une optimisation clé de React : elle évite de comparer récursivement toutes les propriétés en profondeur.'
  }
};
