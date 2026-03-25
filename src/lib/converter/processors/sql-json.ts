import type { ConverterResult } from "../types";

function parseSqlInsert(sql: string): { table: string; rows: Record<string, string>[] } | null {
  const rows: Record<string, string>[] = [];
  let tableName = "";

  // Match INSERT INTO statements
  const insertRegex = /INSERT\s+INTO\s+[`"']?(\w+)[`"']?\s*\(([^)]+)\)\s*VALUES\s*([\s\S]+?)(?:;|$)/gi;
  let match: RegExpExecArray | null;

  while ((match = insertRegex.exec(sql)) !== null) {
    tableName = match[1];
    const columns = match[2].split(",").map((c) => c.trim().replace(/[`"']/g, ""));
    const valuesStr = match[3];

    // Parse multiple value groups: (val1, val2), (val3, val4)
    const valueGroupRegex = /\(([^)]+)\)/g;
    let valueMatch: RegExpExecArray | null;

    while ((valueMatch = valueGroupRegex.exec(valuesStr)) !== null) {
      const values = splitValues(valueMatch[1]);
      const row: Record<string, string> = {};
      for (let i = 0; i < columns.length; i++) {
        let val = values[i]?.trim() ?? "";
        // Strip quotes
        if (
          (val.startsWith("'") && val.endsWith("'")) ||
          (val.startsWith('"') && val.endsWith('"'))
        ) {
          val = val.slice(1, -1);
        }
        if (val.toUpperCase() === "NULL") {
          row[columns[i]] = "";
        } else {
          row[columns[i]] = val;
        }
      }
      rows.push(row);
    }
  }

  if (rows.length === 0) return null;
  return { table: tableName, rows };
}

function splitValues(valuesStr: string): string[] {
  const result: string[] = [];
  let current = "";
  let inString = false;
  let strChar = "";

  for (let i = 0; i < valuesStr.length; i++) {
    const ch = valuesStr[i];
    if (inString) {
      current += ch;
      if (ch === strChar && valuesStr[i - 1] !== "\\") {
        inString = false;
      }
    } else if (ch === "'" || ch === '"') {
      inString = true;
      strChar = ch;
      current += ch;
    } else if (ch === ",") {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

function jsonToSql(
  data: Record<string, unknown>[],
  tableName: string,
): string {
  if (data.length === 0) return "";

  const columns = Object.keys(data[0]);
  const lines: string[] = [];

  for (const row of data) {
    const values = columns.map((col) => {
      const val = row[col];
      if (val === null || val === undefined || val === "") return "NULL";
      if (typeof val === "number") return String(val);
      if (typeof val === "boolean") return val ? "1" : "0";
      return "'" + String(val).replace(/'/g, "''") + "'";
    });

    lines.push(
      `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${values.join(", ")});`,
    );
  }

  return lines.join("\n");
}

function detectDirection(input: string): "sqlToJson" | "jsonToSql" {
  const trimmed = input.trim().toUpperCase();
  if (trimmed.startsWith("INSERT")) return "sqlToJson";
  try {
    JSON.parse(input);
    return "jsonToSql";
  } catch {
    return "sqlToJson";
  }
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input.trim();
  if (!trimmed) return { output: "" };

  const direction =
    (options?.direction as string) || detectDirection(trimmed);
  const tableName = (options?.tableName as string) || "data";

  try {
    if (direction === "sqlToJson") {
      const result = parseSqlInsert(trimmed);
      if (!result || result.rows.length === 0) return { output: "" };
      const output = JSON.stringify(result.rows, null, 2);
      return {
        output,
        stats: { rows: result.rows.length },
      };
    } else {
      const data = JSON.parse(trimmed);
      if (!Array.isArray(data) || data.length === 0) return { output: "" };
      const output = jsonToSql(data, tableName);
      return {
        output,
        stats: { rows: data.length },
      };
    }
  } catch {
    return { output: "" };
  }
}
