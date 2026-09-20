import { LabExercise, LabFile, LabTest } from '../types/reactLabTypes';

export interface CodeReviewMetric {
  title: string;
  category: 'functional' | 'practices' | 'ofppt' | 'architecture';
  score: number;
  maxScore: number;
  status: 'passed' | 'warning' | 'failed';
  feedback: string;
  codeSuggestion?: string;
}

export interface CodeReviewReport {
  totalScore: number; // 0 to 100
  gradeBadge: string; // 'A+' | 'A' | 'B' | 'C' | 'D'
  gradeLabel: string;
  gradeColor: string; // hex
  functionalScore: number; // /40
  bestPracticesScore: number; // /25
  conventionsScore: number; // /20
  architectureScore: number; // /15
  metrics: CodeReviewMetric[];
  strengths: string[];
  improvements: string[];
  examTip: string;
  isPassing: boolean;
  isEmptyCode: boolean;
}

export function analyzeReactCode(
  exercise: LabExercise,
  files: LabFile[],
  testResults: { id: string; passed: boolean; message?: string }[]
): CodeReviewReport {
  const entryFile = files.find(f => f.path === exercise.entryFile) || files[0];
  const allContent = files.map(f => f.content).join('\n');
  const mainContent = entryFile ? entryFile.content : '';

  // 1. Detect if code is empty or strictly starter comments
  const strippedCode = mainContent
    .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
    .replace(/\s+/g, '');
  const isEmptyCode = strippedCode.length < 40;

  const metrics: CodeReviewMetric[] = [];
  const strengths: string[] = [];
  const improvements: string[] = [];

  // ── CATEGORY 1: TESTS FONCTIONNELS (40 PTS) ──
  const totalTests = exercise.tests.length;
  const passedTests = testResults.filter(t => t.passed).length;
  const functionalScore = totalTests > 0 
    ? Math.round((passedTests / totalTests) * 40)
    : (isEmptyCode ? 0 : 40);

  metrics.push({
    title: 'Conformité aux Spécifications & Tests Unitaires',
    category: 'functional',
    score: functionalScore,
    maxScore: 40,
    status: functionalScore >= 35 ? 'passed' : functionalScore >= 20 ? 'warning' : 'failed',
    feedback: functionalScore === 40
      ? `Tous les tests unitaires (${passedTests}/${totalTests}) sont validés avec succès !`
      : `${passedTests}/${totalTests} tests réussis. Vérifiez les étapes de la consigne pour valider tous les critères.`
  });

  if (passedTests === totalTests && totalTests > 0) {
    strengths.push(`Objectif pédagogique atteint : 100% des tests unitaires validés (${passedTests}/${totalTests}).`);
  } else if (passedTests > 0) {
    improvements.push(`${totalTests - passedTests} test(s) unitaire(s) restent en échec. Consultez l'onglet Tests pour le détail.`);
  } else if (isEmptyCode) {
    improvements.push("Le code n'est pas encore complété. Remplissez les TODOs dans l'éditeur.");
  }

  // ── CATEGORY 2: BONNES PRATIQUES & IMMUTABILITÉ (25 PTS) ──
  let practicesScore = 0;

  // 2a. Mutation Check (6 pts)
  const hasDirectMutation = 
    /\.push\(|\.splice\(|\.sort\(|\.reverse\(/.test(allContent) ||
    /\b(state|user|compteur|items|stagiaires)\.[a-zA-Z0-9_]+\s*=(?!=)/.test(allContent);

  if (hasDirectMutation) {
    metrics.push({
      title: 'Immutabilité du State (Règle d\'or React)',
      category: 'practices',
      score: 0,
      maxScore: 6,
      status: 'failed',
      feedback: 'Attention : Détection d\'une mutation directe du state (ex: .push() ou state.prop = val). En React, le state doit être immuable.',
      codeSuggestion: 'Utilisez le spread operator : [...prev, nouvelItem] ou {...prev, champ: nouvelleValeur}'
    });
    improvements.push('Évitez la mutation directe : préférez toujours les copies avec décomposition {...obj} ou [...arr].');
  } else {
    practicesScore += 6;
    metrics.push({
      title: 'Respect de l\'Immutabilité du State',
      category: 'practices',
      score: 6,
      maxScore: 6,
      status: 'passed',
      feedback: 'Excellent ! Aucune mutation directe détectée. L\'état est traité de manière immuable.'
    });
    strengths.push('Immutabilité scrupuleusement respectée (fondamental pour les re-rendus React).');
  }

  // 2b. Functional Updater for useState (5 pts)
  const usesFunctionalUpdater = /set[A-Za-z0-9_]+\(\s*(prev|old|current|\(?prev\)?\s*=>)/.test(allContent);
  const mentionsCountOrIncrement = /compteur|count|incrementer|ajouter/i.test(exercise.id + exercise.title);

  if (mentionsCountOrIncrement) {
    if (usesFunctionalUpdater) {
      practicesScore += 5;
      metrics.push({
        title: 'Mise à Jour Atomique (prev => prev + 1)',
        category: 'practices',
        score: 5,
        maxScore: 5,
        status: 'passed',
        feedback: 'Parfait ! Utilisation de la fonction updater fonctionnelle pour éviter les conditions de concurrence.'
      });
      strengths.push('Usage exemplaire de la fonction updater fonctionnelle `setState(prev => ...)`.');
    } else if (!isEmptyCode) {
      practicesScore += 2;
      metrics.push({
        title: 'Forme Fonctionnelle du Setter d\'État',
        category: 'practices',
        score: 2,
        maxScore: 5,
        status: 'warning',
        feedback: 'Conseil : Lorsque le nouvel état dépend de l\'ancien, privilégiez `setCount(prev => prev + 1)` plutôt que `setCount(count + 1)`.',
        codeSuggestion: 'setCompteur(prev => prev + 1);'
      });
      improvements.push('Privilégiez la forme `prev => ...` dans vos setters quand vous modifiez un compteur.');
    }
  } else {
    // Non-counter exercise: award baseline
    practicesScore += 5;
  }

  // 2c. useEffect Dependency Array (5 pts)
  if (allContent.includes('useEffect')) {
    const hasDependencyArray = /useEffect\s*\([\s\S]*?,\s*\[[\s\S]*?\]\s*\)/.test(allContent);
    if (hasDependencyArray) {
      practicesScore += 5;
      metrics.push({
        title: 'Tableau de Dépendances de useEffect',
        category: 'practices',
        score: 5,
        maxScore: 5,
        status: 'passed',
        feedback: 'Bravo ! Le hook useEffect possède son tableau de dépendances, évitant les boucles infinies.'
      });
      strengths.push('Tableau de dépendances de useEffect correctement configuré.');
    } else {
      metrics.push({
        title: 'Danger : useEffect sans Dépendances',
        category: 'practices',
        score: 0,
        maxScore: 5,
        status: 'failed',
        feedback: 'Alerte : useEffect sans tableau de dépendances s\'exécute après chaque rendu et peut créer une boucle infinie avec fetch/setState !',
        codeSuggestion: 'useEffect(() => { ... }, []); // [] pour exécuter une seule fois au montage'
      });
      improvements.push('Ajoutez impérativement le tableau de dépendances `[]` comme 2ème argument de `useEffect`.');
    }
  } else {
    practicesScore += 5;
  }

  // 2d. Keys in Lists (5 pts)
  if (allContent.includes('.map(')) {
    const hasKeyInMap = /\.map\s*\([\s\S]*?key\s*=\s*[\s\S]*?\)/.test(allContent);
    if (hasKeyInMap) {
      practicesScore += 5;
      metrics.push({
        title: 'Clés Uniques dans les Listes (Prop `key`)',
        category: 'practices',
        score: 5,
        maxScore: 5,
        status: 'passed',
        feedback: 'Correct ! L\'attribut `key` est bien fourni lors de l\'itération avec .map().'
      });
      strengths.push('Attributs `key` uniques bien renseignés dans les rendus de listes.');
    } else {
      metrics.push({
        title: 'Clé Manquante dans le Rendu de Liste',
        category: 'practices',
        score: 1,
        maxScore: 5,
        status: 'warning',
        feedback: 'Attention : React exige une prop `key` unique et stable sur chaque élément retourné par un .map().',
        codeSuggestion: '<div key={item.id}>...</div>'
      });
      improvements.push('Fournissez toujours une clé stable `key={item.id}` dans vos boucles `.map()`.');
    }
  } else {
    practicesScore += 5;
  }

  // 2e. Controlled Forms & e.preventDefault() (4 pts)
  if (allContent.includes('<form') || allContent.includes('onSubmit')) {
    const hasPreventDefault = /preventDefault\(/.test(allContent);
    if (hasPreventDefault) {
      practicesScore += 4;
      metrics.push({
        title: 'Gestionnaire de Formulaire SPA (e.preventDefault)',
        category: 'practices',
        score: 4,
        maxScore: 4,
        status: 'passed',
        feedback: 'Parfait ! e.preventDefault() bloque la soumission HTML native et préserve la SPA.'
      });
      strengths.push('Soumission de formulaire gérée proprement avec `e.preventDefault()`.');
    } else {
      metrics.push({
        title: 'Oubli de e.preventDefault() dans le Formulaire',
        category: 'practices',
        score: 0,
        maxScore: 4,
        status: 'failed',
        feedback: 'Faute fréquente à l\'examen : sans e.preventDefault(), le navigateur recharge toute la page et vide l\'état React !',
        codeSuggestion: 'const handleSubmit = (e) => { e.preventDefault(); ... };'
      });
      improvements.push('Ajoutez `e.preventDefault()` au tout début de votre fonction `handleSubmit`.');
    }
  } else {
    practicesScore += 4;
  }

  // ── CATEGORY 3: CONVENTIONS & SYNTAXE OFPPT M204 (20 PTS) ──
  let conventionsScore = 0;

  // 3a. Component Export (5 pts)
  const hasExport = /export\s+default\s+(function|class|[A-Za-z0-9_]+)/.test(mainContent);
  if (hasExport) {
    conventionsScore += 5;
    metrics.push({
      title: 'Exportation de Composant Standard',
      category: 'ofppt',
      score: 5,
      maxScore: 5,
      status: 'passed',
      feedback: 'Le composant racine est correctement exporté par défaut (`export default function App`).'
    });
  } else if (!isEmptyCode) {
    metrics.push({
      title: 'Exportation Manquante ou Non Conforme',
      category: 'ofppt',
      score: 1,
      maxScore: 5,
      status: 'warning',
      feedback: 'Pensez à déclarer `export default function App()` pour que le composant soit accessible.'
    });
  }

  // 3b. PascalCase Component Naming (5 pts)
  const hasPascalCaseComponent = /function\s+[A-Z][a-zA-Z0-9_]*/.test(allContent) || /const\s+[A-Z][a-zA-Z0-9_]*\s*=\s*\(/.test(allContent);
  if (hasPascalCaseComponent) {
    conventionsScore += 5;
    metrics.push({
      title: 'Nommage PascalCase des Composants React',
      category: 'ofppt',
      score: 5,
      maxScore: 5,
      status: 'passed',
      feedback: 'Respect strict de la convention PascalCase (ex: App, CarteStagiaire).'
    });
  } else if (!isEmptyCode) {
    conventionsScore += 2;
    improvements.push('Les composants React doivent obligatoirement commencer par une majuscule (PascalCase).');
  }

  // 3c. Clean JSX Attributes (5 pts)
  const hasWrongClass = /\bclass\s*=\s*["']/.test(allContent);
  const hasWrongFor = /\bfor\s*=\s*["']/.test(allContent);
  if (!hasWrongClass && !hasWrongFor) {
    conventionsScore += 5;
    metrics.push({
      title: 'Attributs JSX Conformes (className / htmlFor)',
      category: 'ofppt',
      score: 5,
      maxScore: 5,
      status: 'passed',
      feedback: 'Attributs JSX bien orthographiés (aucun usage de "class" ou "for" non transpilé).'
    });
  } else {
    metrics.push({
      title: 'Attribut HTML au lieu d\'attribut JSX',
      category: 'ofppt',
      score: 2,
      maxScore: 5,
      status: 'warning',
      feedback: 'En JSX, utilisez `className` au lieu de `class`, et `htmlFor` au lieu de `for`.'
    });
    improvements.push('Remplacez les attributs HTML `class` et `for` par `className` et `htmlFor`.');
  }

  // 3d. Proper React Imports (5 pts)
  const hasReactImport = /import\s+React/.test(mainContent) || /import\s+\{[^}]*\}\s+from\s+['"]react['"]/.test(mainContent);
  if (hasReactImport || allContent.includes('useState')) {
    conventionsScore += 5;
  } else {
    conventionsScore += 2;
  }

  // ── CATEGORY 4: ARCHITECTURE & DÉCOUPAGE (15 PTS) ──
  let architectureScore = 0;

  // 4a. Props / State Destructuring (8 pts)
  const hasDestructuring = /const\s*\{\s*[a-zA-Z0-9_,\s]+\s*\}\s*=/.test(allContent) || /function\s+[A-Za-z0-9_]+\s*\(\s*\{\s*[a-zA-Z0-9_,\s]+\s*\}\s*\)/.test(allContent);
  if (hasDestructuring) {
    architectureScore += 8;
    metrics.push({
      title: 'Déstructuration Élégante des Props et Données',
      category: 'architecture',
      score: 8,
      maxScore: 8,
      status: 'passed',
      feedback: 'Code lisible et moderne grâce à la déstructuration d\'objets ES6.'
    });
    strengths.push('Excellente lisibilité du code via la déstructuration ES6 des objets et props.');
  } else if (!isEmptyCode) {
    architectureScore += 4;
    metrics.push({
      title: 'Déstructuration Conseillée',
      category: 'architecture',
      score: 4,
      maxScore: 8,
      status: 'warning',
      feedback: 'Conseil de lisibilité : déstructurez vos props ou objets (ex: `const { nom, note } = stagiaire;`).'
    });
  }

  // 4b. Multi-File / Modular Organization (7 pts)
  if (files.length > 1) {
    architectureScore += 7;
    metrics.push({
      title: 'Architecture Modulaire Multi-Fichiers',
      category: 'architecture',
      score: 7,
      maxScore: 7,
      status: 'passed',
      feedback: `Projet bien structuré avec ${files.length} fichiers distincts.`
    });
  } else {
    architectureScore += 5;
  }

  // Clamp category scores if empty code
  if (isEmptyCode) {
    practicesScore = 0;
    conventionsScore = 0;
    architectureScore = 0;
  }

  // Calculate final total
  const totalScore = Math.min(100, Math.max(0, functionalScore + practicesScore + conventionsScore + architectureScore));

  let gradeBadge = 'A+';
  let gradeLabel = 'Excellence Maîtrisée · Félicitations !';
  let gradeColor = '#10B981';

  if (totalScore >= 90) {
    gradeBadge = 'A+';
    gradeLabel = 'Excellence Maîtrisée · Niveau Examen Validé';
    gradeColor = '#10B981';
  } else if (totalScore >= 75) {
    gradeBadge = 'A';
    gradeLabel = 'Très Bon Travail · Compétences Acquises';
    gradeColor = '#22C55E';
  } else if (totalScore >= 60) {
    gradeBadge = 'B';
    gradeLabel = 'Bon Résultat · Quelques Points à Peaufiner';
    gradeColor = '#22C55E';
  } else if (totalScore >= 40) {
    gradeBadge = 'C';
    gradeLabel = 'En Cours d\'Acquisition · Des Ajustements Nécessaires';
    gradeColor = '#f59e0b';
  } else {
    gradeBadge = 'D';
    gradeLabel = isEmptyCode ? 'Code Non Rédigé · Commencez l\'Atelier' : 'À Revoir · Plusieurs Erreurs Majeures';
    gradeColor = '#ef4444';
  }

  // Exam tip tailored to exercise
  let examTip: string = exercise.conceptReminder.keyRule || "Rappel Examen OFPPT : Respectez l'immutabilité et les conventions React.";
  if (exercise.id.includes('jsx')) {
    examTip = "Rappel Examen OFPPT : En JSX, les instructions comme if/else sont interdites au cœur du rendu. Utilisez l'opérateur ternaire (condition ? vrai : faux) ou le court-circuit (condition && composant).";
  } else if (exercise.id.includes('props')) {
    examTip = "Rappel Examen OFPPT : Les props sont en lecture seule (read-only) et coulent de haut en bas (flux unidirectionnel). Le composant enfant ne doit jamais les muter.";
  } else if (exercise.id.includes('state')) {
    examTip = "Rappel Examen OFPPT : Pour toute mise à jour dépendant de la valeur antérieure (ex: compteur), écrivez toujours setCount(prev => prev + 1) afin d'éviter les anomalies de batching.";
  } else if (exercise.id.includes('forms')) {
    examTip = "Rappel Examen OFPPT : Un formulaire contrôlé associe obligatoirement chaque input à un état via value et onChange. N'oubliez jamais e.preventDefault() dans onSubmit.";
  } else if (exercise.id.includes('effects')) {
    examTip = "Rappel Examen OFPPT : Oublier le 2ème argument [] dans useEffect() provoque une boucle infinie de re-rendus. Fournissez toujours le tableau des dépendances.";
  } else if (exercise.id.includes('redux')) {
    examTip = "Rappel Examen OFPPT : Le Reducer Redux doit être une fonction pure. Ne modifiez jamais l'état initial par mutation directe, retournez toujours une nouvelle copie avec {...state}.";
  }

  return {
    totalScore,
    gradeBadge,
    gradeLabel,
    gradeColor,
    functionalScore,
    bestPracticesScore: practicesScore,
    conventionsScore,
    architectureScore,
    metrics,
    strengths,
    improvements,
    examTip,
    isPassing: totalScore >= 70,
    isEmptyCode
  };
}
