import { CoursePart } from '../../types';

export const coursePart5: CoursePart = {
  id: 'part5',
  orderNumber: 5,
  title: 'DevOps · CI/CD · GitLab CI',
  subtitle: 'Culture collaborative, modèle CALMS, automatisation des tests et conception de pipelines avec .gitlab-ci.yml',
  description: 'Ce module relie l’agilité au déploiement en production : les origines et la culture DevOps, le modèle de maturité CALMS (Culture, Automation, Lean, Measurement, Sharing), la distinction rigoureuse entre Intégration Continue (CI), Livraison Continue et Déploiement Continu (CD), ainsi que la syntaxe opérationnelle des pipelines GitLab CI.',
  iconName: 'Rocket',
  colorTheme: 'rose',
  sections: [
    {
      id: 'p5-s1',
      order: '01',
      title: 'La Culture DevOps et le Modèle CALMS',
      definition: 'DevOps est un mouvement culturel, organisationnel et technique combinant le développement logiciel (Dev) et l’exploitation des systèmes (Ops) afin de raccourcir le cycle de livraison tout en garantissant une haute fiabilité.',
      explanation: 'Historiquement, les développeurs voulaient introduire vite des nouveautés (changement), tandis que les exploitants système voulaient protéger la stabilité des serveurs (pas de changement). Ce "mur de la confusion" provoquait des conflits et des retards. DevOps brise ce silo en instaurant une responsabilité partagée du code jusqu’à la production.',
      examples: [
        'Avant DevOps : les développeurs envoyaient un fichier ZIP aux Ops par email le vendredi soir. En cas de panne le week-end, les Ops accusaient les Devs et inversement.',
        'Avec DevOps : les développeurs et administrateurs travaillent ensemble sur une chaîne automatisée unique : si le pipeline casse, toute l’équipe est immédiatement prévenue et corrige ensemble.'
      ],
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
          'Measurement (la mesure et l’analyse des indicateurs clés de performance)',
          'Management (la hiérarchie obligatoire imposant les heures de travail)',
          'Master (la branche Git principale où tout le monde doit coder sans test)',
          'Migration (le transfert annuel obligatoire des données vers une autre base)'
        ],
        correctIndex: 0,
        explanation: 'Dans CALMS, la lettre M correspond à "Measurement" : mesurer les métriques de fiabilité, de délai et d’erreur pour guider l’amélioration continue.'
      }
    },
    {
      id: 'p5-s2',
      order: '02',
      title: 'CI / CD : Intégration, Livraison et Déploiement Continus',
      definition: 'La CI (Continuous Integration) automatise la compilation et les tests à chaque push. La Livraison Continue (Continuous Delivery) garantit un livrable prêt pour la production. Le Déploiement Continu (Continuous Deployment) pousse automatiquement en production sans intervention humaine.',
      explanation: 'Pensez à un restaurant gastronomique : l’Intégration Continue vérifie que les ingrédients sont frais et cuits à point. La Livraison Continue dresse l’assiette sur le passe-plat, prête à être servie (le maître d’hôtel donne le feu vert d’un clic). Le Déploiement Continu dépose directement l’assiette sur la table du client dès qu’elle est prête, de façon 100% automatique.',
      examples: [
        'Continuous Integration (CI) : chaque développeur pousse son code plusieurs fois par jour ; un serveur distant lance automatiquement les tests unitaires et le linter.',
        'Continuous Delivery (CD) : le code qui passe les tests est automatiquement empaqueté en image Docker et déployé sur l’environnement de pré-production (Staging). Un bouton "Déployer en Production" attend le clic d’un responsable.',
        'Continuous Deployment (CD) : aucun bouton manuel ; si tous les tests du pipeline sont au vert, le code est poussé en production réelle en quelques minutes.'
      ],
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
          'La Livraison Continue conserve une décision ou validation manuelle avant la production, tandis que le Déploiement Continu automatise jusqu’à la production finale',
          'La Livraison Continue s’applique uniquement aux téléphones mobiles alors que le Déploiement Continu est réservé aux ordinateurs de bureau',
          'La Livraison Continue supprime l’étape de compilation alors que le Déploiement Continu supprime les tests unitaires',
          'Ce sont deux expressions rigoureusement synonymes sans aucune distinction technique'
        ],
        correctIndex: 0,
        explanation: 'En Continuous Delivery, le paquet est prêt et validé mais requiert un déclenchement manuel pour aller en prod ; en Continuous Deployment, le flux est intégralement automatisé sans intervention humaine.'
      }
    },
    {
      id: 'p5-s3',
      order: '03',
      title: 'Pipelines GitLab CI : Stages, Jobs et Runners',
      definition: 'Dans GitLab CI, un pipeline est l’orchestration globale des étapes d’automatisation. Il se compose de stages (étapes ordonnées), qui contiennent des jobs (tâches exécutées en parallèle au sein d’un stage), exécutés par des GitLab Runners.',
      explanation: 'Le pipeline est comme une chaîne de montage dans une usine automobile. Les stages sont les grands ateliers qui se succèdent : d’abord l’atelier Châssis (build), puis l’atelier Crash-test (test), puis l’atelier Peinture (package). Si un job échoue dans le stage "test", toute la chaîne s’arrête pour empêcher une voiture défaillante d’aller sur la route.',
      examples: [
        'Stage "build" : job `compiler_app` (exécute `npm run build`).',
        'Stage "test" : job `tests_unitaires` (exécute `npm test`) et job `linting` (exécutés en parallèle).',
        'Stage "quality" : job `sonar_scan` (analyse SonarQube avec la Quality Gate).',
        'Stage "deploy" : job `deploy_staging` (envoi sur le serveur de test).'
      ],
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
          'Le runner supprime automatiquement le compte du développeur sur le serveur',
          'Le code est immédiatement forcé et déployé directement sur les serveurs de production',
          'GitLab crée un diagramme de Gantt pour rattraper le temps perdu'
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
      examples: [
        'Exemple de fichier `.gitlab-ci.yml` minimaliste :\n\nstages:\n  - build\n  - test\n  - deploy\n\njob_build:\n  stage: build\n  script:\n    - npm install\n    - npm run build\n  artifacts:\n    paths:\n      - dist/\n\njob_test:\n  stage: test\n  script:\n    - npm test'
      ],
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
          'À la racine exacte du dépôt Git du projet',
          'Dans le sous-dossier caché .git/hooks/ du développeur',
          'Sur le bureau de l’ordinateur du Scrum Master',
          'Dans la base de données de l’outil de gestion Jira'
        ],
        correctIndex: 0,
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
