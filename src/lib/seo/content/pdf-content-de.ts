import type { ToolContentMap } from "../tool-content-types";

export const pdfContentDe: ToolContentMap = {
  merge: {
    howTo: {
      title: "PDF-Dateien zusammenführen",
      steps: [
        "Klicken Sie auf \"Dateien auswählen\" oder ziehen Sie mehrere PDF-Dateien in den Upload-Bereich.",
        "Ordnen Sie die Dateien per Drag-and-Drop in Ihrer gewünschten Reihenfolge an.",
        "Klicken Sie auf die Schaltfläche \"Zusammenführen\", um alle Dateien in eine PDF zu kombinieren.",
        "Laden Sie Ihre zusammengeführte PDF herunter – sie ist sofort einsatzbereit.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Kombinieren Sie unbegrenzte PDF-Dateien in einem Dokument",
        "Drag-and-Drop-Neuanordnung für präzise Kontrolle über die Seitenreihenfolge",
        "Vorschau-Miniaturansichten vor dem Zusammenführen zur Inhaltsverifizierung",
        "Erhält die ursprüngliche Qualität – keine Komprimierung oder Qualitätsverlust",
        "Funktioniert vollständig in Ihrem Browser – Dateien verlassen Ihr Gerät nie",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Sortieren Sie Dateien nach Name oder Größe mit den Schaltflächen in der Symbolleiste für schnelle Organisation",
        "Große Dateien benötigen möglicherweise einen Moment zur Verarbeitung – ein Fortschrittsanzeiger hält Sie informiert",
        "Die zusammengeführte Datei erhält Lesezeichen, Links und Formularfelder aus den Originaldokumenten",
      ],
    },
    faq: [
      { question: "Ist es sicher, PDFs online zusammenzuführen?", answer: "Ja. ToolPop verarbeitet alles in Ihrem Browser mit JavaScript. Ihre Dateien verlassen Ihr Gerät niemals und werden nie auf einen Server hochgeladen." },
      { question: "Wie viele PDFs kann ich gleichzeitig zusammenführen?", answer: "Es gibt keine Grenze. Sie können so viele PDF-Dateien zusammenführen, wie Ihr Browser verarbeiten kann." },
      { question: "Wirkt sich das Zusammenführen auf die Qualität aus?", answer: "Nein. Die ursprüngliche Qualität jeder PDF wird während des Zusammenführungsvorgangs vollständig erhalten." },
    ],
  },
  split: {
    howTo: {
      title: "Eine PDF teilen",
      steps: [
        "Laden Sie eine PDF-Datei hoch, indem Sie auf \"Datei auswählen\" klicken oder sie in den Bereich ziehen.",
        "Wählen Sie eine Teilungsmethode: nach Seitenbereich, bestimmte Seiten extrahieren oder in feste Intervalle teilen.",
        "Konfigurieren Sie Ihre gewünschten Bereiche oder Seitenzahlen.",
        "Klicken Sie auf \"Teilen\", um separate PDF-Dateien zu erstellen, und laden Sie diese herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Teilen Sie nach benutzerdefinierten Seitenbereichen (z. B. Seiten 1–5, 10–15)",
        "Extrahieren Sie einzelne Seiten in separate Dateien",
        "Teilen Sie in gleich große Blöcke auf (alle N Seiten)",
        "Visuelle Seiten-Miniaturansichten für einfache Seitenauswahl",
        "Option, ausgewählte Bereiche in einer Ausgabedatei zusammenzuführen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie die Bereichseingabe, um mehrere durch Kommas getrennte Bereiche anzugeben",
        "Klicken Sie auf Seiten-Miniaturansichten, um Seiten schnell auszuwählen oder abzuwählen",
        "Die Option \"Alle extrahieren\" erstellt eine Datei pro Seite – nützlich zum Archivieren",
      ],
    },
    faq: [
      { question: "Kann ich eine einzelne Seite aus einer PDF extrahieren?", answer: "Ja. Geben Sie einfach die Seitenzahl ein oder verwenden Sie die visuellen Miniaturansichten, um einzelne Seiten auszuwählen und zu extrahieren." },
      { question: "Verringert das Teilen die PDF-Qualität?", answer: "Nein. Das Teilen erstellt neue PDFs mit der gleichen Qualität wie das Originaldokument." },
      { question: "Was passiert, wenn ich sich überlappende Seitenbereiche angebe?", answer: "Seiten in sich überlappenden Bereichen werden in mehreren Ausgabedateien angezeigt, was flexible Inhaltsorganisation ermöglicht." },
    ],
  },
  compress: {
    howTo: {
      title: "Eine PDF komprimieren",
      steps: [
        "Laden Sie eine PDF-Datei hoch, die Sie verkleinern möchten.",
        "Wählen Sie eine Kompressionsstufe: Maximum (kleinste Datei), Empfohlen (ausgewogen) oder Minimum (beste Qualität).",
        "Wählen Sie einen Komprimierungsmodus – bildbasiert oder Rasterisierung.",
        "Klicken Sie auf \"Komprimieren\" und laden Sie Ihre kleinere PDF-Datei herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Drei Komprimierungsstufen zur Abwägung zwischen Größe und Qualität",
        "Bildoptimierung reduziert die Größe eingebetteter Bilder",
        "Zeigt die Dateigröße vor und nach mit Prozentreduzierung",
        "Rasterisierungsmodus für maximale Komprimierung, wenn Textqualität weniger kritisch ist",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Die Stufe \"Empfohlen\" funktioniert am besten für die meisten Dokumente und reduziert die Größe um 40–70%",
        "Bei PDFs mit vielen Fotos kann die Komprimierung \"Maximum\" die Dateigröße dramatisch reduzieren",
        "Verwenden Sie die Komprimierung \"Minimum\", wenn Sie die Bildschärfe zum Drucken beibehalten müssen",
      ],
    },
    faq: [
      { question: "Um wie viel kleiner wird meine PDF nach der Komprimierung?", answer: "Typischerweise 40–70% kleiner mit der Stufe \"Empfohlen\", je nach Originalinhalt und Komprimierungsmethode." },
      { question: "Wird die Komprimierung lokal auf meinem Gerät durchgeführt?", answer: "Ja. Alle Komprimierungen finden in Ihrem Browser statt, ohne dass Daten an Server gesendet werden, was Ihre Dokumente vollständig privat hält." },
      { question: "Kann ich die Qualität nach der Komprimierung mit Maximum-Stufe wiederherstellen?", answer: "Nein. Die Komprimierung \"Maximum\" ist permanent. Falls Sie sich unsicher sind, verwenden Sie zuerst die Stufe \"Empfohlen\", um die Qualität zu testen." },
    ],
  },
  "pdf-to-jpg": {
    howTo: {
      title: "PDF zu JPG konvertieren",
      steps: [
        "Laden Sie eine oder mehrere PDF-Dateien zur Konvertierung hoch.",
        "Wählen Sie die Ausgabequalität: Hoch (300 DPI), Mittel (150 DPI) oder Niedrig (72 DPI).",
        "Klicken Sie auf \"Konvertieren\", um jede PDF-Seite in ein JPG-Bild umzuwandeln.",
        "Laden Sie einzelne Bilder oder alle Bilder als ZIP-Datei herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie jede Seite einer PDF in ein hochqualitatives JPG-Bild",
        "Drei Qualitätsvoreinstellungen zur Abwägung zwischen Bildklarheit und Dateigröße",
        "Stapelverarbeitung – konvertieren Sie mehrere PDFs gleichzeitig",
        "Laden Sie einzelne Seiten oder alle Seiten in einem ZIP-Archiv herunter",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie die Qualität \"Hoch\" zum Drucken oder bei professionellen Präsentationen",
        "Wählen Sie \"Mittel\" für die Webnutzung – gute Qualität mit angemessenen Dateigrößen",
        "Die Qualität \"Niedrig\" eignet sich perfekt für Miniaturansichten oder schnelle Vorschauansichten",
      ],
    },
    faq: [
      { question: "Kann ich eine einzelne Seite statt der ganzen PDF konvertieren?", answer: "Ja. Wählen Sie während der Konvertierung bestimmte Seiten aus oder verwenden Sie die Seitenbereich-Option, um nur die benötigten Seiten zu konvertieren." },
      { question: "Werden meine PDFs nach der Konvertierung gespeichert?", answer: "Nein. Alle Konvertierungen erfolgen in Ihrem Browser und Dateien werden unmittelbar nach dem Download gelöscht." },
      { question: "Was ist der Unterschied zwischen Hoch-, Mittel- und Niederqualität?", answer: "Sie unterscheiden sich in DPI (300, 150 und 72 jeweils) und Dateigröße. Hoch ist am besten zum Drucken, Mittel für Web, Niedrig für Vorschauansichten." },
    ],
  },
  "jpg-to-pdf": {
    howTo: {
      title: "JPG zu PDF konvertieren",
      steps: [
        "Laden Sie ein oder mehrere JPG-Bilder durch Klicken oder Ziehen hoch.",
        "Wählen Sie Seitengröße, Ausrichtung und Randeinstellungen.",
        "Ordnen Sie Bilder durch Ziehen in Ihrer bevorzugten Reihenfolge an.",
        "Klicken Sie auf \"Konvertieren\", um Ihre PDF zu erstellen, und laden Sie sie herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie ein oder mehrere JPG-Bilder in eine PDF",
        "Wählen Sie aus Standardseitengrößen (A4, Letter, Legal) oder Anpassung an Bild",
        "Einstellbare Ränder und Ausrichtung (Hochformat/Querformat)",
        "Option, eine PDF pro Bild zu erstellen oder alle in einem Dokument zusammenzuführen",
        "Drag-and-Drop-Neuanordnung von Bildern",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie \"An Bild anpassen\" als Seitengröße, um Beschneidung oder weiße Ränder zu vermeiden",
        "Für Fotoalben verwenden Sie \"Alle zusammenführen\", um eine einzelne PDF mit allen Bildern zu erstellen",
        "Stellen Sie Ränder auf 0 ein, um randlos zu drucken",
      ],
    },
    faq: [
      { question: "Kann ich auch andere Bildformate außer JPG konvertieren?", answer: "Ja. Dieses Tool unterstützt JPG, PNG, GIF, BMP, WebP und andere gängige Bildformate." },
      { question: "Wie vermeide ich weiße Ränder beim Konvertieren von Bildern?", answer: "Verwenden Sie die Seitengröße \"An Bild anpassen\", um die Seite automatisch an Ihre Bilddimensionen anzupassen." },
      { question: "Sind meine Bilddaten während der Konvertierung sicher?", answer: "Absolut. Alle Konvertierungen erfolgen lokal in Ihrem Browser ohne Upload auf externe Server." },
    ],
  },
  rotate: {
    howTo: {
      title: "PDF-Seiten drehen",
      steps: [
        "Laden Sie eine PDF-Datei mit Seiten hoch, die gedreht werden müssen.",
        "Klicken Sie auf die Dreheknöpfe auf einzelnen Seiten-Miniaturansichten, um sie zu drehen.",
        "Verwenden Sie \"Alle drehen\", um die gleiche Drehung auf alle Seiten auf einmal anzuwenden.",
        "Klicken Sie auf \"Drehen\", um Änderungen anzuwenden, und laden Sie die korrigierte PDF herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Drehen Sie einzelne Seiten im Uhrzeigersinn oder gegen den Uhrzeigersinn um 90°",
        "Drehen Sie alle Seiten auf einmal mit einem einzelnen Klick",
        "Visuelle Seiten-Miniaturansichten zeigen Drehungsänderungen in Echtzeit",
        "Setzen Sie alle Drehungen zurück, um erneut zu beginnen, falls erforderlich",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Gescannte Dokumente haben oft Seiten in gemischten Ausrichtungen – beheben Sie sie alle auf einmal",
        "Verwenden Sie die Einzelseiten-Drehung für Dokumente mit Hoch- und Querformatseiten",
        "Die Drehung ist permanent und wird beim Drucken oder Freigeben der PDF beibehalten",
      ],
    },
    faq: [
      { question: "Kann ich Seiten um andere Grade als 90° drehen?", answer: "Dieses Tool dreht in 90°-Schritten. Für benutzerdefinierte Winkeldrehungen sollten Sie das Bearbeitungstool verwenden." },
      { question: "Wirkt sich das Drehen auf die Dateigröße aus?", answer: "Nein. Seitendrehung ist eine Metadatenänderung, die den Inhalt oder die Dateigröße nicht ändert." },
      { question: "Kann ich Drehungen nach dem Herunterladen rückgängig machen?", answer: "Ja. Öffnen Sie die PDF einfach erneut in diesem Tool und drehen Sie die Seiten in ihre ursprüngliche Ausrichtung zurück." },
    ],
  },
  "edit-pdf": {
    howTo: {
      title: "Eine PDF bearbeiten",
      steps: [
        "Laden Sie die PDF hoch, die Sie bearbeiten möchten.",
        "Wählen Sie ein Werkzeug aus der Symbolleiste: Text, Bild, Formen oder Zeichnung.",
        "Klicken Sie auf die Seite, um Ihr Element zu platzieren, und passen Sie dann seine Eigenschaften an.",
        "Navigieren Sie zwischen Seiten und fügen Sie Elemente nach Bedarf hinzu.",
        "Klicken Sie auf \"Anwenden\", um alle Änderungen zu speichern und die bearbeitete PDF herunterzuladen.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Fügen Sie Text mit anpassbarer Schriftart, Größe, Farbe und Ausrichtung hinzu",
        "Fügen Sie Bilder von Ihrem Gerät überall auf der Seite ein",
        "Zeichnen Sie Freihanding-Linien, Rechtecke, Ellipsen und gerade Linien",
        "Fügen Sie Symbole wie Häkchen, Kreuze, Sterne und Pfeile hinzu",
        "Ebenensteuerung – bringen Sie Elemente nach vorne oder nach hinten",
        "Multi-Page-Bearbeitung mit einfacher Seitennavigation",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie die Zoomsteuerelemente, um präzise an feinen Details zu arbeiten",
        "Doppelklicken Sie auf ein Textelement, um seinen Inhalt nach dem Platzieren zu bearbeiten",
        "Verwenden Sie Strg+Z (Cmd+Z auf Mac), um Fehler sofort rückgängig zu machen",
        "Symbole wie Häkchen sind perfekt zum Ausfüllen von Formularfeldern",
      ],
    },
    faq: [
      { question: "Kann ich den ursprünglichen Text in der PDF bearbeiten?", answer: "Dieses Tool fügt neue Elemente hinzu, anstatt vorhandenen Text zu bearbeiten. Um Originalinhalte zu bearbeiten, exportieren Sie nach Word und bearbeiten Sie dort." },
      { question: "Wird meine bearbeitete PDF gespeichert oder freigegeben?", answer: "Nein. Alles passiert in Ihrem Browser. Ihre PDF wird lokal verarbeitet und nie auf einem Server gespeichert." },
      { question: "Wie viele Elemente kann ich auf einer einzelnen Seite hinzufügen?", answer: "Es gibt praktisch keine Grenze, obwohl das Hinzufügen vieler Elemente den Editor verlangsamen kann. Halten Sie Ihr Dokument leicht für optimale Leistung." },
    ],
  },
  watermark: {
    howTo: {
      title: "Ein Wasserzeichen zu einer PDF hinzufügen",
      steps: [
        "Laden Sie die PDF hoch, der Sie ein Wasserzeichen hinzufügen möchten.",
        "Wählen Sie zwischen Text- oder Bildwasserzeichen.",
        "Passen Sie das Wasserzeichen an: Text/Bild, Deckkraft, Position, Drehung und Größe.",
        "Wählen Sie, auf welche Seiten das Wasserzeichen angewendet werden soll (alle oder benutzerdefinierten Bereich).",
        "Klicken Sie auf \"Wasserzeichen hinzufügen\" und laden Sie die PDF mit Wasserzeichen herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Textwasserzeichen mit anpassbarer Schriftart, Größe, Farbe und Schatten",
        "Bildwasserzeichen mit einstellbarem Maßstab und Deckkraft",
        "Neun Positionsoptionen (Ecken, Kanten und Mitte)",
        "Kachel-/Mosaikmuster zur Abdeckung der gesamten Seite",
        "Ebenensteuerung – platzieren Sie das Wasserzeichen über oder unter dem Inhalt",
        "Auswahl des benutzerdefinierten Seitenbereichs",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Stellen Sie die Deckkraft auf 20–30% ein, um ein subtiles Wasserzeichen zu erhalten, das Inhalte nicht verdeckt",
        "Verwenden Sie die Mosaic-/Kachel-Option für die vollständige Seitenabdeckung bei vertraulichen Dokumenten",
        "Eine diagonale Drehung (typisch 45°) macht Wasserzeichen schwerer zu entfernen",
        "Platzieren Sie Wasserzeichen \"unter dem Inhalt\", damit Text vollständig lesbar bleibt",
      ],
    },
    faq: [
      { question: "Kann ich verschiedene Wasserzeichen auf verschiedene Seiten hinzufügen?", answer: "Derzeit wird das gleiche Wasserzeichen auf ausgewählte Seiten angewendet. Für unterschiedliche Wasserzeichen verarbeiten Sie die PDF mehrmals." },
      { question: "Wird das Wasserzeichen gedruckt, wenn jemand die PDF druckt?", answer: "Ja. Wasserzeichen sind in der PDF eingebettet und werden sowohl bei digitaler Anzeige als auch beim Drucken angezeigt." },
      { question: "Kann ich ein hinzugefügtes Wasserzeichen entfernen?", answer: "Nein. Nach dem Hinzufügen sind Wasserzeichen permanent. Speichern Sie vor dem Hinzufügen eines Wasserzeichens immer eine Sicherung Ihrer ursprünglichen PDF." },
    ],
  },
  protect: {
    howTo: {
      title: "Eine PDF mit Passwort schützen",
      steps: [
        "Laden Sie die PDF hoch, die Sie schützen möchten.",
        "Geben Sie ein Passwort ein und bestätigen Sie es.",
        "Konfigurieren Sie optional erweiterte Berechtigungen (Drucken, Kopieren, Bearbeitung).",
        "Klicken Sie auf \"Schützen\", um die PDF mit Ihrem Passwort zu verschlüsseln.",
        "Laden Sie die geschützte Datei herunter – Empfänger benötigen das Passwort zum Öffnen.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "AES-256-Verschlüsselung für starke Sicherheit",
        "Kennwortschätzungs-Anzeige (schwach, mittel, stark)",
        "Detaillierte Berechtigungskontrollen zum Drucken, Kopieren und Ändern",
        "Separate Berechtigungen für niedriger- und hochauflösendes Drucken",
        "Formularausfüll- und Barrierefreiheitsberechtigungen",
        "Alle Verschlüsselungen erfolgen in Ihrem Browser – Ihr Passwort verlässt Ihr Gerät nie",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie starke Passwörter mit einer Mischung aus Großbuchstaben, Zahlen und Symbolen",
        "Deaktivieren Sie \"Drucken\" für vertrauliche Dokumente, die nicht gedruckt werden sollten",
        "Speichern Sie das Passwort sicher an einem anderen Ort, falls Sie es später benötigen",
      ],
    },
    faq: [
      { question: "Kann jemand mein Passwort knacken?", answer: "Mit AES-256-Verschlüsselung ist es rechnerisch unmöglich, ein starkes Passwort zu knacken. Verwenden Sie ein komplexes Passwort für maximale Sicherheit." },
      { question: "Was passiert, wenn ich mein Passwort vergesse?", answer: "Passwörter können nicht wiederhergestellt werden. Die PDF bleibt geschützt und kann nur mit dem richtigen Passwort geöffnet werden. Speichern Sie Passwörter sicher." },
      { question: "Kann ich die Berechtigungen nach dem Schutz ändern?", answer: "Nein. Läden Sie die PDF erneut hoch und erstellen Sie eine neue geschützte Version mit den gewünschten Berechtigungen." },
    ],
  },
  "pdf-to-png": {
    howTo: {
      title: "PDF zu PNG konvertieren",
      steps: [
        "Laden Sie eine PDF-Datei hoch, die Sie konvertieren möchten.",
        "Wählen Sie die Ausgabequalität: Hoch, Mittel oder Niedrig.",
        "Klicken Sie auf \"Konvertieren\", um jede PDF-Seite in ein PNG-Bild zu konvertieren.",
        "Laden Sie Ihre PNG-Bilder herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie jede PDF-Seite in PNG mit transparentem Hintergrund",
        "Drei Qualitätsoptionen für verschiedene Verwendungszwecke",
        "Stapelkonvertierung mehrerer PDFs",
        "Behalten Sie die Bildqualität bei, während Sie zu PNG wechseln",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "PNG mit Transparenz ist ideal für Web-Grafiken",
        "Verwenden Sie hohe Qualität für hochauflösende Anforderungen",
        "PNG-Dateien sind größer als JPG, bieten aber bessere Qualität",
      ],
    },
    faq: [
      { question: "Unterstützt PNG Transparenz?", answer: "Ja. PNG-Dateien unterstützen transparente Hintergründe, perfekt für grafische Elemente." },
      { question: "Kann ich eine einzelne Seite konvertieren?", answer: "Ja. Wählen Sie während der Konvertierung bestimmte Seiten aus." },
      { question: "Werden meine Dateien sicher verarbeitet?", answer: "Ja. Die Konvertierung erfolgt vollständig in Ihrem Browser ohne Server-Upload." },
    ],
  },
  "png-to-pdf": {
    howTo: {
      title: "PNG zu PDF konvertieren",
      steps: [
        "Laden Sie PNG-Bilder hoch, die Sie in eine PDF konvertieren möchten.",
        "Wählen Sie Seitengröße und Ausrichtung.",
        "Ordnen Sie die Bilder in der gewünschten Reihenfolge an.",
        "Klicken Sie auf \"Konvertieren\" und laden Sie Ihre PDF herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie mehrere PNG-Bilder in eine einzige PDF",
        "Transparenzbereiche bleiben erhalten oder werden mit Farbe gefüllt",
        "Wählen Sie zwischen verschiedenen Seitengrößen",
        "Drag-and-Drop-Neuanordnung von Bildern",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "PNG mit Transparenz wird mit weißem Hintergrund gefüllt",
        "Ordnen Sie Bilder logisch für Dokumentenzwecke",
        "Verwenden Sie \"An Bild anpassen\" für automatische Größenanpassung",
      ],
    },
    faq: [
      { question: "Was passiert mit transparenten Bereichen?", answer: "Sie werden mit Weiß oder einer gewählten Farbe gefüllt, da PDF-Standard Transparenz nicht dasselbe wie PNG unterstützt." },
      { question: "Kann ich die Reihenfolge nach dem Start ändern?", answer: "Ja. Verwenden Sie Drag-and-Drop, um die Bildanordnung anzupassen, bevor Sie konvertieren." },
      { question: "Sind meine PNG-Dateien sicher?", answer: "Absolut. Alle Vorgänge erfolgen lokal in Ihrem Browser." },
    ],
  },
  "pdf-to-text": {
    howTo: {
      title: "Text aus PDF extrahieren",
      steps: [
        "Laden Sie eine PDF-Datei hoch.",
        "Das Tool extrahiert automatisch den gesamten Text.",
        "Wählen Sie Optionen für Formatierung oder Layout.",
        "Laden Sie die Textdatei herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Extrahieren Sie Text aus beliebigen PDF-Dateien",
        "Behalten Sie Formatierung und Struktur optional bei",
        "Entfernen Sie Seitenzahlen und Kopf-/Fußzeilen",
        "Optimiert für gescannte und native PDFs",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Gescannte PDFs erfordern möglicherweise manuelle Bereinigung",
        "Verwenden Sie den Text für Suchfunktionen oder Datenverarbeitung",
        "Behalten Sie die Struktur bei, wenn Sie die Seitenaufteilung benötigen",
      ],
    },
    faq: [
      { question: "Funktioniert dies bei gescannten PDFs?", answer: "Gescannte PDFs (Bilder) erfordern OCR, was nicht in diesem Tool enthalten ist. Native PDFs funktionieren einwandfrei." },
      { question: "Werden die Zeilenumbrüche beibehalten?", answer: "Ja. Das Tool behält die Textstruktur so gut wie möglich bei." },
      { question: "Kann ich nur Text von bestimmten Seiten extrahieren?", answer: "Ja. Wählen Sie einen Seitenbereich vor der Extraktion aus." },
    ],
  },
  "pdf-to-word": {
    howTo: {
      title: "PDF zu Word konvertieren",
      steps: [
        "Laden Sie eine PDF-Datei hoch.",
        "Das Tool konvertiert die PDF zu einem Word-Format.",
        "Laden Sie die .docx-Datei herunter.",
        "Bearbeiten Sie das Dokument in Microsoft Word oder einer kompatiblen Anwendung.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie PDF zu bearbeitbarem Word-Format",
        "Behalten Sie Formatierung und Layout bei",
        "Unterstützt komplexe Dokumente mit mehreren Spalten",
        "Schnelle Konvertierung im Browser",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Überprüfen Sie die formatierung nach der Konvertierung",
        "Gescannte PDFs funktionieren möglicherweise nicht optimal",
        "Speichern Sie die bearbeitete Datei als Word-Dokument",
      ],
    },
    faq: [
      { question: "Ist die konvertierte Datei vollständig bearbeitbar?", answer: "Ja. Sie erhalten eine vollständig bearbeitbare .docx-Datei, die Sie in Word anpassen können." },
      { question: "Werden Bilder erhalten?", answer: "Ja. Bilder werden in der Word-Datei beibehalten." },
      { question: "Funktioniert dies mit verschlüsselten PDFs?", answer: "Nein. Sie müssen zuerst den Schutz entfernen." },
    ],
  },
  "pdf-to-excel": {
    howTo: {
      title: "PDF zu Excel konvertieren",
      steps: [
        "Laden Sie eine PDF mit Tabellendaten hoch.",
        "Das Tool erkennt und konvertiert die Tabellen automatisch.",
        "Laden Sie die .xlsx-Datei herunter.",
        "Öffnen Sie sie in Excel oder einer kompatiblen Anwendung.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie PDF-Tabellen zu Excel-Dateien",
        "Erkennen Sie Tabellenstrukturen automatisch",
        "Behalten Sie Formatierung bei",
        "Unterstützen Sie mehrere Tabellen auf einer Seite",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Stellen Sie sicher, dass Tabellen klar definiert sind",
        "Überprüfen Sie die Daten nach der Konvertierung",
        "Verwenden Sie Excel-Funktionen zur weiteren Datenverarbeitung",
      ],
    },
    faq: [
      { question: "Funktioniert dies mit komplexen Tabellen?", answer: "Funktioniert am besten mit gut strukturierten Tabellen. Komplexe Layouts erfordern möglicherweise manuelle Anpassungen." },
      { question: "Werden Bilder konvertiert?", answer: "Nein. Dieses Tool konzentriert sich auf Tabellendaten." },
      { question: "Kann ich mehrere Tabellen gleichzeitig konvertieren?", answer: "Ja. Mehrere Tabellen auf verschiedenen Seiten werden alle konvertiert." },
    ],
  },
  "pdf-to-ppt": {
    howTo: {
      title: "PDF zu PowerPoint konvertieren",
      steps: [
        "Laden Sie eine PDF-Datei hoch.",
        "Das Tool konvertiert jede Seite zu einer Folie.",
        "Laden Sie die .pptx-Datei herunter.",
        "Öffnen Sie in PowerPoint und bearbeiten Sie nach Bedarf.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie jede PDF-Seite zu einer PowerPoint-Folie",
        "Behalten Sie Layout und Design bei",
        "Fügen Sie schnell Inhalte zu Ihren Präsentationen hinzu",
        "Unterstützen Sie große Präsentationen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Passen Sie Folien in PowerPoint nach Bedarf an",
        "Verwenden Sie das Ausgabeformat als Vorlage",
        "Bearbeiten Sie Bilder und Text direkt in PowerPoint",
      ],
    },
    faq: [
      { question: "Kann ich die Folien bearbeiten?", answer: "Ja. Nach der Konvertierung können Sie alle Folien in PowerPoint bearbeiten." },
      { question: "Bleibt die Formatierung erhalten?", answer: "Größtenteils ja, aber einige komplexe Formatierungen erfordern möglicherweise Anpassungen." },
      { question: "Funktioniert dies mit gescannten PDFs?", answer: "Gescannte PDFs werden als Bilder konvertiert. Bearbeiten Sie diese wie Bilder in PowerPoint." },
    ],
  },
  "pdf-to-pdfa": {
    howTo: {
      title: "PDF zu PDF/A konvertieren",
      steps: [
        "Laden Sie eine PDF-Datei hoch.",
        "Das Tool konvertiert sie zum PDF/A-Format.",
        "Laden Sie die archivierungsfreundliche Datei herunter.",
        "Speichern Sie sie für langfristige Aufbewahrung.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zu PDF/A für Langzeitarchivierung",
        "Gewährleisten Sie Kompatibilität mit Archivstandards",
        "Behalten Sie alle Metadaten bei",
        "Entfernen Sie eingebettete Multimedia (für Konformität)",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie PDF/A für geschäftliche und legale Unterlagen",
        "Archivierungsstandard ISO 19005",
        "Prüfen Sie die Dateigröße nach der Konvertierung",
      ],
    },
    faq: [
      { question: "Warum sollte ich zu PDF/A konvertieren?", answer: "PDF/A ist ein Archivierungsstandard, der Langzeitlesbarkeit und Zuverlässigkeit gewährleistet." },
      { question: "Verliert das Dokument Funktionalität?", answer: "Ja. PDF/A deaktiviert bestimmte interaktive Funktionen zugunsten der Stabilität." },
      { question: "Ist PDF/A größer als normales PDF?", answer: "Normalerweise ähnlich oder möglicherweise etwas größer aufgrund der Einbettung aller Schriftarten." },
    ],
  },
  "word-to-pdf": {
    howTo: {
      title: "Word-Dokument zu PDF konvertieren",
      steps: [
        "Laden Sie ein Word-Dokument (.docx) hoch.",
        "Das Tool konvertiert es automatisch zu PDF.",
        "Laden Sie die PDF-Datei herunter.",
        "Sie ist sofort einsatzbereit und formattiert.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie alle Word-Formate zu PDF",
        "Behalten Sie Formatierung, Schriftarten und Layout vollständig bei",
        "Unterstützen Sie Tabellen, Bilder und Überschriften",
        "Erstellen Sie druckfreundliche PDFs",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Überprüfen Sie das Dokument vor der Konvertierung",
        "Deaktivieren Sie Spuren in Word für saubere PDFs",
        "Verwenden Sie Standard-Seitengrößen (A4 oder Letter)",
      ],
    },
    faq: [
      { question: "Werden alle Formatierungen beibehalten?", answer: "Ja. Schriftarten, Farben, Tabellen und Layouts bleiben erhalten." },
      { question: "Was ist mit Makros und Feldern?", answer: "Makros werden nicht konvertiert. Felder werden als statischer Text beibehalten." },
      { question: "Kann ich die PDF bearbeiten?", answer: "Ja. Sie können sie mit unserem PDF-Editor bearbeiten oder mit anderen Tools." },
    ],
  },
  "ppt-to-pdf": {
    howTo: {
      title: "PowerPoint zu PDF konvertieren",
      steps: [
        "Laden Sie eine PowerPoint-Präsentation (.pptx) hoch.",
        "Das Tool konvertiert alle Folien zu PDF-Seiten.",
        "Laden Sie die PDF-Datei herunter.",
        "Sie ist bereit zum Teilen oder Drucken.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie PowerPoint-Präsentationen zu PDF",
        "Behalten Sie Übergänge und Animationen als statische Folien bei",
        "Unterstützen Sie alle Folieneigenschaften",
        "Erstellen Sie tragbare Präsentationen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Wählen Sie Handzettel-Layout für Notizenbeispielen",
        "Konvertieren Sie in Grauwerte für schwarz-weiß Druck",
        "Überprüfen Sie die Vorschau vor dem Download",
      ],
    },
    faq: [
      { question: "Werden Animationen beibehalten?", answer: "Nein. Animationen werden zu statischen Folien. Jede Folie wird als eine Seite angezeigt." },
      { question: "Kann ich Notizen einbeziehen?", answer: "Ja. Wählen Sie das Handzettel-Format aus, das Notizen einbezieht." },
      { question: "Was ist mit eingebetteten Videos?", answer: "Videos werden nicht eingebettet. Sie erhalten einen Link oder werden entfernt." },
    ],
  },
  "excel-to-pdf": {
    howTo: {
      title: "Excel-Tabelle zu PDF konvertieren",
      steps: [
        "Laden Sie eine Excel-Datei (.xlsx) hoch.",
        "Das Tool konvertiert Tabellen zu PDF-Seiten.",
        "Laden Sie die PDF-Datei herunter.",
        "Sie ist bereit zum Freigeben oder Drucken.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie Excel-Tabellen zu druckfreundlichen PDFs",
        "Behalten Sie Formatierung und Layout bei",
        "Unterstützen Sie mehrere Blätter als PDF-Seiten",
        "Optimieren Sie für Druckseiten-Layout",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Justieren Sie Seitenumbrüche vor der Konvertierung in Excel",
        "Verbergen Sie nicht benötigte Spalten",
        "Verwenden Sie Seitenlayout-Vorschau in Excel",
      ],
    },
    faq: [
      { question: "Werden alle Blätter konvertiert?", answer: "Ja. Alle Blätter werden zu PDF-Seiten." },
      { question: "Was ist mit Formeln?", answer: "Formeln werden zu Werten konvertiert (Ergebnisse, nicht Formeln)." },
      { question: "Kann ich mehrere Dateien gleichzeitig konvertieren?", answer: "Nein, laden Sie jeweils eine Datei hoch." },
    ],
  },
  "html-to-pdf": {
    howTo: {
      title: "HTML zu PDF konvertieren",
      steps: [
        "Geben Sie HTML-Code ein oder laden Sie eine HTML-Datei hoch.",
        "Wählen Sie Seitengröße und Einstellungen.",
        "Das Tool konvertiert HTML zu PDF.",
        "Laden Sie die PDF-Datei herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie HTML-Code oder Dateien zu PDF",
        "Behalten Sie CSS-Styling bei",
        "Unterstützen Sie Bilder und Verknüpfungen",
        "Wählen Sie Papierformat und Ränder",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Passen Sie Druckmedien-CSS an",
        "Testen Sie komplexe HTML in Ihrem Browser",
        "Verwenden Sie externe CSS für bessere Kontrolle",
      ],
    },
    faq: [
      { question: "Funktioniert JavaScript?", answer: "Nein. Nur HTML und CSS werden konvertiert. JavaScript wird nicht ausgeführt." },
      { question: "Werden externe Ressourcen geladen?", answer: "Ja, aber mit zeitlichen Einschränkungen. Betten Sie Bilder ein, falls möglich." },
      { question: "Kann ich HTML direkt eingeben?", answer: "Ja. Geben Sie HTML in das Textfeld ein oder laden Sie eine .html-Datei hoch." },
    ],
  },
  "heic-to-pdf": {
    howTo: {
      title: "HEIC-Bild zu PDF konvertieren",
      steps: [
        "Laden Sie HEIC-Bilder hoch.",
        "Wählen Sie Seitengröße und Anordnung.",
        "Das Tool konvertiert zu PDF.",
        "Laden Sie die PDF-Datei herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie HEIC (Apple) zu PDF",
        "Unterstützen Sie mehrere Bilder pro PDF",
        "Behalten Sie Bildqualität bei",
        "Sortieren Sie Bilder im Editor",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "HEIC wird meist von Apple-Geräten verwendet",
        "Konvertieren Sie zuerst zu JPEG, wenn Probleme auftreten",
        "Überprüfen Sie die Größe vor dem Hochladen",
      ],
    },
    faq: [
      { question: "Was ist HEIC?", answer: "HEIC (High Efficiency Image Container) ist das Bildformat von Apple iPhone und iPad." },
      { question: "Warum Bilder zu PDF konvertieren?", answer: "PDFs sind universell kompatibel und ideal für Dokumentfreigabe." },
      { question: "Werden mehrere Bilder unterstützt?", answer: "Ja. Laden Sie mehrere HEIC-Dateien hoch und erstellen Sie ein mehrseitiges PDF." },
    ],
  },
  "webp-to-pdf": {
    howTo: {
      title: "WebP zu PDF konvertieren",
      steps: [
        "Laden Sie WebP-Bilder hoch.",
        "Konfigurieren Sie Seitenoptionen.",
        "Das Tool konvertiert zu PDF.",
        "Laden Sie die PDF-Datei herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie moderne WebP-Bilder zu PDF",
        "Behalten Sie Bildqualität bei",
        "Stapelverarbeitung mehrerer WebP-Dateien",
        "Schnelle Konvertierung im Browser",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "WebP ist ein modernes Format mit guter Kompression",
        "Verwenden Sie für Web-Bilder und Screenshots",
        "Konvertieren Sie zu PDF zur Archivierung",
      ],
    },
    faq: [
      { question: "Was ist WebP?", answer: "WebP ist ein modernes Bildformat von Google, das bessere Kompression als JPEG bietet." },
      { question: "Funktioniert dies mit allen WebP-Bildern?", answer: "Ja. Alle WebP-Bilder werden unterstützt." },
      { question: "Kann ich mehrere WebP zu einem PDF kombinieren?", answer: "Ja. Laden Sie mehrere Dateien hoch und sie werden kombiniert." },
    ],
  },
  "tiff-to-pdf": {
    howTo: {
      title: "TIFF zu PDF konvertieren",
      steps: [
        "Laden Sie TIFF-Datei(en) hoch.",
        "Das Tool konvertiert automatisch zu PDF.",
        "Laden Sie die PDF-Datei herunter.",
        "Sie sind bereit zur Verwendung.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie TIFF zu PDF",
        "Behalten Sie Seitenreihenfolge und Qualität bei",
        "Unterstützen Sie mehrseitige TIFF-Dateien",
        "Schnelle Konvertierung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "TIFF wird oft für gescannte Dokumente verwendet",
        "PDF ist universeller kompatibel",
        "Überprüfen Sie die Dateigröße vorher",
      ],
    },
    faq: [
      { question: "Was ist TIFF?", answer: "Tagged Image File Format ist ein Format für qualitativ hochwertige Bilder, oft für gescannte Dokumente." },
      { question: "Sind mehrseitige TIFF unterstützt?", answer: "Ja. Mehrseitige TIFF-Dateien werden korrekt konvertiert." },
      { question: "Verliert das Bild an Qualität?", answer: "Nein. TIFF zu PDF behält die volle Qualität." },
    ],
  },
  "image-to-pdf": {
    howTo: {
      title: "Bild zu PDF konvertieren",
      steps: [
        "Laden Sie Bilddateien hoch (JPG, PNG, BMP, etc.).",
        "Ordnen Sie Bilder an, falls mehrere vorhanden sind.",
        "Das Tool erstellt ein PDF.",
        "Laden Sie die PDF-Datei herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie beliebige Bildformate zu PDF",
        "Kombinieren Sie mehrere Bilder in einer PDF",
        "Sortieren Sie Bilder vor der Konvertierung",
        "Behalten Sie die Bildqualität bei",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie für Galerien oder Dokumentsammlungen",
        "Ordnen Sie Bilder logisch an",
        "Überprüfen Sie die Seitengröße",
      ],
    },
    faq: [
      { question: "Welche Bildformate werden unterstützt?", answer: "JPG, PNG, GIF, BMP, WebP, HEIC, TIFF, PSD, EPS und mehr." },
      { question: "Kann ich die Reihenfolge ändern?", answer: "Ja. Verwenden Sie Drag-and-Drop, um Bilder neu anzuordnen." },
      { question: "Gibt es Größenbeschränkungen?", answer: "Nein. Laden Sie beliebig viele Bilder hoch (einzeln oder als Batch)." },
    ],
  },
  "scan-to-pdf": {
    howTo: {
      title: "Scan zu PDF konvertieren",
      steps: [
        "Scannen Sie ein Dokument mit Ihrem Scanner oder einer Scanner-App.",
        "Laden Sie die gescannte Bilddatei hoch.",
        "Das Tool konvertiert sie zu einer durchsuchbaren PDF.",
        "Laden Sie die PDF-Datei herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie gescannte Bilder zu PDFs",
        "Optimieren Sie für digitale Archivierung",
        "Dunkle/helle automatische Einstellung",
        "Seitentropfen-Korrektur",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Scannen Sie mit mindestens 200 DPI",
        "Verwenden Sie schwarz-weiß für Dokumente",
        "Korrigieren Sie Neigungen vor dem Upload",
      ],
    },
    faq: [
      { question: "Kann ich gescannte Dokumente durchsuchen?", answer: "Nein. Verwenden Sie einen OCR-Service, um durchsuchbare PDFs zu erstellen." },
      { question: "Werden mehrere gescannte Seiten unterstützt?", answer: "Ja. Laden Sie alle Seiten als separate Bilder hoch und kombinieren Sie sie." },
      { question: "Wird die Qualität beibehalten?", answer: "Ja. Lossless-Konvertierung behalten alle gescannten Details." },
    ],
  },
  "header-footer": {
    howTo: {
      title: "Kopf- und Fußzeilen zu PDF hinzufügen",
      steps: [
        "Laden Sie eine PDF-Datei hoch.",
        "Geben Sie Kopftext und Fußtext ein (statisch oder mit Feldern wie {seitenzahl}).",
        "Wählen Sie Schriftart, Größe und Farbe.",
        "Wählen Sie, auf welche Seiten dies angewendet werden soll.",
        "Klicken Sie auf \"Anwenden\" und laden Sie herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Fügen Sie Text, Seitenzahlen und Daten zu Kopf- und Fußzeilen hinzu",
        "Dynamische Felder: {seitenzahl}, {Gesamtseiten}, {Datum}, {Zeit}",
        "Benutzerdefiniierte Schriftarten, Größen und Farben",
        "Pro Seite oder für Seitenbereiche anwenden",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie {seitenzahl} für Seitennummern",
        "Verwenden Sie {Datum} zum Hinzufügen des aktuellen Datums",
        "Lassen Sie ausreichend Rand für Kopf-/Fußzeilen",
      ],
    },
    faq: [
      { question: "Kann ich Bilder in Kopf-/Fußzeilen hinzufügen?", answer: "Derzeit nicht. Sie können Text mit speziellen Zeichen verwenden." },
      { question: "Können unterschiedliche Kopfzeilen auf verschiedenen Seiten stehen?", answer: "Nein, dasselbe Muster auf alle oder ausgewählte Seiten." },
      { question: "Werden Seitenzahlen automatisch inkrementiert?", answer: "Ja. Verwenden Sie {seitenzahl} für automatische Inkrementierung." },
    ],
  },
  "page-numbers": {
    howTo: {
      title: "Seitenzahlen zu PDF hinzufügen",
      steps: [
        "Laden Sie eine PDF-Datei hoch.",
        "Wählen Sie die Position: oben, unten, links, rechts.",
        "Wählen Sie das Nummerierungsformat (1, 2, 3... oder i, ii, iii...).",
        "Wählen Sie die Startseite und welche Seiten nummeriert werden sollen.",
        "Klicken Sie auf \"Hinzufügen\" und laden Sie herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Verschiedene Nummerierungsformate (arabisch, römisch, buchstaben)",
        "Mehrere Positionsoptionen (vier Ecken, vier Kanten)",
        "Wählen Sie Start-Seitenzahl",
        "Überspringen Sie Seiten, wenn nötig",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Platzieren Sie unten in der Mitte für Standard-Dokumente",
        "Verwenden Sie römische Ziffern für Vorworte und Inhaltsverzeichnisse",
        "Passen Sie die Schriftgröße an die Lesbarkeit an",
      ],
    },
    faq: [
      { question: "Kann ich auf Seite 1 beginnen oder mit Seite 0?", answer: "Ja. Sie können die Startnummer konfigurieren." },
      { question: "Kann ich die Nummerierung auf bestimmte Seiten beschränken?", answer: "Ja. Wählen Sie, welche Seiten nummeriert werden sollen." },
      { question: "Kann ich das Nummerierungsformat nach dem Hinzufügen ändern?", answer: "Nein. Müssen die Datei erneut hochladen und neu konfigurieren." },
    ],
  },
  "delete-pages": {
    howTo: {
      title: "Seiten aus PDF löschen",
      steps: [
        "Laden Sie eine PDF-Datei hoch.",
        "Wählen Sie die Seiten aus, die gelöscht werden sollen (einzeln oder als Bereich).",
        "Überprüfen Sie Ihre Auswahl in der Vorschau.",
        "Klicken Sie auf \"Löschen\" und laden Sie die vereinfachte PDF herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Wählen Sie einzelne Seiten oder Seitenbereiche zum Löschen",
        "Visuelle Vorschau der zu löschenden Seiten",
        "Schnelle Auswahl mit Kontrollkästchen",
        "Bestätigung vor dem Löschen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Überprüfen Sie die Vorschau vor dem Löschen",
        "Verwenden Sie Seitenbereiche (z. B. 1-5) für schnelle Auswahl",
        "Speichern Sie eine Sicherung des Originals",
      ],
    },
    faq: [
      { question: "Kann ich mehrere nicht zusammenhängende Seiten löschen?", answer: "Ja. Wählen Sie einzelne Seiten mit Kontrollkästchen aus." },
      { question: "Kann ich den Löschvorgang rückgängig machen?", answer: "Nein, aber Sie können die Original-PDF erneut hochladen." },
      { question: "Können leere Seiten automatisch entfernt werden?", answer: "Nein, müssen Sie manuell auswählen." },
    ],
  },
  "extract-pages": {
    howTo: {
      title: "Seiten aus PDF extrahieren",
      steps: [
        "Laden Sie eine PDF-Datei hoch.",
        "Wählen Sie die Seiten aus, die Sie extrahieren möchten.",
        "Sie können sie in eine neue PDF gruppieren oder einzeln herunterladen.",
        "Laden Sie die Ergebnis-PDF(s) herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Extrahieren Sie einzelne oder mehrere Seiten",
        "Erstellen Sie eine neue PDF aus extrahierten Seiten",
        "Oder laden Sie jede Seite einzeln herunter",
        "Behalten Sie die Seitenbeschaffenheit bei",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie Seitenbereiche (z. B. 5-10) für schnelle Auswahl",
        "Kombinieren Sie extrahierte Seiten mit unserem Merge-Tool",
        "Perfekt zum Teilen von Abschnitten großer Dokumente",
      ],
    },
    faq: [
      { question: "Was ist der Unterschied zwischen Extrahieren und Löschen?", answer: "Extrahieren hält die ausgewählten Seiten und verwerfen Sie andere. Löschen entfernt Seiten und behält den Rest." },
      { question: "Kann ich extrahierte Seiten in verschiedene Dateien splitten?", answer: "Ja. Laden Sie jede Seite einzeln herunter." },
      { question: "Funktioniert dies mit großen PDFs?", answer: "Ja, aber größere Dateien benötigen mehr Zeit zur Verarbeitung." },
    ],
  },
  "organize-pages": {
    howTo: {
      title: "PDF-Seiten organisieren",
      steps: [
        "Laden Sie eine PDF-Datei hoch.",
        "Verwenden Sie Drag-and-Drop, um Seiten neu anzuordnen.",
        "Löschen Sie unerwünschte Seiten mit dem Mülleimer-Symbol.",
        "Duplizieren Sie Seiten bei Bedarf.",
        "Klicken Sie auf \"Speichern\" und laden Sie die organisierte PDF herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Drag-and-Drop-Seitenreorganisation",
        "Löschen Sie Seiten einzeln",
        "Duplizieren Sie Seiten",
        "Schnelle Vorschau aller Seiten",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Organisieren Sie Seiten logisch",
        "Duplizieren Sie wichtige Seiten bei Bedarf",
        "Überprüfen Sie die Reihenfolge vor dem Speichern",
      ],
    },
    faq: [
      { question: "Kann ich Seiten einfach neu anordnen?", answer: "Ja, mit Drag-and-Drop-Funktionalität." },
      { question: "Kann ich Seiten mehrmals duplizieren?", answer: "Ja, so oft wie nötig." },
      { question: "Wirkt sich die Organisation auf die Dateigröße aus?", answer: "Nein. Größe bleibt gleich, nur Reihenfolge ändert sich." },
    ],
  },
  "extract-images": {
    howTo: {
      title: "Bilder aus PDF extrahieren",
      steps: [
        "Laden Sie eine PDF-Datei mit Bildern hoch.",
        "Das Tool erkennt automatisch alle Bilder.",
        "Wählen Sie aus, welche Bilder extrahiert werden sollen.",
        "Laden Sie die Bilder einzeln oder als ZIP herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Automatische Bilderkennung",
        "Holen Sie alle Bilder auf einmal oder selektiv",
        "Laden Sie als ZIP für mehrere Bilder herunter",
        "Behalten Sie Bildqualität bei",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Perfekt für Dokumentfoto-Extraktion",
        "Laden Sie alle als ZIP für schnelle Speicherung",
        "Überprüfen Sie die Bildqualität nach der Extraktion",
      ],
    },
    faq: [
      { question: "Funktioniert dies mit allen Bildtypen in PDFs?", answer: "Ja, JPG, PNG, GIF und mehr." },
      { question: "Werden hochwertige Originale beibehalten?", answer: "Ja, lossless-Extraktion." },
      { question: "Kann ich nur bestimmte Bilder extrahieren?", answer: "Ja, wählen Sie die gewünschten Bilder aus." },
    ],
  },
  "edit-metadata": {
    howTo: {
      title: "PDF-Metadaten bearbeiten",
      steps: [
        "Laden Sie eine PDF-Datei hoch.",
        "Bearbeiten Sie Felder: Titel, Autor, Betreff, Schlüsselwörter.",
        "Legen Sie das Erstellungsdatum und Änderungsdatum fest.",
        "Klicken Sie auf \"Speichern\" und laden Sie die PDF mit aktualisierten Metadaten herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Bearbeiten Sie Titel, Autor, Betreff und Schlüsselwörter",
        "Ändern Sie Erstellungs- und Änderungsdaten",
        "Entfernen Sie sensible Metadaten",
        "Behalten Sie PDF-Inhalt unverändert",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Setzen Sie aussagekräftige Titel für Suchmaschinen-Optimierung",
        "Verwenden Sie Schlüsselwörter für bessere Auffindbarkeit",
        "Entfernen Sie private Informationen vor dem Teilen",
      ],
    },
    faq: [
      { question: "Welche Metadaten können bearbeitet werden?", answer: "Titel, Autor, Betreff, Schlüsselwörter, Erstellungs- und Änderungsdatum." },
      { question: "Wirkt sich das Bearbeiten von Metadaten auf den Inhalt aus?", answer: "Nein. Nur Metadaten werden geändert, nicht der Seiteninhalt." },
      { question: "Kann ich alle Metadaten entfernen?", answer: "Ja, lassen Sie die Felder leer zum Entfernen." },
    ],
  },
  "pages-per-sheet": {
    howTo: {
      title: "Seiten pro Blatt konvertieren",
      steps: [
        "Laden Sie eine PDF-Datei hoch.",
        "Wählen Sie, wie viele Seiten pro Blatt: 1, 2, 4, 6, 9 oder 16.",
        "Wählen Sie Seitengröße und Ränder.",
        "Das Tool konvertiert automatisch.",
        "Laden Sie die konvertierte PDF herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Wählen Sie 1, 2, 4, 6, 9 oder 16 Seiten pro Blatt",
        "Geeignet für Notizen oder Präsentationsbegleiter",
        "Behalten Sie Seitenreihenfolge und Layout bei",
        "Automatische Randanpassung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "2 Seiten pro Blatt ist Standard für Bücher",
        "4 Seiten pro Blatt für Handzettel mit Notizen",
        "6 oder 9 Seiten für dichte Präsentationen",
      ],
    },
    faq: [
      { question: "Wofür ist diese Funktion?", answer: "Zum Erstellen von Handzettel-Layouts aus Präsentationen oder zum Druck-Sparen." },
      { question: "Bleibt die Lesbarkeit erhalten?", answer: "Ja, solange Sie passende Größen wählen." },
      { question: "Kann ich benutzerdefinierte Layouts erstellen?", answer: "Nein, wählen Sie aus vordefinierten Optionen." },
    ],
  },
  "web-optimize": {
    howTo: {
      title: "PDF für Web optimieren",
      steps: [
        "Laden Sie eine PDF-Datei hoch.",
        "Das Tool komprimiert Bilder und optimiert für schnelle Webnutzung.",
        "Wählen Sie Qualität (hoch, mittel, niedrig).",
        "Laden Sie die optimierte PDF herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Komprimieren Sie für schnelleres Laden auf Webseiten",
        "Behalten Sie Lesbarkeit bei",
        "Reduzieren Sie Dateigröße um bis zu 80%",
        "Behalten Sie PDF-Funktionalität bei",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie \"Mittel\" für optimale Balance",
        "Testen Sie die Qualität nach der Optimierung",
        "Ideal für Website-Downloads und E-Mail-Anhänge",
      ],
    },
    faq: [
      { question: "Wie viel Größe kann ich sparen?", answer: "Normalerweise 30-80%, je nach Original-PDF." },
      { question: "Leidet die Qualität?", answer: "Minimal bei \"Mittel\"-Qualität; \"Hoch\" behält fast alle Details." },
      { question: "Funktioniert dies mit allen PDF-Arten?", answer: "Ja, aber bild- und foto-reiche PDFs profitieren am meisten." },
    ],
  },
  annotate: {
    howTo: {
      title: "Eine PDF annotieren",
      steps: [
        "Laden Sie Ihr PDF-Dokument hoch.",
        "Wählen Sie ein Annotationswerkzeug: Hervorheben, Unterstreichen, Durchstreichen oder Notizen.",
        "Klicken und ziehen Sie, um Text zu annotieren oder Haftnotizen hinzuzufügen.",
        "Klicken Sie auf \"Speichern\", um Anmerkungen anzuwenden und herunterzuladen.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Texthervorhebung in mehreren Farben",
        "Unterstreichen und Durchstreichen von Textmarkierungen",
        "Haftnotizen mit benutzerdefinierten Text- und Farboptionen",
        "Freihand-Zeichen- und Markierungswerkzeuge",
        "Anmerkungen exportieren und Übersichtsansicht",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie unterschiedliche Hervorhebungsfarben, um verschiedene Inhaltstypen zu kategorisieren",
        "Fügen Sie detaillierte Notizen zu wichtigen Abschnitten mit Haftnotizen hinzu",
        "Exportieren Sie die Anmerkungszusammenfassung für schnelle Referenzen",
      ],
    },
    faq: [
      { question: "Kann ich einzelne Anmerkungen entfernen?", answer: "Ja. Sie können bestimmte Anmerkungen selektiv löschen und andere sowie den ursprünglichen PDF-Inhalt beibehalten." },
      { question: "Sind Anmerkungen sichtbar, wenn jemand anderes die PDF öffnet?", answer: "Ja. Sobald Anmerkungen in der PDF gespeichert sind, sind sie für jeden sichtbar, der das Dokument öffnet." },
      { question: "Bleibt meine kommentierte PDF privat?", answer: "Ja. Alle Anmerkungen erfolgen in Ihrem Browser. Ihre PDF und Anmerkungen werden nie an einen Server gesendet." },
    ],
  },
  booklet: {
    howTo: {
      title: "Ein PDF-Booklet erstellen",
      steps: [
        "Laden Sie Ihr PDF-Dokument hoch.",
        "Wählen Sie Seitengröße und Bindungsrand.",
        "Wählen Sie die Bindungsseite (links oder rechts).",
        "Klicken Sie auf \"Erstellen\", um das Booklet-Layout zu generieren und herunterzuladen.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Ordnen Sie Seiten für Booklet-Bindung an",
        "Automatische Positionierung von Vorder- und Rückseite",
        "Benutzerdefinierbarer Bindungsrand",
        "Automatisches Einfügen leerer Seiten für korrekte Seitenzähler",
        "Druckfertiger Output mit Schnittmarken",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Stellen Sie sicher, dass die Seitenzahl durch 4 teilbar ist für korrektes Booklet-Layout",
        "Legen Sie den Bindungsrand basierend auf Ihrer Bindungsmethode fest",
        "Drucken Sie doppelseitig für authentisches Booklet-Aussehen",
      ],
    },
    faq: [
      { question: "Warum muss mein Dokument durch 4 teilbar sein?", answer: "Booklets sind gefaltete Blätter mit 4 Seiten pro Blatt. Ihr Inhalt muss Blätter vollständig ausfüllen, um korrektes Layout zu ermöglichen." },
      { question: "Kann das Tool automatisch leere Seiten hinzufügen, falls nötig?", answer: "Ja. Das Booklet-Tool fügt automatisch leere Seiten ein, um Ihre Seitenzahl durch 4 teilbar zu machen." },
      { question: "Wird die Booklet-Erstellung lokal in meinem Browser durchgeführt?", answer: "Ja. Alle Booklet-Layout- und Verarbeitungsvorgänge finden vollständig in Ihrem Browser statt, ohne Server-Uploads." },
    ],
  },
  crop: {
    howTo: {
      title: "PDF-Seiten zuschneiden",
      steps: [
        "Laden Sie Ihre PDF-Datei hoch.",
        "Verwenden Sie das Zuschneide-Werkzeug, um ein Rechteck um den gewünschten Inhalt zu zeichnen.",
        "Wenden Sie denselben Zuschnitt auf mehrere Seiten an oder passen Sie pro Seite an.",
        "Klicken Sie auf \"Zuschneiden\", um Ränder zu entfernen und das Ergebnis herunterzuladen.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Visuelles Zuschneide-Werkzeug mit Drag-to-Select-Schnittstelle",
        "Wenden Sie denselben Zuschnitt auf alle Seiten an oder passen Sie einzelne Seiten an",
        "Zuschneiden nach Prozentsatz oder festen Messungen",
        "Vorschau von Zuschnitten vor dem Anwenden",
        "Zuschneide-Vorgänge rückgängig machen und jederzeit wiederholen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Zuschneiden reduziert die Dateigröße durch Entfernung von Rändern",
        "Verwenden Sie einheitliche Zuschneide-Vorgänge für konsistentes Dokumentaussehen",
        "Perfekt zur Vorbereitung von Dokumenten zum Lesen auf Tablets",
      ],
    },
    faq: [
      { question: "Um wie viel kann ich die Dateigröße durch Zuschneiden reduzieren?", answer: "Die Größenreduktion hängt davon ab, wie viel Sie zuschneiden. Das Entfernen großer Ränder kann die Größe um 20-50% oder mehr reduzieren." },
      { question: "Kann ich einen Zuschnitt nach dem Anwenden rückgängig machen?", answer: "Nein. Zuschneiden ist permanent. Zeigen Sie eine Vorschau Ihres Zuschnitts sorgfältig an, bevor Sie ihn anwenden. Bewahren Sie ein Backup des Originals auf." },
      { question: "Wird das Zuschneiden lokal auf meinem Gerät durchgeführt?", answer: "Ja. Alle Zuschneide-Vorgänge finden in Ihrem Browser statt, ohne dass Server-Uploads erfolgen." },
    ],
  },
  flatten: {
    howTo: {
      title: "Eine PDF abflachen",
      steps: [
        "Laden Sie eine PDF mit Formularfeldern, Ebenen oder Anmerkungen hoch.",
        "Wählen Sie, was abgeflacht werden soll: Formulare, Ebenen, Anmerkungen oder alle.",
        "Klicken Sie auf \"Abflachen\", um alle Ebenen zu vereinigen.",
        "Laden Sie die abgeflachte PDF herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Flachen Sie interaktive Formularfelder in statischen Inhalt ab",
        "Führen Sie mehrere PDF-Ebenen in eine einzelne Ebene zusammen",
        "Entfernen oder flachen Sie alle Anmerkungen ab",
        "Reduzieren Sie die Dateigröße durch Abflachen von unnötigen Elementen",
        "Bewahren Sie alle Inhalte bei, während Sie die Bearbeitbarkeit entfernen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Flachen Sie PDFs ab, bevor Sie sie teilen, um versehentliche Bearbeitung zu verhindern",
        "Das Abflachen von Formularfeldern nach dem Ausfüllen macht die PDF schreibgeschützt",
        "Reduziert die Dateigröße erheblich bei PDFs mit mehreren Ebenen",
      ],
    },
    faq: [
      { question: "Was ist der Unterschied zwischen Abflachen und Konvertierung zu Bildern?", answer: "Abflachen vereinigt Ebenen, während Text als Text erhalten bleibt. Die Konvertierung zu Bildern rasterisiert alles, wodurch Text nicht durchsuchbar wird." },
      { question: "Kann ich das Abflachen nach dem Herunterladen rückgängig machen?", answer: "Nein. Abflachen ist permanent. Sobald abgeflacht, können Formularfelder und Ebenen nicht wiederhergestellt werden. Bewahren Sie Ihr Original auf." },
      { question: "Wird das Abflachen lokal auf meinem Gerät durchgeführt?", answer: "Ja. Alle Abflachungs-Vorgänge werden vollständig in Ihrem Browser verarbeitet, ohne Server-Beteiligung." },
    ],
  },
  grayscale: {
    howTo: {
      title: "PDF zu Graustufen konvertieren",
      steps: [
        "Laden Sie Ihre farbige PDF-Datei hoch.",
        "Wählen Sie den Graustufen-Konvertierungstyp: Standard oder hohe Qualität.",
        "Zeigen Sie eine Vorschau des konvertierten Aussehens.",
        "Klicken Sie auf \"Konvertieren\", um anzuwenden und herunterzuladen.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie Vollfarb-PDFs zu Graustufen",
        "Mehrere Konvertierungsalgorithmen für optimale Ergebnisse",
        "Reduziert die Dateigröße erheblich",
        "Erhält Text- und Bildqualität",
        "Stapelkonvertierung mehrerer PDFs",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Die Graustufen-Konvertierung reduziert die Dateigröße um 20-40%",
        "Perfekt für Dokumente, die für Schwarz-Weiß-Druck bestimmt sind",
        "Verbessert den Druck auf Schwarzweiß-Druckern",
      ],
    },
    faq: [
      { question: "Kann ich die Graustufen-Konvertierung nach dem Herunterladen rückgängig machen?", answer: "Nein. Die Graustufen-Konvertierung ist permanent und kann nicht rückgängig gemacht werden. Bewahren Sie ein Backup der Original-PDF in Farbe auf." },
      { question: "Bleibt der Text nach der Konvertierung zu Graustufen lesbar?", answer: "Ja. Die Textqualität bleibt erhalten. Die Graustufen-Konvertierung betrifft nur die Farbinformationen, nicht die Textschärfe." },
      { question: "Wird die Konvertierung sicher in meinem Browser durchgeführt?", answer: "Ja. Alle Graustufen-Konvertierungen finden lokal in Ihrem Browser statt, ohne dass ein Upload auf einen Server erfolgt." },
    ],
  },
  ocr: {
    howTo: {
      title: "OCR auf einer PDF durchführen",
      steps: [
        "Laden Sie eine gescannte PDF oder bildbasierte PDF hoch.",
        "Wählen Sie die OCR-Sprache für genaue Texterkennung.",
        "Wählen Sie das Ausgabeformat: durchsuchbare PDF oder extrahierter Text.",
        "Klicken Sie auf \"OCR\", um zu verarbeiten und Ergebnisse herunterzuladen.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Optische Zeichenerkennung für gescannte Dokumente",
        "Unterstützung für über 40 Sprachen für genaue Textextraktion",
        "Erstellen Sie durchsuchbare PDFs mit versteckter Textebene",
        "Extrahieren Sie Text in separate Datei oder behalten Sie ihn in der PDF",
        "Stapel-OCR-Verarbeitung für mehrere Dokumente",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Durchsuchbare PDFs ermöglichen Textauswahl und Suche",
        "Bessere Scan-Qualität führt zu genaueren OCR-Ergebnissen",
        "Perfekt zum Digitalisieren alter Dokumente und Archive",
      ],
    },
    faq: [
      { question: "Wie genau ist die OCR-Texterkennung?", answer: "Die Genauigkeit hängt von der Scan-Qualität ab. Klare, hochauflösende Scans erreichen über 95% Genauigkeit. Schlechte Scans können manuelle Korrekturen erfordern." },
      { question: "Kann ich OCR auf handgeschriebene Dokumente anwenden?", answer: "OCR funktioniert am besten mit gedrucktem Text. Die Erkennung von handgeschriebenem Inhalt ist begrenzt und kann manuelle Transkription erfordern." },
      { question: "Wird die OCR-Verarbeitung lokal in meinem Browser durchgeführt?", answer: "Ja. Alle OCR-Verarbeitung finden lokal in Ihrem Browser statt, ohne dass ein Upload an externe Server erfolgt." },
    ],
  },
  overlay: {
    howTo: {
      title: "PDFs überlagern",
      steps: [
        "Laden Sie die Basis-PDF und Overlay-PDF-Dateien hoch.",
        "Richten Sie die Overlay-Position und Skalierung aus.",
        "Passen Sie die Deckkraft an, falls ein Transparenzeffekt erforderlich ist.",
        "Klicken Sie auf \"Anwenden\", um zu zusammenzuführen und herunterzuladen.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Überlagern Sie eine PDF über eine andere",
        "Positionieren und skalieren Sie Overlay unabhängig",
        "Deckkraft-Anpassung für Vermischungseffekte",
        "Overlay-Anwendung seite für Seite",
        "Stapel-Overlaying für mehrere Dokumente",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie Overlays, um Logos oder Wasserzeichen zu Batch-Dokumenten hinzuzufügen",
        "Passen Sie die Deckkraft an, um Overlay-Inhalte halbtransparent zu machen",
        "Perfekt zum Zusammenführen von Formularen mit vorgedruckten Dokumenten",
      ],
    },
    faq: [
      { question: "Wie unterscheidet sich Overlay vom Zusammenführen von PDFs?", answer: "Overlay platziert eine PDF über einer anderen mit Positionierungskontrolle. Zusammenführen kombiniert Seiten sequenziell." },
      { question: "Kann ich unterschiedliche Overlays auf verschiedene Seiten anwenden?", answer: "Ja. Sie können unterschiedliche Overlays auf bestimmte Seitenbereiche in Ihrer Basis-PDF anwenden." },
      { question: "Wird die Overlay-Verarbeitung lokal auf meinem Gerät durchgeführt?", answer: "Ja. Alle PDF-Overlay-Vorgänge finden in Ihrem Browser statt, ohne dass Daten an einen Server gesendet werden." },
    ],
  },
  redact: {
    howTo: {
      title: "Eine PDF schwärzen",
      steps: [
        "Laden Sie Ihr PDF-Dokument hoch.",
        "Verwenden Sie das Schwärzungs-Werkzeug, um Text oder Bereiche zum Ausblenden auszuwählen.",
        "Wenden Sie Schwärzungsmarken (schwarze Kästen über Inhalt) an.",
        "Klicken Sie auf \"Anwenden\", um Inhalte dauerhaft zu entfernen und herunterzuladen.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Entfernen Sie dauerhaft sensible Informationen aus PDFs",
        "Ziehen Sie Schwärzungs-Kästen über Text oder Bilder",
        "Stapel-Schwärzung mit konsistentem Styling",
        "Passen Sie Schwärzungsfarbe und Deckkraft an",
        "Überprüfen Sie Schwärzungen vor dem Export",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Stellen Sie sicher, dass Schwärzungen mit ausreichender Deckkraft sichtbar sind",
        "Schwärzung ist permanent – Backup-Original vor dem Anwenden",
        "Verwenden Sie zum Entfernen persönlicher Daten vor dem Teilen von Dokumenten",
      ],
    },
    faq: [
      { question: "Ist die Schwärzung wirklich dauerhaft und irreversibel?", answer: "Ja. Geschwärzte Inhalte werden dauerhaft aus der PDF entfernt und können nicht wiederhergestellt oder sichtbar gemacht werden." },
      { question: "Bleibt mein sensibles Dokument während der Schwärzung privat?", answer: "Ja. Alle Schwärzungen finden lokal in Ihrem Browser statt. Ihre PDF wird nie an oder auf einem Server gespeichert." },
      { question: "Kann ich versteckten Text schwärzen, der nicht visuell erkennbar ist?", answer: "Schwärzung verbirgt sichtbare Inhalte. Zur Entfernung von Metadaten oder verstecktem Text verwenden Sie das Metadaten-Entfernungs-Werkzeug oder flatten Sie die PDF." },
    ],
  },
  repair: {
    howTo: {
      title: "Eine PDF reparieren",
      steps: [
        "Laden Sie Ihre beschädigte oder defekte PDF-Datei hoch.",
        "Wählen Sie die Reparationsoption: Automatische Reparation oder erweiterte Wiederherstellung.",
        "Zeigen Sie eine Vorschau des reparierten Dokuments.",
        "Klicken Sie auf \"Reparieren\", um die wiederhergestellte PDF herunterzuladen.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Reparieren Sie beschädigte PDF-Dateien mit automatischer Reparation",
        "Stellen Sie lesbaren Inhalt aus beschädigten Dokumenten wieder her",
        "Unterstützung für verschiedene Typen von PDF-Beschädigungen",
        "Vorschau des reparierten Inhalts vor dem Speichern",
        "Versuchen Sie, die ursprüngliche Formatierung beizubehalten",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Die Reparation stellt oft die meisten Inhalte aus leicht beschädigten Dateien wieder her",
        "Bei schwer beschädigten Dateien kann etwas Formatierung verloren gehen",
        "Bewahren Sie Backups von wichtigen PDFs auf, um Beschädigungen zu vermeiden",
      ],
    },
    faq: [
      { question: "Stellt die Reparatur alle Inhalte aus einer beschädigten PDF wieder her?", answer: "Die meisten Inhalte werden normalerweise wiederhergestellt, aber stark beschädigte Dateien können etwas Formatierung oder Seiten verlieren." },
      { question: "Was verursacht PDF-Beschädigungen?", answer: "Beschädigungen können durch unvollständige Downloads, Dateiübertragungsfehler, Speichermedienschaden oder Softwareabstürze auftreten." },
      { question: "Wird die PDF-Reparation lokal durchgeführt, ohne auf einen Server hochzuladen?", answer: "Ja. Alle Reparations-Vorgänge finden in Ihrem Browser statt, ohne dass ein Upload auf einen externen Server erfolgt." },
    ],
  },
  resize: {
    howTo: {
      title: "Eine PDF vergrößern oder verkleinern",
      steps: [
        "Laden Sie Ihr PDF-Dokument hoch.",
        "Wählen Sie die Zielseite (A3, A4, A5, Letter usw.).",
        "Wählen Sie die Skalierungsoption: An Seite anpassen oder Seitenverhältnis beibehalten.",
        "Klicken Sie auf \"Größe ändern\", um anzuwenden und herunterzuladen.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Größe zu Standard-Papierformaten ändern (A-Serie, Letter, Legal)",
        "Benutzerdefinierte Breiten- und Höhendimensionen",
        "Mehrere Skalierungsoptionen (Dehnen, Anpassung, Seitenverhältnis)",
        "Stapelverarbeitung für mehrere PDFs",
        "Vorschau vor Anwendung von Änderungen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Größe zu A5 für mobilfreundliche Lesedokumente ändern",
        "Verwenden Sie die Option \"Anpassen\", um das Seitenverhältnis ohne Verzerrung zu bewahren",
        "Stapelgröße für mehrere Dokumente zur Konsistenz ändern",
      ],
    },
    faq: [
      { question: "Wirkt sich die Größenänderung auf die Textqualität oder Lesbarkeit aus?", answer: "Die Verwendung von \"Anpassung\" erhält die Textqualität. Wenn Sie \"Dehnen\" bei wesentlich unterschiedlichen Seitenverhältnissen verwenden, kann Text verzerrt sein." },
      { question: "Kann ich nur einige Seiten in einer mehrseitigen PDF größer oder kleiner machen?", answer: "Das Werkzeug vergrößert oder verkleinert alle Seiten auf die gleichen Dimensionen. Zur selektiven Größenänderung splitten und ändern Sie Seiten separat." },
      { question: "Wird die Größenänderung sicher ohne Upload auf einen Server durchgeführt?", answer: "Ja. Alle Größenänderungen finden in Ihrem Browser statt, ohne dass Daten hochgeladen werden." },
    ],
  },
  sign: {
    howTo: {
      title: "Eine PDF signieren",
      steps: [
        "Laden Sie Ihr PDF-Dokument hoch.",
        "Wählen Sie den Signaturtyp: zeichnen, Bild hochladen oder Namen eingeben.",
        "Platzieren Sie Ihre Signatur auf der Dokumentseite.",
        "Klicken Sie auf \"Signieren\", um anzuwenden und die signierte PDF herunterzuladen.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Zeichnen Sie Signaturen freihand mit Maus oder Touchscreen",
        "Laden Sie vorgefertigte Signaturbilder hoch",
        "Geben Sie Signaturen-Text in verschiedenen Schriftarten ein",
        "Größe und Position der Signatur überall auf der Seite ändern",
        "Mehrere Signaturen pro Dokument",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Zeichnen Sie Signaturen auf einem Touchscreen-Gerät für beste Ergebnisse",
        "Laden Sie konsistente Signaturbilder für professionelles Erscheinungsbild hoch",
        "Testen Sie die Signaturplatzierung in der Vorschau vor dem Finalisieren",
      ],
    },
    faq: [
      { question: "Ist eine digitale Signatur, die hier erstellt wird, rechtlich bindend?", answer: "Dieses Werkzeug erstellt eine visuelle Signatur, die in der PDF platziert wird. Für rechtlich bindende digitale Signaturen verwenden Sie zertifizierte Digital-Signatur-Lösungen." },
      { question: "Kann ich mehrere Dokumente gleichzeitig signieren?", answer: "Sie können ein Dokument nach dem anderen signieren. Nach dem Signieren können Sie zusätzliche Dokumente mit derselben Signatur verarbeiten." },
      { question: "Werden meine Signaturdaten gespeichert oder geteilt?", answer: "Nein. Ihre Signatur wird nur zum Signieren der PDF verwendet, die Sie verarbeiten. Sie wird nie gespeichert oder an einen Server gesendet." },
    ],
  },
  translate: {
    howTo: {
      title: "Eine PDF übersetzen",
      steps: [
        "Laden Sie Ihr PDF-Dokument hoch.",
        "Wählen Sie Quellsprache und Zielsprache.",
        "Wählen Sie das Ausgabeformat: übersetzte PDF oder nebeneinander-Ansicht.",
        "Klicken Sie auf \"Übersetzen\", um zu verarbeiten und Ergebnisse herunterzuladen.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Übersetzen Sie PDF-Inhalte in über 100 Sprachen",
        "Bewahren Sie Original-Formatierung und Layout",
        "Unterstützung für Text- und bildbasierte PDFs",
        "KI-gestützte Übersetzung für natürliche Ergebnisse",
        "Stapelübersetzung mehrerer Dokumente",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "OCR-Vorverarbeitung verbessert die Übersetzungsgenauigkeit für gescannte PDFs",
        "Technische Dokumente können manuelle Überprüfung auf Genauigkeit benötigen",
        "Verwenden Sie nebeneinander-Ansicht zum Vergleich des Originals und der Übersetzung",
      ],
    },
    faq: [
      { question: "Wie genau ist die KI-Übersetzung?", answer: "Die Übersetzungsgenauigkeit ist hoch für allgemeine Inhalte, aber technische, medizinische oder rechtliche Dokumente sollten von einem professionellen Übersetzer überprüft werden." },
      { question: "Bleibt die Formatierung und das Layout nach der Übersetzung erhalten?", answer: "Ja. Das Werkzeug bewahrt das ursprüngliche Layout, Schriftarten und die Formatierung, während der Textinhalt übersetzt wird." },
      { question: "Bleibt mein PDF-Dokument während der Übersetzung privat?", answer: "Ja. Alle Übersetzungen finden lokal in Ihrem Browser statt, ohne dass ein Upload an einen externen Server erfolgt." },
    ],
  },
  unlock: {
    howTo: {
      title: "Eine PDF entsperren",
      steps: [
        "Laden Sie Ihre passwortgeschützte PDF-Datei hoch.",
        "Geben Sie das Benutzerpasswort ein, wenn die Datei passwortgeschützt ist.",
        "Das Werkzeug entfernt Beschränkungen automatisch.",
        "Laden Sie Ihre entsperrte PDF herunter.",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Entfernen Sie Passwortschutz aus PDFs",
        "Deaktivieren Sie Druck-, Kopier- und Bearbeitungsbeschränkungen",
        "Unterstützung für Benutzer- und Eigentümer-Passwörter",
        "Entsperren Sie mehrere geschützte PDFs stapelweise",
        "Kein Datenverlust während des Entsperrungs-Vorgangs",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Das Entsperren erfordert das korrekte Passwort, falls eines gesetzt ist",
        "Verwenden Sie nur für Dateien, die Sie besitzen oder die Berechtigung zur Änderung haben",
        "Entsperrte PDFs können mit anderen Werkzeugen bearbeitet werden",
      ],
    },
    faq: [
      { question: "Ist es legal, passwortgeschützte PDFs zu entsperren?", answer: "Ja, wenn Sie das Dokument besitzen oder die Berechtigung des Eigentümers haben. Respektieren Sie Urheberrechte und Nutzungseinschränkungen." },
      { question: "Kann ich eine PDF entsperren, wenn ich das Passwort nicht habe?", answer: "Nein. Wenn ein Passwort gesetzt ist, müssen Sie das korrekte Passwort eingeben. Dies schützt die Dokumentensicherheit." },
      { question: "Entfernt das Entsperren Kopier- und Druckbeschränkungen?", answer: "Ja. Das Entsperren entfernt die meisten Berechtigungsbeschränkungen und ermöglicht Kopieren, Drucken und Bearbeitung." },
    ],
  },
};
