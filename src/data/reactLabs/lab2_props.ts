import { LabExercise } from '../../types/reactLabTypes';

export const LAB_2_PROPS: LabExercise = {
  id: 'lab-2-props',
  moduleId: 'module4',
  moduleLabel: 'Module 4 : Composants & State',
  chapterTitle: 'Composition de Composants & Transmission de Props',
  title: 'Atelier 2 : Flux Unidirectionnel & Props Réutilisables',
  subtitle: 'Créez un composant enfant modulaire et transmettez des données et callbacks depuis le parent.',
  difficulty: 'practice',
  concepts: ['Composants', 'Props', 'Flux Unidirectionnel', 'Callbacks'],
  taskInstructions: [
    'Ouvrez "src/components/CarteStagiaire.jsx".',
    'Déstructurez les props `{ nom, filiere, note, onSelectionner }` dans la signature du composant.',
    'Dans "src/App.jsx", appelez `<CarteStagiaire />` en lui transmettant le stagiaire et la fonction de clic.',
    'Testez le composant et vérifiez que le clic met à jour le stagiaire sélectionné.'
  ],
  conceptReminder: {
    title: 'Transmission de Données Top-Down (Parent ➔ Enfant)',
    explanation: 'En React, les données circulent dans un seul sens : de haut en bas via les props. Les props sont immuables (lecture seule pour le composant enfant). Pour faire remonter une information, le parent transmet une fonction de rappel (callback).',
    diagramText: 'App (Parent) ── [nom, onSelectionner] ──► CarteStagiaire (Enfant) ── [Clic] ──► Callback invoqué',
    keyRule: 'Un composant enfant ne doit JAMAIS modifier directement ses props. Il doit invoquer la fonction transmise par le parent.'
  },
  resources: [
    {
      id: 'stagiaires-array',
      title: 'Tableau des Stagiaires (Données)',
      type: 'array',
      description: 'Liste des objets stagiaires à itérer avec .map() dans App.jsx',
      content: `const stagiaires = [
  { id: 1, nom: 'Sara Bennani', filiere: 'FullStack 2A', note: 16 },
  { id: 2, nom: 'Youssef Mansouri', filiere: 'Mobile & Cloud', note: 14 }
];`
    },
    {
      id: 'carte-props-contract',
      title: 'Contrat des Props (CarteStagiaire)',
      type: 'contract',
      description: 'Props attendues par le composant enfant CarteStagiaire',
      content: `// Déstructuration recommandée dans CarteStagiaire.jsx :
function CarteStagiaire({ nom, filiere, note, onSelectionner }) {
  // nom : string
  // filiere : string
  // note : number
  // onSelectionner : function callback () => onSelectionner(nom)
}`
    }
  ],
  entryFile: 'src/App.jsx',
  files: [
    {
      name: 'App.jsx',
      path: 'src/App.jsx',
      content: `import React, { useState } from 'react';
import { CarteStagiaire } from './components/CarteStagiaire';

export default function App() {
  const [selection, setSelection] = useState(null);

  const stagiaires = [
    { id: 1, nom: 'Sara Bennani', filiere: 'FullStack 2A', note: 16 },
    { id: 2, nom: 'Youssef Mansouri', filiere: 'Mobile & Cloud', note: 14 }
  ];

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#10B981', fontSize: '22px' }}>Liste des Stagiaires</h1>

      {selection && (
        <div style={{ padding: '10px', backgroundColor: '#dcfce7', borderRadius: '8px', marginBottom: '16px' }}>
          <strong>Sélection actuelle :</strong> {selection}
        </div>
      )}

      {/* TODO 4 : Itérez sur le tableau stagiaires avec .map() et retournez <CarteStagiaire /> */}
      {/* N'oubliez pas les props : key, nom, filiere, note, et le callback onSelectionner */}
      <div style={{ display: 'grid', gap: '12px' }}>
        
      </div>
    </div>
  );
}`
    },
    {
      name: 'CarteStagiaire.jsx',
      path: 'src/components/CarteStagiaire.jsx',
      content: `import React from 'react';

// TODO 1 : Déstructurez les props { nom, filiere, note, onSelectionner }
export function CarteStagiaire(props) {
  return (
    <div style={{
      border: '1px solid #cbd5e1',
      padding: '16px',
      borderRadius: '12px',
      backgroundColor: '#ffffff'
    }}>
      {/* TODO 2 : Affichez le nom, la filière et la note */}
      <h3 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>{/* Nom */}</h3>
      <p style={{ margin: '4px 0', fontSize: '13px', color: '#64748B' }}>Filière : </p>
      <p style={{ margin: '4px 0', fontSize: '13px', color: '#64748B' }}>Note :  / 20</p>
      
      {/* TODO 3 : Déclenchez le callback onSelectionner au clic */}
      <button
        style={{
          marginTop: '10px',
          padding: '6px 12px',
          backgroundColor: '#10B981',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '12px'
        }}
      >
        Sélectionner
      </button>
    </div>
  );
}`
    }
  ],
  tests: [
    {
      id: 'test-props-destruct',
      title: 'Déstructuration des props',
      description: 'CarteStagiaire doit recevoir nom, filiere, note et onSelectionner.',
      check: (_, __, allFiles) => {
        const cardFile = allFiles.find(f => f.name === 'CarteStagiaire.jsx')?.content || '';
        return /CarteStagiaire\s*\(\s*\{[^}]*nom[^}]*\}\s*\)/.test(cardFile);
      }
    },
    {
      id: 'test-parent-render',
      title: 'Rendu par le parent avec clé key',
      description: 'App.jsx doit itérer avec .map() et fournir un prop key={st.id}.',
      check: (_, __, allFiles) => {
        const appFile = allFiles.find(f => f.name === 'App.jsx')?.content || '';
        return /key=\{st\.id\}/.test(appFile) && /<CarteStagiaire/.test(appFile);
      }
    },
    {
      id: 'test-callback-wired',
      title: 'Transmission du callback',
      description: 'onSelectionner doit être passé à CarteStagiaire pour modifier l\'état.',
      check: (_, __, allFiles) => {
        const appFile = allFiles.find(f => f.name === 'App.jsx')?.content || '';
        return /onSelectionner=\{/.test(appFile);
      }
    }
  ],
  hints: [
    {
      level: 1,
      title: 'Composant enfant',
      content: 'Dans CarteStagiaire.jsx, remplacez "props" par "{ nom, filiere, note, onSelectionner }".'
    },
    {
      level: 2,
      title: 'Gestionnaire de clic',
      content: 'Reliez le bouton au callback : <button onClick={onSelectionner}>Sélectionner</button>.'
    },
    {
      level: 3,
      title: 'Rendu dans le parent',
      content: 'Dans App.jsx, passez onSelectionner={() => setSelection(st.nom)}.'
    }
  ],
  solution: {
    explanation: 'Le flux unidirectionnel garantit la prévisibilité : les données descendent par les props et les événements remontent par les fonctions callbacks passées en props.',
    files: [
      {
        path: 'src/components/CarteStagiaire.jsx',
        content: `import React from 'react';

export function CarteStagiaire({ nom, filiere, note, onSelectionner }) {
  return (
    <div style={{ border: '1px solid #cbd5e1', padding: '16px', borderRadius: '12px', backgroundColor: '#ffffff' }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>{nom}</h3>
      <p style={{ margin: '4px 0', fontSize: '13px', color: '#64748B' }}>Filière : {filiere}</p>
      <p style={{ margin: '4px 0', fontSize: '13px', color: '#64748B' }}>Note : {note} / 20</p>
      <button
        onClick={onSelectionner}
        style={{
          marginTop: '10px',
          padding: '6px 12px',
          backgroundColor: '#10B981',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '12px'
        }}
      >
        Sélectionner
      </button>
    </div>
  );
}`
      }
    ]
  },
  microQcm: {
    question: 'Pourquoi un composant enfant ne doit-il jamais muter directement une prop reçue de son parent ?',
    options: [
      'Car les props sont en lecture seule (pure function) et muter une prop brise la cohérence de l\'état de l\'application.',
      'Parce que le navigateur bloque les modifications d\'attributs HTML.',
      'Parce que les props sont automatiquement stockées dans le fichier package.json.',
      'Il est tout à fait autorisé de modifier props.valeur = 12.'
    ],
    correctIndex: 0,
    explanation: 'Les composants React doivent se comporter comme des fonctions pures vis-à-vis de leurs props. Toute modification d\'état doit être déléguée au parent.'
  }
};
