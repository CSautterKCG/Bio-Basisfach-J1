/* Rechenmodell der Osmose: ideal verdünnte Lösungen, frei veränderliche
 * Volumina, undurchlässige gelöste Teilchen, kein Druckunterschied.
 * Volumina und Stoffmengen sind willkürliche Modelleinheiten.
 * Die Zeitkonstante ist didaktisch gewählt, nicht experimentell kalibriert.
 */
(function (root) {
  'use strict';
  function osmoseSchritt(state, seconds) {
    const { volumenA, volumenB, stoffA, stoffB } = state;
    if (![volumenA, volumenB, stoffA, stoffB, seconds].every(Number.isFinite)
        || volumenA <= 0 || volumenB <= 0 || stoffA < 0 || stoffB < 0 || seconds < 0) {
      throw new RangeError('Ungültiger Modellzustand');
    }
    const konzA = stoffA / volumenA;
    const konzB = stoffB / volumenB;
    const gesamt = volumenA + volumenB;
    const summeStoff = stoffA + stoffB;
    if (summeStoff === 0) return { ...state };
    const zielA = gesamt * stoffA / summeStoff;
    // Wasser folgt netto dem Unterschied der Konzentration nicht permeabler
    // Teilchen. Das Modell nähert sich dem Gleichgewicht ohne Überschwingen.
    const delta = 4 * (konzA - konzB) * Math.min(seconds, 0.1);
    const schritt = Math.sign(delta) * Math.min(Math.abs(delta), Math.abs(zielA - volumenA));
    const neuA = Math.max(0.01, Math.min(gesamt - 0.01, volumenA + schritt));
    return { ...state, volumenA: neuA, volumenB: gesamt - neuA };
  }
  function modulNummer(hash) {
    const match = /^\/(?:biomolekuele\/)?modul-(\d+)\/?$/.exec(hash);
    return match ? Number(match[1]) : null;
  }
  function carrierSchritt(carrier, particles, geometry, seconds, random = Math.random) {
    const dt = Math.min(Math.max(seconds, 0), 0.05);
    if (carrier.teilchen) {
      carrier.zeit += dt;
      const p = carrier.teilchen;
      p.x = geometry.middle;
      p.y = geometry.height / 2;
      if (carrier.zeit >= 1) {
        const zielLinks = !carrier.startLinks;
        p.left = zielLinks;
        p.x = geometry.middle + (zielLinks ? -32 : 32);
        p.vx = (zielLinks ? -1 : 1) * 40;
        p.vy = (random() - 0.5) * 35;
        p.gebunden = false;
        carrier.teilchen = null;
        carrier.linksOffen = zielLinks;
        carrier.zeit = 0;
        carrier.phase = 'offen';
      } else {
        carrier.phase = carrier.zeit < 0.4 ? 'gebunden' : 'verschlossen';
      }
      return;
    }
    if (random() < 1 - Math.exp(-dt)) carrier.linksOffen = !carrier.linksOffen;
    const kandidat = particles.find(p => !p.gebunden
      && p.kind === 'glucose' && p.left === carrier.linksOffen
      && Math.abs(p.x - geometry.middle) < 42
      && Math.abs(p.y - geometry.height / 2) < 30);
    if (kandidat) {
      kandidat.gebunden = true;
      kandidat.x = geometry.middle;
      kandidat.y = geometry.height / 2;
      carrier.teilchen = kandidat;
      carrier.startLinks = kandidat.left;
      carrier.zeit = 0;
      carrier.phase = 'gebunden';
    }
  }
  function istFreigegeben(nummer, config, vorhandeneModule) {
    return Array.isArray(config.freigegebeneModule)
      && config.freigegebeneModule.includes(nummer)
      && vorhandeneModule.includes(nummer);
  }
  root.BioModelle = { osmoseSchritt, carrierSchritt, modulNummer, istFreigegeben };
})(typeof window !== 'undefined' ? window : globalThis);
