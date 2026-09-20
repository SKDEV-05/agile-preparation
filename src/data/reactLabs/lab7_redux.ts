import { LabExercise } from '../../types/reactLabTypes';

export const LAB_7_REDUX: LabExercise = {
  id: 'lab-7-redux',
  moduleId: 'module7',
  moduleLabel: 'Module 7 & 8 : Redux & Toolkit',
  chapterTitle: 'Gestion d\'État Global avec Redux (Store, Slice, Dispatch)',
  title: 'Atelier 7 : Flux Unidirectionnel Redux (Action ➔ Reducer ➔ Store)',
  subtitle: 'Comprenez et appliquez le cycle prévisible de Redux pour gérer un panier ou une liste globale.',
  difficulty: 'challenge',
  concepts: ['Store Global', 'Actions', 'Reducers Purs', 'Dispatch', 'Immutabilité'],
  taskInstructions: [
    'Ouvrez "src/App.jsx".',
    'Observez le reducer pur : il reçoit `(state, action)` et retourne impérativement une NOUVELLE copie de l\'état sans jamais muter l\'original.',
    'Dans l\'interface, déclenchez une action avec `dispatch({ type: "AJOUTER_MODULE", payload: ... })`.',
    'Vérifiez que le store global met à jour la liste sans redondance de props.',
    'Testez l\'action de réinitialisation `dispatch({ type: "RESET" })`.'
  ],
  conceptReminder: {
    title: 'Le Cycle Fondamental de Redux (OFPPT)',
    explanation: '1. Le composant envoie une Action avec dispatch({ type, payload }).\n2. Le Reducer (fonction pure) reçoit l\'ancien state et l\'action, puis calcule le nouveau state en clonant avec le spread operator [...state].\n3. Le Store notifie tous les composants abonnés qui se redessinent automatiquement.',
    diagramText: 'Composant UI ── dispatch(Action) ──► Reducer (Fonction Pure) ──► Store Global ──► UI mise à jour',
    keyRule: 'Un reducer doit être STRICTEMENT PUR : pas d\'effets de bord, pas d\'appels API directs, et AUCUNE mutation directe du state (toujours utiliser le clonage {...state}).'
  },
  entryFile: 'src/App.jsx',
  files: [
    {
      name: 'App.jsx',
      path: 'src/App.jsx',
      content: `import React, { useReducer } from 'react';

// État initial global
const initialPanier = {
  modulesChoisis: ['React Fondamentaux'],
  totalHeures: 30
};

// TODO 1 : Implémentez le Reducer pur (immutabilité stricte {...state})
function panierReducer(state, action) {
  switch (action.type) {
    // TODO: case 'AJOUTER_MODULE' -> clonez et ajoutez payload.nom et payload.heures
    
    // TODO: case 'VIDER_PANIER' -> modulesChoisis: [], totalHeures: 0
    
    default:
      return state;
  }
}

export default function App() {
  const [panier, dispatch] = useReducer(panierReducer, initialPanier);

  const ajouterRedux = () => {
    // TODO 2 : Dispatchez l'action 'AJOUTER_MODULE' avec payload { nom: 'Redux Toolkit', heures: 25 }
    
  };

  const vider = () => {
    // TODO 3 : Dispatchez l'action 'VIDER_PANIER'
    
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#0F172A', fontSize: '20px' }}>Store Global Redux</h2>

      <div style={{ padding: '16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', margin: '16px 0' }}>
        <p><strong>Total volume horaire :</strong> <span style={{ color: '#10B981', fontWeight: 'bold' }}>{panier.totalHeures} heures</span></p>
        
        <h4 style={{ margin: '12px 0 6px 0' }}>Modules inscrits dans le Store :</h4>
        <ul>
          {panier.modulesChoisis.map((m, idx) => (
            <li key={idx}>{m}</li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={ajouterRedux}
          style={{ padding: '8px 16px', backgroundColor: '#10B981', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Dispatch Action (+ Module Redux)
        </button>

        <button
          onClick={vider}
          style={{ padding: '8px 16px', backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Dispatch Vider
        </button>
      </div>
    </div>
  );
}`
    }
  ],
  tests: [
    {
      id: 'test-reducer-pure',
      title: 'Reducer pur avec switch / case',
      description: 'Le reducer doit traiter les actions avec un switch/case et retourner un clone {...state}.',
      check: (code) => /switch\s*\(\s*action\.type\s*\)/.test(code) && /\.\.\.state/.test(code)
    },
    {
      id: 'test-dispatch-called',
      title: 'Envoi d\'action avec dispatch',
      description: 'Les boutons doivent appeler dispatch({ type: ... }).',
      check: (code) => /dispatch\s*\(\s*\{\s*type:/.test(code)
    }
  ],
  hints: [
    {
      level: 1,
      title: 'Action Redux',
      content: 'Une action est un objet avec au minimum une propriété "type" en majuscules (ex: AJOUTER_MODULE).'
    },
    {
      level: 2,
      title: 'Immutabilité du Reducer',
      content: 'Ne faites jamais state.modulesChoisis.push(). Utilisez toujours [...state.modulesChoisis, item].'
    },
    {
      level: 3,
      title: 'Envoi avec dispatch',
      content: 'Le dispatch est la seule façon de déclencher un changement d\'état dans le store Redux.'
    }
  ],
  solution: {
    explanation: 'Le pattern Redux garantit la traçabilité complète des modifications d\'état en centralisant les mutations dans des reducers prévisibles et purs.',
    files: [
      {
        path: 'src/App.jsx',
        content: `import React, { useReducer } from 'react';

function reducer(state, action) {
  if (action.type === 'ADD') return { ...state, count: state.count + 1 };
  return state;
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'ADD' })}>Dispatch</button>
    </div>
  );
}`
      }
    ]
  },
  microQcm: {
    question: 'Dans l\'architecture Redux, pourquoi un reducer doit-il être une fonction pure ?',
    options: [
      'Pour permettre le voyage dans le temps (Time Travel Debugging) et garantir des états prévisibles sans effets de bord.',
      'Parce que le navigateur bloque les fonctions impures.',
      'Parce que Redux est un module CSS.',
      'Pour crypter les mots de passe des utilisateurs.'
    ],
    correctIndex: 0,
    explanation: 'La pureté des reducers garantit que le même état d\'entrée avec la même action produit toujours exactement le même état de sortie.'
  }
};
