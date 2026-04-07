import { LandingContentData } from "./landing-content";

export const landingContentFr: Record<string, LandingContentData> = {
  pdf: {
    title: "À propos de ToolPop PDF",
    description:
      "ToolPop PDF est une suite gratuite d'outils PDF basée sur navigateur. Fusionnez, divisez, compressez, convertissez, éditez et sécurisez vos documents PDF sans charger les fichiers sur un serveur — tout s'exécute localement dans votre navigateur pour une confidentialité et une vitesse maximales.",
    sections: [
      {
        heading: "Traitement respectueux de la confidentialité",
        text: "Toutes les opérations PDF s'exécutent entièrement dans votre navigateur en utilisant WebAssembly et JavaScript. Vos fichiers ne quittent jamais votre appareil, vos documents sensibles restent privés. Aucune inscription requise, aucune limite de taille de fichier, aucune filigrane.",
      },
      {
        heading: "Ensemble d'outils complet",
        text: "Des tâches basiques comme la fusion et la division aux fonctionnalités avancées comme la rédaction, les signatures numériques et la conversion PDF/A — ToolPop PDF couvre tous les flux de travail PDF. Organisez les pages, ajoutez des filigranes, compressez pour e-mail ou convertissez entre les formats en quelques clics.",
      },
    ],
  },
  image: {
    title: "À propos de ToolPop Image",
    description:
      "ToolPop Image fournit des outils gratuits d'édition et de conversion d'images en ligne. Redimensionnez, recadrez, compressez, convertissez les formats, appliquez des filtres et créez des graphiques — tout traité localement dans votre navigateur sans envoi aux serveurs.",
    sections: [
      {
        heading: "Éditez sans logiciel",
        text: "Pas besoin d'installer Photoshop ou GIMP. ToolPop Image gère les tâches d'image quotidiennes directement dans votre navigateur — redimensionnez pour les réseaux sociaux, recadrez selon des dimensions spécifiques, ajoutez du texte ou des filigranes, appliquez des filtres professionnels instantanément.",
      },
      {
        heading: "Conversion de format facile",
        text: "Convertissez entre JPG, PNG, WebP, SVG, HEIC, TIFF, PSD, EPS et bien d'autres. Le traitement par lots vous permet de convertir plusieurs fichiers à la fois. Chaque conversion préserve la qualité tout en optimisant la taille du fichier.",
      },
    ],
  },
  text: {
    title: "À propos de ToolPop Text",
    description:
      "ToolPop Text offre une collection d'outils gratuits de manipulation de texte, d'analyse et d'encodage. Comptez les mots, transformez la casse, trouvez et remplacez, générez des hashes, formatez JSON, et bien plus — tout s'exécute instantanément dans votre navigateur.",
    sections: [
      {
        heading: "Pour les écrivains et développeurs",
        text: "Que vous ayez besoin de comptages de mots pour un essai, de tests regex pour le code, d'encodage Base64 pour le travail API, ou de Lorem Ipsum pour les maquettes — ToolPop Text a un outil spécialisé pour chaque tâche textuelle.",
      },
      {
        heading: "Résultats instantanés",
        text: "Chaque outil traite le texte en temps réel au fur et à mesure que vous tapez. Aucune attente, aucun aller-retour au serveur. Gérez de grands documents facilement grâce au traitement côté client optimisé.",
      },
    ],
  },
  converter: {
    title: "À propos de ToolPop Converter",
    description:
      "ToolPop Converter est une boîte à outils gratuite de conversion d'unités et de données. Convertissez les mesures, les couleurs, les dates, les formats de données et les unités CSS instantanément dans votre navigateur. Des mesures culinaires quotidiennes aux conversions JSON/YAML axées sur les développeurs.",
    sections: [
      {
        heading: "Chaque conversion dont vous avez besoin",
        text: "Longueur, poids, température, surface, volume, vitesse, pression, énergie — toutes les conversions d'unités standard avec résultats en temps réel. Plus des outils spécialisés pour les formats de couleur, les conversions de fuseau horaire, les systèmes de coordonnées, et bien plus.",
      },
      {
        heading: "Outils pour développeurs",
        text: "Convertissez entre JSON, YAML, CSV, XML, TOML et les types TypeScript. Minifiez CSS, convertissez entre px/rem/em et générez les utilitaires Tailwind. Conçu pour le flux de travail de développement moderne.",
      },
    ],
  },
  calculator: {
    title: "À propos de ToolPop Calculator",
    description:
      "ToolPop Calculator fournit des calculatrices en ligne gratuites pour les mathématiques, la finance, la santé, les statistiques et les tâches quotidiennes. De l'intérêt composé et l'IMC aux opérations matricielles et aux calculs de sous-réseau — résultats précis avec des explications claires.",
    sections: [
      {
        heading: "Précision professionnelle",
        text: "Chaque calculatrice utilise des formules mathématiques précises avec un arrondissement approprié et une gestion des cas limites. Les calculatrices financières tiennent compte des périodes de composition, les calculatrices de santé utilisent des équations cliniquement validées et les outils statistiques gèrent les distributions de données réelles.",
      },
      {
        heading: "Pour tout le monde",
        text: "Les étudiants peuvent résoudre des équations quadratiques et calculer le GPA. Les professionnels peuvent analyser le ROI et les points d'équilibre. Les propriétaires peuvent estimer les besoins en peinture, béton et tuiles. Chaque calculatrice fournit des entrées claires, des résultats instantanés et un contexte utile.",
      },
    ],
  },
};
