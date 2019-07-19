/**
 * @overview ccm component for atom_adapter
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 19.07.2019 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( function () {

  "use strict";

  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'atom_adapter',
    // version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-22.2.0.js',
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      atom: {
        "title": "Python Typisierung",
        "type": "exercise",
        "core": {
          "task-description": [{
            "id": "ce2017-07-12T09-00-11-G__36",
            "value": "Welche der beiden Aussagen ist korrekt?",
            "type": "text"
          }],
          "answers": [{
            "id": "ao2017-07-12T09-00-22-G__38",
            "text": "Python ist statisch typisiert",
            "correct": false,
            "points": 0,
            "selected-points": 0,
            "unselected-points": 0
          }, {
            "id": "ao2017-07-12T09-00-24-G__39",
            "text": "Python ist dynamisch typisiert",
            "correct": true,
            "points": 5,
            "selected-points": 1,
            "unselected-points": 0
          }],
          "shuffled": false,
          "voting": false,
          "text": "",
          "type": "single-choice"
        },
        "id": "ex2017-07-12T08-59-27-G__33",
        "metadata": {
          "created-at": "2018-04-19T09:26:04.275Z",
          "tags": []
        }
      },

      quiz: ['ccm.component', 'https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.0.js'],
      
      css: [ 'ccm.load',  './resources/default.css' ],
      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/atom_adapter/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/atom_adapter/resources/configs.js', 'log' ] ],
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

        const config = {
          root: this.element,
          questions: [
            {
              text: this.atom.core["task-description"][0].value,
              answers: this.atom.core.answers
            }
          ]
        };

        await this.quiz.start( config );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();