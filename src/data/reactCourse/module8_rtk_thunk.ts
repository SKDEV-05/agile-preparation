import { ReactCourseModule } from '../../types/reactTypes';

export const MODULE_8: ReactCourseModule = {
  id: 'module8',
  orderNumber: 8,
  pdfReference: 'PDF 8',
  title: 'Redux Avancé & Redux Toolkit (RTK) : Slices, Thunk & Middlewares',
  subtitle: 'Révolution createSlice, configureStore, Pattern Asynchrone & Redux Thunk',
  description: 'Adoptez la méthode moderne officielle pour écrire du code Redux en entreprise : Redux Toolkit (RTK). Éliminez le code verbeux (boilerplate) grâce à createSlice, gérez l\'asynchronisme avec Redux-Thunk et interceptez les flux via les middlewares.',
  iconName: 'Layers',
  gradient: 'from-[#22C55E] via-[#10B981] to-[#0A0A0A]',
  sections: [
    {
      id: 'm8-s1',
      order: '01',
      title: 'La Révolution Redux Toolkit (RTK) : createSlice & configureStore',
      quickSummary: 'Éliminer 80% du code verbeux de Redux classique avec les standards modernes.',
      conceptExplanation: 'Redux classique nécessitait de créer séparément des constantes d\'action, des créateurs d\'action et de longs switch/case. L\'équipe officielle de Redux a créé Redux Toolkit (RTK), qui est désormais la SEULE façon recommandée d\'écrire du code Redux.',
      deepExplanation: 'Un Slice créé avec createSlice({ name, initialState, reducers }) regroupe en un seul fichier le nom du domaine, l\'état initial et les reducers. De plus, Immer y est activé par défaut (vous pouvez modifier directement state.valeur += 1 !), et les action creators correspondants sont automatiquement générés et exportés. configureStore() configure le store en activant par défaut les DevTools et Thunk.',
      keyPoints: [
        'Installation : npm install @reduxjs/toolkit react-redux',
        'createSlice() : Génère automatiquement les types d\'actions, les action creators et le reducer.',
        'Immer intégré : Syntaxe mutative autorisée directement dans les reducers de createSlice.',
        'configureStore() : Remplace avantageusement createStore() et combineReducers() en simplifiant la configuration.'
      ],
      examTraps: [
        'Évolution officielle : createStore() est désormais annoté comme obsolète (deprecated) dans les versions récentes de Redux au profit de configureStore() de Redux Toolkit.'
      ],
      diagramType: 'redux_unidirectional',
      codeExamples: [
        {
          title: 'Création complète d\'un Slice de compteur avec Redux Toolkit',
          description: 'Observez la concision et l\'utilisation directe de la mutation apparente.',
          code: `// src/features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { valeur: 0 },
  reducers: {
    incrementer: (state) => {
      // Mutation directe autorisée grâce à Immer intégré dans RTK !
      state.valeur += 1;
    },
    decrementer: (state) => {
      state.valeur -= 1;
    },
    ajouterMontant: (state, action) => {
      state.valeur += action.payload;
    }
  }
});

// Export automatique des Action Creators générés par RTK :
export const { incrementer, decrementer, ajouterMontant } = counterSlice.actions;

// Export du reducer pour configureStore :
export default counterSlice.reducer;`,
          outputPreview: 'Slice complet prêt à l\'emploi sans aucun switch/case ni constantes manuelles.'
        }
      ],
      miniQuestion: {
        question: 'Pourquoi la syntaxe state.valeur += 1 est-elle autorisée à l\'intérieur des reducers d\'un createSlice de Redux Toolkit ?',
        options: [
          'Parce que Redux Toolkit désactive le mode strict de JavaScript pour optimiser la vitesse de calcul des reducers.',
          'Parce que configureStore remplace automatiquement le moteur de réconciliation de React par un algorithme de comparaison récursive profonde.',
          'Parce que le compilateur TypeScript convertit nativement les mutations directes en clones immuables lors du build final.',
          'Parce que Redux Toolkit intègre la bibliothèque Immer, qui intercepte les mutations et produit une copie immuable en coulisse.'
        ],
        correctIndex: 3,
        explanation: 'Redux Toolkit intègre nativement Immer dans la méthode createSlice. Vous pouvez donc écrire du code mutatif très naturel (push, +=), qu\'Immer convertit automatiquement en mises à jour immuables sécurisées.'
      },
      officialDocReference: 'OFPPT M204 Support 8 — Pages 4 à 12'
    },
    {
      id: 'm8-s2',
      order: '02',
      title: 'Architecture par Fonctionnalité (Feature-Based) & Pattern Asynchrone API',
      quickSummary: 'Organiser son projet par domaine métier et standardiser le cycle des requêtes distantes.',
      conceptExplanation: 'Dans une application professionnelle, on organise les dossiers non pas par type technique (dossier reducers, dossier actions), mais par fonctionnalité métier (features/auth, features/cart, features/products).',
      deepExplanation: 'Un reducer devant rester 100% pur et synchrone, la communication avec une API externe suit obligatoirement le pattern des 3 actions : 1. FETCH_START (pending : active loading=true, efface l\'erreur) ; 2. FETCH_SUCCESS (fulfilled : enregistre data, loading=false) ; 3. FETCH_ERROR (rejected : enregistre error, loading=false).',
      keyPoints: [
        'Feature-Based : Chaque dossier métier regroupe son slice, son API client et ses composants visuels.',
        'Cycle des 3 actions : Pending (chargement en cours) -> Fulfilled (succès des données) -> Rejected (échec et capture d\'erreur).',
        'combineReducers : Combine plusieurs slices dans le store global sous des clés distinctes (state.auth, state.cart).',
        'Indépendance : Chaque feature gère son propre cycle de vie d\'état sans interférer avec les autres.'
      ],
      examTraps: [
        'Question piège d\'EFM : "Peut-on appeler axios.get() dans le corps d\'un reducer Redux Toolkit ?" Réponse catégorique : NON ! Les reducers doivent rester purs et synchrones, que ce soit en Redux classique ou avec RTK.'
      ],
      diagramType: 'rtk_thunk_flow',
      codeExamples: [
        {
          title: 'Configuration d\'un Store Multi-Slices avec configureStore',
          description: 'Assemblage de plusieurs fonctionnalités dans le store racine.',
          code: `// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,       // Accessible via useSelector(state => state.auth)
    cart: cartReducer,       // Accessible via useSelector(state => state.cart)
    products: productsReducer// Accessible via useSelector(state => state.products)
  }
});`,
          outputPreview: 'Store unifié et modulaire structuré par domaine métier.'
        }
      ],
      miniQuestion: {
        question: 'Quel est le pattern standard à 3 états pour gérer une requête asynchrone dans Redux ?',
        options: [
          'PENDING (attente réseau) -> FULFILLED (données reçues) -> REJECTED (capture d\'erreur)',
          'START (requête émise) -> SUCCESS (sauvegarde locale) -> FINISH (fermeture de session)',
          'REQUEST (envoi de la requête client) -> PROCESSING (calcul serveur) -> RESPONSE (retour navigateur)',
          'INIT (initialisation) -> EXEC (traitement local) -> COMPLETE (affichage à l\'écran)'
        ],
        correctIndex: 0,
        explanation: 'Le pattern universel recommandé par l\'industrie consiste à dispatcher une action au démarrage de l\'appel (pending), puis une action en cas de réponse positive (fulfilled/success), ou une action en cas d\'échec réseau (rejected/error).'
      },
      officialDocReference: 'OFPPT M204 Support 8 — Pages 13 à 20'
    },
    {
      id: 'm8-s3',
      order: '03',
      title: 'Système de Middlewares & Asynchronisme avec Redux-Thunk',
      quickSummary: 'Intercepter les actions pour orchestrer les requêtes HTTP distantes.',
      conceptExplanation: 'Un Middleware est une fonction d\'interception intercalée entre l\'émission de l\'action via dispatch() et son arrivée dans le Reducer. Il permet de journaliser des actions (redux-logger) ou d\'exécuter des traitements asynchrones (redux-thunk).',
      deepExplanation: 'Par défaut, dispatch() n\'accepte que des objets simples synchrones. Le middleware Redux-Thunk (activé d\'office dans configureStore) permet à dispatch() d\'accepter une fonction asynchrone (un Thunk) qui reçoit (dispatch, getState) en paramètres. Le Thunk peut ainsi déclencher le début de chargement, attendre la réponse fetch(), puis dispatcher le résultat dans le reducer.',
      keyPoints: [
        'Emplacement : dispatch(action) -> [ Middleware(s) ] -> Reducer -> Store.',
        'redux-logger : Affiche dans la console l\'état avant (prev state), l\'action émise et l\'état résultant (next state).',
        'Redux-Thunk : Middleware autorisant le dispatch de fonctions asynchrones pour contacter les APIs.',
        'createAsyncThunk : Utilitaire RTK qui génère automatiquement les 3 actions pending, fulfilled et rejected.'
      ],
      examTraps: [
        'Attention à la définition : Un Thunk est une fonction enveloppant une opération asynchrone dont l\'exécution est différée dans le temps.'
      ],
      diagramType: 'rtk_thunk_flow',
      codeExamples: [
        {
          title: 'Action asynchrone complète avec Redux-Thunk',
          description: 'Orchestration d\'un appel API avec dispatch des 3 phases.',
          code: `// Thunk asynchrone pour charger la liste des modules depuis l'API
export const chargerModulesDepuisAPI = () => {
  return async (dispatch, getState) => {
    // 1. Signalement du début de chargement
    dispatch({ type: 'modules/chargementEnCours' });

    try {
      const response = await fetch('https://api.ofppt.ma/v1/modules');
      if (!response.ok) throw new Error('Erreur HTTP ' + response.status);
      const donnees = await response.json();

      // 2. En cas de succès, injection des données dans le reducer
      dispatch({ type: 'modules/succes', payload: donnees });
    } catch (erreur) {
      // 3. En cas d'échec, transmission du message d'erreur
      dispatch({ type: 'modules/erreur', payload: erreur.message });
    }
  };
};

// Dans le composant React :
// useEffect(() => { dispatch(chargerModulesDepuisAPI()); }, [dispatch]);`,
          outputPreview: 'Exécution asynchrone contrôlée avec gestion des états de chargement et d\'erreur.'
        }
      ],
      miniQuestion: {
        question: 'Quel est le rôle principal du middleware Redux-Thunk dans une application React/Redux ?',
        options: [
          'Accélérer les calculs de comparaison du Virtual DOM en compressant les arbres de composants lors des changements d\'état.',
          'Fournir un mécanisme complet de navigation et de gestion dynamique d\'URLs évitant l\'utilisation de bibliothèques tierces de routage.',
          'Permettre à dispatch() d\'accepter des fonctions asynchrones pour orchestrer des appels API avant d\'envoyer les actions finales.',
          'Générer dynamiquement le balisage JSX et les écouteurs d\'événements à partir du schéma déclaratif du Store central.'
        ],
        correctIndex: 2,
        explanation: 'Redux-Thunk intercepte les fonctions passées à dispatch() et leur fournit (dispatch, getState) en arguments, permettant ainsi d\'effectuer des requêtes asynchrones (fetch/axios) avant d\'envoyer les actions finales aux reducers.'
      },
      officialDocReference: 'OFPPT M204 Support 8 — Pages 21 à 32'
    }
  ],
  practicalChallenge: {
    title: 'Défi Pratique : Déclenchement d\'un Thunk asynchrone au montage',
    description: 'Complétez le hook useEffect pour déclencher l\'action thunk chargerProduits() au montage du composant.',
    starterCode: `function CatalogueView() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Déclenchez l'action Thunk ici :
    
  }, [dispatch]);

  return <div>Catalogue des Produits</div>;
}`,
    expectedOutcome: 'Le composant dispatche le Thunk au montage.',
    solutionCode: `function CatalogueView() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(chargerProduits());
  }, [dispatch]);

  return <div>Catalogue des Produits</div>;
}`,
    explanation: 'Le hook useEffect avec [dispatch] en dépendance déclenche le Thunk asynchrone une seule fois lors du montage du composant.'
  },
  keyTakeaways: [
    'Redux Toolkit (RTK) est le standard absolu moderne : il remplace createStore par configureStore.',
    'createSlice rassemble l\'état initial, les reducers et auto-génère les action creators.',
    'Immer est activé par défaut dans RTK : la mutation apparente y est 100% sécurisée.',
    'Redux-Thunk permet d\'orchestrer le cycle asynchrone (pending, fulfilled, rejected) pour communiquer avec les APIs.'
  ],
  commonTraps: [
    'Tenter d\'effectuer des requêtes fetch directement dans les reducers de createSlice.',
    'Oublier d\'exporter les action creators extraits de slice.actions.',
    'Oublier d\'exporter le reducer par défaut avec slice.reducer.'
  ]
};
