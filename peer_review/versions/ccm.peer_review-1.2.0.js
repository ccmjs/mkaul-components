/**
 * @overview ccm component for peer_review to be used as input in ccm.submit.js
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019, 2020
 * @license The MIT License (MIT)
 * @version latest (1.2.0)
 * @changes
 * version 1.2.0 01.01.2020 add grading
 * version 1.1.0 31.12.2019 add quill editor support
 * version 1.0.0 22.12.2019 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "peer_review",
    version: [1,2,0],
    
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

      // taskgroup: "le02_a1",
      //
      // taskgroup: "le05_a1",
      //     task_formats: {
      //       Einkaufsliste: "html",
      //       script: "js"
      //     },
      //
      // peers: {
      //   store: [ "ccm.store", "./resources/datasets.js" ],
      //   key: "demo"
      // },
      //
      // peer_texts: {
      //   store: [ "ccm.store", { name: "we_ws19_solutions", url: "https://ccm2.inf.h-brs.de" } ],
      //   user: true,
      //   login: true
      // },

      html: {
        main: {
          id: 'top'
        },
        single: {
          inner: [
            { tag: 'h3', inner: 'Peer Solution for %taskgroup% "%task%" (%format% code):' },
            { class: 'container', inner:
                { tag: 'pre', class: 'field peer', inner: { tag: 'code', class:'%format%' }}},
            { tag: 'h3', inner: 'Enter your review for "%task%" (%format% code) here:' },
            { tag: 'textarea', class: 'field review', rows: 5 }
          ]
        },
        grade: { tag: 'fieldset', inner: [
            { tag: 'legend', inner: "Grade %category% (very good) 1...5 (bad):" },
            { tag: 'input', type: 'radio', name: '%category%_%other%', value: "1", onclick: "%onclick%", id: "%category%_1" },
            { tag: 'input', type: 'radio', name: '%category%_%other%', value: "2", onclick: "%onclick%", id: "%category%_2" },
            { tag: 'input', type: 'radio', name: '%category%_%other%', value: "3", onclick: "%onclick%", id: "%category%_3" },
            { tag: 'input', type: 'radio', name: '%category%_%other%', value: "4", onclick: "%onclick%", id: "%category%_4" },
            { tag: 'input', type: 'radio', name: '%category%_%other%', value: "5", onclick: "%onclick%", id: "%category%_5" }
        ]},
        no_review: {
          class: 'nothing',
          inner: "Nothing to review for <b>%task%</b> in %format% code."
        },
        nothing: {
          class: 'nothing',
          inner: "Nothing to review."
        }
      },

      // grading_categories: [ "spelling", "grammar", "content" ],

      // data: {
      //   store: [ "ccm.store", { name: "peer_review", url: "https://ccm2.inf.h-brs.de", dataset: "test" } ],
      //   key: "test"
      // },

      // onchange: function(){ console.log( this.getValue() ); },

      quill: ["ccm.component", "https://ccmjs.github.io/tkless-components/editor/versions/ccm.editor-3.1.0.js", {
        "settings": {
          "modules": {
            "syntax": true,
            "toolbar": [
              [{ "header": [1, 2, 3, 4, 5, 6, false] }],
              [ "bold", "italic", "underline", "strike" ],
              [ { "size": [ "small", false, "large", "huge" ]} ],
              [{ "list": "ordered"}, { "list": "bullet" }],
              [{ "script": "sub"}, { "script": "super" }],
              [{ "indent": "-1"}, { "indent": "+1" }],
              [{ "color": [] }, { "background": [] }],
              [{ "font": [] }],
              [{ "align": [] }],
              ["link", "image"],
              ["blockquote", "code-block"]
            ]
          },
          "placeholder": "Write here...",
          "theme": "snow"
        }
      }],

      css: [ "ccm.load",
        "https://ccmjs.github.io/mkaul-components/peer_review/resources/styles.css",
        "https://ccmjs.github.io/mkaul-components/highlight/resources/monokai-sublime.min.css"
      ],
      // css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/peer_review/resources/styles.css" ],

      hljs:  [ 'ccm.load',
        '//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.17.1/build/highlight.min.js'
      ],

      user:   [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.0.js", { realm: "hbrsinfpseudo" } ]

      // lang: [ "ccm.instance", "https://ccmjs.github.io/tkless-components/lang/versions/ccm.lang-1.0.0.js" ],
      // logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/mkaul-components/peer_review/resources/configs.js", "log" ] ],
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

      /**
       * self.html.grade enriched with labels
       * @type {Object}
       */
      let grade;
     
      
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

        // add labels to radio buttons
        if ( self.html.grade ){
          grade = $.clone( self.html.grade );
          const radiosWithLabels = [];
          grade.inner.forEach( elem => {
            radiosWithLabels.push( elem );
            if ( elem.tag === 'input' ){
              radiosWithLabels.push({ tag: 'label', for: '%category%_' + elem.value, inner: elem.value });
            }
          });
          grade.inner = radiosWithLabels;
        }

        if ( hljs ) hljs.initHighlightingOnLoad();

      };
        
      /**
       * starts the instance
       */
      this.start = async () => {

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main ) );

        // has user instance?
        if ( this.user ){

          // render login/logout area
          // if ( this.user ){ $.append( this.element.querySelector( '#top' ), this.user.root ); }

          // login user (if not already logged in)
          await this.user.login();

          if ( this.data ){
            dataset = await $.dataset( this.data );
          }

          if ( dataset && ! dataset.peers ) {
            dataset.peers = ( await $.dataset( this.peers ) ).peers[ this.user.data().user ];
          }

          if ( dataset && dataset.peers ){

            if ( ! dataset.reviews ) {
              dataset.reviews = {};
            }

            const regex = '^' + this.taskgroup + ',(' + dataset.peers.join('|') + ')$';
            const peer_texts = await this.peer_texts.store.get({ _id: { $regex: regex }});
            // const peer_texts = await $.dataset( this.peer_texts.store, { _id: { $regex: regex } } );

            // given default values? => integrate them as defaults into initial values
            // if ( this.ignore ) dataset = $.integrate( this.ignore.defaults, dataset, true );

            // logging of 'start' event
            this.logger && this.logger.log( 'start', $.clone( dataset ) );

            if ( peer_texts ){
              peer_texts.forEach( peerObject => {
                const other = peerObject.key[1];

                Object.entries( this.task_formats ).forEach( ( [ task, format ] ) => {
                  const single = $.html( this.html.single, { task, format, taskgroup: this.taskgroup } );
                  const peerText = peerObject[ task ];

                  if ( peerText ){
                    switch ( format ) {
                      case 'nothing':
                        $.append( this.element, $.html( this.html.no_review, { task, format } ) );
                        break;
                      case 'quill':
                        this.quill.start({
                          root: single.querySelector('.container'),
                          data: peerText
                        });
                        $.append( this.element, single );
                        break;
                      default: // use highlight.js
                        // fill peer code into single
                        single.querySelector('.peer code').textContent = peerText;
                        $.append( this.element, single );
                    }

                    // manage review texts
                    const review = single.querySelector('.review');

                    // init: copy old state of review into textarea
                    if ( dataset.reviews[ other ] && dataset.reviews[ other ][ task ] ) review.value = dataset.reviews[ other ][ task ];

                    // update: copy new version of review into dataset
                    review.addEventListener('input', e => {
                      if ( ! dataset.reviews[ other ] ) dataset.reviews[ other ] = {};
                      dataset.reviews[ other ][ task ] = review.value;
                    });

                    if ( self.grading_categories ){
                      self.grading_categories.forEach( category => {

                        const myGrade = $.clone( grade );

                        // init: copy old state of grading into radio buttons
                        if ( dataset.reviews[ other ] && dataset.reviews[ other ][ category ] ){
                          const radio = myGrade.inner[ 2 * parseInt( dataset.reviews[ other ][ category ] ) - 1 ];
                          if ( ! radio.type === 'radio' ) console.log( radio );
                          radio.checked = true;
                        }

                        const onclick = function( event ){
                          // update: copy new value of grading into dataset
                          if ( ! dataset.reviews[ other ] ) dataset.reviews[ other ] = {};
                          dataset.reviews[ other ][ category ] = this.value;
                        };

                        const radio_buttons = $.html( myGrade, { category, onclick, other } );

                        // if ( dataset.reviews[ other ] && dataset.reviews[ other ][ category ] ){
                        //   radio_buttons.querySelector( '#' + category + '_' + dataset.reviews[ other ][ category ] ).checked = true;
                        // }

                        $.append( single, radio_buttons );
                      });
                    }

                  } else {
                    $.append( this.element, $.html( this.html.no_review, { task, format } ) );
                  }
                });
              });

            } else {
              $.append( this.element, $.html( this.html.nothing ) );
            }
          } else {
            $.append( this.element, $.html( this.html.nothing ) );
          }
        } else {
          $.append( this.element, $.html( this.html.nothing ) );
        }

        // add highlighting to peer code
        this.element.querySelectorAll('pre code').forEach(( block ) => {
          hljs.highlightBlock( block );
          insertLineNumbers( block );
        });

        function insertLineNumbers( block ){
          const numberLength = block.textContent.split('\n').length.toString().length;
          const prefix = 'line';
          let line = 1;
          const result = block.innerHTML.replace(/\n/g,
            function() {
              line++;
              return "\n" + '<a class="line" name="' + prefix + line + '">'
                + line.toString().padStart(numberLength,'0')
                + '</a>';
            });
          block.innerHTML = '<a class="line" name="' + prefix + '0">'
            + '1'.padStart(numberLength,'0') +'</a>'
            + result;
        }

      };
      
      /**
       * current state of this component
       * @returns {Object} state of component
       */
      this.getValue = () => dataset;
      
    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
