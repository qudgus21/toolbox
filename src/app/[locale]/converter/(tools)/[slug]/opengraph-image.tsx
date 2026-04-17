import { ImageResponse } from "next/og";
import { ogBottomBar, resolveOgLocale } from "@/lib/seo/og-metadata";
import { getToolBySlug } from "@/lib/converter/tools";

export const runtime = "edge";
export const alt = "ToolPop Converter Tool";
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
  const bottom = ogBottomBar[locale] ?? ogBottomBar.en;

  const title = tool?.title ?? slug;
  const description = tool?.description ?? "";
  const emoji = tool?.emoji ?? "🔄";

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
          background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
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
              background: "linear-gradient(135deg, #10b981, #059669)",
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
          <span style={{ fontSize: "22px", fontWeight: 700, color: "#6ee7b7" }}>Pop</span>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#6ee7b7",
              background: "rgba(110,231,183,0.15)",
              padding: "3px 8px",
              borderRadius: "4px",
            }}
          >
            Converter
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
