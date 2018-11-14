/**
 * @overview ccm component for jsonic
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
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
    name: 'jsonic',
    version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.5.1.min.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      data: "foo:bar, red:1,",

      html: {
        main: {
          inner: [
            { class: 'checkboxes', inner: [
                { tag: 'label', inner: [
                    'Jsonic',
                    { tag: 'input', type: "checkbox", name: "jsonic", checked: true },
                  ]
                },
                { tag: 'label', inner: [
                    'JSON',
                    { tag: 'input', type: "checkbox", name: "json", checked: true },
                  ]
                }
              ]
            },
            { class: 'editors', inner: [
                { tag: 'pre', inner: { tag: 'code', inner: { id: 'jsonic', inner: '%data%' } } },
                { tag: 'pre', inner: { tag: 'code', inner: { id: 'json', inner: '%json%' } } }
              ]
            }
          ]
        }
      },

      jsonic: [ "ccm.load", "https://cdn.jsdelivr.net/npm/jsonic@0.3.1/jsonic-min.js" ],

      // css: [ 'ccm.load',  'resources/default.css' ],
      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/jsonic/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/jsonic/resources/configs.js', 'log' ] ],
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

        //  Is config given via LightDOM (inner HTML of Custom Element)?
        //  Then use it with higher priority
        if ( this.inner && this.inner.innerText && this.inner.innerText.trim() ){

          // interprete LightDOM
          this.lightDOM = this.inner.innerText;

        }

      };
        
      /**
       * starts the instance
       */
      this.start = async () => {

        const main_div = $.html( this.html.main, {
          data: this.lightDOM || this.data,
          json: JSON.stringify( jsonic( this.lightDOM || this.data ), null, 2)
        } );

        const div = {},      // container for all div elements with id
          checkbox = {}; // container for all checkbox elements with name

        // collect all div elements with id into container
        [...main_div.querySelectorAll('div[id]')].forEach( elem => {
          div[ elem.id ] = elem;
        });

        // collect all checkbox elements into container
        [...main_div.querySelectorAll('input[type=checkbox][name]')].forEach( elem => {
          checkbox[ elem.name ] = elem;
        });

        Object.keys(checkbox).forEach( name => {
          toggle( name );
          checkbox[name].addEventListener('click', () => {
            toggle( name );
          });
        });

        // render main HTML structure
        $.setContent( this.element, main_div );

        div.jsonic.contentEditable = "true";

        div.jsonic.addEventListener('keyup', (e) => {
          div.json.innerText = JSON.stringify( jsonic( div.jsonic.innerText ), null, 2) ;
        });

        // Helper function

        function toggle( name ){
          if ( checkbox[name].checked ){
            div[name].style.display = 'block';
          } else {
            div[name].style.display = 'none';
          }
        }

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();