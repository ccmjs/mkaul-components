/**
 * @overview ccm component for loader
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component  = {

    name: 'loader',
    
    ccm: '//akless.github.io/ccm/version/ccm-10.0.0.min.js',

    config: {
      nr: 1,
      server: '//kaul.inf.h-brs.de/data/loader.php',
      keys: {        // additional DB keys if necessary (optional)
        semester: 1, // begin with 1 = WiSe 2017/18
        fach: 'se'   // se = Software Engineering
      },
      user:   [ 'ccm.instance', '//akless.github.io/ccm-components/user/versions/ccm.user-2.0.0.min.js', { sign_on: "hbrsinfkaul", logged_in: true } ],
      form: [ 'ccm.component', '//kaul.inf.h-brs.de/data/ccm/form/ccm.form.js' ],
      exercise: [ 'ccm.component', '//kaul.inf.h-brs.de/data/ccm/exercise/ccm.exercise.js' ],
      show_solutions: [ 'ccm.component', '//kaul.inf.h-brs.de/data/ccm/show_solutions/ccm.show_solutions.js' ],
      highlight: [ 'ccm.component', '//kaul.inf.h-brs.de/data/ccm/highlight/ccm.highlight.js' ]
    },

    Instance: function () {
    
      var self = this;

      this.start = function ( callback ) {
  
        self.ccm.load({
          url: self.server,
          params: {
            id: self.nr
          }
        }, function ( record ) {
          
          var content = JSON.parse( record );

          self.element.innerHTML = content.filecontents;

          // set content of own website area
          // self.ccm.helper.setContent( self.element, content.filecontents );
  
          start_ccm_children( self.element );
          
        });
        
        function start_ccm_children( mother_node ) {
          
          if ( mother_node.hasChildNodes() ){
            
            self.ccm.helper.makeIterable( mother_node.children ).map(function (child) {
  
              if ( child.tagName.startsWith('CCM-') &&  child.tagName.split('-').length === 2 ){
  
                // get name without ccm prefix
                var component_name = child.tagName.substr(4,child.tagName.length).toLowerCase();

                // start parameter for component
                var start_params = {
                  root: child,
                  inner: child.innerHTML,
                  parent: self,
                  keys: self.keys
                };
                
                // start component if component exists
                self[ component_name ].start( start_params, function ( instance ) {
                  child.ccm_instance = instance;
                } );
                
              }
  
              start_ccm_children( child );
              
            });
          }
        }

        if ( callback ) callback();
      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );