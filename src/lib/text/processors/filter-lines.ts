import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const pattern = (options?.pattern as string) || "";
  const mode = (options?.mode as string) || "include";
  const useRegex = (options?.useRegex as boolean) ?? false;
  const caseSensitive = (options?.caseSensitive as boolean) ?? false;
  const msg = (options?._messages as Record<string, string>) ?? {};

  if (!input) return { output: "", stats: { before: 0, after: 0 } };
  if (!pattern) return { output: input, stats: { before: input.split("\n").length, after: input.split("\n").length } };

  const lines = input.split("\n");

  let matcher: (line: string) => boolean;
  if (useRegex) {
    try {
      const flags = caseSensitive ? "" : "i";
      const regex = new RegExp(pattern, flags);
      matcher = (line) => regex.test(line);
    } catch {
      return {
        output: input,
        stats: { before: lines.length, after: lines.length, error: msg.invalidRegexPattern ?? "Invalid regex pattern." },
      };
    }
  } else {
    const search = caseSensitive ? pattern : pattern.toLowerCase();
    matcher = (line) => {
      const target = caseSensitive ? line : line.toLowerCase();
      return target.includes(search);
    };
  }

  const filtered =
    mode === "include"
      ? lines.filter(matcher)
      : lines.filter((line) => !matcher(line));

  return {
    output: filtered.join("\n"),
    stats: {
      before: lines.length,
      after: filtered.length,
      filtered: lines.length - filtered.length,
    },
  };
}
