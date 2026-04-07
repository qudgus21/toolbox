import { LandingContentData } from './landing-content';

export const landingContentZh: Record<string, LandingContentData> = {
  pdf: {
    title: '关于 ToolPop PDF',
    description:
      'ToolPop PDF 是一套免费的基于浏览器的 PDF 工具集。合并、分割、压缩、转换、编辑和保护您的 PDF 文档，无需上传文件到任何服务器——所有操作都在本地浏览器中运行，确保最大的隐私和速度。',
    sections: [
      {
        heading: '隐私优先处理',
        text: '所有 PDF 操作完全在您的浏览器中使用 WebAssembly 和 JavaScript 进行。您的文件不离开您的设备，敏感文档保持私密。无需账户、无文件大小限制、无水印。',
      },
      {
        heading: '全面的工具包',
        text: '从基本操作如合并和分割到高级功能如编辑、数字签名和 PDF/A 转换——ToolPop PDF 覆盖所有 PDF 工作流程。组织页面、添加水印、压缩以供电子邮件发送，或用几次点击转换格式。',
      },
    ],
  },
  image: {
    title: '关于 ToolPop 图像',
    description:
      'ToolPop 图像提供免费在线图像编辑和转换工具。调整大小、裁剪、压缩、转换格式、应用滤镜和创建图形——所有处理都在浏览器中本地进行，无服务器上传。',
    sections: [
      {
        heading: '无需软件编辑',
        text: '无需安装 Photoshop 或 GIMP。ToolPop 图像在浏览器中处理日常图像任务——调整社交媒体大小、按特定尺寸裁剪、添加文本或水印，并立即应用专业滤镜。',
      },
      {
        heading: '轻松格式转换',
        text: '在 JPG、PNG、WebP、SVG、HEIC、TIFF、PSD、EPS 等格式间转换。批量处理可一次转换多个文件。每次转换都在优化文件大小的同时保留质量。',
      },
    ],
  },
  text: {
    title: '关于 ToolPop 文本',
    description:
      'ToolPop 文本提供一系列免费的文本处理、分析和编码工具。计算单词、转换大小写、查找替换、生成哈希、格式化 JSON 等——所有处理都在浏览器中即时进行。',
    sections: [
      {
        heading: '为作家和开发者',
        text: '无论是需要文章字数、代码正则表达式测试、API 工作的 Base64 编码，还是模型设计的 Lorem Ipsum——ToolPop 文本都为每个文本任务提供专门工具。',
      },
      {
        heading: '即时结果',
        text: '每个工具在您键入时实时处理文本。无需等待，无服务器往返。感谢优化的客户端处理，轻松处理大型文档。',
      },
    ],
  },
  converter: {
    title: '关于 ToolPop 转换器',
    description:
      'ToolPop 转换器是一个免费的单位和数据转换工具包。在浏览器中即时转换测量、颜色、日期、数据格式和 CSS 单位。从日常烹饪测量到开发者关注的 JSON/YAML 转换。',
    sections: [
      {
        heading: '您需要的每项转换',
        text: '长度、重量、温度、面积、体积、速度、压力、能量——所有标准单位转换和实时结果。加上颜色格式、时区转换、坐标系统等的专门工具。',
      },
      {
        heading: '开发者工具',
        text: '在 JSON、YAML、CSV、XML、TOML 和 TypeScript 类型间转换。缩小 CSS、转换 px/rem/em，并生成 Tailwind 工具。为现代开发工作流程而构建。',
      },
    ],
  },
  calculator: {
    title: '关于 ToolPop 计算器',
    description:
      'ToolPop 计算器提供免费在线计算器，用于数学、财务、健康、统计和日常任务。从复利和 BMI 到矩阵操作和子网计算——准确结果和清晰的说明。',
    sections: [
      {
        heading: '专业精度',
        text: '每个计算器使用精确的数学公式，进行适当的舍入和边界情况处理。财务计算器考虑复利期，健康计算器使用临床验证的方程，统计工具处理实际数据分布。',
      },
      {
        heading: '适合所有人',
        text: '学生可解二次方程并计算 GPA。专业人士可分析 ROI 和盈亏平衡点。房主可估计油漆、混凝土和瓷砖需求。每个计算器提供清晰的输入、即时结果和有帮助的背景。',
      },
    ],
  },
};
