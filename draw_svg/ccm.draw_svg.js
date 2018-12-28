/**
 * @overview ccm component for SVG Editor called draw_svg
 * @link https://github.com/santanubiswas948/draw-svg
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 26.12.2018 initial build
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
    name: 'draw_svg',
    // version: [1,0,0],
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.6.6.min.js',
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {

      data: { // initial SVG diagram to be edited
        inner: {
          "tag": "svg",
          "id": "svg",
          "width": "100%",
          "height": "100%",
          "margin": 0,
          "padding": 0,
          "inner": [
            {
              "tag": "rect",
              "x": 50,
              "y": 50,
              "width": 50,
              "height": 50,
              "fill": "lightgreen",
              "stroke": "green",
              "stroke-width": 4
            },
            {
              "tag": "text",
              "inner": "Press Mouse to draw",
              "x": 70,
              "y": 80
            }
          ]
        }
      },

      // data: {  // fetched from store
      //   "store": [ "ccm.store", { local: 'resources/dataset.json' } ],
      //   "key": "demo"
      // },

      // onchange: function(){ console.log( this.getValue() ); },

      html: {
        toolbar: {
          "class": "toolbar",
          "inner": [
            {
              "tag": "a",
              "href": "#",
              "class": "change",
              "style": "width: auto; margin-right: 5px;",
              "title": "Color: Changes color of line",
              "data-command": "color",
              "inner": [
                {
                  "tag": "input",
                  "type": "color"
                }
              ]
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "undo",
              "inner": {
                "tag": "i",
                "class": "fa fa-undo"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "redo",
              "inner": {
                "tag": "i",
                "class": "fa fa-repeat"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "title": "insert line",
              "data-command": "line",
              "style": "width: auto; margin-right: 2px; border-radius: 3px;",
              "inner": {
                "tag": "svg",
                "width": "1em",
                "height": "1em",
                "viewBox": "0 0 100 100",
                "xmlns": "http://www.w3.org/2000/svg",
                "inner": [
                  {
                    "tag": "line",
                    "x1": 5,
                    "y1": 95,
                    "x2": 95,
                    "y2": 5,
                    "fill": "#eee",
                    "stroke-width": 3,
                    "stroke": "#000"
                  }
                ]
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "title": "insert text",
              "data-command": "text",
              "inner": {
                "tag": "i",
                "class": "fa",
                "inner": "T"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "title": "insert HTML even via copy paste",
              "style": "width: auto; margin-right: 2px; border-radius: 3px;",
              "data-command": "html",
              "inner": {
                "tag": "i",
                "class": "fa",
                "inner": "HTML"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "title": "insert rectangle",
              "data-command": "rect",
              "style": "width: auto; margin-right: 3px; border-radius: 3px;",
              "inner": {
                "tag": "svg",
                "width": "1em",
                "height": "1em",
                "viewBox": "0 0 100 100",
                "xmlns": "http://www.w3.org/2000/svg",
                "inner": [
                  {
                    "tag": "rect",
                    "x": 0,
                    "y": 0,
                    "width": 90,
                    "height": 90,
                    "fill": "#eee",
                    "stroke-width": 10,
                    "stroke": "#000"
                  }
                ]
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "title": "insert circle",
              "data-command": "circle",
              "style": "width: auto; margin-right: 2px; border-radius: 3px;",
              "inner": {
                "tag": "svg",
                "width": "1em",
                "height": "1em",
                "viewBox": "0 0 100 100",
                "xmlns": "http://www.w3.org/2000/svg",
                "inner": [
                  {
                    "tag": "circle",
                    "cx": 50,
                    "cy": 50,
                    "r": 45,
                    "fill": "#eee",
                    "stroke-width": 10,
                    "stroke": "#000"
                  }
                ]
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "ccm-clock",
              "title": "insert live Clock",
              "inner": {
                "tag": "i",
                "class": "fa fa-clock-o"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "ccm-content_editor",
              "data-enabled": '[ "toggle", "bold", "h1", "ccm-clock", "ccm-content_editor", "ccm-quiz" ]',
              "title": "insert nested editor",
              "inner": {
                "tag": "i",
                "inner": "E",
                "class": "fa"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "ccm-quiz",
              "title": "insert nested quiz",
              "inner": {
                "tag": "i",
                "inner": "Q",
                "class": "fa"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "style": "width: auto;",
              "data-command": "ccm-draw_svg",
              "data-enabled": '[ "undo", "redo", "color" ]',
              "title": "insert nested SVG Editor",
              "inner": {
                "tag": "i",
                "inner": "SVG",
                "class": "fa"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "save_image",
              "inner": {
                "tag": "i",
                "class": "fa fa-save"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "clear_image",
              "inner": {
                "tag": "i",
                "class": "fa fa-eraser"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "embed",
              "title": "embed code, e.g. Youtube",
              "style": "width: auto; margin-right: 5px; border-radius: 3px;",
              "inner": {
                "tag": "i",
                "inner": "&lt;embed&gt;",
                "class": "fa"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "click",
              "data-command": "dms",
              "title": "DMS-ID",
              "style": "width: auto; margin-right: 5px; border-radius: 3px;",
              "inner": {
                "tag": "i",
                "inner": "[DMS-ID]",
                "class": "fa"
              }
            },
            {
              "tag": "a",
              "href": "#",
              "class": "change",
              "data-command": "select",
              "title": "select ccm component from DMS",
              "style": "width: auto; margin-right: 5px; border-radius: 3px;",
              "inner": {
                "class": "fa",
                "tag": "select",
                "inner": []
              }
            },
            {
              "tag": "a",
              "href": "#",
              "title": "add your own button to the toolbar",
              "data-command": "plus",
              "class": "click",
              "inner": {
                "class": "fa fa-plus",
                "tag": "i"
              }
            },
            {
              "style": "white-space:nowrap; display: inline;",
              "inner": [
                {
                  "tag": "label",
                  "for": "mouse-x",
                  "inner": " x = "
                },
                {
                  tag: "input",
                  type: "number",
                  style: "width: 4em;",
                  id: "mouse-x"
                }
              ]
            },
            {
              "style": "white-space:nowrap; display: inline;",
              "inner": [
                {
                  "tag": "label",
                  "for": "mouse-y",
                  "inner": " y = "
                },
                {
                  tag: "input",
                  type: "number",
                  style: "width: 4em;",
                  id: "mouse-y"
                }
              ]
            }
         ]
        },
        editor: {
          "id": "draw_div"
        },
        plus: {
          "tag": "a",
          "href": "#",
          "data-command": "plus_action",
          "data-address": "%actionAddress%",
          "data-action": "%buttonName%",
          "style": "width: auto; margin-right: 5px; border-radius: 3px;",
          "class": "click",
          "inner": {
            "class": "fa",
            "tag": "i",
            "inner": "%buttonName%"
          }
        }
      },

      // enabled: ['undo', 'redo', 'color', 'text', 'html', 'line', 'rect', 'circle', 'ccm-clock', 'ccm-content_editor', 'ccm-draw_svg', 'ccm-quiz', 'save_image', 'clear_image', 'plus' ],

      stroke_width: 2.2,
      updata_data_event: 'pointerleave',  // or mouseup etc


      store: [ "ccm.store", { "name": "components", "url": "https://ccm2.inf.h-brs.de" } ],

      clock: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/clock/versions/ccm.clock-3.0.1.js", {
        width: "40px",
        html: { main: { id: 'main', inner: [ { id: 'clock' } ] }
        }
      } ],

      content_editor: [ "ccm.component", "https://ccmjs.github.io/mkaul-components/content_editor/versions/ccm.content_editor-4.7.0.js", { key: ["ccm.get","https://ccmjs.github.io/mkaul-components/content_editor/resources/configs.js","small"] } ],

      quiz: [ "ccm.component", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-3.0.1.js", { key: ["ccm.get","https://ccmjs.github.io/akless-components/quiz/resources/configs.js","demo"] } ],


      css_awesome: [ "ccm.load",
        { context: "head",
          url: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        },
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ],
      css: [ 'ccm.load',  'resources/default.css' ],
      // css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/draw_svg/resources/default.css' ],
      // user:   [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.1.0.js', { realm: 'hbrsinfkaul' } ],
      // logger: [ 'ccm.instance', 'https://ccmjs.github.io/akless-components/log/versions/ccm.log-3.1.0.js', [ 'ccm.get', 'https://ccmjs.github.io/mkaul-components/draw_svg/resources/configs.js', 'log' ] ],
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
       * Fetch all ccm components from DMS. Store them as key-value pairs with name and URL
       * @type {Object}
       */
      const DMS_component_index = {};

      /**
       * dataset for rendering
       * The value of dataset starts with a clone of this.data,
       *     but additional values might be added during editing.
       * this.data is never changed, only dataset is changed.
       * @type {Object}
       */
      let dataset;
      
      /**
       * init is called once after all dependencies are solved and is then deleted
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = this.ccm.helper;

        // get data from config or remote database
        dataset = await $.dataset( this.data );

        if ( typeof dataset === 'string' ) dataset = { inner: dataset };

        // Use LightDOM with higher priority than data from config
        if ( this.inner ){

          // Light DOM is given as ccm JSON data? => convert to HTML DOM Elements
          if ( $.isObject( this.inner ) && !$.isElementNode( this.inner ) )
            this.inner = $.html( this.inner );

          // dynamic replacement of placeholders
          if ( this.placeholder ) [ ...this.inner.children ].forEach( child => child.innerHTML = $.format( child.innerHTML, this.placeholder ) );

          dataset.inner = this.inner;
        }

        if ( ! dataset ) dataset = {};

        // initialize dataset.components if necessary
        if ( ! dataset.components ) dataset.components = {};

      };
      
      /**
       * is called once after the initialization and is then deleted
       */
      this.ready = async () => {

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready' );

        const data = await self.store.get({});

        for ( const record of data ){
          // with version number
          DMS_component_index[ $.getIndex( record.url ) ] = record.url;
          // without version number
          DMS_component_index[ record.key ] = record.url;
        }

      };
        
      /**
       * starts the instance
       */
      this.start = async () => {

        /**
         * dataset for initial rendering
         * @type {Object}
         */
        dataset = await $.dataset( this.data );
        self.color = dataset.color || '#000'; // black

        // logging of 'start' event
        this.logger && this.logger.log( 'start', $.clone( dataset ) );

        const editor_div = $.html( self.html.editor );
        editor_div.appendChild( $.html( dataset.inner ) );
        editor_div.addEventListener(self.updata_data_event, function(e){
          updateData();
        });

        /**
         * refresh dataset after editing
         */
        function updateData(){
          dataset.inner = editor_div.innerHTML;
          self.onchange && self.onchange();
        }

        // filter enabled tools
        if ( self.enabled && self.html.toolbar.inner ){
          self.html.toolbar.inner = self.html.toolbar.inner.filter(tool=>self.enabled.includes(tool['data-command']) || ! tool['data-command'] );
        }

        const toolbar_div = $.html( self.html.toolbar );

        // add click event listener
        [...toolbar_div.querySelectorAll('.click')].forEach( tool => {
          tool.addEventListener('click', toolbarClickListener.bind( tool ) );
        });

        // add change event listener
        [...toolbar_div.querySelectorAll('.change')].forEach( tool => {
          tool.addEventListener('change', toolbarChangeListener.bind( tool ) );
        });

        // render main HTML structure
        $.setContent( self.element, $.html( [ toolbar_div, editor_div ] ) );

        // SVG hack: paint all svg icons which are inside the DOM but not painted
        [...self.element.querySelectorAll('svg')].forEach(svg=>{
          svg.parentNode.innerHTML += '';
        });

        const draw_div = self.element.querySelector('#draw_div');
        const svg_node = self.element.querySelector('#svg');
        const mouse_x  = self.element.querySelector('#mouse-x');
        const mouse_y  = self.element.querySelector('#mouse-y');
        svg_node.onmousemove = (evt)=> {
          mouse_x.value =  evt.pageX - getPositionX(svg_node)-getPositionX(draw_div)-1;
          mouse_y.value =  evt.pageY - getPositionY(svg_node)-getPositionY(draw_div)-1;
        };

        const undoStack = [];
        const redoStack = [];

        const draw_obj={
          prevX : 0,
          prevY : 0,
          flag  : 0,
          flag1  : 0,
          total_polygon  : 0,
          draw : () => {
            //start time of draw
            svg_node.addEventListener('mousedown',(e)=>{
              e.stopPropagation();
              e.preventDefault();
              svg_node.addEventListener('mousemove', drawNow );

            });
            //draw end time
            svg_node.addEventListener('mouseup',(e)=>{
              e.stopPropagation();
              e.preventDefault();
              svg_node.removeEventListener('mousemove', drawNow );
              draw_obj.prevX=0;
              draw_obj.prevY=0;
            });
          }

        };

        draw_obj.draw();

        function drawNow( evt ) {
          evt.stopPropagation();
          evt.preventDefault();
          let positionX=evt.pageX - getPositionX(svg_node)-getPositionX(draw_div)-1;
          let positionY=evt.pageY - getPositionY(svg_node)-getPositionY(draw_div)-1;
          if(draw_obj.prevX===0) {
            draw_obj.prevX=positionX;
            draw_obj.prevY=positionY;
            draw_obj.flag=1;
          } else {
            if(draw_obj.flag===1) {
              let prevX=draw_obj.prevX;
              let prevY=draw_obj.prevY;
              let path=new SvgPath({
                'd' : "M"+prevX+","+prevY+" L"+positionX+","+positionY,
                'fill' : 'none',
                'stroke' : self.color,
                'stroke-width' : self.stroke_width,
                'id' : 'path'+(svg_node.children.length+1),
              });
              undoStack.push(path);
              svg_node.appendChild(path);

              draw_obj.flag=0;
              draw_obj.prevX=positionX;
              draw_obj.prevY=positionY;
            } else {
              let lastchildPath=self.element.querySelector('#path'+(svg_node.children.length));
              let get_d_attr=lastchildPath.getAttribute('d');
              let curvX=(draw_obj.prevX+positionX)/2;
              let curvY=(draw_obj.prevY+positionY)/2;
              lastchildPath.setAttribute('d',get_d_attr+" C"+curvX+","+curvY+" "+curvX+","+curvY+" "+positionX+","+positionY);

              draw_obj.prevX=positionX;
              draw_obj.prevY=positionY;
            }
          }
        }

        //For getting X position
        function getPositionX(elem) {
          let x=0;
          do{
            if(!isNaN(elem.offsetLeft)) {
              x +=elem.offsetLeft;
            }
          } while (elem=elem.offsetParent);
          return x;
        }

        //For getting Y Position
        function getPositionY(elem) {
          let y=0;
          do{
            if(!isNaN(elem.offsetTop)) {
              y +=elem.offsetTop;
            }
          } while (elem=elem.offsetParent);
          return y;
        }

        class SvgObject {
          constructor( obj, type='path' ){
            this.path=document.createElementNS('http://www.w3.org/2000/svg', type );
            for( const prop in obj ) {
              this.path.setAttributeNS(null, prop, obj[prop] );
            }
          }
          get svg(){
            return this.path;
          }
          get undo(){

          }
          get redo(){

          }
          resize(){

          }
        }

        class SvgText extends SvgObject {
          constructor(){
            super();
          }
        }

        class SvgForeignObject extends SvgObject {
          constructor(){
            super();
          }
        }

        // create Path
        function SvgPath( obj, type='path' ) {
          let path=document.createElementNS('http://www.w3.org/2000/svg',type);
          for(let prop in obj) {
            path.setAttributeNS(null,prop,obj[prop]);
          }
          return path;
        }
        // create Text
        function SvgText( obj, content ) {
          let text=document.createElementNS( 'http://www.w3.org/2000/svg', 'text' );
          for(let prop in obj) {
            text.setAttributeNS(null,prop,obj[prop]);
          }
          const textNode = document.createTextNode(content);
          text.appendChild(textNode);
          return text;
        }
        // create foreign object
        function ForeignObject( obj, div ){
          let svgObj = document.createElementNS( 'http://www.w3.org/2000/svg', 'foreignObject' );
          for(let prop in obj) {
            svgObj.setAttributeNS(null,prop,obj[prop]);
          }
          svgObj.appendChild( div );
          return svgObj;
        }

        function moveListener( node, x, y ){
          return (evt) => {
            let positionX=evt.pageX - getPositionX(svg_node)-getPositionX(draw_div);
            let positionY=evt.pageY - getPositionY(svg_node)-getPositionY(draw_div);
            node.setAttributeNS(null,x,positionX);
            node.setAttributeNS(null,y,positionY);
          };
        }

        function setUpListener( node, x1, y1, x2, y2 ){
          const cloneNode = node.cloneNode(true);
          const moveX1Y1 = moveListener( node, x1, y1 );
          const moveX2Y2 = moveListener( node, x2, y2 );

          svg_node.addEventListener( 'mousemove', moveX1Y1 );
          svg_node.appendChild( node );

          let clickListener1, clickListener2;
          clickListener1 = (evt) => {
            svg_node.removeEventListener( 'mousemove', moveX1Y1 );

            svg_node.addEventListener( 'mousemove', moveX2Y2 );
            svg_node.removeEventListener( 'click', clickListener1 );
            svg_node.addEventListener( 'click', clickListener2 );
          };
          clickListener2 = (evt) => {
            svg_node.removeEventListener( 'mousemove', moveX2Y2 );
            svg_node.removeEventListener( 'click', clickListener2 );
            setUpListener( cloneNode, x1, y1, x2, y2 );
          };
          svg_node.addEventListener( 'click', clickListener1 );

          node.addEventListener('dblclick', e => {
            svg_node.addEventListener( 'mousemove', moveX1Y1 );
            svg_node.addEventListener( 'click', clickListener1 );
          });

          editor_div.addEventListener('keydown', (e)=>{
            if (e.key === "Escape"){
              svg_node.removeEventListener( 'mousemove', moveX1Y1 );
              svg_node.removeEventListener( 'mousemove', moveX2Y2 );
              svg_node.removeEventListener( 'click', clickListener1 );
              svg_node.removeEventListener( 'click', clickListener2 );
              svg_node.removeChild( node );
            }
          });
        }

        /**
         * the same toolbar click listener for all tools
         * @param e
         * @returns {Promise<void>}
         */
        async function toolbarClickListener(e) {
          const command = this.dataset["command"].toLowerCase();
          switch (command) {

            case 'line':
              const newLine = new SvgPath({
                x1: 10,
                y1: 10,
                x2: 110,
                y2: 110,
                stroke: self.color,
                'stroke-width': 3
              }, 'line');
              setUpListener( newLine, 'x1', 'y1', 'x2', 'y2' );
              break;

            case 'text':
              const newSVGText = new SvgText({
                x: 250,
                y: 100,
                fill: self.color
              }, prompt('Enter text', 'your text here') );
              setUpListener( newSVGText, 'x', 'y', 'textLength' );
              break;
            case 'html':
              const newDiv = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'div' );
              newDiv.contentEditable = "true";
              // newDiv.setAttribute("contenteditable", "true");
              newDiv.style = "border: thin solid black; background-color: lightgrey; width: 320px; height: 120px; resize: both;";
              newDiv.addEventListener('mousedown',(e)=> {
                e.stopPropagation();
              });
              const newHTML = new ForeignObject({
                x: 200,
                y: 100,
                width: 320,
                height: 120,
                fill: self.color
              }, newDiv );
              newHTML.style = "width: 320px; height: 120px; resize: both;";
              setUpListener( newHTML, 'x', 'y', 'width', 'height' );
              break;
            case 'rect':
              const newRectangle = new SvgPath({
                x: 250,
                y: 100,
                width: 30,
                height: 20,
                fill: self.color
              }, 'rect');
              setUpListener( newRectangle, 'x', 'y', 'width', 'height' );
              break;
            case 'circle':
              const newCircle = new SvgPath({
                cx: 250,
                cy: 100,
                r: 30,
                fill: self.color
              }, 'circle');
              setUpListener( newCircle, 'cx', 'cy', 'r' );
              break;
            case 'undo':
              if ( ! undoStack.length ) break;
              const oldSVGPath_or_fun = undoStack.pop();
              if ( typeof oldSVGPath_or_fun === 'function' ){
                oldSVGPath_or_fun();
              } else {
                redoStack.push( oldSVGPath_or_fun );
                svg_node.removeChild( oldSVGPath_or_fun );
              }
              break;
            case 'redo':
              if ( ! redoStack.length ) break;
              const newSVGPath_or_fun = redoStack.pop();
              if ( typeof newSVGPath_or_fun === 'function' ){
                newSVGPath_or_fun();
              } else {
                undoStack.push( newSVGPath_or_fun );
                svg_node.appendChild( newSVGPath_or_fun );
              }
              break;
            case "save_image":
              svg_node.setAttribute("xmlns", "http://www.w3.org/2000/svg");
              const svgData = svg_node.outerHTML;
              const svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
              const svgUrl = URL.createObjectURL(svgBlob);
              const save_btn = this;
              save_btn.href = svgUrl;
              save_btn.download = "san.svg";
              break;
            case "clear_image":
              while(svg_node.children.length>0) {
                svg_node.removeChild(svg_node.firstChild);
              }
              undoStack.length = 0;
              redoStack.length = 0;
              break;
            case "embed":
              const embed_code = prompt('Enter embed code here: ', 'html_embed_code');
              if ( embed_code && embed_code.length > 8 ) {
                insertEmbedCode( embed_code );
              }
              break;
            case "dms":
              const component_name = prompt('Enter component name here: ', 'clock');
              const dms_id = prompt('Enter DMS-ID here: ', '1544379440973X6301133529121039');
              if ( component_name && component_name.length > 1 && dms_id && dms_id.length > 8 ){
                const config = await self.ccm.get({ name: component_name, url: "https://ccm2.inf.h-brs.de" }, dms_id );
                await insertComponent({ component: component_name, config });
                editor_div.dispatchEvent(new Event('keyup', { 'bubbles': true }));
              }
              break;
            case "plus":
              const buttonName = prompt('Enter button name: ', 'my_special_listener');
              const actionAddress = prompt('Enter HTTPS address of Button Action: ',
                'https://ccmjs.github.io/mkaul-components/content_editor/resources/extensions.js');
              const new_button = $.html( self.html.plus, { buttonName, actionAddress } );
              new_button.addEventListener('click', ev => {
                extensionListener( { command: buttonName, address: actionAddress, event: ev, svg: svg_node, data: dataset } );
              });
              toolbar_div.appendChild( new_button ) ;
              break;
            default:
              if ( command.toLowerCase().startsWith('ccm-') ){ // ccm component

                const componentName = command.substr( 4 ).toLowerCase();
                const component = await getComponent( componentName );
                const index = component.index || $.getIndex( component ) || component;

                const foreignObject = new ForeignObject({
                  x: 250,
                  y: 100,
                  width: 240,
                  height: 120,
                  fill: self.color
                }, document.createElementNS( 'http://www.w3.org/1999/xhtml', 'ccm-' + index ) );

                setUpListener( foreignObject, 'x', 'y', 'width', 'height' );

                // avoid painting into foreign object:
                // foreignObject.addEventListener('mousedown' ,(e)=>{
                //   e.stopPropagation()
                // });

                undoStack.push(_=>{svg_node.removeChild( foreignObject )});

                // get config
                const config = component.config;
                config.root = foreignObject.firstChild;

                await insertComponent({ component, config });

              } else { // editor extensions via function calls remotely defined
                extensionListener({ command, event: e, svg: svg_node, data: dataset } );
              }
          }
        }

        /**
         * standard listener for change events
         * @param e
         * @returns {Promise<void>}
         */
        async function toolbarChangeListener(e){
          const command = this.dataset["command"].toLowerCase();
          switch (command) {
            case 'color':
              self.color = this.querySelector('input').value || '#000';
              break;
            case "select": // select ccm component from DMS
              const component = DMS_component_index[select.options[select.selectedIndex].value];
              await insertComponent({
                component,
                config: {}
              });
              break;
            default:
              debugger;
              extensionListener({ command, event: e, svg: svg_node, data: dataset } );
          }
        }

        /**
         * listeners for editor extensions
         * @param command
         * @param event
         * @param address HTTPS address of ES6 module to be imported
         * @param button this button which is pressed
         */
        async function extensionListener({ command, event, address, button }){
          // get listener from remote JavaScript or config or global namespace
          if ( address ){
            const action = await self.ccm.load({ url: address, type: 'module', import: command });
            action(event, button);
          } else {
            if ( self.extensions && self.extensions[ command ] && typeof self.extensions[ command ] === 'function' ){
              self.extensions[ command ](event, button)
            } else if ( self[ command ] && typeof self[ command ] === 'function' ){
              self[ command ](event, button)
            } else if ( window[ name ] && typeof window[ name ] === 'function' ){
              window[ name ](event, button)
            } else {
              debugger;
            }
          }
        }

        /**
         *
         * @param componentName
         * @returns {Promise<*>}
         */
        async function getComponent( componentName ){
          if ( self.component.name === componentName ) return self.component;
          const component =  dataset.components && dataset.components[ componentName ] || self[ componentName ] || DMS_component_index[ componentName ];

          if ( $.isComponent( component ) ) return component;

          const solvedComponent = await $.solveDependency( component );
          if ( $.isComponent( solvedComponent ) ){
            dataset.components[ componentName ] = solvedComponent;
            return solvedComponent;
          } else {
            debugger;
          }
        }

        /**
         *
         * @param component
         * @param config
         * @returns {Promise<void>}
         */
        async function insertComponent({ component, config }){

          let instance;

          // start component
          if ( typeof component === 'string' ){
            if ( component.startsWith('http') ){
              instance = await self.ccm.start( component, config );
            } else {
              component = await getComponent( component );
              if ( $.isComponent( component ) ){
                instance = await component.start( config );
              } else {
                instance = await self.ccm.start( component, config );
              }
            }
          } else {
            instance = await component.start( config );
          }

          if ( dataset.components && dataset.components[ instance.component.index ] ){
            // already registered as dependency.
            // compare configs and write differences into attributes
            const oldConfig = dataset.components[ instance.component.index ][2];
            const newConfig = JSON.parse(instance.config);
            const allDiffs = compareJSON( oldConfig, newConfig );
            for ( const [ name, diff ] of allDiffs ){
              config.root.setAttribute( name, diff );
            }
            if ( self.inline_block ) root.setAttribute( 'style', 'display: inline-block;' );
          } else { // not yet registered as dependency
            if ( ! dataset.components ) dataset.components = {};
            dataset.components[ instance.component.index ] = [ 'ccm.component',
              instance.component.url,
              JSON.parse(instance.config)
            ];
          }

          // TODO editor_div.dispatchEvent(new Event('keyup'));

          editor_div.focus();
        }

        /**
         * compare two objects and return the differences
         * @param {Object} oldJson
         * @param {Object} newJson
         * @return {Array} differences as array of key-value pairs
         */
        function compareJSON( oldJson, newJson ) {
          const result = [];
          collect( [], oldJson, newJson );
          return result;
          function collect( prefix, oldJson, newJson ){
            if ( oldJson && ! newJson ) return result.push([ dots(), null ]);
            if ( ! oldJson && newJson ) return result.push([ dots(), newJson ]);
            if ( oldJson == newJson ) return;
            // oldJson && newJson && oldJson != newJson
            if ( typeof newJson === 'object' ){
              if ( Array.isArray( newJson ) ){
                for ( let i = 0; i<newJson.length; i++ ){
                  collect( [ ...prefix, i ], oldJson[i], newJson[i] );
                }
              } else { // object is not an array
                for ( const key of [...new Set([...Object.keys( oldJson ), ...Object.keys( newJson )])] ){
                  collect( [ ...prefix, key ], oldJson[key], newJson[key] );
                }
              }
            } else  {
              result.push([ dots(), newJson ]);
            }
            function dots(){
              return prefix.reduce((a,b)=>{ if(a){ a += '.' + b } else {a=b} return a },null);
            }
          }
        }


        /**
         * insert embed code
         * @param embedCode
         * @returns {Promise<void>}
         */
        async function insertEmbedCode( embedCode ){
          if ( embedCode.toLowerCase().includes('ccm-') ){
            // extract ccm component and config and start component
            const regex = /(http[^("|')]+).*ccm-(\w+).*?(\w+\d+)["]/gi;
            const match = regex.exec( embedCode );
            const component_uri = match[1];
            const component_name = match[2];
            const dms_id = match[3];
            if ( component_name && component_name.length > 1 && dms_id && dms_id.length > 8 ){
              const config = await self.ccm.get({ name: component_name, url: "https://ccm2.inf.h-brs.de" }, dms_id );
              await insertComponent({ component: component_uri, config });
            }
          } else { // e.g. Youtube embed code
            const embed_div = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'div' );
            const foreignObject = new ForeignObject({
              x: 250,
              y: 100,
              width: 240,
              height: 120,
              fill: self.color
            }, embed_div );
            embed_div.innerHTML = embedCode;
          }
          embed_div.focus();
        }

      };

      /**
       * current state of this editor
       * @returns {Object} state of editor
       */
      this.getValue = () => {
        // clone dataset
        const result = $.clone( dataset );
        return result;
      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();