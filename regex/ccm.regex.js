/**
 * @overview ccm component for regex
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
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
    name: 'regex',
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://akless.github.io/ccm/version/ccm-11.5.0.min.js',
    // ccm: '//akless.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      data: {
        regex: "a.*b", // (/a.*b/i).source,
        options: 'i',
        matching: "abcdefb",
        non_matching: "bacdef"
      },
      html: {
        main: {
          inner: [
            { tag: 'input', type: 'text', class: 'regex', size: 40, value: '%regex%', title: 'Regulärer Ausdruck' },
            { tag: 'input', type: 'text', class: 'options', size: 5, value: '%options%', title: 'Options, e.g. ignoreCase' },
            { tag: 'ul', class: 'feedback_list', inner: [
              { tag: 'li', class: 'feedback_list', inner: [
                { tag: 'span', class: 'feedback' },
                { tag: 'input', type: 'text', class: 'matching', size: 40, value: '%matching%', title: 'Text zum Testen des regulären Ausdrucks' },
                { tag: 'span', class: 'result' }
              ] },
              { tag: 'li', class: 'feedback_list', inner: [
                { tag: 'span', class: 'feedback' },
                { tag: 'input', type: 'text', class: 'matching', size: 40, value: '%non_matching%', title: 'Text zum Testen des regulären Ausdrucks' },
                { tag: 'span', class: 'result' }
              ] }
            ] },
            { tag: 'button', class: 'plus', inner: '+', title: 'Weiteren Test hinzu fügen' },
            { tag: 'button', class: 'regex', inner: 'Eval', title: 'Neu auswerten!' },
            { class: 'result' }  // ToDo where used?
          ]
        },
        new_li: { tag: 'li', class: 'feedback_list', inner: [
          { tag: 'span', class: 'feedback' },
          { tag: 'input', type: 'text', class: 'matching', size: 40, placeholder: 'type new matching string here ...' },
          { tag: 'span', class: 'result' }
        ] }
      },
      css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/regex/resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/regex/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-2.0.0.min.js' ],
      logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://kaul.inf.h-brs.de/data/2017/se1/json/log_configs.js', 'se_ws17_regex' ] ]
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
        if ( self.logger ) self.logger.log( 'start', self.data );
        
        // prepare main HTML structure
        const main_elem = $.html( self.html.main, self.data );
        
        // select inner containers (mostly for buttons)
        const regex_input = main_elem.querySelector('input.regex');
        const options_input = main_elem.querySelector('input.options');
        let all_input_fields = [...main_elem.querySelectorAll('input[type="text"]')];
        let all_feedbacks = [...main_elem.querySelectorAll('span.feedback')];
        const regex_button = main_elem.querySelector('button.regex');
        const plus_button = main_elem.querySelector('button.plus');

        regex_button.addEventListener('click', e => {
          all_input_fields.map( field => {
            handle_input( field );
          });
          // has logger instance? => log 'eval' event
          self.logger && self.logger.log( 'eval' );
          e.preventDefault();
          e.stopPropagation();
          return false;
        });

        plus_button.addEventListener('click', e => {
          const new_li = $.html( self.html.new_li );
          const input_field = new_li.querySelector('input[type="text"]');
          main_elem.querySelector('ul').appendChild( new_li );
          input_field.addEventListener('input', input_handler );
          // add new_li to lists
          all_feedbacks.push(new_li.querySelector('span.feedback'));
          all_input_fields.push( input_field );
          handle_input( input_field );

          // has logger instance? => log 'plus' event
          self.logger && self.logger.log( 'plus' );
          e.preventDefault();
          e.stopPropagation();
          return false;
        });

        // 'input' is the new HTML5 event for any input or change
        all_input_fields.map(field=>{
          field.addEventListener('input', input_handler );
        });
        
        // set content of own website area
        $.setContent( self.element, main_elem );

        all_input_fields.map(field=>{
          handle_input( field );
        });

        function input_handler( event ){
          handle_input( this, event );
          event.preventDefault();
          event.stopPropagation();
          return false;
        }

        function handle_input( target, event ){

          let regex;
          let result;

          if ( target.classList.contains('regex') || target.classList.contains('options') ){
            regex_input.style['background-color'] = 'yellow';
            options_input.style['background-color'] = 'yellow';
            event && event.preventDefault();
            event && event.stopPropagation();
            return;
          }

          try {
            regex = new RegExp( regex_input.value, options_input.value );
            if ( typeof target.value === 'string' ){
              result = regex.exec( target.value.trim() );
              self.logger && self.logger.log( 'regex', {
                regex_input: regex_input.value,
                options: options_input.value,
                result: JSON.stringify( result )
              } );
            } else {
              event && event.preventDefault();
              event && event.stopPropagation();
              return;
            }
          } catch (ex) {
            console.log( ex );
            event && event.preventDefault();
            event && event.stopPropagation();
            return;
          }

          let feedback = target.parentNode.querySelector('span.feedback');

          if ( result  ){

            feedback.innerHTML = '&#9786;'; // good smiley
            target.style['background-color'] = 'PaleGreen';
            regex_input.style['background-color'] = 'PaleGreen';

            target.parentNode.querySelector('span.result').style.display = 'block';
            target.parentNode.querySelector('span.result').innerText = result.reduce(function(a,b, index) {
              return a + 'match[' + index + '] = ' + b + ', ';
            }, ' ') + ' ';

          } else {

            feedback.innerHTML = '&#9785;'; // bad smiley
            target.style['background-color'] = '#EDABAB';
            target.parentNode.querySelector('span.result').style.display = 'none';

          }

          event && event.preventDefault();
          event && event.stopPropagation();

        }

        function escapeHtml( data ) { // ToDo
          const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
          };
          Object.keys(data).map(key=>{
            data[key] = data[key].replace(/[&<>"']/g, function(m) { return map[m]; });
          });
          return data;
        }

        if ( callback && typeof callback === 'function' ) callback();
      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}