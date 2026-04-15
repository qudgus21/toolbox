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
    popularToolSlugs: ["merge", "compress", "pdf-to-jpg", "split", "edit-pdf", "word-to-pdf"],
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
    popularToolSlugs: ["resize", "compress", "heic-to-jpg", "crop", "jpg-to-png", "qr-code"],
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
    popularToolSlugs: ["word-counter", "json-formatter", "case-converter", "password-generator", "base64", "lorem-ipsum"],
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
    popularToolSlugs: ["length", "temperature", "weight", "color-converter", "json-yaml", "unix-timestamp"],
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
    popularToolSlugs: ["percentage-calculator", "bmi-calculator", "loan-calculator", "compound-interest", "tip-calculator", "scientific-calculator"],
  },
];
