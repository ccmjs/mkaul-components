/**
 * @overview ccm component for code_lock
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 06.05.2019 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( function () {

  "use strict";

  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'code_lock',
    // version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      length: 4,
      code: "e2fc714c4727ee9395f324cd2e7f331f",
      html: {
        main: {
          inner: [
            { class: 'open' },
            { class: 'code' },
            { class: 'buttons', inner: [
                { tag: 'button', id: 'a', inner: 'A', onclick: '%onclick%' },
                { tag: 'button', id: 'b', inner: 'B', onclick: '%onclick%' },
                { tag: 'button', id: 'c', inner: 'C', onclick: '%onclick%' },
                { tag: 'button', id: 'd', inner: 'D', onclick: '%onclick%' }
              ]
            }
          ]
        }
      },
      
      css: [ 'ccm.load',  'resources/default.css' ],
      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/code_lock/resources/default.css' ],

      hash: [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/md5.js", "type": "module" } ]

      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/code_lock/resources/configs.js', 'log' ] ],
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
       * init is called once after all dependencies are solved and is then deleted
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

      };
      
      /**
       * is called once after the initialization and is then deleted
       */
      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready' );

      };
        
      /**
       * starts the instance
       */
      this.start = async () => {

        let code = '';
        let open = false;

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        const main_elem = $.html( this.html.main, { onclick: clickHandler } );
        const code_div = main_elem.querySelector('.code');
        const open_div = main_elem.querySelector('.open');
        const allButtons = [...main_elem.querySelectorAll('button')];

        // render main HTML structure
        $.setContent( this.element, main_elem );

        function clickHandler( e ){
          if ( ! open ){
            code += this.id;
            code_div.innerText += '*';
            if ( code.length > self.length ){
              code = '';
              code_div.innerText = '';
            }
            if ( codesAreEqual() ) finish();
          }
        }

        function codesAreEqual(){
          if ( self.hash && self.hash.md5( code ) === self.code ) return true;
          return ( code === self.code );
        }

        function finish() {
          open = true;
          open_div.style['background-color'] = 'green';
          allButtons.forEach( b => { b.disabled = true } );
        }

        /**
         * current state of this code_lock
         * @returns {boolean} is open or not
         */
        this.getValue = () => {
          return open;
        };

      };



    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();