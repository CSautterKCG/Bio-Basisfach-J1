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
      <p>Alle sieben Module bis zu den Herbstferien sind vollständig: Einlesen → Kurzcheck → Lernlabor → Forscherauftrag → Aufgaben → Selbsttest. Im Selbsttest wird nur Wissen abgefragt, das im Modul vorher erklärt wurde.</p>
    </section>

    <section class="timeline-head">
      <div><div class="eyebrow">DEIN LERNPFAD</div><h2>Bis zu den Herbstferien</h2></div>
      <span>September – Oktober 2026</span>
    </section>
    <section class="module-grid schedule-grid">
      ${modules.map(m => `<button class="module-card ready" data-open="${m.id}">
        <div class="module-topline"><span>${m.number}</span><span>${esc(m.date)}</span></div>
        <div class="module-icon">${m.icon}</div>
        <h2>${esc(m.title)}</h2>
        <p>${esc(m.subtitle)}</p>
        <div class="module-footer"><span>vollständig</span><span>${completed.has(m.id) ? '✓ erledigt' : '→ öffnen'}</span></div>
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

function bookBox(m) {
  const search = (m.bookSearch || [m.title]).map(x => `<li>${esc(x)}</li>`).join('');
  return `<section class="panel book-panel">
    <div class="eyebrow">LEHRBUCH</div>
    <h2>Parallel mit Markl oder Natura arbeiten</h2>
    <p>Das Lernlabor ersetzt euer Lehrbuch nicht. Nutze das Inhaltsverzeichnis bzw. Register und suche zu diesem Modul nach:</p>
    <ul class="book-search">${search}</ul>
    <div class="book-grid">
      <div><span>📘</span><strong>Markl Biologie</strong><small>Genaue Seiten können ergänzt werden, sobald die verwendete Ausgabe feststeht.</small></div>
      <div><span>📗</span><strong>Natura Biologie</strong><small>Genaue Seiten können ergänzt werden, sobald die verwendete Ausgabe feststeht.</small></div>
    </div>
  </section>`;
}

function readingSection(m) {
  return `<section class="panel reading-panel" id="read">
    <div class="eyebrow">EINLESEN · CA. ${esc(m.readTime || '8–10 MIN')}</div>
    <h2>Grundlagen verstehen</h2>
    <p class="section-lead">Lies die Abschnitte in Ruhe. Markiere dir Begriffe, die du anschließend ohne Text erklären können solltest.</p>
    <div class="reading-list">
      ${m.reading.map(r => `<article class="reading-card">
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
    <p class="section-lead">Beantworte die drei Fragen direkt nach dem Lesen. Jede richtige Antwort wurde oben bereits erklärt.</p>
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
    <h2>${m.quiz.length} Fragen zum Abschluss</h2>
    <p class="section-lead">Ziel: mindestens ${Math.max(1, m.quiz.length - 1)} von ${m.quiz.length} richtig. Es wird nur Wissen abgefragt, das in diesem Modul vorher erklärt wurde.</p>
    <div class="quiz-best">Bestwert: <strong id="best-score">${best}/${m.quiz.length}</strong></div>
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
    ${bookBox(m)}
    <section class="panel"><div class="eyebrow">LERNZIELE</div><h2>Das solltest du danach können</h2><div class="goal-grid">${m.goals.map((g,i)=>`<div class="goal"><span>${String(i+1).padStart(2,'0')}</span><p>${esc(g)}</p></div>`).join('')}</div></section>
    ${readingSection(m)}
    ${quickCheckSection(m)}
    <section class="panel lab-panel" id="lab-section"><div class="eyebrow">INTERAKTIV</div><h2 id="lab-title"></h2><p class="lab-intro">Nutze das Modell nicht nur zum Anschauen: Beschreibe jede Veränderung mit biologischer Fachsprache.</p><div id="lab"></div></section>
    ${researchSection(m)}
    ${taskSection(m)}
    ${quizSection(m)}
    <section class="finish-panel"><div><span>Modul ${esc(m.number)}</span><strong>${esc(m.title)} abgeschlossen?</strong><p>Markiere das Modul erst, wenn du die Grundideen ohne Hilfe erklären kannst.</p></div><button class="complete ${completed.has(m.id) ? 'done' : ''}" id="complete-bottom">${completed.has(m.id) ? '✓ erledigt' : 'Als erledigt markieren'}</button></section>
    <section class="source-note"><strong>Hinweis:</strong> Die Erklärtexte sind eigenständig formuliert und an deinem Unterrichtsplan orientiert. Markl und Natura werden ergänzend genutzt; urheberrechtlich geschützte Buchtexte oder Abbildungen werden hier nicht kopiert.</section>
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
    document.getElementById('best-score').textContent = `${best}/${m.quiz.length}`;
    const target = Math.max(1, m.quiz.length - 1);
    result.className = `quiz-result ${score >= target ? 'good' : 'bad'}`;
    result.innerHTML = score >= target
      ? `<strong>${score}/${m.quiz.length} – Ziel erreicht ✓</strong><span>Du kannst das Modul jetzt guten Gewissens als erledigt markieren.</span>`
      : `<strong>${score}/${m.quiz.length} – noch einmal nacharbeiten</strong><span>Gehe besonders zu den Einleseabschnitten und Kurzchecks zurück, bevor du erneut testest.</span>`;
  });
}

function initLab(type) {
  const el = document.getElementById('lab');
  const title = document.getElementById('lab-title');
  if (!el || !title) return;
  const titles = {
    membraneStructure:'Membranmodell',
    passiveTransport:'Passiver Transport: Welcher Weg passt?',
    activeTransport:'Aktiver Transport & Membranfluss',
    peptideBuilder:'Peptid-Baukasten',
    proteinStructure:'Proteinfaltung & Denaturierung',
    enzymeBinding:'Enzym–Substrat-Modell',
    experimentPlanner:'Experiment-Planer'
  };
  title.textContent = titles[type] || 'Lernlabor';

  if (type === 'membraneStructure') {
    const lipids = Array.from({length: 13}, () => `<div class="lipid lipid-top"><i></i><b></b><b></b></div>`).join('');
    const lipidsBottom = Array.from({length: 13}, () => `<div class="lipid lipid-bottom"><i></i><b></b><b></b></div>`).join('');
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

  if (type === 'passiveTransport') {
    el.innerHTML = `<div class="lab-grid">
      <div>
        <label>Stofftyp</label>
        <select id="passive-kind" class="lab-select">
          <option value="small">kleines unpolares Molekül</option>
          <option value="ion">Ion</option>
          <option value="polar">größeres polares Molekül</option>
        </select>
        <label>Konzentration außen <b id="po-v">80</b></label><input id="po" type="range" min="0" max="100" value="80">
        <label>Konzentration innen <b id="pi-v">25</b></label><input id="pi" type="range" min="0" max="100" value="25">
        <button class="toggle active" id="protein-ready">Transportprotein: funktionsfähig</button>
      </div>
      <div class="lab-result">
        <div class="membrane-scene"><div><span class="big-number" id="po-n">80</span><small>außen</small></div><div class="membrane-line">⇄</div><div><span class="big-number" id="pi-n">25</span><small>innen</small></div></div>
        <p><strong>Passender Weg:</strong> <span id="passive-route"></span></p>
        <p><strong>Nettofluss:</strong> <span id="passive-flow"></span></p>
        <p><strong>Direkter ATP-Verbrauch:</strong> nein</p>
      </div>
    </div>`;
    const kind=el.querySelector('#passive-kind'), o=el.querySelector('#po'), i=el.querySelector('#pi'), btn=el.querySelector('#protein-ready');
    let proteinReady = true;
    const update=()=>{
      const ov=+o.value, iv=+i.value, d=ov-iv;
      const route = kind.value==='small' ? 'einfache Diffusion durch die Lipiddoppelschicht' : kind.value==='ion' ? 'erleichterte Diffusion durch ein Kanalprotein' : 'erleichterte Diffusion über ein Carrierprotein';
      const direction = d===0 ? 'kein Nettofluss (dynamisches Gleichgewicht)' : d>0 ? 'außen → innen, entlang des Konzentrationsgefälles' : 'innen → außen, entlang des Konzentrationsgefälles';
      const blocked = kind.value!=='small' && !proteinReady;
      el.querySelector('#po-v').textContent=ov; el.querySelector('#pi-v').textContent=iv; el.querySelector('#po-n').textContent=ov; el.querySelector('#pi-n').textContent=iv;
      el.querySelector('#passive-route').textContent=route;
      el.querySelector('#passive-flow').textContent=blocked ? 'im Modell blockiert, weil das benötigte Transportprotein nicht funktioniert' : direction;
      btn.hidden = kind.value==='small';
    };
    kind.onchange=update; o.oninput=update; i.oninput=update;
    btn.onclick=()=>{proteinReady=!proteinReady;btn.classList.toggle('active',proteinReady);btn.textContent=`Transportprotein: ${proteinReady?'funktionsfähig':'blockiert'}`;update();};
    update();
  }

  if (type === 'activeTransport') {
    el.innerHTML = `<div class="lab-grid">
      <div>
        <label>Konzentration außen <b id="ao-v">20</b></label><input id="ao" type="range" min="0" max="100" value="20">
        <label>Konzentration innen <b id="ai-v">75</b></label><input id="ai" type="range" min="0" max="100" value="75">
        <label>Richtung der Pumpe</label>
        <select id="pump-dir" class="lab-select"><option value="in">außen → innen</option><option value="out">innen → außen</option></select>
        <button class="toggle active" id="atp-toggle">ATP: verfügbar</button>
      </div>
      <div class="lab-result">
        <div class="membrane-scene"><div><span class="big-number" id="ao-n">20</span><small>außen</small></div><div class="membrane-line" id="pump-arrow">→</div><div><span class="big-number" id="ai-n">75</span><small>innen</small></div></div>
        <p><strong>Pumprichtung:</strong> <span id="pump-text"></span></p>
        <p><strong>Bezug zum Konzentrationsgefälle:</strong> <span id="gradient-text"></span></p>
        <p><strong>Transport im Modell:</strong> <span id="pump-status"></span></p>
      </div>
    </div>
    <div class="vesicle-box">
      <strong>Membranfluss vergleichen</strong>
      <div class="vesicle-actions"><button class="mini-action active" data-vesicle="endo">Endocytose</button><button class="mini-action" data-vesicle="exo">Exocytose</button></div>
      <div id="vesicle-visual" class="vesicle-visual endo"><div class="cell-line"></div><div class="vesicle-dot"></div></div>
      <p id="vesicle-text">Endocytose: Die Zellmembran stülpt sich ein und schnürt ein Vesikel nach innen ab. So kann Material aufgenommen werden.</p>
    </div>`;
    const o=el.querySelector('#ao'), i=el.querySelector('#ai'), dir=el.querySelector('#pump-dir'), atpBtn=el.querySelector('#atp-toggle');
    let atp=true;
    const update=()=>{
      const ov=+o.value, iv=+i.value, moveIn=dir.value==='in';
      const source = moveIn ? ov : iv, target = moveIn ? iv : ov;
      const against = target >= source;
      el.querySelector('#ao-v').textContent=ov;el.querySelector('#ai-v').textContent=iv;el.querySelector('#ao-n').textContent=ov;el.querySelector('#ai-n').textContent=iv;
      el.querySelector('#pump-arrow').textContent=moveIn?'→':'←';
      el.querySelector('#pump-text').textContent=moveIn?'außen → innen':'innen → außen';
      el.querySelector('#gradient-text').textContent=against?'gegen das Konzentrationsgefälle':'in Richtung des Konzentrationsgefälles';
      el.querySelector('#pump-status').textContent=atp?'Pumpe arbeitet – Energie wird bereitgestellt':'Pumpe steht – ohne Energie kein aktiver Transport';
    };
    o.oninput=update;i.oninput=update;dir.onchange=update;atpBtn.onclick=()=>{atp=!atp;atpBtn.classList.toggle('active',atp);atpBtn.textContent=`ATP: ${atp?'verfügbar':'nicht verfügbar'}`;update();};update();
    el.querySelectorAll('[data-vesicle]').forEach(b=>b.onclick=()=>{
      el.querySelectorAll('[data-vesicle]').forEach(x=>x.classList.remove('active'));b.classList.add('active');
      const mode=b.dataset.vesicle, visual=el.querySelector('#vesicle-visual');visual.className=`vesicle-visual ${mode}`;
      el.querySelector('#vesicle-text').textContent=mode==='endo'?'Endocytose: Die Zellmembran stülpt sich ein und schnürt ein Vesikel nach innen ab. So kann Material aufgenommen werden.':'Exocytose: Ein Vesikel verschmilzt mit der Zellmembran und gibt seinen Inhalt nach außen ab.';
    });
  }

  if (type === 'peptideBuilder') {
    el.innerHTML = `<div class="lab-grid">
      <div>
        <p>Baue schrittweise eine Polypeptidkette. Im Modell besitzt jede Aminosäure dieselbe Grundstruktur, aber einen unterschiedlichen Rest R.</p>
        <button class="primary-btn" id="aa-add">+ Aminosäure anfügen</button>
        <button class="toggle" id="aa-remove">letzte Aminosäure entfernen</button>
        <div class="mini-note">Bei jeder neu geknüpften Peptidbindung wird im vereinfachten Modell ein Wassermolekül abgespalten.</div>
      </div>
      <div class="lab-result peptide-result">
        <div class="amino-formula">H₂N—CH(R)—COOH</div>
        <div id="peptide-chain" class="peptide-chain"></div>
        <p><strong>Aminosäuren:</strong> <span id="aa-count">2</span></p>
        <p><strong>Peptidbindungen:</strong> <span id="bond-count">1</span></p>
        <p><strong>abgespaltene H₂O:</strong> <span id="water-count">1</span></p>
      </div>
    </div>`;
    let count=2;
    const update=()=>{
      const chain=Array.from({length:count},(_,idx)=>`<span class="aa-bead">AS${idx+1}</span>${idx<count-1?'<i class="peptide-bond">—CO—NH—</i>':''}`).join('');
      el.querySelector('#peptide-chain').innerHTML=chain;el.querySelector('#aa-count').textContent=count;el.querySelector('#bond-count').textContent=Math.max(0,count-1);el.querySelector('#water-count').textContent=Math.max(0,count-1);
    };
    el.querySelector('#aa-add').onclick=()=>{count=Math.min(8,count+1);update();};el.querySelector('#aa-remove').onclick=()=>{count=Math.max(1,count-1);update();};update();
  }

  if (type === 'proteinStructure') {
    el.innerHTML = `<div class="structure-lab">
      <div class="structure-tabs">
        <button class="mini-action active" data-level="primary">Primär</button><button class="mini-action" data-level="secondary">Sekundär</button><button class="mini-action" data-level="tertiary">Tertiär</button><button class="mini-action" data-level="quaternary">Quartär</button>
      </div>
      <div class="protein-stage"><div id="protein-shape" class="protein-shape primary"><span>A</span><span>G</span><span>S</span><span>L</span><span>K</span><span>V</span></div></div>
      <div class="structure-caption" id="structure-caption"><strong>Primärstruktur</strong><span>Reihenfolge der Aminosäuren in einer Polypeptidkette.</span></div>
      <div class="denature-controls"><label>Temperatur im Modell <b id="denat-v">25 °C</b></label><input id="denat" type="range" min="20" max="90" value="25"><p id="denat-text">Die räumliche Struktur bleibt im Modell stabil.</p></div>
    </div>`;
    const data={
      primary:['Primärstruktur','Reihenfolge der Aminosäuren in einer Polypeptidkette.'],
      secondary:['Sekundärstruktur','Lokale regelmäßige Faltungen wie α-Helix oder β-Faltblatt.'],
      tertiary:['Tertiärstruktur','Gesamte dreidimensionale Faltung einer Polypeptidkette durch Wechselwirkungen der Seitenketten.'],
      quaternary:['Quartärstruktur','Zusammenlagerung mehrerer Polypeptidketten zu einem funktionellen Protein.']
    };
    let level='primary';const shape=el.querySelector('#protein-shape'),caption=el.querySelector('#structure-caption'),slider=el.querySelector('#denat');
    const update=()=>{
      const temp=+slider.value, denatured=temp>=60;
      el.querySelector('#denat-v').textContent=`${temp} °C`;shape.className=`protein-shape ${level}${denatured && level!=='primary'?' denatured':''}`;
      caption.innerHTML=`<strong>${data[level][0]}</strong><span>${data[level][1]}</span>`;
      el.querySelector('#denat-text').textContent=denatured?'Im Modell werden höhere Strukturebenen gestört: Das Protein verliert seine typische räumliche Form. Die Aminosäuresequenz bleibt dabei erhalten.':'Die räumliche Struktur bleibt im Modell stabil.';
    };
    el.querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{el.querySelectorAll('[data-level]').forEach(x=>x.classList.remove('active'));b.classList.add('active');level=b.dataset.level;update();});slider.oninput=update;update();
  }

  if (type === 'enzymeBinding') {
    el.innerHTML = `<div class="enzyme-binding-grid">
      <div class="lab-controls">
        <label>Modell auswählen</label><select id="enzyme-model" class="lab-select"><option value="lock">Schlüssel-Schloss-Modell</option><option value="induced">Induced-Fit-Modell</option></select>
        <p>Teste verschiedene Substrate am aktiven Zentrum.</p>
        <div class="substrate-buttons"><button class="mini-action" data-sub="circle">● Substrat A</button><button class="mini-action" data-sub="triangle">▲ Substrat B</button><button class="mini-action" data-sub="square">■ Substrat C</button></div>
      </div>
      <div class="enzyme-stage">
        <div class="enzyme-shape" id="enzyme-shape"><div class="active-site"></div></div>
        <div class="substrate-stage" id="substrate-stage">Wähle ein Substrat.</div>
        <div class="enzyme-feedback" id="enzyme-feedback">Das aktive Zentrum besitzt eine passende räumliche und chemische Struktur für bestimmte Substrate.</div>
      </div>
    </div>`;
    const model=el.querySelector('#enzyme-model'), enzyme=el.querySelector('#enzyme-shape'), stage=el.querySelector('#substrate-stage'), fb=el.querySelector('#enzyme-feedback');
    el.querySelectorAll('[data-sub]').forEach(b=>b.onclick=()=>{
      const sub=b.dataset.sub, fits=sub==='triangle';
      el.querySelectorAll('[data-sub]').forEach(x=>x.classList.remove('active'));b.classList.add('active');
      stage.innerHTML=`<span class="substrate-icon ${sub}">${sub==='circle'?'●':sub==='triangle'?'▲':'■'}</span>`;
      enzyme.classList.toggle('induced', model.value==='induced' && fits);
      if(fits){fb.textContent=model.value==='lock'?'Substrat B passt zum aktiven Zentrum: Es entsteht ein Enzym-Substrat-Komplex. Das Enzym katalysiert anschließend eine bestimmte Reaktion.':'Substrat B bindet. Beim Induced Fit verändert das Enzym seine Form leicht, sodass der Enzym-Substrat-Komplex optimal entsteht.';}
      else{fb.textContent='Dieses Substrat bindet im Modell nicht passend: Das veranschaulicht die Substratspezifität.';}
    });
    model.onchange=()=>{enzyme.classList.remove('induced');stage.textContent='Wähle ein Substrat.';fb.textContent=model.value==='lock'?'Schlüssel-Schloss: aktives Zentrum und passendes Substrat werden als weitgehend komplementär dargestellt.':'Induced Fit: Das aktive Zentrum ist flexibel und passt seine Form bei Bindung des passenden Substrats etwas an.';};
  }

  if (type === 'experimentPlanner') {
    el.innerHTML = `<div class="planner-grid">
      <div class="lab-controls">
        <label>Unabhängige Variable</label>
        <select id="exp-factor" class="lab-select"><option value="temp">Temperatur</option><option value="ph">pH-Wert</option><option value="substrate">Substratkonzentration</option></select>
        <label>Untersuchtes Enzym</label>
        <select id="exp-enzyme" class="lab-select"><option>Katalase</option><option>Amylase</option><option>Urease</option></select>
        <button class="primary-btn" id="build-plan">Versuchsplan erzeugen</button>
      </div>
      <div class="lab-result planner-result">
        <p><strong>Fragestellung:</strong> <span id="exp-question"></span></p>
        <p><strong>Hypothese:</strong> <span id="exp-hypothesis"></span></p>
        <p><strong>Abhängige Variable:</strong> <span id="exp-dependent"></span></p>
        <p><strong>Konstant halten:</strong> <span id="exp-controls"></span></p>
        <p><strong>Kontrollansatz:</strong> <span id="exp-control"></span></p>
      </div>
    </div>
    <div class="data-check"><strong>Dokumentations-Check</strong><div class="check-chips"><span>✓ gleiche Messdauer</span><span>✓ Einheiten notieren</span><span>✓ Wiederholungen planen</span><span>✓ unabhängige Variable auf x-Achse</span><span>✓ abhängige Variable auf y-Achse</span></div></div>`;
    const factor=el.querySelector('#exp-factor'), enzyme=el.querySelector('#exp-enzyme');
    const build=()=>{
      const f=factor.value, name=enzyme.value;
      const factorName=f==='temp'?'Temperatur':f==='ph'?'pH-Wert':'Substratkonzentration';
      const controls=f==='temp'?'pH-Wert, Enzymmenge, Substratmenge, Gesamtvolumen und Messdauer':f==='ph'?'Temperatur, Enzymmenge, Substratmenge, Gesamtvolumen und Messdauer':'Temperatur, pH-Wert, Enzymmenge, Gesamtvolumen und Messdauer';
      const hypothesis=f==='temp'?`Wenn die Temperatur verändert wird, ändert sich die Reaktionsgeschwindigkeit von ${name}; im mittleren Bereich wird ein Aktivitätsmaximum erwartet, bei sehr hoher Temperatur kann die Aktivität durch Strukturveränderungen sinken.`:f==='ph'?`Wenn der pH-Wert verändert wird, ändert sich die Reaktionsgeschwindigkeit von ${name}, weil die räumliche Struktur und Ladungsverteilung am aktiven Zentrum beeinflusst werden können.`:`Wenn die Substratkonzentration erhöht wird, steigt die Reaktionsgeschwindigkeit von ${name} zunächst an, bis viele aktive Zentren häufig besetzt sind.`;
      el.querySelector('#exp-question').textContent=`Welchen Einfluss hat die ${factorName} auf die Reaktionsgeschwindigkeit von ${name}?`;
      el.querySelector('#exp-hypothesis').textContent=hypothesis;
      el.querySelector('#exp-dependent').textContent='Reaktionsgeschwindigkeit, z. B. Produktmenge pro Zeit oder Zeit bis zu einem festgelegten Endpunkt';
      el.querySelector('#exp-controls').textContent=controls;
      el.querySelector('#exp-control').textContent='Eine Referenzbedingung, die nicht verändert wird; zusätzlich kann ein Ansatz ohne aktives Enzym zeigen, ob die beobachtete Reaktion tatsächlich enzymabhängig ist.';
    };
    el.querySelector('#build-plan').onclick=build;factor.onchange=build;enzyme.onchange=build;build();
  }
}

function render() {
  const id = location.hash.replace('#/','');
  const m = modules.find(x => x.id === id);
  app.innerHTML = m ? fullModulePage(m) : home();
  app.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => navigate(b.dataset.open)));
  if (m) {
    document.getElementById('back').onclick = () => navigate('');
    const toggleComplete = () => { completed.has(m.id) ? completed.delete(m.id) : completed.add(m.id); save(); render(); };
    document.getElementById('complete').onclick = toggleComplete;
    document.getElementById('complete-bottom').onclick = toggleComplete;
    app.querySelectorAll('[data-hint]').forEach(b => b.addEventListener('click', () => { const h=document.getElementById(`hint-${b.dataset.hint}`); h.hidden=!h.hidden; b.textContent=h.hidden?'Hinweis':'Hinweis schließen'; }));
    initQuickCheck(m);
    initQuiz(m);
    initLab(m.lab);
  }
}
render();
