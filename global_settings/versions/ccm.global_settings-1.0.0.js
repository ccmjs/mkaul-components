/**
 * @overview ccm component for global_settings
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 24.09.2020 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "global_settings",
    version: [1,0,0],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: "https://ccmjs.github.io/ccm/versions/ccm-25.5.3.min.js",
    // ccm: "https://ccmjs.github.io/ccm/ccm.js",

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      namespace: 'KAUL-APP-GLOBALS',

      messages: {
        "success": "Alle Einstellungen erfolgreich zurückgesetzt!",
      },

      serviceworker_controller: [ "ccm.instance", "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/serviceworker_controller/versions/ccm.serviceworker_controller-1.0.0.js" ],

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
      let urlVersion = 1;

      // Global Constants
      this.internalStore = {};
      this.subscriptions = [];

      this.setGlobal = ( key, newValue, noLocalStorage ) => {
        this.internalStore[ key ] = newValue;
        if ( ! noLocalStorage ) localStorage.setItem( key , newValue );
        // this.update(); starts all audios
      };

      this.darkMode = function( event ){
        document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
        document.body.querySelectorAll('img, picture, video').forEach(
          el => el.style.filter = 'invert(1) hue-rotate(180deg)');
      }

      /**
       * called when instance is initialized
       */
      this.init = async () => {
        window[ self.namespace ] = this;
        const urlParams = new URLSearchParams( window.location.search );
        urlVersion = urlParams ? parseInt( urlParams.get('v') ) : null;
        const Version = urlVersion ? urlVersion : this.getNumber( 'Version', 1 );
        document.querySelector('title').textContent += ' v' + Version;

        this.setGlobal( 'Version', urlVersion || 1 );
      };

      /**
       * starts the instance
       */
      this.start = async () => {  // start in parallel

        // dark mode media query
        // https://stackoverflow.com/questions/56466261/matchmedia-addlistener-marked-as-deprecated-addeventlistener-equivalent
        const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkMediaQuery.addEventListener('change', (e) => {
          document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
          document.body.querySelectorAll('img, picture, video').forEach(
            el => el.style.filter = 'invert(1) hue-rotate(180deg)');
        });

        /**************************************************************************************************/
        /**                   start AppCollection                                                        **/
        /**************************************************************************************************/
        const app = await this.ccm.helper.solveDependency( self.ignore.app );
        app.start();

      };


      this.reset = ( button ) => {
        this.internalStore = {};
        localStorage.clear();
        if ( button ){
          button.nextElementSibling.textContent = self.messages.success;
        }
      };

      this.update = () => { // ToDo test
        this.subscriptions.forEach( ccm_instance => {
          if ( this.ccm.helper.isComponent( ccm_instance ) || this.ccm.helper.isInstance( ccm_instance ) ){
            ccm_instance.start( ...arguments );
          } else {
            ccm_instance.update( ...arguments );
          }
        });
      };

      this.getGlobal = ( key, defaultValue ) => {  // returns String
        const internalCache = this.internalStore[ key ];
        if ( internalCache ) return internalCache;
        const localCache = localStorage.getItem( key );
        if ( localCache ){
          this.internalStore[ key ] = localCache;
          return localCache;
        }
        if( defaultValue ){
          localStorage.setItem( key , defaultValue );
          return defaultValue;
        }
      };
      this.getNumber = ( key, defaultValue ) => {  // returns Number
        const value = this.getGlobal( key );
        if ( value ){
          return parseInt( value );
        } else if( defaultValue >= 0 ){
          this.setGlobal( key, defaultValue );
          return defaultValue;
        }
      };
      this.getBool = ( key, defaultValue ) => {
        const value = this.getGlobal( key );
        if ( value ){
          return value === "true" || value === true || value === 1;
        } else {
          this.setGlobal( key, defaultValue );
          return defaultValue;
        }
      };
        this.incNumber = ( key ) => {
        this.setGlobal( key, 1 + this.getNumber( key ) );
        // this.update(); starts all audios
      }
      this.decNumber = ( key ) => {
        this.setGlobal( key, this.getNumber( key ) - 1 );
        // this.update(); starts all audios
      };
      this.updateTitle = () => {
        const oldTitle = document.querySelector('title').textContent;
        const prefix = oldTitle.split(' ')[0];
        document.querySelector('title').textContent = prefix + ' v' + this.getGlobal('Version', 1);
      };
      this.incVersion = () => {
        this.incNumber('Version');
        this.updateTitle();
      };
      this.decVersion = () => {
        this.decNumber('Version');
        this.updateTitle();
      };
      this.getFloat = ( key, defaultValue ) => {  // returns Float
        const value = this.getGlobal( key );
        if ( value ) return parseFloat( value );
        if( defaultValue ){
          return defaultValue;
        }
      }
      this.subscribe = ( ccm_instance ) => {
        this.subscriptions.push( ccm_instance );
      }
      this.toLocaleDateString = ( date ) => {  // ToDo move helper function to adaequate module
        return new Date( date ).toLocaleDateString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      };


    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
