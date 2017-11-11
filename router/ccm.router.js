/**
 * @overview ccm component for router
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * TODO: docu comments -> API
 * TODO: unit tests
 * TODO: builder component
 * TODO: multilingualism
 */

{

  const component  = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'router',
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://akless.github.io/ccm/version/ccm-11.5.0.min.js',
    // ccm: '//akless.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      server: 'https://kaul.inf.h-brs.de/data/2017/se1/',

      // additional config parameters tobe merged into loader config
      keys: { semester: "172", fach: "se" },

      // menu item format = [ button label, title label, filename ]
      // is also the location hash format (anchor)
      menu: [ [ 'Orga', 'OG', 'orga' ], [ 'LE01', '01', 'le01' ] ],

      // default is comma separated format for location.hash (anchor)
      separation_char: ',',

      // dependencies
      content: [ 'ccm.instance', 'https://akless.github.io/ccm-components/content/versions/ccm.content-2.0.0.min.js' ],

      // feedback: [ 'ccm.instance', '//kaul.inf.h-brs.de/data/ccm/feedback/versions/ccm.feedback-1.0.0.js', { position: 'right', from_above: '50%', data: { key: 'se1_ws17', store: [ 'ccm.store', { store: 'feedback', url: 'https://ccm.inf.h-brs.de' } ] } } ],

      html: {
        main: {
          inner: [
            { tag: 'h1', class: 'center', inner: 'Einführung in Software Engineering' },
            { id: 'menu' },
            { id: 'content' },
            { id: 'feedback' }
          ]
        }
      },
      css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/router/resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/router/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-2.0.0.min.js' ],
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    /**
     * for creating instances of this component
     * @constructor
     */
    Instance: function () {
    
      /**
       * own reference for inner functions
       * @type {Instance}
       */
      const self = this;
      
      /**
       * shortcut to help functions
       * @type {Object}
       */
      let $;
      
      /**
       * init is called once after all dependencies are solved and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.init = callback => {
      
        //  Is content given via LightDOM (inner HTML of Custom Element)?
        //  Then use it with higher priority
        if ( self.inner && self.inner.innerHTML.trim() ){
          // interpreter for LightDOM
          self.text = self.inner.innerHTML;
          self.menu = JSON.parse( '[' + self.text + ']' );
        }
        callback();
      };
      
      /**
       * is called once after the initialization and is then deleted
       * @param {function} callback - called after all synchronous and asynchronous operations are complete
       */
      this.ready = callback => {

        // set shortcut to help functions
        $ = self.ccm.helper;
        
        callback();
      };  
        
      /**
       * starts the instance
       * @param {function} [callback] - called after all synchronous and asynchronous operations are complete
       */
      this.start = callback => {
      
        // has logger instance? => log 'render' event
        if ( self.logger ) self.logger.log( 'render' );
        
        // prepare main HTML structure
        const main_elem = $.html( self.html.main );
        
        // select inner containers
        const menu = main_elem.querySelector('#menu');
        const content = main_elem.querySelector('#content');
        const feedback = main_elem.querySelector('#feedback');
        
        // set content of own website area
        $.setContent( self.element, main_elem );

        self.menu.map( menu_item => {
          const label = menu_item[ 0 ];
          const title = menu_item[ 1 ];
          const btn = $.html({tag:'button', inner: label, class: 'btn btn-primary'});
          menu.appendChild(btn);
          btn.addEventListener('click', function () {
            document.title = title;
            location.hash = menu_item.join(self.separation_char);
          })
        });

        // backup old event handler
        const old_window_onhashchange = window.onhashchange;

        // assign new event handler
        window.onhashchange = (e) => {
          let address_vector;
          // anchors without comma are local only (inner page)
          if ( location.hash.length > 0 && location.hash.indexOf( self.separation_char ) >= 0 ) {
            // parse address_vector from comma separated format of anchor
            address_vector = location.hash.slice(1).split( self.separation_char );
            start( address_vector );
          } else {
            if ( old_window_onhashchange ) old_window_onhashchange(e);
          }
        };

        // when initially opening this web page, is there a location.hash (anchor)?
        if ( location.hash.length > 0 && location.hash.indexOf( self.separation_char ) >= 0 ) {
          // already selected by location.hash
          window.onhashchange();
        }

        function start( address_vector ) {
          const filename = address_vector[2];
          const oldChild = content.firstChild;
          const newChild = document.createElement('div');
          if (oldChild) content.replaceChild(newChild,oldChild); else content.appendChild(newChild);
          const config =  $.integrate({ root: newChild, inner: [ 'ccm.load', self.server + filename + '.html' ] } , self.keys );
          self.ccm.start( self.content.component.index, config );
        }

        if ( self.feedback ) self.feedback.start( ( instance ) => {
          feedback.appendChild( instance.root );
          if ( callback ) callback();
        });

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}