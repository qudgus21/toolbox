import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const goalAmount = Number(fields.goalAmount);
  const currentSavings = Number(fields.currentSavings || 0);
  const annualRate = Number(fields.rate || 0);
  const months = Math.floor(Number(fields.timeframe));

  if (!isFinite(goalAmount) || goalAmount <= 0 || !isFinite(months) || months <= 0) {
    return { output: '' };
  }
  if (!isFinite(currentSavings) || !isFinite(annualRate)) return { output: '' };

  const r = annualRate / 100 / 12; // monthly rate
  const n = months;
  const pv = currentSavings;

  let monthlyPayment: number;
  if (r === 0) {
    monthlyPayment = (goalAmount - pv) / n;
  } else {
    const fvOfPV = pv * Math.pow(1 + r, n);
    const remaining = goalAmount - fvOfPV;
    monthlyPayment = remaining * r / (Math.pow(1 + r, n) - 1);
  }

  if (!isFinite(monthlyPayment)) return { output: '' };

  const totalContributions = monthlyPayment * n;
  const totalInterest = goalAmount - currentSavings - totalContributions;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const timeStr = years > 0
    ? `${years} year${years > 1 ? 's' : ''}${remainingMonths > 0 ? ` ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''}`
    : `${months} month${months > 1 ? 's' : ''}`;

  return {
    output: `$${fmt(monthlyPayment)}/month`,
    table: [
      { label: 'Savings Goal', value: `$${fmt(goalAmount)}` },
      { label: 'Current Savings', value: `$${fmt(currentSavings)}` },
      { label: 'Annual Rate', value: `${fmt(annualRate)}%` },
      { label: 'Timeframe', value: timeStr },
      { label: 'Monthly Savings Needed', value: `$${fmt(monthlyPayment)}` },
      { label: 'Total Contributions', value: `$${fmt(totalContributions)}` },
      { label: 'Interest Earned', value: `$${fmt(totalInterest)}` },
    ],
    breakdown: [
      { label: 'Goal', value: `$${fmt(goalAmount)}` },
      { label: 'Starting Balance', value: `$${fmt(currentSavings)}` },
      { label: 'Monthly Rate', value: `${fmt(annualRate)}% / 12 = ${fmt(r * 100)}%` },
      { label: 'Monthly Savings', value: `$${fmt(monthlyPayment)}`, highlight: true },
      { label: 'Total Deposited', value: `$${fmt(totalContributions + currentSavings)}` },
      { label: 'Interest Earned', value: `$${fmt(totalInterest)}` },
    ],
  };
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(2)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
