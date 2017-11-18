/**
 * @overview ccm component for d3_donut
 * @link http://bl.ocks.org/NPashaP/9994181
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
    name: 'd3_donut',
    
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
      d3: [ 'ccm.load', 'https://d3js.org/d3.v3.min.js' ],
      data: [
        {label:"Basic", color:"#3366CC"},
        {label:"Plus", color:"#DC3912"},
        {label:"Lite", color:"#FF9900"},
        {label:"Elite", color:"#109618"},
        {label:"Delux", color:"#990099"}
      ],
      html: {
        main: {
          inner: [
            { tag: 'svg' },
            { tag: 'button', onClick: '%changeData%', inner: 'Change Data' },
          ]
        }
      },
      css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/d3_donut/resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/d3_donut/resources/default.css' ],
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
        
        // prepare main HTML structure
        const main_elem = $.html( self.html.main, { changeData: changeData } );

        !function(){
          var Donut3D={};

          function pieTop(d, rx, ry, ir ){
            if(d.endAngle - d.startAngle == 0 ) return "M 0 0";
            var sx = rx*Math.cos(d.startAngle),
              sy = ry*Math.sin(d.startAngle),
              ex = rx*Math.cos(d.endAngle),
              ey = ry*Math.sin(d.endAngle);

            var ret =[];
            ret.push("M",sx,sy,"A",rx,ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0),"1",ex,ey,"L",ir*ex,ir*ey);
            ret.push("A",ir*rx,ir*ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0), "0",ir*sx,ir*sy,"z");
            return ret.join(" ");
          }

          function pieOuter(d, rx, ry, h ){
            var startAngle = (d.startAngle > Math.PI ? Math.PI : d.startAngle);
            var endAngle = (d.endAngle > Math.PI ? Math.PI : d.endAngle);

            var sx = rx*Math.cos(startAngle),
              sy = ry*Math.sin(startAngle),
              ex = rx*Math.cos(endAngle),
              ey = ry*Math.sin(endAngle);

            var ret =[];
            ret.push("M",sx,h+sy,"A",rx,ry,"0 0 1",ex,h+ey,"L",ex,ey,"A",rx,ry,"0 0 0",sx,sy,"z");
            return ret.join(" ");
          }

          function pieInner(d, rx, ry, h, ir ){
            var startAngle = (d.startAngle < Math.PI ? Math.PI : d.startAngle);
            var endAngle = (d.endAngle < Math.PI ? Math.PI : d.endAngle);

            var sx = ir*rx*Math.cos(startAngle),
              sy = ir*ry*Math.sin(startAngle),
              ex = ir*rx*Math.cos(endAngle),
              ey = ir*ry*Math.sin(endAngle);

            var ret =[];
            ret.push("M",sx, sy,"A",ir*rx,ir*ry,"0 0 1",ex,ey, "L",ex,h+ey,"A",ir*rx, ir*ry,"0 0 0",sx,h+sy,"z");
            return ret.join(" ");
          }

          function getPercent(d){
            return (d.endAngle-d.startAngle > 0.2 ?
              Math.round(1000*(d.endAngle-d.startAngle)/(Math.PI*2))/10+'%' : '');
          }

          Donut3D.transition = function(id, data, rx, ry, h, ir){
            function arcTweenInner(a) {
              var i = d3.interpolate(this._current, a);
              this._current = i(0);
              return function(t) { return pieInner(i(t), rx+0.5, ry+0.5, h, ir);  };
            }
            function arcTweenTop(a) {
              var i = d3.interpolate(this._current, a);
              this._current = i(0);
              return function(t) { return pieTop(i(t), rx, ry, ir);  };
            }
            function arcTweenOuter(a) {
              var i = d3.interpolate(this._current, a);
              this._current = i(0);
              return function(t) { return pieOuter(i(t), rx-.5, ry-.5, h);  };
            }
            function textTweenX(a) {
              var i = d3.interpolate(this._current, a);
              this._current = i(0);
              return function(t) { return 0.6*rx*Math.cos(0.5*(i(t).startAngle+i(t).endAngle));  };
            }
            function textTweenY(a) {
              var i = d3.interpolate(this._current, a);
              this._current = i(0);
              return function(t) { return 0.6*rx*Math.sin(0.5*(i(t).startAngle+i(t).endAngle));  };
            }

            var _data = d3.layout.pie().sort(null).value(function(d) {return d.value;})(data);

            d3.select(main_elem.querySelector("#"+id)).selectAll(".innerSlice").data(_data)
              .transition().duration(750).attrTween("d", arcTweenInner);

            d3.select(main_elem.querySelector("#"+id)).selectAll(".topSlice").data(_data)
              .transition().duration(750).attrTween("d", arcTweenTop);

            d3.select(main_elem.querySelector("#"+id)).selectAll(".outerSlice").data(_data)
              .transition().duration(750).attrTween("d", arcTweenOuter);

            d3.select(main_elem.querySelector("#"+id)).selectAll(".percent").data(_data).transition().duration(750)
              .attrTween("x",textTweenX).attrTween("y",textTweenY).text(getPercent);
          };

          Donut3D.draw=function(id, data, x /*center x*/, y/*center y*/,
                                rx/*radius x*/, ry/*radius y*/, h/*height*/, ir/*inner radius*/){

            var _data = d3.layout.pie().sort(null).value(function(d) {return d.value;})(data);

            var slices = d3.select(main_elem.querySelector("#"+id)).append("g").attr("transform", "translate(" + x + "," + y + ")")
              .attr("class", "slices");

            slices.selectAll(".innerSlice").data(_data).enter().append("path").attr("class", "innerSlice")
              .style("fill", function(d) { return d3.hsl(d.data.color).darker(0.7); })
              .attr("d",function(d){ return pieInner(d, rx+0.5,ry+0.5, h, ir);})
              .each(function(d){this._current=d;});

            slices.selectAll(".topSlice").data(_data).enter().append("path").attr("class", "topSlice")
              .style("fill", function(d) { return d.data.color; })
              .style("stroke", function(d) { return d.data.color; })
              .attr("d",function(d){ return pieTop(d, rx, ry, ir);})
              .each(function(d){this._current=d;});

            slices.selectAll(".outerSlice").data(_data).enter().append("path").attr("class", "outerSlice")
              .style("fill", function(d) { return d3.hsl(d.data.color).darker(0.7); })
              .attr("d",function(d){ return pieOuter(d, rx-.5,ry-.5, h);})
              .each(function(d){this._current=d;});

            slices.selectAll(".percent").data(_data).enter().append("text").attr("class", "percent")
              .attr("x",function(d){ return 0.6*rx*Math.cos(0.5*(d.startAngle+d.endAngle));})
              .attr("y",function(d){ return 0.6*ry*Math.sin(0.5*(d.startAngle+d.endAngle));})
              .text(getPercent).each(function(d){this._current=d;});
          };

          this.Donut3D = Donut3D;
        }();

        var svg = d3.select(main_elem.querySelector('svg')).attr("width",700).attr("height",300);

        svg.append("g").attr("id","salesDonut");
        svg.append("g").attr("id","quotesDonut");

        Donut3D.draw("salesDonut", randomData(), 150, 150, 130, 100, 30, 0.4);
        Donut3D.draw("quotesDonut", randomData(), 450, 150, 130, 100, 30, 0);

        function changeData(){
          Donut3D.transition("salesDonut", randomData(), 130, 100, 30, 0.4);
          Donut3D.transition("quotesDonut", randomData(), 130, 100, 30, 0);
        }

        function randomData(){
          return self.data.map(function(d){
            return {label:d.label, value:1000*Math.random(), color:d.color};});
        }

        // set content of own website area
        $.setContent( self.element, main_elem );

        // Hack in order to get SVG rendered inside the shadow root
        self.element.innerHTML += '';

        callback && callback();

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}