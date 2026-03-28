import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
  options?: Record<string, unknown>,
): CalculatorResult {
  const msg = (options?._messages as Record<string, string>) ?? {};
  const waist = Number(fields.waist); // cm
  const neck = Number(fields.neck); // cm
  const height = Number(fields.height); // cm
  const gender = String(fields.gender || 'male');
  const isMale = gender === 'male';

  if (!isFinite(waist) || waist <= 0 || !isFinite(neck) || neck <= 0 || !isFinite(height) || height <= 0) {
    return { output: '' };
  }

  let bodyFat: number;

  if (isMale) {
    if (waist <= neck) return { output: '' };
    bodyFat =
      495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
    const hip = Number(fields.hip);
    if (!isFinite(hip) || hip <= 0) return { output: '' };
    const circumference = waist + hip - neck;
    if (circumference <= 0) return { output: '' };
    bodyFat =
      495 / (1.29579 - 0.35004 * Math.log10(circumference) + 0.221 * Math.log10(height)) - 450;
  }

  if (!isFinite(bodyFat) || bodyFat < 0 || bodyFat > 70) return { output: '' };

  const category = getCategory(bodyFat, isMale, msg);
  const leanMass = fields.weight ? Number(fields.weight) * (1 - bodyFat / 100) : null;
  const fatMass = fields.weight ? Number(fields.weight) * (bodyFat / 100) : null;

  const table = [
    { label: 'Waist', value: `${fmt(waist)} cm` },
    { label: 'Neck', value: `${fmt(neck)} cm` },
    { label: 'Height', value: `${fmt(height)} cm` },
    ...(isMale ? [] : [{ label: 'Hip', value: `${fmt(Number(fields.hip))} cm` }]),
    { label: 'Body Fat', value: `${fmt(bodyFat)}%` },
    { label: 'Category', value: category },
  ];

  if (leanMass !== null && isFinite(leanMass)) {
    table.push({ label: 'Lean Mass', value: `${fmt(leanMass)} kg` });
    table.push({ label: 'Fat Mass', value: `${fmt(fatMass!)} kg` });
  }

  return {
    output: `${fmt(bodyFat)}%`,
    table,
    breakdown: [
      { label: 'Method', value: msg['U.S. Navy Method'] ?? 'U.S. Navy Method' },
      { label: 'Gender', value: isMale ? (msg['Male'] ?? 'Male') : (msg['Female'] ?? 'Female') },
      { label: 'Body Fat Percentage', value: `${fmt(bodyFat)}%`, highlight: true },
      { label: 'Category', value: category, highlight: true },
    ],
  };
}

function getCategory(bf: number, isMale: boolean, msg: Record<string, string>): string {
  const essential = msg['Essential Fat'] ?? 'Essential Fat';
  const athletes = msg['Athletes'] ?? 'Athletes';
  const fitness = msg['Fitness'] ?? 'Fitness';
  const average = msg['Average'] ?? 'Average';
  const obese = msg['Obese'] ?? 'Obese';
  if (isMale) {
    if (bf < 6) return essential;
    if (bf < 14) return athletes;
    if (bf < 18) return fitness;
    if (bf < 25) return average;
    return obese;
  }
  if (bf < 14) return essential;
  if (bf < 21) return athletes;
  if (bf < 25) return fitness;
  if (bf < 32) return average;
  return obese;
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(1)).toLocaleString('en-US', { maximumFractionDigits: 1 });
}
