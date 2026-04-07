export interface ToolContentData {
  howTo: { title: string; steps: string[] };
  features: { title: string; items: string[] };
  tips: { title: string; items: string[] };
  faq?: { question: string; answer: string }[];
}

export type ToolContentMap = Record<string, ToolContentData>;
