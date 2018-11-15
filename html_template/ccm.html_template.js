/**
 * @overview ccm component for html_template
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version latest (2.0.0)
 * @changes
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
    name: 'html_template',
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.6.0.min.js',
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      // You can write data diectly into the config:

      // x: "Hello World",
      // y: "You",
      // z: 3+4,
      // fn: (x) => {console.log( x ); return x;},

      // Or you can transfer data via a data sub-object
      // data: {
      //   x: "Hello World",
      //   y: "You",
      //   z: 7
      // },

      // lit-html see https://github.com/Polymer/lit-html
      lit_html: [ "ccm.load", { url: "https://unpkg.com/lit-html?module", type: "module" } ],

      // ES3 implementation of the ES6 template string used to read and process the lightDOM
      templatizer: [ "ccm.load", { url: "./resources/template.js", type: "module" } ],

      css: [ 'ccm.load',  'resources/default.css' ],
      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/lit_html/resources/default.css' ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/lit_html/resources/configs.js', 'log' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    /**
     * for creating instances of this component
     * @constructor
     */
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object}
       */
      let $;

      /**
       * ES6 template object
       * @type {Object}
       */
      let my_template;

      /**
       * is called once after the initialization and is then deleted
       */
      this.ready = async () => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        if ( this.data ){
          Object.keys(this.data).forEach( key => {
            this[key] = $.clone( this.data[key] );
          });
        }

        let lightDOM = this.template;

        if ( ! lightDOM ) lightDOM = this.inner;

        if ( typeof lightDOM !== 'string' ){
          lightDOM = lightDOM.innerHTML;
        }

        // generate template with dynamic value update via lit-html caching mechanics
        my_template = this.templatizer.template( this.lit_html.html, lightDOM, this );

      };

      /**
       * starts the instance
       */
      this.start = async () => {
        this.lit_html.render( my_template, this.element );
      };

      this.getValue = () => {
        return this.data;
      };

      this.onchange = () => {
        this.lit_html.render( my_template, this.element );
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();