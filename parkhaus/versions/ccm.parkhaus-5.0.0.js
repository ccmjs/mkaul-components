/**
 * @overview ccm component for parkhaus
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component  = {

    name: 'parkhaus',
    version: [5,0,0],
  
    // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',
    
    config: {
      server_url: "http://localhost:8080/DemoServlet",
      delay: 100,
      simulation_speed: 10,
      Max: 20, // maximum number of parking slots
      open_from: 6,
      open_to: 24,
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
            { tag: 'img', class: 'entry', src: '%car%', width: '202', height: '74' },
            { tag: 'span', class: 'traffic_light' },
            { tag: 'img', src: '%parking_garage%', width: '250', height: '235' },
            { class: 'garage' },
            { tag: 'img', class: 'exit', src: '%empty%', width: '202', height: '74' },
            { tag: 'hr' },
            { tag: 'table', inner: [
              { tag: 'tr', inner: [ { tag: 'th', inner: 'Nr', title: 'Nr des Autos' }, { tag: 'th', inner: 'Von', title: 'Startzeit des Parkens' }, { tag: 'th', inner: 'Bis', title: 'Endzeit des Parkens' }, { tag: 'th', inner: 'Dauer', title: 'Wie lange war das Auto im Parkhaus?' }, { tag: 'th', inner: 'Ticket', title: 'Ticket Hash' }, { tag: 'th', inner: 'Preis', title: 'Parkgebühren' } ] }
            ] },
            { tag: 'span', class: 'errors' }
          ]
        },
        row: { tag: 'tr', inner: [ { tag: 'td', inner: '%nr%' }, { tag: 'td', inner: '%von%' }, { tag: 'td', inner: '%bis%' }, { tag: 'td', inner: '%dauer%' }, { tag: 'td', inner: '%ticket%' }, { tag: 'td', inner: '%preis%' } ] },
        extra_button_div: { inner: [
          { tag: 'button', class: '%extra_class%', inner: '%extra_inner%', title: '%extra_popup_title%' },
          { tag: 'span', class: '%extra_class%' }
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
                "transform": "matrix(0.9797897,0,0,0.9877946,140.46678,619.88975)"
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

      hash: [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/md5.mjs", "type": "module" } ],
      SALT: "123",

      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/parkhaus/resources/default.css' ]
      css: [ 'ccm.load',  './resources/default.css' ]
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
        let total = 0;
        const begin = (new Date()).getTime();
      
        // has logger instance? => log 'render' event
        if ( self.logger ) self.logger.log( 'render' );
        
        // prepare main HTML structure
        const main_elem = $.html( self.html.main, $.integrate({ enter: enter, oninput: oninput }, self.images ) );
        const table = main_elem.querySelector( 'table' );
        const error_span = main_elem.querySelector('.errors');

        // insert timer
        const date_span = main_elem.querySelector('.date');
        if ( date_span ) setInterval(()=>{
          date_span.innerText = new Date().toLocaleString();
        },1000);

        // event handler for input elements
        function oninput( e ) {
          const newValue = parseInt(this.value);
          csv_message('change_' + this.classList, self[this.classList], this.value);
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
            if ( ! self.server_url ) return;
            extra_button.addEventListener('click', async function( e ){
              const response = await fetch( new Request( self.server_url + '?fun=' + extra_params.extra_class ), {
                method: 'GET',
                mode: 'cors',
                cache: 'no-store',
                headers:{
                  'Content-Type': 'text/html'
                }
              });
              const response_string = (await response.text()).trim();
              if ( response_string.indexOf('HTTP Status') >= 0 ){
                error_span.innerHTML = response_string;
              } else {
                extra_span.innerHTML = response_string;
              }
            });
          });
        }
        
        // set content of own website area
        $.setContent( self.element, main_elem );

        const garage = main_elem.querySelector('div.garage');
        const ticket_hash = main_elem.querySelector('.ticket_hash');
  
        function enter( e ) {
          e.preventDefault();
          if ( counter.value() >= self.Max ){
            alert( self.messages.parkhaus_full );
            csv_message( 'full', (new Date()).getTime() );
          } else if ( self.open_from && self.open_from > (new Date()).getHours() ||
                      self.open_to && (new Date()).getHours() > self.open_to ) {
            alert( self.messages.parkhaus_closed );
            csv_message( 'closed', (new Date()).getTime() );
          } else {
            counter.increment();
            const car = new Car();
            car.enter();
            ticket_hash.innerText = car.hash();
            setTimeout(function () {
              switch_traffic_light( "yellow" );
              setTimeout(function () {
                switch_traffic_light( "green" );
                csv_message( 'enter', ...car.toArray() );
                const newCarImage = $.html( self.car, {
                  id: car.id(),
                  nr: car.nr,
                  color: '#' + ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)
                });
                garage.appendChild( newCarImage );
                garage.innerHTML += '';
                const allCars = garage.querySelectorAll('.car');
                [...allCars].forEach( car => {
                  car.onclick = leave;
                  car.style += ';cursor:pointer;';
                });
                main_elem.querySelector("span.counter").innerText = counter.toString();
                main_elem.querySelector("img.entry").src = self.images.empty;
                setTimeout(function () {
                  switch_traffic_light( "red" );
                  main_elem.querySelector("img.entry").src = self.images.car;
                }, self.delay);
              }, self.delay);
            }, self.delay);
          }
        }
  
        function leave( e ) {
          e.preventDefault();
          const car_svg = this;
          const chosen_car = Car.find( this.id );
          if ( chosen_car ){
            counter.decrement();
            chosen_car.leave();
            csv_message( 'leave', ...chosen_car.toArray() );
            setTimeout(function () {
              garage.removeChild( car_svg );
              main_elem.querySelector("img.exit").src = self.images.car;
              setTimeout(function () {
                main_elem.querySelector("img.exit").src = self.images.empty;
                main_elem.querySelector("span.counter").innerText = counter.toString();
                table.appendChild( $.html( self.html.row, {
                  nr: chosen_car.nr,
                  von: chosen_car.begin(),
                  bis: chosen_car.end(),
                  dauer: chosen_car.duration(),
                  ticket: chosen_car.hash(),
                  preis: chosen_car.price() } ));
              }, self.delay);
            }, self.delay);
          } else {
            csv_message( 'empty', (new Date()).getTime() );
          }
        }

        const car_index = {};
        class Car {
          constructor(){
            total += 1;
            this.nr = total;
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
          enter() {
            this.timer = (new Date()).getTime();
          };
          leave() {
            this._duration = (new Date()).getTime() - this.timer;
            delete car_index[ this.id() ];
            return this._duration;
          };
          begin() {
            return this.timer - begin;
          };
          end() {
            return this.begin() + this._duration;
          };
          duration() {
            return this._duration;
          };
          price() {
            return this._duration ? ' € ' + parseFloat(Math.round(this._duration / self.simulation_speed ) / 100).toFixed(2) : null;
          }
          toArray(){
            return [ this.nr, this.begin(), this.end(), this.duration(), this.price(), this.hash() ].map(x => (x || '_').toString() );
          }
          toCSV() {
            return [ this.nr, this.begin(), this.end(), this.duration(), this.price() ].map(x => (x || '_').toString() ).join(",");
          }
          toJSON() {
            return {
              nr: this.nr,
              begin: this.begin(),
              end: this.end(),
              duration: this.duration(),
              price: this.price()
            }
          }
        }

        async function csv_message( event, ...values ){
          if ( ! self.server_url ) return;
          const result = [ event, ...values ].join(",");
          const response = await fetch( new Request( self.server_url ), {
            method: 'POST',
            mode: 'cors',
            cache: 'no-store',
            body: result,
            headers:{
              'Content-Type': 'text/plain'
            }
          });
          const response_string = (await response.text()).trim();
          if ( response_string.indexOf('HTTP Status') >= 0 ){
            error_span.innerHTML = response_string;
          }
        }

      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );