/**
 * @overview ccm component for a bar chart using the D3.js library
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT) and BSD for D3.js
 * @version latest (4.0.0)
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
    name: 'd3_bar_chart',

    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://akless.github.io/ccm/version/ccm-18.0.0.min.js',
    ccm: '//akless.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      d3: [ "ccm.load", "https://ccmjs.github.io/mkaul-components/lib/d3.v4.min.js" ],

      data: "https://ccmjs.github.io/mkaul-components/d3_bar_chart/resources/sales.csv",

      data_dimensions: {
        x: 'salesperson',
        y: 'sales'
      },

      size: {
        width: 640,
        height: 320,
        margin: {
          top: 20,
          right: 20,
          bottom: 30,
          left: 40
        }
      },

      html: {
        main: {
          inner: {
            class: "chart",
            tag: 'svg'
          }
        }

      },

      css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/d3_bar_chart/resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/d3_bar_chart/resources/default.css' ],
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
        if ( self.logger ) self.logger.log( 'start' );

        // prepare main HTML structure
        const main_elem = $.html( self.html.main );

        // set the dimensions and margins of the graph
        // according to Malcolm Maclean: D3 Tips and Tricks v4.x
        // https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4
        let margin = {
            top: self.size.margin.top,
            right: self.size.margin.right,
            bottom: self.size.margin.bottom,
            left: self.size.margin.left
          },
          width = (self.size.width) - margin.left - margin.right,
          height = (self.size.height) - margin.top - margin.bottom;

        // set the ranges
        let x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
        let y = d3.scaleLinear()
          .range([height, 0]);

        // append the svg object to the shadow DOM:
        // ========================================
        // When used globally, d3.js selects a node in the DOM via element id, i.e. "svg"
        // Inside a shadow DOM this does not work.
        // Use the element instead, which has already been selected.
        // In this case main_elem.querySelector("svg").
        // Instead of "svg" you write main_elem.querySelector("svg").
        let svg = d3.select(main_elem.querySelector("svg"))
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          // append a 'group' element to 'svg'
          .append("g")
          // move the 'group' element to the top left margin
          .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        // get the data
        d3.csv(self.data, function(error, data) {
          if (error) throw error;

          if ( ! self.data_dimensions ){
            self.data_dimensions = {};
            self.data_dimensions.x =  Object.keys( data[ 0 ] )[ 0 ];
            self.data_dimensions.y =  Object.keys( data[ 0 ] )[ 1 ];
          }

          // format the data
          data.forEach(function(d) {
            d[self.data_dimensions.y] = +d[self.data_dimensions.y];
          });

          // Scale the range of the data in the domains
          x.domain(data.map(function(d) { return d[self.data_dimensions.x]; }));
          y.domain([0, d3.max(data, function(d) { return d[self.data_dimensions.y]; })]);

          // append the rectangles for the bar chart
          svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d[self.data_dimensions.x]); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d[self.data_dimensions.y]); })
            .attr("height", function(d) { return height - y(d[self.data_dimensions.y]); });

          // add x Axis
          svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

          // add y Axis
          svg.append("g")
            .call(d3.axisLeft(y));

          // set content of own website area
          $.setContent( self.element, main_elem );

          // Hack in order to get SVG rendered inside the shadow root
          // Otherwise the SVG elements are part of the DOM, but not rendered.
          self.element.innerHTML += '';


        });

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}