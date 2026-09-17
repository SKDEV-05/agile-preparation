import { CoursePart } from '../../types';

export const coursePart1: CoursePart = {
  id: 'part1',
  orderNumber: 1,
  title: 'Fondamentaux de la gestion de projet',
  subtitle: 'Comprendre les bases, les acteurs clés, le triangle QCD et les approches prédictives vs agiles',
  description: 'Ce module pose le socle théorique indispensable de la gestion de projet : définitions normées, distinction projet / opérations récurrentes, rôles MOA/MOE, matrice RACI, gestion proactive des risques et comparaison rigoureuse entre cycle en V, cascade et approches agiles.',
  iconName: 'LayoutGrid',
  colorTheme: 'indigo',
  sections: [
    {
      id: 'p1-s1',
      order: '01',
      title: 'Qu’est-ce qu’un projet informatique ?',
      definition: 'Un projet est une entreprise temporaire initiée dans le but de fournir un produit, un service ou un résultat unique, caractérisée par une date de début, une date de fin, des objectifs précis et des ressources allouées.',
      explanation: 'Contrairement aux opérations courantes d’une entreprise (comme la maintenance quotidienne ou le support utilisateur qui sont répétitifs et continus), un projet a toujours une fin programmée. Il introduit une rupture ou une nouveauté dans l’organisation.',
      deepExplanation: 'En ingénierie logicielle, tout projet s’articule autour de jalons formels (Kick-off, Cadrage, Conception, Réalisation, Recette VABF/VSR, Mise en Production). Dans les examens OFPPT, une attention particulière est portée à la distinction entre "Produit" et "Projet" : le projet est l’effort déployé pour créer le produit ; une fois le produit livré et déployé, la vie de l’application bascule dans le mode RUN (maintenance préventive, corrective et évolutive), qui n’est plus un projet mais un processus pérenne.',
      examples: [
        'Développement d’une nouvelle application mobile bancaire pour les clients d’Attijariwafa Bank (Projet : création d’une nouveauté avec un budget et une date limite).',
        'Répondre aux tickets d’incidents réseau au quotidien (Opération récurrente / Maintenance : pas de date de fin globale).'
      ],
      realWorldCase: {
        company: 'Attijariwafa Bank Maroc',
        sector: 'Banque & Solutions Numériques',
        problem: 'Remplacer l’ancien système de consultation des soldes par une application mobile moderne capable d’encaisser 10 millions de connexions quotidiennes sans interruption.',
        agileSolution: 'Découpage du projet en 4 phases avec jalons stricts. Phase 1 : architecture sécurisée ; Phase 2 : authentification biométrique ; Phase 3 : virement instantané. Une équipe MOA (branche commerciale) a validé les maquettes en amont.',
        concreteResult: 'Application livrée en 6 mois avec un taux de disponibilité de 99,98% et adoption massive par plus de 3,5 millions de clients actifs dès la première année.'
      },
      model3D: 'triangle_3d',
      videos: {
        fr: {
          youtubeId: 'J58CZe6yN1I',
          title: 'Gestion de Projet Informatique : Notions Clés & Cycle de Vie (Explication Complète)',
          channel: 'Management & Projets',
          duration: '11:42',
          language: 'fr',
          summary: 'Une excellente synthèse pour comprendre les bases de la gestion de projet : définition officielle, étapes du cycle de vie, rôles clés et équilibre du triangle QCD.',
          keyPoints: [
            'Différence essentielle entre un projet unique et une activité de routine opérationnelle',
            'Les 4 phases universelles : Initialisation, Planification, Exécution, Clôture',
            'Pourquoi le respect du triangle Coût / Qualité / Délais conditionne la réussite de tout examen ou projet'
          ]
        },
        en: {
          youtubeId: 'BOU1YP5NZVA',
          title: 'Project Management in 8 Minutes | Project Management Fundamentals',
          channel: 'Simplilearn',
          duration: '08:15',
          language: 'en',
          summary: 'A fast-paced, high-impact masterclass covering project lifecycles, PMBOK standards, and balancing the triple constraint.',
          keyPoints: [
            'Understanding the 5 standard project process groups',
            'Scope, Time, Cost, and Quality triple constraint trade-offs',
            'Stakeholder communication and delivering measurable business value'
          ]
        }
      },
      keyPoints: [
        'Temporaire : possède un début et une échéance clairement fixés.',
        'Unique : délivre un résultat spécifique jamais réalisé exactement à l’identique.',
        'Contraint : encadré par le triangle QCD (Qualité, Coût, Délai).',
        'Évolutif : avance par étapes successives (cadrage, réalisation, recette, clôture).'
      ],
      traps: [
        'Ne pas confondre Projet (temporaire et innovant) et Processus opérationnel (répétitif et permanent).',
        'Un projet n’est pas nécessairement informatique : la construction d’un pont ou l’organisation d’un événement sont aussi des projets.'
      ],
      examContext: 'Dans les examens OFPPT, une question classique demande d’identifier parmi 4 activités celle qui constitue un projet (ex: déployer un nouvel ERP vs faire des sauvegardes nocturnes).',
      diagramType: 'lifecycle',
      miniQuestion: {
        question: 'Parmi les situations suivantes, laquelle constitue un véritable PROJET selon les standards OFPPT ?',
        options: [
        'La sauvegarde automatique programmée chaque vendredi soir',
        'La maintenance corrective habituelle des serveurs de messagerie',
        'La gestion quotidienne des demandes d’assistance bureautique',
        'La refonte complète du portail web stagiaires livrée dans 6 mois',
      ],
        correctIndex: 3,
        explanation: 'La refonte du portail a un objectif précis, un résultat unique et une fin programmée dans 6 mois, contrairement aux tâches de maintenance récurrentes.'
      }
    },
    {
      id: 'p1-s2',
      order: '02',
      title: 'Parties prenantes, MOA, MOE et Chef de projet',
      definition: 'Une partie prenante (stakeholder) est tout individu ou groupe pouvant affecter un projet ou être affecté par son résultat. La MOA exprime le besoin métier, la MOE réalise la solution technique, et le Chef de projet coordonne l’ensemble.',
      explanation: 'Pensez à la construction d’une maison : le propriétaire qui habite la maison et définit le nombre de pièces est la MOA (Maîtrise d’Ouvrage). L’architecte et les maçons qui choisissent le béton et bâtissent les murs représentent la MOE (Maîtrise d’Œuvre). Le Chef de projet s’assure que le chantier avance dans les temps et selon le devis.',
      deepExplanation: 'En entreprise, la séparation stricte MOA/MOE protège l’organisation contre deux dérives : la MOA sans MOE formule des exigences irréalistes ou technologiquement irréalisables ; la MOE sans MOA développe des prouesses techniques complexes qui ne répondent pas aux besoins des clients finaux. La MOA rédige l’expression de besoin et prononce la recette VABF (Vérification d’Aptitude au Bon Fonctionnement) puis la recette VSR (Vérification de Service Régulier en conditions réelles). La MOE est contractuellement garante de la qualité du code, de l’architecture et des délais de fabrication.',
      examples: [
        'Direction Financière d’une entreprise (MOA) : commande un outil de gestion des factures et valide qu’il répond aux normes comptables.',
        'Équipe de développement logiciel interne ou ESN (MOE) : conçoit la base de données PostgreSQL, développe l’API REST et déploie les conteneurs.',
        'Utilisateurs finaux, régulateur bancaire, fournisseurs d’API : parties prenantes clés devant être consultées ou informées.'
      ],
      realWorldCase: {
        company: 'Royal Air Maroc (RAM)',
        sector: 'Transport Aérien & Systèmes d’Information Voyageurs',
        problem: 'Retards récurrents et dépassements budgétaires lors du déploiement du nouveau système d’enregistrement et de billetterie en ligne, causés par un manque de clarté hiérarchique entre la direction commerciale et l’équipe technique.',
        agileSolution: 'Mise en place d’une gouvernance MOA/MOE formalisée : nomination d’une MOA dédiée issue des opérations aéroportuaires et d’une MOE responsable de l’architecture cloud sécurisée avec des comités de pilotage hebdomadaires.',
        concreteResult: 'Système déployé dans 42 aéroports internationaux sans aucune interruption de vol, avec une réduction de 30% des coûts d’intégration externe.'
      },
      videos: {
        fr: {
          youtubeId: 'J58CZe6yN1I',
          title: 'MOA vs MOE : Comprendre les Rôles Clés en Gestion de Projet',
          channel: 'Management & Projets',
          duration: '09:15',
          language: 'fr',
          summary: 'Explication approfondie sur les rôles de la Maîtrise d’Ouvrage (commanditaire fonctionnel) et de la Maîtrise d’Œuvre (réalisation technique) avec les comités de pilotage.',
          keyPoints: [
            'MOA = Définition du besoin, validation des livrables et gestion du budget',
            'MOE = Choix technologiques, conception technique et développement du logiciel',
            'Le rôle pivot du Chef de projet pour orchestrer les échanges'
          ]
        },
        en: {
          youtubeId: 'BOU1YP5NZVA',
          title: 'Stakeholder Management & Project Roles Explained',
          channel: 'Simplilearn',
          duration: '09:20',
          language: 'en',
          summary: 'Detailed walkthrough of project roles, client sponsor vs delivery team, RACI governance, and executive steering committees.',
          keyPoints: [
            'Understanding stakeholder influence and impact on project success',
            'Sponsor vs Product Owner vs Engineering lead responsibilities',
            'Communication cadences that prevent scope misunderstandings'
          ]
        }
      },
      keyPoints: [
        'MOA (Maître d’Ouvrage) = Client / Métier. Il définit le "QUOI" (besoins, fonctionnalités, budget).',
        'MOE (Maître d’Œuvre) = Équipe technique. Elle définit le "COMMENT" (technologies, architecture, réalisation).',
        'Chef de projet = Pilote opérationnel. Il planifie, anime les réunions, suit les délais et gère les risques.',
        'Parties prenantes externes = clients finaux, sous-traitants, organismes de certification.'
      ],
      traps: [
        'Erreur critique d’examen : inverser MOA et MOE. Astuce mnémotechnique : la MOA a les A-ttentes du client, la MOE a l’E-xpertise technique.',
        'Le chef de projet ne décide pas seul du besoin métier (c’est le rôle de la MOA).'
      ],
      examContext: 'Les examens OFPPT posent fréquemment des mises en situation où l’on demande : "Dans cette équipe, qui valide les livrables finaux ?" -> Réponse : la MOA (ou le Product Owner en Agile).',
      miniQuestion: {
        question: 'Qui est contractuellement responsable de valider la conformité fonctionnelle de la solution développée ?',
        options: [
        'Le développeur backend',
        'La Maîtrise d’Ouvrage (MOA)',
        'L’administrateur système',
        'La Maîtrise d’Œuvre (MOE)',
      ],
        correctIndex: 1,
        explanation: 'La MOA représente le commanditaire métier : c’est elle qui formule le besoin et valide la recette fonctionnelle des livrables.'
      }
    },
    {
      id: 'p1-s3',
      order: '03',
      title: 'Contraintes du triangle QCD, Risques et Matrice RACI',
      definition: 'Le pilotage repose sur l’équilibre du triangle QCD (Qualité, Coût, Délai). La gestion des risques anticipe les aléas. La matrice RACI clarifie qui Réalise (R), qui est Responsable final (A), qui est Consulté (C) et qui est Informé (I).',
      explanation: 'Si le client demande d’ajouter 10 nouvelles fonctionnalités (périmètre/qualité) sans augmenter le budget (coût), alors le délai doit obligatoirement être repoussé. C’est la règle d’or de l’arbitrage de projet. De plus, pour chaque tâche, une seule personne doit être comptable du résultat final (Accountable dans RACI) afin d’éviter que personne ne prenne la décision.',
      deepExplanation: 'Le triangle QCD (aussi appelé triple contrainte de projet) est une loi immuable : toute modification d’un des sommets impose un rééquilibrage sur les deux autres. Si vous souhaitez accélérer le calendrier (réduire le Délai), vous devez soit injecter plus de ressources (augmenter le Coût), soit réduire le périmètre des fonctionnalités (abaisser la Qualité/Périmètre). Concernant la matrice RACI, la règle d’or d’ingénierie logicielle est stricte : il ne doit y avoir qu’un et un seul "A" (Accountable - décideur final) par tâche. Deux "A" créent des conflits de leadership, zéro "A" crée une tâche orpheline sans responsable.',
      examples: [
        'Matrice RACI pour la validation de la maquette UI : UI Designer = R (Réalise) ; Chef de projet = A (Approuve/Accountable) ; Développeur = C (Consulté pour faisabilité) ; Client = I (Informé de l’avancement).',
        'Risque identifié : retard de livraison du serveur cloud par le fournisseur. Action préventive : souscrire une option haute disponibilité temporaire.'
      ],
      realWorldCase: {
        company: 'Maroc Telecom (Déploiement Fibre Optique FTTH)',
        sector: 'Infrastructures Télécoms & Réseaux',
        problem: 'Risques élevés de dépassements budgétaires et de retards dans le raccordement de 200 000 foyers à Casablanca et Rabat en raison de multiples sous-traitants sans responsabilités claires.',
        agileSolution: 'Définition d’une matrice RACI stricte liant chaque étape de génie civil et raccordement à un responsable unique, couplée à un pilotage serré du triangle QCD hebdomadaire.',
        concreteResult: 'Livraison du plan de déploiement avec 2 semaines d’avance sur le calendrier initial et respect rigoureux du budget alloué de 450 millions de dirhams.'
      },
      model3D: 'triangle_3d',
      videos: {
        fr: {
          youtubeId: 'J58CZe6yN1I',
          title: 'Le Triangle QCD et la Matrice RACI Expliqués Simplement',
          channel: 'Management & Projets',
          duration: '10:30',
          language: 'fr',
          summary: 'Comment arbitrer entre Coût, Qualité et Délais, et comment bâtir une matrice RACI sans faille pour réussir son examen.',
          keyPoints: [
            'L’équilibre indispensable entre Périmètre, Budget et Planning',
            'La signification des 4 lettres RACI : Responsible, Accountable, Consulted, Informed',
            'Pourquoi il ne doit y avoir qu’un seul Accountable par activité'
          ]
        },
        en: {
          youtubeId: 'BOU1YP5NZVA',
          title: 'Triple Constraint & RACI Matrix in Project Management',
          channel: 'Simplilearn',
          duration: '08:15',
          language: 'en',
          summary: 'Clear guide on managing trade-offs between scope, time, and budget, with best practices for RACI responsibility assignment.',
          keyPoints: [
            'Triple constraint mechanics and trade-off formulas',
            'RACI mapping rules and organizational accountability',
            'Proactive risk mitigation vs reactive issue troubleshooting'
          ]
        }
      },
      keyPoints: [
        'Triangle QCD : Périmètre / Qualité, Coût (budget/ressources), Délai (calendrier). Modifier un sommet impacte les deux autres.',
        'RACI - R (Responsible) : la personne qui exécute concrètement l’activité.',
        'RACI - A (Accountable) : l’unique décideur qui porte la responsabilité finale et approuve le résultat.',
        'RACI - C (Consulted) : expert sollicité pour avis avant ou pendant l’action.',
        'RACI - I (Informed) : personne tenue au courant après réalisation.'
      ],
      traps: [
        'Attention au RACI : il ne doit y avoir qu’un SEUL "A" par ligne/activité ! S’il y a deux Accountable, il y a dilution de responsabilité.',
        'Un risque n’est pas un problème déjà avéré : c’est un événement futur incertain dont on estime la probabilité et la gravité.'
      ],
      examContext: 'Question type EFM : "Dans RACI, quelle lettre désigne l’acteur qui a l’autorité pour valider définitivement le livrable ?" -> A (Accountable).',
      diagramType: 'raci_matrix',
      miniQuestion: {
        question: 'Dans une matrice RACI, que risque l’organisation si plusieurs personnes se voient attribuer la lettre "A" pour une même tâche ?',
        options: [
        'Un passage obligatoire et immédiat à la méthode Scrum',
        'Une suppression des tests de sécurité nécessaires',
        'Une confusion et une dilution de la responsabilité décisionnelle',
        'Une augmentation automatique de la vélocité des développeurs',
      ],
        correctIndex: 2,
        explanation: 'Dans la méthode RACI, il doit y avoir strictement un seul Accountable par activité pour garantir qu’une décision claire soit prise sans conflit de pouvoir.'
      }
    },
    {
      id: 'p1-s4',
      order: '04',
      title: 'Méthodes Prédictives (Cascade, Cycle en V) vs Approche Agile',
      definition: 'Les méthodes prédictives (Cascade, Cycle en V) planifient l’intégralité du travail de façon séquentielle dès le départ. Les méthodes adaptatives (Agile) avancent par courtes itérations avec feedback continu pour intégrer le changement.',
      explanation: 'Le Cycle en V relie chaque phase de conception à une phase de test correspondante (Spécifications ➔ Tests de Recette, Conception générale ➔ Tests d’Intégration, Conception détaillée ➔ Tests Unitaires). Cependant, si le client change d’avis 6 mois après, modifier le code coûte très cher. L’Agile résout ce problème en livrant une version testée et fonctionnelle toutes les 2 à 4 semaines.',
      deepExplanation: 'Le modèle en cascade et le Cycle en V sont dits "prédictifs" car ils reposent sur l’hypothèse que les besoins peuvent être complètement anticipés et figés dès le premier mois de travail. Dans les environnements hautement réglementés (spatial, ferroviaire, santé), le Cycle en V reste une référence grâce à sa traçabilité ascendante/descendante exhaustive. En revanche, pour les logiciels web, mobiles et SaaS, cette rigidité provoque l’effet tunnel : le client découvre le produit trop tard. L’Agile (approche adaptative et empirique) remplace le plan quinquennal par des boucles d’inspection et d’adaptation courtes de 2 à 4 semaines.',
      examples: [
        'Logiciel médical pour scanner IRM ou pilotage ferroviaire : cycle en V privilégié car les exigences sont très strictes, stables et soumises à de lourdes certifications réglementaires.',
        'Plateforme e-commerce ou application mobile de livraison : approche Agile privilégiée car les préférences des utilisateurs évoluent rapidement et nécessitent des adaptations constantes.'
      ],
      realWorldCase: {
        company: 'Banque Centrale Populaire (BCP Maroc)',
        sector: 'Systèmes Bancaires & Monétique',
        problem: 'Le développement d’un nouvel outil de crédit à la consommation via un cycle en V rigide a mis 2 ans avant d’arriver en phase de test, révélant que les formulaires ne correspondaient plus aux habitudes des jeunes emprunteurs.',
        agileSolution: 'Basculement vers un modèle hybride : socle d’intégration bancaire sécurisé en V, et développement des interfaces clients en Sprints agiles de 2 semaines avec tests utilisateurs continus.',
        concreteResult: 'Lancement réussi de l’application "Pocket Bank", division par deux du taux d’abandon lors de la souscription de crédit et satisfaction client record.'
      },
      videos: {
        fr: {
          youtubeId: '9TycLR0TqFA',
          title: 'Cycle en V vs Méthodes Agiles : Quelle Différence ? (Guide Examen)',
          channel: 'Alexandre Boutin - Agiliste',
          duration: '10:24',
          language: 'fr',
          summary: 'Analyse comparative détaillée entre le modèle en cascade, le cycle en V et la philosophie Agile pour les examens d’ingénierie logicielle.',
          keyPoints: [
            'L’effet tunnel du cycle en V et le coût exorbitant des changements tardifs',
            'La symétrie conception/tests dans la phase ascendante du Cycle en V',
            'Comment l’Agile sécurise la valeur délivrée grâce aux incréments réguliers'
          ]
        },
        en: {
          youtubeId: 'XU0llRltyFM',
          title: 'Waterfall vs Agile: Which Methodology is Right for You?',
          channel: 'Edureka',
          duration: '19:48',
          language: 'en',
          summary: 'High-speed, visual comparison of predictive waterfall processes vs modern agile iterative development cadences.',
          keyPoints: [
            'Linear sequential lifecycle vs iterative cyclical sprints',
            'When to choose predictive vs adaptive project management styles',
            'Managing change requests and total cost of ownership (TCO)'
          ]
        }
      },
      keyPoints: [
        'Cascade (Waterfall) : progression linéaire sans retour en arrière (Exigences ➔ Conception ➔ Dév ➔ Tests ➔ Déploiement).',
        'Cycle en V : met en miroir la phase descendante (conception) et la phase ascendante (tests correspondants).',
        'Approche Agile : empirique, itérative et incrémentale. Le client voit le produit évoluer régulièrement.',
        'Agile ne veut pas dire "sans planification" : la planification est au contraire continue et réajustée à chaque Sprint.'
      ],
      traps: [
        'Ne dites jamais qu’Agile signifie "aucune documentation" ou "aucun planning" (piège classique d’examen).',
        'Le Cycle en V n’est pas Agile : c’est une méthode prédictive structurée.'
      ],
      examContext: 'EFM récurrent : comparer Cascade et Agile selon le traitement du changement de besoin client en cours de route.',
      miniQuestion: {
        question: 'Quelle est la principale force de l’approche Agile par rapport au modèle en cascade classique ?',
        options: [
        'La capacité à intégrer le changement grâce aux retours utilisateurs réguliers',
        'La rédaction de spécifications techniques exhaustives et figées',
        'L’absence totale de contraintes budgétaires ou temporelles',
        'La suppression complète du besoin d’effectuer des tests logiciels',
      ],
        correctIndex: 0,
        explanation: 'L’approche Agile privilégie la collaboration client et l’adaptation au changement grâce à des cycles courts avec démonstrations concrètes.'
      }
    }
  ],
  practicalCase: {
    title: 'Cas Pratique d’Examen : Modernisation du système d’inscription OFPPT',
    scenario: 'La direction de la formation souhaite créer un nouveau portail d’inscription en ligne pour 10 000 stagiaires. Le délai est fixé à 5 mois avant la rentrée de septembre. La Direction des Systèmes d’Information (DSI) pilote le projet avec un prestataire externe.',
    challenge: 'Identifie la MOA, la MOE, les contraintes du projet et justifie le choix entre une approche séquentielle classique et une approche Agile.',
    solutionPoints: [
      'MOA : La Direction de la Formation (porteuse du besoin pédagogique, valide les règles d’admissibilité et la recette finale).',
      'MOE : La DSI et le prestataire externe (chargés du développement, de la sécurité, de l’infrastructure et des bases de données).',
      'Contraintes : Délai impératif (5 mois avant la rentrée), budget alloué fixe, charge serveur (10 000 stagiaires simultanés).',
      'Recommandation méthodologique : Approche Agile hybride : un premier jalon MVP (candidature basique) livré au mois 3 pour recueillir les retours stagiaires, puis ajouts itératifs des fonctionnalités avancées.'
    ]
  },
  keyTakeaways: [
    'Un projet est temporaire, possède un objectif clair et crée un livrable unique.',
    'La MOA est le maître d’ouvrage (besoin métier/client), la MOE est le maître d’œuvre (réalisation technique).',
    'RACI : 1 seul Accountable (A) par ligne. R fait le travail, C est consulté, I est informé.',
    'Agile privilégie l’adaptation au changement et le feedback rapide ; Cascade privilégie la prévisibilité d’un plan initial figé.'
  ],
  commonTraps: [
    'Confondre MOA et MOE (l’erreur numéro 1 en examen).',
    'Croire qu’Agile permet de travailler sans organisation ni planning.',
    'Penser qu’une tâche opérationnelle de routine (sauvegarde, dépannage) est un projet.'
  ]
};
