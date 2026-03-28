import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
  options?: Record<string, unknown>,
): CalculatorResult {
  const msg = (options?._messages as Record<string, string>) ?? {};
  const min = Math.floor(Number(fields.min ?? 1));
  const max = Math.floor(Number(fields.max ?? 100));
  const count = Math.max(1, Math.min(1000, Math.floor(Number(fields.count) || 1)));
  const allowDuplicates = fields.allowDuplicates !== false && fields.allowDuplicates !== 'false';

  if (!isFinite(min) || !isFinite(max)) return { output: '' };
  if (min > max) return { output: msg.minMaxError ?? 'Min must be less than or equal to Max' };

  const range = max - min + 1;
  if (!allowDuplicates && count > range) {
    return { output: `Cannot generate ${count} unique numbers from range ${min}–${max} (only ${range} possible values)` };
  }

  const numbers: number[] = [];

  if (allowDuplicates) {
    for (let i = 0; i < count; i++) {
      numbers.push(randomInt(min, max));
    }
  } else {
    // Fisher-Yates for small ranges, set-based for large ranges
    if (range <= 10000) {
      const pool = Array.from({ length: range }, (_, i) => min + i);
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      numbers.push(...pool.slice(0, count));
    } else {
      const used = new Set<number>();
      while (numbers.length < count) {
        const n = randomInt(min, max);
        if (!used.has(n)) {
          used.add(n);
          numbers.push(n);
        }
      }
    }
  }

  const output = numbers.join(', ');

  if (count === 1) {
    return {
      output: numbers[0].toString(),
      breakdown: [
        { label: 'Range', value: `${min} – ${max}` },
        { label: 'Result', value: numbers[0].toString(), highlight: true },
      ],
    };
  }

  const sorted = [...numbers].sort((a, b) => a - b);
  const sum = numbers.reduce((a, b) => a + b, 0);
  const mean = sum / numbers.length;

  const table = numbers.map((n, i) => ({
    label: `#${i + 1}`,
    value: n.toLocaleString('en-US'),
  }));

  return {
    output,
    breakdown: [
      { label: 'Range', value: `${min} – ${max}` },
      { label: 'Count', value: count.toString() },
      { label: 'Duplicates', value: allowDuplicates ? (msg['Allowed'] ?? 'Allowed') : (msg['Not allowed'] ?? 'Not allowed') },
      { label: 'Min Generated', value: sorted[0].toLocaleString('en-US') },
      { label: 'Max Generated', value: sorted[sorted.length - 1].toLocaleString('en-US') },
      { label: 'Sum', value: sum.toLocaleString('en-US') },
      { label: 'Mean', value: mean.toFixed(2) },
    ],
    table,
  };
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
