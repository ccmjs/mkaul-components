/**
 * @overview generator for directories and files of a new component
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

var fs = require('fs');
var path = require('path');

var component_name = 'uml';
var author = 'Manfred Kaul <manfred.kaul@h-brs.de> 2017';
var account = 'mkaul';
var ccm_version = '9.2.0';

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

  var filename = 'ccm.${component_name}.js';

  var ccm_version = '${ccm_version}';
  var ccm_url     = 'https://akless.github.io/ccm/version/ccm-${ccm_version}.js';

  var component_name = '${component_name}';
  var component_obj  = {

    name: component_name,

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

  if ( window.ccm && window.ccm.files ) window.ccm.files[ filename ] = component_obj;
  var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
  if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
  function register() { ccm[ ccm_version ].component( component_obj ); }
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