import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const a = Math.floor(Number(fields.numberA));
  const b = Math.floor(Number(fields.numberB || 0));
  const operation = String(fields.operation || 'AND');

  if (!isFinite(a)) return { output: '' };

  const op = operation.toUpperCase();
  let result: number;
  let opSymbol: string;
  let formula: string;

  switch (op) {
    case 'AND':
      if (!isFinite(b)) return { output: '' };
      result = a & b;
      opSymbol = '&';
      formula = `${a} AND ${b}`;
      break;
    case 'OR':
      if (!isFinite(b)) return { output: '' };
      result = a | b;
      opSymbol = '|';
      formula = `${a} OR ${b}`;
      break;
    case 'XOR':
      if (!isFinite(b)) return { output: '' };
      result = a ^ b;
      opSymbol = '^';
      formula = `${a} XOR ${b}`;
      break;
    case 'NOT':
      result = ~a;
      opSymbol = '~';
      formula = `NOT ${a}`;
      break;
    case 'LEFT-SHIFT':
    case 'LSHIFT':
      if (!isFinite(b)) return { output: '' };
      result = a << b;
      opSymbol = '<<';
      formula = `${a} << ${b}`;
      break;
    case 'RIGHT-SHIFT':
    case 'RSHIFT':
      if (!isFinite(b)) return { output: '' };
      result = a >> b;
      opSymbol = '>>';
      formula = `${a} >> ${b}`;
      break;
    default:
      return { output: '' };
  }

  const toBin = (n: number) => (n >>> 0).toString(2);
  const toHex = (n: number) => '0x' + (n >>> 0).toString(16).toUpperCase();

  const table = [
    { label: 'Number A (dec)', value: String(a) },
    { label: 'Number A (bin)', value: toBin(a) },
    { label: 'Number A (hex)', value: toHex(a) },
  ];

  if (op !== 'NOT') {
    table.push(
      { label: 'Number B (dec)', value: String(b) },
      { label: 'Number B (bin)', value: toBin(b) },
      { label: 'Number B (hex)', value: toHex(b) },
    );
  }

  table.push(
    { label: 'Result (dec)', value: String(result) },
    { label: 'Result (bin)', value: toBin(result) },
    { label: 'Result (hex)', value: toHex(result) },
  );

  return {
    output: String(result),
    table,
    breakdown: [
      { label: 'Operation', value: `${op} (${opSymbol})` },
      { label: 'Expression', value: formula },
      ...(op !== 'NOT'
        ? [
            { label: 'A (binary)', value: toBin(a).padStart(32, '0') },
            { label: `${opSymbol}`, value: '' },
            { label: 'B (binary)', value: toBin(b).padStart(32, '0') },
          ]
        : [{ label: 'A (binary)', value: toBin(a).padStart(32, '0') }]),
      { label: 'Result (binary)', value: toBin(result).padStart(32, '0'), highlight: true },
      { label: 'Result (decimal)', value: String(result), highlight: true },
    ],
  };
}
