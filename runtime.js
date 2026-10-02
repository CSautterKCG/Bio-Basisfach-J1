
(function () {
  const config = window.BIOLAB_CONFIG || { schuljahr: '', freigegebeneModule: [], termine: {} };
  const vorhandeneModule = [...document.querySelectorAll('[id^="view-module-"]')]
    .map(view => Number(view.id.replace('view-module-', '')));
  const freigegeben = nummer => BioModelle.istFreigegeben(nummer, config, vorhandeneModule);
  const lockedView = document.getElementById('view-gesperrt');
  const datum = nummer => config.termineAnzeigen && config.termine?.[nummer]
    ? config.termine[nummer] : '';
  document.querySelectorAll('[data-schuljahr]').forEach(element => {
    element.textContent += config.schuljahr ? ` · Schuljahr ${config.schuljahr}` : '';
  });
  document.querySelectorAll('[data-modul]').forEach(card => {
    const nummer = Number(card.dataset.modul);
    const offen = freigegeben(nummer);
    const dateElement = card.querySelector('.module-date');
    dateElement.textContent = datum(nummer);
    dateElement.hidden = !datum(nummer);
    card.querySelector('.module-status').textContent = offen ? 'freigegeben' : 'Noch nicht freigegeben';
    if (!offen && card.tagName === 'A') {
      const replacement = document.createElement('article');
      replacement.dataset.modul = nummer;
      replacement.innerHTML = card.innerHTML;
      replacement.className = 'module-card module-card--planned';
      replacement.setAttribute('aria-disabled', 'true');
      card.replaceWith(replacement);
    }
  });
  document.querySelectorAll('[data-modul-kopf]').forEach(element => {
    const nummer = Number(element.dataset.modulKopf);
    element.textContent = `Modul ${nummer}` + (datum(nummer) ? ` · ${datum(nummer)}` : '');
  });
  document.querySelectorAll('.module-footer-nav a').forEach(link => {
    const nummer = BioModelle.modulNummer(link.hash.slice(1));
    if (nummer !== null && !freigegeben(nummer)) link.hidden = true;
  });
  document.getElementById('module-count').textContent =
    `9 Module · davon ${vorhandeneModule.filter(freigegeben).length} freigegeben`;
  const storageKey = name => `bio-${config.schuljahr || 'ohne-schuljahr'}-${name}`;
  function getSaved(name) {
    try {
      return localStorage.getItem(storageKey(name))
        ?? (config.schuljahr === '2026/27' ? localStorage.getItem('bio-' + name) : null);
    } catch { return null; }
  }
  const views = {
    '/': document.getElementById('view-overview'),
    '/biomolekuele': document.getElementById('view-biomolekuele'),
    '/zellatmung': document.getElementById('view-zellatmung'),
    '/fotosynthese': document.getElementById('view-fotosynthese'),
    '/molekulare-genetik': document.getElementById('view-molekulare-genetik'),
    '/angewandte-biologie': document.getElementById('view-angewandte-biologie'),
    '/oekologie': document.getElementById('view-oekologie'),
    '/biomolekuele/modul-1': document.getElementById('view-module-1'),
    '/biomolekuele/modul-2': document.getElementById('view-module-2'),
    '/biomolekuele/modul-3': document.getElementById('view-module-3'),
    '/biomolekuele/modul-4': document.getElementById('view-module-4'),
    // Alte Links bleiben funktionsfähig.
    '/modul-1': document.getElementById('view-module-1'),
    '/modul-2': document.getElementById('view-module-2'),
    '/modul-3': document.getElementById('view-module-3'),
    '/modul-4': document.getElementById('view-module-4')
  };

  function route() {
    const hash = location.hash.replace('#', '') || '/';
    const nummer = BioModelle.modulNummer(hash);
    const target = nummer !== null && !freigegeben(nummer)
      ? lockedView : (views[hash.replace(/\/$/, '') || '/'] || views['/']);
    document.getElementById('locked-description').textContent =
      nummer !== null ? `Modul ${nummer} ist noch nicht freigegeben. Deine Lehrkraft entscheidet, wann du es öffnen kannst.` : '';
    [...new Set([...Object.values(views), lockedView])].forEach(v => v.hidden = v !== target);

    // Oberthema in der Hauptnavigation markieren.
    document.querySelectorAll('.top-nav a').forEach(a => a.classList.remove('is-active'));
    const topicPaths = ['/biomolekuele', '/zellatmung', '/fotosynthese', '/molekulare-genetik', '/angewandte-biologie', '/oekologie'];
    const activePath = topicPaths.find(path => hash.startsWith(path))
      || (hash.startsWith('/modul-') ? '/biomolekuele' : '/');
    const activeSelector = `.top-nav a[href="#${activePath}"]`;
    document.querySelector(activeSelector)?.classList.add('is-active');

    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('main').focus({ preventScroll: true });
  }
  window.addEventListener('hashchange', route);
  route();

  // Local notes
  document.querySelectorAll('.save-note').forEach(btn => {
    const id = btn.dataset.note;
    const field = document.getElementById(id);
    const status = document.getElementById(id + '-status');
    const saved = getSaved(id);
    if (saved) field.value = saved;
    btn.addEventListener('click', () => {
      try {
        localStorage.setItem(storageKey(id), field.value);
        status.textContent = 'Gespeichert.';
      } catch {
        status.textContent = 'Speichern ist in diesem Browser nicht verfügbar.';
      }
      setTimeout(() => status.textContent = '', 1800);
    });
  });

  // Selfcheck persistence
  document.querySelectorAll('[data-check]').forEach(cb => {
    const name = 'check-' + cb.dataset.check;
    cb.checked = getSaved(name) === '1';
    cb.addEventListener('change', () => {
      try { localStorage.setItem(storageKey(name), cb.checked ? '1' : '0'); } catch { /* Keep usable without storage. */ }
    });
  });

  // Module 1 scenario simulation
  const scenarioText = {
    none: '<strong>Keine Grenze:</strong> Rote und blaue Teilchen bewegen sich ungehindert zwischen Innen- und Außenraum. Der anfängliche Konzentrationsunterschied wird kleiner.',
    wall: '<strong>Undurchlässige Wand:</strong> Beide dargestellten Teilchensorten werden zurückgehalten. Ihr Konzentrationsunterschied bleibt bestehen. Wärmeübertragung ist hier nicht dargestellt.',
    membrane: '<strong>Biomembran:</strong> In diesem vereinfachten Modell können nur die blauen Teilchen passieren. Rote Teilchen werden zurückgehalten – die Membran ist selektiv durchlässig.'
  };
  const sim = document.getElementById('m1-sim');
  const result = document.getElementById('m1-scenario-result');
  const particleStage = document.getElementById('m1-particle-stage');
  const particleCounts = document.getElementById('m1-particle-counts');
  if (sim && result && particleStage && particleCounts) {
    const particles = [];
    let initialized = false;
    let previousTime = performance.now();
    let previousCountUpdate = 0;
    let lastStageWidth = 0;
    let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pauseButton = document.getElementById('m1-pause');

    function boundaryGeometry() {
      const stageRect = particleStage.getBoundingClientRect();
      const boundaryRect = particleStage.querySelector('.cell-boundary').getBoundingClientRect();
      return {
        width: stageRect.width,
        height: stageRect.height,
        cx: boundaryRect.left - stageRect.left + boundaryRect.width / 2,
        cy: boundaryRect.top - stageRect.top + boundaryRect.height / 2,
        rx: Math.max(20, boundaryRect.width / 2 - 9),
        ry: Math.max(20, boundaryRect.height / 2 - 9)
      };
    }

    function isInside(x, y, geometry) {
      return ((x - geometry.cx) / geometry.rx) ** 2
        + ((y - geometry.cy) / geometry.ry) ** 2 < 1;
    }

    function randomPosition(inside, geometry) {
      if (inside) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random()) * .82;
        return {
          x: geometry.cx + Math.cos(angle) * geometry.rx * radius,
          y: geometry.cy + Math.sin(angle) * geometry.ry * radius
        };
      }
      let position;
      do {
        position = {
          x: 10 + Math.random() * Math.max(1, geometry.width - 20),
          y: 10 + Math.random() * Math.max(1, geometry.height - 20)
        };
      } while (isInside(position.x, position.y, geometry));
      return position;
    }

    function updateCounts(geometry) {
      const inside = { a: 0, b: 0 };
      particles.forEach(particle => {
        if (isInside(particle.x, particle.y, geometry)) inside[particle.type] += 1;
      });
      const flaecheInnen = Math.PI * geometry.rx * geometry.ry;
      const flaecheAussen = geometry.width * geometry.height - flaecheInnen;
      const dichte = (count, area) => (count / area * 10000).toFixed(1);
      particleCounts.textContent = `Rot: ${inside.a} innen / ${20 - inside.a} außen · Blau: ${inside.b} innen / ${20 - inside.b} außen. Modelldichte Blau: ${dichte(inside.b, flaecheInnen)} innen / ${dichte(20 - inside.b, flaecheAussen)} außen (pro 10.000 Flächeneinheiten).`;
    }

    function resetParticles() {
      const geometry = boundaryGeometry();
      if (geometry.width < 50 || geometry.height < 50) return;
      particleStage.querySelectorAll('.particle').forEach(particle => particle.remove());
      particles.length = 0;

      ['a', 'b'].forEach(type => {
        for (let index = 0; index < 20; index += 1) {
          const startsInside = index < 16;
          const position = randomPosition(startsInside, geometry);
          const angle = Math.random() * Math.PI * 2;
          const speed = 32 + Math.random() * 30;
          const element = document.createElement('span');
          element.className = `particle particle-${type}`;
          particleStage.appendChild(element);
          particles.push({
            type,
            element,
            x: position.x,
            y: position.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            inside: startsInside
          });
        }
      });
      updateCounts(geometry);
      initialized = true;
      lastStageWidth = geometry.width;
    }

    function animateParticles(time) {
      const geometry = boundaryGeometry();
      if (geometry.width < 50 || geometry.height < 50) {
        initialized = false;
        previousTime = time;
        requestAnimationFrame(animateParticles);
        return;
      }
      if (!initialized || geometry.width !== lastStageWidth) resetParticles();

      const elapsed = Math.min((time - previousTime) / 1000, .04);
      previousTime = time;
      if (paused) {
        requestAnimationFrame(animateParticles);
        return;
      }
      particles.forEach(particle => {
        const oldX = particle.x;
        const oldY = particle.y;
        if (Math.random() < 1 - Math.exp(-2 * elapsed)) {
          const angle = Math.random() * Math.PI * 2;
          particle.vx = Math.cos(angle) * 45;
          particle.vy = Math.sin(angle) * 45;
        }
        particle.x += particle.vx * elapsed;
        particle.y += particle.vy * elapsed;

        if (particle.x < 5 || particle.x > geometry.width - 5) {
          particle.x = Math.max(5, Math.min(geometry.width - 5, particle.x));
          particle.vx *= -1;
        }
        if (particle.y < 5 || particle.y > geometry.height - 5) {
          particle.y = Math.max(5, Math.min(geometry.height - 5, particle.y));
          particle.vy *= -1;
        }

        const nowInside = isInside(particle.x, particle.y, geometry);
        const mayCross = sim.dataset.state === 'none'
          || (sim.dataset.state === 'membrane' && particle.type === 'b');
        if (nowInside !== particle.inside && !mayCross) {
          particle.x = oldX;
          particle.y = oldY;
          const nx = (oldX - geometry.cx) / (geometry.rx ** 2);
          const ny = (oldY - geometry.cy) / (geometry.ry ** 2);
          const norm = Math.hypot(nx, ny) || 1;
          const dot = particle.vx * nx / norm + particle.vy * ny / norm;
          particle.vx -= 2 * dot * nx / norm;
          particle.vy -= 2 * dot * ny / norm;
        } else {
          particle.inside = nowInside;
        }

        particle.element.style.left = `${particle.x - 5}px`;
        particle.element.style.top = `${particle.y - 5}px`;
      });

      if (time - previousCountUpdate > 300) {
        updateCounts(geometry);
        previousCountUpdate = time;
      }
      requestAnimationFrame(animateParticles);
    }

    result.innerHTML = scenarioText.none;
    document.querySelectorAll('.scenario-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.scenario-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        sim.dataset.state = btn.dataset.scenario;
        result.innerHTML = scenarioText[btn.dataset.scenario];
        resetParticles();
      });
    });
    const pauseLabel = () => pauseButton.textContent = paused ? 'Animation fortsetzen' : 'Animation pausieren';
    pauseLabel();
    pauseButton.addEventListener('click', () => { paused = !paused; pauseLabel(); });
    document.getElementById('m1-reset').addEventListener('click', resetParticles);
    requestAnimationFrame(animateParticles);
  }

  // Module 2 bilayer model
  const stage = document.getElementById('bilayer-stage');
  const bilayerFeedback = document.getElementById('bilayer-feedback');
  if (stage) {
    const positions = [8, 18, 28, 38, 48, 58, 68, 78, 88];
    positions.forEach((x, i) => {
      ['top','bottom'].forEach(side => {
        const lipid = document.createElement('div');
        lipid.className = 'lipid ' + side;
        lipid.style.left = `calc(${x}% - 14px)`;
        lipid.style.top = side === 'top' ? '68px' : '126px';
        lipid.style.animationDelay = `${(i % 4) * 0.15}s`;
        lipid.innerHTML = '<span class="l-head"></span><span class="l-tail one"></span><span class="l-tail two"></span>';
        stage.appendChild(lipid);
      });
    });
    const protein = document.createElement('div');
    protein.className = 'membrane-protein';
    protein.setAttribute('aria-label', 'Membranprotein');
    stage.appendChild(protein);

    document.querySelectorAll('.bilayer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.bilayer-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        stage.dataset.arrangement = btn.dataset.arrangement;
        if (btn.dataset.arrangement === 'correct') {
          bilayerFeedback.innerHTML = '<strong>Passend:</strong> Die hydrophilen Köpfe zeigen zu den wässrigen Räumen, die hydrophoben Bereiche liegen im Inneren der Doppelschicht.';
        } else if (btn.dataset.arrangement === 'insideout') {
          bilayerFeedback.innerHTML = '<strong>Nicht günstig:</strong> So hätten viele hydrophobe Bereiche direkten Kontakt mit Wasser. Prüfe die Begriffe hydrophil und hydrophob.';
        } else {
          bilayerFeedback.innerHTML = '<strong>Nicht stabil als Membran:</strong> Eine zufällige Anordnung schirmt die hydrophoben Bereiche nicht zuverlässig vom Wasser ab.';
        }
      });
    });

    const toggleProtein = document.getElementById('toggle-protein');
    toggleProtein.addEventListener('click', () => {
      protein.classList.toggle('visible');
      toggleProtein.textContent = protein.classList.contains('visible') ? 'Membranprotein ausblenden' : 'Membranprotein einblenden';
    });
    const toggleFluidity = document.getElementById('toggle-fluidity');
    toggleFluidity.addEventListener('click', () => {
      stage.classList.toggle('fluid');
      toggleFluidity.textContent = stage.classList.contains('fluid') ? 'Seitliche Beweglichkeit stoppen' : 'Seitliche Beweglichkeit starten';
    });
  }

  // Module 3: random particle motion, alternating-access carrier, volume-based osmosis.
  const transportStage = document.getElementById('m3-transport-stage');
  const transportExplanation = document.getElementById('m3-transport-explanation');
  const transportLegend = document.getElementById('m3-transport-legend');
  const transportCounts = document.getElementById('m3-transport-counts');
  if (transportStage && transportExplanation && transportLegend && transportCounts) {
    const panel = document.getElementById('m3-osmose');
    const inputs = [document.getElementById('osmose-stoff-a'), document.getElementById('osmose-stoff-b')];
    const pauseButton = document.getElementById('m3-pause');
    const carrierElement = transportStage.querySelector('.transport-carrier');
    const modes = {
      simple: ['small', 'Rot: kleine, unpolare Moleküle', 'Einfache Diffusion: Die Teilchen bewegen sich zufällig in beide Richtungen durch die Membran. Wegen des anfänglichen Konzentrationsgefälles erfolgt der Nettotransport von A nach B.'],
      channel: ['ion', 'Blau: passende Ionen', 'Kanalprotein: Die Ionen passieren nur die hydrophile Pore. Dieses Modell berücksichtigt keinen elektrischen Spannungsunterschied; bei realen Ionen bestimmt der elektrochemische Gradient die Richtung.'],
      carrier: ['glucose', 'Grün: passende Moleküle', 'Carrierprotein: Ein Molekül bindet, der Carrier wird vorübergehend zu beiden Seiten geschlossen und setzt es anschließend auf der anderen Seite frei. Der Carrier ist keine offene Pore. Transporte in beide Richtungen sind möglich, ohne ATP-Verbrauch.'],
      osmosis: ['water', 'Modellvolumen und nicht permeable Stoffmengen', 'Osmose: Wasser bewegt sich netto zur höheren Konzentration nicht permeabler Teilchen. Die Stoffmengen bleiben erhalten, während sich die Volumina verändern. Passe die Stoffmengen an und vergleiche die Richtung.']
    };
    let mode = 'simple';
    let particles = [];
    let carrier;
    let osmose;
    let initialized = false;
    let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lastTime = performance.now();
    let lastCount = 0;
    let lastWidth = 0;
    const geometry = () => ({ width: transportStage.clientWidth, height: transportStage.clientHeight, middle: transportStage.clientWidth / 2 });
    const format = x => x.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    function renderOsmose() {
      const ca = osmose.stoffA / osmose.volumenA;
      const cb = osmose.stoffB / osmose.volumenB;
      const total = osmose.volumenA + osmose.volumenB;
      document.getElementById('osmose-balken-a').style.width = `${osmose.volumenA / total * 100}%`;
      document.getElementById('osmose-balken-b').style.width = `${osmose.volumenB / total * 100}%`;
      document.getElementById('osmose-werte-a').textContent = `Volumen: ${format(osmose.volumenA)} · Stoffmenge: ${osmose.stoffA} · Konzentration: ${format(ca)}`;
      document.getElementById('osmose-werte-b').textContent = `Volumen: ${format(osmose.volumenB)} · Stoffmenge: ${osmose.stoffB} · Konzentration: ${format(cb)}`;
      document.getElementById('osmose-richtung').textContent = Math.abs(ca - cb) < 0.0001
        ? 'Gleichgewicht: kein Netto-Wassertransport; Wasser bewegt sich weiterhin in beide Richtungen.'
        : `Netto-Wassertransport: ${cb > ca ? 'A nach B' : 'B nach A'}.`;
      transportCounts.textContent = 'Gesamtvolumen: 24 Modelleinheiten (bleibt erhalten)';
    }
    function counts() {
      if (mode === 'osmosis') { renderOsmose(); return; }
      const left = particles.filter(p => p.left && !p.gebunden).length;
      const right = particles.filter(p => !p.left && !p.gebunden).length;
      transportCounts.textContent = `${left} frei in A / ${right} frei in B` + (mode === 'carrier' ? ` / ${carrier.teilchen ? 1 : 0} am Carrier gebunden · Carrier: ${carrier.phase}` + (carrier.phase === 'offen' ? ` zu ${carrier.linksOffen ? 'Seite A' : 'Seite B'}` : '') : '');
    }
    function reset() {
      transportStage.querySelectorAll('.transport-particle').forEach(p => p.remove());
      particles = [];
      carrier = { teilchen: null, zeit: 0, linksOffen: true, phase: 'offen' };
      transportStage.dataset.mode = mode;
      transportStage.hidden = mode === 'osmosis';
      panel.hidden = mode !== 'osmosis';
      transportLegend.textContent = modes[mode][1];
      transportExplanation.textContent = modes[mode][2];
      if (mode === 'osmosis') {
        osmose = { volumenA: 12, volumenB: 12, stoffA: Number(inputs[0].value), stoffB: Number(inputs[1].value) };
        initialized = true;
        counts();
        return;
      }
      const g = geometry();
      if (g.width < 80) { initialized = false; return; }
      lastWidth = g.width;
      for (let i = 0; i < 24; i++) {
        const left = i < 18;
        const angle = Math.random() * 2 * Math.PI;
        const speed = 40;
        const element = document.createElement('span');
        element.className = `transport-particle ${modes[mode][0]}`;
        transportStage.appendChild(element);
        particles.push({ kind: modes[mode][0], element, left, gebunden: false,
          x: (left ? 16 : g.middle + 28) + Math.random() * Math.max(1, g.middle - 46),
          y: 40 + Math.random() * (g.height - 56), vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed });
      }
      initialized = true;
      draw();
      counts();
    }
    function draw() {
      particles.forEach(p => {
        p.element.style.left = `${p.x - 6}px`;
        p.element.style.top = `${p.y - 6}px`;
        p.element.style.zIndex = p.gebunden ? '5' : '3';
      });
      carrierElement.dataset.phase = carrier.phase;
      carrierElement.dataset.side = carrier.phase === 'verschlossen' ? 'closed' : (carrier.linksOffen ? 'left' : 'right');
      carrierElement.setAttribute('aria-label', `Carrier: ${carrier.phase}`);
    }
    function frame(time) {
      const dt = Math.min((time - lastTime) / 1000, 0.04);
      lastTime = time;
      if (!document.getElementById('view-module-3').hidden) {
        if (!initialized) reset();
        if (initialized && !paused) {
          if (mode === 'osmosis') {
            osmose = BioModelle.osmoseSchritt(osmose, dt);
          } else {
            const g = geometry();
            if (g.width !== lastWidth) reset();
            particles.forEach(p => {
              if (p.gebunden) return;
              const oldX = p.x;
              // Unbiased random changes of direction; no steering to the dilute side.
              if (Math.random() < 1 - Math.exp(-2 * dt)) {
                const angle = Math.random() * 2 * Math.PI;
                p.vx = Math.cos(angle) * 40;
                p.vy = Math.sin(angle) * 40;
              }
              p.x += p.vx * dt;
              p.y += p.vy * dt;
              if (p.x < 8 || p.x > g.width - 8) { p.x = Math.max(8, Math.min(g.width - 8, p.x)); p.vx *= -1; }
              if (p.y < 36 || p.y > g.height - 8) { p.y = Math.max(36, Math.min(g.height - 8, p.y)); p.vy *= -1; }
              const nextLeft = p.x < g.middle;
              if (nextLeft !== p.left) {
                const inPore = Math.abs(p.y - g.height / 2) < 30;
                const mayCross = mode === 'simple' || (mode === 'channel' && inPore);
                if (mayCross) { p.left = nextLeft; }
                else { p.x = oldX; p.vx *= -1; }
              }
            });
            if (mode === 'carrier') BioModelle.carrierSchritt(carrier, particles, g, dt);
            draw();
          }
        }
        if (time - lastCount > 250) { counts(); lastCount = time; }
      }
      requestAnimationFrame(frame);
    }
    function pauseLabel() { pauseButton.textContent = paused ? 'Animation fortsetzen' : 'Animation pausieren'; }
    pauseButton.addEventListener('click', () => { paused = !paused; pauseLabel(); });
    document.getElementById('m3-reset').addEventListener('click', reset);
    inputs.forEach(input => input.addEventListener('input', reset));
    document.querySelectorAll('.transport-btn').forEach(button => {
      button.addEventListener('click', () => {
        mode = button.dataset.transport;
        document.querySelectorAll('.transport-btn').forEach(item => item.classList.toggle('is-active', item === button));
        reset();
      });
    });
    pauseLabel();
    reset();
    requestAnimationFrame(frame);
  }

  // Quiz engine
  document.querySelectorAll('.quiz').forEach(quiz => {
    const questions = [...quiz.querySelectorAll('.quiz-question')];
    const summary = quiz.querySelector('.quiz-summary');
    const answered = new Map();

    questions.forEach((q, index) => {
      const multiple = q.dataset.multiple === 'true';
      const correctAnswers = q.dataset.correct.split(',').map(answer => answer.trim());
      const feedback = q.querySelector('.feedback');
      const buttons = [...q.querySelectorAll('button[data-answer]')];
      const selected = new Set();

      if (multiple) {
        const checkButton = document.createElement('button');
        checkButton.type = 'button';
        checkButton.className = 'check-answer';
        checkButton.textContent = 'Antwort prüfen';
        q.appendChild(checkButton);

        buttons.forEach(btn => {
          btn.addEventListener('click', () => {
            if (answered.has(index)) return;

            const answer = btn.dataset.answer;
            if (selected.has(answer)) {
              selected.delete(answer);
              btn.classList.remove('selected');
            } else {
              selected.add(answer);
              btn.classList.add('selected');
            }

            feedback.textContent = selected.size
              ? `${selected.size} Antwort${selected.size === 1 ? '' : 'en'} ausgewählt.`
              : '';
          });
        });

        checkButton.addEventListener('click', () => {
          if (answered.has(index)) return;
          if (selected.size === 0) {
            feedback.textContent = 'Bitte wähle mindestens eine Antwort aus.';
            return;
          }

          const isCorrect = selected.size === correctAnswers.length
            && correctAnswers.every(answer => selected.has(answer));
          answered.set(index, isCorrect);

          buttons.forEach(btn => {
            btn.disabled = true;
            if (correctAnswers.includes(btn.dataset.answer)) btn.classList.add('correct');
            if (selected.has(btn.dataset.answer) && !correctAnswers.includes(btn.dataset.answer)) {
              btn.classList.add('wrong');
            }
          });

          feedback.textContent = isCorrect
            ? 'Richtig. Du hast alle richtigen Aussagen ausgewählt.'
            : 'Noch nicht. Vergleiche deine Auswahl mit den grün markierten Lösungen.';
          checkButton.disabled = true;
          updateSummary();
        });
        return;
      }

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          if (answered.has(index)) return;
          const isCorrect = correctAnswers.includes(btn.dataset.answer);
          answered.set(index, isCorrect);
          buttons.forEach(b => {
            b.disabled = true;
            if (correctAnswers.includes(b.dataset.answer)) b.classList.add('correct');
          });
          if (isCorrect) {
            feedback.textContent = 'Richtig. Die Aussage trifft den zentralen Zusammenhang.';
          } else {
            btn.classList.add('wrong');
            feedback.textContent = 'Noch nicht. Vergleiche deine Wahl mit der grün markierten Lösung und gehe den entsprechenden Infoblock noch einmal durch.';
          }
          updateSummary();
        });
      });
    });

    function updateSummary() {
      const totalCorrect = [...answered.values()].filter(Boolean).length;
      summary.textContent = `${answered.size} von ${questions.length} beantwortet · ${totalCorrect} richtig`;
      if (answered.size === questions.length) {
        summary.textContent += totalCorrect >= 4 ? ' · Sehr solide Grundlage.' : ' · Wiederhole die markierten Stellen und versuche die AFB-Aufgaben anschließend erneut.';
      }
    }

    summary.textContent = `0 von ${questions.length} beantwortet`;
  });
})();
