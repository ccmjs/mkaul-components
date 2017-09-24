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
      task: 'Schreiben Sie in Java 8 ein Programm, das eine Datei liest, die Anzahl der Wörter darin zählt und diese Zahl dann ausgibt.',
      placeholder: 'class WordCounter ...',
      html: {
        main: {
          inner: [
            { id: 'task', inner: '%task%' },
            { tag: 'label', for: '%id%' },
            { tag: 'textarea', id: '%id%', placeholder: '%placeholder%' },
            { tag: 'ccm-show_solutions', for: '%id%' }
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

      this.start = function ( callback ) {
      
        // has logger instance? => log 'render' event
        if ( self.logger ) self.logger.log( 'render' );
  
        // inherit context parameter
        if ( ! self.fkey ) self.fkey = self.ccm.context.find(self,'fkey');
        if ( ! self.keys ) self.keys = {
          semester: self.ccm.context.find(self,'semester'),
          fach: self.ccm.context.find(self,'fach')
        };
        if ( ! self.for ) self.for = self.root.getAttribute('id');
  
        // prepare main HTML structure
        var main_elem = self.ccm.helper.html( self.html.main,
          {
            id: self.for,
            task: self.task,
            placeholder: self.placeholder
          } );
        
        // select inner containers (mostly for buttons)
        var show_solutions = main_elem.querySelector( 'ccm-show_solutions' );
        var textarea = main_elem.querySelector( 'textarea' );

        // set content of own website area
        self.ccm.helper.setContent( self.element, main_elem );
  
        self.sync = function ( event_or_value ) {
          if ( event_or_value !== 'undefined' && event_or_value && ! ( event_or_value instanceof Event ) ){
            textarea.value = event_or_value; // write value into textarea
          }
          self.value = textarea.value; // sync value
          if ( self.logger ) self.logger.log( self.value ); // log value
          if( event_or_value instanceof Event ){
            event_or_value.preventDefault();
            event_or_value.stopPropagation();
            return false;
          }
        };
  
        self.ccm.start( 'show_solutions' , {  // ToDo Choose the right ccm version, not self.ccm
          root: show_solutions,
          fkey: self.fkey,
          keys: self.keys,
          user: self.user
        });

        if ( callback ) callback();
      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );