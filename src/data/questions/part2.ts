import { Question } from '../../types';

export const questionsPart2: Question[] = [
  {
    id: "p2-01",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Cahier des charges",
    question: "Quelle est la finalité première du cahier des charges fonctionnel dans un projet logiciel ?",
    options: [
      "Formaliser précisément les besoins métiers, les livrables et les contraintes",
      "Générer automatiquement le diagramme de réseau PERT sans aucune intervention",
      "Sélectionner les noms de variables à utiliser dans le code source de l’application",
      "Remplacer les tests fonctionnels et les revues de code effectuées par les pairs"
    ],
    correctIndex: 0,
    explanation: "Le cahier des charges contractualise ce que le client attend, sous quelles contraintes temporelles et techniques et avec quels critères de succès."
  },
  {
    id: "p2-02",
    partId: "part2",
    difficulty: "application",
    tag: "Découpage WBS",
    question: "Avant de positionner les tâches sur un planning, quelle étape préparatoire est indispensable ?",
    options: [
      "Décomposer le périmètre en activités élémentaires et identifier leurs antécédents",
      "Déployer immédiatement une version vide de l’application sur les serveurs réels",
      "Supprimer toutes les exigences formulées par le client pour simplifier le travail",
      "Attribuer l’ensemble des tâches au premier développeur disponible de l’équipe"
    ],
    correctIndex: 0,
    explanation: "La méthode WBS consiste à découper le projet en lots et tâches clairement identifiés avec leurs dépendances logiques avant toute planification."
  },
  {
    id: "p2-03",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Dépendances",
    question: "Que signifie une liaison de dépendance Fin-à-Début (Finish-to-Start) entre deux tâches A et B ?",
    options: [
      "La tâche B ne peut commencer qu’une fois la tâche A totalement achevée",
      "La tâche B doit obligatoirement se terminer au même instant que la tâche A",
      "La tâche B démarre impérativement avant que la tâche A ne soit initialisée",
      "Les deux tâches A et B s’exécutent de façon totalement indépendante et libre"
    ],
    correctIndex: 0,
    explanation: "La relation Fin-à-Début est la dépendance standard : la tâche précédente doit être terminée pour autoriser le démarrage de la suivante."
  },
  {
    id: "p2-04",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Diagramme de Gantt",
    question: "Que représente graphiquement un diagramme de Gantt ?",
    options: [
      "L’étalement des activités sur une échelle de temps calendaire",
      "L’arborescence des commits et des branches créées dans le dépôt Git",
      "Le tableau de bord des vulnérabilités de sécurité détectées par l’analyse",
      "La liste hiérarchique des salaires versés aux membres de l’équipe projet"
    ],
    correctIndex: 0,
    explanation: "Le Gantt positionne les tâches sous forme de barres horizontales le long d’une ligne temporelle (jours, semaines ou mois)."
  },
  {
    id: "p2-05",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Diagramme de Gantt",
    question: "Dans un diagramme de Gantt classique, à quoi correspond la longueur d’une barre horizontale ?",
    options: [
      "À la durée estimée ou planifiée de l’activité correspondante",
      "Au nombre de lignes de code informatique écrites par les développeurs",
      "Au coût financier horaire facturé par le prestataire de services",
      "À la quantité de bugs déclarés par le client lors des tests de recette"
    ],
    correctIndex: 0,
    explanation: "La dimension horizontale d’une barre dans un Gantt est proportionnelle à la durée temporelle de l’activité planifiée."
  },
  {
    id: "p2-06",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Réseau PERT",
    question: "Quelle est l’utilité majeure de la méthode PERT par rapport à un simple calendrier ?",
    options: [
      "Analyser rigoureusement les dépendances logiques et calculer le chemin critique",
      "Concevoir automatiquement l’interface graphique de l’application mobile",
      "Créer les comptes utilisateurs des administrateurs système sur le serveur",
      "Compiler les scripts JavaScript en code machine pour accélérer l’affichage"
    ],
    correctIndex: 0,
    explanation: "Le PERT est un outil mathématique d’ordonnancement permettant de calculer les dates au plus tôt, au plus tard et de repérer les marges."
  },
  {
    id: "p2-07",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Chemin critique",
    question: "Comment définit-on précisément le « chemin critique » dans un réseau PERT ?",
    options: [
      "La séquence d’activités consécutives qui conditionne la durée minimale globale du projet",
      "La liste ordonnée de tous les bogues informatiques majeurs détectés en production",
      "La branche principale Git contenant le code source approuvé par l’architecte",
      "L’ensemble des réunions de crise déclenchées en cas de dépassement budgétaire"
    ],
    correctIndex: 0,
    explanation: "Le chemin critique est le chemin le plus long en durée dans le graphe : tout retard sur une de ses tâches retarde la livraison finale."
  },
  {
    id: "p2-08",
    partId: "part2",
    difficulty: "trap",
    tag: "Chemin critique",
    question: "Quelle valeur prend la marge totale d’une activité située sur le chemin critique d’un projet ?",
    options: [
      "Une marge totale rigoureusement égale à zéro",
      "Une marge systématiquement égale à la durée de la tâche",
      "Une marge infinie permettant n’importe quel report",
      "Une valeur négative imposant la suppression de la tâche"
    ],
    correctIndex: 0,
    explanation: "Par définition mathématique, les activités critiques ne disposent d’aucun battement calendaire : leur marge totale est nulle (MT = 0)."
  },
  {
    id: "p2-09",
    partId: "part2",
    difficulty: "application",
    tag: "Marges",
    question: "Une tâche non critique dispose de 4 jours de marge totale. Si elle subit 3 jours de retard imprévu :",
    options: [
      "Le retard est absorbé sans repousser la date de fin finale du projet",
      "Le projet est automatiquement prolongé d’une durée de 3 semaines entières",
      "La tâche est immédiatement annulée et retirée du périmètre contractuel",
      "Le chemin critique est automatiquement déplacé sur toutes les autres tâches"
    ],
    correctIndex: 0,
    explanation: "Tant que le retard subi reste inférieur ou égal à la marge totale disponible (3j <= 4j), la date de fin globale n’est pas impactée."
  },
  {
    id: "p2-10",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Calculs PERT",
    question: "Dans le formalisme PERT, à quoi correspond la Date au Plus Tôt de début (Early Start - ES) ?",
    options: [
      "La date la plus précoce à laquelle une activité peut débuter en respectant ses antécédents",
      "La date limite absolue avant laquelle la tâche doit impérativement être achevée",
      "Le coût financier minimal estimé pour la rémunération des consultants",
      "L’heure exacte de démarrage de la réunion quotidienne de synchronisation"
    ],
    correctIndex: 0,
    explanation: "L’Early Start (ES) est la date la plus hâtive possible pour commencer, une fois toutes les tâches préalables achevées."
  },
  {
    id: "p2-11",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Calculs PERT",
    question: "Que représente la Date au Plus Tard de fin (Late Finish - LF) d’une tâche dans un réseau PERT ?",
    options: [
      "Le moment ultime d’achèvement de la tâche qui ne retarde pas l’échéance finale du projet",
      "La première minute où le développeur commence à rédiger les spécifications",
      "La durée maximale autorisée pour les pauses déjeuner au sein de l’équipe",
      "La date de fin contractuelle de validité de la licence du logiciel serveur"
    ],
    correctIndex: 0,
    explanation: "Le Late Finish (LF) est la date limite d’achèvement compatible avec la date de livraison finale engagée."
  },
  {
    id: "p2-12",
    partId: "part2",
    difficulty: "application",
    tag: "Calculs PERT",
    question: "Quelle formule mathématique permet de calculer la Marge Totale (MT) d’une activité dans un réseau ?",
    options: [
      "MT = LS − ES (ou LF − EF)",
      "MT = ES + Durée de l’activité",
      "MT = LF + ES − Durée totale",
      "MT = Durée de l’activité divisée par deux"
    ],
    correctIndex: 0,
    explanation: "La marge totale est l’écart entre la date au plus tard et la date au plus tôt : MT = LS - ES = LF - EF."
  },
  {
    id: "p2-13",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Réseau PERT",
    question: "Quelles données élémentaires sont strictement indispensables pour tracer un réseau PERT ?",
    options: [
      "La liste des activités, leurs durées prévisionnelles et leurs antécédents immédiats",
      "L’adresse IP des serveurs distants et la marque des ordinateurs portables",
      "Les commits récents archivés dans la branche principale du dépôt logiciel",
      "La liste des questions de satisfaction rédigées pour les utilisateurs"
    ],
    correctIndex: 0,
    explanation: "Pour construire le graphe PERT, il faut connaître l’ensemble des tâches, leur durée et l’ordre logique de succession."
  },
  {
    id: "p2-14",
    partId: "part2",
    difficulty: "application",
    tag: "Dépendances",
    question: "Si la tâche T2 a pour antécédent unique la tâche T1 dans une relation Fin-à-Début, quand T2 peut-elle commencer ?",
    options: [
      "Dès que la tâche T1 est intégralement terminée",
      "Dès que le premier commit de la tâche T1 est rédigé",
      "Exactement deux semaines avant que la tâche T1 ne commence",
      "Uniquement lorsque le budget total du projet est consommé"
    ],
    correctIndex: 0,
    explanation: "Dans une dépendance simple Fin-à-Début, l’achèvement de T1 est la condition indispensable pour autoriser l’ouverture de T2."
  },
  {
    id: "p2-15",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Découpage WBS",
    question: "Quelle est la structure adoptée par l’organigramme des tâches (WBS) pour décomposer un projet ?",
    options: [
      "Une décomposition arborescente et hiérarchique descendante par niveaux de détail",
      "Un réseau de neurones artificiels simulant la vitesse d’exécution des devis",
      "Une file d’attente linéaire chronologique où les tâches s’empilent sans lien",
      "Un tableau circulaire affichant les pourcentages de congés des développeurs"
    ],
    correctIndex: 0,
    explanation: "Le WBS décompose hiérarchiquement le projet global en sous-ensembles, lots de travaux, puis tâches élémentaires."
  },
  {
    id: "p2-16",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Estimation",
    question: "Sur quels facteurs objectifs repose une estimation fiable de la durée d’une tâche de développement ?",
    options: [
      "La complexité intrinsèque, les compétences disponibles et le retour d’expérience historique",
      "La couleur des icônes choisies pour le tableau de bord de pilotage du projet",
      "Le nombre d’années d’études universitaires accomplies par le commanditaire métier",
      "La distance géographique séparant les bureaux du client de ceux de l’agence"
    ],
    correctIndex: 0,
    explanation: "Une estimation sérieuse s’appuie sur l’analyse de la charge de travail, le niveau d’expertise de l’équipe et les projets similaires passés."
  },
  {
    id: "p2-17",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Ressources",
    question: "Pourquoi est-il indispensable d’intégrer la disponibilité effective des ressources lors de la planification ?",
    options: [
      "Parce qu’un manque de personnel qualifié décale mécaniquement les dates réalisables",
      "Parce que les ressources disponibles annulent systématiquement les antécédents",
      "Parce que la disponibilité des ingénieurs dispense de réaliser la moindre analyse",
      "Parce que cela permet de supprimer automatiquement les réunions de validation"
    ],
    correctIndex: 0,
    explanation: "Même si une tâche dure 3 jours, si le spécialiste concerné n’est disponible que la semaine suivante, la tâche ne peut pas débuter avant."
  },
  {
    id: "p2-18",
    partId: "part2",
    difficulty: "application",
    tag: "Contraintes de planning",
    question: "Parmi les situations suivantes, laquelle illustre une contrainte de calendrier externe stricte ?",
    options: [
      "Une mise en conformité réglementaire imposée par la loi au 1er janvier impératif",
      "Le choix arbitraire du nom de la branche de développement par le stagiaire",
      "L’obligation d’utiliser une police de caractères sans empattement sur le portail",
      "La décision de programmer la réunion de démonstration en début d’après-midi"
    ],
    correctIndex: 0,
    explanation: "Une échéance légale ou contractuelle fixe une date butoir externe non négociable pour le calendrier du projet."
  },
  {
    id: "p2-19",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Ressources",
    question: "En planification opérationnelle, quel est l’objectif de la technique dite de « nivellement des ressources » ?",
    options: [
      "Éviter les pics de surcharge irréalistes en étalant les tâches selon les capacités réelles",
      "Augmenter volontairement la complexité algorithmique des programmes informatiques",
      "Supprimer toutes les dépendances logiques identifiées dans le graphe du projet",
      "Remplacer les réunions d’équipe par des rapports écrits individuels hebdomadaires"
    ],
    correctIndex: 0,
    explanation: "Le nivellement lisse la charge de travail pour éviter qu’une même personne ne soit allouée à 200% sur une même période."
  },
  {
    id: "p2-20",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Livrables",
    question: "Comment définit-on précisément un « livrable » de projet dans le référentiel OFPPT ?",
    options: [
      "Un résultat tangible, mesurable et vérifiable produit au cours ou à la fin du projet",
      "Une conversation téléphonique informelle entre deux membres de l’équipe de test",
      "Une commande passée en ligne sur un site d’achat de matériel de bureau",
      "Le badge électronique utilisé pour franchir les portes sécurisées du bâtiment"
    ],
    correctIndex: 0,
    explanation: "Un livrable est un document, un module logiciel, un composant ou un système formellement vérifiable et remis au client."
  },
  {
    id: "p2-21",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Exigences",
    question: "Laquelle des affirmations suivantes représente une exigence FONCTIONNELLE d’un système d’information ?",
    options: [
      "L’utilisateur doit pouvoir réinitialiser son mot de passe en recevant un courriel",
      "Le serveur d’hébergement doit résister à un séisme d’une magnitude supérieure à 7",
      "Le système doit impérativement supporter un pic de charge de 20 000 requêtes par minute",
      "L’interface doit respecter les normes d’accessibilité pour les personnes malvoyantes"
    ],
    correctIndex: 0,
    explanation: "Une exigence fonctionnelle décrit un service rendu ou un comportement spécifique que le système doit offrir à l’utilisateur."
  },
  {
    id: "p2-22",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Exigences",
    question: "Parmi les propositions ci-dessous, laquelle constitue une exigence NON FONCTIONNELLE ?",
    options: [
      "Le chiffrement des données de paiement bancaire selon le standard AES-256 bits",
      "La possibilité pour un client de déposer un article dans son panier virtuel",
      "L’impression automatique de la facture au format PDF après validation",
      "L’envoi d’un message d’alerte par notification SMS lors de la livraison du colis"
    ],
    correctIndex: 0,
    explanation: "La sécurité, le chiffrement, la rapidité ou la disponibilité sont des exigences non fonctionnelles (qualités techniques transverses)."
  },
  {
    id: "p2-23",
    partId: "part2",
    difficulty: "application",
    tag: "Diagramme de Gantt",
    question: "Quel avantage distinctif offre le diagramme de Gantt pour le pilotage d’une équipe multi-profils ?",
    options: [
      "Rendre immédiatement visibles les périodes de parallélisme et de chevauchement d’activités",
      "Détecter automatiquement les failles de sécurité présentes dans le code PHP",
      "Créer les tables et les clés primaires dans la base de données relationnelle",
      "Calculer la complexité cyclomatique des fonctions mathématiques du programme"
    ],
    correctIndex: 0,
    explanation: "Le Gantt permet de visualiser facilement qui travaille en même temps et quelles tâches peuvent être menées de front."
  },
  {
    id: "p2-24",
    partId: "part2",
    difficulty: "calculation",
    tag: "Calculs de durée",
    question: "Une activité A dure 4 jours. L’activité B, qui dépend strictement de A, dure 3 jours. Quelle est la durée minimale de cette chaîne ?",
    options: [
      "7 jours de travail consécutifs",
      "4 jours de travail au total",
      "3 jours de travail au total",
      "12 jours de travail cumulés"
    ],
    correctIndex: 0,
    explanation: "Pour une suite séquentielle de deux activités dépendantes Fin-à-Début, les durées s’additionnent : 4 + 3 = 7 jours."
  },
  {
    id: "p2-25",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Calculs PERT",
    question: "Dans un réseau PERT, à quoi sert l’étape du passage en avant (forward pass) effectuée de gauche à droite ?",
    options: [
      "Calculer les dates au plus tôt de début et de fin de chaque tâche du réseau",
      "Déterminer les dates au plus tard et calculer les marges libres des activités",
      "Compter le nombre de lignes de code écrites par les développeurs du projet",
      "Identifier les failles de sécurité potentielles présentes dans les serveurs"
    ],
    correctIndex: 0,
    explanation: "Le passage en avant calcule pas à pas, du début vers la fin, les dates au plus tôt (Early Start et Early Finish)."
  },
  {
    id: "p2-26",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Calculs PERT",
    question: "À quoi sert l’étape du passage en arrière (backward pass) effectuée de la fin vers le début du réseau ?",
    options: [
      "Calculer les dates au plus tard et déterminer les marges de chaque activité",
      "Réinitialiser toutes les dates au plus tôt calculées lors de l’étape précédente",
      "Créer une nouvelle branche de développement dans le dépôt distant du projet",
      "Estimer le montant total de la taxe sur la valeur ajoutée applicable au devis"
    ],
    correctIndex: 0,
    explanation: "Le passage en arrière part de la date finale pour calculer les dates au plus tard (Late Start et Late Finish) et en déduire les marges."
  },
  {
    id: "p2-27",
    partId: "part2",
    difficulty: "calculation",
    tag: "Calculs de durée",
    question: "Deux tâches indépendantes C (durée = 5 jours) et D (durée = 8 jours) s’exécutent en parallèle après la tâche A. Quelle durée s’écoule avant de pouvoir démarrer la suite ?",
    options: [
      "8 jours au total (la branche la plus longue détermine le temps d’attente)",
      "13 jours au total (en additionnant obligatoirement les deux durées)",
      "5 jours au total (en ne retenant que la tâche la plus rapide des deux)",
      "3 jours au total (en soustrayant la plus petite de la plus grande durée)"
    ],
    correctIndex: 0,
    explanation: "En cas de convergence parallèle, la suite ne peut démarrer que lorsque toutes les tâches sont finies : c’est le maximum (8 jours) qui s’impose."
  },
  {
    id: "p2-28",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Cahier des charges",
    question: "Quel est l’objectif prioritaire lors de la revue critique d’un cahier des charges client avant démarrage ?",
    options: [
      "Débusquer les ambiguïtés, vérifier la faisabilité technique et borner le périmètre",
      "Changer immédiatement la couleur de fond de l’ensemble des pages de l’application",
      "Remplacer tous les tests logiciels par de simples déclarations orales de confiance",
      "Obliger le client à apprendre les lignes de commande du système d’exploitation"
    ],
    correctIndex: 0,
    explanation: "L’analyse du cahier des charges permet de clarifier les zones d’ombre, d’éviter les malentendus et d’établir une base saine de travail."
  },
  {
    id: "p2-29",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Exigences",
    question: "Dans le cadre de la recette d’une application, à quoi sert un « critère d’acceptation » ?",
    options: [
      "Fournir une condition objective et observable permettant de valider la conformité d’une fonction",
      "Déterminer le montant de l’amende infligée au stagiaire en cas de retard le matin",
      "Augmenter artificiellement le nombre de points d’histoire estimés dans le tableau",
      "Sélectionner la police d’écriture utilisée dans le code source de l’application web"
    ],
    correctIndex: 0,
    explanation: "Un critère d’acceptation fixe les conditions précises et vérifiables pour considérer qu’une exigence est correctement implémentée."
  },
  {
    id: "p2-30",
    partId: "part2",
    difficulty: "comprehension",
    tag: "Planification",
    question: "À quel résultat concret doit aboutir une démarche méthodique de planification de projet ?",
    options: [
      "Un calendrier cohérent reliant les activités, leurs ressources, les jalons et les risques",
      "Un document textuel de 1 000 pages sans aucune date ni échéance calendaire précise",
      "Un dépôt informatique vide ne comportant aucun fichier de configuration réseau",
      "La promesse orale qu’aucun contrôle de conformité ne sera exigé par la direction"
    ],
    correctIndex: 0,
    explanation: "Une bonne planification produit un dispositif d’ordonnancement complet, réaliste et partagé par tous les acteurs pour guider l’action."
  }
];
