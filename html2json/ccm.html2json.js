/**
 * @overview ccm component for html2json
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 11/30/2018
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
    name: 'html2json',
    // version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.6.4.min.js',
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      data: {
        html: '<div> \n <h1> Demo </h1> \n </div>'
      },

      // data: {
      //   "store": [ "ccm.store", { local: 'resources/dataset.json' } ],
      //   "key": "demo"
      // },

      onchange: function(){ console.log( this.getValue() ); },

      html: {
        id: 'main',
        inner: [
          { id: 'html', inner: '%html%' },
          { tag: 'pre', inner: { id: 'json' } }

        ]
      },

      htmlparser: [ "ccm.load", {
        "url": "./resources/htmlparser.js",
        "type": "module"
      } ],

      css: [ 'ccm.load',  './resources/default.css' ],
      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/html2json/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/html2json/resources/configs.js', 'log' ] ],
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

        if ( self.inner.innerHTML.trim() ) self.data.html = self.inner.innerHTML;

      };
        
      /**
       * starts the instance
       */
      this.start = async () => {

        /**
         * dataset for rendering
         * @type {Object}
         */
        const dataset = await $.dataset( this.data );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // render main HTML structure
        const main_div = $.html( this.html );

        const html_div = main_div.querySelector( '#html' );
        html_div.innerText = dataset.html;
        html_div.contentEditable = "true";
        html_div.addEventListener( 'keyup', (e) => {
          dataset.html = html_div.innerText;
          reparse();
        } );

        const json_div = main_div.querySelector( '#json' );
        json_div.contentEditable = "true";
        json_div.addEventListener( 'keyup', (e) => {
          $.setContent( html_div, $.html( JSON.parse( json_div.innerText ) ) );
          dataset.html = html_div.innerHTML;
          html_div.innerText = dataset.html;
        } );

        reparse();

        function reparse(){
          const json_stack = [];
          const unary_list = [];

          self.htmlparser.HTMLParser( dataset.html, {
            start: function(tag, attrs, unary) {
              const tag_structure = tag.toLowerCase() === 'div' ? {} : { tag: tag };
              attrs.forEach( attr => {
                tag_structure[ attr.name ] = attr.value;
              });
              if ( unary ) unary_list.push( tag_structure );
              json_stack.push( tag_structure );
            },
            end: function(tag) {
              if ( json_stack.length > 1 ){
                const top = json_stack[ json_stack.length-1 ];
                if ( json_stack[ json_stack.length-2 ].inner ){
                  json_stack.pop();
                  if ( Array.isArray( json_stack[ json_stack.length-1 ].inner ) ){
                    json_stack[ json_stack.length-1 ].inner.push( top );
                  } else {
                    json_stack[ json_stack.length-1 ].inner = [ json_stack[ json_stack.length-1 ].inner, top ];
                  }
                } else {
                  if (! unary_list.includes( json_stack[ json_stack.length-2 ] ) ){
                    json_stack.pop();
                    json_stack[ json_stack.length-1 ].inner = [ top ];
                  }
                }
              }
            },
            chars: function(text) {
              if ( text.trim() ){
                if ( json_stack[ json_stack.length-1 ].inner ){
                  if ( Array.isArray( json_stack[ json_stack.length-1 ].inner ) ){
                    json_stack[ json_stack.length-1 ].inner.push( text );
                  } else {
                    json_stack[ json_stack.length-1 ].inner += text;
                  }
                } else {
                  json_stack[json_stack.length - 1].inner = text;
                }
              }
            },
            comment: function(text) {
              if ( json_stack[ json_stack.length-1 ].comment ){
                json_stack[ json_stack.length-1 ].comment = [ json_stack[ json_stack.length-1 ].comment ];
                json_stack[ json_stack.length-1 ].comment.push( text );
              } else {
                json_stack[ json_stack.length-1 ].comment = text;
              }
            }
          });

          // json_div.innerText = JSON.stringify( json_stack[ json_stack.length-1 ], null, 2 );
          // json_div.innerText = $.stringify( json_stack[ json_stack.length-1 ], null, 2 );
          json_div.innerText = json_stack.length === 1 ?
            $.stringify( json_stack[ json_stack.length-1 ], null, 2 ) :
            $.stringify( json_stack.reduce((a,b)=>{ a.inner.push(b); return a },{inner:[]}), null, 2 );

        }

        // render main HTML structure
        $.setContent( this.element, main_div );

      };

      this.getValue = () => {
        return $.clone( dataset );
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();