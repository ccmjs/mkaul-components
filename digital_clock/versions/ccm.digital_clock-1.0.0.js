/**
 * @overview ccm component for digital_clock
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 * @version latest (1.1.0)
 * @changes
 * version 1.1.0 18.02.2020 ccm v25
 * TODO: docu comments -> API
 * TODO: unit tests
 * TODO: builder component
 * TODO: i18n
 */

{

  var component  = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'digital_clock',
    version: [1,1,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.0.0.js',
    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      beep: true,  // sound is on
      html: {
        main: { class: "digital_clock",
          inner: [
            { tag: 'span', class: 'stunden', inner: '00' }, ' : ',
            { tag: 'span', class: 'minuten', inner: '00' }, ' : ',
            { tag: 'span', class: 'sekunden', inner: '00' },
            { inner: [
              { tag: 'button', class: 'clear', inner: 'clear' },
              { tag: 'button', class: 'set', inner: 'set' },
              { tag: 'button', class: 'inc', inner: 'inc' }
            ] }
          ]
        }
      },
      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/digital_clock/resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/digital_clock/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-2.0.0.min.js' ],
      // onfinish: function( instance, results ){ console.log( results ); }

      sound: "data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
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
         if ( this.inner && this.inner.innerHTML.trim() && this.inner.innerHTML.startsWith('{') ){

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
      
        // has logger instance? => log 'start' event
        if ( self.logger ) self.logger.log( 'start' );
        
        // prepare main HTML structure
        const main_elem = $.html( self.html.main );
        
        // select inner containers (mostly for buttons)
        const clear_button = main_elem.querySelector( 'button.clear' );
        const set_button = main_elem.querySelector(   'button.set'   );
        const inc_button = main_elem.querySelector(   'button.inc'   );
        
        // set content of own website area
        $.setContent( self.element, main_elem );

        const digital_clock = (function(){

          /* private constants and variables */

          /* state */
          const ZEIT_ANZEIGEN = 0;
          const STUNDEN_EINSTELLEN = 1;
          const MINUTEN_EINSTELLEN = 2;
          const SEKUNDEN_EINSTELLEN = 3;

          /* variables */
          let stunden = 0;
          let minuten = 0;
          let sekunden = 0;
          let state = ZEIT_ANZEIGEN;

          let timer;

          const snd = new Audio( self.sound );

          /* private functions */
          function beep() {
            if ( self.beep ) snd.play();
          }

          function two_chars( num ){
            return ( "0" + num ).slice(-2);
          }

          self.clock = { // exporting clock objekt as public interface

            /* public functions of clock */

            stunden: function(){
              return stunden;
            },

            minuten: function(){
              return minuten;
            },

            clear: function(e){
              stunden = 0;
              minuten = 0;
              sekunden = 0;
              state = ZEIT_ANZEIGEN;
              $.setContent( self.element.querySelector("span.stunden"), two_chars( stunden ) );
              $.setContent( self.element.querySelector("span.minuten"), two_chars( minuten ) );
              $.setContent( self.element.querySelector("span.sekunden"), two_chars( sekunden ) );
              self.logger && self.logger.log( 'clear' );
              e.preventDefault();
              e.stopPropagation();
              return false;
            },

            set: function(e){
              state = ( state + 1 ) % 4;
              beep();
              self.logger && self.logger.log( 'set' );
              e.preventDefault();
              e.stopPropagation();
              return false;
            },

            inc: function(e){
              self.logger && self.logger.log( 'inc' );
              if ( state === STUNDEN_EINSTELLEN ){
                stunden = ( stunden + 1 ) % 24;
                beep();
                $.setContent( self.element.querySelector("span.stunden"), two_chars( stunden ) );
              } else if ( state === MINUTEN_EINSTELLEN ){
                minuten = ( minuten + 1 ) % 60;
                beep();
                $.setContent( self.element.querySelector("span.minuten"), two_chars( minuten ) );
              } else if ( state === SEKUNDEN_EINSTELLEN ){
                sekunden = ( sekunden + 1 ) % 60;
                beep();
                $.setContent( self.element.querySelector("span.sekunden"), two_chars( sekunden ) );
              }
              e.preventDefault();
              e.stopPropagation();
              return false;
            },

            start: function(){
              sekunden = ( sekunden + 1 ) % 60;
              $.setContent( self.element.querySelector("span.sekunden"), two_chars( sekunden ) );
              if (sekunden === 0) {
                minuten = ( minuten + 1 ) % 60;
                $.setContent( self.element.querySelector("span.minuten"), two_chars( minuten ) );
                if (minuten === 0){
                  stunden = ( stunden + 1 ) % 24;
                  $.setContent( self.element.querySelector("span.stunden"), two_chars( stunden ) );
                }
              }
              if ( ! timer ) timer = window.setInterval(() => {
                self.clock.start();
              }, 970); // 1000 - overhead
            },

            stop: function () {
              if ( timer ) window.clearInterval( timer );
              timer = null;
            }
          };

          return self.clock;
        })();

        clear_button.addEventListener( 'click',  digital_clock.clear );
        set_button.addEventListener(   'click',  digital_clock.set   );
        inc_button.addEventListener(   'click',  digital_clock.inc   );

        digital_clock.start();

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}
