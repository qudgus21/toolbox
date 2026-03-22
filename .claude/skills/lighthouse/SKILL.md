---
name: lighthouse
description: PSI API로 Lighthouse 점수 측정 → 비시각적 코드 최적화 → 배포 → 재측정을 목표 점수까지 반복. 디자인/레이아웃 변경 없이 Performance·Accessibility·SEO·Best Practices를 개선한다.
disable-model-invocation: false
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(git *), Bash(pnpm *), Bash(npx *), Bash(sleep *), WebFetch, mcp__vercel__list_deployments, mcp__vercel__get_deployment, mcp__vercel__list_projects
user-invocable: true
---

# Lighthouse — 성능 측정 & 자동 최적화 스킬

너는 **Web Performance Engineer**야.
PSI API로 운영 환경의 Lighthouse 점수를 측정하고, **디자인/레이아웃을 절대 변경하지 않으면서** 코드 최적화를 수행하여 목표 점수까지 반복한다.

**핵심 원칙: 사용자가 보는 화면은 1픽셀도 바뀌지 않아야 한다. 바뀌는 건 보이지 않는 코드뿐이다.**

---

## 전체 흐름

```
Phase 0: 지식 로드 + 앱/도메인 동적 탐지
Phase 1: 인자 파싱 → 대상 URL 결정
Phase 2: 초기 전체 스캔 (모바일+데스크탑)
Phase 3: 분석 리포트 → 공통/고유 이슈 분류 → 사용자 승인
Phase 4: 공통 이슈 수정 (디자인 변경 금지)
Phase 5: patch 버전 범프 + commit + push + 배포 대기
Phase 6: 홈만 재측정 + 비교 리포트
Phase 7: 목표 도달까지 반복 → 홈 완료 후 페이지별 고유 이슈 처리
Phase 8: 최종 리포트 + 지식 저장
```

---

## Phase 0: 지식 로드

1. `memory/skills/lighthouse-lessons.md` 읽기 (없으면 skip)
2. `.env.local`에서 `PSI_API_KEY` 읽기 (PSI API 호출 시 필수)
3. **앱 동적 탐지**: `apps/` 하위 디렉토리 중 `src/app/` 또는 `app/`이 있는 앱만 활성으로 인식
3. 각 활성 앱에서:
   - `.vercel/project.json` → `projectId`, `orgId`
   - `next.config.ts` → `basePath`
   - `src/lib/tools.ts` (또는 유사 파일) → slug 목록 (`comingSoon: true` 제외). 없으면 홈만 측정
4. `mcp__vercel__list_projects`로 앱별 **실제 운영 도메인** 조회
5. `git tag --sort=-v:refname | head -1`로 최신 버전 태그 확인 (반드시 `git tag` 목록에서 가장 높은 버전을 사용할 것. `git describe`는 태그가 현재 커밋에 없으면 부정확할 수 있음)

**URL 구성 규칙:**
```
{운영도메인}/{basePath?}/{locale}          ← 홈 (최우선)
{운영도메인}/{basePath?}/{locale}/{slug}   ← 개별 도구
```
로케일 기본값: `ko`

---

## Phase 1: 대상 결정

### 인자 파싱

`$ARGUMENTS`를 파싱한다:

| 인자 | 동작 |
|------|------|
| `{앱} {도구}` | 특정 도구 1개 |
| `{앱}` | 해당 앱 전체 (**홈 최우선** + 모든 도구) |
| `all` | 전체 앱 (**각 앱 홈 최우선**) |
| 인자 없음 | Phase 0에서 탐지한 활성 앱 목록 표시 + 선택 요청 |

### 옵션

| 옵션 | 기본값 | 설명 |
|------|--------|------|
| `--target=N` | 90 | 목표 점수 (모든 카테고리) |
| `--max-iterations=N` | 3 | 최대 반복 횟수 |
| `--category=NAME` | 전체 | 특정 카테고리만 |

---

## Phase 2: 초기 전체 스캔

### 측정 전략: 스마트 스캔

- **초기**: 대상 범위의 **모든 페이지** 측정 (전체 현황 파악)
- **반복**: **홈만 재측정** (공통 파일 수정 효과는 홈으로 검증 가능)
- **선별**: 홈 목표 도달 후, 페이지별 고유 이슈가 있는 페이지만 추가 측정

### PSI API 호출

**API Key**: `.env.local`에서 `PSI_API_KEY`를 읽어서 반드시 `&key={PSI_API_KEY}`를 포함할 것. 키 없이 호출하면 429 Rate Limit에 걸림.

각 URL에 대해 모바일/데스크탑 각각 WebFetch:

```
https://www.googleapis.com/pagespeedonline/v5/runPagespeed
  ?url={encodedURL}
  &category=performance&category=accessibility&category=seo&category=best-practices
  &strategy=mobile (또는 desktop)
  &key={PSI_API_KEY}
```

### 응답 파싱

