const app = document.getElementById('app');
const brand = document.getElementById('brand');
const completed = new Set(JSON.parse(localStorage.getItem('bio-completed') || '[]'));

const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const save = () => localStorage.setItem('bio-completed', JSON.stringify([...completed]));

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
        <h1>Bio-Lernlabor <span>J1 / Kursstufe</span></h1>
        <p>Verstehen. Ausprobieren. Experimentieren. Üben. Ein touch-optimiertes Lernlabor für iPad und Browser.</p>
        <div class="hero-badges"><span>Bildungsplan V2 (2022)</span><span>3-stündiges Basisfach</span><span>iPad-optimiert</span></div>
      </div>
      <div class="hero-card"><div class="dna-mark">DNA</div><strong>6 Inhaltsfelder</strong><span>mit interaktiven Modellen und AFB-Aufgaben</span><div class="progress-pill">${done}/${modules.length} erledigt · ${Math.round(done/modules.length*100)}%</div></div>
    </section>
    <section class="notice"><strong>Hinweis zur J1-Reihenfolge</strong><p>Der baden-württembergische Bildungsplan beschreibt die Inhalte für Klassen 11/12 gemeinsam. Die konkrete Verteilung auf J1 und J2 kann schulisch variieren. Die beiden Grundlagenmodule sind hier bewusst zuerst angeordnet.</p></section>
    <section class="module-grid">
      ${modules.map(m => `<button class="module-card" data-open="${m.id}"><div class="module-topline"><span>${m.number}</span><span>${m.bp}</span></div><div class="module-icon">${m.icon}</div><h2>${esc(m.title)}</h2><p>${esc(m.subtitle)}</p><div class="module-footer"><span>${esc(m.phase)}</span><span>${completed.has(m.id) ? '✓ erledigt' : '→ öffnen'}</span></div></button>`).join('')}
    </section>
    <section class="method-strip"><div><b>01</b><span>Verstehen</span></div><div><b>02</b><span>Modellieren</span></div><div><b>03</b><span>Experimentieren</span></div><div><b>04</b><span>Auswerten</span></div><div><b>05</b><span>Bewerten</span></div></section>
  </main>`;
}

function modulePage(m) {
  return `<main class="module-page">
    <button class="back" id="back">← Übersicht</button>
    <header class="module-hero"><div><div class="eyebrow">${m.bp} · ${esc(m.phase)}</div><h1><span class="hero-icon">${m.icon}</span>${esc(m.title)}</h1><p>${esc(m.intro)}</p></div><button class="complete ${completed.has(m.id) ? 'done' : ''}" id="complete">${completed.has(m.id) ? '✓ Modul erledigt' : 'Als erledigt markieren'}</button></header>
    <section class="panel"><div class="eyebrow">LERNZIELE</div><h2>Das solltest du können</h2><div class="goal-grid">${m.goals.map((g,i)=>`<div class="goal"><span>${String(i+1).padStart(2,'0')}</span><p>${esc(g)}</p></div>`).join('')}</div></section>
    <section class="panel"><div class="eyebrow">KERNIDEEN</div><h2>Das Konzept hinter den Details</h2><div class="concept-grid">${m.keyConcepts.map(c=>`<article class="concept"><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></article>`).join('')}</div></section>
    <section class="panel lab-panel"><div class="eyebrow">INTERAKTIV</div><h2 id="lab-title"></h2><div id="lab"></div></section>
    <section class="panel experiment-panel"><div class="eyebrow">EXPERIMENT</div><h2>${esc(m.experiment.title)}</h2><div class="experiment-grid"><div><h3>Material</h3><p>${esc(m.experiment.material)}</p></div><div><h3>Durchführung</h3><p>${esc(m.experiment.procedure)}</p></div><div><h3>Auswertung</h3><p>${esc(m.experiment.evaluation)}</p></div></div></section>
    <section class="panel"><div class="eyebrow">TRAINING</div><h2>Aufgaben nach Anforderungsbereichen</h2><div class="task-list">${m.tasks.map((t,i)=>`<article class="task"><div class="afb afb-${t.afb.toLowerCase()}">AFB ${t.afb}</div><p>${esc(t.prompt)}</p><button data-hint="${i}">Hinweis</button><div class="hint" id="hint-${i}" hidden>💡 ${esc(t.hint)}</div></article>`).join('')}</div></section>
    <section class="source-note"><strong>Lehrkraft-Hinweis:</strong> Inhalte sind eigenständig formuliert und am Bildungsplan Biologie Gymnasium BW, V2 (2022), Bereich 3.4 Basisfach orientiert. Sie ersetzen nicht den offiziellen Wortlaut oder ein schulinternes Curriculum.</section>
  </main>`;
}

function meter(label, value) {
  const safe = Math.max(0, Math.min(100, value));
  return `<div class="meter-wrap"><div class="meter-label"><span>${label}</span><strong id="meter-value">${Math.round(value)}%</strong></div><div class="meter"><div class="meter-fill" id="meter-fill" style="width:${safe}%"></div></div></div>`;
}

function initLab(type) {
  const el = document.getElementById('lab');
  const title = document.getElementById('lab-title');
  const titles = {membrane:'Membran-Labor', enzyme:'Enzym-Labor', selection:'Selektions-Labor', tolerance:'Toleranz-Labor', neuron:'Neuron-Labor', pcr:'PCR-Labor'};
  title.textContent = titles[type];
  if (type === 'membrane') {
    el.innerHTML = `<div class="lab-grid"><div><label>Teilchenkonzentration außen <b id="o-v">80</b></label><input id="o" type="range" min="0" max="100" value="80"><label>Teilchenkonzentration innen <b id="i-v">25</b></label><input id="i" type="range" min="0" max="100" value="25"><button class="toggle" id="active">Aktiver Transport: AUS</button></div><div class="lab-result"><div class="membrane-scene"><div><span class="big-number" id="o-n">80</span><small>außen</small></div><div class="membrane-line">⇄</div><div><span class="big-number" id="i-n">25</span><small>innen</small></div></div><p><strong>Spontaner Nettofluss:</strong> <span id="natural"></span></p><p><strong>Im gewählten Modell:</strong> <span id="actual"></span></p><p><strong>ATP-Verbrauch:</strong> <span id="atp"></span></p></div></div>`;
    let active = false; const o=el.querySelector('#o'), i=el.querySelector('#i'), btn=el.querySelector('#active');
    const update=()=>{const ov=+o.value,iv=+i.value,d=ov-iv,n=d===0?'kein Nettofluss':d>0?'außen → innen':'innen → außen',a=active?(d>=0?'innen → außen':'außen → innen'):n; el.querySelector('#o-v').textContent=ov;el.querySelector('#i-v').textContent=iv;el.querySelector('#o-n').textContent=ov;el.querySelector('#i-n').textContent=iv;el.querySelector('#natural').textContent=n;el.querySelector('#actual').textContent=a;el.querySelector('#atp').textContent=active?'ja – Transport gegen das Konzentrationsgefälle':'nein';};
    o.oninput=update;i.oninput=update;btn.onclick=()=>{active=!active;btn.classList.toggle('active',active);btn.textContent=`Aktiver Transport: ${active?'AN':'AUS'}`;update();};update();
  }
  if (type === 'enzyme') {
    el.innerHTML=`<div class="lab-grid"><div><label>Temperatur <b id="t-v">37 °C</b></label><input id="t" type="range" min="0" max="80" value="37"><label>pH-Wert <b id="p-v">7.0</b></label><input id="p" type="range" min="1" max="13" step="0.1" value="7"><label>Substratangebot <b id="s-v">60 %</b></label><input id="s" type="range" min="0" max="100" value="60"></div><div class="lab-result">${meter('modellierte Enzymaktivität',70)}<p class="lab-note">Didaktisches Modell: Die Kurve dient zum Erkunden von Einflussfaktoren und ersetzt keine realen Messdaten.</p></div></div>`;
    const t=el.querySelector('#t'),p=el.querySelector('#p'),s=el.querySelector('#s'); const update=()=>{const tv=+t.value,pv=+p.value,sv=+s.value,a=Math.max(0,Math.min(1,Math.exp(-Math.pow((tv-37)/16,2))*Math.exp(-Math.pow((pv-7)/2.1,2))*(sv/(25+sv))*1.35))*100;el.querySelector('#t-v').textContent=`${tv} °C`;el.querySelector('#p-v').textContent=pv.toFixed(1);el.querySelector('#s-v').textContent=`${sv} %`;el.querySelector('#meter-value').textContent=`${Math.round(a)}%`;el.querySelector('#meter-fill').style.width=`${a}%`;};t.oninput=update;p.oninput=update;s.oninput=update;update();
  }
  if (type === 'selection') {
    el.innerHTML=`<div class="lab-grid"><div><label>Startanteil Merkmal A <b id="f-v">50 %</b></label><input id="f" type="range" min="1" max="99" value="50"><label>Fitnessvorteil A <b id="a-v">20 %</b></label><input id="a" type="range" min="0" max="50" value="20"><label>Generationen <b id="g-v">8</b></label><input id="g" type="range" min="1" max="30" value="8"></div><div class="lab-result">${meter('Anteil Merkmal A nach Simulation',70)}<p><strong>Änderung:</strong> <span id="change"></span></p><p class="lab-note">Vereinfachtes Selektionsmodell ohne Mutation, Rekombination, Drift oder Migration.</p></div></div>`;
    const f=el.querySelector('#f'),a=el.querySelector('#a'),g=el.querySelector('#g');const update=()=>{const fv=+f.value,av=+a.value,gv=+g.value;let p=fv/100;const w=1+av/100;for(let k=0;k<gv;k++)p=(p*w)/(p*w+(1-p));const fin=p*100;el.querySelector('#f-v').textContent=`${fv} %`;el.querySelector('#a-v').textContent=`${av} %`;el.querySelector('#g-v').textContent=gv;el.querySelector('#meter-value').textContent=`${Math.round(fin)}%`;el.querySelector('#meter-fill').style.width=`${fin}%`;el.querySelector('#change').textContent=`${fin>=fv?'+':''}${(fin-fv).toFixed(1)} Prozentpunkte`;};f.oninput=update;a.oninput=update;g.oninput=update;update();
  }
  if (type === 'tolerance') {
    el.innerHTML=`<div class="lab-grid"><div><label>Umwelttemperatur <b id="e-v">22 °C</b></label><input id="e" type="range" min="0" max="45" value="22"><label>artspezifisches Optimum <b id="o-v">24 °C</b></label><input id="o" type="range" min="5" max="40" value="24"><label>Toleranzbreite <b id="w-v">10</b></label><input id="w" type="range" min="4" max="18" value="10"></div><div class="lab-result">${meter('relative Leistungsfähigkeit',90)}<p><strong>Einordnung:</strong> <span id="zone"></span></p><p class="lab-note">Mit „Toleranzbreite“ lässt sich erkunden, warum Arten unterschiedlich stenök oder euryök reagieren können.</p></div></div>`;
    const e=el.querySelector('#e'),o=el.querySelector('#o'),w=el.querySelector('#w');const update=()=>{const ev=+e.value,ov=+o.value,wv=+w.value,perf=Math.exp(-Math.pow((ev-ov)/wv,2))*100,zone=perf>70?'Präferendum':perf>20?'Pejusbereich':'Pessimum / außerhalb günstiger Bedingungen';el.querySelector('#e-v').textContent=`${ev} °C`;el.querySelector('#o-v').textContent=`${ov} °C`;el.querySelector('#w-v').textContent=wv;el.querySelector('#meter-value').textContent=`${Math.round(perf)}%`;el.querySelector('#meter-fill').style.width=`${perf}%`;el.querySelector('#zone').textContent=zone;};e.oninput=update;o.oninput=update;w.oninput=update;update();
  }
  if (type === 'neuron') {
    el.innerHTML=`<div class="lab-grid"><div><label>Reizstärke <b id="s-v">35</b></label><input id="s" type="range" min="0" max="100" value="35"><div class="threshold"><span>Schwelle</span><strong>50</strong></div></div><div class="lab-result"><svg viewBox="0 0 160 100" class="ap-chart"><line x1="0" y1="72" x2="160" y2="72" class="axis-line"></line><polyline id="curve" fill="none" class="ap-line"></polyline></svg><p><strong id="fire"></strong></p><p class="lab-note">Das Modell illustriert Schwellen- und Alles-oder-nichts-Prinzip, nicht reale Millivolt- oder Zeitwerte.</p></div></div>`;
    const s=el.querySelector('#s');const update=()=>{const v=+s.value,fire=v>=50;el.querySelector('#s-v').textContent=v;el.querySelector('#curve').setAttribute('points',fire?'0,72 30,72 42,70 50,54 58,18 65,8 72,50 82,88 95,78 120,72 160,72':`0,72 40,72 55,${72-v*.25} 70,72 160,72`);el.querySelector('#fire').textContent=fire?'Aktionspotenzial ausgelöst':'kein Aktionspotenzial';};s.oninput=update;update();
  }
  if (type === 'pcr') {
    el.innerHTML=`<div class="lab-grid"><div><label>PCR-Zyklen <b id="c-v">10</b></label><input id="c" type="range" min="1" max="35" value="10"><label>Effizienz pro Zyklus <b id="e-v">90 %</b></label><input id="e" type="range" min="50" max="100" value="90"></div><div class="lab-result"><span class="huge-number" id="copies"></span><small>modellierte Kopien ausgehend von einem DNA-Abschnitt</small><p class="lab-note">Bei 100 % Effizienz verdoppelt sich die Ziel-DNA idealisiert pro Zyklus.</p></div></div>`;
    const c=el.querySelector('#c'),e=el.querySelector('#e');const update=()=>{const cv=+c.value,ev=+e.value,n=Math.pow(1+ev/100,cv);el.querySelector('#c-v').textContent=cv;el.querySelector('#e-v').textContent=`${ev} %`;el.querySelector('#copies').textContent=n>1e6?`${(n/1e6).toFixed(1)} Mio.`:Math.round(n).toLocaleString('de-DE');};c.oninput=update;e.oninput=update;update();
  }
}

function render() {
  const id = location.hash.replace('#/','');
  const m = modules.find(x => x.id === id);
  app.innerHTML = m ? modulePage(m) : home();
  app.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => navigate(b.dataset.open)));
  if (m) {
    document.getElementById('back').onclick = () => navigate('');
    document.getElementById('complete').onclick = () => { completed.has(m.id) ? completed.delete(m.id) : completed.add(m.id); save(); render(); };
    app.querySelectorAll('[data-hint]').forEach(b => b.addEventListener('click', () => { const h=document.getElementById(`hint-${b.dataset.hint}`); h.hidden=!h.hidden; b.textContent=h.hidden?'Hinweis':'Hinweis schließen'; }));
    initLab(m.lab);
  }
}
render();
