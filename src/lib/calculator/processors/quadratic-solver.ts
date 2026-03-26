import type { CalculatorBreakdownRow, CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const a = Number(fields.a);
  const b = Number(fields.b);
  const c = Number(fields.c);

  if (!isFinite(a) || !isFinite(b) || !isFinite(c)) return { output: '' };
  if (a === 0) {
    // Linear equation bx + c = 0
    if (b === 0) return { output: c === 0 ? 'Infinite solutions' : 'No solution' };
    const x = -c / b;
    return {
      output: `x = ${fmt(x)}`,
      breakdown: [
        { label: 'Equation', value: `${fmt(b)}x + ${fmt(c)} = 0` },
        { label: 'Solution', value: `x = ${fmt(x)}`, highlight: true },
      ],
    };
  }

  const discriminant = b * b - 4 * a * c;
  const vertexX = -b / (2 * a);
  const vertexY = a * vertexX * vertexX + b * vertexX + c;

  const equation = formatEquation(a, b, c);
  const breakdown: CalculatorBreakdownRow[] = [
    { label: 'Equation', value: equation },
    { label: 'Discriminant (\u0394)', value: fmt(discriminant) },
    { label: 'Vertex', value: `(${fmt(vertexX)}, ${fmt(vertexY)})` },
    { label: 'Axis of Symmetry', value: `x = ${fmt(vertexX)}` },
  ];

  let output: string;

  if (discriminant > 0) {
    const sqrtD = Math.sqrt(discriminant);
    const x1 = (-b + sqrtD) / (2 * a);
    const x2 = (-b - sqrtD) / (2 * a);
    output = `x = ${fmt(x1)}, x = ${fmt(x2)}`;
    breakdown.push(
      { label: 'Root 1 (x\u2081)', value: fmt(x1), highlight: true },
      { label: 'Root 2 (x\u2082)', value: fmt(x2), highlight: true },
    );
  } else if (discriminant === 0) {
    const x = -b / (2 * a);
    output = `x = ${fmt(x)} (double root)`;
    breakdown.push(
      { label: 'Root (double)', value: fmt(x), highlight: true },
    );
  } else {
    const realPart = -b / (2 * a);
    const imagPart = Math.sqrt(-discriminant) / (2 * a);
    const x1 = `${fmt(realPart)} + ${fmt(Math.abs(imagPart))}i`;
    const x2 = `${fmt(realPart)} - ${fmt(Math.abs(imagPart))}i`;
    output = `x = ${x1}, x = ${x2}`;
    breakdown.push(
      { label: 'Root 1 (complex)', value: x1, highlight: true },
      { label: 'Root 2 (complex)', value: x2, highlight: true },
      { label: 'Note', value: 'No real roots' },
    );
  }

  return { output, breakdown };
}

function formatEquation(a: number, b: number, c: number): string {
  let eq = '';
  if (a === 1) eq = 'x\u00b2';
  else if (a === -1) eq = '-x\u00b2';
  else eq = `${fmt(a)}x\u00b2`;

  if (b > 0) eq += ` + ${b === 1 ? '' : fmt(b)}x`;
  else if (b < 0) eq += ` - ${b === -1 ? '' : fmt(Math.abs(b))}x`;

  if (c > 0) eq += ` + ${fmt(c)}`;
  else if (c < 0) eq += ` - ${fmt(Math.abs(c))}`;

  return eq + ' = 0';
}

function fmt(n: number): string {
  if (Number.isInteger(n)) return n.toString();
  return parseFloat(n.toFixed(6)).toString();
}
