/**
 * @overview generator for directories and files of a new component
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

var fs = require('fs');
var path = require('path');

var component_name = 'difference_chart';
var author = 'Manfred Kaul <manfred.kaul@h-brs.de> 2018';
var account = 'mkaul';

var index_html = `<!DOCTYPE html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="author" content="${author}">
<meta name="license" content="The MIT License (MIT)">
<!--<script src="https://${account}.github.io/ccm-components/${component_name}/ccm.${component_name}.js"></script>-->
<script src="ccm.${component_name}.js"></script>
<ccm-${component_name}></ccm-${component_name}>`;

var ccm_component = `/**
 * @overview ccm component for ${component_name}
 * @author ${author}
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * TODO: docu comments -> API
 * TODO: unit tests
 * TODO: builder component
 * TODO: i18n
 */

{

  var component  = {   // const not working in Safari

    /**
     * unique component name
     * @type {string}
     */
    name: '${component_name}',
    
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
      html: {
        main: {
          inner: [
            { tag: 'button', class: 'left', inner: '%even%' },
          ]
        }
      },
      css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/${component_name}/resources/default.css' ],
      // css: [ 'ccm.load',  'https://${account}.github.io/ccm-components/${component_name}/resources/default.css' ],
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
        if ( self.inner && self.inner.innerHTML.trim() ) self.text = self.inner.innerHTML;
        
        // ToDo interprete LightDOM

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
      
        // has logger instance? => log 'start' event
        if ( self.logger ) self.logger.log( 'start' );
        
        // prepare main HTML structure
        const main_elem = $.html( self.html.main, { even: 'even' } );
        
        // select inner containers (mostly for buttons)
        const left_button = main_elem.querySelector( 'button.left' );
        
        // set content of own website area
        $.setContent( self.element, main_elem );

        if ( callback ) callback();
      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}`;

let default_css = `/**
 * @overview default layout of ccm component ${component_name}
 * @author ${author}
 * @license The MIT License (MIT)
 */`;

let default_test_html = `<!DOCTYPE html>
<meta charset="utf-8">
<meta name="author" content="${author}">
<meta name="license" content="The MIT License (MIT)">
    
<script src="https://akless.github.io/ccm/version/ccm-11.5.0.min.js"></script>
<script>ccm.components.testsuite = { ccm: '//akless.github.io/ccm/ccm.js' };</script>
<script src="//akless.github.io/ccm-components/testsuite/versions/ccm.testsuite-1.0.0.js"></script>
<ccm-testsuite-1-0-0>
  <ccm-load-tests src="resources/tests.js"></ccm-load-tests>
</ccm-testsuite-1-0-0>
`;

let default_test_js = `
/**
 * @overview unit tests of ccm component for ${component_name}
 * @author ${author}
 * @license The MIT License (MIT)
 */

ccm.files[ 'tests.js' ] = {
  setup: ( suite, callback ) => {
    suite.ccm.component( '../${component_name}/ccm.${component_name}.js', component => {
      suite.component = component;
      callback();
    } );
  },
  fundamental: {
    tests: {
      componentName: suite => {
        suite.component.instance( instance => suite.assertSame( '${component_name}', instance.component.name ) );
      }
    }
  },
  tests: {
    oneInput: suite => {
      suite.component.start( {
        inner: suite.ccm.helper.html( {
          tag: 'input',
          type: 'text',
          name: 'foo',
          value: 'bar'
        } ),
        onfinish: ( instance, result ) => suite.assertEquals( { foo: 'bar' }, result )
      }, instance => {
        console.log( instance.element );
        instance.element.querySelector( '#${component_name}' ).click();
      } );
    }
  }
};
`;

fs.mkdir(path.join('..' + path.sep + component_name), function (err1) {
  if (err1) throw err1;
  console.log( 'Dir ' + component_name + '/ created.' );
  
  fs.writeFile('..' + path.sep + component_name + path.sep + 'index.html', index_html, 'utf8', function (err2) {
      if (err2) throw err2;
      console.log('index.html created.');
  });

  fs.writeFile('..' + path.sep + component_name + path.sep + 'test.html', default_test_html, 'utf8', function (err2) {
    if (err2) throw err2;
    console.log('test.html created.');
  });
  
  fs.writeFile('..' + path.sep + component_name + path.sep + 'ccm.' + component_name + '.js', ccm_component, 'utf8', function (err3) {
      if (err3) throw err3;
      console.log('ccm.' + component_name + '.js created.');
    });
  
  fs.mkdir(path.join('..' + path.sep + component_name + path.sep + 'resources'), function (err4) {
    if (err4) throw err4;
    console.log('Dir resources/ created.');
  
    fs.writeFile('..' + path.sep + component_name + path.sep + 'resources' + path.sep + 'default.css', default_css, 'utf8', function (err5) {
        if (err5) throw err5;
        console.log('resources/default.css created.');
      });

    fs.writeFile('..' + path.sep + component_name + path.sep + 'resources' + path.sep + 'tests.js', default_test_js, 'utf8', function (err5) {
      if (err5) throw err5;
      console.log('resources/test.js created.');
    });
    
  });
});