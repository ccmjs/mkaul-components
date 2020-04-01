/**
 * @overview ccm component for audio_slide_show
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
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
    version: [1,0,0],

    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: "https://ccmjs.github.io/ccm/versions/ccm-25.2.1.min.js",
    ccm: "https://ccmjs.github.io/ccm/ccm.js",

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      pdf: "https://kaul.inf.h-brs.de/se/slidesfree/01_Orga.pdf",
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
            { id: "recorder" }
          ]
        },
        audio: {
          tag: "audio",
          autoplay: true,
          controls: true,
          inner: [
            { tag: "source", src: "%audio%", type: "audio/mpeg"},
            "Your browser does not support the audio element."
          ]
        }
      },

      pdf_viewer: [ "ccm.component", "https://kaul.inf.h-brs.de/se/lib/ccm.pdf_viewer-5.0.1.js", {
        scale: 1,
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.2.1.min.js',
        helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.2.1.mjs" ],
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

      collector: [ "ccm.component", "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/collector/versions/ccm.collector-1.0.0.js", {
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

      recorder: [ "ccm.component", "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/recorder/versions/ccm.recorder-3.0.0.js", {
        worker: "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/recorder/resources/worker.js", // SOP

      } ],

      // onchange: function(){ console.log( this.getValue() ); },

      helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.2.1.mjs" ],

      // css: [ "ccm.load",  "./resources/styles.css" ],
      // css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/audio_slide_show/resources/styles.css" ],
      css: [ "ccm.load",  "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/audio_slide_show/resources/styles.css" ],

      user:   [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.4.0.js", { realm: "hbrsinfpseudo" } ],

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
       * which PDF viewer is displayed
       * @type {Boolean}
       */
      let stateOfViewer = false;

      /**
       * which slide in deck (first, second, ...)
       * @type {Number}
       */
      let slide_num = 0;

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
        const collector = await self.collector.start({ root: collector_div, num: 1, parent_node: collector_div.parentElement, name: self.pdf.slice(self.pdf.lastIndexOf('/')+1,self.pdf.lastIndexOf('.')) });

        const pdf_viewer_div = self.element.querySelector('#pdf_viewer');
        self.pdf_viewer.start({ root: pdf_viewer_div, pdf: self.pdf, onchange: async ( pdf_viewer, num ) => {
            slide_num = num;
            audio_div.textContent = '';

            collector && collector.setNum( num );

            if ( self.user && self.user.isLoggedIn() && isLecturer( self.user.data().key ) ){
              await self.recorder.start({
                root: recorder_div,
                filename: "slide" + zero(num) + ".mp3"
              });
            }

            audio_div.appendChild( ccm.helper.html( self.html.audio, { audio: `audio/week${zero(self.week_nr)}/slide${zero(num)}.mp3` }));
          } });

        const button = self.element.querySelector("button");
        const embed_viewer = self.element.querySelector("#embed_viewer");
        button.addEventListener("click", e => {
          stateOfViewer = ! stateOfViewer;
          pdf_viewer_div.classList.toggle("hidden");
          embed_viewer.classList.toggle("hidden");
        });

        PDFObject.embed( self.pdf, self.element.querySelector("#embed_viewer_pdf") );

      };

      /**
       * current state of this viewer
       * @returns {Object} state of viewer
       */
      this.getValue = () => { return {
        pdf: self.pdf,
          stateOfViewer,
          slide_num
        }
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
