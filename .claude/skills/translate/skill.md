---
name: translate
description: i18n 하드코딩 검증 & 번역 누락 완전 제거 & 43개 로케일 번역 품질 검증. 모든 사용자 노출 텍스트를 검사하여 하드코딩 영어를 찾아내고 번역 키로 교체. 43개 로케일 영어 fallback 잔류 검출. 무한루프 검증.
disable-model-invocation: false
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(pnpm build*), Agent
user-invocable: true
---

# Translate — i18n 하드코딩 완전 제거 + 번역 품질 검증 스킬

너는 **i18n 감사 전문가**야. 서비스 전체에서 사용자에게 노출되는 모든 하드코딩 텍스트를 찾아내고, 번역 딕셔너리 키로 교체하며, **43개 로케일 전부가 해당 언어로 제대로 번역되어 있는지** 검증하는 것이 네 임무야.

**핵심 원칙:**
1. **사용자 눈에 보이는 텍스트는 단 한 글자도 하드코딩하지 않는다.**
2. **ko, en 외 43개 로케일에 영어가 그대로 들어가 있으면 미번역이다. 반드시 해당 언어로 번역한다.**
3. **번역은 번역투가 아니라, 해당 언어의 네이티브 서비스처럼 자연스럽게 작성한다.**

---

## 번역 품질 규칙 (매우 중요)

### 절대 금지: 번역투
- ❌ "무료이며 빠르고 간편합니다" → ⭕ "무료 · 빠르고 · 간편해요"
- ❌ "이 도구를 사용하면 텍스트를 변환할 수 있습니다" → ⭕ "텍스트 변환 도구"
- ❌ "Octets" (프랑스어 Bytes) — 기술 용어도 해당 언어권에서 실제 쓰는 표현인지 확인

### 번역 기준
1. **UI 라벨**: 짧고 명확하게. "Average Word Length" → "평균 단어 길이" (O), "단어의 평균적인 길이" (X)
2. **에러 메시지**: 사용자가 이해할 수 있게 자연스럽게. "유효하지 않은 Base64 입력입니다." (O)
3. **보고서 텍스트**: 보고서 톤 유지. 제목/구분선(===, ---) 형식은 유지하되 내용만 번역
4. **기술 용어**: 해당 언어권에서 실제 사용하는 표현 사용
   - "Bytes"는 대부분 언어에서 그대로 "Bytes" 사용 (러시아어: "Байт", 아랍어: "بايت" 등 현지화된 경우만 변경)
   - "Flesch Reading Ease"는 해당 개념이 현지화된 경우 현지 표현 사용, 아니면 영어 유지
5. **과한 해석 금지**: 원문의 의미를 충실히 전달하되, 딱딱한 직역은 피한다
   - "Unique Words" → "고유 단어" (O), "유일무이한 단어" (X), "Unique Words" (X)

### [DUP] 마커 현지화
- 한국어: [중복], 일본어: [重複], 중국어: [重复], 러시아어: [ДУБЛ], 아랍어: [مكرر]
- 해당 언어에서 "중복"을 짧게 표현하는 자연스러운 약어 사용

### Flesch 등급 현지화
- 각 나라의 교육 체계에 맞게 적응 (예: 미국 5th grade → 한국 초등 5학년 → 프랑스 CM2)
- 교육 체계 매핑이 어려우면 난이도 표현만 사용 (매우 쉬움, 쉬움, 보통, 어려움 등)

---

## Phase 0: 대상 파악

### 인자 파싱

사용자가 인자를 제공하면 해당 앱/범위만 검사한다:
- `text` → `src/app/[locale]/text/`, `src/lib/text/`, `src/lib/i18n/text-*`
- `pdf` → `src/app/[locale]/pdf/`, `src/lib/pdf/`, `src/lib/i18n/dictionaries/`
- `image` → `src/app/[locale]/image/`, `src/lib/image/`, `src/lib/i18n/image-*`
- `landing` → `src/app/[locale]/(landing)/`, `src/lib/i18n/landing-*`
- `all` 또는 인자 없음 → 전체 스캔

### 감사할 레이어 목록

| 레이어 | 설명 | 놓치기 쉬운 이유 |
|--------|------|------------------|
| **1. .tsx 컴포넌트** | JSX 텍스트, aria-label, title, placeholder | 가장 기본 |
| **2. 프로세서 output** | 에러 메시지, 보고서 텍스트, 상태 문자열 | 순수함수라 i18n 안 넣기 쉬움 |
| **3. 프로세서 stats 키** | `stats: { longestWord: ... }` → UI에서 키가 라벨로 변환 | formatLabel()이 영어 변환 |
| **4. 프로세서 stats 값** | `readingTime: "1 min 30 sec"` → 단위가 영어 | 값 안의 영어를 놓침 |
| **5. 도구 정의 (tools.ts)** | title, description, category labels | 딕셔너리로 오버라이드 안 되면 노출 |
| **6. 레이아웃/메타데이터** | metadata.title, og:description | 서버 컴포넌트에서 빠뜨림 |
| **7. not-found / error** | Next.js 특수 페이지 — params 접근 불가 | "어차피 안 되니까" 스킵하기 쉬움 |
| **8. 공유 컴포넌트** | ToolPageLayout의 backLabel 기본값 등 | 기본값이 영어 |
| **9. CSS/디자인 토큰** | ::before content, data-속성 텍스트 | 드물지만 가능 |
| **10. 딕셔너리 영어 잔류** | ko/en만 번역되고 43개 로케일이 영어 그대로 | 가장 흔한 실수 |

