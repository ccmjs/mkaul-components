/**
 * @overview configurations of ccm component
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "localhost": {
    css: [ 'ccm.load',  '../fast_poll/resources/default.css' ],
    labels: {
        intro: "Entscheiden Sie sich schnell, ohne lange nachzudenken:<br><b>Was ist Ihnen am wichtigsten:</b>",
        label: "Fertig!"
    },
    choices: [
      { A: 'A', B: 'B' },
      { A: 1, B: 2 },
    ],

    onfinish: async function( instance, results ){

      console.log( results );

    }

  },

  "minimal": {

    "key": "minimal",

    intro: "Minimal Example",
    outro: "Fertig!",

    choices: [
      { question: "Frage 1", A: 'Antwort 1a', B: 'Antwort 1b' },
      { question: "Frage 2", A: 'Antwort 2a', B: 'Antwort 2b', C: 'Antwort 2c' },
      { question: "Vielen Dank!" }
    ],

    randomize: {
      row: true,
      column: true
    },

    onfinish: function (instance, results) {
      console.log(results);
    }
  },

  "questions_answers": {

    "key": "questions_answers",

    intro: "Statt eines Quiz mit Radio-Buttons geht auch ein Fast Poll:",
    outro: "Fertig!",

    questions: [
      'Frage 1',
      'Frage 2',
      'Frage 3',
      'Frage 4',
      'Frage 5',
      'Vielen Dank!'
    ],

    choices: [
      { A: 'Antwort 1a', B: 'Antwort 1b' },
      { A: 'Antwort 2a', B: 'Antwort 2b', C: 'Antwort 2c' },
      { A: 'Nur eine Antwort' },
      { A: 1, B: 2, C: 3  },
      { A: 1, B: 2, C: 3, D: 4 },
      { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6 }
    ],

    randomize: {
      row: true,
      column: true
    },

    onfinish: function (instance, results) {
      console.log(results);
    }
  },

  "agile_manifesto": {

    "key": "agile_manifesto",


    intro: "Entscheiden Sie sich schnell, ohne lange nachzudenken:<br><b>Was ist Ihnen am wichtigsten:</b>",
    outro: "Fertig!",

    questions: [
      "Frage zur ersten Auswahl",
      "Frage zur zweiten Auswahl",
      "Frage zur dritten Auswahl",
      "Frage zur vierten Auswahl"
    ],

    choices: [// http://agilemanifesto.org/iso/de/manifesto.html
        {agil: 'Individuen und Interaktionen', plan: 'Prozesse und Werkzeuge'},
        {agil: 'Funktionierende Software', plan: 'umfassende Dokumentation'},
        {agil: 'Zusammenarbeit mit dem Kunden', plan: 'Vertragsverhandlung'},
        {agil: 'Reagieren auf Veränderung', plan: 'Befolgen eines Plans'}
    ],

    randomize: {
      row: true,
      column: true
    },

    onfinish: function (instance, results) {
      console.log(results);
    }
  }
};