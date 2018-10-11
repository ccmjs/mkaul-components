/**
 * @overview ccm component for parkhaus
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component  = {

    name: 'parkhaus',
    version: [3,0,0],
  
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.0.2.min.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',
    
    config: {
      delay: 500,
      html: {
        main: {
          inner: [
            { tag: 'h2', inner: [
              'Autos im Parkhaus: &nbsp; ',
              { tag: 'span', class: 'counter', inner: '0' }
            ] },
            { tag: 'img', class: 'entry', src: 'https://ccmjs.github.io/mkaul-components/parkhaus/resources/car.png', width: '202', height: '74' },
            { tag: 'img', class: 'ampel', src: 'https://ccmjs.github.io/mkaul-components/parkhaus/resources/traffic-light-red.png', width: '55', height: '155' },
            { tag: 'img', class: 'garage', src: 'https://ccmjs.github.io/mkaul-components/parkhaus/resources/parking_garage.png', width: '250', height: '235' },
            { tag: 'img', class: 'exit', src: 'https://ccmjs.github.io/mkaul-components/parkhaus/resources/empty.png', width: '202', height: '74' },
            { tag: 'hr' },
            { tag: 'button', class: 'enter', onclick: '%enter%', inner: 'Enter', title: 'Drive your car into the garage!' },
            { tag: 'button', class: 'leave', onclick: '%leave%', inner: 'Leave', title: 'Leave the garage!' },
            { tag: 'hr' },
            { tag: 'table', inner: [
              { tag: 'tr', inner: [ { tag: 'th', inner: 'Nr', title: 'Nr des Autos' }, { tag: 'th', inner: 'Von', title: 'Startzeit des Parkens' }, { tag: 'th', inner: 'Bis', title: 'Endzeit des Parkens' }, { tag: 'th', inner: 'Dauer', title: 'Wie lange war das Auto im Parkhaus?' }, { tag: 'th', inner: 'Preis', title: 'Parkgebühren' } ] }
            ] }
          ]
        },
        row: { tag: 'tr', inner: [ { tag: 'td', inner: '%nr%' }, { tag: 'td', inner: '%von%' }, { tag: 'td', inner: '%bis%' }, { tag: 'td', inner: '%dauer%' }, { tag: 'td', inner: '%preis%' } ] }
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
        
        // select inner containers (mostly for buttons)
        const enter_button = main_elem.querySelector( 'button.enter' );
        const leave_button = main_elem.querySelector( 'button.leave' );
        const table = main_elem.querySelector( 'table' );
        
        // set content of own website area
        self.ccm.helper.setContent( self.element, main_elem );
  
        function enter() {
          setTimeout(function () {
            main_elem.querySelector("img.ampel").src = "//kaul.inf.h-brs.de/data/ccm/parkhaus/resources/traffic-light-yellow.png";
            setTimeout(function () {
              main_elem.querySelector("img.ampel").src = "//kaul.inf.h-brs.de/data/ccm/parkhaus/resources/traffic-light-green.png";
              counter.increment();
              new Car().enter();
              main_elem.querySelector("span.counter").innerText = counter.toString();
              main_elem.querySelector("img.entry").src = "//kaul.inf.h-brs.de/data/ccm/parkhaus/resources/empty.png";
              setTimeout(function () {
                main_elem.querySelector("img.ampel").src = "//kaul.inf.h-brs.de/data/ccm/parkhaus/resources/traffic-light-red.png";
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
            setTimeout(function () {
              main_elem.querySelector("img.exit").src = "//kaul.inf.h-brs.de/data/ccm/parkhaus/resources/car.png";
              setTimeout(function () {
                main_elem.querySelector("img.exit").src = "//kaul.inf.h-brs.de/data/ccm/parkhaus/resources/empty.png";
                main_elem.querySelector("span.counter").innerText = counter.toString();
                table.appendChild( self.ccm.helper.html( self.html.row, { nr: last_car.nr, von: last_car.von(), bis: last_car.bis(), dauer: last_car.dauer(), preis: last_car.preis() } ));
              }, self.delay);
            }, self.delay);
          }
        }

        class Parkhaus {
          constructor(x,y){
            this._x = x;
            this._y = y;
            this._map = new Map();
            this._empty = '_';
          }
          index(i,j){
            return j*this._x + i;
          }
          getSlot(i,j){
            if (i>=this._x) throw new Error('x too large ' + i);
            if (j>=this._y) throw new Error('y too large ' + j);
            return this._map.get(this.index(i,j)).toString() || this._empty;
          }
          setSlot(i,j,value){
            if (i>=this._x) throw new Error('x too large ' + i);
            if (j>=this._y) throw new Error('y too large ' + j);
            this._map.set(this.index(i,j), value);
          }
          toHTML(){
            let i,j,table;
            table = '<table>';
            for (i=0; i<this._x;i++){
              table += '<tr>';
              for (j=0; j<this._y;j++){
                table += '<td>' + this.getSlot(i,j) + '</td>';
              }
              table += '</tr>';
            }
            table += '</table>';
            return table;
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
            this.duration = (new Date()).getTime() - this.timer;
            return this.duration;
          };
          von() {
            return this.timer - begin;
          };
          bis() {
            return this.von() + this.dauer();
          };
          dauer() {
            return this.duration;
          };
          preis() {
            return ' € ' + parseFloat(Math.round(this.dauer() * price_factor * 100) / 100).toFixed(2);
          }
        }
      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );