# ToolBox

브라우저에서 동작하는 무료 온라인 도구 모음. 파일 업로드 없이 클라이언트사이드에서 모든 처리가 이루어져 개인정보가 보호됩니다.

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js 16, React 19 |
| 스타일링 | Tailwind CSS v4, Framer Motion |
| 언어 | TypeScript 5 |
| 패키지 매니저 | pnpm |
| 테스트 | Vitest, Playwright |
| i18n | 45개 언어 지원 (자체 구현) |

## 프로젝트 구조

```
toolbox/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 루트 레이아웃
│   │   ├── page.tsx            # / → /pdf 리다이렉트
│   │   ├── robots.ts           # robots.txt
│   │   ├── globals.css         # 글로벌 스타일 + 디자인 토큰
│   │   ├── pdf/                # PDF 도구
│   │   │   ├── sitemap.ts
│   │   │   └── [locale]/       # 45개 언어 라우팅
│   │   │       ├── (tools)/[slug]/  # 51개 도구 페이지
│   │   │       └── ...
│   │   └── video/              # 동영상 도구
│   ├── lib/
│   │   ├── ui/                 # 공유 UI 컴포넌트
│   │   ├── i18n/               # 국제화 (45개 언어 사전)
│   │   ├── seo/                # SEO 유틸리티
│   │   ├── analytics/          # GA4 분석 통합
│   │   ├── design-tokens/      # 3-layer 디자인 토큰
│   │   ├── storage.ts          # 클라이언트 저장소
│   │   ├── utils.ts            # 유틸리티 함수
│   │   └── pdf/                # PDF 프로세서 및 도구 정의
│   │       └── processors/     # 25+ PDF 변환 모듈
│   ├── styles/
│   │   └── tokens.css          # CSS 디자인 토큰
│   └── middleware.ts           # i18n 로케일 감지
├── public/pdf/                 # PDF 앱 정적 파일 (favicon, manifest, sw.js)
├── e2e/                        # E2E 테스트
└── test-fixtures/              # 테스트용 샘플 파일
```

## 시작하기

```bash
# 의존성 설치
pnpm install

# 개발 서버
pnpm dev

# 빌드
pnpm build

# 테스트
pnpm test

# E2E 테스트
pnpm test:e2e

# 타입 체크
pnpm type-check
```

## 아키텍처 원칙

### 클라이언트사이드 처리

모든 파일 변환/편집은 브라우저에서 직접 처리됩니다. 서버로 파일이 전송되지 않습니다.

### i18n 라우팅

`/pdf/[locale]/[slug]` 패턴으로 45개 언어를 지원합니다. 미들웨어가 브라우저 언어를 감지하여 자동 리다이렉트합니다.

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
