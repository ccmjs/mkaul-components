/**
 * @overview ccm component for UML
 * @see PlantUML
 * @url http://plantuml.com/demo-javascript-synchronous
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 * @ToDo PlantUML-Kommentare führen zu ungültiger Syntax: ' (single quote) wird zu " (double quote) umgewandelt, auch im Eingabefeld nach neu Laden der Seite.
 */

( function () {
  
  var component = {
    
    name: 'uml',
  
    ccm: 'https://akless.github.io/ccm/version/ccm-11.5.0.min.js',
    // ccm: '//akless.github.io/ccm/ccm.js',
    
    config: {
      plantUML: "https://www.plantuml.com/plantuml/img/",
      rawdeflate: ['ccm.load', 'https://kaul.inf.h-brs.de/data/ccm/uml/resources/rawdeflate.js'], // helper library for PlantUML
      default: 'Bob->Alice : hello',
      onchange: function ( instance, results, name ) { console.log( name, results ); },
      data: {
        store: ["ccm.store"/*,{store:"uml",url:"https://ccm.inf.h-brs.de"}*/],
        key: "demo"
      },
      html: {
        main: {
          inner: [
            { tag: 'img', src: '%plantUML%%compressed_default%' },
            { tag: 'textarea', inner: '%default%' },
            { tag: 'button', class: 'sync', inner: 'Sync' },
            { tag: 'button', class: 'help', inner: 'Help' },
            { class: 'uml_helper_text', inner: '%uml_helper_text%', style: 'display:none' }
          ]
        },
        help: { // helper text in UML form to be redefined via config
          en: { // in English
            inner: [
              'With ',
              { tag: 'a', href: 'http://plantuml.sourceforge.net', target: '_blank', inner: 'PlantUML' },
              ' you can specify the following diagrams (see also ',
              { tag: 'a', href: 'https://stackoverflow.com/questions/tagged/plantuml?sort=newest&pageSize=50', target: '_blank', inner: 'PlantUML bei Stackoverflow' },
              ' ): ',
              { tag: 'ul', inner: [
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/use-case-diagram', target: '_blank', inner: 'UML Use Case diagram' } },
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/class-diagram', target: '_blank', inner: 'UML class diagram' } },
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/sequence-diagram', target: '_blank', inner: 'UML sequence diagram' } },
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/activity-diagram-beta', target: '_blank', inner: 'UML activity diagram' } },
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/state-diagram', target: '_blank', inner: 'UML state diagram' } },
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/component-diagram', target: '_blank', inner: 'UML component diagram' } },
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/object-diagram', target: '_blank', inner: 'UML object diagram' } },
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/deployment-diagram', target: '_blank', inner: 'UML deployment diagram' } },
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/timing-diagram', target: '_blank', inner: 'UML timing diagram' } },
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/salt', target: '_blank', inner: 'Wireframes' } },
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/gantt-diagram', target: '_blank', inner: 'Gantt Charts' } },
              ] } ]
          },
          de: { // in German
            inner: [
              { tag: 'a', href: 'http://plantuml.sourceforge.net', target: '_blank', inner: 'PlantUML' },
              ' erlaubt die textuelle Spezifikation und die Generierung folgender Diagramme (siehe auch ',
              { tag: 'a', href: 'http://translate.plantuml.com/de/PlantUML_Language_Reference_Guide_DE.pdf', target: '_blank', inner: 'PlantUML in deutsch' },
              ' und ',
              { tag: 'a', href: 'https://stackoverflow.com/questions/tagged/plantuml?sort=newest&pageSize=50', target: '_blank', inner: 'PlantUML bei Stackoverflow' },
              ' ): ',
              { tag: 'ul', inner: [
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/use-case-diagram', target: '_blank', inner: 'UML Anwendungsfall-Diagramm (<i>Use Case</i>)' } },
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/class-diagram', target: '_blank', inner: 'UML Klassendiagramm' } },
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/sequence-diagram', target: '_blank', inner: 'UML Sequenzdiagramm' } },
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/activity-diagram-beta', target: '_blank', inner: 'UML Aktivitätsdiagramm' } },
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/state-diagram', target: '_blank', inner: 'UML Zustandsdiagramm' } },
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/component-diagram', target: '_blank', inner: 'UML Komponentendiagramm' } },
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/object-diagram', target: '_blank', inner: 'UML Objektdiagramm' } },
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/deployment-diagram', target: '_blank', inner: 'UML Deployment Diagram' } },
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/timing-diagram', target: '_blank', inner: 'UML Timing Diagram' } },
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/salt', target: '_blank', inner: 'Wireframes' } },
                { tag: 'li', inner: { tag: 'a', href: 'http://plantuml.com/gantt-diagram', target: '_blank', inner: 'Gantt Chart' } },
              ] } ]
          }
        }
      },

      style: {
        img: {
          border: 'solid',
          "border-width": '2px'
        },
        textarea: {
          width: '35em',
          height: '18em'
        }
      },

      language: 'de', // Dynamic Switching by restart
      messages: {
        'en': {
          show: 'Display help text',
          hide: 'Hide help text',
          sync: 'Sync text and diagram'
        },
        'de': {
          show: 'Zeige Hilfetext',
          hide: 'Verberge Hilfetext',
          sync: 'Synchronisiere Text und Diagramm'
        }
      },

      // css: [ 'ccm.load',  'https://kaul.inf.h-brs.de/data/ccm/uml/resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/uml/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-1.0.0.min.js' ],
      logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://kaul.inf.h-brs.de/data/2017/se1/json/log_configs.js', 'se_ws17_uml' ] ]
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    Instance: function () {
    
      var self = this;
  
      this.init = function ( callback ) {
        // inherit context parameter
        if ( ! self.fkey ) self.fkey = self.ccm.context.find(self,'fkey');
        self.keys = {
          semester: self.semester || self.ccm.context.find(self,'semester'),
          fach: self.fach || self.ccm.context.find(self,'fach')
        };
    
        callback();
      };

      this.getValue = function (  ) {
        return this.element.querySelector( 'textarea' ).value;
      };
      
      this.start = function ( callback ) {
      
        // has logger instance? => log 'start' event
        if ( self.logger ) self.logger.log( 'start', { component: self.index, fkey: self.fkey, keys: self.keys, id: self.id } );

        // prepare main HTML structure
        var main_elem = self.ccm.helper.html( self.html.main,
          { plantUML: self.plantUML,
            default: self.value? self.value.uml : self.default,
            compressed_default: compress_uml( self.value? self.value.uml : self.default )
          } );
        
        // select inner containers
        var uml_helper_text = main_elem.querySelector( '.uml_helper_text' );
        self.ccm.helper.setContent( uml_helper_text, self.ccm.helper.html( self.html.help[self.language] ) );
        var img = main_elem.querySelector( 'img' );
        if ( self.width ){
          img.style.width = self.width;
        }
        if ( self.format ){
          img.format = self.format;
        }
        var textarea = main_elem.querySelector( 'textarea' );

        // use tab key for indent, not for jumping to the next input field
        textarea.onkeydown = function(e){
          if(e.keyCode==9 || e.which==9){
            e.preventDefault();
            var s = this.selectionStart;
            this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
            this.selectionEnd = s+1;
          }
        };
  
        self.sync = function ( event_or_value ) {
          if ( event_or_value && event_or_value !== 'undefined' && ! ( event_or_value instanceof Event ) ){
            // write value into textarea
            if ( event_or_value.startsWith('{') ){
              textarea.value = JSON.parse( event_or_value ).uml.split("'").join('"');
            } else {
              textarea.value = event_or_value;
            }
          }
          // sync value and textarea
          self.value = { uml: textarea.value.split("'").join('"') };
          if ( self.logger ) self.logger.log( 'sync', { fkey: self.fkey, keys: self.keys, value: self.value } );
          if ( self.value ) compress( img, self.value.uml ); // write into src attribute of img tag
          if( event_or_value instanceof Event ){
            event_or_value.preventDefault();
            event_or_value.stopPropagation();
            return false;
          }
        };

        var help_button = main_elem.querySelector( 'button.help' );

        help_button.addEventListener('click', help, false);

        function help(e) { // toggle visibility of helper text
          if ( uml_helper_text.style.display === 'none' ){
            uml_helper_text.style.display = 'block';
            help_button.title = self.messages[self.language].hide;
          } else {
            uml_helper_text.style.display = 'none';
            help_button.title = self.messages[self.language].show;
          }
          if ( self.logger ) self.logger.log( 'help', { fkey: self.fkey, keys: self.keys, id: self.id } );
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
        
        var sync_button = main_elem.querySelector( 'button.sync' );
        sync_button.title = self.messages[self.language].sync;

        sync_button.addEventListener('click', self.sync, false);
        
        // set content of own website area
        self.ccm.helper.setContent( self.element, main_elem );

        // styling
        if ( self.style ) Object.keys(self.style).map(selector=>{
          Object.keys(self.style[selector]).map(key=>{
            self.element.querySelector(selector).style.setProperty(key, self.style[selector][key]);
          });
        });
  
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
  
  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );