import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const raw = String(fields.dataset || fields.data || '').trim();
  if (!raw) return { output: '' };

  const numbers = raw
    .split(/[\s,;]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map(Number)
    .filter((n) => isFinite(n));

  if (numbers.length === 0) return { output: '' };

  const n = numbers.length;
  const type = String(fields.type || 'population');
  const isSample = type === 'sample';

  const mean = numbers.reduce((a, b) => a + b, 0) / n;
  const squaredDiffs = numbers.map((x) => (x - mean) ** 2);
  const sumSquaredDiffs = squaredDiffs.reduce((a, b) => a + b, 0);
  const variance = isSample ? sumSquaredDiffs / (n - 1) : sumSquaredDiffs / n;
  const stdDev = Math.sqrt(variance);

  const sorted = [...numbers].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[n - 1];
  const range = max - min;

  // Median
  let median: number;
  if (n % 2 === 0) {
    median = (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  } else {
    median = sorted[Math.floor(n / 2)];
  }

  const table = [
    { label: 'Count', value: n.toString() },
    { label: 'Mean', value: fmt(mean) },
    { label: 'Median', value: fmt(median) },
    { label: 'Min', value: fmt(min) },
    { label: 'Max', value: fmt(max) },
    { label: 'Range', value: fmt(range) },
    { label: 'Variance', value: fmt(variance), unit: isSample ? 'sample' : 'population' },
    { label: 'Std Deviation', value: fmt(stdDev), unit: isSample ? 'sample' : 'population' },
    { label: 'Sum', value: fmt(numbers.reduce((a, b) => a + b, 0)) },
  ];

  return {
    output: fmt(stdDev),
    breakdown: [
      { label: 'Type', value: isSample ? 'Sample (n-1)' : 'Population (n)' },
      { label: 'Count (n)', value: n.toString() },
      { label: 'Mean (\u03bc)', value: fmt(mean) },
      { label: 'Variance (\u03c3\u00b2)', value: fmt(variance) },
      { label: 'Std Deviation (\u03c3)', value: fmt(stdDev), highlight: true },
    ],
    table,
    stats: {
      count: n,
      mean: round6(mean),
      median: round6(median),
      variance: round6(variance),
      standardDeviation: round6(stdDev),
    },
  };
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(6)).toString();
}

function round6(n: number): number {
  return Math.round(n * 1e6) / 1e6;
}
