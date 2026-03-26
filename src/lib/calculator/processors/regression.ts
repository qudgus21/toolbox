import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const dataset = String(fields.dataset || '');
  if (!dataset.trim()) return { output: '' };

  const points = parsePoints(dataset);
  if (points.length < 2) return { output: '' };

  const n = points.length;
  const sumX = points.reduce((s, p) => s + p.x, 0);
  const sumY = points.reduce((s, p) => s + p.y, 0);
  const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
  const sumX2 = points.reduce((s, p) => s + p.x * p.x, 0);
  const sumY2 = points.reduce((s, p) => s + p.y * p.y, 0);

  const meanX = sumX / n;
  const meanY = sumY / n;

  const denom = n * sumX2 - sumX * sumX;
  if (denom === 0) return { output: '' };

  const slope = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;

  // R²
  const ssRes = points.reduce((s, p) => s + (p.y - (slope * p.x + intercept)) ** 2, 0);
  const ssTot = points.reduce((s, p) => s + (p.y - meanY) ** 2, 0);
  const rSquared = ssTot === 0 ? 1 : 1 - ssRes / ssTot;

  // Correlation coefficient r
  const numerator = n * sumXY - sumX * sumY;
  const denomCorr = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2));
  const r = denomCorr === 0 ? 0 : numerator / denomCorr;

  const sign = intercept >= 0 ? '+' : '-';
  const equation = `y = ${fmt(slope)}x ${sign} ${fmt(Math.abs(intercept))}`;

  return {
    output: equation,
    table: [
      { label: 'Data Points', value: String(n) },
      { label: 'Slope (m)', value: fmt(slope) },
      { label: 'Intercept (b)', value: fmt(intercept) },
      { label: 'R² (Coefficient of Determination)', value: fmt(rSquared) },
      { label: 'r (Correlation Coefficient)', value: fmt(r) },
      { label: 'Mean X', value: fmt(meanX) },
      { label: 'Mean Y', value: fmt(meanY) },
    ],
    breakdown: [
      { label: 'Equation', value: equation, highlight: true },
      { label: 'Slope', value: `m = (nΣxy - ΣxΣy) / (nΣx² - (Σx)²) = ${fmt(slope)}` },
      { label: 'Intercept', value: `b = (Σy - mΣx) / n = ${fmt(intercept)}` },
      { label: 'R²', value: fmt(rSquared), highlight: true },
      {
        label: 'Correlation',
        value: `${fmt(r)} — ${Math.abs(r) >= 0.8 ? 'Strong' : Math.abs(r) >= 0.5 ? 'Moderate' : 'Weak'} ${r >= 0 ? 'positive' : 'negative'}`,
      },
    ],
  };
}

function parsePoints(input: string): { x: number; y: number }[] {
  return input
    .trim()
    .split(/\n/)
    .map(line => {
      const parts = line.trim().split(/[\s,;]+/).map(Number);
      if (parts.length >= 2 && isFinite(parts[0]) && isFinite(parts[1])) {
        return { x: parts[0], y: parts[1] };
      }
      return null;
    })
    .filter((p): p is { x: number; y: number } => p !== null);
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(6)).toLocaleString('en-US', { maximumFractionDigits: 6 });
}
