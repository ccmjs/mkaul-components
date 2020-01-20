/**
 * @overview ccm component for quiz_gen
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 19.01.2020 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "quiz_gen",
    version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: "https://ccmjs.github.io/ccm/versions/ccm-24.2.0.js",
    // ccm: "https://ccmjs.github.io/ccm/ccm.js",

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      html: {
        main: { id: 'quiz' }
      },

      // data: {
      //   store: [ "ccm.store", "https://ccmjs.github.io/mkaul-components/quiz_gen/resources/datasets.js" ],
      //   key: "demo"
      // },

      data: {
        store: [ "ccm.store", { name: "we_ws19_solutions", url: "https://ccm2.inf.h-brs.de" } ],
        key: "le13_a1"
      },

      quiz: [ "ccm.component", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.2.js" ],

      quiz_config: {
        "show_results": false,
        "start_button": true,
        "feedback": true,
        "navigation": true,
        "random": true
      },

      mapping: ( questions ) => ( record ) => {
        questions.push( {
          "text": record.Frage,
          "description": "Select all correct answers:",
          "answers": [
            {
              "text": record.Antwort1,
              "correct": true,
              "comment": record.Begruendung
            },
            {
              "text": record.Antwort2,
              "correct": false,
              "comment": record.Fehler2
            },
            {
              "text": record.Antwort3,
              "correct": false,
              "comment": record.Fehler3
            },
            {
              "text": record.Antwort4,
              "correct": false,
              "comment": record.Fehler4
            }
          ]
        } );
      },
      
      // css: [ "ccm.load",  "./resources/styles.css" ],
      css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/quiz_gen/resources/styles.css" ],
      user:   [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.0.js", { realm: "hbrsinfpseudo" } ]
      // logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/mkaul-components/quiz_gen/resources/configs.js", "log" ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
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
       * dataset is the single source of truth, the Web is the UI
       * The value of dataset starts with a clone of this.data,
       *     but additional values might be added during editing.
       * this.data is never changed, only dataset is changed.
       * @type {Object}
       */
      let dataset;

      const protocol = [];
     
      
      /**
       * init is called once after all dependencies are solved and is then deleted
       * @type {Function}
       */
      this.init = async () => {

        // set shortcut to helper functions
        $ = this.ccm.helper;

      };
      
      /**
       * is called once after the initialization and is then deleted
       * @type {Function}
       */
      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready' );

      };
        
      /**
       * starts the instance
       */
      this.start = async () => {

        // has user instance? => login user (if not already logged in)
        this.user && await this.user.login();

        dataset = await $.dataset( { store: this.data.store, key: { _id: { $regex: `^${this.data.key},` } } } );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main ) );

        const config = Object.assign( {}, $.clone( this.quiz_config ), {
          root: this.element.querySelector('#quiz'),
          questions: [],
          onvalidation: data => protocol.push( data ),
          onfinish: instance => protocol.push( instance.getValue() )
        } );

        dataset.forEach( this.mapping( config.questions ) );

        await this.quiz.start( config );

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

      };
      
      /**
       * current state of this component
       * @returns {Object} state of component
       */
      this.getValue = () => protocol;
      
    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
