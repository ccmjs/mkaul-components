/**
 * @overview ccm component for exercise
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component  = {

    name: 'exercise',
    
    ccm: 'https://akless.github.io/ccm/ccm.js',

    config: {
      highlight: [ 'ccm.component', '//kaul.inf.h-brs.de/data/ccm/highlight/ccm.highlight.js' ],
      show_solutions: [ 'ccm.component', '//kaul.inf.h-brs.de/data/ccm/show_solutions/ccm.show_solutions.js' ],
      // task: 'Richten Sie Ihre Entwicklungsumgebung für Java 8 ein und schreiben Sie Hello World in Java 8.',
      // placeholder: 'class HelloWorld ...',
      // questions: ['a', 'b'],
      html: {
        main: {
          inner: [
            { id: 'task', inner: '%task%' },
            { tag: 'p' }
          ]
        }
      },
      css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/exercise/resources/default.css' ],
      user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-1.0.0.min.js' ],
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    Instance: function () {
    
      var self = this;
  
      this.init = function ( callback ) {
  
        // inherit context parameter
        if ( ! self.fkey ) self.fkey = self.ccm.context.find(self,'fkey');
        if ( ! self.keys ) self.keys = {
          semester: self.ccm.context.find(self,'semester'),
          fach: self.ccm.context.find(self,'fach')
        };
        if ( ! self.for ) self.for = self.root.getAttribute('id');
    
        // support declarative way for defining a quiz via HTML
        evaluateLightDOM();
    
        callback();
    
        /** finds Custom Component Elements for generating config parameters */
        function evaluateLightDOM() {
      
          var children = ( self.inner || self.root ).children;
          self.questions = [];
          self.question_ids = [];
          var count = 0;
      
          // iterate over all children of the Light DOM to search for config parameters
          self.ccm.helper.makeIterable( children ).map( function ( elem ) {
            count += 1;

            // self.ccm.helper.generateConfig( elem ); // ToDo
            
            if ( elem.tagName.startsWith('CCM-EXERCISE-') ){
              var param_name = elem.tagName.split('-')[2].toLowerCase();
              switch ( param_name ){
                case 'question':
                  self.questions.push( elem.innerHTML );
                  self.question_ids.push( self.fkey + count );
                  self.html.main.inner.push( { tag: 'label', for: self.fkey + count, inner: elem.innerHTML } );
                  self.html.main.inner.push( { tag: 'textarea', id: self.fkey + count } );
                  break;
                default: self[ param_name ] = elem.innerHTML;
              }
            }
          } );
          
          if ( self.questions.length === 0 ){
            self.html.main.inner.push( { tag: 'label', for: self.fkey } );
            self.html.main.inner.push( { tag: 'textarea', id: self.fkey, placeholder: self.placeholder || '' } );
          }
  
          self.html.main.inner.push( { tag: 'ccm-show_solutions', for: self.fkey } );
      
        }
    
      };

      this.start = function ( callback ) {
      
        // has logger instance? => log 'render' event
        if ( self.logger ) self.logger.log( 'render' );
  
        if(!String.linkify) {
          String.prototype.linkify = function() {
      
            // http://, https://, ftp://
            var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
      
            // www. sans http:// or https://
            var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      
            // Email addresses
            var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;
      
            return this
              .replace(urlPattern, '<a href="$&">$&</a>')
              .replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>')
              .replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
          };
        }
  
        // prepare main HTML structure
        var main_elem = self.ccm.helper.html( self.html.main,
          {
            id: self.for,
            task: self.task.linkify(),
            placeholder: self.placeholder || ''
          } );
        
        // select inner containers (mostly for buttons)
        var show_solutions_div = main_elem.querySelector( 'ccm-show_solutions' );
        var textarea = main_elem.querySelector( 'textarea' );

        // set content of own website area
        self.ccm.helper.setContent( self.element, main_elem );
  
        self.sync = function ( event_or_value ) {
          if ( event_or_value !== 'undefined' && event_or_value && ! ( event_or_value instanceof Event ) ){
            if ( self.questions.length === 0 ){
              textarea.value = event_or_value; // write value into textarea
            } else {
              var questions_from_db = JSON.parse( event_or_value );
              Object.keys( questions_from_db ).map(function ( id ) {
                main_elem.querySelector( '#' + id ).value = questions_from_db[ id ];
              });
            }
          }
          
          if ( self.questions.length === 0 ){
            self.value = textarea.value; // sync value
          } else {
            var question_values = {};
            self.question_ids.map(function ( id ) {
              question_values[ id ] = main_elem.querySelector( '#' + id ).value
            });
            self.value = JSON.stringify( question_values );
          }
          
          if ( self.logger ) self.logger.log( self.value ); // log value
          if( event_or_value instanceof Event ){
            event_or_value.preventDefault();
            event_or_value.stopPropagation();
            return false;
          }
        };
  
        self.ccm.start( 'show_solutions' , {  // ToDo Choose the right ccm version, not self.ccm
          root: show_solutions_div,
          fkey: self.fkey,
          keys: self.keys,
          parent: self,
          user: self.user
        });

        if ( callback ) callback();
        
      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );