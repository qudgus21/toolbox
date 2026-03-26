import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const weight = Number(fields.weight); // kg
  const height = Number(fields.height); // cm
  const age = Number(fields.age);
  const gender = String(fields.gender || 'male');
  const formula = String(fields.formula || 'both');

  if (!isFinite(weight) || weight <= 0 || !isFinite(height) || height <= 0 || !isFinite(age) || age <= 0) {
    return { output: '' };
  }

  const isMale = gender === 'male';

  // Harris-Benedict
  const hbBmr = isMale
    ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
    : 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;

  // Mifflin-St Jeor
  const msBmr = isMale
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  const primary = formula === 'harris-benedict' ? hbBmr : msBmr;

  return {
    output: `${fmt(primary)} kcal/day`,
    table: [
      { label: 'Weight', value: `${fmt(weight)} kg` },
      { label: 'Height', value: `${fmt(height)} cm` },
      { label: 'Age', value: `${fmt(age)} years` },
      { label: 'Gender', value: isMale ? 'Male' : 'Female' },
      { label: 'Harris-Benedict BMR', value: `${fmt(hbBmr)} kcal/day` },
      { label: 'Mifflin-St Jeor BMR', value: `${fmt(msBmr)} kcal/day` },
    ],
    breakdown: [
      {
        label: 'Harris-Benedict',
        value: isMale
          ? `88.362 + (13.397 × ${fmt(weight)}) + (4.799 × ${fmt(height)}) - (5.677 × ${fmt(age)})`
          : `447.593 + (9.247 × ${fmt(weight)}) + (3.098 × ${fmt(height)}) - (4.330 × ${fmt(age)})`,
      },
      { label: 'Harris-Benedict Result', value: `${fmt(hbBmr)} kcal/day`, highlight: true },
      {
        label: 'Mifflin-St Jeor',
        value: `(10 × ${fmt(weight)}) + (6.25 × ${fmt(height)}) - (5 × ${fmt(age)}) ${isMale ? '+ 5' : '- 161'}`,
      },
      { label: 'Mifflin-St Jeor Result', value: `${fmt(msBmr)} kcal/day`, highlight: true },
    ],
  };
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(1)).toLocaleString('en-US', { maximumFractionDigits: 1 });
}
