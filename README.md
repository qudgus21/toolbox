# ToolBox

브라우저에서 동작하는 무료 온라인 도구 모음. 파일 업로드 없이 클라이언트사이드에서 모든 처리가 이루어져 개인정보가 보호됩니다.

## 기술 스택

| 영역 | 기술 |
|------|------|
| 모노레포 | Turborepo + pnpm workspaces |
| 프레임워크 | Next.js 16, React 19 |
| 스타일링 | Tailwind CSS v4, Framer Motion |
| 언어 | TypeScript 5 |
| 테스트 | Vitest |
| i18n | 45개 언어 지원 (자체 구현) |

## 프로젝트 구조

```
toolbox/
├── apps/
│   ├── pdf/          # PDF 도구 (port 3001)
│   ├── video/        # 동영상 도구 (port 3002)
│   └── landing/      # 랜딩 페이지
├── packages/
│   ├── config/       # 공유 설정 (TS, ESLint, Tailwind, PostCSS)
│   ├── design-tokens/ # 3-layer 디자인 토큰 (Primitives → Semantic → Dark)
│   ├── i18n/         # 국제화 (45개 언어 사전)
│   ├── ui/           # 공유 UI 컴포넌트
│   ├── utils/        # 유틸리티 함수
│   ├── hooks/        # 공유 React 훅
│   ├── storage/      # 저장소 레이어
│   ├── analytics/    # 분석 통합
│   ├── seo/          # SEO 유틸리티
│   ├── ads/          # 광고 통합
│   └── types/        # 공유 타입 정의
└── test-fixtures/    # 테스트용 샘플 파일
```

## 시작하기

```bash
# 의존성 설치
pnpm install

# 전체 개발 서버
pnpm dev

# 특정 앱만
pnpm dev --filter @toolbox/pdf

# 빌드
pnpm build

# 테스트
pnpm test

# 타입 체크
pnpm type-check
```

## 아키텍처 원칙

### 클라이언트사이드 처리

모든 파일 변환/편집은 브라우저에서 직접 처리됩니다. 서버로 파일이 전송되지 않습니다.

### i18n 라우팅

`/[locale]/[slug]` 패턴으로 45개 언어를 지원합니다. 미들웨어가 브라우저 언어를 감지하여 자동 리다이렉트합니다.

### 디자인 토큰

3-layer 시스템으로 다크모드를 포함한 일관된 디자인을 유지합니다:

```
Primitives (색상, 타이포그래피 원시값)
  → Semantic (용도별 매핑: foreground, background, accent, ...)
    → Dark Mode (자동 전환)
```

### 대용량 데이터 대응

- PDF는 수천 페이지일 수 있으므로 IntersectionObserver + lazy 렌더링 패턴 사용
- 썸네일은 on-demand 렌더링 (스켈레톤 로딩 포함)
- 파일 목록도 수십~수백 개를 고려한 가상화 적용

## 패키지 의존 관계

```
apps/pdf ─┬─ @toolbox/ui
          ├─ @toolbox/utils
          ├─ @toolbox/design-tokens
          ├─ @toolbox/i18n
          ├─ @toolbox/storage
          └─ @toolbox/config (dev)
```

각 앱은 공유 패키지를 `workspace:*` 프로토콜로 참조합니다.
