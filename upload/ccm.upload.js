/**
 * @overview ccm component for upload with XMLHttpRequest async
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {
  
  var component = {
    
    name: 'upload',
  
    ccm: 'https://akless.github.io/ccm/version/ccm-11.5.0.min.js',
    // ccm: '//akless.github.io/ccm/ccm.js',
    
    config: {
      fkey:           'test',  // ToDo Use fkey instead of key
      keys: {        // additional DB keys if necessary (optional)
        semester: 172,
        fach: 'se',
        id: 'portrait' // default, overwritten by self.root.id == id of HTML element
      },
      server: 'https://kaul.inf.h-brs.de/data/form.php', // uniform server access

      upload_size: 100, // max. 100 MB, see php.ini upload_max_filesize = 120M
      upload_time: 80,  // max 80 sec,  see php.ini max_execution_time = 90
      
      content_type:  'image/*,.jpeg,.jpg,.png',  // which types to accept by file chooser
          // see https://stackoverflow.com/questions/181214/file-input-accept-attribute-is-it-useful
      type_regex:    'image/.*', // check type via regex, or see next line:
      suffix_regex:  '\.jpeg$|\.jpg$|\.png$', // or check via name suffix
            // both regex are alternatives or may both be omitted
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
          tag: 'a', target: '_blank', inner: '%name%'
        }
      },
      
      language: 'de', // Dynamic Switching by restart
      messages: {
        'en': {
          abort: 'Upload cancelled: ',
          success: 'Upload successful: ',
          file_too_large: 'File too large',
          wrong_file_type: 'Wrong file type',
          wrong_suffix: 'Wrong file suffix'
        },
        'de': {
          abort: 'Upload abgebrochen: ',
          success: 'Fertig hochgeladen: ',
          file_too_large: 'Datei zu groß',
          wrong_file_type: 'Falscher Datei-Typ',
          wrong_suffix: 'Falsche Datei-Endung'
        }
      },
      
      css: [ 'ccm.load',  'https://kaul.inf.h-brs.de/data/ccm/upload/resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/upload/resources/default.css' ],
      user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-2.0.0.min.js', { sign_on: "hbrsinfkaul" } ],
      logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://kaul.inf.h-brs.de/data/2017/se1/json/log_configs.js', 'se_ws17_upload' ] ]
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    Instance: function () {
  
      var self = this;
      
      this.init = function ( callback ) {
        // inherit context parameter
        if ( ! self.fkey ) self.fkey = self.ccm.context.find(self,'fkey');
        self.keys = {
          semester: self.semester || self.ccm.context.find(self,'semester'),
          fach: self.fach || self.ccm.context.find(self,'fach')
        };
  
        callback();
      };

      this.start = function ( callback ) {
  
        // has logger instance? => log 'start' event
        if ( self.logger ) self.logger.log( 'start', { component: self.index, fkey: self.fkey, keys: self.keys, id: self.id } );
        
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
  
        // create a back link from HTML root element <ccm-*> to ccm component instance
        self.root.ccm_instance = self;
  
        // placeholder for all upcoming AJAX requests
        var xhr;
        
        // parameters for input dialog
        var params = { key: self.fkey };
        Object.assign( params, self.keys );
        
        // id from root
        if ( self.root.id ) params.id = self.root.id;
        
        // add event listeners for all buttons
        input.addEventListener('change', selectFile, false);
        abort_button.addEventListener('click', abort, false);
  
        // sync function before file is selected
        self.sync = function ( event_or_value ) {
          if ( event_or_value !== 'undefined' && event_or_value && ! ( event_or_value instanceof Event ) ){
            self.value = JSON.parse( event_or_value );
          }
          Object.assign( params, self.value );
          report_file_link();
          if ( self.logger ) self.logger.log( 'sync', params );
          if( event_or_value instanceof Event ){
            event_or_value.preventDefault();
            event_or_value.stopPropagation();
            return false;
          }
        };
        
        // "select file" handler
        function selectFile() {
  
          // get file
          var file = this.files[0];
          params.name = file.name;
  
          // sync function after file is selected
          self.sync = function ( event_or_value ) {
            if ( event_or_value !== 'undefined' && event_or_value && ! ( event_or_value instanceof Event ) ){
              self.value = JSON.parse( event_or_value );
            } else {
              self.value = {
                name: file.name,
                size: file.size,
                type: file.type
              };
            }
            Object.assign( params, self.value );
            report_file_link();
            if ( self.logger ) self.logger.log( 'sync', params );
            if( event_or_value instanceof Event ){
              event_or_value.preventDefault();
              event_or_value.stopPropagation();
              return false;
            }
          };
  
          // ======== all checks of file type and file suffix ==========
          
          // prevent hacker attack uploading PHP file
          if (file.name.split('.').slice(-1)[0].toUpperCase() === 'PHP'){
            alert( self.messages[self.language].wrong_file_type );
            return false;
          }
  
          // Input Validation: size
          if ( file.size > self.upload_size * 1024 * 1024 ){
            alert( self.messages[self.language].file_too_large );
            return false;
          }
  
          function wrong_file_type(file){
            return  self.type_regex && ! file.type.match( self.type_regex )
              &&  self.suffix_regex && ! file.name.match( self.suffix_regex );
          }
          
          if ( ( self.type_regex || self.suffix_regex ) && wrong_file_type(file) ){
            if ( self.type_regex && ! file.type.match( self.type_regex ) ){
              reports.textContent = 'File type is ' + file.type
                + ', required is type ' + self.type_regex;
              alert( self.messages[self.language].wrong_file_type );
              return false;
            }
            if ( self.suffix_regex && ! file.name.match( self.suffix_regex ) ){
              reports.textContent = 'File type is ' + file.type
                + ', required is suffix ' + self.suffix_regex;
              alert( self.messages[self.language].wrong_suffix );
              return false;
            }
          }
          
          // prepare next AJAX request
          xhr = new XMLHttpRequest(); // new request for every file to be uploaded
          reports.textContent = ''; // clear old success reports
          failure.textContent = ''; // clear old error messages
          
          // prepare form data
          var formData = new FormData();
          formData.append('key', self.fkey);
          formData.append("file", file);
  
          // prepare AJAX POST request
          xhr.open('POST', self.upload_server ? self.upload_server : self.server, true); // true === async
  
          // update progress bar
          xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
              progress_bar.value = (e.loaded / e.total) * 100;
              progress_bar.textContent = progress_bar.value; // Fallback for unsupported browsers.
            }
          };
  
          // handle all kinds of errors during upload
          function error_message( event ){
            var msg = ' Status: '+ xhr.status
              + ', Event: ' + JSON.stringify(event)
              + ', Response: ' + xhr.response + '.';
            // has logger instance? => log 'error' event
            if ( self.logger ) self.logger.log( 'error', { fkey: self.fkey, keys: self.keys, msg: msg } );
            return msg;
          }
          
          xhr.upload.onabort = function (event) {
            failure.textContent += 'Abort' + error_message( event );
          };
  
          xhr.upload.onerror = function (event) {
            failure.textContent += 'Error' + error_message( event );
          };
  
          xhr.upload.ontimeout = function (event) {
            failure.textContent += 'Timeout' + error_message( event )
              + ' Max. time for upload is ' + self.upload_time + ' sec.';
          };
  
          xhr.onload = function () {
            if (this.status == 200) {
              report_file_link();
              // has logger instance? => log 'success' event
              if ( self.logger ) self.logger.log( 'success', params );
            }
          };
  
          // has user instance? => login user (if not already logged in)
          if (self.user) self.user.login(proceed); else proceed();
  
          function proceed() {
            Object.assign( params, { user: self.user.data().id, token: self.user.data().token } );
            Object.keys( params ).map(function (key) {
              formData.append(key, params[key] );
            });
            xhr.send(formData);
          }
  
          function log_form(x) { // for debugging only
            console.log(x);
            var result = {};
            for (var entry of formData.entries()) { // ToDo ES6
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
        
        function report_file_link(){
          reports.textContent = self.messages[self.language].success;
          var element = self.ccm.helper.html( self.html.response, params );
          var src = file_url( self.server, params );
          element.src = src;
          element.href = src;
          reports.appendChild(element);
        }
  
        function file_url( server, params ) {
          var url = server;
          
          // Whitelist of legal parameters
          var whitelist = [ 'key', 'id', 'user', 'token' ].concat( Object.keys( self.keys ) );
          
          // add user parameters
          Object.assign( params, { user: self.user.data().id, token: self.user.data().token } );
          Object.keys(params).map(function (key, i) {
            if ( whitelist.indexOf( key ) > -1 ) {
              url += (i===0?'?':'&') + key + '=' + encodeURIComponent( params[ key ] );
            }
          });
          return url;
        }

        if ( callback ) callback( self );
      };

    }

  };
  
  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );