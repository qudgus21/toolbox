import type { Format } from "./format-data";

export const formatsKo: Format[] = [
  {
    slug: "pdf",
    name: "PDF (휴대용 문서 형식)",
    extension: ".pdf",
    mimeType: "application/pdf",
    category: "Document",
    intro:
      "PDF는 1993년 Adobe가 개발한 문서 형식으로, 운영체제나 디바이스에 관계없이 동일한 레이아웃을 보장합니다. 텍스트, 폰트, 이미지, 벡터 그래픽을 하나의 파일에 담아 어디서 열어도 원본 그대로 표시됩니다.\n\nPDF는 최종 문서 배포의 사실상 표준입니다. 계약서, 논문, 관공서 서식 등 수신자가 작성자의 의도 그대로 문서를 봐야 하는 모든 상황에서 쓰입니다.",
    history:
      "Adobe 공동 창업자 존 워녹은 1991년 'The Camelot Project'라는 사내 메모에서 PDF의 청사진을 제시했고, 1993년 버전 1.0이 공개되었습니다. 초기에는 뷰어가 유료여서 보급이 더뎠지만, 1994년 Acrobat Reader를 무료로 전환하면서 사용자가 급격히 늘었습니다.\n\n2008년 PDF는 국제 표준(ISO 32000-1)으로 채택되었고, 최신 버전인 PDF 2.0(ISO 32000-2)은 2017년 발표 후 2020년에 개정되었습니다. 개방형 표준이므로 수백 개의 독립 도구가 PDF를 읽고 생성할 수 있습니다.",
    technicalDetails:
      "PDF 파일은 네 부분으로 구성됩니다. 버전을 선언하는 헤더, 페이지 ·폰트·이미지·스트림 등 간접 객체가 담긴 본문, 임의 접근을 위한 교차 참조 테이블, 그리고 루트 카탈로그를 가리키는 트레일러입니다.\n\n텍스트는 흐르는 문단이 아니라 좌표가 지정된 글리프 코드로 저장됩니다. 폰트는 전체 또는 서브셋으로 임베드할 수 있고, 이미지는 JPEG, JPEG2000, JBIG2, Flate 압축을 지원합니다. 벡터 그래픽은 PostScript에서 파생된 연산자 세트를 사용합니다.\n\nAcroForm·XFA 양식, 디지털 서명(PAdES), 3D 아트워크(U3D/PRC), JavaScript 액션, 선택적 콘텐츠 그룹(레이어), 접근성 태깅(PDF/UA) 등 다양한 기능을 지원합니다.",
    pros: [
      "모든 플랫폼과 프린터에서 픽셀 단위까지 동일한 레이아웃을 보장",
      "특정 벤더에 종속되지 않는 개방형 ISO 표준",
      "디지털 서명, 양식, 주석, 접근성 기능 내장",
      "내부 압축 덕분에 컴팩트한 파일 크기",
      "주요 OS, 브라우저, 모바일 기기 모두 지원",
    ],
    cons: [
      "DOCX 같은 원본 형식에 비해 내용 편집이 어려움",
      "복잡한 스펙 탓에 일부 뷰어에서 렌더링 차이가 발생",
      "작은 화면에서 리플로 콘텐츠로 활용하기엔 부적합",
      "스캔된 대용량 PDF는 OCR이나 압축 없이는 매우 무거움",
    ],
    useCases: [
      "계약서, 청구서, 법률 문서",
      "학술 논문 및 저널 기사",
      "관공서 서식 및 세금 신고서",
      "인쇄용 마케팅 자료와 브로슈어",
      "장기 보존 문서 (PDF/A)",
    ],
    relatedFormats: ["docx", "png", "jpg", "svg"],
    relatedTools: [
      { name: "Merge PDF", href: "/pdf/{locale}/merge-pdf" },
      { name: "Split PDF", href: "/pdf/{locale}/split-pdf" },
      { name: "Compress PDF", href: "/pdf/{locale}/compress-pdf" },
      { name: "PDF to JPG", href: "/pdf/{locale}/pdf-to-jpg" },
    ],
  },
  {
    slug: "png",
    name: "PNG (이동식 네트워크 그래픽스)",
    extension: ".png",
    mimeType: "image/png",
    category: "Image",
    intro:
      "PNG는 GIF의 특허 문제를 피하기 위해 만들어진 무손실 래스터 이미지 형식입니다. 풀컬러와 알파 투명도를 지원하며, 웹 디자인과 UI 작업의 핵심 형식으로 자리 잡았습니다.\n\nJPEG와 달리 PNG는 데이터를 버리지 않고 압축하므로 모든 픽셀이 원본 그대로 재현됩니다. 스크린샷, 아이콘, 로고 등 선명한 경계와 투명도가 중요한 이미지에 가장 적합합니다.",
    history:
      "PNG는 1995년 GIF에 사용된 LZW 압축의 Unisys 특허 문제가 불거지면서 설계되었습니다. 첫 번째 PNG 사양(버전 1.0)은 1996년 10월 W3C 권고안으로 공개되었습니다.\n\n1999년 버전 1.2가 발표되었고, 이후 ISO/IEC 15948:2003으로 국제 표준이 되었습니다. 2000년대 중반이면 대부분의 브라우저가 PNG를 완벽히 지원했으며, 정적 웹 이미지에서 GIF를 사실상 대체했습니다.",
    technicalDetails:
      "PNG는 DEFLATE 압축(ZIP과 동일한 알고리즘)을 사용합니다. 이미지 데이터는 행 단위 필터링을 거친 뒤 압축되며, 스펙에서는 None, Sub, Up, Average, Paeth 다섯 가지 필터 타입을 정의합니다.\n\n8비트·16비트 색상 깊이, 그레이스케일, 인덱스 컬러(팔레트), 알파 채널 유무에 따른 트루컬러를 지원합니다. 파일 구조는 청크 기반으로, 필수 청크(IHDR, IDAT, IEND)가 이미지를 정의하고, 보조 청크가 감마·색상 프로필(iCCP)·텍스트 등의 메타데이터를 담습니다.\n\nAdam7 알고리즘을 통한 인터레이싱으로 7단계에 걸쳐 점진적으로 이미지를 표시할 수 있습니다.",
    pros: [
      "무손실 압축으로 모든 픽셀을 완벽하게 보존",
      "알파 투명도를 지원해 자연스러운 합성 가능",
      "특허 없는 개방형 표준 (W3C / ISO)",
      "선명한 경계, 텍스트, 단색 영역이 있는 그래픽에 최적",
      "모든 플랫폼과 브라우저에서 폭넓게 지원",
    ],
    cons: [
      "사진 이미지의 경우 JPEG보다 파일 크기가 큼",
      "기본 애니메이션을 지원하지 않음 (APNG는 비표준 확장)",
      "CMYK가 필요한 인쇄 워크플로에는 부적합",
      "고해상도 사진을 저장하면 파일이 매우 커질 수 있음",
    ],
    useCases: [
      "스크린샷 및 UI 목업",
      "투명도가 필요한 로고와 아이콘",
      "웹 그래픽 및 일러스트레이션",
      "게임 스프라이트 및 픽셀 아트",
      "무손실 품질이 필수인 모든 이미지",
    ],
    relatedFormats: ["jpg", "webp", "svg", "gif"],
    relatedTools: [
      { name: "PNG to PDF", href: "/pdf/{locale}/png-to-pdf" },
      { name: "Compress Image", href: "/image/{locale}/compress-image" },
      { name: "Resize Image", href: "/image/{locale}/resize-image" },
      { name: "Convert Image", href: "/image/{locale}/convert-image" },
    ],
  },
  {
    slug: "jpg",
    name: "JPEG (합동 사진 전문가 그룹)",
    extension: ".jpg / .jpeg",
    mimeType: "image/jpeg",
    category: "Image",
    intro:
      "JPEG는 전 세계에서 가장 널리 사용되는 손실 압축 이미지 형식입니다. 연속 톤 사진에 특화되어 설계되었으며, 사람의 눈이 둔감한 시각 정보를 제거해 파일 크기를 획기적으로 줄입니다.\n\nJPEG는 디지털 카메라, SNS 업로드, 웹 사진 대부분의 기본 형식입니다. 품질 레벨을 조절할 수 있어 파일 크기와 시각적 품질 사이에서 원하는 지점을 선택할 수 있습니다.",
    history:
      "JPEG 표준은 Joint Photographic Experts Group 위원회가 1986년부터 개발을 시작해 1992년 ITU-T T.81 / ISO/IEC 10918-1로 공식 발표되었습니다.\n\n1992년 공개된 JFIF(JPEG File Interchange Format)가 파일 래퍼를 정의해 호환성을 확보했고, 카메라 제조사들이 채택한 Exif가 촬영 정보를 메타데이터로 기록하기 시작했습니다. 30년이 지난 지금도 WebP나 AVIF 같은 후발 형식이 있음에도 JPEG는 여전히 사진 형식의 대명사입니다.",
    technicalDetails:
      "JPEG 압축은 여러 단계를 거칩니다. RGB에서 YCbCr로의 색 공간 변환, 선택적 크로마 서브샘플링(주로 4:2:0), 8x8 블록 단위 이산 코사인 변환(DCT), 주파수 계수 양자화, 그리고 엔트로피 코딩(허프만 또는 산술)입니다.\n\n양자화 단계에서 손실이 발생합니다. 품질 설정이 높을수록 세밀한 양자화 테이블을 사용해 더 많은 디테일이 보존됩니다. 베이스라인(순차), 프로그레시브, 무손실 모드를 지원하지만 무손실 JPEG는 거의 사용되지 않습니다.\n\nJPEG 파일은 보통 JFIF 또는 Exif 래퍼를 사용하며, ICC 색상 프로필, IPTC 메타데이터, XMP 메타데이터를 지원합니다.",
    pros: [
      "사진에 대해 매우 효율적인 압축률",
      "모든 기기와 플랫폼에서 보편적으로 지원",
      "품질 레벨 조절로 파일 크기를 세밀하게 제어 가능",
      "ICC 색상 프로필로 컬러 매니지먼트 가능",
      "수십 년간 축적된 성숙한 도구 생태계",
    ],
    cons: [
      "손실 압축이므로 반복 편집 시 화질이 저하됨 (세대 손실)",
      "투명도 미지원",
      "낮은 품질 설정에서 블록 아티팩트가 눈에 띔",
      "선명한 경계, 텍스트, 단색 이미지에는 부적합",
      "애니메이션 미지원",
    ],
    useCases: [
      "디지털 사진 촬영 및 카메라 출력",
      "웹 이미지 및 SNS 콘텐츠",
      "파일 크기가 중요한 이메일 첨부",
      "이커머스 상품 사진",
      "픽셀 완벽성보다 작은 파일 크기가 우선인 모든 상황",
    ],
    relatedFormats: ["png", "webp", "heic", "tiff"],
    relatedTools: [
      { name: "JPG to PDF", href: "/pdf/{locale}/jpg-to-pdf" },
      { name: "Compress Image", href: "/image/{locale}/compress-image" },
      { name: "Resize Image", href: "/image/{locale}/resize-image" },
      { name: "Convert Image", href: "/image/{locale}/convert-image" },
    ],
  },
  {
    slug: "webp",
    name: "WebP (웹 이미지 형식)",
    extension: ".webp",
    mimeType: "image/webp",
    category: "Image",
    intro:
      "WebP는 Google이 개발한 차세대 이미지 형식으로, 동일한 화질 대비 JPEG나 PNG보다 25~35% 작은 파일을 생성합니다.\n\n투명도(알파 채널), 애니메이션, 손실·무손실 압축을 하나의 형식에서 모두 지원하므로, 웹 이미지 거의 모든 용도를 단일 형식으로 커버할 수 있습니다.",
    history:
      "Google은 2010년 9월 VP8 비디오 코덱의 인트라 프레임 코딩을 기반으로 WebP를 발표했습니다. 무손실 압축과 알파 투명도는 2011~2012년에 추가되었습니다.\n\n브라우저 지원은 점진적으로 확대되었습니다. Chrome은 초기부터 지원했지만, Firefox는 2019년 1월, Safari는 2020년 9월(macOS Big Sur / iOS 14)에서야 지원을 시작했습니다. 2024년 기준 전 세계 브라우저의 97% 이상이 WebP를 지원하므로 프로덕션 환경에서 안심하고 사용할 수 있습니다.",
    technicalDetails:
      "손실 모드 WebP는 VP8 예측 코딩을 사용합니다. JPEG와 마찬가지로 YUV 변환, 블록 기반 변환, 양자화를 수행하지만, 더 현대적인 예측 모드와 허프만 대신 산술(불리언) 코더를 사용합니다.\n\n무손실 모드 WebP는 완전히 다른 알고리즘을 사용합니다. 공간 예측, 컬러 캐시, LZ77 스타일 역참조의 허프만 코딩, 컬러 변환 등을 활용합니다. 알파 채널은 두 모드 중 하나로 독립적으로 압축할 수 있습니다.\n\n애니메이션 WebP는 단일 파일에 여러 프레임을 저장하며, 손실·무손실 프레임을 혼합할 수 있습니다. 컨테이너 형식은 RIFF 기반입니다.",
    pros: [
      "동일 화질 기준 JPEG보다 25~35% 작은 파일 크기",
      "손실·무손실 압축 모두 지원",
      "알파 투명도와 애니메이션을 하나의 형식에서 지원",
      "97% 이상의 브라우저에서 지원 가능",
      "ImageMagick, Sharp, libwebp 등 풍부한 도구 생태계",
    ],
    cons: [
      "사진 콘텐츠에서는 AVIF보다 압축 효율이 약간 떨어짐",
      "구형 소프트웨어나 이메일 클라이언트에서 미지원 가능성",
      "손실 모드에서 작은 텍스트가 흐려질 수 있음",
      "웹 외 분야(인쇄, 출판)에서는 거의 사용되지 않음",
    ],
    useCases: [
      "빠른 페이지 로드를 위한 웹 이미지",
      "PWA(프로그레시브 웹 앱) 및 모바일 사이트",
      "GIF를 대체하는 애니메이션 배너·스티커",
      "썸네일 및 이미지 갤러리",
      "대역폭 절약이 중요한 모든 웹 프로젝트",
    ],
    relatedFormats: ["png", "jpg", "gif", "avif"],
    relatedTools: [
      { name: "Convert Image", href: "/image/{locale}/convert-image" },
      { name: "Compress Image", href: "/image/{locale}/compress-image" },
      { name: "Resize Image", href: "/image/{locale}/resize-image" },
    ],
  },
  {
    slug: "svg",
    name: "SVG (확장 가능한 벡터 그래픽스)",
    extension: ".svg",
    mimeType: "image/svg+xml",
    category: "Image",
    intro:
      "SVG는 XML 기반의 2D 벡터 이미지 형식입니다. 래스터 형식과 달리 수학적 도형과 경로로 이미지를 정의하므로, 어떤 크기로 확대해도 화질이 깨지지 않습니다.\n\nSVG는 웹에서 아이콘, 로고, 일러스트레이션, 인터랙티브 그래픽의 표준 형식입니다. 파일이 순수 텍스트이므로 CSS로 스타일을 지정하고, JavaScript로 조작하며, 검색 엔진이 색인할 수 있습니다.",
    history:
      "SVG 개발은 1999년 W3C에서 시작되었습니다. SVG 1.0은 2001년 9월 W3C 권고안으로 채택되었고, 2003년 발표된 SVG 1.1은 2011년 2차 개정을 거쳐 현재 가장 널리 구현된 버전입니다.\n\nSVG 2는 2012년부터 개발 중이며, CSS·HTML과의 통합을 강화하고 폐기된 요소를 제거하는 방향으로 진행되고 있습니다. 핵심 SVG 기능에 대한 브라우저 지원은 우수하며, 현대 웹에서 아이콘·로고 형식의 표준으로 자리 잡았습니다.",
    technicalDetails:
      "SVG 파일은 <rect>, <circle>, <path>, <text>, <image>, <g>(그룹) 같은 그래픽 요소를 담은 XML 문서입니다. 경로(path)는 이동, 직선, 곡선, 호 명령으로 구성된 간결한 미니 언어를 사용합니다.\n\n선형·원형 그라디언트, 클리핑 패스, 마스크, 필터(블러, 드롭섀도 등), 패턴, 변환(이동·회전·크기·기울임), CSS 스타일링을 지원합니다. 애니메이션은 SMIL, CSS 애니메이션, JavaScript로 구현할 수 있습니다.\n\nSVG 내부에 래스터 이미지나 다른 SVG를 삽입할 수 있습니다. HTML에 인라인으로 삽입하면 모든 요소가 DOM의 일부가 되어 CSS 셀렉터와 이벤트 핸들러로 직접 제어할 수 있습니다.",
    pros: [
      "크기에 관계없이 화질 저하 없이 확대 가능",
      "기하학적 그래픽에서 매우 작은 파일 크기",
      "CSS로 스타일 지정, JavaScript로 스크립팅 가능",
      "텍스트가 실제 텍스트로 저장되어 접근성·검색 우수",
      "CSS, SMIL, JavaScript로 애니메이션 적용 가능",
    ],
    cons: [
      "사진이나 복잡한 래스터 이미지에는 부적합",
      "경로가 많은 복잡한 SVG는 렌더링이 느려질 수 있음",
      "SVG 업로드 허용 시 내장 스크립트로 인한 보안 우려",
      "필터·애니메이션 지원이 브라우저마다 다를 수 있음",
    ],
    useCases: [
      "아이콘, 로고, 브랜드 마크",
      "차트, 그래프, 데이터 시각화",
      "인터랙티브 웹 그래픽 및 인포그래픽",
      "모든 크기에서 선명해야 하는 인쇄 그래픽",
      "지도 오버레이 및 UI 일러스트레이션",
    ],
    relatedFormats: ["png", "pdf", "eps"],
    relatedTools: [
      { name: "Convert Image", href: "/image/{locale}/convert-image" },
      { name: "Resize Image", href: "/image/{locale}/resize-image" },
    ],
  },
  {
    slug: "gif",
    name: "GIF (그래픽스 교환 형식)",
    extension: ".gif",
    mimeType: "image/gif",
    category: "Image",
    intro:
      "GIF는 프레임당 최대 256색 팔레트를 지원하며 애니메이션이 가능한 래스터 이미지 형식입니다. 웹에서 가장 초기부터 사용된 이미지 형식 중 하나로, 짧은 애니메이션 루프의 대명사입니다.\n\nWebP나 APNG 같은 최신 형식이 압축률과 색상 깊이 면에서 우위에 있지만, GIF의 보편적 호환성과 문화적 입지 덕분에 밈, 리액션, 간단한 애니메이션에서 여전히 현역입니다.",
    history:
      "CompuServe가 1987년 6월 GIF 87a 버전을 발표했습니다. 1989년 89a 버전에서 애니메이션, 투명도, 텍스트 오버레이 기능이 추가되었습니다.\n\n1990년대에는 GIF가 사용하는 LZW 압축의 Unisys 특허 문제가 불거져 PNG 탄생의 계기가 되었습니다. 해당 특허는 2004년 전 세계적으로 만료되었습니다. 기술적 한계에도 불구하고 SNS 시대에 접어들며 짧은 애니메이션 클립의 범용 형식으로 폭발적 인기를 얻었습니다.",
    technicalDetails:
      "GIF는 인덱스 컬러 이미지 데이터에 LZW(Lempel-Ziv-Welch) 무손실 압축을 적용합니다. 각 프레임은 최대 256개 항목의 로컬 또는 글로벌 색상 테이블을 가집니다. 투명도는 팔레트의 특정 인덱스를 투명으로 지정하는 방식이며, 알파가 아닌 이진(on/off) 투명도입니다.\n\n애니메이션은 Graphic Control Extension 블록이 프레임 딜레이, 처리 방식(disposal method), 투명 인덱스를 지정하여 제어합니다. 프레임은 풀사이즈 또는 영역 기반(델타 프레임)으로 저장해 용량을 절약할 수 있습니다.\n\nGIF는 점진적 표시를 위한 인터레이싱을 지원합니다. 멀티바이트 정수는 빅엔디안, LZW 코드는 리틀엔디안입니다.",
    pros: [
      "모든 플랫폼에서 보편적으로 지원되는 애니메이션",
      "형식이 매우 단순해 제작·공유가 쉬움",
      "웹페이지, 이메일, 메신저에 직접 삽입 가능",
      "별도 플레이어나 플러그인 없이 재생 가능",
      "밈과 리액션 애니메이션의 문화적 표준",
    ],
    cons: [
      "프레임당 256색 제한으로 색상 밴딩이 눈에 띔",
      "알파 투명도 미지원 (이진 on/off만 가능)",
      "최신 애니메이션 형식 대비 파일 크기가 훨씬 큼",
      "사진 콘텐츠에 대한 압축 효율이 떨어짐",
      "오디오 미지원",
    ],
    useCases: [
      "애니메이션 밈과 리액션",
      "간단한 UI 애니메이션 및 로딩 스피너",
      "짧은 튜토리얼 클립 및 화면 녹화",
      "이메일 마케팅 (이메일 클라이언트에서 폭넓게 지원)",
      "메신저 및 SNS 콘텐츠",
    ],
    relatedFormats: ["webp", "png", "mp4"],
    relatedTools: [
      { name: "Convert Image", href: "/image/{locale}/convert-image" },
      { name: "Compress Image", href: "/image/{locale}/compress-image" },
    ],
  },
  {
    slug: "docx",
    name: "DOCX (Office Open XML 문서)",
    extension: ".docx",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    category: "Document",
    intro:
      "DOCX는 Microsoft Word의 기본 문서 형식이자, 전 세계에서 가장 많이 사용되는 워드프로세서 형식입니다. Office Open XML(OOXML) 표준을 기반으로 하며, XML 파일과 미디어 에셋을 ZIP으로 묶어 저장합니다.\n\nDOCX는 서식, 이미지, 표, 머리글/바닥글, 각주 등이 포함된 리치 텍스트 문서를 작성·편집하기 위한 형식으로, 대부분의 문서가 최종적으로 PDF로 변환되기 전 DOCX에서 출발합니다.",
    history:
      "Microsoft는 이진 .doc 형식을 대체하기 위해 Office 2007에서 DOCX를 도입했습니다. 기반이 되는 Office Open XML 사양은 2006년 ECMA-376으로, 2008년 ISO/IEC 29500으로 각각 표준화되었습니다.\n\nXML 기반 형식으로의 전환은 상호운용성, 투명성, 장기 보존에 대한 요구에서 비롯되었습니다. 현재 DOCX는 Microsoft Word, Google Docs, LibreOffice, Apple Pages를 비롯한 수많은 애플리케이션에서 지원됩니다.",
    technicalDetails:
      "DOCX 파일은 디렉터리 구조로 정리된 XML 파일들의 ZIP 아카이브입니다. 본문 내용은 word/document.xml에, 스타일은 word/styles.xml에, 관계 정보는 word/_rels/document.xml.rels에, 미디어 파일은 word/media/에 위치합니다.\n\nXML 마크업은 w:(WordprocessingML), r:(relationships), a:(DrawingML) 등의 네임스페이스를 사용합니다. 텍스트는 단락(<w:p>) 안의 런(<w:r>)으로 구성되며, 런 속성(<w:rPr>)과 텍스트 노드(<w:t>)를 포함합니다.\n\nDOCX는 테마, 임베디드 폰트, 변경 내용 추적, 주석, 양식 필드, 콘텐츠 컨트롤, SmartArt, OLE 개체를 지원합니다.",
    pros: [
      "주요 워드프로세서에서 보편적으로 편집 가능",
      "풍부한 서식, 스타일, 템플릿 기능",
      "문서화된 XML 스키마의 개방형 표준 (ISO/IEC 29500)",
      "변경 내용 추적 및 협업 편집 기능",
      "PDF를 비롯한 다른 형식으로 손쉽게 변환 가능",
    ],
    cons: [
      "에디터에 따라 서식이 달라질 수 있음 (Word vs. LibreOffice 등)",
      "고정 레이아웃 배포 용도로는 부적합 (PDF를 사용해야 함)",
      "복잡한 XML 구조라 프로그래밍으로 파싱하기 까다로움",
      "이미지가 많은 대용량 문서는 파일 크기가 커짐",
    ],
    useCases: [
      "비즈니스 보고서 및 제안서",
      "학술 논문 및 졸업 논문",
      "편지, 이력서, 자기소개서",
      "변경 내용 추적이 필요한 협업 문서",
      "반복 생성되는 문서의 템플릿",
    ],
    relatedFormats: ["pdf", "odt", "rtf", "txt"],
    relatedTools: [
      { name: "PDF to Text", href: "/pdf/{locale}/pdf-to-text" },
      { name: "Merge PDF", href: "/pdf/{locale}/merge-pdf" },
    ],
  },
  {
    slug: "csv",
    name: "CSV (쉼표로 구분된 값)",
    extension: ".csv",
    mimeType: "text/csv",
    category: "Text & Data",
    intro:
      "CSV는 표 형태 데이터를 위한 플레인 텍스트 형식으로, 한 줄이 한 행을, 쉼표가 열 구분자를 나타냅니다. 스프레드시트, 데이터베이스, 애플리케이션 간 데이터 교환에서 가장 단순하고 보편적인 형식입니다.\n\n오랫동안 공식 사양 없이 사용되어 왔지만, Excel, Google Sheets, Python pandas, SQL 임포트 유틸리티 등 거의 모든 데이터 도구가 CSV를 지원합니다.",
    history:
      "쉼표로 구분된 데이터의 역사는 개인용 컴퓨터보다 오래되었습니다. 1960년대 IBM Fortran 컴파일러가 이미 쉼표 구분 입력을 지원했고, 1970~80년대 VisiCalc과 Lotus 1-2-3 같은 초기 스프레드시트 소프트웨어와 함께 널리 보급되었습니다.\n\n2005년 발표된 RFC 4180이 CSV의 첫 공식 사양을 제공하며 따옴표, 이스케이프, 헤더 규칙을 정의했습니다. 그러나 실제 CSV 파일은 구분자, 인코딩, 따옴표 규칙이 제각각인 경우가 많습니다.",
    technicalDetails:
      "CSV 파일은 레코드를 줄바꿈(RFC 4180 권장: CRLF)으로, 필드를 쉼표로 구분하는 플레인 텍스트입니다. 쉼표, 큰따옴표, 줄바꿈을 포함하는 필드는 큰따옴표로 감싸야 하며, 내부 큰따옴표는 두 번 연속 기입하여 이스케이프합니다.\n\n선택적 헤더 행이 열 이름을 지정합니다. 데이터 타입, 인코딩, null 값을 명시하는 표준 방법이 없는데, 이것이 CSV의 최대 장점(단순함)이자 약점(모호함)입니다.\n\n유럽권에서는 세미콜론, TSV에서는 탭, 일부 시스템에서는 파이프(|)를 구분자로 사용하는 변형이 흔합니다.",
    pros: [
      "모든 플랫폼과 도구에서 보편적으로 호환",
      "텍스트 에디터에서 바로 편집할 수 있는 사람이 읽기 쉬운 형식",
      "부가 정보 없이 데이터만 담아 파일 크기가 극히 작음",
      "프로그래밍으로 생성·파싱하기 매우 쉬움",
      "독점 기술이나 라이선스에 의존하지 않음",
    ],
    cons: [
      "데이터 타입 정보가 없음 (모든 값이 문자열)",
      "인코딩 표준이 없어 UTF-8 vs. Latin-1 충돌 가능",
      "특수 문자와 다중 행 필드의 처리가 모호함",
      "시트 구분이나 메타데이터를 지원하지 않음",
      "대용량 데이터셋은 바이너리 형식 대비 파싱 속도가 느림",
    ],
    useCases: [
      "애플리케이션 간 데이터 가져오기/내보내기",
      "데이터베이스 덤프 및 마이그레이션",
      "스프레드시트 데이터 교환",
      "로그 파일 및 분석 데이터",
      "설정 파일 및 조회 테이블",
    ],
    relatedFormats: ["json", "xlsx", "txt"],
    relatedTools: [
      { name: "JSON to CSV", href: "/converter/{locale}/json-to-csv" },
      { name: "CSV to JSON", href: "/converter/{locale}/csv-to-json" },
    ],
  },
  {
    slug: "json",
    name: "JSON (자바스크립트 객체 표기법)",
    extension: ".json",
    mimeType: "application/json",
    category: "Text & Data",
    intro:
      "JSON은 사람이 읽고 쓰기 쉽고, 기계가 파싱하고 생성하기 쉬운 경량 텍스트 기반 데이터 교환 형식입니다. 웹 API, 설정 파일, 구조화된 데이터 교환에서 지배적인 형식으로 자리 잡았습니다.\n\nJSON은 데이터를 키-값 쌍(객체)과 순서 있는 리스트(배열)로 표현하며, JavaScript에서 파생된 문법을 사용합니다. 단순함과 언어 독립성 덕분에 현대 소프트웨어 개발의 공용어가 되었습니다.",
    history:
      "더글라스 크락포드가 2000년대 초반 XML보다 간결한 데이터 교환 대안으로 JSON을 대중화했습니다. RFC 4627(2006)에서 처음 규격화되었고, RFC 7159(2014)를 거쳐 2017년 RFC 8259 및 ECMA-404로 최종 확정되었습니다.\n\nJSON은 컴팩트한 문법과 JavaScript에서의 네이티브 지원 덕분에 웹 API에서 XML을 빠르게 대체했습니다. 현재 사실상 모든 프로그래밍 언어가 내장 또는 표준 라이브러리 수준의 JSON 지원을 제공합니다.",
    technicalDetails:
      "JSON은 여섯 가지 값 타입을 정의합니다. 큰따옴표로 감싼 문자열, 정수 또는 부동소수점 숫자, 불리언(true/false), null, 키-값 쌍의 비순서 집합인 객체({}), 순서 있는 리스트인 배열([])입니다.\n\n문자열은 반드시 큰따옴표를 사용하며 유니코드 이스케이프 시퀀스(\\uXXXX)를 지원합니다. 숫자는 JavaScript 문법을 따르되 선행 0, NaN, Infinity는 허용하지 않습니다. 스펙상 객체에 중복 키가 허용되지만, 실제 동작은 구현에 따라 다릅니다.\n\nJSON은 UTF-8, UTF-16, UTF-32로 인코딩할 수 있으며, 대부분의 경우 UTF-8이 기본입니다. 표준 JSON에서는 주석, 후행 쉼표, 날짜 타입을 지원하지 않습니다.",
    pros: [
      "한눈에 파악할 수 있을 만큼 읽기 쉬움",
      "불필요한 구문이 최소화된 경량 문법",
      "JavaScript를 비롯한 대부분의 프로그래밍 언어에서 네이티브 지원",
      "REST API 및 웹 서비스의 사실상 표준 형식",
      "검증기, 포매터, 쿼리 언어(jq, JSONPath) 등 풍부한 도구 지원",
    ],
    cons: [
      "날짜, 바이너리, 스키마 타입이 내장되어 있지 않음",
      "표준 JSON에서 주석 미지원",
      "깊이 중첩되거나 반복적인 데이터에서는 장황해짐",
      "숫자 정밀도 제한 (IEEE 754)",
      "스트리밍 표준이 없음 (NDJSON이 이 역할을 보완)",
    ],
    useCases: [
      "REST 및 GraphQL API 응답",
      "설정 파일 (package.json, tsconfig.json)",
      "NoSQL 데이터베이스 데이터 저장 (MongoDB, CouchDB)",
      "마이크로서비스 아키텍처에서의 서비스 간 통신",
      "구조화된 로깅 및 이벤트 데이터",
    ],
    relatedFormats: ["csv", "xml", "yaml"],
    relatedTools: [
      { name: "JSON to CSV", href: "/converter/{locale}/json-to-csv" },
      { name: "CSV to JSON", href: "/converter/{locale}/csv-to-json" },
      { name: "JSON Formatter", href: "/text/{locale}/json-formatter" },
    ],
  },
  {
    slug: "tiff",
    name: "TIFF (태그 이미지 파일 형식)",
    extension: ".tiff / .tif",
    mimeType: "image/tiff",
    category: "Image",
    intro:
      "TIFF는 전문 사진, 출판, 과학 영상 분야에서 널리 사용되는 유연한 래스터 이미지 형식입니다. 높은 비트 심도, 다양한 색 공간, 손실·무손실 압축을 모두 지원하며, 고품질 이미지 보관의 대표 형식입니다.\n\nTIFF 파일은 단일 파일에 여러 이미지(페이지)를 저장할 수 있고 풍부한 메타데이터를 담을 수 있어, 문서 스캔 및 팩스 워크플로에도 적합합니다.",
    history:
      "Aldus Corporation(이후 Adobe에 인수)이 1986년 Microsoft와 협력하여 TIFF를 개발했습니다. 마지막 주요 개정판인 TIFF 6.0은 1992년에 발표되었으며, 현재까지 현행 사양으로 사용됩니다.\n\n오래된 형식임에도 TIFF는 무손실 사진 이미지의 업계 표준 자리를 유지하고 있습니다. GIS(GeoTIFF), 의료 영상(DICOM과 병행), 도서관 디지털화 프로젝트 등에서 폭넓게 활용됩니다.",
    technicalDetails:
      "TIFF는 태그 기반 구조를 사용합니다. 각 IFD(Image File Directory)에는 이미지 크기, 색상 모델, 압축 방식, 해상도 등을 기술하는 태그가 포함됩니다. 태그는 숫자 ID로 식별되며, 스펙에서 수백 개의 표준 태그를 정의합니다.\n\n지원 압축 방식에는 비압축, LZW, DEFLATE(ZIP), JPEG, CCITT Group 3/4(팩스용) 및 독점 방식이 있습니다. 색상 모델은 이진, 그레이스케일, 팔레트, RGB, CMYK, YCbCr, CIE L*a*b*를 지원합니다. 비트 심도는 샘플당 1~32비트까지 가능합니다.\n\nTIFF는 대용량 이미지를 위한 타일링, 스트리밍을 위한 스트립, 다중 해상도(피라미드 TIFF), 부동소수점 픽셀 데이터를 지원합니다.",
    pros: [
      "무손실 저장으로 최대 이미지 품질 보존",
      "CMYK, Lab 등 전문 색 공간 지원",
      "문서 워크플로를 위한 다중 페이지 기능",
      "풍부한 메타데이터와 태그 시스템",
      "보관·인쇄 분야의 업계 표준",
    ],
    cons: [
      "비압축 또는 무손실 이미지에서 매우 큰 파일 크기",
      "웹 브라우저에서 지원하지 않아 변환이 필요",
      "선택적 기능이 많은 복잡한 사양",
      "뷰어마다 고급 기능에 대한 지원이 일관되지 않음",
    ],
    useCases: [
      "전문 사진 촬영 및 인쇄 제작",
      "문서 스캔 및 보관",
      "과학·의료 영상",
      "GIS 및 위성 이미지 (GeoTIFF)",
      "팩스 전송 (CCITT 압축 TIFF)",
    ],
    relatedFormats: ["png", "jpg", "psd", "pdf"],
    relatedTools: [
      { name: "Convert Image", href: "/image/{locale}/convert-image" },
      { name: "Compress Image", href: "/image/{locale}/compress-image" },
    ],
  },
  {
    slug: "heic",
    name: "HEIC (고효율 이미지 컨테이너)",
    extension: ".heic / .heif",
    mimeType: "image/heic",
    category: "Image",
    intro:
      "HEIC는 HEVC(H.265) 비디오 코덱에 기반한 차세대 이미지 형식입니다. 동일 화질 기준 JPEG 대비 약 50% 작은 파일 크기를 실현하며, iOS 11부터 Apple 기기의 기본 사진 형식으로 채택되었습니다.\n\nHEIC는 JPEG에 없는 10비트·12비트 색상 깊이, 알파 투명도, 이미지 시퀀스(라이브 포토), 깊이 맵 등을 지원합니다. 기술적으로 앞서 있지만 Apple 생태계 밖에서의 보급은 아직 더딘 편입니다.",
    history:
      "HEIF(High Efficiency Image File Format) 컨테이너는 2015년 MPEG에서 ISO/IEC 23008-12로 표준화되었습니다. 코덱으로 HEVC(H.265)를 사용하는 경우 HEIC로 불립니다.\n\nApple은 iOS 11(2017)과 macOS High Sierra에서 HEIC를 기본 카메라 형식으로 채택했습니다. Android는 9.0(2018)에서, Windows 10은 Microsoft Store 확장을 통해 HEIC를 지원합니다. 브라우저 네이티브 지원은 2024년 기준 여전히 제한적입니다.",
    technicalDetails:
      "HEIC 파일은 MP4와 같은 계열인 ISO Base Media File Format(ISOBMFF) 컨테이너를 사용합니다. 이미지 데이터는 HEVC 인트라 프레임 코딩으로 인코딩되며, 고급 예측 모드, 더 큰 변환 블록, CABAC 엔트로피 코딩을 활용합니다.\n\n단일 HEIC 파일에 여러 이미지(연사, 썸네일, 알파 맵, 깊이 맵)를 담을 수 있어 진정한 이미지 컨테이너 역할을 합니다. 메타데이터는 Exif, XMP, MPEG-7 표준으로 저장됩니다.\n\nHEIC는 대용량 이미지를 위한 타일링, 보조 이미지(알파, 깊이), 기본 이미지를 참조하여 픽셀 데이터를 복제하지 않는 파생 이미지(그리드, 오버레이, 회전)를 지원합니다.",
    pros: [
      "동일 화질 기준 JPEG 대비 50% 작은 파일 크기",
      "10비트·12비트 HDR 콘텐츠 지원",
      "알파 투명도 및 깊이 맵 지원",
      "하나의 파일에 여러 이미지 저장 (시퀀스, 연사)",
      "Apple 기기 기본 형식 (수십억 장의 사진이 이 형식으로 저장)",
    ],
    cons: [
      "브라우저 네이티브 지원이 제한적 (웹에서 직접 표시 불가)",
      "HEVC 특허로 인한 라이선스 복잡성",
      "Windows·Android에서 범용 지원이 미흡",
      "웹 공유나 게시를 위해 변환이 필요",
    ],
    useCases: [
      "iPhone·iPad 사진 촬영",
      "넓은 색역의 HDR 사진",
      "라이브 포토 및 연사 시퀀스",
      "모바일 기기에서 저장 공간을 절약하는 사진 라이브러리",
      "용량 대비 화질이 중요한 전문 사진 촬영",
    ],
    relatedFormats: ["jpg", "webp", "avif", "png"],
    relatedTools: [
      { name: "Convert Image", href: "/image/{locale}/convert-image" },
      { name: "Compress Image", href: "/image/{locale}/compress-image" },
    ],
  },
  {
    slug: "xml",
    name: "XML (확장 가능한 마크업 언어)",
    extension: ".xml",
    mimeType: "application/xml",
    category: "Text & Data",
    intro:
      "XML은 사람이 읽을 수 있으면서 기계도 파싱할 수 있는 문서 인코딩 규칙을 정의하는 마크업 언어입니다. 구조와 자기 기술성에 초점을 맞춰 데이터를 전달하도록 설계되었습니다.\n\nXML은 한때 데이터 교환, 설정, 웹 서비스에서 지배적인 형식이었습니다. 웹 API에서는 JSON에 자리를 내주었지만, 엔터프라이즈 시스템, 문서 형식(OOXML, ODF, SVG), 엄격한 데이터 검증이 필요한 산업에서는 여전히 필수적입니다.",
    history:
      "XML은 W3C에서 개발되어 1998년 2월 권고안으로 공개되었습니다. 보다 단순하고 실용적인 SGML 부분 집합을 만든다는 목표에서 출발했습니다.\n\nXML 1.0은 여러 차례 개정을 거쳐 2008년 5차 에디션이 발행되었고, XML 1.1은 추가 유니코드 문자를 지원하기 위해 2004년 발표되었습니다. XML 생태계에는 XPath, XSLT, XQuery, XML Schema(XSD) 등 수많은 관련 사양이 포함됩니다.",
    technicalDetails:
      "XML 문서는 프롤로그(선택적 XML 선언 및 DTD), 요소(중첩된 태그), 속성, 텍스트 콘텐츠, CDATA 섹션, 처리 명령, 주석으로 구성됩니다. 모든 XML 문서는 올바르게 중첩된 태그, 단일 루트 요소, 따옴표로 감싼 속성 값이라는 정형성(well-formedness) 조건을 충족해야 합니다.\n\n유효성 검사는 DTD(Document Type Definition), XML Schema(XSD), RelaxNG, Schematron으로 수행할 수 있습니다. 네임스페이스를 사용하면 서로 다른 스키마의 어휘를 하나의 문서에서 혼합할 수 있습니다.\n\nXML은 유니코드를 기본 지원하며, 특수 문자는 문자 참조로 처리합니다. 문서 파싱은 DOM(전체 트리), SAX(이벤트 기반), StAX(풀 기반) 또는 스트리밍 방식으로 가능합니다.",
    pros: [
      "엄격한 구조 규칙을 갖춘 자기 기술적 형식",
      "강력한 스키마 검증 (XSD, RelaxNG)",
      "풍부한 생태계 (XPath, XSLT, XQuery)",
      "서로 다른 어휘를 혼합할 수 있는 우수한 네임스페이스 지원",
      "엔터프라이즈 통합의 확립된 표준",
    ],
    cons: [
      "JSON이나 YAML에 비해 장황한 문법",
      "파싱이 무겁고 전송 속도가 느림",
      "학습 곡선이 가파른 복잡한 스키마 언어",
      "단순한 데이터 교환 작업에는 과도한 스펙",
    ],
    useCases: [
      "엔터프라이즈 통합 (SOAP, EDI, HL7)",
      "문서 형식 (DOCX, SVG, XHTML, RSS, Atom)",
      "설정 파일 (Maven pom.xml, Android 매니페스트)",
      "스키마 검증이 필요한 데이터 직렬화",
      "출판 및 콘텐츠 관리 (DITA, DocBook)",
    ],
    relatedFormats: ["json", "csv", "yaml", "html"],
    relatedTools: [
      { name: "JSON Formatter", href: "/text/{locale}/json-formatter" },
    ],
  },
];

export function getFormatBySlugKo(slug: string): Format | undefined {
  return formatsKo.find((f) => f.slug === slug);
}
