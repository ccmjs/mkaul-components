/**
 * @overview ccm component for show_checkin
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 29.02.2020 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "show_checkin",
    version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: "https://ccmjs.github.io/ccm/versions/ccm-25.0.0.js",
    // ccm: "https://ccmjs.github.io/ccm/ccm.js",

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        main: {
          tag: "table", inner: [
            { tag: "tr", inner: [
                { tag: "th", inner: "Woche" },
                { tag: "th", inner: "Gruppe" },
                { tag: "th", inner: "Datum" }
              ] }
          ]
        },
        row: { tag: "tr", inner: [
            { tag: "td", inner: "%week%" },
            { tag: "td", inner: "%groups%" },
            { tag: "td", inner: "%stamp%" },
          ] }
      },

      checkin: "https://kaul.inf.h-brs.de/data/show_checkin.php",

      mapping: ["week", "groups", "stamp"],
      
      helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.0.2.mjs" ],
      
      // css: [ "ccm.load",  "./resources/styles.css" ],
      css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/show_checkin/resources/styles.css" ],
      
      user:   [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.1.js", { realm: "hbrsinfpseudo" } ],
      
      // logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/mkaul-components/show_checkin/resources/configs.js", "log" ] ],

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
       * dataset is the single source of truth, the Web is the UI
       * The value of dataset starts with a clone of this.data,
       *     but additional values might be added during editing.
       * this.data is never changed, only dataset is changed.
       * @type {Object}
       */
      let dataset;
     
      
      /**
       * init is called once after all dependencies are solved and is then deleted
       * @type {Function}
       */
      this.init = async () => {

        // set shortcut to helper functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );

      };
      
      /**
       * is called once after the initialization and is then deleted
       * @type {Function}
       */
      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready' );

      };
        
      /**
       * starts the instance
       */
      this.start = async () => {

        await this.user.login();
      
        dataset = await ccm.load( { url: self.checkin, method: 'GET', params: {
            user: this.user.data().user,
            token: this.user.data().token.includes('#') ? this.user.data().token.split('#')[1] : this.user.data().token
          }
        } );

        dataset.forEach( record => {
          const object = record.reduce((a,b,i)=>{a[self.mapping[i]]=b;return a},{});
          this.html.main.inner.push( $.format( this.html.row, record.reduce(( object,value,i ) => {
            object[ self.mapping[i] ] = value;
            return object
            },
            {})
          ) );
        });

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main ) );
 
        // render login/logout area if there is no parent ccm component
        this.user && ! this.user.isLoggedIn() && $.append( this.element.querySelector( '#top' ), this.user.root );  // root is empty if parent has login

      };
      
      /**
       * current state of this editor
       * @returns {Object} state of editor
       */
      this.getValue = () => dataset;
      
    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
