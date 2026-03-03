import type { Dictionary } from "../config";

const ko: Dictionary = {
  home: {
    title: "PDF 작업에 필요한 모든 도구",
    titleAccent: "PDF",
    description: "PDF 파일을 병합, 분할, 압축, 변환하세요. 무료, 빠르고, 간편합니다.",
    tabAll: "전체",
    categoryOrganize: "정리",
    categoryConvert: "변환",
    categoryEdit: "편집",
    categoryOptimize: "최적화",
    categorySecurity: "보안",
    searchPlaceholder: "도구 검색...",
    noResults: "검색 결과가 없습니다.",
  },
  trust: {
    encryption: "보안 암호화",
    encryptionDesc: "256비트 SSL 암호화로 파일을 보호합니다.",
    autoDelete: "자동 삭제",
    autoDeleteDesc: "업로드 파일은 2시간 후 자동으로 삭제됩니다.",
    free: "완전 무료",
    freeDesc: "모든 도구를 제한 없이 무료로 사용하세요.",
    cloud: "클라우드 처리",
    cloudDesc: "서버에서 처리하여 기기 성능에 영향 없습니다.",
  },
  tools: {
    // Organize
    merge: { title: "PDF 병합", description: "여러 PDF 파일을 하나의 문서로 합칩니다." },
    split: { title: "PDF 분할", description: "PDF를 개별 페이지 또는 섹션으로 나눕니다." },
    "delete-pages": { title: "페이지 삭제", description: "PDF에서 특정 페이지를 삭제합니다." },
    "extract-pages": { title: "페이지 추출", description: "선택한 페이지를 새 PDF로 추출합니다." },
    "organize-pages": { title: "페이지 정리", description: "페이지를 시각적으로 재배치, 추가, 삭제합니다." },
    "scan-to-pdf": { title: "스캔 → PDF", description: "스캔한 이미지를 PDF로 변환합니다." },

    // Convert
    "pdf-to-word": { title: "PDF → Word", description: "PDF를 편집 가능한 Word 파일로 변환합니다." },
    "pdf-to-jpg": { title: "PDF → JPG", description: "PDF 페이지를 고화질 JPG 이미지로 변환합니다." },
    "pdf-to-excel": { title: "PDF → Excel", description: "PDF의 표 데이터를 Excel로 추출합니다." },
    "pdf-to-ppt": { title: "PDF → PPT", description: "PDF를 편집 가능한 PPT 슬라이드로 변환합니다." },
    "pdf-to-png": { title: "PDF → PNG", description: "PDF 페이지를 고화질 PNG 이미지로 변환합니다." },
    "pdf-to-text": { title: "PDF → 텍스트", description: "PDF에서 모든 텍스트를 추출합니다." },
    "pdf-to-pdfa": { title: "PDF → PDF/A", description: "장기 보관용 PDF/A 형식으로 변환합니다." },
    "word-to-pdf": { title: "Word → PDF", description: "Word 문서를 PDF 형식으로 변환합니다." },
    "jpg-to-pdf": { title: "JPG → PDF", description: "JPG 이미지를 PDF 문서로 변환합니다." },
    "excel-to-pdf": { title: "Excel → PDF", description: "Excel 스프레드시트를 PDF로 변환합니다." },
    "ppt-to-pdf": { title: "PPT → PDF", description: "PowerPoint 프레젠테이션을 PDF로 변환합니다." },
    "html-to-pdf": { title: "HTML → PDF", description: "웹 페이지와 HTML 파일을 PDF로 변환합니다." },
    "png-to-pdf": { title: "PNG → PDF", description: "PNG 이미지를 PDF 문서로 변환합니다." },
    "image-to-pdf": { title: "이미지 → PDF", description: "다양한 형식의 이미지를 하나의 PDF로 합칩니다." },

    // Edit
    "edit-pdf": { title: "PDF 편집", description: "PDF에 텍스트, 이미지, 도형, 주석을 추가합니다." },
    rotate: { title: "PDF 회전", description: "PDF 페이지를 올바른 방향으로 회전합니다." },
    "page-numbers": { title: "페이지 번호", description: "PDF 문서에 페이지 번호를 추가합니다." },
    watermark: { title: "워터마크", description: "PDF에 텍스트 또는 이미지 워터마크를 추가합니다." },
    crop: { title: "PDF 자르기", description: "PDF 페이지의 여백을 자르거나 특정 영역을 선택합니다." },
    sign: { title: "PDF 서명", description: "PDF 문서에 전자 서명을 추가합니다." },
    annotate: { title: "PDF 주석", description: "PDF에 형광펜, 밑줄, 댓글을 추가합니다." },
    flatten: { title: "PDF 평탄화", description: "양식 필드와 주석을 페이지 콘텐츠에 병합합니다." },
    resize: { title: "PDF 크기 변경", description: "PDF 페이지 크기를 변경합니다 (A4, Letter 등)." },
    "edit-metadata": { title: "메타데이터 편집", description: "PDF 제목, 작성자, 키워드 등을 변경합니다." },
    grayscale: { title: "흑백 변환", description: "PDF 색상을 흑백으로 변환합니다." },

    // Optimize
    compress: { title: "PDF 압축", description: "품질 손실 없이 PDF 파일 크기를 줄입니다." },
    repair: { title: "PDF 복구", description: "손상되거나 깨진 PDF 파일을 복구합니다." },
    ocr: { title: "OCR PDF", description: "스캔된 PDF를 텍스트 인식으로 검색 가능하게 만듭니다." },
    "web-optimize": { title: "웹 최적화", description: "웹에서 빠르게 로드되도록 PDF를 최적화합니다." },

    // Security
    protect: { title: "PDF 보호", description: "비밀번호와 암호화로 PDF를 보호합니다." },
    unlock: { title: "PDF 잠금 해제", description: "PDF의 비밀번호 보호를 제거합니다." },
    redact: { title: "PDF 검열", description: "PDF에서 민감한 정보를 영구적으로 제거합니다." },
    compare: { title: "PDF 비교", description: "두 PDF를 나란히 비교하고 차이점을 확인합니다." },
    translate: { title: "PDF 번역", description: "AI로 PDF 콘텐츠를 다른 언어로 번역합니다." },
  },
  nav: {
    allTools: "모든 도구",
    language: "언어",
  },
  footer: {
    tools: "도구",
    legal: "법적 고지",
    privacy: "개인정보처리방침",
    terms: "이용약관",
    copyright: "ToolBox. All rights reserved.",
  },
  common: {
    backToAll: "모든 도구로 돌아가기",
    dropFiles: "파일을 여기에 놓으세요",
    acceptedFormats: "지원 형식",
  },
  metadata: {
    siteTitle: "ToolBox PDF - 무료 PDF 도구",
    siteDescription: "PDF 파일을 온라인에서 무료로 병합, 분할, 압축, 변환하세요.",
    toolTitleSuffix: "- ToolBox PDF",
  },
  cookie: {
    message: "이 사이트는 더 나은 경험을 위해 쿠키를 사용합니다.",
    accept: "동의",
    decline: "거부",
  },
  privacy: {
    title: "개인정보처리방침",
    lastUpdated: "최종 수정일: 2026년 3월 1일",
    intro: "ToolBox PDF는 이용자의 개인정보를 소중히 다룹니다. 본 방침은 서비스 이용 과정에서 어떤 정보가 수집되고, 어떻게 활용되는지 안내합니다.",
    sections: [
      {
        heading: "1. 수집하는 정보",
        content: "ToolBox PDF는 회원가입 없이 이용할 수 있으며, 별도의 개인정보를 수집하지 않습니다. 단, 서비스 품질 개선을 위해 다음과 같은 비식별 정보를 자동으로 수집할 수 있습니다.\n\n• 브라우저 종류 및 버전\n• 운영체제 정보\n• 방문 페이지 및 이용 시간\n• 쿠키 및 유사 기술을 통한 사이트 이용 패턴",
      },
      {
        heading: "2. 파일 처리 및 보관",
        content: "업로드된 파일은 서버에서 처리된 후, 최대 2시간 이내에 자동 삭제됩니다. 처리 과정에서 파일 내용을 열람하거나 저장하지 않으며, 제3자에게 공유하지 않습니다.",
      },
      {
        heading: "3. 쿠키 사용",
        content: "ToolBox PDF는 테마 설정(다크/라이트 모드), 언어 선택 등 이용자 환경을 기억하기 위해 쿠키를 사용합니다. 광고 네트워크(예: Google AdSense)를 통해 맞춤 광고를 제공할 수 있으며, 이 과정에서 쿠키가 사용될 수 있습니다.",
      },
      {
        heading: "4. 제3자 서비스",
        content: "서비스 운영 및 분석을 위해 아래 제3자 서비스를 이용할 수 있습니다.\n\n• Google Analytics – 트래픽 분석\n• Google AdSense – 광고 게재\n\n각 서비스의 개인정보 처리에 대해서는 해당 서비스의 개인정보처리방침을 참고해 주세요.",
      },
      {
        heading: "5. 이용자의 권리",
        content: "브라우저 설정을 통해 쿠키 수집을 거부하거나 삭제할 수 있습니다. 다만, 일부 기능이 정상적으로 작동하지 않을 수 있습니다.",
      },
      {
        heading: "6. 방침 변경",
        content: "본 방침은 법률 개정이나 서비스 변경에 따라 수정될 수 있으며, 변경 시 이 페이지를 통해 안내됩니다.",
      },
      {
        heading: "7. 문의",
        content: "개인정보 관련 문의는 support@toolbox-pdf.com으로 보내주세요.",
      },
    ],
  },
  terms: {
    title: "이용약관",
    lastUpdated: "최종 수정일: 2026년 3월 1일",
    intro: "ToolBox PDF(이하 '서비스')를 이용해 주셔서 감사합니다. 서비스를 이용하시면 아래 약관에 동의한 것으로 간주됩니다.",
    sections: [
      {
        heading: "1. 서비스 개요",
        content: "ToolBox PDF는 PDF 파일의 병합, 분할, 변환, 편집, 압축 등 다양한 기능을 웹 브라우저에서 제공하는 무료 온라인 서비스입니다.",
      },
      {
        heading: "2. 이용 조건",
        content: "• 서비스는 합법적인 목적으로만 이용해야 합니다.\n• 타인의 저작권이나 지식재산권을 침해하는 파일을 처리해서는 안 됩니다.\n• 서비스를 악의적으로 남용하거나 서버에 과도한 부하를 유발하는 행위는 금지됩니다.\n• 자동화된 방식(봇, 크롤러 등)으로 서비스에 접근하는 것은 허용되지 않습니다.",
      },
      {
        heading: "3. 파일 처리",
        content: "업로드된 파일은 요청된 작업을 수행하기 위해서만 사용되며, 처리 완료 후 최대 2시간 이내에 서버에서 자동 삭제됩니다. 파일 내용을 분석하거나 보관하지 않습니다.",
      },
      {
        heading: "4. 면책 조항",
        content: "서비스는 \"있는 그대로\" 제공됩니다. 파일 변환의 정확성, 서비스의 중단 없는 운영, 데이터 손실 방지 등에 대해 보증하지 않습니다. 중요한 파일은 반드시 원본을 백업한 후 이용해 주세요.",
      },
      {
        heading: "5. 지식재산권",
        content: "서비스의 디자인, 로고, 코드 등 모든 콘텐츠에 대한 권리는 ToolBox에 있습니다. 이용자가 업로드하는 파일에 대한 권리는 이용자에게 있으며, ToolBox는 해당 파일에 대해 어떠한 권리도 주장하지 않습니다.",
      },
      {
        heading: "6. 서비스 변경 및 중단",
        content: "ToolBox는 사전 고지 없이 서비스 기능을 변경하거나 중단할 수 있습니다.",
      },
      {
        heading: "7. 약관 변경",
        content: "본 약관은 필요에 따라 수정될 수 있으며, 변경 시 이 페이지를 통해 안내됩니다. 변경 후에도 서비스를 계속 이용하면 수정된 약관에 동의한 것으로 간주합니다.",
      },
      {
        heading: "8. 문의",
        content: "이용약관 관련 문의는 support@toolbox-pdf.com으로 보내주세요.",
      },
    ],
  },
};

export default ko;
