export interface AppDefinition {
  slug: string;
  emoji: string;
  accentFrom: string;
  accentTo: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  href: string;
  popularToolSlugs: string[];
}

export const apps: AppDefinition[] = [
  {
    slug: "pdf",
    emoji: "📄",
    accentFrom: "from-red-500",
    accentTo: "to-orange-400",
    accentText: "text-red-600 dark:text-red-400",
    accentBg: "bg-red-50 dark:bg-red-950/30",
    accentBorder: "border-red-200 dark:border-red-800/40",
    href: "/pdf",
    popularToolSlugs: ["merge", "split", "pdf-to-jpg", "edit-pdf", "compress", "rotate"],
  },
  {
    slug: "image",
    emoji: "🖼️",
    accentFrom: "from-blue-500",
    accentTo: "to-indigo-400",
    accentText: "text-blue-600 dark:text-blue-400",
    accentBg: "bg-blue-50 dark:bg-blue-950/30",
    accentBorder: "border-blue-200 dark:border-blue-800/40",
    href: "/image",
    popularToolSlugs: ["resize", "crop", "compress", "convert", "remove-bg", "qr-code"],
  },
  {
    slug: "text",
    emoji: "📝",
    accentFrom: "from-amber-500",
    accentTo: "to-yellow-400",
    accentText: "text-amber-600 dark:text-amber-400",
    accentBg: "bg-amber-50 dark:bg-amber-950/30",
    accentBorder: "border-amber-200 dark:border-amber-800/40",
    href: "/text",
    popularToolSlugs: ["word-counter", "case-converter", "find-and-replace", "base64", "json-formatter", "text-diff"],
  },
  {
    slug: "converter",
    emoji: "🔄",
    accentFrom: "from-emerald-500",
    accentTo: "to-green-400",
    accentText: "text-emerald-600 dark:text-emerald-400",
    accentBg: "bg-emerald-50 dark:bg-emerald-950/30",
    accentBorder: "border-emerald-200 dark:border-emerald-800/40",
    href: "/converter",
    popularToolSlugs: ["length", "weight", "temperature", "color-converter", "json-yaml", "px-rem"],
  },
  {
    slug: "calculator",
    emoji: "🧮",
    accentFrom: "from-violet-500",
    accentTo: "to-purple-400",
    accentText: "text-violet-600 dark:text-violet-400",
    accentBg: "bg-violet-50 dark:bg-violet-950/30",
    accentBorder: "border-violet-200 dark:border-violet-800/40",
    href: "/calculator",
    popularToolSlugs: ["compound-interest", "bmi-calculator", "percentage-calculator", "tip-calculator", "loan-calculator", "scientific-calculator"],
  },
];
