/**
 * @overview ccm component for showdownjs: a Live Markdown Editor for the Web
 * @url https://github.com/showdownjs/showdown
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 11/4/2018
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
    name: 'showdown',
    version: [1,0,0],
    
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

      markdown: '# Hello Markdown!<br>## Please edit here.',

      html: {
        main: {
          inner: [
            { class: 'checkboxes', inner: [
                { tag: 'label', inner: [
                    'Markdown',
                    { tag: 'input', type: "checkbox", name: "markdown", checked: true },
                  ]
                },
                { tag: 'label', inner: [
                    'HTML',
                    { tag: 'input', type: "checkbox", name: "html", checked: false },
                  ]
                },
                { tag: 'label', inner: [
                    'Preview',
                    { tag: 'input', type: "checkbox", name: "preview", checked: true },
                  ]
                }
              ]
            },
            { class: 'editors', inner: [
                { id: 'markdown', inner: '%markdown%' },
                { id: 'html', inner: '%html%' },
                { id: 'preview', inner: '%preview%' }
              ]
            }
          ]
        }
      },

      showdownjs: ["ccm.load", "https://cdnjs.cloudflare.com/ajax/libs/showdown/1.8.7/showdown.min.js"],

      // css: [ 'ccm.load',  'resources/default.css' ],
      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/showdown/resources/default.css' ]
      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/showdown/resources/configs.js', 'log' ] ],
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

        this.converter = new showdown.Converter();

      };
        
      /**
       * starts the instance
       */
      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        const html_code = this.converter.makeHtml( this.lightDOM || this.markdown.replace('<br>', "\n") );

        const main_div = $.html( this.html.main, {
          markdown: this.markdown,
          html: "",
          preview: html_code
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

        div.html.innerText = html_code;

        Object.keys(checkbox).forEach( name => {
          toggle( name );
          checkbox[name].addEventListener('click', () => {
            toggle( name );
          });
        });

        if ( this.lightDOM ) div.markdown.innerText = this.lightDOM;

        // render main HTML structure
        $.setContent( this.element, main_div );

        div.markdown.contentEditable = "true";

        div.markdown.addEventListener('keyup', (e) => {
          const html_code = this.converter.makeHtml( div.markdown.innerText );
          div.html.innerText = html_code;
          div.preview.innerHTML = html_code;
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