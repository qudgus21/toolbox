import type { TextResult } from "../types";

const CJK_REGEX =
  /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff\uac00-\ud7af\uff00-\uffef]/g;

export function process(
  input: string,
  _options?: Record<string, unknown>
): TextResult {
  if (!input) {
    return {
      output: input,
      stats: {
        characters: 0,
        charactersWithoutSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 0,
      },
    };
  }

  const characters = input.length;
  const charactersWithoutSpaces = input.replace(/\s/g, "").length;

  // Word count: split on whitespace for Latin, count each CJK char as a word
  const withoutCjk = input.replace(CJK_REGEX, " ");
  const latinWords = withoutCjk
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  const cjkChars = (input.match(CJK_REGEX) || []).length;
  const words = latinWords + cjkChars;

  const sentences = input
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0).length;
  const paragraphs = input
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0).length;
  const lines = input.split(/\n/).length;

  return {
    output: input,
    stats: {
      characters,
      charactersWithoutSpaces,
      words,
      sentences,
      paragraphs,
      lines,
    },
  };
}
