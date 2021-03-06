/**
 * @overview ccm component for audio_player
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (3.0.0)
 * @changes
 * version 3.0.0 11.04.2020 add button for case of invalid audio
 * version 2.0.0 06.04.2020 add setter methods for adaptablility to audio slide show
 * version 1.0.0 05.04.2020 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "audio_player",
    version: [3,0,0],

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
      // src: "https://ccmjs.github.io/mkaul-components/audio_player/resources/audio.mp3",

      html: {
        main: {
          id: "audioplayer",
          inner: [
            {
              tag: "audio",
              hidden: true,
              controls: true,
              onplay: "%onplay%",
              onpause: "%onpause%",
              onsuspend: "%onsuspend%",
              onended: "%onended%",
              ontimeupdate: "%ontimeupdate%",
              onloadedmetadata: "%onloadedmetadata%",
              inner: [
                { tag: "source", type: "audio/mpeg"},
                "Your browser does not support the audio element."
              ]
            },
            { tag: "button", id: "playButton", class: "play", onclick: "%playAudio%" },
            { id: "control", inner: [
 //               { id: "measure" },

                { tag: "input", id: "timeline", type: "range", min: 0, max: 100, value: 0, onchange: "%onTimelineChange%" },

                { id: "current", inner: "00:00" },

                { id: "volume_control", inner: [
                    { tag: "label", id: "rngVolume_label", for: "rngVolume", inner: [
                        "Volume: ",
                        { tag: "span", id: "volume", inner: "100%" }
                      ] },
                    { tag: "input", id: "rngVolume", type: "range", min: 0, max: 100, value: 100, onchange: "%setVolume%" }
                  ]
                },
                { id: "speed_control", inner: [
                    { tag: "label", id: "rngSpeed_label", for: "rngSpeed", inner: [
                        "Speed: ",
                        { tag: "span", id: "speed", inner: "1" }
                      ] },
                    { tag: "input", id: "rngSpeed", type: "range", min: 0, max: 30, value: 10, onchange: "%setSpeed%" }
                  ]
                },

                { id: "total", inner: "00:00"  }
              ]
            }
          ]
        },
        play: {
          "tag": "svg",
          "id": "play",
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": "0 0 60 60",
          "inner": [
            {
              "tag": "circle",
              "style": "fill: #fff; stroke-width: 5px; stroke: rgb(0, 158, 224);",
              "cx": "30",
              "cy": "30",
              "r": "25"
            },
            {
              "tag": "polygon",
              "points": "23,15 45,30 23,45",
              "fill": "rgb(0, 158, 224)"
            }
          ]
        },
        pause: {
          "tag": "svg",
          "id": "pause",
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": "0 0 60 60",
          "inner": [
            {
              "tag": "circle",
              "style": "fill: #fff; stroke-width: 5px; stroke: rgb(0, 158, 224);",
              "cx": "30",
              "cy": "30",
              "r": "25"
            },
            {
              "tag": "rect",
              "x": "18",
              "y": "15",
              "width": "8",
              "height": "30",
              "fill": "rgb(0, 158, 224)"
            },
            {
              "tag": "rect",
              "x": "34",
              "y": "15",
              "width": "8",
              "height": "30",
              "fill": "rgb(0, 158, 224)"
            }
          ]
        },
        invalid: {
          "title": "No audio available.",
          "tag": "svg",
          "id": "invalid",
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": "0 0 60 60",
          "inner": [
            {
              "tag": "circle",
              "style": "fill: #fff; stroke-width: 5px; stroke: rgb(0, 158, 224);",
              "cx": "30",
              "cy": "30",
              "r": "25"
            },
            {
              "tag": "rect",
              "x": "8.1",
              "y": "39.5",
              "width": "51.2",
              "height": "5",
              "style": "fill: rgb(0, 158, 224);",
              "transform": "matrix(0.80902, -0.58779, 0.58779, 0.80902, -23.14016, 16.26332)"
            }
          ]
        }
      },

      // onchange: function(){ console.log( this.getValue() ); },

      helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-5.0.0.mjs" ],

      css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/audio_player/resources/styles.css" ],
      // css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/audio_player/resources/styles.css" ],
      // css: [ "ccm.load",  "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/audio_player/resources/styles.css" ],

      // user:   [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.4.1.js", { realm: "hbrsinfpseudo" } ],

      // logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.3.js", [ "ccm.get", "https://ccmjs.github.io/mkaul-components/audio_player/resources/configs.js", "log" ] ],

      // global_settings: {
      //               "store": [ "ccm.store", { name: "se-global-settings" } ] // Data Level 2 Store
      //             },

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
       * onfinish callback
       * @type {Function}
       */
      let onfinish;

      this.setFinish = ( fun ) => {
        onfinish = fun;
      };


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

        this.isVisible = () => {
          // https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
          return ( this.root.offsetParent !== null )
        };

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        if ( self.onfinish ) onfinish = self.onfinish;

        const play = $.html( this.html.play );
        const pause = $.html( this.html.pause );
        const invalid = $.html( this.html.invalid );

        const main = $.html( this.html.main, { audio: self.src || '',
          onplay, onpause, playAudio: clickPlayPauseButton, setVolume, setSpeed, onsuspend, onended, ontimeupdate, onTimelineChange, onloadedmetadata } );
        const playButton = main.querySelector( '#playButton' );
        const audioTag = main.querySelector( 'audio' );
        const total = main.querySelector( '#total');
        const current = main.querySelector( '#current');
        const timeline = main.querySelector( '#timeline');
        const volume = main.querySelector( '#volume');
        const speed = main.querySelector( '#speed');
        const rngSpeed = main.querySelector( '#rngSpeed' );
        const rngVolume = main.querySelector( '#rngVolume' );

        /**
         * switch button from pause to play or vice versa
         * @param {Number} buttonState - whether to show the play, pause or invalid button
         * @type {Function}
         */
        const switchButton = ( buttonState ) => {
          switch ( buttonState ){
            case 3: // play, but waiting for audio. audio still not loaded. Try again later.
              audioTag.src = self.src;
              // no break, show play button
            case 1: // play
              pause.style.display = 'none';
              invalid.style.display = 'none';
              play.style.display = 'inline';
              break;
            case 2: // pause
              play.style.display = 'none';
              invalid.style.display = 'none';
              pause.style.display = 'inline';
              break;
            default: // invalid
              play.style.display = 'none';
              pause.style.display = 'none';
              invalid.style.display = 'inline';
          }
        };

        const activeButton = () => {
          return [ play, pause, invalid ].find( button => button.style.display === 'inline' );
        };

        const switchToPlayButton = () => {
          switchButton( 1 );
        };

        const switchToPauseButton = () => {
          switchButton( 2 );
        };

        const switchToInvalidButton = () => {
          switchButton( 0 );
        };

        if ( self.global_settings ){
          const autoplay = await self.global_settings.store.get('autoplay');
          if ( autoplay && autoplay.autoplay === true ){
            audioTag.autoplay = true;
            switchToPlayButton();
          } else {
            delete audioTag.autoplay;
            audioTag.src = self.src;
            switchToPlayButton();
          }
        } else {
          audioTag.src = self.src;
          switchToPlayButton();
        }

        const isPlaying = () => {
          // https://stackoverflow.com/questions/9437228/html5-check-if-audio-is-playing
          return audioTag
            && audioTag.currentTime > 0
            && !audioTag.paused
            && !audioTag.ended
            && audioTag.readyState >= 2;
        };

        audioTag.addEventListener('error', (e) => {
          console.log( e );
          if ( audioTag.readyState === 0 ) switchToInvalidButton();
        });

        audioTag.addEventListener('loadedmetadata', (e) => {
          if ( audioTag.autoplay ){
            switchToPauseButton();
          } else {
            switchToPlayButton();
          }
        });

        this.setFilename = async ( filename ) => {
          total.textContent = "00:00";
          self.src = filename;
          if ( self.isVisible() ){
            audioTag.src = self.src; // start new audio
          }
          audioTag.volume = rngVolume.value / 100;
          audioTag.playbackRate = rngSpeed.value / 10;
        };

        // render main HTML structure
        if ( $.isSafari() ){
          audioTag.hidden = false;
          audioTag.style.width = "80%";
          audioTag.style['background-color'] = '#009EE0';
          // $.setContent( this.element, $.html( self.html.main.inner[0], { playAudio, setVolume, setSpeed, onended, ontimeupdate, self.src, onTimelineChange, onloadedmetadata } ) );
          if ( timeline ) timeline.style.display = 'none';
          $.setContent( this.element, main );
        } else {
          $.setContent( this.element, main );
        }

        playButton.appendChild( play );
        playButton.appendChild( pause );
        playButton.appendChild( invalid );

        // construct measure line above timeline ruler, if in config
        const measure = main.querySelector( '#measure' );
        if ( measure ){
          for (i=0; i<100;i++){
            const span = document.createElement('span');
            measure.appendChild( span );
            if ( i % 5 === 4 ) span.classList.add( 'fifth' );
            if ( i % 10 === 9 ) span.classList.add( 'tenth' );
          }
          measure.firstElementChild.style['border-left'] = 'thin solid black';
        }

        function onloadedmetadata(){
          if ( total ) total.textContent = timing( audioTag.duration === Infinity ? 0 : audioTag.duration  );
        }

        function onplay(){
          switchToPauseButton();
        }

        function onpause(){
          switchToPlayButton();
        }

        function timing( seconds ){
          const min =  Math.floor( seconds / 60 );
          const sec = Math.round( seconds - ( 60 * min ) );
          return `${ zero( min ) }:${ zero( sec ) }`;
        }

        this.play = clickPlayPauseButton;
        function clickPlayPauseButton(){
          if ( activeButton() === pause ){
            audioTag.pause();
            switchToPlayButton();
          } else if ( self.isVisible() &&  audioTag.readyState > 2 ){
            self.logger && self.logger.log( 'play', self.getValue() );
            audioTag.play();
            switchToPauseButton();
          } else {  // no audio data available up to now. Try later.
            switchButton( 3 );
          }
        }

        function setVolume(){
          self.logger && self.logger.log( 'setVolume', self.getValue() );
          audioTag.volume = rngVolume.value / 100;
          volume.textContent = rngVolume.value + "%";
        }

        function setSpeed(){
          self.logger && self.logger.log( 'setSpeed', self.getValue() );
          audioTag.playbackRate = rngSpeed.value / 10;
          speed.textContent = rngSpeed.value / 10;
        }

        function onended(){
          self.logger && self.logger.log( 'ended', self.getValue() );
          switchToPlayButton();

          if ( onfinish ) onfinish( self );

        }

        function ontimeupdate( e ){
          if ( timeline ){
            if ( $.isSafari() ){
              if ( audioTag.buffered && audioTag.buffered.end(0) ){
                const endBuf = audioTag.buffered.end(0);
                const soFar = audioContext.currentTime / endBuf;
                // parseInt(((endBuf / audioTag.duration) * 100));
                // audioTag.duration is Infinity
                timeline.value = 100 * soFar;
              }
            } else {
              timeline.value = 100 * audioTag.currentTime / audioTag.duration;
            }
          }
          if ( current ) current.textContent = timing( audioTag.currentTime  )
        }

        function onTimelineChange( e ){
          // https://stackoverflow.com/questions/52137963/how-to-set-the-currenttime-in-html5-audio-object-when-audio-file-is-online
          if ( timeline ){
            // audioTag.pause();
            audioTag.currentTime = audioTag.duration * timeline.value / 100;
            // audioTag.play();
          }
        }

        function zero( nr ){
          return (""+(nr||0)).padStart(2,"0");
        }

        /**
         * current state of this player
         * @returns {Object} state of player
         */
        this.getValue = () => { return {
            audio: self.src,
            volume: audioTag.volume,
            time: audioTag.currentTime,
            speed: audioTag.playbackRate
          }
        };

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
