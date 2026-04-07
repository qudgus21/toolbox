import type { ToolContentData } from "../tool-content-types";
import { pdfContent } from "./pdf-content";
import { imageContent } from "./image-content";
import { textContent } from "./text-content";
import { converterContent } from "./converter-content";
import { calculatorContent } from "./calculator-content";
import { pdfContentKo } from "./pdf-content-ko";
import { imageContentKo } from "./image-content-ko";
import { textContentKo } from "./text-content-ko";
import { converterContentKo } from "./converter-content-ko";
import { calculatorContentKo } from "./calculator-content-ko";

// English content (default fallback)
const contentByApp: Record<string, Record<string, ToolContentData>> = {
  pdf: pdfContent,
  image: imageContent,
  text: textContent,
  converter: converterContent,
  calculator: calculatorContent,
};

// Localized content — populated as translation files are added
// Structure: { locale: { app: { slug: ToolContentData } } }
const localizedContentByApp: Record<
  string,
  Record<string, Record<string, ToolContentData>>
> = {
  ko: {
    pdf: pdfContentKo,
    image: imageContentKo,
    text: textContentKo,
    converter: converterContentKo,
    calculator: calculatorContentKo,
  },
};

export function getToolContent(
  app: string,
  slug: string,
  locale: string = "en",
): ToolContentData | undefined {
  if (locale !== "en") {
    const localized = localizedContentByApp[locale]?.[app]?.[slug];
    if (localized) return localized;
  }
  return contentByApp[app]?.[slug];
}
