
/**
 * @overview configs of ccm component paper_generator
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "small": {
    key: "small",

    author: 'Manfred Kaul',
    address: 'Hochschule Bonn-Rhein-Sieg',
    email: 'Manfred.Kaul[at]h-brs.de',
    title: 'Kleines Beispiel',
    subtitle: 'Eine empirische Studie',

    headers: [
      "Ihr Geschlecht?",
      "Ihr Alter?"
    ],

    questions: [
      { man: "männlich", woman: "weiblich", other: "divers" },
      { young: "Alter: 18-25", middle: "Alter: 26-30", older: "Alter: 31-40", old: "älter" }
    ],

    randomize: {
      row: true,
      column: false
    },

    figures: [
      {
        id: "histogram_categories_absolute",
        type: "histogram_categories",
        title: "Histogramm Kategorien absolut",
        mapping: [ "ccm.load", {
          "url": "https://ccmjs.github.io/mkaul-components/paper_generator/resources/mappings.js",
          "type": "module",
          "import": "map_to_count"
        } ]
      }
    ],

    html: {

      header: {
        inner: [
          { tag: 'h1', inner: '%title%' },
          { tag: 'h2', inner: '%subtitle%' },
          { tag: 'p', inner: '<em>%author%</em><br>%address%<br>%email%' }
        ]
      },

      main: {
        inner: [
          {
            id: 'welcome',
            inner: [
              { tag: 'h1', inner: '%title%'},
              { tag: 'p', inner: '%subtitle%' },
              { tag: 'button', id: 'start_survey', inner: 'An der Umfrage teilnehmen!<sup>(*)</sup>', onclick: '%start_survey%' },
              { tag: 'p', inner: '<sup>(*)</sup><em>Nach der Teilnahme erhalten Sie Zugriff auf die Auswertung der Umfrage.</em>' }
            ]
          },
          {
            id: 'survey',
            inner: [
              { tag: 'h1', inner: 'Umfrage' },
              { id: 'ccm_poll' },
              { tag: 'button', id: 'start_result', inner: 'Weiter zum Ergebnis der Umfrage', onclick: '%start_result%' }
            ]
          },
          {
            id: 'result',
            inner: [
              { tag: 'h1', inner: 'Vielen Dank für Ihre Teilnahme.' },
              { tag: 'button', id: 'start_paper', inner: 'Weiter zum Artikel über die bisherigen Ergebnisse der Umfrage', onclick: '%start_paper%' },
            ]
          },
          {
            id: 'paper_frame'
          }
        ]
      }
    },

    css: [ 'ccm.load', 'https://ccmjs.github.io/mkaul-components/paper_generator/resources/small.css' ],

    microservice: 'https://kaul.inf.h-brs.de/data/2018/prosem/server.php',

    inner: '<div id="paper"> <header class="paper"></header> <article id="main"> <section class="abstract"> <b>Abstract.</b> Hier steht der Abstract. </section> <section class="keywords"><b>Keywords:</b> Hier stehen die Keywords</section> <section> <h2 id="einfuehrung">1. Einführung</h2> <p>Hier steht die Einführung</p> </section> <section> <h2 id="hauptteil">2. Hauptteil</h2> <p>Hier steht der Hauptteil</p> <h3>2.1. Ergebnisse</h3> <p>Wie häufig wurden die verschiedenen Antwortkategorien ausgewählt?</p> <figure> <div id="histogram_categories_absolute" class="plot"></div> <figcaption>Häufigkeiten der Antwortkategorien in absoluten Zahlen</figcaption> </figure> </section> <section> <h2 id="schluss">3. Schluss</h2> <p>Hier steht der Schluss, Zusammenfassung und Fazit.</p> </section> </article> </div>',

    process_this_result: [ "ccm.load", {
      "url": "https://ccmjs.github.io/mkaul-components/paper_generator/resources/processors.js",
      "type": "module",
      "import": "process_this_result"
    } ],

    process_all_results: [ "ccm.load", {
      "url": "https://ccmjs.github.io/mkaul-components/paper_generator/resources/processors.js",
      "type": "module",
      "import": "process_all_results"
    } ]

  },

  "submit": {
    "key": "submit",
    "app": [ "ccm.component", "ccm.paper_generator.js" ],
    "builder": [
      "ccm.component",
      "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-6.1.0.js",
      {
        "json_builder": [
          "ccm.component",
          "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.1.0.js",
          {
            "html.inner.1": "",
            "directly": true
          }
        ],
        "defaults": {},
        "entries": [
          {
            "label": "Title",
            "name": "title",
            "type": "text",
            "info": "Title of the paper"
          },
          {
            "label": "Subtitle",
            "name": "subtitle",
            "type": "text",
            "info": "Subtitle of the paper"
          },
          {
            "label": "Author",
            "name": "author",
            "type": "text",
            "info": "Name of the author"
          },
          {
            "label": "Address",
            "name": "address",
            "type": "text",
            "info": "Address of the author"
          },
          {
            "label": "E-Mail",
            "name": "email",
            "type": "text",
            "info": "E-Mail of the author"
          },
          {
            "label": "Headers",
            "name": "headers",
            "type": "several",
            "info": "Headers: Questions per choice page",
            "items": [
              {
                "label": "Header %nr%",
                "name": "header",
                "type": "text",
                "info": "Single Header: Question per choice page"
              }
            ]
          },
          {
            "label": "Questions",
            "name": "questions",
            "type": "several",
            "info": "Choices on one pages",
            "items": [
              {
                "label": "Choice Key %nr%",
                "name": "choice_key",
                "type": "text",
                "info": "Key for a Single Choice for one Question per page"
              },
              {
                "label": "Choice Value %nr%",
                "name": "choice_value",
                "type": "text",
                "info": "Value for a Single Choice for one Question per page"
              }
            ]
          },
          {
            "label": "Randomize",
            "info": "Randomize sequence of choices",
            "inner": [
              {
                "label": "Row",
                "name": "row",
                "type": "checkbox",
                "info": "Randomize sequence of choices in a row"
              },
              {
                "label": "Column",
                "name": "column",
                "type": "checkbox",
                "info": "Randomize sequence of choices in a column"
              }
            ]
          },
          {
            "label": "HTML Structure of Header",
            "name": "html.header",
            "type": "json_builder",
            "value": "\n        inner: [\n          { tag: \"h1\", inner: \"%title%\" },\n          { tag: \"h2\", inner: \"%subtitle%\" },\n          { tag: \"p\", inner: \"<em>%author%</em><br>%address%<br>%email%\" }\n        ]\n      }",
            "info": "Structure of header in JSON"
          },
          {
            "label": "HTML Main Structure",
            "name": "html.main",
            "type": "json_builder",
            "value": "{\n        inner: [\n          {\n            id: \"welcome\",\n            inner: [\n              { tag: \"h1\", inner: \"Kleine Umfrage\"},\n              { tag: \"p\", inner: \"Kleiner Text, der zur Teilnahme an der Umfrage animieren soll.\" },\n              { tag: \"button\", id: \"start_survey\", inner: \"An der Umfrage teilnehmen!<sup>(*)</sup>\", onclick: \"%start_survey%\" },\n              { tag: \"p\", inner: \"<sup>(*)</sup><em>Nach der Teilnahme erhalten Sie Zugriff auf die Auswertung der Umfrage.</em>\" }\n            ]\n          },\n          {\n            id: \"survey\",\n            inner: [\n              { tag: \"h1\", inner: \"Umfrage\" },\n              { id: \"ccm_poll\" },\n              { tag: \"button\", id: \"start_result\", inner: \"Weiter zum Ergebnis der Umfrage\", onclick: \"%start_result%\" }\n            ]\n          },\n          {\n            id: \"result\",\n            inner: [\n              { tag: \"h1\", inner: \"Vielen Dank für Ihre Teilnahme.\" },\n              { tag: \"button\", id: \"start_paper\", inner: \"Weiter zum Artikel über die bisherigen Ergebnisse der Umfrage\", onclick: \"%start_paper%\" },\n            ]\n          },\n          {\n            id: \"paper_frame\"\n          }\n        ]\n      }",
            "info": "Structure of main paper in JSON"
          },
          {
            "label": "Paper",
            "name": "inner",
            "value": "<div id=\"paper\"> <header class=\"paper\"></header> <article id=\"main\"> <section class=\"abstract\"> <b>Abstract.</b> Hier steht der Abstract. </section> <section class=\"keywords\"><b>Keywords:</b> Hier stehen die Keywords</section> <section> <h2 id=\"einfuehrung\">1. Einführung</h2> <p>Hier steht die Einführung</p> </section> <section> <h2 id=\"hauptteil\">2. Hauptteil</h2> <p>Hier steht der Hauptteil</p> <h3>2.1. Ergebnisse</h3> <p>Wie häufig wurden die verschiedenen Antwortkategorien ausgewählt?</p> <figure> <div id=\"histogram_categories_absolute\" class=\"plot\"></div> <figcaption>Häufigkeiten der Antwortkategorien in absoluten Zahlen</figcaption> </figure> </section> <section> <h2 id=\"schluss\">3. Schluss</h2> <p>Hier steht der Schluss, Zusammenfassung und Fazit.</p> </section> </article> </div>",
            "type": "json_builder",
            "info": "Paper written in HTML"
          }
        ]
      }
    ]
  },

  "agile_values": {

    key: "agile_values",

    // optional configuration if there is no header in the inner html:
    author: 'Manfred Kaul',
    address: 'Hochschule Bonn-Rhein-Sieg',
    email: 'Manfred.Kaul[at]h-brs.de',
    title: 'Agile Werte',
    subtitle: 'Eine empirische Studie',

    questions: [
      // { man: "männlich", woman: "weiblich", other: "divers" },
      // { young: "Alter: 18-25", middle: "Alter: 26-30", older: "Alter: 31-40", old: "älter" },

      // Manifest // http://agilemanifesto.org/iso/de/manifesto.html
      {agil: 'Individuen und Interaktionen', plan: 'Prozesse und Werkzeuge'},
      {agil: 'Funktionierende Software', plan: 'Umfassende Dokumentation'},
      {agil: 'Zusammenarbeit mit dem Kunden', plan: 'Vertragsverhandlung'},
      {agil: 'Reagieren auf Veränderung', plan: 'Befolgen eines Plans'},

      // Gunter Dueck
      {agil: "Individuelle Menschenentwicklung", plan: "Versetzung nach Standardstufen und Klassen"},
      {agil: "Aktivierung von Selbstwirksamkeitsgefühl", plan: "Prüfungs- und Zeugnisdokumentation"},
      {agil: "Folgen von gewecktem Interesse", plan: "Befolgung von Lehrplänen"},
      {agil: "Zukunftsfähigkeit der Bildung", plan: "Bewahren klassischer Vorstellungen"},

      // https://digitaleneuordnung.de/blog/agiles-manifest-fuer-unternehmensentwicklung/
      {agil: "Konkrete Leistung mit Mehrwert", plan: "gute Präsentation mit Powerpoint"},
      {agil: "(persönliche) Beziehung", plan: "Wasserdichter Vertrag"},
      {agil: "sich an neue Herausforderungen anpassen können", plan: "einen festen Plan haben"}

    ],

    randomize: {
      row: true,
      column: true
    },

    figures: [
      {
        id: "histogram_categories_absolute",
        type: "histogram_categories",
        title: "Histogramm Kategorien absolut",
        mapping: [ "ccm.load", {
          "url": "https://ccmjs.github.io/mkaul-components/paper_generator/resources/mappings.js",
          // "url": "./resources/mappings.js",
          "type": "module",
          "import": "map_to_count"
        } ]
      },
      {
        id: "histogram_categories_relative",
        type: "histogram_categories",
        title: "Histogramm Kategorien in Prozent",
        mapping: [ "ccm.load", {
          "url": "https://ccmjs.github.io/mkaul-components/paper_generator/resources/mappings.js",
          // "url": "./resources/mappings.js",
          "type": "module",
          "import": "map_to_percent"
        } ]
      },
      {
        id: "histogram_absolute",
        type: "histogram",
        title: "Histogramm absolut",
        mapping: [ "ccm.load", {
          "url": "https://ccmjs.github.io/mkaul-components/paper_generator/resources/mappings.js",
          // "url": "./resources/mappings.js",
          "type": "module",
          "import": "map_to_count"
        } ]
      },
      {
        id: "histogram_relative",
        type: "histogram",
        title: "Histogramm in Prozent",
        mapping: [ "ccm.load", {
          "url": "https://ccmjs.github.io/mkaul-components/paper_generator/resources/mappings.js",
          // "url": "./resources/mappings.js",
          "type": "module",
          "import": "map_to_percent"
        } ]
      },
      {
        id: "delay_cat_sum",
        type: "delay_categories",
        title: "Summe aller Verzögerungen in Millisekunden (msec)",
        mapping: [ "ccm.load", {
          "url": "https://ccmjs.github.io/mkaul-components/paper_generator/resources/mappings.js",
          // "url": "./resources/mappings.js",
          "type": "module",
          "import": "map_to_cat_sum"
        } ]
      },
      {
        id: "delay_cat_avg",
        type: "delay_categories",
        title: "Durchschnitt aller Verzögerungen in Millisekunden (msec) ",
        mapping: [ "ccm.load", {
          "url": "https://ccmjs.github.io/mkaul-components/paper_generator/resources/mappings.js",
          // "url": "./resources/mappings.js",
          "type": "module",
          "import": "map_to_cat_avg"
        } ]
      },
      {
        id: "delay_cat_max",
        type: "delay_categories",
        title: "Maximum aller Verzögerungen in Millisekunden (msec)",
        mapping: [ "ccm.load", {
          "url": "https://ccmjs.github.io/mkaul-components/paper_generator/resources/mappings.js",
          // "url": "./resources/mappings.js",
          "type": "module",
          "import": "map_to_cat_max"
        } ]
      },
      {
        id: "delay_cat_min",
        type: "delay_categories",
        title: "Minimum aller Verzögerungen in Millisekunden (msec)",
        mapping: [ "ccm.load", {
          "url": "https://ccmjs.github.io/mkaul-components/paper_generator/resources/mappings.js",
          // "url": "./resources/mappings.js",
          "type": "module",
          "import": "map_to_cat_min"
        } ]
      },
      {
        id: "delay_sum",
        type: "delays",
        title: "Summe aller Verzögerungen in Millisekunden (msec)",
        mapping: [ "ccm.load", {
          "url": "https://ccmjs.github.io/mkaul-components/paper_generator/resources/mappings.js",
          // "url": "./resources/mappings.js",
          "type": "module",
          "import": "map_to_sum"
        } ]
      },
      {
        id: "delay_avg",
        type: "delays",
        title: "Durchschnitt aller Verzögerungen in Millisekunden (msec)",
        mapping: [ "ccm.load", {
          "url": "https://ccmjs.github.io/mkaul-components/paper_generator/resources/mappings.js",
          // "url": "./resources/mappings.js",
          "type": "module",
          "import": "map_to_avg"
        } ]
      },
      {
        id: "delay_max",
        type: "delays",
        title: "Maximum aller Verzögerungen in Millisekunden (msec)",
        mapping: [ "ccm.load", {
          "url": "https://ccmjs.github.io/mkaul-components/paper_generator/resources/mappings.js",
          // "url": "./resources/mappings.js",
          "type": "module",
          "import": "map_to_max"
        } ]
      },
      {
        id: "delay_min",
        type: "delays",
        title: "Minimum aller Verzögerungen in Millisekunden (msec)",
        mapping: [ "ccm.load", {
          "url": "https://ccmjs.github.io/mkaul-components/paper_generator/resources/mappings.js",
          // "url": "./resources/mappings.js",
          "type": "module",
          "import": "map_to_min"
        } ]
      }
    ],

    html: {

      header: {
        inner: [
          { tag: 'h1', inner: '%title%' },
          { tag: 'h2', inner: '%subtitle%' },
          { tag: 'p', inner: '<em>%author%</em><br>%address%<br>%email%' }
        ]
      },

      main: {
        inner: [
          {
            id: 'welcome',
            inner: [
              { tag: 'h1', inner: 'Umfrage zum agilen Wertesystem'},
              { tag: 'p', inner: 'Die Industrie ist heute zwiegespalten und setzt in Softwareprojekten zur Hälfte agile Methoden und zur anderen Hälfte herkömmliche Methoden ein (Wasserfall). Daher stellt sich die Frage nach der Ursache. Mit dieser Umfrage soll empirisch untersucht werden, ob dies am agilen Wertesystem liegt: Werden die agilen Werte von einer Mehrheit getragen? Überwiegt eine konventionelle oder eine agile Ethik?' },
              { tag: 'button', id: 'start_survey', inner: 'An der Umfrage teilnehmen!<sup>(*)</sup>', onclick: '%start_survey%' },
              { tag: 'p', inner: '<sup>(*)</sup><em>Nach der Teilnahme erhalten Sie Zugriff auf die Auswertung der Umfrage.</em>' }
            ]
          },
          {
            id: 'survey',
            inner: [
              { tag: 'h1', inner: 'Umfrage zum agilen Wertesystem' },
              { id: 'ccm_poll' },
              { tag: 'button', id: 'start_result', inner: 'Weiter zum Ergebnis der Umfrage', onclick: '%start_result%' }
            ]
          },
          {
            id: 'result',
            inner: [
              { tag: 'h1', inner: 'Vielen Dank für Ihre Teilnahme.<br>Ihr persönliches Ergebnis:<br> Sie sind zu <span class="agile_percentage">x</span>% agil.' },
              { id: 'poll_result' },
              { tag: 'button', id: 'start_paper', inner: 'Weiter zum Artikel über die bisherigen Ergebnisse der Umfrage', onclick: '%start_paper%' },
            ]
          },
          {
            id: 'paper_frame'
          }
        ]
      }
    },

    survey: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/fast_poll/versions/ccm.fast_poll-4.0.0.js" ],

    plotter: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/plotly/versions/ccm.plotly-1.1.0.js" ],

    lit_html: [ "ccm.load", { url: "https://unpkg.com/lit-html?module", type: "module" } ],

    microservice: 'https://kaul.inf.h-brs.de/data/2018/prosem/server.php',

    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/paper_generator/resources/default.css' ],

    inner: '<img class="logo" src="https://ccmjs.github.io/mkaul-components/paper_generator/resources/img/h-brs-white.svg" width="85vw"><!-- https://www.h-brs.de/files/related/cd_leitfaden_hbrs_2014.pdf --><div id="paper"><header class="paper"><h1>Agile Werte</h1><h2>Eine empirische Studie</h2><p><em>Manfred Kaul</em><br>Hochschule Bonn-Rhein-Sieg<br>Manfred.Kaul[at]h-brs.de</p></header><article id="main"><section class="abstract"><b>Abstract.</b> Die agile Bewegung begann mit dem <a target="_blank" href="http://agilemanifesto.org/iso/de/manifesto.html" rel="noopener">agilen Manifest</a> <a href="#beck_2001">[1]</a> für <a target="_blank" href="https://de.wikipedia.org/wiki/Agile_Softwareentwicklung" rel="noopener">agile Softwareentwicklung</a>, welches erfolgreich für eine Abkehr von herkömmlichen Methoden warb, die von Praktikern als zu bürokratisch empfunden wurden. Die Industrie ist heute zwiegespalten und setzt in Softwareprojekten zur Hälfte agile Methoden und zur anderen Hälfte herkömmliche Methoden ein. Daher stellt sich die Frage nach der Ursache. In diesem Artikel wird empirisch untersucht, ob dies am agilen Wertesystem liegt: Werden die agilen Werte von einer Mehrheit getragen? Überwiegt die konventionelle oder die agile Ethik?</section><section class="keywords"><b>Keywords:</b> Agile Methoden, Agile Werte, Empirische Studie</section><div id="gliederung"><u>Gliederung</u></div><ul class="none-style"><li><a href="#einfuehrung">1. Einführung</a></li><li><a href="#methode">2. Methode</a></li><li><a href="#experiment">3. Experiment</a></li><li><a href="#resultate">4. Resultate</a></li><li><a href="#diskussion">5. Diskussion</a></li><li><a href="#literatur">Literatur</a></li></ul><h2 id="einfuehrung">1. Einführung</h2><section><p>Die agile Bewegung begann mit dem <a href="http://agilemanifesto.org/iso/de/manifesto.html"></a>agilen Manifest <a href="#beck_2001">[1]</a> für <a target="_blank" href="https://de.wikipedia.org/wiki/Agile_Softwareentwicklung" rel="noopener">agile Softwareentwicklung</a>.</p><figure><img src="https://ccmjs.github.io/mkaul-components/paper_generator/resources/img/manifest.png"><figcaption>Manifest für agiles Softwareentwicklung, Quelle: <a href="#beck_2001">[1]</a></figcaption></figure><p>Ausgangspunkt war die Feststellung, <em>was</em> den Praktikern <a href="https://en.wikipedia.org/wiki/Kent_Beck">Kent Beck</a> et. al., die hier zusammengekommen waren, wichtiger war als die herkömmlichen Ansätze. Damit wurde ein <a target="_blank" href="https://de.wikipedia.org/wiki/Wertvorstellung" rel="noopener">Wertesystem</a> definiert, das als Grundlage der agilen Bewegung diente, die sich rasch auch in anderen Fachgebieten durchgesetzt hat <a href="#scheller_2017">[2]</a>. Beispielsweise hat Gunter Dueck in <a href="#dueck_2016">[3]</a> das agile Wertesystem auf den Bildungsbetrieb wie folgt übertragen:</p><figure><div class="cite center"><h4>Manifest für Agile Erziehung</h4><p>Wir erschließen bessere Wege, Menschen zu entwickeln, indem wir es selbst tun und anderen dabei helfen. Während dieser Tätigkeit haben wir diese Werte zu schätzen gelernt:</p><ul class="left"><li>Individuelle Menschenentwicklung über Versetzung nach Standardstufen und Klassen</li><li>Aktivierung von Selbstwirksamkeitsgefühl über Prüfungs- und Zeugnisdokumentation</li><li>Folgen von gewecktem Interesse über Befolgung von Lehrplänen</li><li>Zukunftsfähigkeit der Bildung über Bewahren klassischer Vorstellungen</li></ul><p>Das heißt, obwohl wir die Werte auf der rechten Seite wichtig finden, schätzen wir die Werte auf der linken Seite höher ein.</p></div><figcaption>Manifest für agile Erziehung. Quelle: <a href="#dueck_2016">[3]</a></figcaption></figure><p>Wertesysteme sind in einer pluralistischen Gesellschaft subjektiv. Wissenschaft ist objektiv und wertefrei. D.h. in der Wissenschaft werden objektive Erkenntnisse erarbeitet unabhängig von Wertesystemen. Daher kann nicht wissenschaftlich untersucht werden, ob das eine oder das andere Wertesystem objektiv richtig ist.</p><figure><img src="https://ccmjs.github.io/mkaul-components/paper_generator/resources/img/ethik.svg"><figcaption>Wissenschaft, Engineering und Werte</figcaption></figure><p>Wertesysteme gehören im Wissenschaftsgebäude zum Fachgebiet der Philosophie. Man unterscheidet zwischen praktischer und theoretischer Philosophie. Die praktische Philosophie nennt man auch Ethik. Ethik beschäftigt sich grundsätzlich mit der philosophischen Frage "Was soll ich tun?" und zeigt, wie Wertesysteme als Richtungsweiser für richtiges Entscheiden und Handeln eingesetzt werden können. Agile Softwareentwicklung wirbt für eine Abkehr von herkömmlichen Methoden, die von Praktikern als zu bürokratisch empfunden werden. Das agile Wertesystem ist ein Richtungsweiser für agiles Entscheiden und Handeln in der Softwareentwicklung.</p><p>Die agile Bewegung war zunächst gestartet als Neuorientierung für Softwareentwickler. Schnell haben Manager den Nutzen für das Projektmanagement verstanden und das Wertesystem auf Management-Herausforderungen angewandt. Auf der Grundlage des gemeinsamen agilen Wertesystems sind verschiedene agile Projektmanagement-Methodologien entstanden. Die wichtigsten sind <a href="#burger_2017">[4]</a> und <a href="#reifer_2017">[5]</a>:</p><ul><li>Scrum<li>Lean Development<li>Kanban<li>XP - Extreme Programming<li>FDD - Feature-Driven Development<li>Adaptive Software Development (ASD)<li>Crystal Dynamic Systems Development Method (DSDM)<li>AUP – Agile Unified Process<li>A-Scale – Agile at scale methods<li>Hybrid – Mix of methods</ul><p>Dabei ist Scrum die populärste Methodologie in kleinen und mittleren Projekten, siehe Abb. 4:</p><figure><img src="https://ccmjs.github.io/mkaul-components/paper_generator/resources/img/scrum.png"><figcaption>Scrum ist die populärste agile Methodologie in kleinen und mittleren Projekten, während Hybrid in großen Projekten vorherrscht (Quelle: <a href="#reifer_2017">[5]</a>)</figcaption></figure><p>Die Industrie ist heute zwiegespalten und setzt in Softwareprojekten zur Hälfte agile Methoden und zur anderen Hälfte herkömmliche Methoden ein. Daher stellt sich die Frage nach der Ursache.</p><p>In der agilen Bewegung ist das Wertesystem die Grundlage und Prinzipien, Methoden, Praktiken bauen darauf auf, siehe Abb. 5:</p><figure><img src="https://ccmjs.github.io/mkaul-components/paper_generator/resources/img/werte.png"><figcaption>Werte als Grundlage agiler Prinzipien und Praktiken</figcaption></figure><p>Mit dem agilen Manifest wurde der Grundstein gelegt für agile Werte, auf denen wiederum die Prinzipien, Methoden und Praktiken aufbauen. Wenn wir also nach den grundlegenden Ursachen forschen wollen, müssen wir nach den Werten fragen. Dies ist der Forschungsansatz des vorliegenden Aufsatzes.</p></section><h2 id="methode">2. Methode</h2><section><p>Die Forschungsfrage ist, ob die agilen Werte von einer Mehrheit getragen werden. Überwiegen die konventionellen oder die agilen Werte? Diese Frage soll mit einer Online-Umfrage beantwortet werden. Dabei ist sicher zu stellen, dass die Online-Umfrage möglichst objektiv, zuverlässig und valide ist, siehe<a href="#doering_2016">[6]</a>. </p></section><h3>2.1. Gütekriterien für Online-Umfragen</h3><section><p>Die wichtigsten Gütekriterien für Online-Umfragen sind Objektivität, Reliabilität, Validität. Dabei kann man bei der Objektivität zwischen Durchführungs-, Auswertungs- und Interpretationsobjektivität unterscheiden, siehe<a href="#doering_2016">[6]</a>,<a href="#appinio_2018">[7]</a>,<a href="#ROGATOR_2018">[8]</a>,<a href="#niklas_2014">[9]</a>.</p></section><h3>2.X. Messung von Zeitspannen von Zögern, Denkzeiten, Verzögerungen und anderen Hemmungen bei der Entscheidungsfindung</h3><section><p>Oftmals sind spontane Entscheidungen andere als wohl überlegte. Harari berichtet in <a href="#harari_2018">[10]</a> von Ethik-Diskussionen zu autononem Systemen, zu denen spontan ganz andere Entscheidungen erfolgen als nach gründlichem Überlegen und diskutieren. Bei selbstfahrenden Autos war die Mehrheit dafür, die Bord-Insassen zu opfern, wenn dadurch das Leben von mehr Menschen auf der Straße gerettet werden könnte. Andererseits würde keiner der Befragten ein Auto kaufen, das so programmiert ist.</p><p>Die Zeitspannen ergeben neben dem Zählen der Antworten zusätzliche wichtige Informationen:</p><ul><li>Wie lange wird für eine Entscheidung benötigt?</li><li>Bei welchen Wahlmöglichkeiten gibt es am meisten Denkpausen, Zögern und Zweifel?</li><li>Bei welchen Wahlmöglichkeiten muss der Proband am längsten überlegen?</li><li>Wo werden am häufigsten Denkpausen eingelegt?</li></ul><p>Die Methode der Umfrage speichert nicht nur die gegebenen Antworten, sondern auch die Zeitspanne, die für jede Entscheidung gebraucht wurde.</p></section><h2 id="experiment">3. Experiment</h2><section><p>Der Fragebogen wurde am 21.10.2018 ins Internet gestellt mit der folgender Einladung:</p><p class="cite">Die Industrie ist heute zwiegespalten und setzt in Softwareprojekten zur Hälfte agile Methoden und zur anderen Hälfte herkömmliche Methoden ein (Wasserfall). Daher stellt sich die Frage nach der Ursache. Mit dieser Umfrage soll empirisch untersucht werden, ob dies am agilen Wertesystem liegt: Werden die agilen Werte von einer Mehrheit getragen? Überwiegt eine konventionelle oder eine agile Ethik?</p><p>Darunter wurde mit einem Button zur Teilnahme an der Umfrage eingeladen:</p><div class="cite center"><button>An der Umfrage teilnehmen!<sup>(*)</sup></button><p><sup>(*)</sup><em>Nach der Teilnahme erhalten Sie Zugriff auf die Auswertung der Umfrage.</em></p></div><p>Folgende Auswahlmöglichkeiten wurden aus den Quellen <a href="#beck_2001">[1]</a>, <a href="#dueck_2016">[3]</a> und <a href="#diehl_2018">[11]</a> hergeleitet und in der Umfrage abgefragt:</p><figure><div id="questions" class="cite"></div><figcaption>Liste der Auswahlmöglichkeiten in der Umfrage</figcaption></figure><p>Dabei wurde die Reihenfolge der Auswahlgruppen und der einzelnen Auswahlmöglichkeiten randomisiert. Auf diese Weise können Durchklicker <a href="#niklas_2014">[9]</a> vermieden oder zumindest als solche erkannt werden.</p></section><h2 id="resultate">4. Resultate</h2><section><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p><h3>4.1. Verteilung der Ergebnisse</h3><p>Die Umfrage wurde <span class="count_participants"></span>-mal bis zu Ende durchgeführt. Die Verteilung der Ergebnisse ergibt sich aus folgendem Diagramm:</p><figure><div id="distribution" class="plot"></div><figcaption>Verteilung der Ergebnisse</figcaption></figure><h3>4.1. Histogramme für Antwortkategorien</h3><p>Wie häufig wurden die verschiedenen Antwortkategorien ausgewählt?</p><figure><div id="histogram_categories_absolute" class="plot"></div><figcaption>Häufigkeiten der Antwortkategorien in absoluten Zahlen</figcaption></figure><figure><div id="histogram_categories_relative" class="plot"></div><figcaption>Häufigkeiten der Antwortkategorien in Prozent</figcaption></figure><h3>4.2. Histogramme für konkrete Antworten</h3><p>Wie häufig wurden die verschiedenen Antwortmöglichkeiten ausgewählt?</p><figure><div id="histogram_absolute" class="plot"></div><figcaption>Häufigkeiten der Antworten je Auswahl in absoluten Zahlen</figcaption></figure><figure><div id="histogram_relative" class="plot"></div><figcaption>Häufigkeiten der Antworten je Auswahl in Prozent</figcaption></figure><h3>4.3. Messung der Verzögerungen bei den Kategorien</h3><p>Wie lange benötigten die Probanden, um sich für die eine oder andere Antwortkategorie zu entscheiden?</p><figure><div id="delay_cat_sum" class="plot"></div><figcaption>Summe der Verzögerungen bei den Kategorien</figcaption></figure><figure><div id="delay_cat_avg" class="plot"></div><figcaption>Durchschnitt der Verzögerungen bei den Kategorien</figcaption></figure><figure><div id="delay_cat_max" class="plot"></div><figcaption>Maximum der Verzögerungen bei den Kategorien</figcaption></figure><figure><div id="delay_cat_min" class="plot"></div><figcaption>Minimum der Verzögerungen bei den Kategorien</figcaption></figure><h3>4.4. Messung der Verzögerungen bei der Auswahl der konkreten Antwort</h3><p>Wie lange benötigten die Probanden, um sich für die eine oder andere Wahl der konkreten Antwort zu entscheiden?</p><figure><div id="delay_sum" class="plot"></div><figcaption>Summe der Verzögerungen aller Fragebögen bei der Auswahl der konkreten Antwort</figcaption></figure><figure><div id="delay_avg" class="plot"></div><figcaption>Durchschnitt der Verzögerungen aller Fragebögen bei der Auswahl der konkreten Antwort</figcaption></figure><figure><div id="delay_max" class="plot"></div><figcaption>Maximum der Verzögerungen aller Fragebögen bei der Auswahl der konkreten Antwort</figcaption></figure><figure><div id="delay_min" class="plot"></div><figcaption>Minimum der Verzögerungen aller Fragebögen bei der Auswahl der konkreten Antwort</figcaption></figure><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p></section><h2 id="diskussion">5. Diskussion</h2><section><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p></section><h2 id="literatur">Literatur</h2><section><ol><li id="beck_2001">Beck, K. (2001): Manifest für Agile Softwareentwicklung, <a href="http://agilemanifesto.org/iso/de/manifesto.html">http://agilemanifesto.org/iso/de/manifesto.html</a>, seit 2001, zuletzt zugegriffen am 04.10.2018.</li><li id="scheller_2017">Scheller, T. (2017). Auf dem Weg zur agilen Organisation: Wie Sie Ihr Unternehmen dynamischer, flexibler und leistungsfähiger gestalten. Vahlen, 29.06.2017 - 572 Seiten. <a href="https://books.google.de/books?id=ykEqDwAAQBAJ&dq">https://books.google.de/books?id=ykEqDwAAQBAJ&dq</a>.</li><li id="dueck_2016">Dueck, G. (2016): Agile Erziehung oder The Agile Education Manifesto (Daily Dueck 256, Januar 2016), abgerufen unter <a href="http://www.omnisophie.com/dd256-agile-erziehung-oder-the-agile-education-manifesto-januar-2016/">http://www.omnisophie.com/dd256-agile-erziehung-oder-the-agile-education-manifesto-januar-2016/</a> am 29.1.2017.</li><li id="burger_2017">Burger, R. (2017). 15 Incredible Agile Project Management Statistics for 2018. veröffentlicht am 19.10.2017. zuletzt abgerufen am 16.8.2018 unter <a target="_blank" href="https://blog.capterra.com/agile-project-management-statistics-for-2018/" rel="noopener">https://blog.capterra.com/agile-project-management-statistics-for-2018/</a>.</li><li id="reifer_2017">Reifer, D.J., et. al. (2017). Quantitative Analysis of Agile Methods Study: Twelve Major Findings.</li><li id="doering_2016">Döring, N.; Bortz, J. (2016). Forschungsmethoden und Evaluation in den Sozial- und Humanwissenschaften; <a target="_blank" href="https://link.springer.com/bookseries/1183" rel="noopener">Springer-Lehrbuch</a> book series (SLB); <a target="_blank" href="https://link.springer.com/book/10.1007/978-3-642-41089-5" rel="noopener">Springer-Link</a>;  Springer-Verlag; Berlin Heidelberg; DOI https://doi.org/10.1007/978-3-642-41089-5; Online ISBN 978-3-642-41089-5.</li><li id="appinio_2018">appinio (2018). Qualitätskriterien eines Fragebogens in der Marktforschung; <a target="_blank" href="https://www.appinio.com/de/guetekriterien-marktforschung" rel="noopener">https://www.appinio.com/de/guetekriterien-marktforschung</a>, zuletzt abgerufen am 21.10.2018.</li><li id="ROGATOR_2018">ROGATOR (2017). Fragebogengüte beim Fragebogen erstellen: was ist zu beachten?; <a target="_blank" href="https://www.rogator.de/fragebogenguete-beim-fragebogen-erstellen-ist-zu-beachten/" rel="noopener"> https://www.rogator.de/fragebogenguete-beim-fragebogen-erstellen-ist-zu-beachten/ </a>; erstellt am 29.05.2017; zuletzt abgerufen am 21.10.2018.</li><li id="niklas_2014">Niklas, S. (2014). Onlineforschung: Antworttendenzen, Durchklicker und Kontrollfragen; Usabilityblog; <a target="_blank" href="https://www.usabilityblog.de/onlineforschung-antworttendenzen-durchklicker-und-kontrollfragen/" rel="noopener"> www.usabilityblog.de/onlineforschung-antworttendenzen-durchklicker-und-kontrollfragen/ </a>; erstellt am 7.11.2014; zuletzt abgerufen am 21.10.2018.</li><li id="harari_2018">Harari, Y.N. (2018). 21 Lektionen für das 21. Jahrhundert; Verlag: C.H.Beck; ISBN-13: 978-3406727788.</li><li id="diehl_2018">Diehl, A. (2018). Das Agile Manifest – Leitsätze und Werte agiler Teams; Blog "Digitale Neue Ordnung (DNO)"; <a target="_blank" href="https://digitaleneuordnung.de/blog/agiles-manifest-fuer-unternehmensentwicklung/" rel="noopener"> digitaleneuordnung.de/blog/agiles-manifest-fuer-unternehmensentwicklung/ </a>; zuletzt abgerufen am 27.10.2018.</li></ol></section><hr class="finish"><div class="license"><a target="_blank" href="https://kaul.inf.h-brs.de/" rel="noopener"> Manfred Kaul </a>, <a target="_blank" href="https://opensource.org/licenses/MIT" rel="noopener"> MIT-Lizenz </a>, 2018.</div></article></div>'
  },

  "agile_load_inner": {
    key: "agile_load_inner",

    // optional configuration if there is no header in the inner html:
    author: 'Manfred Kaul',
    address: 'Hochschule Bonn-Rhein-Sieg',
    email: 'Manfred.Kaul[at]h-brs.de',
    title: 'Agile Werte',
    subtitle: 'Eine empirische Studie',

    questions: [
      // { man: "männlich", woman: "weiblich", other: "divers" },
      // { young: "Alter: 18-25", middle: "Alter: 26-30", older: "Alter: 31-40", old: "älter" },

      // Manifest // http://agilemanifesto.org/iso/de/manifesto.html
      {agil: 'Individuen und Interaktionen', plan: 'Prozesse und Werkzeuge'},
      {agil: 'Funktionierende Software', plan: 'Umfassende Dokumentation'},
      {agil: 'Zusammenarbeit mit dem Kunden', plan: 'Vertragsverhandlung'},
      {agil: 'Reagieren auf Veränderung', plan: 'Befolgen eines Plans'},

      // Gunter Dueck
      {agil: "Individuelle Menschenentwicklung", plan: "Versetzung nach Standardstufen und Klassen"},
      {agil: "Aktivierung von Selbstwirksamkeitsgefühl", plan: "Prüfungs- und Zeugnisdokumentation"},
      {agil: "Folgen von gewecktem Interesse", plan: "Befolgung von Lehrplänen"},
      {agil: "Zukunftsfähigkeit der Bildung", plan: "Bewahren klassischer Vorstellungen"},

      // https://digitaleneuordnung.de/blog/agiles-manifest-fuer-unternehmensentwicklung/
      {agil: "Konkrete Leistung mit Mehrwert", plan: "gute Präsentation mit Powerpoint"},
      {agil: "(persönliche) Beziehung", plan: "Wasserdichter Vertrag"},
      {agil: "sich an neue Herausforderungen anpassen können", plan: "einen festen Plan haben"}

    ],

    randomize: {
      row: true,
      column: true
    },

    figures: [
      {
        id: "histogram_categories_absolute",
        type: "histogram_categories",
        title: "Histogramm Kategorien absolut",
        mapping: arg => arg.count
      },
      {
        id: "histogram_categories_relative",
        type: "histogram_categories",
        title: "Histogramm Kategorien in Prozent",
        mapping: arg => 100 * arg.count / arg.sum_categories
      },
      {
        id: "histogram_absolute",
        type: "histogram",
        title: "Histogramm absolut",
        mapping: arg => arg.count
      },
      {
        id: "histogram_relative",
        type: "histogram",
        title: "Histogramm in Prozent",
        mapping: arg => 100 * arg.count / arg.count_participants
      },
      {
        id: "delay_cat_sum",
        type: "delay_categories",
        title: "Summe aller Verzögerungen in Millisekunden (msec)",
        mapping: arg => arg.delay_sums[arg.result.categories[arg.i]] += (arg.result.timer[arg.i]-arg.result.timer[arg.i-1])
      },
      {
        id: "delay_cat_avg",
        type: "delay_categories",
        title: "Durchschnitt aller Verzögerungen in Millisekunden (msec) ",
        mapping: arg => arg.delay_sums[arg.result.categories[arg.i]] += (arg.result.timer[arg.i]-arg.result.timer[arg.i-1]) / arg.category_counters[arg.result.categories[arg.i]]
      },
      {
        id: "delay_cat_max",
        type: "delay_categories",
        title: "Maximum aller Verzögerungen in Millisekunden (msec)",
        mapping: arg => arg.delay_sums[arg.result.categories[arg.i]] = Math.max( arg.delay_sums[ arg.result.categories[arg.i] ], ( arg.result.timer[arg.i] - arg.result.timer[arg.i-1] ) )
      },
      {
        id: "delay_cat_min",
        type: "delay_categories",
        title: "Minimum aller Verzögerungen in Millisekunden (msec)",
        mapping: arg => {
          // avoid 0 as minimum
          if ( arg.delay_sums[arg.result.categories[arg.i]] === 0 ) arg.delay_sums[arg.result.categories[arg.i]] = arg.result.timer[arg.i] - arg.result.timer[arg.i-1];
          arg.delay_sums[arg.result.categories[arg.i]] = Math.min( arg.delay_sums[ arg.result.categories[arg.i] ], ( arg.result.timer[arg.i] - arg.result.timer[arg.i-1] ) );
        }
      },
      {
        id: "delay_sum",
        type: "delays",
        title: "Summe aller Verzögerungen in Millisekunden (msec)",
        mapping: arg =>
          arg.delay_sums[arg.i][arg.result.categories[arg.i]] += (arg.result.timer[arg.i]-arg.result.timer[arg.i-1])
      },
      {
        id: "delay_avg",
        type: "delays",
        title: "Durchschnitt aller Verzögerungen in Millisekunden (msec)",
        mapping: arg => arg.delay_sums[arg.i][arg.result.categories[arg.i]] += (arg.result.timer[arg.i]-arg.result.timer[arg.i-1]) / arg.flat_counters[arg.result.categories[arg.i]]
      },
      {
        id: "delay_max",
        type: "delays",
        title: "Maximum aller Verzögerungen in Millisekunden (msec)",
        mapping: arg => arg.delay_sums[arg.i][arg.result.categories[arg.i]] = Math.max( arg.delay_sums[arg.i][ arg.result.categories[arg.i] ], ( arg.result.timer[arg.i] - arg.result.timer[arg.i-1] ) )
      },
      {
        id: "delay_min",
        type: "delays",
        title: "Minimum aller Verzögerungen in Millisekunden (msec)",
        mapping: arg => {
          // avoid 0 as minimum
          if ( arg.delay_sums[arg.i][arg.result.categories[arg.i]] === 0 ) arg.delay_sums[arg.i][arg.result.categories[arg.i]] = arg.result.timer[arg.i] - arg.result.timer[arg.i-1];
          arg.delay_sums[arg.i][arg.result.categories[arg.i]] = Math.min( arg.delay_sums[arg.i][ arg.result.categories[arg.i] ], ( arg.result.timer[arg.i] - arg.result.timer[arg.i-1] ) );
        }
      }
    ],

    html: {

      header: {
        inner: [
          { tag: 'h1', inner: '%title%' },
          { tag: 'h2', inner: '%subtitle%' },
          { tag: 'p', inner: '<em>%author%</em><br>%address%<br>%email%' }
        ]
      },

      main: {
        inner: [
          {
            id: 'welcome',
            inner: [
              { tag: 'h1', inner: 'Umfrage zum agilen Wertesystem'},
              { tag: 'p', inner: 'Die Industrie ist heute zwiegespalten und setzt in Softwareprojekten zur Hälfte agile Methoden und zur anderen Hälfte herkömmliche Methoden ein (Wasserfall). Daher stellt sich die Frage nach der Ursache. Mit dieser Umfrage soll empirisch untersucht werden, ob dies am agilen Wertesystem liegt: Werden die agilen Werte von einer Mehrheit getragen? Überwiegt eine konventionelle oder eine agile Ethik?' },
              { tag: 'button', id: 'start_survey', inner: 'An der Umfrage teilnehmen!<sup>(*)</sup>', onclick: '%start_survey%' },
              { tag: 'p', inner: '<sup>(*)</sup><em>Nach der Teilnahme erhalten Sie Zugriff auf die Auswertung der Umfrage.</em>' }
            ]
          },
          {
            id: 'survey',
            inner: [
              { tag: 'h1', inner: 'Umfrage zum agilen Wertesystem' },
              { id: 'ccm_poll' },
              { tag: 'button', id: 'start_result', inner: 'Weiter zum Ergebnis der Umfrage', onclick: '%start_result%' }
            ]
          },
          {
            id: 'result',
            inner: [
              { tag: 'h1', inner: 'Vielen Dank für Ihre Teilnahme.<br>Ihr persönliches Ergebnis:<br> Sie sind zu <span class="agile_percentage">x</span>% agil.' },
              { id: 'poll_result' },
              { tag: 'button', id: 'start_paper', inner: 'Weiter zum Artikel über die bisherigen Ergebnisse der Umfrage', onclick: '%start_paper%' },
            ]
          },
          {
            id: 'paper_frame'
          }
        ]
      }
    },

    survey: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/fast_poll/versions/ccm.fast_poll-4.0.0.js" ],

    plotter: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/plotly/versions/ccm.plotly-1.1.0.js" ],

    lit_html: [ "ccm.load", { url: "https://unpkg.com/lit-html?module", type: "module" } ],

    microservice: 'https://kaul.inf.h-brs.de/data/2018/prosem/server.php',

    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/paper_generator/resources/default.css' ],

    inner: [ 'ccm.load', 'https://ccmjs.github.io/mkaul-components/paper_generator/resources/agile-paper.html' ]
  },

  "agile_separat": {
    key: "agile_separat",

    // optional configuration if there is no header in the inner html:
    author: 'Manfred Kaul',
    address: 'Hochschule Bonn-Rhein-Sieg',
    email: 'Manfred.Kaul[at]h-brs.de',
    title: 'Agile Werte',
    subtitle: 'Eine empirische Studie',

    questions: [
      // { man: "männlich", woman: "weiblich", other: "divers" },
      // { young: "Alter: 18-25", middle: "Alter: 26-30", older: "Alter: 31-40", old: "älter" },

      // Manifest // http://agilemanifesto.org/iso/de/manifesto.html
      {agil: 'Individuen und Interaktionen', plan: 'Prozesse und Werkzeuge'},
      {agil: 'Funktionierende Software', plan: 'Umfassende Dokumentation'},
      {agil: 'Zusammenarbeit mit dem Kunden', plan: 'Vertragsverhandlung'},
      {agil: 'Reagieren auf Veränderung', plan: 'Befolgen eines Plans'},

      // Gunter Dueck
      {agil: "Individuelle Menschenentwicklung", plan: "Versetzung nach Standardstufen und Klassen"},
      {agil: "Aktivierung von Selbstwirksamkeitsgefühl", plan: "Prüfungs- und Zeugnisdokumentation"},
      {agil: "Folgen von gewecktem Interesse", plan: "Befolgung von Lehrplänen"},
      {agil: "Zukunftsfähigkeit der Bildung", plan: "Bewahren klassischer Vorstellungen"},

      // https://digitaleneuordnung.de/blog/agiles-manifest-fuer-unternehmensentwicklung/
      {agil: "Konkrete Leistung mit Mehrwert", plan: "gute Präsentation mit Powerpoint"},
      {agil: "(persönliche) Beziehung", plan: "Wasserdichter Vertrag"},
      {agil: "sich an neue Herausforderungen anpassen können", plan: "einen festen Plan haben"}

    ],

    randomize: {
      row: true,
      column: true
    },

    figures: [
      {
        id: "histogram_categories_absolute",
        type: "histogram_categories",
        title: "Histogramm Kategorien absolut",
        mapping: arg => arg.count
      },
      {
        id: "histogram_categories_relative",
        type: "histogram_categories",
        title: "Histogramm Kategorien in Prozent",
        mapping: arg => 100 * arg.count / arg.sum_categories
      },
      {
        id: "histogram_absolute",
        type: "histogram",
        title: "Histogramm absolut",
        mapping: arg => arg.count
      },
      {
        id: "histogram_relative",
        type: "histogram",
        title: "Histogramm in Prozent",
        mapping: arg => 100 * arg.count / arg.count_participants
      },
      {
        id: "delay_cat_sum",
        type: "delay_categories",
        title: "Summe aller Verzögerungen in Millisekunden (msec)",
        mapping: arg => arg.delay_sums[arg.result.categories[arg.i]] += (arg.result.timer[arg.i]-arg.result.timer[arg.i-1])
      },
      {
        id: "delay_cat_avg",
        type: "delay_categories",
        title: "Durchschnitt aller Verzögerungen in Millisekunden (msec) ",
        mapping: arg => arg.delay_sums[arg.result.categories[arg.i]] += (arg.result.timer[arg.i]-arg.result.timer[arg.i-1]) / arg.category_counters[arg.result.categories[arg.i]]
      },
      {
        id: "delay_cat_max",
        type: "delay_categories",
        title: "Maximum aller Verzögerungen in Millisekunden (msec)",
        mapping: arg => arg.delay_sums[arg.result.categories[arg.i]] = Math.max( arg.delay_sums[ arg.result.categories[arg.i] ], ( arg.result.timer[arg.i] - arg.result.timer[arg.i-1] ) )
      },
      {
        id: "delay_cat_min",
        type: "delay_categories",
        title: "Minimum aller Verzögerungen in Millisekunden (msec)",
        mapping: arg => {
          // avoid 0 as minimum
          if ( arg.delay_sums[arg.result.categories[arg.i]] === 0 ) arg.delay_sums[arg.result.categories[arg.i]] = arg.result.timer[arg.i] - arg.result.timer[arg.i-1];
          arg.delay_sums[arg.result.categories[arg.i]] = Math.min( arg.delay_sums[ arg.result.categories[arg.i] ], ( arg.result.timer[arg.i] - arg.result.timer[arg.i-1] ) );
        }
      },
      {
        id: "delay_sum",
        type: "delays",
        title: "Summe aller Verzögerungen in Millisekunden (msec)",
        mapping: arg =>
          arg.delay_sums[arg.i][arg.result.categories[arg.i]] += (arg.result.timer[arg.i]-arg.result.timer[arg.i-1])
      },
      {
        id: "delay_avg",
        type: "delays",
        title: "Durchschnitt aller Verzögerungen in Millisekunden (msec)",
        mapping: arg => arg.delay_sums[arg.i][arg.result.categories[arg.i]] += (arg.result.timer[arg.i]-arg.result.timer[arg.i-1]) / arg.flat_counters[arg.result.categories[arg.i]]
      },
      {
        id: "delay_max",
        type: "delays",
        title: "Maximum aller Verzögerungen in Millisekunden (msec)",
        mapping: arg => arg.delay_sums[arg.i][arg.result.categories[arg.i]] = Math.max( arg.delay_sums[arg.i][ arg.result.categories[arg.i] ], ( arg.result.timer[arg.i] - arg.result.timer[arg.i-1] ) )
      },
      {
        id: "delay_min",
        type: "delays",
        title: "Minimum aller Verzögerungen in Millisekunden (msec)",
        mapping: arg => {
          // avoid 0 as minimum
          if ( arg.delay_sums[arg.i][arg.result.categories[arg.i]] === 0 ) arg.delay_sums[arg.i][arg.result.categories[arg.i]] = arg.result.timer[arg.i] - arg.result.timer[arg.i-1];
          arg.delay_sums[arg.i][arg.result.categories[arg.i]] = Math.min( arg.delay_sums[arg.i][ arg.result.categories[arg.i] ], ( arg.result.timer[arg.i] - arg.result.timer[arg.i-1] ) );
        }
      }
    ],

    html: {

      header: {
        inner: [
          { tag: 'h1', inner: '%title%' },
          { tag: 'h2', inner: '%subtitle%' },
          { tag: 'p', inner: '<em>%author%</em><br>%address%<br>%email%' }
        ]
      },

      main: {
        inner: [
          {
            id: 'welcome',
            inner: [
              { tag: 'h1', inner: 'Umfrage zum agilen Wertesystem'},
              { tag: 'p', inner: 'Die Industrie ist heute zwiegespalten und setzt in Softwareprojekten zur Hälfte agile Methoden und zur anderen Hälfte herkömmliche Methoden ein (Wasserfall). Daher stellt sich die Frage nach der Ursache. Mit dieser Umfrage soll empirisch untersucht werden, ob dies am agilen Wertesystem liegt: Werden die agilen Werte von einer Mehrheit getragen? Überwiegt eine konventionelle oder eine agile Ethik?' },
              { tag: 'button', id: 'start_survey', inner: 'An der Umfrage teilnehmen!<sup>(*)</sup>', onclick: '%start_survey%' },
              { tag: 'p', inner: '<sup>(*)</sup><em>Nach der Teilnahme erhalten Sie Zugriff auf die Auswertung der Umfrage.</em>' }
            ]
          },
          {
            id: 'survey',
            inner: [
              { tag: 'h1', inner: 'Umfrage zum agilen Wertesystem' },
              { id: 'ccm_poll' },
              { tag: 'button', id: 'start_result', inner: 'Weiter zum Ergebnis der Umfrage', onclick: '%start_result%' }
            ]
          },
          {
            id: 'result',
            inner: [
              { tag: 'h1', inner: 'Vielen Dank für Ihre Teilnahme.<br>Ihr persönliches Ergebnis:<br> Sie sind zu <span class="agile_percentage">x</span>% agil.' },
              { id: 'poll_result' },
              { tag: 'button', id: 'start_paper', inner: 'Weiter zum Artikel über die bisherigen Ergebnisse der Umfrage', onclick: '%start_paper%' },
            ]
          },
          {
            id: 'paper_frame'
          }
        ]
      }
    },

    survey: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/fast_poll/versions/ccm.fast_poll-4.0.0.js" ],

    plotter: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/plotly/versions/ccm.plotly-1.1.0.js" ],

    lit_html: [ "ccm.load", { url: "https://unpkg.com/lit-html?module", type: "module" } ],

    microservice: 'https://kaul.inf.h-brs.de/data/2018/prosem/server.php',

    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/paper_generator/resources/default.css' ],

  },

  "localhost": {
    css: [ 'ccm.load',  '../paper_generator/resources/default.css' ],
    language: 'de',
    labels: {
      de: {
        intro: "Entscheiden Sie sich schnell, ohne lange nachzudenken:<br><b>Was ist Ihnen am wichtigsten:</b>",
        label: "Fertig!"
      }
    },
    onfinish: function( instance, results ){ console.log( results ); }
  }
};
