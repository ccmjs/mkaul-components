/**
 * @overview new ccm component for submits
 * @author André Kless <andre.kless@web.de> 2017
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  let component = {

    name: 'submit',
  
    ccm: '//akless.github.io/ccm/version/ccm-10.0.0.min.js',
    // ccm: '//akless.github.io/ccm/ccm.js',
    
    config: {

      "data": { "store": [ "ccm.store" ] },

    //  "onfinish": { "log": true }

    },

    Instance: function () {

      // collect all ccm input elements in the array called inputs
      let inputs = [];

      this.ready = ( callback ) => {

        // iterate all input elements
        [...this.inner.querySelectorAll( 'input' )].map( ( input ) => {

          let type = input.getAttribute( 'type' );
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
              
            default: // manage ccm subbcomponents
              
              // check whether there is a dependent subcomponent in this config
              if ( !this[ type ] ) return;
              
              // create a loading symbol
              let loading = this.ccm.helper.loading( this );
              
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

      this.start = ( callback ) => {

        // make lightDOM the shadowDOM
        this.ccm.helper.setContent( this.element, this.inner );

        let submit = this.element.querySelector( '#submit' );
        
        // submit button is disabled until all subcomponents are ready
        submit.disabled = true;
        submit.addEventListener( 'click', () => {

          // fetch values from input elements
          // let record = this.ccm.helper.formData( this.element );
          let record = formData( this.element );
          
          // fetch values from ccm subcomponents
          // getValue ist the standard API for ccm subcomponents
          inputs.map( ( input ) => {
            record[ input.name ] = input.instance.getValue();
          } );

          // submit collected form data to database
          if ( this.onfinish ) this.ccm.helper.onFinish( this, record );

        } );

        // fetch data from database and write values into the input elements of this form
        this.ccm.helper.dataset( this.data, ( dataset ) => {

          // fill all input elements with values from dataset identified by name
          for ( key in dataset ) {
            //
            let input = this.element.querySelector( '[name="'+key+'"]' );
            if ( input ) input.value = dataset[ key ];
          }

          // count all started instances of ccm subbcomponents
          let counter = 1;
          
          // iterate over all ccm subbcomponents
          inputs.map( ( input ) => {
            counter++;
            
            // fork all ccm subbcomponents in parallel
            this[ input.type ].start( { 'data.key': input.name }, ( instance ) => {
              input.instance = instance;
              input.elem.parentNode.replaceChild( instance.root, input.elem );
              check();
            } );
          } );
          check();

          // join all started ccm subbcomponents in parallel
          function check() {

            counter--;
            if ( counter > 0 ) return;
  
            // submit button is enabled when all subcomponents are ready
            submit.disabled = false;

            // callback after join all parallel subcomponents start
            if ( callback ) callback();
          }

        } );
        
        
        // ccm.helper.formData
        function formData( form ) {
    
          let data = {};
          
          [ ...form.querySelectorAll( '*[name]' ) ].map( function ( input ) {

            if ( input.type === 'radio' ) {
              
              if ( input.checked ) data[ input.name ] = input.value;
              
            } else if ( input.type === 'checkbox' ){
              
              if ( ! data[ input.name ] ) data[ input.name ] = [];
              if ( input.checked ) data[ input.name ].push( input.value );
              
            } else if ( input.type.startsWith('select') ){
  
              data[ input.name ] = [ ...input.options ]
                .filter( option => option.selected )
                .map( option => option.value || option.text );
  
            } else if ( input.type === 'number' ) {
              
              let value = parseInt( input.value );
              if ( isNaN( value ) ) value = '';
              data[ input.name ] = value;
              
            }
            
            else if ( !input.value )
              data[ input.name ] = '';
            else
              data[ input.name ] = input.value;
          } );
          return data;
        }

      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );