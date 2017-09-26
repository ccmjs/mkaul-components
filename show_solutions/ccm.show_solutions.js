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
    
    ccm: 'https://akless.github.io/ccm/ccm.js',

    config: {
      server: '//kaul.inf.h-brs.de/data/form.php',
      
      highlight: [ 'ccm.component', '//kaul.inf.h-brs.de/data/ccm/highlight/ccm.highlight.js' ],

      html: {
        main: {
          inner: [
            { tag: 'input', id: '%id%', type: 'checkbox' },
            { tag: 'label', for: '%id%', inner: 'Zeige Liste aller eingereichten Lösungen' },
            { id: '%solutions_id%' }
          ]
        },
        error: {
          inner: 'Bitte bis zur Deadline %deadline% warten!'
        },
        solution: {
          inner: [
            { class: 'solution', inner: '%solution%' },
            { class: 'comments' }
          ]
          
        }
      },
      css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/show_solutions/resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/show_solutions/resources/default.css' ],
      user: [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-1.0.0.min.js', { "sign_on": "hbrsinfkaul" } ],
      comment: [ 'ccm.component', 'https://tkless.github.io/ccm-components/comment/versions/ccm.comment-1.0.0.js', {
        data: {
          store: ['ccm.store', { store: 'comments', url: 'https://ccm.inf.h-brs.de' } ]
        }
      } ]
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    Instance: function () {
    
      var self = this;

      this.start = function ( callback ) {
      
        // has logger instance? => log 'render' event
        if ( self.logger ) self.logger.log( 'render' );
        
        // inherit context parameter
        if ( ! self.fkey ) self.fkey = self.ccm.context.find(self,'fkey');
        if ( ! self.keys ) self.keys = {
          semester: self.ccm.context.find(self,'semester'),
          fach: self.ccm.context.find(self,'fach')
        };
        if ( ! self.for ) self.for = self.root.getAttribute('for');
        
        // prepare main HTML structure
        var main_elem = self.ccm.helper.html( self.html.main,
          {
            id: self.for,
            solutions_id: 'solutions_' + self.for
          } );
        
        // select solutions div
        var solutions_div = main_elem.querySelector( '#solutions_' + self.for );
        
        // select checkbox
        var checkbox = main_elem.querySelector( 'input' );
        checkbox.addEventListener('change', function ( e ) {
          
          if ( this.checked ){ // display all solutions
  
            if ( solutions_div.style.display === 'none' ) {

              solutions_div.style.display = 'block';

            } else {
              
              // Late Login
              // has user instance? => login user (if not already logged in)
              if (self.user) self.user.login(proceed); else proceed();
  
              function proceed() { // proceed after login
    
                // ==== GET ==== load all solutions for this key and this id
                self.ccm.load({
                  url: self.server,
                  params: {
                    key: self.fkey,
                    id: self.root.getAttribute('for'),
                    user: self.user.data().user,
                    token: self.user.data().token,
                    semester: self.keys.semester,
                    fach: self.keys.fach,
                    all: 1
                  }
                }, function (record) {
      
                  // Late filling form with values with recursive descend
                  // traverse by all record keys
      
                  if ( typeof record === 'string') record = JSON.parse(record);
      
                  if ( record.ERROR ){
                    
                    solutions_div.innerHTML = self.ccm.helper.html( self.html.error, { deadline: record.ERROR.deadline } );
                  
                  } else {
                    
                    var code = record.SUCCESS.code;
                    
                    Object.keys( record ).map(function ( uid ) {
                      if ( uid !== 'ERROR' &&  uid !== 'SUCCESS' ){
                        
                        var child = self.ccm.helper.html( self.html.solution, { solution: record[ uid ] } );
                        
                        solutions_div.appendChild( child );
  
                        if ( code ) self.highlight.start( {
                          parent: child, clazz: code, content: record[ uid ]
                        }, function ( instance ) {
                            self.ccm.helper.setContent( child.querySelector('.solution'), instance.root );
                        } );
  
                        self.comment.start( { parent: child, 'data.key': uid + '_' + self.for }, function ( instance ) {
                          self.ccm.helper.setContent( child.querySelector('.comments'), instance.root );
                        });
                        
                      }
                    });
                  }
      
                });
              }
            }
          } else { // erase all solutions
  
            solutions_div.style.display = 'none';
            
          }
          
        });
        
        // set content of own website area
        self.ccm.helper.setContent( self.element, main_elem );

        if ( callback ) callback();
      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );