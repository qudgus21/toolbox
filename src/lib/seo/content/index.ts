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
import { pdfContentJa } from "./pdf-content-ja";
import { imageContentJa } from "./image-content-ja";
import { textContentJa } from "./text-content-ja";
import { converterContentJa } from "./converter-content-ja";
import { calculatorContentJa } from "./calculator-content-ja";
import { pdfContentZh } from "./pdf-content-zh";
import { imageContentZh } from "./image-content-zh";
import { textContentZh } from "./text-content-zh";
import { converterContentZh } from "./converter-content-zh";
import { calculatorContentZh } from "./calculator-content-zh";
import { pdfContentEs } from "./pdf-content-es";
import { imageContentEs } from "./image-content-es";
import { textContentEs } from "./text-content-es";
import { converterContentEs } from "./converter-content-es";
import { calculatorContentEs } from "./calculator-content-es";
import { pdfContentRu } from "./pdf-content-ru";
import { imageContentRu } from "./image-content-ru";
import { textContentRu } from "./text-content-ru";
import { converterContentRu } from "./converter-content-ru";
import { calculatorContentRu } from "./calculator-content-ru";
import { pdfContentFr } from "./pdf-content-fr";
import { imageContentFr } from "./image-content-fr";
import { textContentFr } from "./text-content-fr";
import { converterContentFr } from "./converter-content-fr";
import { calculatorContentFr } from "./calculator-content-fr";
import { pdfContentDe } from "./pdf-content-de";
import { imageContentDe } from "./image-content-de";
import { textContentDe } from "./text-content-de";
import { converterContentDe } from "./converter-content-de";
import { calculatorContentDe } from "./calculator-content-de";
import { pdfContentPt } from "./pdf-content-pt";
import { imageContentPt } from "./image-content-pt";
import { textContentPt } from "./text-content-pt";
import { converterContentPt } from "./converter-content-pt";
import { calculatorContentPt } from "./calculator-content-pt";
import { pdfContentAr } from "./pdf-content-ar";
import { imageContentAr } from "./image-content-ar";
import { textContentAr } from "./text-content-ar";
import { converterContentAr } from "./converter-content-ar";
import { calculatorContentAr } from "./calculator-content-ar";
import { pdfContentHi } from "./pdf-content-hi";
import { imageContentHi } from "./image-content-hi";
import { textContentHi } from "./text-content-hi";
import { converterContentHi } from "./converter-content-hi";
import { calculatorContentHi } from "./calculator-content-hi";
import { pdfContentIt } from "./pdf-content-it";
import { imageContentIt } from "./image-content-it";
import { textContentIt } from "./text-content-it";
import { converterContentIt } from "./converter-content-it";
import { calculatorContentIt } from "./calculator-content-it";
import { pdfContentTr } from "./pdf-content-tr";
import { imageContentTr } from "./image-content-tr";
import { textContentTr } from "./text-content-tr";
import { converterContentTr } from "./converter-content-tr";
import { calculatorContentTr } from "./calculator-content-tr";

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
  ja: {
    pdf: pdfContentJa,
    image: imageContentJa,
    text: textContentJa,
    converter: converterContentJa,
    calculator: calculatorContentJa,
  },
  zh: {
    pdf: pdfContentZh,
    image: imageContentZh,
    text: textContentZh,
    converter: converterContentZh,
    calculator: calculatorContentZh,
  },
  es: {
    pdf: pdfContentEs,
    image: imageContentEs,
    text: textContentEs,
    converter: converterContentEs,
    calculator: calculatorContentEs,
  },
  ru: {
    pdf: pdfContentRu,
    image: imageContentRu,
    text: textContentRu,
    converter: converterContentRu,
    calculator: calculatorContentRu,
  },
  fr: { pdf: pdfContentFr, image: imageContentFr, text: textContentFr, converter: converterContentFr, calculator: calculatorContentFr },
  de: { pdf: pdfContentDe, image: imageContentDe, text: textContentDe, converter: converterContentDe, calculator: calculatorContentDe },
  pt: { pdf: pdfContentPt, image: imageContentPt, text: textContentPt, converter: converterContentPt, calculator: calculatorContentPt },
  ar: { pdf: pdfContentAr, image: imageContentAr, text: textContentAr, converter: converterContentAr, calculator: calculatorContentAr },
  hi: { pdf: pdfContentHi, image: imageContentHi, text: textContentHi, converter: converterContentHi, calculator: calculatorContentHi },
  it: { pdf: pdfContentIt, image: imageContentIt, text: textContentIt, converter: converterContentIt, calculator: calculatorContentIt },
  tr: { pdf: pdfContentTr, image: imageContentTr, text: textContentTr, converter: converterContentTr, calculator: calculatorContentTr },
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
