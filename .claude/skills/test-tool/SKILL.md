---
name: test-tool
description: PDF 도구 프로세서 단위 테스트 실행 & 코드 로직 검증. 특정 도구(merge, split 등) 또는 전체를 테스트하고, 코드 데이터 흐름까지 추적하여 버그를 찾아낸다. 테스트 파일이 없으면 자동 생성.
disable-model-invocation: false
user-invocable: true
---

# Test Tool — PDF 프로세서 테스트 & 코드 검증 스킬

너는 **QA Engineer + Code Auditor**야.
PDF 도구의 프로세서 로직을 단위 테스트로 검증하고, UI→프로세서 데이터 흐름을 코드 분석으로 추적하여 버그를 찾아낸다.
**테스트 파일이 없으면 프로세서 코드를 분석하여 자동 생성한다.**

---

## Phase 0: 인자 파싱 & 대상 결정

사용자 입력을 파싱한다:

| 입력 | 동작 |
|------|------|
| `merge` | 병합 프로세서만 테스트 |
| `split` | 분할 프로세서만 테스트 |
| `전체` 또는 인자 없음 | 모든 프로세서 테스트 |
| 특정 도구명 | 해당 프로세서 테스트 (있으면) |

### 대상 프로세서 확인

```
Glob: apps/pdf/src/lib/processors/*.ts
```

각 프로세서에 대해 테스트 파일 존재 여부 확인:
```
Glob: apps/pdf/src/lib/processors/__tests__/{도구명}.test.ts
```

---

## Phase 1: 테스트 파일 확인 & 자동 생성

### Step 1-1: 테스트 파일 존재 확인

대상 프로세서의 테스트 파일이 있는지 확인한다:

```
apps/pdf/src/lib/processors/__tests__/{도구명}.test.ts
```

**테스트 파일이 있으면** → Phase 2로 진행
**테스트 파일이 없으면** → Step 1-2에서 자동 생성

### Step 1-2: 프로세서 코드 분석 & 테스트 자동 생성

#### A. 프로세서 코드 읽기

```
Read: apps/pdf/src/lib/processors/{도구명}.ts
```

코드에서 아래를 추출한다:

1. **함수 시그니처** — 어떤 options를 받는지
2. **모든 분기** — if/else, switch, 삼항 연산자
3. **옵션 키 목록** — `options.xxx as Type` 패턴 추출
4. **출력 형태** — 단일 PDF vs 다중 PDF(ZIP)
5. **에러 조건** — throw, 폴백 로직
6. **엣지 케이스** — 빈 배열, 범위 초과, 0/null 처리

#### B. 관련 UI 코드 읽기 (옵션 이해용)

```
Glob: apps/pdf/src/app/[locale]/(tools)/_components/{도구명}-options.tsx
Glob: apps/pdf/src/app/[locale]/(tools)/_components/{도구명}-*.tsx
```

UI에서 어떤 옵션 조합이 가능한지 파악한다.

#### C. 테스트 파일 생성

아래 **필수 테스트 카테고리** 기준으로 테스트를 작성한다.

**테스트 파일 위치:**
```
apps/pdf/src/lib/processors/__tests__/{도구명}.test.ts
```

**필수 테스트 카테고리:**

1. **기본 동작** — 가장 일반적인 사용 케이스 (기본 옵션으로 실행)
2. **모든 옵션 조합** — 프로세서의 각 옵션 키가 결과에 반영되는지
3. **DnD 순서 반영** — 순서 변경이 출력에 **실제로** 반영되는지 (해당하는 경우)
4. **엣지 케이스** — 빈 입력, 범위 초과, 1페이지 PDF, 잘못된 값, 0/음수, 중복 등
5. **출력 포맷** — 단일 PDF vs ZIP, 파일명 패턴, blob 타입, size 일치
6. **다양한 PDF 타입** — 가로(landscape), 혼합 크기, 회전된 페이지, 대용량
7. **progress 콜백** — 0~100 범위, 단조 증가, 마지막 값 100
8. **결과물 실제 검증** — 결과 PDF를 열어서 페이지 순서/회전/크기가 기대값과 일치하는지 확인

