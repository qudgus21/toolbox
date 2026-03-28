import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
  options?: Record<string, unknown>,
): CalculatorResult {
  const msg = (options?._messages as Record<string, string>) ?? {};
  const unit = String(fields.unit || 'metric');
  let weightKg: number;
  let heightM: number;

  if (unit === 'imperial') {
    const weightLb = Number(fields.weight);
    const heightIn = Number(fields.height);
    if (!isFinite(weightLb) || !isFinite(heightIn) || weightLb <= 0 || heightIn <= 0) {
      return { output: '' };
    }
    weightKg = weightLb * 0.453592;
    heightM = heightIn * 0.0254;
  } else {
    weightKg = Number(fields.weight);
    const heightCm = Number(fields.height);
    if (!isFinite(weightKg) || !isFinite(heightCm) || weightKg <= 0 || heightCm <= 0) {
      return { output: '' };
    }
    heightM = heightCm / 100;
  }

  const bmi = weightKg / (heightM * heightM);
  const category = getCategory(bmi, msg);

  // Healthy weight range (BMI 18.5–24.9)
  const healthyMin = 18.5 * heightM * heightM;
  const healthyMax = 24.9 * heightM * heightM;

  const breakdown = [
    { label: 'BMI', value: bmi.toFixed(1), highlight: true },
    { label: 'Category', value: category },
    { label: 'Weight', value: unit === 'imperial' ? `${Number(fields.weight)} lb` : `${Number(fields.weight)} kg` },
    { label: 'Height', value: unit === 'imperial' ? `${Number(fields.height)} in` : `${Number(fields.height)} cm` },
  ];

  if (unit === 'imperial') {
    const minLb = (healthyMin / 0.453592).toFixed(1);
    const maxLb = (healthyMax / 0.453592).toFixed(1);
    breakdown.push({ label: 'Healthy Range', value: `${minLb} – ${maxLb} lb` });
  } else {
    breakdown.push({ label: 'Healthy Range', value: `${healthyMin.toFixed(1)} – ${healthyMax.toFixed(1)} kg` });
  }

  const table = [
    { label: 'Underweight', value: '< 18.5' },
    { label: 'Normal', value: '18.5 – 24.9' },
    { label: 'Overweight', value: '25.0 – 29.9' },
    { label: 'Obese', value: '\u2265 30.0' },
  ];

  return {
    output: `${bmi.toFixed(1)} (${category})`,
    breakdown,
    table,
  };
}

function getCategory(bmi: number, msg: Record<string, string>): string {
  if (bmi < 18.5) return msg['Underweight'] ?? 'Underweight';
  if (bmi < 25) return msg['Normal'] ?? 'Normal';
  if (bmi < 30) return msg['Overweight'] ?? 'Overweight';
  return msg['Obese'] ?? 'Obese';
}
