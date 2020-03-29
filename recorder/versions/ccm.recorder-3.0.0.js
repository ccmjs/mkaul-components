/**
 * @overview ccm component for audio recorder
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (2.0.0)
 * @changes
 * version 3.0.0 28.03.2020 add web audio peak meter
 * version 2.1.0 22.03.2020 add visual feedback for saved files
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
      html: {
        main: { id: "main",
          inner: [
            { id: "peakmeter" },
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
            { tag: "button", class: "clear", inner: "Clear", onclick: "%clear%" },
            { class: "filename" }
          ]
        }
      },

      // https://www.npmjs.com/package/mp3-mediarecorder
      // https://unpkg.com/browse/mp3-mediarecorder@4.0.1/dist/
      webaudiorecorder: [ "ccm.load", { url: "https://unpkg.com/mp3-mediarecorder@4.0.1/dist/index.es.js", type: "module" } ],

      audio_options: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      },

      worker: "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/recorder/resources/worker.js",

      interval: 480,

      filename: "slide03.mp3",

      // onchange: function(){ console.log( this.getValue() ); },

      helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.2.0.mjs" ],

      // css: [ "ccm.load",  "./resources/styles.css" ],
      // css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/recorder/resources/styles.css" ],
      css: [ "ccm.load",  "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/recorder/resources/styles.css" ],

      peakmeter: [ "ccm.load", "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/recorder/resources/peakmeter.mjs" ],

      peakmeter_options: {
        borderSize: 2,
        fontSize: 9,
        backgroundColor: 'black',
        tickColor: '#ddd',
        gradient: ['red 1%', '#ff0 16%', 'lime 45%', '#080 100%'],
        dbRange: 48,
        dbTickSize: 6,
        maskTransition: '0.1s',
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
       * init is called once after all dependencies are solved and is then deleted
       * @type {Function}
       */
      this.init = async () => {

        // set shortcut to helper functions
        $ = Object.assign({}, this.ccm.helper || ccm.helper, this.helper);

      };

      /**
       * is called once after the initialization and is then deleted
       * @type {Function}
       */
      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log('ready');

      };

      /**
       * starts the instance
       */
      this.start = async () => {

        const worker = new Worker( self.worker );
        let mediator, timer;

        // render main HTML structure
        $.setContent(this.element, $.html(this.html.main));
        const main = self.element.querySelector('#main');

        const supportsWasm = WebAssembly && typeof WebAssembly.instantiate === 'function';
        const supportsUserMediaAPI = navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function';
        const isBrowserSupported = supportsWasm && supportsUserMediaAPI;

        if (!isBrowserSupported) {
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
          return;
        }

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const Mp3MediaRecorder = self.webaudiorecorder.Mp3MediaRecorder; // https://www.npmjs.com/package/mp3-mediarecorder
        const peakMeterElement = self.element.querySelector('#peakmeter');
        const recordButton = self.element.querySelector('#record');
        const stopButton = self.element.querySelector('#stop');
        const pauseButton = self.element.querySelector('#pause');
        const resumeButton = self.element.querySelector('#resume');
        const recordings = self.element.querySelector('#recordings');
        const min = self.element.querySelector('#min');
        const sec = self.element.querySelector('#sec');

        const enable = (...selected) => {
          ['record', 'pause', 'resume', 'stop'].forEach(button => {
            self.element.querySelector('#' + button).disabled = !selected.includes(button);
          });
        };

        enable('record'); // enable start button

        recordButton.addEventListener('click', () => {
          main.classList.add('recording');
          mediator.record();
          timer.start();
          enable('pause', 'stop');
        });

        stopButton.addEventListener('click', () => {
          main.classList.remove('recording');
          timer.reset();
          mediator.stop();

          // prepare for next run
          mediator = new Mediator();
          timer = new Timer();
          enable('record');
        });

        pauseButton.addEventListener('click', () => {
          main.classList.toggle('recording');
          timer.pause();
          mediator.pause();
          enable('resume', 'stop');
        });

        resumeButton.addEventListener('click', () => {
          main.classList.toggle('recording');
          timer.resume();
          mediator.resume();
          enable('pause', 'stop');
        });

        class Mediator {
          constructor() {
            this.worker = worker;  // TODO
          }
          async record() {
            if ( ! this.recorder || this.recorder.state === 'inactive' || this.recorder.state === 'closed') { // TODO
              await this.newRecorder();
              this.recorder.start();
              this.startPeakMeterOnRecorder();
            } else {
              this.recorder.resume();
            }
          }
          clearPeakMeter(){
            if (peakMeterElement.firstElementChild) peakMeterElement.removeChild(peakMeterElement.firstElementChild);
            // this.meterNode.disconnect();
            // this.recorder.sourceNode.disconnect();
            this.meterNode = null;
            // this.audioContext = null;
          }
          startPeakMeterOnAudioElement( audioElement ){
            if ( ! this.meterNode ){
              if (peakMeterElement.firstElementChild) peakMeterElement.removeChild(peakMeterElement.firstElementChild);
              this.audioContext = new AudioContext();
              this.sourceNode = this.audioContext.createMediaElementSource( audioElement );
              this.sourceNode.connect(this.audioContext.destination);
              this.createPeakMeter();
            }
          }
          startPeakMeterOnRecorder(){
            if ( ! this.meterNode ){
              if (peakMeterElement.firstElementChild) peakMeterElement.removeChild(peakMeterElement.firstElementChild);
              this.audioContext = this.recorder.audioContext;
              this.sourceNode = this.recorder.sourceNode;
              this.createPeakMeter();
            }
          }
          createPeakMeter(){
            this.meterNode = self.peakmeter.createMeterNode( this.sourceNode, this.audioContext);
            self.peakmeter.createMeter(peakMeterElement, this.meterNode, self.peakmeter_options);
          }
          stop(){
            this.recorder.stop();
            this.clearPeakMeter();
          }
          pause(){
            this.recorder.pause();
          }
          resume(){
            this.recorder.resume();
          }
          async newRecorder() {
            try {
              this.stream = await navigator.mediaDevices.getUserMedia({ audio: self.audio_options} );
              this.recorder = new Mp3MediaRecorder( this.stream, { worker: this.worker, audioContext: this.audioContext } );
              this.recorder.onstart = e => {
                this.blobs = [];
              };
              this.recorder.ondataavailable = e => {
                this.blobs.push(e.data);
              };
              this.recorder.onstop = e => {
                this.stream.getTracks().forEach(track => track.stop() );
                const mp3Blob = new Blob(this.blobs, {type: 'audio/mpeg'});
                const mp3BlobUrl = URL.createObjectURL(mp3Blob);
                const audioElement = new Audio();
                audioElement.controls = true;
                audioElement.src = mp3BlobUrl;
                audioElement.addEventListener('play', () => {
                  this.startPeakMeterOnAudioElement( audioElement );
                  this.audioContext.resume();
                });

                const item = $.html(self.html.item, {audio: audioElement, save, clear});
                recordings.appendChild(item);
                const filename = item.querySelector('.filename');

                async function save() {
                  filename.textContent = await saveFile(mp3Blob, self.filename);
                  item.classList.add('saved');
                }
                function clear() {
                  recordings.removeChild(item);
                  if (peakMeterElement.firstElementChild) peakMeterElement.removeChild(peakMeterElement.firstElementChild);
                }
              };
              this.recorder.onpause = e => {
                // debugger;
              };
              this.recorder.onresume = e => {
                this.audioContext.resume();
              };
              this.recorder.onerror = e => {
                console.error('onerror', e);
              };
            } catch(err) {
              console.warn('Could not get microphone access.\nError:', err.message);
            }
          }
        }

        class Timer {
          constructor() {
          }
          timerCallback() {
            return () => {
              this.time = new Date(new Date() - this.startTime + this.lastTime);
              const m = this.time.getMinutes() || 0;
              const s = this.time.getSeconds() || 0;
              if (min) min.textContent = m < 10 ? "0" + m : m;
              if (sec) sec.textContent = s < 10 ? "0" + s : s;
            };
          }
          start(){
            this.startTime = new Date();
            this.timer = setInterval( this.timerCallback(), self.interval );
            this.lastTime = 0;
          }
          pause() {
            clearInterval( this.timer );
            this.lastTime = new Date() - this.startTime + this.lastTime;
          }
          reset(){
            this.pause();
            this.lastTime = 0;
          }
          resume(){
            this.startTime = new Date();
            this.timer = setInterval( this.timerCallback(), self.interval );
          }
        }

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

        mediator = new Mediator();
        timer = new Timer();

      }

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
