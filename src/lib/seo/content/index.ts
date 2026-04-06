import type { ToolContentData } from "../tool-content-types";
import { pdfContent } from "./pdf-content";
import { imageContent } from "./image-content";
import { textContent } from "./text-content";
import { converterContent } from "./converter-content";
import { calculatorContent } from "./calculator-content";

const contentByApp: Record<string, Record<string, ToolContentData>> = {
  pdf: pdfContent,
  image: imageContent,
  text: textContent,
  converter: converterContent,
  calculator: calculatorContent,
};

export function getToolContent(
  app: string,
  slug: string,
): ToolContentData | undefined {
  return contentByApp[app]?.[slug];
}
