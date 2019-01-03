/**
 * @overview ccm component for SVG Editor called draw_svg
 * @link https://github.com/santanubiswas948/draw-svg
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version latest (2.2.0)
 * @changes
 * version 2.2.0 03.01.2019 enable recursive nesting of editors 
 * version 2.1.0 01.01.2019 make ccm components configurable via button configs
 * version 2.0.0 01.01.2019 add keyboard events, Undo Management, removeUnfinishedObject
 * version 1.0.0 26.12.2018 initial build
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
    name: 'draw_svg',
    version: [2,2,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.6.7.min.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      data: { // initial SVG diagram to be edited
        inner: {
          "tag": "svg",
          "id": "svg",
          "width": "100%",
          "height": "100%",
          "margin": 0,
          "padding": 0,
          "inner": [
            {
              "tag": "rect",
              "x": 50,
              "y": 50,
              "width": 50,
              "height": 50,
              "fill": "lightgreen",
              "stroke": "green",
              "stroke-width": 4
            },
            {
              "tag": "text",
              "inner": "Choose free drawing button and press mouse to draw",
              "x": 70,
              "y": 80
            }
          ]
        }
      },

      // data: {  // fetched from store
      //   "store": [ "ccm.store", { local: 'resources/dataset.json' } ],
      //   "key": "demo"
      // },

      // onchange: function(){ console.log( this.getValue() ); },

      html: {
        toolbar: {
          "class": "toolbar",
          "inner": [
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "clear_image",
              "title": "clear image",
              "data-help": "delete all",
              "style": "width: auto;",
              "inner": {
                "tag": "i",
                "class": "fa fa-eraser"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "undo",
              "title": "Undo last change",
              "data-help": "",
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
              "title": "Redo last change",
              "data-help": "",
              "inner": {
                "tag": "i",
                "class": "fa fa-repeat"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "change",
              "style": "width: auto;",
              "data-command": "color",
              "title": "Color: Changes color of line",
              "data-help": "Choose color!",
              "inner": [
                {
                  "tag": "input",
                  "type": "color"
                }
              ]
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "title": "free hand drawing",
              "data-command": "free",
              "data-help": "Press mouse and draw!",
              "inner": {
                "tag": "svg",
                "viewBox": "0 0 100 100",
                "width": "1em",
                "height": "0.9em",
                "xmlns": "http://www.w3.org/2000/svg",
                "inner": [
                  {
                    "tag": "path",
                    "d": "M 12 19 C 12 12 35 12 38 17 C 41 22 39 26 37 31 C 35 37 9 42 21 54 C 23 56 38 49 39 48 C 45 45 62 32 66 40 C 73 54 59 60 48 63 C 43 65 31 67 33 74 C 35 81 44 81 49 81 C 66 81 72 72 86 65 C 93 62 91 83 89 83",
                    "style": "stroke: rgb(0, 0, 0); fill: none; stroke-width: 8px;"
                  }
                ]
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "title": "insert line",
              "data-help": "",
              "data-command": "line",
              "style": "width: auto; ",
              "inner": {
                "tag": "svg",
                "width": "1em",
                "height": "0.9em",
                "viewBox": "0 0 100 100",
                "xmlns": "http://www.w3.org/2000/svg",
                "inner": [
                  {
                    "tag": "line",
                    "x1": 5,
                    "y1": 95,
                    "x2": 95,
                    "y2": 5,
                    "fill": "#eee",
                    "stroke-width": 8,
                    "stroke": "#000"
                  }
                ]
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "title": "insert rectangle",
              "data-help": "",
              "data-command": "rect",
              "style": "width: auto; ",
              "inner": {
                "tag": "svg",
                "width": "1em",
                "height": "0.9em",
                "viewBox": "0 0 100 100",
                "xmlns": "http://www.w3.org/2000/svg",
                "inner": [
                  {
                    "tag": "rect",
                    "x": 0,
                    "y": 0,
                    "width": 90,
                    "height": 90,
                    "fill": "#eee",
                    "stroke-width": 10,
                    "stroke": "#000"
                  }
                ]
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "title": "insert circle",
              "data-help": "",
              "data-command": "circle",
              "style": "width: auto;",
              "inner": {
                "tag": "svg",
                "width": "1em",
                "height": "0.9em",
                "viewBox": "0 0 100 100",
                "xmlns": "http://www.w3.org/2000/svg",
                "inner": [
                  {
                    "tag": "circle",
                    "cx": 50,
                    "cy": 50,
                    "r": 45,
                    "fill": "#eee",
                    "stroke-width": 10,
                    "stroke": "#000"
                  }
                ]
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "title": "insert text",
              "data-help": "",
              "data-command": "text",
              "inner": {
                "tag": "i",
                "class": "fa",
                "inner": "T"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "title": "insert HTML even via copy paste",
              "data-help": "",
              "style": "width: auto;",
              "data-command": "html",
              "inner": {
                "tag": "i",
                "class": "fa",
                "inner": "html"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "title": "insert HTML page via HTTP request",
              "data-help": "insert complete HTML page",
              "style": "width: auto;",
              "data-command": "html_page",
              "inner": {
                "tag": "i",
                "class": "fa",
                "inner": "HTML"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "ccm-clock",
              "title": "insert live Clock",
              "data-help": "",
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
              "data-help": "",
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
              "data-command": "save_image",
              "title": "",
              "data-help": "",
              "inner": {
                "tag": "i",
                "class": "fa fa-save"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "load_image",
              "title": "Load SVG image",
              "data-help": "Enter HTTP address of SVG image!",
              "inner": {
                "tag": "i",
                "class": "fa fa-download"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "embed",
              "title": "embed code, e.g. Youtube",
              "data-help": "",
              "style": "width: auto;",
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
              "title": "DMS-ID",
              "data-help": "",
              "style": "width: auto;",
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
              "data-help": "",
              "style": "width: auto;",
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
              "data-command": "view_editor",
              "title": "switch to editor view",
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
              "style": "width: auto;",
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
              "style": "width: auto;",
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
              "style": "width: auto;",
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
              "class": "click",
              "data-command": "stop",
              "title": "stop and call debugger",
              "style": "width: auto; color: red;",
              "inner": {
                "class": "fa fa-stop",
                "tag": "i"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "title": "add your own button to the toolbar",
              "data-help": "",
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
              "data-help": "Hide toolbar. Double click to regain it.",
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
              "data-help": "Remove Editor completely and replace it by graphics only",
              "data-command": "remove_editor",
              "class": "click",
              "inner": {
                "class": "fa fa-window-close",
                "tag": "i"
              }
            },
            {
              "class": "position",
              "title": "X position of cursor",
              "inner": [
                {
                  "tag": "label",
                  "for": "mouse-x",
                  "inner": " x = "
                },
                {
                  tag: "input",
                  type: "number",
                  style: "width: 4em;",
                  id: "mouse-x"
                }
              ]
            },
            {
              "class": "position",
              "title": "Y position of cursor",
              "inner": [
                {
                  "tag": "label",
                  "for": "mouse-y",
                  "inner": " y = "
                },
                {
                  tag: "input",
                  type: "number",
                  style: "width: 4em;",
                  id: "mouse-y"
                }
              ]
            }
         ]
        },
        helpbar: {
          "id": "help_div",
          "inner": "Press button to begin."
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
        editor: {
          "id": "draw_div",
          // "contentEditable": "true"
        },
        plus: {
          "tag": "a",
          "href": "#",
          "title": "add your own buttons",
          "data-help": "enter name of button and HTTP address of helper function",
          "data-command": "plus_action",
          "data-address": "%actionAddress%",
          "data-action": "%buttonName%",
          "style": "width: auto;",
          "class": "click",
          "inner": {
            "class": "fa",
            "tag": "i",
            "inner": "%buttonName%"
          }
        }
      },

      // enabled: ['undo', 'redo', 'color', 'text', 'html', 'line', 'rect', 'circle', 'ccm-clock', 'ccm-content_editor', 'ccm-draw_svg', 'ccm-quiz', 'save_image', 'clear_image', 'plus' ],

      stroke_width: 2.2,
      updata_data_event: 'mouseleave',  // or mouseup etc
      stopPaintingIntoCCM: true, // if drawing into nested ccm components is prohibited
      textStyle: 'font: bold 30px sans-serif;',
      helpText: {
        init: 'Press button!',
        insert: 'Move object to its position!',
        resize: 'Resize the object!',
        nextObject: 'Click to insert similar object!',
        load_image_prompt: 'Please enter Image URL:',
        load_image_default: 'https://ccmjs.github.io/mkaul-components/paper_generator/resources/icon.svg',
        embed_prompt: 'Enter embed code here',
        embed_default: 'html_or_svg_embed_code',
        dms_prompt: 'Enter component name here',
        dms_default: 'clock',
        dms_id_prompt: 'Enter DMS-ID here',
        dms_id_default: '1544379440973X6301133529121039',
        extension_prompt: 'Enter button name',
        extension_default: 'my_special_listener',
        extension_url_prompt: 'Enter HTTPS address of Button Action',
        extension_url_default: 'https://ccmjs.github.io/mkaul-components/content_editor/resources/extensions.js',
        text_prompt: 'Enter text',
        text_default: 'your text here',
        page_url_prompt: 'HTTP address of the HTML page to be imported',
        page_url_default: 'https://ccmjs.github.io/mkaul-components/',
        setupCancelled: 'Setup cancelled!'
      },

      dms_url: "https://ccm2.inf.h-brs.de",

      store: [ "ccm.store", { "name": "components", "url": "https://ccm2.inf.h-brs.de" } ],

      clock: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/clock/versions/ccm.clock-3.0.1.js", {
        width: "100%",
        html: { main: { id: 'main', inner: [ { id: 'clock' } ] }
        }
      } ],

      content_editor: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/content_editor/versions/ccm.content_editor-4.9.0.js", { key: ["ccm.get","https://ccmjs.github.io/mkaul-components/content_editor/resources/configs.js","small"] } ],

      // content_editor: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/content_editor/versions/ccm.content_editor-4.8.0.js", { key: ["ccm.get","https://ccmjs.github.io/mkaul-components/content_editor/resources/configs.js","small"] } ],

      quiz: [ "ccm.component", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-3.0.1.js", { key: ["ccm.get","https://ccmjs.github.io/akless-components/quiz/resources/configs.js","demo"] } ],

      json_builder: [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.2.0.js", {
        "html.inner.1": "",
        "directly": true
      } ],

      html2json_module: [ "ccm.load", {
        "url": "https://ccmjs.github.io/mkaul-components/content_editor/resources/html2json.mjs",
        "type": "module"
      } ],

      html2json: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/html2json/ccm.html2json.js" ],

      css_awesome: [ "ccm.load",
        { context: "head",
          url: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        },
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ],
      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/draw_svg/resources/default.css' ],
      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/draw_svg/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/draw_svg/resources/configs.js', 'log' ] ],
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
       * Cache all ccm components from DMS. Store them as key-value pairs with name and URL
       * @type {Object}
       */
      let DMS_component_index = null;

      const dms_index = async () => {  // lazy load DMS on demand only
        if ( DMS_component_index ) return DMS_component_index; else {

          DMS_component_index = {};

          const data = await self.store.get({});

          const all_buttons = self.html.toolbar.inner;
          let select_array;
          if ( all_buttons ) for ( const button of all_buttons ){
            if ( button["data-command"] === "select" ){ // "data-command": "select"
              if ( button.inner ){
                select_array = button.inner.inner;
              }
              break;
            }
          }

          for ( const record of data ){
            select_array && select_array.push( { tag: 'option', value: record.key, inner: record.key } );
            // with version number
            DMS_component_index[ $.getIndex( record.url ) ] = record.url;
            // without version number
            DMS_component_index[ record.key ] = record.url;
          }

          select_array && select_array.sort((a,b)=>  ('' + a.value).localeCompare(b.value) );
        }

        return DMS_component_index;
      };

      /**
       * dataset for rendering
       * The value of dataset starts with a clone of this.data,
       *     but additional values might be added during editing.
       * this.data is never changed, only dataset is changed.
       * @type {Object}
       */
      let dataset;
      
      /**
       * init is called once after all dependencies are solved and is then deleted
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // get data from config or remote database
        dataset = await $.dataset( this.data );

        if ( typeof dataset === 'string' ) dataset = { inner: dataset };

        // Use LightDOM with higher priority than data from config
        if ( this.inner ){

          // Light DOM is given as ccm JSON data? => convert to HTML DOM Elements
          if ( $.isObject( this.inner ) && !$.isElementNode( this.inner ) )
            this.inner = $.html( this.inner );

          // dynamic replacement of placeholders
          if ( this.placeholder ) [ ...this.inner.children ].forEach( child => child.innerHTML = $.format( child.innerHTML, this.placeholder ) );

          dataset.inner = this.inner;
        }

        if ( ! dataset ) dataset = {};

        // initialize dataset.components if necessary
        if ( ! dataset.components ) dataset.components = {};

      };

      /**
       * is called once after the initialization and is then deleted
       */
      this.ready = async () => {
        if ( ! self.enabled || ( self.enabled && self.enabled.includes('select') ) ){
          await dms_index();
        }
      };

        
      /**
       * starts the instance
       */
      this.start = async () => {

        self.color = dataset.color || '#000'; // black

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // add keyboard events
        const oldKeyListener = document.onkeydown;
        document.addEventListener('keydown', function( evt ) {
          evt = evt || window.event;
          var isEscape = false;
          if ("key" in evt) {
            switch (evt.key) {
              case "Escape":
              case "Esc":
                svg_div.removeEventListener('mousemove', drawNow );
                self.state = null;
                removeUnfinishedObject();
                help_div.innerText = self.helpText.setupCancelled;
                break;
              case "Backspace":
                self.currentObject && self.currentObject.remove();
                help_div.innerText = self.helpText.init;
                break;
              case "c": // TODO
                // if ( evt.metaKey ){
                //   const data = new DataTransfer();
                //   data.items.add(self.currentObject.outerHTML, "text/plain" );
                //   data.items.add(self.currentObject.outerHTML , 'text/html' );
                //   data.items.add(self.currentObject.outerHTML , 'image/svg+xml' );
                //   data.items.add(self.currentObject.outerHTML , 'application/xml, text/xml' );
                //   // data.items.add(self.currentObject.outerHTML , 'application/xhtml+xml' );
                //   // data.items.add(self.html2json_module.html2json( self.currentObject.outerHTML ), 'application/json' );
                //   // data.items.add( self.currentObject.outerHTML, "text/html" );
                //   navigator.clipboard.write(data).then(function() {
                //     console.log( data );
                //   }, function() {
                //     console.error("Unable to write to clipboard. :-(");
                //   });
                // }
                break;
              case "v": // TODO
                // if ( evt.metaKey ){
                //   navigator.clipboard.read().then(function(data) {
                //     for (let i = 0; i < data.items.length; i++) {
                //       if ((data.items[i].kind === 'string') && (data.items[i].type.match('^text/plain'))) {
                //         // This item is the target node
                //         data.items[i].getAsString(function (s){
                //           console.log( s );
                //         });
                //       } else if ((data.items[i].kind === 'string') && (data.items[i].type.match('^text/html'))) {
                //         // Drag data item is HTML
                //         data.items[i].getAsString(function (s){
                //           console.log( 'text/html', s );
                //           const newChild = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                //           newChild.innerHTML = s;
                //           svg_div.appendChild( newChild );
                //         });
                //       } else if ((data.items[i].kind === 'string') && (data.items[i].type.match('^text/uri-list'))) {
                //         // Drag data.items item is URI
                //         data.items[i].getAsString(function (s){
                //           console.log("... Drop: URI = " + s);
                //         });
                //       }
                //     }
                //   });
                // }
                break;
              case "x": // TODO
                // if ( evt.metaKey ) newCutListener(evt);
                break;
              case "ArrowRight":
                self.currentObject && self.currentObject.setStateXAttribute(self.currentObject.getStateXAttribute() + 1);
                mouse_x.value = parseInt( mouse_x.value ) + 1;
                break;
              case "ArrowLeft":
                self.currentObject && self.currentObject.setStateXAttribute(self.currentObject.getStateXAttribute() - 1);
                mouse_x.value -= 1;
                break;
              case "ArrowUp":
                self.currentObject && self.currentObject.setStateYAttribute(self.currentObject.getStateYAttribute() - 1);
                mouse_y.value -= 1;
                break;
              case "ArrowDown":
                self.currentObject && self.currentObject.setStateYAttribute(self.currentObject.getStateYAttribute() + 1);
                mouse_y.value = parseInt( mouse_y.value ) + 1;
                break;
              case "Shift":
                break;
              case "Control":
                break;
              case "Alt":
                break;
              case "Meta":
                break;
              case "Enter":
                break;
              case "Tab":
                break;
              default:
                // debugger;  // de-comment for adding new keys
            }
          }
          oldKeyListener && oldKeyListener( evt );
        } );

        /**
         *
         * https://w3c.github.io/clipboard-apis/#override-copy
         */
        // const oldCopyListener = document.oncopy;
        // // ToDo
        // const newCopyListener = function(e) {
        //   // e.clipboardData is initially empty, but we can set it to the
        //   // data that we want copied onto the clipboard.
        //   // format see https://w3c.github.io/clipboard-apis/#reading-from-clipboard
        //   e.clipboardData.setData('text/plain', self.currentObject.outerHTML );
        //   e.clipboardData.setData('text/html', self.currentObject.outerHTML );
        //   e.clipboardData.setData('image/svg+xml', self.currentObject.outerHTML );
        //   e.clipboardData.setData('application/xml, text/xml', self.currentObject.outerHTML );
        //   e.clipboardData.setData('application/xhtml+xml', self.currentObject.outerHTML );
        //   e.clipboardData.setData('application/json', self.html2json_module.html2json( self.currentObject.outerHTML ) );
        //
        //   // This is necessary to prevent the current document selection from
        //   // being written to the clipboard.
        //   e.preventDefault();
        // };
        // document.addEventListener('copy', newCopyListener );

        /**
         *
         * https://w3c.github.io/clipboard-apis/#override-paste
         */
        // const oldPasteListener = document.onpaste;
        // // ToDo
        // const newPasteListener = function(e) {
        //   // e.clipboardData is initially empty, but we can set it to the
        //   // data that we want copied onto the clipboard.
        //   const newChild = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        //   svg_div.appendChild( newChild );
        //   const data1 = e.clipboardData.getData('text/plain');
        //   const data2 = e.clipboardData.getData('text/html');
        //   const data3 = e.clipboardData.getData('image/svg+xml');
        //   const data4 = e.clipboardData.getData('application/xml, text/xml');
        //   const data5 = e.clipboardData.getData('application/xhtml+xml');
        //   const data6 = $.html( e.clipboardData.getData('application/json') );
        //
        //   // This is necessary to prevent the current document selection from
        //   // being written to the clipboard.
        //   e.preventDefault();
        // };
        // document.addEventListener('paste', newPasteListener );

        /**
         *
         * https://w3c.github.io/clipboard-apis/#override-cut
         */
        const oldCutListener = document.oncut;
        const newCutListener = function(e) {
          // e.clipboardData is initially empty, but we can set it to the
          // data that we want copied onto the clipboard.
          e.clipboardData.setData('text/plain', self.currentObject.outerHTML );
          e.clipboardData.setData('text/html', self.currentObject.outerHTML );

          self.currentObject.remove();

          // This is necessary to prevent the current document selection from
          // being written to the clipboard.
          e.preventDefault();
        };
        document.addEventListener('cut', newCutListener );

        const editor_div = $.html( self.html.editor );
        // ToDo check editor_div.contentEditable = "true";
        if ( ! dataset.inner ) dataset = { inner: {
            "tag": "svg",
            "id": "svg",
            "width": "100%",
            "height": "100%",
            "margin": 0,
            "padding": 0,
            "inner": []}
        };
        editor_div.appendChild( $.html( dataset.inner ) );
        if ( ! editor_div.querySelector('#svg') ){
          editor_div.appendChild( $.html( {
            "tag": "svg",
            "id": "svg",
            "width": "100%",
            "height": "100%",
            "margin": 0,
            "padding": 0,
            "inner": []
          } ) );
        }

        editor_div.addEventListener(self.updata_data_event, function(e){
          updateData();
        });

        /**
         * refresh dataset after editing
         */
        function updateData(){
          dataset.inner = editor_div.innerHTML;
          self.onchange && self.onchange();
        }

        // filter enabled tools
        if ( self.enabled && self.html.toolbar.inner ){
          self.html.toolbar.inner = self.html.toolbar.inner.filter(tool=>self.enabled.includes(tool['data-command']) || ! tool['data-command'] );
        }

        const toolbar_div = $.html( self.html.toolbar );

        // add click event listener
        [...toolbar_div.querySelectorAll('.click')].forEach( tool => {
          tool.addEventListener('click', toolbarClickListener.bind( tool ) );
        });

        // add change event listener
        [...toolbar_div.querySelectorAll('.change')].forEach( tool => {
          tool.addEventListener('change', toolbarChangeListener.bind( tool ) );
        });

        // render main HTML structure
        const help_div = $.html( self.html.helpbar || {} );
        const html_div = $.html( self.html.html || {} );
        const json_div = $.html( self.html.json || {} );
        const html2json_div = $.html( self.html.html2json || {} );
        $.setContent( self.element, $.html( [ toolbar_div, help_div, html_div, json_div, html2json_div, editor_div ] ) );

        // SVG hack: paint all svg icons which are inside the DOM but not painted
        [...self.element.querySelectorAll('svg')].forEach(svg=>{
          svg.parentNode.innerHTML += '';
        });

        const draw_div = self.element.querySelector('#draw_div');
        const svg_div = self.element.querySelector('#svg');
        const mouse_x  = self.element.querySelector('#mouse-x');
        const mouse_y  = self.element.querySelector('#mouse-y');
        const mouseMoveToolbarListener = (evt)=> {
          if ( self.currentObject && self.currentObject.position ){
            [ mouse_x.value, mouse_y.value ] = self.currentObject.position(evt).map( x => parseInt(x) || 100 );
          } else {
            mouse_x.value =  evt.pageX - getPositionX(svg_div)-getPositionX(draw_div);
            mouse_y.value =  evt.pageY - getPositionY(svg_div)-getPositionY(draw_div);
          }
        };
        addListener( 'mousemove', mouseMoveToolbarListener );
        mouse_x.addEventListener('change', function(evt){
          self.currentObject.setStateXAttribute( this.value );
        });
        mouse_y.addEventListener('change', function(evt){
          self.currentObject.setStateYAttribute( this.value );
        });


        const undoStack = [];
        const redoStack = [];

        const draw_obj={
          prevX : 0,
          prevY : 0,
          flag  : 0,
          flag1  : 0,
          total_polygon  : 0,
          draw : () => {
            //start time of draw
            addListener('mousedown',(e)=>{
              if ( self.state === 'free' ){
                e.stopPropagation();
                e.preventDefault();
                addListener('mousemove', drawNow );
              }
            });
            //draw end time
            addListener('mouseup',(e)=>{
              svg_div.removeEventListener('mousemove', drawNow );
              if ( self.state === 'free' ){
                e.stopPropagation();
                e.preventDefault();
                draw_obj.prevX=0;
                draw_obj.prevY=0;
              }
            });
          }

        };

        draw_obj.draw();

        function drawNow( evt ) {
          evt.stopPropagation();
          evt.preventDefault();
          let positionX=evt.pageX - getPositionX(svg_div)-getPositionX(draw_div);
          let positionY=evt.pageY - getPositionY(svg_div)-getPositionY(draw_div);
          if(draw_obj.prevX===0) {
            draw_obj.prevX=positionX;
            draw_obj.prevY=positionY;
            draw_obj.flag=1;
          } else {
            if(draw_obj.flag===1) {
              let prevX=draw_obj.prevX;
              let prevY=draw_obj.prevY;
              const path = new SvgElement({
                'd' : "M"+prevX+","+prevY+" L"+positionX+","+positionY,
                'fill' : 'none',
                'stroke' : self.color,
                'stroke-width' : self.stroke_width,
                'id' : 'path'+(svg_div.children.length+1),
              });
              svg_div.appendChild( path );
              const undoAction = {
                undo: _ => {
                  if ( path.parentNode === svg_div ){
                    svg_div.removeChild( path );
                    redoStack.push( undoAction );
                  }
                },
                redo: _ => {
                  svg_div.appendChild( path );
                  undoStack.push( undoAction );
                },
                node: path
              };
              undoStack.push( undoAction );

              draw_obj.flag=0;
              draw_obj.prevX=positionX;
              draw_obj.prevY=positionY;
            } else {
              const lastchildPath=self.element.querySelector('#path'+(svg_div.children.length));
              if ( lastchildPath ){
                const get_d_attr=lastchildPath.getAttribute('d');
                const curvX=(draw_obj.prevX+positionX)/2;
                const curvY=(draw_obj.prevY+positionY)/2;
                lastchildPath.setAttribute('d',get_d_attr+" C"+curvX+","+curvY+" "+curvX+","+curvY+" "+positionX+","+positionY);
              }
              draw_obj.prevX=positionX;
              draw_obj.prevY=positionY;
            }
          }
        }

        //For getting X position
        function getPositionX(elem) {
          let x=0;
          do{
            if(!isNaN(elem.offsetLeft)) {
              x +=elem.offsetLeft;
            }
          } while (elem=elem.offsetParent);
          return x;
        }

        //For getting Y Position
        function getPositionY(elem) {
          let y=0;
          do{
            if(!isNaN(elem.offsetTop)) {
              y +=elem.offsetTop;
            }
          } while (elem=elem.offsetParent);
          return y;
        }

        // create SVG Path or any other SVG element


        /**
         * create SVG Path or any other SVG element
         * @param obj - all attributes of the new SVG element
         * @param type - the type of the SVG element
         * @returns {HTMLElement | SVGAElement | SVGCircleElement | SVGClipPathElement | SVGComponentTransferFunctionElement | SVGDefsElement | SVGDescElement | SVGEllipseElement | SVGFEBlendElement | SVGFEColorMatrixElement | SVGFEComponentTransferElement | SVGFECompositeElement | SVGFEConvolveMatrixElement | SVGFEDiffuseLightingElement | SVGFEDisplacementMapElement | SVGFEDistantLightElement | SVGFEFloodElement | SVGFEFuncAElement | SVGFEFuncBElement | SVGFEFuncGElement | SVGFEFuncRElement | SVGFEGaussianBlurElement | SVGFEImageElement | SVGFEMergeElement | SVGFEMergeNodeElement | SVGFEMorphologyElement | SVGFEOffsetElement | SVGFEPointLightElement | SVGFESpecularLightingElement | SVGFESpotLightElement | SVGFETileElement | SVGFETurbulenceElement | SVGFilterElement | SVGForeignObjectElement | SVGGElement | SVGImageElement | SVGGradientElement | SVGLineElement | SVGLinearGradientElement | SVGMarkerElement | SVGMaskElement | SVGPathElement | SVGMetadataElement | SVGPatternElement | SVGPolygonElement | SVGPolylineElement | SVGRadialGradientElement | SVGRectElement | SVGSVGElement | SVGScriptElement | SVGStopElement | SVGStyleElement | SVGSwitchElement | SVGSymbolElement | SVGTSpanElement | SVGTextContentElement | SVGTextElement | SVGTextPathElement | SVGTextPositioningElement | SVGTitleElement | SVGUseElement | SVGViewElement | SVGElement | Element}
         * @constructor
         */
        function SvgElement(obj, type='path' ) {
          let path=document.createElementNS('http://www.w3.org/2000/svg',type);
          for(let prop in obj) {
            path.setAttribute(prop,obj[prop]);
          }
          return path;
        }

        function addListener( type, listener ){
          if ( svg_div[ 'on' + type ] ){
            const oldListener = svg_div[ 'on' + type ];
            if ( mouseMoveToolbarListener !== oldListener ){
              debugger;
              svg_div.removeEventListener( type, oldListener );
            }
          }
          svg_div.addEventListener( type, listener );
        }

        class SvgObject {

          constructor( obj, type='path' ){
            this.type = type;
            this.node = new SvgElement( obj, type );
            this.obj = obj;
            this.attributeNames = Object.keys( obj );
            if ( this.attributeNames.length === 0 ) this.attributeNames = ['x1','y1','x2','y2']; // default

            this.color_input = toolbar_div.querySelector("a[data-command='color'] > input");
            this.colorListener = this.color_listener_template();
            this.color_input.addEventListener('change', this.colorListener );

            self.currentObject = this;

            this.setup();
          }

          toString(){
            return `${this.constructor.toString()}[${this.state()}]`;
          }

          /**
           * object may have 4 different states in the setup procedure
           * @returns {string}
           */
          state(){
            if ( self.currentClickListener === this.clickListener1 ) return "move";
            if ( self.currentClickListener === this.clickListener2 ) return "resize";
            if ( self.currentObject === this ) return "active";
            return "passive";
          }

          position(evt){
            if ( this.node ){
              switch ( this.state() ){
                case "move":
                  return [
                    this.getAttribute( 0 ),
                    this.getAttribute( 1 )
                  ];
                case "resize":
                  return [
                    this.getAttribute( 2 ),
                    this.getAttribute( 3 )
                  ];
              }
            }
            return [
              evt.pageX - getPositionX(draw_div) - getPositionX(svg_div),
              evt.pageY - getPositionY(draw_div) - getPositionY(svg_div)
            ];
          }

          getAttribute( nr ){
            return parseInt( this.node.getAttribute( this.attributeNames[ nr ] ) );
          }

          setAttribute( nr, value ){
            this.node.setAttribute( this.attributeNames[ nr ], value );
          }

          getStateXAttribute(){
            if ( this.state() === "resize" ) return this.getAttribute( 2 );
            return this.getAttribute( 0 );
          }

          getStateYAttribute(){
            if ( this.state() === "resize" ) return this.getAttribute( 3 );
            return this.getAttribute( 1 );
          }

          setStateXAttribute( value ){
            if ( this.state() === "resize" ){
              this.setAttribute( 2, value );
            } else {
              this.setAttribute( 0, value );
            }
          }

          setStateYAttribute( value ){
            if ( this.state() === "resize" ){
              this.setAttribute( 3, value );
            } else {
              this.setAttribute( 1, value );
            }
          }

          /**
           * set up new SVG Object in 2 steps:
           *   1. move object to its proper position
           *   2. resize object
           */
          setup(){
            if ( this.constructor.setupParams ){
              this.attributeNames = this.constructor.setupParams;
            }
            const newNode = (self.currentObject.node || this.node).cloneNode(true);
            undoStack.push( this.undoTemplate( newNode ) );
            this.node = newNode;

            this.mouse_leave_listener = this.mouse_leave_template();
            addListener( 'mouseleave', this.mouse_leave_listener );

            this.moveX1Y1 = this.moveListener_template1( this.attributeNames[0], this.attributeNames[1] );
            this.moveX2Y2 = this.moveListener_template2( this.attributeNames[2], this.attributeNames[3],
              (pos) => Math.abs( parseInt( this.getAttribute(0) ) - pos ),
              (pos) => Math.abs( parseInt( this.getAttribute(1) ) - pos )
            );

            this.clickListener1 = this.clickListener1_template();
            this.clickListener2 = this.clickListener2_template();

            self.currentObject = this;
            addListener( 'mousemove', this.moveX1Y1 );
            svg_div.appendChild( newNode );
            help_div.innerText = self.helpText.insert;

            addListener( 'click', this.clickListener1 );
            self.currentClickListener = this.clickListener1;

          }

          /**
           * template for click listener 1 for the first step of setup
           * override in subclasses
           * @returns {Function} click listener 1
           */
          clickListener1_template(){
            return (evt) => {
              self.currentObject = this;
              svg_div.removeEventListener( 'mousemove', this.moveX1Y1 );
              addListener( 'mousemove', this.moveX2Y2 );
              svg_div.removeEventListener( 'click', this.clickListener1 );
              addListener( 'click', this.clickListener2 );
              self.currentClickListener = this.clickListener2;
              help_div.innerText = self.helpText.resize;
            }
          }

          /**
           * template for click listener 2 for the second step of setup
           * override in subclasses
           * @returns {Function} click listener 2
           */
          clickListener2_template(){
            return (evt) => {
              self.currentObject = this;
              svg_div.removeEventListener('mousemove', this.moveX2Y2);
              svg_div.removeEventListener('click', this.clickListener2);
              this.removeAllListeners();
              this.addMinimalListeners();
              clear_current();
              if ( evt.shiftKey ){
                help_div.innerText = self.helpText.nextObject;
                self.currentObject = this.nextNode();
              } else {
                help_div.innerText = self.helpText.init;
              }
             }
          }

          nextNode(){
            const newObject = new this.constructor( this.obj, this.type );
            self.currentObject = newObject;
            return newObject; // includes setup
          }

          /**
           * template for move listeners for SVG objects to be placed into the diagram
           * @param x {String} first attribute name
           * @param y {String} second attribute name
           * @param funx {Function} reposition mapping
           * @param funy {Function} reposition mapping
           * @returns {Function} listener
           */
          moveListener_template(x, y, funx, funy ){
            return (evt) => {
              const positionX = evt.pageX - getPositionX(svg_div)-getPositionX(draw_div);
              const positionY = evt.pageY - getPositionY(svg_div)-getPositionY(draw_div);
              this.node.setAttribute(x,funx?funx(positionX):positionX);
              this.node.setAttribute(y,funy?funy(positionY):positionY);
              this.obj[x] = funx?funx(positionX):positionX;
              this.obj[y] = funy?funy(positionY):positionY;
            };
          }

          moveListener_template1(x, y, funx, funy ){
            return this.moveListener_template(x, y, funx, funy );
          }

          moveListener_template2(x, y, funx, funy ){
            return this.moveListener_template(x, y, funx, funy );
          }

          color_listener_template(){
            return (e)=> {
              this.node.setAttribute('fill', this.color_input.value );
            }
          }

          mouse_leave_template(){  // cancel setup
            return (e) => {
              if ( !e || e.target === svg_div ){  // only if mouse leaves svg_div
                removeUnfinishedObject();
                help_div.innerText = self.helpText.init;
              }
            };
          }

          remove(){
            if ( this.node.parentNode === svg_div ){
              svg_div.removeChild( this.node );
              redoStack.push( this.undoTemplate() );
            }
          }

          removeAllListeners(){
            svg_div.removeEventListener('mouseleave', this.mouse_leave_listener);
            svg_div.removeEventListener( 'mousemove', this.moveX1Y1 );
            svg_div.removeEventListener( 'mousemove', this.moveX2Y2 );
            svg_div.removeEventListener( 'click', this.clickListener1 );
            svg_div.removeEventListener( 'click', this.clickListener2 );
            this.color_input.removeEventListener('change', this.colorListener );
          }

          addMinimalListeners(){
            if ( ! this.node ) return;
            if ( ! this.node.onclick ) this.node.addEventListener('click', e => {
              // make this object active
              self.currentObject = this;
            });
            if ( ! this.node.ondblclick ) this.node.addEventListener('dblclick', e => {
              // new setup again
              addListener( 'mousemove', this.moveX1Y1 );
              addListener( 'click', this.clickListener1 );
              self.currentClickListener = this.clickListener1;
              self.currentObject = this;
            });
          }

          /**
           * create Undo object
           * @param obj instance of SVGObject
           * @param newNode instance of Node in DOM
           * @returns {{undo: undoAction, redo: redoAction}}
           */
           undoTemplate( newNode ){
            if ( ! newNode ) newNode = this.node;
            const action = {
              undo: _ => {
                if ( newNode && newNode.parentNode === svg_div ) {
                  svg_div.removeChild( newNode );
                  redoStack.push( action );
                }
              },
              redo: _ => {
                svg_div.appendChild( newNode );
                undoStack.push( action );
              },
              node: newNode,
              obj: this
            };
            return action;
          }


        }


        class SvgLine extends SvgObject {
          constructor( obj ){
            super( obj, 'line' );
          }

          /**
           * template for move listeners for SVG lines to be placed into the diagram
           * @returns {Function} listener
           */
          moveListener_template1(){
            return (evt) => {
              const positionX = evt.pageX - getPositionX(svg_div)-getPositionX(draw_div);
              const positionY = evt.pageY - getPositionY(svg_div)-getPositionY(draw_div);
              const width = this.getAttribute( 2 ) - this.getAttribute( 0 );
              const height = this.getAttribute( 3 ) - this.getAttribute( 1 );
              this.setAttribute( 0, positionX );
              this.setAttribute( 1, positionY );
              this.setAttribute( 2, positionX+width );
              this.setAttribute( 3, positionY+height );
            };
          }

          /**
           * template for move listeners for SVG lines to be placed into the diagram
           * @returns {Function} listener
           */
          moveListener_template2(){
            return (evt) => {
              const positionX = evt.pageX - getPositionX(svg_div)-getPositionX(draw_div);
              const positionY = evt.pageY - getPositionY(svg_div)-getPositionY(draw_div);
              this.setAttribute( 2, positionX );
              this.setAttribute( 3, positionY );
            };
          }

        }

        class SvgCircle extends SvgObject {
          constructor( obj ){
            super( obj, 'circle' );
          }
          static get setupParams(){
            return [ 'cx', 'cy', 'r' ];
          }
        }

        class SvgText extends SvgObject {
          constructor( obj, content ){
            super( obj, 'text' );
            this.node.setAttribute( 'class', 'svgtext');
            this.node.setAttribute( 'fill', self.color);
            const textNode = document.createTextNode(content);
            this.node.appendChild(textNode);
            draw_div.contentEditable = "true"; // see https://codepen.io/soffes/pen/RRmLgO
          }
          static get setupParams(){
            return [ 'x', 'y', 'textLength' ];
          }
        }

        class SvgForeignObject extends SvgObject {
          constructor( obj, div ){
            super( obj, 'foreignObject' );
            if ( div instanceof Element ) this.node.appendChild( div );
          }
          static get setupParams(){
            return [ 'x', 'y', 'width', 'height' ];
          }

          async nextNode(){
            super.nextNode( this );
            await insertNextComponent({ component: this.component, config: this.config } );
          }
        }

        // ToDo Wrapper for svg fragments, e.g. load image
        class SvgWrapper extends SvgObject {
          constructor( node ){
            super();
            this.node = node;
            // this.node.setAttribute('stroke', 'black');
            // this.node.setAttribute('fill-opacity', 0.2);
            self.currentObject = this;
          }
        }

        /**
         * the same toolbar click listener for all tools
         * @param e
         * @returns {Promise<void>}
         */
        async function toolbarClickListener(e) {
          const command = this.dataset["command"].toLowerCase();
          if ( self.state !== command ){
            removeUnfinishedObject();
            self.state = command;
          }
          const title = this.getAttribute('title');
          const help = this.dataset["help"] || title || command;
          if ( help && help.length > 1 ){
            help_div.innerText = help;
          } else {
            help_div.innerText = self.helpText.init;
          }

          switch (command) {

            case 'free':
              break;

            case 'line':
              new SvgLine({
                x1: 100,
                y1: 100,
                x2: 150,
                y2: 150,
                stroke: self.color,
                'stroke-width': 3,
                'stroke-opacity': 1
              });
              break;

            case 'text':
              new SvgText({
                x: 250,
                y: 100,
                fill: self.color,
                "fill-opacity": 0.2,
                'stroke-width': 3,
                'stroke-opacity': 1
              }, prompt(self.helpText.text_prompt, self.helpText.text_default));
              break;

            case 'html':
              const newDiv = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
              newDiv.contentEditable = "true";
              // newDiv.setAttribute("contenteditable", "true");
              newDiv.className = 'html_in_svg';
              newDiv.addEventListener('mousedown', (e) => {
                e.stopPropagation();
              });
              const newHTML = new SvgForeignObject({
                x: 200,
                y: 100,
                width: 320,
                height: 120,
                fill: self.color,
                "fill-opacity": 0.2,
                'stroke-width': 3,
                'stroke-opacity': 1
              }, newDiv);
              newHTML.className = 'html_in_svg';
              break;

            case "html_page":
              const newPage = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
              newPage.contentEditable = "true";
              // newPage.setAttribute("contenteditable", "true");
              newPage.className = 'html_page';
              const page_url = prompt(self.helpText.page_url_prompt, self.helpText.page_url_default);
              const page_content = await self.ccm.load({url: page_url, type: 'html'});
              newPage.appendChild(page_content);
              const newHTMLPage = new SvgForeignObject({
                x: 0,
                y: 0,
                width: '100%',
                height: '100%',
                fill: self.color,
                "fill-opacity": 0.2,
                'stroke-width': 3,
                'stroke-opacity': 1
              }, newPage);
              newHTMLPage.className = 'html_page';
              break;

            case 'rect':
              new SvgObject({
                x: 250,
                y: 100,
                width: 30,
                height: 20,
                fill: self.color,
                "stroke-width": 3,
                "fill-opacity": 0.5,
                'stroke-opacity': 1
              }, 'rect');
              break;

            case 'circle':
              new SvgCircle({
                cx: 250,
                cy: 100,
                r: 30,
                fill: self.color,
                "stroke-width": 3,
                "fill-opacity": 0.5,
                'stroke-opacity': 1
              }, 'circle');
              break;

            case 'undo':
              if ( ! undoStack.length ) break;
              undoStack.pop().undo();
              break;

            case 'redo':
              if ( ! redoStack.length ) break;
              redoStack.pop().redo();
              break;

            case "save_image":
              svg_div.setAttribute("xmlns", "http://www.w3.org/2000/svg");
              const svgData = svg_div.outerHTML;
              const svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
              const svgUrl = URL.createObjectURL(svgBlob);
              const save_btn = this;
              save_btn.href = svgUrl;
              save_btn.download = "san.svg";
              break;

            case "load_image":
              const image_url = prompt(self.helpText.load_image_prompt, self.helpText.load_image_default);
              if ( image_url && image_url.length > 5 ){
                const image = await self.ccm.load( { url: image_url, type: 'html' } );
                // new SvgWrapper( {x: 100, y: 50, width: 100, height: 100 }, 'rect', image );
                // dataset.inner.inner.push( image.outerHTML );
                // const newSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                // newSVG.innerHTML = dataset;
                svg_div.appendChild( image );
              }
              break;

            case "clear_image":
              while(svg_div.children.length>0) {
                svg_div.removeChild(svg_div.firstChild);
              }
              undoStack.length = 0;
              redoStack.length = 0;
              removeUnfinishedObject();
              clear_current();
              break;

            case "embed":
              const embed_code = prompt(self.helpText.embed_prompt, self.helpText.embed_default);
              if ( embed_code && embed_code.length > 8 ) {
                insertEmbedCode( embed_code );
              }
              break;

            case "dms":
              const component_name = prompt(self.helpText.dms_prompt, self.helpText.dms_default);
              const dms_id = prompt(self.helpText.dms_id_prompt, self.helpText.dms_id_default);
              if ( component_name && component_name.length > 1 && dms_id && dms_id.length > 8 ){
                const config = await self.ccm.get({ name: component_name, url: self.dms_url }, dms_id );

                await insertComponent({ component: component_name, config });
              }
              break;

            case "view_editor":
              html_div.style.display = 'none';
              json_div.style.display = 'none';
              html2json_div.style.display = 'none';
              editor_div.style.display = 'block';
              break;

            case "view_html":
              html_div.innerText = editor_div.innerHTML;
              html_div.style['background-color'] = 'lightblue';
              editor_div.style.display = 'none';
              json_div.style.display = 'none';
              html2json_div.style.display = 'none';
              html_div.style.display = 'block';
              break;

            case "view_json":
              const value_as_json = $.clone( Object.assign( {}, self.getValue(),{ inner: self.html2json_module.html2json( editor_div.innerHTML ) } ) );
              delete value_as_json.parent;
              delete value_as_json.root;
              self.json_builder.start({ root: json_div, data: { // avoid solveDependency by storing in ccm.store
                  store: [ 'ccm.store', { local: { app: value_as_json }}  ],
                  key: 'app'
                } });
              editor_div.style.display = 'none';
              html_div.style.display = 'none';
              html2json_div.style.display = 'none';
              json_div.style.display = 'block';
              break;

            case "view_html2json":
              self.html2json.start({ root: html2json_div, data: self.getValue() });
              editor_div.style.display = 'none';
              html_div.style.display = 'none';
              json_div.style.display = 'none';
              html2json_div.style.display = 'block';
              break;

            case "stop":
              const current = self.currentObject;
              debugger;
              break;

            case "plus":
              const buttonName = prompt(self.helpText.extension_prompt, self.helpText.extension_default);
              const actionAddress = prompt(self.helpText.extension_url_prompt,
                self.helpText.extension_url_default);
              const new_button = $.html( self.html.plus, { buttonName, actionAddress } );
              new_button.addEventListener('click', ev => {
                extensionListener( { command: buttonName, address: actionAddress, event: ev, svg: svg_div, data: dataset } );
              });
              toolbar_div.appendChild( new_button ) ;
              break;

            case "hide_toolbar":
              toolbar_div.style.display = 'none';
              help_div.style.display = 'none';
              addListener('dblclick', (e)=>{
                toolbar_div.style.display = 'block';
                help_div.style.display = 'block';
              });
              break;

            case "remove_editor":
              const root = self.element.parentNode;
              [...root.children].forEach(child=>{
                root.removeChild(child);
              });
              root.appendChild( svg_div.cloneNode( true ) );
              break;

            default:
              if ( command.toLowerCase().startsWith('ccm-') ){ // ccm component
                const componentName = command.substr( 4 ).toLowerCase();
                const component = await getComponent( componentName );
                const config = component.config || {};
                if ( this.dataset["config"] ){
                  const config_keys = JSON.parse( this.dataset["config"] );
                  config_keys.forEach( key => {
                    config[ key ] = this.dataset[ key ];
                  });
                }
                // use this.dataset for config
                await insertNextComponent({ component, config });

              } else { // editor extensions via functions remotely defined
                extensionListener({ command, event: e, svg: svg_div, data: dataset } );
              }
          }
        }

        async function insertNextComponent({ component, config }){
          removeUnfinishedObject();
          if ( component ){
            await insertComponent({ component, config });
          } else {
            const command = self.state;
            if ( command.toLowerCase().startsWith('ccm-') ) { // ccm component
              const componentName = command.substr( 4 ).toLowerCase();
              const component = await getComponent( componentName );
              await insertComponent({ component, config });
            }
          }
        }

        function clear_current(){
          self.currentObject = null;
          self.currentClickListener = null;
        }

        function removeUnfinishedObject(){
          if ( self.currentObject
            && self.currentObject.node
            && self.currentObject.node.parentNode === svg_div ){
            switch ( self.currentObject.state() ){
              case "move":
              case "resize":
                self.currentObject.removeAllListeners();
                self.currentObject.remove();
                clear_current();
                break;
              case "active": case "passive":
                self.currentObject.removeAllListeners();
                self.currentObject.addMinimalListeners();
                clear_current();
                break;
              default:
                debugger;
            }
          }
        }

        /**
         * standard listener for change events
         * @param e
         * @returns {Promise<void>}
         */
        async function toolbarChangeListener(e){
          const command = this.dataset["command"].toLowerCase();
          switch (command) {
            case 'color':
              self.color = this.querySelector('input').value || '#000';
              self.currentObject && self.currentObject.setColor( self.color );
              break;
            case "select": // select ccm component from DMS
              const select = toolbar_div.querySelector("a[data-command='select'] > select");
              const component = (await dms_index())[select.options[select.selectedIndex].value];

              await insertComponent({ component, config: {} });
              break;
            default:
              debugger;
              extensionListener({ command, event: e, svg: svg_div, data: dataset } );
          }
        }

        /**
         * listeners for editor extensions
         * @param command
         * @param event
         * @param address HTTPS address of ES6 module to be imported
         * @param button this button which is pressed
         */
        async function extensionListener({ command, event, address, button }){
          // get listener from remote JavaScript or config or global namespace
          if ( address ){
            const action = await self.ccm.load({ url: address, type: 'module', import: command });
            action(event, button);
          } else {
            if ( self.extensions && self.extensions[ command ] && typeof self.extensions[ command ] === 'function' ){
              self.extensions[ command ](event, button)
            } else if ( self[ command ] && typeof self[ command ] === 'function' ){
              self[ command ](event, button)
            } else if ( window[ name ] && typeof window[ name ] === 'function' ){
              window[ name ](event, button)
            } else {
              debugger;
            }
          }
        }

        /**
         * get the component with the given name from configs or from DMS
         * @param componentName
         * @returns {Component}
         */
        async function getComponent( componentName ){
          if ( self.component.name === componentName ) return self.component;
          if ( self[ componentName ] ) return self[ componentName ];
          const find_parent = self.ccm.context.find( self, componentName, false );
          let component = dataset.components && dataset.components[ componentName ]
            || find_parent && find_parent[ componentName ]
            || DMS_component_index && DMS_component_index[ componentName ];

          if ( Array.isArray( component ) ) component = await $.solveDependency( component );
          return component;
        }

        /**
         *
         * @param component
         * @param config
         * @returns {Promise<void>}
         */
        async function insertComponent({ component, config }){

          const index = component.index || $.getIndex( component ) || component;

          const component_div = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'ccm-' + index );
          component_div.style = 'width: 100%; height: 100%; margin: 0; padding: 0;';

          const foreignObject = new SvgForeignObject({
            x: 50,
            y: 50,
            width: 240,
            height: 120,
            fill: self.color
          }, component_div );

          foreignObject.className = 'ccm-component';

          self.currentObject = foreignObject;
          self.currentObject.component = component;
          self.currentObject.config = config;


          // avoid painting into foreign object:
          if ( self.stopPaintingIntoCCM ) addListener('mousedown' ,(e)=>{
            e.stopPropagation()
          });

          // get config
          if ( ! config ) config = {};
          config.root = component_div;
          config.parent = this;

          let instance;

          // start component
          if ( typeof component === 'string' ){
            if ( component.startsWith('http') ){
              instance = await self.ccm.start( component, config );
            } else {
              if ( $.isComponent( component ) ){
                instance = await component.start( config );
              } else {
                instance = await (await getComponent( component )).start( config );
              }
            }
          } else {
            instance = await component.start( config );
          }

          if ( dataset.components && dataset.components[ instance.component.index ] ){
            // already registered as dependency.
            // compare configs and write differences into attributes
            const oldConfig = dataset.components[ instance.component.index ][2];
            const newConfig = JSON.parse(instance.config);
            const allDiffs = compareJSON( oldConfig, newConfig );
            for ( const [ name, diff ] of allDiffs ){
              config.root.setAttribute( name, diff );
            }
            if ( self.inline_block ) root.setAttribute( 'style', 'display: inline-block;' );
          } else { // not yet registered as dependency
            if ( ! dataset.components ) dataset.components = {};
            dataset.components[ instance.component.index ] = [ 'ccm.component',
              instance.component.url,
              JSON.parse(instance.config)
            ];
          }

          editor_div.dispatchEvent(new Event('keyup'), { 'bubbles': true });  // for triggering update of preview in DMS

          // ToDo editor_div.focus();
        }

        /**
         * compare two objects and return the differences
         * @param {Object} oldJson
         * @param {Object} newJson
         * @return {Array} differences as array of key-value pairs
         */
        function compareJSON( oldJson, newJson ) {
          const result = [];
          collect( [], oldJson, newJson );
          return result;
          function collect( prefix, oldJson, newJson ){
            if ( oldJson && ! newJson ) return result.push([ dots(), null ]);
            if ( ! oldJson && newJson ) return result.push([ dots(), newJson ]);
            if ( oldJson == newJson ) return;
            // oldJson && newJson && oldJson != newJson
            if ( typeof newJson === 'object' ){
              if ( Array.isArray( newJson ) ){
                for ( let i = 0; i<newJson.length; i++ ){
                  collect( [ ...prefix, i ], oldJson[i], newJson[i] );
                }
              } else { // object is not an array
                for ( const key of [...new Set([...Object.keys( oldJson ), ...Object.keys( newJson )])] ){
                  collect( [ ...prefix, key ], oldJson[key], newJson[key] );
                }
              }
            } else  {
              result.push([ dots(), newJson ]);
            }
            function dots(){
              return prefix.reduce((a,b)=>{ if(a){ a += '.' + b } else {a=b} return a },null);
            }
          }
        }


        /**
         * insert embed code
         * @param embedCode
         * @returns {Promise<void>}
         */
        async function insertEmbedCode( embedCode ){
          if ( embedCode.toLowerCase().includes('ccm-') ){
            // extract ccm component and config and start component
            const regex = /(http[^("|')]+).*ccm-(\w+).*?(\w+\d+)["]/gi;
            const match = regex.exec( embedCode );
            const component_uri = match[1];
            const component_name = match[2];
            const dms_id = match[3];
            if ( component_name && component_name.length > 1 && dms_id && dms_id.length > 8 ){
              const config = await self.ccm.get({ name: component_name, url: "https://ccm2.inf.h-brs.de" }, dms_id );
              removeUnfinishedObject();
              await insertComponent({ component: component_uri, config });
            }
          } else { // e.g. Youtube embed code
            const embed_div = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'div' );
            embed_div.style = 'width: 100%; height: 100%; margin: 0; padding: 0;';
            self.currentObject = new SvgForeignObject({
              x: 250,
              y: 100,
              width: 240,
              height: 120,
              fill: self.color,
              style: 'resize: both; border: thin solid black; margin: 0; padding: 0;'
            }, embed_div );
            embed_div.innerHTML = embedCode;
          }
        }

      };

      /**
       * current state of this editor
       * @returns {Object} state of editor
       */
      this.getValue = () => {
        return $.clone( dataset );
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();