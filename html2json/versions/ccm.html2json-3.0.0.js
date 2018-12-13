/**
 * @overview ccm component for html2json
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version latest (3.0.0)
 * @changes
 * version 1.0.0 11/30/2018
 * version 3.0.0 13.12.2018
 * TODO: docu comments -> API
 * TODO: unit tests
 * TODO: builder component
 * TODO: i18n
 */

( function () {

  "use strict";

  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'html2json',
    version: [3,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.6.5.min.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      data: {
        inner: '<h1>HTML2JSON with <i>ccm</i> components</h1><ccm-clock></ccm-clock><p>from component</p> ',
        position: 6, // cursor position
        dependencies: {
          clock: [
            "ccm.component",
            "https://ccmjs.github.io/mkaul-components/clock/versions/ccm.clock-3.0.1.js",
            {
              width: '10em'
            }
          ]
        }
      },

      // data: {
      //   "store": [ "ccm.store", { local: 'resources/dataset.json' } ],
      //   "key": "demo"
      // },

      onchange: function(){ console.log( this.getValue() ); },

      html: {
        id: 'main',
        inner: [
          { id: 'preview'},
          { id: 'html', inner: '%html%' },
          { id: 'json_root', tag: 'pre', inner: { id: 'json' } }

        ]
      },

      html2json: [ "ccm.load", {
        "url": "https://ccmjs.github.io/mkaul-components/html2json/resources/html2json.mjs",
        "type": "module"
      } ],

      // css: [ 'ccm.load',  './resources/default.css' ],
      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/html2json/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/html2json/resources/configs.js', 'log' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    /**
     * for creating instances of this component
     * @constructor
     */
    Instance: function () {
    
      /**
       * own reference for inner functions
       * @type {Instance}
       */
      const self = this;
      
      /**
       * shortcut to help functions
       * @type {Object.<string,function>}
       */
      let $;

      /**
       * is called once after the initialization and is then deleted
       */
      this.init = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready' );

        // set shortcut to help functions
        $ = this.ccm.helper;

        if ( self.inner && self.inner.innerHTML && self.inner.innerHTML.trim() ) self.data.inner = self.inner.innerHTML;

      };
        
      /**
       * starts the instance
       */
      this.start = async () => {

        /**
         * dataset for rendering
         * @type {Object}
         */
        const dataset = await $.dataset( this.data );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // render main HTML structure
        const main_div = $.html( this.html );

        const html_div = main_div.querySelector( '#html' );
        html_div.innerText = dataset.inner;
        html_div.contentEditable = "true";
        html_div.addEventListener( 'keyup', (e) => {
          dataset.inner = html_div.innerText;
          reparse();
        } );

       const json_div = main_div.querySelector( '#json' );
        json_div.contentEditable = "true";
        json_div.addEventListener( 'keyup', (e) => {
          $.setContent( html_div, $.html( JSON.parse( json_div.innerText ) ).inner );
          dataset.inner = html_div.innerHTML;
          html_div.innerText = dataset.inner;
        } );

        reparse();

        const preview_div = main_div.querySelector( '#preview' );
        preview_div.innerHTML = dataset.inner;
        start_all_Components( preview_div );

        function start_all_Components( node ){
          node.innerHTML = dataset.inner;
          [...node.children].forEach( child => {
            if ( child.tagName.startsWith('CCM-')){
              start_component( child );
            }
          });
        }

        function start_component( child ){
          const name = child.tagName.slice(4).toLowerCase();
          const component = self.data.dependencies[ name ];
          component.start({root: child, parent: self});
        }

        function reparse(){
          const json_data = $.integrate( {
              inner: self.html2json.html2json( dataset.inner ),
              dependencies: Object.keys(self.data.dependencies).reduce((deps,comp)=>{
                const dep = dataset.dependencies[comp];
                deps[comp]=[ "ccm.component", dep.url, $.clone( dep.config ) ]; return deps },
                {})
            },
            self.data );
          json_div.innerText = JSON.stringify( json_data, censor( json_data ), 2 );
        }

        function censor(censor) { // https://stackoverflow.com/questions/4816099/chrome-sendrequest-error-typeerror-converting-circular-structure-to-json
          let i = 0;

          return function(key, value) {
            if ( ['root', 'parent'].includes( key ) ) return undefined;

            if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor === value)
              return '[Circular]';

            if(i >= 140) // seems to be a harded maximum of 30 serialized objects?
              return '[Unknown]';

            ++i; // so we know we aren't using the original object anymore

            return value;
          }
        }

        // render main HTML structure
        $.setContent( this.element, main_div );

      };

      this.getValue = () => {
        return $.clone( dataset );
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();