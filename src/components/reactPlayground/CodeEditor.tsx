import React, { useState, useRef, useEffect } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { Copy, Check, RotateCcw, Code2, AlertTriangle, AlertCircle } from 'lucide-react';
import { registerMonacoProviders } from './monacoCompletionProvider';
import { useTheme } from '../../hooks/useTheme';
import { validateCodeSyntax, SyntaxDiagnostic, loadBabelStandalone } from '../../utils/codeValidator';

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  fileName: string;
  onReset?: () => void;
}

export function CodeEditor({ code, onChange, fileName, onReset }: CodeEditorProps) {
  const [copied, setCopied] = useState(false);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const [diagnostic, setDiagnostic] = useState<SyntaxDiagnostic>(() => validateCodeSyntax(code, fileName));
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const { isDark } = useTheme();

  // Determine Monaco language from file extension
  const getLanguage = (file: string): string => {
    if (file.endsWith('.css')) return 'css';
    if (file.endsWith('.json')) return 'json';
    if (file.endsWith('.html')) return 'html';
    if (file.endsWith('.tsx') || file.endsWith('.ts')) return 'typescript';
    return 'javascript';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Pre-load Babel standalone in background when code editor mounts
  useEffect(() => {
    loadBabelStandalone().then((loaded) => {
      if (loaded) {
        setDiagnostic(validateCodeSyntax(code, fileName));
      }
    });
  }, [fileName]);

  // Dynamically update theme when user toggles light/dark mode
  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(isDark ? 'ofppt-dark-theme' : 'ofppt-light-theme');
    }
  }, [isDark]);

  // Real-time Live Syntax Validation on any change
  useEffect(() => {
    const timer = setTimeout(() => {
      const diag = validateCodeSyntax(code, fileName);
      setDiagnostic(diag);

      // Set or clear Monaco red squiggly error markers in real-time
      if (monacoRef.current && editorRef.current) {
        const model = editorRef.current.getModel();
        if (model) {
          if (!diag.isValid && diag.error) {
            const lineContent = model.getLineContent(diag.error.line) || '';
            const endColumn = Math.max(diag.error.col + 1, Math.min(lineContent.length + 1, diag.error.col + 12));
            monacoRef.current.editor.setModelMarkers(model, 'syntax-checker', [
              {
                startLineNumber: diag.error.line,
                startColumn: Math.max(1, diag.error.col),
                endLineNumber: diag.error.line,
                endColumn: endColumn,
                message: diag.error.message,
                severity: monacoRef.current.MarkerSeverity.Error
              }
            ]);
          } else {
            monacoRef.current.editor.setModelMarkers(model, 'syntax-checker', []);
          }
        }
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [code, fileName]);

  const handleJumpToError = () => {
    if (diagnostic.error && editorRef.current) {
      editorRef.current.revealLineInCenter(diagnostic.error.line);
      editorRef.current.setPosition({ lineNumber: diagnostic.error.line, column: diagnostic.error.col });
      editorRef.current.focus();
    }
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Track cursor position for the status bar
    editor.onDidChangeCursorPosition((e) => {
      setCursorPos({
        line: e.position.lineNumber,
        col: e.position.column
      });
    });

    // Configure JavaScript/TypeScript compiler options for React JSX & modern ES
    const compilerOpts = {
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTextExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: 'React',
      allowJs: true,
      checkJs: false,
      noUnusedLocals: false,
      noUnusedParameters: false
    };

    // Disable semantic validation warnings (e.g. 'declared but its value is never read')
    // while preserving real syntax validation (unmatched brackets, invalid tokens)
    const diagOpts = {
      noSemanticValidation: true,
      noSyntaxValidation: false
    };

    if (monaco.languages.typescript?.javascriptDefaults) {
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions(compilerOpts);
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(diagOpts);
    }
    if (monaco.languages.typescript?.typescriptDefaults) {
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions(compilerOpts);
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(diagOpts);
    }

    // 1. Define custom VSCode Dark+ Theme
    monaco.editor.defineTheme('ofppt-dark-theme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'keyword', foreground: 'C586C0' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'tag', foreground: '569CD6' },
        { token: 'attribute.name', foreground: '9CDCFE' },
        { token: 'attribute.value', foreground: 'CE9178' },
        { token: 'delimiter', foreground: 'D4D4D4' }
      ],
      colors: {
        'editor.background': '#1E1E1E',
        'editor.foreground': '#D4D4D4',
        'editor.lineHighlightBackground': '#2A2D2E',
        'editorLineNumber.foreground': '#858585',
        'editorLineNumber.activeForeground': '#FFFFFF',
        'editorCursor.foreground': '#10B981',
        'editor.selectionBackground': '#264F78',
        'editorSuggestWidget.background': '#252526',
        'editorSuggestWidget.border': '#454545',
        'editorSuggestWidget.foreground': '#CCCCCC',
        'editorSuggestWidget.selectedBackground': '#094771',
        'editorSuggestWidget.selectedForeground': '#FFFFFF',
        'editorSuggestWidget.highlightForeground': '#10B981',
        'editorSuggestWidget.focusHighlightForeground': '#10B981'
      }
    });

    // 2. Define custom VSCode Light Theme (Clean, High-Contrast & Harmonious)
    monaco.editor.defineTheme('ofppt-light-theme', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '008000', fontStyle: 'italic' },
        { token: 'string', foreground: 'A31515' },
        { token: 'keyword', foreground: 'AF00DB' },
        { token: 'number', foreground: '098658' },
        { token: 'type', foreground: '267F99' },
        { token: 'tag', foreground: '800000' },
        { token: 'attribute.name', foreground: 'E50000' },
        { token: 'attribute.value', foreground: '0451A5' },
        { token: 'delimiter', foreground: '000000' }
      ],
      colors: {
        'editor.background': '#FFFFFF',
        'editor.foreground': '#1F2328',
        'editor.lineHighlightBackground': '#F8FAFC',
        'editorLineNumber.foreground': '#94A3B8',
        'editorLineNumber.activeForeground': '#0F172A',
        'editorCursor.foreground': '#10B981',
        'editor.selectionBackground': '#BAE6FD',
        'editorSuggestWidget.background': '#FFFFFF',
        'editorSuggestWidget.border': '#CBD5E1',
        'editorSuggestWidget.foreground': '#0F172A',
        'editorSuggestWidget.selectedBackground': '#BAE6FD',
        'editorSuggestWidget.selectedForeground': '#0F172A',
        'editorSuggestWidget.highlightForeground': '#059669',
        'editorSuggestWidget.focusHighlightForeground': '#059669'
      }
    });

    // Set initial theme according to current platform theme
    monaco.editor.setTheme(isDark ? 'ofppt-dark-theme' : 'ofppt-light-theme');

    // Register React & CSS IntelliSense autocompletion providers
    registerMonacoProviders(monaco);

    // Initial marker check on mount
    const initialDiag = validateCodeSyntax(code, fileName);
    if (!initialDiag.isValid && initialDiag.error) {
      const model = editor.getModel();
      if (model) {
        const lineContent = model.getLineContent(initialDiag.error.line) || '';
        const endColumn = Math.max(initialDiag.error.col + 1, Math.min(lineContent.length + 1, initialDiag.error.col + 12));
        monaco.editor.setModelMarkers(model, 'syntax-checker', [
          {
            startLineNumber: initialDiag.error.line,
            startColumn: Math.max(1, initialDiag.error.col),
            endLineNumber: initialDiag.error.line,
            endColumn: endColumn,
            message: initialDiag.error.message,
            severity: monaco.MarkerSeverity.Error
          }
        ]);
      }
    }
  };

  const lines = code.split('\n');

  return (
    <div className="flex flex-col h-full rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] text-slate-800 dark:text-white overflow-hidden shadow-md transition-colors">
      {/* VSCode Window Chrome Header (Adapts to Platform Theme) */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#F8FAFC] dark:bg-[#181818] border-b border-black/10 dark:border-white/10 text-xs font-mono transition-colors">
        {/* File Tab & Live Validity Status */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-[#252526] text-slate-800 dark:text-white font-bold border border-black/10 dark:border-white/10 shadow-2xs">
            <Code2 className="h-3.5 w-3.5 text-[#10B981]" />
            <span>{fileName}</span>
          </div>

          {/* Live Syntax Diagnostic Indicator */}
          {diagnostic.isValid ? (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold">
              <Check className="h-3 w-3 text-[#10B981]" />
              <span>Code Valide</span>
            </div>
          ) : (
            <button
              onClick={handleJumpToError}
              title={`${diagnostic.error?.message} (Cliquez pour aller à la ligne ${diagnostic.error?.line})`}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30 text-[10px] font-mono font-bold animate-pulse cursor-pointer hover:bg-red-500/25 transition-colors"
            >
              <AlertTriangle className="h-3 w-3 text-red-500 shrink-0" />
              <span className="truncate max-w-[150px] sm:max-w-[280px]">
                Ligne {diagnostic.error?.line} : {diagnostic.error?.shortMessage}
              </span>
            </button>
          )}

          <span className="text-[10px] text-slate-500 dark:text-white/40 hidden md:inline">
            {lines.length} lignes · {getLanguage(fileName)}
          </span>
        </div>

        {/* Top Action Buttons */}
        <div className="flex items-center gap-2">
          {onReset && (
            <button
              onClick={onReset}
              title="Réinitialiser le code à l'état de départ"
              className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
            >
              <RotateCcw className="h-3 w-3" />
              <span className="hidden sm:inline">Réinitialiser</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            title="Copier le code"
            className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-[#10B981]" />
                <span className="text-[#10B981]">Copié</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span className="hidden sm:inline">Copier</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Body: Native Monaco (VS Code) Container with Light/Dark Background */}
      <div className="relative flex-1 min-h-0 overflow-hidden bg-white dark:bg-[#1E1E1E] transition-colors">
        <Editor
          height="100%"
          path={fileName}
          language={getLanguage(fileName)}
          value={code}
          theme={isDark ? 'ofppt-dark-theme' : 'ofppt-light-theme'}
          onChange={(val) => onChange(val || '')}
          onMount={handleEditorDidMount}
          loading={
            <div className="flex items-center justify-center h-full text-xs font-mono text-slate-400 dark:text-white/50 bg-white dark:bg-[#1E1E1E] gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span>Chargement du moteur VS Code (Monaco)...</span>
            </div>
          }
          options={{
            fontSize: 13,
            fontFamily: "'Fira Code', Consolas, 'Courier New', monospace",
            fontLigatures: true,
            lineHeight: 22,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            cursorBlinking: 'smooth',
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            autoSurround: 'languageDefined',
            formatOnType: true,
            formatOnPaste: true,
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true
            },
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on',
            tabCompletion: 'on',
            quickSuggestions: {
              other: true,
              comments: false,
              strings: true
            },
            wordBasedSuggestions: 'currentDocument',
            suggestSelection: 'first',
            parameterHints: {
              enabled: true
            },
            suggest: {
              showWords: true,
              showKeywords: true,
              showSnippets: true,
              showFunctions: true,
              showClasses: true,
              showModules: true,
              showProperties: true,
              filterGraceful: true,
              localityBonus: true,
              shareSuggestSelections: true
            },
            padding: { top: 12, bottom: 12 },
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              useShadows: false,
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10
            }
          }}
        />
      </div>

      {/* VSCode Bottom Status Bar (Adapts to Platform Theme with Real-Time Error Check) */}
      <div className="px-3 py-1 bg-[#F8FAFC] dark:bg-[#121212] border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-white/50 select-none transition-colors">
        <div className="flex items-center gap-3">
          {diagnostic.isValid ? (
            <span className="text-emerald-600 dark:text-[#10B981] font-bold flex items-center gap-1.5">
              <Check className="h-3 w-3" />
              <span>Syntaxe OK (0 erreur)</span>
            </span>
          ) : (
            <button
              onClick={handleJumpToError}
              className="text-red-500 dark:text-red-400 font-bold flex items-center gap-1.5 hover:underline cursor-pointer"
            >
              <AlertCircle className="h-3 w-3 shrink-0" />
              <span className="truncate max-w-[200px] sm:max-w-[340px]">
                Ligne {diagnostic.error?.line}, Col {diagnostic.error?.col} : {diagnostic.error?.shortMessage}
              </span>
            </button>
          )}

          <span>Ln {cursorPos.line}, Col {cursorPos.col}</span>
          <span className="hidden sm:inline">{code.length} caractères</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">UTF-8</span>
          <span className="hidden sm:inline">Espaces: 2</span>
          <span className="text-[#10B981] font-bold">
            VS Code Monaco ({isDark ? 'Dark' : 'Light'})
          </span>
        </div>
      </div>
    </div>
  );
}
