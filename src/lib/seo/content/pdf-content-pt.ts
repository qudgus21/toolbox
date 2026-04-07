import type { ToolContentMap } from "../tool-content-types";

export const pdfContentPt: ToolContentMap = {
  merge: {
    howTo: {
      title: "Como Mesclar Arquivos PDF",
      steps: [
        "Clique em \"Selecionar Arquivos\" ou arraste e solte vários arquivos PDF na área de upload.",
        "Organize os arquivos na ordem desejada arrastando-os.",
        "Clique no botão \"Mesclar\" para combinar todos os arquivos em um PDF.",
        "Baixe seu arquivo PDF mesclado — está pronto para usar.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Combine arquivos PDF ilimitados em um único documento",
        "Reordenamento por arrasta-e-solta para controle preciso sobre a sequência de páginas",
        "Visualização de miniaturas antes de mesclar para verificar o conteúdo",
        "Mantém a qualidade original — sem compressão ou perda de qualidade",
        "Funciona completamente no seu navegador — os arquivos nunca saem do seu dispositivo",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Ordene arquivos por nome ou tamanho usando os botões da barra de ferramentas para organização rápida",
        "Arquivos grandes podem levar um momento para processar — um indicador de progresso o mantará informado",
        "O arquivo mesclado preserva marcadores, links e campos de formulário dos documentos originais",
      ],
    },
    faq: [
      { question: "É seguro mesclar PDFs online?", answer: "Sim. ToolPop processa tudo no seu navegador usando JavaScript. Seus arquivos nunca saem do seu dispositivo e nunca são carregados em nenhum servidor." },
      { question: "Quantos PDFs posso mesclar de uma vez?", answer: "Não há limite. Você pode mesclar quantos arquivos PDF seu navegador consiga lidar." },
      { question: "A mesclagem afetará a qualidade?", answer: "Não. A qualidade original de cada PDF é totalmente preservada durante o processo de mesclagem." },
    ],
  },
  split: {
    howTo: {
      title: "Como Dividir um PDF",
      steps: [
        "Carregue um arquivo PDF clicando em \"Selecionar Arquivo\" ou arrastando-o para a área.",
        "Escolha um método de divisão: por intervalo de páginas, extrair páginas específicas, ou dividir em intervalos fixos.",
        "Configure seus intervalos ou números de página desejados.",
        "Clique em \"Dividir\" para criar arquivos PDF separados, depois baixe-os.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Divida por intervalos de páginas personalizados (por exemplo, páginas 1–5, 10–15)",
        "Extraia páginas individuais em arquivos separados",
        "Divida em chunks de tamanho igual (cada N páginas)",
        "Miniaturas de página visual para fácil seleção",
        "Opção para mesclar intervalos selecionados em um arquivo de saída",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use a entrada de intervalo para especificar múltiplos intervalos separados por vírgulas",
        "Clique nas miniaturas de página para selecionar ou desselecionar rapidamente páginas",
        "A opção \"Extrair Todos\" cria um arquivo por página — útil para arquivamento",
      ],
    },
    faq: [
      { question: "Posso extrair uma única página de um PDF?", answer: "Sim. Simplesmente digite o número da página ou use as miniaturas visuais para selecionar e extrair páginas individuais." },
      { question: "A divisão reduz a qualidade do PDF?", answer: "Não. A divisão cria novos PDFs com a mesma qualidade do documento original." },
      { question: "O que acontece se eu especificar intervalos de páginas sobrepostos?", answer: "As páginas em intervalos sobrepostos aparecem em múltiplos arquivos de saída, permitindo que você organize o conteúdo de forma flexível." },
    ],
  },
  compress: {
    howTo: {
      title: "Como Comprimir um PDF",
      steps: [
        "Carregue um arquivo PDF que você deseja tornar menor.",
        "Escolha um nível de compressão: Máximo (menor arquivo), Recomendado (equilibrado), ou Mínimo (melhor qualidade).",
        "Selecione um modo de compressão — baseado em imagens ou rasterizar.",
        "Clique em \"Comprimir\" e baixe seu arquivo PDF menor.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Três níveis de compressão para equilibrar tamanho e qualidade",
        "Otimização de imagem reduz tamanhos de imagens incorporadas",
        "Mostra tamanhos de arquivo antes e depois com redução de porcentagem",
        "Modo rasterizar para compressão máxima quando a qualidade do texto é menos crítica",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "O nível \"Recomendado\" funciona melhor para a maioria dos documentos, reduzindo o tamanho em 40–70%",
        "Para PDFs com muitas fotos, a compressão \"Máxima\" pode reduzir dramaticamente o tamanho do arquivo",
        "Use compressão \"Mínima\" quando você precisa preservar a nitidez da imagem para impressão",
      ],
    },
    faq: [
      { question: "Quão menor meu PDF será após a compressão?", answer: "Tipicamente 40-70% menor com o nível Recomendado, dependendo do conteúdo do arquivo original e do método de compressão." },
      { question: "A compressão é feita localmente no meu dispositivo?", answer: "Sim. Toda a compressão acontece no seu navegador sem dados enviados para servidores, mantendo seus documentos completamente privados." },
      { question: "Posso recuperar a qualidade após comprimir com o nível Máximo?", answer: "Não. A compressão máxima é permanente. Se tiver dúvida, use o nível Recomendado primeiro para testar a qualidade." },
    ],
  },
  "pdf-to-jpg": {
    howTo: {
      title: "Como Converter PDF para JPG",
      steps: [
        "Carregue um ou mais arquivos PDF para converter.",
        "Selecione a qualidade de saída: Alta (300 DPI), Média (150 DPI), ou Baixa (72 DPI).",
        "Clique em \"Converter\" para transformar cada página do PDF em uma imagem JPG.",
        "Baixe imagens individuais ou todas as imagens como um arquivo ZIP.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Converta cada página de um PDF em uma imagem JPG de alta qualidade",
        "Três predefinições de qualidade para equilibrar clareza de imagem e tamanho de arquivo",
        "Processamento em lote — converta múltiplos PDFs de uma vez",
        "Baixe páginas individuais ou todas as páginas em um único arquivo ZIP",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use qualidade \"Alta\" para impressão ou apresentações profissionais",
        "Escolha \"Média\" para uso na web — boa qualidade com tamanhos de arquivo razoáveis",
        "Qualidade \"Baixa\" é perfeita para miniaturas ou visualizações rápidas",
      ],
    },
    faq: [
      { question: "Posso converter uma única página em vez do PDF inteiro?", answer: "Sim. Selecione páginas específicas durante a conversão ou use a opção de intervalo de páginas para converter apenas as páginas necessárias." },
      { question: "Meus PDFs são armazenados após a conversão?", answer: "Não. Toda a conversão acontece no seu navegador e os arquivos são deletados imediatamente após o download." },
      { question: "Qual é a diferença entre qualidade Alta, Média e Baixa?", answer: "Diferem em DPI (300, 150 e 72 respectivamente) e tamanho de arquivo. Alta é melhor para impressão, Média para web, Baixa para visualizações." },
    ],
  },
  "jpg-to-pdf": {
    howTo: {
      title: "Como Converter JPG para PDF",
      steps: [
        "Carregue uma ou mais imagens JPG clicando ou arrastando.",
        "Escolha tamanho de página, orientação e configurações de margem.",
        "Organize as imagens em sua ordem preferida arrastando.",
        "Clique em \"Converter\" para criar seu PDF, depois baixe-o.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Converta uma ou múltiplas imagens JPG em um PDF",
        "Escolha entre tamanhos de página padrão (A4, Letter, Legal) ou ajuste à imagem",
        "Margens ajustáveis e orientação (retrato/paisagem)",
        "Opção para criar um PDF por imagem ou mesclar todos em um documento",
        "Reordenamento de imagens por arrasta-e-solta",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use tamanho de página \"Ajustar à Imagem\" para evitar corte ou bordas brancas",
        "Para álbuns de fotos, use \"Mesclar todos\" para criar um PDF com todas as imagens",
        "Ajuste margens para zero para impressão de borda a borda",
      ],
    },
    faq: [
      { question: "Posso converter outros formatos de imagem além de JPG?", answer: "Sim. Esta ferramenta suporta JPG, PNG, GIF, BMP, WebP e outros formatos de imagem comuns." },
      { question: "Como faço para evitar bordas brancas ao converter imagens?", answer: "Use a opção de tamanho de página \"Ajustar à Imagem\" para ajustar automaticamente a página às dimensões da imagem." },
      { question: "Meus dados de imagem são seguros durante a conversão?", answer: "Absolutamente. Toda a conversão acontece localmente no seu navegador sem uploads para servidores externos." },
    ],
  },
  rotate: {
    howTo: {
      title: "Como Girar Páginas de PDF",
      steps: [
        "Carregue um arquivo PDF com páginas que precisam de rotação.",
        "Clique nos botões de rotação nas miniaturas de páginas individuais para girá-las.",
        "Use \"Girar Tudo\" para aplicar a mesma rotação a cada página de uma vez.",
        "Clique em \"Girar\" para aplicar as alterações e baixe o PDF corrigido.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Gire páginas individuais no sentido horário ou anti-horário por 90°",
        "Gire todas as páginas de uma vez com um único clique",
        "Miniaturas de página visual mostram alterações de rotação em tempo real",
        "Redefina todas as rotações para começar de novo se necessário",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Documentos digitalizados frequentemente têm páginas em orientações mistas — corrija todas de uma vez",
        "Use rotação de página individual para documentos com páginas retrato e paisagem",
        "A rotação é permanente e mantida ao imprimir ou compartilhar o PDF",
      ],
    },
    faq: [
      { question: "Posso girar páginas em graus diferentes de 90°?", answer: "Esta ferramenta gira em incrementos de 90°. Para rotações de ângulo personalizado, considere usar a ferramenta de edição." },
      { question: "Girar afetará o tamanho do arquivo?", answer: "Não. A rotação de página é uma alteração de metadados que não altera o conteúdo ou tamanho do arquivo." },
      { question: "Posso desfazer rotações após baixar?", answer: "Sim. Simplesmente reabra o PDF nesta ferramenta e gire as páginas de volta à sua orientação original." },
    ],
  },
  "edit-pdf": {
    howTo: {
      title: "Como Editar um PDF",
      steps: [
        "Carregue o PDF que você deseja editar.",
        "Selecione uma ferramenta da barra de ferramentas: texto, imagem, formas ou desenho.",
        "Clique na página para colocar seu elemento, depois personalize suas propriedades.",
        "Navegue entre páginas e adicione elementos conforme necessário.",
        "Clique em \"Aplicar\" para salvar todas as alterações e baixe o PDF editado.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Adicione texto com fonte, tamanho, cor e alinhamento personalizáveis",
        "Insira imagens do seu dispositivo em qualquer lugar da página",
        "Desenhe linhas livres, retângulos, elipses e linhas retas",
        "Adicione símbolos como marcas de seleção, cruzetas, estrelas e setas",
        "Controle de camadas — leve elementos para frente ou envie para trás",
        "Edição multi-página com fácil navegação entre páginas",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use controles de zoom para trabalhar em detalhes finos com precisão",
        "Clique duas vezes em um elemento de texto para editar seu conteúdo após colocá-lo",
        "Use Ctrl+Z (Cmd+Z no Mac) para desfazer qualquer erro instantaneamente",
        "Símbolos como marcas de seleção são perfeitos para preencher campos de formulário",
      ],
    },
    faq: [
      { question: "Posso editar o texto original no PDF?", answer: "Esta ferramenta adiciona novos elementos em vez de editar texto existente. Para editar conteúdo original, exporte para Word e edite lá." },
      { question: "Meu PDF editado é armazenado ou compartilhado?", answer: "Não. Tudo acontece no seu navegador. Seu PDF é processado localmente e nunca armazenado em nenhum servidor." },
      { question: "Quantos elementos posso adicionar a uma única página?", answer: "Não há limite prático, embora adicionar muitos elementos possa retardar o editor. Mantenha seu documento leve para melhor desempenho." },
    ],
  },
  watermark: {
    howTo: {
      title: "Como Adicionar Marca d'Água a um PDF",
      steps: [
        "Carregue o PDF que você deseja marcar com marca d'água.",
        "Escolha entre marca d'água de texto ou imagem.",
        "Personalize a marca d'água: defina texto/imagem, opacidade, posição, rotação e tamanho.",
        "Selecione quais páginas aplicar a marca d'água (todas ou intervalo personalizado).",
        "Clique em \"Adicionar Marca d'Água\" e baixe o PDF com marca d'água.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Marcas d'água de texto com fonte, tamanho, cor e sombra personalizáveis",
        "Marcas d'água de imagem com escala e opacidade ajustáveis",
        "Nove opções de posição (cantos, bordas e centro)",
        "Padrão de mosaico/telha para cobrir a página inteira",
        "Controle de camadas — coloque marca d'água acima ou abaixo do conteúdo",
        "Seleção de intervalo de páginas personalizado",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Defina opacidade para 20–30% para uma marca d'água sutil que não obscureça o conteúdo",
        "Use a opção mosaico/telha para cobertura de página inteira em documentos confidenciais",
        "Uma rotação diagonal (tipicamente 45°) torna as marcas d'água mais difíceis de remover",
        "Coloque marcas d'água \"abaixo do conteúdo\" para que o texto permaneça totalmente legível",
      ],
    },
    faq: [
      { question: "Posso adicionar diferentes marcas d'água em diferentes páginas?", answer: "Atualmente, a mesma marca d'água se aplica às páginas selecionadas. Para diferentes marcas d'água, processe o PDF várias vezes." },
      { question: "A marca d'água será impressa quando alguém imprimir o PDF?", answer: "Sim. As marcas d'água são incorporadas no PDF e aparecerão em exibição digital e cópias impressas." },
      { question: "Posso remover uma marca d'água que adicionei?", answer: "Não. Uma vez adicionada, as marcas d'água são permanentes. Sempre mantenha um backup do seu PDF original antes de adicionar marca d'água." },
    ],
  },
  protect: {
    howTo: {
      title: "Como Proteger um PDF com Senha",
      steps: [
        "Carregue o PDF que você deseja proteger.",
        "Digite uma senha e confirme-a.",
        "Opcionalmente, configure permissões avançadas (impressão, cópia, edição).",
        "Clique em \"Proteger\" para criptografar o PDF com sua senha.",
        "Baixe o arquivo protegido — os destinatários precisarão da senha para abri-lo.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Criptografia AES-256 para segurança forte",
        "Indicador de força de senha (fraca, média, forte)",
        "Controles de permissão granular para impressão, cópia e modificação",
        "Permissões separadas para impressão de baixa e alta resolução",
        "Preenchimento de formulário e controles de permissão de acessibilidade",
        "Toda criptografia acontece no seu navegador — sua senha nunca sai do seu dispositivo",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use uma senha forte com caracteres mistos para segurança máxima",
        "Restrinja a permissão \"cópia\" para evitar extração de texto do documento",
        "Permita \"impressão de baixa resolução\" apenas se quiser impedir reproduções de alta qualidade",
        "Lembre-se de sua senha — não há opção de recuperação para arquivos criptografados",
      ],
    },
    faq: [
      { question: "Quão forte é a criptografia AES-256?", answer: "AES-256 é criptografia de nível militar e considerada praticamente inquebrável com a tecnologia atual." },
      { question: "E se eu esquecer a senha do meu PDF protegido?", answer: "Não há opção de recuperação de senha. A criptografia é permanente, então proteja sua senha com cuidado." },
      { question: "Usuários restritos ainda podem imprimir o documento mesmo se a impressão estiver desabilitada?", answer: "Não. Quando a impressão é restrita, o leitor de PDF impedirá tentativas de impressão independentemente das tentativas do usuário." },
    ],
  },
  "delete-pages": {
    howTo: {
      title: "Como Deletar Páginas de um PDF",
      steps: [
        "Carregue um arquivo PDF contendo páginas que você deseja remover.",
        "Clique nas miniaturas de página para selecionar as páginas que deseja deletar.",
        "Use botões de seleção rápida: selecionar tudo, páginas ímpares, páginas pares, ou desselecionar tudo.",
        "Clique em \"Deletar\" para remover páginas selecionadas e baixe o resultado.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Miniaturas de página visual para identificação fácil",
        "Multi-seleção com clique — escolha exatamente quais páginas remover",
        "Opções de seleção rápida para páginas ímpares, pares ou todas as páginas",
        "Contador em tempo real mostrando quantas páginas serão deletadas vs. mantidas",
        "Verificação de segurança impede que você delete todas as páginas acidentalmente",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use \"Selecionar Páginas Pares\" para remover rapidamente o verso em branco de digitalizações frente-verso",
        "Visualize cada miniatura com cuidado antes de deletar para evitar remover páginas erradas",
        "Se precisar manter apenas algumas páginas, considere usar \"Extrair Páginas\" — é mais rápido",
      ],
    },
    faq: [
      { question: "Posso desfazer a deletação de página se cometi um erro?", answer: "Não. A deletação de página é permanente. Mantenha um backup do seu PDF original ou baixe-o novamente antes de deletar páginas." },
      { question: "Há um limite para quantas páginas posso deletar de uma vez?", answer: "Não. Você pode deletar quantas páginas precisar de qualquer tamanho de PDF que seu navegador consiga lidar." },
      { question: "Deletar páginas afetará significativamente o tamanho do arquivo?", answer: "Sim. Remover páginas reduz o tamanho do arquivo proporcionalmente ao número de páginas deletadas." },
    ],
  },
  "extract-images": {
    howTo: {
      title: "Como Extrair Imagens de um PDF",
      steps: [
        "Carregue um arquivo PDF contendo imagens.",
        "Visualize todas as imagens encontradas no PDF com miniaturas.",
        "Selecione as imagens que você deseja extrair ou clique em \"Selecionar Todas\".",
        "Escolha o formato de saída (JPG, PNG, ou WebP) e clique em \"Extrair\".",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Extraia todas as imagens de um PDF em segundos",
        "Múltiplos formatos de saída: JPG, PNG e WebP",
        "Visualização de miniaturas antes da extração",
        "Baixe imagens individuais ou todas como um arquivo ZIP",
        "Preserva a qualidade original da imagem",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "O formato PNG preserva transparência se presente nas imagens originais",
        "Use formato WebP para uso na web — tamanhos de arquivo menores com alta qualidade",
        "Extraia em lote múltiplos PDFs para economizar tempo",
      ],
    },
    faq: [
      { question: "A extração de imagem reduzirá a qualidade das imagens?", answer: "Não. A extração preserva a qualidade original das imagens como aparecem no PDF." },
      { question: "Posso extrair imagens sem carregá-las em um servidor?", answer: "Sim. Toda a extração de imagem acontece localmente no seu navegador sem dados enviados para servidor externo." },
      { question: "E se meu PDF tiver imagens de baixa qualidade?", answer: "As imagens extraídas terão a mesma qualidade do PDF original. A extração não pode melhorar a qualidade." },
    ],
  },
  "pdf-to-png": {
    howTo: {
      title: "Como Converter PDF para PNG",
      steps: [
        "Carregue seu arquivo PDF para converter.",
        "Selecione qualidade de resolução: Alta (300 DPI), Média (150 DPI), ou Baixa (72 DPI).",
        "Clique em \"Converter\" para transformar cada página do PDF em uma imagem PNG.",
        "Baixe arquivos PNG individuais ou todos como um arquivo ZIP.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Converta todas as páginas do PDF em imagens PNG sem perdas",
        "Três opções de resolução para diferentes casos de uso",
        "Preserva transparência para imagens com canais alfa",
        "Conversão em lote de múltiplos PDFs de uma vez",
        "Todas as imagens disponíveis como download em ZIP",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "PNG é ideal quando você precisa de qualidade sem perdas e suporte a transparência",
        "Use resolução \"Alta\" para impressão e fins de arquivamento",
        "Escolha resolução \"Baixa\" para miniaturas web e visualizações",
      ],
    },
    faq: [
      { question: "Por que escolher PNG em vez de JPG para conversão de PDF?", answer: "PNG é sem perdas e preserva perfeita qualidade e transparência, enquanto JPG usa compressão que pode reduzir a qualidade." },
      { question: "O processamento de conversão é feito em seus servidores?", answer: "Não. Toda a conversão acontece inteiramente no seu navegador. Seus PDFs nunca são enviados para nenhum servidor." },
      { question: "Posso converter apenas páginas específicas em vez do PDF inteiro?", answer: "Sim. Você pode selecionar intervalos de páginas específicos durante a conversão para extrair apenas as páginas necessárias." },
    ],
  },
  "pdf-to-text": {
    howTo: {
      title: "Como Extrair Texto de um PDF",
      steps: [
        "Carregue um arquivo PDF com conteúdo de texto.",
        "Escolha o método de extração: copiar para área de transferência, baixar como TXT, ou visualizar no editor.",
        "Opcionalmente, selecione páginas específicas ou um intervalo de páginas.",
        "Clique em \"Extrair\" para obter seu arquivo de texto plano.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Extraia todo o texto de qualquer documento PDF",
        "Suporte para extração multi-página com seleção de intervalo de páginas",
        "Baixe como arquivo de texto plano (.txt)",
        "Copie o texto extraído diretamente para a área de transferência",
        "Preserva a estrutura e formatação do texto",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Para PDFs digitalizados sem texto selecionável, use a ferramenta OCR",
        "A extração de texto funciona melhor com PDFs digitais criados de processadores de palavras",
        "Use seleção de intervalo de páginas para extrair apenas o conteúdo necessário",
      ],
    },
    faq: [
      { question: "Por que não posso extrair texto do meu PDF digitalizado?", answer: "PDFs digitalizados são imagens sem texto selecionável. Use a ferramenta OCR para extrair texto de documentos digitalizados." },
      { question: "Posso pesquisar o texto extraído após baixar?", answer: "Sim. O arquivo TXT extraído é um documento de texto plano que você pode abrir em qualquer editor de texto e pesquisar normalmente." },
      { question: "Meu texto é mantido privado durante a extração?", answer: "Absolutamente. A extração de texto acontece completamente no seu navegador sem dados transmitidos para servidores externos." },
    ],
  },
  "html-to-pdf": {
    howTo: {
      title: "Como Converter HTML para PDF",
      steps: [
        "Cole seu código HTML no editor ou carregue um arquivo HTML.",
        "Visualize seu documento na área de visualização ao vivo.",
        "Configure tamanho de página, margens e orientação.",
        "Clique em \"Converter\" para gerar seu PDF.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Converta código HTML diretamente em documentos PDF profissionais",
        "Suporte para estilo CSS e imagens incorporadas",
        "Visualização ao vivo de seu PDF antes da conversão",
        "Tamanhos de página personalizáveis (A4, Letter, etc.) e margens",
        "Mantém estrutura e formatação HTML",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Teste seu HTML no painel de visualização antes de converter",
        "Recursos externos devem ser incorporados como URLs de dados para segurança",
        "Use CSS de impressão de mídia para melhor estilo específico de PDF",
      ],
    },
    faq: [
      { question: "Posso usar estilo CSS em minha conversão de HTML para PDF?", answer: "Sim. CSS padrão é suportado. Para melhores resultados, use CSS específico de impressão (@media print) para otimizar o layout do PDF." },
      { question: "E se imagens externas não carreguem no meu HTML?", answer: "Incorpore imagens como URLs de dados base64 em vez de URLs externas para segurança e confiabilidade na conversão de PDF." },
      { question: "Meu código HTML é armazenado ou compartilhado durante a conversão?", answer: "Não. Seu HTML é processado inteiramente no seu navegador e nunca é enviado para nenhum servidor." },
    ],
  },
  "png-to-pdf": {
    howTo: {
      title: "Como Converter PNG para PDF",
      steps: [
        "Carregue uma ou mais imagens PNG.",
        "Organize as imagens em sua ordem desejada arrastando.",
        "Selecione tamanho de página, orientação e margens.",
        "Clique em \"Converter\" para criar seu PDF e baixe-o.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Converta imagens PNG em PDF com suporte total a transparência",
        "Mescle múltiplas PNGs em um único PDF",
        "Escolha tamanhos de página padrão ou dimensionamento ajustado à imagem",
        "Configurações de margem e orientação ajustáveis",
        "Preserva a qualidade da imagem sem compressão",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "PNGs com transparência serão preservados no PDF",
        "Use \"Ajustar à Imagem\" para evitar corte indesejado",
        "Defina margens para zero para saída sem bordas",
      ],
    },
    faq: [
      { question: "Converter PNG para PDF reduz a qualidade da imagem?", answer: "Não. A qualidade PNG é totalmente preservada, pois PNG já é sem perdas e a conversão mantém todo detalhe." },
      { question: "Áreas transparentes no meu PNG permanecerão transparentes no PDF?", answer: "PDFs não suportam verdadeira transparência como PNGs. Áreas transparentes serão tipicamente convertidas para branco ou cor de fundo escolhida." },
      { question: "A conversão é feita com segurança no meu navegador?", answer: "Sim. Todas as conversões acontecem localmente no seu navegador sem transmissão de dados para servidores externos." },
    ],
  },
  "image-to-pdf": {
    howTo: {
      title: "Como Converter Imagem para PDF",
      steps: [
        "Carregue arquivos de imagem em qualquer formato (JPG, PNG, GIF, WebP, etc.).",
        "Arraste para reordenar imagens ou use ações rápidas.",
        "Defina tamanho de página, orientação e margens.",
        "Clique em \"Converter\" para criar seu PDF.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Converta qualquer formato de imagem em PDF",
        "Suporte para JPG, PNG, GIF, WebP, BMP e mais",
        "Multi-imagem em um único PDF ou um PDF por imagem",
        "Opções de layout de página flexíveis",
        "Preserva a qualidade da imagem na saída",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Para coleções de fotos, mescle todas as imagens em um PDF",
        "Ajuste margens com base em seus requisitos de impressão",
        "Processe em lote múltiplas imagens em uma operação",
      ],
    },
    faq: [
      { question: "Quais formatos de imagem são suportados?", answer: "JPG, PNG, GIF, WebP, BMP, TIFF e a maioria dos formatos de imagem comuns são suportados." },
      { question: "Posso criar um PDF por imagem em vez de mesclar tudo em um?", answer: "Sim. Selecione a opção para criar PDFs separados durante a conversão para obter arquivos PDF individuais." },
      { question: "Meus dados de imagem são seguros durante o processo de conversão?", answer: "Absolutamente. Todo o processamento de imagem acontece no seu navegador sem uploads para nenhum servidor externo." },
    ],
  },
  "webp-to-pdf": {
    howTo: {
      title: "Como Converter WebP para PDF",
      steps: [
        "Carregue um ou mais arquivos de imagem WebP.",
        "Visualize suas imagens no editor.",
        "Configure configurações de página PDF (tamanho, margens, orientação).",
        "Clique em \"Converter\" para gerar seu arquivo PDF.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Converta imagens de formato WebP moderno em PDF",
        "Processamento em lote para múltiplos arquivos WebP",
        "Mantém transparência e qualidade WebP",
        "Configurações de layout de página personalizáveis",
        "Conversão rápida com compressão ideal",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Imagens WebP são menores que JPEG — ideais para conteúdo otimizado para web",
        "Transparência em arquivos WebP é preservada no PDF resultante",
        "Combine múltiplas imagens WebP em um único documento",
      ],
    },
    faq: [
      { question: "Por que escolher imagens WebP para conversão em PDF?", answer: "WebP é um formato moderno que oferece melhor compressão que JPEG mantendo qualidade, resultando em tamanhos de arquivo menores." },
      { question: "A transparência de arquivos WebP será mantida no PDF?", answer: "PDFs não suportam verdadeira transparência. Áreas transparentes serão convertidas para cor de fundo sólida." },
      { question: "Posso converter em lote múltiplos arquivos WebP de uma vez?", answer: "Sim. Você pode carregar e converter múltiplos arquivos WebP em uma operação, como PDFs separados ou mesclados em um." },
    ],
  },
  "tiff-to-pdf": {
    howTo: {
      title: "Como Converter TIFF para PDF",
      steps: [
        "Carregue seu arquivo TIFF (único ou multi-página).",
        "Visualize o conteúdo e miniaturas de página.",
        "Opcionalmente, selecione páginas específicas para incluir.",
        "Clique em \"Converter\" para criar seu PDF.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Converta imagens TIFF em PDF pesquisável",
        "Lide com arquivos TIFF de uma única página e múltiplas páginas",
        "Suporte para diferentes formatos de compressão TIFF",
        "Seleção e reordenação de páginas",
        "Saída de alta qualidade adequada para arquivamento",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "TIFF é comumente usado para documentos digitalizados — converta para PDF para melhor distribuição",
        "TIFFs multi-página são automaticamente convertidos para PDF único",
        "Use para fluxos de trabalho de digitalização de arquivamento para criar arquivos PDF",
      ],
    },
    faq: [
      { question: "Qual é a diferença entre arquivos TIFF de uma página e múltiplas páginas?", answer: "TIFF de uma página contém uma imagem, enquanto TIFF multi-página contém múltiplas imagens em um arquivo (comum para documentos digitalizados)." },
      { question: "Posso selecionar páginas específicas de um TIFF multi-página para converter?", answer: "Sim. Você pode visualizar todas as páginas e selecionar páginas específicas para incluir no PDF resultante." },
      { question: "A conversão é realizada com segurança no meu navegador?", answer: "Sim. Toda a conversão TIFF para PDF acontece inteiramente no seu navegador sem uploads para servidor." },
    ],
  },
  "heic-to-pdf": {
    howTo: {
      title: "Como Converter HEIC para PDF",
      steps: [
        "Carregue arquivos de imagem HEIC do seu dispositivo.",
        "Organize múltiplas imagens em sua ordem preferida.",
        "Selecione tamanho de página e configurações de margem.",
        "Clique em \"Converter\" para criar seu PDF.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Converta imagens de formato Apple HEIC/HEIF em PDF",
        "Suporte para conversão multi-imagem",
        "Preserva qualidade de imagem e transparência",
        "Layout de página personalizável e dimensionamento",
        "Processe em lote múltiplos arquivos HEIC",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "HEIC é o formato padrão para fotos do iPhone — converta facilmente em PDFs compartilháveis",
        "Transparência e perfis de cor são mantidos na conversão",
        "Perfeito para criar álbuns de fotos de exportações do iPhone",
      ],
    },
    faq: [
      { question: "Por que converteri HEIC para PDF em vez de JPG?", answer: "Formato PDF é melhor para compartilhamento e arquivamento de documentos. Preserva qualidade e é mais compatível universalmente para distribuição." },
      { question: "Meus arquivos HEIC permanecerão no meu dispositivo durante a conversão?", answer: "Sim. Toda a conversão acontece no seu navegador sem uploads. Seus arquivos HEIC são processados localmente e nunca enviados para servidor." },
      { question: "Posso converter arquivos HEIC de qualquer iPhone ou dispositivo Apple?", answer: "Sim. Quaisquer arquivos de formato HEIC/HEIF de iPhones, iPads ou outros dispositivos Apple podem ser convertidos." },
    ],
  },
  "extract-pages": {
    howTo: {
      title: "Como Extrair Páginas de um PDF",
      steps: [
        "Carregue seu arquivo PDF.",
        "Especifique páginas para extrair digitando números ou intervalos de páginas (ex.: 1,3,5-7).",
        "Visualize páginas selecionadas na visualização de miniaturas.",
        "Clique em \"Extrair\" para criar um novo PDF com apenas essas páginas.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Extraia páginas específicas de um documento PDF",
        "Suporte para intervalos de páginas e seleção de páginas não-consecutivas",
        "Visualização visual de páginas selecionadas",
        "Crie múltiplas extrações de um PDF",
        "Preserva todo conteúdo e formatação",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use números separados por vírgula para páginas não-consecutivas: 1,3,7",
        "Use intervalos com hífen para páginas consecutivas: 5-10",
        "Combine ambos métodos: 1,3-5,8,10-15",
      ],
    },
    faq: [
      { question: "Qual é a diferença entre extrair páginas e deletar páginas?", answer: "Extrair páginas cria um novo PDF com apenas páginas selecionadas, enquanto deletar páginas remove páginas selecionadas do original." },
      { question: "Posso extrair a mesma página múltiplas vezes?", answer: "Sim. Se você precisar de páginas duplicadas no seu PDF extraído, especifique o número da página múltiplas vezes (ex.: 1,1,2)." },
      { question: "A extração é realizada localmente no meu dispositivo?", answer: "Sim. Toda a extração de página acontece no seu navegador sem transmissão de dados para servidores externos." },
    ],
  },
  "organize-pages": {
    howTo: {
      title: "Como Organizar Páginas do PDF",
      steps: [
        "Carregue seu arquivo PDF.",
        "Visualize todas as páginas como miniaturas arrastáveis.",
        "Arraste e solte para reorganizar páginas em sua ordem desejada.",
        "Clique em \"Salvar\" para baixar o PDF reorganizado.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Reordenação de página intuitiva com arrasta-e-solta",
        "Visualização de miniatura de página inteira para fácil identificação",
        "Desfazer/refazer para alterações de reordenação",
        "Amplie miniaturas para seleção precisa de página",
        "Operações de lote multi-página (girar, duplicar, deletar)",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use operações de lote para duplicar páginas importantes rapidamente",
        "Agrupe páginas relacionadas para melhor fluxo de documento",
        "Visualize suas alterações antes de salvar",
      ],
    },
    faq: [
      { question: "Posso desfazer minhas alterações de reorganização de página?", answer: "Sim. Os botões desfazer/refazer permitem reverter alterações. Você também pode recarregar para começar de novo." },
      { question: "Meus dados de PDF são mantidos privados durante a organização?", answer: "Absolutamente. Toda a reorganização de página acontece no seu navegador. Seu PDF nunca sai do seu dispositivo." },
      { question: "Posso duplicar páginas no meio do documento?", answer: "Sim. Arraste uma página para qualquer posição e use a função duplicar para criar cópias em qualquer lugar no seu PDF." },
    ],
  },
  "scan-to-pdf": {
    howTo: {
      title: "Como Digitalizar Documentos para PDF",
      steps: [
        "Use sua câmera ou scanner para capturar imagens de documento.",
        "Carregue imagens digitalizadas na ferramenta.",
        "Corrija automaticamente orientação e recorte páginas conforme necessário.",
        "Baixe seu documento digitalizado como PDF pesquisável.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Converta imagens de câmera ou scanner em PDF profissional",
        "Detecção e correção automática de orientação de página",
        "Recorte inteligente para remover bordas e sombras",
        "OCR opcional para texto pesquisável",
        "Processamento em lote para múltiplas páginas digitalizadas",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Mantenha sua câmera firme e garanta boa iluminação para digitalizações mais claras",
        "Use OCR para tornar seu documento digitalizado pesquisável e extraível",
        "Processe em lote múltiplas páginas em uma operação para economizar tempo",
      ],
    },
    faq: [
      { question: "A digitalização para PDF endireitará automaticamente fotos inclinadas?", answer: "Sim. A ferramenta detecta automaticamente orientação de página e endireita para criar um PDF adequadamente alinhado." },
      { question: "Posso adicionar mais páginas ao meu PDF digitalizado após baixar?", answer: "Você pode recarregar e processar digitalizações adicionais, depois mesclar os PDFs usando a ferramenta de mesclagem." },
      { question: "Minhas imagens digitalizadas são armazenadas em seus servidores?", answer: "Não. Toda a digitalização e processamento acontece localmente no seu navegador. Suas digitalizações nunca são carregadas ou armazenadas em qualquer lugar." },
    ],
  },
  "page-numbers": {
    howTo: {
      title: "Como Adicionar Números de Página a um PDF",
      steps: [
        "Carregue seu arquivo PDF.",
        "Selecione formato de número de página (Árabe, Romano, letras, etc.).",
        "Escolha posição (topo/fundo, esquerda/centro/direita) e página inicial.",
        "Clique em \"Adicionar\" para aplicar números de página e baixe.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Múltiplos formatos de numeração (1,2,3 ou i,ii,iii ou a,b,c, etc.)",
        "Nove opções de posição (cantos, bordas, centro)",
        "Fonte, tamanho e cor personalizáveis",
        "Pule primeira página ou opção de página inicial personalizada",
        "Visualize antes de aplicar ao documento inteiro",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use algarismos romanos para matéria inicial (introdução, sumário)",
        "Posicione números na parte inferior do centro para documentos padrão",
        "Escolha cor cinza claro para aparência sutil",
      ],
    },
    faq: [
      { question: "Posso pular numeração de página na primeira página?", answer: "Sim. A ferramenta permite pular a primeira página (comumente usada para páginas de título) ou começar numeração de qualquer página." },
      { question: "Posso usar diferentes formatos de numeração no mesmo PDF?", answer: "A versão atual aplica um formato a todo documento. Para diferentes formatos, você precisará processar seções separadamente." },
      { question: "A numeração de página é feita com segurança sem carregar meu PDF?", answer: "Sim. Toda numeração de página acontece no seu navegador sem uploads para nenhum servidor." },
    ],
  },
  crop: {
    howTo: {
      title: "Como Cortar Páginas do PDF",
      steps: [
        "Carregue seu arquivo PDF.",
        "Use ferramenta de corte para desenhar um retângulo ao redor do conteúdo que deseja manter.",
        "Aplique o mesmo corte a múltiplas páginas ou personalize por página.",
        "Clique em \"Cortar\" para remover margens e baixe o resultado.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Ferramenta de corte visual com interface de arrasta-para-selecionar",
        "Aplique mesmo corte a todas páginas ou páginas individuais",
        "Corte por porcentagem ou medidas fixas",
        "Visualize cortes antes de aplicar",
        "Redefina cortes e tente novamente a qualquer momento",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Cortar reduz tamanho do arquivo removendo margens desnecessárias",
        "Use corte uniforme para aparência de documento consistente",
        "Perfeito para preparar documentos para leitura em tablet",
      ],
    },
    faq: [
      { question: "Quanto posso reduzir o tamanho do arquivo cortando?", answer: "Redução de tamanho depende de quanto você corta. Remover margens grandes pode reduzir tamanho em 20-50% ou mais." },
      { question: "Posso desfazer um corte após aplicar?", answer: "Não. Corte é permanente. Visualize seu corte com cuidado antes de aplicar. Mantenha um backup do original." },
      { question: "Cortar acontece localmente no meu dispositivo?", answer: "Sim. Todas operações de corte acontecem no seu navegador sem uploads para servidor." },
    ],
  },
  sign: {
    howTo: {
      title: "Como Assinar um PDF",
      steps: [
        "Carregue seu documento PDF.",
        "Escolha tipo de assinatura: desenhar, carregar imagem, ou digitar seu nome.",
        "Coloque sua assinatura na página do documento.",
        "Clique em \"Assinar\" para aplicar e baixe o PDF assinado.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Desenhe assinaturas à mão livre com mouse ou tela sensível ao toque",
        "Carregue imagens de assinatura pré-criadas",
        "Digite texto de assinatura em várias fontes",
        "Redimensione e reposicione assinatura em qualquer lugar da página",
        "Múltiplas assinaturas por documento",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Desenhe assinaturas em dispositivo com tela sensível ao toque para melhores resultados",
        "Carregue imagens de assinatura consistentes para aparência profissional",
        "Teste posicionamento de assinatura em visualização antes de finalizar",
      ],
    },
    faq: [
      { question: "Uma assinatura digital criada aqui é legalmente vinculativa?", answer: "Esta ferramenta cria uma assinatura visual colocada no PDF. Para assinaturas digitais legalmente vinculativas, use soluções de assinatura digital certificadas." },
      { question: "Posso assinar múltiplos documentos de uma vez?", answer: "Você pode assinar um documento por vez. Após assinar, você pode processar documentos adicionais usando a mesma assinatura." },
      { question: "Meus dados de assinatura são salvos ou compartilhados?", answer: "Não. Sua assinatura é apenas usada para assinar o PDF que você está processando. Nunca é armazenada ou enviada para nenhum servidor." },
    ],
  },
  annotate: {
    howTo: {
      title: "Como Anotar um PDF",
      steps: [
        "Carregue seu documento PDF.",
        "Selecione ferramenta de anotação: destacar, sublinhar, riscado, ou notas.",
        "Clique e arraste para anotar texto ou adicionar notas adesivas.",
        "Clique em \"Salvar\" para aplicar anotações e baixe.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Destaque de texto em múltiplas cores",
        "Marcação de texto com sublinhado e riscado",
        "Notas adesivas com texto e cores personalizáveis",
        "Ferramentas de desenho à mão livre e marcação",
        "Exportação de anotação e visualização de sumário",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use diferentes cores de destaque para categorizar diferentes tipos de conteúdo",
        "Adicione notas detalhadas a seções importantes com notas adesivas",
        "Exporte sumário de anotação para referência rápida",
      ],
    },
    faq: [
      { question: "Posso remover anotações individuais sem remover o documento inteiro?", answer: "Sim. Você pode deletar seletivamente anotações específicas mantendo outras e o conteúdo PDF original intacto." },
      { question: "As anotações serão visíveis se alguém abrir o PDF?", answer: "Sim. Uma vez que anotações são salvas no PDF, serão visíveis para qualquer pessoa que abra o documento." },
      { question: "Meu PDF anotado é mantido privado?", answer: "Sim. Toda anotação acontece no seu navegador. Seu PDF e anotações nunca são enviados para nenhum servidor." },
    ],
  },
  flatten: {
    howTo: {
      title: "Como Nivelar um PDF",
      steps: [
        "Carregue um PDF com campos de formulário, camadas ou anotações.",
        "Escolha o que nivelar: formulários, camadas, anotações, ou tudo.",
        "Clique em \"Nivelar\" para mesclar todas as camadas.",
        "Baixe o PDF nivelado.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Nivelar campos de formulário interativo em conteúdo estático",
        "Mesclar múltiplas camadas PDF em camada única",
        "Remover ou nivelar todas anotações",
        "Reduzir tamanho do arquivo nivelando elementos desnecessários",
        "Preservar todo conteúdo removendo editabilidade",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Nivelar PDFs antes de compartilhar para prevenir edição acidental",
        "Nivelar campos de formulário após preencher torna o PDF somente leitura",
        "Reduz significativamente o tamanho de arquivo em PDFs com múltiplas camadas",
      ],
    },
    faq: [
      { question: "Qual é a diferença entre nivelar e converter para imagens?", answer: "Nivelar mescla camadas mantendo texto como texto. Converter para imagens rasteriza tudo, tornando texto não pesquisável." },
      { question: "Posso desfazer nivelamento após baixar o PDF?", answer: "Não. Nivelamento é permanente. Uma vez nivelado, campos de formulário e camadas não podem ser recuperados. Mantenha seu original." },
      { question: "Nivelamento acontece localmente no meu dispositivo?", answer: "Sim. Todas operações de nivelamento são processadas inteiramente no seu navegador sem envolvimento de servidor." },
    ],
  },
  resize: {
    howTo: {
      title: "Como Redimensionar um PDF",
      steps: [
        "Carregue seu documento PDF.",
        "Selecione tamanho de página alvo (A3, A4, A5, Letter, etc.).",
        "Escolha opção de dimensionamento: ajustar a página ou manter proporção de aspecto.",
        "Clique em \"Redimensionar\" para aplicar e baixe.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Redimensione para tamanhos de papel padrão (série A, Letter, Legal)",
        "Dimensões personalizadas de largura e altura",
        "Múltiplas opções de dimensionamento (alongar, ajustar, proporção de aspecto)",
        "Processamento em lote para múltiplos PDFs",
        "Visualize antes de aplicar alterações",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Redimensione para A5 para documentos amigáveis para leitura em dispositivos móveis",
        "Use opção \"Ajustar\" para preservar proporção de aspecto sem distorção",
        "Redimensione em lote múltiplos documentos para consistência",
      ],
    },
    faq: [
      { question: "Redimensionar afetará qualidade do texto ou legibilidade?", answer: "Usar \"Ajustar\" preserva qualidade do texto. Se usar \"Alongar\" em proporções significativamente diferentes, o texto pode ser distorcido." },
      { question: "Posso redimensionar apenas algumas páginas em um PDF multi-página?", answer: "A ferramenta redimensiona todas páginas para mesmas dimensões. Para redimensionamento seletivo, divida e redimensione páginas separadamente." },
      { question: "Redimensionar é feito com segurança sem carregar para servidor?", answer: "Sim. Todo redimensionamento acontece no seu navegador sem uploads de dados." },
    ],
  },
  "edit-metadata": {
    howTo: {
      title: "Como Editar Metadados de PDF",
      steps: [
        "Carregue seu arquivo PDF.",
        "Edite campos como Título, Autor, Assunto e Palavras-chave.",
        "Adicione datas de criação e modificação.",
        "Clique em \"Salvar\" para aplicar metadados e baixe.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Edite campos de metadados padrão de PDF (título, autor, assunto, palavras-chave)",
        "Defina datas de criação e modificação",
        "Remova metadados sensíveis para privacidade",
        "Visualize metadados atuais antes de editar",
        "Atualizações de metadados em lote para múltiplos PDFs",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Adicione palavras-chave descritivas para melhorar pesquisabilidade",
        "Remova informações pessoais antes de compartilhar documentos",
        "Metadados consistentes ajudam com organização de documentos",
      ],
    },
    faq: [
      { question: "Por que eu desejaria editar metadados de PDF?", answer: "Metadados melhoram organização de documento, pesquisabilidade e profissionalismo. Você também pode remover informações pessoais para privacidade." },
      { question: "Posso ver quais metadados estão atualmente no meu PDF?", answer: "Sim. A ferramenta exibe metadados atuais antes de editar para que você possa ver quais informações são armazenadas." },
      { question: "Edição de metadados é feita com segurança sem carregar para servidor?", answer: "Sim. Toda edição de metadados acontece localmente no seu navegador sem uploads para nenhum servidor." },
    ],
  },
  "pages-per-sheet": {
    howTo: {
      title: "Como Imprimir Múltiplas Páginas por Folha",
      steps: [
        "Carregue seu documento PDF.",
        "Selecione páginas por folha: 2, 4, 6, 8, ou 9 páginas.",
        "Escolha ordem de página (arranjo horizontal ou vertical).",
        "Clique em \"Aplicar\" para reorganizar e baixe.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Organize múltiplas páginas em folha única (2, 4, 6, 8, 9 por página)",
        "Múltiplas opções de layout (horizontal, vertical, ordem de livro)",
        "Ajuste automático de margem e escala",
        "Perfeito para impressão de livreto e materiais de distribução",
        "Visualize layout antes de processar",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use 4 páginas por folha para formato de material de distribução padrão",
        "Escolha 2 páginas por folha com margens amplas para espaço de anotações",
        "Ordem de livro é ideal para criar livretos",
      ],
    },
    faq: [
      { question: "Posso adicionar espaço vazio para anotações no material impresso?", answer: "Sim. Escolha 2 ou 4 páginas por folha para deixar espaço para anotações escritas ao redor das páginas." },
      { question: "O texto será legível se colocar 9 páginas em uma folha?", answer: "Legibilidade depende do tamanho de página original. 9 páginas por folha resulta em texto muito pequeno. Comece com 4 e ajuste conforme necessário." },
      { question: "Páginas-por-folha é processado localmente no meu dispositivo?", answer: "Sim. Toda reorganização de página acontece no seu navegador sem uploads para servidor." },
    ],
  },
  "header-footer": {
    howTo: {
      title: "Como Adicionar Cabeçalho e Rodapé a um PDF",
      steps: [
        "Carregue seu documento PDF.",
        "Digite texto de cabeçalho (alinhamento esquerdo, centro, direito).",
        "Digite texto de rodapé com números de página, data, ou texto personalizado.",
        "Clique em \"Adicionar\" para aplicar e baixe.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Texto de cabeçalho e rodapé personalizáveis",
        "Múltiplas opções de alinhamento (esquerdo, centro, direito)",
        "Inserção automática de número de página",
        "Insira variáveis de data, hora, ou nome de arquivo",
        "Ajuste fonte, tamanho e cor",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use cabeçalhos para títulos de documento em cada página",
        "Inclua números de página em rodapés: \"Página [página]/[total]\"",
        "Adicione \"Confidencial\" ou informação de data em documentos sensíveis",
      ],
    },
    faq: [
      { question: "Posso adicionar cabeçalhos e rodapés apenas a páginas específicas?", answer: "A ferramenta aplica cabeçalhos/rodapés a todas páginas ou intervalos personalizados. Para aplicação seletiva, processe seções separadamente." },
      { question: "Quais variáveis posso usar em cabeçalhos e rodapés?", answer: "Variáveis comuns incluem [página] para página atual, [total] para total de páginas, [data], [hora], e [nomearquivo]." },
      { question: "Adição de cabeçalho/rodapé é feita localmente no meu dispositivo?", answer: "Sim. Todo processamento de cabeçalho e rodapé acontece no seu navegador sem dados enviados para nenhum servidor." },
    ],
  },
  grayscale: {
    howTo: {
      title: "Como Converter PDF para Escala de Cinza",
      steps: [
        "Carregue seu arquivo PDF colorido.",
        "Escolha tipo de conversão escala de cinza: padrão ou alta qualidade.",
        "Visualize a aparência convertida.",
        "Clique em \"Converter\" para aplicar e baixe.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Converta PDFs coloridos completos em escala de cinza",
        "Múltiplos algoritmos de conversão para resultados ideais",
        "Reduz significativamente o tamanho do arquivo",
        "Preserva qualidade de texto e imagem",
        "Conversão em lote de múltiplos PDFs",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Conversão escala de cinza reduz tamanho de arquivo em 20-40%",
        "Perfeito para documentos destinados à impressão em preto e branco",
        "Melhora impressão em impressoras monocromáticas",
      ],
    },
    faq: [
      { question: "Posso desfazer conversão escala de cinza após baixar?", answer: "Não. Conversão escala de cinza é permanente e não pode ser revertida. Mantenha um backup do PDF colorido original." },
      { question: "O texto permanecerá legível após converter para escala de cinza?", answer: "Sim. Qualidade de texto é preservada. Conversão escala de cinza apenas afeta informação de cor, não nitidez do texto." },
      { question: "Conversão é feita com segurança no meu navegador?", answer: "Sim. Toda conversão escala de cinza acontece localmente no seu navegador sem uploads para nenhum servidor." },
    ],
  },
  booklet: {
    howTo: {
      title: "Como Criar um Livreto PDF",
      steps: [
        "Carregue seu documento PDF.",
        "Selecione tamanho de página e margem de encadernação.",
        "Escolha lado de encadernação (esquerdo ou direito).",
        "Clique em \"Criar\" para gerar layout de livreto e baixe.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Organize páginas para encadernação de livreto",
        "Colocação automática de capa dianteira e traseira",
        "Margem de encadernação personalizável",
        "Inserção de página em branco para contagens de página adequadas",
        "Saída pronta para impressão com marcas de corte",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Garanta que contagem de página seja divisível por 4 para layout de livreto apropriado",
        "Defina margem de encadernação baseada em seu método de encadernação",
        "Imprima frente-verso para aparência de livreto autêntico",
      ],
    },
    faq: [
      { question: "Por que meu documento precisa ser divisível por 4 páginas?", answer: "Livretos são folhas dobradas com 4 páginas por folha. Seu conteúdo precisa preencher folhas completamente para layout apropriado." },
      { question: "A ferramenta pode adicionar automaticamente páginas em branco se necessário?", answer: "Sim. A ferramenta de livreto adiciona automaticamente páginas em branco para tornar sua contagem de página divisível por 4." },
      { question: "Criação de livreto é feita localmente no meu navegador?", answer: "Sim. Todo layout de livreto e processamento acontece inteiramente no seu navegador sem uploads para servidor." },
    ],
  },
  overlay: {
    howTo: {
      title: "Como Sobrepor PDFs",
      steps: [
        "Carregue PDF base e arquivos PDF sobrepostos.",
        "Alinhe posição e dimensionamento de sobreposição.",
        "Ajuste opacidade se necessário para efeito de transparência.",
        "Clique em \"Aplicar\" para mesclar e baixe.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Sobreponha um PDF em cima de outro",
        "Posicione e dimensione sobreposição independentemente",
        "Ajuste de opacidade para efeitos de blending",
        "Aplicação de sobreposição página-por-página",
        "Sobreposição em lote para múltiplos documentos",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Use sobreposições para adicionar logos ou marcas d'água a documentos em lote",
        "Ajuste opacidade para tornar conteúdo de sobreposição semi-transparente",
        "Perfeito para mesclar formulários com documentos pré-impressos",
      ],
    },
    faq: [
      { question: "Como sobreposição é diferente de mesclar PDFs?", answer: "Sobreposição coloca um PDF em cima de outro com controle de posicionamento. Mesclagem combina páginas sequencialmente." },
      { question: "Posso aplicar diferentes sobreposições em diferentes páginas?", answer: "Sim. Você pode aplicar diferentes sobreposições a intervalos de página específicos em seu PDF base." },
      { question: "Processamento de sobreposição é feito localmente no meu dispositivo?", answer: "Sim. Todas operações de sobreposição de PDF acontecem no seu navegador sem dados enviados para nenhum servidor." },
    ],
  },
  "web-optimize": {
    howTo: {
      title: "Como Otimizar um PDF para Web",
      steps: [
        "Carregue seu arquivo PDF.",
        "Selecione nível de otimização: rápido, equilibrado, ou máximo.",
        "Escolha configurações de compressão.",
        "Clique em \"Otimizar\" para reduzir tamanho do arquivo.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Reduza tamanho de arquivo PDF para carregamento web mais rápido",
        "PDF otimizado para fluxo para renderização progressiva",
        "Comprima imagens e remova dados desnecessários",
        "Mantenha legibilidade reduzindo tamanho",
        "Múltiplos níveis de otimização",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "PDFs otimizados carregam mais rápido em websites e emails",
        "Escolha otimização \"Máxima\" para menor tamanho de arquivo",
        "Use para compartilhar documentos grandes via email ou web",
      ],
    },
    faq: [
      { question: "Quão menor será meu PDF otimizado?", answer: "Redução varia por conteúdo. Tipicamente 30-60% menor dependendo de nível de otimização e estrutura de arquivo original." },
      { question: "Otimização afetará a qualidade do meu PDF?", answer: "Qualidade é preservada com compressão inteligente. Níveis Equilibrado e Máximo podem reduzir clareza de imagem ligeiramente para menor tamanho." },
      { question: "Otimização é feita com segurança no meu navegador?", answer: "Sim. Toda otimização acontece localmente no seu navegador sem uploads para nenhum servidor." },
    ],
  },
  redact: {
    howTo: {
      title: "Como Redactar um PDF",
      steps: [
        "Carregue seu documento PDF.",
        "Use ferramenta de redação para selecionar texto ou áreas a ocultar.",
        "Aplique marcas de redação (caixas pretas sobre conteúdo).",
        "Clique em \"Aplicar\" para remover permanentemente conteúdo e baixe.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Remova permanentemente informação sensível de PDFs",
        "Desenhe caixas de redação sobre texto ou imagens",
        "Redação em lote com estilo consistente",
        "Personalize cor e opacidade de redação",
        "Verifique redações antes exportação final",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Garanta que redações sejam visíveis com opacidade suficiente",
        "Redação é permanente — backup original antes de aplicar",
        "Use para remover dados pessoais antes de compartilhar documentos",
      ],
    },
    faq: [
      { question: "Redação é verdadeiramente permanente e irreversível?", answer: "Sim. Conteúdo redatado é permanentemente removido do PDF e não pode ser recuperado ou tornado visível novamente." },
      { question: "Meu documento sensível é mantido privado durante redação?", answer: "Sim. Toda redação acontece localmente no seu navegador. Seu PDF nunca é enviado para ou armazenado em nenhum servidor." },
      { question: "Posso redatar texto oculto que não é aparente visualmente?", answer: "Redação oculta conteúdo visível. Para remoção de metadados ou texto oculto, use ferramenta de remoção de metadados ou nivelar o PDF." },
    ],
  },
  "pdf-to-pdfa": {
    howTo: {
      title: "Como Converter PDF para PDF/A",
      steps: [
        "Carregue seu arquivo PDF.",
        "Selecione nível PDF/A (1B ou 2B recomendado para arquivamento).",
        "Configure incorporação de fonte e manipulação de cor.",
        "Clique em \"Converter\" para criar PDF/A pronto para arquivamento.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Converta para PDF/A-1B ou PDF/A-2B para arquivamento de longo prazo",
        "Incorporação automática de fonte para consistência",
        "Remove recursos incompatíveis com padrões de arquivamento",
        "Verifica conformidade antes saída",
        "Preserva aparência de documento ao longo dos anos",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Formato PDF/A garante que documentos permaneçam legíveis por décadas",
        "Requerido para muitos arquivos de documentos governamentais e legais",
        "Use para criar registros digitais permanentes",
      ],
    },
    faq: [
      { question: "Qual é a diferença entre PDF e PDF/A?", answer: "PDF/A é formato padronizado projetado para arquivamento de longo prazo com fontes incorporadas e sem dependências externas." },
      { question: "Recursos interativos funcionarão em formato PDF/A?", answer: "Não. PDF/A remove elementos interativos como formulários e links para garantir legibilidade e estabilidade de longo prazo." },
      { question: "Conversão é feita localmente sem carregar meu documento?", answer: "Sim. Toda conversão PDF/A acontece no seu navegador sem uploads para nenhum servidor externo." },
    ],
  },
  "pdf-to-word": {
    howTo: {
      title: "Como Converter PDF para Word",
      steps: [
        "Carregue seu arquivo PDF.",
        "Escolha qualidade de conversão (padrão ou alta fidelidade).",
        "Selecione páginas para converter ou converta documento inteiro.",
        "Clique em \"Converter\" para gerar documento Word editável.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Converta PDFs em formato Microsoft Word editável (.docx)",
        "Preserve formatação, fontes e layout",
        "Suporte para texto, imagens e tabelas",
        "Conversão de alta fidelidade para documentos complexos",
        "Conversão em lote de múltiplos PDFs",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Resultados são mais precisos para PDFs criados de documentos Word",
        "Alguns ajustes de formatação podem ser necessários após conversão",
        "Use para tornar PDFs editáveis no Microsoft Office",
      ],
    },
    faq: [
      { question: "Tabelas e imagens serão preservadas no documento Word?", answer: "Sim. Tabelas e imagens são preservadas durante conversão, embora formatação possa requerer ajustes menores." },
      { question: "E sobre PDFs digitalizados ou PDFs sem texto selecionável?", answer: "Conversão funciona melhor com PDFs digitais. Para documentos digitalizados, use OCR primeiro para tornar texto selecionável." },
      { question: "Meu documento PDF é mantido privado durante conversão?", answer: "Sim. Toda conversão acontece localmente no seu navegador sem uploads para nenhum servidor externo." },
    ],
  },
  "pdf-to-excel": {
    howTo: {
      title: "Como Converter PDF para Excel",
      steps: [
        "Carregue seu PDF contendo tabelas ou dados.",
        "Visualize tabelas reconhecidas na visualização de conversão.",
        "Selecione tabelas para extrair ou escolha \"Extrair Tudo\".",
        "Clique em \"Converter\" para criar planilha Excel.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Extraia tabelas de PDFs em formato Excel (.xlsx)",
        "Detecção automática de tabela e reconhecimento de célula",
        "Preserve formatação e estrutura de dados",
        "Suporte para múltiplas tabelas por PDF",
        "Extração de tabela em lote de múltiplos documentos",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Funciona melhor com PDFs contendo estruturas de tabela claras",
        "Ajustes manuais no Excel podem ser necessários para layouts complexos",
        "Perfeito para converter relatórios de dados em planilhas",
      ],
    },
    faq: [
      { question: "Posso extrair tabelas específicas em vez do PDF inteiro?", answer: "Sim. A ferramenta detecta tabelas individuais e permite selecionar quais extrair." },
      { question: "E se meu PDF tiver tabelas mal formatadas ou complexas?", answer: "A ferramenta lida bem com tabelas padrão. Layouts complexos ou irregulares podem precisar ajuste manual no Excel." },
      { question: "Meus dados de PDF são mantidos privados durante extração?", answer: "Sim. Toda extração acontece localmente no seu navegador sem uploads para nenhum servidor." },
    ],
  },
  "pdf-to-ppt": {
    howTo: {
      title: "Como Converter PDF para PowerPoint",
      steps: [
        "Carregue sua apresentação ou documento PDF.",
        "Escolha estilo de conversão (um slide por página ou personalizado).",
        "Selecione páginas para incluir ou converta PDF inteiro.",
        "Clique em \"Converter\" para criar apresentação PowerPoint editável.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Converta páginas PDF em slides PowerPoint editáveis",
        "Preserve imagens, texto e layout do original",
        "Suporte para documentos multi-página complexos",
        "Slides editáveis em formato Microsoft PowerPoint",
        "Conversão em lote de múltiplos PDFs",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Cada página PDF torna-se um slide separado",
        "Texto pode requerer ajustes de formatação manual",
        "Use para converter apresentações PDF em slides editáveis",
      ],
    },
    faq: [
      { question: "A formatação original será preservada em PowerPoint?", answer: "Maioria da formatação é preservada, mas alguns ajustes podem ser necessários. Caixas de texto e imagens transferem bem." },
      { question: "Posso converter apenas páginas específicas de um PDF em slides?", answer: "Sim. Selecione o intervalo de página que deseja converter e apenas essas páginas se tornarão slides." },
      { question: "Meu documento PDF é mantido privado durante conversão?", answer: "Sim. Toda conversão acontece localmente no seu navegador sem uploads para nenhum servidor externo." },
    ],
  },
  "word-to-pdf": {
    howTo: {
      title: "Como Converter Word para PDF",
      steps: [
        "Carregue seu documento Word (.doc ou .docx).",
        "Visualize a aparência do documento.",
        "Escolha tamanho de página e configurações de margem.",
        "Clique em \"Converter\" para criar PDF de Word.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Converta documentos Microsoft Word em formato PDF",
        "Preserve toda formatação, fontes e estilos",
        "Suporte para imagens, tabelas e cabeçalhos/rodapés",
        "Conversão em lote de múltiplos arquivos Word",
        "Mantenha qualidade e layout do documento",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "PDF é ideal para compartilhar documentos prevenindo edição",
        "Garanta que documento Word seja adequadamente formatado antes de conversão",
        "Use para criar documentos profissionais a distribuir",
      ],
    },
    faq: [
      { question: "Alterações rastreadas serão incluídas no PDF convertido?", answer: "Alterações rastreadas não são visíveis em PDFs. Aceite ou rejeite todas alterações em Word antes de converter." },
      { question: "Posso converter documentos Word com vídeos ou conteúdo interativo incorporados?", answer: "PDFs não suportam vídeo ou interatividade. Imagens estáticas e conteúdo transferem; elementos interativos são removidos." },
      { question: "Meu documento Word é mantido privado durante conversão?", answer: "Sim. Toda conversão acontece localmente no seu navegador sem uploads para nenhum servidor externo." },
    ],
  },
  "excel-to-pdf": {
    howTo: {
      title: "Como Converter Excel para PDF",
      steps: [
        "Carregue sua planilha Excel (.xlsx ou .xls).",
        "Selecione abas para incluir ou converta todas abas.",
        "Escolha orientação de página e opções de dimensionamento.",
        "Clique em \"Converter\" para criar PDF de Excel.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Converta planilhas Excel em formato PDF",
        "Suporte para múltiplas abas em um único PDF",
        "Preserve formatação, cores e layouts de célula",
        "Ajuste de tamanho de página para impressão ideal",
        "Conversão em lote de múltiplos arquivos Excel",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Formato PDF é ideal para compartilhar relatórios financeiros com segurança",
        "Planilhas são automaticamente divididas entre páginas se necessário",
        "Use orientação paisagem para planilhas amplas",
      ],
    },
    faq: [
      { question: "Fórmulas e cálculos serão preservados no PDF?", answer: "Não. PDFs preservam apenas valores de célula visíveis, não fórmulas atrás delas." },
      { question: "Posso converter múltiplas abas de um arquivo Excel em um único PDF?", answer: "Sim. Todas abas selecionadas são combinadas em um documento PDF com quebras de página automáticas entre elas." },
      { question: "Minha planilha Excel é mantida privada durante conversão?", answer: "Sim. Toda conversão acontece localmente no seu navegador sem uploads para nenhum servidor externo." },
    ],
  },
  "ppt-to-pdf": {
    howTo: {
      title: "Como Converter PowerPoint para PDF",
      steps: [
        "Carregue sua apresentação PowerPoint (.pptx ou .ppt).",
        "Selecione slides para incluir ou converta todos slides.",
        "Escolha formato de saída: arquivo único ou um arquivo por slide.",
        "Clique em \"Converter\" para criar apresentação PDF.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Converta apresentações PowerPoint em formato PDF",
        "Preserve animações, transições e referências multimídia",
        "Múltiplas opções de saída (arquivo único ou multi-arquivo)",
        "Mantenha layout de slide e elementos de design",
        "Conversão em lote de múltiplas apresentações",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "PDF de arquivo único é melhor para compartilhar e imprimir apresentações",
        "Animações não reproduzirão em PDF — considere adicionar notas",
        "Use para criar arquivos de apresentação",
      ],
    },
    faq: [
      { question: "Animações e transições de slide aparecerão no PDF?", answer: "Não. PDFs são documentos estáticos. Animações e transições não reproduzirão, então adicione notas de palestrante conforme necessário." },
      { question: "Posso criar PDFs separados para cada slide?", answer: "Sim. Escolha opção de saída multi-arquivo para gerar um PDF por slide." },
      { question: "Minha apresentação PowerPoint é mantida privada durante conversão?", answer: "Sim. Toda conversão acontece localmente no seu navegador sem uploads para nenhum servidor externo." },
    ],
  },
  repair: {
    howTo: {
      title: "Como Reparar um PDF",
      steps: [
        "Carregue seu arquivo PDF corrompido ou danificado.",
        "Selecione opção de reparo: reparo automático ou recuperação avançada.",
        "Visualize o documento reparado.",
        "Clique em \"Reparar\" para corrigir e baixe o PDF restaurado.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Corrija arquivos PDF corrompidos com reparo automático",
        "Recupere conteúdo legível de documentos danificados",
        "Suporte para vários tipos de corrupção de PDF",
        "Visualize conteúdo reparado antes de salvar",
        "Tente preservar formatação original",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Reparo frequentemente recupera maioria do conteúdo de arquivos ligeiramente corrompidos",
        "Alguma formatação pode ser perdida em arquivos fortemente danificados",
        "Mantenha backups de PDFs importantes para evitar corrupção",
      ],
    },
    faq: [
      { question: "Reparo recuperará todo conteúdo de um PDF corrompido?", answer: "Maioria do conteúdo é tipicamente recuperada, mas arquivos fortemente danificados podem perder formatação ou páginas." },
      { question: "O que causa corrupção de PDF em primeiro lugar?", answer: "Corrupção pode resultar de downloads incompletos, erros de transferência de arquivo, dano de mídia de armazenamento, ou falhas de software." },
      { question: "Reparo de PDF é feito localmente sem carregar para servidor?", answer: "Sim. Todas operações de reparo acontecem no seu navegador sem uploads para nenhum servidor externo." },
    ],
  },
  ocr: {
    howTo: {
      title: "Como OCR um PDF",
      steps: [
        "Carregue um PDF digitalizado ou baseado em imagem.",
        "Selecione idioma OCR para reconhecimento de texto preciso.",
        "Escolha formato de saída: PDF pesquisável ou texto extraído.",
        "Clique em \"OCR\" para processar e baixe resultados.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Reconhecimento Óptico de Caracteres para documentos digitalizados",
        "Suporte para mais de 40 idiomas para extração de texto precisa",
        "Crie PDFs pesquisáveis com camada de texto oculta",
        "Extraia texto para arquivo separado ou mantenha em PDF",
        "Processamento OCR em lote para múltiplos documentos",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "PDFs pesquisáveis permitem seleção e pesquisa de texto",
        "Melhor qualidade de digitalização produz resultados OCR mais precisos",
        "Perfeito para digitalizar documentos antigos e arquivamento",
      ],
    },
    faq: [
      { question: "Quão preciso é reconhecimento de texto OCR?", answer: "Precisão depende de qualidade de digitalização. Digitalizações claras e alta resolução alcançam precisão acima de 95%. Digitalizações ruins podem precisar correção manual." },
      { question: "Posso usar OCR em documentos manuscritos?", answer: "OCR funciona melhor com texto impresso. Reconhecimento de conteúdo manuscrito é limitado e pode requerer transcrição manual." },
      { question: "Processamento OCR é feito localmente no meu navegador?", answer: "Sim. Todo processamento OCR acontece localmente no seu navegador sem uploads para nenhum servidor externo." },
    ],
  },
  unlock: {
    howTo: {
      title: "Como Desbloquear um PDF",
      steps: [
        "Carregue seu arquivo PDF protegido por senha.",
        "Digite a senha do usuário se o arquivo estiver protegido.",
        "A ferramenta removerá restrições automaticamente.",
        "Baixe seu PDF desbloqueado.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Remova proteção de senha de PDFs",
        "Desabilite restrições de impressão, cópia e edição",
        "Suporte para senhas de usuário e proprietário",
        "Desbloqueie em lote múltiplos PDFs protegidos",
        "Sem perda de dados durante processo de desbloqueio",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Desbloqueio requer senha correta se uma for definida",
        "Use apenas para arquivos que você possui ou tem permissão para modificar",
        "PDFs desbloqueados podem ser editados com outras ferramentas",
      ],
    },
    faq: [
      { question: "É legal desbloquear PDFs protegidos por senha?", answer: "Sim, se você possuir o documento ou tiver permissão do proprietário. Respeite direitos autorais e restrições de uso." },
      { question: "Posso desbloquear um PDF se não tiver a senha?", answer: "Não. Se uma senha for definida, você deve fornecer a senha correta. Isto protege segurança do documento." },
      { question: "Desbloquear meu PDF removerá restrições de cópia e impressão?", answer: "Sim. Desbloqueio remove maioria das restrições de permissão, permitindo cópia, impressão e edição." },
    ],
  },
  translate: {
    howTo: {
      title: "Como Traduzir um PDF",
      steps: [
        "Carregue seu documento PDF.",
        "Selecione idioma de origem e idioma de destino.",
        "Escolha formato de saída: PDF traduzido ou visualização lado-a-lado.",
        "Clique em \"Traduzir\" para processar e baixe resultados.",
      ],
    },
    features: {
      title: "Recursos principais",
      items: [
        "Traduza conteúdo de PDF para mais de 100 idiomas",
        "Preserve formatação e layout original",
        "Suporte para PDFs de texto e baseados em imagem",
        "Tradução alimentada por IA para resultados naturais",
        "Tradução em lote de múltiplos documentos",
      ],
    },
    tips: {
      title: "Dicas de uso",
      items: [
        "Pré-processamento OCR melhora precisão de tradução para PDFs digitalizados",
        "Documentos técnicos podem precisar revisão manual para precisão",
        "Use visualização lado-a-lado para comparar original e tradução",
      ],
    },
    faq: [
      { question: "Quão precisa é a tradução de IA?", answer: "Precisão de tradução é alta para conteúdo geral, mas documentos técnicos, médicos ou legais devem ser revisados por tradutor profissional." },
      { question: "Formatação e layout serão preservados após tradução?", answer: "Sim. A ferramenta preserva layout original, fontes e formatação enquanto traduz o conteúdo de texto." },
      { question: "Meu documento PDF é mantido privado durante tradução?", answer: "Sim. Toda tradução acontece localmente no seu navegador sem uploads para nenhum servidor externo." },
    ],
  },
};
