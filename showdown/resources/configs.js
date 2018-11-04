
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
        id: 'main',
        inner: [
          { id: "checkboxes", inner: [
              { tag: 'label', inner: [
                  'markdown',
                  { tag: 'input', type: "checkbox", id: 'markdown_checkbox', name: "markdown", checked: true },
                ]
              },
              { tag: 'label', inner: [
                  'html',
                  { tag: 'input', type: "checkbox", id: 'html_checkbox', name: "html", checked: true },
                ]
              }
            ]
          },
          { id: "editors", inner: [
              { id: 'markdown', inner: '%markdown%' },
              { id: 'html', inner: '%html%' }
            ]
          }
        ]
      }
    },

    showdownjs: ["ccm.load", "https://cdnjs.cloudflare.com/ajax/libs/showdown/1.8.7/showdown.js"],

    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/showdown/resources/default.css' ]
  },
  "localhost": {
    key: "localhost",
    css: [ 'ccm.load',  '../showdown/resources/default.css' ],

    onfinish: function( instance, results ){ console.log( results ); }
  }
};
