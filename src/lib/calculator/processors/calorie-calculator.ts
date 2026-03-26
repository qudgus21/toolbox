import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const weight = Number(fields.weight);
  const height = Number(fields.height);
  const age = Number(fields.age);
  const gender = String(fields.gender || 'male');
  const activityLevel = String(fields.activityLevel || 'moderate');
  const goal = String(fields.goal || 'maintain');

  if (!isFinite(weight) || weight <= 0 || !isFinite(height) || height <= 0 || !isFinite(age) || age <= 0) {
    return { output: '' };
  }

  const isMale = gender === 'male';

  // Mifflin-St Jeor
  const bmr = isMale
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  const activityFactors: Record<string, { factor: number; label: string }> = {
    sedentary: { factor: 1.2, label: 'Sedentary (little/no exercise)' },
    light: { factor: 1.375, label: 'Lightly active (1-3 days/week)' },
    moderate: { factor: 1.55, label: 'Moderately active (3-5 days/week)' },
    active: { factor: 1.725, label: 'Very active (6-7 days/week)' },
    'very-active': { factor: 1.9, label: 'Extra active (2x/day)' },
  };

  const activity = activityFactors[activityLevel] || activityFactors.moderate;
  const tdee = bmr * activity.factor;

  const goalAdjustments: Record<string, { adjust: number; label: string }> = {
    lose: { adjust: -500, label: 'Lose weight (-500 kcal)' },
    'lose-fast': { adjust: -1000, label: 'Lose fast (-1000 kcal)' },
    maintain: { adjust: 0, label: 'Maintain weight' },
    gain: { adjust: 500, label: 'Gain weight (+500 kcal)' },
  };

  const goalInfo = goalAdjustments[goal] || goalAdjustments.maintain;
  const dailyCalories = Math.max(tdee + goalInfo.adjust, 1200);

  return {
    output: `${fmt(dailyCalories)} kcal/day`,
    table: [
      { label: 'BMR (Mifflin-St Jeor)', value: `${fmt(bmr)}`, unit: 'kcal' },
      { label: 'Activity Level', value: activity.label },
      { label: 'TDEE', value: `${fmt(tdee)}`, unit: 'kcal' },
      { label: 'Goal', value: goalInfo.label },
      { label: 'Daily Calories', value: `${fmt(dailyCalories)}`, unit: 'kcal' },
      { label: 'Weekly Calories', value: `${fmt(dailyCalories * 7)}`, unit: 'kcal' },
    ],
    breakdown: [
      { label: 'BMR', value: `${fmt(bmr)} kcal/day` },
      { label: 'Activity Factor', value: `× ${activity.factor}` },
      { label: 'TDEE', value: `${fmt(tdee)} kcal/day`, highlight: true },
      { label: 'Goal Adjustment', value: `${goalInfo.adjust >= 0 ? '+' : ''}${goalInfo.adjust} kcal` },
      { label: 'Target Calories', value: `${fmt(dailyCalories)} kcal/day`, highlight: true },
    ],
  };
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString('en-US');
}
