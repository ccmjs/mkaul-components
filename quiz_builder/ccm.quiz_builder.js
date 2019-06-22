/**
 * @overview ccm component for quiz_builder
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 21.06.2019 initial build
 * TODO: unit tests
 */

( function () {

  "use strict";

  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'quiz_builder',
    // version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.3.0.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      // Questions and answers have been collected in a previous form.
      // The following data store collects all results:
      data: {
        "store": [ "ccm.store", { "name": "se_ss19_solutions", "url": "https://ccm2.inf.h-brs.de" } ],
        "key": { "_id": { "$regex": "^le09_a3," } }
      },

      // Mapping of names in the form, in which questions and answers have been collected, to the names in this component
      mapping: {
        question: 'Frage',
        answer1: 'Antwort1',
        answers: [
          { text: 'Antwort2', comment: 'Fehler2' },
          { text: 'Antwort3', comment: 'Fehler3' }
        ]
      },

      description: "Wählen Sie die korrekte Antwort aus: ",
      min_length: 10,
      selection_type: "radio",
      log_small: true,

      quiz: [ "ccm.component", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.0.js", {
          shuffle: true,
          random: true,
          skippable: true,
          show_results: false,
          start_button: true,
          feedback: true,
          navigation: true,
          onfinish: { "restart": false, "store": true },
          css: [ "ccm.load", "https://ccmjs.github.io/akless-components/quiz/resources/weblysleek.css", { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/weblysleekui/font.css" } ],
          data: {
            "store": [ "ccm.store", { "name": "se_ss19_solutions", "url": "https://ccm2.inf.h-brs.de" } ],
            "key": "le11_a1"
          },
          logger: [ "ccm.instance", "https://mnutze.github.io/bsc.log/ccm.log.js",
            ["ccm.get", "https://mnutze.github.io/bsc.log/resources/configs.js", "monitoring.quiz" ] ],
          placeholder: {
            "start": "Quiz starten",
            "question": "Frage",
            "correct": "Korrekte Lösung: ",
            "prev": "Zurück",
            "submit": "Auflösung",
            "next": "Nächste Frage",
            "finish": "Beenden"
          },
          "html.question.inner.0.inner.0.inner": "Frage"
        } ],

      user: [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.0.1.js", {
        "realm": "hbrsinfpseudo", "logged_in": true } ],

      // onchange: function(){ console.log( this.getValue() ); },
      
      // css: [ 'ccm.load',  'resources/default.css' ],
      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/quiz_builder/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/quiz_builder/resources/configs.js', 'log' ] ],
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
       * dataset is the single source of truth, the Web is the UI
       * The value of dataset starts with a clone of this.data,
       *     but additional values might be added during editing.
       * this.data is never changed, only dataset is changed.
       * @type {Object}
       */
      let dataset;
     
      
      /**
       * init is called once after all dependencies are solved and is then deleted
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;
      };

        
      /**
       * starts the instance
       */
      this.start = async () => {
      
        dataset = await $.dataset( this.data );
        if ( ! dataset ) dataset = { key: this.data.key };

        // given default values? => integrate them as defaults into initial values
        if ( this.ignore ) dataset = $.integrate( this.ignore.defaults, dataset, true );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        const questions = [];
        if ( ! Array.isArray( dataset ) && dataset.questions ) dataset = dataset.questions;
        dataset.forEach( record => {
          if ( record[self.mapping.question] && record[self.mapping.question].length > self.min_length ){
            const question = {
              text: norm( record[self.mapping.question] ),
              description: self.description,
              answers: [
                { text: norm( record[self.mapping.answer1] ), correct: true }
              ],
              input: self.selection_type
            };
            self.mapping.answers.forEach( answer => {
              if ( record[answer.text] ) question.answers.push( { text: norm( record[answer.text]  ), comment: norm( record[answer.comment]  ) } );
            });
            questions.push( question );
          } else {
              if ( self.log_small ) console.log( 'empty or too small: ', record );
          }
        } );

        this.quiz.start( {
          root: this.element,
          questions: questions,
          user: this.user
        } );

        function norm( string ){
          return string.replace( /([^\\])"/g, '$1\\"' );
        }

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();