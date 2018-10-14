/**
 * @overview ccm component for runkit from https://runkit.com/docs/embed
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 10/14/2018
 * TODO: docu comments -> API
 * TODO: unit tests
 * TODO: builder component
 * TODO: i18n
 */

( function () {

  "use strict";

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'runkit',
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.0.6.min.js',
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      runkit: [ "ccm.load", "https://static.runkitcdn.com/assets/embed-app.bundle.js" ],
      // runkit: [ "ccm.load", "resources/embed_runkit.js" ],
      // runkit: [ "ccm.load", { url: "https://embed.runkit.com", method: 'GET' } ],
      // https://runkit.com/docs/embed
      // runkit: [ "ccm.load", "https://embed.runkit.com/oembed", { method: 'JSONP' } ],
      // runkit: [ "ccm.load", { url: "https://embed.runkit.com", method: 'GET' } ],

      html: {
        main: { id: "main" }
      },

      source: "// GeoJSON!\nvar getJSON = require(\"async-get-json\");\n\nawait getJSON(\"https://storage.googleapis.com/maps-devrel/google.json\");",

      css: [ 'ccm.load',  'resources/default.css' ],
      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/runkit/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/runkit/resources/configs.js', 'log' ] ],
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
        
        //  Is config given via LightDOM (inner HTML of Custom Element)?
        //  Then use it with higher priority
        if ( this.inner && this.inner.innerHTML.trim() ){

          // interprete LightDOM
          this.lightDOM = JSON.parse( this.inner.innerHTML );

          // merge into config
          Object.assign( this, this.lightDOM );

        }

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
        this.logger && this.logger.log( 'start' );

        const main_element = $.html( this.html.main );

        // let RunKit = await ccm.load( {
        //   url: 'https://embed.runkit.com',
        //   method: 'GET'
        // } );

        const notebook = RunKit.createNotebook({

          // The title of the notebook when it is saved on RunKit.
          // title: this.title,

          // the parent element for the new notebook
          element: main_element,

          // specify the source of the notebook
          source: this.source

          // The minimum height of the embed. This value is 130px by default.
          // minHeight: this.minHeight,

          // The timestamp in UTC milliseconds to recreate the state of package availability. No packages published to npm after this time are available in this embed, which is useful if you want to freeze the conditions for reproducing a bug, or guaranteeing that versions of a package and its dependencies are loaded. This value is set to the time the embed is created by default.
          // packageTimestamp: this.packageTimestamp,

          // You can put setup code in the preamble so it doesn’t pollute the main embed. This is useful when using RunKit embeds for your documentation: in the preamble you can require your package, then use it in the main embed.
          // preamble: this.preamble,

          // A function that will be called when the embed has fully loaded. The function will be passed a reference to the notebook.
          // onLoad: this.onLoad,

          // A function that will be called any time the notebook is evaluated.
          // onEvaluate: this.onEvaluate

        });

        // render main HTML structure
        $.setContent( this.element, main_element );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();