**테스트 작성 규칙:**

- `describe`로 카테고리 구분, `it`으로 개별 케이스
- 한글로 테스트 설명 작성
- 기존 helpers.ts의 유틸 함수 활용
- 프로세서의 **모든 코드 분기가 최소 1개 테스트로 커버**되어야 함
- 각 옵션의 기본값(생략 시)과 명시적 값 모두 테스트
- **결과물을 반드시 실제로 열어서 검증** — 페이지 수만 체크하면 안 됨:
  - `getPageOrder(pdf)` — 결과 PDF의 페이지 순서가 기대한 대로인지 확인
  - `getPageRotations(pdf)` — 회전 각도가 올바르게 적용되었는지 확인
  - `getPageSizes(pdf)` — 페이지 크기(가로/세로)가 보존되었는지 확인
  - DnD 테스트: "8페이지를 4번 위치로 이동" 같은 시나리오에서 **실제 결과 PDF를 열어 페이지 순서가 바뀌었는지** 검증
  - ZIP 결과: `extractZipPdfs`로 개별 PDF를 꺼내서 각각의 내용 검증
- **엣지 케이스 테스트 시 주의**: 프로세서의 clamping/필터 로직을 고려하여 테스트 기댓값을 설정. 예: 범위 `{from:5, to:3}`이 5페이지 PDF에서 `{from:5, to:3}` → `from > to` → 필터됨. 하지만 `{from:8, to:6}` → clamp → `{from:5, to:5}` → 유효해짐

**헬퍼 import:**
```typescript
import { describe, it, expect } from "vitest";
import { PDFDocument } from "pdf-lib";
import processorFn from "../{도구명}";
import {
  loadFixture,           // 테스트 PDF 로드 (test-fixtures에서)
  createMarkedPdf,       // 마킹된 PDF 생성 (순서 검증용, 각 페이지 width = 500 + pageNum)
  resultToPdf,           // 결과 Blob → PDFDocument
  extractZipPdfs,        // ZIP Blob → PDFDocument[] (파일명 숫자순 정렬)
  extractZipFilenames,   // ZIP Blob → 파일명 배열 (숫자순 정렬)
  getResultPageCounts,   // 결과의 페이지 수 배열 (PDF/ZIP 자동 감지)
  getPageOrder,          // PDFDocument → 원래 페이지 번호 배열 (width - 500). DnD 순서 검증용
  getPageRotations,      // PDFDocument → 회전 각도 배열. 회전 검증용
  getPageSizes,          // PDFDocument → {width, height}[] 배열. 크기 보존 검증용
  createProgressTracker, // progress 값 기록
  fileId,                // merge용 파일 키 생성
} from "./helpers";
```

**사용 가능한 테스트 PDF 픽스처:**
```
01-single-page.pdf      — 1p, A4 세로
02-multi-page-10.pdf    — 10p, A4 세로
03-many-pages-50.pdf    — 50p, A4 세로
04-landscape.pdf        — 1p, A4 가로
05-rotated-pages.pdf    — 4p, 회전된 페이지
06-with-metadata.pdf    — 1p, 메타데이터 포함
07-mixed-sizes.pdf      — 5p, 혼합 크기
08-text-heavy.pdf       — 3p, 텍스트 많음
09-colorful.pdf         — 3p, 색상 많음
10-security-test.pdf    — 1p, 보안 테스트
11-large-500-pages.pdf  — 500p, 대용량
```

#### D. helpers.ts 확인 & 확장

```
Read: apps/pdf/src/lib/processors/__tests__/helpers.ts
```

새 프로세서에 필요한 헬퍼가 없으면 helpers.ts에 추가한다.
기존 헬퍼는 절대 수정하지 않는다 (추가만).

#### E. 생성 완료 확인

