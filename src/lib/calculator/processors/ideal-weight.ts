import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const heightCm = Number(fields.height);
  const gender = String(fields.gender || 'male');

  if (!isFinite(heightCm) || heightCm <= 0) return { output: '' };

  const isMale = gender === 'male';
  const inches = heightCm / 2.54;

  if (inches <= 60) return { output: '' }; // Formulas use inches over 5 feet

  const over60 = inches - 60;

  // Devine
  const devine = isMale ? 50 + 2.3 * over60 : 45.5 + 2.3 * over60;

  // Robinson
  const robinson = isMale ? 52 + 1.9 * over60 : 49 + 1.7 * over60;

  // Miller
  const miller = isMale ? 56.2 + 1.41 * over60 : 53.1 + 1.36 * over60;

  // Hamwi
  const hamwi = isMale ? 48 + 2.7 * over60 : 45.5 + 2.2 * over60;

  const average = (devine + robinson + miller + hamwi) / 4;

  return {
    output: `${fmt(average)} kg (average)`,
    table: [
      { label: 'Height', value: `${fmt(heightCm)} cm (${fmt(inches)} in)` },
      { label: 'Gender', value: isMale ? 'Male' : 'Female' },
      { label: 'Devine Formula', value: `${fmt(devine)} kg`, unit: `${fmt(devine * 2.205)} lbs` },
      { label: 'Robinson Formula', value: `${fmt(robinson)} kg`, unit: `${fmt(robinson * 2.205)} lbs` },
      { label: 'Miller Formula', value: `${fmt(miller)} kg`, unit: `${fmt(miller * 2.205)} lbs` },
      { label: 'Hamwi Formula', value: `${fmt(hamwi)} kg`, unit: `${fmt(hamwi * 2.205)} lbs` },
      { label: 'Average', value: `${fmt(average)} kg`, unit: `${fmt(average * 2.205)} lbs` },
    ],
    breakdown: [
      { label: 'Height', value: `${fmt(heightCm)} cm = ${fmt(inches)} inches` },
      {
        label: 'Devine',
        value: isMale
          ? `50 + 2.3 × (${fmt(inches)} - 60) = ${fmt(devine)} kg`
          : `45.5 + 2.3 × (${fmt(inches)} - 60) = ${fmt(devine)} kg`,
      },
      {
        label: 'Robinson',
        value: isMale
          ? `52 + 1.9 × (${fmt(inches)} - 60) = ${fmt(robinson)} kg`
          : `49 + 1.7 × (${fmt(inches)} - 60) = ${fmt(robinson)} kg`,
      },
      {
        label: 'Miller',
        value: isMale
          ? `56.2 + 1.41 × (${fmt(inches)} - 60) = ${fmt(miller)} kg`
          : `53.1 + 1.36 × (${fmt(inches)} - 60) = ${fmt(miller)} kg`,
      },
      { label: 'Average', value: `${fmt(average)} kg`, highlight: true },
    ],
  };
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(1)).toLocaleString('en-US', { maximumFractionDigits: 1 });
}
