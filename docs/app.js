const app = document.getElementById('app');
const brand = document.getElementById('brand');
const completed = new Set(JSON.parse(localStorage.getItem('bio-completed-v2') || '[]'));
const previewMode =
  new URLSearchParams(window.location.search).get("preview") === "1";

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const save = () => localStorage.setItem('bio-completed-v2', JSON.stringify([...completed]));
const quizKey = id => `bio-quiz-${id}`;
const summaryKey = id => `bio-summary-${id}`;
const taskKey = (id, i) => `bio-task-${id}-${i}`;
//Zeitgesteuerte Freischaltung
const previewMode = new URLSearchParams(window.location.search).get('preview') === '1';

function todayISO() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isLocked(module) {
  if (previewMode) return false;
  if (!module.unlockDate) return false;

  return todayISO() < module.unlockDate;
}

function formatUnlockDate(date) {
  if (!date) return '';
  const [year, month, day] = date.split('-');
  return `${day}.${month}.${year}`;
}


function navigate(id) {
  location.hash = id ? `#/${id}` : '#/';
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
brand.addEventListener('click', () => navigate(''));
window.addEventListener('hashchange', render);

function home() {
  const done = modules.filter(m => completed.has(m.id)).length;
  const cards = modules.map((m, idx) => {
  const locked = isLocked(m);

  return `${idx === 7 ? '<div class="holiday-break"><span>HERBSTFERIEN</span><strong>Kurze Pause – danach geht es mit Auswertung und Hemmung weiter.</strong></div>' : ''}
    <button
      class="module-card ${locked ? 'locked' : 'ready'}"
      ${locked ? 'disabled' : `data-open="${m.id}"`}
    >
      <div class="module-topline">
        <span>${m.number}</span>
        <span>${esc(m.date)}</span>
      </div>

      <div class="module-icon">${locked ? '🔒' : m.icon}</div>

      <h2>${esc(m.title)}</h2>

      <p>${esc(m.subtitle)}</p>

      <div class="module-footer">
        <span>${locked ? `verfügbar ab ${formatUnlockDate(m.unlockDate)}` : 'vollständig'}</span>
        <span>${locked ? '🔒 gesperrt' : completed.has(m.id) ? '✓ erledigt' : '→ öffnen'}</span>
      </div>
    </button>`;
}).join('');
  return `<main>
    <section class="hero">
      <div class="hero-copy">
        <div class="eyebrow">BIOLOGIE · BASISFACH · BADEN-WÜRTTEMBERG</div>
        <h1>Bio-Lernlabor <span>J1 · Kursstart bis Enzymhemmung</span></h1>
        <p>Dein Unterricht als digitaler Lernpfad: Wissen abrufen, einlesen, verstehen, ausprobieren, selbst formulieren und gezielt nacharbeiten.</p>
        <div class="hero-badges"><span>Unterrichtsplan 2026/27</span><span>Basisfach</span><span>iPad-optimiert</span><span>Antworten lokal gespeichert</span></div>
      </div>
      <div class="hero-card">
        <div class="dna-mark">J1</div>
        <strong>${modules.length} Lernmodule</strong>
        <span>vom Membranaufbau bis zur Enzymhemmung</span>
        <div class="progress-pill">${done}/${modules.length} erledigt · ${Math.round(done/modules.length*100)}%</div>
      </div>
    </section>

    <section class="notice">
      <strong>So lernst du hier</strong>
      <p> Dieses Lernlabor soll dir dabei helfen, biologische Inhalte zu verstehen, auszuprobieren und zu wiederholen. Du kannst einzelne Abschnitte passend zum Unterricht nutzen, Themen selbstständig nacharbeiten oder dich später auf Tests und Klausuren vorbereiten.

Die Module enthalten kurze Erklärtexte, Verständnisfragen, interaktive Lernlabore, Aufgaben und Selbsttests. Du musst nicht immer alles auf einmal bearbeiten – nutze die Bereiche, die dir gerade helfen. Wenn du unsicher bist, beginne mit dem Einlesetext und arbeite dich Schritt für Schritt weiter.</p>
    </section>

    <section class="timeline-head">
      <div><div class="eyebrow">DEIN LERNPFAD</div><h2>September bis Anfang November</h2></div>
      <span>15.09.–03.11.2026</span>
    </section>
    <section class="module-grid schedule-grid">${cards}</section>

    <section class="method-strip"><div><b>01</b><span>Abrufen</span></div><div><b>02</b><span>Einlesen</span></div><div><b>03</b><span>Ausprobieren</span></div><div><b>04</b><span>Selbst erklären</span></div><div><b>05</b><span>Gezielt nacharbeiten</span></div></section>
  </main>`;
}

function learningPath(m) {
  return `<section class="learning-path panel compact-panel">
    <div class="eyebrow">LERNWEG</div>
    <div class="path-row">
      ${m.review?.length ? '<button class="path-link" data-scroll="review">↩️ Wiederholen</button><span>→</span>' : ''}
      <button class="path-link" data-scroll="read">📖 Einlesen</button><span>→</span>
      <button class="path-link" data-scroll="check">🧠 Kurzcheck</button><span>→</span>
      <button class="path-link" data-scroll="summary">✍️ Zusammenfassen</button><span>→</span>
      <button class="path-link" data-scroll="lab-section">🎛️ Lernlabor</button><span>→</span>
      <button class="path-link" data-scroll="train">✏️ Anwenden</button><span>→</span>
      <button class="path-link" data-scroll="selftest">✅ Selbsttest</button>
    </div>
  </section>`;
}

function reviewSection(m) {
  if (!m.review?.length) return '';
  return `<section class="panel review-panel" id="review">
    <div class="eyebrow">WIEDERHOLEN · OHNE NACHZUSCHAUEN</div>
    <h2>Was weißt du noch?</h2>
    <p class="section-lead">Versuche die drei Fragen zuerst aus dem Gedächtnis. Das Abrufen älterer Inhalte hilft, neues Wissen besser zu verknüpfen.</p>
    <div class="quick-list">
      ${m.review.map((q, qi) => `<article class="quick-card" data-review-card="${qi}"><h3>${qi+1}. ${esc(q.q)}</h3><div class="option-list">${q.options.map((o,oi)=>`<button data-rq="${qi}" data-ro="${oi}">${esc(o)}</button>`).join('')}</div><div class="feedback" id="review-feedback-${qi}" hidden></div></article>`).join('')}
    </div>
  </section>`;
}

function summarySection(m) {
  const saved = localStorage.getItem(summaryKey(m.id)) || '';
  return `<section class="panel summary-panel" id="summary">
    <div class="eyebrow">AKTIVES ABRUFEN</div>
    <h2>Erkläre das Modul in deinen eigenen Worten</h2>
    <p class="section-lead">Schließe den Einlesetext kurz aus dem Blick und schreibe 3–5 Sätze: Was sind die wichtigsten Zusammenhänge? Deine Eingabe bleibt nur auf diesem Gerät im Browser gespeichert.</p>
    <textarea class="learning-note" id="module-summary" rows="6" placeholder="Meine Zusammenfassung …">${esc(saved)}</textarea>
    <div class="autosave" id="summary-save">lokal gespeichert</div>
  </section>`;
}

function experimentOptionsSection(m) {
  if (!m.experimentOptions?.length) return '';
  return `<section class="panel experiment-options">
    <div class="eyebrow">FÜR DIE DURCHFÜHRUNG AM 20.10.</div>
    <h2>Drei mögliche Enzymversuche</h2>
    <p class="section-lead">Die konkrete Variante legt die Lehrkraft fest. Diese Karten helfen dir, Messgröße und Versuchslogik schon vor der Durchführung zu verstehen.</p>
    <div class="experiment-grid">${m.experimentOptions.map(x=>`<article><h3>${esc(x.title)}</h3><p><strong>Materialidee:</strong> ${esc(x.material)}</p><p><strong>Mögliche Messgröße:</strong> ${esc(x.measure)}</p><small>⚠ ${esc(x.note)}</small></article>`).join('')}</div>
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
    <div class="eyebrow">ANWENDEN · DEINE ANTWORTEN WERDEN LOKAL GESPEICHERT</div>
    <h2>Aufgaben nach Anforderungsbereichen</h2>
    <p class="section-lead">Formuliere zuerst selbst. Nutze den Hinweis nur, wenn du festhängst, und vergleiche erst danach mit der Musterlösung.</p>
    <div class="task-list">${m.tasks.map((t,i)=>`<article class="task"><div class="task-head"><div class="afb afb-${t.afb.toLowerCase()}">AFB ${t.afb}</div><p>${esc(t.prompt)}</p></div><textarea class="task-answer" data-task-answer="${i}" rows="4" placeholder="Meine Antwort …">${esc(localStorage.getItem(taskKey(m.id,i)) || '')}</textarea><div class="task-actions"><button data-hint="${i}">Hinweis</button><button data-solution="${i}">Musterlösung anzeigen</button><span class="autosave">wird lokal gespeichert</span></div><div class="hint" id="hint-${i}" hidden>💡 ${esc(t.hint)}</div><div class="solution" id="solution-${i}" hidden><strong>Musterlösung</strong><p>${esc(t.solution || t.hint)}</p><small>Vergleiche Fachbegriffe und Begründung – deine Formulierung muss nicht wortgleich sein.</small></div></article>`).join('')}</div>
  </section>`;
}

function quizSection(m) {
  const best = Number(localStorage.getItem(quizKey(m.id)) || 0);
  return `<section class="panel quiz-panel" id="selftest">
    <div class="eyebrow">SELBSTTEST</div>
    <h2>${m.quiz.length} Fragen zum Abschluss</h2>
    <p class="section-lead">Ziel: mindestens ${Math.max(1, m.quiz.length - 1)} von ${m.quiz.length} richtig. Nach der Auswertung siehst du zu jeder Frage die richtige Antwort, eine Erklärung und den passenden Einleseabschnitt.</p>
    <div class="quiz-best">Bestwert: <strong id="best-score">${best}/${m.quiz.length}</strong></div>
    <form id="quiz-form">
      ${m.quiz.map((q, qi) => `<fieldset class="quiz-question" data-quiz-question="${qi}"><legend>${qi+1}. ${esc(q.q)}</legend>${q.options.map((o, oi) => `<label><input type="radio" name="q${qi}" value="${oi}"><span>${esc(o)}</span></label>`).join('')}</fieldset>`).join('')}
      <button type="submit" class="primary-btn">Selbsttest auswerten</button>
    </form>
    <div id="quiz-result" class="quiz-result" hidden></div>
    <div id="quiz-detail" class="quiz-detail" hidden></div>
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
    ${learningPath(m)}
    ${reviewSection(m)}
    ${bookBox(m)}
    <section class="panel"><div class="eyebrow">LERNZIELE</div><h2>Das solltest du danach können</h2><div class="goal-grid">${m.goals.map((g,i)=>`<div class="goal"><span>${String(i+1).padStart(2,'0')}</span><p>${esc(g)}</p></div>`).join('')}</div></section>
    ${readingSection(m)}
    ${quickCheckSection(m)}
    ${summarySection(m)}
    <section class="panel lab-panel" id="lab-section"><div class="eyebrow">INTERAKTIV</div><h2 id="lab-title"></h2><p class="lab-intro">Nutze das Modell nicht nur zum Anschauen: Beschreibe jede Veränderung mit biologischer Fachsprache.</p><div id="lab"></div></section>
    ${researchSection(m)}
    ${experimentOptionsSection(m)}
    ${taskSection(m)}
    ${quizSection(m)}
    <section class="finish-panel"><div><span>Modul ${esc(m.number)}</span><strong>${esc(m.title)} abgeschlossen?</strong><p>Markiere das Modul erst, wenn du die Grundideen ohne Hilfe erklären kannst.</p></div><button class="complete ${completed.has(m.id) ? 'done' : ''}" id="complete-bottom">${completed.has(m.id) ? '✓ erledigt' : 'Als erledigt markieren'}</button></section>
    <section class="source-note"><strong>Hinweis:</strong> Die Erklärtexte sind eigenständig formuliert und an deinem Unterrichtsplan orientiert. Markl und Natura werden ergänzend genutzt; urheberrechtlich geschützte Buchtexte oder Abbildungen werden hier nicht kopiert.</section>
  </main>`;
}

function initReview(m) {
  if (!m.review?.length) return;
  app.querySelectorAll('[data-rq]').forEach(btn => btn.addEventListener('click', () => {
    const qi=Number(btn.dataset.rq), oi=Number(btn.dataset.ro), q=m.review[qi];
    const card=btn.closest('.quick-card'); card.querySelectorAll('[data-ro]').forEach(b=>b.classList.remove('correct-choice','wrong-choice'));
    const fb=document.getElementById(`review-feedback-${qi}`); fb.hidden=false;
    if(oi===q.correct){btn.classList.add('correct-choice');fb.className='feedback good';fb.textContent=`✓ ${q.explain}`;}
    else{btn.classList.add('wrong-choice');card.querySelector(`[data-ro="${q.correct}"]`).classList.add('correct-choice');fb.className='feedback bad';fb.textContent=`Noch nicht. ${q.explain}`;}
  }));
}

function initSummary(m) {
  const ta=document.getElementById('module-summary'); if(!ta) return;
  const status=document.getElementById('summary-save'); let timer;
  ta.addEventListener('input',()=>{status.textContent='speichert …';clearTimeout(timer);timer=setTimeout(()=>{localStorage.setItem(summaryKey(m.id),ta.value);status.textContent='lokal gespeichert ✓';},250);});
}

function initTaskNotes(m) {
  app.querySelectorAll('[data-task-answer]').forEach(ta=>ta.addEventListener('input',()=>localStorage.setItem(taskKey(m.id,Number(ta.dataset.taskAnswer)),ta.value)));
  app.querySelectorAll('[data-solution]').forEach(btn=>btn.addEventListener('click',()=>{const box=document.getElementById(`solution-${btn.dataset.solution}`);box.hidden=!box.hidden;btn.textContent=box.hidden?'Musterlösung anzeigen':'Musterlösung schließen';}));
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
    const details=[];
    m.quiz.forEach((q, qi) => {
      const chosen = form.querySelector(`input[name="q${qi}"]:checked`);
      if (chosen) answered++;
      const chosenIndex = chosen ? Number(chosen.value) : -1;
      const ok = chosenIndex === q.correct;
      if(ok) score++;
      details.push({q,chosenIndex,ok});
    });
    const result = document.getElementById('quiz-result');
    const detail = document.getElementById('quiz-detail');
    result.hidden = false;
    if (answered < m.quiz.length) {
      result.className = 'quiz-result warn';
      result.innerHTML = `<strong>Noch nicht vollständig</strong><span>Du hast ${answered} von ${m.quiz.length} Fragen beantwortet.</span>`;
      detail.hidden=true;
      return;
    }
    const oldBest = Number(localStorage.getItem(quizKey(m.id)) || 0);
    const best = Math.max(oldBest, score);
    localStorage.setItem(quizKey(m.id), best);
    document.getElementById('best-score').textContent = `${best}/${m.quiz.length}`;
    const target = Math.max(1, m.quiz.length - 1);
    result.className = `quiz-result ${score >= target ? 'good' : 'bad'}`;
    result.innerHTML = score >= target
      ? `<strong>${score}/${m.quiz.length} – Ziel erreicht ✓</strong><span>Lies trotzdem die Rückmeldung unten: Sie zeigt dir, ob einzelne Stellen noch unsicher sind.</span>`
      : `<strong>${score}/${m.quiz.length} – gezielt nacharbeiten</strong><span>Unten siehst du genau, welche Abschnitte du noch einmal lesen solltest.</span>`;
    detail.hidden=false;
    detail.innerHTML = details.map((d,i)=>`<article class="quiz-feedback-card ${d.ok?'ok':'needs-work'}"><div class="quiz-feedback-head"><strong>${d.ok?'✓':'↻'} Frage ${i+1}</strong><span>${d.ok?'sicher':'noch einmal ansehen'}</span></div><p>${esc(d.q.q)}</p><div class="answer-line"><b>Deine Antwort:</b> ${d.chosenIndex>=0?esc(d.q.options[d.chosenIndex]):'–'}</div><div class="answer-line"><b>Richtig:</b> ${esc(d.q.options[d.q.correct])}</div><p class="why">${esc(d.q.explain || 'Diese Antwort entspricht der Kernaussage aus dem Einlesetext.')}</p>${d.q.review?`<button class="review-link" data-scroll="read">📖 Noch einmal lesen: ${esc(d.q.review)}</button>`:''}</article>`).join('');
    detail.querySelectorAll('[data-scroll]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.scroll)?.scrollIntoView({behavior:'smooth',block:'start'})));
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
    experimentPlanner:'Experiment-Planer',
    enzymeActivity:'Enzymaktivität: Kurven lesen',
    enzymeInhibition:'Enzymhemmung: Kurven vergleichen'
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

  if (type === 'enzymeActivity') {
    el.innerHTML = `<div class="activity-lab-grid"><div class="lab-controls"><label>Einflussgröße</label><select id="activity-factor" class="lab-select"><option value="temp">Temperatur</option><option value="ph">pH-Wert</option><option value="substrate">Substratkonzentration</option></select><label id="activity-slider-label">Temperatur <b id="activity-value"></b></label><input id="activity-slider" type="range"><div class="data-check"><strong>Arbeitsauftrag</strong><p id="activity-task">Beschreibe zuerst nur den Kurvenverlauf. Erkläre ihn anschließend biologisch.</p></div></div><div class="activity-panel"><svg id="activity-chart" viewBox="0 0 520 300" role="img" aria-label="Diagramm der relativen Enzymaktivität"></svg><div class="activity-readout"><div><span>aktueller Wert</span><strong id="activity-x"></strong></div><div><span>relative Aktivität</span><strong id="activity-y"></strong></div></div><p id="activity-explain"></p></div></div>`;
    const factor=el.querySelector('#activity-factor'), slider=el.querySelector('#activity-slider'), chart=el.querySelector('#activity-chart');
    const configs={
      temp:{min:5,max:80,step:1,value:37,label:'Temperatur',unit:' °C',calc:x=>{const rise=Math.exp(-Math.pow((x-38)/24,2));const crash=x<=42?1:Math.exp(-(x-42)/11);return Math.min(100,100*rise*crash);},explain:x=>x<30?'Bei niedriger Temperatur sind wirksame Zusammenstöße seltener; die Aktivität ist geringer.':x<=45?'Im mittleren Bereich sind Teilchenbewegung und wirksame Zusammenstöße günstig; hier liegt im Modell das Aktivitätsmaximum.':'Bei hoher Temperatur sinkt die Aktivität im Modell deutlich, weil die räumliche Proteinstruktur und damit das aktive Zentrum gestört werden können.'},
      ph:{min:2,max:12,step:.1,value:7,label:'pH-Wert',unit:'',calc:x=>100*Math.exp(-Math.pow((x-7)/2.0,2)),explain:x=>Math.abs(x-7)<1?'Dieser Bereich liegt nahe am pH-Optimum des Modell-Enzyms.':'Mit wachsendem Abstand vom pH-Optimum sinkt die Aktivität, weil Ladungen und Wechselwirkungen im Protein verändert werden können.'},
      substrate:{min:0,max:100,step:1,value:30,label:'Substratkonzentration',unit:' rel.',calc:x=>100*x/(22+x),explain:x=>x<25?'Mehr Substrat erhöht die Häufigkeit von Enzym-Substrat-Kontakten deutlich.':x<65?'Die Aktivität steigt weiter, aber weniger stark, weil aktive Zentren zunehmend häufig besetzt sind.':'Das Modell nähert sich der Sättigung: Zusätzliches Substrat erhöht die Geschwindigkeit nur noch wenig.'}
    };
    const draw=()=>{const c=configs[factor.value];slider.min=c.min;slider.max=c.max;slider.step=c.step;if(+slider.value<c.min||+slider.value>c.max||slider.dataset.factor!==factor.value){slider.value=c.value;slider.dataset.factor=factor.value;}const x=+slider.value,y=c.calc(x);el.querySelector('#activity-slider-label').innerHTML=`${c.label} <b id="activity-value">${x}${c.unit}</b>`;el.querySelector('#activity-x').textContent=`${x}${c.unit}`;el.querySelector('#activity-y').textContent=`${Math.round(y)} %`;el.querySelector('#activity-explain').textContent=c.explain(x);const pts=[];for(let i=0;i<=80;i++){const xv=c.min+(c.max-c.min)*i/80;const yy=c.calc(xv);const px=48+420*(xv-c.min)/(c.max-c.min),py=245-190*yy/100;pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);}const cx=48+420*(x-c.min)/(c.max-c.min),cy=245-190*y/100;chart.innerHTML=`<line x1="48" y1="245" x2="480" y2="245" class="axis"/><line x1="48" y1="245" x2="48" y2="38" class="axis"/><text x="260" y="285" class="axis-label">${c.label}</text><text x="15" y="145" class="axis-label vertical">Aktivität</text><polyline points="${pts.join(' ')}" class="curve"/><circle cx="${cx}" cy="${cy}" r="7" class="chart-point"/><text x="52" y="55" class="chart-note">100 %</text><text x="52" y="238" class="chart-note">0 %</text>`;};
    factor.onchange=draw;slider.oninput=draw;draw();
  }

  if (type === 'enzymeInhibition') {
    el.innerHTML = `<div class="inhibition-grid"><div class="lab-controls"><label>Hemmung</label><select id="inh-type" class="lab-select"><option value="none">keine Hemmung</option><option value="competitive">reversibel / kompetitiv</option><option value="irreversible">irreversibel</option></select><label>Substratkonzentration <b id="inh-s-v">25</b></label><input id="inh-s" type="range" min="1" max="100" value="25"><label>Hemmstoffstärke <b id="inh-i-v">45 %</b></label><input id="inh-i" type="range" min="0" max="80" value="45"><div class="mini-note">Vereinfachtes Lernmodell: Es zeigt Grundprinzipien, keine realen Arzneidosierungen.</div></div><div class="activity-panel"><svg id="inh-chart" viewBox="0 0 520 300" role="img" aria-label="Vergleich von Enzymhemmung"></svg><div class="activity-readout"><div><span>relative Aktivität</span><strong id="inh-activity"></strong></div><div><span>Deutung</span><strong id="inh-label"></strong></div></div><p id="inh-explain"></p></div></div>`;
    const typeSel=el.querySelector('#inh-type'), sld=el.querySelector('#inh-s'), inh=el.querySelector('#inh-i'), chart=el.querySelector('#inh-chart');
    const calc=(type,S,I)=>{const base=100*S/(20+S);if(type==='none')return base;if(type==='competitive')return 100*S/((20*(1+I/45))+S);return base*(1-I/110);};
    const draw=()=>{const type=typeSel.value,S=+sld.value,I=+inh.value,A=calc(type,S,I);el.querySelector('#inh-s-v').textContent=S;el.querySelector('#inh-i-v').textContent=`${I} %`;el.querySelector('#inh-activity').textContent=`${Math.round(A)} %`;const labels={none:'ungehemmt',competitive:'Konkurrenz am aktiven Zentrum',irreversible:'weniger funktionsfähige Enzyme'};el.querySelector('#inh-label').textContent=labels[type];el.querySelector('#inh-explain').textContent=type==='none'?'Ohne Hemmstoff steigt die Aktivität mit der Substratkonzentration bis zur Sättigung.':type==='competitive'?'Der reversible kompetitive Hemmstoff konkurriert mit dem Substrat. Mehr Substrat kann die Hemmwirkung im Modell teilweise ausgleichen.':'Ein Anteil der Enzyme bleibt im Modell dauerhaft inaktiv. Mehr Substrat kann diese Enzymmoleküle nicht reaktivieren.';const curves=[['none','ungehemmt'],[type,type==='competitive'?'kompetitiv':'irreversibel']].filter((x,i,a)=>i===0||x[0]!=='none');const paths=curves.map((c,idx)=>{const pts=[];for(let sv=1;sv<=100;sv+=2){const y=calc(c[0],sv,I),px=48+420*(sv-1)/99,py=245-190*y/100;pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);}return `<polyline points="${pts.join(' ')}" class="curve curve-${idx}"/><text x="345" y="${65+idx*22}" class="legend legend-${idx}">${c[1]}</text>`;}).join('');const cx=48+420*(S-1)/99,cy=245-190*A/100;chart.innerHTML=`<line x1="48" y1="245" x2="480" y2="245" class="axis"/><line x1="48" y1="245" x2="48" y2="38" class="axis"/><text x="245" y="285" class="axis-label">Substratkonzentration</text><text x="15" y="145" class="axis-label vertical">Aktivität</text>${paths}<circle cx="${cx}" cy="${cy}" r="7" class="chart-point"/>`;};
    typeSel.onchange=draw;sld.oninput=draw;inh.oninput=draw;draw();
  }

}

