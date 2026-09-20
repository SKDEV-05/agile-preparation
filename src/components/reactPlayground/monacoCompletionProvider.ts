interface ExtractedSymbol {
  name: string;
  isFunction: boolean;
  kindLabel: string;
}

function extractDocumentSymbols(code: string): ExtractedSymbol[] {
  const symbols = new Map<string, ExtractedSymbol>();
  const reservedWords = new Set([
    'import', 'export', 'default', 'function', 'return', 'const', 'let', 'var',
    'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue', 'new',
    'this', 'class', 'extends', 'super', 'typeof', 'instanceof', 'try', 'catch',
    'finally', 'throw', 'async', 'await', 'yield', 'null', 'undefined', 'true', 'false',
    'from', 'as', 'in', 'of', 'React'
  ]);

  // 1. Regular function declarations: function myFunc(...)
  const funcRegex = /function\s+([A-Za-z0-9_$]+)\s*\(/g;
  let match: RegExpExecArray | null;
  while ((match = funcRegex.exec(code)) !== null) {
    const name = match[1];
    if (!reservedWords.has(name)) {
      symbols.set(name, { name, isFunction: true, kindLabel: 'Fonction' });
    }
  }

  // 2. Arrow functions: const myFunc = (...) => ... or const myFunc = async (...) => ...
  const arrowRegex = /(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z0-9_$]+)?\s*=>/g;
  while ((match = arrowRegex.exec(code)) !== null) {
    const name = match[1];
    if (!reservedWords.has(name)) {
      symbols.set(name, { name, isFunction: true, kindLabel: 'Fonction fléchée' });
    }
  }

  // 3. Function expressions: const myFunc = function(...)
  const funcExprRegex = /(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s*)?function/g;
  while ((match = funcExprRegex.exec(code)) !== null) {
    const name = match[1];
    if (!reservedWords.has(name)) {
      symbols.set(name, { name, isFunction: true, kindLabel: 'Fonction' });
    }
  }

  // 4. React useState destructuring: const [compteur, setCompteur] = useState(...)
  const stateRegex = /(?:const|let|var)\s*\[\s*([A-Za-z0-9_$]+)\s*,\s*([A-Za-z0-9_$]+)\s*\]\s*=\s*useState/g;
  while ((match = stateRegex.exec(code)) !== null) {
    const stateName = match[1];
    const setterName = match[2];
    if (!reservedWords.has(stateName)) {
      symbols.set(stateName, { name: stateName, isFunction: false, kindLabel: 'État (State)' });
    }
    if (!reservedWords.has(setterName)) {
      symbols.set(setterName, { name: setterName, isFunction: true, kindLabel: 'Setter d\'état' });
    }
  }

  // 5. Destructuring: const { nom, filiere } = ...
  const destructRegex = /(?:const|let|var)\s*\{\s*([^}]+)\s*\}\s*=/g;
  while ((match = destructRegex.exec(code)) !== null) {
    const props = match[1].split(',');
    for (const p of props) {
      const trimmed = p.trim().split(':')[0]?.trim();
      if (trimmed && /^[A-Za-z0-9_$]+$/.test(trimmed) && !reservedWords.has(trimmed)) {
        symbols.set(trimmed, { name: trimmed, isFunction: false, kindLabel: 'Variable déstructurée' });
      }
    }
  }

  // 6. General variables: const x = ...
  const varRegex = /(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=/g;
  while ((match = varRegex.exec(code)) !== null) {
    const name = match[1];
    if (!symbols.has(name) && !reservedWords.has(name)) {
      symbols.set(name, { name, isFunction: false, kindLabel: 'Variable' });
    }
  }

  // 7. Extract document identifier tokens (catch typos like 'decremnt' or functions in progress)
  const tokenRegex = /\b([a-zA-Z_$][a-zA-Z0-9_$]{2,})\b/g;
  while ((match = tokenRegex.exec(code)) !== null) {
    const word = match[1];
    if (!symbols.has(word) && !reservedWords.has(word) && !/^(true|false|null|undefined|div|button|span|h1|h2|h3|p|style|class|className|onClick|onChange|onSubmit|border|color|padding)$/.test(word)) {
      symbols.set(word, { name: word, isFunction: false, kindLabel: 'Identifiant document' });
    }
  }

  return Array.from(symbols.values());
}

