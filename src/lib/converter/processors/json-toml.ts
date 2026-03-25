import type { ConverterResult } from "../types";

function tomlStringify(data: unknown, prefix: string = ""): string {
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return "";
  }

  const lines: string[] = [];
  const obj = data as Record<string, unknown>;
  const simpleEntries: [string, unknown][] = [];
  const tableEntries: [string, Record<string, unknown>][] = [];
  const arrayOfTableEntries: [string, Record<string, unknown>[]][] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      tableEntries.push([key, value as Record<string, unknown>]);
    } else if (
      Array.isArray(value) &&
      value.length > 0 &&
      typeof value[0] === "object" &&
      value[0] !== null &&
      !Array.isArray(value[0])
    ) {
      arrayOfTableEntries.push([
        key,
        value as Record<string, unknown>[],
      ]);
    } else {
      simpleEntries.push([key, value]);
    }
  }

  for (const [key, value] of simpleEntries) {
    lines.push(`${tomlKey(key)} = ${tomlValue(value)}`);
  }

  for (const [key, value] of tableEntries) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    lines.push("");
    lines.push(`[${fullKey}]`);
    lines.push(tomlStringify(value, fullKey));
  }

  for (const [key, items] of arrayOfTableEntries) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    for (const item of items) {
      lines.push("");
      lines.push(`[[${fullKey}]]`);
      lines.push(tomlStringify(item, fullKey));
    }
  }

  return lines.filter((l, i) => !(i === 0 && l === "")).join("\n");
}

function tomlKey(key: string): string {
  if (/^[a-zA-Z0-9_-]+$/.test(key)) return key;
  return JSON.stringify(key);
}

function tomlValue(value: unknown): string {
  if (value === null || value === undefined) return '""';
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  if (Array.isArray(value)) {
    return "[" + value.map(tomlValue).join(", ") + "]";
  }
  return JSON.stringify(String(value));
}

function tomlParse(toml: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const lines = toml.split("\n");
  let currentTable: Record<string, unknown> = result;
  let currentPath: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line === "" || line.startsWith("#")) continue;

    // Array of tables [[key]]
    const arrayMatch = line.match(/^\[\[(.+)\]\]$/);
    if (arrayMatch) {
      const path = parsePath(arrayMatch[1]);
      const parent = ensurePath(result, path.slice(0, -1));
      const lastKey = path[path.length - 1];
      if (!Array.isArray(parent[lastKey])) {
        parent[lastKey] = [];
      }
      const newTable: Record<string, unknown> = {};
      (parent[lastKey] as unknown[]).push(newTable);
      currentTable = newTable;
      currentPath = path;
      continue;
    }

    // Table [key]
    const tableMatch = line.match(/^\[(.+)\]$/);
    if (tableMatch) {
      const path = parsePath(tableMatch[1]);
      currentTable = ensurePath(result, path);
      currentPath = path;
      continue;
    }

    // Key = Value
    const kvMatch = line.match(/^([^\s=]+(?:\s*\.\s*[^\s=]+)*)\s*=\s*(.+)$/);
    if (kvMatch) {
      const key = kvMatch[1].trim().replace(/^"|"$/g, "");
      const rawVal = kvMatch[2].trim();
      currentTable[key] = parseTomlValue(rawVal);
    }
  }

  return result;
}

function parsePath(pathStr: string): string[] {
  return pathStr.split(".").map((p) => p.trim().replace(/^"|"$/g, ""));
}

function ensurePath(
  root: Record<string, unknown>,
  path: string[],
): Record<string, unknown> {
  let current = root;
  for (const key of path) {
    if (!(key in current) || typeof current[key] !== "object" || current[key] === null) {
      current[key] = {};
    }
    const val = current[key];
    if (Array.isArray(val)) {
      current = val[val.length - 1] as Record<string, unknown>;
    } else {
      current = val as Record<string, unknown>;
    }
  }
  return current;
}

function parseTomlValue(raw: string): unknown {
  if (raw === "true") return true;
  if (raw === "false") return false;

  // String
  if (
    (raw.startsWith('"') && raw.endsWith('"')) ||
    (raw.startsWith("'") && raw.endsWith("'"))
  ) {
    return raw.slice(1, -1).replace(/\\n/g, "\n").replace(/\\"/g, '"');
  }

  // Array
  if (raw.startsWith("[") && raw.endsWith("]")) {
    const inner = raw.slice(1, -1).trim();
    if (inner === "") return [];
    return splitTomlArray(inner).map((v) => parseTomlValue(v.trim()));
  }

  // Number
  const num = Number(raw);
  if (!isNaN(num) && raw !== "") return num;

  return raw;
}

function splitTomlArray(inner: string): string[] {
  const parts: string[] = [];
  let current = "";
  let depth = 0;
  let inString = false;
  let strChar = "";

  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i];
    if (inString) {
      current += ch;
      if (ch === strChar && inner[i - 1] !== "\\") inString = false;
    } else if (ch === '"' || ch === "'") {
      inString = true;
      strChar = ch;
      current += ch;
    } else if (ch === "[") {
      depth++;
      current += ch;
    } else if (ch === "]") {
      depth--;
      current += ch;
    } else if (ch === "," && depth === 0) {
      parts.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  if (current.trim()) parts.push(current);
  return parts;
}

function countKeys(obj: unknown): number {
  if (typeof obj !== "object" || obj === null) return 0;
  if (Array.isArray(obj)) return obj.reduce((sum, item) => sum + countKeys(item), 0);
  let count = 0;
  for (const val of Object.values(obj as Record<string, unknown>)) {
    count++;
    if (typeof val === "object" && val !== null) {
      count += countKeys(val);
    }
  }
  return count;
}

function detectDirection(input: string): "jsonToToml" | "tomlToJson" {
  try {
    JSON.parse(input);
    return "jsonToToml";
  } catch {
    return "tomlToJson";
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

  try {
    if (direction === "jsonToToml") {
      const data = JSON.parse(trimmed);
      const output = tomlStringify(data);
      return {
        output,
        stats: { keys: countKeys(data) },
      };
    } else {
      const data = tomlParse(trimmed);
      const output = JSON.stringify(data, null, 2);
      return {
        output,
        stats: { keys: countKeys(data) },
      };
    }
  } catch {
    return { output: "" };
  }
}
