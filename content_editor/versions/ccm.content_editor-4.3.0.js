/**
 * @overview ccm component for content_editor
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @url https://code.tutsplus.com/tutorials/create-a-wysiwyg-editor-with-the-contenteditable-attribute--cms-25657
 * @url https://github.com/guardian/scribe/blob/master/BROWSERINCONSISTENCIES.md
 * @license The MIT License (MIT)
 * @version latest (4.3.0)
 * @changes
 * version 4.3.0 17.12.2018
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
    version: [4,3,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.6.5.min.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      data: {
        inner: 'Demo Text with embedded ccm <source src="https://ccmjs.github.io/akless-components/blank/ccm.blank.js">Welcome from blank.<ccm-blank>',
        position: 6
      },

      // data: {
      //   "store": [ "ccm.store", { local: 'resources/dataset.json' } ],
      //   "key": "demo"
      // },

      onchange: function(){ console.log( this.getValue() ); },

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

      // other ccm components to be embeddable inside the editor text
      clock: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/clock/versions/ccm.clock-3.0.1.js", {
        width: "40px",
        html: { main: { id: 'main', inner: [ { id: 'clock' } ] }
        }
      } ],

      quiz: [ "ccm.component", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-3.0.1.js", { key: ["ccm.get","https://ccmjs.github.io/akless-components/quiz/resources/configs.js","demo"] } ],

      json_builder: [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.2.0.js", {
        "html.inner.1": "",
        "directly": true
      } ],

      html2json_module: [ "ccm.load", {
        "url": "https://ccmjs.github.io/mkaul-components/content_editor/resources/html2json.mjs",
        "type": "module"
      } ],

      html2json: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/html2json/versions/ccm.html2json-3.1.0.js" ],

      store: [ "ccm.store", { "name": "components", "url": "https://ccm2.inf.h-brs.de" } ]

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
      const DMS_component_index = {};

      /**
       * dataset for rendering
       * The value of dataset starts with a clone of this.data,
       *     but additional values might be added during component lifetime.
       * this.data is never changed, only dataset is changed.
       * @type {Object}
       */
      let dataset;

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

        // initialize dataset.dependencies if necessary
        if ( ! dataset.dependencies ) dataset.dependencies = {};

      };

      /**
       * is called once after the initialization and is then deleted
       */
      this.ready = async () => {

        await fill_select_input_field_for_all_components();  // await necessary in ready()

        /**
         * The select button is filled with all component names from the DMS
         */
        async function fill_select_input_field_for_all_components(){

          if ( ! self.enabled || ( self.enabled && self.enabled.includes('select') ) ){
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

            if ( select_array ){
              const data = await self.store.get({});

              for ( const record of data ){
                select_array.push( { tag: 'option', value: record.key, inner: record.key } );
                DMS_component_index[ $.getIndex( record.url ) ] = record.url;
              }

              select_array.sort((a,b)=>  ('' + a.value).localeCompare(b.value) );
            }
          }
        }

      };

      /**
       * starts the instance
       */
      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // render main HTML structure
        const editor_div = $.html( this.html.editor );
        if ( ! dataset.inner ) dataset.inner = 'Edit here';
        $.setContent( editor_div, dataset.inner );

        // collect <source> tags from dataset inner
        const sources = [...editor_div.querySelectorAll( 'source' )];
        for ( const source of sources ){
          const src = source.getAttribute( 'src' );
          const index = $.getIndex( src );
          if ( ! dataset.dependencies ) dataset.dependencies = {};
          if ( ! dataset.dependencies[ index ] ){
            dataset.dependencies[ index ] = [ "ccm.component", src, {} ];
          } else {
            debugger; // duplicate source ?
          }
        }

        // add keyup listener if configured
        if ( self.change_listener_on_key_up )
          editor_div.addEventListener('keyup', function(e){
            update_data();
          });

        editor_div.onpaste = function(e) {
          [...e.clipboardData.items].forEach((item)=>{
            switch( item.type ){
              case 'text/plain':
                const pastedText = e.clipboardData.getData('text/plain');
                // process pastedText here
                break;
              case 'text/html':
                const pastedHTML = e.clipboardData.getData('text/html');
                // process pastedHTML here
                break;
              case 'image/png':
                const URLObj = window.URL || window.webkitURL;
                const pastedImage = document.createElement('img');
                const blob = item.getAsFile();
                pastedImage.src = URLObj.createObjectURL(blob);

                // Use shadow root instead of document to get position of cursor in text
                const shadowRoot = self.element.parentNode;
                const selection = shadowRoot.getSelection();
                if ( selection.rangeCount > 0 ){
                  selection.getRangeAt(0).insertNode( pastedImage );
                } else {
                  editor_div.appendChild( document.createTextNode(' '));
                  editor_div.appendChild( pastedImage );
                  editor_div.appendChild( document.createTextNode(' '));
                }
                break;
              default:
                debugger;
            }
          });
        };

        // filter enabled tools
        if ( self.enabled && self.html.toolbar.inner ){
          self.html.toolbar.inner = self.html.toolbar.inner.filter(tool=>self.enabled.includes(tool['data-command']) || ! tool['data-command'] );
        }

        const toolbar_div = $.html( this.html.toolbar );

        // render color palette
        ['fore', 'back'].forEach( pal => {
          const palette = toolbar_div.querySelector('.'+pal+'-palette');
          self.colorPalette && self.colorPalette.forEach( color => {
            palette && palette.append($.html({
              tag: 'a',
              href: '#',
              'data-command': pal+'color',
              'data-value': color,
              style: 'background-color:' + color + ';',
              class: 'click palette-item'
            }));
          });
        });

        // render font palette
        if ( self.fontList ){
          const palette = [];
          self.fontList.unshift('choose font'); // no font selected
          for ( const font of self.fontList ){
            palette.push({
              tag: 'option',
              value: font,
              inner: font
            });
          }
          if ( toolbar_div.querySelector('.select.fontname') ){
            $.setContent( toolbar_div.querySelector('.select.fontname'), $.html(palette) );
          }
        }

        // add click event listener
        [...toolbar_div.querySelectorAll('.click')].forEach( tool => {
          tool.addEventListener('click', toolbarClickListener.bind( tool ) );
        });

        // add change event listener
        [...toolbar_div.querySelectorAll('.change')].forEach( tool => {
          tool.addEventListener('change', toolbarChangeListener.bind( tool ) );
        });

        const builder_div = $.html( self.html.builder || {} );
        const html_div = $.html( self.html.html || {} );
        const json_div = $.html( self.html.json || {} );
        const html2json_div = $.html( self.html.html2json || {} );

        // render main HTML structure
        $.setContent( this.element, $.html( [ toolbar_div, builder_div, editor_div, html_div, json_div, html2json_div ] ) );

        // SVG hack: paint all svg icons which are inside the DOM but not painted
        [...this.element.querySelectorAll('svg')].forEach(svg=>{
          svg.parentNode.innerHTML += '';
        });

        start_all_Components( editor_div );

        async function start_all_Components( node ){
          $.asyncForEach([...node.children], child => {
            start_component( child );
          });
        }

        async function start_component( child ){
          if ( child.tagName.startsWith('CCM-')){
            const index = child.tagName.slice(4).toLowerCase();
            let component = await getComponent( index );
            if ( $.isComponent( component ) ){
              const config = $.integrate(
                // set root and parent:
                {root: child, parent: self},
                // collect all attributes:
                [...child.getAttributeNames()].reduce((all_attributes,attr)=>{
                  all_attributes[attr] = child.getAttribute(attr);
                  return all_attributes;
                }, {}), component.config || {} );
              const instance = await component.start( config );
              child.addEventListener('click', open_builder( instance, config ) );
            } else {
              debugger;
            }
          } else {
            start_all_Components( child );
          }
        }

        async function getComponent( componentName ){
          if ( self.component.index === componentName ) return self.component;
          const component =  dataset.dependencies[ componentName ] || self[ componentName ] || DMS_component_index[ componentName ];

          if ( $.isComponent( component ) ) return component;

          const solvedComponent = await $.solveDependency( component );
          if ( $.isComponent( solvedComponent ) ){
            dataset.dependencies[ componentName ] = solvedComponent;
            return solvedComponent;
          } else {
            debugger;
          }
        }

        // the same toolbar click listener for all tools
        async function toolbarClickListener(e){
          const command = this.dataset["command"].toLowerCase();
          switch (command){
            case 'toggle':
              const isNotEditable = editor_div.getAttribute("contenteditable") === 'false';
              editor_div.setAttribute( "contenteditable", isNotEditable );
              toolbar_div.querySelector('[data-command=toggle] i').classList = isNotEditable ? 'fa fa-toggle-on' : 'fa fa-toggle-off';
              break;
            case 'p': case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6':
              document.execCommand('formatBlock', false, command);
              break;
            case 'forecolor': case 'backcolor': case 'hilitecolor':
              document.execCommand( command, false, this.dataset["value"] );
              break;
            case 'createlink': case 'insertimage':
              const url = prompt('Enter the link here: ', 'https:\/\/');
              document.execCommand(command, false, url);
              break;
            case 'audio': case 'video':
              const media_file = prompt('Enter URL here: ', 'https:\/\/');
              if ( media_file && media_file.length > 8 ){
                document.execCommand('insertHTML', false, `<${command} src="${media_file}" controls ${this.dataset['autoplay']} ${this.dataset['loop']}>Your browser does not support the <code>audio</code> element.</${command}>` );
              }
              break;
            case 'embed':
              const embed_code = prompt('Enter embed code here: ', 'html_embed_code');
              if ( embed_code && embed_code.length > 8 ) {
                // document.execCommand('insertHTML', false, embed_code );    // replaces quotes
                insert_embed_code_via_node( embed_code );
              }
              break;
            case 'dms':
              const component_name = prompt('Enter component name here: ', 'clock');
              const dms_id = prompt('Enter DMS-ID here: ', '1544379440973X6301133529121039');
              if ( component_name && component_name.length > 1 && dms_id && dms_id.length > 8 ){
                const config = await self.ccm.get({ name: component_name, url: "https://ccm2.inf.h-brs.de" }, dms_id );
                await insertComponent({ component: component_name, config });
                editor_div.dispatchEvent(new Event('keyup', { 'bubbles': true }));
              }
              break;
            case 'makeexternallink':
              const uri = prompt('Enter the link here: ', 'https:\/\/');
              const selection = editor_div.parentNode.parentNode.getSelection();
              if ( selection.rangeCount > 0 ){
                document.execCommand('insertHTML', false, `<a href="${uri}" target="_blank">${self.element.parentNode.getSelection().getRangeAt(0).toString()}</a>`);
              } else {
                editor_div.appendChild( $.html({ tag: 'a', href: uri, target: '_blank', rel: 'noopener', inner: 'Link' }) );
              }
              break;
            case "undo": case "redo": case "bold": case "italic": case "underline": case "strikethrough": case "copy": case "cut": case "delete": case "inserthorizontalrule": case "justifyleft": case "justifyCenter": case "justifyRight": case "justifyFull": case "indent": case "outdent": case "insertunorderedlist": case "insertorderedlist": case "unlink": case "subscript": case "superscript": case "inserthtml": case "removeformat":
              document.execCommand(command, false, null);
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
              const value_as_json = Object.assign( {}, self.getValue(),{ inner: self.html2json_module.html2json( editor_div.innerHTML ) } );
              self.json_builder.start({ root: json_div, data: value_as_json });
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
            default:
              if ( command.toLowerCase().startsWith('ccm-') ){ // ccm component
                const componentName = command.substr( 4 ).toLowerCase();

                // get component
                const component = await getComponent( componentName );

                // get config
                const config = component.config;

                // if command-data of this button has enabled data, overwrite config
                if (this.dataset["enabled"]) config.enabled = this.dataset["enabled"];

                await insertComponent({ component, config });

              } else { // editor extensions via function calls remotely defined
                extension_listener(command, e);
              }
          }
          update_data();
        }

        // standard listener for change events
        async function toolbarChangeListener(e){
          const command = this.dataset["command"].toLowerCase();
          const select = this.querySelector('select');
          const input = this.querySelector('input');
          switch (command){
            case 'forecolor': case 'backcolor': case 'hilitecolor':
              document.execCommand( command, false, input.value );
              break;
            case "fontsize":
              document.execCommand(command, false, parseInt( select.value ));
              select.value = 0; // set back to default
              break;
            case "fontname":
              document.execCommand(command, false, select.value);
              select.value = 'default'; // set back to default
              break;
            case 'select': // select ccm component from DMS
              const component = DMS_component_index[select.options[select.selectedIndex].value];
              await insertComponent({
                component,
                config: {}
              });
              break;
            default: // editor extensions
              extension_listener(command, select, value, e);
          }
          update_data();
        }

        function update_data(){
          dataset.inner = editor_div.innerHTML;
          dataset.position = getCaretPosition();
          self.onchange && self.onchange();
        }

        // listeners for editor extensions
        function extension_listener(command, e){
          // get listener from remote JavaScript or config or global namespace
          if ( self.extensions && self.extensions[ command ] && typeof self.extensions[ command ] === 'function' ){
            self.extensions[ command ](e)
          } else if ( self[ command ] && typeof self[ command ] === 'function' ){
            self[ command ](e)
          } else if ( window[ name ] && typeof window[ name ] === 'function' ){
            window[ name ](e)
          } else {
            debugger;
          }
        }

        function getCaretPosition() {
          const shadowRoot = self.element.parentNode;
          if ( shadowRoot.getSelection && shadowRoot.getSelection().getRangeAt && shadowRoot.getSelection().rangeCount ) {
            const range = shadowRoot.getSelection().getRangeAt(0);
            const selectedObj = shadowRoot.getSelection();
            let rangeCount = 0;
            const childNodes = selectedObj.anchorNode.parentNode.childNodes;
            [...childNodes].forEach(childNode => {
              if (childNode === selectedObj.anchorNode) {
                return;
              }
              if (childNode.outerHTML)
                rangeCount += childNode.outerHTML.length;
              else if (childNode.nodeType === 3) {
                rangeCount += childNode.textContent.length;
              }
            });
            return range.startOffset + rangeCount;
          }
          return -1;
        }

        async function insertComponent({ component, config }){
          const index = component.index || $.index( component ) || component;
          const root = document.createElement('ccm-' + index );

          // set parent and root
          config.parent = self;
          config.root = root;

          // ToDo collect attribute values
          let instance;

          // start component
          if ( typeof component === 'string' ){
            if ( component.startsWith('http') ){
              instance = await self.ccm.start( component, config );
            } else {
              component = await getComponent( component );
              instance = await self.ccm.start( component, config );
            }
          } else {
            instance = await component.start( config );
          }

          editor_div.dispatchEvent(new Event('keyup'));

          if ( ! dataset.dependencies[ instance.component.index ] ){
            dataset.dependencies[ instance.component.index ] = [ 'ccm.component',
              instance.component.url,
              instance.config
            ];
          }

          root.firstChild.style = "display: inline-block;";
          root.addEventListener('click', open_builder( instance, config ) );

          // insert at Cursor position or at the end of the text, if none
          const selection = editor_div.parentNode.parentNode.getSelection();
          if ( selection.rangeCount > 0 ){
            selection.getRangeAt(0).insertNode( root );
          } else {
            editor_div.appendChild( document.createTextNode(' '));
            editor_div.appendChild( root );
            editor_div.appendChild( document.createTextNode(' '));
          }

        }

        function open_builder( instance, config ){
          return async event => {
            const json_builder = await self.json_builder.start({
              root: builder_div,
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
              onfinish: (e) => {
                config = Object.assign( {}, config, json_builder.getValue() );
                instance.start( config );
                builder_div.style.display = 'none';
              },
              data: clone( typeof instance.config === 'string' ? JSON.parse( instance.config ) : instance.config, ( val ) => ['root','parent','lit_html'].includes( val ) )
            });
            builder_div.style.display = 'block';
          }
        }

        async function insert_embed_code_via_node( embed_code ){
          if ( embed_code.toLowerCase().includes('ccm-') ){
            // extract ccm component and config and start component
            const regex = /(http[^("|')]+).*ccm-(\w+).*?(\w+\d+)["]/gi;
            const match = regex.exec( embed_code );
            const component_uri = match[1];
            const component_name = match[2];
            const dms_id = match[3];
            if ( component_name && component_name.length > 1 && dms_id && dms_id.length > 8 ){
              const config = await self.ccm.get({ name: component_name, url: "https://ccm2.inf.h-brs.de" }, dms_id );
              await insertComponent({ component: component_uri, config });

            }
          } else { // e.g. Youtube embed code
            const embed_div = document.createElement('div');
            embed_div.innerHTML = embed_code;
            // selection = self.element.parentNode.getSelection();
            const embed_selection = editor_div.parentNode.parentNode.getSelection();
            if (embed_selection.rangeCount > 0) {
              embed_selection.getRangeAt(0).insertNode(embed_div);
            } else {
              editor_div.appendChild(document.createTextNode(' '));
              editor_div.appendChild(embed_div);
              editor_div.appendChild( document.createTextNode(' '));
            }
          }
        }

      };

      this.getValue = () => {
        // clone dataset
        const result = clone( dataset, val => ['parent', 'root'].includes( val ) );

        // transform dataset into action data
        for ( const [ index, dep ] of Object.entries( dataset.dependencies ) ){
          // no parent, no root in config
          result.dependencies[ index ] = [ 'ccm.component',
            dep.url,
            dep.config ? clone( dep.config, val => ['parent', 'root'].includes( val )  ) : {}   // ToDo JSON.parse( $.stringify( dep.config ) )
          ];
        }
        return result;
      };

      /**
       * @summary create a deep copy of a given value
       * @param {*} value - given value
       * @param censor - predicate, which values not to copy
       * @returns {*} deep copy of given value
       */
      function clone( value, censor ) {

        return recursive( value, true );

        function recursive( value, first ) {
          if ( censor( value ) ) return undefined;

          if ( $.isSpecialObject( value ) && !first ) return value;

          if ( Array.isArray( value ) || $.isObject( value ) ) {
            var copy = Array.isArray( value ) ? [] : {};
            for ( var i in value )
              copy[ i ] = recursive( value[ i ] );
            return copy;
          }

          return value;

        }

      }

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();