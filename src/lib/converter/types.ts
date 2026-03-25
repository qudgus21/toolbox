export interface ConversionTableRow {
  label: string;
  value: string;
  unit?: string;
}

export interface ConverterResult {
  output: string;
  table?: ConversionTableRow[];
  preview?: string;
  stats?: Record<string, string | number | boolean>;
}

export type ConverterProcessor = (
  input: string,
  options?: Record<string, unknown>,
) => ConverterResult | Promise<ConverterResult>;
