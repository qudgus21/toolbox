import type { ConverterResult } from "../types";

function escapeCsvField(field: string): string {
  if (field.includes(",") || field.includes('"') || field.includes("\n")) {
    return '"' + field.replace(/"/g, '""') + '"';
  }
  return field;
}

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

function detectDirection(input: string): "jsonToCsv" | "csvToJson" {
  try {
    const parsed = JSON.parse(input);
    if (Array.isArray(parsed)) return "jsonToCsv";
  } catch {
    // not JSON
  }
  return "csvToJson";
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input.trim();
  if (!trimmed) return { output: "" };

  const direction =
    (options?.direction as string) || detectDirection(trimmed);

  try {
    if (direction === "jsonToCsv") {
      const data = JSON.parse(trimmed);
      if (!Array.isArray(data) || data.length === 0) return { output: "" };

      const headers = Object.keys(data[0]);
      const lines: string[] = [headers.map(escapeCsvField).join(",")];

      for (const row of data) {
        const values = headers.map((h) => {
          const val = row[h];
          if (val === null || val === undefined) return "";
          return escapeCsvField(String(val));
        });
        lines.push(values.join(","));
      }

      const output = lines.join("\n");
      return {
        output,
        stats: { rows: data.length, columns: headers.length },
      };
    } else {
      const lines = trimmed.split("\n").filter((l) => l.trim() !== "");
      if (lines.length < 2) return { output: "" };

      const headers = parseCsvLine(lines[0]);
      const rows: Record<string, string>[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = parseCsvLine(lines[i]);
        const row: Record<string, string> = {};
        for (let j = 0; j < headers.length; j++) {
          row[headers[j]] = values[j] ?? "";
        }
        rows.push(row);
      }

      const output = JSON.stringify(rows, null, 2);
      return {
        output,
        stats: { rows: rows.length, columns: headers.length },
      };
    }
  } catch {
    return { output: "" };
  }
}
