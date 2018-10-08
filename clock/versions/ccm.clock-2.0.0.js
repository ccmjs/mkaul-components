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

    version: [ 2, 0, 0 ],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.0.0.min.js',
    // ccm: '//akless.github.io/ccm/ccm.js',

    config: {
      html: {
        main: { class: 'main' }
      },
      width: "100px",
      lit_html: [ "ccm.load", { "url": "https://ccmjs.github.io/mkaul-components/lib/lit-html.js", "type": "module" } ]
      // css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/clock/resources/default.css' ],
      // lit_html: [ 'ccm.load', { url: '//kaul.inf.h-brs.de/data/ccm/clock/resources/lit-html.js', attr: { type: 'module' } } ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/clock/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-2.0.0.min.js' ],
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    Instance: function () {
    
      const self = this;

      this.date = new Date();

      this.start = async () => {

        self.element.style.display = "inline";

        // has logger instance? => log 'render' event
        if ( self.logger ) self.logger.log( 'render', this.date );

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
              :host {
                display: inline;
              }
              
             .clock-face {
                stroke: #333;
                fill: white;
              }
                           
              .minor {
                stroke: #999;
                stroke-width: 0.5;
              }
              
              .major {
                stroke: #333;
                stroke-width: 1;
              }
              
              .hour {
                stroke: #333;
              }
              
              .minute {
                stroke: #666;
              }
              
              .second, .second-counterweight {
                stroke: rgb(180,0,0);
              }
              
              .second-counterweight {
                stroke-width: 3;
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
                    transform='rotate(${ 30 * this.date.getHours() + this.date.getMinutes() / 2 })'/>
          
                  <!-- minute hand -->
                  <line class='minute' y1='4' y2='-30'
                    transform='rotate(${ 6 * this.date.getMinutes() + this.date.getSeconds() / 10 })'/>
          
                  <!-- second hand -->
                  <g transform='rotate(${ 6 * this.date.getSeconds() })'>
                    <line class='second' y1='10' y2='-38'/>
                    <line class='second-counterweight' y1='10' y2='2'/>
                  </g>
                </g>
              </svg>

          `
        });

        setInterval(() => {
          this.date = new Date();
          self.lit_html.render( svg_render(), self.element ); // re-render every second
        }, 1000);
      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );