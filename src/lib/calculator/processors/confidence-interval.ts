import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const mean = Number(fields.mean);
  const stdDev = Number(fields.stdDev);
  const sampleSize = Math.floor(Number(fields.sampleSize));
  const level = Number(fields.confidenceLevel || 95);

  if (!isFinite(mean) || !isFinite(stdDev) || stdDev < 0 || !isFinite(sampleSize) || sampleSize <= 0) {
    return { output: '' };
  }

  const zScores: Record<number, number> = {
    80: 1.282,
    85: 1.440,
    90: 1.645,
    95: 1.96,
    99: 2.576,
    99.5: 2.807,
    99.9: 3.291,
  };

  const z = zScores[level] ?? 1.96;
  const standardError = stdDev / Math.sqrt(sampleSize);
  const marginOfError = z * standardError;
  const lowerBound = mean - marginOfError;
  const upperBound = mean + marginOfError;

  return {
    output: `[${fmt(lowerBound)}, ${fmt(upperBound)}]`,
    table: [
      { label: 'Mean (x̄)', value: fmt(mean) },
      { label: 'Std Dev (σ)', value: fmt(stdDev) },
      { label: 'Sample Size (n)', value: fmt(sampleSize) },
      { label: 'Confidence Level', value: `${level}%` },
      { label: 'Z-Score', value: fmt(z) },
      { label: 'Standard Error', value: fmt(standardError) },
      { label: 'Margin of Error', value: `± ${fmt(marginOfError)}` },
      { label: 'Lower Bound', value: fmt(lowerBound) },
      { label: 'Upper Bound', value: fmt(upperBound) },
    ],
    breakdown: [
      { label: 'Formula', value: 'CI = x̄ ± z × (σ / √n)' },
      { label: 'Standard Error', value: `σ / √n = ${fmt(stdDev)} / √${sampleSize} = ${fmt(standardError)}` },
      { label: 'Margin of Error', value: `${fmt(z)} × ${fmt(standardError)} = ${fmt(marginOfError)}` },
      { label: 'Confidence Interval', value: `[${fmt(lowerBound)}, ${fmt(upperBound)}]`, highlight: true },
    ],
  };
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(6)).toLocaleString('en-US', { maximumFractionDigits: 6 });
}
