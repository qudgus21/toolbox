import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const length = Number(fields.length); // m
  const width = Number(fields.width); // m
  const depth = Number(fields.depth); // m

  if (!isFinite(length) || length <= 0 || !isFinite(width) || width <= 0 || !isFinite(depth) || depth <= 0) {
    return { output: '' };
  }

  const volumeM3 = length * width * depth;
  const volumeFt3 = volumeM3 * 35.3147;
  const volumeYd3 = volumeM3 * 1.30795;
  const bagSize = 0.017; // m³ per bag (approx 40kg bag)
  const bags = Math.ceil(volumeM3 / bagSize);
  const weightTons = volumeM3 * 2.4; // concrete density ≈ 2400 kg/m³

  return {
    output: `${fmt(volumeM3)} m³`,
    table: [
      { label: 'Length', value: `${fmt(length)}`, unit: 'm' },
      { label: 'Width', value: `${fmt(width)}`, unit: 'm' },
      { label: 'Depth', value: `${fmt(depth)}`, unit: 'm' },
      { label: 'Volume', value: `${fmt(volumeM3)}`, unit: 'm³' },
      { label: 'Volume', value: `${fmt(volumeFt3)}`, unit: 'ft³' },
      { label: 'Volume', value: `${fmt(volumeYd3)}`, unit: 'yd³' },
      { label: 'Bags (40kg)', value: `${bags}`, unit: `bags (≈${fmt(bagSize)} m³/bag)` },
      { label: 'Weight', value: `${fmt(weightTons)}`, unit: 'tonnes' },
    ],
    breakdown: [
      { label: 'Formula', value: 'Volume = Length × Width × Depth' },
      { label: 'Calculation', value: `${fmt(length)} × ${fmt(width)} × ${fmt(depth)}` },
      { label: 'Volume', value: `${fmt(volumeM3)} m³`, highlight: true },
      { label: 'Bags Needed', value: `${fmt(volumeM3)} / ${bagSize} ≈ ${bags} bags`, highlight: true },
      { label: 'Estimated Weight', value: `${fmt(volumeM3)} × 2,400 kg/m³ = ${fmt(weightTons * 1000)} kg` },
    ],
  };
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(3)).toLocaleString('en-US', { maximumFractionDigits: 3 });
}
