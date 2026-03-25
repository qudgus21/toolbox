import type { ConverterResult } from "../types";

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;
  let i = 0;

  while (i < line.length) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i += 2;
        } else {
          inQuotes = false;
          i++;
        }
      } else {
        current += ch;
        i++;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
        i++;
      } else if (ch === ",") {
        fields.push(current);
        current = "";
        i++;
      } else {
        current += ch;
        i++;
      }
    }
  }
  fields.push(current);
  return fields;
}

function toMarkdownTable(headers: string[], rows: string[][]): string {
  const colWidths = headers.map((h, i) => {
    let max = h.length;
    for (const row of rows) {
      if (row[i] && row[i].length > max) max = row[i].length;
    }
    return max;
  });

  const pad = (str: string, width: number) => str + " ".repeat(Math.max(0, width - str.length));

  const headerLine = "| " + headers.map((h, i) => pad(h, colWidths[i])).join(" | ") + " |";
  const separator = "| " + colWidths.map((w) => "-".repeat(w)).join(" | ") + " |";
  const dataLines = rows.map(
    (row) =>
      "| " +
      headers.map((_, i) => pad(row[i] || "", colWidths[i])).join(" | ") +
      " |",
  );

  return [headerLine, separator, ...dataLines].join("\n");
}

function toHtmlTable(headers: string[], rows: string[][]): string {
  const lines: string[] = ["<table>", "  <thead>", "    <tr>"];
  for (const h of headers) {
    lines.push(`      <th>${escapeHtml(h)}</th>`);
  }
  lines.push("    </tr>", "  </thead>", "  <tbody>");

  for (const row of rows) {
    lines.push("    <tr>");
    for (let i = 0; i < headers.length; i++) {
      lines.push(`      <td>${escapeHtml(row[i] || "")}</td>`);
    }
    lines.push("    </tr>");
  }

  lines.push("  </tbody>", "</table>");
  return lines.join("\n");
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input.trim();
  if (!trimmed) return { output: "" };

  const outputFormat = (options?.outputFormat as string) || "markdown";

  try {
    const lines = trimmed.split("\n").filter((l) => l.trim() !== "");
    if (lines.length === 0) return { output: "" };

    const headers = parseCsvLine(lines[0]);
    const rows = lines.slice(1).map(parseCsvLine);

    const output =
      outputFormat === "html"
        ? toHtmlTable(headers, rows)
        : toMarkdownTable(headers, rows);

    return {
      output,
      stats: { rows: rows.length, columns: headers.length },
    };
  } catch {
    return { output: "" };
  }
}
