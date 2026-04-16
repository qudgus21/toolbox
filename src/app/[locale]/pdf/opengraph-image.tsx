import { ImageResponse } from "@vercel/og";
import { ogMetadata, ogBottomBar } from "@/lib/seo";

export const alt = "ToolPop PDF";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const meta = ogMetadata[locale] ?? ogMetadata.en;
  const bottom = ogBottomBar[locale] ?? ogBottomBar.en;

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
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "32px",
              fontWeight: 800,
            }}
          >
            T
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span style={{ fontSize: "48px", fontWeight: 800, color: "white" }}>Tool</span>
            <span style={{ fontSize: "48px", fontWeight: 800, color: "#ef4444" }}>Pop</span>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#ef4444",
                background: "rgba(239,68,68,0.15)",
                padding: "4px 10px",
                borderRadius: "6px",
              }}
            >
              PDF
            </span>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "42px",
            fontWeight: 700,
            color: "white",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          {meta.siteTitle}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.4,
          }}
        >
          {meta.siteDescription}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            gap: "24px",
            color: "rgba(255,255,255,0.5)",
            fontSize: "18px",
          }}
        >
          <span>toolpop.org/pdf</span>
          <span>·</span>
          <span>{bottom.free}</span>
          <span>·</span>
          <span>{bottom.noUpload}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
