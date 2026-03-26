import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const favorable = Number(fields.favorable);
  const total = Number(fields.total);

  if (!isFinite(favorable) || !isFinite(total) || total <= 0 || favorable < 0 || favorable > total) {
    return { output: '' };
  }

  const probability = favorable / total;
  const complement = 1 - probability;
  const oddsFor = favorable / (total - favorable || 1);
  const oddsAgainst = (total - favorable) / (favorable || 1);
  const pctChance = probability * 100;

  return {
    output: `${fmt(probability)} (${fmt(pctChance)}%)`,
    table: [
      { label: 'Favorable Outcomes', value: fmt(favorable) },
      { label: 'Total Outcomes', value: fmt(total) },
      { label: 'Probability P(A)', value: fmt(probability) },
      { label: 'Percentage', value: `${fmt(pctChance)}%` },
      { label: 'Complement P(A\')', value: fmt(complement) },
      { label: 'Odds For', value: `${fmt(favorable)} : ${fmt(total - favorable)}` },
      { label: 'Odds Against', value: `${fmt(total - favorable)} : ${fmt(favorable)}` },
      { label: 'Odds Ratio (for)', value: fmt(oddsFor) },
      { label: 'Odds Ratio (against)', value: fmt(oddsAgainst) },
    ],
    breakdown: [
      { label: 'Formula', value: 'P(A) = favorable / total' },
      { label: 'Calculation', value: `${fmt(favorable)} / ${fmt(total)}` },
      { label: 'P(A)', value: fmt(probability), highlight: true },
      { label: 'P(A\')', value: `1 - ${fmt(probability)} = ${fmt(complement)}` },
    ],
  };
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(6)).toLocaleString('en-US', { maximumFractionDigits: 6 });
}
