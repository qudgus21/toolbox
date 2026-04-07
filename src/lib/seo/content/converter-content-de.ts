import type { ToolContentMap } from "../tool-content-types";

export const converterContentDe: ToolContentMap = {
  // Unit Converters
  "length": {
    howTo: {
      title: "Längeneinheiten umrechnen",
      steps: [
        "Wählen Sie die Ausgangseinheit (Meter, Fuß, Kilometer, Meilen, etc.)",
        "Geben Sie den umzurechnenden Wert ein",
        "Wählen Sie die Zieleinheit aus dem Dropdown",
        "Sehen Sie das Konversionsergebnis sofort",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Unterstützung für 15+ Längenmesser einschließlich metrischer und imperialer Einheiten",
        "Echtzeit-Konvertierung während der Eingabe",
        "Bidirektionale Konvertierung zwischen beliebigen Einheiten",
        "Hochpräzisions-Dezimalberechnungen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "1 Kilometer entspricht 0,621371 Meilen für Langstreckenmessungen",
        "Verwenden Sie Meter als Basiseinheit für die meisten wissenschaftlichen Umrechnungen",
        "Merken Sie sich: 1 Fuß = 12 Zoll für schnelle Kopfrechenoperationen",
      ],
    },
    faq: [
      { question: "Wie präzise sind die Konvertierungen?", answer: "Alle Konvertierungen verwenden Standard-Umrechnungsfaktoren mit vollständiger Gleitkommagenauigkeit für professionelle Genauigkeit." },
      { question: "Kann ich zwischen metrischen und imperialen Einheiten konvertieren?", answer: "Ja. Der Längenmesser unterstützt alle gängigen metrischen Einheiten (mm, cm, m, km) und imperiale Einheiten (Zoll, Fuß, Yards, Meilen)." },
      { question: "Funktioniert dies offline?", answer: "Ja. Sobald die Seite geladen ist, erfolgen alle Konvertierungen in Ihrem Browser ohne Internetverbindung." },
    ],
  },
  "weight": {
    howTo: {
      title: "Gewichtseinheiten umrechnen",
      steps: [
        "Wählen Sie Ihre Ausgangsgewichtseinheit (Kilogramm, Pfund, Gramm, Unzen, etc.)",
        "Geben Sie den Gewichtswert ein, den Sie konvertieren möchten",
        "Wählen Sie die Zieleinheit für die Konvertierung",
        "Sehen Sie Ihr Ergebnis sofort angezeigt",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen 12+ Gewichtseinheiten global",
        "Unterstützung für metrische (kg, g) und imperiale (lb, oz) Systeme",
        "Präzise Dezimalgenauigkeit für wissenschaftliche Zwecke",
        "Schnelle Konvertierung ohne Seitenneuladen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "1 Kilogramm entspricht etwa 2,2 Pfund für schnelle Schätzungen",
        "Verwenden Sie Gramm für präzise Koch- und Backmessungen",
        "Metrische Tonnen werden häufig in der Schifffahrt verwendet",
      ],
    },
    faq: [
      { question: "Was ist der Unterschied zwischen Gewicht und Masse?", answer: "Gewicht ist die Gravitationskraft auf ein Objekt (gemessen in Newton), während Masse die Materialmenge ist (Kilogramm). Dieses Tool konvertiert Masseneinheiten als Standard." },
      { question: "Warum unterscheiden sich Unzen von Gramm?", answer: "Eine Unze entspricht etwa 28,35 Gramm. Avoirdupois-Unzen (häufig) und Troy-Unzen (Edelmetalle) haben unterschiedliche Werte, daher ist der Kontext wichtig." },
      { question: "Sind meine Daten privat bei der Konvertierung?", answer: "Vollständig. Alle Gewichtskonvertierungen werden lokal in Ihrem Browser berechnet – nichts wird an Server gesendet." },
    ],
  },
  "temperature": {
    howTo: {
      title: "Temperatur umrechnen",
      steps: [
        "Wählen Sie Celsius, Fahrenheit oder Kelvin als Ausgangstemperatur",
        "Geben Sie den Temperaturwert ein",
        "Wählen Sie Ihre Zieltemperaturskala",
        "Sehen Sie die umgerechnete Temperatur sofort",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen Celsius-, Fahrenheit- und Kelvin-Skalen",
        "Unterstützung für wissenschaftliche und alltägliche Temperaturwerte",
        "Präzise Berechnungen für extreme Temperaturbereiche",
        "Echtzeit-Anzeige der Konvertierung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Wasser gefriert bei 0°C, 32°F und 273,15K",
        "Addieren Sie 40 zu Celsius, multiplizieren Sie mit 9/5, dann subtrahieren Sie 40 für schnelle F-Konvertierung",
        "Kelvin beginnt bei absolutem Nullpunkt und wird in wissenschaftlichen Berechnungen verwendet",
      ],
    },
    faq: [
      { question: "Welche Länder verwenden Fahrenheit?", answer: "Die USA, die Bahamas, Belize, die Kaimaninseln, Palau und einige US-Territorien verwenden hauptsächlich Fahrenheit. Die meisten anderen Länder verwenden Celsius." },
      { question: "Warum wird Kelvin in der Wissenschaft verwendet?", answer: "Kelvin ist die absolute Temperaturskala, die bei absolutem Nullpunkt (−273,15°C) beginnt, was sie ideal für wissenschaftliche Berechnungen ohne negative Zahlen macht." },
      { question: "Kann ich negative Temperaturen konvertieren?", answer: "Ja, dieses Tool behandelt negative Temperaturen in Celsius und Fahrenheit. Kelvin-Konvertierungen beginnen bei absolutem Nullpunkt, daher sind negative Werte nicht möglich." },
    ],
  },
  "area": {
    howTo: {
      title: "Flächeneinheiten umrechnen",
      steps: [
        "Wählen Sie Ihre Ausgangsflächeneinheit (Quadratmeter, Quadratfuß, Hektar, Acres, etc.)",
        "Geben Sie den Flächenwert ein, den Sie konvertieren möchten",
        "Wählen Sie die Zielflächeneinheit",
        "Sehen Sie Ihr konvertiertes Ergebnis",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie 15+ Flächeneinheiten einschließlich metrischer und imperialer Einheiten",
        "Unterstützung für kleine (mm²) und große (km²) Flächen",
        "Nützlich für Immobilien, Landwirtschaft und Konstruktion",
        "Sofortige bidirektionale Konvertierung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "1 Hektar entspricht 10.000 Quadratmetern, häufig bei der Landmessung verwendet",
        "1 Acre entspricht etwa 4.047 Quadratmetern",
        "Konvertieren Sie m² zu sq ft für internationale Vergleiche bei Immobilienangeboten",
      ],
    },
    faq: [
      { question: "Wie unterscheiden sich Quadrateinheiten von linearen Einheiten?", answer: "Quadrateinheiten messen Fläche (Länge × Breite), während lineare Einheiten nur Länge messen. Bei der Konvertierung müssen Sie den Konversionsfaktor quadrieren." },
      { question: "Wofür wird ein Hektar verwendet?", answer: "Hektar messen Grundstücke und Wälder global. Ein Hektar ist 100m × 100m, was es bequem für landwirtschaftliche und Umweltschutzzwecke macht." },
      { question: "Alle meine Konvertierungen bleiben privat, richtig?", answer: "Absolut. Flächenberechnungen verlassen Ihr Gerät niemals – alles läuft lokal in Ihrem Browser." },
    ],
  },
  "volume": {
    howTo: {
      title: "Volumeneinheiten umrechnen",
      steps: [
        "Wählen Sie Ihre Ausgangsvolumeneinheit (Liter, Gallonen, Milliliter, Becher, etc.)",
        "Geben Sie die Volumenmenge ein, die Sie konvertieren möchten",
        "Wählen Sie Ihre Zielvolumeneinheit",
        "Sehen Sie das konvertierte Volumen sofort",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Unterstützung für 20+ Volumeneinheiten von metrisch bis US-Maßsystem",
        "Konvertieren Sie Kochmessungen wie Becher, Esslöffel und Teelöffel",
        "Präzise für Flüssig- und Trockenvolumen-Konvertierungen",
        "Hohe Präzision für wissenschaftliche Anwendungen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "1 Liter entspricht 1000 Millilitern oder etwa 0,264 Gallonen",
        "1 Becher beim Kochen entspricht 236,588 Millilitern",
        "Denken Sie daran: 1 Esslöffel = 3 Teelöffel zum Skalieren von Rezepten",
      ],
    },
    faq: [
      { question: "Entsprechen US-Gallonen britischen Gallonen?", answer: "Nein. Eine US-Gallone entspricht 3,785 Litern, während eine britische (imperiale) Gallone 4,546 Litern entspricht. Überprüfen Sie immer den Gallonentyp bei der Konvertierung." },
      { question: "Warum sind Becher beim Backen unpräzise?", answer: "Becher variieren je nachdem, wie dicht Sie Zutaten packen. Gewichtsmessungen (Gramm/ml) sind für konsistente Backergebnisse viel genauer." },
      { question: "Kann ich diesen Berechnungen ohne Internet vertrauen?", answer: "Ja. Alle Volumenkonvertierungen werden in Ihrem Browser berechnet – keine Online-Verbindung erforderlich und Ihre Zahlen bleiben privat." },
    ],
  },
  "speed": {
    howTo: {
      title: "Geschwindigkeitseinheiten umrechnen",
      steps: [
        "Wählen Sie Ihre Ausgangsgeschwindigkeitseinheit (km/h, m/s, mph, Knoten, etc.)",
        "Geben Sie den Geschwindigkeitswert ein",
        "Wählen Sie Ihre Zielgeschwindigkeitseinheit",
        "Erhalten Sie Ihren konvertierten Geschwindigkeitswert",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen 10+ Geschwindigkeitseinheiten einschließlich metrischer und imperialer Einheiten",
        "Unterstützung für Knoten, die häufig in Luftfahrt und Seeschifffahrt verwendet werden",
        "Konvertierungen für km/h, m/s, mph und mehr",
        "Echtzeit-Sofort-Konvertierung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "1 Kilometer pro Stunde entspricht etwa 0,621 Meilen pro Stunde",
        "1 Knoten wird in der Schifffahrt verwendet und entspricht 1,852 Kilometern pro Stunde",
        "Geschwindigkeitsbegrenzungen variieren nach Land - konvertieren Sie mph zu km/h beim internationalen Reisen",
      ],
    },
    faq: [
      { question: "Was ist ein Knoten und warum wird er zur See verwendet?", answer: "Ein Knoten ist eine Seemeile pro Stunde (1,852 km/h). Dies ist Standard in der Schifffahrt und Luftfahrt, da Seemeilen direkt mit Erdbreitengrad verbunden sind." },
      { question: "Wie schnell sind 100 km/h in mph?", answer: "Etwa 62,14 mph. Als schnelle mentale Schätzung: Teilen Sie km/h durch 1,6, um einen ungefähren mph-Wert zu erhalten." },
      { question: "Speichern Sie meine Geschwindigkeitskonvertierungen?", answer: "Nie. Alle Konvertierungen erfolgen sofort in Ihrem Browser ohne Datenübertragung oder Speicherung." },
    ],
  },
  "time": {
    howTo: {
      title: "Zeiteinheiten umrechnen",
      steps: [
        "Wählen Sie Ihre Ausgangszeiteineheit (Sekunden, Minuten, Stunden, Tage, etc.)",
        "Geben Sie die Zeitdauer ein, die Sie konvertieren möchten",
        "Wählen Sie Ihre Zielzeiteinheit",
        "Sehen Sie den konvertierten Zeitwert",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen 8+ Zeiteinheiten von Sekunden bis Jahren",
        "Unterstützung für Standard- und Dezimalzeitformate",
        "Nützlich für Projektmanagement und Zeiterfassung",
        "Sofortige bidirektionale Konvertierungen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "1 Tag entspricht 24 Stunden, 1440 Minuten oder 86.400 Sekunden",
        "1 Jahr entspricht etwa 365,25 Tagen unter Berücksichtigung von Schaltjahren",
        "Verwenden Sie Dezimalstunden für präzise Zeitabrechnung in professionellen Einstellungen",
      ],
    },
    faq: [
      { question: "Wie werden Schaltjahre berücksichtigt?", answer: "Dieses Tool verwendet 365,25 Tage pro Jahr als Standard für längere Konvertierungen, was den Schaltjahreseffekt über die Zeit durchschnittlich verteilt." },
      { question: "Gibt es einen Unterschied zwischen Dezimalstunden und hh:mm-Format?", answer: "Ja – Dezimalstunden (8,5) drücken Zeit als Bruchteil von 24 Stunden aus, während hh:mm (8:30) Stunden und Minuten verwendet. Beides wird hier unterstützt." },
      { question: "Werden meine Zeitberechnungen irgendwo gespeichert?", answer: "Nein. Alle Zeitkonvertierungen erfolgen lokal in Ihrem Browser – nichts wird protokolliert oder übertragen." },
    ],
  },
  "pressure": {
    howTo: {
      title: "Druckeinheiten umrechnen",
      steps: [
        "Wählen Sie Ihre Ausgangsdruckeinheit (Pascal, Bar, psi, atm, etc.)",
        "Geben Sie den Druckwert ein",
        "Wählen Sie Ihre Zieldruckeinheit",
        "Sehen Sie Ihr konvertiertes Druckergebnis",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen 12+ Druckeinheiten einschließlich Pa, bar, psi und atm",
        "Unterstützung für SI- und Nicht-SI-Druckmessungen",
        "Nützlich für industrielle, wissenschaftliche und technische Anwendungen",
        "Hochpräzisions-Berechnungen für technische Arbeiten",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "1 Bar entspricht 100.000 Pascal und wird in Wetter- und Reifendruck verwendet",
        "Atmosphärendruck auf Meereshöhe beträgt 101.325 Pascal oder 1 atm",
        "PSI (Pfund pro Quadratzoll) ist häufig bei nordamerikanischem Reifendruck",
      ],
    },
    faq: [
      { question: "Was ist der Standard-Reifendruck in Bar vs PSI?", answer: "Standard-Autoreifendruck beträgt typischerweise 32–35 PSI (2,2–2,4 bar). Überprüfen Sie die Tür Ihres Fahrzeugs für die genaue Spezifikation." },
      { question: "Warum verwenden Wetterberichte Millibar?", answer: "Millibar (mb) oder Hektopascal (hPa) sind bequem für Atmosphärendruck, da der Druck auf Meereshöhe ~1013 mb beträgt, was Variationen leicht lesbar macht." },
      { question: "Gibt es ein Datenschutzbedenken bei Druckberechnungen?", answer: "Nein. Jede Konvertierung wird sofort in Ihrem Browser durchgeführt – ohne externe Verbindungen oder Datenübertragung." },
    ],
  },
  "energy": {
    howTo: {
      title: "Energieeinheiten umrechnen",
      steps: [
        "Wählen Sie Ihre Ausgangsenergieeinheit (Joule, Kalorien, BTU, kWh, etc.)",
        "Geben Sie den Energiewert ein, den Sie konvertieren möchten",
        "Wählen Sie Ihre Zielenergieeinheit",
        "Erhalten Sie den konvertierten Energiewert",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Unterstützung für 10+ Energieeinheiten von Joule bis Kilowattstunden",
        "Konvertieren Sie Nahrungskalorien in wissenschaftliche Kalorien",
        "BTU-Unterstützung für Heiz- und Kühlungsberechnungen",
        "Präzise für thermische und elektrische Energie",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "1 Kilowattstunde (kWh) entspricht 3.600.000 Joule und wird für Stromabrechnung verwendet",
        "1 Kalorie (Nahrung) entspricht 4.184 Joule",
        "1 BTU ist die Energie, die erforderlich ist, um 1 Pfund Wasser um 1°F zu erhöhen",
      ],
    },
    faq: [
      { question: "Was ist der Unterschied zwischen Nahrungskalorien und wissenschaftlichen Kalorien?", answer: "Nahrungskalorien (Kilokalorien oder kcal) sind 1.000-mal größer als wissenschaftliche Kalorien. Wenn Nährwertkennzeichnungen 'Kalorien' zeigen, meinen sie eigentlich Kilokalorien." },
      { question: "Wie interpretiere ich Stromrechnungen mit kWh?", answer: "Ihre Rechnung zeigt den Verbrauch in kWh (Kilowattstunden). Ein 100W-Gerät, das 10 Stunden läuft, verbraucht 1 kWh. Multiplizieren Sie kWh mit Ihrem lokalen Tarif, um die Kosten zu berechnen." },
      { question: "Benötigt dieses Tool Internet für Energieberechnungen?", answer: "Nein. Alle Energiekonvertierungen werden sofort in Ihrem Browser berechnet – vollständig offline und privat." },
    ],
  },
  "power": {
    howTo: {
      title: "Leistungseinheiten umrechnen",
      steps: [
        "Wählen Sie Ihre Ausgangsleistungseinheit (Watt, Kilowatt, Pferdestärke, etc.)",
        "Geben Sie den Leistungswert ein",
        "Wählen Sie Ihre Zielleistungseinheit",
        "Sehen Sie den konvertierten Leistungswert",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen 8+ Leistungseinheiten einschließlich Watt und Pferdestärke",
        "Unterstützung für Kilowatt, die häufig in der Elektrizität verwendet werden",
        "Konvertierung für BTU/Stunde, verwendet in HVAC-Systemen",
        "Echtzeit-Präzisions-Berechnungen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "1 Kilowatt entspricht 1.000 Watt und ist Standard für elektrische Leistungsmessungen",
        "1 Pferdestärke (hp) entspricht etwa 745,7 Watt",
        "Überprüfen Sie die Leistungsangaben von Geräten in Watt, um Energieverbrauch zu schätzen",
      ],
    },
    faq: [
      { question: "Was bedeuten \"Watt\" auf einem Gerätelabel?", answer: "Watt messen die Energieverbrauchsrate. Ein 1.000W-Mikrowelle verbraucht mehr Leistung pro Sekunde als eine 60W-Glühbirne – höhere Rechnungen und mehr Wärmeerzeugung." },
      { question: "Warum wird Pferdestärke noch immer für Autos verwendet?", answer: "Pferdestärke (hp) ist eine traditionelle Einheit für Motorleistung. Moderne Autos listen auch Kilowatt auf, aber hp bleibt im Marketing für viele Verbraucher vertraut." },
      { question: "Kann ich dies offline nutzen?", answer: "Absolut. Leistungskonvertierungen sind sofort und browserbasiert – keine Internet- oder externen Server erforderlich." },
    ],
  },
  "frequency": {
    howTo: {
      title: "Frequenzeinheiten umrechnen",
      steps: [
        "Wählen Sie Ihre Ausgangsfrequenzeinheit (Hertz, Kilohertz, Megahertz, etc.)",
        "Geben Sie den Frequenzwert ein",
        "Wählen Sie Ihre Zielfrequenzeinheit",
        "Erhalten Sie Ihre konvertierte Frequenz",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen 6+ Frequenzeinheiten von Hz bis GHz",
        "Unterstützung für RPM (Umdrehungen pro Minute) Konvertierung",
        "Nützlich für Elektronik-, Funk- und Mechanik-Anwendungen",
        "Sofort-Konversionsergebnisse",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "1 Kilohertz (kHz) entspricht 1.000 Hertz und wird in Rundfunkfrequenzen verwendet",
        "1 Megahertz (MHz) entspricht 1.000.000 Hertz, häufig in drahtloser Kommunikation",
        "AC-Stromfrequenz beträgt typischerweise 50 Hz oder 60 Hz je nach Land",
      ],
    },
    faq: [
      { question: "Was misst Hz genau?", answer: "Hertz (Hz) misst Zyklen pro Sekunde. Bei Audio bedeutet höher Hz höhere Tonhöhe; bei Prozessoren bedeutet höher Hz (GHz) schnellere Berechnung." },
      { question: "Warum beträgt AC-Stromfrequenz 50 Hz oder 60 Hz?", answer: "Diese Standards wurden basierend auf Motoreffizienz und historischer Entwicklung gewählt. Europa und Asien verwenden 50 Hz, Nordamerika verwendet 60 Hz." },
      { question: "Werden meine Frequenzkonvertierungen verfolgt?", answer: "Nein. Alle Konvertierungen erfolgen sofort auf Ihrem Gerät in Ihrem Browser – vollständig privat." },
    ],
  },
  "angle": {
    howTo: {
      title: "Winkeleinheiten umrechnen",
      steps: [
        "Wählen Sie Ihre Ausgangswinkeleinheit (Grad, Radiant, Gradiant, etc.)",
        "Geben Sie den Winkelwert ein, den Sie konvertieren möchten",
        "Wählen Sie Ihre Zielwinkeleinheit",
        "Sehen Sie den konvertierten Winkel",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen Grad, Radiant, Gradiant und Bogeneinheiten",
        "Unterstützung für Grad-Minute-Sekunde (DMS) Format",
        "Nützlich für Mathematik, Technik und Navigation",
        "Hochpräzision für wissenschaftliche Berechnungen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "360 Grad entspricht 2π Radiant oder ein kompletter Kreis",
        "1 Radiant entspricht etwa 57,3 Grad",
        "Gradiant teilen einen Kreis in 400 Teile, nützlich bei der Vermessung",
      ],
    },
    faq: [
      { question: "Wann sollte ich Radiant anstelle von Grad verwenden?", answer: "Radiant sind in höherer Mathematik und Physik Standard, da sie Winkel direkt mit Bogenlänge verbinden. Grad sind intuitiver für alltägliche Nutzung." },
      { question: "Wofür werden Bogenminuten und Bogensekunden verwendet?", answer: "Diese messen kleine Winkel präzise. Bogensekunden sind in der Astronomie entscheidend für die Positionierung von Sternen und Planeten, wo Genauigkeit äußerst wichtig ist." },
      { question: "Werden meine Winkeldaten gespeichert?", answer: "Nein. Alle Konvertierungen werden sofort in Ihrem Browser berechnet, ohne dass externe Verbindungen oder Datenübertragung erfolgt." },
    ],
  },
  "data-storage": {
    howTo: {
      title: "Datenspeichereinheiten umrechnen",
      steps: [
        "Wählen Sie Ihre Ausgangsdateneinheit (Bytes, Kilobytes, Megabytes, Gigabytes, etc.)",
        "Geben Sie den Dateigrößenwert ein",
        "Wählen Sie Ihre Zieldateneinheit",
        "Sehen Sie Ihre konvertierte Speichergröße",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen 10+ Dateneinheiten von Bytes bis Exabytes",
        "Unterstützung für dezimale (1000) und binäre (1024) Messungen",
        "Nützlich für Dateigröße, Speicherkapazität und Bandbreite",
        "Klare Unterscheidung zwischen MB und MiB Formaten",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "1 Megabyte (MB) entspricht 1.000 Kilobytes dezimal, oder 1 MiB = 1.048.576 Bytes binär",
        "1 Gigabyte (GB) entspricht 1.000 Megabytes, obwohl Speicher oft binäre Notation verwendet",
        "Überprüfen Sie Dateigrößen genau – Bandbreitenbeschränkungen verwenden oft dezimal, während Speicher binär verwendet",
      ],
    },
    faq: [
      { question: "Warum ist meine Festplatte kleiner als angekündigt?", answer: "Hersteller verwenden dezimal (1000 Bytes = 1 KB), aber Betriebssysteme verwenden binär (1024 Bytes = 1 KiB). Dieser 2-3% Unterschied addiert sich bei großen Laufwerken erheblich." },
      { question: "Was ist der Unterschied zwischen MB und MiB?", answer: "MB (Megabyte) = 1.000.000 Bytes (dezimal), während MiB (Mebibyte) = 1.048.576 Bytes (binär). Speichergeräte verwenden binär; Internet-Geschwindigkeiten verwenden typischerweise dezimal." },
      { question: "Speichert dieses Tool meine Speichereinheits-Konvertierungen?", answer: "Überhaupt nicht. Konvertierungen werden sofort in Ihrem Browser durchgeführt, ohne dass externe Aufrufe oder Datenprotokolle erfolgen." },
    ],
  },
  "fuel-economy": {
    howTo: {
      title: "Kraftstoffverbrauch umrechnen",
      steps: [
        "Wählen Sie Ihre Ausgangskraftstoffverbrauchseinheit (mpg, l/100km, km/l, etc.)",
        "Geben Sie den Kraftstoffverbrauchswert ein",
        "Wählen Sie Ihre Zielkraftstoffverbrauchseinheit",
        "Erhalten Sie Ihren umgerechneten Kraftstoffverbrauch",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen MPG, km/l, l/100km und anderen Effizienzeinheiten",
        "Unterstützung für US- und metrische Kraftstoffverbrauchsstandards",
        "Nützlich zum Vergleichen der Fahrzeugeffizienz über Regionen",
        "Sofort genaue Konvertierungen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Meilen pro Gallone (MPG) wird in den USA verwendet; Kilometer pro Liter (km/l) in vielen anderen Ländern",
        "Niedrigere l/100km-Werte zeigen bessere Kraftstoffeffizienz, das Gegenteil von MPG",
        "Vergleichen Sie Kraftstoffverbrauch beim Kauf von Gebrauchtwagen über verschiedene Regionen",
      ],
    },
    faq: [
      { question: "Warum ist die Effizienzskala für l/100km umgekehrt?", answer: "Liter pro 100km misst Verbrauch (niedriger ist besser), während MPG Entfernung pro Gallone misst (höher ist besser). Dies sind inverse Beziehungen." },
      { question: "Wie kann ich Kraftstoffkosten aus Effizienz schätzen?", answer: "Nehmen Sie Ihren Kraftstoffverbrauch (z.B. 25 MPG), teilen Sie die Entfernung durch diese Zahl (z.B. 500 Meilen ÷ 25 = 20 Gallonen), dann multiplizieren Sie mit dem Kraftstoffpreis." },
      { question: "Bleiben meine Kraftstoffverbrauch-Berechnungen privat?", answer: "Vollständig. Alle Konvertierungen erfolgen sofort in Ihrem Browser ohne Datenübertragung." },
    ],
  },

  // Number Converters
  "number-base": {
    howTo: {
      title: "Zwischen Zahlensystemen konvertieren",
      steps: [
        "Wählen Sie Ihr Quellzahlensystem (binär, dezimal, hexadezimal, oktal, etc.)",
        "Geben Sie die Zahl ein, die Sie konvertieren möchten",
        "Wählen Sie Ihr Zielzahlensystem",
        "Sehen Sie den konvertierten Zahlenwert",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen 5+ Zahlensystemen: binär, oktal, dezimal, hexadezimal, base32",
        "Unterstützung für positive und negative Zahlen",
        "Nützlich für Programmierung und Informatik",
        "Echtzeit-Konvertierung mit sofortigen Ergebnissen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Binär (Basis 2) ist die Grundlage aller Computeroperationen",
        "Hexadezimal (Basis 16) wird häufig in Webfarben und Speicheradressen verwendet",
        "Oktal (Basis 8) wurde historisch in der Informatik verwendet, ist aber heute weniger häufig",
      ],
    },
    faq: [
      { question: "Was ist der einfachste Weg, Dezimal in Binär zu konvertieren?", answer: "Wiederholt durch 2 teilen und die Reste notieren. Lesen Sie die Reste von unten nach oben für Ihr Binärergebnis. Dieses Tool macht es sofort." },
      { question: "Warum wird Hexadezimal in der Programmierung verwendet?", answer: "Hexadezimal ist kompakt (jede Ziffer repräsentiert 4 Bits) und lesbar. Farben (#FF5733), Speicheradressen und Bytecode verwenden hex effizient." },
      { question: "Sind meine Zahlensystem-Konvertierungsdaten privat?", answer: "Ja. Alle Konvertierungen werden sofort in Ihrem Browser durchgeführt, ohne externe Server oder Datenspeicherung." },
    ],
  },
  "roman-numeral": {
    howTo: {
      title: "Zu/von römischen Ziffern konvertieren",
      steps: [
        "Wählen Sie, ob Sie zu oder von römischen Ziffern konvertieren",
        "Geben Sie entweder eine Dezimalzahl oder römische Ziffer ein",
        "Sehen Sie die Konvertierung sofort",
        "Kopieren Sie das Ergebnis zur Verwendung in Dokumenten oder Designs",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie Dezimalzahlen zu römischen Ziffern und umgekehrt",
        "Unterstützung für Standard- und Vinculum (Überstrich) Notation für große Zahlen",
        "Verarbeitet Zahlen von 1 bis 3.999.999",
        "Nützlich für historische Daten, Gliederungen und formale Dokumente",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Römische Ziffern verwenden I=1, V=5, X=10, L=50, C=100, D=500, M=1000",
        "Eine Linie (Vinculum) über einer Ziffer multipliziert sie mit 1.000",
        "Subtraktive Notation (wie IV für 4) folgt bestimmten Regeln",
      ],
    },
    faq: [
      { question: "Warum wird 4 als IV und nicht IIII geschrieben?", answer: "Subtraktive Notation stellt einen kleineren Wert vor einen größeren, um Subtraktion zu bedeuten. IV (5-1=4) ist Standard, obwohl IIII auf einigen Uhren zur Symmetrie erscheint." },
      { question: "Wie stellt man Zahlen größer als 3.000 dar?", answer: "Ein Vinculum (horizontale Linie) über einer Ziffer multipliziert sie mit 1.000. Zum Beispiel V mit einer Linie darüber stellt 5.000 dar." },
      { question: "Bleibt meine Konvertierung vertraulich?", answer: "Absolut. Alle römischen Ziffernkonvertierungen erfolgen lokal in Ihrem Browser – keine Daten werden erfasst oder übertragen." },
    ],
  },
  "scientific-notation": {
    howTo: {
      title: "Wissenschaftliche Notation konvertieren",
      steps: [
        "Wählen Sie, ob Sie von dezimal oder wissenschaftlicher Notation konvertieren",
        "Geben Sie Ihre Zahl im ausgewählten Format ein",
        "Stellen Sie die Präzision für signifikante Stellen bei Bedarf ein",
        "Sehen Sie den konvertierten Wert sofort",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen dezimal und wissenschaftlicher Notation",
        "Unterstützung für sehr große und sehr kleine Zahlen",
        "Einstellbare Dezimalstellen und signifikante Stellen",
        "Essentiell für Physik, Chemie und Technik",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Wissenschaftliche Notation drückt Zahlen als a × 10^n aus, wobei 1 ≤ a < 10",
        "Verwenden Sie wissenschaftliche Notation für sehr große (wie die Entfernung zu Sternen) oder sehr kleine Zahlen (wie atomare Größen)",
        "Der Exponent zeigt, wie viele Stellen der Dezimalpunkt sich bewegt",
      ],
    },
    faq: [
      { question: "Wann sollte ich wissenschaftliche Notation verwenden?", answer: "Verwenden Sie wissenschaftliche Notation für sehr große Zahlen (wie die Entfernung zu Sternen) oder sehr kleine Zahlen (wie atomare Größen). Dies macht Werte leichter zu vergleichen und zu berechnen." },
      { question: "Wie interpretiere ich einen negativen Exponenten?", answer: "Ein negativer Exponent bedeutet, dass der Dezimalpunkt nach links rückt und eine kleine Zahl erzeugt. Zum Beispiel 2,5 × 10⁻³ entspricht 0,0025." },
      { question: "Verfolgt dieses Tool meine wissenschaftliche Notation-Arbeit?", answer: "Nein. Alle Konvertierungen werden sofort in Ihrem Browser berechnet, ohne Datenschutz-Bedenken." },
    ],
  },
  "fraction-decimal": {
    howTo: {
      title: "Brüche in Dezimalzahlen konvertieren",
      steps: [
        "Wählen Sie, ob Sie von Bruch oder Dezimal konvertieren",
        "Geben Sie Ihren Bruch (wie 3/4) oder Dezimalwert ein",
        "Passen Sie Präzisionseinstellungen bei Bedarf an",
        "Sehen Sie das konvertierte Ergebnis",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen Brüchen, Dezimalzahlen und Prozentzahlen",
        "Vereinfachen Sie Brüche automatisch auf ihre niedrigsten Terme",
        "Unterstützung für unechte Brüche und gemischte Zahlen",
        "Zeigen Sie sich wiederholende Dezimalzahlen klar an",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Teilen Sie den Zähler durch den Nenner, um einen Bruch in Dezimal zu konvertieren",
        "Häufige Brüche: 1/2 = 0,5, 1/4 = 0,25, 1/3 = 0,333...",
        "Vereinfachen Sie Brüche, indem Sie den größten gemeinsamen Teiler finden",
      ],
    },
    faq: [
      { question: "Was ist eine sich wiederholende Dezimalzahl und warum tritt sie auf?", answer: "Eine sich wiederholende Dezimalzahl tritt auf, wenn die Division niemals gleichmäßig endet. Zum Beispiel 1/3 = 0,333... wiederholt sich unendlich, weil 3 nicht gleichmäßig in Potenzen von 10 aufgeht." },
      { question: "Wie konvertiere ich 0,75 in einen Bruch?", answer: "Platzieren Sie die Dezimalzahl über der entsprechenden Potenz von 10 (0,75 = 75/100), dann vereinfachen Sie, indem Sie den GCD finden (75/100 = 3/4)." },
      { question: "Werden meine Bruchkonvertierungen irgendwo gespeichert?", answer: "Nein. Alle Konvertierungen sind sofortige browserbasierte Berechnungen ohne externe Verfolgung." },
    ],
  },
  "percentage": {
    howTo: {
      title: "Zu/von Prozentzahlen konvertieren",
      steps: [
        "Wählen Sie Ihren Eingabetyp: Prozentage, Dezimal oder Bruch",
        "Geben Sie den Wert ein, den Sie konvertieren möchten",
        "Wählen Sie das gewünschte Ausgabeformat",
        "Sehen Sie den konvertierten Prozentwert",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen Prozentzahlen, Dezimalzahlen und Brüchen",
        "Berechnen Sie prozentuale Änderungen und Unterschiede",
        "Zeigen Sie vereinfachte und dezimale Darstellungen",
        "Nützlich für Finanzen, Statistik und alltägliche Berechnungen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Prozentage bedeuten 'von hundert' - also 50% = 0,5 = 1/2",
        "Um prozentuale Änderung zu finden: (neu - alt) / alt × 100",
        "Häufige Prozentzahlen: 10% = 1/10, 25% = 1/4, 50% = 1/2, 75% = 3/4",
      ],
    },
    faq: [
      { question: "Wie berechne ich einen 20% Rabatt auf einen $50 Artikel?", answer: "Multiplizieren Sie: $50 × 0,20 = $10 Rabatt, also der Endpreis ist $50 - $10 = $40. Dieses Tool führt die Mathematik sofort durch." },
      { question: "Was ist der Unterschied zwischen Prozentage und Prozentpunkt?", answer: "Wenn etwas von 10% auf 15% steigt, ist es um 5 Prozentpunkte gestiegen, aber tatsächlich um 50% relativ gewachsen (10% → 15% ist ein 50% Anstieg)." },
      { question: "Sind meine Prozentrechnungsdaten privat?", answer: "Vollständig. Alle Prozentrechnungen erfolgen lokal in Ihrem Browser ohne Datenübertragung." },
    ],
  },

  // Color Tools
  "color-converter": {
    howTo: {
      title: "Farbformate konvertieren",
      steps: [
        "Wählen Sie Ihr Quellfarbenformat (HEX, RGB, HSL, CMYK, etc.)",
        "Geben Sie den Farbwert ein oder wählen Sie eine Farbe aus der Farbwähler",
        "Wählen Sie Ihr Zielfarbenformat",
        "Sehen Sie den konvertierten Farbcode sofort",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen HEX, RGB, HSL, CMYK, HSV und benannten Farben",
        "Interaktive Farbwähler für visuelle Farbauswahl",
        "Kopieren Sie Farbcodes direkt in die Zwischenablage",
        "Vorschau der Farbe während der Konvertierung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "HEX-Format (#RRGGBB) ist am häufigsten für Webdesign",
        "HSL (Farbton, Sättigung, Helligkeit) ist intuitiver für manuelle Farbanpassungen",
        "CMYK wird für Druckdesign verwendet; RGB für digitale Bildschirme",
      ],
    },
    faq: [
      { question: "Sollte ich RGB oder HEX für Webfarben verwenden?", answer: "Beides funktioniert für Web – HEX (#FF5733) ist kompakter und häufig in Stylesheets, während RGB besser für dynamische Berechnungen in JavaScript ist." },
      { question: "Warum sieht meine Druckfarbe anders aus als auf dem Bildschirm?", answer: "Bildschirme verwenden RGB (lichtbasiert), während Drucker CMYK (tinttenbasiert) verwenden. Farbräume unterscheiden sich, also immer Drucke in der Vorschau ansehen oder CMYK-Farbprofile verwenden." },
      { question: "Speichert dieses Tool meine Farbauswahlen?", answer: "Nein. Alle Farbkonvertierungen erfolgen sofort in Ihrem Browser – nichts wird gespeichert oder übertragen." },
    ],
  },
  "color-palette-generator": {
    howTo: {
      title: "Farbpaletten generieren",
      steps: [
        "Wählen Sie Ihre Basisfarbe oder geben Sie einen HEX-Code ein",
        "Wählen Sie ein Farbharmonie-Schema (komplementär, Triade, analog, etc.)",
        "Passen Sie die Palettenintensität oder Sättigung bei Bedarf an",
        "Exportieren oder kopieren Sie die generierte Farbpalette",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Generieren Sie harmonische Farbpaletten aus einer einzigen Farbe",
        "Unterstützung für mehrere Farbharmonie-Schemata",
        "Einstellbare Sättigungs- und Helligkeitssteuerungen",
        "Exportieren Sie Paletten als CSS, JSON oder Bildformate",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Komplementärfarben (gegenüber auf Farbrad) erzeugen starken Kontrast",
        "Analoge Farben (benachbart auf Rad) erzeugen harmonische, ruhige Paletten",
        "Begrenzen Sie Paletten auf 3-5 Farben für professionelle Design-Konsistenz",
      ],
    },
    faq: [
      { question: "Was ist der Unterschied zwischen Triade und Tetradic-Paletten?", answer: "Triade verwendet 3 gleichmäßig verteilte Farben auf dem Rad zur Balance; Tetradic (Split-Komplementär) verwendet 4 Farben für mehr Vielfalt bei Beibehaltung der Harmonie." },
      { question: "Wie viele Farben sollte mein Design verwenden?", answer: "Halten Sie es einfach: 1 primär, 1-2 sekundär, 1-2 Akzentfarben. Zu viele Farben erzeugen visuelles Chaos und fühlen sich unprofessionell an." },
      { question: "Werden meine Palettenauswahlen privat gehalten?", answer: "Absolut. Alle Palettengenerierungen erfolgen in Ihrem Browser ohne externe Kommunikation." },
    ],
  },
  "gradient-generator": {
    howTo: {
      title: "CSS-Verläufe generieren",
      steps: [
        "Wählen Sie Verlaufstyp (linear, radial, konisch)",
        "Wählen oder passen Sie Ihre Start- und Endfarben an",
        "Passen Sie Verlaufswinkel oder Position bei Bedarf an",
        "Kopieren Sie den generierten CSS-Code zur Verwendung in Ihrem Projekt",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Erstellen Sie linear, radial und konische Verläufe visuell",
        "Generieren Sie produktionsfertigen CSS-Code",
        "Unterstützung für mehrere Farbstopps",
        "Echtzeit-Vorschau von Verlaufseffekten",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Lineare Verläufe fließen in eine Richtung (90deg für vertikal, 180deg für horizontal)",
        "Radiale Verläufe entstehen aus Mittelpunkt (gut für Spotlights)",
        "Verwenden Sie Farbstopps, um Multi-Farb-Verläufe reibungslos zu erstellen",
      ],
    },
    faq: [
      { question: "Was ist der Unterschied zwischen 'to right' und '90deg' in CSS-Verläufen?", answer: "Sie sind gleichwertig – 'to right' ist die Schlüsselwortsyntax, während '90deg' Grad verwendet. 'to right' ist lesbarer, aber '90deg' bietet mehr Präzision." },
      { question: "Kann ich Verläufe auf Text verwenden?", answer: "Ja, mit der CSS-Eigenschaft 'background-clip: text' kombiniert mit '-webkit-text-fill-color: transparent'. Dieses Tool generiert den benötigten Verlaufscode." },
      { question: "Ist meine Verlaufsarbeit privat?", answer: "Vollständig. Alle Verlaufsgenerierungen erfolgen in Ihrem Browser ohne externe Datenerfassung." },
    ],
  },
  "color-contrast-checker": {
    howTo: {
      title: "Farbkontrast überprüfen",
      steps: [
        "Wählen oder geben Sie Ihre Vordergrundfarbe (Text) ein",
        "Wählen Sie oder geben Sie Ihre Hintergrundfarbe ein",
        "Sehen Sie das Kontrastverhältnis und WCAG-Compliance-Niveau",
        "Passen Sie Farben an, falls erforderlich, um Barrierefreiheitsstandards zu erfüllen",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Berechnen Sie WCAG-Kontrastverhältnis zwischen zwei Farben",
        "Überprüfen Sie die Compliance mit AA- und AAA-Barrierefreiheitsstandards",
        "Geben Sie Vorschläge zur Verbesserung des Kontrasts",
        "Interaktive Farbwähler für einfache Anpassung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "WCAG AA benötigt Mindest-4,5:1 Kontrast für normalen Text",
        "WCAG AAA benötigt Mindest-7:1 Kontrast für erweiterte Barrierefreiheit",
        "Dunkler Text auf hellem Hintergrund bietet in der Regel bessere Lesbarkeit",
      ],
    },
    faq: [
      { question: "Was bedeutet ein Kontrastverhältnis von 4,5:1 tatsächlich?", answer: "Es ist das Verhältnis der helleren zur dunkleren Farbe Helligkeit. Ein 4,5:1 Verhältnis ist lesbar für Menschen mit moderatem Sehverlust; 7:1 ist besser für jeden." },
      { question: "Haben große Texte unterschiedliche Kontrastanforderungen?", answer: "Ja. Großer Text (18pt+ oder 14pt fett) benötigt nur 3:1 Kontrast für WCAG AA, während normaler Text 4,5:1 benötigt. Dies berücksichtigt Unterschiede in der Lesbarkeit." },
      { question: "Kann ich darauf für Barrierefreiheitstests verlassen?", answer: "Dieses Tool verwendet Standard-WCAG-Formeln, aber kombinieren Sie es mit echtem Benutzertest. Was mathematisch funktioniert, sollte immer mit echten Nutzern getestet werden." },
    ],
  },
  "color-blindness-simulator": {
    howTo: {
      title: "Farbenblindheit simulieren",
      steps: [
        "Laden Sie ein Bild hoch oder wählen Sie eine Farbe zum Testen",
        "Wählen Sie den Typ der Farbenblindheit zur Simulation",
        "Sehen Sie, wie die Farben für Menschen mit dieser Bedingung erscheinen",
        "Passen Sie Ihr Design an, um Klarheit für alle Benutzer zu gewährleisten",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Simulieren Sie Protanopie, Deuteranopie, Tritanopie und Monochromacy",
        "Testen Sie Bilder oder benutzerdefinierte Farben auf Barrierefreiheit",
        "Nebeneinander-Vergleich von Original- und simulierter Ansicht",
        "Helfen Sie sicherzustellen, dass Designs inklusiv und lesbar sind",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Protanopie (Rotblindheit) betrifft etwa 1% der Männer",
        "Vermeiden Sie, nur Rot-Grün-Unterscheidung zu verwenden, um Informationen zu vermitteln",
        "Verwenden Sie Muster, Formen oder Textbeschriftungen neben Farben zur Klarheit",
      ],
    },
    faq: [
      { question: "Wie häufig ist Farbenblindheit?", answer: "Etwa 8% der Männer und 0,5% der Frauen haben irgendeine Form von Rot-Grün-Farbenblindheit. Blau-Gelb-Farbenblindheit ist seltener (0,001%). Viele sind sich ihrer nicht bewusst." },
      { question: "Ist Farbenblindheit das gleiche wie in Graustufen sehen?", answer: "Nicht immer. Die meiste Farbenblindheit ist Rot-Grün-Verwirrung, wo Farben sich verschieben, nicht vollständig graustufen. Vollständige Monochromacy (vollständige Farbenblindheit) ist sehr selten." },
      { question: "Wird mein Testbild gespeichert?", answer: "Ja. Alle Simulationen erfolgen lokal in Ihrem Browser – Bilder werden niemals hochgeladen oder gespeichert." },
    ],
  },

  // Date/Time
  "timezone": {
    howTo: {
      title: "Zeitzonen konvertieren",
      steps: [
        "Wählen Sie Ihre Quellzeitzone aus der Liste",
        "Geben Sie das Datum und die Uhrzeit ein, die Sie konvertieren möchten",
        "Wählen Sie Ihre Zielzeitzone",
        "Sehen Sie die konvertierte Uhrzeit in der Zielzone",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen 400+ Zeitzonen weltweit",
        "Berücksichtigung der Sommerzeit automatisch",
        "UTC-Offset für Referenz anzeigen",
        "Nützlich für die Planung von Meetings über Regionen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "UTC (Koordinierte Universalzeit) ist der Referenzstandard für alle Zeitzonen",
        "Sommerzeit wird nicht in allen Ländern beobachtet",
        "Überprüfen Sie lokale Zeitunterschiede bei der Planung internationaler Anrufe",
      ],
    },
    faq: [
      { question: "Beobachten alle Länder Sommerzeit?", answer: "Nein. Die meisten von Europa und Nordamerika tun dies, aber viele Länder in der Nähe des Äquators und in Asien/Afrika nicht. Überprüfen Sie immer beide Standorte." },
      { question: "Was ist der Unterschied zwischen UTC, GMT und Zulu-Zeit?", answer: "UTC ist der internationale Standard. GMT (Greenwich Mean Time) ist ähnlich, berücksichtigt aber keine Schaltsekunden. Zulu ist Luftfahrt-/Militärslang für UTC." },
      { question: "Wird meine Zeitzonen-Abfrage gespeichert?", answer: "Nein. Alle Zeitzonkonvertierungen erfolgen sofort in Ihrem Browser ohne externe Kommunikation." },
    ],
  },
  "unix-timestamp": {
    howTo: {
      title: "Unix-Zeitstempel konvertieren",
      steps: [
        "Wählen Sie zwischen Konvertierung zu oder von Unix-Zeitstempel",
        "Geben Sie Ihren Zeitstempel (in Sekunden) oder menschenlesbare Datum ein",
        "Wählen Sie Ihre Zeitzone zur Genauigkeit",
        "Sehen Sie den konvertierten Zeitstempel oder das Datum",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen Unix-Zeitstempel und menschenlesbare Daten",
        "Unterstützung für Millisekunden und Mikrosekunden",
        "Zeitzone-bewusste Konvertierungen",
        "Essentiell für Programmierung und Server-Protokolle",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Unix-Zeitstempel (Epoche) beginnt am 1. Januar 1970 um 00:00:00 UTC",
        "Die meisten Systeme verwenden Sekunden, aber manche APIs verwenden Millisekunden",
        "Zeitstempel sind immer in UTC, unabhängig von Ihrer lokalen Zeitzone",
      ],
    },
    faq: [
      { question: "Warum beginnt Unix-Zeit bei 1970?", answer: "Willkürliche Wahl durch frühe Unix-Entwickler. Es ist ein Bezugspunkt, von dem alle Zeitstempel berechnet werden. Das System verarbeitet Datumkonvertierungen automatisch." },
      { question: "Was ist der Unterschied zwischen Millisekunden und Sekunden in Zeitstempel?", answer: "Sekunden haben niedrigere Präzision aber kleinere Zahlen; Millisekunden (1/1000 Sek.) sind besser für präzise Zeitmessung. Die meisten modernen APIs verwenden Millisekunden." },
      { question: "Kann ich diesem Tool für Server-Protokollierung vertrauen?", answer: "Ja. Die Zeitstempel-Konvertierungen verwenden Standard-UTC-Berechnungen. Überprüfen Sie die Einstellungen der Zeitzone Ihres Servers für Produktionsgenauigkeit." },
    ],
  },
  "date-format": {
    howTo: {
      title: "Datumformate konvertieren",
      steps: [
        "Wählen Sie Ihr Quelldatumformat",
        "Geben Sie das Datum in diesem Format ein",
        "Wählen Sie Ihr Zieldatumformat",
        "Kopieren Sie das neu formatierte Datum zur Verwendung",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Unterstützung für 20+ Datumformatvariationen",
        "Konvertieren Sie zwischen regionalen Datumformaten (MM/DD/YYYY vs DD/MM/YYYY)",
        "Zeitkomponenten einbeziehen oder ausschließen, wie gewünscht",
        "Vermeiden Sie Datumverwirrung in internationalen Kontexten",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "US-Format: MM/DD/YYYY; Internationales Format: DD/MM/YYYY",
        "ISO 8601 (YYYY-MM-DD) ist der internationale Standard für Datenaustausch",
        "Klären Sie immer Datumformat in der Geschäftskommunikation, um Missverständnisse zu vermeiden",
      ],
    },
    faq: [
      { question: "Welches Datumformat sollte ich international verwenden?", answer: "ISO 8601 (YYYY-MM-DD) ist der globale Standard und maschinenlesbar. Es vermeidet Mehrdeutigkeit – keine Verwirrung zwischen 03/04/2025 (3. März oder 4. März)." },
      { question: "Kann ich die Uhrzeit in Datumkonvertierungen einbeziehen?", answer: "Ja. Dieses Tool unterstützt Datum+Zeit-Konvertierungen. Geben Sie Ihr Quellenformat einschließlich der Zeitkomponente an und es konvertiert beides." },
      { question: "Werden meine Datumkonvertierungsdaten verfolgt?", answer: "Nein. Alle Konvertierungen erfolgen sofort in Ihrem Browser ohne Datenverfolgung oder Übertragung." },
    ],
  },
  "date-calculator": {
    howTo: {
      title: "Datum-Rechner verwenden",
      steps: [
        "Wählen Sie Ihre Operation (Tage addieren, Daten subtrahieren, Wochentag finden, etc.)",
        "Geben Sie Ihr Datum/Ihre Daten ein",
        "Geben Sie die Anzahl der Tage, Monate oder Jahre an, um zu addieren/subtrahieren",
        "Sehen Sie das berechnete Ergebnis",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Addieren oder subtrahieren Sie Tage, Monate und Jahre von Daten",
        "Berechnen Sie die Differenz zwischen zwei Daten",
        "Bestimmen Sie den Wochentag für jedes Datum",
        "Berücksichtigen Sie automatisch Schaltjahre",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Schaltjahre treten alle 4 Jahre auf (außer Jahrhunderte nicht durch 400 teilbar)",
        "Verwenden Sie Datumberechnungen für Projekt-Deadlines und Meilenstein-Planung",
        "Monatslängen variieren: Merken Sie sich \"30 Tage hat September, April, Juni und November\"",
      ],
    },
    faq: [
      { question: "Wie berechnest du Geschäftstage vs. Kalendertage?", answer: "Dieses Tool berechnet Kalendertage (alle 365). Für Geschäftstage müssen Sie Wochenenden und Feiertage manuell ausschließen. Verwenden Sie dies als Basis und passen Sie an." },
      { question: "Verarbeitet dies Schaltjahre korrekt?", answer: "Ja. Der Rechner berücksichtigt automatisch Schaltjahre (alle 4 Jahre, außer Jahrhunderte nicht durch 400 teilbar). Der 29. Februar wird richtig einbezogen." },
      { question: "Ist meine Datumberechnung privat?", answer: "Absolut. Alle Berechnungen erfolgen sofort in Ihrem Browser ohne Datenerfassung." },
    ],
  },
  "age-calculator": {
    howTo: {
      title: "Berechne dein Alter",
      steps: [
        "Geben Sie Ihr Geburtsdatum ein",
        "Wählen Sie das heutige Datum oder ein spezifisches Referenzdatum",
        "Sehen Sie Ihr Alter in Jahren, Monaten und Tagen",
        "Sehen Sie zusätzliche Informationen wie insgesamt gelebte Tage",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Berechne Alter in Jahren, Monaten und Tagen mit Präzision",
        "Zeige insgesamt Tage, Stunden und Minuten gelebt",
        "Bestimme den Wochentag der Geburt",
        "Perfekt für Geburtstags-Planung und Meilenstein-Verfolgung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Alter ändert sich an Ihrem Geburtstag jedes Jahr",
        "Einige Kulturen berechnen Alter unterschiedlich (addieren 1 bei Geburt in Korea)",
        "Behalten Sie wichtige Altersangaben für rechtliche Dokumente (Wählen, Fahren, Verträge) im Auge",
      ],
    },
    faq: [
      { question: "Beeinflussen Schaltjahrs-Geburtstage die Altersberechnung?", answer: "Personen, die am 29. Februar geboren sind, feiern typischerweise ihren \"offiziellen\" Geburtstag am 28. Februar oder 1. März in Nicht-Schaltjahren. Dieses Tool erkennt das aktuelle Datum korrekt." },
      { question: "Wie werden unterschiedliche Kulturen-Alterberechnungsmethoden verarbeitet?", answer: "Dieses Tool verwendet den westlichen Standard (Alter erhöht sich an Ihrem Geburtstag). Koreanische und einige asiatische Kulturen addieren 1 bei Geburt; Sie können diese Ergebnisse anpassen müssen." },
      { question: "Werden Altersberechnungsdaten gespeichert?", answer: "Nein. Alle Berechnungen sind sofort und browserbasiert ohne Datenprotokolle." },
    ],
  },

  // Data Format
  "json-yaml": {
    howTo: {
      title: "JSON zu YAML konvertieren",
      steps: [
        "Fügen Sie Ihre JSON-Daten in das Eingabefeld ein",
        "Klicken Sie auf Konvertieren, um in YAML-Format zu transformieren",
        "Überprüfen Sie die YAML-Ausgabe auf Syntax",
        "Kopieren Sie das YAML zur Verwendung in Konfigurationsdateien",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Bidirektionale Konvertierung zwischen JSON und YAML",
        "Automatische Syntax-Überprüfung",
        "Bewahren Sie Datenstruktur und Typen",
        "Nützlich für Konfigurationsdateien und Datenserialisierung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "YAML ist menschenlesbarer, aber JSON ist breiter unterstützt",
        "YAML verwendet Einzug, um Struktur statt Klammern anzuzeigen",
        "Seien Sie vorsichtig mit YAML-Sonderzeichen und Anführungszeichen",
      ],
    },
    faq: [
      { question: "Warum würde ich YAML über JSON wählen?", answer: "YAML ist leichter für Menschen zu lesen/schreiben (keine Klammern, saubere Syntax), daher beliebt für Konfigurationsdateien. JSON ist besser für APIs und Datenaustausch." },
      { question: "Kann ich YAML zu JSON konvertieren?", answer: "Ja. Dieses Tool unterstützt bidirektionale Konvertierung. Fügen Sie YAML ein, wählen Sie \"YAML zu JSON\", und erhalten Sie gültige JSON-Ausgabe." },
      { question: "Werden meine Konvertierungsdaten freigegeben?", answer: "Nein. Alle Konvertierungen erfolgen vollständig in Ihrem Browser ohne externe Übertragung." },
    ],
  },
  "json-csv": {
    howTo: {
      title: "JSON zu CSV konvertieren",
      steps: [
        "Fügen Sie Ihre JSON-Array-Daten in das Eingabefeld ein",
        "Passen Sie Spalten-Header bei Bedarf an",
        "Stellen Sie Optionen für Trennzeichen und Anführungszeichen ein",
        "Laden Sie die CSV-Ausgabe herunter oder kopieren Sie sie",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie JSON-Arrays in CSV-Tabellen",
        "Anpassbare Trennzeichen (Komma, Tabulator, Semikolon)",
        "Verarbeiten Sie verschachtelte Objekte und Arrays",
        "Nützlich für Excel und Tabellenkalkulationen-Importe",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "CSV-Format ist Komma-getrennte Werte, weit verbreitet in Excel",
        "Stellen Sie sicher, dass JSON ein Array von Objekten ist für saubere CSV-Konvertierung",
        "Testen Sie CSV-Import in Ihrer Zielanwendung vor der Verarbeitung",
      ],
    },
    faq: [
      { question: "Welche JSON-Struktur funktioniert am besten für CSV-Konvertierung?", answer: "Ein Array von Objekten, wobei jedes Objekt eine Zeile ist. Beispiel: [{name: 'John', age: 30}, {name: 'Jane', age: 25}] wird zu einer Tabelle mit Name und Alter Spalten." },
      { question: "Wie werden verschachtelte Objekte in CSV verarbeitet?", answer: "Flaches CSV kann verschachtelte Strukturen nicht direkt darstellen. Dieses Tool entweder vereinfacht sie zu kombinierten Spalten oder konvertiert sie zu separaten Tabellen, je nach Tiefe." },
      { question: "Werden meine JSON-Daten während der Konvertierung privat gehalten?", answer: "Vollständig privat. Alle JSON-zu-CSV-Konvertierungen erfolgen in Ihrem Browser ohne externe Zugriffe." },
    ],
  },
  "json-xml": {
    howTo: {
      title: "JSON zu XML konvertieren",
      steps: [
        "Geben Sie Ihre JSON-Daten in das Eingabefeld ein",
        "Konfigurieren Sie XML-Wurzelelement und Formatierungsoptionen",
        "Klicken Sie auf Konvertieren, um XML zu generieren",
        "Kopieren oder laden Sie die XML-Ausgabe herunter",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen JSON und XML Formaten",
        "Passen Sie Wurzelelement-Namen an",
        "Bewahren Sie Attribut-Daten korrekt",
        "Nützlich für API-Integrationen und Legacy-Systeme",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "XML ist ausführlich, aber menschenlesbar und weit verbreitet",
        "JSON und XML können dieselben Daten unterschiedlich darstellen",
        "Stellen Sie sicher, dass beide Formate gültig sind",
      ],
    },
    faq: [
      { question: "Warum wird XML noch verwendet, wenn JSON einfacher ist?", answer: "XML ist älter und weit verbreitet in Legacy-Systemen (SOAP APIs, Enterprise-Software). JSON ist modern und bevorzugt für neue Projekte, aber XML-Integration ist noch essentiell." },
      { question: "Wie konvertieren JSON-Attribute zu XML?", answer: "JSON-Objekte werden zu XML-Elementen, und Arrays werden zu wiederholten Elementen. Attribute sind knifflig – JSON hat kein natives Attribut-Konzept, daher werden sie oft zu untergeordneten Elementen." },
      { question: "Ist meine JSON/XML-Konvertierung privat?", answer: "Ja. Alle Konvertierungen erfolgen sofort in Ihrem Browser ohne Datenübertragung." },
    ],
  },
  "json-toml": {
    howTo: {
      title: "JSON zu TOML konvertieren",
      steps: [
        "Fügen Sie Ihre JSON-Konfigurationsdaten ein",
        "Konfigurieren Sie TOML-Formatierungsvorlieben",
        "Konvertieren Sie zu TOML-Format",
        "Kopieren Sie das TOML zur Verwendung in Konfigurationsdateien",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Bidirektionale JSON und TOML Konvertierung",
        "Unterstützung für verschachtelte Tabellen und Arrays",
        "Bewahren Sie Datentypen in beide Richtungen",
        "Beliebt in Rust und modernen Webframeworks",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "TOML (Tom's Obvious, Minimal Language) ist für Minimalität und Klarheit konzipiert",
        "TOML wird häufig in Cargo.toml für Rust-Projekte verwendet",
        "Achten Sie auf TOML-spezifische Syntax wie Tabellenheader [section]",
      ],
    },
    faq: [
      { question: "Sollte ich TOML oder YAML für Konfigurationsdateien verwenden?", answer: "TOML ist einfacher und expliziter (gut für einfache Configs). YAML ist leistungsfähiger aber flexibel genug, um verwirrt zu sein. Wählen Sie basierend auf Komplexität." },
      { question: "Wie definiere ich verschachtelte Tabellen in TOML?", answer: "Verwenden Sie Bracket-Notation: [section.subsection]. Jedes Klammerpaar erstellt eine verschachtelte Tabelle. Halten Sie Verschachtelung flach für Lesbarkeit." },
      { question: "Werden meine TOML-Konvertierungsdaten gespeichert?", answer: "Nein. Alle Konvertierungen sind sofort und browserbasiert – vollständig privat." },
    ],
  },
  "markdown-html": {
    howTo: {
      title: "Markdown zu HTML konvertieren",
      steps: [
        "Schreiben oder fügen Sie Ihren Markdown-Inhalt ein",
        "Sehen Sie die HTML-Ausgabe in Echtzeit in der Vorschau",
        "Passen Sie Formatierung bei Bedarf an",
        "Kopieren Sie den HTML-Code zum Einbetten",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie Markdown zu sauberem HTML mit korrekter Formatierung",
        "Unterstützung für Tabellen, Code-Blöcke und Listen",
        "Live-Vorschau des gerenderten Ausgabe",
        "Option, CSS-Styling zu Ausgabe hinzuzufügen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Markdown verwendet # für Überschriften, * für Fett, > für Zitate",
        "Markdown ist leichter zu schreiben, aber HTML ist für Web-Anzeige erforderlich",
        "Verwenden Sie triple backticks für Code-Blöcke in Markdown",
      ],
    },
    faq: [
      { question: "Wie mache ich einen Link in Markdown?", answer: "Verwenden Sie [Link-Text](url). Zum Beispiel: [Google](https://google.com). Sie können auch Referenz-Style-Links für saubere Syntax verwenden." },
      { question: "Kann ich Bilder in Markdown einbetten?", answer: "Ja. Verwenden Sie ![Alt-Text](Image-url). Der Alt-Text beschreibt das Bild für Barrierefreiheit und erscheint, wenn das Bild nicht lädt." },
      { question: "Wird meine Markdown-Konvertierung privat gehalten?", answer: "Vollständig. Alle Markdown-zu-HTML-Konvertierungen erfolgen in Ihrem Browser – keine externe Übertragung." },
    ],
  },
  "csv-table": {
    howTo: {
      title: "CSV zu Tabelle konvertieren",
      steps: [
        "Fügen Sie Ihre CSV-Daten in den Eingabebereich ein",
        "Konfigurieren Sie Trennzeichen und Formatierungsoptionen",
        "Sehen Sie die formatierte Tabellen-Vorschau",
        "Kopieren oder exportieren Sie die Tabelle nach Bedarf",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie CSV-Daten zu formatierten HTML-Tabellen",
        "Unterstützung für benutzerdefinierte Trennzeichen und Anführungszeichen",
        "Vorschau der Tabellen-Renderung in Echtzeit",
        "Exportieren Sie als HTML, JSON oder Markdown",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Die erste Zeile enthält oft Header - kennzeichnen Sie diese für spezielle Formatierung",
        "Verarbeiten Sie Kommas in angeführten Feldern korrekt",
        "Testen Sie Tabellen-Layout auf Mobilgeräten auf Responsivität",
      ],
    },
    faq: [
      { question: "Wie verarbeite ich Kommas in CSV-Daten?", answer: "Setzen Sie das Feld mit Kommas in Anführungszeichen. Beispiel: 'Smith, John',30,Ingenieur wird zu einem einzelnen Feld statt geteilten Spalten." },
      { question: "Welche Trennzeichen unterstützt dieses Tool?", answer: "Komma (Standard), Semikolon, Tabulator und Pipe. Wählen Sie das Trennzeichen, das Ihrem CSV-Format entspricht – verschiedene Regionen bevorzugen unterschiedliche Standards." },
      { question: "Werden meine CSV-Daten vertraulich gehalten?", answer: "Ja. Alle CSV-zu-Tabelle-Konvertierungen erfolgen sofort in Ihrem Browser ohne Datenerfassung." },
    ],
  },
  "json-typescript": {
    howTo: {
      title: "TypeScript-Typen aus JSON generieren",
      steps: [
        "Fügen Sie Ihre JSON-Beispieldaten ein",
        "Konfigurieren Sie Benennungs- und Formatierungsoptionen",
        "Generieren Sie TypeScript-Schnittstellen automatisch",
        "Kopieren Sie die Typ-Definitionen in Ihr Projekt",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Generieren Sie TypeScript-Schnittstellen aus JSON-Beispielen",
        "Unterstützung für verschachtelte Objekte und Arrays",
        "Automatische Typ-Inferenz (string, number, boolean, null)",
        "Sparen Sie Zeit bei manuellen Typ-Definitionen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Geben Sie umfassende JSON-Beispiele für genaue Typ-Generierung",
        "Überprüfen Sie generierte Typen manuell auf Edge-Cases",
        "Verwenden Sie optionale Eigenschaften (?) für Felder, die möglicherweise nicht immer existieren",
      ],
    },
    faq: [
      { question: "Warum sollte ich generierte Typen statt 'any' verwenden?", answer: "Generierte Typen fangen Fehler zur Kompilierzeit ab, ermöglichen IDE-Autovervollständigung und dokumentieren Ihre Datenstruktur. 'any' besiegt TypeScripts Vorteile und versteckt Fehler." },
      { question: "Wie genau ist die automatische Typ-Inferenz?", answer: "Sehr genau für einfache Felder, aber Edge-Cases zählen. Wenn ein Feld manchmal null/undefined ist, markieren Sie es manuell als optional (?). Geben Sie umfassende Beispieldaten." },
      { question: "Werden meine JSON-Daten an Server gesendet?", answer: "Nein. Alle Typ-Generierungen erfolgen sofort in Ihrem Browser – vollständig lokal und privat." },
    ],
  },
  "sql-json": {
    howTo: {
      title: "SQL zu JSON konvertieren",
      steps: [
        "Geben Sie Ihre SQL SELECT Query-Ergebnisse oder Beispieldaten ein",
        "Konfigurieren Sie JSON-Struktur-Vorlieben",
        "Generieren Sie JSON aus SQL-Daten",
        "Kopieren Sie das JSON zur Verwendung in APIs oder Anwendungen",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie SQL-Query-Ergebnisse zu JSON-Format",
        "Passen Sie JSON-Struktur und Verschachtelung an",
        "Unterstützung für verschiedene SQL-Dialekte",
        "Nützlich für API-Entwicklung und Datenmigration",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "JSON-Darstellung erfordert Spaltennamen als Schlüssel",
        "Array-Ausgabe für mehrere Zeilen ist effizienter",
        "Testen Sie Datentypen, um richtige JSON-Serialisierung zu gewährleisten",
      ],
    },
    faq: [
      { question: "Wie konvertiere ich tatsächliche SQL-Query-Ergebnisse?", answer: "Führen Sie Ihre SELECT Query in Ihrem Datenbank-Client aus, exportieren oder kopieren Sie die Ergebnisse, fügen Sie sie dann hier ein. Dieses Tool funktioniert mit Query-Ausgabe, nicht Live-Datenbankverbindungen." },
      { question: "Welche SQL-Formate werden unterstützt?", answer: "Die meisten SQL-Dialekte (MySQL, PostgreSQL, SQLite, SQL Server) produzieren Ausgaben, die dieses Tool verarbeiten kann. Tabulatorgetrennte und Komma-getrennte Ergebnisse funktionieren." },
      { question: "Werden meine SQL-Daten irgendwo gespeichert?", answer: "Nein. Alle SQL-zu-JSON-Konvertierungen erfolgen sofort in Ihrem Browser mit vollständiger Datenschutz." },
    ],
  },

  // CSS/Web
  "px-rem": {
    howTo: {
      title: "PX zu REM konvertieren",
      steps: [
        "Stellen Sie Ihre Basis-Schriftgröße ein (typischerweise 16px)",
        "Geben Sie den Pixelwert ein, den Sie konvertieren möchten",
        "Sehen Sie den entsprechenden REM-Wert",
        "Verwenden Sie den REM-Wert in Ihren CSS-Stylesheets",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie präzise zwischen Pixel- und REM-Einheiten",
        "Passen Sie die Basis-Schriftgröße für verschiedene Design-Systeme an",
        "Bidirektionale Konvertierung",
        "Essentiell für skalierbare, zugängliche Web-Designs",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "REM ist relativ zur Root-Schriftgröße; 1 REM entspricht typischerweise 16px standardmäßig",
        "Mit REM wird die Barrierefreiheit verbessert, da Benutzer die Basis-Schriftgröße anpassen können",
        "Die meisten Design-Systeme verwenden 16px als Basis, was 1 REM = 16px Mathematik einfach macht",
      ],
    },
    faq: [
      { question: "Warum sollte ich REM statt PX verwenden?", answer: "REM respektiert Benutzer-Schriftvorlieben. Wenn ein Benutzer ihren Browser auf 18px Schrift setzt, wird Ihr 1rem automatisch 18px. PX ignoriert Benutzer-Einstellungen und schadet Barrierefreiheit." },
      { question: "Welche Basis-Schriftgröße sollte ich verwenden?", answer: "16px ist Standard. Manche verwenden 10px (für einfachere Mathematik wie 10px = 0.625rem), aber 16px ist barrierefreier. Überprüfen Sie Ihr Design-System." },
      { question: "Sind meine Konvertierungsdaten privat?", answer: "Vollständig. Alle PX-zu-REM-Konvertierungen erfolgen sofort in Ihrem Browser." },
    ],
  },
  "px-em": {
    howTo: {
      title: "PX zu EM konvertieren",
      steps: [
        "Stellen Sie die Schriftgröße des übergeordneten Elements ein",
        "Geben Sie den umzurechnenden Pixelwert ein",
        "Sehen Sie den EM-Äquivalent",
        "Wenden Sie den EM-Wert relativ zum übergeordneten an",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen Pixel- und EM-Einheiten mit übergeordneter Referenz",
        "Unterstützung für verschachtelte EM-Berechnungen",
        "Nützlich für responsive Typografie",
        "Bessere Skalierung für komponentenbasiertes Design",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "EM ist relativ zur Schriftgröße des übergeordneten Elements",
        "1 EM = Schriftgröße des übergeordneten Elements",
        "Verschachtelte EM-Werte multiplizieren (0,5 EM in 0,5 EM übergeordnet = 0,25 der Wurzel)",
      ],
    },
    faq: [
      { question: "Wann sollte ich EM statt REM verwenden?", answer: "Verwenden Sie REM für globale Größe (Margin, Padding, Schriftgröße). Verwenden Sie EM für komponenten-scoped Größe, wo Sie Skalierung relativ zur Komponenten-Schriftgröße möchten." },
      { question: "Warum multiplizieren sich verschachtelte EMs?", answer: "Ein Element mit 0,8em in einem übergeordneten mit 0,8em bedeutet: Kind = übergeordnet(0,8em) × 0,8 = 0,64 der Großeltern. Dies kann zu unerwartetem Kaskadenverhalten führen; REM vermeidet dies." },
      { question: "Wird meine EM-Konvertierung privat gehalten?", answer: "Ja. Alle Konvertierungen erfolgen sofort in Ihrem Browser ohne Datenerfassung." },
    ],
  },
  "px-percent": {
    howTo: {
      title: "PX zu Prozent konvertieren",
      steps: [
        "Stellen Sie die Breite des übergeordneten Containers ein",
        "Geben Sie die Pixelbreite ein, die Sie konvertieren möchten",
        "Sehen Sie das prozentuale Äquivalent",
        "Verwenden Sie Prozentage für responsive Layouts",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie Pixel-Breiten zu Prozentzahlen für responsive Designs",
        "Passen Sie die Größe des übergeordneten Containers für Kontext an",
        "Nützlich für fluid Layouts und flexible Komponenten",
        "Helfen Sie, mobile-responsive Designs zu erstellen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Prozentage sind relativ zur Breite des übergeordneten Containers",
        "100% = volle übergeordnete Breite",
        "Verwenden Sie Prozentzahlen für bessere mobile Responsivität",
      ],
    },
    faq: [
      { question: "Warum Prozentzahlen statt Pixel verwenden?", answer: "Prozentzahlen skalieren mit der Bildschirmgröße automatisch und machen Designs responsiv. Pixel sind fix und brechen auf Mobilgeräten. Prozentzahlen passen sich jedem Container an." },
      { question: "Was ist, wenn ich Prozentzahlen auf einem übergeordneten ohne festgelegte Breite verwende?", answer: "Die Prozentage werden relativ zu seinem übergeordneten berechnet. Ketten Sie dies bis zu einem fest-width übergeordneten zurück. Verwenden Sie 100vw/100vh für vollständige Viewport-Breite/Höhe." },
      { question: "Werden meine Prozentrechnungsdaten gespeichert?", answer: "Nein. Alle Konvertierungen erfolgen sofort in Ihrem Browser – vollständig privat." },
    ],
  },
  "css-unit": {
    howTo: {
      title: "CSS-Einheiten konvertieren",
      steps: [
        "Wählen Sie Ihre Quell-CSS-Einheit",
        "Geben Sie den Wert ein",
        "Wählen Sie Ihre Ziel-Einheit",
        "Erhalten Sie den konvertierten CSS-Wert",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen allen CSS-Längeneeinheiten (px, em, rem, vh, vw, pt, cm, etc.)",
        "Umfassende Einheits-Unterstützung für alle Design-Szenarien",
        "Echtzeit-Konvertierung und Vorschau",
        "Essentiell für Frontend-Entwicklung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "VH/VW-Einheiten sind relativ zu Viewport-Dimensionen (gut für Hero-Abschnitte)",
        "PT (Punkte) wird traditionell im Druck verwendet, nicht Web",
        "Mischen Sie Einheiten strategisch für optimales responsive Design",
      ],
    },
    faq: [
      { question: "Was sind VH- und VW-Einheiten?", answer: "VH (Viewport-Höhe) und VW (Viewport-Breite) sind Prozentsätze des Browser-Fensters. 100vh = Bildschirmhöhe, perfekt für vollbild-Abschnitte ohne Scrollen." },
      { question: "Sollte ich CH-Einheiten verwenden?", answer: "CH-Einheiten entsprechen der Breite des '0'-Zeichens (Monospace). Nützlich für Zeilenlängen-Limits in Typografie (typischerweise 50-80ch für Lesbarkeit)." },
      { question: "Ist meine CSS-Einheits-Konvertierung privat?", answer: "Ja. Alle Konvertierungen erfolgen sofort in Ihrem Browser ohne externe Kommunikation." },
    ],
  },
  "css-minifier": {
    howTo: {
      title: "CSS minifizieren",
      steps: [
        "Fügen Sie Ihren CSS-Code in das Eingabefeld ein",
        "Klicken Sie auf Minify, um die CSS zu komprimieren",
        "Sehen Sie die optimierte CSS-Ausgabe",
        "Kopieren Sie die minifizierte CSS für Produktion",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Entfernen Sie unnötige Whitespace und Kommentare aus CSS",
        "Reduzieren Sie die Dateigröße für schnelleres Laden",
        "Bewahren Sie CSS-Funktionalität bei Minimierung",
        "Option, wichtige Kommentare zu bewahren",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Minifizierte CSS reduziert typischerweise die Dateigröße um 20-40%",
        "Minifizieren Sie CSS immer in der Produktion zur besseren Leistung",
        "Verwenden Sie Source Maps zum Debuggen von minifiziertem CSS in der Entwicklung",
      ],
    },
    faq: [
      { question: "Ändert Minification, wie CSS funktioniert?", answer: "Nein. Minification entfernt Whitespace und Kommentare, bewahrt aber alle CSS-Regeln. Die Ausgabe ist funktional identisch, nur kleiner." },
      { question: "Was ist der Unterschied zwischen minifiziertem und Source Maps?", answer: "Minifiziertes CSS ist produktions-optimiert aber unlesbar. Source Maps lassen Entwickler minifizierten Code debuggen, indem sie es zurück zur Quelle abbilden. Verwenden Sie immer beides." },
      { question: "Wird mein CSS-Code gesichert?", answer: "Absolut. CSS-Minification erfolgt sofort in Ihrem Browser ohne Datenspeicher oder Übertragung." },
    ],
  },
  "tailwind-css": {
    howTo: {
      title: "Zu Tailwind CSS Klassen konvertieren",
      steps: [
        "Geben Sie Ihre traditionellen CSS-Eigenschaften ein",
        "Sehen Sie die vorgeschlagenen Tailwind CSS Klassen",
        "Kopieren Sie die Tailwind Klassen in Ihren HTML",
        "Wenden Sie die Klassen zur sofortigen Stilisierung an",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Schlagen Sie Tailwind CSS Utility-Klassen für CSS-Eigenschaften vor",
        "Beschleunigen Sie die Entwicklung mit Utility-First CSS Framework",
        "Unterstützung für responsive Präfixe und Hover-Zustände",
        "Konvertieren Sie traditionelles CSS zu Tailwind-Äquivalenten",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Tailwind CSS verwendet Utility-Klassen für schnelle Entwicklung",
        "Responsive Präfixe wie md: und lg: vereinfachen responsive Designs",
        "Tailwind Klassen können kombiniert werden für komplexe Stile",
      ],
    },
    faq: [
      { question: "Ist Tailwind CSS schneller als das Schreiben von Custom CSS?", answer: "Für Entwicklungsgeschwindigkeit ja – Sie erstellen Stile über Utility-Klassen statt CSS-Dateien. Dateigröße ist nach Optimierung und Tree-Shaking ähnlich." },
      { question: "Wie verwende ich Tailwinds responsive Präfixe?", answer: "Addieren Sie Präfixe wie 'md:', 'lg:', 'xl:' zu Klassen. Beispiel: 'md:w-1/2' wendet 50% Breite nur auf mittleren Bildschirmen und oben an. Standard sind Mobile-First." },
      { question: "Wird meine CSS-zu-Tailwind-Konvertierung gespeichert?", answer: "Nein. Alle Konvertierungen erfolgen sofort in Ihrem Browser mit vollständiger Datenschutz." },
    ],
  },

  // Cooking/Kitchen
  "cooking-measurement": {
    howTo: {
      title: "Kochmessungen umrechnen",
      steps: [
        "Wählen Sie Ihre Ausgangs-Kocheinheit (Becher, Esslöffel, Gramm, ml, etc.)",
        "Geben Sie die umzurechnende Menge ein",
        "Wählen Sie Ihre Ziel-Kocheinheit",
        "Verwenden Sie die umgerechnete Messung in Ihrem Rezept",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen Kocheinheiten: Becher, Esslöffel, Teelöffel, Gramm, ml, oz",
        "Unterstützung für Volumen- und Gewichtsmessungen",
        "Zutatentypische Konvertierungen, wenn zutreffend",
        "Nützlich zum Anpassen von Rezepten an verschiedene Regionen",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "1 Becher entspricht 16 Esslöffeln oder 236,588 Millilitern",
        "1 Esslöffel entspricht 3 Teelöffeln zum Skalieren von Rezepten",
        "Gewichtsmessungen (Gramm) sind genauer als Volumen (Becher)",
      ],
    },
    faq: [
      { question: "Sind Becher beim Backen präzise?", answer: "Volumen-Messungen (Becher) variieren je nachdem, wie dicht Sie Mehl packen. Professionelle Bäcker verwenden stattdessen Gramm. Wenn ein Rezept Becher angibt, versuchen Sie, stattdessen nach Gewicht zu messen, um beste Ergebnisse zu erhalten." },
      { question: "Was ist der Unterschied zwischen metrischen Teelöffeln und Esslöffeln?", answer: "Metrischer Teelöffel (5ml) und Esslöffel (15ml) sind international Standard. US-Löffel unterscheiden sich leicht. Dieses Tool konvertiert zwischen ihnen präzise." },
      { question: "Wird meine Kochmessung gespeichert?", answer: "Nein. Alle Kochmessungen konvertieren sofort in Ihrem Browser ohne Datenprotokolle." },
    ],
  },
  "recipe-scaler": {
    howTo: {
      title: "Ein Rezept skalieren",
      steps: [
        "Geben Sie die ursprüngliche Portionsgröße des Rezepts ein",
        "Geben Sie die gewünschte Portionsgröße ein",
        "Geben Sie ursprüngliche Zutatmengen ein",
        "Sehen Sie skalierte Mengen für Ihre gewünschte Portion",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Skalieren Sie Rezeptzutaten automatisch hoch oder herunter",
        "Behalten Sie richtige Zutat-Proportionen bei",
        "Unterstützung für Bruchmessungen",
        "Perfekt zum Anpassen der Chargengröße",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Berechnen Sie Skalierungsverhältnis: gewünschte Portionen ÷ ursprüngliche Portionen",
        "Multiplizieren Sie jede Zutat-Menge mit diesem Verhältnis",
        "Würzmittel und Gewürze können unabhängige Anpassungen benötigen",
      ],
    },
    faq: [
      { question: "Warum benötigen Würzmittel unabhängige Anpassung?", answer: "Gewürze und Salz skalieren nicht linear. Die Verdopplung eines Rezepts bedeutet nicht immer die Verdopplung des Salzes. Kosten Sie, während Sie gehen und passen Sie Würzmittel zuletzt an." },
      { question: "Kann ich Rezepte um jeden Betrag skalieren?", answer: "Ja, mathematisch. Aber extreme Skalierung (winzig oder riesig) kann Garzeiten, Temperatur und Textur beeinflussen. Verwenden Sie Gesichtssinn – skalieren Sie ein Rezept nicht um das 10-fache." },
      { question: "Wird meine Rezept-Skalierung privat gehalten?", answer: "Absolut. Alle Rezept-Skalierungen erfolgen sofort in Ihrem Browser ohne Datenerfassung." },
    ],
  },
  "oven-temperature": {
    howTo: {
      title: "Ofentemperatur umrechnen",
      steps: [
        "Wählen Sie Ihre Quelltemperatur-Skala (Celsius, Fahrenheit, Gas Mark)",
        "Geben Sie Ihre Ofentemperatur ein",
        "Sehen Sie die umgerechnete Temperatur",
        "Passen Sie Ihren Ofen auf die korrekte Einstellung an",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen Celsius-, Fahrenheit- und Gas Mark-Skalen",
        "Unterstützung für verschiedene Ofentypen und Standards",
        "Zeigen Sie äquivalente Temperaturen über Skalen",
        "Essentiell zum Befolgen internationaler Rezepte",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Gas Mark wird hauptsächlich in UK- und Irland-Öfen verwendet",
        "Die meisten Rezepte geben Temperatur in Celsius oder Fahrenheit an",
        "Ofen-Vorheizzeit variiert; überprüfen Sie Ihr Ofen-Handbuch",
      ],
    },
    faq: [
      { question: "Was ist die Konvertierung von Fahrenheit zu Celsius für Öfen?", answer: "Subtrahieren Sie 32, multiplizieren Sie mit 5, teilen Sie durch 9. Beispiel: (350°F - 32) × 5/9 = 176,7°C, rundet auf 180°C. Dieses Tool macht es sofort." },
      { question: "Warum Gas Mark verwenden, wenn ich einen modernen Ofen habe?", answer: "Ältere UK und irische Öfen verwenden Gas Marks (1-9) statt Grad. Neue Öfen haben beide Optionen. Verwenden Sie immer die Skala, die Ihr Ofen anzeigt." },
      { question: "Ist Ofentemperatur-Konvertierung privat?", answer: "Ja. Alle Temperaturkonvertierungen erfolgen sofort in Ihrem Browser ohne Datenübertragung." },
    ],
  },

  // Geography
  "coordinate": {
    howTo: {
      title: "Koordinaten konvertieren",
      steps: [
        "Wählen Sie Ihre Quellkoordinaten-Format (Dezimal, DMS, MGRS, etc.)",
        "Geben Sie die Koordinaten ein",
        "Wählen Sie Ihr Zielkoordinaten-Format",
        "Sehen Sie die umgerechneten Koordinaten",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Konvertieren Sie zwischen Koordinaten-Formaten: Dezimalgrad, Grad-Minuten-Sekunden, MGRS",
        "Unterstützung für Längen-/Breitengrad-Konvertierungen",
        "Nützlich für Mapping- und GPS-Anwendungen",
        "Hochpräzision für geographische Arbeiten",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Dezimalgrad-Format: Breitengrad (N-S), Längengrad (E-W) mit negativ für S/W",
        "DMS-Format verwendet Grad, Minuten, Sekunden für höhere Präzision",
        "Überprüfen Sie immer Hemisphären-Indikatoren (N, S, E, W) bei der Konvertierung",
      ],
    },
    faq: [
      { question: "Welches Koordinaten-Format ist das beste?", answer: "Dezimalgrad sind modern und computer-freundlich (z.B. 40.7128, -74.0060 für NYC). DMS ist traditionell und präzise zum Vermessen. GPS-Geräte geben beides aus." },
      { question: "Was ist MGRS und wann wird es verwendet?", answer: "Military Grid Reference System (MGRS) teilt die Erde in ein Gitter. Verwendet von Militär, Rettungsdiensten und Geocaching. Weniger häufig in Zivil-GPS-Apps." },
      { question: "Werden meine Koordinaten freigegeben?", answer: "Nein. Alle Koordinaten-Konvertierungen erfolgen sofort in Ihrem Browser – vollständig privat." },
    ],
  },
  "distance-calculator": {
    howTo: {
      title: "Entfernung zwischen Koordinaten berechnen",
      steps: [
        "Geben Sie die Längen-/Breitengradkoordinaten des ersten Ortes ein",
        "Geben Sie die Koordinaten des zweiten Ortes ein",
        "Wählen Sie Ihre bevorzugte Entfernungseinheit",
        "Sehen Sie die berechnete Entfernung",
      ],
    },
    features: {
      title: "Hauptfunktionen",
      items: [
        "Berechnen Sie Luftlinie-Entfernung zwischen zwei geografischen Punkten",
        "Unterstützung für Kilometer, Meilen, Seemeilen",
        "Verwenden Sie Haversine-Formel für präzise Erdberechnungen",
        "Essentiell für Logistik und Reiseplanung",
      ],
    },
    tips: {
      title: "Tipps zur Nutzung",
      items: [
        "Haversine-Formel berücksichtigt Erdkrümmung für Genauigkeit",
        "Luftlinie-Entfernung unterscheidet sich von Fahr-/Reiseentfernung",
        "Geben Sie immer Koordinaten mit Breiten- und Längenwert an",
      ],
    },
    faq: [
      { question: "Warum ist Luftlinie-Entfernung anders als Fahrentfernung?", answer: "Luftlinie (Großkreis-Entfernung) ist der kürzeste Weg auf einer Kugel. Straßen-Entfernung folgt Straßen, die um Hindernisse winden. Straßen-Entfernung ist immer länger." },
      { question: "Wie präzise ist die Haversine-Formel?", answer: "Extrem präzise für die meisten Zwecke – innerhalb von 0,5% für typische Entfernungen. Sie berücksichtigt Erdform. Für Vermessung verwenden Sie komplexere geodätische Formeln." },
      { question: "Werden meine Standort-Daten privat gehalten?", answer: "Absolut. Alle Entfernungsberechnungen erfolgen sofort in Ihrem Browser ohne Datenprotokolle oder Übertragung." },
    ],
  },
};
