---
name: seed-design
description: 경쟁 서비스 URL/스크린샷을 분석하여 디자인 시스템과 UI를 모노레포 내 해당 앱에 복제. Next.js + Tailwind CSS + Framer Motion 기반.
disable-model-invocation: false
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, WebFetch, Task
user-invocable: true
---

# Seed Design — 모노레포 UI Clone Skill

너는 세계 최고의 **Full-stack UI Engineer**이자 **Design System Architect**야.
경쟁 서비스의 URL이나 스크린샷을 분석해서, ToolBox 모노레포 내에 Next.js + Tailwind CSS + Framer Motion 기반 코드로 재현하는 것이 네 임무야.

---

## 프로젝트 컨텍스트

- **모노레포**: Turborepo + pnpm workspace
- **앱**: `apps/{domain}/` — 각각 독립 Next.js 앱
- **공유 패키지**: `packages/ui`, `packages/design-tokens`, `packages/i18n`, `packages/seo` 등
- **배포**: 각 앱 → 서브도메인 (`pdf.toolbox.com`, `video.toolbox.com` 등)

---

## Phase 0: 지식 로드

1. `memory/skills/seed-design-lessons.md` 파일을 읽는다 (없으면 skip)
2. 기존 교훈을 이번 클론 작업에 반영한다

---

## Input 파싱

`$ARGUMENTS`를 파싱한다:

| 인자 형태 | 동작 |
|-----------|------|
| `pdf https://ilovepdf.com/merge_pdf` | PDF 앱에 iLovePDF 병합 UI 클론 |
| `image /path/to/screenshot.png` | Image 앱에 스크린샷 기반 UI 클론 |
| `https://url.com` (앱 미지정) | URL 분석 후 적합한 앱 제안 |
| 인자 없음 | URL 또는 스크린샷 요청 |

**필수**: 타겟 앱을 지정하거나 추론해야 한다.

---

## 모드 감지 (Mode Detection)

### 감지 방법

타겟 앱 디렉토리의 상태를 확인:

```
Glob: apps/{domain}/app/**/*.tsx
Glob: packages/ui/src/components/*.tsx
Glob: packages/design-tokens/tokens/*.ts
```

### 모드 판정

| 조건 | 모드 | 설명 |
|------|------|------|
| 공유 패키지가 아직 없음 | **Foundation 모드** | 디자인 토큰 + 공유 UI + 앱 페이지 전체 생성 |
| 공유 패키지 존재, 앱이 비어있음 | **App Init 모드** | 기존 디자인 시스템 활용, 앱 초기화 |
| 공유 패키지 + 앱 모두 존재 | **Page Add 모드** | 기존 앱에 새 도구 페이지 추가 |

### 모드별 실행 흐름

| Phase | Foundation | App Init | Page Add |
|-------|-----------|----------|----------|
| Phase 1: 분석 | O | O | O |
| Phase 2: 디자인 시스템 | O (packages/) | SKIP | SKIP |
| Phase 3: 컴포넌트 | O (전체) | 증분만 | 증분만 |
| Phase 4: 페이지 | 앱 + 페이지 | 앱 초기화 + 페이지 | 페이지만 |
| Phase 5: 검증 | O | O | O |

---

## Phase 1: 분석 (Analysis)

### URL 입력 시 — 2단계 추출 전략

#### Step 1: WebFetch 시도 (빠른 경로)
```
WebFetch(url, "이 페이지의 UI를 상세히 분석해줘: 레이아웃, 색상, 타이포, 컴포넌트 등")
```

결과가 불충분하면 Step 2로.

#### Step 2: Playwright 동적 추출 (폴백)

```bash
pnpm add -Dw playwright
npx playwright install chromium
```

`scripts/extract-page.mjs` 스크립트로 추출:
1. 렌더링된 HTML 저장
2. 디자인 토큰 추출 (computed styles)
3. 풀페이지 + 섹션별 스크린샷

실행:
```bash
node scripts/extract-page.mjs "TARGET_URL"
```

