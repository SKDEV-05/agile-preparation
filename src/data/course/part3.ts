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
      deepExplanation: 'Le Manifeste Agile est né en réponse directe aux dérives des projets en cascade (Waterfall) où l’effet tunnel de plusieurs années aboutissait souvent à des logiciels obsolètes avant même d’être livrés. L’Agilité repose sur l’empirisme (Transparence, Inspection, Adaptation) : plutôt que de prédire l’avenir sur 3 ans, on avance par cycles courts de 2 à 4 semaines en mesurant la valeur réelle délivrée. Dans le référentiel d’examen OFPPT, les 4 valeurs et les 12 principes doivent être maîtrisés, en insistant sur le fait que la documentation reste nécessaire mais doit être utile et concise, et que le client fait partie intégrante de l’équipe de conception.',
      examples: [
        'Un client demande de modifier l’interface de paiement à 2 semaines de la fin : l’équipe Agile l’accueille favorablement, réévalue les priorités du Product Backlog et intègre cette valeur.',
        'Livrer une première version d’une application de covoiturage en 3 semaines avec juste l’authentification et la recherche de trajet (Incrément utile), plutôt qu’attendre 18 mois un système complet non testé.'
      ],
      realWorldCase: {
        company: 'Maroc Telecom (Itissalat Al-Maghrib)',
        sector: 'Télécommunications & E-Services',
        problem: 'Face à l’arrivée de nouvelles offres concurrentes sur la fibre optique et la 4G/5G, les délais de livraison de l’espace client web et mobile prenaient 14 mois avec un cycle en cascade rigide, causant une perte de parts de marché.',
        agileSolution: 'Adoption des principes agiles : suppression de l’effet tunnel de 14 mois au profit de releases mensuelles itératives. Implication directe des équipes marketing et service client dans la validation continue des fonctionnalités.',
        concreteResult: 'Time-to-market divisé par 3 (nouvelles offres lancées en 3 semaines au lieu de 6 mois), satisfaction client mobile en hausse de 42% et réactivité immédiate face aux offres de la concurrence.'
      },
      model3D: 'scrum_3d',
      videos: {
        fr: {
          youtubeId: '9TycLR0TqFA',
          title: 'Comprendre Scrum et l’Agilité en 10 Minutes (Guide Complet)',
          channel: 'Alexandre Boutin - Agiliste',
          duration: '10:24',
          language: 'fr',
          summary: 'Une synthèse remarquable détaillant l’esprit du Manifeste Agile, les limites des anciens cycles en V, et la puissance des itérations Scrum courtes pour délivrer de la valeur continue.',
          keyPoints: [
            'Pourquoi le cycle en V échouait face aux évolutions rapides du marché',
            'Les 4 valeurs cardinales du Manifeste Agile expliquées concrètement',
            'Comment le Sprint de 2 à 4 semaines produit un incrément testé et utilisable'
          ]
        },
        en: {
          youtubeId: 'XU0llRltyFM',
          title: 'Scrum in 20 Minutes | Scrum Methodology & Agile Framework',
          channel: 'Edureka',
          duration: '19:48',
          language: 'en',
          summary: 'A fast-paced, high-value visual walkthrough of the Scrum framework: Agile values, Product Backlog refinement, sprint cadences, and velocity tracking.',
          keyPoints: [
            'Core Agile manifesto values vs traditional Waterfall approach',
            'Three pillars of Scrum: Transparency, Inspection, and Adaptation',
            'Step-by-step breakdown of Sprint Planning, Daily Scrum, Sprint Review, and Retrospective'
          ]
        }
      },
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
      deepExplanation: 'La suppression du chef de projet traditionnel dans Scrum est le point qui déstabilise le plus les organisations traditionnelles. Le pouvoir est scindé : le Product Owner (PO) maximise le Retour sur Investissement (ROI), priorise le backlog et a le pouvoir absolu de dire NON à une demande qui n’apporte pas de valeur. Les Developers (3 à 9 membres pluridisciplinaires : front, back, testeurs, UX) sont collectivement responsables de la qualité et du respect de la Definition of Done (DoD). Le Scrum Master est un "Servant Leader" (Leader Serviteur) : il n’ordonne rien, n’attribue aucune tâche, mais protège l’équipe des interférences extérieures et facilite l’amélioration continue.',
      examples: [
        'Product Owner (PO) : échange avec les directeurs d’agences bancaires, recueille les besoins et classe les tickets du Backlog par priorité.',
        'Developers : équipe de 3 à 9 ingénieurs/développeurs qui conçoivent, codent, testent et déploient l’Incrément.',
        'Scrum Master (SM) : facilite les cérémonies, protège l’équipe des sollicitations extérieures perturbatrices et coache l’équipe.'
      ],
      realWorldCase: {
        company: 'Wafacash Maroc',
        sector: 'Services Financiers & Transfert d’Argent',
        problem: 'Conflits permanents entre le service conformité réglementaire, le marketing et les développeurs lors de la refonte du service de transfert international, provoquant 4 mois de blocage.',
        agileSolution: 'Clarification stricte des 3 rôles Scrum : nomination d’un Product Owner unique habilité à trancher les priorités, mise en place d’un Scrum Master certifié pour animer les cérémonies, et équipe de 6 développeurs pluridisciplinaires en totale autonomie technique.',
        concreteResult: 'Fin des réunions stériles de 3h, vélocité de l’équipe stabilisée à 28 points par Sprint de 2 semaines et homologation Bank Al-Maghrib obtenue dès le premier audit.'
      },
      videos: {
        fr: {
          youtubeId: 'Vnvdq5fWk1k',
          title: 'Les 3 Rôles Scrum Expliqués Simplement : PO, Scrum Master, Développeurs',
          channel: 'Scrum Life',
          duration: '12:15',
          language: 'fr',
          summary: 'Jean-Pierre Lambert détaille avec clarté et exemples concrets pourquoi le Scrum Master n’est pas un chef hiérarchique et comment le Product Owner priorise la valeur.',
          keyPoints: [
            'La différence capitale entre autorité hiérarchique et leadership serviteur',
            'Le rôle exact du Product Owner face aux demandes contradictoires des clients',
            'L’auto-organisation de l’équipe de développement pour respecter la Definition of Done'
          ]
        },
        en: {
          youtubeId: '502ILHjX9EE',
          title: 'Scrum Roles Explained: Product Owner, Scrum Master, Development Team',
          channel: 'Continuous Delivery',
          duration: '14:30',
          language: 'en',
          summary: 'Dave Farley explains how Scrum roles interact, why there is no traditional project manager in Scrum, and how to avoid common organizational dysfunctions.',
          keyPoints: [
            'The distinct responsibilities of the Product Owner vs the Engineering Team',
            'Why Scrum Masters must remove organizational impediments rather than assigning tasks',
            'How cross-functional teams take collective ownership of deliverables'
          ]
        }
      },
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
      deepExplanation: 'Le Guide Scrum 2020 associe chaque artefact à un engagement formel : le Product Backlog est lié au Product Goal (la vision cible à long terme) ; le Sprint Backlog est lié au Sprint Goal (la valeur commune que l’équipe s’engage à créer durant le sprint) ; l’Incrément est lié à la Definition of Done (DoD - l’ensemble des critères de qualité requis : tests unitaires, revue de code, documentation, déploiement sans régression). Le respect strict du Timeboxing garantit la discipline de l’équipe : un Daily Scrum ne doit jamais déborder des 15 minutes chrono.',
      examples: [
        'Sprint Planning (début de Sprint) : choix des User Stories du backlog à embarquer pour réaliser l’objectif du Sprint.',
        'Daily Scrum (chaque jour, max 15 min) : Qu’ai-je fait hier ? Que vais-je faire aujourd’hui ? Quels obstacles me bloquent ?',
        'Sprint Review (fin de Sprint) : démonstration de l’application qui tourne en direct aux parties prenantes.',
        'Sprint Retrospective (après la Review) : "On a eu des soucis sur les tests automatisés, comment s’organiser pour faire mieux au prochain Sprint ?".'
      ],
      realWorldCase: {
        company: 'CIH Bank (E-Banking & Mobile)',
        sector: 'Banque Digitale & FinTech',
        problem: 'Lenteur excessive lors des mises à jour de l’application CIH Mobile, et retours négatifs des utilisateurs sur le Play Store après chaque mise en production en raison de bugs récurrents.',
        agileSolution: 'Application rigoureuse de la Definition of Done (DoD) incluant 85% de couverture de tests automatisés et revue UX systématique en Sprint Review avant toute mise en production.',
        concreteResult: 'Note de l’application sur les stores passée de 3.1/5 à 4.6/5, et zéro bug bloquant constaté sur les 12 derniers Sprints consécutifs.'
      },
      model3D: 'scrum_3d',
      videos: {
        fr: {
          youtubeId: 'w2V4K2tD0Xk',
          title: 'Les Cérémonies et Artefacts Scrum : De la Planification à la Rétrospective',
          channel: 'Développeur Libre',
          duration: '15:40',
          language: 'fr',
          summary: 'Revue détaillée de toutes les cérémonies Scrum : Sprint Planning, Daily Scrum de 15 minutes, Sprint Review et Sprint Retrospective avec exemples concrets sur tableau agile.',
          keyPoints: [
            'Le concept fondamental de Timebox et son respect absolu',
            'La différence entre Sprint Review (produit) et Rétrospective (équipe)',
            'L’importance de la Definition of Done pour garantir la qualité livrée'
          ]
        },
        en: {
          youtubeId: 'Iy4W2x7bA_w',
          title: 'Scrum Events and Artifacts Explained | Agile Project Management',
          channel: 'Google Career Certificates',
          duration: '11:20',
          language: 'en',
          summary: 'Official Google PM course module breaking down the 5 Scrum ceremonies and the 3 artifacts, with practical industry best practices.',
          keyPoints: [
            'Sprint cadence and continuous delivery loops',
            'Managing the Product Backlog and Sprint Backlog effectively',
            'How Retrospectives drive continuous improvements across iterations'
          ]
        }
      },
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
      deepExplanation: 'Pour être efficace, chaque User Story doit respecter l’acronyme INVEST : Indépendante (développable sans bloquage externe), Négociable (la discussion prime sur le texte figé), Valeur (apporte un gain tangible pour l’utilisateur ou le business), Estimable (l’équipe comprend suffisamment la tâche pour donner une note), Suffisamment petite (Small - réalisable au sein d’un seul Sprint), et Testable (possède des critères d’acceptation vérifiables). Le Planning Poker permet d’éviter le biais d’ancrage en révélant les votes simultanément. Sur Jira, la limitation du Work In Progress (WIP) empêche l’effet d’embouteillage où tout le monde commence des tâches sans jamais en terminer aucune.',
      examples: [
        'Format User Story : "En tant que stagiaire OFPPT (Rôle), je veux consulter mes notes d’examen en ligne (Besoin), afin d’évaluer ma progression sans me déplacer (Valeur ajoutée)".',
        'Critère d’acceptation : "Le stagiaire ne doit voir que ses propres notes sécurisées par mot de passe".',
        'Types de tickets Jira : Epic (gros lot fonctionnel découpable), Story (fonctionnalité), Task (tâche technique), Bug (correction d’anomalie).'
      ],
      realWorldCase: {
        company: 'Sanlam Maroc (Ex-Saham Assurance)',
        sector: 'Assurances & Sinistres Numériques',
        problem: 'Les déclarations de sinistres automobiles en ligne subissaient 3 semaines de délai d’instruction car les développeurs estimaient mal les tâches et accumulaient 40 tickets "En cours" simultanément.',
        agileSolution: 'Mise en place d’un board Jira avec limitation du WIP (Work In Progress max = 3 par personne), estimation en Planning Poker et rédaction de User Stories standardisées INVEST.',
        concreteResult: 'Cycle time moyen réduit de 18 jours à 3,5 jours, suppression des goulots d’étranglement et visibilité totale en temps réel pour le comité de direction sur Jira.'
      },
      videos: {
        fr: {
          youtubeId: 'N17N5fV9tF4',
          title: 'Tutoriel Jira & User Stories : Comment Gérer un Projet Scrum de A à Z',
          channel: 'Agile & Tech Academy',
          duration: '16:10',
          language: 'fr',
          summary: 'Prise en main guidée d’Atlassian Jira : création de Backlog, rédaction de User Stories, organisation d’un Sprint, configuration du board Kanban et suivi du Burndown Chart.',
          keyPoints: [
            'Comment rédiger une User Story conforme à la méthode INVEST',
            'Configuration des colonnes et workflow personnalisé sur Jira',
            'Interprétation du Burndown Chart pour anticiper la fin du Sprint'
          ]
        },
        en: {
          youtubeId: '6LgU3s3Y6_A',
          title: 'User Stories and Story Points in Jira | Complete Agile Guide',
          channel: 'Atlassian',
          duration: '13:45',
          language: 'en',
          summary: 'Official guide to mastering User Stories, estimation techniques with Story Points, and optimizing your team workflow in Jira.',
          keyPoints: [
            'Story point estimation using Planning Poker and relative sizing',
            'Tracking velocity and calculating team capacity for upcoming sprints',
            'Managing Epics, Tasks, and Subtasks on dynamic Jira boards'
          ]
        }
      },
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
