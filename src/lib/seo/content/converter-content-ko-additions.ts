type ToolAdditions = {
  whatIs?: { title: string; description: string };
  whyUse?: { title: string; items: string[] };
  useCases?: { title: string; items: string[] };
  comparison?: { title: string; description: string };
};

export const converterContentKoAdditions: Record<string, ToolAdditions> = {
  length: {
    whatIs: {
      title: "길이 변환기란?",
      description:
        "미터, 킬로미터, 마일, 인치, 피트, 야드, 센티미터 등 다양한 길이 단위를 즉시 변환하는 도구입니다. 수식을 외우거나 직접 계산할 필요 없이 값을 입력하면 모든 단위로 동시에 변환됩니다.\n\n미국과 한국의 단위 체계가 다르기 때문에(인치·피트 vs 미터·센티미터) 국제 문서, 여행, 쇼핑, 스포츠 경기 데이터 해석 등에서 자주 사용됩니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "미터법과 야드파운드법 단위를 한 번에 모두 변환",
        "정밀한 소수점 계산으로 오차 없는 결과 제공",
        "브라우저에서 즉시 처리, 앱 설치 불필요",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "해외 쇼핑몰에서 인치로 표시된 가구 크기를 센티미터로 변환",
        "마라톤 코스 거리(마일)를 킬로미터로 환산",
        "건축 도면의 피트·인치 치수를 미터법으로 변환",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "Google 검색에서 '5 feet to cm'처럼 단위 변환을 직접 검색할 수 있지만 단일 변환만 가능합니다. ToolPop은 입력 즉시 모든 단위로 동시 변환합니다.",
    },
  },
  weight: {
    whatIs: {
      title: "무게 변환기란?",
      description:
        "킬로그램, 그램, 파운드, 온스, 톤 등 다양한 무게 단위를 변환하는 도구입니다. 요리 레시피, 수하물 무게 확인, 의학 자료 해석, 스포츠 기록 비교 등 다양한 상황에서 활용됩니다.\n\n국제 단위와 미국식 단위 간의 변환이 가장 빈번하게 필요한 분야 중 하나입니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "kg, g, lb, oz, 톤 등 주요 무게 단위 동시 변환",
        "소수점 이하 정밀도를 유지한 정확한 계산",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "파운드로 표시된 체중을 킬로그램으로 변환",
        "항공사 수하물 무게 제한(kg) 확인",
        "미국 레시피의 온스 단위를 그램으로 변환",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "계산기 앱의 단위 변환 기능보다 더 많은 단위를 지원하고 동시에 결과를 확인할 수 있습니다. ToolPop은 웹 브라우저에서 즉시 접근 가능합니다.",
    },
  },
  temperature: {
    whatIs: {
      title: "온도 변환기란?",
      description:
        "섭씨(°C), 화씨(°F), 켈빈(K) 온도를 즉시 변환하는 도구입니다. 한국에서는 섭씨를 사용하지만 미국은 화씨, 과학에서는 켈빈을 사용해 변환이 필요한 경우가 많습니다.\n\n해외 날씨 앱 온도 확인, 요리 레시피 오븐 온도 변환, 과학 실험 데이터 처리 등에 활용됩니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "섭씨, 화씨, 켈빈을 한 번에 상호 변환",
        "복잡한 변환 공식 없이 즉시 결과 확인",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "미국 날씨 앱의 화씨 온도를 섭씨로 변환",
        "외국 요리 레시피의 오븐 온도(°F) 변환",
        "과학 실험에서 섭씨와 켈빈 간 변환",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "섭씨-화씨 변환 공식(°F = °C × 9/5 + 32)을 외울 수도 있지만 실수가 생기기 쉽습니다. ToolPop은 자동으로 정확한 변환을 제공합니다.",
    },
  },
  area: {
    whatIs: {
      title: "넓이 변환기란?",
      description:
        "제곱미터, 제곱피트, 평, 에이커, 헥타르 등 다양한 넓이 단위를 변환하는 도구입니다. 부동산, 농업, 건축, 지도 관련 업무에서 특히 자주 사용됩니다.\n\n한국에서는 '평'이 일상적으로 쓰이지만 법적으로는 제곱미터를 사용해야 하므로 변환이 필요합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "평, 제곱미터, 제곱피트, 헥타르 등 다양한 단위 지원",
        "부동산 매물 크기 비교에 활용",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "아파트 평형을 제곱미터로 변환(부동산 거래)",
        "해외 부동산 매물의 제곱피트를 제곱미터로 확인",
        "농지 면적을 에이커에서 헥타르로 변환",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "일반 계산기로는 변환 계수를 직접 적용해야 합니다. ToolPop은 변환 계수를 내장해 오류 없이 즉시 변환합니다.",
    },
  },
  volume: {
    whatIs: {
      title: "부피 변환기란?",
      description:
        "리터, 밀리리터, 갤런, 온스, 컵, 세제곱미터 등 다양한 부피 단위를 변환하는 도구입니다. 요리, 음료, 연료, 화학 실험 등에서 단위 변환이 자주 필요합니다.\n\n특히 미국 레시피에서 컵(cup), 온스(fl oz), 갤런 등의 단위를 사용해 한국 단위로 변환할 때 유용합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "요리, 음료, 연료 등 다양한 부피 단위 지원",
        "미국식 컵·온스 단위를 리터·밀리리터로 변환",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "미국 레시피의 컵, 티스푼 등을 밀리리터로 변환",
        "연료 효율 계산을 위한 갤런-리터 변환",
        "실험실 화학물질 부피 단위 변환",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "요리 앱에도 변환 기능이 있지만 부피 외 다른 단위는 지원하지 않는 경우가 많습니다. ToolPop은 다양한 부피 단위를 한 곳에서 변환합니다.",
    },
  },
  speed: {
    whatIs: {
      title: "속도 변환기란?",
      description:
        "km/h, mph, m/s, knot 등 다양한 속도 단위를 변환하는 도구입니다. 자동차 속도, 항공기 속도, 풍속, 해양 속도 등 다양한 분야에서 단위가 다르게 표현됩니다.\n\n특히 미국 도로 표지판은 마일(mph)로 표시되어 한국 운전자에게 혼란을 줄 수 있습니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "km/h, mph, m/s, knot 등 주요 속도 단위 변환",
        "해외 여행 중 도로 속도 제한 해석에 활용",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "해외 여행 중 mph 속도 제한을 km/h로 변환",
        "항공 속도(knot)를 km/h로 확인",
        "기상 데이터의 풍속 단위 변환",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "스마트폰 GPS 앱은 현재 속도를 표시하지만 단위를 변환하거나 특정 값을 입력해서 변환하기가 불편합니다. ToolPop은 직접 값을 입력해 즉시 변환합니다.",
    },
  },
  time: {
    whatIs: {
      title: "시간 변환기란?",
      description:
        "초, 분, 시간, 일, 주, 월, 년 등 시간 단위를 변환하는 도구입니다. 큰 단위와 작은 단위 간의 변환을 빠르게 처리합니다.\n\n소프트웨어 응답 시간(밀리초), 프로젝트 기간(일·주), 역사적 기간(년·세기) 등 다양한 맥락에서 활용됩니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "밀리초부터 세기까지 모든 시간 단위 지원",
        "여러 단위 동시 변환으로 빠른 비교",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "서버 응답 시간(ms)을 초 단위로 비교",
        "프로젝트 기간(일 수)을 주·월로 환산",
        "역사 기간(년 수)을 세기로 표현",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "손으로 계산할 수 있는 변환이지만(1시간 = 3600초 등) 밀리초와 연 단위를 넘나들 때는 실수가 생기기 쉽습니다. ToolPop은 즉각적인 정확한 변환을 제공합니다.",
    },
  },
  pressure: {
    whatIs: {
      title: "압력 변환기란?",
      description:
        "Pa, kPa, bar, psi, atm, mmHg(Torr) 등 다양한 압력 단위를 변환하는 도구입니다. 공학, 기상학, 의학, 자동차 정비 등에서 각기 다른 압력 단위를 사용합니다.\n\n특히 타이어 공기압(psi/bar), 혈압(mmHg), 날씨 기압(hPa) 등의 변환에 자주 사용됩니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "Pa, bar, psi, atm, mmHg 등 주요 압력 단위 지원",
        "타이어 공기압, 혈압 등 일상적 단위 변환에 활용",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "타이어 공기압(psi)을 bar로 변환",
        "혈압 측정값(mmHg)을 kPa로 변환",
        "기상 기압 데이터(hPa) 단위 해석",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "전문 공학 소프트웨어는 더 많은 단위를 지원하지만 설치가 필요합니다. ToolPop은 일상적인 압력 변환을 브라우저에서 즉시 처리합니다.",
    },
  },
  energy: {
    whatIs: {
      title: "에너지 변환기란?",
      description:
        "줄(J), 킬로줄(kJ), 칼로리(cal), 킬로칼로리(kcal), 킬로와트시(kWh), BTU 등 에너지 단위를 변환하는 도구입니다.\n\n식품 영양 정보의 칼로리, 전기 요금의 kWh, 물리학 실험의 줄 단위 등 다양한 맥락에서 에너지 단위 변환이 필요합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "칼로리, kWh, 줄 등 다양한 에너지 단위 지원",
        "식품 영양 정보와 전기 요금 계산에 활용",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "식품 라벨의 kJ를 kcal로 변환",
        "전기 사용량(kWh)을 다른 에너지 단위로 환산",
        "물리학 문제에서 다양한 에너지 단위 변환",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "영양 앱은 칼로리를 kJ로 변환하지만 다른 에너지 단위는 지원하지 않는 경우가 많습니다. ToolPop은 모든 주요 에너지 단위를 한 곳에서 변환합니다.",
    },
  },
  power: {
    whatIs: {
      title: "전력 변환기란?",
      description:
        "와트(W), 킬로와트(kW), 마력(hp), BTU/h 등 전력 단위를 변환하는 도구입니다. 전자 기기의 소비 전력, 엔진 출력, 에어컨 냉방 능력 등 다양한 상황에서 사용됩니다.\n\n특히 자동차 엔진 출력(마력/kW), 에어컨 용량(BTU), 가전제품 전력 소비(W/kW) 등의 변환에 활용됩니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "W, kW, 마력, BTU/h 등 주요 전력 단위 지원",
        "가전제품 소비 전력과 엔진 출력 비교에 활용",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "자동차 마력(hp)을 킬로와트(kW)로 비교",
        "에어컨 냉방 능력(BTU)을 와트로 환산",
        "태양광 패널 발전량 단위 변환",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "자동차 스펙 비교 사이트에서 마력/kW를 표시하지만 직접 입력해 변환하는 기능은 ToolPop이 더 편리합니다.",
    },
  },
  frequency: {
    whatIs: {
      title: "주파수 변환기란?",
      description:
        "헤르츠(Hz), 킬로헤르츠(kHz), 메가헤르츠(MHz), 기가헤르츠(GHz) 등 주파수 단위를 변환하는 도구입니다.\n\n라디오 주파수, CPU 클럭 속도, 오디오 신호, 전자기파 등 다양한 분야에서 주파수 단위 변환이 필요합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "Hz, kHz, MHz, GHz 동시 변환",
        "CPU 클럭 속도와 라디오 주파수 비교에 활용",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "라디오 방송 주파수(MHz) 단위 확인",
        "CPU 클럭 속도(GHz)를 Hz로 환산",
        "오디오 샘플링 레이트(kHz) 단위 변환",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "주파수 변환은 단순한 10의 거듭제곱 연산이지만 자릿수가 많아 실수가 생기기 쉽습니다. ToolPop은 정확하게 처리합니다.",
    },
  },
  angle: {
    whatIs: {
      title: "각도 변환기란?",
      description:
        "도(°), 라디안(rad), 그라디안(grad) 등 각도 단위를 변환하는 도구입니다. 수학, 물리학, 공학, 그래픽 프로그래밍 등에서 각도 단위 변환이 필요합니다.\n\n특히 프로그래밍에서 삼각 함수는 라디안을 사용하지만 인간은 직관적으로 도(°)를 이해하므로 변환이 필요합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "도, 라디안, 그라디안 즉시 변환",
        "프로그래밍과 수학 계산 지원",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "CSS 회전(deg)을 라디안으로 변환해 JS 계산에 활용",
        "물리학 문제에서 각도 단위 변환",
        "로봇공학, CNC 가공에서 각도 단위 해석",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "도-라디안 변환 공식(rad = deg × π/180)을 외울 수 있지만 ToolPop은 즉시 정확한 변환을 제공합니다.",
    },
  },
  "data-storage": {
    whatIs: {
      title: "데이터 저장 용량 변환기란?",
      description:
        "바이트(B), 킬로바이트(KB), 메가바이트(MB), 기가바이트(GB), 테라바이트(TB) 등 데이터 용량 단위를 변환하는 도구입니다.\n\n파일 크기, 저장 장치 용량, 네트워크 전송량 등을 다룰 때 단위 변환이 필요합니다. 특히 1GB = 1024MB vs 1000MB의 혼란도 정리해 줍니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "B부터 TB까지 모든 데이터 용량 단위 지원",
        "이진(1024) 및 십진(1000) 기준 모두 지원",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "SSD 용량(GB)을 MB로 변환해 파일 수 계산",
        "이메일 첨부 파일 크기 제한 확인",
        "클라우드 저장소 용량 계획",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "운영체제마다 용량 표시 방식(1024 vs 1000 기준)이 달라 혼란이 생깁니다. ToolPop은 두 기준을 모두 명확하게 표시합니다.",
    },
  },
  "fuel-economy": {
    whatIs: {
      title: "연비 변환기란?",
      description:
        "L/100km, km/L, mpg(US), mpg(UK) 등 연비 단위를 변환하는 도구입니다. 한국은 km/L 또는 L/100km를 사용하지만 미국과 영국은 마일/갤런(mpg)을 사용합니다.\n\n해외 자동차 구매, 렌터카 선택, 연료 비용 비교 등에서 연비 단위 변환이 필요합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "L/100km, km/L, mpg 상호 변환",
        "해외 자동차 스펙 비교에 활용",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "미국산 자동차의 mpg 연비를 km/L로 변환",
        "해외 렌터카 연비 비교",
        "유럽 자동차의 L/100km를 km/L로 변환",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "자동차 리뷰 사이트에서 연비를 여러 단위로 표시하기도 하지만 직접 변환하는 기능은 ToolPop이 더 편리합니다.",
    },
  },
  "number-base": {
    whatIs: {
      title: "진법 변환기란?",
      description:
        "2진법(바이너리), 8진법(옥탈), 10진법(십진), 16진법(헥사)을 상호 변환하는 도구입니다. 컴퓨터 과학, 프로그래밍, 디지털 전자공학에서 다양한 진법이 사용됩니다.\n\n색상 코드(16진수 HEX), 메모리 주소, 비트 연산 등을 처리할 때 진법 변환이 필요합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "2진법, 8진법, 10진법, 16진법 동시 표시",
        "색상 코드와 메모리 주소 해석에 활용",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "10진수 색상 값을 16진수 HEX 코드로 변환",
        "바이너리 파일 헤더의 16진수 값 해석",
        "컴퓨터 과학 수업에서 진법 변환 학습",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "프로그래머용 계산기 앱도 진법 변환을 지원하지만 설치가 필요합니다. ToolPop은 브라우저에서 즉시 사용할 수 있습니다.",
    },
  },
  "roman-numeral": {
    whatIs: {
      title: "로마 숫자 변환기란?",
      description:
        "아라비아 숫자(1, 2, 3...)와 로마 숫자(I, II, III...) 사이를 변환하는 도구입니다. 역사 문서, 법적 문서, 시계 눈금, 영화 제작 연도 표기 등에서 로마 숫자가 사용됩니다.\n\nI~M(1~1000)의 기본 단위와 IV, IX 같은 감산법 규칙을 자동으로 처리합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "1~3999까지의 수를 로마 숫자로 즉시 변환",
        "로마 숫자를 아라비아 숫자로 역변환",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "영화 제작 연도의 로마 숫자 해석(예: MMXXIV = 2024)",
        "시계 문자판의 로마 숫자 확인",
        "법률 문서나 학술 논문의 장 번호 표기",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "로마 숫자 규칙을 외우면 직접 변환할 수 있지만 큰 숫자는 실수하기 쉽습니다. ToolPop은 정확한 변환을 즉시 제공합니다.",
    },
  },
  "scientific-notation": {
    whatIs: {
      title: "과학적 표기법 변환기란?",
      description:
        "매우 크거나 작은 수를 1×10^n 형태의 과학적 표기법으로 변환하거나, 반대로 일반 숫자로 표현하는 도구입니다.\n\n물리학, 화학, 천문학에서 극도로 큰 수(빛의 속도, 별까지의 거리)나 작은 수(원자 크기, 전자의 질량)를 표현할 때 사용됩니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "일반 숫자와 과학적 표기법 즉시 상호 변환",
        "공학용 표기법(k, M, G 접두사)도 지원",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "물리학 문제에서 매우 큰 수를 과학적 표기법으로 변환",
        "계산기 출력의 지수 표기를 일반 숫자로 변환",
        "반도체 공정 크기(nm)를 과학적 표기법으로 표현",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "계산기 앱은 결과를 자동으로 과학적 표기법으로 표시하지만, 반대 방향 변환(입력으로 과학적 표기법 사용)은 ToolPop이 더 편리합니다.",
    },
  },
  "fraction-decimal": {
    whatIs: {
      title: "분수·소수 변환기란?",
      description:
        "분수(1/3, 3/4 등)와 소수(0.333..., 0.75 등)를 상호 변환하는 도구입니다. 요리 레시피, 공학 측정, 수학 문제 풀이에서 분수와 소수를 오가는 경우가 많습니다.\n\n0.1+0.2≠0.3 같은 부동소수점 문제 없이 정확한 분수 표현을 제공합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "분수를 소수로, 소수를 분수로 정확하게 변환",
        "기약분수 형태로 자동 정리",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "레시피의 1/3컵을 소수(mL)로 변환",
        "소수 결과를 분수로 표현해 수학 문제 제출",
        "측정값(7/16인치)을 소수로 변환",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "분수 계산기는 계산에 특화되어 있지만 변환만 필요할 때는 ToolPop이 더 간단합니다.",
    },
  },
  percentage: {
    whatIs: {
      title: "퍼센트 변환기란?",
      description:
        "퍼센트(%), 소수(0.75), 분수(3/4) 형태를 상호 변환하는 도구입니다. 세금 계산, 할인율 확인, 성과 지표 분석 등 일상적으로 퍼센트와 다른 형태를 오가는 경우가 많습니다.\n\n25% = 0.25 = 1/4처럼 세 가지 표현 방식의 관계를 명확하게 보여줍니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "%, 소수, 분수를 한 번에 동시 변환",
        "세금, 할인, 이자율 계산에 활용",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "할인율(30%)을 소수로 변환해 계산에 적용",
        "프로그래밍에서 % 값을 0~1 범위의 소수로 변환",
        "통계 데이터의 비율을 퍼센트로 표현",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "계산기 앱에서 % 버튼을 눌러 변환할 수 있지만 분수 표현은 별도로 계산해야 합니다. ToolPop은 세 가지 형태를 동시에 보여줍니다.",
    },
  },
  "color-converter": {
    whatIs: {
      title: "색상 코드 변환기란?",
      description:
        "HEX(#FF5733), RGB(255, 87, 51), HSL(11°, 100%, 60%), HSV, CMYK 등 다양한 색상 코드 형식을 변환하는 도구입니다. 웹 개발, 그래픽 디자인, 인쇄 작업에서 각기 다른 색상 형식을 사용합니다.\n\nCSS에서는 주로 HEX 또는 RGB를 쓰고, 인쇄 디자인에서는 CMYK를 사용하며, Photoshop에서는 HSB/HSV를 선호합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "HEX, RGB, HSL, HSV, CMYK 동시 변환",
        "색상 피커로 직접 색상 선택 가능",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "디자이너가 전달한 HEX 코드를 CSS RGB로 변환",
        "Photoshop의 HSB 값을 웹 CSS 색상으로 변환",
        "인쇄 디자인을 위해 RGB를 CMYK로 변환",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "Photoshop과 Figma에서 색상 코드를 확인할 수 있지만 소프트웨어를 열어야 합니다. ToolPop은 브라우저에서 즉시 변환합니다.",
    },
  },
  "color-palette-generator": {
    whatIs: {
      title: "색상 팔레트 생성기란?",
      description:
        "기본 색상에서 조화로운 색상 팔레트를 자동으로 생성하는 도구입니다. 보색, 유사색, 삼색 배색, 단색 배색 등 색상 이론을 기반으로 잘 어울리는 색상 조합을 제안합니다.\n\n브랜드 아이덴티티, 웹사이트 디자인, UI 컴포넌트 색상 체계를 설계할 때 사용됩니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "보색, 유사색, 삼색 등 다양한 배색 규칙 적용",
        "각 색상의 HEX, RGB, HSL 코드 즉시 복사",
        "브라우저에서 즉시 생성",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "웹사이트 브랜드 색상 체계 설계",
        "UI 컴포넌트의 주색·보조색·강조색 선정",
        "마케팅 자료의 색상 통일성 확보",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "Adobe Color, Coolors 같은 전문 팔레트 도구도 있습니다. ToolPop은 가장 핵심적인 배색 기능을 빠르게 제공합니다.",
    },
  },
  "gradient-generator": {
    whatIs: {
      title: "그라디언트 생성기란?",
      description:
        "두 가지 이상의 색상으로 선형 또는 방사형 그라디언트를 생성하고 CSS 코드를 출력하는 도구입니다. 웹 배경, 버튼, 헤더 등의 시각 효과를 쉽게 만들 수 있습니다.\n\n색상 선택, 방향 설정, 색상 정지점 추가 등을 시각적으로 조작하며 실시간으로 결과를 확인합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "CSS 그라디언트 코드 즉시 생성",
        "선형·방사형·원뿔형 그라디언트 지원",
        "색상 정지점 추가로 복잡한 그라디언트 제작 가능",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "웹사이트 히어로 섹션 그라디언트 배경 제작",
        "버튼 또는 헤더에 세련된 그라디언트 적용",
        "소셜미디어 게시물 배경 이미지 생성",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "CSS 그라디언트 문법을 직접 작성할 수 있지만 색상 값과 방향을 수작업으로 조정하는 것은 번거롭습니다. ToolPop은 시각적으로 조작하며 코드를 자동 생성합니다.",
    },
  },
  "color-contrast-checker": {
    whatIs: {
      title: "색상 대비 검사기란?",
      description:
        "전경색과 배경색의 대비 비율을 계산해 WCAG(웹 콘텐츠 접근성 지침) 기준을 충족하는지 확인하는 도구입니다.\n\n텍스트 가독성과 웹 접근성(AA, AAA 등급)을 보장하는 색상 조합을 검증할 때 사용합니다. 시각 장애인을 포함한 모든 사용자가 콘텐츠를 읽을 수 있도록 하는 법적·윤리적 의무입니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "WCAG AA/AAA 기준 충족 여부 즉시 확인",
        "대비 비율 정확한 수치 제공",
        "다양한 폰트 크기에 대한 기준 분리 표시",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "웹사이트 텍스트-배경 색상의 접근성 검증",
        "브랜드 색상의 WCAG 준수 여부 확인",
        "버튼·링크 색상의 가독성 검토",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "WebAIM Contrast Checker도 동일한 기능을 제공합니다. ToolPop은 색상 변환 기능과 함께 제공해 색상 코드 형식을 변환하면서 즉시 대비를 확인할 수 있습니다.",
    },
  },
  "color-blindness-simulator": {
    whatIs: {
      title: "색맹 시뮬레이터란?",
      description:
        "다양한 유형의 색맹(적녹 색맹, 청황 색맹, 전색맹 등) 상태에서 이미지나 색상이 어떻게 보이는지 시뮬레이션하는 도구입니다.\n\n디자인이 색맹 사용자에게도 구분 가능한지 검증하는 접근성 테스트에 사용됩니다. 전 세계 인구의 약 8%(남성)가 색각 이상을 가지고 있습니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "주요 색맹 유형별 시뮬레이션 제공",
        "이미지나 색상 팔레트를 직접 입력해 확인",
        "접근성을 고려한 디자인 검증에 활용",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "차트·그래프 색상이 색맹 사용자에게 구분되는지 확인",
        "UI 디자인의 색상 접근성 테스트",
        "브랜드 색상 팔레트의 포용성 검증",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "Chrome 개발자 도구에서도 색맹 시뮬레이션을 지원하지만 이미지 파일에는 적용하기 어렵습니다. ToolPop은 이미지와 색상 모두에 즉시 적용합니다.",
    },
  },
  timezone: {
    whatIs: {
      title: "시간대 변환기란?",
      description:
        "세계 여러 도시와 시간대의 현재 시간을 비교하고 특정 시각을 다른 시간대로 변환하는 도구입니다. 서머타임(DST) 적용 여부를 자동으로 반영합니다.\n\n국제 회의, 해외 고객과의 일정 조율, 글로벌 팀 협업 등에서 시간대 변환이 필수입니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "서머타임 자동 반영",
        "여러 도시의 시간을 동시에 비교",
        "특정 시각 입력 후 즉시 변환",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "서울-뉴욕-런던 팀 미팅 시간 조율",
        "해외 제품 출시 시각을 현지 시간으로 확인",
        "해외 여행 중 현지 시간과 한국 시간 비교",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "World Time Buddy도 시간대 비교를 잘 지원하지만 계정 없이 사용하는 데는 제한이 있습니다. ToolPop은 계정 없이 즉시 사용할 수 있습니다.",
    },
  },
  "unix-timestamp": {
    whatIs: {
      title: "Unix 타임스탬프 변환기란?",
      description:
        "Unix 타임스탬프(1970년 1월 1일 자정 UTC로부터의 초 수)를 사람이 읽을 수 있는 날짜·시간으로 변환하거나, 반대로 날짜·시간을 타임스탬프로 변환하는 도구입니다.\n\n서버 로그, 데이터베이스 타임스탬프, API 응답에서 Unix 타임스탬프가 자주 등장합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "Unix 타임스탬프를 즉시 날짜·시간으로 변환",
        "날짜를 Unix 타임스탬프로 역변환",
        "밀리초 타임스탬프도 지원",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "서버 로그의 타임스탬프를 실제 날짜로 해석",
        "API 응답의 created_at 필드 값 확인",
        "쿠키나 세션 만료 시각 계산",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "JavaScript의 new Date(timestamp)로 변환할 수 있지만 개발자가 아닌 경우 ToolPop이 더 편리합니다.",
    },
  },
  "date-format": {
    whatIs: {
      title: "날짜 형식 변환기란?",
      description:
        "다양한 날짜 형식(YYYY-MM-DD, DD/MM/YYYY, MM-DD-YYYY, ISO 8601 등)을 상호 변환하는 도구입니다. 국가·시스템마다 날짜 표기 방식이 달라 혼란이 생기는 경우가 많습니다.\n\n특히 미국식 MM/DD/YYYY와 유럽식 DD/MM/YYYY, 한국식 YYYY년 MM월 DD일의 혼동을 방지합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "주요 날짜 형식 간 즉시 변환",
        "ISO 8601, RFC 2822 등 국제 표준 형식 지원",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "미국 문서의 날짜(03/15/2024)가 3월 15일인지 확인",
        "데이터베이스용 ISO 8601 형식으로 변환",
        "국제 계약서의 날짜 형식 통일",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "날짜 형식 변환은 단순해 보이지만 MM/DD와 DD/MM 혼동으로 인한 오류가 자주 발생합니다. ToolPop은 모호한 날짜도 명확하게 표시합니다.",
    },
  },
  "date-calculator": {
    whatIs: {
      title: "날짜 계산기란?",
      description:
        "두 날짜 사이의 일수, 주수, 월수, 년수를 계산하거나, 특정 날짜에 기간을 더하거나 빼는 도구입니다.\n\n계약 만료일 계산, 프로젝트 기간 산출, 생일·기념일까지의 일수 확인, 나이 계산 등 다양한 용도로 사용됩니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "두 날짜 간 정확한 일수·주수·월수 계산",
        "날짜에 일수를 더하거나 빼서 목표일 계산",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "계약 시작일로부터 1년 만료일 계산",
        "D-Day 카운트다운 계산",
        "업무 일정의 영업일 수 계산",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "달력 앱에서 수동으로 세는 것보다 훨씬 빠릅니다. ToolPop은 윤년과 월별 일수 차이를 자동으로 처리합니다.",
    },
  },
  "age-calculator": {
    whatIs: {
      title: "나이 계산기란?",
      description:
        "생년월일을 입력하면 정확한 나이를 계산하는 도구입니다. 만 나이, 세는 나이, 개월 수, 일수 등 다양한 방식으로 나이를 표현합니다.\n\n한국은 2023년부터 만 나이를 공식 사용하고 있어 만 나이와 세는 나이의 차이를 빠르게 확인할 때 유용합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "만 나이, 세는 나이, 개월 수 동시 계산",
        "다음 생일까지의 일수 표시",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "만 나이와 세는 나이의 차이 즉시 확인",
        "아이의 개월 수 계산(유아 건강 검진 기준)",
        "법적 연령 기준(만 18세, 만 65세 등) 확인",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "스마트폰의 날짜 계산 앱으로도 나이를 구할 수 있지만 만 나이와 세는 나이를 동시에 보여주는 기능은 드뭅니다. ToolPop은 한국 기준을 반영합니다.",
    },
  },
  "json-yaml": {
    whatIs: {
      title: "JSON ↔ YAML 변환기란?",
      description:
        "JSON 데이터를 YAML 형식으로 변환하거나, YAML을 JSON으로 변환하는 도구입니다. 두 형식은 동일한 데이터를 다르게 표현하는 방식으로, 상호 변환이 가능합니다.\n\nYAML은 설정 파일(docker-compose.yml, Kubernetes 등)에 주로 사용되고, JSON은 REST API와 웹 애플리케이션에서 표준으로 사용됩니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "JSON API 응답을 YAML 설정 파일로 변환",
        "YAML 설정을 JSON으로 변환해 코드에서 사용",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "API 명세(JSON)를 YAML로 변환해 Swagger 문서 작성",
        "docker-compose.yml 내용을 JSON으로 분석",
        "CI/CD 설정 파일(YAML)을 JSON으로 변환",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "online-yaml-tools나 jsonformatter.org에서도 변환이 가능하지만 파일을 서버에 업로드하는 경우가 있습니다. ToolPop은 브라우저에서 처리합니다.",
    },
  },
  "json-csv": {
    whatIs: {
      title: "JSON ↔ CSV 변환기란?",
      description:
        "JSON 배열 데이터를 CSV 형식으로 변환하거나, CSV를 JSON으로 변환하는 도구입니다.\n\nAPI에서 받은 JSON 데이터를 Excel에서 열 수 있는 CSV로 내보내거나, 스프레드시트 데이터를 JSON으로 변환해 개발에 활용할 때 사용됩니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "JSON 배열을 헤더 행이 있는 CSV로 변환",
        "CSV를 구조화된 JSON 배열로 변환",
        "브라우저에서 처리 — 민감한 데이터 업로드 불필요",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "API 데이터를 Excel 분석을 위한 CSV로 내보내기",
        "사용자 CSV 데이터를 API 요청용 JSON으로 변환",
        "데이터베이스 내보내기 형식 변환",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "Python이나 Excel에서 JSON-CSV 변환이 가능하지만 코딩이나 플러그인이 필요합니다. ToolPop은 코드 없이 브라우저에서 즉시 처리합니다.",
    },
  },
  "json-xml": {
    whatIs: {
      title: "JSON ↔ XML 변환기란?",
      description:
        "JSON 데이터를 XML 형식으로 변환하거나, XML을 JSON으로 변환하는 도구입니다.\n\nSOAP API는 XML을 사용하고 REST API는 JSON을 사용하기 때문에 두 시스템 간 통합 작업에서 변환이 필요합니다. 또한 레거시 시스템과의 데이터 교환에서도 XML이 여전히 많이 사용됩니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "SOAP API XML 응답을 JSON으로 변환",
        "JSON 데이터를 XML 기반 시스템에 전달",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "레거시 SOAP 서비스의 XML 응답을 JSON으로 파싱",
        "JSON 데이터를 XML 기반 CMS에 가져오기",
        "두 API 형식 간 데이터 구조 비교",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "XML 파싱은 별도 라이브러리(Java: JAXB, Python: lxml)가 필요합니다. ToolPop은 코드 없이 즉시 변환합니다.",
    },
  },
  "json-toml": {
    whatIs: {
      title: "JSON ↔ TOML 변환기란?",
      description:
        "JSON 데이터와 TOML 설정 형식을 상호 변환하는 도구입니다. TOML은 Rust(Cargo.toml), Hugo, Python 패키지(pyproject.toml) 등의 설정 파일로 주로 사용됩니다.\n\nJSON보다 사람이 읽고 쓰기 편리하도록 설계된 설정 언어입니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "JSON 설정을 TOML로 변환해 Cargo.toml 등에 활용",
        "TOML 설정 파일을 JSON으로 변환해 코드에서 처리",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "Rust Cargo.toml 설정을 JSON으로 분석",
        "Hugo 사이트 설정을 TOML에서 JSON으로 변환",
        "pyproject.toml 구조를 JSON으로 확인",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "TOML은 JSON이나 YAML보다 덜 알려져 있어 전용 변환 도구가 적습니다. ToolPop은 TOML 변환을 브라우저에서 즉시 지원합니다.",
    },
  },
  "markdown-html": {
    whatIs: {
      title: "Markdown ↔ HTML 변환기란?",
      description:
        "마크다운 텍스트를 HTML 코드로 변환하거나, HTML을 마크다운으로 변환하는 도구입니다. 마크다운은 블로그, 위키, README 파일에 주로 사용되며 읽기 쉬운 텍스트 형식입니다.\n\n마크다운을 HTML로 변환해 웹 페이지에 삽입하거나, 기존 HTML 콘텐츠를 마크다운 문서로 변환할 때 사용합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "마크다운을 즉시 렌더링된 HTML로 변환",
        "HTML을 깔끔한 마크다운으로 역변환",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "GitHub README.md를 HTML로 변환해 미리보기",
        "CMS에 붙여넣기용 HTML을 마크다운에서 생성",
        "블로그 포스트 마크다운을 HTML 이메일로 변환",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "VS Code의 마크다운 미리보기는 편리하지만 HTML 코드를 직접 얻기 어렵습니다. ToolPop은 HTML 코드를 바로 복사할 수 있습니다.",
    },
  },
  "csv-table": {
    whatIs: {
      title: "CSV를 표로 변환이란?",
      description:
        "CSV 데이터를 시각적인 표(HTML 또는 마크다운 표)로 변환하는 도구입니다. 원시 CSV 데이터를 쉽게 읽을 수 있는 형식으로 시각화합니다.\n\n데이터를 문서나 블로그 게시물에 표로 삽입하거나, CSV 내용을 빠르게 검토할 때 사용합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "CSV를 HTML 또는 마크다운 표로 즉시 변환",
        "헤더 행 자동 인식",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "CSV 데이터를 README.md 표로 변환",
        "스프레드시트 내용을 웹 HTML 표로 게시",
        "데이터 보고서를 마크다운 표로 변환",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "Excel에서 HTML로 저장할 수 있지만 불필요한 스타일이 많이 포함됩니다. ToolPop은 깔끔한 HTML/마크다운 표를 생성합니다.",
    },
  },
  "json-typescript": {
    whatIs: {
      title: "JSON to TypeScript 변환기란?",
      description:
        "JSON 데이터를 분석해 TypeScript 인터페이스(타입 정의)를 자동으로 생성하는 도구입니다.\n\nAPI 응답 JSON에서 TypeScript 타입을 수동으로 작성하는 번거로움을 없애주고, 타입 안전성을 높이는 데 도움이 됩니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "JSON에서 TypeScript 인터페이스 자동 생성",
        "중첩된 객체도 계층적으로 타입 생성",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "REST API 응답 JSON에서 TypeScript 타입 자동 생성",
        "설정 파일 JSON의 타입 정의 생성",
        "외부 API 데이터 모델을 빠르게 타입화",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "quicktype.io도 JSON to TypeScript 변환을 지원하지만 계정 없이 사용하는 데 제한이 있습니다. ToolPop은 계정 없이 즉시 사용합니다.",
    },
  },
  "sql-json": {
    whatIs: {
      title: "SQL ↔ JSON 변환기란?",
      description:
        "SQL CREATE TABLE 문이나 SQL 쿼리 결과를 JSON 형식으로 변환하거나, JSON 데이터를 SQL INSERT 문으로 변환하는 도구입니다.\n\nAPI에서 받은 JSON 데이터를 데이터베이스에 삽입하거나, DB 스키마를 JSON으로 문서화할 때 사용합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "JSON 배열을 SQL INSERT 문으로 변환",
        "SQL 스키마를 JSON 스키마로 변환",
        "브라우저에서 처리 — DB 연결 불필요",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "API JSON 데이터를 DB INSERT 문으로 변환해 시드 데이터 생성",
        "MySQL 테이블 구조를 JSON 스키마로 문서화",
        "CSV 가져오기 전 SQL 형식으로 변환",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "DB 클라이언트 도구에서도 JSON 가져오기를 지원하지만 별도 설치가 필요합니다. ToolPop은 코드 없이 즉시 변환합니다.",
    },
  },
  "px-rem": {
    whatIs: {
      title: "px ↔ rem 변환기란?",
      description:
        "픽셀(px)과 rem 단위를 상호 변환하는 도구입니다. rem은 루트 요소의 폰트 크기를 기준으로 하는 상대적 단위로, 웹 접근성과 반응형 디자인에서 권장됩니다.\n\n기본 폰트 크기(보통 16px)를 기준으로 px을 rem으로 변환합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "기준 폰트 크기 설정 가능(기본 16px)",
        "디자인 px 값을 CSS rem으로 변환",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "Figma 디자인의 px 값을 CSS rem으로 변환",
        "접근성 향상을 위해 px을 rem으로 전환",
        "기존 px 기반 CSS를 rem으로 리팩토링",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "px to rem 변환은 단순 나눗셈(px ÷ 16)이지만, 기준 폰트 크기가 다른 프로젝트에서는 변수가 달라집니다. ToolPop은 기준값을 설정해 정확하게 변환합니다.",
    },
  },
  "px-em": {
    whatIs: {
      title: "px ↔ em 변환기란?",
      description:
        "픽셀(px)과 em 단위를 상호 변환하는 도구입니다. em은 부모 요소의 폰트 크기를 기준으로 하는 상대적 단위입니다.\n\nrem과 달리 em은 컨텍스트(부모 요소)에 따라 실제 크기가 달라지므로 올바른 기준값 설정이 중요합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "부모 요소 폰트 크기 기준으로 정확한 em 변환",
        "디자인 px 값을 CSS em으로 변환",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "컴포넌트 내 상대적 크기를 em으로 설정",
        "Figma 디자인 명세를 CSS em으로 구현",
        "미디어 쿼리 브레이크포인트를 em으로 변환",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "em은 중첩 요소에서 복잡해질 수 있어 rem을 선호하는 경우가 많습니다. ToolPop은 em과 rem 변환을 모두 지원합니다.",
    },
  },
  "px-percent": {
    whatIs: {
      title: "px ↔ % 변환기란?",
      description:
        "픽셀(px) 값과 부모 요소 기준 퍼센트(%) 값을 상호 변환하는 도구입니다.\n\n반응형 레이아웃에서 고정 px 크기 대신 상대적인 % 값을 사용하면 다양한 화면 크기에 유연하게 대응할 수 있습니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "부모 요소 크기 기준으로 정확한 % 변환",
        "반응형 레이아웃 설계에 활용",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "1200px 컨테이너에서 300px 요소의 % 비율 계산",
        "디자인 mockup의 px 값을 유동적인 % 레이아웃으로 변환",
        "반응형 이미지 크기 비율 계산",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "px % 변환은 단순 나눗셈이지만 부모 크기를 항상 기억해야 합니다. ToolPop은 기준 크기를 입력해 빠르게 변환합니다.",
    },
  },
  "css-unit": {
    whatIs: {
      title: "CSS 단위 변환기란?",
      description:
        "px, em, rem, %, vw, vh 등 CSS 단위를 종합적으로 변환하는 도구입니다. 다양한 CSS 단위의 관계를 이해하고 올바른 단위를 선택하는 데 도움을 줍니다.\n\n현재 뷰포트 크기와 루트 폰트 크기를 기준으로 각 단위의 실제 픽셀 값을 계산합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "주요 CSS 단위를 한 화면에서 모두 비교",
        "뷰포트와 폰트 크기 기준값 설정 가능",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "다양한 CSS 단위의 실제 픽셀 값 비교",
        "반응형 디자인에서 적절한 단위 선택",
        "CSS 레이아웃 디버깅",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "브라우저 개발자 도구에서 실시간으로 CSS 단위를 확인할 수 있지만, 다양한 기준값으로 미리 계산하는 기능은 ToolPop이 더 편리합니다.",
    },
  },
  "css-minifier": {
    whatIs: {
      title: "CSS 압축기란?",
      description:
        "CSS 코드에서 공백, 주석, 줄바꿈을 제거해 파일 크기를 줄이는 도구입니다. 압축된 CSS는 기능은 동일하지만 전송 크기가 작아 웹 페이지 로딩 속도를 높입니다.\n\n프로덕션 배포 전 CSS를 수동으로 압축하거나, 빌드 툴이 없는 환경에서 간단하게 최적화할 때 사용합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "CSS 파일 크기를 크게 줄여 로딩 속도 향상",
        "원본 코드 기능과 동작 완전 보존",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "프로덕션 배포용 CSS 파일 압축",
        "이메일 HTML 인라인 CSS 최적화",
        "CDN에 올릴 라이브러리 CSS 최소화",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "webpack, Vite 같은 빌드 툴은 자동으로 CSS를 압축하지만 간단한 작업에 전체 빌드 파이프라인을 설정하는 건 과도합니다. ToolPop은 즉시 압축을 처리합니다.",
    },
  },
  "tailwind-css": {
    whatIs: {
      title: "Tailwind CSS 클래스 변환기란?",
      description:
        "일반 CSS 속성을 Tailwind CSS 유틸리티 클래스로 변환하거나, Tailwind 클래스를 CSS로 변환하는 도구입니다.\n\nTailwind를 처음 배우거나 기존 CSS를 Tailwind로 마이그레이션할 때 어떤 클래스를 사용해야 하는지 빠르게 찾을 수 있습니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "CSS 속성을 Tailwind 유틸리티 클래스로 빠르게 변환",
        "Tailwind 클래스의 실제 CSS 속성 확인",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "기존 CSS 프로젝트를 Tailwind로 마이그레이션 시 클래스 조회",
        "Tailwind를 배우는 중 CSS-클래스 매핑 확인",
        "디자인 명세의 CSS를 Tailwind 클래스로 변환",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "Tailwind 공식 문서에서 클래스를 검색할 수 있지만 변환 방향으로는 ToolPop이 더 빠릅니다.",
    },
  },
  "cooking-measurement": {
    whatIs: {
      title: "요리 계량 변환기란?",
      description:
        "컵, 스푼, 밀리리터, 그램 등 요리에서 사용하는 계량 단위를 변환하는 도구입니다. 특히 미국 요리 레시피에서 사용하는 컵(cup), 테이블스푼(tbsp), 티스푼(tsp)을 밀리리터나 그램으로 변환합니다.\n\n재료별 밀도가 다르므로(물 vs 밀가루 vs 버터) 무게와 부피 변환을 재료에 맞게 처리합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "컵, 테이블스푼, 티스푼을 ml·g으로 변환",
        "재료별 무게-부피 환산 지원",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "미국 베이킹 레시피의 '1 cup'을 그램으로 변환",
        "계량컵 없이 저울로 재료 계량",
        "레시피 인분 수 변경 시 재료 비율 재계산",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "요리 앱에도 변환 기능이 있지만 재료별 밀도를 반영하지 않는 경우가 많습니다. ToolPop은 주요 재료의 밀도를 반영해 정확한 무게를 계산합니다.",
    },
  },
  "recipe-scaler": {
    whatIs: {
      title: "레시피 배수 계산기란?",
      description:
        "레시피의 모든 재료 양을 원하는 인분 수에 맞게 비율로 조정하는 도구입니다. 2인분 레시피를 6인분으로 늘리거나, 10인분 레시피를 4인분으로 줄일 때 사용합니다.\n\n각 재료 양을 직접 계산하는 번거로움 없이 전체를 한 번에 조정합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "원하는 인분 수를 입력하면 모든 재료 자동 조정",
        "소수점 계량값을 실용적인 단위로 반올림",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "집들이나 파티를 위해 레시피를 대량으로 늘리기",
        "1인분 요리를 4인 가족용으로 조정",
        "영업용 레시피를 소량으로 테스트하기 위해 축소",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "레시피 웹사이트에서 인분 조정 기능을 제공하는 경우도 있지만 외부 레시피를 입력하는 기능은 없습니다. ToolPop은 어떤 레시피도 직접 입력해서 조정할 수 있습니다.",
    },
  },
  "oven-temperature": {
    whatIs: {
      title: "오븐 온도 변환기란?",
      description:
        "섭씨(°C), 화씨(°F), 가스 마크(Gas Mark)로 표시된 오븐 온도를 상호 변환하는 도구입니다. 영국과 유럽 요리 레시피는 가스 마크를 사용하고, 미국은 화씨, 한국은 섭씨를 사용합니다.\n\n정확한 오븐 온도 설정으로 베이킹 결과물의 품질을 보장합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "섭씨, 화씨, 가스 마크 동시 변환",
        "해외 베이킹 레시피 활용에 필수",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "미국 레시피의 350°F를 섭씨로 변환",
        "영국 레시피의 가스 마크 4를 섭씨로 확인",
        "에어프라이어 온도를 오븐 레시피에 맞게 조정",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "일반 온도 변환기는 섭씨-화씨만 지원하지만 가스 마크를 포함한 요리 특화 변환은 ToolPop이 더 적합합니다.",
    },
  },
  coordinate: {
    whatIs: {
      title: "좌표 변환기란?",
      description:
        "위도·경도(위경도), UTM, DMS(도·분·초) 등 다양한 지리 좌표 형식을 변환하는 도구입니다. GPS 기기, 지도 API, GIS 소프트웨어마다 다른 좌표 형식을 사용합니다.\n\n현장 조사, 지도 개발, 항법 시스템 등에서 좌표 형식 변환이 필요합니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "DD, DMS, DDM, UTM 등 좌표 형식 변환",
        "지도 API 개발에서 좌표 형식 통일에 활용",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "GPS 기기의 DMS 좌표를 Google Maps 십진수 형식으로 변환",
        "GIS 데이터의 UTM 좌표를 위경도로 변환",
        "군사 지도 좌표를 일반 좌표로 변환",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "전문 GIS 소프트웨어(QGIS, ArcGIS)는 정밀한 좌표 변환을 지원하지만 설치가 필요합니다. ToolPop은 일상적인 좌표 변환을 즉시 처리합니다.",
    },
  },
  "distance-calculator": {
    whatIs: {
      title: "두 지점 간 거리 계산기란?",
      description:
        "두 지점의 좌표(위도·경도)를 입력해 직선 거리를 계산하는 도구입니다. 하버사인 공식을 사용해 지구의 곡률을 반영한 정확한 거리를 계산합니다.\n\n두 도시 간 거리, 드론 비행 반경, 물류 경로 계획 등에 활용됩니다.",
    },
    whyUse: {
      title: "이 도구를 사용하는 이유",
      items: [
        "지구 곡률을 반영한 하버사인 공식으로 정확한 거리 계산",
        "km, 마일, 해리 등 다양한 단위로 결과 표시",
        "브라우저에서 즉시 처리",
      ],
    },
    useCases: {
      title: "주요 활용 사례",
      items: [
        "두 도시 간의 직선 거리 계산",
        "드론 운용 반경 내 포함 여부 확인",
        "배송 권역 설정을 위한 거리 계산",
      ],
    },
    comparison: {
      title: "다른 도구와 비교",
      description:
        "Google Maps에서 두 지점 클릭으로 거리를 측정할 수 있지만 좌표를 직접 입력하는 기능은 ToolPop이 더 편리합니다.",
    },
  },
};
