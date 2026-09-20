import { LabExercise } from '../../types/reactLabTypes';

export const LAB_1_JSX: LabExercise = {
  id: 'lab-1-jsx',
  moduleId: 'module1',
  moduleLabel: 'Module 1 : Architecture & JSX',
  chapterTitle: 'Syntaxe Déclarative JSX & Expressions',
  title: 'Atelier 1 : Création & Rendu de Composant JSX',
  subtitle: 'Maîtrisez la syntaxe déclarative JSX et l\'injection d\'expressions JavaScript dynamiques.',
  difficulty: 'intro',
  concepts: ['JSX', 'Expressions {}', 'Fragments <>', 'Interpolation'],
  taskInstructions: [
    'Ouvrez le fichier "src/App.jsx".',
    'Dans le composant App, injectez les variables `nom` et `filiere` à l\'aide des accolades `{}`.',
    'Ajoutez un affichage conditionnel : si `note >= 10`, affichez un badge vert "Admis", sinon un badge rouge "Ajourné".',
    'Cliquez sur "Exécuter ▶" et observez le rendu dans l\'aperçu en direct.'
  ],
  conceptReminder: {
    title: 'Règles Fondamentales du JSX (OFPPT)',
    explanation: 'JSX est une extension syntaxique de JavaScript transformée par Babel en appels React.createElement(). Toute expression JavaScript valide peut être insérée entre accolades {}. JSX exige toujours un seul élément racine ou un Fragment <></>.',
    diagramText: 'Variable JS ({ nom }) ──► Babel ──► React.createElement() ──► Rendu DOM Réactif',
    keyRule: 'Toutes les balises doivent être fermées (ex: <img />, <input />) et les attributs s\'écrivent en camelCase (className, htmlFor).'
  },
  resources: [
    {
      id: 'stagiaire-object',
      title: 'Objet Stagiaire (Données initiales)',
      type: 'object',
      description: 'Données exportées depuis src/data/stagiaire.js',
      content: `export const stagiaire = {
  nom: 'Karim Alami',
  filiere: 'Développement Digital · FullStack',
  note: 15.5
};`
    }
  ],
  entryFile: 'src/App.jsx',
  files: [
    {
      name: 'App.jsx',
      path: 'src/App.jsx',
      content: `import React from 'react';
import { stagiaire } from './data/stagiaire';

export default function App() {
  // TODO 1 : Récupérez les propriétés nom, filiere, note depuis l'objet 'stagiaire'
  

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#10B981', fontSize: '22px' }}>
        Fiche Stagiaire OFPPT
      </h1>

      <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px', marginTop: '12px' }}>
        {/* TODO 2 : Affichez le nom, la filière et la note avec les accolades {} */}
        <p><strong>Nom :</strong> </p>
        <p><strong>Filière :</strong> </p>
        <p><strong>Moyenne :</strong> / 20</p>

        {/* TODO 3 : Rendu conditionnel : Si note >= 10 afficher 'Admis', sinon 'Ajourné' */}
        <div style={{ marginTop: '12px' }}>
          
        </div>
      </div>
    </div>
  );
}`
    },
    {
      name: 'stagiaire.js',
      path: 'src/data/stagiaire.js',
      content: `export const stagiaire = {
  nom: 'Karim Alami',
  filiere: 'Développement Digital · FullStack',
  note: 15.5
};`
    }
  ],
  tests: [
    {
      id: 'test-root',
      title: 'Composant racine exporté',
      description: 'Le fichier src/App.jsx doit exporter un composant par défaut.',
      check: (code) => /export\s+default\s+function\s+App/.test(code)
    },
    {
      id: 'test-expression',
      title: 'Interpolation dynamique {}',
      description: 'Les variables doivent être affichées avec la syntaxe {nom} ou {filiere}.',
      check: (code) => /\{nom\}/.test(code) || /\{filiere\}/.test(code) || /\{stagiaire\./.test(code)
    },
    {
      id: 'test-conditional',
      title: 'Rendu conditionnel du statut',
      description: 'Une condition ternaire ou logique doit déterminer l\'admission (Admis / Ajourné).',
      check: (code) => /note\s*>=?\s*10/.test(code) && /Admis/.test(code)
    }
  ],
  hints: [
    {
      level: 1,
      title: 'Rappel syntaxique',
      content: 'Pour afficher une variable en JSX, entourez-la de simples accolades : <p>{nom}</p>.'
    },
    {
      level: 2,
      title: 'Structure de la condition',
      content: 'Utilisez un opérateur ternaire : {note >= 10 ? "Admis" : "Ajourné"}.'
    },
    {
      level: 3,
      title: 'Code attendu',
      content: 'Vérifiez que vous avez importé { stagiaire } et que vous extrayez ses propriétés : const { nom, filiere, note } = stagiaire;'
    }
  ],
  solution: {
    explanation: 'En JSX, les accolades {} permettent d\'exécuter n\'importe quelle expression JavaScript. L\'opérateur ternaire est la méthode standard en React pour le rendu conditionnel en ligne.',
    files: [
      {
        path: 'src/App.jsx',
        content: `import React from 'react';
import { stagiaire } from './data/stagiaire';

export default function App() {
  const { nom, filiere, note } = stagiaire;

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#10B981', fontSize: '22px' }}>Fiche Stagiaire OFPPT</h1>
      <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px', marginTop: '12px' }}>
        <p><strong>Nom :</strong> {nom}</p>
        <p><strong>Filière :</strong> {filiere}</p>
        <p><strong>Moyenne :</strong> {note} / 20</p>
        <div style={{ marginTop: '12px' }}>
          <span style={{
            padding: '6px 14px',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '13px',
            backgroundColor: note >= 10 ? '#dcfce7' : '#fee2e2',
            color: note >= 10 ? '#15803d' : '#b91c1c'
          }}>
            Statut : {note >= 10 ? 'Admis' : 'Ajourné'}
          </span>
        </div>
      </div>
    </div>
  );
}`
      }
    ]
  },
  microQcm: {
    question: 'Pourquoi le JSX nécessite-t-il une balise unique ou un Fragment <> pour englober plusieurs éléments ?',
    options: [
      'Parce que le navigateur n\'accepte pas plus de deux balises HTML.',
      'Parce que JSX est transformé en un appel de fonction JS React.createElement(), qui ne peut renvoyer qu\'une seule valeur.',
      'Parce que le style CSS ne peut s\'appliquer qu\'à un seul nœud.',
      'C\'est une restriction facultative qui disparaît en production.'
    ],
    correctIndex: 1,
    explanation: 'En JavaScript, une fonction ne peut retourner qu\'une seule valeur. React.createElement() représente un seul objet de nœud virtuel.'
  }
};
