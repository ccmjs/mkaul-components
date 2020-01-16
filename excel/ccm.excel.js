/**
 * @overview ccm component for excel
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 16.01.2020 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "excel",
    // version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: "https://ccmjs.github.io/ccm/versions/ccm-24.2.0.js",
    ccm: "https://ccmjs.github.io/ccm/ccm.js",

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      html: {
        main: {
          inner: [
            {  id: "top" },
            {  id: "table" }
          ]
        }
      },
      
      // data: {
      //   // store: [ "ccm.store", "https://ccmjs.github.io/mkaul-components/excel/resources/datasets.js" ],
      //   store: [ "ccm.store", "./resources/datasets.js" ],
      //   key: "demo"
      // },

      data: {
        store: [ "ccm.store", { name: "excel", url: "wss://ccm2.inf.h-brs.de", dataset: "demo" } ],
        key: "demo"
      },

      // onchange: function(){ console.log( this.getValue() ); },
      
      css: [ "ccm.load",  "./resources/styles.css" ],
      // css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/excel/resources/styles.css" ],
      user:   [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.0.js", { realm: "hbrsinfkaul", ccm: "https://ccmjs.github.io/ccm/ccm.js" } ],
      // logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/mkaul-components/excel/resources/configs.js", "log" ] ],
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
      
      /**
       * dataset is the single source of truth, the Web is the UI
       * The value of dataset starts with a clone of this.data,
       *     but additional values might be added during editing.
       * this.data is never changed, only dataset is changed.
       * @type {Object}
       */
      let dataset;

      /**
       * saves app state data
       * @returns {Promise<void>}
       */
      const save = async () => {

        // no datastore? => abort
        if ( !$.isDatastore( self.data.store ) ) return;

        await self.data.store.set( dataset );  // update app state data

        // alert( 'Saved!' );

      };

      let table; // private instance of class Table

      const Table = class {  // private class inside component

        // states of table cells
        static EDIT = "edit";
        static VALUE = "value";

        // Regex for formulars in table
        static formularRegex = /=SUM\((\w\d),(\w\d)\)/i; // first group

        constructor( host, rows, cols, dataset ){
          const table = document.createElement( 'table' );
          host.appendChild( table );

          // datastructure for efficient retrieval: key A1, value is the value of table cell A1
          this.cellIndex = {};

          for (let i = 0; i < rows; i++ ){
            const tr = document.createElement('tr');
            const rowIndex = String.fromCharCode(65 + i);
            table.appendChild( tr );
            for (let j = 0; j < cols; j++ ){
              const cell = document.createElement('td');
              const colIndex = j + 1;
              // cell.title = rowIndex+colIndex;
              this.cellIndex[rowIndex+colIndex] = cell;
              if ( dataset.table ) cell.textContent = dataset.table[rowIndex+colIndex];
              cell.contentEditable = true;
              cell.onmouseover = e => {
                if (cell.formular){
                  cell.textContent = cell.formular;
                  cell.state = Table.EDIT;
                }
              };
              cell.onmouseout = e => {
                if ( Table.isFormularCell( cell ) ) cell.formular = cell.textContent;
                cell.state = Table.VALUE;
                this.update();
              };
              cell.oninput = e => {
                if ( ! dataset.table ) dataset.table = {};
                dataset.table[rowIndex+colIndex] = cell.textContent;

                const match = cell.textContent.match( Table.formularRegex );
                if ( match ){
                  const begin = match[1];
                  const end = match[2];
                  cell.formular = cell.textContent;
                }
                this.update();
                // save to database
                save();
                // change handler from config
                self.onchange && self.onchange( dataset );
              };
              tr.appendChild( cell );
            }
          }
        }
        static isFormularCell( cell ){
          return cell.textContent.match(Table.formularRegex);
        }
        update(){
          // update all formulars
          Object.entries( this.cellIndex ).forEach( ([key, cell]) => {
            if ( cell.formular && cell.state === Table.VALUE ){
              const match = cell.formular.match(Table.formularRegex);
              if ( match ){
                const begin = match[1];
                const end = match[2];
                if ( begin && end ) cell.textContent = this.sum(begin, end);
              }
            }
          } );
        }
        sum( begin, end ){
          // TODO const interval = begin ... end;
          return parseInt( this.cellIndex[begin].textContent )
            + parseInt( this.cellIndex[end].textContent );
        }
      };

      /**
       * ToDo: dead code ?
       * refresh dataset after editing
       */
      this.updateData = () => {
        dataset.table = Object.entries( table.cellIndex )
          .map(([key,cell]) => { return { key, value: cell.textContent } } )
          .reduce( ( valueIndex, cell ) => { valueIndex[ cell.key ] = cell.value; return valueIndex }, {});
        self.onchange && self.onchange( dataset );  // from config
      };
     
      
      /**
       * init is called once after all dependencies are solved and is then deleted
       * @type {Function}
       */
      this.init = async () => {

        // set shortcut to helper functions
        $ = this.ccm.helper;
        
        // listen to datastore changes => restart
        if ( $.isDatastore( this.data.store ) ) this.data.store.onchange = incrementalUpdate;

        /**
         * @summary update table incrementally
         * @param {object} data - new data delivered via WebSockets
         */
        function incrementalUpdate( data ){
          const jsondiffs = jsondiff( dataset.table, data.table );

          jsondiffs.forEach( diff => {
            const cell = table.cellIndex[ diff.key ];
            if ( cell !== document.activeElement ) cell.textContent = diff.value;
          });

          dataset = data;
        }

        /**
         * @summary calculates the flat diff of to JSON values
         * @param {object} table1 - table with old values
         * @param {object} table2 - table with new values
         * @returns {array} key,value-pairs of differences
         */
        function jsondiff( table1, table2 ){
          if ( ! table1 || ! table2 ) return [];
          const result = [];
          Object.keys( table2 ).forEach( key => {
            if ( ! table1[ key ] ){
              result.push( { key, value: table2[ key ] } );
            } else {
              if ( table1[ key ] !== table2[ key ] ){
                result.push( { key, value: table2[ key ] } );
              }
            }
          });
          return result;
        }
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
      
        dataset = await $.dataset( this.data );
        if ( ! dataset ) dataset = { key: this.data.key };

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main ) );

        // render login/logout area
        if ( this.user ) $.append( this.element.querySelector( '#top' ), this.user.root );

        // render main HTML structure into shadow DOM
        table = new Table( this.element.querySelector( '#table' ), 3, 2, dataset );

      };
      
      /**
       * current state of this table editor
       * @returns {Object} state of table editor
       */
      this.getValue = () => dataset;
      
    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
