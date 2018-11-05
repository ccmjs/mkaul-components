/**
 * @overview ccm connector for learning apps from http://learningapps.org
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 * @see http://learningapps.org
 */

( function () {
  
  var component = {
    
    name: 'learning_app',
    version: [2,0,0],
  
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.3.0.min.js',
    // ccm: '//ccmjs.github.io/ccm/ccm.js',

    config: {
      learn_id: '1661469', // key of learning app, see http://learningapps.org
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
      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/learning_app/resources/default.css' ]

      // onfinish: function( instance, results ){ console.log( results ); }
    },

    Instance: function () {

      /**
       * starts the instance
       */
      this.start = async () => {
      
        // has logger instance? => log 'render' event
        if ( this.logger ) this.logger.log( 'render' );
        
        // prepare main HTML structure
        const main_elem = this.ccm.helper.html( this.html.main );
        const iframe = main_elem.querySelector('iframe');
        
        // set content of own website area
        this.ccm.helper.setContent( this.element, main_elem );
  
        // load with same protocol http or https as this component
        iframe.src = '//LearningApps.org/watch?app=' + this.learn_id ;

      };

    }

  };
  
  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );