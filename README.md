# BioLab: Freigabe und Wiederverwendung

Die vier vorhandenen Module sind überarbeitet. Module 5–9 bleiben Platzhalter
und müssen noch ausgearbeitet werden. Die öffentliche Website ändert sich
erst, wenn du diese Dateien selbst auf GitHub übernimmst.

## Auf GitHub übernehmen

1. ZIP entpacken und dein Repository `csautterkcg/Bio-Basisfach-J1` öffnen.
2. Im Repository den Ordner `docs` auswählen.
3. **Add file → Upload files**: `index.html`, `freigabe.js`, `modelle.js`,
   `runtime.js` und `README.md` aus dem entpackten Ordner `docs` hochladen.
   Es darf kein zusätzlicher Unterordner `docs/docs` entstehen.
4. Mit **Commit changes** speichern. Die bestehende Pages-Konfiguration
   für `docs` beibehalten. Nach der Veröffentlichung die Seite neu laden.

## Freigabe

Nur `docs/freigabe.js` bearbeiten. Aktuell bleiben die vier zuvor online
verfügbaren Module geöffnet:

```js
freigegebeneModule: [1, 2, 3, 4],
```

Für einen neuen Kurs zunächst `[1]` eintragen. Später die weiteren Nummern
ergänzen und jeweils speichern und auf GitHub veröffentlichen. Die Änderung
gilt nach dem Neuladen für alle. Es gibt keine automatische Freigabe nach Datum.
Auch direkte Links und alte Links wie `#/modul-2` prüfen die Freigabe.
Unfertige Module werden durch Eintragen ihrer Nummer nicht geöffnet.

**Grenze:** Das ist eine didaktische Sperre auf einer öffentlichen statischen
Website, kein Passwortschutz. Ausgelieferte Inhalte stehen im Quelltext.
Tatsächlich geschützte Inhalte brauchen einen anderen Veröffentlichungsweg
mit Zugangskontrolle.

## Neues Schuljahr

In `freigabe.js` das `schuljahr` ändern und die `freigegebeneModule` auf den
gewünschten Anfangsstand setzen. Bei Bedarf `termine` aktualisieren.
`termineAnzeigen: false` hält die Inhalte ohne Unterrichtstermine wiederverwendbar;
für sichtbare Termine auf `true` stellen. Termine geben niemals Module frei.
Notizen und Selbsteinschätzungen werden pro Schuljahr getrennt lokal gespeichert.
Für 2026/27 werden bisherige lokale Antworten beim Laden berücksichtigt.
Es gibt keine Abgabe an die Lehrkraft oder geräteübergreifende Synchronisation.

## Fachliche Änderungen

- Modul 1: membranumschlossene Organellen präzisiert; Teilchenzahl von
  Konzentration unterschieden. Das zweidimensionale Modell zeigt Flächendichte
  als Ersatz für räumliche Konzentration. Pause und Neustart ergänzt.
- Modul 2: regelmäßige Schwingung als Darstellungskonvention erklärt.
  Modellkritik zu Bewegung, Zusammensetzung, Maßstab und Asymmetrie ergänzt.
- Modul 3: zufällige Bewegungsrichtungen. Der Carrier bindet höchstens ein
  Molekül und setzt es nach einer geschlossenen Zwischenphase auf der anderen
  Seite frei. Er ist keine offene Pore; Transporte sind in beide Richtungen
  möglich. Das Ionenmodell berücksichtigt keine elektrische Spannung.
- Osmose: neues Volumenmodell. Nicht permeable Stoffmengen bleiben erhalten;
  Wassertransport verändert Volumina und Konzentrationen. Die Stoffmengen
  lassen sich verändern, einschließlich Gleichgewicht und umgekehrtem Gefälle.
  Annahmen: ideal verdünnte Lösungen, frei veränderliche Volumina, kein
  Druckunterschied. Balken zeigen Volumenanteile, keine Füllhöhen. Das Modell
  ist kein Aufbau mit starren Gefäßen und kein Messinstrument.
