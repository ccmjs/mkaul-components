/**
 * @overview ccm component for group_team
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  var component  = {

    name: 'group_team',
    
    ccm: 'https://akless.github.io/ccm/version/ccm-11.5.0.min.js',
    // ccm: '//akless.github.io/ccm/ccm.js',

    config: {
      user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-2.0.0.min.js', { sign_on: "hbrsinfkaul" } ],
      teamstore: {
        "store": [ "ccm.store", { "store": "teambuild", "url": "wss://ccm.inf.h-brs.de" } ],
        "key": { _id: { $regex: '^se_ws17_gr' } }
      },
      teambuild: [ 'ccm.component', '//akless.github.io/ccm-components/teambuild/versions/ccm.teambuild-1.0.0.min.js' ],
      // teambuild: [ 'ccm.component', '//kaul.inf.h-brs.de/data/ccm/teambuild/versions/ccm.teambuild-1.0.0.js' ],
      html: {
        main: { inner: [
          { tag: 'h1', inner: [ 'Alle Teams der Gruppe ', { tag: 'span', class: 'group' } ] },
          { class: 'teambuild' }
        ] }
      },
      // css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/group_team/resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/group_team/resources/default.css' ],
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }
    },

    Instance: function () {
    
      var self = this;

      this.start = function ( callback ) {

        // has logger instance? => log 'render' event
        if ( self.logger ) self.logger.log( 'start' );

        // prepare main HTML structure
        var main_elem = self.ccm.helper.html( self.html.main );

        // select inner containers
        var teambuild_area = main_elem.querySelector('.teambuild');
        var group_span = main_elem.querySelector('.group');

        // set content of own website area
        self.ccm.helper.setContent( self.element, main_elem );

        if ( self.user.isLoggedIn() ) proceed(); else self.user.login(proceed);

        function proceed(){
          let my_uid = self.user.data().id.toLowerCase().trim();
          let my_team, my_group;

          self.ccm.helper.dataset( self.teamstore, ( groups ) => {
            groups.map( group => {
              group.teams.map( ( team, index ) => {
                Object.keys( team.members ).map( uid => {
                  let _uid = uid.toLowerCase().trim();
                  if ( my_uid === _uid ){
                    my_team = team;
                    my_group = group.key.slice(-1);
                    group_span.innerText = group.key.slice(-1);
                  }
                });
              });
            });
            console.log( my_team );

            ccm.get( '//kaul.inf.h-brs.de/data/ccm/teambuild/resources/configs.js', 'se_ws17_gr' + my_group, config => {
              config.root = teambuild_area;
              self.teambuild.start( config );
            });
          });
        }

        if ( callback ) callback();
      };

    }

  };

  function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );