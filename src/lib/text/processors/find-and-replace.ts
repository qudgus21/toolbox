import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const find = (options?.find as string) || "";
  const replace = (options?.replace as string) ?? "";
  const useRegex = (options?.useRegex as boolean) ?? false;
  const caseSensitive = (options?.caseSensitive as boolean) ?? false;
  const replaceAll = (options?.replaceAll as boolean) ?? true;

  if (!input || !find) {
    return { output: input || "", stats: { replacements: 0 } };
  }

  let replacements = 0;

  let output: string;
  if (useRegex) {
    try {
      const flags = (caseSensitive ? "" : "i") + (replaceAll ? "g" : "");
      const regex = new RegExp(find, flags);
      output = input.replace(regex, () => {
        replacements++;
        return replace;
      });
    } catch (e) {
      return {
        output: input,
        stats: { replacements: 0, error: `Invalid regex: ${(e as Error).message}` },
      };
    }
  } else {
    if (replaceAll) {
      const flags = caseSensitive ? "g" : "gi";
      const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, flags);
      output = input.replace(regex, () => {
        replacements++;
        return replace;
      });
    } else {
      const idx = caseSensitive
        ? input.indexOf(find)
        : input.toLowerCase().indexOf(find.toLowerCase());
      if (idx === -1) {
        output = input;
      } else {
        output = input.slice(0, idx) + replace + input.slice(idx + find.length);
        replacements = 1;
      }
    }
  }

  return {
    output,
    stats: { replacements },
  };
}
