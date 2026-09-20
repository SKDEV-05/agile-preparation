import { ReactQuestion } from '../../types/reactTypes';

export const MODULE_5_QUESTIONS: ReactQuestion[] = [
  {
    id: 'm5-q1',
    moduleId: 'module5',
    difficulty: 'fondamentaux',
    tag: 'Rendu de Listes',
    question: 'Quelle méthode native de tableau JavaScript est privilégiée pour convertir une collection de données en liste d\'éléments JSX ?',
    options: [
      '.forEach() en poussant manuellement chaque balise dans un accumulateur externe global.',
      '.reduce() en concaténant les chaînes HTML brutes sans passer par le compilateur.',
      '.filter() en excluant arbitrairement les éléments dont la clé n\'est pas définie.',
      '.map() en retournant une nouvelle instance d\'élément JSX pour chaque entrée du tableau.'
    ],
    correctIndex: 3,
    explanation: '.map() applique une projection un-pour-un sur les données pour retourner un nouveau tableau de nœuds JSX, parfaitement intégrable dans la hiérarchie de rendu React.'
  },
  {
    id: 'm5-q2',
    moduleId: 'module5',
    difficulty: 'piege',
    tag: 'Prop Key',
    question: 'Pourquoi l\'utilisation de l\'index du tableau (key={index}) est-elle déconseillée pour les listes dynamiques ?',
    options: [
      'Parce que l\'ajout, le tri ou la suppression d\'éléments décale les index et perturbe l\'état interne des composants.',
      'Parce que le moteur JavaScript refuse d\'évaluer des nombres entiers positifs dans un attribut de composant React.',
      'Parce que les clés numériques consomment plus de bande passante réseau lors de la sérialisation des paquets JSON.',
      'Parce que l\'index de tableau oblige le navigateur à vider la mémoire tampon graphique à chaque interaction.'
    ],
    correctIndex: 0,
    explanation: 'Une prop key doit identifier de manière stable et unique chaque élément (ex: un id en base). L\'index de tableau ne représente qu\'une position instable : si la liste change d\'ordre, des incohérences d\'état visuel surviennent.'
  },
  {
    id: 'm5-q3',
    moduleId: 'module5',
    difficulty: 'fondamentaux',
    tag: 'Formulaires Contrôlés',
    question: 'Quelle est la définition d\'un composant contrôlé (Controlled Component) dans la gestion d\'un formulaire React ?',
    options: [
      'Un champ dont la valeur est verrouillée en lecture seule et inaccessible à la saisie de l\'utilisateur.',
      'Un formulaire dont la validation syntaxique est déléguée au script de traitement PHP du serveur hôte.',
      'Un input dont la valeur affichée est dictée par un State et dont chaque saisie déclenche un gestionnaire onChange.',
      'Un composant qui lit la valeur des champs directement via des requêtes document.querySelector du DOM.'
    ],
    correctIndex: 2,
    explanation: 'Dans un composant contrôlé, le State React est l\'unique source de vérité (Single Source of Truth). L\'attribut value de l\'élément HTML reflète le State, et l\'écouteur onChange actualise ce State à chaque caractère saisi.'
  },
  {
    id: 'm5-q4',
    moduleId: 'module5',
    difficulty: 'application',
    tag: 'e.preventDefault',
    question: 'Quel est le rôle primordial de l\'instruction e.preventDefault() dans le gestionnaire de soumission d\'un formulaire ?',
    options: [
      'Réinitialiser immédiatement l\'ensemble des champs du formulaire à leurs valeurs initiales par défaut.',
      'Bloquer le comportement natif du navigateur qui enverrait une requête HTTP et rechargerait toute la page.',
      'Désactiver la vérification des règles de sécurité CORS pour autoriser l\'envoi vers un domaine externe.',
      'Forcer la validation automatique des contraintes HTML5 sans afficher d\'info-bulles à l\'utilisateur.'
    ],
    correctIndex: 1,
    explanation: 'Par défaut, la soumission d\'un formulaire HTML provoque une requête POST ou GET synchrone qui recharge l\'intégralité du document HTML. e.preventDefault() annule cette action pour préserver l\'application SPA active.'
  },
  {
    id: 'm5-q5',
    moduleId: 'module5',
    difficulty: 'syntaxe',
    tag: 'Multi-champs Dynamique',
    question: 'Dans un formulaire multi-champs, quelle syntaxe d\'objet permet d\'actualiser dynamiquement la clé correspondant au champ modifié ?',
    options: [
      'setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));',
      'setForm(prev => ({ ...prev, e.target.name: e.target.value }));',
      'setForm(prev => { prev[e.target.name] = e.target.value; return prev; });',
      'setForm(prev => ({ ...prev, [name]: [value] }));'
    ],
    correctIndex: 0,
    explanation: 'La syntaxe de propriétés calculées ES6 [e.target.name]: e.target.value permet d\'utiliser la valeur textuelle de l\'attribut name de l\'input en tant que clé dynamique dans le nouvel objet d\'état.'
  },
  {
    id: 'm5-q6',
    moduleId: 'module5',
    difficulty: 'fondamentaux',
    tag: 'useEffect Montage',
    question: 'Quand s\'exécute un effet useEffect dont le tableau de dépendances est explicitement vide : useEffect(() => { ... }, []) ?',
    options: [
      'À chaque cycle de rendu sans exception, immédiatement après l\'évaluation du JSX.',
      'Uniquement lors du démontage final du composant lorsque l\'utilisateur quitte la vue.',
      'Toutes les 1000 millisecondes de manière périodique par le biais d\'un timer interne.',
      'Une unique fois, juste après le premier affichage (montage initial) du composant.'
    ],
    correctIndex: 3,
    explanation: 'Un tableau de dépendances vide [] informe React que la fonction d\'effet ne dépend d\'aucune variable d\'état ou prop réactive : elle ne sera exécutée qu\'une seule et unique fois lors du montage initial.'
  },
  {
    id: 'm5-q7',
    moduleId: 'module5',
    difficulty: 'application',
    tag: 'useEffect Dépendances',
    question: 'Dans l\'instruction useEffect(() => { charger(id); }, [id]), à quelle fréquence l\'effet sera-t-il invoqué ?',
    options: [
      'Uniquement lors du démontage définitif du composant parent hors de l\'écran.',
      'Au montage initial, puis à chaque fois que la valeur de la prop id est modifiée.',
      'À chaque cycle de frappe au clavier ou de redimensionnement de la fenêtre web.',
      'Une seule fois au chargement du projet sans aucune réévaluation ultérieure.'
    ],
    correctIndex: 1,
    explanation: 'React compare la valeur de id d\'un rendu à l\'autre. Si la valeur a changé lors d\'un re-rendu, l\'effet s\'exécute pour actualiser les données.'
  },
  {
    id: 'm5-q8',
    moduleId: 'module5',
    difficulty: 'piege',
    tag: 'useEffect Cleanup',
    question: 'À quel moment précis la fonction de nettoyage (cleanup) retournée par un hook useEffect est-elle exécutée ?',
    options: [
      'Avant même que le composant ne soit évalué par le compilateur.',
      'Exclusivement lorsque le serveur d\'API retourne un code d\'erreur HTTP 500.',
      'Lors du démontage du composant ou juste avant la ré-exécution de l\'effet suivant.',
      'Pendant la phase de tracé CSS (Paint) avant l\'affichage des couleurs du DOM.'
    ],
    correctIndex: 2,
    explanation: 'La fonction retournée par un effet sert au nettoyage (annuler un abonnement, vider un timer). React l\'exécute lorsque le composant disparaît de l\'écran, ou avant de ré-exécuter l\'effet si ses dépendances ont évolué.'
  },
  {
    id: 'm5-q9',
    moduleId: 'module5',
    difficulty: 'fondamentaux',
    tag: 'Requêtes REST',
    question: 'Quels sont les 3 états fondamentaux recommandés pour piloter l\'interface lors d\'un appel réseau asynchrone ?',
    options: [
      'Pending (attente), Buffered (tampon), Archival (archivage)',
      'Fetching (lecture), Mutating (écriture), Committing (validation)',
      'Synchronous (immédiat), Asynchronous (différé), Parallel (simultané)',
      'Loading (chargement), Data (succès), Error (échec réseau)'
    ],
    correctIndex: 3,
    explanation: 'Une interface web professionnelle gère toujours la triade : le spinner d\'attente pendant la requête (Loading), l\'affichage des données après réception (Data/Success), et l\'alerte en cas de problème réseau (Error).'
  },
  {
    id: 'm5-q10',
    moduleId: 'module5',
    difficulty: 'piege',
    tag: 'Affichage Conditionnel &&',
    question: 'Considérez l\'expression : {items.length && <Liste items={items} />}. Que s\'affiche-t-il si items est vide (length = 0) ?',
    options: [
      'Le chiffre 0 s\'affiche à l\'écran car 0 est une valeur falsy valide que React affiche textuellement.',
      'Rien du tout, l\'expression conditionnelle empêche tout rendu dans le DOM réel.',
      'Une alerte d\'erreur de typage \'Cannot read properties of empty array\' dans la console.',
      'Le mot-clé \'false\' en toutes lettres dans le corps du document HTML.'
    ],
    correctIndex: 0,
    explanation: 'L\'opérateur logique && évalue le premier opérande. Comme 0 est falsy, l\'expression renvoie 0. Contrairement aux booléens false et null que React ignore, les nombres (même 0) sont rendus sous forme textuelle visible à l\'écran.'
  }
];
