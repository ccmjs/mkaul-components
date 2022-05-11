/**
 * @overview ccm connector for plotly, https://plot.ly/javascript
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version latest (1.1.3)
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

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: "https://kaul.inf.h-brs.de/ccmjs/ccm/versions/ccm-26.4.4.min.js",
    helper: [ "ccm.load", "https://kaul.inf.h-brs.de/ccmjs/akless-components/modules/versions/helper-7.6.0.min.mjs" ],
    // ccm: 'https://kaul.inf.h-brs.de/ccmjs/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      html: {
        main: { id: "main",
          inner: { id: "plot", class: "js-plotly-plot" }
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

      plotly_lib: [ 'ccm.load', 'https://cdn.plot.ly/plotly-latest.min.js'  ],

      // css: [ 'ccm.load',  'resources/default.css' ],
      css: [ 'ccm.load',  'https://kaul.inf.h-brs.de/ccmjs/mkaul-components/plotly/resources/default.css' ],
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

        // set shortcut to helper functions
        $ = Object.assign( {}, this.ccm.helper || ccm.helper, this.helper );

        //  Is config given via LightDOM (inner HTML of Custom Element)?
        //  Then use it with higher priority
        if ( this.inner && this.inner.innerHTML.trim() && this.inner.innerHTML.startsWith('{') ){

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

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        const main_div = $.html( this.html.main );
        const plot = main_div.querySelector('#plot');

        const plotter = ( event ) => {
          // https://plot.ly/javascript/plotlyjs-function-reference/#plotlyreact
          Plotly.react(
            plot,
            this.data,
            this.layout,
            this.plot_config
          );
          event && event.preventDefault();
        };

        plotter();

        // render main HTML structure
        this.element.textContent = '';
        this.element.appendChild( main_div );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
