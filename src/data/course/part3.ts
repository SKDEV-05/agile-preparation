import { CoursePart } from '../../types';

export const coursePart3: CoursePart = {
  id: 'part3',
  orderNumber: 3,
  title: 'Agile · Scrum & Jira',
  subtitle: 'Maîtriser le Manifeste Agile, le framework Scrum complet, les User Stories et la gestion sur Jira',
  description: 'Ce module couvre l’intégralité des pratiques agiles modernes au programme de l’OFPPT : les 4 valeurs et 12 principes du Manifeste Agile, les rôles Scrum (Product Owner, Scrum Master, Developers), les cérémonies, les artefacts, les critères d’acceptation des User Stories, l’estimation en Story Points et le pilotage opérationnel d’un board Jira.',
  iconName: 'Zap',
  colorTheme: 'violet',
  sections: [
    {
      id: 'p3-s1',
      order: '01',
      title: 'Le Manifeste Agile : Valeurs et Principes',
      definition: 'Rédigé en 2001 par 17 experts du logiciel, le Manifeste Agile propose une approche pragmatique et empirique du développement logiciel, fondée sur l’adaptation continue plutôt que le respect aveugle d’un plan préétabli.',
      explanation: 'Le Manifeste ne dit pas qu’il faut supprimer les outils, la documentation ou les contrats, mais qu’on doit accorder PLUS de valeur aux personnes, au logiciel qui marche et à la collaboration directe. Le changement n’est plus vu comme un échec ou un coût imprévu, mais comme un avantage concurrentiel pour satisfaire le client.',
      examples: [
        'Un client demande de modifier l’interface de paiement à 2 semaines de la fin : l’équipe Agile l’accueille favorablement, réévalue les priorités du Product Backlog et intègre cette valeur.',
        'Livrer une première version d’une application de covoiturage en 3 semaines avec juste l’authentification et la recherche de trajet (Incrément utile), plutôt qu’attendre 18 mois un système complet non testé.'
      ],
      keyPoints: [
        'Valeur 1 : Les individus et leurs interactions de préférence aux processus et aux outils.',
        'Valeur 2 : Un logiciel opérationnel de préférence à une documentation exhaustive.',
        'Valeur 3 : La collaboration avec les clients de préférence à la négociation contractuelle.',
        'Valeur 4 : L’adaptation au changement de préférence au suivi d’un plan.',
        'Approche incrémentale (on ajoute des morceaux finis) et itérative (on affine en boucle).'
      ],
      traps: [
        'Attention à la phrase piège d’examen : "L’Agile interdit toute documentation". Faux ! L’Agile privilégie le logiciel fonctionnel mais conserve une documentation utile.',
        'Agile n’est pas une méthode unique : c’est un état d’esprit (Mindset) qui regroupe plusieurs frameworks (Scrum, Kanban, XP).'
      ],
      examContext: 'Question EFM : citer les 4 valeurs fondamentales du Manifeste Agile ou analyser une affirmation sur la gestion du changement.',
      miniQuestion: {
        question: 'D’après le Manifeste Agile, que doit-on privilégier face à un contrat figé négocié à l’avance ?',
        options: [
          'La collaboration continue avec les clients',
          'L’obligation stricte de respecter le cahier des charges initial',
          'La rédaction de pénalités de retard contractuelles',
          'L’interruption immédiate de toutes les réunions de travail'
        ],
        correctIndex: 0,
        explanation: 'La 3e valeur du Manifeste Agile stipule explicitement : "La collaboration avec les clients de préférence à la négociation contractuelle".'
      }
    },
    {
      id: 'p3-s2',
      order: '02',
      title: 'Le Framework Scrum : Les 3 Rôles Clés',
      definition: 'Scrum est un cadre de travail léger conçu pour générer de la valeur grâce à des solutions adaptatives. Une équipe Scrum est pluridisciplinaire, auto-organisée et composée de 3 responsabilités : Product Owner, Scrum Master et Developers.',
      explanation: 'Dans Scrum, il n’y a AUCUN chef de projet hiérarchique ! Le Product Owner décide de CE QU’IL FAUT FAIRE (la valeur métier). Les Developers décident de COMMENT LE FAIRE techniquement. Le Scrum Master s’assure que tout le monde comprend Scrum et aide à supprimer les obstacles (bloquages).',
      examples: [
        'Product Owner (PO) : échange avec les directeurs d’agences bancaires, recueille les besoins et classe les tickets du Backlog par priorité.',
        'Developers : équipe de 3 à 9 ingénieurs/développeurs qui conçoivent, codent, testent et déploient l’Incrément.',
        'Scrum Master (SM) : facilite les cérémonies, protège l’équipe des sollicitations extérieures perturbatrices et coache l’équipe.'
      ],
      keyPoints: [
        'Product Owner (PO) : Maximise la valeur du produit. Responsable exclusif du Product Backlog et de sa priorisation.',
        'Scrum Master (SM) : Garant du cadre méthodologique Scrum. "Servant Leader", il élimine les obstacles (impédiments) et facilite les réunions.',
        'Developers : Équipe pluridisciplinaire qui s’engage sur la réalisation technique d’un Incrément répondant à la Definition of Done.',
        'Taille recommandée d’une équipe Scrum : généralement 10 personnes ou moins (favorise une communication fluide).'
      ],
      traps: [
        'Le Scrum Master N’EST PAS le supérieur hiérarchique des développeurs (piège EFM très fréquent !).',
        'Le Product Owner ne peut pas imposer à l’équipe le nombre de story points qu’elle doit réaliser : seuls les Developers estiment leur capacité.'
      ],
      examContext: 'Question systématique : "Qui est responsable de la priorisation du Product Backlog ?" -> Réponse : Le Product Owner.',
      miniQuestion: {
        question: 'Quel est le rôle principal du Scrum Master au sein d’une équipe Scrum ?',
        options: [
          'Faciliter l’application de Scrum et éliminer les obstacles rencontrés par l’équipe',
          'Attribuer individuellement les tâches quotidiennes à chaque développeur',
          'Rédiger seul l’ensemble des User Stories et fixer les prix de vente',
          'Remplacer le client lors des tests de recette finale en production'
        ],
        correctIndex: 0,
        explanation: 'Le Scrum Master est un coach et facilitateur méthodologique qui aide l’équipe à appliquer Scrum et à lever les bloquages opérationnels.'
      }
    },
    {
      id: 'p3-s3',
      order: '03',
      title: 'Événements et Artefacts Scrum',
      definition: 'Un Sprint est une itération de 1 à 4 semaines contenant 4 événements formels d’inspection et d’adaptation (Planning, Daily, Review, Retrospective) et produisant 3 artefacts transparents (Product Backlog, Sprint Backlog, Incrément).',
      explanation: 'Le Sprint est le cœur battant de Scrum. Pendant le Sprint, on ne change pas l’objectif (Sprint Goal). Chaque matin, 15 minutes debout (Daily Scrum) pour coordonner la journée. À la fin : démonstration au client (Review) puis analyse interne des améliorations possibles de l’équipe (Rétrospective).',
      examples: [
        'Sprint Planning (début de Sprint) : choix des User Stories du backlog à embarquer pour réaliser l’objectif du Sprint.',
        'Daily Scrum (chaque jour, max 15 min) : Qu’ai-je fait hier ? Que vais-je faire aujourd’hui ? Quels obstacles me bloquent ?',
        'Sprint Review (fin de Sprint) : démonstration de l’application qui tourne en direct aux parties prenantes.',
        'Sprint Retrospective (après la Review) : "On a eu des soucis sur les tests automatisés, comment s’organiser pour faire mieux au prochain Sprint ?".'
      ],
      keyPoints: [
        'Sprint : conteneur de temps fixe (Timebox) de 1 à 4 semaines.',
        'Sprint Goal : l’objectif fédérateur et prioritaire défini pour le Sprint.',
        'Product Backlog : liste ordonnée et dynamique de tout ce qui pourrait être nécessaire au produit.',
        'Sprint Backlog : les éléments choisis pour le Sprint + le plan pour les réaliser (propriété des Developers).',
        'Incrément : somme des éléments terminés durant le Sprint + les Sprints précédents, utilisable et conforme à la Definition of Done (DoD).'
      ],
      traps: [
        'Ne confondez pas Review et Rétrospective ! La Review inspecte le PRODUIT avec les parties prenantes ; la Rétrospective inspecte le PROCESSUS et les interactions entre membres de l’équipe.',
        'Le Daily Scrum n’est pas une réunion de reporting pour faire plaisir au chef : c’est une synchronisation pour les Developers.'
      ],
      examContext: 'Question d’examen typique : "Quelle est la durée maximale d’un Daily Scrum ?" -> 15 minutes chrono.',
      diagramType: 'scrum_workflow',
      miniQuestion: {
        question: 'Quelle est la différence fondamentale entre la Sprint Review et la Sprint Retrospective ?',
        options: [
          'La Review porte sur le produit avec les parties prenantes, la Rétrospective sur l’amélioration de l’équipe',
          'La Review a lieu au début du Sprint et la Rétrospective se déroule chaque matin debout',
          'La Review sert à estimer les coûts financiers et la Rétrospective à écrire le code informatique',
          'Il n’y a aucune différence, ce sont deux appellations interchangeables dans le guide Scrum'
        ],
        correctIndex: 0,
        explanation: 'La Sprint Review permet de montrer l’incrément de produit aux clients et parties prenantes, alors que la Rétrospective est une réunion interne d’amélioration continue des pratiques de l’équipe.'
      }
    },
    {
      id: 'p3-s4',
      order: '04',
      title: 'User Stories, Story Points et Pilotage Jira',
      definition: 'Une User Story formalise un besoin utilisateur selon la structure standard "En tant que... je veux... afin de...". L’effort est estimé de façon relative en Story Points (suite de Fibonacci). Jira permet de piloter visuellement ces tickets sur un Kanban/Scrum board.',
      explanation: 'Estimer en heures crée de fausses promesses ("ça prendra 4h"). L’Agile préfère estimer la complexité relative : si la tâche A vaut 2 points, et que la tâche B est deux fois plus complexe, elle vaut 5 ou 8 points. Sur Jira, l’équipe déplace les tickets entre les colonnes : À faire ➔ En cours ➔ En revue ➔ Terminé.',
      examples: [
        'Format User Story : "En tant que stagiaire OFPPT (Rôle), je veux consulter mes notes d’examen en ligne (Besoin), afin d’évaluer ma progression sans me déplacer (Valeur ajoutée)".',
        'Critère d’acceptation : "Le stagiaire ne doit voir que ses propres notes sécurisées par mot de passe".',
        'Types de tickets Jira : Epic (gros lot fonctionnel découpable), Story (fonctionnalité), Task (tâche technique), Bug (correction d’anomalie).'
      ],
      keyPoints: [
        'User Story INVEST : Indépendante, Négociable, Estimable, Suffisamment petite, Testable.',
        'Critères d’acceptation (Acceptance Criteria) : conditions indispensables à valider pour clore la story.',
        'Planning Poker : jeu d’estimation en équipe avec cartes basées sur la suite de Fibonacci modifiée (1, 2, 3, 5, 8, 13, 21).',
        'Vélocité : nombre total de Story Points terminés par l’équipe lors d’un Sprint.',
        'Jira Board : visualisation en temps réel du flux de travail (colonnes To Do, In Progress, Done).'
      ],
      traps: [
        '1 Story Point n’est PAS égal à 1 heure ou 1 jour de travail (les points mesurent la complexité et l’effort relatif).',
        'Un Epic n’est pas un petit bug : c’est une macro-fonctionnalité qui regroupe plusieurs User Stories.'
      ],
      examContext: 'Exercice EFM classique : rédiger une User Story complète avec ses critères d’acceptation ou calculer la vélocité moyenne d’une équipe.',
      miniQuestion: {
        question: 'Dans une User Story rédigée selon les règles de l’art, quelle information apporte la clause "Afin de..." ?',
        options: [
          'La valeur métier ou le bénéfice attendu par l’utilisateur final',
          'Le nom du développeur qui prendra en charge la tâche dans Jira',
          'La durée exacte en heures requise pour écrire les tests unitaires',
          'L’adresse IP du serveur où sera déployée la nouvelle fonctionnalité'
        ],
        correctIndex: 0,
        explanation: 'La clause "afin de..." explicite la finalité et la valeur ajoutée apportée au métier ou à l’utilisateur.'
      }
    }
  ],
  practicalCase: {
    title: 'Cas Pratique : Organisation d’un Sprint 1 sur Jira',
    scenario: 'Une équipe de 5 stagiaires développe un module e-learning. Le Product Owner a rédigé 8 User Stories totalisant 35 Story Points. Lors des Sprints précédents, l’équipe a atteint une vélocité moyenne de 22 Story Points.',
    challenge: 'Combien de points l’équipe doit-elle sélectionner lors du Sprint Planning ? Comment organiser le board Jira pour suivre les bugs et les stories ?',
    solutionPoints: [
      'Capacité d’engagement : L’équipe doit sélectionner environ 20 à 22 Story Points prioritaires conformes à sa vélocité historique, et ne pas surcharger le Sprint à 35 points.',
      'Sprint Goal : "Permettre à un stagiaire de s’authentifier et de passer son premier quiz interactif".',
      'Configuration Jira : Colonnes standard (À faire ➔ En cours ➔ Revue de code ➔ Test / QA ➔ Terminé).',
      'Gestion des bugs : Les bugs détectés pendant le Sprint sur les stories en cours sont résolus immédiatement avant de passer en "Terminé" (DoD).'
    ]
  },
  keyTakeaways: [
    'Scrum est fondé sur 3 rôles (PO, SM, Developers), 5 événements et 3 artefacts.',
    'Le Product Owner maximise la valeur du produit ; le Scrum Master facilite le cadre et coache l’équipe.',
    'Une User Story exprime le besoin utilisateur et sa valeur (En tant que... je veux... afin de...).',
    'Jira modélise le workflow de l’équipe à travers des tickets (Epic, Story, Bug, Task) et des colonnes de board.'
  ],
  commonTraps: [
    'Qualifier le Scrum Master de "chef de projet" ou de "manager direct".',
    'Croire que les Story Points correspondent à un temps mesuré en heures.',
    'Modifier l’objectif d’un Sprint en cours de route sans concertation majeure.'
  ]
};
