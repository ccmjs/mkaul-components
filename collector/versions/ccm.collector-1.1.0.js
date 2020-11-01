/**
 * @overview ccm component for easily collecting student questions
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.1.0)
 * @changes
 * version 1.1.0 19.04.2020 add optional replacer function in config
 * version 1.0.1 14.04.2020 support initial slide in pdf_viewer: retrieve question on start, get user from context, sort by date
 * version 1.0.0 31.03.2020 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "collector",
    version: [1,1,0],

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
      html: {
        initial: {
          inner: [
            { id: "top" },
            { tag: "button", class: "enter", inner: "Add your own links here:" }
          ]
        },
        main: {  // Use input name in order to specify which input values should persist under which name
          inner: [
            { id: "top" },
            { tag: "h3", inner: "Add your own links here:" },
            { tag: "input", name: "url", type: "url", placeholder: "https://...", required: true, pattern: "[Hh][Tt][Tt][Pp][Ss]?:\\/\\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\\d{2,5})?(?:\\/[^\\s]*)?" },
            { tag: "input", name: "title", type: "text", placeholder: "title", required: true, pattern: ".+" },
            { tag: "textarea", name: "description", rows: 6, placeholder: "description" },
            { tag: "button", class: "add", inner: "add" },
            { tag: "button", class: "close", inner: "close" }
          ]
        },
        link: {  // Use name to refer to the appropriate values: name "title" becomes value "%title%"
          tag: "li",
          inner: [
            { tag: "a", href: "%url%", target: "_blank", rel: "noopener", inner: "%title%" },
            { tag: "span", inner: "%description%", style: "padding-left:0.3rem;" }
          ]
        }
      },

      marker: "marker",

      name: "demo",  // which slide stack
      num: 0, // which slide number

      // data: {
      //   store: [ "ccm.store", "https://ccmjs.github.io/mkaul-components/links/resources/datasets.js" ],
      //   // store: [ "ccm.store", "./resources/datasets.js" ]
      // },

      data: {
        store: [ "ccm.store", { name: "se_ss20_links", url: "https://ccm2.inf.h-brs.de" } ]
      },

      retrieve_on_start: false,
      min_input_length: 2,
      // replacer: function( name, value ){ return replaced value; },

      // onchange: function(){ console.log( this.getValue() ); },

      helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-5.0.0.mjs" ],

      // css: [ "ccm.load",  "./resources/styles.css" ],
      css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/collector/resources/styles.css" ],
      user:   [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.5.0.js", { realm: "hbrsinfpseudo", "logged_in": true } ],

      onfinish: {
        store: true,
        restart: true
        // alert: "Gesichert!"  // not necessary, because new data appear on page immediately
      }

      // logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/mkaul-components/links/resources/configs.js", "log" ] ],
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
        $ = Object.assign( {}, this.ccm.helper || ccm.helper, this.helper );

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

        if ( ! self.user ) self.user = self.ccm.context.find(self,'user');

        // force login here, otherwise database access will fail

        const initButton = $.html( this.html.initial );
        const inputForm = $.html( this.html.main );
        const initButtonListener = async e => {
          stateOpen = true;
          // render input form inside shadow DOM
          $.setContent( this.element, inputForm );
          await render();
        };

        initButton.addEventListener( 'click', initButtonListener );

        await render();

        async function render(){
          // render inside shadow DOM
          if ( ! stateOpen ){
            // render initial Button inside shadow DOM
            $.setContent( self.element, initButton );
          }
        }

        // add Event Listener
        const addButton = inputForm.querySelector('button.add');
        const addButtonListener = e => {
          if ( self.user && self.user.isLoggedIn() ){

            const namedInputs = Array.from( this.element.querySelectorAll('[name]') );
            const totalLength = ( namedInputs.map( input => input.value.length ) ).reduce((prev, curr) => prev + curr, 0);

            if ( totalLength > self.min_input_length ){

              // store input values into dataset
              dataset = namedInputs.reduce( ( rec, input ) => {
                  rec[ input.name ] = $.escapeHTML( input.value );
                  if ( self.replacer ) rec[ input.name ] = self.replacer( input.name, rec[ input.name ] );
                  return rec },
                {
                  location: window.location.href
                }
              );

              // clear input fields
              namedInputs.forEach( input => { input.value = "" });

              if ( self.retrieve_on_start ) stateOpen = false;

              // save and restart app according to params given in this.onfinish, sort by date
              dataset.key = [ self.name, self.num, Date.now(), self.user.data().user ];
              this.onfinish.store.key = dataset.key;
              this.onfinish && $.onFinish( this );  // calls getValue()
            } else {

              // invalid input, mark input fields red
              namedInputs.forEach( input => {
                if ( input.value.length < self.min_input_length ) input.setCustomValidity("add more information");
              });

              // remove red color after a short period
              setTimeout(()=>{
                namedInputs.forEach( input => {
                  input.setCustomValidity("");
                });
              },2000);

            }
          }
        };
        addButton.addEventListener( 'click', addButtonListener );
        const closeButton = inputForm.querySelector('button.close');
        const closeButtonListener = e => {
          stateOpen = false;
          // render input form inside shadow DOM
          $.setContent( this.element, initButton );
        };
        closeButton.addEventListener( 'click', closeButtonListener );

        // render login/logout area if there is no parent ccm component
        self.user && ! self.user.isLoggedIn() && $.append( this.element.querySelector( '#top' ), self.user.root );  // root is empty if parent has login

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        if ( self.retrieve_on_start ) this.setNum( self.num );

      };

      /**
       * current state of this editor
       * @returns {Object} state of editor
       */
      this.getValue = () => Object.assign( {
        _: {
          access: {
            get: 'all',
            set: 'creator',
            del: 'creator'
          }
        }
      }, dataset );

      /**
       * setName - change dataset key and update
       * @param {string} name - part of dataset key
       */
      this.setName = async name => {
        self.name = name;
        await this.update( self.num );
      };

      /**
       * setNum - change dataset key and update
       * @param {string} slide_num - part of dataset key
       */
      this.setNum = async slide_num => {
        self.num = slide_num;
        await this.update( self.num );
      };

      /**
       * setNameAndNum - change dataset key and update
       * @param {string} name - part of dataset key
       * @param {string} slide_num - part of dataset key
       */
      this.setNameAndNum = async ( name, slide_num ) => {
        self.name = name;
        self.num = slide_num;
        await this.update( self.num );
      };

      /**
       * fetch fresh data from database and update GUI
       */
      this.update = async ( slide_num ) => {
        self.num = slide_num;
        // start from fresh: delete old linkList items from last rendering
        const parentNode = self.parent_node || self.root.parentNode.parentNode;
        Array.from( parentNode.querySelectorAll( '.' + self.marker ) ).forEach( item => {
          parentNode.removeChild( item );
        });

        // fetch dataset
        self.data.key = { _id: { $regex: `^${self.name},${self.num},` } }; // [ self.name, self.num, * ]
        dataset = await $.dataset( self.data ); // empty object with key { key: $.generateKey() }

        // add marker to link template
        const html_link = $.clone( self.html.link );
        html_link.class = self.marker;

        // process all data
        dataset.sort( (a,b) => parseInt( a.key[2] ) - parseInt( b.key[2] ) ).forEach( record => {
          // fill HTML template with data from dataset
          // add link to parent node outside the shadow DOM
          parentNode.insertBefore( $.html( html_link, record ), self.root.parentNode );
          // parentNode.appendChild( $.html( html_link, record ) );
        });
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
