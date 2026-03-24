# ToolPop 마케팅 체크리스트

> 비용 제로, 글로벌 타겟, 자동화 중심의 마케팅 실행 계획
> **Phase 1 → 2 → 3** 순서대로 진행하세요.

---

# Phase 1: 사이트 내 변경 (Claude에게 요청)

> Claude가 코드를 수정하여 바로 적용할 수 있는 항목들

## 1-1. SEO 강화
- [ ] 각 도구 페이지에 **도구별 FAQ 섹션 + FAQPage JSON-LD** 구조화 데이터 추가
  - 현재 랜딩 FAQ 페이지(`/faq`)에만 있고, 개별 도구 페이지에는 없음
  - 도구별 맞춤 Q&A 3-5개씩 추가하면 검색 노출 증가
- [x] ~~블로그 라우트(`/[locale]/blog`) 구축~~ — 이미 구현됨
- [x] ~~sitemap.xml에 블로그 글 자동 포함~~ — 이미 구현됨
- [x] ~~각 도구 페이지에 "관련 도구" 내부 링크 섹션 추가~~ — 이미 구현됨

## 1-2. 바이럴 & 공유 기능
- [x] ~~소셜 공유 버튼~~ — 이미 구현됨 (Twitter, Facebook, WhatsApp, LinkedIn, 링크복사)
- [x] ~~OpenGraph 이미지 자동 생성~~ — 이미 구현됨 (도구별 동적 OG 이미지)

## 1-3. 뉴스레터 구독
- [ ] 사이트 푸터 또는 랜딩에 **"Get notified when we launch new tools"** 구독 폼 추가
- [ ] Buttondown.email 또는 Resend 연동

## 1-4. 임베드 위젯
- [ ] 블로거/웹사이트용 임베드 라우트 (`/embed/[tool]`) 개발
- [ ] `<iframe>` 코드 복사 버튼 + "Powered by ToolPop" 링크
- [ ] 각 도구 페이지에 "Embed this tool" 옵션 추가

## 1-5. UTM 추적
- [ ] 공유 링크에 자동 UTM 파라미터 추가
  - `?utm_source=share&utm_medium=twitter&utm_campaign=tool-share`
- [ ] Google Analytics에서 캠페인별 트래픽 추적 설정

## 1-6. Product Hunt 배지
- [ ] 런칭 후 사이트에 "Featured on Product Hunt" 배지 추가 (런칭 후 실행)

---

# Phase 2: 코드 작업으로 가능한 것 (Claude에게 요청)

> 별도 프로젝트/도구 개발이 필요한 항목들

## 2-1. 블로그 콘텐츠 생성
- [x] ~~첫 블로그 글~~ — 이미 15개 글 작성됨 (45개 언어 번역 포함)
  - what-is-pdf, reduce-pdf-file-size, merge-pdf-files, convert-images-to-pdf 등
- [ ] 추가 블로그 글 작성 (SEO 타겟 키워드 중심):
  - [ ] "ToolPop vs iLovePDF: Which Is Better?" (경쟁사 비교)
  - [ ] "Best Free PDF Tools 2026" (리스트형)
  - [ ] "Why Your PDF Tool Shouldn't Upload Your Files" (프라이버시 각도)
  - [ ] 기타 롱테일 키워드 타겟 글

## 2-2. 크롬 익스텐션
- [ ] 간단한 PDF/이미지 도구 크롬 익스텐션 개발
- [ ] 우클릭 메뉴: "Convert this image with ToolPop"
- [ ] 팝업에서 빠른 도구 접근
- [ ] Chrome Web Store 등록

## 2-3. 자동화 스크립트
- [ ] 소셜 미디어 포스트 템플릿 자동 생성 스크립트
- [ ] 블로그 글 → SNS 포스트 변환 스크립트
- [ ] 키워드 모니터링 알림 → Slack/Discord 웹훅 연동

## 2-4. GitHub 오픈소스 PR
- [ ] `awesome-pdf` 리스트에 ToolPop 추가 PR 작성
- [ ] `awesome-free-software` 리스트에 추가 PR 작성
- [ ] `free-for.dev`에 PR 제출

---