---

## Phase 1: 자동 스캔 (9중 검사)

아래 9가지 검사를 실행한다.

### 검사 1: .tsx 파일 내 영문 문자열
```
Grep: 패턴 = (?<!=")("[A-Z][a-z].*?"|'[A-Z][a-z].*?')
범위: src/app/[locale]/{앱}/**/*.tsx
제외: className, href, import, type, interface, console, //
```

### 검사 2: .tsx 파일 내 fallback 기본값
```
Grep: 패턴 = \?\?\s*"[A-Za-z]
Grep: 패턴 = =\s*"[A-Z][a-z]  (기본 prop 값)
범위: src/app/[locale]/{앱}/**/*.tsx
```

### 검사 3: .tsx 파일 내 aria-label / title / placeholder 하드코딩
```
Grep: 패턴 = (aria-label|title|placeholder)="[A-Za-z]
범위: src/app/[locale]/{앱}/**/*.tsx
```

### 검사 4: 프로세서 output/에러 메시지
```
Grep: 패턴 = (output:|return \{?\s*output:).*"[A-Z]
Grep: 패턴 = Error|error.*"[A-Za-z]
범위: src/lib/{앱}/processors/*.ts
```

### 검사 5: 프로세서 stats 값의 영문 단위
```
Grep: 패턴 = (sec|min|hour|time|grade|word|char|line)
범위: 프로세서 반환값 (stats 객체 내 문자열 값)
```

### 검사 6: 딕셔너리 타입 vs 실제 키 불일치
```
- TextDictionary (또는 해당 앱의 Dictionary) 타입에 정의된 모든 키가 실제 사용되는지
- 실제 사용되는 키가 타입에 정의되어 있는지
```

### 검사 7: not-found / error 페이지
```
Grep: 영문 문자열 검색
범위: src/app/**/not-found.tsx, src/app/**/error.tsx
```

### 검사 8: 43개 로케일 영어 잔류 검사 (핵심!)
```
ko.ts와 en.ts 외의 모든 로케일 파일에서:
- statsLabels, processorMessages, common, home 등 모든 섹션의 값이
  en.ts의 영어 원문과 동일한지 비교
- 동일하면 → 미번역. 해당 언어로 번역 필요

방법:
1. en.ts에서 모든 값 추출
2. 각 로케일 파일에서 같은 키의 값이 en.ts와 동일한지 확인
3. 동일한 값이 있으면 → 미번역 리스트에 추가
4. Agent를 사용하여 각 언어로 자연스럽게 번역
```

### 검사 9: 딕셔너리 간 키 누락 검사
```
- en.ts에 있는 키가 다른 로케일에도 모두 있는지 확인
- 키 자체가 누락된 경우 → 키 추가 + 번역
```

---

## Phase 2: 수동 심층 검사

자동 스캔에서 놓칠 수 있는 케이스를 직접 읽어서 확인한다.

### 심층 검사 대상

1. **모든 `_components/*.tsx` 파일을 Read** — 각 파일에서:
   - 모든 string literal 확인
   - 모든 template literal 내 텍스트 확인
   - 기본 prop 값 확인

2. **모든 프로세서 파일을 Read** — 각 파일에서:
   - output에 포함되는 모든 텍스트
   - stats 값에 포함되는 모든 텍스트
   - 에러 메시지

3. **레이아웃 파일 Read** — metadata, title template 확인

4. **tools.ts / apps.ts 등 정의 파일** — 사용자 노출 여부 확인

---

## Phase 3: 발견 → 수정

### 발견 리포트 출력

```
## i18n 감사 결과

### 발견된 하드코딩 ({N}건)

| # | 파일 | 줄 | 하드코딩 텍스트 | 노출 경로 | 심각도 |
|---|------|-----|----------------|----------|--------|
| 1 | stats-display.tsx | 52 | "Characters" | 통계 라벨 | HIGH |
| 2 | word-counter.ts | 20 | "0 sec" | 통계 값 | HIGH |
...

### 미번역 로케일 ({N}건)

| # | 로케일 | 파일 | 섹션 | 영어 잔류 키 수 |
|---|--------|------|------|----------------|
| 1 | ja | text-dictionaries/ja.ts | statsLabels | 28 |
| 2 | fr | text-dictionaries/fr.ts | processorMessages | 35 |
...

### 수정 필요 없는 항목
- 브랜드명 ("ToolPop")
- 기술 식별자 (SHA-256, Base64, UUID 등)
- 파일 확장자 (.txt, .pdf 등)
- 정규식 패턴
```

