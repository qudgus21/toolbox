import type { EventMap } from "../types";

/** 랜딩 페이지 전용 이벤트 */
export const landingEvents = {
  // ── 검색 ──
  searchQuery: {
    name: "search_query",
    params: {} as { search_term: string },
  },
  searchResultClick: {
    name: "search_result_click",
    params: {} as { tool_slug: string; app_slug: string },
  },

  // ── 앱 쇼케이스 카드 ──
  appCardClick: {
    name: "app_card_click",
    params: {} as { app_slug: string },
  },

  // ── 인기 도구 ──
  popularToolClick: {
    name: "popular_tool_click",
    params: {} as { tool_slug: string; app_slug: string },
  },

  // ── 하단 CTA ──
  ctaClick: {
    name: "cta_click",
    params: {} as { app_slug: string; section: "hero" | "bottom" },
  },
} as const satisfies EventMap;
