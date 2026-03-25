import type { ConverterResult } from "../types";

function yamlStringify(data: unknown, indent: number = 0): string {
  const prefix = "  ".repeat(indent);

  if (data === null || data === undefined) return "null";
  if (typeof data === "boolean") return data ? "true" : "false";
  if (typeof data === "number") return String(data);
  if (typeof data === "string") {
    if (data.includes("\n")) {
      const lines = data.split("\n");
      return "|\n" + lines.map((l) => prefix + "  " + l).join("\n");
    }
    if (
      data === "" ||
      data === "true" ||
      data === "false" ||
      data === "null" ||
      /^[\d.]+$/.test(data) ||
      /[:#{}[\],&*?|>!%@`]/.test(data) ||
      data.startsWith(" ") ||
      data.endsWith(" ")
    ) {
      return JSON.stringify(data);
    }
    return data;
  }

  if (Array.isArray(data)) {
    if (data.length === 0) return "[]";
    const lines: string[] = [];
    for (const item of data) {
      if (
        typeof item === "object" &&
        item !== null &&
        !Array.isArray(item)
      ) {
        const entries = Object.entries(item);
        if (entries.length > 0) {
          const [firstKey, firstVal] = entries[0];
          lines.push(
            `${prefix}- ${firstKey}: ${yamlStringify(firstVal, indent + 2)}`,
          );
          for (let i = 1; i < entries.length; i++) {
            const [k, v] = entries[i];
            lines.push(
              `${prefix}  ${k}: ${yamlStringify(v, indent + 2)}`,
            );
          }
        } else {
          lines.push(`${prefix}- {}`);
        }
      } else {
        lines.push(`${prefix}- ${yamlStringify(item, indent + 1)}`);
      }
    }
    return "\n" + lines.join("\n");
  }

  if (typeof data === "object") {
    const entries = Object.entries(data as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    const lines: string[] = [];
    for (const [key, val] of entries) {
      const safeKey = /[:#{}[\],&*?|>!%@`\s]/.test(key)
        ? JSON.stringify(key)
        : key;
      if (
        typeof val === "object" &&
        val !== null &&
        !Array.isArray(val) &&
        Object.keys(val).length > 0
      ) {
        lines.push(`${prefix}${safeKey}:`);
        lines.push(yamlStringify(val, indent + 1));
      } else if (Array.isArray(val)) {
        lines.push(`${prefix}${safeKey}:${yamlStringify(val, indent + 1)}`);
      } else {
        lines.push(`${prefix}${safeKey}: ${yamlStringify(val, indent + 1)}`);
      }
    }
    return lines.join("\n");
  }

  return String(data);
}

function yamlParse(yaml: string): unknown {
  const lines = yaml.split("\n");
  let pos = 0;

  function peekIndent(): number {
    while (pos < lines.length && lines[pos].trim() === "") pos++;
    if (pos >= lines.length) return -1;
    const match = lines[pos].match(/^(\s*)/);
    return match ? match[1].length : 0;
  }

  function parseValue(raw: string): unknown {
    const trimmed = raw.trim();
    if (trimmed === "" || trimmed === "null" || trimmed === "~") return null;
    if (trimmed === "true") return true;
    if (trimmed === "false") return false;
    if (trimmed === "[]") return [];
    if (trimmed === "{}") return {};
    if (
      (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
      return trimmed.slice(1, -1);
    }
    const num = Number(trimmed);
    if (!isNaN(num) && trimmed !== "") return num;
    return trimmed;
  }

  function parseBlock(minIndent: number): unknown {
    while (pos < lines.length && lines[pos].trim() === "") pos++;
    if (pos >= lines.length) return null;

    const currentLine = lines[pos];
    const trimmed = currentLine.trim();

    // Check if this is an array item
    if (trimmed.startsWith("- ")) {
      return parseArray(minIndent);
    }

    // Check if it's a multiline block scalar
    if (trimmed === "|" || trimmed === ">") {
      pos++;
      const blockLines: string[] = [];
      const blockIndent = peekIndent();
      if (blockIndent <= minIndent) return "";
      while (pos < lines.length) {
        const line = lines[pos];
        const lineIndent = line.match(/^(\s*)/)?.[1].length ?? 0;
        if (line.trim() === "") {
          blockLines.push("");
          pos++;
          continue;
        }
        if (lineIndent < blockIndent) break;
        blockLines.push(line.slice(blockIndent));
        pos++;
      }
      return blockLines.join("\n");
    }

    // Check if it's a mapping
    if (trimmed.includes(":")) {
      return parseMapping(minIndent);
    }

    pos++;
    return parseValue(trimmed);
  }

  function parseArray(minIndent: number): unknown[] {
    const result: unknown[] = [];
    while (pos < lines.length) {
      while (pos < lines.length && lines[pos].trim() === "") pos++;
      if (pos >= lines.length) break;
      const indent = lines[pos].match(/^(\s*)/)?.[1].length ?? 0;
      if (indent < minIndent) break;
      const trimmed = lines[pos].trim();
      if (!trimmed.startsWith("- ")) break;

      const afterDash = trimmed.slice(2);
      if (afterDash.includes(":") && !afterDash.startsWith('"')) {
        // Inline mapping in array
        const colonIdx = afterDash.indexOf(":");
        const key = afterDash.slice(0, colonIdx).trim();
        const valStr = afterDash.slice(colonIdx + 1).trim();
        pos++;
        const obj: Record<string, unknown> = {};
        if (valStr === "") {
          obj[key] = parseBlock(indent + 2);
        } else {
          obj[key] = parseValue(valStr);
        }
        // Continue reading subsequent keys at same level
        while (pos < lines.length) {
          const nextLine = lines[pos];
          if (nextLine.trim() === "") { pos++; continue; }
          const nextIndent = nextLine.match(/^(\s*)/)?.[1].length ?? 0;
          if (nextIndent <= indent) break;
          const nextTrimmed = nextLine.trim();
          if (nextTrimmed.startsWith("- ")) break;
          const nextColonIdx = nextTrimmed.indexOf(":");
          if (nextColonIdx === -1) break;
          const nk = nextTrimmed.slice(0, nextColonIdx).trim();
          const nv = nextTrimmed.slice(nextColonIdx + 1).trim();
          pos++;
          if (nv === "") {
            obj[nk] = parseBlock(nextIndent);
          } else {
            obj[nk] = parseValue(nv);
          }
        }
        result.push(obj);
      } else {
        pos++;
        result.push(parseValue(afterDash));
      }
    }
    return result;
  }

  function parseMapping(minIndent: number): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    while (pos < lines.length) {
      while (pos < lines.length && lines[pos].trim() === "") pos++;
      if (pos >= lines.length) break;
      const indent = lines[pos].match(/^(\s*)/)?.[1].length ?? 0;
      if (indent < minIndent) break;
      const trimmed = lines[pos].trim();
      if (trimmed.startsWith("- ")) break;
      const colonIdx = trimmed.indexOf(":");
      if (colonIdx === -1) break;

      let key = trimmed.slice(0, colonIdx).trim();
      if (
        (key.startsWith('"') && key.endsWith('"')) ||
        (key.startsWith("'") && key.endsWith("'"))
      ) {
        key = key.slice(1, -1);
      }
      const valStr = trimmed.slice(colonIdx + 1).trim();
      pos++;

      if (valStr === "" || valStr === "|" || valStr === ">") {
        if (valStr === "|" || valStr === ">") {
          pos--;
          const dummyLine = lines[pos];
          lines[pos] = " ".repeat(indent) + valStr;
          result[key] = parseBlock(indent);
          if (pos < lines.length && lines[pos] === dummyLine) pos++;
        } else {
          result[key] = parseBlock(indent + 1);
        }
      } else {
        result[key] = parseValue(valStr);
      }
    }
    return result;
  }

  return parseBlock(0);
}

function detectDirection(input: string): "jsonToYaml" | "yamlToJson" {
  try {
    JSON.parse(input);
    return "jsonToYaml";
  } catch {
    return "yamlToJson";
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
    if (direction === "jsonToYaml") {
      const data = JSON.parse(trimmed);
      const output = yamlStringify(data);
      return {
        output,
        stats: {
          lines: output.split("\n").length,
          characters: output.length,
        },
      };
    } else {
      const data = yamlParse(trimmed);
      const output = JSON.stringify(data, null, 2);
      return {
        output,
        stats: {
          lines: output.split("\n").length,
          characters: output.length,
        },
      };
    }
  } catch {
    return { output: "" };
  }
}
