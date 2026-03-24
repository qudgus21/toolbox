import type { TextResult } from "../types";

export function process(
  input: string,
  _options?: Record<string, unknown>
): TextResult {
  if (!input) {
    return {
      output: input,
      stats: {
        totalCharacters: 0,
        charactersWithoutSpaces: 0,
        bytes: 0,
        letters: 0,
        digits: 0,
        spaces: 0,
        punctuation: 0,
        lines: 0,
      },
    };
  }

  const totalCharacters = input.length;
  const charactersWithoutSpaces = input.replace(/\s/g, "").length;
  const bytes = new TextEncoder().encode(input).length;
  const letters = (input.match(/\p{L}/gu) || []).length;
  const digits = (input.match(/\d/g) || []).length;
  const spaces = (input.match(/ /g) || []).length;
  const punctuation = (input.match(/[^\w\s]/g) || []).length;
  const lines = input.split(/\n/).length;

  return {
    output: input,
    stats: {
      totalCharacters,
      charactersWithoutSpaces,
      bytes,
      letters,
      digits,
      spaces,
      punctuation,
      lines,
    },
  };
}
