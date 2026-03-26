import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const angle = Number(fields.angle);
  const unit = String(fields.unit || 'degrees');
  const fn = String(fields.function || 'sin');

  if (!isFinite(angle)) return { output: '' };

  const rad = unit === 'degrees' ? (angle * Math.PI) / 180 : angle;
  const deg = unit === 'degrees' ? angle : (angle * 180) / Math.PI;

  const isInverse = fn.startsWith('a');
  let result: number;

  switch (fn) {
    case 'sin': result = Math.sin(rad); break;
    case 'cos': result = Math.cos(rad); break;
    case 'tan': result = Math.tan(rad); break;
    case 'asin':
      if (angle < -1 || angle > 1) return { output: '' };
      result = Math.asin(angle);
      break;
    case 'acos':
      if (angle < -1 || angle > 1) return { output: '' };
      result = Math.acos(angle);
      break;
    case 'atan':
      result = Math.atan(angle);
      break;
    default: return { output: '' };
  }

  const sinVal = Math.sin(rad);
  const cosVal = Math.cos(rad);
  const tanVal = Math.tan(rad);
  const cscVal = sinVal !== 0 ? 1 / sinVal : Infinity;
  const secVal = cosVal !== 0 ? 1 / cosVal : Infinity;
  const cotVal = tanVal !== 0 ? 1 / tanVal : Infinity;

  const outputStr = isInverse
    ? `${fmt(result)} rad (${fmt((result * 180) / Math.PI)}°)`
    : fmt(result);

  const table = isInverse
    ? [
        { label: 'Input Value', value: fmt(angle) },
        { label: 'Result (radians)', value: fmt(result) },
        { label: 'Result (degrees)', value: `${fmt((result * 180) / Math.PI)}°` },
      ]
    : [
        { label: 'Angle', value: `${fmt(deg)}° (${fmt(rad)} rad)` },
        { label: 'sin', value: fmt(sinVal) },
        { label: 'cos', value: fmt(cosVal) },
        { label: 'tan', value: isFinite(tanVal) ? fmt(tanVal) : 'undefined' },
        { label: 'csc', value: isFinite(cscVal) ? fmt(cscVal) : 'undefined' },
        { label: 'sec', value: isFinite(secVal) ? fmt(secVal) : 'undefined' },
        { label: 'cot', value: isFinite(cotVal) ? fmt(cotVal) : 'undefined' },
      ];

  return {
    output: outputStr,
    table,
    breakdown: [
      { label: 'Function', value: fn },
      { label: 'Input', value: isInverse ? fmt(angle) : `${fmt(angle)} ${unit}` },
      { label: 'Result', value: outputStr, highlight: true },
    ],
  };
}

function fmt(n: number): string {
  if (Math.abs(n) < 1e-12) return '0';
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(8)).toLocaleString('en-US', { maximumFractionDigits: 8 });
}
