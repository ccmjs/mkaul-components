/**
 * @overview ccm component for form
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  var ccm_version = '9.0.0';
  var ccm_url     = 'https://akless.github.io/ccm/ccm.js';

  var component_name = 'form';
  var component_obj  = {

    name: component_name,

    config: {
      key: 'test',
      semester: '1', // begin with 1 = WiSe 2017/18
      fach: 'se',  // se = Software Engineering
      server: 'https://kaul.inf.h-brs.de/data/form.php',
      user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-1.0.0.min.js', { sign_on: "hbrsinfkaul" } ],
      html: {
        main: {  // all elements with id have persistent values
          tag: 'form', method: 'POST', inner: [
            
            { tag: 'h2', inner: 'Profile' },
            { tag: 'p', inner: [
              { tag: 'span', inner: 'Edit your profile before deadline ' },
              { tag: 'span', class: 'deadline' },
            ] },
            
            { tag: 'label', for: 'firstname', inner: 'First Name' },
            { tag: 'input', type: 'text', id: 'firstname' },
    
            { tag: 'label', for: 'name', inner: 'Name' },
            { tag: 'input', type: 'text', id: 'name' },
            
            { tag: 'label', for: 'vita', inner: 'Vita' },
            { tag: 'textarea', id: 'vita' },
            
            { tag: 'input', type: 'file', id: 'portrait', accept: 'image/*' },
            
            { tag: 'button', type: 'submit', inner: 'Submit!'}
          ]
        }
      },
      language: 'de',
      messages: {
        'en': {
          'deadline_exceeded': 'Deadline exceeded.'
        },
        'de': {
          'deadline_exceeded': 'Deadline überschritten.'
        }
      },
      css: [ 'ccm.load',  './resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/form/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-1.0.0.min.js' ],
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    Instance: function () {
    
      var self = this;

      this.start = function ( callback ) {
      
        // has logger instance? => log 'render' event
        if ( self.logger ) self.logger.log( 'render' );
        
        // get action field or server URL from config
        var action = self.html.main.action;
        if (!self.server){
          self.server = action; // from config html
        }
        if (!self.server){
          self.server = 'http://httpbin.org/post'; // default
        }
        self.html.main.action = self.server;
        
        // add names where necessary
        self.html.main.inner.map(function (tag) {
          if (tag.tag === 'input' && tag.id && !tag.name) tag.name = tag.id;
          if (tag.tag === 'textarea') tag.name = tag.id;
          // if (tag.type = 'text' && !tag.size) tag.size = 60;  // fkt NICHT!!!
          // if (tag.tag = 'textarea' && !tag.cols) tag.cols = 60;
          // if (tag.tag = 'textarea' && !tag.rows) tag.rows = 10;
        });
        
        // helper method insert
        Array.prototype.insert = function ( index, item ) {
          this.splice( index, 0, item );
        };
  
        // helper method for of loop querySelectorAll
        NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
  
        self.html.main.inner.insert(1, { tag: 'input', type: 'hidden', name: 'key', value: self.key } );
        self.html.main.inner.insert(1, { tag: 'input', type: 'hidden', name: 'semester', value: self.semester } );
        self.html.main.inner.insert(1, { tag: 'input', type: 'hidden', name: 'fach', value: self.fach } );
  
        insert_abort_buttons();
  
        // insert Abort Button for each insert file
        function insert_abort_buttons() {
          // search all input tags of type file
          var file_inputs = [];
          var tag_ids = [];
          self.html.main.inner.map(function (tag, index) {
            if (tag.tag === 'input' && tag.type === 'file') {
              file_inputs.push(index+1);
              tag_ids.push(tag.id);
            }
          });
  
          // insert abort button for each insert file
          for (var i = file_inputs.length - 1; i >= 0; i--) {
            self.html.main.inner.insert( file_inputs[i], { id: tag_ids[i] + '_failure'} );
            self.html.main.inner.insert( file_inputs[i], { id: tag_ids[i] + '_reports' } );
            self.html.main.inner.insert( file_inputs[i], { tag: 'button', id: tag_ids[i] + '_abort', inner: 'Abort' } );
            self.html.main.inner.insert( file_inputs[i], { tag: 'progress', id: tag_ids[i] + '_progress', min: '0', max: '100', value: '0', inner: '0% complete' } );
          }
        }

        // prepare main HTML structure
        var main_elem = self.ccm.helper.html( self.html.main );
        
        // set content of own website area as fast as possible,
        // before values are loaded from database.
        // Values are filled in later async.
        self.ccm.helper.setContent( self.element, main_elem );
  
        // Late Login
        // has user instance? => login user (if not already logged in)
        if (self.user) self.user.login(proceed); else proceed();
        
        function proceed() {
          
          // prepare authentication in POST form:
          // add user and token hidden fields to POST form
          add_node('user');
          add_node('token');
          
          function add_node(name){
            var node = document.createElement('input');
            node.setAttribute('type','hidden');
            node.setAttribute('name',name);
            node.setAttribute('value', self.user.data()[name]);
            self.element.querySelector('form').appendChild(node);
          }
  
          var submit_button = self.element.querySelector('button[type="submit"]');
          submit_button.addEventListener('click', submit, false);
          
          function submit( e ){
            // prepare next AJAX request
            var xhr = new XMLHttpRequest(); // new request for every file to be uploaded
  
            // prepare form data
            var formData = new FormData( self.element.querySelector('form') );
  
            // prepare AJAX POST request
            xhr.open('POST', self.server, true); // true === async
  
            xhr.onload = function () {
              if (this.status == 200) {
                if ( xhr.response && JSON.parse(xhr.response).deadline ){
                  alert( xhr.statusText );
                } else {
                  alert( self.messages[self.language].deadline_exceeded );
                }
              } else {
                console.log( xhr.statusText + ' ' + xhr.responseText );
              }
            };
  
            xhr.send(formData);
            
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
          
          // load previous values from database asynchronously via GET request
          self.ccm.load( {  url: self.server,
                            params: { key: self.key,
                                      user: self.user.data().user,
                                      token: self.user.data().token,
                                      semester: self.semester,
                                      fach: self.fach
                                    }
                          }, function (record) {
            
            // Late filling form with values with recursive descent
            self.html.main.inner.map( assign_persistent_value );
            
            function assign_persistent_value( tag ) {
              // elements without id have no persistent values
              if ( tag.id && !tag.value ) {
                if (tag.type === 'file') {
                  self.element.querySelector('#' + tag.id).filename = record[tag.id]; // ToDo
                } else {
                  self.element.querySelector('#' + tag.id).value = record[tag.id] || '';
                }
              }
              // add inner value to textarea
              if ( tag.id && tag.tag === 'textarea' ) {
                self.element.querySelector('#' + tag.id).innerText = record[tag.id] || '';
              }
              if ( record.deadline && tag.class && tag.class.indexOf('deadline') > -1 ) {
                var list = self.element.querySelectorAll('.deadline');
                for (var item of list){
                  item.innerText = record.deadline;
                }
              }
              if ( Array.isArray( tag.inner )) {  // recursive descent
                tag.inner.map( assign_persistent_value );
              }
            }
          });
        }

        if ( callback ) callback();
      };

    }

  };

  var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
  if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
  function register() { ccm[ ccm_version ].component( component_obj ); }
}() );