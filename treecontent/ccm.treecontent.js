/**
 * @overview ccm component for treecontent
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 29.01.2019 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( function (s, radix) {

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
            { tag: 'button', class: 'plus', inner: '%button_label%' },
            { class: 'label', contenteditable: true, inner: '%label%' },
            { class: 'likes', inner: '%likes%'},
            { class: 'dislikes', inner: '%dislikes%'},
          ]
        }
      },
      
      data: {
        "store": [ "ccm.store", './resources/datasets.js' ],
        "key": "medium"
      },

      empty_row: {
        class: 'empty',
        label: 'Add new text here ...',
        button_label: '&Omicron;',
        likes: 0,
        dislikes: 0
      },

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

        /**
         * index ID => row
         * @type {{Object<ID, Object>}}
         */
        const rowIndex = {};

        // render main HTML structure
        $.setContent( this.element, $.html( self.html.main, {
          header: self.header,
          tree: json_from_data( dataset, 'a', 1 )
        } ) );
        addListeners( self.element );

        console.log( 1, dataset );

        /**
         * transform dataset into JSON format as intermediate datastructure for rendering HTML
         * @param dataset
         * @param parent_id
         * @returns {*}
         */
        function json_from_data( dataset, parent_id ) {
          let list = dataset.inner;
          let count = 1;
          const result = $.clone( self.html.list );
          if (list) {
            list.forEach(row => {
              if ( row.class === 'empty' ) return;
              if ( ! row.id ) row.id = next_id();
              rowIndex[ row.id ] = row;
              if (! row.button_label ) row.button_label = row.inner ? '-' : '+';
              const item = $.format(self.html.item, row);
              item.id = row.id;
              item.style = `font-size: ${36 - 2 * level(row)}px;`;
              result.inner.push( item );
              if ( row.inner ){
                if ( ! item.inner ) item.inner = [];
                item.inner.push( json_from_data( row, row.id ) );
              }
            });
          } else {
            list = [];
            dataset.inner = list;
          }

          append_empty_row();

          console.log( 2, dataset );

          return result;

          function append_empty_row(){
            if ( list.length > 0 && list[ list.length - 1 ].class === 'empty' ) return;
            const empty_row = $.clone( self.empty_row );
            list.push( empty_row );
            empty_row.id = next_id();
            rowIndex[ empty_row.id ] = empty_row;
            const empty_item = $.format( self.html.item, empty_row );
            empty_item.id = empty_row.id;
            empty_item.class = 'empty';
            result.inner.push( empty_item );
          }

          function next_id(){ return parent_id + '_' + count++ }

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
            const row   = rowIndex[ item.id ];
            if ( item.classList.contains( 'empty' ) ){
              delete row.class;
              label.innerText = '';
              // label.innerText = e.data; // TODO move cursor forward
            }
            item.classList.remove('empty' );
            item.querySelector('button').innerText = '+';
            updateDataset( item );
          }

          function buttonClickListener(e){
            const ul = this.parentNode.parentNode.querySelector('ul');
            const row = rowIndex[ this.parentNode.id ];
            if ( this.innerText === '+' ){
              this.innerText = '-';
              if ( ul ) ul.style.display = 'block';
              if ( ! row.inner ){
                const newChild = $.html( json_from_data( row, this.parentNode.id ) );
                insertAfter( newChild, this.parentNode );  // TODO make child
                addListeners( newChild );
                updateDataset( this.parentNode );
                console.log( 3, dataset );
              }
            } else if ( this.innerText === '-' ){
              this.innerText = '+';
              if ( ul ) ul.style.display = 'none';
            }
          }

          function likesClickListener(e){
            this.innerText = parseInt( this.innerText ) + 1;
            updateDataset( this.parentNode );
          }
        }

        function updateDataset( item ){
          const id = item.id;
          const row = rowIndex[ id ];
          const label = item.querySelector('.label');
          const button = item.querySelector('button');
          const likes = item.querySelector('.likes');
          const dislikes = item.querySelector('.dislikes');
          row.label = label.innerText;
          row.button_label = button.innerText;
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