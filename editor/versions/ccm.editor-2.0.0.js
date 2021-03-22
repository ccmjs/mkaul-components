/**
 * @overview ccm component for editor
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 2.0.0 use HTML5 instead of CCM for inner quill web component
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
    version: [2,0,0],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: "https://kaul.inf.h-brs.de/ccmjs/ccm/versions/ccm-26.2.0.min.js",
    // ccm: "https://ccmjs.github.io/ccm/ccm.js",

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      shadow: "none",  // Safari has problems with shadow dom

      debug: true,

      global_namespace: "WebAppGlobals",

      editor: {
        url: "/ccmjs/mkaul-components/quill/versions/ccm.quill-1.0.0.js",
        tag: "ccm-quill-1-0-0",
        config: '["ccm.get","./resources/configs.js","quill_config" ]',  // as string
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
          sandbox: "allow-same-origin allow-scripts"
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

      helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.0.0.min.mjs" ],

      // css: [ "ccm.load",  "./resources/styles.css" ],
      // css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/editor/resources/styles.css" ],
      // css: [ "ccm.load",  "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/editor/resources/styles.css" ],

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
       * reference to inner iframe
       * @type {HTMLIFrameElement}
       */
      let iframe;

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

      };


      /**
       * starts the instance
       */
      this.start = async () => {

        // make editor id unique by adding id
        self.editor.id += '_' + this.index;

        dataset = self.data ? await $.dataset( self.data ) : '';
        if ( dataset.inner ) dataset = dataset.inner;
        if ( typeof dataset === 'string' && dataset.length ){
          dataset = dataset.replaceAll('"',"'");
          dataset = dataset.replaceAll('&lt;',"&amp;lt;");
        } else {
          dataset = '';
        }

        // add iframe srcdoc
        this.html.main.srcdoc = `<script src="${self.editor.url}"></script>
            <${self.editor.tag} 
                origin="${self.editor.origin}" 
                editor_id="${self.editor.id}"
                global_namespace="${self.global_namespace}"
                data="${dataset}" 
                debug="${self.debug}"
                focus="${self.focus}"
                key='${self.editor.config}'>
            </${self.editor.tag}>`;

        // render main HTML structure
        this.root.innerHTML = '';
        iframe = $.html( this.html.main );
        this.root.appendChild( iframe );

        const sharedSpace = async ( count ) => {
          return new Promise( resolve => {
            if ( window[ self.global_namespace ] && window[ self.global_namespace ][ self.editor.id ] ){
              resolve( window[ self.global_namespace ][ self.editor.id ] );
            } else {  // not ready yet
              if ( count > 0 ){
                setTimeout( async _=> {
                  resolve( sharedSpace( --count ) );
                }, 100 );
              }
            }
          } );
        };

        // preliminary access to be overwritten by the load event, see below
        this.get = () => {
          return {
            focus: () => {
              iframe.focus();
            },
            set innerHTML( newContents ){
              debugger;  // ToDo
            }
          }
        };

        this.getValue = () => {
          return dataset; // preliminary access to be overwritten by the load event, see below
        };

        // after load event process data
        iframe.addEventListener('load', async _=>{
          iframe.contentWindow[ self.global_namespace ] = window[ self.global_namespace ];  // ToDo delete if unused

          this.get = () => window[ self.global_namespace ][ self.editor.id ].quill;

          /**
           * current state of this editor
           * @returns {Object} state of editor
           */
          this.getValue = () => {
            return this.get().root.innerHTML;
          };

          iframe.contentWindow.addEventListener('scroll-event', e => {
            // iframeSharedObjects.ccm.root.scrollHeight
            if ( e.detail.editor_id === self.editor.id ){
              iframe.style.height = ( 45 + e.detail.scrollHeight ) + 'px';
            }
          });
          iframe.style.height = ( 45 + ( await sharedSpace( 3 ) ).scrollHeight() ) + 'px';
        });

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
