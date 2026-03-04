# PDF ToolBox — 도구 구현 가이드

> 41개 PDF 도구를 일관된 톤앤매너, 아키텍처, UX 패턴으로 구현하기 위한 가이드 문서.
> 도구를 구현하면서 발견한 패턴과 교훈을 지속적으로 반영한다.

---

## 1. 아키텍처 원칙

### 1.1 클라이언트 사이드 처리 (Client-Side First)

모든 PDF 처리는 **브라우저에서 직접** 수행한다.

- **이유**: 서버 비용 Zero, 개인정보 보호(파일이 서버에 전송되지 않음), 오프라인 가능성
- **한계를 인정**: OCR, 복잡한 변환(Word→PDF 등)은 클라이언트 한계가 있음 → 이런 도구는 Phase 2에서 서버 사이드 추가
- **Web Worker 사용**: 무거운 처리는 메인 스레드를 차단하지 않도록 Web Worker에서 실행

### 1.2 서버 컴포넌트 / 클라이언트 컴포넌트 분리

```
page.tsx (서버)          → SEO, 메타데이터, 번역 로드
  └─ tool-page-client.tsx (클라이언트) → 공통 레이아웃 + 업로드 UI
       └─ [ToolName]Processor.tsx (클라이언트) → 도구별 고유 로직 + UI
```

- `page.tsx`는 **절대 클라이언트 컴포넌트로 전환하지 않는다**
- 도구별 고유 UI/로직은 별도 Processor 컴포넌트로 분리

### 1.3 패키지 역할 분담

| 패키지 | 역할 |
|--------|------|
| `@toolbox/ui` | 재사용 가능한 순수 UI 컴포넌트 (FileUploadZone, ProgressBar, Button 등) |
| `@toolbox/hooks` | 공통 훅 (useFileProcessor, useDownload 등) |
| `apps/pdf/src/lib/processors/` | PDF 도구별 처리 함수 (순수 함수, UI 무관) |
| `apps/pdf/src/app/[locale]/(tools)/_components/` | 도구 페이지 전용 컴포넌트 |

---

## 2. 핵심 라이브러리

### 2.1 필수 의존성

```bash
# PDF 조작 (생성, 편집, 병합, 분할, 메타데이터 등)
pnpm add pdf-lib --filter @toolbox/pdf

# PDF 렌더링 + 텍스트 추출 (미리보기, 페이지 선택 UI, 텍스트 변환)
pnpm add pdfjs-dist --filter @toolbox/pdf

# 파일 다운로드 헬퍼
pnpm add file-saver --filter @toolbox/pdf
pnpm add -D @types/file-saver --filter @toolbox/pdf

# ZIP 생성 (분할 등 다중 파일 출력)
pnpm add jszip --filter @toolbox/pdf
```

### 2.2 라이브러리 역할 매핑

| 라이브러리 | 용도 | 사용 도구 |
|-----------|------|----------|
| `pdf-lib` | PDF 구조 조작 | merge, split, rotate, delete-pages, extract-pages, organize-pages, page-numbers, watermark, crop, flatten, resize, edit-metadata, compress, protect, unlock |
| `pdfjs-dist` | PDF 렌더링/파싱 | 미리보기 썸네일, pdf-to-jpg, pdf-to-png, pdf-to-text, grayscale |
| `jszip` | ZIP 압축 | split, pdf-to-jpg, pdf-to-png, extract-pages |
| `file-saver` | 파일 다운로드 | 모든 도구 |

### 2.3 Phase 2 (서버 사이드 필요 도구)

다음 도구들은 클라이언트만으로 고품질 구현이 어렵다. Phase 1에서는 "준비 중" 상태로 두거나 제한적 기능만 제공:

- **변환 계열**: word-to-pdf, excel-to-pdf, ppt-to-pdf, html-to-pdf, pdf-to-word, pdf-to-excel, pdf-to-ppt
- **고급 기능**: ocr, translate, compare, repair, scan-to-pdf
- **편집**: annotate, sign, edit-pdf (자유 편집)

