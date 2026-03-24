import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const direction = (options?.direction as string) || "asc";
  const caseSensitive = (options?.caseSensitive as boolean) ?? false;
  const removeBlanks = (options?.removeBlanks as boolean) ?? false;

  if (!input) return { output: "", stats: { direction } };

  let lines = input.split("\n");

  if (removeBlanks) {
    lines = lines.filter((l) => l.trim().length > 0);
  }

  const compare = (a: string, b: string): number => {
    const va = caseSensitive ? a : a.toLowerCase();
    const vb = caseSensitive ? b : b.toLowerCase();
    return va.localeCompare(vb);
  };

  switch (direction) {
    case "asc":
      lines.sort(compare);
      break;
    case "desc":
      lines.sort((a, b) => -compare(a, b));
      break;
    case "random":
      for (let i = lines.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lines[i], lines[j]] = [lines[j], lines[i]];
      }
      break;
    case "length":
    case "length-asc":
      lines.sort((a, b) => a.length - b.length || compare(a, b));
      break;
    case "length-desc":
      lines.sort((a, b) => b.length - a.length || compare(a, b));
      break;
    case "numeric":
      lines.sort((a, b) => {
        const na = parseFloat(a) || 0;
        const nb = parseFloat(b) || 0;
        return na - nb;
      });
      break;
  }

  return {
    output: lines.join("\n"),
    stats: { direction, lineCount: lines.length },
  };
}
