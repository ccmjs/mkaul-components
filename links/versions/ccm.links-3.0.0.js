/**
 * @overview ccm component for links
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (2.0.0)
 * @changes
 * version 2.0.0 17.02.2020
 * version 1.1.0 14.02.2020 reduce initial layout
 * version 1.0.0 13.02.2020 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "links",
    version: [3,0,0],
    
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
        initial: {
          tag: "button", class: "enter", inner: "Add your own links here:"
        },
        main: {
          inner: [
            { id: "top" },
            { tag: "h3", inner: "Add your own links here:" },
            { tag: "input", type: "url", placeholder: "https://...", required: true, pattern: "[Hh][Tt][Tt][Pp][Ss]?:\\/\\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\\d{2,5})?(?:\\/[^\\s]*)?" },
            { tag: "input", type: "text", placeholder: "title" },
            { tag: "textarea", rows: 6, placeholder: "description" },
            { tag: "button", class: "add", inner: "add" },
            { tag: "button", class: "close", inner: "close" }
          ]
        },
        link: {
          tag: "li",
          inner: [
            { tag: "a", href: "%url%", target: "_blank", rel: "noopener", inner: "%title%" },
            { tag: "span", inner: "%description%", style: "padding-left:0.3rem;" }
          ]
        }
      },

      marker: "marker",

      name: "demo",

      // data: {
      //   store: [ "ccm.store", "https://ccmjs.github.io/mkaul-components/links/resources/datasets.js" ],
      //   // store: [ "ccm.store", "./resources/datasets.js" ]
      // },

      data: {
        store: [ "ccm.store", { name: "se1_ss20_links", url: "https://ccm2.inf.h-brs.de" } ]
      },

      // onchange: function(){ console.log( this.getValue() ); },
      
      helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.0.1.mjs" ],
      
      // css: [ "ccm.load",  "./resources/styles.css" ],
      css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/links/resources/styles.css" ],
      user:   [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.1.js", { realm: "hbrsinfpseudo", "logged_in": true } ],
      // logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/mkaul-components/links/resources/configs.js", "log" ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
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
       * open status of this instance:
       * Use single init button (closed) or show input form (open)
       * @type {Boolean}
       */
      let stateOpen = false;

      /**
       * init is called once after all dependencies are solved and is then deleted
       * @type {Function}
       */
      this.init = async () => {

        // set shortcut to helper functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );
        
        // listen to datastore changes => restart
        if ( $.isDatastore( this.data.store ) ) this.data.store.onchange = this.start;

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

        const initButton = $.html( this.html.initial );
        const inputForm = $.html( this.html.main );

        initButton.addEventListener( 'click', async e => {
          stateOpen = true;
          // render input form inside shadow DOM
          $.setContent( this.element, inputForm );
          await render();
        });

        await render();

        async function render(){
          // render inside shadow DOM
          if ( stateOpen ){

            // start from fresh: delete old linkList items from last rendering
            const parentNode = self.root.parentNode.parentNode;
            Array.from( parentNode.querySelectorAll( '.' + self.marker ) ).forEach( item => {
              parentNode.removeChild( item );
            });

            // fetch dataset
            self.data.key = self.name;
            dataset = await $.dataset( self.data );
            if ( ! dataset ) dataset = { key: self.name, links: [] };
            if ( ! dataset.links ) dataset.links = [];

            // add marker to link template
            const html_link = $.clone( self.html.link );
            html_link.class = self.marker;

            // process all links
            dataset.links.forEach( linkData => {
              // fill HTML template with data from dataset
              // add link to parent node outside the shadow DOM
              parentNode.insertBefore( $.html( html_link, linkData ), self.root.parentNode );
            });

          } else { // render initial Button inside shadow DOM

            $.setContent( self.element, initButton );
          }
        }

        // add Event Listener
        const addButton = inputForm.querySelector('button.add');
        addButton.addEventListener( 'click', e => {
          if ( this.user.isLoggedIn() ){
            const url = $.protect( this.element.querySelector('input[type=url]').value );
            const title = $.protect( this.element.querySelector('input[type=text]').value ) || url;
            const description = $.protect( this.element.querySelector('textarea').value );

            if ( url && url.length > 3 ){
              const item = { url, title, description, author: this.user.data().user };

              // add new link data to dataset
              dataset.links.push( item );

              // add new list item to parent DOM not necessary because of restart entire app
              // parentNode.insertBefore( $.html( html_link, item ), this.root.parentNode );

              this.element.querySelector('input[type=url]').value = "";
              this.element.querySelector('input[type=text]').value = "";
              this.element.querySelector('textarea').value = "";

              save();
            }
          }
        });
        const closeButton = inputForm.querySelector('button.close');
        closeButton.addEventListener( 'click', e => {
          stateOpen = false;
          // render input form inside shadow DOM
          $.setContent( this.element, initButton );
        });
 
        // render login/logout area
        if ( this.user && ! this.user.isLoggedIn() ) $.append( this.element.querySelector( '#top' ), this.user.root );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        /**
         * updates app state data and restarts app
         * @returns {Promise<void>}
         */
        async function save() {

          // no datastore? => abort
          if ( !$.isDatastore( self.data.store ) ) return;

          await self.data.store.set( dataset );  // update app state data
          await self.start();     // restart app

        }

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
