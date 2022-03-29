/**
 * @overview ccm component for login
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2021
 * @license The MIT License (MIT)
 * @version latest (2.0.0)
 * @changes
 * version 2.0.0 29.03.2022 logout on another day
 * version 1.0.0 07.02.2021 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "login",
    version: [2,0,0],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: "/ccmjs/ccm/versions/ccm-26.4.4.min.js",
    // ccm: "https://kaul.inf.h-brs.de/ccmjs/ccm/ccm.js",

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        login: {
          inner: [
            { tag: "button", inner: "Login", onclick: "%click%" },
          ]
        },
        logout: {
          inner: [
            { tag: "span", class: "user", inner: "%user%" },
            { tag: "button", inner: "Logout", onclick: "%click%" },
          ]
        }
      },

      loginURL: './login/ldap.php',
      checkLoginURL: './login/check.php',  // ToDo
      realm: 'hbrsinfpseudo',
      prefix: 'ccm-user-',  // loginKey = prefix + realm,

      helper: [ "ccm.load", "/ccmjs/akless-components/modules/versions/helper-7.6.0.min.mjs" ],

      // css: [ "ccm.load",  "./resources/styles.css" ],
      // css: [ "ccm.load",  "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/login/resources/styles.css" ],
      css: [ "ccm.load",  "/ccmjs/mkaul-components/login/resources/styles.css" ],
      picture: "./assets/img/user.svg"

      // onchange is fired when login status changes

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

        self.debug && console.log( this.index, '.init from ', this.parent.index );
        if ( this.parent.component.name === 'quill' ) debugger;

        this.logged_in = true; // always immediate login

        // set shortcut to helper functions
        $ = Object.assign( {}, this.ccm.helper || ccm.helper, this.helper );

        window.addEventListener( 'storage', storageListener );
        if ( window.parent ) window.parent.addEventListener( 'storage', storageListener );

        document.addEventListener( 'login', _=>{
          self.start();
          self.login();
        });

        document.addEventListener( 'logout', _=>{
          self.start();
        });

        function storageListener( e ){
          if( e.storageArea === sessionStorage ){
            self.start();
          }
          // else, event is caused by an update to localStorage, ignore it
        }
      };


      /**
       * starts the instance and rerenders Login Button
       */
      this.start = async () => {

        self.debug &&  console.log( this.index, '.start from ', this.parent.index );
        if ( this.parent.component.name === 'quill' ) debugger;

        // no login/logout button? => abort
        if ( this.norender ) this.element.style.display = 'none';

        // render logged in or logged out view
        if ( this.isLoggedIn() )
          $.setContent( this.element, $.html( this.html.logout, {
            click: this.logout,
            user: this.getUsername()
          } ) );
        else {
          $.setContent( this.element, $.html( this.html.login, {
            click: this.login
          } ) );
          // document.dispatchEvent( new CustomEvent('logout') );  ==> Max call stack size exceeded
        }
      };

      this.loginKey = () => {
        return this.prefix + this.realm;
      };

      this.isLoggedIn = () => {
        return this.checkDate();
      };

      this.checkDate = async () => {
        const loginDataString = sessionStorage.getItem( this.loginKey() );
        if ( ! loginDataString ) return false;
        const loginData = JSON.parse( loginDataString );
        let loginDay = ( new Date( loginData.date ) ).getDay();
        if ( isNaN( loginDay ) ) loginDay = new Date( loginData.date.replace(' ','T')  ).getDay();
        if ( (new Date()).getDay() !== loginDay ) this.logout();
        return (new Date()).getDay() === loginDay;
      }

      this.waitForLogin = async () => {
        return new Promise( resolve => {
          if ( this.isLoggedIn() ){
            resolve();
          } else {
            const eventListener = _=>{
              document.removeEventListener('login', eventListener );
              resolve( this.waitForLogin() );
            };
            document.addEventListener('login', eventListener );
            // ToDo multiple login failures
          }
        });
      };

      this.logout = async () => {
        sessionStorage.removeItem( this.loginKey() );
        // this.start();
        // this.parent.start();   // ToDo redraw parent instance
        document.dispatchEvent( new CustomEvent( 'logout' ) );
        this.onchange && this.onchange( this );
      };

      this.login = async () => {
        if ( ! this.isLoggedIn() ){
          document.dispatchEvent( new CustomEvent('logout') );
          // await successful login
          await this.waitForLogin();
        }
        // this.start();
        this.onchange && this.onchange( this );
        return JSON.parse( sessionStorage.getItem( this.loginKey() ) );
      };

      /**
       * returns displayed username
       * @returns {string}
       */
      this.getUsername = () => {
        const user = this.data();
        if ( this.user ) return this.user;
        return this.map && this.map( user ) || user.name || user.user || user.key;
      };

      this.data = () => {
        this.checkDate();
        const loginDataString = sessionStorage.getItem( this.loginKey() );
        if ( ! loginDataString ) return { user: 'default', picture: this.picture };
        const userData = JSON.parse( loginDataString );
        if ( ! userData.picture ) userData.picture = this.picture;
        return userData;
      };

      /**
       * returns current result data
       * @returns {Object} user data
       */
      this.getValue = () => {
        return this.data();
      };

      /**
       * returns authentication realm
       * @returns {string}
       */
      this.getRealm = () => this.realm;

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
