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
 *
 *
 * ToDo LightDOM, delete config properties, privatize
 */

( function () {

  var ccm_version = '9.0.0';
  var ccm_url     = 'https://akless.github.io/ccm/version/ccm-9.0.0.js';

  var component_name = 'form';
  var component_obj  = {

    name: component_name,

    config: {
      key: 'test',   // unique key of this form
      keys: {        // additional DB keys if necessary (optional)
        semester: 1, // begin with 1 = WiSe 2017/18
        fach: 'se'   // se = Software Engineering
      },
      server: 'https://kaul.inf.h-brs.de/data/form.php', // uniform server access
      user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-1.0.0.min.js', { sign_on: "hbrsinfkaul" } ],
      uml: [ 'ccm.component', '../uml/ccm.uml.js' ],
      upload: [ 'ccm.component', '../upload/ccm.upload.js' ],
      html: {
        main: {  // elements with id persist values
          tag: 'form', inner: [
            
            { tag: 'h2', inner: 'Profile' },
            { tag: 'p', inner: [
              { tag: 'span', class: 'deadline', inner: 'Edit your profile before deadline ' }
            ] },
            
            { tag: 'label', for: 'height', inner: [
              { tag: 'input', id: 'height', type: 'number', min: 100, max: 220, step: 1, value:175 },
              { tag: 'span', inner: 'cm'}
            ] },
    
            { tag: 'label', for: 'weightInput', inner: 'Weight' },
            { tag: 'input', id: 'weightInput', type: 'range', min: 0, max: 100, value:60, oninput:"weightOutput.value = weightInput.value" },
            { tag: 'output', id: 'weightOutput', for: 'weightInput', inner: '60' },
            
            { tag: 'ccm-uml', id: 'my_uml', default: 'Bob->Alice2 : hello' },
    
            { tag: 'ccm-upload', id: 'my_upload' },
            
            { tag: 'label', inner: [
              { inner: 'Künstler(in):' },
              { tag: 'select', id: 'top5', size: 5, multiple: true, inner: [
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
            { tag: 'textarea', id: 'vita', inner: 'Your Vita here as a default value' },
    
            { id: 'dummy', value: 'test' }, // should not be persisted
            
            { tag: 'button', type: 'submit', inner: 'Submit!'}
            
          ]
        },
        response: {
          tag: 'a', target: '_blank', inner: '%filename%'
        }
      },
      language: 'de', // ToDo enable Dynamic Switching
      messages: {
        'en': {
          deadline_exceeded: 'Deadline exceeded.',
          wrong_file_type: 'Wrong file type.',
          file_too_large: 'File too large',
          success: 'Successfully uploaded.'
        },
        'de': {
          deadline_exceeded: 'Deadline überschritten.',
          wrong_file_type: 'Falscher File-Typ.',
          file_too_large: 'Datei zu groß.',
          success: 'Erfolgreich hochgeladen.'
        }
      },
      css: [ 'ccm.load',  '../form/resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/form/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-1.0.0.min.js' ],
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    Instance: function () {
    
      var self = this;

      this.start = function ( callback ) {
        
        // find all tags starting with "ccm-"
        var ccm_ids = collect_ids_of_all_tags(function ( elem ) {
          return elem.tag && elem.tag.startsWith('ccm-');
        });
      
        // has logger instance? => log 'render' event
        if ( self.logger ) self.logger.log( 'render' );
        
        // add attribute "name" for all input elements recursively
        self.html.main.inner.map( add_attributes( self.html.main ) );
        
        function add_attributes( parent ){
          return function( elem ){
            if (elem.tag === 'input' && elem.id && !elem.name) elem.name = elem.id;
            if (elem.tag === 'textarea') elem.name = elem.id;
            if (elem.tag === 'select') elem.name = elem.id;
            if (elem.tag === 'option') elem.id = encode_id( elem.inner ); // no space allowed
  
            // recursive descend
            if ( Array.isArray( elem.inner ) ){
              // if ( elem.tag === 'label' || elem.tag === 'fieldset' || elem.tag === 'select' ) ???
                elem.inner.map( add_attributes( elem ) );
            }
          }
        }
        
        // helper method insert
        Array.prototype.insert = function ( index, item ) {
          this.splice( index, 0, item );
        };
  
        // helper method for iterating querySelectorAll result NodeList
        NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
  
        // Special cases
        insert_database_keys();
  
        // insert database keys as hidden fields in HTML form
        function insert_database_keys() {
          self.html.main.inner.insert(1, { tag: 'input', type: 'hidden', name: 'key', value: self.key } );
          Object.keys(self.keys).map(function (key) {
            self.html.main.inner.insert(1, { tag: 'input', type: 'hidden', name: key, value: self.keys[key] } );
          });
        }
        
        // prepare main HTML structure
        var main_elem = self.ccm.helper.html( self.html.main );
        
        // set content of own website area as fast as possible,
        // before values are loaded from database.
        // Values are filled in later async.
        self.ccm.helper.setContent( self.element, main_elem );

        start_ccm_instances();
  
        // start all ccm component instances
        function start_ccm_instances() {
          ccm_ids.map(function ( id ) {
            var elem = self.element.querySelector( '#'+id );
              switch( elem.tagName ){
                case 'CCM-UML':
                  self.uml.start({ root: elem, value: elem.value });
                  break;
                case 'CCM-UPLOAD':
                  self.upload.start({ key: self.key, root: elem, value: elem.value, keys: { semester: self.keys.semester, fach: self.keys.fach, id: id }  });
                  break;
                default:
                  self[ elem.tagName ].start({ root: elem, value: elem.value });
              }
            });
        }
  
        // Late Login
        // has user instance? => login user (if not already logged in)
        if (self.user) self.user.login(proceed); else proceed();
        
        function proceed() { // proceed after login
          
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
          
          function submit( e ){ // Handler for submit button of form
            
            // prepare next AJAX request for this form
            var xhr = new XMLHttpRequest(); // new request for every form to be uploaded
  
            // prepare form data
            var form = self.element.querySelector('form');
            var formData = new FormData( form );
            
            // log_form_data();
            
            // prepare multiple select and checks
            prepare_select_values();
            prepare_checkbox_values();
            
            // Special cases:
            // radio uses name as key and id as value for persistence
            prepare_radio_values();
            prepare_ccm();
  
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
            
            function prepare_ccm() {
              ccm_ids.map(function (id) {
                var elem = self.element.querySelector('#'+id);
                elem.ccm_instance.sync(); // read textarea value and write into component value
                formData.append( elem.id, typeof elem.ccm_instance.value === 'string' ? elem.ccm_instance.value : JSON.stringify( elem.ccm_instance.value ) );
              });
            }

            function log_form_data(){
              for (var pair of formData.entries()) { // ToDo ES6
                console.log(pair[0]+ ', ' + pair[1]);
              }
            }
          }
          
          // load previous values from database asynchronously via GET request
          self.ccm.load( {  url: self.server,
                            params: { key: self.key,
                                      user: self.user.data().user,
                                      token: self.user.data().token,
                                      semester: self.keys.semester,
                                      fach: self.keys.fach
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
                case 'range':
                  if ( self.element.querySelector('#' + rec_key) ){
                    var range_input_elem = self.element.querySelector('#' + rec_key);
                    if ( rec_val ) range_input_elem.value = rec_val;
                    range_input_elem.oninput(); // simulate input event for updating output elements
                  }
                  break;
                case 'radio':
                  if ( rec_val ){ // radio has selection
                    var selected_node = self.element.querySelector('#' + rec_val);
                    if ( selected_node ) selected_node.checked = 'checked';
                  }
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
                case 'deadline':
                  var list = self.element.querySelectorAll('.deadline'); // class selector
                  for (var i = 0; i< list.length; i++){
                    list[i].innerText += ' ' + record.deadline;
                  }
                  break;
                default:
                  if ( rec_type && rec_type.startsWith('ccm') ){
                    self.element.querySelector('#' + rec_key).ccm_instance.sync( rec_val );
                  } else if ( self.element.querySelector('#' + rec_key) ){
                    if (rec_val) self.element.querySelector('#' + rec_key).value = rec_val;
                  }
              }
  
              // search recursively for id or name called rec_key within self.html.main.inner
              function elem_type( elem_array ) { // recursive find
                if ( rec_key ===  'deadline' ) return 'deadline';
                for (var i = 0; i< elem_array.length; i++){
                  var elem = elem_array[ i ];
                  if ( rec_key === elem.id ){
                    if ( elem.tag === 'textarea' ) return 'textarea';
                    if ( elem.tag.startsWith('ccm') ) return elem.tag;
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
        
        // =================== helper functions =====================
  
        function file_url( args ) { // args is an object = keyword parameter
          if ( ! args.server ) args.server = self.server;
          if ( ! args.params ) args.params = self.keys;
          Object.assign( args.params, { key: self.key } );
          if ( args.id ) args.params.id = args.id;
          var url = args.server;
          Object.keys(args.params).map(function (key, i) {
            url += (i===0?'?':'&') + key + '=' + args.params[ key ];
          });
          return url;
        }
        
        function encode_id( id ){  // replace space by underscore
          return id.replace(/\s/g, '__');
        }
  
        function decode_id( id ){  // replace underscore by space
          return id.replace(/__/g, '  '); // ToDo this is not a safe restauration of replacement
        }
        
        // collect all tags satisfying the condition recursively
        function collect_all_tags( condition ) {
          var all_tags = [];
          var all_elem_ids = [];
          self.html.main.inner.map( collect_all_tags( self.html.main.inner ) );
          return { tags: all_tags, ids: all_elem_ids };
    
          function collect_all_tags( parent ){
            return function ( elem, index ) {
              if ( condition( elem, index ) ) {
                all_tags.push( {parent: parent, index: index+1} );
                all_elem_ids.push( elem.id );
              } else if ( Array.isArray( elem.inner ) ) {
                collect_all_tags( elem.inner );
              }
            }
          }
        }
  
        // collect ids only
        function collect_ids_of_all_tags( condition ) {
          return collect_all_tags( condition ).ids;
        }

        if ( callback ) callback();
      };

    }

  };

  var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
  if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
  function register() { ccm[ ccm_version ].component( component_obj ); }
}() );