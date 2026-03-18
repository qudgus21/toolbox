export type OverlayLayer = "above" | "below";
export type OverlayMode = "repeat-first" | "match";
export type OverlayScale = "fit" | "original" | "stretch";

export interface OverlayOptions {
  layer: OverlayLayer;
  overlayMode: OverlayMode;
  scaleMode: OverlayScale;
}

export const DEFAULT_OVERLAY_OPTIONS: OverlayOptions = {
  layer: "above",
  overlayMode: "repeat-first",
  scaleMode: "fit",
};