# Phase 3: 직접 해야 하는 것 (간단한 것부터)

> 계정 생성, 등록, 커뮤니티 활동 등 사람이 직접 해야 하는 항목들

## 3-1. 계정 & 도구 설정 (5분씩, 바로 가능)
- [ ] Google Search Console 등록 + sitemap 제출
- [ ] Bing Webmaster Tools 등록
- [ ] Google Alerts 키워드 등록:
  - `"free pdf merger"`, `"merge pdf online"`, `"best free pdf tool"`
  - `"convert image to pdf"`, `"pdf editor free"`
  - `"toolpop"` (브랜드), `"ilovepdf"`, `"smallpdf"` (경쟁사)
- [ ] F5Bot(f5bot.com) Reddit 키워드 알림 설정 (위와 동일 키워드)
- [ ] Buffer 또는 Typefully 무료 플랜 가입 + 소셜 계정 연결

## 3-2. 소셜 계정 생성 (각 10분)
- [ ] Twitter/X 계정 생성 (@ToolPop 또는 유사)
  - 바이오: "80+ free PDF & image tools. No upload. No signup. Just tools."
- [ ] LinkedIn 회사 페이지 생성
- [ ] YouTube 채널 생성
- [ ] 네이버 블로그 개설

## 3-3. 디렉토리 등록 (하루 3-5개, 각 5-10분)

