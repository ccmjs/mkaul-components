/**
 * @overview ccm component for HTML forms:
 *  This is the ccm wrapper for HTML forms using id-s as markers,
 *  which values should be persisted:
 *  The value of every element with an id is persisted using the id as the key.
 *  Additionally, a deadline may be given server-side by database.
 *  Exceptions:
 *    - For select, radio, and checkboxes the HTML "name" attribute is used as key.
 *    - deadline is marked by the HTML class "deadline", not by HTML id.
 *    - deadline is fetched from database.
 *    - deadline is not writeable from client side.
 *  Values are fetched by HTTP GET request.
 *  Values are stored via HTTP POST request via the same URL.
 *  Use CORS for cross domain operation.
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
          tag: 'form', inner: [
            
            { tag: 'h2', inner: 'Profile' },
            { tag: 'p', inner: [
              { tag: 'span', class: 'deadline', inner: 'Edit your profile before deadline ' }
            ] },
            
            { tag: 'label', inner: [
              { inner: 'Künstler(in):' },
              { tag: 'select', id: 'top5', name: 'top5', size: 5, multiple: true, inner: [
                { tag: 'option', inner: 'Michael Jackson' },
                { tag: 'option', inner: 'Tom Waits' },
                { tag: 'option', inner: 'Nina Hagen' },
                { tag: 'option', inner: 'Marianne Rosenberg' },
                { tag: 'option', inner: 'Donald Trump' },
              ] },
            ] },
            
            { tag: 'h3', inner: 'Radio' },
            
            { tag: 'fieldset', inner: [
              { tag: 'input', type: 'radio', id: 'rmc', name: 'Zahlmethode', value: 'Mastercard' },
              { tag: 'label', for: 'mc', inner: ' Mastercard' },
              { tag: 'input', type: 'radio', id: 'rvi', name: 'Zahlmethode', value: 'Visa' },
              { tag: 'label', for: 'vi', inner: ' Visa' },
              { tag: 'input', type: 'radio', id: 'rae', name: 'Zahlmethode', value: 'AmericanExpress' },
              { tag: 'label', for: 'ae', inner: ' AmericanExpress' }
            ] },
    
            { tag: 'h3', inner: 'Checkbox' },
    
            { tag: 'fieldset', inner: [
              { tag: 'input', type: 'checkbox', id: 'cmc', name: 'Checkbox', value: 'Mastercard' },
              { tag: 'label', for: 'mc', inner: ' Mastercard' },
              { tag: 'input', type: 'checkbox', id: 'cvi', name: 'Checkbox', value: 'Visa' },
              { tag: 'label', for: 'vi', inner: ' Visa' },
              { tag: 'input', type: 'checkbox', id: 'cae', name: 'Checkbox', value: 'AmericanExpress' },
              { tag: 'label', for: 'ae', inner: ' AmericanExpress' }
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
        
        // add attributes where necessary recursively
        self.html.main.inner.map( add_attributes( self.html.main ) );
        
        function add_attributes( parent ){
          return function( tag ){
            // tag.parent_tag = parent.tag;
            // tag.parent_name = parent.name || '';
            // tag.parent_id = parent.id || '';
  
            if (tag.tag === 'input' && tag.id && !tag.name) tag.name = tag.id;
            if (tag.tag === 'textarea') tag.name = tag.id;
            if (tag.tag === 'option') tag.id = encode_id( tag.inner ); // no space allowed
  
            // recursive descend
            if ( Array.isArray( tag.inner ) ){
              if ( tag.tag === 'label' || tag.tag === 'fieldset' || tag.tag === 'select' )
                tag.inner.map( add_attributes( tag ) );
            }
  
            // ohne Erfolg:
            // if (tag.type = 'text' && !tag.size) tag.size = 60;  // fkt NICHT!!!
            // if (tag.tag = 'textarea' && !tag.cols) tag.cols = 60;
            // if (tag.tag = 'textarea' && !tag.rows) tag.rows = 10;
          }
        }
        
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
            var form = self.element.querySelector('form');
            var formData = new FormData( form );
            
            // log_form_data();
            
            // prepare multiple select and checks
            prepare_select_values();
            prepare_checkbox_values();
            
            // Special case: radio uses name as key and id as value for persistence
            prepare_radio_values();
  
            // log_form_data();
  
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
            
            // =============== helper functions ===================
  
            // collect all values of multiple selects
            function prepare_select_values() {
              var nodeList = form.querySelectorAll('select');
              for (var i=0; i<nodeList.length; i++){
                var select_node = nodeList[i];
                formData.append( select_node.id, JSON.stringify( getSelectValues( select_node ) ) );
              }
  
              // Return an array of the selected opion values
              // select is an HTML select element
              function getSelectValues(select) {
                var result = [];
                var options = select && select.options;
                var opt;
    
                for (var i=0, iLen=options.length; i<iLen; i++) {
                  opt = options[i];
      
                  if (opt.selected) {
                    result.push( opt.id || encode_id( opt.value ) || encode_id( opt.text ) );
                  }
                }
                return result;
              }
             }
            
  
            // collect all values of checkboxes
            function prepare_checkbox_values() {
              // get all checkboxes with all names
              var checkboxes = form.querySelectorAll('input[type="checkbox"]');
              // collect all names
              var names = [];
              for (var i=0; i<checkboxes.length; i++){
                var name = checkboxes[i].name;
                if (names.indexOf(name)===-1) names.push(name); // no duplicates
              }
              names.map(function (name) {
                var namedNodes = form.querySelectorAll('input[name="'+ name +'"]');
                formData.append( name, JSON.stringify( getCheckedValues( namedNodes ) ) );
              });
  
  
              function getCheckedValues( checkboxes ){
                var result = [];
                for (var i=0, n=checkboxes.length;i<n;i++) {
                  if ( checkboxes[i].checked ){
                    result.push( checkboxes[i].id );
                  }
                }
                return result;
              }
            }
  
            // collect all values of radio boxes
            function prepare_radio_values() {
              // get all radio boxes with all names
              var radios = form.querySelectorAll('input[type="radio"]');
              for (var i=0; i<radios.length; i++){
                if (radios[i].checked) {
                  formData.append( radios[i].name, radios[i].id );
                }
              }
            }
            
            function log_form_data(){
              for (var pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]);
              }
            }
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
            
            // Late filling form with values with recursive descend
            // traverse by all record keys
            Object.keys( record ).map( assign_values_to_ids );
            
            function assign_values_to_ids( rec_key ) {
              var rec_type = elem_type( self.html.main.inner );
              var rec_val =  record[ rec_key ];
              
              // handle multiple select or check
              if ( rec_type === 'checkbox' || rec_type === 'select' ) {
                // value is an array
                rec_val =  JSON.parse( rec_val );
              }
              
              switch ( rec_type ){
                case 'radio':
                  var selected_node = self.element.querySelector('#' + rec_val);
                  if ( selected_node ) selected_node.checked = 'checked';
                  break;
                case 'checkbox':
                  if (Array.isArray(rec_val)){
                    rec_val.map(function (id) {
                      self.element.querySelector('#' + id).checked = 'checked';
                    });
                  } else {
                    self.element.querySelector('#' + rec_val).checked = 'checked';
                  }
                  break;
                case 'select':
                  if (Array.isArray(rec_val)){
                    rec_val.map(function (id) {
                      self.element.querySelector('#' + id).selected = 'selected';
                    });
                  } else {
                    self.element.querySelector('#' + rec_val).checked = 'selected';
                  }
                  break;
                case 'textarea':
                  self.element.querySelector('#' + rec_key).innerText = rec_val
                    || self.element.querySelector('#' + rec_key).innerText
                    || '';
                  break;
                case 'file':
                  self.element.querySelector('#' + rec_key).filename = rec_val; // ToDo
                  break;
                case 'deadline':
                  var list = self.element.querySelectorAll('.deadline'); // class selector
                  for (var i = 0; i< list.length; i++){
                    list[i].innerText += ' ' + record.deadline;
                  }
                  break;
                default:
                  if ( self.element.querySelector('#' + rec_key) )
                    self.element.querySelector('#' + rec_key).value = rec_val || '';
              }
  
              // search recursively for id or name called rec_key within self.html.main.inner
              function elem_type( elem_array ) { // recursive find
                if ( rec_key ===  'deadline' ) return 'deadline';
                for (var i = 0; i< elem_array.length; i++){
                  var elem = elem_array[ i ];
                  if ( rec_key === elem.id ){
                    if ( elem.tag === 'textarea' ) return 'textarea';
                  }
                  if ( rec_key === elem.name ){
                    if ( elem.tag === 'input' ) return elem.type; // exit by return
                    if ( elem.tag === 'select' ) return 'select';
                  }
                  if ( Array.isArray( elem.inner )) {  // recursive descend
                    var found = elem_type( elem.inner );
                    if( found ) return found;
                  }
                }
                return undefined;
              }
            }
            
          });
        }
        
        function encode_id( id ){  // replace space by underscore
          return id.replace(/\s/g, '_');
        }
  
        function decode_id( id ){  // replace underscore by space
          return id.replace(/_/g, ' ');
        }

        if ( callback ) callback();
      };

    }

  };

  var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
  if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
  function register() { ccm[ ccm_version ].component( component_obj ); }
}() );