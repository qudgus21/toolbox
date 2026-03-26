import type { EventMap } from "../types";

/** Calculator 앱 전용 이벤트 */
export const calculatorEvents = {
  // ── 홈페이지 ──
  toolCardClick: {
    name: "tool_card_click",
    params: {} as { tool_slug: string; source: "grid" | "favorites" | "search" },
  },
  categoryTabClick: {
    name: "category_tab_click",
    params: {} as { category: string },
  },
  searchQuery: {
    name: "search_query",
    params: {} as { search_term: string },
  },
  viewModeToggle: {
    name: "view_mode_toggle",
    params: {} as { mode: "grid" | "list" },
  },
  favoriteToggle: {
    name: "favorite_toggle",
    params: {} as { tool_slug: string; action: "add" | "remove" },
  },

  // ── 도구 페이지 (계산기 전용) ──
  calculatorInput: {
    name: "calculator_input",
    params: {} as { tool_slug: string },
  },
  calculatorResult: {
    name: "calculator_result",
    params: {} as { tool_slug: string },
  },
  calculatorCopy: {
    name: "calculator_copy",
    params: {} as { tool_slug: string; output_length: number },
  },
  calculatorError: {
    name: "calculator_error",
    params: {} as { tool_slug: string; error_message: string },
  },
  resetClick: {
    name: "reset_click",
    params: {} as { tool_slug: string },
  },
} as const satisfies EventMap;
