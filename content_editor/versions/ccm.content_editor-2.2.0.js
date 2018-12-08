/**
 * @overview ccm component for content_editor
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @url https://code.tutsplus.com/tutorials/create-a-wysiwyg-editor-with-the-contenteditable-attribute--cms-25657
 * @url https://github.com/guardian/scribe/blob/master/BROWSERINCONSISTENCIES.md
 * @license The MIT License (MIT)
 * @version latest (2.2.0)
 * @changes
 * version 2.2.0 8.12.2018
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
    version: [2,2,0],
    
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

      html: {
        editor: {
          id: 'editor',
          contenteditable: true
        },
        toolbar: {
          class: "toolbar",
        }
      },

      // css: [ 'ccm.load',  'resources/default.css' ],
      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/content_editor/resources/default.css' ],
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

        // SVG hack: paint all svg icons which are inside the DOM but not painted
        [...toolbar_div.querySelectorAll('svg')].forEach(svg=>{
          svg.parentNode.innerHTML += '';
        });

        // the same toolbar click listener for all tools
        function toolbarClickListener(e){
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
            case "undo": case "redo": case "bold": case "italic": case "underline": case "strikethrough": case "copy": case "cut": case "delete": case "inserthorizontalrule": case "justifyleft": case "justifyCenter": case "justifyRight": case "justifyFull": case "indent": case "outdent": case "insertunorderedlist": case "insertorderedlist": case "unlink": case "subscript": case "superscript": case "inserthtml": case "removeformat":
              document.execCommand(command, false, null);
              break;
            default: // editor extensions
              extension_listener(command, e);
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