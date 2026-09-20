import { ReactQuestion } from '../../types/reactTypes';

export const MODULE_3_QUESTIONS: ReactQuestion[] = [
  {
    id: 'm3-q1',
    moduleId: 'module3',
    difficulty: 'fondamentaux',
    tag: 'Nature de React',
    question: 'Sur le plan technique et architectural strict, qu\'est-ce que React JS ?',
    options: [
      'Un framework Back-End orienté micro-services pour orchestrer des conteneurs applicatifs.',
      'Une bibliothèque JavaScript déclarative et efficace conçue pour créer des interfaces utilisateur.',
      'Un environnement d\'exécution serveur complet venant concurrencer directement le runtime Node.js.',
      'Un moteur de base de données relationnelle en mémoire intégré dans les navigateurs récents.'
    ],
    correctIndex: 1,
    explanation: 'React est une bibliothèque JavaScript spécialisée dans la création de composants d\'interface utilisateur (UI). Contrairement à un framework complet (comme Angular), il ne prend en charge que la couche vue.'
  },
  {
    id: 'm3-q2',
    moduleId: 'module3',
    difficulty: 'fondamentaux',
    tag: 'Virtual DOM',
    question: 'Qu\'est-ce que le Virtual DOM (VDOM) dans l\'architecture interne de React ?',
    options: [
      'Une extension binaire pour accélérer le traitement graphique WebGL de la carte vidéo.',
      'Un pilote matériel émulant des périphériques tactiles dans les navigateurs de bureau.',
      'Une copie physique du système de fichiers stockée dans le cache du serveur mandataire.',
      'Une représentation légère en mémoire sous forme d\'objets JS synchronisée avec le DOM réel.'
    ],
    correctIndex: 3,
    explanation: 'Le Virtual DOM est un arbre d\'objets JavaScript conservé en mémoire vive. React l\'utilise pour calculer rapidement les modifications nécessaires avant d\'appliquer le strict minimum de retouches au DOM réel.'
  },
  {
    id: 'm3-q3',
    moduleId: 'module3',
    difficulty: 'application',
    tag: 'Réconciliation',
    question: 'En quoi consiste l\'algorithme de réconciliation (Diffing algorithm) de React ?',
    options: [
      'À comparer deux arbres virtuels pour identifier le strict minimum de nœuds à mettre à jour dans le DOM réel.',
      'À reformater automatiquement le code source selon les règles syntaxiques du guide de style de l\'équipe.',
      'À synchroniser les tables relationnelles distantes avec les variables locales lors d\'une déconnexion réseau.',
      'À compiler le code JSX en assembleur machine avant son injection dans la mémoire vive de l\'ordinateur.'
    ],
    correctIndex: 0,
    explanation: 'L\'algorithme de réconciliation (Diffing) compare l\'ancienne et la nouvelle version du Virtual DOM avec une complexité quasi-linéaire O(n) afin de ne manipuler dans le DOM navigateur que ce qui a réellement changé.'
  },
  {
    id: 'm3-q4',
    moduleId: 'module3',
    difficulty: 'piege',
    tag: 'Nommage Composant',
    question: 'Pourquoi devez-vous impérativement nommer les composants React avec une majuscule (ex: <Profil /> et non <profil />) ?',
    options: [
      'Pour que le système de fichiers Windows ne confonde pas les modules avec des exécutables système.',
      'Pour permettre au serveur d\'application de compresser les balises au format de transfert Brotli.',
      'Pour que JSX distingue les balises HTML natives (minuscules) des composants personnalisés (majuscules).',
      'Pour signaler au moteur JavaScript que le composant doit être exécuté dans un thread Web Worker séparé.'
    ],
    correctIndex: 2,
    explanation: 'Le compilateur JSX interprète toute balise débutant par une minuscule comme un élément standard du HTML (<div />, <p />). Une majuscule initiale indique à Babel d\'instancier un composant React personnalisé.'
  },
  {
    id: 'm3-q5',
    moduleId: 'module3',
    difficulty: 'fondamentaux',
    tag: 'Point d\'entrée',
    question: 'Sous React 18+, quelle instruction officielle initialise la racine et monte l\'application dans le HTML ?',
    options: [
      'const root = ReactDOM.createRoot(document.getElementById(\'root\')); root.render(<App />);',
      'ReactDOM.render(<App />, document.getElementById(\'root\'));',
      'React.mountComponent(<App />, document.querySelector(\'#root\'));',
      'document.getElementById(\'root\').attachShadow({ mode: \'open\' }).render(<App />);'
    ],
    correctIndex: 0,
    explanation: 'Depuis React 18, createRoot remplace l\'ancienne méthode ReactDOM.render() dépréciée pour activer les capacités de rendu concurrent et de batching automatique.'
  },
  {
    id: 'm3-q6',
    moduleId: 'module3',
    difficulty: 'piege',
    tag: 'StrictMode',
    question: 'Pourquoi les effets useEffect sans dépendances s\'exécutent-ils deux fois au montage en mode développement ?',
    options: [
      'Parce que le navigateur internet recharge involontairement la page HTML deux fois consécutives.',
      'Parce que le serveur de dev Vite duplique les requêtes réseau pour tester la latence de transit.',
      'Parce que <React.StrictMode> monte et remonte le composant pour détecter les fuites et effets non nettoyés.',
      'Parce que le moteur JavaScript compile le script une première fois pour vérifier les types TypeScript.'
    ],
    correctIndex: 2,
    explanation: 'En développement, <React.StrictMode> déclenche un cycle de montage/démontage/remontage intentionnel pour aider les développeurs à vérifier la présence de fonctions de nettoyage (cleanups) adéquates.'
  },
  {
    id: 'm3-q7',
    moduleId: 'module3',
    difficulty: 'fondamentaux',
    tag: 'Dossier public vs src',
    question: 'Pourquoi est-il généralement recommandé de placer les images des composants dans src/assets plutôt que dans public/ ?',
    options: [
      'Parce que le dossier public est réservé exclusivement aux fichiers de style CSS et aux scripts externes.',
      'Parce que les fichiers dans public/ sont systématiquement supprimés lors de l\'exécution de npm run build.',
      'Parce que src/assets convertit automatiquement les images vectorielles SVG en code source TypeScript natif.',
      'Parce que les assets de src/ sont traités par le bundler (hachage de cache, optimisation et détection d\'erreurs).'
    ],
    correctIndex: 3,
    explanation: 'Importer une image depuis src/ permet au bundler (Webpack ou Vite) de vérifier l\'existence du fichier au build, d\'injecter un hash unique pour le cache HTTP du navigateur et d\'optimiser la taille.'
  },
  {
    id: 'm3-q8',
    moduleId: 'module3',
    difficulty: 'syntaxe',
    tag: 'Commandes CRA / Vite',
    question: 'Quelle commande npm compile et minifie l\'ensemble du projet React dans un dossier prêt pour la production ?',
    options: [
      'npm start',
      'npm run build',
      'npm test --prod',
      'npm run serve'
    ],
    correctIndex: 1,
    explanation: 'npm run build lance le processus de build de production qui minifie les scripts, extrait et compresse les styles CSS, et génère les artefacts finaux dans le répertoire dist/ ou build/.'
  },
  {
    id: 'm3-q9',
    moduleId: 'module3',
    difficulty: 'scenario',
    tag: 'Architecture Composants',
    question: 'Quel est l\'avantage architectural central du paradigme orienté composants (Component-Driven Architecture) ?',
    options: [
      'Supprimer totalement l\'obligation de tester l\'application avant son déploiement sur les serveurs.',
      'Permettre l\'exécution du code JavaScript sans nécessiter de moteur d\'interprétation dans le client.',
      'Forcer tous les développeurs d\'une équipe à utiliser exactement le même éditeur de texte intégré.',
      'Encapsuler la structure, la logique et le style dans des briques modulaires, isolées et réutilisables.'
    ],
    correctIndex: 3,
    explanation: 'Le modèle à base de composants découpe l\'interface en éléments autonomes dotés de leurs propres responsabilités, favorisant la maintenabilité, la réutilisabilité et les tests ciblés.'
  },
  {
    id: 'm3-q10',
    moduleId: 'module3',
    difficulty: 'fondamentaux',
    tag: 'Flux de données',
    question: 'Quel est le sens de circulation du flux de données canonique dans une hiérarchie de composants React ?',
    options: [
      'Unidirectionnel descendant : les données circulent des composants parents vers les composants enfants via les props.',
      'Bidirectionnel automatique : toute modification dans un enfant met à jour l\'état du parent sans callback explicite.',
      'Uniquement ascendant : seuls les composants feuilles ont le droit de posséder un état et de le propager vers le haut.',
      'Circulaire asynchrone : les données gravitent dans un bus d\'événements sans notion de hiérarchie parent-enfant.'
    ],
    correctIndex: 0,
    explanation: 'React impose un flux unidirectionnel (One-Way Data Binding) : les données s\'écoulent du haut vers le bas par les props. La modification de ces données passe par des fonctions de rappel (callbacks) transmises aux enfants.'
  }
];
