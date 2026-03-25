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
  pdfDict?: unknown;
  imageDict?: unknown;
}): NavApp[] {
  const labelMap: Record<string, string> = { pdf: "PDF", image: "Image", text: "Text", converter: "Converter" };
  return apps.map((app) => ({
    slug: app.slug,
    label: labelMap[app.slug] ?? app.slug,
    href: `/${locale}/${app.slug}`,
  }));
}