| 데이터 | JSON 경로 |
|--------|----------|
| 카테고리 점수 | `lighthouseResult.categories.{카테고리}.score` (×100) |
| 실패 항목 | `lighthouseResult.audits.{id}` 중 `score < 1` (null 제외) |
| 절약 추정 | `.details.overallSavingsMs`, `.details.overallSavingsBytes` |
| 문제 상세 | `.details.items` (첫 5개) |
| CWV | `largest-contentful-paint`, `cumulative-layout-shift`, `total-blocking-time`, `first-contentful-paint`, `speed-index`의 `numericValue` |

### 에러 핸들링

| 상황 | 대응 |
|------|------|
| 429 (Rate Limit) | 30초 대기 후 재시도 (최대 3회) |
| 500 | URL 유효성 확인, 다른 URL부터 진행 |
| 응답 잘림 | 핵심 점수만 재요청 |
| 404 | 사용자에게 알리고 skip |

---

## Phase 3: 분석 리포트

```
## Lighthouse 초기 스캔 — {앱} ({N}개 페이지)

### 전체 점수 요약

| 페이지 | Perf (M/D) | A11y (M/D) | SEO (M/D) | BP (M/D) |
|--------|-----------|-----------|----------|---------|
| 홈 | {N}/{N} | ... | ... | ... |
| {도구} | ... | ... | ... | ... |
| **평균** | **{N}/{N}** | ... | ... | ... |

### 홈 Core Web Vitals (Mobile)

| 지표 | 값 | 기준 | 상태 |
|------|-----|------|------|
| LCP | {N}s | < 2.5s | Good/NI/Poor |
| CLS | {N} | < 0.1 | Good/NI/Poor |
| TBT | {N}ms | < 200ms | Good/NI/Poor |

### 공통 이슈 ({n}개) — 한 번 수정으로 전체 적용

| # | audit ID | 문제 | 절약량 | 수정 방법 |
|---|----------|------|--------|----------|

### 페이지별 고유 이슈 ({n}개)

| # | 페이지 | audit ID | 문제 | 수정 방법 |
|---|--------|----------|------|----------|

### 수정 불가 이슈 ({n}개)

| # | audit ID | 사유 |
|---|----------|------|

수정을 진행할까요?
```

**반드시 사용자 승인 후** Phase 4로 진행한다.

---

## Phase 4: 코드 자동 수정

### 변경 금지 원칙 (절대 위반 불가)

수정 금지 대상:
- 컴포넌트 순서/위치, 색상/여백/폰트 종류, 이미지 위치/크기/비율
- 레이아웃 grid/flex 구조, UI 텍스트 (SEO 메타데이터는 가능)
- 기존 기능/컴포넌트 삭제, GA/AdSense 제거 (지연 로딩만 가능)

**자가 검증**: 매 수정 후 "이 변경이 화면에 시각적 차이를 만드는가?" — 의심되면 수정하지 않는다.

### Audit → Fix 매핑

#### Performance

| audit ID | 수정 방법 |
|----------|----------|
| `render-blocking-resources` | script defer/async, @next/third-parties 패턴 확인 |
| `unused-javascript` | `next/dynamic` dynamic import, 미사용 import 제거 |
| `unused-css-rules` | Tailwind purge 확인, 미사용 CSS import 제거 |
| `uses-responsive-images` | `next/image` sizes prop 최적화 |
| `offscreen-images` | `loading="lazy"` 확인 |
| `modern-image-formats` | 직접 `<img>` → `next/image` 교체 |
| `font-display` | `next/font` display: 'swap' 확인 |
| `lcp-lazy-loaded` / `preload-lcp-image` | LCP 이미지에 `priority` 추가 |
| `third-party-summary` | GA/AdSense `strategy="lazyOnload"` 전환 |
| `duplicated-javascript` | `pnpm dedupe` |
| `uses-long-cache-ttl` | next.config headers에 Cache-Control 추가 |
| `mainthread-work-breakdown` | `content-visibility: auto`, Web Worker 이동 |
| `dom-size` | 조건부 렌더링 (시각 변경 없이) |
| `bootup-time` / `total-byte-weight` | 코드 스플리팅, 경량 대체 |
| `uses-rel-preconnect` | `<link rel="preconnect">` 추가 |
| `legacy-javascript` | browserslist 확인, 불필요한 polyfill 제거 |
| `uses-text-compression` / `server-response-time` | **수정 불가** (Vercel 인프라) |

#### Accessibility

| audit ID | 수정 방법 |
|----------|----------|
| `image-alt` | 의미 있는 alt 텍스트 추가 |
| `heading-order` | 헤딩 레벨 순서 수정 |
| `html-has-lang` / `meta-viewport` | html 속성/메타 확인 |
| `button-name` / `link-name` | aria-label 추가 |
| `document-title` | generateMetadata 확인 |
| `label` | 폼 label 연결 |
| `tabindex` | tabindex > 0 제거 |
| `color-contrast` / `target-size` | **수정 불가** (디자인 변경) |

#### SEO

| audit ID | 수정 방법 |
|----------|----------|
| `meta-description` | generateMetadata에 description 추가 |
| `canonical` / `hreflang` | alternates 설정 확인 |
| `crawlable-anchors` / `link-text` | 링크 href/텍스트 유효성 |
| `is-crawlable` / `robots-txt` | robots.ts 확인 |
| `structured-data` | JSON-LD 유효성 |
| `font-size` | **수정 불가** (디자인 변경) |

