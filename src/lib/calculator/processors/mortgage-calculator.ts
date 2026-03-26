import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const homePrice = Number(fields.homePrice);
  const downPayment = Number(fields.downPayment ?? 0);
  const annualRate = Number(fields.rate);
  const termYears = Number(fields.term ?? 30);
  const propertyTax = Number(fields.propertyTax ?? 0);   // annual
  const insurance = Number(fields.insurance ?? 0);         // annual

  if (
    !isFinite(homePrice) || !isFinite(annualRate) || !isFinite(termYears) ||
    homePrice <= 0 || termYears <= 0 || annualRate < 0
  ) {
    return { output: '' };
  }

  const loanAmount = homePrice - downPayment;
  if (loanAmount <= 0) return { output: 'Down payment exceeds home price' };

  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = Math.round(termYears * 12);

  let monthlyMortgage: number;
  if (monthlyRate === 0) {
    monthlyMortgage = loanAmount / totalMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyMortgage = loanAmount * (monthlyRate * factor) / (factor - 1);
  }

  const monthlyTax = propertyTax / 12;
  const monthlyInsurance = insurance / 12;
  const totalMonthly = monthlyMortgage + monthlyTax + monthlyInsurance;

  const totalMortgagePayment = monthlyMortgage * totalMonths;
  const totalInterest = totalMortgagePayment - loanAmount;
  const totalCost = totalMortgagePayment + propertyTax * termYears + insurance * termYears;

  const downPaymentPercent = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;

  return {
    output: `${money(totalMonthly)}/mo`,
    breakdown: [
      { label: 'Home Price', value: money(homePrice) },
      { label: 'Down Payment', value: `${money(downPayment)} (${downPaymentPercent.toFixed(1)}%)` },
      { label: 'Loan Amount', value: money(loanAmount) },
      { label: 'Interest Rate', value: `${annualRate}%` },
      { label: 'Term', value: `${termYears} years` },
      { label: 'Monthly Mortgage (P&I)', value: money(monthlyMortgage) },
      { label: 'Monthly Property Tax', value: money(monthlyTax) },
      { label: 'Monthly Insurance', value: money(monthlyInsurance) },
      { label: 'Total Monthly Payment', value: money(totalMonthly), highlight: true },
      { label: 'Total Interest', value: money(totalInterest) },
      { label: 'Total Cost (over loan life)', value: money(totalCost) },
    ],
    table: [
      { label: 'Principal & Interest', value: money(monthlyMortgage), unit: `${pct(monthlyMortgage, totalMonthly)}%` },
      { label: 'Property Tax', value: money(monthlyTax), unit: `${pct(monthlyTax, totalMonthly)}%` },
      { label: 'Insurance', value: money(monthlyInsurance), unit: `${pct(monthlyInsurance, totalMonthly)}%` },
      { label: 'Total', value: money(totalMonthly), unit: '100%' },
    ],
    stats: {
      loanAmount: round2(loanAmount),
      monthlyPayment: round2(totalMonthly),
      totalInterest: round2(totalInterest),
    },
  };
}

function pct(part: number, total: number): string {
  if (total === 0) return '0';
  return ((part / total) * 100).toFixed(1);
}

function money(n: number): string {
  return '$' + round2(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
