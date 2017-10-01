/**
 * @overview ccm component for highlight
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component  = {

    name: 'highlight',
    
    ccm: '//akless.github.io/ccm/version/ccm-10.0.0.min.js',

    config: {
      hljs:  [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/highlight/resources/highlight.min.js' ],
      
      css0:  [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/highlight/resources/default.min.css' ],
      css1:  [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/highlight/resources/monokai-sublime.min.css' ],
      css2:  [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/highlight/resources/github.min.css'  ]
      
      // clazz: 'java',
      // content: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/2017/se1/01/HelloWorld.java' ]
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/highlight/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-1.0.0.min.js' ],
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    Instance: function () {
    
      var self = this;
  
      self.style = 0;

      this.start = function ( callback ) {
      
        // has logger instance? => log 'render' event
        if ( self.logger ) self.logger.log( 'render' );

        // set content of own website area
        self.ccm.helper.setContent( self.element, self.ccm.helper.html( {
          style: 'position: relative;',
          inner: [
            {
              tag: 'pre',
              style: 'padding: 3px;',
              inner: {
                tag: 'code',
                class: ( self.clazz || self.root.classList.value ) // config or lightDOM
              }
            },
            { style: 'position: absolute; top: 0; right: 0; margin: 3px;', inner: [
                { tag: 'button', inner: 'Copy', title: 'Copy to ClipBoard', onclick: copyToClipBoard, style: 'border-radius: 10px; margin: 3px;' },
                { tag: 'button', inner: 'Style', title: 'Change Style', onclick: changeStyle, style: 'border-radius: 10px; margin: 3px;' }
              ]
            }
           ]
         } ) );
        
        // get DOM element of <pre><code>
        var main_elem = self.element.querySelector('pre code');

        // set main element content to config or lightDOM content
        var textContent = self.content || ( self.inner || self.root ).innerHTML;
        
        // skip first and last new line
        // var firstBreak = textContent.indexOf('\n');
        // textContent = textContent.substr(firstBreak+1);
        // var lastBreak = textContent.lastIndexOf('\n');
        // textContent = textContent.substring(0, lastBreak);
        
        main_elem.textContent = htmlDecode( textContent );
  
        hljs.highlightBlock( main_elem );

        if ( callback ) callback();
        
  
        // Converting sanitised html back to displayable html
        // back replacement of "<" instead of "&lt;"
        // https://stackoverflow.com/questions/1248849/converting-sanitised-html-back-to-displayable-html
        function htmlDecode(input){
          var e = document.createElement('div');
          e.innerHTML = input;
          return e.childNodes[0].nodeValue;
        }
        
        function copyToClipBoard() {
          var range = document.createRange();
          range.selectNode( main_elem );
          var selection = window.getSelection();
          if( ! selection.containsNode( main_elem ) ) selection.addRange(range);
          document.execCommand("Copy");
          // window.getSelection().empty();
        }
        
        function changeStyle() {
          self.style += 1;
          self.style %= 3;
          for (var i=0; i<3; i++){
            self.element.querySelector('#css' + self.style).disabled  = ( i !== self.style );
          }
        }
        
      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );