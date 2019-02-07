/**
 * @overview ccm component for treecontent
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT)
 * @version latest (4.0.0)
 * @changes
 * version 4.0.0 07.02.2019 one vote per user, buttons for refresh and sort, recursive descent sort
 * version 3.1.0 06.02.2019 position cursor
 * version 3.0.0 03.02.2019 incremental update
 * version 2.2.0 02.02.2019 add user, pseudonym, remove listeners, stopImmediatePropagation
 * version 2.1.0 01.02.2019 add login, logger, sorting
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
    version: [4,0,0],
    
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
      header: "Leitbild Lehre 1",
      html: {
        main: {
          inner: [
            { class: 'top', inner: [
                { tag: 'h1', inner: '%header%' },
                { class: 'headerbuttons', inner: [
                    { tag: 'button', id: 'refresh', class: 'headerline', inner: 'refresh', title: 'load from server' },
                    { tag: 'button', id: 'sort', class: 'headerline', inner: 'sort', title: 'sort by thumbsup or -down or both' },
                    { tag: 'input', type: 'checkbox', id: 'thumbsup', class: 'headerline', checked: true, title: 'sort by thumbsup', inner: 'x' },
                    { tag: 'input', type: 'checkbox', id: 'thumbsdown', class: 'headerline', checked: true, inner: 'x', title: 'sort by thumbsdown' }
                  ]
                }
              ]
            },
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

      // data: {
      //   "store": [ "ccm.store", 'https://ccmjs.github.io/mkaul-components/treecontent/resources/datasets.js' ],
      //   "key": "small"
      // },

      data: {
        "store": [ "ccm.store", { "name": "treecontent", "url": "wss://ccm2.inf.h-brs.de", "dataset": "test" } ],
        "key": "test"
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

      one_click_per_thumb: true,

      SALT: 'anjcsp8r48763hkb',


    // onchange: function(){ console.log( this.getValue() ); },
      
      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/treecontent/resources/default.css' ],
      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/treecontent/resources/default.css' ],
      // "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
      "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", {
          "key": "greedy",
          "logging": {
            "data": true,
            "browser": true,
            "parent": true,
            "root": true,
            "user": true,
            "website": true
          },
          "onfinish": { "log": false }
        } ],
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
        // if ( $.isDatastore( this.data.store ) ) this.data.store.onchange = this.start;

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
         * username of logged in member
         * @type {string}
         */
        let user;

        if ( self.user ){
          // login user, if not logged in
          await self.user.login();
          user = this.user.data().user;
        } else {
          user = await pseudonym();
        }

        async function pseudonym(){
          const buf = await digestMessage(`${navigator.appVersion};${navigator.hardwareConcurrency};${navigator.deviceMemory};${JSON.stringify(navigator.languages)};${navigator.product};${navigator.productSub};${navigator.userAgent};${navigator.vendor};` + self.SALT);
          return String.fromCharCode.apply(null, new Uint16Array(buf));
        }

        async function digestMessage(message, encoding = 'utf-16') {
          let encoder = new TextEncoder(encoding);
          let data = encoder.encode(message);
          return await window.crypto.subtle.digest('SHA-384', data);
        }

        dataset = await $.dataset( this.data );
        if ( ! dataset.id ) dataset.id = 'a';

        // given default values? => integrate them as defaults into initial values
        if ( this.ignore ) dataset = $.integrate( this.ignore.defaults, dataset, true );

        // logging of 'start' event
        self.logger && self.logger.log( 'start', { user: user, dataset: $.clone( dataset ) } );

        // render main HTML structure
        // The id-s in the tree are "a" for the root, "a_1" for the first child,
        // "a_2" for the second child, "a_1_1" for the first grandchild, etc.

        /**
         * index ID => row
         * @type {{Object<ID, Object>}}
         */
        const rowIndex = {};
        rowIndex[ dataset.id ] = dataset;

        $.setContent( this.element, $.html( self.html.main, {
          header: self.header,
          tree: json_from_data(
            dataset,
            dataset.id ) // start all id-s with this prefix
        } ) );

        const sort_button = self.element.querySelector('#sort');
        sort_button.addEventListener('click', e => {
          sort( this.element.querySelector('.tree li button') );
        });

        const refresh_button = self.element.querySelector('#refresh');
        refresh_button.addEventListener('click', e => {
          self.start();
        });

        const thumbsup = self.element.querySelector('#thumbsup');
        const thumbsdown = self.element.querySelector('#thumbsdown');


        async function incrementalUpdate( data ){
          if ( data && self.data && data.key !== self.data.key ) return; // same store, but different document
          const activeElement = self.element.querySelector('li > .label:hover');
          const jsondiffs = jsondiff( data );
          // console.log( jsondiffs );
          jsondiffs.forEach( ({type, id, diff}) => {
            switch( type ){
              case 'class':
                if ( diff.class === 'empty' ) debugger;
                self.element.querySelector('#' + id).classList.remove('empty');
                delete rowIndex[ id ].class;
                if ( activeElement !== self.element.querySelector('#' + id + ' > .label') ){
                  self.element.querySelector('#' + id + ' > .label').innerText = '';
                  makeNextChild( id );
                }
                break;
              case 'label':
                if ( activeElement !== self.element.querySelector('#' + id + ' > .label') ){
                  self.element.querySelector('#' + id + ' > .label').innerText = diff.label;
                  rowIndex[ id ].label = diff.label;
                  self.element.querySelector('#' + id + ' > button')
                    .innerText = ( diff.label.length === 0 ) ? '&Omicron;' :
                      ( rowIndex[ id ].inner ? '-' : '+' );
                }
                break;
              case 'likes':
                self.element.querySelector('#' + id + ' > .likes').innerText = diff.likes;
                rowIndex[ id ].likes = diff.likes;
                break;
              case 'dislikes':
                self.element.querySelector('#' + id + ' > .dislikes').innerText = diff.dislikes;
                rowIndex[ id ].dislikes = diff.dislikes;
                break;
              case 'insert': // makeFirstChild or makeNextChild
                const parentId = id.split('_').slice(0,-1).join('_');
                const parentRow = rowIndex[ parentId ];
                const parentElem = self.element.querySelector('#' + parentId );
                if ( parentRow.inner && parentRow.inner.length > 0 ){
                  makeNextChild( id );
                } else {
                  makeFirstChild( parentRow, parentElem );
                }
                break;
              default:
                debugger;
            }
          });
        }


        // listen to datastore changes => restart
        if ( $.isDatastore( this.data.store ) ) this.data.store.onchange = incrementalUpdate;

        function jsondiff( data ){
          const result = [];
          const newRowIndex = makeRowIndex( data );
          for ( const key in newRowIndex ) {
            if ( ! newRowIndex.hasOwnProperty(key) ) continue;
            const oldValue = rowIndex[ key ];
            if ( oldValue ){
              const diffs = objectDiffs( oldValue, newRowIndex[key] );
              for ( const diff of diffs ) {
                diff.id = key;
                result.push( diff );
              }
            } else {
              result.push({type: 'insert', id: key, diff: newRowIndex[key]});
              // avoid double insert
              // see makeNextChild( rowIndex[ id ], self.element.querySelector('#' + id) );
            }
          }
          return result;
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

        function objectDiffs(a,b){
          const result = [];
          for ( const key in a ){
            if ( ! ['label','likes','dislikes','class'].includes( key ) ) continue;
            if ( a[key] !== b[key] ) result.push( { type: key, diff: {[key]: b[key]} } );
          }
          return result;
        }

        addListeners( self.element );

        // console.log( 1, dataset );

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
              // if ( row.class === 'empty' ) return;
              if ( row.id ){
                count += 1;
              } else {
                row.id = next_id();
              }
              rowIndex[ row.id ] = row;
              const item = $.format(self.html.item, row);
              item.id = row.id;
              if ( row.class === 'empty' ){
                item.inner[0].inner = '&Omicron;'
              } else {
                item.inner[0].inner = row.inner ? '-' : '+';
              }
              item.style = `font-size: ${Math.max( self.font_max_size - self.font_decrease_factor * level(row)/2, self.font_min_size ) }px;`;
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

          // console.log( 2, parentRow );

          return result;

          function append_empty_row(){
            const last = list[ list.length - 1 ];
            if ( list.length > 0 && (last.class === 'empty' || last.label.trim().length === 0) ) return;
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

        function likesClickListener(e){
          const id = this.parentNode.id;
          const classList = this.classList[0].trim();
          const row = rowIndex[ id ];
          if ( ! row[ 'users' ] ) row[ 'users' ] = {};
          const users = row[ 'users' ];
          if ( ! users[ classList ] && classList ) users[ classList ] = {};
          if ( self.one_click_per_thumb && classList && ! users[ classList ][ user ] ) {
            users[ classList ][ user ] = true;
            row[ classList ] += 1;
            this.innerText = parseInt( this.innerText ) + 1;
          }
          if ( self.one_click_per_thumb ) this.removeEventListener('click', likesClickListener );
          save();
          self.logger && self.logger.log( this.classList.toString(), {
            user: user,
            id: this.parentNode.id,
            label1: this.previousSibling.innerText,
            label2: this.previousSibling.previousSibling.innerText,
            count: this.innerText
          } );
        }

        function sort( clickedNode ){
          const parent = clickedNode.parentNode;
          const grandParent = parent.parentNode;
          const allItems = getAllSiblings( parent );
          const valueList = [];

          const itemValue = allItems.reduce((allValues,elem)=>{
            const thumbsUpValue = parseInt( elem.querySelector('.likes').innerText );
            const thumbsDownValue = parseInt( elem.querySelector('.dislikes').innerText );
            const sum = ( elem.innerText.length === 0 || elem.classList.contains( 'empty' ) )
              ? -9999
              :  ( thumbsup.checked ? thumbsUpValue : 0 ) - ( thumbsdown.checked ? thumbsDownValue : 0 );
            allValues[elem.id] = sum;
            valueList.push( sum );
            return allValues;
          },{});

          const sortedIds = Object.keys( itemValue ).sort(
            (a,b)=> isEmpty(rowIndex[a],parent)
              ? -9999
              : itemValue[a]-itemValue[b]);

          if ( ! sorted() ) sortedIds.forEach(id=>{
            const movedItem = grandParent.querySelector('#'+id);
            grandParent.prepend( movedItem );
            // recursive descent
            if ( rowIndex[ id ].inner && rowIndex[ id ].inner.length > 0 ) sort( movedItem.querySelector('#' + rowIndex[ id ].inner[0].id + ' button' ) );
          });
          function sorted(){
            for (let i = 0; i < valueList.length-1; i++) {
              if ( valueList[i] < valueList[i+1] ) return false;
            }
            return true;
          }
          function getAllSiblings(elem) {
            var sibs = [];
            elem = elem.parentNode.firstChild;
            do {
              if (elem.nodeType === 3) continue; // text node
              sibs.push(elem);
            } while (elem = elem.nextSibling);
            return sibs;
          }
        }

        function addListeners( root ){

          [...root.querySelectorAll('li')].forEach( item => {
            const label = item.querySelector('.label');
            label.removeEventListener('input', inputListener ); // if any
            label.addEventListener('input', inputListener );
            const button = item.querySelector('button');
            button.removeEventListener('click', buttonClickListener );
            button.addEventListener('click', buttonClickListener );
            const likes = item.querySelector('.likes');
            likes.removeEventListener('click', likesClickListener );
            likes.addEventListener('click', likesClickListener );
            const dislikes = item.querySelector('.dislikes');
            dislikes.removeEventListener('click', likesClickListener );
            dislikes.addEventListener('click', likesClickListener );
          });

          function inputListener(e){
            e.stopImmediatePropagation();

            const label = this;
            const item  = this.parentNode;
            const row   = rowIndex[ item.id ] || dataset;

            if ( isEmpty( row, item ) ){
              delete row.class;
              item.classList.remove( 'empty' );
              e.target.classList.remove('empty');
              label.innerText = e.data;
              row.label = e.data;
              makeNextChild( item.id );
              // console.log( 3, dataset );
            } else if ( ! nextChild( item.id  ) ){
              makeNextChild( item.id );
            }

            item.querySelector('button').innerText = '+';
            updateDataset( item );
            save();
            placeCaretAtEnd( label );
            self.logger && self.logger.log( 'input', {
              user: user,
              id: item.id,
              label: label
            } );
          }

          function nextChild( id ){
            const id_split = id.split('_');
            const last = parseInt( id_split[ id_split.length - 1 ] );
            const next = [...id_split.slice(0,-1), last+1 ].join('_');
            return rowIndex[ next ];
          }

          // https://stackoverflow.com/questions/4233265/contenteditable-set-caret-at-the-end-of-the-text-cross-browser
          function placeCaretAtEnd(el) {
            el.focus();
            if ( ( self.element.parentNode.getSelection || document.getSelection ) &&  document.createRange ) {
              const range = document.createRange();
              range.selectNodeContents(el);
              range.collapse(false);
              const sel = self.element.parentNode.getSelection ? self.element.parentNode.getSelection() : document.getSelection();
              sel.removeAllRanges();
              sel.addRange(range);
            } else if ( document.body.createTextRange ) {
              const textRange = document.body.createTextRange();
              textRange.moveToElementText(el);
              textRange.collapse(false);
              textRange.select();
            }
          }

          function buttonClickListener(e){
            e.stopImmediatePropagation();
            const item  = this.parentNode;
            const ul = item.querySelector('ul');
            const row = rowIndex[ item.id ];
            if ( this.innerText === '+' ){
              this.innerText = '-';

              if ( ul ){
                ul.style.transition = 'display 2s';
                ul.style.display = 'block';
              }
              if ( ! row.inner ){
                makeFirstChild( row, item );
                updateDataset( item );
                save();
                // console.log( 4, dataset );
              }
            } else if ( this.innerText === '-' ){
              this.innerText = '+';
              if ( ul ){
                ul.style.transition = 'display 2s';
                ul.style.display = 'none';
              }
            }
            self.logger && self.logger.log( 'button', {
              user: user,
              id: item.id,
              button: this.innerText,
              label: this.nextSibling.innerText
            } );
          }

        }

        function makeFirstChild( parentRow, parentElem ){
          if ( isEmpty( parentRow, parentElem ) ) return;
          const empty_row = $.clone( self.empty_row );
          empty_row.id = parentRow.id + '_' + 1;
          parentRow.inner = [ empty_row ];
          rowIndex[ empty_row.id ] = empty_row;

          const firstItem = $.format( self.html.item, empty_row );
          firstItem.id = empty_row.id;
          firstItem.inner[0].inner = '&Omicron;';
          firstItem.class = 'empty';

          const firstChild = $.html( { tag: 'ul', inner: [ firstItem ] } );
          parentElem.appendChild( firstChild );
          parentElem.querySelector('button').innerText = '-';
          addListeners( firstChild );
        }

        function makeNextChild( id ){
          const row = rowIndex[ id ];
          let item = self.element.querySelector('#'+id);

          if ( isEmpty( row, item ) ) return;

          const empty_row = $.clone( self.empty_row );
          const id_split = id.split('_');
          const next_nr = row ? parseInt( id_split[id_split.length-1] ) + 1 : parseInt( id_split[id_split.length-1] );
          if ( ! item ){
            const last_id = [ ...id_split.slice(0,-1), parseInt( id_split[id_split.length-1] ) - 1 ].join('_') ;
            item = self.element.querySelector('#'+last_id);
          }

          id_split.pop();
          rowIndex[ id_split.join('_') ].inner.push( empty_row );
          empty_row.id = [ ...id_split, next_nr ].join('_');
          rowIndex[ empty_row.id ] = empty_row;

          const nextItem = $.format( self.html.item, empty_row );
          nextItem.id = empty_row.id;
          nextItem.inner[0].inner = '&Omicron;';
          nextItem.class = 'empty';

          const nextChild = $.html( nextItem );
          insertAfter( nextChild, item );
          addListeners( nextChild.parentNode );
        }

        function isEmpty( row, elem ){
          if ( ! elem ) return false;
          if ( row.class === 'empty' ) return true;
          if ( row.label && row.label.trim().length === 0 ) return true;
          if ( elem.classList.contains('empty') ) return true;
          if ( elem.querySelector('.label').innerText.trim().length === 0 ) return true;
          return false;
        }

        function getParentRow( row ){
          return rowIndex[ row.id.split('_').slice(0,-1).join('_')];
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
          return row.id.length - (dataset.id || "a").length;
        }

        /**
         * updates app state data and restarts app
         * @returns {Promise<void>}
         */
        async function save() {

          // no datastore? => abort
          if ( !$.isDatastore( self.data.store ) ) return;

          dataset.user = user;      // protocol who has written finally to store
          dataset.key = self.data.key;   // same store

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