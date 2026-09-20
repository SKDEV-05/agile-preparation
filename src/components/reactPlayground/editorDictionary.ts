export type WordKind = 
  | 'keyword' 
  | 'hook' 
  | 'tag' 
  | 'prop' 
  | 'variable' 
  | 'function' 
  | 'package' 
  | 'css-property' 
  | 'css-value';

export interface WordSuggestionItem {
  word: string;
  detail: string;
  kind: WordKind;
  category: 'css-prop' | 'css-val' | 'jsx-prop' | 'jsx-tag' | 'hook' | 'keyword' | 'js-api' | 'package';
}

// ── COMPREHENSIVE VSCODE-GRADE DICTIONARY (CSS, HTML, JS, REACT, REDUX) ──
export const VSCODE_WORD_DICTIONARY: WordSuggestionItem[] = [
  // ── 1. CSS PROPERTIES (React camelCase & CSS kebab-case) ──
  { word: 'backgroundColor', detail: 'CSS couleur de fond', kind: 'css-property', category: 'css-prop' },
  { word: 'background', detail: 'CSS arrière-plan', kind: 'css-property', category: 'css-prop' },
  { word: 'color', detail: 'CSS couleur du texte', kind: 'css-property', category: 'css-prop' },
  { word: 'fontSize', detail: 'CSS taille police (ex: 14px, 1rem)', kind: 'css-property', category: 'css-prop' },
  { word: 'fontWeight', detail: 'CSS graisse police (ex: bold, 600)', kind: 'css-property', category: 'css-prop' },
  { word: 'fontFamily', detail: 'CSS famille police', kind: 'css-property', category: 'css-prop' },
  { word: 'fontStyle', detail: 'CSS style police (italic, normal)', kind: 'css-property', category: 'css-prop' },
  { word: 'lineHeight', detail: 'CSS hauteur de ligne', kind: 'css-property', category: 'css-prop' },
  { word: 'letterSpacing', detail: 'CSS espacement des lettres', kind: 'css-property', category: 'css-prop' },
  { word: 'textAlign', detail: 'CSS alignement texte', kind: 'css-property', category: 'css-prop' },
  { word: 'textDecoration', detail: 'CSS décoration texte (underline)', kind: 'css-property', category: 'css-prop' },
  { word: 'textTransform', detail: 'CSS casse texte (uppercase)', kind: 'css-property', category: 'css-prop' },

  { word: 'display', detail: 'CSS affichage (flex, grid, block)', kind: 'css-property', category: 'css-prop' },
  { word: 'flex', detail: 'CSS raccourci flex', kind: 'css-property', category: 'css-prop' },
  { word: 'flexDirection', detail: 'CSS direction flex (row, column)', kind: 'css-property', category: 'css-prop' },
  { word: 'flexWrap', detail: 'CSS retour à la ligne flex', kind: 'css-property', category: 'css-prop' },
  { word: 'flexGrow', detail: 'CSS facteur d\'agrandissement flex', kind: 'css-property', category: 'css-prop' },
  { word: 'flexShrink', detail: 'CSS facteur de rétrécissement flex', kind: 'css-property', category: 'css-prop' },
  { word: 'justifyContent', detail: 'CSS alignement axe principal', kind: 'css-property', category: 'css-prop' },
  { word: 'alignItems', detail: 'CSS alignement axe secondaire', kind: 'css-property', category: 'css-prop' },
  { word: 'alignSelf', detail: 'CSS alignement élément flex', kind: 'css-property', category: 'css-prop' },
  { word: 'gap', detail: 'CSS espacement grille / flex', kind: 'css-property', category: 'css-prop' },
  { word: 'rowGap', detail: 'CSS espacement lignes', kind: 'css-property', category: 'css-prop' },
  { word: 'columnGap', detail: 'CSS espacement colonnes', kind: 'css-property', category: 'css-prop' },
  { word: 'gridTemplateColumns', detail: 'CSS colonnes grille', kind: 'css-property', category: 'css-prop' },
  { word: 'gridTemplateRows', detail: 'CSS lignes grille', kind: 'css-property', category: 'css-prop' },

  { word: 'padding', detail: 'CSS marge intérieure globale', kind: 'css-property', category: 'css-prop' },
  { word: 'paddingTop', detail: 'CSS marge intérieure haute', kind: 'css-property', category: 'css-prop' },
  { word: 'paddingBottom', detail: 'CSS marge intérieure basse', kind: 'css-property', category: 'css-prop' },
  { word: 'paddingLeft', detail: 'CSS marge intérieure gauche', kind: 'css-property', category: 'css-prop' },
  { word: 'paddingRight', detail: 'CSS marge intérieure droite', kind: 'css-property', category: 'css-prop' },
  { word: 'paddingInline', detail: 'CSS marge intérieure horizontale', kind: 'css-property', category: 'css-prop' },
  { word: 'paddingBlock', detail: 'CSS marge intérieure verticale', kind: 'css-property', category: 'css-prop' },

  { word: 'margin', detail: 'CSS marge extérieure globale', kind: 'css-property', category: 'css-prop' },
  { word: 'marginTop', detail: 'CSS marge extérieure haute', kind: 'css-property', category: 'css-prop' },
  { word: 'marginBottom', detail: 'CSS marge extérieure basse', kind: 'css-property', category: 'css-prop' },
  { word: 'marginLeft', detail: 'CSS marge extérieure gauche', kind: 'css-property', category: 'css-prop' },
  { word: 'marginRight', detail: 'CSS marge extérieure droite', kind: 'css-property', category: 'css-prop' },
  { word: 'marginInline', detail: 'CSS marge extérieure horizontale', kind: 'css-property', category: 'css-prop' },

  { word: 'border', detail: 'CSS bordure (ex: 1px solid #ccc)', kind: 'css-property', category: 'css-prop' },
  { word: 'borderRadius', detail: 'CSS arrondi bordure (ex: 8px)', kind: 'css-property', category: 'css-prop' },
  { word: 'borderColor', detail: 'CSS couleur bordure', kind: 'css-property', category: 'css-prop' },
  { word: 'borderWidth', detail: 'CSS épaisseur bordure', kind: 'css-property', category: 'css-prop' },
  { word: 'borderStyle', detail: 'CSS style bordure (solid, dashed)', kind: 'css-property', category: 'css-prop' },
  { word: 'borderBottom', detail: 'CSS bordure inférieure', kind: 'css-property', category: 'css-prop' },
  { word: 'borderTop', detail: 'CSS bordure supérieure', kind: 'css-property', category: 'css-prop' },

  { word: 'width', detail: 'CSS largeur', kind: 'css-property', category: 'css-prop' },
  { word: 'height', detail: 'CSS hauteur', kind: 'css-property', category: 'css-prop' },
  { word: 'minWidth', detail: 'CSS largeur minimale', kind: 'css-property', category: 'css-prop' },
  { word: 'maxWidth', detail: 'CSS largeur maximale', kind: 'css-property', category: 'css-prop' },
  { word: 'minHeight', detail: 'CSS hauteur minimale', kind: 'css-property', category: 'css-prop' },
  { word: 'maxHeight', detail: 'CSS hauteur maximale', kind: 'css-property', category: 'css-prop' },

  { word: 'cursor', detail: 'CSS pointeur souris (pointer, default)', kind: 'css-property', category: 'css-prop' },
  { word: 'position', detail: 'CSS positionnement', kind: 'css-property', category: 'css-prop' },
  { word: 'top', detail: 'CSS décalage haut', kind: 'css-property', category: 'css-prop' },
  { word: 'bottom', detail: 'CSS décalage bas', kind: 'css-property', category: 'css-prop' },
  { word: 'left', detail: 'CSS décalage gauche', kind: 'css-property', category: 'css-prop' },
  { word: 'right', detail: 'CSS décalage droite', kind: 'css-property', category: 'css-prop' },
  { word: 'zIndex', detail: 'CSS ordre d\'empilement z-index', kind: 'css-property', category: 'css-prop' },
  { word: 'opacity', detail: 'CSS opacité (0 à 1)', kind: 'css-property', category: 'css-prop' },
  { word: 'overflow', detail: 'CSS débordement contenu', kind: 'css-property', category: 'css-prop' },
  { word: 'overflowX', detail: 'CSS débordement horizontal', kind: 'css-property', category: 'css-prop' },
  { word: 'overflowY', detail: 'CSS débordement vertical', kind: 'css-property', category: 'css-prop' },
  { word: 'boxShadow', detail: 'CSS ombre portée', kind: 'css-property', category: 'css-prop' },
  { word: 'boxSizing', detail: 'CSS modèle de boîte (border-box)', kind: 'css-property', category: 'css-prop' },
  { word: 'transition', detail: 'CSS transition animée', kind: 'css-property', category: 'css-prop' },
  { word: 'transform', detail: 'CSS transformation (scale, rotate)', kind: 'css-property', category: 'css-prop' },
  { word: 'userSelect', detail: 'CSS sélection de texte', kind: 'css-property', category: 'css-prop' },
  { word: 'outline', detail: 'CSS contour externe', kind: 'css-property', category: 'css-prop' },

  // Kebab-case equivalents for CSS stylesheets
  { word: 'background-color', detail: 'CSS couleur de fond', kind: 'css-property', category: 'css-prop' },
  { word: 'border-radius', detail: 'CSS arrondi de bordure', kind: 'css-property', category: 'css-prop' },
  { word: 'font-size', detail: 'CSS taille police', kind: 'css-property', category: 'css-prop' },
  { word: 'font-weight', detail: 'CSS graisse police', kind: 'css-property', category: 'css-prop' },
  { word: 'justify-content', detail: 'CSS alignement principal', kind: 'css-property', category: 'css-prop' },
  { word: 'align-items', detail: 'CSS alignement secondaire', kind: 'css-property', category: 'css-prop' },
  { word: 'flex-direction', detail: 'CSS direction flexbox', kind: 'css-property', category: 'css-prop' },
  { word: 'box-shadow', detail: 'CSS ombre de boîte', kind: 'css-property', category: 'css-prop' },
  { word: 'box-sizing', detail: 'CSS modèle de boîte', kind: 'css-property', category: 'css-prop' },

  // ── 2. CSS VALUES ──
  { word: "'flex'", detail: 'Valeur CSS display: flex', kind: 'css-value', category: 'css-val' },
  { word: "'grid'", detail: 'Valeur CSS display: grid', kind: 'css-value', category: 'css-val' },
  { word: "'block'", detail: 'Valeur CSS display: block', kind: 'css-value', category: 'css-val' },
  { word: "'inline-block'", detail: 'Valeur CSS display: inline-block', kind: 'css-value', category: 'css-val' },
  { word: "'none'", detail: 'Valeur CSS display / border: none', kind: 'css-value', category: 'css-val' },
  { word: "'center'", detail: 'Valeur CSS align / justify center', kind: 'css-value', category: 'css-val' },
  { word: "'space-between'", detail: 'Valeur CSS justify-content', kind: 'css-value', category: 'css-val' },
  { word: "'space-around'", detail: 'Valeur CSS justify-content', kind: 'css-value', category: 'css-val' },
  { word: "'space-evenly'", detail: 'Valeur CSS justify-content', kind: 'css-value', category: 'css-val' },
  { word: "'flex-start'", detail: 'Valeur CSS align / justify start', kind: 'css-value', category: 'css-val' },
  { word: "'flex-end'", detail: 'Valeur CSS align / justify end', kind: 'css-value', category: 'css-val' },
  { word: "'column'", detail: 'Valeur CSS flex-direction', kind: 'css-value', category: 'css-val' },
  { word: "'row'", detail: 'Valeur CSS flex-direction', kind: 'css-value', category: 'css-val' },
  { word: "'wrap'", detail: 'Valeur CSS flex-wrap', kind: 'css-value', category: 'css-val' },
  { word: "'nowrap'", detail: 'Valeur CSS flex-wrap', kind: 'css-value', category: 'css-val' },
  { word: "'pointer'", detail: 'Valeur CSS cursor: pointer', kind: 'css-value', category: 'css-val' },
  { word: "'default'", detail: 'Valeur CSS cursor: default', kind: 'css-value', category: 'css-val' },
  { word: "'not-allowed'", detail: 'Valeur CSS cursor: not-allowed', kind: 'css-value', category: 'css-val' },
  { word: "'bold'", detail: 'Valeur CSS font-weight: bold', kind: 'css-value', category: 'css-val' },
  { word: "'normal'", detail: 'Valeur CSS font-weight: normal', kind: 'css-value', category: 'css-val' },
  { word: "'sans-serif'", detail: 'Valeur CSS font-family', kind: 'css-value', category: 'css-val' },
  { word: "'monospace'", detail: 'Valeur CSS font-family', kind: 'css-value', category: 'css-val' },
  { word: "'relative'", detail: 'Valeur CSS position: relative', kind: 'css-value', category: 'css-val' },
  { word: "'absolute'", detail: 'Valeur CSS position: absolute', kind: 'css-value', category: 'css-val' },
  { word: "'fixed'", detail: 'Valeur CSS position: fixed', kind: 'css-value', category: 'css-val' },
  { word: "'sticky'", detail: 'Valeur CSS position: sticky', kind: 'css-value', category: 'css-val' },
  { word: "'hidden'", detail: 'Valeur CSS overflow / visibility', kind: 'css-value', category: 'css-val' },
  { word: "'visible'", detail: 'Valeur CSS overflow / visibility', kind: 'css-value', category: 'css-val' },
  { word: "'scroll'", detail: 'Valeur CSS overflow: scroll', kind: 'css-value', category: 'css-val' },
  { word: "'auto'", detail: 'Valeur CSS auto (margin / overflow)', kind: 'css-value', category: 'css-val' },
  { word: "'solid'", detail: 'Valeur CSS border-style: solid', kind: 'css-value', category: 'css-val' },
  { word: "'dashed'", detail: 'Valeur CSS border-style: dashed', kind: 'css-value', category: 'css-val' },
  { word: "'transparent'", detail: 'Valeur CSS couleur transparente', kind: 'css-value', category: 'css-val' },
  { word: "'border-box'", detail: 'Valeur CSS box-sizing', kind: 'css-value', category: 'css-val' },
  { word: "'100%'", detail: 'Valeur CSS 100%', kind: 'css-value', category: 'css-val' },

  // ── 3. HTML & JSX TAGS ──
  { word: 'div', detail: 'Balise conteneur bloc', kind: 'tag', category: 'jsx-tag' },
  { word: 'span', detail: 'Balise conteneur en ligne', kind: 'tag', category: 'jsx-tag' },
  { word: 'p', detail: 'Balise paragraphe de texte', kind: 'tag', category: 'jsx-tag' },
  { word: 'button', detail: 'Balise bouton cliquable', kind: 'tag', category: 'jsx-tag' },
  { word: 'input', detail: 'Balise champ de saisie', kind: 'tag', category: 'jsx-tag' },
  { word: 'form', detail: 'Balise formulaire', kind: 'tag', category: 'jsx-tag' },
  { word: 'label', detail: 'Balise étiquette de champ', kind: 'tag', category: 'jsx-tag' },
  { word: 'select', detail: 'Balise menu déroulant', kind: 'tag', category: 'jsx-tag' },
  { word: 'option', detail: 'Balise option de sélection', kind: 'tag', category: 'jsx-tag' },
  { word: 'textarea', detail: 'Balise zone de texte multi-lignes', kind: 'tag', category: 'jsx-tag' },
  { word: 'h1', detail: 'Titre de niveau 1', kind: 'tag', category: 'jsx-tag' },
  { word: 'h2', detail: 'Titre de niveau 2', kind: 'tag', category: 'jsx-tag' },
  { word: 'h3', detail: 'Titre de niveau 3', kind: 'tag', category: 'jsx-tag' },
  { word: 'h4', detail: 'Titre de niveau 4', kind: 'tag', category: 'jsx-tag' },
  { word: 'ul', detail: 'Liste non ordonnée', kind: 'tag', category: 'jsx-tag' },
  { word: 'ol', detail: 'Liste ordonnée', kind: 'tag', category: 'jsx-tag' },
  { word: 'li', detail: 'Élément de liste', kind: 'tag', category: 'jsx-tag' },
  { word: 'table', detail: 'Tableau de données', kind: 'tag', category: 'jsx-tag' },
  { word: 'thead', detail: 'En-tête de tableau', kind: 'tag', category: 'jsx-tag' },
  { word: 'tbody', detail: 'Corps de tableau', kind: 'tag', category: 'jsx-tag' },
  { word: 'tr', detail: 'Ligne de tableau', kind: 'tag', category: 'jsx-tag' },
  { word: 'td', detail: 'Cellule de tableau', kind: 'tag', category: 'jsx-tag' },
  { word: 'th', detail: 'Cellule d\'en-tête', kind: 'tag', category: 'jsx-tag' },
  { word: 'img', detail: 'Balise image', kind: 'tag', category: 'jsx-tag' },
  { word: 'a', detail: 'Lien hypertexte', kind: 'tag', category: 'jsx-tag' },
  { word: 'nav', detail: 'Balise de navigation', kind: 'tag', category: 'jsx-tag' },
  { word: 'header', detail: 'Balise en-tête de page', kind: 'tag', category: 'jsx-tag' },
  { word: 'footer', detail: 'Balise pied de page', kind: 'tag', category: 'jsx-tag' },
  { word: 'main', detail: 'Contenu principal de la page', kind: 'tag', category: 'jsx-tag' },
  { word: 'section', detail: 'Section thématique', kind: 'tag', category: 'jsx-tag' },
  { word: 'article', detail: 'Article indépendant', kind: 'tag', category: 'jsx-tag' },
  { word: 'strong', detail: 'Texte en gras / important', kind: 'tag', category: 'jsx-tag' },
  { word: 'em', detail: 'Texte en italique / emphase', kind: 'tag', category: 'jsx-tag' },
  { word: 'code', detail: 'Code en ligne', kind: 'tag', category: 'jsx-tag' },
  { word: 'pre', detail: 'Texte pré-formaté', kind: 'tag', category: 'jsx-tag' },
  { word: 'Fragment', detail: 'Fragment React <></>', kind: 'tag', category: 'jsx-tag' },

  // ── 4. JSX PROPS & EVENT HANDLERS ──
  { word: 'className', detail: 'Prop classe CSS en JSX', kind: 'prop', category: 'jsx-prop' },
  { word: 'style', detail: 'Prop styles en ligne (objet style={{}})', kind: 'prop', category: 'jsx-prop' },
  { word: 'onClick', detail: 'Gestionnaire d\'événement clic', kind: 'prop', category: 'jsx-prop' },
  { word: 'onChange', detail: 'Gestionnaire de modification de valeur', kind: 'prop', category: 'jsx-prop' },
  { word: 'onSubmit', detail: 'Gestionnaire de soumission de formulaire', kind: 'prop', category: 'jsx-prop' },
  { word: 'onKeyDown', detail: 'Gestionnaire touche enfoncée', kind: 'prop', category: 'jsx-prop' },
  { word: 'onKeyUp', detail: 'Gestionnaire touche relâchée', kind: 'prop', category: 'jsx-prop' },
  { word: 'onFocus', detail: 'Gestionnaire focus élément', kind: 'prop', category: 'jsx-prop' },
  { word: 'onBlur', detail: 'Gestionnaire perte de focus', kind: 'prop', category: 'jsx-prop' },
  { word: 'value', detail: 'Prop valeur contrôlée', kind: 'prop', category: 'jsx-prop' },
  { word: 'defaultValue', detail: 'Prop valeur initiale non-contrôlée', kind: 'prop', category: 'jsx-prop' },
  { word: 'placeholder', detail: 'Prop texte indicatif du champ', kind: 'prop', category: 'jsx-prop' },
  { word: 'type', detail: 'Prop type de champ (text, email, number...)', kind: 'prop', category: 'jsx-prop' },
  { word: 'id', detail: 'Prop identifiant unique', kind: 'prop', category: 'jsx-prop' },
  { word: 'name', detail: 'Prop nom du champ', kind: 'prop', category: 'jsx-prop' },
  { word: 'key', detail: 'Prop clé unique React pour les listes', kind: 'prop', category: 'jsx-prop' },
  { word: 'ref', detail: 'Prop référence DOM React', kind: 'prop', category: 'jsx-prop' },
  { word: 'disabled', detail: 'Prop booléenne désactivé', kind: 'prop', category: 'jsx-prop' },
  { word: 'required', detail: 'Prop champ obligatoire', kind: 'prop', category: 'jsx-prop' },
  { word: 'readOnly', detail: 'Prop lecture seule', kind: 'prop', category: 'jsx-prop' },
  { word: 'autoFocus', detail: 'Prop focus automatique', kind: 'prop', category: 'jsx-prop' },
  { word: 'href', detail: 'Prop URL de lien <a>', kind: 'prop', category: 'jsx-prop' },
  { word: 'src', detail: 'Prop source image <img>', kind: 'prop', category: 'jsx-prop' },
  { word: 'alt', detail: 'Prop texte alternatif image', kind: 'prop', category: 'jsx-prop' },
  { word: 'children', detail: 'Prop enfants de composant', kind: 'prop', category: 'jsx-prop' },

  // ── 5. JAVASCRIPT & REACT KEYWORDS ──
  { word: 'import', detail: 'Instruction import ES6', kind: 'keyword', category: 'keyword' },
  { word: 'from', detail: 'Origine du module importé', kind: 'keyword', category: 'keyword' },
  { word: 'export', detail: 'Instruction export ES6', kind: 'keyword', category: 'keyword' },
  { word: 'default', detail: 'Export ou case par défaut', kind: 'keyword', category: 'keyword' },
  { word: 'function', detail: 'Déclaration de fonction', kind: 'keyword', category: 'keyword' },
  { word: 'return', detail: 'Retourne une valeur', kind: 'keyword', category: 'keyword' },
  { word: 'const', detail: 'Variable constante immuable', kind: 'keyword', category: 'keyword' },
  { word: 'let', detail: 'Variable réassignable', kind: 'keyword', category: 'keyword' },
  { word: 'var', detail: 'Variable ancienne portée globale', kind: 'keyword', category: 'keyword' },
  { word: 'async', detail: 'Fonction asynchrone', kind: 'keyword', category: 'keyword' },
  { word: 'await', detail: 'Attente de promesse', kind: 'keyword', category: 'keyword' },
  { word: 'try', detail: 'Bloc de capture d\'erreurs', kind: 'keyword', category: 'keyword' },
  { word: 'catch', detail: 'Interception d\'erreur', kind: 'keyword', category: 'keyword' },
  { word: 'finally', detail: 'Bloc toujours exécuté', kind: 'keyword', category: 'keyword' },
  { word: 'if', detail: 'Condition si', kind: 'keyword', category: 'keyword' },
  { word: 'else', detail: 'Condition sinon', kind: 'keyword', category: 'keyword' },
  { word: 'switch', detail: 'Instruction d\'aiguillage', kind: 'keyword', category: 'keyword' },
  { word: 'case', detail: 'Branche de switch', kind: 'keyword', category: 'keyword' },
  { word: 'break', detail: 'Interrompt l\'exécution', kind: 'keyword', category: 'keyword' },
  { word: 'true', detail: 'Booléen vrai', kind: 'keyword', category: 'keyword' },
  { word: 'false', detail: 'Booléen faux', kind: 'keyword', category: 'keyword' },
  { word: 'null', detail: 'Valeur nulle explicite', kind: 'keyword', category: 'keyword' },
  { word: 'undefined', detail: 'Valeur indéfinie', kind: 'keyword', category: 'keyword' },

  // ── 6. REACT CORE HOOKS & APIS ──
  { word: 'React', detail: 'Objet central de React', kind: 'variable', category: 'hook' },
  { word: 'useState', detail: 'Hook d\'état local React', kind: 'hook', category: 'hook' },
  { word: 'useEffect', detail: 'Hook d\'effets de bord & cycle de vie', kind: 'hook', category: 'hook' },
  { word: 'useRef', detail: 'Hook de référence mutable DOM', kind: 'hook', category: 'hook' },
  { word: 'useMemo', detail: 'Hook de mémorisation de valeur', kind: 'hook', category: 'hook' },
  { word: 'useCallback', detail: 'Hook de mémorisation de fonction', kind: 'hook', category: 'hook' },
  { word: 'useContext', detail: 'Hook de consommation de contexte', kind: 'hook', category: 'hook' },
  { word: 'useReducer', detail: 'Hook d\'état complexe avec actions', kind: 'hook', category: 'hook' },
  { word: 'useId', detail: 'Hook d\'identifiant unique accessible', kind: 'hook', category: 'hook' },
  { word: 'createContext', detail: 'Création d\'un contexte React', kind: 'function', category: 'hook' },

  // Router & Redux Hooks
  { word: 'useNavigate', detail: 'Hook de navigation React Router v6', kind: 'hook', category: 'hook' },
  { word: 'useParams', detail: 'Hook paramètres d\'URL React Router', kind: 'hook', category: 'hook' },
  { word: 'useLocation', detail: 'Hook emplacement d\'URL actif', kind: 'hook', category: 'hook' },
  { word: 'useSelector', detail: 'Hook sélection d\'état Redux', kind: 'hook', category: 'hook' },
  { word: 'useDispatch', detail: 'Hook dispatch d\'actions Redux', kind: 'hook', category: 'hook' },
  { word: 'dispatch', detail: 'Fonction d\'envoi d\'action', kind: 'function', category: 'hook' },

  // ── 7. JAVASCRIPT ARRAY & OBJECT APIS ──
  { word: 'map', detail: 'Méthode transformation de tableau', kind: 'function', category: 'js-api' },
  { word: 'filter', detail: 'Méthode filtrage de tableau', kind: 'function', category: 'js-api' },
  { word: 'reduce', detail: 'Méthode accumulation de tableau', kind: 'function', category: 'js-api' },
  { word: 'find', detail: 'Recherche le premier élément correspondant', kind: 'function', category: 'js-api' },
  { word: 'findIndex', detail: 'Recherche l\'index correspondant', kind: 'function', category: 'js-api' },
  { word: 'some', detail: 'Vérifie si au moins un élément satisfait la condition', kind: 'function', category: 'js-api' },
  { word: 'every', detail: 'Vérifie si tous les éléments satisfont la condition', kind: 'function', category: 'js-api' },
  { word: 'includes', detail: 'Vérifie si la valeur est présente', kind: 'function', category: 'js-api' },
  { word: 'forEach', detail: 'Boucle d\'itération sur tableau', kind: 'function', category: 'js-api' },
  { word: 'slice', detail: 'Extraction d\'une portion de tableau', kind: 'function', category: 'js-api' },
  { word: 'concat', detail: 'Concaténation immuable de tableaux', kind: 'function', category: 'js-api' },
  { word: 'join', detail: 'Joint les éléments en chaîne de texte', kind: 'function', category: 'js-api' },
  { word: 'split', detail: 'Découpe une chaîne en tableau', kind: 'function', category: 'js-api' },
  { word: 'length', detail: 'Longueur de chaîne ou tableau', kind: 'prop', category: 'js-api' },
  { word: 'trim', detail: 'Supprime les espaces aux extrémités', kind: 'function', category: 'js-api' },
  { word: 'toLowerCase', detail: 'Convertit en minuscules', kind: 'function', category: 'js-api' },
  { word: 'toUpperCase', detail: 'Convertit en majuscules', kind: 'function', category: 'js-api' },

  // DOM Events
  { word: 'preventDefault', detail: 'Bloque le comportement HTML natif', kind: 'function', category: 'js-api' },
  { word: 'stopPropagation', detail: 'Stoppe la propagation de l\'événement', kind: 'function', category: 'js-api' },
  { word: 'target', detail: 'Cible de l\'événement e.target', kind: 'prop', category: 'js-api' },

  // Global Objects
  { word: 'console', detail: 'Console de débogage', kind: 'variable', category: 'js-api' },
  { word: 'log', detail: 'console.log()', kind: 'function', category: 'js-api' },
  { word: 'error', detail: 'console.error()', kind: 'function', category: 'js-api' },
  { word: 'warn', detail: 'console.warn()', kind: 'function', category: 'js-api' },
  { word: 'fetch', detail: 'Requête réseau asynchrone fetch()', kind: 'function', category: 'js-api' },
  { word: 'then', detail: 'Résolution de promesse .then()', kind: 'function', category: 'js-api' },
  { word: 'json', detail: 'Extraction de réponse JSON .json()', kind: 'function', category: 'js-api' },
  { word: 'JSON', detail: 'Objet JSON', kind: 'variable', category: 'js-api' },
  { word: 'stringify', detail: 'JSON.stringify(objet)', kind: 'function', category: 'js-api' },
  { word: 'parse', detail: 'JSON.parse(chaine)', kind: 'function', category: 'js-api' },
  { word: 'Math', detail: 'Objet Math standard', kind: 'variable', category: 'js-api' },
  { word: 'max', detail: 'Math.max(a, b)', kind: 'function', category: 'js-api' },
  { word: 'min', detail: 'Math.min(a, b)', kind: 'function', category: 'js-api' },
  { word: 'round', detail: 'Math.round(valeur)', kind: 'function', category: 'js-api' },
  { word: 'Promise', detail: 'Objet Promesse asynchrone', kind: 'variable', category: 'js-api' },
  { word: 'Object', detail: 'Objet global Object', kind: 'variable', category: 'js-api' },
  { word: 'keys', detail: 'Object.keys(obj)', kind: 'function', category: 'js-api' },
  { word: 'values', detail: 'Object.values(obj)', kind: 'function', category: 'js-api' },
  { word: 'entries', detail: 'Object.entries(obj)', kind: 'function', category: 'js-api' },

  // ── 8. PACKAGES (Strictly restricted to import statements) ──
  { word: 'react', detail: "Module 'react'", kind: 'package', category: 'package' },
  { word: 'react-dom', detail: "Module 'react-dom'", kind: 'package', category: 'package' },
  { word: 'react-router-dom', detail: "Module 'react-router-dom'", kind: 'package', category: 'package' },
  { word: 'react-redux', detail: "Module 'react-redux'", kind: 'package', category: 'package' }
];

