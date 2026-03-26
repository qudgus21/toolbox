import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const initial = Number(fields.initialInvestment);
  const final_ = Number(fields.finalValue);
  const timePeriod = Number(fields.timePeriod || 1);

  if (!isFinite(initial) || !isFinite(final_) || initial === 0 || !isFinite(timePeriod) || timePeriod <= 0) {
    return { output: '' };
  }

  const gain = final_ - initial;
  const roi = (gain / Math.abs(initial)) * 100;
  const annualized = (Math.pow(final_ / initial, 1 / timePeriod) - 1) * 100;

  return {
    output: `${fmt(roi)}% ROI`,
    table: [
      { label: 'Initial Investment', value: `$${fmtMoney(initial)}` },
      { label: 'Final Value', value: `$${fmtMoney(final_)}` },
      { label: 'Net Gain/Loss', value: `$${fmtMoney(gain)}` },
      { label: 'ROI', value: `${fmt(roi)}%` },
      { label: 'Time Period', value: `${fmt(timePeriod)} year${timePeriod !== 1 ? 's' : ''}` },
      { label: 'Annualized ROI', value: `${isFinite(annualized) ? fmt(annualized) : 'N/A'}%` },
    ],
    breakdown: [
      { label: 'Formula', value: 'ROI = (Final - Initial) / |Initial| × 100' },
      { label: 'Calculation', value: `(${fmtMoney(final_)} - ${fmtMoney(initial)}) / |${fmtMoney(initial)}| × 100` },
      { label: 'ROI', value: `${fmt(roi)}%`, highlight: true },
      { label: 'Annualized', value: `((${fmtMoney(final_)}/${fmtMoney(initial)})^(1/${fmt(timePeriod)}) - 1) × 100 = ${isFinite(annualized) ? fmt(annualized) : 'N/A'}%`, highlight: true },
    ],
    stats: {
      roi,
      gain,
      profitable: gain > 0,
    },
  };
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(2)).toLocaleString('en-US', { maximumFractionDigits: 2 });
}

function fmtMoney(n: number): string {
  return parseFloat(n.toFixed(2)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
