import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const amount = Number(fields.amount);
  const taxRate = Number(fields.taxRate);
  const mode = String(fields.mode || 'addTax');

  if (!isFinite(amount) || !isFinite(taxRate) || amount <= 0 || taxRate < 0) {
    return { output: '' };
  }

  if (mode === 'removeTax') {
    const preTax = amount / (1 + taxRate / 100);
    const taxAmount = amount - preTax;

    return {
      output: money(preTax),
      breakdown: [
        { label: 'Total (incl. tax)', value: money(amount) },
        { label: 'Tax Rate', value: `${taxRate}%` },
        { label: 'Tax Amount', value: money(taxAmount) },
        { label: 'Pre-tax Price', value: money(preTax), highlight: true },
        { label: 'Formula', value: `${money(amount)} / (1 + ${taxRate}%)` },
      ],
    };
  }

  // addTax (default)
  const taxAmount = amount * (taxRate / 100);
  const total = amount + taxAmount;

  return {
    output: money(total),
    breakdown: [
      { label: 'Pre-tax Amount', value: money(amount) },
      { label: 'Tax Rate', value: `${taxRate}%` },
      { label: 'Tax Amount', value: money(taxAmount) },
      { label: 'Total', value: money(total), highlight: true },
      { label: 'Formula', value: `${money(amount)} \u00d7 (1 + ${taxRate}%)` },
    ],
  };
}

function money(n: number): string {
  return '$' + (Math.round(n * 100) / 100).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
