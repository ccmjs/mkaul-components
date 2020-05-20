/**
 * @overview extra light ccm component for video starting with small image, which is replaced by iframe only on start
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 20.05.2020 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "video",
    version: [1,0,0],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: "https://ccmjs.github.io/ccm/versions/ccm-25.4.0.min.js",
    // ccm: "https://ccmjs.github.io/ccm/ccm.js",

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      name: "k9NgJQbsxLs",

      html: {
        main:  { tag: "img", width: "100%", height: "auto", src: "https://img.youtube.com/vi/%name%/0.jpg" },
        video: { tag: "iframe", width: "100%", src: "https://www.youtube.com/embed/%name%", frameborder: 0, allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture", allowfullscreen: true,
          style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;'


        }
      },

      // onchange: function(){ console.log( this.getValue() ); },

      helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-5.1.0.min.mjs" ],

      // css: [ "ccm.load",  "./resources/styles.css" ],
      // css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/video/resources/styles.css" ],
      css: [ "ccm.load",  "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/video/resources/styles.css" ],

      user:   [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.5.0.js", { realm: "hbrsinfpseudo" } ],

      // logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.4.js", [ "ccm.get", "https://ccmjs.github.io/mkaul-components/video/resources/configs.js", "log" ] ],
    },

    /**
     * for creating instances of this component
     * @constructor
     */
    Instance: function () {

      /**
       * shortcut to helper functions
       * @type {Object.<string,function>}
       */
      let $;

      /**
       * own reference for inner functions
       * @type {Instance}
       */
      const self = this;

      /**
       * init is called once after all dependencies are solved and is then deleted
       * @type {Function}
       */
      this.init = async () => {

        // set shortcut to helper functions
        $ = Object.assign( {}, this.ccm.helper || ccm.helper, this.helper );

      };

      /**
       * starts the instance
       */
      this.start = async () => {

        this.element.textContent = '';

        this.element.style = 'position: relative; padding-bottom: 56.25%; padding-top: 0; height: 0; overflow: hidden;';

        const img = $.html( self.html.main, { name: self.name } );

        this.element.appendChild( img );

        img.addEventListener('click', (e) => {
          self.onchange && self.onchange( e, img, self );
          this.element.removeChild( img );
          this.element.appendChild( $.html( self.html.video, { name: self.name } ) );
        });

      };
    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
