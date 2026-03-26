import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const revenue = Number(fields.revenue);
  const cost = Number(fields.cost);

  if (!isFinite(revenue) || !isFinite(cost)) return { output: '' };
  if (revenue === 0 && cost === 0) return { output: '' };

  const grossProfit = revenue - cost;
  const profitMargin = revenue !== 0 ? (grossProfit / revenue) * 100 : 0;
  const markup = cost !== 0 ? (grossProfit / cost) * 100 : 0;

  return {
    output: `${profitMargin.toFixed(2)}% margin`,
    breakdown: [
      { label: 'Revenue', value: money(revenue) },
      { label: 'Cost', value: money(cost) },
      { label: 'Gross Profit', value: money(grossProfit), highlight: grossProfit >= 0 },
      { label: 'Profit Margin', value: `${profitMargin.toFixed(2)}%`, highlight: true },
      { label: 'Markup', value: `${markup.toFixed(2)}%` },
      { label: 'Margin Formula', value: `(Revenue - Cost) / Revenue \u00d7 100` },
      { label: 'Markup Formula', value: `(Revenue - Cost) / Cost \u00d7 100` },
    ],
    stats: {
      grossProfit: round2(grossProfit),
      profitMargin: round2(profitMargin),
      markup: round2(markup),
    },
  };
}

function money(n: number): string {
  return '$' + round2(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
