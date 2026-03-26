import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const amount = Number(fields.amount);
  const annualRate = Number(fields.rate);
  const termYears = Number(fields.term);

  if (!isFinite(amount) || !isFinite(annualRate) || !isFinite(termYears) || amount <= 0 || termYears <= 0) {
    return { output: '' };
  }

  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = Math.round(termYears * 12);

  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = amount / totalMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyPayment = amount * (monthlyRate * factor) / (factor - 1);
  }

  const totalPayment = monthlyPayment * totalMonths;
  const totalInterest = totalPayment - amount;

  // Amortization schedule (first 12 months)
  const table = [];
  let balance = amount;
  const scheduleMonths = Math.min(12, totalMonths);

  for (let m = 1; m <= scheduleMonths; m++) {
    const interestPart = balance * monthlyRate;
    const principalPart = monthlyPayment - interestPart;
    balance = Math.max(0, balance - principalPart);
    table.push({
      label: `Month ${m}`,
      value: money(principalPart),
      unit: `Interest: ${money(interestPart)} | Balance: ${money(balance)}`,
    });
  }

  return {
    output: `${money(monthlyPayment)}/mo`,
    breakdown: [
      { label: 'Loan Amount', value: money(amount) },
      { label: 'Interest Rate', value: `${annualRate}%` },
      { label: 'Term', value: `${termYears} year${termYears !== 1 ? 's' : ''} (${totalMonths} months)` },
      { label: 'Monthly Payment', value: money(monthlyPayment), highlight: true },
      { label: 'Total Interest', value: money(totalInterest) },
      { label: 'Total Payment', value: money(totalPayment) },
    ],
    table,
    stats: {
      monthlyPayment: round2(monthlyPayment),
      totalInterest: round2(totalInterest),
      totalPayment: round2(totalPayment),
    },
  };
}

function money(n: number): string {
  return '$' + round2(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
