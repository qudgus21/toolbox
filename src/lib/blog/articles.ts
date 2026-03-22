export interface BlogArticle {
  slug: string;
  app: "pdf" | "image";
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
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByApp(app: "pdf" | "image"): BlogArticle[] {
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
