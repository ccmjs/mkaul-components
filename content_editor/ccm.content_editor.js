/**
 * @overview ccm component for content_editor
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @url https://code.tutsplus.com/tutorials/create-a-wysiwyg-editor-with-the-contenteditable-attribute--cms-25657
 * @url https://github.com/guardian/scribe/blob/master/BROWSERINCONSISTENCIES.md
 * @license The MIT License (MIT)
 * @version latest (2.1.0)
 * @changes
 * version 2.1.0 7.12.2018
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
    // version: [2,1,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.6.5.min.js',
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      data: {
        text: 'Demo Text',
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
              "title": "paste plain text",
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

      enabled: ['undo', 'redo', 'toggle', 'bold', 'italic', 'underline', 'strikeThrough', 'forecolor', 'backcolor', 'hilitecolor', 'copy', 'cut', 'delete', 'insertHorizontalRule', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'insertUnorderedList', 'insertOrderedList', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'removeformat', 'makeExternalLink', 'createlink', 'unlink', 'insertimage', 'p', 'subscript', 'superscript', 'fontname', 'fontSize', 'my_special_listener' ], // which toolbar buttons should be on the toolbar

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

      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // no Light DOM? => use empty fragment
        if ( !this.inner ) this.inner = document.createDocumentFragment();

        // Light DOM is given as HTML string? => use fragment with HTML string as innerHTML
        if ( typeof this.inner === 'string' ) this.inner = document.createRange().createContextualFragment( this.inner );

        // Light DOM is given as ccm HTML data? => convert to HTML DOM Elements
        if ( $.isObject( this.inner ) && !$.isElementNode( this.inner ) )
          this.inner = $.html( this.inner );

        // dynamic replacement of placeholders
        if ( this.placeholder ) [ ...this.inner.children ].map( child => child.innerHTML = $.format( child.innerHTML, this.placeholder ) );

        // collect all ccm dependencies in Light DOM
        const self = this;
        if ( !this.dependencies ){
          this.dependencies = [];
        }
        collectDependencies( this.inner );

        /**
         * see ccm.content.js
         * collects all dependencies in given DOM Element Node (recursive)
         * @param {Element} node - DOM Element Node
         */
        function collectDependencies( node ) {

          // iterate over all child DOM Element Nodes
          [ ...node.children ].map( child => {

            // no ccm Custom Element? => abort and collect dependencies inside of it
            if ( child.tagName.indexOf( 'CCM-' ) !== 0 ) return collectDependencies( child );  // recursive call

            // generate ccm dependency out of collected ccm custom elements
            const component = getComponent(); if ( !component ) return;
            const config = $.generateConfig( child );
            config.parent = self;
            config.root = child;
            self.dependencies.push( $.isComponent( component ) ? [ component, config ] : [ 'ccm.start', component, config ] );

            /**
             * gets object, index or URL of ccm component that corresponds to founded ccm Custom Element
             * @returns {Object|string}
             */
            function getComponent() {

              /**
               * index of ccm component
               * @type {string}
               */
              const index = child.tagName.substr( 4 ).toLowerCase();

              // editor embedded inside this editor
              if (index === self.component.index) return self.component;

              // has dependency to ccm component? => result is component object
              if ( $.isComponent( self[ index ] ) ) return self[ index ];

              // search inner HTML of own Custom Element for a source tag that contains the ccm component URL
              const sources = self.inner.querySelectorAll( 'source' );
              for ( let i = 0; i < sources.length; i++ )
                if ( $.getIndex( sources[ i ].getAttribute( 'src' ) ) === index )
                  return sources[ i ].getAttribute( 'src' );

            }

          } );

        }
      };

      /**
       * starts the instance
       */
      this.start = async () => {

        /**
         * dataset for rendering
         * @type {Object}
         */
        let dataset = await $.dataset( this.data );
        if ( typeof dataset === 'string' ) dataset = { text: '' };

        this.getValue = () => {
          return $.clone( dataset );
        };

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // render main HTML structure
        const editor_div = $.html( this.html.editor );

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

                const shadowRoot = self.element.parentNode;

                // Use shadow root instead of document to get position of cursor in text
                const selectedObj = shadowRoot.getSelection();
                const parentNode = selectedObj.anchorNode.parentNode;
                const childNodes = parentNode.childNodes;

                for (const childNode of childNodes){
                  if (childNode === selectedObj.anchorNode) {

                    if (selectedObj.anchorNode.nodeType === 3){
                      // cursor is in the middle of a text node.
                      // break text node into 2 separate nodes and paste image in between:
                      const textNode = selectedObj.getRangeAt(0).startContainer;
                      const firstNode = document.createTextNode(textNode.nodeValue.slice(0,selectedObj.getRangeAt(0).startOffset));
                      const secondNode = document.createTextNode(textNode.nodeValue.slice(selectedObj.getRangeAt(0).startOffset));

                      // insert both text nodes with image in between
                      parentNode.replaceChild(secondNode, textNode);
                      parentNode.insertBefore(pastedImage, secondNode);
                      parentNode.insertBefore(firstNode, pastedImage);

                      // restore the position of the caret
                      const newRange = document.createRange(); // TODO should be more similar to the old range object
                      newRange.setStart(secondNode, 0  );
                      newRange.collapse(true); // true collapses the Range to its start, false to its end.
                      selectedObj.removeAllRanges();
                      selectedObj.addRange(newRange);

                    } else { // cursor is between child nodes

                      if ( editor_div.contains( childNode ) ){
                        if ( editor_div !== childNode ){
                          parentNode.insertBefore(pastedImage, childNode);
                        } else {
                          editor_div.appendChild(pastedImage);
                        }
                      } else {
                          editor_div.appendChild(pastedImage);
                      }
                    }
                    break;
                  }
                }
                break;
              default:
                debugger;
            }
          });
        };

        $.setContent( editor_div, dataset.text );

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
          if ( toolbar_div.querySelector('.select.fontName') ){
            $.setContent( toolbar_div.querySelector('.select.fontName'), $.html(palette) );
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

        // render main HTML structure
        $.setContent( this.element, $.html( [ toolbar_div, editor_div ] ) );

        // render content that is given via Light DOM
        $.setContent( editor_div, this.inner );

        // SVG hack: paint all svg icons which are inside the DOM but not painted
        [...toolbar_div.querySelectorAll('svg')].forEach(svg=>{
          svg.parentNode.innerHTML += '';
        });

        await start_all_embedded_ccm_components();

        async function start_all_embedded_ccm_components(){
          for ( let i = 0; i < self.dependencies.length; i++ )
            if ( $.isComponent( self.dependencies[ i ][ 0 ] ) )
              await self.dependencies[ i ][ 0 ].start( self.dependencies[ i ][ 1 ] );
            else
              self.dependencies[ i ] = await $.solveDependency( self.dependencies[ i ] );
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
            case 'makeexternallink':
              const uri = prompt('Enter the link here: ', 'https:\/\/');
              document.execCommand('insertHTML', false, `<a href="${uri}" target="_blank">${self.element.parentNode.getSelection().getRangeAt(0).toString()}</a>`);
              break;
            case 'clock_with_insertHTML': // second best solution for clock insertion
              (function(){
                const clockId = 'clockId' + ccm.helper.generateKey();
                // insert ccm instance of clock into HTML code
                document.execCommand('insertHTML', false, `<ccm-clock id="${clockId}"></ccm-clock>`);

                // generate ccm dependency out of collected ccm custom elements
                const child = editor_div.querySelector('#'+clockId);
                child.style = "display: inline-block;";
                const component = self.clock;
                const config = self.clock.config || $.generateConfig( child );
                config.parent = self;
                config.root = child;
                component.ccm.start( component, config );
                const newDependency = [ 'ccm.start', component, config ];
                self.dependencies.push( newDependency );
              })();
              break;
            case "clock": // with DOM insertion
              const component = self.clock;
              const config = self.clock.config;
              config.parent = self;
              const newSpan = document.createElement('span');
              config.root = newSpan;
              await component.ccm.start( component, config );
              newSpan.firstChild.style = "display: inline-block;";

              const range = self.element.parentNode.getSelection().getRangeAt(0);
              if ( range ){
                range.insertNode( newSpan );
              } else {
                editor_div.appendChild( newSpan );
              }

              const newDependency = [ 'ccm.start', component, config ];
              self.dependencies.push( newDependency );

              break;
            case "undo": case "redo": case "bold": case "italic": case "underline": case "strikethrough": case "copy": case "cut": case "delete": case "inserthorizontalrule": case "justifyleft": case "justifyCenter": case "justifyRight": case "justifyFull": case "indent": case "outdent": case "insertunorderedlist": case "insertorderedlist": case "unlink": case "subscript": case "superscript": case "inserthtml": case "removeformat":
              document.execCommand(command, false, null);
              break;
            default:
              if ( command.toLowerCase().startsWith('ccm-') ){ // ccm component
                const componentName = command.substr( 4 ).toLowerCase();

                // get component
                const component = self[ componentName ] || self.component;

                // get config
                // const config = self[ componentName ] ? component.config : JSON.parse( self.config );
                const config = component.config;

                // if this button has enabled data, overwrite config
                if (this.dataset["enabled"]) config.enabled = this.dataset["enabled"];

                // set parent and root
                config.parent = self;
                const newSpan = document.createElement('span');
                config.root = newSpan;
                await component.ccm.start( component, config );
                newSpan.firstChild.style = "display: inline-block;";

                const range = self.element.parentNode.getSelection().getRangeAt(0);
                if ( range ){
                  range.insertNode( newSpan );
                } else {
                  editor_div.appendChild( newSpan );
                }

                const newDependency = [ 'ccm.start', component, config ];
                self.dependencies.push( newDependency );

              } else { // editor extensions via function calls remotely defined
                extension_listener(command, e);
              }
          }
          update_data();
        }

        // standard listener for change events
        function toolbarChangeListener(e){
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
            default: // editor extensions
              extension_listener(command, select, value, e);
          }
          update_data();
        }

        function update_data(){
          dataset.text = editor_div.innerHTML;
          dataset.position = getCaretPosition();
          dataset.dependencies = $.clone( self.dependencies );
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

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();