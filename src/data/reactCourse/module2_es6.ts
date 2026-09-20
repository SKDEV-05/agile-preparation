import { ReactCourseModule } from '../../types/reactTypes';

export const MODULE_2: ReactCourseModule = {
  id: 'module2',
  orderNumber: 2,
  pdfReference: 'PDF 2',
  title: 'Préparer React : Maîtriser le JavaScript Moderne (ES6+)',
  subtitle: 'Variables, Arrow Functions, Déstructuration, Spread/Rest, Immutabilité & Asynchronisme',
  description: 'React est du JavaScript moderne pur. 90% des erreurs d\'apprentissage en React proviennent de lacunes sur ES6+. Maîtrisez les structures et concepts indispensables au développement de composants.',
  iconName: 'Braces',
  gradient: 'from-[#22C55E] to-[#10B981]',
  sections: [
    {
      id: 'm2-s1',
      order: '01',
      title: 'Variables & Portées : let, const et les pièges de var',
      quickSummary: 'Éliminer var au profit de la rigueur de portée de bloc de let et const.',
      conceptExplanation: 'Avant ES6, var imposait une portée de fonction (function scope), autorisait les redéclarations silencieuses et subissait le Hoisting (initialisation avec undefined). ES6 a introduit let et const à portée stricte de bloc (block scope entre accolades).',
      deepExplanation: 'let et const se trouvent dans la Temporal Dead Zone (TDZ) entre le début du bloc et leur ligne d\'assignation : toute tentative de lecture préalable lève immédiatement une ReferenceError au lieu de masquer un bug. const protège la réassignation de la variable, mais ne rend pas un objet interne immuable.',
      keyPoints: [
        'var : Portée de fonction, s\'échappe des boucles et blocs if, subit le Hoisting non sécurisé.',
        'let : Portée de bloc {}, réassignable, idéal pour les compteurs et variables évolutives.',
        'const : Portée de bloc {}, non réassignable (assignation obligatoire dès la déclaration).',
        'Règle d\'or : Utilisez const par défaut partout ; utilisez let uniquement si la variable doit être réassignée.'
      ],
      examTraps: [
        'Piège d\'examen : "const stagiaire = { nom: \'Karim\' }; stagiaire.nom = \'Sara\';" Est-ce légal ? OUI ! const verrouille la référence mémoire de l\'objet, pas les propriétés à l\'intérieur !'
      ],
      diagramType: 'stack_vs_heap',
      codeExamples: [
        {
          title: 'Démonstration de portée : var vs let',
          description: 'Observez comment var fuit du bloc conditionnel alors que let reste sagement encapsulé.',
          code: `if (true) {
  var montantVar = 100;
  let montantLet = 200;
}
console.log(montantVar); // Affiche 100 (fuite de portée !)
// console.log(montantLet); // Erreur fatale : ReferenceError (protégé dans son bloc)`,
          outputPreview: 'montantVar = 100 ; montantLet est inaccessible hors du bloc.'
        }
      ],
      miniQuestion: {
        question: 'Que se passe-t-il si vous tentez de lire une variable déclarée avec let avant sa ligne de déclaration ?',
        options: [
          'Le script affiche undefined comme si la variable avait été déclarée avec var.',
          'La variable prend automatiquement la valeur null jusqu\'à sa déclaration effective.',
          'Le moteur JavaScript ignore la ligne et passe à la suivante sans erreur.',
          'Une erreur ReferenceError est levée immédiatement en raison de la Temporal Dead Zone (TDZ).'
        ],
        correctIndex: 3,
        explanation: 'Contrairement à var qui affiche undefined (Hoisting), let et const interdisent tout accès avant déclaration et lèvent une ReferenceError (Temporal Dead Zone).'
      },
      officialDocReference: 'OFPPT M204 Support 2 — Pages 4 à 8'
    },
    {
      id: 'm2-s2',
      order: '02',
      title: 'Arrow Functions & Déstructuration d\'Objets et Tableaux',
      quickSummary: 'Syntaxe concise et déballage direct des propriétés d\'objets et props React.',
      conceptExplanation: 'Les fonctions fléchées () => {} offrent une syntaxe ultra-compacte avec retour implicite sur une ligne, et conservent le contexte lexical de this. La déstructuration permet d\'extraire directement des valeurs d\'un objet ou d\'un tableau dans des variables distinctes.',
      deepExplanation: 'En React, la déstructuration est omniprésente : pour déballer les props dans les paramètres d\'un composant fonctionnel (ex: const Card = ({ title, price }) => ...), ou pour extraire la valeur et le setter du hook useState (const [count, setCount] = useState(0)).',
      keyPoints: [
        'Fonction fléchée compacte : const doubler = x => x * 2; (retour implicite sans accolades ni mot-clé return).',
        'this lexical : L\'arrow function capture la valeur de this du contexte environnant au moment de sa création.',
        'Déstructuration d\'objet : const { nom, note } = stagiaire; avec renommage possible : const { nom: nomComplet } = stagiaire;',
        'Déstructuration de tableau : const [premier, second] = notes; (l\'ordre des éléments fait foi).'
      ],
      examTraps: [
        'Attention au retour implicite d\'un objet en fonction fléchée : x => { id: x } est interprété comme un bloc de fonction vide ! Il faut entourer l\'objet de parenthèses : x => ({ id: x }).'
      ],
      diagramType: 'props_tree',
      codeExamples: [
        {
          title: 'Déstructuration d\'objet et tableau en pratique React',
          description: 'La façon standard d\'écrire les composants et hooks dans React.',
          code: `// Déstructuration d'objet avec valeurs par défaut :
const stagiaire = { id: 1, prenom: 'Sara', filiere: 'Dev Digital' };
const { prenom, note = 20 } = stagiaire;
console.log(prenom, 'Note :', note);

// Déstructuration de tableau (comme le hook useState) :
const coordonnees = [33.5731, -7.5898];
const [latitude, longitude] = coordonnees;
console.log('Casablanca :', latitude, longitude);`,
          outputPreview: 'Sara Note : 20\nCasablanca : 33.5731 -7.5898'
        }
      ],
      miniQuestion: {
        question: 'Comment retourner implicitement un objet { status: "actif" } depuis une fonction fléchée sur une seule ligne ?',
        options: [
          '() => { status: "actif" }',
          '() => return { status: "actif" }',
          '() => ({ status: "actif" })',
          '() => [ status: "actif" ]'
        ],
        correctIndex: 2,
        explanation: 'En JavaScript, les accolades après la flèche sont interprétées comme le corps de la fonction. Pour indiquer un objet litéral retourné implicitement, on doit l\'envelopper de parenthèses : () => ({ ... }).'
      },
      officialDocReference: 'OFPPT M204 Support 2 — Pages 9 à 16'
    },
    {
      id: 'm2-s3',
      order: '03',
      title: 'Spread / Rest (...), Modules & Immutabilité (Shallow vs Deep)',
      quickSummary: 'Le fondement absolu du State React : pourquoi et comment cloner les données sans mutation directe.',
      conceptExplanation: 'L\'opérateur trois points (...) a deux rôles : Spread (étale les éléments d\'un tableau ou objet pour créer une nouvelle copie) et Rest (rassemble les arguments restants). L\'immutabilité est la règle numéro un de React : pour mettre à jour un état, on ne modifie jamais l\'existant, on produit une nouvelle référence.',
      deepExplanation: 'Les objets et tableaux sont stockés par référence dans le tas (Heap). Faire userB = userA ne copie que le pointeur d\'adresse mémoire. Le spread operator {...userA} effectue une copie superficielle (Shallow Copy). Pour les objets imbriqués profonds, on utilise structuredClone() ou la propagation récursive. Si vous mutez un objet sans changer sa référence, React refuse de re-rendre le composant !',
      keyPoints: [
        'Spread d\'objet : const misAJour = { ...ancien, role: "Admin" }; (écrase ou ajoute la propriété sans altérer l\'original).',
        'Spread de tableau : const ajout = [...anciens, nouvelItem]; (évite .push() qui mute le tableau original).',
        'Shallow Copy : Ne duplique que le 1er niveau de clés ; les sous-objets partagent toujours la même référence mémoire.',
        'Modules ES6 : export const nom = ... (export nommé avec accolades { nom }) vs export default ... (export par défaut unique sans accolades).'
      ],
      examTraps: [
        'Piège fatal en React : Utiliser .push(), .splice(), ou faire state.valeur = 10. React compare les références (oldState === newState). Comme la référence mémoire n\'a pas bougé, aucun re-rendu ne se produit !'
      ],
      diagramType: 'stack_vs_heap',
      codeExamples: [
        {
          title: 'Mise à jour immuable d\'un objet et d\'un tableau',
          description: 'Créer de nouvelles références pour garantir la détection de changement par React.',
          code: `// 1. Mise à jour d'objet avec Spread :
const user = { id: 1, nom: 'Yassine', role: 'Stagiaire' };
const userPromu = { ...user, role: 'Lauréat 2A' };
console.log(user !== userPromu); // true (deux adresses mémoires distinctes !)

// 2. Ajout dans un tableau sans mutation (.push est proscrit) :
const modules = ['M201 Agile', 'M202 Base'];
const modulesComplets = [...modules, 'M204 React'];
console.log(modulesComplets); // ['M201 Agile', 'M202 Base', 'M204 React']`,
          outputPreview: 'true\n["M201 Agile", "M202 Base", "M204 React"]'
        }
      ],
      miniQuestion: {
        question: 'Pourquoi l\'instruction state.notes.push(18) est-elle considérée comme une faute grave dans un composant React ?',
        options: [
          'Parce que la méthode native .push() mute le tableau sans modifier sa référence mémoire, empêchant React de détecter le changement d\'état.',
          'Parce que l\'exécution synchrone de .push() bloque définitivement la boucle d\'événements du navigateur lors des rendus graphiques intensifs.',
          'Parce que le moteur du Virtual DOM exige impérativement que les collections soient déclarées sous forme de tuples immuables de longueur fixe.',
          'Parce que le compilateur Babel convertit automatiquement tout appel à .push() en une exception d\'exécution pour protéger le thread principal.'
        ],
        correctIndex: 0,
        explanation: 'React effectue une comparaison superficielle (Shallow Comparison) de l\'adresse mémoire. .push() modifie le tableau sans changer son pointeur mémoire, donc React considère que rien n\'a changé et ne déclenche aucun re-rendu.'
      },
      officialDocReference: 'OFPPT M204 Support 2 — Pages 17 à 25'
    }
  ],
  practicalChallenge: {
    title: 'Défi Pratique : Ajout d\'une tâche de manière 100% immuable',
    description: 'Complétez la fonction addNewTask pour qu\'elle retourne une NOUVELLE liste contenant les anciennes tâches plus la nouvelle, sans muter le tableau d\'origine.',
    starterCode: `function addNewTask(currentTasks, title) {
  const newTask = { id: Date.now(), title, done: false };
  // Complétez ici de façon immuable :
  
}`,
    expectedOutcome: 'La fonction retourne un nouveau tableau sans modifier currentTasks.',
    solutionCode: `function addNewTask(currentTasks, title) {
  const newTask = { id: Date.now(), title, done: false };
  return [...currentTasks, newTask];
}`,
    explanation: 'L\'utilisation de l\'opérateur spread [...currentTasks, newTask] crée un nouveau tableau en mémoire contenant tous les éléments précédents ainsi que le nouvel élément, respectant le principe d\'immutabilité de React.'
  },
  keyTakeaways: [
    'Utilisez toujours const par défaut, let pour les réassignations, et bannissez var.',
    'La déstructuration ({ a, b }) simplifie la manipulation des props et des retours de hooks.',
    'L\'immutabilité est obligatoire : utilisez le spread operator (...) pour cloner et mettre à jour le state.',
    'Les fonctions fléchées () => {} lient lexicalement la valeur de this.'
  ],
  commonTraps: [
    'Muter directement un objet ou tableau d\'état via .push(), .sort(), ou assignation directe.',
    'Confondre export par défaut (import MonNom from \'./fichier\') et export nommé (import { nom } from \'./fichier\').',
    'Oublier les parenthèses lors du retour implicite d\'un objet en fonction fléchée.'
  ]
};
