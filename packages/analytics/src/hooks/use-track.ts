import { useRef, useMemo } from "react";
import { createTracker } from "../tracker";
import type { EventMap, Tracker } from "../types";

/**
 * 컴포넌트에서 타입-세이프 트래커를 사용하기 위한 React hook.
 * app 문자열이 바뀌지 않는 한 동일한 tracker 인스턴스를 반환한다.
 *
 * @example
 * const track = useTrack("pdf", pdfEvents);
 * track.toolCardClick({ tool_slug: "merge", source: "grid" });
 */
export function useTrack<T extends EventMap>(
  app: string,
  eventMap: T,
): Tracker<T> {
  const eventMapRef = useRef(eventMap);
  return useMemo(() => createTracker(app, eventMapRef.current), [app]);
}
