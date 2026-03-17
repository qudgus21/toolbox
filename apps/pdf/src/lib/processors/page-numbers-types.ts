// ─── 위치 ───
export type PageNumberPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

// ─── 번호 형식 ───
export type PageNumberFormat =
  | "{n}"
  | "{n}/{total}"
  | "page-n"
  | "page-n-of"
  | "custom";

// ─── 폰트 ───
export type PageNumberFont =
  | "Helvetica"
  | "HelveticaBold"
  | "TimesRoman"
  | "TimesRomanBold"
  | "Courier"
  | "CourierBold"
  | "Georgia"
  | "Verdana";

// ─── 마주보기 모드 ───
export type FacingPageMode =
  | "single" // 모든 페이지 같은 위치
  | "facing" // 홀수/짝수 좌우 반전
  | "facing-cover"; // 첫 페이지 표지(번호 없음) + 나머지 facing

// ─── 전체 옵션 ───
export interface PageNumberOptions {
  position: PageNumberPosition;
  format: PageNumberFormat;
  customTemplate: string;
  font: PageNumberFont;
  fontSize: number;
  color: string;
  marginMm: number;
  pageRange: "all" | "custom";
  customRange: string;
  skipFirstN: number;
  startNumber: number;
  facingMode: FacingPageMode;
}

export const DEFAULT_PAGE_NUMBER_OPTIONS: PageNumberOptions = {
  position: "bottom-center",
  format: "{n}",
  customTemplate: "{n}",
  font: "Helvetica",
  fontSize: 12,
  color: "#000000",
  marginMm: 10,
  pageRange: "all",
  customRange: "",
  skipFirstN: 0,
  startNumber: 1,
  facingMode: "single",
};