4가지 소스를 교차 분석:
- `scripts/screenshot-full.png` → 전체 레이아웃
- `scripts/screenshot-section-*.png` → 섹션 디테일
- `scripts/extracted-design.json` → computed 색상, 폰트, 텍스트
- `scripts/extracted-page.html` → HTML 구조

### 분석 체크리스트 (15가지)

1. 전체 레이아웃 구조
2. 각 섹션의 배경색/배경 처리
3. 네비게이션 구조
4. 색상 팔레트 (정확한 hex 값)
5. 타이포그래피 (폰트, 사이즈, weight)
6. 간격 체계 (padding, margin, gap)
7. 그림자, 테두리, border-radius
8. 아이콘/이미지 패턴
9. 컴포넌트 목록 (Button, Card, Badge 등)
10. 파일 업로드 영역 디자인
11. 프로그레스/피드백 디자인
12. 결과/다운로드 영역 디자인
13. 모바일 레이아웃 (반응형 패턴)
14. 애니메이션/인터랙션 패턴
15. 광고 배치 패턴

---

## Phase 2: 디자인 시스템 구축 (Foundation 모드만)

> **App Init / Page Add 모드에서는 SKIP.**

### Step 2-1: 패키지 초기화

```bash
pnpm add -w framer-motion lucide-react clsx tailwind-merge
```

### Step 2-2: 디자인 토큰 (packages/design-tokens)

```typescript
// packages/design-tokens/tokens/colors.ts
export const lightTheme = {
  bg: '#ffffff',
  surface: '#f8f9fa',
  text: '#1a1a2e',
  textSecondary: '#6c757d',
  border: '#e9ecef',
};

export const darkTheme = {
  bg: '#0a0a0f',
  surface: '#12121a',
  text: '#e0e0e0',
  textSecondary: '#888888',
  border: '#2a2a3e',
};

// 앱별 accent color
export const appAccents = {
  pdf: '#E74C3C',
  video: '#8E44AD',
  image: '#27AE60',
  audio: '#F39C12',
  calc: '#2980B9',
  text: '#1ABC9C',
  dev: '#1ABC9C',
  qr: '#6C5CE7',
  convert: '#00B894',
  color: '#FD79A8',
  write: '#A29BFE',
  file: '#74B9FF',
};
```

### Step 2-3: 공유 UI 컴포넌트 (packages/ui)

분석에서 식별된 공통 컴포넌트를 `packages/ui/src/components/`에 생성.

우선순위:
1. **Button** — variant/size 지원
2. **FileUploader** — 드래그앤드롭 + 클릭
3. **ProgressBar** — 파일 처리 진행률
4. **ToolCard** — 도구 목록 카드
5. **ThemeToggle** — 다크/라이트 전환
6. **LanguageSwitcher** — 언어 전환
7. **Header / Footer** — 공통 레이아웃
8. **AdBanner** — 광고 컴포넌트
9. **SectionWrapper** — 모션 래퍼
10. **Badge** — 상태/라벨

### Step 2-4: 유틸리티

`packages/utils/src/cn.ts`:
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

`packages/hooks/src/animations.ts`:
```typescript
import type { Variants } from "framer-motion";
export const fadeInUp: Variants = { ... };
export const staggerContainer: Variants = { ... };
```

---

## Phase 3: 컴포넌트 생성

### Foundation 모드: 전체 생성
### App Init / Page Add 모드: 증분만

1. `Glob("packages/ui/src/components/*.tsx")`로 기존 목록 확인
2. 분석에서 필요한 것 중 **없는 것만** 새로 생성
3. 기존 컴포넌트는 **절대 수정하지 않는다** (variant 추가는 예외)

### 컴포넌트 작성 규칙

1. **파일**: `packages/ui/src/components/{component-name}.tsx`
2. **스타일**: Tailwind CSS + 디자인 토큰 (인라인 스타일은 동적 값에만)
3. **모션**: Framer Motion 적용 (hover, scroll reveal, stagger)
4. **접근성**: 시맨틱 HTML, ARIA, 키보드 내비게이션
5. **다크모드**: `dark:` 프리픽스 필수
6. **반응형**: 모바일 퍼스트
7. **cn()**: 모든 className 조합에 사용

