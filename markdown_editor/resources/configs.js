
/**
 * @overview configs of ccm component markdown_editor
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",
    data: '# Hello Markdown!<br>## Please edit here.',
    html: {
      inner: [
        { id: 'markdown', inner: '%markdown%' },
        { id: 'preview', inner: '%preview%' }
      ]
    },
    showdownjs: ["ccm.load", "https://cdnjs.cloudflare.com/ajax/libs/showdown/1.8.7/showdown.min.js"],
    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/markdown_editor/resources/default.css' ]
  },
  "submit": {
    "key": "submit",
    "markdown": [ "ccm.component", "ccm.markdown_editor.js" ],
    "data": {
      // my_markdown: { markdown: "# Hello Markdown!<br>## Please edit here." }
    },
    ignore: {
      defaults: {
        my_markdown: {
          markdown: "# Hello Markup!<br>## NonOn"
        }
      }
    },
    "entries": [
      {
        "label": "Initial Markdown",
        "name": "my_markdown",
        "type": "markdown",
        "info": "Initial Markdown to start with"
      }
    ]
  },
  "localhost": {
    key: "localhost",
    data: '# Hello Markdown!<br>## Please edit here.',
    html: {
      inner: [
        { id: 'markdown', inner: '%markdown%' },
        { id: 'preview', inner: '%preview%' }
      ]
    },
    onfinish: function( instance, results ){ console.log( results ); }
  }
};
