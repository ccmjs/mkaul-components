/**
 * @overview ccm component for parkhaus
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component  = {

    name: 'parkhaus',
    version: [6,0,0],
  
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',
    
    config: {
      name: "CarHome",
      server_url: "http://localhost:8080/DemoServlet6",
      html: {
        main: {
          inner: [
              { tag: 'h2', inner: [
                  'Autos im Parkhaus: &nbsp; ',
                { tag: 'span', class: 'counter', inner: '0' },
                  ', &nbsp; Max: &nbsp; ',
                { tag: 'input', class: 'counter', type: 'number', min: 0, value: 20, oninput: '%oninput%' },
                  ' &nbsp; Öffnungszeiten von : &nbsp; ',
                { tag: 'input', class: 'open_from', type: 'number', min: 0, max: 24, value: 6, oninput: '%oninput%' },
                  ' &nbsp; bis: &nbsp; ',
                { tag: 'input', class: 'open_to', type: 'number', min: 0, max: 24, value: 24, oninput: '%oninput%' },
                  ' &nbsp; ',
                { tag: 'span', class: 'date' },

            ] },
            { tag: 'button', class: 'enter', onclick: '%enter%', inner: 'Enter', title: 'Drive your car into the garage!' },
            ' &nbsp; Ticket: ',
            { tag: 'span', class: 'ticket_hash' },
            { tag: 'span', class: 'extra_buttons' },
            { tag: 'span', class: 'extra_charts' },
            { tag: 'img', class: 'entry', src: '%car%', width: '202', height: '74' },
            { tag: 'span', class: 'traffic_light' },
            { tag: 'img', src: '%parking_garage%', width: '250', height: '235' },
            { tag: 'div', inner: 'Click car to exit:' },
            { class: 'garage' },
            { tag: 'img', class: 'exit', src: '%empty%', width: '202', height: '74' },
            { tag: 'hr' },
            { tag: 'table', inner: [
              { tag: 'tr', inner: [ { tag: 'th', inner: 'Nr', title: 'Nr des Autos' }, { tag: 'th', inner: 'Von', title: 'Startzeit des Parkens' }, { tag: 'th', inner: 'Bis', title: 'Endzeit des Parkens' }, { tag: 'th', inner: 'Dauer', title: 'Wie lange war das Auto im Parkhaus?' }, { tag: 'th', inner: 'Ticket', title: 'Ticket Hash' }, { tag: 'th', inner: 'Preis', title: 'Parkgebühren' } ] }
            ] },
            { tag: 'div', class: 'errors', style: 'display: none;' }
          ]
        },
        row: { tag: 'tr', inner: [ { tag: 'td', inner: '%nr%' }, { tag: 'td', inner: '%von%' }, { tag: 'td', inner: '%bis%' }, { tag: 'td', inner: '%dauer%' }, { tag: 'td', inner: '%ticket%' }, { tag: 'td', inner: '%preis%' } ] },
        extra_button_div: { inner: [
          { tag: 'button', class: '%extra_class%', inner: '%extra_inner%', title: '%extra_popup_title%' },
          { tag: 'span', class: '%extra_class%' }
        ] },
        extra_chart_div: { inner: [
            { tag: 'button', class: '%extra_class%', inner: '%extra_inner%', title: '%extra_popup_title%' },
            { tag: 'input', class: '%extra_class%', type: 'checkbox' },
            { tag: 'div', class: '%extra_class%' }
          ] }
      },

      images: {
        car: 'https://ccmjs.github.io/mkaul-components/parkhaus/resources/car.png',
        parking_garage: 'https://ccmjs.github.io/mkaul-components/parkhaus/resources/parking_garage.png',
        empty: 'https://ccmjs.github.io/mkaul-components/parkhaus/resources/empty.png'
      },

      messages: {
        parkhaus_full: 'Sorry, Parkhaus is full.',
        parkhaus_closed: 'Sorry, Parkhaus is closed.'
      },

      extra_buttons: [
        {
          extra_class: 'sum',
          extra_inner: 'Sum',
          extra_popup_title: 'Sum of all parking fees'
        }
      ],

      extra_charts: [
        {
          extra_class: 'chart',
          extra_inner: 'Chart',
          extra_popup_title: 'Chart of all parking fees'
        }
      ],

      traffic_light: {
        tag: 'svg', viewBox: '0 0 200 500', xmlns: 'http://www.w3.org/2000/svg', width: '40', height: '100', inner: [
          {
            "tag": "rect",
            "style": "fill: rgb(100, 86, 86);",
            "width": "200",
            "height": "500",
            "rx": "30",
            "ry": "30"
          },
          {
            "tag": "circle",
            "id": "green",
            "style": "fill: rgb(77, 251, 3);",
            "cx": "98.65",
            "cy": "407.68",
            "r": "70.2"
          },
          {
            "tag": "circle",
            "id": "yellow",
            "style": "fill: rgb(239, 251, 3);",
            "cx": "98.78",
            "cy": "247.42",
            "r": "70.2"
          },
          {
            "tag": "circle",
            "id": "red",
            "style": "fill: rgb(251, 3, 3);",
            "cx": "99.55",
            "cy": "81.53",
            "r": "70.2"
          }
          ]
      },
      car: {
        tag: 'svg', id: '%id%', class: 'car', viewBox: '0 0 310 255', xmlns: 'http://www.w3.org/2000/svg', inner: [
          {
            "tag": "g",
            "transform": "translate(2.441785,-204.56609)",
            "style": "fill:#000000;fill-opacity:1;stroke:none",
            "inner": [
              {
                "tag": "path",
                "style": "fill-opacity: 0.85; fill-rule: evenodd; paint-order: stroke; stroke: rgb(0, 0, 0); stroke-width: 8px; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 4; fill: %color%;",
                "d": "m -53.582954,-415.35856 c -13.726061,-0.48561 -25.554278,3.95581 -32.848561,19.90697 l -26.336555,65.94442 c -19.18907,5.29042 -27.54259,19.22853 -27.98516,30.66415 l 0,86.34597 25.30617,0 0,29.05676 c -1.22633,27.69243 44.157018,28.76272 45.171926,-0.28851 l 0.535799,-28.52096 164.160378,0 0.535798,28.52096 c 1.014898,29.05121 46.439469,27.98094 45.213139,0.28851 l 0,-29.05676 25.26495,0 0,-86.34597 c -0.44257,-11.43562 -8.79607,-25.37375 -27.98516,-30.66415 l -26.33655,-65.94442 c -7.29428,-15.95113 -19.122506,-20.39255 -32.848559,-19.90697 l -131.847615,0 z m 3.008714,22.87447 c 1.148077,-0.006 2.358386,0.0326 3.585728,0.0824 l 119.070884,0.37094 c 10.897921,-0.25425 15.519886,3.3e-4 20.154262,10.30382 l 18.959016,51.10692 -197.50352,-0.24729 18.752943,-49.74682 c 2.924271,-9.95822 8.944151,-11.82604 16.980687,-11.87 l 0,3e-5 z m -41.462551,87.45878 c 11.803644,2e-5 21.39072,9.54587 21.39072,21.34951 0,11.80363 -9.587076,21.39072 -21.39072,21.39072 -11.803639,0 -21.390719,-9.58708 -21.390719,-21.39072 0,-11.80366 9.58708,-21.34951 21.390719,-21.34951 z m 209.950531,0 c 11.80364,-2e-5 21.3495,9.54587 21.3495,21.34951 0,11.80364 -9.54586,21.39072 -21.3495,21.39072 -11.80364,10e-6 -21.390719,-9.58708 -21.390719,-21.39072 0,-11.80364 9.587079,-21.34951 21.390719,-21.34951 z m -14.69214,-28.11863 0,0 z",
                "transform": "matrix(0.9797897,0,0,0.9877946,140.46678,619.88975)",
                "inner": {
                  "tag": 'title',
                  "inner": "%tooltip%",
                }
              }
            ]
          },
          {
            "tag": "rect",
            "style": "fill: rgb(216, 216, 216); paint-order: stroke; stroke: rgb(0, 0, 0); stroke-width: 8px;",
            "x": "100",
            "y": "134.69",
            "width": "111.26",
            "height": "44.79",
            "rx": "15",
            "ry": "15"
          },
          {
            "tag": "text",
            "text-anchor": "middle",
            "x": "150",
            "y": "170",
            "style": "white-space: pre; fill: rgb(51, 51, 51); font-size: 38px; text-align: center;",
            "inner": "%nr%"
          },
          // {
          //   "tag": "rect",
          //   "class": "leave_button",
          //   "onclick": "%leave%",  // does not work because of SVG Hack innerHTML += '' and re-rendering
          //   "style": "stroke:#fff;fill:#fff;fill-opacity:0;stroke-opacity:0;cursor:pointer;",
          //   "x": "90",
          //   "y": "120",
          //   "width": "140",
          //   "height": "70"
          // },
        ]
      },

      hash: [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/md5.js", "type": "module" } ],
      SALT: "123",

      chart: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/plotly/versions/ccm.plotly-1.1.1.js" ],

      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/parkhaus/resources/default.css' ]
      css: [ 'ccm.load',  'https://kaul.inf.h-brs.de/data/ccmjs/mkaul-components/parkhaus/resources/default.css' ]
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

        const main_elem = $.html( self.html.main, $.integrate({ enter: enter, oninput: oninput }, self.images ) );
        const ticket_hash = main_elem.querySelector('.ticket_hash');
        const table = main_elem.querySelector( 'table' );
        const error_div = main_elem.querySelector('.errors');
        const date_span = main_elem.querySelector('.date');

        let total = 0;
        const car_index = {};
        function getLength(){ return Object.keys( car_index ).length; }
        const garage = main_elem.querySelector('div.garage');

        class Car {
          constructor( spec ){
            if ( spec ){
              [ this.nr, this.timer, this._duration, this._price, this._hash, this._color ] = spec.split("/");
              [ 'nr', 'timer', '_duration', '_price' ].forEach( prop => this[prop] === '_' ? '_' : parseInt(this[prop]));
            } else {
              this.nr = total + 1;  // because the car has not entered the car_index
            }
            total = Math.max(total,this.nr);
            car_index[ this.id() ] = this;
          }
          id(){
            return 'car_' + this.nr;
          }
          hash(){
            return self.hash ? self.hash.md5( self.SALT + this.nr + this.timer ) : this.nr;
          }
          static find( id ){
            return car_index[ id ];
          }
          static getList( s ){
            const car_strings = s ? s.split(',') : [];
            return car_strings.map( spec => new Car( spec ) );
          }
          enter() {
            this.timer = (new Date()).getTime();
          }
          leave() {
            this._duration = (new Date()).getTime() - this.timer;
            delete car_index[ this.id() ];
            return this._duration;
          }
          gone(){
            if ( typeof this._duration === 'number' && this._duration > 0 ) return true;
            if ( typeof this.price() === 'number' && this.price() > 0 ) return true;
            return false;
          }
          begin() {
            return new Date( parseInt( this.timer ) ).toLocaleString();
          }
          end() {
            return new Date(parseInt( this.timer ) + parseInt( this._duration ) ).toLocaleString();
          }
          duration() {
            return this._duration;
          }
          price() {
            return Math.round(this._duration / self.simulation_speed );
            // return this._duration ? ' € ' + parseFloat(Math.round(this._duration / self.simulation_speed ) / 100).toFixed(2) : null;
          }
          color(){
            if ( ! this._color ){
              this._color = '#' + ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
            }
            return this._color;
          }
          toArray(){
            return [ this.nr, this.timer, this.duration(), this.price(), this.hash(), this.color() ].map(x => (x || '_').toString() );
          }
          tooltip(){
            return this.toArray().join(',');
          }
        }

        // render content to website
        $.setContent( self.element, main_elem );


        // load config from server
        // =======================
        // Max: 20, // maximum number of parking slots
        // open_from: 6,
        // open_to: 24,
        // delay: 100,
        // simulation_speed: 10,

        const config_string = await csv_get_request( "config", { name: self.name } );
        if ( config_string ){
          const [ Max, open_from, open_to, delay, simulation_speed ] = config_string.split(',');
          const config = { Max, open_from, open_to, delay, simulation_speed };
          Object.assign(self, config);
          // has logger instance? => log 'render' event
          if ( self.logger ) self.logger.log( 'render', config );
        }

        // ======= get cars from server =======
        const car_string = await csv_get_request( "cars", { name: self.name } );
        const car_list = Car.getList( car_string );
        Object.assign(self, { cars: car_list });
        car_list.filter( car => ! car.gone() ).forEach( car => add_car_image( car ) );
        car_list.filter( car => car.gone() ).forEach( car => addTableRow( car ) );

        class Counter {
          constructor( init ){
            this._value = init;
          }
          increment() { this._value += 1; };
          decrement() { this._value -= 1; };
          toString() { return this._value.toString(); }
          value() { return this._value; }
        }
        
        const counter = new Counter(0);

        if ( date_span ) setInterval(()=>{
          date_span.innerText = new Date().toLocaleString();
        },1000);

        // event handler for input elements
        function oninput( e ) {
          const newValue = parseInt(this.value);
          csv_post_event('change_' + this.classList, self[this.classList], this.value);
          self[this.classList] = newValue;
        }

        // render traffic light
        const traffic_light_span = main_elem.querySelector( 'span.traffic_light' );
        traffic_light_span.appendChild( $.html( self.traffic_light ) );
        traffic_light_span.innerHTML += ''; // SVG Hack
        const traffic_lights = {};
        ["red","yellow","green"].forEach(light=>{
          traffic_lights[light] = traffic_light_span.querySelector('#' + light);
        });
        switch_traffic_light( "red" ); // init

        function switch_traffic_light( color ){
          switch_off_traffic_lights();
          traffic_lights[color].style = `fill: ${color};`;
        }

        function switch_off_traffic_lights(){
          ["red","yellow","green"].forEach(light=>{
            traffic_lights[light].style = "fill: rgb(200, 160, 160);"
          });
        }

        // insert extra buttons
        const extra_div = main_elem.querySelector( '.extra_buttons' );
        if ( self.extra_buttons ){
          self.extra_buttons.forEach( extra_params => {
            const extra_sub_div = $.html( self.html.extra_button_div, extra_params );
            extra_div.appendChild( extra_sub_div );
            const extra_button = extra_sub_div.querySelector('button');
            const extra_span = extra_sub_div.querySelector('span');
            extra_button.addEventListener('click',function( e ){
              csv_get_request( extra_params.extra_class, {}, extra_span );
            });
          });
        }

        // insert extra charts
        const extra_charts = main_elem.querySelector( '.extra_charts' );
        if ( self.extra_charts ){
          self.extra_charts.forEach(extra_params => {
            const extra_sub_div = $.html( self.html.extra_chart_div, extra_params );
            extra_charts.appendChild( extra_sub_div );
            const extra_chart = extra_sub_div.querySelector('button');
            const checkbox = extra_sub_div.querySelector('input');
            checkbox.checked = true;
            checkbox.style.display = 'none';
            checkbox.addEventListener('click', function(e){
              if ( extra_div.style.display === 'none' ){
                extra_div.style.display = 'block';
              } else {
                extra_div.style.display = 'none';
              }
            });
            const extra_div = extra_sub_div.querySelector('div');
            extra_chart.addEventListener('click',async function( e ){
              let config, response;
              try {
                response = await csv_get_request( extra_params.extra_class, {} );
                config = JSON.parse( response );
                config.root = extra_div;
                self.chart.start( config );
                checkbox.style.display = 'inline';
              } catch( err ){
                show_error( "" + err.toString() + "<br>" + response )
              }
            });
          });
        }

        function add_car_image( car ){
          const newCarImage = $.html( self.car, {
            id: car.id(),
            nr: car.nr,
            color: car.color(),
            tooltip: car.tooltip()
          });
          garage.appendChild( newCarImage );
          garage.innerHTML += '';
          const allCars = garage.querySelectorAll('.car');
          [...allCars].forEach( car => {
            car.onclick = leave;
            car.style += ';cursor:pointer;';
          });
        }
  
        async function enter( e ) {
          e.preventDefault();
          if ( counter.value() >= self.Max ){
            alert( self.messages.parkhaus_full );
            csv_post_event( 'full', (new Date()).getTime() );
          } else if ( self.open_from && self.open_from > (new Date()).getHours() ||
                      self.open_to && (new Date()).getHours() > self.open_to ) {
            alert( self.messages.parkhaus_closed );
            csv_post_event( 'closed', (new Date()).getTime() );
          } else {
            counter.increment();
            const car = new Car();
            car.enter();
            ticket_hash.innerText = car.hash();
            await sleep( self.delay );
            switch_traffic_light( "yellow" );
            await sleep( self.delay );
            switch_traffic_light( "green" );
            csv_post_event( 'enter', ...car.toArray() );
            add_car_image( car );
            main_elem.querySelector("span.counter").innerText = counter.toString();
            main_elem.querySelector("img.entry").src = self.images.empty;
            await sleep( self.delay );
            switch_traffic_light( "red" );
            main_elem.querySelector("img.entry").src = self.images.car;
         }
        }
  
        async function leave( e ) {
          e.preventDefault();
          const car_svg = this;
          const chosen_car = Car.find( this.id );
          if ( chosen_car ){
            counter.decrement();
            chosen_car.leave();
            csv_post_event( 'leave', ...chosen_car.toArray() );
            await sleep( self.delay );
            garage.removeChild( car_svg );
            main_elem.querySelector("img.exit").src = self.images.car;
            await sleep( self.delay );
            main_elem.querySelector("img.exit").src = self.images.empty;
            main_elem.querySelector("span.counter").innerText = counter.toString();
            addTableRow( chosen_car );
           } else {
            csv_post_event( 'empty', (new Date()).getTime() );
          }
        }

        function addTableRow( car ){
          table.appendChild( $.html( self.html.row, {
              nr: car.nr,
              von: car.begin(),
              bis: car.end(),
              dauer: time( car.duration() ),
              ticket: car.hash(),
              preis: ' € ' + ( car.price() || 0 ) / 100 }
            )
          );
        }

        function time( nr ){
          const msec = ""+nr % 1000; nr /= 1000; nr = Math.floor( nr );
          const sec = ""+nr % 60; nr /= 60; nr = Math.floor( nr );
          const min = ""+nr % 60; nr /= 60; nr = Math.floor( nr );
          const hours = ""+nr % 24; nr /= 24; nr = Math.floor( nr );
          if ( nr === 0 ) return `${min.padStart(2, '0')}:${sec.padStart(2, '0')}.${msec.padStart(3, '0')}`;
          const days = ""+nr;
          if ( nr === 0 ) return `${hours.padStart(2, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}.${msec.padStart(3, '0')}`;
          return `${days}.${hours.padStart(2, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}.${msec.padStart(3, '0')}`;
        }

        async function csv_get_request( command, params, extra_span ){
          const request = new Request( self.server_url
            + '?cmd=' + command
            + Object.entries( params ).map(([key, value])=>'&'+key+'='+value).join()
          );
          let response;
          try {
            response = await fetch( request, {
              method: 'GET',
              mode: 'cors',
              cache: 'no-store',
              headers:{
                'Content-Type': 'text/html'
              }
            });
            if (!response.ok) // or check for response.status
              throw new Error(response.statusText);
            // process body
            const response_string = (await response.text()).trim();
            return command_interpreter( response_string, extra_span );
          } catch (err) {
            console.log(request, err);
            show_error( "<h1>"
              + request.url + " failed.<br>"
              + err.message + "<br>" + err.stack + "</h1>" );
          }
        }

        async function csv_post_request( command, params, extra_span ){
          const headers = new Headers();
          const formData = new FormData();
          formData.append( 'cmd', command );
          Object.entries( params ).forEach( ([key, value])=> {
            formData.append( key, value );
          });
          // headers.append("Content-Type", "multipart/form-data");
          headers.append("Content-Type", "application/x-www-form-urlencoded");
          // headers.append("Content-Length", formData.length.toString());
          const response = await fetch( new Request( self.server_url ), {
            method: 'POST',
            mode: 'cors',
            cache: 'no-store',
            body: formData,
            headers: headers
          });
          const response_string = (await response.text()).trim();
          return command_interpreter( response_string, extra_span );
        }

        async function csv_post_event( event, ...values ){
          const request = [ event, ...values ].join(",");
          const response = await fetch( new Request( self.server_url ), {
            method: 'POST',
            mode: 'cors',
            cache: 'no-store',
            body: request,
            headers:{
              'Content-Type': 'text/plain'
            }
          });
          const response_string = (await response.text()).trim();
          command_interpreter( response_string );
        }

        function command_interpreter( response_string, extra_span ){
          if ( response_string.indexOf('HTTP Status') >= 0 ){ // error
            show_error( response_string );
          } else { // generic interpreter for server responses: Where? What? Params...
            const [ selector, command, content ] = response_string.split(',', 2);
            if ( main_elem && /^[a-zA-Z]/.test(selector) && main_elem.querySelector( selector ) ){
              if ( "insertHTML" === command  ){
                main_elem.querySelector( selector ).innerHTML = content;
              } else {
                main_elem.querySelector( selector ).innerText = content;
              }
            } else if ( extra_span ) {
              extra_span.innerHTML = response_string;
            } else {
              console.log( response_string );
              return response_string;
            }
          }
        }

        async function sleep( msec ) {
          return new Promise(resolve => setTimeout(resolve, msec));
        }

        function show_error( message ){
          error_div.innerHTML += message;
          error_div.style.display = 'block';
        }

      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );