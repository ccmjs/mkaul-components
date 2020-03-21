/**
 * @overview ccm component for audio recorder
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (2.0.0)
 * @changes
 * version 2.0.0 21.03.2020 add timer
 * version 1.0.0 20.03.2020 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "recorder",
    version: [2,0,0],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: "https://ccmjs.github.io/ccm/versions/ccm-25.1.0.js",
    // ccm: "https://ccmjs.github.io/ccm/ccm.js",

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        main: { id: "main",
          inner: [
            { tag: "button", id: "record", inner: "Record" },
            { tag: "button", id: "pause", inner: "Pause" },
            { tag: "button", id: "resume", inner: "Resume" },
            { tag: "span", id: "timer", inner: [
                { tag: "span", "id": "min" },
                { tag: "span", "class": "sep", "inner": ":" },
                { tag: "span", "id": "sec" }
              ]
            },
            { tag: "button", id: "stop", inner: "Stop" },
            { tag: "ol", id: "recordings" }
          ]
        },
        item: { tag: "li", class: "item",
          inner: [
            "%audio%",
            { tag: "button", class: "save", inner: "Save", onclick: "%save%" },
            { class: "filename" }
          ]
        }
      },

      // https://unpkg.com/browse/mp3-mediarecorder@4.0.1/dist/
      webaudiorecorder: [ "ccm.load", { url: "https://unpkg.com/mp3-mediarecorder@4.0.1/dist/index.es.js", type: "module" } ],
      worker: "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/recorder/resources/worker.js",

      interval: 480,

      filename: "slide03.mp3",

      // onchange: function(){ console.log( this.getValue() ); },

      helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.1.0.mjs" ],

      // css: [ "ccm.load",  "./resources/styles.css" ],
      // css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/recorder/resources/styles.css" ],
      css: [ "ccm.load",  "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/recorder/resources/styles.css" ],

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
       * init is called once after all dependencies are solved and is then deleted
       * @type {Function}
       */
      this.init = async () => {

        // set shortcut to helper functions
        $ = Object.assign( {}, this.ccm.helper || ccm.helper, this.helper );

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

        const Mp3MediaRecorder = self.webaudiorecorder.Mp3MediaRecorder;

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main ) );

        // init timer
        let time, timer, startTime, lastTime = 0;

        // from https://www.npmjs.com/package/mp3-mediarecorder

        const startButton = self.element.querySelector('#record');
        const stopButton = self.element.querySelector('#stop');
        const pauseButton = self.element.querySelector('#pause');
        const resumeButton = self.element.querySelector('#resume');
        const recordings = self.element.querySelector('#recordings');
        const main = self.element.querySelector('#main');

        const min = self.element.querySelector('#min');
        const sec = self.element.querySelector('#sec');

        const enable = ( ...selected ) => {
          ['record','pause','resume','stop'].forEach( button => {
            self.element.querySelector('#'+button).disabled = ! selected.includes( button );
          });
        };

        enable( 'record' );

        let isRecording = false;
        let recorder = null;
        let blobs = [];
        let mediaStream = null;
        let isPaused = false;
        const supportsWasm = WebAssembly && typeof WebAssembly.instantiate === 'function';
        const supportsUserMediaAPI = navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function';
        const isBrowserSupported = supportsWasm && supportsUserMediaAPI;

        if (isBrowserSupported) {
          const worker = new Worker( self.worker );

          startButton.addEventListener('click', () => {
            main.classList.toggle('recording');

            // start timer
            startTime = new Date();
            timerCallback();
            timer = setInterval( timerCallback, self.interval );

            navigator.mediaDevices
            .getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } })
            .then(
              stream => {
                mediaStream = stream;
                recorder = new Mp3MediaRecorder(stream, { worker });
                recorder.start();
                enable( 'pause', 'stop' );

                recorder.onstart = e => {
                  // console.log('onstart', e);
                  blobs = [];
                  startButton.classList.add('is-disabled');
                  stopButton.classList.remove('is-disabled');
                  pauseButton.classList.remove('is-disabled');
                };

                recorder.ondataavailable = e => {
                  // console.log('ondataavailable', e);
                  blobs.push(e.data);
                };

                recorder.onstop = e => {
                  // console.log('onstop', e);
                  mediaStream.getTracks().forEach(track => track.stop());

                  startButton.classList.remove('is-disabled');
                  pauseButton.classList.add('is-disabled');
                  stopButton.classList.add('is-disabled');

                  const mp3Blob = new Blob(blobs, { type: 'audio/mpeg' });
                  const mp3BlobUrl = URL.createObjectURL(mp3Blob);
                  const audio = new Audio();
                  audio.controls = true;
                  audio.src = mp3BlobUrl;
                  const item = $.html( self.html.item, { audio, save } );
                  recordings.appendChild( item );
                  const filename = item.querySelector('.filename');

                  async function save(){
                    filename.textContent = await saveFile( mp3Blob, self.filename );
                  }
                };

                recorder.onpause = e => {
                  // console.log('onpause', e);
                  resumeButton.classList.remove('is-disabled');
                  pauseButton.classList.add('is-disabled');
                };

                recorder.onresume = e => {
                  // console.log('onresume', e);
                  resumeButton.classList.add('is-disabled');
                  pauseButton.classList.remove('is-disabled');
                };

                recorder.onerror = e => {
                  console.error('onerror', e);
                };
              },
              reason => {
                console.warn('Could not get microphone access.\nError:', reason.message);
              }
            );
          });

          stopButton.addEventListener('click', () => {
            pauseTimer();
            recorder.stop();
            enable('record');
            main.classList.toggle('recording');
          });

          pauseButton.addEventListener('click', () => {
            pauseTimer();
            recorder.pause();
            enable('resume');
            main.classList.toggle('recording');
          });

          resumeButton.addEventListener('click', () => {
            startTime = new Date();
            timer = setInterval( timerCallback, self.interval );
            recorder.resume();
            enable( 'pause', 'stop');
            main.classList.toggle('recording');

          });
        } else {
          const renderError = reason => {
            const clonedMain = main.cloneNode(false);
            clonedMain.innerHTML = `
            <h1 class="nes-text is-error">MP3 MediaRecorder is not supported</h1>
            <p class="nes-text">
                ${reason}
            </p>
        `;
            main.parentNode.replaceChild(clonedMain, main);
          };

          if (!supportsUserMediaAPI) {
            renderError(
              'MP3 MediaRecorder requires the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API" class="nes-text is-error">getUserMedia API</a> but it is not supported in your browser.'
            );
          } else if (!supportsWasm) {
            renderError(
              'MP3 MediaRecorder requires <a href="https://developer.mozilla.org/en-US/docs/WebAssembly" class="nes-text is-error">WebAssembly</a> but it is not supported in your browser.'
            );
          }
        }

        function timerCallback(){

          time = new Date( new Date() - startTime + lastTime );

          const m = time.getMinutes();
          const s = time.getSeconds();

          if ( min ) min.textContent = m < 10 ? "0" + m : m;
          if ( sec ) sec.textContent = s < 10 ? "0" + s : s;

        }

        function pauseTimer(){

          clearInterval( timer );

          lastTime = new Date() - startTime + lastTime;

        }

      };

      const wait = t => new Promise(resolve => setTimeout(resolve, t));

      async function saveFile(blob, filename) {
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, filename);
        } else {
          const a = document.createElement('a');
          document.body.appendChild(a);
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = filename;
          a.click();
          await wait(1);
          const chosenFilename = a.download;
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          return chosenFilename;
        }
      }

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
