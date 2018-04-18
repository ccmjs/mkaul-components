/**
 * @overview ccm component for histogram
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
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
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://akless.github.io/ccm/version/ccm-11.5.0.min.js',
    // ccm: '//akless.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      boxes: {
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
        "EU": {
          fill: "orange",
          stroke: "red",
          "stroke-width": 3,
          "fill-opacity": 0.5
        },
        "US": {
          fill: "lime",
          stroke: "purple",
          "stroke-width": 3,
          "fill-opacity": 0.5
        },
        "CHN": {
          fill: "yellow",
          stroke: "orange",
          "stroke-width": 3,
          "fill-opacity": 0.5
        },
        "text": {
          "font-family": "Verdana",
          "font-size": 8
        }
      },

      // css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/histogram/resources/default.css' ],

      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/histogram/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-2.0.0.min.js' ],
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ],
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
       * @type {Object}
       */
      let $;
      
      /**
       * init is called once after all dependencies are solved and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.init = callback => {
      
        //  Is content given via LightDOM (inner HTML of Custom Element)?
        //  Then use it with higher priority
        if ( self.inner && self.inner.innerHTML.trim() ) self.text = self.inner.innerHTML;
        
        // ToDo interprete LightDOM

        callback();
      };
      
      /**
       * is called once after the initialization and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.ready = callback => {

        // set shortcut to help functions
        $ = self.ccm.helper;
        
        callback();
      };  
        
      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {
      
        // has logger instance? => log 'start' event
        if ( self.logger ) self.logger.log( 'start' );

        const dimensions = Object.keys( self.boxes );
        const dim_count = dimensions.length;
        let list = self.html.main.inner;

        dimensions.map( (dim, index) => {
          const width  = parseFloat( self.html.main.width ) / dim_count;
          const height = parseFloat( self.html.main.height );

          const rect = { tag: 'rect',
            x: index * width,
            y: height - self.boxes[ dim ] - self.styles[ dim ]["stroke-width"] || 1,
            width: width - self.styles[ dim ]["stroke-width"] || 1,
            height: self.boxes[ dim ],
            inner: { tag: 'title', inner: dim + ': ' + self.boxes[ dim ] }
          };
          list.push( $.integrate(rect, self.styles[ dim ]) );
          list.push( $.clone( $.integrate( { tag:'text',
            x: index * width + 0.5 * width,
            y: height - 10,
            "text-anchor": "middle",
            inner: [
              dim,
              { tag: 'title', inner: dim + ': ' + self.boxes[ dim ] }
            ]
          }, self.styles.text ) ) );
        });
        
        // prepare main HTML structure
        const main_elem = $.html( self.html.main );
        
        // set content of own website area
        $.setContent( self.element, main_elem );

        // Hack in order to get SVG rendered inside the shadow root
        self.element.innerHTML += '';

        if ( callback ) callback();
      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}