import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const assetCost = Number(fields.assetCost);
  const salvageValue = Number(fields.salvageValue || 0);
  const usefulLife = Math.floor(Number(fields.usefulLife));
  const method = String(fields.method || 'straight-line');

  if (!isFinite(assetCost) || assetCost <= 0 || !isFinite(salvageValue) || salvageValue < 0) {
    return { output: '' };
  }
  if (!isFinite(usefulLife) || usefulLife <= 0 || usefulLife > 100) return { output: '' };
  if (salvageValue >= assetCost) return { output: '' };

  const depreciableAmount = assetCost - salvageValue;

  if (method === 'straight-line') {
    const annualDep = depreciableAmount / usefulLife;
    const table = [];
    let bookValue = assetCost;

    for (let y = 1; y <= usefulLife; y++) {
      bookValue -= annualDep;
      table.push({
        label: `Year ${y}`,
        value: `Dep: $${fmtMoney(annualDep)} — Book Value: $${fmtMoney(Math.max(bookValue, salvageValue))}`,
      });
    }

    return {
      output: `$${fmtMoney(annualDep)}/year`,
      table: [
        { label: 'Asset Cost', value: `$${fmtMoney(assetCost)}` },
        { label: 'Salvage Value', value: `$${fmtMoney(salvageValue)}` },
        { label: 'Useful Life', value: `${usefulLife} years` },
        { label: 'Depreciable Amount', value: `$${fmtMoney(depreciableAmount)}` },
        { label: 'Annual Depreciation', value: `$${fmtMoney(annualDep)}` },
        ...table,
      ],
      breakdown: [
        { label: 'Method', value: 'Straight-Line' },
        { label: 'Formula', value: '(Cost - Salvage) / Useful Life' },
        { label: 'Calculation', value: `($${fmtMoney(assetCost)} - $${fmtMoney(salvageValue)}) / ${usefulLife}` },
        { label: 'Annual Depreciation', value: `$${fmtMoney(annualDep)}`, highlight: true },
      ],
    };
  }

  // Declining balance (double)
  const rate = 2 / usefulLife;
  const table = [];
  let bookValue = assetCost;

  for (let y = 1; y <= usefulLife; y++) {
    const dep = Math.min(bookValue * rate, bookValue - salvageValue);
    const actualDep = Math.max(dep, 0);
    bookValue -= actualDep;
    table.push({
      label: `Year ${y}`,
      value: `Dep: $${fmtMoney(actualDep)} — Book Value: $${fmtMoney(bookValue)}`,
    });
  }

  const firstYearDep = Math.min(assetCost * rate, assetCost - salvageValue);

  return {
    output: `$${fmtMoney(firstYearDep)} (Year 1)`,
    table: [
      { label: 'Asset Cost', value: `$${fmtMoney(assetCost)}` },
      { label: 'Salvage Value', value: `$${fmtMoney(salvageValue)}` },
      { label: 'Useful Life', value: `${usefulLife} years` },
      { label: 'Declining Rate', value: `${fmt(rate * 100)}%` },
      ...table,
    ],
    breakdown: [
      { label: 'Method', value: 'Double Declining Balance' },
      { label: 'Rate', value: `2 / ${usefulLife} = ${fmt(rate * 100)}%` },
      { label: 'Year 1 Depreciation', value: `$${fmtMoney(firstYearDep)}`, highlight: true },
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
