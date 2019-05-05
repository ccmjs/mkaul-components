/**
 * @overview ccm component for traffic_light
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 05.05.2019 initial build
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
    name: 'traffic_light',
    version: [1,0,0],
    
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
      next_label: "Next",
      html: {
        main: {
          inner: [
            { class: 'traffic_light', inner: '%traffic_light%' },
            { tag: 'button', class: 'next', inner: '%next_label%', onclick: '%onclick%' },
          ]
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
        }
      },
      
      css: [ 'ccm.load',  'resources/default.css' ]
      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/traffic_light/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/traffic_light/resources/configs.js', 'log' ] ],
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
       * dataset is the single source of truth, the Web is the UI
       * The value of dataset starts with a clone of this.data,
       *     but additional values might be added during editing.
       * this.data is never changed, only dataset is changed.
       * @type {Object}
       */
      let dataset;
     
      
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

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        dataset = 0;

        // render main HTML structure
        $.setContent( this.element, $.html( self.html.main, {
          onclick: next,
          next_label: self.next_label,
          traffic_light: self.html.traffic_light
        } ) );

        // render traffic light
        const traffic_light_div = this.element.querySelector( '.traffic_light' );
        traffic_light_div.innerHTML += ''; // SVG Hack

        function next(){
          dataset += 1;
          dataset %= 4;
          set_lights();
        }

        const traffic_lights = {};
        ["red","yellow","green"].forEach(light=>{
          traffic_lights[light] = traffic_light_div.querySelector('#' + light);
        });
        switch_off_traffic_lights(); // init

        function switch_traffic_light( color ){
          switch_off_traffic_lights();
          if ( Array.isArray( color ) ){
            color.forEach( c => {
              traffic_lights[c].style = `fill: ${c};`;
            });
          } else {
            traffic_lights[color].style = `fill: ${color};`;
          }
        }

        function switch_off_traffic_lights(){
          ["red","yellow","green"].forEach(light=>{
            traffic_lights[light].style = "fill: rgb(200, 160, 160);"
          });
        }

        function set_lights(){
          switch( dataset ){
            case 0:
              switch_traffic_light( "red" );
              break;
            case 1:
              switch_traffic_light( ["red", "yellow"] );
              break;
            case 2:
              switch_traffic_light( "green" );
              break;
            case 3:
              switch_traffic_light( "yellow" );
              break;
            default:
              switch_off_traffic_lights();
              console.log( 'invalid state ', dataset );
          }
        }

        /**
         * trigger next from outside
         */
        this.next = () => {
          next();
        };

      };
      
      /**
       * get current state of this traffic light from outside
       * @returns {Object} state of this traffic light
       */
      this.getValue = () => {
        return dataset;
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();