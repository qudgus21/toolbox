import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const n = Math.floor(Number(fields.number));

  if (!isFinite(n) || n < 2 || n > 1e12) return { output: '' };

  const prime = isPrime(n);
  const factors = primeFactors(n);
  const next = nextPrime(n);
  const prev = prevPrime(n);

  return {
    output: prime ? `${fmt(n)} is prime` : `${fmt(n)} is not prime`,
    table: [
      { label: 'Number', value: fmt(n) },
      { label: 'Is Prime', value: prime },
      { label: 'Prime Factors', value: factors.join(' × ') || 'N/A' },
      { label: 'Unique Factors', value: Array.from(new Set(factors)).join(', ') || 'N/A' },
      { label: 'Previous Prime', value: prev > 0 ? fmt(prev) : 'N/A' },
      { label: 'Next Prime', value: fmt(next) },
      { label: 'Number of Divisors', value: fmt(countDivisors(n)) },
    ],
    breakdown: [
      { label: 'Input', value: fmt(n) },
      { label: 'Primality', value: prime ? 'Prime' : 'Composite', highlight: true },
      ...(factors.length > 1
        ? [{ label: 'Factorization', value: `${fmt(n)} = ${factors.join(' × ')}` }]
        : []),
    ],
    stats: {
      isPrime: prime,
      factorCount: factors.length,
    },
  };
}

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

function primeFactors(n: number): number[] {
  if (n < 2) return [];
  if (isPrime(n)) return [n];
  const factors: number[] = [];
  let val = n;
  while (val % 2 === 0) { factors.push(2); val /= 2; }
  for (let i = 3; i * i <= val; i += 2) {
    while (val % i === 0) { factors.push(i); val /= i; }
  }
  if (val > 1) factors.push(val);
  return factors;
}

function nextPrime(n: number): number {
  let candidate = n + 1;
  while (!isPrime(candidate)) candidate++;
  return candidate;
}

function prevPrime(n: number): number {
  let candidate = n - 1;
  while (candidate >= 2 && !isPrime(candidate)) candidate--;
  return candidate >= 2 ? candidate : -1;
}

function countDivisors(n: number): number {
  let count = 0;
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      count++;
      if (i !== n / i) count++;
    }
  }
  return count;
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(6)).toLocaleString('en-US', { maximumFractionDigits: 6 });
}
