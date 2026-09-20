import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { ConsoleLogEntry } from './VirtualConsole';

interface LivePreviewProps {
  code: string;
  files?: Array<{ name: string; path: string; content: string }>;
  entryPath?: string;
  onLog: (log: Omit<ConsoleLogEntry, 'id' | 'timestamp'>) => void;
}

export function LivePreview({ code, files, entryPath, onLog }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== 'object') return;
      if (event.data.source === 'react-playground-sandbox') {
        if (event.data.type === 'log' || event.data.type === 'warn' || event.data.type === 'error' || event.data.type === 'info') {
          onLog({
            type: event.data.type,
            message: event.data.message
          });
        }
        if (event.data.type === 'runtime-error') {
          setError(event.data.message);
          setIsLoading(false);
        }
        if (event.data.type === 'ready') {
          setError(null);
          setIsLoading(false);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onLog]);

  const runCode = () => {
    setError(null);
    setIsLoading(true);

    if (!iframeRef.current) return;

    // Helper function to prepare each file's content
    const processFileContent = (content: string, isEntry: boolean) => {
      let cleaned = content
        // Remove standard ESM import statements
        .replace(/import\s+React\s*,?\s*(\{.*?\})?\s*from\s+['"].*?['"];?/g, '')
        .replace(/import\s+\{.*?\}\s+from\s+['"].*?['"];?/g, '')
        .replace(/import\s+([A-Za-z0-9_]+)\s+from\s+['"].*?['"];?/g, '')
        .replace(/import\s+['"].*?['"];?/g, '');

      if (isEntry) {
        // Entry file (e.g. App.jsx)
        cleaned = cleaned
          .replace(/export\s+default\s+function\s+([A-Za-z0-9_]+)/g, 'function $1')
          .replace(/export\s+default\s+([A-Za-z0-9_]+);?/g, 'window.__RootComponent = $1;')
          .replace(/export\s+default\s+/g, 'window.__RootComponent = ');

        // Safely register default component
        cleaned += '\nif (typeof App !== "undefined") { window.__RootComponent = App; }\n';
      } else {
        // Helper files (e.g. CarteStagiaire.jsx, stagiaire.js, components, data)
        const helperFuncs: string[] = [];
        cleaned = cleaned
          .replace(/export\s+default\s+function\s+([A-Za-z0-9_]+)/g, (_, name) => {
            helperFuncs.push(name);
            return `function ${name}`;
          })
          .replace(/export\s+function\s+([A-Za-z0-9_]+)/g, (_, name) => {
            helperFuncs.push(name);
            return `function ${name}`;
          })
          .replace(/export\s+const\s+([A-Za-z0-9_]+)\s*=/g, 'const $1 = window.$1 =')
          .replace(/export\s+let\s+([A-Za-z0-9_]+)\s*=/g, 'let $1 = window.$1 =')
          .replace(/export\s+var\s+([A-Za-z0-9_]+)\s*=/g, 'var $1 = window.$1 =')
          .replace(/export\s+default\s+([A-Za-z0-9_]+);?/g, 'window.$1 = $1;');

        // Safely register helper functions on window at the end of the file
        for (const fnName of helperFuncs) {
          cleaned += `\nif (typeof ${fnName} !== "undefined") { window.${fnName} = ${fnName}; }\n`;
        }
      }
      return cleaned;
    };

    // Multi-file bundle creation
    let bundledCode = '';

    if (files && files.length > 1) {
      const entry = files.find(f => f.path === (entryPath || 'src/App.jsx')) || files[0];
      
      // 1. Bundle helper files first (data, helper components)
      for (const file of files) {
        if (file.path === entry.path) continue;
        bundledCode += `\n// --- [Fichier: ${file.name}] ---\n` + processFileContent(file.content, false) + '\n';
      }

      // 2. Bundle root entry file
      const activeEntryContent = (files.find(f => f.path === entry.path)?.content) || code;
      bundledCode += `\n// --- [Fichier Racine: ${entry.name}] ---\n` + processFileContent(activeEntryContent, true);
    } else {
      bundledCode = processFileContent(code, true);
    }

    // HTML Document for Sandbox with proper crossorigin and structured Babel compilation
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js" crossorigin="anonymous"></script>
  <style>
    body {
      margin: 0;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #ffffff;
      color: #0a0a0a;
      box-sizing: border-box;
    }
    * { box-sizing: border-box; }
    button {
      font-family: inherit;
      transition: all 0.2s;
    }
    button:active {
      transform: scale(0.97);
    }
  </style>
</head>
<body>
  <div id="root"></div>

  <script>
    const sendMsg = (type, message) => {
      try {
        window.parent.postMessage({
          source: 'react-playground-sandbox',
          type: type,
          message: typeof message === 'object' ? JSON.stringify(message) : String(message)
        }, '*');
      } catch (e) {}
    };

    // Forward console logs to Parent VirtualConsole
    const origLog = console.log;
    const origWarn = console.warn;
    const origError = console.error;

    console.log = (...args) => {
      origLog(...args);
      sendMsg('log', args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
    };
    console.warn = (...args) => {
      origWarn(...args);
      sendMsg('warn', args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
    };
    console.error = (...args) => {
      origError(...args);
      sendMsg('error', args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
    };

    // Catch any uncaught runtime errors with line numbers
    window.onerror = function(msg, url, line, col, error) {
      const detailed = error && error.message ? error.message : (msg || 'Erreur d\\'exécution');
      sendMsg('runtime-error', (line ? 'Ligne ' + line + ' : ' : '') + detailed);
      return true;
    };

    // Mock illustrative OFPPT endpoints
    const originalFetch = window.fetch;
    window.fetch = async function(url, options) {
      if (typeof url === 'string' && (url.includes('api.ofppt.ma') || url.includes('/api/stagiaires') || url.includes('/stagiaires'))) {
        const mockData = [
          { id: 1, nom: "Sara Bennani", filiere: "FullStack 2A", note: 18.5 },
          { id: 2, nom: "Yassine Alami", filiere: "FullStack 2A", note: 16.0 },
          { id: 3, nom: "Fatima Zahra", filiere: "FullStack 2A", note: 19.0 }
        ];
        return new Response(JSON.stringify(mockData), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      return originalFetch(url, options);
    };

    function executeSandbox() {
      try {
        if (!window.React || !window.ReactDOM || !window.Babel) {
          setTimeout(executeSandbox, 50);
          return;
        }

        // Expose React Hooks globally
        window.useState = React.useState;
        window.useEffect = React.useEffect;
        window.useReducer = React.useReducer;
        window.useRef = React.useRef;
        window.useMemo = React.useMemo;
        window.useCallback = React.useCallback;
        window.useContext = React.useContext;
        window.createContext = React.createContext;

        const rawCode = ${JSON.stringify(bundledCode)};

        // 1. Compile JSX with Babel directly (Catches exact syntax errors with line/column)
        let compiled = '';
        try {
          const res = window.Babel.transform(rawCode, {
            presets: ['react'],
            filename: 'App.jsx'
          });
          compiled = res.code;
        } catch (babelErr) {
          const cleanMsg = babelErr.message ? babelErr.message.replace(/unknown: /g, '') : String(babelErr);
          sendMsg('runtime-error', 'Erreur de Syntaxe : ' + cleanMsg);
          return;
        }

        // 2. Execute compiled JavaScript safely
        try {
          const runner = new Function(
            'React',
            'ReactDOM',
            'useState',
            'useEffect',
            'useReducer',
            'useRef',
            'useMemo',
            'useCallback',
            compiled
          );
          runner(
            React,
            ReactDOM,
            React.useState,
            React.useEffect,
            React.useReducer,
            React.useRef,
            React.useMemo,
            React.useCallback
          );
        } catch (evalErr) {
          sendMsg('runtime-error', 'Erreur d\\'Exécution : ' + (evalErr.message || String(evalErr)));
          return;
        }

        // 3. Detect and Render Root Component
        let ComponentToRender = window.__RootComponent;
        if (!ComponentToRender && typeof App !== 'undefined') {
          ComponentToRender = App;
        }

        if (!ComponentToRender) {
          ComponentToRender = function DefaultWaitingRunner() {
            return React.createElement('div', {
              style: {
                fontFamily: 'sans-serif',
                padding: '24px',
                borderRadius: '16px',
                background: '#f8fafc',
                border: '2px dashed #cbd5e1',
                color: '#64748b',
                textAlign: 'center'
              }
            },
              React.createElement('div', { style: { fontSize: '28px', marginBottom: '8px' } }, '⚡'),
              React.createElement('h3', { style: { margin: '0 0 6px 0', color: '#0f172a', fontSize: '15px', fontWeight: 'bold' } }, 'Atelier en cours de rédaction'),
              React.createElement('p', { style: { margin: 0, fontSize: '12px', lineHeight: '1.6' } }, 'Complétez votre code dans l\\'éditeur (TODOs) et cliquez sur Exécuter ▶ pour voir le rendu en direct.')
            );
          };
        }

        const rootEl = document.getElementById('root');
        if (rootEl) {
          const root = ReactDOM.createRoot(rootEl);
          root.render(React.createElement(ComponentToRender));
          sendMsg('ready', 'OK');
        }
      } catch (err) {
        sendMsg('runtime-error', 'Erreur d\\'Affichage : ' + (err.message || String(err)));
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', executeSandbox);
    } else {
      executeSandbox();
    }
  </script>
</body>
</html>
    `;

    iframeRef.current.srcdoc = htmlContent;
  };

  useEffect(() => {
    runCode();
  }, [code, files]);

  return (
    <div className="relative flex flex-col h-full rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] overflow-hidden shadow-xs">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/10 dark:border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-bold text-[#0A0A0A] dark:text-white">Aperçu en Direct (Live Preview)</span>
        </div>

        <button
          onClick={runCode}
          title="Relancer l'exécution du code"
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#10B981] hover:bg-[#22C55E] text-white font-bold transition-colors shadow-2xs cursor-pointer"
        >
          <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Exécuter</span>
        </button>
      </div>

      {/* Error Notification Banner with readable details */}
      {error && (
        <div className="bg-red-500/10 border-b border-red-500/30 p-3 text-red-500 text-xs flex items-start gap-2 animate-fadeIn font-mono">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
          <div className="space-y-0.5 w-full">
            <span className="font-bold block">Erreur Détectée :</span>
            <pre className="text-[11px] leading-relaxed whitespace-pre-wrap break-all font-mono bg-red-950/20 p-2 rounded-lg border border-red-500/20">
              {error}
            </pre>
          </div>
        </div>
      )}

      {/* Sandbox iFrame Container */}
      <div className="relative flex-1 min-h-0 bg-white">
        <iframe
          ref={iframeRef}
          title="React Live Preview Sandbox"
          sandbox="allow-scripts allow-modals"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
