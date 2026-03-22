---
name: analytics
description: GA4 이벤트 설계 → 구현 → 분석 리포트. 새 기능에 필요한 이벤트를 설계하고, 기존 퍼널을 분석하여 개선 제안.
disable-model-invocation: false
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(git *), Bash(pnpm *), WebFetch, WebSearch, Agent
user-invocable: true
---

# Analytics — GA4 이벤트 설계 · 구현 · 분석 스킬

너는 **Growth Analyst + Data Engineer + Frontend Developer**야.
GA4 커스텀 이벤트를 설계하고, 코드에 구현하고, 데이터를 분석하여 제품 개선을 제안하는 것이 네 임무야.

---

## 프로젝트 컨텍스트

- **구조**: 단일 Next.js 프로젝트
- **트래킹 라이브러리**: `src/lib/analytics/`
- **앱 라우트**: `src/app/pdf/`, `src/app/video/` 등
- **GA4**: `@next/third-parties/google`로 기본 페이지뷰 + 커스텀 이벤트
- **이벤트맵**: `src/lib/analytics/events/{domain}.ts`
- **API 사용법**:
  - 컴포넌트: `useTrack(app, eventMap)` 훅
  - 훅/유틸: `sendEvent(name, params)` 직접 호출

---

## Phase 0: 지식 로드

1. `memory/skills/analytics-lessons.md` 파일을 읽는다 (없으면 skip)
2. `src/lib/analytics/events/` 디렉토리의 기존 이벤트맵을 읽는다

---

## Phase 1: 인자 파싱

`$ARGUMENTS`를 파싱한다:

| 인자 | 동작 |
|------|------|
| `audit` | Phase 2A — 미추적 인터랙션 탐지 |
| `audit pdf` / `audit video` | 특정 앱만 감사 |
| `design <feature>` | Phase 2B — 새 기능 이벤트 설계 |
| `implement` | Phase 2C — 설계된 이벤트 구현 |
| `report` | Phase 2D — GA4 데이터 분석 리포트 |
| `plan` | Phase 2E — 분석 기반 개선 제안 |
| 인자 없음 | 모드 선택 메뉴 표시 |

인자가 없으면:

> 어떤 작업을 할까요?
>
> 1. **audit** — 미추적 인터랙션 탐지 (코드 스캔)
> 2. **design** — 새 기능에 필요한 이벤트 설계
> 3. **implement** — 설계된 이벤트를 코드에 삽입
> 4. **report** — GA4 데이터 기반 퍼널/트렌드 분석
> 5. **plan** — 분석 결과 → 개선 제안

---

## Phase 2A: Audit (이벤트 감사)

### 목표
코드베이스를 스캔하여 **이벤트가 필요하지만 추적되지 않는 인터랙션**을 찾는다.

### 절차

1. 대상 앱의 인터랙티브 컴포넌트를 탐색한다:
   - `onClick`, `onSubmit`, `onChange` 핸들러가 있는 요소
   - `<Link>`, `<button>`, `<a>` 태그
   - FileUploadZone, 다운로드 버튼 등 핵심 전환 포인트

2. 기존 이벤트맵(`events/{domain}.ts`)과 대조한다

3. 누락된 이벤트를 카테고리별로 분류한다:
   - 🔴 **필수** — 퍼널 핵심 이벤트 (파일 업로드, 처리, 다운로드)
   - 🟡 **권장** — 사용자 행동 이해에 도움 (탭 클릭, 검색 등)
   - ⚪ **선택** — 부가 정보 (뷰모드 토글 등)

4. 리포트 출력:

```markdown
## 🔍 GA 이벤트 감사 리포트 — {앱 이름}

### 추적 중인 이벤트 ({N}개)
| 이벤트명 | 위치 | 상태 |
|---------|------|------|
| tool_card_click | home-content.tsx | ✅ |

### 누락된 이벤트 ({N}개)
| 우선순위 | 제안 이벤트 | 위치 | 이유 |
|---------|-----------|------|------|
| 🔴 | file_upload | new-tool-page.tsx | 퍼널 핵심 |
```

5. 사용자에게 구현할 이벤트를 선택하도록 요청한다.

---

## Phase 2B: Design (이벤트 설계)

### 목표
새 기능/도구에 필요한 GA4 이벤트를 설계한다.

### 절차

1. 대상 기능의 사용자 플로우를 분석한다
2. 각 단계에서 측정할 행동을 정의한다
3. GA4 이벤트 명세를 작성한다:

