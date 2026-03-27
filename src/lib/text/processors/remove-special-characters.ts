import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  // Support both boolean flags from UI and comma-separated string
  const keepSet = new Set<string>();
  if (options?.keepLetters !== undefined) {
    if (options.keepLetters !== false) keepSet.add("letters");
    if (options.keepNumbers !== false) keepSet.add("numbers");
    if (options.keepSpaces !== false) keepSet.add("spaces");
    if (options.keepLineBreaks === true) keepSet.add("newlines");
  } else {
    const keepStr = (options?.keep as string) || "letters,numbers,spaces";
    keepStr.split(",").map((s) => s.trim().toLowerCase()).forEach((s) => keepSet.add(s));
  }

  if (!input) return { output: "", stats: { removed: 0 } };

  let removed = 0;
  const output = Array.from(input)
    .filter((ch) => {
      if (keepSet.has("letters") && /\p{L}/u.test(ch)) return true;
      if (keepSet.has("numbers") && /\d/.test(ch)) return true;
      if (keepSet.has("spaces") && ch === " ") return true;
      if (keepSet.has("newlines") && (ch === "\n" || ch === "\r")) return true;
      if (keepSet.has("punctuation") && /\p{P}/u.test(ch)) return true;
      removed++;
      return false;
    })
    .join("");

  return {
    output,
    stats: { removed, kept: Array.from(keepSet).join(",") },
  };
}
