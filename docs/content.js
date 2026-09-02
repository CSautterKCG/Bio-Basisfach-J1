const modules = [
  {
    id: "biomembran",
    number: "01",
    date: "15.09.2026",
    title: "Biomembran",
    subtitle: "Phospholipide · Flüssig-Mosaik-Modell · Membranproteine · Kompartimentierung",
    icon: "🫧",
    status: "ready",
    bp: "Molekulare Biologie · Grundlagen",
    readTime: "8–10 MIN",
    bookSearch: ["Biomembran / Zellmembran", "Phospholipide", "Flüssig-Mosaik-Modell", "Kompartimentierung"],
    hook: "Wie kann eine nur wenige Nanometer dünne Membran gleichzeitig Grenze, Transportfläche und Kommunikationszentrum einer Zelle sein?",
    intro: "In diesem Lernmodul erarbeitest du den Aufbau biologischer Membranen. Im Mittelpunkt stehen Phospholipide, das Flüssig-Mosaik-Modell, Membranproteine und die Bedeutung der Kompartimentierung.",
    goals: [
      "den amphiphilen Aufbau eines Phospholipids beschreiben",
      "die Entstehung einer Phospholipid-Doppelschicht in Wasser erklären",
      "das Flüssig-Mosaik-Modell fachsprachlich erläutern",
      "wichtige Funktionen von Membranproteinen nennen und zuordnen",
      "die Bedeutung der Kompartimentierung für Zellen erklären"
    ],
    reading: [
      {
        label: "1 · Eine Grenze, die mehr kann",
        title: "Warum Zellen Membranen brauchen",
        paragraphs: [
          "Jede Zelle muss ihr Inneres von der Umgebung abgrenzen. Diese Grenze darf aber nicht vollständig dicht sein: Nährstoffe müssen aufgenommen, Abfallstoffe abgegeben und Informationen aus der Umgebung erkannt werden. Biomembranen lösen genau dieses Problem.",
          "Auch innerhalb eukaryotischer Zellen trennen Membranen verschiedene Reaktionsräume voneinander. So können gleichzeitig Prozesse mit unterschiedlichen Bedingungen ablaufen. Diese Aufteilung in abgegrenzte Reaktionsräume nennt man Kompartimentierung."
        ],
        callout: { type: "merke", title: "Merke", text: "Biomembranen grenzen Reaktionsräume ab und ermöglichen zugleich einen kontrollierten Austausch von Stoffen und Informationen." }
      },
      {
        label: "2 · Der Grundbaustein",
        title: "Phospholipide sind amphiphil",
        paragraphs: [
          "Ein Phospholipid besitzt zwei funktionell unterschiedliche Bereiche: einen polaren, hydrophilen Kopf und unpolare, hydrophobe Fettsäurereste. Hydrophil bedeutet wasserliebend, hydrophob wassermeidend.",
          "Weil ein Molekül beide Eigenschaften gleichzeitig besitzt, bezeichnet man Phospholipide als amphiphil. In wässriger Umgebung richten sich die hydrophilen Köpfe zum Wasser aus, während die hydrophoben Bereiche den Kontakt mit Wasser möglichst vermeiden."
        ],
        callout: { type: "begriff", title: "Fachbegriff", text: "amphiphil = ein Molekül besitzt einen hydrophilen und einen hydrophoben Bereich." }
      },
      {
        label: "3 · Selbstorganisation",
        title: "Warum eine Doppelschicht entsteht",
        paragraphs: [
          "Befinden sich viele Phospholipide in Wasser, ordnen sie sich so an, dass die hydrophoben Fettsäurereste möglichst wenig Kontakt zum Wasser haben. Eine stabile Möglichkeit ist die Phospholipid-Doppelschicht: Die Köpfe zeigen zu den wässrigen Räumen, die Fettsäurereste liegen einander im Inneren der Membran gegenüber.",
          "Dadurch entsteht im Zentrum der Membran ein überwiegend hydrophober Bereich. Kleine unpolare Moleküle können diesen Bereich vergleichsweise leicht passieren; Ionen und viele polare Stoffe benötigen dagegen häufig Transportproteine."
        ],
        callout: { type: "fehler", title: "Typischer Fehler", text: "Eine Biomembran ist keine starre Fettwand. Ihre Bestandteile sind beweglich und viele Stoffe werden gezielt über Proteine transportiert." }
      },
      {
        label: "4 · Das Modell",
        title: "Das Flüssig-Mosaik-Modell",
        paragraphs: [
          "Das Flüssig-Mosaik-Modell beschreibt Biomembranen als dynamische Phospholipid-Doppelschicht, in die unterschiedliche Proteine eingelagert oder an deren Oberfläche gebunden sind. Flüssig verweist darauf, dass sich viele Membranbestandteile seitlich bewegen können.",
          "Mosaik beschreibt die Vielfalt der eingelagerten Bestandteile. Membranproteine können beispielsweise Stoffe transportieren, Signale empfangen, enzymatisch wirken oder Zellen miteinander verbinden. Die genaue Zusammensetzung einer Membran hängt deshalb von ihrer Funktion ab."
        ],
        callout: { type: "abi", title: "Prüfungswissen", text: "Beim Erklären des Flüssig-Mosaik-Modells immer Struktur UND Dynamik nennen: Phospholipid-Doppelschicht + bewegliche, unterschiedlich funktionierende Membranproteine." }
      },
      {
        label: "5 · Struktur ermöglicht Funktion",
        title: "Membranproteine und Kompartimentierung",
        paragraphs: [
          "Integrale Membranproteine liegen in der Membran und können sie teilweise oder vollständig durchspannen. Periphere Proteine sind lockerer an einer Membranoberfläche gebunden. Entscheidend ist die Verbindung von Struktur und Funktion.",
          "Durch Kompartimentierung können in einer Zelle verschiedene Stoffkonzentrationen und Reaktionsbedingungen gleichzeitig aufrechterhalten werden. Membranen ermöglichen damit Spezialisierung: Ein Zellorganell kann andere Aufgaben übernehmen als ein benachbarter Zellbereich."
        ],
        callout: { type: "denk", title: "Denkfrage", text: "Warum wäre eine Zelle ohne innere Membranen bei der Organisation vieler verschiedener Stoffwechselreaktionen im Nachteil?" }
      }
    ],
    quickCheck: [
      { q: "Was bedeutet amphiphil bei einem Phospholipid?", options: ["Es ist vollständig wasserlöslich.", "Es besitzt einen hydrophilen und einen hydrophoben Bereich.", "Es besteht ausschließlich aus Proteinen."], correct: 1, explain: "Richtig: Phospholipide besitzen einen hydrophilen Kopf und hydrophobe Fettsäurereste." },
      { q: "Warum liegen die Fettsäurereste in einer Doppelschicht nach innen?", options: ["Sie meiden den Kontakt mit Wasser.", "Sie sind elektrisch positiv geladen.", "Sie binden ausschließlich an Membranproteine."], correct: 0, explain: "Richtig: Die hydrophoben Fettsäurereste werden im Inneren der Doppelschicht vom Wasser abgeschirmt." },
      { q: "Was betont der Begriff flüssig im Flüssig-Mosaik-Modell?", options: ["Die Membran besteht aus Wasser.", "Membranbestandteile können sich innerhalb der Membran bewegen.", "Die Membran löst sich ständig auf."], correct: 1, explain: "Richtig: Viele Lipide und Proteine besitzen seitliche Beweglichkeit; die Membran ist dynamisch." }
    ],
    research: {
      title: "Forscherauftrag: Lies das Modell wie eine Biologin / ein Biologe",
      steps: [
        "Aktiviere im Membranmodell zuerst die Markierungen für hydrophil und hydrophob. Beschreibe die räumliche Anordnung der Phospholipide.",
        "Blende Membranproteine ein. Formuliere zwei Funktionen, die solche Proteine übernehmen könnten.",
        "Erkläre, warum ein geladenes Ion nicht einfach durch den hydrophoben Membrankern diffundieren kann.",
        "Übertrage das Modell auf Kompartimentierung: Welche Vorteile entstehen, wenn unterschiedliche Zellbereiche durch Membranen getrennt sind?"
      ]
    },
    tasks: [
      { afb: "I", prompt: "Beschreibe den Aufbau eines Phospholipids und verwende die Begriffe hydrophil, hydrophob und amphiphil.", hint: "Beginne mit Kopf und Fettsäureresten und erkläre anschließend den Begriff amphiphil." },
      { afb: "II", prompt: "Erkläre mithilfe der Moleküleigenschaften, warum sich Phospholipide in Wasser zu einer Doppelschicht anordnen.", hint: "Verknüpfe die räumliche Anordnung mit der Wechselwirkung der beiden Molekülbereiche mit Wasser." },
      { afb: "II", prompt: "Erkläre, warum das Flüssig-Mosaik-Modell besser zu einer Biomembran passt als die Vorstellung einer starren Zellwand.", hint: "Gehe auf Beweglichkeit, verschiedene Bestandteile und unterschiedliche Funktionen ein." },
      { afb: "III", prompt: "Beurteile die Aussage: Die Zellmembran dient ausschließlich dazu, das Zellinnere von außen abzutrennen.", hint: "Nutze mindestens drei weitere Membranfunktionen als Gegenargumente." }
    ],
    quiz: [
      { q: "Welche Aussage zu Phospholipiden ist korrekt?", options: ["Beide Molekülbereiche sind hydrophob.", "Der Kopf ist hydrophil, die Fettsäurereste sind hydrophob.", "Der Kopf ist hydrophob, die Fettsäurereste sind hydrophil.", "Phospholipide besitzen keine unterschiedlichen Bereiche."], correct: 1 },
      { q: "Was befindet sich überwiegend im Inneren einer Phospholipid-Doppelschicht?", options: ["Hydrophile Köpfe", "Wasser", "Hydrophobe Fettsäurereste", "DNA"], correct: 2 },
      { q: "Welche Aussage gehört zum Flüssig-Mosaik-Modell?", options: ["Alle Membranbestandteile sind starr fixiert.", "Membranen bestehen nur aus Proteinen.", "Lipide und viele Proteine können sich seitlich bewegen.", "Membranen sind für alle Stoffe frei durchlässig."], correct: 2 },
      { q: "Was bedeutet Kompartimentierung?", options: ["Zerlegung von Proteinen", "Aufteilung der Zelle in abgegrenzte Reaktionsräume", "Verdopplung der DNA", "Transport ausschließlich gegen ein Konzentrationsgefälle"], correct: 1 },
      { q: "Warum sind Membranproteine funktionell wichtig?", options: ["Sie können unter anderem Transport und Signalaufnahme ermöglichen.", "Sie ersetzen alle Phospholipide.", "Sie verhindern jede Bewegung in der Membran.", "Sie kommen nur in Pflanzenzellen vor."], correct: 0 }
    ],
    lab: "membraneStructure"
  },

  {
    id: "passiver-transport",
    number: "02",
    date: "21.09.2026",
    title: "Passiver Stofftransport",
    subtitle: "Diffusion · erleichterte Diffusion · Kanal- & Carrierproteine · Konzentrationsgefälle",
    icon: "↔️",
    status: "ready",
    bp: "Molekulare Biologie · Membrantransport",
    readTime: "8–10 MIN",
    bookSearch: ["Diffusion", "passiver Membrantransport", "erleichterte Diffusion", "Kanalprotein / Carrierprotein"],
    hook: "Wie können Stoffe eine Zellmembran überwinden, obwohl die Zelle dafür keine zusätzliche Energie bereitstellt?",
    intro: "Hier untersuchst du, wie Teilchen ohne direkten Energieaufwand entlang eines Konzentrationsgefälles transportiert werden. Du vergleichst einfache und erleichterte Diffusion sowie Kanal- und Carrierproteine.",
    goals: [
      "Diffusion als Folge der zufälligen Teilchenbewegung erklären",
      "ein Konzentrationsgefälle und den Nettofluss fachsprachlich beschreiben",
      "einfache und erleichterte Diffusion unterscheiden",
      "Kanal- und Carrierproteine in ihrer Funktionsweise vergleichen",
      "begründen, warum passiver Transport keinen direkten ATP-Verbrauch benötigt"
    ],
    reading: [
      {
        label: "1 · Teilchen sind ständig in Bewegung",
        title: "Diffusion entsteht ohne Steuerung",
        paragraphs: [
          "Teilchen in Flüssigkeiten und Gasen bewegen sich ständig zufällig. Befinden sich in einem Bereich viele und in einem anderen wenige Teilchen, treten statistisch mehr Teilchen aus dem Bereich hoher Konzentration in den Bereich niedriger Konzentration über als umgekehrt.",
          "Diese gerichtete Bilanz nennt man Nettofluss. Die zugrunde liegenden Einzelbewegungen bleiben trotzdem zufällig. Diffusion benötigt daher keinen Motor und keinen direkten Energieeinsatz der Zelle."
        ],
        callout: { type: "merke", title: "Merke", text: "Diffusion ist die Nettoverteilung von Teilchen vom Bereich hoher zum Bereich niedriger Konzentration aufgrund ihrer zufälligen Eigenbewegung." }
      },
      {
        label: "2 · Die Triebkraft",
        title: "Das Konzentrationsgefälle",
        paragraphs: [
          "Ein Konzentrationsgefälle liegt vor, wenn die Konzentration eines Stoffes in zwei Bereichen unterschiedlich ist. Je stärker der Unterschied, desto deutlicher ist zunächst der Nettofluss in Richtung der niedrigeren Konzentration.",
          "Sind die Konzentrationen ausgeglichen, bewegen sich weiterhin Teilchen in beide Richtungen. Es gibt dann aber keinen Nettofluss mehr. Man spricht von einem dynamischen Gleichgewicht."
        ],
        callout: { type: "begriff", title: "Fachbegriff", text: "Konzentrationsgefälle = räumlicher Unterschied in der Konzentration eines Stoffes." }
      },
      {
        label: "3 · Direkter Weg",
        title: "Einfache Diffusion durch die Membran",
        paragraphs: [
          "Der hydrophobe Innenbereich der Lipiddoppelschicht ist für viele geladene oder stark polare Stoffe eine Barriere. Kleine unpolare Moleküle können die Membran dagegen vergleichsweise gut direkt durchqueren.",
          "Wenn solche Moleküle entlang ihres Konzentrationsgefälles die Lipiddoppelschicht passieren, spricht man von einfacher Diffusion. Ein Transportprotein ist dafür nicht erforderlich."
        ],
        callout: { type: "fehler", title: "Typischer Fehler", text: "Passiv bedeutet nicht automatisch direkt durch die Lipiddoppelschicht. Passiver Transport kann auch mithilfe von Proteinen stattfinden." }
      },
      {
        label: "4 · Hilfe durch Proteine",
        title: "Erleichterte Diffusion",
        paragraphs: [
          "Ionen und viele polare Stoffe benötigen Membranproteine, um den hydrophoben Membrankern zu überwinden. Erfolgt der Transport trotzdem entlang des Konzentrationsgefälles und ohne direkten ATP-Verbrauch, nennt man ihn erleichterte Diffusion.",
          "Kanalproteine bilden einen hydrophilen Durchgang durch die Membran. Carrierproteine binden einen Stoff, verändern ihre räumliche Form und geben ihn auf der anderen Membranseite wieder ab. Beide können passiven Transport ermöglichen, funktionieren aber unterschiedlich."
        ],
        callout: { type: "abi", title: "Prüfungswissen", text: "Einfache Diffusion: ohne Transportprotein. Erleichterte Diffusion: über Kanal oder Carrier. Beide verlaufen passiv entlang eines Konzentrationsgefälles." }
      },
      {
        label: "5 · Eine klare Abgrenzung",
        title: "Warum der Transport passiv heißt",
        paragraphs: [
          "Beim passiven Transport wird keine zusätzliche Energie eingesetzt, um einen Stoff gegen sein Konzentrationsgefälle zu bewegen. Die Richtung des Nettoflusses ergibt sich aus dem vorhandenen Konzentrationsunterschied.",
          "Das heißt nicht, dass in einem lebenden Organismus insgesamt keine Energie verbraucht wird. Gemeint ist nur: Der konkrete Diffusionsschritt selbst wird nicht durch ATP angetrieben."
        ],
        callout: { type: "denk", title: "Denkfrage", text: "Was würde mit dem Nettofluss passieren, wenn innen und außen exakt dieselbe Konzentration herrscht?" }
      }
    ],
    quickCheck: [
      { q: "In welche Richtung verläuft der Nettofluss bei Diffusion?", options: ["Von niedriger zu hoher Konzentration", "Von hoher zu niedriger Konzentration", "Immer nach außen"], correct: 1, explain: "Richtig: Der Nettofluss verläuft entlang des Konzentrationsgefälles von hoher zu niedriger Konzentration." },
      { q: "Wodurch unterscheidet sich erleichterte von einfacher Diffusion?", options: ["Erleichterte Diffusion benötigt Transportproteine.", "Erleichterte Diffusion verbraucht immer ATP.", "Einfache Diffusion verläuft gegen das Konzentrationsgefälle."], correct: 0, explain: "Richtig: Bei erleichterter Diffusion übernehmen Kanal- oder Carrierproteine den Membrantransport." },
      { q: "Was kennzeichnet ein Carrierprotein?", options: ["Es bildet immer einen dauerhaft offenen Tunnel.", "Es bindet einen Stoff und verändert dabei seine Form.", "Es zerlegt ATP bei jeder Diffusion."], correct: 1, explain: "Richtig: Carrier binden ihr Transportmolekül und ändern ihre Konformation, um es auf der anderen Seite freizusetzen." }
    ],
    research: {
      title: "Forscherauftrag: Finde für jeden Stoff den passenden Weg",
      steps: [
        "Stelle außen eine deutlich höhere Konzentration als innen ein und beobachte die Richtung des Nettoflusses.",
        "Wähle ein kleines unpolares Molekül. Notiere, welcher Transportweg angezeigt wird und warum kein Transportprotein nötig ist.",
        "Wähle ein Ion und anschließend ein größeres polares Molekül. Vergleiche Kanal- und Carriertransport.",
        "Blockiere das Transportprotein. Erkläre, warum trotz vorhandenem Konzentrationsgefälle der Transport im Modell ausbleibt.",
        "Stelle innen und außen dieselbe Konzentration ein und erkläre den Begriff dynamisches Gleichgewicht."
      ]
    },
    tasks: [
      { afb: "I", prompt: "Definiere Diffusion und Konzentrationsgefälle in eigenen Worten.", hint: "Nenne zufällige Teilchenbewegung, Konzentrationsunterschied und Richtung des Nettoflusses." },
      { afb: "II", prompt: "Ein ungeladenes kleines Molekül liegt außen in hoher, innen in niedriger Konzentration vor. Erkläre seinen passiven Transport durch die Biomembran.", hint: "Entscheide zuerst, ob ein Transportprotein nötig ist, und nenne dann die Flussrichtung." },
      { afb: "II", prompt: "Vergleiche Kanal- und Carrierproteine beim passiven Membrantransport.", hint: "Gemeinsamkeit: erleichterte Diffusion. Unterschied: hydrophiler Durchgang versus Bindung und Formänderung." },
      { afb: "III", prompt: "Ein Zellgift blockiert bestimmte Carrierproteine. Beurteile, welche Folgen dies für einen polaren Stoff haben kann, obwohl sein Konzentrationsgefälle unverändert bleibt.", hint: "Ein Konzentrationsgefälle allein reicht bei Stoffen, die die Lipiddoppelschicht nicht direkt passieren können, nicht aus." }
    ],
    quiz: [
      { q: "Was verursacht Diffusion?", options: ["Zufällige Eigenbewegung der Teilchen", "Ein ATP-getriebener Motor", "Ausschließlich Carrierproteine", "Eine elektrische Pumpe"], correct: 0 },
      { q: "Wann besteht kein Nettofluss mehr?", options: ["Wenn die Konzentrationen ausgeglichen sind", "Wenn außen mehr Teilchen sind", "Wenn ein Kanalprotein vorhanden ist", "Wenn die Membran aus Phospholipiden besteht"], correct: 0 },
      { q: "Welche Stoffgruppe kann die Lipiddoppelschicht im Modell vergleichsweise gut direkt passieren?", options: ["Ionen", "kleine unpolare Moleküle", "große polare Moleküle", "alle Stoffe gleich gut"], correct: 1 },
      { q: "Welche Aussage zu erleichterter Diffusion stimmt?", options: ["Sie verläuft über Membranproteine entlang des Konzentrationsgefälles.", "Sie benötigt immer ATP.", "Sie läuft grundsätzlich von niedriger zu hoher Konzentration.", "Sie findet nur bei unpolaren Molekülen statt."], correct: 0 },
      { q: "Was ist typisch für Carrierproteine?", options: ["Sie binden einen Stoff und ändern ihre Form.", "Sie bestehen aus Phospholipiden.", "Sie erzeugen das Konzentrationsgefälle automatisch.", "Sie transportieren ausschließlich gegen das Gefälle."], correct: 0 }
    ],
    lab: "passiveTransport"
  },

  {
    id: "aktiver-transport",
    number: "03",
    date: "22.09.2026",
    title: "Aktiver Transport & Membranfluss",
    subtitle: "Energieaufwand · Transport gegen Gradienten · Endocytose · Exocytose",
    icon: "⚡",
    status: "ready",
    bp: "Molekulare Biologie · Membrantransport",
    readTime: "8–10 MIN",
    bookSearch: ["aktiver Membrantransport", "ATP / Transportprotein / Pumpe", "Endocytose", "Exocytose", "Membranfluss"],
    hook: "Wie kann eine Zelle Stoffe dort anreichern, wo bereits eine hohe Konzentration herrscht, oder sogar große Teilchen aufnehmen?",
    intro: "Dieses Modul vergleicht energieabhängige Transportmechanismen mit passiven Prozessen. Zusätzlich lernst du Endocytose und Exocytose als Formen des Membranflusses kennen.",
    goals: [
      "aktiven und passiven Transport sicher unterscheiden",
      "erklären, warum Transport gegen ein Konzentrationsgefälle Energie benötigt",
      "die Rolle von Transportproteinen und ATP beim aktiven Transport erläutern",
      "Endocytose und Exocytose beschreiben",
      "einfache Stofftransporte und vesikulären Membranfluss vergleichen"
    ],
    reading: [
      {
        label: "1 · Gegen die spontane Richtung",
        title: "Was aktiven Transport auszeichnet",
        paragraphs: [
          "Bei passiver Diffusion bewegt sich der Nettofluss entlang eines Konzentrationsgefälles. Eine Zelle muss aber häufig Stoffe entgegen dieser spontanen Richtung transportieren, etwa um unterschiedliche Konzentrationen auf beiden Seiten einer Membran aufrechtzuerhalten.",
          "Ein Transport von einem Bereich niedriger Konzentration zu einem Bereich höherer Konzentration heißt Transport gegen das Konzentrationsgefälle. Dafür muss Energie bereitgestellt werden: Der Prozess ist aktiv."
        ],
        callout: { type: "merke", title: "Merke", text: "Aktiver Transport kann Stoffe gegen ein Konzentrationsgefälle bewegen und benötigt dafür Energie." }
      },
      {
        label: "2 · Molekulare Pumpen",
        title: "Transportproteine koppeln Energie und Stofftransport",
        paragraphs: [
          "Aktiver Membrantransport wird häufig von speziellen Transportproteinen durchgeführt. Diese Proteine können ihre Form ändern und dadurch Teilchen gezielt von einer Membranseite auf die andere befördern.",
          "Als Energiequelle kann ATP dienen. Wird die Energie nicht bereitgestellt, kann ein ATP-abhängiger aktiver Transport im vereinfachten Modell nicht weiterlaufen."
        ],
        callout: { type: "begriff", title: "Fachbegriff", text: "ATP ist ein wichtiger kurzfristiger Energieträger der Zelle. Bei vielen aktiven Transportprozessen wird seine chemische Energie genutzt." }
      },
      {
        label: "3 · Passiv oder aktiv?",
        title: "Der entscheidende Vergleich",
        paragraphs: [
          "Passiver Transport folgt einem vorhandenen Konzentrationsgefälle und benötigt für den Transportvorgang keinen direkten ATP-Einsatz. Aktiver Transport kann dagegen ein Konzentrationsgefälle aufbauen oder erhalten, weil Stoffe gegen die spontane Verteilungsrichtung bewegt werden.",
          "Transportproteine kommen in beiden Fällen vor: Carrier können passiven Transport ermöglichen, andere Transportproteine arbeiten als energieabhängige Pumpen. Deshalb entscheidet nicht allein das Vorhandensein eines Proteins über passiv oder aktiv."
        ],
        callout: { type: "fehler", title: "Typischer Fehler", text: "Transport über ein Protein ist nicht automatisch aktiv. Entscheidend sind Richtung relativ zum Gradienten und Energieeinsatz." }
      },
      {
        label: "4 · Große Fracht",
        title: "Endocytose",
        paragraphs: [
          "Nicht jedes Material wird als einzelnes Molekül durch ein Transportprotein bewegt. Bei der Endocytose stülpt sich ein Abschnitt der Zellmembran nach innen ein und schnürt sich als Vesikel ab. Das aufgenommene Material gelangt dadurch in das Zellinnere.",
          "Ein Vesikel ist ein kleiner, von einer Membran umschlossener Raum. Endocytose verändert vorübergehend die Form und Fläche der Zellmembran und gehört deshalb zum Membranfluss."
        ],
        callout: { type: "abi", title: "Prüfungswissen", text: "Endocytose = Vesikelbildung durch Einstülpung der Zellmembran nach innen." }
      },
      {
        label: "5 · Abgabe nach außen",
        title: "Exocytose",
        paragraphs: [
          "Bei der Exocytose verschmilzt die Membran eines Vesikels mit der Zellmembran. Der Vesikelinhalt wird dadurch in den Außenraum abgegeben, während die Vesikelmembran Teil der Zellmembran wird.",
          "Endocytose und Exocytose sind Gegenrichtungen des Membranflusses. Beide ermöglichen den Transport größerer Stoffmengen oder Partikel, ohne dass diese direkt den hydrophoben Membrankern durchqueren müssen."
        ],
        callout: { type: "denk", title: "Denkfrage", text: "Warum eignet sich ein Vesikeltransport besonders für größere Stoffmengen, die nicht durch einzelne Kanalproteine passen?" }
      }
    ],
    quickCheck: [
      { q: "Wann spricht man von aktivem Transport?", options: ["Wenn Stoffe gegen ein Konzentrationsgefälle unter Energieaufwand transportiert werden", "Bei jeder Bewegung durch ein Kanalprotein", "Nur bei Endocytose"], correct: 0, explain: "Richtig: Aktiver Transport ist energieabhängig und kann gegen das Konzentrationsgefälle verlaufen." },
      { q: "Warum ist ein Transportprotein nicht automatisch ein Zeichen für aktiven Transport?", options: ["Weil auch erleichterte Diffusion über Proteine passiv ablaufen kann", "Weil Proteine keine Stoffe transportieren", "Weil aktiver Transport ausschließlich durch Lipide erfolgt"], correct: 0, explain: "Richtig: Auch passiver Transport kann über Kanal- oder Carrierproteine erfolgen." },
      { q: "Was geschieht bei der Exocytose?", options: ["Die Membran stülpt sich ein und schnürt ein Vesikel nach innen ab", "Ein Vesikel verschmilzt mit der Zellmembran und gibt Inhalt nach außen ab", "Ein Stoff diffundiert direkt durch die Lipiddoppelschicht"], correct: 1, explain: "Richtig: Bei der Exocytose fusioniert eine Vesikelmembran mit der Zellmembran." }
    ],
    research: {
      title: "Forscherauftrag: Transportwege systematisch vergleichen",
      steps: [
        "Stelle innen eine höhere Konzentration als außen ein. Wähle die Pumprichtung außen → innen und erkläre, warum der Transport gegen das Konzentrationsgefälle verläuft.",
        "Schalte ATP aus. Beschreibe, was im Modell mit der Pumpe geschieht und begründe dies.",
        "Verändere die Konzentrationen so, dass die Pumpe in Richtung des Konzentrationsgefälles arbeiten würde. Erkläre, warum der dargestellte Mechanismus trotzdem als aktive Pumpe bezeichnet wird.",
        "Wechsle zwischen Endocytose und Exocytose. Beschreibe jeweils die Bewegung der Membran und die Richtung des Stofftransports.",
        "Erstelle anschließend eine eigene Vergleichstabelle: passive Diffusion – aktive Pumpe – Endocytose – Exocytose."
      ]
    },
    tasks: [
      { afb: "I", prompt: "Nenne zwei Merkmale, die aktiven Transport vom passiven Transport unterscheiden.", hint: "Denke an Energieeinsatz und Richtung relativ zum Konzentrationsgefälle." },
      { afb: "II", prompt: "Erkläre, wie eine Zelle mithilfe einer energieabhängigen Pumpe eine hohe Stoffkonzentration auf einer Membranseite aufrechterhalten kann.", hint: "Verknüpfe Transportprotein, Energie und Bewegung gegen die spontane Diffusionsrichtung." },
      { afb: "II", prompt: "Vergleiche Endocytose und Exocytose hinsichtlich Membranbewegung und Transportrichtung.", hint: "Endocytose: Vesikel entsteht nach innen. Exocytose: Vesikel verschmilzt und gibt Inhalt nach außen ab." },
      { afb: "III", prompt: "Beurteile die Aussage: Jeder Stofftransport durch ein Membranprotein kostet ATP.", hint: "Nutze dein Wissen zur erleichterten Diffusion und zu aktiven Pumpen." }
    ],
    quiz: [
      { q: "Welche Aussage beschreibt aktiven Transport?", options: ["Transport kann gegen das Konzentrationsgefälle erfolgen und benötigt Energie.", "Transport erfolgt immer ohne Protein.", "Transport ist identisch mit einfacher Diffusion.", "Transport findet nur außerhalb von Zellen statt."], correct: 0 },
      { q: "Welche Rolle kann ATP beim aktiven Transport spielen?", options: ["Es stellt chemische Energie bereit.", "Es bildet die Membranlipide.", "Es erzeugt Wasser als Lösungsmittel.", "Es ersetzt das Transportprotein."], correct: 0 },
      { q: "Warum kann auch ein Carriertransport passiv sein?", options: ["Wenn der Stoff entlang seines Konzentrationsgefälles ohne direkten ATP-Einsatz transportiert wird", "Weil Carrier nie Proteine sind", "Weil Carrier nur außen vorkommen", "Weil passive Prozesse grundsätzlich gegen Gradienten laufen"], correct: 0 },
      { q: "Was ist Endocytose?", options: ["Aufnahme von Material durch Einstülpung und Vesikelbildung", "Abgabe von Vesikelinhalt nach außen", "Direkte Diffusion eines Gases", "ATP-Bildung in der Membran"], correct: 0 },
      { q: "Was geschieht bei Exocytose mit der Vesikelmembran?", options: ["Sie verschmilzt mit der Zellmembran.", "Sie wird zu DNA.", "Sie löst alle Phospholipide auf.", "Sie bleibt dauerhaft frei im Cytoplasma."], correct: 0 }
    ],
    lab: "activeTransport"
  },

  {
    id: "proteine-1",
    number: "04",
    date: "29.09.2026",
    title: "Proteine I: Vom Aminosäurebaustein zum Polypeptid",
    subtitle: "Aminosäuren · Peptidbindung · Polypeptide · Proteinfunktionen",
    icon: "🧩",
    status: "ready",
    bp: "Molekulare Biologie · Proteine",
    readTime: "8–10 MIN",
    bookSearch: ["Aminosäure Grundbau", "Peptidbindung", "Polypeptid", "Proteinfunktionen"],
    hook: "Wie können aus wenigen Grundbausteinen so unterschiedliche Moleküle wie Enzyme, Transportproteine und Antikörper entstehen?",
    intro: "Du lernst den Grundbau einer Aminosäure kennen und verfolgst, wie Aminosäuren über Peptidbindungen zu Polypeptidketten verknüpft werden. Zum Schluss ordnest du Proteinen verschiedene Funktionen zu.",
    goals: [
      "den gemeinsamen Grundbau einer Aminosäure beschreiben",
      "die variable Seitenkette als Unterschied zwischen Aminosäuren erklären",
      "die Entstehung einer Peptidbindung beschreiben",
      "zwischen Aminosäure, Peptid und Polypeptid unterscheiden",
      "verschiedene biologische Funktionen von Proteinen an Beispielen erläutern"
    ],
    reading: [
      {
        label: "1 · Gemeinsamer Bauplan",
        title: "Aminosäuren besitzen eine Grundstruktur",
        paragraphs: [
          "Proteine werden aus Aminosäuren aufgebaut. Eine proteinbildende Aminosäure besitzt einen zentralen Kohlenstoff, an den eine Aminogruppe, eine Carboxylgruppe, ein Wasserstoffatom und eine variable Seitenkette gebunden sind.",
          "Die Seitenkette wird oft mit R abgekürzt. Sie unterscheidet die verschiedenen Aminosäuren voneinander und beeinflusst ihre chemischen Eigenschaften. Der gemeinsame Grundbau bleibt jedoch gleich."
        ],
        callout: { type: "begriff", title: "Grundschema", text: "Aminogruppe – zentrales C-Atom mit H und R – Carboxylgruppe. R steht für die variable Seitenkette." }
      },
      {
        label: "2 · Verknüpfen",
        title: "Die Peptidbindung",
        paragraphs: [
          "Zwei Aminosäuren können miteinander reagieren. Dabei wird die Carboxylgruppe der einen mit der Aminogruppe der anderen Aminosäure verbunden. Die neu entstehende Bindung heißt Peptidbindung.",
          "Bei dieser Verknüpfung wird in der vereinfachten Darstellung ein Wassermolekül abgespalten. Eine Reaktion, bei der unter Bindungsbildung Wasser abgegeben wird, nennt man Kondensationsreaktion."
        ],
        callout: { type: "merke", title: "Merke", text: "Peptidbindung = kovalente Bindung zwischen Carboxylgruppe der einen und Aminogruppe der nächsten Aminosäure." }
      },
      {
        label: "3 · Aus zwei werden viele",
        title: "Vom Peptid zum Polypeptid",
        paragraphs: [
          "Werden nur wenige Aminosäuren verknüpft, spricht man von einem Peptid. Eine längere Kette aus vielen Aminosäuren wird Polypeptid genannt. Zwischen benachbarten Aminosäuren liegen jeweils Peptidbindungen.",
          "Bei einer unverzweigten Kette aus n Aminosäuren entstehen n minus 1 Peptidbindungen. Im vereinfachten Kondensationsmodell werden dabei ebenso viele Wassermoleküle abgespalten."
        ],
        callout: { type: "denk", title: "Denkfrage", text: "Wie viele Peptidbindungen besitzt eine Kette aus sechs Aminosäuren?" }
      },
      {
        label: "4 · Reihenfolge zählt",
        title: "Die Aminosäuresequenz ist Information",
        paragraphs: [
          "Nicht nur die Zahl, sondern vor allem die Reihenfolge der Aminosäuren ist wichtig. Unterschiedliche Sequenzen besitzen unterschiedliche chemische Eigenschaften und können sich später unterschiedlich räumlich falten.",
          "Die Abfolge der Aminosäuren ist deshalb die Grundlage für die spätere Struktur und Funktion eines Proteins. Die genaueren Strukturebenen lernst du im nächsten Modul kennen."
        ],
        callout: { type: "abi", title: "Prüfungswissen", text: "Schon die Reihenfolge der Aminosäuren beeinflusst die spätere räumliche Struktur und damit die Funktion eines Proteins." }
      },
      {
        label: "5 · Viele Aufgaben",
        title: "Proteine erfüllen unterschiedliche Funktionen",
        paragraphs: [
          "Proteine können sehr verschiedene Aufgaben übernehmen. Enzyme beschleunigen chemische Reaktionen. Transportproteine bewegen Stoffe durch Membranen oder innerhalb des Körpers. Strukturproteine stabilisieren Zellen und Gewebe.",
          "Andere Proteine wirken als Rezeptoren bei der Signalaufnahme oder als Antikörper in der Immunabwehr. Die Vielfalt der Funktionen beruht auf unterschiedlichen Aminosäuresequenzen und daraus entstehenden Strukturen."
        ],
        callout: { type: "fehler", title: "Typischer Fehler", text: "Protein bedeutet nicht automatisch Enzym. Enzyme sind eine wichtige Gruppe von Proteinen, aber Proteine besitzen viele weitere Funktionen." }
      }
    ],
    quickCheck: [
      { q: "Welcher Bestandteil unterscheidet die verschiedenen Aminosäuren besonders?", options: ["Die variable Seitenkette R", "Die Peptidbindung", "Das Wassermolekül"], correct: 0, explain: "Richtig: Die Seitenkette R variiert und bestimmt wichtige chemische Eigenschaften der Aminosäure." },
      { q: "Zwischen welchen Gruppen entsteht eine Peptidbindung?", options: ["Zwischen zwei Seitenketten", "Zwischen Carboxylgruppe und Aminogruppe", "Zwischen zwei Wasserstoffatomen"], correct: 1, explain: "Richtig: Die Carboxylgruppe einer Aminosäure wird mit der Aminogruppe der nächsten verknüpft." },
      { q: "Wie viele Peptidbindungen besitzt eine unverzweigte Kette aus vier Aminosäuren?", options: ["2", "3", "4"], correct: 1, explain: "Richtig: Bei n Aminosäuren entstehen n minus 1 Peptidbindungen, hier also drei." }
    ],
    research: {
      title: "Forscherauftrag: Baue eine Polypeptidkette",
      steps: [
        "Starte mit zwei Aminosäuren und notiere die Zahl der Peptidbindungen.",
        "Füge nacheinander weitere Aminosäuren an. Suche eine allgemeine Regel zwischen Zahl der Aminosäuren und Zahl der Peptidbindungen.",
        "Erkläre, warum bei jeder neu gebildeten Peptidbindung im Modell ein Wassermolekül abgespalten wird.",
        "Formuliere anschließend drei unterschiedliche Funktionen, die ein fertig gefaltetes Protein übernehmen kann."
      ]
    },
    tasks: [
      { afb: "I", prompt: "Beschreibe den Grundbau einer Aminosäure und erkläre die Bedeutung der Seitenkette R.", hint: "Nenne Aminogruppe, Carboxylgruppe, zentrales C-Atom, H und variable Seitenkette." },
      { afb: "II", prompt: "Erkläre die Bildung einer Peptidbindung zwischen zwei Aminosäuren.", hint: "Verknüpfe Carboxyl- und Aminogruppe und erwähne die Wasserabspaltung im Kondensationsmodell." },
      { afb: "II", prompt: "Eine Polypeptidkette besteht aus zehn Aminosäuren. Bestimme die Zahl der Peptidbindungen und begründe dein Ergebnis.", hint: "Zwischen jedem benachbarten Aminosäurepaar liegt eine Bindung." },
      { afb: "III", prompt: "Begründe, warum zwei Proteine mit gleicher Länge trotzdem völlig unterschiedliche Funktionen besitzen können.", hint: "Denke an unterschiedliche Aminosäuresequenzen und die daraus folgende Struktur." }
    ],
    quiz: [
      { q: "Was gehört zum Grundbau einer Aminosäure?", options: ["Amino- und Carboxylgruppe sowie eine variable Seitenkette", "Phosphatgruppe und zwei Fettsäuren", "DNA und Ribose", "nur eine Seitenkette"], correct: 0 },
      { q: "Was bezeichnet R im vereinfachten Aminosäuremodell?", options: ["Die variable Seitenkette", "Die Peptidbindung", "Das Wasser", "Die Aminogruppe"], correct: 0 },
      { q: "Was entsteht zwischen zwei verknüpften Aminosäuren?", options: ["Peptidbindung", "Phospholipid", "Wasserstoffbrücke als einzige Bindung", "Membrankanal"], correct: 0 },
      { q: "Wie viele Peptidbindungen besitzt eine Kette aus sechs Aminosäuren?", options: ["5", "6", "7", "12"], correct: 0 },
      { q: "Welche Aussage über Proteinfunktionen stimmt?", options: ["Proteine können unter anderem Enzyme, Transportproteine, Strukturproteine oder Antikörper sein.", "Alle Proteine sind Enzyme.", "Proteine dienen ausschließlich als Energiespeicher.", "Proteine besitzen unabhängig von ihrer Struktur immer dieselbe Funktion."], correct: 0 }
    ],
    lab: "peptideBuilder"
  },

  {
    id: "proteine-2",
    number: "05",
    date: "06.10.2026",
    title: "Proteine II: Struktur bestimmt Funktion",
    subtitle: "Primär- · Sekundär- · Tertiär- · Quartärstruktur · Denaturierung",
    icon: "🧶",
    status: "ready",
    bp: "Molekulare Biologie · Proteine",
    readTime: "9–11 MIN",
    bookSearch: ["Proteinstruktur", "Primärstruktur / Sekundärstruktur", "Tertiärstruktur / Quartärstruktur", "Denaturierung", "Struktur-Funktions-Bezug"],
    hook: "Warum kann ein Protein seine Funktion verlieren, obwohl seine Aminosäuren noch vorhanden sind?",
    intro: "Hier verknüpfst du die räumliche Struktur von Proteinen mit ihrer biologischen Funktion. Du unterscheidest vier Strukturebenen und erklärst, was bei einer Denaturierung geschieht.",
    goals: [
      "Primär-, Sekundär-, Tertiär- und Quartärstruktur unterscheiden",
      "erklären, wie aus einer Aminosäuresequenz eine räumliche Proteinstruktur entsteht",
      "den Zusammenhang zwischen Proteinstruktur und Funktion begründen",
      "Denaturierung als Veränderung höherer Strukturebenen erklären",
      "Folgen von Temperatur- oder pH-Veränderungen für Proteinfunktionen ableiten"
    ],
    reading: [
      {
        label: "1 · Erste Ebene",
        title: "Primärstruktur: die Aminosäuresequenz",
        paragraphs: [
          "Die Primärstruktur ist die genaue Reihenfolge der Aminosäuren in einer Polypeptidkette. Sie wird durch Peptidbindungen zusammengehalten und bildet die Grundlage aller weiteren Strukturebenen.",
          "Weil die Seitenketten der Aminosäuren unterschiedliche Eigenschaften besitzen, beeinflusst ihre Reihenfolge, welche Wechselwirkungen innerhalb der Kette später möglich sind."
        ],
        callout: { type: "merke", title: "Merke", text: "Primärstruktur = Reihenfolge der Aminosäuren. Sie ist die Ausgangsbasis der räumlichen Faltung." }
      },
      {
        label: "2 · Lokale Faltungen",
        title: "Sekundärstruktur: α-Helix und β-Faltblatt",
        paragraphs: [
          "Bestimmte Abschnitte einer Polypeptidkette können regelmäßige lokale Faltungen ausbilden. Besonders bekannt sind die α-Helix und das β-Faltblatt.",
          "Diese Sekundärstrukturen werden vor allem durch Wasserstoffbrücken zwischen Gruppen des Peptidrückgrats stabilisiert. Sie beschreiben noch nicht die vollständige Form des gesamten Proteins."
        ],
        callout: { type: "begriff", title: "Fachbegriffe", text: "Sekundärstruktur = lokale regelmäßige Faltung; typische Formen sind α-Helix und β-Faltblatt." }
      },
      {
        label: "3 · Die Gesamtform",
        title: "Tertiärstruktur",
        paragraphs: [
          "Die Tertiärstruktur beschreibt die gesamte dreidimensionale Faltung einer einzelnen Polypeptidkette. Sie entsteht durch Wechselwirkungen zwischen Seitenketten, zum Beispiel hydrophobe Wechselwirkungen, Ionenbindungen, Wasserstoffbrücken oder Disulfidbrücken.",
          "Dadurch können räumliche Bereiche entstehen, die für die Funktion entscheidend sind, etwa ein aktives Zentrum eines Enzyms oder eine Bindungsstelle eines Rezeptors."
        ],
        callout: { type: "abi", title: "Prüfungswissen", text: "Struktur-Funktions-Bezug: Verändert sich die räumliche Form einer Bindungsstelle, kann ein passender Stoff eventuell nicht mehr binden." }
      },
      {
        label: "4 · Mehrere Ketten",
        title: "Quartärstruktur",
        paragraphs: [
          "Manche funktionsfähigen Proteine bestehen aus mehreren Polypeptidketten. Die räumliche Anordnung dieser Untereinheiten zueinander nennt man Quartärstruktur.",
          "Nicht jedes Protein besitzt eine Quartärstruktur. Eine einzelne gefaltete Polypeptidkette kann bereits als funktionsfähiges Protein vorliegen."
        ],
        callout: { type: "fehler", title: "Typischer Fehler", text: "Quartärstruktur bedeutet nicht vier Faltungen. Gemeint ist die Zusammenlagerung mehrerer Polypeptidketten." }
      },
      {
        label: "5 · Wenn Form verloren geht",
        title: "Denaturierung",
        paragraphs: [
          "Hohe Temperaturen oder extreme pH-Werte können Wechselwirkungen stören, die die räumliche Struktur eines Proteins stabilisieren. Dadurch können Sekundär-, Tertiär- oder Quartärstruktur verändert werden. Dies nennt man Denaturierung.",
          "Die Peptidbindungen der Primärstruktur werden bei einer typischen Denaturierung nicht automatisch gespalten. Trotzdem kann die Funktion verloren gehen, weil die entscheidende räumliche Form nicht mehr vorhanden ist."
        ],
        callout: { type: "denk", title: "Denkfrage", text: "Warum kann ein Enzym nach starker Denaturierung seine Funktion verlieren, obwohl seine Aminosäuresequenz noch vorhanden ist?" }
      }
    ],
    quickCheck: [
      { q: "Was beschreibt die Primärstruktur?", options: ["Die Reihenfolge der Aminosäuren", "Die Zusammenlagerung mehrerer Polypeptidketten", "Nur die α-Helix"], correct: 0, explain: "Richtig: Die Primärstruktur ist die Aminosäuresequenz einer Polypeptidkette." },
      { q: "Welche Strukturebene beschreibt die gesamte 3D-Faltung einer einzelnen Polypeptidkette?", options: ["Sekundärstruktur", "Tertiärstruktur", "Quartärstruktur"], correct: 1, explain: "Richtig: Die Tertiärstruktur beschreibt die räumliche Gesamtform einer einzelnen Polypeptidkette." },
      { q: "Was kann bei Denaturierung verloren gehen?", options: ["höhere räumliche Strukturebenen", "zwingend jede Peptidbindung", "die chemische Existenz aller Aminosäuren"], correct: 0, explain: "Richtig: Vor allem die räumliche Struktur wird gestört; die Primärstruktur kann erhalten bleiben." }
    ],
    research: {
      title: "Forscherauftrag: Von der Sequenz zur Funktion",
      steps: [
        "Wechsle im Lernlabor nacheinander durch die vier Strukturebenen und formuliere für jede Ebene einen Ein-Satz-Merksatz.",
        "Stelle die Tertiärstruktur ein und erhöhe die Temperatur im Modell. Beschreibe die sichtbare Veränderung.",
        "Erkläre, warum die Primärstruktur im Modell trotz Denaturierung erhalten bleibt.",
        "Übertrage den Struktur-Funktions-Zusammenhang auf ein Enzym: Welche Folge hätte eine veränderte Form des aktiven Zentrums?"
      ]
    },
    tasks: [
      { afb: "I", prompt: "Ordne Primär-, Sekundär-, Tertiär- und Quartärstruktur jeweils eine kurze Definition zu.", hint: "Sequenz – lokale Faltung – gesamte Faltung einer Kette – Zusammenlagerung mehrerer Ketten." },
      { afb: "II", prompt: "Erkläre, warum die Aminosäuresequenz die spätere Tertiärstruktur beeinflusst.", hint: "Die Seitenketten besitzen unterschiedliche Eigenschaften und können unterschiedliche Wechselwirkungen eingehen." },
      { afb: "II", prompt: "Erkläre den Begriff Denaturierung und grenze ihn vom vollständigen Abbau einer Polypeptidkette ab.", hint: "Bei Denaturierung geht vor allem räumliche Struktur verloren; Peptidbindungen bleiben typischerweise bestehen." },
      { afb: "III", prompt: "Ein Protein bindet normalerweise einen bestimmten Signalstoff. Nach starker Erwärmung ist keine Bindung mehr messbar. Entwickle eine strukturbezogene Erklärung.", hint: "Verknüpfe Erwärmung, Störung von Wechselwirkungen, Veränderung der Bindungsstelle und Funktionsverlust." }
    ],
    quiz: [
      { q: "Was ist die Primärstruktur eines Proteins?", options: ["Aminosäuresequenz", "Gesamte 3D-Faltung", "Zusammenlagerung mehrerer Ketten", "nur eine α-Helix"], correct: 0 },
      { q: "Welche Formen gehören zur Sekundärstruktur?", options: ["α-Helix und β-Faltblatt", "Aminogruppe und Carboxylgruppe", "Vesikel und Membrankanal", "DNA-Doppelhelix und RNA"], correct: 0 },
      { q: "Was beschreibt die Tertiärstruktur?", options: ["Gesamte dreidimensionale Faltung einer einzelnen Polypeptidkette", "Reihenfolge der Gene", "Zusammenlagerung mehrerer Zellen", "nur die Peptidbindung"], correct: 0 },
      { q: "Wann besitzt ein Protein eine Quartärstruktur?", options: ["Wenn mehrere Polypeptidketten zu einer funktionellen Einheit zusammenlagern", "Wenn es genau vier Aminosäuren enthält", "Wenn es ausschließlich aus β-Faltblättern besteht", "Wenn es denaturiert ist"], correct: 0 },
      { q: "Welche Aussage zur Denaturierung stimmt?", options: ["Die räumliche Struktur kann verloren gehen, wodurch die Funktion beeinträchtigt wird.", "Alle Peptidbindungen werden zwingend gespalten.", "Die Primärstruktur wird immer vollständig gelöscht.", "Denaturierung verbessert grundsätzlich jede Proteinfunktion."], correct: 0 }
    ],
    lab: "proteinStructure"
  },

  {
    id: "enzyme",
    number: "06",
    date: "13.10.2026",
    title: "Enzyme als Biokatalysatoren",
    subtitle: "Aktives Zentrum · Spezifität · Enzym-Substrat-Komplex · Modelle",
    icon: "🧪",
    status: "ready",
    bp: "Molekulare Biologie · Enzyme",
    readTime: "9–11 MIN",
    bookSearch: ["Enzym", "Biokatalysator / Aktivierungsenergie", "aktives Zentrum", "Substratspezifität / Wirkungsspezifität", "Schlüssel-Schloss / Induced Fit"],
    hook: "Wie können Enzyme Reaktionen stark beschleunigen und trotzdem nur mit bestimmten Substraten arbeiten?",
    intro: "Du untersuchst Enzyme als Biokatalysatoren. Im Mittelpunkt stehen aktives Zentrum, Enzym-Substrat-Komplex, Substrat- und Wirkungsspezifität sowie zwei Modelle zur Bindung des Substrats.",
    goals: [
      "Enzyme als Biokatalysatoren erklären",
      "die Wirkung einer erniedrigten Aktivierungsenergie beschreiben",
      "aktives Zentrum und Enzym-Substrat-Komplex erläutern",
      "Substratspezifität und Wirkungsspezifität unterscheiden",
      "Schlüssel-Schloss- und Induced-Fit-Modell vergleichen und als Modelle einordnen"
    ],
    reading: [
      {
        label: "1 · Reaktionen brauchen einen Start",
        title: "Aktivierungsenergie",
        paragraphs: [
          "Viele chemische Reaktionen sind grundsätzlich möglich, laufen bei Zellbedingungen aber zu langsam ab. Damit eine Reaktion startet, müssen reagierende Teilchen zunächst einen energiereichen Übergangszustand erreichen. Die dafür notwendige Energieschwelle nennt man Aktivierungsenergie.",
          "Enzyme ermöglichen einen Reaktionsweg mit geringerer Aktivierungsenergie. Dadurch können bei gleicher Temperatur mehr Teilchen erfolgreich reagieren und die Reaktion läuft schneller."
        ],
        callout: { type: "merke", title: "Merke", text: "Enzyme beschleunigen Reaktionen, indem sie die notwendige Aktivierungsenergie herabsetzen." }
      },
      {
        label: "2 · Biologische Katalysatoren",
        title: "Enzyme werden nicht verbraucht",
        paragraphs: [
          "Ein Katalysator beschleunigt eine Reaktion, ohne dabei dauerhaft verbraucht zu werden. Enzyme sind biologische Katalysatoren und bestehen meist aus Proteinen.",
          "Nach der Produktfreisetzung kann ein Enzym erneut Substratmoleküle binden und weitere Reaktionszyklen katalysieren."
        ],
        callout: { type: "begriff", title: "Fachbegriff", text: "Biokatalysator = biologischer Katalysator, der eine Reaktion beschleunigt und danach wieder zur Verfügung steht." }
      },
      {
        label: "3 · Der Reaktionsort",
        title: "Aktives Zentrum und Enzym-Substrat-Komplex",
        paragraphs: [
          "Der Bereich eines Enzyms, an dem ein Substrat bindet und die katalysierte Reaktion stattfindet, heißt aktives Zentrum. Seine räumliche Form und seine chemischen Eigenschaften werden durch die Proteinstruktur bestimmt.",
          "Bindet das passende Substrat vorübergehend am aktiven Zentrum, entsteht ein Enzym-Substrat-Komplex. Nach der Reaktion werden die Produkte freigesetzt und das Enzym kann erneut reagieren."
        ],
        callout: { type: "abi", title: "Reaktionsschema", text: "Enzym + Substrat → Enzym-Substrat-Komplex → Enzym + Produkt(e)." }
      },
      {
        label: "4 · Passend und gezielt",
        title: "Substrat- und Wirkungsspezifität",
        paragraphs: [
          "Substratspezifität bedeutet, dass ein Enzym nur ein bestimmtes Substrat oder eine eng begrenzte Gruppe ähnlicher Substrate passend binden kann. Entscheidend ist die Komplementarität zum aktiven Zentrum.",
          "Wirkungsspezifität bedeutet, dass ein Enzym am gebundenen Substrat eine bestimmte Reaktion katalysiert und dadurch charakteristische Produkte entstehen. Ein Enzym macht also nicht beliebige Veränderungen am Substrat."
        ],
        callout: { type: "fehler", title: "Typischer Fehler", text: "Substratspezifität fragt: Was bindet? Wirkungsspezifität fragt: Welche Reaktion wird katalysiert?" }
      },
      {
        label: "5 · Modelle sind Vereinfachungen",
        title: "Schlüssel-Schloss und Induced Fit",
        paragraphs: [
          "Das Schlüssel-Schloss-Modell stellt das aktive Zentrum und das passende Substrat als komplementäre Formen dar. Es eignet sich gut, um Substratspezifität anschaulich zu erklären.",
          "Das Induced-Fit-Modell berücksichtigt stärker, dass Proteine beweglich sind. Bei Annäherung des passenden Substrats kann sich das Enzym etwas verformen und die Bindungsstelle optimal anpassen. Beide Darstellungen sind Modelle und vereinfachen die tatsächlichen molekularen Vorgänge."
        ],
        callout: { type: "denk", title: "Denkfrage", text: "Warum passt das Induced-Fit-Modell besonders gut zur Vorstellung eines beweglichen, räumlich gefalteten Proteins?" }
      }
    ],
    quickCheck: [
      { q: "Wie beschleunigt ein Enzym eine Reaktion?", options: ["Es senkt die Aktivierungsenergie.", "Es erhöht dauerhaft die Temperatur der Zelle.", "Es wird vollständig zu Produkt umgebaut."], correct: 0, explain: "Richtig: Enzyme ermöglichen einen Reaktionsweg mit geringerer Aktivierungsenergie." },
      { q: "Was ist ein Enzym-Substrat-Komplex?", options: ["Die vorübergehende Bindung des Substrats am aktiven Zentrum", "Ein denaturiertes Enzym", "Ein Membranvesikel"], correct: 0, explain: "Richtig: Der Komplex entsteht, wenn das passende Substrat am aktiven Zentrum gebunden ist." },
      { q: "Was bedeutet Wirkungsspezifität?", options: ["Das Enzym katalysiert eine bestimmte Reaktion am Substrat.", "Das Enzym bindet jedes beliebige Substrat.", "Das Enzym wirkt nur bei exakt 37 °C."], correct: 0, explain: "Richtig: Wirkungsspezifität beschreibt die spezifische Reaktion, die ein Enzym katalysiert." }
    ],
    research: {
      title: "Forscherauftrag: Prüfe die Spezifität im Modell",
      steps: [
        "Wähle das Schlüssel-Schloss-Modell und teste alle drei Substrate. Notiere, welches Substrat bindet.",
        "Erkläre das Ergebnis mit dem Begriff Substratspezifität.",
        "Wechsle zum Induced-Fit-Modell und teste das passende Substrat erneut. Beschreibe den Unterschied der Modellvorstellung.",
        "Formuliere anhand des Reaktionsschemas, was nach Bildung des Enzym-Substrat-Komplexes geschieht.",
        "Erkläre abschließend, warum keines der beiden Modelle die Wirklichkeit vollständig abbildet."
      ]
    },
    tasks: [
      { afb: "I", prompt: "Definiere die Begriffe Biokatalysator, aktives Zentrum und Enzym-Substrat-Komplex.", hint: "Ordne jedem Begriff eine klare Funktion im Reaktionsablauf zu." },
      { afb: "II", prompt: "Erkläre, warum ein Enzym eine Reaktion beschleunigen kann, ohne selbst dauerhaft verbraucht zu werden.", hint: "Nenne Aktivierungsenergie, vorübergehende Substratbindung und Produktfreisetzung." },
      { afb: "II", prompt: "Unterscheide Substratspezifität und Wirkungsspezifität an einem selbst gewählten Beispiel.", hint: "Erste Frage: Was passt? Zweite Frage: Welche Reaktion wird durchgeführt?" },
      { afb: "III", prompt: "Vergleiche Schlüssel-Schloss- und Induced-Fit-Modell und beurteile, warum beide trotz ihrer Unterschiede nützlich sein können.", hint: "Modelle vereinfachen unterschiedliche Aspekte: Passform einerseits, Flexibilität des Proteins andererseits." }
    ],
    quiz: [
      { q: "Was bewirken Enzyme bezüglich der Aktivierungsenergie?", options: ["Sie senken sie.", "Sie erhöhen sie immer.", "Sie machen Aktivierungsenergie grundsätzlich unmöglich.", "Sie wandeln sie in DNA um."], correct: 0 },
      { q: "Wo bindet ein Substrat am Enzym?", options: ["Am aktiven Zentrum", "An jeder beliebigen Stelle gleich gut", "An der Zellmembran statt am Enzym", "Nur an der Peptidbindung"], correct: 0 },
      { q: "Was bedeutet Substratspezifität?", options: ["Ein Enzym bindet nur bestimmte passende Substrate.", "Ein Enzym katalysiert jede mögliche Reaktion.", "Ein Enzym arbeitet ausschließlich in einer Zelle.", "Ein Enzym wird nach einer Reaktion verbraucht."], correct: 0 },
      { q: "Was bedeutet Wirkungsspezifität?", options: ["Das Enzym katalysiert eine bestimmte Reaktion und erzeugt charakteristische Produkte.", "Das Enzym passt sich jedem Molekül beliebig an.", "Das Enzym besitzt immer genau eine Aminosäure.", "Das Enzym transportiert Stoffe gegen Gradienten."], correct: 0 },
      { q: "Was ergänzt das Induced-Fit-Modell gegenüber einer starren Schlüssel-Schloss-Vorstellung?", options: ["Das aktive Zentrum kann sich bei der Bindung etwas anpassen.", "Enzyme bestehen nicht aus Proteinen.", "Substrate besitzen keine Form.", "Aktivierungsenergie spielt keine Rolle."], correct: 0 }
    ],
    lab: "enzymeBinding"
  },

  {
    id: "enzymexperiment",
    number: "07",
    date: "19.–20.10.2026",
    title: "Enzymexperiment planen & durchführen",
    subtitle: "Hypothese · Variablen · Kontrollansatz · Messwerte · Auswertung",
    icon: "🔬",
    status: "ready",
    bp: "Erkenntnisgewinnung · Experimentieren",
    readTime: "11–13 MIN",
    bookSearch: ["Enzymaktivität", "Temperaturabhängigkeit / pH-Abhängigkeit", "Substratkonzentration", "Experiment planen", "unabhängige und abhängige Variable", "Kontrollversuch"],
    hook: "Wie plant man ein Enzymexperiment so, dass eine gemessene Veränderung wirklich auf den untersuchten Einflussfaktor zurückgeführt werden kann?",
    intro: "Zum Abschluss planst und untersuchst du einen Einflussfaktor auf eine Enzymreaktion. Du entwickelst eine prüfbare Hypothese, legst Variablen und Kontrollen fest, dokumentierst Messwerte und wertest Ergebnisse fachgerecht aus.",
    goals: [
      "aus einer Fragestellung eine prüfbare Hypothese formulieren",
      "unabhängige, abhängige und kontrollierte Variablen unterscheiden",
      "einen geeigneten Kontrollansatz begründen",
      "wichtige Einflussfaktoren auf Enzymaktivität fachlich erklären",
      "Messwerte systematisch dokumentieren und angemessen grafisch darstellen",
      "Ergebnisse auswerten und die Aussagekraft eines Experiments kritisch beurteilen"
    ],
    reading: [
      {
        label: "1 · Von der Frage zur Vorhersage",
        title: "Eine gute Hypothese ist prüfbar",
        paragraphs: [
          "Ein Experiment beginnt mit einer klaren Fragestellung, zum Beispiel: Welchen Einfluss hat die Temperatur auf die Reaktionsgeschwindigkeit eines Enzyms? Aus Fachwissen wird anschließend eine Hypothese als begründete Vorhersage formuliert.",
          "Eine hilfreiche Form ist: Wenn die unabhängige Variable verändert wird, dann verändert sich die abhängige Variable in erwarteter Weise, weil ... . Eine Hypothese muss so formuliert sein, dass Messdaten sie stützen oder ihr widersprechen können."
        ],
        callout: { type: "merke", title: "Hypothesen-Satz", text: "Wenn ..., dann ..., weil ... . Die Begründung verbindet deine Vorhersage mit biologischem Fachwissen." }
      },
      {
        label: "2 · Nur eine Sache gezielt verändern",
        title: "Unabhängige, abhängige und kontrollierte Variablen",
        paragraphs: [
          "Die unabhängige Variable wird von dir gezielt verändert, zum Beispiel Temperatur oder pH-Wert. Die abhängige Variable wird gemessen, zum Beispiel Produktmenge pro Minute als Maß für die Reaktionsgeschwindigkeit.",
          "Andere Bedingungen sollen möglichst konstant bleiben. Solche kontrollierten Variablen können Enzymmenge, Substratmenge, Gesamtvolumen oder Messdauer sein. Nur so lässt sich eine beobachtete Veränderung sinnvoll mit der unabhängigen Variable in Verbindung bringen."
        ],
        callout: { type: "abi", title: "Prüfungswissen", text: "Unabhängig = verändert. Abhängig = gemessen. Kontrollierte Variablen = bewusst konstant gehalten." }
      },
      {
        label: "3 · Vergleich macht Ergebnisse deutbar",
        title: "Kontrollansatz und Referenzbedingung",
        paragraphs: [
          "Ein Kontrollansatz schafft einen sinnvollen Vergleich. Untersucht man mehrere Temperaturen, kann eine festgelegte Referenztemperatur als Vergleich dienen. Zusätzlich kann ein Ansatz ohne aktives Enzym zeigen, ob eine beobachtete Produktbildung tatsächlich enzymabhängig ist.",
          "Der passende Kontrollansatz hängt von der Fragestellung ab. Wichtig ist, dass er dir hilft, alternative Erklärungen auszuschließen."
        ],
        callout: { type: "fehler", title: "Typischer Fehler", text: "Kontrolle bedeutet nicht einfach noch ein weiterer Versuch. Eine Kontrolle braucht eine klare Vergleichsfunktion." }
      },
      {
        label: "4 · Warum Enzymaktivität sich verändert",
        title: "Temperatur, pH und Substratangebot",
        paragraphs: [
          "Mit steigender Temperatur bewegen sich Teilchen zunächst schneller, sodass Enzym und Substrat häufiger wirksam zusammentreffen können. Bei zu hoher Temperatur können jedoch Wechselwirkungen in der Proteinstruktur gestört werden; das aktive Zentrum verändert sich und die Aktivität kann stark sinken.",
          "Der pH-Wert kann Ladungen und Wechselwirkungen im Protein beeinflussen. Dadurch können Form und chemische Eigenschaften des aktiven Zentrums verändert werden. Viele Enzyme besitzen deshalb einen pH-Bereich mit besonders hoher Aktivität.",
          "Bei zunehmender Substratkonzentration steigt die Reaktionsgeschwindigkeit zunächst häufig an. Bei sehr hohem Substratangebot sind viele aktive Zentren einen großen Teil der Zeit besetzt; eine weitere Erhöhung steigert die Geschwindigkeit dann nur noch wenig."
        ],
        callout: { type: "denk", title: "Denkfrage", text: "Warum ist es bei einem Temperaturexperiment wichtig, pH-Wert, Enzymmenge und Substratmenge konstant zu halten?" }
      },
      {
        label: "5 · Messen statt nur beobachten",
        title: "Messgröße und Wiederholungen",
        paragraphs: [
          "Eine qualitative Beobachtung wie es schäumt stärker kann ein Hinweis sein, ist aber schwer exakt zu vergleichen. Besser ist eine messbare abhängige Variable, etwa gebildetes Gasvolumen pro Minute, Farbänderung nach festgelegter Zeit oder Zeit bis zu einem definierten Endpunkt.",
          "Wiederholungsmessungen helfen, zufällige Schwankungen zu erkennen. Bedingungen, Einheiten und Messdauer müssen sauber dokumentiert werden, damit Ergebnisse vergleichbar und nachvollziehbar sind."
        ],
        callout: { type: "begriff", title: "Messqualität", text: "Gute Daten entstehen durch eine klar definierte Messgröße, gleiche Messbedingungen und möglichst Wiederholungen." }
      },
      {
        label: "6 · Daten verständlich darstellen",
        title: "Tabelle, Diagramm und Auswertung",
        paragraphs: [
          "Messwerte werden zuerst übersichtlich in einer Tabelle mit Größen und Einheiten dokumentiert. Für ein Diagramm kommt die unabhängige Variable in der Regel auf die x-Achse und die abhängige Variable auf die y-Achse.",
          "Eine Auswertung beschreibt zunächst das erkennbare Muster und erklärt es anschließend biologisch. Danach sollte geprüft werden, ob die Daten zur Hypothese passen und welche Unsicherheiten oder Verbesserungsmöglichkeiten der Versuch besitzt."
        ],
        callout: { type: "abi", title: "Auswertungsstruktur", text: "1. Datenmuster beschreiben. 2. Biologisch erklären. 3. Bezug zur Hypothese herstellen. 4. Fehlerquellen und Verbesserungen nennen." }
      }
    ],
    quickCheck: [
      { q: "Welche Variable wird im Experiment gezielt verändert?", options: ["Die unabhängige Variable", "Die abhängige Variable", "Jede kontrollierte Variable"], correct: 0, explain: "Richtig: Die unabhängige Variable ist der Faktor, den du gezielt veränderst." },
      { q: "Wozu dient ein Kontrollansatz?", options: ["Er liefert einen sinnvollen Vergleich und hilft alternative Erklärungen auszuschließen.", "Er erhöht automatisch jede Enzymaktivität.", "Er ersetzt die Messwerte."], correct: 0, explain: "Richtig: Eine Kontrolle macht Ergebnisse interpretierbarer, weil sie als gezielter Vergleich dient." },
      { q: "Welche Achse erhält in einem typischen Diagramm die unabhängige Variable?", options: ["x-Achse", "y-Achse", "keine Achse"], correct: 0, explain: "Richtig: Die unabhängig veränderte Größe wird normalerweise auf der x-Achse dargestellt." }
    ],
    research: {
      title: "Forscherauftrag: Plane dein eigenes Enzymexperiment",
      steps: [
        "Wähle im Experiment-Planer ein Enzym und einen Einflussfaktor. Lies die automatisch erzeugte Fragestellung und Hypothese.",
        "Prüfe die Hypothese kritisch: Ist sie wirklich messbar und enthält sie eine biologische Begründung? Formuliere bei Bedarf eine bessere Version.",
        "Notiere unabhängige, abhängige und mindestens drei kontrollierte Variablen für deinen realen Versuch.",
        "Lege einen sinnvollen Kontrollansatz oder eine Referenzbedingung fest und begründe dessen Funktion.",
        "Plane mindestens drei Werte der unabhängigen Variable und möglichst Wiederholungen. Lege vorher fest, was genau und wie lange gemessen wird.",
        "Entwirf eine leere Datentabelle mit Größen und Einheiten sowie die Achsenbeschriftung für das spätere Diagramm."
      ]
    },
    tasks: [
      { afb: "I", prompt: "Unterscheide unabhängige, abhängige und kontrollierte Variable jeweils in einem Satz.", hint: "Verändert – gemessen – konstant gehalten." },
      { afb: "II", prompt: "Du untersuchst die Temperaturabhängigkeit von Katalase. Ordne Temperatur, gebildetes Gasvolumen pro Minute, Enzymmenge und pH-Wert den Variablentypen zu.", hint: "Nur die Temperatur soll gezielt verändert werden; das Gasvolumen ist die Messgröße." },
      { afb: "II", prompt: "Formuliere eine prüfbare Hypothese zur Wirkung des pH-Wertes auf die Aktivität eines Enzyms.", hint: "Nutze Wenn – dann – weil und begründe über Struktur bzw. aktives Zentrum." },
      { afb: "III", prompt: "Eine Gruppe verändert gleichzeitig Temperatur und Enzymmenge und beobachtet eine höhere Reaktionsgeschwindigkeit. Beurteile, warum daraus keine eindeutige Schlussfolgerung zur Temperaturwirkung möglich ist.", hint: "Zwei unabhängige Einflussgrößen wurden gleichzeitig verändert; dadurch ist die Ursache der Wirkung nicht eindeutig." },
      { afb: "III", prompt: "Entwickle zwei konkrete Verbesserungen für ein Enzymexperiment, das nur einmal durchgeführt wurde und dessen Messdauer zwischen den Ansätzen unterschiedlich war.", hint: "Denke an Wiederholungen und standardisierte Messbedingungen." }
    ],
    quiz: [
      { q: "Was ist eine unabhängige Variable?", options: ["Die gezielt veränderte Größe", "Die gemessene Reaktion", "Eine immer zufällige Störgröße", "Die Schlussfolgerung"], correct: 0 },
      { q: "Was ist eine abhängige Variable?", options: ["Die gemessene Größe, deren Veränderung untersucht wird", "Die bewusst konstant gehaltene Größe", "Die Fragestellung", "Das Lehrbuch"], correct: 0 },
      { q: "Warum hält man kontrollierte Variablen möglichst konstant?", options: ["Damit Veränderungen der Messgröße möglichst der unabhängigen Variable zugeordnet werden können", "Damit keine Messung stattfindet", "Damit die Hypothese automatisch richtig ist", "Damit immer nur ein Messwert entsteht"], correct: 0 },
      { q: "Welche Aussage zur Temperaturwirkung auf Enzyme wurde im Modul erklärt?", options: ["Sehr hohe Temperaturen können die Proteinstruktur und damit das aktive Zentrum verändern.", "Je höher die Temperatur, desto höher ist die Aktivität ohne Grenze.", "Temperatur hat grundsätzlich keinen Einfluss auf Proteine.", "Enzyme werden bei Erwärmung zu Lipiden."], correct: 0 },
      { q: "Wie werden unabhängige und abhängige Variable typischerweise im Diagramm angeordnet?", options: ["unabhängige Variable x-Achse, abhängige Variable y-Achse", "abhängige Variable x-Achse, unabhängige Variable y-Achse", "beide nur in die Überschrift", "beide auf dieselbe Achse ohne Einheit"], correct: 0 }
    ],
    lab: "experimentPlanner"
  }
];
