/**
 * @overview configurations of ccm component
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "localhost": {
    css: [ 'ccm.load',  '../fast-poll/resources/default.css' ],
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
    onfinish: function( instance, results ){ console.log( results ); }
  },

  "agile_manifesto": {
    css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccmjs/mkaul-components/fast-poll/resources/default.css' ],
    // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/fast-poll/resources/default.css' ],
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
    user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-6.0.0.js', { realm: 'hbrsinfkaul' } ],
    // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/akless-components/log/resources/configs.js', 'greedy' ] ],
    onfinish: function( instance, results ){ console.log( results ); }
  }
};