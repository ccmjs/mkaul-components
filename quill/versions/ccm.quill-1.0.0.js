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
    ccm: "https://kaul.inf.h-brs.de/ccmjs/ccm/versions/ccm-25.5.3.min.js",
    // ccm: "https://ccmjs.github.io/ccm/ccm.js",

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

      helper: [ "ccm.load", "https://kaul.inf.h-brs.de/ccmjs/akless-components/modules/versions/helper-6.0.1.min.mjs" ],

      css: [ "ccm.load",  "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/quill/resources/styles.css" ],

      user: [ "ccm.instance", "/ccmjs/mkaul-components/login/versions/ccm.login-1.0.0.js" ],

      "data": {
        "login": true,
        "user": true,
        "store": [ "ccm.store", {
          "url": "https://ccm2.inf.h-brs.de",
          "name": "se_ss20_solutions",
          "method": "POST"
        } ]
      },

      //data: {
      //  store: [ "ccm.store", { "name": "editor_data" } ],
      //  key: "demo"
      //},
      //onchange: function () { console.log( this.getValue() ) },



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
       * data from editor stored into database
       * @type {Object}
       */
      let data;

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

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        /**
         * inject dataset into iframe
         */
        if ( self.data ){
          dataset = await $.dataset( self.data );
          quill.root.innerHTML = ( $.isObject( dataset ) ? dataset.inner : dataset ) || '';
        }

        // paste initial value of database into quill
        window.addEventListener("message", (event) => {
          if ( event.origin !== self.origin ) return;
          const json = JSON.parse( event.data );
          if ( json.editor_id !== self.editor_id ) return;
          data = json.inner;
          quill.root.innerHTML = json.inner || '';
          inputListener();  // adjust scrollHeight
        }, false);

        const editor = self.root.querySelector( '.ql-editor' );

        // editor.addEventListener( 'input', inputListener );
        editor.addEventListener( 'paste', inputListener );
        editor.addEventListener( 'keydown', inputListener );
        editor.addEventListener( 'blur', inputListener );

        function inputListener( event ){
          window.parent.postMessage( JSON.stringify({
            editor_id: self.editor_id,
            inner: self.getValue(),
            scrollHeight: self.root.scrollHeight
          } ), self.origin );
        }

        if ( self.onchange )
          self.root.querySelector( '.ql-editor' ).addEventListener( 'blur', async function () {
            self.onchange.call( self );
          } );

        if ( self.focus ) self.root.querySelector( '.ql-editor' ).focus();
      };

      this.get = () => quill;

      /**
       * current state of this editor
       * @returns {Object} state of editor
       */
      this.getValue = () => {
        const value = quill.root.innerHTML;
        return $.isObject( data ) ? { inner: value } : value;
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

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
