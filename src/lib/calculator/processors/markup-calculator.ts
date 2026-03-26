import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const cost = Number(fields.cost);
  const markup = Number(fields.markup);

  if (!isFinite(cost) || !isFinite(markup) || cost < 0) return { output: '' };

  const sellingPrice = cost * (1 + markup / 100);
  const profit = sellingPrice - cost;
  const profitMargin = sellingPrice !== 0 ? (profit / sellingPrice) * 100 : 0;

  return {
    output: `$${fmtMoney(sellingPrice)}`,
    table: [
      { label: 'Cost', value: `$${fmtMoney(cost)}` },
      { label: 'Markup', value: `${fmt(markup)}%` },
      { label: 'Selling Price', value: `$${fmtMoney(sellingPrice)}` },
      { label: 'Profit', value: `$${fmtMoney(profit)}` },
      { label: 'Profit Margin', value: `${fmt(profitMargin)}%` },
    ],
    breakdown: [
      { label: 'Formula', value: 'Selling Price = Cost × (1 + Markup/100)' },
      { label: 'Calculation', value: `$${fmtMoney(cost)} × (1 + ${fmt(markup)}/100) = $${fmtMoney(cost)} × ${fmt(1 + markup / 100)}` },
      { label: 'Selling Price', value: `$${fmtMoney(sellingPrice)}`, highlight: true },
      { label: 'Profit', value: `$${fmtMoney(profit)}`, highlight: true },
      { label: 'Markup vs Margin', value: `Markup: ${fmt(markup)}% (on cost) — Margin: ${fmt(profitMargin)}% (on selling price)` },
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
