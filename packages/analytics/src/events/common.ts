import type { EventMap } from "../types";

/** 모든 앱에서 공통으로 사용하는 이벤트 */
export const commonEvents = {
  themeToggle: {
    name: "theme_toggle",
    params: {} as { theme: "light" | "dark" },
  },
  languageSwitch: {
    name: "language_switch",
    params: {} as { from_locale: string; to_locale: string },
  },
} as const satisfies EventMap;
