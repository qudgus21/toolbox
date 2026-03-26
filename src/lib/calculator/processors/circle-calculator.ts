import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const value = Number(fields.value);
  const property = String(fields.property || 'radius');

  if (!isFinite(value) || value <= 0) return { output: '' };

  let radius: number;

  switch (property) {
    case 'radius':
      radius = value;
      break;
    case 'diameter':
      radius = value / 2;
      break;
    case 'circumference':
      radius = value / (2 * Math.PI);
      break;
    case 'area':
      radius = Math.sqrt(value / Math.PI);
      break;
    default:
      return { output: '' };
  }

  const diameter = radius * 2;
  const circumference = 2 * Math.PI * radius;
  const area = Math.PI * radius * radius;

  return {
    output: `Radius: ${fmt(radius)}`,
    table: [
      { label: 'Radius', value: fmt(radius) },
      { label: 'Diameter', value: fmt(diameter) },
      { label: 'Circumference', value: fmt(circumference) },
      { label: 'Area', value: fmt(area) },
    ],
    breakdown: [
      { label: 'Given', value: `${property} = ${fmt(value)}` },
      { label: 'Radius', value: fmt(radius), highlight: true },
      { label: 'Diameter', value: `2r = ${fmt(diameter)}` },
      { label: 'Circumference', value: `2πr = ${fmt(circumference)}` },
      { label: 'Area', value: `πr² = ${fmt(area)}`, highlight: true },
    ],
  };
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(6)).toLocaleString('en-US', { maximumFractionDigits: 6 });
}
