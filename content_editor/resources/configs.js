
/**
 * @overview configs of ccm component content_editor
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",
    data: {
      text: "Demo Text: Edit here ..."
    },
    html: {
      editor: {
        id: 'editor',
        contenteditable: true
      },
      toolbar: {
        "class": "toolbar",
        "inner": [
          {
            "tag": "a",
            "href": "#",
            "data-command": "undo",
            "inner": [
              {
                "tag": "i",
                "class": "fa fa-undo"
              }
            ]
          },
          {
            "tag": "a",
            "href": "#",
            "data-command": "redo",
            "inner": [
              {
                "tag": "i",
                "class": "fa fa-repeat"
              }
            ]
          },
          {
            "class": "fore-wrapper",
            "inner": [
              {
                "tag": "i",
                "class": "fa fa-font",
                "style": "color:#C96;"
              },
              {
                "class": "fore-palette"
              }
            ]
          },
          {
            "class": "back-wrapper",
            "inner": [
              {
                "tag": "i",
                "class": "fa fa-font",
                "style": "background:#C96;"
              },
              {
                "class": "back-palette"
              }
            ]
          },
          {
            "tag": "a",
            "href": "#",
            "data-command": "bold",
            "inner": [
              {
                "tag": "i",
                "class": "fa fa-bold"
              }
            ]
          },
          {
            "tag": "a",
            "href": "#",
            "data-command": "italic",
            "inner": [
              {
                "tag": "i",
                "class": "fa fa-italic"
              }
            ]
          },
          {
            "tag": "a",
            "href": "#",
            "data-command": "underline",
            "inner": [
              {
                "tag": "i",
                "class": "fa fa-underline"
              }
            ]
          },
          {
            "tag": "a",
            "href": "#",
            "data-command": "strikeThrough",
            "inner": [
              {
                "tag": "i",
                "class": "fa fa-strikethrough"
              }
            ]
          },
          {
            "tag": "a",
            "href": "#",
            "data-command": "justifyLeft",
            "inner": [
              {
                "tag": "i",
                "class": "fa fa-align-left"
              }
            ]
          },
          {
            "tag": "a",
            "href": "#",
            "data-command": "justifyCenter",
            "inner": [
              {
                "tag": "i",
                "class": "fa fa-align-center"
              }
            ]
          },
          {
            "tag": "a",
            "href": "#",
            "data-command": "justifyRight",
            "inner": [
              {
                "tag": "i",
                "class": "fa fa-align-right"
              }
            ]
          },
          {
            "tag": "a",
            "href": "#",
            "data-command": "justifyFull",
            "inner": [
              {
                "tag": "i",
                "class": "fa fa-align-justify"
              }
            ]
          },
          {
            "tag": "a",
            "href": "#",
            "data-command": "indent",
            "inner": [
              {
                "tag": "i",
                "class": "fa fa-indent"
              }
            ]
          },
          {
            "tag": "a",
            "href": "#",
            "data-command": "outdent",
            "inner": [
              {
                "tag": "i",
                "class": "fa fa-outdent"
              }
            ]
          },
          {
            "tag": "a",
            "href": "#",
            "data-command": "insertUnorderedList",
            "inner": [
              {
                "tag": "i",
                "class": "fa fa-list-ul"
              }
            ]
          },
          {
            "tag": "a",
            "href": "#",
            "data-command": "insertOrderedList",
            "inner": [
              {
                "tag": "i",
                "class": "fa fa-list-ol"
              }
            ]
          },
          {
            "tag": "a",
            "href": "#",
            "data-command": "h1",
            "inner": "H1"
          },
          {
            "tag": "a",
            "href": "#",
            "data-command": "h2",
            "inner": "H2"
          },
          {
            "tag": "a",
            "href": "#",
            "data-command": "createlink",
            "inner": [
              {
                "tag": "i",
                "class": "fa fa-link"
              }
            ]
          },
          {
            "tag": "a",
            "href": "#",
            "data-command": "unlink",
            "inner": [
              {
                "tag": "i",
                "class": "fa fa-unlink"
              }
            ]
          },
          {
            "tag": "a",
            "href": "#",
            "data-command": "insertimage",
            "inner": [
              {
                "tag": "i",
                "class": "fa fa-image"
              }
            ]
          },
          {
            "tag": "a",
            "href": "#",
            "data-command": "p",
            "inner": "P"
          },
          {
            "tag": "a",
            "href": "#",
            "data-command": "subscript",
            "inner": [
              {
                "tag": "i",
                "class": "fa fa-subscript"
              }
            ]
          },
          {
            "tag": "a",
            "href": "#",
            "data-command": "superscript",
            "inner": [
              {
                "tag": "i",
                "class": "fa fa-superscript"
              }
            ]
          }
        ]
      }
    },
    colorPalette: ['000000', 'FF9966', '6699FF', '99FF66', 'CC0000', '00CC00', '0000CC', '333333', '0066FF', 'FFFFFF'],
    // ToDo

    css_awesome: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/content_editor/resources/font-awesome.css' ],
    font_awesome: [ 'ccm.load', { url: 'https://ccmjs.github.io/mkaul-components/content_editor/resources/fonts/fontawesome-webfont.woff', mimeType: "font/woff", method: 'GET' } ],

    // css: [ 'ccm.load',  'resources/default.css' ],
    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/content_editor/resources/default.css' ]
  },
  "localhost": {
    key: "localhost",
    css: [ 'ccm.load',  '../content_editor/resources/default.css' ],
    language: 'de',
    onfinish: function( instance, results ){ console.log( results ); }
  }
};