function render() {
  const id = location.hash.replace('#/','');
  const requestedModule = modules.find(x => x.id === id);

  if (requestedModule && isLocked(requestedModule)) {
    app.innerHTML = `
      <main>
        <section class="hero">
          <div class="hero-copy">
            <div class="eyebrow">NOCH NICHT FREIGESCHALTET</div>
            <h1>🔒 ${esc(requestedModule.title)}</h1>
            <p>
              Dieses Lernmodul ist ab dem
              <strong>${formatUnlockDate(requestedModule.unlockDate)}</strong>
              verfügbar.
            </p>
            <button class="path-link" id="locked-back">
              ← Zurück zum Lernpfad
            </button>
          </div>
        </section>
      </main>
    `;

    document.getElementById('locked-back').onclick = () => navigate('');
    return;
  }

  const m = requestedModule;
  app.innerHTML = m ? fullModulePage(m) : home();
  app.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => navigate(b.dataset.open)));
  if (m) {
    document.getElementById('back').onclick = () => navigate('');
    const toggleComplete = () => { completed.has(m.id) ? completed.delete(m.id) : completed.add(m.id); save(); render(); };
    document.getElementById('complete').onclick = toggleComplete;
    document.getElementById('complete-bottom').onclick = toggleComplete;
    app.querySelectorAll('[data-hint]').forEach(b => b.addEventListener('click', () => { const h=document.getElementById(`hint-${b.dataset.hint}`); h.hidden=!h.hidden; b.textContent=h.hidden?'Hinweis':'Hinweis schließen'; }));
    app.querySelectorAll('[data-scroll]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.scroll)?.scrollIntoView({behavior:'smooth',block:'start'})));
    initReview(m);
    initQuickCheck(m);
    initSummary(m);
    initTaskNotes(m);
    initQuiz(m);
    initLab(m.lab);
  }
}
render();
