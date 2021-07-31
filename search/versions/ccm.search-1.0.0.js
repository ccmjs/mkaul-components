/**
 * @overview ccm component for search based on lunr
 * @ref https://lunrjs.com/
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 19.06.2021 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "search",
    version: [1,0,0],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: "https://kaul.inf.h-brs.de/ccmjs/ccm/versions/ccm-26.3.1.js",
    // ccm: "https://kaul.inf.h-brs.de/ccmjs/ccm/ccm.js",

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        main: {
          inner: [
            { tag: "input", type: "text", placeholder: "search term ..." },
            { tag: "button", inner: "Such !", onclick: "%search%" },
            { tag: "p", inner: [
                "Die Suche durchsucht alle Vorlesungen, Folien, Übungen, Lösungen, Fragen und Antworten zu den Folien, Chat und die PDF-Lektüre. Manchmal zeigt der Treffer eine Folie zu spät (+1-Fehler). Daher müssen Sie machmal eine Folie zurückspringen.<br>",
                "Der Suchausdruck erlaubt Wildcards, Fields, Boosts, Fuzzy Matches, Term Presence, siehe ",
                { tag: "a", href: "https://lunrjs.com/guides/searching.html", inner: "Lunr Suchoptionen", target: "_blank" , rel: "noopener" },
                "."
              ] },
            { id: "result" }
          ]
        },
        results: {
          inner: [
            { tag: "h3", inner: "%count% lokale Treffer:" },
            { tag: "ol", id: "list" }
          ]
        },
        item: { tag: "li",
          inner: [
            { tag: "span", inner: "[Score: %score%] &nbsp; " },
            { tag: "a", tabindex: 0, href: "%ref%", inner: "%body%" }
          ]
        },
        external: { tag: "li",
          inner: [
            { tag: "span", inner: "[Score: %score%] &nbsp; " },
            { tag: "a", tabindex: 0, href: "%ref%", inner: "%body%", target: "_blank" }
          ]
        },
        answer: {
          inner: [
            { tag: "h3", inner: "Weitere %count% globale Suchergebnisse zu %Header%:" },
            { tag: "p", inner: "%Abstract%" },
            { tag: "p", inner: [
                "Quelle: ",
                { tag: "a", href: "%AbstractURL%", inner: "%AbstractSource%", target: "_blank", rel: "noopener" },
              ] },

            { tag: "p", inner: "Globale Suche: Powered by <a tabindex='0' target=_blank rel=noopener href=https://duckduckgo.com/>DuckDuckGo</a>" }
          ]
        }
       },

      lunr: "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/lib/lunr.mjs",

      lunr_index: "https://kaul.inf.h-brs.de/se1/assets/txt/lunr-index.json",

      search_engines: [{
        name: "DuckDuckGo",
        url: 'https://api.duckduckgo.com/',
        method: 'jsonp',
        params: {
          q: encodeURIComponent( "%inputValue%" ),
          format: 'json',
          t: 'se1app'
        }}],

      helper: [ "ccm.load", "https://kaul.inf.h-brs.de/ccmjs/akless-components/modules/versions/helper-7.2.0.min.mjs" ],

      // css: [ "ccm.load",  "./resources/styles.css" ],
      css: [ "ccm.load",  "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/search/resources/styles.css" ],
      // css: [ "ccm.load",  "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/search/resources/styles.css" ],

      // logger: [ "ccm.instance", "https://kaul.inf.h-brs.de/ccmjs/akless-components/log/versions/ccm.log-4.0.4.js", [ "ccm.get", "https://kaul.inf.h-brs.de/ccmjs/mkaul-components/search/resources/configs.js", "log" ] ],
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
       * is called once after the initialization and is then deleted
       * @type {Function}
       */
      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready' );

        // set shortcut to helper functions
        $ = Object.assign( {}, this.ccm.helper || ccm.helper, this.helper );

      };

      /**
       * starts the instance
       */
      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html.main, { search } ) );
        const input = this.element.querySelector('input');
        const resultDiv = this.element.querySelector('#result');
        resultDiv.appendChild( $.loading( self ) );

        input.addEventListener( 'keyup', event => {
          if ( input.value === '' ){
            resultDiv.innerHTML = '';
            localStorage.removeItem( 'searchTerm' );
          }
        });

        input.addEventListener( 'keypress', event => {
          if (event.key === 'Enter') {
            search();
          }
        });

        /**
         * index of lunr search engine, see https://lunrjs.com/guides/index_prebuilding.html
         * @type {Object}
         */
        if ( ! this.ccm.lunrIndex ){
          const [ lunrModule, lunrIndexFile ] = await ccm.load( this.lunr, this.lunr_index );
          self.ccm.lunrIndex = lunrModule.lunr.Index.load( lunrIndexFile );
          resultDiv.innerHTML = '';
          input.focus();
        }

        if ( localStorage.getItem('searchTerm') ){
          input.value = localStorage.getItem('searchTerm');
          search();  // when re-loading
        }

        async function search(){
          const inputValue = input.value || localStorage.getItem('searchTerm');
          if ( ! inputValue ) return;
          resultDiv.appendChild( $.loading( self ) );
          localStorage.setItem('searchTerm', inputValue );
          const searchItems = self.ccm.lunrIndex.search( inputValue );
          const count = searchItems.length;
          if ( count === 0 ){
            await duckDuckGo( resultDiv );
          } else {
            $.setContent( resultDiv, $.html( self.html.results, { count } ) );
            const listDiv = resultDiv.querySelector('#list');
            for ( const item of searchItems ){
              const ref = refBuild( item );
              const body = bodyBuild( item );
              const score = item.score.toFixed(3);
              if ( ref.startsWith('http') )
                listDiv.appendChild( $.html( self.html.external, { ref, body, score } ) );
              else
                listDiv.appendChild( $.html( self.html.item, { ref, body, score } ) );
            }
            const ddgDiv = document.createElement('div');
            await duckDuckGo( ddgDiv );
            resultDiv.appendChild( ddgDiv );
          }

          async function duckDuckGo( resultDiv ){
            const answer = await self.ccm.load( { url: 'https://api.duckduckgo.com/', method: 'jsonp',
              params: {
                q: encodeURIComponent( inputValue ),
                format: 'json',
                t: 'se1app'
              } } );
            const Header = capitalizeFirstLetter( inputValue );
            let count = 1;
            const { Abstract, AbstractURL, AbstractSource } = answer;
            let RelatedTopics = document.createElement('ol');
            if ( Abstract === '' ){
              count = answer.RelatedTopics.length;
              for ( const relTopic of answer.RelatedTopics ){
                const listItem = document.createElement('li');
                if ( relTopic.Result ){
                  listItem.innerText = processDDGResult( relTopic.Result );
                  RelatedTopics.appendChild( listItem );
                }
                if ( relTopic.Name ){
                  const listItem = document.createElement('li');
                  listItem.innerHTML = `${relTopic.Name}<ol class="nested"></ol>`;
                  RelatedTopics.appendChild( listItem );
                  const nested = listItem.querySelector('.nested');
                  for ( const topic of relTopic.Topics ){
                    const li = document.createElement('li');
                    li.innerText = processDDGResult( topic.Result );
                    nested.appendChild( li );
                  }
                }
              }
            }
            $.setContent( resultDiv, $.html( self.html.answer, { Header, count, Abstract: Abstract || RelatedTopics, AbstractURL, AbstractSource } ) );
          }
        }

        function processDDGResult( result ){
          // fix DuckDuckGo Bugs
          return result.replaceAll(/\/202\//gim, '/').replaceAll(/<a\s/gim, '<a tabindex="0" target=_blank ');
        }

        function refBuild( item ){
          if ( item.ref.includes('#') ) return item.ref[0] === '#' ? item.ref : '#' + item.ref.split('#')[1];
          return item.ref;
        }

        function bodyBuild( item ){
          const ref = refBuild( item );
          if ( ref.includes('link.springer.com') ) return ref;
          if ( ref.includes('pragprog.com') ) return ref;
          if ( ref.includes('&') ) return ref.split('&')[1].split('=').join(' ');
          if ( item.ref.includes('#') ){
            const firstPart = item.ref.split('#')[0];
            const body = firstPart.slice(0,-2);
            if ( ['le','loes'].includes( body ) ){
              const secondPart = firstPart.slice(-2);
              const nr = parseInt( secondPart );
              if ( isNaN( nr ) ) debugger;
              if ( body === 'le' ) return 'Übung ' + nr;
              return 'Lösung ' + nr;
            } else {
              return capitalizeFirstLetter( firstPart );
            }
          }
          return ref.split('/').slice(-1)[0];
        }

        function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