---

## 3. 파일 처리 파이프라인

### 3.1 상태 머신

모든 도구는 동일한 상태 흐름을 따른다:

```
IDLE → FILES_LOADED → CONFIGURING → PROCESSING → DONE → (IDLE로 리셋)
                                        ↓
                                      ERROR
```

```typescript
// apps/pdf/src/lib/types.ts

export type ProcessingStatus =
  | "idle"           // 초기 상태 (업로드 대기)
  | "loaded"         // 파일 로드 완료 (옵션 설정 가능)
  | "processing"     // 처리 중 (프로그레스 바 표시)
  | "done"           // 완료 (다운로드 가능)
  | "error";         // 에러 발생

export interface ProcessingState {
  status: ProcessingStatus;
  progress: number;        // 0-100
  files: File[];           // 입력 파일
  result: ProcessingResult | null;
  error: string | null;
}

export interface ProcessingResult {
  blob: Blob;              // 결과 파일
  filename: string;        // 다운로드 파일명
  size: number;            // 바이트
  pageCount?: number;      // PDF 페이지 수
  thumbnailUrl?: string;   // 미리보기 URL
}
```

### 3.2 프로세서 함수 규격

각 도구의 핵심 로직은 **순수 함수**로 작성한다:

```typescript
// apps/pdf/src/lib/processors/merge.ts

export interface MergeOptions {
  // 도구별 옵션
}

export async function mergePdf(
  files: File[],
  options: MergeOptions,
  onProgress: (percent: number) => void,
): Promise<ProcessingResult> {
  // 1. 파일 읽기
  // 2. PDF 처리
  // 3. 결과 반환
}
```

**규칙**:
- UI 의존성 없는 순수 함수
- `onProgress` 콜백으로 진행률 보고
- 에러는 throw (catch는 UI 레이어에서)
- 한 파일에 한 프로세서만 export

### 3.3 프로세서 디렉토리 구조

```
apps/pdf/src/lib/
├── types.ts                    # 공통 타입
├── processors/
│   ├── index.ts                # 프로세서 레지스트리
│   ├── merge.ts
│   ├── split.ts
│   ├── compress.ts
│   ├── rotate.ts
│   └── ...
└── utils/
    ├── pdf-helpers.ts          # PDF 공통 유틸 (로드, 썸네일 생성 등)
    └── download.ts             # 다운로드 헬퍼
```

---

## 4. UI 패턴

### 4.1 도구 페이지 3단계 UI

모든 도구 페이지는 **동일한 3단계 UI 흐름**을 갖는다:

#### Stage 1: 업로드 (idle)
```
┌─────────────────────────────────────┐
│                                     │
│      📄 파일을 여기에 놓으세요        │
│      또는 클릭하여 선택              │
│                                     │
│      지원 형식: .pdf                │
│                                     │
└─────────────────────────────────────┘
```

#### Stage 2: 설정 + 미리보기 (loaded)
```
┌──────────────────┬──────────────────┐
│ [파일 목록/미리보기] │ [옵션 패널]       │
│                  │                  │
│ 📄 file1.pdf     │ ○ 옵션 A         │
│ 📄 file2.pdf     │ ○ 옵션 B         │
│                  │ □ 체크박스        │
│ [+ 파일 추가]     │                  │
│                  │ [처리 시작 버튼]   │
└──────────────────┴──────────────────┘
```
- 도구에 따라 옵션 패널이 없을 수도 있음 (예: merge는 순서만 변경)
- 모바일에서는 세로 스택 레이아웃

#### Stage 3: 결과 (done)
```
┌─────────────────────────────────────┐
│  ✅ 처리 완료                        │
│                                     │
│  📄 merged.pdf (2.3 MB, 15 pages)  │
│                                     │
│  [⬇ 다운로드]    [🔄 다시 시작]      │
└─────────────────────────────────────┘
```

