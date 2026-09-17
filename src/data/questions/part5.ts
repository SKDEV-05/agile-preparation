import { Question } from '../../types';

export const questionsPart5: Question[] = [
  {
    id: "p5-01",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Culture DevOps",
    question: "Quelle est la vocation première du mouvement culturel et technique DevOps ?",
    options: [
      "Remplacer l’ensemble des langages de programmation par un seul outil de dessin technique",
      "Séparer hermétiquement les équipes techniques pour éviter qu’elles ne communiquent entre elles",
      "Rapprocher les développeurs et les équipes d’exploitation pour accélérer la livraison fiable de valeur",
      "Supprimer totalement les serveurs informatiques au profit d’échanges de fichiers manuels",
    ],
    correctIndex: 2,
    explanation: "DevOps vise à casser le silo historique entre le développement (Dev) et l’exploitation système (Ops) par une collaboration et une automatisation continues."
  },
  {
    id: "p5-02",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Modèle CALMS",
    question: "Dans le modèle d’évaluation et de maturité CALMS, que représente la lettre « C » ?",
    options: [
      "Customer (la délégation de la totalité des choix architecturaux au client final)",
      "Code (l’obligation d’écrire l’ensemble des programmes informatiques dans un fichier unique)",
      "Control (la surveillance hiérarchique policière des heures d’arrivée des stagiaires)",
      "Culture (l’état d’esprit de collaboration et d’empathie partagée au sein de l’organisation)",
    ],
    correctIndex: 3,
    explanation: "La lettre 'C' de CALMS désigne la Culture, pilier indispensable fondant la confiance, la responsabilité partagée et la suppression des barrières."
  },
  {
    id: "p5-03",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Modèle CALMS",
    question: "Que désigne la lettre « A » dans l’acronyme méthodologique CALMS ?",
    options: [
      "Automation (l’automatisation systématique des étapes de compilation, test et déploiement)",
      "Analysis (l’obligation de relire chaque ligne de code imprimée sur papier chaque soir)",
      "Approval (la signature manuscrite d’au moins dix directeurs avant chaque modification)",
      "Agile (l’interdiction d’utiliser le moindre outil informatique lors de la planification)",
    ],
    correctIndex: 0,
    explanation: "L’Automation (A) permet de rendre la chaîne de fabrication logicielle répétable, rapide et sans erreur humaine grâce à des pipelines automatisés."
  },
  {
    id: "p5-04",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Modèle CALMS",
    question: "Dans le modèle CALMS, à quel principe correspond la lettre « L » ?",
    options: [
      "Layer (la séparation du logiciel en au moins vingt couches d’abstraction logicielle)",
      "Linux (l’obligation d’utiliser exclusivement ce système d’exploitation sur tous les postes)",
      "Launch (le lancement obligatoire de l’application chaque premier jour ouvré du mois)",
      "Lean (l’élimination méthodique des gaspillages et la réduction de la taille des lots livrés)",
    ],
    correctIndex: 3,
    explanation: "Le Lean (L) vise l’efficience : éliminer les temps d’attente inutiles, réduire la taille des incréments et fluidifier le cycle de livraison."
  },
  {
    id: "p5-05",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Modèle CALMS",
    question: "Quelle dimension fondamentale est désignée par la lettre « M » dans le cadre CALMS ?",
    options: [
      "Merge (la fusion obligatoire de l’ensemble des branches de développement chaque heure)",
      "Measurement (le suivi quantitatif des métriques clés de performance et de qualité du service)",
      "Module (le découpage obligatoire de l’application en petits composants indépendants)",
      "Management (la structure hiérarchique pyramidale traditionnelle imposée à l’équipe)",
    ],
    correctIndex: 1,
    explanation: "Measurement (M) met l’accent sur la mesure objective (fréquence de déploiement, taux d’échec, temps de rétablissement) pour s’améliorer."
  },
  {
    id: "p5-06",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Modèle CALMS",
    question: "À quelle pratique fait référence la lettre « S » finale de l’acronyme CALMS ?",
    options: [
      "Scanner (l’installation obligatoire d’un appareil de numérisation dans chaque salle)",
      "Security (l’isolement total de chaque développeur dans un bureau individuel fermé)",
      "Sprint (l’obligation d’adopter strictement des itérations d’une durée de trois jours)",
      "Sharing (le partage transparent des connaissances, des retours d’expérience et des outils)",
    ],
    correctIndex: 3,
    explanation: "Sharing (S) valorise le partage d’informations, les post-mortems sans blâme et la transmission continue des savoirs entre pairs."
  },
  {
    id: "p5-07",
    partId: "part5",
    difficulty: "comprehension",
    tag: "CI/CD",
    question: "Que signifie le sigle « CI » dans le vocabulaire standard de l’ingénierie logicielle ?",
    options: [
      "Critical Infrastructure (Infrastructure Critique)",
      "Code Inspection (Inspection de Code)",
      "Continuous Integration (Intégration Continue)",
      "Central Interface (Interface Centrale)",
    ],
    correctIndex: 2,
    explanation: "CI est l’acronyme de Continuous Integration : intégrer fréquemment le code de tous les développeurs et vérifier sa validité automatiquement."
  },
  {
    id: "p5-08",
    partId: "part5",
    difficulty: "comprehension",
    tag: "CI/CD",
    question: "Dans le vocabulaire DevOps, quelles deux réalités complémentaires le sigle « CD » peut-il désigner ?",
    options: [
      "Code Documentation ou Critical Debugging selon la gravité de l’anomalie rencontrée",
      "Customer Development ou Client Decision selon la phase du contrat commercial",
      "Continuous Delivery ou Continuous Deployment selon le degré d’automatisation finale",
      "Compact Disk ou Central Database selon le type de matériel informatique branché",
    ],
    correctIndex: 2,
    explanation: "CD désigne soit la Livraison Continue (Continuous Delivery), soit le Déploiement Continu (Continuous Deployment)."
  },
  {
    id: "p5-09",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Intégration Continue",
    question: "Quel est l’objectif premier de la pratique de l’Intégration Continue (CI) au quotidien ?",
    options: [
      "Obliger l’équipe à n’effectuer qu’une seule mise à jour du code par trimestre calendaire",
      "Interdire aux développeurs d’écrire plus de cent lignes de code informatique par jour",
      "Supprimer la totalité des dépôts distants hébergés sur les serveurs de l’entreprise",
      "Détecter et corriger les régressions et conflits dès leur apparition grâce à des tests automatisés",
    ],
    correctIndex: 3,
    explanation: "La CI valide automatiquement chaque intégration par la compilation et les tests, évitant le fameux syndrome du 'ça marche sur ma machine'."
  },
  {
    id: "p5-10",
    partId: "part5",
    difficulty: "comprehension",
    tag: "GitLab CI",
    question: "Quelles sont les deux entités logiques majeures qui structurent l’exécution d’un pipeline GitLab CI ?",
    options: [
      "Les Epics et les User Stories déclarées dans le tableau de bord de pilotage Jira",
      "Les contrats commerciaux et les factures d’honoraires établis par la direction",
      "Les Stages (grandes étapes séquentielles) et les Jobs (tâches unitaires exécutées)",
      "Les diagrammes de Gantt et les réseaux fléchés tracés selon la méthode PERT",
    ],
    correctIndex: 2,
    explanation: "Un pipeline GitLab CI organise ses étapes en Stages successives (ex: build, test), chaque Stage contenant un ou plusieurs Jobs."
  },
  {
    id: "p5-11",
    partId: "part5",
    difficulty: "comprehension",
    tag: "GitLab CI",
    question: "Quel composant logiciel est concrètement chargé d’exécuter les commandes déclarées dans les jobs GitLab CI ?",
    options: [
      "Le diagramme PERT",
      "Le Scrum Master",
      "Le GitLab Runner",
      "Le Product Owner",
    ],
    correctIndex: 2,
    explanation: "Le Runner est l’agent d’exécution isolé (machine virtuelle ou conteneur Docker) qui reçoit les instructions d’un job et lance les scripts."
  },
  {
    id: "p5-12",
    partId: "part5",
    difficulty: "trap",
    tag: "GitLab CI",
    question: "Quel est le nom exact et normalisé du fichier de configuration du pipeline dans un dépôt GitLab ?",
    options: [
      ".gitlab-ci.yml",
      "runner.dockerfile",
      "gitlab-pipeline.json",
      "ci-config.xml",
    ],
    correctIndex: 0,
    explanation: "Le fichier doit impérativement s’appeler `.gitlab-ci.yml` (avec le point au début) et être placé à la racine du dépôt."
  },
  {
    id: "p5-13",
    partId: "part5",
    difficulty: "comprehension",
    tag: "GitLab CI",
    question: "Que représente un « Stage » dans la structure d’un pipeline GitLab CI ?",
    options: [
      "Une étape logique regroupant un ou plusieurs jobs exécutés lors de la même phase",
      "Une période de stage obligatoire en entreprise de deux mois pour les étudiants",
      "Une réunion de négociation tarifaire organisée entre la MOA et la MOE",
      "Un espace disque réservé à l’installation du système d’exploitation de base",
    ],
    correctIndex: 0,
    explanation: "Un Stage est une phase ordonnée du cycle de vie (ex: stage build, stage test) qui ne commence que si le stage précédent a réussi."
  },
  {
    id: "p5-14",
    partId: "part5",
    difficulty: "comprehension",
    tag: "GitLab CI",
    question: "Comment définit-on précisément un « Job » dans la terminologie GitLab CI ?",
    options: [
      "La liste complète de toutes les branches archivées sur le serveur distant",
      "L’unité d’exécution élémentaire contenant les scripts et commandes confiés à un Runner",
      "Le montant du salaire mensuel net versé au responsable du contrôle qualité",
      "Le contrat de travail à durée indéterminée signé par un ingénieur d’études",
    ],
    correctIndex: 1,
    explanation: "Un Job est la tâche concrète qui exécute une série de commandes shell dans un environnement donné pour produire un résultat."
  },
  {
    id: "p5-15",
    partId: "part5",
    difficulty: "application",
    tag: "Pipelines",
    question: "Parmi les séquences suivantes, laquelle illustre une progression classique et logique de stages dans un pipeline ?",
    options: [
      "build ➔ test ➔ quality ➔ package ➔ deploy",
      "deploy ➔ build ➔ test ➔ suppression du code source",
      "quality ➔ deploy ➔ écriture du code ➔ négociation",
      "package ➔ achat du matériel ➔ test ➔ build",
    ],
    correctIndex: 0,
    explanation: "On compile d’abord (build), on teste (test), on vérifie la qualité statique (quality), on empaquette en image (package), puis on déploie (deploy)."
  },
  {
    id: "p5-16",
    partId: "part5",
    difficulty: "trap",
    tag: "CI/CD",
    question: "Quelle caractéristique distingue spécifiquement la « Continuous Delivery » (Livraison Continue) ?",
    options: [
      "Le logiciel est maintenu dans un état livrable, mais le déploiement en production requiert une décision manuelle",
      "Chaque commit est automatiquement envoyé en production sans aucune possibilité d’arrêt manuel",
      "L’ensemble des tests de régression automatisés est volontairement supprimé pour accélérer le flux",
      "Le code source n’est plus jamais sauvegardé sur un dépôt Git distant pour des raisons de sécurité",
    ],
    correctIndex: 0,
    explanation: "En Continuous Delivery, le déploiement en production est prêt et validé à tout moment, mais son déclenchement final conserve un clic ou arbitrage humain."
  },
  {
    id: "p5-17",
    partId: "part5",
    difficulty: "trap",
    tag: "CI/CD",
    question: "En quoi le « Continuous Deployment » (Déploiement Continu) va-t-il plus loin que la Continuous Delivery ?",
    options: [
      "Il exige que chaque utilisateur final vienne tester l’application sur place dans les bureaux",
      "Il automatise intégralement la mise en production directe dès lors que les tests et contrôles sont validés",
      "Il remplace les développeurs par des robots autonomes écrivant l’intégralité des fonctionnalités",
      "Il supprime toute vérification de qualité pour livrer le code brut aux utilisateurs finaux",
    ],
    correctIndex: 1,
    explanation: "En Continuous Deployment, le flux est 100% automatisé de bout en bout : aucun humain n’a besoin de cliquer pour que le code passe en production."
  },
  {
    id: "p5-18",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Culture DevOps",
    question: "Quel bénéfice commercial majeur apporte l’adoption de DevOps aux entreprises modernes ?",
    options: [
      "Rendre la maintenance de l’application totalement impossible après la première mise en ligne",
      "Réduire considérablement le délai entre la conception d’une idée et sa mise à disposition aux clients",
      "Interdire l’utilisation d’outils d’analyse de sécurité pour économiser des ressources informatiques",
      "Augmenter volontairement la complexité des démarches administratives internes de l’organisation",
    ],
    correctIndex: 1,
    explanation: "Le 'Time to Market' (délai de mise sur le marché) est réduit drastiquement grâce à des cycles courts et des livraisons automatisées sans friction."
  },
  {
    id: "p5-19",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Tests automatisés",
    question: "Pourquoi est-il primordial d’automatiser l’exécution des tests unitaires dans chaque pipeline CI ?",
    options: [
      "Pour obtenir un retour d’information immédiat et répétable sur la non-régression du logiciel",
      "Pour empêcher le serveur de sauvegarder les modifications dans la base de données relationnelle",
      "Pour supprimer définitivement le besoin de recruter des ingénieurs dans l’équipe de développement",
      "Pour forcer l’ordinateur à redémarrer automatiquement chaque fois qu’un fichier est modifié",
    ],
    correctIndex: 0,
    explanation: "Les tests automatisés agissent comme un filet de sécurité infatigable qui vérifie en quelques minutes qu’aucun effet de bord n’a été introduit."
  },
  {
    id: "p5-20",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Agile et DevOps",
    question: "Comment l’approche Agile et la culture DevOps se complètent-elles de façon idéale ?",
    options: [
      "Ce sont deux doctrines strictement opposées qui ne peuvent jamais coexister dans la même entreprise",
      "Agile s’applique uniquement aux banques tandis que DevOps est réservé aux jeux vidéo sur mobile",
      "Agile remplace l’intégralité des outils serveurs alors que DevOps supprime les réunions d’équipe",
      "Agile organise la production de valeur par itérations, DevOps automatise et fiabilise sa livraison continue",
    ],
    correctIndex: 3,
    explanation: "Agile apporte le cadre de priorisation et d’adaptation du besoin (le 'quoi' faire), DevOps apporte la tuyauterie industrielle pour livrer vite et bien (le 'comment' livrer)."
  },
  {
    id: "p5-21",
    partId: "part5",
    difficulty: "application",
    tag: "GitLab CI",
    question: "Que se produit-il par défaut dans GitLab CI lorsqu’un test unitaire échoue au sein du stage « test » ?",
    options: [
      "GitLab efface automatiquement tout l’historique des commits enregistrés depuis le matin",
      "Le runner ignore l’erreur et déploie le code en production pour ne pas retarder le calendrier",
      "Le pipeline s’arrête immédiatement et bloque l’exécution des stages ultérieurs comme le déploiement",
      "Le compte du développeur est définitivement supprimé de l’ensemble des serveurs du réseau",
    ],
    correctIndex: 2,
    explanation: "Le principe de sécurité du pipeline est de faire barrage : si les tests échouent, le pipeline devient rouge et empêche la propagation du code défectueux."
  },
  {
    id: "p5-22",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Culture DevOps",
    question: "Pourquoi le « feedback rapide » (boucle de rétroaction courte) est-il un dogme central en DevOps ?",
    options: [
      "Parce que plus une anomalie est découverte tôt, plus son coût et son délai de correction sont faibles",
      "Parce que cela dispense totalement l’équipe d’avoir à expliquer son travail aux clients finaux",
      "Parce que cela permet de licencier immédiatement les développeurs qui commettent la moindre erreur",
      "Parce que les serveurs informatiques consomment moins d’électricité lorsque les retours sont rapides",
    ],
    correctIndex: 0,
    explanation: "Un développeur prévenu en 5 minutes d’une erreur corrige en 2 minutes ; s’il ne l’apprend que 3 mois plus tard, la correction peut prendre des jours."
  },
  {
    id: "p5-23",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Outils CI/CD",
    question: "Dans le support de cours officiel OFPPT, quel outil intégré est présenté pour configurer et lancer les pipelines de CI/CD ?",
    options: [
      "RACI Designer",
      "PERT Analyzer",
      "GitLab CI",
      "GanttProject",
    ],
    correctIndex: 2,
    explanation: "Le module OFPPT utilise GitLab et son moteur GitLab CI pour illustrer concrètement l’automatisation des pipelines."
  },
  {
    id: "p5-24",
    partId: "part5",
    difficulty: "application",
    tag: "GitLab CI",
    question: "Dans un fichier `.gitlab-ci.yml`, quel mot-clé déclare les commandes bash à exécuter dans un job ?",
    options: [
      "terminal_run:",
      "script:",
      "execute:",
      "bash_commands:",
    ],
    correctIndex: 1,
    explanation: "Le mot-clé standard imposé par la syntaxe YAML de GitLab CI pour lister les commandes d’un job est `script:`."
  },
  {
    id: "p5-25",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Culture DevOps",
    question: "Lequel des objectifs suivants incarne parfaitement l’esprit de responsabilisation partagée en DevOps ?",
    options: [
      "Interdire formellement aux développeurs de consulter les journaux d’erreurs des serveurs web",
      "Fédérer tous les acteurs autour de la responsabilité conjointe de la stabilité et de la valeur en production",
      "Isoler les administrateurs système dans un bâtiment séparé dont l’accès est interdit aux programmeurs",
      "Confier la totalité des décisions techniques à une seule personne sans concertation avec l’équipe",
    ],
    correctIndex: 1,
    explanation: "La devise 'You build it, you run it' résume la responsabilité conjointe des équipes multidisciplinaires en DevOps."
  },
  {
    id: "p5-26",
    partId: "part5",
    difficulty: "application",
    tag: "Pipelines",
    question: "À quel endroit d’un pipeline de livraison automatisée est-il le plus pertinent de positionner l’analyse SonarQube ?",
    options: [
      "À la place de la commande de création du dépôt Git lors de la toute première initialisation",
      "Uniquement pendant la réunion annuelle de présentation du bilan financier de l’entreprise",
      "Strictement après la mise en production finale lorsque les utilisateurs ont déjà accès au service",
      "Juste après ou pendant la phase de compilation et de tests, avant toute validation de déploiement",
    ],
    correctIndex: 3,
    explanation: "L’analyse SonarQube et sa Quality Gate doivent s’exécuter avant le déploiement pour bloquer toute mise en ligne de code non conforme."
  },
  {
    id: "p5-27",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Métriques DevOps",
    question: "Parmi les indicateurs suivants, lequel est typique du suivi de la fluidité d’une chaîne de livraison DevOps ?",
    options: [
      "La marque de café la plus consommée par les membres de l’équipe de développement",
      "Le taux d’échec des changements déployés en production (Change Failure Rate)",
      "Le nombre total de clics de souris enregistrés sur les postes de travail chaque matin",
      "La couleur des chaises choisies pour équiper la salle de réunion du conseil d’administration",
    ],
    correctIndex: 1,
    explanation: "Les métriques DORA (comme le Change Failure Rate ou le Lead Time for Changes) mesurent objectivement la performance et la fiabilité du flux."
  },
  {
    id: "p5-28",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Agile et CI/CD",
    question: "Pourquoi l’automatisation CI/CD est-elle un accélérateur puissant pour une équipe travaillant en Scrum ?",
    options: [
      "Elle supprime la nécessité de désigner un Product Owner pour ordonner le Product Backlog",
      "Elle permet de valider et de rendre livrable l’Incrément à chaque fin de Sprint sans stress manuel",
      "Elle garantit que les utilisateurs finaux n’auront jamais besoin de donner leur avis sur le produit",
      "Elle dispense l’équipe de tenir les réunions de planification et les démonstrations de Review",
    ],
    correctIndex: 1,
    explanation: "Avoir une chaîne CI/CD fiable permet de livrer l’Incrément du Sprint en un clic, respectant ainsi parfaitement la promesse de Scrum."
  },
  {
    id: "p5-29",
    partId: "part5",
    difficulty: "comprehension",
    tag: "GitLab CI",
    question: "Quelle est la nature technique d’un « GitLab Runner » dans une infrastructure réseau ?",
    options: [
      "Une application cliente légère installée sur une machine qui écoute et exécute les tâches envoyées par GitLab",
      "Un câble réseau à fibre optique reliant deux centres de données distants de plusieurs kilomètres",
      "Un responsable des ressources humaines chargé de surveiller les horaires des salariés",
      "Un langage de programmation compilé concurrent direct du langage C++ et de Java",
    ],
    correctIndex: 0,
    explanation: "Le Runner est un démon (service en arrière-plan) qui s’enregistre auprès de l’instance GitLab pour exécuter les scripts de build et de test."
  },
  {
    id: "p5-30",
    partId: "part5",
    difficulty: "situation",
    tag: "Déploiement Continu",
    question: "Lequel des scénarios suivants illustre sans équivoque la pratique du « Continuous Deployment » (Déploiement Continu) ?",
    options: [
      "Un administrateur système sauvegarde la base de données sur une clé USB avant de partir en vacances d’été",
      "Une équipe déplace un ticket dans la colonne « Terminé » de son tableau Jira après une approbation verbale du chef",
      "Un développeur compile son code localement le vendredi après-midi puis l’envoie par courrier électronique à son client",
      "Un commit poussé franchit avec succès build, tests et contrôles de sécurité puis est déployé en direct en production sans intervention",
    ],
    correctIndex: 3,
    explanation: "Le Déploiement Continu automatise l’intégralité de la chaîne jusqu’à la production effective sans validation manuelle intermédiaire."
  }
];
