import { LandingContentData } from "./landing-content";

export const landingContentPt: Record<string, LandingContentData> = {
  pdf: {
    title: "Sobre o ToolPop PDF",
    description:
      "ToolPop PDF é uma suite gratuita de ferramentas PDF baseada em navegador. Mescle, divida, comprima, converta, edite e proteja seus documentos PDF sem carregar arquivos em nenhum servidor — tudo funciona localmente no seu navegador para máxima privacidade e velocidade.",
    sections: [
      {
        heading: "Processamento com Foco em Privacidade",
        text: "Todas as operações com PDF acontecem inteiramente no seu navegador usando WebAssembly e JavaScript. Seus arquivos nunca saem do seu dispositivo, então documentos sensíveis permanecem privados. Nenhuma conta necessária, sem limites de tamanho de arquivo, sem marcas d'água.",
      },
      {
        heading: "Kit de Ferramentas Abrangente",
        text: "Desde tarefas básicas como mesclar e dividir até recursos avançados como redação, assinaturas digitais e conversão PDF/A — ToolPop PDF cobre cada fluxo de trabalho com PDF. Organize páginas, adicione marcas d'água, comprima para email, ou converta entre formatos com alguns cliques.",
      },
    ],
  },
  image: {
    title: "Sobre o ToolPop Image",
    description:
      "ToolPop Image fornece ferramentas gratuitas de edição e conversão de imagens online. Redimensione, corte, comprima, converta formatos, aplique filtros e crie gráficos — tudo processado localmente no seu navegador sem uploads para servidor.",
    sections: [
      {
        heading: "Edite Sem Software",
        text: "Nenhuma necessidade de instalar Photoshop ou GIMP. ToolPop Image lida com tarefas de imagem cotidianas direto no seu navegador — redimensione para redes sociais, corte para dimensões específicas, adicione texto ou marcas d'água, e aplique filtros profissionais instantaneamente.",
      },
      {
        heading: "Conversão de Formatos Fácil",
        text: "Converta entre JPG, PNG, WebP, SVG, HEIC, TIFF, PSD, EPS e mais. Processamento em lote permite converter múltiplos arquivos ao mesmo tempo. Cada conversão preserva qualidade enquanto otimiza tamanho de arquivo.",
      },
    ],
  },
  text: {
    title: "Sobre o ToolPop Text",
    description:
      "ToolPop Text oferece uma coleção de ferramentas gratuitas de manipulação, análise e codificação de texto. Conte palavras, transforme maiúsculas/minúsculas, localize e substitua, gere hashes, formate JSON e mais — tudo executando instantaneamente no seu navegador.",
    sections: [
      {
        heading: "Para Escritores e Desenvolvedores",
        text: "Se você precisa de contagens de palavras para um ensaio, testes regex para código, codificação Base64 para trabalho com API, ou Lorem Ipsum para mockups — ToolPop Text tem uma ferramenta especializada para cada tarefa de texto.",
      },
      {
        heading: "Resultados Instantâneos",
        text: "Cada ferramenta processa texto em tempo real conforme você digita. Sem espera, sem viagens ao servidor. Lide com documentos grandes com facilidade graças ao processamento otimizado no cliente.",
      },
    ],
  },
  converter: {
    title: "Sobre o ToolPop Converter",
    description:
      "ToolPop Converter é um kit de ferramentas gratuito de conversão de unidades e dados. Converta medidas, cores, datas, formatos de dados e unidades CSS instantaneamente no seu navegador. Desde medidas culinárias cotidianas até conversões JSON/YAML focadas em desenvolvedor.",
    sections: [
      {
        heading: "Cada Conversão que Você Precisa",
        text: "Comprimento, peso, temperatura, área, volume, velocidade, pressão, energia — todas conversões de unidades padrão com resultados em tempo real. Mais ferramentas especializadas para formatos de cor, conversões de fuso horário, sistemas de coordenadas e mais.",
      },
      {
        heading: "Ferramentas para Desenvolvedores",
        text: "Converta entre JSON, YAML, CSV, XML, TOML e tipos TypeScript. Minifique CSS, converta entre px/rem/em, e gere utilitários Tailwind. Construído para o fluxo de trabalho de desenvolvimento moderno.",
      },
    ],
  },
  calculator: {
    title: "Sobre o ToolPop Calculator",
    description:
      "ToolPop Calculator fornece calculadoras online gratuitas para matemática, finanças, saúde, estatísticas e tarefas cotidianas. De juros compostos e IMC até operações matriciais e cálculos de subnet — resultados precisos com explicações claras.",
    sections: [
      {
        heading: "Precisão de Nível Profissional",
        text: "Cada calculadora usa fórmulas matemáticas precisas com arredondamento apropriado e manipulação de casos extremos. Calculadoras financeiras considerem períodos de capitalização, calculadoras de saúde usem equações validadas clinicamente, e ferramentas de estatística lidem com distribuições de dados do mundo real.",
      },
      {
        heading: "Para Todos",
        text: "Estudantes podem resolver equações quadráticas e calcular GPA. Profissionais podem analisar ROI e pontos de equilíbrio. Proprietários de casas podem estimar necessidades de tinta, concreto e telhas. Cada calculadora fornece entradas claras, resultados instantâneos e contexto útil.",
      },
    ],
  },
};
