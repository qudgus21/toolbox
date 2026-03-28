import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const currentGrade = Number(fields.currentGrade);
  const examWeight = Number(fields.examWeight);
  const targetGrade = Number(fields.targetGrade);

  if (!isFinite(currentGrade) || !isFinite(examWeight) || !isFinite(targetGrade)) {
    return { output: '' };
  }
  if (examWeight <= 0 || examWeight > 100) return { output: '' };

  const examWeightDecimal = examWeight / 100;
  const currentWeightDecimal = 1 - examWeightDecimal;
  const needed = (targetGrade - currentGrade * currentWeightDecimal) / examWeightDecimal;

  const isPossible = needed <= 100;
  const isGuaranteed = needed <= 0;

  let message: string;
  if (isGuaranteed) {
    message = `You've already achieved your target grade of ${fmt(targetGrade)}%`;
  } else if (!isPossible) {
    message = `You need ${fmt(needed)}% which exceeds 100%`;
  } else {
    message = `You need ${fmt(needed)}% on the final exam`;
  }

  return {
    output: isGuaranteed ? `Already achieved!` : `${fmt(needed)}%`,
    table: [
      { label: 'Current Grade', value: `${fmt(currentGrade)}%` },
      { label: 'Exam Weight', value: `${fmt(examWeight)}%` },
      { label: 'Target Grade', value: `${fmt(targetGrade)}%` },
      { label: 'Score Needed', value: `${fmt(needed)}%` },
      { label: 'Achievable', value: isPossible },
    ],
    breakdown: [
      { label: 'Formula', value: 'Needed = (Target - Current × (1 - ExamWeight/100)) / (ExamWeight/100)' },
      {
        label: 'Calculation',
        value: `(${fmt(targetGrade)} - ${fmt(currentGrade)} × ${fmt(currentWeightDecimal)}) / ${fmt(examWeightDecimal)}`,
      },
      { label: 'Current Contribution', value: `${fmt(currentGrade)} × ${fmt(currentWeightDecimal)} = ${fmt(currentGrade * currentWeightDecimal)}` },
      { label: 'Remaining Points', value: `${fmt(targetGrade)} - ${fmt(currentGrade * currentWeightDecimal)} = ${fmt(targetGrade - currentGrade * currentWeightDecimal)}` },
      { label: 'Score Needed', value: `${fmt(needed)}%`, highlight: true },
      { label: 'Status', value: message, highlight: true },
    ],
  };
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(2)).toLocaleString('en-US', { maximumFractionDigits: 2 });
}
