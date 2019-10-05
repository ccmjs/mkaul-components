/**
 * @overview ccm component for paper_generator based on a survey / opinion poll
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018, 2019
 * @license The MIT License (MIT)
 * @version latest (3.3.0)
 * @changes
 * version 3.3.0 28.11.2018 prevent interference with location hash
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
    version: [3,3,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-22.7.2.min.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      paper_id: "0123456789", // choose a unique key for your survey / opinion poll

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
          mapping: 'absolute_count'
        },
        {
          id: "histogram_categories_relative",
          type: "histogram_categories",
          title: "Histogramm Kategorien in Prozent",
          mapping: 'relative_count_categories'
        },
        {
          id: "histogram_absolute",
          type: "histogram",
          title: "Histogramm absolut",
          mapping: 'absolute_count'
        },
        {
          id: "histogram_relative",
          type: "histogram",
          title: "Histogramm in Prozent",
          mapping: 'relative_count_participants'
        },
        {
          id: "delay_cat_sum",
          type: "delay_categories",
          title: "Summe aller Verzögerungen in Millisekunden (msec)",
          mapping: 'delay_cat_sum'
        },
        {
          id: "delay_cat_avg",
          type: "delay_categories",
          title: "Durchschnitt aller Verzögerungen in Millisekunden (msec) ",
          mapping: 'delay_cat_avg'
        },
        {
          id: "delay_cat_max",
          type: "delay_categories",
          title: "Maximum aller Verzögerungen in Millisekunden (msec)",
          mapping: 'delay_cat_max'
        },
        {
          id: "delay_cat_min",
          type: "delay_categories",
          title: "Minimum aller Verzögerungen in Millisekunden (msec)",
          mapping: 'delay_cat_min'
        },
        {
          id: "delay_sum",
          type: "delays",
          title: "Summe aller Verzögerungen in Millisekunden (msec)",
          mapping: 'delay_sum'
        },
        {
          id: "delay_avg",
          type: "delays",
          title: "Durchschnitt aller Verzögerungen in Millisekunden (msec)",
          mapping: 'delay_avg'
        },
        {
          id: "delay_max",
          type: "delays",
          title: "Maximum aller Verzögerungen in Millisekunden (msec)",
          mapping: 'delay_max'
        },
        {
          id: "delay_min",
          type: "delays",
          title: "Minimum aller Verzögerungen in Millisekunden (msec)",
          mapping: 'delay_min'
        },
        {
          id: "distribution",
          type: "distribution",
          title: "Verteilung des agilen Anteils",
          x_axis: [20,40,60,80,100],
          x_mapping: "bis_zu_mapping"
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
                { tag: 'h1', inner: 'Vielen Dank für Ihre Teilnahme.<br>Ihr persönliches Ergebnis:<br> Sie sind zu <span class="percentage">x</span>% agil.' },
                { id: 'poll_result' },
                { tag: 'button', id: 'start_paper', inner: 'Weiter zum Artikel über die bisherigen Ergebnisse der Umfrage', onclick: '%start_paper%' },
              ]
            },
            {
              id: 'paper_frame',
              style: { display: 'none' }
            }
          ]
        }
      },

      survey: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/fast_poll/versions/ccm.fast_poll-5.0.1.js" ],

      plotter: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/plotly/versions/ccm.plotly-1.1.1.js" ],

      microservice: 'https://kaul.inf.h-brs.de/data/2018/prosem/server.php',

      // css: [ 'ccm.load',  'resources/default.css' ],
      css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/paper_generator/resources/default.css' ],
      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/paper_generator/resources/default.css' ],

      // process_this_result: console.log, // callback for processing single poll result

      // process_all_results: console.log, // callback for processing all poll results together

      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/paper_generator/resources/configs.js', 'log' ] ],
      // onfinish: function( instance, results ){ console.log( results ); }

      figcaption_prepend: "Abb. ",
      choice_label: 'Auswahl ',
      individual_result: 'Persönliches Ergebnis'
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

        const null_div = document.createElement('div'); // Null Object Pattern

        window.addEventListener('resize',( event ) => { event.preventDefault() } );

        self.process_this_result = find_mapping( self.process_this_result );
        self.process_all_results = find_mapping( self.process_all_results );

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

        // render LightDOM into main_div
        const paper_frame = main_div.querySelector('#paper_frame');
        if ( paper_frame && typeof self.lightDOM === 'string' ){
          paper_frame.innerHTML = self.lightDOM;
        } else { // self.lightDOM is a document-fragment
          paper_frame && self.lightDOM && paper_frame.appendChild( self.lightDOM );
        }

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
          // use in-page anchor only, avoid interference with DMS
          if ( ! location.hash.startsWith('#dms') && ! location.hash.match(/\d+X\d+/).index === 1 ){
            const anchor = main_div.querySelector( 'li' + location.hash.slice(0,location.hash.indexOf('&')) );
            if ( anchor ){
              anchor.style.backgroundColor = "rgb(255, 237, 186)";
              anchor.style.transition = "all 3s linear";
            }
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

              results.paper_id = self.paper_id;

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

              if ( self.process_this_result ) self.process_this_result({ individual_results, results, self });

              change_state( 'result' );
            }
          });
        }

        /*
        * use local data, calculate individual results and draw them into result_div
        * @param individual_results
        */
        async function draw_results( individual_results ){

          if ( div('poll_result') ){
            // calculate percentage: How agile is the current user?
            [...span('percentage')].forEach(
              span => span.innerText = individual_results.final_percentage.toFixed(2)
            );

            div('poll_result').style.display = 'flex';

            // plot cake chart
            await self.plotter.start( {
              root: div('poll_result'),
              data: [
                {
                  "values": Object.values( individual_results.category_counters ),
                  "labels": Object.keys( individual_results.category_counters ),
                  "type": "pie"
                }
              ],
              layout: {
                title: self.individual_result
              }
            } );

            div('poll_result').firstChild.style.margin = 'auto';

          }
        }

        /*
        * fetch dataset from server, calculate results and draw them
        */
        async function generate_paper(){

          // automatic numbering of figures
          let fig_number = 1;
          [...main_div.querySelectorAll('figcaption')].forEach(figcaption=>{
            figcaption.prepend( self.figcaption_prepend + (fig_number++) + ': ');
          });

          // const dataset = await ccm.load( { url: 'https://kaul.inf.h-brs.de/data/2018/prosem/all_objects.php', method: 'GET' } );
          const dataset = (await (await fetch(new Request( self.microservice ), {
            method: 'GET',
            mode: 'cors',
            cache: 'no-store'
          })).json()).filter( record => record.paper_id === self.paper_id ); // take only data from this survey

          // count_participants
          const count_participants = dataset.length;
          [...span('count_participants')].forEach( span => {
            span.innerText = count_participants;
          });

          function make_title( title ){
            return title + '( <em>n = ' +  count_participants + '</em>)';
          }


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

          // external processing of result data for external statistics and plotting
          if ( self.process_all_results ) self.process_all_results({ dataset, self, category_counters, sum_categories, counters, flat_counters });

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
            // collect all figures with type attribute
            [...main_div.querySelectorAll('figure[fig-type]')].forEach(figure => {

              // add plot div as first child node of figure
              const newDiv = $.html({id: figure.getAttribute('fig-id')});
              figure.prepend( newDiv );

              // fig_mapping is the name of the mapping
              // and fig_function ist the JS function
              const fig_mapping = figure.getAttribute('fig-mapping');

              self.figures.push({
                id: figure.getAttribute('fig-id'),
                type: figure.getAttribute('fig-type'),
                title: figure.getAttribute('fig-title'),
                mapping: fig_mapping
              });
            });

            self.figures.forEach( figure =>
              draw_figure( figure )
          )}

          function draw_figure( figure ){
            figure.mapping = find_mapping( figure.mapping );
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
              case "distribution":
                distribution( { title: make_title( figure.title ),
                  plot_div: div( figure.id ),
                  x_axis: figure.x_axis,
                  dataset: dataset,
                  ccm: ccm } );
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
                name: self.choice_label + (i+1),
                type: 'bar'
              };
              group.x = [];
              group.y = [];
              Object.keys( counter ).forEach( key => {
                group.x.push( questions[i][key] );
                group.y.push( mapping( { count: counter[key], count_participants, dataset, self, category_counters, sum_categories, counters, flat_counters } ) );
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
                "y": Object.values(category_counters).map( counter => { return { count: counter, dataset, self, category_counters, sum_categories, counters, flat_counters  } } ).map( mapping ),
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
                mapping({ delay_sums, result, i, dataset, self, category_counters, sum_categories, counters, flat_counters });
              }
            }

            const data = [];
            questions.forEach((question,i) => {
              const group = {
                name: self.choice_label + (i+1),
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
                mapping({delay_sums, result, i, dataset, self, category_counters, sum_categories, counters, flat_counters });
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
          return main_div.querySelector('div#' + id) || null_div;  // prevent null Exception
        }

        function span( class_name ){
          return main_div.querySelectorAll('span.' + class_name) || null_div;
        }

        function button( id ){
          return main_div.querySelector('button#' + id) || null_div;
        }

        // make functions public methods
        self.div = div;
        self.span = span;
        self.button = button;

        function change_state( newState ){
          global_state = newState;
          // window.location = '#' + newState;
          switch( newState ){
            case 'welcome':
              div("paper_frame").style.display = 'none';
              div("survey").style.display = 'none';
              div("result").style.display = 'none';
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
              generate_paper();
              div("paper") && ( div("paper").style.display = 'block' );
              break;
            default: debugger;
          }
        }

        // convert JavaScript question array into HTML list
        function questions_html(){
          let html = "<ol>";
          let nr = 0;
          if ( Object.keys( self.questions ).length > 0 ) for (const answers of Object.values( self.questions )){
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

        function distribution ( args ){
          const { title, plot_div, x_axis, dataset, x_mapping, y_mapping } = args;
          const y_axis = [];
          x_axis.forEach( (max, i) => {
            dataset.forEach(rec => {
              if ( ! y_axis[i] ) y_axis[i] = 0;
              if ( rec.final_percentage <= max && !(i > 0 && rec.final_percentage <= x_axis[i-1]) ) y_axis[i] += 1;
            });
          });

          const data = [
            {
              "x": x_axis.map( x_mapping || ( x => x ) ),
              "y": y_axis.map( y_mapping || ( y => y ) ),
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

        function find_mapping( name ){
          // 1. name is already a function, no search needed
          if ( typeof name === 'function' ) return name;

          // 2. name is an ccm action
          if ( Array.isArray( name ) ) return $.action( name );

          // 3. config
          if ( self[ name ] ) return self[ name ];

          // 4. mapping table lookup. These are the most used functions:
          switch ( name ){
            case 'absolute_count':
              return arg => arg.count;
            case 'relative_count_categories':
              return arg => 100 * arg.count / arg.sum_categories;
            case 'relative_count_participants':
              return arg => 100 * arg.count / arg.count_participants;
            case 'delay_cat_sum':
              return arg => arg.delay_sums[arg.result.categories[arg.i]] += (arg.result.timer[arg.i]-arg.result.timer[arg.i-1]);
            case 'delay_cat_avg':
              return arg => arg.delay_sums[arg.result.categories[arg.i]] += (arg.result.timer[arg.i]-arg.result.timer[arg.i-1]) / arg.category_counters[arg.result.categories[arg.i]];
            case 'delay_cat_max':
              return arg => arg.delay_sums[arg.result.categories[arg.i]] = Math.max( arg.delay_sums[ arg.result.categories[arg.i] ], ( arg.result.timer[arg.i] - arg.result.timer[arg.i-1] ) );
            case 'delay_cat_min':
              return arg => {
                // avoid 0 as minimum
                if ( arg.delay_sums[arg.result.categories[arg.i]] === 0 ) arg.delay_sums[arg.result.categories[arg.i]] = arg.result.timer[arg.i] - arg.result.timer[arg.i-1];
                arg.delay_sums[arg.result.categories[arg.i]] = Math.min( arg.delay_sums[ arg.result.categories[arg.i] ], ( arg.result.timer[arg.i] - arg.result.timer[arg.i-1] ) );
              };
            case 'delay_sum':
              return arg =>
                arg.delay_sums[arg.i][arg.result.categories[arg.i]] += (arg.result.timer[arg.i]-arg.result.timer[arg.i-1]);
            case 'delay_avg':
              return arg => arg.delay_sums[arg.i][arg.result.categories[arg.i]] += (arg.result.timer[arg.i]-arg.result.timer[arg.i-1]) / arg.flat_counters[arg.result.categories[arg.i]];
            case 'delay_max':
              return arg => arg.delay_sums[arg.i][arg.result.categories[arg.i]] = Math.max( arg.delay_sums[arg.i][ arg.result.categories[arg.i] ], ( arg.result.timer[arg.i] - arg.result.timer[arg.i-1] ) );
            case 'delay_min':
              return arg => {
                // avoid 0 as minimum
                if ( arg.delay_sums[arg.i][arg.result.categories[arg.i]] === 0 ) arg.delay_sums[arg.i][arg.result.categories[arg.i]] = arg.result.timer[arg.i] - arg.result.timer[arg.i-1];
                arg.delay_sums[arg.i][arg.result.categories[arg.i]] = Math.min( arg.delay_sums[arg.i][ arg.result.categories[arg.i] ], ( arg.result.timer[arg.i] - arg.result.timer[arg.i-1] ) );
              };
            case "bis_zu_mapping":
              return x => "bis zu " + x;
            case "up_to_mapping":
              return x => "up to " + x;
            case 'debugger':
              return arg => { console.log( arg );  debugger };

            default: // 5. global function
              return window[name];
          }
        }

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();