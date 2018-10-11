/**
 * @overview ccm component for wikipedia_search
 * @using https://github.com/Reactive-Extensions/RxJS
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * TODO: docu comments -> API
 * TODO: unit tests
 * TODO: builder component
 * TODO: i18n
 */

{

  var component  = {   // const not working in Safari

    /**
     * unique component name
     * @type {string}
     */
    name: 'wikipedia_search',
    version: [2,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.0.2.min.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        main: {
          inner: [
            { tag: 'input', id: 'input', placeholder: 'type search term here' },
            { id: 'results' }
          ]
        }
      },
      rxjs: [ 'ccm.load', 'https://ccmjs.github.io/mkaul-components/wikipedia_search/resources/rx.lite.js'],
      jquery: [ 'ccm.load', 'https://ccmjs.github.io/mkaul-components/wikipedia_search/resources/jquery.js'],
      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/wikipedia_search/resources/default.css' ]


      // onfinish: function( instance, results ){ console.log( results ); }
    },

    /**
     * for creating instances of this component
     * @constructor
     */
    Instance: function () {

      "use strict";

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
       * init is called once after all dependencies are solved and is then deleted
       */
      this.init = async () => {

        //  Is config given via LightDOM (inner HTML of Custom Element)?
        //  Then use it with higher priority
        if ( self.inner && self.inner.innerHTML.trim() ){

          // interprete LightDOM
          self.lightDOM = JSON.parse( self.inner.innerHTML );

          // merge into config
          Object.assign( self, self.lightDOM );

        }

      };

      /**
       * is called once after the initialization and is then deleted
       */
      this.ready = async () => {

        // set shortcut to help functions
        $ = self.ccm.helper;

      };

      /**
       * starts the instance
       */
      this.start = async () => {

        // has logger instance? => log 'start' event
        if (self.logger) self.logger.log('start');

        // prepare main HTML structure
        const main_elem = $.html(self.html.main);

        // select inner containers
        const input = main_elem.querySelector('#input');
        const results = jQuery(main_elem.querySelector('#results'));

        /* Only get the value from each key up */
        const keyups = Rx.Observable.fromEvent(input, 'keyup')
          .pluck('target', 'value')
          .filter(text => text.length > 2);

        /* Now debounce the input for 500ms */
        const debounced = keyups
          .debounce(500 /* ms */);

        /* Now get only distinct values, so we eliminate the arrows and other control characters */
        const distinct = debounced
          .distinctUntilChanged();

        /* Now, let's query Wikipedia! In RxJS, we can instantly bind to any Promises A+ implementation through the Rx.Observable.fromPromise method. Or, directly return it and RxJS will wrap it for you. */
        const searchWikipedia = (term) => {
          return jQuery.ajax({
            url: 'https://en.wikipedia.org/w/api.php',
            dataType: 'jsonp',
            data: {
              action: 'opensearch',
              format: 'json',
              search: term
            }
          }).promise();
        };

        /* Once that is created, we can tie together the distinct throttled input and query the service. In this case, we'll call flatMapLatest to get the value and ensure we're not introducing any out of order sequence calls. */
        const suggestions = distinct
          .flatMapLatest(searchWikipedia);

        // Finally, we call the subscribe method on our observable sequence to start pulling data.
        suggestions.subscribe(
          data => {
            results
              .empty()
              .append( data[1].map( value => `<li><a href="https://en.wikipedia.org/wiki/${value}" target="_blank" rel="noopener">${value}</a></li>`) );
          },
          error => {
            results
              .empty()
              .append(jQuery('<li>'))
              .text(`Error: ${error}`);
          });
        
        // set content of own website area
        $.setContent( self.element, main_elem );
        
      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}