#### Best Practices

| audit ID | 수정 방법 |
|----------|----------|
| `csp-xss` | CSP 헤더 강화 |
| `image-aspect-ratio` / `image-size-responsive` | width/height/sizes 명시 |
| `deprecations` | deprecated API 교체 |
| `errors-in-console` / `inspector-issues` | 원인 코드 수정 |

### 수정 절차

**공통 이슈 먼저 → 페이지별 고유 이슈는 홈 목표 도달 후.**

1. 공통 이슈를 **절약량(overallSavingsMs) 큰 순서**로 정렬
2. 각 이슈: 매핑 테이블 매칭 → Glob/Grep로 파일 특정 → Read → Edit → 시각 변화 자가 검증
3. `pnpm --filter {앱} build`로 빌드 확인. 실패 시 즉시 수정
4. 홈 목표 도달 후, 초기 스캔의 페이지별 고유 이슈 처리 → 해당 페이지만 선별 재측정

---

## Phase 5: 버전 범프 + commit + push + 배포 대기

### Step 5-1: patch 버전 범프

`git tag --sort=-v:refname | head -1`로 최신 버전 태그 확인 → patch +1 → root `package.json` version 업데이트. **주의: 반드시 기존 태그 목록에서 가장 높은 semver 버전을 기준으로 patch를 올릴 것.**

### Step 5-2: commit & push

```bash
git add {수정된 파일들 + package.json}
git commit -m "$(cat <<'EOF'
[{앱이름}] Lighthouse {N}차 최적화 (v{새버전})

- {수정 내용 1}
- {수정 내용 2}

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"

git tag v{새버전}
git push -u origin develop --tags
```

**규칙:**
- 한글 커밋 메시지
- 접두사는 앱 디렉토리명 사용: `[{앱디렉토리명}]`, 여러 앱이면 `[multi]`
- develop 브랜치만 (main 금지)
- 매 반복마다 patch +1

### Step 5-3: 배포 대기

```
반복 (최대 20회, 30초 간격):
  mcp__vercel__list_deployments로 최신 배포 state 확인
  READY    → Phase 6 진행
  ERROR    → mcp__vercel__get_deployment로 에러 확인, 수정 후 재push
  CANCELED → 사용자 알림 후 중단
  그 외     → 30초 대기
```

---

## Phase 6: 재측정 & 비교

**홈 페이지만** 재측정 (모바일 + 데스크탑 = PSI 2회).

```
## 재측정 — 홈 {N}차 (v{버전})

### 점수 비교

| 카테고리 | 이전 M/D | 현재 M/D | 변화 |
|---------|---------|---------|------|

### CWV 비교 (Mobile)

| 지표 | 이전 | 현재 | 변화 |
|------|------|------|------|

### 남은 이슈 / 새로 발견된 이슈
```

---

## Phase 7: 반복 또는 완료

### 탈출 조건 (하나라도 충족 시)

1. 모든 카테고리 Mobile+Desktop **목표 점수 이상** + 페이지별 고유 이슈 없음
2. 코드 수정 가능 이슈 **0개** (인프라만 남음)
3. **최대 반복 횟수** 도달
4. 점수 **정체/하락 2회 연속**

### 반복

Phase 4 → 5 → 6 반복. 이미 수정한 audit은 skip. 홈 목표 도달 후 페이지별 고유 이슈로 전환.

### 최종 리포트

```
## Lighthouse 최적화 완료

> 반복: {N}회 | 버전: v{초기} → v{최종}

### 점수 변화

| 카테고리 | 초기 (M/D) | 최종 (M/D) | 변화 |
|---------|-----------|-----------|------|

### 적용된 수정 ({n}개)

| # | audit ID | 수정 내용 | 파일 |
|---|----------|----------|------|

### 수정 불가 이슈 + 수동 개선 제안

| audit ID | 사유 | 해결 방법 |
|----------|------|----------|

### 커밋 이력

| 버전 | 커밋 | 메시지 |
|------|------|--------|
```

---

## Phase 8: 지식 저장

`memory/skills/lighthouse-lessons.md`에 인사이트 기록:

```markdown
### {번호}. {제목}
- **페이지**: {어떤 페이지}
- **audit**: {어떤 audit}
- **교훈**: {배운 것}
- **효과**: {점수 변화}
- **날짜**: {YYYY-MM-DD}
```

---

## 절대 하지 않는 것

1. **디자인/레이아웃 변경** — 시각적 변화를 일으키는 어떤 수정도 금지
2. **main 브랜치에 push** — develop만
3. **사용자 확인 없이 수정 시작** — Phase 3 리포트 후 승인 필수
4. **기능 제거** — GA/AdSense 포함, 지연 로딩 전환만 허용
5. **최대 반복 횟수 초과**
6. **이미 수정한 audit 재수정**

---

## 한글 사용

- 모든 리포트, 커밋 메시지는 **한글**
- 기술 용어(LCP, CLS, TBT, PSI, audit 등)는 영문 그대로
- 코드 내 주석 최소화
