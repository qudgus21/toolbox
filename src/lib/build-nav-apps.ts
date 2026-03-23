import { apps } from "@/lib/apps";
import { tools as pdfTools } from "@/lib/pdf/tools";
import { tools as imageTools } from "@/lib/image/tools";
import type { NavApp } from "@/lib/ui";

/**
 * Build nav app data for the shared GNB dropdown.
 * Call from server components — reads tool definitions and dictionaries.
 */
export function buildNavApps({
  locale,
  pdfDict,
  imageDict,
  viewAllLabel,
}: {
  locale: string;
  pdfDict: Record<string, Record<string, Record<string, string>>>;
  imageDict: Record<string, Record<string, Record<string, string>>>;
  viewAllLabel?: string;
}): NavApp[] {
  return apps.map((app) => {
    const toolDefs = app.slug === "pdf" ? pdfTools : imageTools;
    const dict = app.slug === "pdf" ? pdfDict : imageDict;

    const navTools = app.popularToolSlugs
      .map((slug) => {
        const tool = toolDefs.find((t) => t.slug === slug);
        if (!tool || tool.comingSoon) return null;
        const toolDict = dict?.tools?.[slug];
        return {
          slug,
          title: toolDict?.title ?? tool.title,
          emoji: tool.emoji,
          href: `/${app.slug}/${locale}/${slug}`,
        };
      })
      .filter(Boolean) as NavApp["tools"];

    return {
      slug: app.slug,
      label: app.slug === "pdf" ? "PDF" : "Image",
      href: app.href,
      viewAll: viewAllLabel ?? "View all",
      tools: navTools,
    };
  });
}
