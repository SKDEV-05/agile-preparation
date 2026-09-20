import { ReactQuestion } from '../../types/reactTypes';

export const MODULE_2_QUESTIONS: ReactQuestion[] = [
  {
    id: 'm2-q1',
    moduleId: 'module2',
    difficulty: 'fondamentaux',
    tag: 'Variables let vs var',
    question: 'Quelle est la différence fondamentale de portée (scope) entre les mots-clés var et let ?',
    options: [
      'var possède une portée globale persistante tandis que let est réinitialisé à chaque micro-tâche.',
      'var et let partagent la même portée lexicale mais let interdit formellement la réassignation de valeur.',
      'var est restreint au bloc d\'instructions tandis que let est accessible dans tout le corps du fichier.',
      'var possède une portée de fonction et ignore les blocs if/for, alors que let a une portée de bloc strict {}.'
    ],
    correctIndex: 3,
    explanation: 'let et const sont limités strictement au bloc d\'accolades {} dans lequel ils sont déclarés, éliminant les fuites et écrasements accidentels causés par le function-scope de var.'
  },
  {
    id: 'm2-q2',
    moduleId: 'module2',
    difficulty: 'piege',
    tag: 'Temporal Dead Zone',
    question: 'Considérez le code suivant exécuté dans un module : console.log(x); let x = 5; Que produit ce script ?',
    options: [
      'Il affiche la valeur 5 dans la console car la déclaration let est évaluée en amont.',
      'Il affiche la valeur undefined en raison de l\'élévation standard (Hoisting) de la variable.',
      'Il lève une erreur ReferenceError car la variable x se trouve dans la Temporal Dead Zone (TDZ).',
      'Il initialise automatiquement x avec la valeur null sans interrompre l\'exécution du script.'
    ],
    correctIndex: 2,
    explanation: 'Contrairement à var qui est hissé avec la valeur undefined, let et const se trouvent dans la zone morte temporaire (TDZ) du début du bloc jusqu\'à leur déclaration : y accéder lève une ReferenceError.'
  },
  {
    id: 'm2-q3',
    moduleId: 'module2',
    difficulty: 'piege',
    tag: 'Const & Objets',
    question: 'Considérez le code : const user = { nom: \'Ali\' }; user.nom = \'Sara\'; Que se produit-il ?',
    options: [
      'Une exception TypeError est déclenchée car une constante const interdit toute modification de propriété.',
      'Le code s\'exécute avec succès et user.nom vaut désormais \'Sara\' car la référence de l\'objet reste inchangée.',
      'L\'objet user est immédiatement détruit par le garbage collector en raison d\'une tentative de mutation.',
      'Le moteur JavaScript crée automatiquement un clone gelé (Object.freeze) sans modifier l\'objet d\'origine.'
    ],
    correctIndex: 1,
    explanation: 'const empêche la réassignation de la variable elle-même (user = ... est interdit). En revanche, la valeur référencée dans le tas (Heap) reste mutable et ses propriétés internes peuvent être modifiées.'
  },
  {
    id: 'm2-q4',
    moduleId: 'module2',
    difficulty: 'syntaxe',
    tag: 'Arrow Functions',
    question: 'Quelle syntaxe concise avec fonction fléchée et retour implicite permet de calculer le carré d\'un nombre x ?',
    options: [
      'const carre = x => x * x;',
      'const carre = (x) => { x * x; };',
      'const carre = function(x) { return x * x; };',
      'const carre = x -> return x * x;'
    ],
    correctIndex: 0,
    explanation: 'Lorsqu\'une fonction fléchée ne comprend qu\'une seule expression, les parenthèses de paramètre unique, les accolades de corps et le mot-clé return peuvent être omis pour un retour implicite direct.'
  },
  {
    id: 'm2-q5',
    moduleId: 'module2',
    difficulty: 'syntaxe',
    tag: 'Déstructuration',
    question: 'Soit l\'objet const stagiaire = { nom: \'Amine\', filiere: \'DEV\' }; Comment extraire ces deux propriétés en variables locales ?',
    options: [
      'const [nom, filiere] = stagiaire;',
      'const { nom, filiere } = stagiaire;',
      'const nom, filiere from stagiaire;',
      'const { stagiaire.nom, stagiaire.filiere };'
    ],
    correctIndex: 1,
    explanation: 'La déstructuration d\'objet ES6 s\'écrit avec des accolades const { prop1, prop2 } = objet, effectuant la liaison des variables locales par correspondance exacte de nom de clé.'
  },
  {
    id: 'm2-q6',
    moduleId: 'module2',
    difficulty: 'application',
    tag: 'Spread Operator',
    question: 'Comment créer un NOUVEAU tableau fruitsCopie contenant tous les éléments du tableau fruits plus \'Orange\', de façon immuable ?',
    options: [
      'const fruitsCopie = fruits.push(\'Orange\');',
      'const fruitsCopie = fruits.concat([\'Orange\']).reverse();',
      'const fruitsCopie = Object.assign(fruits, \'Orange\');',
      'const fruitsCopie = [...fruits, \'Orange\'];'
    ],
    correctIndex: 3,
    explanation: '[...fruits, \'Orange\'] utilise l\'opérateur spread pour étaler les éléments existants dans une toute nouvelle instance de tableau, préservant l\'immutabilité exigée par React.'
  },
  {
    id: 'm2-q7',
    moduleId: 'module2',
    difficulty: 'piege',
    tag: 'Shallow Copy',
    question: 'Soit const a = { info: { id: 1 } }; const b = { ...a }; b.info.id = 99; Quelle est la valeur de a.info.id ?',
    options: [
      '99, car le spread operator effectue une copie superficielle (shallow copy) partageant les objets imbriqués.',
      '1, car la syntaxe spread effectue un clonage profond et récursif de toutes les structures enfants.',
      'undefined, car l\'opération de décomposition réinitialise les sous-objets aux valeurs par défaut.',
      'Une exception TypeError est levée car deux objets distincts ne peuvent pointer sur la même clé id.'
    ],
    correctIndex: 0,
    explanation: 'L\'opérateur spread {...a} ne clone que le premier niveau de propriétés. Les objets imbriqués comme info restent partagés par référence mémoire entre a et b.'
  },
  {
    id: 'm2-q8',
    moduleId: 'module2',
    difficulty: 'fondamentaux',
    tag: 'Immutabilité React',
    question: 'Pourquoi React impose-t-il la création de nouvelles références d\'objets ou de tableaux pour mettre à jour le State ?',
    options: [
      'Pour que le compilateur Babel convertisse les fonctions fléchées en méthodes génératrices optimisées.',
      'Pour limiter l\'empreinte mémoire dans la pile d\'exécution en détruisant les prototypes précédents.',
      'Pour que la comparaison superficielle (prev !== next) détecte instantanément le changement et re-rende l\'UI.',
      'Pour empêcher les navigateurs anciens d\'afficher des avertissements de dépréciation dans la console.'
    ],
    correctIndex: 2,
    explanation: 'React utilise la comparaison référentielle superficielle (Object.is). Si vous modifiez un objet en place sans changer sa référence en mémoire, React considère que l\'état n\'a pas changé et omet le rendu.'
  },
  {
    id: 'm2-q9',
    moduleId: 'module2',
    difficulty: 'syntaxe',
    tag: 'Modules ES6',
    question: 'Quelle est la règle essentielle régissant les exports par défaut et nommés en JavaScript moderne (ES6 Modules) ?',
    options: [
      'Un module peut comporter plusieurs exports par défaut mais un seul export nommé par convention d\'équipe.',
      'Un module ne peut contenir qu\'un seul export par défaut, mais peut exporter plusieurs éléments nommés.',
      'Les imports nommés s\'écrivent obligatoirement sans accolades tandis que l\'import par défaut en exige.',
      'L\'instruction export default ne peut être utilisée que pour des primitives (strings, numbers, booleans).'
    ],
    correctIndex: 1,
    explanation: 'Un fichier JavaScript ne peut avoir qu\'un seul export par défaut (import Header from \'./Header\'), mais peut contenir autant d\'exports nommés que souhaité (import { Button, Modal } from \'./UI\').'
  },
  {
    id: 'm2-q10',
    moduleId: 'module2',
    difficulty: 'application',
    tag: 'Async / Await',
    question: 'Dans une fonction déclarée async, quel est l\'effet précis du mot-clé await placé devant un appel fetch() ?',
    options: [
      'Il convertit la requête réseau en un appel XMLHttpRequest synchrone bloquant le fil d\'exécution principal.',
      'Il annule immédiatement la promesse si le serveur distant ne répond pas dans un délai inférieur à 50ms.',
      'Il délègue le traitement de la requête au Web Worker système en arrière-plan sans retourner de réponse.',
      'Il suspend l\'exécution de la fonction jusqu\'à résolution de la Promesse sans bloquer le thread du navigateur.'
    ],
    correctIndex: 3,
    explanation: 'await permet d\'écrire du code asynchrone non-bloquant de façon linéaire et séquentielle, en suspendant la fonction courante jusqu\'à ce que la Promesse soit tenue ou rejetée.'
  }
];
