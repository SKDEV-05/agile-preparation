import { ReactCourseModule } from '../../types/reactTypes';

export const MODULE_1: ReactCourseModule = {
  id: 'module1',
  orderNumber: 1,
  pdfReference: 'PDF 1',
  title: 'Fondamentaux du Web Front-End & Architecture SPA',
  subtitle: 'Architecture Client-Serveur, DOM & Révolution des Single Page Applications',
  description: 'Comprendre la séparation client-serveur, le cycle HTTP, le modèle DOM/CSSOM et la rupture technologique entre sites multi-pages (MPA) et applications monopages (SPA).',
  iconName: 'Globe',
  gradient: 'from-[#10B981] to-[#22C55E]',
  sections: [
    {
      id: 'm1-s1',
      order: '01',
      title: 'Sites Statiques & Modèle Client-Serveur',
      quickSummary: 'Le fonctionnement fondamental du Web statique et la séparation hermétique des rôles.',
      conceptExplanation: 'Un site web statique repose sur un ensemble de fichiers HTML, CSS et JavaScript préexistants hébergés sur un serveur web (Apache, Nginx, AWS S3). Chaque visiteur télécharge exactement les mêmes fichiers sans génération dynamique serveur.',
      deepExplanation: 'Le navigateur parse le HTML pour construire le DOM (Document Object Model), parse le CSS pour le CSSOM (CSS Object Model), puis assemble les deux dans le Render Tree pour calculer la mise en page (Layout / Reflow) avant de peindre les pixels (Paint). L\'architecture moderne sépare hermétiquement le Front-End (exécuté dans le navigateur, axé UX et réactivité) du Back-End (exécuté sur serveur d\'application, axé règles métier et persistance SQL/NoSQL).',
      keyPoints: [
        'Client (Front-End) : Exécuté sur le navigateur du client, reçoit du JSON, manipule le DOM.',
        'Serveur (Back-End) : Exécuté sur serveurs sécurisés, applique la logique métier, interroge la base de données.',
        'Cycle HTTP : Requête GET /index.html -> Réponse HTML brut -> Requêtes dépendantes CSS et JS.',
        'Sécurité : Le code Front-End est public et inspectable (DevTools) ; les clés secrètes appartiennent exclusivement au Back-End.'
      ],
      examTraps: [
        'Piège classique : Croire qu\'un site statique ne contient pas de JavaScript. Faux ! Du JavaScript s\'exécute localement pour l\'interactivité (modals, formulaires simples).',
        'Piège d\'examen : Stocker des clés d\'API privées ou mots de passe de BDD dans le code React/Front-End.'
      ],
      diagramType: 'spa_vs_mpa',
      codeExamples: [
        {
          title: 'Flux de communication Client-Serveur REST',
          description: 'Le Front-End communique avec le Back-End par requêtes HTTP discrètes au format JSON.',
          code: `// Requête asynchrone Front-End (Client) vers une API Back-End
fetch('https://api.ofppt.ma/v1/stagiaires')
  .then(response => {
    if (!response.ok) throw new Error('Erreur HTTP ' + response.status);
    return response.json(); // Réception du payload JSON
  })
  .then(data => {
    console.log('Stagiaires reçus :', data);
    // Mise à jour de l'interface graphique
  })
  .catch(error => console.error('Échec réseau :', error));`,
          outputPreview: 'Stagiaires reçus : [{ id: 1, nom: "Sara", filiere: "FullStack" }]'
        }
      ],
      miniQuestion: {
        question: 'Quelle assertion est vraie concernant le code exécuté dans une application Front-End ?',
        options: [
          'Le code s\'exécute dans le navigateur de l\'utilisateur et peut être inspecté via les DevTools.',
          'Le code source est compilé côté serveur et seul le résultat binaire est transmis au navigateur.',
          'Il accède directement aux tables SQL de la base de données sans intermédiaire API.',
          'Le navigateur bloque systématiquement l\'exécution de JavaScript sur les fichiers locaux.'
        ],
        correctIndex: 0,
        explanation: 'Tout code Front-End (HTML, CSS, JS/React) est téléchargé et exécuté sur la machine du client. Il est donc public et inspectable dans les outils de développement (DevTools).'
      },
      officialDocReference: 'OFPPT M204 Support 1 — Pages 3 à 8'
    },
    {
      id: 'm1-s2',
      order: '02',
      title: 'Limites de la manipulation DOM classique & Émergence des Frameworks',
      quickSummary: 'Pourquoi les méthodes impératives natives (document.getElementById, jQuery) ont montré leurs limites.',
      conceptExplanation: 'Historiquement, la manipulation du DOM s\'effectuait de manière impérative (document.getElementById). Sur des interfaces massives, cette approche génère du code "spaghetti", des pertes de performance par reflow/repaint excessifs, et des désynchronisations d\'état.',
      deepExplanation: 'Quand une donnée change à plusieurs endroits (ex: compteur panier, pastille header, récapitulatif), l\'approche impérative exigeait de mettre à jour manuellement chaque nœud HTML. Les bibliothèques déclaratives comme React automatisent cette synchronisation en déduisant le rendu à partir de l\'état en mémoire.',
      keyPoints: [
        'Approche impérative : "Trouve cet élément HTML, change son texte, applique cette classe rouge".',
        'Approche déclarative (React) : "Voici à quoi doit ressembler l\'interface pour un panier de N articles".',
        'Reflow / Repaint : Opérations de recalcul de géométrie et redessin très coûteuses dans le DOM réel.',
        'Synchronisation : En React, modifier l\'état garantit la mise à jour cohérente et automatique de tous les composants concernés.'
      ],
      examTraps: [
        'Ne confondez pas déclaratif et impératif : React est DÉCLARATIF, JavaScript vanilla avec manipulation directe du DOM est IMPÉRATIF.'
      ],
      diagramType: 'virtual_dom_diff',
      codeExamples: [
        {
          title: 'Comparaison : Approche Impérative vs Déclarative',
          description: 'Illustration de la complexité impérative manuelle face à l\'élégance déclarative.',
          code: `// 1. APPROCHE IMPÉRATIVE (JavaScript classique / jQuery)
const btn = document.getElementById('btn-panier');
const countSpan = document.getElementById('count');
let count = 0;
btn.addEventListener('click', () => {
  count++;
  countSpan.textContent = count; // Mutation manuelle du DOM
  if (count > 5) countSpan.classList.add('badge-alert');
});

// 2. APPROCHE DÉCLARATIVE (React)
function Panier() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(prev => prev + 1)}>
      Articles : <span className={count > 5 ? 'badge-alert' : ''}>{count}</span>
    </button>
  );
}`,
          outputPreview: 'React synchronise automatiquement l\'affichage selon la valeur de count.'
        }
      ],
      miniQuestion: {
        question: 'Quel est l\'inconvénient majeur de la manipulation directe et répétée du DOM réel ?',
        options: [
          'Le navigateur interdit plus de 10 modifications DOM par seconde pour des raisons de sécurité.',
          'Les événements JavaScript cessent de fonctionner après la troisième modification du DOM.',
          'Elle déclenche des calculs coûteux de reflow (mise en page) et repaint (redessin) qui dégradent la fluidité.',
          'Le DOM réel est en lecture seule et ne peut être modifié qu\'avec un plugin navigateur.'
        ],
        correctIndex: 2,
        explanation: 'La manipulation directe et désordonnée du DOM réel force le moteur de rendu du navigateur à recalculer les styles et la disposition géométrique (reflow/repaint), provoquant des ralentissements visibles.'
      },
      officialDocReference: 'OFPPT M204 Support 1 — Pages 9 à 14'
    },
    {
      id: 'm1-s3',
      order: '03',
      title: 'Architecture SPA (Single Page Application) vs MPA',
      quickSummary: 'Comment fonctionne une SPA moderne et pourquoi un index.html unique suffit.',
      conceptExplanation: 'Dans une MPA classique (Multi-Page), chaque clic sur un lien détruit la page courante et recharge un document HTML complet depuis le serveur. Dans une SPA (Single Page Application), un seul index.html est chargé initialement. Toute navigation ultérieure est interceptée en JavaScript sans rechargement.',
      deepExplanation: 'Grâce à l\'API HTML5 History (pushState, popState), le JavaScript met à jour l\'URL affichée et remplace dynamiquement les composants dans le conteneur racine `<div id="root"></div>`. Si des données fraîches sont requises, une requête Fetch/Axios en arrière-plan rapatrie un payload JSON léger sans aucun flash blanc.',
      keyPoints: [
        'Fichier HTML réel : Strictement UN SEUL dans une SPA (index.html).',
        'Expérience utilisateur : Fluidité instantanée comparable à une application native mobile.',
        'Bande passante : Très économique après le chargement initial (seul du JSON circule).',
        'Configuration serveur : Nécessite une règle de fallback redirigeant toutes les requêtes vers index.html pour éviter l\'erreur 404 lors du rafraîchissement d\'une route.'
      ],
      examTraps: [
        'Piège d\'examen officiel : "Pourquoi une SPA renvoie-t-elle une 404 sur Apache/Nginx si on actualise /profil ?" Réponse : Parce que le fichier physique /profil n\'existe pas sur le disque dur ; le serveur doit réécrire l\'URL vers index.html.'
      ],
      diagramType: 'spa_vs_mpa',
      codeExamples: [
        {
          title: 'Structure minimale de l\'unique fichier index.html d\'une SPA',
          description: 'Toute l\'application React est injectée dynamiquement dans la balise root.',
          code: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Application React OFPPT</title>
  </head>
  <body>
    <!-- Point de montage unique de toute l'application SPA -->
    <div id="root"></div>

    <!-- Le bundle JavaScript compilé prend le contrôle du DOM -->
    <script src="/static/js/bundle.js"></script>
  </body>
</html>`,
          outputPreview: 'Le bundle.js injecte dynamiquement l\'arbre de composants dans <div id="root">.'
        }
      ],
      miniQuestion: {
        question: 'Pourquoi le rechargement de l\'URL https://monsite.com/contact d\'une SPA nécessite-t-il une règle de redirection (fallback) sur le serveur web ?',
        options: [
          'Parce que le serveur web désactive par défaut la mise en cache des routes JavaScript dynamiques non déclarées en amont.',
          'Parce que les navigateurs modernes refusent d\'émettre une requête HTTP GET vers un point de terminaison dépourvu d\'extension .html.',
          'Parce que les certificats de chiffrement SSL/TLS bloquent systématiquement les requêtes directes vers des sous-dossiers virtuels.',
          'Parce que le fichier physique "/contact" n\'existe pas sur le serveur ; la requête entrante doit être redirigée vers index.html.'
        ],
        correctIndex: 3,
        explanation: 'Dans une SPA, le routage est géré côté client par JavaScript. Sans règle de réécriture (fallback) vers index.html, le serveur HTTP cherche un dossier réel "/contact" sur son disque dur et retourne une 404 Not Found.'
      },
      officialDocReference: 'OFPPT M204 Support 1 — Pages 15 à 22'
    }
  ],
  practicalChallenge: {
    title: 'Défi Pratique : Détecter l\'environnement Client vs Serveur',
    description: 'En React, certaines APIs du navigateur comme window ou localStorage ne sont pas disponibles côté serveur (SSR). Écrivez une fonction sécurisée qui vérifie la présence du navigateur avant d\'accéder à l\'objet window.',
    starterCode: `function getStoredTheme() {
  // Complétez pour éviter un crash ReferenceError si exécuté hors navigateur :
  
  return localStorage.getItem('theme') || 'light';
}`,
    expectedOutcome: 'La fonction retourne le thème stocké ou le thème par défaut sans crash si window est indéfini.',
    solutionCode: `function getStoredTheme() {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return 'light';
  }
  return localStorage.getItem('theme') || 'light';
}`,
    explanation: 'Dans un contexte serveur ou de compilation pré-rendue, l\'objet global window n\'existe pas. Tester typeof window !== "undefined" garantit une exécution sécurisée.'
  },
  keyTakeaways: [
    'Le Web moderne sépare hermétiquement l\'interface (Front-End) et la logique métier/sécurité (Back-End).',
    'Une SPA repose sur un unique fichier index.html et met à jour dynamiquement le DOM sans recharger la page.',
    'Les requêtes HTTP dans une SPA transportent du JSON brut, réduisant drastiquement la consommation de données.',
    'Le serveur d\'hébergement d\'une SPA doit toujours rediriger les routes inconnues vers index.html.'
  ],
  commonTraps: [
    'Croire que les routes d\'une SPA correspondent à des fichiers physiques sur le serveur.',
    'Stocker des données sensibles ou des clés privées dans le code React accessible via DevTools.',
    'Confondre le rechargement navigateur (MPA) avec la navigation client sans rechargement (SPA).'
  ]
};
