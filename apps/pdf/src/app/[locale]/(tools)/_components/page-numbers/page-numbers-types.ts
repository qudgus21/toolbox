// 타입과 상수는 프로세서와 공유하기 위해 @/lib/processors/page-numbers-types.ts에 정의
// 컴포넌트에서 편하게 쓰도록 re-export
export {
  type PageNumberPosition,
  type PageNumberFormat,
  type PageNumberFont,
  type FacingPageMode,
  type PageNumberOptions,
  DEFAULT_PAGE_NUMBER_OPTIONS,
} from "@/lib/processors/page-numbers-types";
