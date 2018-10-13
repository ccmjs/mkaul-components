/**
 * @overview game_chooser is a little game implemented in ccm.
 *      Game Rules: A number is given and the user has to choose,
 *      whether the sum of digits is even or odd
 *      as fast as possible
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {
  
  var component = {
    
    name: 'game_chooser',

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',
    // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.0.4.min.js',
  
    config: {
      
      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/game_chooser/resources/default.css' ],
      html: {
        main: {
          inner: [
            {
              class: 'row',
              inner: [
                { tag: 'h2', inner: '%task%' },
                {
                  tag: 'input',
                  class: 'digit_count',
                  type: 'range',
                  min: '1',
                  max: '%number_range_max_exponent%',
                  step: '1',
                  value: '%number_range_exponent%'
                },
                { tag: 'span', class: 'digit_count' }
              ]
            },
            {
              class: 'row',
              inner: [
                { tag: 'button', class: 'left block', inner: '%even%' },
                { tag: 'p', class: 'number block'},
                { tag: 'button', class: 'right block', inner: '%odd%' }
              ]
            },
            {
              class: 'row',
              inner: [
                { tag: 'button', class: 'exit', inner: '%start_button%' }
              ]
            },
            { class: 'row result' }
          ]
        },
        message: {
          inner: [
            { tag: 'p', inner: ' %success_rate% = %success_rate_number% %seconds%. '},
            { tag: 'p', inner: ' %average_time%: %average_time_number% %seconds%. '}
          ]
        }
      },
      language: 'en',
      languages: {
        en: {
          task: 'Is the sum of digits even or odd?',
          even: 'even',
          odd: 'odd',
          start_button: 'Start',
          stopp_button: 'Stopp',
          success_rate: 'success rate',
          average_time: 'average time',
          seconds: 'seconds'
        },
        de: {
          task: 'Ist die Quersumme gerade oder ungerade?',
          even: 'gerade',
          odd: 'ungerade',
          start_button: 'Start',
          stopp_button: 'Stopp',
          success_rate: 'Erfolgsrate',
          average_time: 'Durchschnittliche Reaktionszeit',
          seconds: 'Sekunden'
        }
      },
      number_range_max_exponent: 6,
      number_range_exponent: 2,
      beep: true,
      beepSound: 'data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU='
  
      //  user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-1.0.0.min.js' ],
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    
    },

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

        // next number for game
        let next_number;
        const list_of_numbers = [];
  
        // public functions for accessing numbers
        self.get_next_number = function(){
          return next_number;
        };
  
        self.get_list_of_numbers = function(){
          return list_of_numbers;
        };
  
        // has logger instance? => log 'render' event
        if ( self.logger ) self.logger.log( 'render' );
  
        // prepare main HTML structure
        const main_elem = $.html( self.html.main,
          $.integrate( self.languages[self.language], {
            number_range_max_exponent: self. number_range_max_exponent,
            number_range_exponent: self.number_range_exponent
        } ) );
  
        // select inner containers (mostly for buttons)
        const digit_count       = main_elem.querySelector( 'input.digit_count' );
        const digit_count_value = main_elem.querySelector( 'span.digit_count' );
        const div_result        = main_elem.querySelector( 'div.result' );
        const left_button       = main_elem.querySelector( 'button.left' );
        const right_button      = main_elem.querySelector( 'button.right' );
        const number_area       = main_elem.querySelector( 'p.number' );
        const exit_button       = main_elem.querySelector( 'button.exit' );
  
        // set content of own website area
        $.setContent( self.element, main_elem );

        show_next_number();
  
        let number_of_clicks = 0;
        let number_of_success = 0;
        let last_click_time = 0;
  
        let digit_count_val = digit_count.value;
        digit_count_value.innerHTML = digit_count_val ;
  
        digit_count.addEventListener( 'input', function() {
          if (digit_count_val !== digit_count.value){
            digit_count_val = digit_count.value;
            digit_count_value.innerHTML =  digit_count_val ;
            show_next_number();
          }
        });
  
        left_button.onclick  = count_clicks( 0 );
        right_button.onclick = count_clicks( 1 );
        
        function count_clicks( even_or_odd ){
          return function(){
            number_of_clicks += 1;
            if ( digit_sum(next_number) % 2 === even_or_odd ){
              number_of_success += 1;
            } else {
              number_area.className += ' error';
              beep();
              setTimeout(function(){
                number_area.classList.remove('error');
              }, 25);
            }
            show_next_number();
          }
        }
  
        let millisec = 0;
        let seconds = 0;
        let timer;
  
  
        exit_button.onclick = function() {
    
          if ( last_click_time === 0 ) {
      
            last_click_time = Date.now(); // in milliseconds
            exit_button.innerHTML = self.languages[self.language].stopp_button;
            show_next_number();
            start_timer();
            display_timer();
            number_of_clicks = 0;
            number_of_success = 0;
            list_of_numbers = [];
      
          } else {
      
            clearTimeout(timer);
            let duration = Date.now() - last_click_time;
            let average = duration / number_of_clicks;
            
            // compute results
            let results = {
              component: 'game_chooser',
              success_rate_number: ( number_of_clicks === 0 ? 0 : 100.0 * number_of_success / number_of_clicks ).toFixed(2) + '% in ' +
              (duration/1000).toFixed(2),
              average_time_number: (number_of_clicks === 0 ? 'N/A' : (average/1000).toFixed(2)),
              number_range_exponent: self.number_range_exponent,
              numbers: list_of_numbers
            };

            // add user data, if any
            if ( self.user ) results.user = self.user.data().key;
            // has logger instance? => log event
            if ( self.logger ) self.logger.log( results );
            
            // display
            results = $.integrate(self.languages[self.language], results);
            $.setContent( div_result, $.html(self.html.message, results) );
            
            // on finish?
            if (self.onfinish) self.onfinish( self, results );
            
            // Restart?
            exit_button.innerHTML = self.languages[self.language].start_button ;
            last_click_time = 0;
          }
    
        };
        
        // private functions
        
        function display_timer(){
          if ( millisec >= 9 ){
            millisec=0;
            seconds+=1
          } else {
            millisec+=1;
          }
          div_result.innerHTML =  seconds + "," + millisec ;
          timer = setTimeout(display_timer, 96); // 100 msec - 4% for JS execution time
        }
  
        function start_timer(){
          millisec = 0;
          seconds = 0;
        }
  
        function show_next_number(){
          next_number = Math.floor(( number_range(digit_count.value) * Math.random() ) % number_range(digit_count.value) );
          list_of_numbers.push(next_number);
          number_area.innerHTML = self.get_next_number() ;
        }
  
        function digit_sum(number) {
          let string = number.toString();
          string = string.split('');                 //split into individual characters
          let sum = 0;                               //have a storage ready
          for (let i = 0; i < string.length; i++) {  //iterate through
            sum += parseInt(string[i],10);           //convert from string to int
          }
          return sum;                                //return when done
        }
  
        /*
         *  maps digit_count into number_range
         *  turns 1 into 10, 2 into 100, 3 into 1000
         **/
        function number_range(digit_count){
          let result = 10;
          for (let i=1; i<digit_count; i++){
            result *= 10;
          }
          return result;
        }
  
        // base64 encoding of beep sound in config
        const snd = new Audio(self.beepSound);
  
        function beep() {
          if (self.beep) snd.play();
        }

      };

    }

  };
  
  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );