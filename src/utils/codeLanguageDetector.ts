// Code Language Detector & Classifier for React Laboratory and Code Playground
// Distinguishes supported web languages from unsupported programming languages.

export type SupportedLanguage = 'react' | 'html' | 'css' | 'javascript' | 'json';
export type UnsupportedLanguage = 
  | 'python' 
  | 'php' 
  | 'java' 
  | 'cpp' 
  | 'csharp' 
  | 'sql' 
  | 'ruby' 
  | 'go' 
  | 'rust' 
  | 'shell' 
  | 'unsupported';

export type DetectedLanguage = SupportedLanguage | UnsupportedLanguage;

export interface LanguageInfo {
  id: DetectedLanguage;
  name: string;
  isSupported: boolean;
  category: 'web' | 'backend' | 'systems' | 'database' | 'scripting' | 'other';
  monacoLanguage: string;
  icon: string;
  sampleCode?: string;
}

export const LANGUAGE_REGISTRY: Record<DetectedLanguage, LanguageInfo> = {
  react: {
    id: 'react',
    name: 'React (JSX / TSX)',
    isSupported: true,
    category: 'web',
    monacoLanguage: 'javascript',
    icon: '⚛️',
    sampleCode: `import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '24px', textAlign: 'center' }}>
      <h1 style={{ color: '#10B981', margin: '0 0 12px 0' }}>Bonjour React OFPPT</h1>
      <p style={{ color: '#64748b' }}>Compteur interactif : {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          background: '#10B981',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Incrémenter +1
      </button>
    </div>
  );
}`
  },
  html: {
    id: 'html',
    name: 'HTML5',
    isSupported: true,
    category: 'web',
    monacoLanguage: 'html',
    icon: '🌐',
    sampleCode: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: sans-serif; padding: 24px; text-align: center; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; }
    h1 { color: #10B981; }
    button { background: #10B981; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Page HTML5 Démo</h1>
    <p>Ce code HTML5 standard s'exécute directement dans le navigateur.</p>
    <button onclick="alert('Action HTML exécutée avec succès !')">Cliquer ici</button>
  </div>
</body>
</html>`
  },
  css: {
    id: 'css',
    name: 'CSS3',
    isSupported: true,
    category: 'web',
    monacoLanguage: 'css',
    icon: '🎨',
    sampleCode: `/* Styles CSS personnalisés */
.carte-demo {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: #ffffff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.3);
  text-align: center;
}

.carte-demo h2 {
  margin: 0 0 8px 0;
  font-size: 22px;
}

.carte-demo p {
  opacity: 0.9;
  font-size: 14px;
}`
  },
  javascript: {
    id: 'javascript',
    name: 'JavaScript (Vanilla)',
    isSupported: true,
    category: 'web',
    monacoLanguage: 'javascript',
    icon: '⚡',
    sampleCode: `// JavaScript Standard
console.log("Exécution JavaScript Live !");

const root = document.getElementById('root');
if (root) {
  root.innerHTML = \`
    <div style="font-family: sans-serif; padding: 24px; text-align: center;">
      <h2 style="color: #10B981;">JavaScript DOM Natif</h2>
      <p style="color: #64748b;">Code exécuté à \${new Date().toLocaleTimeString('fr-FR')}</p>
    </div>
  \`;
}`
  },
  json: {
    id: 'json',
    name: 'JSON',
    isSupported: true,
    category: 'web',
    monacoLanguage: 'json',
    icon: '📋',
    sampleCode: `{
  "filiere": "Développement Digital - FullStack",
  "module": "M204 - React & Redux",
  "stagiaires": [
    { "id": 1, "nom": "Sara Bennani", "note": 19.5 },
    { "id": 2, "nom": "Yassine Alami", "note": 18.0 }
  ]
}`
  },
  python: {
    id: 'python',
    name: 'Python',
    isSupported: false,
    category: 'scripting',
    monacoLanguage: 'python',
    icon: '🐍'
  },
  php: {
    id: 'php',
    name: 'PHP',
    isSupported: false,
    category: 'backend',
    monacoLanguage: 'php',
    icon: '🐘'
  },
  java: {
    id: 'java',
    name: 'Java',
    isSupported: false,
    category: 'backend',
    monacoLanguage: 'java',
    icon: '☕'
  },
  cpp: {
    id: 'cpp',
    name: 'C / C++',
    isSupported: false,
    category: 'systems',
    monacoLanguage: 'cpp',
    icon: '⚙️'
  },
  csharp: {
    id: 'csharp',
    name: 'C# (.NET)',
    isSupported: false,
    category: 'backend',
    monacoLanguage: 'csharp',
    icon: '🔷'
  },
  sql: {
    id: 'sql',
    name: 'SQL',
    isSupported: false,
    category: 'database',
    monacoLanguage: 'sql',
    icon: '🗄️'
  },
  ruby: {
    id: 'ruby',
    name: 'Ruby',
    isSupported: false,
    category: 'backend',
    monacoLanguage: 'ruby',
    icon: '💎'
  },
  go: {
    id: 'go',
    name: 'Go (Golang)',
    isSupported: false,
    category: 'systems',
    monacoLanguage: 'go',
    icon: '🔵'
  },
  rust: {
    id: 'rust',
    name: 'Rust',
    isSupported: false,
    category: 'systems',
    monacoLanguage: 'rust',
    icon: '🦀'
  },
  shell: {
    id: 'shell',
    name: 'Bash / Shell',
    isSupported: false,
    category: 'scripting',
    monacoLanguage: 'shell',
    icon: '💻'
  },
  unsupported: {
    id: 'unsupported',
    name: 'Langage Inconnu',
    isSupported: false,
    category: 'other',
    monacoLanguage: 'plaintext',
    icon: '⚠️'
  }
};

/**
 * Detect language by file name / extension
 */
export function detectLanguageByFileName(fileName: string): DetectedLanguage | null {
  const lower = fileName.toLowerCase().trim();
  
  if (lower.endsWith('.jsx') || lower.endsWith('.tsx')) return 'react';
  if (lower.endsWith('.html') || lower.endsWith('.htm')) return 'html';
  if (lower.endsWith('.css')) return 'css';
  if (lower.endsWith('.json')) return 'json';
  if (lower.endsWith('.js') || lower.endsWith('.mjs') || lower.endsWith('.cjs') || lower.endsWith('.ts')) {
    return 'javascript';
  }
  
  // Unsupported extensions
  if (lower.endsWith('.py') || lower.endsWith('.pyw')) return 'python';
  if (lower.endsWith('.php') || lower.endsWith('.phtml')) return 'php';
  if (lower.endsWith('.java')) return 'java';
  if (lower.endsWith('.cpp') || lower.endsWith('.c') || lower.endsWith('.h') || lower.endsWith('.hpp') || lower.endsWith('.cc')) return 'cpp';
  if (lower.endsWith('.cs')) return 'csharp';
  if (lower.endsWith('.sql')) return 'sql';
  if (lower.endsWith('.rb')) return 'ruby';
  if (lower.endsWith('.go')) return 'go';
  if (lower.endsWith('.rs')) return 'rust';
  if (lower.endsWith('.sh') || lower.endsWith('.bash')) return 'shell';

  return null;
}

/**
 * Detect language by analyzing code heuristics
 */
export function detectLanguageByContent(code: string): DetectedLanguage {
  if (!code || !code.trim()) return 'react';
  const trimmed = code.trim();

  // 1. PHP detection
  if (trimmed.startsWith('<?php') || trimmed.includes('<?php') || (/\$\w+\s*=/.test(code) && /echo\s+['"$]/.test(code))) {
    return 'php';
  }

  // 2. Python detection
  const isPython = 
    /\bdef\s+[a-zA-Z_]\w*\s*\([^)]*\)\s*:/.test(code) ||
    /\belif\s+.*:/.test(code) ||
    /\bfrom\s+[a-zA-Z_]\w*\s+import\s+/.test(code) ||
    /\bimport\s+(sys|os|numpy|pandas|math|random|tensorflow|torch|requests|django|flask)\b/.test(code) ||
    (code.includes('if __name__ == "__main__":') || code.includes("if __name__ == '__main__':")) ||
    (/\bprint\s*\([^\n]*\)/.test(code) && !code.includes(';') && !code.includes('{') && !code.includes('function'));

  if (isPython) {
    return 'python';
  }

  // 3. Java detection
  const isJava = 
    /\bpublic\s+(class|interface|enum)\s+[A-Z]\w*/.test(code) ||
    /\bpublic\s+static\s+void\s+main\s*\(/.test(code) ||
    /System\.(out|err)\.println\s*\(/.test(code);

  if (isJava) {
    return 'java';
  }

  // 4. C / C++ detection
  const isCpp = 
    /#include\s*[<"][a-zA-Z0-9_.]+[>"]/.test(code) ||
    /\b(std::cout|std::cin|std::endl)\b/.test(code) ||
    /\bint\s+main\s*\(\s*(void|int\s+argc)?\s*\)/.test(code) ||
    (/\bprintf\s*\(/.test(code) && !code.includes('function') && !code.includes('const'));

  if (isCpp) {
    return 'cpp';
  }

  // 5. C# (.NET) detection
  const isCsharp = 
    /\busing\s+System(\.[a-zA-Z0-9_]+)*;/.test(code) ||
    /\bnamespace\s+[A-Za-z0-9_.]+/.test(code) ||
    /Console\.(WriteLine|Write)\s*\(/.test(code);

  if (isCsharp) {
    return 'csharp';
  }

  // 6. SQL detection
  const isSql = /^\s*(SELECT|INSERT\s+INTO|UPDATE|DELETE\s+FROM|CREATE\s+TABLE|ALTER\s+TABLE|DROP\s+TABLE)\b/i.test(trimmed);
  if (isSql && !code.includes('function') && !code.includes('const') && !code.includes('import')) {
    return 'sql';
  }

  // 7. Ruby detection
  const isRuby = /\bdef\s+[a-zA-Z_]\w*(\s*\(.*\))?\s*\n[\s\S]*?\bend\b/.test(code) && /\bputs\s+['"]/.test(code);
  if (isRuby) {
    return 'ruby';
  }

  // 8. Go detection
  const isGo = /\bpackage\s+main\b/.test(code) && /\bfunc\s+(main|[a-zA-Z_]\w*)\s*\(/.test(code);
  if (isGo) {
    return 'go';
  }

  // 9. Rust detection
  const isRust = /\bfn\s+(main|[a-zA-Z_]\w*)\s*\(/.test(code) && (code.includes('println!') || code.includes('let mut '));
  if (isRust) {
    return 'rust';
  }

  // 10. Bash / Shell detection
  if (trimmed.startsWith('#!/bin/bash') || trimmed.startsWith('#!/bin/sh')) {
    return 'shell';
  }

  // 11. HTML detection
  if (
    trimmed.startsWith('<!DOCTYPE html>') ||
    trimmed.startsWith('<!doctype html>') ||
    trimmed.startsWith('<html') ||
    (/^\s*<(div|header|section|main|nav|footer|form|article|aside|table|ul|ol|h1|h2|h3|p)\b/i.test(trimmed) &&
      !code.includes('import ') &&
      !code.includes('export ') &&
      !code.includes('return (') &&
      !code.includes('function App'))
  ) {
    return 'html';
  }

  // 12. CSS detection
  if (
    (/^\s*(@import|@charset|@media|@keyframes|\*|[.#a-zA-Z][a-zA-Z0-9_-]*)\s*\{[\s\S]*\}/.test(trimmed)) &&
    !code.includes('function ') &&
    !code.includes('const ') &&
    !code.includes('let ') &&
    !code.includes('return ')
  ) {
    return 'css';
  }

  // 13. React detection
  if (
    code.includes('import React') ||
    code.includes('useState') ||
    code.includes('useEffect') ||
    code.includes('export default function') ||
    code.includes('return (') ||
    /<[A-Z][a-zA-Z0-9_]*(\s|\/|>)/.test(code) ||
    code.includes('className=')
  ) {
    return 'react';
  }

  // 14. Standard JavaScript
  return 'javascript';
}

/**
 * Determine final language from fileName and code content
 */
export function determineCodeLanguage(fileName: string, code: string, explicitLanguage?: DetectedLanguage): LanguageInfo {
  if (explicitLanguage && LANGUAGE_REGISTRY[explicitLanguage]) {
    return LANGUAGE_REGISTRY[explicitLanguage];
  }

  // First check file extension
  const byName = detectLanguageByFileName(fileName);
  if (byName) {
    // If it's explicitly a non-supported extension (.py, .php, etc.), return it directly!
    if (!LANGUAGE_REGISTRY[byName].isSupported) {
      return LANGUAGE_REGISTRY[byName];
    }
    // If it's .js, check if it actually has React JSX or standard JS
    if (byName === 'javascript') {
      const contentLang = detectLanguageByContent(code);
      if (contentLang === 'react') {
        return LANGUAGE_REGISTRY.react;
      }
      // If code inside a .js file is blatantly Python or PHP or C++, detect it!
      if (!LANGUAGE_REGISTRY[contentLang].isSupported) {
        return LANGUAGE_REGISTRY[contentLang];
      }
      return LANGUAGE_REGISTRY.javascript;
    }
    return LANGUAGE_REGISTRY[byName];
  }

  // Otherwise, inspect content directly
  const contentLang = detectLanguageByContent(code);
  return LANGUAGE_REGISTRY[contentLang] || LANGUAGE_REGISTRY.unsupported;
}
