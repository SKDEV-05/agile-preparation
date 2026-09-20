import { LabExercise } from '../../types/reactLabTypes';

export const LAB_4_FORMS: LabExercise = {
  id: 'lab-4-forms',
  moduleId: 'module4',
  moduleLabel: 'Module 4 : Composants & State',
  chapterTitle: 'Formulaires Contrôlés & Gestion d\'Événements',
  title: 'Atelier 4 : Formulaire Contrôlé Bidirectionnel',
  subtitle: 'Liez les entrées utilisateur au state avec value et onChange, et interceptez la soumission.',
  difficulty: 'practice',
  concepts: ['Composants Contrôlés', 'onChange', 'e.target.value', 'e.preventDefault()'],
  taskInstructions: [
    'Ouvrez "src/App.jsx".',
    'Créez un formulaire contenant deux champs contrôlés : `nom` et `email`.',
    'Assurez-vous que chaque champ a `value={...}` et met à jour le state avec `onChange={(e) => setNom(e.target.value)}`.',
    'Dans la fonction `handleSubmit`, appelez impérativement `e.preventDefault()` pour éviter le rechargement brutal de la page.',
    'Affichez un message de confirmation récapitulant les données saisies après soumission.'
  ],
  conceptReminder: {
    title: 'Composant Contrôlé (Single Source of Truth)',
    explanation: 'Dans un formulaire HTML traditionnel, les balises <input> gèrent leur propre valeur interne. En React, nous faisons de l\'état React l\'unique source de vérité (Single Source of Truth) en liant value={state} et en écoutant onChange.',
    diagramText: 'Input HTML ── onChange (e.target.value) ──► setState() ──► Rendu React ──► value={state}',
    keyRule: 'Sans e.preventDefault(), la balise <form> déclenche une requête HTTP synchrone qui recharge tout le navigateur et efface l\'état en mémoire de votre SPA !'
  },
  entryFile: 'src/App.jsx',
  files: [
    {
      name: 'App.jsx',
      path: 'src/App.jsx',
      content: `import React, { useState } from 'react';

export default function App() {
  // TODO 1 : Déclarez les états nom (''), email (''), et soumis (false)
  

  const handleSubmit = (e) => {
    // TODO 2 : Empêchez le rechargement natif de la page avec e.preventDefault()
    
    // TODO 3 : Validez et passez 'soumis' à true
    
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '420px', margin: '0 auto' }}>
      <h2 style={{ color: '#0F172A', fontSize: '20px' }}>Inscription Stagiaire</h2>

      {/* TODO 4 : Affichage conditionnel selon l'état 'soumis' */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Nom complet :</label>
          {/* TODO 5 : Contrôlez cet input avec value={nom} et onChange */}
          <input
            type="text"
            placeholder="Ex: Karim Tazi"
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Email académique :</label>
          {/* TODO 6 : Contrôlez cet input avec value={email} et onChange */}
          <input
            type="email"
            placeholder="karim@ofppt-edu.ma"
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 16px',
            backgroundColor: '#10B981',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '8px'
          }}
        >
          Valider l'inscription
        </button>
      </form>
    </div>
  );
}`
    }
  ],
  tests: [
    {
      id: 'test-prevent-default',
      title: 'Interception e.preventDefault()',
      description: 'La soumission doit appeler e.preventDefault() pour préserver l\'application SPA.',
      check: (code) => /e\.preventDefault\(\)/.test(code)
    },
    {
      id: 'test-controlled-value',
      title: 'Champs contrôlés avec value et onChange',
      description: 'Les inputs doivent être liés au state avec value={...} et onChange={...}.',
      check: (code) => /value=\{nom\}/.test(code) && /onChange=\{/.test(code)
    },
    {
      id: 'test-target-value',
      title: 'Extraction e.target.value',
      description: 'La mise à jour d\'état doit lire e.target.value.',
      check: (code) => /e\.target\.value/.test(code)
    }
  ],
  hints: [
    {
      level: 1,
      title: 'Bloquer le rechargement',
      content: 'Dans le gestionnaire onSubmit, la première ligne doit être e.preventDefault();'
    },
    {
      level: 2,
      title: 'Liaison bidirectionnelle',
      content: 'Sur l\'input : value={nom} et onChange={(e) => setNom(e.target.value)}'
    },
    {
      level: 3,
      title: 'État de soumission',
      content: 'Utilisez un booléen [soumis, setSoumis] = useState(false); pour basculer vers le message de succès.'
    }
  ],
  solution: {
    explanation: 'Un composant contrôlé garantit que React valide, formate et synchronise instantanément chaque frappe de l\'utilisateur avec l\'état de l\'interface.',
    files: [
      {
        path: 'src/App.jsx',
        content: `import React, { useState } from 'react';

export default function App() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Stagiaire enregistré : ' + nom);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={nom} onChange={e => setNom(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <button type="submit">Valider</button>
    </form>
  );
}`
      }
    ]
  },
  microQcm: {
    question: 'Que se produit-il si vous oubliez d\'appeler e.preventDefault() dans l\'événement onSubmit d\'une SPA React ?',
    options: [
      'Le navigateur effectue un rechargement HTTP complet de la page et perd tout l\'état React en mémoire.',
      'Rien, React bloque automatiquement la soumission native.',
      'Le serveur refuse la requête pour cause de sécurité CORS.',
      'L\'application passe automatiquement en mode plein écran.'
    ],
    correctIndex: 0,
    explanation: 'La balise HTML <form> possède un comportement par défaut synchrone. Sans e.preventDefault(), la page recharge et réinitialise toute l\'application.'
  }
};
