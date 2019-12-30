/**
 * @overview ccm component for peer_builder
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 25.12.2019 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "peer_builder",
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
      number_peers: 3,
      above_min_percent: 10,
      peers_key_prefix: "review",
      html: {
        main: {
          inner: [
            { tag: "h2", inner: "Peer Review Builder" },
            { class: "config", inner: [
                { tag: "label", inner: [
                    { tag: "span", inner: "Number of Peers" },
                    { tag: "input", type: "number", class: "number_peers", placeholder: "3", value: "%number_peers%" }
                  ] },
                { tag: "label", inner: [
                    { tag: "span", inner: "Above Min Percent", title: "Do not review empty solutions. Therefore skip solutions that are too small. Which percentage above minimum is necessary?" },
                    { tag: "input", type: "number", class: "above_min_percent", placeholder: "10", value: "%above_min_percent%" }
                  ] },
                { tag: "label", inner: [
                    { tag: "span", inner: "Taskgroup" },
                    { tag: "input", type: "text", class: "taskgroup", placeholder: "le05_a1", value: "%taskgroup%" }
                  ] },
                { class: "formats" },
                { tag: "label", inner: [
                    { tag: "span", inner: "Server URL" },
                    { tag: "input", type: "url", class: "solutions_url", placeholder: "https://...", value: "%solutions_url%" }
                  ] },
                { tag: "label", inner: [
                    { tag: "span", inner: "Database Name" },
                    { tag: "input", type: "text", class: "solutions_name", placeholder: "https://...", value: "%solutions_name%" }
                  ] },
                { tag: "button", class: "shuffle", onclick: "%shuffle%", inner: "Shuffle !", title: "random peers, but with some conflicts regarding peers reviewing each other" },
                { tag: "button", class: "generate", onclick: "%generate%", inner: "Generate !", title: "no conflicts, if enough members" },
                { tag: "div", class: "result_line", inner: [
                    "Length of Peer List:",
                    { tag: "span", class: "length result", inner: "&nbsp;" },
                  ] },
                { tag: "div", class: "result_line", inner: [
                    "Number of conflicts:",
                    { tag: "span", class: "conflicts result", inner: "&nbsp;" },
                  ] },
                { tag: "div", class: "footer" }
              ] },

            { class: "config", inner: [
                "Save peer list persistently to the following ccm store: ",
                { tag: "div", class: "store_config result", inner: "%store_config%" },
                { tag: "button", onclick: "%show%", inner: "Peer List" },
                { tag: "button", onclick: "%configuration%", inner: "Config" },
                { tag: "button", onclick: "%save%", inner: "Save !" }
              ] },

            { class: "show_area" }

          ]
        },

        peerList: { tag: 'pre', inner: { tag: 'code', inner: '%peers%' }  },

        format_input: { tag: "label", inner: [
            { tag: "span", inner: 'Format of "%task%"' },
            { tag: "select", class: "format_%task%", inner: [
                { tag: "option", value: "plaintext", inner: "plaintext", selected: true },
                { tag: "option", value: "javascript", inner: "JavaScript" },
                { tag: "option", value: "html", inner: "HTML" },
                { tag: "option", value: "xml", inner: "XML" },
                { tag: "option", value: "java", inner: "Java" },
                { tag: "option", value: "json", inner: "JSON" },
                { tag: "option", value: "css", inner: "CSS" },
                { tag: "option", value: "nothing", inner: "Do not use !" }
                // further options see https://highlightjs.org/usage/
              ] }
          ] }
      },

      class_names_in_html: ['number_peers','above_min_percent','taskgroup','solutions_url','solutions_name'],

      database_fields: ['_', 'key','ignore','created_at','updated_at'],
      
      css: [ "ccm.load",  "./resources/styles.css" ],
      // css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/peer_builder/resources/styles.css" ],
      user:   [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.0.js", { realm: "hbrsinfpseudo" } ]
      // logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/mkaul-components/peer_builder/resources/configs.js", "log" ] ],
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
      const dataset = {};
     
      
      /**
       * init is called once after all dependencies are solved and is then deleted
       * @type {Function}
       */
      this.init = async () => {

        // set shortcut to helper functions
        $ = this.ccm.helper;

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

        // login user (if not already logged in)
        if ( ! this.user ) return;
        await this.user.login();

        if ( ! this.data ) return;

        // read config into dataset and add some fields
        Object.assign( dataset, {
          solutions_url:  this.data.store.source().url,
          solutions_name: this.data.store.source().name
        }, this );

        // Do not propagate the following props into target component
        ['data', 'user', 'css'].forEach( prop => { delete dataset[ prop ] });

        // fetch solutions from data store
        let solutions;
        // solutions = await $.dataset( this.data.store, { _id: { $regex: `^${this.taskgroup},` } } );
        solutions = await this.data.store.get({ _id: { $regex: `^${this.taskgroup},` } });

        // skip all user ids to be ignored, e.g. teacher, admin, etc
        const allSolutions = solutions.filter( rec => this.ignore ? ! this.ignore.includes( rec.key[1] ) : true );

        // compute length of solutions
        const allLength = allSolutions.map( rec => JSON.stringify(rec).length );
        let minLength;
        let allPeers;
        update_peer_list();

        // logging of 'start' event
        this.logger && this.logger.log( 'start', this.taskgroup );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, Object.assign({ shuffle, generate, save, show, configuration }, dataset ) ) );

        // add input fields for task formats
        const tasks = Array.from( solutions.reduce( ( allKeys, myKeys ) => {
            Object.keys(myKeys)
            .filter(key => ! self.database_fields.includes(key))
            .forEach(key => allKeys.add(key));
            return allKeys
          },
          new Set()
        ) );
        dataset.task_formats = tasks.reduce((allFormats,task)=>{allFormats[task]="plaintext";return allFormats},{});
        const format_div = self.element.querySelector('.formats');
        tasks.forEach( task => {
          $.append( format_div, $.html( self.html.format_input, { task } ) );
        });

        // show peer list length in GUI
        self.element.querySelector('.length').textContent = allPeers.length;

        // show store config in GUI
        const store_config = this.element.querySelector('.store_config');
        update_result_store();

        const input = {};
        self.class_names_in_html
        .forEach( prop => {
          input[ prop ] = this.element.querySelector('.' + prop);
          input[ prop ].addEventListener('input', inputListener );
        });
        tasks.forEach( task => {
          const prop = 'format_'+task;
          input[ prop ] = this.element.querySelector('.' + prop );
          input[ prop ].addEventListener('change', () => {
            dataset.task_formats[ task ] = input[ prop ].options[ input[ prop ].selectedIndex ].value;
          });
        });

        function inputListener( e ){
          dataset[ this.className ] = this.value || self[ this.className ];
          update_result_store();
          update_peer_list();
        }

        function update_peer_list(){
          minLength = 1 + ( ( dataset.above_min_percent || 0 ) / 100 ) * Math.min(...allLength);
          solutions = removeTooSmall( allSolutions, minLength );
          if ( solutions.length < dataset.number_peers + 1 ){
            console.log( solutions.length, ' members are not enough!' );
          }
          allPeers = solutions.map( rec => rec.key[1] );
          if (self.element.querySelector('.length')) self.element.querySelector('.length').textContent = allPeers.length;
        }

        function update_result_store(){
          store_config.textContent = `"peers": { "store": [ "ccm.store", {
            "url": "${dataset.solutions_url}",
            "name": "${dataset.solutions_name}"
          } ], "key": ${JSON.stringify(dataset_key())} }`;
        }

        /*
         * generate some permutations of peer list
         */
        function shuffle(){

          const perm = [];
          for ( let i = 0; i < dataset.number_peers; i++ ){
            perm.push( [ ...allPeers ] );
            shufflePerm( perm[i] );
          }

          self.element.querySelector('.conflicts').textContent = numberOfNonDisjoint( perm );

          if ( ! valid( perm ) ){
            improve( perm );
          }

          dataset.peers = peerList( perm )[1];

        }

        /*
         * generate peer list by straight forward algorithm to avoid conflicts:
         * no conflicts, if enough members.
         */
        function generate(){
          const peerList = {};
          shufflePerm( allPeers );
          allPeers.forEach( (peer, index) => {
            peerList[ peer ] = [];
            for ( let i = 0; i < dataset.number_peers; i++ ){
              peerList[ peer ].push( allPeers[ ( index + i + 1 ) % allPeers.length ] )
            }
          });
          dataset.peers = peerList;
          self.element.querySelector('.conflicts').textContent = numberOfConflicts( peerList );
        }

        /*
         * number of peers reviewing each other in perm set
         * @param {PermutationSet} perm - set of permutations to check
         * @returns {Number} - number of non disjoint pairings
         */
        function numberOfNonDisjoint( perm ){
          const [ outgoing, incoming ] = peerList( perm );
          let count = 0;
          for ( const key in incoming ){
            if ( ! isDisjoint( incoming[ key ], outgoing[ key ] ) ) {
              count++;
              console.log( 'in out not disjoint', key, incoming[ key ], outgoing[ key ] );
            }
          }
          return count;
        }

        /*
         * number of peers reviewing each other in peer list
         * @param {Object} peerList - list of peers
         * @returns {Number} - number of conflicts in peer list
         */
        function numberOfConflicts( peerList ){
          const incoming = peerList;
          const outgoing = {};
          Object.keys( peerList ).forEach( key => {
            const peers = peerList[ key ];
            peers.forEach( peer => {
              if ( ! outgoing[ peer ] ) outgoing[ peer ] = [];
              outgoing[ peer ].push( key );
            });
          });
          let count = 0;
          for ( const key in incoming ){
            if ( ! isDisjoint( incoming[ key ], outgoing[ key ] ) ) {
              count++;
              console.log( 'in out not disjoint', key, incoming[ key ], outgoing[ key ] );
            }
          }
          return count;
        }

        function improve( perm ){
          const i = getRandomInt();
          console.log( 'improving', i );
          shufflePerm( perm[ i ] );
          self.element.querySelector('.conflicts').textContent = numberOfNonDisjoint( perm );
        }

        function getRandomInt() {
          return Math.floor(Math.random() * Math.floor( dataset.number_peers ));
        }

        function valid( perm ){
          const [ outgoing, incoming ] = peerList( perm );
          for ( const key in incoming ){
            // search for duplicates in outgoing edges
            if ( new Set( incoming[ key ] ).size !== dataset.number_peers ) { console.log( 'dup in incoming', key, incoming[ key ] ); return false; }
            // if ( ! isDisjoint( incoming[ key ], outgoing[ key ] ) ) { console.log( 'in out not disjoint', key, incoming[ key ], outgoing[ key ] ); return false; }
          }
          for ( const key in outgoing ){
            // search for duplicates in incoming edges
            if ( new Set( outgoing[ key ] ).size !== dataset.number_peers ) { console.log( 'dup in outgoing', key ); return false; }
          }
          return true;
        }

        function isDisjoint( A, B ){
          for ( const a of A ){
            for ( const b of B ){
              if ( a === b ) return false;
            }
          }
          return true;
        }

        function peerList( perm ){
          const outgoing = {}, incoming = {};
          for ( let i = 0; i < dataset.number_peers; i++ ){
            let last = perm[ i ][ perm[i].length - 1 ];
            perm[i].forEach( peer => {
              if ( ! outgoing[ last ] ) outgoing[ last ] = [];
              if ( ! incoming[ peer ] ) incoming[ peer ] = [];
              outgoing[ last ].push( peer );
              incoming[ peer ].push( last );
              last = peer;
            });
          }
          return [ outgoing, incoming ];
        }

        /*
        * permutation of array
        * @param {Array} array
        * see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        */
        function shufflePerm(array ) {
          var currentIndex = array.length, temporaryValue, randomIndex;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }

          return array;
        }

        function removeTooSmall( solutions, minLength ){
          const newPeeers = [];
          solutions.forEach( elem => { if(JSON.stringify(elem).length > minLength) newPeeers.push(elem)});
          return newPeeers;
        }

        function show(){
          self.element.querySelector('.show_area').innerHTML = `<pre><code>${JSON.stringify( dataset.peers, null, 2 )}</code></pre>`;
        }

        function configuration(){
           self.element.querySelector('.show_area').innerHTML = `<pre><code>${JSON.stringify( self.getValue(), null, 2 )}</code></pre>`;
        }
        
        /**
         * updates app state data and restarts app
         * @returns {Promise<void>}
         */
        async function save() {

          // no datastore? => abort
          if ( ! $.isDatastore( self.data.store ) ) return;

          const response = await self.data.store.set( {
            key: dataset_key(),
            peers: dataset.peers,
            _: { access: { get: 'all', set: 'creator', del: 'creator' } }
          } );

          alert( 'Gesichert! ' + response );

        }

      };
      
      /**
       * @returns {Object} instance configuration for target component peer_review
       */
      this.getValue = () => { return {
        number_peers: dataset.number_peers,
        taskgroup: dataset.taskgroup,
        task_formats: dataset.task_formats,

        peers: {
          store: [ "ccm.store", { url: dataset.solutions_url, name: dataset.solutions_name } ],
            key: dataset_key()
        },

        peer_texts: {
          store: [ "ccm.store", { url: dataset.solutions_url, name: dataset.solutions_name } ],
          user: true,
          login: true
        }

      } };

      function dataset_key(){
        return [ dataset.peers_key_prefix, dataset.taskgroup ];
      }
      
    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
