# ToolPop

**[toolpop.org](https://toolpop.org)** — 222개 도구 × 45개 언어를 지원하는 온라인 도구 플랫폼

Next.js 16 (App Router) + React 19 + TypeScript 5 기반. 클라이언트사이드 파일 처리로 개인정보를 보호합니다.

## 기술 스택

| 영역 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4, Framer Motion |
| PDF | pdf-lib, pdfjs-dist |
| Canvas | Konva (react-konva), html2canvas |
| Virtualization | @tanstack/react-virtual |
| DnD | @dnd-kit |
| Testing | Vitest, Playwright |
| i18n | 45개 언어 (자체 구현, 라이브러리 미사용) |
| Analytics | GA4 (커스텀 이벤트 퍼널) |
| Deploy | Vercel, PWA (앱별 Service Worker) |

## 규모

- **5개 카테고리** — PDF (37) · Image (43) · Text (44) · Converter (48) · Calculator (50)
- **222개 도구 × 45개 로케일 = 9,990+ 페이지** SEO 대응
- **55,000+ 라인** 번역 사전 (카테고리별 분리, Dynamic Import)

## 설계 및 구현

### 9,990 페이지 SEO — Vercel 80MB 빌드 제한

222개 도구 × 45개 로케일 = 9,990개 페이지를 모두 정적 생성하면 Vercel의 빌드 Output 제한을 초과합니다.

**해결:** 주요 5개 로케일(ko, en, ja, zh, es)만 빌드 타임에 정적 생성하고, 나머지 40개 로케일은 `dynamicParams: true`로 ISR 처리. 모든 페이지에 45개 언어 alternate 태그, OpenGraph, JSON-LD(SoftwareApplication, BreadcrumbList)를 동적 생성하여 SEO 커버리지는 100% 유지합니다.

### i18n — 라이브러리 없이 45개 언어

next-intl 같은 라이브러리 대신 직접 구현했습니다. 이유는 **번들 사이즈 최소화**와 **카테고리별 사전 분리**.

- 미들웨어에서 Accept-Language 헤더 파싱 → quality weight 기반 로케일 매칭 (RFC 7231)
- 카테고리별 사전 분리 (pdf-dictionaries, image-dictionaries, ...) → 해당 카테고리 사전만 로드
- `Record<Locale, () => Promise<Dictionary>>` 패턴으로 lazy import → 사용하지 않는 로케일은 번들에 포함되지 않음
- RTL 언어(아랍어, 히브리어) 자동 감지 및 `dir="rtl"` 헤더 주입

### 대용량 PDF — 수천 페이지 렌더링

사용자가 1,000+ 페이지 PDF를 업로드할 수 있으므로, 모든 페이지를 한 번에 렌더링하면 브라우저가 멈춥니다.

- **IntersectionObserver + on-demand 렌더링**: 뷰포트에 보이는 페이지만 pdfjs로 Canvas 렌더링
- **@tanstack/react-virtual**: 파일 목록 가상화로 수백 개 파일도 DOM 노드 최소화
- **Object URL 생명주기 관리**: useEffect cleanup에서 revoke, resultUrlRef로 단일 URL 유지 → 메모리 누수 방지

### PDF 주석 편집기 — react-konva 기반

텍스트, 도형, 프리핸드, 이미지, 스탬프 등 8가지 주석 타입을 지원하는 인터랙티브 에디터.

- Konva Stage + Transformer로 요소 선택/리사이즈/회전
- liveTextRef로 드래그 중 위치 추적 (DOM 접근 없이 ref 업데이트 → 리렌더 방지)
- **미리보기 ↔ 다운로드 동기화**: Konva Canvas 위 편집 결과를 pdf-lib로 재구성하여 동일한 결과물 다운로드 보장

### 디자인 토큰 3-Layer 시스템

222개 도구의 UI 일관성을 위해 자체 디자인 토큰 시스템을 구축했습니다.

```
Primitives (9개 색상 스케일, 각 10~11단계)
  → Semantic (용도별 매핑: background, foreground, border, accent, glass-morphism)
    → Dark Mode (자동 전환, 앱별 accent 색상 분리)
```

### 퍼널 기반 GA4 이벤트 설계

단순 페이지뷰가 아닌, 도구별 사용자 여정을 추적합니다.

```
tool_view → file_upload → process_click → process_complete → download_click
                                              ├── duration_ms (처리 시간)
                                              └── output_size_kb (결과물 크기)
```

- Generic `EventMap` 타입 시스템으로 이벤트 파라미터 타입 체크
- `tool_dwell` 이벤트로 체류 시간·최대 도달 단계 추적 → 리텐션 분석
- `process_error`로 도구별 에러율 모니터링

### 보안 헤더

- **CSP**: script-src, img-src, connect-src 등 allowlist 기반 제어
- **HSTS**: max-age=31536000, includeSubDomains, preload
- **Permissions-Policy**: camera, microphone, geolocation 차단
- 정적 자산 immutable 캐싱 (max-age=31536000)

### PWA — 앱별 독립 Service Worker

5개 카테고리 각각 독립된 manifest.json + sw.js를 가집니다. Stale-While-Revalidate 캐싱 전략으로 오프라인 지원. HTML 내비게이션 요청은 캐싱에서 제외하여 hydration mismatch를 방지합니다.

## 프로젝트 구조

```
src/
├── app/
│   ├── [locale]/                       # 45개 언어 라우팅
│   │   ├── (landing)/                  # 랜딩·정보 페이지
│   │   ├── pdf/(tools)/[slug]/         # PDF 37개 도구
│   │   ├── image/(tools)/[slug]/       # Image 43개 도구
│   │   ├── text/(tools)/[slug]/        # Text 44개 도구
│   │   ├── converter/(tools)/[slug]/   # Converter 48개 도구
│   │   └── calculator/(tools)/[slug]/  # Calculator 50개 도구
│   └── sitemap.ts
├── lib/
│   ├── {category}/processors/          # 222개 도구 처리 로직 (순수 함수)
│   ├── ui/components/                  # 공유 UI 컴포넌트
│   ├── i18n/                           # 45개 언어 × 6개 사전 카테고리
│   ├── design-tokens/                  # 3-layer 디자인 토큰
│   ├── seo/                            # 메타데이터, JSON-LD, alternates
│   └── analytics/                      # GA4 타입 세이프 이벤트 추적
├── middleware.ts                        # 로케일 감지, RTL, 리다이렉트
└── styles/
```

### 아키텍처 패턴

```
page.tsx (서버) — SEO metadata, generateStaticParams
  → tool-page-client.tsx (클라이언트) — 상태 관리, 파일 처리 라이프사이클
    → [Tool]Processor.tsx — 도구별 UI (Konva, DnD, Virtual Scroll)
      → lib/{category}/processors/*.ts — 순수 처리 함수 (테스트 가능)
```

## Claude Code Skills

[Claude Code](https://claude.ai/claude-code) 커스텀 스킬 11개로 개발 워크플로우를 자동화합니다.

| 스킬 | 설명 |
|------|------|
| `/tool-builder` | 경쟁 서비스 분석 → 도구 페이지 설계 → 구현 |
| `/seed-design` | 경쟁 서비스 UI/디자인 분석 → 프로젝트에 복제 |
| `/section-developer` | 섹션별 UX/UI/기능 개선 제안 및 구현 |
| `/code-review` | 앱/라이브러리 병렬 리뷰 → SOLID, 보안, 성능, i18n, SEO 통합 리포트 |
| `/test-tool` | 프로세서 단위 테스트 실행 및 코드 로직 검증, 테스트 자동 생성 |
| `/translate` | 하드코딩 텍스트 검출 → 번역 키 교체 → 43개 로케일 번역 품질 검증 |
| `/seo` | SEO 감사 → 자동 수정 → Google 인덱싱 확인 |
| `/lighthouse` | PSI API 성능 감사 → 수정 → Before/After 비교 (목표: ALL Green 90+) |
| `/analytics` | GA4 이벤트 설계 → 구현 → 퍼널 분석 리포트 |
| `/release` | 선택한 PR cherry-pick → main 배포 → 버전 태그 생성 |
| `/commit-and-push` | 변경사항 분석 → 한글 커밋 메시지 → 커밋 & 푸시 |

## 시작하기

```bash
pnpm install    # 의존성 설치
pnpm dev        # 개발 서버
pnpm build      # 빌드
pnpm test       # 단위 테스트 (Vitest)
pnpm test:e2e   # E2E 테스트 (Playwright)
pnpm lint       # 린트
pnpm type-check # 타입 체크
```
