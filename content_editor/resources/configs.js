
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

  "teacher": {
    key: "teacher",

    data: {
      inner: '<h1>Teacher Editor</h1>for entering red marks into the students´ text',
      position: 6 // cursor position
    },

    enabled: ['special_save', 'red_ink', 'undo', 'redo', 'bold', 'italic', 'insertUnorderedList', 'insertOrderedList', 'h1', 'h2', 'p'],

    "css_awesome": ["ccm.load",
      {"context": "head", "url": "https://ccmjs.github.io/mkaul-components/lib/fontawesome/css/font-awesome.min.css"},
      "https://ccmjs.github.io/mkaul-components/lib/fontawesome/css/font-awesome.min.css"
    ],

    css: ['ccm.load', 'https://ccmjs.github.io/mkaul-components/content_editor/resources/default.css']

  },

  "small": {
    key: "small",

    data: {
      inner: '<h1>Small Editor</h1>Demo Text for a <b>small</b> editor',
      position: 6 // cursor position
    },

    enabled: ['undo', 'redo', 'bold', 'italic', 'strikeThrough', 'insertUnorderedList', 'insertOrderedList', 'h1', 'h2', 'h3', 'p', 'indent', 'outdent', 'createlink', 'unlink', 'table' ],

    "css_awesome": [ "ccm.load",
      { "context": "head", "url": "https://ccmjs.github.io/mkaul-components/lib/fontawesome/css/font-awesome.min.css" },
      "https://ccmjs.github.io/mkaul-components/lib/fontawesome/css/font-awesome.min.css"
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

    enabled: ['undo', 'redo', 'bold', 'italic', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'insertUnorderedList', 'insertOrderedList', 'h1', 'h2', 'createlink', 'unlink', 'p', 'fontSize', "ccm-draw_svg" ], // which toolbar buttons should be on the toolbar

    colorPalette: ['#000000', '#FF9966', '#6699FF', '#99FF66', '#CC0000', '#00CC00', '#0000CC', '#333333', '#0066FF', '#FFFFFF'],

    fontList: ['Arial', 'Arial Black', 'Helvetica', 'Times New Roman', 'Times', 'Courier New', 'Courier', 'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Impact' ],

    "css_awesome": [ "ccm.load",
      { "context": "head", "url": "https://ccmjs.github.io/mkaul-components/lib/fontawesome/css/font-awesome.min.css" },
      "https://ccmjs.github.io/mkaul-components/lib/fontawesome/css/font-awesome.min.css"
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
      { "context": "head", "url": "https://ccmjs.github.io/mkaul-components/lib/fontawesome/css/font-awesome.min.css" },
      "https://ccmjs.github.io/mkaul-components/lib/fontawesome/css/font-awesome.min.css"
    ],

    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/content_editor/resources/default.css' ]

  },


  "ccm": {
    key: "ccm",

    data: {
      inner: '<h1>Editor for <i>interactive</i> content</h1><p>In this editor you can insert an interactive clock <ccm-clock width="80px"></ccm-clock> in the middle of a text. This is not an image of a clock, but a live working clock.</p><p>Another example is a working interactive quiz:</p><ccm-quiz key="demo"></ccm-quiz><p>which you can insert into your text. Thereby teachers can write their interactive exercise sheets simply by editing a text.</p>',
      position: 6, // cursor position
      components: { "clock": ["ccm.component", "https://ccmjs.github.io/mkaul-components/clock/versions/ccm.clock-3.0.1.js"],
        "quiz": ["ccm.component", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-3.0.2.js"]
      }
    },

    enabled:["toggle", 'undo', 'redo', 'save_file', "bold", "h1", "h2", "indent", "outdent", "embed", "dms", "select", "ccm-clock", "ccm-content_editor", "ccm-draw_svg", "view_editor", "view_html", "view_json", "remove_editor", "stop" ],

    css_awesome: [ "ccm.load",
      { "context": "head", "url": "https://ccmjs.github.io/mkaul-components/lib/fontawesome/css/font-awesome.min.css" },
      "https://ccmjs.github.io/mkaul-components/lib/fontawesome/css/font-awesome.min.css"
    ],

    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/content_editor/resources/default.css' ],

    draw_svg: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/draw_svg/versions/ccm.draw_svg-4.0.0.js", { key: ["ccm.get", "https://ccmjs.github.io/mkaul-components/draw_svg/resources/configs.js", "small"] } ],

  },

  "recursive": {
    key: "recursive",

    data: {
      inner: '<h1>Recursive Nested Editors</h1><p>Demo Text</p><h2>Embedded Content Editor</h2><ccm-content_editor></ccm-content_editor><h2>Embedded Graphics Editor</h2><ccm-draw_svg></ccm-draw_svg>',
      position: 6 // cursor position
    },

    enabled:["toggle", 'undo', 'redo', "bold", "h1", "embed", "dms", "select", "ccm-clock", "ccm-content_editor", 'ccm-draw_svg', "view_editor", "view_html", "view_json", "view_html2json", "hide_toolbar", "remove_editor", "stop" ],

    css_awesome: [ "ccm.load",
      { "context": "head", "url": "https://ccmjs.github.io/mkaul-components/lib/fontawesome/css/font-awesome.min.css" },
      "https://ccmjs.github.io/mkaul-components/lib/fontawesome/css/font-awesome.min.css"
    ],

    draw_svg: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/draw_svg/versions/ccm.draw_svg-4.0.0.js", { key: ["ccm.get", "https://ccmjs.github.io/mkaul-components/draw_svg/resources/configs.js", "small"] } ],

    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/content_editor/resources/default.css' ]

  },

  "interactive_textbook": {
    key: "interactive_textbook",

    data: {
      inner: '<h1>Interactive Textbook Editor</h1><p>Start editing here</p>',
      position: 48 // cursor position
    },

    enabled:['undo', 'redo', 'save_file', 'toggle', 'bold', 'italic', 'underline', 'strikeThrough', 'forecolor', 'backcolor', 'hilitecolor', 'copy', 'cut', 'delete', 'insertHorizontalRule', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'insertUnorderedList', 'insertOrderedList', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'removeformat', 'makeExternalLink', 'createlink', 'unlink', 'set_anchor', 'select_anchor', 'toc', 'insertimage', 'p', 'subscript', 'superscript', 'audio', 'video', 'fontname', 'fontSize', 'embed', 'ccm-clock', 'ccm-slidecast', 'ccm-pdf_viewer', 'ccm-quiz', 'ccm-cloze', 'ccm-thumb_rating','ccm-star_rating','ccm-highchart','ccm-connect4','ccm-comment', 'ccm-live_poll' ],

    css_awesome: [ "ccm.load",
      { "context": "head", "url": "https://ccmjs.github.io/mkaul-components/lib/fontawesome/css/font-awesome.min.css" },
      "https://ccmjs.github.io/mkaul-components/lib/fontawesome/css/font-awesome.min.css"
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

    enabled: ['undo', 'redo', 'save_file', 'load_file', 'toggle', 'bold', 'italic', 'underline', 'strikeThrough', 'forecolor', 'backcolor', 'hilitecolor', 'copy', 'cut', 'delete', 'insertHorizontalRule', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'insertUnorderedList', 'insertOrderedList', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'removeformat', 'makeExternalLink', 'createlink', 'unlink', 'set_anchor', 'select_anchor', 'toc', 'insertimage', 'p', 'subscript', 'superscript', 'audio', 'video', 'embed', 'dms', 'select', 'ccm-clock', 'ccm-content_editor', 'ccm-draw_svg', 'ccm-quiz', 'fontname', 'fontSize',  "view_editor", "view_html", "view_json", "view_html2json", 'my_special_listener', "plus", "hide_toolbar", "remove_editor", "stop" ], // which toolbar buttons should be on the toolbar

    colorPalette: ['#000000', '#FF9966', '#6699FF', '#99FF66', '#CC0000', '#00CC00', '#0000CC', '#333333', '#0066FF', '#FFFFFF'],

    fontList: ['Arial', 'Arial Black', 'Helvetica', 'Times New Roman', 'Times', 'Courier New', 'Courier', 'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Impact' ],

    css_awesome: [ "ccm.load",
      { "context": "head", "url": "https://ccmjs.github.io/mkaul-components/lib/fontawesome/css/font-awesome.min.css" },
      "https://ccmjs.github.io/mkaul-components/lib/fontawesome/css/font-awesome.min.css"
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
  },

  "dataset": {
    key: "dataset",
    data: {
      "store": [ "ccm.store", 'https://ccmjs.github.io/mkaul-components/content_editor/resources/datasets.js' ],
      "key": "small"
    },
  },

  "websocket": {
    key: "websocket",
    data: {
      "store": [ "ccm.store", { "name": "content_editor", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "small"
    }
  },

  "use_case": {
    key: "use_case",

    data: {
      inner: '<h1>Use Case Template</h1><h2>Name</h2><p></p><h2>Akteure</h2><p></p><h2>Vorbedingung</h2><p></p><h2>Standardschritte</h2><p></p><h2>Ausnahmefälle</h2><p></p><h2>Nachbedingung</h2><p></p><h2>Qualitätsanforderungen</h2><p></p>',
    },

    enabled: ['undo', 'redo', 'bold', 'italic', 'insertUnorderedList', 'insertOrderedList', 'h1', 'h2', 'p', 'indent', 'outdent', 'createlink', 'unlink' ],

    "css_awesome": [ "ccm.load",
      { "context": "head", "url": "https://ccmjs.github.io/mkaul-components/lib/fontawesome/css/font-awesome.min.css" },
      "https://ccmjs.github.io/mkaul-components/lib/fontawesome/css/font-awesome.min.css"
    ],

    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/content_editor/resources/default.css' ]

  },

};
