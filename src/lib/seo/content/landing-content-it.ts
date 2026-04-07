import type { LandingContentData } from "./landing-content";

export const landingContentIt: Record<string, LandingContentData> = {
  pdf: {
    title: "Informazioni su ToolPop PDF",
    description:
      "ToolPop PDF è una suite gratuita di strumenti PDF basata su browser. Unisci, dividi, comprimi, converti, modifica e proteggi i tuoi documenti PDF senza caricare file su alcun server - tutto funziona localmente nel tuo browser per la massima privacy e velocità.",
    sections: [
      {
        heading: "Elaborazione incentrata sulla privacy",
        text: "Tutte le operazioni PDF avvengono interamente nel tuo browser utilizzando WebAssembly e JavaScript. I tuoi file non lasciano mai il tuo dispositivo, quindi i documenti sensibili rimangono privati. Non è richiesto alcun account, nessun limite di dimensione file, nessuna filigrana.",
      },
      {
        heading: "Toolkit completo",
        text: "Dalle attività di base come unione e divisione alle funzionalità avanzate come redazione, firme digitali e conversione PDF/A - ToolPop PDF copre ogni flusso di lavoro PDF. Organizza le pagine, aggiungi filigrane, comprimi per email o converti tra i formati con pochi clic.",
      },
    ],
  },
  image: {
    title: "Informazioni su ToolPop Immagine",
    description:
      "ToolPop Image fornisce strumenti gratuiti di modifica e conversione delle immagini. Ridimensiona, ritaglia, comprimi, converti formati, applica filtri e crea grafica - tutto elaborato localmente nel tuo browser senza caricamenti server.",
    sections: [
      {
        heading: "Modifica senza software",
        text: "Non è necessario installare Photoshop o GIMP. ToolPop Image gestisce le attività di immagine quotidiane direttamente nel tuo browser - ridimensiona per i social media, ritaglia a dimensioni specifiche, aggiungi testo o filigrane e applica filtri professionali istantaneamente.",
      },
      {
        heading: "Conversione di formato semplificata",
        text: "Converti tra JPG, PNG, WebP, SVG, HEIC, TIFF, PSD, EPS e altri. L'elaborazione in lotto ti consente di convertire più file contemporaneamente. Ogni conversione preserva la qualità ottimizzando la dimensione del file.",
      },
    ],
  },
  text: {
    title: "Informazioni su ToolPop Testo",
    description:
      "ToolPop Text offre una raccolta di strumenti gratuiti per la manipolazione, l'analisi e la codifica del testo. Conta parole, trasforma maiuscole/minuscole, trova e sostituisci, genera hash, formatta JSON e altro - tutto eseguito istantaneamente nel tuo browser.",
    sections: [
      {
        heading: "Per scrittori e sviluppatori",
        text: "Che tu abbia bisogno di conteggi di parole per un saggio, test regex per il codice, codifica Base64 per il lavoro API, o Lorem Ipsum per i mockup - ToolPop Text ha uno strumento specializzato per ogni attività di testo.",
      },
      {
        heading: "Risultati istantanei",
        text: "Ogni strumento elabora il testo in tempo reale mentre digiti. Nessuna attesa, nessun round trip al server. Gestisci facilmente documenti di grandi dimensioni grazie all'elaborazione lato client ottimizzata.",
      },
    ],
  },
  converter: {
    title: "Informazioni su ToolPop Convertitore",
    description:
      "ToolPop Converter è un toolkit gratuito di conversione di unità e dati. Converti misurazioni, colori, date, formati di dati e unità CSS istantaneamente nel tuo browser. Dalle misurazioni di cucina quotidiane alle conversioni JSON/YAML focalizzate sugli sviluppatori.",
    sections: [
      {
        heading: "Ogni conversione di cui hai bisogno",
        text: "Lunghezza, peso, temperatura, area, volume, velocità, pressione, energia - tutte le conversioni di unità standard con risultati in tempo reale. Più strumenti specializzati per formati di colore, conversioni di fuso orario, sistemi di coordinate e altro.",
      },
      {
        heading: "Strumenti per sviluppatori",
        text: "Converti tra JSON, YAML, CSV, XML, TOML e tipi TypeScript. Minifica CSS, converti tra px/rem/em e genera utility Tailwind. Costruito per il moderno flusso di lavoro di sviluppo.",
      },
    ],
  },
  calculator: {
    title: "Informazioni su ToolPop Calcolatrice",
    description:
      "ToolPop Calcolatrice fornisce calcolatrici online gratuite per matematica, finanza, salute, statistica e attività quotidiane. Dall'interesse composto al BMI alle operazioni di matrice e calcoli di subnet - risultati accurati con spiegazioni chiare.",
    sections: [
      {
        heading: "Precisione professionale",
        text: "Ogni calcolatrice utilizza formule matematiche precise con corretta arrotondamento e gestione dei casi limite. Le calcolatrici finanziarie tengono conto dei periodi di compounding, le calcolatrici sanitarie utilizzano equazioni clinicamente validate e gli strumenti statistici gestiscono le distribuzioni di dati del mondo reale.",
      },
      {
        heading: "Per tutti",
        text: "Gli studenti possono risolvere equazioni quadratiche e calcolare il GPA. I professionisti possono analizzare il ROI e i punti di pareggio. I proprietari di case possono stimare le esigenze di vernice, cemento e piastrelle. Ogni calcolatrice fornisce input chiari, risultati istantanei e contesto utile.",
      },
    ],
  },
};
