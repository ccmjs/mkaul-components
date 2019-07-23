/**
 * @overview ccm component for klausur_reader
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 23.07.2019 initial build
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
    name: "klausur_reader",
    // version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: "https://ccmjs.github.io/ccm/versions/ccm-22.2.0.js",
    ccm: "https://ccmjs.github.io/ccm/ccm.js",

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      name: "se1_SoSe19",

      html: {
        main: {
          class: 'bordered',
          inner: [
            { tag: "img", src: "./resources/hbrs-logo.svg", width: "300rem", height: "auto" },
            { tag: "h1", inner: "Klausur<br>Software Engineering 1", class: "center" },
            { tag: "p", inner: " %name% for %user% at %date% ", class: "center small" },
            { tag: 'p', inner: "Signature: %signature% ", class: "higher center small italic bordered" }
          ]
        },
        task: {
          inner: [
            { tag: 'hr' },
            { tag: "h2", inner: "Aufgabe %nr%: %title% (%points% Punkte)" },
            { class: "task", "data-type": "%type%", id: "task_%nr%" }
          ]
        }
      },

      tasks: {
        store: [ "ccm.store", "./resources/tasks.js" ],
        key: "se1_SoSe19"
      },

      submit: [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.3.js", {
        data: {
          store: [ "ccm.store", { "name": "se1_SoSe19_klausur", "url": "https://ccm2.inf.h-brs.de" } ],
          user: true
        }
      }],

      quiz: [ "ccm.component", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.0.js"],
      cloze: [ "ccm.component", "https://ccmjs.github.io/akless-components/cloze/versions/ccm.cloze-6.0.0.js"],

      templates: {
        ignore: {
          "data": {
            "store": [ "ccm.store", { "name": "%name%_klausur", "url": "https://ccm2.inf.h-brs.de" } ],
            "user": true
          },
          "onfinish": {
            "login": true,
            "store": {
              "settings": {
                "url": "https://ccm2.inf.h-brs.de",
                "name": "%name%_klausur"
              },
              "user": true,
              "permissions": {
                "creator": "mkaul2m",
                "realm": "hbrsinfkaul",
                "group": [ "%user%", "creator" ],
                "access": {
                  "get": "group",
                  "set": "%user%"
                }
              }
            },
            "alert": "Saved!",
            "restart": false
          }
        }
      },

      user:   [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
        realm: "hbrsinfkaul",
        logged_in: true
      } ],

      hash: [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/md5.mjs", "type": "module" } ],
      SALT: "123",
      
      css: [ "ccm.load",  "./resources/default.css" ],
      // css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/klausur_reader/resources/default.css" ],
      // logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js", [ "ccm.get", "https://ccmjs.github.io/mkaul-components/klausur_reader/resources/configs.js", "log" ] ],
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
       * init is called once after all dependencies are solved and is then deleted
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

      };
        
      /**
       * starts the instance
       */
      this.start = async () => {

        /** @type {string} */
        const username = this.user && this.user.isLoggedIn() ? this.user.data().user : this.user;

        /** @type {string} */
        const date = new Date().toLocaleString();

        /** @type {string} */
        const signature = this.hash && this.hash.md5( this.name + username + date.slice(0,10) + this.SALT );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', { name: this.name, user: username, date, signature } );

        // fetch task list from file or database
        const tasks_dataset = await $.dataset( this.tasks );
        const tasks = tasks_dataset.tasks;

        // append tasks to HTML structure
        let nr = 0;
        tasks.forEach( task => {
          nr += 1;
          this.html.main.inner.push( $.format( self.html.task, $.integrate( { nr }, task ) ) );
        });

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, $.integrate( { user: username, date, signature }, this ) ) );

        // render task apps into HTML
        [...this.element.querySelectorAll('.task')].forEach( async ( taskDiv, i ) => {
          const task  = tasks[i];
          const type  = task.type;
          const store = task.store || task.type;
          const url   = task.url   || tasks_dataset.url;

          // config construction in a single assignment
          // const config = $.integrate( { root: taskDiv, user: self.user },
          //   await ccm.get( { name: 'ws_' + taskDiv.dataset.type, url: 'https://ccm2.inf.h-brs.de' }, tasks[i].appid ),
          //     $.format( self.templates.ignore, { name: self.name })
          // );

          // config construction step by step
          const config1 = $.format( self.templates.ignore, { name: self.name });
          const config2 = await self.ccm.get( { name: store, url }, task.appid ); // TODO correct store
          config2.data.store[1].name = self.name + '_klausur';  // TODO
          const config3 = { root: taskDiv };
          const config4 = $.integrate( config3, config2, config1 );
          config4.user = self.user; // TODO

          self[type].start( config4 );
        });

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();