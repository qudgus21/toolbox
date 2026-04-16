export interface ToolContentData {
  whatIs?: { title: string; description: string };
  howTo: { title: string; steps: string[] };
  features: { title: string; items: string[] };
  whyUse?: { title: string; items: string[] };
  useCases?: { title: string; items: string[] };
  comparison?: { title: string; description: string };
  tips: { title: string; items: string[] };
  faq?: { question: string; answer: string }[];
  relatedArticles?: string[];
  relatedFormats?: string[];
}

export type ToolContentMap = Record<string, ToolContentData>;
