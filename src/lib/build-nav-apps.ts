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
  return apps.map((app) => ({
    slug: app.slug,
    label: app.slug === "pdf" ? "PDF" : "Image",
    href: `/${locale}/${app.slug}`,
  }));
}
