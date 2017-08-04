/**
 * @overview ccm component for upload
 * with fetch API
 * see https://stackoverflow.com/questions/36067767/how-do-i-upload-a-file-with-the-html5-js-fetch-api
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  let ccm_version = '9.0.0';
  let ccm_url     = 'https://akless.github.io/ccm/ccm.js';

  const component_name = 'upload';
  const component_obj  = {

    name: component_name,
  
    config: {
      upload_server: 'https://kaul.inf.h-brs.de/data/upload.php',
      content_type: 'image/jpeg',
      html: {
        main: {
          tag: 'form', inner: [
            { tag: 'input', type: 'file', id: 'fileElem', multiple: true,
              accept: 'image/*', style: 'display:none' },
            { tag: 'button', id: 'fileSelect', inner: 'Dateien auswählen' },
            { id: 'selected' },
            { tag: 'progress', min: '0', max: '100', value: '0', inner: '0% complete' },
            { tag: 'button', id: 'upload', type: 'submit', inner: 'Upload' },
            { tag: 'button', id: 'abort', inner: 'Abort' },
            { id: 'reports' }
          ]
        }
      },
      message: {
        select: 'Bitte wählen Sie eine Datei aus.',
        load: 'Bitte warten. Datei wird erst noch kopiert.',
        login: 'Upload erst nach Login möglich.',
        abort: 'Upload abgebrochen.'
      },
      css: [ 'ccm.load',  './resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/upload/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-1.0.0.min.js', '{sign_on: "hbrsinfkaul"}' ],
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    Instance: function () {
  
      const self = this;

      this.start = function ( callback ) {
      
        // has logger instance? => log 'render' event
        if ( self.logger ) self.logger.log( 'render' );
        
        // prepare main HTML structure
        const main_elem = self.ccm.helper.html( self.html.main );
        
        // select inner containers
        const input = main_elem.querySelector( 'input' );
        const fileSelect = main_elem.querySelector("#fileSelect");
        const fileElem = main_elem.querySelector("#fileElem");
        const selected = main_elem.querySelector("#selected");
        const progress_bar = main_elem.querySelector( 'progress' );
        const upload_button = main_elem.querySelector( '#upload' );
        const abort_button = main_elem.querySelector( '#abort' );
        const reports = main_elem.querySelector( '#reports' );
        
        // set content of own website area
        self.ccm.helper.setContent( self.element, main_elem );
  
        // preparing AJAX call
        var xhr = new XMLHttpRequest();
        
        // select file handler
        input.addEventListener('change', function (e) {
          var file_array = [];
          for (var i = 0, numFiles = input.files.length; i < numFiles; i++) {
            file_array.push( input.files[i] );
          }
          selected.textContent = file_array.map(f=>f.name).join(', ');
  
          // self.user = self.ccm.context.find( self, 'user' );
          self.ccm.load( { url: 'https://kaul.inf.h-brs.de/login/login.php', params: { realm: 'hbrsinfkaul' } }, function ( response ) {
  
            // user data
            var dataset = self.ccm.helper.filterProperties( response, 'user', 'token' );
  
            var formData = new FormData();
  
            formData.append('files', input.files);
            formData.append('user', dataset.user );
            formData.append('token', dataset.token);

            xhr.open( "POST", self.upload_server, true );
            
            xhr.onload = function(e) {
              console.log( this.responseText );
              console.log( JSON.parse(this.response) );
              alert( 'onload' );
            };
  
            xhr.upload.onprogress = function(e) {
              if (e.lengthComputable) {
                if (e.total === 0) e.total = 100;
                progress_bar.value = (e.loaded / e.total) * 100;
                progress_bar.textContent = progress_bar.value; // Fallback for unsupported browsers.
              }
            };
            
            xhr.send( formData );
          });
          
        }, false);
        
        // Freie Gestaltung von fileElem => Weiterleitung an fileSelect
        fileSelect.addEventListener("click", function (e) {
          fileElem.click();
          e.preventDefault(); // prevent navigation to "#"
        }, false);
        
        abort_button.addEventListener('click', abort, false);
        
        function abort( e ){
          xhr.abort();
          alert( self.message.abort );
        }

        if ( callback ) callback();
      };

    }

  };

  var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
  if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
  function register() { ccm[ ccm_version ].component( component_obj ); }
}() );