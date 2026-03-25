import type { ConverterResult } from "../types";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function jsonToXml(data: unknown, indent: number = 0, tagName?: string): string {
  const prefix = "  ".repeat(indent);

  if (data === null || data === undefined) {
    return tagName ? `${prefix}<${tagName} />` : "";
  }

  if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
    const val = escapeXml(String(data));
    return tagName ? `${prefix}<${tagName}>${val}</${tagName}>` : val;
  }

  if (Array.isArray(data)) {
    const itemTag = tagName || "item";
    return data
      .map((item) => jsonToXml(item, indent, itemTag))
      .join("\n");
  }

  if (typeof data === "object") {
    const entries = Object.entries(data as Record<string, unknown>);
    let elementCount = 0;
    const inner = entries
      .map(([key, val]) => {
        if (Array.isArray(val)) {
          return val
            .map((item) => {
              elementCount++;
              return jsonToXml(item, indent + 1, key);
            })
            .join("\n");
        }
        elementCount++;
        return jsonToXml(val, indent + 1, key);
      })
      .join("\n");

    if (tagName) {
      return `${prefix}<${tagName}>\n${inner}\n${prefix}</${tagName}>`;
    }
    return inner;
  }

  return "";
}

function countXmlElements(xml: string): number {
  const matches = xml.match(/<[a-zA-Z][^/]*?>/g);
  return matches ? matches.length : 0;
}

function xmlToJson(xml: string): unknown {
  let pos = 0;
  const src = xml.trim();

  function skipWhitespace() {
    while (pos < src.length && /\s/.test(src[pos])) pos++;
  }

  function parseNode(): unknown {
    skipWhitespace();
    if (pos >= src.length || src[pos] !== "<") {
      // Text content
      const end = src.indexOf("<", pos);
      const text = end === -1 ? src.slice(pos) : src.slice(pos, end);
      pos = end === -1 ? src.length : end;
      return decodeXml(text.trim());
    }

    // Check for self-closing or opening tag
    const tagMatch = src.slice(pos).match(/^<([a-zA-Z_][\w.-]*)((?:\s+[^>]*?)?)(\s*\/?)>/);
    if (!tagMatch) return null;

    const tagName = tagMatch[1];
    const isSelfClosing = tagMatch[3].includes("/");
    pos += tagMatch[0].length;

    if (isSelfClosing) return null;

    // Parse children
    skipWhitespace();
    const children: { tag: string; value: unknown }[] = [];
    let textContent = "";

    while (pos < src.length) {
      skipWhitespace();
      if (pos >= src.length) break;

      // Check for closing tag
      const closeTag = `</${tagName}>`;
      if (src.slice(pos).startsWith(closeTag)) {
        pos += closeTag.length;
        break;
      }

      if (src[pos] === "<" && src[pos + 1] !== "/") {
        // Child element
        const childStart = pos;
        const childTagMatch = src.slice(pos).match(/^<([a-zA-Z_][\w.-]*)/);
        if (!childTagMatch) break;
        const childTag = childTagMatch[1];
        const childValue = parseNode();
        children.push({ tag: childTag, value: childValue });
      } else if (src[pos] === "<" && src[pos + 1] === "/") {
        // Closing tag
        const closeMatch = src.slice(pos).match(/^<\/([a-zA-Z_][\w.-]*)>/);
        if (closeMatch) {
          pos += closeMatch[0].length;
          break;
        }
      } else {
        // Text
        const end = src.indexOf("<", pos);
        textContent += end === -1 ? src.slice(pos) : src.slice(pos, end);
        pos = end === -1 ? src.length : end;
      }
    }

    if (children.length === 0) {
      return parseTypedValue(textContent.trim());
    }

    // Group children by tag name
    const grouped: Record<string, unknown[]> = {};
    for (const child of children) {
      if (!grouped[child.tag]) grouped[child.tag] = [];
      grouped[child.tag].push(child.value);
    }

    const result: Record<string, unknown> = {};
    for (const [key, vals] of Object.entries(grouped)) {
      result[key] = vals.length === 1 ? vals[0] : vals;
    }
    return result;
  }

  function decodeXml(str: string): string {
    return str
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'");
  }

  function parseTypedValue(str: string): unknown {
    if (str === "") return null;
    if (str === "true") return true;
    if (str === "false") return false;
    const num = Number(str);
    if (!isNaN(num) && str !== "") return num;
    return decodeXml(str);
  }

  const result = parseNode();
  return result;
}

function detectDirection(input: string): "jsonToXml" | "xmlToJson" {
  return input.trim().startsWith("<") ? "xmlToJson" : "jsonToXml";
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
    if (direction === "jsonToXml") {
      const data = JSON.parse(trimmed);
      const inner = jsonToXml(data, 1);
      const output = `<root>\n${inner}\n</root>`;
      return {
        output,
        stats: { elements: countXmlElements(output) },
      };
    } else {
      const parsed = xmlToJson(trimmed);
      // If root wrapper, unwrap
      let result = parsed;
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        !Array.isArray(parsed)
      ) {
        const keys = Object.keys(parsed as Record<string, unknown>);
        if (keys.length === 1) {
          result = (parsed as Record<string, unknown>)[keys[0]];
        }
      }
      const output = JSON.stringify(result, null, 2);
      return {
        output,
        stats: { elements: countXmlElements(trimmed) },
      };
    }
  } catch {
    return { output: "" };
  }
}
