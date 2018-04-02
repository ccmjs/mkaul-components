/**
 * @overview ccm component for webgl_three_js
 * @see https://jsfiddle.net/f2Lommf5/
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * TODO: docu comments -> API
 * TODO: unit tests
 * TODO: builder component
 * TODO: i18n
 */

{

  var component  = {   // const not working in Safari

    /**
     * unique component name
     * @type {string}
     */
    name: 'webgl_three_js',
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://akless.github.io/ccm/version/ccm-15.0.2.min.js',
    ccm: '//akless.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        main: {
          inner: [
            { tag: 'h1', inner: 'WebGL Demo with three.js' },
            { tag: 'button', class: 'start', inner: 'Rotate!' }
          ]
        }
      },
      three_js: [ 'ccm.load',  '//cdn.rawgit.com/mrdoob/three.js/master/build/three.min.js' ],
      css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/webgl_three_js/resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/webgl_three_js/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-2.0.0.min.js' ],
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    /**
     * for creating instances of this component
     * @constructor
     */
    Instance: function () {
    
      /**
       * own reference for inner functions
       * @type {Instance}
       */
      const self = this;
      
      /**
       * shortcut to help functions
       * @type {Object}
       */
      let $;
      
      /**
       * init is called once after all dependencies are solved and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.init = callback => {
      
        //  Is content given via LightDOM (inner HTML of Custom Element)?
        //  Then use it with higher priority
        if ( self.inner && self.inner.innerHTML.trim() ) self.text = self.inner.innerHTML;
        
        // ToDo interprete LightDOM

        callback();
      };
      
      /**
       * is called once after the initialization and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.ready = callback => {

        // set shortcut to help functions
        $ = self.ccm.helper;
        
        callback();
      };  
        
      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {
      
        // has logger instance? => log 'start' event
        if ( self.logger ) self.logger.log( 'start' );
        
        // prepare main HTML structure
        const main_elem = $.html( self.html.main );

        // select inner containers (mostly for buttons)
        const start_button = main_elem.querySelector( 'button.start' );
        let started = true;
        start_button.addEventListener( "click", event => { started = ! started; });
        
        // set content of own website area
        $.setContent( self.element, main_elem );

        const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
        camera.position.z = 1;

        const scene = new THREE.Scene();
        const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        const material = new THREE.MeshNormalMaterial();

        const mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        const renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( window.innerWidth, window.innerHeight );

        const animate = function() {

          requestAnimationFrame( animate );

          if ( started ){
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.02;

            renderer.render( scene, camera );
          }

        };

        self.element.appendChild( renderer.domElement );

        animate();

        if ( callback ) callback();
      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}