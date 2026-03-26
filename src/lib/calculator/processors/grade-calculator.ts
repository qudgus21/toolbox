import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const dataset = String(fields.dataset || '');
  if (!dataset.trim()) return { output: '' };

  const entries = parseEntries(dataset);
  if (entries.length === 0) return { output: '' };

  const totalWeight = entries.reduce((s, e) => s + e.weight, 0);
  if (totalWeight === 0) return { output: '' };

  const weightedSum = entries.reduce((s, e) => s + e.score * e.weight, 0);
  const weightedAverage = weightedSum / totalWeight;

  const simpleAverage = entries.reduce((s, e) => s + e.score, 0) / entries.length;
  const highest = Math.max(...entries.map(e => e.score));
  const lowest = Math.min(...entries.map(e => e.score));

  const letterGrade = getLetterGrade(weightedAverage);

  const table = entries.map((e, i) => ({
    label: `Item ${i + 1}`,
    value: `Score: ${fmt(e.score)} — Weight: ${fmt(e.weight)}`,
  }));

  return {
    output: `${fmt(weightedAverage)}% (${letterGrade})`,
    table: [
      ...table,
      { label: 'Weighted Average', value: `${fmt(weightedAverage)}%` },
      { label: 'Letter Grade', value: letterGrade },
      { label: 'Simple Average', value: `${fmt(simpleAverage)}%` },
      { label: 'Highest Score', value: `${fmt(highest)}%` },
      { label: 'Lowest Score', value: `${fmt(lowest)}%` },
      { label: 'Total Weight', value: fmt(totalWeight) },
    ],
    breakdown: [
      { label: 'Items', value: `${entries.length}` },
      { label: 'Weighted Sum', value: entries.map(e => `${fmt(e.score)}×${fmt(e.weight)}`).join(' + ') + ` = ${fmt(weightedSum)}` },
      { label: 'Total Weight', value: fmt(totalWeight) },
      { label: 'Weighted Average', value: `${fmt(weightedSum)} / ${fmt(totalWeight)} = ${fmt(weightedAverage)}%`, highlight: true },
      { label: 'Grade', value: letterGrade, highlight: true },
    ],
  };
}

function parseEntries(input: string): { score: number; weight: number }[] {
  return input
    .trim()
    .split(/\n/)
    .map(line => {
      const parts = line.trim().split(/[\s,;]+/).map(Number);
      if (parts.length >= 2 && isFinite(parts[0]) && isFinite(parts[1]) && parts[1] > 0) {
        return { score: parts[0], weight: parts[1] };
      }
      if (parts.length === 1 && isFinite(parts[0])) {
        return { score: parts[0], weight: 1 };
      }
      return null;
    })
    .filter((e): e is { score: number; weight: number } => e !== null);
}

function getLetterGrade(avg: number): string {
  if (avg >= 97) return 'A+';
  if (avg >= 93) return 'A';
  if (avg >= 90) return 'A-';
  if (avg >= 87) return 'B+';
  if (avg >= 83) return 'B';
  if (avg >= 80) return 'B-';
  if (avg >= 77) return 'C+';
  if (avg >= 73) return 'C';
  if (avg >= 70) return 'C-';
  if (avg >= 67) return 'D+';
  if (avg >= 63) return 'D';
  if (avg >= 60) return 'D-';
  return 'F';
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(2)).toLocaleString('en-US', { maximumFractionDigits: 2 });
}
