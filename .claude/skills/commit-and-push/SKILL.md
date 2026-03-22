---
name: commit-and-push
description: Staged 변경사항을 분석하여 한글 커밋 메시지 작성 후 커밋 & 푸시. 변경 범위 자동 감지.
disable-model-invocation: false
allowed-tools: Bash(git *), Bash(gh *)
user-invocable: true
---

# Commit and Push — PR 기반 커밋 워크플로우

이 스킬은 staged된 변경사항을 feature 브랜치에 커밋하고, develop으로의 PR을 생성합니다.

## Step 1: Staged 내용 확인

먼저 staged된 파일과 변경사항을 확인합니다:

```bash
git status
git diff --staged
```

staged된 파일 목록과 변경 내용을 분석하여 어떤 작업이 이루어졌는지 파악합니다.

### 변경 범위 감지

변경된 파일의 경로를 분석하여 영향 범위를 파악합니다:
- `src/app/pdf/...` → PDF 앱 변경
- `src/app/video/...` → Video 앱 변경
- `src/lib/ui/...` → 공유 UI 라이브러리 변경 (영향 범위 넓음)
- `src/lib/i18n/...` → 번역 변경
- 루트 설정 파일 (`next.config.ts`, `tsconfig.json` 등) → 인프라 변경

## Step 2: 커밋 메시지 작성

staged된 변경사항을 분석하여 의미있는 커밋 메시지를 작성합니다:

**커밋 메시지 가이드라인:**
- **반드시 한글로 작성한다**
- 첫 줄은 50자 이내로 요약 (동사로 시작: 추가, 수정, 개선, 리팩토링 등)
- 프로젝트에서는 **변경 범위를 접두사로 표시**: `[pdf]`, `[ui]`, `[i18n]` 등
- 여러 앱/라이브러리가 변경된 경우 주요 변경사항 나열

**예시:**
```
[pdf] PDF 병합 도구 구현

- PDF 파일 드래그앤드롭 업로드 구현
- pdf-lib WASM으로 클라이언트사이드 병합 처리
- 5개 언어 번역 추가 (en, ko, ja, zh, es)
```

## Step 3: Feature 브랜치 생성 & 커밋

**현재 브랜치가 develop이면** feature 브랜치를 생성합니다.
**이미 feature 브랜치에 있으면** 그 브랜치에서 계속합니다.

### 브랜치 이름 규칙

변경 범위와 내용을 기반으로 자동 생성:
- `feat/pdf-adsense` — 새 기능
- `fix/ui-dark-mode` — 버그 수정
- `chore/i18n-japanese` — 잡무, 설정 변경
- `refactor/pdf-compress` — 리팩토링

```bash
# 현재 브랜치 확인
current=$(git branch --show-current)

# develop에 있으면 feature 브랜치 생성
if [ "$current" = "develop" ]; then
  git checkout -b feat/브랜치명
fi

# 커밋
git commit -m "커밋 메시지

상세 내용

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

**중요:** Co-Authored-By 태그를 항상 포함합니다.

## Step 4: Push & PR 생성

feature 브랜치를 push하고 develop으로의 PR을 생성합니다:

```bash
# Push
git push -u origin 브랜치명

# PR 생성
gh pr create \
  --base develop \
  --head 브랜치명 \
  --title "PR 제목" \
  --body "PR 본문"
```

**PR 제목**: 커밋 메시지의 첫 줄과 동일하게 (예: `[pdf] PDF 병합 도구 구현`)

**PR 본문:**
```markdown
## 변경 내용
- 변경사항 1
- 변경사항 2

## 영향 범위
- src/app/pdf
- src/lib/ui

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

PR URL을 사용자에게 보여줍니다.

## Step 5: develop 브랜치로 복귀

PR 생성 후 develop 브랜치로 돌아갑니다:

```bash
git checkout develop
```

## 주의사항

- staged 영역이 비어있으면 경고하고 중단
- `.env`, credentials 같은 민감한 파일이 staged되어 있으면 경고
- 커밋 전 변경사항을 사용자에게 요약해서 보여주기
- push 실패 시 에러 메시지 출력
- `src/lib/` 변경 시 "공유 라이브러리 변경 — 전체 앱에 영향" 알림
- **main 브랜치에 직접 push 금지** — 반드시 PR 워크플로우 사용
- 같은 작업의 추가 커밋이면 기존 feature 브랜치에서 계속 (새 브랜치 불필요)
