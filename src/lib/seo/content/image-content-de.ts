import type { ToolContentMap } from "../tool-content-types";

export const imageContentDe: ToolContentMap = {
  resize: {
    howTo: {
      title: "Ein Bild vergrößern oder verkleinern",
      steps: [
        "Klicken Sie auf die Upload-Schaltfläche oder ziehen Sie Ihr Bild in die Leinwand",
        "Wählen Sie Ihre gewünschten Dimensionen oder wählen Sie eine Voreinstellung",
        "Sehen Sie das vergrößerte oder verkleinerte Ergebnis in Echtzeit",
        "Laden Sie Ihr Bild im gewünschten Format herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Unterstützung für mehrere Dateiformate (JPG, PNG, WebP, GIF)",
        "Seitenverhältnis beibehalten oder Dimensionen frei anpassen",
        "Stapelverarbeitung mehrerer Bilder auf einmal",
        "Keine Dateigröße-Grenzen – vollständige Client-seitige Verarbeitung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Wählen Sie gängige Größen wie 800x600 für Web oder 1920x1080 für Drucke",
        "Verwenden Sie prozentuale Skalierung, um das Seitenverhältnis beim Vergrößern/Verkleinern zu beibehalten",
        "Schauen Sie sich das Ergebnis vor dem Download an, um Qualität und Dimensionen sicherzustellen",
      ],
    },
    faq: [
      { question: "Verringert Vergrößern/Verkleinern die Bildqualität?", answer: "Verkleinern erhält die Qualität gut. Vergrößern über die ursprüngliche Auflösung hinaus kann etwas Unschärfe verursachen, aber ToolPop verwendet optimierte Algorithmen, um Qualitätsverluste zu minimieren." },
      { question: "Welche Bildformate kann ich vergrößern/verkleinern?", answer: "Sie können JPG, PNG, WebP, GIF, BMP, TIFF und HEIC-Bilder vergrößern/verkleinern. Das Ausgabeformat passt zu Ihrer Eingabe." },
      { question: "Wird mein Bild auf einen Server hochgeladen?", answer: "Nein. Alle Vorgänge erfolgen lokal in Ihrem Browser. Ihre Bilder verlassen Ihr Gerät niemals." },
    ],
  },
  crop: {
    howTo: {
      title: "Ein Bild zuschneiden",
      steps: [
        "Laden Sie Ihr Bild durch Auswahl einer Datei oder Ziehen hoch",
        "Verwenden Sie das Zuschneid-Werkzeug, um den Bereich auszuwählen, den Sie behalten möchten",
        "Passen Sie das Zuschneide-Rechteck an, indem Sie an Ecken oder Kanten ziehen",
        "Laden Sie Ihr zugeschnittenes Bild herunter, wenn Sie zufrieden sind",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Freiformzuschnitt und Zuschnitt mit festem Seitenverhältnis",
        "Echtzeit-Vorschau des zugeschnittenen Bereichs",
        "Unterstützung für häufige Seitenverhältnisse (16:9, 4:3, 1:1)",
        "Rückgängig und Zurücksetzen-Funktionalität",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie festgelegte Verhältnisse, um Konsistenz für Social-Media-Beiträge zu wahren",
        "Positionieren Sie wichtige Motive an Schnittpunkten für bessere Komposition",
        "Speichern Sie die Original-Datei vor dem Zuschneiden, falls Sie diese später benötigen",
      ],
    },
    faq: [
      { question: "Kann ich mit einem bestimmten Seitenverhältnis zuschneiden?", answer: "Ja! Sie können aus Voreinstellungen wie 16:9, 4:3 oder 1:1 wählen oder frei zuschneiden ohne Einschränkungen." },
      { question: "Ändert das Zuschneiden die Dateigröße?", answer: "Ja, das Entfernen von Bildteilen reduziert typischerweise die Dateigröße, und Sie können beim Speichern Komprimierung anpassen." },
      { question: "Werden meine Arbeiten im Browser gespeichert?", answer: "Nein, das Zuschneiden erfolgt vollständig in Ihrem Browser in Echtzeit. Ihr Originalbild wird niemals hochgeladen oder auf einem Server gespeichert." },
    ],
  },
  rotate: {
    howTo: {
      title: "Ein Bild drehen",
      steps: [
        "Laden Sie Ihr Bild in das Tool hoch",
        "Wählen Sie eine Voreinstellung-Drehung (90°, 180°, 270°) oder geben Sie einen benutzerdefinierten Winkel ein",
        "Sehen Sie das gedrehte Ergebnis sofort",
        "Laden Sie Ihr gedrehtes Bild herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Mit einem Klick um 90°, 180° oder 270° drehen",
        "Benutzerdefinierte Winkel-Drehung für präzise Anpassungen",
        "Auto-Zuschnitt-Option, um leere Kanten zu entfernen",
        "Erhält Bildqualität und Metadaten",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie 90°-Drehung zum Beheben von Hochformat/Querformat-Ausrichtungsproblemen",
        "Benutzerdefinierte Winkel funktionieren hervorragend für leicht gekippte Fotos aus alten Scans",
        "Aktivieren Sie Auto-Zuschnitt, um weiße Ränder nach Drehung zu entfernen",
      ],
    },
    faq: [
      { question: "Kann ich um jeden beliebigen Winkel drehen?", answer: "Ja, Sie können um Voreinstellungs-Winkel (90°, 180°, 270°) drehen oder einen beliebigen benutzerdefinierten Winkel für präzises Kippen eingeben." },
      { question: "Was passiert mit dem leeren Platz nach dem Drehen?", answer: "Aktivieren Sie die Auto-Zuschnitt-Funktion, um automatisch leere weiße Ränder zu entfernen, die nach Drehung entstehen." },
      { question: "Verringert sich die Bildqualität nach dem Drehen?", answer: "Nein. Drehung ist eine verlustfreie Operation, die Ihre Bildqualität nicht beeinträchtigt." },
    ],
  },
  flip: {
    howTo: {
      title: "Ein Bild spiegeln",
      steps: [
        "Laden Sie Ihr Bild in den Editor hoch oder ziehen Sie es hinein",
        "Wählen Sie, ob horizontal oder vertikal gespiegelt werden soll",
        "Sehen Sie das gespiegelte Ergebnis sofort in der Vorschau",
        "Speichern und laden Sie Ihr gespiegeltes Bild herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Horizontales Spiegeln (Spiegeleffekt)",
        "Vertikales Spiegeln (Kopfüber)",
        "Beide Spiegelungen kombinieren für 180°-Drehung",
        "Funktioniert mit allen Bildformaten",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Horizontal-Spiegeln ist nützlich zum Erstellen von Spiegelbildern oder Beheben von umgekehrtem Text",
        "Vertikal-Spiegeln hilft beim Beheben von kopfüber-Fotos",
        "Verwenden Sie Spiegelung, um symmetrische Designs oder Muster zu erstellen",
      ],
    },
    faq: [
      { question: "Was ist der Unterschied zwischen Spiegeln und Drehen?", answer: "Spiegeln erzeugt einen Spiegel- oder kopfüber-Effekt, während Drehen das Bild um einen Winkel dreht. Kombinieren Sie beide Spiegelungen für denselben Effekt wie 180°-Drehung." },
      { question: "Kann ich mehrmals spiegeln?", answer: "Ja. Sie können horizontal und vertikal in beliebiger Kombination spiegeln. Zweimaliges Spiegeln in die gleiche Richtung stellt das Bild in seinen Original-Zustand zurück." },
      { question: "Speichern Sie meine gespiegelten Bilder?", answer: "Niemals. Alle Spiegelungen erfolgen sofort in Ihrem Browser, und keine Bilder werden an unsere Server gesendet." },
    ],
  },
  "photo-editor": {
    howTo: {
      title: "Fotos bearbeiten",
      steps: [
        "Laden Sie Ihr Foto in den Editor hoch",
        "Passen Sie Helligkeit, Kontrast, Sättigung und andere Einstellungen an",
        "Wenden Sie Filter an oder nehmen Sie feinabstimmungen an einzelnen Farbkanälen vor",
        "Exportieren Sie Ihr bearbeitetes Foto in Ihrem bevorzugten Format",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Umfangreiche Bearbeitungswerkzeuge: Helligkeit, Kontrast, Sättigung, Farbton",
        "Professionelle Filter und Voreinstellungen für schnelle Verbesserung",
        "Farbausgleich und Temperaturanpassungen",
        "Vorher/Nachher-Vergleichsansicht",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Beginnen Sie mit kleinen Anpassungen und bauen Sie auf, um Überbearbeitung zu vermeiden",
        "Verwenden Sie Farbtemperatur, um Weißabgleich in Fotos zu korrigieren",
        "Wenden Sie Filter als Ausgangspunkt an, verfeinern Sie dann einzelne Einstellungen",
      ],
    },
    faq: [
      { question: "Kann ich Bearbeitungen während der Arbeit rückgängig machen?", answer: "Ja. Sie können Änderungen Schritt für Schritt rückgängig machen / wiederherstellen oder das Bild komplett zurücksetzen." },
      { question: "Wie vergleiche ich meine Original- und bearbeiteten Versionen?", answer: "Verwenden Sie die Vorher/Nachher-Vergleichsansicht, um Änderungen nebeneinander zu sehen und zu entscheiden, ob die Bearbeitungen gut aussehen." },
      { question: "Werden meine Fotos nach der Bearbeitung gespeichert?", answer: "Nein. Alle Bearbeitungen erfolgen lokal in Ihrem Browser mit sofortigen Vorschauansichten. Ihre Fotos werden niemals an einen Server gesendet." },
    ],
  },
  "jpg-to-png": {
    howTo: {
      title: "JPG zu PNG konvertieren",
      steps: [
        "Laden Sie Ihr JPG-Bild in den Konverter hoch",
        "Die Konvertierung erfolgt automatisch in Sekunden",
        "Schauen Sie sich das konvertierte PNG-Bild in der Vorschau an",
        "Klicken Sie auf Download, um Ihre PNG-Datei zu speichern",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Verlustfreie Konvertierung mit Beibehaltung der Bildqualität",
        "Unterstützung für transparente Hintergründe im PNG-Format",
        "Sofortige Konvertierung ohne Qualitätsverlust",
        "Alle Dateien verbleiben auf Ihrem Gerät für Datenschutz",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "PNG-Dateien sind größer, aber erhalten Qualität – ideal für Grafiken und Logos",
        "Verwenden Sie PNG für Bilder, die Transparenz benötigen",
        "JPG-Dateien sind besser für Fotografien, wenn Dateigröße wichtig ist",
      ],
    },
    faq: [
      { question: "Wird das konvertierte PNG die gleiche Qualität wie das JPG haben?", answer: "Ja. JPG zu PNG ist eine verlustfreie Konvertierung, die die ursprüngliche Qualität ohne Beeinträchtigung behält." },
      { question: "Warum würde ich JPG zu PNG konvertieren?", answer: "PNG unterstützt Transparenz und ist besser für Grafiken, Logos und Icons. JPG ist besser für Fotos, wenn Dateigröße wichtig ist." },
      { question: "Ist die Konvertierung privat?", answer: "Vollständig. Ihr JPG wird lokal in Ihrem Browser konvertiert und wird niemals auf unsere Server hochgeladen." },
    ],
  },
  "png-to-jpg": {
    howTo: {
      title: "PNG zu JPG konvertieren",
      steps: [
        "Wählen Sie Ihr PNG-Bild aus und laden Sie es hoch",
        "Stellen Sie das Konvertierungs-Qualitätsniveau nach Bedarf ein",
        "Schauen Sie sich das konvertierte JPG-Bild in der Vorschau an",
        "Laden Sie Ihre JPG-Datei herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie PNG-Bilder zu JPG mit einstellbarer Qualität",
        "Einstellbare Komprimierungseinstellungen zur Abwägung von Qualität und Dateigröße",
        "Weißer Hintergrund wird automatisch für Transparenz hinzugefügt",
        "Unterstützung für Stapelkonvertierung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "JPG-Format ist ideal für Fotografien und reduziert Dateigröße erheblich",
        "Stellen Sie Qualität auf 85-90% für bestes Gleichgewicht zwischen Qualität und Dateigröße ein",
        "Verwenden Sie JPG für Web-Bilder, um Seiten-Ladegeschwindigkeit zu verbessern",
      ],
    },
    faq: [
      { question: "Was passiert mit transparenten Bereichen beim Konvertieren von PNG zu JPG?", answer: "Transparente Bereiche werden mit weißem Hintergrund gefüllt, da JPG Transparenz nicht unterstützt." },
      { question: "Um wie viel wird meine Datei nach der Konvertierung kleiner?", answer: "JPG-Komprimierung kann Dateigröße um 50-80% im Vergleich zu PNG reduzieren, abhängig vom Bild und Qualitätseinstellungen." },
      { question: "Kann ich die Qualität der JPG-Konvertierung ändern?", answer: "Ja. Sie können das Qualitätsniveau vor der Konvertierung anpassen, um Dateigröße und Bildqualität abzuwägen." },
    ],
  },
  "webp-to-jpg": {
    howTo: {
      title: "WebP zu JPG konvertieren",
      steps: [
        "Laden Sie Ihr WebP-Bild hoch",
        "Wählen Sie Qualitätseinstellungen",
        "Schauen Sie sich das Ergebnis in der Vorschau an",
        "Laden Sie die JPG-Datei herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie WebP zu JPG mit hoher Qualität",
        "Unterstützung für große Bilder",
        "Schnelle Verarbeitung im Browser",
        "Kontrollierbare Qualitätseinstellungen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "WebP ist moderner und komprimierter als JPG",
        "JPG ist universeller kompatibel",
        "Wählen Sie Qualität basierend auf Verwendungszweck",
      ],
    },
    faq: [
      { question: "Was ist WebP?", answer: "WebP ist ein modernes Bildformat von Google mit besserer Komprimierung als JPEG." },
      { question: "Verliert die Konvertierung Qualität?", answer: "Minimal, wenn Sie hohe Qualität wählen." },
      { question: "Ist JPG wirklich universeller?", answer: "Ja. Ältere Systeme unterstützen JPG besser als WebP." },
    ],
  },
  "webp-to-png": {
    howTo: {
      title: "WebP zu PNG konvertieren",
      steps: [
        "Laden Sie Ihr WebP-Bild hoch",
        "Das Tool konvertiert automatisch",
        "Schauen Sie sich das Ergebnis an",
        "Laden Sie die PNG-Datei herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Verlustfreie WebP zu PNG Konvertierung",
        "Transparenz wird erhalten",
        "Hohe Qualität",
        "Schnell und einfach",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "PNG mit Transparenz für Web-Grafiken verwenden",
        "Perfekt für Icons und Logos",
        "Größer als WebP, aber universeller kompatibel",
      ],
    },
    faq: [
      { question: "Wird Transparenz beibehalten?", answer: "Ja. Transparenz wird vollständig bewahrt." },
      { question: "Ist PNG wirklich besser?", answer: "Für Transparenz und universelle Kompatibilität ja." },
      { question: "Wie groß wird die Datei?", answer: "PNG ist größer als WebP, aber kleiner als unkomprimierte Bilder." },
    ],
  },
  "jpg-to-webp": {
    howTo: {
      title: "JPG zu WebP konvertieren",
      steps: [
        "Laden Sie Ihr JPG-Bild hoch",
        "Stellen Sie die Qualität ein",
        "Schauen Sie sich die Vorschau an",
        "Laden Sie die WebP-Datei herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie JPG zu WebP für bessere Komprimierung",
        "Hochwertige Ergebnisse",
        "Deutlich kleinere Dateien",
        "Modern und Web-optimiert",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "WebP ist ideal für Web-Bilder",
        "Deutlich kleiner als JPG bei gleicher Qualität",
        "Überprüfen Sie Browser-Kompatibilität für Zielgruppe",
      ],
    },
    faq: [
      { question: "Wie viel Platz kann ich sparen?", answer: "WebP kann 20-40% kleiner als JPG bei gleichbleibender Qualität sein." },
      { question: "Unterstützen alle Browser WebP?", answer: "Die meisten modernen Browser ja, aber ältere Systeme möglicherweise nicht." },
      { question: "Ist WebP besser als JPG?", answer: "Technisch ja für Komprimierung, aber JPG ist universeller kompatibel." },
    ],
  },
  "png-to-webp": {
    howTo: {
      title: "PNG zu WebP konvertieren",
      steps: [
        "Laden Sie Ihr PNG-Bild hoch",
        "Konfigurieren Sie Qualitätsoptionen",
        "Schauen Sie sich die Vorschau an",
        "Laden Sie die WebP-Datei herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "PNG zu WebP mit Transparenzbeibehalten",
        "Deutliche Größenreduktion",
        "Hochwertige Ergebnisse",
        "Perfekt für Web-Bilder",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "WebP unterstützt auch Transparenz",
        "Ideal für moderne Webseiten",
        "Deutlich effizienter als PNG",
      ],
    },
    faq: [
      { question: "Wird Transparenz beibehalten?", answer: "Ja. WebP unterstützt Transparenz wie PNG." },
      { question: "Wie viel Platz wird gespart?", answer: "WebP ist normalerweise 25-35% kleiner als PNG." },
      { question: "Ist WebP modern genug?", answer: "Ja, wird von den meisten modernen Browsern unterstützt." },
    ],
  },
  "jpg-to-svg": {
    howTo: {
      title: "JPG zu SVG konvertieren",
      steps: [
        "Laden Sie Ihr JPG-Bild hoch",
        "Das Tool vectorisiert automatisch das Bild",
        "Passen Sie die Genauigkeit an (mehr Details = größere Datei)",
        "Laden Sie die SVG-Datei herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie Raster-Bilder zu Vektor-Format",
        "Skaliert auf jede Größe ohne Qualitätsverlust",
        "Editierbar in Vektor-Editoren",
        "Deutlich kleinere Dateigröße",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Am besten für einfache Grafiken und Logos",
        "Komplexe Fotos werden zu komplexen SVGs",
        "Verwenden Sie höhere Genauigkeit für Detailinformationen",
      ],
    },
    faq: [
      { question: "Was ist SVG?", answer: "Scalable Vector Graphics – ein Vektor-Format, das ohne Qualitätsverlust skaliert werden kann." },
      { question: "Funktioniert dies mit Fotos?", answer: "Technisch ja, aber das Ergebnis ist besser bei einfachen Grafiken." },
      { question: "Kann ich das SVG bearbeiten?", answer: "Ja. SVG ist Basis-Text-Format und editierbar in Vektor-Editoren." },
    ],
  },
  "png-to-svg": {
    howTo: {
      title: "PNG zu SVG konvertieren",
      steps: [
        "Laden Sie Ihr PNG-Bild hoch",
        "Das Tool vectorisiert automatisch",
        "Wählen Sie Genauigkeits-Einstellungen",
        "Laden Sie das SVG herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Hochqualitative PNG zu SVG Vectorisierung",
        "Transparenzbereiche werden zu Vektoren konvertiert",
        "Skalierbar auf jede Größe",
        "Perfekt für Icons und Logos",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "PNG mit transparentem Hintergrund funktioniert besser",
        "Saubere, einfache Designs geben beste Ergebnisse",
        "Hochauflösungs-PNG vor Konvertierung verwenden",
      ],
    },
    faq: [
      { question: "Wird Transparenz erhalten?", answer: "Ja. Transparente Bereiche werden zu editierbaren Vektoren." },
      { question: "Wie gut ist die Konvertierungsqualität?", answer: "Ausgezeichnet für Grafiken und Logos, weniger gut für Fotos." },
      { question: "Kann ich das SVG in meinem Vektor-Editor bearbeiten?", answer: "Ja. Das SVG ist vollständig editierbar in Adobe Illustrator, Inkscape, etc." },
    ],
  },
  "add-text": {
    howTo: {
      title: "Text zu Bild hinzufügen",
      steps: [
        "Laden Sie Ihr Bild hoch",
        "Klicken Sie auf die Stelle, wo Sie Text hinzufügen möchten",
        "Geben Sie Ihren Text ein",
        "Passen Sie Schriftart, Größe und Farbe an",
        "Laden Sie das Bild mit Text herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Anpassbare Schriftarten und Größen",
        "Farbwahl mit Vorschau",
        "Text-Schatten und Effekte",
        "Positionierbar überall auf dem Bild",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie kontrastreich Farben für Lesbarkeit",
        "Nicht zu viel Text pro Bild",
        "Schatten machen Text auf komplexen Hintergründen lesbarer",
      ],
    },
    faq: [
      { question: "Kann ich mehrere Text-Blöcke hinzufügen?", answer: "Ja. Klicken Sie mehrmals, um mehreren Text hinzuzufügen." },
      { question: "Welche Schriftarten sind verfügbar?", answer: "Viele Standard-Schriftarten plus Web-Schriftarten." },
      { question: "Kann ich Text-Größe anpassen?", answer: "Ja. Größe ist vollständig anpassbar." },
    ],
  },
  "add-border": {
    howTo: {
      title: "Einen Rahmen zu Bild hinzufügen",
      steps: [
        "Laden Sie Ihr Bild hoch",
        "Wählen Sie Rahmenstil, Farbe und Breite",
        "Shauen Sie sich die Vorschau an",
        "Laden Sie das Bild mit Rahmen herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Viele Rahmen-Stile zur Auswahl",
        "Anpassbare Rahmen-Breite",
        "Benutzerdefinierte Farben",
        "Sofort-Vorschau",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Dünne Rahmen für moderne Looks",
        "Dicke Rahmen für klassische oder künstlerische Looks",
        "Wählen Sie Farben, die zum Bild passen",
      ],
    },
    faq: [
      { question: "Kann ich den Rahmen-Stil ändern?", answer: "Ja. Mehrere Stile sind verfügbar." },
      { question: "Wie dick kann der Rahmen sein?", answer: "Sie können die Breite in Pixeln anpassen." },
      { question: "Kann ich mehrfache Rahmen haben?", answer: "Nein, aber Sie können dicke Rahmen erstellen." },
    ],
  },
  "color-palette": {
    howTo: {
      title: "Eine Farbpalette aus Bild generieren",
      steps: [
        "Laden Sie Ihr Bild hoch",
        "Das Tool extrahiert automatisch die dominanten Farben",
        "Schauen Sie sich die generierte Palette an",
        "Laden Sie die Palette herunter oder kopieren Sie Hex-Codes",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Automatische dominante Farben-Erkennung",
        "Hex-Codes für einfache Verwendung in Design",
        "RGB und HSL Werte",
        "Sortierbar nach Häufigkeit oder Helligkei",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Perfekt für Design-Konsistenz",
        "Verwenden Sie Farben zur Website-Gestaltung",
        "Aktualisieren Sie Brand-Farben basierend auf Bildern",
      ],
    },
    faq: [
      { question: "Wie viele Farben werden extrahiert?", answer: "Normalerweise 5-10 dominante Farben." },
      { question: "Kann ich die Anzahl der Farben ändern?", answer: "Einige Tools ermöglichen dies, überprüfen Sie die Optionen." },
      { question: "Sind die Hex-Codes exakt?", answer: "Ja. Sie können sie direkt in CSS verwenden." },
    ],
  },
  "color-replace": {
    howTo: {
      title: "Farbe im Bild ersetzen",
      steps: [
        "Laden Sie Ihr Bild hoch",
        "Wählen Sie die Farbe aus, die Sie ersetzen möchten",
        "Wählen Sie die neue Farbe",
        "Passen Sie die Toleranz an für Farb-Ähnlichkeit",
        "Laden Sie das bearbeitete Bild herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Intelligente Farb-Matching-Algorithmen",
        "Einstellbare Toleranz für Farb-Bereich",
        "Vorschau der Änderungen",
        "Unterstützung für alle Farben",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Zu niedrige Toleranz ersetzt nur exakte Farben",
        "Zu hohe Toleranz kann unerwünschte Bereiche ersetzen",
        "Testen Sie mit Vorschau vor dem Download",
      ],
    },
    faq: [
      { question: "Kann ich mehrere Farben gleichzeitig ersetzen?", answer: "Normalerweise eine nach der anderen, aber Sie können mehrmals hochladen." },
      { question: "Funktioniert dies mit komplizierten Farbverläufen?", answer: "Besser für solide Farben. Farbverläufe erfordern möglicherweise manuelle Anpassungen." },
      { question: "Ist das Original-Bild sicher?", answer: "Ja. Es wird lokal bearbeitet, Original bleibt unverändert." },
    ],
  },
  "bmp-to-jpg": {
    howTo: {
      title: "BMP zu JPG konvertieren",
      steps: [
        "Laden Sie Ihr BMP-Bild hoch",
        "Die Konvertierung erfolgt automatisch",
        "Schauen Sie sich die Vorschau an",
        "Laden Sie die JPG-Datei herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie alte BMP-Dateien zu modernem JPG",
        "Hochwertige Konvertierung",
        "Dateigröße wird deutlich reduziert",
        "Schnelle Verarbeitung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "BMP ist ein sehr altes Format",
        "JPG ist deutlich effizienter",
        "Ideal für Legacy-Bilder",
      ],
    },
    faq: [
      { question: "Was ist BMP?", answer: "Bitmap Format – eines der ältesten Raster-Bildformate ohne Komprimierung." },
      { question: "Warum zu JPG konvertieren?", answer: "JPG ist moderner, komprimierter und universell kompatibel." },
      { question: "Verliert das Bild Qualität?", answer: "Minimal, wenn Sie hohe Qualität bei JPG wählen." },
    ],
  },
  "bmp-to-png": {
    howTo: {
      title: "BMP zu PNG konvertieren",
      steps: [
        "Laden Sie Ihr BMP-Bild hoch",
        "Das Tool konvertiert automatisch",
        "Schauen Sie sich die Vorschau an",
        "Laden Sie die PNG-Datei herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "BMP zu PNG verlustfreie Konvertierung",
        "Erhält ursprüngliche Qualität",
        "PNG unterstützt Transparenz",
        "Verbesserte Komprimierung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "PNG ist besser für Grafiken als BMP",
        "Transparenz wird unterstützt",
        "Hochwertige Bilder",
      ],
    },
    faq: [
      { question: "Ist PNG besser als BMP?", answer: "Ja. PNG ist moderner, komprimiert und unterstützt mehr Funktionen." },
      { question: "Wird Qualität beibehalten?", answer: "Ja, verlustfreie Konvertierung." },
      { question: "Wie groß wird die PNG-Datei?", answer: "Kleiner als BMP, größer als JPG." },
    ],
  },
  "gif-to-jpg": {
    howTo: {
      title: "GIF zu JPG konvertieren",
      steps: [
        "Laden Sie Ihr GIF-Bild hoch",
        "Bei animierten GIFs: wählen Sie einen Frame oder ein Vorschaubild",
        "Das Tool konvertiert zu JPG",
        "Laden Sie die JPG-Datei herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie statische und animierte GIFs zu JPG",
        "Wählen Sie einen Frame bei animierten GIFs",
        "Hochwertige Konvertierung",
        "Dateigrößen-Reduktion",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Animierte GIFs werden zu statischem Bild",
        "JPG ist ideal für Fotos",
        "Wählen Sie repräsentative Frame bei Animationen",
      ],
    },
    faq: [
      { question: "Was passiert mit Animationen?", answer: "Animationen werden zu einem statischen Bild. Wählen Sie, welchen Frame Sie verwenden möchten." },
      { question: "Wie wähle ich einen Frame?", answer: "Die meisten Konverter zeigen Frames zum Auswählen an." },
      { question: "Ist JPG besser als GIF?", answer: "Für Fotos ja, für animierte Bilder nein." },
    ],
  },
  "gif-to-mp4": {
    howTo: {
      title: "GIF zu MP4 Video konvertieren",
      steps: [
        "Laden Sie Ihre animierte GIF-Datei hoch",
        "Das Tool konvertiert zum MP4-Video-Format",
        "Schauen Sie sich die Vorschau an",
        "Laden Sie die MP4-Datei herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie animierte GIFs zu MP4-Videos",
        "Behalten Sie Animation und Timing bei",
        "Deutlich kleinere Dateigröße als GIF",
        "Besser Browser-Kompatibilität",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "MP4 ist effizienter für Web-Animation",
        "Speichern Sie auf Dateigröße",
        "Perfekt für Social Media",
      ],
    },
    faq: [
      { question: "Warum MP4 statt GIF?", answer: "MP4 ist deutlich kleiner und effizienter für Web-Video." },
      { question: "Kann ich das Video bearbeiten?", answer: "Sie können es in Video-Editoren bearbeiten oder direkt verwenden." },
      { question: "Funktioniert dies mit statischen GIFs?", answer: "Ja, aber Nutzen ist minimal bei einzelnen Frames." },
    ],
  },
  "heic-to-jpg": {
    howTo: {
      title: "HEIC zu JPG konvertieren",
      steps: [
        "Laden Sie Ihr HEIC-Bild hoch",
        "Das Tool konvertiert automatisch",
        "Schauen Sie sich die Vorschau an",
        "Laden Sie die JPG-Datei herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie Apple HEIC zu universelem JPG",
        "Hochwertige Konvertierung",
        "Dateigröße-Reduktion",
        "Schnell und einfach",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "HEIC ist Apple iPhone Standard",
        "JPG ist universell kompatibel",
        "Perfekt zum Teilen von iPhone-Fotos",
      ],
    },
    faq: [
      { question: "Was ist HEIC?", answer: "HEIC ist das High Efficiency Image Container Format von Apple." },
      { question: "Warum zu JPG konvertieren?", answer: "JPG wird von mehr Geräten und Services unterstützt." },
      { question: "Geht Qualität verloren?", answer: "Minimal, wenn Sie hohe Qualität wählen." },
    ],
  },
  "heic-to-png": {
    howTo: {
      title: "HEIC zu PNG konvertieren",
      steps: [
        "Laden Sie Ihr HEIC-Bild hoch",
        "Das Tool konvertiert zu PNG",
        "Schauen Sie sich die Vorschau an",
        "Laden Sie die PNG-Datei herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "HEIC zu PNG verlustfreie Konvertierung",
        "Behalten Sie ursprüngliche Qualität",
        "Transparenzbereiche werden erhalten",
        "Hochwertige Ergebnisse",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "PNG behält Qualität besser",
        "Ideal für Bilder mit Transparenz",
        "Größere Dateien als JPG",
      ],
    },
    faq: [
      { question: "Wann sollte ich PNG statt JPG wählen?", answer: "Wenn das Bild Transparenz hat oder höchste Qualität nötig ist." },
      { question: "Wird Qualität beibehalten?", answer: "Ja, verlustfreie Konvertierung." },
      { question: "Wie groß wird die PNG-Datei?", answer: "Größer als JPG, aber kleiner als BMP." },
    ],
  },
  "tiff-to-jpg": {
    howTo: {
      title: "TIFF zu JPG konvertieren",
      steps: [
        "Laden Sie Ihre TIFF-Datei hoch",
        "Das Tool konvertiert automatisch",
        "Schauen Sie sich die Vorschau an",
        "Laden Sie die JPG-Datei herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie hochwertige TIFF zu JPG",
        "Perfekt für gescannte Dokumente",
        "Dateigröße wird deutlich reduziert",
        "Schnelle Verarbeitung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "TIFF wird oft für gescannte Bilder verwendet",
        "JPG ist komprimierter",
        "Ideal zum Teilen von Scans",
      ],
    },
    faq: [
      { question: "Was ist TIFF?", answer: "Tagged Image File Format – ein Format für hochwertige, oft unkomprimierte Bilder." },
      { question: "Warum zu JPG konvertieren?", answer: "JPG ist komprimierter, effizienter und universell kompatibel." },
      { question: "Verliert das Bild Qualität?", answer: "Minimal bei hoher JPG-Qualität." },
    ],
  },
  "tiff-to-png": {
    howTo: {
      title: "TIFF zu PNG konvertieren",
      steps: [
        "Laden Sie Ihre TIFF-Datei hoch",
        "Das Tool konvertiert zu PNG",
        "Schauen Sie sich die Vorschau an",
        "Laden Sie die PNG-Datei herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "TIFF zu PNG verlustfreie Konvertierung",
        "Erhält ursprüngliche Qualität",
        "Transparenzbereiche unterstützt",
        "Hochwertige Ergebnisse",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "PNG behält hohe Qualität",
        "Transparenz wird unterstützt",
        "Besser für Web-Bilder",
      ],
    },
    faq: [
      { question: "Ist PNG besser als TIFF?", answer: "Für Web-Verwendung ja, TIFF ist für Druck besser." },
      { question: "Wie groß wird die PNG-Datei?", answer: "Kleiner als TIFF, aber größer als JPG." },
      { question: "Wird Qualität beibehalten?", answer: "Ja, verlustfreie Konvertierung." },
    ],
  },
  "eps-to-jpg": {
    howTo: {
      title: "EPS zu JPG konvertieren",
      steps: [
        "Laden Sie Ihre EPS-Datei hoch",
        "Das Tool konvertiert zu JPG",
        "Wählen Sie Auflösung (DPI)",
        "Laden Sie die JPG-Datei herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie Vektor-EPS zu Raster-JPG",
        "Skalieren auf jede Auflösung",
        "Hochwertige Rasterisierung",
        "Dateigrößen-Reduktion",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie hohe DPI für Druckqualität",
        "EPS ist Vektor-Format, JPG ist Raster",
        "Perfekt für Legacy-Dateien",
      ],
    },
    faq: [
      { question: "Was ist EPS?", answer: "Encapsulated PostScript – ein Vektor-Dateiformat für professionelle Grafiken." },
      { question: "Warum zu JPG konvertieren?", answer: "JPG ist universeller kompatibel und einfacher zu nutzen." },
      { question: "Kann ich die Auflösung ändern?", answer: "Ja. Höhere DPI gibt schärfere Ergebnisse." },
    ],
  },
  "eps-to-png": {
    howTo: {
      title: "EPS zu PNG konvertieren",
      steps: [
        "Laden Sie Ihre EPS-Datei hoch",
        "Das Tool rasterisiert zu PNG",
        "Wählen Sie Auflösung und Transparenz",
        "Laden Sie die PNG-Datei herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "EPS Vektor zu PNG Raster",
        "Transparenzbereiche erhalten",
        "Hochwertige Rasterisierung",
        "Editierbar als Bild",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "PNG unterstützt Transparenz",
        "Verwenden Sie hohe Auflösung",
        "Ideal für Web-Grafiken",
      ],
    },
    faq: [
      { question: "Wird Transparenz erhalten?", answer: "Ja. Transparente Bereiche bleiben transparent." },
      { question: "Kann ich zurück zu Vektor konvertieren?", answer: "Nein, Rasterisierung ist einseitig." },
      { question: "Wie hoch sollte die Auflösung sein?", answer: "150+ DPI für Web, 300+ DPI für Druck." },
    ],
  },
  "eps-to-svg": {
    howTo: {
      title: "EPS zu SVG konvertieren",
      steps: [
        "Laden Sie Ihre EPS-Datei hoch",
        "Das Tool konvertiert zu SVG",
        "Schauen Sie sich die Vorschau an",
        "Laden Sie die SVG-Datei herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "EPS zu SVG Vektor-Konvertierung",
        "Behält Vektorisierung",
        "Editierbar in Vektor-Editoren",
        "Skalierbar auf jede Größe",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Beide sind Vektor-Formate",
        "SVG ist Web-optimiert",
        "Perfekt für moderne Web-Design",
      ],
    },
    faq: [
      { question: "Warum EPS zu SVG konvertieren?", answer: "SVG ist moderne Vektor-Format für Web, EPS ist für Print." },
      { question: "Bleibt Vektorisierung erhalten?", answer: "Ja. SVG ist vollständig editierbar." },
      { question: "Funktioniert dies mit komplizierten EPS-Dateien?", answer: "Meistens ja, aber komplexe Effekte könnten verloren gehen." },
    ],
  },
  "psd-to-jpg": {
    howTo: {
      title: "PSD zu JPG konvertieren",
      steps: [
        "Laden Sie Ihre Photoshop PSD-Datei hoch",
        "Das Tool konvertiert zu JPG",
        "Wählen Sie Qualitätseinstellungen",
        "Laden Sie die JPG-Datei herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie PSD zu universelem JPG",
        "Vereinfacht mehrschichtige Designs",
        "Hochwertige Ausgabe",
        "Dateigröße wird deutlich reduziert",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Alle Ebenen werden zu einem Bild kombiniert",
        "Wählen Sie hohe Qualität zum Erhalten von Details",
        "Perfekt zum Teilen von Designs",
      ],
    },
    faq: [
      { question: "Was ist PSD?", answer: "Photoshop Document – Proprietary Dateiformat von Adobe mit Ebenen." },
      { question: "Gehen Ebenen verloren?", answer: "Ja, alle Ebenen werden kombiniert zu einem Bild." },
      { question: "Kann ich in Photoshop bearbeiten?", answer: "Nein, speichern Sie zuerst als PSD, wenn Sie das brauchen." },
    ],
  },
  "psd-to-png": {
    howTo: {
      title: "PSD zu PNG konvertieren",
      steps: [
        "Laden Sie Ihre PSD-Datei hoch",
        "Das Tool konvertiert zu PNG",
        "Schauen Sie sich die Vorschau an",
        "Laden Sie die PNG-Datei herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "PSD zu PNG Konvertierung",
        "Transparenzbereiche bleiben erhalten",
        "Hochwertige Ausgabe",
        "Für Web optimiert",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "PNG behält Transparenz besser",
        "Ideal für Web-Grafiken",
        "Alle Ebenen werden kombiniert",
      ],
    },
    faq: [
      { question: "Wird Transparenz erhalten?", answer: "Ja, falls vorhanden im PSD." },
      { question: "Wie groß wird die PNG-Datei?", answer: "Abhängig vom Bild, aber normalerweise mit Größe vergleichbar." },
      { question: "Kann ich bearbeitbare PSD erhalten?", answer: "Nein, dieser Konverter vereinfacht zu Raster." },
    ],
  },
  "svg-to-jpg": {
    howTo: {
      title: "SVG zu JPG konvertieren",
      steps: [
        "Laden Sie Ihr SVG-Bild hoch",
        "Das Tool rasterisiert SVG",
        "Wählen Sie Auflösung und Qualität",
        "Laden Sie die JPG-Datei herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie Vektor-SVG zu Raster-JPG",
        "Wählen Sie Auflösung für Qualität",
        "Schnelle Rasterisierung",
        "Universell kompatibel",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie hohe Auflösung für schärfere Bilder",
        "JPG ist komprimierter als SVG",
        "Ideal für Social Media",
      ],
    },
    faq: [
      { question: "Was passiert mit Vektoren?", answer: "Sie werden zu Raster-Pixeln konvertiert." },
      { question: "Kann ich zurück zu Vektor gehen?", answer: "Nein, Rasterisierung ist einseitig." },
      { question: "Wie hoch sollte die Auflösung sein?", answer: "100+ DPI für Web, 300+ DPI für Druck." },
    ],
  },
  "svg-to-png": {
    howTo: {
      title: "SVG zu PNG konvertieren",
      steps: [
        "Laden Sie Ihr SVG-Bild hoch",
        "Das Tool konvertiert zu PNG",
        "Wählen Sie Auflösung",
        "Laden Sie die PNG-Datei herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "SVG zu PNG Rasterisierung",
        "Transparenzbereiche erhalten",
        "Hochwertige Ausgabe",
        "Perfekt für Icons",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "PNG mit Transparenz ideal für Icons",
        "Hohe Auflösung für Schärfe",
        "Verwenden Sie für verschiedene Größen",
      ],
    },
    faq: [
      { question: "Wird Transparenz erhalten?", answer: "Ja. Transparente SVG-Bereiche bleiben transparent." },
      { question: "Kann ich mehrere Größen generieren?", answer: "Laden Sie mehrmals mit verschiedenen Auflösungen hoch." },
      { question: "Ist PNG gut für Icons?", answer: "Ja, optimal mit Transparenz." },
    ],
  },
  "image-to-icon": {
    howTo: {
      title: "Bild zu Icon konvertieren",
      steps: [
        "Laden Sie ein Bild hoch",
        "Das Tool erstellt verschiedene Icon-Größen",
        "Wählen Sie gewünschte Größen",
        "Laden Sie Icon-Set herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Erstellen Sie mehrere Icon-Größen automatisch",
        "Unterstützt .ico, PNG, SVG Formate",
        "Transparenz-Hintergrund",
        "Perfekt für Favicons und App-Icons",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie quadratische Bilder",
        "Einfache Designs funktionieren besser",
        "Testen Sie verschiedene Größen",
      ],
    },
    faq: [
      { question: "Welche Größen werden generiert?", answer: "Standard sind 16x16, 32x32, 64x64, 128x128, 256x256px." },
      { question: "Was ist .ico Format?", answer: "Icon Format speziell für Favicons und Windows Icons." },
      { question: "Kann ich benutzerdefinierte Größen erstellen?", answer: "Einige Tools ermöglichen dies, überprüfen Sie Optionen." },
    ],
  },
  "image-to-text": {
    howTo: {
      title: "Text aus Bild extrahieren (OCR)",
      steps: [
        "Laden Sie ein Bild mit Text hoch",
        "Das Tool erkennt Text automatisch",
        "Überprüfen Sie den erkannten Text",
        "Laden Sie als TXT herunter oder kopieren Sie",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Optische Zeichenerkennung (OCR)",
        "Unterstützt mehrere Sprachen",
        "Erkennt handschriftlichen und gedruckten Text",
        "Bearbeitbarer Text-Output",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Hochauflösungs-Bilder geben bessere Ergebnisse",
        "Klare, lesbare Schriften funktionieren besser",
        "Überprüfen Sie Text auf Fehler nach OCR",
      ],
    },
    faq: [
      { question: "Wie genau ist OCR?", answer: "Modern-OCR ist 95%+ genau, Fehler möglich." },
      { question: "Welche Sprachen werden unterstützt?", answer: "Englisch, Deutsch, Französisch, Spanisch und mehr." },
      { question: "Funktioniert dies mit handgeschriebenem Text?", answer: "Ja, aber weniger zuverlässig als gedruckter Text." },
    ],
  },
  "profile-photo": {
    howTo: {
      title: "Profilfoto zuschneiden und optimieren",
      steps: [
        "Laden Sie Ihr Foto hoch",
        "Das Tool zuschneidet automatisch Gesicht",
        "Passen Sie Zuschnitt bei Bedarf an",
        "Laden Sie optimiertes Profilfoto herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Automatische Gesichts-Erkennung",
        "Optimaler Zuschnitt für Profile",
        "Hintergrund-Entfernung Option",
        "Mehrere Output-Größen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Gutes Licht für beste Ergebnisse",
        "Zentrieren Sie Ihr Gesicht",
        "Verwenden Sie Quadrat-Format",
      ],
    },
    faq: [
      { question: "Kann das Tool das Hintergrund entfernen?", answer: "Einige Versionen unterstützen dies, überprüfen Sie Optionen." },
      { question: "Funktioniert es mit mehreren Personen?", answer: "Besser mit einer Hauptperson, kann unsicher sein mit mehreren." },
      { question: "Welche Output-Größen sind möglich?", answer: "Standard sind 200x200, 400x400px für verschiedene Plattformen." },
    ],
  },
  "round-image": {
    howTo: {
      title: "Bild-Ecken abrunden",
      steps: [
        "Laden Sie Ihr Bild hoch",
        "Wählen Sie Eckenradius (wie rund)",
        "Schauen Sie sich die Vorschau an",
        "Laden Sie das Bild mit runden Ecken herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Einstellbare Eckenradius",
        "Transparenzbereiche erhalten",
        "Mehrere Eckenarten möglich",
        "Schnelle Verarbeitung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Kleine Radius für subtile Effekt",
        "Größere Radius für Kreis-Effekt",
        "Nutzen Sie für moderne Web-Designs",
      ],
    },
    faq: [
      { question: "Kann ich sehr runde Ecken (fast Kreis) machen?", answer: "Ja. Je höher Radius, desto runder." },
      { question: "Was wird mit Ecken-Bereichen?", answer: "Sie werden transparent (bei PNG) oder mit Farbe gefüllt." },
      { question: "Funktioniert dies mit allen Bildformaten?", answer: "Ja, aber PNG behält Transparenz besser." },
    ],
  },
  "split-image": {
    howTo: {
      title: "Bild in mehrere Teile aufteilen",
      steps: [
        "Laden Sie Ihr Bild hoch",
        "Wählen Sie Anzahl der Teile (Raster)",
        "Das Tool teilt automatisch auf",
        "Laden Sie Teile einzeln oder als ZIP herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Teilen Sie Bilder in 2x2, 3x3, 4x4 Raster",
        "Benutzerdefinierte Raster möglich",
        "Einzeln oder als ZIP herunterladen",
        "Behalten Sie Original-Qualität",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Perfekt für Social-Media-Collage",
        "Teilen Sie für Carousel-Posts",
        "Erstellen Sie Puzzle-Effekte",
      ],
    },
    faq: [
      { question: "Wofür ist Bild-Splitting?", answer: "Vor allem für Social-Media-Carousel-Posts, die mehrere Teile zeigen." },
      { question: "Kann ich mit Überlappung teilen?", answer: "Standard-Raster überlappen nicht, benutzerdefinierte können." },
      { question: "Wie groß werden die Teile?", answer: "Gleichmäßig basierend auf Raster-Aufteilung." },
    ],
  },
  "qr-code": {
    howTo: {
      title: "QR-Code generieren",
      steps: [
        "Geben Sie den Inhalt ein (URL, Text, Kontakt, WiFi)",
        "Das Tool generiert QR-Code",
        "Passen Sie Größe und Farbe an",
        "Laden Sie QR-Code herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Erstellen Sie QR-Codes aus URLs, Text, Kontakten",
        "WiFi QR-Codes erstellen",
        "Anpassbare Größe und Farbe",
        "PNG oder SVG Output",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "QR-Codes sind perfekt für Kontakte-Sharing",
        "Verwenden für Event-Registrierung",
        "Testen Sie QR-Codes nach Erstellung",
      ],
    },
    faq: [
      { question: "Wie viel Information kann ein QR-Code enthalten?", answer: "Bis zu ~4.296 Zeichen, aber kurz ist besser." },
      { question: "Kann ich QR-Code mit Logo versehen?", answer: "Ja. Kleine zentrale Logos funktionieren." },
      { question: "Sind diese QR-Codes sicher?", answer: "Ja, lokal generiert ohne externe Dependencies." },
    ],
  },
  "color-blindness-simulator": {
    howTo: {
      title: "Bild mit Farbenblindheit simulieren",
      steps: [
        "Laden Sie Ihr Bild hoch",
        "Wählen Sie Farbenblindheit-Typ (Rot-Grün, Blau-Gelb, etc.)",
        "Das Tool simuliert automatisch",
        "Schauen Sie sich das Ergebnis an",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Simulieren Sie verschiedene Farbenblindheit-Typen",
        "Rot-Grün (häufigste Form)",
        "Blau-Gelb Farbenblindheit",
        "Monochrom (völlige Farbenblindheit)",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Testen Sie Designs für Accessibility",
        "Verwenden Sie kontrast-reiche Farben",
        "Komplementieren Sie Farbe mit Mustern",
      ],
    },
    faq: [
      { question: "Warum Farbenblindheit simulieren?", answer: "Zum Sicherstellen von Design-Accessibility für farbige Menschen." },
      { question: "Wie genau ist diese Simulation?", answer: "Ziemlich genau basierend auf wissenschaftlichen Modellen." },
      { question: "Gibt es mehr Farbenblindheit-Typen?", answer: "Ja, aber diese 4 sind die wichtigsten." },
    ],
  },
  "color-contrast-checker": {
    howTo: {
      title: "Farb-Kontrast-Verhältnis überprüfen",
      steps: [
        "Geben Sie zwei Farben ein (oder laden Sie Bild hoch)",
        "Das Tool berechnet Kontrast-Verhältnis",
        "Überprüfen Sie WCAG-Konformität",
        "Passen Sie Farben an, falls nötig",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Berechnen Sie Farb-Kontrast-Verhältnisse",
        "WCAG AA und AAA Konformität überprüfen",
        "Hex, RGB, HSL Farb-Eingabe",
        "Echtzeitberechnung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Mindestens 4.5:1 Verhältnis für Text",
        "3:1 für große Text",
        "Testen Sie helle und dunkle Hintergründe",
      ],
    },
    faq: [
      { question: "Was ist WCAG?", answer: "Web Content Accessibility Guidelines – Standard für Zugänglichkeit." },
      { question: "Warum ist Kontrast wichtig?", answer: "Für Lesbarkeit, besonders für Menschen mit Sehbehinderungen." },
      { question: "Kann ich Farben automatisch optimieren?", answer: "Einige Tools bieten Farb-Vorschläge, überprüfen Sie." },
    ],
  },
  "color-converter": {
    howTo: {
      title: "Zwischen Farbformaten konvertieren",
      steps: [
        "Geben Sie Farbe in einem Format ein (Hex, RGB, HSL, etc.)",
        "Das Tool konvertiert automatisch",
        "Schauen Sie alle Formate an",
        "Kopieren Sie gewünschtes Format",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen Hex, RGB, HSL, HSV, CMYK",
        "Echtzeitkonvertierung",
        "Ein-klicken Kopieren",
        "Farbvorschau",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Hex für CSS und Web",
        "RGB für Bildschirme",
        "CMYK für Druck",
        "HSL für menschenfreundliches Verständnis",
      ],
    },
    faq: [
      { question: "Was ist der Unterschied zwischen RGB und HSL?", answer: "RGB ist technisch (Rot, Grün, Blau), HSL ist intuitiv (Farbton, Sättigung, Helligkeit)." },
      { question: "Wann verwende ich CMYK?", answer: "Für Druck-Projekte. Bildschirme verwenden RGB." },
      { question: "Ist die Konvertierung genau?", answer: "Ja, mathematisch präzise." },
    ],
  },
  "color-palette-generator": {
    howTo: {
      title: "Farbpalette generieren",
      steps: [
        "Geben Sie eine Basis-Farbe ein",
        "Wählen Sie Harmonie-Typ (Komplementär, Analog, Triadic, etc.)",
        "Das Tool generiert Palette",
        "Laden Sie Palette herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Mehrere Harmonie-Modelle",
        "Komplementär, Analog, Triadic, Tetradic",
        "Pastel und Dunkel-Varianten",
        "Hex-Codes kopierbar",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Komplementär für kontrastreiche Designs",
        "Analog für harmonische Designs",
        "Triadic für lebendige Designs",
      ],
    },
    faq: [
      { question: "Was ist Farb-Harmonie?", answer: "Regeln, wie Farben zusammen auf dem Rad funktionieren." },
      { question: "Welches Modell sollte ich verwenden?", answer: "Abhängig von Effekt: lebendig (Triadic), beruhigend (Analog), kontrastreich (Komplementär)." },
      { question: "Kann ich die generierten Farben ändern?", answer: "Ja, alle Farben sind anpassbar." },
    ],
  },
  grayscale: {
    howTo: {
      title: "Bild in Graustufen konvertieren",
      steps: [
        "Laden Sie Ihr Farbbild hoch",
        "Wählen Sie die Graustufen-Umwandlungsmethode, falls verfügbar",
        "Zeigen Sie das Graustufen-Ergebnis sofort in der Vorschau an",
        "Laden Sie Ihr Graustufen-Bild herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie Farbbilder zu Schwarz-Weiß",
        "Mehrere Graustufen-Umwandlungsalgorithmen für verschiedene Effekte",
        "Passen Sie Helligkeit und Kontrast nach der Umwandlung an",
        "Echtzeit-Vorschau",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Graustufen schaffen ein klassisches, professionelles Aussehen für Fotos",
        "Eignet sich gut für Old-Style-Effekte oder Archivfotos",
        "Passen Sie den Kontrast nach Graustufen für bessere visuelle Wirkung an",
      ],
    },
    faq: [
      {
        question: "Kann ich nach Graustufen zurück zu Farbe konvertieren?",
        answer: "Nein. Die Graustufen-Umwandlung ist nach dem Speichern permanent. Behalten Sie Ihr Originalbild als Backup.",
      },
      {
        question: "Reduziert Graustufen die Dateigröße?",
        answer: "Leicht, da Graustufen-Bilder weniger Farbinformationen als Vollfarb-Bilder haben.",
      },
      {
        question: "Bleibt meine Arbeit während der Umwandlung privat?",
        answer: "Ja. Die Graustufen-Umwandlung erfolgt sofort in Ihrem Browser ohne Server-Beteiligung.",
      },
    ],
  },
  pixelate: {
    howTo: {
      title: "Ein Bild verpixeln",
      steps: [
        "Laden Sie Ihr Bild in das Verpixelungs-Werkzeug hoch",
        "Passen Sie die Pixelgröße oder Unschärfe an",
        "Sehen Sie den Verpixelungseffekt in der Echtzeit-Vorschau",
        "Laden Sie Ihr verpixeltes Bild herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Kontrollieren Sie die Pixelblock-Größe für verschiedene Verpixelungsintensitäten",
        "Wenden Sie Verpixelung auf das gesamte Bild oder ausgewählte Bereiche an",
        "Nützlich für Datenschutz - verschwimmen Sie Gesichter oder sensible Informationen",
        "Echtzeit-Vorschau mit anpassbaren Parametern",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie Verpixelung, um Gesichter in Fotos zum Datenschutz zu anonymisieren",
        "Größere Pixelgrößen erzeugen dramatischere Unschärfe-Effekte",
        "Perfekt zum Zensieren von Text oder sensiblen Details in Screenshots",
      ],
    },
    faq: [
      {
        question: "Kann ich nur einen Bereich des Bildes verpixeln?",
        answer: "Ja. Sie können bestimmte Bereiche verpixeln, während der Rest des Bildes klar bleibt.",
      },
      {
        question: "Wie effektiv ist Verpixelung für den Datenschutz?",
        answer: "Verpixelung ist effektiv zum Verschleiern von Gesichtern und sensiblen Informationen, aber größere Pixelblöcke sind sicherer.",
      },
      {
        question: "Ist der Verpixelungs-Prozess privat?",
        answer: "Ja. Alle Verpixelungen finden lokal in Ihrem Browser statt, ohne Server-Uploads.",
      },
    ],
  },
  blur: {
    howTo: {
      title: "Ein Bild unscharf machen",
      steps: [
        "Laden Sie Ihr Bild in das Unschärfe-Werkzeug hoch",
        "Passen Sie die Unschärfe-Intensität mit dem Schieberegler an",
        "Zeigen Sie das unscharfe Ergebnis in Echtzeit in der Vorschau an",
        "Laden Sie Ihr unscharfes Bild herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Verschiedene Unschärfe-Effekte: Gaußsch, Bewegung, Zoom-Unschärfe",
        "Anpassbare Unschärfe-Intensität und Radius",
        "Selective Unschärfe für bestimmte Bildbereiche",
        "Echtzeit-Vorschau mit sofortigen Updates",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Gaußsche Unschärfe funktioniert gut zum Aufweichen ganzer Bilder",
        "Verwenden Sie Bewegungsunschärfe, um dynamische Effekte zu statischen Bildern hinzuzufügen",
        "Machen Sie Hintergründe unscharf, um Tiefenschärfe-Effekt zu erzeugen",
      ],
    },
    faq: [
      {
        question: "Was ist der Unterschied zwischen Gaußscher Unschärfe und Bewegungsunschärfe?",
        answer: "Gaußsche Unschärfe erzeugt einen Gesamtaufweichungs-Effekt, während Bewegungsunschärfe eine Bewegung in eine bestimmte Richtung simuliert.",
      },
      {
        question: "Kann ich nur den Hintergrund unscharf machen?",
        answer: "Ja. Sie können bestimmte Bereiche selektiv unscharf machen, während andere scharf bleiben, für einen Tiefenschärfe-Effekt.",
      },
      {
        question: "Wird das Unschärfe-Machen in Ihrer Cloud durchgeführt?",
        answer: "Nein. Alle Unschärfe-Effekte werden lokal in Ihrem Browser mit sofortiger Darstellung und ohne Uploads angewendet.",
      },
    ],
  },
  filters: {
    howTo: {
      title: "Filter auf ein Bild anwenden",
      steps: [
        "Laden Sie Ihr Bild in das Filter-Werkzeug hoch",
        "Durchsuchen Sie verschiedene Filter-Optionen und wählen Sie aus",
        "Passen Sie die Filter-Intensität an, falls verfügbar",
        "Laden Sie Ihr gefiltertes Bild herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Mehrere professionelle Filter: Vintage, kühler Ton, warmer Ton, usw.",
        "Anpassbare Filter-Stärke für subtile oder dramatische Effekte",
        "Sofortige Vorschau angewendeter Filter",
        "Kombinieren Sie mehrere Filter für einzigartige Effekte",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Vintage-Filter fügen nostalgisches, retro-Aussehen zu Fotos hinzu",
        "Kühle/warme Filter helfen, die Farbtemperatur in Fotos zu korrigieren",
        "Beginnen Sie mit niedriger Intensität und erhöhen Sie für beste Ergebnisse",
      ],
    },
    faq: [
      {
        question: "Kann ich mehrere Filter kombinieren?",
        answer: "Ja. Sie können mehrere Filter nacheinander anwenden, um einzigartige, benutzerdefinierte Effekte zu erzeugen.",
      },
      {
        question: "Wie mache ich einen Filter rückgängig, wenn mir der nicht gefällt?",
        answer: "Sie können einzelne Filter-Anwendungen rückgängig machen oder jederzeit zum Originalbild zurücksetzen.",
      },
      {
        question: "Werden meine Bilder nach dem Filtern gespeichert?",
        answer: "Nein. Alle Filter finden in Ihrem Browser statt und werden nach dem Download sofort verworfen.",
      },
    ],
  },
  vignette: {
    howTo: {
      title: "Vignette zu einem Bild hinzufügen",
      steps: [
        "Laden Sie Ihr Bild in den Vignette-Editor hoch",
        "Passen Sie die Vignette-Intensität und Größe an",
        "Zeigen Sie den Vignette-Effekt auf Ihrem Bild in der Vorschau an",
        "Laden Sie Ihr Bild mit Vignette herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Anpassbare Vignette-Dunkelheit und Unschärfe-Radius",
        "Kontrollieren Sie Vignette-Größe und Feathering",
        "Mehrere Vignette-Form-Optionen",
        "Echtzeit-Vorschau",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Vignette lenkt die Aufmerksamkeit auf das Bildmittelpunkt",
        "Verwenden Sie subtile Vignette für professionelle Fotos",
        "Dunklere Vignette erzeugt dramatische, düstere Effekte",
      ],
    },
    faq: [
      {
        question: "Was ist eine Vignette und warum sollte ich sie verwenden?",
        answer: "Eine Vignette verdunkelt die Bildränder, um die Aufmerksamkeit auf die Mitte zu lenken. Nützlich für Porträts und künstlerische Effekte.",
      },
      {
        question: "Kann ich anpassen, wie stark die Vignette ist?",
        answer: "Ja. Sie können Dunkelheit, Unschärfe-Radius, Größe und Feathering kontrollieren, um subtile oder dramatische Effekte zu erzeugen.",
      },
      {
        question: "Wird die Vignettenbildung auf Ihren Servern durchgeführt?",
        answer: "Nein. Die Vignette wird sofort in Ihrem Browser mit Echtzeit-Vorschau und ohne Server-Beteiligung angewendet.",
      },
    ],
  },
  noise: {
    howTo: {
      title: "Rauschen zu einem Bild hinzufügen",
      steps: [
        "Laden Sie Ihr Bild in das Rausch-Werkzeug hoch",
        "Wählen Sie die Rausch-Art (Körnung, Salz-Pfeffer, usw.)",
        "Passen Sie die Rausch-Intensitätsstufe an",
        "Laden Sie Ihr Bild mit hinzugefügtem Rauschen herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Verschiedene Rausch-Arten: Körnung, Salz-und-Pfeffer, Perlin-Rauschen",
        "Anpassbare Rausch-Intensität und -Dichte",
        "Kontrollieren Sie die Rausch-Verteilung",
        "Echtzeit-Vorschau",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Filmkörnung fügt Vintage-, kinematisches Aussehen zu Fotos hinzu",
        "Verwenden Sie subtiles Rauschen, um glatte Bereiche zu reduzieren, die künstlich aussehen",
        "Rauschen hilft, Posterisierung in Verlaufsbereichen zu reduzieren",
      ],
    },
    faq: [
      {
        question: "Warum würde ich Rauschen zu einem Bild hinzufügen?",
        answer: "Rauschen fügt Vintage-Charakter hinzu, erzeugt einen Filmkörn-Effekt und kann glatte Bereiche natürlicher aussehen lassen.",
      },
      {
        question: "Was sind die verschiedenen Rausch-Arten?",
        answer: "Körnung (filmähnlich), Salz-und-Pfeffer (körnig) und Perlin-Rauschen (organisch aussehend) bieten verschiedene ästhetische Effekte.",
      },
      {
        question: "Wird die Rausch-Verarbeitung privat durchgeführt?",
        answer: "Ja. Alle Rausch-Effekte werden lokal in Ihrem Browser mit sofortigen Ergebnissen erzeugt und angewendet.",
      },
    ],
  },
  sharpen: {
    howTo: {
      title: "Ein Bild schärfen",
      steps: [
        "Laden Sie Ihr Bild in das Schärfe-Werkzeug hoch",
        "Passen Sie die Schärfe-Stufe mit dem Schieberegler an",
        "Vergleichen Sie Original- und geschärfte Versionen",
        "Laden Sie Ihr geschärftes Bild herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Anpassbare Schärfe-Intensität",
        "Unsharp-Mask und High-Pass-Schärfe-Optionen",
        "Before/After-Vergleichsansicht",
        "Echtzeit-Vorschau-Anpassungen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie Schärfe, um Details in leicht unscharfen Fotos zu verbessern",
        "Vermeiden Sie Über-Schärfen, was Halos um Kanten erzeugt",
        "Funktioniert am besten auf Bildern mit guter anfänglicher Schärfe",
      ],
    },
    faq: [
      {
        question: "Kann Schärfen ein unscharfes Foto reparieren?",
        answer: "Schärfen hilft, Details in weichen Bildern zu verbessern, aber repariert nicht stark unscharfe Fotos. Verwenden Sie es auf leicht unscharfen Bildern.",
      },
      {
        question: "Was ist der Unterschied zwischen Unsharp Mask und High-Pass-Schärfen?",
        answer: "Unsharp Mask ist eine traditionelle Schärfe-Methode, während High-Pass kontrolliere Kantenverstärkung bietet.",
      },
      {
        question: "Wird das Schärfen in Ihrer Cloud durchgeführt?",
        answer: "Nein. Schärfen erfolgt vollständig in Ihrem Browser mit Echtzeit-Before/After-Vergleich.",
      },
    ],
  },
  sepia: {
    howTo: {
      title: "Sepia-Filter anwenden",
      steps: [
        "Laden Sie Ihr Bild in das Sepia-Filter-Werkzeug hoch",
        "Passen Sie die Sepia-Intensität nach Ihrer Vorliebe an",
        "Zeigen Sie den Vintage-Sepia-Effekt in der Vorschau an",
        "Laden Sie Ihr Sepia-getöntes Bild herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Klassischer Sepia-Ton-Effekt für Vintage-Aussehen",
        "Anpassbare Sepia-Intensität von subtil bis stark",
        "Behält Bildkontrast und Details bei",
        "Funktioniert mit allen Bildformaten",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Sepia verleiht Fotos ein warmes, antikes Aussehen perfekt für Old-Style-Effekte",
        "Niedrigere Intensität erzeugt subtiles Vintage-Gefühl",
        "Kombinieren Sie mit Textur-Overlays für authentischen alten Fotografie-Effekt",
      ],
    },
    faq: [
      {
        question: "Was ist Sepia und wann wird es verwendet?",
        answer: "Sepia ist ein warmer, bräunlicher Ton, der einen Vintage-, antiken Fotografie-Effekt erzeugt. Perfekt für nostalgisches oder historisches Aussehen.",
      },
      {
        question: "Kann ich kontrollieren, wie viel Sepia angewendet wird?",
        answer: "Ja. Sie können die Sepia-Intensität von subtiler Wärme bis zu starkem Vintage-Effekt basierend auf Ihrer Vorliebe anpassen.",
      },
      {
        question: "Wird der Sepia-Effekt privat durchgeführt?",
        answer: "Ja. Der Sepia-Ton wird sofort in Ihrem Browser angewendet, ohne Server-Uploads oder Datenspeicherung.",
      },
    ],
  },
  invert: {
    howTo: {
      title: "Bildfarben invertieren",
      steps: [
        "Laden Sie Ihr Bild in das Invertierungs-Werkzeug hoch",
        "Klicken Sie, um alle Farben zu invertieren",
        "Zeigen Sie den Negativ-Effekt in der Vorschau an",
        "Laden Sie Ihr invertiertes Bild herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Vollständige Farb-Invertierung (Negativ-Effekt)",
        "Bewahrt Bildqualität und Details",
        "One-Click-Operation für sofortige Ergebnisse",
        "Funktioniert mit allen Bildtypen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Farb-Invertierung erzeugt einen Negativ-Effekt nützlich für künstlerische Zwecke",
        "Nützlich zum Konvertieren gescannter Negative zu Positiven",
        "Kann interessante kreative Effekte erzeugen, wenn mit anderen Werkzeugen kombiniert",
      ],
    },
    faq: [
      {
        question: "Was macht Farb-Invertierung?",
        answer: "Farb-Invertierung erzeugt einen Negativ-Effekt durch Umkehrung aller Farben zu ihren Gegensätzen (Rot wird Cyan, usw.).",
      },
      {
        question: "Kann ich nur einige Farben invertieren?",
        answer: "Nein. Invertierung ist eine vollständige Farb-Umkehrung, die alle Pixel gleichermaßen in einer Operation betrifft.",
      },
      {
        question: "Wird die Invertierung privat durchgeführt?",
        answer: "Ja. Invertierung erfolgt sofort in Ihrem Browser, ohne Uploads oder Server-Verarbeitung.",
      },
    ],
  },
  combine: {
    howTo: {
      title: "Bilder kombinieren",
      steps: [
        "Laden Sie zwei oder mehr Bilder zum Kombinieren hoch",
        "Wählen Sie Layout: horizontal, vertikal oder Gitter-Anordnung",
        "Passen Sie Abstände und Ausrichtung zwischen Bildern an",
        "Laden Sie Ihr kombiniertes Bild herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Mehrere Layout-Optionen: Seite an Seite, vertikaler Stapel, Gitter",
        "Anpassbare Abstände und Ausrichtung",
        "Automatische oder manuelle Größenoptionen",
        "Unterstützung für unterschiedliche Bild-Dimensionen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Passen Sie Bilder zu ähnlichen Dimensionen an, bevor Sie kombinieren, für bessere Ergebnisse",
        "Verwenden Sie konsistente Abstände für professionelles Aussehen",
        "Kombinieren Sie Before/After-Fotos, um Transformation zu zeigen",
      ],
    },
    faq: [
      {
        question: "Kann ich Bilder unterschiedlicher Größe kombinieren?",
        answer: "Ja. Das Werkzeug unterstützt automatische Größenänderung, um unterschiedliche Dimensionen anzupassen, oder Sie können Abstände manuell anpassen.",
      },
      {
        question: "Wie viele Bilder kann ich kombinieren?",
        answer: "Sie können 2 oder mehr Bilder in verschiedenen Gitter-Layouts kombinieren (2x2, 3x3, usw.).",
      },
      {
        question: "Wird die Bild-Kombination auf Ihrem Server durchgeführt?",
        answer: "Nein. Alle Kombinationen erfolgen sofort in Ihrem Browser, ohne Uploads oder Server-Verarbeitung.",
      },
    ],
  },
  collage: {
    howTo: {
      title: "Foto-Collage erstellen",
      steps: [
        "Laden Sie mehrere Fotos in die Collage-Maker hoch",
        "Wählen Sie eine Collage-Vorlage oder erstellen Sie benutzerdefinertes Layout",
        "Ziehen Sie, um Fotos neu anzuordnen und Abstände anzupassen",
        "Laden Sie Ihre abgeschlossene Collage herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Mehrere vorgefertigte Collage-Vorlagen",
        "Drag-and-Drop-Foto-Anordnung",
        "Anpassbare Abstände und Ränder",
        "Anpassung der Hintergrundfarbe",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie 4-9 Fotos für ausgeglichene, visuell ansprechende Collage",
        "Wählen Sie ähnliche Stil- oder Farb-Töne Fotos für Zusammenhang",
        "Fügen Sie subtile Ränder hinzu, um Fotos zu trennen und Definition zu ergänzen",
      ],
    },
    faq: [
      {
        question: "Wie viele Fotos kann ich zu einer Collage hinzufügen?",
        answer: "Die meisten Vorlagen unterstützen 4-12 Fotos. Wählen Sie eine Vorlage, die Ihre Fotoanzahl angepasst.",
      },
      {
        question: "Kann ich die Abstände zwischen Fotos anpassen?",
        answer: "Ja. Sie können Abstände und Ränder anpassen, um Ihr bevorzugtes Layout zu erzeugen.",
      },
      {
        question: "Wird meine Collage privat erstellt?",
        answer: "Ja. Alle Collage-Erstellung erfolgt sofort in Ihrem Browser, ohne Uploads oder Cloud-Verarbeitung.",
      },
    ],
  },
  gradient: {
    howTo: {
      title: "Gradient-Bild generieren",
      steps: [
        "Öffnen Sie das Gradient-Generator-Werkzeug",
        "Wählen Sie Start- und Endfarben",
        "Wählen Sie Gradient-Richtung oder Winkel",
        "Laden Sie Ihr Gradient-Bild herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Mehrere Gradient-Typen: linear, radial, conic",
        "Farb-Picker zum Auswählen von Start- und Endfarben",
        "Anpassbarer Winkel und Richtung",
        "Benutzerdefinierte Dimensionen und Export-Formate",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie komplementäre Farben für auffällige Gradienten",
        "Radiale Gradienten funktionieren gut für zirkuläre Designs",
        "Exportieren Sie als SVG für skalierbare Gradienten",
      ],
    },
    faq: [
      {
        question: "Was ist der Unterschied zwischen linearen, radialen und conic Gradienten?",
        answer: "Linear fließt in eine Richtung, radial expandiert vom Zentrum, conic dreht sich um Zentrum wie ein Kuchen.",
      },
      {
        question: "Kann ich mehr als 2 Farben hinzufügen?",
        answer: "Ja. Sie können mehrere Farb-Stopps hinzufügen, um komplexe Multi-Farb-Gradienten zu erzeugen.",
      },
      {
        question: "Wird die Gradient-Generierung privat durchgeführt?",
        answer: "Ja. Gradienten werden vollständig in Ihrem Browser generiert, ohne Server-Beteiligung.",
      },
    ],
  },
  placeholder: {
    howTo: {
      title: "Platzhalter-Bild generieren",
      steps: [
        "Öffnen Sie den Platzhalter-Generator",
        "Geben Sie gewünschte Breiten- und Höhendimensionen an",
        "Passen Sie Hintergrund- und Textfarben an",
        "Laden Sie Ihr Platzhalter-Bild herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Schnelle Generierung von Platzhalter-Bildern in benutzerdefinierten Größen",
        "Anpassbare Hintergrund- und Textfarben",
        "Dimensionsanzeige auf Bild",
        "Perfekt für Website-Mockups und Prototypen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie Platzhalter während Web-Design, bevor Finale Bilder bereit sind",
        "Behalten Sie konsistenten Platzhalter-Stil über Mockups hinweg bei",
        "Fügen Sie Dimensionen für Entwicklungs-Referenz ein",
      ],
    },
    faq: [
      {
        question: "Kann ich Platzhalter in Produktion verwenden?",
        answer: "Platzhalter sind für Mockups und Prototypen ausgelegt. Ersetzen Sie sie durch finale Bilder vor dem Starten.",
      },
      {
        question: "Kann ich Text zu den Platzhalter hinzufügen?",
        answer: "Ja. Dimensionen werden automatisch angezeigt, und Sie können Text und Farben anpassen.",
      },
      {
        question: "Wird die Platzhalter-Generierung lokal durchgeführt?",
        answer: "Ja. Platzhalter werden vollständig in Ihrem Browser generiert, ohne externe Verarbeitung.",
      },
    ],
  },
  pattern: {
    howTo: {
      title: "Muster-Bild generieren",
      steps: [
        "Öffnen Sie das Muster-Generator-Werkzeug",
        "Wählen Sie aus verfügbaren Muster-Typen",
        "Passen Sie Farben und Mustergröße an",
        "Laden Sie Ihr generiertes Muster herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Mehrere Muster-Typen: Punkte, Streifen, Schachbrett, geometrisch",
        "Anpassbare Muster-Dichte und Größe",
        "Anpassbare Farben",
        "Nahtlose Muster-Generierung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Muster funktionieren großartig als Hintergrund-Texturen für Websites",
        "Verwenden Sie subtile Farben für Hintergrund-Muster",
        "Testen Sie Muster-Sichtbarkeit gegen Text",
      ],
    },
    faq: [
      {
        question: "Sind die Muster nahtlos zum Kacheln?",
        answer: "Ja. Alle Muster werden als nahtlose Kacheln generiert, die perfekt ohne sichtbare Nähte wiederholen.",
      },
      {
        question: "Welche Muster-Typen sind verfügbar?",
        answer: "Punkte, Streifen, Schachbrett, Wellen, Sechsecke und verschiedene geometrische Muster.",
      },
      {
        question: "Wird die Muster-Generierung privat durchgeführt?",
        answer: "Ja. Muster werden vollständig in Ihrem Browser generiert, ohne Cloud-Verarbeitung.",
      },
    ],
  },
  "html-to-image": {
    howTo: {
      title: "HTML zu Bild konvertieren",
      steps: [
        "Fügen Sie Ihren HTML-Code in den Editor ein",
        "Zeigen Sie Ihr HTML als Bild gerendertes in der Vorschau an",
        "Passen Sie Dimensionen und Qualitätseinstellungen an",
        "Laden Sie das gerenderte Bild herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Rendern Sie HTML und CSS zu Bildformat",
        "Unterstützung für verschiedene HTML-Elemente und Styling",
        "Anpassbare Ausgabe-Auflösung und Dimensionen",
        "Mehrere Bildformat-Optionen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Halten Sie HTML einfach für beste Rendering-Ergebnisse",
        "Testen Sie Styling vor der Konvertierung zu Bild",
        "Verwenden Sie hohe Auflösung für qualitativ hochwertige Ausgabe",
      ],
    },
    faq: [
      {
        question: "Welche HTML-Features werden unterstützt?",
        answer: "Die meisten Standard-HTML- und CSS-Features funktionieren, einschließlich Layout, Schriftarten, Farben und grundlegende Animationen.",
      },
      {
        question: "Kann ich externe Stylesheets einschließen?",
        answer: "Inline-CSS funktioniert am besten. Externe Stylesheets laden möglicherweise nicht aufgrund von Browser-Sicherheitsbeschränkungen.",
      },
      {
        question: "Wird HTML privat gerenderiert?",
        answer: "Ja. Das HTML-Rendering erfolgt vollständig in Ihrem Browser, ohne Uploads.",
      },
    ],
  },
  watermark: {
    howTo: {
      title: "Wasserzeichen zu Bild hinzufügen",
      steps: [
        "Laden Sie Ihr Bild in das Wasserzeichen-Werkzeug hoch",
        "Fügen Sie Text hinzu oder laden Sie ein Bild als Wasserzeichen hoch",
        "Positionieren Sie und passen Sie die Wasserzeichen-Deckkraft an",
        "Laden Sie Ihr Wasserzeichen-Bild herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Text-Wasserzeichen mit anpassbaren Schriftarten und Farben",
        "Bild-Wasserzeichen-Unterstützung",
        "Anpassbare Deckkraft und Positionierung",
        "Mehrere Wasserzeichen-Platzierungs-Optionen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Verwenden Sie semi-transparent Wasserzeichen zum Schutz ohne Verdeckung des Bildes",
        "Platzieren Sie Wasserzeichen in Ecken für weniger aufdringlichen Schutz",
        "Verwenden Sie Wasserzeichen zum Schutz von Portfolio- und Kundenarbeit",
      ],
    },
    faq: [
      {
        question: "Kann ich sowohl Text- als auch Bild-Wasserzeichen verwenden?",
        answer: "Ja. Sie können Text-Wasserzeichen, Bild-Wasserzeichen oder beides zusammen hinzufügen.",
      },
      {
        question: "Wie transparent sollte mein Wasserzeichen sein?",
        answer: "Typischerweise bieten 30-50% Deckkraft gutes Gleichgewicht zwischen Sichtbarkeit und Nichtverdeckung des Bildes.",
      },
      {
        question: "Wird das Wasserzeiching privat durchgeführt?",
        answer: "Ja. Das Wasserzeiching erfolgt vollständig in Ihrem Browser, ohne Uploads oder Cloud-Verarbeitung.",
      },
    ],
  },
};
