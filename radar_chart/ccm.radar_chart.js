/**
 * @overview ccm component for radar_chart
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * TODO: docu comments -> API
 * TODO: unit tests
 * TODO: builder component
 * TODO: i18n
 */

{

  const component  = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'radar_chart',
    
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
      dimensions: [ 'pünktlich', 'zuverlässig', 'kooperativ', 'ansprechbar', 'effektiv', 'hilfsbereit', 'durchsetzungsstark' ],
      candidates: {
        first:  [ 10, 20, 30, 40, 50, 60, 70 ],
        second: [ 70, 60, 50, 40, 30, 20, 10 ]
      },
      styles: {
        first: 'fill:orange;stroke:black;stroke-width:1;opacity=0.2',
        second: 'fill:lime;stroke:purple;stroke-width:1;opacity=0.2'
      },
      html: {
        main:  {
          tag: 'svg',
          width:"400",
          height:"400",
          viewport: "0 0 200 200",
          inner: []
          }
      },

      // css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/radar_chart/resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/radar_chart/resources/default.css' ],
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
      
        // has logger instance? => log 'render' event
        if ( self.logger ) self.logger.log( 'render' );

        let dim_count = self.dimensions.length;
        let list = self.html.main.inner;
        let radiants = [];
        let polygons = {};
        Object.keys(self.candidates).map( candidate => { polygons[candidate]=[] });

        self.dimensions.map( ( dim, index ) => {
          // 100,100 is the center
          // 200, 200 is the most outer point

          // divide full circle by the number of dimensions
          const angle = ( Math.PI / 2 ) - ( index * ( 2 * Math.PI / dim_count ) );
          const endx  = 100+100*Math.cos( angle ), endy = 100+100*Math.sin( angle );

          // add a radiant for every dimension
          radiants.push({ tag: 'line', x1: 100, y1: 100, x2: endx, y2: endy, class: 'radiants', "stroke-width":"2", stroke:"black" });
          radiants.push({ tag: 'text', x: endx, y: endy, inner: self.dimensions[ index ] });

          // calculate polygons for all candidates
          Object.keys(self.candidates).map( candidate => {
            polygons[candidate].push(
                 ' ' + (100+self.candidates[candidate][index]*Math.cos( angle )).toFixed(2)
               + ',' + (100+self.candidates[candidate][index]*Math.sin( angle )).toFixed(2)
               );
          });
        });

        // draw polygons for all candidates
        Object.keys(self.candidates).map( candidate => {
          list.push({ tag: 'polygon', points: polygons[candidate].join(' '), style: self.styles[candidate]});
        });

        // draw radiants
        list.push(...radiants);
        
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