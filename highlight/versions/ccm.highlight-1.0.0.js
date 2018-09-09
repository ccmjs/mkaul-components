/**
 * @overview ccm component for highlight
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component  = {

    name: 'highlight',

    version: [ 1, 0, 0 ],
  
    ccm: 'https://akless.github.io/ccm/versions/ccm-11.5.0.min.js',
    // ccm: '//akless.github.io/ccm/ccm.js',

    config: {
      hljs:  [ 'ccm.load', 'https://kaul.inf.h-brs.de/data/ccm/highlight/resources/highlight.min.js' ],
      css:   [ 'ccm.load', 'https://kaul.inf.h-brs.de/data/ccm/highlight/resources/monokai-sublime.min.css' ],
      css_alternatives: [ 'https://kaul.inf.h-brs.de/data/ccm/highlight/resources/monokai-sublime.min.css', 'https://kaul.inf.h-brs.de/data/ccm/highlight/resources/tomorrow.min.css', 'https://kaul.inf.h-brs.de/data/ccm/highlight/resources/zenburn.min.css', 'https://kaul.inf.h-brs.de/data/ccm/highlight/resources/github.min.css' ]
      
      // clazz: 'java',
      // content: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/2017/se1/01/HelloWorld.java' ]
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/highlight/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-1.0.0.min.js' ],
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    Instance: function () {
    
      var self = this;
  
      this.style = 0;
      
      this.setStyle = function( style_nr ) {
        self.style = style_nr;
        self.style %= self.css_alternatives.length;
        self.element.parentNode.querySelector('link').href = self.css_alternatives[ self.style ] ;
      };

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
                { tag: 'a', inner: 'Down', class: 'down', title: 'Download as File!', style: 'border-radius: 10px; margin: 3px; outline:0;appearance:button;font-size: smaller;padding:3px;border-style: solid;border-width: thin;background-color: white;color:initial;border-color: lightgrey;' },
                { tag: 'button', inner: 'Copy', class: 'copy', title: 'Copy to ClipBoard', onclick: copyToClipBoard, style: 'border-radius: 10px; margin: 3px; outline:0;' },
                { tag: 'button', inner: 'Style', title: 'Change Style', onclick: changeStyle, style: 'border-radius: 10px; margin: 3px; outline:0;' }
              ]
            }
           ]
         } ) );
        
        // get DOM element of <pre><code>
        var main_elem = self.element.querySelector('pre code');

        var copy_button = self.element.querySelector('.copy');

        // https://stackoverflow.com/questions/23211018/copy-to-clipboard-with-jquery-js-in-chrome
        copy_button.addEventListener('copy', function (e) {
          e.preventDefault();
          if (e.clipboardData) {
            e.clipboardData.setData('text/html', main_elem.innerHTML );
          } else if (window.clipboardData) {
            window.clipboardData.setData('Text', main_elem.innerText );
          }
        });

        function copyToClipBoard(e) {
          var range = document.createRange();
          range.selectNode( main_elem );
          var selection = window.getSelection();
          selection.removeAllRanges();
          if( ! selection.containsNode( main_elem ) ) selection.addRange(range);
          document.execCommand("copy");
          // window.getSelection().empty();
          // e.preventDefault();
          // e.stopPropagation();
          // return false;
        }

        // set main element content to config or lightDOM content
        var textContent = self.content || ( self.inner || self.root ).innerHTML;

        // fill download link with Blob filled with textContent
        let blob = new Blob( [ textContent ], { type: 'text/plain' } );
        let a = self.element.querySelector('.down');
        a.href = URL.createObjectURL(blob);
        a.download = 'ClassName.java';
        a.textContent = 'Download';
        
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
          var elem = document.createElement('div');
          elem.innerHTML = input;
          return input ? elem.childNodes[0].nodeValue : input;
        }
  
        function isHTML(str) { // ToDo to be deleted
          var div = document.createElement('div');
          div.innerHTML = str;
          for (var c = div.childNodes, i = c.length; i--; ) {
            if (c[i].nodeType == 1) return true;
          }
          return false;
        }
        
        function changeStyle(e) {
          self.style += 1;
          self.setStyle( self.style );
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
        
      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );