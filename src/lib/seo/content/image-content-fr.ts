import type { ToolContentMap } from "../tool-content-types";

export const imageContentFr: ToolContentMap = {
  resize: {
    howTo: {
      title: "Comment redimensionner une image",
      steps: [
        "Cliquez sur le bouton de chargement ou glissez-déposez votre image dans le canevas",
        "Sélectionnez les dimensions de redimensionnement souhaitées ou choisissez une taille prédéfinie",
        "Prévisualisez le résultat redimensionné en temps réel",
        "Téléchargez votre image redimensionnée au format souhaité",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Support de plusieurs formats de fichiers (JPG, PNG, WebP, GIF)",
        "Préservez le rapport d'aspect ou personnalisez les dimensions librement",
        "Redimensionnez par lots plusieurs images à la fois",
        "Aucune limite de taille de fichier — traitement entièrement côté client",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Choisissez des tailles communes comme 800x600 pour le web ou 1920x1080 pour les impressions",
        "Utilisez la mise à l'échelle en pourcentage pour maintenir le rapport d'aspect lors du redimensionnement",
        "Prévisualisez avant de télécharger pour assurer la qualité et les dimensions",
      ],
    },
    faq: [
      {
        question: "Le redimensionnement réduira-t-il la qualité de l'image ?",
        answer: "La réduction d'échelle préserve bien la qualité. La mise à l'échelle au-delà de la résolution d'origine peut causer un léger flou, mais ToolPop utilise des algorithmes optimisés pour minimiser la perte de qualité.",
      },
      {
        question: "Quels formats d'image puis-je redimensionner ?",
        answer: "Vous pouvez redimensionner des images JPG, PNG, WebP, GIF, BMP, TIFF et HEIC. Le format de sortie correspond à votre entrée.",
      },
      {
        question: "Mon image est-elle chargée sur un serveur ?",
        answer: "Non. Tout le redimensionnement se fait localement dans votre navigateur. Vos images ne quittent jamais votre appareil.",
      },
    ],
  },
  crop: {
    howTo: {
      title: "Comment recadrer une image",
      steps: [
        "Chargez votre image en sélectionnant un fichier ou en le glissant dedans",
        "Utilisez l'outil de recadrage pour sélectionner la zone que vous souhaitez conserver",
        "Ajustez le rectangle de recadrage en faisant glisser les coins ou les bords",
        "Téléchargez votre image recadrée lorsque vous êtes satisfait",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Modes de recadrage libre et à rapport fixe",
        "Aperçu en temps réel de la zone recadrée",
        "Support des rapports d'aspect courants (16:9, 4:3, 1:1)",
        "Fonctionnalité d'annulation et de réinitialisation",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez des rapports fixes pour maintenir la cohérence des publications sur les réseaux sociaux",
        "Positionnez les sujets importants aux points d'intersection pour une meilleure composition",
        "Sauvegardez le fichier d'origine avant recadrage au cas où vous en auriez besoin plus tard",
      ],
    },
    faq: [
      {
        question: "Puis-je recadrer avec un rapport d'aspect spécifique ?",
        answer: "Oui ! Vous pouvez choisir parmi les rapports d'aspect prédéfinis comme 16:9, 4:3 ou 1:1, ou recadrer librement sans restrictions.",
      },
      {
        question: "Le recadrage modifie-t-il la taille du fichier ?",
        answer: "Oui, la suppression de parties de l'image réduit généralement la taille du fichier, et vous pouvez ajuster la compression lors de la sauvegarde.",
      },
      {
        question: "Mon travail est-il sauvegardé dans le navigateur ?",
        answer: "Non, tout le recadrage se fait entièrement dans votre navigateur en temps réel. Votre image d'origine n'est jamais chargée ou stockée sur un serveur.",
      },
    ],
  },
  rotate: {
    howTo: {
      title: "Comment faire pivoter une image",
      steps: [
        "Chargez votre image dans l'outil",
        "Sélectionnez une rotation prédéfinie (90°, 180°, 270°) ou entrez un angle personnalisé",
        "Prévisualisez le résultat pivoté instantanément",
        "Téléchargez votre image pivotée",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Rotation par incrément de 90°, 180° ou 270° en un seul clic",
        "Rotation d'angle personnalisé pour des ajustements précis",
        "Option de recadrage automatique pour supprimer les bordures vides",
        "Préserve la qualité de l'image et les métadonnées",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez la rotation de 90° pour corriger les problèmes d'orientation paysage/portrait",
        "Les angles personnalisés fonctionnent bien pour les photos légèrement inclinées des anciennes numérisations",
        "Activez le recadrage automatique pour supprimer les bordures blanches qui apparaissent après la rotation",
      ],
    },
    faq: [
      {
        question: "Puis-je faire pivoter selon n'importe quel angle ?",
        answer: "Oui, vous pouvez faire pivoter par angles prédéfinis (90°, 180°, 270°) ou entrer n'importe quel angle personnalisé pour un inclinaison précis.",
      },
      {
        question: "Que se passe-t-il avec l'espace blanc après la rotation ?",
        answer: "Activez la fonctionnalité de recadrage automatique pour supprimer automatiquement les bordures blanches vides qui apparaissent après la rotation.",
      },
      {
        question: "La qualité de l'image diminuera-t-elle après la rotation ?",
        answer: "Non. La rotation est une opération sans perte qui ne dégrade pas la qualité de votre image.",
      },
    ],
  },
  flip: {
    howTo: {
      title: "Comment retourner une image",
      steps: [
        "Chargez ou glissez-déposez votre image dans l'éditeur",
        "Choisissez de retourner horizontalement ou verticalement",
        "Voir le résultat retourné immédiatement dans l'aperçu",
        "Enregistrez et téléchargez votre image retournée",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Retournement horizontal (effet miroir)",
        "Retournement vertical (à l'envers)",
        "Combinez les deux retournements pour une rotation de 180°",
        "Fonctionne avec tous les formats d'image",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Le retournement horizontal est utile pour créer des images miroir ou corriger le texte inversé",
        "Le retournement vertical aide à corriger les photos à l'envers",
        "Utilisez le retournement pour créer des designs ou des motifs symétriques",
      ],
    },
    faq: [
      {
        question: "Quelle est la différence entre retournement et rotation ?",
        answer: "Le retournement crée un effet miroir ou à l'envers, tandis que la rotation tourne l'image selon un angle. Combinez les deux retournements pour le même résultat qu'une rotation de 180°.",
      },
      {
        question: "Puis-je retourner plusieurs fois ?",
        answer: "Oui. Vous pouvez retourner horizontalement et verticalement dans n'importe quelle combinaison. Retourner deux fois dans la même direction revient l'image à son état d'origine.",
      },
      {
        question: "Stockez-vous mes images retournées ?",
        answer: "Jamais. Tout le retournement se fait instantanément dans votre navigateur et aucune image n'est envoyée à nos serveurs.",
      },
    ],
  },
  "photo-editor": {
    howTo: {
      title: "Comment éditer les photos",
      steps: [
        "Chargez votre photo dans l'éditeur",
        "Ajustez la luminosité, le contraste, la saturation et autres paramètres",
        "Appliquez des filtres ou affinez les canaux de couleur individuels",
        "Exportez votre photo éditée dans le format préféré",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Outils d'édition complets : luminosité, contraste, saturation, teinte",
        "Filtres professionnels et préréglages pour amélioration rapide",
        "Ajustements d'équilibre des couleurs et de température",
        "Vue de comparaison avant/après",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Commencez par de petits ajustements et augmentez graduellement pour éviter le surtraitement",
        "Utilisez la température de couleur pour corriger l'équilibre blanc dans les photos",
        "Appliquez les filtres comme point de départ, puis affinez les paramètres individuels",
      ],
    },
    faq: [
      {
        question: "Puis-je annuler les éditions pendant le travail ?",
        answer: "Oui. Vous pouvez annuler/rétablir les modifications étape par étape, ou réinitialiser complètement l'image pour recommencer.",
      },
      {
        question: "Comment comparer mes versions originale et éditée ?",
        answer: "Utilisez la vue de comparaison avant/après pour voir les modifications côte à côte et décider si les éditions vous conviennent.",
      },
      {
        question: "Mes photos sont-elles stockées après édition ?",
        answer: "Non. Toute l'édition se fait localement dans votre navigateur avec aperçus instantanés. Vos photos ne sont jamais envoyées à un serveur.",
      },
    ],
  },
  "jpg-to-png": {
    howTo: {
      title: "Comment convertir JPG en PNG",
      steps: [
        "Chargez votre image JPG dans le convertisseur",
        "La conversion se fait automatiquement en quelques secondes",
        "Prévisualisez l'image PNG convertie",
        "Cliquez sur télécharger pour enregistrer votre fichier PNG",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Conversion sans perte préservant la qualité de l'image",
        "Support des arrière-plans transparents en format PNG",
        "Conversion instantanée sans perte de qualité",
        "Tous les fichiers restent sur votre appareil pour la confidentialité",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Les fichiers PNG sont plus grands mais préservent la qualité — idéaux pour les graphiques et logos",
        "Utilisez PNG pour les images qui nécessitent de la transparence",
        "Les fichiers JPG sont plus appropriés pour les photographies si la taille du fichier compte",
      ],
    },
    faq: [
      {
        question: "Le PNG converti aura-t-il la même qualité que le JPG ?",
        answer: "Oui. La conversion JPG vers PNG est sans perte et préserve toute la qualité d'origine sans dégradation.",
      },
      {
        question: "Pourquoi convertir JPG en PNG ?",
        answer: "PNG supporte la transparence et est meilleur pour les graphiques, logos et icônes. JPG est meilleur pour les photos lorsque la taille du fichier compte.",
      },
      {
        question: "La conversion est-elle privée ?",
        answer: "Complètement. Votre JPG est converti localement dans votre navigateur et n'est jamais chargé sur nos serveurs.",
      },
    ],
  },
  "png-to-jpg": {
    howTo: {
      title: "Comment convertir PNG en JPG",
      steps: [
        "Sélectionnez et chargez votre image PNG",
        "Réglez le niveau de qualité de conversion si nécessaire",
        "Prévisualisez l'image JPG convertie",
        "Téléchargez votre fichier JPG",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez les images PNG en JPG avec qualité personnalisable",
        "Paramètres de compression réglables pour équilibrer la qualité et la taille du fichier",
        "Arrière-plan blanc automatiquement ajouté pour la transparence",
        "Support de la conversion par lots",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Le format JPG est idéal pour les photographies et réduit considérablement la taille du fichier",
        "Réglez la qualité sur 85-90 % pour le meilleur équilibre entre qualité et taille du fichier",
        "Utilisez JPG pour les images web pour améliorer la vitesse de chargement des pages",
      ],
    },
    faq: [
      {
        question: "Que se passe-t-il pour les zones transparentes lors de la conversion PNG en JPG ?",
        answer: "Les zones transparentes sont remplies d'un arrière-plan blanc, car JPG ne supporte pas la transparence.",
      },
      {
        question: "De combien mon fichier sera-t-il plus petit après la conversion ?",
        answer: "La compression JPG peut réduire la taille du fichier de 50 à 80 % par rapport à PNG, selon l'image et les paramètres de qualité.",
      },
      {
        question: "Puis-je modifier la qualité de la conversion JPG ?",
        answer: "Oui. Vous pouvez régler le niveau de qualité avant la conversion pour équilibrer la taille du fichier et la qualité de l'image.",
      },
    ],
  },
  "webp-to-jpg": {
    howTo: {
      title: "Comment convertir WebP en JPG",
      steps: [
        "Chargez votre image WebP dans le convertisseur",
        "Sélectionnez vos paramètres de qualité préférés",
        "Examinez l'aperçu du résultat JPG",
        "Téléchargez l'image JPG convertie",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Conversion rapide de WebP en JPG",
        "Maintient la qualité de l'image avec compression personnalisable",
        "Supporte les fichiers au format WebP moderne",
        "Aucune limite de taille de fichier ou de traitement",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "WebP est un format moderne avec meilleure compression — JPG pour la compatibilité",
        "Utilisez cet outil lorsque vous avez besoin de fichiers JPG pour les logiciels ou appareils plus anciens",
        "Le paramètre de qualité 85 % fournit généralement des résultats optimaux",
      ],
    },
    faq: [
      {
        question: "Pourquoi convertir WebP en JPG ?",
        answer: "JPG est plus universellement compatible avec les anciens logiciels et appareils, tandis que WebP est un format plus récent que de nombreux systèmes ne supportent pas encore.",
      },
      {
        question: "Vais-je perdre la qualité en convertissant WebP en JPG ?",
        answer: "Pas de perte significative. Vous pouvez régler le paramètre de qualité pour maintenir l'apparence d'origine de votre image.",
      },
      {
        question: "La conversion est-elle rapide ?",
        answer: "La conversion se fait instantanément dans votre navigateur sans chargement sur un serveur.",
      },
    ],
  },
  "webp-to-png": {
    howTo: {
      title: "Comment convertir WebP en PNG",
      steps: [
        "Chargez votre fichier WebP dans le convertisseur",
        "L'outil traite automatiquement votre fichier",
        "Prévisualisez le résultat de la conversion PNG",
        "Enregistrez et téléchargez votre image PNG",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Conversion sans perte de WebP à PNG",
        "Préservez la transparence et la qualité de l'image",
        "Traitement instantané sans chargement sur serveurs",
        "Support pour toutes les variantes WebP",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "PNG est plus universellement compatible avec les anciens logiciels et outils",
        "La transparence des fichiers WebP est préservée dans la sortie PNG",
        "Utilisez PNG pour les graphiques qui ont besoin de support de qualité et de transparence",
      ],
    },
    faq: [
      {
        question: "La conversion est-elle sans perte ?",
        answer: "Oui. La conversion WebP à PNG est entièrement sans perte et préserve toute la qualité et la transparence de l'image.",
      },
      {
        question: "La taille de mon fichier augmentera-t-elle ?",
        answer: "Généralement oui. Les fichiers PNG sont généralement plus grands que WebP, mais offrent une meilleure compatibilité logicielle.",
      },
      {
        question: "La conversion est-elle sûre ?",
        answer: "Oui. Votre fichier WebP est converti entièrement dans votre navigateur sans chargement ou stockage sur serveur.",
      },
    ],
  },
  "jpg-to-webp": {
    howTo: {
      title: "Comment convertir JPG en WebP",
      steps: [
        "Chargez votre image JPG dans le convertisseur",
        "Ajustez les paramètres de qualité pour contrôler la taille du fichier",
        "Prévisualisez le résultat de la conversion WebP",
        "Téléchargez votre fichier WebP",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez JPG au format WebP moderne pour meilleure compression",
        "Réduisez la taille du fichier jusqu'à 30 % par rapport à JPG",
        "Curseur de qualité réglable pour résultats optimaux",
        "Aucun chargement serveur — conversion entièrement côté client",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Le format WebP réduit considérablement la taille du fichier pour utilisation sur le web",
        "WebP est supporté par les navigateurs modernes mais vérifiez la compatibilité des versions plus anciennes",
        "La qualité 80 % en WebP correspond généralement à la qualité 90 % en JPG",
      ],
    },
    faq: [
      {
        question: "WebP est-il beaucoup plus petit que JPG ?",
        answer: "WebP réduit généralement la taille du fichier de 25-35 % par rapport à JPG aux niveaux de qualité similaires.",
      },
      {
        question: "Tous les navigateurs supportent-ils WebP ?",
        answer: "La plupart des navigateurs modernes supportent WebP, mais les versions plus anciennes ne le font pas. Vérifiez la compatibilité du navigateur avant d'utiliser WebP sur votre site.",
      },
      {
        question: "Puis-je ajuster la qualité de la conversion WebP ?",
        answer: "Oui. Utilisez le curseur de qualité pour trouver le bon équilibre entre la taille du fichier et la qualité de l'image pour vos besoins.",
      },
    ],
  },
  "png-to-webp": {
    howTo: {
      title: "Comment convertir PNG en WebP",
      steps: [
        "Sélectionnez et chargez votre image PNG",
        "Personnalisez les paramètres de qualité si souhaité",
        "Prévisualisez l'image WebP convertie",
        "Téléchargez votre fichier WebP optimisé",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez PNG en WebP avec meilleure compression",
        "Préservez la transparence au format WebP",
        "Réduction significative de la taille du fichier pour optimisation web",
        "Aperçu en temps réel avant téléchargement",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "WebP obtient une meilleure compression pour les images transparentes",
        "WebP est idéal pour les projets web modernes pour améliorer la vitesse des pages",
        "Fournissez toujours des fichiers de secours JPG/PNG pour la compatibilité des anciens navigateurs",
      ],
    },
    faq: [
      {
        question: "WebP supporte-t-il la transparence comme PNG ?",
        answer: "Oui. WebP préserve la transparence des fichiers PNG tout en obtenant des ratios de compression beaucoup meilleurs.",
      },
      {
        question: "Quelle réduction de taille de fichier puis-je m'attendre ?",
        answer: "WebP réduit généralement la taille du fichier PNG de 25-35 % pour les images transparentes et encore plus pour les photos.",
      },
      {
        question: "Mon fichier PNG est-il sûr lors de la conversion ?",
        answer: "Votre PNG est converti entièrement dans votre navigateur. Il n'est jamais envoyé à nos serveurs ni stocké nulle part.",
      },
    ],
  },
  "svg-to-png": {
    howTo: {
      title: "Comment convertir SVG en PNG",
      steps: [
        "Chargez votre fichier SVG dans le convertisseur",
        "Définissez la résolution et la taille de sortie souhaitées",
        "Prévisualisez l'image PNG rastérisée",
        "Téléchargez votre fichier PNG",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez les graphiques vectoriels SVG en images raster PNG",
        "Personnalisez la résolution et les dimensions de sortie",
        "Support des arrière-plans transparents",
        "Maintenez la qualité à différentes tailles",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez les paramètres de résolution supérieure pour une sortie PNG nette depuis SVG",
        "Les fichiers PNG sont plus grands que SVG mais compatibles avec toutes les plateformes",
        "Sauvegardez SVG si vous avez besoin de mettre à l'échelle à l'avenir — PNG est de taille fixe",
      ],
    },
    faq: [
      {
        question: "Quelle est la différence entre SVG et PNG ?",
        answer: "SVG est un format vectoriel qui se met à l'échelle infiniment sans perte de qualité. PNG est un format raster avec taille fixe. Convertissez en PNG lorsque vous avez besoin de compatibilité.",
      },
      {
        question: "Quelle résolution dois-je utiliser pour le PNG ?",
        answer: "Utilisez 1x ou 2x de densité de pixels selon vos besoins. L'utilisation web a généralement besoin de 72-96 DPI, l'impression a besoin de 300 DPI.",
      },
      {
        question: "La conversion se fait-elle sur vos serveurs ?",
        answer: "Non. La conversion SVG à PNG se fait entièrement dans votre navigateur pour des résultats instantanés et une confidentialité complète.",
      },
    ],
  },
  "svg-to-jpg": {
    howTo: {
      title: "Comment convertir SVG en JPG",
      steps: [
        "Chargez votre image SVG dans le convertisseur",
        "Choisissez les dimensions d'image souhaitées",
        "Prévisualisez le résultat JPG avec votre qualité choisie",
        "Téléchargez le fichier JPG converti",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Rastérisez les graphiques SVG au format JPG",
        "Résolution réglable pour qualité optimale",
        "Support de tous les éléments et effets SVG",
        "Option de couleur d'arrière-plan personnalisable",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "JPG fonctionne mieux pour les graphiques SVG avec dégradés ou photos",
        "Réglez la qualité sur 85-90 % pour des résultats professionnels",
        "Conservez le fichier SVG d'origine pour une évolutivité future",
      ],
    },
    faq: [
      {
        question: "Dois-je utiliser JPG ou PNG pour ma conversion SVG ?",
        answer: "Utilisez JPG pour des tailles de fichier plus petites et des images naturelles. Utilisez PNG pour les graphiques qui nécessitent de la transparence ou une qualité sans perte.",
      },
      {
        question: "Mon SVG perdra-t-il de la qualité quand il est converti en JPG ?",
        answer: "Aucune perte de qualité avec les bons paramètres. Vous pouvez ajuster la résolution et la qualité pour assurer des résultats nets.",
      },
      {
        question: "Puis-je ajuster la couleur de l'arrière-plan ?",
        answer: "Oui. Vous pouvez définir une couleur d'arrière-plan personnalisée avant la conversion, ou utiliser la transparence.",
      },
    ],
  },
  "gif-to-jpg": {
    howTo: {
      title: "Comment convertir GIF en JPG",
      steps: [
        "Chargez votre fichier GIF dans le convertisseur",
        "Choisissez quelle image utiliser, ou utilisez la première image par défaut",
        "Réglez les paramètres de qualité de sortie",
        "Téléchargez votre image JPG",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez le GIF animé ou statique au format JPG",
        "Sélectionnez une image spécifique depuis un GIF animé",
        "Paramètres de qualité et de compression personnalisables",
        "Support pour les GIF statiques et animés",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "JPG fonctionne bien pour les images GIF avec photographies ou images complexes",
        "La qualité 85 % est généralement suffisante pour l'utilisation web",
        "Sélectionnez la meilleure image des GIF animés avant la conversion",
      ],
    },
    faq: [
      {
        question: "Puis-je convertir un GIF animé en JPG ?",
        answer: "Oui. Vous pouvez sélectionner quelle image du GIF convertir en JPG, ou utiliser la première image par défaut.",
      },
      {
        question: "Vais-je perdre les informations d'animation ?",
        answer: "Oui. JPG est un format image fixe, donc une seule image est convertie. Pour la sortie animée, utilisez MP4 ou WebM à la place.",
      },
      {
        question: "Comment sélectionner une image spécifique de mon GIF ?",
        answer: "Après le chargement de votre GIF animé, vous pouvez prévisualisez et sélectionner l'image que vous souhaitez avant la conversion en JPG.",
      },
    ],
  },
  "bmp-to-jpg": {
    howTo: {
      title: "Comment convertir BMP en JPG",
      steps: [
        "Chargez votre fichier image BMP",
        "Ajustez les paramètres de compression et de qualité",
        "Examinez l'aperçu JPG",
        "Téléchargez votre fichier JPG optimisé",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez BMP non compressé au format JPG compressé",
        "Réduisez la taille du fichier de manière significative",
        "Maintenez la qualité de l'image avec paramètres réglables",
        "Processus de conversion rapide",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Les fichiers BMP sont généralement non compressés — JPG réduit la taille de manière dramatique",
        "Utilisez la qualité 85-90 % pour les meilleurs résultats avec les conversions BMP",
        "JPG est plus approprié pour les objectifs web et de partage",
      ],
    },
    faq: [
      {
        question: "Pourquoi mon fichier BMP est-il si volumineux ?",
        answer: "BMP est un format non compressé. La conversion en JPG réduit la taille du fichier de 50 à 90 % tout en maintenant la qualité.",
      },
      {
        question: "Le JPG ressemblera-t-il à mon BMP ?",
        answer: "Oui. Avec la qualité réglée sur 85 % ou supérieure, le JPG ressemblera pratiquement identique au BMP mais beaucoup plus petit.",
      },
      {
        question: "Où la conversion se fait-elle ?",
        answer: "Votre fichier BMP est converti entièrement dans votre navigateur. Il ne quitte jamais votre appareil.",
      },
    ],
  },
  "bmp-to-png": {
    howTo: {
      title: "Comment convertir BMP en PNG",
      steps: [
        "Sélectionnez et chargez votre image BMP",
        "L'outil traite automatiquement la conversion",
        "Prévisualisez votre résultat PNG",
        "Téléchargez votre fichier PNG",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez BMP en PNG avec compression sans perte",
        "Préservez la qualité de l'image sans perte de données",
        "Support des arrière-plans transparents",
        "Réduction efficace de la taille du fichier",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "PNG offre une meilleure compression que BMP tout en préservant toute la qualité",
        "Utilisez PNG pour les graphiques et les images qui ont besoin de transparence",
        "Les fichiers PNG sont appropriés pour une utilisation professionnelle",
      ],
    },
    faq: [
      {
        question: "La conversion BMP à PNG est-elle sans perte ?",
        answer: "Oui. La conversion PNG est complètement sans perte, préservant toutes les données d'image tout en réduisant la taille du fichier.",
      },
      {
        question: "PNG peut-il supporter la transparence comme j'en ai besoin ?",
        answer: "Oui. PNG supporte complètement les arrière-plans transparents, contrairement à BMP qui nécessite un arrière-plan solide.",
      },
      {
        question: "La conversion est-elle privée ?",
        answer: "Oui. Votre BMP est converti entièrement dans votre navigateur sans chargement ni stockage.",
      },
    ],
  },
  "color-palette": {
    howTo: {
      title: "Comment extraire la palette de couleurs",
      steps: [
        "Chargez votre image dans l'outil de palette de couleurs",
        "Le nombre de couleurs principal est automatiquement détecté",
        "Prévisualisez les couleurs extraites et leurs codes hexadécimaux",
        "Copiez ou téléchargez la palette de couleurs",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Extraction automatique des couleurs dominantes",
        "Codes hexadécimaux et RGB pour chaque couleur",
        "Importation/exportation de palettes",
        "Support des formats ASE, PNG et JSON",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez pour créer des schémas de couleurs cohérents pour vos designs",
        "Importez dans Adobe Illustrator ou d'autres outils de design",
        "Idéal pour l'analyse de couleurs et la correspondance des couleurs",
      ],
    },
    faq: [
      {
        question: "Puis-je exporter la palette dans un format spécifique ?",
        answer: "Oui. Supporté : ASE (Adobe), PNG, JSON et formats texte courants.",
      },
      {
        question: "Combien de couleurs sont extraites ?",
        answer: "Par défaut, les 5-10 couleurs dominantes sont extraites. Vous pouvez augmenter le nombre si nécessaire.",
      },
      {
        question: "Puis-je utiliser cette palette pour mon projet de design ?",
        answer: "Oui. La palette peut être importée directement dans la plupart des outils de design pour une utilisation cohérente des couleurs.",
      },
    ],
  },
  "color-replace": {
    howTo: {
      title: "Comment remplacer les couleurs",
      steps: [
        "Chargez votre image",
        "Sélectionnez la couleur à remplacer",
        "Choisissez la nouvelle couleur",
        "Ajustez la tolérance si nécessaire et téléchargez",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Remplacement facile des couleurs avec sélection visuelle",
        "Tolérance réglable pour cibler les variations de couleur",
        "Préservation des autres couleurs",
        "Aperçu en temps réel",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez pour changer les couleurs des logos ou des designs",
        "Ajustez la tolérance pour les variations de couleur subtiles",
        "Parfait pour la personnalisation rapide des images",
      ],
    },
    faq: [
      {
        question: "Puis-je remplacer plusieurs couleurs à la fois ?",
        answer: "Vous pouvez remplacer une couleur à la fois. Répétez le processus pour plusieurs couleurs.",
      },
      {
        question: "La qualité est-elle affectée par le remplacement ?",
        answer: "Non. Le remplacement de couleurs ne réduit pas la qualité de l'image.",
      },
      {
        question: "Le processus est-il réversible ?",
        answer: "Non. Une fois téléchargé, gardez l'original si vous souhaitez revenir en arrière.",
      },
    ],
  },
  "color-converter": {
    howTo: {
      title: "Comment convertir les formats de couleur",
      steps: [
        "Entrez votre valeur de couleur (HEX, RGB, HSL, etc.)",
        "Convertissez instantanément vers d'autres formats",
        "Copiez le résultat converti",
        "Utilisez dans votre projet",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Support pour HEX, RGB, HSL, CMYK et autres formats",
        "Conversion instantanée et bidirectionnelle",
        "Aperçu de couleur en temps réel",
        "Copie en un clic des codes couleur",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez HEX pour le web, RGB pour écrans, CMYK pour l'impression",
        "Convertissez facilement entre les formats pour différents outils",
        "Idéal pour les designers et développeurs",
      ],
    },
    faq: [
      {
        question: "Quels formats sont supportés ?",
        answer: "HEX, RGB, HSL, CMYK, HSLA, RGBA, HSV, et plus.",
      },
      {
        question: "Puis-je convertir CMYK en RGB ?",
        answer: "Oui. La conversion CMYK à RGB est supportée pour les adaptations impression vers écran.",
      },
      {
        question: "Les conversions sont-elles exactes ?",
        answer: "Oui. Les conversions utilisent les formules standard pour une précision mathématique.",
      },
    ],
  },
  "color-contrast-checker": {
    howTo: {
      title: "Comment vérifier le contraste des couleurs",
      steps: [
        "Sélectionnez la couleur de texte",
        "Sélectionnez la couleur de fond",
        "Consultez le ratio de contraste",
        "Vérifiez la conformité WCAG",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Calcul du ratio de contraste WCAG",
        "Vérification de conformité AA et AAA",
        "Aperçu avec des tailles de texte différentes",
        "Suggestions pour améliorer le contraste",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Visez un ratio d'au moins 4.5:1 pour le texte normal",
        "Utilisez 3:1 pour le texte large (18pt+)",
        "Vérifiez avant de publier vos designs",
      ],
    },
    faq: [
      {
        question: "Qu'est-ce qu'un bon ratio de contraste ?",
        answer: "4.5:1 pour le texte normal, 3:1 pour le texte large. AAA nécessite 7:1 pour une accessibilité maximale.",
      },
      {
        question: "Comment améliorer le contraste ?",
        answer: "Utilisez des couleurs plus claires ou plus foncées. Le vérificateur suggère des options.",
      },
      {
        question: "Pourquoi le contraste est-il important ?",
        answer: "Le contraste élevé est essentiel pour l'accessibilité et l'utilisation des personnes malvoyantes.",
      },
    ],
  },
  "color-blindness-simulator": {
    howTo: {
      title: "Comment simuler la cécité des couleurs",
      steps: [
        "Chargez votre image",
        "Sélectionnez le type de cécité des couleurs à simuler",
        "Prévisualisez l'apparence pour les utilisateurs daltoniens",
        "Ajustez votre design si nécessaire",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Simulation du daltonisme rouge-vert",
        "Simulation du daltonisme bleu-jaune",
        "Simulation de l'achromatopsie totale",
        "Comparaison avant/après",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Testez vos designs pour l'accessibilité des personnes daltoniennes",
        "Ne vous fiez pas uniquement aux couleurs pour les informations",
        "Utilisez des motifs ou du texte en supplément",
      ],
    },
    faq: [
      {
        question: "Quels types de daltonisme sont simulés ?",
        answer: "Protanopie (rouge), Deutéranopie (vert), Tritanopie (bleu), et achromatopsie.",
      },
      {
        question: "Comment puis-je rendre mon design plus accessible ?",
        answer: "Utilisez des contraste élevés, des motifs, du texte et évitez de vous fier uniquement aux couleurs.",
      },
      {
        question: "Combien de personnes sont daltoniennes ?",
        answer: "Environ 8 % des hommes et 0,5 % des femmes présentent une forme de daltonisme.",
      },
    ],
  },
  "color-palette-generator": {
    howTo: {
      title: "Comment générer une palette de couleurs",
      steps: [
        "Entrez une couleur de base ou générez une couleur aléatoire",
        "Choisissez une règle de couleur (complémentaire, analogue, triadique)",
        "Générez une palette cohérente",
        "Exportez ou utilisez dans votre projet",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Plusieurs modes d'harmonie de couleurs",
        "Génération aléatoire de palettes",
        "Codes HEX et RGB pour chaque couleur",
        "Export en plusieurs formats",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez les couleurs complémentaires pour le contraste",
        "Utilisez les couleurs analogues pour l'harmonie",
        "Parfait pour les designers qui ont besoin de palettes rapides",
      ],
    },
    faq: [
      {
        question: "Quelles règles d'harmonie sont disponibles ?",
        answer: "Complémentaire, Analogue, Triadique, Tétradique, Monochromatique et autres.",
      },
      {
        question: "Puis-je modifier la palette générée ?",
        answer: "Oui. Chaque couleur peut être réglée individuellement après génération.",
      },
      {
        question: "Comment puis-je utiliser la palette ?",
        answer: "Copie les codes HEX et utilisez-les dans votre conception ou exportez dans votre outil préféré.",
      },
    ],
  },
  compress: {
    howTo: {
      title: "Comment compresser une image",
      steps: [
        "Chargez votre image",
        "Sélectionnez le niveau de compression",
        "Prévisualisez l'image compressée",
        "Téléchargez le fichier optimisé",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Compression avec contrôle de qualité",
        "Support pour tous les formats courants",
        "Affichage de la réduction de taille",
        "Aperçu avant/après",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "La compression 75-85 % préserve généralement la qualité",
        "Utilisez pour optimiser les images pour le web",
        "Idéal pour réduire la taille de la galerie d'images",
      ],
    },
    faq: [
      {
        question: "Combien puis-je réduire la taille ?",
        answer: "Généralement 50-80 % de réduction selon les paramètres et l'image.",
      },
      {
        question: "La compression réduit-elle la qualité ?",
        answer: "Oui, mais le ratio qualité-taille peut être ajusté pour votre utilisation.",
      },
      {
        question: "La compression est-elle sans perte ?",
        answer: "Non. JPG utilise la compression avec perte. Utilisez PNG pour sans perte.",
      },
    ],
  },
  "profile-photo": {
    howTo: {
      title: "Comment créer une photo de profil",
      steps: [
        "Chargez votre photo",
        "Recadrez à la taille carrée",
        "Ajoutez un cadre ou un filtre si désiré",
        "Téléchargez votre photo de profil",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Recadrage automatique au carré",
        "Cadres et filtres de photo de profil",
        "Dimensions optimisées pour les réseaux sociaux",
        "Aperçu avant téléchargement",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez une image claire et bien éclairée",
        "Centrez votre visage dans le cadre",
        "Testez sur différentes plateformes",
      ],
    },
    faq: [
      {
        question: "Quelle est la taille recommandée ?",
        answer: "Généralement 400x400 pixels pour la plupart des plateformes.",
      },
      {
        question: "Puis-je utiliser d'autres formes que le carré ?",
        answer: "La plupart des profils utilisent le carré, mais le circulaire est une option.",
      },
      {
        question: "Comment puis-je améliorer ma photo ?",
        answer: "Utilisez les filtres disponibles ou l'éditeur de photos pour améliorer la luminosité et le contraste.",
      },
    ],
  },
  "round-image": {
    howTo: {
      title: "Comment arrondir les coins d'une image",
      steps: [
        "Chargez votre image",
        "Réglez le rayon d'arrondi des coins",
        "Choisissez la couleur de fond si nécessaire",
        "Téléchargez votre image arrondie",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Contrôle complet du rayon d'arrondi",
        "Option de fond transparent ou solide",
        "Arrondissement uniquement des coins spécifiques",
        "Aperçu en temps réel",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Les coins arrondis donnent un look moderne aux images",
        "Utilisez pour les avatars et les photos de profil",
        "Parfait pour les designs web et les applications",
      ],
    },
    faq: [
      {
        question: "Comment puis-je faire une image complètement ronde ?",
        answer: "Utilisez une image carrée et réglez le rayon d'arrondi sur la moitié de la largeur.",
      },
      {
        question: "Puis-je arrondissement uniquement certains coins ?",
        answer: "Oui. Chaque coin peut être réglé indépendamment.",
      },
      {
        question: "Quel arrière-plan dois-je utiliser ?",
        answer: "Utilisez transparent pour le web ou une couleur solide selon vos besoins.",
      },
    ],
  },
  "image-to-icon": {
    howTo: {
      title: "Comment convertir une image en icône",
      steps: [
        "Chargez votre image",
        "Sélectionnez les tailles d'icône",
        "Choisissez le format (ICO, PNG, SVG)",
        "Téléchargez votre pack d'icônes",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Génération multi-tailles d'icônes",
        "Support pour ICO, PNG, ICNS et SVG",
        "Compression optimale pour les icônes",
        "Export en tant que dossier d'icônes",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez des images carrées pour les meilleurs résultats",
        "Incluez des tailles multiples pour différentes utilisations",
        "Assurez-vous que le design est reconnaissable en petit",
      ],
    },
    faq: [
      {
        question: "Quelles tailles d'icône dois-je générer ?",
        answer: "Généralement 16x16, 32x32, 64x64, 128x128 et 256x256.",
      },
      {
        question: "Quel format dois-je utiliser ?",
        answer: "ICO pour Windows, PNG pour web et applications modernes, ICNS pour macOS.",
      },
      {
        question: "Puis-je utiliser un logo ?",
        answer: "Oui. Assurez-vous qu'il est reconnaissable à petite taille.",
      },
    ],
  },
  "split-image": {
    howTo: {
      title: "Comment diviser une image",
      steps: [
        "Chargez votre image",
        "Choisissez le nombre de colonnes et de lignes",
        "L'image est automatiquement divisée",
        "Téléchargez les pièces",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Division en grille personnalisable",
        "Export individuel ou en ZIP",
        "Aucune perte de qualité",
        "Parfait pour les puzzles ou les galeries",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Idéal pour créer des puzzles d'images",
        "Utilisé pour les galeries de publications multi-images",
        "Parfait pour les designs de bannières divisés",
      ],
    },
    faq: [
      {
        question: "Combien de sections puis-je créer ?",
        answer: "Vous pouvez créer jusqu'à 10x10 (100 sections).",
      },
      {
        question: "Les pièces chevauchent-elles ?",
        answer: "Non. Les pièces sont divisées de manière nette sans chevauchement.",
      },
      {
        question: "Puis-je obtenir les pièces dans un ordre spécifique ?",
        answer: "Oui. Les pièces sont numérotées de gauche à droite, de haut en bas.",
      },
    ],
  },
  "qr-code": {
    howTo: {
      title: "Comment créer un code QR",
      steps: [
        "Entrez l'URL ou le texte",
        "Personnalisez la couleur et la taille",
        "Générez le code QR",
        "Téléchargez l'image",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Génération de codes QR pour URL et texte",
        "Couleurs personnalisables",
        "Niveaux de correction d'erreur réglables",
        "Export en PNG ou SVG",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez pour les promotions et le marketing",
        "Testez le code QR avant impression",
        "Assurez-vous que le contraste est suffisant",
      ],
    },
    faq: [
      {
        question: "Combien de données puis-je encoder ?",
        answer: "Jusqu'à 4296 caractères selon le niveau de correction.",
      },
      {
        question: "Le code QR changera-t-il si j'ajoute des paramètres UTM ?",
        answer: "Oui. Chaque URL génère un code QR différent.",
      },
      {
        question: "Puis-je ajouter un logo au code QR ?",
        answer: "Oui. Un petit logo peut être superposé au centre.",
      },
    ],
  },
  "image-to-text": {
    howTo: {
      title: "Comment extraire le texte d'une image",
      steps: [
        "Chargez votre image contenant du texte",
        "L'OCR détecte et extrait le texte",
        "Prévisualisez le texte extrait",
        "Copiez ou téléchargez le résultat",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Reconnaissance optique des caractères (OCR)",
        "Support pour plusieurs langues",
        "Détection de mise en page",
        "Export en TXT ou PDF",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez des images de haute qualité pour de meilleurs résultats",
        "Les documents numérisés fonctionnent bien",
        "Corrigez les erreurs mineures dans le texte extrait",
      ],
    },
    faq: [
      {
        question: "Combien de langues sont supportées ?",
        answer: "Plus de 100 langues sont supportées par l'OCR.",
      },
      {
        question: "Quelle est la précision de l'extraction ?",
        answer: "Généralement 95-99 % pour les documents bien scannés.",
      },
      {
        question: "Les images sont-elles stockées ?",
        answer: "Non. L'extraction se fait localement dans votre navigateur.",
      },
    ],
  },
  "gif-to-mp4": {
    howTo: {
      title: "Comment convertir GIF en MP4",
      steps: [
        "Chargez votre fichier GIF",
        "Ajustez la qualité si désiré",
        "Prévisualisez la vidéo",
        "Téléchargez le fichier MP4",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Conversion de GIF animé en vidéo MP4",
        "Qualité et compression réglables",
        "Taille de fichier réduite de 80 %",
        "Parfait pour le web",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "MP4 a une meilleure compression que GIF",
        "Idéal pour le partage sur les réseaux sociaux",
        "Économisez la bande passante avec MP4",
      ],
    },
    faq: [
      {
        question: "Combien d'espace puis-je économiser ?",
        answer: "Généralement 70-80 % d'économie de taille par rapport aux GIF.",
      },
      {
        question: "MP4 est-il universel ?",
        answer: "Oui. Tous les navigateurs et appareils modernes supportent MP4.",
      },
      {
        question: "Puis-je ajouter du son ?",
        answer: "Non. Cette conversion préserve uniquement les images animées.",
      },
    ],
  },
  "heic-to-jpg": {
    howTo: {
      title: "Comment convertir HEIC en JPG",
      steps: [
        "Chargez votre fichier image HEIC",
        "Réglez la qualité si nécessaire",
        "Prévisualisez le JPG converti",
        "Téléchargez votre fichier JPG",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Conversion HEIC/HEIF en JPG compatible",
        "Qualité réglable",
        "Support pour plusieurs images",
        "Conversion rapide",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "HEIC est le format par défaut d'iPhone — convertissez pour la compatibilité",
        "JPG est universellement compatible",
        "Idéal pour partager les photos iPhone",
      ],
    },
    faq: [
      {
        question: "Pourquoi Apple utilise HEIC ?",
        answer: "HEIC offre une meilleure compression et une meilleure qualité que JPG.",
      },
      {
        question: "La conversion est-elle sans perte ?",
        answer: "Non. JPG utilise la compression avec perte, mais la qualité est configurable.",
      },
      {
        question: "Puis-je convertir par lots ?",
        answer: "Oui. Vous pouvez charger plusieurs images HEIC à la fois.",
      },
    ],
  },
  "heic-to-png": {
    howTo: {
      title: "Comment convertir HEIC en PNG",
      steps: [
        "Chargez votre fichier HEIC",
        "PNG est converti automatiquement",
        "Prévisualisez le résultat",
        "Téléchargez votre PNG",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Conversion sans perte HEIC à PNG",
        "Préserve la transparence",
        "Support de plusieurs images",
        "PNG plus universellement compatible",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "PNG convient aux graphiques et aux images avec transparence",
        "Taille de fichier plus grande que JPG mais sans perte",
        "Idéal pour l'édition ultérieure",
      ],
    },
    faq: [
      {
        question: "PNG sera-t-il plus volumineux que HEIC ?",
        answer: "Oui. PNG n'a pas de compression avec perte, donc il peut être plus volumineux.",
      },
      {
        question: "La conversion préserve-t-elle la transparence ?",
        answer: "Oui. Toute transparence dans le HEIC d'origine est préservée en PNG.",
      },
      {
        question: "Combien d'images puis-je convertir ?",
        answer: "Vous pouvez convertir plusieurs images en une seule opération.",
      },
    ],
  },
  "eps-to-jpg": {
    howTo: {
      title: "Comment convertir EPS en JPG",
      steps: [
        "Chargez votre fichier EPS",
        "Réglez la résolution de rastérisation",
        "Prévisualisez le JPG",
        "Téléchargez le fichier JPG",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Conversion de vecteur EPS en raster JPG",
        "Résolution réglable",
        "Qualité personnalisable",
        "Support complet des vecteurs",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez une résolution élevée pour les meilleurs résultats",
        "JPG est parfait pour les photos",
        "Conservez l'EPS si vous avez besoin de mettre à l'échelle à l'avenir",
      ],
    },
    faq: [
      {
        question: "EPS perdra-t-il sa qualité lors de la conversion ?",
        answer: "Avec la bonne résolution, aucune perte visible. Une résolution plus élevée garantit la nitidité.",
      },
      {
        question: "Quelle résolution dois-je utiliser ?",
        answer: "300 DPI pour l'impression, 150 DPI pour le web, 72 DPI pour les écrans.",
      },
      {
        question: "Puis-je reconvertir en EPS ?",
        answer: "Non. Utilisez toujours votre fichier EPS d'origine pour les modifications futures.",
      },
    ],
  },
  "eps-to-png": {
    howTo: {
      title: "Comment convertir EPS en PNG",
      steps: [
        "Chargez votre fichier EPS",
        "Sélectionnez les paramètres de résolution",
        "Prévisualisez le PNG",
        "Téléchargez le fichier PNG",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Conversion EPS vectoriel en PNG raster",
        "Résolution et taille personnalisables",
        "Support de la transparence",
        "Sans perte avec transparence",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "PNG préserve la transparence — utilisez pour les logos",
        "Résolution élevée pour l'impression, basse pour le web",
        "Parfait pour l'export de graphiques vectoriels",
      ],
    },
    faq: [
      {
        question: "PNG peut-il être aussi net que l'EPS original ?",
        answer: "Oui, avec la bonne résolution. Utilisez 300 DPI ou plus pour la nitidité maximale.",
      },
      {
        question: "Comment puis-je préserver la transparence ?",
        answer: "PNG supporte intrinsèquement la transparence — elle est préservée automatiquement.",
      },
      {
        question: "Quel format utiliser pour le web ?",
        answer: "PNG pour les images avec transparence, JPG pour les photos.",
      },
    ],
  },
  "eps-to-svg": {
    howTo: {
      title: "Comment convertir EPS en SVG",
      steps: [
        "Chargez votre fichier EPS",
        "L'outil trace automatiquement les vecteurs",
        "Prévisualisez le SVG",
        "Téléchargez le fichier SVG",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Conversion EPS à SVG vectoriel",
        "Traçage automatique des formes",
        "Escalabilité infinie",
        "Éditable dans les éditeurs vectoriels",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "SVG est parfait pour le web moderne",
        "Éditable dans Adobe Illustrator ou Inkscape",
        "Excellent pour les logos et graphiques",
      ],
    },
    faq: [
      {
        question: "Le SVG sera-t-il exactement comme l'EPS ?",
        answer: "Généralement oui. Le traçage automatique préserve la plupart des détails.",
      },
      {
        question: "Puis-je éditer le SVG converti ?",
        answer: "Oui. Le SVG est entièrement éditable dans n'importe quel éditeur vectoriel.",
      },
      {
        question: "Comment utiliser le SVG sur le web ?",
        answer: "Utilisez-le directement en HTML ou CSS. SVG se scale parfaitement.",
      },
    ],
  },
  "psd-to-jpg": {
    howTo: {
      title: "Comment convertir PSD en JPG",
      steps: [
        "Chargez votre fichier PSD",
        "Sélectionnez les calques si nécessaire",
        "Réglez la qualité",
        "Téléchargez le JPG flattened",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Conversion PSD Photoshop en JPG",
        "Fusion automatique des calques",
        "Qualité réglable",
        "Parfait pour l'export",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Idéal pour exporter les designs Photoshop",
        "Fusion automatique de tous les calques",
        "Parfait pour le partage rapide",
      ],
    },
    faq: [
      {
        question: "Les calques sont-ils fusionnés automatiquement ?",
        answer: "Oui. Tous les calques visibles sont fusionnés en une seule image JPG.",
      },
      {
        question: "Puis-je exporter des calques spécifiques ?",
        answer: "Non. Exportez la composition complète. Masquez les calques dans Photoshop si nécessaire.",
      },
      {
        question: "Quelle qualité dois-je utiliser ?",
        answer: "85-90 % JPG pour la plupart des cas d'usage web et partage.",
      },
    ],
  },
  "psd-to-png": {
    howTo: {
      title: "Comment convertir PSD en PNG",
      steps: [
        "Chargez votre fichier PSD",
        "Sélectionnez les paramètres",
        "Prévisualisez le PNG",
        "Téléchargez le PNG",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Conversion PSD en PNG sans perte",
        "Préserve la transparence",
        "Fusion des calques",
        "Idéal pour les graphiques",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "PNG préserve la transparence — parfait pour les logos",
        "Fusion automatique de tous les calques",
        "Utilisé couramment pour l'export de designs",
      ],
    },
    faq: [
      {
        question: "La transparence est-elle préservée ?",
        answer: "Oui. PNG supporte la transparence et elle est préservée automatiquement.",
      },
      {
        question: "Tous les effets de calque sont-ils fusionnés ?",
        answer: "Oui. Les ombres, lueurs et autres effets sont inclus dans l'export.",
      },
      {
        question: "Puis-je exporter avec des calques ?",
        answer: "Non. L'export fusionne tous les calques. Utilisez Photoshop pour les calques.",
      },
    ],
  },
  "tiff-to-jpg": {
    howTo: {
      title: "Comment convertir TIFF en JPG",
      steps: [
        "Chargez votre fichier TIFF",
        "Réglez la qualité de conversion",
        "Prévisualisez le JPG",
        "Téléchargez le fichier JPG",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Conversion TIFF en JPG compressé",
        "Qualité réglable",
        "Support multi-pages",
        "Réduction de taille significative",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "TIFF est haute qualité — JPG pour le partage",
        "Généralement 50-80 % de réduction de taille",
        "Idéal pour les documents numérisés",
      ],
    },
    faq: [
      {
        question: "TIFF multi-pages sera-t-il converti ?",
        answer: "Oui. La première page ou toutes les pages peuvent être converties.",
      },
      {
        question: "Combien d'espace vais-je économiser ?",
        answer: "Généralement 50-80 % selon la qualité TIFF et JPG.",
      },
      {
        question: "La qualité sera-t-elle acceptable ?",
        answer: "Oui. La qualité 85-90 % JPG est très acceptable pour la plupart des usages.",
      },
    ],
  },
  "tiff-to-png": {
    howTo: {
      title: "Comment convertir TIFF en PNG",
      steps: [
        "Chargez votre fichier TIFF",
        "Sélectionnez les paramètres",
        "Prévisualisez le PNG",
        "Téléchargez le PNG",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Conversion TIFF à PNG sans perte",
        "Préserve la qualité complète",
        "Support pour TIFF multi-pages",
        "Taille de fichier réduite",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "PNG préserve la qualité sans perte",
        "Meilleure compression que TIFF",
        "Idéal pour l'archivage et l'édition",
      ],
    },
    faq: [
      {
        question: "PNG sera-t-il plus petit que TIFF ?",
        answer: "Généralement oui. PNG utilise une meilleure compression que TIFF.",
      },
      {
        question: "La qualité sera-t-elle exacte ?",
        answer: "Oui. PNG est sans perte — la qualité est préservée exactement.",
      },
      {
        question: "Comment gérer les TIFF multi-pages ?",
        answer: "Vous pouvez exporter chaque page en tant que PNG séparé.",
      },
    ],
  },
  grayscale: {
    howTo: {
      title: "Comment convertir une image en niveaux de gris",
      steps: [
        "Chargez votre image couleur dans le convertisseur",
        "Sélectionnez la méthode de conversion en niveaux de gris si disponible",
        "Prévisualisez immédiatement le résultat en niveaux de gris",
        "Téléchargez votre image en niveaux de gris",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez les images couleur en noir et blanc",
        "Plusieurs algorithmes de conversion pour différents effets",
        "Ajustez la luminosité et le contraste après conversion",
        "Aperçu en temps réel",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Les niveaux de gris créent un look classique et professionnel pour les photographies",
        "Fonctionne bien pour les effets de style ancien ou les photos d'archives",
        "Ajustez le contraste après conversion pour un meilleur impact visuel",
      ],
    },
    faq: [
      {
        question: "Puis-je revenir en couleur après conversion en niveaux de gris ?",
        answer: "Non. La conversion en niveaux de gris est permanente une fois enregistrée. Conservez votre image couleur d'origine comme sauvegarde.",
      },
      {
        question: "Les niveaux de gris réduisent-ils la taille du fichier ?",
        answer: "Légèrement, puisque les images en niveaux de gris ont moins d'informations de couleur que les images couleur.",
      },
      {
        question: "Mon travail est-il privé pendant la conversion ?",
        answer: "Oui. La conversion en niveaux de gris se fait instantanément dans votre navigateur sans intervention de serveur.",
      },
    ],
  },
  "add-text": {
    howTo: {
      title: "Comment ajouter du texte à une image",
      steps: [
        "Chargez votre image dans l'éditeur de texte",
        "Cliquez pour placer le texte sur l'image et tapez votre message",
        "Personnalisez la police, la taille, la couleur et la position",
        "Téléchargez votre image avec le texte",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Plusieurs options de police pour différents styles",
        "Taille de texte, couleur et opacité ajustables",
        "Placez le texte n'importe où sur l'image",
        "Effets d'ombre et de contour pour le texte",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez des couleurs contrastées pour la lisibilité sur les arrière-plans image",
        "Ajoutez des ombres ou des contours au texte pour la visibilité sur les arrière-plans complexes",
        "Gardez le texte simple et lisible - testez différentes tailles",
      ],
    },
    faq: [
      {
        question: "Puis-je utiliser des polices personnalisées ?",
        answer: "Oui. Nous fournissons plusieurs familles de polices incluant serif, sans-serif et options décoratives.",
      },
      {
        question: "Comment rendre le texte lisible sur les images sombres ?",
        answer: "Utilisez des couleurs de texte claires, ajoutez des ombres ou des contours, et augmentez la taille du texte pour une meilleure visibilité.",
      },
      {
        question: "L'édition de texte est-elle effectuée de manière privée ?",
        answer: "Oui. Toute l'édition et le rendu de texte se font localement dans votre navigateur sans uploads sur serveur.",
      },
    ],
  },
  "add-border": {
    howTo: {
      title: "Comment ajouter une bordure à une image",
      steps: [
        "Chargez votre image dans l'outil de bordure",
        "Choisissez le style, la largeur et la couleur de la bordure",
        "Prévisualisez l'image avec bordure",
        "Téléchargez votre image avec bordure",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Différents styles de bordure : solid, pointillé, coins arrondis",
        "Options de largeur et de couleur de bordure ajustables",
        "Support pour différentes positions de bordure",
        "Aperçu en temps réel",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez des couleurs de bordure contrastantes pour que les images se démarquent",
        "Les coins arrondis donnent une apparence moderne et conviviale",
        "La largeur de la bordure doit être proportionnelle à la taille de l'image",
      ],
    },
    faq: [
      {
        question: "Quels styles de bordure sont disponibles ?",
        answer: "Vous pouvez choisir parmi les styles solid, pointillé, pointillé et ajouter des coins arrondis pour un look moderne.",
      },
      {
        question: "L'ajout d'une bordure modifie-t-il les dimensions de l'image ?",
        answer: "Oui. La bordure augmente la taille de l'image par la largeur de la bordure de tous les côtés.",
      },
      {
        question: "Puis-je prévisualiser la bordure avant de télécharger ?",
        answer: "Oui. L'outil affiche un aperçu en temps réel pour vous permettre d'ajuster la largeur et la couleur avant d'enregistrer.",
      },
    ],
  },
  blur: {
    howTo: {
      title: "Comment flouter une image",
      steps: [
        "Chargez votre image dans l'outil de flou",
        "Ajustez l'intensité du flou à l'aide du curseur",
        "Prévisualisez le résultat flou en temps réel",
        "Téléchargez votre image floutée",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Différents effets de flou : Gaussian, mouvement, zoom",
        "Intensité et rayon de flou ajustables",
        "Flou sélectif pour des zones d'image spécifiques",
        "Aperçu en temps réel et mises à jour instantanées",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Le flou Gaussian fonctionne bien pour adoucir les images entières",
        "Utilisez le flou de mouvement pour ajouter des effets dynamiques aux images statiques",
        "Floutez l'arrière-plan pour créer un effet de profondeur de champ",
      ],
    },
    faq: [
      {
        question: "Quelle est la différence entre le flou Gaussian et le flou de mouvement ?",
        answer: "Le flou Gaussian crée un effet d'adoucissement global, tandis que le flou de mouvement simule le mouvement dans une direction spécifique.",
      },
      {
        question: "Puis-je flouter uniquement l'arrière-plan ?",
        answer: "Oui. Vous pouvez flouter sélectivement des zones spécifiques tout en gardant les autres nettes pour un effet de profondeur de champ.",
      },
      {
        question: "Le floutage est-il effectué dans le cloud ?",
        answer: "Non. Tous les effets de flou sont appliqués localement dans votre navigateur avec rendu instantané et sans uploads.",
      },
    ],
  },
  filters: {
    howTo: {
      title: "Comment appliquer des filtres à une image",
      steps: [
        "Chargez votre image dans l'outil de filtres",
        "Parcourez et sélectionnez parmi différentes options de filtres",
        "Ajustez l'intensité du filtre si disponible",
        "Téléchargez votre image filtrée",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Plusieurs filtres professionnels : vintage, ton cool, ton chaud, etc.",
        "Force de filtre ajustable pour des effets subtils ou dramatiques",
        "Aperçu instantané des filtres appliqués",
        "Combinez plusieurs filtres pour des effets uniques",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Les filtres vintage ajoutent une apparence nostalgique et rétro aux photos",
        "Les filtres cool/chaud aident à corriger la température de couleur dans les photos",
        "Testez différentes combinaisons de filtres pour des effets créatifs",
      ],
    },
    faq: [
      {
        question: "Puis-je combiner plusieurs filtres ?",
        answer: "Oui. Vous pouvez appliquer plusieurs filtres séquentiellement pour créer des effets uniques et personnalisés.",
      },
      {
        question: "Les filtres affectent-ils la qualité de l'image ?",
        answer: "Non. Les filtres sont appliqués sans perte et préservent la qualité complète de votre image.",
      },
      {
        question: "Le traitement des filtres est-il confidentiel ?",
        answer: "Oui. Tous les filtres sont appliqués localement dans votre navigateur sans uploads.",
      },
    ],
  },
  vignette: {
    howTo: {
      title: "Comment ajouter une vignette à une image",
      steps: [
        "Chargez votre image dans l'éditeur de vignette",
        "Ajustez l'intensité et la taille de la vignette",
        "Prévisualisez l'effet de vignette sur votre image",
        "Téléchargez votre image avec vignette",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Luminosité et rayon de flou de vignette ajustables",
        "Contrôlez la taille et la plume de la vignette",
        "Plusieurs options de formes de vignette",
        "Aperçu en temps réel",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "La vignette attire l'attention vers le centre de votre image",
        "Utilisez une vignette subtile pour les photos professionnelles",
        "La vignette sombre crée des effets dramatiques et atmosphériques",
      ],
    },
    faq: [
      {
        question: "Qu'est-ce qu'une vignette et pourquoi l'utiliserais-je ?",
        answer: "Une vignette assombrit les bords d'une image pour attirer l'attention vers le centre. C'est utile pour les portraits et les effets artistiques.",
      },
      {
        question: "Puis-je ajuster la force de la vignette ?",
        answer: "Oui. Vous pouvez contrôler la luminosité, le rayon de flou, la taille et la plume pour créer des effets subtils ou dramatiques.",
      },
      {
        question: "Le vignetage se fait-il sur vos serveurs ?",
        answer: "Non. La vignette est appliquée instantanément dans votre navigateur avec aperçu en temps réel et sans intervention de serveur.",
      },
    ],
  },
  noise: {
    howTo: {
      title: "Comment ajouter du bruit à une image",
      steps: [
        "Chargez votre image dans l'outil de bruit",
        "Sélectionnez le type de bruit (grain, sel-poivre, etc.)",
        "Ajustez le niveau d'intensité du bruit",
        "Téléchargez votre image avec bruit ajouté",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Différents types de bruit : grain, sel-poivre, bruit Perlin",
        "Intensité et densité du bruit ajustables",
        "Contrôlez la distribution du bruit",
        "Aperçu en temps réel",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Le grain de film ajoute une apparence vintage et cinématographique aux photos",
        "Utilisez un bruit subtil pour réduire les zones lisses qui semblent artificielles",
        "Le bruit aide à réduire la postérisation dans les zones de gradient",
      ],
    },
    faq: [
      {
        question: "Pourquoi voudrais-je ajouter du bruit à une image ?",
        answer: "Le bruit ajoute du caractère vintage, crée un effet de grain de film et peut rendre les zones lisses plus naturelles.",
      },
      {
        question: "Quels sont les différents types de bruit ?",
        answer: "Grain (comme du film), sel-poivre (granuleux) et bruit Perlin (aspect organique) offrent différents effets esthétiques.",
      },
      {
        question: "Le traitement du bruit est-il effectué de manière privée ?",
        answer: "Oui. Tous les effets de bruit sont générés et appliqués localement dans votre navigateur avec résultats instantanés.",
      },
    ],
  },
  sharpen: {
    howTo: {
      title: "Comment affûter une image",
      steps: [
        "Chargez votre image dans l'outil d'affûtage",
        "Ajustez le niveau de netteté à l'aide du curseur",
        "Comparez les versions originales et affûtées",
        "Téléchargez votre image affûtée",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Intensité de netteté ajustable",
        "Options d'affûtage masque flou et rehaussement de contour",
        "Vue de comparaison avant/après",
        "Ajustements d'aperçu en temps réel",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez l'affûtage pour améliorer les détails dans les photos légèrement floues",
        "Évitez la suraffûtage qui crée des halos autour des bords",
        "Fonctionne mieux sur les images avec une bonne mise au point initiale",
      ],
    },
    faq: [
      {
        question: "L'affûtage peut-il corriger une photo floue ?",
        answer: "L'affûtage aide à améliorer les détails dans les images douces mais ne réparera pas les photos gravement floues. Utilisez-le sur des images légèrement floues.",
      },
      {
        question: "Quelle est la différence entre le masque flou et l'affûtage par rehaussement de contour ?",
        answer: "Le masque flou est une méthode d'affûtage traditionnelle, tandis que le rehaussement de contour offre un renforcement des bords plus contrôlé.",
      },
      {
        question: "L'affûtage est-il appliqué dans votre cloud ?",
        answer: "Non. L'affûtage se fait entièrement dans votre navigateur avec comparaison avant/après en temps réel.",
      },
    ],
  },
  sepia: {
    howTo: {
      title: "Comment appliquer un filtre sépia",
      steps: [
        "Chargez votre image dans l'outil de filtre sépia",
        "Ajustez l'intensité du sépia selon votre préférence",
        "Prévisualisez l'effet sépia vintage",
        "Téléchargez votre image teintée en sépia",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Effet de ton sépia classique pour une apparence vintage",
        "Intensité de sépia ajustable de subtile à forte",
        "Maintient le contraste et les détails de l'image",
        "Fonctionne avec tous les formats d'image",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Le sépia donne aux photos un look chaud et antique parfait pour les effets de style ancien",
        "L'intensité inférieure crée une sensation vintage subtile",
        "Combinez avec des superpositions de texture pour un effet de vieille photo authentique",
      ],
    },
    faq: [
      {
        question: "Qu'est-ce que le sépia et quand l'utilise-t-on ?",
        answer: "Le sépia est un ton chaud et brunâtre qui crée un effet de photo vintage et antique. Parfait pour les looks nostalgiques ou historiques.",
      },
      {
        question: "Puis-je contrôler la quantité de sépia appliquée ?",
        answer: "Oui. Vous pouvez ajuster l'intensité du sépia de la chaleur subtile à un effet vintage fort selon votre préférence.",
      },
      {
        question: "L'effet de sépia est-il traité de manière privée ?",
        answer: "Oui. La teinte sépia est appliquée instantanément dans votre navigateur sans uploads sur serveur ni stockage de données.",
      },
    ],
  },
  invert: {
    howTo: {
      title: "Comment inverser les couleurs de l'image",
      steps: [
        "Chargez votre image dans l'outil d'inversion",
        "Cliquez pour inverser toutes les couleurs",
        "Prévisualisez l'effet négatif",
        "Téléchargez votre image inversée",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Inversion complète des couleurs (effet négatif)",
        "Préserve la qualité et les détails de l'image",
        "Opération en un clic pour des résultats instantanés",
        "Fonctionne avec tous les types d'image",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "L'inversion des couleurs crée un effet négatif utile à des fins artistiques",
        "Utile pour convertir les négatifs numérisés en positifs",
        "Peut créer des effets créatifs intéressants en combinaison avec d'autres outils",
      ],
    },
    faq: [
      {
        question: "Que fait l'inversion des couleurs ?",
        answer: "L'inversion des couleurs crée un effet négatif en inversant toutes les couleurs à leurs opposés (le rouge devient cyan, etc.).",
      },
      {
        question: "Puis-je inverser seulement certaines couleurs ?",
        answer: "Non. L'inversion est un changement de couleur complet affectant tous les pixels de manière égale dans une opération.",
      },
      {
        question: "L'inversion est-elle effectuée de manière privée ?",
        answer: "Oui. L'inversion se fait instantanément dans votre navigateur sans uploads ni traitement sur serveur.",
      },
    ],
  },
  combine: {
    howTo: {
      title: "Comment combiner des images",
      steps: [
        "Chargez deux images ou plus à combiner",
        "Choisissez la mise en page : arrangement horizontal, vertical ou grille",
        "Ajustez l'espacement et l'alignement entre les images",
        "Téléchargez votre image combinée",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Plusieurs options de mise en page : côte à côte, pile verticale, grille",
        "Espacement et alignement ajustables",
        "Options de dimensionnement automatique ou manuel",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez des images de tailles similaires pour un meilleur alignement",
        "Expérimentez avec différentes mises en page pour des compositions intéressantes",
        "Ajustez l'espacement pour contrôler le flux visuel",
      ],
    },
    faq: [
      {
        question: "Puis-je combiner des images de tailles différentes ?",
        answer: "Oui. L'outil redimensionnera automatiquement les images ou vous permettra un ajustement manuel pour adapter différentes tailles.",
      },
      {
        question: "Combien d'images puis-je combiner ?",
        answer: "Vous pouvez combiner 2 images ou plus dans diverses mises en page (2x2, 3x3, etc.).",
      },
      {
        question: "La combinaison d'images est-elle effectuée de manière privée ?",
        answer: "Oui. Toute la combinaison d'images se fait instantanément dans votre navigateur sans uploads ou traitement cloud.",
      },
    ],
  },
  collage: {
    howTo: {
      title: "Comment créer un collage photo",
      steps: [
        "Chargez plusieurs photos dans le créateur de collage",
        "Choisissez un modèle de collage ou créez une mise en page personnalisée",
        "Glissez pour réorganiser les photos et ajustez l'espacement",
        "Téléchargez votre collage terminé",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Plusieurs modèles de collage prédéfinis",
        "Arrangement de photos par glisser-déposer",
        "Espacement et bordures ajustables",
        "Personnalisation de la couleur de fond",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez 4-9 photos pour un collage visuellement équilibré",
        "Choisissez des photos de style similaire ou avec des tons de couleur coordonnés pour la cohésion",
        "Ajoutez des bordures subtiles pour séparer les photos et ajouter de la définition",
      ],
    },
    faq: [
      {
        question: "Combien de photos puis-je ajouter à un collage ?",
        answer: "La plupart des modèles supportent 4-12 photos. Vous pouvez choisir un modèle qui correspond à votre nombre de photos.",
      },
      {
        question: "Puis-je personnaliser l'espacement entre les photos ?",
        answer: "Oui. Vous pouvez ajuster l'espacement et les bordures pour créer votre mise en page préférée.",
      },
      {
        question: "Mon collage est-il créé de manière privée ?",
        answer: "Oui. Toute la création du collage se fait instantanément dans votre navigateur sans uploads ni traitement cloud.",
      },
    ],
  },
  meme: {
    howTo: {
      title: "Comment créer un mème",
      steps: [
        "Chargez ou sélectionnez une image pour votre mème",
        "Ajoutez du texte en haut et en bas de l'image",
        "Personnalisez la taille, la couleur et le style de la police",
        "Téléchargez votre mème",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Champs de texte haut et bas avec personnalisation",
        "Plusieurs options de police et tailles",
        "Ombre de texte et effets de contour pour la lisibilité",
        "Style de police Impact pour l'apparence classique du mème",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez une couleur de texte contrastée pour la visibilité sur l'image",
        "Gardez le texte court et percutant pour un impact maximal",
        "Ajoutez un contour blanc au texte pour la lisibilité sur n'importe quel arrière-plan",
      ],
    },
    faq: [
      {
        question: "Puis-je ajouter du texte au milieu ou ailleurs ?",
        answer: "Oui. Bien que le format de mème classique utilise le haut/bas, vous pouvez placer le texte n'importe où sur l'image.",
      },
      {
        question: "Quelles polices sont disponibles ?",
        answer: "Nous fournissons Impact (police classique de mème), Arial, Comic Sans et plusieurs autres polices populaires.",
      },
      {
        question: "La création de mème est-elle privée ?",
        answer: "Oui. Votre mème est créé entièrement dans votre navigateur sans uploads ni traitement externe.",
      },
    ],
  },
  "html-to-image": {
    howTo: {
      title: "Comment convertir HTML en image",
      steps: [
        "Collez votre code HTML dans l'éditeur",
        "Prévisualisez votre HTML rendu en tant qu'image",
        "Ajustez les dimensions et les paramètres de qualité",
        "Téléchargez l'image rendue",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Rendu HTML et CSS au format image",
        "Support pour divers éléments HTML et styles",
        "Résolution et dimensions de sortie ajustables",
        "Plusieurs options de format d'image",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Gardez le HTML simple pour les meilleurs résultats de rendu",
        "Testez le style avant de convertir en image",
        "Utilisez une haute résolution pour une sortie de qualité",
      ],
    },
    faq: [
      {
        question: "Quelles fonctionnalités HTML sont supportées ?",
        answer: "La plupart des fonctionnalités HTML et CSS standard fonctionnent, y compris la mise en page, les polices, les couleurs et les animations de base.",
      },
      {
        question: "Puis-je inclure des feuilles de style externes ?",
        answer: "Le CSS en ligne fonctionne mieux. Les feuilles de style externes peuvent ne pas se charger en raison des restrictions de sécurité du navigateur.",
      },
      {
        question: "Le rendu HTML est-il effectué de manière privée ?",
        answer: "Oui. Le rendu HTML se fait entièrement dans votre navigateur sans uploads.",
      },
    ],
  },
  gradient: {
    howTo: {
      title: "Comment générer une image en dégradé",
      steps: [
        "Ouvrez l'outil de générateur de dégradé",
        "Choisissez les couleurs de début et de fin",
        "Sélectionnez la direction ou l'angle du dégradé",
        "Téléchargez votre image en dégradé",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Plusieurs types de dégradés : linéaire, radial, conique",
        "Sélecteur de couleur pour choisir les couleurs de début et de fin",
        "Angle et direction ajustables",
        "Dimensions personnalisées et formats d'export",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez des couleurs complémentaires pour des dégradés frappants",
        "Les dégradés radiaux fonctionnent bien pour les conceptions circulaires",
        "Exportez en SVG pour des dégradés évolutifs",
      ],
    },
    faq: [
      {
        question: "Quelle est la différence entre les dégradés linéaire, radial et conique ?",
        answer: "Le linéaire s'écoule dans une direction, le radial s'étend du centre, le conique tourne autour du centre comme une tarte.",
      },
      {
        question: "Puis-je ajouter plus de 2 couleurs ?",
        answer: "Oui. Vous pouvez ajouter plusieurs arrêts de couleur pour créer des dégradés multi-couleurs complexes.",
      },
      {
        question: "La génération de dégradé est-elle privée ?",
        answer: "Oui. Les dégradés sont générés entièrement dans votre navigateur sans intervention de serveur.",
      },
    ],
  },
  placeholder: {
    howTo: {
      title: "Comment générer une image d'espace réservé",
      steps: [
        "Ouvrez le générateur d'espace réservé",
        "Spécifiez les dimensions de largeur et hauteur souhaitées",
        "Personnalisez les couleurs d'arrière-plan et de texte",
        "Téléchargez votre image d'espace réservé",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Génération rapide d'images d'espace réservé de tailles personnalisées",
        "Couleurs d'arrière-plan et de texte personnalisables",
        "Affichage des dimensions sur l'image",
        "Parfait pour les maquettes de site web et les prototypes",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez les espaces réservés lors de la conception web avant les images finales",
        "Maintenez un style d'espace réservé cohérent dans les maquettes",
        "Incluez les dimensions pour référence de développement",
      ],
    },
    faq: [
      {
        question: "Puis-je utiliser les espaces réservés en production ?",
        answer: "Les espaces réservés sont conçus pour les maquettes et les prototypes. Remplacez-les par des images finales avant le lancement.",
      },
      {
        question: "Puis-je ajouter du texte à l'espace réservé ?",
        answer: "Oui. Les dimensions s'affichent automatiquement, et vous pouvez personnaliser le texte et les couleurs.",
      },
      {
        question: "La génération d'espace réservé est-elle effectuée localement ?",
        answer: "Oui. Les espaces réservés sont générés entièrement dans votre navigateur sans traitement externe.",
      },
    ],
  },
  pattern: {
    howTo: {
      title: "Comment générer une image en motif",
      steps: [
        "Ouvrez l'outil de générateur de motif",
        "Choisissez parmi les types de motif disponibles",
        "Personnalisez les couleurs et la taille du motif",
        "Téléchargez votre motif généré",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Plusieurs types de motif : points, rayures, damier, géométrique",
        "Densité et taille de motif ajustables",
        "Couleurs personnalisables",
        "Génération de motif sans couture",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Les motifs fonctionnent bien comme textures d'arrière-plan pour les sites web",
        "Utilisez des couleurs subtiles pour les motifs d'arrière-plan",
        "Testez la visibilité du motif sur le texte",
      ],
    },
    faq: [
      {
        question: "Les motifs sont-ils sans couture pour le pavage ?",
        answer: "Oui. Tous les motifs sont générés comme des carrelages sans couture qui se répètent parfaitement sans coutures visibles.",
      },
      {
        question: "Quels types de motif sont disponibles ?",
        answer: "Points, rayures, damier, ondes, hexagones et divers motifs géométriques.",
      },
      {
        question: "La génération de motif est-elle privée ?",
        answer: "Oui. Les motifs sont générés entièrement dans votre navigateur sans uploads.",
      },
    ],
  },
  watermark: {
    howTo: {
      title: "Comment ajouter un filigrane à une image",
      steps: [
        "Chargez votre image dans l'outil de filigrane",
        "Ajoutez du texte ou chargez une image en tant que filigrane",
        "Positionnez et ajustez l'opacité du filigrane",
        "Téléchargez votre image filigranée",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Filigranes de texte avec polices et couleurs personnalisables",
        "Support de filigrane d'image",
        "Opacité et positionnement ajustables",
        "Plusieurs options de placement de filigrane",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez des filigranes semi-transparents pour protéger sans obscurcir l'image",
        "Placez les filigranes dans les coins pour une protection moins intrusive",
        "Utilisez les filigranes pour protéger le portefeuille et le travail des clients",
      ],
    },
    faq: [
      {
        question: "Puis-je utiliser à la fois des filigranes de texte et d'image ?",
        answer: "Oui. Vous pouvez ajouter des filigranes de texte, des filigranes d'image ou les deux ensemble.",
      },
      {
        question: "Quelle transparence mon filigrane devrait-il avoir ?",
        answer: "Généralement 30-50% d'opacité offre un bon équilibre entre la visibilité et de ne pas obscurcir l'image.",
      },
      {
        question: "Le filigrane est-il effectué de manière privée ?",
        answer: "Oui. Le filigrane se fait entièrement dans votre navigateur sans uploads ni traitement cloud.",
      },
    ],
  },
  "png-to-svg": {
    howTo: {
      title: "Comment convertir PNG en SVG",
      steps: [
        "Chargez votre image PNG dans le vectoriseur",
        "Ajustez les paramètres de traçage pour la précision",
        "Prévisualisez le SVG vectorisé",
        "Téléchargez votre fichier SVG",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Tracez le raster PNG au format vecteur SVG",
        "Précision de traçage et couleurs ajustables",
        "Support des arrière-plans PNG transparents",
        "Produisez des graphiques évolutifs",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Fonctionne mieux avec les images à contraste élevé et les logos",
        "Ajustez la limite de couleur pour les graphiques simples ou complexes",
        "Le SVG permet un redimensionnement infini sans perte de qualité",
      ],
    },
    faq: [
      {
        question: "Le SVG vectorisé sera-t-il éditable ?",
        answer: "Oui. Les fichiers SVG peuvent être édités dans des éditeurs vectoriels comme Illustrator ou Inkscape.",
      },
      {
        question: "Quels types d'images fonctionnent mieux ?",
        answer: "Les logos simples et les images à contraste élevé. Les photographies complexes ne se vectorisent pas bien.",
      },
      {
        question: "La vectorisation est-elle effectuée de manière privée ?",
        answer: "Oui. La vectorisation PNG en SVG se fait entièrement dans votre navigateur sans uploads.",
      },
    ],
  },
  "jpg-to-svg": {
    howTo: {
      title: "Comment convertir JPG en SVG",
      steps: [
        "Chargez votre image JPG dans le vectoriseur",
        "Configurez les paramètres de vectorisation",
        "Prévisualisez la conversion SVG",
        "Téléchargez votre fichier SVG",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Vectorisez les images JPG au format SVG évolutif",
        "Traçage ajustable et paramètres de couleur",
        "Support des images JPG complexes",
        "Produisez des graphiques vectoriels éditables",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Les meilleurs résultats avec les conceptions simples et audacieuses",
        "Fonctionne moins efficacement avec les photographies",
        "La conversion SVG idéale pour les logos et les graphiques",
      ],
    },
    faq: [
      {
        question: "Puis-je convertir des photographies en SVG ?",
        answer: "Pas efficacement. La vectorisation fonctionne mieux pour les logos et les graphiques simples. Les photographies produisent des fichiers SVG volumineux.",
      },
      {
        question: "Le SVG sera-t-il éditable ?",
        answer: "Oui. Le SVG vectorisé peut être édité dans un logiciel d'édition vectorielle.",
      },
      {
        question: "La vectorisation est-elle effectuée de manière privée ?",
        answer: "Oui. La vectorisation JPG en SVG se fait entièrement dans votre navigateur sans uploads.",
      },
    ],
  },
  pixelate: {
    howTo: {
      title: "Comment pixéliser une image",
      steps: [
        "Chargez votre image dans l'outil de pixélisation",
        "Ajustez la taille des pixels ou le niveau de flou",
        "Voyez l'effet pixelé en aperçu en temps réel",
        "Téléchargez votre image pixelisée",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Contrôlez la taille du bloc de pixels pour différentes intensités de pixélisation",
        "Appliquez la pixélisation à l'image entière ou aux zones sélectionnées",
        "Utile pour la confidentialité - floutez les visages ou les informations sensibles",
        "Aperçu en temps réel avec paramètres ajustables",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez des tailles de pixel plus grandes pour un flou plus dramatique",
        "Parfait pour protéger les visages ou les numéros de plaque minéralogique",
        "Testez différentes tailles de pixel pour le meilleur effet",
      ],
    },
    faq: [
      {
        question: "Puis-je pixéliser seulement une partie de l'image ?",
        answer: "Oui. Vous pouvez sélectionner des zones spécifiques à pixéliser tout en gardant le reste de l'image claire.",
      },
      {
        question: "Quelle taille de pixel dois-je utiliser ?",
        answer: "Cela dépend de ce que vous pixélisez. Les visages nécessitent généralement 10-20 pixels, tandis que le texte peut nécessiter davantage.",
      },
      {
        question: "La pixélisation est-elle effectuée de manière privée ?",
        answer: "Oui. Tous les effets de pixélisation sont appliqués localement dans votre navigateur.",
      },
    ],
  },
};
