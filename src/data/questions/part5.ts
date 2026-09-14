import { Question } from '../../types';

export const questionsPart5: Question[] = [
  {
    id: "p5-01",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Culture DevOps",
    question: "Quelle est la vocation première du mouvement culturel et technique DevOps ?",
    options: [
      "Rapprocher les développeurs et les équipes d’exploitation pour accélérer la livraison fiable de valeur",
      "Séparer hermétiquement les équipes techniques pour éviter qu’elles ne communiquent entre elles",
      "Remplacer l’ensemble des langages de programmation par un seul outil de dessin technique",
      "Supprimer totalement les serveurs informatiques au profit d’échanges de fichiers manuels"
    ],
    correctIndex: 0,
    explanation: "DevOps vise à casser le silo historique entre le développement (Dev) et l’exploitation système (Ops) par une collaboration et une automatisation continues."
  },
  {
    id: "p5-02",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Modèle CALMS",
    question: "Dans le modèle d’évaluation et de maturité CALMS, que représente la lettre « C » ?",
    options: [
      "Culture (l’état d’esprit de collaboration et d’empathie partagée au sein de l’organisation)",
      "Code (l’obligation d’écrire l’ensemble des programmes informatiques dans un fichier unique)",
      "Control (la surveillance hiérarchique policière des heures d’arrivée des stagiaires)",
      "Customer (la délégation de la totalité des choix architecturaux au client final)"
    ],
    correctIndex: 0,
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
      "Agile (l’interdiction d’utiliser le moindre outil informatique lors de la planification)",
      "Approval (la signature manuscrite d’au moins dix directeurs avant chaque modification)",
      "Analysis (l’obligation de relire chaque ligne de code imprimée sur papier chaque soir)"
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
      "Lean (l’élimination méthodique des gaspillages et la réduction de la taille des lots livrés)",
      "Linux (l’obligation d’utiliser exclusivement ce système d’exploitation sur tous les postes)",
      "Launch (le lancement obligatoire de l’application chaque premier jour ouvré du mois)",
      "Layer (la séparation du logiciel en au moins vingt couches d’abstraction logicielle)"
    ],
    correctIndex: 0,
    explanation: "Le Lean (L) vise l’efficience : éliminer les temps d’attente inutiles, réduire la taille des incréments et fluidifier le cycle de livraison."
  },
  {
    id: "p5-05",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Modèle CALMS",
    question: "Quelle dimension fondamentale est désignée par la lettre « M » dans le cadre CALMS ?",
    options: [
      "Measurement (le suivi quantitatif des métriques clés de performance et de qualité du service)",
      "Management (la structure hiérarchique pyramidale traditionnelle imposée à l’équipe)",
      "Merge (la fusion obligatoire de l’ensemble des branches de développement chaque heure)",
      "Module (le découpage obligatoire de l’application en petits composants indépendants)"
    ],
    correctIndex: 0,
    explanation: "Measurement (M) met l’accent sur la mesure objective (fréquence de déploiement, taux d’échec, temps de rétablissement) pour s’améliorer."
  },
  {
    id: "p5-06",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Modèle CALMS",
    question: "À quelle pratique fait référence la lettre « S » finale de l’acronyme CALMS ?",
    options: [
      "Sharing (le partage transparent des connaissances, des retours d’expérience et des outils)",
      "Security (l’isolement total de chaque développeur dans un bureau individuel fermé)",
      "Sprint (l’obligation d’adopter strictement des itérations d’une durée de trois jours)",
      "Scanner (l’installation obligatoire d’un appareil de numérisation dans chaque salle)"
    ],
    correctIndex: 0,
    explanation: "Sharing (S) valorise le partage d’informations, les post-mortems sans blâme et la transmission continue des savoirs entre pairs."
  },
  {
    id: "p5-07",
    partId: "part5",
    difficulty: "comprehension",
    tag: "CI/CD",
    question: "Que signifie le sigle « CI » dans le vocabulaire standard de l’ingénierie logicielle ?",
    options: [
      "Continuous Integration (Intégration Continue)",
      "Code Inspection (Inspection de Code)",
      "Critical Infrastructure (Infrastructure Critique)",
      "Central Interface (Interface Centrale)"
    ],
    correctIndex: 0,
    explanation: "CI est l’acronyme de Continuous Integration : intégrer fréquemment le code de tous les développeurs et vérifier sa validité automatiquement."
  },
  {
    id: "p5-08",
    partId: "part5",
    difficulty: "comprehension",
    tag: "CI/CD",
    question: "Dans le vocabulaire DevOps, quelles deux réalités complémentaires le sigle « CD » peut-il désigner ?",
    options: [
      "Continuous Delivery ou Continuous Deployment selon le degré d’automatisation finale",
      "Compact Disk ou Central Database selon le type de matériel informatique branché",
      "Code Documentation ou Critical Debugging selon la gravité de l’anomalie rencontrée",
      "Customer Development ou Client Decision selon la phase du contrat commercial"
    ],
    correctIndex: 0,
    explanation: "CD désigne soit la Livraison Continue (Continuous Delivery), soit le Déploiement Continu (Continuous Deployment)."
  },
  {
    id: "p5-09",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Intégration Continue",
    question: "Quel est l’objectif premier de la pratique de l’Intégration Continue (CI) au quotidien ?",
    options: [
      "Détecter et corriger les régressions et conflits dès leur apparition grâce à des tests automatisés",
      "Interdire aux développeurs d’écrire plus de cent lignes de code informatique par jour",
      "Obliger l’équipe à n’effectuer qu’une seule mise à jour du code par trimestre calendaire",
      "Supprimer la totalité des dépôts distants hébergés sur les serveurs de l’entreprise"
    ],
    correctIndex: 0,
    explanation: "La CI valide automatiquement chaque intégration par la compilation et les tests, évitant le fameux syndrome du 'ça marche sur ma machine'."
  },
  {
    id: "p5-10",
    partId: "part5",
    difficulty: "comprehension",
    tag: "GitLab CI",
    question: "Quelles sont les deux entités logiques majeures qui structurent l’exécution d’un pipeline GitLab CI ?",
    options: [
      "Les Stages (grandes étapes séquentielles) et les Jobs (tâches unitaires exécutées)",
      "Les Epics et les User Stories déclarées dans le tableau de bord de pilotage Jira",
      "Les diagrammes de Gantt et les réseaux fléchés tracés selon la méthode PERT",
      "Les contrats commerciaux et les factures d’honoraires établis par la direction"
    ],
    correctIndex: 0,
    explanation: "Un pipeline GitLab CI organise ses étapes en Stages successives (ex: build, test), chaque Stage contenant un ou plusieurs Jobs."
  },
  {
    id: "p5-11",
    partId: "part5",
    difficulty: "comprehension",
    tag: "GitLab CI",
    question: "Quel composant logiciel est concrètement chargé d’exécuter les commandes déclarées dans les jobs GitLab CI ?",
    options: [
      "Le GitLab Runner",
      "Le Product Owner",
      "Le Scrum Master",
      "Le diagramme PERT"
    ],
    correctIndex: 0,
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
      "gitlab-pipeline.json",
      "ci-config.xml",
      "runner.dockerfile"
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
      "Un espace disque réservé à l’installation du système d’exploitation de base",
      "Une réunion de négociation tarifaire organisée entre la MOA et la MOE"
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
      "L’unité d’exécution élémentaire contenant les scripts et commandes confiés à un Runner",
      "Le contrat de travail à durée indéterminée signé par un ingénieur d’études",
      "La liste complète de toutes les branches archivées sur le serveur distant",
      "Le montant du salaire mensuel net versé au responsable du contrôle qualité"
    ],
    correctIndex: 0,
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
      "package ➔ achat du matériel ➔ test ➔ build"
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
      "Le code source n’est plus jamais sauvegardé sur un dépôt Git distant pour des raisons de sécurité"
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
      "Il automatise intégralement la mise en production directe dès lors que les tests et contrôles sont validés",
      "Il remplace les développeurs par des robots autonomes écrivant l’intégralité des fonctionnalités",
      "Il supprime toute vérification de qualité pour livrer le code brut aux utilisateurs finaux",
      "Il exige que chaque utilisateur final vienne tester l’application sur place dans les bureaux"
    ],
    correctIndex: 0,
    explanation: "En Continuous Deployment, le flux est 100% automatisé de bout en bout : aucun humain n’a besoin de cliquer pour que le code passe en production."
  },
  {
    id: "p5-18",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Culture DevOps",
    question: "Quel bénéfice commercial majeur apporte l’adoption de DevOps aux entreprises modernes ?",
    options: [
      "Réduire considérablement le délai entre la conception d’une idée et sa mise à disposition aux clients",
      "Augmenter volontairement la complexité des démarches administratives internes de l’organisation",
      "Interdire l’utilisation d’outils d’analyse de sécurité pour économiser des ressources informatiques",
      "Rendre la maintenance de l’application totalement impossible après la première mise en ligne"
    ],
    correctIndex: 0,
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
      "Pour supprimer définitivement le besoin de recruter des ingénieurs dans l’équipe de développement",
      "Pour empêcher le serveur de sauvegarder les modifications dans la base de données relationnelle",
      "Pour forcer l’ordinateur à redémarrer automatiquement chaque fois qu’un fichier est modifié"
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
      "Agile organise la production de valeur par itérations, DevOps automatise et fiabilise sa livraison continue",
      "Agile remplace l’intégralité des outils serveurs alors que DevOps supprime les réunions d’équipe",
      "Agile s’applique uniquement aux banques tandis que DevOps est réservé aux jeux vidéo sur mobile",
      "Ce sont deux doctrines strictement opposées qui ne peuvent jamais coexister dans la même entreprise"
    ],
    correctIndex: 0,
    explanation: "Agile apporte le cadre de priorisation et d’adaptation du besoin (le 'quoi' faire), DevOps apporte la tuyauterie industrielle pour livrer vite et bien (le 'comment' livrer)."
  },
  {
    id: "p5-21",
    partId: "part5",
    difficulty: "application",
    tag: "GitLab CI",
    question: "Que se produit-il par défaut dans GitLab CI lorsqu’un test unitaire échoue au sein du stage « test » ?",
    options: [
      "Le pipeline s’arrête immédiatement et bloque l’exécution des stages ultérieurs comme le déploiement",
      "Le runner ignore l’erreur et déploie le code en production pour ne pas retarder le calendrier",
      "Le compte du développeur est définitivement supprimé de l’ensemble des serveurs du réseau",
      "GitLab efface automatiquement tout l’historique des commits enregistrés depuis le matin"
    ],
    correctIndex: 0,
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
      "Parce que cela permet de licencier immédiatement les développeurs qui commettent la moindre erreur",
      "Parce que les serveurs informatiques consomment moins d’électricité lorsque les retours sont rapides",
      "Parce que cela dispense totalement l’équipe d’avoir à expliquer son travail aux clients finaux"
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
      "GitLab CI",
      "GanttProject",
      "RACI Designer",
      "PERT Analyzer"
    ],
    correctIndex: 0,
    explanation: "Le module OFPPT utilise GitLab et son moteur GitLab CI pour illustrer concrètement l’automatisation des pipelines."
  },
  {
    id: "p5-24",
    partId: "part5",
    difficulty: "application",
    tag: "GitLab CI",
    question: "Dans un fichier `.gitlab-ci.yml`, quel mot-clé déclare les commandes bash à exécuter dans un job ?",
    options: [
      "script:",
      "execute:",
      "terminal_run:",
      "bash_commands:"
    ],
    correctIndex: 0,
    explanation: "Le mot-clé standard imposé par la syntaxe YAML de GitLab CI pour lister les commandes d’un job est `script:`."
  },
  {
    id: "p5-25",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Culture DevOps",
    question: "Lequel des objectifs suivants incarne parfaitement l’esprit de responsabilisation partagée en DevOps ?",
    options: [
      "Fédérer tous les acteurs autour de la responsabilité conjointe de la stabilité et de la valeur en production",
      "Isoler les administrateurs système dans un bâtiment séparé dont l’accès est interdit aux programmeurs",
      "Confier la totalité des décisions techniques à une seule personne sans concertation avec l’équipe",
      "Interdire formellement aux développeurs de consulter les journaux d’erreurs des serveurs web"
    ],
    correctIndex: 0,
    explanation: "La devise 'You build it, you run it' résume la responsabilité conjointe des équipes multidisciplinaires en DevOps."
  },
  {
    id: "p5-26",
    partId: "part5",
    difficulty: "application",
    tag: "Pipelines",
    question: "À quel endroit d’un pipeline de livraison automatisée est-il le plus pertinent de positionner l’analyse SonarQube ?",
    options: [
      "Juste après ou pendant la phase de compilation et de tests, avant toute validation de déploiement",
      "Strictement après la mise en production finale lorsque les utilisateurs ont déjà accès au service",
      "À la place de la commande de création du dépôt Git lors de la toute première initialisation",
      "Uniquement pendant la réunion annuelle de présentation du bilan financier de l’entreprise"
    ],
    correctIndex: 0,
    explanation: "L’analyse SonarQube et sa Quality Gate doivent s’exécuter avant le déploiement pour bloquer toute mise en ligne de code non conforme."
  },
  {
    id: "p5-27",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Métriques DevOps",
    question: "Parmi les indicateurs suivants, lequel est typique du suivi de la fluidité d’une chaîne de livraison DevOps ?",
    options: [
      "Le taux d’échec des changements déployés en production (Change Failure Rate)",
      "La marque de café la plus consommée par les membres de l’équipe de développement",
      "Le nombre total de clics de souris enregistrés sur les postes de travail chaque matin",
      "La couleur des chaises choisies pour équiper la salle de réunion du conseil d’administration"
    ],
    correctIndex: 0,
    explanation: "Les métriques DORA (comme le Change Failure Rate ou le Lead Time for Changes) mesurent objectivement la performance et la fiabilité du flux."
  },
  {
    id: "p5-28",
    partId: "part5",
    difficulty: "comprehension",
    tag: "Agile et CI/CD",
    question: "Pourquoi l’automatisation CI/CD est-elle un accélérateur puissant pour une équipe travaillant en Scrum ?",
    options: [
      "Elle permet de valider et de rendre livrable l’Incrément à chaque fin de Sprint sans stress manuel",
      "Elle supprime la nécessité de désigner un Product Owner pour ordonner le Product Backlog",
      "Elle dispense l’équipe de tenir les réunions de planification et les démonstrations de Review",
      "Elle garantit que les utilisateurs finaux n’auront jamais besoin de donner leur avis sur le produit"
    ],
    correctIndex: 0,
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
      "Un responsable des ressources humaines chargé de surveiller les horaires des salariés",
      "Un câble réseau à fibre optique reliant deux centres de données distants de plusieurs kilomètres",
      "Un langage de programmation compilé concurrent direct du langage C++ et de Java"
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
      "Un commit poussé franchit avec succès build, tests et contrôles de sécurité puis est déployé en direct en production sans intervention",
      "Un développeur compile son code localement le vendredi après-midi puis l’envoie par courrier électronique à son client",
      "Une équipe déplace un ticket dans la colonne « Terminé » de son tableau Jira après une approbation verbale du chef",
      "Un administrateur système sauvegarde la base de données sur une clé USB avant de partir en vacances d’été"
    ],
    correctIndex: 0,
    explanation: "Le Déploiement Continu automatise l’intégralité de la chaîne jusqu’à la production effective sans validation manuelle intermédiaire."
  }
];
