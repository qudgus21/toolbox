import type { ImageDictionary } from "../image-config";

const ko: ImageDictionary = {
  home: {
    title: "이미지 작업에 필요한 모든 도구",
    titleAccent: "이미지",
    description:
      "크기 조절, 포맷 변환, 효과 적용까지. 브라우저에서 바로 처리하세요.",
    tabAll: "전체",
    categoryEdit: "편집",
    categoryConvert: "변환",
    categoryEffects: "효과",
    categoryCompose: "구성",
    categoryOptimize: "최적화",
    categoryGenerate: "생성",
    searchPlaceholder: "도구 검색...",
    noResults: "검색 결과가 없습니다",
    recentTools: "최근 사용",
    favorites: "즐겨찾기",
    favDragHint: "드래그해서 순서를 변경하세요",
    favHint: "자주 쓰는 도구를 즐겨찾기에 추가해 보세요",
  },
  trust: {
    encryption: "안전한 처리",
    encryptionDesc: "파일이 서버로 전송되지 않습니다",
    autoDelete: "자동 삭제",
    autoDeleteDesc: "작업이 끝나면 데이터가 즉시 사라집니다",
    free: "완전 무료",
    freeDesc: "모든 기능을 제한 없이 사용하세요",
    browserProcessing: "브라우저 처리",
    browserProcessingDesc: "모든 작업이 내 컴퓨터에서 직접 처리됩니다",
  },
  tools: {
    resize: {
      title: "크기 조절",
      description: "이미지 크기를 정밀하게 조절합니다",
    },
    crop: {
      title: "자르기",
      description: "원하는 영역만 깔끔하게 잘라냅니다",
    },
    rotate: {
      title: "회전",
      description: "이미지를 원하는 각도로 회전시킵니다",
    },
    flip: {
      title: "뒤집기",
      description: "이미지를 좌우 또는 상하로 뒤집습니다",
    },
    "photo-editor": {
      title: "사진 편집기",
      description: "밝기, 대비, 색조를 세밀하게 보정합니다",
    },
    "jpg-to-png": {
      title: "JPG를 PNG로",
      description: "JPG 이미지를 투명 배경이 가능한 PNG로 변환합니다",
    },
    "png-to-jpg": {
      title: "PNG를 JPG로",
      description: "PNG 이미지를 용량이 작은 JPG로 변환합니다",
    },
    "webp-to-jpg": {
      title: "WebP를 JPG로",
      description: "WebP 이미지를 호환성 높은 JPG로 변환합니다",
    },
    "webp-to-png": {
      title: "WebP를 PNG로",
      description: "WebP 이미지를 고품질 PNG로 변환합니다",
    },
    "jpg-to-webp": {
      title: "JPG를 WebP로",
      description: "JPG를 웹에 최적화된 WebP로 변환합니다",
    },
    "png-to-webp": {
      title: "PNG를 WebP로",
      description: "PNG를 가벼운 WebP 포맷으로 변환합니다",
    },
    "svg-to-png": {
      title: "SVG를 PNG로",
      description: "벡터 SVG를 원하는 크기의 PNG로 변환합니다",
    },
    "svg-to-jpg": {
      title: "SVG를 JPG로",
      description: "벡터 SVG를 JPG 이미지로 변환합니다",
    },
    "gif-to-jpg": {
      title: "GIF를 JPG로",
      description: "GIF의 첫 프레임을 JPG 이미지로 추출합니다",
    },
    "bmp-to-jpg": {
      title: "BMP를 JPG로",
      description: "BMP 이미지를 용량이 작은 JPG로 변환합니다",
    },
    "bmp-to-png": {
      title: "BMP를 PNG로",
      description: "BMP 이미지를 PNG 포맷으로 변환합니다",
    },
    "heic-to-jpg": {
      title: "HEIC를 JPG로",
      description: "아이폰 HEIC 사진을 JPG로 변환합니다",
    },
    "heic-to-png": {
      title: "HEIC를 PNG로",
      description: "아이폰 HEIC 사진을 PNG로 변환합니다",
    },
    "tiff-to-jpg": {
      title: "TIFF를 JPG로",
      description: "TIFF 이미지를 가벼운 JPG로 변환합니다",
    },
    "tiff-to-png": {
      title: "TIFF를 PNG로",
      description: "TIFF 이미지를 PNG 포맷으로 변환합니다",
    },
    "psd-to-jpg": {
      title: "PSD를 JPG로",
      description: "포토샵 PSD 파일을 JPG 이미지로 변환합니다",
    },
    "psd-to-png": {
      title: "PSD를 PNG로",
      description: "포토샵 PSD 파일을 PNG 이미지로 변환합니다",
    },
    "eps-to-jpg": {
      title: "EPS를 JPG로",
      description: "EPS 벡터 파일을 JPG 이미지로 변환합니다",
    },
    "eps-to-png": {
      title: "EPS를 PNG로",
      description: "EPS 벡터 파일을 PNG 이미지로 변환합니다",
    },
    "eps-to-svg": {
      title: "EPS를 SVG로",
      description: "EPS 파일을 웹용 SVG 벡터로 변환합니다",
    },
    "png-to-svg": {
      title: "PNG를 SVG로",
      description: "PNG 이미지를 확대해도 깨지지 않는 SVG로 변환합니다",
    },
    "jpg-to-svg": {
      title: "JPG를 SVG로",
      description: "JPG 이미지를 벡터 SVG로 변환합니다",
    },
    "gif-to-mp4": {
      title: "GIF를 MP4로",
      description: "GIF 애니메이션을 가벼운 MP4 영상으로 변환합니다",
    },
    "image-to-text": {
      title: "이미지에서 텍스트 추출",
      description: "이미지 속 글자를 인식해 텍스트로 추출합니다",
    },
    grayscale: {
      title: "흑백 변환",
      description: "컬러 이미지를 분위기 있는 흑백으로 바꿉니다",
    },
    "add-text": {
      title: "텍스트 추가",
      description: "이미지 위에 원하는 텍스트를 넣습니다",
    },
    "add-border": {
      title: "테두리 추가",
      description: "이미지에 스타일리시한 테두리를 씌웁니다",
    },
    pixelate: {
      title: "모자이크",
      description: "특정 영역을 모자이크 처리합니다",
    },
    blur: {
      title: "흐림 효과",
      description: "이미지 전체 또는 일부에 블러를 적용합니다",
    },
    filters: {
      title: "필터",
      description: "세피아, 빈티지 등 다양한 필터를 입힙니다",
    },
    combine: {
      title: "이미지 합치기",
      description: "여러 이미지를 가로 또는 세로로 이어 붙입니다",
    },
    "split-image": {
      title: "이미지 분할",
      description: "하나의 이미지를 여러 조각으로 나눕니다",
    },
    collage: {
      title: "콜라주",
      description: "여러 사진을 멋진 콜라주 한 장으로 만듭니다",
    },
    "round-image": {
      title: "둥근 이미지",
      description: "이미지 모서리를 동그랗게 다듬습니다",
    },
    "profile-photo": {
      title: "프로필 사진",
      description: "SNS에 딱 맞는 프로필 사진을 만듭니다",
    },
    meme: {
      title: "밈 만들기",
      description: "이미지에 재미있는 텍스트를 넣어 밈을 만듭니다",
    },
    compress: {
      title: "이미지 압축",
      description: "화질은 유지하면서 파일 크기를 줄입니다",
    },
    watermark: {
      title: "워터마크",
      description: "이미지에 텍스트나 로고 워터마크를 삽입합니다",
    },
    "image-to-icon": {
      title: "아이콘 생성",
      description: "파비콘과 앱 아이콘을 다양한 크기로 만듭니다.",
    },
    "color-palette": {
      title: "색상 추출",
      description: "이미지에서 주요 색상을 추출합니다.",
    },
    "html-to-image": {
      title: "HTML → 이미지",
      description: "HTML 코드를 이미지로 변환합니다.",
    },
    gradient: {
      title: "그라디언트 생성",
      description: "그라디언트 이미지를 만듭니다.",
    },
    placeholder: {
      title: "플레이스홀더",
      description: "개발용 플레이스홀더 이미지를 생성합니다.",
    },
    pattern: {
      title: "패턴 생성",
      description: "반복 패턴 이미지를 만듭니다.",
    },
    "qr-code": {
      title: "QR 코드 생성",
      description: "텍스트나 URL로 QR 코드를 만듭니다.",
    },
    "color-replace": {
      title: "색상 교체",
      description: "이미지의 특정 색상을 다른 색상으로 바꿉니다.",
    },
    vignette: {
      title: "비네팅",
      description: "가장자리를 어둡게 하는 비네팅 효과를 적용합니다.",
    },
    noise: {
      title: "노이즈 추가",
      description: "필름 그레인과 노이즈 질감을 추가합니다.",
    },
    sharpen: {
      title: "선명하게",
      description: "이미지의 선명도와 디테일을 강화합니다.",
    },
    sepia: {
      title: "세피아 톤",
      description: "따뜻한 빈티지 세피아 톤을 적용합니다.",
    },
    invert: {
      title: "색상 반전",
      description: "이미지의 모든 색상을 반전합니다.",
    },
    // ── AI (서버 추가 시 주석 해제) ──
    // "remove-background": { title: "배경 제거", description: "AI가 자동으로 이미지 배경을 감지해 제거합니다." },
    // "transparent-background": { title: "투명 배경", description: "이미지 배경을 투명하게 만듭니다." },
    // "blur-background": { title: "배경 흐리게", description: "피사체는 선명하게, 배경만 블러 처리합니다." },
    // "remove-watermark": { title: "워터마크 제거", description: "이미지에서 워터마크를 깔끔하게 지웁니다." },
    // "remove-objects": { title: "객체 제거", description: "사진 속 불필요한 요소를 AI로 지웁니다." },
    // "remove-person": { title: "인물 제거", description: "사진에서 사람을 자동으로 제거합니다." },
    // "remove-text": { title: "텍스트 제거", description: "이미지 속 글자를 AI로 지웁니다." },
    // "cleanup-picture": { title: "사진 정리", description: "사진을 자동으로 깔끔하게 보정합니다." },
    // "unblur": { title: "흐림 제거", description: "흐릿한 이미지를 AI로 선명하게 복원합니다." },
    // "upscale": { title: "해상도 업스케일", description: "AI로 이미지 해상도를 높입니다." },
    // "colorize": { title: "흑백 사진 컬러화", description: "흑백 사진에 AI로 자연스러운 색을 입힙니다." },
    // "ai-image-generator": { title: "AI 이미지 생성", description: "텍스트 설명으로 이미지를 생성합니다." },
    // "blur-face": { title: "얼굴 블러", description: "사진 속 얼굴을 자동으로 감지해 블러 처리합니다." },
  },
  nav: {
    allTools: "모든 도구",
    language: "언어",
  },
  footer: {
    tools: "도구",
    legal: "법적 고지",
    privacy: "개인정보 처리방침",
    terms: "이용약관",
    copyright: "All rights reserved.",
    company: "회사",
    about: "소개",
    contact: "문의",
    faq: "자주 묻는 질문",
  },
  common: {
    backToAll: "모든 도구로 돌아가기",
    dropFiles: "파일을 끌어다 놓거나 클릭하세요",
    acceptedFormats: "지원 형식",
    processing: "처리 중...",
    download: "다운로드",
    startOver: "처음부터 다시",
    addMoreFiles: "파일 추가",
    process: "변환하기",
    tryAgain: "다시 시도",
    notImplemented: "이 기능은 준비 중입니다",
    filesSelected: "개 파일 선택됨",
    filesSizeTotal: "전체 크기",
    sortByName: "이름순",
    sortBySize: "크기순",
    tryOtherTools: "다른 도구도 사용해 보세요",
    privacyBadge: "파일이 서버로 전송되지 않습니다",
    favoriteAdded: "즐겨찾기에 추가했습니다",
    favoriteRemoved: "즐겨찾기에서 제거했습니다",
    comingSoon: "곧 출시 예정",
    originalSize: "원본 크기",
    newSize: "변환 후 크기",
    reduction: "절감률",
    width: "너비",
    height: "높이",
  },
  metadata: {
    siteTitle: "이미지 도구 - 온라인 이미지 편집",
    siteDescription:
      "크기 조절, 포맷 변환, 배경 제거까지. 브라우저에서 바로 처리하는 무료 이미지 도구.",
    toolTitleSuffix: "온라인 이미지 도구",
  },
  blog: {
    title: "블로그",
    description: "이미지 편집과 포맷에 관한 유용한 글 모음",
    readMore: "자세히 보기",
    backToBlog: "블로그로 돌아가기",
    publishedOn: "게시일",
    categoryGuide: "가이드",
    categoryTips: "팁",
    categoryKnowledge: "지식",
  },
  cookie: {
    message: "더 나은 서비스를 위해 쿠키를 사용합니다.",
    accept: "동의",
    decline: "거부",
  },
};

export default ko;
