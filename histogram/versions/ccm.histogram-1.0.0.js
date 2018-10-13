/**
 * @overview ccm component for histogram
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 * @version 1.0.0
 * TODO: docu comments -> API
 * TODO: unit tests
 * TODO: builder component
 * TODO: i18n
 */

{

  var component  = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'histogram',
    version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.0.4.min.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      data: {
        "EU":  30,
        "US":  70,
        "CHN": 50
      },
      html: {
        // size of SVG image
        main:  {
          tag: 'svg',
          width:"100",
          height:"100",
          inner: []
        }
      },
      styles: {
        "fill": "coral",
        "text": {
          "font-size": 8
        }
      }

      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/histogram/resources/default.css' ]
    },

    /**
     * for creating instances of this component
     * @constructor
     */
    Instance: function () {

      "use strict";

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

        //  Is config given via LightDOM (inner HTML of Custom Element)?
        //  Then use it with higher priority
        if ( self.inner && self.inner.innerHTML.trim() ){

          // interprete LightDOM
          self.lightDOM = JSON.parse( self.inner.innerHTML );

          // merge into config
          Object.assign( self, self.lightDOM );

        }

      };

      /**
       * is called once after the initialization and is then deleted
       */
      this.ready = async () => {

        // set shortcut to help functions
        $ = self.ccm.helper;

      };

      /**
       * starts the instance
       */
      this.start = async () => {
      
        // has logger instance? => log 'start' event
        self.logger && self.logger.log( 'start' );

        const dimensions = Object.keys( self.data );
        const dim_count = dimensions.length;
        let list = self.html.main.inner;

        dimensions.map( (dim, index) => {
          const width  = parseFloat( self.html.main.width ) / dim_count;
          const height = parseFloat( self.html.main.height );

          const stroke_width = self.styles[ dim ] && self.styles[ dim ]["stroke-width"] || 1;

          const rect = { tag: 'rect',
            x: index * width,
            y: height - self.data[ dim ] - stroke_width,
            width: width - stroke_width,
            height: self.data[ dim ],
            inner: { tag: 'title', inner: dim + ': ' + self.data[ dim ] }
          };
          list.push( $.integrate(rect, $.integrate( self.styles, self.styles[ dim ])) );
          list.push( $.clone( $.integrate( { tag:'text',
            x: index * width + 0.5 * width,
            y: height - 10,
            "text-anchor": "middle",
            inner: [
              dim,
              { tag: 'title', inner: dim + ': ' + self.data[ dim ] }
            ]
          }, self.styles.text ) ) );
        });
        
        // prepare main HTML structure
        const main_elem = $.html( self.html.main );
        
        // set content of own website area
        $.setContent( self.element, main_elem );

        // Hack in order to get SVG rendered inside the shadow DOM
        self.element.innerHTML += '';

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}