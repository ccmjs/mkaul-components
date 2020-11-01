/**
 * @overview ccm component for rendering a list of all submitted solutions
 * @author André Kless <andre.kless@web.de> 2018-2019
 * @author Manfred <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (8.0.0)
 * @changes
 * version 8.0.0 (22.04.2020) multi teacher feedback without lost update
 * version 6.0.0 (16.04.2020)
 * version 5.0.0 (17.02.2020)
 * - uses ccm v25
 * version 1.0.0 (17.05.2018)
 */

( function () {

  const component = {

    name: 'show_solutions',
    version: [8,0,0],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-25.5.3.js',

    config: {
      helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-6.0.0.min.mjs" ],
      html: {
        "main": { inner: [
            { tag: "input", type: "checkbox" },
            { tag: "span", inner: "Zeige Liste aller eingereichten Lösungen" },
            { class: "feedback" },
            { class: "solution_parent" }
          ]
        },
        "solution": {
          inner: [
            { tag: "h3", inner: "%key%" },
            { inner: "%value%" },
          ]
        },
        "feedback": {
          inner: [
            { tag: "h3", inner: "Dozenten Feedback:" },
            { inner: "%feedback%" },
          ]
        },
        "header": { tag: "h2", inner: "%title%" }
      },
      data: {
        "store": [ "ccm.store" ],
        "key": {}
      },
      lecturer: [],
      lecturer_fields: [ 'zero', 'teacher_feedback' ],
      message: "No solutions so far. Please wait for deadline.",
      format: {}, // mapping of tasks to types
      css: [ "ccm.load", "https://kaul.inf.h-brs.de/se/resources/solutions.css", "https://ccmjs.github.io/mkaul-components/highlight/resources/monokai-sublime.min.css" ],
      next_slice: 10,
      uml: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/uml/versions/ccm.uml-4.0.1.js" ],
      // editor: [ "ccm.component", "lib/ccm.editor-5.0.0.js" ],

      submit: [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-8.1.3.js" ],

      // editor: [ "ccm.component", "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/content_editor/versions/ccm.content_editor-7.1.0.js", {
      //   ccm: "https://ccmjs.github.io/ccm/versions/ccm-25.5.3.min.js",
      //   key: [ "ccm.get", "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/content_editor/resources/configs.js?v="+ccm_config_version, "small" ],
      //   "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js", [ "ccm.get", "resources/configs.js?v="+ccm_config_version, "user" ] ] } ],

      "editor": [ "ccm.component", "https://ccmjs.github.io/tkless-components/editor/versions/ccm.editor-4.0.0.js", {
        ccm: "https://ccmjs.github.io/ccm/versions/ccm-25.5.3.min.js",
        helper: [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-6.0.0.min.mjs" ],
        "editor": [ "ccm.load",
          "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js",
          "https://ccmjs.github.io/tkless-components/libs/quill/quill.js",
          "https://cdn.quilljs.com/1.2.0/quill.snow.css"
        ],
        "settings": {
          "modules": {
            "toolbar": [
              { 'header': [1, 2, 3, 4, false] },
              "bold", "italic", "underline", "strike",
              { "list": "ordered"}, { "list": "bullet" },
              { "indent": "-1"}, { "indent": "+1" },
              { align: '' }, { align: 'center' },
              "link", "image",
              'code-block'
            ]
          },
          "placeholder": "enter text here",
          "theme": "snow"
        }
      } ],

      // show_zero: true,  // whether to show zeroes
      // auto_open: true   // auto click for opening

      user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.0.js', { realm: 'hbrsinfpseudo' } ],

      hljs:  [ 'ccm.load', 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/highlight.min.js' ],
      //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
    },

    Instance: function () {

      let $;
      let self;

      /**
       * submitted solutions
       * @type {Object[]}
       */
      let solutionList;

      let maxSolution = 0;

      /**
       * is called once after the initialization and is then deleted
       * @type {Function}
       */
      this.ready = async () => {
        if ( this.hljs ) hljs.initHighlightingOnLoad();
        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper || ccm.helper, this.helper );
        self = this;
        if ( ! self.store ) self.store = self.data.store;
      };

      this.start = async () => {

        if ( this.regex ){ // The $ sign is not allowed as HTML attribute
          this.data.key._id.$regex = this.regex;
        }
        let task_id = this.regex ? this.regex.slice(1,8) : this.task;

        // clear own website area
        $.setContent( this.element, $.html( this.html.main ) );

        const checkbox = this.element.querySelector('input[type=checkbox]');
        const feedback_div = this.element.querySelector('.feedback');
        const solutionsParent = this.element.querySelector('.solution_parent');
        const solutionsDiv = document.createElement('div');
        solutionsDiv.classList.add('solutions');
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next ' + self.next_slice + ' solutions';
        nextButton.addEventListener('click', e => {

          // show next 10 solutions
          maxSolution = showSolutions( maxSolution, self.next_slice );

          // logging of 'next' event
          this.logger && this.logger.log( 'next', { count: maxSolution } );

        });
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.addEventListener('click', e => {
          checkbox.checked = false;
          solutionsParent.style.display = 'none';
        });

        checkbox.addEventListener('change', async e => {

          // logging of 'checked' event
          this.logger && this.logger.log( 'checkbox', { checked: checkbox.checked } );

          if ( checkbox.checked ){
            solutionsParent.style.display = 'block';
          } else {
            solutionsParent.style.display = 'none';
          }

          if ( ! solutionList ){

            // get submitted solutions
            solutionList = await $.dataset( this.data );
            if ( typeof solutionList === 'string' ) solutionList = JSON.parse( solutionList );
            solutionList = solutionList.filter( sol => sol != null ); // delete undefinded from array
            solutionList.forEach( solution => {
              if ( solution && ! solution.key ) solution.key = solution._id.split(',');
            });

            // no given solutions? => render message that there is nothing to display
            if ( !Array.isArray( solutionList ) || solutionList.length === 0 ) return $.setContent( this.element, this.message );

            insertIndividualFeedback( solutionList );

            // show first 10 solutions
            maxSolution = showSolutions( maxSolution, self.next_slice );
            solutionsParent.appendChild( nextButton );
            solutionsParent.appendChild( closeButton );
            solutionsParent.insertBefore( solutionsDiv, nextButton );
          }

        });

        if ( self.auto_open ) checkbox.click();

        function insertIndividualFeedback( solutionList ){
          if ( feedback_div && self.user ){
            const myOwnSolution = solutionList.find( solution => solution ? solution.key[1] === self.user.data().key : false );
            if ( myOwnSolution && myOwnSolution.teacher_feedback ){
              $.setContent( feedback_div, $.html( self.html.feedback, { feedback: Object.values( myOwnSolution.teacher_feedback ).join('<br><hr><br>') } ) );
            } else {
              feedback_div.textContent = '';
            }
          }
        }

        function isLecturer(){
          return self.user && self.lecturer && self.lecturer.includes( self.user.data().key );
        }

        function showSolutions( maxSolution, next_slice ){
          for ( let i = 0; i < next_slice; i++ ){
            if ( maxSolution+i < solutionList.length ){
              const solution = solutionList[ maxSolution + i ];
              if ( ! solution.key ) solution.key = solution._id.split(',');
              task_id = solution.key[0];

              // skip bad solutions with zero points in students display
              if ( solution.zero && ! isLecturer() ) return;

              const singleSolutionDiv = document.createElement('div');
              singleSolutionDiv.classList.add('single_solution');
              const feedbackForm = document.createElement('div');
              feedbackForm.classList.add('feedback');

              if ( isLecturer() ){  // minimize rendering: only in visible area
                const student = solution.key[1];
                const studentKey = [ task_id, student ];
                self.submit.start({
                  root: feedbackForm,
                  user: self.user,
                  entries: [
                    "<legend>Teacher Feedback</legend>",
                    {
                      "name": "teacher_feedback",
                      "type": "hidden"
                    },
                    {
                      "label": "Feedback",
                      "name": "teacher_feedback."+self.user.data().key,
                      "type": "textarea",
                      "info": "Individuelles Feedback zur Lösung"
                    },
                    {
                      "label": "Null Punkte!",
                      "name": "zero",
                      "type": "checkbox",
                      "info": "Keine Punkte für diese Einreichung!"
                    },
                    { "type": "submit", "class": "btn btn-primary" }
                  ],
                  data: {
                    store: self.store,
                    key: studentKey
                  },
                  onfinish: {
                    user: true,
                    login: true,
                    store: true,
                    alert: "Gesichert!"
                  }
                });
              } else {
                if ( solution && solution.teacher_feedback ){
                  $.setContent( feedback_div, $.html( self.html.feedback, {
                    feedback: Object.values( solution.teacher_feedback ).join('<br><hr><br>') } ) );
                } else {
                  feedback_div.textContent = '';
                }
              }

              // remove non public, not relevant solution properties
              delete solution.created_at;
              delete solution.updated_at;
              delete solution._;
              delete solution.key;
              delete solution._id;
              delete solution.user_id;
              delete solution.length;
              delete solution.points;
              if ( ! self.show_zero ) delete solution.zero;

              const solutionHeader = document.createElement('h2');
              solutionHeader.textContent = `${maxSolution+i+1}. Lösung ${task_id}:`;
              singleSolutionDiv.appendChild( solutionHeader );

              Object.keys( solution ).forEach( key => {
                if ( self.lecturer_fields.includes( key ) ) return;
                const subTaskHeader = document.createElement('h3');
                subTaskHeader.textContent = key + ":";
                singleSolutionDiv.appendChild( subTaskHeader );
                formatSolution( singleSolutionDiv, solution[ key ], self.format[ `${task_id}.${key}` ] || self.format[ task_id ] );
              });

              solutionsDiv.appendChild( singleSolutionDiv );
              singleSolutionDiv.appendChild( feedbackForm );

            } else {
              nextButton.style.display = 'none';
            }
          }
          return maxSolution + next_slice;
        }

        function formatSolution( singleSolutionDiv, solution, format ){
          const solutionBody = document.createElement('div');
          solutionBody.classList.add('solution_body');
          switch ( format.type ) {
            case "ignore":
              singleSolutionDiv.removeChild( singleSolutionDiv.lastChild ); // subTaskHeader
              solutionBody.textContent = '';  // remove
              solutionBody.classList.remove('solution_body');
              break;
            case "plain":
              solutionBody.textContent = solution;
              break;
            case "html":
              // solutionBody.appendChild( $.html( $.protect( solution ) ));
              self.editor.start( { root: solutionBody, data: solution.inner } );
              break;
            case "editor":
              self.editor.start( { root: solutionBody, data: solution } );
              break;
            case "break":
              solutionBody.innerHTML = $.escapeHTML( solution ).split("\n").join("<br>");
              break;
            case "list":
              solutionBody.innerHTML = `<ul><li>${$.escapeHTML( solution ).split(/\n/).join("</li><li>")}`+"</li></ul>";
              break;
            case "url":
              solutionBody.innerHTML = `<a target="_blank" href="${$.escapeHTML( solution )}" rel="noopener">${$.escapeHTML( solution )}</a>`;
              break;
            case "html_no_numbers":
              solutionBody.innerHTML = `<pre><code class="html">${$.escapeHTML( solution )}</code></pre>`;
              // add highlighting to code
              hljs.highlightBlock( solutionBody.firstElementChild );
              break;
            case "html_with_numbers":
              solutionBody.innerHTML = `<pre><code class="html">${$.escapeHTML( solution )}</code></pre>`;
              // add highlighting to code
              hljs.highlightBlock( solutionBody.firstElementChild );
              insertLineNumbers( solutionBody.firstElementChild );
              break;
            case "java":
              solutionBody.innerHTML = `<pre><code class="java">${$.escapeHTML( solution )}</code></pre>`;
              // add highlighting to code
              hljs.highlightBlock( solutionBody.firstElementChild );
              break;
            case "javascript":
              solutionBody.innerHTML = `<pre><code class="javascript">${$.escapeHTML( solution )}</code></pre>`;
              // add highlighting to code
              hljs.highlightBlock( solutionBody.firstElementChild );
              break;
            case "plaintext":
              solutionBody.innerHTML = `<pre><code class="plaintext">${$.escapeHTML( solution )}</code></pre>`;
              // add highlighting to code
              hljs.highlightBlock( solutionBody.firstElementChild );
              break;
            case "java_with_numbers":
              solutionBody.innerHTML = `<pre><code class="java">${$.escapeHTML( solution )}</code></pre>`;
              // add highlighting to code
              hljs.highlightBlock( solutionBody.firstElementChild );
              insertLineNumbers( solutionBody.firstElementChild );
              break;
            case "javascript_with_numbers":
              solutionBody.innerHTML = `<pre><code class="javascript">${$.escapeHTML( solution )}</code></pre>`;
              // add highlighting to code
              hljs.highlightBlock( solutionBody.firstElementChild );
              insertLineNumbers( solutionBody.firstElementChild );
              break;
            case "plaintext_with_numbers":
              solutionBody.innerHTML = `<pre><code class="plaintext">${$.escapeHTML( solution )}</code></pre>`;
              // add highlighting to code
              hljs.highlightBlock( solutionBody.firstElementChild );
              insertLineNumbers( solutionBody.firstElementChild );
              break;
            case "uml":
              if ( typeof solution === 'string' && solution.trim().startsWith('@startuml') ){
                self.uml.start( { root: solutionBody, data: solution } );
              } else {
                solutionBody.textContent = solution;
              }
              break;
            case "upload":
              solutionBody.innerHTML = `<a target="_blank" href="${solution.url}" rel="noopener">${JSON.stringify(solution)}</a>`;
              break;
            default:
              solutionBody.textContent = solution;
          }
          singleSolutionDiv.appendChild( solutionBody );
        }

        function insertLineNumbers( block ){
          const numberLength = block.textContent.split('\n').length.toString().length;
          const prefix = 'line';
          let line = 1;
          const result = block.innerHTML.replace(/\n/g,
            function() {
              line++;
              return "\n" + '<a class="line" name="' + prefix + line + '">'
                + line.toString().padStart(numberLength,'0')
                + '</a>';
            });
          block.innerHTML = '<a class="line" name="' + prefix + '0">'
            + '1'.padStart(numberLength,'0') +'</a>'
            + result;
        }
      };

      /**
       * returns the current result data
       * @returns {Object[]} current result data
       */
      this.getValue = () => $.clone( solutionList );

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
