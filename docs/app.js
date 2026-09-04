(function () {
  const views = {
    '/': document.getElementById('view-overview'),
    '/biomolekuele': document.getElementById('view-biomolekuele'),
    '/biomolekuele/modul-1': document.getElementById('view-module-1'),
    '/biomolekuele/modul-2': document.getElementById('view-module-2'),
    // Alte Links bleiben funktionsfähig.
    '/modul-1': document.getElementById('view-module-1'),
    '/modul-2': document.getElementById('view-module-2')
  };

  function route() {
    const hash = location.hash.replace('#', '') || '/';
    const target = views[hash] || views['/'];
    [...new Set(Object.values(views))].forEach(v => v.hidden = v !== target);

    // Oberthema in der Hauptnavigation markieren.
    document.querySelectorAll('.top-nav a').forEach(a => a.classList.remove('is-active'));
    const activeSelector = hash.startsWith('/biomolekuele') || hash.startsWith('/modul-')
      ? '.top-nav a[href="#/biomolekuele"]'
      : '.top-nav a[href="#/"]';
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
    const saved = localStorage.getItem('bio-' + id);
    if (saved) field.value = saved;
    btn.addEventListener('click', () => {
      localStorage.setItem('bio-' + id, field.value);
      status.textContent = 'Gespeichert.';
      setTimeout(() => status.textContent = '', 1800);
    });
  });

  // Selfcheck persistence
  document.querySelectorAll('[data-check]').forEach(cb => {
    const key = 'bio-check-' + cb.dataset.check;
    cb.checked = localStorage.getItem(key) === '1';
    cb.addEventListener('change', () => localStorage.setItem(key, cb.checked ? '1' : '0'));
  });

  // Module 1 scenario simulation
  const scenarioText = {
    none: '<strong>Keine Grenze:</strong> Stoffe können sich unkontrolliert zwischen Innen- und Außenraum verteilen. Stabile Konzentrationsunterschiede sind kaum aufrechtzuerhalten.',
    wall: '<strong>Undurchlässige Wand:</strong> Konzentrationsunterschiede könnten zwar erhalten bleiben, aber notwendiger Stoff- und Energieaustausch wäre blockiert.',
    membrane: '<strong>Biomembran:</strong> Sie grenzt den Reaktionsraum ab und ermöglicht zugleich einen kontrollierten, selektiven Austausch.'
  };
  const sim = document.getElementById('m1-sim');
  const result = document.getElementById('m1-scenario-result');
  if (sim && result) {
    result.innerHTML = scenarioText.none;
    document.querySelectorAll('.scenario-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.scenario-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        sim.dataset.state = btn.dataset.scenario;
        result.innerHTML = scenarioText[btn.dataset.scenario];
      });
    });
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

  // Quiz engine
document.querySelectorAll('.quiz').forEach(quiz => {
  const questions = [...quiz.querySelectorAll('.quiz-question')];
  const summary = quiz.querySelector('.quiz-summary');
  const answered = new Map();

  questions.forEach((q, index) => {
    const multiple = q.dataset.multiple === 'true';

    const correctAnswers = q.dataset.correct
      .split(',')
      .map(answer => answer.trim());

    const feedback = q.querySelector('.feedback');
    const buttons = [...q.querySelectorAll('button[data-answer]')];

    // Ausgewählte Antworten bei Mehrfachauswahl
    const selected = new Set();

    // ==========================================
    // MEHRFACHAUSWAHL
    // ==========================================
    if (multiple) {

      // Prüfen-Button erzeugen
      const checkButton = document.createElement('button');
      checkButton.type = 'button';
      checkButton.className = 'check-answer';
      checkButton.textContent = 'Antwort prüfen';

      q.appendChild(checkButton);

      // Antwort auswählen / abwählen
      buttons.forEach(btn => {
        btn.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();

          // Nach Auswertung nichts mehr ändern
          if (answered.has(index)) return;

          const answer = btn.dataset.answer;

          if (selected.has(answer)) {
            // Antwort abwählen
            selected.delete(answer);
            btn.classList.remove('selected');
          } else {
            // Antwort auswählen
            selected.add(answer);
            btn.classList.add('selected');
          }

          // WICHTIG:
          // Hier findet KEINE Auswertung statt!
          feedback.textContent =
            selected.size > 0
              ? `${selected.size} Antwort${selected.size === 1 ? '' : 'en'} ausgewählt.`
              : '';

        });
      });

      // ==========================================
      // ERST HIER WIRD DIE ANTWORT AUSGEWERTET
      // ==========================================
      checkButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        // Bereits beantwortet
        if (answered.has(index)) return;

        // Keine Antwort ausgewählt
        if (selected.size === 0) {
          feedback.textContent =
            'Bitte wähle mindestens eine Antwort aus.';
          return;
        }

        // Prüfen, ob exakt die richtigen Antworten gewählt wurden
        const isCorrect =
          selected.size === correctAnswers.length &&
          correctAnswers.every(answer => selected.has(answer));

        answered.set(index, isCorrect);

        // Alle Antwortbuttons auswerten
        buttons.forEach(btn => {
          btn.disabled = true;

          const answer = btn.dataset.answer;

          // Richtige Antworten grün markieren
          if (correctAnswers.includes(answer)) {
            btn.classList.add('correct');
          }

          // Falsch ausgewählte Antworten rot markieren
          if (
            selected.has(answer) &&
            !correctAnswers.includes(answer)
          ) {
            btn.classList.add('wrong');
          }
        });

        // Feedback
        if (isCorrect) {
          feedback.textContent =
            'Richtig. Du hast alle richtigen Aussagen ausgewählt.';
        } else {
          feedback.textContent =
            'Noch nicht. Vergleiche deine Auswahl mit den grün markierten Lösungen.';
        }

        // Prüfen-Button deaktivieren
        checkButton.disabled = true;

        updateSummary();
      });

      // Wichtig:
      // Danach nicht noch den Einfachauswahl-Code ausführen.
      return;
    }

    // ==========================================
    // EINFACHAUSWAHL
    // ==========================================
    buttons.forEach(btn => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (answered.has(index)) return;

        const answer = btn.dataset.answer;
        const isCorrect = correctAnswers.includes(answer);

        answered.set(index, isCorrect);

        buttons.forEach(b => {
          b.disabled = true;

          if (correctAnswers.includes(b.dataset.answer)) {
            b.classList.add('correct');
          }
        });

        if (isCorrect) {
          feedback.textContent =
            'Richtig. Die Aussage trifft den zentralen Zusammenhang.';
        } else {
          btn.classList.add('wrong');
          feedback.textContent =
            'Noch nicht. Vergleiche deine Wahl mit der grün markierten Lösung und gehe den entsprechenden Infoblock noch einmal durch.';
        }

        updateSummary();
      });
    }
  });

  // ==========================================
  // QUIZ-ZUSAMMENFASSUNG
  // ==========================================
  function updateSummary() {
    const totalCorrect =
      [...answered.values()].filter(Boolean).length;

    summary.textContent =
      `${answered.size} von ${questions.length} beantwortet · ${totalCorrect} richtig`;

    if (answered.size === questions.length) {
      summary.textContent +=
        totalCorrect >= 4
          ? ' · Sehr solide Grundlage.'
          : ' · Wiederhole die markierten Stellen und versuche die AFB-Aufgaben anschließend erneut.';
    }
  }

  summary.textContent =
    `0 von ${questions.length} beantwortet`;
});
