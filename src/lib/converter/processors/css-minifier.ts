import type { ConverterResult } from "../types";

function minifyCss(css: string): string {
  let result = css;

  // Remove comments
  result = result.replace(/\/\*[\s\S]*?\*\//g, "");

  // Remove newlines and extra whitespace
  result = result.replace(/\s+/g, " ");

  // Remove spaces around special characters
  result = result.replace(/\s*{\s*/g, "{");
  result = result.replace(/\s*}\s*/g, "}");
  result = result.replace(/\s*;\s*/g, ";");
  result = result.replace(/\s*:\s*/g, ":");
  result = result.replace(/\s*,\s*/g, ",");

  // Remove last semicolon before closing brace
  result = result.replace(/;}/g, "}");

  // Remove leading/trailing whitespace
  result = result.trim();

  return result;
}

function beautifyCss(css: string): string {
  // First minify to normalize
  let result = minifyCss(css);

  // Add newline after {
  result = result.replace(/\{/g, " {\n");

  // Add newline and indent after ;
  result = result.replace(/;/g, ";\n");

  // Add newline before }
  result = result.replace(/\}/g, "\n}\n");

  // Indent properties
  const lines = result.split("\n");
  let indent = 0;
  const formatted: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line === "}") {
      indent = Math.max(0, indent - 1);
      formatted.push("  ".repeat(indent) + line);
    } else if (line.endsWith("{")) {
      formatted.push("  ".repeat(indent) + line);
      indent++;
    } else {
      formatted.push("  ".repeat(indent) + line);
    }
  }

  return formatted.join("\n");
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input.trim();
  if (!trimmed) return { output: "" };

  const mode = (options?.mode as string) || "minify";

  try {
    const output = mode === "beautify" ? beautifyCss(trimmed) : minifyCss(trimmed);
    const originalSize = trimmed.length;
    const resultSize = output.length;
    const savings =
      originalSize > 0
        ? ((originalSize - resultSize) / originalSize * 100).toFixed(1) + "%"
        : "0%";

    return {
      output,
      stats: { originalSize, resultSize, savings },
    };
  } catch {
    return { output: "" };
  }
}
