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
  
  var component = {
    
    name: 'geogebra',
  
    // ccm: '//akless.github.io/ccm/version/ccm-18.0.0.min.js',
    ccm: '//akless.github.io/ccm/ccm.js',
    
    config: {
      // https://www.geogebra.org/wiki/en/Reference:Applet_Embedding
      // https://wiki.geogebra.org/en/Reference:Math_Apps_Embedding
      geogebra:  [ 'ccm.load', '//cdn.geogebra.org/apps/deployggb.js' ],
      applet: { material_id: "17499", borderColor:"#55FF00" }

    },

    Instance: function () {

      "use strict";

      /**
       * starts the instance
       */
      this.start = async () => {
      
        // has logger instance? => log 'render' event
        if ( this.logger ) this.logger.log( 'render' );

        var container = document.createElement('div');
        container.id = "applet_container_" + this.index;
        document.body.appendChild(container);

        // make GeoGebra Applet
        const applet = new GGBApplet( this.applet, true );
        applet.inject( container, 'preferHTML5' );

      };

    }

  };
  
  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );