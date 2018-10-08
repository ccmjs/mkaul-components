/**
 * @overview configurations of ccm component
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "localhost": {
    css: [ 'ccm.load',  '../fast_poll/resources/default.css' ],
    language: 'de',
    labels: {
      de: {
        intro: "Entscheiden Sie sich schnell, ohne lange nachzudenken:<br><b>Was ist Ihnen am wichtigsten:</b>",
        label: "Fertig!"
      }
    },
    choices: {
      de: [
        ['A',  'B'],
        ['1',  '2']
      ]
    },

    chart: [ "ccm.component", "https://ccmjs.github.io/akless-components/highchart/ccm.highchart.js" ],

    onfinish: function( instance, results ){
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
      self.chart.start( {
        root: chart_elem,
        settings: {
          chart: {
            type: 'column'
          },
          title: {
            text: ''
          },
          xAxis: {
            categories: categories,
            title: {
              text: 'Choice'
            }
          },
          yAxis: {
            min: 0,
            max: results.length,
            title: {
              text: 'Time to choose (msec)'
            },
            allowDecimals: false
          },
          tooltip: {
            enabled: false
          },
          legend: {
            enabled: false
          },
          series: [
            {
              data: nano // or data
            }
          ]
        }
      } );

      self.element.appendChild( chart_elem );
    }

  },

  "questions_answers": {
    labels: {
      en: {
        intro: "Instead of a quiz take a fast poll:",
        label: "Finished!"
      },
      de: {
        intro: "Statt eines Quiz mit Radio-Buttons geht auch ein Fast Poll:",
        label: "Fertig!"
      }
    },
    questions: {
      en: [
        'Question 1',
        'Question 2',
        'Question 3',
        'Question 4',
        'Thank you!'
      ],
      de: [
        'Frage 1',
        'Frage 2',
        'Frage 3',
        'Frage 4',
        'Vielen Dank!'
      ]
    },
    choices: {
      en: [
        ['Answer 1a',  'Answer 1b'],
        ['Answer 2a',  'Answer 2b', 'Answer 2c'],
        [ 1,2,3,4,5,6,7,8,9,10 ],
        ['Only one Answer']
      ],
      de: [
        ['Antwort 1a',  'Antwort 1b'],
        ['Antwort 2a',  'Antwort 2b', 'Antwort 2c'],
        [ 1,2,3,4,5,6,7,8,9,10 ],
        ['Nur eine Antwort']
      ]
    },
  },

  "agile_manifesto": {
    // css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccmjs/mkaul-components/fast_poll/resources/default.css' ],
    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/fast_poll/resources/default.css' ],
    language: 'de',
    labels: {
      en: {
        intro: "Decide immediately (without pondering):<br><b>What is really important to you?</b>",
        label: "Finished!"
      },
      de: {
        intro: "Entscheiden Sie sich schnell, ohne lange nachzudenken:<br><b>Was ist Ihnen am wichtigsten:</b>",
        label: "Fertig!"
      }
    },
    choices: {
      en: [
        // http://agilemanifesto.org/iso/en/manifesto.html
        ['Individuals and interactions',  'processes and tools'],
        ['Working software',  'comprehensive documentation'],
        ['Customer collaboration',  'contract negotiation'],
        ['Responding to change',  'following a plan']
      ],
      de: [
        // http://agilemanifesto.org/iso/de/manifesto.html
        ['Individuen und Interaktionen',  'Prozesse und Werkzeuge'],
        ['Funktionierende Software',  'umfassende Dokumentation'],
        ['Zusammenarbeit mit dem Kunden',  'Vertragsverhandlung'],
        ['Reagieren auf Veränderung',  'Befolgen eines Plans']
      ]
    },
    user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-6.0.0.js', { realm: 'hbrsinfkaul' } ]
    // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/akless-components/log/resources/configs.js', 'greedy' ] ],
    // onfinish: function( instance, results ){ console.log( results ); }
  }
};