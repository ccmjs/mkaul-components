/**
 * @overview ccm component for quill inside an iframe so that even Safari can work correctly
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @link https://github.com/quilljs/awesome-quill
 * @changes
 * version 1.0.0 10.02.2021 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "quill",
    version: [1,0,0],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: "https://kaul.inf.h-brs.de/ccmjs/ccm/versions/ccm-26.3.1.min.js",
    // ccm: "https://kaul.inf.h-brs.de/ccmjs/ccm/ccm.js",

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      shadow: 'none',  // Safari has problems with shadow dom
      origin: 'https://kaul.inf.h-brs.de',
      editor_id: 'ccm-editor-test',

      "settings": {
        "modules": {
          // "syntax": true,    // needed for syntax highlighting
          "toolbar": [
            { 'header': [1, 2, 3, 4, false] },
            "bold", "italic", "underline", "strike",
            { "list": "ordered"}, { "list": "bullet" },
            { "indent": "-1"}, { "indent": "+1" },
            { align: '' }, { align: 'center' },
            "link", "image",
            'code-block'
          ]
        },
        "placeholder": "enter text here",
        "theme": "snow"
      },

      helper: [ "ccm.load", "https://kaul.inf.h-brs.de/ccmjs/akless-components/modules/versions/helper-7.2.0.min.mjs" ],

      css: [ "ccm.load",  "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/quill/resources/styles.css" ]

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
       * access to Quill editor
       * @type {Object}
       */
      let quill;

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

        await this.ccm.load(
          "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/quill/resources/quill.min.js",
          "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/quill/resources/quill.snow.css"
        );

      };


      /**
       * starts the instance
       */
      this.start = async () => {

        const div = document.createElement('div');
        this.root.innerHTML = '';
        this.root.appendChild( div );
        div.id = 'editor';
        quill = new Quill( div, self.settings );

        if ( window.parent[ self.global_namespace ] ) window.parent[ self.global_namespace ][ self.editor_id ] = {
          scrollHeight: _=> this.root.scrollHeight,
          quill
        };

        quill.root.innerHTML = ( typeof self.data === 'string' ) ? self.data : '';

        const editor = self.root.querySelector( '.ql-editor' );

        // editor.addEventListener( 'input', inputListener );
        editor.addEventListener( 'paste', inputListener );
        editor.addEventListener( 'keydown', inputListener );
        editor.addEventListener( 'blur', inputListener );

        // self.scrollEventTarget = new EventTarget();  // ToDo Use instead of Globals

        function inputListener( event ){
          window.dispatchEvent( new CustomEvent( 'scroll-event', { detail: {
              scrollHeight: self.root.scrollHeight,
              editor_id: self.editor_id
            } } ) );
        }

        if ( self.onchange )
          self.root.querySelector( '.ql-editor' ).addEventListener( 'blur', async function ( e ) {
            inputListener( e );
            self.onchange.call( self );
          } );

        if ( self.focus ) self.root.querySelector( '.ql-editor' ).focus();

        window.addEventListener( "message",e => {
          if ( e.data === 'set-focus' ){
            self.root.querySelector( '.ql-editor' ).focus();
          }
        });

      };

      this.get = () => quill;

      /**
       * current state of this editor
       * @returns {Object} state of editor
       */
      this.getValue = () => {
        return quill.root.innerHTML;
      };

      /**
       * current state of this editor as Quill Deltas
       * @returns {Object} state of editor
       */
      this.getDeltas = () => {
        return quill.getContents(); // quill.clipboard;
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
