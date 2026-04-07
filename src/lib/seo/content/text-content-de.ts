import type { ToolContentMap } from "../tool-content-types";

export const textContentDe: ToolContentMap = {
  "word-counter": {
    howTo: {
      title: "Wörter zählen",
      steps: [
        "Geben Sie Ihren Text in das Eingabefeld ein oder fügen Sie ihn ein",
        "Klicken Sie auf die Schaltfläche \"Zählen\" oder das Tool zählt automatisch während Sie tippen",
        "Sehen Sie Wortanzahl, Zeichenanzahl und andere Statistiken in Echtzeit",
        "Kopieren Sie die Ergebnisse oder löschen Sie, um einen anderen Text zu analysieren",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Sofortige Wortanzahl mit Live-Updates",
        "Zeigt Zeichenanzahl mit und ohne Leerzeichen",
        "Zeigt Absatz- und Satzanzahl",
        "Echtzeitverarbeitung ohne Dateigröße-Limits",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie Wort-Zähler zum Nachverfolgung von Essay- oder Artikel-Länge für akademische Anforderungen",
        "Überwachen Sie Tweet- oder Social-Media-Post-Zeichenlimits",
        "Überprüfen Sie Wortanzahl für Bewerbungs- oder Lebenslauf-Zeichenlimits",
      ],
    },
    faq: [
      { question: "Zählt es Wörter in allen Sprachen?", answer: "Ja. Der Wort-Zähler unterstützt Text in jeder Sprache, einschließlich CJK-Zeichen, Arabisch und kyrillischen Schriften." },
      { question: "Gibt es ein Text-Längenlimit?", answer: "Nein. Sie können Text beliebiger Länge einfügen und erhalten sofort Ergebnisse. Die Verarbeitung erfolgt in Ihrem Browser ohne Server-Limits." },
      { question: "Zählt es bindestrich-verbundene Wörter als eins oder zwei?", answer: "Bindestrich-verbundene Wörter wie \"gut-bekannt\" werden als ein Wort gezählt, nach Standard-Wort-Zählkonventionen." },
    ],
  },
  "character-counter": {
    howTo: {
      title: "Zeichen zählen",
      steps: [
        "Geben Sie Ihren Text in das Eingabefeld ein oder fügen Sie ihn ein",
        "Das Tool zeigt automatisch Zeichenanzahl in Echtzeit",
        "Sehen Sie Zeichen mit und ohne Leerzeichen separat",
        "Setzen Sie zurück und analysieren Sie verschiedene Text nach Bedarf",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Zählen Sie Zeichen mit und ohne Leerzeichen",
        "Zeigen Sie Zeichen-Statistiken sofort an",
        "Visuelle Indikatoren für Zeichenlimits",
        "Unterstützen Sie alle Unicode-Zeichen und Spezialzeichen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Perfekt für Twitter-Bio-Limits (160 Zeichen)",
        "Überwachen Sie SMS-Zeichenlimits für Textnachrichten",
        "Überprüfen Sie Meta-Beschreibungen für SEO-Konformität (160 Zeichen)",
      ],
    },
    faq: [
      { question: "Wie werden Emojis und Spezialzeichen gezählt?", answer: "Emojis und Spezialzeichen werden einzeln gezählt. Ein Emoji wie 😀 zählt als ein Zeichen." },
      { question: "Was ist der Unterschied zwischen \"mit Leerzeichen\" und \"ohne Leerzeichen\"?", answer: "\"Mit Leerzeichen\" enthält alle Leerzeichen zwischen Wörtern, \"ohne Leerzeichen\" zählt nur Buchstaben, Zahlen und Symbole ohne Leerzeichen." },
      { question: "Werden meine Text-Daten gespeichert oder an einen Server gesendet?", answer: "Nein. Die gesamte Verarbeitung erfolgt in Ihrem Browser. Ihr Text wird niemals irgendwohin übertragen und bleibt vollständig privat." },
    ],
  },
  "text-statistics": {
    howTo: {
      title: "Text-Statistiken analysieren",
      steps: [
        "Fügen Sie Ihren Text in den Analyzer ein",
        "Überprüfen Sie umfangreiche Statistiken einschließlich Wort-, Zeichen- und Zeilenanzahl",
        "Überprüfen Sie Lese-Zeitschätzungen und Satz-Informationen",
        "Exportieren oder teilen Sie die detaillierte Analyse",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Vollständige Text-Analyse mit Wort-, Zeichen-, Absatz- und Satzmetriken",
        "Lese-Zeitschätzung basierend auf durchschnittlicher Lesegeschwindigkeit",
        "Berechnung durchschnittlicher Wort- und Satzlänge",
        "Detaillierte Aufschlüsselung der Text-Zusammensetzung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie Lesezeit zum Optimieren von Blog-Post-Länge und Leser-Engagement",
        "Verfolgen Sie durchschnittliche Wortlänge zur Verbesserung von Lesbarkeit und Klarheit",
        "Überwachen Sie Satzanzahl, um sicherzustellen Sie haben vielfältige Satzstruktur",
      ],
    },
    faq: [
      { question: "Wie wird Lesezeit berechnet?", answer: "Lesezeit wird basierend auf einer durchschnittlichen Lesegeschwindigkeit von 200 Wörtern pro Minute geschätzt, ein Standard-Benchmark für erwachsene Leser." },
      { question: "Was zählt als Absatz?", answer: "Absätze sind Text-Abschnitte, die durch Zeilenumbrüche getrennt sind. Das Tool zählt jeden einzelnen Absatz, der durch Leerzeilen oder Rückkehrlinien getrennt ist." },
      { question: "Werden Statistiken live aktualisiert, während ich tippe?", answer: "Ja. Alle Statistiken aktualisieren sich sofort, während Sie tippen oder neuen Text einfügen. Die Analyse erfolgt vollständig in Ihrem Browser für unmittelbares Feedback." },
    ],
  },
  "keyword-density": {
    howTo: {
      title: "Schlüsselwort-Dichte analysieren",
      steps: [
        "Fügen Sie Ihren Inhalts-Text in das Eingabefeld ein",
        "Geben Sie Schlüsselwörter ein, die Sie analysieren möchten, oder lassen Sie das Tool Top-Schlüsselwörter automatisch erkennen",
        "Überprüfen Sie Schlüsselwort-Häufigkeit und Dichte-Prozentsätze",
        "Optimieren Sie Inhalte basierend auf Dichte-Empfehlungen",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Automatische Schlüsselwort-Extraktion und Häufigkeitsanalyse",
        "Schlüsselwort-Dichte-Prozentsatz-Berechnung",
        "Visuelle Bewertung der am häufigsten verwendeten Schlüsselwörter",
        "Unterstützen Sie mehrere Schlüsselwörter und benutzerdefinierte Schlüsselwort-Listen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Streben Sie nach einer Schlüsselwort-Dichte von 1–3% für natürliche SEO-Optimierung",
        "Vermeiden Sie Über-Optimierung, die Schlüsselwort-Spam-Strafen auslösen kann",
        "Analysieren Sie Konkurrenz-Inhalte, um Schlüsselwort-Nutzungsmuster zu vergleichen",
      ],
    },
    faq: [
      { question: "Was ist Schlüsselwort-Dichte und warum ist sie für SEO wichtig?", answer: "Schlüsselwort-Dichte ist der Prozentsatz, wie oft ein Schlüsselwort in Ihrem Inhalt angezeigt wird. Ausgewogene Dichte (1–3%) hilft Suchmaschinen, Ihr Thema zu verstehen, ohne Spam-Strafen auszulösen." },
      { question: "Kann ich mehrere Schlüsselwörter gleichzeitig analysieren?", answer: "Ja. Sie können mehrere Schlüsselwörter, durch Kommas getrennt, eingeben und das Tool analysiert die Dichte für jedes gleichzeitig." },
      { question: "Ist die Analyse vertraulich?", answer: "Absolut. Ihr Inhalt wird vollständig in Ihrem Browser analysiert und wird niemals irgendwohin gesendet, was Datenschutz für sensible Inhalte gewährleistet." },
    ],
  },
  "find-duplicates": {
    howTo: {
      title: "Doppelte Zeilen finden",
      steps: [
        "Fügen Sie Ihren Text mit mehreren Zeilen in den Eingabebereich ein",
        "Das Tool identifiziert automatisch und hebt doppelte Zeilen hervor",
        "Überprüfen Sie die Anzahl der Duplikate und deren Vorkommen",
        "Entfernen Sie Duplikate oder exportieren Sie die Duplikat-Liste",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Sofortige Duplikat-Zeilen-Erkennung mit Vorkommen-Anzahl",
        "Visuelle Hervorhebung doppelter Einträge",
        "Zeigen Sie nur Duplikate oder Alles an",
        "Export-Optionen für Duplikate",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie zum Bereinigen von Daten-Listen",
        "Finden Sie fehlerhafte Einträge in Datenbanken",
        "Überprüfen Sie Logs auf wiederholte Fehler",
      ],
    },
    faq: [
      { question: "Ist der Vergleich case-sensitive?", answer: "Normalerweise nicht. \"Hallo\" und \"hallo\" werden als gleich angesehen. Überprüfen Sie Tool-Optionen." },
      { question: "Funktioniert dies mit großen Listen?", answer: "Ja. Die Verarbeitung erfolgt lokal, kann aber mit sehr großen Listen langsam werden." },
      { question: "Kann ich Duplikate automatisch entfernen?", answer: "Ja. Einige Tools bieten \"Duplikate entfernen\"-Funktion." },
    ],
  },
  "remove-duplicates": {
    howTo: {
      title: "Doppelte Zeilen entfernen",
      steps: [
        "Fügen Sie Text mit doppelten Zeilen ein",
        "Das Tool identifiziert und entfernt Duplikate automatisch",
        "Wählen Sie, ob Sie die erste oder letzte Instanz behalten",
        "Laden Sie Text ohne Duplikate herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Entfernen Sie Duplikate mit einem Klick",
        "Behhalten Sie Reihenfolge beibehältlich",
        "Case-sensitive oder nicht-sensitive Optionen",
        "Zeige gelöschte Zeilen an",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Perfekt zur Daten-Bereinigung",
        "Entfernen Sie doppelte E-Mails aus Listen",
        "Bereinigen Sie Suchmaschinen-Crawl-Protokolle",
      ],
    },
    faq: [
      { question: "Bleibt die Reihenfolge erhalten?", answer: "Ja. Das Tool behält die Originalreihenfolge bei (Duplikate später werden entfernt)." },
      { question: "Kann ich auswählen, welche Duplikate behalten werden?", answer: "Einige Tools ermöglichen dies – überprüfen Sie Optionen für erste/letzte Duplikat-Beibehaltung." },
      { question: "Ist dies reversibel?", answer: "Nein. Speichern Sie Backups vor dem Entfernen von Duplikaten." },
    ],
  },
  "remove-empty-lines": {
    howTo: {
      title: "Leere Zeilen entfernen",
      steps: [
        "Fügen Sie Text mit leeren Zeilen ein",
        "Das Tool entfernt alle leeren oder Whitespace-Only-Zeilen",
        "Sehen Sie den bereinigten Text sofort",
        "Kopieren Sie oder laden Sie das Ergebnis herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Entfernen Sie leere und Whitespace-Only-Zeilen",
        "Behalten Sie nicht-leere Zeilen bei",
        "Echtzeitvorschau",
        "Rückgängig/Zurücksetzen-Optionen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Bereinigen Sie formatierte Texte",
        "Vorbereiten von Text zum Import",
        "Entfernen Sie Formatierungsartefakte",
      ],
    },
    faq: [
      { question: "Was zählt als leere Zeile?", answer: "Vollständig leere Zeilen oder Zeilen nur mit Leerzeichen/Tabs." },
      { question: "Werden Zeilenumbrüche beibehalten?", answer: "Ja. Nur wirklich leere Zeilen werden entfernt." },
      { question: "Funktioniert dies mit großen Dateien?", answer: "Ja. Verarbeitung erfolgt lokal ohne Größenlimits." },
    ],
  },
  "remove-extra-spaces": {
    howTo: {
      title: "Zusätzliche Leerzeichen entfernen",
      steps: [
        "Fügen Sie Text mit mehreren Leerzeichen ein",
        "Das Tool entfernt automatisch extra Leerzeichen",
        "Wählen Sie, ob auch Tabs und Absätze bereinigt werden",
        "Kopieren Sie oder laden Sie den bereinigten Text herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Entfernen Sie mehrere hintereinander folgende Leerzeichen",
        "Optionen für Tabs und Zeilenumbruch-Bereinigung",
        "Behalten Sie single space Struktur",
        "Schnelle Verarbeitung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Bereinigen Sie kopiert eingefügten Text",
        "Vorbereiten von Daten für Verarbeitung",
        "Normalisieren Sie Whitespace",
      ],
    },
    faq: [
      { question: "Entfernt dies Leerzeilen?", answer: "Nein, aber Sie können dies kombiniert mit \"Leere Zeilen entfernen\" tun." },
      { question: "Was ist mit Tabs?", answer: "Optionale Einstellung zum Konvertieren von Tabs zu Leerzeichen." },
      { question: "Funktioniert dies in allen Sprachen?", answer: "Ja. Leerzeichen-Normalisierung ist universal." },
    ],
  },
  "case-converter": {
    howTo: {
      title: "Textfall konvertieren",
      steps: [
        "Geben Sie Ihren Text ein oder fügen Sie ihn ein",
        "Wählen Sie eine Fall-Option: Großbuchstaben, Kleinbuchstaben, Satzfall, Titelf all, umgekehrter Fall",
        "Sehen Sie das Ergebnis sofort",
        "Kopieren Sie den umgewandelten Text",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen Großbuchstaben, Kleinbuchstaben, Titel-Fall, Satz-Fall",
        "Umgekehrter Fall (aLtErNaTiNg)",
        "CamelCase und kebab-case Optionen",
        "Echtzeitkonvertierung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie Großbuchstaben für Überschriften",
        "Verwenden Sie Kleinbuchstaben für URL-Slugs",
        "Verwenden Sie Titellfall für Buchtitel",
      ],
    },
    faq: [
      { question: "Was ist CamelCase?", answer: "Jedes Wort wird großgeschrieben und Leerzeichen entfernt: \"MeinText\"." },
      { question: "Was ist kebab-case?", answer: "Kleinbuchstaben mit Bindestrichen: \"mein-text\"." },
      { question: "Werden Sonderzeichen beeinflusst?", answer: "Nein, nur alphabetische Zeichen werden konvertiert." },
    ],
  },
  "trim-text": {
    howTo: {
      title: "Text kürzen",
      steps: [
        "Fügen Sie Ihren Text ein",
        "Das Tool entfernt automatisch führende/nachfolgende Leerzeichen",
        "Wählen Sie, wie viele Zeichen Sie behalten möchten",
        "Kopieren oder laden Sie den gekürzten Text herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Entfernen Sie führende/nachfolgende Leerzeichen",
        "Kürzen Sie auf maximale Zeichenanzahl",
        "Kürzen Sie auf maximale Wortanzahl",
        "Behalten Sie Strukturaufbau",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Bereinigen Sie kopierter Text",
        "Passen Sie Text an Zeichenlimits",
        "Entfernen Sie Whitespace",
      ],
    },
    faq: [
      { question: "Wird der Text in der Mitte gekürzt?", answer: "Nein, normalerweise am Ende oder Sie können die Mitte wählen." },
      { question: "Können Sie spezifische Zeichen entfernen?", answer: "Für das \"Trimmen\" nur Leerzeichen, aber siehe \"Spezialzeichen entfernen\"." },
      { question: "Funktioniert dies mit mehrsprachigem Text?", answer: "Ja. Trimmen funktioniert mit allen Sprachen." },
    ],
  },
  "reverse-text": {
    howTo: {
      title: "Text umkehren",
      steps: [
        "Geben Sie Ihren Text ein",
        "Das Tool kehrt automatisch um",
        "Sehen Sie das Ergebnis sofort",
        "Kopieren Sie oder laden Sie herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Kehren Sie Text-Reihenfolge um",
        "Umkehren Sie Zeile für Zeile",
        "Umkehren Sie Wort für Wort",
        "Umkehren Sie Zeichen für Zeichen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Einfach zu nutzbar",
        "Palindrom-Check",
        "Text-Rätsel",
      ],
    },
    faq: [
      { question: "Was ist der Unterschied zwischen Zeile/Wort/Charakter-Umkehrung?", answer: "Zeile kehrt Zeilen um, Wort kehrt Wörter um, Charakter kehrt jeden Buchstaben um." },
      { question: "Funktioniert dies mit Special-Zeichen?", answer: "Ja. Alle Zeichen werden korrekt umgekehrt." },
      { question: "Können Sie Richtungs-Text (z.B. Arabisch) umkehren?", answer: "Ja, aber Vorsicht – Richtungs-Text kann sonderbar aussehen umgekehrt." },
    ],
  },
  "text-sort": {
    howTo: {
      title: "Text sortieren",
      steps: [
        "Geben Sie Text ein (zeilenweise)",
        "Wählen Sie Sortierreihenfolge (A-Z oder Z-A)",
        "Das Tool sortiert automatisch",
        "Kopieren Sie das Ergebnis",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Sortieren Sie Zeilen alphabetisch",
        "Auf- oder absteigend",
        "Numerische Sortierung verfügbar",
        "Entfernen Sie Duplikate während Sortierung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Organisieren Sie Listen",
        "Alphabetisieren Sie Namen",
        "Sortieren Sie URL-Listen",
      ],
    },
    faq: [
      { question: "Funktioniert numerische Sortierung?", answer: "Ja. Wählen Sie numerisch statt alphabetisch." },
      { question: "Kann ich benutzerdefiniert sortieren?", answer: "Standard ist alphabetisch, aber einige Tools ermöglichen benutzerdefinierte Kriterien." },
      { question: "Wird Groß-/Kleinschreibung beachtet?", answer: "Normalerweise nicht, aber Sie können diese Einstellung ändern." },
    ],
  },
  "split-text": {
    howTo: {
      title: "Text aufteilen",
      steps: [
        "Geben Sie Ihren Text ein",
        "Geben Sie ein Trennzeichen ein (Komma, Zeilenumbruch, etc.)",
        "Das Tool teilt automatisch",
        "Sehen Sie Teile auf separaten Zeilen",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Teilen Sie nach beliebigem Trennzeichen",
        "Unterstützen Sie Zeilenumbruch, Komma, Tab, etc.",
        "Regulärer Ausdruck verfügbar",
        "Zeigen Sie Anzahl der Teile",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Teilen Sie komma-getrennte Listen",
        "Extrahieren Sie einzelne Wörter",
        "Analysieren Sie strukturierte Daten",
      ],
    },
    faq: [
      { question: "Funktionieren reguläre Ausdrücke?", answer: "Ja, wenn die Option verfügbar ist." },
      { question: "Was, wenn Trennzeichen nicht gefunden werden?", answer: "Text wird nicht geteilt; alles wird auf einer Zeile angezeigt." },
      { question: "Können Sie mehrfache Trennzeichen verwenden?", answer: "Ja, oder verwenden Sie Regex für komplexe Muster." },
    ],
  },
  "join-text": {
    howTo: {
      title: "Text zusammenführen",
      steps: [
        "Geben Sie mehrere Zeilen Text ein",
        "Wählen Sie ein Trennzeichen (Leerzeichen, Komma, Bindestrich, etc.)",
        "Das Tool verbindet alle Zeilen",
        "Kopieren Sie das Ergebnis",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Verbinden Sie Zeilen mit beliebigem Trennzeichen",
        "Voreingestellte Trennzeichen verfügbar",
        "Benutzerdefinierte Trennzeichen",
        "Entfernen Sie Leerzeichen Option",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Erstellen Sie Listen",
        "Generieren Sie komma-getrennte Daten",
        "Formatieren Sie Text für CSV",
      ],
    },
    faq: [
      { question: "Kann ich mehrere Trennzeichen verwenden?", answer: "Nein, aber Sie können mehrere Durchläufe durchführen." },
      { question: "Was ist mit leeren Zeilen?", answer: "Sie werden normalerweise übersprungen." },
      { question: "Funktioniert dies mit besonderen Zeichen?", answer: "Ja. Alle Zeichen werden als Trennzeichen unterstützt." },
    ],
  },
  "find-and-replace": {
    howTo: {
      title: "Suchen und ersetzen",
      steps: [
        "Geben Sie Ihren Text ein",
        "Geben Sie den Such-Satz ein",
        "Geben Sie den Ersatz-Satz ein",
        "Klicken Sie \"Ersetzen\" oder \"Alles ersetzen\"",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Suchen Sie nach Text oder regulärem Ausdruck",
        "Ersetzen Sie einzeln oder alles",
        "Case-sensitive Optionen",
        "Zeige Anzahl Treffer",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Schnelle Text-Bearbeitung",
        "Massenänderungen durchführen",
        "Bereinigen Sie Daten",
      ],
    },
    faq: [
      { question: "Funktionieren reguläre Ausdrücke?", answer: "Ja, wenn die Regex-Option aktiviert ist." },
      { question: "Ist es case-sensitive?", answer: "Optional. Sie können diese Einstellung ändern." },
      { question: "Kann ich Änderungen rückgängig machen?", answer: "Ja, es gibt einen Rückgängig-Button." },
    ],
  },
  "text-diff": {
    howTo: {
      title: "Text vergleichen",
      steps: [
        "Fügen Sie Text 1 in das linke Feld ein",
        "Fügen Sie Text 2 in das rechte Feld ein",
        "Das Tool hebt Unterschiede automatisch hervor",
        "Sehen Sie Hinzufügungen, Löschungen und Änderungen",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Zeigen Sie Unterschiede nebeneinander",
        "Hervorhebung Hinzufügungen (grün), Löschungen (rot), Änderungen (orange)",
        "Zeilenweise Vergleich verfügbar",
        "Wort-Ebene Diff verfügbar",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Vergleichen Sie Dokument-Versionen",
        "Überprüfen Sie Codeänderungen",
        "Finden Sie Unterschiede in Texten",
      ],
    },
    faq: [
      { question: "Funktioniert dies mit großen Dateien?", answer: "Ja, aber sehr große Unterschiede können überwältigend werden." },
      { question: "Können Sie das Diff-Format ändern?", answer: "Normalerweise Seite-an-Seite oder Zeile-für-Zeile." },
      { question: "Wird Groß-/Kleinschreibung ignoriert?", answer: "Normalerweise nein, aber Sie können diese Einstellung ändern." },
    ],
  },
  "base64": {
    howTo: {
      title: "Base64 codieren/decodieren",
      steps: [
        "Geben Sie Text ein (zu codieren) oder Base64 (zu decodieren)",
        "Das Tool konvertiert automatisch",
        "Sehen Sie das Ergebnis sofort",
        "Kopieren Sie das codierte/decodierte Text",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Codieren Sie Text zu Base64",
        "Decodieren Sie Base64 zu Text",
        "Datei-Upload verfügbar",
        "Große Dateien unterstützt",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie für API-Daten-Übertragung",
        "Verschlüsseln Sie E-Mail-Anhänge",
        "Text in URLs für Sicherheit codieren",
      ],
    },
    faq: [
      { question: "Was ist Base64?", answer: "Base64 kodiert Binärdaten mit 64 lesbaren ASCII-Zeichen." },
      { question: "Ist Base64 Verschlüsselung?", answer: "Nein, es ist Codierung, nicht Verschlüsselung. Jeder kann decodieren." },
      { question: "Funktioniert dies mit Bildern?", answer: "Ja, laden Sie die Bilddatei hoch zum Codieren." },
    ],
  },
  "hex-converter": {
    howTo: {
      title: "Text zu Hexadezimal konvertieren",
      steps: [
        "Geben Sie Text ein (zu hex konvertieren) oder hex (zum Decodieren)",
        "Das Tool konvertiert automatisch",
        "Sehen Sie beide Text und hex Seitenansicht",
        "Kopieren Sie das Ergebnis",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie Text zu Hexadezimal",
        "Decodieren Sie Hexadezimal zu Text",
        "Mit oder ohne Leerzeichen",
        "Byte-weise oder String-weise Konvertierung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Debuggen Sie Binärdaten",
        "Analysieren Sie Netzwerk-Pakete",
        "Kodieren Sie Daten",
      ],
    },
    faq: [
      { question: "Was ist Hexadezimal?", answer: "Base-16 Zahlensystem, das Zahlen 0-9 und Buchstaben A-F verwendet." },
      { question: "Warum Hexadezimal verwenden?", answer: "Kompakter und lesbarer als Binär für menschliche Betrachter." },
      { question: "Funktioniert dies mit Emojis?", answer: "Ja, aber der Output wird sehr lang." },
    ],
  },
  "binary-converter": {
    howTo: {
      title: "Text zu Binär konvertieren",
      steps: [
        "Geben Sie Text ein (zu binär konvertieren) oder binär (zum Decodieren)",
        "Das Tool konvertiert automatisch",
        "Sehen Sie Text und Binär-Darstellung",
        "Kopieren Sie das Ergebnis",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie Text zu Binär",
        "Decodieren Sie Binär zu Text",
        "Mit oder ohne Leerzeichen",
        "ASCII oder Unicode",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verstehen Sie Daten auf niedriger Ebene",
        "Lernen Sie Computergrundlagen",
        "Debuggen Sie Bitoperationen",
      ],
    },
    faq: [
      { question: "Was ist Binär?", answer: "Base-2 Zahlensystem, das nur 0 und 1 verwendet." },
      { question: "Ist Binär das gleiche wie Maschinen-Code?", answer: "Nein, Binär ist numerisch; Maschinen-Code ist Instruktion." },
      { question: "Warum Binär verwenden?", answer: "Grundlage aller digitalen Computer, zeigt Daten auf niedriger Ebene." },
    ],
  },
  "url-encode": {
    howTo: {
      title: "Text in URL codieren",
      steps: [
        "Geben Sie Text ein (zu codieren) oder URL (zu decodieren)",
        "Das Tool konvertiert automatisch",
        "Sehen Sie codierte/decodierte Version",
        "Kopieren Sie in die Zwischenablage",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Codieren Sie Text für URLs",
        "Decodieren Sie URL-codierte Daten",
        "Ersetzt Leerzeichen und Spezialzeichen",
        "Standard RFC 3986 Codierung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Codieren Sie Query-Parameter",
        "Erstellen Sie sichere URLs",
        "Übergeben Sie Daten in URLs",
      ],
    },
    faq: [
      { question: "Warum URL-Codierung verwenden?", answer: "Spezialzeichen können URLs brechen; Codierung macht sie sicher." },
      { question: "Was wird codiert?", answer: "Leerzeichen, &, ?, #, @, =, /, etc." },
      { question: "Funktioniert dies mit der gesamten URL?", answer: "Normalerweise nur Query-Parameter. Die Domain sollte nicht codiert werden." },
    ],
  },
  "html-encode": {
    howTo: {
      title: "HTML-Zeichen codieren/decodieren",
      steps: [
        "Geben Sie Text ein (zu codieren) oder HTML (zu decodieren)",
        "Das Tool konvertiert automatisch",
        "Sehen Sie HTML-Entities",
        "Kopieren Sie das codierte HTML",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Codieren Sie Text zu HTML-Entities",
        "Decodieren Sie HTML-Entities zu Text",
        "Numeric und Named Entities",
        "Spezialzeichen korrekt behandelt",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Schreiben Sie & in HTML korrekt als &amp;",
        "Vermeiden Sie HTML-Injection",
        "Anzeige von Code auf Webseiten",
      ],
    },
    faq: [
      { question: "Was ist HTML-Entity?", answer: "Spezieller HTML-Code, der Zeichen darstellt, wie &amp; für &." },
      { question: "Warum HTML-Codierung verwenden?", answer: "Vermeiden Sie HTML-Syntax-Fehler und Sicherheitsprobleme." },
      { question: "Funktioniert dies mit Emojis?", answer: "Ja, mit numerischen Entities." },
    ],
  },
  "url-extractor": {
    howTo: {
      title: "URLs aus Text extrahieren",
      steps: [
        "Fügen Sie Text mit URLs ein",
        "Das Tool erkennt automatisch URLs",
        "Sehen Sie Liste gefundener URLs",
        "Kopieren oder laden Sie Links herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Automatische URL-Erkennung",
        "Http, https, ftp unterstützt",
        "Entfernen Sie Duplikate",
        "Validieren Sie URLs",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Extrahieren Sie Links aus Dokumenten",
        "Analysieren Sie Webinhalte",
        "Erstellen Sie Link-Listen",
      ],
    },
    faq: [
      { question: "Werden alle URLs erkannt?", answer: "Die meisten, aber ungewöhnliche Formate möglicherweise nicht." },
      { question: "Funktioniert dies mit mailto-Links?", answer: "Ja, wenn aktiviert." },
      { question: "Kann ich Links validieren?", answer: "Einige Tools zeigen Validierungsstatus." },
    ],
  },
  "email-extractor": {
    howTo: {
      title: "E-Mail-Adressen extrahieren",
      steps: [
        "Geben Sie Text mit E-Mail-Adressen ein",
        "Das Tool erkennt automatisch E-Mails",
        "Sehen Sie Liste gefundener E-Mails",
        "Exportieren Sie als CSV oder kopieren Sie",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Automatische E-Mail-Erkennung",
        "Entfernen Sie Duplikate",
        "Validieren Sie E-Mail-Format",
        "CSV-Export verfügbar",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Erstellen Sie E-Mail-Listen",
        "Analysieren Sie Text auf Kontakte",
        "Bereinigen Sie E-Mail-Listen",
      ],
    },
    faq: [
      { question: "Wie genau ist die Extraktion?", answer: "Gut für Standard-E-Mail-Formate, kann seltene Formate verpassen." },
      { question: "Funktioniert dies mit besonderen Domain-Namen?", answer: "Ja, .com, .de, .international, etc." },
      { question: "Werden Duplikate entfernt?", answer: "Ja, Option verfügbar." },
    ],
  },
  "number-extractor": {
    howTo: {
      title: "Zahlen aus Text extrahieren",
      steps: [
        "Geben Sie Text mit Zahlen ein",
        "Das Tool erkennt automatisch Zahlen",
        "Sehen Sie Liste gefundener Zahlen",
        "Kopieren oder laden Sie herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Extrahieren Sie Ganzzahlen",
        "Extrahieren Sie Dezimalzahlen",
        "Entfernen Sie Duplikate",
        "Sortieren Sie Zahlen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Extrahieren Sie Preise",
        "Finden Sie Kontonummern",
        "Sammeln Sie Daten",
      ],
    },
    faq: [
      { question: "Werden negative Zahlen erkannt?", answer: "Ja, mit Minuszeichen." },
      { question: "Funktioniert dies mit Dezimalzahlen?", answer: "Ja, mit . oder , als Trennzeichen." },
      { question: "Werden Zahlen in Text erkannt?", answer: "Ja, Zahlen werden aus Wörtern extrahiert." },
    ],
  },
  "filter-lines": {
    howTo: {
      title: "Text-Zeilen filtern",
      steps: [
        "Geben Sie Text ein",
        "Geben Sie Filter-Bedingungen ein",
        "Das Tool zeigt nur Zeilen mit Match",
        "Kopieren Sie gefilterte Zeilen",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Filtern Sie nach exaktem Text",
        "Verwenden Sie reguläre Ausdrücke",
        "Umkehren Sie Filter (Zeilen ausschließen)",
        "Case-sensitive Optionen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Filtern Sie Log-Dateien",
        "Finden Sie Zeilen mit Text",
        "Analysieren Sie große Listen",
      ],
    },
    faq: [
      { question: "Funktionieren reguläre Ausdrücke?", answer: "Ja, Regex unterstützt." },
      { question: "Kann ich mehrere Filter verwenden?", answer: "Durchführen Sie mehrere Durchläufe oder verwenden Sie komplexes Regex." },
      { question: "Bleibt die Reihenfolge erhalten?", answer: "Ja, gefilterte Zeilen behalten Originalreihenfolge." },
    ],
  },
  "add-prefix-suffix": {
    howTo: {
      title: "Präfix/Suffix zu Zeilen hinzufügen",
      steps: [
        "Geben Sie Text ein (eine Zeile pro Zeile)",
        "Geben Sie Präfix (vor Zeile) ein",
        "Geben Sie Suffix (nach Zeile) ein",
        "Das Tool fügt automatisch hinzu",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Fügen Sie Präfix zu jeder Zeile hinzu",
        "Fügen Sie Suffix zu jeder Zeile hinzu",
        "Beide Präfix und Suffix",
        "Schnelle Verarbeitung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Erstellen Sie CSV-Zeilen",
        "Fügen Sie Anführungszeichen hinzu",
        "Formatieren Sie Daten",
      ],
    },
    faq: [
      { question: "Kann ich verschiedene Präfixe auf verschiedene Zeilen anwenden?", answer: "Nein, alle Zeilen erhalten dasselbe." },
      { question: "Funktioniert dies mit leeren Zeilen?", answer: "Ja, auch leere Zeilen erhalten Präfix/Suffix." },
      { question: "Können Sie Zeilennummern einfügen?", answer: "Ja, verwenden Sie {linenumber} als Platzhalter." },
    ],
  },
  "add-line-numbers": {
    howTo: {
      title: "Zeilennummern hinzufügen",
      steps: [
        "Geben Sie Text ein",
        "Das Tool fügt automatisch Nummern hinzu",
        "Wählen Sie Format und Startnummer",
        "Kopieren Sie oder laden Sie herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Fügen Sie Zeilennummern hinzu",
        "Wählen Sie Start-Nummer",
        "Verschiedene Format-Optionen",
        "Behalten Sie Text-Struktur",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Referenzieren Sie Zeilen in Dokumenten",
        "Code-Präsentation",
        "Zeilen-Überwachung",
      ],
    },
    faq: [
      { question: "Kann ich bei einer anderen Nummer beginnen?", answer: "Ja, stellen Sie die Startnummer ein." },
      { question: "Kann ich Nummern-Breite anpassen?", answer: "Einige Tools ermöglichen dies." },
      { question: "Werden Leerzeilen nummeriert?", answer: "Ja, wenn eine Option aktiviert ist." },
    ],
  },
  "remove-accents": {
    howTo: {
      title: "Diakritische Zeichen entfernen",
      steps: [
        "Geben Sie Text mit Akzenten ein",
        "Das Tool entfernt Diakritische automatisch",
        "Sehen Sie den bereinigten Text",
        "Kopieren Sie das Ergebnis",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Entfernen Sie Akzente und Umlaute",
        "Behandeln Sie Diakritische korrekt",
        "Behalten Sie Text-Struktur",
        "Schnelle Verarbeitung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Normalisieren Sie Text",
        "Erstellen Sie URL-Slugs",
        "Kompatibilität für Legacy-Systeme",
      ],
    },
    faq: [
      { question: "Wird ö zu o?", answer: "Ja, Umlaute und Akzente werden zu Basis-Buchstaben." },
      { question: "Funktioniert dies mit allen Sprachen?", answer: "Ja, alle Latin-basierten Alphabete." },
      { question: "Kann ich selektiv Akzente entfernen?", answer: "Nein, alle werden entfernt." },
    ],
  },
  "remove-special-characters": {
    howTo: {
      title: "Spezialzeichen entfernen",
      steps: [
        "Geben Sie Text ein",
        "Wählen Sie, welche Zeichen zu entfernen",
        "Das Tool entfernt automatisch",
        "Kopieren Sie den bereinigten Text",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Entfernen Sie Symbole",
        "Entfernen Sie Interpunktion",
        "Behalten Sie Zahlen und Buchstaben",
        "Anpassbare Optionen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Bereinigen Sie Daten",
        "Erstellen Sie URL-Slugs",
        "Normalisieren Sie Text",
      ],
    },
    faq: [
      { question: "Werden Leerzeichen entfernt?", answer: "Optional, normalerweise nicht." },
      { question: "Was ist mit Zahlen?", answer: "Normalerweise behalten, aber Sie können diese Einstellung ändern." },
      { question: "Funktioniert dies mit Unicode?", answer: "Ja, Spezialzeichen in allen Sprachen." },
    ],
  },
  "remove-html-tags": {
    howTo: {
      title: "HTML-Tags entfernen",
      steps: [
        "Geben Sie HTML ein",
        "Das Tool extrahiert Text",
        "Lässt HTML-Markups",
        "Kopieren Sie sauberer Text",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Entfernen Sie alle HTML-Tags",
        "Behalten Sie Textinhalt",
        "Dekodieren Sie HTML-Entities",
        "Schnelle Verarbeitung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Extrahieren Sie Text aus HTML",
        "Bereinigen Sie Web-Scrape-Daten",
        "Konvertieren Sie HTML zu Plaintext",
      ],
    },
    faq: [
      { question: "Werden HTML-Entities decodiert?", answer: "Ja, &amp; wird zu & etc." },
      { question: "Funktioniert dies mit CSS?", answer: "Ja, Style-Tags werden entfernt." },
      { question: "Was ist mit JavaScript?", answer: "Script-Tags und Inhalt werden entfernt." },
    ],
  },
  "remove-line-breaks": {
    howTo: {
      title: "Zeilenumbrüche entfernen",
      steps: [
        "Geben Sie Multi-Line-Text ein",
        "Das Tool entfernt Zeilenumbrüche",
        "Alles wird eine Zeile",
        "Kopieren Sie das Ergebnis",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Entfernen Sie alle Zeilenumbrüche",
        "Ersetzen Sie durch Leerzeichen",
        "Oder verbinden Sie direkt",
        "Behalten Sie Textinhalt",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Formatieren Sie Text für Paragraphen",
        "Vorbereiten für Datenbank",
        "Einfügen in Formulare",
      ],
    },
    faq: [
      { question: "Werden Leerzeichen hinzugefügt?", answer: "Optional, Sie können dies einstellen." },
      { question: "Funktioniert dies mit verschiedenen Zeilenumbruch-Typen?", answer: "Ja, Windows (CRLF), Mac (CR), Linux (LF)." },
      { question: "Kann ich mehrere Leerzeichen behalten?", answer: "Einige Tools ermöglichen dies." },
    ],
  },
  "remove-emojis": {
    howTo: {
      title: "Emojis entfernen",
      steps: [
        "Geben Sie Text mit Emojis ein",
        "Das Tool erkennt Emojis automatisch",
        "Entfernt alle Emojis",
        "Kopieren Sie Ergebnis",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Entfernen Sie alle Emojis",
        "Behalten Sie Text",
        "Schnelle Verarbeitung",
        "Unterstützen Sie alle Emoji-Sets",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Bereinigen Sie Social-Media-Text",
        "Entfernen Sie für Datentransfer",
        "Normalisieren Sie Textdateien",
      ],
    },
    faq: [
      { question: "Werden Emoticons entfernt?", answer: "Nur Emoji-Unicode, nicht Text-Emoticons wie :)" },
      { question: "Funktioniert dies mit neuen Emojis?", answer: "Ja, aktualisiert sich mit neuen Emoji-Standards." },
      { question: "Kann ich selektiv Emojis entfernen?", answer: "Nein, alle werden entfernt." },
    ],
  },
  "slug-generator": {
    howTo: {
      title: "URL-Slug generieren",
      steps: [
        "Geben Sie Title oder Text ein",
        "Das Tool generiert URL-freundlichen Slug",
        "Konvertiert zu Kleinbuchstaben, Bindestriche",
        "Kopieren Sie den Slug",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Generieren Sie URL-sichere Slugs",
        "Entfernen Sie Spezialzeichen",
        "Ersetzen Sie Leerzeichen durch Bindestriche",
        "Verschiedene Längen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Blog-Post URLs",
        "Produkt-URLs",
        "SEO-freundliche URLs",
      ],
    },
    faq: [
      { question: "Was macht ein Slug?", answer: "Mensch-lesbarer Teil einer URL, wie /mein-blog-post." },
      { question: "Sind Bindestriche wichtig?", answer: "Ja, Suchmaschinen trennen Wörter mit Bindestrichen." },
      { question: "Kann ich Längenlimit setzen?", answer: "Ja, viele Tools ermöglichen dies." },
    ],
  },
  "lorem-ipsum": {
    howTo: {
      title: "Lorem Ipsum generieren",
      steps: [
        "Wählen Sie Anzahl von Paragraphen, Sätzen oder Wörtern",
        "Das Tool generiert automatisch",
        "Sehen Sie Dummy-Text",
        "Kopieren für Mock-Ups",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Generieren Sie Paragraphen",
        "Generieren Sie Sätze",
        "Generieren Sie Wörter",
        "Verschiedene Längen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Design-Mock-Ups",
        "Platzhalter-Inhalte",
        "Test-Websites",
      ],
    },
    faq: [
      { question: "Woher kommt Lorem Ipsum?", answer: "Klassischer Dummy-Text aus lateinischer Literatur seit 1500er Jahren." },
      { question: "Ist es Latein?", answer: "Quasi-Latein, sinnlos, aber realistische Wort-Längen." },
      { question: "Kann ich angepasst Lorem Ipsum?", answer: "Einige Tools ermöglichen benutzerdefinierte Texte." },
    ],
  },
  "password-generator": {
    howTo: {
      title: "Passwort generieren",
      steps: [
        "Geben Sie gewünschte Passwort-Länge ein",
        "Wählen Sie Optionen (Großbuchstaben, Zahlen, Symbole)",
        "Das Tool generiert sicheres Passwort",
        "Kopieren Sie zum Verwenden",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Generieren Sie starke Passwörter",
        "Anpassbare Länge",
        "Verschiedene Zeichensätze",
        "Mehrere Passwörter gleichzeitig",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Erstellen Sie sichere Passwörter",
        "Vermeiden Sie einfache Passwörter",
        "Größer ist besser",
      ],
    },
    faq: [
      { question: "Wie sicher ist das generierte Passwort?", answer: "Sehr sicher, zufällig generiert, keine Muster." },
      { question: "Sollte ich Symbole einbeziehen?", answer: "Ja, wenn die Website sie erlaubt – stärker ist besser." },
      { question: "Welche Länge ist ausreichend?", answer: "Mindestens 12 Zeichen, 16+ sind besser." },
    ],
  },
  "random-string": {
    howTo: {
      title: "Zufälliger String generieren",
      steps: [
        "Geben Sie die Anzahl der Zeichen ein",
        "Wählen Sie Zeichentyp (alphanumerisch, nur Buchstaben, etc.)",
        "Das Tool generiert zufälligen String",
        "Kopieren Sie den String",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Generieren Sie zufällige Strings",
        "Verschiedene Zeichensätze",
        "Einstellbare Länge",
        "Mehrere gleichzeitig",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Erstellen Sie Test-IDs",
        "API-Schlüssel simulieren",
        "Token generieren",
      ],
    },
    faq: [
      { question: "Ist es wirklich zufällig?", answer: "Pseudo-zufällig, gut genug für die meisten Zwecke." },
      { question: "Kann ich Teichen ausschließen?", answer: "Einige Tools ermöglichen Zeichenauswahl." },
      { question: "Funktioniert dies mit Unicode?", answer: "Einige Tools unterstützen Unicode-Zeichen." },
    ],
  },
  "uuid-generator": {
    howTo: {
      title: "UUID generieren",
      steps: [
        "Klicken Sie \"Generieren\"",
        "Verschiedene UUID-Versionen verfügbar",
        "Das Tool erstellt eindeutige IDs",
        "Kopieren Sie UUIDs",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Generieren Sie eindeutige UUIDs",
        "Verschiedene Versionen (v1, v4, v5)",
        "Mehrere gleichzeitig",
        "Format-Optionen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Datenbank-Primärschlüssel",
        "API-IDs",
        "Zuordnung von Einträgen",
      ],
    },
    faq: [
      { question: "Was ist UUID?", answer: "Universally Unique Identifier – 128-Bit-Nummer garantiert eindeutig." },
      { question: "Ist V4 am sichersten?", answer: "Ja, komplett zufällig, keine Timing-Information." },
      { question: "Können Kollisionen auftreten?", answer: "Mathematisch unmöglich mit v4." },
    ],
  },
  "hash-generator": {
    howTo: {
      title: "Hash generieren",
      steps: [
        "Geben Sie Text ein",
        "Wählen Sie Hash-Algorithmus (MD5, SHA-1, SHA-256, etc.)",
        "Das Tool generiert Hash",
        "Kopieren Sie den Hash",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Mehrere Hash-Algorithmen",
        "MD5, SHA-1, SHA-256, SHA-512",
        "Base64-Ausgabe verfügbar",
        "Schnelle Berechnung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Prüfsummen generieren",
        "Passwörter hashen",
        "Datei-Integrität überprüfen",
      ],
    },
    faq: [
      { question: "Ist Hashen Verschlüsselung?", answer: "Nein, einseitig – Sie können den Original-Text nicht zurückbekommen." },
      { question: "Was ist die sicherste Hash?", answer: "SHA-256 oder besser, MD5 ist veraltet." },
      { question: "Können zwei Texte denselben Hash haben?", answer: "Theoretisch ja (Kollision), sehr selten mit modernen Hashes." },
    ],
  },
  "morse-code": {
    howTo: {
      title: "Morse-Code konvertieren",
      steps: [
        "Geben Sie Text ein (zu Morse) oder Morse (zu Text)",
        "Das Tool konvertiert automatisch",
        "Sehen Sie - und . Muster",
        "Kopieren Sie oder spielen Sie Audio ab",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie Text zu Morse",
        "Decodieren Sie Morse zu Text",
        "Audio-Wiedergabe verfügbar",
        "Standardisiert \,\ und /\\ für Wörter",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Lernen Sie Morse-Code",
        "Codieren Sie Nachrichten",
        "Historisch interessant",
      ],
    },
    faq: [
      { question: "Wird SOS wirklich drei Punkte?", answer: "Nein, S ist drei Punkte, O drei Bindestriche, S drei Punkte – keine Leerzeichen." },
      { question: "Funktioniert dies mit Zahlen?", answer: "Ja, Zahlen und Symbole." },
      { question: "Kann ich Morse abspielen?", answer: "Ja, wenn Audio-Funktion verfügbar." },
    ],
  },
  "rot13": {
    howTo: {
      title: "ROT13 codieren/decodieren",
      steps: [
        "Geben Sie Text ein",
        "Das Tool wendet ROT13 an",
        "Sehen Sie das Ergebnis (ROT13 ist selbstumkehrbar)",
        "Kopieren Sie den Code",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Codieren Sie Text mit ROT13",
        "Decodieren Sie ROT13",
        "Selbstumkehrender Cipher",
        "Schnelle Verarbeitung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verstecken Sie Text (nicht sicher)",
        "Online-Forum-Spoiler",
        "Einfach, nicht sicher",
      ],
    },
    faq: [
      { question: "Ist ROT13 sicher?", answer: "Nein, überhaupt nicht – jeder kann leicht decodieren." },
      { question: "Was ist ROT13?", answer: "Ersetzen Sie jeden Buchstaben mit 13 Positionen weiter." },
      { question: "Funktioniert zweimalig Anwenden es rückgängig?", answer: "Ja, zweimalig gibt Original zurück." },
    ],
  },
  "regex-tester": {
    howTo: {
      title: "Regulären Ausdruck testen",
      steps: [
        "Geben Sie Regex-Muster ein",
        "Geben Sie Test-Text ein",
        "Das Tool testet Matches",
        "Sehen Sie Ergebnisse sofort",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Testen Sie Regex-Muster",
        "Zeigen Sie alle Matches",
        "Global-, case-sensitive Optionen",
        "Echtzeitvorschau",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Entwerfen Sie Regex-Muster",
        "Debuggen Sie Matches",
        "Überprüfen Sie Text-Muster",
      ],
    },
    faq: [
      { question: "Was ist Regex?", answer: "Regular Expression – Muster zum Finden von Text-Übereinstimmungen." },
      { question: "Wie lerne ich Regex?", answer: "Viele Online-Ressourcen; Übung ist wichtig." },
      { question: "Wird Regex überall verwendet?", answer: "Ja, in den meisten Programmiersprachen und Tools." },
    ],
  },
  "text-repeater": {
    howTo: {
      title: "Text wiederholen",
      steps: [
        "Geben Sie Ihren Text ein",
        "Geben Sie die Anzahl der Wiederholungen ein",
        "Das Tool wiederholt automatisch",
        "Kopieren Sie das Ergebnis",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Wiederholen Sie Text N Mal",
        "Mit Trennzeichen kombinieren",
        "Schnelle Verarbeitung",
        "Große Wiederholungen unterstützt",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Erstellen Sie Muster",
        "Füllen Sie Formulare",
        "Test-Daten generieren",
      ],
    },
    faq: [
      { question: "Gibt es ein Maximum für Wiederholungen?", answer: "Normalerweise nein, aber extrem hohe Zahlen können langsam sein." },
      { question: "Kann ich ein Trennzeichen zwischen Wiederholungen hinzufügen?", answer: "Ja, viele Tools unterstützen dies." },
      { question: "Funktioniert dies mit Sonderzeichen?", answer: "Ja, alle Zeichen werden wiederholt." },
    ],
  },
  "unicode-escape": {
    howTo: {
      title: "Unicode codieren/decodieren",
      steps: [
        "Geben Sie Text ein (zu Unicode) oder Unicode (zu Text)",
        "Das Tool konvertiert automatisch",
        "Sehen Sie Escape-Sequenzen",
        "Kopieren Sie das Ergebnis",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zu Unicode-Escapes",
        "Decodieren Sie Unicode-Sequences",
        "Verschiedene Formate unterstützt",
        "Schnelle Verarbeitung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie in JavaScript",
        "Kodieren Sie spezielle Zeichen",
        "JSON-Umgang",
      ],
    },
    faq: [
      { question: "Was ist Unicode-Escape?", answer: "\\uXXXX Format zum Darstellen von Unicode-Zeichen in Code." },
      { question: "Wann sollte ich dies verwenden?", answer: "Für Code und Daten-Übertragung mit Zeichen-Einschränkungen." },
      { question: "Funktioniert dies mit Emojis?", answer: "Ja, Emojis haben Unicode-Codes." },
    ],
  },
  "json-formatter": {
    howTo: {
      title: "JSON formatieren",
      steps: [
        "Fügen Sie Ihren JSON-Code oder rohe JSON-Daten in die Eingabe ein",
        "Das Werkzeug formatiert und rückt JSON automatisch korrekt ein",
        "Wählen Sie Einrückungsgröße (2 oder 4 Leerzeichen bevorzugt)",
        "Kopieren Sie das formatierte JSON-Ergebnis",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Formatieren und Pretty-Print JSON mit korrekter Einrückung",
        "Validieren Sie JSON-Syntax und -Struktur automatisch",
        "Minimieren Sie JSON, um Whitespace für kompakte Ausgabe zu entfernen",
        "Syntax-Hervorhebung für einfachere Lesbarkeit",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Formatieren Sie API-Antworten für einfacheres Lesen und Debugging",
        "Validieren Sie JSON, bevor Sie es in Anwendungen verwenden",
        "Minimieren Sie JSON, um Dateigrößen für Übertragung zu reduzieren",
      ],
    },
    faq: [
      { question: "Was ist der Unterschied zwischen Formatierung und Minimierung von JSON?", answer: "Formatierung fügt Einrückung zur Lesbarkeit hinzu, während Minimierung alle Whitespace entfernt, um die Dateigröße zu reduzieren." },
      { question: "Wird es JSON-Syntax-Fehler finden?", answer: "Ja. Das Werkzeug validiert Ihr JSON und warnt Sie vor Syntax-Fehlern wie fehlenden Kommas oder nicht angepassten Klammern." },
      { question: "Wird die JSON-Formatierung lokal in meinem Browser durchgeführt?", answer: "Ja. Alle JSON-Formatierung, Validierung und Minimierung erfolgen vollständig in Ihrem Browser ohne externe Verarbeitung." },
    ],
  },
};
