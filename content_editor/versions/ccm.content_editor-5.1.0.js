/**
 * @overview ccm component for content_editor
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018, 2019
 * @url https://code.tutsplus.com/tutorials/create-a-wysiwyg-editor-with-the-contenteditable-attribute--cms-25657
 * @url https://github.com/guardian/scribe/blob/master/BROWSERINCONSISTENCIES.md
 * @license The MIT License (MIT)
 * @version latest (5.1.0)
 * @changes
 * version 5.1.0  major refactorings: use dataset.components
 * version 5.0.0  switch to full config objects for every instance in dataset.components
 * version 4.10.0 toolbar at fixed position
 *                see https://www.bitovi.com/blog/use-flexbox-to-create-a-sticky-header-and-sidebar-with-flexible-content
 * version 4.9.1  add Backspace key listener and src attribute
 * version 4.9.0  undo management
 * version 4.8.0  refactoring
 * version 4.7.0  allow dynamic extension of additional buttons
 *                support multiple builders
 * version 4.6.0
 * version 4.5.0 18.12.2018 replace property dependencies by components
 * version 4.1.0 13.12.2018
 * TODO: docu comments -> API
 * TODO: unit tests
 * TODO: builder component
 * TODO: i18n
 */

( function () {

  "use strict";

  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'content_editor',
    version: [5,1,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-19.0.0.min.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      data: {
        inner: '',
        position: 6
      },

      // data: {
      //   "store": [ "ccm.store", { local: 'resources/dataset.json' } ],
      //   "key": "demo"
      // },

      // onchange: function( dataset ){ console.log( this.getValue() ); },

      html: {
        builder: {
          id: 'builder'
        },
        editor: {
          id: 'editor',
          contenteditable: true
        },
        html: {
          id: 'html',
          contenteditable: true
        },
        json: {
          id: 'json',
          contenteditable: true
        },
        html2json: {
          id: 'html2json'
        },
        bottom: {
          class: 'bottom'
        },
        plus: {
          "tag": "a",
          "href": "#",
          "data-command": "plus_action",
          "data-address": "%actionAddress%",
          "data-action": "%buttonName%",
          "title": "%title%",
          "style": "width: auto; margin-right: 5px; border-radius: 3px;",
          "class": "click",
          "inner": {
          "class": "fa",
            "tag": "i",
            "inner": "%buttonName%"
          }
        },
        toolbar: {
          "class": "toolbar",
          "inner": [
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "undo",
              "title": "undo last edit",
              "inner": {
                "tag": "i",
                "class": "fa fa-undo"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "redo",
              "title": "redo last edit",
              "inner": {
                "tag": "i",
                "class": "fa fa-repeat"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "toggle",
              "title": "toggle content editable",
              "inner": {
                "tag": "i",
                "class": "fa fa-toggle-on"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "save_file",
              "title": "Save content as HTML file",
              "data-help": "Store content of editor as HTML file",
              "inner": {
                "tag": "i",
                "class": "fa fa-save"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "load_file",
              "title": "Load from HTML file",
              "data-help": "Enter HTTP address of HTML file!",
              "inner": {
                "tag": "i",
                "class": "fa fa-download"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "bold",
              "inner": {
                "tag": "i",
                "class": "fa fa-bold"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "italic",
              "inner": {
                "tag": "i",
                "class": "fa fa-italic"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "underline",
              "inner": {
                "tag": "i",
                "class": "fa fa-underline"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "strikeThrough",
              "inner": {
                "tag": "i",
                "class": "fa fa-strikethrough"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "change",
              "style": "width: auto; margin-right: 5px;",
              "title": "Font color: Changes a font color for the selection or at the insertion point",
              "data-command": "forecolor",
              "inner": [
                {
                  "tag": 'i',
                  "class": 'fa fa-font',
                  "style": "color:#C96;"
                },
                {
                  "tag": "input",
                  "type": "color"
                }
              ]
            },
            {
              "tag": "a",
              "href": "#",
              "class": "change",
              "style": "width: auto; margin-right: 5px;",
              "title": "background color",
              "data-command": "backcolor",
              "inner": [
                {
                  "tag": 'i',
                  "class": 'fa fa-font',
                  "style": "background:#C96;"
                },
                {
                  "tag": "input",
                  "type": "color"
                }
              ]
            },
            {
              "tag": "a",
              "href": "#",
              "class": "change",
              "style": "width: auto; margin-right: 5px;",
              "title": "hiliteColor: Changes the background color for the selection or at the insertion point",
              "data-command": "hilitecolor",
              "inner": {
                "tag": "input",
                "type": "color"
              }
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
              "class": "click",
              "data-command": "copy",
              "title": "Select some text and press copy button!",
              "inner": {
                "tag": "i",
                "class": "fa fa-copy"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "cut",
              "title": "Cut",
              "inner": {
                "tag": "i",
                "class": "fa fa-cut"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "delete",
              "title": "Delete",
              "inner": {
                "tag": "i",
                "class": "fa fa-trash"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "insertHorizontalRule",
              "title": "insert Horizontal Rule",
              "inner": { // embedded SVG icon
                "tag": "svg",
                "viewBox": "0 0 90 100",
                "width": "0.7em",
                "height": "0.8em",
                "inner": {"tag": "line", "x1": 0, "y1": 95, "x2": 90, "y2": 95, "stroke": "black", "stroke-width": 10}
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "justifyLeft",
              "inner": {
                "tag": "i",
                "class": "fa fa-align-left"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "justifyCenter",
              "inner": {
                "tag": "i",
                "class": "fa fa-align-center"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "justifyRight",
              "inner": {
                "tag": "i",
                "class": "fa fa-align-right"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "justifyFull",
              "inner": {
                "tag": "i",
                "class": "fa fa-align-justify"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "indent",
              "inner": {
                "tag": "i",
                "class": "fa fa-indent"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "outdent",
              "inner": {
                "tag": "i",
                "class": "fa fa-outdent"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "insertUnorderedList",
              "inner": {
                "tag": "i",
                "class": "fa fa-list-ul"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "insertOrderedList",
              "inner": {
                "tag": "i",
                "class": "fa fa-list-ol"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "toc",
              "title": "insert table of contents",
              "inner": {
                "tag": "i",
                "class": "fa fa-info"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "data-command": "h1",
              "class": "click",
              "inner": "H1"
            },
            {
              "tag": "a",
              "href": "#",
              "data-command": "h2",
              "class": "click",
              "inner": "H2"
            },
            {
              "tag": "a",
              "href": "#",
              "data-command": "h3",
              "class": "click",
              "inner": "H3"
            },
            {
              "tag": "a",
              "href": "#",
              "data-command": "h4",
              "class": "click",
              "inner": "H4"
            },
            {
              "tag": "a",
              "href": "#",
              "data-command": "h5",
              "class": "click",
              "inner": "H5"
            },
            {
              "tag": "a",
              "href": "#",
              "data-command": "h6",
              "class": "click",
              "inner": "H6"
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "removeformat",
              "title": "Removes all formatting from the current selection",
              "inner": {
                "tag": "i",
                "class": "fa fa-eraser"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "style": "background-color: grey;",
              "class": "click",
              "data-command": "makeExternalLink",
              "title": "make external link",
              "inner": {
                "tag": "i",
                "class": "fa fa-link"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "createlink",
              "title": "create HTTP hyperlink",
              "inner": {
                "tag": "i",
                "class": "fa fa-link"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "unlink",
              "title": "unlink: remove hyperlink",
              "inner": {
                "tag": "i",
                "class": "fa fa-unlink"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "set_anchor",
              "title": "set in-page anchor",
              "inner": {
                "tag": "i",
                "class": "fa fa-anchor"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "change",
              "style": "min-width: 1.2em; width: auto; margin-right: 5px; border-radius: 3px;",
              "data-command": "select_anchor",
              "title": "select in-page anchor",
              "inner": {
                "class": "fa",
                "tag": "select",
                "inner": []
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "insertimage",
              "title": "insert image",
              "inner": {
                "tag": "i",
                "class": "fa fa-image"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "p",
              "title": "insert paragraph",
              "inner": "P"
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "subscript",
              "inner": {
                "tag": "i",
                "class": "fa fa-subscript"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "superscript",
              "inner": {
                "tag": "i",
                "class": "fa fa-superscript"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "audio",
              "inner": {
                "tag": "i",
                "class": "fa fa-file-audio-o"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "video",
              "inner": {
                "tag": "i",
                "class": "fa fa-file-video-o"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "embed",
              "title": "embed code, e.g. Youtube",
              "style": "width: auto; margin-right: 5px; border-radius: 3px;",
              "inner": {
                "tag": "i",
                "inner": "&lt;embed&gt;",
                "class": "fa"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "dms",
              "title": "DMS-ID: insert App with ID from DMS",
              "style": "width: auto; margin-right: 5px; border-radius: 3px;",
              "inner": {
                "tag": "i",
                "inner": "[DMS-ID]",
                "class": "fa"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "change",
              "data-command": "select",
              "title": "insert ccm component from DMS with empty config",
              "style": "width: auto; margin-right: 5px; border-radius: 3px;",
              "inner": {
                "class": "fa",
                "tag": "select",
                "inner": []
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "ccm-clock",
              "data-config": '["width"]',
              "data-width": "40px",
              "title": "insert live Clock",
              "inner": {
                "tag": "i",
                "class": "fa fa-clock-o"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "ccm-content_editor",
              "data-config": '["enabled"]',
              "data-enabled": '[ "toggle", "bold", "h1", "ccm-clock", "ccm-content_editor", "ccm-draw_svg", "hide_toolbar", "remove_editor" ]',
              "title": "nested editor",
              "data-help": "insert nested editor",
              "inner": {
                "tag": "i",
                "inner": "E",
                "class": "fa"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "style": "width: auto;",
              "data-command": "ccm-draw_svg",
              "data-config": '["enabled"]',
              "data-enabled": '[ "free", "clear_image", "undo", "redo", "color", "ccm-content_editor", "ccm-draw_svg", "hide_toolbar", "remove_editor" ]',
              "title": "nested SVG Editor",
              "data-help": "insert nested SVG Editor",
              "inner": {
                "tag": "i",
                "inner": "SVG",
                "class": "fa"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "ccm-quiz",
              "title": "insert nested quiz",
              "inner": {
                "tag": "i",
                "inner": "Q",
                "class": "fa"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "view_editor",
              "title": "switch back to editor view",
              "inner": {
                "class": "fa fa-eye",
                "tag": "i",
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "view_html",
              "style": "width: auto; margin-right: 5px; border-radius: 3px;",
              "title": "switch to HTML view",
              "inner": {
                "class": "fa",
                "tag": "i",
                "inner": "HTML"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "view_json",
              "style": "width: auto; margin-right: 5px; border-radius: 3px;",
              "title": "switch to JSON view",
              "inner": {
                "class": "fa",
                "tag": "i",
                "inner": "JSON"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "view_html2json",
              "style": "width: auto; margin-right: 5px; border-radius: 3px;",
              "title": "switch to HTML2JSON view",
              "inner": {
                "class": "fa",
                "tag": "i",
                "inner": "html2json"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "style": "width: auto; margin-right: 5px; border-radius: 3px;",
              "class": "change",
              "data-command": "fontname",
              "title": "Font Name",
              "inner": {
                "class": "fa select fontname",
                "tag": "select",
                "inner": []
              }
            },
            {
              "tag": "a",
              "href": "#",
              "style": "width: auto; margin-right: 5px; border-radius: 3px;",
              "class": "change",
              "data-command": "fontSize",
              "title": "Font size",
              "inner": {
                "class": "fa",
                "tag": "select",
                "inner": [
                  {
                    "tag": "option",
                    "value": 0,
                    "inner": "_"
                  },
                  {
                    "tag": "option",
                    "value": 1,
                    "inner": 1
                  },
                  {
                    "tag": "option",
                    "value": 2,
                    "inner": 2
                  },
                  {
                    "tag": "option",
                    "value": 3,
                    "inner": 3,
                    "selected": true
                  },
                  {
                    "tag": "option",
                    "value": 4,
                    "inner": 4
                  },
                  {
                    "tag": "option",
                    "value": 5,
                    "inner": 5
                  },
                  {
                    "tag": "option",
                    "value": 6,
                    "inner": 6
                  },
                  {
                    "tag": "option",
                    "value": 7,
                    "inner": 7
                  }
                ]
              }
            },
            {
              "tag": "a",
              "href": "#",
              "title": "Hello World extension",
              "class": "click",
              "data-command": "my_special_listener", // editor extension
              "style": "width: auto; margin-right: 5px; border-radius: 3px;",
              "inner": {
                "tag": "svg",
                "width": "0.8em",
                "height": "0.8em",
                "viewBox": "0 0 500 500",
                "xmlns": "http://www.w3.org/2000/svg",
                "inner": [
                  {
                    "tag": "defs"
                  },
                  {
                    "tag": "rect",
                    "x": "45",
                    "y": "35",
                    "width": "310",
                    "height": "343",
                    "style": "fill: none; stroke: rgb(0, 0, 0); stroke-linejoin: round; stroke-width: 23px;"
                  },
                  {
                    "tag": "rect",
                    "x": "188",
                    "y": "190",
                    "width": "271",
                    "height": "273",
                    "style": "stroke-linejoin: round; stroke-width: 23px; fill: rgb(255, 255, 255); stroke: rgb(255, 255, 255);"
                  },
                  {
                    "tag": "rect",
                    "x": "210",
                    "y": "211",
                    "width": "248",
                    "height": "252",
                    "style": "stroke: rgb(0, 0, 0); stroke-linejoin: round; stroke-width: 23px; fill: rgb(136, 136, 136);"
                  }
                ]
              }
            },
            {
              "tag": "a",
              "href": "#",
              "title": "add your own button to the toolbar",
              "data-command": "plus",
              "class": "click",
              "inner": {
                "class": "fa fa-plus",
                "tag": "i"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "title": "hide toolbar",
              "data-help": "Hide toolbar to see text only",
              "data-command": "hide_toolbar",
              "class": "click",
              "inner": {
                "class": "fa fa-times",
                "tag": "i"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "title": "remove editor",
              "data-help": "Remove Editor completely and replace it by the produced text only",
              "data-command": "remove_editor",
              "class": "click",
              "inner": {
                "class": "fa fa-window-close",
                "tag": "i"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "stop",
              "title": "stop and call debugger",
              "style": "width: auto; color: red;",
              "inner": {
                "class": "fa fa-stop",
                "tag": "i"
              }
            }
          ]
        }
      },

      helpText: {
        load_html_prompt: "Enter http address of the HTML page to load into the editor",
        load_html_default: "https://kaul.inf.h-brs.de",
        config_prompt: "Enter DMS-ID for your config of ",
        config_default: "1546889115604X2224608869287512",
        anchor_prompt: "Enter Anchor ID or Name:",
        anchor_default: "link_target"
      },

      change_listener_on_key_up: true,

      extensions: [ "ccm.load", { // // editor extensions
        url: "https://ccmjs.github.io/mkaul-components/content_editor/resources/extensions.js",
        type: "module"
      } ],

      colorPalette: ['#000000', '#FF9966', '#6699FF', '#99FF66', '#CC0000', '#00CC00', '#0000CC', '#333333', '#0066FF', '#FFFFFF'],

      fontList: ['Arial', 'Arial Black', 'Helvetica', 'Times New Roman', 'Times', 'Courier New', 'Courier', 'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Impact' ],

      css_awesome: [ "ccm.load",
        { context: "head",
          url: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        },
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ],

      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/content_editor/resources/default.css' ],

      inline_block: true,

      save_format: 'content',  // or 'script'
      ccm_save: 'https://ccmjs.github.io/ccm/versions/ccm-19.0.0.min.js',  // for saving content

      json_builder: [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.3.0.js", {
        "html.inner.1": "",
        "directly": true
      } ],

      html2json_module: [ "ccm.load", {
        "url": "https://ccmjs.github.io/mkaul-components/content_editor/resources/html2json.mjs",
        "type": "module"
      } ],

      html2json: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/html2json/versions/ccm.html2json-3.2.1.js" ],

      dms_store_url: "https://ccm2.inf.h-brs.de",

      // fetch all component descriptions from DMS and store them locally
      dms_index: [ "ccm.store", [ "ccm.get", { "name": "components", "url": "https://ccm2.inf.h-brs.de" }, {} ] ]

      // onfinish: function( instance, results ){ console.log( results ); }
    },

    /**
     * for creating instances of this component
     * @constructor
     */
    Instance: function () {

      /**
       * own reference for inner functions
       * @type {Instance}
       */
      const self = this;

      /**
       * shortcut to help functions
       * @type {Object.<string,function>}
       */
      let $;

      /**
       * Fetch all ccm components from DMS. Store them as key-value pairs with name and URL
       * @type {Object}
       */

      /**
       * dataset for rendering
       * The value of dataset starts with a clone of this.data,
       *     but additional values might be added during component lifetime.
       * this.data is never changed, only dataset is changed.
       * @type {Object}
       */
      let dataset;

      /**
       * Cache all ccm components from DMS. Store them as key-value pairs with name and URL
       * @type {Object}
       */
      let DMS_component_index = null;

      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // get data from config or remote database
        dataset = await $.dataset(this.data);


        if (typeof dataset === 'string') dataset = {inner: dataset};

        // Use LightDOM with higher priority than data from config
        if (this.inner) {

          // Light DOM is given as ccm JSON data? => convert to HTML DOM Elements
          if ($.isObject(this.inner) && !$.isElementNode(this.inner))
            this.inner = $.html(this.inner);

          // dynamic replacement of placeholders
          if (this.placeholder) [...this.inner.children].forEach(child => child.innerHTML = $.format(child.innerHTML, this.placeholder));

          dataset.inner = this.inner;
        }

        // initialize dataset.components if necessary
        if (!dataset.components) dataset.components = {};

        // add listeners to in page anchors
        const afterstart = function () {
          [...this.element.querySelectorAll('a[href^="#"]')].forEach(anchor => {
            const id = anchor.href.split('#')[1];
            anchor.addEventListener( 'click', e => {
              e.preventDefault();
              this.element.querySelector( '#' + id ).scrollIntoView({
                behavior: 'smooth'
              });
            });
          });
        };

        dataset.afterstart = afterstart;

      };

      /**
       * is called once after the initialization and is then deleted
       */
      this.ready = async () => {

        // fill select menu with DMS components

          DMS_component_index = {};

          const data = await self.dms_index.get({});

          const all_buttons = self.html.toolbar.inner;
          let select_array;
          if (all_buttons) for (const button of all_buttons) {
            if (button["data-command"] === "select") { // "data-command": "select"
              if (button.inner) {
                select_array = button.inner.inner;
              }
              break;
            }
          }

          if ( select_array ){
            select_array.push({ tag: 'option', value: '_', inner: '_' });
            for (const record of data) {
              select_array && select_array.push({ tag: 'option', value: record.key, inner: record.key });
              // with version number
              DMS_component_index[ $.getIndex( record.url )] = record.url;
              // without version number
              DMS_component_index[ record.key ] = record.url;
            }

            select_array && select_array.sort( (a, b) => ( '' + a.value).localeCompare(b.value) );
          }

      };


      /**
       * starts the instance
       */
      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log('start', $.clone(dataset));

        const undoStack = [];
        const redoStack = [];
        const ccmInstances = {};
        const indexMap = {};

        // add keyboard events
        const oldKeyListener = document.onkeydown;
        document.addEventListener('keyup', function (evt) {
          evt = evt || window.event;
          var isEscape = false;
          if ("key" in evt) {
            switch (evt.key) {
              case "Backspace":
                if (undoStack > 0 && undoStack[undoStack.length - 1].command !== 'input') {
                  undoStack.pop().undo();
                }
                break;
              default:
                if (undoStack.length === 0 || undoStack[undoStack.length - 1].command !== 'input') {
                  const action = {
                    undo: _ => {
                      const result = document.execCommand('undo', false, null);
                      redoStack.push(action);
                    },
                    redo: _ => {
                      const result = document.execCommand('redo', false, null);
                      undoStack.push(action);
                    },
                    command: 'input'
                  };
                  undoStack.push(action);
                }
            }
          }
        });

        // render main HTML structure
        const editor_div = $.html(this.html.editor);
        if (!dataset.inner) dataset.inner = 'Edit here';
        $.setContent(editor_div, dataset.inner);

        /**
         * add keyup listener if
         * config property change_listener_on_key_up is set truthy
         */
        if (self.change_listener_on_key_up)
          editor_div.addEventListener('keyup', function (e) {
            updateData();
          });

        /**
         * paste event listener
         * @param e Event
         */
        editor_div.onpaste = function (e) {
          [...e.clipboardData.items].forEach((item) => {
            switch (item.type) {
              case 'text/plain':
                updateInPageAnchors();
                const pastedText = e.clipboardData.getData('text/plain');
                // process pastedText here
                break;
              case 'text/html':
                updateInPageAnchors();
                const pastedHTML = e.clipboardData.getData('text/html');
                // process pastedHTML here
                break;
              case 'text/rtf':
                updateInPageAnchors();
                const pastedRTF = e.clipboardData.getData('text/rtf');
                break;
              case 'image/png':
                const URLObj = window.URL || window.webkitURL;
                const pastedImage = document.createElement('img');
                const blob = item.getAsFile();
                pastedImage.src = URLObj.createObjectURL(blob);

                // Use shadow root instead of document to get position of cursor in text
                const shadowRoot = self.element.parentNode;
                const range = getSelectionRange();
                if (range) {
                  range.insertNode(pastedImage);
                } else {
                  editor_div.appendChild(document.createTextNode(' '));
                  editor_div.appendChild(pastedImage);
                  editor_div.appendChild(document.createTextNode(' '));
                }
                pastedImage.focus && pastedImage.focus();
                break;
              default:
                debugger;
            }
          });
        };


        if (self.enabled && self.html.toolbar.inner) {
          // filter enabled tools
          self.html.toolbar.inner = self.html.toolbar.inner.filter(tool => self.enabled.includes(tool['data-command']) || !tool['data-command']);

          // add special buttons for ccm components
          const commands = self.html.toolbar.inner.map(tool => tool['data-command']);
          self.enabled.forEach(label => {
            if (!commands.includes(label)) self.html.toolbar.inner.push({
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": label,  // label is the name of a ccm component
              "data-prompt": "DMS-ID",
              "style": "width: auto; margin-right: 3px; border-radius: 3px;",
              "inner": {
                "class": "fa",
                "tag": "i",
                "inner": label.slice(4)  // name of a ccm component without ccm prefix
              }
            });
          });

        }


        const toolbar_div = $.html(this.html.toolbar);
        const select_anchor_button = toolbar_div.querySelector("a[data-command='select_anchor'] > select");

        class Anchors {
          constructor() {
            this.set_of_all_anchors = new Set();
          }

          add(newAnchor) {
            this.set_of_all_anchors.add(newAnchor);
            if (select_anchor_button) {
              [...select_anchor_button.children].forEach(child => {
                select_anchor_button.removeChild(child);
              });
              this.options().forEach(option => {
                select_anchor_button.appendChild($.html(option));
              });
            }
          }

          options() {
            const list_of_options = [{tag: 'option', value: '_', inner: '_'}];
            this.set_of_all_anchors.forEach((single_option) => {
              list_of_options.push({
                tag: 'option',
                value: single_option,
                inner: single_option
              });
            });
            return list_of_options;
          }
        }

        const page_anchors = new Anchors();

        updateInPageAnchors();

        function updateInPageAnchors() {
          [...editor_div.querySelectorAll('[id]')].forEach(elem => {
            if (elem.parentNode.tagName.startsWith('CCM-')) return;
            page_anchors.add(elem.getAttribute('id'));
          });
        }

        // render color palette
        ['fore', 'back'].forEach(pal => {
          const palette = toolbar_div.querySelector('.' + pal + '-palette');
          self.colorPalette && self.colorPalette.forEach(color => {
            palette && palette.append($.html({
              tag: 'a',
              href: '#',
              'data-command': pal + 'color',
              'data-value': color,
              style: 'background-color:' + color + ';',
              class: 'click palette-item'
            }));
          });
        });

        // render font palette
        if (self.fontList) {
          const palette = [];
          self.fontList.unshift('choose font'); // no font selected
          for (const font of self.fontList) {
            palette.push({
              tag: 'option',
              value: font,
              inner: font
            });
          }
          if (toolbar_div.querySelector('.select.fontname')) {
            $.setContent(toolbar_div.querySelector('.select.fontname'), $.html(palette));
          }
        }

        // add click event listener
        [...toolbar_div.querySelectorAll('.click')].forEach(tool => {
          tool.addEventListener('click', toolbarClickListener.bind(tool));
        });

        // add change event listener
        [...toolbar_div.querySelectorAll('.change')].forEach(tool => {
          tool.addEventListener('change', toolbarChangeListener.bind(tool));
        });

        const builder_div = $.html(self.html.builder || {});
        const html_div = $.html(self.html.html || {});
        const json_div = $.html(self.html.json || {});
        const html2json_div = $.html(self.html.html2json || {});
        const bottom_div = $.html(self.html.bottom || {class: 'bottom'});

        // render main HTML structure
        $.setContent(this.element, $.html([toolbar_div, builder_div, editor_div, html_div, json_div, html2json_div, bottom_div]));

        // SVG hack: paint all svg icons which are inside the DOM but not painted
        [...this.element.querySelectorAll('svg')].forEach(svg => {
          svg.parentNode.innerHTML += '';
        });

        startAllComponents(editor_div);

        /**
         *
         * @param node
         * @returns {Promise<void>}
         */
        async function startAllComponents(node) {
          $.asyncForEach([...node.children], child => {
            startComponent(child);
          });
        }

        /**
         *
         * @param child
         * @returns {Promise<void>}
         */
        async function startComponent( child ) {
          if (child.tagName.startsWith('CCM-')) {

            const src = child.getAttribute('src');
            const index = child.tagName.slice(4).toLowerCase();
            const component = await getComponent( src || index );

            const config = $.integrate( $.generateConfig(child), component.config );
            config.root = child;
            config.parent = self;

            if ($.isComponent(component)) {
              const instance = await component.start( config );
              child.addEventListener(isMobile() ? 'click' : 'dblclick', openBuilder( instance, config ));
            } else { // The http address of the component is only given
              await window.ccm.start( src || component, config );
            }
          } else {
            startAllComponents(child);
          }
        }

        function execCommand(command, showUI, value) {
          document.execCommand(command, showUI, value);
          const action = {
            undo: _ => {
              const result = document.execCommand('undo', showUI, value);
              redoStack.push(action);
            },
            redo: _ => {
              const result = document.execCommand('redo', showUI, value);
              undoStack.push(action);
            },
            command: command
          };
          undoStack.push(action);
        }

        /**
         * the same toolbar click listener for all tools
         * @param e
         * @returns {Promise<void>}
         */
        async function toolbarClickListener(e) {
          const command = this.dataset["command"].toLowerCase();
          self.state = command;

          switch (command) {
            case 'toggle':
              self.isNotEditable = editor_div.getAttribute("contenteditable") === 'false';
              editor_div.setAttribute("contenteditable", self.isNotEditable.toString());
              toolbar_div.querySelector('[data-command=toggle] i').classList = self.isNotEditable ? 'fa fa-toggle-on' : 'fa fa-toggle-off';
              break;

            case "save_file":

              let htmlData = ` <!DOCTYPE html>
                  <html lang="en">
                  <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>Content ${new Date().toGMTString()}</title>
                  </head>
              `;

              const editor_content = editor_div.cloneNode(true);

              if (self.save_format === 'script') {

                Object.keys(dataset.components).forEach(key => {
                  const componentActionData = dataset.components[key];
                  const index = $.getIndex(componentActionData[1]);
                  const config = componentActionData[2];
                  htmlData += `\n<script src="${componentActionData[1]}"></script>`;
                  [...editor_content.querySelectorAll('*')].forEach(child => {
                    if (child.tagName === 'CCM-' + key.toUpperCase()) {
                      if (key === index) {
                        child.setAttribute('key', $.stringify(config));
                      } else {
                        const newChild = document.createElement('CCM-' + index.toUpperCase());
                        newChild.setAttribute('key', $.stringify(config));
                        child.parentNode.appendChild(newChild);
                      }
                    }
                  });
                });

              } else if (self.save_format === 'content') {
                htmlData += `
                  <script src="${self.ccm_save}"></script>
                  <div id="content">Loading ... </div>
                  <script>
                      const content = document.getElementById("content");
                      const content_config = ${JSON.stringify(dataset, null, 2)};
                      content_config.root = content;
                      window.ccm.start('https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.2.0.js', content_config );
                  </script>                       
                `;
              }

              htmlData += editor_content.innerHTML;

              const htmlBlob = new Blob([htmlData], {type: "text/html;charset=utf-8"});
              const htmlUrl = URL.createObjectURL(htmlBlob);
              const save_btn = this;
              save_btn.href = htmlUrl;
              save_btn.download = `content-${new Date().toISOString()}.html`;
              break;

            case "load_file":
              const html_url = prompt(self.helpText.load_html_prompt, self.helpText.load_html_default);
              if (html_url && html_url.length > 5) {
                const html = await self.ccm.load({url: html_url, type: 'html'});
                editor_div.appendChild(html);
              }
              break;

            case "plus":
              const buttonName = prompt('Enter button name: ', 'my_special_listener');
              const actionAddress = prompt('Enter HTTPS address of Button Action: ', 'https://ccmjs.github.io/mkaul-components/content_editor/resources/extensions.js');
              const new_button = $.html(self.html.plus, {buttonName, actionAddress});
              new_button.addEventListener('click', ev => {
                extensionListener({command: buttonName, address: actionAddress, event: ev});
              });
              toolbar_div.appendChild(new_button);
              break;

            case 'p':
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
              execCommand('formatBlock', false, command);
              break;

            case "toc":  // insert structure with links
              let structure = {tag: 'ol', inner: []};
              let nextId = 1;
              const headings = [...editor_div.querySelectorAll('h1,h2,h3,h4,h5,h6')];
              headings.forEach(heading => {
                const id = heading.getAttribute('id') || 'heading_' + nextId++;
                if (id === '_') return;
                heading.setAttribute('id', id);
                page_anchors.add(id);
                const id_listener = e => {
                  e.preventDefault();
                  editor_div.querySelector('#' + id).scrollIntoView({
                    behavior: 'smooth'
                  });
                };
                structure.inner.push({
                  tag: 'li',
                  onclick: id_listener,
                  inner: {
                    tag: 'a',
                    href: '#' + id,
                    inner: heading.innerText
                  }
                });
              });
              const toc_range = getSelectionRange();
              // execCommand('insertHTML', false, $.html( structure ) );  // without event listener
              if (toc_range) {
                try {
                  toc_range.commonAncestorContainer.appendChild($.html(structure));
                } catch {
                  toc_range.commonAncestorContainer.parentNode.appendChild($.html(structure));
                }
              } else {
                $.prepend(editor_div, $.html(structure));
              }
              break;

            case 'forecolor':
            case 'backcolor':
            case 'hilitecolor':
              execCommand(command, false, this.dataset["value"]);
              break;
            case 'createlink':
            case 'insertimage':
              const url = prompt('Enter the link here: ', 'https:\/\/');
              execCommand(command, false, url);
              break;

            case 'audio':
            case 'video':
              const media_file = prompt('Enter URL here: ', 'https:\/\/');
              if (media_file && media_file.length > 8) {
                execCommand('insertHTML', false, `<${command} src="${media_file}" controls ${this.dataset['autoplay']} ${this.dataset['loop']}>Your browser does not support the <code>audio</code> element.</${command}>`);
              }
              break;

            case 'embed':
              const embed_code = prompt('Enter embed code here: ', 'html_embed_code');
              if (embed_code && embed_code.length > 8) {
                // execCommand('insertHTML', false, embed_code );    // replaces quotes
                insertEmbedCode(embed_code);
              }
              break;

            case 'dms':
              const component_name = prompt('Enter component name here: ', 'clock');
              const dms_id = prompt('Enter DMS-ID here: ', '1544379440973X6301133529121039');
              if (component_name && component_name.length > 1 && dms_id) {
                const component_url = (await self.dms_index.get(component_name)).url;
                const config = await self.ccm.get({name: component_name, url: "https://ccm2.inf.h-brs.de"}, dms_id);
                await insertComponent({component: component_url, config});
              }
              break;

            case 'makeexternallink':
              const uri = prompt('Enter the link here: ', 'https:\/\/');
              const range = getSelectionRange();
              if (range) {
                execCommand('insertHTML', false, `<a href="${uri}" target="_blank">${range.toString()}</a>`);
              } else {
                editor_div.appendChild($.html({tag: 'a', href: uri, target: '_blank', rel: 'noopener', inner: 'Link'}));
              }
              break;

            case "undo":
              document.execCommand('undo', false, null);
              if (!undoStack.length) break;
              if (undoStack[undoStack.length - 1].command !== 'input') undoStack.pop().undo();
              break;

            case "redo":
              document.execCommand('redo', false, null);
              if (!redoStack.length) break;
              if (redoStack[redoStack.length - 1].command !== 'input') redoStack.pop().redo();
              break;

            case "bold":
            case "italic":
            case "underline":
            case "strikethrough":
            case "copy":
            case "cut":
            case "delete":
            case "inserthorizontalrule":
            case "justifyleft":
            case "justifycenter":
            case "justifyright":
            case "justifyfull":
            case "indent":
            case "outdent":
            case "insertunorderedlist":
            case "insertorderedlist":
            case "unlink":
            case "subscript":
            case "superscript":
            case "inserthtml":
            case "removeformat":
              execCommand(command, false, null);
              const editMarker = getSelectionRange();
              if (editMarker && editMarker.focus) editMarker.focus();
              break;

            case "set_anchor":
              const anchor_id = prompt(self.helpText.anchor_prompt, self.helpText.anchor_default);
              page_anchors.add(anchor_id);
              const anchor_range = getSelectionRange();
              const newAnchor = document.createElement('span');
              newAnchor.setAttribute('id', anchor_id);
              // newAnchor.innerHTML = anchor_range.toString();
              anchor_range.insertNode(newAnchor);
              newAnchor.focus && newAnchor.focus();
              break;

            case "stop":
              debugger;
              break;

            case "view_editor":
              $.setContent(editor_div, dataset.inner);
              // TODO restore all event listeners
              updateInPageAnchors();
              startAllComponents(editor_div);
              html_div.style.display = 'none';
              json_div.style.display = 'none';
              html2json_div.style.display = 'none';
              editor_div.style.display = 'block';
              break;
            case "view_html":
              html_div.innerText = editor_div.innerHTML;
              html_div.addEventListener('input', (e) => {
                updateData(html_div.innerText);
              });
              html_div.style['background-color'] = 'lightblue';
              editor_div.style.display = 'none';
              json_div.style.display = 'none';
              html2json_div.style.display = 'none';
              html_div.style.display = 'block';
              break;

            case "view_json":
              const value_as_json = $.clone(Object.assign({}, self.getValue(), {inner: self.html2json_module.html2json(editor_div.innerHTML)}));
              delete value_as_json.parent;
              delete value_as_json.root;
              let view_json_instance = null;
              if (!view_json_instance) {
                view_json_instance = await self.json_builder.start({
                  root: json_div,
                  onchange: function () { dataset.inner = $.html(view_json_instance.getValue().inner) },
                  data: { // avoid solveDependency by storing in ccm.store
                    store: ['ccm.store', {local: {app: value_as_json}}],
                    key: 'app'
                  }
                });
              }
              editor_div.style.display = 'none';
              html_div.style.display = 'none';
              html2json_div.style.display = 'none';
              json_div.style.display = 'block';
              break;

            case "view_html2json":
              let html2json_instance = null;
              if (!html2json_instance) {
                html2json_instance = await self.html2json.start({
                  root: html2json_div,
                  onchange: function () { dataset.inner = $.html(html2json_instance.getValue().inner) },
                  data: self.getValue()
                });
              }
              editor_div.style.display = 'none';
              html_div.style.display = 'none';
              json_div.style.display = 'none';
              html2json_div.style.display = 'block';
              break;

            case "hide_toolbar":
              toolbar_div.style.display = 'none';
              editor_div.style.display = 'block';
              html_div.style.display = 'none';
              html2json_div.style.display = 'none';
              editor_div.addEventListener('dblclick', (e) => {
                toolbar_div.style.display = 'block';
              });
              break;

            case "remove_editor":
              const root = self.element.parentNode;
              [...root.children].forEach(child => {
                root.removeChild(child);
              });
              root.appendChild(editor_div.cloneNode(true));
              break;

            default:
              if (command.toLowerCase().startsWith('ccm-')) { // ccm component

                const componentName = command.substr(4 ).toLowerCase();
                const component = await getComponent( componentName );

                let config = {};

                if (this.dataset["prompt"]) {
                  const dms_id = prompt(self.helpText.config_prompt + componentName,
                    self.helpText.config_default);
                  if (dms_id) config = await self.ccm.get({
                    name: componentName,
                    url: "https://ccm2.inf.h-brs.de"
                  }, dms_id);
                } else if (this.dataset["config"]) {
                  const config_keys = JSON.parse(this.dataset["config"]);
                  config_keys.forEach(key => {
                    config[key] = (/^[{[]/.test(this.dataset[key])) ?
                      JSON.parse(this.dataset[key]) :
                      this.dataset[key];
                  });
                } else {
                  config = await ccm.get({name: componentName, url: self.dms_store_url }, 'demo');
                }

                const instance = await insertComponent({component, config});

              } else { // editor extensions via function calls remotely defined
                extensionListener({command: command, action: this.dataset['action'], event: e});
              }
          }
          updateData();
        }

        /**
         * get component by name via ccm register or via DMS
         * @param componentName {String}
         * @returns {Promise<Component>}
         */
        async function getComponent( componentName ){
          if ( self[ componentName ] ) return self[ componentName ];
          const component = ( componentName.includes('-') ) ?
            await self.ccm.component( componentName ) :
            DMS_component_index[ componentName ];
          if ( $.isComponent( component ) ) return component;
          const component2 = await self.ccm.component( component );
          if ( $.isComponent( component2 ) ) return component2;
          const component_url = DMS_component_index[ componentName ];
          const component3 =  await self.ccm.component( component_url );
          if ( $.isComponent( component3 ) ) return component3;
          const component4 = await self.ccm.component( DMS_component_index[ componentName.split('-')[0] ] );
          if ( $.isComponent( component4 ) ) return component4;
          debugger;
        }

        /**
         * standard listener for change events
         * @param e
         * @returns {Promise<void>}
         */
        async function toolbarChangeListener(e) {
          const command = this.dataset["command"].toLowerCase();
          const select = this.querySelector('select');
          const input = this.querySelector('input');
          switch (command) {
            case 'forecolor':
            case 'backcolor':
            case 'hilitecolor':
              execCommand(command, false, input.value);
              break;
            case "fontsize":
              execCommand(command, false, parseInt(select.value));
              select.value = 0; // set back to default
              break;
            case "fontname":
              execCommand(command, false, select.value);
              select.value = 'default'; // set back to default
              break;
            case "select_anchor":
              const anchor = select_anchor_button.options[select_anchor_button.selectedIndex].value;
              const anchorListener = e => {
                e.preventDefault();
                const target = editor_div.querySelector('#' + anchor);
                if (target) target.scrollIntoView({
                  behavior: 'smooth'
                });
              };
              const range = getSelectionRange();
              const anchorReference = $.html({
                tag: 'a',
                href: '#' + anchor,
                inner: range.toString() || anchor,
                onclick: anchorListener
              });
              if (range) {
                range.commonAncestorContainer.parentNode.appendChild(anchorReference);
              } else {
                editor_div.appendChild(anchorReference);
              }
              break;
            case 'select': // select ccm component from DMS
              const component_url = DMS_component_index[ select.options[select.selectedIndex].value ];
              const instance = await insertComponent({
                component: await getComponent( component_url )
              });
              break;
            default:
              extensionListener({command, event: e});
          }
          updateData();
        }

        /**
         * refresh dataset after editing
         */
        function updateData(inner) {
          if (inner) dataset.inner = inner; else dataset.inner = editor_div.innerHTML;
          dataset.position = getCaretPosition();
          self.onchange && self.onchange(dataset);
        }

        /**
         * listeners for editor extensions
         * @param command
         * @param event
         * @param address HTTPS address of ES6 module to be imported
         */
        async function extensionListener({command, event, address}) {
          // get listener from remote JavaScript or config or global namespace
          if (address) {
            const action = await self.ccm.load({url: address, type: 'module', import: command});
            action(event);
          } else {
            if (self.extensions && self.extensions[command] && typeof self.extensions[command] === 'function') {
              self.extensions[command](event)
            } else if (self[command] && typeof self[command] === 'function') {
              self[command](event)
            } else if (window[name] && typeof window[name] === 'function') {
              window[name](event)
            } else {
              debugger;
            }
          }
        }

        /**
         *
         * @returns {*}
         */
        function getCaretPosition() {
          const shadowRoot = self.element.parentNode || self.element;  // HTML body is no parent node
          if (shadowRoot.getSelection) { // Chrome
            return position(shadowRoot.getSelection())
          } else { // Firefox 63
            return position(document.getSelection())
          }

          function position(selection) {
            if (selection.rangeCount) {
              const range = selection.getRangeAt(0);
              let rangeCount = 0;
              const childNodes = selection.anchorNode.parentNode.childNodes;
              [...childNodes].forEach(childNode => {
                if (childNode === selection.anchorNode) {
                  return rangeCount;
                }
                if (childNode.outerHTML)
                  rangeCount += childNode.outerHTML.length;
                else if (childNode.nodeType === 3) {
                  rangeCount += childNode.textContent.length;
                }
              });
              return range.startOffset + rangeCount;
            } else {
              return 0;
            }
          }
        }

        /**
         *
         * @param component {Object}
         * @param config {Object}
         * @returns {Promise<void>}
         */
        async function insertComponent({component, config = {}}) {

          // component
          const urlIndex = component.index;
          const counter = Object.keys(ccmInstances).length;
          const tagIndex = urlIndex + '-' + counter; // unique
          const tagName = 'ccm-' + tagIndex;
          const component_div = document.createElement(tagName);

          // get config  // refactored => move this code into all 4 calls of insertComponent
          // if (!config || Object.keys(config).length === 0) config = $.isComponent(component) ? component.config : {};

          if (config.root) {
            // read attributes for configuration
            config = $.integrate($.generateConfig(config.root), component.config);
          } else {
            config.root = component_div;
          }
          config.parent = self;

          const instance = $.isComponent(component) ?
            await component.start(config) : await window.ccm.start( component, config );

          delete config.root;
          delete config.parent;

          ccmInstances[ tagIndex ] = instance;
          indexMap[ instance.index ] = tagIndex;

          dataset.components[ tagIndex ] = ['ccm.component',
            $.isComponent(component) ? component.url : component,
            config
          ];

          updateData();

          editor_div.dispatchEvent(new Event('keyup', {'bubbles': true}));

          if (self.inline_block) component_div.style = "display: inline-block;";
          if (self.inline_block) component_div.firstChild.style = "display: inline-block;";

          component_div.addEventListener(isMobile() ? 'click' : 'dblclick', openBuilder(instance, config));

          const range = getSelectionRange();
          if (range && !$.isSafari()) {
            range.insertNode(document.createTextNode(' '));
            range.insertNode(component_div);
            range.insertNode(document.createTextNode(' '));
          } else {
            editor_div.appendChild(document.createTextNode(' '));
            editor_div.appendChild(component_div);
            editor_div.appendChild(document.createTextNode(' '));
          }
          component_div.focus();

          undoStack.push(undoTemplate(instance, config));

          return instance;
        }

        function undoTemplate(instance, config) {
          const action = {
            undo: _ => { // TODO remove
              config.root.style.display = 'none';
              redoStack.push(action);
            },
            redo: _ => { // TODO restart
              config.root.style.display = 'inline-block';
              // instance.start( config );
              undoStack.push(action);
            },
            instance: instance,
            command: 'insert'
          };
          return action;
        }

        /**
         * open builder for double clicked component, which is inside the edited text
         * @param instance
         * @param config
         * @returns {Function} event handler for double click
         */
        function openBuilder(instance, config) {  // TODO config not used
          // persist the builder as property of instance
          return async function (event) {
            if (event.type === 'dblclick' || (event.type === 'click' && event.shiftKey)) {
              if (instance.json_builder) {
                // replace builder_div with old json_builder
                builder_div.appendChild(instance.builder_div);
              } else {
                const instance_builder_div = document.createElement('div');
                instance.json_builder = await self.json_builder.start({
                  root: instance_builder_div,
                  data: { // avoid solveDependency by storing in ccm.store
                    store: ['ccm.store', {local: {app: JSON.parse(instance.config)}}],
                    key: 'app'
                  },
                  html: {
                    "tag": "form",
                    "onsubmit": "%onclick%",
                    "inner": [
                      {
                        "tag": "textarea",
                        "id": "input",
                        "oninput": "%oninput%",
                        "onchange": "%onchange%"
                      },
                      {
                        "tag": "input",
                        "id": "button",
                        "type": "submit",
                        "onclick": "%onclick%"
                      }
                    ]
                  },
                  onfinish: async function (e) {
                    const json_builder_value = instance.json_builder.getValue();
                    const instance_config = JSON.parse( instance.config );

                    // store configs into dataset.components
                    dataset.components[ indexMap[ instance.index ] ][2] = json_builder_value;

                    // Alternative: store different config values in attributes
                    const all_diffs = compareJSON(instance_config, json_builder_value);
                    for (const [name, diff] of all_diffs) {
                      instance.root.parentNode.setAttribute(name, diff);
                    }

                    /********** Restart component instance ??? **********/
                    await instance.start( json_builder_value );

                    /********** Alternative: Mutation ***** via MutationObserver *****/
                    // Object.assign(instance, await $.solveDependencies(json_builder_value));
                    // Object.assign(instance.json_builder, {
                    //   data: {
                    //     // avoid solveDependency by storing in ccm.store
                    //     store: ['ccm.store', {local: {app: json_builder_value}}],
                    //     key: 'app'
                    //   }
                    // });
                    builder_div.style.display = 'none';
                    builder_div.removeChild(instance.builder_div);
                    editor_div.dispatchEvent(new Event('keyup', {'bubbles': true}));
                    updateData();
                    editor_div.focus();
                  }
                });
                instance.builder_div = instance_builder_div;
                builder_div.appendChild(instance.builder_div);
              }
              builder_div.style.display = 'block';
              builder_div.focus();
            }
          }
        }

        /**
         * insert embed code
         * @param embedCode
         * @returns {Promise<void>}
         */
        async function insertEmbedCode(embedCode) {
          if (embedCode.toLowerCase().includes('ccm-')) {
            // extract ccm component and config and start component
            const regex = /(http[^("|')]+).*ccm-(\w+).*?(\w+\d+)["]/gi;
            const match = regex.exec(embedCode);
            const component_uri = match[1];
            const component_name = match[2];
            const dms_id = match[3];
            if (component_name && component_name.length > 1 && dms_id) {
              const config = await self.ccm.get({name: component_name, url: "https://ccm2.inf.h-brs.de"}, dms_id);
              const instance = await insertComponent({component: component_uri, config});
            }
          } else { // e.g. Youtube embed code
            const embed_div = document.createElement('div');
            embed_div.innerHTML = embedCode;
            // selection = self.element.parentNode.getSelection();
            const embed_selection = editor_div.parentNode.parentNode.getSelection && editor_div.parentNode.parentNode.getSelection() || document.getSelection();
            if (embed_selection.rangeCount > 0) {
              editor_div.appendChild(document.createTextNode(' '));
              embed_selection.getRangeAt(0).insertNode(embed_div);
              editor_div.appendChild(document.createTextNode(' '));
            } else {
              editor_div.appendChild(document.createTextNode(' '));
              editor_div.appendChild(embed_div);
              editor_div.appendChild(document.createTextNode(' '));
            }
          }

          editor_div.focus();
        }

        /**
         * compare two objects and return the differences
         * @param {Object} oldJson
         * @param {Object} newJson
         * @return {Array} differences as array of key-value pairs
         */
        function compareJSON(oldJson, newJson) {
          const result = [];
          collect([], oldJson, newJson);
          return result;

          function collect(prefix, oldJson, newJson) {
            if (oldJson && !newJson) return result.push([dots(), null]);
            if (!oldJson && newJson) return result.push([dots(), newJson]);
            if (oldJson == newJson) return;
            // oldJson && newJson && oldJson != newJson
            if (typeof newJson === 'object') {
              if (Array.isArray(newJson)) {
                for (let i = 0; i < newJson.length; i++) {
                  collect([...prefix, i], oldJson[i], newJson[i]);
                }
              } else { // object is not an array
                for (const key of [...new Set([...Object.keys(oldJson), ...Object.keys(newJson)])]) {
                  collect([...prefix, key], oldJson[key], newJson[key]);
                }
              }
            } else {
              result.push([dots(), newJson]);
            }

            function dots() {
              return prefix.reduce((a, b) => {
                if (a) { a += '.' + b } else {a = b}
                return a
              }, null);
            }
          }
        }


        /**
         * get the current selection range or null
         * @returns {Range}
         */
        function getSelectionRange() {
          const shadowRoot = self.element.parentNode;
          if (shadowRoot.getSelection && shadowRoot.getSelection()) {
            const sel = shadowRoot.getSelection();
            const range = sel.rangeCount && sel.getRangeAt(0);
            return range;
          }
          if (window.getSelection) {
            const sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
              const range = sel.getRangeAt(0);
              return range;
            } else { // Safari
              const range = document.createRange();
              range.setStart(sel.anchorNode, sel.anchorOffset);
              range.setEnd(sel.focusNode, sel.focusOffset);
              return range;
            }
          }
          return null;
        }


        /**
         * checks whether editor is run on a mobile platform
         * @url https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
         * @returns {boolean}
         */
        function isMobile() {
          return 'ontouchstart' in window && window.screen.availWidth < 768;
        }
      };

        /**
         * current state of this editor
         * @returns {Object} state of editor
         */
        this.getValue = () => {
          // clone dataset
          const result = $.clone(dataset);

          for (const [index, dep] of Object.entries(dataset.components)) {
            if (!Array.isArray(dep)) {
              // transform dep into action data
              result.components[index] = ['ccm.component',
                dep.url,
                dep.config ? $.clone(dep.config) : {}
              ];
            }
            // add second index without version number
            // if (index.includes('-')) {
            //   const name = index.slice(0, index.indexOf('-'));
            //   result.components[name] = result.components[index];
            // }
          }
          return result;
        };

    }

  };


  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();