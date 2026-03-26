import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const a = fields.sideA !== undefined && fields.sideA !== '' ? Number(fields.sideA) : NaN;
  const b = fields.sideB !== undefined && fields.sideB !== '' ? Number(fields.sideB) : NaN;
  const c = fields.hypotenuse !== undefined && fields.hypotenuse !== '' ? Number(fields.hypotenuse) : NaN;

  const given = [!isNaN(a), !isNaN(b), !isNaN(c)].filter(Boolean).length;
  if (given < 2) return { output: '' };

  let sideA: number;
  let sideB: number;
  let hypotenuse: number;

  if (!isNaN(a) && !isNaN(b)) {
    if (a <= 0 || b <= 0) return { output: '' };
    sideA = a;
    sideB = b;
    hypotenuse = Math.sqrt(a * a + b * b);
  } else if (!isNaN(a) && !isNaN(c)) {
    if (a <= 0 || c <= 0 || c <= a) return { output: '' };
    sideA = a;
    hypotenuse = c;
    sideB = Math.sqrt(c * c - a * a);
  } else if (!isNaN(b) && !isNaN(c)) {
    if (b <= 0 || c <= 0 || c <= b) return { output: '' };
    sideB = b;
    hypotenuse = c;
    sideA = Math.sqrt(c * c - b * b);
  } else {
    return { output: '' };
  }

  const angleA = Math.asin(sideA / hypotenuse) * (180 / Math.PI);
  const angleB = Math.asin(sideB / hypotenuse) * (180 / Math.PI);
  const area = (sideA * sideB) / 2;
  const perimeter = sideA + sideB + hypotenuse;

  return {
    output: `Hypotenuse: ${fmt(hypotenuse)}`,
    table: [
      { label: 'Side a', value: fmt(sideA) },
      { label: 'Side b', value: fmt(sideB) },
      { label: 'Hypotenuse (c)', value: fmt(hypotenuse) },
      { label: 'Angle A', value: `${fmt(angleA)}°` },
      { label: 'Angle B', value: `${fmt(angleB)}°` },
      { label: 'Angle C', value: '90°' },
      { label: 'Area', value: fmt(area), unit: 'sq units' },
      { label: 'Perimeter', value: fmt(perimeter), unit: 'units' },
    ],
    breakdown: [
      { label: 'Pythagorean Theorem', value: 'a² + b² = c²' },
      { label: 'Verification', value: `${fmt(sideA)}² + ${fmt(sideB)}² = ${fmt(sideA ** 2 + sideB ** 2)} ≈ ${fmt(hypotenuse)}² = ${fmt(hypotenuse ** 2)}` },
      { label: 'Area', value: `½ × ${fmt(sideA)} × ${fmt(sideB)} = ${fmt(area)}`, highlight: true },
    ],
  };
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(6)).toLocaleString('en-US', { maximumFractionDigits: 6 });
}
