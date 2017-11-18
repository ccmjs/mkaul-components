/**
 * @overview ccm component for Google Pie Chart short g_pie_chart
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * TODO: docu comments -> API
 * TODO: unit tests
 * TODO: builder component
 * TODO: i18n
 */

{

  const component  = {

    /**
     * unique component name
     * @type {string}
     */
    name: 'g_pie_chart',
    
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
      google_jsapi: [ "ccm.load", "https://www.google.com/jsapi" ],
      title: 'My Daily Activities',
      header: [ 'Task', 'Hours per Day' ],
      data: [
        [ 'Task', 'Hours per Day' ],
        [ 'Work',    11 ],
        [ 'Eat',      2 ],
        [ 'Commute',  2 ],
        [ 'Watch TV', 2 ],
        [ 'Sleep',    7 ]
      ],
      step_size: 5,
      number_of_steps: 10,
      html: {
        main: {
          class: 'pie_chart_content'
        }
      },
      // css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/g_pie_chart/resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/g_pie_chart/resources/default.css' ],
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
        const main_elem = $.html( self.html.main );

        // load google API for visualisation and draw pie_chart
        google.load( 'visualization', '1', { packages: [ 'corechart' ], callback: drawChart } );

        let chart_is_drawn = false;

        // set content of own website area
        $.setContent( self.element, main_elem );

        if ( callback ) callback();

        function drawChart() {

          let table = self.data;

          if ( self.data_server_url ) {

            // login user if not logged in
            self.user.login( function () {

              table = [ self.header ];
              let step_size = self.step_size;
              let number_of_steps = self.number_of_steps;
              let sum_table = new Array(number_of_steps);
              for (let i=0; i<number_of_steps;i++){
                sum_table[i] = 0;
              }

              ccm.load( [ self.data_server_url, { username: self.user.data().id, password: self.user.data().token } ], function( result_array ) {

                if ( !Array.isArray( result_array ) )
                  return alert( 'not authorized' );

                result_array.map(function( record ) {
                  let points = parseInt(record[1]);
                  sum_table[ Math.floor( points / step_size ) ] += 1;
                });

                for (let i=0; i<number_of_steps;i++){
                  table.push([ "Bis " + (step_size * (i+1)) + " Punkte", sum_table[i] ]);
                }

                process_chart( table );

              } );

            } );

          }

          if ( ! chart_is_drawn ){ // for non server charts
            process_chart( table );
          }
        }

        function process_chart( table ){

          let data = google.visualization.arrayToDataTable( table );

          let options = {};
          if ( self.title ) options.title = self.title;

          let chart = new google.visualization.PieChart( main_elem );

          chart.draw( data, options );

          chart_is_drawn = true;
        }

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}