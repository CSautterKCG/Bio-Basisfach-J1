# Bio-Lernlabor · Basisfach Biologie BW

Fertiger, statischer Prototyp für **Biologie Basisfach Kursstufe (J1/J2) am allgemeinbildenden Gymnasium in Baden-Württemberg**. Er funktioniert ohne Build-System direkt im Browser und ist für iPads optimiert.

## Was ist enthalten?

- sechs Inhaltsfelder des Bildungsplans V2 (2022)
- Lernziele und Kernideen
- sechs interaktive Modelle: Membrantransport, Enzymaktivität, Selektion, Toleranzkurve, Aktionspotenzial und PCR
- Experimentideen
- Aufgaben in AFB I–III mit Hinweisen
- lokaler Lernfortschritt im Browser

## Wichtig zur J1-Zuordnung

Der Bildungsplan legt die Kompetenzen für **Klassen 11/12 gemeinsam** fest. Die schulinterne Reihenfolge kann deshalb variieren. In diesem Prototyp stehen `Biomoleküle & molekulare Genetik` und `Stoff- & Energieumwandlung` bewusst am Anfang; die übrigen Module lassen sich leicht umsortieren.

Für die heutige Kursstufe 2026/27 gilt weiterhin die Fassung V2 vom 08.03.2022. Die Fassung V3.0 von 2026 wird laut Inkrafttretensregel zunächst für jüngere Jahrgänge wirksam.

Offizielle Grundlage:
- https://www.bildungsplaene-bw.de/BP2016BW_ALLG_GYM_BIO.V2
- Bereich 3.4 Klassen 11/12 (Basisfach)

## Direkt testen

Öffne `docs/index.html` in einem Browser. Für einige Browser ist ein kleiner lokaler Webserver komfortabler, z. B. in VS Code mit „Live Server“.

## Auf GitHub Pages veröffentlichen

1. Neues GitHub-Repository anlegen, z. B. `Bio_Basisfach_J1`.
2. Den gesamten Ordner hochladen.
3. GitHub → `Settings` → `Pages`.
4. `Deploy from a branch` auswählen.
5. Branch `main`, Ordner `/docs` auswählen.
6. Speichern.

## Inhalte ändern

- `docs/content.js`: Kapitel, Lernziele, Aufgaben, Experimente
- `docs/app.js`: Interaktionen und Simulationen
- `docs/styles.css`: Gestaltung

Die Inhalte und der Code wurden eigenständig erstellt; die Lernwebsite einer Kollegin wurde nicht kopiert.
