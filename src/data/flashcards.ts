import { Flashcard } from '../types';

export const FLASHCARDS: Flashcard[] = [
  // PARTIE 1
  {
    id: 'fc-01',
    partId: 'part1',
    category: 'Fondamentaux',
    front: 'Qu’est-ce qui caractérise principalement un projet informatique ?',
    back: 'Une entreprise temporaire visant un résultat unique, délimitée par un début, une fin, des objectifs et des ressources précises (Qualité, Coût, Délai).',
    keyPoints: [
      'Temporaire (début et fin fixés)',
      'Livrable unique et non récurrent',
      'Triangle QCD (Périmètre, Coût, Délai)'
    ]
  },
  {
    id: 'fc-02',
    partId: 'part1',
    category: 'Gouvernance',
    front: 'Quelle est la différence fondamentale entre MOA et MOE ?',
    back: 'La MOA (Maître d’Ouvrage) exprime le besoin métier et valide la recette. La MOE (Maître d’Œuvre) conçoit techniquement la solution et assure sa réalisation.',
    keyPoints: [
      'MOA = Métier / Client (Le "QUOI")',
      'MOE = Technique / Réalisation (Le "COMMENT")',
      'Recette finale validée par la MOA'
    ]
  },
  {
    id: 'fc-03',
    partId: 'part1',
    category: 'Matrice RACI',
    front: 'Que signifient les 4 lettres de la matrice RACI ?',
    back: 'Responsible (Réalise), Accountable (Responsable final / Décideur unique), Consulted (Expert consulté pour avis), Informed (Tenu informé de l’avancement).',
    keyPoints: [
      'R = Réalisateur opérationnel',
      'A = 1 SEUL décideur final par activité',
      'C = Avis avant/pendant',
      'I = Information après réalisation'
    ]
  },
  {
    id: 'fc-04',
    partId: 'part1',
    category: 'Méthodes',
    front: 'Pourquoi le Cycle en V est-il qualifié de méthode prédictive ?',
    back: 'Car il planifie séquentiellement les étapes à l’amont et met en miroir chaque phase de conception descendante avec une phase de test ascendante correspondante.',
    keyPoints: [
      'Spécifications ↔ Recette fonctionnelle',
      'Conception générale ↔ Tests d’intégration',
      'Conception détaillée ↔ Tests unitaires'
    ]
  },

  // PARTIE 2
  {
    id: 'fc-05',
    partId: 'part2',
    category: 'Planification',
    front: 'Qu’est-ce qu’un jalon (milestone) sur un planning ?',
    back: 'Un événement clé ou point de contrôle marquant la validation d’une étape importante du projet. Sa durée est obligatoirement égale à 0 jour.',
    keyPoints: [
      'Durée = 0 jour',
      'Représenté par un losange sur le Gantt',
      'Conditionne souvent le démarrage de phases majeures'
    ]
  },
  {
    id: 'fc-06',
    partId: 'part2',
    category: 'PERT',
    front: 'Comment définit-on et calcule-t-on le chemin critique d’un réseau PERT ?',
    back: 'C’est la suite ordonnée d’activités consécutives dont la marge totale est nulle (MT = 0). C’est le chemin le plus long en durée qui détermine la durée minimale du projet.',
    keyPoints: [
      'Marge totale nulle (MT = 0)',
      'Chemin le plus long en durée',
      'Tout retard d’un jour sur ce chemin décale la fin du projet d’un jour'
    ]
  },
  {
    id: 'fc-07',
    partId: 'part2',
    category: 'PERT',
    front: 'Quelle formule donne la Marge Totale d’une tâche ?',
    back: 'Marge Totale (MT) = LS − ES (Date au plus tard de début − Date au plus tôt de début) ou LF − EF.',
    keyPoints: [
      'MT = LS − ES = LF − EF',
      'Représente le retard toléré sans retarder le projet',
      'Si MT = 0, la tâche est critique'
    ]
  },
  {
    id: 'fc-08',
    partId: 'part2',
    category: 'Gantt',
    front: 'Quel est l’atout principal du diagramme de Gantt ?',
    back: 'Il visualise immédiatement le calendrier chronologique des tâches, leurs durées relatives, les parallélismes et les chevauchements temporels.',
    keyPoints: [
      'Axe horizontal = Calendrier (temps)',
      'Axe vertical = Activités / WBS',
      'Lecture immédiate des charges et des simultanéités'
    ]
  },

  // PARTIE 3
  {
    id: 'fc-09',
    partId: 'part3',
    category: 'Scrum',
    front: 'Quels sont les 3 rôles officiels d’une équipe Scrum ?',
    back: 'Le Product Owner (valeur et backlog), le Scrum Master (coach méthodologique et facilitateur), et les Developers (réalisation technique de l’Incrément).',
    keyPoints: [
      'Product Owner = Le "QUOI" et la valeur',
      'Scrum Master = Le cadre et l’efficacité',
      'Developers = Le "COMMENT" et l’incrément de qualité'
    ]
  },
  {
    id: 'fc-10',
    partId: 'part3',
    category: 'Scrum',
    front: 'Quelle est la différence entre Sprint Review et Sprint Retrospective ?',
    back: 'La Review inspecte le produit fini avec les parties prenantes. La Rétrospective inspecte le fonctionnement interne de l’équipe et ses processus pour s’améliorer.',
    keyPoints: [
      'Review = focus PRODUIT + Démo client',
      'Retrospective = focus PROCESSUS + Amélioration interne',
      'Deux événements distincts en fin de Sprint'
    ]
  },
  {
    id: 'fc-11',
    partId: 'part3',
    category: 'User Story',
    front: 'Quelle est la structure standard d’une User Story ?',
    back: '« En tant que [Rôle/Utilisateur], je veux [Besoin/Fonctionnalité], afin de [Bénéfice métier/Valeur ajoutée] ».',
    keyPoints: [
      'Centrée sur l’utilisateur et la valeur',
      'Accompagnée de critères d’acceptation vérifiables',
      'Estimée en Story Points de façon relative'
    ]
  },
  {
    id: 'fc-12',
    partId: 'part3',
    category: 'Jira',
    front: 'Comment s’organise un Board Scrum typique dans Jira ?',
    back: 'En colonnes d’avancement (À faire ➔ En cours ➔ Revue / Test ➔ Terminé) où les tickets (Epics, Stories, Bugs, Tasks) sont déplacés en temps réel.',
    keyPoints: [
      'Flux visuel transparent',
      'Types de tickets : Epic, Story, Task, Bug',
      'Suivi des Story Points et de la vélocité'
    ]
  },

  // PARTIE 4
  {
    id: 'fc-13',
    partId: 'part4',
    category: 'Git',
    front: 'Quelles sont les 4 zones traversées par le code dans Git ?',
    back: '1. Working Directory (dossier de travail local) ➔ 2. Staging Area (index de préparation) ➔ 3. Local Repository (historique local) ➔ 4. Remote Repository (serveur distant).',
    keyPoints: [
      'git add : Working ➔ Staging',
      'git commit : Staging ➔ Local Repo',
      'git push : Local Repo ➔ Remote Repo'
    ]
  },
  {
    id: 'fc-14',
    partId: 'part4',
    category: 'Git',
    front: 'Comment résout-on un conflit de merge dans Git ?',
    back: '1. Ouvrir les fichiers en conflit. 2. Supprimer les balises (<<<<, ====, >>>>) et choisir le bon code. 3. Indexer avec `git add`. 4. Créer le commit de fusion.',
    keyPoints: [
      'Conflit = modifications concurrentes incompatibles',
      'Arbitrage manuel nécessaire',
      'git add marque le conflit comme résolu'
    ]
  },
  {
    id: "fc-15",
    partId: "part4",
    category: "SonarQube",
    front: "Qu’est-ce qu’une Quality Gate dans SonarQube ?",
    back: "Un ensemble de critères seuils obligatoires (ex: 0 vulnérabilité critique, couverture > 80%, dette faible) qu’un projet doit valider pour être autorisé à être livré.",
    keyPoints: [
      "Barrière qualité automatisée",
      "Statut Pass ou Fail dans le pipeline",
      "Garantit la non-dégradation du code"
    ]
  },

  // PARTIE 5
  {
    id: 'fc-16',
    partId: 'part5',
    category: 'DevOps',
    front: 'Que signifie l’acronyme CALMS en DevOps ?',
    back: 'Culture (collaboration et confiance), Automation (outillage automatisé), Lean (réduction des gaspillages), Measurement (mesure des métriques), Sharing (partage des savoirs).',
    keyPoints: [
      'C = Culture',
      'A = Automation',
      'L = Lean',
      'M = Measurement',
      'S = Sharing'
    ]
  },
  {
    id: 'fc-17',
    partId: 'part5',
    category: 'CI/CD',
    front: 'Quelle est la nuance entre Continuous Delivery et Continuous Deployment ?',
    back: 'Continuous Delivery garde le code prêt pour la production avec une décision/validation manuelle finale. Continuous Deployment automatise jusqu’à la mise en production directe.',
    keyPoints: [
      'Delivery = prêt pour la prod (clic manuel)',
      'Deployment = 100% automatisé jusqu’en prod',
      'Les deux reposent sur une CI robuste'
    ]
  },
  {
    id: 'fc-18',
    partId: 'part5',
    category: 'GitLab CI',
    front: 'Quelle est la hiérarchie d’un pipeline GitLab CI ?',
    back: 'Le Pipeline orchestre des Stages (étapes séquentielles : build, test, deploy), qui contiennent des Jobs (tâches unitaires), exécutés par des GitLab Runners.',
    keyPoints: [
      'Configuré dans `.gitlab-ci.yml` à la racine',
      'Stages ordonnés séquentiellement',
      'Jobs exécutables en parallèle dans un stage',
      'Exécution concrète par les Runners'
    ]
  }
];
