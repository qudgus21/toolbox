import type { TextResult } from "../types";

export function process(
  input: string,
  _options?: Record<string, unknown>
): TextResult {
  const msg = (_options?._messages as Record<string, string>) ?? {};

  if (!input) {
    return {
      output: "",
      stats: { totalLines: 0, uniqueLines: 0, duplicateLines: 0 },
    };
  }

  const lines = input.split("\n");
  const seen = new Map<string, number[]>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const positions = seen.get(line);
    if (positions) {
      positions.push(i + 1);
    } else {
      seen.set(line, [i + 1]);
    }
  }

  const duplicates = Array.from(seen.entries()).filter(
    ([, positions]) => positions.length > 1
  );

  const duplicateLineNumbers = new Set<number>();
  for (const [, positions] of duplicates) {
    for (const pos of positions) {
      duplicateLineNumbers.add(pos);
    }
  }

  const dupMarker = msg.dupMarker ?? "[DUP]";
  const outputLines = lines.map((line, i) => {
    const lineNum = i + 1;
    const marker = duplicateLineNumbers.has(lineNum) ? `${dupMarker} ` : " ".repeat(dupMarker.length + 1);
    return `${marker}${lineNum}: ${line}`;
  });

  const totalDuplicateLines = duplicateLineNumbers.size;
  const uniqueLines = seen.size;
  const duplicateGroups = duplicates.length;

  if (duplicates.length > 0) {
    const lblSummary = msg.dupSummary ?? "--- Duplicate Summary ---";
    const lblAppears = msg.dupAppears ?? "appears";
    const lblTimes = msg.dupTimes ?? "times";
    const lblLines = msg.dupLines ?? "lines";

    outputLines.push("");
    outputLines.push(lblSummary);
    for (const [line, positions] of duplicates) {
      const display = line.length > 60 ? line.slice(0, 57) + "..." : line;
      outputLines.push(
        `"${display}" ${lblAppears} ${positions.length} ${lblTimes} (${lblLines}: ${positions.join(", ")})`
      );
    }
  }

  return {
    output: outputLines.join("\n"),
    stats: {
      totalLines: lines.length,
      uniqueLines,
      duplicateLines: totalDuplicateLines,
      duplicateGroups,
    },
  };
}
