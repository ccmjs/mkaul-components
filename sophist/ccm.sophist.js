/**
 * @overview ccm component for sophist
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 13.06.2019 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( function () {

  "use strict";

  var component = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'sophist',
    // version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        main: {
            "inner": [
            {
              "tag": "h2",
              "id": "h2",
              "inner": "Funktionsmaster ohne Bedingung"
            },
            {
              id: "div1",
              inner: [
                {
                  "tag": "input",
                  "type": "text",
                  "id": "aname",
                  "name": "firstname",
                  "placeholder": "<System>"
                },
                {
                  "tag": "select",
                  "id": "status",
                  "name": "country",
                  "inner": [
                    {
                      "tag": "option",
                      "inner": "MUSS"
                    },
                    {
                      "tag": "option",
                      "inner": "SOLL"
                    },
                    {
                      "tag": "option",
                      "inner": "KANN"
                    }
                  ]
                },
                {
                  "tag": "input",
                  "type": "text",
                  "id": "bname",
                  "name": "lastname",
                  "placeholder": "<Objekt>",
                  "comment": "<div id=\"h1\">-------</div>"
                },
                {
                  "tag": "input",
                  "type": "text",
                  "id": "cname",
                  "name": "lastname",
                  "placeholder": "<Prozesswort>"
                },
                {
                  "tag": "button",
                  "onclick": "%getDisplay%",
                  "inner": [
                    {
                      "tag": "input",
                      "type": "submit",
                      "value": "Submit"
                    },
                    {
                      "id": "natija"
                    }
                  ],
                  "comment": "<div class=\"alert alert-warning\">  hallo 123  </div> "
                }
              ]
            },
            {
              id: 'natija'
            },
            {
              id: 'display'
            }
          ]
        }
      },
      
      css: [ 'ccm.load',  'resources/default.css' ],
      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/sophist/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/sophist/resources/configs.js', 'log' ] ],
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
       * dataset is the single source of truth, the Web is the UI
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
        
        // listen to datastore changes => restart
        // if ( $.isDatastore( this.data.store ) ) this.data.store.onchange = this.start;

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

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, { getDisplay: getDisplay } ) );

        function getDisplay(){
          let li = document.createElement("li");
          let today = new Date();
          let use1 = self.element.querySelector("#aname").value +" " +
            self.element.querySelector("#status").value+" "+
            self.element.querySelector("#bname").value+" "+
            self.element.querySelector("#cname").value+"..... "+
            today.getDay()+":"+today.getHours()+":"+today.getSeconds();

          let text = document.createTextNode(use1);
          li.appendChild(text);

          <!-- zeit:"+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()); -->

          self.element.querySelector("#natija").appendChild(li);

          self.element.querySelector("#aname").value = "";
          self.element.querySelector("#bname").value = "";
          self.element.querySelector("#cname").value = "";
          //alert();
          //confirm();
        }
        
        /**
         * refresh dataset after editing
         */
        function updateData(){
          dataset.inner = editor_div.innerHTML;
          self.onchange && self.onchange( dataset );
        }
        
        /**
         * updates app state data and restarts app
         * @param {boolean} [no_restart] - prevent implicit app restart
         * @returns {Promise<void>}
         */
        async function save() {

          // no datastore? => abort
          if ( !$.isDatastore( self.data.store ) ) return;

          await self.data.store.set( dataset );  // update app state data
          // await self.start();     // restart app

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

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();