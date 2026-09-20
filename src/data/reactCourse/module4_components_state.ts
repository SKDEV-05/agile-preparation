import { ReactCourseModule } from '../../types/reactTypes';

export const MODULE_4: ReactCourseModule = {
  id: 'module4',
  orderNumber: 4,
  pdfReference: 'PDF 4',
  title: 'Cœur de React (Partie 1) : JSX, Props, Événements & State',
  subtitle: 'Syntaxe JSX, Communication Inter-Composants & Hook useState',
  description: 'Maîtrisez les piliers fondamentaux de React : la syntaxe JSX et sa transpilation par Babel, le passage de props descendantes, la communication ascendante par callbacks, et la gestion du State local avec useState.',
  iconName: 'Code',
  gradient: 'from-[#22C55E] via-[#10B981] to-[#22C55E]',
  sections: [
    {
      id: 'm4-s1',
      order: '01',
      title: 'Syntaxe JSX & Transpilation Babel',
      quickSummary: 'Écrire du HTML dans du JavaScript : règles absolues et conversion sous le capot.',
      conceptExplanation: 'JSX (JavaScript XML) est une extension de syntaxe permettant d\'écrire des balises d\'apparence HTML au cœur de fichiers JavaScript. Les navigateurs ne comprenant pas JSX, le transpileur Babel convertit chaque balise en appel React.createElement().',
      deepExplanation: 'JSX impose des règles strictes : un seul élément parent conteneur retourné (ou un Fragment <>...</>), fermeture obligatoire de toutes les balises même auto-fermantes (<img />, <input />), attributs en camelCase (className au lieu de class, htmlFor au lieu de for), et insertion d\'expressions JavaScript dynamiques entre simples accolades {}.',
      keyPoints: [
        'Babel : Traduit <h1 className="x">Titre</h1> en React.createElement("h1", { className: "x" }, "Titre").',
        'Fragment <>...</> : Permet de regrouper plusieurs éléments sans injecter de <div> superflue dans le DOM réel.',
        'camelCase : class -> className, for -> htmlFor, onclick -> onClick, tabindex -> tabIndex.',
        'Accolades {} : Tout ce qui produit une valeur JS (variable, ternaire, appel de fonction) peut être inséré.'
      ],
      examTraps: [
        'Piège classique : Écrire class="btn" au lieu de className="btn". En React, class est un mot réservé du langage JavaScript !',
        'Piège d\'instruction : Mettre des blocs d\'instructions comme if/else ou for directement à l\'intérieur des accolades {}. Faux ! Seules les EXPRESSIONS produisant une valeur (comme les ternaires ou .map()) sont autorisées.'
      ],
      diagramType: 'virtual_dom_diff',
      codeExamples: [
        {
          title: 'Syntaxe JSX correcte avec Fragment et expressions dynamiques',
          description: 'Illustration des règles impératives de JSX.',
          code: `function ProfilStagiaire() {
  const nom = "Fatima";
  const note = 17;

  return (
    <>
      <h2 className="text-xl font-bold">Stagiaire : {nom}</h2>
      <p>Mention : {note >= 16 ? "Très Bien" : "Passable"}</p>
      <input type="text" placeholder="Commentaire" className="input-champ" />
    </>
  );
}`,
          outputPreview: 'Rendu propre avec Fragment sans balise conteneur parasite.'
        }
      ],
      miniQuestion: {
        question: 'Pourquoi devez-vous utiliser className au lieu de class pour styliser un élément en JSX ?',
        options: [
          'Parce que className autorise la concaténation dynamique de sélecteurs CSS multiples, alors que class reste figé en HTML brut.',
          'Parce que le Virtual DOM rejette systématiquement les attributs HTML natifs non typés par l\'interface générique standard.',
          'Parce que les bundlers Webpack et Vite transforment tout attribut class en une directive binaire incompatible avec React.',
          'Parce que "class" est un mot réservé en JavaScript pour déclarer des classes ES6, créant une collision lexicale en JSX.'
        ],
        correctIndex: 3,
        explanation: 'En JavaScript pur, "class" est un mot-clé réservé pour les classes d\'objets. Pour éviter toute collision lors de la transpilation du JSX vers JavaScript, React utilise l\'attribut "className".'
      },
      officialDocReference: 'OFPPT M204 Support 4 — Pages 4 à 11'
    },
    {
      id: 'm4-s2',
      order: '02',
      title: 'Props, Composition & Communication Inter-Composants',
      quickSummary: 'Comment les données circulent du parent vers l\'enfant, et remontent via des callbacks.',
      conceptExplanation: 'Les props (propriétés) sont les paramètres d\'entrée d\'un composant. Elles sont strictement en lecture seule (immuables) et circulent du haut vers le bas (Parent -> Enfant). Pour communiquer d\'un enfant vers son parent, le parent transmet une fonction de rappel (callback) en prop.',
      deepExplanation: 'Un composant enfant ne doit JAMAIS modifier directement une prop reçue. Si deux composants frères doivent partager une même information, on applique le principe de remontée d\'état (Lifting State Up) : on déplace le State dans leur parent commun le plus proche. La prop spéciale props.children permet de créer des composants conteneurs génériques (cartes, modals, panneaux).',
      keyPoints: [
        'Unidirectionnel : Le flux de données circule toujours du composant parent vers les composants enfants.',
        'Immuabilité des Props : Un composant enfant ne peut pas écrire props.nom = "autre".',
        'Callback Enfant -> Parent : Le parent passe onAction={(donnee) => ...} et l\'enfant déclenche props.onAction(donnee).',
        'props.children : Capture le contenu inséré entre la balise ouvrante et fermante <Card>Mon Contenu</Card>.'
      ],
      examTraps: [
        'Erreur typique : "Un composant enfant peut-il modifier directement le state de son parent ?" Réponse : Non ! Il ne peut que solliciter la fonction de rappel (callback) que son parent a bien voulu lui passer en prop.'
      ],
      diagramType: 'props_tree',
      codeExamples: [
        {
          title: 'Communication bidirectionnelle Parent <-> Enfant via Callback',
          description: 'Le parent gère l\'état et transmet une fonction de suppression à l\'enfant.',
          code: `// Composant Enfant :
function ItemLigne({ id, titre, onSupprimer }) {
  return (
    <div className="flex justify-between p-2 border-b">
      <span>{titre}</span>
      {/* L'enfant appelle la fonction fournie par le parent */}
      <button onClick={() => onSupprimer(id)}>Supprimer</button>
    </div>
  );
}

// Composant Parent :
function ListeManager() {
  const [items, setItems] = useState([
    { id: 1, titre: "Apprendre les Props" },
    { id: 2, titre: "Maîtriser les Callbacks" }
  ]);

  const supprimerItem = (idASupprimer) => {
    setItems(items.filter(item => item.id !== idASupprimer));
  };

  return (
    <div>
      {items.map(item => (
        <ItemLigne key={item.id} {...item} onSupprimer={supprimerItem} />
      ))}
    </div>
  );
}`,
          outputPreview: 'La suppression demandée par le bouton enfant met à jour la liste du parent.'
        }
      ],
      miniQuestion: {
        question: 'Comment un composant enfant peut-il transmettre une information à son composant parent ?',
        options: [
          'En exécutant une fonction callback transmise par le parent sous forme de prop.',
          'En modifiant directement la variable de state du parent grâce à une référence partagée.',
          'En utilisant l\'API native du navigateur document.dispatchEvent pour remonter l\'information.',
          'En accédant au context global React.parentContext depuis n\'importe quel composant enfant.'
        ],
        correctIndex: 0,
        explanation: 'Dans le modèle unidirectionnel de React, la communication ascendante (enfant vers parent) s\'effectue en invoquant une fonction passée en prop par le composant parent.'
      },
      officialDocReference: 'OFPPT M204 Support 4 — Pages 12 à 19'
    },
    {
      id: 'm4-s3',
      order: '03',
      title: 'State Local & Le Hook useState (Les 4 Règles Cardinales)',
      quickSummary: 'Donner de la mémoire dynamique à vos composants avec le hook useState.',
      conceptExplanation: 'Le State (état local) est la mémoire interne d\'un composant. Contrairement aux props qui viennent de l\'extérieur, le State est géré et modifié de l\'intérieur. Lorsque le State change, React ré-exécute automatiquement le composant pour redessiner l\'interface.',
      deepExplanation: 'Le hook useState s\'utilise sous la forme : const [valeur, setValeur] = useState(valeurInitiale). Quatre règles cardinales régissent le State : 1. Immutabilité (ne jamais muter directement) ; 2. Asynchronisme des mises à jour ; 3. Utilisation de la fonction updater setValeur(prev => prev + 1) en cas de dépendance à la valeur précédente ; 4. Appel des hooks au niveau racine uniquement.',
      keyPoints: [
        'Déclaration : const [count, setCount] = useState(0);',
        'Fonction Updater : Toujours utiliser setCount(prev => prev + 1) quand le nouvel état dépend du précédent.',
        'Règles des Hooks : Appeler les hooks au niveau supérieur du composant (jamais dans un if, for ou fonction imbriquée).',
        'Rendu : Chaque appel au setter (setCount) planifie un nouveau rendu du composant avec la nouvelle valeur.'
      ],
      examTraps: [
        'Piège classique d\'examen : Écrire setCount(count + 1); setCount(count + 1);. Le compteur n\'augmente que de 1 car count n\'a pas encore été mis à jour ! La solution est la fonction updater : setCount(prev => prev + 1); setCount(prev => prev + 1); qui augmente bien de 2.'
      ],
      diagramType: 'state_render_cycle',
      codeExamples: [
        {
          title: 'Compteur dynamique avec fonction updater',
          description: 'Gestion propre du State local avec useState.',
          code: `import React, { useState } from 'react';

function CompteurOFPPT() {
  const [compteur, setCompteur] = useState(0);

  const incrementer = () => {
    // Bonne pratique : utiliser la fonction updater
    setCompteur(prev => prev + 1);
  };

  const reinitialiser = () => {
    setCompteur(0);
  };

  return (
    <div className="p-4 border rounded">
      <h3>Score : {compteur}</h3>
      <div className="flex gap-2 mt-2">
        <button onClick={incrementer} className="btn-green">+1 Point</button>
        <button onClick={reinitialiser} className="btn-gray">Reset</button>
      </div>
    </div>
  );
}

export default CompteurOFPPT;`,
          outputPreview: 'Score : 0 (Cliquez sur +1 Point pour incrémenter dynamiquement)'
        }
      ],
      miniQuestion: {
        question: 'Pourquoi doit-on privilégier setCount(prev => prev + 1) plutôt que setCount(count + 1) ?',
        options: [
          'Pour forcer l\'exécution immédiate et synchrone du re-rendu sans passer par la file d\'attente du moteur de réconciliation.',
          'Pour interdire au composant de déclencher des effets secondaires dans les hooks enfants avant la fin du cycle courant.',
          'Pour garantir que la mise à jour s\'applique sur la valeur la plus récente du state, notamment lors du batching automatique.',
          'Pour permettre au ramasse-miettes du navigateur de purger les anciennes fermetures lexicales (closures) obsolètes.'
        ],
        correctIndex: 2,
        explanation: 'Les mises à jour de state dans React sont asynchrones et peuvent être regroupées (batching). Passer une fonction updater (prev => prev + 1) garantit que le calcul se base sur la valeur d\'état la plus fraîchement calculée.'
      },
      officialDocReference: 'OFPPT M204 Support 4 — Pages 20 à 28'
    }
  ],
  practicalChallenge: {
    title: 'Défi Pratique : Bascule d\'affichage (Toggle State)',
    description: 'Créez un composant AfficherMasquer qui maintient un état booléen visible (initialisé à true) et un bouton qui bascule cet état pour masquer ou afficher un paragraphe.',
    starterCode: `function AfficherMasquer() {
  // Déclarez l'état useState et le gestionnaire de clic :
  
}`,
    expectedOutcome: 'Le bouton bascule le texte entre "Masquer" et "Afficher", et le paragraphe disparaît/apparaît.',
    solutionCode: `function AfficherMasquer() {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setVisible(prev => !prev)}>
        {visible ? 'Masquer la réponse' : 'Afficher la réponse'}
      </button>
      {visible && <p className="mt-2">Voici la solution détaillée de l'examen !</p>}
    </div>
  );
}`,
    explanation: 'L\'utilisation d\'un état booléen avec setVisible(prev => !prev) combiné à l\'opérateur conditionnel court-circuit {visible && <p>...</p>} est le pattern standard pour les bascules d\'affichage en React.'
  },
  keyTakeaways: [
    'JSX combine la puissance du JavaScript avec la lisibilité du HTML.',
    'Les props sont immuables et circulent exclusivement de haut en bas.',
    'Pour transmettre des données vers le parent, l\'enfant appelle un callback passé en prop.',
    'useState donne de la réactivité locale au composant : toute modification de state déclenche un re-rendu.'
  ],
  commonTraps: [
    'Écrire class au lieu de className ou for au lieu de htmlFor en JSX.',
    'Muter directement le state (ex: state = 5 ou state.items.push(x)) au lieu d\'utiliser la fonction setter.',
    'Appeler des hooks dans des boucles for ou des conditions if.'
  ]
};
