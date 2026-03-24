import type { EventMap } from "../types";

/** Text 앱 전용 이벤트 */
export const textEvents = {
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

  // ── 도구 페이지 (텍스트 전용) ──
  textInput: {
    name: "text_input",
    params: {} as { tool_slug: string; char_count: number },
  },
  textCopy: {
    name: "text_copy",
    params: {} as { tool_slug: string; output_length: number },
  },
  textDownload: {
    name: "text_download",
    params: {} as { tool_slug: string; output_length: number },
  },
  processError: {
    name: "process_error",
    params: {} as { tool_slug: string; error_message: string },
  },
  resetClick: {
    name: "reset_click",
    params: {} as { tool_slug: string },
  },
} as const satisfies EventMap;
