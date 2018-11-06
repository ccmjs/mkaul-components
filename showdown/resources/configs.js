
/**
 * @overview configs of ccm component showdown
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",
    markdown: '# Hello Markdown!<br>## Please edit here.',

    html: {
      main: {
        inner: [
          { class: 'checkboxes', inner: [
              { tag: 'label', inner: [
                  'Markdown',
                  { tag: 'input', type: "checkbox", name: "markdown", checked: true },
                ]
              },
              { tag: 'label', inner: [
                  'HTML',
                  { tag: 'input', type: "checkbox", name: "html", checked: false },
                ]
              },
              { tag: 'label', inner: [
                  'Preview',
                  { tag: 'input', type: "checkbox", name: "preview", checked: true },
                ]
              }
            ]
          },
          { class: 'editors', inner: [
              { id: 'markdown', inner: '%markdown%' },
              { id: 'html', inner: '%html%' },
              { id: 'preview', inner: '%preview%' }
            ]
          }
        ]
      }
    },

    showdownjs: ["ccm.load", "https://cdnjs.cloudflare.com/ajax/libs/showdown/1.8.7/showdown.min.js"],

    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/showdown/resources/default.css' ]
  },
  "localhost": {
    key: "localhost",
    css: [ 'ccm.load',  '../showdown/resources/default.css' ],

    onfinish: function( instance, results ){ console.log( results ); }
  }
};
