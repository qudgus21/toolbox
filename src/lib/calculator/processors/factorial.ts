import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const n = Math.floor(Number(fields.number));

  if (!isFinite(n) || n < 0 || n > 170) return { output: '' };

  const factVal = factorial(n);
  const doubleFactVal = doubleFactorial(n);

  const breakdownParts: string[] = [];
  if (n <= 20) {
    const parts: number[] = [];
    for (let i = n; i >= 1; i--) parts.push(i);
    breakdownParts.push(parts.length > 0 ? parts.join(' × ') : '1');
  }

  return {
    output: fmt(factVal),
    table: [
      { label: 'n', value: String(n) },
      { label: 'n!', value: fmt(factVal) },
      { label: 'n!!', value: fmt(doubleFactVal) },
      { label: 'Digits in n!', value: fmt(Math.floor(Math.log10(factVal || 1)) + 1) },
    ],
    breakdown: [
      { label: 'Formula', value: `${n}!` },
      ...(breakdownParts.length > 0
        ? [{ label: 'Expansion', value: `${n}! = ${breakdownParts[0]}` }]
        : []),
      { label: `${n}!`, value: fmt(factVal), highlight: true },
      { label: 'Double Factorial', value: `${n}!! = ${fmt(doubleFactVal)}` },
    ],
  };
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function doubleFactorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = n; i > 1; i -= 2) result *= i;
  return result;
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  if (!isFinite(n)) return 'Infinity';
  return n.toExponential(6);
}
