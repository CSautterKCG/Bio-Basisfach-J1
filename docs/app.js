const app = document.getElementById('app');
const brand = document.getElementById('brand');
const completed = new Set(JSON.parse(localStorage.getItem('bio-completed-v2') || '[]'));

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const save = () => localStorage.setItem('bio-completed-v2', JSON.stringify([...completed]));
const quizKey = id => `bio-quiz-${id}`;

function navigate(id) {
  location.hash = id ? `#/${id}` : '#/';
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
brand.addEventListener('click', () => navigate(''));
window.addEventListener('hashchange', render);

function home() {
  const done = modules.filter(m => completed.has(m.id)).length;
  return `<main>
    <section class="hero">
      <div class="hero-copy">
        <div class="eyebrow">BIOLOGIE · BASISFACH · BADEN-WÜRTTEMBERG</div>
        <h1>Bio-Lernlabor <span>J1 · bis Herbstferien</span></h1>
        <p>Dein Unterricht als digitaler Lernpfad: erst einlesen, dann verstehen, ausprobieren, anwenden und selbst prüfen.</p>
        <div class="hero-badges"><span>Unterrichtsplan 2026/27</span><span>Basisfach</span><span>iPad-optimiert</span></div>
      </div>
      <div class="hero-card">
        <div class="dna-mark">J1</div>
        <strong>7 Lernmodule</strong>
        <span>vom Membranaufbau bis zum Enzymexperiment</span>
        <div class="progress-pill">${done}/${modules.length} erledigt · ${Math.round(done/modules.length*100)}%</div>
      </div>
    </section>

    <section class="notice">
      <strong>So arbeitest du hier</strong>
      <p>Die Module folgen dem Unterricht. Modul 1 „Biomembran“ ist bereits vollständig ausgearbeitet. Die folgenden Module werden nach demselben Muster ergänzt.</p>
    </section>

    <section class="timeline-head">
      <div><div class="eyebrow">DEIN LERNPFAD</div><h2>Bis zu den Herbstferien</h2></div>
      <span>September – Oktober 2026</span>
    </section>
    <section class="module-grid schedule-grid">
      ${modules.map(m => `<button class="module-card ${m.status === 'ready' ? 'ready' : ''}" data-open="${m.id}">
        <div class="module-topline"><span>${m.number}</span><span>${esc(m.date)}</span></div>
        <div class="module-icon">${m.icon}</div>
        <h2>${esc(m.title)}</h2>
        <p>${esc(m.subtitle)}</p>
        <div class="module-footer"><span>${m.status === 'ready' ? 'vollständig' : 'Grundstruktur'}</span><span>${completed.has(m.id) ? '✓ erledigt' : '→ öffnen'}</span></div>
      </button>`).join('')}
    </section>

    <section class="method-strip"><div><b>01</b><span>Einlesen</span></div><div><b>02</b><span>Verstehen</span></div><div><b>03</b><span>Ausprobieren</span></div><div><b>04</b><span>Anwenden</span></div><div><b>05</b><span>Selbst prüfen</span></div></section>
  </main>`;
}

function learningPath() {
  return `<section class="learning-path panel compact-panel">
    <div class="eyebrow">LERNWEG</div>
    <div class="path-row">
      <a href="#read">📖 Einlesen</a><span>→</span>
      <a href="#check">🧠 Kurzcheck</a><span>→</span>
      <a href="#lab-section">🎛️ Lernlabor</a><span>→</span>
      <a href="#train">✏️ Anwenden</a><span>→</span>
      <a href="#selftest">✅ Selbsttest</a>
    </div>
  </section>`;
}

function bookBox() {
  return `<section class="panel book-panel">
    <div class="eyebrow">LEHRBUCH</div>
    <h2>Parallel im Buch arbeiten</h2>
    <p>Das Lernlabor ersetzt euer Lehrbuch nicht. Es bereitet zentrale Ideen auf und verbindet sie mit interaktiven Aufgaben.</p>
    <div class="book-grid">
      <div><span>📘</span><strong>Markl Biologie</strong><small>Kapitel / Seiten ergänzen wir, sobald die genaue Ausgabe feststeht.</small></div>
      <div><span>📗</span><strong>Natura Biologie</strong><small>Kapitel / Seiten ergänzen wir, sobald die genaue Ausgabe feststeht.</small></div>
    </div>
  </section>`;
}

function readingSection(m) {
  return `<section class="panel reading-panel" id="read">
    <div class="eyebrow">EINLESEN · CA. 8–10 MIN</div>
    <h2>Grundlagen verstehen</h2>
    <p class="section-lead">Lies die Abschnitte in Ruhe. Konzentriere dich darauf, wie <strong>Struktur und Funktion</strong> zusammenhängen.</p>
    <div class="reading-list">
      ${m.reading.map((r, i) => `<article class="reading-card">
        <div class="reading-label">${esc(r.label)}</div>
        <h3>${esc(r.title)}</h3>
        ${r.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}
        ${r.callout ? `<div class="callout callout-${esc(r.callout.type)}"><strong>${esc(r.callout.title)}</strong><span>${esc(r.callout.text)}</span></div>` : ''}
      </article>`).join('')}
    </div>
  </section>`;
}

function quickCheckSection(m) {
  return `<section class="panel" id="check">
    <div class="eyebrow">KURZCHECK</div>
    <h2>Hast du das Wesentliche verstanden?</h2>
    <p class="section-lead">Beantworte die drei Fragen direkt nach dem Lesen. Du bekommst sofort eine Rückmeldung.</p>
    <div class="quick-list">
      ${m.quickCheck.map((q, qi) => `<article class="quick-card" data-quick="${qi}">
        <h3>${qi + 1}. ${esc(q.q)}</h3>
        <div class="option-list">${q.options.map((o, oi) => `<button data-q="${qi}" data-o="${oi}">${esc(o)}</button>`).join('')}</div>
        <div class="feedback" id="quick-feedback-${qi}" hidden></div>
      </article>`).join('')}
    </div>
  </section>`;
}

function researchSection(m) {
  return `<section class="panel research-panel">
    <div class="eyebrow">FORSCHERAUFTRAG</div>
    <h2>${esc(m.research.title)}</h2>
    <ol>${m.research.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
  </section>`;
}

function taskSection(m) {
  return `<section class="panel" id="train">
    <div class="eyebrow">ANWENDEN</div>
    <h2>Aufgaben nach Anforderungsbereichen</h2>
    <div class="task-list">${m.tasks.map((t,i)=>`<article class="task"><div class="afb afb-${t.afb.toLowerCase()}">AFB ${t.afb}</div><p>${esc(t.prompt)}</p><button data-hint="${i}">Hinweis</button><div class="hint" id="hint-${i}" hidden>💡 ${esc(t.hint)}</div></article>`).join('')}</div>
  </section>`;
}

function quizSection(m) {
  const best = Number(localStorage.getItem(quizKey(m.id)) || 0);
  return `<section class="panel quiz-panel" id="selftest">
    <div class="eyebrow">SELBSTTEST</div>
    <h2>5 Fragen zum Abschluss</h2>
    <p class="section-lead">Ziel: mindestens 4 von 5 richtig. Dein bestes Ergebnis wird nur auf diesem Gerät gespeichert.</p>
    <div class="quiz-best">Bestwert: <strong id="best-score">${best}/5</strong></div>
    <form id="quiz-form">
      ${m.quiz.map((q, qi) => `<fieldset class="quiz-question"><legend>${qi+1}. ${esc(q.q)}</legend>${q.options.map((o, oi) => `<label><input type="radio" name="q${qi}" value="${oi}"><span>${esc(o)}</span></label>`).join('')}</fieldset>`).join('')}
      <button type="submit" class="primary-btn">Selbsttest auswerten</button>
    </form>
    <div id="quiz-result" class="quiz-result" hidden></div>
  </section>`;
}

function fullModulePage(m) {
  return `<main class="module-page">
    <button class="back" id="back">← Übersicht</button>
    <header class="module-hero">
      <div><div class="eyebrow">${esc(m.date)} · ${esc(m.bp)}</div><h1><span class="hero-icon">${m.icon}</span>${esc(m.title)}</h1><p>${esc(m.intro)}</p></div>
      <button class="complete ${completed.has(m.id) ? 'done' : ''}" id="complete">${completed.has(m.id) ? '✓ Modul erledigt' : 'Als erledigt markieren'}</button>
    </header>
    <section class="hook-card"><span>LEITFRAGE</span><strong>${esc(m.hook)}</strong></section>
    ${learningPath()}
    ${bookBox()}
    <section class="panel"><div class="eyebrow">LERNZIELE</div><h2>Das solltest du danach können</h2><div class="goal-grid">${m.goals.map((g,i)=>`<div class="goal"><span>${String(i+1).padStart(2,'0')}</span><p>${esc(g)}</p></div>`).join('')}</div></section>
    ${readingSection(m)}
    ${quickCheckSection(m)}
    <section class="panel lab-panel" id="lab-section"><div class="eyebrow">INTERAKTIV</div><h2 id="lab-title"></h2><p class="lab-intro">Nutze das Modell nicht nur zum Anschauen: Beschreibe jede Veränderung mit biologischer Fachsprache.</p><div id="lab"></div></section>
    ${researchSection(m)}
    ${taskSection(m)}
    ${quizSection(m)}
    <section class="finish-panel"><div><span>Modul 01</span><strong>Biomembran abgeschlossen?</strong><p>Markiere das Modul erst, wenn du die Grundideen erklären kannst.</p></div><button class="complete ${completed.has(m.id) ? 'done' : ''}" id="complete-bottom">${completed.has(m.id) ? '✓ erledigt' : 'Als erledigt markieren'}</button></section>
    <section class="source-note"><strong>Hinweis:</strong> Die Erklärtexte sind eigenständig formuliert. Markl und Natura werden als ergänzende Lehrbücher genutzt; urheberrechtlich geschützte Buchtexte oder Abbildungen werden hier nicht kopiert.</section>
  </main>`;
}

function plannedModulePage(m) {
  return `<main class="module-page">
    <button class="back" id="back">← Übersicht</button>
    <header class="module-hero"><div><div class="eyebrow">${esc(m.date)} · ${esc(m.bp)}</div><h1><span class="hero-icon">${m.icon}</span>${esc(m.title)}</h1><p>${esc(m.intro)}</p></div></header>
    <section class="panel coming-panel"><div class="eyebrow">NÄCHSTER AUSBAUSCHRITT</div><h2>Dieses Modul bekommt dieselbe Lernstruktur</h2><p>Einlesen → Kurzcheck → interaktives Lernlabor → Forscherauftrag → AFB-Aufgaben → Selbsttest.</p></section>
    <section class="panel"><div class="eyebrow">LERNZIELE</div><h2>Geplante Schwerpunkte</h2><div class="goal-grid">${m.goals.map((g,i)=>`<div class="goal"><span>${String(i+1).padStart(2,'0')}</span><p>${esc(g)}</p></div>`).join('')}</div></section>
    ${m.lab ? `<section class="panel lab-panel"><div class="eyebrow">VORSCHAU</div><h2 id="lab-title"></h2><div id="lab"></div></section>` : ''}
  </main>`;
}

function initQuickCheck(m) {
  app.querySelectorAll('[data-q]').forEach(btn => btn.addEventListener('click', () => {
    const qi = Number(btn.dataset.q), oi = Number(btn.dataset.o), q = m.quickCheck[qi];
    const card = btn.closest('.quick-card');
    card.querySelectorAll('[data-o]').forEach(b => b.classList.remove('correct-choice','wrong-choice'));
    const fb = document.getElementById(`quick-feedback-${qi}`);
    fb.hidden = false;
    if (oi === q.correct) {
      btn.classList.add('correct-choice');
      fb.className = 'feedback good';
      fb.textContent = `✓ ${q.explain}`;
    } else {
      btn.classList.add('wrong-choice');
      card.querySelector(`[data-o="${q.correct}"]`).classList.add('correct-choice');
      fb.className = 'feedback bad';
      fb.textContent = 'Noch nicht. Schau dir den zugehörigen Abschnitt oben noch einmal an.';
    }
  }));
}

function initQuiz(m) {
  const form = document.getElementById('quiz-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    let score = 0, answered = 0;
    m.quiz.forEach((q, qi) => {
      const chosen = form.querySelector(`input[name="q${qi}"]:checked`);
      if (chosen) { answered++; if (Number(chosen.value) === q.correct) score++; }
    });
    const result = document.getElementById('quiz-result');
    result.hidden = false;
    if (answered < m.quiz.length) {
      result.className = 'quiz-result warn';
      result.innerHTML = `<strong>Noch nicht vollständig</strong><span>Du hast ${answered} von ${m.quiz.length} Fragen beantwortet.</span>`;
      return;
    }
    const oldBest = Number(localStorage.getItem(quizKey(m.id)) || 0);
    const best = Math.max(oldBest, score);
    localStorage.setItem(quizKey(m.id), best);
    document.getElementById('best-score').textContent = `${best}/5`;
    result.className = `quiz-result ${score >= 4 ? 'good' : 'bad'}`;
    result.innerHTML = score >= 4
      ? `<strong>${score}/5 – Ziel erreicht ✓</strong><span>Du kannst das Modul jetzt guten Gewissens als erledigt markieren.</span>`
      : `<strong>${score}/5 – noch einmal nacharbeiten</strong><span>Gehe besonders zu den Einleseabschnitten und Kurzchecks zurück, bevor du erneut testest.</span>`;
  });
}

