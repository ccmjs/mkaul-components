/**
 * @overview ccm component for difference_chart
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
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

    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://akless.github.io/ccm/version/ccm-12.8.0.min.js',
    ccm: '//akless.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      pairs: [
        ['Erwartungen-entsprochen', 'nicht-entsprochen'],
        ['unerfreulich', 'erfreulich'],
        ['unverständlich', 'verständlich'],
        ['leicht zu lernen', 'schwer zu lernen'],
        ['erfrischend', 'einschläfernd'],
        ['langweilig', 'spannend'],
        ['uninteressant', 'interessant'],
        ['unberechenbar', 'voraussagbar'],
        ['schnell', 'langsam'],
        ['neu', 'alt'],
        ['unbedienbar', 'bedienbar'],
        ['gut', 'schlecht'],
        ['kompliziert', 'einfach'],
        ['abstoßend', 'anziehend'],
        ['veraltet', 'modern'],
        ['unangenehm', 'angenehm'],
        ['problemorientiert', 'theoretisch'],
        ['abwechslungsreich', 'eintönig'],
        ['zuverlässig', 'unzuverlässig'],
        ['ineffizient', 'effizient'],
        ['übersichtlich', 'verwirrend'],
        ['stockend', 'flüssig'],
        ['aufgeräumt', 'überladen'],
        ['nützlich', 'zeitverschwendend'],
        ['sympathisch', 'unsympathisch'],
        ['unauffällig', 'auffällig'],
        ['strukturiert', 'chaotisch'],
        ['Konstruktiv', 'Destruktiv'],
        ['Aktiv', 'Passiv'],
        ['Kooperativ', 'Nicht-kooperativ'],
        ['Zweckbestimmt', 'Zweckfrei'],
        ['Kontext-orientiert', 'Kontextlos'],
        ['Vorwissen-berücksichtigend', 'Vorwissen-ignorierend'],
        ['Praktisch', 'Theoretisch'],
        ['Reflektierend', 'Gedankenlos'],
        ['Fließend', 'Stockend'],
        ['Innovativ', 'Alt-bekannt']
      ],
      values: [
        [
          "3.01",
          "5.12",
          "5.40",
          "4.13",
          "3.80",
          "5.05",
          "5.19",
          "4.41",
          "4.65",
          "4.43",
          "4.78",
          "4.00",
          "4.46",
          "4.76",
          "5.17",
          "4.77",
          "4.08",
          "3.70",
          "4.63",
          "4.69",
          "4.08",
          "4.66",
          "4.12",
          "4.28",
          "3.62",
          "4.38",
          "4.25",
          "3.81",
          "3.69",
          "3.58",
          "3.70",
          "3.55",
          "3.78",
          "4.08",
          "3.71",
          "4.29",
          "4.35"
        ],
        [
          "2.54",
          "4.92",
          "5.11",
          "3.61",
          "3.99",
          "4.42",
          "4.54",
          "4.33",
          "3.85",
          "4.28",
          "4.65",
          "3.62",
          "4.63",
          "4.43",
          "4.92",
          "4.70",
          "4.10",
          "3.84",
          "3.75",
          "4.92",
          "3.23",
          "4.73",
          "3.48",
          "3.83",
          "3.28",
          "3.94",
          "3.47",
          "3.35",
          "3.36",
          "3.24",
          "3.06",
          "3.10",
          "3.65",
          "4.10",
          "3.47",
          "3.91",
          "4.18"
        ],
        [
          "3.09",
          "4.77",
          "5.02",
          "4.09",
          "4.16",
          "4.95",
          "5.02",
          "4.09",
          "4.76",
          "3.95",
          "4.58",
          "4.05",
          "4.35",
          "4.63",
          "5.21",
          "4.63",
          "3.93",
          "3.88",
          "4.86",
          "4.33",
          "4.12",
          "4.30",
          "4.28",
          "4.40",
          "3.56",
          "4.67",
          "4.21",
          "3.83",
          "3.74",
          "3.95",
          "3.64",
          "3.65",
          "3.47",
          "3.93",
          "3.72",
          "4.36",
          "4.35"
        ],
        [
          "2.47",
          "5.30",
          "5.25",
          "3.58",
          "3.73",
          "4.82",
          "4.91",
          "4.14",
          "3.74",
          "3.43",
          "4.86",
          "3.42",
          "4.23",
          "4.65",
          "5.30",
          "5.00",
          "4.28",
          "3.67",
          "3.79",
          "5.16",
          "3.48",
          "4.88",
          "3.77",
          "3.72",
          "3.19",
          "4.53",
          "3.63",
          "3.35",
          "3.19",
          "2.98",
          "2.93",
          "3.00",
          "3.44",
          "4.28",
          "3.40",
          "3.77",
          "3.53"
        ]
      ],
      raster: [1,2,3,4,5,6,7],
      colors: ['red','blue','orange','green'],
      // ignore: [0,2],
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

      css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/difference_chart/resources/default.css' ],
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

        const svg_element_list = self.html.main.inner;
        const start = { x: svg_element_list[0].x, y: svg_element_list[0].y };
        const raster_width = svg_element_list[0].width / (self.raster.length+1);
        const fontSize = 15;
        const viewBox = self.html.main.viewBox.split(' ');

        if (self.ignore){
          self.ignore.map(i=>delete self.values[i]);
        }

        // Draw vertical raster lines
        self.raster.map((next,index)=>{
          svg_element_list.push({ tag: 'path', stroke: 'grey', "stroke-dasharray": "10, 5", "stroke-width": 0.2, d: `M${start.x+next*raster_width} ${start.y} V${svg_element_list[0].height+fontSize}`  });
          svg_element_list.push({ tag: 'text', fill: 'black', x: start.x+next*raster_width-fontSize/3, y: start.y-4, class: 'legend', inner: next });
        });

        start.y += 0.75*fontSize;

        // Draw horizontal raster lines
        draw_horizontal_raster_lines( self.pairs.length );

        function draw_horizontal_raster_lines( count ){
          let i=0;
          for (i=0; i<count; i++){
            svg_element_list.push( { tag: 'path', stroke: 'grey', "stroke-dasharray": "10, 5", "stroke-width": 0.2, d: `M${start.x} ${start.y+i*fontSize} H${start.x + svg_element_list[0].width}`  } );
          }
        }

        // write legend texts left and right of rectangle
        self.pairs.map((pair, index)=>{
          svg_element_list.push({ tag: 'text', fill: 'black', x: 4, y: 4+start.y+index*fontSize, class: 'legend', inner: pair[0] });
          svg_element_list.push({ tag: 'text', fill: 'black', x: 0.75*viewBox[2], y: 4+start.y+index*fontSize, class: 'legend', inner: pair[1] });
        });

        // Draw Polyline for every value line ( = series )
        self.values.map((series,series_index)=>{
          const path = { tag: 'path', stroke: self.colors[series_index], "stroke-width": 1, fill: "transparent" };
          series.slice(0,1).map((value,value_index)=>{
            const x = start.x+raster_width*value;
            path.d = 'M '+ x +' '+start.y+' ';
            svg_element_list.push( { tag: 'circle', cx: x, cy: start.y, r: 2, fill: self.colors[series_index] } );
            svg_element_list.push({ tag: 'text', "font-size": 6, fill: self.colors[series_index], x: x-8, y: start.y-4, class: 'legend', inner: value });
          });
          series.slice(1).map((value,value_index)=>{
            const x = start.x+raster_width*value;
            const y = (value_index+1)*fontSize+start.y;
            path.d += 'L '+x+' '+y+' ';
            svg_element_list.push( { tag: 'circle', cx: x, cy: y, r: 2, fill: self.colors[series_index] } );
            svg_element_list.push({ tag: 'text', "font-size": 6, fill: self.colors[series_index], x: x-8, y: y-4, class: 'legend', inner: value });
          });
          svg_element_list.push( path );
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
      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}