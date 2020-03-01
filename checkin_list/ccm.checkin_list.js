/**
 * @overview ccm component for checkin_list
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 29.02.2020 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "checkin_list",
    // version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: "https://ccmjs.github.io/ccm/versions/ccm-25.0.0.js",
    ccm: "https://ccmjs.github.io/ccm/ccm.js",

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
                { tag: "th", inner: "Nr" },
                { tag: "th", inner: "Anrede" },
                { tag: "th", inner: "Name" },
                { tag: "th", inner: "Demo" },
                { tag: "th", inner: "Check" }
              ] }
          ]
        },
        row: { tag: "tr", inner: [
            { tag: "td", inner: "%nr%" },
            { tag: "td", inner: "%gender%" },
            { tag: "td", inner: "%name%" },
            { tag: "td", inner: { tag: "input", type: "checkbox", name: "demo_%uid%" } },
            { tag: "td", inner: { tag: "input", type: "checkbox", name: "check_%uid%" } },
          ] }
      },

      nr: true,  // use numbering

      gender: {  // mapping of database fields to GUI Labels
        "M": "Herr",
        "F": "Frau"
      },

      mapping: {   // mapping of member list fields to GUI Labels
        gender: "Gender",
        name: "Name",
        uid: "uid"
      },

      weeks: [9,10,11],  // list of all weeks of one semester
      groups: ["G1","G2","G3","G4"],  // list of all groups

      checkin: "https://kaul.inf.h-brs.de/data/checkin_list.php",

      members: {
        store: [ "ccm.store", "members.js" ],
        key: "se1_ss19"
      },

      data: {
        store: [ "ccm.store", { name: "se_ss20_checkin", url: "https://ccm2.inf.h-brs.de" } ]
      },

      // members: {
      //         store: [ "ccm.store", { name: "${component_name}", url: "https://ccm2.inf.h-brs.de", dataset: "test" } ]
      // },

      // onchange: function(){ console.log( this.getValue() ); },
      
      helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-4.0.2.mjs" ],

      user:   [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.1.js", { realm: "hbrsinfkaul" } ],
      
      css: [ "ccm.load",  "./resources/styles.css" ],
      // css: [ "ccm.load",  "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/checkin_list/resources/styles.css" ],
      
      // logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/mkaul-components/checkin_list/resources/configs.js", "log" ] ],

      immediate_save: true,

      onfinish: {
        store: true,
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
       * memberset is the set of all members of a single group in a single week
       * @type {Object}
       */
      let memberset;

      /**
       * table of all members
       * @type {Object}
       */
      let members;
      
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

        // self.weeks.forEach( week => {
        //   this.html.main.inner[1].inner.push( $.format( self.html.option, {
        //     value: week,
        //     inner: week
        //   } ) );
        // });
        //
        // self.groups.forEach( group => {
        //   this.html.main.inner[2].inner.push( $.format( self.html.option, {
        //     value: group,
        //     inner: group
        //   } ) );
        // });

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

          memberset = await ccm.load( { url: self.checkin, method: 'GET', params: {
              user: self.user.data().user,
              token: self.user.data().token.includes('#') ? self.user.data().token.split('#')[1] : self.user.data().token,
              week: week,
              group: group,
            }
          } );

          memberset.forEach( (record,i) => {
            const member = members[ record[0] ];

            // very abstract type of mapping
            const memberData = Object.fromEntries( Object.entries( self.mapping ).map(
              ([k, v]) => [k, member[ self.mapping[k] ] ] ) );
            if ( self.gender ) memberData['gender'] = self.gender[ memberData['gender'] ];
            if ( self.nr ) memberData['nr'] = i+1;

            tableStructure.inner.push( $.format( self.html.row, memberData ) );

            // more concrete type of mapping in order to understand the abstract type of mapping:
            //
            // tableStructure.inner.push( $.format( self.html.row, {
            //   nr: i+1,
            //   gender: member["Gender"] === "M" ? "Herr" : "Frau",
            //   name: member[ self.mapping["name"] ],
            //   uid: member[ self.mapping["uid"] ]
            // } ) );

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
