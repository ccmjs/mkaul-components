
/**
 * @overview configs of ccm component paper_generator
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "agile_values": {
    author: 'Manfred Kaul',
    address: 'Hochschule Bonn-Rhein-Sieg',
    email: 'Manfred.Kaul[at]h-brs.de',
    title: 'Agile Werte',
    subtitle: 'Eine empirische Studie',

    questions: [
      // ["männlich","weiblich","divers"],
      // ["Alter: 18-25", "Alter: 26-30", "Alter: 31-40", "Alter: 41-50", "jünger", "älter"],

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

    microservice: 'https://kaul.inf.h-brs.de/data/2018/prosem/server.php',

    html: {
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
            id: 'paper_frame',
            inner: '%lightDOM%'
          }
        ]
      }
    }
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
