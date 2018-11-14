
/**
 * @overview configs of ccm component jsonic
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",

    data: "foo:bar, red:1,",

    html: {
      main: {
        inner: [
          { class: 'checkboxes', inner: [
              { tag: 'label', inner: [
                  'Jsonic',
                  { tag: 'input', type: "checkbox", name: "jsonic", checked: true },
                ]
              },
              { tag: 'label', inner: [
                  'JSON',
                  { tag: 'input', type: "checkbox", name: "json", checked: true },
                ]
              }
            ]
          },
          { class: 'editors', inner: [
              { tag: 'pre', inner: { tag: 'code', inner: { id: 'jsonic', inner: '%data%' } } },
              { tag: 'pre', inner: { tag: 'code', inner: { id: 'json', inner: '%json%' } } }
            ]
          }
        ]
      }
    },

    jsonic: [ "ccm.load", "https://cdn.jsdelivr.net/npm/jsonic@0.3.1/jsonic-min.js" ],

    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/jsonic/resources/default.css' ],
  },
  "localhost": {
    key: "localhost",
    css: [ 'ccm.load',  '../jsonic/resources/default.css' ],
    language: 'de',
    onfinish: function( instance, results ){ console.log( results ); }
  }
};
