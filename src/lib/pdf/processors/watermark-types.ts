// ─── 모드 ───
export type WatermarkMode = "text" | "image";

// ─── 위치 (9그리드) ───
export type WatermarkPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

// ─── 레이어 ───
export type WatermarkLayer = "over" | "below";

// ─── 회전 프리셋 ───
export type WatermarkRotation = 0 | 45 | -45 | 90 | 180;

// ─── 폰트 ───
export type WatermarkFont =
  | "Helvetica"
  | "HelveticaBold"
  | "TimesRoman"
  | "TimesRomanBold"
  | "Courier"
  | "CourierBold"
  | "Georgia"
  | "Verdana";

// ─── 텍스트 워터마크 설정 ───
export interface TextWatermarkConfig {
  text: string;
  font: WatermarkFont;
  fontSize: number; // 8–200 pt
  color: string; // hex "#RRGGBB"
  opacity: number; // 0.0–1.0
  shadow: boolean;
}

// ─── 이미지 워터마크 설정 ───
export interface ImageWatermarkConfig {
  imageFile: File | null;
  imageDataUrl: string; // 미리보기용
  scale: number; // 0.1–2.0 (1.0 = 원본)
  opacity: number; // 0.0–1.0
  mosaic: boolean; // 타일 반복
}

// ─── 전체 옵션 ───
export interface WatermarkOptions {
  mode: WatermarkMode;
  text: TextWatermarkConfig;
  image: ImageWatermarkConfig;
  // 공통
  position: WatermarkPosition;
  rotation: WatermarkRotation;
  layer: WatermarkLayer;
  offsetX: number; // mm
  offsetY: number; // mm
  pageRange: "all" | "custom";
  customRange: string;
}

export const DEFAULT_WATERMARK_OPTIONS: WatermarkOptions = {
  mode: "text",
  text: {
    text: "CONFIDENTIAL",
    font: "Helvetica",
    fontSize: 48,
    color: "#FF0000",
    opacity: 0.3,
    shadow: false,
  },
  image: {
    imageFile: null,
    imageDataUrl: "",
    scale: 1.0,
    opacity: 0.3,
    mosaic: false,
  },
  position: "center",
  rotation: -45,
  layer: "over",
  offsetX: 0,
  offsetY: 0,
  pageRange: "all",
  customRange: "",
};
