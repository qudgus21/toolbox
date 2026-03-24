import type { TextResult } from "../types";

const CJK_REGEX =
  /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff\uac00-\ud7af\uff00-\uffef]/g;

export function process(
  input: string,
  _options?: Record<string, unknown>
): TextResult {
  const msg = (_options?._messages as Record<string, string>) ?? {};

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
        readingTime: `0 ${msg.sec ?? "sec"}`,
        speakingTime: `0 ${msg.sec ?? "sec"}`,
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

  const readingMinutes = words / 200;
  const speakingMinutes = words / 130;

  const secLabel = msg.sec ?? "sec";
  const minLabel = msg.min ?? "min";

  function formatTime(minutes: number): string {
    if (minutes < 1) {
      const seconds = Math.ceil(minutes * 60);
      return `${seconds} ${secLabel}`;
    }
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    if (secs === 0) return `${mins} ${minLabel}`;
    return `${mins} ${minLabel} ${secs} ${secLabel}`;
  }

  return {
    output: input,
    stats: {
      characters,
      charactersWithoutSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      readingTime: formatTime(readingMinutes),
      speakingTime: formatTime(speakingMinutes),
    },
  };
}
