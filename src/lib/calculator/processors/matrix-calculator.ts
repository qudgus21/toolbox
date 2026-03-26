import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const dataset = String(fields.dataset || '');
  if (!dataset.trim()) return { output: '' };

  const matrix = parseMatrix(dataset);
  if (!matrix || matrix.length === 0) return { output: '' };

  const rows = matrix.length;
  const cols = matrix[0].length;

  // Check all rows have same length
  if (matrix.some(r => r.length !== cols)) return { output: '' };

  const isSquare = rows === cols;
  const traceVal = isSquare ? trace(matrix) : null;
  const detVal = isSquare && rows <= 3 ? determinant(matrix) : null;
  const transposed = transpose(matrix);

  const matrixStr = matrix.map(r => r.map(fmt).join('\t')).join('\n');
  const transStr = transposed.map(r => r.map(fmt).join('\t')).join('\n');

  const table = [
    { label: 'Dimensions', value: `${rows} × ${cols}` },
  ];

  if (traceVal !== null) {
    table.push({ label: 'Trace', value: fmt(traceVal) });
  }
  if (detVal !== null) {
    table.push({ label: 'Determinant', value: fmt(detVal) });
  }

  const breakdown = [
    { label: 'Matrix', value: `${rows}×${cols}` },
  ];

  if (isSquare) {
    breakdown.push({ label: 'Trace (sum of diagonal)', value: fmt(traceVal!) });
    if (detVal !== null) {
      breakdown.push({ label: 'Determinant', value: fmt(detVal) });
      if (rows === 2) {
        breakdown.push({
          label: 'Det formula (2×2)',
          value: `a·d - b·c = ${fmt(matrix[0][0])}·${fmt(matrix[1][1])} - ${fmt(matrix[0][1])}·${fmt(matrix[1][0])}`,
        });
      }
    }
    if (rows > 3) {
      breakdown.push({ label: 'Note', value: 'Determinant only computed for 2×2 and 3×3 matrices' });
    }
  }

  return {
    output: detVal !== null ? `Determinant: ${fmt(detVal)}` : `${rows}×${cols} matrix`,
    table,
    breakdown,
    preview: `Matrix:\n${matrixStr}\n\nTranspose:\n${transStr}`,
  };
}

function parseMatrix(input: string): number[][] | null {
  const lines = input.trim().split(/\n/).filter(l => l.trim());
  if (lines.length === 0) return null;

  const matrix: number[][] = [];
  for (const line of lines) {
    const vals = line.trim().split(/[\s,;]+/).map(Number);
    if (vals.some(v => !isFinite(v))) return null;
    matrix.push(vals);
  }
  return matrix;
}

function trace(m: number[][]): number {
  let sum = 0;
  for (let i = 0; i < m.length; i++) sum += m[i][i];
  return sum;
}

function determinant(m: number[][]): number | null {
  const n = m.length;
  if (n === 1) return m[0][0];
  if (n === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  if (n === 3) {
    return (
      m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
      m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
      m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
    );
  }
  return null;
}

function transpose(m: number[][]): number[][] {
  const rows = m.length;
  const cols = m[0].length;
  const result: number[][] = [];
  for (let j = 0; j < cols; j++) {
    result.push([]);
    for (let i = 0; i < rows; i++) {
      result[j].push(m[i][j]);
    }
  }
  return result;
}

function fmt(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  return parseFloat(n.toFixed(6)).toLocaleString('en-US', { maximumFractionDigits: 6 });
}
