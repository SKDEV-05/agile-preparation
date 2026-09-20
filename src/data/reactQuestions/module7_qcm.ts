import { ReactQuestion } from '../../types/reactTypes';

export const MODULE_7_QUESTIONS: ReactQuestion[] = [
  {
    id: 'm7-q1',
    moduleId: 'module7',
    difficulty: 'fondamentaux',
    tag: 'Rôle de Redux',
    question: 'Quel est l\'objectif architectural primordial justifiant l\'adoption de Redux dans une grande application React ?',
    options: [
      'Remplacer l\'usage des feuilles de style CSS par des règles de style gérées dans le serveur.',
      'Permettre l\'exécution de requêtes SQL directement depuis le code exécuté dans le navigateur.',
      'Forcer la compilation synchrone des composants pour réduire l\'utilisation de la mémoire vive.',
      'Centraliser l\'état global dans un Store unique pour éliminer le Prop Drilling et fiabiliser les flux.'
    ],
    correctIndex: 3,
    explanation: 'Redux agit comme une source unique de vérité externe (Single Source of Truth), découplant les composants et éliminant la dispersion des données à travers des dizaines de niveaux hiérarchiques.'
  },
  {
    id: 'm7-q2',
    moduleId: 'module7',
    difficulty: 'fondamentaux',
    tag: 'Les 3 Piliers Redux',
    question: 'Quels sont les trois concepts fondateurs incontournables qui constituent le cœur de l\'architecture Redux ?',
    options: [
      'Composants, Directives, Services',
      'Store, Actions, Reducers',
      'Modèles, Vues, Contrôleurs',
      'Getters, Setters, Observables'
    ],
    correctIndex: 1,
    explanation: 'L\'architecture Redux repose sur la trilogie : le Store (qui stocke l\'état central), les Actions (qui décrivent l\'intention de changement) et les Reducers (fonctions pures calculant le nouvel état).'
  },
  {
    id: 'm7-q3',
    moduleId: 'module7',
    difficulty: 'syntaxe',
    tag: 'Structure d\'une Action',
    question: 'Dans un objet Action Redux standard, quelle propriété est formellement requise pour identifier l\'opération ?',
    options: [
      'La propriété type (généralement une chaîne en majuscules constante).',
      'La propriété payload contenant obligatoirement un objet JSON.',
      'La propriété timestamp enregistrant la date d\'émission système.',
      'La propriété target référençant le composant émetteur de l\'action.'
    ],
    correctIndex: 0,
    explanation: 'Une action Redux est un objet JavaScript ordinaire devant obligatoirement posséder une propriété type (string) qui sert d\'identifiant unique lors du traitement par le réducteur.'
  },
  {
    id: 'm7-q4',
    moduleId: 'module7',
    difficulty: 'piege',
    tag: 'Pureté des Reducers',
    question: 'Quelle pratique est formellement interdite à l\'intérieur d\'une fonction Reducer Redux ?',
    options: [
      'Évaluer la propriété action.type à l\'aide d\'une instruction conditionnelle switch.',
      'Retourner un nouvel objet d\'état construit avec l\'opérateur de décomposition spread.',
      'Exécuter un effet de bord asynchrone (fetch) ou muter directement l\'argument state reçu.',
      'Déclarer une constante d\'état initial assignée par défaut au paramètre state de la fonction.'
    ],
    correctIndex: 2,
    explanation: 'Un Reducer doit être une fonction pure déterministe (même entrée = même sortie). Tout effet de bord (requête réseau, Math.random, mutation directe de l\'argument state) est strictement interdit.'
  },
  {
    id: 'm7-q5',
    moduleId: 'module7',
    difficulty: 'fondamentaux',
    tag: 'Provider React-Redux',
    question: 'Comment rendre le Store Redux accessible à l\'ensemble de l\'arbre des composants React dans une application ?',
    options: [
      'En encapsulant le composant racine <App /> avec le composant <Provider store={store}> de react-redux.',
      'En stockant la référence du store dans un cookie HTTP persistant avec l\'attribut HttpOnly activé.',
      'En assignant manuellement le store sur la variable globale window.reduxStore à l\'initialisation.',
      'En important le fichier store individuellement dans chaque fonction de composant avec require().'
    ],
    correctIndex: 0,
    explanation: 'Le composant <Provider> issu du package officiel react-redux s\'appuie sur le Context de React pour diffuser la référence du store à l\'intégralité des composants descendants.'
  },
  {
    id: 'm7-q6',
    moduleId: 'module7',
    difficulty: 'application',
    tag: 'Hook useSelector',
    question: 'À quoi sert principalement le hook useSelector() fourni par la bibliothèque react-redux ?',
    options: [
      'À émettre une action vers le store pour déclencher un reducer.',
      'À réinitialiser automatiquement tous les formulaires de l\'application.',
      'À modifier le style visuel des composants selon la largeur de fenêtre.',
      'À extraire une portion spécifique de données du Store et s\'abonner à ses évolutions.'
    ],
    correctIndex: 3,
    explanation: 'useSelector() extrait une tranche de l\'état global en exécutant une fonction sélectrice (ex: state => state.panier.total) et provoque le re-rendu du composant uniquement si la valeur retournée a changé.'
  },
  {
    id: 'm7-q7',
    moduleId: 'module7',
    difficulty: 'application',
    tag: 'Hook useDispatch',
    question: 'Comment déclencher l\'émission de l\'action { type: \'VIDER_PANIER\' } depuis un composant fonctionnel ?',
    options: [
      'const store = useStore(); store.sendAction({ type: \'VIDER_PANIER\' });',
      'const dispatch = useDispatch(); dispatch({ type: \'VIDER_PANIER\' });',
      'const action = useActionDispatcher(); action({ type: \'VIDER_PANIER\' });',
      'const context = useContext(); context.broadcast({ type: \'VIDER_PANIER\' });'
    ],
    correctIndex: 1,
    explanation: 'useDispatch() retourne la fonction dispatch du store Redux. On l\'appelle en lui fournissant l\'action sous forme d\'argument pour l\'acheminer vers les reducers.'
  },
  {
    id: 'm7-q8',
    moduleId: 'module7',
    difficulty: 'fondamentaux',
    tag: 'Bibliothèque Immer',
    question: 'Quel bénéfice majeur apporte l\'usage de la bibliothèque Immer pour la conception des Reducers Redux ?',
    options: [
      'Elle permet d\'écrire une syntaxe mutative intuitive (draft.push) tout en produisant une copie immuable.',
      'Elle convertit automatiquement le code des reducers en requêtes SQL exécutables sur le serveur.',
      'Elle supprime l\'obligation d\'utiliser des types d\'action distincts lors des dispatchs.',
      'Elle permet aux reducers d\'exécuter directement des requêtes asynchrones vers des API distantes.'
    ],
    correctIndex: 0,
    explanation: 'Immer utilise des Proxies JavaScript pour intercepter les mutations appliquées sur un objet temporaire draft. Elle génère ensuite automatiquement un nouvel arbre d\'état immuable sans cascades de décompositions {...}.'
  },
  {
    id: 'm7-q9',
    moduleId: 'module7',
    difficulty: 'scenario',
    tag: 'Flux Unidirectionnel',
    question: 'Dans le flux unidirectionnel de Redux, quel est l\'enchaînement exact des étapes lors d\'une action utilisateur ?',
    options: [
      'Store central -> Reducer pur -> Événement UI -> Dispatch d\'Action synchrone',
      'Action émise -> Store global -> Reducer direct -> Mise à jour du composant UI',
      'Clic dans l\'UI -> Reducer synchrone -> Envoi d\'Action -> Notification Store',
      'Action utilisateur -> dispatch(action) -> Reducer pur -> Nouveau State -> Rendu UI'
    ],
    correctIndex: 3,
    explanation: 'Le cycle Redux est strictement unidirectionnel : Interaction UI -> dispatch(action) -> exécution du Reducer pur -> création du nouveau State dans le Store -> notification des composants abonnés.'
  },
  {
    id: 'm7-q10',
    moduleId: 'module7',
    difficulty: 'piege',
    tag: 'Reducer Cas Inconnu',
    question: 'Que doit impérativement retourner un Reducer s\'il reçoit une action dont le type ne lui correspond pas ?',
    options: [
      'La valeur null pour signaler l\'absence de correspondance.',
      'La valeur undefined pour provoquer la réinitialisation de la branche.',
      'L\'état actuel (state) inchangé afin de préserver l\'intégrité du store.',
      'Une exception levée avec throw new Error(\'Action non supportée\').'
    ],
    correctIndex: 2,
    explanation: 'Dans un réducteur classique, la clause default: du bloc switch doit impérativement renvoyer return state; pour garantir qu\'une action non ciblée ne corrompe ni n\'efface l\'état actuel.'
  }
];
