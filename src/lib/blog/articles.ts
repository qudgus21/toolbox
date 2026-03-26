export interface BlogArticle {
  slug: string;
  app: "pdf" | "image" | "text" | "converter" | "calculator";
  category: "guide" | "tips" | "knowledge";
  publishedAt: string;
  content: Record<
    string,
    {
      title: string;
      description: string;
      body: string;
    }
  >;
}

export const articles: BlogArticle[] = [
  {
    slug: "what-is-pdf",
    app: "pdf",
    category: "knowledge",
    publishedAt: "2026-02-15",
    content: {
      en: {
        title: "What Is a PDF? A Complete Guide to the Portable Document Format",
        description:
          "Learn everything about the PDF format — its history, internal structure, how it preserves documents across platforms, and why it became the world's standard document format.",
        body: `## The Origins of PDF

The Portable Document Format, better known as PDF, was created by Adobe Systems in 1993. The original goal was deceptively simple: make it possible to share documents between different computers and operating systems without losing any formatting. At the time, sending a document from a Mac to a Windows PC often resulted in broken layouts, missing fonts, and garbled text. PDF solved this by embedding everything needed to render a document into a single, self-contained file.

Adobe co-founder John Warnock outlined this vision in a 1991 internal memo called "The Camelot Project." He imagined a universal way to send documents electronically and have them appear exactly as intended, regardless of the recipient's hardware or software. Five years later, the PDF specification was well on its way to becoming an industry standard.

## How PDFs Work Under the Hood

A PDF file is more than a flat image of a page. Internally, it is a structured collection of objects organized in a precise hierarchy. At the top level, a PDF contains a header identifying the version, a body of objects, a cross-reference table for quick lookup, and a trailer pointing to the root object.

The body objects include pages, fonts, images, vector graphics, and metadata. Text in a PDF is stored as character codes positioned at exact coordinates on the page, which is why you can usually select and copy text from a PDF. Fonts can be fully embedded or subsetted — meaning only the characters actually used in the document are included, which keeps file sizes manageable.

Images inside a PDF can use various compression methods. JPEG compression works well for photographs, while lossless formats like Flate (similar to ZIP) are used for screenshots or diagrams where sharp edges matter. Vector graphics — lines, curves, and shapes defined by mathematical equations — render crisply at any zoom level without increasing file size.

## Why PDFs Became Universal

Several factors contributed to PDF becoming the dominant document format worldwide. First, Adobe made the PDF specification freely available, allowing anyone to build software that reads or writes PDFs. This open approach encouraged widespread adoption across industries.

Second, PDFs are platform-independent by design. A PDF created on a Mac looks identical when opened on Windows, Linux, or a mobile device. This consistency is critical for legal documents, contracts, academic papers, and government forms where precise formatting matters.

Third, PDFs support a rich set of features beyond simple page display. Interactive forms, digital signatures, embedded multimedia, hyperlinks, bookmarks, and layers are all part of the specification. This versatility means PDFs serve use cases ranging from simple flyers to complex engineering drawings.

In 2008, the PDF specification was published as an open international standard (ISO 32000), removing any remaining concerns about vendor lock-in. Today, PDF is maintained by the ISO rather than Adobe alone.

## PDF Versions and Their Features

The PDF specification has evolved through several major versions, each adding new capabilities.

- PDF 1.0 through 1.3 established the core features: text, images, fonts, bookmarks, and basic security.
- PDF 1.4 introduced transparency, which allowed objects to be semi-transparent — a major advancement for graphic design.
- PDF 1.5 added support for layers (Optional Content Groups) and improved compression.
- PDF 1.6 brought support for embedding 3D content and OpenType fonts.
- PDF 1.7 became ISO 32000-1 and added enhanced digital signature support.
- PDF 2.0 (ISO 32000-2), released in 2017 and updated in 2020, modernized encryption to AES-256, improved accessibility tagging, added support for geospatial data, and removed features that had become obsolete.

Most PDF readers today support all versions through 2.0, so compatibility is rarely an issue for end users.

## The Internal Structure of a Page

When a PDF reader displays a page, it interprets a content stream — a sequence of operators that describe what to draw and where. These operators handle tasks like setting the current font, positioning the text cursor, drawing lines, filling shapes with color, and placing images.

Each page has a defined media box (the full page dimensions) and optionally a crop box, bleed box, and trim box used in professional printing. This separation lets a single PDF serve both screen display and print production without modification.

Fonts in a PDF can be one of 14 standard fonts guaranteed to be available, an embedded TrueType or OpenType font, or a Type 1 PostScript font. When fonts are embedded, the document renders identically everywhere. When they are not, the reader substitutes the closest available font, which can cause subtle layout shifts.

## PDF in Everyday Use

Today, PDFs are everywhere. Tax agencies distribute forms as PDFs. Courts require filings in PDF format. Publishers deliver e-books as PDFs. Architects share blueprints as PDFs. The format's ability to preserve exact visual fidelity while remaining compact and searchable makes it irreplaceable for these workflows.

Browser-based PDF viewers, built into Chrome, Firefox, Safari, and Edge, have made it unnecessary to install separate software for basic viewing. For more advanced tasks — editing, annotating, merging, splitting, or compressing — specialized tools fill the gap, and many of these now run entirely in the browser without uploading files to a server.

Understanding what a PDF actually is helps you make better decisions about how to create, optimize, and share your documents. Whether you are preparing a resume, archiving invoices, or publishing a report, the PDF format provides a reliable foundation that has proven its value over three decades.`,
      },
      ko: {
        title: "PDF란? 포터블 문서 포맷 완벽 가이드",
        description:
          "PDF의 역사부터 내부 구조, 플랫폼 독립성, 그리고 세계 표준 문서 포맷이 된 이유까지 — PDF에 대해 알아야 할 모든 것을 정리했습니다.",
        body: `## PDF의 탄생 배경

PDF(Portable Document Format)는 1993년 어도비 시스템즈가 만든 문서 형식입니다. 당시 해결하려던 문제는 명확했습니다. 서로 다른 컴퓨터, 서로 다른 운영체제 사이에서 문서를 주고받을 때 레이아웃이 깨지지 않도록 하는 것이었죠. 1990년대 초반, Mac에서 만든 문서를 Windows PC에서 열면 글꼴이 바뀌고, 줄 바꿈 위치가 달라지고, 이미지 배치가 어긋나는 일이 다반사였습니다.

어도비의 공동 창업자 존 워녹은 1991년 "카멜롯 프로젝트"라는 내부 메모에서 이 비전을 구체화했습니다. 어떤 기기에서 열어도 원본과 똑같이 보이는 전자 문서, 그것이 PDF의 출발점이었습니다.

## PDF 내부 구조

PDF 파일은 단순한 페이지 이미지가 아닙니다. 내부적으로는 정밀하게 조직된 객체들의 집합체입니다. 파일 최상위에는 버전 정보를 담은 헤더가 있고, 그 아래로 본문 객체, 빠른 탐색을 위한 교차 참조 테이블, 루트 객체를 가리키는 트레일러가 차례로 이어집니다.

본문 객체에는 페이지, 글꼴, 이미지, 벡터 그래픽, 메타데이터 등이 포함됩니다. 텍스트는 페이지 위의 정확한 좌표에 배치된 문자 코드로 저장되기 때문에 대부분의 PDF에서 텍스트를 선택하고 복사할 수 있습니다. 글꼴은 통째로 내장하거나, 문서에 실제 사용된 글자만 추려서 내장(서브세팅)할 수 있어 파일 크기를 효율적으로 관리할 수 있습니다.

이미지는 용도에 따라 다른 압축 방식을 사용합니다. 사진에는 JPEG 압축이 효과적이고, 스크린샷이나 도표처럼 선명한 경계가 중요한 이미지에는 Flate(ZIP과 유사한 무손실 압축)가 적합합니다. 벡터 그래픽은 수학 공식으로 정의된 선과 곡선이므로 아무리 확대해도 선명하게 렌더링됩니다.

## PDF가 표준이 된 이유

PDF가 전 세계 표준 문서 형식으로 자리 잡은 데에는 몇 가지 결정적인 요인이 있습니다.

첫째, 어도비가 PDF 사양을 공개했습니다. 누구나 PDF를 읽고 쓰는 소프트웨어를 만들 수 있게 되면서 생태계가 빠르게 확장되었습니다.

둘째, PDF는 설계 자체가 플랫폼 독립적입니다. Mac에서 만든 PDF를 Windows, Linux, 스마트폰 어디에서 열어도 동일하게 보입니다. 계약서, 법률 문서, 논문, 정부 서식처럼 정확한 형식이 중요한 분야에서 이 특성은 필수적입니다.

셋째, 단순한 페이지 표시를 넘어 대화형 양식, 전자 서명, 멀티미디어 삽입, 하이퍼링크, 북마크, 레이어 등 다양한 기능을 지원합니다. 간단한 전단지부터 복잡한 설계 도면까지 하나의 형식으로 처리할 수 있는 이유입니다.

2008년에는 PDF 사양이 국제 표준(ISO 32000)으로 공식 채택되어, 더 이상 특정 기업에 종속되지 않는 형식이 되었습니다.

## PDF 버전별 주요 기능

PDF 사양은 여러 차례 개정을 거치며 기능을 확장해 왔습니다.

- PDF 1.0~1.3: 텍스트, 이미지, 글꼴, 북마크, 기본 보안 등 핵심 기능 정립
- PDF 1.4: 투명도 지원 도입 — 그래픽 디자인 분야에서 큰 전환점
- PDF 1.5: 레이어(선택적 콘텐츠 그룹)와 개선된 압축 추가
- PDF 1.6: 3D 콘텐츠 삽입, OpenType 글꼴 지원
- PDF 1.7: ISO 32000-1로 표준화, 향상된 전자 서명
- PDF 2.0: AES-256 암호화, 접근성 태그 강화, 지리공간 데이터 지원 등 전면 현대화

오늘날 대부분의 PDF 리더가 2.0까지 지원하므로, 일반 사용자가 호환성 문제를 겪는 경우는 거의 없습니다.

## 페이지 렌더링 원리

PDF 리더가 페이지를 화면에 표시할 때는 콘텐츠 스트림을 해석합니다. 콘텐츠 스트림은 "이 글꼴을 설정하라", "이 좌표에 텍스트를 놓아라", "이 색으로 도형을 채워라" 같은 명령어의 연속입니다.

각 페이지에는 미디어 박스(전체 페이지 크기)가 정의되고, 인쇄 용도에 따라 크롭 박스, 블리드 박스, 트림 박스를 추가로 설정할 수 있습니다. 이 구분 덕분에 하나의 PDF로 화면 표시와 인쇄 제작을 동시에 처리할 수 있습니다.

## 일상 속의 PDF

지금 PDF는 어디에나 있습니다. 세무 서류, 법원 제출 문서, 전자책, 건축 도면, 이력서 — 정확한 시각적 재현이 필요한 거의 모든 곳에서 PDF가 쓰입니다.

Chrome, Firefox, Safari, Edge 등 주요 브라우저에 PDF 뷰어가 내장되면서 기본적인 열람에는 별도 소프트웨어를 설치할 필요가 없어졌습니다. 편집, 주석, 병합, 분할, 압축 같은 고급 작업에는 전문 도구가 필요하지만, 요즘은 파일을 서버에 업로드하지 않고 브라우저에서 바로 처리하는 도구도 많아졌습니다.

PDF가 무엇이고 어떻게 작동하는지 이해하면, 문서를 만들고 관리하는 방식이 달라집니다. 이력서를 준비하든, 영수증을 보관하든, 보고서를 배포하든 — 30년 넘게 검증된 PDF는 여전히 가장 신뢰할 수 있는 문서 형식입니다.`,
      },
    },
  },
  {
    slug: "reduce-pdf-file-size",
    app: "pdf",
    category: "guide",
    publishedAt: "2026-02-19",
    content: {
      en: {
        title: "How to Reduce PDF File Size: 5 Proven Methods",
        description:
          "Discover five practical methods to compress PDF files without sacrificing quality — from image optimization to font subsetting and structural cleanup.",
        body: `## Why PDF File Size Matters

Large PDF files create real problems. Email providers reject attachments over 25 MB. Uploading oversized files to web portals times out. Sharing a 50 MB PDF over a slow connection frustrates everyone involved. And if your website hosts downloadable PDFs, bloated files hurt page load times and search engine rankings.

The good news is that most PDFs contain significant room for size reduction. A 20 MB file can often shrink to 3 MB with the right approach, and in many cases, you will not notice any visual difference. The key is understanding what makes a PDF large in the first place and choosing the right compression strategy for your situation.

## Method 1: Compress Embedded Images

Images are the single biggest contributor to PDF file size. A document with a few high-resolution photos can easily reach tens of megabytes, even if the text content is minimal.

The most effective approach is to resample images to match their display size. If an image is displayed at 3 inches wide on the page, it does not need to be 4000 pixels wide — 300 DPI (900 pixels) is plenty for print quality, and 150 DPI works fine for screen viewing.

You should also choose the right compression algorithm. JPEG compression works well for photographs and complex images. For simple graphics, charts, or screenshots, PNG-style lossless compression often produces smaller files while maintaining sharp edges.

Quality settings matter too. JPEG quality of 75-80 out of 100 is usually indistinguishable from the original to the human eye but can reduce file size by 60-70 percent compared to maximum quality.

## Method 2: Remove Unused Objects

PDFs accumulate dead weight over time. When you edit a PDF — deleting pages, removing images, or changing text — the old data often remains in the file as unreferenced objects. This is because PDF editors frequently use an incremental save approach that appends changes rather than rewriting the entire file.

Running a "save as" or "optimize" operation rebuilds the file from scratch, discarding any orphaned objects. This single step can sometimes cut file size in half, especially for documents that have been edited multiple times.

Metadata is another source of hidden bloat. Some PDFs carry extensive XML metadata, embedded thumbnails for every page, or application-specific data from the software that created them. Stripping unnecessary metadata rarely affects the document's appearance but can free up meaningful space.

## Method 3: Downsample Resolution Strategically

Not all pages in a PDF need the same resolution. A cover page with a full-bleed photo might warrant 300 DPI, while interior pages with small thumbnail images work perfectly at 150 DPI.

Smart downsampling applies different resolution targets based on context. Images that are already at or below the target resolution should be left untouched — re-encoding them would only degrade quality without saving space.

For documents intended purely for screen viewing (not printing), downsampling all images to 96-150 DPI is safe. For documents that might be printed, 200-300 DPI preserves quality. Going above 300 DPI almost never provides visible benefit, even on high-end printers.

## Method 4: Subset and Optimize Fonts

Fonts can be surprisingly large. A comprehensive CJK (Chinese, Japanese, Korean) font might be 15 MB or more. If your document only uses a few dozen characters from that font, embedding the entire font file wastes enormous space.

Font subsetting solves this by including only the character outlines actually used in the document. A 15 MB font that only needs 50 characters might shrink to 50 KB as a subset.

Some PDFs embed the same font multiple times under slightly different names, especially when created by merging documents from different sources. Deduplicating these redundant fonts is another effective optimization.

Also consider whether font embedding is necessary at all. If a document uses only common system fonts like Arial, Times New Roman, or Helvetica, you can reference them by name without embedding. The trade-off is that the document might render slightly differently on systems that lack those exact fonts.

## Method 5: Enable Web Optimization (Linearization)

Linearization, also called "Fast Web View," reorganizes the internal structure of a PDF so that a web browser can begin displaying the first page before the entire file has downloaded. While linearization does not always reduce the raw file size significantly, it dramatically improves the perceived loading speed for users viewing the PDF online.

A linearized PDF places page one's resources at the beginning of the file, followed by subsequent pages in order. It also includes a hint table that tells the viewer where to find each page's data. This means a user clicking a link to a 100-page PDF sees the first page in seconds rather than waiting for the entire file to download.

## Choosing the Right Method

The best approach depends on your specific PDF. For photo-heavy documents, image compression delivers the biggest gains. For text documents created from word processors, removing unused objects and font optimization are more impactful. For files that have been through multiple rounds of editing, a clean "save as" rebuild might be all you need.

In most cases, combining multiple methods produces the best results. Start by removing unused objects, then compress images, then subset fonts. Test the output to ensure quality meets your requirements before distributing the optimized file.

Keep a copy of the original file before compressing. Some compression operations are lossy and cannot be reversed. Having the original lets you try different settings and compare results until you find the right balance between file size and quality.`,
      },
      ko: {
        title: "PDF 파일 크기 줄이는 5가지 방법",
        description:
          "이미지 압축부터 글꼴 서브세팅, 불필요한 객체 제거까지 — 품질을 유지하면서 PDF 용량을 효과적으로 줄이는 다섯 가지 실용 기법을 소개합니다.",
        body: `## PDF 용량이 중요한 이유

PDF 용량이 크면 불편이 쌓입니다. 이메일 첨부 파일은 보통 25MB 제한이 있고, 웹 포털 업로드는 타임아웃이 걸리고, 느린 네트워크 환경에서 50MB짜리 파일을 공유하면 양쪽 모두 답답합니다. 웹사이트에 PDF를 올려두는 경우, 파일이 크면 페이지 로딩 속도와 검색엔진 순위에도 악영향을 줍니다.

다행히 대부분의 PDF에는 줄일 수 있는 여지가 상당합니다. 20MB 파일이 3MB까지 줄어드는 경우도 흔하며, 눈으로 구분할 수 없을 정도로 품질이 유지되는 경우가 많습니다. 핵심은 파일이 왜 큰지를 파악하고, 상황에 맞는 압축 전략을 선택하는 것입니다.

## 방법 1: 이미지 압축

PDF 용량의 가장 큰 비중을 차지하는 것은 이미지입니다. 고해상도 사진 몇 장만 포함되어 있어도 텍스트와 무관하게 수십 MB에 달하기 쉽습니다.

가장 효과적인 접근은 이미지를 실제 표시 크기에 맞춰 리샘플링하는 것입니다. 페이지에서 3인치 너비로 표시되는 이미지에 4000픽셀 해상도는 필요 없습니다. 인쇄용이라면 300DPI(900픽셀), 화면용이라면 150DPI로 충분합니다.

압축 알고리즘 선택도 중요합니다. 사진에는 JPEG 압축이 효율적이고, 차트나 스크린샷처럼 선명한 경계가 중요한 그래픽에는 무손실 압축이 더 적합합니다.

JPEG 품질을 100 기준으로 75~80 정도로 설정하면 육안으로 차이를 느끼기 어려우면서 파일 크기를 60~70% 줄일 수 있습니다.

## 방법 2: 사용하지 않는 객체 제거

PDF는 편집을 거듭할수록 불필요한 데이터가 쌓입니다. 페이지를 삭제하거나 이미지를 교체해도, 기존 데이터가 파일 안에 참조되지 않는 객체로 남아 있는 경우가 많습니다. PDF 편집기가 파일 전체를 다시 쓰는 대신 변경 사항만 덧붙이는 방식(증분 저장)을 사용하기 때문입니다.

"다른 이름으로 저장"이나 "최적화" 기능을 실행하면 파일을 처음부터 다시 구성하면서 고아 객체를 제거합니다. 여러 번 편집된 문서라면 이것만으로도 용량이 절반 이하로 줄어들 수 있습니다.

메타데이터도 의외의 용량 차지합니다. 일부 PDF에는 방대한 XML 메타데이터, 모든 페이지의 미리보기 썸네일, 제작 소프트웨어가 남긴 고유 데이터가 들어 있습니다. 불필요한 메타데이터를 제거해도 문서 내용에는 영향이 없으면서 공간을 확보할 수 있습니다.

## 방법 3: 해상도를 전략적으로 낮추기

PDF의 모든 페이지가 같은 해상도일 필요는 없습니다. 표지의 전면 사진은 300DPI가 적절하지만, 본문 속 작은 썸네일 이미지는 150DPI로도 충분합니다.

이미 목표 해상도 이하인 이미지는 건드리지 않는 것이 좋습니다. 다시 인코딩하면 품질만 떨어지고 용량은 줄지 않습니다.

화면 전용 문서라면 96~150DPI, 인쇄 가능성이 있다면 200~300DPI가 적절합니다. 300DPI를 넘기면 고급 프린터에서도 눈에 보이는 차이가 거의 없습니다.

## 방법 4: 글꼴 서브세팅과 최적화

글꼴은 생각보다 용량이 큽니다. 한중일(CJK) 글꼴은 하나에 15MB를 넘기기도 합니다. 문서에서 실제로 사용한 글자가 수십 개뿐이라면, 전체 글꼴을 내장하는 것은 엄청난 낭비입니다.

글꼴 서브세팅은 문서에 실제 사용된 글자의 외곽선만 포함시키는 기법입니다. 15MB 글꼴이라도 사용 글자가 50개뿐이라면 50KB 수준으로 줄어듭니다.

여러 문서를 합쳐서 만든 PDF에는 같은 글꼴이 이름만 약간 달리해서 중복 내장된 경우도 있습니다. 중복 글꼴을 하나로 합치는 것도 효과적인 최적화입니다.

Arial, Times New Roman 같은 시스템 기본 글꼴만 사용했다면, 글꼴을 내장하지 않고 이름만 참조하는 방법도 있습니다. 다만 해당 글꼴이 없는 환경에서는 표시가 약간 달라질 수 있다는 점은 감안해야 합니다.

## 방법 5: 웹 최적화(리니어라이제이션)

리니어라이제이션은 "빠른 웹 보기"라고도 불리며, PDF 내부 구조를 재배치해서 브라우저가 파일 전체를 다운로드하기 전에 첫 페이지부터 표시할 수 있게 합니다. 실제 파일 크기가 크게 줄지는 않지만, 온라인에서 PDF를 열 때 체감 로딩 속도가 크게 빨라집니다.

리니어라이즈된 PDF는 1페이지에 필요한 리소스를 파일 앞부분에, 이후 페이지를 순서대로 배치합니다. 100페이지짜리 PDF 링크를 클릭하면 전체 다운로드를 기다리지 않고 첫 페이지를 즉시 볼 수 있습니다.

## 상황에 맞는 방법 선택

최적의 접근은 PDF의 특성에 따라 달라집니다. 사진이 많은 문서라면 이미지 압축이 가장 효과적이고, 워드프로세서로 만든 텍스트 문서라면 불필요한 객체 제거와 글꼴 최적화가 더 큰 효과를 냅니다. 여러 차례 편집을 거친 파일이라면 "다른 이름으로 저장"만으로도 충분할 수 있습니다.

대부분의 경우 여러 방법을 조합하면 최상의 결과를 얻을 수 있습니다. 불필요한 객체를 먼저 제거하고, 이미지를 압축한 다음, 글꼴을 서브세팅하세요. 최적화된 파일을 배포하기 전에 품질이 만족스러운지 꼭 확인하시고, 원본 파일은 반드시 보관해 두세요. 손실 압축은 되돌릴 수 없으니까요.`,
      },
    },
  },
  {
    slug: "pdf-vs-pdfa",
    app: "pdf",
    category: "knowledge",
    publishedAt: "2026-02-23",
    content: {
      en: {
        title:
          "PDF vs PDF/A: What's the Difference and When to Use Each",
        description:
          "Understand the key differences between standard PDF and PDF/A, the archival format designed for long-term document preservation, including compliance levels and practical use cases.",
        body: `## What Is PDF/A?

PDF/A is a specialized subset of the PDF standard designed specifically for long-term digital archiving. The "A" stands for "Archive." Published as ISO 19005, PDF/A imposes strict requirements that ensure a document can be reliably reproduced decades or even centuries from now, regardless of the software or hardware used to open it.

While a regular PDF is flexible and feature-rich, this flexibility comes at a cost for archival purposes. A standard PDF can reference external fonts, link to web content, contain JavaScript, and depend on resources outside the file. Over time, those external dependencies may break — fonts disappear, URLs change, and software evolves. PDF/A eliminates this risk by requiring everything the document needs to be self-contained within the file.

## Key Differences Between PDF and PDF/A

The most significant difference is self-containment. A PDF/A file must embed all fonts used in the document. It cannot reference external content or depend on anything outside the file itself. Standard PDFs, by contrast, can reference system fonts and link to external resources.

PDF/A prohibits several features that standard PDFs allow. JavaScript is forbidden because scripts may not execute correctly in future software. Audio and video content cannot be embedded because playback depends on codecs that may become obsolete. Encryption is not allowed because a future reader might not support the specific encryption algorithm used, making the document inaccessible.

Color management is mandatory in PDF/A. Every document must include an ICC color profile to ensure colors are reproduced consistently across different displays and printers. Standard PDFs may omit color profiles, which can lead to color shifts depending on the viewing environment.

Metadata requirements are also stricter. PDF/A mandates XMP (Extensible Metadata Platform) metadata embedded within the file, including properties like title, author, and creation date. This structured metadata ensures the document can be cataloged and searched effectively in archive systems.

## PDF/A Compliance Levels

PDF/A is not a single standard but a family of conformance levels, each building on the previous.

### PDF/A-1 (ISO 19005-1, 2005)

The original PDF/A standard, based on PDF 1.4. It comes in two conformance levels. Level B (Basic) ensures reliable visual reproduction — the document looks the same everywhere. Level A (Accessible) adds requirements for document structure, including tagged content and Unicode text mapping, which supports accessibility and text extraction.

### PDF/A-2 (ISO 19005-2, 2011)

Based on PDF 1.7, PDF/A-2 adds support for JPEG2000 compression, transparency, layers (Optional Content Groups), and the ability to embed other PDF/A files as attachments. It includes three conformance levels: A, B, and a new level U (Unicode) that requires all text to have Unicode mappings without full structural tagging.

### PDF/A-3 (ISO 19005-3, 2012)

Also based on PDF 1.7, PDF/A-3 extends PDF/A-2 with one significant addition: the ability to embed any file format as an attachment, not just other PDF/A files. This means you can attach the original source file (an Excel spreadsheet, a CAD drawing, or an XML dataset) to the archived PDF. The embedded files do not need to conform to PDF/A themselves.

### PDF/A-4 (ISO 19005-4, 2020)

Based on PDF 2.0, PDF/A-4 simplifies the conformance structure. It replaces the A, B, and U levels with two profiles: PDF/A-4 (equivalent to the old Level B with Unicode) and PDF/A-4f (allowing embedded files). There is also PDF/A-4e for engineering documents, supporting 3D content and rich media.

## When to Use Standard PDF

Standard PDF is the right choice for everyday document sharing and collaboration. If you are sending a report to a colleague, creating a presentation handout, building a fillable form, or publishing a document with interactive features, standard PDF gives you the full range of tools without restrictions.

Standard PDF supports encryption for confidential documents, JavaScript for interactive forms, multimedia for presentations, and hyperlinks for navigation. These features are essential for working documents that need to be functional, not just readable.

## When to Use PDF/A

PDF/A is the right choice when long-term preservation and accessibility are priorities. Common scenarios include government records that must be maintained for legal retention periods, financial documents required by audit regulations, medical records, court filings, historical archives, and any document that needs to remain readable without depending on specific software.

Many regulatory frameworks specifically require PDF/A. The European Union mandates PDF/A for electronic invoicing. Various court systems require PDF/A for digital case files. National archives around the world accept only PDF/A for digital preservation.

If you are unsure whether you need PDF/A, ask yourself this: will someone need to open this document in 10, 20, or 50 years and see exactly what was intended? If the answer is yes, PDF/A is worth the trade-offs.

## Converting Between Formats

Converting a standard PDF to PDF/A requires addressing all non-compliant elements. Fonts must be embedded, JavaScript removed, multimedia stripped, and color profiles added. Most professional PDF software can perform this conversion, though the process may alter the document's appearance if it relied heavily on features that PDF/A prohibits.

Going the other direction — using a PDF/A file as a standard PDF — requires no conversion at all. Since PDF/A is a subset of PDF, any PDF reader can open a PDF/A file normally. The restrictions apply only during creation and validation, not viewing.

## Practical Recommendations

For most people, standard PDF works perfectly for daily tasks. Choose PDF/A when you are dealing with regulatory compliance, long-term storage, or institutional archiving requirements. If you want the best of both worlds, create your documents in PDF/A-2b or PDF/A-3b, which provide archival guarantees while allowing modern features like transparency and file attachments. These files remain fully functional as regular PDFs while meeting preservation standards.`,
      },
      ko: {
        title: "PDF와 PDF/A의 차이점 — 언제 어떤 형식을 쓸까",
        description:
          "일반 PDF와 장기 보존용 PDF/A의 핵심 차이, 적합성 수준, 그리고 실제로 어떤 상황에서 어떤 형식을 선택해야 하는지 정리했습니다.",
        body: `## PDF/A란?

PDF/A는 장기 디지털 보관을 위해 만들어진 PDF의 특수 규격입니다. "A"는 Archive(보관)를 뜻합니다. ISO 19005로 발행된 이 표준은 수십 년, 심지어 수백 년 후에도 문서를 안정적으로 재현할 수 있도록 엄격한 요구 사항을 부과합니다.

일반 PDF는 유연하고 기능이 풍부합니다. 하지만 바로 이 유연성이 보관 관점에서는 약점이 됩니다. 외부 글꼴을 참조하거나, 웹 콘텐츠에 링크하거나, JavaScript를 포함하거나, 파일 외부의 리소스에 의존할 수 있기 때문입니다. 시간이 지나면 글꼴이 사라지고, URL이 바뀌고, 소프트웨어가 변합니다. PDF/A는 문서에 필요한 모든 것을 파일 안에 완전히 포함시킴으로써 이 위험을 제거합니다.

## PDF와 PDF/A의 주요 차이

가장 큰 차이는 자기 완결성입니다. PDF/A 파일은 사용된 모든 글꼴을 내장해야 하며, 외부 콘텐츠를 참조할 수 없습니다. 일반 PDF는 시스템 글꼴을 참조하거나 외부 리소스에 링크하는 것이 가능합니다.

PDF/A에서는 여러 기능이 금지됩니다. JavaScript는 미래의 소프트웨어에서 올바르게 실행되지 않을 수 있어 허용되지 않습니다. 오디오와 비디오는 재생에 필요한 코덱이 더 이상 지원되지 않을 수 있어 삽입할 수 없습니다. 암호화도 금지인데, 미래의 리더가 해당 암호화 알고리즘을 지원하지 않으면 문서에 접근할 수 없기 때문입니다.

색상 관리는 PDF/A에서 의무입니다. 모든 문서에 ICC 색상 프로파일을 포함해서 어떤 디스플레이와 프린터에서든 일관된 색상 재현을 보장해야 합니다.

메타데이터 요구 사항도 더 엄격합니다. PDF/A는 제목, 저자, 생성 날짜 등을 포함한 XMP 메타데이터를 의무적으로 내장해야 합니다.

## PDF/A 적합성 수준

PDF/A는 단일 표준이 아니라 여러 적합성 수준으로 구성된 체계입니다.

### PDF/A-1 (2005년)

PDF 1.4 기반의 최초 표준입니다. Level B(Basic)는 시각적 재현의 신뢰성을 보장하고, Level A(Accessible)는 여기에 문서 구조 태그와 유니코드 텍스트 매핑을 추가하여 접근성과 텍스트 추출을 지원합니다.

### PDF/A-2 (2011년)

PDF 1.7 기반으로, JPEG2000 압축, 투명도, 레이어, 다른 PDF/A 파일의 첨부 기능을 추가했습니다. A, B, U(유니코드) 세 가지 적합성 수준이 있으며, Level U는 전체 구조 태깅 없이도 모든 텍스트에 유니코드 매핑만 요구합니다.

### PDF/A-3 (2012년)

PDF/A-2를 확장하여, PDF/A 파일뿐 아니라 어떤 형식의 파일이든 첨부할 수 있게 했습니다. 엑셀 스프레드시트, CAD 도면, XML 데이터셋 등을 원본 그대로 PDF/A 문서에 함께 보관할 수 있습니다.

### PDF/A-4 (2020년)

PDF 2.0 기반의 최신 표준으로, 적합성 구조를 단순화했습니다. 기존의 A/B/U 레벨 대신 PDF/A-4(기본)와 PDF/A-4f(파일 첨부 가능) 두 가지 프로파일로 정리되었습니다. 엔지니어링 문서용 PDF/A-4e도 있어 3D 콘텐츠를 지원합니다.

## 일반 PDF를 선택할 때

일상적인 문서 공유와 협업에는 일반 PDF가 적합합니다. 동료에게 보고서를 보내거나, 대화형 양식을 만들거나, 멀티미디어가 포함된 프레젠테이션 자료를 만들 때는 일반 PDF의 풍부한 기능이 필요합니다.

암호화, JavaScript 기반 양식, 하이퍼링크 — 이런 기능은 실무에서 사용하는 문서에 필수적이지만, PDF/A에서는 허용되지 않습니다.

## PDF/A를 선택할 때

장기 보존과 접근성이 우선인 경우에 PDF/A를 사용합니다. 법정 보존 기간이 있는 정부 기록, 감사 규정에 따른 재무 문서, 의료 기록, 법원 제출 문서, 역사 자료 보관 — 이 모든 경우에 PDF/A가 적합합니다.

실제로 많은 규제 체계에서 PDF/A를 명시적으로 요구합니다. EU는 전자 송장에 PDF/A를 의무화하고 있으며, 여러 법원 시스템에서 디지털 소송 기록에 PDF/A를 요구합니다.

선택이 고민된다면 이렇게 자문해 보세요. "10년, 20년, 50년 후에 누군가 이 문서를 열어서 원래 의도한 그대로 볼 수 있어야 하는가?" 그렇다면 PDF/A입니다.

## 형식 간 변환

일반 PDF를 PDF/A로 변환하려면 비준수 요소를 모두 처리해야 합니다. 글꼴을 내장하고, JavaScript를 제거하고, 멀티미디어를 제외하고, 색상 프로파일을 추가해야 합니다.

반대 방향은 변환이 필요 없습니다. PDF/A는 PDF의 부분집합이므로 어떤 PDF 리더에서든 그냥 열 수 있습니다. 제한 사항은 생성과 검증 단계에서만 적용될 뿐, 열람에는 영향이 없습니다.

일상 업무에는 일반 PDF로 충분합니다. 규제 준수나 장기 보관이 필요할 때 PDF/A를 선택하세요. 두 가지 장점을 모두 원한다면 PDF/A-2b나 PDF/A-3b로 만드는 것을 권합니다. 보관 요건을 충족하면서도 투명도와 파일 첨부 같은 현대적 기능을 사용할 수 있으며, 일반 PDF로도 정상 작동합니다.`,
      },
    },
  },
  {
    slug: "merge-pdf-files",
    app: "pdf",
    category: "guide",
    publishedAt: "2026-02-27",
    content: {
      en: {
        title: "How to Merge PDF Files: The Complete Guide",
        description:
          "Learn how to combine multiple PDF files into one document using online tools, desktop software, and command-line methods, with tips for handling large files and preserving bookmarks.",
        body: `## Why Merge PDF Files?

Combining multiple PDFs into a single document is one of the most common PDF tasks. You might need to assemble a proposal from separate sections, consolidate monthly reports into a quarterly summary, combine scanned pages into a complete document, or package multiple attachments into one file for easier sharing.

Working with a single file instead of juggling multiple documents simplifies organization, reduces email attachments, and ensures recipients see everything in the intended order. It also makes printing easier — one file, one print job, no fussing with multiple documents.

## Using Browser-Based Tools

Browser-based PDF tools have become remarkably capable. Modern tools process files entirely within your browser using JavaScript and WebAssembly, meaning your documents never leave your device. This eliminates privacy concerns about uploading sensitive files to third-party servers.

The typical workflow is straightforward: select or drag-and-drop your PDF files, arrange them in the desired order, and click merge. Most browser-based tools let you reorder files by dragging, remove files you have added by mistake, and preview pages before merging.

For large files or many documents, browser-based tools may be slower than desktop software because they are constrained by browser memory limits. However, for most everyday merging tasks — combining a handful of documents under 50 MB total — they work perfectly.

## Using Desktop Software

Desktop applications offer more power and flexibility for complex merging tasks. Several free and open-source options are available across platforms.

On macOS, Preview handles basic merging well. Open the first PDF, show the thumbnail sidebar, and drag additional PDF files into the sidebar at the position where you want them inserted. This approach also lets you cherry-pick individual pages from multiple source files.

On Windows, free tools like PDFsam Basic provide a dedicated merge interface. You load your files, arrange the order, and merge. PDFsam also offers split, rotate, and extract operations alongside merging.

Cross-platform tools like LibreOffice can export to PDF, and command-line tools like qpdf, pdftk, and Ghostscript provide scriptable merging for automation workflows.

## Command-Line Merging

For technical users and automation scenarios, command-line tools offer unmatched efficiency. Here are common approaches.

Using qpdf, merging is a single command: qpdf --empty --pages file1.pdf file2.pdf file3.pdf -- output.pdf. You can also specify page ranges: qpdf --empty --pages file1.pdf 1-5 file2.pdf 10-15 -- output.pdf.

Using pdftk: pdftk file1.pdf file2.pdf cat output combined.pdf. To merge all PDFs in a directory: pdftk *.pdf cat output combined.pdf.

Using Ghostscript: gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile=combined.pdf file1.pdf file2.pdf.

Command-line tools are particularly valuable when you need to merge files on a schedule, process files in bulk, or integrate merging into a larger automated workflow.

## Handling Large Files

When working with large or numerous PDFs, several strategies help ensure smooth merging.

Close unnecessary applications to free up memory. PDF merging can be memory-intensive, especially when dealing with image-heavy documents. If your tool crashes or runs extremely slowly, this is usually the cause.

Consider merging in batches. If you need to combine 200 files, merge them in groups of 20-30 first, then merge the resulting files together. This reduces peak memory usage and gives you checkpoints if something goes wrong.

Watch your output file size. Some tools re-compress content during merging, while others simply concatenate the data. If the merged file is significantly larger than the sum of the inputs, the tool may be decompressing and re-encoding content. Try a different tool if this happens.

For extremely large documents (thousands of pages), use command-line tools like qpdf, which is designed to handle large files efficiently by streaming data rather than loading everything into memory at once.

## Preserving Bookmarks and Structure

One often-overlooked aspect of PDF merging is bookmark preservation. If your source PDFs contain bookmarks (also called outlines), you likely want those preserved in the merged output.

Not all merging tools handle bookmarks well. Some discard bookmarks entirely. Others preserve them but fail to update page references, resulting in bookmarks that jump to wrong pages. The best tools preserve bookmarks from all source files and adjust page numbers to account for each file's position in the merged document.

If bookmarks are important to your workflow, test your merging tool with bookmarked PDFs before committing to it for production use. qpdf and pdftk both handle bookmarks correctly in most cases.

Page labels are another structural element worth preserving. If your source PDFs use Roman numerals for front matter and Arabic numerals for body content, a good merging tool will maintain these label schemes in the combined output.

## Tips for Better Results

Before merging, ensure all source PDFs use compatible page sizes if consistency matters for your use case. Merging letter-size and A4 documents produces a valid PDF, but the mixed sizes may look odd when printed or viewed side by side.

Name your files with numbers or prefixes that sort correctly: 01-intro.pdf, 02-chapter1.pdf, 03-chapter2.pdf. This prevents ordering mistakes when selecting files.

After merging, review the output. Scroll through the entire document to verify that all pages appear correctly, page order is right, and no content is missing. A quick visual check catches most issues before you distribute the file.

Keep the source files after merging. If you need to update one section later, it is far easier to edit that section's source PDF and re-merge than to try extracting and replacing pages in the combined file.`,
      },
      ko: {
        title: "PDF 파일 합치는 방법 완벽 가이드",
        description:
          "온라인 도구, 데스크톱 소프트웨어, 명령줄 방식으로 여러 PDF 파일을 하나로 합치는 방법을 소개합니다. 대용량 파일 처리와 북마크 유지 팁도 함께 정리했습니다.",
        body: `## PDF를 합쳐야 하는 이유

여러 PDF를 하나로 합치는 작업은 가장 흔한 PDF 작업 중 하나입니다. 제안서를 섹션별로 작성한 뒤 합치거나, 월간 보고서를 분기 단위로 묶거나, 스캔한 페이지들을 하나의 문서로 만들거나, 여러 첨부 파일을 하나로 정리해서 보내야 할 때 필요합니다.

하나의 파일로 정리하면 관리가 편해지고, 이메일 첨부 파일이 줄고, 수신자가 의도한 순서대로 내용을 볼 수 있습니다. 출력할 때도 한 번에 처리할 수 있어 훨씬 간편합니다.

## 브라우저 기반 도구 사용하기

요즘 브라우저 기반 PDF 도구의 성능은 상당합니다. JavaScript와 WebAssembly를 활용해 브라우저 안에서 파일을 처리하기 때문에, 문서가 기기를 떠나지 않습니다. 민감한 파일을 외부 서버에 업로드해야 하는 부담이 없습니다.

사용법은 간단합니다. PDF 파일을 선택하거나 드래그해서 놓고, 원하는 순서로 배치한 다음 합치기 버튼을 누르면 됩니다. 대부분의 도구가 파일 순서 변경, 실수로 추가한 파일 제거, 합치기 전 페이지 미리보기를 지원합니다.

파일 수가 많거나 총 용량이 클 때는 브라우저 메모리 한계 때문에 데스크톱 소프트웨어보다 느릴 수 있습니다. 하지만 총 50MB 이하의 문서 몇 개를 합치는 일상적인 작업에는 충분합니다.

## 데스크톱 소프트웨어 사용하기

데스크톱 애플리케이션은 복잡한 합치기 작업에서 더 강력한 성능과 유연성을 제공합니다.

macOS에서는 미리보기(Preview)로 기본적인 합치기가 가능합니다. 첫 번째 PDF를 열고 썸네일 사이드바를 표시한 다음, 추가할 PDF 파일을 원하는 위치에 드래그하면 됩니다. 여러 파일에서 필요한 페이지만 골라서 조합하는 것도 이 방식으로 가능합니다.

Windows에서는 PDFsam Basic 같은 무료 도구가 전용 합치기 인터페이스를 제공합니다. 파일을 불러오고, 순서를 정하고, 합치면 됩니다.

크로스 플랫폼 도구로는 qpdf, pdftk, Ghostscript 같은 명령줄 도구가 자동화 워크플로에서 유용합니다.

## 명령줄로 합치기

기술 사용자나 자동화 시나리오에서는 명령줄 도구가 가장 효율적입니다.

qpdf를 사용하면 한 줄로 합칠 수 있습니다. 페이지 범위를 지정하는 것도 가능해서, 파일1의 1~5페이지와 파일2의 10~15페이지만 골라서 합치는 작업도 간단합니다.

pdftk도 비슷하게 간결합니다. 디렉토리의 모든 PDF를 한 번에 합치는 것도 와일드카드로 처리됩니다.

명령줄 도구는 정기적으로 파일을 합쳐야 하거나, 대량의 파일을 처리하거나, 합치기를 더 큰 자동화 파이프라인에 통합할 때 특히 유용합니다.

## 대용량 파일 처리

PDF 파일이 크거나 수가 많을 때는 몇 가지 전략이 도움이 됩니다.

불필요한 애플리케이션을 닫아 메모리를 확보하세요. PDF 합치기는 메모리를 많이 사용하며, 이미지가 많은 문서일수록 더 그렇습니다. 도구가 멈추거나 극도로 느려지면 메모리 부족이 원인인 경우가 대부분입니다.

한꺼번에 합치지 말고 배치(batch)로 나눠서 작업하세요. 200개 파일을 합쳐야 한다면, 20~30개씩 먼저 합친 다음 그 결과물을 다시 합치는 방식이 안정적입니다. 중간 단계마다 체크포인트가 생기는 셈이라 문제가 생겨도 처음부터 다시 할 필요가 없습니다.

합친 결과물의 용량도 확인하세요. 일부 도구는 합치면서 콘텐츠를 압축 해제했다가 다시 인코딩해서 원본 합계보다 파일이 커지는 경우가 있습니다. 이런 경우 다른 도구를 써보세요.

수천 페이지 규모의 대규모 문서에는 qpdf를 추천합니다. 데이터를 스트리밍 방식으로 처리해서 전체를 메모리에 올리지 않기 때문에 대용량에 강합니다.

## 북마크와 구조 유지

합치기에서 자주 간과되는 부분이 북마크 보존입니다. 원본 PDF에 북마크(목차)가 있다면 합친 결과에도 유지되어야 합니다.

모든 도구가 북마크를 잘 처리하는 것은 아닙니다. 어떤 도구는 북마크를 아예 무시하고, 어떤 도구는 유지하되 페이지 번호를 갱신하지 않아서 엉뚱한 페이지로 이동시킵니다. 좋은 도구는 모든 원본의 북마크를 유지하면서 합친 문서 내 실제 위치에 맞게 페이지 번호를 자동 조정합니다.

북마크가 중요한 작업이라면, 본격적으로 사용하기 전에 북마크가 있는 PDF로 테스트해 보세요.

## 더 나은 결과를 위한 팁

합치기 전에, 일관성이 중요하다면 모든 원본 PDF의 페이지 크기가 같은지 확인하세요. 레터 사이즈와 A4를 섞어서 합치면 유효한 PDF가 만들어지기는 하지만, 출력하거나 나란히 볼 때 어색할 수 있습니다.

파일 이름을 정렬 순서에 맞게 지으세요. 01-서론.pdf, 02-본론.pdf 식으로 번호를 붙이면 순서 실수를 방지할 수 있습니다.

합친 후에는 결과물을 꼭 검토하세요. 전체 문서를 훑어보면서 모든 페이지가 제대로 들어갔는지, 순서가 맞는지, 빠진 내용은 없는지 확인하세요.

합치기가 끝나도 원본 파일은 보관해 두세요. 나중에 한 섹션만 수정해야 할 때, 합친 파일에서 페이지를 추출하고 교체하는 것보다 원본을 수정한 뒤 다시 합치는 것이 훨씬 쉽습니다.`,
      },
    },
  },
  {
    slug: "convert-images-to-pdf",
    app: "pdf",
    category: "guide",
    publishedAt: "2026-03-02",
    content: {
      en: {
        title:
          "How to Convert Images to PDF: JPG, PNG, HEIC and More",
        description:
          "A practical guide to converting images to PDF documents — covering format support, quality settings, page sizing options, batch conversion, and common use cases.",
        body: `## Why Convert Images to PDF?

Converting images to PDF serves many practical purposes. You might need to compile photos of receipts into a single expense report, turn whiteboard snapshots into shareable meeting notes, convert a series of scanned pages into a readable document, or package architectural photos into a professional presentation.

PDF offers advantages that image formats lack. A PDF can contain multiple pages in sequence, supports text overlays and annotations, prints with consistent sizing across printers, and can be secured with passwords. Converting images to PDF gives you these capabilities while preserving the visual content.

## Supported Image Formats

Most image-to-PDF tools support the common image formats you encounter daily.

JPEG (JPG) is the most widely used format for photographs. It uses lossy compression, which means some quality is lost during encoding, but file sizes are compact. JPEG works well for photos, scans, and any image where small compression artifacts are acceptable.

PNG is a lossless format ideal for screenshots, diagrams, logos, and images with text. It preserves every pixel exactly, producing sharp edges and clean text. PNG files tend to be larger than JPEGs for photographic content.

HEIC (High Efficiency Image Container) is Apple's default photo format since iOS 11. It delivers similar quality to JPEG at roughly half the file size. Not all PDF tools support HEIC directly, so you may need to convert to JPEG or PNG first.

WebP is Google's modern image format, offering both lossy and lossless compression. It produces smaller files than JPEG or PNG in most cases. Support in PDF conversion tools is growing but not yet universal.

TIFF is a flexible format commonly used in scanning, printing, and publishing. It supports lossless compression and multiple pages within a single file, making it a natural fit for document workflows. Most professional PDF tools handle TIFF well.

BMP is an uncompressed format that produces very large files. It is rarely used intentionally today, but some legacy systems still produce BMPs. Converting BMP to PDF with compression dramatically reduces file size.

## Quality Settings

When converting images to PDF, quality settings determine the balance between visual fidelity and file size.

For photographs destined for printing, use the highest quality available or choose lossless embedding. This preserves the original image data without additional compression losses. The resulting PDF will be large but suitable for professional printing.

For screen viewing and general sharing, medium to high quality (75-90 percent on a 100-point scale) works well. At these levels, compression artifacts are invisible to most viewers, and file sizes remain reasonable.

For archival purposes where storage space is a concern, consider whether the images need to remain pixel-perfect. If approximate fidelity is acceptable, moderate compression significantly reduces storage requirements without meaningful visual loss.

One important detail: if your source images are already compressed JPEGs, re-compressing them during PDF conversion causes additional quality loss. The best approach for JPEGs is to embed them directly into the PDF without re-encoding, preserving their existing compression. Many tools offer this as a "passthrough" or "no recompression" option.

## Page Sizing and Layout

How images map to PDF pages is an important consideration that affects the final document's usability.

The simplest approach is one image per page, with the page size matching the image dimensions. This produces a document where each page is exactly the size of the image, which works well for photo galleries or scanned documents.

Alternatively, you can fit images to standard page sizes. Placing images on letter (8.5 x 11 inches) or A4 (210 x 297 mm) pages ensures consistent sizing and clean printing. Images can be scaled to fit within the page margins while maintaining their aspect ratio, or stretched to fill the page if edge-to-edge coverage is desired.

For multi-image layouts, some tools let you place several images on a single page in a grid arrangement. This is useful for contact sheets, photo indices, or compact documentation where maximizing information density matters more than showcasing individual images.

Orientation matters too. A landscape photo forced onto a portrait page wastes space and looks awkward. Smart tools detect image orientation and rotate the page accordingly, or let you specify orientation rules.

## Batch Conversion

When you have dozens or hundreds of images to convert, manual one-at-a-time processing is impractical. Batch conversion features handle this efficiently.

The simplest batch approach is selecting multiple images at once and producing a single multi-page PDF. Each image becomes one page, in the order the files were selected or sorted. This is the standard workflow for converting scanned document pages into a complete PDF.

More advanced batch processing produces separate PDFs from each image or group of images. This is useful when you need individual PDFs for each receipt, each photo, or each page of different documents.

File naming conventions become important with batch operations. Ensure your images are named so they sort in the correct order — use zero-padded numbers (001.jpg, 002.jpg) rather than unpadded ones (1.jpg, 2.jpg) to avoid sorting issues where 10.jpg appears before 2.jpg.

## Common Use Cases

Document scanning is the most frequent reason to convert images to PDF. Phone cameras have largely replaced flatbed scanners for personal use, and the process of photographing a document and converting to PDF is now routine. For best results, photograph in good lighting, keep the camera parallel to the document, and use a contrasting background.

Receipt management benefits enormously from image-to-PDF conversion. Photographing receipts immediately and converting them to organized PDFs ensures you have records when you need them for expense reports or tax preparation.

Photo portfolios and lookbooks use PDF as a presentation format that works across devices without requiring special software. Converting a curated set of images to a single PDF creates a professional, self-contained portfolio that can be emailed, printed, or displayed.

Archiving physical documents — old letters, certificates, manuals, historical records — through photography and PDF conversion creates searchable, shareable digital copies while preserving the originals.`,
      },
      ko: {
        title:
          "이미지를 PDF로 변환하는 방법 — JPG, PNG, HEIC 총정리",
        description:
          "다양한 이미지 형식을 PDF로 변환하는 실용 가이드. 지원 형식, 화질 설정, 페이지 크기 옵션, 대량 변환, 활용 사례까지 정리했습니다.",
        body: `## 이미지를 PDF로 변환하는 이유

이미지를 PDF로 바꿔야 할 상황은 의외로 많습니다. 영수증 사진들을 하나의 경비 보고서로 묶거나, 화이트보드 사진을 공유 가능한 회의록으로 만들거나, 스캔한 페이지들을 하나의 문서로 구성하거나, 건축 사진을 깔끔한 프레젠테이션으로 패키징해야 할 때가 있습니다.

PDF는 이미지 형식에 없는 장점을 제공합니다. 여러 페이지를 순서대로 담을 수 있고, 텍스트와 주석을 추가할 수 있고, 어떤 프린터에서든 일관된 크기로 출력되며, 비밀번호로 보호할 수도 있습니다.

## 지원 이미지 형식

대부분의 변환 도구는 일상에서 쓰는 이미지 형식을 폭넓게 지원합니다.

JPEG(JPG)는 사진에 가장 많이 쓰이는 형식입니다. 손실 압축이라 인코딩 과정에서 약간의 품질 저하가 있지만, 파일 크기가 작습니다.

PNG는 무손실 형식으로, 스크린샷, 도표, 로고, 텍스트가 포함된 이미지에 적합합니다. 모든 픽셀을 정확하게 보존하므로 선명한 경계와 깨끗한 텍스트를 유지합니다.

HEIC는 iOS 11 이후 애플의 기본 사진 형식입니다. JPEG과 비슷한 품질을 약 절반의 파일 크기로 제공합니다. 아직 모든 PDF 도구가 HEIC를 직접 지원하지는 않아서, JPEG이나 PNG로 먼저 변환해야 할 수 있습니다.

WebP는 구글의 현대적 이미지 형식으로, 대부분의 경우 JPEG이나 PNG보다 작은 파일을 만들어냅니다. PDF 변환 도구의 지원은 늘어나는 추세입니다.

TIFF는 스캔, 인쇄, 출판 분야에서 널리 쓰이는 유연한 형식입니다. 무손실 압축과 단일 파일 내 다중 페이지를 지원해서 문서 작업에 잘 맞습니다.

## 화질 설정

이미지를 PDF로 변환할 때 화질 설정은 시각적 품질과 파일 크기 사이의 균형을 결정합니다.

인쇄용 사진이라면 최고 화질이나 무손실 옵션을 선택하세요. 원본 이미지 데이터를 추가 압축 없이 보존합니다. 파일은 크지만 전문 인쇄에 적합합니다.

화면 열람과 일반 공유 목적이라면 100점 기준 75~90 정도의 중상 화질이면 충분합니다. 대부분의 사람이 압축 흔적을 인지하지 못하면서도 파일 크기는 적정 수준을 유지합니다.

한 가지 중요한 점 — 원본이 이미 JPEG 압축된 이미지라면, PDF 변환 시 다시 압축하면 품질이 이중으로 떨어집니다. JPEG 파일은 재인코딩 없이 PDF에 직접 삽입하는 것이 가장 좋습니다. 많은 도구에서 "패스스루" 또는 "재압축 없음" 옵션으로 제공합니다.

## 페이지 크기와 레이아웃

이미지가 PDF 페이지에 어떻게 배치되는지는 최종 문서의 활용도에 큰 영향을 미칩니다.

가장 간단한 방식은 이미지 한 장당 페이지 하나, 페이지 크기는 이미지 크기에 맞추는 것입니다. 사진 갤러리나 스캔 문서에 적합합니다.

레터(8.5x11인치)나 A4(210x297mm) 같은 표준 용지에 맞추는 방식도 있습니다. 이미지를 여백 안에 비율을 유지하며 배치하면 일관된 크기와 깔끔한 출력이 가능합니다.

여러 이미지를 한 페이지에 격자 형태로 배치하는 다중 이미지 레이아웃도 있습니다. 컨택트 시트나 사진 인덱스, 밀도 높은 문서 작업에 유용합니다.

가로 방향 사진을 세로 페이지에 강제로 넣으면 공간이 낭비되고 어색합니다. 잘 만든 도구는 이미지 방향을 감지해서 페이지를 자동으로 회전시키거나, 방향 규칙을 직접 지정할 수 있게 합니다.

## 대량 변환

수십, 수백 장의 이미지를 변환해야 할 때 하나씩 처리하는 것은 비현실적입니다. 대량(배치) 변환 기능이 필요합니다.

가장 기본적인 배치 방식은 여러 이미지를 한 번에 선택해서 하나의 다중 페이지 PDF로 만드는 것입니다. 각 이미지가 한 페이지가 되며, 파일 선택 또는 정렬 순서대로 배치됩니다.

고급 배치 처리는 각 이미지 또는 이미지 그룹별로 별도의 PDF를 생성합니다. 영수증마다, 사진마다, 문서마다 개별 PDF가 필요할 때 유용합니다.

파일 이름 규칙도 중요합니다. 정렬 순서를 보장하려면 001.jpg, 002.jpg처럼 앞에 0을 채운 번호를 사용하세요. 1.jpg, 2.jpg로 하면 10.jpg가 2.jpg보다 앞에 오는 정렬 문제가 생깁니다.

## 활용 사례

문서 스캔이 이미지-PDF 변환을 하는 가장 흔한 이유입니다. 스마트폰 카메라가 개인용 평판 스캐너를 거의 대체했고, 문서를 촬영해서 PDF로 만드는 과정은 이제 일상이 되었습니다. 좋은 결과를 얻으려면 조명이 밝은 곳에서, 카메라를 문서와 평행하게, 대비가 되는 배경 위에서 촬영하세요.

영수증 관리에도 이미지-PDF 변환이 매우 유용합니다. 영수증을 받자마자 촬영하고 정리된 PDF로 만들어 두면, 경비 보고나 세금 신고 때 필요한 기록이 확실히 남습니다.

사진 포트폴리오를 PDF로 만들면 별도 소프트웨어 없이 어떤 기기에서든 볼 수 있는 전문적인 작품집이 됩니다. 이메일로 보내거나, 출력하거나, 화면에 띄울 수 있습니다.

오래된 편지, 증명서, 매뉴얼, 역사 자료 같은 물리적 문서를 촬영하고 PDF로 변환하면, 원본을 보존하면서 검색 가능하고 공유 가능한 디지털 사본을 만들 수 있습니다.`,
      },
    },
  },
  {
    slug: "protect-pdf-security",
    app: "pdf",
    category: "knowledge",
    publishedAt: "2026-03-05",
    content: {
      en: {
        title:
          "PDF Security: How to Password Protect and Encrypt Your Documents",
        description:
          "A thorough guide to PDF security features — encryption types, password protection, permission controls, and the real-world limitations you should understand.",
        body: `## Why PDF Security Matters

PDFs often contain sensitive information — financial statements, legal contracts, medical records, confidential business plans, personal identification documents. When sharing these files electronically, you need confidence that only authorized people can access them and that the content cannot be tampered with.

PDF security has evolved significantly since the format's introduction. Modern PDFs can use strong encryption that, when properly implemented, makes unauthorized access computationally infeasible. However, PDF security also has important limitations that every user should understand.

## Encryption Types

PDF encryption determines how the file's content is scrambled to prevent unauthorized reading. The encryption algorithm and key length define the security strength.

### RC4 Encryption (Legacy)

Early PDFs used RC4 encryption with 40-bit keys (PDF 1.1 through 1.3) and later 128-bit keys (PDF 1.4 and 1.5). RC4 with 40-bit keys is considered completely insecure today — modern computers can break it in minutes. RC4 with 128-bit keys is stronger but has known theoretical weaknesses. Neither option is recommended for sensitive documents.

### AES-128 (Moderate Security)

Introduced in PDF 1.6, AES-128 provides substantially better security than RC4. AES (Advanced Encryption Standard) is a well-studied encryption algorithm used across the security industry. While 128-bit AES is currently considered safe against brute-force attacks, the trend toward longer keys makes AES-256 the preferred choice for forward-looking security.

### AES-256 (Recommended)

PDF 2.0 introduced AES-256 encryption, which is the current best practice. AES-256 is used by governments and militaries worldwide for classified information. With current technology, brute-forcing a 256-bit AES key would require more energy than exists in the observable universe. If your PDF tool offers AES-256, use it.

## Owner Password vs User Password

PDF supports two distinct types of passwords, and understanding the difference is essential.

The user password (also called the document open password) prevents anyone without the password from opening the file at all. Without the correct user password, the PDF's content remains encrypted and unreadable. This is the stronger form of protection and the one you should use when confidentiality matters.

The owner password (also called the permissions password) controls what users can do with the document after opening it. It can restrict printing, copying text, editing, and extracting pages. However — and this is critical — the owner password does not encrypt the document's content with a separate key. It relies on the PDF reader honoring the permission flags.

If a PDF has only an owner password but no user password, the document can be opened by anyone. The content is technically accessible; only the permission restrictions rely on software cooperation. Many third-party tools simply ignore owner password restrictions, making this a weak form of protection.

## Permission Controls

PDF permission flags let you restrict specific operations. Available permissions include printing (standard or high-quality), copying text to the clipboard, editing the document, adding annotations or comments, filling form fields, extracting pages, and assembling (inserting, rotating, or deleting pages).

These permissions are enforced at the software level, not the encryption level. Adobe Acrobat and most commercial readers respect them. However, open-source tools and command-line utilities can remove or ignore permission restrictions on PDFs that lack a user password.

For meaningful protection, always set both a user password and an owner password. The user password ensures the content is encrypted, while the owner password controls permissions for legitimate users who know the open password.

## Digital Signatures

Beyond passwords, PDF supports digital signatures that verify document authenticity and integrity. A digital signature confirms two things: the identity of the person who signed (authentication) and that the document has not been modified since signing (integrity).

Digital signatures use public-key cryptography. The signer uses their private key to create the signature, and anyone can verify it using the signer's public key, typically distributed through a certificate chain anchored by a trusted certificate authority.

Signed PDFs display a visible indicator — usually a stamp or badge — showing the signature status. If the document has been altered after signing, the signature becomes invalid, alerting the reader to potential tampering.

Digital signatures do not prevent someone from viewing or copying the document. They provide proof of origin and integrity, not access control. For confidentiality, combine digital signatures with password-based encryption.

## Practical Limitations

PDF security, while robust when properly applied, has important limitations to keep in mind.

Password strength is the weakest link. AES-256 encryption is useless if the password is "password123." Use strong, unique passwords — at least 12 characters combining letters, numbers, and symbols.

Once a PDF is decrypted and opened, the user can always take screenshots, photograph their screen, or manually transcribe the content. No software restriction can prevent these offline methods.

Permission-only protection (owner password without user password) is trivially bypassed by many free tools. Do not rely on it for genuine security.

PDF redaction requires special care. Simply drawing a black box over sensitive text does not remove the underlying data. True redaction tools permanently delete the text beneath the redacted area. Failing to use proper redaction has led to many high-profile information leaks.

## Best Practices

Use AES-256 encryption with a strong user password for confidential documents. Set an owner password with appropriate permission restrictions as an additional layer. Use digital signatures when document authenticity must be verifiable. Apply proper redaction tools when removing sensitive information. And remember that PDF security protects the file in transit and at rest — once the recipient has the password and opens the file, you are relying on trust, not technology, to control what they do with the content.`,
      },
      ko: {
        title:
          "PDF 보안 가이드 — 비밀번호 보호와 암호화의 모든 것",
        description:
          "PDF 암호화 종류, 비밀번호 보호, 권한 제어, 그리고 반드시 알아야 할 현실적 한계까지 — PDF 보안에 대한 종합 가이드입니다.",
        body: `## PDF 보안이 중요한 이유

PDF에는 민감한 정보가 담기는 경우가 많습니다. 재무제표, 법률 계약서, 의료 기록, 기밀 사업 계획, 개인 신분 서류 등이 대표적입니다. 이런 파일을 전자적으로 공유할 때는 허가된 사람만 접근할 수 있고, 내용이 위변조되지 않는다는 확신이 필요합니다.

PDF 보안은 형식이 처음 만들어진 이후로 크게 발전했습니다. 현대 PDF는 올바르게 적용되면 무단 접근을 사실상 불가능하게 만드는 강력한 암호화를 사용할 수 있습니다. 하지만 동시에 모든 사용자가 이해해야 할 중요한 한계도 있습니다.

## 암호화 종류

PDF 암호화는 파일 내용을 뒤섞어 무단 열람을 방지합니다. 암호화 알고리즘과 키 길이가 보안 강도를 결정합니다.

### RC4 암호화 (구형)

초기 PDF는 40비트 키의 RC4 암호화를 사용했고, 이후 128비트로 확장되었습니다. 40비트 RC4는 오늘날 완전히 안전하지 않은 것으로 간주됩니다. 현대 컴퓨터로 수 분 안에 해독할 수 있습니다. 128비트 RC4도 이론적 취약점이 알려져 있어 민감한 문서에는 권장하지 않습니다.

### AES-128 (보통 수준)

PDF 1.6에서 도입된 AES-128은 RC4보다 훨씬 강한 보안을 제공합니다. AES(고급 암호화 표준)는 보안 업계 전반에서 사용하는 검증된 알고리즘입니다. 현재 무차별 대입 공격에는 안전하지만, 더 긴 키를 향한 추세를 고려하면 AES-256이 더 나은 선택입니다.

### AES-256 (권장)

PDF 2.0에서 도입된 AES-256은 현재 모범 사례입니다. 전 세계 정부와 군대에서 기밀 정보 보호에 사용합니다. 현재 기술로 256비트 AES 키를 무차별 대입하려면 관측 가능한 우주에 존재하는 에너지보다 많은 양이 필요합니다. PDF 도구에서 AES-256을 지원한다면 반드시 이것을 사용하세요.

## 소유자 비밀번호와 사용자 비밀번호

PDF는 두 종류의 비밀번호를 지원하며, 그 차이를 이해하는 것이 핵심입니다.

사용자 비밀번호(문서 열기 비밀번호)는 비밀번호 없이는 파일을 아예 열 수 없게 합니다. 올바른 비밀번호 없이는 PDF 내용이 암호화된 상태로 남아 읽을 수 없습니다. 기밀성이 중요할 때 사용해야 하는 보호 방식입니다.

소유자 비밀번호(권한 비밀번호)는 문서를 연 후에 할 수 있는 작업을 제한합니다. 인쇄, 텍스트 복사, 편집, 페이지 추출 등을 제한할 수 있습니다. 하지만 중요한 점이 있습니다 — 소유자 비밀번호는 문서 내용을 별도의 키로 암호화하지 않습니다. PDF 리더가 권한 플래그를 준수하느냐에 의존합니다.

소유자 비밀번호만 있고 사용자 비밀번호가 없는 PDF는 누구나 열 수 있습니다. 내용 자체는 접근 가능한 상태이며, 권한 제한은 소프트웨어의 협조에 기대는 것입니다. 많은 서드파티 도구가 소유자 비밀번호 제한을 그냥 무시하므로, 약한 보호 방식입니다.

## 권한 제어

PDF 권한 플래그로 특정 작업을 제한할 수 있습니다. 인쇄, 텍스트 복사, 편집, 주석 추가, 양식 작성, 페이지 추출, 조립(삽입, 회전, 삭제) 등을 개별적으로 제어합니다.

이 권한은 암호화 수준이 아니라 소프트웨어 수준에서 적용됩니다. 어도비 아크로뱃과 대부분의 상용 리더는 이를 준수합니다. 하지만 오픈소스 도구나 명령줄 유틸리티는 사용자 비밀번호가 없는 PDF의 권한 제한을 제거하거나 무시할 수 있습니다.

실질적인 보호를 위해서는 사용자 비밀번호와 소유자 비밀번호를 모두 설정하세요. 사용자 비밀번호가 내용을 암호화하고, 소유자 비밀번호가 열기 비밀번호를 아는 정당한 사용자의 권한을 제어합니다.

## 전자 서명

비밀번호 외에 PDF는 문서의 진위성과 무결성을 검증하는 전자 서명을 지원합니다. 전자 서명은 두 가지를 확인합니다. 서명한 사람의 신원(인증)과 서명 이후 문서가 수정되지 않았다는 사실(무결성)입니다.

전자 서명은 공개키 암호화를 사용합니다. 서명자는 개인키로 서명을 만들고, 누구나 서명자의 공개키(신뢰할 수 있는 인증 기관이 발행한 인증서 체인을 통해 배포)로 검증할 수 있습니다.

서명된 PDF를 서명 이후에 수정하면 서명이 무효화되어, 위변조 가능성을 알려줍니다.

전자 서명은 열람이나 복사를 막지는 않습니다. 출처 증명과 무결성 검증을 제공할 뿐, 접근 제어는 아닙니다. 기밀성이 필요하면 전자 서명과 비밀번호 기반 암호화를 함께 사용하세요.

## 현실적 한계

PDF 보안은 올바르게 적용하면 강력하지만, 반드시 알아야 할 한계가 있습니다.

비밀번호 강도가 가장 약한 고리입니다. AES-256 암호화도 비밀번호가 "password123"이면 소용없습니다. 최소 12자 이상, 문자/숫자/기호를 조합한 강력하고 고유한 비밀번호를 사용하세요.

PDF가 복호화되어 열리고 나면, 사용자는 언제든 스크린샷을 찍거나, 화면을 촬영하거나, 내용을 수동으로 옮겨 적을 수 있습니다. 어떤 소프트웨어 제한도 이런 오프라인 방법을 막을 수는 없습니다.

교정(redaction) 작업에는 특별한 주의가 필요합니다. 민감한 텍스트 위에 검은 상자를 그리기만 하면 그 아래 데이터는 그대로 남아 있습니다. 올바른 교정 도구는 가려진 영역의 텍스트를 영구적으로 삭제합니다. 제대로 된 교정을 하지 않아 정보가 유출된 유명 사례가 적지 않습니다.

## 권장 사항

기밀 문서에는 강력한 사용자 비밀번호와 함께 AES-256 암호화를 사용하세요. 추가 보호 계층으로 적절한 권한 제한이 설정된 소유자 비밀번호를 함께 설정하세요. 문서 진위를 검증해야 할 때는 전자 서명을, 민감 정보를 제거할 때는 올바른 교정 도구를 사용하세요. 그리고 PDF 보안은 전송 중과 보관 중의 파일을 보호한다는 점을 기억하세요. 수신자가 비밀번호를 받고 파일을 열고 나면, 그 이후의 행동은 기술이 아니라 신뢰에 의존하는 영역입니다.`,
      },
    },
  },
  {
    slug: "edit-pdf-without-adobe",
    app: "pdf",
    category: "guide",
    publishedAt: "2026-03-08",
    content: {
      en: {
        title: "How to Edit PDF Files Without Adobe Acrobat",
        description:
          "Discover free and affordable alternatives to Adobe Acrobat for editing PDFs — from browser-based tools to desktop applications, and understand what you can and cannot change.",
        body: `## The Adobe Acrobat Dilemma

Adobe Acrobat Pro is the gold standard for PDF editing, but its subscription price puts it out of reach for many users. At around $20 per month, it is hard to justify for occasional use. The good news is that the PDF editing landscape has matured significantly, and capable alternatives exist for every budget — including free options that handle most common editing tasks.

Understanding what kind of editing you need helps you choose the right tool. PDF editing spans a wide range of operations, from simple annotations to complex layout changes, and different tools excel at different tasks.

## Browser-Based PDF Editors

Browser-based tools have transformed PDF editing by eliminating the need to install software. Modern web applications can handle sophisticated editing tasks directly in your browser.

The best browser-based editors process files locally using JavaScript and WebAssembly, meaning your documents never leave your device. This is important for privacy and security — you should avoid tools that require uploading your files to remote servers, especially for sensitive documents.

Browser-based tools typically excel at adding text overlays, inserting images, drawing shapes and lines, adding signatures, filling forms, and annotating with highlights or comments. They work on any operating system with a modern browser, making them the most accessible option.

The main limitation is editing existing text within the PDF. Because PDFs store text as precisely positioned characters rather than flowing paragraphs, changing existing text often requires removing the old text and adding new text on top. This works for small corrections but becomes impractical for extensive rewrites.

## Desktop Applications

Several free and open-source desktop applications offer PDF editing capabilities.

LibreOffice Draw can open and edit PDF files, converting them to an editable format internally. This works well for simple PDFs with basic layouts but may struggle with complex formatting, embedded fonts, or advanced features. It is best suited for PDFs that originated from word processor documents.

Inkscape, the open-source vector graphics editor, can import PDF pages and edit them as vector graphics. This is powerful for editing diagrams, logos, and graphical elements within a PDF. However, it handles one page at a time and treats text as individual positioned objects rather than flowing paragraphs.

On macOS, Preview provides surprisingly capable basic editing. You can add text, shapes, signatures, and annotations. You can also reorder, rotate, and delete pages. Preview cannot edit existing text, but for annotation-style editing, it is hard to beat for convenience.

On Windows, the built-in Microsoft Edge browser includes PDF annotation tools. For more advanced editing, free software like PDF-XChange Editor provides text editing, commenting, and form-filling capabilities.

## What You Can Edit

PDF editing capabilities fall into several categories depending on the tool.

### Annotations and Markups

Nearly every PDF tool supports annotations. You can add highlights, underlines, strikethroughs, sticky notes, text comments, and drawing markups. These are stored as separate layers on top of the original content, making them easy to add and remove without altering the underlying document.

### Text Additions

Adding new text to a PDF is straightforward. You create a text box at the desired position and type your content. The new text sits on top of the existing page content. This is how most free tools handle "text editing" — they are actually adding new text rather than modifying existing text.

### Image Operations

Most editors let you insert images into a PDF, position and resize them, and sometimes replace existing images. Adding a company logo to a document header, inserting a photo into a report, or placing a signature image on a form are all common operations.

### Page Management

Reordering, rotating, deleting, and inserting pages are basic operations that most PDF tools support. You can also extract specific pages into a new PDF or replace pages from another document.

### Form Filling

Interactive PDF forms with text fields, checkboxes, dropdowns, and radio buttons can be filled using almost any PDF reader. Some editing tools also let you create new form fields or modify existing ones.

## What Is Difficult to Edit

Editing existing text in a PDF is fundamentally challenging because of how PDFs store text. Unlike a word processor document where text flows and reflows automatically, PDF text is positioned character by character at precise coordinates. Changing a word might cause it to overlap with adjacent text because the surrounding layout does not adjust automatically.

Professional PDF editors (including Adobe Acrobat) attempt to handle this by analyzing the text layout and reflowing nearby content, but the results are not always perfect. For extensive text changes, it is often better to go back to the original source document (Word, InDesign, etc.), make your changes there, and re-export to PDF.

Changing fonts in an existing PDF is another difficult task. The original font may be embedded as a subset containing only the characters used in the document. Editing text might require characters that are not included in the subset, leading to missing characters or font substitution.

## Choosing the Right Approach

For annotations, comments, and signatures, use your operating system's built-in tools or a browser-based editor. These tasks do not require expensive software.

For adding new text, images, or form fields, browser-based editors or free desktop tools work well. They offer enough functionality for most use cases without any cost.

For editing existing text, you need either a professional PDF editor or access to the original source document. If the changes are minor (fixing a typo, updating a date), a capable free editor might suffice. For major revisions, going back to the source is almost always the better path.

For complex documents with intricate layouts, embedded fonts, and interactive elements, professional tools provide the most reliable results. Consider whether the cost is justified by the frequency and importance of your editing needs.`,
      },
      ko: {
        title: "Adobe 없이 PDF 편집하는 방법",
        description:
          "Adobe Acrobat 없이 PDF를 편집할 수 있는 무료 및 저렴한 대안 도구를 소개합니다. 브라우저 기반 도구부터 데스크톱 애플리케이션까지, 무엇을 편집할 수 있고 없는지 정리했습니다.",
        body: `## Adobe Acrobat이 부담스러울 때

Adobe Acrobat Pro는 PDF 편집의 표준이지만, 월 2만 원 이상의 구독료는 가끔 쓰는 사용자에게 부담입니다. 하지만 PDF 편집 도구의 생태계가 성숙해지면서, 무료 옵션을 포함해 대부분의 편집 작업을 충분히 처리할 수 있는 대안이 많아졌습니다.

어떤 종류의 편집이 필요한지 먼저 파악하면 도구 선택이 쉬워집니다. PDF 편집은 간단한 주석부터 복잡한 레이아웃 변경까지 범위가 넓고, 도구마다 잘하는 영역이 다릅니다.

## 브라우저 기반 PDF 편집기

브라우저 기반 도구는 소프트웨어 설치 없이 PDF를 편집할 수 있게 해줍니다. 최신 웹 애플리케이션은 꽤 정교한 편집 작업도 브라우저 안에서 처리합니다.

좋은 브라우저 기반 편집기는 JavaScript와 WebAssembly를 활용해 파일을 로컬에서 처리합니다. 문서가 기기를 떠나지 않기 때문에 개인정보 보호 측면에서 안심할 수 있습니다. 파일을 원격 서버에 업로드해야 하는 도구는 민감한 문서를 다룰 때 피하는 것이 좋습니다.

브라우저 기반 도구의 강점은 텍스트 추가, 이미지 삽입, 도형 그리기, 서명 추가, 양식 작성, 하이라이트나 댓글로 주석 달기 등입니다. 최신 브라우저만 있으면 운영체제와 무관하게 사용할 수 있어 접근성이 가장 높습니다.

주요 한계는 PDF 내 기존 텍스트 편집입니다. PDF는 텍스트를 자연스럽게 흐르는 단락이 아니라 정확한 좌표에 배치된 개별 문자로 저장합니다. 기존 텍스트를 바꾸려면 원래 텍스트를 지우고 그 위에 새 텍스트를 올려야 하는데, 소소한 수정에는 되지만 대폭 수정에는 비현실적입니다.

## 데스크톱 애플리케이션

무료 데스크톱 프로그램 중에서도 PDF 편집이 가능한 것들이 있습니다.

LibreOffice Draw는 PDF 파일을 열어 편집 가능한 형식으로 변환합니다. 단순한 레이아웃의 PDF에는 잘 작동하지만, 복잡한 서식이나 내장 글꼴이 많은 문서에서는 한계가 있습니다.

Inkscape는 오픈소스 벡터 그래픽 편집기로, PDF 페이지를 벡터 그래픽으로 가져와 편집할 수 있습니다. 도표, 로고, 그래픽 요소 편집에 강력하지만, 한 번에 한 페이지만 처리합니다.

macOS의 미리보기(Preview)는 생각보다 기본 편집 기능이 충실합니다. 텍스트, 도형, 서명, 주석을 추가할 수 있고, 페이지 순서 변경, 회전, 삭제도 가능합니다. 기존 텍스트 편집은 안 되지만, 주석 수준의 편집에는 편의성 면에서 이길 도구가 없습니다.

Windows에서는 Microsoft Edge 브라우저에 PDF 주석 도구가 내장되어 있고, PDF-XChange Editor 같은 무료 소프트웨어로 텍스트 편집, 댓글, 양식 작성이 가능합니다.

## 편집할 수 있는 것

### 주석과 마크업

거의 모든 PDF 도구가 주석을 지원합니다. 하이라이트, 밑줄, 취소선, 메모, 텍스트 댓글, 그리기 마크업을 추가할 수 있습니다. 원본 콘텐츠 위에 별도 레이어로 저장되므로, 원본을 건드리지 않고 자유롭게 추가하고 제거할 수 있습니다.

### 텍스트 추가

새로운 텍스트를 PDF에 추가하는 것은 간단합니다. 원하는 위치에 텍스트 상자를 만들고 내용을 입력하면 됩니다. 기존 페이지 콘텐츠 위에 올라가는 방식입니다. 대부분의 무료 도구에서 "텍스트 편집"이라고 부르는 기능은 사실 기존 텍스트를 수정하는 것이 아니라 새 텍스트를 추가하는 것입니다.

### 이미지 작업

대부분의 편집기에서 이미지를 PDF에 삽입하고, 위치와 크기를 조정할 수 있습니다. 문서 헤더에 회사 로고 넣기, 보고서에 사진 삽입하기, 양식에 서명 이미지 배치하기 등이 흔한 작업입니다.

### 페이지 관리

페이지 순서 변경, 회전, 삭제, 삽입은 대부분의 PDF 도구가 지원하는 기본 기능입니다. 특정 페이지만 뽑아서 새 PDF로 만들거나, 다른 문서의 페이지로 교체하는 것도 가능합니다.

### 양식 작성

텍스트 필드, 체크박스, 드롭다운, 라디오 버튼이 있는 대화형 PDF 양식은 거의 모든 PDF 리더로 작성할 수 있습니다.

## 편집이 어려운 것

PDF 내 기존 텍스트를 편집하는 것은 PDF의 텍스트 저장 방식 때문에 근본적으로 어렵습니다. 워드프로세서와 달리 PDF 텍스트는 정확한 좌표에 문자 단위로 배치됩니다. 단어 하나를 바꾸면 주변 텍스트와 겹칠 수 있고, 주변 레이아웃이 자동으로 조정되지 않기 때문입니다.

전문 PDF 편집기(Adobe Acrobat 포함)는 텍스트 레이아웃을 분석해 주변 내용을 리플로우하려 시도하지만, 결과가 항상 완벽하지는 않습니다. 대폭적인 텍스트 변경이 필요하다면, 원본 소스 문서(Word, InDesign 등)로 돌아가서 수정한 뒤 PDF로 다시 내보내는 것이 훨씬 낫습니다.

기존 PDF의 글꼴을 바꾸는 것도 까다롭습니다. 원본 글꼴이 서브세팅되어 문서에 사용된 글자만 포함되어 있을 수 있습니다. 텍스트를 편집하면 서브셋에 없는 글자가 필요해져서 글자가 빠지거나 글꼴이 대체될 수 있습니다.

## 상황에 맞는 접근법 선택

주석, 댓글, 서명이 목적이라면 운영체제 내장 도구나 브라우저 기반 편집기로 충분합니다. 비용이 들지 않습니다.

새 텍스트, 이미지, 양식 필드를 추가하려면 브라우저 기반 편집기나 무료 데스크톱 도구가 대부분의 경우 잘 작동합니다.

기존 텍스트를 편집하려면 전문 PDF 편집기가 필요하거나, 원본 소스 문서에 접근해야 합니다. 오타 수정이나 날짜 변경 같은 사소한 수정은 무료 편집기로 가능하지만, 대폭 수정은 원본으로 돌아가는 것이 거의 항상 올바른 방법입니다.`,
      },
    },
  },
  {
    slug: "scan-documents-to-pdf",
    app: "pdf",
    category: "tips",
    publishedAt: "2026-03-11",
    content: {
      en: {
        title: "Scanning Documents to PDF: Tips for Best Quality",
        description:
          "Practical tips for scanning physical documents to PDF with optimal quality — covering DPI settings, color modes, auto-enhancement, file organization, and mobile scanning techniques.",
        body: `## Getting the Best Scan Quality

Scanning documents to PDF is a daily task for millions of people, yet many end up with results that are blurry, skewed, or unnecessarily large. The difference between a mediocre scan and a crisp, professional one often comes down to a few settings and techniques that are easy to apply once you know them.

Whether you are using a flatbed scanner, a sheet-fed document scanner, or your smartphone camera, these tips will help you produce better results consistently.

## DPI Settings: Finding the Sweet Spot

DPI (dots per inch) determines the resolution of your scan. Higher DPI captures more detail but produces larger files. Choosing the right DPI depends on what you plan to do with the scan.

For standard text documents like letters, invoices, and forms, 300 DPI is the standard recommendation. It provides clean, readable text with reasonable file sizes. You can zoom in without seeing obvious pixelation, and the quality is sufficient for most printing needs.

For documents where you need to run OCR (optical character recognition) to make the text searchable, 300 DPI is the minimum. Some OCR engines perform better at 400 DPI, especially with small font sizes or degraded originals.

For photographs, artwork, or documents with fine detail, 600 DPI captures the detail needed for faithful reproduction. Going above 600 DPI rarely provides noticeable improvement for standard documents and dramatically increases file size.

For simple archival purposes where you just need a readable reference copy, 200 DPI works and keeps file sizes small. This is a good choice for receipts, notes, and informal documents where maximum quality is not critical.

A common mistake is scanning everything at the highest DPI available. A 1200 DPI scan of a standard letter produces a massive file without any practical quality benefit over 300 DPI. Match the DPI to your actual needs.

## Color Mode: Color, Grayscale, or Black and White

Choosing the right color mode significantly affects both quality and file size.

Color scanning captures the full spectrum and should be used when color matters — photographs, colored charts and diagrams, forms with color-coded sections, or documents with colored text. Color scans produce the largest files.

Grayscale removes color information but preserves shading and tonal variation. It works well for documents with photographs, pencil drawings, or varying shades of text. Grayscale files are typically one-third the size of color scans at the same DPI.

Black and white (also called bitonal or 1-bit) converts everything to pure black or pure white with no shades in between. This produces the smallest files and works well for clean text documents and line drawings. However, it can destroy information in photographs and may produce jagged edges on text if the threshold between black and white is not set correctly.

For most text documents, grayscale provides the best balance. It handles variations in paper color and print density gracefully, avoids the harshness of pure black and white, and keeps file sizes manageable.

## Auto-Enhancement Features

Modern scanners and scanning apps offer enhancement features that can dramatically improve results.

Automatic deskewing detects and corrects page tilt. Even a slight rotation makes a document look unprofessional and can interfere with OCR accuracy. Most scanning software includes deskew, and it is worth enabling for every scan.

Automatic cropping detects page boundaries and removes the surrounding area (scanner cover, table surface, etc.). This produces cleaner results and reduces file size by eliminating unnecessary pixels.

Background removal or whitening evens out the background color of the scan. Paper is rarely pure white — it may be aged, off-white, or unevenly lit. Background cleaning produces a cleaner look and can reduce file size by making the background more compressible.

Contrast and brightness adjustment can rescue scans of faded documents or documents printed on colored paper. Auto-adjustment features work well in most cases, but manual control is valuable when the automatic result is not satisfactory.

Sharpening enhances text edges and fine details. A light application of sharpening makes text crisper without introducing visible artifacts. Over-sharpening creates halos around text and should be avoided.

## Mobile Scanning Tips

Smartphone cameras have become remarkably capable document scanners, especially with dedicated scanning apps that apply real-time processing.

Lighting is the most critical factor. Scan near a window or under bright, even lighting. Avoid harsh shadows from overhead lights, which create dark bands across the document. If you cannot avoid shadows, try repositioning the light source or the document.

Keep the camera parallel to the document. Shooting at an angle introduces perspective distortion that even automatic correction cannot fully resolve. Hold your phone directly above the document, looking straight down.

Use a contrasting background. Place white documents on a dark surface and dark documents on a light surface. This helps the scanning app detect page boundaries accurately.

Hold the phone steady or use a support. Camera shake produces blurry scans. If your phone has a burst mode or auto-capture feature in the scanning app, let the app choose the sharpest frame.

Use a dedicated scanning app rather than the regular camera. Apps designed for document scanning apply perspective correction, auto-cropping, enhancement, and direct PDF export in a streamlined workflow.

## File Organization and Naming

Good scanning habits extend beyond the scan itself to how you organize the results.

Establish a consistent naming convention. Include the date, document type, and any relevant identifier: 2026-03-11-invoice-acme-corp.pdf is far more useful than scan001.pdf six months later.

Create a logical folder structure. Organize by year, by category, or by project — whatever matches how you search for documents later. The best organization system is one you will actually maintain.

Add metadata when possible. Some scanning software lets you set the document title, author, and keywords. This metadata makes files searchable through your operating system's search function without opening each file.

For multi-page documents, scan all pages into a single PDF rather than creating separate files for each page. This keeps the document cohesive and is easier to share and archive.

Back up your scans. Digital files can be lost to hardware failure, accidental deletion, or software problems. Keep copies in at least two locations — for example, your computer and a cloud storage service.`,
      },
      ko: {
        title: "문서를 PDF로 스캔할 때 화질을 높이는 팁",
        description:
          "종이 문서를 PDF로 스캔할 때 최적의 화질을 얻는 실용적인 팁 — DPI 설정, 색상 모드, 자동 보정, 파일 정리, 모바일 스캔 기법을 다룹니다.",
        body: `## 좋은 스캔 화질 얻기

문서를 PDF로 스캔하는 일은 일상적이지만, 결과물이 흐리거나 기울어지거나 쓸데없이 큰 경우가 많습니다. 평범한 스캔과 선명하고 전문적인 스캔의 차이는 몇 가지 설정과 기법에 달려 있습니다. 한 번 알면 적용하기 어렵지 않습니다.

평판 스캐너를 쓰든, 급지식 문서 스캐너를 쓰든, 스마트폰 카메라를 쓰든 아래 팁들이 일관된 결과를 내는 데 도움이 됩니다.

## DPI 설정: 적정값 찾기

DPI(인치당 도트 수)는 스캔 해상도를 결정합니다. DPI가 높으면 더 많은 세부 사항을 포착하지만 파일이 커집니다. 적절한 DPI는 스캔 결과를 어떻게 쓸 것인지에 따라 달라집니다.

편지, 영수증, 서식 같은 일반 텍스트 문서에는 300DPI가 표준입니다. 깨끗하고 읽기 쉬운 텍스트를 적절한 파일 크기로 제공합니다. 확대해도 눈에 띄는 픽셀화가 없고, 대부분의 인쇄에 충분한 품질입니다.

OCR(광학 문자 인식)로 텍스트를 검색 가능하게 만들려면 300DPI가 최소입니다. 글자 크기가 작거나 원본 상태가 안 좋으면 400DPI에서 OCR 정확도가 올라가는 경우도 있습니다.

사진, 미술 작품, 세밀한 디테일이 있는 문서에는 600DPI가 적합합니다. 일반 문서에서 600DPI 이상은 체감할 수 있는 개선 없이 파일 크기만 급격히 불어납니다.

단순한 보관용으로 읽을 수 있는 참고 사본만 필요하다면 200DPI로도 충분하며 파일 크기가 작습니다.

흔한 실수는 모든 것을 최고 DPI로 스캔하는 것입니다. 일반 서류를 1200DPI로 스캔하면 300DPI 대비 실용적 품질 차이 없이 거대한 파일만 만들어집니다.

## 색상 모드: 컬러, 회색조, 흑백

색상 모드 선택은 화질과 파일 크기 모두에 큰 영향을 미칩니다.

컬러는 색상이 중요할 때 사용합니다 — 사진, 색상이 있는 차트, 색으로 구분된 양식, 컬러 텍스트가 있는 문서 등입니다. 파일 크기가 가장 큽니다.

회색조(그레이스케일)는 색상 정보를 제거하되 명암과 톤 변화를 보존합니다. 사진이 포함되거나 연필 드로잉이 있거나 텍스트 농도가 다양한 문서에 적합합니다. 같은 DPI에서 컬러 스캔의 약 3분의 1 크기입니다.

흑백(바이토널/1비트)은 모든 것을 순수한 검정 또는 흰색으로 변환합니다. 파일 크기가 가장 작고, 깨끗한 텍스트 문서와 선화에 잘 맞습니다. 다만 사진의 정보를 파괴할 수 있고, 흑백 경계값이 잘못 설정되면 텍스트가 울퉁불퉁해질 수 있습니다.

대부분의 텍스트 문서에는 회색조가 최적의 균형을 제공합니다. 종이 색상과 인쇄 농도의 변화를 자연스럽게 처리하면서 파일 크기도 적정하게 유지합니다.

## 자동 보정 기능

최신 스캐너와 스캔 앱은 결과를 크게 개선할 수 있는 자동 보정 기능을 제공합니다.

자동 기울기 보정은 페이지 기울어짐을 감지하고 교정합니다. 약간의 기울어짐만으로도 비전문적으로 보이고 OCR 정확도에도 영향을 줍니다. 매 스캔마다 켜두는 것이 좋습니다.

자동 잘라내기는 페이지 경계를 감지해서 주변의 불필요한 영역(스캐너 덮개, 테이블 표면 등)을 제거합니다.

배경 제거 또는 미백 처리는 스캔 배경 색상을 균일하게 만듭니다. 종이는 순백인 경우가 드뭅니다 — 변색되었거나, 미색이거나, 조명이 고르지 않을 수 있습니다. 배경 보정을 하면 깔끔해 보이고 파일 크기도 줄어듭니다.

선명도 보정은 텍스트 가장자리와 세부 사항을 강화합니다. 약하게 적용하면 텍스트가 더 또렷해지지만, 과도하게 적용하면 텍스트 주변에 번짐이 생기므로 주의하세요.

## 모바일 스캔 팁

스마트폰 카메라는 전용 스캔 앱과 함께 사용하면 상당히 훌륭한 문서 스캐너가 됩니다.

조명이 가장 중요합니다. 창가나 밝고 균일한 조명 아래에서 스캔하세요. 머리 위 조명이 만드는 강한 그림자는 문서에 어두운 줄무늬를 만듭니다. 그림자를 피할 수 없다면 조명이나 문서 위치를 조정해 보세요.

카메라를 문서와 평행하게 유지하세요. 비스듬하게 찍으면 원근 왜곡이 생기는데, 자동 보정으로도 완전히 해결하기 어렵습니다. 문서 바로 위에서 수직으로 내려다보며 촬영하세요.

대비되는 배경을 사용하세요. 흰 문서는 어두운 표면 위에, 어두운 문서는 밝은 표면 위에 놓으면 스캔 앱이 페이지 경계를 정확하게 감지합니다.

흔들림 없이 촬영하세요. 손 떨림은 흐린 스캔을 만듭니다. 스캔 앱의 자동 촬영 기능이 있다면 앱이 가장 선명한 프레임을 선택하도록 맡기세요.

일반 카메라 대신 전용 스캔 앱을 사용하세요. 원근 보정, 자동 잘라내기, 화질 보정, PDF 직접 내보내기를 한 번에 처리합니다.

## 파일 정리와 이름 짓기

좋은 스캔 습관은 스캔 자체를 넘어 결과물을 정리하는 방식까지 포함합니다.

일관된 이름 규칙을 정하세요. 날짜, 문서 종류, 관련 식별 정보를 포함하면 좋습니다. "2026-03-11-영수증-OO회사.pdf"는 6개월 뒤에도 유용하지만, "scan001.pdf"는 아닙니다.

논리적인 폴더 구조를 만드세요. 연도별, 카테고리별, 프로젝트별 — 나중에 문서를 찾을 때 어떤 방식으로 검색할지에 맞추세요.

여러 페이지 문서는 페이지별로 파일을 나누지 말고 하나의 PDF로 스캔하세요. 문서의 일체성이 유지되고 공유와 보관이 쉬워집니다.

스캔한 파일은 꼭 백업하세요. 하드웨어 고장, 실수로 삭제, 소프트웨어 문제로 디지털 파일을 잃을 수 있습니다. 최소 두 곳 — 예를 들어 컴퓨터와 클라우드 스토리지 — 에 보관하세요.`,
      },
    },
  },
  {
    slug: "pdf-accessibility",
    app: "pdf",
    category: "knowledge",
    publishedAt: "2026-03-14",
    content: {
      en: {
        title:
          "Making PDFs Accessible: A Guide to PDF Accessibility Standards",
        description:
          "Learn why PDF accessibility matters, how to create tagged PDFs with proper reading order and alt text, and what the PDF/UA standard requires for truly accessible documents.",
        body: `## Why PDF Accessibility Matters

Over one billion people worldwide live with some form of disability. Many of them rely on assistive technologies — screen readers, magnifiers, braille displays, and alternative input devices — to access digital content. When a PDF is not accessible, these users are effectively locked out of the information it contains.

Accessibility is not just a matter of social responsibility. In many countries, it is a legal requirement. The Americans with Disabilities Act (ADA), the European Accessibility Act, Section 508 of the Rehabilitation Act, and similar laws around the world mandate that public-facing digital content be accessible to people with disabilities. PDFs published by government agencies, educational institutions, and organizations receiving public funding must meet accessibility standards.

Beyond legal compliance, accessible PDFs benefit everyone. Proper document structure improves search engine indexing. Tagged content enables reliable text extraction and reflow. Clear reading order helps document translation tools work correctly. Accessibility is good document engineering.

## What Makes a PDF Accessible

An accessible PDF provides the information and structure that assistive technologies need to present content to users with disabilities. The key components are document structure tags, reading order, alternative text, language specification, and navigational aids.

### Document Structure Tags

Tags are the foundation of PDF accessibility. A tagged PDF contains a logical structure tree that identifies each element in the document — headings, paragraphs, lists, tables, images, and links. These tags are analogous to HTML elements and serve a similar purpose: they give meaning to the visual presentation.

Without tags, a screen reader encounters a PDF as a flat stream of text with no indication of what is a heading, where a new section begins, or how a table is organized. The user hears a continuous flow of words with no structure, making it nearly impossible to navigate or understand the document.

Properly tagged PDFs allow screen reader users to jump between headings, navigate tables cell by cell, skip over decorative images, and understand the logical hierarchy of the content — just as sighted users do visually.

### Reading Order

The visual layout of a PDF page does not always match the logical reading order. A page with multiple columns, sidebars, captions, and headers may present content in a visual arrangement that makes sense to sighted readers but confuses assistive technology that reads content sequentially.

An accessible PDF defines a logical reading order through its tag structure. Content flows in the order it should be read, regardless of its visual position on the page. Headers come before body text, captions are associated with their figures, and sidebar content is positioned logically within the narrative flow.

### Alternative Text

Images in an accessible PDF must have alternative text (alt text) that describes the image's content or purpose. A chart should have alt text explaining what the data shows. A photograph should describe what is depicted. A decorative border or background image should be marked as an artifact so screen readers skip it entirely.

Writing effective alt text requires judgment. The text should convey the information or purpose the image serves in context, not just describe the image mechanically. "Bar chart showing Q3 revenue increased 15 percent year over year" is more useful than "bar chart."

### Language Specification

The document's primary language must be specified in the PDF metadata. If the document contains passages in different languages, those passages should be tagged with their respective language codes. This enables screen readers to switch pronunciation rules automatically, ensuring correct reading of multilingual content.

## The PDF/UA Standard

PDF/UA (Universal Accessibility) is the international standard for accessible PDFs, published as ISO 14289. It builds on the general PDF accessibility concepts and defines specific, testable requirements.

PDF/UA requires that all content be tagged with appropriate structure elements. Every image must have alternative text or be marked as an artifact. Tables must use proper table markup with header cells identified. The reading order must be defined and logical. Fonts must allow character mapping to Unicode for reliable text extraction. Navigation aids like bookmarks must be provided for documents with multiple sections.

The standard applies to both the PDF file and the software used to create and display it. A PDF/UA-compliant reader must respect the tag structure and provide navigation based on it.

### Conformance Levels

PDF/UA-1 (ISO 14289-1, 2014) is the first version, based on PDF 1.7. It establishes the core accessibility requirements that apply to most document types.

PDF/UA-2 (ISO 14289-2, 2024) is the updated version based on PDF 2.0. It aligns with WCAG 2 (Web Content Accessibility Guidelines) and adds requirements for mathematical content (MathML), better handling of annotations, and improved support for complex document structures.

## Creating Accessible PDFs

The most effective way to create accessible PDFs is to start with an accessible source document. If your content originates in Microsoft Word, Google Docs, or similar tools, using built-in heading styles, adding alt text to images, and creating proper table structures will carry over to the PDF when you export.

When exporting to PDF from Word, use the "Create Tagged PDF" option (or equivalent). This preserves the document's logical structure as PDF tags.

For documents created directly as PDFs — through design tools like InDesign or by scanning — you will need to add tags manually using a tool that supports PDF tagging. Adobe Acrobat Pro provides a comprehensive tagging interface, and several other commercial tools offer similar capabilities.

## Testing PDF Accessibility

After creating an accessible PDF, testing is essential. Automated tools can check for the presence of tags, alt text, language specification, and other technical requirements. Popular automated checkers include PAC (PDF Accessibility Checker) and Adobe Acrobat's built-in accessibility checker.

However, automated testing catches only a subset of accessibility issues. Manual testing — actually using a screen reader to navigate the document — reveals problems with reading order, alt text quality, and logical structure that automated tools miss. Testing with NVDA (free, Windows), VoiceOver (built into macOS/iOS), or JAWS gives the most realistic picture of the user experience.

A truly accessible PDF passes both automated checks and manual usability testing. The goal is not checkbox compliance but genuine usability for people who depend on assistive technology.`,
      },
      ko: {
        title: "접근 가능한 PDF 만들기 — PDF 접근성 표준 가이드",
        description:
          "PDF 접근성이 왜 중요한지, 태그가 있는 PDF를 올바른 읽기 순서와 대체 텍스트로 만드는 방법, PDF/UA 표준이 요구하는 사항까지 정리했습니다.",
        body: `## PDF 접근성이 중요한 이유

전 세계 10억 명 이상이 어떤 형태로든 장애를 가지고 있습니다. 이 중 많은 사람이 화면 낭독기, 확대기, 점자 디스플레이, 대체 입력 장치 같은 보조 기술에 의존해 디지털 콘텐츠에 접근합니다. PDF가 접근성을 갖추지 못하면 이 사용자들은 문서의 정보에서 사실상 차단됩니다.

접근성은 사회적 책임의 문제만이 아닙니다. 미국 장애인법(ADA), 유럽 접근성법, 재활법 508조 등 전 세계 여러 법률이 공공에 공개되는 디지털 콘텐츠의 접근성을 의무화하고 있습니다. 정부 기관, 교육 기관, 공적 자금을 받는 조직이 발행하는 PDF는 접근성 표준을 충족해야 합니다.

법적 의무를 넘어, 접근 가능한 PDF는 모든 사용자에게 유익합니다. 적절한 문서 구조는 검색엔진 인덱싱을 개선하고, 태그된 콘텐츠는 안정적인 텍스트 추출과 리플로를 가능하게 하며, 명확한 읽기 순서는 문서 번역 도구의 정확도를 높입니다.

## 접근 가능한 PDF의 구성 요소

접근 가능한 PDF는 보조 기술이 장애를 가진 사용자에게 콘텐츠를 전달하기 위해 필요한 정보와 구조를 제공합니다. 핵심 요소는 문서 구조 태그, 읽기 순서, 대체 텍스트, 언어 지정, 탐색 보조 기능입니다.

### 문서 구조 태그

태그는 PDF 접근성의 기반입니다. 태그가 있는 PDF에는 문서의 각 요소 — 제목, 단락, 목록, 표, 이미지, 링크 — 를 식별하는 논리적 구조 트리가 포함됩니다. HTML 요소와 유사한 역할을 합니다.

태그 없이는 화면 낭독기가 PDF를 구조 없는 텍스트의 연속으로 만나게 됩니다. 어디가 제목이고, 어디서 새 섹션이 시작되고, 표가 어떻게 구성되어 있는지 알 수 없습니다. 사용자는 끊임없이 흘러가는 텍스트를 듣게 되어 문서를 탐색하거나 이해하기가 거의 불가능합니다.

적절히 태그된 PDF에서는 화면 낭독기 사용자가 제목 간 이동, 표의 셀별 탐색, 장식용 이미지 건너뛰기, 콘텐츠의 논리적 계층 파악이 가능합니다.

### 읽기 순서

PDF 페이지의 시각적 배치가 항상 논리적 읽기 순서와 일치하지는 않습니다. 다단, 사이드바, 캡션, 헤더가 있는 페이지는 시각적으로는 자연스럽지만 보조 기술이 순차적으로 읽을 때 혼란을 줄 수 있습니다.

접근 가능한 PDF는 태그 구조를 통해 논리적 읽기 순서를 정의합니다. 콘텐츠가 읽혀야 하는 순서대로 흐르며, 페이지 위의 시각적 위치와 무관합니다.

### 대체 텍스트

접근 가능한 PDF의 이미지에는 내용이나 목적을 설명하는 대체 텍스트(alt text)가 필요합니다. 차트에는 데이터가 무엇을 보여주는지, 사진에는 무엇이 나타나 있는지를 설명해야 합니다. 장식용 테두리나 배경 이미지는 아티팩트로 표시해서 화면 낭독기가 건너뛰도록 합니다.

효과적인 대체 텍스트를 작성하려면 판단이 필요합니다. "3분기 매출이 전년 대비 15% 증가했음을 보여주는 막대 차트"가 "막대 차트"보다 훨씬 유용합니다.

### 언어 지정

문서의 주 언어를 PDF 메타데이터에 지정해야 합니다. 다른 언어로 된 구절이 포함되어 있다면 해당 구절에 언어 코드를 태그해야 합니다. 이를 통해 화면 낭독기가 발음 규칙을 자동으로 전환하여 다국어 콘텐츠를 올바르게 읽을 수 있습니다.

## PDF/UA 표준

PDF/UA(범용 접근성)는 접근 가능한 PDF의 국제 표준으로, ISO 14289로 발행되었습니다. PDF 접근성 개념을 구체화하여 검증 가능한 요구 사항을 정의합니다.

PDF/UA는 모든 콘텐츠에 적절한 구조 요소의 태그를 요구합니다. 모든 이미지에 대체 텍스트가 있거나 아티팩트로 표시되어야 합니다. 표에는 헤더 셀이 식별된 적절한 표 마크업이 필요합니다. 읽기 순서가 정의되고 논리적이어야 합니다. 글꼴은 유니코드 매핑이 가능해야 합니다.

### 적합성 수준

PDF/UA-1(2014)은 PDF 1.7 기반의 첫 버전으로, 대부분의 문서 유형에 적용되는 핵심 접근성 요구 사항을 확립했습니다.

PDF/UA-2(2024)는 PDF 2.0 기반의 업데이트 버전으로, WCAG 2(웹 콘텐츠 접근성 지침)와 정렬되어 수학 콘텐츠(MathML), 주석의 향상된 처리, 복잡한 문서 구조 지원이 추가되었습니다.

## 접근 가능한 PDF 만들기

접근 가능한 PDF를 만드는 가장 효과적인 방법은 접근 가능한 소스 문서에서 시작하는 것입니다. Microsoft Word나 Google Docs에서 콘텐츠를 작성한다면, 내장 제목 스타일을 사용하고, 이미지에 대체 텍스트를 추가하고, 적절한 표 구조를 만들어 두면 PDF로 내보낼 때 그대로 유지됩니다.

Word에서 PDF로 내보낼 때는 "태그가 있는 PDF 만들기" 옵션을 사용하세요. 문서의 논리적 구조가 PDF 태그로 보존됩니다.

디자인 도구에서 직접 만들었거나 스캔한 PDF는 PDF 태그 기능을 지원하는 도구를 사용해 수동으로 태그를 추가해야 합니다.

## PDF 접근성 테스트

접근 가능한 PDF를 만든 후에는 테스트가 필수입니다. 자동 검사 도구는 태그 존재 여부, 대체 텍스트, 언어 지정 등 기술적 요구 사항을 확인할 수 있습니다. PAC(PDF Accessibility Checker)와 Adobe Acrobat의 내장 접근성 검사기가 널리 사용됩니다.

하지만 자동 테스트는 접근성 문제의 일부만 잡아냅니다. 실제로 화면 낭독기를 사용해 문서를 탐색하는 수동 테스트가 읽기 순서, 대체 텍스트 품질, 논리적 구조의 문제를 발견합니다. NVDA(무료, Windows), VoiceOver(macOS/iOS 내장), JAWS로 테스트하면 실제 사용자 경험에 가장 가까운 결과를 얻을 수 있습니다.

진정으로 접근 가능한 PDF는 자동 검사와 수동 사용성 테스트를 모두 통과합니다. 목표는 체크리스트 준수가 아니라, 보조 기술에 의존하는 사람들이 실제로 쓸 수 있는 문서를 만드는 것입니다.`,
      },
    },
  },
  {
    slug: "batch-pdf-processing",
    app: "pdf",
    category: "tips",
    publishedAt: "2026-03-20",
    content: {
      en: {
        title:
          "Batch PDF Processing: How to Handle Hundreds of Files Efficiently",
        description:
          "Strategies for processing large numbers of PDF files at scale — batch merging, splitting, converting, renaming, and automating repetitive PDF tasks.",
        body: `## When You Need Batch Processing

Handling one or two PDFs is simple. But what about 500 invoices that need to be converted to PDF/A? Or 200 reports that need a cover page added? Or thousands of scanned documents that need OCR processing? When the file count moves from single digits to hundreds or thousands, manual processing becomes impossible and batch automation becomes essential.

Batch PDF processing saves hours of repetitive work, eliminates human error that creeps in during tedious manual tasks, and produces consistent results across all files. Whether you are a business processing daily document workflows, an archivist digitizing a collection, or an individual organizing years of accumulated files, batch processing is the path to sanity.

## Batch Merging Strategies

Merging PDFs in bulk requires a systematic approach, especially when the output needs to be organized logically.

### Group-Based Merging

The most common batch merge scenario is combining related files into groups. For example, merging each client's invoices into a single file per client, or combining each project's documents into project binders.

The key is organizing your input files so that grouping is automatic. A folder structure where each subfolder contains one group's files makes this straightforward: iterate over folders, merge the files in each folder, name the output after the folder.

### Sequential Merging

When merging files in a specific order, file naming is critical. Use zero-padded numbers (001, 002, ... 099, 100) to ensure correct sorting. Without zero-padding, alphabetical sorting puts "10" before "2," which scrambles your page order.

For very large merges (hundreds of files into one document), consider merging in stages. Combine files in groups of 50, then merge the intermediate files. This reduces memory pressure and gives you checkpoints to verify quality along the way.

## Batch Splitting

Splitting PDFs in bulk typically follows one of several patterns.

### Fixed-Page Splitting

Splitting every PDF into single-page files, or into fixed chunks of N pages, is the simplest batch split operation. This is common when breaking scanned documents into individual records, or when a multi-page report needs to become separate one-page summaries.

### Content-Based Splitting

More sophisticated splitting uses content markers to determine where to divide. A batch of combined invoices might use a specific text pattern (like "Invoice Number") to identify the start of each document within the combined file. Barcode recognition can serve a similar purpose for scanned documents with separator sheets.

Content-based splitting requires tools that can analyze page content, not just count pages. It is more complex to set up but handles irregular document lengths that fixed-page splitting cannot accommodate.

## Batch Conversion

Converting file formats in bulk is another major batch processing use case.

### Images to PDF

Converting folders of images to PDFs is common in scanning workflows. Each scan session might produce dozens or hundreds of image files that need to become organized PDFs. Batch conversion tools can process an entire folder, creating one PDF per image or one multi-page PDF from a sequence of images.

### Format Standardization

Organizations often need to standardize document formats. A project folder might contain a mix of Word documents, Excel spreadsheets, PowerPoint presentations, and existing PDFs that all need to be in a consistent PDF format. Batch conversion handles this uniformly.

### PDF/A Conversion

Converting existing PDFs to PDF/A for archival compliance is a task that often involves large document collections. Batch PDF/A conversion tools validate each file, address non-compliant elements (embedding fonts, adding color profiles, stripping JavaScript), and produce conformant output.

## Renaming and Organizing

Batch renaming is unglamorous but enormously practical. Scanner output with names like "SCAN0001.pdf" through "SCAN0500.pdf" tells you nothing about content. Batch renaming based on creation date, file content, or a mapping spreadsheet transforms chaos into a usable archive.

Effective renaming strategies include date-based naming (2026-03-15-invoice.pdf), content-based naming (extracting text from the first page to build a filename), sequential naming with a meaningful prefix (project-alpha-001.pdf), and metadata-based naming (using embedded PDF metadata for title or author).

Organizing files into folder structures is equally important. Batch tools can distribute files into folders based on date ranges, filename patterns, or content analysis. A year's worth of invoices can be automatically sorted into monthly folders with a single operation.

## Automation Approaches

### Shell Scripts

For users comfortable with the command line, shell scripts (bash on macOS/Linux, PowerShell on Windows) combined with command-line PDF tools provide the most flexible batch processing. A simple loop iterating over files in a directory, applying a PDF operation to each, and saving the output with a structured name handles most batch scenarios.

The advantage of scripts is complete control: you define exactly what happens to each file, how errors are handled, and how output is organized. The disadvantage is the learning curve for users unfamiliar with scripting.

### Watched Folders

Some PDF tools support watched folders — designated directories where any file placed is automatically processed according to predefined rules. Drop a file in the "to-convert" folder and it appears in the "converted" folder moments later as a PDF.

Watched folders are excellent for ongoing workflows where documents arrive continuously. Set it up once and it runs indefinitely with no manual intervention.

### Scheduled Tasks

Operating system schedulers (cron on macOS/Linux, Task Scheduler on Windows) can run batch PDF processing scripts at defined intervals. A nightly job that processes all new scans from the day, converts them to PDF, applies OCR, and files them in the appropriate folder eliminates an entire category of daily manual work.

## Quality Control

Batch processing introduces the risk of errors propagating across many files unnoticed. Build quality checks into your workflow.

Spot-check a sample of output files after each batch run. Open random files from the batch and verify they look correct — pages are in order, content is complete, formatting is intact.

Validate file integrity programmatically when possible. Check that output PDFs are valid (can be opened without errors), have the expected page counts, and fall within reasonable file size ranges.

Log everything. Record which files were processed, what operations were applied, whether any errors occurred, and where the output was saved. Logs are invaluable when you need to troubleshoot issues or reprocess specific files.

Keep input files until you have verified the output. Batch processing mistakes — wrong settings, unexpected file formats, software bugs — can corrupt output. Having the originals lets you reprocess without data loss.`,
      },
      ko: {
        title:
          "대량 PDF 처리 — 수백 개 파일을 효율적으로 다루는 방법",
        description:
          "대규모 PDF 파일 처리 전략 — 대량 합치기, 분할, 변환, 이름 변경, 반복 작업 자동화 방법을 소개합니다.",
        body: `## 대량 처리가 필요한 순간

PDF 한두 개는 간단합니다. 하지만 500건의 청구서를 PDF/A로 변환해야 한다면? 200개 보고서에 표지를 추가해야 한다면? 수천 건의 스캔 문서에 OCR 처리를 해야 한다면? 파일 수가 한 자릿수를 넘어 수백, 수천이 되면 수작업은 불가능하고 자동화가 필수가 됩니다.

대량 PDF 처리는 반복 작업에 쓰이는 시간을 절약하고, 지루한 수작업에서 생기는 실수를 제거하며, 모든 파일에 일관된 결과를 만들어냅니다.

## 대량 합치기 전략

PDF를 대량으로 합치려면 체계적인 접근이 필요합니다. 특히 결과물이 논리적으로 정리되어야 할 때 더 그렇습니다.

### 그룹 기반 합치기

가장 흔한 대량 합치기 시나리오는 관련 파일을 그룹별로 묶는 것입니다. 고객별 청구서를 고객당 하나의 파일로, 프로젝트별 문서를 프로젝트 바인더로 합치는 식입니다.

핵심은 입력 파일을 자동 그룹화가 가능하도록 정리하는 것입니다. 하위 폴더마다 한 그룹의 파일을 담아두면, 폴더를 순회하며 각 폴더의 파일을 합치고 폴더 이름으로 출력물을 저장하는 간단한 처리가 됩니다.

### 순차 합치기

특정 순서로 합쳐야 할 때는 파일 이름이 중요합니다. 001, 002, ... 099, 100처럼 0을 채운 번호를 사용해야 정렬이 올바릅니다. 0을 채우지 않으면 알파벳순 정렬에서 "10"이 "2"보다 앞에 와서 페이지 순서가 뒤섞입니다.

수백 개 파일을 하나로 합쳐야 하는 대규모 작업에는 단계별 합치기가 안정적입니다. 50개씩 먼저 합친 다음 중간 결과물을 다시 합치면 메모리 부담이 줄고, 중간 점검도 가능합니다.

## 대량 분할

PDF를 대량으로 분할하는 패턴은 크게 두 가지입니다.

### 고정 페이지 분할

모든 PDF를 단일 페이지 파일로 나누거나, N페이지씩 고정 단위로 쪼개는 가장 단순한 방식입니다. 스캔 문서를 개별 기록으로 분리하거나, 여러 페이지 보고서를 한 페이지씩 요약으로 만들 때 흔히 사용합니다.

### 콘텐츠 기반 분할

더 정교한 분할은 콘텐츠 내 특정 표시를 기준으로 나눕니다. 합쳐진 청구서 묶음에서 "청구서 번호" 같은 텍스트 패턴이 나타나는 위치에서 분리하는 방식입니다. 구분 페이지가 있는 스캔 문서에서는 바코드 인식이 같은 역할을 합니다.

콘텐츠 기반 분할은 페이지를 세는 것이 아니라 내용을 분석할 수 있는 도구가 필요합니다. 설정이 더 복잡하지만, 문서 길이가 불규칙한 경우에도 정확히 처리합니다.

## 대량 변환

파일 형식을 대량으로 변환하는 것도 주요 배치 처리 사례입니다.

### 이미지를 PDF로

이미지 폴더를 PDF로 변환하는 것은 스캔 워크플로에서 흔합니다. 배치 변환 도구가 폴더 전체를 처리하여 이미지당 PDF 하나, 또는 이미지 시퀀스를 하나의 다중 페이지 PDF로 만들 수 있습니다.

### 형식 표준화

조직 내에서 문서 형식을 통일해야 하는 경우가 많습니다. 프로젝트 폴더에 Word, Excel, PowerPoint, PDF가 뒤섞여 있는데 모두 일관된 PDF 형식이어야 할 때 배치 변환이 균일하게 처리합니다.

### PDF/A 변환

기존 PDF를 보관 규정 준수를 위해 PDF/A로 변환하는 작업은 대량의 문서 컬렉션을 다루는 경우가 많습니다. 각 파일을 검증하고, 비준수 요소를 처리하고(글꼴 내장, 색상 프로파일 추가, JavaScript 제거), 적합한 출력을 만들어냅니다.

## 이름 변경과 정리

대량 이름 변경은 화려하지 않지만 실용성이 큽니다. "SCAN0001.pdf"부터 "SCAN0500.pdf"까지 스캐너가 만든 이름은 내용에 대해 아무것도 알려주지 않습니다. 생성 날짜, 파일 내용, 매핑 스프레드시트를 기반으로 이름을 바꾸면 혼돈이 쓸 만한 아카이브로 변합니다.

효과적인 이름 규칙으로는 날짜 기반(2026-03-15-청구서.pdf), 콘텐츠 기반(첫 페이지의 텍스트로 파일 이름 구성), 의미 있는 접두사가 있는 순번(프로젝트A-001.pdf), 메타데이터 기반(PDF에 내장된 제목이나 저자 활용)이 있습니다.

파일을 폴더 구조로 분류하는 것도 마찬가지로 중요합니다. 1년치 청구서를 월별 폴더로 자동 분류하는 작업을 한 번의 조작으로 처리할 수 있습니다.

## 자동화 접근법

### 셸 스크립트

명령줄에 익숙한 사용자에게는 셸 스크립트(macOS/Linux의 bash, Windows의 PowerShell)와 명령줄 PDF 도구의 조합이 가장 유연합니다. 디렉토리의 파일을 순회하며 각 파일에 PDF 작업을 적용하고 구조화된 이름으로 저장하는 단순한 루프로 대부분의 시나리오를 처리합니다.

장점은 완전한 통제입니다. 각 파일에 무슨 일이 일어나는지, 오류는 어떻게 처리하는지, 출력은 어떻게 정리하는지를 정확히 정의할 수 있습니다.

### 감시 폴더

일부 PDF 도구는 감시 폴더를 지원합니다. 지정된 디렉토리에 파일을 넣으면 미리 정의된 규칙에 따라 자동 처리됩니다. "변환 대상" 폴더에 파일을 놓으면 잠시 후 "변환 완료" 폴더에 PDF로 나타납니다. 문서가 지속적으로 들어오는 워크플로에 적합합니다.

### 예약 작업

운영체제의 스케줄러(macOS/Linux의 cron, Windows의 작업 스케줄러)로 배치 스크립트를 정해진 간격으로 실행할 수 있습니다. 하루 동안의 스캔을 밤에 자동으로 PDF 변환, OCR 처리, 폴더 분류하면 매일의 수작업을 통째로 없앨 수 있습니다.

## 품질 관리

대량 처리는 오류가 많은 파일에 걸쳐 눈에 띄지 않게 퍼질 위험이 있습니다. 워크플로에 품질 검사를 포함시키세요.

배치 실행 후 출력 파일 중 일부를 골라 확인하세요. 무작위로 파일을 열어 페이지 순서, 내용 완결성, 형식이 온전한지 살피세요.

가능하면 프로그래밍으로 파일 무결성을 검증하세요. 출력 PDF가 오류 없이 열리는지, 예상 페이지 수와 맞는지, 합리적인 파일 크기 범위 안에 있는지 확인합니다.

모든 것을 로그로 남기세요. 어떤 파일이 처리되었는지, 어떤 작업이 적용되었는지, 오류가 있었는지, 출력이 어디에 저장되었는지 기록합니다. 문제 해결이나 특정 파일 재처리 시 매우 유용합니다.

출력을 확인할 때까지 입력 파일을 보관하세요. 잘못된 설정, 예상치 못한 파일 형식, 소프트웨어 버그로 출력이 손상될 수 있습니다. 원본이 있으면 데이터 손실 없이 재처리할 수 있습니다.`,
      },
    },
  },
  {
    slug: "image-format-guide",
    app: "image",
    category: "knowledge",
    publishedAt: "2026-03-15",
    content: {
      en: {
        title: "Complete Guide to Image Formats: JPG, PNG, WebP, and Beyond",
        description:
          "Understand when to use each image format, how compression works, and which modern formats offer the best quality-to-size ratio for your projects.",
        body: `## Why Image Formats Matter

Choosing the right image format is one of the most impactful decisions you can make for web performance, print quality, and storage efficiency. Each format was designed with specific use cases in mind, and using the wrong one means either bloated file sizes or degraded visual quality. Understanding the strengths and trade-offs of each format helps you make informed choices every time.

## JPG (JPEG) — The Photography Standard

JPG uses lossy compression, meaning it discards some image data to achieve smaller file sizes. This works remarkably well for photographs because the human eye is less sensitive to the subtle details that get removed. A photograph saved as JPG at quality 80-85 looks virtually identical to the original while being a fraction of the size.

Where JPG falls short is with sharp edges, text, and flat-color graphics. The compression algorithm introduces visible artifacts around hard boundaries — smudgy halos that become more pronounced at lower quality settings. JPG also does not support transparency, so any transparent area becomes a solid color (usually white).

Best for: photographs, complex images with gradual color transitions, social media uploads, email attachments.

## PNG — Lossless with Transparency

PNG uses lossless compression, preserving every pixel exactly as it was. This makes it ideal for graphics where precision matters: logos, icons, screenshots, diagrams, and any image with text overlays. PNG also supports alpha transparency, allowing pixels to be partially or fully transparent — essential for compositing images over different backgrounds.

The trade-off is file size. A photograph saved as PNG can be 5-10 times larger than the same image as JPG, with no visible quality improvement. PNG compression works by finding patterns in the pixel data, so images with large areas of identical color compress well, while photographs with millions of unique colors do not.

PNG comes in two main variants: PNG-8 (up to 256 colors, like GIF but better) and PNG-24/32 (millions of colors with optional alpha channel). PNG-8 is excellent for simple graphics with limited color palettes.

Best for: logos, icons, screenshots, graphics with text, images requiring transparency, UI elements.

## WebP — The Modern Compromise

Developed by Google and released in 2010, WebP supports both lossy and lossless compression, transparency, and even animation — combining the strengths of JPG, PNG, and GIF in a single format. Lossy WebP files are typically 25-35% smaller than equivalent JPG files at similar visual quality. Lossless WebP files are around 26% smaller than PNG.

Browser support for WebP is now universal across Chrome, Firefox, Safari, and Edge. This makes it a practical choice for web images without compatibility concerns. The main limitation is that some older image editing software and native OS image viewers may not handle WebP natively, though this gap is closing rapidly.

Best for: web images of all types, replacing both JPG and PNG on websites, any scenario where file size matters.

## AVIF — The Next Generation

AVIF (AV1 Image File Format) is based on the AV1 video codec and represents the cutting edge of image compression. It achieves dramatically better compression than WebP — often 50% smaller than JPG at comparable quality. AVIF supports HDR (High Dynamic Range), wide color gamuts, transparency, and both lossy and lossless modes.

The catch is encoding speed. Creating AVIF files is significantly slower than JPG or WebP, making it less practical for real-time image processing. Browser support is strong in Chrome and Firefox, with Safari adding support in version 16.4. For websites serving static images where encoding happens at build time, AVIF is increasingly the best choice.

Best for: websites prioritizing performance, static assets where encoding time is acceptable, HDR content.

## GIF — Animation Legacy

GIF is limited to 256 colors and uses lossless compression, making it a poor choice for photographs but acceptable for simple animations and very basic graphics. The format's main claim to relevance today is its universal support for animation, though WebP and AVIF both handle animation more efficiently.

For static images, GIF should almost always be replaced by PNG (better quality, similar or smaller size) or WebP (much smaller). For animations, consider WebP animation or MP4/WebM video, which offer dramatically better quality and smaller sizes.

## SVG — Vector Graphics

SVG is fundamentally different from the formats above. Rather than storing pixel data, SVG describes images using mathematical shapes — lines, curves, rectangles, text. This means SVG images scale to any size without quality loss, making them perfect for logos, icons, and illustrations that need to display at multiple sizes.

SVG files are XML-based text files, so they can be edited with code, styled with CSS, and animated with JavaScript. They also tend to be very small for the types of images they represent. A company logo as SVG might be 2-5 KB, while the same logo as PNG at a reasonable resolution could be 50 KB or more.

SVG is not suitable for photographs or complex raster imagery. Attempting to represent a photo as SVG would result in enormous file sizes and poor visual quality.

Best for: logos, icons, illustrations, charts, any graphics that need to scale perfectly.

## Choosing the Right Format

Here is a practical decision framework. For photographs, use WebP with JPG fallback for maximum compatibility. For graphics with transparency, use WebP with PNG fallback. For simple animations, use WebP animation or MP4. For logos and icons, use SVG. For maximum compression on static web assets, use AVIF with WebP fallback.

When in doubt, WebP is the safest modern default for web images. It handles every use case reasonably well and enjoys universal browser support.`,
      },
      ko: {
        title: "이미지 포맷 완벽 가이드: JPG, PNG, WebP 그리고 그 이후",
        description:
          "각 이미지 포맷의 특성과 적합한 용도, 압축 방식의 차이, 브라우저 지원 현황까지 한눈에 정리했습니다.",
        body: `## 포맷 선택이 중요한 이유

이미지 포맷 하나 잘못 고르면 웹사이트가 느려지고, 파일 용량은 불어나고, 화질까지 떨어집니다. 반대로 상황에 맞는 포맷을 쓰면 같은 화질에 절반 이하의 용량도 가능하죠. 포맷별 특징을 제대로 알면 매번 최적의 선택을 내릴 수 있습니다.

## JPG(JPEG) — 사진의 기본

JPG는 손실 압축 방식을 씁니다. 사람 눈이 잘 구분하지 못하는 미세한 정보를 버려서 파일 크기를 줄이는 원리입니다. 사진처럼 색이 점진적으로 변하는 이미지에 특히 효과적이고, 품질 80~85 정도면 원본과 거의 차이를 느끼기 어렵습니다.

문제는 텍스트, 로고, 단색 그래픽입니다. 선명한 경계 주변에 번지는 듯한 아티팩트가 생기고, 압축률을 높일수록 심해집니다. 투명도도 지원하지 않아서 투명 영역은 흰색 같은 단색으로 채워집니다.

적합한 용도: 사진, 색 전환이 부드러운 이미지, SNS 업로드, 이메일 첨부.

## PNG — 무손실과 투명도

PNG는 무손실 압축이라 모든 픽셀이 원본 그대로 보존됩니다. 로고, 아이콘, 스크린샷, 텍스트가 들어간 이미지에 적합하고, 알파 채널 투명도를 지원해서 배경 합성이 자유롭습니다.

단점은 용량입니다. 사진을 PNG로 저장하면 JPG 대비 5~10배 커질 수 있는데, 눈에 보이는 화질 차이는 없습니다. PNG 압축은 동일한 색의 넓은 영역에서 잘 작동하기 때문에, 색이 수백만 가지인 사진에는 비효율적입니다.

PNG-8(최대 256색)과 PNG-24/32(수백만 색 + 알파 채널) 두 종류가 있습니다. 색이 적은 단순 그래픽에는 PNG-8이 용량 면에서 훨씬 유리합니다.

적합한 용도: 로고, 아이콘, 스크린샷, 텍스트 포함 그래픽, 투명 이미지, UI 요소.

## WebP — 현실적인 최적해

구글이 2010년에 공개한 WebP는 손실/무손실 압축, 투명도, 애니메이션을 모두 지원합니다. JPG, PNG, GIF의 장점을 하나로 합친 셈이죠. 손실 WebP는 동일 화질 기준 JPG보다 25~35% 작고, 무손실 WebP는 PNG보다 약 26% 작습니다.

현재 Chrome, Firefox, Safari, Edge 모든 주요 브라우저에서 지원하기 때문에 호환성 걱정 없이 쓸 수 있습니다. 다만 오래된 이미지 편집 소프트웨어나 OS 기본 뷰어에서 아직 지원하지 않는 경우가 간간이 있습니다.

적합한 용도: 웹 이미지 전반, JPG와 PNG를 대체할 범용 포맷, 용량이 중요한 모든 상황.

## AVIF — 차세대 포맷

AV1 비디오 코덱 기반의 AVIF는 현존하는 이미지 압축 기술 중 최고 수준입니다. JPG 대비 최대 50%까지 용량을 줄이면서 비슷한 화질을 유지하고, HDR, 넓은 색역, 투명도까지 지원합니다.

단점은 인코딩 속도입니다. AVIF 생성은 JPG나 WebP보다 훨씬 느려서 실시간 처리에는 부적합합니다. 빌드 타임에 미리 변환해두는 정적 웹사이트라면 가장 좋은 선택이 될 수 있습니다. Chrome과 Firefox는 이미 지원하고, Safari도 16.4부터 대응합니다.

적합한 용도: 성능 최우선 웹사이트, 빌드 시 변환 가능한 정적 에셋, HDR 콘텐츠.

## GIF — 애니메이션의 유산

GIF는 256색 제한에 무손실 압축을 쓰는 포맷입니다. 사진에는 부적합하지만, 간단한 애니메이션 때문에 아직 쓰이고 있습니다. 다만 WebP 애니메이션이나 MP4가 훨씬 작은 용량에 더 좋은 화질을 제공하므로, 새로 만드는 콘텐츠에 GIF를 고집할 이유는 점점 줄어들고 있습니다.

정적 이미지로는 PNG가 거의 모든 면에서 GIF보다 낫습니다.

## SVG — 벡터 그래픽

SVG는 위의 포맷들과 근본적으로 다릅니다. 픽셀 데이터가 아니라 수학적 도형(선, 곡선, 사각형, 텍스트)으로 이미지를 표현하기 때문에 어떤 크기로 확대해도 깨지지 않습니다. CSS로 스타일링하고 JavaScript로 애니메이션도 줄 수 있어서 웹 개발에서 매우 유용합니다.

회사 로고를 SVG로 만들면 2~5KB 정도인데, 같은 로고를 PNG로 적당한 해상도에 저장하면 50KB가 넘기도 합니다. 단, 사진 같은 복잡한 래스터 이미지에는 적합하지 않습니다.

적합한 용도: 로고, 아이콘, 일러스트, 차트, 크기 조절이 필요한 모든 그래픽.

## 포맷 선택 가이드

사진이라면 WebP(JPG 폴백). 투명도가 필요하면 WebP(PNG 폴백). 간단한 애니메이션은 WebP 애니메이션 또는 MP4. 로고와 아이콘은 SVG. 정적 웹 에셋의 극한 압축이 필요하면 AVIF(WebP 폴백).

뭘 써야 할지 모르겠다면 WebP가 가장 안전한 선택입니다. 모든 용도에서 준수한 성능을 보이고, 브라우저 호환성도 완벽하니까요.`,
      },
    },
  },
  {
    slug: "resize-images-without-quality-loss",
    app: "image",
    category: "guide",
    publishedAt: "2026-03-17",
    content: {
      en: {
        title: "How to Resize Images Without Losing Quality",
        description:
          "Learn the techniques behind quality-preserving image resizing, from resampling algorithms to aspect ratio management and batch processing workflows.",
        body: `## The Core Challenge of Resizing

Resizing an image sounds simple, but the underlying math is surprisingly complex. When you shrink an image, multiple source pixels must be combined into fewer destination pixels. When you enlarge, new pixels must be invented from the existing ones. The algorithm used for this pixel math determines whether your resized image looks sharp or blurry, smooth or jagged.

Understanding these algorithms empowers you to choose the right settings for each situation rather than accepting default behavior that may not suit your needs.

## Downscaling: Shrinking Images

Downscaling is the more forgiving direction. You start with more information than you need, so the question is how to distill it intelligently. The simplest approach, nearest-neighbor sampling, just picks one source pixel to represent each destination pixel. This is fast but produces jagged edges and moire patterns.

Bilinear interpolation averages the four nearest source pixels for each destination pixel. The result is smoother but can look slightly soft. Bicubic interpolation considers 16 surrounding pixels and produces sharper results with better edge preservation — this is the default in most professional image editors.

Lanczos resampling uses an even wider sampling kernel and is considered the gold standard for downscaling quality. It produces the sharpest results with minimal aliasing artifacts. The trade-off is computation time, which matters for batch processing but is negligible for single images on modern hardware.

For web images, downscaling a high-resolution source to your target display size using Lanczos or bicubic resampling produces excellent results. A 4000x3000 pixel camera photo resized to 1200x900 for web use will look crisp and clean regardless of the algorithm, but Lanczos gives that extra edge of sharpness.

## Upscaling: The Hard Problem

Enlarging an image means creating pixels that did not exist in the original. Traditional algorithms can only interpolate between existing pixels — they cannot add genuine detail. This is why upscaled images look blurry: the algorithm smoothly blends between known pixel values, creating a soft, slightly out-of-focus appearance.

Nearest-neighbor upscaling creates a blocky, pixelated look because each source pixel becomes a block of identical destination pixels. This is actually desirable for pixel art, retro game graphics, and QR codes where you want to preserve the crisp pixel boundaries. For photographs, it looks terrible.

Bicubic upscaling produces smoother results but introduces a characteristic softness that becomes more pronounced with larger scale factors. Doubling an image (2x) is usually acceptable. Tripling (3x) shows visible softness. Beyond that, results degrade rapidly.

AI-powered upscaling has changed the game. Modern neural networks trained on millions of images can add plausible detail that traditional algorithms cannot. They can sharpen edges, enhance textures, and add fine details that make upscaled images look dramatically better than classical methods. Tools powered by models like Real-ESRGAN or similar architectures can upscale images 4x with results that often appear sharper than the original.

The caveat is that AI upscaling invents details. It makes educated guesses based on patterns learned during training. For artistic or casual use, this is fantastic. For scientific, medical, or forensic images where accuracy matters, AI-generated detail is fabricated and should not be trusted as ground truth.

## Preserving Aspect Ratio

One of the most common resizing mistakes is distorting the aspect ratio — stretching an image horizontally or vertically. A 4:3 photograph forced into a 1:1 square looks obviously wrong: faces become wide or narrow, circles become ovals, straight lines lean.

Always lock the aspect ratio when resizing unless you specifically intend to crop or distort. Specify either the target width or the target height, and let the other dimension calculate automatically. If you need a specific output dimension (like a 1080x1080 Instagram square), crop the image to the target ratio first, then resize to the target resolution.

For responsive web images, use the HTML srcset attribute and sizes property to serve different resolutions to different devices. Create your image at the largest needed size and let the browser select the appropriate version. This avoids upscaling entirely and ensures every user sees a properly-sized image.

## Batch Resizing Strategies

When resizing many images at once, consistency matters as much as quality. Define your target dimensions before starting and apply them uniformly. Common batch scenarios include resizing product photos to a standard dimension for an e-commerce site, creating thumbnail versions of a photo library, and preparing images at multiple resolutions for responsive web design.

For batch operations, prioritize using a consistent algorithm across all images. Mixing algorithms produces visually inconsistent results. Lanczos or bicubic should be your default for photographic content.

Name your output files systematically. Appending the dimensions (photo-1200x800.jpg) or using a suffix (photo-thumb.jpg, photo-full.jpg) makes it clear which version is which.

## Practical Tips for Best Results

Start from the highest-resolution source available. Each resize operation loses a tiny amount of quality, so resizing a resize compounds the loss. Keep your original files and always resize from them.

Apply sharpening after downscaling, not before. Downscaling inherently softens images slightly, and a gentle unsharp mask (amount 50-80%, radius 0.5-1.0) after resizing restores crispness without introducing artifacts.

For web delivery, combine resizing with format optimization. Resize your image to the exact display size, then save as WebP at quality 80-85. This one-two punch of proper dimensions plus modern compression produces the smallest files with the best visual quality.`,
      },
      ko: {
        title: "화질 손실 없이 이미지 크기 조절하는 법",
        description:
          "리샘플링 알고리즘의 원리부터 비율 유지, 일괄 처리 팁까지. 이미지 크기를 바꿀 때 화질을 지키는 핵심 기술을 알려드립니다.",
        body: `## 크기 조절의 핵심 과제

이미지 크기를 바꾸는 건 단순해 보이지만, 그 안의 계산은 꽤 복잡합니다. 축소할 때는 여러 픽셀을 적은 수의 픽셀로 합쳐야 하고, 확대할 때는 없던 픽셀을 만들어내야 합니다. 이 과정에서 어떤 알고리즘을 쓰느냐에 따라 결과물이 선명할 수도, 뿌옇게 될 수도 있습니다.

## 축소: 정보를 줄이는 기술

축소는 비교적 안전한 방향입니다. 원본에 필요 이상의 정보가 있으니까요. 가장 단순한 최근접 이웃(Nearest-Neighbor) 방식은 대표 픽셀 하나만 골라서 쓰는데, 빠르지만 계단 현상이 심합니다.

쌍선형(Bilinear) 보간은 주변 4개 픽셀을 평균 내서 부드럽지만 약간 흐릿합니다. 쌍삼차(Bicubic) 보간은 16개 픽셀을 참조해 더 선명한 결과를 내고, 대부분의 전문 편집기에서 기본값으로 씁니다.

Lanczos 리샘플링은 더 넓은 범위의 픽셀을 참고하는 고급 방식으로, 축소 시 최고 수준의 선명도를 제공합니다. 계산량이 더 많지만 요즘 하드웨어에서는 체감 차이가 거의 없습니다.

웹용 이미지라면 고해상도 원본을 Lanczos나 Bicubic으로 줄이면 충분히 깔끔한 결과를 얻을 수 있습니다.

## 확대: 어려운 문제

확대는 원본에 없는 픽셀을 만들어내는 작업이라 근본적으로 어렵습니다. 기존 알고리즘은 이웃 픽셀 사이를 보간하는 것이 전부라서, 확대할수록 뿌옇게 되는 건 피할 수 없었습니다.

Nearest-Neighbor 확대는 픽셀 하나가 여러 칸으로 복제되어 네모네모한 모양이 됩니다. 픽셀아트나 QR코드에는 오히려 이게 맞지만, 사진에는 최악이죠.

Bicubic 확대는 부드럽지만 2배 정도가 한계고, 3배 이상부터는 눈에 띄게 흐릿해집니다.

AI 업스케일링이 판도를 바꿨습니다. 수백만 장의 이미지로 학습한 신경망이 기존 알고리즘으로는 불가능했던 디테일을 추가합니다. Real-ESRGAN 같은 모델은 4배 확대에서도 원본보다 선명하게 보이는 결과를 내놓기도 합니다. 다만 AI가 추가한 디테일은 추정이지 실제 정보가 아니므로, 과학이나 법의학 등 정확성이 중요한 분야에서는 주의가 필요합니다.

## 비율 유지

크기 조절에서 가장 흔한 실수가 가로세로 비율을 깨뜨리는 겁니다. 4:3 사진을 1:1 정사각형에 억지로 넣으면 얼굴이 납작해지고 원이 타원이 되죠.

항상 비율 잠금을 켜두세요. 너비만 지정하면 높이가 자동 계산되게 하는 겁니다. 인스타그램 1080x1080 같은 특정 비율이 필요하다면, 먼저 그 비율로 자른 다음 크기를 조절하는 게 올바른 순서입니다.

반응형 웹에서는 HTML srcset과 sizes 속성으로 기기별 해상도에 맞는 이미지를 제공하세요. 가장 큰 사이즈로 한 벌만 만들고 브라우저가 알아서 고르게 하면 확대 없이 항상 적절한 크기가 표시됩니다.

## 일괄 크기 조절

여러 이미지를 한 번에 처리할 때는 일관성이 핵심입니다. 목표 크기를 먼저 정하고 모든 이미지에 동일하게 적용하세요. 쇼핑몰 상품 사진을 표준 크기로 맞추거나, 사진 라이브러리의 썸네일을 생성하거나, 반응형 웹용 다중 해상도 이미지를 만드는 작업이 대표적입니다.

모든 이미지에 같은 알고리즘을 쓰는 것도 중요합니다. 섞어 쓰면 결과물의 느낌이 미묘하게 달라집니다. 사진이라면 Lanczos나 Bicubic이 기본 선택이 됩니다.

출력 파일 이름도 체계적으로 정하세요. 크기를 붙이거나(photo-1200x800.jpg) 접미사를 쓰면(photo-thumb.jpg) 나중에 구분이 쉽습니다.

## 실전 팁 정리

원본은 항상 최고 해상도로 보관하세요. 리사이즈한 이미지를 다시 리사이즈하면 화질 저하가 누적됩니다.

샤프닝은 축소 후에 적용합니다. 축소 과정에서 약간 부드러워지는 걸 언샤프 마스크(강도 50~80%, 반경 0.5~1.0)로 보정하면 선명도가 살아납니다.

웹 전달용이라면 크기 조절 + 포맷 최적화를 함께 하세요. 표시할 크기로 정확히 맞춘 뒤 WebP 품질 80~85로 저장하면 용량과 화질 모두 잡을 수 있습니다.`,
      },
    },
  },
  {
    slug: "optimize-images-for-web",
    app: "image",
    category: "tips",
    publishedAt: "2026-03-19",
    content: {
      en: {
        title: "10 Tips to Optimize Images for Web Performance",
        description:
          "Practical strategies to reduce image file sizes and speed up your website — from format selection and compression to lazy loading and responsive delivery.",
        body: `## 1. Choose the Right Format for Each Image

Format selection alone can cut file sizes in half. Use WebP as your default for photographs and complex graphics — it delivers 25-35% smaller files than JPG at equivalent quality. Use SVG for logos, icons, and simple illustrations. Use PNG only when you need pixel-perfect lossless quality with transparency. Consider AVIF for static assets where encoding time is not a constraint, as it can reduce sizes by 50% compared to JPG.

## 2. Resize Images to Display Dimensions

Never serve a 4000-pixel-wide image to display it at 800 pixels. This wastes bandwidth and forces the browser to spend CPU cycles downscaling on the client side. Resize your images to the exact dimensions they will be displayed at. For retina displays, serve images at 2x the CSS display size — a 400px-wide image slot needs an 800px source, not 4000px.

## 3. Compress Thoughtfully

Lossy compression is your most powerful tool. For JPG and WebP, quality settings of 75-85 produce files that look virtually identical to the original but are dramatically smaller. Going below 70 saves modest additional bytes but introduces visible artifacts that degrade the user experience.

The key insight is that optimal quality varies by image content. A busy photograph with lots of texture tolerates more compression than a simple graphic with flat colors and sharp edges. If you are processing images in bulk, err on the side of slightly higher quality (80-85) to handle diverse content safely.

## 4. Implement Lazy Loading

Images below the fold — those not visible when the page first loads — should use lazy loading. The native HTML loading="lazy" attribute tells the browser to defer loading offscreen images until the user scrolls near them. This can dramatically reduce initial page weight and improve Largest Contentful Paint (LCP) metrics.

Do not lazy-load your hero image or any above-the-fold content. These should load immediately to avoid visual delays that hurt perceived performance. Use loading="eager" (or simply omit the attribute) for critical above-fold images.

## 5. Serve Responsive Images with srcset

Different devices need different image sizes. A phone with a 375px viewport does not need the same image as a 2560px desktop monitor. Use the HTML srcset attribute to provide multiple resolutions and let the browser pick the best one.

Create image variants at common breakpoints: 320w, 640w, 960w, 1280w, 1920w. Combined with the sizes attribute that tells the browser how wide the image will display at each viewport width, this ensures every device downloads only the pixels it needs.

## 6. Use a Content Delivery Network (CDN)

A CDN caches your images on servers distributed globally, reducing the physical distance between your images and your users. An image hosted on a single server in New York loads slowly for users in Tokyo. That same image on a CDN loads from a nearby edge server in milliseconds.

Many CDNs also offer automatic image optimization — format conversion, resizing, and compression on the fly based on the requesting device. Services like Cloudflare Images, Imgix, and Cloudinary can serve WebP to supporting browsers and JPG to older ones without any changes to your HTML.

## 7. Set Proper Cache Headers

Images rarely change, so they should be cached aggressively. Set Cache-Control headers with long max-age values (at least one year for versioned assets). Use content-based filenames (hero-a3f8b2.webp) or query strings for cache busting when images do change.

Proper caching means returning visitors never re-download images they have already seen. This turns a multi-megabyte page load into a near-instant experience on repeat visits.

## 8. Remove Unnecessary Metadata

Camera photos carry EXIF metadata including camera model, lens settings, GPS coordinates, and timestamps. This metadata can add 10-50 KB per image and provides no value to web visitors. Strip metadata during your optimization pipeline to reduce file sizes. This also removes potentially sensitive location data from photos taken with smartphones.

## 9. Use CSS for Decorative Effects

Drop shadows, rounded corners, gradients, and simple patterns should be CSS, not images. A gradient background as CSS is zero bytes of image data. The same gradient as a PNG might be 20 KB. CSS effects also scale perfectly to any screen size and resolution, adapt to dark mode, and can be animated smoothly.

If you are using images for rounded corners, shadows, or simple geometric patterns, you are almost certainly better off replacing them with CSS.

## 10. Measure and Monitor

Optimization without measurement is guessing. Use Lighthouse, WebPageTest, or Chrome DevTools to audit your image usage. These tools identify oversized images, missing lazy loading, improper formats, and other optimization opportunities.

Set a page weight budget and track it over time. A reasonable target for total image weight on a typical web page is 200-500 KB. If your images exceed this, there are optimization opportunities waiting.

Monitor Core Web Vitals, especially Largest Contentful Paint (LCP), which is directly impacted by image optimization. An LCP under 2.5 seconds is the target for good user experience, and images are the most common LCP element on web pages.`,
      },
      ko: {
        title: "웹 성능을 위한 이미지 최적화 10가지 팁",
        description:
          "포맷 선택, 압축, 지연 로딩, 반응형 이미지까지. 웹사이트 이미지 용량을 줄이고 속도를 높이는 실전 전략을 소개합니다.",
        body: `## 1. 이미지마다 적합한 포맷 고르기

포맷만 잘 바꿔도 파일 크기가 절반으로 줄기도 합니다. 사진과 복잡한 그래픽에는 WebP를 기본으로 쓰세요. 동일 화질에서 JPG보다 25~35% 작습니다. 로고와 아이콘에는 SVG, 투명도가 필요한 무손실 이미지에만 PNG를 쓰면 됩니다. 정적 에셋이라면 AVIF도 고려해볼 만합니다. JPG 대비 50%까지 줄일 수 있거든요.

## 2. 표시 크기에 맞춰 리사이즈

800픽셀로 표시할 이미지를 4000픽셀 그대로 올리는 건 대역폭 낭비이자 브라우저에 불필요한 연산을 시키는 일입니다. 실제 표시 크기에 정확히 맞추세요. 레티나 디스플레이 대응이라면 CSS 표시 크기의 2배면 충분합니다. 400px 자리에는 800px 원본이면 되지, 4000px일 필요 없습니다.

## 3. 압축은 전략적으로

손실 압축이 용량 절감의 핵심입니다. JPG와 WebP 모두 품질 75~85에서 원본과 거의 구분 안 되면서 훨씬 작은 파일을 만들 수 있습니다. 70 아래로 내리면 추가 절감은 미미한데 아티팩트가 눈에 보이기 시작합니다.

이미지 내용에 따라 최적 품질이 다르다는 점이 포인트입니다. 디테일 많은 사진은 압축을 더 견디지만, 단색과 선명한 테두리가 있는 그래픽은 더 민감하게 반응합니다. 일괄 처리라면 80~85로 약간 높게 잡는 게 안전합니다.

## 4. 지연 로딩(Lazy Loading) 적용

페이지 첫 화면에 안 보이는 이미지는 지연 로딩을 걸어야 합니다. HTML의 loading="lazy" 속성만 넣으면 브라우저가 스크롤이 가까워질 때 비로소 이미지를 불러옵니다. 초기 페이지 무게가 줄고 LCP(Largest Contentful Paint) 지표가 개선됩니다.

히어로 이미지나 첫 화면에 보이는 콘텐츠에는 지연 로딩을 걸면 안 됩니다. 이런 이미지는 즉시 로드되어야 체감 속도가 좋습니다.

## 5. srcset으로 반응형 이미지 제공

375px 폰과 2560px 데스크톱 모니터에 같은 이미지를 보낼 이유가 없습니다. srcset 속성으로 여러 해상도를 준비하고 브라우저가 골라 쓰게 하세요.

320w, 640w, 960w, 1280w, 1920w 정도의 변형을 만들고, sizes 속성으로 뷰포트별 표시 너비를 알려주면 각 기기가 필요한 만큼만 다운로드합니다.

## 6. CDN 활용

CDN은 전 세계에 분산된 서버에 이미지를 캐싱합니다. 뉴욕 서버의 이미지를 도쿄에서 불러오면 느리지만, CDN의 근처 에지 서버에서는 거의 즉시 도달합니다.

많은 CDN이 자동 이미지 최적화도 제공합니다. 요청 기기에 맞춰 포맷 변환, 리사이즈, 압축을 실시간으로 처리해주니 HTML 수정 없이도 WebP와 JPG를 자동으로 구분해 서빙할 수 있습니다.

## 7. 캐시 헤더 제대로 설정

이미지는 자주 바뀌지 않으니 공격적으로 캐싱해야 합니다. 버전이 붙은 에셋에는 1년 이상의 max-age를 설정하세요. 파일이 바뀔 때는 콘텐츠 해시 파일명(hero-a3f8b2.webp)이나 쿼리스트링으로 캐시를 갱신하면 됩니다.

제대로 캐싱하면 재방문자는 이미 본 이미지를 다시 다운로드하지 않습니다. 수 메가바이트 페이지가 순식간에 뜨는 경험을 만들 수 있죠.

## 8. 불필요한 메타데이터 제거

카메라 사진에는 카메라 모델, 렌즈 정보, GPS 좌표, 촬영 시각 등 EXIF 메타데이터가 들어 있습니다. 이미지당 10~50KB를 차지하는데 웹 방문자에게는 아무 쓸모 없습니다. 최적화 과정에서 메타데이터를 벗겨내면 용량도 줄고, 스마트폰 촬영 사진의 위치 정보 노출 위험도 사라집니다.

## 9. 장식 효과는 CSS로

그림자, 둥근 모서리, 그라데이션, 단순 패턴은 이미지가 아니라 CSS로 처리해야 합니다. CSS 그라데이션은 이미지 용량이 0이고, 같은 걸 PNG로 만들면 20KB가 넘습니다. CSS 효과는 모든 해상도에서 완벽하게 스케일링되고, 다크모드 전환도 자연스럽고, 애니메이션도 매끄럽습니다.

## 10. 측정하고 모니터링하기

측정 없는 최적화는 감에 의존하는 것입니다. Lighthouse, WebPageTest, Chrome DevTools로 이미지 사용 현황을 점검하세요. 과대 이미지, 누락된 지연 로딩, 부적절한 포맷 등 개선점을 잡아줍니다.

페이지 무게 예산을 정하고 추적하세요. 일반적인 웹 페이지의 이미지 총량은 200~500KB가 적절합니다. Core Web Vitals 중 LCP를 주시하세요. 2.5초 이하가 목표인데, 이미지가 LCP 요소인 경우가 가장 많습니다.`,
      },
    },
  },
  {
    slug: "batch-image-processing",
    app: "image",
    category: "guide",
    publishedAt: "2026-03-21",
    content: {
      en: {
        title: "Batch Image Processing: Convert, Resize, and Compress Multiple Images at Once",
        description:
          "Save hours of repetitive work by processing hundreds of images simultaneously — learn efficient workflows for format conversion, resizing, and compression.",
        body: `## When Batch Processing Saves Your Day

Working with one or two images is quick work. But real-world scenarios frequently involve dozens, hundreds, or thousands of files. An e-commerce store adding 200 new product photos. A photographer delivering 500 edited shots from an event. A marketing team preparing social media assets in 15 different sizes. Doing this manually — open, resize, export, repeat — is not just tedious but a genuine waste of hours.

Batch processing lets you define the operation once and apply it to every file automatically. The time savings scale linearly: what takes 2 minutes per image takes the same 2 minutes for 1,000 images when batched properly.

## Format Conversion at Scale

One of the most common batch operations is converting an entire folder of images from one format to another. Migrating a website from JPG to WebP, converting client-delivered TIFFs to web-ready formats, or turning a folder of PNGs into JPGs for email attachments — these are everyday tasks made painless by batch processing.

The key decision in batch format conversion is quality settings. When converting from a lossless format (PNG, TIFF) to a lossy one (JPG, WebP), you need to choose a compression quality that balances file size and visual fidelity. Quality 80-85 is a safe default for most photographic content. For graphics with text or sharp edges, bump it up to 90-95 or stick with PNG.

When converting between lossy formats (JPG to WebP), avoid recompressing at low quality. Each lossy compression cycle degrades the image further. Convert from the highest-quality source available, and use moderate compression settings to minimize generation loss.

## Batch Resizing Workflows

Resizing images in bulk follows predictable patterns that lend themselves well to automation.

### Fixed Dimensions

The simplest scenario: resize every image to exactly 1200x800 pixels. This works when all images share the same aspect ratio or when you want uniform dimensions regardless of slight cropping. Product photos for a grid layout often use this approach.

### Width or Height Constraint

More flexible: set the width to 1200 pixels and let the height adjust proportionally (or vice versa). This preserves aspect ratios while ensuring consistent sizing along one axis. Blog post images and portfolio galleries typically use width-constrained resizing.

### Percentage Scaling

Reduce all images to 50% of their original dimensions. This is useful when you have images of varying sizes but want to shrink them proportionally — perhaps reducing a batch of screenshots for a presentation.

### Multi-Output

Generate multiple sizes from each input image. One batch run produces thumbnail (200px), medium (600px), large (1200px), and full (2400px) versions. This is essential for responsive web design where each viewport size needs an appropriately sized image.

## Compression Strategy for Batches

When compressing hundreds of images, a one-size-fits-all quality setting might not be optimal. Images with lots of fine detail (landscapes, textured surfaces) handle aggressive compression well because the complexity masks artifacts. Simple images (product photos on white backgrounds, screenshots) show artifacts more readily.

A practical approach is to use a moderately conservative quality setting (80-85 for WebP or JPG) and then spot-check the results. Open 10-20 random files from the batch and verify they look acceptable. If artifacts are visible, increase the quality and reprocess.

Some batch tools offer perceptual quality modes that analyze each image individually and adjust compression to achieve a target visual quality rather than a fixed numeric setting. This produces more consistent perceived quality across diverse image content.

## Naming Conventions That Scale

Batch processing outputs can quickly become chaotic without systematic naming. Establish naming patterns before you start.

Effective patterns include appending the operation (photo-001-1200w.webp), using subfolder organization (originals/, thumbnails/, web/), and maintaining the original filename stem while changing only the extension and adding a size indicator.

Avoid overwriting originals. Always output to a separate directory or use a naming pattern that distinguishes processed files from source files. You will inevitably need to reprocess some images with different settings, and having the originals intact makes this painless.

## Workflow Automation Tips

Chain operations together for maximum efficiency. A single pipeline can resize, convert format, strip metadata, and rename — all in one pass through the file list.

Build reusable presets for common workflows. "Blog post images" might mean: resize to 1200px wide, convert to WebP at quality 82, strip EXIF metadata. Save this as a preset and apply it with one click to any folder of images.

For recurring tasks, set up watched folders. Drop raw images into a designated input folder and have them automatically processed and placed in an output folder. This is particularly valuable for teams where non-technical members need to prepare images regularly.

Validate your output. After batch processing, verify file counts match (no images silently failed), spot-check visual quality, and confirm file sizes are in the expected range. A quick script that lists output files with their dimensions and sizes catches problems before they reach production.`,
      },
      ko: {
        title: "이미지 일괄 처리: 여러 이미지를 한 번에 변환하고 압축하기",
        description:
          "수백 장의 이미지를 동시에 처리해서 반복 작업에 쓰는 시간을 절약하세요. 포맷 변환, 리사이즈, 압축의 효율적인 워크플로를 다룹니다.",
        body: `## 일괄 처리가 필요한 순간

이미지 한두 장은 금방이지만, 현실에서는 수십에서 수천 장을 다루는 경우가 빈번합니다. 쇼핑몰에 상품 사진 200장 등록, 행사 촬영본 500장 납품, 마케팅팀에서 15가지 크기의 SNS 에셋 제작 — 이걸 하나씩 열어서 처리하면 몇 시간이고 날아갑니다.

일괄 처리는 작업을 한 번 정의하면 모든 파일에 자동 적용됩니다. 이미지 1장에 2분 걸리는 작업이 1,000장이어도 사실상 같은 시간이면 끝납니다.

## 포맷 변환 대량 작업

가장 흔한 일괄 작업 중 하나가 폴더 전체의 포맷을 바꾸는 것입니다. 사이트의 JPG를 WebP로 마이그레이션하거나, 클라이언트가 보낸 TIFF를 웹용으로 바꾸거나, PNG 묶음을 이메일용 JPG로 만들거나.

핵심 결정은 품질 설정입니다. 무손실(PNG, TIFF)에서 손실(JPG, WebP)로 변환할 때는 용량과 화질의 균형점을 잡아야 합니다. 사진이라면 품질 80~85가 무난합니다. 텍스트나 선명한 경계가 있는 그래픽은 90~95 또는 PNG 유지가 낫습니다.

손실 포맷 간 변환(JPG→WebP)에서는 낮은 품질로 재압축하면 안 됩니다. 손실 압축을 반복할 때마다 화질이 떨어지니까요. 가능한 최고 품질의 원본에서 변환하고, 중간 정도의 압축 설정을 쓰는 게 좋습니다.

## 일괄 리사이즈 패턴

이미지를 대량으로 리사이즈하는 패턴은 몇 가지로 나뉩니다.

### 고정 크기

모든 이미지를 1200x800으로 통일하는 방식입니다. 비율이 같은 이미지들이거나, 약간의 크롭을 감수하고 균일한 크기가 필요할 때 적합합니다. 쇼핑몰 상품 그리드가 대표적인 예입니다.

### 한 축 기준

너비를 1200px로 고정하고 높이는 비율에 맞춰 자동 조정하는 방식입니다. 비율이 유지되면서 한 축은 일관됩니다. 블로그 글 이미지나 포트폴리오 갤러리에서 많이 씁니다.

### 비율 축소

원본의 50%로 일괄 줄이는 방식입니다. 크기가 제각각인 이미지를 비례적으로 줄여야 할 때 유용합니다. 프레젠테이션용 스크린샷을 줄이는 경우가 전형적이죠.

### 다중 출력

하나의 입력에서 여러 크기를 동시에 생성합니다. 한 번의 실행으로 썸네일(200px), 중간(600px), 큰(1200px), 풀사이즈(2400px) 버전이 나옵니다. 반응형 웹 디자인에서 뷰포트별 적절한 크기가 필요할 때 필수적인 방식입니다.

## 대량 압축 전략

수백 장을 압축할 때 단일 품질 설정이 최적이 아닐 수 있습니다. 디테일이 많은 풍경 사진은 공격적인 압축에도 아티팩트가 잘 안 보이지만, 흰 배경의 상품 사진이나 스크린샷에는 같은 설정에서 더 눈에 띕니다.

현실적인 방법은 보수적인 품질(80~85)로 먼저 처리하고, 무작위로 10~20장 열어서 확인하는 겁니다. 아티팩트가 보이면 품질을 올려서 재처리하면 됩니다.

일부 도구는 지각적 품질 모드를 제공합니다. 고정 숫자가 아니라 각 이미지를 분석해서 목표 시각 품질에 맞는 압축률을 자동으로 적용합니다. 다양한 이미지가 섞여 있을 때 더 일관된 결과를 냅니다.

## 파일 이름 규칙

이름 규칙 없이 일괄 처리하면 금세 혼란에 빠집니다. 시작하기 전에 패턴을 정하세요.

작업 내용을 이름에 반영하거나(photo-001-1200w.webp), 하위 폴더로 분류하거나(originals/, thumbnails/, web/), 원본 파일명을 유지하면서 확장자와 크기 표시만 바꾸는 방식이 효과적입니다.

원본을 덮어쓰지 마세요. 항상 별도 디렉터리에 출력하거나, 처리된 파일임을 구분할 수 있는 이름 패턴을 쓰세요.

## 자동화 팁

작업을 체이닝하면 효율이 극대화됩니다. 리사이즈, 포맷 변환, 메타데이터 제거, 이름 변경을 한 번의 파이프라인으로 처리할 수 있습니다.

자주 쓰는 워크플로는 프리셋으로 만들어 두세요. "블로그 이미지"라면 1200px 리사이즈, WebP 품질 82, EXIF 제거를 한 묶음으로 저장해서 클릭 한 번으로 적용하면 됩니다.

반복 작업에는 감시 폴더도 유용합니다. 입력 폴더에 원본을 넣으면 자동으로 처리되어 출력 폴더에 나타나게 하면, 비기술 팀원도 편하게 이미지를 준비할 수 있습니다.

처리 후에는 반드시 검증하세요. 파일 수가 맞는지, 시각 품질은 괜찮은지, 용량이 예상 범위 안에 있는지 확인합니다. 출력 파일의 크기와 용량을 나열하는 간단한 스크립트만으로도 문제를 사전에 잡을 수 있습니다.`,
      },
    },
  },
  {
    slug: "image-metadata-exif",
    app: "image",
    category: "knowledge",
    publishedAt: "2026-03-23",
    content: {
      en: {
        title: "Understanding Image Metadata and EXIF Data",
        description:
          "Learn what information is hidden inside your image files, how EXIF data works, why it matters for privacy, and when you should strip it.",
        body: `## What Lives Inside Your Images

Every digital photograph carries more than just pixel data. Embedded within the file is a rich layer of metadata — structured information describing how, when, where, and with what equipment the image was created. This metadata is invisible when you view the image but is readily accessible to anyone who examines the file, and it can reveal far more about you than you might expect.

The most common metadata standard for photographs is EXIF (Exchangeable Image File Format), developed by the Japan Electronic Industries Development Association. First standardized in 1995, EXIF has become the universal language for camera metadata and is supported by virtually every digital camera, smartphone, and image editing application.

## What EXIF Contains

EXIF data can include dozens of fields, but the most common ones fall into several categories.

### Camera Information

Camera make and model, lens type and focal length, serial number. This tells anyone examining the file exactly what equipment you used. For photographers, this is useful for organizing and searching their archives. For privacy, it means your specific camera model is attached to every photo you share.

### Exposure Settings

Shutter speed, aperture (f-stop), ISO sensitivity, exposure compensation, metering mode, flash status. These technical details help photographers analyze their shooting technique and reproduce successful results. Photo enthusiasts frequently examine EXIF data of images they admire to learn what settings produced a particular look.

### Date and Time

The exact moment the photo was taken, typically accurate to the second. This includes the camera's time zone setting, the original capture time, and the time the file was last modified. Date stamps are useful for chronological organization but also create a detailed timeline of your activities if multiple geotagged photos are analyzed together.

### GPS Coordinates

This is the most privacy-sensitive piece of EXIF data. Smartphones and GPS-equipped cameras embed precise latitude and longitude coordinates in every photograph. This means a photo of your living room contains your home address. A photo taken at your workplace pinpoints where you work. A series of vacation photos maps your exact itinerary.

Many people are unaware that their phones are embedding location data in every image they capture. When these photos are shared on social media, messaging apps, or file-sharing platforms, the GPS data may travel with them — depending on how the platform handles metadata.

### Thumbnail

EXIF data often includes a small thumbnail preview image. Here is where things get interesting: the thumbnail is generated at capture time and may not reflect subsequent edits. If you crop or edit a photo but the application does not update the EXIF thumbnail, the original uncropped image can still be viewed by extracting the thumbnail. This has been the source of several notable privacy incidents.

## The Privacy Problem

EXIF metadata creates real privacy risks that most users never consider.

Location tracking is the most obvious concern. If you post geotagged photos online, anyone can extract the coordinates and determine where you live, work, eat, shop, and travel. Stalking, burglary targeting, and doxxing have all been facilitated by publicly available EXIF location data.

Even without GPS data, metadata reveals patterns. Camera serial numbers link photos to a specific device (and by extension, a specific person). Timestamps create a log of your activities. Camera model information can help identify which photos came from the same person across different platforms.

## When to Strip Metadata

Strip EXIF data when sharing photos publicly on websites, forums, or social media (many platforms do this automatically, but not all). Remove it when sending images to strangers or posting on classified ad sites — a photo of furniture for sale should not reveal your home's GPS coordinates. Always strip metadata from images used on commercial websites, both for privacy and to reduce file sizes.

Keep metadata when organizing your personal photo library (dates, camera info, and GPS data are incredibly useful for searching and sorting your own photos). Retain it when delivering professional photography to clients (they may need the technical information). Preserve it for archival purposes where the provenance and context of the image matters.

## The Orientation Tag Problem

One commonly misunderstood piece of EXIF metadata is the orientation tag. When you hold your phone vertically and take a photo, the camera sensor always captures the image in its native landscape orientation. An EXIF orientation tag is then set to indicate how the image should be rotated when displayed.

The problem arises when software ignores this tag. An image that looks correct in your phone's gallery might appear sideways or upside down when uploaded to a website, embedded in an email, or opened in certain applications. This is not because the image is corrupted — it is because the viewing software is not reading the EXIF orientation tag.

The robust solution is to apply the rotation to the actual pixel data (lossless rotation) and reset the orientation tag to "normal." This ensures the image displays correctly everywhere, regardless of whether the viewing software respects EXIF orientation. Most modern image processing tools offer this as an automatic option.

## How to View and Edit Metadata

On desktop systems, right-clicking an image and viewing its properties often shows basic EXIF data. For comprehensive viewing, dedicated tools provide full access to all metadata fields and allow editing or removal.

For bulk metadata removal, command-line tools are the most efficient approach. They can process entire directories of images in seconds, stripping all metadata while leaving the pixel data untouched.

Browser-based tools offer the most accessible approach for occasional use. Upload an image, view its metadata, optionally strip it, and download the clean version — all without installing anything. This is particularly useful for quickly checking whether a specific photo contains GPS data before sharing it.`,
      },
      ko: {
        title: "이미지 메타데이터와 EXIF 데이터 이해하기",
        description:
          "이미지 파일 안에 숨어 있는 정보, EXIF의 작동 원리, 프라이버시 위험, 메타데이터를 제거해야 할 때를 알아봅니다.",
        body: `## 이미지 안에 숨어 있는 것들

디지털 사진에는 픽셀 데이터만 들어있는 게 아닙니다. 언제, 어디서, 어떤 장비로 촬영했는지를 담은 메타데이터가 함께 저장되어 있습니다. 이미지를 볼 때는 안 보이지만, 파일을 열어보면 누구든 확인할 수 있고, 생각보다 많은 개인 정보를 드러냅니다.

사진 메타데이터의 표준은 EXIF(Exchangeable Image File Format)입니다. 1995년 일본전자공업진흥협회가 처음 표준화했고, 지금은 거의 모든 디지털 카메라와 스마트폰, 이미지 편집 앱이 지원합니다.

## EXIF에 뭐가 담겨 있나

EXIF 데이터에는 수십 가지 항목이 들어갈 수 있는데, 주요 범주는 이렇습니다.

### 카메라 정보

카메라 제조사와 모델, 렌즈 종류와 초점 거리, 시리얼 넘버. 어떤 장비를 썼는지가 고스란히 기록됩니다. 사진가에게는 아카이브 정리에 유용하지만, 공유하는 모든 사진에 내 카메라 모델이 따라붙는다는 뜻이기도 합니다.

### 촬영 설정

셔터 속도, 조리개, ISO 감도, 노출 보정, 측광 모드, 플래시 사용 여부. 사진 애호가들이 좋은 사진의 EXIF를 뜯어보면서 어떤 설정이 그런 결과를 냈는지 공부하는 데 많이 활용됩니다.

### 날짜와 시간

촬영 시각이 초 단위까지 기록됩니다. 타임존 설정, 원본 촬영 시간, 마지막 수정 시간이 모두 포함됩니다. 사진 정리에는 편하지만, 위치 태그와 결합하면 내 활동의 상세한 타임라인이 만들어집니다.

### GPS 좌표

프라이버시 측면에서 가장 민감한 항목입니다. 스마트폰과 GPS 장착 카메라는 모든 사진에 정확한 위도·경도를 심습니다. 거실에서 찍은 사진에 집 주소가 들어가고, 직장에서 찍은 사진에 근무지가 박힙니다. 여행 사진 모음은 내 동선을 그대로 보여줍니다.

대부분의 사람이 자기 폰이 매 사진마다 위치를 기록하고 있다는 걸 인식하지 못합니다. 이 사진을 SNS나 메신저로 공유하면, 플랫폼이 메타데이터를 지워주지 않는 한 GPS 데이터도 함께 전달됩니다.

### 썸네일

EXIF에는 작은 미리보기 이미지도 포함되는데, 여기서 흥미로운 문제가 생깁니다. 썸네일은 촬영 시점에 생성되어서, 이후에 사진을 자르거나 편집해도 업데이트되지 않는 경우가 있습니다. 크롭한 사진의 EXIF 썸네일을 추출하면 원본 전체가 보이는 거죠. 실제로 이런 사례가 프라이버시 사고로 이어진 적이 여러 번 있습니다.

## 프라이버시 문제

EXIF 메타데이터는 대부분의 사용자가 생각지 못하는 실질적인 개인정보 위험을 만듭니다.

위치 추적이 가장 명확한 우려입니다. 위치가 태그된 사진을 온라인에 올리면 누구든 좌표를 뽑아서 거주지, 직장, 이동 경로를 파악할 수 있습니다. 스토킹, 빈집 타겟팅, 신상 공개가 공개된 EXIF 위치 데이터로 실제로 일어난 바 있습니다.

GPS 없이도 메타데이터는 패턴을 드러냅니다. 카메라 시리얼 넘버로 여러 사진을 동일 기기(=동일 인물)에 연결할 수 있고, 타임스탬프로 활동 기록이 만들어지고, 카메라 모델 정보로 여러 플랫폼에 올린 사진들이 한 사람 것인지 식별할 수 있습니다.

## 메타데이터를 지워야 할 때

공개적으로 사진을 올릴 때는 EXIF를 지우세요. 웹사이트, 포럼, SNS 모두 해당됩니다(일부 플랫폼은 자동으로 제거하지만 전부는 아닙니다). 모르는 사람에게 이미지를 보낼 때, 중고거래 사이트에 사진을 올릴 때도 마찬가지입니다. 판매할 가구 사진에 집 좌표가 들어 있을 필요는 없으니까요. 상업 웹사이트 이미지에서도 프라이버시와 용량 감소 두 가지 이유로 제거하는 게 좋습니다.

유지해야 할 때도 있습니다. 개인 사진 라이브러리를 정리할 때(날짜, 카메라, GPS가 검색과 분류에 유용), 전문 사진을 클라이언트에게 납품할 때(기술 정보가 필요할 수 있음), 이미지의 출처와 맥락이 중요한 아카이브 목적일 때입니다.

## 방향 태그 문제

잘 오해되는 EXIF 항목 중 하나가 방향(orientation) 태그입니다. 폰을 세로로 들고 찍어도 카메라 센서는 항상 가로 방향으로 촬영합니다. 대신 EXIF 방향 태그를 설정해서 표시할 때 어떻게 회전해야 하는지를 알려주는 거죠.

문제는 이 태그를 무시하는 소프트웨어가 있다는 겁니다. 폰 갤러리에서는 제대로 보이던 사진이 웹사이트에 올리거나 이메일에 첨부하면 옆으로 눕거나 뒤집힙니다. 이미지가 깨진 게 아니라 보는 쪽에서 방향 태그를 안 읽는 겁니다.

확실한 해결책은 실제 픽셀 데이터에 회전을 적용(무손실 회전)하고 방향 태그를 "정상"으로 리셋하는 것입니다. 이러면 어떤 소프트웨어에서 열어도 올바르게 표시됩니다. 대부분의 현대 이미지 처리 도구가 이 기능을 자동 옵션으로 제공합니다.

## 메타데이터 확인과 편집

데스크톱에서 이미지를 우클릭해서 속성을 보면 기본적인 EXIF가 나옵니다. 모든 항목을 보려면 전용 도구가 필요하고, 편집이나 제거도 가능합니다.

대량 제거에는 커맨드라인 도구가 가장 빠릅니다. 디렉터리 전체의 이미지를 수 초 만에 처리하면서 픽셀 데이터는 건드리지 않습니다.

브라우저 기반 도구는 간헐적 사용에 가장 접근성이 좋습니다. 이미지를 업로드하고, 메타데이터를 확인하고, 필요하면 제거한 뒤 다운로드하면 됩니다. 아무것도 설치할 필요 없이 특정 사진에 GPS가 있는지 빠르게 확인하고 싶을 때 유용합니다.`,
      },
    },
  },
  {
    slug: "understanding-character-encoding",
    app: "text",
    category: "knowledge",
    publishedAt: "2026-03-20",
    content: {
      en: {
        title: "Understanding Character Encoding: UTF-8, ASCII, and Unicode Explained",
        description:
          "A deep dive into how computers represent text — from the origins of ASCII to the triumph of UTF-8 and why character encoding still matters today.",
        body: `## Why Characters Need Encoding

Computers store everything as numbers. When you type the letter "A" on your keyboard, the computer does not store the shape of the letter — it stores a number that represents it. The system that maps characters to numbers is called a character encoding. Getting this mapping wrong is how you end up with garbled text, question marks where accents should be, or the infamous diamond-with-a-question-mark symbol that haunts poorly configured websites.

Understanding encoding is not just an academic exercise. If you have ever pasted text from one application into another and watched special characters turn into gibberish, you have experienced an encoding mismatch firsthand. Knowing the basics helps you avoid these problems and fix them when they appear.

## ASCII: Where It All Started

The American Standard Code for Information Interchange, or ASCII, was published in 1963. It assigns numbers 0 through 127 to 128 characters, covering the English alphabet (uppercase and lowercase), digits 0 through 9, punctuation marks, and a set of control characters like tab, newline, and carriage return.

ASCII was elegant in its simplicity. Seven bits were enough to represent every character, and it worked perfectly for English text. The problem was obvious: the world has far more than 128 characters. Languages like French, German, and Spanish need accented letters. Chinese, Japanese, and Korean use thousands of distinct characters. Arabic and Hebrew are written right to left. ASCII had no room for any of this.

## The Code Page Era

To handle characters beyond ASCII, vendors created extended character sets known as code pages. These used the 8th bit (values 128 through 255) to add 128 more characters. ISO 8859-1 (Latin-1) covered Western European languages. ISO 8859-5 handled Cyrillic. Shift_JIS and EUC-JP served Japanese text. Windows had its own variations, like Windows-1252.

The fundamental problem with code pages was that the same byte value meant different characters in different encodings. Byte 0xC0 might be "A with grave accent" in Latin-1 but a completely different character in a Cyrillic encoding. If you opened a file without knowing which code page was used, you got mojibake — scrambled, unreadable text.

This was not a minor inconvenience. It created real barriers to international communication, data exchange, and software development. Every application had to track which encoding each piece of text used, and mistakes were frequent.

## Unicode: One Number for Every Character

The Unicode Consortium set out to solve this problem permanently by assigning a unique number — called a code point — to every character in every writing system. The first version in 1991 covered roughly 7,000 characters. Today, Unicode 15.1 defines over 149,000 characters spanning 161 scripts, plus thousands of symbols, technical marks, and emoji.

Unicode code points are written in the format U+XXXX, where XXXX is a hexadecimal number. U+0041 is the Latin capital letter A. U+4E16 is the Chinese character meaning "world." U+1F600 is the grinning face emoji. Every character has exactly one code point, no matter which platform or application you use.

But Unicode is a character set, not an encoding. It tells you what number represents each character. It does not specify how those numbers should be stored as bytes in a file. That is where encoding formats like UTF-8, UTF-16, and UTF-32 come in.

## UTF-8: The Encoding That Won

UTF-8, designed by Ken Thompson and Rob Pike in 1992, encodes Unicode code points using one to four bytes. Its brilliance lies in backward compatibility: ASCII characters (U+0000 through U+007F) use exactly one byte, and that byte is identical to its ASCII value. This means any valid ASCII file is also a valid UTF-8 file with no conversion needed.

Characters beyond ASCII use multi-byte sequences. Latin accented characters and many symbols use two bytes. Characters from most Asian scripts use three bytes. Emoji and rare historical scripts use four bytes. The first byte of a multi-byte sequence tells the decoder how many bytes to expect, making the format self-synchronizing — you can jump to any point in a UTF-8 stream and find the start of the next character without reading from the beginning.

UTF-8 has become the dominant encoding on the internet. As of 2024, over 98 percent of all web pages use UTF-8. It is the default encoding in HTML5, JSON, XML, and most modern programming languages. When you create a new file today, UTF-8 is almost certainly the right choice.

## UTF-16 and UTF-32

UTF-16 uses two bytes for characters in the Basic Multilingual Plane (code points up to U+FFFF) and four bytes for characters beyond that range. Java and JavaScript use UTF-16 internally, which is why string length in these languages sometimes gives unexpected results for emoji — a single emoji might count as two "characters" because it requires a surrogate pair.

UTF-32 uses exactly four bytes for every character. This makes random access simple — the 50th character is always at byte offset 200 — but wastes significant space for text that is primarily ASCII or Latin-based. UTF-32 is rarely used for file storage or transmission.

## Why Encoding Still Matters

Even in a world converging on UTF-8, encoding problems persist. Legacy systems still produce files in older encodings. CSV exports from some spreadsheet applications default to the system locale encoding rather than UTF-8. Database columns might be configured with a specific encoding that does not match the application layer. Email headers can specify one encoding while the body uses another.

The Byte Order Mark (BOM) adds another layer of complexity. Some applications prepend the bytes EF BB BF to UTF-8 files. While the Unicode standard permits this, it causes problems with Unix tools, JSON parsers, and shell scripts that do not expect invisible bytes at the start of a file.

When working with text, always verify which encoding you are using. Specify UTF-8 explicitly when creating files, opening database connections, or sending HTTP responses. When receiving text from external sources, check the declared encoding before processing.

## Practical Takeaways

Use UTF-8 for everything new. There is no reason to choose any other encoding for new projects, files, or databases. If you encounter garbled text, the most likely cause is an encoding mismatch — the file was written in one encoding and read in another. Tools that convert between encodings can fix existing files, but the long-term solution is always to standardize on UTF-8.

Character encoding is invisible infrastructure. When it works, nobody notices. When it breaks, text becomes unreadable. Understanding how it works puts you in a position to prevent problems before they happen and diagnose them quickly when they do.`,
      },
      ko: {
        title: "문자 인코딩 이해하기: UTF-8, ASCII, 유니코드 완전 정복",
        description:
          "컴퓨터가 텍스트를 표현하는 원리를 파헤칩니다. ASCII의 탄생부터 UTF-8의 승리까지, 문자 인코딩이 왜 지금도 중요한지 알아보세요.",
        body: `## 문자에 인코딩이 필요한 이유

컴퓨터는 모든 것을 숫자로 저장합니다. 키보드에서 "A"를 입력하면 컴퓨터는 글자의 모양이 아니라 그 글자를 나타내는 숫자를 저장합니다. 문자를 숫자에 대응시키는 체계가 바로 문자 인코딩입니다. 이 대응이 어긋나면 깨진 글자, 악센트 자리에 물음표, 혹은 설정 잘못된 웹사이트의 상징과도 같은 다이아몬드 속 물음표 기호를 만나게 됩니다.

한 프로그램에서 다른 프로그램으로 텍스트를 붙여넣었더니 특수문자가 의미 불명의 기호로 변한 경험이 있다면, 인코딩 불일치를 직접 겪은 겁니다. 기본 원리를 알면 이런 문제를 예방하고, 발생했을 때 빠르게 해결할 수 있습니다.

## ASCII: 모든 것의 시작

ASCII(American Standard Code for Information Interchange)는 1963년에 공개되었습니다. 0부터 127까지의 숫자에 128개의 문자를 배정합니다. 영문 대소문자, 숫자 0~9, 구두점, 그리고 탭·줄바꿈·캐리지 리턴 같은 제어 문자가 포함됩니다.

ASCII는 단순함 속에 우아함이 있었습니다. 7비트면 모든 문자를 표현할 수 있었고, 영어 텍스트에는 완벽했습니다. 하지만 세계에는 128개보다 훨씬 많은 문자가 있습니다. 프랑스어, 독일어, 스페인어에는 악센트 문자가 필요하고, 중국어·일본어·한국어는 수천 개의 고유한 글자를 사용합니다. 아랍어와 히브리어는 오른쪽에서 왼쪽으로 씁니다. ASCII에는 이 모든 것을 담을 여유가 없었습니다.

## 코드 페이지 시대

ASCII를 넘어서는 문자를 다루기 위해 각 벤더는 코드 페이지라는 확장 문자 집합을 만들었습니다. 8번째 비트(128~255)를 활용해 128개의 문자를 더 추가하는 방식입니다. ISO 8859-1(Latin-1)은 서유럽 언어를, ISO 8859-5는 키릴 문자를, Shift_JIS와 EUC-JP는 일본어를 담당했습니다. 윈도우에는 Windows-1252 같은 자체 변형이 있었습니다.

코드 페이지의 근본적인 문제는 같은 바이트 값이 인코딩에 따라 다른 문자를 뜻한다는 점이었습니다. 0xC0이 Latin-1에서는 "그레이브 악센트가 붙은 A"이지만, 키릴 인코딩에서는 전혀 다른 문자입니다. 어떤 코드 페이지가 사용되었는지 모르고 파일을 열면 모지바케(문자 깨짐)가 발생합니다.

이것은 사소한 불편이 아니었습니다. 국제 커뮤니케이션, 데이터 교환, 소프트웨어 개발에 실질적인 장벽을 만들었습니다.

## 유니코드: 모든 문자에 하나의 번호

유니코드 컨소시엄은 이 문제를 영구적으로 해결하기 위해, 모든 문자 체계의 모든 문자에 고유한 번호 — 코드 포인트 — 를 부여하기로 했습니다. 1991년 첫 버전은 약 7,000자를 다뤘고, 현재 유니코드 15.1은 161개 스크립트에 걸쳐 149,000자 이상과 수천 개의 기호, 이모지를 정의합니다.

유니코드 코드 포인트는 U+XXXX 형식으로 표기합니다. U+0041은 라틴 대문자 A, U+AC00은 한글 "가", U+1F600은 활짝 웃는 이모지입니다. 플랫폼이나 애플리케이션에 관계없이 모든 문자에 정확히 하나의 코드 포인트가 대응됩니다.

하지만 유니코드는 문자 집합이지, 인코딩이 아닙니다. 어떤 숫자가 어떤 문자를 나타내는지 알려줄 뿐, 그 숫자를 파일에 어떤 바이트로 저장할지는 정하지 않습니다. 그 역할을 하는 것이 UTF-8, UTF-16, UTF-32 같은 인코딩 형식입니다.

## UTF-8: 승리한 인코딩

UTF-8은 1992년 켄 톰프슨과 롭 파이크가 설계했으며, 유니코드 코드 포인트를 1~4바이트로 인코딩합니다. 핵심은 하위 호환성입니다. ASCII 문자(U+0000~U+007F)는 정확히 1바이트를 사용하며, 그 바이트 값은 ASCII와 동일합니다. 즉, 유효한 ASCII 파일은 변환 없이 그대로 유효한 UTF-8 파일이 됩니다.

ASCII를 넘어서는 문자는 다중 바이트 시퀀스를 사용합니다. 라틴 악센트 문자와 많은 기호는 2바이트, 대부분의 아시아 문자(한글 포함)는 3바이트, 이모지와 희귀 역사 스크립트는 4바이트입니다. 첫 번째 바이트가 후속 바이트 수를 알려주므로, 스트림의 어느 지점에서든 다음 문자의 시작점을 찾을 수 있습니다.

UTF-8은 인터넷에서 지배적인 인코딩이 되었습니다. 2024년 기준 전 세계 웹 페이지의 98% 이상이 UTF-8을 사용합니다. HTML5, JSON, XML, 대부분의 현대 프로그래밍 언어에서 기본 인코딩입니다. 오늘 새 파일을 만든다면 UTF-8이 거의 확실한 정답입니다.

## UTF-16과 UTF-32

UTF-16은 기본 다국어 평면(U+FFFF 이하)의 문자에 2바이트, 그 이상의 문자에 4바이트를 사용합니다. 자바와 자바스크립트는 내부적으로 UTF-16을 사용하는데, 이모지 하나가 서로게이트 쌍을 필요로 해서 문자열 길이가 예상과 다르게 나오는 이유가 여기에 있습니다.

UTF-32는 모든 문자에 정확히 4바이트를 사용합니다. 50번째 문자가 항상 바이트 오프셋 200에 있으므로 임의 접근이 간단하지만, ASCII나 라틴 기반 텍스트에는 공간 낭비가 심합니다. 파일 저장이나 전송에 UTF-32를 쓰는 경우는 드뭅니다.

## 인코딩이 여전히 중요한 이유

UTF-8으로 수렴하는 세상에서도 인코딩 문제는 계속됩니다. 레거시 시스템은 여전히 오래된 인코딩으로 파일을 생성합니다. 일부 스프레드시트의 CSV 내보내기는 UTF-8이 아닌 시스템 로캘 인코딩을 기본값으로 사용합니다. 데이터베이스 컬럼의 인코딩이 애플리케이션 레이어와 맞지 않을 수 있고, 이메일 헤더와 본문의 인코딩이 다를 수도 있습니다.

텍스트를 다룰 때는 항상 어떤 인코딩을 사용하고 있는지 확인하세요. 파일 생성, DB 연결, HTTP 응답 전송 시 UTF-8을 명시적으로 지정하세요. 외부에서 받은 텍스트는 처리 전에 선언된 인코딩을 반드시 확인하세요.

## 핵심 정리

새 프로젝트, 파일, 데이터베이스에는 UTF-8을 쓰세요. 다른 인코딩을 선택할 이유가 없습니다. 깨진 텍스트를 만났다면 인코딩 불일치가 원인일 가능성이 가장 높습니다. 인코딩 변환 도구로 기존 파일을 수정할 수 있지만, 장기적인 해결책은 항상 UTF-8 표준화입니다.

문자 인코딩은 보이지 않는 인프라입니다. 제대로 작동하면 아무도 눈치채지 못하고, 깨지면 텍스트가 읽을 수 없게 됩니다. 작동 원리를 이해하면 문제를 예방하고, 발생했을 때 빠르게 진단할 수 있습니다.`,
      },
    },
  },
  {
    slug: "regex-guide-for-beginners",
    app: "text",
    category: "guide",
    publishedAt: "2026-03-22",
    content: {
      en: {
        title: "Regular Expressions Made Simple: A Practical Guide",
        description:
          "Learn the fundamentals of regular expressions with clear explanations and practical examples you can use immediately for text searching, validation, and transformation.",
        body: `## What Are Regular Expressions?

A regular expression — regex for short — is a sequence of characters that defines a search pattern. Think of it as a small specialized language for describing text patterns. Instead of searching for a specific word, you can search for a pattern like "any word that starts with a capital letter and ends with ing" or "a sequence of exactly five digits."

Regular expressions appear in almost every programming language, text editor, command-line tool, and search interface that handles text. Learning the basics gives you a powerful tool that transfers across environments and will serve you for your entire career.

## Literal Characters and Metacharacters

The simplest regex is just a literal string. The pattern \`hello\` matches the text "hello" wherever it appears. But the real power comes from metacharacters — characters that have special meaning in regex syntax.

The dot \`.\` matches any single character except a newline. So \`h.t\` matches "hat," "hot," "hit," and even "h3t." The caret \`^\` matches the start of a line, and the dollar sign \`$\` matches the end. The pattern \`^Hello\` only matches "Hello" when it appears at the beginning of a line.

Square brackets \`[]\` define a character class — a set of characters where any single one can match. \`[aeiou]\` matches any vowel. \`[0-9]\` matches any digit. \`[A-Za-z]\` matches any English letter. Adding a caret inside the brackets negates the class: \`[^0-9]\` matches any character that is not a digit.

## Quantifiers

Quantifiers control how many times a pattern element can repeat. The asterisk \`*\` means "zero or more times." The plus \`+\` means "one or more times." The question mark \`?\` means "zero or one time" — making the preceding element optional.

Curly braces let you specify exact counts. \`a{3}\` matches exactly three consecutive "a" characters. \`a{2,5}\` matches between two and five. \`a{3,}\` matches three or more.

Combining these with character classes is where patterns become truly useful. \`[0-9]{3}-[0-9]{4}\` matches a pattern like "555-1234." \`[A-Z][a-z]+\` matches a capitalized word.

## Common Shorthand Classes

Typing \`[0-9]\` repeatedly gets tedious, so regex provides shorthand classes. \`\\d\` matches any digit (equivalent to \`[0-9]\`). \`\\w\` matches any "word character" — letters, digits, and underscores. \`\\s\` matches any whitespace character — spaces, tabs, and newlines.

Each of these has an uppercase negation. \`\\D\` matches anything that is not a digit. \`\\W\` matches non-word characters. \`\\S\` matches non-whitespace.

## Grouping and Alternation

Parentheses \`()\` create groups. Groups serve two purposes: they let you apply quantifiers to multi-character sequences, and they capture matched text for later reference.

The pattern \`(ha)+\` matches "ha," "haha," "hahaha," and so on — the plus applies to the entire group, not just the last character. Without parentheses, \`ha+\` would match "ha," "haa," "haaa" — the plus would only apply to the "a."

The pipe character \`|\` provides alternation — an "or" operation. \`cat|dog\` matches either "cat" or "dog." Combined with groups, \`(cat|dog) food\` matches "cat food" or "dog food."

## Practical Examples You Can Use Today

**Email validation (basic):** \`^[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}$\`
This matches a string that starts with word characters, dots, plus signs, or hyphens, followed by @, a domain name, a dot, and a top-level domain of at least two letters.

**Phone number extraction:** \`\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}\`
This matches phone numbers in formats like (555) 123-4567, 555-123-4567, 555.123.4567, and 5551234567.

**URL detection:** \`https?://[\\w\\-]+(\\.[\\w\\-]+)+[/\\w\\-._~:?#@!$&'()*+,;=]*\`
This matches HTTP and HTTPS URLs with domain names and optional paths.

**Date formats:** \`\\d{4}[-/]\\d{2}[-/]\\d{2}\`
This matches dates in YYYY-MM-DD or YYYY/MM/DD format.

**Remove HTML tags:** \`<[^>]+>\`
This matches any HTML tag for removal — useful for quick text extraction, though a proper HTML parser is better for complex documents.

## Anchors and Boundaries

Beyond \`^\` and \`$\` for line boundaries, the word boundary \`\\b\` is extremely useful. It matches the position between a word character and a non-word character. \`\\bcat\\b\` matches "cat" as a whole word but not "category" or "concatenate."

This is essential for find-and-replace operations where you need to match whole words only. Without word boundaries, replacing "he" in a document would also affect "the," "she," "here," and every other word containing those letters.

## Greedy vs. Lazy Matching

By default, quantifiers are greedy — they match as much text as possible. In the string "start middle end," the pattern \`start.*end\` matches the entire string because \`.*\` grabs everything it can before giving back just enough for "end" to match.

Adding a question mark after a quantifier makes it lazy — it matches as little as possible. \`start.*?end\` would match "start middle end" but stop at the first "end" rather than the last.

This distinction matters when extracting content between delimiters. If you are trying to match individual HTML tags, a greedy \`<.*>\` would match from the first \`<\` to the last \`>\` in the line, swallowing everything in between. A lazy \`<.*?>\` matches each tag individually.

## Tips for Writing Better Regex

Start simple and add complexity. Write a pattern that matches your target, test it, then refine to exclude false positives. Trying to write a perfect regex in one shot usually fails.

Use online regex testers. Tools like regex101.com show real-time matches, explain each part of your pattern, and highlight capture groups. They accelerate learning enormously.

Comment complex patterns. Most regex engines support a verbose mode where you can add whitespace and comments. Use it for any pattern longer than a few characters.

Know when not to use regex. Parsing nested structures like HTML, JSON, or programming languages is generally a job for proper parsers, not regular expressions. Regex works best for flat patterns in text.`,
      },
      ko: {
        title: "정규식 쉽게 배우기: 실전 가이드",
        description:
          "텍스트 검색, 유효성 검사, 변환에 바로 활용할 수 있는 정규 표현식의 기본기를 명확한 설명과 실용 예제로 배워보세요.",
        body: `## 정규식이란?

정규 표현식(regular expression), 줄여서 정규식(regex)은 검색 패턴을 정의하는 문자 시퀀스입니다. 텍스트 패턴을 서술하기 위한 작은 전용 언어라고 생각하면 됩니다. 특정 단어를 검색하는 대신 "대문자로 시작하고 ing로 끝나는 단어" 또는 "정확히 5자리 숫자"처럼 패턴을 검색할 수 있습니다.

정규식은 거의 모든 프로그래밍 언어, 텍스트 에디터, 커맨드라인 도구, 텍스트 검색 인터페이스에서 지원됩니다. 기본기를 배워두면 환경을 가리지 않는 강력한 도구를 손에 넣게 됩니다.

## 리터럴 문자와 메타문자

가장 단순한 정규식은 그냥 문자열 그대로입니다. 패턴 \`hello\`는 텍스트에서 "hello"를 찾습니다. 하지만 진짜 힘은 메타문자 — 정규식 문법에서 특별한 의미를 가진 문자 — 에서 나옵니다.

점 \`.\`은 줄바꿈을 제외한 모든 단일 문자와 매칭됩니다. \`h.t\`은 "hat", "hot", "hit", 심지어 "h3t"도 매칭합니다. 캐럿 \`^\`은 줄의 시작, 달러 \`$\`는 줄의 끝을 의미합니다. \`^Hello\`는 줄 맨 앞에 있는 "Hello"만 매칭합니다.

대괄호 \`[]\`는 문자 클래스를 정의합니다. \`[aeiou]\`는 모음 하나, \`[0-9]\`는 숫자 하나, \`[A-Za-z]\`는 영문자 하나와 매칭됩니다. 대괄호 안에 캐럿을 넣으면 부정 — \`[^0-9]\`는 숫자가 아닌 문자와 매칭됩니다.

## 수량자

수량자는 패턴 요소의 반복 횟수를 제어합니다. \`*\`는 "0회 이상", \`+\`는 "1회 이상", \`?\`는 "0회 또는 1회"(선택 요소)를 의미합니다.

중괄호로 정확한 횟수를 지정합니다. \`a{3}\`은 연속된 "a" 3개, \`a{2,5}\`는 2~5개, \`a{3,}\`은 3개 이상입니다.

문자 클래스와 조합하면 진짜 유용해집니다. \`[0-9]{3}-[0-9]{4}\`는 "555-1234" 같은 패턴과 매칭됩니다. \`[A-Z][a-z]+\`는 대문자로 시작하는 단어와 매칭됩니다.

## 주요 축약 클래스

\`[0-9]\`를 반복 입력하기 귀찮으니 축약 클래스가 있습니다. \`\\d\`는 숫자, \`\\w\`는 단어 문자(영문자·숫자·밑줄), \`\\s\`는 공백 문자(스페이스·탭·줄바꿈)와 매칭됩니다.

대문자로 쓰면 부정입니다. \`\\D\`는 숫자 아닌 것, \`\\W\`는 단어 문자 아닌 것, \`\\S\`는 공백 아닌 것입니다.

## 그룹과 대안

괄호 \`()\`는 그룹을 만듭니다. 수량자를 여러 문자에 한꺼번에 적용하거나, 매칭된 텍스트를 캡처해 나중에 참조할 수 있습니다.

\`(ha)+\`는 "ha", "haha", "hahaha"와 매칭 — 플러스가 그룹 전체에 적용됩니다. 괄호 없이 \`ha+\`를 쓰면 "ha", "haa", "haaa"와 매칭 — 플러스가 "a"에만 적용되죠.

파이프 \`|\`는 OR 연산입니다. \`cat|dog\`은 "cat" 또는 "dog"과 매칭됩니다.

## 바로 쓸 수 있는 실전 예제

**이메일 검증(기본):** \`^[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}$\`

**전화번호 추출:** \`\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}\`

**URL 감지:** \`https?://[\\w\\-]+(\\.[\\w\\-]+)+[/\\w\\-._~:?#@!$&'()*+,;=]*\`

**날짜 형식:** \`\\d{4}[-/]\\d{2}[-/]\\d{2}\`

**HTML 태그 제거:** \`<[^>]+>\`

## 앵커와 경계

줄 경계인 \`^\`와 \`$\` 외에 단어 경계 \`\\b\`가 매우 유용합니다. \`\\bcat\\b\`는 독립된 단어 "cat"만 매칭하고, "category"나 "concatenate"는 건드리지 않습니다.

찾아 바꾸기에서 전체 단어만 매칭해야 할 때 필수입니다. 단어 경계 없이 "he"를 바꾸면 "the", "she", "here" 속의 "he"까지 바뀌어 버립니다.

## 탐욕적 vs. 게으른 매칭

기본적으로 수량자는 탐욕적(greedy) — 가능한 한 많은 텍스트를 매칭합니다. "start middle end"에서 \`start.*end\`는 문자열 전체를 매칭합니다. \`.*\`가 최대한 많이 잡은 뒤 "end"가 매칭될 만큼만 돌려주기 때문입니다.

수량자 뒤에 \`?\`를 붙이면 게으른(lazy) 매칭 — 가능한 한 적게 매칭합니다. \`start.*?end\`는 첫 번째 "end"에서 멈춥니다.

HTML 태그 추출 시 이 차이가 중요합니다. 탐욕적 \`<.*>\`은 줄의 첫 \`<\`부터 마지막 \`>\`까지 통째로 잡지만, 게으른 \`<.*?>\`은 각 태그를 개별적으로 잡습니다.

## 더 나은 정규식을 쓰는 팁

단순하게 시작하고 점차 복잡하게. 목표를 매칭하는 패턴을 쓰고, 테스트한 뒤, 오탐을 줄여가세요. 한 번에 완벽한 정규식을 쓰려는 시도는 대부분 실패합니다.

온라인 정규식 테스터를 활용하세요. regex101.com 같은 도구에서 실시간 매칭, 패턴 설명, 캡처 그룹 하이라이팅을 확인할 수 있습니다.

복잡한 패턴에는 주석을 달아두세요. 대부분의 정규식 엔진이 공백과 주석을 허용하는 verbose 모드를 지원합니다.

정규식을 쓰지 말아야 할 때를 아는 것도 중요합니다. HTML, JSON, 프로그래밍 언어처럼 중첩 구조를 파싱하는 건 정규식이 아니라 전용 파서의 영역입니다. 정규식은 텍스트의 평면적 패턴에 가장 잘 맞습니다.`,
      },
    },
  },
  {
    slug: "text-formatting-productivity",
    app: "text",
    category: "tips",
    publishedAt: "2026-03-24",
    content: {
      en: {
        title: "10 Text Formatting Tricks That Save Hours of Work",
        description:
          "Practical text formatting techniques that eliminate repetitive manual editing — from batch case conversion to smart find-and-replace patterns and whitespace cleanup.",
        body: `## Why Text Formatting Eats Your Time

Text formatting is one of those tasks that seems trivial until you have to do it at scale. Renaming a hundred file entries to consistent casing. Cleaning up a pasted dataset full of stray tabs and double spaces. Converting a list from one delimiter to another. Individually, each fix takes seconds. Collectively, they consume hours you will never get back.

The good news: nearly every common text formatting task can be automated or at least drastically sped up. Here are ten techniques that will change how you work with text.

## 1. Batch Case Conversion

Manually capitalizing titles or converting variable names between camelCase, snake_case, and UPPER_CASE is tedious and error-prone. Use a dedicated case conversion tool instead.

Title Case capitalizes the first letter of each major word. Sentence case capitalizes only the first word. UPPER CASE and lower case convert everything. camelCase and snake_case transformations handle the word boundary detection automatically.

The key insight: never manually retype text just to change its casing. Paste, convert, copy — done in seconds regardless of text length.

## 2. Smart Find and Replace with Regex

Standard find-and-replace handles exact matches. Regular expression find-and-replace handles patterns. The difference is transformational.

Need to reformat dates from MM/DD/YYYY to YYYY-MM-DD? A single regex replacement does it: find \`(\\d{2})/(\\d{2})/(\\d{4})\` and replace with \`$3-$1-$2\`. Need to wrap every line in quotes? Find \`^(.+)$\` and replace with \`"$1"\`. Want to remove all HTML tags? Find \`<[^>]+>\` and replace with nothing.

Learning even basic regex patterns unlocks formatting capabilities that would otherwise require custom scripts.

## 3. Whitespace Normalization

Copied text from websites, PDFs, or emails often carries invisible formatting pollution: non-breaking spaces, zero-width characters, tabs mixed with spaces, trailing whitespace on every line, and inconsistent line endings.

A whitespace normalizer cleans all of this in one pass. Replace multiple consecutive spaces with single spaces. Convert tabs to spaces (or vice versa). Remove trailing whitespace from every line. Normalize line endings to your platform's standard. Strip zero-width characters that cause mysterious display issues.

## 4. Line Deduplication

Pasted data frequently contains duplicate entries. Manually scanning hundreds or thousands of lines for duplicates is impractical. A deduplication tool removes exact duplicate lines instantly.

Advanced deduplication can be case-insensitive, trim whitespace before comparing, or keep the first versus last occurrence. Some tools also highlight duplicates without removing them, letting you review before acting.

## 5. Column Extraction and Rearrangement

Tab-separated or comma-separated data often needs column reordering. Maybe you received a CSV with columns in the wrong order, or you only need columns 1, 3, and 7 from a twenty-column dataset.

Text-based column tools let you specify which columns to keep and in what order, using the delimiter of your choice. This avoids the overhead of opening a spreadsheet application for a simple restructuring task.

## 6. List Formatting

Converting between list formats is surprisingly common. You have a comma-separated list that needs to become one item per line. Or a vertical list that needs to become a JSON array. Or a numbered list that needs its numbers stripped.

Dedicated list formatting handles these transformations: split by delimiter, join with a different delimiter, add prefixes or suffixes to each item, sort alphabetically or numerically, reverse order, and number items sequentially.

## 7. Text Wrapping and Unwrapping

Hard-wrapped text — where line breaks are inserted at a fixed width — is common in emails, code comments, and plain-text documents. Converting hard-wrapped paragraphs back to continuous text (unwrapping) or rewrapping at a different width are frequent needs.

Unwrapping joins lines within each paragraph while preserving paragraph breaks. Rewrapping redistributes text to a new line width. These operations are manual nightmares but trivial with the right tool.

## 8. Encoding Conversion

Text received from external sources sometimes arrives in the wrong encoding. Latin-1 text misinterpreted as UTF-8, or vice versa, produces garbled characters. A quick encoding conversion tool identifies the likely source encoding and converts cleanly to your target encoding.

Related: escaping and unescaping HTML entities, URL encoding, and Unicode escape sequences. Text that shows \`&amp;\` instead of \`&\` or \`%20\` instead of spaces needs unescaping, not manual editing.

## 9. Number and Data Formatting

Formatting numbers across locales — switching between periods and commas as decimal separators, adding thousand separators, converting between number bases — comes up regularly in data processing.

Similarly, reformatting phone numbers to a consistent pattern, standardizing date formats, or padding numbers with leading zeros are all tasks where a formatting tool saves significant time compared to manual editing.

## 10. Text Diffing

When you have two versions of a text and need to find what changed, a text diff tool highlights additions, deletions, and modifications line by line. This is faster and more accurate than reading both versions side by side.

Diff tools are not just for code. Comparing contract revisions, identifying changes in configuration files, or reviewing edited copy all benefit from automated difference detection.

## Building Your Text Formatting Workflow

The common thread in all these techniques is the same: stop editing text character by character. Identify the pattern, apply the transformation, and move on. Every minute spent manually reformatting text is a minute not spent on work that actually requires human judgment.

Build a toolkit of text formatting tools that you can reach for instantly. Bookmark them, learn their shortcuts, and use them reflexively. The time savings compound quickly — what starts as a few minutes per task becomes hours saved per week.`,
      },
      ko: {
        title: "업무 시간을 아껴주는 텍스트 포맷팅 꿀팁 10가지",
        description:
          "반복적인 수작업 편집을 없애주는 텍스트 포맷팅 기법 — 대소문자 일괄 변환, 정규식 찾아 바꾸기, 공백 정리까지 실전 팁을 모았습니다.",
        body: `## 텍스트 포맷팅이 시간을 잡아먹는 이유

텍스트 포맷팅은 한두 건이면 별것 아닌데, 대량으로 하면 이야기가 달라집니다. 파일명 100개의 대소문자를 통일하거나, 붙여넣은 데이터에 섞인 탭과 이중 공백을 정리하거나, 구분자를 바꾸거나. 건건이는 몇 초지만 모이면 되돌릴 수 없는 시간을 잡아먹습니다.

좋은 소식: 흔한 텍스트 포맷팅 작업은 거의 전부 자동화하거나 획기적으로 빠르게 할 수 있습니다. 텍스트 작업 방식을 바꿔줄 10가지 기법을 소개합니다.

## 1. 대소문자 일괄 변환

제목을 하나하나 대문자로 바꾸거나 camelCase와 snake_case를 왔다 갔다 하는 건 지루하고 실수하기 쉽습니다. 전용 변환 도구를 쓰세요.

Title Case는 주요 단어의 첫 글자를 대문자로, Sentence case는 첫 단어만 대문자로, UPPER CASE와 lower case는 전체를 변환합니다. camelCase↔snake_case 변환은 단어 경계를 자동 감지합니다.

핵심: 대소문자를 바꾸려고 텍스트를 다시 타이핑하지 마세요. 붙여넣고, 변환하고, 복사 — 텍스트 길이에 상관없이 몇 초면 끝납니다.

## 2. 정규식 찾아 바꾸기

일반 찾아 바꾸기는 정확한 문자열만 처리하지만, 정규식 찾아 바꾸기는 패턴을 처리합니다. 차원이 다릅니다.

날짜를 MM/DD/YYYY에서 YYYY-MM-DD로 바꾸고 싶다면? 정규식 한 줄이면 됩니다: \`(\\d{2})/(\\d{2})/(\\d{4})\`를 찾아서 \`$3-$1-$2\`로 치환. 모든 줄을 따옴표로 감싸고 싶다면? \`^(.+)$\`를 \`"$1"\`로 치환. HTML 태그를 전부 지우고 싶다면? \`<[^>]+>\`를 빈 문자열로 치환.

기초적인 정규식만 알아도 별도 스크립트 없이는 불가능한 포맷팅 작업을 처리할 수 있습니다.

## 3. 공백 정규화

웹사이트, PDF, 이메일에서 복사한 텍스트에는 보이지 않는 포맷 오염이 따라옵니다. 줄바꿈 없는 공백, 너비 없는 문자, 탭과 스페이스 혼용, 줄 끝의 불필요한 공백, 일관되지 않는 줄바꿈 문자 등.

공백 정규화 도구는 이 모든 것을 한 번에 정리합니다. 연속 공백을 하나로 합치고, 탭을 스페이스로(혹은 반대로) 바꾸고, 줄 끝 공백을 제거하고, 줄바꿈 문자를 통일하고, 문제를 일으키는 너비 없는 문자를 삭제합니다.

## 4. 중복 줄 제거

붙여넣은 데이터에 중복 항목이 있는 경우가 잦습니다. 수백, 수천 줄을 눈으로 확인하는 건 비현실적입니다. 중복 제거 도구를 쓰면 순식간에 완료됩니다.

고급 중복 제거는 대소문자 무시, 공백 트리밍 후 비교, 첫 번째/마지막 항목 유지 등을 지원합니다. 삭제 전 중복 항목만 하이라이트해서 검토할 수 있는 도구도 있습니다.

## 5. 열 추출과 재배치

탭이나 쉼표로 구분된 데이터의 열 순서를 바꿔야 할 때가 있습니다. CSV 열 순서가 잘못되었거나, 20개 열 중 1, 3, 7열만 필요하거나.

텍스트 기반 열 도구를 쓰면 원하는 열만 골라서 원하는 순서로 뽑을 수 있습니다. 단순한 구조 변경에 스프레드시트를 여는 번거로움을 피할 수 있습니다.

## 6. 목록 서식 변환

목록 형식 변환은 생각보다 자주 합니다. 쉼표로 구분된 목록을 한 줄에 하나씩으로, 세로 목록을 JSON 배열로, 번호 매긴 목록에서 번호를 떼거나.

목록 전용 도구로 처리하면: 구분자로 나누기, 다른 구분자로 합치기, 각 항목에 접두사/접미사 추가, 알파벳순·숫자순 정렬, 역순 정렬, 순차 번호 매기기를 깔끔하게 할 수 있습니다.

## 7. 줄바꿈 래핑과 해제

고정 폭 줄바꿈(hard wrap)은 이메일, 코드 주석, 일반 텍스트 문서에서 흔합니다. 줄바꿈을 풀어서 연속 텍스트로 만들거나(unwrap), 다른 폭으로 다시 감싸는 것(rewrap)은 자주 필요한 작업입니다.

언래핑은 문단 안의 줄을 합치되 문단 구분은 유지합니다. 리래핑은 새로운 줄 폭에 맞춰 텍스트를 재배치합니다. 수작업으로는 악몽이지만 도구를 쓰면 순식간입니다.

## 8. 인코딩 변환

외부에서 받은 텍스트가 잘못된 인코딩으로 해석되어 글자가 깨지는 경우가 있습니다. 인코딩 변환 도구로 원본 인코딩을 파악하고 원하는 인코딩으로 깔끔하게 바꿀 수 있습니다.

관련 작업: HTML 엔티티 이스케이프/언이스케이프, URL 인코딩, 유니코드 이스케이프 시퀀스. \`&amp;\`가 \`&\` 대신, \`%20\`이 스페이스 대신 보이는 텍스트는 언이스케이핑이 필요합니다.

## 9. 숫자와 데이터 포맷

로캘별 숫자 형식 전환 — 소수점에 점 또는 쉼표 사용, 천 단위 구분자, 진법 변환 — 은 데이터 처리에서 자주 나옵니다.

전화번호 형식 통일, 날짜 형식 표준화, 숫자 앞 0 채우기 같은 작업도 포맷팅 도구를 쓰면 수작업 대비 시간이 크게 절약됩니다.

## 10. 텍스트 비교(Diff)

두 버전의 텍스트에서 뭐가 달라졌는지 찾아야 할 때, diff 도구가 줄 단위로 추가·삭제·변경 사항을 하이라이트해 줍니다. 양쪽을 나란히 놓고 읽는 것보다 빠르고 정확합니다.

Diff는 코드만의 도구가 아닙니다. 계약서 수정 사항 비교, 설정 파일 변경 확인, 편집된 원고 검토 — 자동 차이 감지가 모두 도움이 됩니다.

## 텍스트 포맷팅 워크플로 만들기

모든 기법의 공통점은 같습니다: 글자 하나하나 수작업으로 고치지 마세요. 패턴을 파악하고, 변환을 적용하고, 다음으로 넘어가세요. 수동 포맷팅에 쓰는 매 분은 진짜 판단이 필요한 일에 쓸 수 있는 시간입니다.

바로 꺼내 쓸 수 있는 텍스트 포맷팅 도구 모음을 구축하세요. 북마크하고, 단축키를 익히고, 반사적으로 사용하세요. 절약되는 시간은 금세 쌓입니다 — 작업당 몇 분이 주당 몇 시간이 됩니다.`,
      },
    },
  },
  {
    slug: "json-guide-for-developers",
    app: "text",
    category: "guide",
    publishedAt: "2026-03-25",
    content: {
      en: {
        title: "JSON Formatting, Validation, and Debugging: A Practical Guide",
        description:
          "Master JSON formatting, validation, and common pitfalls. Learn how to debug malformed JSON, prettify minified data, and work with complex nested structures efficiently.",
        body: `## Why JSON Matters

JSON (JavaScript Object Notation) has become the lingua franca of data exchange on the web. APIs return JSON. Configuration files use JSON. Databases store JSON. If you work with software in any capacity, you encounter JSON daily — and when it breaks, everything downstream breaks with it.

The format itself is deceptively simple: objects with key-value pairs, arrays, strings, numbers, booleans, and null. But simplicity does not mean immunity to errors. A single misplaced comma, an unescaped quote, or a trailing comma that your editor did not flag can turn valid JSON into a cryptic parse error.

## Common JSON Errors and How to Fix Them

### Trailing Commas

The most frequent JSON error is the trailing comma. JavaScript allows trailing commas in arrays and objects, so developers writing JSON by hand often carry this habit over. But the JSON specification strictly forbids them.

\`\`\`json
// Invalid — trailing comma after "blue"
{ "colors": ["red", "green", "blue",] }

// Valid
{ "colors": ["red", "green", "blue"] }
\`\`\`

### Single Quotes

JSON requires double quotes for strings and keys. Single quotes, which are perfectly valid in JavaScript, Python, and many other languages, cause immediate parse failures in JSON.

\`\`\`json
// Invalid
{ 'name': 'Alice' }

// Valid
{ "name": "Alice" }
\`\`\`

### Unescaped Special Characters

Strings in JSON must escape certain characters: double quotes (\`\\"\`), backslashes (\`\\\\\`), and control characters like newlines (\`\\n\`) and tabs (\`\\t\`). Pasting raw text into a JSON value without escaping these characters is a common source of errors.

### Comments

JSON does not support comments. No single-line \`//\`, no multi-line \`/* */\`. If you need comments in a configuration file, consider JSONC (JSON with Comments) or YAML instead.

## Formatting Minified JSON

Production APIs typically return minified JSON — all whitespace stripped to minimize payload size. This is efficient for machines but unreadable for humans. A 500-character single-line blob of JSON becomes instantly comprehensible when formatted with proper indentation.

Good JSON formatters do more than add whitespace. They validate the structure as they parse, catch errors before you waste time debugging downstream, and let you collapse and expand nested sections to focus on the data you care about.

Indentation style is a matter of preference. Two spaces, four spaces, and tabs are all common. The important thing is consistency within a project.

## Working with Nested JSON

Deeply nested JSON structures are common in API responses. A user object might contain an address object, which contains a coordinates object, which contains latitude and longitude values. Navigating five or six levels deep in a minified response is nearly impossible without formatting.

When debugging nested JSON, start from the outside and work inward. Verify the top-level structure first, then drill into the specific path you need. Many formatters support JSONPath or dot-notation to extract specific values from complex structures.

## Minifying JSON

The opposite of formatting — minification strips all unnecessary whitespace to produce the smallest possible representation. This matters when JSON is transmitted over a network, stored in a database field with size constraints, or embedded in a URL query parameter.

A well-structured 50 KB formatted JSON file might shrink to 35 KB when minified. For high-traffic APIs serving millions of requests, this difference adds up to significant bandwidth savings.

## Validating JSON Against a Schema

Beyond syntax validation, JSON Schema lets you verify that data meets specific structural requirements. A schema can enforce that certain fields exist, values fall within expected ranges, arrays have a minimum number of elements, and string values match specific patterns.

Schema validation catches errors that syntax validation misses. A JSON file can be syntactically perfect but semantically wrong — the right format but the wrong data. Integrating schema validation into your workflow prevents these issues from reaching production.

## JSON in Different Contexts

### API Development

When building or consuming APIs, consistent JSON formatting makes debugging easier. Agree on conventions: camelCase or snake_case for keys, ISO 8601 for dates, consistent null handling. Document these conventions and validate against them.

### Configuration Files

JSON configuration files benefit from formatting with comments (using JSONC) and consistent key ordering. Alphabetizing keys makes it easier to find settings and reduces merge conflicts in version control.

### Data Processing

When processing large JSON datasets, streaming parsers handle files that do not fit in memory. For smaller files, formatting the output makes spot-checking results much faster than scanning raw data.

## Practical Tips

Keep a JSON formatter bookmarked or installed as a browser extension. When an API returns an error, paste the response into a formatter before reading it — structured data is always easier to diagnose than a wall of text.

Learn your editor's JSON support. Most modern editors validate JSON syntax in real time, highlight matching brackets, and offer fold/unfold for nested structures. These features save significant debugging time when you use them habitually.

When generating JSON programmatically, always use a proper serialization library rather than string concatenation. Building JSON by concatenating strings invites escaping errors, encoding issues, and malformed output that passes casual inspection but fails in edge cases.`,
      },
      ko: {
        title: "JSON 포맷팅, 검증, 디버깅 실용 가이드",
        description:
          "JSON 포맷팅과 검증의 핵심을 정리했습니다. 잘못된 JSON 디버깅, 압축된 데이터 정리, 복잡한 중첩 구조 다루기까지 — 실무에 바로 쓸 수 있는 JSON 가이드.",
        body: `## JSON이 중요한 이유

JSON(JavaScript Object Notation)은 웹 데이터 교환의 표준어가 되었습니다. API 응답이 JSON이고, 설정 파일이 JSON이며, 데이터베이스에도 JSON이 들어갑니다. 소프트웨어와 조금이라도 관련된 일을 한다면 매일 JSON을 접하게 됩니다. 그리고 JSON이 깨지면, 그 뒤에 연결된 모든 것이 함께 깨집니다.

형식 자체는 단순합니다. 키-값 쌍의 객체, 배열, 문자열, 숫자, 불리언, null. 하지만 단순하다고 에러가 안 나는 건 아닙니다. 쉼표 하나, 이스케이프 안 된 따옴표 하나가 유효한 JSON을 알 수 없는 파싱 에러로 바꿔 놓습니다.

## 흔한 JSON 에러와 해결법

### 후행 쉼표

가장 빈번한 에러는 후행 쉼표입니다. JavaScript에서는 배열과 객체 끝에 쉼표가 허용되기 때문에, JSON을 직접 작성할 때 이 습관이 자연스럽게 따라옵니다. 하지만 JSON 사양은 후행 쉼표를 엄격히 금지합니다.

\`\`\`json
// 잘못됨 — "blue" 뒤 쉼표
{ "colors": ["red", "green", "blue",] }

// 올바름
{ "colors": ["red", "green", "blue"] }
\`\`\`

### 작은따옴표

JSON은 문자열과 키 모두 큰따옴표만 허용합니다. JavaScript나 Python에서 유효한 작은따옴표는 JSON에서 즉시 파싱 실패를 일으킵니다.

### 이스케이프 안 된 특수 문자

JSON 문자열 안에서 큰따옴표(\`\\"\`), 백슬래시(\`\\\\\`), 줄 바꿈(\`\\n\`), 탭(\`\\t\`) 등은 반드시 이스케이프해야 합니다. 일반 텍스트를 JSON 값에 그대로 붙여 넣으면 에러가 납니다.

### 주석

JSON은 주석을 지원하지 않습니다. \`//\`도 \`/* */\`도 안 됩니다. 설정 파일에 주석이 필요하다면 JSONC나 YAML을 고려하세요.

## 압축된 JSON 포맷팅

프로덕션 API는 보통 공백을 모두 제거한 압축 JSON을 반환합니다. 기계에게는 효율적이지만 사람이 읽기에는 불가능에 가깝습니다. 500자짜리 한 줄 JSON도 들여쓰기를 적용하면 즉시 구조가 보입니다.

좋은 포맷터는 공백만 추가하는 게 아닙니다. 파싱하면서 구조를 검증하고, 뒤에서 시간 낭비할 에러를 미리 잡아주며, 중첩된 섹션을 접었다 펼 수 있게 해줍니다.

들여쓰기 스타일은 취향 차이입니다. 스페이스 2칸, 4칸, 탭 — 프로젝트 안에서만 일관되면 됩니다.

## 중첩 JSON 다루기

API 응답에서 5~6단계 깊이의 중첩은 흔합니다. 사용자 객체 안에 주소가 있고, 주소 안에 좌표가 있고, 좌표 안에 위도와 경도가 있는 식입니다. 압축된 상태에서 이걸 탐색하는 건 사실상 불가능합니다.

중첩 JSON을 디버깅할 때는 바깥에서 안쪽으로 진행하세요. 최상위 구조를 먼저 확인하고, 필요한 경로로 파고드는 방식입니다.

## JSON 압축(Minification)

포맷팅의 반대가 압축입니다. 불필요한 공백을 모두 제거해서 가능한 가장 작은 형태로 만듭니다. 네트워크로 전송하거나, 크기 제한이 있는 DB 필드에 저장하거나, URL 쿼리 파라미터에 삽입할 때 필요합니다.

잘 구성된 50KB JSON 파일이 압축하면 35KB까지 줄어들 수 있습니다. 수백만 요청을 처리하는 API에서는 이 차이가 상당한 대역폭 절감으로 이어집니다.

## JSON 스키마 검증

문법 검증을 넘어, JSON Schema를 사용하면 데이터가 특정 구조 요구 사항을 충족하는지 확인할 수 있습니다. 필수 필드 존재 여부, 값의 범위, 배열 최소 요소 수, 문자열 패턴 매칭 등을 강제할 수 있습니다.

스키마 검증은 문법 검증이 놓치는 에러를 잡습니다. JSON이 문법적으로는 완벽하지만 의미적으로 틀린 경우 — 형식은 맞는데 데이터가 잘못된 경우 — 는 스키마 없이는 감지할 수 없습니다.

## 맥락별 JSON 활용

### API 개발

API를 만들거나 사용할 때, 일관된 JSON 포맷팅은 디버깅을 수월하게 만듭니다. 키 이름 규칙(camelCase vs snake_case), 날짜 형식(ISO 8601), null 처리 방식을 팀 내에서 통일하세요.

### 설정 파일

JSON 설정 파일은 키를 알파벳순으로 정렬하면 설정을 찾기 쉽고, 버전 관리에서 머지 충돌도 줄어듭니다.

### 데이터 처리

대용량 JSON 데이터셋은 스트리밍 파서로 메모리에 한꺼번에 올리지 않고 처리할 수 있습니다. 작은 파일이라면 출력을 포맷팅해서 확인하는 게 날것 그대로 스캔하는 것보다 훨씬 빠릅니다.

## 실용 팁

JSON 포맷터를 브라우저 즐겨찾기에 추가하세요. API가 에러를 반환하면 응답을 먼저 포맷터에 넣어 구조화한 다음 읽으세요. 텍스트 벽을 눈으로 훑는 것보다 항상 빠릅니다.

JSON을 프로그래밍으로 생성할 때는 반드시 직렬화 라이브러리를 사용하세요. 문자열 연결로 JSON을 만들면 이스케이프 에러, 인코딩 문제, 겉보기엔 괜찮지만 엣지 케이스에서 실패하는 잘못된 출력이 나올 수 있습니다.`,
      },
    },
  },
  {
    slug: "hash-functions-explained",
    app: "text",
    category: "knowledge",
    publishedAt: "2026-03-25",
    content: {
      en: {
        title: "Hash Functions Explained: MD5, SHA-1, SHA-256, and Beyond",
        description:
          "Understand how cryptographic hash functions work, why they matter for security and data integrity, and when to use each algorithm from MD5 to SHA-256.",
        body: `## What Is a Hash Function?

A hash function takes an input of any size — a single character, a paragraph, or an entire file — and produces a fixed-length output called a digest or hash. The same input always produces the same hash. Even a tiny change in the input produces a completely different hash. And crucially, you cannot reverse the process: given a hash, there is no mathematical way to recover the original input.

These properties make hash functions indispensable in software engineering, security, and data management. They verify file integrity, store passwords safely, detect duplicates, and underpin digital signatures and blockchain technology.

## How Hashing Works

When you hash a string like "hello", the algorithm processes it through a series of mathematical transformations — bitwise operations, modular arithmetic, and compression functions — to produce a fixed-length output. For SHA-256, the result is always 256 bits (64 hexadecimal characters), regardless of whether the input is 5 characters or 5 million.

The key properties that define a good hash function are:

**Deterministic**: The same input always gives the same output. Hash "hello" a million times and you get the same result every time.

**Avalanche effect**: Change a single bit in the input and roughly half the output bits change. "hello" and "Hello" produce hashes that look completely unrelated.

**Pre-image resistance**: Given a hash value, it is computationally infeasible to find an input that produces it.

**Collision resistance**: It is extremely difficult to find two different inputs that produce the same hash.

## Common Hash Algorithms

### MD5

MD5 produces a 128-bit (32-character hex) digest. Created in 1991 by Ronald Rivest, it was widely used for file integrity checks and password storage for over a decade. However, MD5 is now considered cryptographically broken — researchers have demonstrated practical collision attacks, meaning they can create two different files with the same MD5 hash.

MD5 remains acceptable for non-security purposes: checksums to verify file downloads, deduplication keys, or cache invalidation identifiers. But it should never be used for password hashing, digital signatures, or any application where collision resistance matters.

### SHA-1

SHA-1 produces a 160-bit (40-character hex) digest. Developed by the NSA and published in 1995, it was the standard hash function for digital certificates, Git commits, and many security protocols. In 2017, Google demonstrated the first practical SHA-1 collision (the "SHAttered" attack), and the algorithm is now deprecated for security use.

Git still uses SHA-1 for commit identifiers, though it is migrating to SHA-256. For new projects, SHA-1 should be avoided in favor of SHA-2 family algorithms.

### SHA-256

SHA-256, part of the SHA-2 family, produces a 256-bit (64-character hex) digest. It is currently the most widely used cryptographic hash function. No practical attacks against SHA-256 are known, and it is the backbone of Bitcoin's proof-of-work system, TLS certificates, and countless security protocols.

SHA-256 strikes a good balance between security and performance. For most applications, it is the recommended default choice.

### SHA-512

SHA-512 produces a 512-bit (128-character hex) digest. It offers a larger security margin than SHA-256 and can actually be faster on 64-bit processors due to its use of 64-bit operations. It is a good choice when you need extra security headroom or are working on 64-bit systems.

## Practical Applications

### File Integrity Verification

When you download software, the publisher often provides a SHA-256 hash. After downloading, you compute the hash of your file and compare it to the published value. If they match, the file has not been corrupted or tampered with during transfer.

### Password Storage

Passwords should never be stored in plain text. Instead, applications hash the password and store only the hash. When a user logs in, the application hashes the submitted password and compares it to the stored hash. Even if the database is compromised, attackers get hashes, not passwords.

For password hashing specifically, algorithms like bcrypt, scrypt, or Argon2 are preferred over raw SHA-256 because they are deliberately slow and incorporate salting, which protects against rainbow table attacks.

### Data Deduplication

Hashing allows efficient duplicate detection. Rather than comparing potentially massive files byte by byte, compute their hashes and compare those. Identical hashes (with a good algorithm) mean identical content. Cloud storage services use this technique to avoid storing the same file multiple times.

### Digital Signatures

Digital signatures combine hashing with asymmetric cryptography. Rather than signing an entire document (which would be slow), the signer hashes the document and signs only the hash. The recipient hashes the document independently and verifies the signature against their computed hash. This is both faster and proves the document has not been modified.

## Choosing the Right Algorithm

For security-critical applications (digital signatures, certificates, authentication): use SHA-256 or SHA-512. These have no known practical attacks and are widely supported.

For integrity checks (file verification, cache keys, deduplication): SHA-256 is ideal, but MD5 is acceptable when security is not a concern and speed matters.

For password storage: use bcrypt, scrypt, or Argon2 — not a general-purpose hash function.

For legacy compatibility: if you must interact with systems using MD5 or SHA-1, use them for that purpose but plan a migration path to stronger algorithms.

The bottom line: when in doubt, use SHA-256. It is fast, secure, and universally supported.`,
      },
      ko: {
        title: "해시 함수의 이해: MD5, SHA-1, SHA-256 그리고 그 너머",
        description:
          "암호학적 해시 함수의 작동 원리, 보안과 데이터 무결성에서의 역할, 그리고 MD5부터 SHA-256까지 각 알고리즘의 적절한 사용 시점을 정리했습니다.",
        body: `## 해시 함수란?

해시 함수는 어떤 크기의 입력이든 — 글자 하나, 문단 하나, 파일 전체 — 받아서 고정 길이의 출력(다이제스트 또는 해시)을 만들어냅니다. 같은 입력은 항상 같은 해시를 생성합니다. 입력이 아주 조금만 바뀌어도 완전히 다른 해시가 나옵니다. 그리고 결정적으로, 해시에서 원래 입력을 역산할 수 있는 수학적 방법은 없습니다.

이런 특성 덕분에 해시 함수는 소프트웨어 개발, 보안, 데이터 관리에서 빠질 수 없는 도구입니다. 파일 무결성 검증, 비밀번호 안전 저장, 중복 감지, 디지털 서명, 블록체인의 기반이 됩니다.

## 해시의 작동 원리

"hello"라는 문자열을 해싱하면, 알고리즘이 비트 연산, 모듈러 연산, 압축 함수 등의 수학적 변환을 거쳐 고정 길이 출력을 만들어냅니다. SHA-256의 경우 입력이 5글자든 500만 글자든 결과는 항상 256비트(16진수 64자)입니다.

좋은 해시 함수의 핵심 속성은 다음과 같습니다.

**결정적**: 같은 입력은 항상 같은 출력. "hello"를 백만 번 해싱해도 매번 같은 결과입니다.

**눈사태 효과**: 입력에서 1비트만 바꿔도 출력 비트의 약 절반이 변합니다. "hello"와 "Hello"의 해시는 전혀 상관없어 보입니다.

**역상 저항성**: 해시값이 주어졌을 때, 그 값을 생성하는 입력을 찾는 것이 계산적으로 불가능합니다.

**충돌 저항성**: 같은 해시를 생성하는 서로 다른 두 입력을 찾기가 극도로 어렵습니다.

## 주요 해시 알고리즘

### MD5

MD5는 128비트(16진수 32자) 다이제스트를 생성합니다. 1991년 로널드 리베스트가 만들었으며, 10년 넘게 파일 무결성 확인과 비밀번호 저장에 널리 사용되었습니다. 그러나 지금은 암호학적으로 깨진 것으로 간주됩니다. 연구자들이 같은 MD5 해시를 가진 서로 다른 파일 두 개를 만드는 실용적 충돌 공격을 시연했습니다.

MD5는 보안과 무관한 용도 — 파일 다운로드 체크섬, 중복 제거 키, 캐시 무효화 식별자 — 에는 여전히 사용할 수 있습니다. 하지만 비밀번호 해싱, 디지털 서명 등 충돌 저항성이 필요한 곳에는 절대 쓰면 안 됩니다.

### SHA-1

SHA-1은 160비트(16진수 40자) 다이제스트를 생성합니다. NSA가 개발해서 1995년에 공개했으며, 디지털 인증서, Git 커밋 등에서 표준 해시 함수로 쓰였습니다. 2017년 구글이 최초의 실용적 SHA-1 충돌("SHAttered" 공격)을 시연한 후, 보안 용도에서는 더 이상 사용하지 않습니다.

Git은 아직 커밋 식별에 SHA-1을 쓰지만 SHA-256으로 전환 중입니다. 새 프로젝트에서는 SHA-2 계열 알고리즘을 사용하세요.

### SHA-256

SHA-2 계열에 속하는 SHA-256은 256비트(16진수 64자) 다이제스트를 생성합니다. 현재 가장 널리 사용되는 암호학적 해시 함수입니다. SHA-256에 대한 실용적 공격은 알려진 바 없으며, 비트코인 작업증명, TLS 인증서 등 수많은 보안 프로토콜의 핵심입니다.

보안과 성능의 균형이 좋아서 대부분의 용도에서 기본 선택으로 권장됩니다.

### SHA-512

SHA-512는 512비트(16진수 128자) 다이제스트를 생성합니다. SHA-256보다 큰 보안 마진을 제공하며, 64비트 연산을 사용하기 때문에 64비트 프로세서에서는 오히려 더 빠를 수 있습니다.

## 실용적 활용

### 파일 무결성 검증

소프트웨어를 다운로드할 때 배포자가 SHA-256 해시를 함께 제공하는 경우가 많습니다. 다운로드 후 파일의 해시를 계산해서 공개된 값과 비교합니다. 일치하면 전송 중 파일이 손상되거나 변조되지 않은 것입니다.

### 비밀번호 저장

비밀번호는 절대 평문으로 저장하면 안 됩니다. 비밀번호를 해싱해서 해시만 저장합니다. 로그인할 때 입력된 비밀번호를 해싱해서 저장된 해시와 비교합니다. 데이터베이스가 유출되어도 공격자가 얻는 건 해시뿐입니다.

비밀번호 해싱에는 SHA-256보다 bcrypt, scrypt, Argon2 같은 전용 알고리즘이 권장됩니다. 의도적으로 느리게 설계되었고, 솔팅을 포함해서 레인보우 테이블 공격을 방어합니다.

### 데이터 중복 제거

해싱으로 효율적인 중복 감지가 가능합니다. 대용량 파일을 바이트 단위로 비교하는 대신, 해시를 계산해서 비교합니다. 좋은 알고리즘에서 해시가 같으면 내용도 같습니다. 클라우드 스토리지 서비스가 같은 파일을 여러 번 저장하지 않도록 이 기법을 사용합니다.

### 디지털 서명

디지털 서명은 해싱과 비대칭 암호화를 결합합니다. 문서 전체를 서명하는 대신(느림), 문서를 해싱하고 해시만 서명합니다. 수신자는 독립적으로 문서를 해싱해서 서명을 검증합니다. 빠르면서도 문서가 수정되지 않았음을 증명할 수 있습니다.

## 알고리즘 선택 기준

보안이 중요한 곳(디지털 서명, 인증서, 인증)에는 SHA-256 또는 SHA-512를 사용하세요.

무결성 확인(파일 검증, 캐시 키, 중복 제거)에는 SHA-256이 적합합니다. 보안이 관계없고 속도가 중요하면 MD5도 괜찮습니다.

비밀번호 저장에는 범용 해시 함수가 아닌 bcrypt, scrypt, Argon2를 사용하세요.

판단이 어려우면 SHA-256을 선택하세요. 빠르고, 안전하며, 어디서든 지원됩니다.`,
      },
    },
  },
  {
    slug: "text-encoding-toolkit",
    app: "text",
    category: "guide",
    publishedAt: "2026-03-25",
    content: {
      en: {
        title: "Base64, URL Encoding, and HTML Entities: A Developer's Toolkit",
        description:
          "A practical guide to the most common text encoding schemes — Base64, URL encoding, and HTML entities. Learn when and why each encoding is needed, and how to avoid common pitfalls.",
        body: `## Why Text Encoding Exists

Computers transmit data as bytes, but not all byte values are safe in every context. URLs cannot contain spaces. HTML interprets angle brackets as tags. Email systems may corrupt binary data. Text encoding schemes solve these problems by transforming unsafe characters into safe representations that can be decoded back to the original.

Understanding these encodings is not optional for web developers. Incorrect encoding causes broken links, garbled text, security vulnerabilities (XSS attacks), and silent data corruption that surfaces only in production.

## Base64 Encoding

### What It Does

Base64 converts binary data into a string of 64 ASCII characters (A-Z, a-z, 0-9, +, /). Every three bytes of input become four Base64 characters, making the encoded output about 33% larger than the original.

### When to Use It

Base64 is essential when you need to embed binary data in a text-only context. Common use cases include:

- Embedding images directly in HTML or CSS using data URIs
- Sending binary attachments in email (MIME encoding)
- Storing binary data in JSON, which only supports text values
- Passing binary data through APIs that expect text

### How It Works

Base64 takes input bytes in groups of three (24 bits), splits them into four 6-bit groups, and maps each group to one of 64 characters. If the input length is not a multiple of three, padding characters (=) are added to complete the final group.

For example, the text "Hi" (two bytes) becomes "SGk=" in Base64. The "=" is padding because two bytes do not fill a complete three-byte group.

### Common Pitfalls

Base64 is encoding, not encryption. It provides zero security — anyone can decode it instantly. Never use Base64 to "hide" sensitive data.

Base64 increases data size by approximately 33%. For large files, this overhead adds up. If you are Base64-encoding images for a web page, consider whether serving the image as a separate file would be more efficient.

URL-safe Base64 replaces "+" with "-" and "/" with "_" to avoid conflicts with URL syntax. Use this variant when Base64 data appears in URLs or filenames.

## URL Encoding (Percent Encoding)

### What It Does

URL encoding replaces unsafe characters with a percent sign followed by two hexadecimal digits representing the character's byte value. A space becomes %20, an ampersand becomes %26, and a forward slash becomes %2F.

### When to Use It

Any data placed into a URL must be properly encoded. This includes:

- Query parameter values: \`?search=hello%20world\`
- Path segments containing special characters
- Form data submitted via GET requests
- Any user input that becomes part of a URL

### Reserved vs. Unreserved Characters

URL syntax reserves certain characters for structural purposes. Ampersands (&) separate query parameters. Equals signs (=) separate keys from values. Question marks (?) begin the query string. These characters must be encoded when they appear as data rather than structure.

Unreserved characters — letters, digits, hyphens, underscores, periods, and tildes — never need encoding.

### Double Encoding

A common mistake is encoding data that is already encoded, turning %20 into %2520. This happens when encoding functions are applied more than once, or when a framework automatically encodes data that you have already manually encoded. The result is URLs that look wrong and break when decoded.

Always know which layer of your application is responsible for encoding, and encode exactly once.

## HTML Entities

### What It Does

HTML entity encoding replaces characters that have special meaning in HTML with named or numeric references. The less-than sign (<) becomes \`&lt;\`, the greater-than sign (>) becomes \`&gt;\`, the ampersand (&) becomes \`&amp;\`, and double quotes (") become \`&quot;\`.

### When to Use It

HTML encoding is critical whenever untrusted text is inserted into an HTML document. Without encoding, user-supplied text containing angle brackets could be interpreted as HTML tags, leading to cross-site scripting (XSS) attacks.

Common contexts requiring HTML encoding:

- Displaying user-generated content on a web page
- Inserting dynamic values into HTML attributes
- Showing code snippets in documentation or tutorials
- Any text that originates outside your application

### Named vs. Numeric Entities

HTML supports both named entities (\`&amp;\`, \`&lt;\`, \`&copy;\`) and numeric entities (\`&#38;\`, \`&#60;\`, \`&#169;\`). Named entities are more readable but limited to a predefined set. Numeric entities can represent any Unicode character using decimal (\`&#8364;\` for €) or hexadecimal (\`&#x20AC;\` for €) notation.

### Encoding vs. Escaping

The terms are often used interchangeably, but there is a subtle difference. Encoding transforms data for transmission in a specific format. Escaping prevents special characters from being interpreted as syntax. In practice, HTML entity encoding serves both purposes — it makes text safe for HTML contexts and preserves the original characters for display.

## Combining Encodings

Real-world data often passes through multiple encoding layers. A user submits a search query containing an ampersand. The browser URL-encodes it for the HTTP request. The server decodes it and includes it in an HTML response using HTML entity encoding. If the response includes a JSON API call, the data might be JSON-escaped as well.

Each encoding layer must be applied and removed in the correct order. Mixing up the sequence — HTML-encoding before URL-encoding, or forgetting to decode one layer — produces garbled output that is difficult to debug.

## Security Implications

Encoding is a first line of defense against injection attacks. SQL injection, XSS, and command injection all exploit situations where data is interpreted as code. Proper encoding ensures that data remains data, regardless of what characters it contains.

Context matters. HTML encoding protects against XSS in HTML contexts but not in JavaScript contexts. URL encoding protects URLs but not HTML attributes. Always encode for the specific context where the data will be used.

## Practical Workflow

When working with text that crosses context boundaries, follow this checklist:

1. Identify the target context (URL, HTML, JSON, SQL)
2. Determine which characters are special in that context
3. Apply the appropriate encoding once, at the boundary
4. Decode only when transitioning back to a raw text context
5. Never trust that data is "already encoded" — verify or re-encode at the boundary

Having reliable encoding and decoding tools readily available saves debugging time and prevents security vulnerabilities. Bookmark them, learn the common patterns, and apply them consistently.`,
      },
      ko: {
        title: "Base64, URL 인코딩, HTML 엔티티: 개발자 필수 도구",
        description:
          "가장 많이 쓰이는 텍스트 인코딩 방식을 실용적으로 정리합니다. Base64, URL 인코딩, HTML 엔티티 — 각각 언제 왜 필요한지, 흔한 실수는 어떻게 피하는지.",
        body: `## 텍스트 인코딩이 존재하는 이유

컴퓨터는 데이터를 바이트로 전송하지만, 모든 바이트값이 모든 맥락에서 안전한 건 아닙니다. URL에는 공백이 들어갈 수 없고, HTML은 꺾쇠괄호를 태그로 해석하고, 이메일 시스템은 바이너리 데이터를 손상시킬 수 있습니다. 텍스트 인코딩은 안전하지 않은 문자를 안전한 표현으로 변환해서, 나중에 원본으로 되돌릴 수 있게 합니다.

웹 개발자에게 이 인코딩들은 선택이 아닌 필수입니다. 잘못된 인코딩은 깨진 링크, 글자 깨짐, 보안 취약점(XSS 공격), 프로덕션에서야 발견되는 데이터 손상의 원인이 됩니다.

## Base64 인코딩

### 하는 일

Base64는 바이너리 데이터를 64개의 ASCII 문자(A-Z, a-z, 0-9, +, /)로 이루어진 문자열로 변환합니다. 입력 3바이트가 Base64 4문자가 되므로, 인코딩된 출력은 원본보다 약 33% 커집니다.

### 사용 시점

텍스트만 허용되는 맥락에 바이너리 데이터를 넣어야 할 때 Base64를 사용합니다.

- data URI로 HTML이나 CSS에 이미지 직접 삽입
- 이메일의 바이너리 첨부 파일 전송(MIME)
- 텍스트만 지원하는 JSON에 바이너리 데이터 저장
- 텍스트 기반 API를 통한 바이너리 데이터 전달

### 작동 원리

입력 바이트를 3개씩(24비트) 묶어 6비트 4그룹으로 나누고, 각 그룹을 64개 문자 중 하나에 매핑합니다. 입력 길이가 3의 배수가 아니면 패딩 문자(=)를 추가합니다.

예를 들어 "Hi"(2바이트)는 Base64로 "SGk="가 됩니다. "="는 2바이트가 3바이트 그룹을 채우지 못해서 추가된 패딩입니다.

### 흔한 실수

Base64는 인코딩이지 암호화가 아닙니다. 보안은 전혀 제공하지 않으며 누구나 즉시 디코딩할 수 있습니다. 민감한 데이터를 "숨기는" 용도로 쓰면 안 됩니다.

Base64는 데이터 크기를 약 33% 늘립니다. 큰 파일에서는 이 오버헤드가 무시 못 할 수준이 됩니다.

URL에서 Base64 데이터를 사용할 때는 URL-safe 변형("+"를 "-"로, "/"를 "_"로 대체)을 사용하세요.

## URL 인코딩 (퍼센트 인코딩)

### 하는 일

URL 인코딩은 안전하지 않은 문자를 퍼센트 기호와 16진수 두 자리로 대체합니다. 공백은 %20, 앰퍼샌드는 %26, 슬래시는 %2F가 됩니다.

### 사용 시점

URL에 넣는 모든 데이터는 적절히 인코딩해야 합니다.

- 쿼리 파라미터 값: \`?search=hello%20world\`
- 특수 문자가 포함된 경로 세그먼트
- GET 요청으로 전송되는 폼 데이터
- URL의 일부가 되는 모든 사용자 입력

### 예약 문자와 비예약 문자

URL 구문은 특정 문자를 구조적 용도로 예약합니다. 앰퍼샌드(&)는 쿼리 파라미터를 구분하고, 등호(=)는 키와 값을 구분하고, 물음표(?)는 쿼리 문자열을 시작합니다. 이 문자들이 구조가 아니라 데이터로 나타날 때는 인코딩해야 합니다.

비예약 문자 — 문자, 숫자, 하이픈, 밑줄, 마침표, 틸드 — 는 인코딩이 필요 없습니다.

### 이중 인코딩

흔한 실수 중 하나가 이미 인코딩된 데이터를 다시 인코딩하는 것입니다. %20이 %2520이 됩니다. 인코딩 함수를 두 번 적용하거나, 프레임워크가 자동 인코딩하는 데이터를 수동으로도 인코딩했을 때 발생합니다.

어떤 계층이 인코딩을 담당하는지 파악하고, 정확히 한 번만 인코딩하세요.

## HTML 엔티티

### 하는 일

HTML 엔티티 인코딩은 HTML에서 특별한 의미를 가진 문자를 이름 또는 숫자 참조로 대체합니다. <는 \`&lt;\`, >는 \`&gt;\`, &는 \`&amp;\`, "는 \`&quot;\`가 됩니다.

### 사용 시점

신뢰할 수 없는 텍스트를 HTML 문서에 삽입할 때 HTML 인코딩은 필수입니다. 인코딩 없이 꺾쇠괄호가 포함된 사용자 입력을 넣으면 HTML 태그로 해석되어 XSS 공격으로 이어질 수 있습니다.

- 사용자 생성 콘텐츠를 웹 페이지에 표시할 때
- HTML 속성에 동적 값을 삽입할 때
- 문서나 튜토리얼에서 코드 조각을 보여줄 때
- 애플리케이션 외부에서 온 모든 텍스트

### 이름 엔티티 vs 숫자 엔티티

HTML은 이름 엔티티(\`&amp;\`, \`&lt;\`, \`&copy;\`)와 숫자 엔티티(\`&#38;\`, \`&#60;\`, \`&#169;\`)를 모두 지원합니다. 이름 엔티티는 읽기 쉽지만 정해진 집합으로 제한됩니다. 숫자 엔티티는 10진수(\`&#8364;\`)나 16진수(\`&#x20AC;\`) 표기로 모든 유니코드 문자를 표현할 수 있습니다.

## 인코딩 결합

실제 데이터는 여러 인코딩 계층을 거치는 경우가 많습니다. 사용자가 앰퍼샌드가 포함된 검색어를 입력합니다. 브라우저가 HTTP 요청을 위해 URL 인코딩합니다. 서버가 디코딩한 후 HTML 응답에 HTML 엔티티 인코딩으로 포함합니다. JSON API 호출이 들어 있다면 JSON 이스케이프도 추가됩니다.

각 인코딩 계층은 올바른 순서로 적용되고 제거되어야 합니다. 순서가 섞이거나 한 계층의 디코딩을 빠뜨리면, 디버깅하기 어려운 깨진 출력이 만들어집니다.

## 보안 함의

인코딩은 인젝션 공격에 대한 첫 번째 방어선입니다. SQL 인젝션, XSS, 명령어 인젝션 모두 데이터가 코드로 해석되는 상황을 악용합니다. 올바른 인코딩은 데이터가 어떤 문자를 포함하든 데이터로만 남게 보장합니다.

맥락이 중요합니다. HTML 인코딩은 HTML 맥락에서 XSS를 방지하지만 JavaScript 맥락에서는 안 됩니다. URL 인코딩은 URL을 보호하지만 HTML 속성은 아닙니다. 데이터가 사용될 특정 맥락에 맞는 인코딩을 항상 적용하세요.

## 실용 워크플로

텍스트가 맥락 경계를 넘을 때는 이 체크리스트를 따르세요.

1. 대상 맥락을 파악한다 (URL, HTML, JSON, SQL)
2. 해당 맥락에서 특별한 문자가 무엇인지 확인한다
3. 경계에서 적절한 인코딩을 정확히 한 번 적용한다
4. 원시 텍스트 맥락으로 돌아갈 때만 디코딩한다
5. "이미 인코딩되어 있겠지"를 믿지 말고 경계에서 검증하거나 다시 인코딩한다

신뢰할 수 있는 인코딩/디코딩 도구를 가까이 두면 디버깅 시간을 줄이고 보안 취약점을 예방할 수 있습니다.`,
      },
    },
  },
  {
    slug: "clean-text-data-like-a-pro",
    app: "text",
    category: "tips",
    publishedAt: "2026-03-25",
    content: {
      en: {
        title: "Clean Text Data Like a Pro: 10 Techniques That Save Hours",
        description:
          "Practical text cleaning techniques for developers, data analysts, and content creators. From stripping invisible characters to normalizing whitespace, these methods handle the messy reality of real-world text data.",
        body: `## The Hidden Mess in Text Data

Text data is never as clean as it looks. Copy text from a web page and you get hidden formatting characters. Export from a spreadsheet and you get inconsistent line endings. Receive text from users and you get a mix of smart quotes, zero-width spaces, accented characters, and emoji. These invisible contaminants break string comparisons, corrupt database queries, and cause mysterious bugs that work fine on your machine but fail in production.

Cleaning text data is not glamorous work, but it is essential. The techniques below address the most common problems and can be applied in sequence to transform messy input into reliable, consistent text.

## 1. Normalize Line Endings

Different operating systems use different line ending conventions. Windows uses CRLF (carriage return + line feed, \\r\\n). Unix and macOS use LF (\\n). Old Mac systems used CR (\\r). When text from multiple sources is combined, mixed line endings cause parsing failures, incorrect line counts, and display issues.

The fix is simple: convert all line endings to a single standard. LF is the most common choice for modern systems. This should be the first step in any text cleaning pipeline because other operations (line counting, splitting, deduplication) depend on consistent line endings.

## 2. Strip Invisible Characters

Unicode includes dozens of invisible characters beyond the obvious space and tab. Zero-width spaces (U+200B), zero-width joiners (U+200D), byte order marks (U+FEFF), soft hyphens (U+00AD), and various control characters can lurk in text without being visible in most editors.

These characters cause problems when strings that look identical are actually different. Two names that appear the same in a UI fail an equality check because one contains a zero-width space. A URL looks correct but does not work because of an invisible character in the path.

Stripping all non-printable Unicode characters (except standard whitespace) is a safe first step for most text processing tasks.

## 3. Collapse and Normalize Whitespace

Users type multiple spaces. Copy-paste introduces non-breaking spaces (U+00A0). Tab-space mixtures create alignment problems. Leading and trailing whitespace on lines accumulates silently.

Normalizing whitespace means: replace non-breaking spaces with regular spaces, collapse runs of multiple spaces into single spaces, trim leading and trailing whitespace from each line, and convert tabs to spaces (or vice versa) based on your requirements.

## 4. Remove Duplicate Lines

Data exports, log files, and collected text often contain exact duplicates. Whether you want to identify them or remove them depends on the use case, but having the ability to do both is essential.

Removing duplicates while preserving original order is important — simply sorting and deduplicating changes the meaning of ordered data. A good deduplication tool preserves the first occurrence of each line and removes subsequent repeats.

For near-duplicates (lines that differ only in whitespace or capitalization), normalize the text before comparing but output the original version.

## 5. Remove Empty Lines

Multiple consecutive empty lines are common in pasted text and exported data. They add visual noise and inflate line counts. Removing all empty lines or collapsing consecutive empty lines into a single one keeps the text clean while preserving paragraph structure.

Be careful not to remove lines that appear empty but contain whitespace. Trim lines first, then remove truly empty ones.

## 6. Remove HTML Tags

Text scraped from web pages or copied from rich text editors often carries HTML markup that needs to go. Simple tag stripping works for most cases, but be aware of edge cases: self-closing tags, attributes with angle brackets in values, script and style blocks that contain text that should not appear in the output.

For basic cleanup, a regex that removes everything between < and > handles 90% of cases. For complete safety, use a proper HTML parser that correctly handles nested tags, entities, and edge cases.

After stripping tags, decode any remaining HTML entities (&amp; to &, &lt; to <, etc.) to get clean plain text.

## 7. Normalize Accented Characters

When working with multilingual text, accented characters can exist in multiple Unicode forms. The letter "é" can be a single code point (U+00E9, precomposed) or two code points (e + combining acute accent, decomposed). These look identical on screen but are different bytes, which breaks string matching and sorting.

Unicode normalization (NFC or NFD form) ensures consistent representation. NFC composes characters where possible, which is the most common choice for data storage. NFD decomposes them, which is useful for searching and sorting.

For cases where you need ASCII-only text — slugs, filenames, identifiers — stripping accents entirely (converting é to e, ñ to n, ü to u) may be appropriate, though this loses information and should be used cautiously with non-Latin scripts.

## 8. Remove Special Characters

Depending on the context, you may need to strip punctuation, symbols, or non-alphanumeric characters. Cleaning data for search indexing, preparing text for machine learning, or creating URL slugs all require different levels of special character removal.

Be deliberate about what you remove. Stripping all punctuation from text that contains email addresses destroys the @ signs. Removing hyphens from phone numbers changes their meaning. Define precisely which characters to keep and which to remove based on your downstream use case.

## 9. Fix Encoding Issues

Mojibake — garbled text caused by encoding mismatches — is still a common problem. Text encoded in UTF-8 but interpreted as Latin-1 produces recognizable patterns: é becomes Ã©, — becomes â€", and so on. These patterns are fixable if you can identify the original encoding.

The best approach is to prevent encoding issues: always specify encoding explicitly when reading or writing text files, use UTF-8 as the default, and verify encoding assumptions early in your data pipeline.

## 10. Remove or Replace Emojis

Emojis are multi-byte Unicode sequences that cause issues in systems expecting basic text. Some databases truncate text at the first emoji. Some APIs reject payloads containing emoji characters. Some display systems render them inconsistently.

When emojis are not needed, removing them cleanly requires handling the full range of emoji code points, including multi-character sequences (family emojis, skin tone modifiers) that span several Unicode code points.

## Building a Cleaning Pipeline

The order of operations matters. A recommended sequence:

1. Fix encoding issues first (everything else depends on correct encoding)
2. Normalize line endings
3. Strip invisible characters
4. Normalize whitespace and trim lines
5. Remove empty lines
6. Apply content-specific cleaning (HTML tags, special characters, accents)
7. Remove duplicates if needed

Each step produces cleaner input for the next. Running these operations in the wrong order — removing duplicates before normalizing whitespace, for example — produces inferior results because lines that differ only in whitespace are not recognized as duplicates.

Keep the original data intact and produce cleaned output separately. Text cleaning is not always reversible, and requirements change. Having the raw source lets you adjust and rerun the pipeline as needed.`,
      },
      ko: {
        title: "텍스트 데이터 정리의 기술: 시간을 아끼는 10가지 기법",
        description:
          "개발자, 데이터 분석가, 콘텐츠 제작자를 위한 텍스트 정리 기법. 보이지 않는 문자 제거부터 공백 정규화까지, 현실의 지저분한 텍스트 데이터를 다루는 실전 방법.",
        body: `## 텍스트 데이터 속 숨겨진 오염

텍스트 데이터는 보이는 것만큼 깨끗한 적이 없습니다. 웹 페이지에서 복사하면 숨겨진 서식 문자가 따라옵니다. 스프레드시트에서 내보내면 줄 바꿈이 들쭉날쭉합니다. 사용자에게 텍스트를 받으면 스마트 따옴표, 제로 너비 공백, 악센트 문자, 이모지가 뒤섞여 들어옵니다. 이런 보이지 않는 오염물질이 문자열 비교를 깨뜨리고, DB 쿼리를 오류 내고, 내 컴퓨터에서는 잘 되는데 프로덕션에서만 실패하는 미스터리 버그를 만듭니다.

텍스트 데이터 정리는 화려한 작업이 아니지만 필수적입니다. 아래 기법들은 가장 흔한 문제를 다루며, 순서대로 적용하면 지저분한 입력을 일관된 텍스트로 변환할 수 있습니다.

## 1. 줄 바꿈 통일

운영체제마다 줄 바꿈 규칙이 다릅니다. Windows는 CRLF(\\r\\n), Unix/macOS는 LF(\\n), 구형 Mac은 CR(\\r)을 사용합니다. 여러 출처의 텍스트가 합쳐지면 줄 바꿈이 섞여서 파싱 오류, 줄 수 오류, 표시 문제가 발생합니다.

해결은 간단합니다. 모든 줄 바꿈을 LF 하나로 통일하세요. 다른 작업(줄 수 세기, 분할, 중복 제거)이 일관된 줄 바꿈에 의존하므로, 이것이 모든 텍스트 정리의 첫 단계여야 합니다.

## 2. 보이지 않는 문자 제거

유니코드에는 공백과 탭 외에도 수십 가지 보이지 않는 문자가 있습니다. 제로 너비 공백(U+200B), 제로 너비 결합자(U+200D), 바이트 순서 표시(U+FEFF), 소프트 하이픈(U+00AD) 등이 대부분의 편집기에서 보이지 않은 채 텍스트에 숨어 있을 수 있습니다.

이 문자들은 화면에서 같아 보이는 문자열이 실제로는 다른 문제를 일으킵니다. UI에서 똑같이 보이는 두 이름이 동일성 검사에 실패합니다. URL이 정확해 보이는데 경로에 보이지 않는 문자가 있어서 작동하지 않습니다.

## 3. 공백 정규화

사용자가 스페이스를 여러 번 입력합니다. 복사-붙여넣기로 깨지지 않는 공백(U+00A0)이 들어옵니다. 탭과 스페이스가 섞여서 정렬이 어긋납니다. 줄 앞뒤의 공백이 조용히 쌓입니다.

공백 정규화란: 깨지지 않는 공백을 일반 공백으로 교체하고, 연속된 공백을 하나로 합치고, 각 줄의 앞뒤 공백을 제거하고, 탭과 스페이스를 용도에 맞게 통일하는 것입니다.

## 4. 중복 줄 제거

데이터 내보내기, 로그 파일, 수집된 텍스트에는 정확히 같은 줄이 반복되는 경우가 많습니다. 중복을 제거할 때는 원래 순서를 보존하는 것이 중요합니다. 단순 정렬 후 중복 제거는 순서가 있는 데이터의 의미를 바꿔 버립니다.

공백이나 대소문자만 다른 유사 중복을 처리할 때는 비교 전에 정규화하되, 출력은 원본 버전을 사용하세요.

## 5. 빈 줄 제거

붙여 넣은 텍스트나 내보낸 데이터에는 연속된 빈 줄이 흔합니다. 모든 빈 줄을 제거하거나 연속된 빈 줄을 하나로 합치면 문단 구조를 유지하면서 텍스트가 깔끔해집니다.

빈 것처럼 보이지만 공백이 포함된 줄에 주의하세요. 줄을 먼저 트림한 다음 진짜 빈 줄을 제거하세요.

## 6. HTML 태그 제거

웹 페이지에서 스크래핑하거나 리치 텍스트 편집기에서 복사한 텍스트에는 HTML 마크업이 섞여 있는 경우가 많습니다. 기본적인 태그 제거는 < 와 > 사이의 모든 것을 제거하는 정규식으로 대부분 처리됩니다.

태그 제거 후 남아 있는 HTML 엔티티(&amp;를 &로, &lt;를 <로 등)도 디코딩해서 깨끗한 일반 텍스트를 만드세요.

## 7. 악센트 문자 정규화

다국어 텍스트에서 악센트 문자는 여러 유니코드 형태로 존재할 수 있습니다. "é"가 단일 코드 포인트(U+00E9)일 수도 있고, e + 결합 악센트 두 코드 포인트일 수도 있습니다. 화면에서는 같아 보이지만 바이트가 다르기 때문에 문자열 매칭과 정렬이 깨집니다.

유니코드 정규화(NFC 또는 NFD)로 일관된 표현을 보장합니다. NFC는 가능한 곳에서 문자를 합성하며 데이터 저장에 가장 흔히 사용됩니다.

슬러그, 파일명, 식별자처럼 ASCII만 필요한 경우에는 악센트를 완전히 제거(é→e, ñ→n, ü→u)할 수 있지만, 정보 손실이 있으므로 주의해서 사용하세요.

## 8. 특수 문자 제거

검색 인덱싱용 데이터 정리, 머신러닝을 위한 텍스트 전처리, URL 슬러그 생성 등 맥락에 따라 구두점이나 기호를 제거해야 할 수 있습니다.

제거 대상을 신중하게 정하세요. 이메일 주소가 포함된 텍스트에서 구두점을 전부 없애면 @가 사라집니다. 전화번호에서 하이픈을 제거하면 의미가 달라집니다. 다음 단계에서 필요한 문자가 무엇인지 정확히 파악한 후 제거하세요.

## 9. 인코딩 문제 수정

모지바케 — 인코딩 불일치로 인한 글자 깨짐 — 는 여전히 흔한 문제입니다. UTF-8로 인코딩된 텍스트를 Latin-1로 해석하면 특유의 패턴이 나타납니다. 원래 인코딩을 파악할 수 있다면 이 패턴은 복구 가능합니다.

예방이 최선입니다. 텍스트 파일을 읽고 쓸 때 항상 인코딩을 명시하고, UTF-8을 기본으로 사용하며, 데이터 파이프라인 초반에 인코딩 가정을 검증하세요.

## 10. 이모지 제거 또는 대체

이모지는 멀티바이트 유니코드 시퀀스로, 기본 텍스트만 기대하는 시스템에서 문제를 일으킵니다. 일부 DB는 첫 이모지에서 텍스트를 잘라버리고, 일부 API는 이모지가 포함된 페이로드를 거부하고, 표시 시스템마다 렌더링이 달라집니다.

이모지를 깨끗하게 제거하려면 가족 이모지, 피부색 수정자 등 여러 유니코드 코드 포인트에 걸친 다중 문자 시퀀스까지 처리해야 합니다.

## 정리 파이프라인 구축

작업 순서가 중요합니다. 권장 순서:

1. 인코딩 문제 먼저 수정 (나머지 모든 것이 올바른 인코딩에 의존)
2. 줄 바꿈 통일
3. 보이지 않는 문자 제거
4. 공백 정규화 및 줄 트림
5. 빈 줄 제거
6. 내용별 정리 적용 (HTML 태그, 특수 문자, 악센트)
7. 필요 시 중복 제거

각 단계가 다음 단계에 더 깨끗한 입력을 제공합니다. 순서가 잘못되면 — 예를 들어 공백 정규화 전에 중복을 제거하면 — 공백만 다른 줄이 중복으로 인식되지 않아 결과가 나빠집니다.

원본 데이터는 그대로 보관하고 정리된 출력을 별도로 만드세요. 텍스트 정리는 항상 되돌릴 수 있는 게 아니며, 요구 사항은 바뀝니다. 원시 소스가 있으면 필요에 따라 파이프라인을 조정하고 다시 실행할 수 있습니다.`,
      },
    },
  },
  {
    slug: "generate-secure-passwords",
    app: "text",
    category: "knowledge",
    publishedAt: "2026-03-25",
    content: {
      en: {
        title: "The Science of Secure Passwords: How Randomness Defeats Hackers",
        description:
          "Learn why password strength depends on randomness rather than complexity rules, how password attacks work, and practical strategies for generating and managing truly secure passwords.",
        body: `## Why Most Passwords Are Weak

The average person reuses the same password across multiple sites, substitutes obvious characters (@ for a, 3 for e), and considers "P@ssw0rd123!" a strong password. Unfortunately, attackers know all of these patterns. Modern password cracking tools test billions of combinations per second and incorporate dictionaries of common passwords, known substitution patterns, and leaked password databases.

A password is only as strong as the difficulty of guessing it. That difficulty comes from one source: genuine randomness. Not cleverness, not length alone, not complexity rules — randomness.

## How Password Attacks Work

### Brute Force

Brute force testing tries every possible combination of characters. For a password using lowercase letters only, there are 26 choices per character. An 8-character lowercase password has 26^8 (about 209 billion) possibilities. This sounds large, but a modern GPU can test billions of hashes per second, cracking such a password in minutes.

Adding uppercase letters, digits, and symbols increases the character set but follows the same math. The real defense is length multiplied by character set size — the total number of possible passwords.

### Dictionary Attacks

Dictionary attacks start with lists of common passwords ("password", "123456", "qwerty"), common words, names, and previously leaked passwords. They then apply common transformations: capitalizing the first letter, appending numbers, replacing characters with look-alikes. This approach cracks passwords that feel creative to humans but follow predictable patterns.

### Credential Stuffing

When a service gets breached and passwords leak, attackers try those same email/password combinations on other services. Because most people reuse passwords, this works alarmingly often. The defense is simple: never use the same password twice.

## What Makes a Password Strong

### Entropy

Password strength is measured in bits of entropy — a mathematical measure of unpredictability. Each bit of entropy doubles the number of possible passwords. A password with 40 bits of entropy has about one trillion possibilities. A password with 80 bits has about one sextillion possibilities.

For practical security in 2026, aim for at least 80 bits of entropy for important accounts and 60 bits for less critical ones.

### Character Set Size

Using only lowercase letters gives 26 options per character. Adding uppercase doubles it to 52. Adding digits gives 62. Adding common symbols pushes it to 90 or more. Each additional character multiplied by the set size exponentially increases the total possibilities.

A 12-character password using the full 90+ character set provides more entropy than a 20-character password using only lowercase letters.

### Length

Length has a multiplicative effect on entropy. Each additional character multiplies the total possibilities by the character set size. A 16-character random password is astronomically harder to crack than an 8-character one, even with the same character set.

The most efficient approach combines reasonable length (12-16 characters) with a broad character set (letters, digits, symbols).

## Random Password Generation

Truly random passwords cannot be generated by humans. We are biased toward patterns, familiar sequences, and keyboard layouts. Even when trying to be random, humans produce passwords with significantly less entropy than true randomness.

Cryptographically secure random number generators (CSPRNGs) produce genuine randomness suitable for password generation. These algorithms draw from hardware entropy sources (mouse movements, disk timing, electrical noise) and produce output that is mathematically unprovable to predict.

When generating a random password:

- Use a CSPRNG, not Math.random() or similar pseudo-random functions
- Specify the character set explicitly (uppercase, lowercase, digits, symbols)
- Set the length based on your entropy requirements
- Generate a new independent password for each account

## Passphrase Approach

An alternative to random character passwords is the passphrase: several randomly selected words joined together. "correct-horse-battery-staple" is easier to remember than "j7#Kx9$mR2&p" while providing comparable entropy, assuming the words are truly randomly selected from a large dictionary.

The key requirement is the same: genuine randomness. A passphrase of four words randomly selected from a 7,776-word dictionary (the Diceware approach) provides about 51 bits of entropy. Six words provide about 77 bits. These numbers assume the attacker knows your method — the security comes from the randomness of selection, not from keeping the method secret.

Do not pick words that form a meaningful phrase or relate to each other. "my-dog-loves-walks" is a terrible passphrase because the words are related and predictable. "quantum-mailbox-furnace-eleven" is much better because the combination is arbitrary.

## Password Managers

The practical problem with unique random passwords is remembering them. You cannot memorize 50 different 16-character random strings. Password managers solve this by storing all your passwords in an encrypted vault protected by a single master password.

Your master password is the one password you need to make truly strong — at least 80 bits of entropy, either a long random string or a 6+ word passphrase. Everything else is generated and stored by the manager.

## Common Mistakes

**Adding a number to a weak password**: "password1" is not meaningfully stronger than "password". Attackers test these variations automatically.

**Personal information**: Birthdays, pet names, addresses, and phone numbers are easily discovered and commonly used in targeted attacks.

**Keyboard patterns**: "qwertyuiop", "1qaz2wsx", and similar patterns are in every attacker's dictionary.

**Short passwords with special characters**: "A1@b" has very little entropy despite using all character types. Length matters more than character variety.

**Rotating passwords on a schedule**: Forced password changes lead to predictable patterns (Password1, Password2, Password3). Change passwords when compromised, not on a calendar.

## Practical Recommendations

Use a password manager for everything. Generate random passwords of at least 16 characters using all character types. Use a strong passphrase as your master password. Enable two-factor authentication wherever available — it adds a second layer that protects you even if a password is compromised.

For the few passwords you must memorize (master password, device unlock), use the passphrase method with at least six randomly selected words. Write them down and store the paper securely until you have memorized them, then destroy the paper.

Security is not about creating one perfect password. It is about making every password unique, random, and long enough that cracking it is not worth the attacker's time.`,
      },
      ko: {
        title: "안전한 비밀번호의 과학: 무작위성이 해커를 이기는 원리",
        description:
          "비밀번호 강도가 복잡성 규칙이 아닌 무작위성에 달려 있는 이유, 비밀번호 공격의 작동 방식, 그리고 진정으로 안전한 비밀번호를 생성하고 관리하는 전략을 정리했습니다.",
        body: `## 대부분의 비밀번호가 약한 이유

보통 사람은 여러 사이트에서 같은 비밀번호를 재사용하고, 뻔한 문자 치환(@를 a 대신, 3을 e 대신)을 하고, "P@ssw0rd123!"이 강한 비밀번호라고 생각합니다. 안타깝게도 공격자는 이 패턴을 전부 알고 있습니다. 현대의 비밀번호 크래킹 도구는 초당 수십억 개의 조합을 테스트하며, 흔한 비밀번호 사전, 알려진 치환 패턴, 유출된 비밀번호 데이터베이스를 활용합니다.

비밀번호의 강도는 오직 한 가지에 달려 있습니다: 진짜 무작위성. 영리함이 아니라, 길이만이 아니라, 복잡성 규칙이 아니라 — 무작위성입니다.

## 비밀번호 공격의 작동 방식

### 무차별 대입(Brute Force)

가능한 모든 문자 조합을 시도합니다. 소문자만 사용하는 8글자 비밀번호는 26^8(약 2090억) 가지입니다. 많아 보이지만 최신 GPU는 초당 수십억 개의 해시를 테스트할 수 있어서, 이런 비밀번호는 몇 분이면 깨집니다.

대문자, 숫자, 기호를 추가하면 문자 집합이 커지지만 수학은 같습니다. 진짜 방어는 길이와 문자 집합 크기의 곱 — 가능한 비밀번호의 총 수입니다.

### 사전 공격

흔한 비밀번호("password", "123456", "qwerty"), 일반 단어, 이름, 이전에 유출된 비밀번호 목록으로 시작합니다. 그다음 첫 글자 대문자화, 숫자 추가, 문자 치환 같은 흔한 변형을 적용합니다. 사람에게는 창의적으로 느껴지지만 예측 가능한 패턴을 따르는 비밀번호가 이렇게 깨집니다.

### 크리덴셜 스터핑

서비스가 해킹되어 비밀번호가 유출되면, 공격자는 같은 이메일/비밀번호 조합을 다른 서비스에서 시도합니다. 대부분의 사람이 비밀번호를 재사용하기 때문에, 놀라울 정도로 잘 작동합니다. 방어는 간단합니다: 같은 비밀번호를 두 번 쓰지 마세요.

## 강한 비밀번호의 조건

### 엔트로피

비밀번호 강도는 엔트로피 비트 수로 측정됩니다. 엔트로피 1비트가 늘 때마다 가능한 비밀번호 수가 두 배가 됩니다. 40비트 엔트로피는 약 1조 가지, 80비트는 약 100경 가지 가능성입니다.

2026년 기준 실용적 보안을 위해 중요한 계정은 최소 80비트, 덜 중요한 계정은 60비트 이상을 목표로 하세요.

### 문자 집합 크기

소문자만 쓰면 문자당 26가지 선택지입니다. 대문자를 더하면 52, 숫자를 더하면 62, 기호까지 넣으면 90 이상이 됩니다. 문자 집합이 클수록 같은 길이에서도 가능한 조합이 기하급수적으로 늘어납니다.

90+ 문자 집합의 12글자 비밀번호가 소문자만 쓴 20글자 비밀번호보다 엔트로피가 더 높습니다.

### 길이

길이는 엔트로피에 곱셈 효과를 줍니다. 문자 하나가 추가될 때마다 전체 가능성이 문자 집합 크기만큼 곱해집니다. 16글자 무작위 비밀번호는 8글자보다 천문학적으로 깨기 어렵습니다.

적절한 길이(12~16자)와 넓은 문자 집합(문자, 숫자, 기호)을 조합하는 것이 가장 효율적입니다.

## 무작위 비밀번호 생성

진정한 무작위 비밀번호는 사람이 만들 수 없습니다. 우리는 패턴, 익숙한 시퀀스, 키보드 배열 쪽으로 편향되어 있습니다. 무작위로 만들려고 해도 사람이 만든 비밀번호는 진정한 무작위보다 엔트로피가 현저히 낮습니다.

암호학적으로 안전한 난수 생성기(CSPRNG)가 비밀번호 생성에 적합한 진정한 무작위성을 제공합니다. 이 알고리즘은 하드웨어 엔트로피 소스에서 추출하여 수학적으로 예측 불가능한 출력을 만듭니다.

무작위 비밀번호를 생성할 때:

- Math.random() 같은 유사 난수가 아닌 CSPRNG을 사용하세요
- 문자 집합(대문자, 소문자, 숫자, 기호)을 명시적으로 지정하세요
- 엔트로피 요구 사항에 따라 길이를 설정하세요
- 계정마다 새로운 독립 비밀번호를 생성하세요

## 패스프레이즈 방식

무작위 문자 비밀번호의 대안은 패스프레이즈입니다. 무작위로 선택된 여러 단어를 연결하는 방식입니다. "correct-horse-battery-staple"은 "j7#Kx9$mR2&p"보다 외우기 쉬우면서 비슷한 수준의 엔트로피를 제공합니다(단어가 진정 무작위로 선택된 경우).

핵심 요구 사항은 같습니다: 진짜 무작위성. 7,776개 단어 사전에서 무작위로 4단어를 선택하면(Diceware 방식) 약 51비트 엔트로피를 제공합니다. 6단어면 약 77비트입니다.

의미 있는 문장을 이루거나 서로 관련된 단어를 고르면 안 됩니다. "my-dog-loves-walks"는 단어들이 관련되어 예측 가능하므로 나쁜 패스프레이즈입니다. "quantum-mailbox-furnace-eleven"은 조합이 자의적이므로 훨씬 낫습니다.

## 비밀번호 관리자

고유한 무작위 비밀번호의 현실적 문제는 기억입니다. 16글자 무작위 문자열 50개를 외울 수는 없습니다. 비밀번호 관리자는 모든 비밀번호를 하나의 마스터 비밀번호로 보호되는 암호화 금고에 저장합니다.

마스터 비밀번호만 정말 강하게 만드세요 — 최소 80비트 엔트로피, 긴 무작위 문자열이나 6단어 이상의 패스프레이즈. 나머지는 관리자가 생성하고 저장합니다.

## 흔한 실수

**약한 비밀번호에 숫자 추가**: "password1"은 "password"보다 의미 있게 강해지지 않습니다. 공격자는 이런 변형을 자동으로 테스트합니다.

**개인 정보**: 생일, 반려동물 이름, 주소, 전화번호는 쉽게 알아낼 수 있고, 표적 공격에 흔히 사용됩니다.

**키보드 패턴**: "qwertyuiop", "1qaz2wsx" 같은 패턴은 모든 공격자의 사전에 들어 있습니다.

**특수 문자가 포함된 짧은 비밀번호**: "A1@b"는 모든 문자 유형을 사용해도 엔트로피가 매우 낮습니다. 문자 다양성보다 길이가 더 중요합니다.

**주기적 비밀번호 변경**: 강제 변경은 예측 가능한 패턴(Password1, Password2, Password3)을 만듭니다. 일정에 따라가 아니라 유출되었을 때 변경하세요.

## 실용적 권장 사항

모든 곳에 비밀번호 관리자를 사용하세요. 모든 문자 유형을 포함한 최소 16글자 무작위 비밀번호를 생성하세요. 마스터 비밀번호는 강한 패스프레이즈를 사용하세요. 가능한 곳마다 이중 인증을 활성화하세요 — 비밀번호가 유출되더라도 보호하는 두 번째 방어선입니다.

보안은 완벽한 비밀번호 하나를 만드는 게 아닙니다. 모든 비밀번호를 고유하고, 무작위로, 깨는 데 공격자의 시간을 쏟을 가치가 없을 만큼 충분히 길게 만드는 것입니다.`,
      },
    },
  },
  {
    slug: "unit-conversion-guide",
    app: "converter",
    category: "guide",
    publishedAt: "2026-03-20",
    content: {
      en: {
        title:
          "The Complete Guide to Unit Conversion: From Metric to Imperial and Beyond",
        description:
          "Master unit conversion with our comprehensive guide covering length, weight, temperature, volume, and more.",
        body: `## Two Systems, One World

Most of the world uses the metric system — meters, kilograms, liters, and degrees Celsius. The United States, along with a handful of other countries, primarily uses the imperial system — feet, pounds, gallons, and degrees Fahrenheit. Whether you are cooking a recipe from another country, shopping internationally, or working on a science project, you will inevitably need to convert between these two systems.

The metric system is built on powers of ten, which makes internal conversions straightforward. One kilometer equals 1,000 meters. One kilogram equals 1,000 grams. The imperial system, by contrast, relies on seemingly arbitrary relationships: 12 inches in a foot, 3 feet in a yard, 5,280 feet in a mile. This inconsistency is exactly why conversion tools exist.

## Common Length and Weight Conversions

For length, the most frequently needed conversions are between inches and centimeters (1 inch = 2.54 cm), feet and meters (1 foot = 0.3048 m), and miles and kilometers (1 mile = 1.609 km). A quick mental shortcut: multiply miles by 1.6 to get approximate kilometers.

For weight, the key relationship is between pounds and kilograms (1 pound = 0.4536 kg). If you need a rough estimate, divide pounds by 2.2 to get kilograms. Ounces to grams is another common conversion: 1 ounce equals approximately 28.35 grams.

## Temperature: The Tricky One

Temperature conversion trips people up because it is not a simple multiplication. To convert Fahrenheit to Celsius, subtract 32 and multiply by 5/9. To go from Celsius to Fahrenheit, multiply by 9/5 and add 32. Some handy reference points to memorize: 0°C = 32°F (freezing point of water), 100°C = 212°F (boiling point), and 37°C = 98.6°F (normal body temperature).

## Volume Conversions

Volume gets confusing because the US gallon and the imperial gallon are different sizes. A US gallon is about 3.785 liters, while an imperial gallon is approximately 4.546 liters. For cooking, teaspoons (5 mL), tablespoons (15 mL), and cups (about 237 mL in the US) are the units you will convert most often.

## Tips for Remembering Conversions

Rather than memorizing exact numbers, anchor a few key reference points. A meter is roughly a yard plus 10 percent. A kilogram is about 2.2 pounds. Room temperature is around 20–22°C or 68–72°F. From these anchors, you can estimate most everyday conversions with reasonable accuracy.

## Let Tools Do the Math

For anything beyond rough estimates, a dedicated converter tool eliminates errors. ToolPop's unit converter handles length, weight, temperature, volume, area, speed, and more — all instantly in your browser with no installation needed. Bookmark it, and you will never struggle with unit conversion again.`,
      },
      ko: {
        title: "단위 변환 완벽 가이드: 미터법에서 야드파운드법까지",
        description:
          "길이, 무게, 온도, 부피 등 다양한 단위 변환을 완벽하게 마스터하세요.",
        body: `## 전 세계가 쓰는 두 가지 체계

전 세계 대부분의 나라는 미터법을 사용합니다. 미터, 킬로그램, 리터, 섭씨. 반면 미국을 비롯한 일부 국가는 야드파운드법을 고집합니다. 피트, 파운드, 갤런, 화씨. 해외 쇼핑, 외국 레시피, 영어권 자료를 볼 때마다 단위 변환이 필요해지는 이유입니다.

미터법은 10의 거듭제곱으로 구성되어 있어 체계 내 변환이 직관적입니다. 1킬로미터는 1,000미터, 1킬로그램은 1,000그램. 반면 야드파운드법은 1피트가 12인치, 1야드가 3피트, 1마일이 5,280피트처럼 관계가 들쭉날쭉합니다. 변환 도구가 꼭 필요한 이유죠.

## 자주 쓰는 길이·무게 변환

길이에서 가장 많이 쓰이는 변환은 인치 ↔ 센티미터(1인치 = 2.54cm), 피트 ↔ 미터(1피트 = 0.3048m), 마일 ↔ 킬로미터(1마일 = 1.609km)입니다. 빠른 암산법이 있습니다. 마일에 1.6을 곱하면 대략적인 킬로미터 값이 나옵니다.

무게는 파운드 ↔ 킬로그램(1파운드 = 0.4536kg) 변환이 핵심입니다. 대략적으로 파운드를 2.2로 나누면 킬로그램이 됩니다. 온스 ↔ 그램도 자주 쓰입니다. 1온스는 약 28.35그램입니다.

## 온도: 가장 헷갈리는 변환

온도 변환은 단순 곱셈이 아니라서 까다롭습니다. 화씨를 섭씨로 바꾸려면 32를 빼고 5/9를 곱합니다. 섭씨를 화씨로 바꾸려면 9/5를 곱하고 32를 더합니다. 외워두면 좋은 기준점이 있습니다. 0°C = 32°F(물의 어는점), 100°C = 212°F(물의 끓는점), 37°C = 98.6°F(정상 체온).

## 부피 변환

부피는 미국 갤런과 영국 갤런이 다르기 때문에 혼동하기 쉽습니다. 미국 갤런은 약 3.785리터, 영국 갤런은 약 4.546리터입니다. 요리할 때는 티스푼(5mL), 테이블스푼(15mL), 컵(미국 기준 약 237mL) 변환을 가장 많이 하게 됩니다.

## 변환을 쉽게 기억하는 법

정확한 숫자를 모두 외우기보다, 몇 가지 기준점을 잡아두세요. 1미터는 1야드보다 약 10% 긴 정도. 1킬로그램은 약 2.2파운드. 실내 적정 온도는 20~22°C, 즉 68~72°F. 이 기준점만 알면 일상적인 변환 대부분을 합리적인 수준으로 추정할 수 있습니다.

## 정확한 변환은 도구에 맡기세요

대략적인 추정을 넘어서는 정확한 변환이 필요하다면, 전용 변환 도구를 쓰는 게 가장 확실합니다. ToolPop의 단위 변환기는 길이, 무게, 온도, 부피, 면적, 속도 등을 브라우저에서 바로 변환해 줍니다. 설치도, 회원가입도 필요 없습니다.`,
      },
    },
  },
  {
    slug: "color-formats-explained",
    app: "converter",
    category: "knowledge",
    publishedAt: "2026-03-18",
    content: {
      en: {
        title:
          "HEX, RGB, HSL Explained: Understanding Color Formats for Web Design",
        description:
          "Learn the differences between HEX, RGB, HSL, and other color formats used in web design and digital art.",
        body: `## Why So Many Color Formats?

If you have ever worked with CSS, a design tool, or image editing software, you have encountered multiple ways to represent the same color. A vivid red might appear as #FF0000, rgb(255, 0, 0), or hsl(0, 100%, 50%). They all describe the same color — so why do different formats exist? Each one was designed for a specific purpose, and understanding their strengths will make you a more effective designer or developer.

## HEX: The Web Standard

HEX color codes are the most recognized color format on the web. A HEX code like #3A86FF consists of three pairs of hexadecimal digits representing red, green, and blue channels, each ranging from 00 to FF (0 to 255 in decimal). An optional fourth pair adds alpha transparency, like #3A86FF80 for 50% opacity.

HEX codes are compact and easy to copy-paste, which is why designers and developers use them so frequently. However, they are not human-readable — glancing at #3A86FF tells you very little about what the color actually looks like.

## RGB: Direct Channel Control

RGB stands for Red, Green, Blue and directly represents how screens produce color by mixing light. The notation rgb(58, 134, 255) specifies the intensity of each channel from 0 to 255. Modern CSS also supports the rgba() function for transparency: rgba(58, 134, 255, 0.5).

RGB is the native language of displays, making it the natural choice for programmatic color manipulation. If you need to adjust a single channel — make something slightly more blue, for example — RGB makes this straightforward.

## HSL: Designed for Humans

HSL stands for Hue, Saturation, Lightness, and it models color the way humans actually think about it. Hue is a degree on the color wheel (0–360), saturation is how vivid the color is (0–100%), and lightness is how bright it is (0–100%).

HSL shines when you need to create color palettes. Want a darker version of your brand color? Lower the lightness. Want a muted variant? Reduce the saturation. These adjustments are intuitive in HSL but require awkward calculations in HEX or RGB.

## HSV/HSB: The Designer's Variant

HSV (Hue, Saturation, Value) — sometimes called HSB (Brightness) — is closely related to HSL but handles brightness differently. In HSV, a value of 100% always means the most vivid version of the color, while in HSL, 100% lightness always means white. Most color pickers in design tools like Figma and Photoshop use HSV because its brightness model feels more natural when visually selecting colors.

## CMYK: For Print

While HEX, RGB, and HSL are screen-based (additive color), CMYK (Cyan, Magenta, Yellow, Key/Black) is a subtractive model used in printing. Screens start with black and add light; printers start with white paper and add ink. If your work will be printed, you need to consider CMYK, as some vibrant screen colors cannot be reproduced with ink.

## Choosing the Right Format

Use HEX for quick, compact color references in CSS and sharing with others. Use RGB when you need to manipulate individual color channels programmatically. Use HSL when building color systems, themes, or accessible palettes — its intuitive model makes creating consistent variations effortless. And when converting between any of these formats, a dedicated color converter tool ensures precision every time.`,
      },
      ko: {
        title:
          "HEX, RGB, HSL 완전 정복: 웹 디자인 색상 포맷 이해하기",
        description:
          "웹 디자인과 디지털 아트에서 쓰이는 HEX, RGB, HSL 등 색상 포맷의 차이점을 알아보세요.",
        body: `## 왜 색상 포맷이 이렇게 많을까?

CSS나 디자인 도구, 이미지 편집 소프트웨어를 다뤄봤다면 같은 색상을 여러 방식으로 표현하는 걸 보셨을 겁니다. 선명한 빨강이 #FF0000일 수도, rgb(255, 0, 0)일 수도, hsl(0, 100%, 50%)일 수도 있죠. 전부 같은 색인데 왜 다른 포맷이 존재할까요? 각 포맷은 고유한 목적에 맞게 설계되었고, 이를 이해하면 디자인과 개발 작업이 훨씬 수월해집니다.

## HEX: 웹의 표준

HEX 컬러 코드는 웹에서 가장 널리 쓰이는 색상 표기법입니다. #3A86FF처럼 16진수 두 자리씩 세 쌍으로 빨강, 초록, 파랑 채널을 나타내며, 각각 00부터 FF까지(10진수로 0~255) 값을 가집니다. 네 번째 쌍을 추가하면 투명도도 지정할 수 있습니다.

HEX 코드는 간결하고 복사·붙여넣기가 편해서 자주 쓰입니다. 다만 사람이 읽기에는 직관적이지 않습니다. #3A86FF만 보고 어떤 색인지 바로 떠올리기 어렵죠.

## RGB: 화면의 기본 언어

RGB는 Red, Green, Blue의 약자로 화면이 빛을 섞어 색을 만드는 방식을 그대로 반영합니다. rgb(58, 134, 255)는 각 채널의 강도를 0에서 255 사이로 지정합니다. rgba()를 쓰면 투명도도 조절할 수 있습니다.

RGB는 디스플레이의 원래 언어이므로, 프로그래밍으로 색상을 조작할 때 자연스럽습니다. 특정 채널만 살짝 조정하고 싶을 때 — 예를 들어 파랑을 조금 더 넣고 싶을 때 — RGB가 가장 직관적입니다.

## HSL: 사람을 위한 포맷

HSL은 Hue(색상), Saturation(채도), Lightness(명도)의 약자로, 사람이 색을 인식하는 방식에 가깝게 설계되었습니다. 색상은 색상환의 각도(0~360), 채도는 색의 선명함(0~100%), 명도는 밝기(0~100%)입니다.

HSL은 컬러 팔레트를 만들 때 빛을 발합니다. 브랜드 색상을 좀 더 어둡게? 명도를 내리면 됩니다. 차분한 톤으로? 채도를 줄이면 됩니다. HSL에서는 직관적인 이 조정이 HEX나 RGB에서는 번거로운 계산을 요구합니다.

## HSV/HSB: 디자이너의 선택

HSV(Hue, Saturation, Value) — HSB(Brightness)라고도 부릅니다 — 는 HSL과 비슷하지만 밝기 처리 방식이 다릅니다. HSV에서 Value 100%는 해당 색의 가장 선명한 상태를 뜻하고, HSL에서 Lightness 100%는 항상 흰색입니다. Figma나 Photoshop 같은 디자인 도구의 컬러 피커 대부분이 HSV를 쓰는 이유가 여기 있습니다.

## CMYK: 인쇄를 위한 포맷

HEX, RGB, HSL이 빛을 더하는 가산혼합이라면, CMYK(Cyan, Magenta, Yellow, Key/Black)는 잉크를 겹치는 감산혼합 모델입니다. 화면은 검정에서 빛을 더하고, 프린터는 흰 종이에 잉크를 올립니다. 화면에서 선명하게 보이는 색이 인쇄하면 탁해지는 경우가 있는 건 이 차이 때문입니다.

## 상황에 맞는 포맷 선택법

CSS에서 빠르게 색을 지정하고 공유할 때는 HEX. 프로그래밍으로 개별 채널을 조작할 때는 RGB. 색상 시스템이나 테마, 접근성을 고려한 팔레트를 구성할 때는 HSL이 적합합니다. 포맷 간 변환이 필요하다면, 전용 색상 변환 도구를 쓰면 오차 없이 정확하게 변환할 수 있습니다.`,
      },
    },
  },
  {
    slug: "json-data-conversion",
    app: "converter",
    category: "tips",
    publishedAt: "2026-03-15",
    content: {
      en: {
        title:
          "JSON to YAML, CSV, XML: Quick Tips for Data Format Conversion",
        description:
          "Practical tips for converting between popular data formats like JSON, YAML, CSV, and XML.",
        body: `## Every Format Has Its Place

Data comes in many shapes. JSON dominates web APIs. YAML powers configuration files for Docker, Kubernetes, and CI/CD pipelines. CSV remains the universal language of spreadsheets and tabular data. XML still underpins enterprise systems, RSS feeds, and document standards like SVG. Knowing when and how to convert between these formats is an everyday skill for developers, analysts, and system administrators.

## JSON: The API Standard

JSON (JavaScript Object Notation) is lightweight, human-readable, and natively supported in virtually every programming language. Its nested key-value structure handles complex, hierarchical data well. If you are working with REST APIs, browser storage, or NoSQL databases, JSON is almost certainly your default format.

One limitation: JSON does not support comments. If you need annotated configuration files, YAML or JSON5 may be a better fit.

## YAML: Configuration Made Readable

YAML (YAML Ain't Markup Language) uses indentation instead of braces, making it visually cleaner for configuration files. It supports comments, multi-line strings, and anchors for reusing values. Kubernetes manifests, GitHub Actions workflows, and Ansible playbooks all rely on YAML.

When converting JSON to YAML, watch out for indentation errors — a single misplaced space can break your file. Also, YAML interprets some values unexpectedly: "no" becomes a boolean false, and "3.0" might become a float. Quoting strings explicitly avoids these surprises.

## CSV: Simple and Universal

CSV (Comma-Separated Values) is the go-to format for flat, tabular data. Every spreadsheet application, database tool, and data analysis library can import and export CSV. It is also extremely compact — no structural overhead like tags or braces.

The biggest pitfall when converting to CSV is losing hierarchical structure. JSON and XML support nesting; CSV does not. When flattening nested data into CSV, you must decide how to handle arrays and nested objects — common approaches include dot notation for keys (user.address.city) or splitting into multiple CSV files.

## XML: The Enterprise Workhorse

XML (eXtensible Markup Language) uses opening and closing tags to structure data. It is verbose compared to JSON but offers features like schemas (XSD), namespaces, and attributes that make it powerful for complex, formally validated data structures.

When converting between JSON and XML, remember that XML has concepts without direct JSON equivalents — attributes versus elements, for example. Most conversion tools map attributes using a convention like "@attributeName" in JSON, but verify this matches your target system's expectations.

## Practical Conversion Tips

**Validate before converting.** Malformed input produces garbage output. Run your JSON through a linter or your XML through a well-formedness check first.

**Preserve data types intentionally.** CSV treats everything as strings. When converting from JSON to CSV and back, numbers, booleans, and nulls may lose their types.

**Handle encoding consistently.** UTF-8 is the safest default. CSV files from Excel are often encoded in Windows-1252, which can corrupt non-ASCII characters if not handled properly.

**Use a reliable tool.** Manual format conversion is tedious and error-prone. ToolPop's data format converters handle JSON, YAML, CSV, and XML transformations instantly, preserving structure and formatting so you can focus on the data itself.`,
      },
      ko: {
        title:
          "JSON ↔ YAML, CSV, XML: 데이터 형식 변환 실전 팁",
        description:
          "JSON, YAML, CSV, XML 등 주요 데이터 형식 간 변환 시 알아두면 좋은 실전 팁을 정리했습니다.",
        body: `## 각 형식에는 이유가 있다

데이터는 다양한 형태로 존재합니다. JSON은 웹 API의 표준이고, YAML은 Docker, Kubernetes, CI/CD 파이프라인의 설정 파일에 쓰입니다. CSV는 스프레드시트와 표 형태 데이터의 만국 공통어이고, XML은 엔터프라이즈 시스템, RSS 피드, SVG 같은 문서 표준의 기반입니다. 이들 사이를 자유롭게 변환하는 건 개발자, 분석가, 시스템 관리자의 필수 기술입니다.

## JSON: API의 기본 언어

JSON(JavaScript Object Notation)은 가볍고 사람이 읽기 쉬우며, 거의 모든 프로그래밍 언어에서 기본 지원됩니다. 중첩된 키-값 구조 덕분에 복잡한 계층형 데이터도 잘 표현합니다. REST API, 브라우저 스토리지, NoSQL 데이터베이스를 다룬다면 JSON이 기본 선택지입니다.

한 가지 단점이 있습니다. JSON은 주석을 지원하지 않습니다. 설정 파일에 설명을 달아야 한다면 YAML이나 JSON5가 더 낫습니다.

## YAML: 읽기 쉬운 설정 파일

YAML은 중괄호 대신 들여쓰기로 구조를 표현해서 설정 파일에서 시각적으로 훨씬 깔끔합니다. 주석, 여러 줄 문자열, 값을 재사용하는 앵커 기능도 지원합니다. Kubernetes 매니페스트, GitHub Actions 워크플로, Ansible 플레이북이 모두 YAML 기반입니다.

JSON을 YAML로 변환할 때 주의할 점이 있습니다. 들여쓰기 오류 — 공백 하나 차이로 파일 전체가 깨질 수 있습니다. 또한 YAML은 일부 값을 예상과 다르게 해석합니다. "no"는 불리언 false가 되고, "3.0"은 실수로 바뀔 수 있습니다. 문자열을 명시적으로 따옴표로 감싸면 이런 문제를 피할 수 있습니다.

## CSV: 단순하고 보편적

CSV(Comma-Separated Values)는 평면적 표 형태 데이터의 기본 형식입니다. 모든 스프레드시트 앱, 데이터베이스 도구, 데이터 분석 라이브러리가 CSV를 가져오고 내보낼 수 있습니다. 태그나 중괄호 같은 구조적 오버헤드가 없어서 극도로 가볍기도 합니다.

CSV로 변환할 때 가장 큰 함정은 계층 구조가 사라진다는 점입니다. JSON과 XML은 중첩을 지원하지만 CSV는 그렇지 않습니다. 중첩 데이터를 CSV로 평탄화할 때는 배열과 중첩 객체를 어떻게 처리할지 결정해야 합니다. 키에 점 표기법(user.address.city)을 쓰거나, 여러 CSV 파일로 분리하는 방법이 일반적입니다.

## XML: 엔터프라이즈의 주력

XML은 여는 태그와 닫는 태그로 데이터를 구조화합니다. JSON보다 장황하지만, 스키마(XSD), 네임스페이스, 속성(attribute) 같은 기능 덕분에 복잡하고 엄격한 검증이 필요한 데이터 구조에 강합니다.

JSON과 XML을 서로 변환할 때 기억할 점이 있습니다. XML의 속성(attribute)과 요소(element) 구분은 JSON에 직접적인 대응 개념이 없습니다. 대부분의 변환 도구는 JSON에서 "@속성명" 같은 규칙으로 매핑하지만, 대상 시스템의 기대 형식과 맞는지 반드시 확인하세요.

## 실전 변환 팁

**변환 전에 검증부터.** 잘못된 입력은 엉뚱한 출력을 만듭니다. JSON은 린터로, XML은 문법 검사기로 먼저 확인하세요.

**데이터 타입을 의식적으로 유지하세요.** CSV는 모든 걸 문자열로 취급합니다. JSON을 CSV로 변환했다가 다시 JSON으로 되돌리면 숫자, 불리언, null의 타입 정보가 사라질 수 있습니다.

**인코딩을 통일하세요.** UTF-8이 가장 안전합니다. Excel에서 내보낸 CSV는 Windows-1252 인코딩인 경우가 많아, 한글이나 특수 문자가 깨질 수 있습니다.

**믿을 수 있는 도구를 쓰세요.** 수동 변환은 번거롭고 실수가 잦습니다. ToolPop의 데이터 형식 변환기는 JSON, YAML, CSV, XML 변환을 즉시 처리하며, 구조와 포맷을 보존해 줍니다.`,
      },
    },
  },
  {
    slug: "css-units-px-rem-em",
    app: "converter",
    category: "guide",
    publishedAt: "2026-03-12",
    content: {
      en: {
        title:
          "px vs rem vs em: Choosing the Right CSS Unit for Responsive Design",
        description:
          "Understand the differences between px, rem, and em units in CSS and when to use each for responsive web design.",
        body: `## Why CSS Units Matter

Choosing the right CSS unit is not just a matter of preference — it directly affects your site's responsiveness, accessibility, and maintainability. The three most common units for sizing text and spacing in web design are px, rem, and em. Each behaves differently, and using the wrong one can lead to rigid layouts that break on different screen sizes or fail users who need larger text.

## px: The Absolute Unit

A pixel (px) is the most straightforward CSS unit. One px corresponds to one device pixel on a standard display (though on high-DPI screens, CSS pixels are scaled). Setting font-size: 16px means the text will always render at 16 CSS pixels, regardless of any parent or root settings.

The advantage of px is predictability. You get exactly what you specify. The downside is inflexibility. If a user changes their browser's default font size for accessibility — say from 16px to 20px — text sized in px ignores that preference entirely. For this reason, using px for font sizes is generally discouraged in modern web development.

Where px still makes sense: borders, shadows, and fine decorative details where you want precise, unchanging dimensions.

## rem: Relative to the Root

The rem unit (root em) is relative to the root element's font size, which is the html element. If the html font size is the browser default of 16px, then 1rem equals 16px, 1.5rem equals 24px, and 0.875rem equals 14px.

The key benefit of rem is that it respects the user's font size preference. If someone sets their browser default to 20px, all rem-based sizes scale proportionally. This makes rem the recommended unit for font sizes, spacing, and layout dimensions in most modern design systems.

A common technique is to set the root font size to 62.5% (10px on a 16px default), making calculations simpler: 1.6rem = 16px, 2.4rem = 24px. However, this approach can cause issues if other libraries expect the default 16px root, so use it with caution.

## em: Relative to the Parent

The em unit is relative to the font size of the element's parent (or the element itself when used for font-size). If a parent has font-size: 20px, then 1em inside that parent equals 20px.

This compounding behavior is both em's strength and its biggest pitfall. Nested elements accumulate em values: if you set font-size: 1.2em on multiple nested elements, the text grows (or shrinks) with each level of nesting. This can produce unexpected results in deeply nested components.

Where em excels: component-level sizing that should scale with the component's own font size. For example, setting padding: 0.5em on a button ensures the padding scales proportionally whether the button text is 14px or 24px.

## Practical Guidelines

**Use rem for global sizing.** Font sizes, margins, padding, and max-widths on layout containers work best in rem. This ensures consistent scaling across the entire page.

**Use em for component-internal spacing.** Padding, margins, and icon sizes within a component benefit from em because they scale with the component's text size.

**Use px sparingly.** Reserve px for borders, box-shadows, outlines, and other decorative properties where scaling is undesirable.

**Avoid mixing units unnecessarily.** Consistency within a project reduces cognitive overhead. Pick rem as your primary unit and reach for em or px only when the context demands it.

## Accessibility First

The underlying reason to prefer rem over px for text is accessibility. Roughly 1 in 5 users adjusts their default browser font size. When you set text in px, you override their choice. When you use rem, your design adapts automatically. Responsive design is not just about screen widths — it is about respecting every user's ability to read your content comfortably.

A reliable px-to-rem converter takes the guesswork out of migrating from px-based designs. Enter your pixel value, and you get the exact rem equivalent based on any root font size — making the transition to accessible, responsive CSS painless.`,
      },
      ko: {
        title:
          "px vs rem vs em: 반응형 디자인을 위한 CSS 단위 선택 가이드",
        description:
          "CSS에서 px, rem, em 단위의 차이점과 반응형 웹 디자인에서의 올바른 활용법을 알아보세요.",
        body: `## CSS 단위가 중요한 이유

CSS 단위 선택은 단순한 취향 문제가 아닙니다. 사이트의 반응성, 접근성, 유지보수성에 직접 영향을 미칩니다. 웹 디자인에서 텍스트 크기와 여백 설정에 가장 많이 쓰이는 세 가지 단위는 px, rem, em입니다. 각각 동작 방식이 다르고, 잘못 쓰면 화면 크기에 따라 깨지거나 큰 글꼴이 필요한 사용자를 외면하는 딱딱한 레이아웃이 됩니다.

## px: 절대 단위

픽셀(px)은 가장 직관적인 CSS 단위입니다. 1px은 표준 디스플레이에서 1 디바이스 픽셀에 해당합니다(고해상도 화면에서는 CSS 픽셀이 스케일링됩니다). font-size: 16px로 지정하면 부모나 루트 설정과 관계없이 항상 16 CSS 픽셀로 렌더링됩니다.

px의 장점은 예측 가능성입니다. 지정한 그대로 나옵니다. 단점은 유연하지 않다는 것입니다. 사용자가 접근성을 위해 브라우저 기본 글꼴 크기를 16px에서 20px로 바꿔도, px로 지정된 텍스트는 그 설정을 완전히 무시합니다. 그래서 현대 웹 개발에서 글꼴 크기에 px를 쓰는 건 권장되지 않습니다.

px가 적합한 곳: 테두리, 그림자, 정밀한 장식 요소처럼 크기가 변하면 안 되는 곳.

## rem: 루트 기준 상대 단위

rem(root em)은 루트 요소, 즉 html 요소의 글꼴 크기를 기준으로 합니다. html 글꼴 크기가 브라우저 기본값인 16px이면, 1rem은 16px, 1.5rem은 24px, 0.875rem은 14px입니다.

rem의 핵심 장점은 사용자의 글꼴 크기 설정을 존중한다는 것입니다. 누군가 브라우저 기본값을 20px로 바꾸면, rem 기반 크기가 모두 비례해서 커집니다. 그래서 대부분의 현대 디자인 시스템에서 글꼴 크기, 여백, 레이아웃 크기에 rem을 권장합니다.

자주 쓰이는 기법으로 루트 글꼴 크기를 62.5%(기본 16px 기준 10px)로 설정해서 계산을 쉽게 만드는 방법이 있습니다. 1.6rem = 16px, 2.4rem = 24px. 다만 다른 라이브러리가 기본 16px을 기대하는 경우 문제가 생길 수 있어 주의가 필요합니다.

## em: 부모 기준 상대 단위

em은 부모 요소의 글꼴 크기를 기준으로 합니다(font-size 속성에 쓰일 때는 요소 자신의 부모 기준). 부모의 font-size가 20px이면, 그 안에서 1em은 20px입니다.

이 누적 특성이 em의 강점이자 최대 함정입니다. 중첩된 요소에 font-size: 1.2em을 반복 적용하면, 단계마다 텍스트가 점점 커집니다(또는 작아집니다). 깊게 중첩된 컴포넌트에서 예상치 못한 결과가 나올 수 있습니다.

em이 빛나는 곳: 컴포넌트 자체 글꼴 크기에 맞춰 스케일링되어야 하는 컴포넌트 내부 여백. 예를 들어 버튼에 padding: 0.5em을 주면, 버튼 텍스트가 14px이든 24px이든 여백이 비례해서 조정됩니다.

## 실전 가이드라인

**전역 크기에는 rem.** 글꼴 크기, 마진, 패딩, 레이아웃 컨테이너의 max-width는 rem이 적합합니다. 페이지 전체에서 일관된 스케일링을 보장합니다.

**컴포넌트 내부 여백에는 em.** 컴포넌트 안의 패딩, 마진, 아이콘 크기는 em이 유리합니다. 텍스트 크기에 맞춰 자연스럽게 조정됩니다.

**px는 제한적으로.** 테두리, 박스 쉐도우, 아웃라인 등 스케일링이 바람직하지 않은 장식 속성에만 사용하세요.

## 접근성이 먼저

글꼴 크기에 px 대신 rem을 권장하는 근본적 이유는 접근성입니다. 사용자의 약 20%가 브라우저 기본 글꼴 크기를 조정합니다. px로 텍스트를 지정하면 이 선택을 무시하게 되고, rem을 쓰면 디자인이 자동으로 적응합니다. 반응형 디자인은 화면 너비만의 문제가 아닙니다. 모든 사용자가 콘텐츠를 편하게 읽을 수 있도록 배려하는 것입니다.

px-to-rem 변환기를 활용하면 px 기반 디자인에서 rem으로의 전환이 훨씬 수월해집니다. 픽셀 값을 입력하면 루트 글꼴 크기에 맞는 정확한 rem 값을 바로 얻을 수 있습니다.`,
      },
    },
  },
  {
    slug: "compound-interest-guide",
    app: "calculator",
    category: "guide",
    publishedAt: "2026-03-26",
    content: {
      en: {
        title: "Compound Interest Explained: How Your Money Grows Over Time",
        description:
          "Understand the mechanics of compound interest, how it differs from simple interest, and how to use a compound interest calculator to plan your savings and investments.",
        body: `## What Is Compound Interest?

Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, which only earns returns on the original amount, compound interest creates a snowball effect where your earnings generate their own earnings.

The formula is straightforward: A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual interest rate, n is the number of compounding periods per year, and t is the number of years. While the math is simple, the results over long periods can be dramatic.

## Simple vs Compound Interest

With simple interest, a $10,000 deposit at 5% annual interest earns exactly $500 every year, totaling $15,000 after 10 years. With compound interest at the same rate compounded annually, the same deposit grows to $16,288.95 — an extra $1,288.95 from interest earning interest.

The difference becomes more pronounced over longer periods. After 30 years, simple interest yields $25,000 while compound interest yields $43,219.42. Time is the most powerful variable in the compound interest equation.

## How Compounding Frequency Matters

Interest can compound annually, semi-annually, quarterly, monthly, daily, or even continuously. More frequent compounding means slightly higher returns because interest starts earning interest sooner.

For a $10,000 deposit at 5% over 10 years: annual compounding produces $16,288.95, monthly compounding produces $16,470.09, and daily compounding produces $16,486.65. The difference between annual and daily compounding is modest for typical savings rates, but it adds up with larger sums and higher rates.

## The Rule of 72

A quick way to estimate how long it takes to double your money is the Rule of 72. Divide 72 by your annual interest rate to get the approximate number of years. At 6% interest, your money doubles in roughly 12 years. At 8%, about 9 years. This mental shortcut helps you quickly evaluate investment opportunities without a calculator.

## Practical Applications

Compound interest affects many aspects of personal finance. Savings accounts and certificates of deposit use it to grow your money. Bonds pay interest that can be reinvested. Stock market returns compound when dividends are reinvested. On the flip side, credit card debt and loans also compound — working against you instead of for you.

Starting early matters enormously. Someone who invests $200 per month starting at age 25 will have significantly more at retirement than someone who invests $400 per month starting at age 35, even though the late starter contributes more total money. This is the power of compound interest at work.

A compound interest calculator lets you experiment with different scenarios — adjusting the principal, interest rate, compounding frequency, and time period to see exactly how your money would grow. It is one of the most valuable tools for financial planning.`,
      },
      ko: {
        title: "복리의 원리: 시간이 돈을 불리는 방법",
        description:
          "복리와 단리의 차이, 복리 계산 공식, 그리고 복리 계산기를 활용한 저축·투자 계획 수립 방법을 알아봅니다.",
        body: `## 복리란?

복리는 원금뿐 아니라 이전 기간에 쌓인 이자에도 이자가 붙는 방식입니다. 원금에만 이자가 붙는 단리와 달리, 복리는 이자가 다시 이자를 만들어내는 눈덩이 효과를 만듭니다.

공식은 간단합니다. A = P(1 + r/n)^(nt). A는 최종 금액, P는 원금, r은 연이율, n은 연간 복리 횟수, t는 기간(년)입니다. 공식 자체는 단순하지만, 장기간에 걸친 결과는 놀라울 정도로 큽니다.

## 단리 vs 복리

단리로 1,000만 원을 연 5%에 예치하면 매년 정확히 50만 원의 이자가 붙어 10년 후 1,500만 원이 됩니다. 같은 조건의 복리라면 10년 후 약 1,629만 원으로, 129만 원이 더 생깁니다.

기간이 길어질수록 차이는 벌어집니다. 30년 후 단리는 2,500만 원이지만 복리는 약 4,322만 원입니다. 복리 공식에서 가장 강력한 변수는 바로 시간입니다.

## 복리 주기의 영향

이자는 연 1회, 반기, 분기, 월, 일 단위, 심지어 연속으로 복리될 수 있습니다. 복리 주기가 짧을수록 이자가 더 빨리 이자를 낳기 때문에 수익이 조금씩 높아집니다.

1,000만 원을 연 5%로 10년간 예치하면, 연 복리는 약 1,629만 원, 월 복리는 약 1,647만 원, 일 복리는 약 1,649만 원이 됩니다. 일반적인 예금 금리에서는 차이가 크지 않지만, 금액이 크고 금리가 높을수록 그 차이가 누적됩니다.

## 72의 법칙

원금이 두 배가 되는 데 걸리는 시간을 빠르게 추정하는 방법이 72의 법칙입니다. 72를 연이율로 나누면 대략적인 기간이 나옵니다. 연 6%라면 약 12년, 연 8%라면 약 9년 만에 원금이 두 배가 됩니다.

## 실생활 적용

복리는 개인 재무의 여러 영역에 영향을 미칩니다. 예·적금과 채권은 복리로 자산을 불리고, 주식 배당금을 재투자하면 복리 효과가 생깁니다. 반대로 신용카드 부채와 대출도 복리로 불어나기 때문에 빚에서는 복리가 적으로 작용합니다.

일찍 시작하는 것이 결정적으로 중요합니다. 25세부터 매달 20만 원을 투자하는 사람이 35세부터 매달 40만 원을 투자하는 사람보다 은퇴 시점에 더 많은 자산을 가지게 됩니다. 복리 계산기를 활용하면 원금, 이율, 복리 주기, 기간을 바꿔가며 자산이 어떻게 성장하는지 직접 확인할 수 있습니다.`,
      },
    },
  },
  {
    slug: "bmi-calculation-explained",
    app: "calculator",
    category: "knowledge",
    publishedAt: "2026-03-26",
    content: {
      en: {
        title: "BMI Calculation: What It Measures, Its Limits, and How to Use It",
        description:
          "Learn how BMI is calculated, what the numbers mean, the limitations of BMI as a health metric, and how to interpret your results.",
        body: `## What Is BMI?

Body Mass Index, or BMI, is a numerical value derived from a person's height and weight. Belgian mathematician Adolphe Quetelet developed the formula in the 1830s as a statistical tool for studying populations, not individuals. The formula is weight in kilograms divided by height in meters squared: BMI = kg/m².

For imperial units, the formula becomes BMI = (weight in pounds × 703) / (height in inches)². A person who is 5'10" (178 cm) and weighs 160 pounds (72.6 kg) has a BMI of approximately 23.0.

## BMI Categories

The World Health Organization defines these standard BMI categories for adults:

- Underweight: below 18.5
- Normal weight: 18.5 to 24.9
- Overweight: 25.0 to 29.9
- Obesity Class I: 30.0 to 34.9
- Obesity Class II: 35.0 to 39.9
- Obesity Class III: 40.0 and above

These thresholds were established based on epidemiological data linking BMI ranges to health outcomes across large populations. They are the same for men and women, though some health organizations suggest slightly different ranges.

## Why BMI Is Useful

Despite its simplicity, BMI remains widely used because it is easy to calculate, requires no special equipment, and correlates reasonably well with body fat percentage at the population level. Public health researchers use it to track obesity trends. Doctors use it as one of several screening tools during routine checkups.

BMI provides a quick snapshot that can prompt further investigation. A very high or very low BMI signals that a more detailed assessment — including body composition, waist circumference, blood tests, and lifestyle factors — may be warranted.

## The Limitations of BMI

BMI does not distinguish between muscle and fat. A muscular athlete and a sedentary person of the same height and weight will have identical BMIs despite very different body compositions. This is the most commonly cited limitation and is entirely valid.

BMI also does not account for fat distribution. Visceral fat (around the organs) carries higher health risks than subcutaneous fat (under the skin), but BMI treats all weight equally. Waist-to-hip ratio and waist circumference are better indicators of fat distribution.

Age, sex, and ethnicity also affect the relationship between BMI and health risk. Older adults may have more body fat at the same BMI as younger adults. Women typically carry more body fat than men at equivalent BMIs. Some Asian populations face elevated health risks at BMIs below the standard overweight threshold of 25.

## How to Use BMI Wisely

Think of BMI as a starting point, not a verdict. It is one data point among many. If your BMI falls outside the normal range, consider it a prompt to look at the bigger picture: your activity level, diet, family history, blood pressure, cholesterol, and blood sugar levels.

A BMI calculator gives you the number instantly. What you do with that number — whether it motivates a conversation with your doctor or a review of your fitness routine — is what matters.`,
      },
      ko: {
        title: "BMI 계산: 의미, 한계, 활용법",
        description:
          "BMI가 어떻게 계산되는지, 수치의 의미, 건강 지표로서의 한계, 그리고 결과를 올바르게 해석하는 방법을 알아봅니다.",
        body: `## BMI란?

체질량지수(Body Mass Index, BMI)는 키와 체중으로 산출하는 수치입니다. 1830년대 벨기에 수학자 아돌프 케틀레가 개인이 아닌 집단 통계 분석 도구로 개발했습니다. 공식은 체중(kg)을 키(m)의 제곱으로 나눈 값입니다: BMI = kg/m².

키 178cm, 체중 72.6kg인 사람의 BMI는 약 23.0입니다.

## BMI 분류 기준

세계보건기구(WHO)의 성인 BMI 기준입니다.

- 저체중: 18.5 미만
- 정상: 18.5~24.9
- 과체중: 25.0~29.9
- 비만 1단계: 30.0~34.9
- 비만 2단계: 35.0~39.9
- 비만 3단계: 40.0 이상

이 기준은 대규모 역학 데이터에서 BMI 범위와 건강 결과의 상관관계를 토대로 정해졌습니다. 남녀 동일하게 적용되지만, 일부 기관에서는 약간 다른 범위를 제시하기도 합니다.

## BMI가 유용한 이유

단순한 공식이지만 BMI가 여전히 널리 쓰이는 이유가 있습니다. 계산이 쉽고, 특별한 장비가 필요 없으며, 집단 수준에서 체지방률과 합리적으로 상관관계가 있기 때문입니다. 공중보건 연구자는 비만 추세를 추적하는 데 쓰고, 의사는 건강검진의 여러 선별 도구 중 하나로 활용합니다.

## BMI의 한계

BMI는 근육과 지방을 구분하지 않습니다. 근육질 운동선수와 같은 키·체중의 비활동적인 사람은 체성분이 전혀 다르지만 BMI는 동일합니다.

체지방 분포도 반영하지 못합니다. 내장지방(장기 주위)은 피하지방(피부 아래)보다 건강 위험이 높지만, BMI는 모든 체중을 동등하게 취급합니다. 허리둘레나 허리-엉덩이 비율이 지방 분포의 더 나은 지표입니다.

나이, 성별, 인종도 BMI와 건강 위험의 관계에 영향을 미칩니다. 같은 BMI라도 고령자는 젊은 성인보다 체지방이 많을 수 있고, 일부 아시아 인구는 과체중 기준(25) 이하에서도 건강 위험이 높아집니다.

## BMI 올바르게 활용하기

BMI는 출발점이지 최종 판단이 아닙니다. 정상 범위를 벗어났다면, 활동량, 식습관, 가족력, 혈압, 콜레스테롤, 혈당 등 전체 그림을 함께 살펴보는 계기로 삼으세요. BMI 계산기로 숫자를 확인하는 것은 순식간이고, 그 결과를 토대로 어떤 행동을 취하느냐가 중요합니다.`,
      },
    },
  },
  {
    slug: "percentage-calculations-everyday",
    app: "calculator",
    category: "tips",
    publishedAt: "2026-03-26",
    content: {
      en: {
        title: "Percentage Calculations You Use Every Day (and How to Do Them Faster)",
        description:
          "From discounts and tips to tax and growth rates — master the percentage calculations that come up in daily life with simple techniques and shortcuts.",
        body: `## Percentages Are Everywhere

Percentages appear constantly in daily life. A 30% off sale, a 15% tip, 7% sales tax, a 3.5% raise, 2% cash back — these numbers drive financial decisions large and small. Yet many people reach for a calculator (or avoid the math altogether) because percentage calculations feel harder than they actually are.

The word "percent" literally means "per hundred." Saying something is 25% is the same as saying 25 out of 100, or one quarter. Keeping this simple definition in mind makes most percentage problems straightforward.

## The Three Basic Percentage Problems

Almost every percentage question falls into one of three patterns:

**Finding a percentage of a number.** What is 20% of 150? Multiply: 150 × 0.20 = 30. To convert a percentage to a decimal, move the decimal point two places left.

**Finding what percentage one number is of another.** 30 is what percent of 150? Divide: 30 ÷ 150 = 0.20, or 20%.

**Finding the whole when you know the part and percentage.** 30 is 20% of what number? Divide: 30 ÷ 0.20 = 150.

These three operations cover discounts, tips, taxes, grades, statistics, and nearly every other percentage scenario.

## Mental Math Shortcuts

**The 10% anchor.** Finding 10% of any number is trivial — just move the decimal point one place left. 10% of 85 is 8.5. From there, you can quickly derive other percentages: 5% is half of 10%, 20% is double 10%, 15% is 10% plus 5%.

**The flip trick.** 8% of 25 is the same as 25% of 8, which is 2. Whenever one side of the calculation is easier to compute, swap the numbers. This works because multiplication is commutative: a% of b = b% of a.

**Percentage change.** To calculate how much something increased or decreased in percentage terms, use: ((new - old) / old) × 100. A price going from $80 to $100 is a 25% increase: ((100 - 80) / 80) × 100 = 25%.

## Common Scenarios

**Discounts.** A $60 item at 25% off: 10% is $6, so 25% is $6 × 2.5 = $15 off. The sale price is $45.

**Tips.** For a 15% tip on a $47 meal: 10% is $4.70, half of that (5%) is $2.35, total tip is $7.05. Round to $7 or $8 as you prefer.

**Tax.** For 8% sales tax on a $250 purchase: 10% is $25, subtract 2% ($5), tax is $20. Total: $270.

**Salary raises.** A 4% raise on a $65,000 salary: 1% is $650, so 4% is $2,600. New salary: $67,600.

A percentage calculator handles these instantly, but understanding the underlying math helps you verify results, make quick estimates, and feel confident about everyday financial decisions.`,
      },
      ko: {
        title: "일상 속 퍼센트 계산, 더 빠르게 하는 법",
        description:
          "할인, 팁, 세금, 인상률까지 — 매일 마주하는 퍼센트 계산을 간단한 기법과 암산 요령으로 빠르게 처리하는 방법을 정리합니다.",
        body: `## 퍼센트는 어디에나

30% 할인, 부가세 10%, 연봉 인상률 4%, 적금 이자 3.5% — 퍼센트는 크고 작은 재정 결정에 끊임없이 등장합니다. 그런데 많은 사람이 퍼센트 계산이라고 하면 계산기부터 찾거나 대충 어림짐작으로 넘기곤 합니다.

"퍼센트(percent)"는 말 그대로 "100당(per centum)"이라는 뜻입니다. 25%는 100 중 25, 즉 4분의 1입니다. 이 단순한 정의만 기억하면 대부분의 퍼센트 문제는 어렵지 않습니다.

## 세 가지 기본 유형

거의 모든 퍼센트 문제는 세 가지 패턴으로 나뉩니다.

**수의 몇 퍼센트 구하기.** 150의 20%는? 150 × 0.20 = 30.

**한 수가 다른 수의 몇 퍼센트인지 구하기.** 30은 150의 몇 %? 30 ÷ 150 = 0.20, 즉 20%.

**부분과 퍼센트로 전체 구하기.** 30이 20%에 해당하는 전체는? 30 ÷ 0.20 = 150.

이 세 가지 연산이면 할인, 팁, 세금, 성적, 통계 등 거의 모든 퍼센트 상황을 해결할 수 있습니다.

## 암산 요령

**10% 기준법.** 어떤 수의 10%는 소수점을 왼쪽으로 한 칸만 옮기면 됩니다. 85의 10%는 8.5. 여기서 5%는 10%의 절반(4.25), 20%는 10%의 두 배(17), 15%는 10%+5%(12.75)입니다.

**뒤집기 요령.** 8%의 25 = 25%의 8 = 2. 곱셈은 교환법칙이 성립하므로, 계산하기 쉬운 쪽으로 바꾸면 됩니다.

**증감률.** ((새 값 - 이전 값) / 이전 값) × 100. 가격이 8만 원에서 10만 원으로 오르면 ((10-8)/8) × 100 = 25% 상승입니다.

## 실생활 예시

**할인.** 6만 원짜리 상품 25% 할인: 10%는 6,000원, 25%는 15,000원 할인. 판매가 45,000원.

**팁(해외 여행 시).** 47달러 식사에 15% 팁: 10%는 4.70, 5%는 2.35, 합계 7.05달러.

**세금.** 25만 원 구매에 부가세 10%: 25,000원. 총액 275,000원.

**연봉 인상.** 연봉 6,500만 원에 4% 인상: 1%는 65만 원, 4%는 260만 원. 새 연봉 6,760만 원.

퍼센트 계산기를 쓰면 이런 계산이 즉시 해결되지만, 원리를 이해하면 결과를 검증하고, 빠르게 어림잡고, 일상적인 재정 판단에 자신감을 가질 수 있습니다.`,
      },
    },
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByApp(app: "pdf" | "image" | "text" | "converter" | "calculator"): BlogArticle[] {
  return articles.filter((a) => a.app === app);
}

export function getArticlesByLocale(
  locale: string
): (BlogArticle & { title: string; description: string })[] {
  return articles
    .filter((a) => a.content[locale])
    .map((a) => ({
      ...a,
      title: a.content[locale].title,
      description: a.content[locale].description,
    }));
}
