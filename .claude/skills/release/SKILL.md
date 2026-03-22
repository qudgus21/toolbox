---
name: release
description: 선택한 PR들만 cherry-pick하여 main에 배포. 배포할 PR을 선택하고 버전 태그 생성.
disable-model-invocation: false
allowed-tools: Bash(git *), Bash(gh *)
user-invocable: true
---

# Release — 선택적 프로덕션 배포 워크플로우

develop에 머지된 PR 중 사용자가 선택한 것만 main에 배포합니다.

## Step 1: 배포 가능한 PR 목록 확인

develop에 머지되었지만 main에는 아직 반영되지 않은 PR들을 보여줍니다:

```bash
git fetch origin

# main에 없는 develop의 머지 커밋들에서 PR 번호 추출
git log origin/main..origin/develop --oneline --merges
```

그리고 `gh` CLI로 해당 PR들의 상세 정보를 가져옵니다:

```bash
# develop에 머지된 PR 목록 (closed + merged)
gh pr list --base develop --state merged --json number,title,mergedAt,labels --limit 50
```

**main에 이미 반영된 PR은 제외하고**, 아직 배포되지 않은 PR만 표시합니다.

사용자에게 다음 형식으로 보여줍니다:

```
📦 배포 가능한 PR 목록:

 #42  [pdf] Google AdSense 적용          (2026-03-20 머지)
 #41  [ui] 다크모드 토글 개선             (2026-03-19 머지)
 #40  [pdf] PDF 압축 품질 옵션 추가       (2026-03-18 머지)

배포할 PR 번호를 선택해주세요 (예: 42 또는 42,40):
```

배포 가능한 PR이 없으면 "배포할 변경사항이 없습니다" 알림 후 중단.

## Step 2: 버전 결정

**버전 규칙 (Semantic Versioning):**
- `major` (v1.0.0 → v2.0.0): 큰 기능 변경, 호환성 깨짐
- `minor` (v1.0.0 → v1.1.0): 새 기능 추가, 도구 추가
- `patch` (v1.0.0 → v1.0.1): 버그 수정, 자잘한 개선

선택된 PR 내용을 분석하여 사용자에게 다음을 보여줍니다:

- 현재 버전: `vX.Y.Z` (태그가 없으면 `v0.0.0`으로 간주)
- 선택된 PR 수 & 요약
- 추천 버전 타입

> 어떤 버전으로 릴리즈할까요?
> 1. **patch** (vX.Y.Z → vX.Y.**Z+1**) — 버그 수정, 자잘한 개선
> 2. **minor** (vX.Y.Z → vX.**Y+1**.0) — 새 기능/도구 추가
> 3. **major** (vX.Y.Z → v**X+1**.0.0) — 큰 변경, 호환성 깨짐
> 4. 직접 입력 (예: v1.2.3)

## Step 3: Release 브랜치 생성 & Cherry-pick

선택된 PR들의 커밋만 main에 반영하기 위해 release 브랜치를 만듭니다:

```bash
# main 기반으로 release 브랜치 생성
git checkout origin/main -b release/vX.Y.Z

# 선택된 PR들의 머지 커밋을 cherry-pick
# PR의 머지 커밋 해시를 찾아서 cherry-pick
git log origin/develop --merges --grep="Merge pull request #PR번호" --format="%H" | head -1
git cherry-pick -m 1 머지커밋해시
```

**중요:** `-m 1` 옵션으로 머지 커밋의 첫 번째 부모(develop) 기준으로 cherry-pick합니다.

cherry-pick 충돌이 발생하면 사용자에게 알리고 해결 방법을 안내합니다.

## Step 4: PR 생성 & 확인

release 브랜치에서 main으로의 PR을 생성합니다:

```bash
git push -u origin release/vX.Y.Z

gh pr create \
  --base main \
  --head release/vX.Y.Z \
  --title "Release vX.Y.Z: 배포 요약" \
  --body "PR 본문"
```

**PR 본문:**

```markdown
## Release vX.Y.Z

### 포함된 PR
- #42 [pdf] Google AdSense 적용
- #40 [pdf] PDF 압축 품질 옵션 추가

### 제외된 PR (develop에만 유지)
- #41 [ui] 다크모드 토글 개선

### 배포 전 확인
- [ ] Vercel Preview 정상 동작 확인
- [ ] 주요 도구 기능 테스트

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

PR URL을 사용자에게 보여주고 확인을 요청합니다.

## Step 5: 머지 & 태그 생성

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
## 포함된 변경 내용
- #42 [pdf] Google AdSense 적용
- #40 [pdf] PDF 압축 품질 옵션 추가

**Full Changelog**: https://github.com/.../compare/vPREV...vX.Y.Z
```

## Step 6: Release 브랜치 정리

머지 완료 후 release 브랜치를 삭제합니다:

```bash
git branch -d release/vX.Y.Z
git push origin --delete release/vX.Y.Z
```

## 주의사항

- 배포 가능한 PR이 없으면 중단
- PR 선택 전 반드시 목록을 보여주고 사용자 확인
- 머지 전 반드시 사용자 확인
- cherry-pick 충돌 시 사용자에게 알리고 해결 지원
- squash merge가 아닌 일반 merge를 사용하여 커밋 히스토리 보존
- 태그는 반드시 main 머지 후에 생성
- **전체 배포 (모든 PR 선택)도 가능** — 사용자가 "전부"라고 하면 모든 PR을 cherry-pick