### 4.2 공통 UI 컴포넌트 (추가 필요)

```
@toolbox/ui에 추가:
├── ProgressBar          # 처리 진행률
├── FileList             # 업로드된 파일 목록 (삭제, 재정렬)
├── ResultCard           # 결과 다운로드 카드
├── ProcessingOverlay    # 처리 중 오버레이
└── ErrorMessage         # 에러 표시

apps/pdf 전용:
├── PdfThumbnail         # PDF 페이지 썸네일 (pdfjs 사용)
├── PageSelector         # 페이지 범위 선택기
├── PageReorder          # 드래그 앤 드롭 페이지 재정렬
└── OptionPanel          # 도구별 옵션 래퍼
```

### 4.3 반응형 규칙

| 뷰포트 | 레이아웃 |
|--------|---------|
| Mobile (`< 640px`) | 단일 컬럼, 세로 스택 |
| Tablet (`640-1024px`) | Stage 2에서 2컬럼 (6:4 비율) |
| Desktop (`> 1024px`) | Stage 2에서 2컬럼 (7:3 비율) |

### 4.4 애니메이션

- Stage 전환: `framer-motion` `AnimatePresence` + `fade/slide`
- 파일 추가/제거: `layoutId` 활용한 자연스러운 전환
- 진행률: CSS transition (프레임 드롭 방지를 위해 framer-motion 대신)
- **과하지 않게**: 기능적 의미가 있는 애니메이션만 사용

### 4.5 다크모드

- 모든 컴포넌트는 시맨틱 토큰만 사용 (`text-foreground`, `bg-surface`, `border-border` 등)
- 하드코딩된 색상 절대 금지 (`text-gray-500` ❌ → `text-foreground-muted` ✅)
- 이미지/아이콘의 다크모드 대비 확인

---

## 5. i18n 패턴

### 5.1 번역 키 추가 규칙

도구 구현 시 새로운 UI 텍스트가 필요하면:

```typescript
// packages/i18n/src/config.ts → Dictionary 타입에 추가
export interface Dictionary {
  // ...기존...
  common: {
    // ...기존...
    processing: string;        // "처리 중..."
    download: string;          // "다운로드"
    downloadAll: string;       // "모두 다운로드"
    reset: string;             // "다시 시작"
    addFiles: string;          // "파일 추가"
    removeFile: string;        // "파일 제거"
    error: string;             // "오류가 발생했습니다"
    retry: string;             // "다시 시도"
    pages: string;             // "페이지"
    fileSize: string;          // "파일 크기"
    completed: string;         // "완료"
  };
}
```

**규칙**:
- 도구별 고유 텍스트 → `dict.tools[slug]` 하위에 추가
- 범용 텍스트 → `dict.common`에 추가
- **절대 하드코딩 금지**: `"Processing..."` ❌ → `dict.common.processing` ✅
- 43개 언어 전부 번역 추가 (Claude에게 맡기되, 번역투 금지 원칙 준수)

### 5.2 도구별 옵션 번역

```typescript
// Dictionary 타입 확장
tools: Record<string, {
  title: string;
  description: string;
  options?: Record<string, string>;  // 도구별 옵션 레이블
}>;
```

---

## 6. 도구 분류 및 구현 우선순위

### Phase 1 — 클라이언트 사이드 완전 구현 가능 (20개)

