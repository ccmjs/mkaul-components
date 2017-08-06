/**
 * @overview ccm component for upload with XMLHttpRequest async
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  var ccm_version = '9.0.0';
  var ccm_url     = 'https://akless.github.io/ccm/ccm.js';

  var component_name = 'upload';
  var component_obj  = {

    name: component_name,
  
    config: {
      key:           'test',
      upload_server: 'https://kaul.inf.h-brs.de/data/upload.php',
      view_server:   'https://kaul.inf.h-brs.de/data/view.php',
      content_type:  'image/*',
      html: {
        main: {
          tag: 'form', inner: [
            { tag: 'input', type: 'file', accept: '%accept%' },
            { tag: 'progress', min: '0', max: '100', value: '0', inner: '0% complete' },
            { tag: 'button', id: 'abort', inner: 'Abort' },
            { id: 'reports' },
            { id: 'failure'}
          ]
        },
        response: {
          tag: 'a', target: '_blank', inner: '%filename%'
        }
      },
      message: {
        abort:   'Upload abgebrochen: ',
        success: 'Fertig hochgeladen: '
      },
      css: [ 'ccm.load',  './resources/default.css' ]
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/upload/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-1.0.0.min.js', { sign_on: "hbrsinfkaul" } ],
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    Instance: function () {
  
      var self = this;

      this.start = function ( callback ) {
      
        // has logger instance? => log 'render' event
        if ( self.logger ) self.logger.log( 'render' );
        
        // prepare main HTML structure
        var main_elem = self.ccm.helper.html( self.html.main, { accept: self.content_type } );
        
        // select inner containers
        var input = main_elem.querySelector( 'input' );
        var progress_bar = main_elem.querySelector( 'progress' );
        var abort_button = main_elem.querySelector( '#abort' );
        var reports = main_elem.querySelector( '#reports' );
        var failure = main_elem.querySelector( '#failure' );
        
        // set content of own website area
        self.ccm.helper.setContent( self.element, main_elem );
  
        
        var xhr;
        var database_keys = { key: self.key, view_server: self.view_server };
  
        input.addEventListener('change', selectFile, false);
        abort_button.addEventListener('click', abort, false);
        
        // "select file" handler
        function selectFile() {
          
          // prepare next AJAX request
          xhr = new XMLHttpRequest();
          reports.textContent = ''; // clear old success reports
          failure.textContent = ''; // clear old error messages
          
          // get file
          var file = this.files[0];
          database_keys.filename = file.name;
          
          // prepare form data
          var formData = new FormData();
          formData.append('key', self.key);
          formData.append("file", file);
  
          // prepare AJAX call
          xhr.open('POST', self.upload_server, true);
  
          xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
              progress_bar.value = (e.loaded / e.total) * 100;
              progress_bar.textContent = progress_bar.value; // Fallback for unsupported browsers.
            }
          };
  
          function error_message( event ){
            return ' Status: '+ xhr.status
              + ', Event: ' + JSON.stringify(event)
              + ', Response: ' + xhr.response + '.'
          }
          
          xhr.upload.onabort = function (event) {
            failure.textContent += 'Abort' + error_message( event );
          };
  
          xhr.upload.onerror = function (event) {
            failure.textContent += 'Error' + error_message( event );
          };
  
          xhr.upload.ontimeout = function (event) {
            failure.textContent += 'Timeout' + error_message( event );
          };
  
          xhr.onload = function () {
            if (this.status == 200) {
              reports.textContent = self.message.success;
              var element = self.ccm.helper.html( self.html.response, database_keys );
              element.href = self.view_server + '?'
                + 'user=' + database_keys.user
                + '&token=' + database_keys.token
                + '&key=' + self.key;
              reports.appendChild(element);
            }
          };
  
          // has user instance? => login user (if not already logged in)
          if (self.user) self.user.login(proceed); else proceed();
  
          function proceed() {
            database_keys.user = self.user.data().user;
            database_keys.token = self.user.data().token;
            formData.append('user', self.user.data().user);
            formData.append('token', self.user.data().token);
            xhr.send(formData);
          }
  
          function log_form(x) { // for debugging only
            console.log(x);
            var result = {};
            for (var entry of formData.entries()) {
              result[entry[0]] = entry[1];
            }
            result = JSON.stringify(result);
            console.log(result);
            return JSON.stringify(formData.entries());
          }
        }
  
        // interrupt current AJAX request without reloading the HTML page
        function abort(e){
          xhr.abort();
          
          // prevent reloading component and HTML page
          e.preventDefault();
          e.stopPropagation();
          return false;
        }

        if ( callback ) callback();
      };

    }

  };

  var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
  if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
  function register() { ccm[ ccm_version ].component( component_obj ); }
}() );