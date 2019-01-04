/**
 * @overview ccm component for markdown_editor
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 11/17/2018
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
    name: 'markdown_editor',
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.6.7.min.js',
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      data: {
        markdown: '# Hello Markdown!<br>## Please edit here.'
      },

      onchange: function(){ console.log( this.getValue() ); },

      // data: {
      //   "store": [ "ccm.store", { local: 'resources/dataset.json' } ],
      //   "key": "demo"
      // },

      html: {
        inner: [
          // in combination with hljs:
          // { inner: { tag: 'pre', inner: { tag: 'code', class: 'markdown hljs', inner: '%markdown%' } } },
          { id: 'markdown', inner: '%markdown%' },
          { id: 'preview' }
        ]
      },

      showdownjs: [ "ccm.load", "https://cdnjs.cloudflare.com/ajax/libs/showdown/1.8.7/showdown.min.js"],

      // highlightjs: [ "ccm.load", "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js"],

      // highlightcss: [ "ccm.load", "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/monokai-sublime.min.css"],

      css: [ 'ccm.load',  'resources/default.css' ],
      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/markdown_editor/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/markdown_editor/resources/configs.js', 'log' ] ],
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
       * markdown data
       * @type {string}
       */
      let dataset;

      /**
       * is called once after the initialization and is then deleted
       */
      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready' );

        // set shortcut to help functions
        $ = this.ccm.helper;

        self.inner = $.html( self.inner );

        //  Is config given via LightDOM (inner HTML of Custom Element)?
        //  Then use it with higher priority
        if ( this.inner && this.inner.innerText && this.inner.innerText.trim() ){

          // interprete LightDOM
          this.lightDOM = this.inner.innerText;

        }

        this.converter = new showdown.Converter();

        // https://github.com/highlightjs/highlight.js/issues/907
        // hljs.configure({ useBR: true });

      };

      /**
       * starts the instance
       */
      this.start = async () => {

        /**
         * dataset for rendering
         * @type {Object}
         */
        const dataset = await $.dataset( this.data );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        // const data = { markdown: '# Hello Markdown!<br>## Please edit here.' };

        let html_code = this.converter.makeHtml( this.lightDOM || dataset.markdown.replace('<br>', "\n") );

        const main_div = $.html( this.html, {
          markdown: dataset.markdown,
          // preview: html_code.replace(/"/g,"\\\"")  // escape apostrophe
        } );

        const div = {};      // container for all div elements with id
        div.markdown = main_div.querySelector('.markdown');

        // collect all div elements with id into container
        [...main_div.querySelectorAll('div[id]')].forEach( elem => {
          div[ elem.id ] = elem;
        });

        div.markdown.contentEditable = "true";
        div.preview.innerHTML = html_code;

        enterPreviewMode(); // TODO onchange nicht beim start ausrufen

        div.markdown.addEventListener( 'mouseleave', enterPreviewMode );

        div.markdown.addEventListener( 'keyup', (e)=>{this.data.markdown = div.markdown.innerText});

        div.preview.addEventListener(  'mouseenter', enterEditingMode );

        // render main HTML structure
        $.setContent( this.element, main_div );

        function enterPreviewMode(e){
          // ToDo call onchange only if the text has been edited
          self.onchange && self.onchange.call( self );
          dataset.markdown = div.markdown.innerText || dataset.markdown;
          const html_code = self.converter.makeHtml( div.markdown.innerText );
          div.preview.innerHTML = html_code;
          // hljs.highlightBlock( div.preview );
          // highlight special chars of markdown syntax
          div.markdown.style.display = 'none';
          div.preview.style.display = 'block';
        }

        function enterEditingMode(e){
          const width = div.preview.offsetWidth;
          // const width2 = div.preview.clientWidth;
          const height = div.preview.offsetHeight;
          // const positionInfo = div.preview.getBoundingClientRect();

          div.markdown.style.width = width + 'px';
          div.markdown.style.height = height + 'px';

          div.preview.style.display = 'none';
          div.markdown.style.display = 'block';
          // div.markdown.style['min-height'] = height + 'px';
        }

      };

      this.getValue = () => {
        return $.clone( dataset );
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();