import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const principal = Number(fields.principal);
  const rate = Number(fields.rate);
  const time = Number(fields.time);
  const frequency = Number(fields.frequency) || 12;

  if (!isFinite(principal) || !isFinite(rate) || !isFinite(time) || principal <= 0 || time <= 0) {
    return { output: '' };
  }

  const r = rate / 100;
  const n = frequency;
  const t = time;

  const finalAmount = principal * Math.pow(1 + r / n, n * t);
  const totalInterest = finalAmount - principal;

  // Year-by-year table
  const table = [];
  const years = Math.min(Math.ceil(t), 50); // cap at 50 rows
  for (let y = 1; y <= years; y++) {
    const yearEnd = y <= t ? y : t;
    const amt = principal * Math.pow(1 + r / n, n * yearEnd);
    const interest = amt - principal;
    table.push({
      label: `Year ${y}`,
      value: money(amt),
      unit: `Interest: ${money(interest)}`,
    });
  }

  return {
    output: money(finalAmount),
    breakdown: [
      { label: 'Principal', value: money(principal) },
      { label: 'Annual Rate', value: `${rate}%` },
      { label: 'Time', value: `${t} year${t !== 1 ? 's' : ''}` },
      { label: 'Compounding', value: freqLabel(frequency) },
      { label: 'Total Interest', value: money(totalInterest) },
      { label: 'Final Amount', value: money(finalAmount), highlight: true },
    ],
    table,
    stats: {
      principal,
      totalInterest: round2(totalInterest),
      finalAmount: round2(finalAmount),
    },
  };
}

function freqLabel(n: number): string {
  switch (n) {
    case 1: return 'Annually';
    case 2: return 'Semi-annually';
    case 4: return 'Quarterly';
    case 12: return 'Monthly';
    case 365: return 'Daily';
    default: return `${n}x per year`;
  }
}

function money(n: number): string {
  return '$' + round2(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
