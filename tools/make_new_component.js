/**
 * @overview generator for directories and files of a new component
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

var fs = require('fs');
var path = require('path');

var component_name = 'highlight';
var author = 'Manfred Kaul <manfred.kaul@h-brs.de> 2017';
var account = 'mkaul';

var index_html = `<!DOCTYPE html>
<meta charset="utf-8">
<meta name="author" content="${author}">
<meta name="license" content="The MIT License (MIT)">
<script src="https://${account}.github.io/ccm-components/${component_name}/ccm.${component_name}.js"></script>
<script src="ccm.${component_name}.js"></script>
<ccm-${component_name}></ccm-${component_name}>`;

var ccm_component = `/**
 * @overview ccm component for ${component_name}
 * @author ${author}
 * @license The MIT License (MIT)
 */

( function () {

  var component  = {

    name: '${component_name}',
    
    ccm: 'https://akless.github.io/ccm/ccm.js',

    config: {
      html: {
        main: {
          inner: [
            { tag: 'button', class: 'left', inner: '%even%' },
          ]
        }
      },
      css: [ 'ccm.load',  './resources/default.css' ],
      // css: [ 'ccm.load',  'https://${account}.github.io/ccm-components/${component_name}/resources/default.css' ],
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
        var main_elem = self.ccm.helper.html( self.html.main, { even: 'even' } );
        
        // select inner containers (mostly for buttons)
        var left_button = main_elem.querySelector( 'button.left' );
        
        // set content of own website area
        self.ccm.helper.setContent( self.element, main_elem );

        if ( callback ) callback();
      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );`;

var default_css = `/**
 * @overview default layout of ccm component ${component_name}
 * @author ${author}
 * @license The MIT License (MIT)
 */`;

fs.mkdir(path.join('..' + path.sep + component_name), function (err1) {
  if (err1) throw err1;
  console.log( 'Dir ' + component_name + '/ created.' );
  
  fs.writeFile('..' + path.sep + component_name + path.sep + 'index.html', index_html, 'utf8', function (err2) {
      if (err2) throw err2;
      console.log('index.html created.');
  });
  
  fs.writeFile('..' + path.sep + component_name + path.sep + 'ccm.' + component_name + '.js', ccm_component, 'utf8', function (err3) {
      if (err3) throw err3;
      console.log('ccm.' + component_name + '.js created.');
    });
  
  fs.mkdir(path.join('..' + path.sep + component_name + path.sep + 'resources'), function (err4) {
    if (err4) throw err4;
    console.log('Dir resources/ created.');
  
    fs.writeFile('..' + path.sep + component_name + path.sep + 'resources' + path.sep + 'default.css', default_css, 'utf8', function (err5) {
        if (err5) throw err5;
        console.log('default.css created.');
      });
    
  });
});