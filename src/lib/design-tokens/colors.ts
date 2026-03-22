import { zinc, red, purple, blue, green, amber, white, black } from "./primitives";

export const lightColors = {
  background: white,
  "background-subtle": zinc[50],
  "background-muted": zinc[100],
  "background-elevated": white,

  foreground: zinc[900],
  "foreground-muted": zinc[600],
  "foreground-subtle": zinc[500],

  border: zinc[300],
  "border-muted": zinc[200],
  "border-focus": blue[500],

  primary: zinc[900],
  "primary-foreground": white,
  "primary-hover": zinc[800],

  secondary: zinc[100],
  "secondary-foreground": zinc[900],
  "secondary-hover": zinc[200],

  accent: blue[600],
  "accent-foreground": white,
  "accent-hover": blue[700],

  success: green[600],
  "success-muted": green[50],
  warning: amber[500],
  "warning-muted": amber[50],
  error: red[600],
  "error-muted": red[50],
  info: blue[600],
  "info-muted": blue[50],

  glass: "rgba(255, 255, 255, 0.8)",
  "glass-border": "rgba(255, 255, 255, 0.2)",
} as const;

export const darkColors = {
  background: zinc[950],
  "background-subtle": zinc[900],
  "background-muted": zinc[800],
  "background-elevated": zinc[800],

  foreground: zinc[50],
  "foreground-muted": zinc[300],
  "foreground-subtle": zinc[400],

  border: zinc[700],
  "border-muted": zinc[800],
  "border-focus": blue[500],

  primary: white,
  "primary-foreground": zinc[950],
  "primary-hover": zinc[200],

  secondary: zinc[800],
  "secondary-foreground": zinc[100],
  "secondary-hover": zinc[700],

  accent: blue[500],
  "accent-foreground": white,
  "accent-hover": blue[400],

  success: green[500],
  "success-muted": "rgba(34, 197, 94, 0.15)",
  warning: amber[500],
  "warning-muted": "rgba(245, 158, 11, 0.15)",
  error: red[500],
  "error-muted": "rgba(239, 68, 68, 0.15)",
  info: blue[500],
  "info-muted": "rgba(59, 130, 246, 0.15)",

  glass: "rgba(9, 9, 11, 0.8)",
  "glass-border": "rgba(255, 255, 255, 0.1)",
} as const;

export const accentColors = {
  landing: blue[600],
  pdf: red[500],
  video: purple[500],
} as const;
