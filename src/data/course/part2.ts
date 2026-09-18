import { CoursePart } from '../../types';

export const coursePart2: CoursePart = {
  id: 'part2',
  orderNumber: 2,
  title: 'Planifier un projet · Gantt & PERT',
  subtitle: 'Du cahier des charges aux calculs avancés de réseau, antécédents, marges et chemin critique',
  description: 'Ce module approfondit les techniques d’ingénierie de planification de projet : analyse du cahier des charges, découpage des activités (WBS), visualisation chronologique sur diagramme de Gantt et maîtrise mathématique du réseau PERT (passage avant, passage arrière, marges et identification du chemin critique).',
  iconName: 'CalendarRange',
  colorTheme: 'secondary',
  sections: [
    {
      id: 'p2-s1',
      order: '01',
      title: 'Du cahier des charges au découpage des tâches (WBS)',
      definition: 'Le cahier des charges (Cdc) formalise les besoins, exigences fonctionnelles/techniques, délais et contraintes. Le découpage WBS (Work Breakdown Structure) décompose l’ensemble du projet en lots de travail puis en tâches élémentaires gérables.',
      explanation: 'On ne peut pas planifier une tâche vague comme "Faire le site web". Il faut découper ce livrable : Créer la maquette, Concevoir le schéma relationnel, Développer l’API d’authentification, Écrire les tests unitaires. Chaque tâche doit avoir une durée estimée, des ressources assignées et des antécédents (dépendances) clairs.',
      deepExplanation: 'Le WBS (ou Organigramme des Tâches - OT) applique le principe de décomposition hiérarchique cartésienne ("diviser chaque difficulté en autant de parcelles qu’il se pourrait"). Le niveau le plus bas du WBS s’appelle le "Work Package" (Lot de travail) : chaque lot de travail doit être mesurable, attribuable à un responsable unique, et sa durée doit être idéalement comprise entre 1 et 10 jours de travail. Dans les examens OFPPT, une attention spécifique est requise pour distinguer les exigences fonctionnelles (ce que le système doit faire) des exigences non fonctionnelles (critères de performance, sécurité, disponibilité et scalabilité).',
      examples: [
        'Exigence fonctionnelle : "Le stagiaire doit pouvoir télécharger son attestation de scolarité en PDF".',
        'Exigence non fonctionnelle : "Le temps de chargement de la page ne doit pas dépasser 1.5 seconde pour 500 utilisateurs connectés".',
        'Dépendance classique Fin-à-Début (Finish-to-Start) : la tâche B (Développement) ne peut commencer que lorsque la tâche A (Validation de la maquette) est terminée.'
      ],
      realWorldCase: {
        company: 'Tanger Med Special Agency (TMSA)',
        sector: 'Logistique Portuaire & Plateforme Digitale',
        problem: 'Numériser l’ensemble du passage portuaire des camions TIR et conteneurs (plus de 3 millions de camions par an) avec 120 sous-systèmes informatiques hétérogènes sans interruption du trafic.',
        agileSolution: 'Décomposition WBS en 5 grands lots de travail (Portail Exportateurs, Reconnaissance optique des plaques OCR, Pesage automatique, Douane dématérialisée, Notification SMS chauffeurs).',
        concreteResult: 'Temps moyen de transit d’un camion réduit de 4h à 18 minutes, et élimination totale des files d’attente sur l’autoroute d’accès portuaire.'
      },
      videos: {
        fr: {
          youtubeId: 'F1O7q6d1Y7s',
          title: 'WBS & Cahier des Charges : Comment Découper un Projet sans Oublier de Tâches',
          channel: 'Excellence Gestion',
          duration: '12:10',
          language: 'fr',
          summary: 'Méthodologie pas à pas pour passer du cahier des charges à un organigramme des tâches (WBS) structuré, avec les règles d’or d’exhaustivité et d’estimation.',
          keyPoints: [
            'Règle des 100% : le WBS doit englober la totalité du travail sans omission ni doublon',
            'Différence entre découpage par livrable et découpage par phase chronologique',
            'Comment définir les Work Packages pour préparer le réseau PERT'
          ]
        },
        en: {
          youtubeId: '4bpcpcUSV_M',
          title: 'Work Breakdown Structure (WBS) Explained | Project Scope Management',
          channel: 'David McLachlan',
          duration: '09:40',
          language: 'en',
          summary: 'Comprehensive visual guide to breaking down project deliverables into work packages using industry-standard WBS hierarchical dictionaries.',
          keyPoints: [
            'The 100% rule and avoiding scope creep during project initiation',
            'Translating requirements into unambiguous work packages',
            'Preparing task dependency tables for Gantt and CPM network schedules'
          ]
        }
      },
      keyPoints: [
        'Cahier des charges = document contractuel de référence définissant les livrables attendus.',
        'WBS (Organigramme des tâches) = décomposition arborescente du périmètre en unités de travail mesurables.',
        'Antécédent = tâche obligatoire devant être achevée avant de pouvoir démarrer la suivante.',
        'Jalon (Milestone) = événement clé marquant l’achèvement d’une étape importante (durée = 0 jour).'
      ],
      traps: [
        'Un jalon n’a pas de durée : sa durée est de zéro jour (piège récurrent en examen).',
        'Ne pas confondre exigences fonctionnelles (ce que fait le logiciel) et non fonctionnelles (qualité, sécurité, rapidité).'
      ],
      examContext: 'Les examens OFPPT demandent souvent de classer des exigences (fonctionnelle vs technique) ou d’identifier les tâches prédécesseurs dans un tableau fourni.',
      miniQuestion: {
        question: 'Quelle caractéristique définit un jalon (milestone) dans un calendrier de projet ?',
        options: [
        'Un point de contrôle ou de décision clé dont la durée est égale à zéro',
        'Une tâche très complexe nécessitant plus de 10 développeurs simultanés',
        'Une marge temporelle ajoutée en fin de projet pour absorber les retards',
        'La première réunion organisée avec la maîtrise d’ouvrage',
      ],
        correctIndex: 0,
        explanation: 'Par définition en gestion de projet, un jalon représente un événement ou une validation majeure sans durée propre (durée = 0).'
      }
    },
    {
      id: 'p2-s2',
      order: '02',
      title: 'Le Diagramme de Gantt : Visualiser le calendrier',
      definition: 'Le diagramme de Gantt est un outil graphique de planification représentant chaque tâche sous forme de barre horizontale positionnée le long d’une échelle temporelle (jours, semaines, mois).',
      explanation: 'Le Gantt permet de voir en un coup d’œil quand chaque tâche démarre, quand elle s’arrête, qui s’en occupe et quelles tâches peuvent être réalisées en parallèle pour gagner du temps. Il montre aussi immédiatement les chevauchements et les périodes de surcharge de l’équipe.',
      deepExplanation: 'Inventé par Henry Gantt au début du XXe siècle, le diagramme de Gantt relie le découpage WBS à un calendrier calendaire réel (avec jours ouvrés, week-ends et jours fériés). Il met en évidence 4 types de liaisons : Fin-à-Début (FS - la plus courante), Début-à-Début (SS - démarrage en parallèle), Fin-à-Fin (FF), et Début-à-Fin (SF). Les jalons y apparaissent sous forme de losanges symboliques. En gestion de portefeuille de projets, le Gantt permet d’arbitrer le nivellement et le lissage des ressources pour éviter qu’un développeur clé ne soit affecté à 200% de sa charge.',
      examples: [
        'Tâche A (Maquette) : Semaine 1 à 2.',
        'Tâche B (Spécifications API) : Semaine 2 à 3 (en parallèle partiel avec la maquette).',
        'Tâche C (Développement) : Semaine 4 à 8 (démarre après A et B).',
        'Jalon "Recette Client" : fin de la Semaine 8 (losange sur le planning).'
      ],
      realWorldCase: {
        company: 'ONCF (Ligne Grande Vitesse Al Boraq)',
        sector: 'Transport Ferroviaire & Ingénierie des Systèmes',
        problem: 'Orchestrer 180 chantiers simultanés (pose des voies, caténaires électriques, système de signalisation ERTMS et tests à 357 km/h) avec plus de 40 entreprises partenaires.',
        agileSolution: 'Pilotage centralisé par diagramme de Gantt géant multi-niveaux avec identification en temps réel des tâches critiques d’électrification et des zones de croisement.',
        concreteResult: 'Inauguration d’Al Boraq dans les délais impartis, reliant Tanger à Casablanca en 2h10 au lieu de 4h45, devenue la ligne ferroviaire la plus rapide d’Afrique.'
      },
      videos: {
        fr: {
          youtubeId: 'F1O7q6d1Y7s',
          title: 'Le Diagramme de Gantt : De la Théorie à la Pratique sur Tableau',
          channel: 'Excellence Gestion',
          duration: '11:15',
          language: 'fr',
          summary: 'Apprenez à construire et lire un diagramme de Gantt : échelle chronologique, tâches séquentielles, tâches parallèles, liens de dépendance et symboles de jalons.',
          keyPoints: [
            'Représentation visuelle des durées et des dates de début / fin',
            'Identification des activités menées en parallèle pour optimiser le délai',
            'Comment repérer les conflits d’allocation de ressources'
          ]
        },
        en: {
          youtubeId: '4bpcpcUSV_M',
          title: 'How to Read and Build a Gantt Chart | Project Scheduling Tutorial',
          channel: 'David McLachlan',
          duration: '11:05',
          language: 'en',
          summary: 'Masterclass on timeline scheduling: dependencies, leads and lags, resource leveling, and visualizing project milestones.',
          keyPoints: [
            'The four logical dependency types: FS, SS, FF, and SF',
            'Tracking actual progress vs baseline schedule',
            'Using Gantt charts alongside agile sprint backlogs'
          ]
        }
      },
      keyPoints: [
        'Axe horizontal = le temps (jours, semaines, mois).',
        'Axe vertical = liste ordonnée des activités et lots de travail.',
        'Longueur des barres = durée de chaque activité.',
        'Flèches de liaison = dépendances entre activités (antécédents).',
        'Visualisation directe des tâches séquentielles vs tâches parallèles.'
      ],
      traps: [
        'Le Gantt montre très bien le calendrier, mais il devient vite difficile à lire pour calculer précisément les marges mathématiques (c’est là que le PERT intervient).',
        'Décaler une tâche non critique dans un Gantt ne repousse pas automatiquement la fin du projet si elle a de la marge.'
      ],
      examContext: 'Lecture graphique d’un Gantt : déterminer la durée globale du projet ou repérer les tâches pouvant se dérouler en même temps.',
      diagramType: 'gantt_preview',
      miniQuestion: {
        question: 'Quel est l’avantage principal d’un diagramme de Gantt par rapport à une simple liste de tâches ?',
        options: [
        'Remplacer le rôle du Product Owner dans la méthodologie Scrum',
        'Supprimer toutes les dépendances entre les membres de l’équipe',
        'Écrire automatiquement le code de l’application informatique',
        'Visualiser l’étalement dans le temps et les parallélismes entre tâches',
      ],
        correctIndex: 3,
        explanation: 'Le Gantt est l’outil roi pour visualiser le calendrier, les dates de début/fin, la durée et les recouvrements d’activités.'
      }
    },
    {
      id: 'p2-s3',
      order: '03',
      title: 'Le Réseau PERT : Dates au plus tôt et au plus tard',
      definition: 'La méthode PERT (Program Evaluation and Review Technique) modélise le projet sous la forme d’un graphe orienté d’activités reliées par leurs dépendances logiques, permettant le calcul rigoureux des dates clés.',
      explanation: 'Pour chaque tâche, on calcule deux valeurs fondamentales : la Date au Plus Tôt (le plus vite qu’on puisse démarrer en respectant les antécédents) et la Date au Plus Tard (la date limite absolue de démarrage pour ne pas retarder la date de fin du projet).',
      deepExplanation: 'Le réseau PERT repose sur la théorie des graphes. Les nœuds représentent soit des étapes clés soit les tâches elles-mêmes (méthode des potentiels métra MPM). Dans les examens OFPPT, vous devez toujours vérifier qu’il n’y a aucun cycle (boucle infinie interdite dans un graphe de projet) et qu’il existe un point d’entrée unique (Début) et un point de sortie unique (Fin). En cas de tâches indépendantes au démarrage, elles partent toutes du nœud initial à t=0.',
      examples: [
        'Passage en avant (Forward pass) : de gauche à droite. Date au plus tôt de fin = Date au plus tôt de début + Durée de la tâche. En cas de convergence (plusieurs antécédents), on prend le MAXIMUM.',
        'Passage en arrière (Backward pass) : de droite à gauche. Date au plus tard de début = Date au plus tard de fin - Durée de la tâche. En cas de divergence, on prend le MINIMUM.'
      ],
      realWorldCase: {
        company: 'OCP Group (Jorf Lasfar)',
        sector: 'Industrie Minière & SI Numérique',
        problem: 'Planifier l’automatisation du système de convoyage et supervision portuaire en 16 semaines, avec 45 tâches techniques hautement dépendantes les unes des autres.',
        agileSolution: 'Modélisation du projet par réseau PERT pour identifier les marges de manœuvre de chaque lot (câblage, automate, tests logiciels). Focalisation des ressources sur les 6 tâches du chemin critique.',
        concreteResult: 'Les équipes ont concentré les heures supplémentaires uniquement sur le chemin critique, évitant tout retard d’embarquement et réduisant le coût global du projet de 12%.'
      },
      model3D: 'pert_3d',
      videos: {
        fr: {
          youtubeId: 'F1O7q6d1Y7s',
          title: 'Calcul Réseau PERT & Chemin Critique : Méthode Complète Pas à Pas',
          channel: 'Excellence Gestion',
          duration: '14:20',
          language: 'fr',
          summary: 'Démonstration détaillée sur tableau : tableau des antécédents, tracé des nœuds, calcul aller (dates au plus tôt), calcul retour (dates au plus tard) et identification du chemin critique.',
          keyPoints: [
            'Sens aller : addition des durées, on retient le MAXIMUM en cas de convergence',
            'Sens retour : soustraction des durées, on retient le MINIMUM en cas de divergence',
            'Marge Totale = LS - ES (si MT = 0, la tâche est critique)',
            'Chemin critique = chemin le plus long en durée qui détermine la durée minimale du projet'
          ]
        },
        en: {
          youtubeId: '4bpcpcUSV_M',
          title: 'Critical Path Method (CPM) & PERT Network Diagram Explained',
          channel: 'David McLachlan',
          duration: '10:14',
          language: 'en',
          summary: 'Clear English walkthrough of constructing project network graphs, calculating early start/finish and late start/finish, and calculating floats.',
          keyPoints: [
            'Forward pass rule: EF = ES + Duration (take max for next task)',
            'Backward pass rule: LS = LF - Duration (take min for prior task)',
            'Total float calculation and identifying zero float critical path activities'
          ]
        }
      },
      keyPoints: [
        'Date au plus tôt (Early Start - ES) : calculée de gauche à droite. On retient le MAX des fins au plus tôt des antécédents.',
        'Date au plus tard (Late Start - LS) : calculée de droite à gauche depuis la fin du projet. On retient le MIN des débuts au plus tard des successeurs.',
        'La durée totale du projet correspond à la date au plus tôt de fin de la dernière tâche.',
        'Une tâche sans antécédent commence à l’instant 0.'
      ],
      traps: [
        'Erreur classique de calcul : dans le passage en avant, toujours prendre la valeur MAX lors d’une convergence (car il faut attendre que TOUTES les tâches précédentes soient finies).',
        'Dans le passage en arrière, toujours prendre la valeur MIN (car on ne peut pas dépasser la contrainte la plus serrée).'
      ],
      examContext: 'Exercice PERT typique de 8 à 10 points en EFM : remplir le tableau des dates au plus tôt (ES, EF) et au plus tard (LS, LF).',
      diagramType: 'pert_preview',
      miniQuestion: {
        question: 'Dans le calcul des dates au plus tôt d’un réseau PERT, lorsque deux tâches antécédentes convergent vers une même tâche suivante, quelle valeur retient-on ?',
        options: [
        'La différence absolue entre les deux durées estimées',
        'La date de fin au plus tôt la plus élevée (le maximum)',
        'La moyenne arithmétique des deux dates calculées',
        'La date de fin au plus tôt la plus petite (le minimum)',
      ],
        correctIndex: 1,
        explanation: 'La tâche suivante ne peut débuter que lorsque TOUS ses antécédents sont achevés. C’est donc la tâche qui se termine le plus tard (le MAX) qui impose la date de début au plus tôt.'
      }
    },
    {
      id: 'p2-s4',
      order: '04',
      title: 'Marges (Totale et Libre) et Chemin Critique',
      definition: 'La marge totale est le retard maximal qu’une tâche peut subir sans repousser la fin du projet (MT = LS - ES = LF - EF). Le chemin critique est la séquence d’activités dont la marge totale est nulle.',
      explanation: 'Si une tâche non critique a 4 jours de marge, un retard de 2 jours n’a aucun impact sur le client. Mais sur le chemin critique, la marge est égale à 0 jour : 1 seul jour de retard sur une tâche critique repousse immédiatement la livraison finale du projet d’1 jour entier !',
      deepExplanation: 'Le calcul rigoureux des marges distingue deux indicateurs fondamentaux : 1. La Marge Totale (MT = LS - ES = LF - EF), qui est le délai de retard admissible sans repousser la date de fin globale du projet. 2. La Marge Libre (ML = ES(tâche suivante) - EF(tâche actuelle)), qui est le retard possible sans retarder le début au plus tôt des successeurs immédiats. Par théorème mathématique, la marge libre est toujours inférieure ou égale à la marge totale (ML <= MT). Toute tâche ayant une marge totale nulle est obligatoirement critique (MT = 0). Le chemin critique est le chemin continu joignant le début à la fin du réseau dont la somme des durées est maximale.',
      examples: [
        'Calcul de Marge Totale : Tâche B (durée = 2j, ES = 3, LS = 5) -> MT = 5 - 3 = 2 jours. On peut la retarder de 2 jours sans risque global.',
        'Tâche C sur chemin critique : ES = 3, LS = 3 -> MT = 3 - 3 = 0 jour. Tout retard est interdit.',
        'Marge libre : retard maximal possible sans retarder le début au plus tôt des tâches immédiatement suivantes.'
      ],
      realWorldCase: {
        company: 'Casa Transports (Tramway de Casablanca)',
        sector: 'Infrastructures Urbaines & Transports Collectifs',
        problem: 'Construire la Ligne T3 et T4 du tramway sur 26 km en plein cœur de Casablanca tout en maintenant la circulation automobile et les réseaux souterrains d’eau et d’électricité.',
        agileSolution: 'Identification stricte du chemin critique sur les déviations des réseaux d’assainissement Lydec : les équipes ont été triplées uniquement sur les sections critiques afin de libérer les carrefours clés avant la saison des pluies.',
        concreteResult: 'Mise en service commerciale des deux nouvelles lignes avec zéro jour de retard sur l’échéance contractuelle et sécurité maximale assurée.'
      },
      model3D: 'pert_3d',
      videos: {
        fr: {
          youtubeId: 'F1O7q6d1Y7s',
          title: 'Marges Totales, Marges Libres et Chemin Critique : Astuces d’Examen',
          channel: 'Excellence Gestion',
          duration: '13:05',
          language: 'fr',
          summary: 'Formules indispensables pour réussir les questions d’examen sur les marges : calculs de MT et ML, repérage rapide du chemin critique et pièges fréquents.',
          keyPoints: [
            'Formule universelle : Marge Totale = Début au plus tard - Début au plus tôt',
            'La différence cruciale entre Marge Totale et Marge Libre',
            'Pourquoi le chemin critique détermine la date d’inauguration du projet'
          ]
        },
        en: {
          youtubeId: '4bpcpcUSV_M',
          title: 'Total Float vs Free Float & Critical Path Analysis',
          channel: 'David McLachlan',
          duration: '10:45',
          language: 'en',
          summary: 'A definitive breakdown of Total Float vs Free Float calculation formulas with step-by-step exam numerical examples.',
          keyPoints: [
            'Total Float (TF) = Late Start - Early Start',
            'Free Float (FF) formula and avoiding downstream impacts',
            'Managing project float buffers and schedule compression techniques (crashing & fast-tracking)'
          ]
        }
      },
      keyPoints: [
        'Marge Totale (MT) = LS - ES (ou LF - EF).',
        'Chemin critique = chemin continu du début à la fin formé exclusivement par des tâches à marge totale nulle (MT = 0).',
        'Le chemin critique est le chemin le plus long en durée dans le graphe.',
        'Tout retard sur une activité critique retarde d’autant la livraison finale du projet.',
        'Un projet peut posséder plusieurs chemins critiques simultanés.'
      ],
      traps: [
        'Ne pas confondre Marge Totale (impact sur la fin du projet) et Marge Libre (impact sur les tâches suivantes directes).',
        'Si la durée d’une tâche critique est réduite, un autre chemin peut alors devenir le nouveau chemin critique.'
      ],
      examContext: 'Question systématique : "Déterminez le chemin critique et la durée minimale de réalisation du projet."',
      miniQuestion: {
        question: 'Qu’arrive-t-il si une tâche située sur le chemin critique subit un retard imprévu de 3 jours ?',
        options: [
        'Le budget du projet est automatiquement réduit de moitié',
        'Le chemin critique est automatiquement annulé par le chef de projet',
        'La durée globale du projet est prolongée d’exactement 3 jours',
        'Le retard est totalement absorbé par la marge totale de la tâche',
      ],
        correctIndex: 2,
        explanation: 'Puisque la marge totale d’une tâche critique est nulle (0 jour), tout retard sur celle-ci se répercute jour pour jour sur la date finale du projet.'
      }
    }
  ],
  practicalCase: {
    title: 'Exercice Corrigé d’Examen : Calcul complet d’un réseau PERT',
    scenario: 'Soit un projet composé de 6 tâches :\n- A (durée 2j, pas d’antécédent)\n- B (durée 1j, après A)\n- C (durée 3j, après A)\n- D (durée 4j, après B et C)\n- E (durée 2j, après D)\n- F (durée 1j, après E)',
    challenge: 'Calculez la durée totale du projet, identifiez le chemin critique et déterminez la marge totale de la tâche B.',
    solutionPoints: [
      'Passage en avant : A finit à 2j. B finit à 2+1=3j. C finit à 2+3=5j. D attend B et C (MAX(3, 5) = 5) donc D démarre à 5j et finit à 5+4=9j. E démarre à 9j et finit à 11j. F démarre à 11j et finit à 12j.',
      'Durée totale du projet = 12 jours.',
      'Passage en arrière : F (11-12), E (9-11), D (5-9), C (2-5), B (4-5 car D commence au plus tard à 5j, donc LS(B) = 5-1 = 4j), A (0-2).',
      'Marges : MT(A) = 0, MT(C) = 0, MT(D) = 0, MT(E) = 0, MT(F) = 0. Pour B : ES = 2, LS = 4 -> MT(B) = 4 - 2 = 2 jours de marge.',
      'Chemin critique = A ➔ C ➔ D ➔ E ➔ F (durée = 2 + 3 + 4 + 2 + 1 = 12 jours).'
    ]
  },
  keyTakeaways: [
    'Gantt = calendrier visuel des activités, de leurs durées et des chevauchements.',
    'PERT = analyse logique des dépendances, calcul des dates au plus tôt / tard et des marges.',
    'Chemin critique = ensemble des tâches ayant une marge totale nulle (MT = 0).',
    'Date au plus tôt = MAX des fins précédentes ; Date au plus tard = MIN des débuts suivants.'
  ],
  commonTraps: [
    'Oublier de prendre le MAX dans le calcul aller des dates au plus tôt en cas de convergence.',
    'Oublier de prendre le MIN dans le calcul retour des dates au plus tard.',
    'Confondre durée d’une tâche et marge d’une tâche.'
  ]
};