// ── CONTEXTUAL INTELLISENSE RANKING ENGINE ──
export function getContextualSuggestions(
  code: string,
  cursorIndex: number,
  documentWords: WordSuggestionItem[],
  fileName: string
): { suggestions: WordSuggestionItem[]; currentPrefix: string } {
  const textBeforeCursor = code.substring(0, cursorIndex);
  const currentLine = textBeforeCursor.split('\n').pop() || '';

  // 1. Never show suggestions inside comments
  if (currentLine.trim().startsWith('//') || textBeforeCursor.includes('/*') && !textBeforeCursor.includes('*/')) {
    return { suggestions: [], currentPrefix: '' };
  }

  // 2. Check if cursor is currently inside a string literal ("...", '...', `...`)
  const doubleQuotes = (currentLine.match(/(?<!\\)"/g) || []).length;
  const singleQuotes = (currentLine.match(/(?<!\\)'/g) || []).length;
  const backticks = (currentLine.match(/(?<!\\)`/g) || []).length;
  const isInsideString = (doubleQuotes % 2 !== 0) || (singleQuotes % 2 !== 0) || (backticks % 2 !== 0);

  // 3. Are we in an import path? (e.g. from '... or import '...)
  const isImportPath = /from\s+['"][^'"]*$/.test(textBeforeCursor) || /import\s+['"][^'"]*$/.test(textBeforeCursor);

  // 4. Are we inside an inline style: style={{ ... }} or in a .css file?
  const isCssFile = fileName.endsWith('.css');
  let isInsideStyle = isCssFile;
  let isStyleValue = false;

  if (!isCssFile) {
    const lastStyleIdx = textBeforeCursor.lastIndexOf('style={{');
    if (lastStyleIdx !== -1) {
      const styleSlice = textBeforeCursor.substring(lastStyleIdx);
      const openBraces = (styleSlice.match(/\{/g) || []).length;
      const closeBraces = (styleSlice.match(/\}/g) || []).length;
      if (openBraces > closeBraces) {
        isInsideStyle = true;
        // Check if cursor is after a colon on the current CSS property
        const lastLineInStyle = styleSlice.split('\n').pop() || '';
        if (lastLineInStyle.includes(':')) {
          const parts = lastLineInStyle.split(':');
          const lastPart = parts[parts.length - 1];
          if (!lastPart.includes(',') && !lastPart.includes('}')) {
            isStyleValue = true;
          }
        }
      }
    }
  }

  // If inside a string literal and NOT in an import path and NOT in a CSS value:
  // (e.g. inside note >= 10 ? "rd" or "Admis") -> DO NOT TRIGGER AUTOCOMPLETE!
  if (isInsideString && !isImportPath && !isStyleValue) {
    return { suggestions: [], currentPrefix: '' };
  }

  // Match the alphanumeric word token currently typed (excluding operators like >, =, ?, etc.)
  const match = textBeforeCursor.match(/([a-zA-Z0-9_$-]+)$/);
  if (!match) {
    return { suggestions: [], currentPrefix: '' };
  }

  const rawPrefix = match[1];
  const prefixLower = rawPrefix.toLowerCase();

  // If prefix is purely numeric or less than 1 char, don't show popup
  if (/^\d+$/.test(rawPrefix) || rawPrefix.length < 1) {
    return { suggestions: [], currentPrefix: '' };
  }

  // 5. Are we inside a JSX tag declaration: <button ...>
  const lastOpenTag = textBeforeCursor.lastIndexOf('<');
  const lastCloseTag = textBeforeCursor.lastIndexOf('>');
  const isInsideTagAttributes = !isInsideStyle && lastOpenTag > lastCloseTag && !textBeforeCursor.substring(lastOpenTag).includes('\n\n');
  const isTagStart = lastOpenTag > lastCloseTag && textBeforeCursor.substring(lastOpenTag).trim() === '<' + rawPrefix;

  // ── SCORE & RANK SUGGESTIONS ──
  const allWords = [...VSCODE_WORD_DICTIONARY, ...documentWords];

  const scored = allWords.map(item => {
    const w = item.word;
    const wClean = w.replace(/^'|'$/g, ''); // strip quotes for comparison
    const wLower = wClean.toLowerCase();
    let score = 0;

    // ── STRICT EXCLUSIONS ──
    // Packages must NEVER appear anywhere except in an import statement!
    if (item.category === 'package' && !isImportPath) {
      return { item, score: 0 };
    }
    // If in an import path, ONLY show packages!
    if (isImportPath) {
      if (item.category !== 'package') return { item, score: 0 };
    }

    // Context-specific boosts and dampening
    let contextBoost = 0;
    if (isImportPath) {
      contextBoost += 1000;
    } else if (isInsideStyle) {
      if (isStyleValue) {
        if (item.category === 'css-val') contextBoost += 900;
        else return { item, score: 0 }; // Inside style quotes, ONLY allow CSS values
      } else {
        if (item.category === 'css-prop') contextBoost += 900;
        else if (item.category === 'js-api') contextBoost += 50;
        else return { item, score: 0 }; // Inside style keys, ONLY allow CSS properties
      }
    } else if (isTagStart) {
      if (item.category === 'jsx-tag') contextBoost += 800;
      else contextBoost -= 300;
    } else if (isInsideTagAttributes) {
      if (item.category === 'jsx-prop') contextBoost += 800;
      else if (item.category === 'css-prop') contextBoost += 100;
      else contextBoost -= 300;
    }

    // ── PRECISE MATCHING (No random scattered letters!) ──
    // 1. Exact match
    if (wClean === rawPrefix) {
      score = 1000 + contextBoost;
    } 
    else if (wLower === prefixLower) {
      score = 900 + contextBoost;
    }
    // 2. Starts with (case-sensitive) - e.g. "back" -> "backgroundColor", "useS" -> "useState"
    else if (wClean.startsWith(rawPrefix)) {
      score = 800 + contextBoost;
    }
    // 3. Starts with (case-insensitive) - e.g. "bg" or "uses" -> "useState"
    else if (wLower.startsWith(prefixLower)) {
      let caseBonus = 0;
      for (let i = 0; i < rawPrefix.length; i++) {
        if (rawPrefix[i] === wClean[i]) caseBonus += 10;
      }
      score = 700 + caseBonus + contextBoost;
    }
    // 4. CamelCase acronym match - e.g. "bgC" -> "backgroundColor", "bRad" -> "borderRadius", "uS" -> "useState", "onC" -> "onClick"
    else {
      const wCapitals = wClean.replace(/[^A-Z]/g, '');
      const prefixCapitals = rawPrefix.replace(/[^A-Z]/g, '');
      if (prefixCapitals.length >= 2 && wCapitals.startsWith(prefixCapitals)) {
        if (wLower[0] === prefixLower[0]) {
          score = 650 + contextBoost;
        }
      }
    }

    // 5. Contiguous substring match ONLY if prefix is at least 3 characters long
    // (Prevents 2-letter tokens like "rd" from matching every word with an 'r' and 'd'!)
    if (score === 0 && rawPrefix.length >= 3 && wLower.includes(prefixLower)) {
      score = 300 + contextBoost;
    }

    return { item, score };
  })
  .filter(x => x.score > 200)
  .sort((a, b) => b.score - a.score)
  .map(x => x.item);

  // Deduplicate words
  const seen = new Set<string>();
  const deduped: WordSuggestionItem[] = [];
  for (const item of scored) {
    if (!seen.has(item.word)) {
      seen.add(item.word);
      deduped.push(item);
    }
  }

  return {
    suggestions: deduped.slice(0, 8), // Top 8 suggestions
    currentPrefix: rawPrefix
  };
}
