import { ReactCourseModule } from '../../types/reactTypes';

export const MODULE_3: ReactCourseModule = {
  id: 'module3',
  orderNumber: 3,
  pdfReference: 'PDF 3',
  title: 'Exploiter le Framework React JS : Principes & Architecture',
  subtitle: 'Virtual DOM, Algorithme de Réconciliation & Anatomie d\'un Projet React',
  description: 'Comprendre la mécanique interne de React : le Virtual DOM en mémoire, l\'algorithme de réconciliation (Diffing), l\'outillage d\'ingénierie et le flux d\'amorçage depuis index.html jusqu\'au composant racine.',
  iconName: 'Cpu',
  gradient: 'from-[#10B981] via-[#22C55E] to-[#10B981]',
  sections: [
    {
      id: 'm3-s1',
      order: '01',
      title: 'Philosophie de React & Le Virtual DOM en Profondeur',
      quickSummary: 'Comment React garantit 60 FPS grâce à sa copie en mémoire et son calcul de différences.',
      conceptExplanation: 'Créé par Facebook (Meta) en 2013, React est une bibliothèque JavaScript déclarative basée sur les composants. Sa force réside dans le Virtual DOM : un arbre d\'objets JavaScript légers en mémoire vive qui représente fidèlement la structure du DOM réel.',
      deepExplanation: 'Lorsqu\'un état (State) ou une prop change, React ne touche pas directement au navigateur. Il génère un nouveau Virtual DOM, le compare à l\'ancien (phase de Diffing via l\'algorithme heuristique O(n) de réconciliation), calcule l\'ensemble minimal de modifications requises, et les applique en un seul lot optimisé (Batching) dans le DOM réel.',
      keyPoints: [
        'Déclaratif : On décrit l\'état final désiré ; React se charge de la séquence de mise à jour.',
        'Virtual DOM : Arbre d\'objets JavaScript ultraléger vivant en mémoire RAM.',
        'Diffing : Algorithme comparant l\'ancien et le nouveau Virtual DOM pour isoler les nœuds altérés.',
        'Batching : Regroupement des mutations pour réduire le nombre d\'opérations de reflow/repaint.',
        'Flux unidirectionnel : Les données descendent toujours des parents vers les enfants.'
      ],
      examTraps: [
        'Attention à la définition formelle : React est techniquement une BIBLIOTHÈQUE (Library) centrée sur la vue (View), et non un framework monolithique complet avec routeur et ORM intégrés par défaut.'
      ],
      diagramType: 'virtual_dom_diff',
      codeExamples: [
        {
          title: 'Représentation mentale simplifiée d\'un élément Virtual DOM',
          description: 'Un élément React est un objet JavaScript standard avec type, props et children.',
          code: `// Ce que vous écrivez :
// <h1 className="titre">Bonjour OFPPT</h1>

// Ce que le Virtual DOM stocke en mémoire JavaScript pure :
const vdomNode = {
  type: 'h1',
  props: {
    className: 'titre',
    children: 'Bonjour OFPPT'
  }
};
console.log('Nœud virtuel léger :', vdomNode);`,
          outputPreview: 'Nœud virtuel léger : { type: "h1", props: { className: "titre", children: "Bonjour OFPPT" } }'
        }
      ],
      miniQuestion: {
        question: 'Quel est l\'objectif principal du Virtual DOM dans React ?',
        options: [
          'Intercepter les requêtes HTTP entre le navigateur et le serveur d\'API pour simuler un proxy réseau local.',
          'Sauvegarder une copie complète de l\'arborescence de navigation dans le cache persistant du navigateur client.',
          'Calculer les modifications minimales à appliquer au DOM réel afin d\'optimiser les performances graphiques.',
          'Compiler automatiquement les composants JSX en instructions binaires exécutées directement par le processeur.'
        ],
        correctIndex: 2,
        explanation: 'Le Virtual DOM sert à comparer l\'ancien et le nouvel état en mémoire JavaScript (très rapide) pour n\'appliquer au DOM réel (très lent) que le strict minimum de modifications nécessaires.'
      },
      officialDocReference: 'OFPPT M204 Support 3 — Pages 3 à 9'
    },
    {
      id: 'm3-s2',
      order: '02',
      title: 'Architecture par Composants & Arborescence Projet',
      quickSummary: 'Découpage modulaire de l\'interface et organisation professionnelle des dossiers.',
      conceptExplanation: 'Dans React, une interface est une hiérarchie d\'éléments autonomes et réutilisables appelés composants (Component-Based Architecture). Chaque composant encapsule sa structure (JSX), son comportement (logique JS) et son style.',
      deepExplanation: 'Dans un projet standard (Create React App ou Vite), le dossier public/ contient les assets statiques non traités par le compilateur (favicon, manifest, index.html unique avec `<div id="root"></div>`). Le dossier src/ contient l\'ensemble du code source traité et empaqueté par Webpack ou Vite (composants, hooks, styles, images).',
      keyPoints: [
        'Composabilité : Une page complexe est un assemblage de petits composants simples (Bouton, Carte, Navbar).',
        'Réutilisabilité : Un même composant s\'adapte à différents contextes grâce à ses propriétés (props).',
        'public/ vs src/ : Mettez les images de composants dans src/ pour bénéficier de l\'optimisation et de la vérification de build.',
        'package.json : Déclare les scripts (start, build, test) et verrouille les dépendances du projet.'
      ],
      examTraps: [
        'Piège de nommage : Tout composant React personnalisé DOIT impérativement commencer par une LETTRE MAJUSCULE (ex: <Carte />, <Header />). Une balise minuscule (<carte />) est interprétée par React comme une balise HTML native standard inconnue.'
      ],
      diagramType: 'props_tree',
      codeExamples: [
        {
          title: 'Structure type d\'un composant fonctionnel moderne',
          description: 'Exportation standard d\'un composant fonctionnel avec ses props.',
          code: `// Fichier : src/components/BadgeModule.jsx
import React from 'react';

function BadgeModule({ code, nom, coefficient }) {
  return (
    <div className="badge-card">
      <span className="code">{code}</span>
      <h3>{nom}</h3>
      <small>Coeff : {coefficient}</small>
    </div>
  );
}

export default BadgeModule;`,
          outputPreview: 'Composant modulaire prêt à être instancié avec <BadgeModule code="M204" nom="React" coefficient={3} />'
        }
      ],
      miniQuestion: {
        question: 'Pourquoi un composant React personnalisé doit-il obligatoirement commencer par une majuscule ?',
        options: [
          'Parce que le compilateur Webpack refuse de bundler les fichiers dont le nom commence par une minuscule.',
          'Parce que les règles ESLint émettent un warning systématique sur les noms en minuscule.',
          'Parce que Node.js exige des noms en PascalCase pour le module system CommonJS.',
          'Pour que le moteur JSX distingue vos composants personnalisés des balises HTML natives (div, span, button).'
        ],
        correctIndex: 3,
        explanation: 'Babel et JSX considèrent les balises en minuscules (<div />, <p />) comme des éléments HTML natifs. Les balises débutant par une majuscule (<App />, <UserCard />) sont identifiées comme des composants personnalisés à instancier.'
      },
      officialDocReference: 'OFPPT M204 Support 3 — Pages 10 à 16'
    },
    {
      id: 'm3-s3',
      order: '03',
      title: 'Point d\'Entrée & Flux d\'Exécution (index.html -> index.js -> App)',
      quickSummary: 'Le cycle exact d\'amorçage qui donne vie à votre application React.',
      conceptExplanation: 'Lorsqu\'un utilisateur accède au site, le serveur sert le fichier public/index.html qui contient la balise `<div id="root"></div>`. Le script compilé src/index.js (ou main.jsx sous Vite) s\'exécute alors.',
      deepExplanation: 'Dans React 18+, ReactDOM.createRoot() s\'accroche au nœud HTML #root. L\'instruction root.render(<React.StrictMode><App /></React.StrictMode>) injecte la racine de l\'arbre de composants dans le DOM du navigateur. React.StrictMode est un composant utilitaire de développement qui double-invoque certains cycles de vie pour détecter les effets de bord indésirables.',
      keyPoints: [
        'index.html : Contient <div id="root"></div>, point d\'ancrage physique de toute l\'interface.',
        'ReactDOM.createRoot() : Initialise le moteur de rendu React 18 sur l\'élément racine.',
        'root.render() : Monte l\'arbre de composants React virtuel dans le DOM réel.',
        'React.StrictMode : Outil de contrôle en développement uniquement (aucun impact en production build).'
      ],
      examTraps: [
        'Question fréquente d\'examen : "Pourquoi mon useEffect s\'exécute-t-il 2 fois en local ?" Réponse officielle : C\'est le comportement normal de React.StrictMode en mode développement pour aider à traquer les fuites mémoires et effets non nettoyés.'
      ],
      diagramType: 'router_flow',
      codeExamples: [
        {
          title: 'Code officiel du point d\'entrée (src/index.js)',
          description: 'La liaison canonique entre le HTML hôte et l\'application React.',
          code: `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// 1. Sélection de la div racine du DOM réel :
const rootElement = document.getElementById('root');

// 2. Création de la racine React 18 :
const root = ReactDOM.createRoot(rootElement);

// 3. Montage de l'application :
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
          outputPreview: 'L\'arbre complet généré par <App /> est injecté dans <div id="root">.'
        }
      ],
      miniQuestion: {
        question: 'Quel est le rôle de ReactDOM.createRoot(document.getElementById(\'root\')) dans une application React moderne ?',
        options: [
          'Connecter le moteur de rendu React à l\'élément conteneur du DOM réel pour y monter les composants.',
          'Créer un nouveau thread d\'exécution JavaScript indépendant du thread principal du navigateur.',
          'Initialiser le routeur côté client pour gérer la navigation entre les pages.',
          'Déclencher le mode SSR (Server Side Rendering) de React 18 pour le pré-rendu HTML.'
        ],
        correctIndex: 0,
        explanation: 'createRoot est la méthode introduite par React 18 qui désigne l\'élément HTML du DOM réel dans lequel React va injecter et synchroniser son arbre de composants virtuel.'
      },
      officialDocReference: 'OFPPT M204 Support 3 — Pages 17 à 24'
    }
  ],
  practicalChallenge: {
    title: 'Défi Pratique : Création d\'un composant d\'en-tête dynamique',
    description: 'Créez un composant fonctionnel HeaderOFPPT qui reçoit en props le titre et le nom du formateur, et retourne un élément header stylisé.',
    starterCode: `function HeaderOFPPT(props) {
  // Déstructurez les props et retournez le JSX attendu :
  
}`,
    expectedOutcome: 'Le composant retourne <header><h1>{titre}</h1><p>Formateur : {formateur}</p></header>',
    solutionCode: `function HeaderOFPPT({ titre, formateur = 'Non assigné' }) {
  return (
    <header className="header-ofppt">
      <h1>{titre}</h1>
      <p>Formateur : {formateur}</p>
    </header>
  );
}`,
    explanation: 'La déstructuration propre des props dans les paramètres de la fonction avec une valeur par défaut constitue le standard recommandé pour les composants fonctionnels React.'
  },
  keyTakeaways: [
    'Le Virtual DOM permet à React d\'atteindre une réactivité maximale à 60 FPS.',
    'L\'algorithme de réconciliation compare les arbres virtuels pour isoler les nœuds modifiés.',
    'Les composants personnalisés commencent toujours par une lettre Majuscule.',
    'Le point d\'entrée ReactDOM.createRoot() injecte le composant racine dans la div #root.'
  ],
  commonTraps: [
    'Nommer un composant personnalisé avec une minuscule (<carte /> au lieu de <Carte />).',
    'Modifier manuellement le DOM réel avec document.getElementById à l\'intérieur d\'un composant React.',
    'S\'inquiéter de la double exécution d\'un effet en développement causée par React.StrictMode.'
  ]
};
