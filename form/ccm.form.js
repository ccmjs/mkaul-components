/**
 * @overview ccm component for HTML forms:
 *  This is the ccm wrapper for HTML forms using id-s as markers,
 *  which values should be persisted:
 *  The value of every element with an id is persisted using the id as the key.
 *  Additionally, a deadline may be given server-side by database.
 *  Exceptions:
 *    - For select, radio, and checkboxes the HTML "name" attribute is set identical to "id".
 *    - deadline is marked by the HTML class "deadline", not by HTML id.
 *    - deadline is fetched from database.
 *    - deadline is not writeable from client side.
 *  Values are fetched by HTTP GET request.
 *  Values are stored via HTTP POST request via the same URL.
 *  Use CORS for cross domain operation.
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 *
 * ToDo add other form elements
 * ToDo delete config properties, privatize
 */

( function () {
  
  var component = {
    
    name: 'form',
    
    // ccm: '//akless.github.io/ccm/version/ccm-10.0.0.min.js',
    ccm: '//akless.github.io/ccm/ccm.js',

    config: {
      fkey: 'test',   // form key = unique key of this form
      keys: {        // additional DB keys if necessary (optional)
        semester: 1, // begin with 1 = WiSe 2017/18
        fach: 'se'   // se = Software Engineering
      },
      server: '//kaul.inf.h-brs.de/data/form.php', // uniform server access
      
      // subcomponents
      user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-2.0.0.min.js', { sign_on: "hbrsinfkaul", logged_in: true } ],
      uml:    [ 'ccm.component', '//kaul.inf.h-brs.de/data/ccm/uml/ccm.uml.js' ],
      upload: [ 'ccm.component', '//kaul.inf.h-brs.de/data/ccm/upload/ccm.upload.js' ],
      highlight: [ 'ccm.component', '//kaul.inf.h-brs.de/data/ccm/highlight/ccm.highlight.js' ],
      show_solutions: [ 'ccm.component', '//kaul.inf.h-brs.de/data/ccm/show_solutions/ccm.show_solutions.js' ],
      exercise: [ 'ccm.component', '//kaul.inf.h-brs.de/data/ccm/exercise/ccm.exercise.js' ],
      
      html: {  // Optional: JSON structure instead of LightDOM given in HTML file
        main: {
          inner: [   // Rule: elements with id persist values

            { tag: 'h2', inner: 'Profile' },
            { tag: 'p', inner: [
              { tag: 'span', class: 'deadline', inner: 'Edit your profile before deadline ' }
            ] },

            { tag: 'label', for: 'height', inner: 'Height' },
            { tag: 'input', id: 'height', type: 'number', min: 100, max: 220, step: 1, value:175 },
            { tag: 'span', inner: 'cm'},

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
                { tag: 'option', inner: 'Marianne Rosenberg' }
              ] },
            ] },

            { tag: 'h3', inner: 'Radio' },

            { tag: 'fieldset', inner: [
              { tag: 'input', type: 'radio', id: 'rmc', name: 'Zahlmethode', value: 'Mastercard' },
              { tag: 'label', for: 'rmc', inner: ' Mastercard' },
              { tag: 'input', type: 'radio', id: 'rvi', name: 'Zahlmethode', value: 'Visa' },
              { tag: 'label', for: 'rvi', inner: ' Visa' },
              { tag: 'input', type: 'radio', id: 'rae', name: 'Zahlmethode', value: 'AmericanExpress' },
              { tag: 'label', for: 'rae', inner: ' AmericanExpress' }
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
        }
      },
      language: 'de', // Switch between languages via Reload
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
      css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/form/resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/form/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-1.0.0.min.js' ],
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    Instance: function () {
  
      if(!String.tagify) { // ToDo eliminate
        String.prototype.tagify = function() {
      
          // spaces
          var spacePattern = /\s+|\//gim;
      
          return this.replace(spacePattern, '_');
        };
      }
    
      var self = this;
      var my;           // contains privatized instance members // ToDo
  
      this.init = function ( callback ) {
  
        // ToDo Insert config given by key into start_params
        if ( self.key ){
          self.ccm.helper.action( JSON.parse( self.key ), self );
        }
  
        // inherit context parameter
        if ( ! self.fkey ) self.fkey = self.ccm.context.find(self,'fkey');
        if ( ! self.keys ) self.keys = {
          semester: self.ccm.context.find(self,'semester'),
          fach: self.ccm.context.find(self,'fach')
        };
  
        // Collect the types of all inner elements with ids in this object.
        // Initially, DEADLINE and POINTS are set.
        var element_types = { deadline: 'DEADLINE', points: 'POINTS' };
    
        // support declarative way for defining a form via HTML or JSON
        generateForm();
        
        callback();
    
        /** generate form from LightDOM or JSON */
        function generateForm() {
  
          // create form for holding all form elements given between <ccm-form>-tags
          // or as JSON structure in config
          self.form = document.createElement('form');
  
          // Array for collecting all ids of ccm custom elements
          self.ccm_elems = [];
          
          // export knowledge about element types via this function
          self.element_type = function( id ){
            if (element_types[ id ])
              return element_types[ id ].toUpperCase();
            else {
              if (['name', 'before_deadline'].indexOf(id) === -1) {
                console.log( 'Form has no id #' + id );
              }
              return 'TEXT'; // ToDo  test
            }
          };
  
          // no Light DOM? => use empty fragment
          if ( !self.inner ){
            self.inner = document.createDocumentFragment();
            self.inner.appendChild( self.ccm.helper.html( self.html.main ) );
          }
  
          // Light DOM is given as HTML string? => use fragment with HTML string as innerHTML
          if ( typeof self.inner === 'string' ) self.inner = document.createRange().createContextualFragment( self.inner );
  
          // do some replacements in inner HTML of own Custom Element (recursive)
          replacements( self.inner );
          
          // collect useful data from lightDOM and add useful data to lightDOM
          augmentLightDOM( self.inner );
 
        }
  
        function replacements( node ) {
    
          self.ccm.helper.makeIterable( node.children ).map( function ( child ) {
      
            var fieldset, values;
      
            switch ( child.tagName ) {
        
              case 'RADIO':
                element_types[ child.id ] = child.tagName;
                fieldset = document.createElement( 'fieldset' );
                self.ccm.helper.makeIterable( child.childNodes ).map(function (subChild) {
                  fieldset.appendChild( subChild );
                });
                try {
                  values = JSON.parse( child.getAttribute('values') )
                } catch(e){
                  values = child.getAttribute('values').split(',');
                }
                values.map(function (value) {
                  var input = self.ccm.helper.html(
                    { tag: 'label', inner: [
                      { tag: 'input', type: 'radio', name: child.id, value: value },
                      { tag: 'span', class: 'wrappable', inner: value }
                    ]} );
                  fieldset.appendChild( input );
                });
                node.replaceChild( fieldset, child );
                break;
        
              case 'CHECKBOX':
                element_types[ child.id ] = child.tagName;
                fieldset = document.createElement( 'fieldset' );
                fieldset.appendChild( child.firstChild );
                try {
                  values = JSON.parse( child.getAttribute('values') )
                } catch(e){
                  values = child.getAttribute('values').split(',');
                }
                values.map(function (value) {
                  var input = self.ccm.helper.html(
                    { tag: 'label', inner: [
                      { tag: 'input', type: 'checkbox', name: child.id, value: value },
                      { tag: 'span', class: 'wrappable', inner: value }
                    ]} );
                  fieldset.appendChild( input );
                });
                node.replaceChild( fieldset, child );
                break;
        
              default:
                replacements( child );
        
            }
      
          } );
    
        }
        
  
        function augmentLightDOM( lightDOM ) {
    
          self.ccm.helper.makeIterable( lightDOM.childNodes ).map(function ( child ) {
            self.form.appendChild( child );
          });
    
          augment( self.form );
    
          function augment( elem ) {
            
            // collect all ccm subcomponents, without nested parameters
            if ( elem.tagName.startsWith('CCM-') &&  elem.tagName.split('-').length === 2 ){
              self.ccm_elems.push( elem );
            }
            
            // augment elements with id with additional information
            if ( elem.id ){
              switch ( elem.tagName ){
                case 'INPUT':
                  // input type checkbox and select have multiple selections
                  // i.e. one name and multiple ids
                  element_types[ elem.name || elem.id ] = elem.type;
                  // if name was forgotten, then take id as substitute
                  if ( elem.id && ! elem.name ) elem.name = elem.id;
                  break;
                case 'TEXTAREA':
                  element_types[ elem.id ] = 'TEXTAREA';
                  elem.name = elem.id;
                  break;
                case 'SELECT':
                  element_types[ elem.id ] = 'SELECT';
                  elem.name = elem.id;
                  [].forEach.call( elem.options, function(opt){
                    // no space allowed in ids
                    opt.id = encode_id( opt.value );
                  } );
                  break;
                case 'OPTION':
                  element_types[ elem.id ] = 'SELECT';
                  elem.id = encode_id( elem.value );
                  break;
                default:
                  element_types[ elem.id ] = elem.tagName;
              }
            }
            
            // recursive descend
            var nodes = elem.children;
            for (var i = 0; i < nodes.length; i++) {
              augment( nodes[i] );
            }
          }
        }
    
      };
  
      this.ready = function ( callback ) {
  
        // Overwrite config properties by HTML attribute values
        // self.ccm.helper.makeIterable( self.root.attributes ).map( function ( attribute ) {
        //   self[ attribute.name ] = attribute.value;
        // });
  
        // privatize all possible instance members
        // my = self.ccm.helper.privatize( self );
  
        // setTimeout( callback(), 10);
        callback();
        
      };

      this.start = function ( callback ) {
       
        // has logger instance? => log 'render' event
        if ( self.logger ) self.logger.log( 'render' );
  
        // set content of own website area as fast as possible,
        // before values are loaded from database.
        // Values are filled in later asynchronously.
  
        
        self.ccm.helper.setContent( self.element, self.form );

        start_ccm_instances();
  
        // start all ccm subcomponent instances inside this form
        function start_ccm_instances() {
          self.ccm_elems.map(function ( elem ) {
            
            // get name without ccm prefix
            var component_name = elem.tagName.substr(4,elem.tagName.length).toLowerCase();
            
            // start parameter for component
            var start_params = {
              fkey: self.fkey,
              root: elem,
              value: elem.value,
              parent: self,
              user: self.user
            };
            if ( elem.id ){
              start_params.keys = {
                semester: self.keys.semester,
                fach: self.keys.fach
                // id: elem.id // ToDo ???
              };
            }
            
            // start component if component exists
            self[ component_name ].start( start_params, function ( instance ) {
              elem.ccm_instance = instance;
            } );

          } );
        }
  
        // Late Login
        // has user instance? => login user (if not already logged in)
        if (self.user) self.user.login(proceed); else proceed();
        
        function proceed() { // proceed after login
  
          var submit_button = self.element.querySelector('button[type="submit"]');
          if ( ! submit_button ){
            submit_button = self.ccm.helper.html( {
              tag: 'button', type: 'submit', inner: 'Speichern!'
            } );
            self.element.querySelector('form').appendChild( submit_button );
          }
          submit_button.addEventListener('click', submit, false);
  
          function submit(e) { // Handler for submit button of form
    
            // prepare next AJAX request for this form
            var xhr = new XMLHttpRequest(); // new request for every form to be uploaded
    
            // prepare form data
            var formData = new FormData(self.form);
            formData.append( 'user', self.user.data().id );
            formData.append( 'token', self.user.data().token );
            formData.append( 'key', self.fkey );
            Object.keys( self.keys ).map(function (key) {
              formData.append( key, self.keys[key] );
            });
    
            // log_form_data();
    
            // prepare multiple select and checks
            prepare_select_values();
            prepare_checkbox_values();
    
            // Special cases:
            // radio uses name as key and id as value for persistence
            prepare_radio_values();
            prepare_ccm();
  
            // log_form_data(); // for debugging
            
            // ==== protection against XSS attacks ====
            // for (var pair of formData.entries()) { // with ES6
            //   if ( typeof pair[ 1 ] === 'string' ){
            //     formData.set( pair[ 0 ], ccm.helper.protect( pair[ 1 ] ) );
            //   }
            // }
  
            // same without ES6:
            // for (var pair in Object.entries(formData.entries())){
            //   if ( typeof pair[ 1 ] === 'string' ){
            //     formData.set( pair[ 0 ], ccm.helper.protect( pair[ 1 ] ) );
            //   }
            // }
  
            // === POST === prepare AJAX POST request
            xhr.open('POST', self.server, true); // true === async
    
            xhr.onload = function () {
              if (this.status === 200) {
                if (xhr.response && JSON.parse(xhr.response).deadline) {
                  alert(xhr.statusText);
                } else {
                  alert(self.messages[self.language].deadline_exceeded);
                }
              } else {
                console.log(xhr.statusText + ' ' + xhr.responseText);
              }
            };
    
            xhr.send(formData);
    
            e.preventDefault();
            e.stopPropagation();
            return false;
    
            // =============== helper functions ===================
    
            // collect all values of multiple selects
            function prepare_select_values() {
              var nodeList = self.form.querySelectorAll('select');
              for (var i = 0; i < nodeList.length; i++) {
                var select_node = nodeList[i];
                formData.append(select_node.id, JSON.stringify(getSelectValues(select_node)));
              }
      
              // Return an array of the selected opion values
              // select is an HTML select element
              function getSelectValues(select) {
                var result = [];
                var options = select && select.options;
                var opt;
        
                for (var i = 0, iLen = options.length; i < iLen; i++) {
                  opt = options[i];
          
                  if (opt.selected) {
                    result.push(opt.id || encode_id(opt.value) || encode_id(opt.text));
                  }
                }
                return result;
              }
            }
    
    
            // collect all values of checkboxes
            function prepare_checkbox_values() {
              // get all checkboxes with all names
              var checkboxes = self.form.querySelectorAll('input[type="checkbox"]');
              // collect all names
              var names = [];
              for (var i = 0; i < checkboxes.length; i++) {
                var name = checkboxes[i].name;
                if (names.indexOf(name) === -1) names.push(name); // no duplicates
              }
              names.map(function (name) {
                var namedNodes = self.form.querySelectorAll('input[name="' + name + '"]');
                formData.append(name, JSON.stringify(getCheckedValues(namedNodes)));
              });
      
      
              function getCheckedValues(checkboxes) {
                var result = [];
                for (var i = 0, n = checkboxes.length; i < n; i++) {
                  if (checkboxes[i].checked) {
                    result.push(checkboxes[i].value);
                  }
                }
                return result;
              }
            }
    
            // collect all values of radio boxes
            function prepare_radio_values() {
              // get all radio boxes with all names
              var radios = self.form.querySelectorAll('input[type="radio"]');
              for (var i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                  formData.append(radios[i].name, radios[i].value);
                }
              }
            }
  
            function prepare_ccm() {
              self.ccm_elems.map(function (elem) {
                // read textarea value and write into component value
                if ( elem.id && elem.ccm_instance ){ // id is indicator for persistence
                  // first update component value === sync
                  elem.ccm_instance.sync();
                  // write value into formData object for POST request
                  formData.append(elem.id, typeof elem.ccm_instance.value === 'string' ? elem.ccm_instance.value : JSON.stringify(elem.ccm_instance.value));
                }
              });
            }
    
            function log_form_data() {
              for (var pair of formData.entries()) { // ToDo ES6
                console.log(pair[0] + ', ' + pair[1]);
              }
            }
          }

          // ==== GET ==== load previous values from database asynchronously via GET request
          self.ccm.load({
            url: self.server,
            params: {
              key: self.fkey,
              user: self.user.data().id,
              token: self.user.data().token,
              semester: self.keys.semester,
              fach: self.keys.fach
            }
          }, function (record) {
    
            // Late filling form with values with recursive descend
            // traverse by all record keys
            
            if ( typeof record === 'string' ) record = JSON.parse( record );
            
            Object.keys(record).map(assign_values_to_ids);
    
            function assign_values_to_ids(rec_key) {
      
              var rec_type = self.element_type(rec_key);
              var rec_val = record[rec_key];
      
              // handle multiple select or check
              if (rec_type === 'CHECKBOX' || rec_type === 'SELECT') {
                // value is an array
                rec_val = JSON.parse(rec_val);
              }
      
              switch (rec_type) {
                case 'RANGE':
                  if (self.element.querySelector('#' + rec_key)) {
                    var range_input_elem = self.element.querySelector('#' + rec_key);
                    if (rec_val) range_input_elem.value = rec_val;
                    range_input_elem.oninput(); // simulate input event for updating output elements
                  }
                  break;
                case 'RADIO':
                  if (rec_val) { // radio has selection
                    var selected_node = self.element.querySelector('input[name="' + rec_key + '"][value="' + rec_val + '"]');
                    if (selected_node) selected_node.checked = 'checked';
                  }
                  break;
                case 'CHECKBOX':
                  if (Array.isArray(rec_val)) {
                    rec_val.map(function (value) {
                      self.element.querySelector('input[name="' + rec_key + '"][value="' + value + '"]').checked = 'checked';
                    });
                  } else {
                    self.element.querySelector('input[name="' + rec_key + '"][value="' + rec_val + '"]').checked = 'checked';
                  }
                  break;
                case 'SELECT':
                  if (Array.isArray(rec_val)) {
                    rec_val.map(function (id) {
                      self.element.querySelector('#' + id).selected = 'selected';
                    });
                  } else {
                    self.element.querySelector('#' + rec_val).checked = 'selected';
                  }
                  break;
                case 'TEXTAREA':
                  self.element.querySelector('#' + rec_key).innerText = rec_val
                    || self.element.querySelector('#' + rec_key).innerText
                    || '';
                  break;
                case 'DEADLINE':
                  var list = self.element.querySelectorAll('.deadline'); // class selector
                  for (var i = 0; i < list.length; i++) {
                    list[i].innerText += ' ' + record.deadline;
                  }
                  break;
                case 'POINTS':
                  var point_list = self.element.querySelectorAll('.points'); // class selector
                  for (var i = 0; i < point_list.length; i++) {
                    point_list[i].innerText += ' (max. ' + record.points + ' Punkte) ';
                  }
                  break;
                default:
                  if (rec_type && rec_type.startsWith('CCM')) {
                    var ccm_instance = self.element.querySelector('#' + rec_key).ccm_instance;
                    if ( ccm_instance ) ccm_instance.sync( rec_val );
                  } else if (self.element.querySelector('#' + rec_key)) {
                    if (rec_val) self.element.querySelector('#' + rec_key).value = rec_val;
                  }
              }
            }
          })
        }
        
        // =================== helper functions =====================
  
        function file_url( args ) { // args is an object = keyword parameter
          if ( ! args.server ) args.server = self.server;
          if ( ! args.params ) args.params = self.keys;
          Object.assign( args.params, { key: self.fkey } );
          if ( args.id ) args.params.id = args.id;
          var url = args.server;
          Object.keys(args.params).map(function (key, i) {
            url += (i===0?'?':'&') + key + '=' + args.params[ key ];
          });
          return url;
        }

        if ( callback ) callback();
      };
      
      // helper functions used in init, ready and start
  
      function encode_id( id ){  // replace space by underscore
        return id.replace(/\s/g, '__');
      }
  
      function decode_id( id ){  // replace underscore by space
        return id.replace(/__/g, '  '); // ToDo this is not a safe restauration of replacement
      }

    }

  };
  
  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );