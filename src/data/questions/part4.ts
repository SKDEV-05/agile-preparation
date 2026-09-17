import { Question } from '../../types';

export const questionsPart4: Question[] = [
  {
    id: "p4-01",
    partId: "part4",
    difficulty: "comprehension",
    tag: "Fondamentaux Git",
    question: "Quelle est la définition architecturale la plus rigoureuse du logiciel Git ?",
    options: [
      "Un outil de calcul mathématique spécialisé dans l’ordonnancement des réseaux PERT",
      "Un langage de script permettant d’automatiser la création de graphiques statistiques",
      "Un serveur d’hébergement web payant réservé aux administrateurs de bases de données",
      "Un système de gestion de versions distribué traçant l’historique des fichiers",
    ],
    correctIndex: 3,
    explanation: "Git est un système de contrôle de versions distribué (DVCS) qui conserve l’historique complet des fichiers localement et facilite la collaboration."
  },
  {
    id: "p4-02",
    partId: "part4",
    difficulty: "comprehension",
    tag: "GitLab",
    question: "Comment définit-on la plateforme GitLab par rapport au protocole Git ?",
    options: [
      "Un logiciel antivirus analysant les disques durs des postes clients des stagiaires",
      "Une plateforme web collaborative intégrant hébergement de dépôts, revues et CI/CD",
      "Un protocole réseau matériel utilisé pour connecter les imprimantes d’entreprise",
      "Une bibliothèque graphique permettant de dessiner des boutons personnalisés en CSS",
    ],
    correctIndex: 1,
    explanation: "GitLab est une solution web complète construite autour de Git, offrant la gestion de projets, la revue de code et une chaîne d’intégration/déploiement continu."
  },
  {
    id: "p4-03",
    partId: "part4",
    difficulty: "application",
    tag: "Commandes Git",
    question: "Quelle est la fonction exacte de la commande système « git init » dans un dossier ?",
    options: [
      "Télécharger l’intégralité des fichiers d’un projet distant depuis un serveur web",
      "Envoyer tous les fichiers modifiés vers le serveur de production de l’entreprise",
      "Créer un nouveau dépôt Git local en initialisant le sous-dossier caché .git",
      "Supprimer définitivement la totalité des branches créées au cours du mois passé",
    ],
    correctIndex: 2,
    explanation: "`git init` initialise un nouveau dépôt Git en créant le répertoire de contrôle caché `.git` dans le répertoire courant."
  },
  {
    id: "p4-04",
    partId: "part4",
    difficulty: "application",
    tag: "Commandes Git",
    question: "Que permet de visualiser immédiatement la commande « git status » dans le terminal ?",
    options: [
      "Le montant financier des heures supplémentaires accomplies par les ingénieurs",
      "La vitesse de téléchargement mesurée sur la carte réseau du poste de travail",
      "L’état courant de la branche, les fichiers indexés, modifiés ou non suivis",
      "La liste des mots de passe des utilisateurs autorisés à se connecter au serveur",
    ],
    correctIndex: 2,
    explanation: "`git status` informe le développeur sur l’état de l’arborescence : branche active, fichiers modifiés, indexés (staged) ou untracked."
  },
  {
    id: "p4-05",
    partId: "part4",
    difficulty: "application",
    tag: "Commandes Git",
    question: "Quel est l’effet direct de l’exécution de la commande « git add . » ?",
    options: [
      "Placer l’ensemble des modifications du répertoire dans la zone de staging (Index)",
      "Lancer automatiquement l’analyse de sécurité sur le serveur SonarQube",
      "Créer un nouveau dépôt distant sur le compte cloud officiel de l’entreprise",
      "Annuler l’ensemble des modifications apportées aux fichiers depuis le matin",
    ],
    correctIndex: 0,
    explanation: "`git add` prépare les modifications sélectionnées en les plaçant dans la zone de staging (Index) pour le prochain commit."
  },
  {
    id: "p4-06",
    partId: "part4",
    difficulty: "comprehension",
    tag: "Commandes Git",
    question: "Que réalise concrètement la commande « git commit -m \"message\" » ?",
    options: [
      "Transférer automatiquement le code source sur la branche de production en ligne",
      "Créer une nouvelle adresse IP réservée aux connexions sécurisées du projet",
      "Enregistrer un instantané des modifications indexées dans l’historique local",
      "Installer les mises à jour logicielles de sécurité du système d’exploitation",
    ],
    correctIndex: 2,
    explanation: "`git commit` fige un point d’étape dans la base de données locale du dépôt avec un message explicatif identifiant les modifications."
  },
  {
    id: "p4-07",
    partId: "part4",
    difficulty: "trap",
    tag: "Commandes Git",
    question: "À quel moment les modifications locales sont-elles réellement transmises vers le serveur distant ?",
    options: [
      "Au moment précis où la commande « git add » est validée",
      "Immédiatement après la création locale d’un commit avec git commit",
      "Dès que le développeur enregistre le fichier dans son éditeur",
      "Lors de l’exécution explicite de la commande « git push »",
    ],
    correctIndex: 3,
    explanation: "Seule la commande `git push` envoie les commits enregistrés localement vers le serveur distant (GitLab/GitHub)."
  },
  {
    id: "p4-08",
    partId: "part4",
    difficulty: "comprehension",
    tag: "Commandes Git",
    question: "Quelles sont les deux actions combinées par la commande « git pull » en pratique ?",
    options: [
      "Supprimer la branche locale puis réinstaller le système d’exploitation de la machine",
      "Créer une sauvegarde zippée du dossier puis l’envoyer par courriel au chef de projet",
      "Lancer l’analyse statique de code puis fermer l’éditeur de programmation en cours",
      "Récupérer les commits distants (fetch) puis les fusionner dans la branche courante (merge)",
    ],
    correctIndex: 3,
    explanation: "`git pull` exécute en réalité un `git fetch` (récupération des données distantes) suivi immédiatement d’un `git merge` dans la branche active."
  },
  {
    id: "p4-09",
    partId: "part4",
    difficulty: "application",
    tag: "Branches Git",
    question: "Quelle commande permet d’afficher la liste complète des branches locales du dépôt ?",
    options: [
      "git branch",
      "git remote show",
      "git status --all",
      "git commit --list",
    ],
    correctIndex: 0,
    explanation: "La commande `git branch` liste l’ensemble des branches locales et met en valeur avec un astérisque la branche courante active."
  },
  {
    id: "p4-10",
    partId: "part4",
    difficulty: "application",
    tag: "Branches Git",
    question: "Dans les versions modernes de Git, quelle commande est recommandée pour créer et basculer sur une nouvelle branche ?",
    options: [
      "git push --new-local-branch",
      "git switch -c nom_de_branche",
      "git runner init-branch",
      "git sonar --create-branch",
    ],
    correctIndex: 1,
    explanation: "`git switch -c <nom>` (ou traditionnellement `git checkout -b <nom>`) crée la nouvelle branche et positionne immédiatement le HEAD dessus."
  },
  {
    id: "p4-11",
    partId: "part4",
    difficulty: "comprehension",
    tag: "Conflits Git",
    question: "Quelle situation déclenche classiquement un « conflit de merge » lors d’une fusion Git ?",
    options: [
      "Lorsque le développeur oublie de saisir son mot de passe lors de la connexion",
      "Lorsque la connexion réseau est interrompue pendant l’écriture d’un commentaire",
      "Lorsque le serveur distant GitLab dispose de moins de 10% d’espace de stockage",
      "Lorsque deux branches ont modifié différemment les mêmes lignes d’un même fichier",
    ],
    correctIndex: 3,
    explanation: "Un conflit survient quand Git ne peut pas concilier automatiquement des modifications concurrentes incompatibles sur un même bloc de texte."
  },
  {
    id: "p4-12",
    partId: "part4",
    difficulty: "application",
    tag: "Conflits Git",
    question: "Que doit faire le développeur une fois qu’il a nettoyé manuellement les balises de conflit dans son fichier ?",
    options: [
      "Éteindre immédiatement son ordinateur sans sauvegarder le document texte",
      "Changer de nom de famille sur son profil d’utilisateur de l’entreprise",
      "Indexer le fichier résolu avec « git add » puis finaliser le commit de fusion",
      "Supprimer l’intégralité du code source pour laisser le serveur décider seul",
    ],
    correctIndex: 2,
    explanation: "Pour indiquer à Git qu’un conflit est résolu, on indexe le fichier avec `git add <fichier>` puis on enregistre la résolution avec `git commit`."
  },
  {
    id: "p4-13",
    partId: "part4",
    difficulty: "comprehension",
    tag: "Branches Git",
    question: "Quel est l’intérêt majeur d’utiliser des branches de fonctionnalités (feature branches) ?",
    options: [
      "Développer de nouvelles fonctions isolément sans perturber le code stable de main",
      "Remplacer les tests unitaires automatisés par de simples attestations verbales",
      "Interdire aux autres développeurs de lire le code informatique rédigé par l’équipe",
      "Augmenter artificiellement le nombre de gigaoctets consommés sur le disque dur",
    ],
    correctIndex: 0,
    explanation: "Les branches isolent les développements en cours : si une fonction expérimentale échoue, la branche principale `main` reste propre et fonctionnelle."
  },
  {
    id: "p4-14",
    partId: "part4",
    difficulty: "comprehension",
    tag: "Bonnes pratiques Git",
    question: "Pourquoi est-il crucial de rédiger des messages de commit précis et compréhensibles ?",
    options: [
      "Pour supprimer le besoin d’écrire des commentaires dans le code source logiciel",
      "Pour garantir la traçabilité de l’historique et faciliter le diagnostic en cas de bogue",
      "Pour accélérer la vitesse de calcul des microprocesseurs lors de la compilation",
      "Pour réduire le montant de la facture d’électricité des serveurs d’entreprise",
    ],
    correctIndex: 1,
    explanation: "Un historique de commits clair et documenté permet de comprendre pourquoi un changement a eu lieu et de retrouver rapidement l’origine d’une régression."
  },
  {
    id: "p4-15",
    partId: "part4",
    difficulty: "comprehension",
    tag: "Fondamentaux Git",
    question: "Quel avantage stratégique apporte la gestion de versions à une organisation de développement ?",
    options: [
      "Augmenter automatiquement la vitesse de traitement de la base de données client",
      "Pouvoir revenir à n’importe quel état antérieur du code et auditer chaque changement",
      "Remplacer les réunions d’équipe par des commandes automatiques exécutées le soir",
      "Garantir qu’aucun bogue ne sera jamais écrit par les programmeurs informatiques",
    ],
    correctIndex: 1,
    explanation: "Le versionnement offre un filet de sécurité total : historique détaillé, comparaisons (diff), identification des auteurs (blame) et retours en arrière."
  },
  {
    id: "p4-16",
    partId: "part4",
    difficulty: "comprehension",
    tag: "SonarQube",
    question: "Quelle est la fonction première du logiciel SonarQube dans une chaîne de développement ?",
    options: [
      "Analyser en continu la qualité, la sécurité et la dette technique du code source",
      "Gérer le calendrier des congés payés des ingénieurs d’études de l’entreprise",
      "Calculer la marge totale et le chemin critique selon la méthode mathématique PERT",
      "Héberger les vidéos de formation destinées aux stagiaires de l’établissement",
    ],
    correctIndex: 0,
    explanation: "SonarQube est une plateforme d’analyse statique continue du code source évaluant la maintenabilité, la fiabilité et la sécurité."
  },
  {
    id: "p4-17",
    partId: "part4",
    difficulty: "comprehension",
    tag: "SonarQube",
    question: "Comment se positionne l’outil « SonarLint » par rapport au serveur « SonarQube » ?",
    options: [
      "SonarLint remplace la totalité des fonctionnalités hébergées par le serveur distant",
      "SonarLint s’intègre dans l’IDE pour donner des alertes de qualité en direct lors de la frappe",
      "SonarLint est un logiciel payant réservé exclusivement aux directeurs généraux",
      "SonarLint sert uniquement à exporter les feuilles de calcul budgétaires au format PDF",
    ],
    correctIndex: 1,
    explanation: "SonarLint est l’extension locale qui s’exécute dans l’éditeur de code (comme VS Code) pour signaler les anomalies avant même le premier commit."
  },
  {
    id: "p4-18",
    partId: "part4",
    difficulty: "comprehension",
    tag: "SonarQube",
    question: "Quel rôle remplit le composant « SonarScanner » dans une chaîne d’intégration continue ?",
    options: [
      "Créer une nouvelle branche protégée sur le serveur distant GitLab sans validation",
      "Analyser le code source du projet et transmettre les métriques brutes au serveur SonarQube",
      "Générer les certificats de scolarité des stagiaires à la fin de l’année de formation",
      "Supprimer automatiquement les fichiers sources qui contiennent des erreurs de syntaxe",
    ],
    correctIndex: 1,
    explanation: "SonarScanner est l’agent CLI qui parcourt le code lors de la phase de build pour produire les données d’analyse et les envoyer à SonarQube."
  },
  {
    id: "p4-19",
    partId: "part4",
    difficulty: "comprehension",
    tag: "Qualité logicielle",
    question: "Que mesure l’indicateur de « Couverture de tests » (Code Coverage) calculé par SonarQube ?",
    options: [
      "La proportion de disques durs sauvegardés sur les serveurs de secours distants",
      "La superficie physique occupée par les salles de cours de l’établissement scolaire",
      "Le nombre d’heures passées par les développeurs à concevoir les maquettes web",
      "Le pourcentage de lignes de code exécutées lors du passage de la suite de tests",
    ],
    correctIndex: 3,
    explanation: "La couverture mesure la proportion du code source traversée par les tests automatisés, donnant un indice sur le niveau de test de l’application."
  },
  {
    id: "p4-20",
    partId: "part4",
    difficulty: "comprehension",
    tag: "Qualité logicielle",
    question: "Pourquoi un taux élevé de « Duplication de code » est-il néfaste pour une application ?",
    options: [
      "Il alourdit la maintenance car chaque correction doit être répétée à de multiples endroits",
      "Il empêche le développeur d’utiliser la commande git add lors de la préparation",
      "Il bloque immédiatement la compilation de l’ensemble des programmes informatiques",
      "Il provoque obligatoirement la perte de la connexion au réseau internet local",
    ],
    correctIndex: 0,
    explanation: "Le code dupliqué augmente la dette technique : corriger un bogue dans une copie oublie souvent les autres occurrences, créant des incohérences."
  },
  {
    id: "p4-21",
    partId: "part4",
    difficulty: "comprehension",
    tag: "Sécurité",
    question: "Dans la terminologie SonarQube, que désigne précisément une « Vulnérabilité » ?",
    options: [
      "Un retard de livraison d’une semaine sur le calendrier prévisionnel du projet",
      "Une faiblesse de sécurité dans le code source susceptible d’être exploitée par un attaquant",
      "Une absence de commentaire textuel au-dessus d’une fonction de calcul simple",
      "Une simple maladresse de style typographique sans aucune conséquence technique",
    ],
    correctIndex: 1,
    explanation: "Une vulnérabilité est une faille de sécurité (ex: injection SQL, cross-site scripting) qui expose l’application à un risque de piratage."
  },
  {
    id: "p4-22",
    partId: "part4",
    difficulty: "comprehension",
    tag: "SonarQube",
    question: "Quelle chaîne séquentielle décrit le flux classique d’analyse automatisée avec SonarQube ?",
    options: [
      "Installation Windows ➔ Configuration routeur ➔ Création de branche ➔ Analyse manuelle",
      "Réunion d’équipe ➔ Rédaction Jira ➔ Envoi par email ➔ Impression sur support papier",
      "Code modifié ➔ Exécution du pipeline CI avec SonarScanner ➔ Publication sur SonarQube",
      "Diagramme Gantt ➔ Calcul PERT ➔ Commande Git push ➔ Déploiement physique serveur",
    ],
    correctIndex: 2,
    explanation: "L’analyse industrielle s’insère dans le pipeline : le code poussé est inspecté par SonarScanner qui publie son rapport sur le serveur SonarQube."
  },
  {
    id: "p4-23",
    partId: "part4",
    difficulty: "application",
    tag: "Commandes Git",
    question: "Quel est l’enchaînement canonique pour enregistrer des modifications de fichiers dans l’historique local ?",
    options: [
      "Modifier les fichiers ➔ git push origin main ➔ git init dans le sous-dossier",
      "Modifier les fichiers ➔ git branch --delete ➔ git clone vers le serveur distant",
      "Modifier les fichiers ➔ git status ➔ redémarrer le poste de travail de l’utilisateur",
      "Modifier les fichiers ➔ git add <fichiers> ➔ git commit -m \"message\"",
    ],
    correctIndex: 3,
    explanation: "On commence par modifier le code, on indexe les changements avec `git add`, puis on les valide dans l’historique avec `git commit`."
  },
  {
    id: "p4-24",
    partId: "part4",
    difficulty: "application",
    tag: "Commandes Git",
    question: "Quel est l’ordre logique des opérations pour publier sur le serveur distant un travail accompli en local ?",
    options: [
      "Exécuter un git push puis créer le commit une fois le code envoyé sur le serveur",
      "Exécuter la commande git merge avant même d’avoir créé le moindre fichier source",
      "Finaliser le commit en local (git commit) puis l’expédier au dépôt distant (git push)",
      "Supprimer le dépôt distant puis recréer l’intégralité des branches manuellement",
    ],
    correctIndex: 2,
    explanation: "On ne peut pousser que ce qui est déjà enregistré dans un commit local : d’abord `commit`, puis `push`."
  },
  {
    id: "p4-25",
    partId: "part4",
    difficulty: "comprehension",
    tag: "Dépôt distant",
    question: "Parmi les solutions suivantes, laquelle est couramment employée comme plateforme d’hébergement de dépôts Git distants ?",
    options: [
      "SonarLint",
      "GanttProject",
      "GitLab",
      "Jira Board",
    ],
    correctIndex: 2,
    explanation: "GitLab (comme GitHub ou Bitbucket) est un service distant d’hébergement et de collaboration pour dépôts Git."
  },
  {
    id: "p4-26",
    partId: "part4",
    difficulty: "comprehension",
    tag: "Branches Git",
    question: "À quoi sert l’opération de « Merge » (fusion) dans la gestion de branches Git ?",
    options: [
      "Intégrer l’historique et les modifications d’une branche source dans une branche cible",
      "Compiler les fichiers sources pour produire un exécutable binaire autonome",
      "Supprimer définitivement l’ensemble des comptes utilisateurs inactifs du serveur",
      "Calculer la moyenne des notes obtenues par les stagiaires lors des examens",
    ],
    correctIndex: 0,
    explanation: "Le merge réunit deux branches d’historique distinctes en intégrant les modifications de l’une dans l’autre."
  },
  {
    id: "p4-27",
    partId: "part4",
    difficulty: "trap",
    tag: "Commandes Git",
    question: "Lorsqu’un fichier apparaît sous la mention « Untracked files » dans `git status`, que cela signifie-t-il ?",
    options: [
      "Le serveur SonarQube a supprimé le fichier en raison d’un taux de duplication élevé",
      "Le fichier est présent sur le disque mais Git ne le suit pas encore dans son historique",
      "Le fichier est endommagé et ne peut plus être ouvert par aucun logiciel de l’ordinateur",
      "Le fichier a déjà été poussé sur les serveurs de production sécurisés de l’entreprise",
    ],
    correctIndex: 1,
    explanation: "Untracked indique simplement que Git ignore ce fichier : il faut exécuter `git add` pour commencer à tracer son historique."
  },
  {
    id: "p4-28",
    partId: "part4",
    difficulty: "comprehension",
    tag: "Branches Git",
    question: "Pourquoi est-il fortement recommandé de ne jamais coder directement sur la branche principale « main » en équipe ?",
    options: [
      "Parce que Git bloque automatiquement toute commande saisie par un développeur",
      "Pour empêcher le serveur de sauvegarder les modifications dans la base de données",
      "Parce que la branche main ne peut contenir qu’un seul fichier source au maximum",
      "Pour conserver une branche principale toujours stable, testée et prête au déploiement",
    ],
    correctIndex: 3,
    explanation: "En passant par des branches dédiées et des revues de code (Merge Requests), on garantit que la branche `main` reste en permanence intègre et exploitable."
  },
  {
    id: "p4-29",
    partId: "part4",
    difficulty: "comprehension",
    tag: "Qualité logicielle",
    question: "Pourquoi est-il stratégique d’intégrer les contrôles de qualité SonarQube au plus tôt dans la chaîne d’intégration continue ?",
    options: [
      "Pour détecter et corriger les défauts immédiatement, réduisant ainsi drastiquement le coût de correction",
      "Pour supprimer définitivement l’étape de recette menée avec les utilisateurs finaux",
      "Pour obliger les ingénieurs à travailler uniquement pendant les heures de nuit",
      "Pour interdire aux clients d’avoir accès au code source développé par l’équipe",
    ],
    correctIndex: 0,
    explanation: "Plus un défaut est détecté tôt (idéalement dès la Merge Request), plus il est facile, rapide et économique à corriger."
  },
  {
    id: "p4-30",
    partId: "part4",
    difficulty: "comprehension",
    tag: "SonarQube",
    question: "Dans SonarQube, que désigne un « Code Smell » (mauvaise odeur de code) ?",
    options: [
      "Un code confus ou sous-optimal qui nuit à la maintenabilité future sans être un bogue immédiat",
      "Un fichier texte dont la taille dépasse la limite de mémoire autorisée par le navigateur",
      "Une alerte indiquant que la connexion au réseau internet a été interrompue brutalement",
      "Une défaillance physique des composants matériels situés sur la carte mère du serveur",
    ],
    correctIndex: 0,
    explanation: "Un code smell n’empêche pas le programme de tourner, mais complique sa compréhension, sa maintenance et favorise l’apparition future de bogues."
  }
];
