import { ReactCourseModule } from '../../types/reactTypes';

export const MODULE_6: ReactCourseModule = {
  id: 'module6',
  orderNumber: 6,
  pdfReference: 'PDF 6',
  title: 'Routage SPA & Tests Automatisés : React Router v6 & Jest',
  subtitle: 'Navigation Monopage sans Rechargement, Routes Imbriquées & Tests RTL',
  description: 'Apprenez à structurer des applications complexes à pages multiples avec React Router DOM v6 (routes dynamiques, paramètres useParams, Outlet imbriqué) et sécurisez votre code avec Jest et React Testing Library.',
  iconName: 'Compass',
  gradient: 'from-[#22C55E] to-[#10B981]',
  sections: [
    {
      id: 'm6-s1',
      order: '01',
      title: 'Navigation SPA avec React Router DOM v6',
      quickSummary: 'Bannir la balise <a href> au profit de <Link> et configurer BrowserRouter.',
      conceptExplanation: 'React Router DOM v6 est le standard de routage pour React. Il permet de synchroniser l\'interface avec l\'URL sans déclencher le moindre rechargement de page. Les balises HTML standards `<a href="...">` sont proscrites au profit de `<Link to="...">` ou `<NavLink to="...">`.',
      deepExplanation: 'Un routeur s\'articule autour de `<BrowserRouter>`, qui englobe l\'application et écoute l\'historique du navigateur. Le conteneur `<Routes>` compare l\'URL courante et sélectionne la première balise `<Route path="..." element={<MonComposant />} />` correspondante. `<NavLink>` ajoute automatiquement une classe CSS active lorsque l\'URL correspond.',
      keyPoints: [
        'Installation : npm install react-router-dom',
        'Conteneur global : <BrowserRouter> doit envelopper l\'arbre de composants.',
        'Déclaration des routes : <Routes><Route path="/" element={<Accueil />} /><Route path="/cours" element={<Cours />} /></Routes>',
        'Navigation sans rechargement : <Link to="/contact"> ou <NavLink to="/contact" className={({ isActive }) => isActive ? "actif" : ""}>.'
      ],
      examTraps: [
        'Piège classique d\'examen : Utiliser `<a href="/profil">Mon Profil</a>` dans une application React. Cela force le navigateur à détruire l\'application et à recharger la page depuis zéro, perdant tout le state en mémoire ! Utilisez TOUJOURS `<Link to="/profil">`.'
      ],
      diagramType: 'router_flow',
      codeExamples: [
        {
          title: 'Configuration de base d\'un routeur React Router v6',
          description: 'Structure canonique avec BrowserRouter, Link et Routes.',
          code: `import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';

function AppRouter() {
  return (
    <BrowserRouter>
      <nav className="flex gap-4 p-4 border-b">
        <NavLink to="/" className={({ isActive }) => isActive ? 'text-green-500 font-bold' : ''}>
          Accueil
        </NavLink>
        <NavLink to="/stagiaires" className={({ isActive }) => isActive ? 'text-green-500 font-bold' : ''}>
          Stagiaires
        </NavLink>
      </nav>

      <main className="p-4">
        <Routes>
          <Route path="/" element={<h2>Page d'Accueil OFPPT</h2>} />
          <Route path="/stagiaires" element={<h2>Liste des Stagiaires</h2>} />
          {/* Route 404 attrape-tout */}
          <Route path="*" element={<h2>Erreur 404 : Page introuvable</h2>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}`,
          outputPreview: 'Navigation instantanée entre les vues sans aucun clignotement ni rechargement.'
        }
      ],
      miniQuestion: {
        question: 'Pourquoi ne doit-on jamais utiliser la balise HTML standard <a href="/contact"> dans une SPA React ?',
        options: [
          'Parce qu\'elle provoque un rechargement complet de la page par le navigateur, détruisant l\'état React en mémoire vive.',
          'Parce que le compilateur Babel interdit l\'insertion d\'éléments HTML standards dans les composants déclarés en syntaxe JSX.',
          'Parce que la balise <a> ne fonctionne que dans les architectures MVC traditionnelles et déclenche une erreur dans React Router.',
          'Parce que les protocoles de routage sécurisés bloquent systématiquement les liens hypertextes ordinaires dans une SPA.'
        ],
        correctIndex: 0,
        explanation: 'La balise native <a href> déclenche une requête HTTP synchrone au serveur qui recharge entièrement la page. Le composant <Link to> de React Router intercepte l\'événement de clic et met à jour l\'affichage via l\'API History sans rechargement.'
      },
      officialDocReference: 'OFPPT M204 Support 6 — Pages 3 à 12'
    },
    {
      id: 'm6-s2',
      order: '02',
      title: 'Paramètres Dynamiques (useParams), useNavigate & Routes Imbriquées (Outlet)',
      quickSummary: 'Construire des routes de fiches détail /produits/:id et imbriquer des sous-layouts.',
      conceptExplanation: 'Les applications modernes affichent des fiches détaillées via des paramètres d\'URL (ex: /stagiaires/:id). Le hook useParams() extrait ces paramètres. Le hook useNavigate() permet de rediriger l\'utilisateur programmatiquement après une action (ex: après validation d\'un formulaire).',
      deepExplanation: 'Le composant `<Outlet />` permet de concevoir des layouts imbriqués (Nested Routes). Par exemple, un tableau de bord possédant une barre latérale persistante et une zone centrale dynamique déclare des routes enfants : `<Route path="/admin" element={<AdminLayout />}><Route path="stats" element={<Stats />} /></Route>`. Dans AdminLayout, `<Outlet />` indique où injecter le composant enfant.',
      keyPoints: [
        'Paramètre dynamique : path="/stagiaires/:id" -> const { id } = useParams();',
        'Redirection programmatique : const navigate = useNavigate(); navigate("/confirmation");',
        'Routes imbriquées : Les routes enfants partagent le layout parent défini avec <Outlet />.',
        'Route 404 : Déclarée avec path="*" en dernière position dans <Routes>.'
      ],
      examTraps: [
        'Attention à la syntaxe v6 : useParams retourne toujours des chaînes de caractères (string). Si votre identifiant est un nombre, n\'oubliez pas Number(id) ou parseInt(id, 10) pour vos comparaisons strictes === !'
      ],
      diagramType: 'router_flow',
      codeExamples: [
        {
          title: 'Extraction de paramètre d\'URL et redirection avec useNavigate',
          description: 'Lecture de :id et navigation après soumission.',
          code: `import { useParams, useNavigate } from 'react-router-dom';

function FicheStagiaire() {
  // 1. Récupération du paramètre d'URL :
  const { id } = useParams();
  const navigate = useNavigate();

  const handleRetour = () => {
    // 2. Navigation programmatique vers la liste :
    navigate('/stagiaires');
  };

  return (
    <div className="p-4 card">
      <h3>Détails du Stagiaire #{id}</h3>
      <p>Consultation de la fiche individuelle.</p>
      <button onClick={handleRetour} className="btn-secondary">
        ← Retour à la liste
      </button>
    </div>
  );
}`,
          outputPreview: 'Fiche du stagiaire correspondant à l\'ID dynamique de l\'URL.'
        }
      ],
      miniQuestion: {
        question: 'Dans une route configurée avec path="/cours/:code", quel hook permet de lire la valeur de "code" dans le composant affiché ?',
        options: [
          'useRouter()',
          'useHistory()',
          'useParams()',
          'useLocationId()'
        ],
        correctIndex: 2,
        explanation: 'useParams() est le hook officiel de React Router DOM v6 qui renvoie un objet contenant toutes les paires clé/valeur des paramètres dynamiques de l\'URL.'
      },
      officialDocReference: 'OFPPT M204 Support 6 — Pages 13 à 20'
    },
    {
      id: 'm6-s3',
      order: '03',
      title: 'Tests Automatisés avec Jest & React Testing Library (RTL)',
      quickSummary: 'Tester vos composants du point de vue de l\'utilisateur final avant le déploiement.',
      conceptExplanation: 'Les tests automatisés garantissent la non-régression du code lors de son évolution. Jest est le lanceur de test (test runner) et bibliothèque d\'assertions. React Testing Library (RTL) est l\'outil officiel pour restituer et interagir avec les composants comme le ferait un vrai utilisateur.',
      deepExplanation: 'La philosophie fondamentale de RTL est : "Plus vos tests ressemblent à la façon dont votre logiciel est utilisé, plus ils vous apportent de confiance". Au lieu de tester l\'état interne, on teste ce que l\'utilisateur voit à l\'écran (screen.getByText, screen.getByRole) et on simule ses clics (fireEvent.click ou userEvent.click).',
      keyPoints: [
        'test("description", () => { ... }) : Déclare un cas de test unitaire.',
        'render(<MonComposant />) : Monte virtuellement le composant dans un faux DOM de test (jsdom).',
        'screen.getByText(/Bonjour/i) : Recherche un élément visible pour l\'utilisateur.',
        'expect(element).toBeInTheDocument() : Assertion vérifiant la présence du nœud dans le document.',
        'Build de production : npm run build produit un dossier autonome et optimisé prêt pour la mise en ligne.'
      ],
      examTraps: [
        'Philosophie d\'examen : Ne testez pas les détails d\'implémentation (ex: les noms de variables de state). Testez toujours le comportement observable par l\'utilisateur final.'
      ],
      diagramType: 'virtual_dom_diff',
      codeExamples: [
        {
          title: 'Test unitaire d\'un bouton de compteur avec RTL et Jest',
          description: 'Scénario complet : rendu, simulation de clic et vérification du résultat.',
          code: `// Fichier : src/components/Compteur.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Compteur from './Compteur';

test('incrémente le compteur lors du clic sur le bouton', () => {
  // 1. Montage virtuel du composant
  render(<Compteur />);

  // 2. Vérification de l'état initial affiché à l'utilisateur
  expect(screen.getByText(/Score : 0/i)).toBeInTheDocument();

  // 3. Récupération du bouton et simulation du clic utilisateur
  const bouton = screen.getByRole('button', { name: /\\+1 Point/i });
  fireEvent.click(bouton);

  // 4. Assertion sur le résultat attendu après l'action
  expect(screen.getByText(/Score : 1/i)).toBeInTheDocument();
});`,
          outputPreview: 'PASS src/components/Compteur.test.jsx\n✓ incrémente le compteur lors du clic (12 ms)'
        }
      ],
      miniQuestion: {
        question: 'Quelle est la philosophie directrice de React Testing Library (RTL) ?',
        options: [
          'Inspecter minutieusement les variables d\'état privées et les méthodes internes pour valider chaque ligne d\'algorithme.',
          'Profiler les temps de calcul du Virtual DOM et la consommation de mémoire vive lors des montages et démontages successifs.',
          'Vérifier la stricte conformité syntaxique des arbres JSX par rapport au schéma de validation formel du compilateur Babel.',
          'Tester les composants du point de vue de l\'utilisateur final (éléments visibles et cliquables) plutôt que l\'implémentation interne.'
        ],
        correctIndex: 3,
        explanation: 'React Testing Library préconise de tester le comportement réel de l\'application tel que perçu par l\'utilisateur (textes, boutons, formulaires) plutôt que d\'inspecter l\'état ou les méthodes privées du composant.'
      },
      officialDocReference: 'OFPPT M204 Support 6 — Pages 21 à 30'
    }
  ],
  practicalChallenge: {
    title: 'Défi Pratique : Déclaration d\'une route 404',
    description: 'Complétez la structure de routage pour attraper toutes les URLs inexistantes et afficher un composant PageIntrouvable.',
    starterCode: `<Routes>
  <Route path="/" element={<Accueil />} />
  <Route path="/cours" element={<Cours />} />
  {/* Ajoutez ici la route 404 attrape-tout : */}
  
</Routes>`,
    expectedOutcome: 'Toute URL non reconnue affiche la page 404.',
    solutionCode: `<Routes>
  <Route path="/" element={<Accueil />} />
  <Route path="/cours" element={<Cours />} />
  <Route path="*" element={<PageIntrouvable />} />
</Routes>`,
    explanation: 'Le joker path="*" capture toutes les routes qui ne correspondent à aucun des motifs précédents, agissant comme un fallback 404 dans React Router v6.'
  },
  keyTakeaways: [
    'React Router v6 assure une navigation fluide sans jamais recharger le navigateur.',
    'Toujours utiliser <Link> ou <NavLink> à la place de la balise HTML native <a>.',
    'useParams extrait les segments dynamiques de l\'URL (:id) et useNavigate permet la redirection programmatique.',
    'Jest et React Testing Library permettent de tester l\'expérience utilisateur réelle des composants.'
  ],
  commonTraps: [
    'Utiliser <a href> et déclencher un rechargement intempestif de l\'application SPA.',
    'Oublier d\'envelopper l\'application dans un <BrowserRouter>.',
    'Oublier que les valeurs retournées par useParams() sont de type string.'
  ]
};
