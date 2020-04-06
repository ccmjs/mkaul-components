/**
 * @overview ccm component for audio_player
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
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
    version: [2,0,0],

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
      src: "https://ccmjs.github.io/mkaul-components/audio_player/resources/audio.mp3",

      html: {
        main: {
          id: "audioplayer",
          inner: [
            {
              tag: "audio",
              autoplay: true, // html.main.inner[0].autoplay
              hidden: true,
              controls: true,
              onended: "%onended%",
              ontimeupdate: "%ontimeupdate%",
              onloadedmetadata: "%onloadedmetadata%",
              inner: [
                { tag: "source", src: "%audio%", type: "audio/mpeg"},
                "Your browser does not support the audio element."
              ]
            },
            { tag: "button", id: "playButton", class: "play", onclick: "%playAudio%" },
            { id: "control", inner: [
 //               { id: "measure" },

                { tag: "input", id: "timeline", type: "range", min: 0, max: 100, value: 0, onchange: "%onTimelineChange%" },

                { id: "current", inner: "00:00" },

                { id: "volume_control", inner: [
                    { tag: "label", id: "rngVolume_label", for: "rngVolume", inner: "Volume:" },
                    { tag: "input", id: "rngVolume", type: "range", min: 0, max: 100, value: 100, onchange: "%setVolume%" }
                  ]
                },
                { id: "speed_control", inner: [
                    { tag: "label", id: "rngSpeed_label", for: "rngSpeed", inner: "Speed:" },
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
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": "0 0 60 60",
          "inner": [
            {
              "tag": "circle",
              "style": "fill: none; stroke-width: 5px; stroke: rgb(0, 158, 224);",
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
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": "0 0 60 60",
          "style": "display: none;",
          "inner": [
            {
              "tag": "circle",
              "style": "fill: none; stroke-width: 5px; stroke: rgb(0, 158, 224);",
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
        }
      },

      // onchange: function(){ console.log( this.getValue() ); },

      helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.2.1.mjs" ],

      css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/audio_player/resources/styles.css" ],
      // css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/audio_player/resources/styles.css" ],
      // css: [ "ccm.load",  "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/audio_player/resources/styles.css" ],

      // user:   [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.4.0.js", { realm: "hbrsinfpseudo" } ],

      // logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.3.js", [ "ccm.get", "https://ccmjs.github.io/mkaul-components/audio_player/resources/configs.js", "log" ] ],

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
       * filename of audio file
       * @type {String}
       */
      let audio;

      /**
       * onfinish callback
       * @type {Function}
       */
      let onfinish;


      /**
       * init is called once after all dependencies are solved and is then deleted
       * @type {Function}
       */
      this.init = async () => {

        // set shortcut to helper functions
        $ = Object.assign( {}, this.ccm.helper || ccm.helper, this.helper );

        audio = self.src;

        onfinish = self.onfinish;

      };

      /**
       * starts the instance
       */
      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        const play = $.html( this.html.play );
        const pause = $.html( this.html.pause );

        const isAutoPlay = () => {
          return self.html.main.inner[0].autoplay;
        };

        const switchToPlayButton = ( play ) => {
          if ( play ){
            play.style.display = 'inline';
            pause.style.display = 'none';
          } else {
            play.style.display = 'none';
            pause.style.display = 'inline';
          }
        };

        switchToPlayButton( ! isAutoPlay() );

        this.setFilename = async ( filename ) => {
          audio = filename;
          await self.start();
          switchToPlayButton( ! isAutoPlay() );
        };

        this.setFinish = ( fun ) => {
          onfinish = fun;
        };

        const main = $.html( this.html.main, { playAudio, setVolume, setSpeed, onended, ontimeupdate, audio, onTimelineChange, onloadedmetadata } );
        const playButton = main.querySelector( '#playButton' );
        const audioTag = main.querySelector( 'audio' );
        const total = main.querySelector( '#total');
        const current = main.querySelector( '#current');
        const timeline = main.querySelector( '#timeline');
        // const audioContext = $.isSafari() ? new webkitAudioContext() : new AudioContext();

        // render main HTML structure
        if ( $.isSafari() ){
          audioTag.hidden = false;
          // $.setContent( this.element, $.html( self.html.main.inner[0], { playAudio, setVolume, setSpeed, onended, ontimeupdate, audio, onTimelineChange, onloadedmetadata } ) );
        }
        $.setContent( this.element, main );

        playButton.appendChild( play );
        playButton.appendChild( pause );

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

        function timing( seconds ){
          const min =  Math.floor( seconds / 60 );
          const sec = Math.round( seconds - ( 60 * min ) );
          return `${ zero( min ) }:${ zero( sec ) }`;
        }

        function playAudio(){
          if ( audioTag.paused ) {
            self.logger && self.logger.log( 'play', self.getValue() );
            audioTag.play();
            switchToPlayButton( false );
          } else {
            self.logger && self.logger.log( 'pause', self.getValue() );
            audioTag.pause();
            switchToPlayButton( true );
          }
        }

        function setVolume(){
          self.logger && self.logger.log( 'setVolume', self.getValue() );
          audioTag.volume = main.querySelector( '#rngVolume' ).value / 100;
        }

        function setSpeed(){
          self.logger && self.logger.log( 'setSpeed', self.getValue() );
          audioTag.playbackRate = main.querySelector( '#rngSpeed' ).value / 10;
        }

        function onended(){
          self.logger && self.logger.log( 'ended', self.getValue() );

          switchToPlayButton( true );

          if ( onfinish ) onfinish( self );

          // e.g. automatic proceeding to next slide:
          // if ( window.ccm.app_global_settings && ccm.app_global_settings.auto_slide_proceed && self.pdf_viewer ){
          //   setTimeout( () => {
          //     self.pdf_viewer.nextPage()
          //   }, window.ccm.app_global_settings.slide_proceed_pause * 1000 );
          // }
        }

        function ontimeupdate( e ){
          if ( timeline ){
            if ( $.isSafari() ){
              const endBuf = audioTag.buffered.end(0);
              const soFar = audioContext.currentTime / endBuf;
              // parseInt(((endBuf / audioTag.duration) * 100));
              // audioTag.duration is Infinity
              timeline.value = 100 * soFar;
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