let isRegistered = false;

export function registerMonacoProviders(monaco: any): void {
  if (isRegistered) return;
  isRegistered = true;

  // 1. Register React TypeScript Definition extraLib so Monaco natively knows React hooks like VS Code
  try {
    const reactTypes = `
      declare namespace React {
        function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
        function useEffect(effect: () => void | (() => void), deps?: readonly any[]): void;
        function useRef<T>(initialValue?: T): { current: T };
        function useMemo<T>(factory: () => T, deps: readonly any[] | undefined): T;
        function useCallback<T extends (...args: any[]) => any>(callback: T, deps: readonly any[]): T;
        function useReducer<R extends (...args: any[]) => any>(reducer: R, initialState: any): [any, (action: any) => void];
        interface CSSProperties { [key: string]: any; }
      }
      declare function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
      declare function useEffect(effect: () => void | (() => void), deps?: readonly any[]): void;
      declare function useRef<T>(initialValue?: T): { current: T };
      declare function useMemo<T>(factory: () => T, deps: readonly any[] | undefined): T;
      declare function useCallback<T extends (...args: any[]) => any>(callback: T, deps: readonly any[]): T;
      declare function useReducer<R extends (...args: any[]) => any>(reducer: R, initialState: any): [any, (action: any) => void];
      declare function useNavigate(): (to: string | number, options?: any) => void;
      declare function useParams<T extends Record<string, string | undefined>>(): T;
      declare function useSelector<TState = any, TSelected = any>(selector: (state: TState) => TSelected): TSelected;
      declare function useDispatch<TDispatch = any>(): TDispatch;
      declare const console: { log(...args: any[]): void; error(...args: any[]): void; warn(...args: any[]): void; info(...args: any[]): void; };
    `;

    if (monaco.languages.typescript?.javascriptDefaults) {
      monaco.languages.typescript.javascriptDefaults.addExtraLib(reactTypes, 'ts:react.d.ts');
    }
    if (monaco.languages.typescript?.typescriptDefaults) {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(reactTypes, 'ts:react.d.ts');
    }
  } catch (err) {
    console.warn('Monaco extraLib setup warning:', err);
  }

  // 2. Custom Auto-completion and Intelligent Suggestions
  const languages = ['javascript', 'typescript'];

  languages.forEach((lang) => {
    monaco.languages.registerCompletionItemProvider(lang, {
      triggerCharacters: ['.', '<', '{', ':', '"', "'", '/', '@', '$'],
      provideCompletionItems: (model: any, position: any) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        };

        const lineContent = model.getLineContent(position.lineNumber);
        const textBefore = lineContent.substring(0, position.column - 1);

        // Context detection
        const isInsideStyle = textBefore.includes('style={{') || textBefore.includes('style={');
        const isStyle = isInsideStyle;
        const isInsidePropExpr = /[a-zA-Z0-9_$]+=\{[^}]*$/.test(textBefore);

        // Extract all user declared symbols from the document
        const fullDocCode = model.getValue();
        const userSymbols = extractDocumentSymbols(fullDocCode);

        // Local user symbols formatted with top-tier sortText ('00_...')
        const userSuggestions = userSymbols.map(sym => ({
          label: sym.name,
          kind: sym.isFunction 
            ? monaco.languages.CompletionItemKind.Function 
            : monaco.languages.CompletionItemKind.Variable,
          insertText: sym.name,
          documentation: `${sym.kindLabel} locale définie dans votre composant : "${sym.name}"`,
          detail: `(Local) ${sym.name} · ${sym.kindLabel}`,
          sortText: '00_' + sym.name, // Ranks at the very top!
          range
        }));

        // Special Context: Inside onClick={...} or any JSX expression attribute
        if (isInsidePropExpr) {
          const propExprSuggestions = [
            ...userSuggestions,
            {
              label: '() => { ... }',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '() => ${1}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Fonction fléchée inline pour gestionnaire d\'événement',
              detail: 'Snippet · () => ...',
              sortText: '01_arrow',
              range
            },
            {
              label: '(e) => { ... }',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '(e) => ${1}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Fonction fléchée avec événement (e)',
              detail: 'Snippet · (e) => ...',
              sortText: '01_arrow_event',
              range
            },
            {
              label: 'prev => prev + 1',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'prev => prev + 1',
              documentation: 'Mise à jour d\'état fonctionnelle (updater)',
              detail: 'Updater · prev => prev + 1',
              sortText: '01_updater_inc',
              range
            },
            {
              label: 'prev => Math.max(0, prev - 1)',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'prev => Math.max(0, prev - 1)',
              documentation: 'Décrémentation sécurisée avec minimum 0',
              detail: 'Updater · prev => Math.max(0, prev - 1)',
              sortText: '01_updater_dec',
              range
            }
          ];
          return { suggestions: propExprSuggestions };
        }

        const suggestions: any[] = [
          ...userSuggestions,

          // ── 1. REACT HOOKS - SINGLE WORD COMPLETIONS (Just like VS Code) ──
          {
            label: 'useState',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'useState(${1})',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Hook d\'état local React : useState(initialValue)',
            detail: 'React · useState(initialValue)',
            range
          },
          {
            label: 'useEffect',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'useEffect(() => {\n\t${1}\n}, [${2}]);',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Hook d\'effets de bord avec tableau de dépendances',
            detail: 'React · useEffect(() => {}, [])',
            range
          },
          {
            label: 'useReducer',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'useReducer(${1:reducer}, ${2:initialState})',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Hook de gestion d\'état par réducteur',
            detail: 'React · useReducer(reducer, initialState)',
            range
          },
          {
            label: 'useRef',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'useRef(${1:null})',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Hook de référence mutable DOM ou valeur',
            detail: 'React · useRef(initialValue)',
            range
          },
          {
            label: 'useMemo',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'useMemo(() => ${1:compute}(), [${2}])',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Hook de mémorisation de calcul coûteux',
            detail: 'React · useMemo(() => value, [deps])',
            range
          },
          {
            label: 'useCallback',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'useCallback((${1}) => {\n\t${2}\n}, [${3}])',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Hook de mémorisation de fonction callback',
            detail: 'React · useCallback((args) => {}, [deps])',
            range
          },
          {
            label: 'useNavigate',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'useNavigate()',
            documentation: 'Hook de navigation programmatique React Router v6',
            detail: 'React Router · useNavigate()',
            range
          },
          {
            label: 'useParams',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'useParams()',
            documentation: 'Hook d\'extraction des paramètres d\'URL',
            detail: 'React Router · useParams()',
            range
          },
          {
            label: 'useSelector',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'useSelector(state => state.${1})',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'Redux · useSelector(selector)',
            range
          },
          {
            label: 'useDispatch',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'useDispatch()',
            detail: 'Redux · useDispatch()',
            range
          },

          // ── 2. FULL DECLARATION SNIPPETS (Optionnels, nommés clairement) ──
          {
            label: 'useState (snippet const)',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'const [${1:state}, set${1/(.*)/${1:/capitalize}/}] = useState(${2:initialState});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Déclaration complète const [state, setState] = useState()',
            detail: 'Snippet · const [x, setX] = useState()',
            range
          },
          {
            label: 'useReducer (snippet const)',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'const [${1:state}, dispatch] = useReducer(${2:reducer}, ${3:initialState});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Déclaration complète const [state, dispatch] = useReducer()',
            detail: 'Snippet · const [state, dispatch] = useReducer()',
            range
          },
          {
            label: 'useRef (snippet const)',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'const ${1:inputRef} = useRef(null);',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Déclaration complète const ref = useRef(null)',
            detail: 'Snippet · const ref = useRef(null)',
            range
          },
          {
            label: 'useNavigate (snippet const)',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'const navigate = useNavigate();',
            documentation: 'Déclaration complète const navigate = useNavigate()',
            detail: 'Snippet · const navigate = useNavigate()',
            range
          },

          // ── 3. ESSENTIAL SHORTCUTS & SNIPPETS ──
          {
            label: 'imr',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: "import React from 'react';",
            documentation: 'Import React',
            detail: "Snippet · import React from 'react'",
            range
          },
          {
            label: 'imrh',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: "import React, { useState, useEffect } from 'react';",
            documentation: 'Import React avec useState et useEffect',
            detail: "Snippet · import React, { useState, useEffect }",
            range
          },
          {
            label: 'clg',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'console.log(${1});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Affiche dans la console',
            detail: 'Snippet · console.log()',
            range
          },
          {
            label: 'style',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'style={{ ${1} }}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Propriété style en ligne React',
            detail: 'Snippet · style={{ ... }}',
            range
          },
          {
            label: 'prev',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'prev => prev + 1',
            documentation: 'Mise à jour d\'état fonctionnelle atomique',
            detail: 'Updater fonctionnel React · prev => prev + 1',
            range
          },
          {
            label: 'preventDefault',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'e.preventDefault();',
            documentation: 'Bloque le rechargement natif de la page lors d\'un submit',
            detail: 'Méthode événement SPA · e.preventDefault()',
            range
          },
          {
            label: 'fetch',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: "fetch('${1:url}')\n\t.then(res => res.json())\n\t.then(data => {\n\t\t${2}\n\t})\n\t.catch(err => console.error(err));",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Appel API asynchrone avec fetch()',
            detail: 'Snippet · fetch().then().catch()',
            range
          },

          // ── 4. CSS PROPERTIES (Inside style={{}} or in JS styles) ──
          {
            label: 'backgroundColor',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: isStyle ? "backgroundColor: '${1:#10B981}'," : 'backgroundColor',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CSS · couleur de fond',
            range
          },
          {
            label: 'color',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: isStyle ? "color: '${1:#ffffff}'," : 'color',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CSS · couleur du texte',
            range
          },
          {
            label: 'display',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: isStyle ? "display: '${1|flex,grid,block,inline-block,none|}'," : 'display',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CSS · type d\'affichage',
            range
          },
          {
            label: 'padding',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: isStyle ? "padding: '${1:16px}'," : 'padding',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CSS · marge intérieure',
            range
          },
          {
            label: 'margin',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: isStyle ? "margin: '${1:12px}'," : 'margin',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CSS · marge extérieure',
            range
          },
          {
            label: 'borderRadius',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: isStyle ? "borderRadius: '${1:8px}'," : 'borderRadius',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CSS · arrondi des angles',
            range
          },
          {
            label: 'border',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: isStyle ? "border: '${1:1px solid #cbd5e1}'," : 'border',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CSS · bordure',
            range
          },
          {
            label: 'fontSize',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: isStyle ? "fontSize: '${1:14px}'," : 'fontSize',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CSS · taille de police',
            range
          },
          {
            label: 'fontWeight',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: isStyle ? "fontWeight: '${1|bold,normal,600,500|}'," : 'fontWeight',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CSS · graisse de police',
            range
          },
          {
            label: 'fontFamily',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: isStyle ? "fontFamily: '${1|sans-serif,monospace,inherit|}'," : 'fontFamily',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CSS · famille de police',
            range
          },
          {
            label: 'justifyContent',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: isStyle ? "justifyContent: '${1|center,space-between,space-around,flex-start,flex-end|}'," : 'justifyContent',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CSS · axe principal flex',
            range
          },
          {
            label: 'alignItems',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: isStyle ? "alignItems: '${1|center,flex-start,flex-end,stretch|}'," : 'alignItems',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CSS · alignement vertical flex',
            range
          },
          {
            label: 'flexDirection',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: isStyle ? "flexDirection: '${1|row,column,row-reverse,column-reverse|}'," : 'flexDirection',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CSS · direction flexbox',
            range
          },
          {
            label: 'gap',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: isStyle ? "gap: '${1:8px}'," : 'gap',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CSS · espacement grille / flex',
            range
          },
          {
            label: 'cursor',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: isStyle ? "cursor: '${1|pointer,default,not-allowed,text|}'," : 'cursor',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CSS · curseur souris',
            range
          },
          {
            label: 'width',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: isStyle ? "width: '${1:100%}'," : 'width',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CSS · largeur',
            range
          },
          {
            label: 'height',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: isStyle ? "height: '${1:100%}'," : 'height',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CSS · hauteur',
            range
          },
          {
            label: 'boxShadow',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: isStyle ? "boxShadow: '${1:0 4px 6px -1px rgba(0,0,0,0.1)}'," : 'boxShadow',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'CSS · ombre portée',
            range
          },

          // ── 5. JSX PROPS & ATTRIBUTES ──
          {
            label: 'className',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: 'className="${1}"',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'JSX · classe CSS',
            range
          },
          {
            label: 'onClick',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: 'onClick={${1:handleClick}}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'JSX · événement clic',
            range
          },
          {
            label: 'onChange',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: 'onChange={(e) => ${1:setVal}(e.target.value)}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'JSX · événement saisie',
            range
          },
          {
            label: 'onSubmit',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: 'onSubmit={${1:handleSubmit}}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'JSX · événement formulaire',
            range
          },
          {
            label: 'value',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: 'value={${1:val}}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'JSX · valeur de champ',
            range
          },
          {
            label: 'placeholder',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: 'placeholder="${1:Entrez votre texte...}"',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'JSX · texte d\'indication',
            range
          },
          {
            label: 'disabled',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: 'disabled={${1:false}}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'JSX · désactivation',
            range
          },
          {
            label: 'key',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: 'key={${1:item.id}}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'JSX · clé unique pour liste',
            range
          },

          // ── 6. JSX TAGS ──
          {
            label: 'button',
            kind: monaco.languages.CompletionItemKind.Class,
            insertText: '<button onClick={${1:handleClick}}>\n\t${2:Cliquez ici}\n</button>',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'Balise JSX · <button>',
            range
          },
          {
            label: 'input',
            kind: monaco.languages.CompletionItemKind.Class,
            insertText: '<input type="${1:text}" value={${2:value}} onChange={(e) => ${3:setValue}(e.target.value)} />',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'Balise JSX · <input />',
            range
          },
          {
            label: 'div',
            kind: monaco.languages.CompletionItemKind.Class,
            insertText: '<div style={{ ${1} }}>\n\t${2}\n</div>',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'Balise JSX · <div>',
            range
          },
          {
            label: 'form',
            kind: monaco.languages.CompletionItemKind.Class,
            insertText: '<form onSubmit={${1:handleSubmit}}>\n\t${2}\n</form>',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'Balise JSX · <form>',
            range
          },

          // ── 7. JAVASCRIPT ARRAY METHODS ──
          {
            label: 'map',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'map((${1:item}, ${2:index}) => (\n\t${3}\n))',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Itération et transformation de tableau en JSX',
            detail: 'Array · map((item, index) => ...)',
            range
          },
          {
            label: 'filter',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'filter(${1:item} => ${2:condition})',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Filtrage immuable d\'un tableau',
            detail: 'Array · filter(item => condition)',
            range
          },
          {
            label: 'find',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'find(${1:item} => ${2:item.id === id})',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Recherche du premier élément correspondant',
            detail: 'Array · find(item => condition)',
            range
          }
        ];

        return { suggestions };
      }
    });
  });
}
