import type { TextResult } from "../types";

export function process(
  input: string,
  options?: Record<string, unknown>
): TextResult {
  const text2 = (options?.input2 as string) ?? (options?.text2 as string) ?? "";

  const lines1 = input.split("\n");
  const lines2 = text2.split("\n");

  // Simple line-by-line diff using LCS
  const lcs = computeLCS(lines1, lines2);

  const result: string[] = [];
  let i = 0;
  let j = 0;
  let k = 0;
  let added = 0;
  let removed = 0;
  let unchanged = 0;

  while (i < lines1.length || j < lines2.length) {
    if (k < lcs.length && i < lines1.length && lines1[i] === lcs[k]) {
      if (j < lines2.length && lines2[j] === lcs[k]) {
        result.push(`  ${lcs[k]}`);
        unchanged++;
        i++;
        j++;
        k++;
      } else {
        result.push(`+ ${lines2[j]}`);
        added++;
        j++;
      }
    } else if (i < lines1.length && (k >= lcs.length || lines1[i] !== lcs[k])) {
      result.push(`- ${lines1[i]}`);
      removed++;
      i++;
    } else if (j < lines2.length) {
      result.push(`+ ${lines2[j]}`);
      added++;
      j++;
    }
  }

  return {
    output: result.join("\n"),
    stats: { added, removed, unchanged },
  };
}

function computeLCS(a: string[], b: string[]): string[] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const result: string[] = [];
  let i = m;
  let j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      result.unshift(a[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return result;
}
