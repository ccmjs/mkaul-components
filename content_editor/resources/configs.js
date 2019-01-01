
/**
 * @overview configs of ccm component content_editor
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "tiny": {
    key: "tiny",

    data: {
      inner: '<h1>Tiny Editor</h1>Demo Text for a tiny editor',
      position: 6 // cursor position
    },

    html: {
      editor: {
        id: 'editor',
        contenteditable: true
      },
      toolbar: {
        "class": "toolbar",
      }
    }
  },

  "small": {
    key: "small",

    data: {
      inner: '<h1>Small Editor</h1>Demo Text for a <b>small</b> editor',
      position: 6 // cursor position
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
            "class": "click",
            "data-command": "undo",
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
            "data-command": "ccm-draw_svg",
            "data-enabled": '[ "clear_image", "color", "undo", "redo", "line", "rect", "circle", "free", "ccm-clock", "ccm-content_editor", "ccm-draw_svg", "hide_toolbar", "remove_editor" ]',
            "title": "insert nested SVG editor",
            "inner": {
              "tag": "i",
              "inner": "SVG",
              "class": "fa"
            }
          }
        ]
      }
    },

    "css_awesome": [ "ccm.load",
      { "context": "head", "url": "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" },
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    ],

    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/content_editor/resources/default.css' ]

  },

  "medium": {

    key: "medium",

    data: {
      inner: '<h1>Medium Editor</h1>Demo Text for medium sized editor',
      position: 6 // cursor position
    },

    // data: {
    //   "store": [ "ccm.store", { local: 'resources/dataset.json' } ],
    //   "key": "demo"
    // },

    // onchange: function(){ console.log( this.getValue() ); },

    change_listener_on_key_up: true,

    extensions: [ "ccm.load", { // // editor extensions
      "url": "https://ccmjs.github.io/mkaul-components/content_editor/resources/extensions.js",
      "type": "module"
    } ],

    enabled: ['undo', 'redo', 'bold', 'italic', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'insertUnorderedList', 'insertOrderedList', 'h1', 'h2', 'createlink', 'unlink', 'p', 'fontSize', "view_editor", "view_html", "view_json", "view_html2json", "ccm-draw_svg" ], // which toolbar buttons should be on the toolbar

    colorPalette: ['#000000', '#FF9966', '#6699FF', '#99FF66', '#CC0000', '#00CC00', '#0000CC', '#333333', '#0066FF', '#FFFFFF'],

    fontList: ['Arial', 'Arial Black', 'Helvetica', 'Times New Roman', 'Times', 'Courier New', 'Courier', 'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Impact' ],

    "css_awesome": [ "ccm.load",
      { "context": "head", "url": "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" },
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    ],

    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/content_editor/resources/default.css' ],
    // onfinish: function( instance, results ){ console.log( results ); }
  },

  "audio_video": {
    key: "audio_video",

    data: {
      inner: '<h1>Audio and Video</h1>Demo Text for audio / video',
      position: 6 // cursor position
    },

    enabled:['undo', 'redo', "toggle", "bold", "h1", "h2", "indent", "outdent", "embed", "audio", "video", "ccm-clock", "view_editor", "view_html", "view_json", "view_html2json" ],

    "css_awesome": [ "ccm.load",
      { "context": "head", "url": "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" },
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    ],

    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/content_editor/resources/default.css' ]

  },


  "ccm": {
    key: "ccm",

    data: {
      inner: '<h1>Editor for <i>ccm</i> components</h1><ccm-clock></ccm-clock><p>Demo Text</p> ',
      position: 6, // cursor position
      components: { "clock": ["ccm.component", "https://ccmjs.github.io/mkaul-components/clock/versions/ccm.clock-3.0.1.js"]}
    },

    enabled:["toggle", 'undo', 'redo', "bold", "h1", "h2", "indent", "outdent", "embed", "dms", "select", "ccm-clock", "ccm-content_editor", "ccm-quiz", "view_editor", "view_html", "view_json", "view_html2json" ],

    css_awesome: [ "ccm.load",
      { "context": "head", "url": "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" },
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    ],

    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/content_editor/resources/default.css' ]

  },

  "recursive": {
    key: "recursive",

    data: {
      inner: '<h1>Recursive Editor Nesting</h1>Demo Text<ccm-content_editor></ccm-content_editor>',
      position: 6 // cursor position
    },

    enabled:["toggle", 'undo', 'redo', "bold", "h1", "embed", "dms", "select", "ccm-clock", "ccm-content_editor", 'ccm-draw_svg', "ccm-quiz", "view_editor", "view_html", "view_json", "view_html2json", "hide_toolbar", "remove_editor" ],

    css_awesome: [ "ccm.load",
      { "context": "head", "url": "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" },
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    ],

    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/content_editor/resources/default.css' ]

  },

  "full": {

    key: "full",

    data: {
      inner: '<h1>Full Editor with all buttons</h1>Demo Text',
      position: 6 // cursor position
    },

    // data: {
    //   "store": [ "ccm.store", { local: 'resources/dataset.json' } ],
    //   "key": "demo"
    // },

    // onchange: function(){ console.log( this.getValue() ); },

    change_listener_on_key_up: true,

    extensions: [ "ccm.load", { // // editor extensions
      "url": "https://ccmjs.github.io/mkaul-components/content_editor/resources/extensions.js",
      "type": "module"
    } ],

    enabled: ['undo', 'redo', 'toggle', 'bold', 'italic', 'underline', 'strikeThrough', 'forecolor', 'backcolor', 'hilitecolor', 'copy', 'cut', 'delete', 'insertHorizontalRule', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'insertUnorderedList', 'insertOrderedList', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'removeformat', 'makeExternalLink', 'createlink', 'unlink', 'insertimage', 'p', 'subscript', 'superscript', '', '', 'audio', 'video', 'embed', 'dms', 'select', 'ccm-clock', 'ccm-content_editor', 'ccm-draw_svg', 'ccm-quiz', 'fontname', 'fontSize',  "view_editor", "view_html", "view_json", "view_html2json", 'my_special_listener', "plus", "hide_toolbar", "remove_editor" ], // which toolbar buttons should be on the toolbar

    colorPalette: ['#000000', '#FF9966', '#6699FF', '#99FF66', '#CC0000', '#00CC00', '#0000CC', '#333333', '#0066FF', '#FFFFFF'],

    fontList: ['Arial', 'Arial Black', 'Helvetica', 'Times New Roman', 'Times', 'Courier New', 'Courier', 'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Impact' ],

    css_awesome: [ "ccm.load",
      { "context": "head", "url": "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" },
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    ],

    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/content_editor/resources/default.css' ],

    // other ccm components to be embeddable inside the editor text
    clock: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/clock/versions/ccm.clock-3.0.0.js", {
      width: "40px",
      html: { main: { id: 'main', inner: [ { id: 'clock' } ] }
      }
    } ],

    quiz: [ "ccm.component", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-3.0.1.js", { key: ["ccm.get","https://ccmjs.github.io/akless-components/quiz/resources/configs.js","demo"] } ],

    store: [ "ccm.store", { "name": "components", "url": "https://ccm2.inf.h-brs.de" } ]
    // onfinish: function( instance, results ){ console.log( results ); }
  }
};
