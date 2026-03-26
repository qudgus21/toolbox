import type { CalculatorResult } from '../types';

const ACTIVITY_FACTORS: Record<string, { label: string; factor: number }> = {
  sedentary:    { label: 'Sedentary (little/no exercise)', factor: 1.2 },
  light:        { label: 'Light (1-3 days/week)', factor: 1.375 },
  moderate:     { label: 'Moderate (3-5 days/week)', factor: 1.55 },
  active:       { label: 'Active (6-7 days/week)', factor: 1.725 },
  'very-active': { label: 'Very Active (2x/day)', factor: 1.9 },
};

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const weight = Number(fields.weight);   // kg
  const height = Number(fields.height);   // cm
  const age = Number(fields.age);
  const gender = String(fields.gender || 'male');
  const activityLevel = String(fields.activityLevel || 'moderate');

  if (!isFinite(weight) || !isFinite(height) || !isFinite(age) || weight <= 0 || height <= 0 || age <= 0) {
    return { output: '' };
  }

  // Mifflin-St Jeor Equation
  let bmr: number;
  if (gender === 'female') {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  }

  const activity = ACTIVITY_FACTORS[activityLevel] || ACTIVITY_FACTORS.moderate;
  const tdee = bmr * activity.factor;

  const breakdown = [
    { label: 'Gender', value: gender === 'female' ? 'Female' : 'Male' },
    { label: 'Weight', value: `${weight} kg` },
    { label: 'Height', value: `${height} cm` },
    { label: 'Age', value: `${age} years` },
    { label: 'BMR (Mifflin-St Jeor)', value: `${Math.round(bmr)} kcal/day` },
    { label: 'Activity Level', value: activity.label },
    { label: 'TDEE', value: `${Math.round(tdee)} kcal/day`, highlight: true },
  ];

  // Show all activity level estimates
  const table = Object.entries(ACTIVITY_FACTORS).map(([key, { label, factor }]) => ({
    label,
    value: `${Math.round(bmr * factor)} kcal/day`,
    unit: key === activityLevel ? '\u2190 selected' : undefined,
  }));

  return {
    output: `${Math.round(tdee)} kcal/day`,
    breakdown,
    table,
    stats: {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
    },
  };
}
