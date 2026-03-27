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

  // ── 도구 페이지 (퍼널) ──
  toolView: {
    name: "tool_view",
    params: {} as { tool_slug: string },
  },
  toolInput: {
    name: "tool_input",
    params: {} as { tool_slug: string; char_count: number },
  },
  toolGenerate: {
    name: "tool_generate",
    params: {} as { tool_slug: string },
  },
  toolCopy: {
    name: "tool_copy",
    params: {} as { tool_slug: string; output_length: number },
  },
  toolDownload: {
    name: "tool_download",
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
  toolDwell: {
    name: "tool_dwell",
    params: {} as { tool_slug: string; duration_sec: number; max_stage: string },
  },
} as const satisfies EventMap;
