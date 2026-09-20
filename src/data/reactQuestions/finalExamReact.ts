import { ReactQuestion } from '../../types/reactTypes';

/**
 * EXAMEN DE FIN DE MODULE (EFM) - SYNTHÈSE REACT OFPPT
 * 40 questions dédiées et distinctes couvrant l'intégralité des 8 modules (5 questions par module).
 * Distribution rigoureusement équilibrée : 10 A (25%), 10 B (25%), 10 C (25%), 10 D (25%).
 */
export const FINAL_EXAM_REACT_QUESTIONS: ReactQuestion[] = [
  // ==========================================
  // MODULE 1 : Web Moderne, SPA & Architecture (5 questions)
  // ==========================================
  {
    id: 're-efm-01',
    moduleId: 'module1',
    difficulty: 'fondamentaux',
    tag: 'Protocole HTTP',
    question: 'Quel code de statut HTTP indique que la ressource demandée par une SPA a été créée avec succès sur le serveur ?',
    options: [
      '201 Created',
      '200 OK',
      '204 No Content',
      '301 Moved Permanently'
    ],
    correctIndex: 0,
    explanation: 'Le code HTTP 201 Created signale que la requête POST a réussi et a entraîné la création effective d\'une nouvelle ressource sur le serveur.'
  },
  {
    id: 're-efm-02',
    moduleId: 'module1',
    difficulty: 'application',
    tag: 'Hydratation & Rendu',
    question: 'En quoi consiste le processus d\'hydratation (Hydration) dans les architectures combinant SSR et React ?',
    options: [
      'À compresser les feuilles de style CSS avant de les injecter dans le DOM du navigateur.',
      'À purger la mémoire cache du serveur mandataire inverse pour réactualiser les requêtes.',
      'À attacher les écouteurs d\'événements et l\'état React sur le balisage HTML pré-rendu par le serveur.',
      'À convertir le flux JavaScript client en code assembleur exécutable sur la machine cliente.'
    ],
    correctIndex: 2,
    explanation: 'L\'hydratation est l\'étape où React s\'attache au HTML déjà généré par le serveur pour injecter les gestionnaires d\'événements et activer l\'interactivité de la vue.'
  },
  {
    id: 're-efm-03',
    moduleId: 'module1',
    difficulty: 'fondamentaux',
    tag: 'Code Splitting',
    question: 'Quel est l\'intérêt primordial de la technique de découpage de code (Code Splitting) dans une SPA React ?',
    options: [
      'Supprimer définitivement l\'utilisation de bibliothèques tierces dans le code du projet.',
      'Diviser le bundle JavaScript en segments chargés à la demande pour accélérer le premier affichage.',
      'Forcer le navigateur à exécuter tous les composants dans des threads parallèles distincts.',
      'Crypter les identifiants de connexion utilisateur avant chaque transmission réseau HTTP.'
    ],
    correctIndex: 1,
    explanation: 'Le code splitting découpe le bundle global en morceaux (chunks) chargés dynamiquement (lazy loading), évitant de télécharger des vues non requises lors de la visite initiale.'
  },
  {
    id: 're-efm-04',
    moduleId: 'module1',
    difficulty: 'piege',
    tag: 'Sécurité XSS',
    question: 'Comment React protège-t-il nativement les applications contre les attaques de type Cross-Site Scripting (XSS) ?',
    options: [
      'En bloquant systématiquement toutes les requêtes réseau émanant d\'un nom de domaine distant.',
      'En exigeant l\'installation obligatoire d\'un certificat de sécurité côté poste client.',
      'En désactivant l\'exécution des fonctions asynchrones à l\'intérieur des composants visuels.',
      'En échappant automatiquement les chaînes de caractères insérées dans le JSX avant le rendu DOM.'
    ],
    correctIndex: 3,
    explanation: 'React convertit toute chaîne insérée entre accolades JSX en texte brut échappé, empêchant l\'injection malveillante de balises <script> non autorisées.'
  },
  {
    id: 're-efm-05',
    moduleId: 'module1',
    difficulty: 'application',
    tag: 'CORS & Headers',
    question: 'Quel en-tête HTTP le serveur d\'API doit-il inclure pour autoriser une SPA React hébergée sur un autre domaine à consommer ses données ?',
    options: [
      'Access-Control-Allow-Origin: *',
      'Content-Security-Policy: default-src',
      'X-Content-Type-Options: nosniff',
      'Strict-Transport-Security: max-age=31536000'
    ],
    correctIndex: 0,
    explanation: 'L\'en-tête Access-Control-Allow-Origin indique au mécanisme CORS du navigateur que l\'origine cliente est habilitée à lire les réponses de l\'API.'
  },

  // ==========================================
  // MODULE 2 : JavaScript Moderne ES6+ (5 questions)
  // ==========================================
  {
    id: 're-efm-06',
    moduleId: 'module2',
    difficulty: 'syntaxe',
    tag: 'Promesses & Asynchronisme',
    question: 'Dans une structure try / catch / finally avec async/await, quand le bloc finally est-il exécuté ?',
    options: [
      'Uniquement si une exception réseau a été capturée par le bloc catch.',
      'Dans tous les cas de figure, que la promesse ait réussi ou qu\'une erreur soit survenue.',
      'Seulement si la fonction retourne une valeur booléenne valant true.',
      'Exclusivement si le temps de réponse de l\'API a dépassé le délai imparti.'
    ],
    correctIndex: 1,
    explanation: 'Le bloc finally s\'exécute toujours à la fin du traitement, ce qui en fait l\'emplacement idéal pour désactiver un indicateur de chargement (setLoading(false)).'
  },
  {
    id: 're-efm-07',
    moduleId: 'module2',
    difficulty: 'piege',
    tag: 'Méthodes de Tableau',
    question: 'Parmi les méthodes suivantes de tableau JavaScript, laquelle est STRICTEMENT INTERDITE pour modifier un State car elle mute le tableau en place ?',
    options: [
      'tableau.filter(item => item.id !== idSupprime)',
      'tableau.map(item => ({ ...item, actif: true }))',
      'tableau.concat([nouvelElement])',
      'tableau.splice(index, 1)'
    ],
    correctIndex: 3,
    explanation: 'splice() modifie directement le tableau d\'origine en mémoire. En React, il faut utiliser des méthodes immutables comme filter() ou slice() qui renvoient une nouvelle instance.'
  },
  {
    id: 're-efm-08',
    moduleId: 'module2',
    difficulty: 'syntaxe',
    tag: 'Déstructuration Avancée',
    question: 'Soit const config = { port: 8080 }; Quelle syntaxe extrait la clé port en la renommant serverPort avec une valeur de repli 3000 ?',
    options: [
      'const { port = 3000 as serverPort } = config;',
      'const { port -> serverPort = 3000 } = config;',
      'const { port: serverPort = 3000 } = config;',
      'const { serverPort = config.port || 3000 };'
    ],
    correctIndex: 2,
    explanation: 'La syntaxe ES6 { port: serverPort = 3000 } associe le renommage de propriété (: serverPort) et l\'assignation d\'une valeur par défaut (= 3000).'
  },
  {
    id: 're-efm-09',
    moduleId: 'module2',
    difficulty: 'fondamentaux',
    tag: 'Opérateur Nullish Coalescing',
    question: 'Quelle est la différence fondamentale entre l\'opérateur de coalescence des nuls (??) et l\'opérateur logique OU (||) ?',
    options: [
      '?? ne bascule sur la valeur de droite que pour null ou undefined, préservant 0 et "" comme valeurs valides.',
      '|| vérifie uniquement les types booléens stricts tandis que ?? évalue toutes les expressions numériques.',
      '?? convertit automatiquement le résultat en promesse asynchrone résolue dans la boucle d\'événements.',
      '|| est une syntaxe obsolète dépréciée par les standards de la spécification ECMAScript moderne.'
    ],
    correctIndex: 0,
    explanation: 'L\'opérateur || considère 0, \'\' et false comme falsy et bascule sur la valeur par défaut. L\'opérateur ?? ne réagit qu\'à null et undefined (valeurs nullish).'
  },
  {
    id: 're-efm-10',
    moduleId: 'module2',
    difficulty: 'application',
    tag: 'Chaînage Optionnel',
    question: 'Quelle est la valeur de const ville = stagiaire?.adresse?.ville si la propriété adresse vaut undefined ?',
    options: [
      'Une exception Uncaught TypeError est immédiatement levée par le moteur.',
      'La chaîne de caractères textuelle "undefined".',
      'La valeur primitive undefined sans déclencher d\'erreur dans le script.',
      'La valeur primitive null par conversion automatique de type.'
    ],
    correctIndex: 2,
    explanation: 'Le chaînage optionnel (?.) court-circuite l\'évaluation dès qu\'une référence est nullish (null ou undefined) et retourne immédiatement undefined en toute sécurité.'
  },

  // ==========================================
  // MODULE 3 : Découverte de React & Écosystème (5 questions)
  // ==========================================
  {
    id: 're-efm-11',
    moduleId: 'module3',
    difficulty: 'fondamentaux',
    tag: 'Composabilité',
    question: 'Quel est le principe d\'architecture préconisé par React pour composer des interfaces complexes ?',
    options: [
      'Écrire des composants volumineux monolithiques gérant l\'intégralité des données de l\'écran.',
      'Décomposer l\'interface en petits composants modulaires dotés d\'une responsabilité unique et isolée.',
      'Fusionner toutes les fonctions de requêtes serveur directement dans le fichier HTML de départ.',
      'Éviter l\'utilisation de balises imbriquées pour ne pas alourdir l\'arborescence du DOM réel.'
    ],
    correctIndex: 1,
    explanation: 'Le Single Responsibility Principle appliqué aux composants React garantit que chaque composant effectue une seule tâche clairement définie, simplifiant la maintenance et les tests.'
  },
  {
    id: 're-efm-12',
    moduleId: 'module3',
    difficulty: 'fondamentaux',
    tag: 'Heuristique de Diffing',
    question: 'Sur quelle hypothèse repose l\'algorithme de Diffing de React pour comparer deux arbres en temps O(n) ?',
    options: [
      'Deux éléments de types différents produiront des arbres identiques après compilation.',
      'Toutes les balises HTML possèdent obligatoirement un identifiant numérique généré par le serveur.',
      'Les composants React ne peuvent jamais être réordonnés au sein d\'une même collection parente.',
      'Deux éléments de types différents produiront des arbres différents, et les listes utilisent des clés stables.'
    ],
    correctIndex: 3,
    explanation: 'React fait deux hypothèses heuristiques : deux éléments de types différents engendrent des sous-arbres différents, et les éléments de listes peuvent être identifiés de manière stable via la prop key.'
  },
  {
    id: 're-efm-13',
    moduleId: 'module3',
    difficulty: 'fondamentaux',
    tag: 'Cycle de Vie',
    question: 'Quelles sont les 3 grandes phases qui rythment l\'existence d\'un composant dans l\'interface React ?',
    options: [
      'Montage (Mounting), Mise à jour (Updating), Démontage (Unmounting)',
      'Compilation (Parsing), Assemblage (Linking), Exécution (Runtime)',
      'Initialisation (Setup), Récursion (Looping), Terminaison (Abort)',
      'Téléchargement (Fetch), Interprétation (Eval), Archivage (Purge)'
    ],
    correctIndex: 0,
    explanation: 'Le cycle de vie comprend le Montage (insertion initiale dans le DOM), la Mise à jour (re-rendu déclenché par props ou state) et le Démontage (suppression du DOM).'
  },
  {
    id: 're-efm-14',
    moduleId: 'module3',
    difficulty: 'syntaxe',
    tag: 'Semver package.json',
    question: 'Dans un fichier package.json, que signifie le symbole caret dans la dépendance "react": "^18.2.0" ?',
    options: [
      'Interdire formellement toute mise à jour de la bibliothèque sans accord administrateur.',
      'Autoriser l\'installation automatique des versions majeures (ex: passage à React 19.0.0).',
      'Autoriser les mises à jour mineures et correctifs (ex: 18.3.0) sans modifier le numéro majeur.',
      'Forcer la compilation du paquet dans un format compatible avec les navigateurs Internet Explorer.'
    ],
    correctIndex: 2,
    explanation: 'Le chapeau (^) autorise les versions compatibles avec la version spécifiée selon SemVer : les montées mineures et de correctifs sont admises, mais pas les ruptures majeures (^18.x.x).'
  },
  {
    id: 're-efm-15',
    moduleId: 'module3',
    difficulty: 'application',
    tag: 'Variables d\'Environnement',
    question: 'Dans un projet configuré avec l\'outil Vite, quel préfixe est obligatoire pour exposer une variable d\'environnement au code React ?',
    options: [
      'REACT_APP_',
      'VITE_',
      'PUBLIC_',
      'ENV_'
    ],
    correctIndex: 1,
    explanation: 'Vite exige le préfixe VITE_ pour les variables publiques injectées dans import.meta.env, empêchant la fuite accidentelle de clés d\'environnement serveur privées.'
  },

  // ==========================================
  // MODULE 4 : JSX, Props, State & Hooks de Base (5 questions)
  // ==========================================
  {
    id: 're-efm-16',
    moduleId: 'module4',
    difficulty: 'fondamentaux',
    tag: 'Props Children',
    question: 'Comment un composant Conteneur accède-t-il aux éléments enfants imbriqués entre ses balises d\'ouverture et fermeture ?',
    options: [
      'En inspectant directement l\'attribut natif innerHTML du conteneur parent dans le DOM.',
      'En souscrivant à un écouteur d\'événements global géré par le hook interne useChildren().',
      'En interrogeant la propriété globale window.reactComponentTree du navigateur client.',
      'En utilisant la prop spéciale réservée props.children fournie automatiquement par React.'
    ],
    correctIndex: 3,
    explanation: 'props.children est une prop réservée que React peuple automatiquement avec tout le contenu placé entre les balises <Conteneur>...</Conteneur>.'
  },
  {
    id: 're-efm-17',
    moduleId: 'module4',
    difficulty: 'fondamentaux',
    tag: 'SyntheticEvent',
    question: 'Qu\'est-ce que l\'objet e reçu dans un gestionnaire d\'événement React tel que onChange={(e) => ...} ?',
    options: [
      'Une référence directe vers la connexion IndexedDB de persistance locale du navigateur.',
      'Une instance de SyntheticEvent enveloppant l\'événement natif pour uniformiser les navigateurs.',
      'Un flux de données binaires contenant les coordonnées spatiales et temporelles du pointeur.',
      'Un pointeur d\'adresse mémoire vers le nœud structurel C++ interne du moteur de rendu web.'
    ],
    correctIndex: 1,
    explanation: 'SyntheticEvent est l\'enveloppe événementielle standardisée de React. Elle normalise le comportement des événements à travers tous les navigateurs conformément aux spécifications W3C.'
  },
  {
    id: 're-efm-18',
    moduleId: 'module4',
    difficulty: 'piege',
    tag: 'Batching Automatique',
    question: 'Sous React 18, qu\'est-ce que le regroupement automatique des mises à jour (Automatic Batching) ?',
    options: [
      'Le regroupement de tous les fichiers JavaScript en un unique fichier compressé au format zip.',
      'L\'obligation d\'exécuter toutes les requêtes réseau par blocs synchrones de cinq appels maximum.',
      'Le regroupement de multiples modifications d\'état en un seul re-rendu, y compris dans les promesses et timers.',
      'La compilation anticipée de l\'intégralité des templates JSX avant l\'ouverture du navigateur.'
    ],
    correctIndex: 2,
    explanation: 'React 18 regroupe automatiquement plusieurs setStates en une seule passe de rendu, même dans les callbacks asynchrones (fetch, setTimeout), réduisant les recalculs inutiles.'
  },
  {
    id: 're-efm-19',
    moduleId: 'module4',
    difficulty: 'syntaxe',
    tag: 'Valeurs par Défaut Props',
    question: 'Comment définir une valeur par défaut pour une prop titre dans un composant fonctionnel moderne ?',
    options: [
      'function Carte({ titre = "Titre par défaut" }) { return <h3>{titre}</h3>; }',
      'Carte.setDefaultProps({ titre: "Titre par défaut" });',
      'function Carte(props) { props.titre = props.titre || "Titre par défaut"; }',
      'function Carte({ titre }) { default: titre = "Titre par défaut"; }'
    ],
    correctIndex: 0,
    explanation: 'La déstructuration ES6 avec valeur par défaut dans les paramètres de la fonction constitue la méthode moderne recommandée par React pour initialiser des props optionnelles.'
  },
  {
    id: 're-efm-20',
    moduleId: 'module4',
    difficulty: 'application',
    tag: 'Rendu Conditionnel',
    question: 'Quelle structure d\'expression est la plus adaptée pour afficher un badge \'Connecté\' ou \'Déconnecté\' selon un booléen isAuth ?',
    options: [
      'if (isAuth) { return \'Connecté\'; } else { return \'Déconnecté\'; } directement dans le return JSX.',
      'isAuth == true -> \'Connecté\' : \'Déconnecté\'',
      'switch (isAuth) { case true: \'Connecté\'; break; } dans l\'expression de balise.',
      '{isAuth ? <Badge label="Connecté" /> : <Badge label="Déconnecté" />}'
    ],
    correctIndex: 3,
    explanation: 'L\'opérateur ternaire conditionnel ? : est une expression qui s\'évalue directement à l\'intérieur des accolades JSX, idéal pour basculer entre deux rendus exclusifs.'
  },

  // ==========================================
  // MODULE 5 : Listes, Formulaires & Cycle useEffect (5 questions)
  // ==========================================
  {
    id: 're-efm-21',
    moduleId: 'module5',
    difficulty: 'fondamentaux',
    tag: 'Fetch vs Axios',
    question: 'Quelle est la différence de traitement d\'une erreur HTTP 404 entre la fonction native fetch() et la bibliothèque Axios ?',
    options: [
      'fetch() déclenche immédiatement le bloc catch tandis qu\'Axios ignore totalement l\'erreur.',
      'Les deux outils réagissent de manière strictement identique sans aucune différence de comportement.',
      'fetch() résout la promesse avec response.ok = false, tandis qu\'Axios rejette la promesse et déclenche le catch.',
      'Axios crash l\'application entière tandis que fetch() recharge automatiquement la page d\'accueil.'
    ],
    correctIndex: 2,
    explanation: 'fetch ne rejette sa promesse que sur incident réseau critique. Sur une 404 ou 500, la promesse est résolue et il faut vérifier res.ok. Axios, quant à lui, rejette automatiquement la promesse hors code 2xx.'
  },
  {
    id: 're-efm-22',
    moduleId: 'module5',
    difficulty: 'piege',
    tag: 'Boucle Infinie useEffect',
    question: 'Pourquoi l\'instruction useEffect(() => { setCount(count + 1); }); sans second paramètre provoque-t-elle un plantage de l\'application ?',
    options: [
      'Parce que l\'effet s\'exécute après chaque rendu, modifie l\'état, déclenche un nouveau rendu et boucle à l\'infini.',
      'Parce que le compilateur Babel refuse de générer le code d\'une fonction anonyme sans parenthèses.',
      'Parce que la fonction setCount ne peut pas être invoquée plus d\'une fois par session utilisateur.',
      'Parce que le navigateur internet coupe la connexion réseau dès la détection d\'un hook d\'effet.'
    ],
    correctIndex: 0,
    explanation: 'Un useEffect sans tableau de dépendances s\'exécute après chaque rendu. Modifier le state à l\'intérieur déclenche immédiatement un re-rendu, provoquant une boucle infinie de rendus.'
  },
  {
    id: 're-efm-23',
    moduleId: 'module5',
    difficulty: 'application',
    tag: 'Composants Non-Contrôlés',
    question: 'Quel hook permet d\'accéder directement à la valeur d\'un champ de saisie dans un formulaire non-contrôlé sans provoquer de re-rendu ?',
    options: [
      'useState',
      'useRef',
      'useMemo',
      'useCallback'
    ],
    correctIndex: 1,
    explanation: 'useRef crée une référence mutable dont la propriété .current peut être attachée à un nœud DOM (ref={inputRef}) pour en lire la valeur au moment de la soumission sans provoquer de re-rendu.'
  },
  {
    id: 're-efm-24',
    moduleId: 'module5',
    difficulty: 'application',
    tag: 'AbortController',
    question: 'Comment utiliser l\'API standard AbortController dans un hook useEffect pour éviter les fuites de mémoire lors d\'un démontage rapide ?',
    options: [
      'En appelant controller.terminate() dans le bloc d\'en-tête du composant fonctionnel.',
      'En désactivant le cache du navigateur avec controller.disableCache() dans les paramètres de la requête.',
      'En rechargeant la page web si le temps de réponse est supérieur à deux secondes.',
      'En passant le signal controller.signal au fetch et en appelant controller.abort() dans la fonction cleanup.'
    ],
    correctIndex: 3,
    explanation: 'Associer controller.signal à fetch et appeler controller.abort() dans la fonction de nettoyage retournée par useEffect annule immédiatement la requête réseau si le composant est démonté avant réception.'
  },
  {
    id: 're-efm-25',
    moduleId: 'module5',
    difficulty: 'piege',
    tag: 'Dépendances Objets',
    question: 'Pourquoi placer un objet littéral non-mémorisé comme dépendance dans useEffect(() => {}, [{ id: 1 }]) est-il problématique ?',
    options: [
      'Parce que React interdit formellement les types objets dans les tableaux de dépendances.',
      'Parce que le moteur JavaScript détruit l\'objet avant que l\'effet n\'ait pu démarrer son exécution.',
      'Parce qu\'un nouvel objet littéral est créé en mémoire à chaque rendu, provoquant l\'exécution continue de l\'effet.',
      'Parce que les objets ne peuvent pas être comparés par la fonction JSON.stringify dans le navigateur.'
    ],
    correctIndex: 2,
    explanation: 'React compare les dépendances par égalité référentielle (Object.is). Un objet littéral créé dans le corps du composant a une nouvelle adresse mémoire à chaque rendu, ce qui relance l\'effet systématiquement.'
  },

  // ==========================================
  // MODULE 6 : React Router DOM v6 & Tests Unitaires (5 questions)
  // ==========================================
  {
    id: 're-efm-26',
    moduleId: 'module6',
    difficulty: 'fondamentaux',
    tag: 'Nested Routes',
    question: 'Dans une configuration de routes imbriquées, où la vue de la route fille s\'affiche-t-elle par rapport au composant parent ?',
    options: [
      'Dans une nouvelle fenêtre pop-up indépendante créée par le navigateur.',
      'À l\'emplacement exact défini par la balise <Outlet /> déclarée dans le composant parent.',
      'Directement à la racine du document HTML en écrasant l\'intégralité du composant parent.',
      'Dans le pied de page du document quel que soit le positionnement CSS.'
    ],
    correctIndex: 1,
    explanation: 'Le composant <Outlet /> sert d\'emplacement d\'injection dynamique pour afficher le composant de la sous-route correspondante au sein de la disposition du parent.'
  },
  {
    id: 're-efm-27',
    moduleId: 'module6',
    difficulty: 'application',
    tag: 'useSearchParams',
    question: 'Quel hook de React Router DOM v6 permet de manipuler les paramètres de requête de l\'URL (ex: ?recherche=react&tri=date) ?',
    options: [
      'useQueryParams()',
      'useLocationQuery()',
      'useUrlSearch()',
      'useSearchParams()'
    ],
    correctIndex: 3,
    explanation: 'useSearchParams() fonctionne de façon analogue à useState : il retourne les paramètres de recherche de l\'URL sous forme d\'objet URLSearchParams et une fonction pour les actualiser.'
  },
  {
    id: 're-efm-28',
    moduleId: 'module6',
    difficulty: 'syntaxe',
    tag: 'Navigate Component',
    question: 'Comment réaliser une redirection déclarative vers "/login" lorsqu\'un utilisateur non authentifié tente d\'accéder à une route protégée ?',
    options: [
      'return <Navigate to="/login" replace />;',
      'return <Redirect path="/login" force={true} />;',
      'return window.redirect("/login");',
      'return useRouter().forward("/login");'
    ],
    correctIndex: 0,
    explanation: 'Dans React Router v6, le composant <Navigate to="..." replace /> permet d\'effectuer une redirection déclarative propre au moment du rendu du composant de protection.'
  },
  {
    id: 're-efm-29',
    moduleId: 'module6',
    difficulty: 'application',
    tag: 'RTL waitFor',
    question: 'Dans un test unitaire React Testing Library, quel utilitaire permet d\'attendre qu\'un élément apparaisse après un appel d\'API asynchrone ?',
    options: [
      'L\'appel répété à screen.getByText() encapsulé dans une boucle d\'attente synchrone while.',
      'L\'exécution de jest.advanceTimersByTime(5000) pour avancer manuellement l\'horloge système.',
      'La fonction asynchrone await waitFor(() => expect(screen.getByText(/données/i)).toBeInTheDocument());',
      'L\'insertion d\'une temporisation bloquante avec await new Promise(r => setTimeout(r, 3000)).'
    ],
    correctIndex: 2,
    explanation: 'waitFor() scrute le DOM à intervalles réguliers jusqu\'à ce que la condition soit remplie ou que le délai maximum expire, ce qui garantit la stabilité des tests asynchrones.'
  },
  {
    id: 're-efm-30',
    moduleId: 'module6',
    difficulty: 'fondamentaux',
    tag: 'Jest Mock Functions',
    question: 'Comment créer une fonction factice (mock) avec Jest pour vérifier qu\'un composant enfant appelle bien le callback transmis en prop ?',
    options: [
      'const handleClic = jest.fn();',
      'const handleClic = jest.createFakeCallback();',
      'const handleClic = new Function("return true");',
      'const handleClic = jest.spyDOMEvent();'
    ],
    correctIndex: 0,
    explanation: 'jest.fn() crée une fonction espionne (spy mock) dont on peut inspecter le nombre d\'appels, les arguments passés et les valeurs de retour avec expect(handleClic).toHaveBeenCalled().'
  },

  // ==========================================
  // MODULE 7 : Redux Classique & React-Redux (5 questions)
  // ==========================================
  {
    id: 're-efm-31',
    moduleId: 'module7',
    difficulty: 'fondamentaux',
    tag: 'Single Source of Truth',
    question: 'Que prescrit le premier principe fondamental de l\'architecture Redux (Single Source of Truth) ?',
    options: [
      'Chaque composant fonctionnel doit instancier et maintenir son propre gestionnaire d\'état autonome.',
      'L\'ensemble de l\'état global de l\'application réside dans un arbre d\'objets unique au sein d\'un seul Store.',
      'Toutes les fonctions réductrices de l\'application doivent être rassemblées dans un seul fichier monolithique.',
      'L\'application ne peut exécuter qu\'une unique transaction de données asynchrone à un instant donné.'
    ],
    correctIndex: 1,
    explanation: 'Le premier principe de Redux stipule que tout l\'état global d\'une application doit être stocké dans une unique structure d\'arbre d\'objets gouvernée par un seul Store centralisé.'
  },
  {
    id: 're-efm-32',
    moduleId: 'module7',
    difficulty: 'syntaxe',
    tag: 'combineReducers',
    question: 'Quelle fonction officielle de Redux classique permet d\'assembler plusieurs sous-réducteurs (ex: authReducer, panierReducer) en un réducteur racine unique ?',
    options: [
      'mergeReducers()',
      'assembleStore()',
      'joinReducers()',
      'combineReducers()'
    ],
    correctIndex: 3,
    explanation: 'combineReducers() prend un objet associant des clés aux sous-réducteurs et génère une fonction réductrice unique gouvernant l\'ensemble de l\'arbre d\'état.'
  },
  {
    id: 're-efm-33',
    moduleId: 'module7',
    difficulty: 'fondamentaux',
    tag: 'Action Creators',
    question: 'Qu\'est-ce qu\'un créateur d\'action (Action Creator) dans une architecture Redux standard ?',
    options: [
      'Une fonction pure qui retourne un objet Action prêt à être transmis à dispatch().',
      'Un composant React spécialisé dans l\'affichage des formulaires de validation.',
      'Un plugin d\'extension pour le navigateur permettant de simuler des clics de souris.',
      'Un middleware chargé de convertir les requêtes REST en langage GraphQL.'
    ],
    correctIndex: 0,
    explanation: 'Un Action Creator est une fonction utilitaire dont l\'unique rôle est de formater et retourner un objet action { type, payload }, simplifiant et réutilisant l\'émission d\'actions.'
  },
  {
    id: 're-efm-34',
    moduleId: 'module7',
    difficulty: 'scenario',
    tag: 'Redux vs useState',
    question: 'Dans quelle situation l\'usage de Redux est-il réellement justifié par rapport à un simple useState local ou un Context ?',
    options: [
      'Pour contrôler l\'état d\'ouverture ou fermeture d\'une modale ou d\'une info-bulle dans un composant enfant.',
      'Pour enregistrer la frappe de texte caractère par caractère dans un formulaire de recherche isolé.',
      'Pour partager des flux de données complexes entre de multiples composants distants et découplés.',
      'Pour afficher les données statiques d\'une page institutionnelle ne changeant jamais au cours de la session.'
    ],
    correctIndex: 2,
    explanation: 'Redux est conçu pour les états globaux volumineux consommés et modifiés par de multiples fonctionnalités indépendantes, où le passage manuel de props deviendrait ingérable.'
  },
  {
    id: 're-efm-35',
    moduleId: 'module7',
    difficulty: 'piege',
    tag: 'Mutations Silencieuses',
    question: 'Quelle est la conséquence directe si un développeur modifie un tableau dans Redux avec state.articles.push(nouvelArticle) sans copie ?',
    options: [
      'Le moteur JavaScript lève une exception de dépassement de pile (Stack Overflow) qui plante le navigateur.',
      'Le Store Redux réinitialise immédiatement l\'intégralité des tranches d\'état à leur valeur par défaut.',
      'La base de données distante rejette la synchronisation en retournant une erreur d\'intégrité référentielle.',
      'La référence du tableau restant inchangée, les sélecteurs useSelector ne détectent rien et l\'UI ne s\'actualise pas.'
    ],
    correctIndex: 3,
    explanation: 'useSelector compare l\'ancienne et la nouvelle référence. En mutant le tableau en place avec push(), la référence mémoire ne change pas : React considère que rien n\'a changé et omet le re-rendu.'
  },

  // ==========================================
  // MODULE 8 : Redux Toolkit (RTK) & Asynchronisme (5 questions)
  // ==========================================
  {
    id: 're-efm-36',
    moduleId: 'module8',
    difficulty: 'syntaxe',
    tag: 'extraReducers RTK',
    question: 'Dans createSlice, où doit-on écouter les actions générées par un thunk asynchrone (createAsyncThunk) ?',
    options: [
      'Directement dans le bloc initial reducers aux côtés des actions synchrones standard.',
      'Dans la propriété extraReducers en utilisant la notation du constructeur builder.addCase().',
      'Dans le fichier index.html via une balise de configuration globale du navigateur.',
      'Dans une fonction hook externe appelée useAsyncListener().'
    ],
    correctIndex: 1,
    explanation: 'extraReducers permet à un slice de répondre à des types d\'actions définis hors du slice, en particulier les états pending, fulfilled et rejected issus de createAsyncThunk.'
  },
  {
    id: 're-efm-37',
    moduleId: 'module8',
    difficulty: 'application',
    tag: 'createEntityAdapter',
    question: 'Quel est l\'objectif de l\'utilitaire createEntityAdapter fourni par Redux Toolkit ?',
    options: [
      'Gérer des collections normalisées avec génération automatique de sélecteurs et reducers optimisés (ids et entities).',
      'Transformer à la volée les requêtes HTTP GET en requêtes POST pour décupler le débit de transfert réseau.',
      'Générer automatiquement des modèles de données relationnels SQL à partir des états décrits dans le store Redux.',
      'Établir un pont de communication chiffré en continu entre le store Redux et les périphériques matériels du client.'
    ],
    correctIndex: 0,
    explanation: 'createEntityAdapter standardise la structure des collections d\'entités ({ ids: [], entities: {} }) et fournit des opérations de CRUD optimisées (addOne, setAll, removeOne).'
  },
  {
    id: 're-efm-38',
    moduleId: 'module8',
    difficulty: 'fondamentaux',
    tag: 'Sélecteurs Mémorisés',
    question: 'Pourquoi utilise-t-on createSelector de la bibliothèque Reselect (intégrée à RTK) pour concevoir des sélecteurs complexes ?',
    options: [
      'Pour forcer le recalcul systématique de la donnée dérivée lors de chaque rendu de composant de l\'arbre.',
      'Pour chiffrer les données sensibles du store afin qu\'elles ne soient pas lisibles par les DevTools externes.',
      'Pour mémoriser (cacher) les calculs coûteux et éviter les recalculs si les entrées n\'ont pas changé.',
      'Pour empêcher définitivement le composant consommateur d\'émettre de nouvelles actions vers les reducers.'
    ],
    correctIndex: 2,
    explanation: 'createSelector crée un sélecteur mémoïsé : il ne réexécute la fonction de calcul que si l\'un des sélecteurs d\'entrée a changé de valeur, évitant des calculs lourds et des re-rendus superflus.'
  },
  {
    id: 're-efm-39',
    moduleId: 'module8',
    difficulty: 'syntaxe',
    tag: 'TypeScript avec RTK',
    question: 'Comment dériver le type de l\'état global RootState à partir de l\'instance du store configurée dans store.ts en TypeScript ?',
    options: [
      'type RootState = typeof store.currentState;',
      'type RootState = store.getTypeDefinition();',
      'type RootState = ExtractStoreState<store>;',
      'type RootState = ReturnType<typeof store.getState>;'
    ],
    correctIndex: 3,
    explanation: 'ReturnType<typeof store.getState> extrait automatiquement le type TypeScript exact de l\'arbre complet des réducteurs retourné par la méthode getState() du store.'
  },
  {
    id: 're-efm-40',
    moduleId: 'module8',
    difficulty: 'scenario',
    tag: 'Découpage en Slices',
    question: 'Quelle est la règle d\'or de conception pour découper les slices Redux Toolkit dans une grande application d\'entreprise ?',
    options: [
      'Rassembler l\'intégralité des données de l\'application dans un seul slice monolithique pour limiter les fichiers.',
      'Découper par domaine fonctionnel cohérent (ex: authSlice, panierSlice) avec état et logique autonomes.',
      'Instancier un slice individuel pour chaque composant visuel de l\'interface afin d\'isoler les variables locales.',
      'Restreindre l\'architecture à deux slices au maximum pour éviter toute surcharge mémoire sur le navigateur client.'
    ],
    correctIndex: 1,
    explanation: 'Découper le store en tranches (slices) alignées sur les domaines fonctionnels de l\'application assure la cohésion, la lisibilité du code et la maintenabilité à long terme de la base de code.'
  }
];
