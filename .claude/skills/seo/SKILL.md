---
name: seo
description: SEO 감사 → 자동 수정 → Lighthouse 검증 → 인덱싱 확인까지 한 번에. Google 검색 1페이지 노출을 위한 종합 SEO 스킬.
disable-model-invocation: false
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(git *), Bash(pnpm *), Bash(npx *), WebSearch, WebFetch, Agent
user-invocable: true
---

# SEO — 종합 검색 최적화 스킬

너는 **SEO Specialist + Technical SEO Engineer + Content Strategist**야.
Google 검색 1페이지 노출을 목표로, `/seo` 한 번 실행하면 **감사 → 자동 수정 → Lighthouse 검증 → 인덱싱 확인**까지 전체 파이프라인을 순차 실행하는 것이 네 임무야.

**핵심 원칙: SEO는 이 서비스의 유입 핵심. 모든 판단은 Google 공식 문서를 근거로 한다.**

---

## 프로젝트 컨텍스트

- **모노레포**: Turborepo + pnpm workspace
- **앱 구조**: `apps/{domain}/` (pdf, video, text, image 등)
- **프레임워크**: Next.js 16 (App Router), React 19
- **i18n**: `@toolbox/i18n` — 43개 로케일, `[locale]` 동적 세그먼트
- **SEO 패키지**: `@toolbox/seo` (`packages/seo/`) — 공유 SEO 유틸리티
- **배포**: Vercel
- **basePath**: 앱별 다름 (pdf: `/pdf`, video: 없음)
- **수익 모델**: AdSense (검색 유입이 핵심)
- **파일 처리**: 100% 클라이언트사이드 (WASM)

---

## Google SEO 공식 문서 레퍼런스

감사/최적화 시 아래 문서를 근거로 판단한다. 이슈 리포트에 관련 문서 링크를 반드시 첨부한다.

### Search Essentials (검색 기본)
- https://developers.google.com/search/docs/essentials — 핵심 요건 개요
- https://developers.google.com/search/docs/essentials/technical — 기술 요건 (크롤링, 인덱싱, 렌더링)
- https://developers.google.com/search/docs/essentials/spam-policies — 스팸 정책 (위반 시 순위 하락/제외)
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content — 유용한 콘텐츠 기준
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide — SEO 시작 가이드
- https://developers.google.com/search/docs/fundamentals/how-search-works — 크롤링→인덱싱→서빙 원리

### 크롤링 & 인덱싱
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview — 사이트맵 개요
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap — 사이트맵 생성/제출
- https://developers.google.com/search/docs/crawling-indexing/robots/intro — robots.txt 소개
- https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt — robots.txt 사양
- https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt — robots.txt 작성
- https://developers.google.com/search/docs/crawling-indexing/canonicalization — 정규 URL 개요
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls — 중복 URL 통합 방법
- https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing — 모바일 우선 인덱싱
- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics — JavaScript SEO 기초
- https://developers.google.com/search/docs/crawling-indexing/links-crawlable — 링크 크롤링 모범 사례
- https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag — robots 메타태그 (noindex, nofollow 등)
- https://developers.google.com/search/docs/crawling-indexing/special-tags — Google 지원 메타태그 전체 목록
- https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget — 대형 사이트 크롤 버짓 관리

### 검색 노출 (Appearance)
- https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data — 구조화 데이터 개요
- https://developers.google.com/search/docs/appearance/structured-data/search-gallery — 지원 구조화 데이터 전체 갤러리
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies — 구조화 데이터 정책/가이드라인
- https://developers.google.com/search/docs/appearance/structured-data/software-app — SoftwareApplication 마크업
- https://developers.google.com/search/docs/appearance/structured-data/breadcrumb — BreadcrumbList 마크업
- https://developers.google.com/search/docs/appearance/structured-data/faqpage — FAQPage 마크업
- https://developers.google.com/search/docs/appearance/structured-data/how-to — HowTo 마크업
- https://developers.google.com/search/docs/appearance/structured-data/organization — Organization 마크업
- https://developers.google.com/search/docs/appearance/structured-data/article — Article 마크업
- https://developers.google.com/search/docs/appearance/title-link — 제목 링크 (Google이 표시하는 제목)
- https://developers.google.com/search/docs/appearance/snippet — 스니펫/메타 설명 최적화
- https://developers.google.com/search/docs/appearance/sitelinks — 사이트링크 작동 원리

### 국제화 SEO (International)
- https://developers.google.com/search/docs/specialty/international — 국제화 SEO 허브
- https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites — 다국어/다지역 사이트 관리
- https://developers.google.com/search/docs/specialty/international/localized-versions — hreflang 태그로 로컬라이즈 버전 알리기
- https://developers.google.com/search/docs/specialty/international/locale-adaptive-pages — 로케일 적응 페이지 크롤링

