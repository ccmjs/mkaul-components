/**
 * @overview ccm component for links
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
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
    // version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: "https://ccmjs.github.io/ccm/versions/ccm-25.0.0.js",
    ccm: "https://ccmjs.github.io/ccm/ccm.js",

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        main: {
          inner: [
            { id: "top" },
            { tag: "h3", inner: "Add your own links here:" },
            { tag: "input", type: "url", placeholder: "https://..." },
            { tag: "input", type: "text", placeholder: "title" },
            { tag: "textarea", rows: 6, placeholder: "description" },
            { tag: "button", class: "submit", inner: "add" },
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
      
      data: {
        // store: [ "ccm.store", "https://ccmjs.github.io/mkaul-components/links/resources/datasets.js" ],
        store: [ "ccm.store", "./resources/datasets.js" ]
      },

      // data: {
      //   store: [ "ccm.store", { name: "se1_ss20_links", url: "https://ccm2.inf.h-brs.de" } ]
      // },

      // onchange: function(){ console.log( this.getValue() ); },
      
      helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.0.1.mjs" ],
      
      css: [ "ccm.load",  "./resources/styles.css" ],
      // css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/links/resources/styles.css" ],
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

        // start from fresh: delete old linkList items from last rendering
        const parentNode = this.root.parentNode.parentNode;
        Array.from( parentNode.querySelectorAll( '.' + this.marker ) ).forEach( item => {
          parentNode.removeChild( item );
        });

        // fetch dataset
        this.data.key = this.name;
        dataset = await $.dataset( this.data );
        if ( ! dataset ) dataset = { key: this.name, links: [] };
        if ( ! dataset.links ) dataset.links = [];

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // add marker to link template
        const html_link = $.clone( this.html.link );
        html_link.class = this.marker;

        // process all links
        dataset.links.forEach( linkData => {
          // fill HTML template with data from dataset
          // add link to parent node outside the shadow DOM
          parentNode.insertBefore( $.html( html_link, linkData ), this.root.parentNode );
        });

        // render input form inside shadow DOM
        $.setContent( this.element, $.html( this.html.main ) );

        // add Event Listener
        const button = this.element.querySelector('button');
        button.addEventListener( 'click', e => {
          const item = {
            url: $.protect( this.element.querySelector('input[type=url]').value ),
            title: $.protect( this.element.querySelector('input[type=text]').value ),
            description: $.protect( this.element.querySelector('textarea').value ),
            author: this.user.data().user
          };

          // add new link data to dataset
          dataset.links.push( item );

          // add new list item to parent DOM
          parentNode.insertBefore( $.html( html_link, item ), this.root.parentNode );

          save();
        });
 
        // render login/logout area
        if ( this.user && ! this.user.isLoggedIn() ) $.append( this.element.querySelector( '#top' ), this.user.root );
        
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
