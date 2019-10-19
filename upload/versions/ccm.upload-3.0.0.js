/**
 * @overview ccm component for upload with XMLHttpRequest async
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {
  
  var component = {
    
    name: 'upload',

    version: [3,0,0],

    /**
     * recommended used framework version
     * @type {string}
     */

    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.3.0.js',
    
    config: {
      fkey:           'test',  // ToDo Use fkey instead of key
      keys: {        // additional DB keys if necessary (optional)
        semester: 172, // year + semester count, e.g. 2017 in 2nd semester
        fach: 'se',    // subject
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
      // filename: 'somefile.txt',
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
          tag: 'a', target: '_blank', inner: '%name%', rel: 'noopener'
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
      
      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/upload/resources/default.css' ],

      user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.0.1.js', { realm: "hbrsinfkaul" } ]

      // onfinish: function( instance, results ){ console.log( results ); }
    },

    /**
     * for creating instances of this component
     * @constructor
     */
    Instance: function () {

      "use strict";

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
       * data from database
       * @type {Object.<string,function>}
       */
      let dataset;

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

        // inherit context parameter
        // if ( ! self.fkey ) self.fkey = self.ccm.context.find(self,'fkey');
        // self.keys = {
        //   semester: self.semester || self.ccm.context.find(self,'semester'),
        //   fach: self.fach || self.ccm.context.find(self,'fach')
        // };

      };

      /**
       * is called once after the initialization and is then deleted
       */
      this.ready = async () => {

        // set shortcut to help functions
        $ = self.ccm.helper;

      };

      this.getValue = function() {
        return dataset;
      };

      /**
       * starts the instance
       */
      this.start = async () => {
  
        // has logger instance? => log 'start' event
        if ( self.logger ) self.logger.log( 'start', { component: self.index, fkey: self.fkey, keys: self.keys } );

        dataset = await $.dataset( self.data );

        // prepare main HTML structure
        const main_elem = self.ccm.helper.html( self.html.main, {
          accept: self.content_type
        } );
        
        // select inner containers
        const input = main_elem.querySelector( 'input' );
        const progress_bar = main_elem.querySelector( 'progress' );
        const abort_button = main_elem.querySelector( '#abort' );
        const reports = main_elem.querySelector( '#reports' );
        const failure = main_elem.querySelector( '#failure' );
        
        // set content of own website area
        self.ccm.helper.setContent( self.element, main_elem );

        if ( dataset && dataset.name ) report_file_link();  // show old file
  
        // create a back link from HTML root element <ccm-*> to ccm component instance
        // self.root.ccm_instance = self;
  
        // placeholder for all upcoming AJAX requests
        let xhr;
        
        // id from root
        // if ( self.root.id ) dataset.id = self.root.id;
        
        // add event listeners for all buttons
        input.addEventListener('change', selectFile, false);
        abort_button.addEventListener('click', abort, false);
  
        // sync function before file is selected
        self.sync = function ( event_or_value ) {
          if ( event_or_value !== 'undefined' && event_or_value && ! ( event_or_value instanceof Event ) ){
            self.value = JSON.parse( event_or_value );
          }
          Object.assign( dataset, self.value );
          report_file_link();
          if ( self.logger ) self.logger.log( 'sync', dataset );
          if( event_or_value instanceof Event ){
            event_or_value.preventDefault();
            event_or_value.stopPropagation();
            return false;
          }
        };
        
        // "select file" handler
        async function selectFile() {
  
          // get file
          const file = this.files[0];
          dataset.name = file.name;
  
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
            Object.assign( dataset, self.value );
            report_file_link();
            if ( self.logger ) self.logger.log( 'sync', dataset );
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
          const formData = new FormData();
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
            const msg = ' Status: '+ xhr.status
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
              if ( self.logger ) self.logger.log( 'success', dataset );
            }
          };
  
          // has user instance? => login user (if not already logged in)
          if ( self.user ) {
            await self.user.start();
            // $.setContent( self.element.querySelector( '#user' ), self.user.root );
            proceed();
          }
  
          function proceed() {
            Object.assign( dataset, { user: self.user.data().user, token: self.user.data().token } );
            Object.keys( dataset ).map(function (key) {
              formData.append(key, dataset[key] );
            });
            xhr.send(formData);
          }
  
          function log_form(x) { // for debugging only
            console.log(x);
            let result = {};
            for (let entry of formData.entries()) { // ToDo ES6
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
          const element = self.ccm.helper.html( self.html.response, dataset );
          const src = file_url( self.server, dataset );
          element.src = src;
          element.href = src;
          reports.appendChild(element);
        }
  
        function file_url( server, params ) {
          let url = server;
          
          // add user parameters
          Object.assign( params, {
            user: self.user.data().user,
            token: self.user.data().token,
            key: self.fkey,
            id: self.keys.id,
            semester: self.keys.semester,
            fach: self.keys.fach
          } );

          // construct URL
          Object.keys(params).forEach(function (key, i) {
            url += (i===0?'?':'&') + key + '=' + encodeURIComponent( params[ key ] );
          });
          return url;
        }

      };

    }

  };
  
  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );