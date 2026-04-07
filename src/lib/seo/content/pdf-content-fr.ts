import type { ToolContentMap } from "../tool-content-types";

export const pdfContentFr: ToolContentMap = {
  merge: {
    howTo: {
      title: "Comment fusionner des fichiers PDF",
      steps: [
        "Cliquez sur « Sélectionner des fichiers » ou glissez-déposez plusieurs fichiers PDF dans la zone de chargement.",
        "Réorganisez les fichiers dans l'ordre souhaité en les faisant glisser.",
        "Cliquez sur le bouton « Fusionner » pour combiner tous les fichiers en un seul PDF.",
        "Téléchargez votre fichier PDF fusionné — il est prêt à l'emploi.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Combinez un nombre illimité de fichiers PDF en un seul document",
        "Réorganisation par glisser-déposer pour un contrôle précis de l'ordre des pages",
        "Aperçu des miniatures avant la fusion pour vérifier le contenu",
        "Maintient la qualité d'origine — aucune compression ni perte de qualité",
        "Fonctionne entièrement dans votre navigateur — les fichiers ne quittent jamais votre appareil",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez les boutons de la barre d'outils pour trier les fichiers par nom ou taille",
        "Les fichiers volumineux peuvent prendre un moment à traiter — un indicateur de progression vous tiendra au courant",
        "Le fichier fusionné préserve les signets, liens et champs de formulaire des documents d'origine",
      ],
    },
    faq: [
      { question: "Est-il sûr de fusionner des PDF en ligne ?", answer: "Oui. ToolPop traite tout dans votre navigateur en utilisant JavaScript. Vos fichiers ne quittent jamais votre appareil et ne sont jamais envoyés à un serveur." },
      { question: "Combien de fichiers PDF puis-je fusionner à la fois ?", answer: "Il n'y a pas de limite. Vous pouvez fusionner autant de fichiers PDF que votre navigateur peut gérer." },
      { question: "La fusion affectera-t-elle la qualité ?", answer: "Non. La qualité d'origine de chaque PDF est entièrement préservée lors du processus de fusion." },
    ],
  },
  split: {
    howTo: {
      title: "Comment diviser un PDF",
      steps: [
        "Chargez un fichier PDF en cliquant sur « Sélectionner un fichier » ou en le glissant dans la zone.",
        "Choisissez une méthode de division : par plage de pages, extraire des pages spécifiques, ou diviser par intervalles fixes.",
        "Configurez les plages ou numéros de page souhaités.",
        "Cliquez sur « Diviser » pour créer des fichiers PDF séparés, puis téléchargez-les.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Divisez par plages de pages personnalisées (par ex., pages 1–5, 10–15)",
        "Extrayez des pages individuelles dans des fichiers séparés",
        "Divisez en morceaux de taille égale (tous les N pages)",
        "Miniatures de pages visuelles pour une sélection facile",
        "Option pour fusionner les plages sélectionnées en un fichier de sortie",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez l'entrée de plage pour spécifier plusieurs plages séparées par des virgules",
        "Cliquez sur les miniatures des pages pour sélectionner ou désélectionner rapidement les pages",
        "L'option « Extraire tout » crée un fichier par page — utile pour l'archivage",
      ],
    },
    faq: [
      { question: "Puis-je extraire une seule page d'un PDF ?", answer: "Oui. Entrez simplement le numéro de page ou utilisez les miniatures visuelles pour sélectionner et extraire des pages individuelles." },
      { question: "La division réduit-elle la qualité du PDF ?", answer: "Non. La division crée de nouveaux PDF avec la même qualité que le document d'origine." },
      { question: "Que se passe-t-il si je spécifie des plages de pages qui se chevauchent ?", answer: "Les pages dans les plages qui se chevauchent apparaissent dans plusieurs fichiers de sortie, ce qui vous permet d'organiser le contenu avec flexibilité." },
    ],
  },
  compress: {
    howTo: {
      title: "Comment compresser un PDF",
      steps: [
        "Chargez un fichier PDF que vous souhaitez rendre plus petit.",
        "Choisissez un niveau de compression : Maximum (fichier le plus petit), Recommandé (équilibré), ou Minimum (meilleure qualité).",
        "Sélectionnez un mode de compression — basé sur l'image ou rastérisé.",
        "Cliquez sur « Compresser » et téléchargez votre fichier PDF plus petit.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Trois niveaux de compression pour équilibrer la taille et la qualité",
        "L'optimisation des images réduit la taille des images intégrées",
        "Affiche les tailles de fichier avant et après avec le pourcentage de réduction",
        "Mode rastérisé pour une compression maximale lorsque la qualité du texte est moins critique",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Le niveau « Recommandé » fonctionne mieux pour la plupart des documents, réduisant la taille de 40–70 %",
        "Pour les PDF avec beaucoup de photos, la compression « Maximum » peut réduire considérablement la taille du fichier",
        "Utilisez la compression « Minimum » lorsque vous devez préserver la netteté de l'image pour l'impression",
      ],
    },
    faq: [
      { question: "À quel point mon PDF sera-t-il plus petit après compression ?", answer: "Généralement 40–70 % plus petit avec le niveau Recommandé, selon le contenu du fichier d'origine et la méthode de compression." },
      { question: "La compression est-elle effectuée localement sur mon appareil ?", answer: "Oui. Toute la compression se fait dans votre navigateur sans que les données ne soient envoyées aux serveurs, gardant vos documents complètement privés." },
      { question: "Puis-je récupérer la qualité après une compression avec le niveau Maximum ?", answer: "Non. La compression Maximum est permanente. Si vous n'êtes pas sûr, utilisez d'abord le niveau Recommandé pour tester la qualité." },
    ],
  },
  "pdf-to-jpg": {
    howTo: {
      title: "Comment convertir un PDF en JPG",
      steps: [
        "Chargez un ou plusieurs fichiers PDF à convertir.",
        "Sélectionnez la qualité de sortie : Haute (300 DPI), Moyenne (150 DPI), ou Basse (72 DPI).",
        "Cliquez sur « Convertir » pour transformer chaque page PDF en image JPG.",
        "Téléchargez les images individuelles ou toutes les images en tant que fichier ZIP.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez chaque page d'un PDF en image JPG de haute qualité",
        "Trois préréglages de qualité pour équilibrer la clarté de l'image et la taille du fichier",
        "Traitement par lots — convertissez plusieurs PDF à la fois",
        "Téléchargez les pages individuelles ou toutes les pages dans une seule archive ZIP",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez la qualité « Haute » pour l'impression ou les présentations professionnelles",
        "Choisissez « Moyenne » pour l'utilisation sur le web — bonne qualité avec des tailles de fichier raisonnables",
        "La qualité « Basse » est parfaite pour les vignettes ou les aperçus rapides",
      ],
    },
    faq: [
      { question: "Puis-je convertir une seule page au lieu de l'intégralité du PDF ?", answer: "Oui. Sélectionnez des pages spécifiques lors de la conversion ou utilisez l'option de plage de pages pour convertir uniquement les pages dont vous avez besoin." },
      { question: "Mes PDF sont-ils stockés après la conversion ?", answer: "Non. Toute la conversion se fait dans votre navigateur et les fichiers sont supprimés immédiatement après le téléchargement." },
      { question: "Quelle est la différence entre les qualités Haute, Moyenne et Basse ?", answer: "Elles diffèrent par le DPI (300, 150 et 72 respectivement) et la taille du fichier. Haute est meilleure pour l'impression, Moyenne pour le web, Basse pour les aperçus." },
    ],
  },
  "jpg-to-pdf": {
    howTo: {
      title: "Comment convertir des JPG en PDF",
      steps: [
        "Chargez une ou plusieurs images JPG en cliquant ou en les glissant.",
        "Choisissez la taille de la page, l'orientation et les paramètres de marge.",
        "Réorganisez les images dans l'ordre de votre choix en les faisant glisser.",
        "Cliquez sur « Convertir » pour créer votre PDF, puis téléchargez-le.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez une ou plusieurs images JPG en un seul PDF",
        "Choisissez parmi les tailles de page standard (A4, Lettre, Légal) ou ajuster à l'image",
        "Marges réglables et orientation (portrait/paysage)",
        "Option pour créer un PDF par image ou fusionner tous en un seul document",
        "Réorganisation des images par glisser-déposer",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez « Adapter à l'image » pour éviter le recadrage ou les bordures blanches",
        "Pour les albums photos, utilisez « Fusionner tout » pour créer un seul PDF avec toutes les images",
        "Réglez les marges à zéro pour l'impression bord à bord",
      ],
    },
    faq: [
      { question: "Puis-je convertir d'autres formats d'image en plus des JPG ?", answer: "Oui. Cet outil supporte JPG, PNG, GIF, BMP, WebP et d'autres formats d'image courants." },
      { question: "Comment éviter les bordures blanches lors de la conversion d'images ?", answer: "Utilisez l'option de taille de page « Adapter à l'image » pour ajuster automatiquement la page à vos dimensions d'image." },
      { question: "Mes données d'image sont-elles sûres lors de la conversion ?", answer: "Absolument. Toute la conversion se fait localement dans votre navigateur sans envoi à des serveurs externes." },
    ],
  },
  rotate: {
    howTo: {
      title: "Comment faire pivoter les pages d'un PDF",
      steps: [
        "Chargez un fichier PDF avec des pages qui nécessitent une rotation.",
        "Cliquez sur les boutons de rotation sur les miniatures de pages individuelles pour les faire pivoter.",
        "Utilisez « Faire pivoter tout » pour appliquer la même rotation à chaque page à la fois.",
        "Cliquez sur « Faire pivoter » pour appliquer les modifications et télécharger le PDF corrigé.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Faites pivoter les pages individuelles dans le sens des aiguilles d'une montre ou dans le sens inverse par incrément de 90°",
        "Faites pivoter toutes les pages à la fois d'un simple clic",
        "Les miniatures de pages affichent les changements de rotation en temps réel",
        "Réinitialisez toutes les rotations pour recommencer si nécessaire",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Les documents numérisés ont souvent des pages en orientations mixtes — corrigez-les toutes à la fois",
        "Utilisez la rotation de pages individuelles pour les documents avec des pages portrait et paysage",
        "La rotation est permanente et maintenue lors de l'impression ou du partage du PDF",
      ],
    },
    faq: [
      { question: "Puis-je faire pivoter les pages d'autres degrés que 90° ?", answer: "Cet outil fait pivoter par incrément de 90°. Pour les rotations d'angle personnalisé, envisagez d'utiliser l'outil d'édition à la place." },
      { question: "La rotation affectera-t-elle la taille du fichier ?", answer: "Non. La rotation des pages est une modification des métadonnées qui ne modifie pas le contenu ou la taille du fichier." },
      { question: "Puis-je annuler les rotations après le téléchargement ?", answer: "Oui. Ouvrez simplement le PDF à nouveau dans cet outil et faites pivoter les pages à leur orientation d'origine." },
    ],
  },
  "edit-pdf": {
    howTo: {
      title: "Comment modifier un PDF",
      steps: [
        "Chargez le PDF que vous souhaitez modifier.",
        "Sélectionnez un outil dans la barre d'outils : texte, image, formes ou dessin.",
        "Cliquez sur la page pour placer votre élément, puis personnalisez ses propriétés.",
        "Naviguez entre les pages et ajoutez des éléments selon vos besoins.",
        "Cliquez sur « Appliquer » pour enregistrer tous les modifications et télécharger le PDF modifié.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Ajoutez du texte avec police, taille, couleur et alignement personnalisables",
        "Insérez des images de votre appareil n'importe où sur la page",
        "Tracez des lignes freehand, des rectangles, des ellipses et des lignes droites",
        "Ajoutez des symboles comme des coches, des croix, des étoiles et des flèches",
        "Contrôle des calques — amenez les éléments vers l'avant ou envoyez-les vers l'arrière",
        "Édition multi-pages avec navigation facile entre les pages",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez les contrôles de zoom pour travailler sur les détails fins avec précision",
        "Double-cliquez sur un élément de texte pour modifier son contenu après l'avoir placé",
        "Utilisez Ctrl+Z (Cmd+Z sur Mac) pour annuler instantanément les erreurs",
        "Les symboles comme les coches sont parfaits pour remplir les champs de formulaire",
      ],
    },
    faq: [
      { question: "Puis-je éditer le texte d'origine dans le PDF ?", answer: "Cet outil ajoute de nouveaux éléments plutôt que de modifier le texte existant. Pour éditer le contenu d'origine, exportez en Word et éditez là." },
      { question: "Mon PDF modifié est-il stocké ou partagé ?", answer: "Non. Tout se passe dans votre navigateur. Votre PDF est traité localement et ne jamais stocké sur un serveur." },
      { question: "Combien d'éléments puis-je ajouter à une seule page ?", answer: "Il n'y a pas de limite pratique, bien que l'ajout de nombreux éléments puisse ralentir l'éditeur. Gardez votre document léger pour les meilleures performances." },
    ],
  },
  watermark: {
    howTo: {
      title: "Comment ajouter un filigrane à un PDF",
      steps: [
        "Chargez le PDF que vous souhaitez filigraner.",
        "Choisissez entre un filigrane textuel ou une image.",
        "Personnalisez le filigrane : définissez le texte/l'image, l'opacité, la position, la rotation et la taille.",
        "Sélectionnez les pages auxquelles appliquer le filigrane (toutes ou plage personnalisée).",
        "Cliquez sur « Ajouter filigrane » et téléchargez le PDF filigrané.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Filigranes textuels avec police, taille, couleur et ombre personnalisables",
        "Filigranes d'image avec échelle et opacité réglables",
        "Neuf options de positionnement (coins, bords et centre)",
        "Motif de tuile/mosaïque pour couvrir toute la page",
        "Contrôle des calques — placez le filigrane au-dessus ou au-dessous du contenu",
        "Sélection de plages de pages personnalisées",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Définissez l'opacité sur 20–30 % pour un filigrane subtil qui n'obscurcit pas le contenu",
        "Utilisez l'option mosaïque/tuile pour une couverture pleine page sur les documents confidentiels",
        "Une rotation diagonale (généralement 45°) rend les filigranes plus difficiles à supprimer",
        "Placez les filigranes « sous le contenu » pour que le texte reste parfaitement lisible",
      ],
    },
    faq: [
      { question: "Puis-je ajouter des filigranes différents à différentes pages ?", answer: "Actuellement, le même filigrane s'applique aux pages sélectionnées. Pour des filigranes différents, traitez le PDF plusieurs fois." },
      { question: "Le filigrane s'imprimera-t-il quand quelqu'un imprime le PDF ?", answer: "Oui. Les filigranes sont intégrés au PDF et apparaîtront à la fois en visualisation numérique et en copies imprimées." },
      { question: "Puis-je supprimer un filigrane que j'ai ajouté ?", answer: "Non. Une fois ajouté, les filigranes sont permanents. Gardez toujours une sauvegarde de votre PDF d'origine avant de le filigraner." },
    ],
  },
  protect: {
    howTo: {
      title: "Comment protéger par mot de passe un PDF",
      steps: [
        "Chargez le PDF que vous souhaitez protéger.",
        "Entrez un mot de passe et confirmez-le.",
        "Optionnellement, configurez les permissions avancées (impression, copie, édition).",
        "Cliquez sur « Protéger » pour chiffrer le PDF avec votre mot de passe.",
        "Téléchargez le fichier protégé — les destinataires auront besoin du mot de passe pour l'ouvrir.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Chiffrement AES-256 pour une sécurité renforcée",
        "Indicateur de force du mot de passe (faible, moyen, fort)",
        "Contrôles de permission granulaires pour l'impression, la copie et la modification",
        "Permissions distinctes pour l'impression basse résolution et haute résolution",
        "Contrôles de permission pour le remplissage de formulaires et l'accessibilité",
        "Tout chiffrement se fait dans votre navigateur — votre mot de passe ne quitte jamais votre appareil",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez un mot de passe fort avec des caractères mélangés pour une sécurité maximale",
        "Limitez la permission « copie » pour empêcher l'extraction de texte du document",
        "Autorisez uniquement l'« impression basse résolution » si vous souhaitez empêcher les reproductions haute qualité",
        "Mémorisez votre mot de passe — il n'y a pas d'option de récupération pour les fichiers chiffrés",
      ],
    },
    faq: [
      { question: "Quelle est la force du chiffrement AES-256 ?", answer: "AES-256 est un chiffrement de qualité militaire et considéré comme pratiquement inviolable avec la technologie actuelle." },
      { question: "Que faire si j'oublie le mot de passe de mon PDF protégé ?", answer: "Il n'y a pas d'option de récupération de mot de passe. Le chiffrement est permanent, donc protégez votre mot de passe soigneusement." },
      { question: "Les utilisateurs restreints peuvent-ils toujours imprimer le document même si l'impression est désactivée ?", answer: "Non. Lorsque l'impression est restreinte, le lecteur PDF empêchera les tentatives d'impression, quel que soit le comportement de l'utilisateur." },
    ],
  },
  "delete-pages": {
    howTo: {
      title: "Comment supprimer des pages d'un PDF",
      steps: [
        "Chargez un fichier PDF contenant les pages que vous souhaitez supprimer.",
        "Cliquez sur les miniatures des pages pour sélectionner les pages que vous souhaitez supprimer.",
        "Utilisez les boutons de sélection rapide : sélectionner tout, pages impaires, pages paires, ou désélectionner tout.",
        "Cliquez sur « Supprimer » pour supprimer les pages sélectionnées et télécharger le résultat.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Miniatures de pages visuelles pour une identification facile",
        "Multi-sélection avec clic — choisissez exactement les pages à supprimer",
        "Options de sélection rapide pour les pages impaires, paires ou toutes les pages",
        "Compteur en temps réel montrant combien de pages seront supprimées par rapport à celles conservées",
        "Vérification de sécurité pour vous empêcher de supprimer accidentellement toutes les pages",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez « Sélectionner les pages paires » pour supprimer rapidement les verso blancs des numérisations recto verso",
        "Examinez attentivement chaque miniature avant de supprimer pour éviter de supprimer les mauvaises pages",
        "Si vous devez conserver seulement quelques pages, envisagez d'utiliser « Extraire les pages » à la place — c'est plus rapide",
      ],
    },
    faq: [
      { question: "Puis-je annuler la suppression de pages si j'ai fait une erreur ?", answer: "Non. La suppression de pages est permanente. Gardez une sauvegarde de votre PDF d'origine ou téléchargez-la à nouveau avant de supprimer des pages." },
      { question: "Y a-t-il une limite au nombre de pages que je peux supprimer à la fois ?", answer: "Non. Vous pouvez supprimer autant de pages que vous le souhaitez de n'importe quel PDF que votre navigateur peut gérer." },
      { question: "La suppression de pages affectera-t-elle la taille du fichier de manière significative ?", answer: "Oui. La suppression de pages réduit la taille du fichier proportionnellement au nombre de pages supprimées." },
    ],
  },
  "extract-images": {
    howTo: {
      title: "Comment extraire les images d'un PDF",
      steps: [
        "Chargez un fichier PDF contenant des images.",
        "Prévisualisez toutes les images trouvées dans le PDF avec des miniatures.",
        "Sélectionnez les images que vous souhaitez extraire ou cliquez sur « Sélectionner tout ».",
        "Choisissez le format de sortie (JPG, PNG ou WebP) et cliquez sur « Extraire ».",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Extrayez toutes les images d'un PDF en quelques secondes",
        "Formats de sortie multiples : JPG, PNG et WebP",
        "Aperçu des miniatures avant extraction",
        "Téléchargez les images individuelles ou toutes en tant que fichier ZIP",
        "Préserve la qualité d'image d'origine",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Le format PNG préserve la transparence si elle est présente dans les images d'origine",
        "Utilisez le format WebP pour l'utilisation sur le web — tailles de fichier plus petites avec haute qualité",
        "Extrayez par lots plusieurs PDF pour gagner du temps",
      ],
    },
    faq: [
      { question: "L'extraction d'images réduira-t-elle la qualité des images ?", answer: "Non. L'extraction préserve la qualité d'origine des images telles qu'elles apparaissent dans le PDF." },
      { question: "Puis-je extraire des images sans les télécharger sur un serveur ?", answer: "Oui. Toute l'extraction d'images se fait localement dans votre navigateur sans envoi de données à un serveur externe." },
      { question: "Que faire si mon PDF contient des images de basse qualité ?", answer: "Les images extraites auront la même qualité que dans le PDF d'origine. L'extraction ne peut pas améliorer la qualité." },
    ],
  },
  "pdf-to-png": {
    howTo: {
      title: "Comment convertir un PDF en PNG",
      steps: [
        "Chargez votre fichier PDF à convertir.",
        "Sélectionnez la qualité de résolution : Haute (300 DPI), Moyenne (150 DPI), ou Basse (72 DPI).",
        "Cliquez sur « Convertir » pour transformer chaque page PDF en image PNG.",
        "Téléchargez les fichiers PNG individuels ou tous en tant qu'une seule archive ZIP.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez toutes les pages PDF en images PNG sans perte",
        "Trois options de résolution pour différents cas d'usage",
        "Préserve la transparence pour les images avec canaux alpha",
        "Conversion par lots de plusieurs PDF à la fois",
        "Toutes les images disponibles en téléchargement ZIP",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "PNG est idéal lorsque vous avez besoin de qualité sans perte et de support de transparence",
        "Utilisez la résolution « Haute » pour l'impression et l'archivage",
        "Choisissez la résolution « Basse » pour les vignettes web et les aperçus",
      ],
    },
    faq: [
      { question: "Pourquoi choisir PNG plutôt que JPG pour la conversion PDF ?", answer: "PNG est sans perte et préserve une qualité parfaite et une transparence, tandis que JPG utilise une compression qui peut réduire la qualité." },
      { question: "Le traitement de la conversion est-il effectué sur vos serveurs ?", answer: "Non. Toute la conversion se fait entièrement dans votre navigateur. Vos PDF ne sont jamais envoyés à un serveur." },
      { question: "Puis-je convertir uniquement certaines pages au lieu de l'intégralité du PDF ?", answer: "Oui. Vous pouvez sélectionner des plages de pages spécifiques lors de la conversion pour extraire uniquement les pages dont vous avez besoin." },
    ],
  },
  "pdf-to-text": {
    howTo: {
      title: "Comment extraire le texte d'un PDF",
      steps: [
        "Chargez un fichier PDF avec du contenu textuel.",
        "Choisissez la méthode d'extraction : copier dans le presse-papiers, télécharger en TXT, ou visualiser dans l'éditeur.",
        "Sélectionnez optionnellement des pages spécifiques ou une plage de pages.",
        "Cliquez sur « Extraire » pour obtenir votre fichier texte brut.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Extrayez tout le texte de n'importe quel document PDF",
        "Support pour l'extraction multi-pages avec sélection de plages de pages",
        "Téléchargez en tant que fichier texte brut (.txt)",
        "Copiez le texte extrait directement dans le presse-papiers",
        "Préserve la structure et le formatage du texte",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Pour les PDF numérisés sans texte sélectionnable, utilisez l'outil OCR à la place",
        "L'extraction de texte fonctionne mieux avec les PDF numériques créés à partir de traitements de texte",
        "Utilisez la sélection de plages de pages pour extraire uniquement le contenu dont vous avez besoin",
      ],
    },
    faq: [
      { question: "Pourquoi ne puis-je pas extraire le texte de mon PDF numérisé ?", answer: "Les PDF numérisés sont des images sans texte sélectionnable. Utilisez l'outil OCR à la place pour extraire le texte des documents numérisés." },
      { question: "Puis-je rechercher dans le texte extrait après le téléchargement ?", answer: "Oui. Le fichier TXT extrait est un document texte brut que vous pouvez ouvrir dans n'importe quel éditeur de texte et rechercher normalement." },
      { question: "Mon texte est-il gardé privé lors de l'extraction ?", answer: "Absolument. L'extraction de texte se fait complètement dans votre navigateur sans transmission de données à des serveurs externes." },
    ],
  },
  "html-to-pdf": {
    howTo: {
      title: "Comment convertir HTML en PDF",
      steps: [
        "Collez votre code HTML dans l'éditeur ou chargez un fichier HTML.",
        "Prévisualisez votre document dans la zone d'aperçu en direct.",
        "Configurez la taille de la page, les marges et l'orientation.",
        "Cliquez sur « Convertir » pour générer votre PDF.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez directement le code HTML en documents PDF professionnels",
        "Support du style CSS et des images intégrées",
        "Aperçu en direct de votre PDF avant conversion",
        "Tailles de page personnalisables (A4, Lettre, etc.) et marges",
        "Maintient la structure et le formatage HTML",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Testez votre HTML dans le panneau d'aperçu avant la conversion",
        "Les ressources externes doivent être intégrées en tant qu'URL de données pour la sécurité",
        "Utilisez CSS d'impression média pour un meilleur style spécifique aux PDF",
      ],
    },
    faq: [
      { question: "Puis-je utiliser un style CSS dans ma conversion HTML en PDF ?", answer: "Oui. Le CSS standard est supporté. Pour de meilleurs résultats, utilisez CSS spécifique à l'impression (@media print) pour optimiser la mise en page du PDF." },
      { question: "Et si les images externes ne se chargent pas dans mon HTML ?", answer: "Intégrez les images en tant qu'URL de données base64 au lieu d'URL externes pour la sécurité et la fiabilité de la conversion PDF." },
      { question: "Mon code HTML est-il stocké ou partagé lors de la conversion ?", answer: "Non. Votre HTML est traité entièrement dans votre navigateur et ne jamais envoyé à un serveur." },
    ],
  },
  "png-to-pdf": {
    howTo: {
      title: "Comment convertir PNG en PDF",
      steps: [
        "Chargez une ou plusieurs images PNG.",
        "Réorganisez les images dans l'ordre souhaité en les faisant glisser.",
        "Sélectionnez la taille de la page, l'orientation et les marges.",
        "Cliquez sur « Convertir » pour créer votre PDF et téléchargez-le.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez les images PNG en PDF avec support complet de la transparence",
        "Fusionnez plusieurs PNG en un seul PDF",
        "Choisissez les tailles de page standard ou l'ajustement à l'image",
        "Paramètres de marges et d'orientation réglables",
        "Préserve la qualité de l'image sans compression",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Les PNG avec transparence seront préservés dans le PDF",
        "Utilisez « Adapter à l'image » pour éviter le recadrage indésirable",
        "Réglez les marges à zéro pour une sortie sans bordures",
      ],
    },
    faq: [
      { question: "La conversion de PNG en PDF réduit-elle la qualité de l'image ?", answer: "Non. La qualité PNG est entièrement préservée car PNG est déjà sans perte et la conversion maintient tous les détails." },
      { question: "Les zones transparentes de mon PNG resteront-elles transparentes dans le PDF ?", answer: "Les PDF ne supportent pas la vraie transparence comme les PNG. Les zones transparentes seront généralement converties en blanc ou en couleur de fond choisie." },
      { question: "La conversion est-elle effectuée de manière sûre dans mon navigateur ?", answer: "Oui. Toutes les conversions se font localement dans votre navigateur sans transmission de données à des serveurs externes." },
    ],
  },
  "image-to-pdf": {
    howTo: {
      title: "Comment convertir une image en PDF",
      steps: [
        "Chargez des fichiers image dans n'importe quel format (JPG, PNG, GIF, WebP, etc.).",
        "Glissez pour réorganiser les images ou utilisez les actions rapides.",
        "Définissez la taille de la page, l'orientation et les marges.",
        "Cliquez sur « Convertir » pour créer votre PDF.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez n'importe quel format d'image en PDF",
        "Support pour JPG, PNG, GIF, WebP, BMP et bien d'autres",
        "Image unique vers PDF ou un PDF par image",
        "Options de mise en page flexibles",
        "Préserve la qualité de l'image dans la sortie",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Pour les collections de photos, fusionnez toutes les images en un seul PDF",
        "Ajustez les marges en fonction de vos besoins d'impression",
        "Traitez par lots plusieurs images en une seule opération",
      ],
    },
    faq: [
      { question: "Quels formats d'image sont supportés ?", answer: "JPG, PNG, GIF, WebP, BMP, TIFF et la plupart des formats d'image courants sont supportés." },
      { question: "Puis-je créer un PDF par image au lieu de fusionner tous en un seul ?", answer: "Oui. Sélectionnez l'option pour créer des PDF séparés lors de la conversion pour obtenir des fichiers PDF individuels." },
      { question: "Mes données d'image sont-elles sûres lors du processus de conversion ?", answer: "Absolument. Tout le traitement des images se fait dans votre navigateur sans envoi à un serveur externe." },
    ],
  },
  "webp-to-pdf": {
    howTo: {
      title: "Comment convertir WebP en PDF",
      steps: [
        "Chargez un ou plusieurs fichiers image WebP.",
        "Prévisualisez vos images dans l'éditeur.",
        "Configurez les paramètres PDF (taille, marges, orientation).",
        "Cliquez sur « Convertir » pour générer votre fichier PDF.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez des images au format WebP moderne en PDF",
        "Traitement par lots pour plusieurs fichiers WebP",
        "Maintient la transparence et la qualité WebP",
        "Paramètres de mise en page personnalisables",
        "Conversion rapide avec compression optimale",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Les images WebP sont plus petites que JPEG — idéales pour le contenu optimisé pour le web",
        "La transparence dans les fichiers WebP est préservée dans le PDF résultant",
        "Combinez plusieurs images WebP en un seul document",
      ],
    },
    faq: [
      { question: "Pourquoi choisir des images WebP pour la conversion en PDF ?", answer: "WebP est un format moderne offrant une meilleure compression que JPEG tout en maintenant la qualité, ce qui entraîne des tailles de fichier plus petites." },
      { question: "La transparence des fichiers WebP sera-t-elle maintenue dans le PDF ?", answer: "Les PDF ne supportent pas la vraie transparence. Les zones transparentes seront converties en couleur de fond solide." },
      { question: "Puis-je convertir par lots plusieurs fichiers WebP à la fois ?", answer: "Oui. Vous pouvez télécharger et convertir plusieurs fichiers WebP en une seule opération, soit en tant que PDF séparés, soit fusionnés en un seul." },
    ],
  },
  "tiff-to-pdf": {
    howTo: {
      title: "Comment convertir TIFF en PDF",
      steps: [
        "Chargez votre fichier TIFF (simple ou multi-pages).",
        "Prévisualisez le contenu et les miniatures des pages.",
        "Sélectionnez optionnellement les pages spécifiques à inclure.",
        "Cliquez sur « Convertir » pour créer votre PDF.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez les images TIFF en PDF consultable",
        "Gérez les fichiers TIFF simples et multi-pages",
        "Support de différents formats de compression TIFF",
        "Options de sélection et de réorganisation des pages",
        "Sortie haute qualité adaptée à l'archivage",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "TIFF est couramment utilisé pour les documents numérisés — convertissez en PDF pour une meilleure distribution",
        "Les TIFF multi-pages sont converties en un seul PDF automatiquement",
        "Utilisez pour les flux de travail d'archivage numérisés afin de créer des archives PDF",
      ],
    },
    faq: [
      { question: "Quelle est la différence entre les fichiers TIFF à page unique et multi-pages ?", answer: "Les TIFF à page unique contiennent une image, tandis que les TIFF multi-pages contiennent plusieurs images dans un fichier (courant pour les documents numérisés)." },
      { question: "Puis-je sélectionner des pages spécifiques à partir d'un TIFF multi-pages pour convertir ?", answer: "Oui. Vous pouvez prévisualisez toutes les pages et sélectionner des pages spécifiques à inclure dans le PDF résultant." },
      { question: "La conversion est-elle effectuée de manière sûre dans mon navigateur ?", answer: "Oui. Toute la conversion TIFF en PDF se fait entièrement dans votre navigateur sans envoi au serveur." },
    ],
  },
  "heic-to-pdf": {
    howTo: {
      title: "Comment convertir HEIC en PDF",
      steps: [
        "Chargez des fichiers image HEIC depuis votre appareil.",
        "Réorganisez plusieurs images dans l'ordre souhaité.",
        "Sélectionnez les paramètres de taille de la page et de marge.",
        "Cliquez sur « Convertir » pour créer votre PDF.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez les images au format Apple HEIC/HEIF en PDF",
        "Support pour la conversion multi-image",
        "Préserve la qualité et la transparence de l'image",
        "Mise en page et dimensionnement personnalisables",
        "Traiter par lots plusieurs fichiers HEIC",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "HEIC est le format par défaut pour les photos iPhone — convertissez facilement en PDF partageable",
        "La transparence et les profils de couleur sont maintenus lors de la conversion",
        "Parfait pour créer des albums photos à partir des exportations iPhone",
      ],
    },
    faq: [
      { question: "Pourquoi convertir HEIC en PDF au lieu de JPG ?", answer: "Le format PDF est meilleur pour le partage et l'archivage des documents. Il préserve la qualité et est plus universellement compatible pour la distribution." },
      { question: "Mes fichiers HEIC resteront-ils sur mon appareil lors de la conversion ?", answer: "Oui. Toute la conversion se fait dans votre navigateur sans envoi. Vos fichiers HEIC sont traités localement et ne jamais envoyés à un serveur." },
      { question: "Puis-je convertir les fichiers HEIC de n'importe quel iPhone ou appareil Apple ?", answer: "Oui. Les fichiers au format HEIC/HEIF de n'importe quel iPhone, iPad ou autre appareil Apple peuvent être convertis." },
    ],
  },
  "extract-pages": {
    howTo: {
      title: "Comment extraire des pages d'un PDF",
      steps: [
        "Chargez votre fichier PDF.",
        "Spécifiez les pages à extraire en entrant les numéros ou plages (par ex., 1,3,5-7).",
        "Prévisualisez les pages sélectionnées dans la vue des miniatures.",
        "Cliquez sur « Extraire » pour créer un nouveau PDF contenant uniquement ces pages.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Extrayez des pages spécifiques d'un document PDF",
        "Support pour les plages de pages et la sélection de pages non consécutives",
        "Aperçu visuel des pages sélectionnées",
        "Créez plusieurs extractions à partir d'un seul PDF",
        "Préserve tout le contenu et le formatage",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez des nombres séparés par des virgules pour les pages non consécutives : 1,3,7",
        "Utilisez des plages avec tiret pour les pages consécutives : 5-10",
        "Combinez les deux méthodes : 1,3-5,8,10-15",
      ],
    },
    faq: [
      { question: "Quelle est la différence entre l'extraction et la suppression de pages ?", answer: "L'extraction de pages crée un nouveau PDF avec uniquement les pages sélectionnées, tandis que la suppression de pages supprime les pages sélectionnées de l'original." },
      { question: "Puis-je extraire la même page plusieurs fois ?", answer: "Oui. Si vous avez besoin de pages dupliquées dans votre PDF extrait, spécifiez le numéro de page plusieurs fois (par ex., 1,1,2)." },
      { question: "L'extraction est-elle effectuée localement sur mon appareil ?", answer: "Oui. Toute l'extraction de pages se fait dans votre navigateur sans transmission de données à des serveurs externes." },
    ],
  },
  "organize-pages": {
    howTo: {
      title: "Comment organiser les pages d'un PDF",
      steps: [
        "Chargez votre fichier PDF.",
        "Visualisez toutes les pages en tant que miniatures déplaçables.",
        "Faites glisser et déposez pour réorganiser les pages dans l'ordre souhaité.",
        "Cliquez sur « Enregistrer » pour télécharger le PDF réorganisé.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Réorganisation intuitive des pages par glisser-déposer",
        "Aperçu complet des pages avec miniatures pour une identification facile",
        "Annuler/Rétablir pour les modifications de réorganisation",
        "Zoom sur les miniatures pour la sélection précise des pages",
        "Opérations en masse sur plusieurs pages (rotation, duplication, suppression)",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez les opérations en masse pour dupliquer rapidement les pages importantes",
        "Groupez les pages connexes ensemble pour un meilleur flux de documents",
        "Prévisualisez vos modifications avant d'enregistrer",
      ],
    },
    faq: [
      { question: "Puis-je annuler mes modifications de réorganisation des pages ?", answer: "Oui. Les boutons annuler/rétablir vous permettent d'inverser les modifications. Vous pouvez également recharger pour recommencer." },
      { question: "Mes données PDF sont-elles gardées privées lors de l'organisation ?", answer: "Absolument. Toute la réorganisation des pages se fait dans votre navigateur. Votre PDF ne quitte jamais votre appareil." },
      { question: "Puis-je dupliquer des pages au milieu du document ?", answer: "Oui. Faites glisser une page vers n'importe quelle position et utilisez la fonction de duplication pour créer des copies n'importe où dans votre PDF." },
    ],
  },
  "scan-to-pdf": {
    howTo: {
      title: "Comment numériser des documents en PDF",
      steps: [
        "Utilisez votre caméra ou scanner pour capturer les images de document.",
        "Téléchargez les images numérisées dans l'outil.",
        "Corrigez automatiquement l'orientation et recadrez les pages si nécessaire.",
        "Téléchargez votre document numérisé sous forme de PDF consultable.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez les images de caméra ou scanner en PDF professionnel",
        "Détection et correction automatique de l'orientation des pages",
        "Recadrage intelligent pour supprimer les bordures et les ombres",
        "OCR facultatif pour texte consultable",
        "Traitement par lots pour plusieurs pages numérisées",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Gardez votre caméra stable et assurez-vous d'un bon éclairage pour des numérisations plus claires",
        "Utilisez l'OCR pour rendre votre document numérisé consultable et extractible",
        "Traitez par lots plusieurs pages en une seule opération pour gagner du temps",
      ],
    },
    faq: [
      { question: "La numérisation vers PDF redressera-t-elle automatiquement les photos de biais ?", answer: "Oui. L'outil détecte automatiquement l'orientation des pages et la redresse pour créer un PDF correctement aligné." },
      { question: "Puis-je ajouter plus de pages à mon PDF numérisé après le téléchargement ?", answer: "Vous pouvez renumériser et traiter des numérisations supplémentaires, puis fusionner les PDF à l'aide de l'outil de fusion." },
      { question: "Mes images numérisées sont-elles stockées sur vos serveurs ?", answer: "Non. Toute la numérisation et le traitement se font localement dans votre navigateur. Vos numérisations ne sont jamais téléchargées ni stockées nulle part." },
    ],
  },
  "page-numbers": {
    howTo: {
      title: "Comment ajouter les numéros de pages à un PDF",
      steps: [
        "Chargez votre fichier PDF.",
        "Sélectionnez le format du numéro de page (Arabe, Romain, lettres, etc.).",
        "Choisissez la position (haut/bas, gauche/centre/droite) et la page de départ.",
        "Cliquez sur « Ajouter » pour appliquer les numéros de pages et télécharger.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Formats de numérotation multiples (1,2,3 ou i,ii,iii ou a,b,c, etc.)",
        "Neuf options de positionnement (coins, bords, centre)",
        "Police, taille et couleur de numéro personnalisables",
        "Option pour ignorer la première page ou commencer à partir d'une page personnalisée",
        "Aperçu avant application à l'ensemble du document",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez les chiffres romains pour les pages préliminaires (introduction, table des matières)",
        "Positionnez les numéros en bas au centre pour les documents standard",
        "Choisissez une couleur gris clair pour une apparence subtile",
      ],
    },
    faq: [
      { question: "Puis-je ignorer la numérotation des pages sur la première page ?", answer: "Oui. L'outil vous permet d'ignorer la première page (couramment utilisé pour les pages de titre) ou de commencer la numérotation à partir de n'importe quelle page." },
      { question: "Puis-je utiliser différents formats de numérotation dans le même PDF ?", answer: "La version actuelle applique un format à l'ensemble du document. Pour différents formats, vous devrez traiter les sections séparément." },
      { question: "La numérotation des pages est-elle effectuée de manière sûre sans télécharger mon PDF ?", answer: "Oui. Toute la numérotation des pages se fait dans votre navigateur sans envoi à un serveur." },
    ],
  },
  crop: {
    howTo: {
      title: "Comment recadrer les pages PDF",
      steps: [
        "Chargez votre fichier PDF.",
        "Utilisez l'outil de recadrage pour dessiner un rectangle autour du contenu à conserver.",
        "Appliquez le même recadrage à plusieurs pages ou personnalisez par page.",
        "Cliquez sur « Recadrer » pour supprimer les marges et télécharger le résultat.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Outil de recadrage visuel avec interface de sélection par glissement",
        "Appliquez le même recadrage à toutes les pages ou pages individuelles",
        "Recadrez par pourcentage ou mesures fixes",
        "Prévisualisez les recadrages avant application",
        "Réinitialisez les recadrages et réessayez à tout moment",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Le recadrage réduit la taille du fichier en supprimant les marges inutiles",
        "Utilisez un recadrage uniforme pour une apparence cohérente du document",
        "Parfait pour préparer les documents à la lecture sur tablette",
      ],
    },
    faq: [
      { question: "Combien puis-je réduire la taille du fichier en le recadrant ?", answer: "La réduction de la taille du fichier dépend du recadrage. La suppression de grandes marges peut réduire la taille de 20 à 50 % ou plus." },
      { question: "Puis-je annuler un recadrage après l'avoir appliqué ?", answer: "Non. Le recadrage est permanent. Prévisualisez attentivement votre recadrage avant application. Gardez une sauvegarde de l'original." },
      { question: "Le recadrage se fait-il localement sur mon appareil ?", answer: "Oui. Toutes les opérations de recadrage se font dans votre navigateur sans envoi au serveur." },
    ],
  },
  sign: {
    howTo: {
      title: "Comment signer un PDF",
      steps: [
        "Chargez votre document PDF.",
        "Choisissez le type de signature : tracer, télécharger une image, ou taper votre nom.",
        "Placez votre signature sur la page du document.",
        "Cliquez sur « Signer » pour appliquer et télécharger le PDF signé.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Tracez les signatures à main levée avec la souris ou l'écran tactile",
        "Téléchargez les images de signature pré-créées",
        "Signature de texte tapé dans diverses polices",
        "Redimensionnez et repositionnez la signature n'importe où sur la page",
        "Signatures multiples par document",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Tracez les signatures sur un appareil à écran tactile pour de meilleurs résultats",
        "Téléchargez des images de signature cohérentes pour une apparence professionnelle",
        "Testez le placement de la signature dans l'aperçu avant finalisation",
      ],
    },
    faq: [
      { question: "Une signature numérique créée ici est-elle juridiquement contraignante ?", answer: "Cet outil crée une signature visuelle placée sur le PDF. Pour les signatures numériques juridiquement contraignantes, utilisez les solutions de signature numérique certifiées." },
      { question: "Puis-je signer plusieurs documents à la fois ?", answer: "Vous pouvez signer un document à la fois. Après la signature, vous pouvez traiter des documents supplémentaires en utilisant la même signature." },
      { question: "Mes données de signature sont-elles sauvegardées ou partagées ?", answer: "Non. Votre signature est utilisée uniquement pour signer le PDF en cours de traitement. Elle ne jamais stockée ni envoyée à un serveur." },
    ],
  },
  annotate: {
    howTo: {
      title: "Comment annoter un PDF",
      steps: [
        "Chargez votre document PDF.",
        "Sélectionnez l'outil d'annotation : surligneur, souligner, barrer ou notes.",
        "Cliquez et faites glisser pour annoter le texte ou ajouter des notes collantes.",
        "Cliquez sur « Enregistrer » pour appliquer les annotations et télécharger.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Surligneur de texte en plusieurs couleurs",
        "Markup avec soulignage et barrage du texte",
        "Notes collantes avec texte personnalisé et couleurs",
        "Outils de dessin et de markup freehand",
        "Exportation des annotations et vue récapitulative",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez différentes couleurs de surligneur pour catégoriser différents types de contenu",
        "Ajoutez des notes détaillées aux sections importantes avec des notes collantes",
        "Exportez le résumé des annotations pour une référence rapide",
      ],
    },
    faq: [
      { question: "Puis-je supprimer des annotations individuelles sans supprimer l'ensemble du document ?", answer: "Oui. Vous pouvez supprimer sélectivement des annotations spécifiques tout en gardant d'autres et le contenu PDF d'origine intact." },
      { question: "Les annotations seront-elles visibles si quelqu'un d'autre ouvre le PDF ?", answer: "Oui. Une fois les annotations sauvegardées dans le PDF, elles seront visibles à quiconque ouvre le document." },
      { question: "Mon PDF annoté est-il gardé privé ?", answer: "Oui. Toute l'annotation se fait dans votre navigateur. Votre PDF et vos annotations ne sont jamais envoyés à un serveur." },
    ],
  },
  flatten: {
    howTo: {
      title: "Comment aplatir un PDF",
      steps: [
        "Chargez un PDF avec des champs de formulaire, des calques ou des annotations.",
        "Choisissez ce qu'il faut aplatir : formulaires, calques, annotations ou tout.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Aplatissez les champs de formulaire remplis",
        "Fusionnez les calques dans un seul contenu",
        "Supprimez les annotations et les marques de révision",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "L'aplatissement rend les documents immuables et prêts à la distribution",
        "Utilisez pour archiver les formulaires remplis",
        "Simplifiez les PDF complexes pour améliorer la compatibilité",
      ],
    },
    faq: [
      { question: "Que signifie aplatir un PDF ?", answer: "L'aplatissement combine les calques et les éléments éditables en un seul contenu statique, le rendant immuable." },
      { question: "Puis-je modifier un PDF aplati après l'avoir téléchargé ?", answer: "Non. L'aplatissement est permanent. Gardez une copie du PDF original si vous pouvez avoir besoin de l'éditer à nouveau." },
      { question: "L'aplatissement affecte-t-il la taille du fichier ?", answer: "Généralement, l'aplatissement réduit légèrement la taille du fichier en supprimant la complexité des calques." },
    ],
  },
  "edit-metadata": {
    howTo: {
      title: "Comment modifier les métadonnées PDF",
      steps: [
        "Chargez votre fichier PDF.",
        "Modifiez le titre, l'auteur, le sujet, les mots-clés et la description.",
        "Définissez les dates de création et de modification.",
        "Cliquez sur « Enregistrer » pour appliquer et télécharger le PDF mis à jour.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Modifiez le titre, l'auteur, le sujet et les mots-clés",
        "Mise à jour de la description et des propriétés personnalisées",
        "Gestion des dates de création et de modification",
        "Affichage de toutes les métadonnées actuelles",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Mettez à jour les métadonnées pour améliorer la recherchabilité et l'organisation",
        "Fixez les propriétés correctes avant de partager ou d'archiver",
        "Les métadonnées aident avec l'indexation SEO et la gestion des documents",
      ],
    },
    faq: [
      { question: "Pourquoi modifier les métadonnées PDF ?", answer: "Les métadonnées améliorent l'organisation, la recherche et la compatibilité avec les systèmes de gestion des documents." },
      { question: "Les modifications de métadonnées modifient-elles le contenu du PDF ?", answer: "Non. Les modifications de métadonnées n'affectent que les propriétés du document, pas le contenu visible ou la taille du fichier." },
      { question: "Les modifications sont-elles effectuées de manière sûre dans mon navigateur ?", answer: "Oui. Toute la modification des métadonnées se fait localement sans envoi du PDF à un serveur." },
    ],
  },
  "web-optimize": {
    howTo: {
      title: "Comment optimiser un PDF pour le web",
      steps: [
        "Chargez votre fichier PDF.",
        "Sélectionnez le niveau d'optimisation (léger, moyen, agressif).",
        "Prévisualisez les améliorations de taille de fichier.",
        "Cliquez sur « Optimiser » et téléchargez.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Compressez les images et les ressources",
        "Supprimez les données non essentielles",
        "Optimisez pour le chargement plus rapide",
        "Maintient la qualité visuelle",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez l'optimisation avant de mettre en ligne ou d'e-mailer des PDF",
        "Équilibrez la qualité avec la taille du fichier en fonction de vos besoins",
        "Parfait pour les documents web et les e-mails",
      ],
    },
    faq: [
      { question: "L'optimisation pour le web réduit-elle la qualité ?", answer: "L'optimisation réduit la taille du fichier tout en maintenant une qualité visuelle acceptable pour le web. Le niveau d'agressivité est personnalisable." },
      { question: "Combien de réduction de taille puis-je m'attendre ?", answer: "Généralement 20-60 % selon le PDF et le niveau d'optimisation sélectionné." },
      { question: "L'optimisation se fait-elle dans mon navigateur ?", answer: "Oui. Toute l'optimisation se fait localement sans envoi à des serveurs externes." },
    ],
  },
  "word-to-pdf": {
    howTo: {
      title: "Comment convertir Word en PDF",
      steps: [
        "Chargez votre fichier Word (DOC, DOCX).",
        "Prévisualisez le contenu avant conversion.",
        "Configurez les paramètres de page si nécessaire.",
        "Cliquez sur « Convertir » et téléchargez votre PDF.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Conversion directe de Word en PDF professionnel",
        "Préserve le formatage, les polices et les images",
        "Support pour les documents Word simples et complexes",
        "Chiffrement et protection disponibles",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Vérifiez le formatage dans Word avant la conversion",
        "Les documents complexes avec graphiques conservent leur mise en page",
        "Parfait pour créer des documents professionnels finalisés",
      ],
    },
    faq: [
      { question: "Tous les types de documents Word sont-ils supportés ?", answer: "La plupart des documents Word standard sont supportés. Les macros et les objets OLE avancés peuvent ne pas être préservés." },
      { question: "Le formatage est-il préservé lors de la conversion ?", answer: "Oui. Le formatage, les polices et les images sont préservés dans le PDF résultant." },
      { question: "La conversion est-elle confidentielle ?", answer: "Oui. Toute la conversion se fait dans votre navigateur sans envoi de fichiers à des serveurs." },
    ],
  },
  "excel-to-pdf": {
    howTo: {
      title: "Comment convertir Excel en PDF",
      steps: [
        "Chargez votre fichier Excel (XLS, XLSX).",
        "Sélectionnez les feuilles à inclure dans le PDF.",
        "Configurez l'orientation (portrait/paysage) et la taille de page.",
        "Cliquez sur « Convertir » et téléchargez.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez les feuilles de calcul Excel en PDF",
        "Support pour plusieurs feuilles et classeurs",
        "Préserve les tableaux et les formules en tant que contenu statique",
        "Mise à l'échelle automatique pour la page",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Ajustez le contenu pour qu'il s'adapte à la page avant la conversion",
        "Utilisez pour partager les données de manière sûre et immuable",
        "Parfait pour les rapports et la documentation",
      ],
    },
    faq: [
      { question: "Les graphiques Excel sont-ils convertis ?", answer: "Oui. Les graphiques et les formatages sont préservés dans le PDF résultant." },
      { question: "Puis-je convertir plusieurs feuilles à la fois ?", answer: "Oui. Sélectionnez les feuilles à inclure et elles seront toutes converties en un seul PDF." },
      { question: "La conversion se fait-elle de manière privée ?", answer: "Oui. Toute la conversion se fait localement dans votre navigateur." },
    ],
  },
  "ppt-to-pdf": {
    howTo: {
      title: "Comment convertir PowerPoint en PDF",
      steps: [
        "Chargez votre fichier PowerPoint (PPT, PPTX).",
        "Sélectionnez les diapositives à inclure.",
        "Choisissez la mise en page (diapositive, notes, contours).",
        "Cliquez sur « Convertir » et téléchargez.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez les présentations PowerPoint en PDF",
        "Support pour plusieurs diapositives",
        "Préserve l'animation et le contenu en tant que statique",
        "Options de mise en page multiples",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Parfait pour partager des présentations sans les logiciels d'édition",
        "Utilisez pour l'archivage et la distribution",
        "Les PDF sont immuables et sécurisés",
      ],
    },
    faq: [
      { question: "Les animations PowerPoint sont-elles converties ?", answer: "Les animations ne sont pas converties. Le PDF affiche chaque diapositive comme une image statique." },
      { question: "Puis-je convertir uniquement certaines diapositives ?", answer: "Oui. Sélectionnez les diapositives à inclure avant la conversion." },
      { question: "La conversion est-elle sûre ?", answer: "Oui. Toute la conversion se fait localement dans votre navigateur." },
    ],
  },
  "pdf-to-word": {
    howTo: {
      title: "Comment convertir PDF en Word",
      steps: [
        "Chargez votre fichier PDF.",
        "L'outil détecte le texte et la mise en page.",
        "Prévisualisez la conversion avant téléchargement.",
        "Cliquez sur « Convertir » pour obtenir votre fichier Word.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez le texte PDF en document Word modifiable",
        "Préserve le formatage de base et la structure",
        "Support pour le texte multi-colonne",
        "Génère des fichiers Word compatibles",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Vérifiez et nettoyez le document Word après conversion",
        "Les documents PDF complexes peuvent nécessiter un post-traitement",
        "Idéal pour les documents PDF textuels",
      ],
    },
    faq: [
      { question: "La mise en page exacte est-elle préservée ?", answer: "La structure de base est préservée, mais la mise en page complexe peut nécessiter un ajustement manuel dans Word." },
      { question: "Les images sont-elles converties ?", answer: "Le texte est extrait et converti. Les images sont généralement conservées mais peuvent nécessiter un réalignement." },
      { question: "La conversion est-elle confidentielle ?", answer: "Oui. Toute la conversion se fait localement dans votre navigateur." },
    ],
  },
  "pdf-to-excel": {
    howTo: {
      title: "Comment convertir PDF en Excel",
      steps: [
        "Chargez votre PDF contenant des données tabulaires.",
        "L'outil détecte les tableaux et la structure.",
        "Prévisualisez la conversion.",
        "Cliquez sur « Convertir » pour obtenir votre fichier Excel.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez les tableaux PDF en feuilles de calcul Excel",
        "Détecte la structure et les en-têtes des colonnes",
        "Préserve les formats numériques et textuels",
        "Génère des fichiers Excel modifiables",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Fonctionne mieux avec les PDF contenant des tableaux clairs",
        "Vérifiez les données après conversion",
        "Idéal pour l'extraction de données de rapport",
      ],
    },
    faq: [
      { question: "Les tableaux complexes sont-ils détectés ?", answer: "Les tableaux de base sont bien détectés. Les tableaux très complexes ou imbriqués peuvent nécessiter un post-traitement." },
      { question: "Puis-je convertir plusieurs tableaux ?", answer: "Oui. Plusieurs tableaux seront convertis dans des feuilles séparées dans le classeur Excel." },
      { question: "La conversion respecte-t-elle la confidentialité ?", answer: "Oui. Toute la conversion se fait localement dans votre navigateur." },
    ],
  },
  "pdf-to-ppt": {
    howTo: {
      title: "Comment convertir PDF en PowerPoint",
      steps: [
        "Chargez votre fichier PDF.",
        "Chaque page devient une diapositive.",
        "Prévisualisez la conversion.",
        "Cliquez sur « Convertir » pour obtenir votre présentation.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez chaque page PDF en diapositive PowerPoint",
        "Préserve le contenu textuel et les images",
        "Génère des fichiers PowerPoint modifiables",
        "Mise en page automatique des diapositives",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Idéal pour convertir des documents en présentations",
        "Vérifiez et éditez dans PowerPoint après conversion",
        "Parfait pour réutiliser le contenu de documents",
      ],
    },
    faq: [
      { question: "Le contenu peut-il être modifié dans PowerPoint ?", answer: "Oui. Le contenu converti peut être librement modifié dans PowerPoint pour créer des présentations personnalisées." },
      { question: "Les images PDF sont-elles converties ?", answer: "Oui. Les images sont incluses dans les diapositives PowerPoint résultantes." },
      { question: "La conversion est-elle confidentielle ?", answer: "Oui. Toute la conversion se fait localement dans votre navigateur." },
    ],
  },
  "pdf-to-pdfa": {
    howTo: {
      title: "Comment convertir PDF en PDF/A",
      steps: [
        "Chargez votre fichier PDF.",
        "Choisissez le niveau PDF/A (PDF/A-1, PDF/A-2, etc.).",
        "Configurez les paramètres de conformité.",
        "Cliquez sur « Convertir » et téléchargez.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez en format d'archivage PDF/A",
        "Garantit la compatibilité à long terme",
        "Supprime les contenus non compatibles",
        "Préserve le contenu principal du document",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez PDF/A pour l'archivage légal et à long terme",
        "Idéal pour la conformité réglementaire",
        "Parfait pour les documents importants",
      ],
    },
    faq: [
      { question: "Qu'est-ce que le format PDF/A ?", answer: "PDF/A est un format d'archivage normalisé conçu pour préserver les documents numériques à long terme sans perte de fidelité." },
      { question: "Quelle est la différence entre PDF/A-1 et PDF/A-2 ?", answer: "PDF/A-1 utilise le PDF-1.4 et ne supporte pas les couches transparentes, tandis que PDF/A-2 est basé sur PDF-1.7 et supporte les couches." },
      { question: "La conversion affecte-t-elle le contenu ?", answer: "Le contenu principal est préservé. Certains éléments non compatibles (vidéos, audio) peuvent être supprimés." },
    ],
  },
  pages: {
    howTo: {
      title: "Comment gérer les pages PDF",
      steps: [
        "Chargez votre PDF.",
        "Sélectionnez l'opération de page (ajouter, supprimer, réorganiser).",
        "Effectuez les modifications souhaitées.",
        "Téléchargez le PDF modifié.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Ajouter des pages blanches",
        "Supprimer des pages spécifiques",
        "Réorganiser les pages par glisser-déposer",
        "Dupliquer les pages",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Prévisualisez avant de finaliser",
        "Gardez une sauvegarde de l'original",
        "Faites des modifications par étapes",
      ],
    },
    faq: [
      { question: "Puis-je ajouter des pages blanches ?", answer: "Oui. Vous pouvez insérer des pages blanches à n'importe quelle position." },
      { question: "Les modifications sont-elles permanentes ?", answer: "Oui. Une fois téléchargé, le PDF modifié contient les changements permanents." },
      { question: "Puis-je annuler les modifications ?", answer: "Oui, tant que vous n'avez pas téléchargé. Rechargez votre PDF d'origine après téléchargement." },
    ],
  },
  "pages-per-sheet": {
    howTo: {
      title: "Comment imprimer plusieurs pages par feuille",
      steps: [
        "Chargez votre fichier PDF.",
        "Sélectionnez le nombre de pages par feuille (2, 4, 6, 8, 9).",
        "Choisissez l'orientation et la mise en page.",
        "Cliquez sur « Convertir » et téléchargez.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Réorganisez pour 2, 4, 6, 8 ou 9 pages par feuille",
        "Ajoute automatiquement les bordures de coupe",
        "Préserve la lisibilité",
        "Parfait pour l'impression et l'économie de papier",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Parfait pour créer des livrets et des brochures",
        "Économise du papier et de l'encre",
        "Idéal pour les handouts et la distribution",
      ],
    },
    faq: [
      { question: "Puis-je choisir n'importe quel nombre de pages par feuille ?", answer: "Les options courantes sont disponibles : 2, 4, 6, 8 ou 9 pages par feuille." },
      { question: "Les marges de coupe sont-elles ajoutées ?", answer: "Oui. Les marges de coupe sont automatiquement ajoutées pour faciliter la découpe." },
      { question: "Est-ce bon pour les livrets ?", answer: "Oui. Parfait pour créer des livrets en imprimant recto verso et en pliant." },
    ],
  },
  "header-footer": {
    howTo: {
      title: "Comment ajouter en-têtes et pieds de page",
      steps: [
        "Chargez votre fichier PDF.",
        "Entrez le texte pour l'en-tête et le pied de page.",
        "Définissez la position, la police et la couleur.",
        "Cliquez sur « Ajouter » et téléchargez.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Ajouter du texte personnalisé en en-tête et pied de page",
        "Support des dates, numéros de page et variables",
        "Mise en forme personnalisable (police, taille, couleur)",
        "Appliquer à des pages sélectionnées ou à toutes",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez pour ajouter des numéros de page et des dates",
        "Parfait pour les documents professionnels",
        "Aide à identifier et dater les documents",
      ],
    },
    faq: [
      { question: "Puis-je utiliser des variables comme la date ou le numéro de page ?", answer: "Oui. Variables disponibles : {date}, {page}, {totalPages}, etc." },
      { question: "Puis-je appliquer à des pages spécifiques seulement ?", answer: "Oui. Vous pouvez choisir d'appliquer à toutes les pages ou à une plage personnalisée." },
      { question: "Les en-têtes et pieds de page peuvent-ils être supprimés ?", answer: "Non. Une fois ajoutés, ils sont permanents. Gardez l'original si vous pouvez avoir besoin de l'éditer." },
    ],
  },
  booklet: {
    howTo: {
      title: "Comment créer un livret PDF",
      steps: [
        "Chargez votre document PDF.",
        "Sélectionnez la taille de page et la marge de reliure.",
        "Choisissez le côté de reliure (gauche ou droite).",
        "Cliquez sur « Créer » pour générer la mise en page du livret et télécharger.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Organisez les pages pour la reliure de livret",
        "Placement automatique de la couverture avant et arrière",
        "Marge de reliure personnalisable",
        "Insertion automatique de pages blanches",
        "Sortie prête pour l'impression avec marques de coupe",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Assurez-vous que le nombre de pages est divisible par 4 pour une mise en page de livret correcte",
        "Définissez la marge de reliure en fonction de votre méthode de reliure",
        "Imprimez en recto-verso pour une apparence authentique de livret",
      ],
    },
    faq: [
      { question: "Pourquoi mon document doit-il être divisible par 4 pages ?", answer: "Les livrets sont des feuilles pliées avec 4 pages par feuille. Votre contenu doit remplir les feuilles complètement pour une mise en page correcte." },
      { question: "L'outil peut-il ajouter automatiquement des pages blanches si nécessaire ?", answer: "Oui. L'outil de livret insère automatiquement les pages blanches pour que votre nombre de pages soit divisible par 4." },
      { question: "La création de livret est-elle faite localement dans mon navigateur ?", answer: "Oui. Toute la mise en page et le traitement du livret se font entièrement dans votre navigateur sans uploads sur serveur." },
    ],
  },
  grayscale: {
    howTo: {
      title: "Comment convertir PDF en niveaux de gris",
      steps: [
        "Chargez votre fichier PDF en couleur.",
        "Choisissez le type de conversion en niveaux de gris : standard ou haute qualité.",
        "Prévisualisez l'apparence convertie.",
        "Cliquez sur « Convertir » pour appliquer et télécharger.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Convertissez les PDFs couleur complets en niveaux de gris",
        "Plusieurs algorithmes de conversion pour des résultats optimaux",
        "Réduit significativement la taille du fichier",
        "Préserve la qualité du texte et des images",
        "Conversion par lot de plusieurs PDFs",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "La conversion en niveaux de gris réduit la taille du fichier de 20-40%",
        "Parfait pour les documents destinés à l'impression en noir et blanc",
        "Améliore l'impression sur les imprimantes monochromes",
      ],
    },
    faq: [
      { question: "Puis-je annuler la conversion en niveaux de gris après téléchargement ?", answer: "Non. La conversion en niveaux de gris est permanente et ne peut pas être inversée. Conservez une sauvegarde du PDF couleur original." },
      { question: "Le texte restera-t-il lisible après conversion en niveaux de gris ?", answer: "Oui. La qualité du texte est préservée. La conversion en niveaux de gris affecte uniquement les informations de couleur, pas la netteté du texte." },
      { question: "La conversion est-elle effectuée de manière sécurisée dans mon navigateur ?", answer: "Oui. Toute la conversion en niveaux de gris se fait localement dans votre navigateur sans uploads sur serveur." },
    ],
  },
  ocr: {
    howTo: {
      title: "Comment utiliser OCR sur un PDF",
      steps: [
        "Chargez un PDF numérisé ou basé sur des images.",
        "Sélectionnez la langue OCR pour une reconnaissance de texte précise.",
        "Choisissez le format de sortie : PDF consultable ou texte extrait.",
        "Cliquez sur « OCR » pour traiter et télécharger les résultats.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Reconnaissance optique de caractères pour les documents numérisés",
        "Support de plus de 40 langues pour l'extraction de texte précise",
        "Créez des PDFs consultables avec une couche de texte cachée",
        "Extrayez le texte dans un fichier séparé ou conservez-le dans le PDF",
        "Traitement OCR par lot pour plusieurs documents",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Les PDFs consultables permettent la sélection et la recherche de texte",
        "Une meilleure qualité de numérisation produit des résultats OCR plus précis",
        "Parfait pour la numérisation de documents anciens et l'archivage",
      ],
    },
    faq: [
      { question: "Quelle est la précision de la reconnaissance de texte OCR ?", answer: "La précision dépend de la qualité de numérisation. Les scans clairs et haute résolution atteignent une précision supérieure à 95%. Les mauvais scans peuvent nécessiter une correction manuelle." },
      { question: "Puis-je utiliser OCR sur des documents manuscrits ?", answer: "L'OCR fonctionne mieux avec le texte imprimé. La reconnaissance de contenu manuscrit est limitée et peut nécessiter une transcription manuelle." },
      { question: "Le traitement OCR est-il effectué localement dans mon navigateur ?", answer: "Oui. Tout le traitement OCR se fait localement dans votre navigateur sans uploads sur serveur externe." },
    ],
  },
  overlay: {
    howTo: {
      title: "Comment superposer des PDFs",
      steps: [
        "Chargez le PDF de base et les fichiers PDF de superposition.",
        "Alignez la position et l'échelle de la superposition.",
        "Ajustez l'opacité si nécessaire pour un effet de transparence.",
        "Cliquez sur « Appliquer » pour fusionner et télécharger.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Superposez un PDF sur un autre",
        "Positionnez et redimensionnez la superposition indépendamment",
        "Ajustement d'opacité pour les effets de fusion",
        "Application de superposition page par page",
        "Superposition par lot pour plusieurs documents",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Utilisez les superpositions pour ajouter des logos ou des filigranes à des documents par lot",
        "Ajustez l'opacité pour rendre le contenu de la superposition semi-transparent",
        "Parfait pour fusionner des formulaires avec des documents préimprimés",
      ],
    },
    faq: [
      { question: "En quoi la superposition est-elle différente de la fusion de PDFs ?", answer: "La superposition place un PDF sur un autre avec contrôle de positionnement. La fusion combine les pages séquentiellement." },
      { question: "Puis-je appliquer différentes superpositions à différentes pages ?", answer: "Oui. Vous pouvez appliquer différentes superpositions à des plages de pages spécifiques dans votre PDF de base." },
      { question: "Le traitement de superposition est-il effectué localement sur mon appareil ?", answer: "Oui. Toutes les opérations de superposition PDF se font dans votre navigateur sans données envoyées sur serveur." },
    ],
  },
  redact: {
    howTo: {
      title: "Comment expurger un PDF",
      steps: [
        "Chargez votre document PDF.",
        "Utilisez l'outil d'expurgation pour sélectionner le texte ou les zones à masquer.",
        "Appliquez les marques d'expurgation (cases noires sur le contenu).",
        "Cliquez sur « Appliquer » pour supprimer définitivement le contenu et télécharger.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Supprimez définitivement les informations sensibles des PDFs",
        "Dessinez des cases d'expurgation sur le texte ou les images",
        "Expurgation par lot avec style cohérent",
        "Personnalisez la couleur et l'opacité d'expurgation",
        "Vérifiez les expurgations avant l'export final",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Assurez-vous que les expurgations sont visibles avec une opacité suffisante",
        "L'expurgation est permanente — sauvegardez l'original avant d'appliquer",
        "Utilisez pour supprimer les données personnelles avant de partager des documents",
      ],
    },
    faq: [
      { question: "L'expurgation est-elle vraiment permanente et irréversible ?", answer: "Oui. Le contenu expurgé est définitivement supprimé du PDF et ne peut être récupéré ou rendu visible à nouveau." },
      { question: "Mon document sensible est-il gardé privé pendant l'expurgation ?", answer: "Oui. Toute l'expurgation se fait localement dans votre navigateur. Votre PDF n'est jamais envoyé ni stocké sur aucun serveur." },
      { question: "Puis-je expurger du texte caché qui n'est pas visuellement apparent ?", answer: "L'expurgation masque le contenu visible. Pour la suppression de métadonnées ou de texte caché, utilisez l'outil de suppression de métadonnées ou aplatissez le PDF." },
    ],
  },
  repair: {
    howTo: {
      title: "Comment réparer un PDF",
      steps: [
        "Chargez votre fichier PDF endommagé ou corrompu.",
        "Sélectionnez l'option de réparation : réparation automatique ou récupération avancée.",
        "Prévisualisez le document réparé.",
        "Cliquez sur « Réparer » pour corriger et télécharger le PDF restauré.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Corrigez les fichiers PDF endommagés avec réparation automatique",
        "Récupérez le contenu lisible des documents endommagés",
        "Support pour divers types de corruption PDF",
        "Prévisualisez le contenu réparé avant de sauvegarder",
        "Tentez de préserver le formatage original",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "La réparation récupère souvent la plupart du contenu des fichiers légèrement endommagés",
        "Certains formatages peuvent être perdus dans les fichiers très endommagés",
        "Gardez des sauvegardes des PDFs importants pour éviter la corruption",
      ],
    },
    faq: [
      { question: "La réparation récupérera-t-elle tout le contenu d'un PDF endommagé ?", answer: "La plupart du contenu est généralement récupéré, mais les fichiers très endommagés peuvent perdre certains formatages ou pages." },
      { question: "Qu'est-ce qui cause la corruption PDF en premier lieu ?", answer: "La corruption peut résulter de téléchargements incomplets, d'erreurs de transfert de fichiers, de dommages au média de stockage ou de plantages logiciels." },
      { question: "La réparation PDF est-elle effectuée localement sans upload sur serveur ?", answer: "Oui. Toutes les opérations de réparation se font dans votre navigateur sans uploads sur serveur externe." },
    ],
  },
  resize: {
    howTo: {
      title: "Comment redimensionner un PDF",
      steps: [
        "Chargez votre document PDF.",
        "Sélectionnez la taille de page cible (A3, A4, A5, Lettre, etc.).",
        "Choisissez l'option de mise à l'échelle : ajuster à la page ou maintenir les proportions.",
        "Cliquez sur « Redimensionner » pour appliquer et télécharger.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Redimensionnez aux tailles de papier standard (série A, Lettre, Légal)",
        "Dimensions de largeur et hauteur personnalisées",
        "Plusieurs options de mise à l'échelle (étirer, ajuster, proportions)",
        "Traitement par lot pour plusieurs PDFs",
        "Prévisualisez avant d'appliquer les modifications",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Redimensionnez à A5 pour des documents adaptés à la lecture mobile",
        "Utilisez l'option « Ajuster » pour préserver les proportions sans distorsion",
        "Redimensionnez plusieurs documents par lot pour la cohérence",
      ],
    },
    faq: [
      { question: "Le redimensionnement affectera-t-il la qualité ou la lisibilité du texte ?", answer: "L'utilisation « Ajuster » préserve la qualité du texte. Si vous utilisez « Étirer » avec des proportions significativement différentes, le texte peut se distordre." },
      { question: "Puis-je redimensionner seulement certaines pages dans un PDF multipages ?", answer: "L'outil redimensionne toutes les pages aux mêmes dimensions. Pour le redimensionnement sélectif, divisez et redimensionnez les pages séparément." },
      { question: "Le redimensionnement est-il effectué de manière sécurisée sans upload sur serveur ?", answer: "Oui. Tous les redimensionnements se font dans votre navigateur sans uploads de données." },
    ],
  },
  translate: {
    howTo: {
      title: "Comment traduire un PDF",
      steps: [
        "Chargez votre document PDF.",
        "Sélectionnez la langue source et la langue cible.",
        "Choisissez le format de sortie : PDF traduit ou vue côte à côte.",
        "Cliquez sur « Traduire » pour traiter et télécharger les résultats.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Traduisez le contenu PDF en plus de 100 langues",
        "Préservez le formatage et la mise en page originaux",
        "Support pour les PDFs texte et basés sur les images",
        "Traduction alimentée par l'IA pour des résultats naturels",
        "Traduction par lot de plusieurs documents",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Le prétraitement OCR améliore la précision de traduction pour les PDFs numérisés",
        "Les documents techniques peuvent nécessiter un examen manuel pour la précision",
        "Utilisez la vue côte à côte pour comparer l'original et la traduction",
      ],
    },
    faq: [
      { question: "Quelle est la précision de la traduction IA ?", answer: "La précision de traduction est élevée pour le contenu général, mais les documents techniques, médicaux ou juridiques doivent être examinés par un traducteur professionnel." },
      { question: "Le formatage et la mise en page seront-ils préservés après traduction ?", answer: "Oui. L'outil préserve la mise en page originale, les polices et le formatage tout en traduisant le contenu textuel." },
      { question: "Mon document PDF est-il gardé privé pendant la traduction ?", answer: "Oui. Toute la traduction se fait localement dans votre navigateur sans uploads sur serveur externe." },
    ],
  },
  unlock: {
    howTo: {
      title: "Comment déverrouiller un PDF",
      steps: [
        "Chargez votre fichier PDF protégé par mot de passe.",
        "Entrez le mot de passe utilisateur si le fichier est protégé.",
        "L'outil supprimera automatiquement les restrictions.",
        "Téléchargez votre PDF déverrouillé.",
      ],
    },
    features: {
      title: "Fonctionnalités principales",
      items: [
        "Supprimez la protection par mot de passe des PDFs",
        "Désactivez les restrictions d'impression, copie et édition",
        "Support pour les mots de passe utilisateur et propriétaire",
        "Déverrouillage par lot de plusieurs PDFs protégés",
        "Aucune perte de données pendant le processus de déverrouillage",
      ],
    },
    tips: {
      title: "Conseils d'utilisation",
      items: [
        "Le déverrouillage nécessite le mot de passe correct s'il est défini",
        "Utilisez uniquement pour les fichiers que vous possédez ou que vous avez la permission de modifier",
        "Les PDFs déverrouillés peuvent être édités avec d'autres outils",
      ],
    },
    faq: [
      { question: "Est-il légal de déverrouiller des PDFs protégés par mot de passe ?", answer: "Oui, si vous possédez le document ou avez la permission du propriétaire. Respectez les droits d'auteur et les restrictions d'utilisation." },
      { question: "Puis-je déverrouiller un PDF si je n'ai pas le mot de passe ?", answer: "Non. Si un mot de passe est défini, vous devez fournir le mot de passe correct. Cela protège la sécurité du document." },
      { question: "Le déverrouillage supprimera-t-il les restrictions de copie et d'impression de mon PDF ?", answer: "Oui. Le déverrouillage supprime la plupart des restrictions de permissions, permettant la copie, l'impression et l'édition." },
    ],
  },
};
