import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const length = Number(fields.length); // m
  const width = Number(fields.width); // m
  const height = Number(fields.height); // m
  const doors = Number(fields.doors || 0);
  const windows = Number(fields.windows || 0);
  const coats = Number(fields.coats || 2);

  if (!isFinite(length) || length <= 0 || !isFinite(width) || width <= 0 || !isFinite(height) || height <= 0) {
    return { output: '' };
  }

  const doorArea = 1.9; // m² per door
  const windowArea = 1.5; // m² per window
  const coveragePerLiter = 10; // m² per liter

  const totalWallArea = 2 * (length + width) * height;
  const deductions = doors * doorArea + windows * windowArea;
  const paintableArea = Math.max(totalWallArea - deductions, 0);
  const totalAreaWithCoats = paintableArea * coats;
  const litersNeeded = totalAreaWithCoats / coveragePerLiter;
  const gallonsNeeded = litersNeeded / 3.785;

  return {
    output: `${fmt(litersNeeded)} L (${fmt(Math.ceil(litersNeeded))} L rounded)`,
    table: [
      { label: 'Room Dimensions', value: `${fmt(length)} × ${fmt(width)} × ${fmt(height)}`, unit: 'm' },
      { label: 'Total Wall Area', value: `${fmt(totalWallArea)}`, unit: 'm²' },
      { label: 'Doors', value: `${doors} (${fmt(doors * doorArea)} m²)` },
      { label: 'Windows', value: `${windows} (${fmt(windows * windowArea)} m²)` },
      { label: 'Paintable Area', value: `${fmt(paintableArea)}`, unit: 'm²' },
      { label: 'Coats', value: String(coats) },
      { label: 'Total Area (with coats)', value: `${fmt(totalAreaWithCoats)}`, unit: 'm²' },
      { label: 'Paint Needed', value: `${fmt(litersNeeded)}`, unit: 'L' },
      { label: 'Paint Needed', value: `${fmt(gallonsNeeded)}`, unit: 'gal' },
    ],
    breakdown: [
      { label: 'Wall Area', value: `2 × (${fmt(length)} + ${fmt(width)}) × ${fmt(height)} = ${fmt(totalWallArea)} m²` },
      { label: 'Deductions', value: `${doors} doors + ${windows} windows = ${fmt(deductions)} m²` },
      { label: 'Paintable Area', value: `${fmt(paintableArea)} m²` },
      { label: 'With Coats', value: `${fmt(paintableArea)} × ${coats} = ${fmt(totalAreaWithCoats)} m²` },
      { label: 'Coverage', value: `${coveragePerLiter} m²/L` },
      { label: 'Paint Needed', value: `${fmt(totalAreaWithCoats)} / ${coveragePerLiter} = ${fmt(litersNeeded)} L`, highlight: true },
    ],
  };
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(2)).toLocaleString('en-US', { maximumFractionDigits: 2 });
}
