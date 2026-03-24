import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const mode = (options?.mode as string) || "format";
  const indent = (options?.indent as number) ?? 2;
  const msg = (options?._messages as Record<string, string>) ?? {};

  if (!input || !input.trim()) {
    return { output: "", stats: { mode, valid: false, error: msg.noInput ?? "No input provided" } };
  }

  try {
    const parsed = JSON.parse(input);

    switch (mode) {
      case "minify": {
        const output = JSON.stringify(parsed);
        return {
          output,
          stats: {
            mode,
            valid: true,
            inputLength: input.length,
            outputLength: output.length,
            saved: input.length - output.length,
          },
        };
      }
      case "validate": {
        return {
          output: msg.validJson ?? "Valid JSON",
          stats: {
            mode,
            valid: true,
            type: Array.isArray(parsed) ? "array" : typeof parsed,
            ...(Array.isArray(parsed)
              ? { items: parsed.length }
              : typeof parsed === "object" && parsed !== null
                ? { keys: Object.keys(parsed).length }
                : {}),
          },
        };
      }
      case "format":
      default: {
        const output = JSON.stringify(parsed, null, indent);
        return {
          output,
          stats: {
            mode,
            valid: true,
            inputLength: input.length,
            outputLength: output.length,
          },
        };
      }
    }
  } catch (e) {
    const errorMessage = (e as Error).message;
    // Try to extract position info
    const posMatch = errorMessage.match(/position\s+(\d+)/i);
    const position = posMatch ? Number(posMatch[1]) : undefined;

    let contextInfo = "";
    if (position !== undefined && position < input.length) {
      const start = Math.max(0, position - 20);
      const end = Math.min(input.length, position + 20);
      contextInfo = `\nNear: ...${input.slice(start, position)}>>HERE<<${input.slice(position, end)}...`;
    }

    return {
      output: `${msg.invalidJson ?? "Invalid JSON"}: ${errorMessage}${contextInfo}`,
      stats: {
        mode,
        valid: false,
        error: errorMessage,
        ...(position !== undefined ? { errorPosition: position } : {}),
      },
    };
  }
}
