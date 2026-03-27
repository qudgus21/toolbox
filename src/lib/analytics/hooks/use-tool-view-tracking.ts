import { useEffect, useRef } from "react";
import { sendEvent } from "../gtag";
import { addRecentTool } from "@/lib/storage";

/**
 * 도구 페이지 공통 트래킹 훅.
 * - 마운트 시 `tool_view` 이벤트 전송 + 최근 사용 도구 저장
 * - 언마운트 시 체류시간(`tool_dwell`) 이벤트 전송
 *
 * @param app - 앱 식별자 ("pdf", "image", "text", "converter", "calculator")
 * @param slug - 도구 슬러그
 * @param getMaxStage - 현재까지 도달한 최대 퍼널 단계를 반환하는 함수
 */
export function useToolViewTracking(
  app: string,
  slug: string,
  getMaxStage?: () => string,
) {
  const mountTimeRef = useRef(Date.now());

  useEffect(() => {
    addRecentTool(slug);
    sendEvent("tool_view", { app, tool_slug: slug });

    const mountTime = mountTimeRef.current;

    let dwellSent = false;
    const sendDwell = () => {
      if (dwellSent) return;
      const durationSec = Math.round((Date.now() - mountTime) / 1000);
      if (durationSec < 2) return; // 바운스는 제외
      dwellSent = true;
      sendEvent("tool_dwell", {
        app,
        tool_slug: slug,
        duration_sec: durationSec,
        max_stage: getMaxStage?.() ?? "view",
      });
    };

    // 탭 전환 또는 페이지 이탈 시 전송
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") sendDwell();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      sendDwell();
    };
  }, [app, slug]); // eslint-disable-line react-hooks/exhaustive-deps
}
