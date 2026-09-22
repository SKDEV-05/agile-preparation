import React, { useEffect, useRef, useState, useMemo } from 'react';
import { AlertCircle, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';
import { ConsoleLogEntry } from './VirtualConsole';
import { 
  determineCodeLanguage, 
  DetectedLanguage, 
  LanguageInfo, 
  LANGUAGE_REGISTRY 
} from '../../utils/codeLanguageDetector';
import { UnsupportedLanguagePreview } from './UnsupportedLanguagePreview';

interface LivePreviewProps {
  code: string;
  files?: Array<{ name: string; path: string; content: string }>;
  entryPath?: string;
  fileName?: string;
  language?: DetectedLanguage;
  onLog: (log: Omit<ConsoleLogEntry, 'id' | 'timestamp'>) => void;
  onResetToReact?: () => void;
  onInsertHtmlExample?: () => void;
}

export function LivePreview({
  code,
  files,
  entryPath,
  fileName,
  language,
  onLog,
  onResetToReact,
  onInsertHtmlExample
}: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Active file name to determine language
  const activeFileName = useMemo(() => {
    if (fileName) return fileName;
    if (files && files.length > 0) {
      const entry = files.find(f => f.path === (entryPath || 'src/App.jsx')) || files[0];
      return entry.name;
    }
    return 'App.jsx';
  }, [fileName, files, entryPath]);

  // Determine language and support status
  const languageInfo: LanguageInfo = useMemo(() => {
    return determineCodeLanguage(activeFileName, code, language);
  }, [activeFileName, code, language]);

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

    // If language is NOT supported, stop execution and let UnsupportedLanguagePreview display!
    if (!languageInfo.isSupported) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    if (!iframeRef.current) return;

    // Helper script to intercept console logs and uncaught errors
    const consoleInterceptorScript = `
      const sendMsg = (type, message) => {
        try {
          window.parent.postMessage({
            source: 'react-playground-sandbox',
            type: type,
            message: typeof message === 'object' ? JSON.stringify(message) : String(message)
          }, '*');
        } catch (e) {}
      };

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

      window.onerror = function(msg, url, line, col, error) {
        const detailed = error && error.message ? error.message : (msg || 'Erreur d\\'exécution');
        sendMsg('runtime-error', (line ? 'Ligne ' + line + ' : ' : '') + detailed);
        return true;
      };
    `;

    // ─────────────────────────────────────────────────────────────
    // 1. HTML EXECUTION RUNNER
    // ─────────────────────────────────────────────────────────────
    if (languageInfo.id === 'html') {
      let finalHtml = code;
      const scriptTag = `<script>${consoleInterceptorScript}<\/script>`;

      if (code.toLowerCase().includes('<html') || code.toLowerCase().includes('<!doctype')) {
        if (finalHtml.includes('</head>')) {
          finalHtml = finalHtml.replace('</head>', `${scriptTag}</head>`);
        } else if (finalHtml.includes('</body>')) {
          finalHtml = finalHtml.replace('</body>', `${scriptTag}</body>`);
        } else {
          finalHtml = scriptTag + finalHtml;
        }
      } else {
        finalHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
      cursor: pointer;
      transition: all 0.2s;
    }
    button:active {
      transform: scale(0.97);
    }
  </style>
  ${scriptTag}
</head>
<body>
  ${code}
  <script>
    sendMsg('ready', 'OK');
  <\/script>
</body>
</html>
        `;
      }

      iframeRef.current.srcdoc = finalHtml;
      return;
    }

    // ─────────────────────────────────────────────────────────────
    // 2. CSS EXECUTION RUNNER
    // ─────────────────────────────────────────────────────────────
    if (languageInfo.id === 'css') {
      const cssHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #ffffff;
      color: #0a0a0a;
      box-sizing: border-box;
    }
    * { box-sizing: border-box; }
    
    /* User CSS injected here */
    ${code}
  </style>
  <script>${consoleInterceptorScript}<\/script>
</head>
<body>
  <div class="demo-container" style="max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px;">
    <div class="carte card demo-card" style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #f8fafc;">
      <h2 class="titre title" style="margin-top: 0; color: #10B981;">Aperçu Visuel des Styles CSS</h2>
      <p class="description" style="color: #64748b; font-size: 14px; line-height: 1.5;">
        Vos règles CSS sont directement appliquées aux éléments ci-dessous (cartes, titres, boutons, badges et champs de saisie).
      </p>
      
      <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-top: 14px;">
        <button class="btn btn-primary bouton" style="padding: 8px 16px; border-radius: 6px; cursor: pointer;">
          Bouton Principal
        </button>
        <button class="btn btn-secondary bouton-secondaire" style="padding: 8px 16px; border-radius: 6px; cursor: pointer;">
          Bouton Secondaire
        </button>
        <span class="badge" style="padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: bold; background: #10B981; color: white;">
          Badge Actif
        </span>
      </div>

      <div style="margin-top: 14px;">
        <input type="text" class="input champ" placeholder="Champ de saisie stylé..." style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px;" />
      </div>
    </div>
  </div>
  <script>
    sendMsg('ready', 'OK');
  <\/script>
</body>
</html>
      `;

      iframeRef.current.srcdoc = cssHtml;
      return;
    }

    // ─────────────────────────────────────────────────────────────
    // 3. JAVASCRIPT VANILLA RUNNER
    // ─────────────────────────────────────────────────────────────
    if (languageInfo.id === 'javascript') {
      const jsHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
  </style>
  <script>${consoleInterceptorScript}<\/script>
</head>
<body>
  <div id="root"></div>
  <script>
    try {
      ${code}
      sendMsg('ready', 'OK');
    } catch (evalErr) {
      sendMsg('runtime-error', 'Erreur d\\'Exécution JS : ' + (evalErr.message || String(evalErr)));
    }
  <\/script>
</body>
</html>
      `;

      iframeRef.current.srcdoc = jsHtml;
      return;
    }

    // ─────────────────────────────────────────────────────────────
    // 4. REACT (JSX / TSX) RUNNER (Default Engine)
    // ─────────────────────────────────────────────────────────────
    const processFileContent = (content: string, isEntry: boolean) => {
      let cleaned = content
        .replace(/import\s+React\s*,?\s*(\{.*?\})?\s*from\s+['"].*?['"];?/g, '')
        .replace(/import\s+\{.*?\}\s+from\s+['"].*?['"];?/g, '')
        .replace(/import\s+([A-Za-z0-9_]+)\s+from\s+['"].*?['"];?/g, '')
        .replace(/import\s+['"].*?['"];?/g, '');

      if (isEntry) {
        cleaned = cleaned
          .replace(/export\s+default\s+function\s+([A-Za-z0-9_]+)/g, 'function $1')
          .replace(/export\s+default\s+([A-Za-z0-9_]+);?/g, 'window.__RootComponent = $1;')
          .replace(/export\s+default\s+/g, 'window.__RootComponent = ');

        cleaned += '\nif (typeof App !== "undefined") { window.__RootComponent = App; }\n';
      } else {
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

        for (const fnName of helperFuncs) {
          cleaned += `\nif (typeof ${fnName} !== "undefined") { window.${fnName} = ${fnName}; }\n`;
        }
      }
      return cleaned;
    };

    let bundledCode = '';

    if (files && files.length > 1) {
      const entry = files.find(f => f.path === (entryPath || 'src/App.jsx')) || files[0];
      
      for (const file of files) {
        if (file.path === entry.path) continue;
        bundledCode += `\n// --- [Fichier: ${file.name}] ---\n` + processFileContent(file.content, false) + '\n';
      }

      const activeEntryContent = (files.find(f => f.path === entry.path)?.content) || code;
      bundledCode += `\n// --- [Fichier Racine: ${entry.name}] ---\n` + processFileContent(activeEntryContent, true);
    } else {
      bundledCode = processFileContent(code, true);
    }

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
    ${consoleInterceptorScript}

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

        window.useState = React.useState;
        window.useEffect = React.useEffect;
        window.useReducer = React.useReducer;
        window.useRef = React.useRef;
        window.useMemo = React.useMemo;
        window.useCallback = React.useCallback;
        window.useContext = React.useContext;
        window.createContext = React.createContext;

        const rawCode = ${JSON.stringify(bundledCode)};

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
  }, [code, files, languageInfo]);

  return (
    <div className="relative flex flex-col h-full rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] overflow-hidden shadow-xs">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/10 dark:border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span 
            className={`h-2.5 w-2.5 rounded-full ${
              languageInfo.isSupported 
                ? 'bg-[#10B981] animate-pulse' 
                : 'bg-rose-500'
            }`} 
          />
          <span className="font-bold text-[#0A0A0A] dark:text-white">
            Aperçu en Direct (Live Preview)
          </span>

          {/* Active / Detected Language Badge */}
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${
            languageInfo.isSupported
              ? 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30'
              : 'bg-rose-500/15 text-rose-500 border-rose-500/30'
          }`}>
            {languageInfo.icon} {languageInfo.name}
          </span>
        </div>

        {languageInfo.isSupported && (
          <button
            onClick={runCode}
            title="Relancer l'exécution du code"
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#10B981] hover:bg-[#22C55E] text-white font-bold transition-colors shadow-2xs cursor-pointer active:scale-95"
          >
            <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Exécuter</span>
          </button>
        )}
      </div>

      {/* Error Notification Banner (Only for supported languages when runtime/syntax errors occur) */}
      {languageInfo.isSupported && error && (
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

      {/* Center Display: Either Unsupported Language State in the CENTER or Sandbox iFrame */}
      {!languageInfo.isSupported ? (
        <div className="relative flex-1 min-h-0 bg-white dark:bg-[#0A0A0A]">
          <UnsupportedLanguagePreview
            languageInfo={languageInfo}
            onResetToReact={onResetToReact}
            onInsertHtmlExample={onInsertHtmlExample}
          />
        </div>
      ) : (
        <div className="relative flex-1 min-h-0 bg-white">
          <iframe
            ref={iframeRef}
            title="Live Preview Sandbox"
            sandbox="allow-scripts allow-modals"
            className="w-full h-full border-0"
          />
        </div>
      )}
    </div>
  );
}
