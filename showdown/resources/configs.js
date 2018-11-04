
/**
 * @overview configs of ccm component showdown
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",
    markdown: "# Hello World in Markdown"
  },
  "localhost": {
    key: "localhost",
    css: [ 'ccm.load',  '../showdown/resources/default.css' ],

    onfinish: function( instance, results ){ console.log( results ); }
  }
};
