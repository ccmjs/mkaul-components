/**
 * @overview ccm connector for learning apps from http://learningapps.org
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 * @see http://learningapps.org
 */

( function () {

  var ccm_version = '9.1.0';
  var ccm_url     = 'https://akless.github.io/ccm/ccm.js';

  var component_name = 'learning_app';
  var component_obj  = {

    name: component_name,

    config: {
      key: '1661469', // key of learning app, see http://learningapps.org
      html: {
        main: {
          id: 'main',
          inner: [
            {
              tag: 'iframe',
              frameborder: '0',
              webkitallowfullscreen: 'true',
              mozallowfullscreen: 'true',
              inner: ' Your browser doesn´t support iframes. '
            }
          ]
        }
      },
      css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/learning_app/resources/default.css' ],
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
        var main_elem = self.ccm.helper.html( self.html.main );
        var iframe = main_elem.querySelector('iframe');
        
        // set content of own website area
        self.ccm.helper.setContent( self.element, main_elem );
  
        // load with same protocol http or https as this component
        iframe.src = '//LearningApps.org/watch?app=' + self.key ;

        if ( callback ) callback();
      };

    }

  };

  var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
  if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
  function register() { ccm[ ccm_version ].component( component_obj ); }
}() );