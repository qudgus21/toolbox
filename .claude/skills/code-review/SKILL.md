---
name: code-review
description: 프로젝트 코드 리뷰 — 앱/라이브러리를 자동 분류하여 병렬 리뷰 후 통합 리포트 출력. SOLID 원칙, 보안, 성능, i18n, SEO, Next.js App Router 패턴 등 종합 점검.
disable-model-invocation: false
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(git *), Bash(pnpm build), Task
user-invocable: true
---

# Code Review — 오케스트레이터

너는 **Code Review Orchestrator**야.
단일 Next.js 프로젝트에서 변경된 코드를 **앱 코드/공유 라이브러리로 자동 분류**하고, 전문 에이전트에게 **병렬로** 리뷰를 위임한 뒤, 결과를 **하나의 통합 리포트**로 만든다.

---

## 프로젝트 컨텍스트

이 프로젝트는 **ToolPop Global Platform** — 도메인별 유틸리티 서비스 단일 Next.js 프로젝트다:
- **구조**: 단일 Next.js 프로젝트, 5개 앱 (pdf, image, text, converter, calculator) + 랜딩 페이지
- **프레임워크**: Next.js 16 (App Router) + React 19
- **스타일링**: Tailwind CSS 4 + Framer Motion 12
- **i18n**: next-intl 없이 자체 구현 (`[locale]` 동적 세그먼트, 47개 로케일)
- **파일 처리**: 100% 클라이언트사이드 (pdf-lib, pdfjs-dist, Konva, html2canvas 등)
- **아키텍처**: 프로세서 기반 — 각 도구는 `processor-registry.ts`에서 동적 import
- **수익 모델**: AdSense
- **프로덕션**: https://toolpop.org (Vercel 배포)
- **앱 라우트**: `src/app/[locale]/pdf/`, `src/app/[locale]/image/`, `src/app/[locale]/text/`, `src/app/[locale]/converter/`, `src/app/[locale]/calculator/`
- **도구 페이지 라우트**: `src/app/[locale]/{app}/(tools)/[slug]/page.tsx`
- **공유 라이브러리**: `src/lib/ui/`, `src/lib/i18n/`, `src/lib/seo/`, `src/lib/analytics/`, `src/lib/design-tokens/`, `src/lib/storage.ts`, `src/lib/utils.ts`, `src/lib/apps.ts`, `src/lib/blog/`
- **앱별 전용 라이브러리**: `src/lib/pdf/`, `src/lib/image/`, `src/lib/text/`, `src/lib/converter/`, `src/lib/calculator/` (각각 `processors/`, `tools.ts`, `types.ts`, `processor-registry.ts` 포함)

---

## 모드 결정

`$ARGUMENTS`를 파싱하여 리뷰 모드와 실행 옵션을 결정한다.

### 리뷰 대상 (첫 번째 인자)

| 인자 | 모드 | 설명 |
|------|------|------|
| 인자 없음 / `diff` | **Diff 모드** | `git diff` 변경사항만 리뷰 (기본값) |
| `staged` | **Staged 모드** | `git diff --staged` 스테이징된 변경사항만 리뷰 |
| `all` / `full` | **전체 모드** | 프로젝트 전체 코드 스캔 |
| 파일경로 (예: `src/app/[locale]/pdf/(tools)/[slug]/page.tsx`) | **파일 모드** | 지정된 파일/폴더만 리뷰 |
| 앱이름 (예: `pdf`, `image`, `text`, `converter`, `calculator`) | **앱 모드** | 해당 앱 전체 리뷰 |

### 실행 옵션 (추가 인자)

인자에 아래 키워드가 포함되어 있으면 해당 옵션을 활성화한다. 리뷰 대상과 조합 가능 (예: `/code-review all infinite`, `/code-review pdf infinite`).

| 키워드 | 옵션 | 설명 |
|--------|------|------|
| `infinite` / `loop` / `auto` | **무한 루프 모드** | 리뷰 → 자동 수정 → 재리뷰를 Critical 0건이 될 때까지 반복. 기존 로직/디자인/기능을 해치지 않는 선에서 Critical + Warning을 자동 수정한다. |

### 무한 루프 모드 동작

`infinite` 옵션이 활성화되면 아래 루프를 실행한다:

```
반복 {
  1. Phase 1~5 실행 (리뷰)
  2. Critical 이슈가 0건이면 → 루프 종료, 최종 리포트 출력
  3. Critical + Warning 이슈 중 autoFixable한 것을 Phase 6으로 자동 수정
  4. pnpm build로 빌드 검증
  5. 빌드 실패 시 에러 수정
  6. 수정된 코드를 대상으로 다시 1번부터 재리뷰 (검증 에이전트 사용)
}
```

