import { sendEvent } from "./gtag";
import type { EventMap, Tracker } from "./types";

/**
 * 이벤트맵으로부터 타입-세이프 트래커 객체를 생성한다.
 * 모든 이벤트에 `app` 파라미터가 자동 추가된다.
 *
 * @param app - 앱 식별자 ("pdf", "video" 등)
 * @param eventMap - 이벤트 정의 맵
 */
export function createTracker<T extends EventMap>(
  app: string,
  eventMap: T,
): Tracker<T> {
  const tracker = {} as Tracker<T>;

  for (const key in eventMap) {
    const { name } = eventMap[key];
    tracker[key] = (params) => {
      sendEvent(name, { app, ...params });
    };
  }

  return tracker;
}
