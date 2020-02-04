/**
 * @overview ccm component for digi_clock
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (2.0.0)
 * @changes
 * version 2.0.0 04.02.2020 initial build
 * version 1.0.0 26.01.2020 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "digi_clock",
    // version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: "https://ccmjs.github.io/ccm/versions/ccm-25.0.0.js",
    // ccm: "https://ccmjs.github.io/ccm/ccm.js",

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        main: {
          inner: [
            { tag: "span", id: "year" },
            { tag: "span", class: 'sep', inner: '.' },
            { tag: "span", id: "month" },
            { tag: "span", class: 'sep', inner: '.' },
            { tag: "span", id: "day" },
            { tag: "span", class: 'sep', inner: '.' },
            { tag: "span", id: "hours" },
            { tag: "span", class: 'sep', inner: ':' },
            { tag: "span", id: "min" },
            { tag: "span", class: 'sep', inner: ':' },
            { tag: "span", id: "sec" }
          ]
        }
      },

      fontsize: 4,
      color: '#d0ff05',
      backgroundcolor: '#000000',
      blink: true,

      timeout: 490,

      // onchange: function(){ console.log( this.getValue() ); },
      
      css: [ "ccm.load",  "./resources/styles.css" ],
      // css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/digi_clock/resources/styles.css" ],
      // logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/mkaul-components/digi_clock/resources/configs.js", "log" ] ],
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

      let time;
      
      /**
       * init is called once after all dependencies are solved and is then deleted
       * @type {Function}
       */
      this.init = async () => {

        // set shortcut to helper functions
        $ = this.ccm.helper;

      };
        
      /**
       * starts the instance
       */
      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        // render main HTML structure
        this.element.appendChild( $.html( this.html.main ) );

        if ( this.color ) this.element.style.color = this.color;
        if ( this.backgroundcolor ) this.element.style.background = this.backgroundcolor;
        if ( this.fontsize ) this.element.style.fontSize = this.fontsize + 'rem';

        const hours = this.element.querySelector('#hours');
        const min = this.element.querySelector('#min');
        const sec = this.element.querySelector('#sec');

        const year = this.element.querySelector('#year');
        const month = this.element.querySelector('#month');
        const day = this.element.querySelector('#day');

        const separators = [...this.element.querySelectorAll('.sep')];

        const timer = setInterval(()=>{
          if ( this.blink ) separators.forEach( sep => { sep.classList.toggle('hide') } );

          time = new Date();

          this.onchange && this.onchange( this );

          const h = time.getHours();
          const m = time.getMinutes();
          const s = time.getSeconds();

          if ( hours ) hours.textContent = h < 10 ? "0" + h : h;
          if ( min ) min.textContent = m < 10 ? "0" + m : m;
          if ( sec ) sec.textContent = s < 10 ? "0" + s : s;

          if ( year ) year.textContent = time.getFullYear();
          if ( month ) month.textContent = time.getMonth() + 1;
          if ( day ) day.textContent = time.getDate();

        }, this.timeout );

      };
      
      /**
       * current state of this editor
       * @returns {Object} state of editor
       */
      this.getValue = () => time;
      
    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
