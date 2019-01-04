/**
 * @overview ccm component for cryptoblock
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 * @version latest (2.0.0)
 * @link https://anders.com/blockchain/block.html
 * TODO: docu comments -> API
 * TODO: unit tests
 * TODO: builder component
 * TODO: i18n
 */

{

  var component  = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'cryptoblock',
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',
    // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.0.4.min.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      cryptojs: [ 'ccm.load', 'https://ccmjs.github.io/mkaul-components/lib/sha256.js' ],

      difficulty: 4, // number of zeros required at front of hash
      maximumNonce: 600000, // limit the nonce to this so we don't mine too long

// NOTE: Because there are 16 possible characters in a hex value, each time you increment
// the difficulty by one you make the puzzle 16 times harder. In my testing, a difficulty
// of 6 requires a maximumNonce well over 500,000,000.

      html: {
        main: {
          inner: [  // local styling of shadow dom does not work with CSS file
            { tag: 'style', inner: `
            
            
:host {
    font-family: "Lucida Grande", Helvetica, Arial, sans-serif;
}

#block {
    padding-left: 1em;
    padding-top: 1em;
    padding-bottom: 1em;
    border-radius: 6px;
}

h4 {
    margin-top: 1em;
    margin-bottom: 0.1em;
}

#blockchain_number {
    width: 82%;
}

.number {
    padding: 4px 12px;
    font-size: 1.2em;
    font-weight: 400;
    line-height: 1.2em;
    color: #555;
    text-align: center;
    background-color: #d4d4d4;
    border: 1px solid #ccc;
    border-radius: 6px;
}

#hash {
    cursor: not-allowed;
    font-family: monospace;
    line-height: 1.1em;
    color: #555;
    background-color: #d4d4d4;
}

button.crypto {
    margin-top: 1em;
    margin-bottom: 1em;
    display: block;
    color: white;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    border-radius: 6px;
    position: relative;
    transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    text-shadow: 0 -1px 0 rgba(0,0,0,.2);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.15), 0 1px 1px rgba(0,0,0,.075);
    background-repeat: repeat-x;
    border-color: #245580;
    background-image: linear-gradient(to bottom,#337ab7 0,#265a88 100%);
}

label {
  white-space: nowrap;
}

input.crypto {
    width: 90%;
    font-size: 1.2em;
    line-height: 1.2em;
    color: #555;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-family: monospace;
}

textarea.crypto {
    display: block;
    width: 90%;
    height: 10em;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 6px;
}

.success {
    background: rgb(223, 240, 216);
}

.error {
    background: rgb(250, 220, 220);
}           
            
            
            ` },
            { tag: 'h1', inner: [
              'Block #',
              { tag: 'span', id: 'title' }
            ] },
            { id: 'block', class: 'success', inner: [
              { tag: 'label', for: 'blockchain_number', title: 'Number of Block in Chain  ', inner: [
                { tag: 'h4', inner: 'Block:' },
                { tag: 'span', class: 'number', inner: '#' },
                { tag: 'input', id: 'blockchain_number', class: 'crypto', type: 'text', value: 1, onkeyup: '%onkeyup%' }
              ] },
              { tag: 'label', for: 'nonce', title: 'number to be changed until the difficulty is met', inner: [
                { tag: 'h4', inner: 'Nonce:' },
                { tag: 'input', id: 'nonce', class: 'crypto', type: 'text', value: 11316, onkeyup: '%onkeyup%' }
              ] },
              { tag: 'label', for: 'data', title: 'data area', inner: [
                { tag: 'h4', inner: 'Data:' },
                { tag: 'textarea', class: 'crypto', id: 'data', rows: 10, placeholder: 'Enter your data here', onkeyup: '%onkeyup%' }
              ] },
              { tag: 'label', for: 'prev', title: 'hash value of previous block', inner: [
                { tag: 'h4', inner: 'Prev:' },
                { tag: 'input', id: 'prev', class: 'crypto', type: 'text' }
              ] },
              { tag: 'label', for: 'hash', title: 'hash value of all fields above together', inner: [
                { tag: 'h4', inner: 'Hash:' },
                { tag: 'input', id: 'hash', class: 'crypto', type: 'text', disabled: 'disabled' }
              ] },
              { tag: 'button', class: 'mine crypto', inner: 'Mine', onclick: '%mine%', title: 'Block Mining: Compute Hash with difficulty' }
            ] }
          ]
        },
        plus: { tag: 'button', class: 'plus crypto', inner: '+', onclick: '%plus%', title: 'Generate next block in blockchain' },
      },
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://kaul.inf.h-brs.de/data/2017/se1/json/log_configs.js', 'se_ws17_cryptoblock' ] ]
      // css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/cryptoblock/resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/cryptoblock/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-2.0.0.min.js' ],
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ],
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
       * @type {Object}
       */
      let $;

      /**
       * init is called once after all dependencies are solved and is then deleted
       */
      this.init = async () => {

        //  Is config given via LightDOM (inner HTML of Custom Element)?
        //  Then use it with higher priority
         if ( this.inner && this.inner.innerHTML.trim() && this.inner.innerHTML.startsWith('{') ){

          // interprete LightDOM
          self.lightDOM = JSON.parse( self.inner.innerHTML );

          // merge into config
          Object.assign( self, self.lightDOM );

        }

      };

      /**
       * is called once after the initialization and is then deleted
       */
      this.ready = async () => {

        // set shortcut to help functions
        $ = self.ccm.helper;

      };

      /**
       * starts the instance
       */
      this.start = async () => {
      
        // has logger instance? => log 'start' event
        self.logger && self.logger.log( 'start', { difficulty: self.difficulty, maximumNonce: self.maximumNonce } );

        // prepare blockchain
        const chain = [];
        let block = { block_number: 0, hash: {
          value: '0000000000000000000000000000000000000000000000000000000000000000'
        } }; // initial 0-Block
        chain.push(block);

        let PATTERN = '';  // Leading OOOO according to difficulty
        for (let x=0; x<self.difficulty; x++) {
          PATTERN += '0';
        }

        plus({ block: block, initial_minining: false } ).call( self, self );

        function plus( args ){
          let block = args.block;
          return function(e){
            if ( e && ( e === self || e.target.classList.contains('plus') ) ){
              e && e.preventDefault && e.preventDefault();

              // set block to next block
              block = { block_number: chain.length, previous: block };
              chain.push(block);

              self.logger && self.logger.log( 'plus', { block_number: block.block_number } );

              // prepare main HTML structure
              const main_elem = $.html( self.html.main,
                { onkeyup: onkeyup(block),
                  mine: mine_click(block),
                  plus: plus({ block: block, initial_minining: true })
                }
              );

              // select inner containers
              block.block_element = main_elem.querySelector( '#block' );
              block.title = main_elem.querySelector( '#title' );
              block.blockchain_number = block.block_element.querySelector( '#blockchain_number' );
              block.blockchain_number.value = block.block_number;
              block.title.innerText = block.block_number;
              block.nonce = block.block_element.querySelector( '#nonce' );
              block.data = block.block_element.querySelector( '#data' );
              block.prev = block.block_element.querySelector( '#prev' );
              block.hash = block.block_element.querySelector( '#hash' );
              block.mine_button = block.block_element.querySelector( 'button.mine' );

              block.blockchain_number.addEventListener('keyup', onkeyup(block));
              block.nonce.addEventListener('keyup', onkeyup(block));
              block.data.addEventListener('keyup', onkeyup(block));
              block.prev.addEventListener('keyup', onkeyup(block));
              block.mine_button.addEventListener('click', mine_click(block));

              if ( args.initial_minining ) mine_click(block).call(self);

              const prev_block = chain[chain.length-2];
              block.prev.value = prev_block.hash.value;
              block.prev.style = 'font-family: monospace;\n    line-height: 1.1em;';
              block.hash.style = 'cursor: not-allowed;\n    font-family: monospace;\n    line-height: 1.1em;\n    color: #555;\n    background-color: #d4d4d4;';

              // remove old plus button

              if ( block.previous && block.previous.plus_button ){
                // block.previous.plus_button.parentNode.removeChild( block.previous.plus_button );
                block.plus_button = block.previous.plus_button;
                main_elem.appendChild( block.plus_button );
              } else {
                block.plus_button = $.html(self.html.plus, { plus: plus({ block: block, initial_minining: true }) });
                // block.plus_button.addEventListener( 'click', plus({ block: block, initial_minining: true }) );
                main_elem.appendChild( block.plus_button );
              }

              // encapsulate every block element into a new div
              const block_div = document.createElement('div');

              // append new plus button (recycled)
              // block_div.appendChild( block.plus_button );

              // encapsulate every block element into a shadow root
              const shadowRoot = block_div.attachShadow({mode: 'open'});
              shadowRoot.appendChild( main_elem );
              self.element.appendChild( block_div );

              updateHash(block);

            }
          };
        }

        function updateHash(block) {
          // update the SHA256 hash value for this block
          block.hash.value = sha256(block);
          updateState(block);
        }

        function onkeyup(block){
          return function(e){
            e && e.preventDefault();

            self.logger && self.logger.log( 'keyup', { block_number: block.block_number } );

            updateHash(block);
          }
        }

        function mine_click(block){
          return function(e){
            e && e.preventDefault();

            block.mine_button.disabled = true;
            const loading = $.loading( self );
            block.block_element.appendChild( loading );
            // block.mine_button.innerHTML = loading;
            block.block_element.style.cursor = 'wait';
            const start_time = window.performance.now();
            $.wait( 250, function() {
              mine(block);
              block.block_element.removeChild( loading );
              // block.mine_button.innerHTML = 'Mine';
              block.block_element.style.cursor = 'default';
              block.mine_button.disabled = false;
              self.logger && self.logger.log( 'mine', { block_number: block.block_number, mining_time: window.performance.now() - start_time, nonce: block.nonce.value, chain_length: chain.length, difficulty: self.difficulty, maximumNonce: self.maximumNonce } );
            }); // give UI time to update

            // updateHash(block);
            updateChain();
          }
        }


        function sha256(block) {
          // calculate a SHA256 hash of the contents of the block
          return CryptoJS.SHA256(getText(block));
        }

        function updateState(block) {
          // set the well background red or green for this block
          if (block.hash.value.substr(0, self.difficulty) === PATTERN && block.prev.value.substr(0, self.difficulty) === PATTERN) {
            block.block_element.className = 'success';
          }
          else {
            block.block_element.className = 'error';
          }
        }

        function updateChain() {
          // update all blocks walking the chain from this block to the end
          chain.map((block, index)=>{
            if (index > 0){
              block.previous = chain[index-1];
              block.prev.value = block.previous.hash.value;
              updateHash(block);
            }
          });
        }

        function mine(block, isChain) {
          for (let x = 0; x <= self.maximumNonce; x++) {
            block.nonce.value = x;
            block.hash.value = sha256(block);
            if (block.hash.value.substr(0, self.difficulty) === PATTERN) {
              if (isChain) {
                updateChain(block);
              }
              else {
                updateState(block);
              }
              break;
            }
          }
        }

        function getText(block) {
          return block.blockchain_number.value + block.nonce.value + block.data.value + block.prev.value;
        }

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}