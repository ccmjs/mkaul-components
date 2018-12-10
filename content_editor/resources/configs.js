
/**
 * @overview configs of ccm component content_editor
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "tiny": {
    key: "tiny",

    data: {
      text: '<h1>Tiny Editor</h1>Demo Text for a tiny editor',
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
      text: 'Demo Text for a <b>small</b> editor',
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
      text: 'Demo Text for medium sized editor',
      position: 6 // cursor position
    },

    // data: {
    //   "store": [ "ccm.store", { local: 'resources/dataset.json' } ],
    //   "key": "demo"
    // },

    onchange: function(){ console.log( this.getValue() ); },

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
            "inner": {
              "tag": "i",
              "class": "fa fa-unlink"
            }
          },
          {
            "tag": "a",
            "href": "#",
            "class": "click",
            "data-command": "insertimage",
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
            "style": "width: auto; margin-right: 0.2em;",
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
            "style": "width: auto; margin-right: 0.2em;",
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
            "title": "alert Hello World",
            "class": "click",
            "data-command": "my_special_listener", // editor extension
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
          }
        ]
      }
    },

    change_listener_on_key_up: true,

    extensions: [ "ccm.load", { // // editor extensions
      "url": "https://ccmjs.github.io/mkaul-components/content_editor/resources/extensions.js",
      "type": "module"
    } ],

    enabled: ['undo', 'redo', 'bold', 'italic', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'insertUnorderedList', 'insertOrderedList', 'h1', 'h2', 'createlink', 'unlink', 'p', 'fontSize' ], // which toolbar buttons should be on the toolbar

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
      text: '<h1>Audio and Video</h1>Demo Text for audio / video',
      position: 6 // cursor position
    },

    enabled:['undo', 'redo', "toggle", "bold", "h1", "h2", "indent", "outdent", "embed", "audio", "video", "ccm-clock" ]

  },


  "ccm": {
    key: "ccm",

    data: {
      text: '<h1><i>ccm</i> components</h1>Demo Text',
      position: 6 // cursor position
    },

    enabled:["toggle", 'undo', 'redo', "bold", "h1", "h2", "indent", "outdent", "embed", "dms", "select", "ccm-clock", "ccm-editor", "ccm-quiz" ]

  },

  "full": {

    key: "full",

    data: {
      text: '<h1>Full Editor with all buttons</h1>Demo Text',
      position: 6 // cursor position
    },

    // data: {
    //   "store": [ "ccm.store", { local: 'resources/dataset.json' } ],
    //   "key": "demo"
    // },

    onchange: function(){ console.log( this.getValue() ); },

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
            "inner": {
              "tag": "i",
              "class": "fa fa-unlink"
            }
          },
          {
            "tag": "a",
            "href": "#",
            "class": "click",
            "data-command": "insertimage",
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
              "inner": "[embed]",
              "class": "fa"
            }
          },
          {
            "tag": "a",
            "href": "#",
            "class": "click",
            "data-command": "dms",
            "title": "DMS-ID",
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
            "title": "select ccm component from DMS",
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
            "data-command": "ccm-editor",
            "data-enabled": '[ "toggle", "bold", "h1", "ccm-clock", "ccm-editor", "ccm-quiz" ]',
            "title": "insert nested editor",
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
            "title": "paste plain text",
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
          }
        ]
      }
    },

    change_listener_on_key_up: true,

    extensions: [ "ccm.load", { // // editor extensions
      "url": "https://ccmjs.github.io/mkaul-components/content_editor/resources/extensions.js",
      "type": "module"
    } ],

    enabled: ['undo', 'redo', 'toggle', 'bold', 'italic', 'underline', 'strikeThrough', 'forecolor', 'backcolor', 'hilitecolor', 'copy', 'cut', 'delete', 'insertHorizontalRule', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'insertUnorderedList', 'insertOrderedList', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'removeformat', 'makeExternalLink', 'createlink', 'unlink', 'insertimage', 'p', 'subscript', 'superscript', '', '', 'audio', 'video', 'embed', 'dms', 'select', 'ccm-clock', 'ccm-editor', 'ccm-quiz', 'fontname', 'fontSize', 'my_special_listener',  ], // which toolbar buttons should be on the toolbar

    colorPalette: ['#000000', '#FF9966', '#6699FF', '#99FF66', '#CC0000', '#00CC00', '#0000CC', '#333333', '#0066FF', '#FFFFFF'],

    fontList: ['Arial', 'Arial Black', 'Helvetica', 'Times New Roman', 'Times', 'Courier New', 'Courier', 'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Impact' ],

    "css_awesome": [ "ccm.load",
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
  },

  "localhost": {
    key: "localhost",
    css: [ 'ccm.load',  '../content_editor/resources/default.css' ],
    language: 'de',
    onfinish: function( instance, results ){ console.log( results ); }
  }
};
