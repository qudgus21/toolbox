/** 이벤트 파라미터 값으로 허용되는 타입 */
export type EventParamValue = string | number | boolean | undefined;

/** 이벤트 파라미터 레코드 */
export type EventParams = Record<string, EventParamValue>;

/** 단일 이벤트 정의 */
export interface EventDef<P extends EventParams = EventParams> {
  /** GA4 이벤트 이름 (snake_case, 40자 이내) */
  name: string;
  /** 파라미터 타입 힌트 (런타임엔 사용하지 않음, 타입 추론용) */
  params: P;
}

/** 메서드명 → 이벤트 정의 매핑 */
export type EventMap = Record<string, EventDef>;

/** EventMap에서 생성되는 타입-세이프 트래커 */
export type Tracker<T extends EventMap> = {
  [K in keyof T]: (params: T[K]["params"]) => void;
};
