/**
 * @overview ccm component for parkhaus
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component  = {

    name: 'parkhaus',
    version: [4,0,0],
  
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',
    
    config: {
      server_url: "http://localhost:8080/DemoServlet",
      delay: 400,
      html: {
        main: {
          inner: [
            { tag: 'h2', inner: [
              'Autos im Parkhaus: &nbsp; ',
              { tag: 'span', class: 'counter', inner: '0' }
            ] },
            { tag: 'img', class: 'entry', src: 'https://ccmjs.github.io/mkaul-components/parkhaus/resources/car.png', width: '202', height: '74' },
            { tag: 'span', class: 'traffic_light' },
            { tag: 'img', class: 'garage', src: 'https://ccmjs.github.io/mkaul-components/parkhaus/resources/parking_garage.png', width: '250', height: '235' },
            { tag: 'img', class: 'exit', src: 'https://ccmjs.github.io/mkaul-components/parkhaus/resources/empty.png', width: '202', height: '74' },
            { tag: 'hr' },
            { tag: 'button', class: 'enter', onclick: '%enter%', inner: 'Enter', title: 'Drive your car into the garage!' },
            { tag: 'button', class: 'leave', onclick: '%leave%', inner: 'Leave', title: 'Leave the garage!' },
            { class: 'extra_buttons' },
            { tag: 'hr' },
            { tag: 'table', inner: [
              { tag: 'tr', inner: [ { tag: 'th', inner: 'Nr', title: 'Nr des Autos' }, { tag: 'th', inner: 'Von', title: 'Startzeit des Parkens' }, { tag: 'th', inner: 'Bis', title: 'Endzeit des Parkens' }, { tag: 'th', inner: 'Dauer', title: 'Wie lange war das Auto im Parkhaus?' }, { tag: 'th', inner: 'Preis', title: 'Parkgebühren' } ] }
            ] }
          ]
        },
        row: { tag: 'tr', inner: [ { tag: 'td', inner: '%nr%' }, { tag: 'td', inner: '%von%' }, { tag: 'td', inner: '%bis%' }, { tag: 'td', inner: '%dauer%' }, { tag: 'td', inner: '%preis%' } ] },
        extra_button_div: { inner: [
          { tag: 'button', class: '%extra_class%', inner: '%extra_inner%', title: '%extra_popup_title%' },
          { tag: 'span', class: '%extra_class%' }
        ] }
      },
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
      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/parkhaus/resources/default.css' ]
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
        }
        
        const counter = new Counter(0);
        let total = 0;
        const cars = [];
        const begin = (new Date()).getTime();
        const price_factor = 0.001;
      
        // has logger instance? => log 'render' event
        if ( self.logger ) self.logger.log( 'render' );
        
        // prepare main HTML structure
        const main_elem = self.ccm.helper.html( self.html.main, { enter: enter, leave: leave } );

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
        
        // select inner containers (mostly for buttons)
        const table = main_elem.querySelector( 'table' );

        // insert extra buttons
        const extra_div = main_elem.querySelector( 'div.extra_buttons' );
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
                  'Content-Type': 'text/plain'
                }
              });
              const response_string = (await response.text()).trim();
              extra_span.innerHTML = response_string;
            });
          });
        }
        
        // set content of own website area
        self.ccm.helper.setContent( self.element, main_elem );
  
        function enter() {
          setTimeout(function () {
            switch_traffic_light( "yellow" );
            setTimeout(function () {
              switch_traffic_light( "green" );
              counter.increment();
              const car = new Car();
              car.enter();
              csv_message( 'enter', car );
              main_elem.querySelector("span.counter").innerText = counter.toString();
              main_elem.querySelector("img.entry").src = "//kaul.inf.h-brs.de/data/ccm/parkhaus/resources/empty.png";
              setTimeout(function () {
                switch_traffic_light( "red" );
                main_elem.querySelector("img.entry").src = "//kaul.inf.h-brs.de/data/ccm/parkhaus/resources/car.png";
              }, self.delay);
            }, self.delay);
          }, self.delay);
        }
  
        function leave() {
          const last_car = cars.pop();
          if ( last_car ){
            counter.decrement();
            last_car.leave();
            csv_message( 'leave', last_car );
            setTimeout(function () {
              main_elem.querySelector("img.exit").src = "//kaul.inf.h-brs.de/data/ccm/parkhaus/resources/car.png";
              setTimeout(function () {
                main_elem.querySelector("img.exit").src = "//kaul.inf.h-brs.de/data/ccm/parkhaus/resources/empty.png";
                main_elem.querySelector("span.counter").innerText = counter.toString();
                table.appendChild( self.ccm.helper.html( self.html.row, { nr: last_car.nr, von: last_car.begin(), bis: last_car.end(), dauer: last_car.duration(), preis: last_car.price() } ));
              }, self.delay);
            }, self.delay);
          }
        }
        
        class Car {
          constructor(){
            total += 1;
            this.nr = total;
          }
          enter() {
            cars.push( this );
            this.timer = (new Date()).getTime();
          };
          leave() {
            this._duration = (new Date()).getTime() - this.timer;
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
            return this._duration ? ' € ' + parseFloat(Math.round(this._duration * price_factor * 100) / 100).toFixed(2) : null;
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

        function csv_message( event, js_object ){
          if ( ! self.server_url ) return;
          const result = [ event, js_object.toCSV() ].join(",");
          fetch( new Request( self.server_url ), {
            method: 'POST',
            mode: 'cors',
            cache: 'no-store',
            body: result,
            headers:{
              'Content-Type': 'text/plain'
            }
          });
        }

      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );