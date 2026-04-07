import type { ToolContentMap } from "../tool-content-types";

export const pdfContentEs: ToolContentMap = {
  merge: {
    howTo: {
      title: "Cómo Fusionar Archivos PDF",
      steps: [
        "Haz clic en 'Seleccionar Archivos' o arrastra y suelta múltiples archivos PDF en el área de carga.",
        "Organiza los archivos en el orden deseado arrastrándolos.",
        "Haz clic en el botón 'Fusionar' para combinar todos los archivos en un PDF.",
        "Descarga tu archivo PDF fusionado — está listo para usar.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Combina archivos PDF ilimitados en un único documento",
        "Reordenamiento de arrastrar y soltar para control preciso sobre la secuencia de páginas",
        "Vista previa de miniaturas antes de fusionar para verificar el contenido",
        "Mantiene la calidad original — sin compresión o pérdida de calidad",
        "Funciona completamente en tu navegador — los archivos nunca salen de tu dispositivo",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Ordena archivos por nombre o tamaño usando los botones de la barra de herramientas para una rápida organización",
        "Los archivos grandes pueden tardar un momento en procesarse — un indicador de progreso te mantendrá informado",
        "El archivo fusionado preserva marcadores, enlaces y campos de formulario de los documentos originales",
      ],
    },
    faq: [
      { question: "¿Es seguro fusionar PDFs en línea?", answer: "Sí. ToolPop procesa todo en tu navegador usando JavaScript. Tus archivos nunca salen de tu dispositivo y nunca se cargan en ningún servidor." },
      { question: "¿Cuántos PDFs puedo fusionar a la vez?", answer: "No hay límite. Puedes fusionar tantos archivos PDF como tu navegador pueda manejar." },
      { question: "¿Afectará la fusión a la calidad?", answer: "No. La calidad original de cada PDF se preserva completamente durante el proceso de fusión." },
    ],
  },
  split: {
    howTo: {
      title: "Cómo Dividir un PDF",
      steps: [
        "Carga un archivo PDF haciendo clic en 'Seleccionar Archivo' o arrastrándolo al área.",
        "Elige un método de división: por rango de páginas, extraer páginas específicas, o dividir en intervalos fijos.",
        "Configura tus rangos o números de página deseados.",
        "Haz clic en 'Dividir' para crear archivos PDF separados, luego descárgalos.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Divide por rangos de páginas personalizados (por ejemplo, páginas 1–5, 10–15)",
        "Extrae páginas individuales en archivos separados",
        "Divide en fragmentos de tamaño igual (cada N páginas)",
        "Miniaturas de página visual para fácil selección de páginas",
        "Opción para fusionar rangos seleccionados en un archivo de salida",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Usa la entrada de rango para especificar múltiples rangos separados por comas",
        "Haz clic en las miniaturas de página para seleccionar o deseleccionar rápidamente páginas",
        "La opción 'Extraer Todo' crea un archivo por página — útil para archivar",
      ],
    },
    faq: [
      { question: "¿Puedo extraer una sola página de un PDF?", answer: "Sí. Simplemente ingresa el número de página o usa las miniaturas visuales para seleccionar y extraer páginas individuales." },
      { question: "¿La división reduce la calidad del PDF?", answer: "No. La división crea nuevos PDFs con la misma calidad del documento original." },
      { question: "¿Qué sucede si especifico rangos de páginas superpuestos?", answer: "Las páginas en rangos superpuestos aparecen en múltiples archivos de salida, permitiéndote organizar contenido de manera flexible." },
    ],
  },
  compress: {
    howTo: {
      title: "Cómo Comprimir un PDF",
      steps: [
        "Carga un archivo PDF que desees hacer más pequeño.",
        "Elige un nivel de compresión: Máximo (archivo más pequeño), Recomendado (equilibrado), o Mínimo (mejor calidad).",
        "Selecciona un modo de compresión — basado en imágenes o rasterizar.",
        "Haz clic en 'Comprimir' y descarga tu archivo PDF más pequeño.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Tres niveles de compresión para equilibrar tamaño y calidad",
        "Optimización de imágenes reduce tamaños de imágenes incrustadas",
        "Muestra tamaños de archivo antes y después con reducción de porcentaje",
        "Modo rasterizar para compresión máxima cuando la calidad del texto es menos crítica",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "El nivel 'Recomendado' funciona mejor para la mayoría de documentos, reduciendo el tamaño en 40–70%",
        "Para PDFs con muchas fotos, la compresión 'Máxima' puede reducir dramáticamente el tamaño del archivo",
        "Usa compresión 'Mínima' cuando necesites preservar la nitidez de la imagen para impresión",
      ],
    },
    faq: [
      { question: "¿Qué tan pequeño será mi PDF después de la compresión?", answer: "Típicamente 40-70% más pequeño con el nivel Recomendado, dependiendo del contenido del archivo original y el método de compresión." },
      { question: "¿Se realiza la compresión localmente en mi dispositivo?", answer: "Sí. Toda la compresión ocurre en tu navegador sin datos enviados a servidores, manteniendo tus documentos completamente privados." },
      { question: "¿Puedo recuperar calidad después de comprimir con el nivel Máximo?", answer: "No. La compresión máxima es permanente. Si no estás seguro, usa el nivel Recomendado primero para probar la calidad." },
    ],
  },
  "pdf-to-jpg": {
    howTo: {
      title: "Cómo Convertir PDF a JPG",
      steps: [
        "Carga uno o más archivos PDF para convertir.",
        "Selecciona la calidad de salida: Alta (300 DPI), Media (150 DPI), o Baja (72 DPI).",
        "Haz clic en 'Convertir' para transformar cada página PDF en una imagen JPG.",
        "Descarga imágenes individuales o todas las imágenes como un archivo ZIP.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Convierte cada página de un PDF en una imagen JPG de alta calidad",
        "Tres presets de calidad para equilibrar claridad de imagen y tamaño de archivo",
        "Procesamiento por lotes — convierte múltiples PDFs a la vez",
        "Descarga páginas individuales o todas las páginas en un único archivo ZIP",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Usa calidad 'Alta' para impresión o presentaciones profesionales",
        "Elige 'Media' para uso web — buena calidad con tamaños de archivo razonables",
        "La calidad 'Baja' es perfecta para miniaturas o previsualizaciones rápidas",
      ],
    },
    faq: [
      { question: "¿Puedo convertir una sola página en lugar del PDF completo?", answer: "Sí. Selecciona páginas específicas durante la conversión o usa la opción de rango de página para convertir solo las páginas que necesitas." },
      { question: "¿Se almacenan mis PDFs después de la conversión?", answer: "No. Toda la conversión ocurre en tu navegador y los archivos se eliminan inmediatamente después de la descarga." },
      { question: "¿Cuál es la diferencia entre calidad Alta, Media y Baja?", answer: "Difieren en DPI (300, 150 y 72 respectivamente) y tamaño de archivo. Alta es mejor para impresión, Media para web, Baja para previsualizaciones." },
    ],
  },
  "jpg-to-pdf": {
    howTo: {
      title: "Cómo Convertir JPG a PDF",
      steps: [
        "Carga una o más imágenes JPG haciendo clic o arrastrando.",
        "Elige tamaño de página, orientación y configuración de márgenes.",
        "Organiza imágenes en tu orden preferido arrastrando.",
        "Haz clic en 'Convertir' para crear tu PDF, luego descárgalo.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Convierte una o múltiples imágenes JPG en un PDF",
        "Elige entre tamaños de página estándar (A4, Carta, Oficio) o ajuste a imagen",
        "Márgenes y orientación ajustables (vertical/horizontal)",
        "Opción para crear un PDF por imagen o fusionar todos en un documento",
        "Reordenamiento de arrastrar y soltar de imágenes",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Usa 'Ajustar a Imagen' para evitar recortes o bordes blancos",
        "Para álbumes de fotos, usa 'Fusionar todo' para crear un PDF único con todas las imágenes",
        "Ajusta márgenes a cero para impresión de borde a borde",
      ],
    },
    faq: [
      { question: "¿Puedo convertir otros formatos de imagen además de JPG?", answer: "Sí. Esta herramienta admite JPG, PNG, GIF, BMP, WebP y otros formatos de imagen comunes." },
      { question: "¿Cómo evito bordes blancos al convertir imágenes?", answer: "Usa la opción de tamaño de página 'Ajustar a Imagen' para ajustar automáticamente la página a las dimensiones de tu imagen." },
      { question: "¿Están mis datos de imagen seguros durante la conversión?", answer: "Absolutamente. Todas las conversiones ocurren localmente en tu navegador sin cargas a servidores externos." },
    ],
  },
  rotate: {
    howTo: {
      title: "Cómo Rotar Páginas PDF",
      steps: [
        "Carga un archivo PDF con páginas que necesiten rotación.",
        "Haz clic en los botones de rotación en miniaturas de página individual para rotarlas.",
        "Usa 'Rotar Todo' para aplicar la misma rotación a todas las páginas a la vez.",
        "Haz clic en 'Rotar' para aplicar cambios y descargar el PDF corregido.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Rota páginas individuales en sentido horario o antihorario en 90°",
        "Rota todas las páginas a la vez con un solo clic",
        "Las miniaturas de página visual muestran cambios de rotación en tiempo real",
        "Reinicia todas las rotaciones para comenzar de nuevo si es necesario",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Los documentos escaneados frecuentemente tienen páginas en orientaciones mixtas — corrígelas todas a la vez",
        "Usa rotación de página individual para documentos con páginas verticales y horizontales",
        "La rotación es permanente y se mantiene al imprimir o compartir el PDF",
      ],
    },
    faq: [
      { question: "¿Puedo rotar páginas en grados distintos a 90°?", answer: "Esta herramienta rota en incrementos de 90°. Para rotaciones de ángulo personalizado, considera usar la herramienta de edición." },
      { question: "¿Afectará la rotación al tamaño del archivo?", answer: "No. La rotación de página es un cambio de metadatos que no altera el contenido o tamaño del archivo." },
      { question: "¿Puedo deshacer rotaciones después de descargar?", answer: "Sí. Solo reabre el PDF en esta herramienta y rota las páginas de nuevo a su orientación original." },
    ],
  },
  "edit-pdf": {
    howTo: {
      title: "Cómo Editar un PDF",
      steps: [
        "Carga el PDF que deseas editar.",
        "Selecciona una herramienta de la barra de herramientas: texto, imagen, formas o dibujo.",
        "Haz clic en la página para colocar tu elemento, luego personaliza sus propiedades.",
        "Navega entre páginas y añade elementos según sea necesario.",
        "Haz clic en 'Aplicar' para guardar todos los cambios y descargar el PDF editado.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Añade texto con fuente personalizable, tamaño, color y alineación",
        "Inserta imágenes desde tu dispositivo en cualquier lugar de la página",
        "Dibuja líneas a mano alzada, rectángulos, elipses y líneas rectas",
        "Añade símbolos como marcas de verificación, cruces, estrellas y flechas",
        "Control de capas — lleva elementos al frente o envíalos hacia atrás",
        "Edición de múltiples páginas con fácil navegación de páginas",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Usa los controles de zoom para trabajar en detalles finos con precisión",
        "Haz doble clic en un elemento de texto para editar su contenido después de colocarlo",
        "Usa Ctrl+Z (Cmd+Z en Mac) para deshacer cualquier error al instante",
        "Símbolos como marcas de verificación son perfectos para rellenar campos de formulario",
      ],
    },
    faq: [
      { question: "¿Puedo editar el texto original en el PDF?", answer: "Esta herramienta añade nuevos elementos en lugar de editar texto existente. Para editar contenido original, usa exportar a Word y edita allí." },
      { question: "¿Se almacena o comparte mi PDF editado?", answer: "No. Todo ocurre en tu navegador. Tu PDF se procesa localmente y nunca se almacena en ningún servidor." },
      { question: "¿Cuántos elementos puedo añadir a una sola página?", answer: "No hay límite práctico, aunque añadir muchos elementos puede ralentizar el editor. Mantén tu documento ligero para mejor rendimiento." },
    ],
  },
  watermark: {
    howTo: {
      title: "Cómo Añadir una Marca de Agua a PDF",
      steps: [
        "Carga el PDF que deseas marcar con una marca de agua.",
        "Elige entre marca de agua de texto o imagen.",
        "Personaliza la marca de agua: establece texto/imagen, opacidad, posición, rotación y tamaño.",
        "Selecciona a qué páginas aplicar la marca de agua (todas o rango personalizado).",
        "Haz clic en 'Añadir Marca de Agua' y descarga el PDF marcado.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Marcas de agua de texto con fuente personalizable, tamaño, color y sombra",
        "Marcas de agua de imagen con escala y opacidad ajustables",
        "Nueve opciones de posición (esquinas, bordes y centro)",
        "Patrón de mosaico/baldosa para cubrir la página completa",
        "Control de capas — coloca marca de agua encima o debajo del contenido",
        "Selección de rango de página personalizado",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Establece opacidad a 20–30% para una marca de agua sutil que no obscurezca el contenido",
        "Usa la opción de mosaico/baldosa para cobertura de página completa en documentos confidenciales",
        "Una rotación diagonal (típicamente 45°) hace marcas de agua más difíciles de remover",
        "Coloca marcas de agua 'debajo del contenido' para que el texto permanezca completamente legible",
      ],
    },
    faq: [
      { question: "¿Puedo añadir diferentes marcas de agua a diferentes páginas?", answer: "Actualmente, la misma marca de agua se aplica a las páginas seleccionadas. Para marcas de agua diferentes, procesa el PDF múltiples veces." },
      { question: "¿Se imprimirá la marca de agua cuando alguien imprima el PDF?", answer: "Sí. Las marcas de agua están incrustadas en el PDF y aparecerán tanto en visualización digital como en copias impresas." },
      { question: "¿Puedo remover una marca de agua que añadí?", answer: "No. Una vez añadida, las marcas de agua son permanentes. Siempre mantén una copia de seguridad de tu PDF original antes de marcar." },
    ],
  },
  protect: {
    howTo: {
      title: "Cómo Proteger un PDF con Contraseña",
      steps: [
        "Carga el PDF que deseas proteger.",
        "Ingresa una contraseña y confírmala.",
        "Opcionalmente, configura permisos avanzados (impresión, copia, edición).",
        "Haz clic en 'Proteger' para encriptar el PDF con tu contraseña.",
        "Descarga el archivo protegido — los destinatarios necesitarán la contraseña para abrirlo.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Encriptación AES-256 para seguridad fuerte",
        "Indicador de fortaleza de contraseña (débil, medio, fuerte)",
        "Controles de permiso granulares para impresión, copia y modificación",
        "Permisos separados para impresión de baja y alta resolución",
        "Controles de permiso de relleno de formularios y accesibilidad",
        "Toda la encriptación ocurre en tu navegador — tu contraseña nunca sale de tu dispositivo",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Usa una contraseña fuerte con caracteres mixtos para máxima seguridad",
        "Restringe el permiso de 'copia' para prevenir extracción de texto del documento",
        "Permite 'impresión de baja resolución' solo si deseas prevenir reproducciones de alta calidad",
        "Recuerda tu contraseña — no hay opción de recuperación para archivos encriptados",
      ],
    },
    faq: [
      { question: "¿Qué tan fuerte es la encriptación AES-256?", answer: "AES-256 es encriptación de grado militar y se considera virtualmente imposible de romper con tecnología actual." },
      { question: "¿Qué hago si olvido la contraseña de mi PDF protegido?", answer: "No hay opción de recuperación de contraseña. La encriptación es permanente, así que guarda tu contraseña cuidadosamente." },
      { question: "¿Pueden los usuarios restringidos imprimir el documento incluso si la impresión está deshabilitada?", answer: "No. Cuando la impresión está restringida, el lector PDF evitará intentos de impresión sin importar qué haga el usuario." },
    ],
  },
  "delete-pages": {
    howTo: {
      title: "Cómo Eliminar Páginas de un PDF",
      steps: [
        "Carga un archivo PDF conteniendopáginas que desees eliminar.",
        "Haz clic en miniaturas de página para seleccionar las páginas que deseas eliminar.",
        "Usa botones de selección rápida: seleccionar todo, páginas impares, páginas pares, o deseleccionar todo.",
        "Haz clic en 'Eliminar' para remover páginas seleccionadas y descargar el resultado.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Miniaturas de página visual para fácil identificación",
        "Multi-selección con clic — elige exactamente qué páginas eliminar",
        "Opciones de selección rápida para páginas impares, pares, o todas",
        "Contador en tiempo real mostrando cuántas páginas se eliminarán vs. se mantendrán",
        "Comprobación de seguridad te evita eliminar accidentalmente todas las páginas",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Usa 'Seleccionar Páginas Pares' para remover rápidamente reversos en blanco de escaneos de dos caras",
        "Previsualiza cada miniatura cuidadosamente antes de eliminar para evitar eliminar páginas equivocadas",
        "Si necesitas mantener solo pocas páginas, considera usar 'Extraer Páginas' en su lugar — es más rápido",
      ],
    },
    faq: [
      { question: "¿Puedo deshacer la eliminación de página si cometí un error?", answer: "No. La eliminación de página es permanente. Mantén una copia de seguridad de tu PDF original o descárgalo de nuevo antes de eliminar páginas." },
      { question: "¿Hay un límite de cuántas páginas puedo eliminar a la vez?", answer: "No. Puedes eliminar tantas páginas como necesites de cualquier tamaño de PDF que tu navegador pueda manejar." },
      { question: "¿Afectará la eliminación de páginas significativamente al tamaño del archivo?", answer: "Sí. Remover páginas reduce el tamaño del archivo proporcionalmente al número de páginas eliminadas." },
    ],
  },
  "extract-images": {
    howTo: {
      title: "Cómo Extraer Imágenes de PDF",
      steps: [
        "Carga un archivo PDF conteniendoimágenes.",
        "Previsualiza todas las imágenes encontradas en el PDF con miniaturas.",
        "Selecciona las imágenes que deseas extraer o haz clic en 'Seleccionar Todo'.",
        "Elige formato de salida (JPG, PNG, o WebP) y haz clic en 'Extraer'.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Extrae todas las imágenes de un PDF en segundos",
        "Múltiples formatos de salida: JPG, PNG, y WebP",
        "Previsualiza miniaturas antes de la extracción",
        "Descarga imágenes individuales o todas como un archivo ZIP",
        "Preserva la calidad original de la imagen",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "El formato PNG preserva transparencia si está presente en las imágenes originales",
        "Usa formato WebP para uso web — tamaños de archivo más pequeños con alta calidad",
        "Extrae por lotes múltiples PDFs para ahorrar tiempo",
      ],
    },
    faq: [
      { question: "¿Reducirá la extracción de imágenes la calidad de las imágenes?", answer: "No. La extracción preserva la calidad original de las imágenes tal como aparecen en el PDF." },
      { question: "¿Puedo extraer imágenes sin cargarlas a un servidor?", answer: "Sí. Toda la extracción de imágenes ocurre localmente en tu navegador sin datos enviados a ningún servidor externo." },
      { question: "¿Qué pasa si mi PDF tiene imágenes de baja calidad?", answer: "Las imágenes extraídas tendrán la misma calidad que en el PDF original. La extracción no puede mejorar la calidad." },
    ],
  },
  "pdf-to-png": {
    howTo: {
      title: "Cómo Convertir PDF a PNG",
      steps: [
        "Carga tu archivo PDF para convertir.",
        "Selecciona calidad de resolución: Alta (300 DPI), Media (150 DPI), o Baja (72 DPI).",
        "Haz clic en 'Convertir' para transformar cada página PDF en una imagen PNG.",
        "Descarga archivos PNG individuales o todos como un único archivo ZIP.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Convierte todas las páginas PDF a imágenes PNG sin pérdidas",
        "Tres opciones de resolución para diferentes casos de uso",
        "Preserva transparencia para imágenes con canales alfa",
        "Conversión por lotes de múltiples PDFs a la vez",
        "Todas las imágenes disponibles como descarga ZIP",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "PNG es ideal cuando necesitas calidad sin pérdidas y soporte de transparencia",
        "Usa resolución 'Alta' para impresión y propósitos de archivo",
        "Elige resolución 'Baja' para miniaturas web y previsualizaciones",
      ],
    },
    faq: [
      { question: "¿Por qué elegir PNG sobre JPG para conversión de PDF?", answer: "PNG es sin pérdidas y preserva calidad perfecta y transparencia, mientras JPG usa compresión que puede reducir calidad." },
      { question: "¿Se realiza el procesamiento de conversión en tus servidores?", answer: "No. Toda la conversión ocurre completamente en tu navegador. Tus PDFs nunca se envían a ningún servidor." },
      { question: "¿Puedo convertir solo páginas específicas en lugar del PDF completo?", answer: "Sí. Puedes seleccionar rangos de página específicos durante la conversión para extraer solo las páginas que necesitas." },
    ],
  },
  "pdf-to-text": {
    howTo: {
      title: "Cómo Extraer Texto de PDF",
      steps: [
        "Carga un archivo PDF conteniendocontenido de texto.",
        "Elige método de extracción: copiar al portapapeles, descargar como TXT, o ver en editor.",
        "Opcionalmente selecciona páginas específicas o rango de página.",
        "Haz clic en 'Extraer' para obtener tu archivo de texto sin formato.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Extrae todo el texto de cualquier documento PDF",
        "Soporte para extracción de múltiples páginas con selección de rango de página",
        "Descarga como archivo de texto sin formato (.txt)",
        "Copia texto extraído directamente al portapapeles",
        "Preserva estructura de texto y formato",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Para PDFs escaneados sin texto seleccionable, usa la herramienta OCR en su lugar",
        "La extracción de texto funciona mejor con PDFs digitales creados desde procesadores de palabras",
        "Usa selección de rango de página para extraer solo el contenido que necesitas",
      ],
    },
    faq: [
      { question: "¿Por qué no puedo extraer texto de mi PDF escaneado?", answer: "Los PDFs escaneados son imágenes sin texto seleccionable. Usa la herramienta OCR en su lugar para extraer texto de documentos escaneados." },
      { question: "¿Puedo buscar en el texto extraído después de descargar?", answer: "Sí. El archivo TXT extraído es un documento de texto sin formato que puedes abrir en cualquier editor de texto y buscar normalmente." },
      { question: "¿Se mantiene mi texto privado durante la extracción?", answer: "Absolutamente. La extracción de texto ocurre completamente en tu navegador sin datos transmitidos a servidores externos." },
    ],
  },
  "html-to-pdf": {
    howTo: {
      title: "Cómo Convertir HTML a PDF",
      steps: [
        "Pega tu código HTML en el editor o carga un archivo HTML.",
        "Previsualiza tu documento en el área de previsualización en vivo.",
        "Configura tamaño de página, márgenes y orientación.",
        "Haz clic en 'Convertir' para generar tu PDF.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Convierte código HTML directamente a documentos PDF profesionales",
        "Soporte para estilos CSS e imágenes incrustadas",
        "Previsualización en vivo de tu PDF antes de la conversión",
        "Tamaños de página personalizables (A4, Carta, etc.) y márgenes",
        "Mantiene estructura y formato HTML",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Prueba tu HTML en el panel de previsualización antes de convertir",
        "Los recursos externos deben estar incrustados como URLs de datos para seguridad",
        "Usa CSS de impresión media para mejor estilo específico de PDF",
      ],
    },
    faq: [
      { question: "¿Puedo usar estilos CSS en mi conversión de HTML a PDF?", answer: "Sí. CSS estándar es soportado. Para mejores resultados, usa CSS específico de impresión (@media print) para optimizar el diseño del PDF." },
      { question: "¿Qué pasa si imágenes externas no cargan en mi HTML?", answer: "Incrusta imágenes como URLs de datos base64 en lugar de URLs externas para seguridad y confiabilidad en conversión de PDF." },
      { question: "¿Se almacena o comparte mi código HTML durante la conversión?", answer: "No. Tu HTML se procesa completamente en tu navegador y nunca se envía a ningún servidor." },
    ],
  },
  "png-to-pdf": {
    howTo: {
      title: "Cómo Convertir PNG a PDF",
      steps: [
        "Carga una o más imágenes PNG.",
        "Organiza imágenes en tu orden deseado arrastrando.",
        "Selecciona tamaño de página, orientación y márgenes.",
        "Haz clic en 'Convertir' para crear tu PDF y descárgalo.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Convierte imágenes PNG a PDF con soporte completo de transparencia",
        "Fusiona múltiples PNGs en un PDF único",
        "Elige tamaños de página estándar o dimensionamiento ajuste a imagen",
        "Configuración de márgenes y orientación ajustables",
        "Preserva calidad de imagen sin compresión",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Los PNGs con transparencia se preservarán en el PDF",
        "Usa 'Ajustar a Imagen' para evitar recortes no deseados",
        "Establece márgenes a cero para salida sin bordes",
      ],
    },
    faq: [
      { question: "¿Convertir PNG a PDF reduce la calidad de imagen?", answer: "No. La calidad PNG se preserva completamente ya que PNG ya es sin pérdidas y la conversión mantiene todos los detalles." },
      { question: "¿Permanecerán transparentes las áreas transparentes en mi PNG en el PDF?", answer: "Los PDFs no soportan transparencia verdadera como los PNGs. Las áreas transparentes típicamente se convertirán a blanco o tu color de fondo elegido." },
      { question: "¿Se realiza la conversión de manera segura en mi navegador?", answer: "Sí. Todas las conversiones ocurren localmente en tu navegador sin transmisión de datos a servidores externos." },
    ],
  },
  "image-to-pdf": {
    howTo: {
      title: "Cómo Convertir Imagen a PDF",
      steps: [
        "Carga archivos de imagen en cualquier formato (JPG, PNG, GIF, WebP, etc.).",
        "Arrastra para reordenar imágenes o usa acciones rápidas.",
        "Establece tamaño de página, orientación y márgenes.",
        "Haz clic en 'Convertir' para crear tu PDF.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Convierte cualquier formato de imagen a PDF",
        "Soporte para JPG, PNG, GIF, WebP, BMP y más",
        "Múltiples imágenes a PDF único u otro PDF por imagen",
        "Opciones de diseño de página flexible",
        "Preserva calidad de imagen en salida",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Para colecciones de fotos, fusiona todas las imágenes en un PDF",
        "Ajusta márgenes basándose en tus requerimientos de impresión",
        "Procesa por lotes múltiples imágenes en una operación",
      ],
    },
    faq: [
      { question: "¿Qué formatos de imagen son soportados?", answer: "JPG, PNG, GIF, WebP, BMP, TIFF, y la mayoría de formatos de imagen comunes son soportados." },
      { question: "¿Puedo crear un PDF por imagen en lugar de fusionar todos en uno?", answer: "Sí. Selecciona la opción para crear PDFs separados durante la conversión para obtener archivos PDF individuales." },
      { question: "¿Están mis datos de imagen seguros durante el proceso de conversión?", answer: "Absolutamente. Todo el procesamiento de imágenes ocurre en tu navegador sin cargas a ningún servidor externo." },
    ],
  },
  "webp-to-pdf": {
    howTo: {
      title: "Cómo Convertir WebP a PDF",
      steps: [
        "Carga uno o más archivos de imagen WebP.",
        "Previsualiza tus imágenes en el editor.",
        "Configura configuraciones de página PDF (tamaño, márgenes, orientación).",
        "Haz clic en 'Convertir' para generar tu archivo PDF.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Convierte imágenes de formato moderno WebP a PDF",
        "Procesamiento por lotes para múltiples archivos WebP",
        "Mantiene transparencia y calidad de WebP",
        "Configuración de diseño de página personalizable",
        "Conversión rápida con compresión óptima",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Las imágenes WebP son más pequeñas que JPEG — ideales para contenido optimizado para web",
        "La transparencia en archivos WebP se preserva en el PDF resultante",
        "Combina múltiples imágenes WebP en un documento único",
      ],
    },
    faq: [
      { question: "¿Por qué elegir imágenes WebP para conversión a PDF?", answer: "WebP es un formato moderno que ofrece mejor compresión que JPEG mientras mantiene calidad, resultando en tamaños de archivo más pequeños." },
      { question: "¿Se mantendrá la transparencia de archivos WebP en el PDF?", answer: "Los PDFs no soportan transparencia verdadera. Las áreas transparentes se convertirán a un color de fondo sólido." },
      { question: "¿Puedo convertir por lotes múltiples archivos WebP a la vez?", answer: "Sí. Puedes cargar y convertir múltiples archivos WebP en una operación, ya sea como PDFs separados o fusionados en uno." },
    ],
  },
  "tiff-to-pdf": {
    howTo: {
      title: "Cómo Convertir TIFF a PDF",
      steps: [
        "Carga tu archivo TIFF (página única o múltiple).",
        "Previsualiza el contenido y miniaturas de página.",
        "Opcionalmente selecciona páginas específicas a incluir.",
        "Haz clic en 'Convertir' para crear tu PDF.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Convierte imágenes TIFF de página única y múltiple a PDF",
        "Preserva compresión y calidad TIFF original",
        "Soporte para TIFF con etiquetas múltiples",
        "Selección de página durante la conversión",
        "Descarga de PDF de única u múltiple página",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Los TIFFs de múltiples páginas se convierten a PDFs de múltiples páginas automáticamente",
        "TIFF es excelente para documentos escaneados y archivos de alta calidad",
        "Selecciona solo las páginas que necesites para crear un PDF más pequeño",
      ],
    },
    faq: [
      { question: "¿Se preservará la compresión TIFF después de la conversión a PDF?", answer: "Sí. La compresión TIFF se mantiene donde sea posible para garantizar que el tamaño del archivo PDF permanezca eficiente." },
      { question: "¿Puedo convertir TIFF de múltiples páginas a PDF de múltiple página?", answer: "Sí. Los TIFF de múltiples páginas se convierten automáticamente a PDFs de múltiples páginas con la estructura de página preservada." },
      { question: "¿Es segura la conversión TIFF a PDF?", answer: "Completamente. Todas las conversiones ocurren localmente en tu navegador sin uploads a servidores externos." },
    ],
  },
  "heic-to-pdf": {
    howTo: {
      title: "Cómo Convertir HEIC a PDF",
      steps: [
        "Carga uno o más archivos de imagen HEIC.",
        "Previsualiza las imágenes en la herramienta.",
        "Configura opciones de PDF (tamaño de página, márgenes, orientación).",
        "Haz clic en 'Convertir' para crear tu PDF.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Convierte imágenes HEIC (formato de Apple) a PDF",
        "Soporte completo para HEIC con alta compresión",
        "Preserva la calidad de imagen durante la conversión",
        "Procesamiento por lotes de múltiples archivos HEIC",
        "Página única o múltiples imágenes en un PDF",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "HEIC es el formato estándar de Apple para fotos — ideal para convertir fotos de iPhone",
        "La conversión a PDF hace las imágenes compatibles con cualquier dispositivo",
        "Combina múltiples fotos de iPhone en un PDF de múltiple página",
      ],
    },
    faq: [
      { question: "¿Puedo convertir fotos de mi iPhone desde HEIC a PDF?", answer: "Sí. Las fotos de iPhone en formato HEIC se pueden convertir fácilmente a PDF con márgenes y diseño personalizables." },
      { question: "¿Se preservará la calidad de imagen en la conversión HEIC a PDF?", answer: "Sí. La conversión mantiene la calidad de imagen original. No hay pérdida de calidad en el proceso." },
      { question: "¿Necesito software especial para convertir HEIC?", answer: "No. Esta herramienta maneja la conversión HEIC directamente en tu navegador sin software adicional." },
    ],
  },
  "extract-pages": {
    howTo: {
      title: "Cómo Extraer Páginas de PDF",
      steps: [
        "Carga un archivo PDF con páginas que deseas extraer.",
        "Selecciona páginas individuales o especifica un rango usando la entrada de texto.",
        "Previsualiza las páginas que se extraerán.",
        "Haz clic en 'Extraer' para crear un nuevo PDF solo con las páginas seleccionadas.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Extrae páginas específicas en un nuevo PDF separado",
        "Soporte para selección individual y rango (ejemplo: 1-3, 5, 7-9)",
        "Previsualización visual antes de la extracción",
        "Preserva calidad y contenido originales",
        "Crea documentos más pequeños desde PDFs grandes",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Usa rangos para extraer rápidamente capítulos o secciones de documentos grandes",
        "La extracción es más rápida que la eliminación de páginas para documentos largos",
        "Crea múltiples PDFs especializados desde un documento maestro",
      ],
    },
    faq: [
      { question: "¿Puedo extraer un grupo de páginas no consecutivas?", answer: "Sí. Usa la notación de coma: 1, 3, 5-7, 10 para extraer exactamente las páginas que necesitas." },
      { question: "¿Se comprimirá el PDF extraído?", answer: "No. Las páginas extraídas se conservan con su calidad y tamaño originales." },
      { question: "¿Puedo extraer las mismas páginas múltiples veces?", answer: "Sí. Puedes especificar la misma página múltiples veces si necesitas duplicarla en la salida." },
    ],
  },
  "organize-pages": {
    howTo: {
      title: "Cómo Organizar Páginas PDF",
      steps: [
        "Carga un archivo PDF con páginas que deseas reorganizar.",
        "Arrastra miniaturas de página para reordenar o usa buttons de acción rápida.",
        "Duplica o elimina páginas usando las opciones de página individual.",
        "Haz clic en 'Guardar' para descargar el PDF reorganizado.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Reordenamiento de arrastrar y soltar de páginas PDF",
        "Duplica páginas con un clic",
        "Elimina páginas individuales directamente en el editor",
        "Previsualización en tiempo real de cambios",
        "Herramientas de acción rápida para reorganización común",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Usa duplicar para replicar portadas o páginas importantes",
        "Arrastra y suelta es más intuitivo para reordenamientos pequeños",
        "Guarda tu trabajo frecuentemente en caso de cambios accidentales",
      ],
    },
    faq: [
      { question: "¿Puedo mover una página a una posición específica?", answer: "Sí. Arrastra la miniatura a su nueva ubicación o usa controles de entrada numérica para posicionamiento preciso." },
      { question: "¿Es permanente la reorganización de páginas?", answer: "No hasta que descargues. Puedes deshacer cambios antes de guardar haciendo clic en recargar o usar Ctrl+Z." },
      { question: "¿Afectará la reorganización al tamaño del archivo PDF?", answer: "No. La reorganización solo cambia el orden de página — el tamaño del archivo permanece igual." },
    ],
  },
  "scan-to-pdf": {
    howTo: {
      title: "Cómo Convertir Escaneo a PDF",
      steps: [
        "Carga imágenes de escaneo (JPG, PNG) o PDF escaneado.",
        "Previsualiza todas las páginas escaneadas en el editor.",
        "Ajusta brillo, contraste u otras opciones de procesamiento si es necesario.",
        "Haz clic en 'Convertir a PDF' para crear un PDF de múltiple página limpio.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Convierte múltiples imágenes escaneadas en un PDF de múltiple página",
        "Procesamiento de imagen para mejorar escaneos de poca calidad",
        "Reordenamiento de página arrastrando",
        "Rotación automática para páginas escaneadas incorrectamente",
        "Compresión optimizada para documentos escaneados",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Ajusta brillo y contraste para legibilidad mejorada de escaneos oscuros",
        "Usa la detección automática de orientación para alinear páginas correctamente",
        "Batch procesa múltiples grupos de escaneos en una sesión",
      ],
    },
    faq: [
      { question: "¿Puedo mejorar la calidad de mis escaneos?", answer: "Sí. Ajusta brillo, contraste y otros parámetros para mejorar la legibilidad de escaneos oscuros o de poca calidad." },
      { question: "¿Se detectan y corrigen automáticamente las páginas de lado?", answer: "Sí. La detección automática de orientación rota las páginas incorrectamente escaneadas al ángulo correcto." },
      { question: "¿Qué tan comprimido estará mi PDF escaneado?", answer: "El PDF usa compresión optimizada manteniendo legibilidad. Puedes ajustar configuración de compresión según necesites." },
    ],
  },
  "page-numbers": {
    howTo: {
      title: "Cómo Añadir Números de Página a PDF",
      steps: [
        "Carga un archivo PDF que necesita numeración de página.",
        "Elige posición de número de página: encabezado o pie de página, esquina izquierda/derecha o centro.",
        "Personaliza el formato: número solamente, 'Página X', 'Página X de Y', etc.",
        "Selecciona desde qué página comenzar la numeración.",
        "Haz clic en 'Añadir Números de Página' para aplicar cambios.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Múltiples formatos de numeración: simple, con prefijo/sufijo, 'Page X of Y'",
        "Posicionamiento flexible: encabezado, pie de página, esquinas",
        "Personalización de fuente, tamaño y color",
        "Opción para empezar numeración en página específica",
        "Excluir páginas específicas de la numeración (portada, etc.)",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Usa 'Página X de Y' para documentos profesionales",
        "Coloca números en el pie de página para apariencia limpia",
        "Salta la numeración en la portada para una presentación más profesional",
      ],
    },
    faq: [
      { question: "¿Puedo comenzar la numeración desde una página que no sea la primera?", answer: "Sí. Selecciona la página inicial de numeración — útil si la portada no debe estar numerada." },
      { question: "¿Puedo usar diferentes formatos de número en diferentes secciones?", answer: "Actualmente, un formato se aplica al documento completo. Para formatos diferentes, procesa el PDF en múltiples pasos." },
      { question: "¿Aparecerán los números de página en impresión?", answer: "Sí. Los números de página se incrustan en el PDF y aparecerán tanto en visualización como en impresión." },
    ],
  },
  "edit-metadata": {
    howTo: {
      title: "Cómo Editar Metadatos de PDF",
      steps: [
        "Carga un archivo PDF cuyo metadatos deseas editar.",
        "Edita campos como Título, Autor, Asunto, Palabras Clave.",
        "Actualiza Fecha Creación y Fecha Modificación si es necesario.",
        "Haz clic en 'Guardar Metadatos' para actualizar el PDF.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Edita propiedades de documento estándar (Título, Autor, Asunto)",
        "Actualiza palabras clave para indexación y búsqueda mejorada",
        "Modifica fechas de creación y modificación",
        "Agrega creador personalizado e información de aplicación",
        "Preserva contenido de PDF mientras actualiza metadatos",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Usa palabras clave descriptivas para mejor búsqueda de documentos",
        "Mantén títulos concisos pero informativos",
        "Actualiza metadatos antes de compartir para mejor presentación profesional",
      ],
    },
    faq: [
      { question: "¿Puedo ver metadatos actuales de mi PDF?", answer: "Sí. La herramienta muestra todos los metadatos existentes que puedes editar o dejar sin cambios." },
      { question: "¿Afectará la edición de metadatos al contenido del PDF?", answer: "No. Solo se actualizan los metadatos del documento. El contenido, diseño y páginas permanecen sin cambios." },
      { question: "¿Puedo remover metadatos existentes?", answer: "Sí. Limpia cualquier campo para remover esos metadatos del PDF." },
    ],
  },
  "pages-per-sheet": {
    howTo: {
      title: "Cómo Imprimir Múltiples Páginas por Hoja",
      steps: [
        "Carga un archivo PDF que deseas imprimir en múltiples páginas por hoja.",
        "Selecciona número de páginas por hoja: 2, 4, 6, 8, o 9 páginas.",
        "Elige orientación de página: vertical u horizontal.",
        "Previsualiza el diseño de impresión.",
        "Haz clic en 'Aplicar' para crear el PDF de múltiples páginas por hoja.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Múltiples opciones de diseño: 2, 4, 6, 8, o 9 páginas por hoja",
        "Orientación de página flexible: vertical u horizontal",
        "Márgenes y espaciado ajustables alrededor de miniaturas",
        "Líneas divisoras opcionales entre páginas",
        "Previsualización de diseño de impresión",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Usa 4 páginas por hoja para un balance entre tamaño de fuente y economía de papel",
        "9 páginas por hoja es máximo — mejor para referencia rápida que lectura detallada",
        "Selecciona horizontal para documentos de página ancha",
      ],
    },
    faq: [
      { question: "¿Puedo usar diferentes números de páginas por hoja en diferentes secciones?", answer: "Actualmente, un layout se aplica al documento completo. Procesa secciones separadamente si necesitas layouts diferentes." },
      { question: "¿Afecta esto al contenido original del PDF?", answer: "No. El PDF de múltiples páginas es principalmente para impresión. El contenido permanece sin cambios." },
      { question: "¿Se preservará la legibilidad con 9 páginas por hoja?", answer: "Sí, pero el texto será pequeño. Este layout es mejor para referencia rápida o miniaturas." },
    ],
  },
  "header-footer": {
    howTo: {
      title: "Cómo Añadir Encabezado y Pie de Página a PDF",
      steps: [
        "Carga un archivo PDF donde deseas añadir encabezado y/o pie de página.",
        "Ingresa texto para encabezado (ej: título del documento, empresa, fecha).",
        "Ingresa texto para pie de página (ej: números de página, copyright, URL).",
        "Personaliza fuente, tamaño, color y alineación.",
        "Haz clic en 'Aplicar' para añadir encabezado/pie a todas las páginas.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Texto de encabezado personalizable para cada página",
        "Texto de pie de página con soporte para códigos dinámicos (página, fecha, etc.)",
        "Personalización de fuente, tamaño, color y alineación",
        "Márgenes ajustables para encabezado y pie de página",
        "Opción para excluir primera página de encabezado/pie",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Usa encabezados para títulos de documento o información de empresa",
        "Coloca números de página en pie de página para profesionalismo",
        "Incluye URL o fecha modificada en pie de página para rastreabilidad",
      ],
    },
    faq: [
      { question: "¿Puedo usar diferentes encabezados en diferentes páginas?", answer: "Actualmente, el mismo encabezado se aplica a todas las páginas. Procesa secciones separadamente si necesitas variaciones." },
      { question: "¿Puedo insertar automáticamente números de página en el pie de página?", answer: "Sí. Usa el código {page} para insertar automáticamente el número de página en el pie de página." },
      { question: "¿Afectarán los encabezados/pies a la impresión?", answer: "Sí. Los encabezados y pies de página aparecerán en impresión además de visualización digital." },
    ],
  },
  "web-optimize": {
    howTo: {
      title: "Cómo Optimizar PDF para Web",
      steps: [
        "Carga un archivo PDF que deseas optimizar para visualización web.",
        "Selecciona nivel de optimización: Alta (máxima compresión), Media (balance), o Baja (mínima compresión).",
        "Elige método de codificación: lineal, progresivo, u otro.",
        "Haz clic en 'Optimizar' para crear una versión web-friendly del PDF.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Compresión agresiva optimizada para carga web rápida",
        "Soporte para descarga progresiva (visualización mientras se descarga)",
        "Reducción de metadatos no esencial",
        "Optimización de imágenes para pantalla web",
        "Preserva compatibilidad con lectores PDF",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Alta optimización reduce tamaño significativamente pero puede afectar calidad de imagen",
        "Usa nivel Media para balance entre tamaño y calidad",
        "Descarga progresiva permite lectura mientras se descarga completamente",
      ],
    },
    faq: [
      { question: "¿Cuánto se reducirá el tamaño del archivo con optimización?", answer: "Típicamente 30-60% más pequeño dependiendo del contenido original y nivel de optimización seleccionado." },
      { question: "¿Afectará la optimización a la compatibilidad del PDF?", answer: "No. El PDF optimizado sigue siendo compatible con todos los lectores PDF estándar." },
      { question: "¿Puedo aún imprimir un PDF optimizado?", answer: "Sí, pero la calidad puede ser inferior a la del original, especialmente si se optimizó agresivamente." },
    ],
  },
  "pdf-to-pdfa": {
    howTo: {
      title: "Cómo Convertir PDF a PDF/A",
      steps: [
        "Carga un archivo PDF que deseas convertir a formato PDF/A para archivo.",
        "Elige versión PDF/A: PDF/A-1b (compatibilidad), PDF/A-2b (moderno), o PDF/A-3b (flexible).",
        "Revisa advertencias sobre fuentes o características no soportadas.",
        "Haz clic en 'Convertir a PDF/A' para crear la versión archivable.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Conversión a formato PDF/A para preservación de largo plazo",
        "Soporte para PDF/A-1b, PDF/A-2b, y PDF/A-3b",
        "Incrustación automática de fuentes requeridas",
        "Validación de compatibilidad before conversion",
        "Preservación de contenido y estructura",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "PDF/A es obligatorio para ciertos archivos gubernamentales y legales",
        "PDF/A-2b es recomendado para la mayoría de casos modernos",
        "Verifica que todas las características sean soportadas antes de convertir",
      ],
    },
    faq: [
      { question: "¿Cuál es la diferencia entre PDF y PDF/A?", answer: "PDF/A es un estándar ISO para preservación digital a largo plazo. Incrusta todas las fuentes y restringe características que podrían volverse obsoletas." },
      { question: "¿Perderé contenido al convertir a PDF/A?", answer: "Algunas características avanzadas pueden no ser soportadas. La herramienta te advertirá de incompatibilidades." },
      { question: "¿Necesito PDF/A para documentos normales?", answer: "No, solo si tienes requisitos de cumplimiento legal o archivos de largo plazo donde la compatibilidad futura es crítica." },
    ],
  },
  "pdf-to-word": {
    howTo: {
      title: "Cómo Convertir PDF a Word",
      steps: [
        "Carga un archivo PDF que deseas convertir a Word.",
        "Previsualiza el contenido para asegurar compatibilidad.",
        "Selecciona opciones de conversión: preservar formato, extraer texto, o detectar tablas.",
        "Haz clic en 'Convertir a Word' para generar el archivo DOCX.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Conversión de PDF a formato editable Microsoft Word (.docx)",
        "Preservación de formato de texto, tablas y estructura",
        "Soporte para múltiples idiomas",
        "Mantiene enlaces e imágenes donde es posible",
        "Crea documentos Word plenamente editables",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Funciona mejor con PDFs creados digitalmente, no escaneados",
        "Revisa el resultado en Word y realiza ajustes de formato si es necesario",
        "Para PDFs complejos, revisa tablas y gráficos después de la conversión",
      ],
    },
    faq: [
      { question: "¿Funcionará la conversión con PDFs escaneados?", answer: "No. Los PDFs escaneados son imágenes sin texto extraíble. Usa OCR primero o la herramienta PDF-to-Text." },
      { question: "¿Se preservarán las imágenes al convertir a Word?", answer: "Sí, las imágenes se preservan y se pueden reorganizar en Word después de la conversión." },
      { question: "¿Se preservarán los estilos y formato original?", answer: "Sí, pero algunos estilos PDF avanzados pueden necesitar ajuste en Word después de la conversión." },
    ],
  },
  "pdf-to-excel": {
    howTo: {
      title: "Cómo Convertir PDF a Excel",
      steps: [
        "Carga un archivo PDF conteniendotablas que deseas convertir a Excel.",
        "Previsualiza las tablas detectadas en el PDF.",
        "Selecciona qué tablas convertir si hay múltiples.",
        "Haz clic en 'Convertir a Excel' para generar el archivo XLSX.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Extrae tablas de PDF a hojas de cálculo Excel editables",
        "Detección automática de límites de tabla",
        "Preservación de estructura de fila/columna",
        "Soporte para múltiples tablas en un PDF",
        "Formato de datos mantenido en Excel",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Funciona mejor con PDFs de tablas limpias y bien estructuradas",
        "Revisa datos en Excel después de conversión para asegurar precisión",
        "Para tablas complejas con celdas combinadas, revisa y ajusta manualmente",
      ],
    },
    faq: [
      { question: "¿Puedo convertir múltiples tablas de un PDF?", answer: "Sí. Si el PDF contiene múltiples tablas, puedes convertir todas o seleccionar específicas." },
      { question: "¿Se preservarán los estilos de celda?", answer: "Estilos básicos se preservan, pero algunos formatos PDF especializados pueden necesitar ajuste en Excel." },
      { question: "¿Funcionará con tablas complejas con celdas combinadas?", answer: "Generalmente sí, pero las celdas combinadas pueden necesitar revisión manual en Excel después de la conversión." },
    ],
  },
  "pdf-to-ppt": {
    howTo: {
      title: "Cómo Convertir PDF a PowerPoint",
      steps: [
        "Carga un archivo PDF que deseas convertir a presentación PowerPoint.",
        "Previsualiza las páginas que se convertirán en diapositivas.",
        "Selecciona opciones: uno a uno (página por diapositiva) o temas de diseño.",
        "Haz clic en 'Convertir a PowerPoint' para generar el archivo PPTX.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Convierte páginas PDF a diapositivas PowerPoint editables",
        "Una página PDF = una diapositiva PowerPoint",
        "Preservación de contenido como imagen para edición posterior",
        "Imágenes y texto están disponibles para edición",
        "Crea presentaciones plenamente editables",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Después de la conversión, personaliza diseños y temas en PowerPoint",
        "Edita texto y agrupa objetos para mejor presentación",
        "Usa para convertir PDFs educativos en presentaciones interactivas",
      ],
    },
    faq: [
      { question: "¿Se editará el contenido después de la conversión?", answer: "Sí. Las diapositivas se crean como editables — puedes modificar texto, diseño y añadir animaciones en PowerPoint." },
      { question: "¿Qué pasa si el PDF es escaneado?", answer: "Los PDFs escaneados se convertirán como imágenes en diapositivas. Considera usar OCR primero si necesitas texto editable." },
      { question: "¿Puedo usar las diapositivas convertidas directamente en presentaciones?", answer: "Sí, pero típicamente necesitarás ajustar diseño, agregar animaciones y personalizar para una presentación profesional." },
    ],
  },
  "word-to-pdf": {
    howTo: {
      title: "Cómo Convertir Word a PDF",
      steps: [
        "Carga un archivo Word (DOC, DOCX) que deseas convertir a PDF.",
        "Previsualiza el documento para asegurar que se vea correcto.",
        "Selecciona opciones: preservar formato original, páginas específicas, o encriptación.",
        "Haz clic en 'Convertir a PDF' para generar el archivo.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Convierte documentos Word a PDF profesionales",
        "Preservación completa de formato, estilos y diseño",
        "Soporte para múltiples idiomas y fuentes",
        "Mantiene imágenes, tablas, y elementos de diseño",
        "Opcional: encriptar PDF con contraseña",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Revisa el documento Word en vista previa antes de convertir",
        "Ajusta márgenes en Word si necesitas control sobre espacios en blanco del PDF",
        "Usa encriptación si el documento contiene información sensible",
      ],
    },
    faq: [
      { question: "¿Se preservarán los estilos y formato de Word?", answer: "Sí. Todos los estilos, colores, fuentes e imagen se preservan en el PDF resultante." },
      { question: "¿Puedo convertir solo páginas específicas?", answer: "Sí. Durante la conversión, puedes seleccionar un rango de página específico." },
      { question: "¿Se pueden editar documentos Word después de convertir a PDF?", answer: "Los PDFs no son típicamente editables como Word. Para editar, convierte de nuevo a Word o usa herramientas de edición PDF." },
    ],
  },
  "excel-to-pdf": {
    howTo: {
      title: "Cómo Convertir Excel a PDF",
      steps: [
        "Carga un archivo Excel (XLS, XLSX) que deseas convertir a PDF.",
        "Previsualiza las hojas y selecciona cuáles incluir en el PDF.",
        "Configura opciones: tamaño de página, orientación, márgenes.",
        "Haz clic en 'Convertir a PDF' para generar el archivo.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Convierte hojas de cálculo Excel a PDF profesionales",
        "Soporte para múltiples hojas en una sola archivo PDF",
        "Preservación de formato de celda, bordes y colores",
        "Optimización automática para impresión",
        "Mantiene datos y tablas completamente",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Preajusta columnas en Excel para mejor visualización en PDF",
        "Usa vista previa de impresión en Excel antes de convertir",
        "Selecciona múltiples hojas para crear PDFs con todas tus datos",
      ],
    },
    faq: [
      { question: "¿Puedo convertir hojas específicas solo?", answer: "Sí. Durante la conversión, selecciona exactamente qué hojas incluir en el PDF." },
      { question: "¿Se preservarán las fórmulas de Excel?", answer: "Las fórmulas no se preservan en PDF (PDF muestra valores, no fórmulas). Usa esta función para compartir datos finales." },
      { question: "¿Qué pasa con gráficos y tablas dinámicas?", answer: "Gráficos estáticos se preservan. Las tablas dinámicas se convierten a sus valores actuales." },
    ],
  },
  "ppt-to-pdf": {
    howTo: {
      title: "Cómo Convertir PowerPoint a PDF",
      steps: [
        "Carga un archivo PowerPoint (PPT, PPTX) que deseas convertir a PDF.",
        "Previsualiza las diapositivas en el orden de presentación.",
        "Selecciona opciones: todas las diapositivas, rango específico, o incluir notas.",
        "Haz clic en 'Convertir a PDF' para generar el archivo.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Convierte presentaciones PowerPoint a PDF profesionales",
        "Una diapositiva = una página en el PDF",
        "Preservación de diseño, animaciones estáticas, y contenido",
        "Opción para incluir notas de presentación en PDF",
        "Mantiene calidad de imágenes y contenido multimedia",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Revisa la presentación en modo presentación antes de convertir",
        "Incluye notas si necesitas contexto adicional en el PDF",
        "PDFs son excelentes para compartir con personas que no tienen PowerPoint",
      ],
    },
    faq: [
      { question: "¿Se preservarán las animaciones en el PDF?", answer: "Las animaciones no se preservan — el PDF muestra el estado final de cada diapositiva. Los vídeos no se incrustan." },
      { question: "¿Puedo incluir notas del orador en el PDF?", answer: "Sí. Selecciona la opción para incluir notas de presentación en el PDF resultante." },
      { question: "¿Funcionará con PowerPoint en línea?", answer: "Sí, si puedes descargar el archivo PPTX primero. Luego cárgalo en esta herramienta para convertir a PDF." },
    ],
  },
  annotate: {
    howTo: {
      title: "Cómo Anotar un PDF",
      steps: [
        "Carga tu documento PDF.",
        "Selecciona la herramienta de anotación: resaltado, subrayado, tachado o notas.",
        "Haz clic y arrastra para anotar texto o agregar notas adhesivas.",
        "Haz clic en 'Guardar' para aplicar las anotaciones y descargar.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Resaltado de texto en múltiples colores",
        "Herramientas de marcado de texto: subrayado y tachado",
        "Notas adhesivas con texto y colores personalizables",
        "Herramientas de dibujo y marcado a mano alzada",
        "Exportación de anotaciones y vista de resumen",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Usa diferentes colores de resaltado para categorizar diferentes tipos de contenido",
        "Agrega notas detalladas a secciones importantes con notas adhesivas",
        "Exporta el resumen de anotaciones para referencia rápida",
      ],
    },
    faq: [
      { question: "¿Puedo eliminar anotaciones individuales sin eliminar todo el documento?", answer: "Sí. Puedes eliminar selectivamente anotaciones específicas mientras mantienes otras y el contenido original del PDF intacto." },
      { question: "¿Serán visibles las anotaciones si alguien más abre el PDF?", answer: "Sí. Una vez que las anotaciones se guardan en el PDF, serán visibles para cualquiera que abra el documento." },
      { question: "¿Se mantiene privado mi PDF anotado?", answer: "Sí. Todas las anotaciones ocurren en tu navegador. Tu PDF y las anotaciones nunca se envían a ningún servidor." },
    ],
  },
  booklet: {
    howTo: {
      title: "Cómo Crear un Folleto PDF",
      steps: [
        "Carga tu documento PDF.",
        "Selecciona el tamaño de página y margen de encuadernación.",
        "Elige el lado de encuadernación (izquierdo o derecho).",
        "Haz clic en 'Crear' para generar el diseño del folleto y descargar.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Organiza páginas para encuadernación de folleto",
        "Colocación automática de tapa delantera y trasera",
        "Margen de encuadernación personalizable",
        "Inserción de páginas en blanco para recuentos de páginas adecuados",
        "Salida lista para imprimir con marcas de corte",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Asegúrate de que el recuento de páginas sea divisible por 4 para un diseño de folleto adecuado",
        "Establece el margen de encuadernación según tu método de encuadernación",
        "Imprime a doble cara para una apariencia de folleto auténtica",
      ],
    },
    faq: [
      { question: "¿Por qué mi documento necesita ser divisible por 4 páginas?", answer: "Los folletos son hojas dobladas con 4 páginas por hoja. Tu contenido necesita llenar las hojas completamente para un diseño adecuado." },
      { question: "¿Puede la herramienta agregar automáticamente páginas en blanco si es necesario?", answer: "Sí. La herramienta de folleto inserta automáticamente páginas en blanco para que tu recuento de páginas sea divisible por 4." },
      { question: "¿Se realiza la creación del folleto localmente en mi navegador?", answer: "Sí. Todo el diseño y procesamiento del folleto ocurre completamente en tu navegador sin cargas en servidor." },
    ],
  },
  crop: {
    howTo: {
      title: "Cómo Recortar Páginas PDF",
      steps: [
        "Carga tu archivo PDF.",
        "Usa la herramienta de recorte para dibujar un rectángulo alrededor del contenido que deseas mantener.",
        "Aplica el mismo recorte a múltiples páginas o personaliza por página.",
        "Haz clic en 'Recortar' para eliminar márgenes y descargar el resultado.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Herramienta de recorte visual con interfaz de arrastrar para seleccionar",
        "Aplica el mismo recorte a todas las páginas o páginas individuales",
        "Recorte por porcentaje o medidas fijas",
        "Previsualiza recortes antes de aplicar",
        "Reinicia recortes e intenta nuevamente en cualquier momento",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "El recorte reduce el tamaño del archivo al eliminar márgenes innecesarios",
        "Usa recorte uniforme para una apariencia de documento consistente",
        "Perfecto para preparar documentos para lectura en tableta",
      ],
    },
    faq: [
      { question: "¿Cuánto puedo reducir el tamaño del archivo recortando?", answer: "La reducción del tamaño depende de cuánto recortes. Eliminar márgenes grandes puede reducir el tamaño entre 20-50% o más." },
      { question: "¿Puedo deshacer un recorte después de aplicarlo?", answer: "No. El recorte es permanente. Previsualiza tu recorte cuidadosamente antes de aplicar. Mantén una copia de seguridad del original." },
      { question: "¿Ocurre el recorte localmente en mi dispositivo?", answer: "Sí. Todas las operaciones de recorte ocurren en tu navegador sin cargas en servidor." },
    ],
  },
  flatten: {
    howTo: {
      title: "Cómo Aplanar un PDF",
      steps: [
        "Carga un PDF con campos de formulario, capas o anotaciones.",
        "Elige qué aplanar: formularios, capas, anotaciones, o todo.",
        "Haz clic en 'Aplanar' para fusionar todas las capas.",
        "Descarga el PDF aplanado.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Aplana campos de formulario interactivos en contenido estático",
        "Fusiona múltiples capas de PDF en una sola capa",
        "Elimina o aplana todas las anotaciones",
        "Reduce el tamaño del archivo al aplanar elementos innecesarios",
        "Preserva todo el contenido mientras elimina la editabilidad",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Aplana los PDFs antes de compartir para evitar ediciones accidentales",
        "Aplanar campos de formulario después de llenarlos hace que el PDF sea de solo lectura",
        "Reduce significativamente el tamaño del archivo en PDFs con múltiples capas",
      ],
    },
    faq: [
      { question: "¿Cuál es la diferencia entre aplanar y convertir a imágenes?", answer: "Aplanar fusiona capas mientras mantiene el texto como texto. Convertir a imágenes rasteriza todo, haciendo el texto no buscable." },
      { question: "¿Puedo deshacer el aplanamiento después de descargar el PDF?", answer: "No. El aplanamiento es permanente. Una vez aplanado, los campos de formulario y capas no pueden recuperarse. Mantén tu original." },
      { question: "¿Ocurre el aplanamiento localmente en mi dispositivo?", answer: "Sí. Todas las operaciones de aplanamiento se procesan completamente en tu navegador sin participación de servidor." },
    ],
  },
  grayscale: {
    howTo: {
      title: "Cómo Convertir PDF a Escala de Grises",
      steps: [
        "Carga tu archivo PDF a color.",
        "Elige el tipo de conversión a escala de grises: estándar o alta calidad.",
        "Previsualiza la apariencia convertida.",
        "Haz clic en 'Convertir' para aplicar y descargar.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Convierte PDFs a color completo a escala de grises",
        "Múltiples algoritmos de conversión para resultados óptimos",
        "Reduce significativamente el tamaño del archivo",
        "Preserva la calidad del texto e imagen",
        "Conversión por lotes de múltiples PDFs",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "La conversión a escala de grises reduce el tamaño del archivo entre 20-40%",
        "Perfecto para documentos destinados a impresión en blanco y negro",
        "Mejora la impresión en impresoras monocromáticas",
      ],
    },
    faq: [
      { question: "¿Puedo deshacer la conversión a escala de grises después de descargar?", answer: "No. La conversión a escala de grises es permanente y no puede revertirse. Mantén una copia de seguridad del PDF a color original." },
      { question: "¿Permanecerá el texto legible después de convertir a escala de grises?", answer: "Sí. La calidad del texto se preserva. La conversión a escala de grises solo afecta la información de color, no la nitidez del texto." },
      { question: "¿Se realiza la conversión de forma segura en mi navegador?", answer: "Sí. Toda la conversión a escala de grises ocurre localmente en tu navegador sin cargas a ningún servidor." },
    ],
  },
  ocr: {
    howTo: {
      title: "Cómo Realizar OCR en un PDF",
      steps: [
        "Carga un PDF escaneado o basado en imágenes.",
        "Selecciona el idioma OCR para reconocimiento de texto preciso.",
        "Elige el formato de salida: PDF buscable o texto extraído.",
        "Haz clic en 'OCR' para procesar y descargar resultados.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Reconocimiento Óptico de Caracteres para documentos escaneados",
        "Soporte para más de 40 idiomas para extracción de texto precisa",
        "Crea PDFs buscables con capa de texto oculto",
        "Extrae texto a archivo separado o mantén en PDF",
        "Procesamiento OCR por lotes para múltiples documentos",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Los PDFs buscables permiten selección y búsqueda de texto",
        "La mejor calidad de escaneo produce resultados OCR más precisos",
        "Perfecto para digitalizar documentos antiguos y archivo",
      ],
    },
    faq: [
      { question: "¿Qué tan preciso es el reconocimiento de texto OCR?", answer: "La precisión depende de la calidad del escaneo. Los escaneos claros y de alta resolución alcanzan una precisión superior al 95%. Los escaneos pobres pueden necesitar corrección manual." },
      { question: "¿Puedo usar OCR en documentos manuscritos?", answer: "OCR funciona mejor con texto impreso. El reconocimiento de contenido manuscrito es limitado y puede requerir transcripción manual." },
      { question: "¿Se realiza el procesamiento OCR localmente en mi navegador?", answer: "Sí. Todo el procesamiento OCR ocurre localmente en tu navegador sin cargas a ningún servidor externo." },
    ],
  },
  overlay: {
    howTo: {
      title: "Cómo Superponer PDFs",
      steps: [
        "Carga los archivos PDF base y PDF de superposición.",
        "Alinea la posición y escala de la superposición.",
        "Ajusta la opacidad si es necesario para efecto de transparencia.",
        "Haz clic en 'Aplicar' para fusionar y descargar.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Superpone un PDF sobre otro",
        "Posiciona y escala la superposición de forma independiente",
        "Ajuste de opacidad para efectos de fusión",
        "Aplicación de superposición página por página",
        "Superposición por lotes para múltiples documentos",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Usa superposiciones para agregar logos o marcas de agua a documentos por lotes",
        "Ajusta la opacidad para hacer que el contenido de la superposición sea semi-transparente",
        "Perfecto para fusionar formularios con documentos preimpresos",
      ],
    },
    faq: [
      { question: "¿En qué se diferencia la superposición de la fusión de PDFs?", answer: "La superposición coloca un PDF sobre otro con control de posicionamiento. La fusión combina páginas secuencialmente." },
      { question: "¿Puedo aplicar diferentes superposiciones a diferentes páginas?", answer: "Sí. Puedes aplicar diferentes superposiciones a rangos de página específicos en tu PDF base." },
      { question: "¿Se realiza el procesamiento de superposición localmente en mi dispositivo?", answer: "Sí. Todas las operaciones de superposición de PDF ocurren en tu navegador sin datos enviados a ningún servidor." },
    ],
  },
  redact: {
    howTo: {
      title: "Cómo Redactar un PDF",
      steps: [
        "Carga tu documento PDF.",
        "Usa la herramienta de redacción para seleccionar texto o áreas a ocultar.",
        "Aplica marcas de redacción (cajas negras sobre contenido).",
        "Haz clic en 'Aplicar' para eliminar permanentemente contenido y descargar.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Elimina permanentemente información sensible de PDFs",
        "Dibuja cajas de redacción sobre texto o imágenes",
        "Redacción por lotes con estilo consistente",
        "Personaliza el color y opacidad de la redacción",
        "Verifica redacciones antes de la exportación final",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Asegúrate de que las redacciones sean visibles con opacidad suficiente",
        "La redacción es permanente — haz copia de seguridad del original antes de aplicar",
        "Usa para eliminar datos personales antes de compartir documentos",
      ],
    },
    faq: [
      { question: "¿Es la redacción realmente permanente e irreversible?", answer: "Sí. El contenido redactado se elimina permanentemente del PDF y no puede recuperarse ni hacerse visible nuevamente." },
      { question: "¿Se mantiene privado mi documento sensible durante la redacción?", answer: "Sí. Toda la redacción ocurre localmente en tu navegador. Tu PDF nunca se envía a ni se almacena en ningún servidor." },
      { question: "¿Puedo redactar texto oculto que no sea aparente visualmente?", answer: "La redacción oculta contenido visible. Para eliminación de metadatos o texto oculto, usa la herramienta de eliminación de metadatos o aplana el PDF." },
    ],
  },
  repair: {
    howTo: {
      title: "Cómo Reparar un PDF",
      steps: [
        "Carga tu archivo PDF dañado o corrupto.",
        "Selecciona la opción de reparación: reparación automática o recuperación avanzada.",
        "Previsualiza el documento reparado.",
        "Haz clic en 'Reparar' para corregir y descargar el PDF restaurado.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Corrige archivos PDF dañados con reparación automática",
        "Recupera contenido legible de documentos dañados",
        "Soporte para varios tipos de corrupción de PDF",
        "Previsualiza el contenido reparado antes de guardar",
        "Intenta preservar el formato original",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "La reparación frecuentemente recupera la mayoría del contenido de archivos ligeramente dañados",
        "Se puede perder algo de formato en archivos muy dañados",
        "Mantén copias de seguridad de PDFs importantes para evitar corrupción",
      ],
    },
    faq: [
      { question: "¿Recuperará la reparación todo el contenido de un PDF dañado?", answer: "La mayoría del contenido típicamente se recupera, pero archivos muy dañados pueden perder algo de formato o páginas." },
      { question: "¿Qué causa la corrupción de PDF en primer lugar?", answer: "La corrupción puede resultar de descargas incompletas, errores de transferencia de archivos, daño del medio de almacenamiento o caídas de software." },
      { question: "¿Se realiza la reparación de PDF localmente sin cargar en servidor?", answer: "Sí. Todas las operaciones de reparación ocurren en tu navegador sin cargas a ningún servidor externo." },
    ],
  },
  resize: {
    howTo: {
      title: "Cómo Cambiar el Tamaño de un PDF",
      steps: [
        "Carga tu documento PDF.",
        "Selecciona el tamaño de página objetivo (A3, A4, A5, Carta, etc.).",
        "Elige la opción de escala: ajustar a página o mantener relación de aspecto.",
        "Haz clic en 'Cambiar Tamaño' para aplicar y descargar.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Cambia el tamaño a tamaños de papel estándar (serie A, Carta, Legal)",
        "Dimensiones de ancho y alto personalizadas",
        "Múltiples opciones de escala (estirar, ajustar, relación de aspecto)",
        "Procesamiento por lotes para múltiples PDFs",
        "Previsualiza antes de aplicar cambios",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Cambia el tamaño a A5 para documentos amigables con lectura móvil",
        "Usa la opción 'Ajustar' para preservar la relación de aspecto sin distorsión",
        "Cambia el tamaño de múltiples documentos por lotes para consistencia",
      ],
    },
    faq: [
      { question: "¿Afectará el cambio de tamaño a la calidad del texto o legibilidad?", answer: "Usar 'Ajustar' preserva la calidad del texto. Si usas 'Estirar' en relaciones de aspecto significativamente diferentes, el texto puede distorsionarse." },
      { question: "¿Puedo cambiar el tamaño de solo algunas páginas en un PDF multipágina?", answer: "La herramienta cambia el tamaño de todas las páginas a las mismas dimensiones. Para cambio de tamaño selectivo, divide y cambia el tamaño de páginas por separado." },
      { question: "¿Se realiza el cambio de tamaño de forma segura sin cargar a un servidor?", answer: "Sí. Todos los cambios de tamaño ocurren en tu navegador sin cargas de datos." },
    ],
  },
  sign: {
    howTo: {
      title: "Cómo Firmar un PDF",
      steps: [
        "Carga tu documento PDF.",
        "Elige el tipo de firma: dibujar, cargar imagen o escribir tu nombre.",
        "Coloca tu firma en la página del documento.",
        "Haz clic en 'Firmar' para aplicar y descargar el PDF firmado.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Dibuja firmas a mano alzada con ratón o pantalla táctil",
        "Carga imágenes de firma preexistentes",
        "Escribe texto de firma en varios tipos de letra",
        "Cambia el tamaño y reposiciona la firma en cualquier lugar de la página",
        "Múltiples firmas por documento",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "Dibuja firmas en un dispositivo de pantalla táctil para mejores resultados",
        "Carga imágenes de firma consistentes para una apariencia profesional",
        "Prueba la colocación de firma en la previsualización antes de finalizar",
      ],
    },
    faq: [
      { question: "¿Es una firma digital creada aquí legalmente vinculante?", answer: "Esta herramienta crea una firma visual colocada en el PDF. Para firmas digitales legalmente vinculantes, usa soluciones de firma digital certificadas." },
      { question: "¿Puedo firmar múltiples documentos a la vez?", answer: "Puedes firmar un documento a la vez. Después de firmar, puedes procesar documentos adicionales usando la misma firma." },
      { question: "¿Se guardan o comparten mis datos de firma?", answer: "No. Tu firma solo se usa para firmar el PDF que estás procesando. Nunca se almacena ni se envía a ningún servidor." },
    ],
  },
  translate: {
    howTo: {
      title: "Cómo Traducir un PDF",
      steps: [
        "Carga tu documento PDF.",
        "Selecciona el idioma de origen e idioma objetivo.",
        "Elige el formato de salida: PDF traducido o vista lado a lado.",
        "Haz clic en 'Traducir' para procesar y descargar resultados.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Traduce contenido de PDF a más de 100 idiomas",
        "Preserva el formato y diseño original",
        "Soporte para PDFs de texto e imagen",
        "Traducción impulsada por IA para resultados naturales",
        "Traducción por lotes de múltiples documentos",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "El preprocesamiento OCR mejora la precisión de traducción para PDFs escaneados",
        "Los documentos técnicos pueden necesitar revisión manual para precisión",
        "Usa la vista lado a lado para comparar original y traducción",
      ],
    },
    faq: [
      { question: "¿Qué tan precisa es la traducción de IA?", answer: "La precisión de traducción es alta para contenido general, pero documentos técnicos, médicos o legales deben ser revisados por un traductor profesional." },
      { question: "¿Se preservarán el formato y diseño después de la traducción?", answer: "Sí. La herramienta preserva el diseño original, tipos de letra y formato mientras traduce el contenido de texto." },
      { question: "¿Se mantiene privado mi documento PDF durante la traducción?", answer: "Sí. Toda la traducción ocurre localmente en tu navegador sin cargas a ningún servidor externo." },
    ],
  },
  unlock: {
    howTo: {
      title: "Cómo Desbloquear un PDF",
      steps: [
        "Carga tu archivo PDF protegido con contraseña.",
        "Ingresa la contraseña de usuario si el archivo está protegido con contraseña.",
        "La herramienta eliminará automáticamente las restricciones.",
        "Descarga tu PDF desbloqueado.",
      ],
    },
    features: {
      title: "Características principales",
      items: [
        "Elimina la protección con contraseña de PDFs",
        "Desactiva restricciones de impresión, copia y edición",
        "Soporte para contraseñas de usuario y propietario",
        "Desbloquea por lotes múltiples PDFs protegidos",
        "Sin pérdida de datos durante el proceso de desbloqueo",
      ],
    },
    tips: {
      title: "Consejos de uso",
      items: [
        "El desbloqueo requiere la contraseña correcta si está establecida",
        "Usa solo para archivos que posees o tienes permiso para modificar",
        "Los PDFs desbloqueados pueden editarse con otras herramientas",
      ],
    },
    faq: [
      { question: "¿Es legal desbloquear PDFs protegidos con contraseña?", answer: "Sí, si posees el documento o tienes permiso del propietario. Respeta los derechos de autor y restricciones de uso." },
      { question: "¿Puedo desbloquear un PDF si no tengo la contraseña?", answer: "No. Si se establece una contraseña, debes proporcionar la contraseña correcta. Esto protege la seguridad del documento." },
      { question: "¿Eliminará el desbloqueo mis restricciones de copia e impresión del PDF?", answer: "Sí. El desbloqueo elimina la mayoría de restricciones de permisos, permitiendo copiar, imprimir y editar." },
    ],
  },
};
