/**
 * @overview ccm component for notebook
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 10.02.2019 initial build
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
    name: 'notebook',
    version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      title: "Collaborative Notebook",

      html: { // html.main.inner[0].inner[1].inner
        main: {
          inner: [
            { class: 'header', inner: [
                { tag: 'h1', inner: '%title%' }
                // { tag: 'button', id: 'clear', class: 'headerline', inner: 'clear', title: 'delete all' },
                // { tag: 'button', id: 'load', class: 'headerline', inner: 'load', title: 'load from file' },
                // { tag: 'button', id: 'save', class: 'headerline', inner: 'save', title: 'save to file' }
              ]
            },
            { id: 'notebook', inner: [
                { id: 'tree' },
                { id: 'editor' }
              ]
            }
          ]
        }
      },

      tree: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/treecontent/versions/ccm.treecontent-4.0.0.js", {
        "html.main.inner.0": "",
        font_max_size: 24,
        font_min_size: 8,
        font_decrease_factor: 2,
      } ],

      editor: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/content_editor/versions/ccm.content_editor-6.0.0.js", { enabled: ['undo', 'redo', 'bold', 'italic', 'insertUnorderedList', 'insertOrderedList', 'h1', 'h2', 'p'] } ],
      
      data: {
        "store": [ "ccm.store", 'https://ccmjs.github.io/mkaul-components/notebook/resources/datasets.js' ],
        "key": "small"
      },

      log_load_save: true,

      // data: {
      //   "store": [ "ccm.store", { "name": "notebook", "url": "wss://ccm2.inf.h-brs.de", "dataset": "test" } ],
      //   "key": "test"
      // },

      // onchange: function( dataset ){ console.log( dataset ); },

      // htmldiff: [ "ccm.load", {
      //   "url": "https://ccmjs.github.io/mkaul-components/notebook/resources/htmldiff.mjs",
      //   "type": "module",
      //   "import": "diff"
      // } ],
      
      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/notebook/resources/default.css' ],
      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/notebook/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/notebook/resources/configs.js', 'log' ] ],
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

        /**
         * index ID => row
         * @type {{Object<ID, Object>}}
         */
        let rowIndex = null;
        let state = null;  // state is the ID currently selected
        let lastContent = null; // avoid thrashing by remebering old value

        // caches
        const editor_cache = {};  // reuse cc instances of editors
        const root_cache = {};    // reuse divs, in which editors are rendered
        let content_instance;     // different instances of content_editor
      
        dataset = await $.dataset( this.data );
        init_dataset();

        function clear(){
          dataset = null;
          init_dataset();
        }

        function init_dataset(){
          if ( ! dataset ) dataset = { key: self.data.key };
          if ( ! dataset.id ) dataset.id = 'a';

          // given default values? => integrate them as defaults into initial values
          if ( self.ignore ) dataset = $.integrate( self.ignore.defaults, dataset, true );

          rowIndex = makeRowIndex( dataset );

          // store own edits into dataset
          if ( state && content_instance && rowIndex[ state ].content !== content_instance.getValue().inner && rowIndex[ state ].content !== lastContent ){
            lastContent = rowIndex[ state ].content; // avoid thrashing
            rowIndex[ state ].content = content_instance.getValue().inner;
            $.wait( 200, save );  // Caution: Two different values compete
                                  // and yield infinite loop of writes and re-writes
          }
        }

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        const main = $.html( self.html.main, { title: self.title } );
        const tree = main.querySelector('#tree');
        const clearButton = main.querySelector('#clear');
        const loadButton = main.querySelector('#load');
        const saveButton = main.querySelector('#save');

        clearButton && clearButton.addEventListener('click', e => {
          if ( confirm('Delete all?') ){
            clear();
            self.start();
          }
        });

        loadButton && loadButton.addEventListener('click', e => {
          const filename = prompt('File to load?', 'file.json');
          if ( filename ){
            dataset = ccm.load( filename );
            init_dataset();
          }
        });

        saveButton && saveButton.addEventListener('click', e => {
          const filename = prompt('File to save?', 'file.json');
          if ( filename ) download( dataset, filename, 'application/json');
        });

        function download(content, fileName, contentType) {
          const a = document.createElement("a");
          const file = new Blob([content], {type: contentType});
          a.href = URL.createObjectURL(file);
          a.download = fileName;
          a.click();
        }

        // render main HTML structure
        $.setContent( self.element, main );

        // editor configs
        const editor_config = ( id, row ) => {
          if ( ! root_cache[ id ] ){  // root with this id does not exist yet
            root_cache[ id ] = document.createElement('div');
            root_cache[ id ].id = 'editor';
          }
          $.replace( self.element.querySelector('#editor'), root_cache[ id ] );
          return { root: root_cache[ id ],
            // header: row ? row.label : "",
            data: { key: self.data.key, inner: row && row.content ? row.content : `<b>${row ? row.label : "Edit here"}</b>` },
            onchange: editor_dataset => {
              const id_row = find( id, dataset );
              if ( id_row ){
                id_row.content = editor_dataset.inner;
                delete id_row.class;
              } else {
                insert( id, editor_dataset.inner );
              }
              save();
            } };
        };

        const tree_instance = await self.tree.start({
          root: tree,
          data: dataset,
          onhover: async id => {
            const row = find( id, dataset );
            if ( editor_cache[ id ] ){
              Object.assign( editor_cache[ id ], editor_config( id, row ) );
              await editor_cache[ id ].start();
            } else {
              editor_cache[ id ] = await self.editor.start( editor_config( id, row ) );
            }
            state = id;
            content_instance = editor_cache[ id ];
          },
          onchange: ( tree_dataset ) => {
            merge( dataset, tree_dataset );
            tree_dataset = dataset;
            save();
          }
        });

        /**
         * merge new_dataset into dataset
         * @param dataset old data
         * @param new_dataset new data to merged
         */
        function merge( dataset, new_dataset ){
          for ( const [ key, value ] of Object.entries( new_dataset ) ){
            if ( ['inner','content'].includes( key ) ) continue;
            dataset[ key ] = value;
          }
          if ( new_dataset.inner ){
            if ( dataset.inner ){
              for ( const newObj of new_dataset.inner ){
                const oldObj = find( newObj.id, dataset );
                if ( oldObj ){
                  merge( oldObj, newObj );
                } else {
                  dataset.inner.push( $.clone( newObj ) );
                }
              }
            } else dataset.inner = $.clone( new_dataset.inner );
          }
        }

        function find( id, dataset ){
          if ( dataset.id === id ) return dataset;
          if ( dataset.inner ){
            for ( const obj of dataset.inner ) {
              const next = find( id, obj );
              if ( next ) return next;
            }
          }
          return null;
        }

        function insert( id, content ){
          const parent = find( id.split('_').slice(0,-1).join('_'), dataset );
          if ( ! parent.inner ) parent.inner = [];
          parent.inner.push({
            label: '',
            likes: 0,
            dislikes: 0,
            id: id,
            content: content
          });
        }

        // listen to datastore changes
        if ( $.isDatastore( this.data.store ) ) this.data.store.onchange = incrementalUpdate;
        let loadCounter = 0;
        function incrementalUpdate( data ){
          if ( self.log_load_save ){ loadCounter += 1; console.log( 'loadCounter = ' + loadCounter ) }
          if ( ! data || ! self.data || data.key !== self.data.key ) return; // same store, but different document
          dataset = data;
          init_dataset();
          tree_instance.incrementalUpdate( data );
        }

        function makeRowIndex( data ){
          const index = {};
          traverse(data);
          function traverse(data){
            if ( data.id ) index[ data.id ] = data;
            if (data.inner){
              for ( const next of data.inner ){
                traverse( next );
              }
            }
          }
          return index;
        }

        let saveCounter = 0;
        
        /**
         * updates app state data
         * @returns {Promise<void>}
         */
        async function save() {
          if ( self.log_load_save ){
            saveCounter += 1; console.log( 'saveCounter = ' + saveCounter );
          }

          self.onchange && self.onchange( dataset );

          // no datastore? => abort
          if ( !$.isDatastore( self.data.store ) ) return;

          await self.data.store.set( dataset );  // update app state data

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