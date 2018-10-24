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

    chart: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/plotly/versions/ccm.plotly-1.0.0.js" ],

    onfinish: async function( instance, results ){
      const self = instance;

      console.log( results );

      // self.element.appendChild( self.ccm.helper.html( self.html.results, {results: JSON.stringify(results,null,2)} ) );

      // prepare data for chart rendering
      const categories = [];
      const data = []; // in 100 msec
      const nano = []; // in msec with nano seconds as fractions
      results.counter.forEach( (time, i) =>{
        if (i===0) return;
        data[i-1] = (time - results.counter[i-1]) * 100;
        nano[i-1] = (results.timer[i] - results.timer[i-1]);
        categories[i-1] = results.texts[i];
      });

      const chart_elem = document.createElement('div');

      // render chart
      await self.chart.start( {
        root: chart_elem,
        data: {
          x: categories,
          y: nano
        }
      } );

      self.element.appendChild( chart_elem );
    }

  },

  "questions_answers": {
    "key": "questions_answers",
    labels: {
       intro: "Statt eines Quiz mit Radio-Buttons geht auch ein Fast Poll:",
        label: "Fertig!"
    },
    questions: [
      'Frage 1',
      'Frage 2',
      'Frage 3',
      'Frage 4',
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
  },

  "agile_manifesto": {
    // css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccmjs/mkaul-components/fast_poll/resources/default.css' ],
    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/fast_poll/resources/default.css' ],

    labels: {
        intro: "Entscheiden Sie sich schnell, ohne lange nachzudenken:<br><b>Was ist Ihnen am wichtigsten:</b>",
        label: "Fertig!"
    },
    choices: [// http://agilemanifesto.org/iso/de/manifesto.html
        {agil: 'Individuen und Interaktionen', plan: 'Prozesse und Werkzeuge'},
        {agil: 'Funktionierende Software', plan: 'umfassende Dokumentation'},
        {agil: 'Zusammenarbeit mit dem Kunden', plan: 'Vertragsverhandlung'},
        {agil: 'Reagieren auf Veränderung', plan: 'Befolgen eines Plans'}
      ],
    user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-6.0.0.js', { realm: 'hbrsinfkaul' } ]
    // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/akless-components/log/resources/configs.js', 'greedy' ] ],
    // onfinish: function( instance, results ){ console.log( results ); }
  }
};