```bash
cd /Applications/hbh/dev/tools/apps/pdf && npx vitest run --reporter=verbose src/lib/processors/__tests__/{도구명}.test.ts 2>&1
```

모든 테스트가 통과하면 Phase 2로 진행.
실패하면 테스트 코드를 수정하고 재실행.

---

## Phase 2: 단위 테스트 실행

### Step 2-1: 테스트 실행

전체:
```bash
cd /Applications/hbh/dev/tools/apps/pdf && npx vitest run --reporter=verbose 2>&1
```

특정 도구만:
```bash
cd /Applications/hbh/dev/tools/apps/pdf && npx vitest run --reporter=verbose src/lib/processors/__tests__/{도구}.test.ts 2>&1
```

### Step 2-2: 결과 분석

- 통과/실패 테스트 수
- 실패한 테스트의 상세 내용
- 예상값 vs 실제값 비교

### Step 2-3: 테스트 커버리지 갭 분석

현재 테스트에 빠진 케이스가 없는지 확인한다:

1. 프로세서 코드를 읽는다:
   ```
   Read: apps/pdf/src/lib/processors/{도구}.ts
   ```

2. 모든 분기(if/else, switch)를 추출한다

3. 각 분기가 테스트되고 있는지 확인한다:
   ```
   Read: apps/pdf/src/lib/processors/__tests__/{도구}.test.ts
   ```

4. 누락된 테스트 케이스가 있으면 **즉시 추가**하고 다시 실행한다

---

## Phase 3: 코드 데이터 흐름 추적

### 분석 대상 흐름

각 도구별로 아래 흐름을 코드 레벨에서 추적한다:

```
UI 컴포넌트 (옵션 입력)
  → onChange (옵션 객체 생성)
    → tool-page-client.tsx (processFiles 호출)
      → use-tool-processor.ts (프로세서 실행)
        → processors/{도구}.ts (실제 처리)
          → 결과 생성 (Blob/ZIP)
```

### Step 3-1: 옵션 흐름 검증

대상 도구의 옵션 컴포넌트를 읽는다:

```
Grep: "onChange" in apps/pdf/src/app/[locale]/(tools)/_components/{도구}-options.tsx
```

모든 옵션 키를 추출하고, 각 키가:
1. 옵션 UI에서 올바르게 생성되는지
2. tool-page-client에서 프로세서에 전달되는지
3. 프로세서에서 올바르게 사용되는지

검증한다.

### Step 3-2: 프리뷰 → 프로세서 동기화 검증

프리뷰 컴포넌트에서 변경되는 상태(DnD 순서, 선택 등)가 프로세서에 정확히 전달되는지 확인한다:

```
Grep: "onExtractPagesChange|onRangesReorder|onRegisterSet" in apps/pdf/src/app/[locale]/(tools)/_components/
```

각 콜백 체인을 끝까지 추적:
- 프리뷰에서 상태 변경 → 콜백 호출
- tool-page-client에서 ref에 저장
- 옵션 컴포넌트에서 override 상태로 반영
- onChange에서 프로세서 옵션에 포함
- 프로세서에서 해당 옵션 사용

### Step 3-3: 조작 가능한 모든 UI 요소 목록화

해당 도구의 모든 인터랙티브 요소를 코드에서 추출한다:

```
Grep: "onClick|onChange|onToggle|onDragEnd|onRemove|onReorder|onCardClick" in {관련 컴포넌트들}
```

각 요소에 대해:
- 어떤 상태를 변경하는지
- 그 상태가 최종 프로세서 옵션에 반영되는지
- 프로세서가 해당 옵션을 올바르게 처리하는지

를 확인하고, 연결이 끊긴 곳이 있으면 **버그로 보고**한다.

---

## Phase 4: 리포트 출력

### 출력 형식

