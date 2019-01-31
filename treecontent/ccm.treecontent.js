/**
 * @overview ccm component for treecontent
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT)
 * @version latest (2.0.0)
 * @changes
 * version 2.0.0 31.01.2019 add save via WebSocket get und set
 * version 1.1.0 31.01.2019 bugfixes, improve layout and functions
 * version 1.0.0 29.01.2019 initial build
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
    name: 'treecontent',
    // version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      header: "Tree Content",
      html: {
        main: {
          inner: [
            { tag: 'h1', inner: '%header%' },
            { class: 'tree', inner: '%tree%' }
          ]
        },
        list: { tag: 'ul', inner: [] },
        item: {
          tag: 'li',
          inner: [
            { tag: 'button', class: 'plus' },
            { class: 'label', contenteditable: true, inner: '%label%' },
            { class: 'likes', inner: '%likes%'},
            { class: 'dislikes', inner: '%dislikes%'},
          ]
        }
      },

      "data": {
        "store": [ "ccm.store", { "name": "treecontent", "url": "wss://ccm2.inf.h-brs.de" } ],
        "key": "collab"
      },

      empty_row: {
        class: 'empty',
        label: '',
        likes: 0,
        dislikes: 0
      },

      font_max_size: 36,
      font_min_size: 8,
      font_decrease_factor: 2,

      // onchange: function(){ console.log( this.getValue() ); },
      
      css: [ 'ccm.load',  './resources/default.css' ],
      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/treecontent/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/treecontent/resources/configs.js', 'log' ] ],
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
        if ( ! dataset ) dataset = {};
        if ( ! dataset.key ) dataset.key = $.generateKey();

        // given default values? => integrate them as defaults into initial values
        if ( this.ignore ) dataset = $.integrate( this.ignore.defaults, dataset, true );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // render main HTML structure
        // The id-s in the tree are "a" for the root, "a_1" for the first child,
        // "a_2" for the second child, "a_1_1" for the first grandchild, etc.

        const rootLabel = dataset.id || 'a';

        /**
         * index ID => row
         * @type {{Object<ID, Object>}}
         */
        const rowIndex = {};
        rowIndex[ rootLabel ] = dataset;

        $.setContent( this.element, $.html( self.html.main, {
          header: self.header,
          tree: json_from_data(
            dataset,
            rootLabel ) // start all id-s with this prefix
        } ) );

        addListeners( self.element );

        console.log( 1, dataset );

        /**
         * transform dataset into JSON format as intermediate datastructure for rendering HTML
         * @param parentRow
         * @param parentID
         * @returns {*}
         */
        function json_from_data( parentRow, parentID ) {
          let list = parentRow.inner;
          let count = 1;
          const result = $.clone( self.html.list );
          if (list) {
            list.forEach(row => {
              if ( row.class === 'empty' ) return;
              if ( ! row.id ) row.id = next_id();
              rowIndex[ row.id ] = row;
              const item = $.format(self.html.item, row);
              item.id = row.id;
              item.inner[0].inner = row.inner ? '-' : '+';
              item.style = `font-size: ${Math.max( self.font_max_size - self.font_decrease_factor * level(row), self.font_min_size ) }px;`;
              result.inner.push( item );
              if ( row.inner ){
                if ( ! item.inner ) item.inner = [];
                item.inner.push( json_from_data( row, row.id ) );
              }
            });
          } else {
            list = [];
            parentRow.inner = list;
          }

          append_empty_row();

          console.log( 2, parentRow );

          return result;

          function append_empty_row(){
            if ( list.length > 0 && list[ list.length - 1 ].class === 'empty' ) return;
            const empty_row = $.clone( self.empty_row );
            list.push( empty_row );
            empty_row.id = next_id();
            rowIndex[ empty_row.id ] = empty_row;
            const empty_item = $.format( self.html.item, empty_row );
            empty_item.id = empty_row.id;
            empty_item.inner[0].inner = '&Omicron;';
            empty_item.class = 'empty';
            result.inner.push( empty_item );
          }

          function next_id(){ return parentID + '_' + count++ }

        }

        function addListeners( root ){

          [...root.querySelectorAll('li')].forEach( item => {
            const label = item.querySelector('.label');
            label.addEventListener('input', inputListener.bind(label) );
            const button = item.querySelector('button');
            button.addEventListener('click', buttonClickListener.bind(button) );
            const likes = item.querySelector('.likes');
            likes.addEventListener('click', likesClickListener.bind(likes) );
            const dislikes = item.querySelector('.dislikes');
            dislikes.addEventListener('click', likesClickListener.bind(dislikes) );
          });

          function inputListener(e){
            const label = this;
            const item  = this.parentNode;

            const row   = item.id ? rowIndex[ item.id ] : dataset;
            if ( item.classList.contains( 'empty' ) ){
              delete row.class;
              label.innerText = '';
              // placeholder solution:
              // https://stackoverflow.com/questions/20726174/placeholder-for-contenteditable-div
              // label.innerText = e.data; // TODO move cursor forward
              makeNextChild( row, item );
              console.log( 3, dataset );
            }
            item.classList.remove('empty' );
            item.querySelector('button').innerText = '+';
            updateDataset( item );
            save();
          }

          function buttonClickListener(e){
            const item  = this.parentNode;
            const ul = item.parentNode.querySelector('ul');
            const row = rowIndex[ item.id ];
            if ( this.innerText === '+' ){
              this.innerText = '-';
              if ( ul ) ul.style.display = 'block';
              if ( ! row.inner ){
                makeFirstChild( row, item );
                updateDataset( item );
                save();
                console.log( 4, dataset );
              }
            } else if ( this.innerText === '-' ){
              this.innerText = '+';
              if ( ul ) ul.style.display = 'none';
            }
          }

          function makeFirstChild( parentRow, parentItem ){
            const empty_row = $.clone( self.empty_row );
            empty_row.id = parentRow.id + '_' + 1;
            parentRow.inner = [ empty_row ];
            rowIndex[ empty_row.id ] = empty_row;

            const firstItem = $.format( self.html.item, empty_row );
            firstItem.id = empty_row.id;
            firstItem.inner[0].inner = '&Omicron;';
            firstItem.class = 'empty';

            const firstChild = $.html( { tag: 'ul', inner: [ firstItem ] } );
            parentItem.appendChild( firstChild );
            addListeners( firstChild );
          }

          function makeNextChild( parentRow, item ){
            const empty_row = $.clone( self.empty_row );
            const id_split = parentRow.id.split('_');
            const next_nr = parseInt( id_split[id_split.length-1] ) + 1;
            id_split.pop();
            rowIndex[ id_split.join('_') ].inner.push( empty_row );
            empty_row.id = id_split.join('_') + '_' + next_nr;
            rowIndex[ empty_row.id ] = empty_row;

            const nextItem = $.format( self.html.item, empty_row );
            nextItem.id = empty_row.id;
            nextItem.inner[0].inner = '&Omicron;';
            nextItem.class = 'empty';

            const nextChild = $.html( nextItem );
            insertAfter( nextChild, item );
            addListeners( nextChild.parentNode );
          }

          function likesClickListener(e){
            this.innerText = parseInt( this.innerText ) + 1;
            updateDataset( this.parentNode );
            save();
          }
        }

        function updateDataset( item ){
          const id = item.id;
          const row = rowIndex[ id ];
          const label = item.querySelector('.label');
          const likes = item.querySelector('.likes');
          const dislikes = item.querySelector('.dislikes');
          row.label = label.innerText;
          row.likes = parseInt( likes.innerText );
          row.dislikes = parseInt( dislikes.innerText );
          if ( ! row.inner && item.nextSibling && item.nextSibling.tagName === 'UL' ){
            row.inner = [];
            const firstChild = item.nextSibling.firstChild;
            updateDataset( firstChild );
          }
        }

        function insertAfter(newNode, referenceNode) {
          referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }

        function level( row ){
          return row.id.length;
        }

        /**
         * updates app state data and restarts app
         * @param {boolean} [no_restart] - prevent implicit app restart
         * @returns {Promise<void>}
         */
        async function save() {

          // no datastore? => abort
          if ( !$.isDatastore( self.data.store ) ) return;

          await self.data.store.set( dataset );  // update app state data
          // await self.start();     // restart app

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