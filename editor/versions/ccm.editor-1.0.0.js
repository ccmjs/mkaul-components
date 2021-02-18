/**
 * @overview ccm component for editor
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 12.02.2021 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "editor",
    version: [1,0,0],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: "https://kaul.inf.h-brs.de/ccmjs/ccm/versions/ccm-25.5.3.js",
    // ccm: "https://ccmjs.github.io/ccm/ccm.js",

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      shadow: "none",  // Safari has problems with shadow dom

      global_namespace: "WebAppGlobals",

      editor: {
        url: "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/quill/versions/ccm.quill-1.0.0.js",
        tag: "ccm-quill-1-0-0",
        config: '["ccm.get","https://kaul.inf.h-brs.de/se1/resources/configs.js","quill_config" ]',  // as string
        id: 'ccm-editor-test',
        origin: 'https://kaul.inf.h-brs.de',
      },

      html: {
        main: {
          tag: "iframe",
          id: "editor_iframe",
          srcdoc: '',
          frameborder: 0,
          width: "100%",
          allowfullscreen: true,
          loading: "lazy",
          sandox: "allow-same-origin allow-scripts"
        }
      },

      // data: {
      //   store: [ "ccm.store", "https://ccmjs.github.io/mkaul-components/editor/resources/datasets.js" ],
      //   key: "demo"
      // },

      // data: {
      //   store: [ "ccm.store", { name: "editor", url: "https://ccm2.inf.h-brs.de", dataset: "test" } ],
      //   key: "test"
      // },

      // onchange: function(){ console.log( this.getValue() ); },

      helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-6.0.1.min.mjs" ],

      // css: [ "ccm.load",  "./resources/styles.css" ],
      // css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/editor/resources/styles.css" ],
      // css: [ "ccm.load",  "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/editor/resources/styles.css" ],

      // logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.4.js", [ "ccm.get", "https://ccmjs.github.io/mkaul-components/editor/resources/configs.js", "log" ] ],

      // onfinish: {
      //   store: true,
      //   restart: true,
      //   alert: "Gesichert!"
      // }
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
        $ = Object.assign( {}, this.ccm.helper || ccm.helper, this.helper );

        // listen to datastore changes => restart
        // if ( $.isDatastore( this.data.store ) ) this.data.store.onchange = this.start;

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

        // dataset = await $.dataset( this.data );
        // if ( ! dataset ) dataset = { key: this.data.key };

        // add iframe srcdoc
        this.html.main.srcdoc = `<script src="${self.editor.url}"></script>
            <${self.editor.tag} 
                origin="${self.editor.origin}" 
                editor_id="${self.editor.id}" 
                key='${self.editor.config}'>
            </${self.editor.tag}>`;

        // render main HTML structure
        this.root.innerHTML = '';
        const main = $.html( this.html.main );
        this.root.appendChild( main );
        const iframe = this.root.querySelector('iframe');
        iframe.addEventListener('load', e => {
            // ToDo await ready signal
            // pass global namespace into iframe
            iframe.contentWindow[ self.global_namespace ] = window[ self.global_namespace ];

        });

        /**
         * update dataset from iframe
         */
        window.addEventListener("message", (event) => {
          if ( event.origin !== self.editor.origin ) return;
          // JSON data start with Blank or Opening Bracket
          if ( ! [' ','{'].includes( event.data.charAt(0) ) ) return;
          const json = JSON.parse( event.data );
          const editor_id = json.editor_id;
          if ( editor_id !== self.editor.id ) return;
          dataset = json.inner;
          iframe.style.height = ( 40 + json.scrollHeight ) + 'px';
          self.onchange && self.onchange.call( self );
        }, false);

      };

      /**
       * current state of this editor
       * @returns {Object} state of editor
       */
      this.getValue = () => {
        const value = dataset;
        return $.isObject( dataset ) ? { inner: value } : value;
      };

      this.get = () => {
        return {
          root: {
            set innerHTML( newContents ){
              self.root.querySelector('iframe').contentWindow.postMessage( JSON.stringify({
                editor_id: self.editor.id,
                action: 'contents',
                inner: newContents
              } ), self.editor.origin )
            }
          },
          focus: function(){
            self.root.querySelector('iframe').contentWindow.postMessage( JSON.stringify({
              editor_id: self.editor.id,
              action: 'focus'
            } ), self.editor.origin );
          }
        }
      }

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
