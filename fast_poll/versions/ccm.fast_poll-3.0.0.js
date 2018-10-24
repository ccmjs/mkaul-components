/**
 * @overview ccm component for a fast poll (quick survey)
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version 3.0.0
 * TODO: docu comments -> API
 * TODO: unit tests
 * TODO: builder component
 */

{

  var component  = {   // const not working in Safari

    /**
     * unique component name
     * @type {string}
     */
    name: 'fast_poll',
    version: [ 3, 0, 0 ],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.0.6.min.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      html: {
        main: {
          inner: [
            {id: 'title', inner: '%intro%'},
            {id: 'timer'},
            {id: 'choices'}
          ]
        },
        choice: {
          class: 'choice', inner: '%label%'
        },
        results: {
          inner: '%results%'
        }
      },

      css: ['ccm.load', 'https://ccmjs.github.io/mkaul-components/fast_poll/resources/default.css'],

      labels: {
        intro: "Entscheiden Sie sich schnell, ohne lange nachzudenken:<br><b>Was ist Ihnen am wichtigsten:</b>",
        label: "Fertig!"
      },
      choices: [
        // http://agilemanifesto.org/iso/de/manifesto.html
        {agil: 'Individuen und Interaktionen', plan: 'Prozesse und Werkzeuge'},
        {agil: 'Funktionierende Software', plan: 'umfassende Dokumentation'},
        {agil: 'Zusammenarbeit mit dem Kunden', plan: 'Vertragsverhandlung'},
        {agil: 'Reagieren auf Veränderung', plan: 'Befolgen eines Plans'}
      ],
      randomize: {
        row: true,
        column: true
      },

      onfinish: function (instance, results) {
        console.log(results);
      }
    },

    /**
     * for creating instances of this component
     * @constructor
     */
    Instance: function () {

      "use strict";

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
       * function for randomizing array element sequence
       * @type {Array}
       */
      const shuffle = unshuffled => {
        return unshuffled
          .map((a) => ({sort: Math.random(), value: a}))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value);
      };

      /**
       * init is called once after all dependencies are solved and is then deleted
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = self.ccm.helper;

        //  Is config given via LightDOM (inner HTML of Custom Element)?
        //  Then use it with higher priority
        if ( self.inner && self.inner.innerHTML.trim() ) {

          // interprete LightDOM
          self.lightDOM = JSON.parse( self.inner.innerHTML );

          // merge into config
          Object.assign( self, self.lightDOM );

        }

        if (self.randomize.column) {
          self.choices = shuffle( self.choices );
        }
      };


      /**
       * starts the instance
       */
      this.start = async () => {

        // has logger instance? => log 'start' event
        self.logger && self.logger.log('start');

        // collect results in results object
        let results = { texts: [], indices: [], counter: [], timer: [], categories: [] };

        // prepare main HTML structure
        const main_elem = $.html(self.html.main, self.labels);

        // title
        const title = main_elem.querySelector('#title');

        // timer
        const timer = main_elem.querySelector('#timer');
        let counter = 0;
        timer.innerText = '00:00';
        let intervalID;

        // choices
        const choices = main_elem.querySelector('#choices');

        // prepend start button
        self.choices.unshift(['Start!']);
        let number_of_choice = 0;
        render_next_choice(number_of_choice);

        // set content of own website area
        $.setContent(self.element, main_elem);


        /** render the next buttons */
        function render_next_choice(number_of_choice) {

          let row = Object.keys(self.choices[number_of_choice]);
          if (self.randomize.row) {
            row = shuffle(row);
          }

          // clear children
          choices.innerText = '';

          if (number_of_choice === 1) {
            // timer
            counter = 0;
            intervalID = window.setInterval(() => {
              counter += 1;
              timer.innerText = (counter / 10).toFixed(2).replace('.', ':').padStart(5, "000");
            }, 100);
          }

          if (self.questions && self.questions[number_of_choice - 1]) {
            title.innerText = self.questions[number_of_choice - 1];
          }

          // render next choices as buttons
          row.forEach((key, index) => {

            const label = self.choices[number_of_choice][key];

            // use template for rendering
            const child = $.html(self.html.choice, {label: label});

            child.addEventListener('click', clickHandler);

            choices.appendChild(child);

            function clickHandler() {

              // record the user choices in results
              results.texts.push(label);
              results.indices.push(index);
              results.counter.push(counter);
              results.timer.push(window.performance.now());
              results.categories.push(key);

              // log click event
              if (self.logger) self.logger.log('click', {
                label: label,
                index: index,
                counter: counter,
                timer: window.performance.now()
              });

              // render next choice of finish
              number_of_choice += 1;
              if (number_of_choice < self.choices.length) {
                render_next_choice(number_of_choice);
              } else {
                if (self.questions && self.questions[number_of_choice - 1]) {
                  title.innerText = self.questions[number_of_choice - 1];
                }
                onFinish();
              }
            }
          });
        }

        /** finishes the fast poll */
        function onFinish() {

          window.clearInterval(intervalID);
          choices.innerText = '';
          const newChild = $.html(self.html.choice, self.labels);
          choices.appendChild(newChild);

          if (self.finishListener) newChild.addEventListener('click', self.finishListener);

          // no finish => abort
          if (!self.onfinish) return;

          // has logger instance? => log 'finish' event
          self.logger && self.logger.log('finish', $.clone(results));

          // perform 'finish' actions and provide result data
          $.onFinish(self, results);

        }
      }

    }
  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}