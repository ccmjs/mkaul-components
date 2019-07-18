/**
 * @overview ccm component for sophist
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT)
 * @version latest (3.2.0)
 * @changes
 * version 3.2.0 18.07.2019 allow for minimal config
 * version 3.1.1 13.07.2019 avoid storing undefined form values
 *      use sophist as special input type in forms
 * version 3.1.0 13.07.2019 form allows fixed innerHTML
 * version 3.0.0 06.07.2019 add persistence
 * version 2.1.0 03.07.2019 refactor config
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
    version: [3,2,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-22.1.1.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      // // optional headers and columns:
      headers: ["Systemname","Verbindlichkeit","Funktionalität","Objekt","Prozesswort", "Buttons"],
      columns: ["system","modal","func","object","process"],

      initial_values: {
        system: "Das System",
        object: "Objekt",
        process: "Prozesswort"
      },

      //  // optional data
      // data: {
      //   "store": [ "ccm.store", './resources/datasets.js' ],
      //   "key": "demo"
      // },

      html: {
        main: {
          inner: [ { tag: "h2", inner: "Minimum" } ]
        },
        // row: { tag: "tr",  // use row instead of headers and colums for defining your own HTML structure.
        //   inner: [         // If you use headers and columns, you do not need row.
        //     { tag: "td", class: "system", inner: "%system%" },
        //     { tag: "td", class: "modal", inner: "%modal%" },
        //     { tag: "td", class: "func", inner: "%func%" },
        //     { tag: "td", class: "object", inner: "%object%" },
        //     { tag: "td", class: "process", inner: "%process%" }
        //   ]
        // },
        buttons:
          { tag: "td", inner: [
              { tag: "button", inner: "edit", onclick: "%edit%" },
              { tag: "button", inner: "delete", onclick: "%del%" },
            ]
          },
        save_button: { tag: "button", inner: "save", onclick: "%save%" }
      },

      // ignore functions when saving data
      // ignore_button_functions: ["save","edit","del"],

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
        process: { tag: "input", type: "text", class: "process", value: "%process%" },
        condition: { tag: "input", type: "text", class: "condition", value: "%condition%" }
      },
      
      // css: [ 'ccm.load',  './resources/default.css' ],
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
       * count the number of rows created
       * @type {Number}
       */
      let row_count = 0;

      /**
       * index of the last change in the change list already applied to rows
       * @type {Number}
       */
      let change_count = 0;

      /**
       * index of incremental update functions
       * @type {Number}
       */
      let change_function = {
        add: function( change ){ alert("TODO") }, // TODO
        update: function( change ){ alert("TODO") }, // TODO
        del: function( change ){
          const tableRow = self.element.querySelector('table tr#' + change.id );
          if ( $.isElementNode( tableRow ) ){
            dataset.rows.splice( change.rowIndex, 1 );
            self.element.querySelector('table').removeChild( tableRow );
          }
        }
      };

      function replay_changes( data ){
        // check whether there are new changes
        if ( data.changes && data.changes.length > change_count ){
          // replay all new changes
          for ( let i = change_count; i < data.changes.length; i++ ){
            const change = data.changes[i];
            change_function[ change.type ]( change );
            if ( dataset !== data && ! dataset.changes.includes( change ) ) dataset.changes.push( change );
          }
          change_count = data.changes.length;
        }
      }

      /**
       * incrementalUpdate will be called if a datastore ist used with WebSockets on every change of the store
       * see this.data.store.onchange
       */
      this.incrementalUpdate = async ( data ) => {
        if ( ! data || ! this.data || data.key !== this.data.key ) return; // same store, but different document

        replay_changes( data );

        if ( dataset.rows.length !== data.rows.length ){
          // restart app
          dataset = data;
          await this.start();
        }

      };

      /**
       * init is called once after all dependencies are solved and is then deleted
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        dataset = await $.dataset( this.data );
        
        // listen to datastore changes => restart
        if ( this.data && $.isDatastore( this.data.store ) ) this.data.store.onchange = this.incrementalUpdate;

        // construct row from columns
        if ( ! self.html.row ){
          self.html.row = { tag: "tr", id: "row%id%", inner: [] };
          for ( const column of self.columns || [] ){
            self.html.row.inner.push( { tag: "td", class: column, inner: "%" + column + "%" } );
          }
        } else {
          if ( ! self.html.row.id ) self.html.row.id = "row%id%";
        }

        // construct table from headers
        if ( self.headers && ! find( "table", self.html.main.inner ) ){
          const table = {
            tag: "table",
            inner: [ { tag: "tr", inner: [] } ]
          };
          self.headers.forEach( header => {
            table.inner.push({ tag: "th", inner: header });
          });
          self.html.main.inner.push( table );
        }

      };

      // auxiliary function for table constructor
      function find( search, list ){
        for ( const elem of list){
          if ( $.isObject( elem ) && elem.tag && elem.tag === "table" ){
            return elem;
          } else if ( Array.isArray( elem ) ){
            const sub_elem = find( search, elem );
            if ( sub_elem ) return sub_elem;
          }
        }
        return false;
      }
        
      /**
       * starts the instance
       */
      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // clone main HTML structure
        const html_main = $.clone( self.html.main );

        /**
         * array of rows of the table
         * @type {Array}
         */
        const table_rows = find( "table", html_main.inner ).inner || [];

        if ( dataset.lastRow ){
          row_count = dataset.lastRow;
        }

        // include dataset rows
        if ( dataset.rows ){
          // add all rows from dataset
          dataset.rows.forEach( row => {
            if ( ! row.id ){
              row_count += 1;
              row.id = row_count;
            }
            table_rows.push(
              $.format(
                add_buttons(
                  $.clone( self.html.row ) ),
                $.integrate( row, self.initial_values ) ) );
          });
        } else {
          // initialize
          dataset.rows = [];
        }

        if ( dataset.changes ){
          // replay_changes( dataset );   // TODO infinite loop
        } else {
          // initialize
          dataset.changes = [];
        }

        // add last row: the edit row for entering new data
        table_rows.push( $.format( add_save_button( $.clone( self.html.row ) ), $.format( self.form || {}, self.initial_values ) ) );

        // render main HTML structure
        $.setContent( this.element, $.html( html_main, { edit, del, save: add } ) );

      };

      /**
       * edit row
       */
      function edit() {
        this.parentElement.parentElement.parentElement.replaceChild(
          $.html( add_save_button( $.clone( self.html.row ) ),
            $.integrate ( { save },
              $.format( self.form, html_values( this.parentElement.parentElement ) ) ) ),
          this.parentElement.parentElement
        );
      }

      /**
       * delete row
       */
      function del() {
        const rowIndex = this.parentElement.parentElement.rowIndex - 1;
        const id = this.parentElement.parentElement.id;
        this.parentElement.parentElement.parentElement.removeChild( this.parentElement.parentElement );
        dataset.rows.splice( rowIndex, 1 );
        dataset.changes.push( { type: 'del', rowIndex, id } );
        saveIntoStore();
      }

      /**
       * save dataset into data store
       * @returns {Promise<void>}
       */
      async function saveIntoStore() {

        // no datastore? => abort
        if ( !$.isDatastore( self.data.store ) ) return;

        // do not store the save function of the save button in a row
        if ( dataset.rows ){
          dataset.rows.forEach( row => {
            self.ignore_button_functions.forEach( fun => {
              if ( row[ fun ] ) delete row[ fun ];
            });
          });
        }

        dataset.lastRow = row_count;

        // update app state data
        await self.data.store.set( dataset );

      }

      async function add() {
        dataset.rows.push( form_values( this.parentElement ) );
        row_count += 1;
        await saveIntoStore();
        await self.start();     // restart app
      }

      async function save() {
        const rowIndex = this.parentElement.rowIndex;
        Object.assign( dataset.rows[ rowIndex - 1 ], form_values( this.parentElement ) );
        this.parentElement.parentElement.replaceChild(
          $.html( add_buttons( $.clone( self.html.row ) ),
            $.integrate ( { edit, del, save },
              form_values( this.parentElement ) ) ),
          this.parentElement
        );
        await saveIntoStore();   // without restart
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
        return self.columns.reduce( ( allValues, column ) => {
            const firstElementChild = row.querySelector("."+column).firstElementChild;
            if ( firstElementChild && firstElementChild.value ) allValues[ column ] = firstElementChild.value;
            return allValues;
          },{});
      }
      
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