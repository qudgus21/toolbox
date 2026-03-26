import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const mode = String(fields.mode || 'whatIsXPercentOfY');

  if (mode === 'whatIsXPercentOfY') {
    const percentage = Number(fields.percentage);
    const value = Number(fields.value);
    if (!isFinite(percentage) || !isFinite(value)) return { output: '' };

    const result = (percentage / 100) * value;
    return {
      output: fmt(result),
      breakdown: [
        { label: 'Formula', value: `${fmt(percentage)}% of ${fmt(value)}` },
        { label: 'Calculation', value: `${fmt(percentage)} / 100 \u00d7 ${fmt(value)}` },
        { label: 'Result', value: fmt(result), highlight: true },
      ],
    };
  }

  if (mode === 'xIsWhatPercentOfY') {
    const x = Number(fields.value);
    const y = Number(fields.percentage);
    if (!isFinite(x) || !isFinite(y) || y === 0) return { output: '' };

    const result = (x / y) * 100;
    return {
      output: `${fmt(result)}%`,
      breakdown: [
        { label: 'Formula', value: `(${fmt(x)} / ${fmt(y)}) \u00d7 100` },
        { label: 'Result', value: `${fmt(result)}%`, highlight: true },
      ],
    };
  }

  if (mode === 'percentChange') {
    const oldValue = Number(fields.oldValue);
    const newValue = Number(fields.newValue);
    if (!isFinite(oldValue) || !isFinite(newValue) || oldValue === 0) return { output: '' };

    const change = ((newValue - oldValue) / Math.abs(oldValue)) * 100;
    const direction = change >= 0 ? 'increase' : 'decrease';
    return {
      output: `${fmt(Math.abs(change))}% ${direction}`,
      breakdown: [
        { label: 'Old Value', value: fmt(oldValue) },
        { label: 'New Value', value: fmt(newValue) },
        { label: 'Difference', value: fmt(newValue - oldValue) },
        { label: 'Formula', value: `((${fmt(newValue)} - ${fmt(oldValue)}) / |${fmt(oldValue)}|) \u00d7 100` },
        { label: 'Percent Change', value: `${fmt(Math.abs(change))}% ${direction}`, highlight: true },
      ],
    };
  }

  return { output: '' };
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(6)).toLocaleString('en-US', { maximumFractionDigits: 6 });
}