| # | 도구 | 핵심 라이브러리 | 복잡도 | 구현 순서 |
|---|------|----------------|--------|----------|
| 1 | merge | pdf-lib | ⭐ | 1st (가장 기본, 패턴 확립용) |
| 2 | split | pdf-lib + jszip | ⭐⭐ | 2nd |
| 3 | rotate | pdf-lib | ⭐ | 3rd |
| 4 | compress | pdf-lib | ⭐⭐ | 4th |
| 5 | delete-pages | pdf-lib | ⭐ | 5th |
| 6 | extract-pages | pdf-lib + jszip | ⭐⭐ | 6th |
| 7 | organize-pages | pdf-lib | ⭐⭐⭐ | 7th (드래그 앤 드롭 UI) |
| 8 | pdf-to-jpg | pdfjs-dist | ⭐⭐ | 8th |
| 9 | pdf-to-png | pdfjs-dist | ⭐⭐ | 9th |
| 10 | pdf-to-text | pdfjs-dist | ⭐⭐ | 10th |
| 11 | jpg-to-pdf | pdf-lib | ⭐ | 11th |
| 12 | png-to-pdf | pdf-lib | ⭐ | 12th |
| 13 | image-to-pdf | pdf-lib | ⭐ | 13th |
| 14 | page-numbers | pdf-lib | ⭐⭐ | 14th |
| 15 | watermark | pdf-lib | ⭐⭐ | 15th |
| 16 | crop | pdf-lib + pdfjs | ⭐⭐⭐ | 16th |
| 17 | flatten | pdf-lib | ⭐ | 17th |
| 18 | resize | pdf-lib | ⭐⭐ | 18th |
| 19 | edit-metadata | pdf-lib | ⭐ | 19th |
| 20 | grayscale | pdfjs-dist + pdf-lib | ⭐⭐⭐ | 20th |

### Phase 1.5 — 제한적 클라이언트 구현 (5개)

| 도구 | 설명 |
|------|------|
| protect | pdf-lib의 암호화 기능 (AES 지원 제한적) |
| unlock | 비밀번호 입력 후 pdf-lib로 복호화 시도 |
| pdf-to-pdfa | 제한적 변환 (완전한 PDF/A 준수는 어려움) |
| redact | 영역 선택 → 검정 박스 오버레이 (진짜 redaction은 제한적) |
| web-optimize | 리니어라이즈 없이 기본 최적화만 |

### Phase 2 — 서버 사이드 필요 (16개)

| 도구 | 이유 |
|------|------|
| pdf-to-word | 복잡한 레이아웃 변환 (LibreOffice 등 필요) |
| pdf-to-excel | 테이블 추출 + 변환 |
| pdf-to-ppt | 슬라이드 변환 |
| word-to-pdf | LibreOffice / Puppeteer 필요 |
| excel-to-pdf | 동일 |
| ppt-to-pdf | 동일 |
| html-to-pdf | Puppeteer / Playwright 필요 |
| ocr | Tesseract.js는 가능하나 품질/속도 이슈 |
| translate | 번역 API 필요 |
| compare | 고도 비교 알고리즘 필요 |
| repair | 저수준 PDF 구조 복구 |
| scan-to-pdf | 이미지 보정 + OCR |
| annotate | 자유 편집 (별도 에디터 필요) |
| sign | 서명 패드 + 위치 지정 (별도 UI) |
| edit-pdf | WYSIWYG 편집 (매우 복잡) |

---

## 7. 첫 번째 도구 구현 레퍼런스: merge

> 이 섹션은 실제 merge 구현 후 업데이트된다.
> 다른 모든 도구는 이 패턴을 따른다.

### 7.1 파일 구조

```
apps/pdf/src/
├── lib/
│   ├── types.ts                          # ProcessingState, ProcessingResult 등
│   ├── processors/
│   │   └── merge.ts                      # mergePdf() 순수 함수
│   └── utils/
│       ├── pdf-helpers.ts                # loadPdf, generateThumbnail 등
│       └── download.ts                   # downloadBlob, downloadZip
├── app/[locale]/(tools)/
│   ├── [slug]/page.tsx                   # 서버 컴포넌트 (기존 유지)
│   └── _components/
│       ├── tool-page-client.tsx          # 공통 도구 클라이언트 (상태 머신 통합)
│       ├── stages/
│       │   ├── upload-stage.tsx           # Stage 1: 업로드
│       │   ├── processing-stage.tsx       # 처리 중 오버레이
│       │   └── result-stage.tsx           # Stage 3: 결과
│       └── tools/
│           ├── merge-tool.tsx             # Stage 2: merge 전용 설정 UI
│           ├── split-tool.tsx
│           └── ...
```

