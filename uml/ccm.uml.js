/**
 * @overview ccm component for UML
 * @see PlantUML
 * @url http://plantuml.com/demo-javascript-synchronous
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {
  
  var filename = 'ccm.uml.js';

  var ccm_version = '9.2.0';
  var ccm_url     = 'https://akless.github.io/ccm/version/ccm-9.2.0.js';

  var component_name = 'uml';
  var component_obj  = {

    name: component_name,

    config: {
      plantUML: "http://www.plantuml.com/plantuml/img/",
      rawdeflate: ['ccm.load', 'https://kaul.inf.h-brs.de/data/ccm/uml/resources/rawdeflate.js'], // helper library for PlantUML
      default: 'Bob->Alice : hello',
      onchange: function ( instance, results, name ) { console.log( name, results ); },
      html: {
        main: {
          inner: [
            { tag: 'img', src: '%plantUML%%compressed_default%' },
            { tag: 'textarea', inner: '%default%' },
            { tag: 'button', inner: 'Sync' }
          ]
        }
      },
      // css: [ 'ccm.load',  'https://kaul.inf.h-brs.de/data/ccm/uml/resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/uml/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-1.0.0.min.js' ],
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    Instance: function () {
    
      var self = this;
      
      this.start = function ( callback ) {
      
        // has logger instance? => log 'render' event
        if ( self.logger ) self.logger.log( 'render' );

        // prepare main HTML structure
        var main_elem = self.ccm.helper.html( self.html.main,
          { plantUML: self.plantUML,
            default: self.value? self.value : self.default,
            compressed_default: compress_uml( self.value? self.value : self.default )
          } );
        
        // select inner containers (mostly for buttons)
        var img = main_elem.querySelector( 'img' );
        var textarea = main_elem.querySelector( 'textarea' );
  
        self.sync = function ( event_or_value ) {
          if ( event_or_value !== 'undefined' && event_or_value && ! ( event_or_value instanceof Event ) ){
            textarea.value = event_or_value; // write value into textarea
          }
          self.value = textarea.value; // sync value
          if ( self.logger ) self.logger.log( self.value ); // log value
          if ( self.value ) compress( img, self.value ); // write into src attribute of img tag
          if( event_or_value instanceof Event ){
            event_or_value.preventDefault();
            event_or_value.stopPropagation();
            return false;
          }
        };
        
        var button = main_elem.querySelector( 'button' );
        
        button.addEventListener('click', self.sync, false);
        
        // set content of own website area
        self.ccm.helper.setContent( self.element, main_elem );
  
        // create a back link from HTML root element <ccm-uml> to ccm component instance
        self.root.ccm_instance = self;
  
        // helper functions for PlantUML
        function encode64(data) {
          var r = "";
          for (var i=0; i<data.length; i+=3) {
            if (i+2==data.length) {
              r +=append3bytes(data.charCodeAt(i), data.charCodeAt(i+1), 0);
            } else if (i+1==data.length) {
              r += append3bytes(data.charCodeAt(i), 0, 0);
            } else {
              r += append3bytes(data.charCodeAt(i), data.charCodeAt(i+1),
                data.charCodeAt(i+2));
            }
          }
          return r;
        }
  
        // helper function for PlantUML
        function append3bytes(b1, b2, b3) {
          var c1 = b1 >> 2;
          var c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
          var c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
          var c4 = b3 & 0x3F;
          var r = "";
          r += encode6bit(c1 & 0x3F);
          r += encode6bit(c2 & 0x3F);
          r += encode6bit(c3 & 0x3F);
          r += encode6bit(c4 & 0x3F);
          return r;
        }
  
        // helper function for PlantUML
        function encode6bit(b) {
          if (b < 10) {
            return String.fromCharCode(48 + b);
          }
          b -= 10;
          if (b < 26) {
            return String.fromCharCode(65 + b);
          }
          b -= 26;
          if (b < 26) {
            return String.fromCharCode(97 + b);
          }
          b -= 26;
          if (b === 0) {
            return '-';
          }
          if (b === 1) {
            return '_';
          }
          return '?';
        }
  
        function compress(element, s) {
          //UTF8
          s = decodeURIComponent(encodeURIComponent(s));
          element.src = self.plantUML + encode64( deflate( s, 9 ));
        }
  
        function compress_uml(s){
          return encode64( deflate( s, 9 ) );
        }

        if ( callback ) callback();
      };

    }

  };
  if ( window.ccm && window.ccm.files ) window.ccm.files[ filename ] = component_obj;
  var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
  if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
  function register() { ccm[ ccm_version ].component( component_obj ); }
}() );