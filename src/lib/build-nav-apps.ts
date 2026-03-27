import { apps } from "@/lib/apps";
import type { NavApp } from "@/lib/ui";

/**
 * Build nav app data for the shared GNB.
 * Call from server components.
 */
export function buildNavApps({
  locale,
}: {
  locale: string;
}): NavApp[] {
  const labelMap: Record<string, string> = { pdf: "PDF", image: "Image", text: "Text", converter: "Converter", calculator: "Calculator" };
  return apps.map((app) => ({
    slug: app.slug,
    label: labelMap[app.slug] ?? app.slug,
    href: `/${locale}/${app.slug}`,
  }));
}
