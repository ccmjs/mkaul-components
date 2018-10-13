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

  var component  = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'radar_chart',
    version: [2,0,0],

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
      dimensions: [ 'pünktlich', 'zuverlässig', 'kooperativ', 'erreichbar', 'effektiv', 'hilfsbereit', 'durchsetzungsstark' ],
      candidates: { // values between 0 and 100
        first:  [ 10, 20, 30, 40, 50, 60, 70 ],  // one value per dimension
        second: [ 70, 60, 50, 40, 30, 20, 10 ]
      },
      styles: {  // choose color here
        first: 'fill:orange;stroke:red;stroke-width:3;',
        second: 'fill:lime;stroke:purple;stroke-width:3;'
      },
      css_styles: {  // choose opacity here
        first: {
          "fill-opacity": 0.5
        },
        second: {
          "fill-opacity": 0.5
        }
      },
      css_classes: {
        radiant_text: {
          "font-family": "Verdana",
          "font-size": "10"
        }
      },

      radiant_text: 1, // add text after x data points; 1 = every

      html: {  // size of SVG image
        main:  {
          tag: 'svg',
          style: 'padding: 15px;',
          width:"230",
          height:"200",
          viewport: "0 0 200 200",
          // transform: "translate(10, 10)",
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
      
        // has logger instance? => log 'render' event
        if ( self.logger ) self.logger.log( 'render' );

        const dim_count = self.dimensions.length;
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
          radiants.push({ tag: 'line', x1: 100, y1: 100, x2: endx, y2: endy, class: 'radiants', "stroke-width":"0.1", stroke:"black", "stroke-dasharray":"5, 2"  });

          // add text, not for every data
          if ( index % self.radiant_text === 0 ){
            radiants.push({ tag: 'circle', cx: endx, cy: endy, r: 2, fill:"grey", "stroke-width":"0.1", stroke:"grey" });
            radiants.push({ tag: 'text', fill: 'grey', x: endx-3*(''+self.dimensions[ index ]).length, y: endy-5, class: 'radiant_text', inner: self.dimensions[ index ] });
          }

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
          list.push({ tag: 'polygon', id: candidate, points: polygons[candidate].join(' '), style: self.styles[candidate]});
        });

        // draw radiants
        list.push(...radiants);

        [50,100].map( radius => {
          list.push({ tag: 'circle', cx: 100, cy: 100, r: radius, fill:"none", "stroke-width":"0.4", stroke:"black", "stroke-dasharray":"5, 2" });
        });
        
        // prepare main HTML structure
        const main_elem = $.html( self.html.main );
        
        // set content of own website area
        $.setContent( self.element, main_elem );

        // Hack in order to get SVG rendered inside the shadow root
        self.element.innerHTML += '';

        // set CSS styles for elements with id-s from config JSON settings
        if ( self.css_styles ) Object.keys(self.css_styles).map(selector=>{
          Object.keys(self.css_styles[selector]).map(key=>{
            self.element.querySelector('#'+selector).style.setProperty(key, self.css_styles[selector][key]);
          });
        });

        // set CSS styles for elements with CSS classes from config JSON settings
        if ( self.css_classes ) Object.keys(self.css_classes).map(selector=>{
          Object.keys(self.css_classes[selector]).map(key=>{
            [...self.element.querySelectorAll('.'+selector)].map( elem => {
              elem.style.setProperty(key, self.css_classes[selector][key]);
            });
           });
        });

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}