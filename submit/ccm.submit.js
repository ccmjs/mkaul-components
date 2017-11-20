/**
 * @overview new ccm component for submits
 * @author André Kless <andre.kless@web.de> 2017
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 * TODO: docu comments -> API
 * TODO: unit tests
 * TODO: builder component
 * TODO: i18n
 */

{ // ES6 IIFE

  const component  = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'submit',

    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://akless.github.io/ccm/version/ccm-11.5.0.min.js',
    ccm: '//akless.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      "data": { "store": [ "ccm.store" ] },
      "content": [ "ccm.component", "//akless.github.io/ccm-components/content/ccm.content.js" ]

      //  "inner": ...
      //  "onfinish": { "log": true }

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
      let self = this;

      /**
       * privatized instance members
       * @type {object}
       */
      let my;

      /**
       * shortcut to help functions
       * @type {Object}
       */
      let $;

      /**
       * collect all ccm input elements in the array called inputs
       * @type {Array}
       */
      const inputs = [];

      /**
       * init is called once after all dependencies are solved and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.init = callback => {

        //  Is content given via LightDOM (inner HTML of Custom Element)?
        //  Then use it with higher priority
        if ( self.inner && self.inner.innerHTML.trim() ){

          // get lightDOM
          self.lightDOM = self.inner.innerHTML;

          // ToDo interpreter for LightDOM
          // self.form = JSON.parse( '[' + self.lightDOM + ']' );
        }
        callback();
      };

      /**
       * is called once after the initialization and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.ready = callback => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        // ToDo privatize all possible instance members
        // my = $.privatize( self );

        if ( ! self.inner ) return callback();

        // iterate all input elements
        [...self.inner.querySelectorAll( 'input' )].map( ( input ) => {
  
          const type = input.getAttribute( 'type' );
          switch ( type ) {
            case 'button':
            case 'checkbox':
            case 'color':
            case 'date':
            case 'datetime-local':
            case 'email':
            case 'file':
            case 'hidden':
            case 'image':
            case 'month':
            case 'number':
            case 'password':
            case 'radio':
            case 'range':
            case 'reset':
            case 'search':
            case 'submit':
            case 'tel':
            case 'text':
            case 'time':
            case 'url':
            case 'week':
              break; // do not touch standard HTML input elements
              
            default: // manage ccm subcomponents
              
              // check whether there is a dependent subcomponent in this config
              if ( !self[ type ] ) return;
              
              // create a loading symbol
              let loading = $.loading( self );
              
              // remember this loading element, the type und the name of this input element
              inputs.push( {
                elem: loading,
                type: type,
                name: input.name
              } );
              
              // replace
              input.parentNode.replaceChild( loading, input );

          }

        } );

        callback();
      };

      this.start =  callback => {

        if ( !self.inner ) { if ( callback ) callback(); return; }

        if ( self.content ) self.content.start( { inner: self.inner }, proceed ); else proceed();

        function proceed( content ) {

          // put LightDOM into ShadowDOM
          $.setContent(self.element, content ? content.root : self.inner);

          const element = content ? content.element : self.element;

          let submit = element.querySelector('#submit');
          const button = $.html({tag: 'input', type: 'submit', id: 'submit'});
          if (!submit) {
            element.appendChild(button);
            submit = button;
          }

          // submit button is disabled until all subcomponents are ready
          submit.disabled = true;
          submit.addEventListener('click', () => {

            // fetch values from input elements
            const record = $.formData(element);

            // fetch values from ccm subcomponents
            // getValue ist the standard API for ccm subcomponents
            inputs.map(input => {
              record[ input.name ] = input.instance.getValue();
            });

            // submit collected form data to database
            if (self.onfinish) $.onFinish(self, record);

          });

          // fetch data from database and write values into the input elements of this form
          $.dataset( self.data, dataset => {

            // fill all input elements with values from dataset identified by name
            for (key in dataset) {
              //
              const input = element.querySelector('[name="' + key + '"]');
              if (input) input.value = dataset[key];
            }

            // count all started instances of ccm subcomponents
            let counter = 1;

            // iterate over all ccm subcomponents
            inputs.map( input => {
              counter++;

              // fork all ccm subcomponents in parallel
              self[ input.type ].start( { 'data.key': dataset.key + '_' + input.name }, instance => {
                input.instance = instance;
                input.elem.parentNode.replaceChild(instance.root, input.elem);
                check();
              });
            });
            check();

            // join all started ccm subcomponents in parallel
            function check() {

              counter--;
              if (counter > 0) return;

              // submit button is enabled when all subcomponents are ready
              submit.disabled = false;

              // callback after join all parallel subcomponents start
              if (callback) callback();
            }

          });

        }

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}