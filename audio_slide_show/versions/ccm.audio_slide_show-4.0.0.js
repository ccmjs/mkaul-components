/**
 * @overview ccm component for audio_slide_show
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (4.0.0)
 * @changes
 * version 4.0.0 08.04.2020 use pdf_viewer v.6.0.0
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
    version: [4,0,0],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: "https://ccmjs.github.io/ccm/versions/ccm-25.4.0.min.js",
    // ccm: "https://ccmjs.github.io/ccm/ccm.js",

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      pdf: "./resources/ExampleSlides.pdf",
      week_nr: 1,
      lecturer: [ "uid", "account" ],

      html: {
        main: {
          inner: [
            {
              tag: "button",
              title: "switch PDF viewer",
              inner: "PDF"
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
          controls: true,
          onended: "%onended%",
          inner: [
            { tag: "source", src: "%audio%", type: "audio/mpeg"},
            "Your browser does not support the audio element."
          ]
        }
      },

      audio_player: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/audio_player/versions/ccm.audio_player-3.0.0.js" ],

      // extensions: {  // include additional components below slide viewer, e.g. quiz under slide 2:
      //   "2": [ "ccm.component", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.1.0.js", ["ccm.get","https://ccmjs.github.io/akless-components/quiz/resources/resources.js","demo"] ]
      // },

      // pdf_viewer: [ "ccm.component", "./lib/ccm.pdf_viewer-6.0.0.js", {
      pdf_viewer: [ "ccm.component", "https://ccmjs.github.io/tkless-components/pdf_viewer/versions/ccm.pdf_viewer-6.0.0.js", {
        scale: 1,
        routing: [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-2.0.5.js" ],
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.4.0.min.js',
        helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-5.0.0.mjs" ],
        // exceptions: {  // use different components instead of slide view, e.g. quiz instead of slide 2:
        //   "2": [ "ccm.component", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.1.0.js", ["ccm.get","https://ccmjs.github.io/akless-components/quiz/resources/resources.js","demo"] ]
        // },
        html: {
          "main": {
            "id": "pdf-view",
            "inner":[
              {
                "id": "canvas",
                "tag": "canvas"
              },
              {
                "id": "nav",
                "inner": [
                  // {
                  //   "title": "Overview",
                  //   "class": "all fa fa-th-list fa-lg",
                  //   "onclick": () => { debugger; }
                  // },
                  {
                    "title": "Previous Slide",
                    "class": "prev disabled fa fa-chevron-left fa-lg",
                    "onclick": "%prev%"
                  },
                  {
                    "title": "First Slide",
                    "class": "first disabled fa fa-step-backward fa-lg",
                    "onclick": "%first%"
                  },
                  {
                    "tag": "input",
                    "type": "number",
                    "id": "page-num",
                    "onchange": "%go_to%"
                  },
                  {
                    "title": "Last Slide",
                    "class": "last fa fa-step-forward fa-lg",
                    "onclick": "%last%"
                  },
                  {
                    "title": "Next Slide",
                    "class": "next fa fa-chevron-right fa-lg",
                    "onclick": "%next%"
                  },
                  // {
                  //   "title": "Description",
                  //   "class": "descr fa fa-file-text-o fa-lg",
                  //   "onclick": () => { debugger; }
                  // }
                ]
              },
              {
                "id": "optional_content"
              }
            ]
          }
        }
      }],

      collector: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/collector/versions/ccm.collector-1.1.0.js", {
        ccm: "https://ccmjs.github.io/ccm/versions/ccm-25.4.0.min.js",
        helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-5.0.0.mjs" ],
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
        replacer: function( name, value ){ return value.replace( /(https:\/\/[^\s])/ig, '<a href="$1">$1</a>' ); },
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

      helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-5.0.0.mjs" ],

      // css: [ "ccm.load",  "./resources/styles.css" ],
      // css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/audio_slide_show/resources/styles.css" ],
      css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/audio_slide_show/resources/styles.css" ],

      // user:   [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.4.0.js", { realm: "hbrsinfpseudo" } ],

      // routing: [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-2.0.5.js" ],

      // logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.3.js", [ "ccm.get", "https://ccmjs.github.io/mkaul-components/audio_slide_show/resources/configs.js", "log" ] ],

      // global_settings: {
      //               "store": [ "ccm.store", { name: "se-global-settings" } ] // Data Level 2 Store
      //             },

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
       * collection of already opened exceptions
       * @type {Object<Number,HTMLElement>}
       */
      const exceptionCollection = {};

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
       * subcomponents
       * @type {Instance}
       */
      let pdf_viewer, collector, audio_player, recorder;

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

        // self.global_settings.store.onchange = self.changed_global_settings;

      };

      /**
       * starts the instance
       */
      this.start = async () => {

        if ( ! self.user ) self.user = self.ccm.context.find(self,'user');

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

        // Parallel loading of all sub-components.
        // start pdf_viewer, but do wait
        self.pdf_viewer.start({
          // "routing.2.app": self.pdf.slice(self.pdf.lastIndexOf("/")+1,-4),  // use filename for routing without suffix .pdf
          routing: [ "ccm.instance", "https://ccmjs.github.io/akless-components/routing/versions/ccm.routing-2.0.5.js", {
            app: self.pdf.slice(self.pdf.lastIndexOf("/")+1,-4)  // use filename for routing without suffix .pdf
          } ],
          root: pdf_viewer_div,
          pdf: self.pdf,
          slide_nr: slide_num,
          onchange: async ( pdf_viewer, num ) => {

            const canvas = pdf_viewer.element.querySelector('#canvas');
            if ( canvas ){ canvas.style.display = 'inline-block' }

            slide_num = num;
            Object.keys( extensionCollection ).forEach( slide => {
              if ( slide !== '' + num ) extensionCollection[ slide ].style.display = 'none';
            });
            Object.keys( exceptionCollection ).forEach( slide => {
              if ( slide !== '' + num ) exceptionCollection[ slide ].style.display = 'none';
            });

            collector && collector.setNum( num );

            audio_player && audio_player.setFilename( `audio/week${zero(self.week_nr)}/slide${zero(num)}.mp3` );

            recorder && recorder.setFilename( "slide" + zero(num) + ".mp3" );

            if ( self.exceptions ){
              if ( exceptionCollection[ '' + num ] ){
                exceptionCollection[ '' + num ].style.display = 'inline-block';
                pdf_viewer.element.querySelector('#canvas').style.display = 'none';
              } else if ( self.exceptions && self.exceptions['week'+self.week_nr] && self.exceptions['week'+self.week_nr]['slide'+num] ){
                const exceptionChild = document.createElement('div');
                exceptionChild.id = 'exception-child';
                exceptionCollection[ '' + num ] = exceptionChild;
                const canvas = pdf_viewer.element.querySelector('#canvas');
                const { width, height } = canvas.getBoundingClientRect();
                canvas.style.display = 'none';
                const pdf_view = pdf_viewer.element.querySelector('#pdf-view');
                pdf_view.prepend( exceptionChild );
                exceptionChild.style.width = "100%";
                exceptionChild.style["margin-bottom"] = "1rem";
                exceptionChild.style["text-align"] = "center";
                // const clearDiv = document.createElement('div');
                // clearDiv.style.clear = "both";
                // pdf_view.insertBefore( clearDiv, exceptionChild.nextSibling );
                // exceptionChild.style.height = height;
                const exception = await $.solveDependency(self.exceptions['week'+self.week_nr ]['slide'+num],self);
                const exceptionApp = await exception.start( { root: exceptionChild } );
                exceptionApp.element.style.margin = '0 auto';
              }
            }

            if ( self.extensions ){
              if ( extensionCollection[ '' + num ] ){
                extensionCollection[ '' + num ].style.display = 'inline-block';
              } else if ( self.extensions && self.extensions['week' + self.week_nr] && self.extensions['week' + self.week_nr]['slide'+num] ){
                const extensionChild = document.createElement('div');
                extensionCollection[ '' + num ] = extensionChild;
                extensions.appendChild( extensionChild );
                const extension = await $.solveDependency(self.extensions['week' + self.week_nr]['slide'+num],self);
                extension.start( { root: extensionChild } );
              }
            }
          } }).then( value => { pdf_viewer = value }, reason => console.error  );

        // Parallel loading of all sub-components:
        [ collector, audio_player, recorder ] = await Promise.all([

           self.collector.start({ root: collector_div, num: 1, parent_node: collector_div.parentElement, name: self.pdf.slice(self.pdf.lastIndexOf('/')+1,self.pdf.lastIndexOf('.')) }),

          self.audio_player.start({ root: audio_div, src: `audio/week${zero(self.week_nr)}/slide${zero(slide_num)}.mp3` }),

          ( self.user && self.user.isLoggedIn() && isLecturer( self.user.data().key ) ) ?
             self.recorder.start({
              root: recorder_div,
              filename: "slide" + zero( slide_num ) + ".mp3"
          }) : Promise.resolve( null )

        ]);

        audio_player && audio_player.setFinish( () => {
          test_auto_slide_proceed( ( period ) => {
            setTimeout( async () => {
              test_auto_slide_proceed( () => {
                pdf_viewer.element.querySelector('.next').click();
              } )
            }, period * 1000 );
          } );
        });

        async function test_auto_slide_proceed( callback ){
          if ( self.global_settings && self.global_settings.store ) {
            const auto_slide_proceed_container = await self.global_settings.store.get('auto_slide_proceed');
            const period_container = await self.global_settings.store.get('period');
            if (auto_slide_proceed_container && auto_slide_proceed_container.auto_slide_proceed ){
              if ( period_container && period_container.period >= 0 ){
                callback( period_container.period );
              } else {
                callback( 1 )
              }
            }
          }
        }

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
