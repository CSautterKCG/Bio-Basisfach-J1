const modules = [
  {
    id: 'biomembran',
    number: '01',
    date: '15.09.2026',
    title: 'Biomembran',
    subtitle: 'Phospholipide · Flüssig-Mosaik-Modell · Membranproteine · Kompartimentierung',
    icon: '🫧',
    status: 'ready',
    bp: 'Molekulare Biologie · Grundlagen',
    hook: 'Wie kann eine nur wenige Nanometer dünne Membran gleichzeitig Grenze, Transportfläche und Kommunikationszentrum einer Zelle sein?',
    intro: 'In diesem Lernmodul erarbeitest du den Aufbau biologischer Membranen. Im Mittelpunkt stehen Phospholipide, das Flüssig-Mosaik-Modell, Membranproteine und die Bedeutung der Kompartimentierung.',
    goals: [
      'den amphiphilen Aufbau eines Phospholipids beschreiben',
      'die Entstehung einer Phospholipid-Doppelschicht in Wasser erklären',
      'das Flüssig-Mosaik-Modell fachsprachlich erläutern',
      'wichtige Funktionen von Membranproteinen nennen und zuordnen',
      'die Bedeutung der Kompartimentierung für Zellen erklären',
    ],
    reading: [
      {
        label: '1 · Eine Grenze, die mehr kann',
        title: 'Warum Zellen Membranen brauchen',
        paragraphs: [
          'Jede Zelle muss ihr Inneres von der Umgebung abgrenzen. Diese Grenze darf aber nicht vollständig dicht sein: Nährstoffe müssen aufgenommen, Abfallstoffe abgegeben und Informationen aus der Umgebung erkannt werden. Biomembranen lösen genau dieses Problem.',
          'Auch innerhalb eukaryotischer Zellen trennen Membranen verschiedene Reaktionsräume voneinander. So können gleichzeitig Prozesse mit unterschiedlichen Bedingungen ablaufen. Diese Aufteilung in abgegrenzte Reaktionsräume nennt man Kompartimentierung.'
        ],
        callout: { type: 'merke', title: 'Merke', text: 'Biomembranen grenzen Reaktionsräume ab und ermöglichen zugleich einen kontrollierten Austausch von Stoffen und Informationen.' }
      },
      {
        label: '2 · Der Grundbaustein',
        title: 'Phospholipide sind amphiphil',
        paragraphs: [
          'Ein Phospholipid besitzt zwei funktionell unterschiedliche Bereiche: einen polaren, hydrophilen Kopf und unpolare, hydrophobe Fettsäurereste. „Hydrophil“ bedeutet wasserliebend, „hydrophob“ wassermeidend.',
          'Weil ein Molekül beide Eigenschaften gleichzeitig besitzt, bezeichnet man Phospholipide als amphiphil. In wässriger Umgebung richten sich die hydrophilen Köpfe zum Wasser aus, während die hydrophoben Bereiche den Kontakt mit Wasser möglichst vermeiden.'
        ],
        callout: { type: 'begriff', title: 'Fachbegriff', text: 'amphiphil = ein Molekül besitzt einen hydrophilen und einen hydrophoben Bereich.' }
      },
      {
        label: '3 · Selbstorganisation',
        title: 'Warum eine Doppelschicht entsteht',
        paragraphs: [
          'Befinden sich viele Phospholipide in Wasser, ordnen sie sich so an, dass die hydrophoben Fettsäurereste möglichst wenig Kontakt zum Wasser haben. Eine stabile Möglichkeit ist die Phospholipid-Doppelschicht: Die Köpfe zeigen zu den wässrigen Räumen, die Fettsäurereste liegen einander im Inneren der Membran gegenüber.',
          'Dadurch entsteht im Zentrum der Membran ein überwiegend hydrophober Bereich. Kleine unpolare Moleküle können diesen Bereich vergleichsweise leicht passieren; Ionen und viele polare Stoffe benötigen dagegen häufig Transportproteine.'
        ],
        callout: { type: 'fehler', title: 'Typischer Fehler', text: 'Eine Biomembran ist keine starre „Fettwand“. Ihre Bestandteile sind beweglich und viele Stoffe werden gezielt über Proteine transportiert.' }
      },
      {
        label: '4 · Das Modell',
        title: 'Das Flüssig-Mosaik-Modell',
        paragraphs: [
          'Das Flüssig-Mosaik-Modell beschreibt Biomembranen als dynamische Phospholipid-Doppelschicht, in die unterschiedliche Proteine eingelagert oder an deren Oberfläche gebunden sind. „Flüssig“ verweist darauf, dass sich viele Membranbestandteile seitlich bewegen können.',
          '„Mosaik“ beschreibt die Vielfalt der eingelagerten Bestandteile. Membranproteine können beispielsweise Stoffe transportieren, Signale empfangen, enzymatisch wirken oder Zellen miteinander verbinden. Die genaue Zusammensetzung einer Membran hängt deshalb von ihrer Funktion ab.'
        ],
        callout: { type: 'abi', title: 'Prüfungswissen', text: 'Beim Erklären des Flüssig-Mosaik-Modells immer Struktur UND Dynamik nennen: Phospholipid-Doppelschicht + bewegliche, unterschiedlich funktionierende Membranproteine.' }
      },
      {
        label: '5 · Struktur ermöglicht Funktion',
        title: 'Membranproteine und Kompartimentierung',
        paragraphs: [
          'Integrale Membranproteine liegen in der Membran und können sie teilweise oder vollständig durchspannen. Periphere Proteine sind lockerer an einer Membranoberfläche gebunden. Entscheidend ist weniger die Bezeichnung als die Verbindung von Struktur und Funktion.',
          'Durch Kompartimentierung können in einer Zelle verschiedene Stoffkonzentrationen und Reaktionsbedingungen gleichzeitig aufrechterhalten werden. Membranen ermöglichen damit Spezialisierung: Ein Zellorganell kann andere Aufgaben übernehmen als ein benachbarter Zellbereich.'
        ],
        callout: { type: 'denk', title: 'Denkfrage', text: 'Warum wäre eine Zelle ohne innere Membranen bei der Organisation vieler verschiedener Stoffwechselreaktionen im Nachteil?' }
      }
    ],
    quickCheck: [
      {
        q: 'Was bedeutet „amphiphil“ bei einem Phospholipid?',
        options: ['Es ist vollständig wasserlöslich.', 'Es besitzt einen hydrophilen und einen hydrophoben Bereich.', 'Es besteht ausschließlich aus Proteinen.'],
        correct: 1,
        explain: 'Richtig: Phospholipide besitzen einen hydrophilen Kopf und hydrophobe Fettsäurereste.'
      },
      {
        q: 'Warum liegen die Fettsäurereste in einer Doppelschicht nach innen?',
        options: ['Sie meiden den Kontakt mit Wasser.', 'Sie sind elektrisch positiv geladen.', 'Sie binden ausschließlich an Membranproteine.'],
        correct: 0,
        explain: 'Richtig: Die hydrophoben Fettsäurereste werden im Inneren der Doppelschicht vom Wasser abgeschirmt.'
      },
      {
        q: 'Was betont der Begriff „flüssig“ im Flüssig-Mosaik-Modell?',
        options: ['Die Membran besteht aus Wasser.', 'Membranbestandteile können sich innerhalb der Membran bewegen.', 'Die Membran löst sich ständig auf.'],
        correct: 1,
        explain: 'Richtig: Viele Lipide und Proteine besitzen seitliche Beweglichkeit; die Membran ist dynamisch.'
      }
    ],
    research: {
      title: 'Forscherauftrag: Lies das Modell wie eine Biologin / ein Biologe',
      steps: [
        'Aktiviere im Membranmodell zuerst die Markierungen für hydrophil und hydrophob. Beschreibe die räumliche Anordnung der Phospholipide.',
        'Blende Membranproteine ein. Formuliere zwei Funktionen, die solche Proteine übernehmen könnten.',
        'Erkläre, warum ein geladenes Ion nicht einfach durch den hydrophoben Membrankern diffundieren kann.',
        'Übertrage das Modell auf Kompartimentierung: Welche Vorteile entstehen, wenn unterschiedliche Zellbereiche durch Membranen getrennt sind?'
      ]
    },
    tasks: [
      { afb: 'I', prompt: 'Beschreibe den Aufbau eines Phospholipids und verwende die Begriffe hydrophil, hydrophob und amphiphil.', hint: 'Beginne mit Kopf und Fettsäureresten und erkläre anschließend den Begriff amphiphil.' },
      { afb: 'II', prompt: 'Erkläre mithilfe der Moleküleigenschaften, warum sich Phospholipide in Wasser zu einer Doppelschicht anordnen.', hint: 'Verknüpfe die räumliche Anordnung mit der Wechselwirkung der beiden Molekülbereiche mit Wasser.' },
      { afb: 'II', prompt: 'Erkläre, warum das Flüssig-Mosaik-Modell besser zu einer Biomembran passt als die Vorstellung einer starren Zellwand.', hint: 'Gehe auf Beweglichkeit, verschiedene Bestandteile und unterschiedliche Funktionen ein.' },
      { afb: 'III', prompt: 'Beurteile die Aussage: „Die Zellmembran dient ausschließlich dazu, das Zellinnere von außen abzutrennen.“', hint: 'Nutze mindestens drei weitere Membranfunktionen als Gegenargumente.' }
    ],
    quiz: [
      { q: 'Welche Aussage zu Phospholipiden ist korrekt?', options: ['Beide Molekülbereiche sind hydrophob.', 'Der Kopf ist hydrophil, die Fettsäurereste sind hydrophob.', 'Der Kopf ist hydrophob, die Fettsäurereste sind hydrophil.', 'Phospholipide besitzen keine unterschiedlichen Bereiche.'], correct: 1 },
      { q: 'Was befindet sich überwiegend im Inneren einer Phospholipid-Doppelschicht?', options: ['Hydrophile Köpfe', 'Wasser', 'Hydrophobe Fettsäurereste', 'DNA'], correct: 2 },
      { q: 'Welche Aussage gehört zum Flüssig-Mosaik-Modell?', options: ['Alle Membranbestandteile sind starr fixiert.', 'Membranen bestehen nur aus Proteinen.', 'Lipide und viele Proteine können sich seitlich bewegen.', 'Membranen sind für alle Stoffe frei durchlässig.'], correct: 2 },
      { q: 'Was bedeutet Kompartimentierung?', options: ['Zerlegung von Proteinen', 'Aufteilung der Zelle in abgegrenzte Reaktionsräume', 'Verdopplung der DNA', 'Transport ausschließlich gegen ein Konzentrationsgefälle'], correct: 1 },
      { q: 'Warum sind Membranproteine funktionell wichtig?', options: ['Sie können unter anderem Transport und Signalaufnahme ermöglichen.', 'Sie ersetzen alle Phospholipide.', 'Sie verhindern jede Bewegung in der Membran.', 'Sie kommen nur in Pflanzenzellen vor.'], correct: 0 }
    ],
    lab: 'membraneStructure'
  },
  {
    id: 'passiver-transport', number: '02', date: '21.09.2026', title: 'Passiver Stofftransport', icon: '↔️', status: 'planned',
    subtitle: 'Diffusion · erleichterte Diffusion · Kanal- & Carrierproteine · Konzentrationsgefälle',
    bp: 'Molekulare Biologie · Membrantransport',
    intro: 'Hier untersuchst du, wie Teilchen ohne direkten Energieaufwand entlang eines Konzentrationsgefälles transportiert werden.',
    goals: ['einfache und erleichterte Diffusion unterscheiden', 'Kanal- und Carrierproteine vergleichen', 'Konzentrationsgefälle als Triebkraft erklären'],
    lab: 'transport'
  },
  {
    id: 'aktiver-transport', number: '03', date: '22.09.2026', title: 'Aktiver Transport & Membranfluss', icon: '⚡', status: 'planned',
    subtitle: 'Energieaufwand · Transport gegen Gradienten · Endocytose · Exocytose',
    bp: 'Molekulare Biologie · Membrantransport',
    intro: 'Dieses Modul vergleicht energieabhängige Transportmechanismen mit passiven Prozessen und führt Endo- und Exocytose ein.',
    goals: ['aktiven und passiven Transport vergleichen', 'Transport gegen ein Konzentrationsgefälle erklären', 'Endocytose und Exocytose beschreiben'],
    lab: 'transport'
  },
  {
    id: 'proteine-1', number: '04', date: '29.09.2026', title: 'Proteine I: Vom Aminosäurebaustein zum Polypeptid', icon: '🧩', status: 'planned',
    subtitle: 'Aminosäuren · Peptidbindung · Polypeptide · Proteinfunktionen',
    bp: 'Molekulare Biologie · Proteine',
    intro: 'Du lernst den Grundbau einer Aminosäure kennen und verfolgst, wie durch Peptidbindungen Polypeptidketten entstehen.',
    goals: ['Grundbau einer Aminosäure darstellen', 'Peptidbindung erklären', 'wichtige Proteinfunktionen an Beispielen zuordnen']
  },
  {
    id: 'proteine-2', number: '05', date: '06.10.2026', title: 'Proteine II: Struktur bestimmt Funktion', icon: '🧶', status: 'planned',
    subtitle: 'Primär- · Sekundär- · Tertiär- · Quartärstruktur · Denaturierung',
    bp: 'Molekulare Biologie · Proteine',
    intro: 'Hier verknüpfst du die räumliche Struktur von Proteinen mit ihrer biologischen Funktion und untersuchst Denaturierung.',
    goals: ['vier Strukturebenen unterscheiden', 'Denaturierung erklären', 'Struktur-Funktions-Beziehungen begründen']
  },
  {
    id: 'enzyme', number: '06', date: '13.10.2026', title: 'Enzyme als Biokatalysatoren', icon: '🧪', status: 'planned',
    subtitle: 'Aktives Zentrum · Spezifität · Enzym-Substrat-Komplex · Modelle',
    bp: 'Molekulare Biologie · Enzyme',
    intro: 'Du untersuchst, wie Enzyme Reaktionen ermöglichen und warum Substrate nur zu bestimmten aktiven Zentren passen.',
    goals: ['Wirkungsweise von Enzymen erklären', 'Substrat- und Wirkungsspezifität unterscheiden', 'Modelle zum Enzym-Substrat-Komplex nutzen'],
    lab: 'enzyme'
  },
  {
    id: 'enzymexperiment', number: '07', date: '19.–20.10.2026', title: 'Enzymexperiment planen & durchführen', icon: '🔬', status: 'planned',
    subtitle: 'Hypothese · Variablen · Kontrollansatz · Messwerte · Auswertung',
    bp: 'Erkenntnisgewinnung · Experimentieren',
    intro: 'Zum Abschluss planst und untersuchst du einen Einflussfaktor auf eine Enzymreaktion, erhebst Daten und wertest sie fachgerecht aus.',
    goals: ['eine prüfbare Hypothese formulieren', 'unabhängige, abhängige und kontrollierte Variablen festlegen', 'einen Kontrollansatz begründen', 'Messwerte angemessen darstellen und auswerten'],
    lab: 'enzyme'
  }
];
