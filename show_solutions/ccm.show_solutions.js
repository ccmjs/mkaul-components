/**
 * @overview ccm component for show_solutions
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 *
 * Usage:
 * <ccm-form fkey="le01_program">
 * <p>Richten Sie Ihre Entwicklungsumgebung für Java 8 ein und schreiben Sie Hello World in Java 8.</p>
 * <label for="loes01_1">Ihre Lösung:</label>
 * <textarea id="loes01_1" placeholder="class HelloWorld ..."></textarea>
 * <ccm-show_solutions for="loes01_1"></ccm-show_solutions>
 */

( function () {
  
  var component  = {
    
    name: 'show_solutions',
  
    ccm: 'https://akless.github.io/ccm/version/ccm-11.5.0.min.js',
    // ccm: '//akless.github.io/ccm/ccm.js',
    
    config: {
      server: 'https://kaul.inf.h-brs.de/data/form.php',
      
      highlight: [ 'ccm.component', 'https://kaul.inf.h-brs.de/data/ccm/highlight/ccm.highlight.js' ],
      
      html: {
        main: {
          inner: [
            { tag: 'input', id: '%id%', type: 'checkbox' },
            { tag: 'label', for: '%id%', inner: 'Zeige Liste aller eingereichten Lösungen' },
            { class: 'solutions' },
            { tag: 'a', class: 'more', inner: { tag: 'i', inner: '...more' } }
          ]
        },
        error: {
          inner: 'Bitte bis zur Deadline %deadline% warten!'
        },
        solution: {
          inner: [
            {
              class: 'solution',
              inner: { tag: 'textarea' }
            },
            {
              inner: [
                { class: 'voting' },
                { class: 'comments' }
              ]
            }
          ]
        },
        multiple_solutions: {
          inner: [
            {
              class: 'solution',
              inner: [
                {
                  class: 'voting'
                }
              ]
            },
            { class: 'comments' }
          ]
        }
      },
      css: [ 'ccm.load',  'https://kaul.inf.h-brs.de/data/ccm/show_solutions/resources/default.css' ],
      
      user: [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-2.0.0.min.js', { "sign_on": "hbrsinfkaul" } ],
      comment: [ 'ccm.component', 'https://tkless.github.io/ccm-components/comment/versions/ccm.comment-1.0.0.js', {
        data: {
          store: ['ccm.store', { store: 'hbrs_ss17_se1_comments', url: 'https://ccm.inf.h-brs.de' } ],
          "permission_settings": { "access": "group" }
        },
        logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', '//kaul.inf.h-brs.de/data/2017/se1/json/log_configs.js', 'se_ws17_comment' ] ]
      } ],
      
      voting: [ 'ccm.component', 'https://tkless.github.io/ccm-components/thumb_rating/versions/ccm.thumb_rating-1.0.0.js', {
        data: {
          store: ['ccm.store', { store: 'hbrs_ss17_se1_voting', url: 'wss://ccm.inf.h-brs.de' } ],
          "permission_settings": { "access": "group" }
        },
        user: [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-2.0.0.min.js' ],
        logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://kaul.inf.h-brs.de/data/2017/se1/json/log_configs.js', 'se_ws17_voting' ] ]
      } ],

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
              // [ { 'list': 'ordered'}, { 'list': 'bullet' } ],
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

      uml:    [ 'ccm.component', 'https://kaul.inf.h-brs.de/data/ccm/uml/ccm.uml.js' ],
      
      logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://kaul.inf.h-brs.de/data/2017/se1/json/log_configs.js', 'se_ws17_show_solutions' ] ]
      
      // onfinish: function( instance, results ){ console.log( results ); }
    },
    
    Instance: function () {
      
      var self = this;
      
      this.start = function ( callback ) {
  
        // inherit context parameter
        if ( ! self.fkey ) self.fkey = self.ccm.context.find(self,'fkey');
        self.keys = {
          semester: self.semester || self.ccm.context.find(self,'semester'),
          fach: self.fach || self.ccm.context.find(self,'fach')
        };
        if ( ! self.for ) self.for = self.root.getAttribute('for');
        
        // has logger instance? => log 'start' event
        // if ( self.logger ) self.logger.log( 'start', { component: self.index, fkey: self.fkey, for: self.for } );
        
        // prepare main HTML structure
        var main_elem = self.ccm.helper.html( self.html.main, { id: self.for } );
        
        // select solutions div
        var solutions_div = main_elem.querySelector( '.solutions' );
        var more_link = main_elem.querySelector( '.more' );
        more_link.style.display = 'none';
        var offset = 1;

        more_link.addEventListener('click', e => {
          offset += 10;
          proceed();
        });

        // create a loading symbol
        let loading = self.ccm.helper.loading( self );
        
        // select checkbox
        var checkbox = main_elem.querySelector( 'input' );
        checkbox.addEventListener('change', function ( e ) {
          
          if ( this.checked ){ // display all solutions
            
            // has logger instance? => log 'show' event
            if ( self.logger ) self.logger.log( 'show', { component: self.index, fkey: self.fkey, for: self.for } );
            
            if ( solutions_div.style.display === 'none' && solutions_div.firstElementChild.classList.value !== "ccm_loading" ) {
                    solutions_div.style.display = 'block';
                    more_link.style.display = 'block';
            } else {

              self.ccm.helper.setContent( solutions_div, loading );
              // Late Login
              // has user instance? => login user (if not already logged in)
              if (self.user) self.user.login(proceed); else proceed();
            }
          } else { // erase all solutions
            solutions_div.style.display = 'none';
            more_link.style.display = 'none';
          }
          
        });
        
        // set content of own website area
        self.ccm.helper.setContent( self.element, main_elem );

        // =============== helper functions ================

        function proceed() { // proceed after login
          var solutions = {
            url: self.server,
            params: {
              key: self.fkey,
              id: self.parent.for || self.root.getAttribute('for'),
              user: self.user.data().id,
              token: self.user.data().token,
              semester: self.keys.semester,
              fach: self.keys.fach,
              all: offset
            }
          };

          // ==== GET ==== load all solutions for this key and this id
          self.ccm.load( solutions, function (record) {
            // console.log( 'solution', record);

            // Late filling form with values with recursive descend
            // traverse by all record keys

            if ( typeof record === 'string') record = JSON.parse(record);

            if ( record.ERROR ){

              solutions_div.replaceChild(self.ccm.helper.html( self.html.error, { deadline: record.ERROR.deadline } ), loading);

            } else {

              var code = record.SUCCESS.code;
              var json = record.SUCCESS.json;

              var counter = 1;
              var unsorted_solutions = [];

              Object.keys( record ).map(function ( uid ) {
                if ( uid !== 'ERROR' &&  uid !== 'SUCCESS' ){

                  var child;
                  var newChild;
                  var solution = record[ uid ];
                  var solution_object;

                  if ( json ){
                    // Is field a JSON structure?
                    solution = JSON.parse( solution );
                    // deep copy
                    var structure = JSON.parse(JSON.stringify(self.html.multiple_solutions));

                    Object.keys(solution).map(function (key) {
                      structure.inner[0].inner.push({tag: 'textarea', inner: solution[key]});
                    } );
                    child = self.ccm.helper.html( structure );

                  } else { // no JSON
                    child = self.ccm.helper.html( self.html.solution );
                    switch (typing(solution)){
                      case "string":
                        child.querySelector('textarea').value = solution;
                        break;
                      case "json":
                        solution_object = JSON.parse( solution );
                        if ( solution_object.ops ){
                          newChild = document.createElement('div');
                          child.replaceChild( newChild, child.firstElementChild );
                          self.editor.start( { root: newChild }, instance => {
                            instance.get().setContents( solution_object );
                          });
                        } else if ( solution_object.uml ){
                          newChild = document.createElement('div');
                          child.replaceChild( newChild, child.firstElementChild );
                          self.uml.start({root: newChild, default: solution_object.uml }, instance => {
                            instance.sync( solution_object.uml );
                          });
                        } else if ( solution_object.type && solution_object.type.startsWith('image') ){ // upload
                          newChild = document.createElement('img');
                          newChild.style.width = '96%';
                          newChild.style.height = '600px';
                          newChild.src = get_url({ url: self.server, params: { semester: self.keys.semester, fach: self.keys.fach, key: self.fkey, id: self.for, uid: uid, user: self.user.data().id, token: self.user.data().token } });
                          child.replaceChild( newChild, child.firstElementChild );
                        }
                        break;
                      case "editor":
                        break;
                      case "uml":
                        break;
                      case "upload":
                        break;
                      default:
                        debugger;
                    }

                  }

                  counter++;
                  if ( self.voting ) self.voting.start( { parent: self, user: self.user, 'data.key': uid + '_' + self.parent.for + '_' + self.for }, function ( voting_inst ) {
                    unsorted_solutions.push( { "voting": voting_inst.getValue(), "solution": child } );
                    self.ccm.helper.setContent( child.querySelector('.voting'), voting_inst.root );
                    check();
                  } );

                  counter++;
                  // only one comment for all fields
                  if ( self.comment ) self.comment.start( { parent: self, user: self.user, 'data.key': uid + '_' + self.parent.for + '_' + self.for }, function ( instance ) {
                    self.ccm.helper.setContent( child.querySelector('.comments'), instance.root );
                    check();
                  });
                }
              });
              check();

              function check() {
                counter--;
                if ( counter > 0 ) return;

                var sorted = unsorted_solutions.sort( compare );

                // solutions_div.innerHTML = '';
                if ( loading.parentNode === solutions_div ){
                  solutions_div.replaceChild(self.ccm.helper.html( { tag: 'h3', inner: 'Solutions ' } ), loading);
                }
                sorted.map( function ( entry ) {
                  solutions_div.appendChild( entry.solution );
                } );

                more_link.style.display = 'block';

                function compare( a, b ) {
                  if ( a.voting > b.voting )
                    return -1;
                  if ( a.voting < b.voting )
                    return 1;
                  return 0;
                }

              }

            }

          });
        }


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