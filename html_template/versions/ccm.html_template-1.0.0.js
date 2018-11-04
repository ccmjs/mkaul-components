/**
 * @overview ccm component for html_template
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 11/3/2018
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
    version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.3.0.min.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      x: "Hello World",
      y: "You",
      z: 3+4,
      fn: (x) => {console.log( x ); return x;},

      lit_html: [ "ccm.load", { url: "https://unpkg.com/lit-html?module", type: "module" } ],

      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/html_template/resources/default.css' ],
      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/lit_html/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/lit_html/resources/configs.js', 'log' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    /**
     * for creating instances of this component
     * @constructor
     */
    Instance: function () {

      /**
       * init is called once after all dependencies are solved and is then deleted
       */
      this.init = async () => {

        //  Is config given via LightDOM (inner HTML of Custom Element)?
        //  Then use it with higher priority
        if ( this.inner ){

          this.lightDOM = this.inner.cloneNode( true );

        }

        if ( this.inner && this.inner.innerHTML && this.inner.innerHTML.trim() ){

          // interprete LightDOM
          this.lightDOM = this.inner.innerHTML;

        }

        if ( this.template ){
          this.lightDOM = this.template;
        }

      };

      /**
       * starts the instance
       */
      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        const values = () => {

          const values = [];
          const match_regex = new RegExp(/\${([^}]+)}/g); // with groups
          let match;
          while(( match = match_regex.exec(this.lightDOM)) !== null) {
            const first_match = match[1]; // first matching group
            if ( this[ first_match ] ){
              // part of this config
              if ( 'function' === typeof this[ first_match ] ){
                values.push( this[first_match].call(this, this) );
              } else {
                values.push( this[first_match] );
              }
            } else {
              // evaluate expression: TODO test many ways
              const next1 = Function('"use strict";return (' + first_match + ')').call(this, this);
              const next2 = this.lit_html.html`${first_match}`;
              const next3 = eval( first_match );

              values.push( next1 );
            }
          }
          return values;
        };

        // render template
        this.lit_html.render( this.lit_html.html( this.lightDOM.split( /\${[^}]+}/g ), ...values() ), this.element );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();