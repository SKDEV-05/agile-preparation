import { ReactQuestion } from '../../types/reactTypes';

export const MODULE_4_QUESTIONS: ReactQuestion[] = [
  {
    id: 'm4-q1',
    moduleId: 'module4',
    difficulty: 'fondamentaux',
    tag: 'Babel & JSX',
    question: 'En quelle instruction JavaScript le compilateur Babel transforme-t-il l\'expression JSX <p className="texte">Bonjour</p> ?',
    options: [
      'document.createElement(\'p\').setAttribute(\'class\', \'texte\').innerHTML = \'Bonjour\';',
      'new HTMLElement({ tag: \'p\', attributes: { className: \'texte\' }, text: \'Bonjour\' });',
      'React.createElement(\'p\', { className: \'texte\' }, \'Bonjour\');',
      'window.DOMParser.parseFromString(\'<p class="texte">Bonjour</p>\', \'text/html\');'
    ],
    correctIndex: 2,
    explanation: 'Babel compile toute balise JSX en un appel direct à React.createElement(type, props, ...children), qui retourne un objet JavaScript représentant le nœud virtuel.'
  },
  {
    id: 'm4-q2',
    moduleId: 'module4',
    difficulty: 'syntaxe',
    tag: 'Règles JSX',
    question: 'Quelle est la règle impérative de syntaxe en JSX concernant les balises orphelines comme <img> ou <input> ?',
    options: [
      'Elles doivent rester ouvertes sans slash final pour respecter la spécification HTML5 souple.',
      'Elles doivent obligatoirement être auto-fermantes avec un slash terminal (ex: <img src="..." />).',
      'Elles doivent obligatoirement être entourées d\'une balise de commentaire JSX conditionnel.',
      'Elles ne peuvent être instanciées que par le biais de la fonction dangerouslySetInnerHTML.'
    ],
    correctIndex: 1,
    explanation: 'JSX hérite de la rigueur XML : toute balise qui ne contient pas d\'enfants doit comporter la notation auto-fermante `/>` sous peine de provoquer une erreur de compilation immédiate.'
  },
  {
    id: 'm4-q3',
    moduleId: 'module4',
    difficulty: 'fondamentaux',
    tag: 'Fragments React',
    question: 'Pourquoi utilise-t-on couramment un Fragment React (<>...</> ou <React.Fragment>) ?',
    options: [
      'Pour crypter et sécuriser les attributs sensibles des composants enfants dans l\'arbre DOM.',
      'Pour forcer le rafraîchissement synchrone du navigateur à chaque changement de propriété.',
      'Pour attribuer automatiquement un identifiant unique universel à chaque sous-composant.',
      'Pour regrouper plusieurs éléments frères adjacents sans insérer de nœud DOM parent superflu.'
    ],
    correctIndex: 3,
    explanation: 'Un composant React doit renvoyer une seule racine. Les Fragments permettent d\'assembler une fratrie d\'éléments sans polluer le DOM HTML avec des <div> d\'emballage inutiles.'
  },
  {
    id: 'm4-q4',
    moduleId: 'module4',
    difficulty: 'fondamentaux',
    tag: 'Immutabilité des Props',
    question: 'Quelle assertion est strictement exacte concernant les props reçues par un composant fonctionnel React ?',
    options: [
      'Les props sont en lecture seule (immuables) et le composant ne doit jamais tenter de les modifier directement.',
      'Le composant enfant peut modifier librement ses props pour informer son parent d\'un changement d\'état local.',
      'Les props sont effacées de la mémoire dès que le premier affichage du composant est achevé par le moteur.',
      'Les props ne peuvent contenir que des chaînes de caractères primitives, excluant les objets et fonctions.'
    ],
    correctIndex: 0,
    explanation: 'Les props sont rigoureusement immuables (lecture seule). Tous les composants React doivent fonctionner comme des fonctions pures vis-à-vis des arguments qu\'ils reçoivent de leur parent.'
  },
  {
    id: 'm4-q5',
    moduleId: 'module4',
    difficulty: 'application',
    tag: 'Communication Enfant-Parent',
    question: 'Comment un composant enfant transmet-il de manière idiomatique une donnée à son composant parent ?',
    options: [
      'En déclenchant un événement CustomEvent natif sur l\'objet window pour capter l\'écouteur global.',
      'En modifiant directement une variable globale déclarée dans le fichier d\'entrée index.js du projet.',
      'En exécutant une fonction de rappel (callback) reçue en prop en lui fournissant la valeur en argument.',
      'En manipulant le State interne du parent via la propriété réservée parentNode.state.update().'
    ],
    correctIndex: 2,
    explanation: 'Le parent transmet une fonction en prop (ex: onSelection={traiterItem}). L\'enfant appelle cette fonction callback en lui injectant la donnée locale en paramètre.'
  },
  {
    id: 'm4-q6',
    moduleId: 'module4',
    difficulty: 'piege',
    tag: 'Événements JSX',
    question: 'Quelle syntaxe garantit qu\'une fonction de suppression acceptant un identifiant ne s\'exécutera qu\'au moment du clic ?',
    options: [
      'onClick={supprimerItem(id)}',
      'onClick={() => supprimerItem(id)}',
      'onClick={supprimerItem.bind(id)}',
      'onClick={\'supprimerItem(\' + id + \')\'}'
    ],
    correctIndex: 1,
    explanation: 'onClick={supprimerItem(id)} déclenche la fonction immédiatement au moment du rendu ! Passer une fonction fléchée onClick={() => supprimerItem(id)} diffère l\'exécution jusqu\'à l\'interaction utilisateur réelle.'
  },
  {
    id: 'm4-q7',
    moduleId: 'module4',
    difficulty: 'fondamentaux',
    tag: 'Hook useState',
    question: 'Que retourne exactement l\'appel du hook useState : const [compteur, setCompteur] = useState(0) ?',
    options: [
      'Un objet contenant les méthodes getValue(), setValue() et subscribe().',
      'Une promesse asynchrone qui résout la valeur initiale du compteur.',
      'Un proxy d\'observation qui intercepte chaque lecture de variable.',
      'Un tableau de deux éléments : l\'état actuel et la fonction de mise à jour.'
    ],
    correctIndex: 3,
    explanation: 'useState renvoie toujours une paire (tuple de 2 éléments) que l\'on déstructure par convention sous la forme [valeurActuelle, fonctionMiseAJour].'
  },
  {
    id: 'm4-q8',
    moduleId: 'module4',
    difficulty: 'piege',
    tag: 'Fonction Updater',
    question: 'Dans un événement, vous écrivez : setCount(count + 1); setCount(count + 1);. Si count valait 0, que vaut count au prochain rendu ?',
    options: [
      '2, car React exécute immédiatement chaque mise à jour de façon séquentielle.',
      '1, car les deux appels lisent la même valeur snapshot de count issue du rendu actuel.',
      '0, car deux appels successifs de même nature s\'annulent mutuellement.',
      'Une exception est levée car React interdit plus d\'une mutation par fonction.'
    ],
    correctIndex: 1,
    explanation: 'Dans un gestionnaire, la valeur count est figée dans la clôture (closure) du rendu courant. Pour cumuler deux incréments consécutifs, il faut utiliser la syntaxe updater : setCount(prev => prev + 1).'
  },
  {
    id: 'm4-q9',
    moduleId: 'module4',
    difficulty: 'fondamentaux',
    tag: 'Règles des Hooks',
    question: 'Quelle est la règle officielle absolue régissant l\'invocation des hooks dans un composant React ?',
    options: [
      'Les hooks doivent être déclarés au sein de blocs try/catch pour capturer les erreurs de rendu.',
      'Les hooks doivent obligatoirement être instanciés à l\'intérieur d\'une boucle conditionnelle for.',
      'Les hooks doivent être appelés au niveau racine du composant, jamais dans un if, boucle ou callback.',
      'Les composants fonctionnels ne peuvent héberger qu\'un unique hook par fichier d\'implémentation.'
    ],
    correctIndex: 2,
    explanation: 'React préserve l\'association de l\'état d\'un rendu à l\'autre en s\'appuyant sur l\'ordre séquentiel d\'appel des hooks. Placer un hook dans un bloc conditionnel briserait cette concordance.'
  },
  {
    id: 'm4-q10',
    moduleId: 'module4',
    difficulty: 'scenario',
    tag: 'Remontée d\'État',
    question: 'Deux composants frères doivent afficher et modifier la même variable. Sans librairie externe, quelle est l\'approche canonique ?',
    options: [
      'Remonter l\'état (Lifting State Up) dans leur parent commun le plus proche et transmettre valeur et callbacks en props.',
      'Créer un singleton JavaScript autonome dans un module externe et l\'importer dans chacun des deux composants frères.',
      'Déclarer deux hooks useState synchronisés manuellement par l\'intermédiaire de variables d\'environnement locales.',
      'Utiliser l\'attribut DOM dataset sur l\'élément parent pour y stocker les valeurs sous forme de chaînes de texte.'
    ],
    correctIndex: 0,
    explanation: 'La remontée d\'état (Lifting State Up) place la source de vérité dans l\'ancêtre commun le plus proche, qui distribue la valeur aux enfants sous forme de props et transmet les fonctions de modification.'
  }
];
