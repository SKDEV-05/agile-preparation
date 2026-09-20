import { ReactCourseModule } from '../../types/reactTypes';

export const MODULE_7: ReactCourseModule = {
  id: 'module7',
  orderNumber: 7,
  pdfReference: 'PDF 7',
  title: 'Exploiter Redux avec React JS : Le Cœur de Redux & Immer',
  subtitle: 'Résolution du Prop Drilling, Store Centralisé, Actions, Reducers Purs & Immer',
  description: 'Comprenez pourquoi et comment centraliser l\'état global d\'une application d\'envergure : architecture Store-Actions-Reducers, intégration React-Redux (Provider, useSelector, useDispatch), et simplification de l\'immutabilité avec Immer.',
  iconName: 'Database',
  gradient: 'from-[#10B981] to-[#22C55E]',
  sections: [
    {
      id: 'm7-s1',
      order: '01',
      title: 'Limites du State Local & Le Syndrome du "Prop Drilling"',
      quickSummary: 'Pourquoi le passage de props sur 10 niveaux devient ingérable et justifie Redux.',
      conceptExplanation: 'Lorsque plusieurs composants éloignés dans l\'arbre doivent partager une même donnée (ex: statut de connexion de l\'utilisateur, panier d\'achats, thème), faire transiter les props à travers des composants intermédiaires passifs s\'appelle le "Prop Drilling".',
      deepExplanation: 'Le Prop Drilling alourdit le code, crée un couplage inutile et rend la maintenance cauchemardesque : si la forme des données change, tous les composants relais doivent être modifiés. Redux résout ce problème en externalisant les données dans un conteneur unique et centralisé : le Store Global. N\'importe quel composant peut alors s\'y abonner directement.',
      keyPoints: [
        'Prop Drilling : Faire traverser des props à travers des composants qui n\'en ont pas besoin juste pour les passer à un petit-enfant.',
        'Store Global : Unique source de vérité (Single Source of Truth) accessible depuis n\'importe où dans l\'application.',
        'Quand utiliser Redux : Quand des données sont partagées par de nombreux composants distants ou évoluent fréquemment.',
        'État Local vs État Global : Un champ de formulaire éphémère ou une bascule d\'accordéon reste dans useState ; les données transverses (auth, panier) vont dans Redux.'
      ],
      examTraps: [
        'Question de discernement : "Faut-il mettre TOUT le state de l\'application dans Redux ?" Réponse : Absolument pas ! L\'état local éphémère d\'un input ou d\'une modal doit impérativement rester dans useState.'
      ],
      diagramType: 'redux_unidirectional',
      codeExamples: [
        {
          title: 'Schéma conceptuel : Prop Drilling vs Store Global Redux',
          description: 'Comparaison entre passage manuel et connexion directe.',
          code: `// AVEC PROP DRILLING (Lourd) :
// <App user={user}> -> <Layout user={user}> -> <Navbar user={user}> -> <UserAvatar user={user}>

// AVEC REDUX (Direct et découplé) :
// Dans UserAvatar.jsx :
import { useSelector } from 'react-redux';

function UserAvatar() {
  // Connexion directe au store global sans polluer Layout ni Navbar !
  const user = useSelector(state => state.user);
  return <img src={user.avatarUrl} alt={user.nom} className="rounded-full h-8 w-8" />;
}`,
          outputPreview: 'UserAvatar consomme directement le store sans passer par les intermédiaires.'
        }
      ],
      miniQuestion: {
        question: 'Qu\'est-ce que le "Prop Drilling" dans une application React ?',
        options: [
          'Un mécanisme d\'optimisation qui compresse les données des props pour accélérer la transmission aux composants enfants.',
          'Une méthode recommandée par l\'OFPPT pour synchroniser automatiquement les propriétés avec le stockage local du navigateur.',
          'Le passage contraignant de props à travers de multiples composants intermédiaires qui n\'en ont pas l\'usage direct.',
          'Un utilitaire d\'analyse statique détectant les propriétés orphelines et non typées dans l\'arbre des composants React.'
        ],
        correctIndex: 2,
        explanation: 'Le Prop Drilling survient lorsqu\'une prop doit être transmise à un composant profondément imbriqué en traversant des composants relais qui n\'ont aucun intérêt pour cette donnée.'
      },
      officialDocReference: 'OFPPT M204 Support 7 — Pages 3 à 8'
    },
    {
      id: 'm7-s2',
      order: '02',
      title: 'Les 3 Piliers de Redux : Store, Action & Reducer',
      quickSummary: 'Le flux de données unidirectionnel et la règle absolue de pureté des Reducers.',
      conceptExplanation: 'Redux repose sur 3 principes fondateurs : 1. Une seule source de vérité (le Store) ; 2. L\'état est en lecture seule (seule une Action peut demander une modification) ; 3. Les modifications sont effectuées par des fonctions pures appelées Reducers.',
      deepExplanation: 'Une Action est un simple objet JS contenant obligatoirement une propriété type (ex: { type: "CART_ADD", payload: item }). Un Reducer est une fonction pure (state, action) => newState. Pure signifie : aucun effet de bord (jamais de fetch, jamais de Math.random, jamais de Date.now) et aucune mutation directe de l\'ancien state.',
      keyPoints: [
        'Flux Unidirectionnel : Composant UI -> dispatch(action) -> Reducer pur -> Nouveau Store -> Re-rendu UI.',
        'Action : Objet déclarant l\'intention : { type: "NOM_ACTION", payload: donnees }.',
        'Reducer : Fonction pure calculant le nouvel état : (state = initial, action) => newState.',
        'Pureté absolue : Un Reducer ne doit JAMAIS exécuter d\'appel réseau ou modifier l\'état en place.'
      ],
      examTraps: [
        'Règle d\'or d\'examen : "Peut-on faire un fetch() ou un appel d\'API dans un Reducer Redux ?" Réponse formelle : STRICTEMENT INTERDIT ! Un reducer doit être 100% synchrone et pur.'
      ],
      diagramType: 'redux_unidirectional',
      codeExamples: [
        {
          title: 'Implémentation d\'un Reducer Core Redux avec switch/case',
          description: 'Structure canonique d\'un reducer pur avec gestion de l\'immutabilité.',
          code: `const etatInitial = { articles: [], total: 0 };

function panierReducer(state = etatInitial, action) {
  switch (action.type) {
    case 'AJOUTER_ARTICLE':
      return {
        ...state,
        articles: [...state.articles, action.payload],
        total: state.total + action.payload.prix
      };
    case 'VIDER_PANIER':
      return etatInitial;
    default:
      // Obligatoire : retourner l'état inchangé si l'action n'est pas gérée
      return state;
  }
}`,
          outputPreview: 'Reducer pur et prédictible prêt à être branché sur createStore().'
        }
      ],
      miniQuestion: {
        question: 'Pourquoi un Reducer Redux doit-il impérativement être une fonction pure ?',
        options: [
          'Pour permettre la mise en cache agressive des états intermédiaires dans le Service Worker du navigateur client.',
          'Pour empêcher les conflits de concurrence entre les requêtes réseau simultanées et le thread d\'affichage JavaScript.',
          'Pour autoriser le ramasse-miettes à supprimer automatiquement les anciens stores non utilisés en cours de session.',
          'Pour garantir la prédictibilité absolue de l\'état et permettre le débogage par voyage dans le temps (Time-Travel).'
        ],
        correctIndex: 3,
        explanation: 'Une fonction pure produit systématiquement le même résultat pour les mêmes entrées sans altérer l\'environnement externe. Cette pureté rend les transitions d\'état 100% fiables, reproductibles et traçables.'
      },
      officialDocReference: 'OFPPT M204 Support 7 — Pages 9 à 18'
    },
    {
      id: 'm7-s3',
      order: '03',
      title: 'Intégration React-Redux : Provider, useSelector, useDispatch & Immer',
      quickSummary: 'Connecter les composants au Store et simplifier l\'immutabilité avec produce d\'Immer.',
      conceptExplanation: 'La bibliothèque react-redux fait le pont entre React et Redux. Le composant `<Provider store={store}>` distribue le store à toute l\'application. Le hook useSelector extrait des tranches d\'état, et useDispatch permet d\'émettre des actions.',
      deepExplanation: 'Mettre à jour des objets imbriqués dans un reducer avec le spread operator (...) devient rapidement lourd et propice aux erreurs. La bibliothèque Immer révolutionne cette écriture grâce à sa fonction produce(state, draft => { ... }) : on modifie l\'argument draft comme un objet mutable ordinaire, et Immer calcule automatiquement une copie immuable parfaite en arrière-plan.',
      keyPoints: [
        '<Provider store={store}> : Enveloppe la racine de l\'application dans index.js.',
        'useSelector(state => state.panier) : S\'abonne à la portion d\'état souhaitée et déclenche le re-rendu uniquement si elle change.',
        'useDispatch() : Retourne la méthode dispatch pour envoyer des actions : dispatch({ type: "..." }).',
        'Immer (produce) : Autorise la syntaxe mutative naturelle (draft.items.push(x)) tout en préservant une immutabilité 100% stricte.'
      ],
      examTraps: [
        'Piège de syntaxe : Confondre dispatch({ type: "ADD" }) (émission d\'action) avec une simple exécution de fonction. Si vous oubliez dispatch(), l\'action n\'atteindra JAMAIS le reducer !'
      ],
      diagramType: 'redux_unidirectional',
      codeExamples: [
        {
          title: 'Utilisation de useSelector, useDispatch et Immer dans un composant',
          description: 'Composant fonctionnel connecté au Store Redux.',
          code: `import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function WidgetPanier() {
  // 1. Extraction réactive des données du store
  const total = useSelector(state => state.total);
  const nbArticles = useSelector(state => state.articles.length);

  // 2. Récupération de la fonction de dispatch
  const dispatch = useDispatch();

  const handleVider = () => {
    dispatch({ type: 'VIDER_PANIER' });
  };

  return (
    <div className="card p-3 border rounded">
      <h4>Mon Panier : {nbArticles} article(s)</h4>
      <p className="font-bold text-green-500">Montant total : {total} DH</p>
      <button onClick={handleVider} className="btn-danger mt-2">
        Vider le Panier
      </button>
    </div>
  );
}`,
          outputPreview: 'Composant connecté au Store Redux sans aucune prop transmise manuellement.'
        }
      ],
      miniQuestion: {
        question: 'Quel est l\'avantage majeur apporté par la bibliothèque Immer dans la rédaction des Reducers Redux ?',
        options: [
          'Elle autorise une syntaxe mutative naturelle (draft.valeur = x) tout en générant un nouvel état 100% immuable en coulisse.',
          'Elle gère de façon transparente les requêtes réseau asynchrones via des intercepteurs HTTP configurés automatiquement.',
          'Elle introduit un moteur de validation statique pour vérifier la signature des actions avant leur envoi vers le store.',
          'Elle substitue le hook useSelector par un flux d\'observables réactifs synchronisés en continu avec le LocalStorage.'
        ],
        correctIndex: 0,
        explanation: 'Immer utilise des Proxies JavaScript pour intercepter les modifications sur un objet temporaire "draft", produisant une copie immuable parfaite sans avoir à cascader des dizaines de spread operators.'
      },
      officialDocReference: 'OFPPT M204 Support 7 — Pages 19 à 28'
    }
  ],
  practicalChallenge: {
    title: 'Défi Pratique : Déclencher une action avec useDispatch',
    description: 'Complétez le bouton pour qu\'il dispatche une action de type "INCREMENTER" avec un payload de 5.',
    starterCode: `function BoutonBonus() {
  const dispatch = useDispatch();

  const handleClick = () => {
    // Complétez l'appel à dispatch ici :
    
  };

  return <button onClick={handleClick}>+5 Points Bonus</button>;
}`,
    expectedOutcome: 'L\'action { type: "INCREMENTER", payload: 5 } est envoyée au store.',
    solutionCode: `function BoutonBonus() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: 'INCREMENTER', payload: 5 });
  };

  return <button onClick={handleClick}>+5 Points Bonus</button>;
}`,
    explanation: 'La fonction dispatch() prend en argument un objet action contenant impérativement la propriété type et optionnellement payload.'
  },
  keyTakeaways: [
    'Redux centralise l\'état global et élimine le problème du Prop Drilling.',
    'Le flux de données est strictement unidirectionnel : UI -> dispatch(action) -> Reducer -> Store -> UI.',
    'Les Reducers sont des fonctions pures et synchrones : aucun effet de bord n\'y est autorisé.',
    'Immer simplifie drastiquement la manipulation des structures complexes dans les Reducers.'
  ],
  commonTraps: [
    'Tenter d\'effectuer des requêtes asynchrones (fetch) à l\'intérieur d\'un Reducer.',
    'Mettre la totalité de l\'état de l\'application dans Redux au lieu de conserver les états locaux dans useState.',
    'Oublier d\'envelopper l\'application dans le composant `<Provider store={store}>`.'
  ]
};