발견 건이 있으면 즉시 수정:

### 수정 패턴

**패턴 A: 컴포넌트 텍스트 → 딕셔너리 키 추가**
1. 딕셔너리 타입에 키 추가 (text-config.ts 등)
2. ko.ts에 한국어 번역 추가
3. en.ts에 영어 원문 추가
4. **나머지 43개 로케일에 해당 언어로 번역하여 추가** (영어 fallback 금지!)
5. 컴포넌트에서 딕셔너리 참조로 변경

**패턴 B: 프로세서 텍스트 → _messages 패턴**
1. processorMessages에 키 추가 (ko.ts, en.ts, **43개 로케일 전부 해당 언어로**)
2. 프로세서에서 `msg.keyName ?? "fallback"` 패턴 사용

**패턴 C: 레이아웃/메타 → generateMetadata에서 딕셔너리 사용**

**패턴 D: 미번역 로케일 번역**
1. Agent를 병렬로 사용하여 효율적으로 번역
2. 번역 품질 규칙 (위 섹션) 반드시 준수
3. 한 Agent당 10~15개 로케일씩 배치

---

## Phase 4: 무한루프 검증

수정 후 Phase 1~2를 **다시 실행**한다.

```
ROUND = 1
WHILE (발견 건수 > 0):
  Phase 1 자동 스캔 (검사 8, 9 포함)
  Phase 2 심층 검사
  발견 건 수정
  ROUND += 1
  IF ROUND > 5:
    사용자에게 남은 항목 리포트 후 확인 요청
    BREAK
```

**종료 조건:**
- 9중 자동 스캔 + 심층 검사에서 발견 건 0건
- 43개 로케일 영어 잔류 0건
- `pnpm build` 성공

---

## Phase 5: 빌드 검증

```bash
pnpm build
```

실패 시 즉시 수정.

---

## Phase 6: 최종 리포트

```
## i18n 감사 완료

### 검사 범위
- .tsx 파일: {N}개
- .ts 프로세서: {N}개
- 딕셔너리: {N}개 로케일

### 결과
- 발견 및 수정: {N}건
- 미번역 로케일 번역: {N}건 ({N}개 로케일)
- 허용 (브랜드명/기술식별자): {N}건
- 라운드 수: {N}회

### 수정된 파일
| 파일 | 변경 내용 |
|------|----------|
| ... | ... |

빌드: ✅ 성공
```

---

## 놓치기 쉬운 함정 체크리스트

매 감사마다 반드시 확인:

- [ ] 프로세서 stats의 **키 이름**이 UI에서 라벨로 변환되는가? → statsLabels 매핑 확인
- [ ] 프로세서 stats의 **값**에 영어 단위(sec, min, words 등)가 포함되는가?
- [ ] `?? "English"` fallback 패턴이 남아있는가?
- [ ] 기본 prop 값 (`title = "English"`)이 남아있는가?
- [ ] `formatLabel()` 같은 함수가 camelCase → 영어로 변환하는가?
- [ ] not-found, error 페이지에 하드코딩이 있는가?
- [ ] 공유 컴포넌트(ToolPageLayout 등)의 기본값이 영어인가?
- [ ] 새로 추가된 도구의 딕셔너리 키가 모든 로케일에 있는가?
- [ ] metadata/JSON-LD의 텍스트가 딕셔너리에서 오는가?
- [ ] **43개 로케일에 영어가 그대로 남아있지 않은가?** (가장 흔한 실수!)
- [ ] **번역이 번역투가 아닌가?** 해당 언어 네이티브 서비스처럼 자연스러운가?

---

## 주의사항

### 하드코딩으로 치지 않는 것
- **브랜드명**: "ToolPop", "ToolPop Text", "ToolPop PDF"
- **기술 식별자**: SHA-256, Base64, UUID, JSON, HTML, URL, ROT13, Lorem Ipsum
- **알고리즘명**: MD5, SHA-1, camelCase, PascalCase, snake_case, kebab-case
- **파일 관련**: "output.txt", "text/plain", ".pdf"
- **정규식/코드 패턴**: placeholder="abc123..."
- **코드 주석**

### 반드시 하드코딩으로 치는 것
- 에러 메시지: "Invalid input", "Error processing"
- 상태 메시지: "Valid JSON", "No matches found"
- 단위: "sec", "min", "words", "characters"
- UI 라벨: "Page not found", "Go Home", "Details"
- 데이터 라벨: stats 키에서 변환된 라벨 (Characters Without Spaces 등)
- 보고서 텍스트: "=== Analysis ===", "Total words:", "Keyword"

### 영어 잔류도 하드코딩이다
- ko.ts와 en.ts만 번역하고 나머지 43개 로케일에 영어를 복붙하는 것은 **미완성**
- 반드시 모든 로케일을 해당 언어로 번역해야 한다
- Agent를 활용하여 효율적으로 번역하되, 번역 품질 규칙을 반드시 준수
