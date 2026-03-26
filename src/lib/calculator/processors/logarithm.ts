import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const value = Number(fields.value);
  const base = fields.base !== undefined && fields.base !== '' ? Number(fields.base) : 10;

  if (!isFinite(value) || value <= 0 || !isFinite(base) || base <= 0 || base === 1) {
    return { output: '' };
  }

  const logCustom = Math.log(value) / Math.log(base);
  const log10 = Math.log10(value);
  const ln = Math.log(value);
  const log2 = Math.log2(value);

  return {
    output: fmt(logCustom),
    table: [
      { label: `log${base === 10 ? '' : `_${fmt(base)}`}(${fmt(value)})`, value: fmt(logCustom) },
      { label: `log₁₀(${fmt(value)})`, value: fmt(log10) },
      { label: `ln(${fmt(value)})`, value: fmt(ln) },
      { label: `log₂(${fmt(value)})`, value: fmt(log2) },
    ],
    breakdown: [
      { label: 'Value', value: fmt(value) },
      { label: 'Base', value: fmt(base) },
      { label: 'Formula', value: `log_${fmt(base)}(${fmt(value)}) = ln(${fmt(value)}) / ln(${fmt(base)})` },
      { label: 'Result', value: fmt(logCustom), highlight: true },
      { label: 'Verification', value: `${fmt(base)}^${fmt(logCustom)} ≈ ${fmt(Math.pow(base, logCustom))}` },
    ],
  };
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(8)).toLocaleString('en-US', { maximumFractionDigits: 8 });
}
