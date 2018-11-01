
/**
 * @overview configs of ccm component paper_generator
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
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
