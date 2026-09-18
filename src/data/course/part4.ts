import { CoursePart } from '../../types';

export const coursePart4: CoursePart = {
  id: 'part4',
  orderNumber: 4,
  title: 'Git · GitLab & SonarQube',
  subtitle: 'Gestion de versions distribuée, travail en branches, résolution de conflits et qualité de code avec SonarQube',
  description: 'Ce module détaille le cycle de vie du code source en entreprise : architecture des 4 zones Git (Working Directory, Staging, Local Repo, Remote), commandes fondamentales, stratégies de branches, gestion sereine des conflits de fusion, distinction Git vs plateformes d’hébergement (GitLab/GitHub) et analyse de qualité statique automatisée avec SonarQube.',
  iconName: 'GitBranch',
  colorTheme: 'secondary',
  sections: [
    {
      id: 'p4-s1',
      order: '01',
      title: 'Architecture de Git : Les 4 Zones de Travail',
      definition: 'Git est un système de contrôle de versions distribué (DVCS) qui enregistre l’historique complet des modifications de fichiers dans un dépôt local et synchronise ces changements avec un dépôt distant.',
      explanation: 'Contrairement aux anciens outils centralisés (comme SVN), chaque développeur dispose sur son ordinateur de tout l’historique du projet. Pour enregistrer du travail, le code traverse 4 zones successives : le répertoire de travail où l’on modifie les fichiers, la zone d’index (Staging) où l’on prépare le commit, le dépôt local où le commit est figé dans l’historique, et le dépôt distant (sur GitLab/GitHub).',
      deepExplanation: 'Sous le capot, Git est un système de fichiers adressable par contenu (Content-Addressable Filesystem). Chaque modification est identifiée par un hash cryptographique SHA-1 ou SHA-256 unique. La force de Git réside dans la séparation stricte entre la zone de travail non suivie, la Staging Area (fichier d’index binaire `.git/index` qui vous permet de créer des commits atomiques et précis), la base d’objets locale `.git/objects` (contenant les Blobs, Trees et Commits), et le miroir distant (Remote). Dans les examens OFPPT, une question récurrente teste la compréhension du fait qu’un commit sans `git push` n’a strictement aucun impact sur le serveur distant ni sur le travail des collègues.',
      examples: [
        'Étape 1 : Le développeur modifie `auth.js` dans son éditeur (Working Directory).',
        'Étape 2 : Il exécute `git add auth.js` (le fichier passe dans la Staging Area).',
        'Étape 3 : Il valide avec `git commit -m "feat: login avec JWT"` (enregistré dans le Local Repository).',
        'Étape 4 : Il envoie ses commits à l’équipe avec `git push origin main` (Remote Repository).'
      ],
      realWorldCase: {
        company: 'CDG Capital (Caisse de Dépôt et de Gestion Maroc)',
        sector: 'Banque d’Affaires & Investissement Public',
        problem: 'Lors de développements logiciels financiers critiques impliquant plusieurs prestataires externes, des écrasements de code non tracés et des pertes de modifications survenaient sur des dossiers réseau partagés.',
        agileSolution: 'Migration intégrale vers Git et GitLab Server sécurisé On-Premise. Mise en place de règles de protection de branches (interdiction de push direct sur main) et formation des équipes aux 4 zones Git.',
        concreteResult: 'Traçabilité absolue à 100% de chaque ligne de code modifiée (qui, quand, pourquoi via commit signé), zéro perte de données et conformité aux audits stricts de Bank Al-Maghrib.'
      },
      model3D: 'git_3d',
      videos: {
        fr: {
          youtubeId: '2nL3nK8JbO4',
          title: 'Comprendre Git en 15 Minutes : Les 4 Zones et les Commandes Indispensables',
          channel: 'Grafikart.fr',
          duration: '16:30',
          language: 'fr',
          summary: 'Tutoriel clair et pédagogique expliquant la mécanique interne de Git : Working Directory, Index, Dépôt local et distant, avec les commandes `git add`, `git commit`, `git push` et `git status`.',
          keyPoints: [
            'Le rôle crucial de la zone d’index (Staging) pour découper ses commits proprement',
            'Comment Git stocke les snapshots de fichiers sous forme d’arborescence',
            'Les erreurs de débutant à éviter avec `git commit` et `git push`'
          ]
        },
        en: {
          youtubeId: 'RGOj5yH7evk',
          title: 'Git and GitHub for Beginners - Crash Course',
          channel: 'freeCodeCamp.org',
          duration: '1:08:45',
          language: 'en',
          summary: 'The world-famous complete Git beginner guide: staging area mechanics, commit trees, remotes, and essential daily commands.',
          keyPoints: [
            'Understanding the 4 Git working zones and SHA hashes',
            'Configuring SSH keys and remote repositories safely',
            'Best practices for meaningful, atomic commit messages'
          ]
        }
      },
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
        'Supprimer définitivement les fichiers modifiés par erreur dans le projet',
        'Envoyer instantanément les modifications vers le serveur distant GitLab',
        'Créer un compte utilisateur sur la plateforme cloud de l’entreprise',
        'Placer des modifications spécifiques dans la zone d’index (Staging Area) avant le commit',
      ],
        correctIndex: 3,
        explanation: 'La commande `git add` prépare les changements en les indexant dans la Staging Area avant de les enregistrer dans l’historique avec `git commit`.'
      }
    },
    {
      id: 'p4-s2',
      order: '02',
      title: 'Branches, Fusion (Merge) et Résolution de Conflits',
      definition: 'Une branche est un pointeur mobile vers un commit, permettant d’isoler le développement d’une fonctionnalité sans polluer la branche principale (main). Le merge permet de réintégrer ces changements.',
      explanation: 'Imaginez une voie ferrée qui se sépare en deux voies parallèles pour faire des travaux. Une fois les travaux validés, la voie rejoint la voie principale. Si deux développeurs modifient la même ligne d’un même fichier de façon différente, Git ne peut pas deviner qui a raison : il génère un conflit de merge que le développeur doit arbitrer manuellement.',
      deepExplanation: 'Le merge dans Git utilise des algorithmes d’analyse d’ancêtre commun (généralement recursive merge à 3 sources ou 3-way merge). Si la branche principale n’a pas bougé depuis la création de la branche secondaire, Git effectue un "Fast-Forward" (simple déplacement du pointeur sans nouveau commit). En revanche, si les deux branches ont divergé avec des modifications concurrentes sur les mêmes lignes, Git insère les fameux marqueurs dans le code : `<<<<<<< HEAD` (version de la branche actuelle), `=======` (séparateur central), et `>>>>>>> feature-xyz` (version de la branche fusionnée). La procédure d’examen OFPPT exige 4 actions consécutives : ouvrir l’éditeur, arbitrer le bon code, faire `git add` sur le fichier nettoyé, puis valider avec `git commit`.',
      examples: [
        'Créer et basculer sur une branche : `git checkout -b feature/paiement` ou `git switch -c feature/paiement`.',
        'Fusionner la branche dans main : on se place sur main (`git switch main`) puis on lance `git merge feature/paiement`.',
        'Balises de conflit insérées par Git dans le fichier source :\n<<<<<<< HEAD (ton code sur main)\n=======\n>>>>>>> feature/paiement (le code arrivant).'
      ],
      realWorldCase: {
        company: 'HPS (Hightech Payment Systems Maroc)',
        sector: 'Solutions Monétiques & Switch Bancaire PowerCARD',
        problem: 'Plus de 80 ingénieurs travaillant simultanément sur la plateforme PowerCARD subissaient des blocages majeurs lors des livraisons à cause de conflits de merge mal maîtrisés sur des fichiers de configuration partagés.',
        agileSolution: 'Adoption stricte de la méthodologie GitFlow : branches de fonctionnalités éphémères (`feature/*`), intégration quotidienne dans la branche `develop` et revues de merge automatisées.',
        concreteResult: 'Temps moyen de résolution des conflits divisé par 4, élimination totale des régressions logicielles et livraisons certifiées PCI-DSS sans accroc.'
      },
      model3D: 'git_3d',
      videos: {
        fr: {
          youtubeId: 'gT43pQYJpWw',
          title: 'Git : Maîtriser les Branches, Merges et Résoudre les Conflits sans Paniquer',
          channel: 'Lior Chamla',
          duration: '18:40',
          language: 'fr',
          summary: 'Démonstration en direct de la création de branches, de la fusion Fast-Forward vs 3-way merge, et de la résolution pas à pas d’un conflit de merge complexe dans VS Code.',
          keyPoints: [
            'Créer, basculer et supprimer des branches locales et distantes',
            'Comprendre l’origine des conflits de fusion sur les mêmes lignes de code',
            'La procédure infaillible pour résoudre, tester et commiter un merge sereinement'
          ]
        },
        en: {
          youtubeId: 'JTE2GnXmbKA',
          title: 'How to Resolve Merge Conflicts in Git & GitHub (Step-by-Step)',
          channel: 'Kevin Stratvert',
          duration: '12:15',
          language: 'en',
          summary: 'Clear visual demonstration on what causes Git merge conflicts, how Git flags conflicting code blocks, and how to resolve them safely.',
          keyPoints: [
            'Differentiating between Fast-forward merges and recursive merge commits',
            'Reading Git conflict markers like a senior software engineer',
            'Staging and completing the merge commit with zero lost work'
          ]
        }
      },
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
        'Créer un nouveau ticket dans Jira avec la priorité bloquante',
        'Éteindre le serveur distant GitLab pendant au moins une heure',
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
      deepExplanation: 'Git fonctionne de manière totalement autonome en local, même sans carte réseau ni connexion Internet. GitLab et GitHub exploitent le protocole Git mais y superposent une couche applicative complète pour les équipes : Merge Requests (sur GitLab) ou Pull Requests (sur GitHub) permettant une relecture de code par les pairs avant intégration, tableaux Kanban d’issues, wikis, gestion fine des droits d’accès (RBAC) et pipelines d’automatisation (GitLab CI, GitHub Actions). Pour les entreprises marocaines soumises à la souveraineté des données bancaires et administratives, GitLab Community Edition On-Premise est massivement privilégié.',
      examples: [
        'Git : s’exécute avec des commandes comme `git status` sans même avoir besoin d’une connexion Internet.',
        'GitLab : offre une interface web, la gestion des Merge Requests, un registre Docker et GitLab CI/CD pour automatiser les tests.',
        'GitHub : plateforme d’hébergement rachetée par Microsoft, très populaire dans l’Open Source, avec GitHub Actions.'
      ],
      realWorldCase: {
        company: 'Ministère de la Transition Numérique et de la Réforme de l’Administration (Maroc)',
        sector: 'Gouvernement & Administration Électronique',
        problem: 'Nécessité d’héberger souverainement le code source de tous les portails publics nationaux sur le territoire marocain sans dépendre de serveurs cloud hébergés à l’étranger.',
        agileSolution: 'Déploiement d’une instance GitLab Community Edition auto-hébergée dans le Data Center gouvernemental sécurisé avec authentification centralisée et accès chiffrés.',
        concreteResult: 'Souveraineté numérique totale garantie pour plus de 300 projets de digitalisation administrative et gestion collaborative unifiée pour des centaines d’ingénieurs fonctionnaires et prestataires.'
      },
      videos: {
        fr: {
          youtubeId: 'f0f7G03yD50',
          title: 'Git vs GitHub vs GitLab : Quelle est la VRAIE Différence ?',
          channel: 'Cookie Connecté',
          duration: '11:05',
          language: 'fr',
          summary: 'Une comparaison limpide qui élimine toutes les confusions d’examen entre l’outil de versionnement Git et les plateformes web collaboratives GitLab et GitHub.',
          keyPoints: [
            'Git est le moteur local fonctionnant hors ligne sur votre ordinateur',
            'GitLab et GitHub apportent l’hébergement distant, les revues de code et les wikis',
            'Pourquoi les entreprises choisissent GitLab pour son moteur CI/CD intégré et son auto-hébergement'
          ]
        },
        en: {
          youtubeId: '2ReR1YJrNOM',
          title: 'Git vs GitHub: What’s the Difference? Explained in 5 Minutes',
          channel: 'TechWorld with Nana',
          duration: '06:50',
          language: 'en',
          summary: 'Nana breaks down the fundamental differences between Git as a version control system and web-based Git repository hosting services.',
          keyPoints: [
            'Local version control architecture vs centralized cloud collaboration',
            'Pull Requests and code reviews in team environments',
            'Ecosystem integration: issue tracking, CI pipelines, and deployment webhooks'
          ]
        }
      },
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
        'Ce sont deux versions identiques développées par la même équipe Scrum sous deux marques différentes',
        'Git ne fonctionne que sur Windows tandis que GitLab est une distribution Linux pour serveurs',
        'Git est l’outil de gestion de versions local, GitLab est une plateforme web d’hébergement et de CI/CD',
        'GitLab est un langage de programmation compilé alors que Git est un simple serveur de base de données',
      ],
        correctIndex: 2,
        explanation: 'Git est l’outil de versionnement distribué ; GitLab est une plateforme collaborative web qui héberge les dépôts Git et propose des outils DevOps comme GitLab CI.'
      }
    },
    {
      id: 'p4-s4',
      order: '04',
      title: 'SonarQube : Maîtriser la Qualité du Code',
      definition: 'SonarQube est une plateforme d’analyse statique continue du code source (SAST) détectant automatiquement les bugs, vulnérabilités de sécurité, mauvaises pratiques (code smells) et calculant la dette technique.',
      explanation: 'Écrire du code qui compile ne suffit pas : il faut qu’il soit maintenable, sécurisé et sans failles. SonarQube scanne le code source sans l’exécuter. Il attribue une note de maintenabilité (A à E) et vérifie si le projet passe la "Quality Gate" (barrière qualité indispensable pour valider une mise en production).',
      deepExplanation: 'SonarQube inspecte le code à l’aide de règles d’analyse syntaxique et sémantique (AST - Abstract Syntax Tree). Il catégorise les anomalies en 3 types majeurs : 1. Bugs (erreurs logiques réelles comme une fuite mémoire ou un NullPointer), 2. Vulnérabilités (failles de cybersécurité exploitables telles qu’une injection SQL ou un secret codé en dur), et 3. Code Smells (défauts de conception comme une duplication de code ou une méthode de 300 lignes qui augmente la dette technique). La "Quality Gate" définit le contrat de passage : par exemple, exiger 0 nouvelle vulnérabilité critique et une couverture de tests supérieure à 80% sur le code nouveau (Clean as You Code). Si la Quality Gate échoue, le pipeline de déploiement est immédiatement stoppé.',
      examples: [
        'Bug : boucle infinie potentielle ou déréférencement d’un pointeur null en Java/PHP.',
        'Vulnérabilité : injection SQL directe dans une requête ou mot de passe écrit en clair dans le code source.',
        'Code Smell (Mauvaise odeur) : fonction de 250 lignes avec 10 boucles imbriquées (dette technique élevée).',
        'Taux de couverture (Coverage) : pourcentage du code testé par les tests unitaires (objectif courant : > 80%).'
      ],
      realWorldCase: {
        company: 'Crédit du Maroc (Groupe Holmarcom)',
        sector: 'Secteur Bancaire & FinTech',
        problem: 'Des vulnérabilités de sécurité et des failles d’injection SQL étaient découvertes tardivement lors des audits de sécurité trimestriels, entraînant des pénalités financières et des arrêts de service d’urgence.',
        agileSolution: 'Intégration systématique du scanner SonarQube dans la chaîne de build avec une Quality Gate stricte bloquant tout merge en cas de faille de criticité "High" ou "Blocker".',
        concreteResult: 'Réduction de 90% des failles de sécurité avant mise en production, dette technique réduite de 45 jours à moins de 3 jours homme, et conformité de sécurité bancaire validée sans réserve.'
      },
      videos: {
        fr: {
          youtubeId: '2K3U3p9K_9w',
          title: 'SonarQube : Analyser et Améliorer la Qualité de son Code en Entreprise',
          channel: 'Devoxx France / Tech Tutoriels',
          duration: '14:20',
          language: 'fr',
          summary: 'Présentation complète de SonarQube : tableau de bord, analyse de la dette technique, configuration d’une Quality Gate et détection des bugs et vulnérabilités de sécurité.',
          keyPoints: [
            'Comprendre les 3 types d’anomalies : Bugs, Failles de sécurité et Code Smells',
            'Le calcul de la dette technique et du taux de duplication de code',
            'Comment la Quality Gate bloque automatiquement un code non conforme avant la production'
          ]
        },
        en: {
          youtubeId: '3uY0sYw4hEU',
          title: 'SonarQube in 10 Minutes | Code Quality & Security Analysis',
          channel: 'DevOps Journey',
          duration: '10:55',
          language: 'en',
          summary: 'Comprehensive overview of SonarQube architecture, running code scanners, understanding metrics, and establishing automated Quality Gates.',
          keyPoints: [
            'Static application security testing (SAST) principles',
            'Interpreting maintainability, reliability, and security ratings (A to E)',
            'Failing CI/CD pipelines automatically on Quality Gate violations'
          ]
        }
      },
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
        'La liste des mots de passe des administrateurs système du projet',
        'Un ensemble de critères de qualité indispensables qu’un projet doit valider pour être jugé livrable',
        'La porte d’entrée sécurisée par badge du centre de données hébergeant les serveurs',
        'Une méthode de calcul de chemin critique utilisée lors de la planification PERT',
      ],
        correctIndex: 1,
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
