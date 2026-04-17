import { ImageResponse } from "next/og";
import { ogBottomBar, resolveOgLocale } from "@/lib/seo/og-metadata";

export const runtime = "edge";
export const alt = "ToolPop";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ogLandingMetadata: Record<string, { siteTitle: string; siteDescription: string }> = {
  ko: {
    siteTitle: "ToolPop - 무료 온라인 도구 모음",
    siteDescription: "PDF·이미지·텍스트·단위 변환·계산까지, 브라우저에서 바로.",
  },
  en: {
    siteTitle: "ToolPop - Free Online Tools",
    siteDescription: "PDF, image, text, converters, and calculators — right in your browser.",
  },
  ja: {
    siteTitle: "ToolPop - 無料オンラインツール",
    siteDescription: "PDF・画像・テキスト・変換・計算まで、ブラウザですぐに。",
  },
  zh: {
    siteTitle: "ToolPop - 免费在线工具",
    siteDescription: "PDF、图片、文字、单位换算、计算工具，浏览器里直接使用。",
  },
  es: {
    siteTitle: "ToolPop - Herramientas en línea gratuitas",
    siteDescription: "PDF, imágenes, texto, conversiones y cálculos — directo en tu navegador.",
  },
  fr: {
    siteTitle: "ToolPop - Outils en ligne gratuits",
    siteDescription: "Outils PDF, image, texte, conversion et calcul — directement dans votre navigateur.",
  },
  de: {
    siteTitle: "ToolPop - Kostenlose Online-Tools",
    siteDescription: "PDF-, Bild-, Text-, Konverter- und Rechner-Tools – direkt im Browser.",
  },
  pt: {
    siteTitle: "ToolPop - Ferramentas online grátis",
    siteDescription: "Ferramentas de PDF, imagem, texto, conversão e cálculo — direto no navegador.",
  },
  ru: {
    siteTitle: "ToolPop - Бесплатные онлайн-инструменты",
    siteDescription: "Инструменты для PDF, изображений, текста, конвертации и расчётов — прямо в браузере.",
  },
  hi: {
    siteTitle: "ToolPop - मुफ़्त ऑनलाइन टूल्स",
    siteDescription: "PDF, छवि, टेक्स्ट, कनवर्टर और कैलकुलेटर टूल्स — सीधे आपके ब्राउज़र में।",
  },
};

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveOgLocale(rawLocale);
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
