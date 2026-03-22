import type { PageNumberFont, FacingPageMode } from "./page-numbers-types";

export type HeaderFooterAlign = "left" | "center" | "right";

export interface HeaderFooterOptions {
  headerEnabled: boolean;
  footerEnabled: boolean;
  headerText: string;
  footerText: string;
  headerAlign: HeaderFooterAlign;
  footerAlign: HeaderFooterAlign;
  font: PageNumberFont;
  fontSize: number;
  color: string;
  marginMm: number;
  pageRange: "all" | "custom";
  customRange: string;
  facingMode: FacingPageMode;
}

export const DEFAULT_HEADER_FOOTER_OPTIONS: HeaderFooterOptions = {
  headerEnabled: true,
  footerEnabled: false,
  headerText: "{filename}",
  footerText: "Page {page} of {total}",
  headerAlign: "center",
  footerAlign: "center",
  font: "Helvetica",
  fontSize: 10,
  color: "#666666",
  marginMm: 10,
  pageRange: "all",
  customRange: "",
  facingMode: "single",
};
