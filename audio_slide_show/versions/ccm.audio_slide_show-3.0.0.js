/**
 * @overview ccm component for audio_slide_show
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (3.0.0)
 * @changes
 * version 3.0.0 06.04.2020 use ccm audio player instead of HTML5 Audio tag
 * version 2.0.0 01.04.2020 add extensions (quiz below a slide etc)
 * version 1.0.0 31.03.2020 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "audio_slide_show",
    version: [3,0,0],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: "https://ccmjs.github.io/ccm/versions/ccm-25.2.1.min.js",
    // ccm: "https://ccmjs.github.io/ccm/ccm.js",

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      pdf: "../slidesfree/01_Orga.pdf",
      week_nr: 1,
      lecturer: [ "uid", "account" ],

      html: {
        main: {
          inner: [
            {
              tag: "button",
              inner: "switch viewer"
            },
            {
              id: "embed_viewer",
              class: "hidden",
              style: "height: calc( 100% - 10rem ); width: calc( 100% - 0.2rem);", // position: relative; ???
              inner: {
                style: "height: calc( 100% - 10rem ); position: absolute; width: calc( 100% - 0.2rem);", //
                id: "embed_viewer_pdf"
              }
            },
            { id: "pdf_viewer" },
            { id: "audio" },
            {
              tag: "ol",
              inner: [
                { id: "collector" }
              ]
            },
            { id: "extensions" },
            { id: "recorder" }
          ]
        },
        audio: {
          tag: "audio",
          autoplay: true,
          controls: true,
          onended: "%onended%",
          inner: [
            { tag: "source", src: "%audio%", type: "audio/mpeg"},
            "Your browser does not support the audio element."
          ]
        }
      },

      audio_player: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/audio_player/versions/ccm.audio_player-2.0.0.js" ],

      // extensions: {  // include additional components below slide viewer, e.g. quiz under slide 2:
      //   "2": [ "ccm.component", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.1.0.js", ["ccm.get","https://ccmjs.github.io/akless-components/quiz/resources/resources.js","demo"] ]
      // },

      pdf_viewer: [ "ccm.component", "./lib/ccm.pdf_viewer-5.0.1.js", {
        scale: 1,
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.2.1.min.js',
        helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.2.1.mjs" ],
        // exceptions: {  // use different components instead of slide view, e.g. quiz instead of slide 2:
        //   "2": [ "ccm.component", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.1.0.js", ["ccm.get","https://ccmjs.github.io/akless-components/quiz/resources/resources.js","demo"] ]
        // },
        html: {
          "main": {
            "id": "pdf-viewer",
            "class": "container-fluid",
            "inner": [
              {
                "id": "pdf-elem",
                "inner": {
                  "id": "pdf-view",
                  "inner": {
                    "id": "canvas",
                    "tag": "canvas"
                  }
                }
              },
              { id: "exception" }, // area where to render exceptional view
              {
                "id": "nav",
                "inner": [
                  {
                    "class": "input-group",
                    "inner": [
                      {
                        "class": "input-group-btn",
                        "inner": {
                          "class": "btn btn-prev btn-info",
                          "onclick": "%prev%",
                          "inner": "Prev"
                        }
                      },
                      {
                        "id": "page-num",
                        "style": "padding: 0 0 !important",
                        "class": "form-control text-center",
                        "tag": "input",
                        "type": "number",
                        "min": "1",
                        "max": "%all%",
                        "onchange": "%go_to%"
                      },
                      {
                        "class": "input-group-btn",
                        "inner": {
                          "class": "btn btn-next btn-warning",
                          "onclick": "%next%",
                          "inner": "Next"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      }],

      collector: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/collector/versions/ccm.collector-1.0.0.js", {
        ccm: "https://ccmjs.github.io/ccm/versions/ccm-25.2.1.min.js",
        helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.2.1.mjs" ],
        "html.initial.inner.1.inner": "Fragen und Antworten zur Folie:",
        "html.main": {
          inner: [
            { id: "top" },  // html.main.inner.1.inner
            { tag: "h3", inner: "Fügen Sie hier Ihre eigene Frage oder Antwort hinzu:" },
            { tag: "textarea", name: "message", rows: 6, placeholder: "Frage oder Antwort", required: true },
            { tag: "button", class: "add", inner: "add" },
            { tag: "button", class: "close", inner: "close" }
          ]
        },
        "html.link": {
          tag: "li",
          inner: "%message%"
        },
        retrieve_on_start: true,
        data: {
          store: [ "ccm.store", { name: "se_ss20_slides_qa", url: "https://ccm2.inf.h-brs.de" } ]
        },
        onfinish: {
          store: {
            "settings": {
              "url": "https://ccm2.inf.h-brs.de",
              "name": "se_ss20_slides_qa"
            },
            "permissions": {
              "realm": "hbrsinfpseudo",
              "access": {
                "get": "all",
                "set": "creator",
                "del": "creator"
              }
            }
          },
          restart: true,
          alert: "Gesichert!" // not necessary, because new data appear on page immediately
        }
      }],

      pdfobject: [ "ccm.load", "https://cdnjs.cloudflare.com/ajax/libs/pdfobject/2.1.1/pdfobject.min.js" ],

      recorder: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/recorder/versions/ccm.recorder-3.0.0.js", {
        worker: "https://ccmjs.github.io/mkaul-components/recorder/resources/worker.js", // SOP

      } ],

      // onchange: function(){ console.log( this.getValue() ); },

      helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.2.1.mjs" ],

      // css: [ "ccm.load",  "./resources/styles.css" ],
      // css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/audio_slide_show/resources/styles.css" ],
      css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/audio_slide_show/resources/styles.css" ],

      // user:   [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.4.0.js", { realm: "hbrsinfpseudo" } ],

      routing: [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-2.0.5.js" ],

      // logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.3.js", [ "ccm.get", "https://ccmjs.github.io/mkaul-components/audio_slide_show/resources/configs.js", "log" ] ],

      onfinish: {
        store: true,
        restart: true,
        alert: "Gesichert!"
      }
    },

    /**
     * for creating instances of this component
     * @constructor
     */
    Instance: function () {

      /**
       * collection of already opened extensions
       * @type {Object<Number,HTMLElement>}
       */
      const extensionCollection = {};

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
       * switch between both PDF viewers
       * @type {Boolean}
       */
      let stateOfViewer = false;

      /**
       * which slide in deck (first, second, ...)
       * @type {Number}
       */
      let slide_num = 1;

      /**
       * init is called once after all dependencies are solved and is then deleted
       * @type {Function}
       */
      this.init = async () => {

        // set shortcut to helper functions
        $ = Object.assign( {}, this.ccm.helper || ccm.helper, this.helper );

      };

      /**
       * starts the instance
       */
      this.start = async () => {

        if ( ! self.user ) self.user = self.ccm.context.find(self,'user');

        if ( this.routing && this.routing.get() ){
          slide_num = parseInt( this.routing.get().split('-')[2] );
          self.week_nr = parseInt( this.routing.get().split('-')[1] );
        }

        // logging of 'start' event
        this.logger && this.logger.log( 'start',  );

        const isLecturer = uid => self.lecturer.includes( uid );
        const zero = ( nr ) => {
          return (""+(nr||0)).padStart(2,"0");
        };

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main ) );

        const audio_div = self.element.querySelector('#audio');
        const recorder_div = self.element.querySelector('#recorder');
        const collector_div = self.element.querySelector('#collector');
        const extensions = self.element.querySelector('#extensions');
        const pdf_viewer_div = self.element.querySelector('#pdf_viewer');
        const button = self.element.querySelector("button");
        const embed_viewer = self.element.querySelector("#embed_viewer");

        button.addEventListener("click", e => {
          stateOfViewer = ! stateOfViewer;
          pdf_viewer_div.classList.toggle("hidden");
          embed_viewer.classList.toggle("hidden");
        });

        PDFObject.embed( self.pdf, self.element.querySelector("#embed_viewer_pdf") );

        let collector, audio_player, recorder;

        [ collector, audio_player, recorder ] = await Promise.all([

           self.collector.start({ root: collector_div, num: 1, parent_node: collector_div.parentElement, name: self.pdf.slice(self.pdf.lastIndexOf('/')+1,self.pdf.lastIndexOf('.')) }),

          self.audio_player.start({ root: audio_div, src: `audio/week${zero(self.week_nr)}/slide01.mp3` }),

          ( self.user && self.user.isLoggedIn() && isLecturer( self.user.data().key ) ) ?
             self.recorder.start({
              root: recorder_div,
              filename: "slide" + zero( slide_num ) + ".mp3"
          }) : Promise.resolve( null ),

          self.pdf_viewer.start({
            root: pdf_viewer_div,
            pdf: self.pdf,
            slide_nr: slide_num,
            onchange: async ( pdf_viewer, num ) => {
              // update route
              self.routing && self.routing.set( `slide-${self.week_nr}-${num}` );

              slide_num = num;
              audio_div.textContent = '';
              Object.keys( extensionCollection ).forEach( slide => {
                if ( slide !== '' + num ) extensionCollection[ slide ].style.display = 'none';
              });

              collector && collector.setNum( num );

              audio_player && audio_player.setFilename( `audio/week${zero(self.week_nr)}/slide${zero(num)}.mp3` );
              audio_player && audio_player.setFinish(() => {
                if ( ccm.app_global_settings && ccm.app_global_settings.auto_slide_proceed ){
                  setTimeout( () => {
                    pdf_viewer.nextPage()
                  }, window.ccm.app_global_settings.slide_proceed_pause * 1000 );
                }
              });

              recorder && recorder.setFilename( "slide" + zero(num) + ".mp3" );

              if ( extensions ){
                if ( extensionCollection[ '' + num ] ){
                  extensionCollection[ '' + num ].style.display = 'block';
                } else if ( self.extensions && self.extensions[ '' + num ] ){
                  const extensionChild = document.createElement('div');
                  extensionCollection[ '' + num ] = extensionChild;
                  extensions.appendChild( extensionChild );
                  self.extensions[ num ].start( { root: extensionChild } );
                }
              }
            } })

        ]);

      };

      /**
       * current state of this viewer
       * @returns {Object} state of viewer
       */
      this.getValue = () => { return {
        pdf: self.pdf,
          stateOfViewer,
          week_nr: self.week_nr,
          slide_num
        }
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
