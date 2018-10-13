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

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',
    // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.0.4.min.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        main: {
          inner: [
            { tag: 'h1', inner: 'WebGL Demo with three.js' },
            { tag: 'button', class: 'start', inner: 'Stopp!' },
            { tag: 'input', class: 'range', type: 'range', min: 1, max: 50, step: 1, value: 1 },
            { tag: 'span', inner: '1' },
            { tag: 'br' }
          ]
        }
      },
      three_js: [ 'ccm.load',  '//cdn.rawgit.com/mrdoob/three.js/master/build/three.min.js' ],
      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/webgl_three_js/resources/default.css' ]

      // onfinish: function( instance, results ){ console.log( results ); }
    },

    /**
     * for creating instances of this component
     * @constructor
     */
    Instance: function () {

      "use strict";

      /**
       * own reference for inner functions
       * @type {Instance}
       */
      const self = this;

      /**
       * shortcut to help functions
       * @type {Object.<string,function>}
       */
      let $;

      /**
       * init is called once after all dependencies are solved and is then deleted
       */
      this.init = async () => {

        //  Is config given via LightDOM (inner HTML of Custom Element)?
        //  Then use it with higher priority
        if ( self.inner && self.inner.innerHTML.trim() ){

          // interprete LightDOM
          self.lightDOM = JSON.parse( self.inner.innerHTML );

          // merge into config
          Object.assign( self, self.lightDOM );

        }

      };

      /**
       * is called once after the initialization and is then deleted
       */
      this.ready = async () => {

        // set shortcut to help functions
        $ = self.ccm.helper;

      };

      /**
       * starts the instance
       */
      this.start = async () => {
      
        // has logger instance? => log 'start' event
        if ( self.logger ) self.logger.log( 'start' );
        
        // prepare main HTML structure
        const main_elem = $.html( self.html.main );

        // select inner containers (mostly for buttons)
        const start_button = main_elem.querySelector( 'button.start' );
        let started = true;
        start_button.addEventListener( "click", event => {
          started = ! started;
          start_button.innerText = started ? 'Stopp' : 'Rotate!';
          event.preventDefault();
        });

        const speed_span = main_elem.querySelector( 'span' );
        const slider = main_elem.querySelector( 'input.range' );
        let speed = 1;
        slider.addEventListener( "input", event => {
          speed = event.target.valueAsNumber;
          speed_span.innerText = speed;
          event.preventDefault();
        });

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
            mesh.rotation.x += speed * 0.01;
            mesh.rotation.y += speed * 0.02;

            renderer.render( scene, camera );
          }

        };

        self.element.appendChild( renderer.domElement );

        animate();

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}