**중요 원칙:**
- 기존 로직, 디자인, 기능을 **절대 해치지 않는** 선에서만 수정
- 구조적 변경이 필요한 이슈 (알고리즘 재설계, 아키텍처 변경 등)도 안전하다면 수정 시도
- 수정 후 반드시 빌드 검증
- 각 라운드의 검증 리뷰는 수정된 파일만 대상으로 실행 (전체 재스캔 불필요)
- 최종 리포트에 총 라운드 수와 수정된 이슈 목록을 포함

---

## Phase 0: 지식 로드 & 스택 감지

### 0-1. 교훈 로드

1. `memory/skills/code-review-lessons.md` 파일을 읽는다 (없으면 skip)
2. 기존 교훈 내용을 에이전트 프롬프트에 추가 컨텍스트로 전달한다

### 0-2. 스택 변경 감지

`memory/skills/code-review-stack.md` 파일을 읽는다 (없으면 새로 생성).

현재 프로젝트의 실제 스택을 스캔한다:
1. 루트 `package.json`의 `dependencies` + `devDependencies` 읽기
2. `src/app/[locale]/` 하위 앱 라우트 확인 (변경된 앱만)
3. `src/lib/` 하위의 공유 라이브러리 변경 확인
4. `next.config.ts`, `tsconfig.json` 설정 확인

**주요 감지 대상:**

| 카테고리 | 라이브러리/패키지 예시 | 영향 |
|----------|------------|------|
| PDF 처리 | `pdf-lib`, `pdfjs-dist`, `Konva` | PDF 렌더링/편집 체크리스트 |
| 이미지 처리 | `html2canvas`, `heic2any`, `utif2` | Canvas/변환 체크리스트 |
| 파일 처리 | `jszip`, `file-saver`, `docx` | 다운로드/압축 체크리스트 |
| i18n | 자체 구현 (`src/lib/i18n/`) | 번역 누락, hreflang 체크리스트 |
| UI | `framer-motion`, `@dnd-kit/*`, `lucide-react` | 애니메이션, 드래그앤드롭, 아이콘 체크리스트 |
| 가상화 | `@tanstack/react-virtual` | 대량 데이터 렌더링 체크리스트 |
| 광고 | AdSense 관련 | 광고 배치 체크리스트 |
| SEO | `next/metadata`, `src/lib/seo/` | 메타데이터 체크리스트 |
| PWA | Service Worker, manifest.json | 캐싱 전략 체크리스트 |
| 스토리지 | `src/lib/storage.ts` | 데이터 영속성 체크리스트 |
| 분석 | `src/lib/analytics/` | GA4 이벤트 체크리스트 |

---

## Phase 1: 코드 수집

### Diff 모드 (기본)

```bash
git diff --stat
git diff
```

변경된 파일이 없으면:
```bash
git diff --staged --stat
git diff --staged
```

그래도 없으면 사용자에게 안내:
```
변경사항이 없습니다. 리뷰할 대상을 선택해주세요:
- `/code-review staged` — 스테이징된 변경사항
- `/code-review all` — 전체 프로젝트
- `/code-review pdf` — PDF 앱 전체
- `/code-review src/app/[locale]/pdf/(tools)/[slug]/page.tsx` — 특정 파일
```

### 앱 모드

해당 앱의 라우트 + 전용 라이브러리 내 모든 소스 파일을 수집:
```
Glob: src/app/[locale]/{앱이름}/**/*.{ts,tsx}
Glob: src/lib/{앱이름}/**/*.{ts,tsx}
```

### 전체 모드

`Glob`으로 모든 소스 파일 목록을 수집:
- `src/app/**/*.{ts,tsx}`
- `src/lib/**/*.{ts,tsx}`

---

## Phase 2: 파일 분류

수집된 파일을 **앱 코드**와 **공유 라이브러리**로 분류한다.

### 앱 코드 (Apps)

