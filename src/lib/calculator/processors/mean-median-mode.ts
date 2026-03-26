import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const dataset = String(fields.dataset || '');
  if (!dataset.trim()) return { output: '' };

  const numbers = dataset
    .split(/[\s,;\n]+/)
    .map(s => s.trim())
    .filter(Boolean)
    .map(Number)
    .filter(isFinite);

  if (numbers.length === 0) return { output: '' };

  const sorted = [...numbers].sort((a, b) => a - b);
  const n = sorted.length;
  const sum = sorted.reduce((a, b) => a + b, 0);
  const mean = sum / n;

  const median =
    n % 2 === 0
      ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
      : sorted[Math.floor(n / 2)];

  // Mode
  const freq = new Map<number, number>();
  for (const v of sorted) freq.set(v, (freq.get(v) || 0) + 1);
  const maxFreq = Math.max(...Array.from(freq.values()));
  const modes = Array.from(freq.entries()).filter(([, f]) => f === maxFreq).map(([v]) => v);
  const modeStr = maxFreq === 1 ? 'No mode' : modes.map(fmt).join(', ');

  const min = sorted[0];
  const max = sorted[n - 1];
  const range = max - min;

  const q1 = percentile(sorted, 25);
  const q3 = percentile(sorted, 75);
  const iqr = q3 - q1;

  // Variance & Std Dev
  const variance = sorted.reduce((s, v) => s + (v - mean) ** 2, 0) / n;
  const stdDev = Math.sqrt(variance);

  return {
    output: `Mean: ${fmt(mean)}`,
    table: [
      { label: 'Count', value: fmt(n) },
      { label: 'Sum', value: fmt(sum) },
      { label: 'Mean', value: fmt(mean) },
      { label: 'Median', value: fmt(median) },
      { label: 'Mode', value: modeStr },
      { label: 'Min', value: fmt(min) },
      { label: 'Max', value: fmt(max) },
      { label: 'Range', value: fmt(range) },
      { label: 'Q1 (25th)', value: fmt(q1) },
      { label: 'Q3 (75th)', value: fmt(q3) },
      { label: 'IQR', value: fmt(iqr) },
      { label: 'Std Dev (σ)', value: fmt(stdDev) },
      { label: 'Variance (σ²)', value: fmt(variance) },
    ],
    breakdown: [
      { label: 'Dataset', value: `${n} values` },
      { label: 'Mean', value: `Sum / Count = ${fmt(sum)} / ${n} = ${fmt(mean)}`, highlight: true },
      { label: 'Median', value: fmt(median), highlight: true },
      { label: 'Mode', value: modeStr },
    ],
  };
}

function percentile(sorted: number[], p: number): number {
  const idx = (p / 100) * (sorted.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(6)).toLocaleString('en-US', { maximumFractionDigits: 6 });
}