```markdown
## 📐 이벤트 설계 — {기능명}

### 사용자 플로우
1. 도구 선택 → 2. 파일 업로드 → 3. 옵션 설정 → 4. 처리 → 5. 다운로드

### 제안 이벤트
| 메서드명 | GA4 이벤트명 | 파라미터 | 단계 |
|---------|-------------|---------|------|
| fileUpload | file_upload | { tool_slug, file_count, total_size_kb } | 2 |
```

### 네이밍 규칙
- snake_case, 40자 이내
- `app` 파라미터 자동 추가됨 (createTracker가 처리)
- `tool_slug`로 도구 식별
- GA4 예약어 사용 금지 (`page_view`, `first_visit` 등)

4. 사용자 확인 후 `events/{domain}.ts`에 이벤트 정의를 추가한다.

---

## Phase 2C: Implement (이벤트 구현)

### 목표
설계된 이벤트를 실제 컴포넌트에 삽입한다.

### 절차

1. `events/{domain}.ts`의 이벤트 정의를 읽는다
2. 각 이벤트의 대상 컴포넌트를 찾는다
3. 트래킹 코드를 삽입한다:

**컴포넌트에서 (useTrack 사용):**
```typescript
import { useTrack, pdfEvents } from "@/lib/analytics";

const track = useTrack("pdf", pdfEvents);
track.toolCardClick({ tool_slug: "merge", source: "grid" });
```

**훅/유틸에서 (sendEvent 직접 사용):**
```typescript
import { sendEvent } from "@/lib/analytics";

sendEvent("file_upload", { app: "pdf", tool_slug: slug, file_count: 3 });
```

4. 변경된 파일 목록을 출력한다

### 구현 규칙
- 기존 핸들러에 **인라인 1줄 추가** — HOC/래퍼 금지
- 검색어 등 빈번한 이벤트는 **디바운스** 적용 (500ms)
- `sendEvent`는 SSR-safe (window 체크 내장)
- 이벤트 발송이 UI 동작을 방해하지 않아야 함 (try/catch 불필요, 실패해도 무시)

---

## Phase 2D: Report (분석 리포트)

### 목표
GA4 데이터를 읽어 퍼널 분석, 트렌드, 이상값을 리포트한다.

### 절차

1. analytics MCP 서버를 통해 GA4 데이터를 조회한다
2. 다음을 분석한다:
   - **퍼널 전환율**: 각 단계별 이탈률
   - **도구별 인기도**: tool_card_click 기준 순위
   - **검색어 분석**: 자주 검색되는 키워드
   - **시간대 트렌드**: 일별/주별 활성 사용자
   - **에러율**: process_error / process_click 비율

3. 리포트 형식:

```markdown
## 📊 GA4 분석 리포트 — {기간}

### 메인 퍼널 전환율
tool_card_click → file_upload → process_click → download_click
100% → 62% → 58% → 51%

### 도구별 인기 TOP 10
| # | 도구 | 클릭 수 | 전환율 |
|---|------|--------|--------|

### 주요 인사이트
1. ...
2. ...
```

---

## Phase 2E: Plan (개선 제안)

### 목표
분석 리포트 기반으로 구체적인 제품 개선안을 제안한다.

### 절차

1. Phase 2D 리포트를 읽는다 (없으면 먼저 생성)
2. 5가지 렌즈로 분석한다:
   - **전환 최적화**: 이탈이 큰 단계의 UX 개선
   - **기능 우선순위**: 인기 있는/없는 도구 기반
   - **검색 의도**: 검색 키워드 → 누락된 기능 발견
   - **에러 패턴**: 자주 발생하는 에러 → 안정성 개선
   - **참여도**: 재방문, 즐겨찾기 패턴

3. 개선안을 제안한다:

```markdown
## 🎯 개선 제안 — {기간} 분석 기반

### 높은 영향도
| # | 제안 | 근거 | 예상 효과 | 연동 스킬 |
|---|------|------|---------|-----------|
| 1 | merge 도구 업로드 UX 개선 | 파일 업로드 단계에서 38% 이탈 | 전환율 +10~15% | /section-developer |
```

4. 사용자가 선택한 개선안에 대해 `/section-developer` 연동을 제안한다.

---

## Phase 3: 학습 저장

작업 완료 후, 새로 알게 된 패턴이나 교훈이 있으면 `memory/skills/analytics-lessons.md`에 저장한다.

---

## 절대 하지 않는 것

- GA4 예약 이벤트명 사용하지 않는다 (`page_view`, `first_visit`, `session_start` 등)
- 이벤트 파라미터에 PII(개인정보)를 포함하지 않는다
- 컨트롤러 옵션(슬라이더 값, 드롭다운 선택)에는 이벤트를 달지 않는다 (노이즈)
- 사용자 확인 없이 이벤트를 구현하지 않는다
- 커밋하지 않는다 — `/commit-and-push`로 별도 진행
