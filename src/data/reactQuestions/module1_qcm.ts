import { ReactQuestion } from '../../types/reactTypes';

export const MODULE_1_QUESTIONS: ReactQuestion[] = [
  {
    id: 'm1-q1',
    moduleId: 'module1',
    difficulty: 'fondamentaux',
    tag: 'Web Statique',
    question: 'Quelle est la caractéristique fondamentale d\'un site web statique ?',
    options: [
      'Il génère dynamiquement son contenu HTML côté serveur lors de chaque requête utilisateur.',
      'Il stocke toutes ses données en mémoire vive dans une base de données NoSQL distribuée.',
      'Le contenu HTML est préexistant et délivré au navigateur sans traitement applicatif serveur.',
      'Il exécute obligatoirement des scripts CGI écrits en C++ pour compiler les pages en amont.'
    ],
    correctIndex: 2,
    explanation: 'Un site statique est constitué de fichiers pré-générés (HTML, CSS, JS) stockés sur le serveur web et délivrés tels quels au client sans traitement serveur à la volée.'
  },
  {
    id: 'm1-q2',
    moduleId: 'module1',
    difficulty: 'fondamentaux',
    tag: 'Client-Serveur',
    question: 'Dans une architecture SPA moderne, où s\'exécute principalement le code React rendu à l\'écran ?',
    options: [
      'Dans le moteur JavaScript du navigateur client (Chrome V8, SpiderMonkey, WebKit).',
      'Au niveau du serveur de base de données relationnelle via des procédures stockées.',
      'Exclusivement dans le serveur mandataire inverse (Reverse Proxy Nginx / Apache).',
      'Dans le pare-feu applicatif (WAF) filtrant les paquets réseau lors du transit.'
    ],
    correctIndex: 0,
    explanation: 'Le code React est téléchargé sous forme de bundle JavaScript et s\'exécute directement dans le moteur JavaScript du navigateur de l\'utilisateur final (côté client).'
  },
  {
    id: 'm1-q3',
    moduleId: 'module1',
    difficulty: 'fondamentaux',
    tag: 'SPA vs MPA',
    question: 'Quelle est la différence fondamentale entre une MPA (Multi-Page App) et une SPA (Single-Page App) ?',
    options: [
      'La SPA télécharge un nouveau document HTML complet à chaque transition de page interne.',
      'La SPA charge un HTML initial unique et met à jour le DOM côté client sans rechargement complet.',
      'La MPA exécute l\'intégralité de sa logique applicative et de son routage dans le navigateur.',
      'La SPA interdit formellement les requêtes HTTP asynchrones vers des API REST ou GraphQL.'
    ],
    correctIndex: 1,
    explanation: 'Dans une SPA (Single Page Application), le navigateur charge un unique squelette HTML et manipule le DOM dynamiquement via JavaScript sans jamais recharger la page entière.'
  },
  {
    id: 'm1-q4',
    moduleId: 'module1',
    difficulty: 'application',
    tag: 'Configuration Serveur',
    question: 'Pourquoi le serveur HTTP (Nginx / Apache) hébergeant une SPA doit-il rediriger toute route inconnue vers index.html ?',
    options: [
      'Pour vider systématiquement le cache DNS du fournisseur d\'accès internet du client.',
      'Pour forcer le protocole HTTPS et bloquer les connexions non chiffrées vers le port 80.',
      'Pour compresser les ressources statiques au format Brotli avant l\'envoi sur le réseau.',
      'Parce que les routes client n\'existent pas sur disque et provoqueraient une erreur 404 au rafraîchissement.'
    ],
    correctIndex: 3,
    explanation: 'Les routes d\'une SPA sont virtuelles et gérées par JavaScript (HTML5 History API). Si l\'utilisateur rafraîchit l\'URL /stagiaires, le serveur physique doit renvoyer index.html pour que React Router prenne la main.'
  },
  {
    id: 'm1-q5',
    moduleId: 'module1',
    difficulty: 'piege',
    tag: 'Sécurité Front-End',
    question: 'Pourquoi est-il interdit de stocker une clé secrète de base de données dans le code source d\'une application React ?',
    options: [
      'Parce que le bundle JavaScript est téléchargé sur le poste client et peut être inspecté dans les DevTools.',
      'Parce que le moteur Node.js refuse systématiquement de compiler du code contenant des clés privées.',
      'Parce que les navigateurs modernes désactivent automatiquement l\'affichage des variables d\'environnement.',
      'Parce que le protocole HTTP chiffre nativement les scripts et rend les requêtes illisibles pour l\'API.'
    ],
    correctIndex: 0,
    explanation: 'Tout code Front-End est public. Même minifié ou obfusqué, n\'importe quel utilisateur peut extraire les clés de sécurité depuis les outils de développement (DevTools / Network / Sources).'
  },
  {
    id: 'm1-q6',
    moduleId: 'module1',
    difficulty: 'fondamentaux',
    tag: 'DOM vs CSSOM',
    question: 'Dans le cycle de rendu d\'une page par le navigateur web, que produit la combinaison du DOM et du CSSOM ?',
    options: [
      'La conversion immédiate du flux HTML en binaire exécutable dans le registre processeur.',
      'La création d\'un index de recherche local stocké dans la mémoire de cache du disque dur.',
      'L\'arborescence de rendu (Render Tree), servant au calcul du Layout puis au tracé (Paint).',
      'L\'interruption temporaire du thread réseau pour synchroniser les cookies HTTP du client.'
    ],
    correctIndex: 2,
    explanation: 'Le moteur combine le DOM (arbre de structure) et le CSSOM (arbre de style) dans le Render Tree, puis calcule les coordonnées spatiales (Layout/Reflow) et peint les pixels (Paint).'
  },
  {
    id: 'm1-q7',
    moduleId: 'module1',
    difficulty: 'syntaxe',
    tag: 'Format de Données',
    question: 'Quel format textuel standardisé est privilégié pour l\'échange de données structurées entre une SPA React et une API REST ?',
    options: [
      'Le format binaire ASN.1 compilé pour les protocoles réseau d\'infrastructure.',
      'Le balisage XML strict avec validation DTD et transformation XSLT serveur.',
      'Les flux YAML sérialisés avec typage dynamique et ancres de références.',
      'Le format JSON (JavaScript Object Notation), léger et nativement parsable.'
    ],
    correctIndex: 3,
    explanation: 'JSON est le format textuel universel, compact et standard pour sérialiser et désérialiser des données entre une API REST et une application JavaScript Front-End.'
  },
  {
    id: 'm1-q8',
    moduleId: 'module1',
    difficulty: 'scenario',
    tag: 'Expérience Utilisateur',
    question: 'Quel est l\'impact de l\'architecture SPA sur l\'utilisation de la bande passante après le chargement initial ?',
    options: [
      'La consommation réseau augmente car l\'intégralité du template HTML est réexpédiée à chaque clic.',
      'La bande passante est optimisée car seuls les flux de données brutes (JSON) transitent sur le réseau.',
      'Le trafic réseau est nul car une SPA coupe définitivement la connexion avec le serveur après l\'init.',
      'La bande passante est strictement identique à une MPA car le DOM complet est retéléchargé sans cesse.'
    ],
    correctIndex: 1,
    explanation: 'Après le chargement initial du bundle applicatif, seuls quelques kilo-octets de données JSON circulent sur le réseau, sans renvoyer l\'en-tête, le pied de page ou les feuilles de style récurrentes.'
  },
  {
    id: 'm1-q9',
    moduleId: 'module1',
    difficulty: 'piege',
    tag: 'Contrainte SPA',
    question: 'Quelle est la principale contrepartie d\'une SPA par rapport à un site HTML statique pour le premier affichage ?',
    options: [
      'Le délai d\'affichage initial (LCP) peut être plus long à cause du téléchargement du bundle JavaScript.',
      'L\'application ne peut pas afficher de composants visuels interactifs ou de formulaires de saisie.',
      'Le navigateur exige obligatoirement une réinstallation complète de son moteur d\'exécution WebAssembly.',
      'Les utilisateurs sur mobile sont contraints d\'utiliser un simulateur pour exécuter le code JavaScript.'
    ],
    correctIndex: 0,
    explanation: 'Comme l\'application repose sur du code JavaScript qui doit être téléchargé et interprété avant d\'afficher le premier écran interactif, le premier chargement (LCP) peut être plus lent qu\'un HTML pur.'
  },
  {
    id: 'm1-q10',
    moduleId: 'module1',
    difficulty: 'fondamentaux',
    tag: 'History API',
    question: 'Quelle API standard du navigateur HTML5 permet au routeur d\'une SPA de changer l\'URL sans recharger la page ?',
    options: [
      'L\'API IndexedDB pour stocker les transactions de requêtes locales du navigateur.',
      'L\'API Service Worker pour intercepter et mettre en cache les requêtes réseau.',
      'L\'API History (window.history.pushState et l\'écoute de l\'événement popstate).',
      'L\'API Intersection Observer pour surveiller la visibilité des éléments du DOM.'
    ],
    correctIndex: 2,
    explanation: 'L\'API HTML5 History (pushState, replaceState et l\'événement popstate) permet de modifier dynamiquement l\'URL affichée sans solliciter de nouvelle requête de page auprès du serveur web.'
  }
];
