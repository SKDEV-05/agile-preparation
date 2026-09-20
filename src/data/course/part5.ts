import { CoursePart } from '../../types';

export const coursePart5: CoursePart = {
  id: 'part5',
  orderNumber: 5,
  title: 'DevOps · CI/CD · GitLab CI',
  subtitle: 'Culture collaborative, modèle CALMS, automatisation des tests et conception de pipelines avec .gitlab-ci.yml',
  description: 'Ce module relie l’agilité au déploiement en production : les origines et la culture DevOps, le modèle de maturité CALMS (Culture, Automation, Lean, Measurement, Sharing), la distinction rigoureuse entre Intégration Continue (CI), Livraison Continue et Déploiement Continu (CD), ainsi que la syntaxe opérationnelle des pipelines GitLab CI.',
  iconName: 'Rocket',
  colorTheme: 'primary',
  sections: [
    {
      id: 'p5-s1',
      order: '01',
      title: 'La Culture DevOps et le Modèle CALMS',
      definition: 'DevOps est un mouvement culturel, organisationnel et technique combinant le développement logiciel (Dev) et l’exploitation des systèmes (Ops) afin de raccourcir le cycle de livraison tout en garantissant une haute fiabilité.',
      explanation: 'Historiquement, les développeurs voulaient introduire vite des nouveautés (changement), tandis que les exploitants système voulaient protéger la stabilité des serveurs (pas de changement). Ce "mur de la confusion" provoquait des conflits et des retards. DevOps brise ce silo en instaurant une responsabilité partagée du code jusqu’à la production.',
      deepExplanation: 'DevOps n’est ni un poste ni un outil logiciel que l’on achète, mais un changement profond de paradigme résumé par le modèle CALMS formalisé par Jez Humble : Culture (démantèlement des silos, empathie et post-mortems sans blâme), Automation (automatisation systématique des tâches répétitives de build, de test et de provisionnement d’infrastructure), Lean (réduction drastique de la taille des lots et limitation du travail en cours pour fluidifier le flux de valeur), Measurement (suivi rigoureux des 4 métriques DORA : Fréquence de déploiement, Délai de mise en production, Taux d’échec des changements, et Temps moyen de rétablissement MTTR), et Sharing (partage ouvert des outils, des réussites et des incidents). À l’examen OFPPT, vous devez être capable de citer chaque lettre et de relier la culture DevOps à la satisfaction de l’utilisateur final.',
      examples: [
        'Avant DevOps : les développeurs envoyaient un fichier ZIP aux Ops par email le vendredi soir. En cas de panne le week-end, les Ops accusaient les Devs et inversement.',
        'Avec DevOps : les développeurs et administrateurs travaillent ensemble sur une chaîne automatisée unique : si le pipeline casse, toute l’équipe est immédiatement prévenue et corrige ensemble.'
      ],
      realWorldCase: {
        company: 'Inwi Telecom Maroc',
        sector: 'Opérateur Télécoms & Cloud Computing',
        problem: 'Les livraisons de nouvelles fonctionnalités pour les forfaits mobiles prenaient 4 semaines et nécessitaient une coupure nocturne de service (downtime), provoquant des réclamations clients et du stress pour les équipes.',
        agileSolution: 'Mise en œuvre du modèle CALMS : création d’équipes pluridisciplinaires Dev+Ops, automatisation complète des déploiements et suivi des métriques DORA sur dashboards partagés.',
        concreteResult: 'Fréquence de déploiement multipliée par 8 (plusieurs livraisons par semaine sans interruption de service), et temps moyen de rétablissement (MTTR) réduit de 4 heures à moins de 15 minutes.'
      },
      model3D: 'devops_3d',
      videos: {
        fr: {
          youtubeId: 'oE6nQ5H7K0M',
          title: 'Comprendre DevOps et le Modèle CALMS en 10 Minutes',
          channel: 'Mickaël Baron - Université de Poitiers',
          duration: '11:45',
          language: 'fr',
          summary: 'Explication pédagogique claire des origines de DevOps, de la rupture des silos Dev et Ops, et du détail des 5 dimensions du modèle CALMS.',
          keyPoints: [
            'L’origine du mur de la confusion entre développeurs et administrateurs',
            'Les 5 lettres de CALMS : Culture, Automatisation, Lean, Mesure, Partage',
            'Pourquoi DevOps est une culture d’amélioration continue avant d’être une suite d’outils'
          ]
        },
        en: {
          youtubeId: '_I94-tJlovg',
          title: 'What is DevOps? | DevOps Explained in Simple Terms',
          channel: 'IBM Technology',
          duration: '08:35',
          language: 'en',
          summary: 'IBM cloud expert provides a crisp explanation of DevOps culture, continuous delivery pipelines, automation benefits, and reducing lead time.',
          keyPoints: [
            'Breaking down organizational silos and fostering collective responsibility',
            'The continuous delivery flywheel: plan, code, build, test, release, deploy, operate, monitor',
            'Key business outcomes: faster time to market and superior system resilience'
          ]
        }
      },
      keyPoints: [
        'DevOps = Développement (Dev) + Opérations (Ops).',
        'Objectif : livrer plus vite, plus souvent et avec moins d’incidents en production.',
        'C - Culture : collaboration, empathie, confiance et fin des silos organisationnels.',
        'A - Automation : automatisation des builds, tests, analyses de sécurité et déploiements.',
        'L - Lean : élimination des gaspillages et réduction de la taille des lots livrés.',
        'M - Measurement : suivi continu des métriques clés (temps de cycle, taux d’échec des changements).',
        'S - Sharing : partage des connaissances, retours d’expérience (post-mortems) et outils communs.'
      ],
      traps: [
        'DevOps n’est PAS un logiciel que l’on installe : c’est avant tout une culture et une méthodologie.',
        'Le sigle CALMS est très fréquemment demandé à l’EFM : retenez par cœur les 5 mots anglais et leur sens.'
      ],
      examContext: 'Question systématique d’examen : expliciter chaque lettre de l’acronyme CALMS et donner un exemple pour l’automatisation.',
      diagramType: 'devops_cycle',
      miniQuestion: {
        question: 'Dans le modèle CALMS régissant la démarche DevOps, que représente la lettre "M" ?',
        options: [
        'Master (la branche Git principale où tout le monde doit coder sans test)',
        'Migration (le transfert annuel obligatoire des données vers une autre base)',
        'Measurement (la mesure et l’analyse des indicateurs clés de performance)',
        'Management (la hiérarchie obligatoire imposant les heures de travail)',
      ],
        correctIndex: 2,
        explanation: 'Dans CALMS, la lettre M correspond à "Measurement" : mesurer les métriques de fiabilité, de délai et d’erreur pour guider l’amélioration continue.'
      }
    },
    {
      id: 'p5-s2',
      order: '02',
      title: 'CI / CD : Intégration, Livraison et Déploiement Continus',
      definition: 'La CI (Continuous Integration) automatise la compilation et les tests à chaque push. La Livraison Continue (Continuous Delivery) garantit un livrable prêt pour la production. Le Déploiement Continu (Continuous Deployment) pousse automatiquement en production sans intervention humaine.',
      explanation: 'Pensez à un restaurant gastronomique : l’Intégration Continue vérifie que les ingrédients sont frais et cuits à point. La Livraison Continue dresse l’assiette sur le passe-plat, prête à être servie (le maître d’hôtel donne le feu vert d’un clic). Le Déploiement Continu dépose directement l’assiette sur la table du client dès qu’elle est prête, de façon 100% automatique.',
      deepExplanation: 'La distinction entre les 3 concepts est capitale dans le programme OFPPT et fait l’objet de pièges récurrents. En Intégration Continue (CI), chaque développeur pousse ses branches plusieurs fois par jour ; le serveur de CI compile le code, lance les tests unitaires et vérifie la qualité statique en quelques minutes. En Livraison Continue (Continuous Delivery), l’ensemble du flux est automatisé jusqu’au packaging d’artefacts testés et déployés sur un environnement de recette (Staging), mais la mise en production finale est déclenchée manuellement par un clic d’un responsable métier (One-click release). En Déploiement Continu (Continuous Deployment), il n’y a AUCUN clic manuel : tout commit validé par les tests atterrit directement et automatiquement sur les serveurs de production en temps réel.',
      examples: [
        'Continuous Integration (CI) : chaque développeur pousse son code plusieurs fois par jour ; un serveur distant lance automatiquement les tests unitaires et le linter.',
        'Continuous Delivery (CD) : le code qui passe les tests est automatiquement empaqueté en image Docker et déployé sur l’environnement de pré-production (Staging). Un bouton "Déployer en Production" attend le clic d’un responsable.',
        'Continuous Deployment (CD) : aucun bouton manuel ; si tous les tests du pipeline sont au vert, le code est poussé en production réelle en quelques minutes.'
      ],
      realWorldCase: {
        company: 'Avito.ma (Premier site d’annonces au Maroc)',
        sector: 'Marketplace E-Commerce & Web à fort trafic',
        problem: 'Avec plus de 6 millions de visiteurs uniques par mois, les releases volumineuses mensuelles provoquaient des ralentissements et des bugs critiques découverts en direct par les internautes.',
        agileSolution: 'Transition vers le Déploiement Continu (Continuous Deployment) avec tests automatisés E2E, déploiements Canary et Feature Flags permettant d’activer les fonctionnalités progressivement pour un échantillon d’utilisateurs.',
        concreteResult: 'Plus de 25 déploiements quotidiens en production en toute transparence pour les utilisateurs, taux de régression divisé par 5 et rollback instantané en cas d’anomalie.'
      },
      model3D: 'devops_3d',
      videos: {
        fr: {
          youtubeId: 'scEDHsr3APg',
          title: 'CI/CD Expliqué Simplement : Intégration, Livraison et Déploiement Continus',
          channel: 'Captain Dev',
          duration: '13:50',
          language: 'fr',
          summary: 'Une vidéo didactique indispensable pour les examens : comparaison visuelle pas à pas entre la CI, la Livraison Continue (avec bouton manuel) et le Déploiement Continu 100% automatique.',
          keyPoints: [
            'Pourquoi pousser son code plusieurs fois par jour est la base de l’Intégration Continue',
            'La différence capitale entre Continuous Delivery (déclenchement humain) et Continuous Deployment',
            'Comment les tests automatisés protègent la production contre les pannes'
          ]
        },
        en: {
          youtubeId: '42UP1fxi2cg',
          title: 'CI/CD Pipeline Explained | Continuous Integration & Continuous Delivery',
          channel: 'Simplilearn',
          duration: '10:15',
          language: 'en',
          summary: 'A clear guide covering the phases of a modern CI/CD pipeline, artifact versioning, staging gates, and automated deployment pipelines.',
          keyPoints: [
            'Automated compile, linting, unit testing, and integration testing',
            'Artifact creation, container registries, and environment promotion',
            'The critical distinction between manual release triggers and automated continuous deployment'
          ]
        }
      },
      keyPoints: [
        'CI = Intégration Continue (build automatique + tests automatisés systématiques).',
        'Feedback ultra rapide : le développeur sait en 3 minutes si son dernier commit a cassé une fonctionnalité.',
        'Continuous Delivery : le logiciel est toujours dans un état livrable en production (déclenchement final manuel possible).',
        'Continuous Deployment : le déploiement en production finale est lui aussi 100% automatisé.'
      ],
      traps: [
        'Ne confondez JAMAIS Continuous Delivery et Continuous Deployment (la question piège favorite des examens OFPPT) ! Le premier conserve une validation manuelle finale pour la prod, le second est entièrement automatique.',
        'Faire de la CI sans tests automatisés n’a aucun sens (la CI repose sur la validation automatique).'
      ],
      examContext: 'Question EFM récurrente : "Quelle est la nuance exacte entre Continuous Delivery et Continuous Deployment ?".',
      miniQuestion: {
        question: 'Quelle est la différence fondamentale entre Continuous Delivery et Continuous Deployment ?',
        options: [
          'La Livraison Continue désactive les tests automatisés tandis que le Déploiement Continu effectue des tests exhaustifs sur simulateur.',
          'La Livraison Continue s’applique exclusivement aux applications web tandis que le Déploiement Continu gère les systèmes embarqués.',
          'La Livraison Continue exige une réécriture du code source avant chaque mise en ligne tandis que le Déploiement Continu compile à chaud.',
          'La Livraison Continue conserve une validation humaine avant production, tandis que le Déploiement Continu automatise la mise en ligne finale.',
        ],
        correctIndex: 3,
        explanation: 'En Continuous Delivery, le paquet est prêt et validé mais requiert un déclenchement manuel pour aller en prod ; en Continuous Deployment, le flux est intégralement automatisé sans intervention humaine.'
      }
    },
    {
      id: 'p5-s3',
      order: '03',
      title: 'Pipelines GitLab CI : Stages, Jobs et Runners',
      definition: 'Dans GitLab CI, un pipeline est l’orchestration globale des étapes d’automatisation. Il se compose de stages (étapes ordonnées), qui contiennent des jobs (tâches exécutées en parallèle au sein d’un stage), exécutés par des GitLab Runners.',
      explanation: 'Le pipeline est comme une chaîne de montage dans une usine automobile. Les stages sont les grands ateliers qui se succèdent : d’abord l’atelier Châssis (build), puis l’atelier Crash-test (test), puis l’atelier Peinture (package). Si un job échoue dans le stage "test", toute la chaîne s’arrête pour empêcher une voiture défaillante d’aller sur la route.',
      deepExplanation: 'Un pipeline GitLab CI repose sur une relation d’exécution très stricte. Les `stages` (déclarés dans un tableau ordonné) s’exécutent de façon strictement séquentielle : le stage B ne débutera jamais tant que tous les jobs du stage A n’ont pas tous réussi avec succès (code de retour HTTP / exit code 0). En revanche, à l’intérieur d’un même stage, tous les jobs déclarés sont exécutés en parallèle si plusieurs GitLab Runners sont disponibles. Le GitLab Runner est un agent léger (exécuteur Docker, shell local ou VM) qui interroge régulièrement le serveur GitLab pour récupérer des instructions. Pour passer des données (fichiers compilés, rapports) d’un stage à un autre, on utilise le mécanisme d’`artifacts`.',
      examples: [
        'Stage "build" : job `compiler_app` (exécute `npm run build`).',
        'Stage "test" : job `tests_unitaires` (exécute `npm test`) et job `linting` (exécutés en parallèle).',
        'Stage "quality" : job `sonar_scan` (analyse SonarQube avec la Quality Gate).',
        'Stage "deploy" : job `deploy_staging` (envoi sur le serveur de test).'
      ],
      realWorldCase: {
        company: 'Orange Maroc',
        sector: 'Télécoms & Services Mobiles',
        problem: 'Les temps de compilation et de tests des applications de facturation prenaient plus de 45 minutes par commit, décourageant les développeurs de lancer les tests avant de fusionner.',
        agileSolution: 'Architecture de runners GitLab CI parallélisés sur un cluster Kubernetes avec mise en cache optimisée des dépendances (`node_modules` et caches Maven) et exécution concurrente des jobs de test.',
        concreteResult: 'Temps d’exécution du pipeline réduit de 45 minutes à 4 minutes 30, incitant les développeurs à pousser du code testé plusieurs fois par jour.'
      },
      videos: {
        fr: {
          youtubeId: '2b7A9g6c4hM',
          title: 'GitLab CI / CD : Comprendre les Stages, Jobs et Runners de A à Z',
          channel: 'DevOps Facile',
          duration: '17:25',
          language: 'fr',
          summary: 'Guide complet pour appréhender l’écosystème GitLab CI : orchestration des stages, exécution des jobs, rôle des runners Docker et gestion des artifacts partagés.',
          keyPoints: [
            'La hiérarchie essentielle : Pipeline > Stages séquentiels > Jobs parallèles',
            'Comment installer et enregistrer un GitLab Runner avec un token de projet',
            'Gestion des artefacts pour faire passer des livrables de compilation vers les tests'
          ]
        },
        en: {
          youtubeId: 'PGbhGZ_m5n4',
          title: 'GitLab CI/CD Tutorial for Beginners | Stages, Jobs & Docker Runners',
          channel: 'TechWorld with Nana',
          duration: '22:10',
          language: 'en',
          summary: 'Nana demystifies GitLab CI fundamentals: creating pipelines from scratch, configuring runners, understanding execution environments, and reading job logs.',
          keyPoints: [
            'How GitLab triggers pipelines on code push and branch merge requests',
            'Configuring sequential stages and concurrent parallel job execution',
            'Using Docker images as execution environments for clean, reproducible builds'
          ]
        }
      },
      keyPoints: [
        'Hiérarchie structurelle : Pipeline ➔ Stages (séquentielles) ➔ Jobs (unités d’exécution).',
        'GitLab Runner : agent logiciel (isolé sur une machine ou conteneur Docker) chargé d’exécuter les commandes des jobs.',
        'Artifacts : fichiers ou dossiers générés par un job (ex: dossier `/dist` ou rapport de test) conservés pour les stages suivants.',
        'Comportement par défaut : si un job obligatoire échoue, le pipeline s’arrête immédiatement et les stages suivants ne sont pas lancés.'
      ],
      traps: [
        'Les stages s’exécutent les uns après les autres (séquentiellement), mais au sein d’un même stage, plusieurs jobs peuvent s’exécuter en parallèle.',
        'Le GitLab Runner n’est pas le serveur GitLab lui-même : c’est un agent d’exécution séparé.'
      ],
      examContext: 'Question d’examen : expliquer les rôles respectifs d’un stage, d’un job et d’un runner dans GitLab CI.',
      miniQuestion: {
        question: 'Que se produit-il par défaut dans un pipeline GitLab CI si un job échoue dans le stage "test" ?',
        options: [
        'Le pipeline est marqué en échec et les stages suivants (comme le déploiement) sont bloqués',
        'GitLab crée un diagramme de Gantt pour rattraper le temps perdu',
        'Le code est immédiatement forcé et déployé directement sur les serveurs de production',
        'Le runner supprime automatiquement le compte du développeur sur le serveur',
      ],
        correctIndex: 0,
        explanation: 'Par sécurité, l’échec d’un job de test interrompt le pipeline et empêche les stages ultérieurs (déploiement) d’être exécutés.'
      }
    },
    {
      id: 'p5-s4',
      order: '04',
      title: 'Configuration avec le fichier .gitlab-ci.yml',
      definition: 'Le fichier `.gitlab-ci.yml`, placé impérativement à la racine du dépôt Git, est le fichier de configuration au format YAML qui déclare la structure du pipeline, les images Docker, les variables et les scripts à exécuter.',
      explanation: 'Le format YAML repose sur une indentation très stricte avec des espaces (pas de tabulations). Chaque job définit son `stage`, son `image` de base, et son tableau de commandes sous la clé `script`.',
      deepExplanation: 'Le fichier `.gitlab-ci.yml` est le cœur technique de l’évaluation OFPPT sur DevOps. Les mots-clés essentiels à maîtriser sont : `stages` (déclaration de l’ordre des étapes), `image` (spécification de l’image Docker du runner, ex: `node:18` ou `maven:3.8`), `before_script` (commandes d’amorce communes à exécuter avant chaque job), `script` (commandes shell obligatoires du job), `artifacts: paths:` (fichiers ou répertoires à préserver pour les jobs en aval), et `rules: - if:` (conditions pour conditionner l’exécution d’un job, par exemple ne déployer que si la branche est `main` ou si un commit est taggué). Tout non-respect de l’indentation YAML (2 espaces par niveau, pas de tabulations) invalide l’ensemble du fichier.',
      examples: [
        'Exemple de fichier `.gitlab-ci.yml` standard d’entreprise :\n\nstages:\n  - build\n  - test\n  - deploy\n\njob_build:\n  stage: build\n  image: node:18\n  script:\n    - npm ci\n    - npm run build\n  artifacts:\n    paths:\n      - dist/\n\njob_test:\n  stage: test\n  image: node:18\n  script:\n    - npm test\n\njob_deploy_prod:\n  stage: deploy\n  script:\n    - scp -r dist/* user@server:/var/www/app\n  rules:\n    - if: $CI_COMMIT_BRANCH == "main"'
      ],
      realWorldCase: {
        company: 'Barid Al-Maghrib (Poste Maroc)',
        sector: 'Logistique, Colis & Services Postaux Nationaux',
        problem: 'Nécessité de garantir que le système national de suivi des colis Amana ne soit jamais déployé en production avec une faille de sécurité ou des tests non validés.',
        agileSolution: 'Mise en place d’un fichier `.gitlab-ci.yml` standardisé avec 4 stages stricts (`build`, `test`, `security`, `deploy`), une conservation des rapports d’audit en artifacts pendant 90 jours et un déploiement sécurisé sous condition `rules: - if: $CI_COMMIT_BRANCH == "main"`.',
        concreteResult: 'Zéro déploiement défectueux depuis 2 ans, conformité stricte aux exigences de la sécurité nationale des systèmes d’information (DGSSI) et automatisation complète.'
      },
      videos: {
        fr: {
          youtubeId: 'qP8kir2GUgo',
          title: 'Tutoriel .gitlab-ci.yml : Écrire son Premier Pipeline GitLab CI Pas à Pas',
          channel: 'Xavki - DevOps & Cloud',
          duration: '15:30',
          language: 'fr',
          summary: 'Tutoriel pratique d’écriture de fichier `.gitlab-ci.yml` : structure YAML, déclaration des images Docker, variables d’environnement, stages et scripts de déploiement.',
          keyPoints: [
            'La syntaxe YAML exacte et le respect scrupuleux de l’indentation à 2 espaces',
            'Les directives clés : stages, image, before_script, script et artifacts',
            'Utiliser les conditions rules pour ne déployer que sur la branche main'
          ]
        },
        en: {
          youtubeId: 'MSsH5zL0ZlQ',
          title: 'Mastering .gitlab-ci.yml: Real World Pipeline Configuration',
          channel: 'DevOps Directive',
          duration: '18:15',
          language: 'en',
          summary: 'Comprehensive deep dive into writing production-grade .gitlab-ci.yml files: caching strategies, artifact management, and conditional deployment pipelines.',
          keyPoints: [
            'Structuring robust YAML pipelines with build, test, and deploy stages',
            'Speeding up builds through dependency caching and artifact retention',
            'Securing CI/CD credentials with GitLab masked environment variables'
          ]
        }
      },
      keyPoints: [
        'Nom et emplacement obligatoires : `.gitlab-ci.yml` à la racine même du projet Git.',
        'Syntaxe YAML : sensible à la casse et à l’alignement des espaces.',
        '`stages:` : liste ordonnée des étapes du cycle de vie.',
        '`script:` : liste des commandes bash exécutées par le Runner.',
        '`artifacts:` : définit les fichiers produits par le job à sauvegarder (ex: bundle compilé).',
        '`variables:` : permet de stocker des clés API ou paramètres réutilisables.'
      ],
      traps: [
        'Le point au début du nom de fichier (`.gitlab-ci.yml`) est obligatoire (c’est un fichier caché sous Linux).',
        'Ne jamais utiliser de tabulations dans un fichier YAML : utiliser uniquement 2 espaces par niveau d’indentation.'
      ],
      examContext: 'Exercice EFM très classique : analyser un extrait de fichier `.gitlab-ci.yml`, repérer une erreur de syntaxe ou compléter les lignes manquantes d’un job.',
      miniQuestion: {
        question: 'Où doit être obligatoirement placé le fichier ".gitlab-ci.yml" pour que GitLab déclenche le pipeline ?',
        options: [
        'Sur le bureau de l’ordinateur du Scrum Master',
        'À la racine exacte du dépôt Git du projet',
        'Dans le sous-dossier caché .git/hooks/ du développeur',
        'Dans la base de données de l’outil de gestion Jira',
      ],
        correctIndex: 1,
        explanation: 'GitLab recherche impérativement le fichier `.gitlab-ci.yml` à la racine même de la branche pour interpréter les instructions du pipeline.'
      }
    }
  ],
  practicalCase: {
    title: 'Cas Pratique : Écriture d’un pipeline de livraison automatisée',
    scenario: 'Une équipe doit automatiser la livraison d’une API Node.js. Le pipeline doit comporter 3 stages : `build`, `test`, et `deploy`. En cas de succès des tests, le livrable compilé dans le dossier `dist/` doit être transmis au stage de déploiement.',
    challenge: 'Rédigez la structure du fichier `.gitlab-ci.yml` et précisez comment garantir que le dossier `dist/` soit disponible pour le job de déploiement.',
    solutionPoints: [
      'Déclaration des stages : `stages: [build, test, deploy]`.',
      'Job de build : exécute `npm install` et `npm run build`. Utilise la directive `artifacts: paths: [dist/]` pour conserver le dossier généré.',
      'Job de test : exécute `npm run test:unit`. Si les tests échouent, le pipeline s’arrête.',
      'Job de deploy : dépend du succès des étapes précédentes, récupère automatiquement l’artefact `dist/` et exécute le script de mise en ligne sur le serveur de recette.'
    ]
  },
  keyTakeaways: [
    'DevOps brise le mur entre développeurs et exploitants grâce à la collaboration et l’automatisation.',
    'CALMS = Culture, Automation, Lean, Measurement, Sharing.',
    'CI = Intégration continue ; Continuous Delivery = livrable prêt pour la prod ; Continuous Deployment = mise en prod automatique.',
    'Dans GitLab CI : `.gitlab-ci.yml` à la racine ordonne les Stages qui exécutent des Jobs via des Runners.'
  ],
  commonTraps: [
    'Confondre Continuous Delivery (validation manuelle possible) et Continuous Deployment (100% automatique).',
    'Oublier le point initial dans `.gitlab-ci.yml`.',
    'Penser que DevOps se résume à acheter une suite logicielle sans changer les pratiques humaines.'
  ]
};
