---
name: commit-and-push
description: Staged 변경사항을 분석하여 한글 커밋 메시지 작성 후 커밋 & 푸시. Turborepo 모노레포 변경 범위 자동 감지.
disable-model-invocation: false
allowed-tools: Bash(git *)
user-invocable: true
---

# Commit and Push — 모노레포 워크플로우

이 스킬은 staged된 변경사항을 분석하여 커밋하고 push합니다.

## Step 1: Staged 내용 확인

먼저 staged된 파일과 변경사항을 확인합니다:

```bash
git status
git diff --staged
```

staged된 파일 목록과 변경 내용을 분석하여 어떤 작업이 이루어졌는지 파악합니다.

### 변경 범위 감지 (모노레포)

변경된 파일의 경로를 분석하여 영향 범위를 파악합니다:
- `apps/pdf/...` → PDF 앱 변경
- `apps/video/...` → Video 앱 변경
- `packages/ui/...` → 공유 UI 패키지 변경 (영향 범위 넓음)
- `packages/i18n/...` → 번역 변경
- 루트 설정 파일 (`turbo.json`, `pnpm-workspace.yaml` 등) → 인프라 변경

## Step 2: 커밋 메시지 작성

staged된 변경사항을 분석하여 의미있는 커밋 메시지를 작성합니다:

**커밋 메시지 가이드라인:**
- **반드시 한글로 작성한다**
- 첫 줄은 50자 이내로 요약 (동사로 시작: 추가, 수정, 개선, 리팩토링 등)
- 모노레포에서는 **변경 범위를 접두사로 표시**: `[pdf]`, `[ui]`, `[i18n]` 등
- 여러 앱/패키지가 변경된 경우 주요 변경사항 나열

**예시:**
```
[pdf] PDF 병합 도구 구현

- PDF 파일 드래그앤드롭 업로드 구현
- pdf-lib WASM으로 클라이언트사이드 병합 처리
- 5개 언어 번역 추가 (en, ko, ja, zh, es)
```

```
[ui] FileUploader 공유 컴포넌트 추가

- 드래그앤드롭 + 파일 선택 지원
- 다크모드, 반응형, 접근성 대응
- 파일 타입/크기 제한 props 지원
```

```
[i18n] 계산기 앱 독일어/프랑스어 번역 추가
```

## Step 3: 커밋 생성

작성한 메시지로 커밋을 생성합니다:

```bash
git commit -m "커밋 메시지

상세 내용
- 변경사항 1
- 변경사항 2

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

**중요:** Co-Authored-By 태그를 항상 포함합니다.

## Step 4: Push

커밋을 원격 저장소에 push합니다:

```bash
git push
```

만약 새 브랜치를 처음 push하는 경우:
```bash
git push -u origin $(git branch --show-current)
```

## 주의사항

- staged 영역이 비어있으면 경고하고 중단
- `.env`, credentials 같은 민감한 파일이 staged되어 있으면 경고
- 커밋 전 변경사항을 사용자에게 요약해서 보여주기
- push 실패 시 에러 메시지 출력
- `packages/` 변경 시 "공유 패키지 변경 — 전체 앱 빌드에 영향" 알림
