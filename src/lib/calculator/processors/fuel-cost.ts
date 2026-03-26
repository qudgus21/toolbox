import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const distance = Number(fields.distance); // km
  const fuelEfficiency = Number(fields.fuelEfficiency); // L/100km
  const fuelPrice = Number(fields.fuelPrice); // $/L

  if (!isFinite(distance) || distance <= 0 || !isFinite(fuelEfficiency) || fuelEfficiency <= 0 || !isFinite(fuelPrice) || fuelPrice <= 0) {
    return { output: '' };
  }

  const fuelNeeded = (distance * fuelEfficiency) / 100;
  const totalCost = fuelNeeded * fuelPrice;
  const costPerKm = totalCost / distance;

  // MPG equivalent (US)
  const mpg = 235.215 / fuelEfficiency;

  return {
    output: `$${fmtMoney(totalCost)}`,
    table: [
      { label: 'Distance', value: `${fmt(distance)}`, unit: 'km' },
      { label: 'Fuel Efficiency', value: `${fmt(fuelEfficiency)}`, unit: 'L/100km' },
      { label: 'Fuel Price', value: `$${fmtMoney(fuelPrice)}`, unit: '/L' },
      { label: 'Fuel Needed', value: `${fmt(fuelNeeded)}`, unit: 'L' },
      { label: 'Total Cost', value: `$${fmtMoney(totalCost)}` },
      { label: 'Cost per km', value: `$${fmtMoney(costPerKm)}`, unit: '/km' },
      { label: 'Equivalent MPG', value: `${fmt(mpg)}`, unit: 'mpg' },
    ],
    breakdown: [
      { label: 'Fuel Needed', value: `${fmt(distance)} km × ${fmt(fuelEfficiency)} L/100km ÷ 100 = ${fmt(fuelNeeded)} L` },
      { label: 'Total Cost', value: `${fmt(fuelNeeded)} L × $${fmtMoney(fuelPrice)}/L = $${fmtMoney(totalCost)}`, highlight: true },
      { label: 'Cost per km', value: `$${fmtMoney(costPerKm)}/km` },
    ],
  };
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(2)).toLocaleString('en-US', { maximumFractionDigits: 2 });
}

function fmtMoney(n: number): string {
  return parseFloat(n.toFixed(2)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