### 필수 (먼저)
- [ ] [AlternativeTo](https://alternativeto.net) — iLovePDF/Smallpdf 대안으로 등록
- [ ] [SaaSHub](https://saashub.com)
- [ ] [Slant](https://slant.co) — "What is the best..." 비교
- [ ] [G2](https://g2.com)
- [ ] [Capterra](https://capterra.com)
- [ ] [StackShare](https://stackshare.io)
- [ ] [BetaList](https://betalist.com)

### 추가
- [ ] [ToolFinder](https://toolfinder.co)
- [ ] [Uneed](https://uneed.best)
- [ ] [MicroLaunch](https://microlaunch.net)
- [ ] [Launched](https://launched.io)
- [ ] [StartupBase](https://startupbase.io)
- [ ] [SideProjectors](https://sideprojectors.com)
- [ ] [1000 Tools](https://1000.tools)
- [ ] [Tiny Alternatives](https://tinyalternatives.com)
- [ ] [There's An AI For That](https://theresanaiforthat.com)
- [ ] [Futurepedia](https://futurepedia.io)
- [ ] [ToolPilot](https://toolpilot.ai)

> **공통 설명문** (복사용):
> "ToolPop — 80+ free online PDF & image tools. No file upload required, 100% browser-based processing, supports 45 languages. Private, fast, and completely free."

## 3-4. 런칭 이벤트

### Product Hunt
- [ ] Product Hunt 계정 생성 + 프로필 완성
- [ ] 썸네일/배너 제작 (핵심: "80+ free tools, zero upload, 100% private")
- [ ] 스크린샷/GIF 3-5장 준비
- [ ] 첫 코멘트용 제작 스토리 작성
- [ ] 런칭일 결정 (화요일 00:01 PST)
- [ ] 런칭 당일 실시간 댓글 응답

### Hacker News
- [ ] Show HN 포스트: "Show HN: ToolPop – 80+ free browser-based PDF/image tools (no upload)"
- [ ] 미국 동부시간 오전 8-10시, 화~목에 포스팅
- [ ] 댓글 응답

### Reddit
- [ ] 먼저 관련 서브레딧에서 유용한 답변으로 카르마 축적 (1-2주)
- [ ] **r/InternetIsBeautiful** 포스트
- [ ] **r/SideProject** 제작 스토리 포스트
- [ ] r/webdev, r/pdf, r/productivity, r/freesoftware 활동

## 3-5. Q&A 플랫폼 답변 (매일 조금씩)

### Quora (주 5-10개)
- [ ] "PDF & Digital Tools Expert" 프로필 설정
- [ ] 관련 토픽 팔로우: PDF, Image Editing, Online Tools
- [ ] 주요 질문 검색 & 답변:
  - "What is the best free PDF merger?"
  - "How to convert images to PDF?"
  - "Best alternatives to iLovePDF?"

### Stack Overflow
- [ ] pdf-lib, PDF.js 관련 질문에 유용한 답변
- [ ] 프로필 웹사이트에 ToolPop 링크

## 3-6. 한국 시장

### 네이버 (주 3-5회)
- [ ] 네이버 블로그 글 작성:
  - [ ] "PDF 합치기 무료 사이트 추천 (2026)"
  - [ ] "이미지 PDF 변환 가장 쉬운 방법"
  - [ ] "PDF 편집 무료로 하는 법 — 파일 업로드 없이"
- [ ] 네이버 지식인 답변 (하루 2-3개, ⚠️ 수동만)
  - 키워드: "PDF 합치기", "PDF 편집", "이미지 변환"

### 한국 커뮤니티
- [ ] **클리앙** IT 게시판 — 사이드 프로젝트 소개
- [ ] **뽐뿌** 자유게시판 — 무료 도구 추천
- [ ] **디시인사이드** 프로그래밍 갤러리 — 개발 스토리
- [ ] **블라인드** — 직장인 업무 도구 추천

## 3-7. Twitter/X 운영 (주 5-7 포스트)
- [ ] 주간 콘텐츠 작성 & Buffer로 예약
- [ ] 콘텐츠 유형 로테이션:
  - 팁: "Did you know you can merge PDFs without uploading them?"
  - 비교: "Stop paying $12/mo for PDF tools. Free alternative →"
  - 빌딩 인 퍼블릭: 트래픽/개발 과정 공유
- [ ] 해시태그: `#buildinpublic #indiehackers #pdf #freetools`
- [ ] 인디해커 커뮤니티 참여

## 3-8. 백링크 빌딩 (Month 2~)

### HARO / Connectively
- [ ] connectively.us 가입
- [ ] "online tools", "productivity", "PDF" 관련 기자 쿼리 응답

### 리소스 페이지
- [ ] 구글: `"useful tools" + "resources" + inurl:resources` 검색
- [ ] 대학/도서관 리소스 페이지에 추가 요청 이메일
  > "Hi, I noticed your resources page lists PDF tools. ToolPop is a free, privacy-focused alternative that works entirely in the browser. Would you consider adding it?"

### 게스트 포스팅
- [ ] 구글: `"write for us" + productivity tools` 검색
- [ ] 관련 블로그 5곳에 기고 제안

## 3-9. YouTube (월 3-5개)
- [ ] OBS Studio 설치 (무료 스크린 레코딩)
- [ ] 튜토리얼 촬영:
  - [ ] "How to Merge PDF Files for Free"
  - [ ] "Convert JPG to PDF in 10 Seconds"
  - [ ] "Edit PDF Online — Free, No Signup"
- [ ] YouTube Shorts 15-30초 클립 (CapCut 무료)

## 3-10. 글로벌 다국어 확장 (Month 3~)

### 일본 (JA)
- [ ] Qiita 기술 블로그 글
- [ ] はてなブックマーク 등록

### 중국 (ZH)
- [ ] V2EX 포스트
- [ ] 少数派 (SSPai) 도구 소개
- [ ] 知乎 (Zhihu) 답변

### 독일 (DE)
- [ ] CHIP.de 도구 리뷰 제출

### 스페인어권 (ES)
- [ ] Forobeta, Taringa 포스트

### 포르투갈어/브라질 (PT)
- [ ] Tecnoblog, TabNews 포스트

---

# 성과 측정 KPI

| 지표 | 측정 도구 | 3개월 목표 |
|------|-----------|-----------|
| 월간 방문자 | Google Analytics | 10,000+ |
| 오가닉 검색 클릭 | Search Console | 5,000+/월 |
| 백링크 수 | Ahrefs Free | 100+ |
| 주요 키워드 순위 | Search Console | Top 20 |
| Twitter 팔로워 | Twitter | 500+ |
| Product Hunt | Product Hunt | Top 10 of Day |

---

> **UTM 파라미터 추적**: 모든 외부 링크에 UTM 추가
> 예: `toolpop.org?utm_source=reddit&utm_medium=post&utm_campaign=launch`
