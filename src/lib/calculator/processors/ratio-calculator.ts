import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const a = fields.a !== undefined && fields.a !== '' ? Number(fields.a) : NaN;
  const b = fields.b !== undefined && fields.b !== '' ? Number(fields.b) : NaN;
  const c = fields.c !== undefined && fields.c !== '' ? Number(fields.c) : NaN;
  const d = fields.d !== undefined && fields.d !== '' ? Number(fields.d) : NaN;

  const missing = [isNaN(a), isNaN(b), isNaN(c), isNaN(d)];
  const missingCount = missing.filter(Boolean).length;

  if (missingCount !== 1) return { output: '' };

  let result: number;
  let label: string;

  if (missing[0]) {
    // a = b * c / d
    if (d === 0) return { output: '' };
    result = (b * c) / d;
    label = 'a';
  } else if (missing[1]) {
    // b = a * d / c
    if (c === 0) return { output: '' };
    result = (a * d) / c;
    label = 'b';
  } else if (missing[2]) {
    // c = a * d / b
    if (b === 0) return { output: '' };
    result = (a * d) / b;
    label = 'c';
  } else {
    // d = b * c / a
    if (a === 0) return { output: '' };
    result = (b * c) / a;
    label = 'd';
  }

  const fa = label === 'a' ? fmt(result) : fmt(a);
  const fb = label === 'b' ? fmt(result) : fmt(b);
  const fc = label === 'c' ? fmt(result) : fmt(c);
  const fd = label === 'd' ? fmt(result) : fmt(d);

  return {
    output: fmt(result),
    breakdown: [
      { label: 'Proportion', value: `${fa} : ${fb} = ${fc} : ${fd}` },
      { label: 'Cross Multiply', value: 'a × d = b × c' },
      { label: `Missing value (${label})`, value: fmt(result), highlight: true },
    ],
    table: [
      { label: 'a', value: fa },
      { label: 'b', value: fb },
      { label: 'c', value: fc },
      { label: 'd', value: fd },
      { label: 'Ratio (a:b)', value: `${fa} : ${fb}` },
      { label: 'Ratio (c:d)', value: `${fc} : ${fd}` },
    ],
  };
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(6)).toLocaleString('en-US', { maximumFractionDigits: 6 });
}
