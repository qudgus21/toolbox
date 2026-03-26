import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const value = Number(fields.value);
  const mean = Number(fields.mean);
  const stdDev = Number(fields.stdDev);

  if (!isFinite(value) || !isFinite(mean) || !isFinite(stdDev) || stdDev === 0) {
    return { output: '' };
  }

  const z = (value - mean) / stdDev;
  const percentile = approxPercentile(z);
  const probability = percentile / 100;

  return {
    output: fmt(z),
    table: [
      { label: 'Value (x)', value: fmt(value) },
      { label: 'Mean (μ)', value: fmt(mean) },
      { label: 'Std Dev (σ)', value: fmt(stdDev) },
      { label: 'Z-Score', value: fmt(z) },
      { label: 'Percentile', value: `${fmt(percentile)}%` },
      { label: 'P(X ≤ x)', value: fmt(probability) },
      { label: 'P(X > x)', value: fmt(1 - probability) },
    ],
    breakdown: [
      { label: 'Formula', value: 'z = (x - μ) / σ' },
      { label: 'Calculation', value: `(${fmt(value)} - ${fmt(mean)}) / ${fmt(stdDev)}` },
      { label: 'Z-Score', value: fmt(z), highlight: true },
      { label: 'Percentile', value: `≈ ${fmt(percentile)}%`, highlight: true },
      {
        label: 'Interpretation',
        value: `${fmt(value)} is ${fmt(Math.abs(z))} standard deviations ${z >= 0 ? 'above' : 'below'} the mean`,
      },
    ],
  };
}

/** Approximate CDF of standard normal using Abramowitz & Stegun */
function approxPercentile(z: number): number {
  if (z < -6) return 0;
  if (z > 6) return 100;

  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return parseFloat(((0.5 * (1.0 + sign * y)) * 100).toFixed(4));
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(6)).toLocaleString('en-US', { maximumFractionDigits: 6 });
}