### 7.2 프로세서 예시

```typescript
// apps/pdf/src/lib/processors/merge.ts
import { PDFDocument } from "pdf-lib";
import type { ProcessingResult } from "../types";

export interface MergeOptions {
  /** 파일 순서 (인덱스 배열) */
  order: number[];
}

export async function mergePdf(
  files: File[],
  options: MergeOptions,
  onProgress: (percent: number) => void,
): Promise<ProcessingResult> {
  const merged = await PDFDocument.create();
  const orderedFiles = options.order.map((i) => files[i]);
  const total = orderedFiles.length;

  for (let i = 0; i < total; i++) {
    const bytes = await orderedFiles[i].arrayBuffer();
    const doc = await PDFDocument.load(bytes);
    const pages = await merged.copyPages(doc, doc.getPageIndices());
    for (const page of pages) {
      merged.addPage(page);
    }
    onProgress(Math.round(((i + 1) / total) * 100));
  }

  const pdfBytes = await merged.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });

  return {
    blob,
    filename: "merged.pdf",
    size: blob.size,
    pageCount: merged.getPageCount(),
  };
}
```

### 7.3 도구 컴포넌트 예시

```typescript
// apps/pdf/src/app/[locale]/(tools)/_components/tools/merge-tool.tsx
"use client";

import { useState } from "react";
import { FileList, Button } from "@toolbox/ui";

interface MergeToolProps {
  files: File[];
  onProcess: (options: { order: number[] }) => void;
  onAddFiles: () => void;
  onRemoveFile: (index: number) => void;
  labels: {
    addFiles: string;
    merge: string;
    // ...
  };
}

export function MergeTool({ files, onProcess, onAddFiles, onRemoveFile, labels }: MergeToolProps) {
  const [order, setOrder] = useState(() => files.map((_, i) => i));

  // 드래그 앤 드롭으로 순서 변경
  // ...

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
      <FileList
        files={files}
        order={order}
        onReorder={setOrder}
        onRemove={onRemoveFile}
        draggable
      />
      <div className="flex flex-col gap-4">
        <Button variant="secondary" onClick={onAddFiles}>
          {labels.addFiles}
        </Button>
        <Button variant="accent" onClick={() => onProcess({ order })}>
          {labels.merge}
        </Button>
      </div>
    </div>
  );
}
```

---

## 8. 에러 처리

### 8.1 에러 분류

| 에러 타입 | 예시 | 사용자 메시지 |
|----------|------|-------------|
| `FILE_TOO_LARGE` | 100MB 초과 | "파일이 너무 큽니다 (최대 100MB)" |
| `INVALID_FORMAT` | PDF가 아닌 파일 | "지원하지 않는 파일 형식입니다" |
| `CORRUPTED_PDF` | 깨진 PDF | "PDF 파일을 읽을 수 없습니다" |
| `PASSWORD_PROTECTED` | 암호화된 PDF | "암호로 보호된 파일입니다" |
| `PROCESSING_FAILED` | 처리 중 에러 | "처리 중 오류가 발생했습니다" |
| `BROWSER_UNSUPPORTED` | API 미지원 | "이 브라우저에서는 지원하지 않습니다" |

### 8.2 에러 처리 원칙

- **사용자 친화적 메시지**: 기술적 에러가 아닌 번역된 안내 메시지
- **복구 가능성 안내**: "다시 시도" 또는 "다른 파일을 선택" 제안
- **콘솔에 상세 로그**: 개발자 디버깅용 원본 에러 로깅
- **상태 자동 복구**: 에러 후 "다시 시작" 버튼으로 idle 상태로 리셋

---

## 9. 성능 가이드

### 9.1 대용량 파일 처리

