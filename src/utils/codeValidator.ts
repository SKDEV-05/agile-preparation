// Real-time Live Syntax & Validity Checker for all Mini VS Code Editors

export interface SyntaxDiagnostic {
  isValid: boolean;
  error: {
    line: number;
    col: number;
    message: string;
    shortMessage: string;
  } | null;
}

declare global {
  interface Window {
    Babel?: {
      transform: (
        code: string,
        options: { presets?: string[]; filename?: string; sourceType?: string }
      ) => { code: string };
    };
  }
}

export function validateCodeSyntax(code: string, fileName: string): SyntaxDiagnostic {
  if (!code || !code.trim()) {
    return { isValid: true, error: null };
  }

  // 1. JSON file validation
  if (fileName.endsWith('.json')) {
    try {
      JSON.parse(code);
      return { isValid: true, error: null };
    } catch (err: any) {
      const msg = err?.message || 'JSON invalide';
      const posMatch = msg.match(/position\s+(\d+)/i);
      let line = 1;
      let col = 1;
      if (posMatch) {
        const pos = parseInt(posMatch[1], 10);
        const upToPos = code.substring(0, pos);
        const lines = upToPos.split('\n');
        line = lines.length;
        col = lines[lines.length - 1].length + 1;
      }
      return {
        isValid: false,
        error: {
          line,
          col,
          message: msg,
          shortMessage: 'Erreur de syntaxe JSON'
        }
      };
    }
  }

  // 2. Immediate check for empty JSX attributes: e.g. onClick={}, value={}, className={}
  const emptyAttrRegex = /\b([a-zA-Z0-9_$]+)\s*=\s*\{\s*\}/g;
  let emptyMatch: RegExpExecArray | null;
  while ((emptyMatch = emptyAttrRegex.exec(code)) !== null) {
    const propName = emptyMatch[1];
    const upTo = code.substring(0, emptyMatch.index);
    const lines = upTo.split('\n');
    const line = lines.length;
    const col = lines[lines.length - 1].length + 1;
    return {
      isValid: false,
      error: {
        line,
        col,
        message: `L'attribut JSX '${propName}={}' est vide. Renseignez une expression ou une fonction (ex: ${propName}={decrement}).`,
        shortMessage: `Accolade vide '${propName}={}'`
      }
    };
  }

  // 3. Babel AST compilation check (Exact JSX, ES6+, Hook syntax validator)
  if (
    typeof window !== 'undefined' && 
    window.Babel && 
    (fileName.endsWith('.jsx') || fileName.endsWith('.js') || fileName.endsWith('.tsx') || fileName.endsWith('.ts'))
  ) {
    try {
      // Strip import statements while strictly preserving exact line counts and character columns
      const cleaned = code.replace(
        /(import\s+[\s\S]*?from\s+['"][^'"]*?['"]\s*;?|import\s+['"][^'"]*?['"]\s*;?)/g,
        (match) => match.replace(/[^\n]/g, ' ')
      );

      const isTs = fileName.endsWith('.tsx') || fileName.endsWith('.ts');
      window.Babel.transform(cleaned, {
        presets: isTs ? ['react', 'typescript'] : ['react'],
        filename: fileName,
        sourceType: 'module'
      });

      return { isValid: true, error: null };
    } catch (babelErr: any) {
      const fullMsg = babelErr.message ? babelErr.message.replace(/unknown:\s*/g, '') : String(babelErr);
      let line = babelErr.loc?.line || 1;
      let col = babelErr.loc?.column || 1;

      // Extract line and col if loc is not directly provided
      if (!babelErr.loc) {
        const lineMatch = fullMsg.match(/\((\d+):(\d+)\)/);
        if (lineMatch) {
          line = parseInt(lineMatch[1], 10);
          col = parseInt(lineMatch[2], 10);
        }
      }

      // Create clear French summary for student
      let shortMessage = 'Erreur de syntaxe';
      if (fullMsg.includes('JSX attributes must only be assigned a non-empty expression')) {
        shortMessage = "Attribut JSX avec accolade vide '{}'";
      } else if (fullMsg.includes('Expected corresponding JSX closing tag')) {
        const tagMatch = fullMsg.match(/for\s*<([a-zA-Z0-9_-]+)>/);
        shortMessage = tagMatch ? `Balise <${tagMatch[1]}> non refermée` : 'Balise JSX non refermée';
      } else if (fullMsg.includes('Adjacent JSX elements must be wrapped')) {
        shortMessage = 'Enveloppez les balises dans un Fragment (<>...</>)';
      } else if (fullMsg.includes('Unexpected token')) {
        shortMessage = 'Symbole ou accolade inattendu';
      } else if (fullMsg.includes('Unterminated string constant')) {
        shortMessage = 'Guillemet de chaîne non refermé';
      } else if (fullMsg.includes('Unterminated JSX contents')) {
        shortMessage = 'Balise ou contenu JSX non refermé';
      } else if (fullMsg.includes('Missing initializer')) {
        shortMessage = 'Variable const non initialisée';
      } else if (fullMsg.includes('Unterminated comment')) {
        shortMessage = 'Commentaire /* */ non refermé';
      }

      return {
        isValid: false,
        error: {
          line,
          col,
          message: fullMsg,
          shortMessage
        }
      };
    }
  }

  // 4. Fallback bracket & tag matching check (if Babel not loaded yet or for CSS)
  const stack: Array<{ char: string; line: number; col: number }> = [];
  const lines = code.split('\n');
  for (let l = 0; l < lines.length; l++) {
    const lineStr = lines[l];
    const trimmed = lineStr.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*')) continue;

    for (let c = 0; c < lineStr.length; c++) {
      const ch = lineStr[c];
      if (ch === '{' || ch === '(' || ch === '[') {
        stack.push({ char: ch, line: l + 1, col: c + 1 });
      } else if (ch === '}' || ch === ')' || ch === ']') {
        const last = stack.pop();
        const expected = ch === '}' ? '{' : ch === ')' ? '(' : '[';
        if (!last || last.char !== expected) {
          return {
            isValid: false,
            error: {
              line: l + 1,
              col: c + 1,
              message: `Fermeture inattendue '${ch}'. Vérifiez vos parenthèses et accolades.`,
              shortMessage: `Fermeture inattendue '${ch}'`
            }
          };
        }
      }
    }
  }

  if (stack.length > 0) {
    const unclosed = stack[stack.length - 1];
    return {
      isValid: false,
      error: {
        line: unclosed.line,
        col: unclosed.col,
        message: `'${unclosed.char}' ouvert à la ligne ${unclosed.line} n'est pas refermé.`,
        shortMessage: `'${unclosed.char}' non refermé`
      }
    };
  }

  return { isValid: true, error: null };
}
