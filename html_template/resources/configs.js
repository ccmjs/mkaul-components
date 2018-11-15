
/**
 * @overview configs of ccm component html_template
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",

    data: {
      x: "Hello World"
    },

    pairs: [
      {
        "param_key": "x",
        "param_value": "Hello World"
      }
    ],

    template: '<h1>${x}</h1>',

    lit_html: [ "ccm.load", { url: "https://unpkg.com/lit-html?module", type: "module" } ],


    templatizer: [ "ccm.load", { url: "https://ccmjs.github.io/mkaul-components/html_template/resources/template.js", type: "module" } ],

    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/html_template/resources/default.css' ],
  },
  "localhost": {
    key: "localhost",
    css: [ 'ccm.load',  '../html_template/resources/default.css' ]
  }
};
