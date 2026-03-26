import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const calories = Number(fields.calories);
  const diet = String(fields.diet || 'balanced');

  if (!isFinite(calories) || calories <= 0) return { output: '' };

  const ratios: Record<string, { carb: number; protein: number; fat: number; label: string }> = {
    balanced: { carb: 40, protein: 30, fat: 30, label: 'Balanced (40/30/30)' },
    'low-carb': { carb: 25, protein: 40, fat: 35, label: 'Low-Carb (25/40/35)' },
    'high-protein': { carb: 30, protein: 40, fat: 30, label: 'High-Protein (30/40/30)' },
    keto: { carb: 5, protein: 25, fat: 70, label: 'Keto (5/25/70)' },
  };

  const r = ratios[diet] || ratios.balanced;

  const carbCal = calories * (r.carb / 100);
  const proteinCal = calories * (r.protein / 100);
  const fatCal = calories * (r.fat / 100);

  const carbGrams = carbCal / 4;
  const proteinGrams = proteinCal / 4;
  const fatGrams = fatCal / 9;

  return {
    output: `C: ${fmt(carbGrams)}g / P: ${fmt(proteinGrams)}g / F: ${fmt(fatGrams)}g`,
    table: [
      { label: 'Total Calories', value: `${fmt(calories)}`, unit: 'kcal' },
      { label: 'Diet Type', value: r.label },
      { label: 'Carbohydrates', value: `${fmt(carbGrams)}g (${r.carb}%)`, unit: `${fmt(carbCal)} kcal` },
      { label: 'Protein', value: `${fmt(proteinGrams)}g (${r.protein}%)`, unit: `${fmt(proteinCal)} kcal` },
      { label: 'Fat', value: `${fmt(fatGrams)}g (${r.fat}%)`, unit: `${fmt(fatCal)} kcal` },
    ],
    breakdown: [
      { label: 'Diet', value: r.label },
      { label: 'Carbs', value: `${r.carb}% of ${fmt(calories)} = ${fmt(carbCal)} kcal ÷ 4 = ${fmt(carbGrams)}g`, highlight: true },
      { label: 'Protein', value: `${r.protein}% of ${fmt(calories)} = ${fmt(proteinCal)} kcal ÷ 4 = ${fmt(proteinGrams)}g`, highlight: true },
      { label: 'Fat', value: `${r.fat}% of ${fmt(calories)} = ${fmt(fatCal)} kcal ÷ 9 = ${fmt(fatGrams)}g`, highlight: true },
    ],
  };
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString('en-US');
}
