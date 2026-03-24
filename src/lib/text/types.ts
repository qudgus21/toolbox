export interface TextResult {
  output: string;
  stats?: Record<string, string | number | boolean>;
}

export type TextProcessor = (
  input: string,
  options?: Record<string, unknown>
) => TextResult | Promise<TextResult>;
