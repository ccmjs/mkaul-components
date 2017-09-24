/**
 * @overview ccm component for highlight
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component  = {

    name: 'highlight',
    
    ccm: 'https://akless.github.io/ccm/ccm.js',

    config: {
      hljs: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/highlight/resources/highlight.min.js' ],
      css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/highlight/resources/monokai-sublime.css' ]
      // css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/highlight/resources/monokai-sublime.css' ],
      // css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/highlight/resources/default.min.css' ],
      // clazz: 'java',
      // content: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/2017/se1/01/HelloWorld.java' ]
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/highlight/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-1.0.0.min.js' ],
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    Instance: function () {
    
      var self = this;

      this.start = function ( callback ) {
      
        // has logger instance? => log 'render' event
        if ( self.logger ) self.logger.log( 'render' );

        // set content of own website area
        self.ccm.helper.setContent( self.element, self.ccm.helper.html( {
          tag: 'pre', inner: {
            tag: 'code',
            class: ( self.clazz || self.root.classList.value ) // config or lightDOM
          }
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
        
        main_elem.textContent = textContent;
  
        hljs.highlightBlock( main_elem );

        if ( callback ) callback();
        
      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );