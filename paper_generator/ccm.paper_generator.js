/**
 * @overview ccm component for paper_generator
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 11/1/2018
 * TODO: docu comments -> API
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
    name: 'paper_generator',
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.6.3.min.js',
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      // optional configuration if there is no header in the inner html:
      title: 'Agile Werte',
      subtitle: 'Eine empirische Studie',
      author: 'Manfred Kaul',
      address: 'Hochschule Bonn-Rhein-Sieg',
      email: 'Manfred.Kaul[at]h-brs.de',

      headers: [
        "Individuelle Frage zur ersten Auswahl",
        "Individuelle Frage zur zweiten Auswahl"
      ],

      questions: [
        // { man: "männlich", woman: "weiblich", other: "divers" },
        // { young: "Alter: 18-25", middle: "Alter: 26-30", older: "Alter: 31-40", old: "älter" },

        // Manifest // http://agilemanifesto.org/iso/de/manifesto.html
        {agil: 'Individuen und Interaktionen', plan: 'Prozesse und Werkzeuge'},
        {agil: 'Funktionierende Software', plan: 'Umfassende Dokumentation'},
        {agil: 'Zusammenarbeit mit dem Kunden', plan: 'Vertragsverhandlung'},
        {agil: 'Reagieren auf Veränderung', plan: 'Befolgen eines Plans'},

        // Gunter Dueck
        {agil: "Individuelle Menschenentwicklung", plan: "Versetzung nach Standardstufen und Klassen"},
        {agil: "Aktivierung von Selbstwirksamkeitsgefühl", plan: "Prüfungs- und Zeugnisdokumentation"},
        {agil: "Folgen von gewecktem Interesse", plan: "Befolgung von Lehrplänen"},
        {agil: "Zukunftsfähigkeit der Bildung", plan: "Bewahren klassischer Vorstellungen"},

        // https://digitaleneuordnung.de/blog/agiles-manifest-fuer-unternehmensentwicklung/
        {agil: "Konkrete Leistung mit Mehrwert", plan: "gute Präsentation mit Powerpoint"},
        {agil: "(persönliche) Beziehung", plan: "Wasserdichter Vertrag"},
        {agil: "sich an neue Herausforderungen anpassen können", plan: "einen festen Plan haben"}


      ],

      figures: [
        {
          id: "histogram_categories_absolute",
          type: "histogram_categories",
          title: "Histogramm Kategorien absolut",
          mapping: arg => arg.count
        },
        {
          id: "histogram_categories_relative",
          type: "histogram_categories",
          title: "Histogramm Kategorien in Prozent",
          mapping: arg => 100 * arg.count / arg.sum_categories
        },
        {
          id: "histogram_absolute",
          type: "histogram",
          title: "Histogramm absolut",
          mapping: arg => arg.count
        },
        {
          id: "histogram_relative",
          type: "histogram",
          title: "Histogramm in Prozent",
          mapping: arg => 100 * arg.count / arg.count_participants
        },
        {
          id: "delay_cat_sum",
          type: "delay_categories",
          title: "Summe aller Verzögerungen in Millisekunden (msec)",
          mapping: arg => arg.delay_sums[arg.result.categories[arg.i]] += (arg.result.timer[arg.i]-arg.result.timer[arg.i-1])
        },
        {
          id: "delay_cat_avg",
          type: "delay_categories",
          title: "Durchschnitt aller Verzögerungen in Millisekunden (msec) ",
          mapping: arg => arg.delay_sums[arg.result.categories[arg.i]] += (arg.result.timer[arg.i]-arg.result.timer[arg.i-1]) / arg.category_counters[arg.result.categories[arg.i]]
        },
        {
          id: "delay_cat_max",
          type: "delay_categories",
          title: "Maximum aller Verzögerungen in Millisekunden (msec)",
          mapping: arg => arg.delay_sums[arg.result.categories[arg.i]] = Math.max( arg.delay_sums[ arg.result.categories[arg.i] ], ( arg.result.timer[arg.i] - arg.result.timer[arg.i-1] ) )
        },
        {
          id: "delay_cat_min",
          type: "delay_categories",
          title: "Minimum aller Verzögerungen in Millisekunden (msec)",
          mapping: arg => {
            // avoid 0 as minimum
            if ( arg.delay_sums[arg.result.categories[arg.i]] === 0 ) arg.delay_sums[arg.result.categories[arg.i]] = arg.result.timer[arg.i] - arg.result.timer[arg.i-1];
            arg.delay_sums[arg.result.categories[arg.i]] = Math.min( arg.delay_sums[ arg.result.categories[arg.i] ], ( arg.result.timer[arg.i] - arg.result.timer[arg.i-1] ) );
          }
        },
        {
          id: "delay_sum",
          type: "delays",
          title: "Summe aller Verzögerungen in Millisekunden (msec)",
          mapping: arg =>
            arg.delay_sums[arg.i][arg.result.categories[arg.i]] += (arg.result.timer[arg.i]-arg.result.timer[arg.i-1])
        },
        {
          id: "delay_avg",
          type: "delays",
          title: "Durchschnitt aller Verzögerungen in Millisekunden (msec)",
          mapping: arg => arg.delay_sums[arg.i][arg.result.categories[arg.i]] += (arg.result.timer[arg.i]-arg.result.timer[arg.i-1]) / arg.flat_counters[arg.result.categories[arg.i]]
        },
        {
          id: "delay_max",
          type: "delays",
          title: "Maximum aller Verzögerungen in Millisekunden (msec)",
          mapping: arg => arg.delay_sums[arg.i][arg.result.categories[arg.i]] = Math.max( arg.delay_sums[arg.i][ arg.result.categories[arg.i] ], ( arg.result.timer[arg.i] - arg.result.timer[arg.i-1] ) )
        },
        {
          id: "delay_min",
          type: "delays",
          title: "Minimum aller Verzögerungen in Millisekunden (msec)",
          mapping: arg => {
            // avoid 0 as minimum
            if ( arg.delay_sums[arg.i][arg.result.categories[arg.i]] === 0 ) arg.delay_sums[arg.i][arg.result.categories[arg.i]] = arg.result.timer[arg.i] - arg.result.timer[arg.i-1];
            arg.delay_sums[arg.i][arg.result.categories[arg.i]] = Math.min( arg.delay_sums[arg.i][ arg.result.categories[arg.i] ], ( arg.result.timer[arg.i] - arg.result.timer[arg.i-1] ) );
          }
        }
      ],

      html: {

        header: {
          inner: [
            { tag: 'h1', inner: '%title%' },
            { tag: 'h2', inner: '%subtitle%' },
            { tag: 'p', inner: '<em>%author%</em><br>%address%<br>%email%' }
          ]
        },

        main: {
          inner: [
            {
              id: 'welcome',
              inner: [
                { tag: 'h1', inner: 'Umfrage zum agilen Wertesystem'},
                { tag: 'p', inner: 'Die Industrie ist heute zwiegespalten und setzt in Softwareprojekten zur Hälfte agile Methoden und zur anderen Hälfte herkömmliche Methoden ein (Wasserfall). Daher stellt sich die Frage nach der Ursache. Mit dieser Umfrage soll empirisch untersucht werden, ob dies am agilen Wertesystem liegt: Werden die agilen Werte von einer Mehrheit getragen? Überwiegt eine konventionelle oder eine agile Ethik?' },
                { tag: 'button', id: 'start_survey', inner: 'An der Umfrage teilnehmen!<sup>(*)</sup>', onclick: '%start_survey%' },
                { tag: 'p', inner: '<sup>(*)</sup><em>Nach der Teilnahme erhalten Sie Zugriff auf die Auswertung der Umfrage.</em>' }
              ]
            },
            {
              id: 'survey',
              inner: [
                { tag: 'h1', inner: 'Umfrage zum agilen Wertesystem' },
                { id: 'ccm_poll' },
                { tag: 'button', id: 'start_result', inner: 'Weiter zum Ergebnis der Umfrage', onclick: '%start_result%' }
              ]
            },
            {
              id: 'result',
              inner: [
                { tag: 'h1', inner: 'Vielen Dank für Ihre Teilnahme.<br>Ihr persönliches Ergebnis:<br> Sie sind zu <span class="agile_percentage">x</span>% agil.' },
                { id: 'poll_result' },
                { tag: 'button', id: 'start_paper', inner: 'Weiter zum Artikel über die bisherigen Ergebnisse der Umfrage', onclick: '%start_paper%' },
              ]
            },
            {
              id: 'paper_frame'
            }
          ]
        }
      },

      survey: [ "ccm.component", "../fast_poll/ccm.fast_poll.js" ],

      plotter: [ "ccm.component", "../plotly/ccm.plotly.js" ],

      lit_html: [ "ccm.load", { url: "https://unpkg.com/lit-html?module", type: "module" } ],

      microservice: 'https://kaul.inf.h-brs.de/data/2018/prosem/server.php',

      css: [ 'ccm.load',  '../paper_generator/resources/default.css' ],
      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/paper_generator/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/paper_generator/resources/configs.js', 'log' ] ],
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
        
        //  Is config given via LightDOM (inner HTML of Custom Element)?
        //  Then use it with higher priority
        if ( this.inner ){

          this.lightDOM = this.inner.cloneNode(true);

        }

        if ( this.inner && this.inner.innerHTML && this.inner.innerHTML.trim() ){

          // interprete LightDOM
          this.lightDOM = this.inner.innerHTML;

        }

      };
        
      /**
       * starts the instance
       */
      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        let global_state; // store the states of this component
        let individual_results; // results of a single run of this survey

        const main_div = $.html( this.html.main, {

          start_survey: () => {
            button('start_survey').style.backgroundColor = 'red';
            change_state('survey');
          },

          start_result: () => {
            button('start_result').style.backgroundColor = 'red';
            change_state('result');
          },

          start_paper: () => {
            button('start_paper').style.backgroundColor = 'red';
            change_state('paper');
          },

          author: this.author,
          email: this.email,
          address: this.address,
          title: this.title,
          subtitle: this.subtitle,
          questions: questions_html()

        } );

        // render LightDOM with variable substitution into main_div
        const paper_frame = main_div.querySelector('#paper_frame');
        if ( typeof self.lightDOM === 'string' ){
          paper_frame.innerHTML = self.lightDOM;
        } else { // self.lightDOM is a document-fragment
          paper_frame.appendChild( self.lightDOM );
        }

        // self.lit_html.render( self.lit_html.html`${self.lightDOM}`, paper_frame );

        // render header
        const header = main_div.querySelector('header');
        if ( header && ( ! header.innerHTML || ! header.innerHTML.trim() ) ){ // header is empty
          $.setContent( header, $.html( this.html.header, {
            author: this.author,
            email: this.email,
            address: this.address,
            title: this.title,
            subtitle: this.subtitle
          } ) );
        }

        if ( div("questions") ) div("questions").innerHTML = questions_html();

        // render main HTML structure
        $.setContent( this.element, main_div );

        change_state( 'welcome' );

        // Use Location API for hash changes
        // https://developer.mozilla.org/en-US/docs/Web/API/Location
        window.onhashchange = function( e ) {
          // in-page anchor
          const anchor = main_div.querySelector( 'li' + location.hash );
          if ( anchor ){
            anchor.style.backgroundColor = "rgb(255, 237, 186)";
            anchor.style.transition = "all 3s linear";
          }
        };

        function start_survey(){
          self.survey.start( {
            root: div("ccm_poll"),
            questions: self.headers,
            choices: self.questions,
            randomize: {
              row: self.randomize && self.randomize.row,
              column: self.randomize && self.randomize.column
            },
            finishListener: (e) => {
              change_state( 'paper' );
            },
            onfinish: function( instance, results ){

              results.client_time = new Date().toLocaleString();

              Object.keys(results).forEach(key=>{results.texts=results.texts.map(t => t.normalize('NFKD'))});

              // calculate percentage: How agile is the current user?
              results.category_counters = {};
              let max = 0;
              results.categories.forEach( cat => {
                if ( cat === "0" ) return;
                max += 1;
                if ( ! results.category_counters[ cat ] ) results.category_counters[ cat ] = 0;
                results.category_counters[ cat ] += 1;
              });

              results.final_percentage = (100 * results.category_counters.agil / max) || 0;

              // log results
              fetch( new Request( self.microservice ), {
                method: 'POST',
                mode: 'cors',
                cache: 'no-store',
                body: JSON.stringify( results ),
                headers:{
                  'Content-Type': 'application/json'
                }
              });

              individual_results = Object.assign( {}, results ); // $.clone( results );

              change_state( 'result' );
            }
          });
        }

        /*
        * use local data, calculate individual results and draw them into result_div
        * @param individual_results
        */
        function draw_results( individual_results ){

          if ( div('poll_result') ){
            // calculate percentage: How agile is the current user?
            [...span('agile_percentage')].forEach(
              span => span.innerText = individual_results.final_percentage.toFixed(2)
            );

            div('poll_result').style.display = 'block';

            // plot cake chart
            self.plotter.start( {
              root: div('poll_result'),
              data: [
                {
                  "values": Object.values( individual_results.category_counters ),
                  "labels": Object.keys( individual_results.category_counters ),
                  "type": "pie"
                }
              ],
              layout: {
                title: 'Persönliches Ergebnis'
              },
              plot_config: {
                responsive: true
              }
            } )
          }
        }

        /*
        * fetch dataset from server, calculate results and draw them
        */
        async function generate_paper(){

          // automatic numbering of figures
          let fig_number = 1;
          [...main_div.querySelectorAll('figcaption')].forEach(figcaption=>{
            figcaption.prepend('Abb. ' + (fig_number++) + ': ');
          });

          // const dataset = await ccm.load( { url: 'https://kaul.inf.h-brs.de/data/2018/prosem/all_objects.php', method: 'GET' } );
          const dataset = await (await fetch(new Request( self.microservice ), {
            method: 'GET',
            mode: 'cors',
            cache: 'no-store'
          })).json();

          // count_participants
          const count_participants = dataset.length;
          [...span('count_participants')].forEach( span => {
            span.innerText = count_participants;
          });

          function make_title( title ){
            return title + '( <em>n = ' +  count_participants + '</em>)';
          }

          distribution( 'Verteilung des agilen Anteils', div('distribution'), [20,40,60,80,100], dataset, ccm );

          // Browsers encode Umlauts differently
          // Therefore normalize them
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
          dataset.forEach( data => data.texts = data.texts.map(t => t.normalize('NFKD')) );

          // count categories
          const [ category_counters, sum_categories ] = count_categories();

          function count_categories(){
            const category_counters = {};
            let sum_categories = 0;
            dataset.forEach( data => {
              data.categories.forEach( (category,i) => {
                if ( category === "0" ) return;
                if ( ! category_counters[category] ) category_counters[category] = 0;
                category_counters[category] += 1;
                sum_categories += 1;
              })
            });
            return [ category_counters, sum_categories ];
          }


          // count answers
          const counters = count( dataset ); // caching calculation of counters
          const flat_counters = Object.assign({}, ...counters);

          /*
           * count number of answers
           * @param dataset - raw dataset of survey
           */
          function count( dataset ){
            const counters = [];
            self.questions.forEach((pair) => {
              const counter = {};
              Object.keys(pair).forEach(choice => counter[choice]=0);
              counters.push(counter);
            });
            dataset.forEach((data)=>{
              counters.forEach((counter, i)=>{
                const key = data.categories[i+1]; // data.texts[i+1].normalize('NFKD');
                counter[key] += 1;
              });
            });
            return counters;
          }

          draw_all_figures();

          function draw_all_figures(){
            self.figures.forEach( figure =>
              draw_figure( figure )
          )}

          function draw_figure( figure ){
            switch ( figure.type ){
              case "histogram_categories":
                histogram_categories({
                  title: make_title( figure.title ),
                  category_counters,
                  plot_div: div( figure.id ),
                  mapping: figure.mapping || ( c => c ) // identity as default mapping
                });
                break;
              case "histogram":
                histogram({
                  title: make_title( figure.title ),
                  questions: self.questions,
                  results: dataset,
                  plot_div: div( figure.id ),
                  mapping: figure.mapping || ( c => c ) // identity as default mapping
                });
                break;
              case "delay_categories":
                delay_categories({
                  title: make_title( figure.title ),
                  results: dataset,
                  category_counters,
                  plot_div: div( figure.id ),
                  mapping: figure.mapping || ( c => c ) // identity as default mapping
                });
                break;
              case "delays":
                delays({
                  title: make_title( figure.title ),
                  questions: self.questions,
                  results: dataset,
                  counters,
                  flat_counters,
                  plot_div: div( figure.id ),
                  mapping: figure.mapping || ( c => c ) // identity as default mapping
                });
                break;
              default: debugger;
            }
          }


          function histogram ( arg ){

            if ( ! arg.mapping ) arg.mapping = ( arg => arg );
            const { title, questions, results, plot_div, mapping } = arg;

            const data = [];
            counters.forEach((counter, i)=>{
              const group = {
                name: 'Auswahl ' + (i+1),
                type: 'bar'
              };
              group.x = [];
              group.y = [];
              Object.keys( counter ).forEach( key => {
                group.x.push( questions[i][key] );
                group.y.push( mapping( { count: counter[key], count_participants } ) );
              });
              data.push(group);
            });

            // render chart
            self.plotter.start( {
              root: plot_div,
              data: data,
              layout: {
                title: title,
                barmode: 'group'
              },
              plot_config: {
                responsive: true
              }
            } );

            return data;

          }

          function histogram_categories ( arg ){

            if ( ! arg.mapping ) arg.mapping = ( arg => arg );

            const { title, category_counters, plot_div, mapping } = arg;

            const data = [
              {
                "x": Object.keys(category_counters),
                "y": Object.values(category_counters).map( counter => { return { count: counter, sum_categories} } ).map( mapping ),
                "type": "bar"
              }
            ];

            // render chart
            self.plotter.start( {
              root: plot_div,
              data: data,
              layout: {
                title: title
              },
              plot_config: {
                responsive: true
              }
            } );

            return data;

          }

          function delays ( arg ){

            if ( ! arg.mapping ) arg.mapping = ( arg => arg );

            const { title, questions, results, counters, plot_div, mapping } = arg;

            const delay_sums = [{"0":0}]; // Start Button

            // one sum per question
            questions.forEach( question => {
              const sum = {};
              Object.keys(question).forEach(key => {sum[key] = 0});
              delay_sums.push( sum ) ;
            });

            for (const result of results){
              for (let i=0; i<result.categories.length;i++){
                if (i===0) continue;
                // sum, average, min, max, std deviation, median
                mapping({delay_sums, result, i, flat_counters});
              }
            }

            const data = [];
            questions.forEach((question,i) => {
              const group = {
                name: 'Auswahl ' + (i+1),
                type: 'bar'
              };
              group.x = [];
              group.y = [];
              Object.keys(question).forEach(key=>{
                group.x.push( question[key] );
                group.y.push( delay_sums[i+1][ key ] || 0 );
              });
              data.push(group);
            });

            // render chart
            self.plotter.start( {
              root: plot_div,
              data: data,
              layout: {
                title: title,
                barmode: 'group'
              },
              plot_config: {
                responsive: true
              }
            } );

            return data;

          }

          function delay_categories ( arg ){

            if ( ! arg.mapping ) arg.mapping = ( arg => arg );

            const { title, results, category_counters, plot_div, mapping } = arg;
            const delay_sums = {};
            for (const result of results){
              for (let i=0; i<result.categories.length;i++){
                if (i===0) continue;
                if (!delay_sums[result.categories[i]]) delay_sums[result.categories[i]] = 0;
                // sum, average, min, max, std deviation, median
                mapping({delay_sums, result, i, category_counters});
              }
            }

            const data = [
              {
                "x": Object.keys( category_counters ),
                "y": Object.values( delay_sums ),
                "type": "bar"
              }
            ];

            // render chart
            self.plotter.start( {
              root: plot_div,
              data: data,
              layout: {
                title: title
              },
              plot_config: {
                responsive: true
              }
            } );

            return data;

          }



        }

        // universal functions for getting div and span elements from HTML
        function div( id ){
          return main_div.querySelector('div#' + id);
        }

        function span( class_name ){
          return main_div.querySelectorAll('span.' + class_name);
        }

        function button( id ){
          return main_div.querySelector('button#' + id);
        }

        function change_state( newState ){
          global_state = newState;
          // window.location = '#' + newState;
          switch( newState ){
            case 'welcome':
              div("survey").style.display = 'none';
              div("result").style.display = 'none';
              div("paper_frame").style.display = 'none';
              div("welcome").style.animation = 'fadeIn 2s';
              div("welcome").style.display = 'block';
              break;
            case 'survey':
              div("welcome").style.display = 'none';
              div("paper_frame").style.display = 'none';
              div("result").style.display = 'none';
              button("start_result").style.display = 'none';
              div("survey").style.animation = 'fadeIn 2s';
              div("survey").style.display = 'block';
              start_survey();
              break;
            case 'result':
              div("welcome").style.display = 'none';
              div("survey").style.display = 'none';
              div("paper_frame").style.display = 'none';
              div("result").style.animation = 'fadeIn 2s';
              div("result").style.display = 'block';
              draw_results(individual_results);
              break;
            case 'paper':
              div("welcome").style.display = 'none';
              div("survey").style.display = 'none';
              div("result").style.display = 'none';
              div("paper_frame").style.animation = 'fadeIn 3s';
              div("paper_frame").style.display = 'block';
              div("paper").style.display = 'block';
              generate_paper();
              break;
            default: debugger;
          }
        }

        // convert JavaScript question array into HTML list
        function questions_html(){
          let html = "<ol>";
          let nr = 0;
          for (const answers of self.questions){
            nr += 1;
            html += "<li>";
            if ( self.headers && self.headers[ nr ] ) html += "<b>"+ self.headers[ nr ] +"</b>";
            html += "<ol type='a'>";
            for (const answer of Object.values(answers)){
              html += "<li>" + answer + "</li>";
            }
            html += "</ol></li>";
          }
          html += "</ol>";
          return html;
        }

        function distribution ( title, plot_div, x_axis, raw_data, ccm ){

          const y_axis = [];
          x_axis.forEach( (max, i) => {
            raw_data.forEach( rec => {
              if ( ! y_axis[i] ) y_axis[i] = 0;
              if ( rec.final_percentage <= max && !(i > 0 && rec.final_percentage <= x_axis[i-1]) ) y_axis[i] += 1;
            });
          });

          const data = [
            {
              "x": x_axis.map(x => "bis zu " + x),
              "y": y_axis,
              "type": "bar"
            }
          ];

          // render distribution graph
          self.plotter.start( {
            root: plot_div,
            data: data,
            layout: {
              title: title
            },
            plot_config: {
              responsive: true
            }
          } );

          return data;

        }

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();