export interface CalculatorTableRow {
  label: string;
  value: string;
  unit?: string;
}

export interface CalculatorBreakdownRow {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface CalculatorResult {
  output: string;
  table?: CalculatorTableRow[];
  breakdown?: CalculatorBreakdownRow[];
  preview?: string;
  stats?: Record<string, string | number | boolean>;
}

export type CalculatorProcessor = (
  fields: Record<string, unknown>,
  options?: Record<string, unknown>,
) => CalculatorResult | Promise<CalculatorResult>;
