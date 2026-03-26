import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const expression = String(fields.expression || '').trim();
  if (!expression) return { output: '' };

  try {
    const result = evaluate(expression);
    if (!isFinite(result)) return { output: 'Undefined (division by zero or overflow)' };

    return {
      output: formatNumber(result),
      breakdown: [
        { label: 'Expression', value: expression },
        { label: 'Result', value: formatNumber(result), highlight: true },
      ],
    };
  } catch (e) {
    return { output: `Error: ${(e as Error).message}` };
  }
}

/* ── Tokenizer ─────────────────────────────────────────────── */

type TokenKind = 'num' | 'op' | 'fn' | 'lp' | 'rp' | 'comma';
interface Token { kind: TokenKind; value: string }

const FUNCTIONS = new Set([
  'sin', 'cos', 'tan', 'asin', 'acos', 'atan',
  'sqrt', 'abs', 'log', 'ln', 'log2', 'exp',
  'ceil', 'floor', 'round',
]);

const CONSTANTS: Record<string, number> = {
  pi: Math.PI,
  e: Math.E,
};

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const s = expr.replace(/\s+/g, '');

  while (i < s.length) {
    const ch = s[i];

    // Number (including decimal)
    if (/[0-9.]/.test(ch)) {
      let num = '';
      while (i < s.length && /[0-9.eE]/.test(s[i])) {
        if ((s[i] === 'e' || s[i] === 'E') && i + 1 < s.length && (s[i + 1] === '+' || s[i + 1] === '-')) {
          num += s[i] + s[i + 1];
          i += 2;
        } else {
          num += s[i];
          i++;
        }
      }
      tokens.push({ kind: 'num', value: num });
      continue;
    }

    // Operators
    if ('+-*/%^'.includes(ch)) {
      tokens.push({ kind: 'op', value: ch });
      i++;
      continue;
    }

    if (ch === '(') { tokens.push({ kind: 'lp', value: '(' }); i++; continue; }
    if (ch === ')') { tokens.push({ kind: 'rp', value: ')' }); i++; continue; }
    if (ch === ',') { tokens.push({ kind: 'comma', value: ',' }); i++; continue; }

    // Identifiers (functions / constants)
    if (/[a-zA-Z_]/.test(ch)) {
      let id = '';
      while (i < s.length && /[a-zA-Z0-9_]/.test(s[i])) { id += s[i]; i++; }
      const lower = id.toLowerCase();
      if (CONSTANTS[lower] !== undefined) {
        tokens.push({ kind: 'num', value: String(CONSTANTS[lower]) });
      } else if (FUNCTIONS.has(lower)) {
        tokens.push({ kind: 'fn', value: lower });
      } else {
        throw new Error(`Unknown identifier: ${id}`);
      }
      continue;
    }

    throw new Error(`Unexpected character: ${ch}`);
  }

  return tokens;
}

/* ── Shunting-yard + evaluation ────────────────────────────── */

interface Precedence { prec: number; assoc: 'L' | 'R' }

const OPS: Record<string, Precedence> = {
  '+': { prec: 1, assoc: 'L' },
  '-': { prec: 1, assoc: 'L' },
  '*': { prec: 2, assoc: 'L' },
  '/': { prec: 2, assoc: 'L' },
  '%': { prec: 2, assoc: 'L' },
  '^': { prec: 3, assoc: 'R' },
  'NEG': { prec: 4, assoc: 'R' },  // unary minus
};

function evaluate(expr: string): number {
  const tokens = tokenize(expr);

  // Handle unary minus/plus: insert NEG operator
  const processed: Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.kind === 'op' && (t.value === '-' || t.value === '+')) {
      const prev = processed[processed.length - 1];
      const isUnary = !prev || prev.kind === 'lp' || prev.kind === 'op' || prev.kind === 'comma';
      if (isUnary) {
        if (t.value === '-') {
          processed.push({ kind: 'op', value: 'NEG' });
        }
        // unary + is a no-op
        continue;
      }
    }
    processed.push(t);
  }

  // Shunting-yard → RPN
  const output: Token[] = [];
  const opStack: Token[] = [];

  for (const t of processed) {
    switch (t.kind) {
      case 'num':
        output.push(t);
        break;

      case 'fn':
        opStack.push(t);
        break;

      case 'comma':
        while (opStack.length && opStack[opStack.length - 1].kind !== 'lp') {
          output.push(opStack.pop()!);
        }
        break;

      case 'op': {
        const o1 = OPS[t.value];
        while (opStack.length) {
          const top = opStack[opStack.length - 1];
          if (top.kind === 'lp' || top.kind === 'fn') break;
          const o2 = OPS[top.value];
          if (!o2) break;
          if ((o1.assoc === 'L' && o1.prec <= o2.prec) || (o1.assoc === 'R' && o1.prec < o2.prec)) {
            output.push(opStack.pop()!);
          } else break;
        }
        opStack.push(t);
        break;
      }

      case 'lp':
        opStack.push(t);
        break;

      case 'rp':
        while (opStack.length && opStack[opStack.length - 1].kind !== 'lp') {
          output.push(opStack.pop()!);
        }
        if (!opStack.length) throw new Error('Mismatched parentheses');
        opStack.pop(); // remove '('
        if (opStack.length && opStack[opStack.length - 1].kind === 'fn') {
          output.push(opStack.pop()!);
        }
        break;
    }
  }

  while (opStack.length) {
    const top = opStack.pop()!;
    if (top.kind === 'lp' || top.kind === 'rp') throw new Error('Mismatched parentheses');
    output.push(top);
  }

  // Evaluate RPN
  const stack: number[] = [];
  for (const t of output) {
    if (t.kind === 'num') {
      stack.push(parseFloat(t.value));
    } else if (t.kind === 'op') {
      if (t.value === 'NEG') {
        if (!stack.length) throw new Error('Invalid expression');
        stack.push(-stack.pop()!);
      } else {
        if (stack.length < 2) throw new Error('Invalid expression');
        const b = stack.pop()!;
        const a = stack.pop()!;
        stack.push(applyOp(t.value, a, b));
      }
    } else if (t.kind === 'fn') {
      if (!stack.length) throw new Error('Invalid expression');
      const arg = stack.pop()!;
      stack.push(applyFn(t.value, arg));
    }
  }

  if (stack.length !== 1) throw new Error('Invalid expression');
  return stack[0];
}

function applyOp(op: string, a: number, b: number): number {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b === 0 ? Infinity : a / b;
    case '%': return b === 0 ? NaN : a % b;
    case '^': return Math.pow(a, b);
    default: throw new Error(`Unknown operator: ${op}`);
  }
}

function applyFn(fn: string, x: number): number {
  switch (fn) {
    case 'sin':   return Math.sin(x);
    case 'cos':   return Math.cos(x);
    case 'tan':   return Math.tan(x);
    case 'asin':  return Math.asin(x);
    case 'acos':  return Math.acos(x);
    case 'atan':  return Math.atan(x);
    case 'sqrt':  return Math.sqrt(x);
    case 'abs':   return Math.abs(x);
    case 'log':   return Math.log10(x);
    case 'ln':    return Math.log(x);
    case 'log2':  return Math.log2(x);
    case 'exp':   return Math.exp(x);
    case 'ceil':  return Math.ceil(x);
    case 'floor': return Math.floor(x);
    case 'round': return Math.round(x);
    default: throw new Error(`Unknown function: ${fn}`);
  }
}

function formatNumber(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US');
  if (Math.abs(n) > 1e15 || (Math.abs(n) < 1e-6 && n !== 0)) return n.toExponential(6);
  return parseFloat(n.toFixed(10)).toString();
}
