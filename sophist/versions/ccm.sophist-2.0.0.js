/**
 * @overview ccm component for sophist
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT)
 * @version latest (2.0.0)
 * @changes
 * version 2.0.0 30.06.2019 add forms
 * version 1.0.0 13.06.2019 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( function () {

  "use strict";

  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'sophist',
    version: [2,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.3.0.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      columns: ["system","modal","func","object","process"],

      initial_values: {
        system: "Das System",
        object: "Objekt",
        process: "Prozesswort"
      },

      data: {
        "store": [ "ccm.store", 'https://ccmjs.github.io/mkaul-components/sophist/resources/datasets.js' ],
        "key": "demo"
      },

      html: {
        main: {
          inner: [
              {
                tag: "h2",
                inner: "Sophist Schablonen"
              },
              {
                tag: "table",
                inner: [
                  {
                    tag: "tr",
                    inner: [
                      { tag: "th", inner: "Systemname" },
                      { tag: "th", inner: "Verbindlichkeit" },
                      { tag: "th", inner: "Funktionalität" },
                      { tag: "th", inner: "Objekt" },
                      { tag: "th", inner: "Prozesswort" },
                      { tag: "th", inner: "Buttons" },
                    ]
                  }
                ]
              }
          ]
        },
        row: { tag: "tr",
          inner: [
            { tag: "td", class: "system", inner: "%system%" },
            { tag: "td", class: "modal", inner: "%modal%" },
            { tag: "td", class: "func", inner: "%func%" },
            { tag: "td", class: "object", inner: "%object%" },
            { tag: "td", class: "process", inner: "%process%" }
          ]
        },
        buttons:
          { tag: "td", inner: [
              { tag: "button", inner: "edit", onclick: "%edit%" },
              { tag: "button", inner: "delete", onclick: "%del%" },
            ]
          },
        save_button: { tag: "button", inner: "save", onclick: "%save%" }
      },

      form: {
        system: { tag: "input", type: "text", class: "system", value: "%system%" },
        modal: { tag: "select", class: "modal", inner: [
            {
              "tag": "option",
              "inner": "MUSS"
            },
            {
              "tag": "option",
              "inner": "SOLL"
            },
            {
              "tag": "option",
              "inner": "KANN"
            }
          ] },
        func: { tag: "select", class: "func", inner: [
            {
              "tag": "option",
              "inner": "die Möglichkeit bieten"
            },
            {
              "tag": "option",
              "inner": "fähig sein"
            }
          ] },
        object: { tag: "input", type: "text", class: "object", value: "%object%" },
        process: { tag: "input", type: "text", class: "process", value: "%process%" }
      },
      
      // css: [ 'ccm.load',  'resources/default.css' ],
      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/sophist/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/sophist/resources/configs.js', 'log' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    /**
     * for creating instances of this component
     * @constructor
     */
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
       * dataset is the single source of truth, the Web is the UI
       * The value of dataset starts with a clone of this.data,
       *     but additional values might be added during editing.
       * this.data is never changed, only dataset is changed.
       * @type {Object}
       */
      let dataset;
     
      
      /**
       * init is called once after all dependencies are solved and is then deleted
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;
        
        // listen to datastore changes => restart
        if ( $.isDatastore( this.data.store ) ) this.data.store.onchange = this.start;

      };
      
      /**
       * is called once after the initialization and is then deleted
       */
      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready' );

      };
        
      /**
       * starts the instance
       */
      this.start = async () => {

        dataset = await $.dataset( this.data );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        const html_main = $.clone( self.html.main );
        const table_rows = html_main.inner[1].inner;

        // add all rows from dataset
        dataset.rows.forEach( row => {
          table_rows.push( $.format( add_buttons( $.clone( self.html.row ) ), row ) );
        });

        // add last row, the edit row
        table_rows.push( $.format( add_save_button( $.clone( self.html.row ) ), $.format( self.form, self.initial_values ) ) );

        // render main HTML structure
        $.setContent( this.element, $.html( html_main, { edit, del, save: save_new } ) );

        /**
         * edit row
         */
        function edit() {
          this.parentElement.parentElement.parentElement.replaceChild(
            $.html( add_save_button( $.clone( self.html.row ) ),
              $.integrate ( { save: save_old },
                $.format( self.form, html_values( this.parentElement.parentElement ) ) ) ),
            this.parentElement.parentElement
          );
        }

        /**
         * delete row
         */
        function del() {
          const rowIndex = this.parentElement.parentElement.rowIndex;
          this.parentElement.parentElement.parentElement.removeChild( this.parentElement.parentElement );
          dataset.rows.splice( rowIndex - 1 , 1 );
        }

        /**
         * updates app state data and restarts app
         * @returns {Promise<void>}
         */
        async function save() {

          // trigger external change listener if present
          self.onchange && self.onchange( dataset );

          // no datastore? => abort
          if ( !$.isDatastore( self.data.store ) ) return;

          await self.data.store.set( dataset );  // update app state data
        }

        async function save_new() {
          dataset.rows.push( form_values( this.parentElement ) );
          await save();
          await self.start();     // restart app
        }

        async function save_old() {
          this.parentElement.parentElement.replaceChild(
            $.html( add_buttons( $.clone( self.html.row ) ),
              $.integrate ( { edit, del },
                form_values( this.parentElement ) ) ),
            this.parentElement
          );
          await save();
        }

        function add_buttons( row ){
          row.inner.push( $.clone( self.html.buttons ) );
          return row;
        }

        function add_save_button( row ){
          row.inner.push( $.clone( self.html.save_button ) );
          return row;
        }

        function html_values( row ){
          return self.columns.reduce((a,b)=>{a[b]=row.querySelector("."+b).innerHTML; return a;},{});
        }

        function form_values( row ){
          return self.columns.reduce((a,b)=>{a[b]=row.querySelector("."+b).firstElementChild.value; return a;},{save: save_old});
        }

      };
      
      /**
       * current state of this editor
       * @returns {Object} state of editor
       */
      this.getValue = () => {
        return $.clone( dataset );
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();