import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const n = Math.floor(Number(fields.n));
  const r = Math.floor(Number(fields.r));
  const type = String(fields.type || 'permutation');

  if (!isFinite(n) || !isFinite(r) || n < 0 || r < 0 || r > n || n > 170) {
    return { output: '' };
  }

  const nPr = factorial(n) / factorial(n - r);
  const nCr = factorial(n) / (factorial(r) * factorial(n - r));

  const isPerm = type === 'permutation';
  const result = isPerm ? nPr : nCr;

  return {
    output: fmt(result),
    table: [
      { label: 'n', value: String(n) },
      { label: 'r', value: String(r) },
      { label: 'nPr (Permutations)', value: fmt(nPr) },
      { label: 'nCr (Combinations)', value: fmt(nCr) },
    ],
    breakdown: [
      { label: 'Type', value: isPerm ? 'Permutation (order matters)' : 'Combination (order irrelevant)' },
      {
        label: 'Formula',
        value: isPerm
          ? `P(${n},${r}) = ${n}! / (${n}-${r})!`
          : `C(${n},${r}) = ${n}! / (${r}! × (${n}-${r})!)`,
      },
      {
        label: 'Calculation',
        value: isPerm
          ? `${n}! / ${n - r}! = ${fmt(factorial(n))} / ${fmt(factorial(n - r))}`
          : `${n}! / (${r}! × ${n - r}!) = ${fmt(factorial(n))} / (${fmt(factorial(r))} × ${fmt(factorial(n - r))})`,
      },
      { label: 'Result', value: fmt(result), highlight: true },
    ],
  };
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  if (!isFinite(n)) return 'Overflow';
  return n.toExponential(6);
}