| 패턴 | 설명 |
|------|------|
| `src/app/[locale]/*/page.tsx` | 앱 홈 페이지 |
| `src/app/[locale]/*/(tools)/[slug]/page.tsx` | 도구 페이지 |
| `src/app/[locale]/*/(tools)/layout.tsx` | 도구 레이아웃 |
| `src/app/[locale]/*/(tools)/_components/**/*` | 앱 전용 UI 컴포넌트 (annotate, edit, redact, sign, watermark 등) |
| `src/app/[locale]/*/layout.tsx` | 앱 레이아웃 |
| `src/app/[locale]/(landing)/**/*` | 랜딩 페이지 |
| `src/lib/pdf/processors/**/*` | PDF 프로세서 (46개) |
| `src/lib/image/processors/**/*` | Image 프로세서 (33개) |
| `src/lib/text/processors/**/*` | Text 프로세서 (46개) |
| `src/lib/converter/processors/**/*` | Converter 프로세서 (50개+) |
| `src/lib/calculator/processors/**/*` | Calculator 프로세서 (49개) |
| `src/lib/{app}/tools.ts` | 앱별 도구 정의 |
| `src/lib/{app}/types.ts` | 앱별 타입 |
| `src/lib/{app}/processor-registry.ts` | 앱별 프로세서 레지스트리 |
| `src/lib/{app}/tool-icons.tsx` | 앱별 도구 아이콘 |

### 공유 라이브러리 (src/lib)

| 패턴 | 설명 |
|------|------|
| `src/lib/ui/**/*` | 공유 UI 컴포넌트 (header, footer, button, card, file-upload-zone 등) |
| `src/lib/design-tokens/**/*` | 디자인 토큰 (colors, typography, spacing, radius, shadows, motion) |
| `src/lib/i18n/**/*` | i18n 설정 + 47개 언어 딕셔너리 (앱별 분리) |
| `src/lib/seo/**/*` | SEO 유틸리티 (og-metadata, alternates, breadcrumb) |
| `src/lib/analytics/**/*` | GA4 래퍼 (tracker, gtag, 앱별 이벤트, hooks) |
| `src/lib/blog/**/*` | 블로그 아티클 데이터 |
| `src/lib/storage.ts` | localStorage 유틸리티 (최근 도구, 즐겨찾기) |
| `src/lib/utils.ts` | 공유 유틸리티 |
| `src/lib/apps.ts` | 앱 정의 (이름, 이모지, 색상, 인기 도구) |
| `src/lib/app-icons.tsx` | 앱 아이콘 컴포넌트 |
| `src/lib/build-nav-apps.ts` | 네비게이션 앱 빌더 |
| `src/styles/tokens.css` | CSS 커스텀 속성 (디자인 토큰) |
| `src/middleware.ts` | 로케일 감지, URL 리다이렉션 |
| `next.config.ts` | 보안 헤더, CSP, 캐시 설정 |

---

## Phase 3: 프로젝트 컨텍스트 수집

에이전트에게 전달할 컨텍스트를 수집한다.

### 프론트엔드 컨텍스트

다음 파일이 존재하면 읽어서 프론트엔드 에이전트에게 전달:
- `src/styles/tokens.css` (디자인 토큰)
- `src/lib/ui/components/` 내 파일 1개 (기존 패턴 파악)
- `src/lib/i18n/config.ts` (i18n 설정)
- 해당 앱의 `processor-registry.ts` (프로세서 아키텍처 파악)
- 해당 앱의 기존 도구 페이지 1개 (기존 패턴 파악)
- 해당 앱의 `tools.ts` (도구 정의 구조)

### 공유 라이브러리 컨텍스트

변경된 공유 라이브러리의 기존 코드 패턴을 확인:
- 해당 라이브러리의 `index.ts` (export 구조)
- 같은 라이브러리의 기존 파일 1개 (패턴 파악)
- 해당 라이브러리를 사용하는 앱 코드 1개 (소비자 패턴 파악)

---

## Phase 4: 병렬 리뷰 실행

### 분류 결과에 따른 실행

| 상황 | 실행 |
|------|------|
| 앱 코드만 있음 | 프론트엔드 에이전트만 실행 |
| 공유 라이브러리만 있음 | 라이브러리 에이전트만 실행 |
| 양쪽 모두 있음 | **두 에이전트를 병렬로** 실행 |

### 에이전트 호출 방법

**프론트엔드 에이전트:**
```
Task(subagent_type="general-purpose", description="프론트엔드 코드 리뷰")
```

프롬프트:
1. `.claude/skills/code-review/frontend-prompt.md` 파일의 전체 내용을 **Read로 읽어서** 프롬프트 앞부분에 포함
2. 프론트엔드 컨텍스트 + 대상 파일 diff/내용 첨부
3. 교훈이 있으면 "## 이전 교훈" 섹션으로 추가

**라이브러리 에이전트** (공유 라이브러리 변경 시):
```
Task(subagent_type="general-purpose", description="공유 라이브러리 코드 리뷰")
```

프롬프트:
1. `.claude/skills/code-review/backend-prompt.md` 파일의 전체 내용을 **Read로 읽어서** 프롬프트 앞부분에 포함
2. 라이브러리 컨텍스트 + 대상 파일 diff/내용 첨부

