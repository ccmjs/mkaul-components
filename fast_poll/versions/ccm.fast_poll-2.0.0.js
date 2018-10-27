/**
 * @overview ccm component for fast_poll
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version 2.0.0
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
    name: 'fast_poll',

    version: [ 2, 0, 0 ],
    
    /**
     * recommended used framework version
     * @type {string}
     */

    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.0.7.min.js',

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
        },
        results: {
          inner: '%results%'
        }
      },

      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/fast_poll/resources/default.css' ],

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

      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/akless-components/log/resources/configs.js', 'greedy' ] ],

      // chart: [ "ccm.component", "https://ccmjs.github.io/akless-components/highchart/ccm.highchart.js" ],

      onfinish: function( instance, results ){
        const self = instance;

        console.log( results );

        // prepare data for chart rendering
        const categories = [];
        const data = []; // in 100 msec
        const nano = []; // in msec with nano seconds as fractions
        results.counter.forEach( (time, i) =>{
          if (i===0) return;
          data[i-1] = (time - results.counter[i-1]) * 100;
          nano[i-1] = (results.timer[i] - results.timer[i-1]);
          categories[i-1] = results.texts[i];
        });

        const chart_elem = document.createElement('div');

        // render chart
        ccm.start( "https://ccmjs.github.io/akless-components/highchart/ccm.highchart.js", {
          root: chart_elem,
          settings: {
            chart: {
              type: 'column'
            },
            title: {
              text: ''
            },
            xAxis: {
              categories: categories,
              title: {
                text: 'Choice'
              }
            },
            yAxis: {
              min: 0,
              max: results.length,
              title: {
                text: 'Time to choose (msec)'
              },
              allowDecimals: false
            },
            tooltip: {
              enabled: false
            },
            legend: {
              enabled: false
            },
            series: [
              {
                data: nano // or data
              }
            ]
          }
        } );

        self.element.appendChild( chart_elem );
      }
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
        if ( self.logger ) self.logger.log( 'start' );

        // collect results in results object
        let results = { texts: [], indices: [], counter: [], timer: [] };
        
        // prepare main HTML structure, language dependent
        const main_elem = $.html( self.html.main, self.labels[ self.language ] );

        // title
        const title = main_elem.querySelector( '#title' );
        
        // timer
        const timer = main_elem.querySelector( '#timer' );
        let counter = 0;
        timer.innerText = '00:00';
        let intervalID;

        // choices
        const choices = main_elem.querySelector( '#choices' );
        // prepend start button
        self.choices[ self.language ].unshift(['Start!']);
        let number_of_choice = 0;
        render_next_choice( number_of_choice );
        
        // set content of own website area
        $.setContent( self.element, main_elem );


        /** render the next buttons */
        function render_next_choice( number_of_choice ){

          // clear children
          choices.innerText = '';

          if ( number_of_choice === 1 ){
            // timer
            counter = 0;
            intervalID = window.setInterval( () => {
              counter += 1;
              timer.innerText = ( counter / 10 ).toFixed(2).replace('.',':').padStart(5,"000");
            }, 100);
          }

          if ( self.questions && self.questions[ self.language ] && self.questions[ self.language ][ number_of_choice - 1 ] ){
            title.innerText = self.questions[ self.language ][ number_of_choice - 1 ];
          }

          // render next choices as buttons
          self.choices[ self.language ][number_of_choice].forEach( (label, index) => {

            // use template for rendering
            const child = $.html( self.html.choice, { label: label } );

            child.addEventListener( 'click', clickHandler );

            choices.appendChild( child );

            function clickHandler(){

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
                if ( self.questions && self.questions[ self.language ] && self.questions[ self.language ][ number_of_choice - 1 ] ){
                  title.innerText = self.questions[ self.language ][ number_of_choice - 1 ];
                }
                onFinish();
              }
            }
          });
        }

        /** finishes the fast poll */
        function onFinish() {

          window.clearInterval( intervalID );
          choices.innerText = '';
          const newChild = $.html( self.html.choice, self.labels[ self.language ] );
          choices.appendChild( newChild );

          if ( self.finishListener ) newChild.addEventListener('click', self.finishListener );

          // no finish => abort
          if ( !self.onfinish ) return;

          // has logger instance? => log 'finish' event
          self.logger && self.logger.log( 'finish', $.clone( results ) );

          // perform 'finish' actions and provide result data
          $.onFinish( self, results );

        }
      };

      /** react to config or attribute changes at runtime */
      this.update = ( key, newValue ) => {
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