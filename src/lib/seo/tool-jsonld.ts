import type { ToolContentData } from "./tool-content-types";

export function generateHowToJsonLd(
  content: ToolContentData,
  toolName: string,
  url: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: content.howTo.title,
    url,
    step: content.howTo.steps.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
  };
}

export function generateFAQPageJsonLd(
  content: ToolContentData,
  toolName: string,
) {
  const mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: { "@type": "Answer"; text: string };
  }> = [];

  if (content.features.items.length > 0) {
    mainEntity.push({
      "@type": "Question",
      name: `What are the key features of ${toolName}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: content.features.items.join(". ") + ".",
      },
    });
  }

  if (content.howTo.steps.length > 0) {
    mainEntity.push({
      "@type": "Question",
      name: `How do I use ${toolName}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: content.howTo.steps.join(" "),
      },
    });
  }

  if (content.tips.items.length > 0) {
    mainEntity.push({
      "@type": "Question",
      name: `What tips should I know when using ${toolName}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: content.tips.items.join(". ") + ".",
      },
    });
  }

  if (content.faq) {
    for (const item of content.faq) {
      mainEntity.push({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      });
    }
  }

  if (mainEntity.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}
