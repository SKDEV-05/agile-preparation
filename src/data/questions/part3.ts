import { Question } from '../../types';

export const questionsPart3: Question[] = [
  {
    id: "p3-01",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Rôles Scrum",
    question: "Dans une équipe appliquant Scrum, quelle est la responsabilité fondamentale du Product Owner ?",
    options: [
      "Maximiser la valeur du produit et prioriser les éléments du Product Backlog",
      "Administrer les serveurs physiques et configurer les pare-feux de sécurité",
      "Assigner unilatéralement les tâches quotidiennes à chaque développeur le matin",
      "Remplacer le Scrum Master lorsque celui-ci est absent de l’entreprise"
    ],
    correctIndex: 0,
    explanation: "Le Product Owner est le garant de la valeur métier du produit. Il ordonne le backlog pour que l’équipe délivre les éléments les plus porteurs de valeur."
  },
  {
    id: "p3-02",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Rôles Scrum",
    question: "Quelle mission principale définit la posture du Scrum Master au sein de l’équipe ?",
    options: [
      "Faciliter l’application du cadre Scrum et éliminer les obstacles rencontrés",
      "Décider seul des fonctionnalités fonctionnelles à intégrer dans le logiciel",
      "Écrire l’intégralité des tests unitaires à la place des développeurs de l’équipe",
      "Gérer les contrats commerciaux et négocier les factures avec les fournisseurs"
    ],
    correctIndex: 0,
    explanation: "Le Scrum Master est un leader au service de l’équipe (Servant Leader) : il promeut le cadre Scrum et aide à lever les blocages."
  },
  {
    id: "p3-03",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Rôles Scrum",
    question: "De quoi les Developers sont-ils collectivement responsables lors de chaque Sprint ?",
    options: [
      "Créer un Incrément utilisable et conforme à la Definition of Done à la fin du Sprint",
      "Définir le budget financier pluriannuel de l’ensemble de l’entreprise cliente",
      "Valider les conditions juridiques des contrats de travail des consultants externes",
      "Prendre la responsabilité de la stratégie marketing sur les réseaux sociaux"
    ],
    correctIndex: 0,
    explanation: "Les Developers s’engagent collectivement à concevoir, développer, tester et intégrer un Incrément de qualité conforme à la Definition of Done."
  },
  {
    id: "p3-04",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Événements Scrum",
    question: "Qu’est-ce qu’un « Sprint » dans le cadre méthodologique Scrum ?",
    options: [
      "Une itération d’une durée fixe produisant un incrément potentiellement livrable",
      "Une commande Git permettant de fusionner deux branches distantes sans conflit",
      "Une réunion exceptionnelle déclenchée uniquement en cas d’incident en production",
      "Un outil payant de gestion des tickets concurrent direct de la solution Jira"
    ],
    correctIndex: 0,
    explanation: "Le Sprint est un conteneur temporel régulier (timebox de 1 à 4 semaines) dans lequel s’accomplissent l’ensemble des travaux."
  },
  {
    id: "p3-05",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Artefacts Scrum",
    question: "Quel contenu trouve-t-on dans le « Product Backlog » d’un produit géré en Scrum ?",
    options: [
      "La liste ordonnée et évolutive de tout ce qui pourrait être nécessaire au produit",
      "Uniquement la liste des correctifs de sécurité appliqués au cours du mois passé",
      "Les identifiants et les mots de passe des administrateurs du réseau d’entreprise",
      "Le diagramme PERT détaillant les tâches prévues pour les dix prochaines années"
    ],
    correctIndex: 0,
    explanation: "Le Product Backlog est une liste ordonnée et dynamique de fonctionnalités, besoins, améliorations et correctifs alimentant le produit."
  },
  {
    id: "p3-06",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Artefacts Scrum",
    question: "Quels éléments composent principalement le « Sprint Backlog » ?",
    options: [
      "L’objectif du Sprint, les éléments sélectionnés et le plan concret pour les réaliser",
      "La totalité des projets informatiques menés dans tous les départements du groupe",
      "La liste des factures en attente de règlement auprès des clients internationaux",
      "L’organigramme hiérarchique des directeurs généraux de l’organisation cliente"
    ],
    correctIndex: 0,
    explanation: "Le Sprint Backlog est la propriété exclusive des Developers : il réunit le Sprint Goal, les User Stories retenues et le plan technique d’exécution."
  },
  {
    id: "p3-07",
    partId: "part3",
    difficulty: "comprehension",
    tag: "User Stories",
    question: "Quelle est la structure canonique adoptée pour rédiger une User Story efficace ?",
    options: [
      "En tant que [Rôle], je veux [Action/Besoin], afin de [Bénéfice/Valeur]",
      "Si [Condition technique], alors [Script Bash], sinon [Arrêt du serveur]",
      "Pendant [Phase du projet], la [MOE] facture [Montant en DH] à la [MOA]",
      "Considérant [Jalon], le [Chef de projet] calcule [Marge totale du PERT]"
    ],
    correctIndex: 0,
    explanation: "La formulation 'En tant que... je veux... afin de...' place l’utilisateur et la valeur métier au centre de l’exigence."
  },
  {
    id: "p3-08",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Jira",
    question: "Dans l’outil Jira, que représente généralement le type de ticket nommé « Epic » ?",
    options: [
      "Une macro-fonctionnalité importante regroupant plusieurs User Stories reliées",
      "Une simple ligne de commande exécutée sur le terminal du serveur de base de données",
      "Un agent logiciel distant chargé d’exécuter les tests unitaires du pipeline",
      "Un mot de passe à usage unique permettant de se connecter à la session administrateur"
    ],
    correctIndex: 0,
    explanation: "Un Epic est un ensemble fonctionnel vaste qui ne peut être achevé en un seul Sprint et doit être découpé en plusieurs User Stories."
  },
  {
    id: "p3-09",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Événements Scrum",
    question: "Quelle est la finalité principale de la cérémonie du « Sprint Planning » ?",
    options: [
      "Définir le Sprint Goal et planifier le travail que l’équipe peut accomplir",
      "Présenter la démonstration finale du produit aux investisseurs de l’entreprise",
      "Calculer les pénalités financières applicables en cas de retard sur le planning",
      "Installer les outils de développement sur les ordinateurs des nouveaux employés"
    ],
    correctIndex: 0,
    explanation: "Le Sprint Planning initie le Sprint en clarifiant ce qui a le plus de valeur à réaliser et comment l’équipe compte s’y prendre."
  },
  {
    id: "p3-10",
    partId: "part3",
    difficulty: "trap",
    tag: "Événements Scrum",
    question: "Quel est l’objectif réel du « Daily Scrum » de 15 minutes tenu chaque matin ?",
    options: [
      "Inspecter l’avancement vers le Sprint Goal et adapter le plan de la journée",
      "Faire un rapport hiérarchique individuel de justification auprès du manager",
      "Négocier à la baisse les salaires des développeurs en fonction de leurs résultats",
      "Rédiger l’intégralité des spécifications techniques des fonctionnalités futures"
    ],
    correctIndex: 0,
    explanation: "Le Daily Scrum est une réunion d’auto-organisation interne des Developers pour synchroniser leurs efforts vers l’objectif du Sprint."
  },
  {
    id: "p3-11",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Événements Scrum",
    question: "Qui participe activement à la « Sprint Review » organisée à la fin du Sprint ?",
    options: [
      "L’équipe Scrum au complet ainsi que les parties prenantes et clients invités",
      "Strictement et uniquement les développeurs sans le Product Owner ni le client",
      "Le service comptable de l’entreprise cliente accompagné des juristes d’affaires",
      "Uniquement les administrateurs système chargés de la surveillance des réseaux"
    ],
    correctIndex: 0,
    explanation: "La Sprint Review rassemble l’équipe Scrum et les parties prenantes pour inspecter l’incrément produit et adapter le Product Backlog."
  },
  {
    id: "p3-12",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Événements Scrum",
    question: "Quelle est la vocation spécifique de la « Sprint Retrospective » dans la vie de l’équipe ?",
    options: [
      "Inspecter le fonctionnement humain et les processus pour identifier des améliorations",
      "Vendre des fonctionnalités supplémentaires aux clients en négociant les tarifs",
      "Réécrire intégralement le code source de l’application depuis la première ligne",
      "Tester les composants réseau pour vérifier la résistance aux pannes de courant"
    ],
    correctIndex: 0,
    explanation: "La Rétrospective est le moment d’amélioration continue de l’équipe : relations, outils, processus et accords d’équipe."
  },
  {
    id: "p3-13",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Qualité Scrum",
    question: "À quoi sert formellement la « Definition of Done » (DoD) dans une équipe Scrum ?",
    options: [
      "Définir les critères partagés de qualité pour considérer qu’un Incrément est terminé",
      "Créer automatiquement les fiches d’utilisateurs sur les serveurs de production",
      "Calculer la marge libre et le chemin critique selon l’algorithme de PERT",
      "Remplacer les réunions quotidiennes de l’équipe par des rapports par messagerie"
    ],
    correctIndex: 0,
    explanation: "La DoD établit une compréhension commune du niveau d’exigence requis (tests, revue de code, documentation) pour déclarer un travail achevé."
  },
  {
    id: "p3-14",
    partId: "part3",
    difficulty: "trap",
    tag: "Story Points",
    question: "Que mesurent prioritairement les « Story Points » lors des séances d’estimation agile ?",
    options: [
      "La complexité relative, l’effort global et l’incertitude associés à une tâche",
      "Le nombre précis d’heures ou de minutes facturables passées devant l’écran",
      "Le montant en dirhams marocains du bonus accordé au développeur concerné",
      "La quantité de pages de documentation rédigées dans le guide utilisateur"
    ],
    correctIndex: 0,
    explanation: "Les Story Points expriment un effort relatif comparatif entre deux tâches, et non une mesure absolue d’heures ouvrées."
  },
  {
    id: "p3-15",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Métriques agiles",
    question: "Comment définit-on la « Vélocité » d’une équipe de développement Scrum ?",
    options: [
      "Le total de Story Points terminés conformément à la DoD au cours d’un Sprint",
      "La vitesse de téléchargement des données mesurée sur le réseau local interne",
      "Le nombre d’heures supplémentaires accomplies par l’équipe pendant le week-end",
      "La rapidité avec laquelle le Product Owner répond aux messages des stagiaires"
    ],
    correctIndex: 0,
    explanation: "La vélocité est la capacité historique observée de l’équipe, mesurée par la somme des points d’éléments totalement terminés par Sprint."
  },
  {
    id: "p3-16",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Métriques agiles",
    question: "Que représente graphiquement la courbe d’un « Burndown Chart » pendant le Sprint ?",
    options: [
      "La quantité d’effort ou de Story Points restant à accomplir au fil des jours",
      "L’augmentation de la température mesurée à l’intérieur de la baie de serveurs",
      "Le nombre cumulé de tasses de café consommées par les membres de l’équipe",
      "La progression du chiffre d’affaires généré par la vente des abonnements web"
    ],
    correctIndex: 0,
    explanation: "Le Burndown chart trace la diminution progressive du reste à faire jour après jour vers l’objectif de zéro en fin de Sprint."
  },
  {
    id: "p3-17",
    partId: "part3",
    difficulty: "application",
    tag: "Jira",
    question: "Sur un tableau Jira Scrum, quel est l’effet d’un déplacement de ticket de « À faire » vers « En cours » ?",
    options: [
      "Visualiser en temps réel le changement d’état d’avancement dans le flux de travail",
      "Créer automatiquement une nouvelle branche distante sur le serveur GitLab",
      "Multiplier automatiquement par deux le nombre de story points du ticket",
      "Supprimer définitivement l’ensemble des critères d’acceptation rédigés"
    ],
    correctIndex: 0,
    explanation: "Déplacer une carte sur le board reflète l’avancement transparent du travail pour l’ensemble des équipiers."
  },
  {
    id: "p3-18",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Jira",
    question: "Dans Jira, que permet de signaler le champ « Priorité » associé à une anomalie ou une story ?",
    options: [
      "Son niveau d’importance et d’urgence pour déterminer l’ordre de traitement",
      "L’espace disque nécessaire pour héberger le code source sur la machine locale",
      "Le prénom de l’administrateur système habilité à redémarrer le routeur réseau",
      "Le nombre d’écrans requis pour afficher l’ensemble des options du menu"
    ],
    correctIndex: 0,
    explanation: "La priorité classe les éléments selon leur impact opérationnel et commercial pour traiter en premier les éléments cruciaux."
  },
  {
    id: "p3-19",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Jira",
    question: "Quel type de ticket Jira est le plus adéquat pour modéliser une nouvelle fonction attendue par l’utilisateur ?",
    options: [
      "Story (ou User Story)",
      "Bug (correction d’anomalie)",
      "Pipeline (chaîne d’exécution)",
      "Release (étiquette de version)"
    ],
    correctIndex: 0,
    explanation: "Une Story modélise une fonctionnalité orientée valeur utilisateur, tandis qu’un Bug trace une régression ou un dysfonctionnement."
  },
  {
    id: "p3-20",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Jira",
    question: "Quel type de ticket Jira est spécialement conçu pour déclarer un défaut ou un comportement inattendu ?",
    options: [
      "Bug",
      "Epic",
      "Sprint Goal",
      "Product Goal"
    ],
    correctIndex: 0,
    explanation: "Le type Bug sert spécifiquement à documenter, reproduire et corriger un comportement défaillant du produit."
  },
  {
    id: "p3-21",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Artefacts Scrum",
    question: "Quelle bonne pratique régit la gestion du Product Backlog tout au long du cycle de vie du produit ?",
    options: [
      "Il est continuellement affiné, clarifié et réordonné selon la valeur et les retours",
      "Il est figé et verrouillé par un contrat notarié dès le premier jour du projet",
      "Il ne doit contenir strictement que des corrections de bogues informatiques",
      "Il est détruit et réécrit intégralement de zéro chaque vendredi après-midi"
    ],
    correctIndex: 0,
    explanation: "L’affinement du backlog (Backlog Refinement) est une activité continue qui maintient les éléments prêts pour les prochains Sprints."
  },
  {
    id: "p3-22",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Manifeste Agile",
    question: "Quel principe fondamental du Manifeste Agile favorise l’alignement avec les besoins réels du client ?",
    options: [
      "Une collaboration fréquente et directe permettant d’ajuster le produit au fur et à mesure",
      "L’interdiction formelle de solliciter le client avant la livraison finale dans deux ans",
      "Le remplacement total des entretiens utilisateurs par des sondages statistiques génériques",
      "L’exigence de signer un avenant contractuel payant à chaque modification demandée"
    ],
    correctIndex: 0,
    explanation: "La collaboration avec les clients favorise un dialogue transparent et régulier pour s’assurer de construire le bon produit."
  },
  {
    id: "p3-23",
    partId: "part3",
    difficulty: "situation",
    tag: "Scrum en pratique",
    question: "En plein milieu d’un Sprint, un dirigeant exige d’ajouter une fonction urgente. Quelle attitude adopte le Product Owner ?",
    options: [
      "L’évaluer pour l’intégrer au Product Backlog sans compromettre le Sprint Goal en cours",
      "Interrompre immédiatement tout le travail de l’équipe pour exécuter l’ordre sur le champ",
      "Supprimer l’ensemble des tests de sécurité pour gagner du temps de développement",
      "Démissionner sur-le-champ et dissoudre l’ensemble de l’équipe de développement"
    ],
    correctIndex: 0,
    explanation: "Le PO accueille le besoin, l’estime et le priorise dans le Product Backlog pour le prochain Sprint, protégeant ainsi l’engagement de l’équipe."
  },
  {
    id: "p3-24",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Scrum",
    question: "Quel est le bénéfice primordial d’un « Sprint Goal » clairement formulé ?",
    options: [
      "Donner un cap fédérateur qui guide les arbitrages et la collaboration de l’équipe",
      "Remplacer l’ensemble des critères d’acceptation rédigés dans les User Stories",
      "Garantir qu’aucun bogue informatique ne sera jamais détecté lors des tests",
      "Obliger chaque développeur à terminer ses tâches avant midi chaque jour"
    ],
    correctIndex: 0,
    explanation: "Le Sprint Goal donne du sens au travail de l’itération : si une tâche secondaire pose problème, l’équipe s’adapte pour sauver le but premier."
  },
  {
    id: "p3-25",
    partId: "part3",
    difficulty: "trap",
    tag: "Rôles Scrum",
    question: "Au sein d’une équipe Scrum, qui a l’autorité exclusive pour modifier le contenu du Sprint Backlog en cours de Sprint ?",
    options: [
      "Les Developers, au fur et à mesure qu’ils découvrent le travail nécessaire",
      "Le directeur des ressources humaines de l’entreprise cliente uniquement",
      "Le client final lors de ses visites inopinées dans les bureaux de l’équipe",
      "Le serveur d’intégration continue dès qu’un test automatisé échoue"
    ],
    correctIndex: 0,
    explanation: "Le Sprint Backlog appartient aux Developers : ils sont les seuls habilités à y ajouter ou décomposer des tâches pour atteindre le Sprint Goal."
  },
  {
    id: "p3-26",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Jira",
    question: "Quelle est la définition la plus appropriée de la solution logicielle Jira dans le contexte du module Agile ?",
    options: [
      "Une plateforme web de gestion de projet agile permettant de suivre backlog, sprints et tickets",
      "Un compilateur de langage Java permettant de convertir le code source en binaire",
      "Un système d’exploitation pour serveurs d’entreprise basé sur le noyau Linux",
      "Un éditeur de feuilles de calcul concurrent direct du tableur Microsoft Excel"
    ],
    correctIndex: 0,
    explanation: "Jira Software est l’outil de référence en entreprise pour administrer le backlog, animer les boards de Sprints et tracer les anomalies."
  },
  {
    id: "p3-27",
    partId: "part3",
    difficulty: "calculation",
    tag: "Vélocité",
    question: "Une équipe s’est engagée sur 24 Story Points. À la fin du Sprint, 18 points respectent la DoD et 6 points sont presque finis. Quelle est la vélocité validée ?",
    options: [
      "18 Story Points (seuls les éléments rigoureusement terminés selon la DoD comptent)",
      "24 Story Points (puisque le travail a été engagé au début de l’itération)",
      "21 Story Points (en accordant la moitié des points aux éléments presque achevés)",
      "0 Story Point (puisque l’équipe n’a pas atteint l’intégralité de sa prévision)"
    ],
    correctIndex: 0,
    explanation: "En Agile, un élément est soit terminé selon la Definition of Done, soit non terminé. On ne compte pas de points partiels : la vélocité est de 18."
  },
  {
    id: "p3-28",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Événements Scrum",
    question: "Quelle cérémonie offre à l’équipe l’opportunité formelle de faire son bilan interne et d’adapter ses méthodes ?",
    options: [
      "La Sprint Retrospective",
      "La Sprint Review",
      "La réunion de cadrage initial",
      "La démonstration commerciale"
    ],
    correctIndex: 0,
    explanation: "La Rétrospective est l’événement privilégié pour aborder la communication interne, les difficultés rencontrées et choisir des plans d’action."
  },
  {
    id: "p3-29",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Artefacts Scrum",
    question: "Quelles conditions indispensables un Incrément doit-il satisfaire à la fin de chaque Sprint ?",
    options: [
      "Être opérationnel, utilisable et strictement conforme à la Definition of Done",
      "Être simplement documenté dans un fichier Word sans être obligatoirement codé",
      "Avoir été déployé obligatoirement sur les serveurs de production en direct",
      "Contenir au moins cinquante User Stories différentes validées par le PDG"
    ],
    correctIndex: 0,
    explanation: "Un Incrément doit être un pas concret vers le produit final : il doit être en état de marche et satisfaire la Definition of Done."
  },
  {
    id: "p3-30",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Événements Scrum",
    question: "Quel est l’enchaînement chronologique rigoureux des événements rythmant un Sprint Scrum ?",
    options: [
      "Sprint Planning ➔ Réalisation & Daily Scrums ➔ Sprint Review ➔ Sprint Retrospective",
      "Sprint Review ➔ Sprint Retrospective ➔ Sprint Planning ➔ Réalisation sans Daily",
      "Daily Scrum ➔ Sprint Review ➔ Sprint Planning ➔ Choix du nom des serveurs",
      "Sprint Retrospective ➔ Négociation financière ➔ Sprint Review ➔ Déploiement"
    ],
    correctIndex: 0,
    explanation: "Le Sprint commence par le Planning, se poursuit par le travail rythmé par les Dailies quotidiens, puis s’achève par la Review et enfin la Rétrospective."
  }
];
