export interface PlaygroundTemplate {
  id: string;
  name: string;
  module: string;
  description: string;
  files: {
    name: string;
    code: string;
  }[];
}

export const PLAYGROUND_TEMPLATES: PlaygroundTemplate[] = [
  {
    id: 'starter',
    name: 'Composant Starter (App & useState)',
    module: 'React Base',
    description: 'Structure minimale propre avec import React, useState, texte et export default function App.',
    files: [
      {
        name: 'App.jsx',
        code: `import React, { useState } from 'react';

export default function App() {
  const [texte, setTexte] = useState('Bonjour OFPPT !');

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1 style={{ color: '#10B981', fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        {texte}
      </h1>
      <button 
        onClick={() => setTexte('Bravo ! React fonctionne parfaitement.')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#10B981',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Changer le texte
      </button>
    </div>
  );
}`
      }
    ]
  },
  {
    id: 'counter',
    name: 'Compteur avec useState & Updater',
    module: 'Module 4 (PDF 4)',
    description: 'Gestion d\'un état local numérique avec fonction updater (prev => prev + 1).',
    files: [
      {
        name: 'App.jsx',
        code: `import React, { useState } from 'react';

export default function App() {
  const [compteur, setCompteur] = useState(0);

  const incrementer = () => {
    // Utilisation de la fonction updater recommandée par l'OFPPT
    setCompteur(prev => prev + 1);
    console.log("Compteur incrémenté :", compteur + 1);
  };

  const decrementer = () => {
    setCompteur(prev => Math.max(0, prev - 1));
  };

  const reinitialiser = () => {
    setCompteur(0);
    console.log("Compteur réinitialisé");
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '420px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
        Compteur Interactif OFPPT
      </h2>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
        Manipulez l'état local avec le hook <code>useState</code>.
      </p>

      <div style={{ 
        fontSize: '44px', 
        fontWeight: '900', 
        color: '#10B981', 
        textAlign: 'center', 
        padding: '20px', 
        backgroundColor: '#f3f4f6', 
        borderRadius: '16px',
        marginBottom: '16px'
      }}>
        {compteur}
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button 
          onClick={decrementer}
          style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #ccc', cursor: 'pointer', fontWeight: 'bold' }}
        >
          - 1
        </button>
        <button 
          onClick={incrementer}
          style={{ padding: '10px 24px', borderRadius: '10px', backgroundColor: '#10B981', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
          + 1 Point
        </button>
        <button 
          onClick={reinitialiser}
          style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #ccc', cursor: 'pointer' }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}`
      }
    ]
  },
  {
    id: 'controlled_form',
    name: 'Formulaire d\'Inscription Contrôlé',
    module: 'Module 5 (PDF 5)',
    description: 'Gestion multi-champs dynamique [name]: value et annulation de soumission avec e.preventDefault().',
    files: [
      {
        name: 'App.jsx',
        code: `import React, { useState } from 'react';

export default function App() {
  const [form, setForm] = useState({
    nom: 'Sara El Mansouri',
    email: 'sara.ofppt@example.ma',
    filiere: 'Développement Digital',
    mention: 'Bien'
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Mise à jour dynamique de la clé d'objet sans mutation directe
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    console.log(\`Champ modifié : \${name} = \${value}\`);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // EMPÊCHE LE RECHARGEMENT BRUTAL DE LA PAGE !
    setMessage(\`Stagiaire enregistré avec succès : \${form.nom} (\${form.filiere})\`);
    console.log("Formulaire soumis :", form);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '440px', margin: '0 auto' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>
        Fiche d'Inscription Stagiaire
      </h3>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Nom complet :</label>
          <input 
            type="text" 
            name="nom" 
            value={form.nom} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Email académique :</label>
          <input 
            type="email" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Filière :</label>
          <select 
            name="filiere" 
            value={form.filiere} 
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          >
            <option value="Développement Digital">Développement Digital (FullStack)</option>
            <option value="Infrastructure Digitale">Infrastructure Digitale</option>
            <option value="Design Graphique">Design Graphique</option>
          </select>
        </div>

        <button 
          type="submit"
          style={{ marginTop: '8px', padding: '10px', backgroundColor: '#10B981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Valider l'Inscription
        </button>
      </form>

      {message && (
        <div style={{ marginTop: '14px', padding: '10px', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '8px', fontSize: '13px' }}>
          ✓ {message}
        </div>
      )}
    </div>
  );
}`
      }
    ]
  },
  {
    id: 'list_keys',
    name: 'Rendu de Listes & Filtrage avec Keys',
    module: 'Module 5 (PDF 5)',
    description: 'Transformation avec .map() et utilisation d\'une clé stable et unique (item.id).',
    files: [
      {
        name: 'App.jsx',
        code: `import React, { useState } from 'react';

const STAGIAIRES_INITIAUX = [
  { id: 's1', nom: 'Karim Bennani', module: 'React.js', note: 18 },
  { id: 's2', nom: 'Amina Mansouri', module: 'Agile & Scrum', note: 16 },
  { id: 's3', nom: 'Yassine Tazi', module: 'React.js', note: 19 },
  { id: 's4', nom: 'Imane Chraibi', module: 'Laravel API', note: 14 }
];

export default function App() {
  const [stagiaires, setStagiaires] = useState(STAGIAIRES_INITIAUX);
  const [filtre, setFiltre] = useState('Tous');

  const listeAffichee = filtre === 'Tous'
    ? stagiaires
    : stagiaires.filter(s => s.module === filtre);

  const supprimerStagiaire = (idASupprimer) => {
    // Suppression 100% immuable avec .filter()
    setStagiaires(prev => prev.filter(s => s.id !== idASupprimer));
    console.log("Stagiaire supprimé ID :", idASupprimer);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '440px', margin: '0 auto' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
        Gestion des Modules & Notes
      </h3>

      <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px' }}>Filtrer par module :</span>
        <select value={filtre} onChange={e => setFiltre(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
          <option value="Tous">Toutes les matières</option>
          <option value="React.js">React.js</option>
          <option value="Agile & Scrum">Agile & Scrum</option>
          <option value="Laravel API">Laravel API</option>
        </select>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {listeAffichee.map(item => (
          // IMPORTANT : key={item.id} assure la réconciliation parfaite
          <li 
            key={item.id}
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '10px', 
              borderBottom: '1px solid #eee',
              fontSize: '13px'
            }}
          >
            <div>
              <strong>{item.nom}</strong>
              <div style={{ fontSize: '11px', color: '#666' }}>{item.module} · Note : {item.note}/20</div>
            </div>
            <button 
              onClick={() => supprimerStagiaire(item.id)}
              style={{ padding: '4px 10px', backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}`
      }
    ]
  },
  {
    id: 'fetch_effect',
    name: 'Requête API avec useEffect (Loading & Erreur)',
    module: 'Module 5 (PDF 5)',
    description: 'Consommation d\'API distante avec gestion des 3 états essentiels : chargement, succès et erreur.',
    files: [
      {
        name: 'App.jsx',
        code: `import React, { useState, useEffect } from 'react';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Démarrage de la requête Fetch API...");
    
    // Requête REST vers API publique JSONPlaceholder
    fetch('https://jsonplaceholder.typicode.com/users?_limit=4')
      .then(res => {
        if (!res.ok) throw new Error("Erreur réseau HTTP " + res.status);
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
        console.log("Données reçues :", data);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
        console.error("Erreur API :", err);
      });
  }, []); // [] = s'exécute une unique fois au montage

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif', color: '#10B981' }}>
        <strong>Chargement des stagiaires distants en cours...</strong>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red', fontFamily: 'sans-serif' }}>
        Erreur : {error}
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '440px', margin: '0 auto' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>
        Données Distantes (Fetch API)
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {users.map(user => (
          <div key={user.id} style={{ padding: '10px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }}>
            <div style={{ fontWeight: 'bold' }}>{user.name}</div>
            <div style={{ color: '#6b7280', fontSize: '11px' }}>{user.email} · {user.company?.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}`
      }
    ]
  }
];
