/**
 * @overview ccm component for checkin: verify your presence
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 28.02.2020 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "checkin",
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
          inner: [
            { id: "top" },
            { tag: "input", type: "text", placeholder: "Tageslosung", required: true },
            { class: "small", inner: "Die Tageslosung wird in der Präsenzübung bekannt gegeben. Die Weitergabe ist untersagt. Bei Zuwiderhandeln riskieren Sie Ihre Klausurzulassung." },
            { tag: "button", inner: "In die Anwesenheitsliste eintragen" },
            { tag: "img", src: "https://kaul.inf.h-brs.de/se/img/green_ok.svg", style: "display: none;" },
            { id: "receipt" }
          ]
        },
        receipt: {
          inner: [
            { tag: "p", inner: "Sie sind in der Anwesenheitsliste der Gruppe %group% am %date% um %time% erfolgreich eingetragen." },
            { tag: "p", inner: "Ihre Quittung lautet: %receipt%" }
          ]
        },
      },

      // onchange: function(){ console.log( this.getValue() ); },
      
      helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.0.2.mjs" ],

      // css: [ "ccm.load",  "./resources/styles.css" ],
      css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/checkin/resources/styles.css" ],
      
      user:   [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.1.js", { realm: "hbrsinfpseudo" } ],

      checkin: "https://kaul.inf.h-brs.de/data/checkin.php"
      // logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/mkaul-components/checkin/resources/configs.js", "log" ] ],
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

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main ) );

        const top = this.element.querySelector( '#top' );
        const receipt = this.element.querySelector( '#receipt' );

        // render login/logout area if there is no parent ccm component
        this.user && ! this.user.isLoggedIn() && $.append( top, this.user.root );  // root is empty if parent has login

        const input = this.element.querySelector('input');
        const button = this.element.querySelector('button');
        const img = this.element.querySelector('img');

        let counter = 0;

        button.addEventListener('click', async e => {
          counter += 1;

          // logging of 'checkin' event
          this.logger && this.logger.log( 'checkin', { count: counter, losung: input.value } );

          const checkin = await ccm.load( { url: self.checkin, method: 'GET', params: {
              user: this.user.data().user,
              token: this.user.data().token.includes('#') ? this.user.data().token.split('#')[1] : this.user.data().token,
              losung: input.value,
              count: counter
            }
          });

          if ( checkin.success ){

            top.style.display = 'none';
            img.style.display = "block";
            input.style.display = "none";
            button.style.display = "none";

            $.setContent( receipt, $.html( self.html.receipt, {
              receipt: checkin.receipt,
              group: checkin.group,
              date: `${(new Date).getDate()}.${(new Date).getMonth()+1}.${(new Date).getFullYear()}`,
              time: `${(new Date).getHours()}:${(new Date).getMinutes()}:${(new Date).getSeconds()}`
            } ) );

          } else {

            $.setContent( top, "Falsche Losung. Bitte versuchen Sie es noch einmal:" );

          }
        });
      };
      
    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