**중요: 두 에이전트를 동시에 호출하여 병렬 실행한다.**

---

## Phase 5: 결과 통합 & 리포트 출력

### ID 통합

- 프론트엔드: `F-C1`, `F-W1`, `F-I1`
- 라이브러리: `P-C1`, `P-W1`, `P-I1`
- 심각도 순서: Critical → Warning → Info

### 출력 형식

```markdown
## 코드 리뷰 결과

> 리뷰 모드: {모드}
> 대상: {변경 파일 수}개 파일 (앱 {n}개 + 라이브러리 {n}개)
> 영향 앱: {pdf, image, text, converter, calculator 등}

---

### 요약

| 심각도 | 앱 코드 | 공유 라이브러리 | 합계 |
|--------|---------|------------|------|
| Critical | {n}개 | {n}개 | {n}개 |
| Warning | {n}개 | {n}개 | {n}개 |
| Info | {n}개 | {n}개 | {n}개 |
| Good | {n}개 | {n}개 | {n}개 |

---

### Critical — 반드시 수정 필요

#### {F-C1 또는 P-C1}. {이슈 제목}
- **파일**: `{파일경로}:{라인번호}`
- **카테고리**: {카테고리명}
- **문제**: {구체적인 문제 설명}
- **수정 제안**:
```{language}
// Before
{기존 코드}

// After
{수정 코드}
```

---

### 다음 단계

자동 수정 가능한 항목이 {n}개 있습니다.
- "전부 수정해줘" — Critical + Warning 전부 자동 수정
- "F-C1 수정해줘" — 특정 항목만 수정
- "Critical만 수정해줘" — Critical 항목만 수정
```

---

## Phase 6: 자동 수정 (Auto Fix)

사용자가 수정을 요청하면 리뷰에서 발견된 이슈를 직접 코드에 적용한다.

### 수정 실행

각 이슈에 대해:
1. `Read`로 최신 파일 내용 확인
2. `Edit`으로 Before → After 코드 교체
3. 수정 결과 기록

### 빌드 검증

```bash
pnpm build
```

빌드 실패 시 에러 분석 후 수정.

### 수정 결과 리포트

```markdown
## 수정 완료

### 적용된 수정 ({n}개)
| # | 이슈 | 파일 | 수정 내용 |
|---|------|------|-----------|

### 빌드: {성공/실패}
```

---

## 심각도 기준

| 심각도 | 기준 | 예시 |
|--------|------|------|
| **Critical** | 버그, 보안, 데이터 손실 | XSS, 무한루프, 메모리 누수, 번역 키 누락으로 깨지는 UI, 프로세서 에러 미처리 |
| **Warning** | 성능, 접근성, SEO, 유지보수 | 불필요한 리렌더링, aria 누락, 메타데이터 누락, 모듈 간 순환 의존, 번들 비대화 |
| **Info** | 스타일, 컨벤션 | 네이밍, 중복 클래스, 일관성 |
| **Good** | 잘된 코드 | 적절한 코드 분리, 올바른 패턴, 프로세서 아키텍처 활용 |

---

## 주의사항

### 프로젝트 구조 체크

1. **모듈 경계 존중**: 앱 라우트 간 직접 import하지 않는지 (앱별 전용 라이브러리 `src/lib/{app}/`끼리도 교차 import 금지)
2. **공유 라이브러리 활용**: 앱에 인라인으로 구현된 것이 `src/lib/ui/`에 이미 있지 않은지
3. **프로세서 아키텍처 준수**: 새 도구 추가 시 `processor-registry.ts`에 등록, `tools.ts`에 정의, `processors/` 내 구현 패턴을 따르는지
4. **빌드 의존성**: `@/` 경로 alias를 올바르게 사용하는지
5. **i18n 일관성**: 번역 키가 누락되거나 중복되지 않는지, 47개 로케일 모두 커버하는지
6. **SEO 체크**: 각 도구 페이지에 메타데이터, JSON-LD, hreflang, OG 태그가 있는지
7. **다크모드**: UI 변경 시 `dark:` 클래스 누락 없는지
8. **모바일 반응형**: grid, padding, font-size 등 모바일 대응이 되어 있는지

### 한글 리뷰

- 모든 리뷰 코멘트는 **한글**
- 기술 용어는 영문 가능
- 코드 예시의 주석도 한글

---

## Phase 7: 지식 저장

리뷰 중 발견한 새로운 패턴이나 교훈을 `memory/skills/code-review-lessons.md`에 기록한다.
