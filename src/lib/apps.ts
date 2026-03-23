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
];
