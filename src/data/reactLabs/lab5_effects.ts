import { LabExercise } from '../../types/reactLabTypes';

export const LAB_5_EFFECTS: LabExercise = {
  id: 'lab-5-effects',
  moduleId: 'module5',
  moduleLabel: 'Module 5 : Styles & Cycle de Vie',
  chapterTitle: 'Cycle de Vie, useEffect & Appels Asynchrones REST',
  title: 'Atelier 5 : Chargement API Asynchrone avec useEffect',
  subtitle: 'Gérez le cycle de vie du composant au montage et le nettoyage avec useEffect.',
  difficulty: 'challenge',
  concepts: ['useEffect', 'Montage []', 'Nettoyage return () =>', 'Fetch API', 'États Loading/Error'],
  taskInstructions: [
    'Ouvrez "src/App.jsx".',
    'Déclarez les 3 états fondamentaux d\'un appel asynchrone : `donnees` (tableau), `chargement` (booléen), et `erreur` (string ou null).',
    'Utilisez le hook `useEffect` avec un tableau de dépendances vide `[]` pour exécuter la requête au montage uniquement.',
    'Effectuez l\'appel avec `fetch("https://api.ofppt.ma/v1/stagiaires")`, convertissez en `.json()` et stockez le résultat.',
    'Gérez le cas d\'attente en affichant "Chargement des données en cours..." lorsque `chargement` est vrai.'
  ],
  conceptReminder: {
    title: 'Les 3 Variantes du Tableau de Dépendances de useEffect',
    explanation: '1. Sans tableau : s\'exécute après chaque rendu (danger de boucle infinie).\n2. Tableau vide [] : s\'exécute UNE SEULE FOIS lors du montage du composant (équivalent componentDidMount).\n3. Avec dépendances [id] : s\'exécute au montage ET chaque fois que la valeur de "id" change.',
    diagramText: 'Montage DOM ──► Rendu Initial (chargement=true) ──► useEffect([]) ──► fetch API ──► setData() ──► Re-render',
    keyRule: 'Pour les appels HTTP au montage, le tableau de dépendances vide [] est strictement obligatoire pour éviter les boucles infinies de requêtes.'
  },
  entryFile: 'src/App.jsx',
  files: [
    {
      name: 'App.jsx',
      path: 'src/App.jsx',
      content: `import React, { useState, useEffect } from 'react';

export default function App() {
  // TODO 1 : Déclarez les états : stagiaires ([]), chargement (true), erreur (null)
  

  useEffect(() => {
    // TODO 2 : Récupérez les données avec fetch('https://api.ofppt.ma/v1/stagiaires')
    // - Enregistrez les données dans l'état avec setStagiaires(data)
    // - Désactivez le chargement avec setChargement(false)
    // - Capturez les erreurs avec .catch()
    
  }, []); // TODO 3 : Vérifiez bien la présence du tableau de dépendances vide []

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#0F172A', fontSize: '20px' }}>Liste des Stagiaires Chargés</h2>
      
      {/* TODO 4 : Affichez les états de chargement ou la liste des stagiaires */}
      <div style={{ display: 'grid', gap: '8px', marginTop: '12px' }}>
        
      </div>
    </div>
  );
}`
    }
  ],
  tests: [
    {
      id: 'test-use-effect',
      title: 'Hook useEffect avec dépendances vides []',
      description: 'useEffect doit être appelé avec [] pour s\'exécuter uniquement au montage.',
      check: (code) => /useEffect\s*\([^,]+,\s*\[\s*\]\s*\)/.test(code)
    },
    {
      id: 'test-fetch-api',
      title: 'Appel asynchrone fetch',
      description: 'Le code doit utiliser fetch(...) et traiter la réponse en JSON.',
      check: (code) => /fetch\s*\(/.test(code) && /\.json\(\)/.test(code)
    },
    {
      id: 'test-loading-state',
      title: 'Gestion de l\'état de chargement',
      description: 'Un état de chargement doit afficher un message d\'attente.',
      check: (code) => /chargement/.test(code) || /loading/.test(code)
    }
  ],
  hints: [
    {
      level: 1,
      title: 'Structure de useEffect',
      content: 'useEffect(() => { /* appel */ }, []); Le deuxième argument [] est crucial.'
    },
    {
      level: 2,
      title: 'Chaînage fetch',
      content: 'fetch(url).then(res => res.json()).then(data => setStagiaires(data));'
    },
    {
      level: 3,
      title: 'Gestion du démontage',
      content: 'Pour le nettoyage, retournez une fonction dans useEffect : return () => { ... };'
    }
  ],
  solution: {
    explanation: 'Le hook useEffect avec un tableau de dépendances vide [] isole les effets secondaires (appels réseau, timers) pour les déclencher une seule fois sans surcharger le cycle de rendu.',
    files: [
      {
        path: 'src/App.jsx',
        content: `import React, { useState, useEffect } from 'react';

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.ofppt.ma/v1/stagiaires')
      .then(res => res.json())
      .then(resData => setData(resData));
  }, []);

  return (
    <div>
      {data.map(item => <div key={item.id}>{item.nom}</div>)}
    </div>
  );
}`
      }
    ]
  },
  microQcm: {
    question: 'Que se passe-t-il si vous oubliez le tableau de dépendances [] lors d\'un appel setState dans useEffect ?',
    options: [
      'Le composant plante immédiatement avec une erreur CSS.',
      'Une boucle infinie de rendus se produit : setState déclenche un nouveau rendu, qui déclenche useEffect, qui rappelle setState.',
      'Le navigateur sauvegarde automatiquement la page dans le cache du disque.',
      'Rien, React détecte automatiquement les requêtes en double.'
    ],
    correctIndex: 1,
    explanation: 'Sans deuxième paramètre, useEffect s\'exécute après chaque rendu. Comme setState déclenche un rendu, cela crée une boucle infinie critique.'
  }
};