- Osmosetext: Druckbedingungen und relative Tonizität präzisiert; Aquaporine
  ergänzt. Sättigung des Carriertransports genauer erläutert.
- Modul 4: ATP → ADP + Pᵢ ergänzt; Modellkritik zur statischen Prozessgrafik.
- Alle vier Module enthalten Fragen zur Modellkritik mit einer aufklappbaren
  Einordnung. Vereinfachungen ersetzen keine Fehlerkorrektur.

Fachliche Referenzen:

- Bildungsplan Basisfach, Biomoleküle und molekulare Genetik:
  https://www.bildungsplaene-bw.de/BP2016BW_ALLG_GYM_BIO.V2_IK_11-12-BF_01
- Alberts et al., Principles of Membrane Transport:
  https://www.ncbi.nlm.nih.gov/books/NBK26815/
- Alberts et al., Carrier Proteins and Active Membrane Transport:
  https://www.ncbi.nlm.nih.gov/books/NBK26896/

## Prüfungen

Automatisiert geprüft: JavaScript-Syntax, HTML-Verweise, 20 Quiz-Antwortschlüssel,
direkte und alte Links, Hashwechsel, gesperrte Karten und Weiterlinks, fehlende
Konfiguration, Datumsanzeige und Sperre unfertiger Module. Die Osmose-Rechnung
wurde für alle 144 Kombinationen der einstellbaren Stoffmengen auf Richtung,
Erhaltung, Gleichgewicht und fehlendes Überschwingen geprüft. Carrier-Bindung
und Freisetzung wurden in beide Richtungen geprüft.

Eine vollständige visuelle Browserprüfung der lokalen Seite war in dieser
Umgebung nicht möglich. Nach dem Upload bitte folgende Sichtprüfung durchführen:

1. Übersicht und Module auf Computer und Smartphone öffnen.
2. Modul 1: alle Grenzen wählen, pausieren und neu starten. Bei der Wand
   wechseln keine Teilchen; bei der Membran darf nur Blau wechseln.
3. Modul 2: Lipidanordnungen, Protein und Beweglichkeit prüfen.
4. Modul 3: Kanal und Carrier vergleichen. Im Osmosemodell gleiche Stoffmengen
   einstellen: beide Startvolumina bleiben 12. Bei A=2/B=10 nähert sich A an 4
   und B an 20; bei A=10/B=2 kehrt sich die Richtung um. Gesamtvolumen bleibt 24.
5. Freigabe testweise auf `[1]` stellen: Modul 2 muss auch unter
   `#/biomolekuele/modul-2` und `#/modul-2` gesperrt sein. Danach wiederherstellen.

Tests benötigen nur Node.js, im entpackten Projektordner ausführen:

```sh
node tests/modelle.test.cjs
node tests/freigabe.test.cjs
```

## Dateien und weiterer Unterrichtsplan

Aktiv geladen: `index.html`, `freigabe.js`, `modelle.js`, `runtime.js`.
Die Gestaltung steht weiterhin in `index.html`. `app.js`, `content.js` und
`styles.css` sind zur Wahrung des Altbestands enthalten, werden aber nicht
geladen; sie steuern diese Fassung nicht und sind keine separat geprüfte
Anwendung. `themenplan.csv` enthält den bisherigen Plan 2026/27 unverändert
als Referenz und wird nicht eingelesen.

Die Novembertermine im bisherigen CSV-Plan für Enzymexperimente und Hemmung
passen noch nicht zum Abschluss vor den Herbstferien. Als nächster Schritt
sind Module 5–9 auszuarbeiten und die tatsächlichen Unterrichtstermine daran
anzupassen. Freigabe und Unterrichtstermine werden ausschließlich in
`freigabe.js` für die Website eingestellt.
