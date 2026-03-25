import type { ConverterResult } from "../types";

interface InterfaceInfo {
  name: string;
  properties: { key: string; type: string; optional: boolean }[];
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function sanitizeName(str: string): string {
  return str.replace(/[^a-zA-Z0-9_]/g, "_");
}

function inferType(
  value: unknown,
  parentName: string,
  key: string,
  interfaces: InterfaceInfo[],
): string {
  if (value === null) return "null";
  if (value === undefined) return "undefined";

  switch (typeof value) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    default:
      break;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return "unknown[]";

    const types = new Set<string>();
    for (const item of value) {
      types.add(inferType(item, parentName, key, interfaces));
    }

    const typeArr = Array.from(types);
    if (typeArr.length === 1) return `${typeArr[0]}[]`;
    return `(${typeArr.join(" | ")})[]`;
  }

  if (typeof value === "object") {
    const interfaceName = capitalize(sanitizeName(key));
    generateInterface(
      value as Record<string, unknown>,
      interfaceName,
      interfaces,
    );
    return interfaceName;
  }

  return "unknown";
}

function generateInterface(
  obj: Record<string, unknown>,
  name: string,
  interfaces: InterfaceInfo[],
): void {
  // Check if interface with this name already exists
  if (interfaces.some((i) => i.name === name)) return;

  const info: InterfaceInfo = { name, properties: [] };
  interfaces.push(info);

  for (const [key, value] of Object.entries(obj)) {
    const type = inferType(value, name, key, interfaces);
    info.properties.push({ key, type, optional: value === null || value === undefined });
  }
}

export function process(
  input: string,
  options?: Record<string, unknown>,
): ConverterResult {
  const trimmed = input.trim();
  if (!trimmed) return { output: "" };

  const rootName = (options?.rootName as string) || "Root";
  const exportStyle = (options?.exportStyle as string) || "interface";

  try {
    const data = JSON.parse(trimmed);
    const interfaces: InterfaceInfo[] = [];

    if (Array.isArray(data)) {
      if (data.length === 0) {
        const output =
          exportStyle === "type"
            ? `export type ${rootName} = unknown[];`
            : `export type ${rootName} = unknown[];`;
        return { output, stats: { interfaces: 0, properties: 0 } };
      }
      if (typeof data[0] === "object" && data[0] !== null) {
        // Merge all objects to get all possible keys
        const merged: Record<string, unknown> = {};
        const keySets: Set<string>[] = data
          .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
          .map((item) => new Set(Object.keys(item)));

        for (const item of data) {
          if (typeof item === "object" && item !== null) {
            for (const [k, v] of Object.entries(item)) {
              if (!(k in merged) || merged[k] === null || merged[k] === undefined) {
                merged[k] = v;
              }
            }
          }
        }

        generateInterface(merged, rootName, interfaces);

        // Mark keys optional if not present in all items
        if (interfaces.length > 0 && keySets.length > 0) {
          const allKeys = Object.keys(merged);
          for (const key of allKeys) {
            const presentInAll = keySets.every((s) => s.has(key));
            if (!presentInAll) {
              const prop = interfaces[0].properties.find((p) => p.key === key);
              if (prop) prop.optional = true;
            }
          }
        }
      }
    } else if (typeof data === "object" && data !== null) {
      generateInterface(data as Record<string, unknown>, rootName, interfaces);
    } else {
      const output = `export type ${rootName} = ${typeof data};`;
      return { output, stats: { interfaces: 0, properties: 0 } };
    }

    let totalProperties = 0;
    const parts: string[] = [];

    // Output child interfaces first, root last
    for (const info of [...interfaces].reverse()) {
      totalProperties += info.properties.length;
      const keyword = exportStyle === "type" ? "type" : "interface";
      const lines: string[] = [];

      if (exportStyle === "type") {
        lines.push(`export type ${info.name} = {`);
      } else {
        lines.push(`export interface ${info.name} {`);
      }

      for (const prop of info.properties) {
        const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(prop.key)
          ? prop.key
          : JSON.stringify(prop.key);
        const opt = prop.optional ? "?" : "";
        lines.push(`  ${safeKey}${opt}: ${prop.type};`);
      }

      lines.push(exportStyle === "type" ? "};" : "}");
      parts.push(lines.join("\n"));
    }

    const output = parts.join("\n\n");

    return {
      output,
      stats: {
        interfaces: interfaces.length,
        properties: totalProperties,
      },
    };
  } catch {
    return { output: "" };
  }
}
