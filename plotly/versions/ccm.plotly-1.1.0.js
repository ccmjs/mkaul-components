/**
 * @overview ccm connector for plotly, https://plot.ly/javascript
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version latest (1.1.0)
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
    name: 'plotly',
    version: [1,1,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.6.4.min.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      html: {
        main: { id: "main",
          inner: { id: "plot"}
        }
      },

      data:
        [
          {
            x: [1, 2, 3, 4, 5],
            y: [1, 2, 4, 8, 16]
          }
        ],

      layout: {},

      plot_config: {
        responsive: true
      },

      plotly_lib: [ 'ccm.load', 'https://cdn.plot.ly/plotly-latest.min.js'  ],

      // css: [ 'ccm.load',  'resources/default.css' ],
      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/plotly/resources/default.css' ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    /**
     * for creating instances of this component
     * @constructor
     */
    Instance: function () {
      
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
       * starts the instance
       */
      this.start = async () => {

        // Test via a getter in the options object to see if the passive property is accessed
        let supportsPassive = false;
        try {
          const opts = Object.defineProperty({}, 'passive', {
            get: function() {
              supportsPassive = true;
            }
          });
          window.addEventListener("testPassive", null, opts);
          window.removeEventListener("testPassive", null, opts);
        } catch (e) {}

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        const main_div = $.html( this.html.main );
        const plot = main_div.querySelector('#plot');

        const plotter = () => {
          // https://plot.ly/javascript/plotlyjs-function-reference/#plotlyreact
          Plotly.react(
            plot,
            this.data,
            this.layout,
            this.plot_config
          );
        };

        plotter();

        // render main HTML structure
        $.setContent( this.element, main_div );

        window.addEventListener('resize', plotter, supportsPassive ? { passive: true } : false);

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();