# @toolbox/pdf

브라우저에서 동작하는 PDF 도구 모음. pdf-lib와 pdfjs-dist를 활용하여 서버 없이 클라이언트사이드에서 PDF를 처리합니다.

## 실행

```bash
# 개발 서버 (port 3001)
pnpm dev --filter @toolbox/pdf

# 빌드
pnpm build --filter @toolbox/pdf

# 테스트
pnpm test --filter @toolbox/pdf

# 테스트 (watch 모드)
cd apps/pdf && pnpm test:watch
```

## 아키텍처

### 라우팅

```
src/app/[locale]/(tools)/[slug]/page.tsx   ← 서버 컴포넌트 (SEO, 메타데이터)
                        /_components/
                          tool-page-client.tsx  ← 클라이언트 허브 (상태, 프로세서 연결)
                          file-list.tsx         ← 파일 목록 (DnD, 썸네일)
                          *-options.tsx          ← 도구별 옵션 패널
```

각 도구는 `[slug]`로 구분되며, 하나의 서버 컴포넌트(`page.tsx`)가 번역과 메타데이터를 주입하고, 클라이언트 컴포넌트(`tool-page-client.tsx`)가 실제 UI와 프로세서를 연결합니다.

### 프로세서 패턴

도구의 실제 처리 로직은 `src/lib/processors/`에 독립된 파일로 분리됩니다.

```typescript
// src/lib/processors/merge.ts
const merge: ProcessorFn = async (files, options, onProgress) => {
  // 1. 파일 읽기
  // 2. 처리 (pdf-lib 활용)
  // 3. 결과 Blob 반환
  return { blob, filename, size, pageCount };
};
```

**ProcessorFn 시그니처:**

```typescript
type ProcessorFn = (
  files: File[],
  options: Record<string, unknown>,
  onProgress: (percent: number) => void,
) => Promise<ProcessingResult>;
```

프로세서는 `processor-registry.ts`에서 lazy import로 등록되어 필요할 때만 로드됩니다.

### 도구 정의

`src/lib/tools.ts`에 도구 메타데이터가 정의됩니다:

```typescript
{
  slug: "merge",
  title: "Merge PDF",
  description: "...",
  icon: Merge,           // lucide-react 아이콘
  emoji: "📎",
  category: "organize",  // organize | convert | edit | optimize | security
  acceptedTypes: ".pdf",
  comingSoon?: true,
}
```

### 이미지 처리 (Image → PDF)

pdf-lib은 PNG와 JPEG만 네이티브 지원합니다. GIF, WebP, AVIF, SVG, BMP, ICO 등은 브라우저 Canvas를 통해 PNG로 변환 후 임베딩합니다:

```
이미지 파일 → magic bytes 감지 → PNG/JPEG → pdf-lib 직접 임베딩
                                → 기타 포맷 → Canvas 변환 → PNG → 임베딩
```

## 핵심 의존성

| 라이브러리 | 용도 |
|-----------|------|
| pdf-lib | PDF 생성/수정 (병합, 분할, 페이지 조작 등) |
| pdfjs-dist | PDF 렌더링 (썸네일, 텍스트 추출) |
| @dnd-kit | 파일/페이지 드래그앤드롭 재정렬 |
| @tanstack/react-virtual | 대량 페이지 가상 스크롤 |
| jszip | 다중 파일 결과물 ZIP 압축 |
| file-saver | 결과 파일 다운로드 |
| framer-motion | UI 애니메이션 |

## 테스트

```
src/lib/processors/__tests__/
├── helpers.ts           # 공통 유틸 (픽스처 로드, PDF 검증 등)
├── merge.test.ts
├── split.test.ts
├── compress.test.ts
├── image-to-pdf.test.ts
└── ...
```

**테스트 픽스처** (`test-fixtures/`):

```
test-fixtures/
├── pdf/     # 다양한 PDF (1p, 10p, 50p, 500p, landscape, rotated, ...)
├── jpg/     # JPEG 이미지
├── png/     # PNG 이미지
└── images/  # 기타 포맷 (GIF, WebP, AVIF, SVG, BMP, ICO, ...)
```

**검증 헬퍼:**

- `createMarkedPdf(n)` — 페이지마다 고유 width를 부여한 테스트 PDF 생성
- `getPageOrder(pdf)` — 결과 PDF의 페이지 순서 검증
- `getPageSizes(pdf)` — 페이지 크기 검증
- `getPageRotations(pdf)` — 회전 각도 검증
- `extractZipPdfs(blob)` — ZIP 결과물에서 개별 PDF 추출

## 새 도구 추가 체크리스트

1. **프로세서** — `src/lib/processors/{slug}.ts` 생성
2. **레지스트리 등록** — `processor-registry.ts`에 lazy import 추가
3. **도구 정의** — `tools.ts`에 메타데이터 추가
4. **옵션 컴포넌트** — `_components/{slug}-options.tsx` (옵션이 있는 경우)
5. **클라이언트 연결** — `tool-page-client.tsx`에 옵션 상태/렌더링 추가
6. **페이지 연결** — `[slug]/page.tsx`에 번역 props 전달
7. **번역** — `packages/i18n/src/config.ts` 타입 + 45개 사전 파일
8. **테스트** — `processors/__tests__/{slug}.test.ts`
