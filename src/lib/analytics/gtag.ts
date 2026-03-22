declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * window.gtag를 안전하게 호출하여 GA4 이벤트를 전송한다.
 * SSR 환경이나 gtag 미로드 상태에서는 아무 동작도 하지 않는다.
 */
export function sendEvent(
  name: string,
  params: Record<string, string | number | boolean | undefined>,
): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
