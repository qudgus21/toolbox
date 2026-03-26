import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const billAmount = Number(fields.billAmount);
  const tipPercent = Number(fields.tipPercent);
  const numPeople = Math.max(1, Math.floor(Number(fields.numPeople) || 1));

  if (!isFinite(billAmount) || !isFinite(tipPercent) || billAmount <= 0 || tipPercent < 0) {
    return { output: '' };
  }

  const tipAmount = billAmount * (tipPercent / 100);
  const totalBill = billAmount + tipAmount;
  const perPerson = totalBill / numPeople;
  const tipPerPerson = tipAmount / numPeople;

  const breakdown = [
    { label: 'Bill Amount', value: money(billAmount) },
    { label: 'Tip Percent', value: `${tipPercent}%` },
    { label: 'Tip Amount', value: money(tipAmount) },
    { label: 'Total', value: money(totalBill), highlight: true },
  ];

  if (numPeople > 1) {
    breakdown.push(
      { label: 'Split Between', value: `${numPeople} people` },
      { label: 'Per Person', value: money(perPerson), highlight: true },
      { label: 'Tip Per Person', value: money(tipPerPerson) },
    );
  }

  // Quick comparison table with common tip percentages
  const table = [10, 15, 18, 20, 25].map((pct) => {
    const tip = billAmount * (pct / 100);
    const total = billAmount + tip;
    return {
      label: `${pct}%`,
      value: money(total),
      unit: `Tip: ${money(tip)}`,
    };
  });

  return {
    output: money(totalBill),
    breakdown,
    table,
  };
}

function money(n: number): string {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
