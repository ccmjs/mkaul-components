/**
 * @overview ccm component for html2json
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version latest
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
    // version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.6.7.min.js',
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      data: {
        inner: '<h1>HTML2JSON with <i>ccm</i> components</h1><ccm-clock></ccm-clock><p>from component</p> ',
        position: 6, // cursor position
        components: {
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

      // onchange: function(){ console.log( this.getValue() ); },

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

      css: [ 'ccm.load',  '../html2json/resources/default.css' ],
      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/html2json/resources/default.css' ],
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
       * dataset for rendering
       * The value of dataset starts with a clone of this.data,
       *     but additional values might be added during component lifetime.
       * this.data is never changed, only dataset is changed.
       * @type {Object}
       */
      let dataset;

      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // get data from config or remote database
        dataset = await $.dataset( this.data );

        if ( typeof dataset === 'string' ) dataset = { inner: dataset };

        // Use LightDOM with higher priority than data from config
        if ( this.inner ){

          // Light DOM is given as ccm JSON data? => convert to HTML DOM Elements
          if ( $.isObject( this.inner ) && !$.isElementNode( this.inner ) )
            this.inner = $.html( this.inner );

          // dynamic replacement of placeholders
          if ( this.placeholder ) [ ...this.inner.children ].forEach( child => child.innerHTML = $.format( child.innerHTML, this.placeholder ) );

          dataset.inner = this.inner;
        }

        // initialize dataset.components if necessary
        if ( ! dataset.components ) dataset.components = {};

      };
        
      /**
       * starts the instance
       */
      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // render main HTML structure
        const main_div = $.html( this.html );

        const html_div = main_div.querySelector( '#html' );
        html_div.innerText = typeof dataset.inner === 'string' ? dataset.inner : dataset.inner.innerHTML;
        html_div.contentEditable = "true";
        html_div.addEventListener( 'keyup', async (e) => {
          dataset.inner = html_div.innerText;
          self.onchange && self.onchange();
          preview_div.innerHTML = typeof dataset.inner === 'string' ? dataset.inner : dataset.inner.innerHTML;
          start_all_Components( preview_div );
          reparse();
        } );

       const json_div = main_div.querySelector( '#json' );
        json_div.contentEditable = "true";
        json_div.addEventListener( 'keyup', async (e) => {
          const json_inner = ( JSON.parse( json_div.innerText ) ).inner;
          const div = $.html( json_inner );
          const html_code = div.innerHTML;
          dataset.inner = html_code;
          self.onchange && self.onchange();
          html_div.innerText = html_code;
          $.setContent( preview_div, div );
          start_all_Components( preview_div );
        } );

        reparse();

        const preview_div = main_div.querySelector( '#preview' );
        preview_div.innerHTML = typeof dataset.inner === 'string' ? dataset.inner : dataset.inner.innerHTML;
        start_all_Components( preview_div );

        async function start_all_Components( node ){
          $.asyncForEach([...node.children], child => {
            start_component( child );
          });
        }

        async function start_component( child ){
          if ( child.tagName.startsWith('CCM-')){
            const name = child.tagName.slice(4).toLowerCase();
            const component = await getComponent( name );
            component.start($.integrate({root: child, parent: self},
              [...child.getAttributeNames()].reduce((all_attributes,attr)=>{
                all_attributes[attr] = child.getAttribute(attr);
                return all_attributes;
            }, {})));
          } else {
            start_all_Components( child );
          }
        }

        /**
         * get the component with the given name from configs or from DMS
         * @param componentName
         * @returns {Component}
         */
        async function getComponent( componentName ){
          if ( self.component.name === componentName ) return self.component;
          if ( self[ componentName ] ) return self[ componentName ];
          const find_parent = self.ccm.context.find( self, componentName, false );
          let component = dataset.components && dataset.components[ componentName ]
            || find_parent && find_parent[ componentName ];

          if ( Array.isArray( component ) ) component = await $.solveDependency( component );
          return component;
        }

        function reparse(){
          const json_data = $.integrate( {
              inner: self.html2json.html2json( typeof dataset.inner === 'string' ? dataset.inner : dataset.inner.innerHTML ),
              components: Object.keys(self.data.components).reduce((deps,comp)=>{
                  const dep = dataset.components[comp];
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