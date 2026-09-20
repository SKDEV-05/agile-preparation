import { ReactCourseModule } from '../../types/reactTypes';

export const MODULE_5: ReactCourseModule = {
  id: 'module5',
  orderNumber: 5,
  pdfReference: 'PDF 5',
  title: 'Cœur de React (Partie 2) : Listes, Formulaires, useEffect & APIs',
  subtitle: 'Gestion des Clés (Keys), Formulaires Contrôlés, Hook d\'Effet & Requêtes REST',
  description: 'Approfondissez vos compétences React : le rendu de collections avec la prop clé (key), les formulaires contrôlés multi-champs, la maîtrise du hook useEffect (dépendances et cleanup), et la consommation d\'APIs distantes via Fetch et Axios.',
  iconName: 'ListFilter',
  gradient: 'from-[#10B981] via-[#22C55E] to-[#0A0A0A]',
  sections: [
    {
      id: 'm5-s1',
      order: '01',
      title: 'Rendu de Listes & Rôle Crucial de la Prop "key"',
      quickSummary: 'Comment boucler proprement sur des tableaux avec .map() et pourquoi la clé est vitale.',
      conceptExplanation: 'Le rendu dynamique de collections s\'effectue grâce à la méthode JavaScript .map(). Chaque élément racine retourné dans la boucle doit posséder une prop unique et stable appelée "key".',
      deepExplanation: 'La clé permet à l\'algorithme de réconciliation de React d\'identifier chaque élément de manière unique entre deux rendus successifs. Si des éléments sont réordonnés, filtrés ou supprimés, la prop key permet à React de ne déplacer ou détruire que le nœud concerné dans le DOM sans tout reconstruire. N\'utilisez JAMAIS l\'index du tableau comme clé si la liste peut évoluer !',
      keyPoints: [
        'Syntaxe : items.map(item => <ItemCard key={item.id} {...item} />)',
        'Clé unique et stable : Utilisez l\'identifiant métier (item.id), jamais une valeur aléatoire (Math.random()).',
        'Piège de l\'index : key={index} fausse l\'état interne des composants en cas de suppression ou tri.',
        'Emplacement : La prop key doit toujours être placée sur l\'élément le plus externe retourné dans le .map().'
      ],
      examTraps: [
        'Piège classique d\'examen : "Pourquoi ne doit-on pas utiliser key={index} dans une liste dynamique ?" Réponse : Si un élément est supprimé au milieu de la liste, tous les index suivants changent, forçant React à re-rendre inutilement les éléments et risquant de mélanger les valeurs de formulaires internes.'
      ],
      diagramType: 'virtual_dom_diff',
      codeExamples: [
        {
          title: 'Rendu d\'une collection avec clé unique et filtrage',
          description: 'Combinaison classique de .filter() et .map() avec prop key.',
          code: `function ListeStagiaires() {
  const [filiereFiltre, setFiliereFiltre] = useState('Tous');
  const stagiaires = [
    { id: 'stg-1', nom: 'Yassine', filiere: 'FullStack' },
    { id: 'stg-2', nom: 'Salma', filiere: 'Mobile' },
    { id: 'stg-3', nom: 'Omar', filiere: 'FullStack' }
  ];

  const listeFiltree = filiereFiltre === 'Tous' 
    ? stagiaires 
    : stagiaires.filter(s => s.filiere === filiereFiltre);

  return (
    <div>
      <select value={filiereFiltre} onChange={e => setFiliereFiltre(e.target.value)}>
        <option value="Tous">Toutes filières</option>
        <option value="FullStack">FullStack</option>
        <option value="Mobile">Mobile</option>
      </select>
      <ul>
        {listeFiltree.map(stg => (
          <li key={stg.id} className="py-1">
            <strong>{stg.nom}</strong> — {stg.filiere}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
          outputPreview: 'Rendu fluide de la liste filtrée avec identification par stg.id.'
        }
      ],
      miniQuestion: {
        question: 'Quelle est la meilleure valeur à fournir à la prop key lors du rendu d\'une liste de produits ?',
        options: [
          'L\'index séquentiel fourni par la méthode de parcours map(produit, index)',
          'Un horodatage calculé dynamiquement via Date.now() lors de chaque exécution',
          'L\'identifiant unique et persistant du produit provenant de la base de données',
          'Une chaîne de caractères statique identique assignée à chaque élément rendu'
        ],
        correctIndex: 2,
        explanation: 'La clé doit être unique et stable d\'un rendu à l\'autre. L\'identifiant unique de la base de données (produit.id) est le choix optimal pour permettre à React de réconcilier les modifications sans erreur.'
      },
      officialDocReference: 'OFPPT M204 Support 5 — Pages 4 à 10'
    },
    {
      id: 'm5-s2',
      order: '02',
      title: 'Formulaires Contrôlés (Controlled Components)',
      quickSummary: 'Lier les champs HTML à l\'état React pour en faire l\'unique source de vérité.',
      conceptExplanation: 'Dans un formulaire contrôlé, la balise HTML (<input>, <select>, <textarea>) ne stocke pas sa propre valeur dans le DOM du navigateur. Sa valeur (value) est directement liée à une variable de state React, et toute saisie déclenche onChange pour mettre à jour ce state.',
      deepExplanation: 'Ce pattern garantit que l\'état React est l\'unique source de vérité (Single Source of Truth). Pour gérer efficacement des formulaires multi-champs sans dupliquer les gestionnaires d\'événements, on utilise la syntaxe d\'assignation dynamique de clé d\'objet [e.target.name]: e.target.value combinée à l\'opérateur spread.',
      keyPoints: [
        'Controlled : value={monState} + onChange={(e) => setMonState(e.target.value)}.',
        'e.preventDefault() : Indispensable sur onSubmit pour bloquer le rechargement brutal de la page par le navigateur.',
        'Multi-champs : setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })).',
        'Validation temps réel : Facile à implémenter puisque la valeur de chaque champ est instantanément disponible dans le state.'
      ],
      examTraps: [
        'Piège fréquent : Oublier e.preventDefault() dans la fonction handleSubmit d\'un formulaire. La page se recharge instantanément et tout le State React est remis à zéro !'
      ],
      diagramType: 'state_render_cycle',
      codeExamples: [
        {
          title: 'Formulaire contrôlé multi-champs dynamique',
          description: 'Gestion centralisée d\'un formulaire d\'inscription avec validation.',
          code: `function FormulaireStagiaire() {
  const [form, setForm] = useState({ nom: '', email: '', ville: 'Casablanca' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Mise à jour dynamique de la propriété ciblée par son attribut "name"
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Bloque le rechargement de la page
    console.log('Données validées :', form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input type="text" name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" />
      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <select name="ville" value={form.ville} onChange={handleChange}>
        <option value="Casablanca">Casablanca</option>
        <option value="Rabat">Rabat</option>
        <option value="Marrakech">Marrakech</option>
      </select>
      <button type="submit">Enregistrer</button>
    </form>
  );
}`,
          outputPreview: 'Formulaire 100% contrôlé par l\'état React form.'
        }
      ],
      miniQuestion: {
        question: 'Que provoque l\'omission de e.preventDefault() dans l\'écouteur onSubmit d\'un formulaire React ?',
        options: [
          'Le navigateur soumet le formulaire en HTTP synchrone et recharge la page entière, détruisant tout le state React en mémoire.',
          'Le compilateur TypeScript bloque le build en générant une exception de non-respect de contrat sur l\'événement de soumission.',
          'Le moteur graphique du navigateur masque l\'ensemble des champs du formulaire et réinitialise les inputs à leur valeur initiale.',
          'Le serveur distant refuse d\'accepter les données envoyées et retourne immédiatement une erreur d\'autorisation HTTP 403.'
        ],
        correctIndex: 0,
        explanation: 'Par défaut, un élément HTML <form> soumet la page au serveur et provoque un rechargement complet (comportement MPA classique). e.preventDefault() annule cette action par défaut pour laisser le contrôle au JavaScript de la SPA.'
      },
      officialDocReference: 'OFPPT M204 Support 5 — Pages 11 à 18'
    },
    {
      id: 'm5-s3',
      order: '03',
      title: 'Effets de Bord avec le Hook useEffect & Requêtes API REST',
      quickSummary: 'Interagir avec le monde extérieur : appels HTTP, minuteurs et synchronisation.',
      conceptExplanation: 'Un effet de bord (Side Effect) est toute opération qui sort du cadre du simple calcul d\'affichage : requêtes HTTP (Fetch/Axios), manipulation du titre de document, abonnements à des écouteurs globaux ou minuteurs (setInterval). Le hook useEffect permet de synchroniser ces opérations avec le cycle de vie du composant.',
      deepExplanation: 'Le comportement de useEffect dépend strictement de son 2ème argument (le tableau de dépendances) : 1. Sans tableau : s\'exécute après chaque rendu ; 2. Tableau vide [] : s\'exécute une seule fois au montage (équivalent componentDidMount) ; 3. Avec dépendances [id, search] : s\'exécute au montage et se ré-exécute dès qu\'une dépendance change ; 4. Fonction de retour (cleanup) : exécutée lors du démontage pour nettoyer les minuteurs ou annuler les requêtes.',
      keyPoints: [
        'Au montage (chargement API) : useEffect(() => { chargerDonnees(); }, []);',
        'Avec dépendances : useEffect(() => { chargerFiche(id); }, [id]);',
        'Fonction de nettoyage (Cleanup) : return () => clearInterval(timer); pour éviter les fuites de mémoire.',
        'Cycle d\'une requête API : Gérer toujours 3 états : loading (chargement), data (succès), error (échec).'
      ],
      examTraps: [
        'Piège mortel : Mettre à jour un state dans un useEffect sans tableau de dépendances : useEffect(() => { setCount(count + 1); });. Cela déclenche une boucle infinie de rendus qui gèle le navigateur !'
      ],
      diagramType: 'use_effect_lifecycle',
      codeExamples: [
        {
          title: 'Consommation d\'API REST avec gestion du chargement et d\'erreur',
          description: 'Pattern professionnel de requête asynchrone dans un useEffect.',
          code: `function ListeUtilisateurs() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Tableau vide [] = exécution unique au montage
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        if (!res.ok) throw new Error('Erreur HTTP ' + res.status);
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement des utilisateurs en cours...</div>;
  if (error) return <div className="text-red-500">Erreur : {error}</div>;

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name} ({u.email})</li>)}
    </ul>
  );
}`,
          outputPreview: 'Affiche un indicateur de chargement puis la liste des utilisateurs reçus de l\'API.'
        }
      ],
      miniQuestion: {
        question: 'Comment faire pour qu\'un hook useEffect ne s\'exécute qu\'une seule fois lors du premier affichage (montage) d\'un composant ?',
        options: [
          'En omettant le deuxième argument pour que React gère automatiquement le cycle.',
          'En écrivant useEffect.once(() => { ... }) qui est une méthode spécifique de React 18.',
          'En plaçant le hook dans un bloc conditionnel if (firstRender) { useEffect(...) }.',
          'En fournissant un tableau de dépendances vide [] comme deuxième argument.'
        ],
        correctIndex: 3,
        explanation: 'Fournir un tableau vide [] indique à React que l\'effet ne dépend d\'aucune valeur réactive. L\'effet ne sera donc invoqué qu\'une seule fois au montage du composant.'
      },
      officialDocReference: 'OFPPT M204 Support 5 — Pages 19 à 30'
    }
  ],
  practicalChallenge: {
    title: 'Défi Pratique : Recherche en direct avec effet dépendant',
    description: 'Complétez un composant qui déclenche une recherche à chaque fois que la variable searchTerm change, en s\'assurant que useEffect écoute correctement ce terme.',
    starterCode: `function RechercheStagiaire({ searchTerm }) {
  const [resultats, setResultats] = useState([]);

  useEffect(() => {
    console.log("Recherche en cours pour :", searchTerm);
    // Simule le filtre de recherche
  }, /* Complétez le tableau de dépendances ici */);

  return <div>Résultats : {resultats.length}</div>;
}`,
    expectedOutcome: 'L\'effet est re-déclenché uniquement lorsque searchTerm est modifié.',
    solutionCode: `function RechercheStagiaire({ searchTerm }) {
  const [resultats, setResultats] = useState([]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResultats([]);
      return;
    }
    console.log("Recherche en cours pour :", searchTerm);
    // Requête ou filtre basé sur searchTerm
  }, [searchTerm]);

  return <div>Résultats : {resultats.length}</div>;
}`,
    explanation: 'Placer [searchTerm] dans le tableau de dépendances assure que React ré-exécute l\'effet précisément et uniquement lorsque la valeur de searchTerm change.'
  },
  keyTakeaways: [
    'Toujours fournir une clé unique (key) pour les listes rendues avec .map().',
    'Un formulaire contrôlé lie la valeur des inputs à l\'état React et bloque le rafraîchissement avec e.preventDefault().',
    'useEffect gère les effets de bord et le cycle de vie : montage [], mise à jour [dep], et démontage (cleanup).',
    'Toute requête API doit anticiper les 3 états fondamentaux : chargement, succès et erreur.'
  ],
  commonTraps: [
    'Oublier le tableau de dépendances dans useEffect et créer une boucle de rendus infinie.',
    'Utiliser key={index} dans des listes dont l\'ordre ou le contenu peut changer.',
    'Oublier de nettoyer les abonnements ou timers (clearInterval) dans la fonction de retour de useEffect.'
  ]
};
