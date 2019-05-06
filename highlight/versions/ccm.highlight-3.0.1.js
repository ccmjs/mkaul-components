/**
 * @overview ccm component for highlight
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  const component  = {

    name: 'highlight',
    version: [3,0,1],

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.min.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    config: {
      filename: 'Classname',
      extension: 'java',
      html: {
        main: {
          style: 'position: relative;',
          inner: [
            {
              tag: 'pre',
              style: 'padding: 3px; padding-top: 12px;',
              inner: {
                tag: 'code',
                class: '%clazz%'  // hljs class attribute in config
                // see https://highlightjs.org/usage/
              }
            },
            { style: 'position: absolute; top: 0; right: 0; margin: 3px;', inner: [
                { tag: 'a', inner: 'Download', class: 'down', title: 'Download as File!', style: 'border-radius: 12px; margin: 2px; outline:0;appearance:button;font-size: smaller;padding:2px;border-style: solid;border-width: thin;background-color: white;color:initial;border-color: lightgrey;' },
                { tag: 'button', inner: 'Copy', class: 'copy', title: 'Copy to ClipBoard', onclick: '%copyToClipBoard%', style: 'border-radius: 10px; margin: 3px; outline:0;' },
                { tag: 'button', inner: 'Style', title: 'Change Style', onclick: '%changeStyle%', style: 'border-radius: 10px; margin: 3px; outline:0;' }
              ]
            }
          ]
        }
      },
      hljs:  [ 'ccm.load',
        // 'https://ccmjs.github.io/mkaul-components/highlight/resources/highlight.min.js'
        'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js'
      ],
      css:   [ 'ccm.load', 'https://ccmjs.github.io/mkaul-components/highlight/resources/monokai-sublime.min.css' ],
      css_alternatives: [ 'https://ccmjs.github.io/mkaul-components/highlight/resources/monokai-sublime.min.css',
        'https://ccmjs.github.io/mkaul-components/highlight/resources/tomorrow.min.css',
        'https://ccmjs.github.io/mkaul-components/highlight/resources/zenburn.min.css',
        'https://ccmjs.github.io/mkaul-components/highlight/resources/github.min.css'
      ],

      // content: 'code to be highlighted'

      // configuration of highlight
      // see https://highlightjs.readthedocs.io/en/latest/api.html#configure-options
      // clazz: 'java', // language of highlighting
      // tabReplace: "\t", // a string used to replace TAB characters in indentation.
      // useBR: true, // a flag to generate <br> tags instead of new-line characters in the output, useful when code is marked up using a non-<pre> container.
      // classPrefix: '', // a string prefix added before class names in the generated markup, used for backwards compatibility with stylesheets.
      // languages: ['java', 'php', 'html', 'css', 'javascript' ] // an array of language names and aliases restricting auto detection to only these languages.

      // content: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/2017/se1/01/HelloWorld.java' ]
      // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ]
    },

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

      };

      this.style = 0;

      this.setStyle = function( style_nr ) {
        self.style = style_nr;
        self.style %= self.css_alternatives.length;
        self.element.parentNode.querySelector('link').href = self.css_alternatives[ self.style ] ;
      };

      this.start = async () => {

        // has logger instance? => log 'render' event
        self.logger && self.logger.log( 'render' );

        // set content of own website area
        $.setContent( self.element, $.html( self.html.main, {
          clazz: self.clazz,
          copyToClipBoard: copyToClipBoard,
          changeStyle: changeStyle
        } ) );

        // get DOM element of <pre><code>
        const main_elem = self.element.querySelector('pre code');
        const copy_button = self.element.querySelector('.copy');

        // https://stackoverflow.com/questions/23211018/copy-to-clipboard-with-jquery-js-in-chrome
        copy_button.addEventListener('copy', function (e) {
          e.preventDefault();
          if (e.clipboardData) {
            e.clipboardData.setData('text/html', main_elem.innerHTML );
          } else if (window.clipboardData) {
            window.clipboardData.setData('Text', main_elem.innerText );
          }
        });

        function copyToClipBoard(e) {
          const range = document.createRange();
          range.selectNode( main_elem );
          const selection = window.getSelection();
          selection.removeAllRanges();
          if( ! selection.containsNode( main_elem ) ) selection.addRange(range);
          document.execCommand("copy");
        }

        // set main element content to config or lightDOM content
        const textContent = self.content || ( self.inner || self.root ).innerHTML;

        self.getValue = () =>  textContent;

        // fill download link with Blob filled with textContent
        const blob = new Blob( [ textContent ], { type: 'text/plain' } );
        const a = self.element.querySelector('.down');
        a.href = URL.createObjectURL(blob);
        a.download = ( self.filename || 'Filename' ) + '.' + ( self.extension || self.clazz );

        a.addEventListener('click', ()=>{
          a.download = window.prompt('Enter Filename:', a.download);
        }); 

        main_elem.textContent = textContent; // htmlDecode( textContent );

        // extract highlight options from config
        const { tabReplace, useBR, classPrefix, languages } = self;

        // remove undefined values
        const configuration = Object.entries({ tabReplace, useBR, classPrefix, languages }).reduce((acc, [key, val]) => { if (val) acc[key] = val; return acc; }, {});

        // https://highlightjs.readthedocs.io/en/latest/api.html#configure-options
        if ( Object.keys(configuration).length > 0 ) hljs.configure( configuration );

        hljs.highlightBlock( main_elem );

        // Converting sanitised html back to displayable html
        // back replacement of "<" instead of "&lt;"
        // https://stackoverflow.com/questions/1248849/converting-sanitised-html-back-to-displayable-html
        function htmlDecode(input){
          const elem = document.createElement('div');
          elem.innerHTML = input;
          return input ? elem.childNodes[0].nodeValue : input;
        }

        function changeStyle(e) {
          self.style += 1;
          self.setStyle( self.style );
          e.preventDefault();
          e.stopPropagation();
          return false;
        }

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
}() );