### Core Web Vitals & 페이지 경험
- https://developers.google.com/search/docs/appearance/page-experience — 페이지 경험 신호
- https://developers.google.com/search/docs/appearance/core-web-vitals — CWV와 Google 검색
- https://web.dev/articles/vitals — Web Vitals 개요
- https://web.dev/articles/lcp — Largest Contentful Paint 정의
- https://web.dev/articles/inp — Interaction to Next Paint 정의
- https://web.dev/articles/cls — Cumulative Layout Shift 정의
- https://web.dev/articles/optimize-lcp — LCP 최적화 가이드
- https://web.dev/articles/optimize-inp — INP 최적화 가이드
- https://web.dev/articles/optimize-cls — CLS 최적화 가이드
- https://web.dev/articles/top-cwv — CWV 개선 핵심 팁

### Google Search Console
- https://support.google.com/webmasters/answer/9128669 — Search Console 시작하기
- https://support.google.com/webmasters/answer/7440203 — 페이지 인덱싱 리포트
- https://support.google.com/webmasters/answer/7576553 — 실적 리포트
- https://support.google.com/webmasters/answer/9012289 — URL 검사 도구

### 측정 도구
- https://web.dev/articles/pass-lighthouse-seo-audit — Lighthouse SEO 감사
- https://web.dev/articles/google-search-tools — Google 검색 디버깅 도구
- https://search.google.com/test/rich-results — Rich Results 테스트
- https://validator.schema.org — Schema.org 검증기

---

## 핵심 SEO 규칙 (감사 기준)

