import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const fixedCosts = Number(fields.fixedCosts);
  const variableCost = Number(fields.variableCost);
  const pricePerUnit = Number(fields.pricePerUnit);

  if (!isFinite(fixedCosts) || !isFinite(variableCost) || !isFinite(pricePerUnit)) {
    return { output: '' };
  }
  if (fixedCosts < 0 || variableCost < 0 || pricePerUnit <= 0) return { output: '' };

  const contributionMargin = pricePerUnit - variableCost;
  if (contributionMargin <= 0) {
    return {
      output: 'Break-even not possible',
      breakdown: [
        { label: 'Issue', value: 'Variable cost per unit ≥ price per unit', highlight: true },
        { label: 'Price Per Unit', value: `$${fmtMoney(pricePerUnit)}` },
        { label: 'Variable Cost', value: `$${fmtMoney(variableCost)}` },
        { label: 'Contribution Margin', value: `$${fmtMoney(contributionMargin)}` },
      ],
    };
  }

  const breakEvenUnits = fixedCosts / contributionMargin;
  const breakEvenRevenue = breakEvenUnits * pricePerUnit;
  const contributionMarginRatio = (contributionMargin / pricePerUnit) * 100;

  return {
    output: `${fmt(Math.ceil(breakEvenUnits))} units`,
    table: [
      { label: 'Fixed Costs', value: `$${fmtMoney(fixedCosts)}` },
      { label: 'Variable Cost/Unit', value: `$${fmtMoney(variableCost)}` },
      { label: 'Price/Unit', value: `$${fmtMoney(pricePerUnit)}` },
      { label: 'Contribution Margin/Unit', value: `$${fmtMoney(contributionMargin)}` },
      { label: 'Contribution Margin Ratio', value: `${fmt(contributionMarginRatio)}%` },
      { label: 'Break-Even Units', value: fmt(Math.ceil(breakEvenUnits)) },
      { label: 'Break-Even Revenue', value: `$${fmtMoney(breakEvenRevenue)}` },
    ],
    breakdown: [
      { label: 'Formula', value: 'BE Units = Fixed Costs / (Price - Variable Cost)' },
      { label: 'Contribution Margin', value: `$${fmtMoney(pricePerUnit)} - $${fmtMoney(variableCost)} = $${fmtMoney(contributionMargin)}` },
      { label: 'Break-Even Units', value: `$${fmtMoney(fixedCosts)} / $${fmtMoney(contributionMargin)} = ${fmt(breakEvenUnits)}`, highlight: true },
      { label: 'Break-Even Revenue', value: `${fmt(Math.ceil(breakEvenUnits))} × $${fmtMoney(pricePerUnit)} = $${fmtMoney(breakEvenRevenue)}`, highlight: true },
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
