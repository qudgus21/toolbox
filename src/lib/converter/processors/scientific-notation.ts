import type { ConverterResult } from "../types";

function isScientific(input: string): boolean {
  return /^-?[\d.]+\s*[eE]\s*[+-]?\d+$/.test(input);
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input?.trim();
  if (!trimmed) return { output: "" };

  try {
    const direction =
      (options?.direction as string) ??
      (isScientific(trimmed) ? "toStandard" : "toScientific");

    if (direction === "toStandard") {
      const num = parseFloat(trimmed);
      if (isNaN(num) || !isFinite(num)) return { output: "" };

      const standard = num.toLocaleString("fullwide", {
        useGrouping: false,
        maximumFractionDigits: 20,
      });

      return {
        output: standard,
        table: [
          { label: "Scientific", value: num.toExponential() },
          { label: "Standard", value: standard },
          {
            label: "Engineering",
            value: toEngineering(num),
          },
        ],
        stats: { scientific: num.toExponential(), standard },
      };
    } else {
      const num = parseFloat(trimmed);
      if (isNaN(num) || !isFinite(num)) return { output: "" };

      const scientific = num.toExponential();
      const standard = num.toLocaleString("fullwide", {
        useGrouping: false,
        maximumFractionDigits: 20,
      });

      return {
        output: scientific,
        table: [
          { label: "Standard", value: standard },
          { label: "Scientific", value: scientific },
          {
            label: "Engineering",
            value: toEngineering(num),
          },
        ],
        stats: { standard, scientific },
      };
    }
  } catch {
    return { output: "" };
  }
}

function toEngineering(num: number): string {
  if (num === 0) return "0e+0";
  const exp = Math.floor(Math.log10(Math.abs(num)));
  const engExp = exp - ((exp % 3) + 3) % 3 + (exp >= 0 ? 0 : 0);
  const adjustedExp = Math.floor(exp / 3) * 3;
  const mantissa = num / Math.pow(10, adjustedExp);
  const mantissaStr =
    mantissa === Math.floor(mantissa)
      ? String(mantissa)
      : mantissa.toPrecision(6).replace(/0+$/, "").replace(/\.$/, "");
  return `${mantissaStr}e+${adjustedExp}`;
}
