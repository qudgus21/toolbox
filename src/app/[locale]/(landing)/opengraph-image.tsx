import { ImageResponse } from "@vercel/og";
import { ogBottomBar } from "@/lib/seo";

export const alt = "ToolPop";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ogLandingMetadata: Record<string, { siteTitle: string; siteDescription: string }> = {
  ko: {
    siteTitle: "ToolPop - 무료 온라인 도구 모음",
    siteDescription: "PDF, 이미지 변환·편집을 브라우저에서 바로. 업로드 없이 안전하게.",
  },
  en: {
    siteTitle: "ToolPop - Free Online Tools",
    siteDescription: "PDF & image tools right in your browser. No upload, no signup.",
  },
  ja: {
    siteTitle: "ToolPop - 無料オンラインツール",
    siteDescription: "PDF・画像の変換・編集をブラウザで。アップロード不要。",
  },
  zh: {
    siteTitle: "ToolPop - 免费在线工具",
    siteDescription: "浏览器中直接处理PDF和图片，无需上传。",
  },
  es: {
    siteTitle: "ToolPop - Herramientas en línea gratuitas",
    siteDescription: "Herramientas PDF e imagen directamente en tu navegador. Sin subir archivos.",
  },
};

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const meta = ogLandingMetadata[locale] ?? ogLandingMetadata.en;
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
          background: "linear-gradient(135deg, #1a1a2e 0%, #1e1b4b 50%, #312e81 100%)",
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
              background: "linear-gradient(135deg, #a855f7, #7c3aed)",
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
          <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
            <span style={{ fontSize: "48px", fontWeight: 800, color: "white" }}>Tool</span>
            <span style={{ fontSize: "48px", fontWeight: 800, color: "#a855f7" }}>Pop</span>
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

        {/* App badges */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "36px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(239,68,68,0.15)",
              padding: "8px 20px",
              borderRadius: "8px",
              color: "#ef4444",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            PDF Tools
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(99,102,241,0.15)",
              padding: "8px 20px",
              borderRadius: "8px",
              color: "#818cf8",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Image Tools
          </div>
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
          <span>toolpop.org</span>
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
