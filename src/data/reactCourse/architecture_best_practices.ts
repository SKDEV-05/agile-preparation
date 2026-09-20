export interface ClassicErrorSolution {
  id: string;
  errorName: string;
  frequentCause: string;
  solution: string;
  codeSnippetBad: string;
  codeSnippetGood: string;
}

export interface GlossaryTerm {
  termFr: string;
  termEn: string;
  definition: string;
  ofpptContext: string;
}

export const CLASSIC_OFPPT_ERRORS: ClassicErrorSolution[] = [
  {
    id: 'err-1',
    errorName: 'Mon composant ne se met pas à jour après modification du state',
    frequentCause: 'Mutation directe de l\'objet ou du tableau en place au lieu de créer une nouvelle référence mémoire.',
    solution: 'Utiliser l\'opérateur spread (...) pour retourner un nouvel objet/tableau ou la fonction produce d\'Immer.',
    codeSnippetBad: `// ERREUR FATALE :
state.stagiaires.push(nouveau);
setStagiaires(state.stagiaires); // Même référence mémoire !`,
    codeSnippetGood: `// SOLUTION CORRECTE :
setStagiaires(prev => [...prev, nouveau]); // Nouvelle référence !`
  },
  {
    id: 'err-2',
    errorName: 'Boucle infinie d\'appels API dans le navigateur',
    frequentCause: 'Le hook useEffect n\'a pas de tableau de dépendances, ou dépend d\'un objet recréé à chaque rendu.',
    solution: 'Spécifier un tableau de dépendances strict [] pour un appel unique au montage, ou ne lister que des valeurs primitives stables.',
    codeSnippetBad: `// ERREUR FATALE (Boucle infinie !) :
useEffect(() => {
  fetch('/api').then(res => res.json()).then(data => setData(data));
}); // Pas de tableau de dépendances !`,
    codeSnippetGood: `// SOLUTION CORRECTE :
useEffect(() => {
  fetch('/api').then(res => res.json()).then(data => setData(data));
}, []); // S'exécute une seule fois au montage !`
  },
  {
    id: 'err-3',
    errorName: 'Warning: Each child in a list should have a unique "key" prop',
    frequentCause: 'Utilisation de .map() sans fournir la prop "key" sur l\'élément racine retourné dans la boucle.',
    solution: 'Ajouter key={item.id} en utilisant un identifiant unique et stable issu des données.',
    codeSnippetBad: `// ERREUR :
items.map(item => <li>{item.titre}</li>)`,
    codeSnippetGood: `// SOLUTION CORRECTE :
items.map(item => <li key={item.id}>{item.titre}</li>)`
  },
  {
    id: 'err-4',
    errorName: 'Cannot update a component while rendering a different component',
    frequentCause: 'Déclenchement d\'un setState ou d\'un dispatch directement dans le corps de rendu au lieu d\'un gestionnaire d\'événement ou d\'un useEffect.',
    solution: 'Déplacer l\'appel dans une fonction onClick={() => dispatch(...)} ou dans un hook useEffect.',
    codeSnippetBad: `// ERREUR :
function MonComposant() {
  setCount(10); // Appelé pendant la phase de rendu !
  return <div>...</div>;
}`,
    codeSnippetGood: `// SOLUTION CORRECTE :
function MonComposant() {
  useEffect(() => {
    setCount(10); // Synchronisé après le premier rendu !
  }, []);
  return <div>...</div>;
}`
  },
  {
    id: 'err-5',
    errorName: 'La page se recharge brutalement lors de la soumission d\'un formulaire',
    frequentCause: 'Oubli de l\'appel à e.preventDefault() dans la fonction gestionnaire onSubmit.',
    solution: 'Toujours inclure e.preventDefault() comme première instruction du gestionnaire de formulaire.',
    codeSnippetBad: `// ERREUR :
const handleSubmit = (e) => {
  sauvegarder(data); // Rechargement MPA natif du navigateur !
};`,
    codeSnippetGood: `// SOLUTION CORRECTE :
const handleSubmit = (e) => {
  e.preventDefault(); // Bloque le rechargement SPA !
  sauvegarder(data);
};`
  }
];

export const FRONTEND_GLOSSARY: GlossaryTerm[] = [
  {
    termFr: 'Propriétés (Props)',
    termEn: 'Props (Properties)',
    definition: 'Paramètres en lecture seule transmis de manière descendante d\'un composant parent vers un enfant.',
    ofpptContext: 'Les props sont strictement immuables pour le composant qui les reçoit.'
  },
  {
    termFr: 'État Local (State)',
    termEn: 'State',
    definition: 'Données internes gérées au sein d\'un composant via useState, dont toute modification planifie un re-rendu automatique.',
    ofpptContext: 'Toujours utiliser la fonction setter (setCount) sans jamais muter la variable directement.'
  },
  {
    termFr: 'Remontée d\'État',
    termEn: 'Lifting State Up',
    definition: 'Action de déplacer un état local dans le parent commun le plus proche afin de permettre son partage entre composants frères.',
    ofpptContext: 'Pattern recommandé pour synchroniser deux composants sans recourir immédiatement à Redux.'
  },
  {
    termFr: 'Forage de Propriétés',
    termEn: 'Prop Drilling',
    definition: 'Mauvaise pratique consistant à transmettre des props à travers de multiples niveaux de composants passifs.',
    ofpptContext: 'Problème majeur résolu par l\'introduction de Redux ou du React Context.'
  },
  {
    termFr: 'Unique Source de Vérité',
    termEn: 'Single Source of Truth',
    definition: 'Principe d\'architecture où une donnée est stockée et gouvernée à un emplacement central unique (le Store Redux).',
    ofpptContext: 'Garantit la cohérence des données à travers toute l\'application.'
  },
  {
    termFr: 'Fonction Pure',
    termEn: 'Pure Function',
    definition: 'Fonction qui, pour des arguments donnés, retourne toujours le même résultat sans aucun effet secondaire.',
    ofpptContext: 'Règle absolue pour la rédaction des Reducers Redux.'
  },
  {
    termFr: 'Middleware',
    termEn: 'Middleware',
    definition: 'Module d\'extension placé entre le dispatch d\'une action et son arrivée dans le reducer.',
    ofpptContext: 'Permet la journalisation (redux-logger) ou la gestion des flux asynchrones (redux-thunk).'
  },
  {
    termFr: 'Thunk',
    termEn: 'Thunk',
    definition: 'Fonction enveloppant une opération asynchrone pour différer son exécution au sein de Redux.',
    ofpptContext: 'Standard de l\'OFPPT pour effectuer des requêtes Fetch/Axios avec Redux.'
  }
];
