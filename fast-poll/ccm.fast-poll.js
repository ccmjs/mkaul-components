/**
 * @overview ccm component for fast-poll
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * TODO: docu comments -> API
 * TODO: unit tests
 * TODO: builder component
 */

{

  var component  = {   // const not working in Safari

    /**
     * unique component name
     * @type {string}
     */
    name: 'fast-poll',
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-16.7.0.min.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-16.6.0.min.js', // same as  user.js

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        main: {
          inner: [
            { id: 'title', inner: '%intro%' },
            { id: 'timer' },
            { id: 'choices' }
          ]
        },
        choice: {
          class: 'choice', inner: '%label%'
        }
      },
      // css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccmjs/mkaul-components/fast-poll/resources/default.css' ],
      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/fast-poll/resources/default.css' ],
      language: 'de',
      labels: {
        en: {
          intro: "Decide immediately (without pondering):<br><b>What is really important to you?</b>",
          label: "Finished!"
        },
        de: {
          intro: "Entscheiden Sie sich schnell, ohne lange nachzudenken:<br><b>Was ist Ihnen am wichtigsten:</b>",
          label: "Fertig!"
        }
      },
      choices: {
        en: [
          // http://agilemanifesto.org/iso/en/manifesto.html
          ['Individuals and interactions',  'processes and tools'],
          ['Working software',  'comprehensive documentation'],
          ['Customer collaboration',  'contract negotiation'],
          ['Responding to change',  'following a plan']
        ],
        de: [
          // http://agilemanifesto.org/iso/de/manifesto.html
          ['Individuen und Interaktionen',  'Prozesse und Werkzeuge'],
          ['Funktionierende Software',  'umfassende Dokumentation'],
          ['Zusammenarbeit mit dem Kunden',  'Vertragsverhandlung'],
          ['Reagieren auf Veränderung',  'Befolgen eines Plans']
        ]
      },
      user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-6.0.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/akless-components/log/resources/configs.js', 'greedy' ] ],
      onfinish: function( instance, results ){ console.log( results ); }
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
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.init = callback => {

        //  Is config given via LightDOM (inner HTML of Custom Element)?
        //  Then use it with higher priority
        if ( self.inner && self.inner.innerHTML.trim() ){

          // interprete LightDOM
          self.lightDOM = JSON.parse( self.inner.innerHTML );

          // merge into config
          Object.assign( self, self.lightDOM );

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
        
        callback();
      };  
        
      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {
      
        // has logger instance? => log 'start' event
        if ( self.logger ) self.logger.log( 'start' );
        
        // prepare main HTML structure, language dependent
        const main_elem = $.html( self.html.main, self.labels[ self.language ] );
        
        // select inner containers
        const timer = main_elem.querySelector( '#timer' );
        const choices = main_elem.querySelector( '#choices' );

        // timer
        let counter = 0;
        let intervalID = window.setInterval( () => {
          counter += 1;
          timer.innerHTML = ( counter / 10 ).toFixed(1);
        }, 100);

        // choices
        let results = { texts: [], indices: [], counter: [], timer: [] };
        let number_of_choice = 0;
        render_next_choice( number_of_choice );
        
        // set content of own website area
        $.setContent( self.element, main_elem );

        // rendering completed => perform callback
        callback && callback();


        /** render the next buttons */
        function render_next_choice( number_of_choice ){

          // clear children
          choices.innerHTML = '';

          // render next choices as buttons
          self.choices[ self.language ][number_of_choice].forEach( (label, index) => {

            // use template for rendering
            const child = $.html( self.html.choice, { label: label } );

            child.addEventListener('click', ()=>{

              // record the user choices in results
              results.texts.push(label);
              results.indices.push(index);
              results.counter.push(counter);
              results.timer.push( window.performance.now() );

              // log click event
              if ( self.logger ) self.logger.log( 'click', { label: label, index: index, counter: counter, timer: window.performance.now() } );

              // render next choice of finish
              number_of_choice += 1;
              if ( number_of_choice < self.choices[ self.language ].length ){
                render_next_choice( number_of_choice );
              } else {
                onFinish();
              }
            });

            choices.appendChild( child );
          });
        }

        /** finishes the fast poll */
        function onFinish() {

          // no finish => abort
          if ( !self.onfinish ) return;

          // has user instance? => login user (if not already logged in)
          if ( self.user ) self.user.login( proceed ); else proceed();

          function proceed() {

            window.clearInterval( intervalID );
            choices.innerHTML = '';
            choices.appendChild( $.html( self.html.choice, self.labels[ self.language ] ) );

            // finalize result data
            if ( self.user ) results.user = self.user.data().user;

            // has logger instance? => log 'finish' event
            self.logger && self.logger.log( 'finish', $.clone( results ) );

            // perform 'finish' actions and provide result data
            $.onFinish( self, results );

          }

        }
      };

      /** react to config or attribute changes at runtime */
      this.update = function( key, newValue ){
        // key = attribute name or config key
        switch( key ){
          case "update_json":
            Object.assign( this, JSON.parse( newValue ) );
            break;
          default:
            // e.g. if language is switched, write the new value into config before re-rendering via start()
            this[key] = newValue;
        }
        this.start();
      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}