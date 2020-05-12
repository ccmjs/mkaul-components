/**
 * @overview ccm component for parkhaus
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component  = {

    name: 'parkhaus',
    version: [8,0,0],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.4.0.min.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-5.1.0.min.mjs" ],

    config: {
      name: "CarHome",
      // server_url: "http://localhost:8080/DemoServlet7",
      Max: 10, // maximum number of parking slots
      open_from: 6,
      open_to: 24,
      delay: 100,
      simulation_speed: 10,
      simulation: {
        max: 3,    // range of random choices is 0 ... max-1
        enter: 2,  // enter car into garage for all random choices below this enter value
        delay: 2   // wait for simulation delay factor * self.delay
      },
      html: {
        main: {
          inner: [
                { "tag": "p", "class": "alert", "inner": "" },  // html.main.inner.0.inner
                { tag: 'h2', inner: [
                  'Autos im Parkhaus "%name%": &nbsp; ',
                { tag: 'span', class: 'counter', inner: '0' },
                  ', &nbsp; Max: &nbsp; ',
                { tag: 'input', class: 'Max', type: 'number', min: 0, value: "%Max%", oninput: '%oninput%' },
                  ' &nbsp; Frei: &nbsp; ',
                { tag: 'span', class: 'free', inner: ' &nbsp; &nbsp; ' },
                  ' &nbsp; Öffnungszeiten von : &nbsp; ',
                { tag: 'input', class: 'open_from', type: 'number', min: 0, max: 24, value: "%open_from%", oninput: '%oninput%' },
                  ' &nbsp; bis: &nbsp; ',
                { tag: 'input', class: 'open_to', type: 'number', min: 0, max: 24, value: "%open_to%", oninput: '%oninput%' },
                  ' &nbsp; ',
                { tag: 'div', class: 'date', inner: '%date%' },
                 'Simulation: &nbsp; ',
                { tag: 'button', class: 'start', onclick: '%start_simulation%', inner: 'Start', title: 'Start simulation!' },
                { tag: 'button', class: 'stop', onclick: '%stop%', inner: 'Stop', title: 'Stop simulation!' }
            ] },
            { class: 'button_container', inner: [
                { tag: 'button', class: 'enter', onclick: '%enter%', inner: 'Enter', title: 'Drive your car into the garage!' },
                ' &nbsp; Ticket: ',
                { tag: 'span', class: 'ticket_hash' }
              ] },
            { class: 'button_container', inner: [ { tag: 'span', class: 'extra_buttons' } ] },
            { class: 'button_container', inner: [ { tag: 'span', class: 'extra_charts' } ] },
            { tag: 'img', class: 'entry', src: '%car%', "width":"80", "height":"30" },
            { tag: 'span', class: 'traffic_light' },
            { tag: 'img', src: '%parking_garage%', "width":"125", "height":"117" },
            { class: 'exit_car_container', inner: { tag: 'img', class: 'exit', src: '%empty%', "width":"80", "height":"30" } },
            { class: 'garage' },
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
        parkhaus_closed: 'Sorry, Parkhaus is closed.',
        occupied_slot: { tag: 'li', inner: '%id% schon belegt.' },
        invalid_slot: { tag: 'li', inner: '%id% ungültig.' },
      },

      // "extra_buttons": [
      //   {
      //     "extra_class": "sum",
      //     "extra_inner": "SUM",
      //     "extra_popup_title": "Sum of all parking fees"
      //   },
      //   {
      //     "extra_class": "avg",
      //     "extra_inner": "AVG",
      //     "extra_popup_title": "Average of all parking fees"
      //   }
      // ],
      //
      // "extra_charts": [
      //   {
      //     "extra_class": "chart",
      //     "extra_inner": "Chart",
      //     "extra_popup_title": "Chart of all parking fees"
      //   }
      // ],

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
      parking_space: {
        tag: 'svg', id: '%id%', class: 'space', viewBox: '0 0 500 500', xmlns: 'http://www.w3.org/2000/svg', inner: [
          {
            "tag": "polygon",
            "style": "fill: rgb(245, 245, 245); stroke-width: 10px;stroke: rgb(0, 0, 0);",
            "points": "0 300 0 500 500 500 500 300 450 300 450 460 45 460 45 300 0 300"
          },
          // {
          //   "tag": "rect",
          //   "x": "90.33",
          //   "y": "253.62",
          //   "width": "300",
          //   "height": "38.11",
          //   "style": "fill: rgb(245, 245, 245); stroke-width: 10px; stroke: rgb(0, 0, 0);",
          //   "transform": "matrix(0.70711, 0.70711, -0.70711, 0.70711, 274.20139, -90.07433)"
          // },
          // {
          //   "tag": "rect",
          //   "x": "100",
          //   "y": "161.89",
          //   "width": "300",
          //   "height": "38.11",
          //   "style": "fill: rgb(245, 245, 245); stroke-width: 10px; stroke: rgb(0, 0, 0);",
          //   "transform": "matrix(0.70711, -0.70711, 0.70711, 0.70711, -57.54487, 317.01862)"
          // },
          {
            "tag": "text",
            "text-anchor": "middle",
            "x": "250",
            "y": "350",
            "style": "white-space: pre; fill: rgb(51, 51, 51); font-size: 200px; text-align: center;",
            "inner": "%nr%"
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

      hash: [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/md5.mjs", "type": "module" } ],
      SALT: "123",

      chart: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/plotly/versions/ccm.plotly-1.1.2.js" ],

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

        // set shortcut to helper functions
        $ = Object.assign( {}, this.ccm.helper || ccm.helper, this.helper );

      };

      /**
       * starts the instance
       */
      this.start = async () => {

        const main_elem = $.html( self.html.main, Object.assign({
          start_simulation,
          stop,
          enter,
          oninput,
          date: new Date().toLocaleString()
        }, self.images, (({ name, Max, open_from, open_to, delay, simulation_speed }) => ({ name, Max, open_from, open_to, delay, simulation_speed }))(self) ) );

        const ticket_hash = main_elem.querySelector('.ticket_hash');
        const table = main_elem.querySelector( 'table' );
        const error_div = main_elem.querySelector('.errors');
        const header = {};
        ['counter','Max','free','open_from','open_to' ].forEach( className => {
          header[ className ] = main_elem.querySelector('.'+className);
        });
        const exit_car_container = main_elem.querySelector('.exit_car_container');
        const exit_img = main_elem.querySelector("img.exit");

        const date_div = main_elem.querySelector('.date');
        if ( date_div ) setInterval(()=>{
          date_div.innerText = new Date().toLocaleString();
        },1000);

        const garage_div = main_elem.querySelector('div.garage');

        class Garage {  // single source of truth for Max and all counters
          constructor( max ){
            this._max = max;
            this._total = 0; // total number of cars ever entered
            this._space_index = {};
            this._car_index = {};
            this.image();
          }
          get max(){
            return this._max;
          }
          set max( max ){
            this._max = max;
          }
          get total(){
            this._total = Math.max( this._total, this.countCars() );
            return this._total;
          }
          set total( next ){
            this._total = next;
          }
          nextTotal(){
            this._total += 1;
            return this.total;  // TODO
          }
          countCars(){
            return Object.keys( this._space_index ).length;
          }
          freeSpace(){
            return this.max - this.countCars();
          }
          getCarById( id ){
            return this._car_index[ id ];
          }
          getCarBySpace( nr ){
            return this._space_index[ nr ];
          }
          async addCar( car ){
            if ( garage.countCars() >= garage.max ){
              csv_post_event( 'full', (new Date()).getTime() );
            } else if ( self.open_from && parseInt( self.open_from ) > (new Date()).getHours() ||
              self.open_to && (new Date()).getHours() > parseInt( self.open_to ) - 1 ) {
              csv_post_event( 'closed', (new Date()).getTime() );
            }
            const reply = await csv_post_event( 'enter', ...car.toArray() );
            if ( reply ){
              car.space = parseInt( reply.trim() );
            } else {
              car.space = this.randomSpace();
            }
            this.driveCarIntoSpace( car );
          }
          driveCarIntoSpace(car ){  // synchronous car moving
            if ( car ) this._car_index[ car.id() ] = car;
            if ( car && car.space <= this.max ){
              const oldChild = garage_div.querySelector('#' + car.space_id() );
              if ( oldChild && oldChild.classList.toString().trim() === 'space' ){  // space is free
                (async ()=>{  // only traffic lights are concurrent
                  await sleep( self.delay );
                  switch_traffic_light( "yellow" );
                  await sleep( self.delay );
                  switch_traffic_light( "green" );
                  main_elem.querySelector("img.entry").src = self.images.empty;
                  await sleep( self.delay );
                  switch_traffic_light( "red" );
                  main_elem.querySelector("img.entry").src = self.images.car;
                })();
                ticket_hash.innerText = car.hash();
                this._space_index[ car.space_id() ] = car;
                const newChild = car.image();
                // in concurrent car replacements the oldChild might have been replaced in the meanwhile
                garage_div.replaceChild( newChild, oldChild );
                this.rerender();
              } else { // space is occupied
                if ( ! car.space || car.space === "0" ) debugger;
                csv_post_event( 'occupied', car.toString() );
                show_error( $.html( self.messages.occupied_slot, { id: car.space_id() } ) );
              }
            } else {
              csv_post_event( 'invalid', car.toString() );
              show_error( $.html( self.messages.invalid_slot, { id: car.space_id() } ) );
            }
          }
          removeCar( car ){
            if ( car ){
              delete this._car_index[ car.id() ];
              delete this._space_index[ car.space_id() ];
              car.leave();
              const oldChild = garage_div.querySelector('#' + car.space_id() );
              const newChild = $.html( self.parking_space, { id: car.space_id(), nr: car.space } );
              garage_div.replaceChild( newChild, oldChild );
              this.rerender();
              addTableRow( car );

              csv_post_event( 'leave', ...car.toArray() );
              const leavingCar = $.html( { inner: car.image() } );
              leavingCar.style.display = 'inline-block';
              exit_car_container.replaceChild( leavingCar, exit_car_container.firstElementChild );
              leavingCar.innerHTML += '';
              setTimeout(
                () => {
                  exit_car_container.replaceChild( exit_img, exit_car_container.firstElementChild );
                },
                5 * self.delay
              );
            }
          }
          image(){
            for ( let i = 1; i <= this._max; i++ ){
              garage_div.appendChild( $.html( self.parking_space, { id: 'Space_' + i, nr: i } ) );
              garage_div.innerHTML += '';
            }
          }
          randomSpace(){ // start with 1, end with max
            return 1 + Math.floor(Math.random()*this.max);
          }
          updateHeader(){
            header.counter.innerText = this.countCars();
            header.free.innerText = this.freeSpace();
          }
          rerender(){
            garage_div.innerHTML += ''; // SVG Hack: force re-rendering; Thereby loosing event handlers!
            const rerenderedChilds = [...garage_div.querySelectorAll('.car' )];
            rerenderedChilds.forEach( child => {
              child.onclick = leave;
              child.style.cursor = 'pointer';
            });
            this.updateHeader();
          }
          get random(){
            // https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
            const keys = Object.keys( this._space_index );
            return this._space_index[ keys[ keys.length * Math.random() << 0] ];
          }
          toString(){
            return this._space_index.toString();
          }
        }

        const garage = new Garage( self.Max );

        class Car {
          constructor( spec ){
            if ( spec ){
              [ this.nr, this.timer, this._duration, this._price, this._hash, this._color, this.space, this.client_category ] = spec.split("/");
              [ 'nr', 'timer', '_duration', '_price', 'space' ].forEach( prop => this[prop] === '_' ? '_' : parseInt(this[prop]));
            } else {
              this.nr = garage.nextTotal();  // because the car has not entered the car_index
              this.timer = (new Date()).getTime();
            }
          }
          id(){
            return 'car_' + this.nr;
          }
          hash(){
            return self.hash ? self.hash.md5( self.SALT + this.nr + this.timer ) : this.nr;
          }
          get client_category(){
            if ( self.client_categories && ! this._client_category ){
              this._client_category = randomCategory();
            }
            return this._client_category;
          }
          set client_category( cat ){
            this._client_category = cat;
          }
          get space(){
            if ( ! this._space ) this._space = garage.randomSpace();
            return this._space;
          }
          set space( nr ){
            if ( nr ){
              this._space = nr;
            } else {
              this._space = garage.randomSpace();
            }
          }
          space_id(){
            return 'Space_' + this.space;
          }
          static getList( s ){
            const car_strings = s ? s.split(',') : [];
            return car_strings.map( spec => new Car( spec ) );
          }
          leave() {
            this._duration = (new Date()).getTime() - this.timer;
            return this._duration;
          }
          gone(){
            if ( typeof this._duration === 'number' && this._duration > 0 ) return true;
            return ( typeof this.price() === 'number' && this.price() > 0 );
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
            return Math.round(this._duration / parseInt( self.simulation_speed ) );
            // return this._duration ? ' € ' + parseFloat(Math.round(this._duration / self.simulation_speed ) / 100).toFixed(2) : null;
          }
          color(){
            if ( ! this._color ){
              this._color = '#' + ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
            }
            return this._color;
          }
          toArray(){
            return [ this.nr, this.timer, this.duration(), this.price(), this.hash(), this.color(), this.space, this.client_category ].map(x => (x || '_').toString() );
          }
          tooltip(){
            return this.toArray().join(',');
          }
          image(){
            return $.html( self.car, {
              id: this.space_id(),
              nr: this.nr,
              color: this.color(),
              tooltip: this.tooltip()
            });
          }
          toString(){
            return `Car(${this.nr})`;
          }
        }

        // render content to website
        // $.setContent( self.element, main_elem );
        self.element.textContent = '';
        self.element.appendChild( main_elem );

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
          // merge into component config (self)
          Object.assign(self, config);
          // update header
          Object.keys( header ).forEach( className => {
            if ( header[ className ] ) header[ className ].value = config[ className ];
          });
          // has logger instance? => log 'render' event
          if ( self.logger ) self.logger.log( 'render', config );
        }

        // ======= get cars from server =======
        const car_string = await csv_get_request( "cars", { name: self.name } );
        const car_list = Car.getList( car_string );
        Object.assign(self, { cars: car_list });
        car_list.filter( car => ! car.gone() ).forEach( car => garage.driveCarIntoSpace( car ) );
        car_list.filter( car =>   car.gone() ).forEach( car => addTableRow(   car ) );
        garage.total = car_list.length;
        garage.updateHeader();

        // event handler for input elements
        function oninput( e ) {
          const newValue = parseInt(this.value);
          csv_post_event('change_' + this.classList.toString(), self[this.classList.toString()], this.value);
          self[ this.classList.toString() ] = newValue;
          switch( this.classList.toString() ){
            case "Max":
              garage.max = this.value;
              break;
            case "open_from": case "open_to":
              break;
            default:
              debugger;
          }
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
            if ( typeof extra_params === "string" ){
              const extra_string = extra_params;
              extra_params = {
                "extra_class": extra_string,
                "extra_inner": extra_string,
                "extra_popup_title": extra_string
              };
            }
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
            if ( typeof extra_params === "string" ){
              const extra_string = extra_params;
              extra_params = {
                "extra_class": extra_string,
                "extra_inner": extra_string,
                "extra_popup_title": extra_string
              };
            }
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
                try {
                  config = JSON.parse( response );
                  config.root = extra_div;
                  self.chart.start( config );
                  checkbox.style.display = 'inline';
                } catch (err2){
                  console.log( err2, " in HTTP Response: ", response );
                }
              } catch( err1 ){
                show_error( "GET " + extra_params.extra_class + ": " + err1.toString() + "<br>" + response )
              }
            });
          });
        }

        async function enter( e ) {
          if ( garage.countCars() >= garage.max ){
            alert( self.messages.parkhaus_full );
          } else if ( self.open_from && parseInt( self.open_from ) > (new Date()).getHours() ||
                      self.open_to && (new Date()).getHours() > parseInt( self.open_to ) - 1 ) {
            alert( self.messages.parkhaus_closed );
          } else {
            garage.addCar( new Car() );
         }
        }

        async function leave( e ) {
          const chosen_car = garage.getCarBySpace( this.id );
          if ( chosen_car ){
            garage.removeCar( chosen_car );
           } else {
            throw new Error('Leave event in empty garage!');
          }
        }

        function addTableRow( car ){
          table.appendChild( $.html( self.html.row, {
              nr: car.nr,
              von: car.begin(),
              bis: car.end(),
              dauer: time( car.duration() ),
              ticket: car.hash(),
              preis: ' € ' + car.price() / 100 }
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
          if ( self.server_url ){
            const request = new Request( self.server_url
              + '?cmd=' + command
              + Object.entries( params ).map(([key, value])=>'&'+key+'='+value).join()
            );
            console.log( request );
            try {
              const response = await fetch( request, {
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
              console.log(err, request);
              // show_error( "<p>" + request.url + " failed.<br>" + err + "</p>" );
            }
          } else {
            // console.log( "No server_url" );
          }
        }

        async function csv_post_request( command, params, extra_span ){
          if ( self.server_url ){
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
          } else {
            console.log( "No server_url" );
          }
        }

        async function csv_post_event( event, ...values ){
          if ( self.server_url ){
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
            const result = command_interpreter( response_string );
            console.log( request, " => ", result );
            if ( result === 0 || result === "0" ) debugger;
            return result;
          } else {
            // console.log( "No server_url" );
          }
        }

        function command_interpreter( response_string, extra_span ){
          if ( response_string.indexOf('HTTP Status') >= 0 ){ // error
            show_error( response_string );
          } else { // generic interpreter for server responses: Where? What? Params...
            const [ selector, command, ...content ] = response_string.split(',');
            if ( main_elem && /^[A-Za-z_]\w*$/.test(selector) && main_elem.querySelector( selector ) ){
              if ( command === "insertHTML"  ){
                main_elem.querySelector( selector ).innerHTML = content;
              } else {
                main_elem.querySelector( selector ).innerText = content;
              }
            } else if ( extra_span ) {
              extra_span.innerHTML = response_string;
            } else {
              return response_string;
            }
          }
        }

        let interval;

        function start_simulation( e ){
          interval = setInterval(
            () => {
              const enterOrLeave = getRandomInt( self.simulation.max );
              if ( enterOrLeave < self.simulation.enter ){
                garage.addCar( new Car() );
              } else {
                garage.removeCar( garage.random );
              }
            },
            self.simulation.delay * self.delay
          );
        }

        function stop( e ){
          clearInterval( interval );
        }

        /**
         * generate random integer
         * @returns integer between 0 and max-1
         * @param max - upper limit
         **/
        function getRandomInt(max) {
          return Math.floor(Math.random() * Math.floor(max));
        }

        async function sleep( msec ) {
          return new Promise(resolve => setTimeout(resolve, msec));
        }

        function show_error( message ){
          if ( typeof message === 'string' ){
            error_div.innerHTML += message;
          } else {
            error_div.appendChild( message );
          }
          error_div.style.display = 'block';
        }

        function randomCategory(){
          if ( self.client_categories ){
            return self.client_categories[ getRandomInt(self.client_categories.length) ];
          } else {
            return 'any';
          }
        }

      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );
