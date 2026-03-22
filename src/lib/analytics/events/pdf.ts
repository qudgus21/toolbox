import type { EventMap } from "../types";

/** PDF 앱 전용 이벤트 */
export const pdfEvents = {
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
  fileUpload: {
    name: "file_upload",
    params: {} as { tool_slug: string; file_count: number; total_size_kb: number },
  },
  processClick: {
    name: "process_click",
    params: {} as { tool_slug: string; file_count: number },
  },
  processComplete: {
    name: "process_complete",
    params: {} as { tool_slug: string; duration_ms: number; output_size_kb: number },
  },
  processError: {
    name: "process_error",
    params: {} as { tool_slug: string; error_message: string },
  },
  downloadClick: {
    name: "download_click",
    params: {} as { tool_slug: string; file_size_kb: number },
  },
  resetClick: {
    name: "reset_click",
    params: {} as { tool_slug: string },
  },
} as const satisfies EventMap;
