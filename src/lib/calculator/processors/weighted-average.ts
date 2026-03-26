import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const dataset = String(fields.dataset || '');
  if (!dataset.trim()) return { output: '' };

  const entries = parseEntries(dataset);
  if (entries.length === 0) return { output: '' };

  const totalWeight = entries.reduce((s, e) => s + e.weight, 0);
  if (totalWeight === 0) return { output: '' };

  const weightedSum = entries.reduce((s, e) => s + e.value * e.weight, 0);
  const weightedAverage = weightedSum / totalWeight;

  const simpleAverage = entries.reduce((s, e) => s + e.value, 0) / entries.length;

  const table = entries.map((e, i) => ({
    label: `Item ${i + 1}`,
    value: `Value: ${fmt(e.value)} — Weight: ${fmt(e.weight)}`,
  }));

  return {
    output: fmt(weightedAverage),
    table: [
      ...table,
      { label: 'Weighted Average', value: fmt(weightedAverage) },
      { label: 'Simple Average', value: fmt(simpleAverage) },
      { label: 'Total Weight', value: fmt(totalWeight) },
      { label: 'Weighted Sum', value: fmt(weightedSum) },
    ],
    breakdown: [
      { label: 'Formula', value: 'WA = Σ(value × weight) / Σ(weight)' },
      { label: 'Numerator', value: entries.map(e => `${fmt(e.value)}×${fmt(e.weight)}`).join(' + ') + ` = ${fmt(weightedSum)}` },
      { label: 'Denominator', value: entries.map(e => fmt(e.weight)).join(' + ') + ` = ${fmt(totalWeight)}` },
      { label: 'Weighted Average', value: `${fmt(weightedSum)} / ${fmt(totalWeight)} = ${fmt(weightedAverage)}`, highlight: true },
    ],
  };
}

function parseEntries(input: string): { value: number; weight: number }[] {
  return input
    .trim()
    .split(/\n/)
    .map(line => {
      const parts = line.trim().split(/[\s,;]+/).map(Number);
      if (parts.length >= 2 && isFinite(parts[0]) && isFinite(parts[1]) && parts[1] > 0) {
        return { value: parts[0], weight: parts[1] };
      }
      return null;
    })
    .filter((e): e is { value: number; weight: number } => e !== null);
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(4)).toLocaleString('en-US', { maximumFractionDigits: 4 });
}
