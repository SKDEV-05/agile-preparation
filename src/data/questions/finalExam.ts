import { Question } from '../../types';

export const finalExamQuestions: Question[] = [
  // PARTIE 1 : FONDAMENTAUX (10 questions inédites : fe-01 à fe-10)
  {
    id: "fe-01",
    partId: "part1",
    difficulty: "scenario",
    tag: "Gouvernance",
    question: "Lors de la réunion de cadrage, le client demande d’ajouter une application tablette sans repousser la date de fin ni augmenter le budget. Selon le triangle QCD, que doit répondre le chef de projet ?",
    options: [
      "Qu’il est impératif de réduire le périmètre d’autres fonctionnalités pour compenser cette demande",
      "Qu’il accepte immédiatement sans aucune condition car le client a toujours raison en gestion de projet",
      "Que l’équipe travaillera les nuits et les fins de semaine sans modifier aucune contrainte de coût",
      "Que le langage de programmation doit être immédiatement remplacé par une version plus rapide"
    ],
    correctIndex: 0,
    explanation: "Selon le triangle QCD, si le délai et le budget sont figés, toute augmentation de périmètre exige un délestage proportionnel d’autres fonctions."
  },
  {
    id: "fe-02",
    partId: "part1",
    difficulty: "trap",
    tag: "Rôles projet",
    question: "Une divergence éclate entre l’architecte réseau et le directeur marketing sur la couleur et l’ordre des boutons de commande. Qui a le dernier mot ?",
    options: [
      "Le directeur marketing représentant la Maîtrise d’Ouvrage (MOA) car c’est une décision métier",
      "L’architecte réseau représentant la Maîtrise d’Œuvre (MOE) car il gère les serveurs physiques",
      "Le développeur stagiaire qui a codé la première ébauche du composant d’affichage graphique",
      "Le fournisseur d’accès Internet auprès duquel l’entreprise a souscrit son abonnement mensuel"
    ],
    correctIndex: 0,
    explanation: "La MOA est souveraine sur les choix fonctionnels, l’expérience utilisateur et les besoins métier du produit."
  },
  {
    id: "fe-03",
    partId: "part1",
    difficulty: "application",
    tag: "Matrice RACI",
    question: "Dans le cadre d’une refonte d’application, l’équipe doit rédiger le document de sécurité. Quelle affectation RACI est la plus rigoureuse ?",
    options: [
      "Expert sécurité = R, Responsable Sécurité des Systèmes (RSSI) = A, Développeur = C, Chef de projet = I",
      "Expert sécurité = A, RSSI = A, Développeur = A, Directeur général = A (tous responsables égaux)",
      "Expert sécurité = I, RSSI = I, Développeur = I, aucun membre désigné pour réaliser le travail",
      "Expert sécurité = C, Développeur = R sans aucun Accountable désigné dans toute l’organisation"
    ],
    correctIndex: 0,
    explanation: "Une tâche doit avoir un seul Accountable (A) qui valide et porte la responsabilité finale, un réalisateur (R), des consultés (C) et des informés (I)."
  },
  {
    id: "fe-04",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Gestion des risques",
    question: "Quelle est la différence fondamentale entre un « Risque » et un « Problème avéré » dans le pilotage de projet ?",
    options: [
      "Un risque est un événement incertain futur, tandis qu’un problème est un aléa déjà survenu",
      "Un risque ne concerne que les aspects financiers, alors qu’un problème est strictement technique",
      "Un risque est documenté par la MOA, alors qu’un problème est documenté uniquement par la MOE",
      "Il n’y a aucune différence, ce sont deux termes synonymes dans le référentiel officiel"
    ],
    correctIndex: 0,
    explanation: "Le risque est probabiliste et préventif (futur incertain), le problème est curatif (événement déjà réalisé nécessitant un plan d’action immédiat)."
  },
  {
    id: "fe-05",
    partId: "part1",
    difficulty: "situation",
    tag: "Choix méthodologique",
    question: "Le ministère des Transports commande la refonte du logiciel de signalisation ferroviaire avec des normes de sécurité drastiques et figées. Quelle approche privilégier ?",
    options: [
      "Un cycle de développement prédictif en V avec traçabilité intégrale des exigences et des tests",
      "Une approche purement exploratoire sans documentation préalable avec livraisons quotidiennes",
      "Une méthode totalement informelle sans planification où chaque ingénieur choisit son architecture",
      "L’abandon pur et simple de tout plan de test unitaire pour accélérer la mise en service des trains"
    ],
    correctIndex: 0,
    explanation: "Dans les systèmes critiques hautement réglementés aux exigences stables, le Cycle en V garantit la traçabilité rigoureuse entre chaque niveau de conception et son test."
  },
  {
    id: "fe-06",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Pilotage",
    question: "Dans le pilotage financier d’un projet, comment qualifie-t-on le budget alloué pour absorber les risques résiduels non prévisibles ?",
    options: [
      "La réserve de contingence (ou provision pour aléas)",
      "Le tarif forfaitaire mensuel des abonnements téléphoniques",
      "Le salaire brut de base attribué au Scrum Master junior",
      "Le bénéfice net commercial immédiatement redistribué aux actionnaires"
    ],
    correctIndex: 0,
    explanation: "La réserve de contingence (management reserve) est une marge budgétaire prévue pour couvrir les imprévus sans déstabiliser le projet."
  },
  {
    id: "fe-07",
    partId: "part1",
    difficulty: "trap",
    tag: "Parties prenantes",
    question: "Parmi les acteurs suivants d’un projet d’intranet d’entreprise, lequel est considéré comme un « utilisateur indirect » ?",
    options: [
      "Le client final externe consultant son relevé bancaire généré automatiquement par l’intranet",
      "Le gestionnaire administratif saisissant quotidiennement les fiches de paie sur l’écran",
      "Le développeur web écrivant les requêtes de consultation dans la base de données SQL",
      "L’administrateur système chargé de créer les comptes des utilisateurs sur l’annuaire LDAP"
    ],
    correctIndex: 0,
    explanation: "L’utilisateur indirect bénéficie des résultats du système ou subit son impact sans manipuler directement les interfaces de saisie."
  },
  {
    id: "fe-08",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Objectifs SMART",
    question: "Selon la méthode SMART, quelle formulation d’objectif de projet est parfaitement conforme aux bonnes pratiques ?",
    options: [
      "Augmenter de 25% les candidatures en ligne sur le portail d’ici le 30 juin prochain",
      "Rendre l’application web beaucoup plus jolie et moderne d’ici un certain temps",
      "Faire en sorte que tous les utilisateurs soient totalement heureux sans date précise",
      "Développer le maximum possible de fonctionnalités sans dépasser un million de dirhams"
    ],
    correctIndex: 0,
    explanation: "Un objectif SMART est Spécifique (+25%), Mesurable (taux de candidature), Atteignable, Réaliste et Temporellement défini (30 juin)."
  },
  {
    id: "fe-09",
    partId: "part1",
    difficulty: "comprehension",
    tag: "Cycle de vie",
    question: "Dans un projet traditionnel, à quelle étape formelle valide-t-on l’adéquation du produit avec les exigences du cahier des charges ?",
    options: [
      "La phase de Recette fonctionnelle (Recette Utilisateur / UAT)",
      "La phase d’initialisation et de signature du contrat commercial",
      "La première réunion de présentation de l’équipe de développement",
      "L’archivage définitif des serveurs informatiques lors de la fermeture"
    ],
    correctIndex: 0,
    explanation: "La recette fonctionnelle permet à la MOA de vérifier méthodiquement que chaque exigence contractualisée fonctionne comme attendu."
  },
  {
    id: "fe-10",
    partId: "part1",
    difficulty: "situation",
    tag: "Périmètre",
    question: "Une entreprise réalise que le budget alloué ne permettra de développer que 70% des fonctionnalités prévues. Quel arbitrage s’impose ?",
    options: [
      "Organiser un atelier de hiérarchisation avec la MOA pour prioriser le cœur indispensable (MoSCoW)",
      "Dissimuler le manque d’argent au client et arrêter brutalement le projet le dernier jour ouvré",
      "Développer l’intégralité des 100% des fonctions sans aucun test ni contrôle de sécurité",
      "Emprunter de l’argent auprès des développeurs pour combler le manque de financement"
    ],
    correctIndex: 0,
    explanation: "La priorisation (ex: méthode MoSCoW : Must have, Should have, Could have, Won't have) permet de livrer l’essentiel vital dans le budget restant."
  },

  // PARTIE 2 : PLANIFICATION · GANTT & PERT (10 questions inédites : fe-11 à fe-20)
  {
    id: "fe-11",
    partId: "part2",
    difficulty: "calculation",
    tag: "Calculs PERT",
    question: "Une activité K possède une Date de début au plus tôt ES = 6, une durée de 4 jours et une Date de début au plus tard LS = 9. Quelle est sa Marge Totale ?",
    options: [
      "3 jours de marge totale",
      "6 jours de marge totale",
      "4 jours de marge totale",
      "0 jour de marge totale"
    ],
    correctIndex: 0,
    explanation: "Marge Totale MT = LS - ES = 9 - 6 = 3 jours. L’activité peut être retardée de 3 jours sans impacter la date finale du projet."
  },
  {
    id: "fe-12",
    partId: "part2",
    difficulty: "trap",
    tag: "Chemin critique",
    question: "Dans un projet, le chemin critique initial a une durée de 18 jours. L’équipe parvient à raccourcir une tâche critique de 4 jours. Qu’advient-il de la durée du projet ?",
    options: [
      "Elle est réduite, mais plafonnée par la durée du second chemin le plus long du réseau",
      "Elle diminue automatiquement et obligatoirement d’exactement 8 jours au total",
      "Le projet est immédiatement annulé car un chemin critique ne peut jamais être modifié",
      "La durée totale du projet augmente de 4 jours pour compenser les heures économisées"
    ],
    correctIndex: 0,
    explanation: "Raccourcir un chemin critique permet de gagner du temps jusqu’à ce qu’un autre chemin parallèle devienne à son tour le nouveau chemin critique."
  },
  {
    id: "fe-13",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Marges PERT",
    question: "Quelle est la définition mathématique exacte de la « Marge Libre » d’une tâche par rapport à sa « Marge Totale » ?",
    options: [
      "Le retard possible sans retarder la date au plus tôt de démarrage des tâches suivantes",
      "Le retard maximal possible sans jamais dépasser le budget financier alloué par le client",
      "Le nombre d’heures de travail effectuées pendant les jours fériés par les stagiaires",
      "La durée totale de repos accordée aux développeurs entre deux cycles de développement"
    ],
    correctIndex: 0,
    explanation: "La marge libre est la marge sans impact sur le début au plus tôt des successeurs directs ; la marge totale est la marge sans impact sur la fin du projet."
  },
  {
    id: "fe-14",
    partId: "part2",
    difficulty: "application",
    tag: "Réseau PERT",
    question: "Dans le tracé d’un réseau PERT, pourquoi utilise-t-on parfois une « tâche fictive » (durée = 0) ?",
    options: [
      "Pour représenter une contrainte de dépendance logique entre deux étapes sans consommer de temps",
      "Pour ajouter secrètement une marge de sécurité financière sans en informer le client",
      "Pour indiquer qu’un développeur a démissionné de l’équipe de développement en cours de projet",
      "Pour remplacer une tâche trop complexe que personne dans l’équipe ne sait comment réaliser"
    ],
    correctIndex: 0,
    explanation: "Les liaisons ou tâches fictives (en pointillés) servent à modéliser des dépendances d’antériorité sans ajouter de durée au projet."
  },
  {
    id: "fe-15",
    partId: "part2",
    difficulty: "calculation",
    tag: "Calculs de dates",
    question: "Une tâche X démarre au plus tôt au jour 5 et dure 7 jours. Elle précède la tâche Y. Si Y n’a pas d’autre antécédent, quel est l’ES de Y ?",
    options: [
      "Jour 12",
      "Jour 5",
      "Jour 7",
      "Jour 35"
    ],
    correctIndex: 0,
    explanation: "Date de fin au plus tôt EF(X) = ES(X) + Durée = 5 + 7 = 12. Puisque Y dépend de X, Y commence au plus tôt au jour 12."
  },
  {
    id: "fe-16",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Dépendances",
    question: "Que signifie une liaison « Début-à-Début » (Start-to-Start) entre deux activités de développement ?",
    options: [
      "La tâche B ne peut pas commencer tant que la tâche A n’a pas elle-même commencé",
      "Les deux tâches doivent obligatoirement se terminer exactement à la même minute",
      "La première tâche doit être totalement achevée avant que la seconde ne soit planifiée",
      "Aucune des deux tâches ne possède de durée mesurable dans le calendrier prévisionnel"
    ],
    correctIndex: 0,
    explanation: "Une dépendance Début-à-Début (SS) indique que le démarrage de la première tâche conditionne l’autorisation de démarrage de la seconde."
  },
  {
    id: "fe-17",
    partId: "part2",
    difficulty: "application",
    tag: "Diagramme de Gantt",
    question: "Sur un diagramme de Gantt, comment représente-t-on traditionnellement un Jalon (Milestone) ?",
    options: [
      "Par un symbole en forme de losange positionné à une date spécifique sans largeur de barre",
      "Par un cercle rouge vif clignotant occupant l’ensemble de la hauteur de la page",
      "Par une barre horizontale bleue s’étirant sur au moins six mois de calendrier",
      "Par une zone de texte affichant les lignes de code source écrites par l’architecte"
    ],
    correctIndex: 0,
    explanation: "Le losange (diamond) est la convention universelle pour représenter un jalon sans durée propre dans un diagramme de Gantt."
  },
  {
    id: "fe-18",
    partId: "part2",
    difficulty: "trap",
    tag: "Planification",
    question: "Quelle conséquence immédiate engendre l’ajout de ressources humaines supplémentaires sur une tâche en retard selon la loi de Brooks ?",
    options: [
      "Cela peut aggraver temporairement le retard en raison du temps nécessaire pour former les arrivants",
      "Cela divise automatiquement par quatre le temps de réalisation sans aucun effet de bord",
      "Cela garantit que l’ensemble des anomalies logicielles sera résolu avant la fin de journée",
      "Cela annule automatiquement toutes les dépendances logiques entre les activités du projet"
    ],
    correctIndex: 0,
    explanation: "La loi de Brooks énonce qu'ajouter des personnes à un projet en retard commence par le retarder davantage (communication, montée en compétences)."
  },
  {
    id: "fe-19",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Découpage WBS",
    question: "Quelle règle des 100% régit la conception d’un organigramme des tâches (WBS) dans les règles de l’art ?",
    options: [
      "Le WBS doit englober 100% du travail défini par le périmètre du projet, ni plus ni moins",
      "Chaque développeur de l’équipe doit obligatoirement maîtriser 100% des langages du marché",
      "Le budget du projet doit être consommé à 100% dès la fin de la première semaine ouvrée",
      "La note minimale exigée à l’examen pour chaque stagiaire doit être égale à 100%"
    ],
    correctIndex: 0,
    explanation: "La règle des 100% stipule que le WBS englobe la totalité du périmètre du projet et que la somme des sous-tâches égale exactement la tâche parente."
  },
  {
    id: "fe-20",
    partId: "part2",
    difficulty: "scenario",
    tag: "Calculs PERT",
    question: "Sur un réseau, le chemin 1 (A-B-C) dure 14 jours et le chemin 2 (D-E-F) dure 14 jours également. Combien de chemins critiques le projet possède-t-il ?",
    options: [
      "Deux chemins critiques simultanés dont toutes les tâches ont une marge totale nulle",
      "Aucun chemin critique car les durées s’annulent mutuellement lors du calcul",
      "Un seul chemin critique choisi au hasard par le chef de projet lors de la réunion",
      "Six chemins critiques correspondant au nombre total de tâches présentes dans le graphe"
    ],
    correctIndex: 0,
    explanation: "Un projet peut posséder plusieurs chemins critiques de même durée maximale : un retard sur n’importe quelle tâche de ces deux chemins décale la fin du projet."
  },

  // PARTIE 3 : AGILE · SCRUM & JIRA (10 questions inédites : fe-21 à fe-30)
  {
    id: "fe-21",
    partId: "part3",
    difficulty: "situation",
    tag: "Scrum en pratique",
    question: "Lors d’un Sprint Planning, les Developers estiment qu’ils ne peuvent prendre que 5 des 7 stories présentées par le PO. Que fait-on ?",
    options: [
      "Les Developers sélectionnent les 5 stories prioritaires et les 2 autres restent dans le Product Backlog",
      "Le Product Owner oblige l’équipe à accepter les 7 stories en menaçant de réduire les rémunérations",
      "Le Scrum Master tranche arbitrairement en faveur du client et écrit le code des 2 stories restantes",
      "L’équipe dissout immédiatement le Sprint et annule la totalité du projet informatique en cours"
    ],
    correctIndex: 0,
    explanation: "Dans Scrum, seuls les Developers ont l’autorité d’estimer ce qu’ils sont capables d’accomplir au vu de leur capacité et de leur historique."
  },
  {
    id: "fe-22",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Manifeste Agile",
    question: "Quelle valeur du Manifeste Agile rappelle l’importance de livrer des fonctionnalités concrètes plutôt que des rapports théoriques ?",
    options: [
      "Un logiciel opérationnel de préférence à une documentation exhaustive",
      "Les processus et les outils de préférence aux individus et à leurs interactions",
      "La négociation contractuelle de préférence à la collaboration continue avec les clients",
      "Le suivi rigide d’un plan préétabli de préférence à l’adaptation au changement"
    ],
    correctIndex: 0,
    explanation: "La deuxième valeur du Manifeste affirme que la valeur réelle perçue par le client réside dans un logiciel qui fonctionne véritablement."
  },
  {
    id: "fe-23",
    partId: "part3",
    difficulty: "trap",
    tag: "Sprint",
    question: "Le travail d’un Sprint se termine avec 2 jours d’avance par rapport à la durée prévue. Quelle est la démarche Scrum orthodoxe ?",
    options: [
      "Consulter le Product Owner pour tirer un élément affiné du backlog ou améliorer la dette technique",
      "Déclarer le Sprint terminé et partir immédiatement en week-end prolongé sans prévenir l’équipe",
      "Changer la durée officielle de tous les Sprints suivants pour la réduire à trois jours fixes",
      "Ajouter dix fonctionnalités au hasard sans demander l’avis du Product Owner ni de l’équipe"
    ],
    correctIndex: 0,
    explanation: "Si le travail est terminé plus tôt, l’équipe échange avec le PO pour éventuellement embarquer un petit élément préparé ou rembourser de la dette technique."
  },
  {
    id: "fe-24",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Planning Poker",
    question: "Dans une séance de Planning Poker, pourquoi utilise-t-on les valeurs de la suite de Fibonacci (1, 2, 3, 5, 8, 13, 21) ?",
    options: [
      "Parce que plus une tâche est grande et complexe, plus l’incertitude sur son estimation augmente",
      "Parce que ces chiffres correspondent exactement au nombre d’heures de cours dispensées à l’OFPPT",
      "Pour empêcher mathématiquement les développeurs d’attribuer des notes négatives aux stories",
      "Parce que ce sont les seuls chiffres autorisés par la norme de programmation du framework web"
    ],
    correctIndex: 0,
    explanation: "L’écart croissant entre les nombres de Fibonacci reflète la hausse d’incertitude proportionnelle à la taille de la tâche à estimer."
  },
  {
    id: "fe-25",
    partId: "part3",
    difficulty: "comprehension",
    tag: "User Stories",
    question: "Dans les critères d’une bonne User Story selon l’acronyme INVEST, que signifie la lettre « T » ?",
    options: [
      "Testable (la story doit pouvoir être validée objectivement par des tests d’acceptation)",
      "Temporaire (la story doit disparaître de l’application après un mois d’exploitation)",
      "Technique (la story doit être rédigée exclusivement en langage SQL ou binaire)",
      "Transparente (la story doit être imprimée sur une feuille de papier calque transparent)"
    ],
    correctIndex: 0,
    explanation: "INVEST = Indépendante, Négociable, ayant de la Valeur, Estimable, Suffisamment petite (Small), et Testable."
  },
  {
    id: "fe-26",
    partId: "part3",
    difficulty: "application",
    tag: "Jira",
    question: "Une équipe Scrum souhaite limiter le multitâche pour que les développeurs terminent leurs sujets avant d’en ouvrir d’autres. Quelle fonction de board configure-t-on ?",
    options: [
      "Les limites de travail en cours (WIP Limits - Work In Progress) sur les colonnes du board",
      "Le verrouillage par mot de passe des ordinateurs portables des développeurs après 17 heures",
      "La suppression de la colonne 'En cours' pour n’autoriser que les colonnes 'À faire' et 'Terminé'",
      "L’obligation d’écrire les commits Git uniquement avec des lettres majuscules d’imprimerie"
    ],
    correctIndex: 0,
    explanation: "Les WIP Limits restreignent le nombre maximal de cartes pouvant séjourner en même temps dans une colonne, favorisant le flux continu (Stop starting, start finishing)."
  },
  {
    id: "fe-27",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Rôles Scrum",
    question: "Qui a le pouvoir légitime d’annuler prématurément un Sprint en cours si son objectif (Sprint Goal) devient totalement obsolète ?",
    options: [
      "Le Product Owner exclusivement",
      "Le développeur senior le plus âgé de l’équipe",
      "Le responsable de la sécurité informatique du réseau",
      "Le client externe lors d’un appel téléphonique direct"
    ],
    correctIndex: 0,
    explanation: "Seul le Product Owner possède l’autorité d’annuler un Sprint si l’objectif n’a plus aucun sens économique ou stratégique."
  },
  {
    id: "fe-28",
    partId: "part3",
    difficulty: "trap",
    tag: "Événements Scrum",
    question: "Un développeur refuse de parler au Daily Scrum en déclarant qu’il n’a de comptes à rendre à personne. Que doit faire le Scrum Master ?",
    options: [
      "Lui réexpliquer en aparté la finalité de synchronisation entre pairs et l’esprit d’entraide collective",
      "Le renvoyer sur-le-champ de l’établissement scolaire sans aucun avertissement préalable",
      "Prendre sa place et inventer des mensonges sur ce qu’il a développé au cours de la veille",
      "Supprimer définitivement la tenue du Daily Scrum pour l’ensemble des membres de l’équipe"
    ],
    correctIndex: 0,
    explanation: "Le rôle de coach du Scrum Master est de faire comprendre la valeur du partage d’information pour la réussite collective sans agressivité hiérarchique."
  },
  {
    id: "fe-29",
    partId: "part3",
    difficulty: "comprehension",
    tag: "Qualité Scrum",
    question: "Quelle est la différence fondamentale entre la Definition of Ready (DoR) et la Definition of Done (DoD) ?",
    options: [
      "La DoR conditionne l’entrée d’une story dans le Sprint ; la DoD conditionne la sortie et la validation de l’Incrément",
      "La DoR est rédigée en langage Java tandis que la DoD est impérativement programmée en langage Python",
      "La DoR s’applique uniquement aux directeurs financiers alors que la DoD s’applique aux stagiaires",
      "Il n’y a aucune différence, ce sont deux abréviations désignant exactement le même document"
    ],
    correctIndex: 0,
    explanation: "Une story doit être 'Ready' (estimée, comprise, testable) pour être embarquée au Sprint Planning ; l’Incrément doit être 'Done' (testé, conforme) pour être livré."
  },
  {
    id: "fe-30",
    partId: "part3",
    difficulty: "situation",
    tag: "Estimation",
    question: "Lors du Planning Poker, 3 développeurs posent une carte 3 et 1 développeur pose une carte 13. Quelle est la démarche immédiate ?",
    options: [
      "Donner la parole aux estimations extrêmes (le 3 et le 13) pour comprendre les incompréhensions puis revoter",
      "Faire la moyenne arithmétique mathématique sans chercher à comprendre l’écart de vision",
      "Imposer d’office la valeur la plus basse pour forcer l’équipe à aller le plus vite possible",
      "Exclure immédiatement le développeur ayant voté 13 de toutes les futures réunions de l’équipe"
    ],
    correctIndex: 0,
    explanation: "Le Planning Poker sert à faire émerger les hypothèses cachées : le développeur ayant voté 13 a peut-être identifié un risque de sécurité majeur que les autres ignoraient."
  },

  // PARTIE 4 : GIT · GITLAB & SONARQUBE (10 questions inédites : fe-31 à fe-40)
  {
    id: "fe-31",
    partId: "part4",
    difficulty: "comprehension",
    tag: "Architecture Git",
    question: "Dans le fonctionnement interne de Git, qu’est-ce que le pointeur « HEAD » ?",
    options: [
      "Une référence désignant le commit ou la branche actuellement extrait dans le répertoire de travail",
      "Le premier fichier texte créé lors de l’initialisation de la machine virtuelle Linux",
      "L’identifiant unique de la carte réseau installée sur le serveur principal de données",
      "Le titre principal qui apparaît tout en haut de la page d’accueil du site web"
    ],
    correctIndex: 0,
    explanation: "HEAD pointe vers le commit courant (souvent le sommet de la branche active) sur lequel vous êtes en train de travailler."
  },
  {
    id: "fe-32",
    partId: "part4",
    difficulty: "application",
    tag: "Commandes Git",
    question: "Quelle commande Git permet d’annuler les modifications non indexées d’un fichier pour le restaurer à l’état du dernier commit ?",
    options: [
      "git restore nom_du_fichier",
      "git delete --force nom_du_fichier",
      "git status --clean nom_du_fichier",
      "git push origin --rollback nom_du_fichier"
    ],
    correctIndex: 0,
    explanation: "Dans les versions actuelles de Git, `git restore <fichier>` remet le fichier du working directory à l’état du dernier commit."
  },
  {
    id: "fe-33",
    partId: "part4",
    difficulty: "trap",
    tag: "Commandes Git",
    question: "Que se passe-t-il si un développeur exécute « git checkout nom_branche » alors qu’il a des modifications non commitées en conflit avec la branche cible ?",
    options: [
      "Git refuse de basculer et prévient l’utilisateur pour éviter d’écraser ses modifications non sauvegardées",
      "Git supprime définitivement l’ensemble des fichiers modifiés sans afficher le moindre message",
      "Git formate le disque dur de l’ordinateur pour restaurer les paramètres d’usine par défaut",
      "Git crée automatiquement un nouveau compte administrateur sur la plateforme cloud GitLab"
    ],
    correctIndex: 0,
    explanation: "Git protège vos données locales : si des modifications non commitées risquent d’être écrasées par le basculement, l’opération est avortée."
  },
  {
    id: "fe-34",
    partId: "part4",
    difficulty: "comprehension",
    tag: "Conflits Git",
    question: "Dans un fichier en conflit de fusion Git, que sépare la ligne centrale composée de sept signes d’égalité « ======= » ?",
    options: [
      "La version de la branche courante (en haut) et la version de la branche entrante (en bas)",
      "La date de création du document texte et le numéro de téléphone de l’auteur principal",
      "Le code écrit en langage JavaScript et le code écrit en langage de programmation PHP",
      "Les commentaires informatifs et les instructions exécutables par le microprocesseur"
    ],
    correctIndex: 0,
    explanation: "Les marqueurs Git délimitent les deux versions concurrentes : entre `<<<<<<< HEAD` et `=======` se trouve la version locale ; entre `=======` et `>>>>>>>` la version fusionnée."
  },
  {
    id: "fe-35",
    partId: "part4",
    difficulty: "application",
    tag: "Commandes Git",
    question: "Quelle commande permet de consulter la liste chronologique compacte des derniers commits avec leur identifiant SHA-1 abrégé ?",
    options: [
      "git log --oneline",
      "git status --history",
      "git branch --commits",
      "git diff --summary"
    ],
    correctIndex: 0,
    explanation: "`git log --oneline` présente un historique condensé affichant un commit par ligne avec son hash court et son message."
  },
  {
    id: "fe-36",
    partId: "part4",
    difficulty: "comprehension",
    tag: "SonarQube",
    question: "Dans SonarQube, quelle est la définition précise de la « Dette Technique » (Technical Debt) ?",
    options: [
      "L’effort estimé en temps ou en coût nécessaire pour corriger l’ensemble des code smells et défauts du code",
      "Le montant des factures d’électricité impayées par le centre d’hébergement des serveurs",
      "Le coût financier d’achat des ordinateurs portables alloués aux membres de l’équipe",
      "La somme d’argent prêtée par les banques partenaires pour financer le capital social"
    ],
    correctIndex: 0,
    explanation: "La dette technique représente le coût différé futur engendré par le choix d’une solution technique rapide et imparfaite au lieu d’une conception propre."
  },
  {
    id: "fe-37",
    partId: "part4",
    difficulty: "comprehension",
    tag: "SonarQube",
    question: "Quelle note de maintenabilité (SQALE rating) SonarQube attribue-t-il au code dont le ratio de dette technique est inférieur à 5% ?",
    options: [
      "La note A (excellence en maintenabilité)",
      "La note E (dette technique critique)",
      "La mention Recalé avec interdiction de coder",
      "Le statut d’urgence bloquant avec arrêt serveur"
    ],
    correctIndex: 0,
    explanation: "L’échelle de maintenabilité SonarQube va de A (meilleure note, dette < 5%) à E (dette très élevée > 50%)."
  },
  {
    id: "fe-38",
    partId: "part4",
    difficulty: "comprehension",
    tag: "GitLab",
    question: "Dans GitLab, quelle fonctionnalité permet aux pairs de relire, commenter et valider une branche avant son intégration dans `main` ?",
    options: [
      "La Merge Request (demande de fusion avec revue de code)",
      "Le terminal en ligne de commande locale exécuté sous Windows",
      "La boîte de dialogue d’impression de documents au format papier",
      "Le câble réseau reliant les ordinateurs au commutateur de salle"
    ],
    correctIndex: 0,
    explanation: "La Merge Request (équivalent de la Pull Request sur GitHub) est le lieu d’échange central pour relire le code, vérifier les tests et approuver la fusion."
  },
  {
    id: "fe-39",
    partId: "part4",
    difficulty: "situation",
    tag: "Sécurité du code",
    question: "Un stagiaire pousse par inadvertance un mot de passe d’accès à la base de données de production dans un commit Git. Quelle est la première action ?",
    options: [
      "Révoquer et renouveler immédiatement le mot de passe sur la base de données et nettoyer l’historique Git",
      "Éteindre l’écran de l’ordinateur et espérer que personne ne remarque le fichier dans le dépôt",
      "Ajouter une ligne de commentaire disant de ne pas utiliser ce mot de passe dans le code",
      "Créer un ticket Jira avec la priorité la plus basse pour s’en occuper dans six mois"
    ],
    correctIndex: 0,
    explanation: "Un secret divulgué dans un historique Git doit être considéré comme immédiatement compromis : il faut révoquer le secret sur le serveur sans attendre."
  },
  {
    id: "fe-40",
    partId: "part4",
    difficulty: "comprehension",
    tag: "Git",
    question: "À quoi sert le fichier spécial nommé « .gitignore » placé à la racine d’un projet Git ?",
    options: [
      "Indiquer à Git les fichiers ou dossiers qu’il doit délibérément ignorer et ne jamais versionner",
      "Supprimer automatiquement les virus informatiques présents sur les clés USB branchées",
      "Bloquer la connexion des stagiaires qui ne connaissent pas le mot de passe du réseau",
      "Obliger l’ensemble des développeurs à utiliser le même éditeur de texte sous Windows"
    ],
    correctIndex: 0,
    explanation: "Le `.gitignore` liste les motifs de fichiers (ex: `node_modules/`, `.env`, build artifacts) que Git ne doit jamais ajouter au suivi de versions."
  },

  // PARTIE 5 : DEVOPS · CI/CD · GITLAB CI (10 questions inédites : fe-41 à fe-50)
  {
    id: "fe-41",
    partId: "part5",
    difficulty: "comprehension",
    tag: "DevOps",
    question: "Quel problème historique majeur désigné par l’expression « le mur de la confusion » DevOps cherche-t-il à éliminer ?",
    options: [
      "L’opposition entre les développeurs désireux de livrer du changement et les exploitants garants de la stabilité",
      "La difficulté pour les étudiants de retenir les raccourcis clavier dans les traitements de texte",
      "L’impossibilité matérielle de connecter plus de deux écrans d’ordinateur sur une même carte graphique",
      "Le temps d’attente obligatoire imposé par la douane pour importer des serveurs informatiques"
    ],
    correctIndex: 0,
    explanation: "DevOps réconcilie l’objectif de mise à disposition rapide de nouvelles fonctions (Dev) avec l’impératif de stabilité et de haute disponibilité (Ops)."
  },
  {
    id: "fe-42",
    partId: "part5",
    difficulty: "comprehension",
    tag: "GitLab CI",
    question: "Dans GitLab CI, à quoi sert la directive « artifacts » déclarée à l’intérieur d’un job ?",
    options: [
      "Conserver des fichiers générés par le job pour qu’ils soient réutilisés par les stages suivants ou téléchargés",
      "Supprimer définitivement les images graphiques de l’application pour alléger l’espace disque",
      "Chiffrer le code source avec une clé secrète connue uniquement du directeur pédagogique",
      "Remplacer les tests unitaires par une attestation sur l’honneur rédigée par le développeur"
    ],
    correctIndex: 0,
    explanation: "Les artifacts sauvegardent les résultats de compilation (ex: dossier `dist/`) pour permettre aux jobs des étapes suivantes (comme le déploiement) d’y accéder."
  },
  {
    id: "fe-43",
    partId: "part5",
    difficulty: "application",
    tag: "GitLab CI",
    question: "Comment déclare-t-on qu’un job ne doit s’exécuter que lors d’un push sur la branche principale `main` dans `.gitlab-ci.yml` ?",
    options: [
      "En utilisant la directive `rules:` ou `only: - main`",
      "En écrivant le mot-clé `mandatory: true` sur chaque ligne",
      "En renommant le fichier en `gitlab-main-only.xml`",
      "En éteignant tous les runners secondaires du réseau"
    ],
    correctIndex: 0,
    explanation: "Les sections `rules:` (ou historiquement `only:`) conditionnent le déclenchement d’un job à des branches précises comme `main`."
  },
  {
    id: "fe-44",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Variables CI/CD",
    question: "Pourquoi est-il crucial de stocker les jetons d’API secrets dans les « CI/CD Variables » protégées de GitLab plutôt que dans le code ?",
    options: [
      "Pour éviter que des identifiants sensibles ne soient exposés en clair dans l’historique des commits du dépôt",
      "Pour accélérer la vitesse de frappe au clavier des développeurs pendant la rédaction du code",
      "Pour réduire le nombre de mégaoctets consommés lors du téléchargement des pages du site",
      "Parce que le compilateur refuse catégoriquement d’exécuter du code contenant des mots secrets"
    ],
    correctIndex: 0,
    explanation: "Les secrets ne doivent jamais résider dans le dépôt Git : GitLab CI Variables permet de les injecter de façon masquée à l’exécution du job."
  },
  {
    id: "fe-45",
    partId: "part5",
    difficulty: "trap",
    tag: "GitLab CI",
    question: "Dans un stage contenant trois jobs indépendants (job_test_1, job_test_2, job_test_3), comment s’exécutent-ils si des runners sont disponibles ?",
    options: [
      "Ils peuvent s’exécuter en parallèle de manière concurrente pour réduire le temps total du stage",
      "Ils s’exécutent impérativement l’un après l’autre avec un temps d’attente d’au moins une heure",
      "GitLab supprime automatiquement deux des trois jobs pour préserver les ressources du serveur",
      "Le premier job qui termine annule immédiatement l’exécution des deux autres jobs du stage"
    ],
    correctIndex: 0,
    explanation: "Au sein d’un même stage, tous les jobs sont exécutables en parallèle par les différents runners disponibles afin d’accélérer la boucle de retour."
  },
  {
    id: "fe-46",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Conteneurisation",
    question: "Quel est l’avantage fondamental d’utiliser des conteneurs Docker pour exécuter les jobs des GitLab Runners ?",
    options: [
      "Garantir un environnement d’exécution propre, reproductible et identique quelle que soit la machine hôte",
      "Remplacer les développeurs par des scripts automatisés d’intelligence artificielle autonome",
      "Permettre aux utilisateurs de naviguer sur Internet sans avoir besoin d’écran d’ordinateur",
      "Supprimer totalement les fichiers du projet dès que la compilation s’achève avec succès"
    ],
    correctIndex: 0,
    explanation: "Docker fournit des environnements jetables et hermétiques (images officielles Node, Python, etc.) évitant les problèmes de dépendances sur la machine."
  },
  {
    id: "fe-47",
    partId: "part5",
    difficulty: "situation",
    tag: "Stratégie de déploiement",
    question: "Une équipe souhaite déployer une nouvelle version en redirigeant d’abord 5% du trafic des utilisateurs pour vérifier l’absence d’anomalie. Comment s’appelle cette technique ?",
    options: [
      "Le déploiement canari (Canary Release)",
      "Le déploiement cascade avec arrêt complet",
      "La méthode de calcul critique de PERT",
      "La livraison forfaitaire sans filet"
    ],
    correctIndex: 0,
    explanation: "Le 'Canary Deployment' consiste à tester la nouvelle version sur un échantillon restreint d’utilisateurs réels avant la généralisation."
  },
  {
    id: "fe-48",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Modèle CALMS",
    question: "Quelle action concrète d’une équipe illustre parfaitement le principe de « Sharing » du modèle CALMS ?",
    options: [
      "Organiser un 'post-mortem sans blâme' après une panne pour partager collectivement les enseignements tirés",
      "Verrouiller l’ensemble des accès aux serveurs pour qu’une seule personne puisse intervenir",
      "Refuser de rédiger la moindre documentation pour protéger son propre poste de travail",
      "Facturer des pénalités financières aux collègues qui commettent une erreur d’inattention"
    ],
    correctIndex: 0,
    explanation: "Le partage (Sharing) valorise la transparence et les analyses d’incidents constructives (blameless post-mortems) pour progresser ensemble."
  },
  {
    id: "fe-49",
    partId: "part5",
    difficulty: "application",
    tag: "GitLab CI",
    question: "Que permet la directive `image: node:20` placée en tête d’un fichier `.gitlab-ci.yml` ?",
    options: [
      "Indiquer au Runner d’exécuter les jobs à l’intérieur d’un conteneur officiel Node.js version 20",
      "Afficher une image photographique de l’équipe de développement sur le tableau de bord",
      "Télécharger un fond d’écran d’ordinateur personnalisé pour l’ensemble des postes de travail",
      "Changer la couleur du logo officiel de la plateforme GitLab sur le navigateur internet"
    ],
    correctIndex: 0,
    explanation: "La directive `image:` spécifie l’image de conteneur Docker utilisée par défaut pour fournir les outils requis (ici l’environnement Node 20)."
  },
  {
    id: "fe-50",
    partId: "part5",
    difficulty: "situation",
    tag: "DevOps & EFM",
    question: "Un pipeline échoue au stage « quality » avec l’indication `Quality Gate Failed (Coverage 68% < 80%)`. Quelle est l’action requise ?",
    options: [
      "Écrire des tests automatisés supplémentaires pour couvrir les branches de code manquantes avant de re-pousser",
      "Modifier les seuils de sécurité de l’entreprise pour accepter n’importe quel code sans contrôle",
      "Supprimer définitivement l’étape de test unitaire du fichier .gitlab-ci.yml pour que tout soit vert",
      "Déployer le code manuellement sur les serveurs de production en ignorant délibérément l’alerte"
    ],
    correctIndex: 0,
    explanation: "La Quality Gate est un garde-fou : pour la franchir, il faut enrichir la suite de tests afin de dépasser les 80% d’exigences de couverture requises."
  }
];
