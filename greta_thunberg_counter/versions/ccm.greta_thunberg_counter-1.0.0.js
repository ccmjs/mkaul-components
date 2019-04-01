/**
 * @overview ccm component for greta_thunberg_counter
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 31.03.2019 initial build
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
    name: 'greta_thunberg_counter',
    version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.min.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        main: {
          class: "timer",
          inner: "Noch %years% Jahre, %months% Monate, %days% Tage, %hours% Stunden, %min% Minuten, %sec% Sekunden und %msec% Millisekunden, bis sich das Klima unumkehrbar wandelt."
        },
        message: {
          class: "message",
          inner: "Jetzt handeln!"
        }
      },

      message: {
        interval: 3000, // millisconds
        duration: 1000  // millisconds
      },

      frames_per_second: 25,
      
      // css: [ 'ccm.load',  'resources/default.css' ],
      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/greta_thunberg_counter/resources/default.css' ]
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/greta_thunberg_counter/resources/configs.js', 'log' ] ]
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
       * starts the instance
       */
      this.start = async () => {

        const deadline = new Date('January 1, 2030');

        // logging of 'start' event
        this.logger && this.logger.log( 'start', { now: new Date(), deadline: deadline } );

        const data = {};

        const timediff = ( now ) => {

          const today = new Date( now );
          let diff = deadline - today;

          data.msec = diff % 1000;
          diff = Math.floor( diff / 1000 );
          data.sec = diff % 60;
          diff = Math.floor(diff / 60 );
          data.min = diff % 60;
          diff = Math.floor(diff / 60 );
          data.hours = diff % 24;
          diff = Math.floor(diff / 24 );
          data.days = diff % 31;
          diff = Math.floor(diff / 31 );
          data.months = diff % 12;
          diff = Math.floor(diff / 12 );
          data.years = deadline.getFullYear() - today.getFullYear() - 1;

        };

        let fpsInterval, startTime, now, then, elapsed, isMessage;

        // initialize the timer variables and start the animation
        startAnimating();

        function startAnimating() {
          fpsInterval = 1000 / self.frames_per_second;
          then = Date.now();
          startTime = then;
          animate();
        }

        // the animation loop calculates time elapsed since the last loop
        // and only draws if your specified self.frames_per_second interval is achieved
        function animate() {

          // request another frame
          requestAnimationFrame( animate );

          // calc elapsed time since last loop
          now = Date.now();
          elapsed = now - then;

          // if enough time has elapsed, draw the next frame
          if (elapsed > fpsInterval) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            then = now - (elapsed % fpsInterval);

            if ( ! isMessage ) renderTime( now );

          }
        }

        function renderTime( now ){

          timediff( now );

          // render main HTML structure
          $.setContent( self.element, $.html( self.html.main,
            Object.keys( data ).reduce( ( result, key ) => {
                // convert nums to strings
                result[key] = ('' + data[key]).padStart(key === 'msec' ? 3 : 2 , '0');
                return result;
              }, {}
            )
          ) );
        }

        setInterval( renderMessage, self.message.interval );

        function renderMessage(){
          isMessage = true;
          $.setContent( self.element, $.html( self.html.message ) );
          $.wait( self.message.duration, () => { isMessage = false; } );
        }

      };
    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();