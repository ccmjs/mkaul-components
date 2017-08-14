/**
 * @overview ccm component for geogebra
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 * @see https://www.geogebra.org/wiki/en/Reference:Applet_Embedding
 *      https://dev.geogebra.org/trac/wiki/GeoGebraWeb
 *      https://github.com/geogebra/geogebra
 *      https://tube.geogebra.org
 */

( function () {

  var ccm_version = '9.1.0';
  var ccm_url     = 'https://akless.github.io/ccm/ccm.js';

  var component_name = 'geogebra';
  var component_obj  = {

    name: component_name,

    config: {
      // https://www.geogebra.org/wiki/en/Reference:Applet_Embedding
      // https://wiki.geogebra.org/en/Reference:Math_Apps_Embedding
      geogebra:  [ 'ccm.load', '//cdn.geogebra.org/apps/deployggb.js' ],
      applet: { material_id: "17499", borderColor:"#55FF00" },
      div_id: "applet_container"
      
      // user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-1.0.0.min.js' ],
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    Instance: function () {
    
      var self = this;

      this.start = function ( callback ) {
      
        // has logger instance? => log 'render' event
        if ( self.logger ) self.logger.log( 'render' );
        
        // make GeoGebra Applet
        var applet = new GGBApplet( self.applet, true );
        applet.inject( self.div_id, 'preferHTML5' );

        if ( callback ) callback();
      };

    }

  };

  var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
  if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
  function register() { ccm[ ccm_version ].component( component_obj ); }
}() );