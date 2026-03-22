---
name: release
description: develop → main PR 생성 & 머지 & 버전 태그로 프로덕션 배포. 배포할 커밋 목록과 버전을 보여주고 사용자 확인 후 진행.
disable-model-invocation: false
allowed-tools: Bash(git *), Bash(gh *)
user-invocable: true
---

# Release — 프로덕션 배포 워크플로우

develop 브랜치의 변경사항을 main에 머지하고 버전 태그를 생성하여 프로덕션 배포합니다.

## Step 1: 현재 버전 & 배포할 변경사항 확인

```bash
git fetch origin

# 최신 버전 태그 확인
git tag --sort=-v:refname | head -5

# 배포할 커밋 확인
git log origin/main..origin/develop --oneline --no-merges
```

배포할 커밋이 없으면 "배포할 변경사항이 없습니다" 알림 후 중단.

## Step 2: 버전 결정 & 변경사항 요약

**버전 규칙 (Semantic Versioning):**
- `major` (v1.0.0 → v2.0.0): 큰 기능 변경, 호환성 깨짐
- `minor` (v1.0.0 → v1.1.0): 새 기능 추가, 도구 추가
- `patch` (v1.0.0 → v1.0.1): 버그 수정, 자잘한 개선

커밋 내용을 분석하여 사용자에게 다음을 보여줍니다:

- 현재 버전: `vX.Y.Z` (태그가 없으면 `v0.0.0`으로 간주)
- 총 커밋 수
- 영향 범위 (src/app/pdf, src/lib 등)
- 주요 변경사항 요약

그 후 **사용자에게 버전 타입을 선택하도록 질문합니다:**

> 어떤 버전으로 릴리즈할까요?
> 1. **patch** (vX.Y.Z → vX.Y.**Z+1**) — 버그 수정, 자잘한 개선
> 2. **minor** (vX.Y.Z → vX.**Y+1**.0) — 새 기능/도구 추가
> 3. **major** (vX.Y.Z → v**X+1**.0.0) — 큰 변경, 호환성 깨짐
> 4. 직접 입력 (예: v1.2.3)

**사용자가 선택한 버전으로 진행합니다.**

## Step 3: PR 생성

develop → main PR을 생성합니다:

```bash
gh pr create \
  --base main \
  --head develop \
  --title "Release vX.Y.Z: 배포 요약" \
  --body "PR 본문"
```

**PR 제목 형식:** `Release vX.Y.Z: 주요 변경사항 요약`

**PR 본문 가이드라인:**

```markdown
## Release vX.Y.Z

### 변경 내용
- [pdf] PDF 압축 도구 구현
- [ui] FileUploader 개선
- [i18n] 일본어 번역 추가

### 영향 범위
- src/app/pdf
- src/lib/ui
- src/lib/i18n

### 배포 전 확인
- [ ] Vercel Preview 정상 동작 확인
- [ ] 주요 도구 기능 테스트

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

## Step 4: 머지 & 태그 생성

PR URL을 사용자에게 보여주고 확인을 요청합니다.

**사용자가 머지를 요청하면:**

```bash
# PR 머지
gh pr merge PR번호 --merge

# 로컬 동기화
git checkout main
git pull origin main

# 버전 태그 생성 & push
git tag -a vX.Y.Z -m "Release vX.Y.Z: 배포 요약"
git push origin vX.Y.Z

# GitHub Release 생성
gh release create vX.Y.Z --title "vX.Y.Z" --notes "릴리즈 노트"

# develop으로 복귀
git checkout develop
git pull origin develop
```

**GitHub Release 노트 형식:**

```markdown
## 변경 내용
- [pdf] PDF 압축 도구 구현
- [ui] FileUploader 개선

**Full Changelog**: https://github.com/.../compare/vPREV...vX.Y.Z
```

## 주의사항

- 배포할 커밋이 없으면 PR 생성하지 않음
- PR 생성 전 반드시 사용자 확인
- 머지 전 반드시 사용자 확인
- 이미 열려있는 develop → main PR이 있으면 새로 만들지 않고 기존 PR 안내
- squash merge가 아닌 일반 merge를 사용하여 커밋 히스토리 보존
- 태그는 반드시 main 머지 후에 생성