---

## Phase 4: 페이지 클론

### 앱 초기화 (App Init 모드)

```
apps/{domain}/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx        # 앱 레이아웃 (헤더, 푸터)
│   │   ├── page.tsx          # 도구 목록 (홈)
│   │   └── {tool}/
│   │       └── page.tsx      # 개별 도구 페이지
│   ├── sitemap.ts
│   └── robots.ts
├── components/               # 앱 전용 컴포넌트
├── lib/                      # 앱 전용 로직
├── workers/                  # Web Worker
├── next.config.ts
├── tailwind.config.ts        # 공유 config extend
└── package.json
```

### 페이지 조합

```tsx
// apps/{domain}/app/[locale]/page.tsx
import { Header, Footer, ToolCard } from '@toolbox/ui';
import { useTranslations } from 'next-intl';

export default function ToolsHome() {
  const t = useTranslations('common');
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* 도구 카드 그리드 */}
      </main>
      <Footer />
    </div>
  );
}
```

### 디자인 토큰 매핑 규칙 (App Init / Page Add 모드)

> **원본 사이트의 색상을 그대로 쓰지 않는다.**

| 원본 색상 | 하면 안 되는 것 | 해야 하는 것 |
|-----------|---------------|-------------|
| 파란 버튼 | `bg-blue-500` | `bg-primary` |
| 흰 텍스트 | `text-white` | `text-foreground` |
| 회색 텍스트 | `text-gray-400` | `text-muted-foreground` |
| 카드 배경 | `style={{ background: "#151519" }}` | `bg-card` |
| 보더 | `border-white/10` | `border-border` |

---

## Phase 4.5: 디테일 검증

### 체크 항목

| 카테고리 | 자주 놓치는 디테일 |
|---------|-------------------|
| 파일 업로드 | 드롭존 크기, 아이콘, 허용 포맷 표시 |
| 옵션 패널 | 슬라이더 디자인, 토글 스위치, 기본값 |
| 프로그레스 | 바 색상, 퍼센트 표시, 예상 시간 |
| 결과 영역 | 다운로드 버튼 크기, 파일 정보 표시 |
| 모바일 | 햄버거 메뉴, 바텀시트, 터치 타겟 |
| 다크모드 | 모든 섹션에서 대비 확보 |
| i18n | RTL 레이아웃, 긴 번역 텍스트 대응 |

---

## Phase 5: 검증 및 정리

### 빌드 확인
```bash
pnpm --filter {앱이름} build
```

### 임시 파일 정리
```bash
rm -rf scripts/
pnpm remove -w playwright
```

### 최종 보고

```
## Seed Design 완료: {앱이름}

### 생성된 파일
- `packages/ui/...` — 공유 UI 컴포넌트 (N개)
- `apps/{domain}/...` — 앱 페이지 및 컴포넌트

### 디자인 시스템
- Colors: [앱 accent + 공통 토큰]
- Components: [생성된 컴포넌트 목록]

### 다음 단계
- `pnpm --filter {앱이름} dev`로 확인
- 실제 이미지/아이콘 교체
- 추가 도구 페이지 구현
```

---

## 주의사항

### 이미지 제약사항

- 원본 이미지를 직접 사용할 수 없음
- Tailwind 그라디언트 placeholder로 대체
- `next/image`는 도메인 설정이 필요하므로 placeholder에는 div + gradient

### 저작권

- 로고, 상표, 브랜드 에셋 복제 금지
- 텍스트는 원본 구조를 따르되 적절히 변경
- UI/레이아웃 패턴만 참조

### 모노레포 규칙

- 앱 간 직접 import 금지 (반드시 `packages/` 통해서)
- 공유 컴포넌트는 `packages/ui`에, 앱 전용은 `apps/{domain}/components/`에
- 디자인 토큰 변경은 모든 앱에 영향 → 신중하게

---

## 지식 저장 (완료 후)

`memory/skills/seed-design-lessons.md`에 교훈 기록.
