export const colors = {
  light: {
    background: "#ffffff",
    foreground: "#0a0a0a",
    muted: "#f5f5f5",
    mutedForeground: "#737373",
    border: "#e5e5e5",
    primary: "#2563eb",
    primaryForeground: "#ffffff",
    secondary: "#f3f4f6",
    secondaryForeground: "#1f2937",
  },
  dark: {
    background: "#0a0a0a",
    foreground: "#fafafa",
    muted: "#262626",
    mutedForeground: "#a3a3a3",
    border: "#404040",
    primary: "#2563eb",
    primaryForeground: "#ffffff",
    secondary: "#1f2937",
    secondaryForeground: "#f3f4f6",
  },
} as const;

export const accentColors = {
  landing: "#2563eb",
  pdf: "#ef4444",
  video: "#8b5cf6",
} as const;

export type AppName = keyof typeof accentColors;
