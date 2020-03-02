/**
 * @overview ccm component for show_demos
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 02.03.2020 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "show_demos",
    version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: "https://ccmjs.github.io/ccm/versions/ccm-25.0.0.js",
    // ccm: "https://ccmjs.github.io/ccm/ccm.js",

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        main: {
          inner: [
            { id: "top" },
            { tag: "select", id: "week" },
            { tag: "select", id: "group" },
            { tag: "button", inner: "Load", onclick: "%load%" },
            { id: "table" },
            { tag: "button", inner: "Speichern!", onclick: "%save%" }
          ]
        },
        option: {
          tag: "option",
          value: "%value%",
          inner: "%inner%"
        },
        table: {
          tag: "table", inner: [
            { tag: "tr", inner: [
                { tag: "th", inner: "Aufgabe" },
                { tag: "th", inner: "Anrede" },
                { tag: "th", inner: "Name" },
                { tag: "th", inner: "User" },
                { tag: "th", inner: "Datum" },
                { tag: "th", inner: "Demo" },
                { tag: "th", inner: "Anmerkungen" }
              ] }
          ]
        },
        row: { tag: "tr", inner: [
            { tag: "td", inner: "%task%" },
            { tag: "td", inner: "%gender%" },
            { tag: "td", inner: "%name%" },
            { tag: "td", inner: "%uid%" },
            { tag: "td", inner: "%stamp%" },
            { tag: "td", inner: { tag: "input", type: "checkbox", name: "task%task%_%uid%" } },
            { tag: "td", inner: { tag: "textarea", name: "remark%task%_uid", placeholder: "Anmerkungen" } }
          ] }
      },

      gender: {  // mapping of database fields to GUI Labels
        "M": "Herr",
        "F": "Frau"
      },

      weeks: [10, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],  // list of all weeks of one semester
      groups: ["G1","G2","G3","G4","G5","G6"],  // list of all groups

      demos: "https://kaul.inf.h-brs.de/data/demo_list.php",

      members: {
        store: [ "ccm.store", "members.js" ],
        key: "se1_ss19"
      },

      data: {
        store: [ "ccm.store", { name: "se_ss20_checkin", url: "https://ccm2.inf.h-brs.de" } ]
      },


      // onchange: function(){ console.log( this.getValue() ); },
      
      helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.0.2.mjs" ],
      
      // css: [ "ccm.load",  "./resources/styles.css" ],
      // css: [ "ccm.load",  "https://ccmjs.github.io/mkaul-components/show_demos/resources/styles.css" ],
      css: [ "ccm.load",  "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/show_demos/resources/styles.css" ],
      
      user:   [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.1.js", { realm: "hbrsinfpseudo" } ],
      
      // logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/mkaul-components/show_demos/resources/configs.js", "log" ] ],

      immediate_save: true,

      onfinish: {
        store: {
          "settings": {
            "url": "https://ccm2.inf.h-brs.de",
            "name": "se_ss20_checkin"
          },
          "key": "G2_9",
          "permissions": {
            "creator": "abc",
            "realm": "hbrsinfpseudo",
            "access": {
              "get": "creator",
              "set": "creator",
              "del": "creator"
            }
          }
        },
        alert: "Gesichert!"
      }
    },

    /**
     * for creating instances of this component
     * @constructor
     */
    Instance: function () {
    
      /**
       * shortcut to helper functions
       * @type {Object.<string,function>}
       */
      let $;
    
      /**
       * own reference for inner functions
       * @type {Instance}
       */
      const self = this;     
      
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
       * @type {Function}
       */
      this.init = async () => {

        // set shortcut to helper functions
        $ = Object.assign( {}, this.ccm.helper, this.helper );
        

      };
      
      /**
       * is called once after the initialization and is then deleted
       * @type {Function}
       */
      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready' );

      };
        
      /**
       * starts the instance
       */
      this.start = async () => {

        await this.user.login();

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( memberset ) );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, { load, save } ) );

        self.weeks.forEach( (week,i) => {
          this.element.querySelector('#week').appendChild( $.html( self.html.option, {
            value: week,
            inner: "Woche " + week
          } ) );
        });

        self.groups.forEach( (group,i) => {
          this.element.querySelector('#group').appendChild( $.html( self.html.option, {
            value: group,
            inner: "Gruppe " + group
          } ) );
        });

        const select_week = self.element.querySelector('#week');
        const select_group = self.element.querySelector('#group');
        let week = self.weeks[0], group = self.groups[0];

        select_week.addEventListener('change', e => {
          week = select_week.options[select_week.selectedIndex].value;
        });

        select_group.addEventListener('change', e => {
          group = select_group.options[select_group.selectedIndex].value;
        });

        // member table re-indexed
        members = Object.values( await $.dataset( this.members ) )
        .reduce((a,b)=>{a[b.pseudonym]=b;return a},{});

        async function load( e ){

          self.data.key = `${group}_${week}`;

          dataset = await $.dataset( self.data );
          if ( ! dataset ) dataset = { key: self.data.key };

          const tableStructure = $.clone( self.html.table );

          $.setContent( self.element.querySelector('#table'), "" );

          memberset = await ccm.load( { url: self.demos, method: 'GET', params: {
              user: self.user.data().user,
              token: self.user.data().token.includes('#') ? self.user.data().token.split('#')[1] : self.user.data().token,
              week: week,
              group: group,
            }
          } );

          memberset.forEach( (record,i) => {
            const member = members[ record[0] ];

            tableStructure.inner.push( $.format( self.html.row, {
              uid: member.uid,
              name: member.Name,
              task: record[1],
              gender: member["Gender"] === "M" ? "Herr" : "Frau",
              stamp: record[2],
            } ) );

          });

          $.setContent( self.element.querySelector('#table'), tableStructure );

          $.fillForm( self.element, dataset );

          Array.from( self.element.querySelectorAll('input[type=checkbox]') ).forEach( checkbox => {
            checkbox.addEventListener('change', change );
          });

          self.onchange && self.onchange();
        }

        function save(){
          dataset = $.formData( self.element );
          self.onfinish.store.key = `${group}_${week}`;
          self.onfinish && $.onFinish( self );  // calls getValue()
        }

        function change(){
          if ( self.immediate_save ) save();
        }

        // render login/logout area if there is no parent ccm component
        this.user && ! this.user.isLoggedIn() && $.append( this.element.querySelector( '#top' ), this.user.root );  // root is empty if parent has login

      };
      
      /**
       * current state of this editor
       * @returns {Object} state of editor
       */
      this.getValue = () => dataset;
      
    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
