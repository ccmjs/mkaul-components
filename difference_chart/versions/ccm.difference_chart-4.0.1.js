/**
 * @overview ccm component for difference_chart
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version 4.0.1
 * TODO: docu comments -> API
 * TODO: unit tests
 * TODO: builder component
 * TODO: i18n
 */

{

  var component  = {   // const not working in Safari

    /**
     * unique component name
     * @type {string}
     */
    name: 'difference_chart',
    version: [4,0,1],

    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-16.5.0.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',
    // ccm: 'https://kaul.inf.h-brs.de/data/ccmjs/mkaul-components/lib/ccm.js',
    // ccm: '../lib/ccm.js',
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      raster: [1,2,3,4,5,6,7],
      colors: ['red','blue','orange','green'],
      lineHeight: 15,
      font_size: 6,
      html: {
        main:  {
          tag: 'svg', // no width and height meaning responsive 100%
          style: 'border: green solid; margin: 2px;',
          viewBox: "0 0 600 600", // user coordinates
          // transform: "translate(10, 10)",
          inner: [
            { tag: 'rect', stroke: 'grey', x: 180, y: 20, width: 250, height: 576, fill: "transparent" }
          ]
        }
      },
      // question_numbering: true, if all questions have to get a sequence number
      // css: [ 'ccm.load',  'https://kaul.inf.h-brs.de/data/ccm/difference_chart/resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/difference_chart/resources/default.css' ],
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
       * @type {Object}
       */
      let $;
      
      /**
       * init is called once after all dependencies are solved and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.init = callback => {

        //  Is config given via LightDOM (inner HTML of Custom Element)?
        //  Then use it with higher priority
        if ( self.inner && self.inner.innerHTML.trim() ){

          // interprete LightDOM
          if ( self.inner.innerHTML.trim().startsWith('<') ){ // try XML parsing

            self.lightDOM = xml2json( self.inner );

          } else { // try JSON parsing

            self.lightDOM = JSON.parse( self.inner.innerHTML );
          }

          // console.log( JSON.stringify( self.lightDOM, null, 2 ) );

          // merge into config
          Object.assign( self, self.lightDOM );

        }

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

        const svg_element_list = self.html.main.inner;
        const start = { x: parseInt(svg_element_list[0].x), y: parseInt(svg_element_list[0].y) };
        const raster_width = parseInt(svg_element_list[0].width) / (self.raster.length+1);
        const viewBox = self.html.main.viewBox.split(' ');

        if (self.ignore){
          self.ignore.map(i=>delete self.values[i]);
        }

        // Draw vertical raster lines
        let start_raster = self.raster[0];
        self.raster.map((next,index)=>{
          svg_element_list.push({ tag: 'path', stroke: 'grey', "stroke-dasharray": "10, 5", "stroke-width": 0.2, d: `M${start.x+(index+1)*raster_width} ${start.y} V${svg_element_list[0].height+self.lineHeight}`  });
          svg_element_list.push({ tag: 'text', fill: 'black', x: start.x+(index+1)*raster_width-self.lineHeight/3, y: start.y-4, class: 'legend', inner: next });
        });

        start.y += 0.75*self.lineHeight;

        // Draw horizontal raster lines
        draw_horizontal_raster_lines( self.pairs && self.pairs.length || self.questions && self.questions.length );

        function draw_horizontal_raster_lines( count ){
          let i=0;
          for (i=0; i<count; i++){
            svg_element_list.push( { tag: 'path', stroke: 'grey', "stroke-dasharray": "10, 5", "stroke-width": 0.2, d: `M${start.x} ${start.y+i*self.lineHeight} H${start.x + svg_element_list[0].width}`  } );
          }
        }

        if ( self.questions ){
          // write legend texts left only
          self.questions.map((question, index)=>{
            svg_element_list.push({ tag: 'text', "font-size": self.font_size, fill: 'black', x: 4, y: start.y+index*self.lineHeight, class: 'legend', inner: ( self.question_numbering?((index+1) + ". "):"")
                + ( self.truncate_middle ?
                      truncate_middle(
                        (self.truncate ?
                            truncate(question, self.truncate) : question), self.truncate_middle )
                        : (self.truncate ?
                            truncate(question, self.truncate) : question)
                  )
            });
          });
        }

        if ( self.pairs ){
          // write legend texts left and right of rectangle
          self.pairs.map((pair, index)=>{
            svg_element_list.push({ tag: 'text', fill: 'black', x: 4, y: 4+start.y+index*self.lineHeight, class: 'legend', inner: pair[0] });
            svg_element_list.push({ tag: 'text', fill: 'black', x: 0.75*viewBox[2], y: 4+start.y+index*self.lineHeight, class: 'legend', inner: pair[1] });
          });
        }

        function x_coord( value, value_index ){
          let result = start.x+raster_width*( 1 +
            (value-self.raster[0]) / (self.raster[1]-self.raster[0])
          );
          if (isNaN(result)) debugger;
          return result;
        }

        // make it visible by translation: shift x a little bit
        if ( ! self.delta_x ) self.delta_x = 0;

        function delta_x( index ){
          return index * self.delta_x;
        }

        // Draw Polyline for every value line ( = series )
        self.values.map((series,series_index)=>{
          const path = { tag: 'path', stroke: getColor(series_index), "stroke-width": 1, fill: "transparent" };
          series.slice(0,1).map((value,value_index)=>{
            let x = x_coord( value, value_index );
            // x += delta_x(series_index);  // make it visible by translation
            path.d = 'M '+ x +' '+start.y+' ';
          });
          series.slice(1).map((value,value_index)=>{
            let x = x_coord( value, value_index );
            // x += delta_x(series_index); // make it visible by translation
            const y = (value_index+1)*self.lineHeight+start.y;
            path.d += 'L '+x+' '+y+' ';
          });
          svg_element_list.push( path );
        });

        // Draw circles on top
        self.values.map((series,series_index)=>{
          series.slice(0,1).map((value,value_index)=>{
            const x = x_coord( value, value_index );
            svg_element_list.push( { tag: 'circle', cx: x + delta_x(series_index), cy: start.y, r: 2, fill: getColor(series_index), inner: { tag: 'title', inner: value + " (" + getSeriesTitles( series_index ) + ")" } } );
            svg_element_list.push({ tag: 'text', "font-size": 6, fill: getColor(series_index), x: x-8, y: start.y-4, class: 'legend', inner: value });
          });
          series.slice(1).map((value,value_index)=>{
            const x = x_coord( value, value_index );
            const y = (value_index+1)*self.lineHeight+start.y;
            svg_element_list.push( { tag: 'circle', cx: x + delta_x(series_index), cy: y, r: 2, fill: getColor(series_index), inner: { tag: 'title', inner: value + " (" + getSeriesTitles( series_index ) + ")" } } );
            svg_element_list.push({ tag: 'text', "font-size": 6, fill: getColor(series_index), x: x-8, y: y-4, class: 'legend', inner: value });
          });
        });

        // Collision detection
        const all_texts = svg_element_list.filter(elem=>elem.tag==='text');
        let ready = false;
        while ( ! ready ){
          ready = true;
          all_texts.map(text1=>{
            all_texts.map(text2=>{
              if ((text1 !== text2) && (text1.y===text2.y) && (Math.abs(text1.x-text2.x)<10)){
                // make the great one even greater (more distance)
                ready = false;
                let diff = text1.x - text2.x;
                // if (parseFloat(text1.value)<parseFloat(text2.value)){
                if (diff < 0){
                  text2.x += 12-Math.abs(diff);
                } else {
                  text1.x += 12-Math.abs(diff);
                }
              }
            });
          });
        }

        // prepare main HTML structure
        const main_elem = $.html( self.html.main );

        // set content of own website area
        $.setContent( self.element, main_elem );

        // Hack in order to get SVG rendered inside the shadow root
        self.element.innerHTML += '';

        if ( callback ) callback();


        function truncate_middle( str, max, sep ) {

          // Default to 10 characters
          max = max || 10;

          var len = str.length;
          if (len > max) {

            // Default to elipsis
            sep = sep || "...";

            var seplen = sep.length;

            // If seperator is larger than character limit,
            // well then we don't want to just show the seperator,
            // so just show right hand side of the string.
            if (seplen > max) {
              return str.substr(len - max);
            }

            // Half the difference between max and string length.
            // Multiply negative because small minus big.
            // Must account for length of separator too.
            var n = Math.floor(-0.5 * (max - len - seplen));

            // This gives us the centerline.
            var center = Math.floor(len / 2);

            var front = str.substr(0, center - n);
            var back = str.substr(len - center + n); // without second arg, will automatically go to end of line.

            return front + sep + back;

          } else return str;
        }
      };

      /** react to config or attribute changes */
      this.update = function( key, newValue ){
        // key = attribute name or config key
        switch( key ){
          case "update_json":
            Object.assign( this, JSON.parse( newValue ) );
            break;
          case "update_xml":
            Object.assign( this, xml2json( new DOMParser().parseFromString( newValue, "text/html").body ) );
            break;
          case "clear":
            this.values = [];
            delete this.questions;
            delete this.pairs;
            this.raster = [];
            break;
          default:
            // e.g. if language is switched, write the new value into config before re-rendering via start()
            this[key] = newValue;
        }
        this.start();
      };

      function truncate(str, length, ending) {
        if (length == null) {
          length = 100;
        }
        if (ending == null) {
          ending = '...';
        }
        if (str.length > length) {
          return str.substring(0, length - ending.length) + ending;
        } else {
          return str;
        }
      }

      function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      function getColor( series_index ){
        if ( series_index < self.colors.length )
          return self.colors[ series_index ];
        else {
          self.colors.push( getRandomColor() );
          return getColor( series_index );
        }
      }

      function getSeriesTitles( series_index ){
        if ( self.series_titles && ( series_index < self.series_titles.length ) )
          return self.series_titles[ series_index ];
        else
          return "getSeriesTitles(" + series_index + " )";
      }

      // returns object { "node.tag": children contents ... }
      function xml2json( node, parent ){
        const tagName = node.tagName.toUpperCase();
        const result = {};
        node.getAttributeNames().map(a=>{result[a]=node.getAttribute(a);});
        if ( !result.tag ) result.tag = node.tagName.toLowerCase();

        switch ( tagName ) {
          case "BODY": case "DIV": // root of lightDOM
            [...node.children].map( child => {
              const key = child.getAttribute('tag') || child.tagName.toLowerCase();
              result[ key ]
                = child.children.length === 1
                ? xml2json( child.firstElementChild, result )
                : [...child.children].reduce((a,b)=>{a.push(xml2json(b, result));return a;},[]);
            });
            return result;
          case "MAIN":
            result[tagName.toLowerCase()] = xml2json( node.firstElementChild );
            return result;
          case "ARRAY":
            return node.innerText.trim().split(',').map(x => parseInt(x.trim()));
          case "MAKE":
            return result;
          case "QUESTIONS": case "VALUES":
          result[tagName.toLowerCase()] = [...node.children].reduce((a,b)=>{a.push(xml2json(b, result));return a;},[]);
          return result;
          case "SVG":
            result.inner = [...node.children].reduce((a,b)=>{a.push(xml2json(b, result));return a;},[]);
            return result;
          case "RASTER":
            return xml2json( node.firstElementChild );
          case "QUESTION": case "RECT":
          if ( node.innerText )
            return node.innerText.trim();
          else
            return result;
          default:
            debugger;
        }

      }

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}