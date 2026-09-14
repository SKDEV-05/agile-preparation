import { CoursePart } from '../../types';

export const coursePart2: CoursePart = {
  id: 'part2',
  orderNumber: 2,
  title: 'Planifier un projet · Gantt & PERT',
  subtitle: 'Du cahier des charges aux calculs avancés de réseau, antécédents, marges et chemin critique',
  description: 'Ce module approfondit les techniques d’ingénierie de planification de projet : analyse du cahier des charges, découpage des activités (WBS), visualisation chronologique sur diagramme de Gantt et maîtrise mathématique du réseau PERT (passage avant, passage arrière, marges et identification du chemin critique).',
  iconName: 'CalendarRange',
  colorTheme: 'teal',
  sections: [
    {
      id: 'p2-s1',
      order: '01',
      title: 'Du cahier des charges au découpage des tâches (WBS)',
      definition: 'Le cahier des charges (Cdc) formalise les besoins, exigences fonctionnelles/techniques, délais et contraintes. Le découpage WBS (Work Breakdown Structure) décompose l’ensemble du projet en lots de travail puis en tâches élémentaires gérables.',
      explanation: 'On ne peut pas planifier une tâche vague comme "Faire le site web". Il faut découper ce livrable : Créer la maquette, Concevoir le schéma relationnel, Développer l’API d’authentification, Écrire les tests unitaires. Chaque tâche doit avoir une durée estimée, des ressources assignées et des antécédents (dépendances) clairs.',
      examples: [
        'Exigence fonctionnelle : "Le stagiaire doit pouvoir télécharger son attestation de scolarité en PDF".',
        'Exigence non fonctionnelle : "Le temps de chargement de la page ne doit pas dépasser 1.5 seconde pour 500 utilisateurs connectés".',
        'Dépendance classique Fin-à-Début (Finish-to-Start) : la tâche B (Développement) ne peut commencer que lorsque la tâche A (Validation de la maquette) est terminée.'
      ],
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
          'La première réunion organisée avec la maîtrise d’ouvrage',
          'Une marge temporelle ajoutée en fin de projet pour absorber les retards'
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
      examples: [
        'Tâche A (Maquette) : Semaine 1 à 2.',
        'Tâche B (Spécifications API) : Semaine 2 à 3 (en parallèle partiel avec la maquette).',
        'Tâche C (Développement) : Semaine 4 à 8 (démarre après A et B).',
        'Jalon "Recette Client" : fin de la Semaine 8 (losange sur le planning).'
      ],
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
          'Visualiser l’étalement dans le temps et les parallélismes entre tâches',
          'Écrire automatiquement le code de l’application informatique',
          'Supprimer toutes les dépendances entre les membres de l’équipe',
          'Remplacer le rôle du Product Owner dans la méthodologie Scrum'
        ],
        correctIndex: 0,
        explanation: 'Le Gantt est l’outil roi pour visualiser le calendrier, les dates de début/fin, la durée et les recouvrements d’activités.'
      }
    },
    {
      id: 'p2-s3',
      order: '03',
      title: 'Le Réseau PERT : Dates au plus tôt et au plus tard',
      definition: 'La méthode PERT (Program Evaluation and Review Technique) modélise le projet sous la forme d’un graphe orienté d’activités reliées par leurs dépendances logiques, permettant le calcul rigoureux des dates clés.',
      explanation: 'Pour chaque tâche, on calcule deux valeurs fondamentales : la Date au Plus Tôt (le plus vite qu’on puisse démarrer en respectant les antécédents) et la Date au Plus Tard (la date limite absolue de démarrage pour ne pas retarder la date de fin du projet).',
      examples: [
        'Passage en avant (Forward pass) : de gauche à droite. Date au plus tôt de fin = Date au plus tôt de début + Durée de la tâche. En cas de convergence (plusieurs antécédents), on prend le MAXIMUM.',
        'Passage en arrière (Backward pass) : de droite à gauche. Date au plus tard de début = Date au plus tard de fin - Durée de la tâche. En cas de divergence, on prend le MINIMUM.'
      ],
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
          'La date de fin au plus tôt la plus élevée (le maximum)',
          'La date de fin au plus tôt la plus petite (le minimum)',
          'La moyenne arithmétique des deux dates calculées',
          'La différence absolue entre les deux durées estimées'
        ],
        correctIndex: 0,
        explanation: 'La tâche suivante ne peut débuter que lorsque TOUS ses antécédents sont achevés. C’est donc la tâche qui se termine le plus tard (le MAX) qui impose la date de début au plus tôt.'
      }
    },
    {
      id: 'p2-s4',
      order: '04',
      title: 'Marges (Totale et Libre) et Chemin Critique',
      definition: 'La marge totale est le retard maximal qu’une tâche peut subir sans repousser la fin du projet (MT = LS - ES = LF - EF). Le chemin critique est la séquence d’activités dont la marge totale est nulle.',
      explanation: 'Si une tâche non critique a 4 jours de marge, un retard de 2 jours n’a aucun impact sur le client. Mais sur le chemin critique, la marge est égale à 0 jour : 1 seul jour de retard sur une tâche critique repousse immédiatement la livraison finale du projet d’1 jour entier !',
      examples: [
        'Calcul de Marge Totale : Tâche B (durée = 2j, ES = 3, LS = 5) -> MT = 5 - 3 = 2 jours. On peut la retarder de 2 jours sans risque global.',
        'Tâche C sur chemin critique : ES = 3, LS = 3 -> MT = 3 - 3 = 0 jour. Tout retard est interdit.',
        'Marge libre : retard maximal possible sans retarder le début au plus tôt des tâches immédiatement suivantes.'
      ],
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
          'La durée globale du projet est prolongée d’exactement 3 jours',
          'Le retard est totalement absorbé par la marge totale de la tâche',
          'Le chemin critique est automatiquement annulé par le chef de projet',
          'Le budget du projet est automatiquement réduit de moitié'
        ],
        correctIndex: 0,
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
