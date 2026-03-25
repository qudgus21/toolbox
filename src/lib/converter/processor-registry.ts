import type { ConverterProcessor } from "./types";

const registry = new Map<string, () => Promise<{ process: ConverterProcessor }>>();

// UNIT
registry.set("length", () => import("./processors/length"));
registry.set("weight", () => import("./processors/weight"));
registry.set("temperature", () => import("./processors/temperature"));
registry.set("area", () => import("./processors/area"));
registry.set("volume", () => import("./processors/volume"));
registry.set("speed", () => import("./processors/speed"));
registry.set("time", () => import("./processors/time"));
registry.set("pressure", () => import("./processors/pressure"));
registry.set("energy", () => import("./processors/energy"));
registry.set("power", () => import("./processors/power"));
registry.set("frequency", () => import("./processors/frequency"));
registry.set("angle", () => import("./processors/angle"));
registry.set("data-storage", () => import("./processors/data-storage"));
registry.set("fuel-economy", () => import("./processors/fuel-economy"));

// NUMBER
registry.set("number-base", () => import("./processors/number-base"));
registry.set("roman-numeral", () => import("./processors/roman-numeral"));
registry.set("scientific-notation", () => import("./processors/scientific-notation"));
registry.set("fraction-decimal", () => import("./processors/fraction-decimal"));
registry.set("percentage", () => import("./processors/percentage"));

// COLOR
registry.set("color-converter", () => import("./processors/color-converter"));
registry.set("color-palette-generator", () => import("./processors/color-palette-generator"));
registry.set("gradient-generator", () => import("./processors/gradient-generator"));
registry.set("color-contrast-checker", () => import("./processors/color-contrast-checker"));
registry.set("color-blindness-simulator", () => import("./processors/color-blindness-simulator"));

// DATETIME
registry.set("timezone", () => import("./processors/timezone"));
registry.set("unix-timestamp", () => import("./processors/unix-timestamp"));
registry.set("date-format", () => import("./processors/date-format"));
registry.set("date-calculator", () => import("./processors/date-calculator"));
registry.set("age-calculator", () => import("./processors/age-calculator"));

// DATA
registry.set("json-yaml", () => import("./processors/json-yaml"));
registry.set("json-csv", () => import("./processors/json-csv"));
registry.set("json-xml", () => import("./processors/json-xml"));
registry.set("json-toml", () => import("./processors/json-toml"));
registry.set("markdown-html", () => import("./processors/markdown-html"));
registry.set("csv-table", () => import("./processors/csv-table"));
registry.set("json-typescript", () => import("./processors/json-typescript"));
registry.set("sql-json", () => import("./processors/sql-json"));

// CSS
registry.set("px-rem", () => import("./processors/px-rem"));
registry.set("px-em", () => import("./processors/px-em"));
registry.set("px-percent", () => import("./processors/px-percent"));
registry.set("css-unit", () => import("./processors/css-unit"));
registry.set("css-minifier", () => import("./processors/css-minifier"));
registry.set("tailwind-css", () => import("./processors/tailwind-css"));

// COOKING
registry.set("cooking-measurement", () => import("./processors/cooking-measurement"));
registry.set("recipe-scaler", () => import("./processors/recipe-scaler"));
registry.set("oven-temperature", () => import("./processors/oven-temperature"));

// GEOGRAPHY
registry.set("coordinate", () => import("./processors/coordinate"));
registry.set("distance-calculator", () => import("./processors/distance-calculator"));

export async function getProcessor(slug: string): Promise<ConverterProcessor | null> {
  const loader = registry.get(slug);
  if (!loader) return null;
  const mod = await loader();
  return mod.process;
}

export function hasProcessor(slug: string): boolean {
  return registry.has(slug);
}

export function getAllSlugs(): string[] {
  return Array.from(registry.keys());
}
