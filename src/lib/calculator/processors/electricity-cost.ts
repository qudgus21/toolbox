import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const watts = Number(fields.watts);
  const hoursPerDay = Number(fields.hoursPerDay);
  const daysPerMonth = Number(fields.daysPerMonth ?? 30);
  const costPerKwh = Number(fields.costPerKwh);

  if (
    !isFinite(watts) || !isFinite(hoursPerDay) ||
    !isFinite(daysPerMonth) || !isFinite(costPerKwh) ||
    watts < 0 || hoursPerDay < 0 || daysPerMonth < 0 || costPerKwh < 0
  ) {
    return { output: '' };
  }

  const kw = watts / 1000;
  const dailyKwh = kw * hoursPerDay;
  const monthlyKwh = dailyKwh * daysPerMonth;
  const yearlyKwh = dailyKwh * 365;

  const dailyCost = dailyKwh * costPerKwh;
  const monthlyCost = monthlyKwh * costPerKwh;
  const yearlyCost = yearlyKwh * costPerKwh;

  return {
    output: `${money(monthlyCost)}/month`,
    breakdown: [
      { label: 'Power', value: `${watts} W (${kw} kW)` },
      { label: 'Usage', value: `${hoursPerDay} hrs/day` },
      { label: 'Rate', value: `${money(costPerKwh)}/kWh` },
      { label: 'Daily Consumption', value: `${dailyKwh.toFixed(2)} kWh` },
      { label: 'Monthly Consumption', value: `${monthlyKwh.toFixed(2)} kWh` },
      { label: 'Yearly Consumption', value: `${yearlyKwh.toFixed(2)} kWh` },
      { label: 'Daily Cost', value: money(dailyCost) },
      { label: 'Monthly Cost', value: money(monthlyCost), highlight: true },
      { label: 'Yearly Cost', value: money(yearlyCost), highlight: true },
    ],
    stats: {
      monthlyKwh: round2(monthlyKwh),
      monthlyCost: round2(monthlyCost),
      yearlyCost: round2(yearlyCost),
    },
  };
}

function money(n: number): string {
  return '$' + round2(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
