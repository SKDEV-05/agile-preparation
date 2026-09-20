import { ReactQuestion } from '../../types/reactTypes';

export const MODULE_8_QUESTIONS: ReactQuestion[] = [
  {
    id: 'm8-q1',
    moduleId: 'module8',
    difficulty: 'fondamentaux',
    tag: 'Redux Toolkit (RTK)',
    question: 'Pourquoi Redux Toolkit (RTK) est-il devenu le standard officiel recommandé pour le développement Redux ?',
    options: [
      'Parce qu\'il supprime la nécessité de déclarer des composants fonctionnels dans l\'application.',
      'Parce qu\'il simplifie la configuration, élimine le boilerplate et intègre Immer et Thunk par défaut.',
      'Parce qu\'il remplace le navigateur web en exécutant le code directement dans le registre matériel.',
      'Parce qu\'il impose une syntaxe de classes JavaScript héritées de langages compilés comme C# ou Java.'
    ],
    correctIndex: 1,
    explanation: 'Redux Toolkit a été conçu pour standardiser et simplifier l\'usage de Redux en fournissant des abstractions modernes (configureStore, createSlice) qui intègrent les meilleures pratiques par défaut.'
  },
  {
    id: 'm8-q2',
    moduleId: 'module8',
    difficulty: 'syntaxe',
    tag: 'createSlice',
    question: 'Que regroupe la fonction createSlice() de Redux Toolkit en un seul objet déclaratif ?',
    options: [
      'Le nom du segment (name), l\'état initial (initialState) et l\'ensemble des fonctions reducers associées.',
      'Les feuilles de styles CSS, les polices de caractères et les images statiques du répertoire public.',
      'Les règles de routage serveur Nginx et les certificats de sécurité SSL pour l\'infrastructure hôte.',
      'Les tests unitaires Jest et les instantanés de rendu (snapshots) du composant visualisé.'
    ],
    correctIndex: 0,
    explanation: 'createSlice regroupe le nommage de la tranche de state, la valeur initiale et les fonctions de mutation dans une unique structure, générant automatiquement les types d\'actions et les créateurs d\'action correspondants.'
  },
  {
    id: 'm8-q3',
    moduleId: 'module8',
    difficulty: 'fondamentaux',
    tag: 'configureStore',
    question: 'Quels bénéfices fondamentaux apporte configureStore() par rapport à l\'ancienne fonction createStore() ?',
    options: [
      'Elle empêche les stagiaires de modifier le code sans validation d\'un mot de passe administrateur.',
      'Elle force l\'utilisation exclusive d\'appels réseau synchrones bloquants vers l\'API du serveur.',
      'Elle active par défaut l\'extension Redux DevTools et configure les middlewares standards dont Thunk.',
      'Elle compile automatiquement l\'ensemble du projet dans un binaire exécutable sans dépendance Node.'
    ],
    correctIndex: 2,
    explanation: 'configureStore regroupe les reducers passés en paramètre, injecte automatiquement redux-thunk et les middlewares de validation en développement, et connecte les DevTools sans code d\'assemblage fastidieux.'
  },
  {
    id: 'm8-q4',
    moduleId: 'module8',
    difficulty: 'fondamentaux',
    tag: 'Middlewares',
    question: 'Où se positionne un Middleware dans la chaîne d\'exécution d\'une application Redux ?',
    options: [
      'Après l\'affichage final et le calcul des coordonnées géométriques des nœuds du DOM réel.',
      'Dans la couche de base de données relationnelle distante hébergée sur le serveur Back-End.',
      'Avant même que l\'utilisateur n\'ait déplacé le pointeur de sa souris sur un élément bouton.',
      'Entre le dispatch d\'une action et le moment où cette action parvient à la fonction Reducer.'
    ],
    correctIndex: 3,
    explanation: 'Un middleware s\'intercale entre l\'émission de l\'action via dispatch() et sa consommation par le Reducer, permettant d\'intercepter l\'action pour logger, valider ou exécuter un traitement asynchrone.'
  },
  {
    id: 'm8-q5',
    moduleId: 'module8',
    difficulty: 'fondamentaux',
    tag: 'Redux-Thunk',
    question: 'Quel est le rôle technique principal du middleware Redux-Thunk dans une architecture applicative ?',
    options: [
      'Désactiver l\'accès aux DevTools pour empêcher les utilisateurs d\'inspecter l\'arbre d\'état.',
      'Permettre au dispatch d\'accepter des fonctions asynchrones pour orchestrer des appels d\'API.',
      'Forcer le navigateur à vider le cache applicatif local à chaque chargement de composant.',
      'Générer automatiquement des modèles de données SQL à partir des états déclarés dans Redux.'
    ],
    correctIndex: 1,
    explanation: 'Par défaut, dispatch n\'accepte que des objets JavaScript synchrones. Redux-Thunk étend cette capacité pour recevoir des fonctions asynchrones qui peuvent invoquer fetch puis dispatcher les résultats dans le store.'
  },
  {
    id: 'm8-q6',
    moduleId: 'module8',
    difficulty: 'application',
    tag: 'Pattern Asynchrone',
    question: 'Lors de l\'utilisation de createAsyncThunk dans RTK, quels sont les trois états de cycle de vie générés ?',
    options: [
      'init, process, complete',
      'open, in-progress, closed',
      'pending, fulfilled, rejected',
      'try, catch, finally'
    ],
    correctIndex: 2,
    explanation: 'createAsyncThunk génère automatiquement les types d\'actions : pending (promesse en cours), fulfilled (promesse résolue avec succès) et rejected (promesse rejetée avec une erreur).'
  },
  {
    id: 'm8-q7',
    moduleId: 'module8',
    difficulty: 'piege',
    tag: 'Immer dans createSlice',
    question: 'Dans un reducer créé avec createSlice, pourquoi l\'instruction state.valeur += 1 ne viole-t-elle pas l\'immutabilité ?',
    options: [
      'Parce que les types primitifs numériques sont exemptés des contraintes d\'immutabilité en JavaScript.',
      'Parce que le navigateur internet intercepte l\'assignation et crée une référence temporaire isolée.',
      'Parce que Redux Toolkit réécrit le code machine pour neutraliser l\'opérateur d\'assignation +=.',
      'Parce que createSlice intègre Immer qui convertit cette mutation apparente en nouvelle copie immuable.'
    ],
    correctIndex: 3,
    explanation: 'createSlice encapsule la bibliothèque Immer. La mutation directe appliquée sur le draft est interceptée par des proxies et convertie en une copie immuable sûre sous le capot.'
  },
  {
    id: 'm8-q8',
    moduleId: 'module8',
    difficulty: 'application',
    tag: 'Export de Slice',
    question: 'Soit const userSlice = createSlice({ name: \'user\', ... }). Comment exporter les action creators générés ?',
    options: [
      'export const { login, logout } = userSlice.actions;',
      'export default userSlice.actions.creators;',
      'export const actions = userSlice.reducers.list;',
      'export { userSlice.actions as actionCreators };'
    ],
    correctIndex: 0,
    explanation: 'Les créateurs d\'actions générés à partir des clés du bloc reducers de createSlice sont regroupés dans la propriété .actions de l\'objet slice retourné.'
  },
  {
    id: 'm8-q9',
    moduleId: 'module8',
    difficulty: 'scenario',
    tag: 'Redux Logger',
    question: 'Quel est l\'intérêt d\'intégrer le middleware redux-logger dans l\'environnement de développement local ?',
    options: [
      'Interdire les requêtes réseau dont le temps de transit excède la limite maximale autorisée.',
      'Afficher dans la console du navigateur le state précédent, l\'action émise et le state résultant.',
      'Sauvegarder l\'état de l\'application dans un document tableur téléchargeable à la volée.',
      'Corriger automatiquement les fautes de syntaxe détectées dans les composants fonctionnels.'
    ],
    correctIndex: 1,
    explanation: 'redux-logger offre une traçabilité visuelle immédiate dans la console du navigateur : il affiche le snapshot du state avant l\'action, l\'action avec son payload, et le nouvel état résultant.'
  },
  {
    id: 'm8-q10',
    moduleId: 'module8',
    difficulty: 'fondamentaux',
    tag: 'Feature-Based Structure',
    question: 'Dans une structure par fonctionnalité (Feature-Driven), comment organise-t-on le dossier src/features/stagiaires/ ?',
    options: [
      'On y regroupe tous les scripts tiers et bibliothèques NPM installées dans le projet client.',
      'On y stocke exclusivement les assets graphiques et les fichiers de polices typographiques.',
      'On y rassemble le slice RTK, les composants visuels et les appels API propres à ce domaine métier.',
      'Ce type de structure est interdit par les recommandations officielles de la documentation React.'
    ],
    correctIndex: 2,
    explanation: 'L\'architecture Feature-Driven (ou Feature-Sliced) préconise de regrouper le state (slice), les composants visuels, et les services d\'un même périmètre métier dans un dossier cohérent et autonome.'
  }
];
