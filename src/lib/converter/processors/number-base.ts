import type { ConverterResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input?.trim();
  if (!trimmed) return { output: "" };

  const fromBase = parseInt(String(options?.fromBase ?? "10"), 10);
  const toBase = parseInt(String(options?.toBase ?? "2"), 10);

  if (fromBase < 2 || fromBase > 36 || toBase < 2 || toBase > 36) {
    return { output: "" };
  }

  try {
    let normalized = trimmed;
    let effectiveFromBase = fromBase;

    // Detect prefix formats and override fromBase
    if (/^0b[01]+$/i.test(normalized)) {
      normalized = normalized.slice(2);
      effectiveFromBase = 2;
    } else if (/^0o[0-7]+$/i.test(normalized)) {
      normalized = normalized.slice(2);
      effectiveFromBase = 8;
    } else if (/^0x[0-9a-f]+$/i.test(normalized)) {
      normalized = normalized.slice(2);
      effectiveFromBase = 16;
    }

    // Validate characters for the given base
    const validChars = "0123456789abcdefghijklmnopqrstuvwxyz".slice(
      0,
      effectiveFromBase,
    );
    const regex = new RegExp(`^[${validChars}]+$`, "i");
    if (!regex.test(normalized)) {
      return { output: "" };
    }

    const decimal = parseInt(normalized, effectiveFromBase);
    if (isNaN(decimal) || decimal < 0) return { output: "" };

    const result = decimal.toString(toBase).toUpperCase();

    const table = [
      { label: "Binary (2)", value: decimal.toString(2) },
      { label: "Octal (8)", value: decimal.toString(8) },
      { label: "Decimal (10)", value: decimal.toString(10) },
      {
        label: "Hexadecimal (16)",
        value: decimal.toString(16).toUpperCase(),
      },
    ];

    // Add the target base if it's not one of the standard ones
    if (![2, 8, 10, 16].includes(toBase)) {
      table.push({
        label: `Base ${toBase}`,
        value: decimal.toString(toBase).toUpperCase(),
      });
    }

    return {
      output: result,
      table,
      stats: {
        inputBase: effectiveFromBase,
        outputBase: toBase,
        decimalValue: decimal,
      },
    };
  } catch {
    return { output: "" };
  }
}
