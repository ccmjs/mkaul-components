/**
 * @overview ccm component for code_editor
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 20.01.2019 initial build
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
    name: 'code_editor',
    version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-19.0.0.min.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      loader: [ "ccm.load", "https://ccmjs.github.io/mkaul-components/code_editor/dist/monaco-editor/vs/loader.js" ],

      editor: [ "ccm.load", "https://ccmjs.github.io/mkaul-components/code_editor/resources/monaco-editor.js" ],

      html: {
        main: {
          class: 'container',
          inner: [
            {
              tag: 'monaco-editor',
              value: '%value%'
            }
          ]
        }
      },

      editorAttributes: [
        'no-minimap'
      ],
      
      data: { // initial dataset must be an object
        inner: 'const x = 2; \\nconsole.log( x * x );'  // initial editor content
      },
      
      // data: {  // fetched from store
      //   "store": [ "ccm.store", { local: 'resources/dataset.json' } ],
      //   "key": "demo"
      // },

      // onchange: function(){ console.log( this.getValue() ); },
      
      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/code_editor/resources/default.css' ],
      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/code_editor/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/code_editor/resources/configs.js', 'log' ] ],
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

        if ( ! dataset ) dataset = { inner: '' };

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

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // render main HTML structure
        $.setContent( self.element, $.html( self.html.main, { value: dataset.inner } ) );

        const editor = self.element.querySelector('monaco-editor');
        self.editorAttributes.forEach( att => {
          editor.setAttribute(att , '');
        });

        /**
         * current state of this editor
         * @returns {Object} state of editor
         */
        this.getValue = () => {
          return editor.getValue();
        };


        /**
         * TODO refresh dataset after editing
         */
        function updateData(){
          dataset.inner = self.getValue();
          self.onchange && self.onchange( dataset );
        }

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();