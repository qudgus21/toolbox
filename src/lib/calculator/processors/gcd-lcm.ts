import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
  options?: Record<string, unknown>,
): CalculatorResult {
  const msg = (options?._messages as Record<string, string>) ?? {};
  const a = Math.abs(Math.floor(Number(fields.numberA)));
  const b = Math.abs(Math.floor(Number(fields.numberB)));

  if (!isFinite(a) || !isFinite(b) || (a === 0 && b === 0)) return { output: '' };

  const gcdVal = gcd(a, b);
  const lcmVal = a === 0 || b === 0 ? 0 : (a / gcdVal) * b;

  const steps: string[] = [];
  let x = a;
  let y = b;
  while (y !== 0) {
    steps.push(`gcd(${fmt(x)}, ${fmt(y)}) → ${fmt(x)} mod ${fmt(y)} = ${fmt(x % y)}`);
    const temp = y;
    y = x % y;
    x = temp;
  }

  return {
    output: `GCD: ${fmt(gcdVal)}, LCM: ${fmt(lcmVal)}`,
    table: [
      { label: 'Number A', value: fmt(a) },
      { label: 'Number B', value: fmt(b) },
      { label: 'GCD', value: fmt(gcdVal) },
      { label: 'LCM', value: fmt(lcmVal) },
    ],
    breakdown: [
      { label: 'Method', value: msg['Euclidean Algorithm'] ?? 'Euclidean Algorithm' },
      ...steps.map((s, i) => ({ label: `Step ${i + 1}`, value: s })),
      { label: 'GCD', value: fmt(gcdVal), highlight: true },
      { label: 'LCM = a × b / GCD', value: `${fmt(a)} × ${fmt(b)} / ${fmt(gcdVal)} = ${fmt(lcmVal)}`, highlight: true },
    ],
  };
}

function gcd(a: number, b: number): number {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(6)).toLocaleString('en-US', { maximumFractionDigits: 6 });
}
