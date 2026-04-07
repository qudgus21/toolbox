import { LandingContentData } from "./landing-content";

export const landingContentKo: Record<string, LandingContentData> = {
  pdf: {
    title: "ToolPop PDF 소개",
    description:
      "ToolPop PDF는 브라우저에서 실행되는 무료 PDF 도구 모음입니다. 파일을 서버에 업로드하지 않고 병합, 분할, 압축, 변환, 편집, 보안 처리까지 모든 작업을 로컬에서 완료할 수 있어 최고의 보안과 속도를 보장합니다.",
    sections: [
      {
        heading: "개인정보 보호 우선",
        text: "모든 PDF 작업은 WebAssembly와 JavaScript를 사용하여 브라우저에서만 실행됩니다. 파일이 절대 외부로 나가지 않아 민감한 문서는 안전하게 보관됩니다. 가입 없음, 파일 크기 제한 없음, 워터마크 없음을 보장합니다.",
      },
      {
        heading: "완벽한 PDF 툴킷",
        text: "병합, 분할 같은 기본 기능부터 교정, 전자 서명, PDF/A 변환 같은 고급 기능까지 모든 PDF 작업을 지원합니다. 페이지 정렬, 워터마크 추가, 이메일 전송용 압축, 포맷 변환 등을 손쉽게 처리할 수 있습니다.",
      },
    ],
  },
  image: {
    title: "ToolPop Image 소개",
    description:
      "ToolPop Image는 무료 온라인 이미지 편집 및 변환 도구를 제공합니다. 크기 조정, 자르기, 압축, 포맷 변환, 필터 적용, 그래픽 생성 등을 모두 브라우저에서 로컬로 처리할 수 있습니다.",
    sections: [
      {
        heading: "소프트웨어 없이 편집하세요",
        text: "Photoshop이나 GIMP를 설치할 필요가 없습니다. ToolPop Image는 브라우저에서 모든 이미지 작업을 처리합니다. SNS용 크기 조정, 정확한 규격 맞춤, 텍스트나 워터마크 추가, 전문가 수준의 필터 적용까지 순식간에 완료할 수 있습니다.",
      },
      {
        heading: "형식 변환이 쉬워요",
        text: "JPG, PNG, WebP, SVG, HEIC, TIFF, PSD, EPS 등 다양한 포맷 간 변환을 지원합니다. 여러 파일을 한 번에 변환할 수 있는 배치 처리도 가능합니다. 모든 변환에서 품질을 유지하면서 파일 크기를 최적화합니다.",
      },
    ],
  },
  text: {
    title: "ToolPop Text 소개",
    description:
      "ToolPop Text는 무료 텍스트 조작, 분석, 인코딩 도구 모음을 제공합니다. 단어 수 세기, 대소문자 변환, 찾기 및 바꾸기, 해시 생성, JSON 포맷팅 등을 브라우저에서 즉시 처리합니다.",
    sections: [
      {
        heading: "작가와 개발자를 위해",
        text: "에세이의 단어 수가 필요하신가요? 코드의 정규표현식을 테스트하고 싶으신가요? API 작업에 Base64 인코딩이 필요하신가요? 목업용 Lorem Ipsum이 필요하신가요? ToolPop Text에는 모든 텍스트 작업을 위한 전문 도구가 준비되어 있습니다.",
      },
      {
        heading: "즉시 결과 확인",
        text: "모든 도구가 입력하는 순간 실시간으로 텍스트를 처리합니다. 기다릴 필요 없이 서버 통신도 없습니다. 최적화된 클라이언트 처리로 대용량 문서도 빠르게 처리할 수 있습니다.",
      },
    ],
  },
  converter: {
    title: "ToolPop Converter 소개",
    description:
      "ToolPop Converter는 무료 단위 및 데이터 변환 도구모음입니다. 측정 단위, 색상, 날짜, 데이터 포맷, CSS 단위 등을 브라우저에서 즉시 변환할 수 있습니다. 요리 계량부터 개발자 중심의 JSON/YAML 변환까지 모두 지원합니다.",
    sections: [
      {
        heading: "필요한 모든 변환을 지원합니다",
        text: "길이, 무게, 온도, 넓이, 부피, 속도, 압력, 에너지 등 모든 표준 단위 변환을 실시간으로 처리합니다. 색상 포맷, 시간대 변환, 좌표계 변환 등 특수한 변환 도구도 함께 제공합니다.",
      },
      {
        heading: "개발자를 위한 도구",
        text: "JSON, YAML, CSV, XML, TOML, TypeScript 타입 간 변환을 지원합니다. CSS 축소, px/rem/em 변환, Tailwind 유틸리티 생성 등 현대적인 개발 워크플로우에 필요한 모든 기능을 갖추었습니다.",
      },
    ],
  },
  calculator: {
    title: "ToolPop Calculator 소개",
    description:
      "ToolPop Calculator는 무료 온라인 계산기를 제공합니다. 수학, 금융, 건강, 통계, 일상 계산을 모두 지원합니다. 복리 계산부터 BMI, 행렬 연산, 서브넷 계산까지 정확한 결과와 명확한 설명을 제공합니다.",
    sections: [
      {
        heading: "전문가 수준의 정확성",
        text: "모든 계산기는 정확한 수학 공식과 올바른 반올림, 예외 처리를 적용합니다. 금융 계산기는 복리 기간을 고려하고, 건강 계산기는 임상적으로 검증된 공식을 사용하며, 통계 도구는 실제 데이터 분포를 처리합니다.",
      },
      {
        heading: "모두를 위한 계산기",
        text: "학생은 이차방정식을 풀고 학점을 계산할 수 있습니다. 전문가는 투자수익률과 손익분기점을 분석할 수 있습니다. 주택 소유자는 페인트, 콘크리트, 타일 소비량을 예측할 수 있습니다. 각 계산기는 명확한 입력, 즉시 결과, 도움이 되는 설명을 제공합니다.",
      },
    ],
  },
};
