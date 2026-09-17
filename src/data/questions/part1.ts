import { Question } from '../../types';

export const questionsPart1: Question[] = [
  {
    id: "p1-01",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Définition projet",
    question: "Dans le domaine informatique, quelle caractéristique distingue prioritairement un projet d’une activité récurrente d’exploitation ?",
    options: [
      "Il est systématiquement développé en appliquant le framework Scrum",
      "Il est impérativement réalisé par un seul développeur en autonomie",
      "Il possède une date de début et une date de fin clairement définies",
      "Il ne présente aucun risque technique ou financier pour l’entreprise",
    ],
    correctIndex: 2,
    explanation: "Un projet est par nature temporaire : il se caractérise par un calendrier délimité dans le temps et vise un résultat unique."
  },
  {
    id: "p1-02",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Rôles projet",
    question: "Dans une organisation de projet traditionnelle, quel acteur est chargé d’exprimer les besoins métier et les attentes du client ?",
    options: [
      "La Maîtrise d’Ouvrage (MOA)",
      "L’administrateur système",
      "La Maîtrise d’Œuvre (MOE)",
      "Le Scrum Master externe",
    ],
    correctIndex: 0,
    explanation: "La MOA représente le commanditaire : elle formalise le besoin fonctionnel, fixe les objectifs métier et valide la recette."
  },
  {
    id: "p1-03",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Rôles projet",
    question: "La Maîtrise d’Œuvre (MOE) porte la responsabilité principale de :",
    options: [
      "La réalisation technique et architecturale de la solution logicielle",
      "La rédaction des statuts juridiques et fiscaux de l’entreprise cliente",
      "La validation finale de la conformité comptable des comptes annuels",
      "La définition stratégique exclusive des tarifs de vente au grand public",
    ],
    correctIndex: 0,
    explanation: "La MOE prend en charge la conception technique, la fabrication, le respect des normes et la livraison opérationnelle du livrable."
  },
  {
    id: "p1-04",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Pilotage",
    question: "Quelle mission centrale incombe au chef de projet lors de la phase de réalisation ?",
    options: [
      "Rédiger personnellement chaque ligne de code source de l’application",
      "Coordonner les équipes, planifier les tâches et piloter les risques",
      "Garantir qu’aucun imprévu n’existera jamais durant tout le cycle de vie",
      "Prendre unilatéralement la place des utilisateurs finaux lors des tests",
    ],
    correctIndex: 1,
    explanation: "Le chef de projet orchestre le calendrier, fédère les intervenants, suit le budget et met en œuvre le plan de prévention des risques."
  },
  {
    id: "p1-05",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Parties prenantes",
    question: "Comment définit-on précisément une « partie prenante » (stakeholder) dans le cadre d’un projet ?",
    options: [
      "Toute personne ou entité pouvant influencer le projet ou être affectée par lui",
      "L’équipe technique de développement informatique interne à l’exclusion des autres",
      "Uniquement la personne morale qui finance la totalité du capital social",
      "Un logiciel de gestion de base de données relationnelle installé sur le serveur",
    ],
    correctIndex: 0,
    explanation: "Les parties prenantes englobent l’ensemble des acteurs internes ou externes impactés positivement ou négativement par le projet."
  },
  {
    id: "p1-06",
    partId: "part1",
    difficulty: "application",
    tag: "Parties prenantes",
    question: "Parmi les entités suivantes, laquelle représente sans équivoque une partie prenante EXTERNE au projet ?",
    options: [
      "L’ingénieur d’études salarié du projet",
      "Le chef de projet titulaire en CDI",
      "Le directeur des systèmes d’information",
      "Le fournisseur d’hébergement cloud tiers",
    ],
    correctIndex: 3,
    explanation: "Un prestataire externe ou un hébergeur cloud n’appartient pas à l’organisation interne de l’entreprise cliente."
  },
  {
    id: "p1-07",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Contraintes",
    question: "Dans la théorie classique du triangle de gestion de projet (QCD), quels sont les trois piliers en constante interdépendance ?",
    options: [
      "Le langage de programmation, le framework et l’IDE",
      "Le nombre d’écrans, la résolution et le format graphique",
      "Le Périmètre/Qualité, le Coût et le Délai",
      "Le système d’exploitation, le processeur et la mémoire vive",
    ],
    correctIndex: 2,
    explanation: "Le triangle QCD rappelle que toute modification du périmètre ou du niveau de qualité impacte obligatoirement le coût ou le calendrier."
  },
  {
    id: "p1-08",
    partId: "part1",
    difficulty: "scenario",
    tag: "Gestion des risques",
    question: "Une équipe sous-estime de 50% la durée requise pour concevoir la base de données. Quel impact direct cela engendre-t-il ?",
    options: [
      "Une amélioration automatique de la performance des requêtes SQL en production",
      "La suppression définitive de toutes les exigences formulées par le client",
      "Une obligation immédiate de changer de système de gestion de bases de données",
      "Un risque majeur de dérive calendaire sur l’ensemble des tâches dépendantes",
    ],
    correctIndex: 3,
    explanation: "Sous-estimer une tâche située en amont décale l’ensemble du planning et génère un retard global sur la livraison finale."
  },
  {
    id: "p1-09",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Méthodes prédictives",
    question: "Quelle caractéristique fondamentale définit le modèle de développement en Cascade (Waterfall) ?",
    options: [
      "L’absence complète de phase de cadrage ou de rédaction de spécifications",
      "Une livraison en production effectuée plusieurs fois par jour ouvré",
      "La négociation quotidienne et informelle des exigences avec l’utilisateur",
      "Un enchaînement strictement séquentiel et linéaire de phases successives",
    ],
    correctIndex: 3,
    explanation: "Le modèle en cascade progresse étape par étape : une phase ne démarre que lorsque la précédente est formellement validée."
  },
  {
    id: "p1-10",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Approche Agile",
    question: "Pourquoi l’approche Agile est-elle particulièrement recommandée dans un environnement technologique hautement instable ?",
    options: [
      "Elle favorise l’adaptation continue au changement grâce à des cycles courts",
      "Elle interdit formellement au client d’intervenir après le lancement initial",
      "Elle garantit l’exactitude absolue du budget sans aucun ajustement possible",
      "Elle supprime intégralement la nécessité d’effectuer des tests de régression",
    ],
    correctIndex: 0,
    explanation: "L’agilité repose sur des itérations fréquentes permettant d’ajuster le tir dès que le besoin client ou le contexte marché évolue."
  },
  {
    id: "p1-11",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Cycle en V",
    question: "Quel principe architectural distingue spécifiquement le modèle de développement en Cycle en V ?",
    options: [
      "L’interdiction formelle de rédiger la moindre documentation technique écrite",
      "La mise en miroir de chaque phase de conception avec une phase de test dédiée",
      "Le déploiement continu automatisé dès la rédaction des premiers algorithmes",
      "L’absence d’étapes de validation fonctionnelle avant le passage en production",
    ],
    correctIndex: 1,
    explanation: "Le cycle en V relie les étapes descendantes (spécifications, conception) aux étapes ascendantes de validation correspondantes (recette, tests)."
  },
  {
    id: "p1-12",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Matrice RACI",
    question: "Dans une matrice d’attribution des responsabilités RACI, que désigne précisément la lettre « R » ?",
    options: [
      "Reviewer : la personne chargée de relire le document sans intervenir",
      "Release : la version du logiciel déployée sur les serveurs de tests",
      "Responsible : l’acteur qui réalise concrètement le travail opérationnel",
      "Risk : l’indicateur de dangerosité associé à la tâche analysée",
    ],
    correctIndex: 2,
    explanation: "Le 'R' (Responsible) est le réalisateur effectif de la tâche opérationnelle au quotidien."
  },
  {
    id: "p1-13",
    partId: "part1",
    difficulty: "trap",
    tag: "Matrice RACI",
    question: "Dans une matrice RACI, quelle règle impérative s’applique au rôle « A » (Accountable) pour chaque activité ?",
    options: [
      "Le rôle A change de titulaire chaque matin lors de la réunion de synchronisation",
      "Il est obligatoire d’attribuer le rôle A à au moins trois personnes distinctes",
      "Le rôle A est automatiquement délégué au stagiaire le plus récemment recruté",
      "Il ne doit y avoir strictement qu’un seul Accountable désigné par activité",
    ],
    correctIndex: 3,
    explanation: "Il ne doit y avoir qu’un seul Accountable (décideur final) par activité pour éviter toute dilution des responsabilités."
  },
  {
    id: "p1-14",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Matrice RACI",
    question: "Que signifie la lettre « C » dans la convention organisationnelle RACI ?",
    options: [
      "Creator : le développeur ayant créé le premier fichier source du module",
      "Consulted : l’expert technique ou métier sollicité pour donner son avis",
      "Customer : l’acheteur final du produit logiciel en magasin ou en ligne",
      "Controller : le supérieur hiérarchique chargé d’approuver les congés",
    ],
    correctIndex: 1,
    explanation: "Les personnes désignées 'C' (Consulted) apportent leur expertise avant ou pendant la réalisation sans être décideurs finaux."
  },
  {
    id: "p1-15",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Matrice RACI",
    question: "À quoi correspond le statut « I » (Informed) attribué à un collaborateur dans un RACI ?",
    options: [
      "Il est immédiatement chargé d’exécuter la moitié des tests unitaires du projet",
      "Il est l’interlocuteur exclusif pour la négociation des devis financiers",
      "Il doit impérativement valider chaque ligne de code avant la mise en ligne",
      "Il est tenu informé de l’avancement et des résultats sans participer à la tâche",
    ],
    correctIndex: 3,
    explanation: "Les intervenants 'I' (Informed) sont informés des décisions ou des étapes franchies, sans charge d’exécution active."
  },
  {
    id: "p1-16",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Ressources",
    question: "Dans le cadre de l’estimation des besoins d’un projet, lequel constitue une ressource HUMAINE ?",
    options: [
      "Un serveur d’intégration continue dédié",
      "Une enveloppe budgétaire de 50 000 DH",
      "Un ingénieur expert en cybersécurité",
      "Une licence logicielle annuelle d’IDE",
    ],
    correctIndex: 2,
    explanation: "L’ingénieur est une ressource humaine, alors que le serveur est matériel, le budget financier et la licence immatérielle."
  },
  {
    id: "p1-17",
    partId: "part1",
    difficulty: "trap",
    tag: "Définition projet",
    question: "Lequel des éléments suivants NE constitue PAS une caractéristique intrinsèque d’un projet ?",
    options: [
      "La production d’un livrable unique répondant à un besoin validé",
      "L’allocation de ressources matérielles, financières et humaines",
      "L’existence d’un objectif spécifique et mesurable à atteindre",
      "Une exécution permanente et indéfinie sans aucune date de clôture",
    ],
    correctIndex: 3,
    explanation: "Une activité sans fin programmée est une opération d’exploitation continue récurrente, et non un projet."
  },
  {
    id: "p1-18",
    partId: "part1",
    difficulty: "application",
    tag: "Méthodes",
    question: "Dans quelle situation une méthode de gestion prédictive (Cascade) est-elle particulièrement pertinente ?",
    options: [
      "Lorsque le client découvre son besoin au fur et à mesure des démonstrations",
      "Lorsque l’équipe souhaite éviter toute forme de planification temporelle",
      "Lorsque le besoin est parfaitement stable, éprouvé et exhaustif dès le départ",
      "Lorsque l’application doit être lancée en version bêta dans moins d’un mois",
    ],
    correctIndex: 2,
    explanation: "Les approches prédictives excellent lorsque le domaine technique est mature et que le cahier des charges ne subira aucune variation."
  },
  {
    id: "p1-19",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Méthodes",
    question: "Quel est le principal point fort d’une organisation de projet en cascade pour une direction générale ?",
    options: [
      "Une capacité immédiate à refondre l’architecture logicielle chaque semaine",
      "La suppression de la phase formelle de rédaction du cahier des charges",
      "Une visibilité contractuelle et un cadrage budgétaire prévisibles à l’amont",
      "L’abandon de tout suivi du respect des délais de livraison intermédiaires",
    ],
    correctIndex: 2,
    explanation: "La méthode en cascade permet de cadrer contractuellement les jalons, les coûts et le périmètre avant d’engager les dépenses."
  },
  {
    id: "p1-20",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Méthodes",
    question: "Quel risque majeur encourt un projet conduit en cascade si le marché évolue brutalement en cours de développement ?",
    options: [
      "L’impossibilité absolue d’installer le logiciel sur les ordinateurs des clients",
      "Un coût de modification extrêmement élevé pour corriger les choix initiaux",
      "La perte automatique de toutes les sauvegardes de code source du dépôt",
      "Une accélération excessive de la date finale de livraison du produit",
    ],
    correctIndex: 1,
    explanation: "Dans un cycle séquentiel, remettre en cause une spécification tardivement oblige à reprendre toute la conception et le code déjà écrit."
  },
  {
    id: "p1-21",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Rôles projet",
    question: "Quel est le rôle déterminant du « Sponsor » (ou commanditaire exécutif) dans la gouvernance d’un projet ?",
    options: [
      "Tester chaque formulaire de l’application sur l’ensemble des navigateurs du marché",
      "Apporter le soutien politique et débloquer les arbitrages stratégiques et budgétaires",
      "Attribuer quotidiennement les cartes de tâches aux membres de l’équipe de dev",
      "Développer les composants front-end en respectant les standards graphiques",
    ],
    correctIndex: 1,
    explanation: "Le sponsor est le dirigeant qui défend le projet auprès de la direction générale et garantit le financement et les ressources."
  },
  {
    id: "p1-22",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Parties prenantes",
    question: "Pourquoi est-il primordial d’intégrer des représentants des utilisateurs finaux dès les premières phases du projet ?",
    options: [
      "Pour garantir que l’ergonomie et les fonctionnalités correspondent à leur usage réel",
      "Pour remplacer intégralement le travail de conception des architectes logiciels",
      "Pour s’assurer qu’aucune réunion de cadrage technique ne soit nécessaire",
      "Pour leur déléguer la responsabilité de la gestion de l’infrastructure serveur",
    ],
    correctIndex: 0,
    explanation: "Les utilisateurs finaux apportent le retour terrain indispensable pour concevoir une solution utile, utilisable et adoptée."
  },
  {
    id: "p1-23",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Périmètre",
    question: "Que définit précisément le périmètre (scope) d’un projet informatique ?",
    options: [
      "La vitesse de téléchargement maximale mesurée sur la connexion Internet",
      "L’ensemble explicite des fonctionnalités incluses ainsi que celles formellement exclues",
      "La liste détaillée des adresses IP des serveurs connectés au réseau local",
      "Le nombre total de lignes de code écrites par l’équipe au cours de l’année",
    ],
    correctIndex: 1,
    explanation: "Le périmètre borne le travail à réaliser en clarifiant sans ambiguïté ce qui fait partie de la commande et ce qui en est exclu."
  },
  {
    id: "p1-24",
    partId: "part1",
    difficulty: "trap",
    tag: "Gestion des risques",
    question: "Comment qualifie-t-on le phénomène d’ajout progressif et non maîtrisé d’exigences nouvelles en cours de projet ?",
    options: [
      "La résolution anticipée des conflits de fusion logicielle",
      "Le glissement ou dérive de périmètre (Scope Creep)",
      "Le refactoring architectural du code source de production",
      "L’optimisation continue de la vélocité organisationnelle",
    ],
    correctIndex: 1,
    explanation: "Le 'Scope Creep' désigne l’inflation non contrôlée des demandes client qui conduit au dépassement du budget et des délais."
  },
  {
    id: "p1-25",
    partId: "part1",
    difficulty: "application",
    tag: "Gestion des risques",
    question: "Quelle démarche structure le management professionnel des risques d’un projet ?",
    options: [
      "Consigner les incidents dans un classeur papier sans jamais le consulter",
      "Affirmer aux clients que les risques n’existent pas dans une équipe moderne",
      "Identifier, analyser, hiérarchiser, traiter par des actions et surveiller",
      "Attendre qu’une anomalie critique survienne pour commencer à réfléchir",
    ],
    correctIndex: 2,
    explanation: "La gestion des risques est proactive : identification précoce, quantification (gravité × probabilité), plan de contingence et veille."
  },
  {
    id: "p1-26",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Qualité",
    question: "Dans le cadre de l’ingénierie logicielle, que recouvre le concept de « Qualité » ?",
    options: [
      "L’utilisation exclusive d’animations graphiques complexes sur toutes les pages",
      "La conformité aux exigences convenues et la fiabilité opérationnelle du livrable",
      "La livraison du produit un an avant la date fixée par le cahier des charges",
      "Le choix systématique de la technologie la plus récente et à la mode du marché",
    ],
    correctIndex: 1,
    explanation: "La qualité mesure l’adéquation de la solution aux besoins réels formulés, ainsi que sa robustesse, sa maintenabilité et sa sécurité."
  },
  {
    id: "p1-27",
    partId: "part1",
    difficulty: "application",
    tag: "Parties prenantes",
    question: "Pourquoi est-il stratégique de cartographier les parties prenantes dès le démarrage du projet ?",
    options: [
      "Pour interdire aux membres de l’équipe de discuter avec les clients directs",
      "Pour supprimer l’obligation de rédiger un plan d’assurance qualité formel",
      "Pour transférer automatiquement la responsabilité juridique en cas d’échec",
      "Pour adapter la stratégie de communication et anticiper les oppositions ou attentes",
    ],
    correctIndex: 3,
    explanation: "Comprendre le pouvoir d’influence et le niveau d’intérêt des parties prenantes permet d’engager les bons acteurs au bon moment."
  },
  {
    id: "p1-28",
    partId: "part1",
    difficulty: "situation",
    tag: "Approche Agile",
    question: "Une startup lance un nouveau service sans certitude sur l’accueil des utilisateurs. Quel choix méthodologique s’impose ?",
    options: [
      "Une démarche itérative avec mise sur le marché d’un MVP pour tester le retour réel",
      "Le refus systématique de recueillir le moindre feedback après le lancement",
      "Un cycle en V rigide de deux ans sans aucune interaction avec les prospects",
      "Un contrat au forfait imposant un cahier des charges immuable sur cinq années",
    ],
    correctIndex: 0,
    explanation: "Le Produit Minimum Viable (MVP) dans un cadre itératif permet d’apprendre au contact du terrain en limitant les investissements initiaux."
  },
  {
    id: "p1-29",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Planning",
    question: "Que représente un « jalon » (milestone) sur le calendrier prévisionnel d’un projet ?",
    options: [
      "Un événement marquant ou une décision majeure dont la durée calendaire est nulle",
      "Une phase de développement logiciel continue s’étalant sur au moins six mois",
      "Une commande système permettant de compiler les bibliothèques logicielles",
      "Un outil de gestion de versions distribué utilisé par les ingénieurs d’études",
    ],
    correctIndex: 0,
    explanation: "Un jalon formalise la validation d’une étape charnière (ex: signature de la recette, passage en production) sans consommer de durée."
  },
  {
    id: "p1-30",
    partId: "part1",
    difficulty: "application",
    tag: "Pilotage",
    question: "Quel indicateur de pilotage alerte le plus efficacement le chef de projet sur une dérive temporelle naissante ?",
    options: [
      "L’écart mesuré entre l’avancement physique réel et le planning prévisionnel initial",
      "La quantité d’écrans d’administration créés dans la base de données de test",
      "La taille globale en mégaoctets du fichier de documentation utilisateur final",
      "Le nombre total de réunions de synchronisation tenues durant la semaine passée",
    ],
    correctIndex: 0,
    explanation: "Mesurer l’écart entre l’avancement réel du travail et la trajectoire planifiée permet de déclencher immédiatement des actions correctives."
  }
];
