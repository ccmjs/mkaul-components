/**
 * @overview ccm component for content_editor
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @url https://code.tutsplus.com/tutorials/create-a-wysiwyg-editor-with-the-contenteditable-attribute--cms-25657
 * @license The MIT License (MIT)
 * @version latest (1.1.0)
 * @changes
 * version 1.1.0 5.12.2018
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
    version: [1,1,0],
    
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
        text: 'Demo Text'
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
      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/content_editor/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/content_editor/resources/configs.js', 'log' ] ],
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
       * is called once after the initialization and is then deleted
       */
      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready' );

        // set shortcut to help functions
        $ = this.ccm.helper;

        if ( self.inner ) self.data.text = self.inner.innerHTML;

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


        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // render main HTML structure
        const editor_div = $.html( this.html.editor );
        editor_div.onpaste = function(e) {
          [...e.clipboardData.items].forEach((item)=>{
            switch( item.type ){
              case 'text/plain':
                const pastedText = e.clipboardData.getData('text/plain');
                // ToDo process pastedText
                break;
              case 'text/html':
                const pastedHTML = e.clipboardData.getData('text/html');
                // ToDo process pastedHTML
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
                      const newRange = document.createRange();
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

        function getCaretPosition( shadowRoot ) {
          if (shadowRoot.getSelection && shadowRoot.getSelection().getRangeAt) {
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


        $.setContent( editor_div, dataset.text );

        const toolbar_div = $.html( this.html.toolbar );

        // render color palette
        ['fore', 'back'].forEach( pal => {
          const palette = toolbar_div.querySelector('.'+pal+'-palette');
          self.colorPalette.forEach( color => {
            palette.append($.html({
              tag: 'a',
              href: '#',
              'data-command': pal+'color',
              'data-value': '#' + color,
              style: 'background-color:' + '#' + color + ';',
              class: 'palette-item'
            }));
          });
        });

        // add toolbar listener
        const toolbar_listener = function(e){
          const command = this.dataset["command"];
          if (command === 'h1' || command === 'h2' || command === 'p') {
            document.execCommand('formatBlock', false, command);
            dataset.text = editor_div.innerHTML;
          }
          if (command === 'forecolor' || command === 'backcolor') {
            document.execCommand(this.dataset["command"], false, this.dataset["value"]);
            dataset.text = editor_div.innerHTML;
          }
          if (command === 'createlink' || command === 'insertimage') {
            const url = prompt('Enter the link here: ', 'http:\/\/');
            document.execCommand(this.dataset["command"], false, url);
            dataset.text = editor_div.innerHTML;
          } else {
            document.execCommand(this.dataset["command"], false, null);
            dataset.text = editor_div.innerHTML;
          }
        };

        [...toolbar_div.querySelectorAll('.toolbar a')].forEach( tool => {
          tool.addEventListener('click', toolbar_listener.bind( tool ) );
        });

        // render main HTML structure
        $.setContent( this.element, $.html( [ toolbar_div, editor_div ] ) );

      };

      this.getValue = () => {
        return $.clone( dataset );
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();