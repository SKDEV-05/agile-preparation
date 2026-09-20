import { ReactQuestion } from '../../types/reactTypes';

export const MODULE_6_QUESTIONS: ReactQuestion[] = [
  {
    id: 'm6-q1',
    moduleId: 'module6',
    difficulty: 'fondamentaux',
    tag: 'React Router v6',
    question: 'Quel composant officiel de React Router DOM v6 remplace les balises HTML traditionnelles <a href="..."> pour naviguer sans recharger ?',
    options: [
      '<RouteLink to="..."> ou <RedirectTo href="...">',
      '<Link to="..."> ou <NavLink to="...">',
      '<Anchor path="..."> ou <HistoryLink url="...">',
      '<Jump to="..."> ou <Navigate href="...">;'
    ],
    correctIndex: 1,
    explanation: '<Link> et <NavLink> interceptent le clic de navigation dans le navigateur pour mettre à jour l\'historique via l\'API History sans provoquer de rechargement HTTP de page.'
  },
  {
    id: 'm6-q2',
    moduleId: 'module6',
    difficulty: 'syntaxe',
    tag: 'Structure Router v6',
    question: 'Dans React Router v6, quelle est la structure syntaxique standard pour déclarer une route associant un chemin et son composant ?',
    options: [
      '<Route path="/contact" component={Contact} />',
      '<Route to="/contact" view={<Contact />} />',
      '<Route path="/contact" element={<Contact />} />',
      '<Route url="/contact" render={() => Contact} />'
    ],
    correctIndex: 2,
    explanation: 'Dans React Router DOM v6, la prop se nomme element et attend une instance d\'élément JSX element={<Contact />} au lieu des anciennes props component ou render.'
  },
  {
    id: 'm6-q3',
    moduleId: 'module6',
    difficulty: 'application',
    tag: 'useParams',
    question: 'Soit la déclaration de route <Route path="/stagiaires/:id" element={<Fiche />} />. Comment récupérer la valeur du paramètre id dans Fiche ?',
    options: [
      'const { id } = useParams();',
      'const { id } = useRouteMatch();',
      'const id = props.match.params.id;',
      'const id = useHistory().getParam(\'id\');'
    ],
    correctIndex: 0,
    explanation: 'Le hook useParams() extrait tous les segments dynamiques préfixés par deux points (:id) définis dans la configuration des routes.'
  },
  {
    id: 'm6-q4',
    moduleId: 'module6',
    difficulty: 'application',
    tag: 'useNavigate',
    question: 'Comment déclencher une redirection de navigation programmatique vers la page "/succes" après le traitement d\'une action ?',
    options: [
      'window.location.assign(\'/succes\');',
      'const history = useHistory(); history.push(\'/succes\');',
      'useRouter().redirectTo(\'/succes\');',
      'const navigate = useNavigate(); navigate(\'/succes\');'
    ],
    correctIndex: 3,
    explanation: 'useNavigate() renvoie une fonction de navigation qui permet de rediriger programmatiquement l\'utilisateur sans recharger l\'état de la SPA.'
  },
  {
    id: 'm6-q5',
    moduleId: 'module6',
    difficulty: 'fondamentaux',
    tag: 'Outlet & Nested Routes',
    question: 'Quel est le rôle architectural du composant <Outlet /> dans React Router DOM v6 ?',
    options: [
      'Terminer la session utilisateur et nettoyer les tokens d\'authentification.',
      'Indiquer l\'emplacement où les composants des routes enfants imbriquées doivent s\'afficher.',
      'Intercepter les erreurs réseau globales pour afficher une bannière d\'alerte.',
      'Rediriger automatiquement tout trafic entrant vers la page d\'accueil du site.'
    ],
    correctIndex: 1,
    explanation: '<Outlet /> agit comme un point d\'ancrage (placeholder) dans un composant de mise en page parent pour effectuer le rendu des composants des routes enfants correspondantes.'
  },
  {
    id: 'm6-q6',
    moduleId: 'module6',
    difficulty: 'piege',
    tag: 'Route 404',
    question: 'Quelle valeur de prop path permet de capturer toutes les URLs non reconnues pour afficher une vue d\'erreur 404 ?',
    options: [
      'path="/404"',
      'path="default"',
      'path="*"',
      'path="catch-all"'
    ],
    correctIndex: 2,
    explanation: 'path="*" sert de joker universel (wildcard) qui intercepte toute route n\'ayant pas trouvé de correspondance parmi les routes déclarées plus haut.'
  },
  {
    id: 'm6-q7',
    moduleId: 'module6',
    difficulty: 'fondamentaux',
    tag: 'Tests Jest & RTL',
    question: 'Quelle est la distinction fondamentale entre Jest et React Testing Library (RTL) dans un environnement de test ?',
    options: [
      'Jest vérifie la validité des fichiers de styles CSS tandis que RTL analyse la structure HTML et les balises JSX.',
      'Jest constitue un faux serveur HTTP de test alors que RTL gère une base de données relationnelle locale simulée.',
      'Jest et RTL accomplissent exactement les mêmes fonctionnalités et ne peuvent pas être intégrés au même projet.',
      'Jest fournit le moteur de test et assertions (expect), tandis que RTL fournit le montage et l\'interaction DOM.'
    ],
    correctIndex: 3,
    explanation: 'Jest constitue le moteur d\'exécution de tests (test runner, mocks, assertions expect), tandis que React Testing Library fournit les fonctions pour monter des composants (render) et interagir avec eux (screen).'
  },
  {
    id: 'm6-q8',
    moduleId: 'module6',
    difficulty: 'application',
    tag: 'RTL screen.getByRole',
    question: 'Comment sélectionner de manière accessible et robuste un bouton portant le texte "Valider" avec React Testing Library ?',
    options: [
      'document.querySelector(\'button.btn-primary\');',
      'screen.getByRole(\'button\', { name: /valider/i });',
      'screen.getByClassName(\'bouton-action\');',
      'screen.getByTag(\'BUTTON\').withText(\'Valider\');'
    ],
    correctIndex: 1,
    explanation: 'screen.getByRole(\'button\', { name: ... }) est la méthode de requête recommandée par RTL car elle s\'aligne sur la manière dont les technologies d\'assistance et les utilisateurs perçoivent l\'élément.'
  },
  {
    id: 'm6-q9',
    moduleId: 'module6',
    difficulty: 'fondamentaux',
    tag: 'Simulation Clic RTL',
    question: 'Quelle méthode ou bibliothèque est officiellement recommandée par RTL pour simuler un clic d\'utilisateur sur un élément du DOM ?',
    options: [
      'userEvent.click(element) ou fireEvent.click(element)',
      'element.dispatchEvent(new MouseClickEvent(\'click\'))',
      'screen.triggerUserMousePress(element, { button: 0 })',
      'simulateBrowserUserAction(element, \'click\', true)'
    ],
    correctIndex: 0,
    explanation: 'fireEvent.click() et @testing-library/user-event simulent fidèlement les événements souris du navigateur en déclenchant l\'ensemble des événements associés (pointerdown, mousedown, click).'
  },
  {
    id: 'm6-q10',
    moduleId: 'module6',
    difficulty: 'syntaxe',
    tag: 'NavLink Classe Active',
    question: 'Comment NavLink permet-il d\'appliquer conditionnellement une classe CSS personnalisée lorsque le lien correspond à la route active ?',
    options: [
      'En renseignant l\'attribut HTML activeClassName="actif" comme sous React Router v4.',
      'En comparant manuellement window.location.pathname avec l\'attribut href du lien.',
      'En passant une fonction à className : className={({ isActive }) => isActive ? "actif" : ""}',
      'En déclenchant un hook useActiveLink() à l\'intérieur de la balise du lien.'
    ],
    correctIndex: 2,
    explanation: 'Dans React Router v6, NavLink accepte une fonction pour les props className et style. Cette fonction reçoit un objet destructuré { isActive } indiquant si le lien est en cours de consultation.'
  }
];