```
## 테스트 결과 — {도구명 또는 "전체"}

### 테스트 파일 상태
| 프로세서 | 테스트 파일 | 상태 |
|---------|-----------|------|
| merge | merge.test.ts | ✅ 기존 |
| split | split.test.ts | ✅ 기존 |
| compress | compress.test.ts | 🆕 자동 생성 |

### 단위 테스트
| 결과 | 수 |
|------|---|
| ✅ 통과 | {N} |
| ❌ 실패 | {N} |
| ⏭ 스킵 | {N} |

{실패한 테스트 상세 (있을 경우)}

### 커버리지 갭
{누락된 테스트 케이스 목록 (있을 경우)}
- ✅ 추가 완료: {추가한 테스트 설명}
- ⚠️ 추가 필요: {아직 추가하지 못한 테스트}

### 데이터 흐름 검증
| 흐름 | 상태 |
|------|------|
| {옵션A} UI → 프로세서 | ✅ 정상 |
| {옵션B} DnD → 프로세서 | ❌ 끊김 (상세) |
| ... | ... |

### 발견된 버그
{버그 목록. 없으면 "발견된 버그 없음"}

| # | 위치 | 설명 | 심각도 |
|---|------|------|--------|
| 1 | `파일:라인` | 설명 | 높/중/낮 |

### 요약
- 전체 {N}개 테스트 중 {N}개 통과
- 데이터 흐름 {N}개 검증, {N}개 정상
- 발견 버그: {N}건
```

---

## Phase 5: 버그 자동 수정 (선택)

발견된 버그가 있으면:

1. 버그 목록을 보여주고 수정 여부를 물어본다
2. 사용자가 수정을 요청하면:
   - 코드 수정
   - 해당 버그를 검증하는 테스트 케이스 추가
   - 테스트 재실행으로 수정 확인

---

## 주의사항

- 테스트 실행 시 `--reporter=verbose` 플래그로 상세 결과 출력
- 실패한 테스트는 반드시 원인을 분석하고 보고
- 코드 수정은 사용자 확인 후에만 진행
- 테스트 추가 시 기존 테스트 구조와 일관성 유지
- 한글로 모든 보고서 작성
- helpers.ts 수정 시 기존 함수는 변경하지 않고 추가만
- 테스트 자동 생성 후 반드시 실행하여 통과 확인

---

## 결과물 검증 원칙 (가장 중요)

**페이지 수만 세는 것은 검증이 아니다.** 결과 PDF를 실제로 열어서 내용이 맞는지 확인해야 한다.

### 순서 검증 (`createMarkedPdf` + `getPageOrder`)

`createMarkedPdf(N)`은 각 페이지에 고유한 width(500 + pageNum)를 부여한다.
`getPageOrder(pdf)`는 각 페이지의 width에서 500을 빼서 원래 페이지 번호를 추출한다.

```typescript
// 10페이지 PDF에서 8번을 4번 위치로 DnD 이동
const file = await createMarkedPdf(10);
const result = await processor([file], {
  extractPages: [1, 2, 3, 8, 4, 5, 6, 7, 9, 10],
});
const pdfs = await extractZipPdfs(result.blob);
expect(await getPageOrder(pdfs[3])).toEqual([8]); // 4번째 파일이 원래 8페이지인지 확인
```

### 회전 검증 (`getPageRotations`)

```typescript
const pdf = await resultToPdf(result.blob);
expect(getPageRotations(pdf)).toEqual([90, 0, 180, 270]); // 실제 각도 확인
```

### 크기 보존 검증 (`getPageSizes`)

```typescript
const pdf = await resultToPdf(result.blob);
const sizes = getPageSizes(pdf);
expect(sizes[0]).toEqual({ width: 842, height: 595 }); // landscape 보존 확인
```

### ZIP 정렬 주의

`extractZipPdfs`와 `extractZipFilenames`는 **숫자순** 정렬한다 (`_2.pdf` < `_10.pdf`).
파일명에서 `_(\d+)\.pdf` 패턴의 숫자를 추출하여 정렬하므로, 알파벳순 오정렬 문제가 없다.
