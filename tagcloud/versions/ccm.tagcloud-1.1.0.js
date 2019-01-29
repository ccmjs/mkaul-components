/**
 * @overview ccm component for tagcloud
 * @basedon https://github.com/shprink/d3js-wordcloud
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.1.0 29.01.2019 switch to datasets
 * version 1.0.0 28.01.2019 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( function () {

  "use strict";

  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'tagcloud',
    version: [1,1,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        main: {
          id: "vis"
        }
      },

      font: 'impact',
      method: 'archimedean',
      scale: 'sqrt',
      
      data: {  // fetched from store
        "store": [ "ccm.store", 'https://ccmjs.github.io/mkaul-components/tagcloud/resources/datasets.js' ],
        "key": "small"
      },

      // onchange: function(){ console.log( this.getValue() ); },

      d3: [ "ccm.load", { import: 'd3', url: "https://ccmjs.github.io/mkaul-components/tagcloud/resources/d3.js", type: "module" } ],

      d3_cloud: [ "ccm.load", { import: 'cloud', url: "https://ccmjs.github.io/mkaul-components/tagcloud/resources/d3.layout.cloud.js", type: "module" } ],
      
      // css: [ 'ccm.load',  './resources/default.css' ],
      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/tagcloud/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/tagcloud/resources/configs.js', 'log' ] ],
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
       * init is called once after all dependencies are solved and is then deleted
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

      };
      
      /**
       * is called once after the initialization and is then deleted
       */
      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready' );

      };
        
      /**
       * starts the instance
       */
      this.start = async () => {

        /**
         * dataset for rendering
         * The value of dataset starts with a clone of this.data,
         *     but additional values might be added during editing.
         * this.data is never changed, only dataset is changed.
         * @type {Object}
         */
        let dataset = await $.dataset( this.data );

        // given default values? => integrate them as defaults into initial values
        if ( this.ignore ) dataset = $.integrate( this.ignore.defaults, dataset, true );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main ) );

        const fill = self.d3.scale.category20b();

        const w = self.element.innerWidth || window.innerWidth,
          h = self.element.innerHeight || window.innerHeight;

        let max,
          fontSize;

        if ( ! self.d3.layout.cloud ) self.d3.layout.cloud = self.d3_cloud;
        const layout = self.d3.layout.cloud()
          .timeInterval(Infinity)
          .size([w, h])
          .fontSize(function(d) {
            return fontSize(+d.value);
          })
          .text(function(d) {
            return d.key;
          })
          .on("end", draw);

        const svg = self.d3.select(self.element.querySelector('#vis')).append("svg")
          .attr("width", w)
          .attr("height", h);

        const vis = svg.append("g").attr("transform", "translate(" + [w >> 1, h >> 1] + ")");

        update();

        if(window.attachEvent) {
          window.attachEvent('onresize', update);
        }
        else if(window.addEventListener) {
          window.addEventListener('resize', update);
        }

        function draw(data, bounds) {
          const w = self.element.innerWidth || window.innerWidth,
            h = self.element.innerHeight || window.innerHeight;

          svg.attr("width", w).attr("height", h);

          const scale = bounds ? Math.min(
            w / Math.abs(bounds[1].x - w / 2),
            w / Math.abs(bounds[0].x - w / 2),
            h / Math.abs(bounds[1].y - h / 2),
            h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;

          const text = vis.selectAll("text")
            .data(data, function(d) {
              return d.text.toLowerCase();
            });
          text.transition()
            .duration(1000)
            .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("font-size", function(d) {
              return d.size + "px";
            });
          text.enter().append("text")
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("font-size", function(d) {
              return d.size + "px";
            })
            .style("opacity", 1e-6)
            .transition()
            .duration(1000)
            .style("opacity", 1);
          text.style("font-family", function(d) {
            return d.font;
          })
            .style("fill", function(d) {
              return fill(d.text.toLowerCase());
            })
            .text(function(d) {
              return d.text;
            });

          vis.transition().attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
        }

        function update() {
          layout.font( self.font ).spiral( self.method );
          fontSize = self.d3.scale[ self.scale ]().range([10, 100]);
          if (dataset.tags.length){
            fontSize.domain([+dataset.tags[dataset.tags.length - 1].value || 1, +dataset.tags[0].value]);
          }
          layout.stop().words(dataset.tags).start();
        }

      };
      
      /**
       * current state of this editor
       * @returns {Object} state of editor
       */
      this.getValue = () => {
        return $.clone( dataset );
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();