- **100MB 제한**: FileUploadZone에서 이미 적용됨
- **청크 처리**: 페이지 단위로 나눠서 progress 업데이트
- **메모리 관리**: 처리 완료 후 ArrayBuffer, ObjectURL 즉시 해제
  ```typescript
  URL.revokeObjectURL(thumbnailUrl);
  ```

### 9.2 Web Worker (추후 적용)

Phase 1에서는 메인 스레드에서 처리하되, 처리 시간이 긴 도구(compress, grayscale)는 추후 Web Worker로 마이그레이션:

```typescript
// 추후: apps/pdf/src/workers/pdf-processor.worker.ts
```

### 9.3 번들 사이즈

- `pdf-lib`: ~300KB (gzip ~90KB) — 허용 범위
- `pdfjs-dist`: ~900KB (gzip ~300KB) — **동적 import 필수**
  ```typescript
  // pdfjs가 필요한 도구에서만 동적 로드
  const pdfjs = await import("pdfjs-dist");
  ```

---

## 10. 테스트 전략

### 10.1 프로세서 단위 테스트

```typescript
// apps/pdf/src/lib/processors/__tests__/merge.test.ts
import { mergePdf } from "../merge";

describe("mergePdf", () => {
  it("두 PDF를 하나로 병합한다", async () => { ... });
  it("빈 파일 목록에서 에러를 throw한다", async () => { ... });
  it("진행률을 올바르게 보고한다", async () => { ... });
});
```

### 10.2 수동 테스트 체크리스트

각 도구 구현 후 반드시 확인:

- [ ] 파일 업로드 (드래그 앤 드롭 + 클릭)
- [ ] 잘못된 파일 형식 거부
- [ ] 처리 진행률 표시
- [ ] 결과 다운로드
- [ ] "다시 시작" 리셋
- [ ] 모바일 레이아웃
- [ ] 다크모드
- [ ] 한국어/영어 번역 확인
- [ ] 대용량 파일 (10MB+) 처리

---

## 11. 네이밍 컨벤션

### 파일명

| 종류 | 규칙 | 예시 |
|------|------|------|
| 프로세서 | `{slug}.ts` | `merge.ts`, `split.ts` |
| 도구 컴포넌트 | `{slug}-tool.tsx` | `merge-tool.tsx` |
| 테스트 | `{slug}.test.ts` | `merge.test.ts` |

### 함수명

| 종류 | 규칙 | 예시 |
|------|------|------|
| 프로세서 | `{action}Pdf` | `mergePdf()`, `splitPdf()` |
| 옵션 타입 | `{Action}Options` | `MergeOptions`, `SplitOptions` |

### 번역 키

| 범위 | 규칙 | 예시 |
|------|------|------|
| 공통 | `dict.common.{key}` | `dict.common.download` |
| 도구별 | `dict.tools.{slug}.{key}` | `dict.tools.merge.title` |

---

## 12. 체크리스트 — 새 도구 추가 시

1. [ ] `apps/pdf/src/lib/processors/{slug}.ts` — 프로세서 함수 작성
2. [ ] `apps/pdf/src/lib/processors/index.ts` — 레지스트리에 등록
3. [ ] `apps/pdf/src/app/[locale]/(tools)/_components/tools/{slug}-tool.tsx` — 도구 UI 작성
4. [ ] 번역 키 추가 (43개 언어)
5. [ ] `tool-page-client.tsx` — 도구별 분기 추가
6. [ ] 모바일 레이아웃 확인
7. [ ] 다크모드 확인
8. [ ] 수동 테스트 통과

---

## 부록 A: 참고할 경쟁 서비스

| 서비스 | 특징 | 참고 포인트 |
|--------|------|-----------|
| iLovePDF | 심플한 UX, 빠른 처리 | 3단계 UI 흐름 |
| Smallpdf | 깔끔한 디자인 | 미리보기, 애니메이션 |
| PDF24 | 완전 무료, 다양한 도구 | 기능 범위 |

## 부록 B: 변경 이력

| 날짜 | 변경 내용 |
|------|----------|
| 2025-03-05 | 초기 가이드 작성 |
