/**
 * @overview ccm component for examiner
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 13.07.2020 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "examiner",
    version: [1,0,0],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: "https://kaul.inf.h-brs.de/ccmjs/ccm/versions/ccm-25.5.3.js",
    // ccm: "https://kaul.inf.h-brs.de/ccmjs/ccm/ccm.js",

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      // teams: true, // grouping in teams

      criteria: ["Video_Presi","Video_Demo","Presentation","Eigenleistungen","Produkt","Software_Engineering","Fachsprache","Keine_Zuweisung_freier_Platz","funktionale_Programmierung","Persistenz","Modellierung","Digitalisierungskonzept","User_Stories","Kanban-Board","MVP","UseCaseDiagram","UML_Class","UML_Sequence","Java_Interfaces","TDD","JUnit-Tests","Testabdeckung","SEPP","SonarQube","SOLID","Patterns","MVC","Zielkonflikte","Iterationsbericht","Projektprotokoll","Selbstreflexion"],

      // store locally
      db_name: "ccm",

      // db_version: 13,
      // store_name: "test",

      db_version: 6,
      store_name: "SE1_Hausarbeit",
      store: [ "ccm.store", { "name": "SE1_Hausarbeit" } ], // local store IndexedDB

      // forms in solution database
      data: {
        "store": [ "ccm.store", { "name": "se_ss21_solutions", "url": "https://ccm2.inf.h-brs.de" } ],
        "key": { "_id": { "$regex": "^hausarbeit," } }
      },

      html: {
        main: {
          inner: [
            { id: "top" },
            { tag: "button", class: "save", inner: "Save!", onclick: "%save%" },
            { tag: "input", type: "file", class: "load noprint", accept: "application/json" },
            { tag: "button", class: "load noprint", inner: "Load!", onclick: "%load%" },
            { tag: "button", inner: "Dias!", onclick: "%dias%" },
            { tag: "input", type: "checkbox", inner: "Namen?", onchange: "%namen%" },
            { class: "dias" },
            { tag: "ol", inner: [] }
          ]
        },
        entry: {
          tag: "h5",
          inner: "%Matrikel% (%Name%) %uid% %team% [%points% Vorpunkte] (Team Nr. %team_nr%)"
        },
        link: {
          tag: "a",
          href: "https://kaul.inf.h-brs.de/data/formpseudo.php?uid=%user%&id=%id%&semester=%semester%&fach=%fach%",
          target: "_blank",
          rel: "noopener",
          inner: "%name%"
        },
        dias_with_name: {
          inner: [
            { tag: "p", class: "atab", inner: "%matrikel%\t%Name%\t%note%" },
          ]
        },
        dias: {
          inner: [
            { tag: "p", class: "atab", inner: "%matrikel%\t%note%" },
          ]
        },
        notdias: {
          inner: [
            { tag: "p", class: "atab %participant%", inner: "%matrikel%\t%Name%\t%note%" },
          ]
        },
        criteria: [  // submit config
            {
              "label": "%criterium%",
              "name": "%criterium%_check",
              "type": "checkbox"
            },
            {
              "label": "Note",
              "name": "%criterium%_note",
              "type": "number",
              "min": 1,
              "max": 5
            },
            {
              "label": "Anm.",
              "name": "%criterium%_text",
              "type": "text"
            },
            { tag: "br" }
          ]
       },

      final_input: [
        {
          "name": "git_stat",
          "type": "textarea",
          "placeholder": "git stat",
          "rows": 6
        },
        {
          "name": "git_fame",
          "type": "textarea",
          "placeholder": "git fame",
          "rows": 6
        },
        {
          "name": "Notizen",
          "type": "textarea",
          "placeholder": "Notizen",
          "rows": 6
        },
        { tag: "br" },
        {
          "label": "geprüft",
          "name": "geprüft",
          "type": "checkbox"
        },
        { tag: "br" },
        { tag: "span", id: "berechnete_note" },
        {
          label: "Note:",
          name: "Note",
          type: "text"
        },
        { "type": "submit" }
      ],

      // css: [ "ccm.load",  "./resources/styles.css" ],
      // css: [ "ccm.load",  "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/examiner/resources/styles.css" ],
      css: [ "ccm.load",  "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/examiner/resources/styles.css" ],

      user:   [ "ccm.instance", "https://kaul.inf.h-brs.de/ccmjs/akless-components/user/versions/ccm.user-9.7.0.js", { realm: "hbrsinfpseudo", resources: "https://kaul.inf.h-brs.de/ccmjs/akless-components/user/resources/resources.js" } ],

      hash: "pseudonym",

      // cdp: [ "ccm.load", { url: "./CDP/CDP_PZ1_objects.mjs", type: "module" } ],

      // points: [ "ccm.load", { url: "../punkte_ss21.mjs", type: "module" } ],

      // dias: [ "ccm.load", { url: "./Hausarbeit/dias_ss21.mjs", type: "module" } ],

      // dir: [ "ccm.load", { url: "./dir.mjs", type: "module" } ],
      //
      // dir_path: "./Uploads/",

      plotly: [ "ccm.load", "https://cdn.plot.ly/plotly-latest.min.js" ],
      kurs_anmeldungen: 30, // am Anfang insgesamt alle Anmeldungen, erscheinen im Plot unter "ne"

      submit: [ "ccm.component", "https://kaul.inf.h-brs.de/ccmjs/akless-components/submit/versions/ccm.submit-8.1.2.js", {
        "css.1.1": "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/examiner/resources/styles.css",
        "onfinish": {
          "store": true,
          alert: false
        }
      } ],

      members: [ "ccm.load", { url: "./teilnehmer.json" } ],

      ignore: ["_","updated_at","created_at","key"],

      helper: [ "ccm.load", "https://kaul.inf.h-brs.de/ccmjs/akless-components/modules/versions/helper-7.2.0.min.mjs" ],

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
       * init is called once after all dependencies are solved and is then deleted
       * @type {Function}
       */
      this.init = async () => {

        // set shortcut to helper functions
        $ = Object.assign( {}, this.ccm.helper || ccm.helper, this.helper );

      };

      /**
       * starts the instance
       */
      this.start = async () => {

        const main = $.html( this.html.main, { save, load, dias, namen } );
        const ol = main.querySelector( 'ol' );
        const file_input = main.querySelector( 'input.load' );

        let toggle_namen = false;

        function namen( e ){
          toggle_namen = ! toggle_namen;
        }

        const matrikel_dict = {};
        Object.keys( self.cdp.all ).forEach( x => {
          let matrikel = x.split('_')[0];
          const match = matrikel.match(/\d+/); // digits only
          if ( match ){
            matrikel = match[0];
            if ( matrikel.length < 3 || x.split('_').length < 2 || isNaN( parseInt( matrikel ) ) ) matrikel = 'ohne';
            if ( ! matrikel_dict[ matrikel ] ) matrikel_dict[ matrikel ] = {};
            matrikel_dict[ matrikel ][ x ] = self.cdp.all[ x ];
          } else {
            // console.log( "Dateiname entspricht nicht den Konventionen: " + matrikel );
          }
        });

        const member = {}; const hash = {};
        const points = typeof self.points.points === 'object' ? self.points.points : self.points.points.split("\n").reduce((dict,rec)=>{
          const fields = rec.split(',');
          const uid = fields[1];
          const sum = fields[4];
          dict[uid] = sum;
          return dict},{});
        const ranking = Object.entries( points ).reduce((a,b)=>{
            a.push( b );
            return a},[])
          .sort(([uid1,sum1],[uid2,sum2])=>parseInt(sum2)-parseInt(sum1))
          .reduce((a,b,i)=>{
            a[b[0]] = i+1;
            return a}, {});
        Object.values(self.members).forEach(aMember => {
          if ( points ) aMember.points = points[ aMember.uid ] || '-';
          if ( ranking ) aMember.ranking = ranking[ aMember.uid ] || '-';
          const matrikel = aMember.Matrikel;
          member[ matrikel ] = aMember;
          hash[ aMember[ self.hash ] ] = aMember;
        });
        member.ohne = { Name: "ohne", team: "Team 0" };

        const dataset = await $.dataset( this.data );
        const data_dict = {};
        dataset.forEach( record => {
          const pseudohash = hash[ record.key[1] ];
          if ( pseudohash ){
            const matrikel = hash[ record.key[1] ].Matrikel;
            data_dict[ matrikel ] = record;
          } else {
            console.log( record.key[1] + " has no Matrikel:", record );
          }
        });
        data_dict.ohne = { Name: "ohne" };

        const criteria = [];
        self.criteria.forEach( criterium => {
          criteria.push( ...$.format( self.html.criteria, { criterium } ) );
        });

        const sorted_matrikel = Object.keys(matrikel_dict).sort();
        let sorting;
        if ( self.teams ){  // sort by teams first
          const sorted_teams = sorted_matrikel
          .map(b => [ ( member[b] && member[b].team ) ? parseInt(member[b].team.split(' ')[1] ) : 0, b ] )  // Team + Matrikel
          .sort((a,b)=>(a[0]-b[0])*10**8 + (a[1]-b[1]) );   // Team higher order sorting
          sorting = sorted_teams.map( x => x[1] );
        } else {
          sorting = sorted_matrikel;
        }

        const localDirectory = {};
        const filesFromLocalDirectory = self.dir?.all || [];
        for ( const file of filesFromLocalDirectory ){
          const matrikel = file.split('_')[0];
          if ( ! localDirectory[ matrikel ] ) localDirectory[ matrikel ] = [];
          localDirectory[ matrikel ].push( file );
        }

        const not_in_dias = [];
        const missing_files = {};

        for ( const matrikel of sorting ){
          const record = matrikel_dict[ matrikel ];
          if ( Object.keys( record ).length < 4 ){
            console.log( 'Weniger Dateien bei ', matrikel, record );
            if ( self.dias.all.includes( parseInt( matrikel ) ) ) missing_files[matrikel] = Object.keys( record ).length;
          }
          if ( ! self.dias.all.includes( parseInt( matrikel ) ) ){
            not_in_dias.push( matrikel );
            continue;
          }
          const buttons = self.html.fill ? [ $.format( self.html.fill ), $.format( self.html.clear ) ] : [];
          const li = document.createElement('li');
          const submit = await self.submit.start({
            onchange: comp => comp.instance.data.store.set( Object.assign({
              key: matrikel
            }, comp.instance.getValue() )),
            root: li,
            entries: [ $.format( self.html.entry, Object.assign( {}, member[matrikel] || {}, data_dict[ matrikel || {} ] ) ) ] // header
              .concat( criteria )
              .concat( buttons )
              .concat([
                { tag: "h3", inner: "Eingereichte Hausarbeit:" },
                {  // student uploads
                  tag: 'ul',
                  inner: Object.keys(record).reduce((list, key) => {
                      list.push({
                        tag: 'li',
                        inner: {
                          tag: 'a',
                          target: '_blank',
                          href: record[key],
                          inner: key
                        }
                      });
                      return list
                    },
                    []
                  )
                },
              ]).concat([{ // local directory links
              tag: 'ul',
              inner: (localDirectory[ matrikel ] || []).reduce((a, b) => {
                  a.push({
                    tag: 'li',
                    inner: `Lokal: <a target=_blank href="${self.dir_path + b}">${b}</a>`
                  });
                  return a
                },
                []
              )
            }]).concat([{ // student web form entries
              tag: 'ul',
              inner: Object.entries(data_dict[ matrikel ] || []).reduce((a, [key,value]) => {
                if( self.ignore.includes( key ) ) return a;
                a.push({
                    tag: 'li',
                    class: key,
                    inner: `${key}: ${display(value)}`
                  });
                  return a
                },
                []
              )
            }].concat( self.final_input ) ),  // Mark
            data: {
              store: [ "ccm.store", { "name": self.store_name } ],
              key: matrikel
            }
          });
          const all = Array.from( submit.element.querySelectorAll('[name$="_note"]') );
          const countAll = all.length;
          for ( const elem of all ){
            elem.addEventListener('input', e => {
              if ( e.target.value ){
                elem.classList.add( 'manual' );
              } else {
                elem.classList.remove( 'manual' );
              }
            });
          }
          const notenInput = submit.element.querySelector('[name="Note"]');
          notenInput.addEventListener('input', e => {
            if ( e.target.value ){
              notenInput.classList.add( 'manual' );
            } else {
              notenInput.classList.remove( 'manual' );
            }
          });
          function recalculate( param ){
            const manual = all.filter( sub => sub.classList.contains( 'manual' ) );
            const countManual = manual.length;
            const sumManual = ( manual.map( elem => ! elem.value.trim() || isNaN( elem.value ) ? 0 : parseFloat( elem.value.replace(',','.') ) || parseInt( elem.value ) ) ).reduce((a, b) => a + b, 0);
            if ( isNaN( sumManual ) ) debugger;
            const note = notenInput.value;
            if ( note && ! isNaN( note ) && notenInput.classList.contains( 'manual' ) ){
              let free;
              if ( param && param.manual ){
                free = all.filter( sub => ! sub.classList.contains( 'manual' ) );
              } else {
                free = all.filter( sub => ! sub.value.trim() );
              }
              const countFree = countAll - countManual;
              const newValue = Math.round( ( 10 * ( note * countAll - sumManual ) ) / countFree ) / 10;
              const answer = prompt( `Wirklich alle ${countFree} Felder mit ${newValue} überschreiben?`, newValue );
              if ( answer ){
                for ( const subnote of free ){
                  subnote.value = answer;
                }
              }
            } else {
              const newValue = Math.round( 10 * sumManual / countManual ) / 10;
              notenInput.value = isNaN( newValue ) || newValue < 1 || newValue > 5 ? '' : newValue;
            }
            const dataset = Object.assign({ key: matrikel }, submit.getValue() );
            for ( elem of manual ){  // add all manual fields
              dataset[ elem.name + '_manual' ] = true;
            }
            submit.data.store.set( dataset );
          }
          submit.element.querySelector('button#calc')?.addEventListener('click', event => {
            const manual = all.filter( sub => !! sub.value );
            const countManual = manual.length;
            const sumManual = ( manual.map( elem => ! elem.value.trim() || isNaN( elem.value ) ? 0 : parseFloat( elem.value ) ) ).reduce((a, b) => a + b, 0);
            if ( isNaN( sumManual ) ) debugger;
            const newValue = Math.round( 10 * sumManual / countManual ) / 10;
            notenInput.value = isNaN( newValue ) ? '' : newValue;
          });
          submit.element.querySelector('#fill')?.addEventListener( 'click', event => {
            const note = notenInput.value.replace(',','.');
            if ( note && ! isNaN( note ) ){
              notenInput.classList.add( 'manual' );
              recalculate({manual:true});
            } else {
              notenInput.classList.remove( 'manual' );
            }
          });
          submit.element.querySelector('#clear')?.addEventListener( 'click', event => {
            const filtered = all.filter( sub => sub.value && parseFloat( sub.value ) < 1 || parseFloat( sub.value ) > 5 );
            if ( filtered.length === 0 ){
              const nonManual = all.filter( sub => ! sub.classList.contains('manual') );
              if ( nonManual.length === 0 ){
                if ( confirm( `Wirklich alle Felder löschen?` ) ){
                  for ( const elem of all ){
                    elem.value = '';
                    elem.classList.remove('manual');
                    notenInput.remove('manual');
                  }
                }
              } else {
                if ( confirm( `Wirklich alle ${nonManual.length} Felder überschreiben?` ) ){
                  for ( const elem of nonManual ){
                    elem.value = '';
                  }
                }
              }
            } else {
              if ( confirm( `Wirklich alle ${filtered.length} Felder überschreiben?` ) ){
                for ( const elem of filtered ){
                  elem.value = '';
                }
              }
            }
          });
          if (window.matchMedia("print").matches) {
            // replace all input fields and textareas by div-s
            for ( const tag of [ 'input', 'textarea' ] ){
              for ( const input of Array.from( submit.element.querySelectorAll( tag ) ) ){
                // replace input by div
                const div = document.createElement('div');
                div.classList.add('input-div');
                if ( input.name === 'git_fame' ) div.classList.add('pre');
                div.innerHTML = input.value.replaceAll("\n","<br>");
                input.parentElement.replaceChild( div, input );
              }
            }
          }
          if ( matrikel === 'ohne' ){ li.classList.add('noprint') }
          ol.appendChild( li );

        }

        console.log( 'Missing Files: ', missing_files );
        console.log( 'Not in DIAS: ', not_in_dias );



        // render main HTML structure
        $.setContent( this.element, main );

        // render login/logout area if there is no parent ccm component
        this.user && ! this.user.isLoggedIn() && $.append( this.element.querySelector( '#top' ), this.user.root );  // root is empty if parent has login

        /**
         * display transformations
         * @param value - String
         * @returns String
         */
        function display( value ){
          if ( ! value ) return '-';
          if ( typeof value === 'string' && value.startsWith('%') ) return '-';
          if ( typeof value === 'object' ){
            if ( self.dir2_path ){ // local copy of database files from server
              return `<a target="_blank" href="${self.dir2_path}${localize(value.name)}">${value.name}</a>`;
            } else { // link to server
              return $.html( self.html.link, value ).outerHTML;
            }
          }

          if ( /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*))/.test(value) ){ // insert Hyperlinks
            return value.replace( /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*))/ig, ' <a href="$1" target="_blank" rel="noopener">$1</a> ' );
          }

          return value;
        }

        function localize( name ){
          return self.local_files.all[ name ];
        }

        async function save( e ){
          const filename = self.store_name + '.json';
          const data = await self.store.get();
          save_data_on_file( data, filename );
        }

        function save_data_on_file( data, filename ){
          const json = JSON.stringify(data, null, 2);
          const blob = new Blob([json], {type: 'text/json;charset=utf-8'});
          const anchor = document.createElement('a');
          anchor.setAttribute('download', filename);
          const url = URL.createObjectURL(blob);
          anchor.setAttribute('href', url);
          anchor.click();
          URL.revokeObjectURL(url);
        }

        async function load( e ){
          const file_contents = await file_input.files[0].text();
          const list = JSON.parse( file_contents );
          list.forEach( async value => {
            await self.store.set( value );
          });
        }

        async function dias( e ){
          const dias_div = self.element.querySelector('.dias');
          dias_div.appendChild($.html({tag:"h3", inner: "DIAS"}));
          const plotDiv = document.createElement('div');
          const Noten = [];
          for ( const note of [1,2,3] ){
            Noten.push( note, note + 0.3, note + 0.7 );
          }
          Noten.push( 4, 5, "ne" );
          const frequency = {};
          for ( const note of Noten ){
            frequency[ p( note ) ] = 0;
          }
          const data = await self.store.get();
          const dias_matrikel = self.dias.all;
          const dict = data.filter( rec => dias_matrikel.includes( parseInt(rec.key) ) ).reduce((a,b)=>{a[b.key]=b; return a},{});
          if ( self.kurs_anmeldungen ){
            frequency[ 'ne' ] += self.kurs_anmeldungen - Object.keys( dict ).length;
          }
          const textarea = document.createElement('textarea');
          dias_matrikel.forEach( matrikel => {
            let note = 'ne';
            let Name = '?';
            if ( dict[ matrikel ] ) {
              dict[matrikel].dias = true;
              Name = member[ matrikel ].Name;
              if ( Name ) Name = Name.split(',')[0];
              frequency[ p( dict[matrikel].Note ) ] += 1;
              note =  p( dict[matrikel].Note );
            } else {
              frequency[ "ne" ] += 1;
            }
            dias_div.appendChild( $.html( toggle_namen ? self.html.dias_with_name : self.html.dias, { matrikel, Name, note }) );
            textarea.value += matrikel + "\t" + note + "\n";
          });
          dias_div.appendChild( textarea );
          if ( self.plotly ) Plotly.newPlot( plotDiv, [
                {
                  x: Object.keys( frequency ).map( pp ),
                  y: Object.values( frequency ),
                  type: 'bar',
                  text: Object.values( frequency ).map(String),
                  textposition: 'auto',
                  hoverinfo: 'none',
                  marker: {
                    color: 'rgb(158,202,225)',
                    opacity: 0.6,
                    line: {
                      color: 'rgb(8,48,107)',
                      width: 1.5
                    }
                  }
                }
             ],
            {
              "margin": {"t": 0},
              "barmode": "stack",
              "showlegend": false,
              "xaxis": {
                "tickmode": "array",
                "tickvals": Object.keys( frequency ).map( pp ),
                "ticktext": Object.keys( frequency )
              }
            }, { displayModeBar: false, scrollZoom: false });
          dias_div.appendChild( $.html( self.html.dias, { matrikel: "<b><u>Not in DIAS:</u></b>", Name: "", note: "" }) );
          dias_div.appendChild($.html({tag:"h3", inner: "Statistik"}));
          dias_div.appendChild( plotDiv );
          Object.keys(dict).forEach( matrikel => {
            if ( ! dict[ matrikel ].dias ){
              const note = p( dict[ matrikel ].Note );
              const participant = Object.keys( matrikel_dict ).includes( matrikel ) ? 'participant' : '';
              let Name = member[ matrikel ]?.Name;
              if ( Name ) Name = Name.split(',')[0];
              dias_div.appendChild( $.html( self.html.notdias, { matrikel, Name, note, participant }) );
            }
          });
        }

        function p( note ){ // print note 1.3 and 2.0 etc with dot zero
          if ( note === 'ne' ) return note;  // ne == not available
          if ( typeof note === 'number' ) note = note.toString();
          if ( note.includes('.') ){
            note = note.replace('.',',');
          }
          if ( ! note.includes(',') ){
            note += ',0';
          }
          return note.trim();
        }

        function pp( note ){
          if ( note === 'ne' ) return 6;
          return p( note ).replace(',','.');
        }

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
