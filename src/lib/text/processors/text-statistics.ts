import type { TextResult } from "../types";

export function process(
  input: string,
  _options?: Record<string, unknown>
): TextResult {
  const msg = (_options?._messages as Record<string, string>) ?? {};

  if (!input || !input.trim()) {
    return {
      output: msg.noInput ?? "No text provided for analysis.",
      stats: { words: 0 },
    };
  }

  const words = input
    .split(/\s+/)
    .filter((w) => w.length > 0)
    .map((w) => w.replace(/[^\p{L}\p{N}'-]/gu, "").toLowerCase())
    .filter((w) => w.length > 0);

  const wordCount = words.length;
  const uniqueWords = new Set(words);
  const uniqueWordCount = uniqueWords.size;

  const avgWordLength =
    wordCount > 0
      ? (words.reduce((sum, w) => sum + w.length, 0) / wordCount).toFixed(2)
      : "0";

  const longestWord =
    words.length > 0
      ? words.reduce((a, b) => (a.length >= b.length ? a : b))
      : "";
  const shortestWord =
    words.length > 0
      ? words.reduce((a, b) => (a.length <= b.length ? a : b))
      : "";

  // Frequency
  const freq = new Map<string, number>();
  for (const w of words) {
    freq.set(w, (freq.get(w) || 0) + 1);
  }
  const topWords = Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Sentences
  const sentences = input
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0);
  const sentenceCount = sentences.length;
  const avgSentenceLength =
    sentenceCount > 0 ? (wordCount / sentenceCount).toFixed(2) : "0";

  // Build report (i18n)
  const lbl = {
    reportTitle: msg.statsReportTitle ?? "=== Text Statistics Report ===",
    words: msg.statsWords ?? "Words",
    uniqueWords: msg.statsUniqueWords ?? "Unique words",
    avgWordLength: msg.statsAvgWordLength ?? "Average word length",
    characters: msg.statsCharacters ?? "characters",
    longestWord: msg.statsLongestWord ?? "Longest word",
    shortestWord: msg.statsShortestWord ?? "Shortest word",
    chars: msg.statsChars ?? "chars",
    sentences: msg.statsSentences ?? "Sentences",
    avgSentenceLength: msg.statsAvgSentenceLength ?? "Average sentence length",
    wordsUnit: msg.statsWordsUnit ?? "words",
    topFrequentWords: msg.statsTopFrequentWords ?? "--- Top 10 Most Frequent Words ---",
    times: msg.statsTimes ?? "times",
  };

  const lines: string[] = [
    lbl.reportTitle,
    "",
    `${lbl.words}: ${wordCount}`,
    `${lbl.uniqueWords}: ${uniqueWordCount}`,
    `${lbl.avgWordLength}: ${avgWordLength} ${lbl.characters}`,
    `${lbl.longestWord}: "${longestWord}" (${longestWord.length} ${lbl.chars})`,
    `${lbl.shortestWord}: "${shortestWord}" (${shortestWord.length} ${lbl.chars})`,
    "",
    `${lbl.sentences}: ${sentenceCount}`,
    `${lbl.avgSentenceLength}: ${avgSentenceLength} ${lbl.wordsUnit}`,
    "",
    lbl.topFrequentWords,
    ...topWords.map(
      ([word, count], i) =>
        `${i + 1}. "${word}" - ${count} ${count > 1 ? lbl.times : lbl.times}`
    ),
  ];

  return {
    output: lines.filter((l, i) => i === 0 || l !== "" || lines[i - 1] !== "").join("\n"),
    stats: {
      words: wordCount,
      uniqueWords: uniqueWordCount,
      avgWordLength,
      longestWord,
      shortestWord,
      sentences: sentenceCount,
      avgSentenceLength,
    },
  };
}