function initLab(type) {
  const el = document.getElementById('lab');
  const title = document.getElementById('lab-title');
  if (!el || !title) return;
  const titles = { membraneStructure:'Membranmodell', transport:'Transport-Labor', enzyme:'Enzym-Labor' };
  title.textContent = titles[type] || 'Lernlabor';

  if (type === 'membraneStructure') {
    const lipids = Array.from({length: 13}, (_, i) => `<div class="lipid lipid-top"><i></i><b></b><b></b></div>`).join('');
    const lipidsBottom = Array.from({length: 13}, (_, i) => `<div class="lipid lipid-bottom"><i></i><b></b><b></b></div>`).join('');
    el.innerHTML = `<div class="membrane-lab-grid">
      <div class="lab-controls">
        <p>Blende Informationen ein und beschreibe anschließend selbst, was du siehst.</p>
        <button class="toggle" id="hydro-toggle">Hydrophil / hydrophob markieren</button>
        <button class="toggle" id="protein-toggle">Membranproteine anzeigen</button>
        <button class="toggle" id="comp-toggle">Kompartimente benennen</button>
        <div class="mini-note">Modellhinweis: Die Darstellung ist stark vereinfacht und nicht maßstabsgetreu.</div>
      </div>
      <div class="membrane-model" id="membrane-model">
        <div class="compartment top-comp"><span>Außenraum</span></div>
        <div class="hydro-label hydro-head top-h" hidden>hydrophile Köpfe</div>
        <div class="bilayer">
          <div class="lipid-row top-row">${lipids}</div>
          <div class="hydrophobic-zone"><span hidden>hydrophober Membrankern</span></div>
          <div class="lipid-row bottom-row">${lipidsBottom}</div>
          <div class="protein transmembrane" hidden><span>Kanal-/Transportprotein</span></div>
          <div class="protein peripheral" hidden><span>peripheres Protein</span></div>
        </div>
        <div class="hydro-label hydro-head bottom-h" hidden>hydrophile Köpfe</div>
        <div class="compartment bottom-comp"><span>Cytoplasma</span></div>
      </div>
    </div>`;
    const hydro = el.querySelector('#hydro-toggle'), protein = el.querySelector('#protein-toggle'), comp = el.querySelector('#comp-toggle'), model = el.querySelector('#membrane-model');
    hydro.onclick = () => {
      const on = hydro.classList.toggle('active');
      hydro.textContent = on ? 'Markierung ausblenden' : 'Hydrophil / hydrophob markieren';
      model.querySelectorAll('.hydro-label, .hydrophobic-zone span').forEach(x => x.hidden = !on);
      model.classList.toggle('show-hydro', on);
    };
    protein.onclick = () => {
      const on = protein.classList.toggle('active');
      protein.textContent = on ? 'Membranproteine ausblenden' : 'Membranproteine anzeigen';
      model.querySelectorAll('.protein').forEach(x => x.hidden = !on);
    };
    comp.onclick = () => {
      const on = comp.classList.toggle('active');
      comp.textContent = on ? 'Kompartimente ausblenden' : 'Kompartimente benennen';
      model.classList.toggle('show-comp', on);
    };
  }

  if (type === 'transport') {
    el.innerHTML = `<div class="lab-grid"><div><label>Teilchenkonzentration außen <b id="o-v">80</b></label><input id="o" type="range" min="0" max="100" value="80"><label>Teilchenkonzentration innen <b id="i-v">25</b></label><input id="i" type="range" min="0" max="100" value="25"><button class="toggle" id="active">Aktiver Transport: AUS</button></div><div class="lab-result"><div class="membrane-scene"><div><span class="big-number" id="o-n">80</span><small>außen</small></div><div class="membrane-line">⇄</div><div><span class="big-number" id="i-n">25</span><small>innen</small></div></div><p><strong>Spontaner Nettofluss:</strong> <span id="natural"></span></p><p><strong>Im Modell:</strong> <span id="actual"></span></p><p><strong>ATP-Verbrauch:</strong> <span id="atp"></span></p></div></div>`;
    let active = false; const o=el.querySelector('#o'), i=el.querySelector('#i'), btn=el.querySelector('#active');
    const update=()=>{const ov=+o.value,iv=+i.value,d=ov-iv,n=d===0?'kein Nettofluss':d>0?'außen → innen':'innen → außen',a=active?(d>=0?'innen → außen':'außen → innen'):n; el.querySelector('#o-v').textContent=ov;el.querySelector('#i-v').textContent=iv;el.querySelector('#o-n').textContent=ov;el.querySelector('#i-n').textContent=iv;el.querySelector('#natural').textContent=n;el.querySelector('#actual').textContent=a;el.querySelector('#atp').textContent=active?'ja – gegen das Konzentrationsgefälle':'nein';};
    o.oninput=update;i.oninput=update;btn.onclick=()=>{active=!active;btn.classList.toggle('active',active);btn.textContent=`Aktiver Transport: ${active?'AN':'AUS'}`;update();};update();
  }

  if (type === 'enzyme') {
    el.innerHTML=`<div class="lab-grid"><div><label>Temperatur <b id="t-v">37 °C</b></label><input id="t" type="range" min="0" max="80" value="37"><label>pH-Wert <b id="p-v">7.0</b></label><input id="p" type="range" min="1" max="13" step="0.1" value="7"><label>Substratangebot <b id="s-v">60 %</b></label><input id="s" type="range" min="0" max="100" value="60"></div><div class="lab-result"><div class="meter-label"><span>modellierte Enzymaktivität</span><strong id="meter-value">70%</strong></div><div class="meter"><div class="meter-fill" id="meter-fill" style="width:70%"></div></div><p class="lab-note">Didaktisches Modell: Die Kurve dient zum Erkunden von Einflussfaktoren und ersetzt keine realen Messdaten.</p></div></div>`;
    const t=el.querySelector('#t'),p=el.querySelector('#p'),s=el.querySelector('#s');
    const update=()=>{const tv=+t.value,pv=+p.value,sv=+s.value,a=Math.max(0,Math.min(1,Math.exp(-Math.pow((tv-37)/16,2))*Math.exp(-Math.pow((pv-7)/2.1,2))*(sv/(25+sv))*1.35))*100;el.querySelector('#t-v').textContent=`${tv} °C`;el.querySelector('#p-v').textContent=pv.toFixed(1);el.querySelector('#s-v').textContent=`${sv} %`;el.querySelector('#meter-value').textContent=`${Math.round(a)}%`;el.querySelector('#meter-fill').style.width=`${a}%`;};
    t.oninput=update;p.oninput=update;s.oninput=update;update();
  }
}

function render() {
  const id = location.hash.replace('#/','');
  const m = modules.find(x => x.id === id);
  app.innerHTML = m ? (m.status === 'ready' ? fullModulePage(m) : plannedModulePage(m)) : home();
  app.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => navigate(b.dataset.open)));
  if (m) {
    document.getElementById('back').onclick = () => navigate('');
    const toggleComplete = () => { completed.has(m.id) ? completed.delete(m.id) : completed.add(m.id); save(); render(); };
    const topComplete = document.getElementById('complete'); if (topComplete) topComplete.onclick = toggleComplete;
    const bottomComplete = document.getElementById('complete-bottom'); if (bottomComplete) bottomComplete.onclick = toggleComplete;
    app.querySelectorAll('[data-hint]').forEach(b => b.addEventListener('click', () => { const h=document.getElementById(`hint-${b.dataset.hint}`); h.hidden=!h.hidden; b.textContent=h.hidden?'Hinweis':'Hinweis schließen'; }));
    if (m.quickCheck) initQuickCheck(m);
    if (m.quiz) initQuiz(m);
    if (m.lab) initLab(m.lab);
  }
}
render();
