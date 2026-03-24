import type { TextResult } from "../types";

const WORD_BANK = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing",
  "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore",
  "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam",
  "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi",
  "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure",
  "in", "reprehenderit", "voluptate", "velit", "esse", "cillum",
  "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat",
  "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "semper",
  "risus", "viverra", "maecenas", "accumsan", "lacus", "vel", "facilisis",
  "volutpat", "donec", "pretium", "vulputate", "sapien", "nec",
  "sagittis", "aliquam", "malesuada", "bibendum", "arcu", "vitae",
  "elementum", "curabitur", "felis", "nunc", "blandit", "turpis",
  "cursus", "ornare", "massa", "eget", "egestas", "purus",
  "faucibus", "nisl", "tincidunt", "praesent", "integer", "feugiat",
  "scelerisque", "varius", "morbi", "quisque", "pellentesque",
  "habitant", "tristique", "senectus", "netus", "porta", "leo",
];

const FIRST_SENTENCE =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export function process(
  _input: string,
  options?: Record<string, unknown>
): TextResult {
  const paragraphs = Math.max(1, (options?.paragraphs as number) ?? 3);
  const wordsPerParagraph = Math.max(10, (options?.wordsPerParagraph as number) ?? 50);

  const result: string[] = [];

  for (let p = 0; p < paragraphs; p++) {
    if (p === 0) {
      // First paragraph starts with the classic sentence
      const remainingWords = Math.max(0, wordsPerParagraph - 19); // ~19 words in first sentence
      const rest = generateSentences(remainingWords);
      result.push(FIRST_SENTENCE + (rest ? " " + rest : ""));
    } else {
      result.push(generateSentences(wordsPerParagraph));
    }
  }

  const output = result.join("\n\n");

  return {
    output,
    stats: { paragraphs, wordsPerParagraph },
  };
}

function randomWord(): string {
  return WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
}

function generateSentences(wordCount: number): string {
  if (wordCount <= 0) return "";

  const sentences: string[] = [];
  let remaining = wordCount;

  while (remaining > 0) {
    const sentenceLen = Math.min(
      remaining,
      Math.floor(Math.random() * 10) + 5
    );
    const words: string[] = [];
    for (let i = 0; i < sentenceLen; i++) {
      words.push(randomWord());
    }
    // Capitalize first word
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    // Add comma randomly in longer sentences
    if (sentenceLen > 6 && Math.random() > 0.5) {
      const commaPos = Math.floor(sentenceLen / 2);
      words[commaPos] = words[commaPos] + ",";
    }
    sentences.push(words.join(" ") + ".");
    remaining -= sentenceLen;
  }

  return sentences.join(" ");
}
