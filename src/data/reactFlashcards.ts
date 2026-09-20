import { ReactFlashcardItem } from '../types/reactTypes';

export const REACT_FLASHCARDS: ReactFlashcardItem[] = [
  // Module 1
  {
    id: 'rf-1',
    moduleId: 'module1',
    category: 'Architecture Web',
    front: 'Qu\'est-ce qu\'une Single Page Application (SPA) ?',
    back: 'Une application web qui ne charge qu\'un seul fichier HTML (index.html). Toute navigation ultérieure met à jour le DOM via JavaScript sans recharger la page.',
    codeExample: '<div id="root"></div> <!-- Unique conteneur hôte -->',
    keyPoints: [
      'Un seul document index.html initial',
      'Navigation fluide sans flash blanc',
      'Échanges en JSON via API REST'
    ]
  },
  {
    id: 'rf-2',
    moduleId: 'module1',
    category: 'Architecture Web',
    front: 'Pourquoi une SPA exige-t-elle une règle de fallback sur le serveur HTTP ?',
    back: 'Car les routes (ex: /profil) n\'existent pas sous forme de fichiers physiques sur le serveur. Toute requête entrante doit être redirigée vers index.html pour que le routeur client prenne le relais.',
    codeExample: 'Fallback Apache/Nginx: RewriteRule ^ index.html [L]',
    keyPoints: [
      'Évite l\'erreur 404 lors du rechargement',
      'Le routeur JS client résout l\'URL dans le navigateur'
    ]
  },

  // Module 2
  {
    id: 'rf-3',
    moduleId: 'module2',
    category: 'JavaScript Moderne',
    front: 'Pourquoi React exige-t-il l\'immutabilité des données ?',
    back: 'React effectue une comparaison superficielle (oldState === newState) de l\'adresse mémoire. Si vous mutez un objet sans changer sa référence, React ne détecte aucun changement et refuse de re-rendre le composant.',
    codeExample: '// Recommandé :\nconst nouveau = { ...ancien, note: 20 };',
    keyPoints: [
      'Comparaison de référence par pointeur',
      'Évite les effets de bord imprévisibles',
      'Obligatoire pour useState et Redux'
    ]
  },
  {
    id: 'rf-4',
    moduleId: 'module2',
    category: 'JavaScript Moderne',
    front: 'Quelle est la différence de portée entre "var" et "let" ?',
    back: '"var" a une portée de fonction et subit le Hoisting non sécurisé. "let" a une portée stricte de bloc {} et se trouve dans la Temporal Dead Zone (TDZ) avant sa déclaration.',
    codeExample: 'if (true) {\n  let bloqué = 10;\n}\n// bloqué est inaccessible ici !',
    keyPoints: [
      'let / const = Portée de bloc {}',
      'var = Portée de fonction (fuite de bloc)'
    ]
  },
  {
    id: 'rf-5',
    moduleId: 'module2',
    category: 'JavaScript Moderne',
    front: 'Comment cloner et ajouter un élément à un tableau de façon immuable ?',
    back: 'En utilisant l\'opérateur Spread (...). La méthode .push() est formellement proscrite car elle mute le tableau original en place.',
    codeExample: 'const nouvelleListe = [...ancienneListe, nouvelElement];',
    keyPoints: [
      'Nouvelle référence mémoire générée',
      'Bannir .push(), .splice(), .sort() direct'
    ]
  },

  // Module 3
  {
    id: 'rf-6',
    moduleId: 'module3',
    category: 'React Architecture',
    front: 'Qu\'est-ce que le Virtual DOM et la Réconciliation ?',
    back: 'Le Virtual DOM est une représentation légère en mémoire RAM du DOM réel. La réconciliation est l\'algorithme de Diffing qui calcule les modifications minimales à appliquer au DOM du navigateur pour atteindre 60 FPS.',
    codeExample: 'const vNode = { type: "h1", props: { children: "Bonjour" } };',
    keyPoints: [
      'Arbre d\'objets JavaScript légers en mémoire',
      'Batching des modifications',
      'Performance optimale 60 FPS'
    ]
  },
  {
    id: 'rf-7',
    moduleId: 'module3',
    category: 'React Architecture',
    front: 'Pourquoi un composant personnalisé doit-il commencer par une Majuscule ?',
    back: 'Pour que le compilateur JSX/Babel le distingue des balises HTML natives. <button /> désigne la balise HTML standard, tandis que <Button /> instancie votre composant React.',
    codeExample: 'function Carte() { ... } // Correct\n// function carte() { ... } // ERREUR JSX',
    keyPoints: [
      'Minuscule = Élément HTML du DOM natif',
      'Majuscule = Composant React personnalisé'
    ]
  },

  // Module 4
  {
    id: 'rf-8',
    moduleId: 'module4',
    category: 'Composants & Props',
    front: 'Qu\'est-ce que JSX et comment Babel le compile-t-il ?',
    back: 'JSX est une extension syntaxique combinant JavaScript et XML. Babel traduit chaque balise en un appel standard React.createElement(type, props, ...children).',
    codeExample: '<h1 className="titre">Test</h1>\n// -> React.createElement("h1", { className: "titre" }, "Test")',
    keyPoints: [
      'Un seul élément parent ou Fragment <>',
      'camelCase obligatoire (className, htmlFor)',
      'Expressions JS entre accolades {}'
    ]
  },
  {
    id: 'rf-9',
    moduleId: 'module4',
    category: 'Composants & Props',
    front: 'Les Props d\'un composant enfant sont-elles modifiables ?',
    back: 'NON. Les props sont STRICTEMENT en lecture seule (immuables). Tout composant doit agir comme une fonction pure vis-à-vis de ses arguments.',
    codeExample: '// ERREUR INTERDITE :\n// props.nom = "Autre";',
    keyPoints: [
      'Flux unidirectionnel descendant (Parent -> Enfant)',
      'Pour modifier une donnée, le parent doit passer un callback'
    ]
  },
  {
    id: 'rf-10',
    moduleId: 'module4',
    category: 'State & Hooks',
    front: 'Quand et pourquoi utiliser la fonction updater : setCount(prev => prev + 1) ?',
    back: 'Lorsque le nouvel état dépend de la valeur de l\'état précédent. Comme les mises à jour de state sont asynchrones et groupées (batching), la fonction updater garantit l\'utilisation de la valeur la plus fraîche.',
    codeExample: 'setCount(prev => prev + 1); // Garanti sans race condition',
    keyPoints: [
      'Mises à jour groupées et asynchrones',
      'Indispensable si plusieurs setState se succèdent'
    ]
  },

  // Module 5
  {
    id: 'rf-11',
    moduleId: 'module5',
    category: 'Listes & Formulaires',
    front: 'Pourquoi la prop "key" est-elle vitale lors d\'un rendu avec .map() ?',
    back: 'La clé permet à l\'algorithme de réconciliation de React d\'identifier chaque élément de manière unique et stable entre deux rendus, évitant de recréer tous les éléments du DOM si l\'ordre change.',
    codeExample: '{items.map(item => <Item key={item.id} {...item} />)}',
    keyPoints: [
      'Doit être unique et stable (item.id)',
      'Ne jamais utiliser l\'index si la liste peut être triée ou filtrée'
    ]
  },
  {
    id: 'rf-12',
    moduleId: 'module5',
    category: 'Listes & Formulaires',
    front: 'Pourquoi e.preventDefault() est-il obligatoire lors du onSubmit d\'un formulaire ?',
    back: 'Pour bloquer l\'action native du navigateur qui soumettrait la page en provoquant un rechargement HTTP complet, ce qui anéantirait l\'état React en mémoire de la SPA.',
    codeExample: 'const handleSubmit = (e) => {\n  e.preventDefault();\n  // Traitement SPA en JS\n};',
    keyPoints: [
      'Maintient l\'application dans l\'environnement SPA',
      'Permet la validation et l\'envoi asynchrone (Fetch)'
    ]
  },
  {
    id: 'rf-13',
    moduleId: 'module5',
    category: 'Effets & APIs',
    front: 'Comment exécuter un useEffect uniquement au montage du composant ?',
    back: 'En fournissant un tableau de dépendances vide [] comme deuxième argument.',
    codeExample: 'useEffect(() => {\n  chargerDonnees();\n}, []); // Montage unique',
    keyPoints: [
      'Équivalent à componentDidMount',
      'Sans tableau [] : s\'exécute après chaque rendu !'
    ]
  },
  {
    id: 'rf-14',
    moduleId: 'module5',
    category: 'Effets & APIs',
    front: 'À quoi sert la fonction de nettoyage (cleanup) retournée par useEffect ?',
    back: 'À libérer les ressources, annuler des abonnements ou couper des minuteurs (clearInterval) lors du démontage du composant, empêchant les fuites de mémoire.',
    codeExample: 'useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id); // Cleanup\n}, []);',
    keyPoints: [
      'S\'exécute lors du démontage',
      'Évite les timers orphelins en mémoire'
    ]
  },

  // Module 6
  {
    id: 'rf-15',
    moduleId: 'module6',
    category: 'Routage & Tests',
    front: 'Pourquoi utiliser <Link to> au lieu de <a href> dans React Router v6 ?',
    back: '<a href> recharge entièrement la page web depuis le serveur. <Link to> intercepte le clic et utilise l\'API History pour naviguer instantanément sans détruire l\'état React en mémoire.',
    codeExample: '<Link to="/stagiaires">Voir Stagiaires</Link>',
    keyPoints: [
      'Navigation instantanée zéro rechargement',
      'Préservation intégrale du state en RAM'
    ]
  },
  {
    id: 'rf-16',
    moduleId: 'module6',
    category: 'Routage & Tests',
    front: 'Quel est le rôle du composant <Outlet /> ?',
    back: 'Dans une architecture de routes imbriquées (Nested Routes), <Outlet /> désigne l\'emplacement dans le composant parent où le composant de la sous-route enfant doit être injecté.',
    codeExample: '<DashboardLayout>\n  <Sidebar />\n  <Outlet /> <!-- Vue enfant ici -->\n</DashboardLayout>',
    keyPoints: [
      'Garde les parties communes persistantes',
      'Injecte la vue enfant selon l\'URL'
    ]
  },
  {
    id: 'rf-17',
    moduleId: 'module6',
    category: 'Routage & Tests',
    front: 'Quel hook permet d\'extraire les paramètres dynamiques d\'URL (/cours/:id) ?',
    back: 'useParams(). Il retourne un objet contenant les paires clé/valeur des segments dynamiques de l\'URL sous forme de chaînes de caractères (string).',
    codeExample: 'const { id } = useParams(); // URL: /cours/42 -> id = "42"',
    keyPoints: [
      'Valeurs retournées toujours de type string',
      'Convertir avec Number(id) pour comparaisons strictes'
    ]
  },

  // Module 7
  {
    id: 'rf-18',
    moduleId: 'module7',
    category: 'Redux Core',
    front: 'Qu\'est-ce que le "Prop Drilling" et comment Redux le résout-il ?',
    back: 'Le Prop Drilling est la transmission pénible de props à travers de nombreux composants intermédiaires passifs. Redux le résout en centralisant l\'état dans un Store unique directement accessible par n\'importe quel composant via useSelector.',
    codeExample: '// Directement dans le composant cible :\nconst user = useSelector(state => state.user);',
    keyPoints: [
      'Supprime les composants relais inutiles',
      'Store = Unique source de vérité'
    ]
  },
  {
    id: 'rf-19',
    moduleId: 'module7',
    category: 'Redux Core',
    front: 'Pourquoi un Reducer Redux doit-il être une fonction pure ?',
    back: 'Pour garantir la prédictibilité absolue de l\'état. Il ne doit produire aucun effet de bord (jamais de fetch, Math.random, Date.now) et ne jamais muter le state reçu en argument.',
    codeExample: 'function reducer(state = init, action) {\n  // (state, action) => newState pur\n}',
    keyPoints: [
      'Mêmes entrées = Même sortie garantie',
      'Autorise le Time-Travel Debugging'
    ]
  },
  {
    id: 'rf-20',
    moduleId: 'module7',
    category: 'Redux Core',
    front: 'Quel est le rôle de la bibliothèque Immer dans un Reducer ?',
    back: 'Immer permet d\'écrire des mutations directes apparentes (draft.articles.push(x)) sur un brouillon (draft), tout en produisant une copie immuable parfaite en arrière-plan.',
    codeExample: 'produce(state, draft => {\n  draft.total += 100; // Mutation propre autorisée !\n})',
    keyPoints: [
      'Élimine la cascade de spread operators ...',
      'Intégrée nativement dans Redux Toolkit'
    ]
  },

  // Module 8
  {
    id: 'rf-21',
    moduleId: 'module8',
    category: 'Redux Toolkit',
    front: 'Qu\'est-ce que createSlice() dans Redux Toolkit ?',
    back: 'Une fonction qui regroupe en un seul fichier le nom, l\'état initial et les reducers. Elle auto-génère les action creators et active nativement Immer.',
    codeExample: 'const counterSlice = createSlice({\n  name: "counter",\n  initialState: { val: 0 },\n  reducers: { inc: s => { s.val += 1; } }\n});',
    keyPoints: [
      'Supprime le boilerplate de Redux classique',
      'Génère slice.actions et slice.reducer'
    ]
  },
  {
    id: 'rf-22',
    moduleId: 'module8',
    category: 'Redux Toolkit',
    front: 'Pourquoi configureStore() remplace-t-il avantageusement createStore() ?',
    back: 'Il simplifie la configuration, active automatiquement l\'extension Redux DevTools et intègre par défaut le middleware Redux-Thunk sans configuration complexe.',
    codeExample: 'export const store = configureStore({\n  reducer: { auth: authReducer, cart: cartReducer }\n});',
    keyPoints: [
      'Méthode moderne standard recommandée',
      'createStore classique est désormais obsolète'
    ]
  },
  {
    id: 'rf-23',
    moduleId: 'module8',
    category: 'Redux Toolkit',
    front: 'Quel est le rôle du middleware Redux-Thunk ?',
    back: 'Permettre à la méthode dispatch() d\'accepter des fonctions asynchrones pour exécuter des requêtes réseau (Fetch/Axios) avant d\'envoyer les actions synchrones résultantes aux reducers.',
    codeExample: 'export const chargerUsers = () => async (dispatch) => {\n  const res = await fetch("/api/users");\n  dispatch(succes(await res.json()));\n};',
    keyPoints: [
      'Gère l\'asynchronisme dans Redux',
      'Orchestre le cycle Pending -> Fulfilled -> Rejected'
    ]
  },
  {
    id: 'rf-24',
    moduleId: 'module8',
    category: 'Redux Toolkit',
    front: 'Où se situe un Middleware dans le cycle de vie d\'une action Redux ?',
    back: 'Entre le dispatch() de l\'action par le composant et son arrivée dans la fonction Reducer. Le middleware intercepte l\'action et peut la modifier, la logger ou déclencher des requêtes.',
    codeExample: 'dispatch(action) -> [ Middleware ] -> Reducer -> Store',
    keyPoints: [
      'Interception et extension',
      'Exemples : redux-logger, redux-thunk'
    ]
  }
];