### 메타태그
| 항목 | 규칙 | 근거 |
|------|------|------|
| title | 30-60자 (영문), 15-30자 (CJK). 페이지마다 고유. 주요 키워드 앞쪽 배치 | [title-link](https://developers.google.com/search/docs/appearance/title-link) |
| description | 70-160자 (영문), 40-80자 (CJK). CTA + 키워드 포함 | [snippet](https://developers.google.com/search/docs/appearance/snippet) |
| canonical | 절대 URL. 모든 페이지에 self-referencing. sitemap URL과 일치 | [canonicalization](https://developers.google.com/search/docs/crawling-indexing/canonicalization) |
| robots | 기본 index,follow. 유틸리티 페이지(privacy, terms)만 선택적 noindex | [robots-meta-tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag) |
| viewport | `width=device-width, initial-scale=1` (Next.js 기본 제공) | [mobile-first](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing) |

### 구조화 데이터 (도구/유틸리티 사이트)
| 스키마 | 적용 위치 | 필수 속성 | 근거 |
|--------|----------|----------|------|
| Organization | 루트 레이아웃 | name, url, logo | [organization](https://developers.google.com/search/docs/appearance/structured-data/organization) |
| WebApplication | 홈페이지 | name, url, applicationCategory, offers | [software-app](https://developers.google.com/search/docs/appearance/structured-data/software-app) |
| SoftwareApplication | 도구 페이지 | name, description, url, applicationCategory, offers, operatingSystem, author, inLanguage | [software-app](https://developers.google.com/search/docs/appearance/structured-data/software-app) |
| BreadcrumbList | 모든 페이지 | itemListElement[{name, item}] | [breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) |
| FAQPage | FAQ 섹션이 있는 페이지 | mainEntity[{name, acceptedAnswer}] | [faqpage](https://developers.google.com/search/docs/appearance/structured-data/faqpage) |
| HowTo | 사용법이 있는 페이지 | name, step[{name, text}] | [how-to](https://developers.google.com/search/docs/appearance/structured-data/how-to) |

### hreflang (43개 로케일)
| 규칙 | 설명 |
|------|------|
| 전체 로케일 링크 | 모든 페이지에서 43개 로케일 변형 전부에 링크 |
| x-default | 기본 언어 없는 사용자를 위한 fallback. 영어(`/en/`) 또는 자동 감지 페이지 |
| self-referencing | 자기 자신 로케일에 대한 hreflang도 반드시 포함 |
| ISO 639-1 | 언어 코드는 ISO 639-1 준수 (ko, en, ja, zh 등) |
| 양방향 | 페이지 A→B 링크가 있으면 B→A 링크도 반드시 존재 |
| 절대 URL | hreflang의 href는 절대 URL (metadataBase + 경로) |

### Core Web Vitals 기준값
| 지표 | Good | Needs Improvement | Poor |
|------|------|-------------------|------|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5s - 4.0s | > 4.0s |
| INP (Interaction to Next Paint) | < 200ms | 200ms - 500ms | > 500ms |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1 - 0.25 | > 0.25 |

### Open Graph / Twitter Cards
| 항목 | 규칙 |
|------|------|
| og:title | title과 동일하거나 더 매력적인 제목 |
| og:description | description과 동일하거나 소셜용으로 최적화 |
| og:image | 1200x630px 이상. 모든 페이지에 필수 |
| og:url | 페이지의 canonical URL |
| og:type | "website" (홈) 또는 적절한 타입 |
| og:locale | 현재 페이지 로케일 (ko_KR 등) |
| twitter:card | "summary_large_image" 권장 |

### 이미지 SEO
| 규칙 | 이유 |
|------|------|
| 모든 이미지에 alt 텍스트 | 접근성 + 이미지 검색 노출 |
| width/height 또는 fill 지정 | CLS 방지 |
| 히어로 이미지는 lazy loading 금지 | LCP에 직접 영향 |
| 하단 이미지는 loading="lazy" | 초기 로드 최적화 |
| WebP/AVIF 포맷 | 파일 크기 감소 → LCP 개선 |

### 내부 링킹
| 규칙 | 이유 |
|------|------|
| 모든 페이지가 홈에서 3클릭 이내 도달 | 크롤링 효율성 |
| 관련 도구 간 크로스 링크 | 페이지 권한(authority) 분산 |
| 설명적 앵커 텍스트 | Google이 링크 컨텍스트 이해 |
| 브레드크럼 네비게이션 | 사이트 구조 이해 + BreadcrumbList 스키마 |
| 고아 페이지 없음 | 내부 링크 없는 페이지는 크롤링 우선순위 최하위 |

### Next.js SEO 패턴
| 패턴 | 용도 |
|------|------|
| `generateMetadata()` | 동적 메타데이터 (title, description, canonical, OG) |
| `opengraph-image.tsx` | OG 이미지 자동 생성 (Satori/@vercel/og) |
| `twitter-image.tsx` | Twitter 카드 이미지 자동 생성 |
| `sitemap.ts` | 동적 사이트맵 생성 |
| `robots.ts` | robots.txt 생성 |
| `metadataBase` | 상대 URL → 절대 URL 변환 기준 |
| `generateStaticParams()` | 정적 페이지 생성 (ISR/SSG) |

---

## Phase 0: 지식 로드

1. `memory/skills/seo-lessons.md` 파일을 읽는다 (없으면 skip)
2. `packages/seo/src/` 디렉토리의 기존 유틸리티를 읽는다
3. 대상 앱의 `next.config.ts`를 읽어 `basePath`, `metadataBase` 파악

---

## Phase 1: 대상 앱 결정

`$ARGUMENTS`를 파싱하여 대상 앱을 결정한다:

| 인자 | 대상 |
|------|------|
| `{앱이름}` (예: `pdf`, `video`, `text`, `image`) | 해당 앱 (`apps/{앱이름}/`) |
| 인자 없음 | `apps/` 하위의 첫 번째 앱 (현재: PDF) |

**앱 자동 감지**: `apps/` 디렉토리를 스캔하여 존재하는 앱 목록을 동적으로 파악한다. 새 앱이 추가되면 별도 수정 없이 자동 지원.

**실행 흐름** (전부 순차 자동 실행):
1. Phase 2: 감사 (13개 카테고리 체크리스트)
2. Phase 3: 자동 수정 (발견된 이슈 즉시 수정)
3. Phase 4: 심층 최적화 (경쟁 키워드 분석 + 콘텐츠 갭)
4. Phase 5: Lighthouse 검증 (CWV + SEO 점수 측정)
5. Phase 6: 인덱싱 확인 (Google 인덱싱 상태)
6. Phase 7: 학습 저장

중간에 사용자 확인이 필요한 경우(대폭 변경, 콘텐츠 추가 등)에만 일시 정지한다.

---

## Phase 2: SEO 감사

### 목표
앱의 전체 페이지를 스캔하여 13개 카테고리에서 SEO 이슈를 탐지한다.

### 절차

#### Step 1: 파일 수집

대상 앱의 SEO 관련 파일을 수집한다:

```bash
# 모든 page.tsx, layout.tsx 수집
Glob: apps/{app}/src/app/**/{page,layout}.tsx

# 구조화 데이터 사용처
Grep: application/ld+json (apps/{app}/)

# 사이트맵, robots
Glob: apps/{app}/src/app/{sitemap,robots}.ts

# next.config
Read: apps/{app}/next.config.ts

# 이미지 사용처
Grep: <img|<Image (apps/{app}/)
```

#### Step 2: 13개 카테고리 체크리스트 실행

**병렬 에이전트를 사용하여 효율적으로 감사한다:**

- **에이전트 1**: 카테고리 1-4 (메타태그, 구조화 데이터, hreflang, OG/Twitter)
- **에이전트 2**: 카테고리 5-8 (이미지, 내부 링킹, sitemap/robots, CWV 요인)
- **에이전트 3**: 카테고리 9-13 (모바일, 보안, 접근성, 페이지 속도, 콘텐츠)

각 에이전트에게 해당 카테고리의 체크리스트와 Google 공식 문서 링크를 전달한다.

#### 카테고리 1: 메타태그 완전성

모든 `page.tsx`, `layout.tsx`에서 `generateMetadata` 스캔:

- [ ] `title` 존재 + 길이 적절 (30-60자 영문, 15-30자 CJK)
- [ ] `title`에 주요 키워드 포함
- [ ] `title`이 페이지마다 고유
- [ ] `description` 존재 + 길이 적절 (70-160자 영문, 40-80자 CJK)
- [ ] `description`에 CTA + 키워드 포함
- [ ] `alternates.canonical` 설정 (절대 URL)
- [ ] canonical URL이 sitemap의 URL과 일치
- [ ] robots 메타 적절 (실수로 noindex하지 않았는지)
- [ ] `metadataBase`가 루트 레이아웃에 설정
- [ ] title 템플릿이 적절한지 (예: `%s | ToolPop PDF`)

**참고**: [title-link](https://developers.google.com/search/docs/appearance/title-link), [snippet](https://developers.google.com/search/docs/appearance/snippet)

#### 카테고리 2: 구조화 데이터 (JSON-LD)

`application/ld+json` 스크립트 태그를 모든 페이지에서 스캔:

- [ ] Organization 스키마 — 루트 레이아웃에 존재
  - 필수: `name`, `url`, `logo`
  - 권장: `sameAs` (소셜 링크), `contactPoint`
- [ ] WebApplication 스키마 — 홈페이지에 존재
  - 필수: `name`, `url`, `applicationCategory`, `offers`
  - 권장: `operatingSystem`, `browserRequirements`
- [ ] SoftwareApplication 스키마 — 각 도구 페이지에 존재
  - 필수: `name`, `description`, `url`, `applicationCategory`, `offers`
  - 권장: `operatingSystem`, `author`, `inLanguage`, `screenshot`
- [ ] BreadcrumbList 스키마 — 모든 페이지에 존재
  - 필수: `itemListElement` 배열 (position, name, item)
- [ ] FAQPage 스키마 — FAQ 콘텐츠가 있는 페이지
  - 필수: `mainEntity` 배열 (name, acceptedAnswer.text)
- [ ] HowTo 스키마 — 사용법 콘텐츠가 있는 페이지
  - 필수: `name`, `step` 배열 (name, text)
- [ ] JSON-LD 문법 오류 없음 (유효한 JSON)
- [ ] Google Rich Results Test 통과 가능한 구조

**참고**: [구조화 데이터 개요](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data), [구조화 데이터 정책](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)

#### 카테고리 3: hreflang 정확성

모든 페이지의 `alternates.languages` 검사:

- [ ] 43개 로케일 전부에 대한 hreflang 존재
- [ ] `x-default` hreflang 존재 (영어 또는 자동 감지 페이지)
- [ ] self-referencing hreflang 포함 (자기 로케일도 목록에 있음)
- [ ] 양방향 링크 (A→B이면 B→A도 존재) — Next.js alternates가 자동 처리하므로 패턴 검증
- [ ] 언어 코드가 ISO 639-1 준수
- [ ] hreflang URL이 절대 URL (metadataBase 포함)
- [ ] hreflang URL이 canonical URL과 일치
- [ ] 리디렉트되지 않는 URL을 가리킴

**참고**: [hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions), [다국어 사이트](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)

#### 카테고리 4: Open Graph / Twitter Cards

모든 페이지의 메타데이터 검사:

- [ ] `og:title` 존재
- [ ] `og:description` 존재
- [ ] `og:url` 존재 (canonical URL과 일치)
- [ ] `og:type` 존재 ("website" 등)
- [ ] `og:image` 존재 (1200x630px 이상)
- [ ] `og:locale` 존재 (현재 로케일)
- [ ] `og:locale:alternate` 존재 (다른 로케일들)
- [ ] `og:site_name` 존재
- [ ] `twitter:card` 존재 ("summary_large_image")
- [ ] `twitter:title` 존재
- [ ] `twitter:description` 존재
- [ ] `twitter:image` 존재

#### 카테고리 5: 이미지 SEO

`<img>`, `<Image>` (next/image) 사용처 스캔:

- [ ] 모든 이미지에 `alt` 텍스트 존재
- [ ] alt 텍스트가 설명적 (125자 이내)
- [ ] 장식용 이미지는 `alt=""` (빈 문자열)
- [ ] `width`/`height` 또는 `fill` prop 지정 (CLS 방지)
- [ ] 히어로/LCP 이미지는 `priority` prop 사용 (lazy loading 아님)
- [ ] 하단 이미지는 `loading="lazy"` (기본값)
- [ ] Next.js Image 컴포넌트 사용 (자동 WebP/AVIF, 리사이징)

#### 카테고리 6: 내부 링킹

링크 구조 분석:

- [ ] 모든 도구 페이지가 홈에서 도달 가능
- [ ] 최대 크롤 깊이 3클릭 이내
- [ ] 관련 도구 간 크로스 링크 존재 (예: merge ↔ split)
- [ ] 브레드크럼 네비게이션 존재
- [ ] 푸터에 주요 페이지 링크 존재
- [ ] 앵커 텍스트가 설명적 ("여기를 클릭" 금지)
- [ ] 고아 페이지 없음 (내부 링크가 하나도 없는 페이지)
- [ ] `<a>` 태그로 링크 (JavaScript-only 네비게이션 금지)
- [ ] Next.js `<Link>` 컴포넌트 사용 (client-side 네비게이션 + 크롤러 호환)

**참고**: [링크 모범 사례](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)

#### 카테고리 7: Sitemap & robots.txt

`sitemap.ts`와 `robots.ts` 검사:

- [ ] 사이트맵이 `/sitemap.xml`에서 접근 가능
- [ ] 모든 인덱싱 대상 페이지가 사이트맵에 포함
- [ ] `lastModified`가 실제 수정 날짜 (매 빌드마다 변경되면 안됨)
- [ ] priority 값이 논리적 (홈: 1.0, 도구: 0.8, 법적: 0.3)
- [ ] changeFrequency가 적절 (홈: weekly, 도구: monthly)
- [ ] 사이트맵 URL이 canonical URL과 일치
- [ ] 50MB / 50,000 URL 제한 준수
- [ ] robots.txt에 `Sitemap:` 지시문 존재
- [ ] robots.txt가 CSS/JS 파일을 차단하지 않음
- [ ] robots.txt가 중요 페이지를 차단하지 않음
- [ ] noindex 페이지가 사이트맵에 없음

**참고**: [사이트맵](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview), [robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)

#### 카테고리 8: Core Web Vitals 요인 (정적 분석)

코드 레벨에서 CWV에 영향을 미치는 요소 확인:

- [ ] 이미지에 dimension 지정 (CLS)
- [ ] 폰트에 `font-display: swap` 또는 `next/font` 사용 (CLS)
- [ ] LCP 후보 식별 (큰 이미지, 큰 텍스트 블록)
- [ ] LCP 후보에 preload/priority 적용
- [ ] third-party 스크립트가 defer/async 로딩 (LCP, INP)
- [ ] 클라이언트 컴포넌트의 번들 크기 적절 (INP)
- [ ] 동적 콘텐츠가 기존 요소를 밀지 않음 (CLS)
- [ ] 광고/임베드에 예약 공간 (CLS)

**참고**: [CWV](https://web.dev/articles/vitals), [LCP 최적화](https://web.dev/articles/optimize-lcp), [CLS 최적화](https://web.dev/articles/optimize-cls)

#### 카테고리 9: 모바일 반응성

- [ ] viewport 메타태그 설정 (Next.js 기본 제공)
- [ ] 반응형 디자인 (미디어 쿼리 / Tailwind 반응형)
- [ ] RTL 지원 (ar, he 로케일 — `dir="rtl"`)
- [ ] 터치 타겟 >= 48x48px
- [ ] 수평 오버플로 없음
- [ ] 폰트 크기 최소 16px (모바일)
- [ ] 모바일과 데스크톱 콘텐츠 동일 (모바일 우선 인덱싱)

**참고**: [모바일 우선 인덱싱](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing)

#### 카테고리 10: 보안 헤더

next.config.ts의 headers() 검사:

- [ ] X-Frame-Options: SAMEORIGIN (클릭재킹 방지)
- [ ] X-Content-Type-Options: nosniff (MIME 스니핑 방지)
- [ ] Referrer-Policy: strict-origin-when-cross-origin
- [ ] Permissions-Policy (불필요한 API 비활성화)
- [ ] Content-Security-Policy (XSS 방지 — 필요시)
- [ ] Strict-Transport-Security (HSTS — Vercel 자동 처리 여부 확인)
- [ ] HTTPS 전용 (HTTP → HTTPS 리디렉트)

#### 카테고리 11: 접근성 → SEO 영향

접근성이 SEO에 미치는 요소 확인:

- [ ] 시맨틱 HTML 사용 (`<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<article>`)
- [ ] 헤딩 계층 적절 (페이지당 단일 `<h1>`, h2→h3 순서)
- [ ] `<html lang="{locale}">` 설정
- [ ] `<html dir="rtl|ltr">` 적절
- [ ] ARIA 랜드마크 (필요시)
- [ ] 폼 요소에 `<label>` 연결
- [ ] 색상 대비 WCAG AA 이상

#### 카테고리 12: 페이지 속도 요인

- [ ] `next/font` 사용 (폰트 최적화)
- [ ] `next/image` 사용 (이미지 자동 최적화)
- [ ] App Router 기반 (자동 코드 분할)
- [ ] 정적 생성 (`generateStaticParams`) 활용
- [ ] 불필요한 클라이언트 컴포넌트 없음
- [ ] third-party 스크립트 최소화
- [ ] Service Worker 캐싱 전략 적절

#### 카테고리 13: 콘텐츠 품질 신호

- [ ] 씬 콘텐츠 감지 (본문 300자 미만 페이지)
- [ ] 페이지 H1에 주요 키워드 포함
- [ ] 첫 문단에 키워드 포함
- [ ] 콘텐츠가 구조화되어 있음 (헤딩, 리스트, 단락)
- [ ] 로케일별 콘텐츠가 고유 (기계 번역 직역체 아님)
- [ ] 사용자 의도에 맞는 콘텐츠 (정보형 vs 도구형)

**참고**: [유용한 콘텐츠](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

### Step 3: 감사 리포트 작성

```markdown
## SEO 감사 리포트 — {앱 이름}

> 스캔 일시: {날짜}
> 대상: {N}개 페이지 ({N}개 도구 × {N}개 로케일)
> SEO 점수: {N}/100

---

### 요약

| 심각도 | 개수 | 설명 |
|--------|------|------|
| Critical | {n} | 즉시 수정 필요 — 인덱싱/랭킹에 직접적 영향 |
| Warning | {n} | 권장 수정 — SEO 경쟁력 저하 요인 |
| Info | {n} | 개선 가능 — 차별화 요소 |
| Good | {n} | 잘된 부분 (칭찬) |

---

### Critical — 즉시 수정 필요

#### SEO-C1. {이슈 제목}
- **카테고리**: {13개 중 해당 카테고리}
- **영향**: {검색 순위/인덱싱에 미치는 구체적 영향}
- **현재 상태**: {코드에서 발견된 현재 상태}
- **수정 방법**: {구체적 수정 코드/방법}
- **참고 문서**: {Google 공식 문서 링크}
- **자동 수정**: 가능 / 불가 (사유)

---

### Warning — 권장 수정

#### SEO-W1. {이슈 제목}
(같은 형식)

---

### Info — 개선 가능

#### SEO-I1. {이슈 제목}
(같은 형식)

---

### Good — 잘된 부분

- ✅ {잘된 항목 1}: {설명}
- ✅ {잘된 항목 2}: {설명}

---

### 다음 단계

자동 수정 가능한 항목이 {n}개 있습니다.
- `/seo fix` — Critical + Warning 전체 자동 수정
- `/seo fix pdf` — PDF 앱만 수정
- `/seo optimize pdf merge` — 특정 페이지 심층 최적화
- `/seo lighthouse http://localhost:3001/pdf/ko` — 성능 측정
```

### 심각도 기준

| 심각도 | 기준 | 예시 |
|--------|------|------|
| **Critical** | 인덱싱/랭킹에 직접적 영향. 즉시 수정 필요 | og:image 없음, x-default 누락, noindex 실수, 구조화 데이터 오류 |
| **Warning** | SEO 경쟁력 저하. 수정하면 확실한 개선 | BreadcrumbList 없음, sitemap lastModified 부적절, 내부 링킹 부족 |
| **Info** | 차별화 요소. 경쟁사 대비 우위 확보 | FAQPage 스키마, HowTo 스키마, 콘텐츠 강화 |
| **Good** | 현재 잘 되어 있는 부분 (유지 필요) | canonical 설정, hreflang 43개 로케일, 정적 생성 |

---

## Phase 3: 자동 수정

### 목표
Phase 2에서 발견된 이슈를 즉시 자동으로 수정한다.

### 절차

### 절차

#### Step 1: 자동 수정 가능 항목 분류

| 우선순위 | 수정 항목 | 방법 |
|---------|----------|------|
| P1 Critical | x-default hreflang 추가 | 모든 `generateMetadata`의 `alternates.languages`에 `"x-default"` 추가 |
| P1 Critical | og:image 생성 | Next.js `opengraph-image.tsx` 라우트 핸들러 생성 (@vercel/og 활용) |
| P1 Critical | sitemap lastModified 수정 | `new Date()` → 정적 날짜 또는 git 최종 커밋 날짜 |
| P2 Warning | BreadcrumbList JSON-LD | `@toolbox/seo`에 유틸리티 생성 + 페이지에 적용 |
| P2 Warning | SoftwareApplication 보강 | `author`, `inLanguage`, `operatingSystem` 추가 |
| P2 Warning | og:locale 추가 | generateMetadata에 openGraph.locale 추가 |
| P3 Info | FAQPage 스키마 | FAQ 콘텐츠가 번역에 있는 경우 추가 |
| P3 Info | HowTo 스키마 | 사용법 콘텐츠가 있는 경우 추가 |
| P3 Info | 관련 도구 섹션 | 내부 크로스 링킹 컴포넌트 생성 |

#### Step 2: `@toolbox/seo` 패키지 구축

Fix 실행 시 `packages/seo/src/`에 공유 유틸리티를 생성/업데이트한다:

```
packages/seo/src/
├── index.ts              # Re-exports
├── types.ts              # JsonLd 타입, BreadcrumbItem 등
├── breadcrumb.ts         # generateBreadcrumbJsonLd(items: BreadcrumbItem[])
├── software-app.ts       # generateSoftwareAppJsonLd(tool, locale)
├── faq.ts                # generateFaqJsonLd(faqs: {question, answer}[])
├── howto.ts              # generateHowToJsonLd(name, steps: {name, text}[])
├── alternates.ts         # generateAlternates(path, locales, defaultLocale) — x-default 포함
├── metadata.ts           # generateToolMetadata(tool, locale, dict) — 통합 메타데이터 헬퍼
└── constants.ts          # SEO 상수 (제목 길이, CWV 임계값 등)
```

**각 유틸리티의 역할:**

- `breadcrumb.ts`: `[{name: "Home", url: "/pdf/ko"}, {name: "PDF 병합", url: "/pdf/ko/merge"}]` → JSON-LD 출력
- `software-app.ts`: 도구 정보 + 로케일로 완전한 SoftwareApplication JSON-LD 생성
- `alternates.ts`: 경로 + 로케일 목록으로 `alternates` 객체 생성 (x-default 자동 포함)
- `metadata.ts`: 도구 페이지용 통합 메타데이터 (title, description, canonical, OG, twitter, alternates 한 번에)

#### Step 3: 앱 코드에 적용

각 수정 사항을 대상 파일에 적용:

1. `Read`로 최신 파일 내용 확인
2. `Edit`으로 코드 변경
3. 변경 기록

#### Step 4: 빌드 검증

```bash
pnpm build
```

빌드 실패 시 에러 분석 후 수정.

#### Step 5: 수정 결과 리포트

```markdown
## Phase 3 수정 완료

### 적용된 수정 ({n}개)
| # | 이슈 ID | 파일 | 수정 내용 |
|---|---------|------|-----------|
| 1 | SEO-C1 | layout.tsx | x-default hreflang 추가 |

### 새로 생성된 파일
| 파일 | 역할 |
|------|------|
| packages/seo/src/breadcrumb.ts | BreadcrumbList JSON-LD 생성기 |

### 빌드: {성공/실패}
```

---

## Phase 4: 심층 최적화

### 목표
주요 도구 페이지의 경쟁 키워드를 분석하고, 콘텐츠 갭을 파악하여 검색 경쟁력을 최대화한다.

### 절차

#### Step 1: 주요 도구 페이지 선정

트래픽이 높거나 전략적으로 중요한 도구 페이지를 선정한다 (예: merge, split, compress 등 상위 5개).

#### Step 2: 경쟁 키워드 분석

각 도구에 대해 WebSearch로 대상 키워드 분석:

```
WebSearch: "{도구명} pdf online free"
WebSearch: "{관련 키워드}"
```

상위 10개 결과의 다음을 분석:
- title 태그 패턴
- meta description 패턴
- H1 태그
- 콘텐츠 구조 (FAQ, How-to, 비교표 등)
- 구조화 데이터 타입
- 페이지 콘텐츠 길이

#### Step 3: 콘텐츠 갭 분석

우리 페이지 vs 경쟁사 비교:

```markdown
### 콘텐츠 갭 — {도구명}

| 요소 | 우리 | 경쟁사 비율 | 조치 |
|------|------|-----------|------|
| FAQ 섹션 | ❌ | 7/10 | 추가 필요 |
| How-to 단계 | ❌ | 6/10 | 추가 필요 |
| 기능 비교표 | ❌ | 3/10 | 선택적 |
```

#### Step 4: 최적화 적용

발견된 갭을 바탕으로:
- Title/Description CTR 최적화 (경쟁사 패턴 참고)
- FAQPage/HowTo 구조화 데이터 추가 (콘텐츠가 있는 경우)
- 내부 크로스 링킹 강화

**대폭 콘텐츠 변경은 사용자 확인 후 진행한다.**

---

## Phase 5: Lighthouse 검증

### 목표
수정 결과를 Lighthouse로 검증한다. Core Web Vitals, SEO 점수, 접근성, 성능을 측정한다.

### 절차

#### Step 1: 개발 서버 시작 & Lighthouse 실행

로컬 개발 서버를 시작하고 (이미 실행 중이면 사용) 주요 페이지를 측정한다.

#### Step 2: Lighthouse 실행

```bash
# CLI 방식
npx lighthouse {url} --output=json --output-path=/tmp/lighthouse-report.json --chrome-flags="--headless --no-sandbox"

# 또는 Playwright 방식
node -e "
const { chromium } = require('@playwright/test');
// ... Lighthouse 통합 실행
"
```

#### Step 3: 결과 파싱 & 리포트

```markdown
## Lighthouse 리포트 — {URL}

> 측정 일시: {날짜}
> 디바이스: {Mobile/Desktop}

### 종합 점수

| 카테고리 | 점수 | 목표 | 상태 |
|---------|------|------|------|
| Performance | {N} | 90+ | {✅/⚠️/❌} |
| SEO | {N} | 100 | {✅/⚠️/❌} |
| Accessibility | {N} | 90+ | {✅/⚠️/❌} |
| Best Practices | {N} | 90+ | {✅/⚠️/❌} |

### Core Web Vitals

| 지표 | 값 | 기준 | 상태 |
|------|-----|------|------|
| LCP | {N}s | < 2.5s | {Good/NI/Poor} |
| INP | {N}ms | < 200ms | {Good/NI/Poor} |
| CLS | {N} | < 0.1 | {Good/NI/Poor} |

### 실패한 감사 항목

| 카테고리 | 감사 항목 | 현재 | 기준 | 수정 방법 |
|---------|---------|------|------|----------|
| SEO | {항목명} | {현재값} | {기준} | {수정 방법} |

### 개선 기회

| 항목 | 절약량 | 방법 |
|------|--------|------|
| {항목} | {절약량} | {방법} |
```

---

## Phase 6: 인덱싱 확인

### 목표
Google에 의한 사이트 인덱싱 상태와 크롤링 에러를 확인한다.

### 절차

#### Step 1: 인덱싱 상태 확인

WebSearch로 `site:` 쿼리 실행:

```
WebSearch: site:toolpop.org/pdf
```

인덱싱된 페이지 수와 주요 페이지 노출 여부를 확인한다.

#### Step 2: 주요 페이지별 확인

```
WebSearch: site:toolpop.org/pdf/en/merge
WebSearch: site:toolpop.org/pdf/ko/split
```

#### Step 3: 리포트

```markdown
## 인덱싱 모니터링 리포트

> 확인 일시: {날짜}

### 인덱싱 현황
- 총 인덱싱 페이지: 약 {N}개
- 예상 전체 페이지: {N}개 (도구 {N}개 × 로케일 {N}개)
- 인덱싱 비율: {N}%

### 주요 페이지 인덱싱 여부
| 페이지 | URL | 상태 |
|--------|-----|------|
| 홈 (ko) | /pdf/ko | {인덱싱됨/미인덱싱} |
| 홈 (en) | /pdf/en | {인덱싱됨/미인덱싱} |
| Merge (ko) | /pdf/ko/merge | {인덱싱됨/미인덱싱} |

### 권장 조치
- {조치 항목}
```

---

## Phase 7: 학습 저장

작업 완료 후, 새로 알게 된 SEO 패턴이나 교훈이 있으면 `memory/skills/seo-lessons.md`에 저장한다.

예시:
- 특정 구조화 데이터 패턴이 Rich Results에 효과적이었음
- 특정 키워드 패턴이 경쟁사 분석에서 발견됨
- CWV 개선에 효과적인 Next.js 패턴

---

## 절대 하지 않는 것

- 사용자 확인 없이 페이지 콘텐츠를 대폭 변경하지 않는다
- 키워드 스터핑(과도한 키워드 삽입)을 하지 않는다 — [스팸 정책](https://developers.google.com/search/docs/essentials/spam-policies) 위반
- 숨겨진 텍스트/링크를 추가하지 않는다 — [스팸 정책](https://developers.google.com/search/docs/essentials/spam-policies) 위반
- 클로킹(사용자와 크롤러에게 다른 콘텐츠)을 하지 않는다
- 기계 번역 직역체를 SEO 콘텐츠로 사용하지 않는다 — [다국어 사이트](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- 커밋하지 않는다 — `/commit-and-push`로 별도 진행
- 프로덕션에 직접 영향을 주는 변경(robots.txt에 Disallow 추가 등)은 반드시 사용자 확인 후
- SEO를 위해 사용자 경험(UX)을 해치지 않는다 — Google도 이를 부정적으로 평가
