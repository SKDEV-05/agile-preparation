import { LabExercise } from '../../types/reactLabTypes';

export const LAB_6_ROUTING: LabExercise = {
  id: 'lab-6-routing',
  moduleId: 'module6',
  moduleLabel: 'Module 6 : Routage & Tests',
  chapterTitle: 'Routage Client SPA avec React Router DOM',
  title: 'Atelier 6 : Navigation SPA sans Rechargement (Routes & Links)',
  subtitle: 'Configurez la navigation multi-pages déclarative avec BrowserRouter, Routes, Route et Link.',
  difficulty: 'practice',
  concepts: ['BrowserRouter', 'Routes', 'Route', 'Link', 'useParams', 'Navigation SPA'],
  taskInstructions: [
    'Ouvrez "src/App.jsx".',
    'Structurez la barre de navigation avec le composant `<Link to="...">` (jamais de balise <a href> native).',
    'Définissez les deux routes principales dans `<Routes>` : chemin racine `/` vers `<Accueil />` et `/details` vers `<Details />`.',
    'Testez les clics entre les deux liens pour observer la transition instantanée sans rechargement de page.'
  ],
  conceptReminder: {
    title: 'Pourquoi <Link> au lieu de <a href> ?',
    explanation: 'La balise HTML <a href="..."> force le navigateur à envoyer une nouvelle requête HTTP au serveur et recharger entièrement le document HTML. Le composant <Link to="..."> de React Router intercepte le clic, met à jour l\'historique du navigateur avec window.history.pushState() et échange le composant à l\'écran instantanément sans perte d\'état.',
    diagramText: 'Clic <Link to="/details"> ──► pushState() URL ──► <Routes> sélectionne <Route> ──► Nouveau composant affiché',
    keyRule: 'Dans une SPA React, n\'utilisez JAMAIS <a href> pour les liens internes de votre application.'
  },
  entryFile: 'src/App.jsx',
  files: [
    {
      name: 'App.jsx',
      path: 'src/App.jsx',
      content: `import React, { useState } from 'react';

export default function App() {
  // TODO 1 : Déclarez un état pour la route active (valeur initiale : '/')
  

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      {/* Barre de navigation SPA avec boutons simulant <Link to="..."> */}
      <nav style={{ display: 'flex', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0', marginBottom: '20px' }}>
        {/* TODO 2 : Bouton vers Accueil '/' (avec style vert si actif) */}
        

        {/* TODO 3 : Bouton vers Détails '/details' (avec style vert si actif) */}
        
      </nav>

      {/* Rendu conditionnel des vues */}
      <main>
        {/* TODO 4 : Affichage de la vue Accueil si route === '/' */}
        

        {/* TODO 5 : Affichage de la vue Détails si route === '/details' */}
        
      </main>
    </div>
  );
}`
    }
  ],
  tests: [
    {
      id: 'test-routing-views',
      title: 'Support multi-vues',
      description: 'L\'application doit gérer au moins deux chemins de navigation distincts.',
      check: (code) => /route/.test(code) && /details/.test(code)
    },
    {
      id: 'test-active-highlight',
      title: 'Indicateur de route active',
      description: 'Le bouton ou lien actif doit changer d\'apparence visuelle.',
      check: (code) => /route\s*===/.test(code)
    }
  ],
  hints: [
    {
      level: 1,
      title: 'Concept de route',
      content: 'En React Router, <Routes> enveloppe les balises <Route path="/" element={<Accueil />} />.'
    },
    {
      level: 2,
      title: 'Navigation fluide',
      content: 'Le composant <Link to="..."> évite les rafraîchissements de page.'
    },
    {
      level: 3,
      title: 'Paramètres dynamiques',
      content: 'Pour une route comme /stagiaire/:id, le hook useParams() permet d\'extraire la valeur de id.'
    }
  ],
  solution: {
    explanation: 'Le routage côté client est le cœur des Single Page Applications : l\'URL change dans la barre d\'adresse, mais la page HTML n\'est jamais rechargée par le serveur.',
    files: [
      {
        path: 'src/App.jsx',
        content: `import React, { useState } from 'react';

export default function App() {
  const [route, setRoute] = useState('/');

  return (
    <div>
      <nav>
        <button onClick={() => setRoute('/')}>Accueil</button>
        <button onClick={() => setRoute('/details')}>Détails</button>
      </nav>
      {route === '/' ? <div>Accueil</div> : <div>Détails</div>}
    </div>
  );
}`
      }
    ]
  },
  microQcm: {
    question: 'Quel composant de react-router-dom devez-vous utiliser à la place de la balise HTML <a href> ?',
    options: [
      'Le composant <Link to="..."> pour éviter le rechargement de page.',
      'Le composant <RedirectNow>.',
      'Le composant <AnchorTag>.',
      'La balise standard <button formAction>.'
    ],
    correctIndex: 0,
    explanation: 'Le composant <Link> de react-router-dom intercepte l\'événement de navigation pour mettre à jour l\'historique sans recharger le document HTML.'
  }
};
