import { ImageResponse } from "next/og";
import { type Locale } from "@/lib/i18n";
import { getTextDictionary } from "@/lib/i18n/get-text-dictionary";
import { ogBottomBar, resolveOgLocale } from "@/lib/seo/og-metadata";
import { getToolBySlug } from "@/lib/text/tools";

export const runtime = "edge";
export const alt = "ToolPop Text Tool";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveOgLocale(rawLocale);
  const tool = getToolBySlug(slug);
  const dict = await getTextDictionary(locale as Locale);
  const t = dict.tools[slug];
  const bottom = ogBottomBar[locale] ?? ogBottomBar.en;

  const title = t?.title ?? slug;
  const description = t?.description ?? "";
  const emoji = tool?.emoji ?? "📝";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #451a03 0%, #78350f 50%, #b45309 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Emoji */}
        <div style={{ fontSize: "72px", marginBottom: "24px" }}>{emoji}</div>

        {/* Tool title */}
        <div
          style={{
            fontSize: "48px",
            fontWeight: 800,
            color: "white",
            marginBottom: "16px",
            textAlign: "center",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>

        {/* Brand bar */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "18px",
              fontWeight: 800,
            }}
          >
            T
          </div>
          <span style={{ fontSize: "22px", fontWeight: 700, color: "white" }}>Tool</span>
          <span style={{ fontSize: "22px", fontWeight: 700, color: "#fbbf24" }}>Pop</span>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#fbbf24",
              background: "rgba(251,191,36,0.15)",
              padding: "3px 8px",
              borderRadius: "4px",
            }}
          >
            Text
          </span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "18px", marginLeft: "12px" }}>
            {bottom.free} · {bottom.noUpload}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
