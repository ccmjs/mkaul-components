/**
 * @overview ccm component for clock
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017, 2018
 * @license The BSD License (BSD)
 *
 * Adapted from the lit-html clock example: https://github.com/PolymerLabs/lit-html/blob/master/demo/clock.js
 */

( function () {

  var component  = {

    name: 'clock',
    version: [3,0,1],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-24.0.1.js',
    // ccm: '//ccmjs.github.io/ccm/ccm.js',

    config: {
      html: {
        main: { id: 'main', inner: [
            { id: 'clock' },
            { id: 'date', inner: '%date%' },
            { id: 'time', inner: '%time%' },
            { id: 'title', inner: '%title%', style: 'width: %width%' }
          ]
        }
      },
      width: "200px",
      // delay: 0,
      // title: 'Berlin',
      color: '#000000', // black
      background: '#ffffff', // white
      css: [ "ccm.load", "https://ccmjs.github.io/mkaul-components/clock/resources/default.css" ],
      lit_html: [ "ccm.load", { url: "https://ccmjs.github.io/mkaul-components/clock/resources/lit-html.js", type: "module" } ]
      // lit_html: [ "ccm.load", { "url": "../lib/lit-html.js", "type": "module" } ]
      // lit_html: [ "ccm.load", { "url": "https://ccmjs.github.io/mkaul-components/lib/lit-html.js", "type": "module" } ]
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ]
    },

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
       * init is called once after all dependencies are solved and is then deleted
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

      };

      this.getValue = () => {
        const date = new Date();
        date.setHours( ( date.getHours() + parseInt( self.delay || 0 ) ) % 24 );
        return date;
      };

      this.start = async () => {

        const main_div = $.html( self.html.main || { id: 'main', inner: [ { id: 'clock' } ] }, {
          date: this.getValue().toLocaleDateString(),
          time: this.getValue().toLocaleTimeString(),
          title: self.title,
          width: self.width || "200px"
        } );

        const clock_div = main_div.querySelector('#clock');
        const date_div = main_div.querySelector('#date');
        const time_div = main_div.querySelector('#time');

        // has logger instance? => log 'render' event
        self.logger && self.logger.log( 'render', this.getValue() );

        const minuteTicks = (() => {
          const lines = [];
          for (let i = 0; i < 60; i++) {
            lines.push(self.lit_html.svg`
            <line 
              class='minor'
              y1='42'
              y2='45'
              transform='rotate(${360 * i / 60})'/>
          `);
          }
          return lines;
        })();

        const hourTicks = (() => {
          const lines = [];
          for (let i = 0; i < 12; i++) {
            lines.push(self.lit_html.svg`
            <line 
              class='major'
              y1='32'
              y2='45'
              transform='rotate(${360 * i / 12})'/>
          `);
          }
          return lines;
        })();

        const svg_render = (() =>{
          return self.lit_html.html`
            <style>
                          
             .clock-face {
                stroke: ${self.color};
                fill: ${self.background};
              }
                           
              .minor {
                stroke: ${self.color};
                stroke-width: 0.5px;
              }
              
              .major {
                stroke: ${self.color};
                stroke-width: 1px;
              }
              
              .hour {
                stroke: ${self.color};
              }
              
              .minute {
                stroke: ${self.color};
              }
              
              .second, .second-counterweight {
                stroke: rgb(180,0,0);
              }
              
              .second-counterweight {
                stroke-width: 3px;
              }
            </style>
            
              
              <svg width="${self.width}" height="${self.width}" viewBox='0 0 100 100'>
                
                <!-- first create a group and move it to 50,50 so
                    all co-ords are relative to the center -->
                <g transform='translate(50,50)'>
                  <circle class='clock-face' r='48'/>
                  ${minuteTicks}
                  ${hourTicks}
          
                  <!-- hour hand -->
                  <line class='hour' y1='2' y2='-20'
                    transform='rotate(${ 30 * this.getValue().getHours() + this.getValue().getMinutes() / 2 })'/>
          
                  <!-- minute hand -->
                  <line class='minute' y1='4' y2='-30'
                    transform='rotate(${ 6 * this.getValue().getMinutes() + this.getValue().getSeconds() / 10 })'/>
          
                  <!-- second hand -->
                  <g transform='rotate(${ 6 * this.getValue().getSeconds() })'>
                    <line class='second' y1='10' y2='-38'/>
                    <line class='second-counterweight' y1='10' y2='2'/>
                  </g>
                </g>
              </svg>

          `
        });

        setInterval(() => { // re-render every second
          clock_div && self.lit_html.render( svg_render(), clock_div );
          if ( date_div ) date_div.innerText = this.getValue().toLocaleDateString();
          if ( time_div ) time_div.innerText = this.getValue().toLocaleTimeString();
        }, 1000);

        // set content of own website area
        $.setContent( self.element, main_div );

      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );