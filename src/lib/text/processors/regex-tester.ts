import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const pattern = (options?.pattern as string) || "";
  const flags = (options?.flags as string) || "g";
  const msg = (options?._messages as Record<string, string>) ?? {};

  if (!input || !pattern) {
    return {
      output: pattern
        ? (msg.noInput ?? "No input text provided.")
        : (msg.noPattern ?? "No regex pattern provided."),
      stats: { matchCount: 0 },
    };
  }

  let regex: RegExp;
  try {
    regex = new RegExp(pattern, flags);
  } catch (e) {
    return {
      output: `${msg.invalidRegex ?? "Invalid regex"}: ${(e as Error).message}`,
      stats: { matchCount: 0, error: (e as Error).message },
    };
  }

  const lineLabel = msg.matchLine ?? "Line";
  const positionLabel = msg.matchPosition ?? "Position";
  const groupsLabel = msg.matchGroups ?? "Groups";

  const lines = input.split("\n");
  const matches: string[] = [];
  const results: string[] = [];

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    // Reset lastIndex for each line if global flag
    regex.lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(line)) !== null) {
      matches.push(match[0]);
      results.push(
        `${lineLabel} ${lineIdx + 1}, ${positionLabel} ${match.index}: "${match[0]}"${
          match.length > 1
            ? ` ${groupsLabel}: [${match.slice(1).map((g) => `"${g ?? ""}"`).join(", ")}]`
            : ""
        }`
      );
      // Avoid infinite loop on zero-length matches
      if (match[0].length === 0) regex.lastIndex++;
      // If not global, break after first match per line
      if (!flags.includes("g")) break;
    }
  }

  const matchesFoundLabel = msg.matchesFound ?? "matches found";
  const noMatchesLabel = msg.noMatches ?? "No matches found.";

  const header =
    matches.length > 0
      ? `${matches.length} ${matchesFoundLabel} for /${pattern}/${flags}:`
      : `${noMatchesLabel} /${pattern}/${flags}`;

  return {
    output: [header, "", ...results].join("\n"),
    stats: { matchCount: matches.length },
  };
}
