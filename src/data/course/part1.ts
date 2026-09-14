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
      examples: [
        'Développement d’une nouvelle application mobile bancaire pour les clients d’Attijariwafa Bank (Projet : création d’une nouveauté avec un budget et une date limite).',
        'Répondre aux tickets d’incidents réseau au quotidien (Opération récurrente / Maintenance : pas de date de fin globale).'
      ],
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
          'La refonte complète du portail web stagiaires livrée dans 6 mois',
          'La gestion quotidienne des demandes d’assistance bureautique',
          'La maintenance corrective habituelle des serveurs de messagerie',
          'La sauvegarde automatique programmée chaque vendredi soir'
        ],
        correctIndex: 0,
        explanation: 'La refonte du portail a un objectif précis, un résultat unique et une fin programmée dans 6 mois, contrairement aux tâches de maintenance récurrentes.'
      }
    },
    {
      id: 'p1-s2',
      order: '02',
      title: 'Parties prenantes, MOA, MOE et Chef de projet',
      definition: 'Une partie prenante (stakeholder) est tout individu ou groupe pouvant affecter un projet ou être affecté par son résultat. La MOA exprime le besoin métier, la MOE réalise la solution technique, et le Chef de projet coordonne l’ensemble.',
      explanation: 'Pensez à la construction d’une maison : le propriétaire qui habite la maison et définit le nombre de pièces est la MOA (Maîtrise d’Ouvrage). L’architecte et les maçons qui choisissent le béton et bâtissent les murs représentent la MOE (Maîtrise d’Œuvre). Le Chef de projet s’assure que le chantier avance dans les temps et selon le devis.',
      examples: [
        'Direction Financière d’une entreprise (MOA) : commande un outil de gestion des factures et valide qu’il répond aux normes comptables.',
        'Équipe de développement logiciel interne ou ESN (MOE) : conçoit la base de données PostgreSQL, développe l’API REST et déploie les conteneurs.',
        'Utilisateurs finaux, régulateur bancaire, fournisseurs d’API : parties prenantes clés devant être consultées ou informées.'
      ],
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
          'La Maîtrise d’Ouvrage (MOA)',
          'La Maîtrise d’Œuvre (MOE)',
          'Le développeur backend',
          'L’administrateur système'
        ],
        correctIndex: 0,
        explanation: 'La MOA représente le commanditaire métier : c’est elle qui formule le besoin et valide la recette fonctionnelle des livrables.'
      }
    },
    {
      id: 'p1-s3',
      order: '03',
      title: 'Contraintes du triangle QCD, Risques et Matrice RACI',
      definition: 'Le pilotage repose sur l’équilibre du triangle QCD (Qualité, Coût, Délai). La gestion des risques anticipe les aléas. La matrice RACI clarifie qui Réalise (R), qui est Responsable final (A), qui est Consulté (C) et qui est Informé (I).',
      explanation: 'Si le client demande d’ajouter 10 nouvelles fonctionnalités (périmètre/qualité) sans augmenter le budget (coût), alors le délai doit obligatoirement être repoussé. C’est la règle d’or de l’arbitrage de projet. De plus, pour chaque tâche, une seule personne doit être comptable du résultat final (Accountable dans RACI) afin d’éviter que personne ne prenne la décision.',
      examples: [
        'Matrice RACI pour la validation de la maquette UI : UI Designer = R (Réalise) ; Chef de projet = A (Approuve/Accountable) ; Développeur = C (Consulté pour faisabilité) ; Client = I (Informé de l’avancement).',
        'Risque identifié : retard de livraison du serveur cloud par le fournisseur. Action préventive : souscrire une option haute disponibilité temporaire.'
      ],
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
          'Une confusion et une dilution de la responsabilité décisionnelle',
          'Une augmentation automatique de la vélocité des développeurs',
          'Une suppression des tests de sécurité nécessaires',
          'Un passage obligatoire et immédiat à la méthode Scrum'
        ],
        correctIndex: 0,
        explanation: 'Dans la méthode RACI, il doit y avoir strictement un seul Accountable par activité pour garantir qu’une décision claire soit prise sans conflit de pouvoir.'
      }
    },
    {
      id: 'p1-s4',
      order: '04',
      title: 'Méthodes Prédictives (Cascade, Cycle en V) vs Approche Agile',
      definition: 'Les méthodes prédictives (Cascade, Cycle en V) planifient l’intégralité du travail de façon séquentielle dès le départ. Les méthodes adaptatives (Agile) avancent par courtes itérations avec feedback continu pour intégrer le changement.',
      explanation: 'Le Cycle en V relie chaque phase de conception à une phase de test correspondante (Spécifications ➔ Tests de Recette, Conception générale ➔ Tests d’Intégration, Conception détaillée ➔ Tests Unitaires). Cependant, si le client change d’avis 6 mois après, modifier le code coûte très cher. L’Agile résout ce problème en livrant une version testée et fonctionnelle toutes les 2 à 4 semaines.',
      examples: [
        'Logiciel médical pour scanner IRM ou pilotage ferroviaire : cycle en V privilégié car les exigences sont très strictes, stables et soumises à de lourdes certifications réglementaires.',
        'Plateforme e-commerce ou application mobile de livraison : approche Agile privilégiée car les préférences des utilisateurs évoluent rapidement et nécessitent des adaptations constantes.'
      ],
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
          'La suppression complète du besoin d’effectuer des tests logiciels',
          'L’absence totale de contraintes budgétaires ou temporelles',
          'La rédaction de spécifications techniques exhaustives et figées'
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
