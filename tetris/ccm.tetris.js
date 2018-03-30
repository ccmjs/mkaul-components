/**
 * @overview ccm component for tetris
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @see https://gist.github.com/bellbind/4131828
 * TODO: docu comments -> API
 * TODO: unit tests
 * TODO: builder component
 * TODO: i18n
 */

{

  var component  = {   // const not working in Safari

    /**
     * unique component name
     * @type {string}
     */
    name: 'tetris',
    
    /**
     * recommended used framework version
     * @type {string}
     */
    // ccm: 'https://akless.github.io/ccm/version/ccm-15.0.2.min.js',
    ccm: '//akless.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        main: {
          inner: [
            { tag: 'svg', id: 'view', xmlns: "http://www.w3.org/2000/svg",
              inner: [
                { tag: 'g', id: 'stage' }
              ]
            },
          ]
        }
      },
      opt: {
        svgid: "view",
        stageid: "stage",
        svgns: "http://www.w3.org/2000/svg",
        scale: 24,
        width: 10,
        height: 20,
        cursor: 50,
        input: 100,
        fall: 3,
      }
      // css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/tetris/resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/tetris/resources/default.css' ],
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
        self.logger && self.logger.log( 'start' );

        // set content of own website area
        $.setContent( self.element, $.html( self.html.main ) );

        // Hack in order to get SVG rendered inside the shadow root
        self.element.innerHTML += '';

        // === SVG root structure ===
        const svg = self.element.querySelector('#' + self.opt.svgid);
        const view = svg.querySelector('#' + self.opt.stageid);

        svg.setAttribute("width", self.opt.scale * self.opt.width);
        svg.setAttribute("height", self.opt.scale * self.opt.height);
        svg.style.backgroundColor = "grey";

        // shape of block
        const Shape = function Shape(name, color, form) {
          var max = form.length - 1;
          var angle1 = form.map(function (line, y) {
            return line.map(function (e, x) {
              return form[max - x][y];});});
          var angle2 = form.map(function (line, y) {
            return line.map(function (e, x) {
              return form[max - y][max - x];});});
          var angle3 = form.map(function (line, y) {
            return line.map(function (e, x) {
              return form[x][max - y];});});

          return Object.create(Shape.prototype, {
            name: {value: name, enumerable: true},
            color: {value: color, enumerable: true},
            angle0: {value: form, enumerable: true},
            angle1: {value: angle1, enumerable: true},
            angle2: {value: angle2, enumerable: true},
            angle3: {value: angle3, enumerable: true},
          });
        };
        Shape.prototype.rotated = function (angle) {
          switch (((angle % 4) + 4) % 4) {
            case 0: return this.angle0;
            case 1: return this.angle1;
            case 2: return this.angle2;
            case 3: return this.angle3;
          }
        };

        // moving block
        const Block = function Block(x, y, angle, shape) {
          return Object.create(Block.prototype, {
            x: {value: x, enumerable: true},
            y: {value: y, enumerable: true},
            angle: {value: angle, enumerable: true},
            shape: {value: shape, enumerable: true},
          });
        };
        Block.prototype.left = function () {
          return Block(this.x - 1, this.y, this.angle, this.shape);
        };
        Block.prototype.right = function () {
          return Block(this.x + 1, this.y, this.angle, this.shape);
        };
        Block.prototype.fall = function () {
          return Block(this.x, this.y + 1, this.angle, this.shape);
        };
        Block.prototype.rotate = function () {
          return Block(this.x, this.y, this.angle + 1, this.shape);
        };
        Block.prototype.ok = function (stage) {
          var form = this.shape.rotated(this.angle);
          for (var fy = 0; fy < form.length; fy++) {
            for (var fx = 0; fx < form[fy].length; fx++) {
              if (form[fy][fx] === 0) continue;
              var x = this.x + fx;
              var y = this.y + fy;
              if  (x < 0 || stage.width <= x || stage.height <= y ||
                (y >= 0 && stage.stones[y][x])) return false;
            }
          }
          return true;
        };
        Block.prototype.overflow = function () {
          var form = this.shape.rotated(this.angle);
          for (var fy = 0; fy < form.length; fy++) {
            for (var fx = 0; fx < form[fy].length; fx++) {
              if (form[fy][fx] === 0) continue;
              var y = this.y + fy;
              if (y < 0) return true;
            }
          }
          return false;
        };
        Block.prototype.put = function (stage) {
          // assert(this.ok(stage) && !this.overflow());
          var form = this.shape.rotated(this.angle);
          for (var fy = 0; fy < form.length; fy++) {
            for (var fx = 0; fx < form[fy].length; fx++) {
              if (form[fy][fx] === 0) continue;
              var x = this.x + fx;
              var y = this.y + fy;
              stage.stones[y][x] = this.shape.color;
            }
          }
        };
        Block.prototype.eachStone = function (callback) {
          var form = this.shape.rotated(this.angle);
          for (var fy = 0; fy < form.length; fy++) {
            for (var fx = 0; fx < form[fy].length; fx++) {
              if (form[fy][fx] === 0) continue;
              var x = this.x + fx;
              var y = this.y + fy;
              if (x >= 0 && y >= 0) callback(x, y, this.shape.color);
            }
          }
        };

        // game stage
        const Stage = function Stage(width, height) {
          var stones = [];
          for (var y = 0; y < height; y++) {
            var line = [];
            for (var x = 0; x < width; x++) {
              line.push(null);
            }
            stones.push(line);
          }
          return Object.create(Stage.prototype, {
            stones: {value: stones, enumerable: true},
            width: {value: width, enumerable: true},
            height: {value: height, enumerable: true},
          });
        };
        Stage.prototype.filledLines = function () {
          var lines = [];
          for (var y = 0; y < this.stones.length; y++) {
            if (this.stones[y].reduce(function (r, s) {
                return r && s !== null;}, true)) lines.push(y);
          }
          return lines;
        };
        Stage.prototype.shrink = function () {
          var shrinked = 0;
          for (var y = this.stones.length - 1; y >= 0; y--) {
            if (this.stones[y].reduce(function (r, s) {
                return r && s !== null;}, true)) {
              this.stones.splice(y, 1);
              shrinked++;
            }
          }
          for (var i = 0; i < shrinked; i++) {
            var line = [];
            for (var x = 0; x < this.width; x++) {
              line.push(null);
            }
            this.stones.unshift(line);
          }
        };
        Stage.prototype.reset = function () {
          for (var y = 0; y < this.stones.length; y++) {
            for (var x = 0; x < this.stones[y].length; x++) {
              this.stones[y][x] = null;
            }
          }
        };
        Stage.prototype.eachStone = function (callback) {
          for (var y = 0; y < this.stones.length; y++) {
            var line = this.stones[y];
            for (var x = 0; x <line.length; x++) {
              var color = line[x];
              if (color) callback(x, y, color);
            }
          }
        };

        const Tetris = {
          shapes: [
            Shape("I", "red",
              [[0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]]),
            Shape("J", "magenta",
              [[0, 1, 0],
                [0, 1, 0],
                [1, 1, 0]]),
            Shape("L", "yellow",
              [[0, 1, 0],
                [0, 1, 0],
                [0, 1, 1]]),
            Shape("T", "lightgrey",
              [[1, 1, 1],
                [0, 1, 0],
                [0, 0, 0]]),
            Shape("S", "blue",
              [[0, 1, 1],
                [1, 1, 0],
                [0, 0, 0]]),
            Shape("Z", "green",
              [[1, 1, 0],
                [0, 1, 1],
                [0, 0, 0]]),
            Shape("O", "cyan",
              [[1, 1],
                [1, 1]]),
          ],
          Shape: Shape,
          Block: Block,
          Stage: Stage,
        };

        const SVGCursor = function(svg, radius) {
          var g = document.createElementNS(self.opt.svgns, "g");
          g.className = "svgcursor";
          g.style.fillOpacity = "0.6";
          g.style.strokeOpacity = "0.6";

          var pane = document.createElementNS(self.opt.svgns, "circle");
          pane.className = "svgcursor-pane";
          pane.setAttribute("r", radius.toString());
          pane.style.fill = "lightgrey";
          pane.style.stroke = "black";
          g.appendChild(pane);

          var bar = document.createElementNS(self.opt.svgns, "line");
          bar.className = "svgcursor-bar";
          bar.style.stroke = "black";
          bar.style.strokeWidth = (radius / 10).toString();
          g.appendChild(bar);

          var head = document.createElementNS(self.opt.svgns, "circle");
          head.className = "svgcursor-head";
          head.setAttribute("r", (radius / 10).toString());
          head.style.fill = "grey";
          head.style.stroke = "black";
          g.appendChild(head);

          var getPoint = function (ev) {
            var point = svg.createSVGPoint();
            point.x = ev.clientX;
            point.y = ev.clientY;
            return point.matrixTransform(svg.getScreenCTM().inverse());
          };

          var setCenter = function (point) {
            pane.setAttribute("cx", point.x);
            pane.setAttribute("cy", point.y);
            bar.setAttribute("x1", point.x);
            bar.setAttribute("y1", point.y);
          };
          var setHead = function (point) {
            bar.setAttribute("x2", point.x);
            bar.setAttribute("y2", point.y);
            head.setAttribute("cx", point.x);
            head.setAttribute("cy", point.y);
          };

          var Move = function Move(x, y) {
            return Object.create(Move.prototype, {
              x: {value: x, enumerable: true},
              y: {value: y, enumerable: true},
            });
          };
          Object.defineProperties(Move.prototype, {
            length: {get: function () {
              return this.length = Math.sqrt(this.x * this.x + this.y * this.y);
            }, enumerable: true},
            angle: {get: function () {
              return this.angle = Math.atan2(this.y, this.x);
            }, enumerable: true},
            limited: {get: function () {
              var lx = this.length > 1 ? this.x / this.length : this.x;
              var ly = this.length > 1 ? this.y / this.length : this.y;
              return this.limited = {x: lx, y: ly};
            }, enumerable: true},
          });

          var center = null;
          var onStart = function (info) {
            center = getPoint(info);
            setCenter(center);
            setHead(center);
            svg.appendChild(g);
          };
          var onMove = function (info) {
            var point = getPoint(info);
            setHead(point);
            var x = (point.x - center.x) / radius;
            var y = (point.y - center.y) / radius;
            g.move = Move(x, y);
            var event = new CustomEvent("svgcursor", {detail: g.move});
            g.dispatchEvent(event);
          };
          var onEnd = function () {
            svg.removeChild(g);
            g.move = Move(0, 0);
            var event = new CustomEvent("svgcursor", {detail: g.move});
            g.dispatchEvent(event);
          };

          var identifiedTouch = function (ev) {
            for (var i = 0; i < ev.changedTouches.length; i++) {
              if (ev.changedTouches[i].identifier === touchId) {
                return touch = ev.changedTouches[i];
              }
            }
            return null;
          };
          var touchId = -1;

          var listeners = {
            mousedown: function (ev) {
              if (g.parentNode) return;
              onStart(ev);
              ev.preventDefault();
            },
            mousemove: function (ev) {
              if (!g.parentNode) return;
              onMove(ev);
              ev.preventDefault();
            },
            mouseup: function (ev) {
              if (!g.parentNode) return;
              onEnd();
              ev.preventDefault();
            },
            touchstart: function (ev) {
              if (g.parentNode) return;
              var touch = ev.changedTouches[0];
              touchId = touch.identifier;
              onStart(touch);
              ev.preventDefault();
            },
            touchmove: function (ev) {
              var touch = identifiedTouch(ev);
              if (!g.parentNode || !touch) return;
              onMove(touch);
              ev.preventDefault();
            },
            touchend: function (ev) {
              var touch = identifiedTouch(ev);
              if (!g.parentNode || !touch) return;
              touchId = -1;
              onEnd();
              ev.preventDefault();
            },
          };

          svg.addEventListener("mousedown", listeners.mousedown, false);
          svg.addEventListener("mousemove", listeners.mousemove, false);
          svg.addEventListener("mouseup", listeners.mouseup, false);
          document.addEventListener("touchstart", listeners.touchstart, false);
          document.addEventListener("touchmove", listeners.touchmove, false);
          document.addEventListener("touchend", listeners.touchend, false);

          g.dispose = function () {
            svg.removeEventListener("mousedown", listeners.mousedown, false);
            svg.removeEventListener("mousemove", listeners.mousemove, false);
            svg.removeEventListener("mouseup", listeners.mouseup, false);
            document.removeEventListener(
              "touchstart", listeners.touchstart, false);
            document.removeEventListener("touchmove", listeners.touchmove, false);
            document.removeEventListener("touchend", listeners.touchend, false);
          };
          g.move = Move(0, 0);

          return g;
        };


        const newBlock = function() {
          return Tetris.Block(
            0|(self.opt.width / 2) - 2, 0, 0,
            Tetris.shapes[0|(Math.random() * Tetris.shapes.length)]);
        };

        const render = function() {
          while (view.hasChildNodes()) view.removeChild(view.lastChild);
          stage.eachStone(function (x, y, color) {
            view.appendChild(stone(x, y, color));
          });
          block.eachStone(function (x, y, color) {
            view.appendChild(stone(x, y, color));
          });
        };

        const stone = function(x, y, color) {
          var rect = document.createElementNS(self.opt.svgns, "rect");
          rect.setAttribute("x", self.opt.scale * x);
          rect.setAttribute("y", self.opt.scale * y);
          rect.setAttribute("width", self.opt.scale);
          rect.setAttribute("height", self.opt.scale);
          rect.setAttribute("fill", color);
          rect.setAttribute("stroke", "black");
          return rect;
        };

        const tryLeft = function() {
          var next = block.left();
          if (!next.ok(stage)) return;
          block = next;
          render();
        };

        const tryRight = function() {
          var next = block.right();
          if (!next.ok(stage)) return;
          block = next;
          render();
        };

        const tryRotate = function() {
          var next = block.rotate();
          if (!next.ok(stage)) return;
          block = next;
          render();
        };

        const tryFall = function() {
          var next = block.fall();
          if (next.ok(stage)) {
            block = next;
            return render();
          } else {
            block.put(stage);
            render();
            setTimeout(function () {
              stage.shrink();
              block = newBlock();
              if (!block.ok(stage)) {
                // gameover
                stage.reset();
              }
              render();
            }, 10);
          }
        };

        const keyHandler = function(event){
          switch (event.key){
            case "ArrowLeft":
              self.logger && self.logger.log( event.key );
              tryLeft();
              break;
            case "ArrowRight":
              self.logger && self.logger.log( event.key );
              tryRight();
              break;
            case "ArrowUp":
              self.logger && self.logger.log( event.key );
              tryRotate();
              break;
            case "ArrowDown":
              self.logger && self.logger.log( event.key );
              tryFall();
              break;
            case "Space":
              self.logger && self.logger.log( event.key );
              debugger;
              break;
            default:
              self.logger && self.logger.log( event.key );
              debugger;
          }
        };

        // SVG UI for Tetris
        var stage = Tetris.Stage(self.opt.width, self.opt.height);
        var block = newBlock();

        document.body.addEventListener("keydown", keyHandler, false);

        // start game
        render();
        var cursor = SVGCursor(svg, self.opt.cursor);
        var count = 0;
        var loop = window.setInterval(function () {
          count = (count + 1) % self.opt.fall;
          if (cursor.move.y < -0.5) tryRotate();
          if (cursor.move.x < -0.5) tryLeft();
          if (cursor.move.x > 0.5) tryRight();
          if (cursor.move.y > 0.5) tryFall();
          if (count === 0) tryFall();
        }, self.opt.input);

        if ( callback ) callback();
      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}