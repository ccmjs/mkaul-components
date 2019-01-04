/**
 * @overview generator for directories and files of a new component
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

var fs = require('fs');
var path = require('path');

var component_name = 'draw_svg';
var author = 'Manfred Kaul <manfred.kaul@h-brs.de> 2018';
var account = 'mkaul';

function now(){
  var MyDate = new Date();
  return ('0' + MyDate.getDate()).slice(-2) + '.'
    + ('0' + (MyDate.getMonth()+1)).slice(-2) + '.'
    + MyDate.getFullYear();
}

var index_html = `<!DOCTYPE html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="author" content="${author}">
<meta name="licence" content="The MIT License (MIT)">
<!--<script src="https://ccmjs.github.io/${account}-components/${component_name}/ccm.${component_name}.js"></script>-->
<script src="ccm.${component_name}.js"></script>
<ccm-${component_name}></ccm-${component_name}>`;

var ccm_component = `/**
 * @overview ccm component for ${component_name}
 * @author ${author}
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 ${now()} initial build
 * TODO: unit tests
 * TODO: builder component
 * TODO: i18n
 */

( function () {

  "use strict";

  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: '${component_name}',
    // version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.6.7.min.js',
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

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
      
      data: { // initial dataset must be an object
        inner: {}
      }
      
      // data: {  // fetched from store
      //   "store": [ "ccm.store", { local: 'resources/dataset.json' } ],
      //   "key": "demo"
      // },

      // onchange: function(){ console.log( this.getValue() ); },
      
      css: [ 'ccm.load',  'resources/default.css' ],
      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/${component_name}/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/${component_name}/resources/configs.js', 'log' ] ],
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
       * @type {Object.<string,function>}
       */
      let $;
      
      /**
       * dataset for rendering
       * The value of dataset starts with a clone of this.data,
       *     but additional values might be added during editing.
       * this.data is never changed, only dataset is changed.
       * @type {Object}
       */
      let dataset;
      
       /**
       * init is called once after all dependencies are solved and is then deleted
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // get data from config or remote database
        dataset = await $.dataset( this.data );

        if ( typeof dataset === 'string' ) dataset = { inner: dataset };

        // Use LightDOM with higher priority than data from config
        if ( this.inner ){

          // Light DOM is given as ccm JSON data? => convert to HTML DOM Elements
          if ( $.isObject( this.inner ) && !$.isElementNode( this.inner ) )
            this.inner = $.html( this.inner );

          // dynamic replacement of placeholders
          if ( this.placeholder ) [ ...this.inner.children ].forEach( child => child.innerHTML = $.format( child.innerHTML, this.placeholder ) );

          dataset.inner = this.inner;
        }

        if ( ! dataset ) dataset = {};

        // initialize dataset.components if necessary
        if ( ! dataset.components ) dataset.components = {};

      };
      
      /**
       * is called once after the initialization and is then deleted
       */
      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready' );

      };
        
      /**
       * starts the instance
       */
      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main ) );
        
        /**
         * refresh dataset after editing
         */
        function updateData(){
          dataset.inner = editor_div.innerHTML;
          self.onchange && self.onchange();
        }

      };
      
      /**
       * current state of this editor
       * @returns {Object} state of editor
       */
      this.getValue = () => {
        return $.clone( dataset );
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();`;

const icon_svg = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <g id="Layer_1">
    <g>
      <circle cx="32" cy="32" fill="#E0995E" r="32"/>
    </g>
  </g>
  <g id="Layer_2"/>
</svg>`;

const dms_js = `
{
    "_id": "${component_name}",
    "title": "${component_name}",
    "icon": "https://ccmjs.github.io/mkaul-components/${component_name}/resources/icon.svg",
    "abstract": "",
    "description": "",
    "url": "https://ccmjs.github.io/mkaul-components/${component_name}/versions/ccm.${component_name}-1.0.0.js",
    "version": "1.0.0",
    "website": "https://ccmjs.github.io/mkaul-components/",
    "developer": "Manfred Kaul",
    "license": "MIT License",    
    "ignore": {
        "demos": [
            {
                "title": "demo",
                "config": [
                    "ccm.get",
                    "https://ccmjs.github.io/mkaul-components/${component_name}/resources/configs.js",
                    "demo"
                ]
            }
        ],
        "builder": [
          {
                "title": "Input Mask",
                "url": "https://ccmjs.github.io/akless-components/app_builder/versions/ccm.app_builder-1.1.0.js",
                "config": {
                    "builder": [
                        "ccm.component",
                        "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-6.7.0.js",
                        {
                            "defaults": {
                                "x": "Hello World",
                                "template": "<h1>\${x}</h1>"
                            },
                            "entries": [
                                {
                                    "label": "Title",
                                    "name": "title",
                                    "type": "text",
                                    "info": "Title of the paper"
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "title": "JSON Builder",
                "url": "https://ccmjs.github.io/akless-components/app_builder/versions/ccm.app_builder-1.1.0.js",
                "config": {
                    "builder": [
                        "ccm.component",
                        "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.1.0.js",
                        {
                            "html.inner.1": "",
                            "directly": true
                        }
                    ]
                }
            }
        ]
    },
    "updated_at": "2018-11-04T14:41:22+02:00",
    "created_at": "2018-11-04T14:41:22+02:00"
}
`;

const default_css = `/**
 * @overview default layout of ccm component ${component_name}
 * @author ${author}
 * @license The MIT License (MIT)
 */
#element {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}`;

const default_test_html = `<!DOCTYPE html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="author" content="${author}">
<meta name="license" content="The MIT License (MIT)">
    
<script src="https://ccmjs.github.io/ccm/versions/ccm-18.1.0.min.js"></script>
<script>ccm.components.testsuite = { ccm: 'https://ccmjs.github.io/ccm/ccm.js' };</script>
<script src="https://ccmjs.github.io/akless-components/testsuite/versions/ccm.testsuite-1.0.0.js"></script>
<ccm-testsuite-1-0-0>
  <ccm-load-tests src="resources/tests.js"></ccm-load-tests>
</ccm-testsuite-1-0-0>
`;

const default_test_js = `
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

const default_config_js = `
/**
 * @overview configs of ccm component ${component_name}
 * @author ${author}
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",
    default: "value"
  },
  "localhost": {
    key: "localhost",
    css: [ 'ccm.load',  '../${component_name}/resources/default.css' ],
    language: 'de',
    labels: {
      de: {
        intro: "Entscheiden Sie sich schnell, ohne lange nachzudenken:<br><b>Was ist Ihnen am wichtigsten:</b>",
        label: "Fertig!"
      }
    },
    onfinish: function( instance, results ){ console.log( results ); }
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

  fs.mkdir(path.join('..' + path.sep + component_name + path.sep + 'versions'), function (err4) {
    if (err4) throw err4;
    console.log('Dir versions/ created.');
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

    fs.writeFile('..' + path.sep + component_name + path.sep + 'resources' + path.sep + 'configs.js', default_config_js, 'utf8', function (err6) {
      if (err6) throw err6;
      console.log('resources/config.js created.');
    });

    fs.writeFile('..' + path.sep + component_name + path.sep + 'resources' + path.sep + 'icon.svg', icon_svg, 'utf8', function (err6) {
      if (err6) throw err6;
      console.log('resources/icon.svg created.');
    });

    fs.writeFile('..' + path.sep + component_name + path.sep + 'resources' + path.sep + 'dms.json', dms_js, 'utf8', function (err6) {
      if (err6) throw err6;
      console.log('resources/dms.js created.');
    });
    
  });
});