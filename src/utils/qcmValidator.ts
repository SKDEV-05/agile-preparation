import { ReactQuestion } from '../types/reactTypes';

export interface QcmValidationReport {
  isValid: boolean;
  totalQuestions: number;
  distribution: { A: number; B: number; C: number; D: number };
  distributionPercentages: { A: string; B: string; C: string; D: string };
  errors: string[];
  warnings: string[];
}

// Known joke/unrealistic distractor patterns that must not appear in professional exams
const JOKE_PATTERNS = [
  /interdit dans chrome/i,
  /redémarre la page/i,
  /supprime l'ordinateur/i,
  /arrête la machine/i,
  /convertir.*en images png/i,
  /supprime automatiquement les chaînes de plus de 20/i,
  /mots de passe hachés en md5/i,
  /l'arrêt automatique de l'ordinateur/i,
  /moteur de fusée/i,
  /explose/i
];

/**
 * Validates the educational integrity, balance, and quality of React M204 questions.
 */
export function validateReactQuestionsIntegrity(
  questions: ReactQuestion[],
  options?: { maxOptionRatio?: number; maxOptionBiasPct?: number }
): QcmValidationReport {
  const maxRatio = options?.maxOptionRatio ?? 1.85;
  const maxBiasPct = options?.maxOptionBiasPct ?? 35; // Maximum allowed % for any single option index overall

  const errors: string[] = [];
  const warnings: string[] = [];
  const idSet = new Set<string>();

  const distribution = { A: 0, B: 0, C: 0, D: 0 };
  const keys: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];

  questions.forEach((q, idx) => {
    const qLabel = `Question [${q.id || `idx_${idx}`}] ("${(q.question || '').slice(0, 35)}...")`;

    // 1. ID check
    if (!q.id || typeof q.id !== 'string') {
      errors.push(`${qLabel}: ID manquant ou invalide.`);
    } else if (idSet.has(q.id)) {
      errors.push(`ID dupliqué détecté: "${q.id}". Chaque question doit posséder un identifiant unique.`);
    } else {
      idSet.add(q.id);
    }

    // 2. Question text
    if (!q.question || q.question.trim().length < 15) {
      errors.push(`${qLabel}: L'énoncé de la question est trop court ou vide.`);
    }

    // 3. Options validation
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      errors.push(`${qLabel}: Doit comporter exactement 4 options (reçu: ${q.options?.length ?? 0}).`);
      return;
    }

    // Check empty options
    q.options.forEach((opt, optIdx) => {
      if (!opt || opt.trim().length === 0) {
        errors.push(`${qLabel}: L'option ${keys[optIdx]} est vide.`);
      }
    });

    // 4. Correct index validation
    if (typeof q.correctIndex !== 'number' || q.correctIndex < 0 || q.correctIndex > 3) {
      errors.push(`${qLabel}: correctIndex invalide (${q.correctIndex}), doit être compris entre 0 et 3.`);
      return;
    }

    // Count distribution
    distribution[keys[q.correctIndex]]++;

    // 5. Explanation check
    if (!q.explanation || q.explanation.trim().length < 25) {
      warnings.push(`${qLabel}: L'explication pédagogique est trop succincte (< 25 caractères).`);
    }

    // 6. Option length balance check
    const correctOpt = q.options[q.correctIndex] || '';
    const distractors = q.options.filter((_, i) => i !== q.correctIndex);
    const avgDistractorLength = distractors.reduce((sum, d) => sum + (d?.length || 0), 0) / 3;

    if (avgDistractorLength > 0 && correctOpt.length > avgDistractorLength * maxRatio) {
      warnings.push(
        `${qLabel}: Réponse ${keys[q.correctIndex]} est disproportionnellement longue (${correctOpt.length} car. vs moyenne distracteurs ${Math.round(avgDistractorLength)} car., ratio ${(correctOpt.length / avgDistractorLength).toFixed(1)}x).`
      );
    }

    // 7. Joke distractor check
    q.options.forEach((opt, optIdx) => {
      for (const pattern of JOKE_PATTERNS) {
        if (pattern.test(opt)) {
          errors.push(
            `${qLabel}: Distracteur non pédagogique ou facétieux détecté dans option ${keys[optIdx]}: "${opt}"`
          );
          break;
        }
      }
    });
  });

  const total = questions.length;
  const percentages = {
    A: total > 0 ? ((distribution.A / total) * 100).toFixed(1) + '%' : '0%',
    B: total > 0 ? ((distribution.B / total) * 100).toFixed(1) + '%' : '0%',
    C: total > 0 ? ((distribution.C / total) * 100).toFixed(1) + '%' : '0%',
    D: total > 0 ? ((distribution.D / total) * 100).toFixed(1) + '%' : '0%'
  };

  // Check overall distribution balance
  if (total >= 20) {
    keys.forEach((key) => {
      const pct = (distribution[key] / total) * 100;
      if (pct > maxBiasPct) {
        errors.push(
          `Biais de réponse excessif sur l'option ${key}: ${pct.toFixed(1)}% des réponses correctes (seuil max recommandé: ${maxBiasPct}%).`
        );
      }
    });
  }

  return {
    isValid: errors.length === 0,
    totalQuestions: total,
    distribution,
    distributionPercentages: percentages,
    errors,
    warnings
  };
}
