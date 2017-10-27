/**
 * @overview ccm component for solutions_view
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component  = {

    name: 'solutions_view',
    
    ccm: 'https://akless.github.io/ccm/version/ccm-11.5.0.min.js',
    // ccm: '//akless.github.io/ccm/ccm.js',

    config: {
      server: 'https://kaul.inf.h-brs.de/data/form.php', // uniform server access
      preset_values: {
        semester: 172,
        fach: 'se',
        points: '+'
      },
      solution_format: [ 'keyword', 'id', 'solution', 'points', 'stamp', 'deadline', 'uid' ],
      all_solutions: [ ["le01_program","loes01_1","package se_01;\r\n\r\npublic class HelloWorld {\r\n\tString greetings(String name){\r\n\t\treturn \"Hello \" + name;\r\n\t}\r\n}",null,"2017-10-14 19:43:44",1,'xyz'], ["le01_program","loes01_2","package se_02;",null,"2017-10-14 19:43:45",1,'xyz'] ],
      members: {"xyz":{"id":"xyz","name":"xyzuvw","email":"xyz@h-brs.de","gruppe":0,"team_name":"hurray","uid":"xyz","nachname":"Kaul","vorname":"Manfred","geschlecht":"M","stamp":"2017-10-10 10:00:00"}},
      max_group: 6,
      group_selected: 6,
      user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-2.0.0.min.js', { sign_on: "hbrsinfkaul", logged_in: true } ],
      uml:    [ 'ccm.component', 'https://kaul.inf.h-brs.de/data/ccm/uml/ccm.uml.js' ],
      upload: [ 'ccm.component', 'https://kaul.inf.h-brs.de/data/ccm/upload/ccm.upload.js', { semester: 172, fach: 'se'} ],
      highlight: [ 'ccm.component', 'https://kaul.inf.h-brs.de/data/ccm/highlight/ccm.highlight.js' ],
      editor: [ 'ccm.component', 'https://tkless.github.io/ccm-components/editor/versions/ccm.editor-1.0.0.js', {
        settings: {
          modules: {
            history: {
              delay: 1000,
              maxStack: 300,
              userOnly: false // default
            },
            //syntax: true,    // needed for syntax highlighting

            toolbar: [          // if no toolbar needed set: settings.modules.toolbar: false
              // [ { 'header': [1, 2, 3, 4, 5, 6, false] } ],
              [ 'bold', 'italic', 'underline', 'strike' ],        // toggled buttons
              [ { 'size': ['small', false, 'large', 'huge'] } ],
              [ { 'list': 'ordered'}, { 'list': 'bullet' } ],
              [ { 'indent': '-1'}, { 'indent': '+1' } ],
              [ { 'color': [] }, { 'background': [] } ],
              // [ { 'font': [] } ],
              // [ { 'align': [] } ],
              [ 'link' ],   // , 'image' => beware of large data volume
              // [ 'clean' ]
            ]
          },
          placeholder: 'Inhaltsbereich für den Editor',
          theme: 'snow'
        }
      } ],
      html: {
        main: {
          inner: [
            { tag: 'h1', inner: [ { tag: 'span', class: 'count' }, ' Solutions ' ] },
            { id: 'groups' },
            'Anonym:', { tag: 'input', type: "checkbox", name: "anonym", id: "anonym" }
          ]
        },
        solution: { id: 'nr_%nr%', class: 'solution  g%gruppe%',
          inner: [
            { tag: 'hr' },
            // { tag: 'h3', inner: ' %keyword%.%id% ' },
            { inner: [
              { tag: 'span', class: 'solution_head anonym', inner:' %anrede% %vorname% %nachname% (%uid%) ' },
              ' Gruppe: %gruppe%, ',
              ' am %stamp%, mit %points% Punkten, Deadline: %deadline% ',
              { tag: 'button', class: 'null_button', inner: 'Null Punkte!' },
              { tag: 'button', class: 'one_button', inner: '&nbsp;1&nbsp;', title: 'Ein Punkt!' },
              { tag: 'button', class: 'voll_button', inner: 'Volle Punkte!' },
              { tag: 'select', class: 'code_selector', name: 'code', inner: [
                { tag: 'option', inner: 'textarea' },
                { tag: 'option', inner: 'java' },
                { tag: 'option', inner: 'plain' },
                { tag: 'option', inner: 'link' },
                { tag: 'option', inner: 'editor' }
              ] }
            ] },
            { class: 'solution_body' }
          ]
        }
      },
      final_values: function( values, members ){ // final corrections and polishing of values
        var uid = values.uid.trim().toLowerCase();
        // values of a single solution
        values.vorname = members[uid].vorname.split(' ')[0]; // take only first of first names
        values.anrede  = members[uid].geschlecht === 'M' ? 'Herr ' : 'Frau ';
        values.fullname = values.anrede + values.vorname + ' ' + values.nachname;
      },
      css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/solutions_view/resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/solutions_view/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-2.0.0.min.js' ],
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    Instance: function () {
    
      var self = this;

      this.start = function ( callback ) {
      
        // has logger instance? => log 'render' event
        if ( self.logger ) self.logger.log( 'render' );
        
        // prepare main HTML structure
        var main_elem = self.ccm.helper.html( self.html.main );
        var count_span = main_elem.querySelector('span.count');

        // select group via checkbox
        var groups = main_elem.querySelector('#groups');
        let checkbox = [];
        if ( groups ) {
          var group_counter = [];
          for (var i=0; i<=self.max_group; i++){ group_counter.push( i ); }
          group_counter.map( group => {
            checkbox[ group ] = ccm.helper.html({ tag: 'label', inner: [{tag:'input', type:'checkbox', name: 'gruppe', id: 'g' + group, value: 'g' + group }, group ]});
            checkbox[ group ].addEventListener('click', (e)=>{
              if (e.toElement.checked){
                [ ...self.element.querySelectorAll( '.g' + group ) ].map(( div )=>{
                  div.style.display = 'inline';
                });
              } else {
                [ ...self.element.querySelectorAll( '.g' + group ) ].map(( div )=>{
                  div.style.display = 'none';
                });
              }
              count();
            });
            groups.appendChild( checkbox[ group ] );
          });
        }

        // switch names on and off via checkbox
        var anonym = main_elem.querySelector('#anonym');
        if ( anonym ){
          anonym.addEventListener('click', (e) => {
            if (e.toElement.checked){
              [...self.element.querySelectorAll('.anonym')].map((elem)=>{
                elem.style.display = 'none';
              });
            } else {
              [...self.element.querySelectorAll('.anonym')].map((elem)=>{
                elem.style.display = 'block';
              });
            }
          });
        }

        // set content of own website area
        self.ccm.helper.setContent( self.element, main_elem );

        // render all solutions
        self.all_solutions.map(function (rec, nr) {

          var uid = get(rec, 'uid');

          if ( get(rec, 'solution') ) { // skip null solutions

            try {
              rec[self.solution_format.indexOf('solution')] = JSON.parse(get(rec, 'solution'));
            } catch (e) {}

            uid = uid.toLowerCase().trim();

            if ( ! self.members[uid] ) console.log( "Not member: ", uid ); else {

              var values = {
                nr: nr,
                uid: uid
              };

              values = Object.assign( values, self.preset_values );

              Object.keys( self.members[ uid ] ).map( field => {
                values[ field ] = self.members[uid][field];
              });

              self.solution_format.map( field => {
                values[ field ] = get( rec, field ) || self.preset_values[ field ];
              });

              // final corrections and polishing of values
              self.final_values( values, self.members );

              // deep copy
              var structure = JSON.parse(JSON.stringify(self.html.solution));

              // combine solution and values
              var single_solution = self.ccm.helper.html( structure, values );

              // restore original value
              values.solution = get(rec, 'solution'); // ToDo Workaround for Bug in ccm.helper.html transforming double quotes into single quotes
              var solution_body = single_solution.querySelector('.solution_body');

              var code_selector = single_solution.querySelector('.code_selector');
              code_selector.addEventListener('change', (e)=>{
                var code = (e.toElement || e.srcElement).selectedOptions[0].value;
                var newChild;
                switch ( code ){
                  case 'textarea':
                      single_solution.replaceChild( self.ccm.helper.html( {tag:'textarea', inner: values.solution } ), single_solution.lastElementChild );
                    break;
                  case "java":
                    newChild = document.createElement('div');
                    single_solution.replaceChild( newChild, single_solution.lastElementChild );
                    self.highlight.start({root: newChild, clazz: 'java', content: values.solution});
                    break;
                  case "plain":
                    newChild = document.createElement('div');
                    single_solution.replaceChild( newChild, single_solution.lastElementChild );
                    self.highlight.start({root: newChild, clazz: 'plain', content: values.solution});
                    break;
                  case "link":
                    single_solution.replaceChild( self.ccm.helper.html( {tag:'a', target: '_blank', href: values.solution, inner: values.solution } ), single_solution.lastElementChild );
                    break;
                  case "editor":
                    newChild = document.createElement('div');
                    single_solution.replaceChild( newChild, single_solution.lastElementChild );
                    if ( ! values.solution.ops ){

                    }
                    self.editor.start( { root: newChild }, instance => {
                        instance.get().setContents( values.solution );
                      });
                    break;
                  default:
                    debugger;
                    div_start( code, (inst, value) => inst.inner = value );
                }
              });

              function typing( solution ){
                var typ = typeof solution;
                if ( typ === "string" ){
                  if ( solution.startsWith('{') ) return "json";
                  else return "string"
                }
                if ( typ === "object" ){
                  if ( solution.ccm_type ) return solution.ccm_type; // ccm typing
                  if ( solution.uml ) return "uml";
                  if ( solution.ops ) return "editor";
                  if ( solution.type ) return "upload";
                  if ( Array.isArray( solution ) ) return "array";
                  else return "object";
                }
                return typ;
              }

              // different renderings of solution
              var solution_type = typing( values.solution );
              switch( solution_type ) {
                case "textarea":
                  solution_body.appendChild(self.ccm.helper.html({ tag: 'textarea', inner: values.solution }));
                  code_selector.value = "textarea";
                  break;
                case "editor":
                  self.editor.start({root: solution_body}, function(instance){
                      // solution_body.appendChild( instance.root );
                      instance.get().setContents( values.solution );
                  });
                  code_selector.value = solution_type;
                  break;
                case "string":
                  self.highlight.start({ root: solution_body, class: 'java', content: values.solution.split('<').join('&lt;').split('>').join('&gt;') });
                  code_selector.value = "java";
                  // .replace(/(?:\\[rn])+/g, "\n").replace(/(?:\\[t])+/g, "\t") });
                  break;
                case "object":
                  Object.keys( values.solution ).map(( key )=>{
                    solution_body.appendChild(self.ccm.helper.html({ tag: 'textarea', inner: values.solution[key] }));
                    solution_body.appendChild(self.ccm.helper.html({ tag: 'br' }));
                  });
                  code_selector.value = "textarea";
                  break;
                case "uml":
                  self.uml.start({root: solution_body, default: values.solution.uml }, instance => {
                    instance.sync( values.solution.uml );
                  });
                  code_selector.value = solution_type;
                  break;
                case "upload":
                  if ( values.solution.type.startsWith('image') ){
                    solution_body.appendChild( image_tag( get(rec, 'keyword' ), values ) );
                  } else {
                    self.upload.start({ root: solution_body, fkey: get(rec, 'keyword'), keys: { semester: self.preset_values.semester, fach: self.preset_values.fach, id: values.id } }, instance => {
                      instance.sync( JSON.stringify( values.solution ) );
                    });
                  }
                  code_selector.value = solution_type;
                  break;
                default:
                  if ( self[ solution_type ] ){
                    self[ solution_type ].start({ root: solution_body, content: values.solution }, function(instance){
                      // solution_body.appendChild( instance.root );
                      instance.value = values.solution;
                    });
                    solution_body.appendChild( self.ccm.helper.html( { tag: 'textarea', inner: values.solution } ) );
                  } else {
                    solution_body.appendChild( self.ccm.helper.html( { inner: JSON.stringify( values.solution ) } ) );
                  }
                  code_selector.value = solution_type;
              }

              var null_button = single_solution.querySelector('.null_button');
              if ( null_button ){
                null_button.addEventListener('click', (e)=>{
                  self.ccm.load({ url: 'https://kaul.inf.h-brs.de/data/form_nullify.php', params: { key: keyword, id: id, uid: uid } }, (result)=>{
                    if (result.result) alert( 'Null Punkte für '+ values.fullname +' eingetragen.' ); else alert( 'Error: ' + result.result );
                  });
                });
              }

              var one_button = single_solution.querySelector('.one_button');
              if ( one_button ){
                one_button.addEventListener('click', (e)=>{
                  self.ccm.load({ url: 'https://kaul.inf.h-brs.de/data/form_onify.php', params: { key: keyword, id: id, uid: uid } }, (result)=>{
                    if (result.result) alert( 'Einen Punkt für '+ values.fullname +' eingetragen.' ); else alert( 'Error: ' + result.result );
                  });
                });
              }

              var voll_button = single_solution.querySelector('.voll_button');
              if ( voll_button ){
                voll_button.addEventListener('click', (e)=>{
                  self.ccm.load({ url: 'https://kaul.inf.h-brs.de/data/form_fullify.php', params: { key: keyword, id: id, uid: uid } }, (result)=>{
                    if (result.result) alert( 'Volle Punkte für '+ values.fullname +' eingetragen.' ); else alert( 'Error: ' + result.result );
                  });
                });
              }

              self.element.appendChild( single_solution );

            }

          }
        });

        [ ...self.element.querySelectorAll('.solution') ].map( (solution_div) => {
          solution_div.style.display = 'none';
        });
        if ( groups ) checkbox[ self.group_selected ].click();
        count();

        // ================= Helper Functions ==============

        function div_start( code, callback, params ){
          [ ...self.element.querySelectorAll('.solution') ].map( (solution) => {
            var nr = parseInt(solution.id.slice(3));
            params = Object.assign( params, { root: solution.lastElementChild } );
            self[ code ].start( params, instance => {
              callback( instance, get(self.all_solutions[ nr ], 'solution') );
            });
          });
        }

        function count(){
          count_span.innerText = self.element.querySelectorAll('.solution:not([style*="display:none"]):not([style*="display: none"])').length;
        }

        function get( rec, field ){
          return rec[self.solution_format.indexOf(field)];
        }

        function image_tag( key, values ) {
          var image = document.createElement('img');
          image.style = 'width: 50%; height:auto';
          image.src = get_url({ url: self.server, params: { semester: self.semester, fach: self.fach, key: key, id: values.id, user: self.user.data().id, token: self.user.data().token } });
          return image;
        }

        function get_url( args ) {
          var url = args.url;
          Object.keys( args.params ).map( (key, index) => {
            url += index === 0 ? '?' : '&';
            url += key;
            url += '=';
            url += args.params[key];
          });
          console.log( url );
          return url;
        }

        if ( callback ) callback();
      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );