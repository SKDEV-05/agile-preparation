import { CoursePart } from '../../types';

export const coursePart4: CoursePart = {
  id: 'part4',
  orderNumber: 4,
  title: 'Git · GitLab & SonarQube',
  subtitle: 'Gestion de versions distribuée, travail en branches, résolution de conflits et qualité de code avec SonarQube',
  description: 'Ce module détaille le cycle de vie du code source en entreprise : architecture des 4 zones Git (Working Directory, Staging, Local Repo, Remote), commandes fondamentales, stratégies de branches, gestion sereine des conflits de fusion, distinction Git vs plateformes d’hébergement (GitLab/GitHub) et analyse de qualité statique automatisée avec SonarQube.',
  iconName: 'GitBranch',
  colorTheme: 'amber',
  sections: [
    {
      id: 'p4-s1',
      order: '01',
      title: 'Architecture de Git : Les 4 Zones de Travail',
      definition: 'Git est un système de contrôle de versions distribué (DVCS) qui enregistre l’historique complet des modifications de fichiers dans un dépôt local et synchronise ces changements avec un dépôt distant.',
      explanation: 'Contrairement aux anciens outils centralisés (comme SVN), chaque développeur dispose sur son ordinateur de tout l’historique du projet. Pour enregistrer du travail, le code traverse 4 zones successives : le répertoire de travail où l’on modifie les fichiers, la zone d’index (Staging) où l’on prépare le commit, le dépôt local où le commit est figé dans l’historique, et le dépôt distant (sur GitLab/GitHub).',
      examples: [
        'Étape 1 : Le développeur modifie `auth.js` dans son éditeur (Working Directory).',
        'Étape 2 : Il exécute `git add auth.js` (le fichier passe dans la Staging Area).',
        'Étape 3 : Il valide avec `git commit -m "feat: login avec JWT"` (enregistré dans le Local Repository).',
        'Étape 4 : Il envoie ses commits à l’équipe avec `git push origin main` (Remote Repository).'
      ],
      keyPoints: [
        'Working Directory : fichiers modifiables sur le disque dur de la machine locale.',
        'Staging Area (Index) : zone tampon où l’on sélectionne précisément les modifications prêtes à être commitées.',
        'Local Repository : base de données locale (.git) contenant tous les commits et l’historique.',
        'Remote Repository : serveur distant (GitLab, GitHub) partagé par toute l’équipe.',
        'Commandes clés : `git init`, `git status`, `git add`, `git commit`, `git push`, `git pull`.'
      ],
      traps: [
        'Faire un `git commit` n’envoie PAS le code sur Internet ! Le commit est strictement local tant qu’on n’a pas exécuté `git push` (piège EFM n°1).',
        'Un fichier dit "untracked" est un fichier présent dans le dossier mais non encore suivi par Git (il faut faire `git add`).'
      ],
      examContext: 'Question EFM très fréquente : ordonner correctement les étapes du cycle Git ou identifier le rôle précis de la commande `git add`.',
      diagramType: 'git_flow',
      miniQuestion: {
        question: 'À quoi sert précisément la commande "git add" dans le cycle de travail Git ?',
        options: [
          'Placer des modifications spécifiques dans la zone d’index (Staging Area) avant le commit',
          'Envoyer instantanément les modifications vers le serveur distant GitLab',
          'Supprimer définitivement les fichiers modifiés par erreur dans le projet',
          'Créer un compte utilisateur sur la plateforme cloud de l’entreprise'
        ],
        correctIndex: 0,
        explanation: 'La commande `git add` prépare les changements en les indexant dans la Staging Area avant de les enregistrer dans l’historique avec `git commit`.'
      }
    },
    {
      id: 'p4-s2',
      order: '02',
      title: 'Branches, Fusion (Merge) et Résolution de Conflits',
      definition: 'Une branche est un pointeur mobile vers un commit, permettant d’isoler le développement d’une fonctionnalité sans polluer la branche principale (main). Le merge permet de réintégrer ces changements.',
      explanation: 'Imaginez une voie ferrée qui se sépare en deux voies parallèles pour faire des travaux. Une fois les travaux validés, la voie rejoint la voie principale. Si deux développeurs modifient la même ligne d’un même fichier de façon différente, Git ne peut pas deviner qui a raison : il génère un conflit de merge que le développeur doit arbitrer manuellement.',
      examples: [
        'Créer et basculer sur une branche : `git checkout -b feature/paiement` ou `git switch -c feature/paiement`.',
        'Fusionner la branche dans main : on se place sur main (`git switch main`) puis on lance `git merge feature/paiement`.',
        'Balises de conflit insérées par Git dans le fichier source :\n<<<<<<< HEAD (ton code sur main)\n=======\n>>>>>>> feature/paiement (le code arrivant).'
      ],
      keyPoints: [
        'Les branches évitent les régressions et permettent à plusieurs développeurs de travailler en parallèle.',
        'La branche par défaut s’appelle généralement `main` (ou historiquement `master`).',
        'Résolution de conflit : 1. Ouvrir le fichier en conflit, 2. Choisir le bon code et supprimer les balises <<<< ==== >>>> , 3. `git add` le fichier résolu, 4. `git commit` pour finaliser le merge.'
      ],
      traps: [
        'Un conflit n’est pas un bug : c’est un comportement normal et sain de Git pour protéger le code contre les écrasements involontaires.',
        'Avant de fusionner une branche dans main, il faut toujours s’assurer d’être positionné sur la branche cible (`main`).'
      ],
      examContext: 'Question EFM : décrire la procédure exacte étape par étape pour résoudre un conflit de fusion Git.',
      miniQuestion: {
        question: 'Que doit impérativement faire le développeur après avoir nettoyé manuellement les balises de conflit dans un fichier source ?',
        options: [
          'Exécuter "git add" sur le fichier résolu puis créer le commit de fusion',
          'Supprimer complètement le dossier caché .git pour réinitialiser le projet',
          'Éteindre le serveur distant GitLab pendant au moins une heure',
          'Créer un nouveau ticket dans Jira avec la priorité bloquante'
        ],
        correctIndex: 0,
        explanation: 'Une fois le fichier nettoyé des marqueurs de conflit, il faut l’indexer avec `git add` pour signaler à Git que le conflit est résolu, puis enregistrer avec `git commit`.'
      }
    },
    {
      id: 'p4-s3',
      order: '03',
      title: 'Git vs GitLab vs GitHub : Ne pas confondre',
      definition: 'Git est le logiciel moteur de versionnement en ligne de commande. GitLab et GitHub sont des services web tiers qui hébergent des dépôts Git distants et ajoutent des outils collaboratifs (CI/CD, gestion de tickets, revues de code).',
      explanation: 'C’est exactement la même différence qu’entre un moteur automobile et un parking : Git est le moteur (installé localement sur votre terminal), tandis que GitLab et GitHub sont des plateformes hébergées dans le cloud ou sur un serveur d’entreprise.',
      examples: [
        'Git : s’exécute avec des commandes comme `git status` sans même avoir besoin d’une connexion Internet.',
        'GitLab : offre une interface web, la gestion des Merge Requests, un registre Docker et GitLab CI/CD pour automatiser les tests.',
        'GitHub : plateforme d’hébergement rachetée par Microsoft, très populaire dans l’Open Source, avec GitHub Actions.'
      ],
      keyPoints: [
        'Git = protocole et outil CLI libre créé par Linus Torvalds en 2005.',
        'GitLab / GitHub = plateformes d’hébergement collaboratif et de DevOps.',
        'Merge Request (GitLab) / Pull Request (GitHub) : demande formelle de relecture par un pair avant fusion dans la branche protégée.',
        'Git fonctionne parfaitement en local sans aucun serveur distant.'
      ],
      traps: [
        'Énorme piège EFM : dire que "GitLab est une commande Git". Non, GitLab est un service web complet.',
        'GitLab n’est pas payant par obligation : il existe une version libre auto-hébergeable (Community Edition).'
      ],
      examContext: 'Question d’examen classique : "Quelle est la différence fondamentale entre Git et GitLab ?".',
      miniQuestion: {
        question: 'Laquelle des propositions suivantes définit avec exactitude la relation entre Git et GitLab ?',
        options: [
          'Git est l’outil de gestion de versions local, GitLab est une plateforme web d’hébergement et de CI/CD',
          'GitLab est un langage de programmation compilé alors que Git est un simple serveur de base de données',
          'Git ne fonctionne que sur Windows tandis que GitLab est une distribution Linux pour serveurs',
          'Ce sont deux versions identiques développées par la même équipe Scrum sous deux marques différentes'
        ],
        correctIndex: 0,
        explanation: 'Git est l’outil de versionnement distribué ; GitLab est une plateforme collaborative web qui héberge les dépôts Git et propose des outils DevOps comme GitLab CI.'
      }
    },
    {
      id: 'p4-s4',
      order: '04',
      title: 'SonarQube : Maîtriser la Qualité du Code',
      definition: 'SonarQube est une plateforme d’analyse statique continue du code source (SAST) détectant automatiquement les bugs, vulnérabilités de sécurité, mauvaises pratiques (code smells) et calculant la dette technique.',
      explanation: 'Écrire du code qui compile ne suffit pas : il faut qu’il soit maintenable, sécurisé et sans failles. SonarQube scanne le code source sans l’exécuter. Il attribue une note de maintenabilité (A à E) et vérifie si le projet passe la "Quality Gate" (barrière qualité indispensable pour valider une mise en production).',
      examples: [
        'Bug : boucle infinie potentielle ou déréférencement d’un pointeur null en Java/PHP.',
        'Vulnérabilité : injection SQL directe dans une requête ou mot de passe écrit en clair dans le code source.',
        'Code Smell (Mauvaise odeur) : fonction de 250 lignes avec 10 boucles imbriquées (dette technique élevée).',
        'Taux de couverture (Coverage) : pourcentage du code testé par les tests unitaires (objectif courant : > 80%).'
      ],
      keyPoints: [
        'Bug : erreur de code pouvant causer un plantage ou un comportement erroné.',
        'Vulnérabilité (Vulnerability) : faille de sécurité exploitable par un attaquant.',
        'Code Smell : code confus ou mal structuré qui ralentit les futurs développements (dette technique).',
        'Quality Gate : ensemble de critères stricts (ex: 0 bug bloquant, couverture > 80%) conditionnant la validation du build.',
        'Trio Sonar : SonarLint (extension dans VS Code), SonarScanner (exécutable dans la CI), SonarQube (tableau de bord centralisé).'
      ],
      traps: [
        'SonarQube n’est pas un compilateur ni un outil de gestion de tickets de projet (ce n’est pas Jira).',
        'SonarLint analyse le code en temps réel dans votre IDE, tandis que SonarQube centralise les rapports de toute l’équipe sur serveur.'
      ],
      examContext: 'Question EFM : définir la notion de Quality Gate ou distinguer Bug, Vulnérabilité et Code Smell.',
      miniQuestion: {
        question: 'Dans SonarQube, que désigne le concept de "Quality Gate" ?',
        options: [
          'Un ensemble de critères de qualité indispensables qu’un projet doit valider pour être jugé livrable',
          'La porte d’entrée sécurisée par badge du centre de données hébergeant les serveurs',
          'La liste des mots de passe des administrateurs système du projet',
          'Une méthode de calcul de chemin critique utilisée lors de la planification PERT'
        ],
        correctIndex: 0,
        explanation: 'La Quality Gate est un ensemble d’indicateurs seuils (ex: couverture minimale, zéro vulnérabilité critique) garantissant que le code respecte les standards avant livraison.'
      }
    }
  ],
  practicalCase: {
    title: 'Cas Pratique : Revue de code et analyse qualité automatisée',
    scenario: 'Deux stagiaires développent un module d’authentification. Stagiaire 1 pousse sa branche `feature/auth` sur GitLab. Le pipeline déclenche automatiquement l’analyse SonarScanner. SonarQube signale une "Quality Gate FAILED" avec 1 vulnérabilité critique (clé secrète JWT en clair) et 15% de duplication.',
    challenge: 'Expliquez comment l’équipe doit réagir selon les bonnes pratiques Git et SonarQube.',
    solutionPoints: [
      'Bloquer le merge : La Merge Request ne doit pas être fusionnée dans `main` tant que la Quality Gate est rouge.',
      'Résolution de la vulnérabilité : Remplacer la clé en clair par une variable d’environnement sécurisée dans GitLab CI.',
      'Refactoring : Factoriser les portions de code dupliquées pour abaisser le taux de duplication sous le seuil autorisé (ex: < 3%).',
      'Nouveau commit et re-scan : Le développeur pousse un commit correctif. Le pipeline réexécute SonarQube : la Quality Gate passe au vert, la revue par les pairs est acceptée et le merge peut avoir lieu.'
    ]
  },
  keyTakeaways: [
    'Git orchestre 4 zones : Répertoire de travail ➔ Staging Area ➔ Dépôt local ➔ Dépôt distant.',
    '`git commit` enregistre en local ; seul `git push` transfère sur le serveur distant.',
    'Les conflits de merge se résolvent manuellement en nettoyant les balises, puis `git add` et `git commit`.',
    'SonarQube analyse la qualité du code (bugs, vulnérabilités, code smells, duplication) et applique la Quality Gate.'
  ],
  commonTraps: [
    'Penser qu’un `git commit` envoie automatiquement le code sur GitLab.',
    'Confondre Git (logiciel de versionnement) et GitLab (plateforme web complète).',
    'Ignorer les alertes de sécurité SonarQube au motif que le code "fonctionne".'
  ]
};
