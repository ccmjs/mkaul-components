/**
 * @overview ccm component for connect4 game ("4 gewinnt")
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 * @version 2.0.0
 * @see full document version see https://developer.mozilla.org/de/docs/Web/SVG
 * @see http://www.treebuilder.de/svg/connect4.svg
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
    name: 'connect4',
    version: [2,0,0],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.6.7.min.js',

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      html: {
        main: {
          inner: [
            { tag: "h3", inner: "Vier gewinnt!" },
            { tag: "svg" } // html.main.inner[1]
          ]
        }
      },
      color: {
        human: "yellow",
        machine: "red",
        box: "blue",
        shadow: "darkblue"
      }
      // css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/connect4/resources/default.css' ],
      // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/connect4/resources/default.css' ],
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
       */
      this.init = async () => {

        //  Is config given via LightDOM (inner HTML of Custom Element)?
        //  Then use it with higher priority
         if ( this.inner && this.inner.innerHTML.trim() && this.inner.innerHTML.startsWith('{') ){

          // interprete LightDOM
          self.lightDOM = JSON.parse( self.inner.innerHTML );

          // merge into config
          Object.assign( self, self.lightDOM );

        }

      };

      /**
       * is called once after the initialization and is then deleted
       */
      this.ready = async () => {


        // set shortcut to help functions
        $ = self.ccm.helper;

      };

      /**
       * starts the instance
       */
      this.start = async () => {

        // has logger instance? => log 'start' event
        if ( self.logger ) self.logger.log( 'start' );

        // svg nested inside the svg element of self.html.main
        const svg = `<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" preserveAspectRatio="xMidYMid meet" style="fill-rule:evenodd" viewBox="-20 -140 840 840" >
         <title>connect4::svg game::treebuilder</title>
         <desc>a simple example of ai in svg</desc>
         <defs>
        
         <path id="pfeil" d="M28 2l0 48 -25 0 45 49 46 -48 -25 -1 1 -48 -42 0zm0 24m-13 24m10 25m46 0m11 -24m-12 -25m-21 -24"/>
             <!-- the gameboard -->
          <path id="gb"  d="M57 0l644 0c31,0 57,27 57,59l0 519c0,32 -26,58 -57,58l-644 0c-32,0 -58,-26 -58,-58l0 -519c0,-32 26,-59 58,-59zm107 13c26,0 47,21 47,46 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-25 21,-46 47,-46zm105 -1c26,0 47,21 47,47 0,25 -21,47 -47,47 -26,0 -47,-22 -47,-47 0,-26 21,-47 47,-47zm105 0c26,0 47,21 47,47 0,25 -21,47 -47,47 -26,0 -47,-22 -47,-47 0,-26 21,-47 47,-47zm104 0c25,0 47,21 47,47 0,25 -22,47 -47,47 -26,0 -47,-22 -47,-47 0,-26 21,-47 47,-47zm104 0c26,0 47,21 47,47 0,25 -21,47 -47,47 -26,0 -47,-22 -47,-47 0,-26 21,-47 47,-47zm106 -1c26,0 47,21 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-26 21,-47 47,-47zm-627 105c26,0 47,21 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-26 21,-47 47,-47zm105 0c25,0 47,21 47,47 0,26 -22,47 -47,47 -26,0 -47,-21 -47,-47 0,-26 21,-47 47,-47zm105 -1c26,0 47,21 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-26 21,-47 47,-47zm105 0c26,0 47,21 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-26 21,-47 47,-47zm103 0c26,0 47,21 47,47 0,26 -21,47 -47,47 -25,0 -47,-21 -47,-47 0,-26 22,-47 47,-47zm105 0c26,0 47,21 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-26 21,-47 47,-47zm106 -1c25,0 46,22 46,47 0,26 -21,47 -46,47 -26,0 -47,-21 -47,-47 0,-25 21,-47 47,-47zm-631 106c26,0 47,21 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-26 21,-47 47,-47zm105 0c26,0 47,21 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-26 21,-47 47,-47zm105 -1c26,0 47,21 47,47 0,26 -21,47 -47,47 -25,0 -47,-21 -47,-47 0,-26 22,-47 47,-47zm105 0c26,0 47,21 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-26 21,-47 47,-47zm104 0c26,0 47,21 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-26 21,-47 47,-47zm104 0c26,0 47,21 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-26 21,-47 47,-47zm106 -1c26,0 47,21 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-26 21,-47 47,-47zm-629 107c26,0 47,22 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-25 21,-47 47,-47zm105 0c26,0 47,22 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-25 21,-47 47,-47zm105 0c26,0 47,21 47,46 0,26 -21,47 -47,47 -25,0 -47,-21 -47,-47 0,-25 22,-46 47,-46zm105 0c26,0 47,21 47,46 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-25 21,-46 47,-46zm104 0c26,0 47,21 47,46 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-25 21,-46 47,-46zm104 0c26,0 47,21 47,46 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-25 21,-46 47,-46zm106 -1c26,0 47,21 47,47 0,25 -21,47 -47,47 -26,0 -47,-22 -47,-47 0,-26 21,-47 47,-47zm-629 104c26,0 47,21 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-26 21,-47 47,-47zm105 0c26,0 47,21 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-26 21,-47 47,-47zm105 -1c26,0 47,21 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-26 21,-47 47,-47zm105 0c26,0 47,21 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-26 21,-47 47,-47zm104 0c25,0 47,21 47,47 0,26 -22,47 -47,47 -26,0 -47,-21 -47,-47 0,-26 21,-47 47,-47zm104 0c26,0 47,21 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-26 21,-47 47,-47zm106 -1c26,0 47,21 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-26 21,-47 47,-47zm-629 102c26,0 47,21 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-26 21,-47 47,-47zm105 0c26,0 47,21 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-26 21,-47 47,-47zm105 -1c26,0 47,22 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-25 21,-47 47,-47zm105 0c26,0 47,22 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-25 21,-47 47,-47zm104 0c26,0 47,22 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-25 21,-47 47,-47zm104 0c26,0 47,22 47,47 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-25 21,-47 47,-47zm106 0c26,0 47,21 47,46 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-25 21,-46 47,-46zm-629 -514c26,0 47,21 47,46 0,26 -21,47 -47,47 -26,0 -47,-21 -47,-47 0,-25 21,-46 47,-46z"/>
        
          <symbol viewBox="0 0 128 128" id="bluestone">
          <circle fill="${self.color.human}" cx="64" cy="64" r="64"/>
        </symbol>
          <symbol viewBox="0 0 128 128" id="redstone">
          <circle fill="${self.color.machine}" cx="64" cy="64" r="64"/>
        </symbol>
          <symbol viewBox="0 0 128 128" id="shadowstone">
          <circle fill="black" cx="64" cy="64" r="64" fill-opacity="0.5"/>
        </symbol>
        
        </defs>
        
        <g  transform="translate(20 7)" fill-opacity="0.5">
        <use xlink:href="#gb" x="10" y="0" fill="black"/>
        </g>
        
        <g  transform="translate(9 -7)">
        <use xlink:href="#gb" x="10" y="0" fill="${self.color.shadow}"/>
        </g>
        
        <g id="swCurrent">
        <use xlink:href="#pfeil" x="20" y="-110" fill="black" fill-opacity="0.5"/>
        <use xlink:href="#pfeil" x="10" y="-120" fill="black" stroke="red"/>
        <use id="shadow" xlink:href="#shadowstone" x="20" y="-245" width="100" height="100"/>
        <use id="currentStone" xlink:href="#bluestone" x="10" y="-250" width="100" height="100"/>
        </g>
        
        <g id="sCurrent" visibility="hidden">
        <use id="shadow" xlink:href="#shadowstone" x="20" y="-245" width="100" height="100"/>
        <use id="playedStone" xlink:href="#bluestone" x="10" y="-250" width="100" height="100"/>
        </g>
        
        <g id="board">
        
        </g>
        <use xlink:href="#gb" x="10" y="0" fill="${self.color.box}"/>
        
        <g fill-opacity="0">
        <rect id="r1" x="10" y="-200" width="105" height="835" />
        <rect id="r2" x="115" y="-200" width="105" height="835" />
        <rect id="r3" x="220" y="-200" width="105" height="835" />
        <rect id="r4" x="325" y="-200" width="105" height="835" />
        <rect id="r5" x="430" y="-200" width="105" height="835" />
        <rect id="r6" x="535" y="-200" width="105" height="835" />
        <rect id="r7" x="640" y="-200" width="105" height="835" />
        </g>
        <g id="countW" visibility="hidden"  >
        <rect x="-25" y="-250" width="800" height="1000" fill-opacity="0"/>
        <text x="100" y="700" font-size="50" fill="red">please wait</text>
        </g>
        <g id="gow" visibility="hidden"  >
        <rect id="r8" x="-25" y="-250" width="850" height="1000" fill-opacity="0"/>
        
        <text stroke-opacity="0.5" pointer-events="none" x="435" y="360" font-size="95" fill="black" stroke="black" stroke-width="50" text-anchor="middle">gAmE oVeR</text>
        
          <text pointer-events="none" x="425" y="350" font-size="115" fill="red" stroke="red" stroke-width="50" text-anchor="middle">gAmE oVeR</text>
          <text pointer-events="none" x="425" y="350" font-size="115" fill="green" stroke="green" stroke-width="40" text-anchor="middle">gAmE oVeR</text>
          <text pointer-events="none" x="425" y="350" font-size="115"  fill="${self.color.box}" stroke="${self.color.box}" stroke-width="30"  text-anchor="middle">gAmE oVeR</text>
          <text pointer-events="none" x="425" y="350" font-size="115"  fill="red" stroke="red" stroke-width="20"  text-anchor="middle">gAmE oVeR</text>
          <text pointer-events="none" x="425" y="350" font-size="115"  fill="green" stroke="green" stroke-width="10"  text-anchor="middle">gAmE oVeR</text>
        
          <text pointer-events="none" x="425" y="350" font-size="115" fill="${self.color.box}" text-anchor="middle">gAmE oVeR</text>
          <text id="wintext" pointer-events="none" x="425" y="700" font-size="55" fill="black" text-anchor="middle">draw ! score: 0/0</text>
        
           </g>
        </svg>`;

        // prepare main HTML structure
        self.html.main.inner[1].inner = svg;
        const main_elem = $.html( self.html.main );

        // select inner containers
        const r1 = main_elem.querySelector('#r1');
        r1.addEventListener("mouseover", e => setSWCurrent(0) );
        r1.addEventListener("mousedown", e => startAnimMove(1) );
        const r2 = main_elem.querySelector('#r2');
        r2.addEventListener("mouseover", e => setSWCurrent(105) );
        r2.addEventListener("mousedown", e => startAnimMove(2) );
        const r3 = main_elem.querySelector('#r3');
        r3.addEventListener("mouseover", e => setSWCurrent(210) );
        r3.addEventListener("mousedown", e => startAnimMove(3) );
        const r4 = main_elem.querySelector('#r4');
        r4.addEventListener("mouseover", e => setSWCurrent(315) );
        r4.addEventListener("mousedown", e => startAnimMove(4) );
        const r5 = main_elem.querySelector('#r5');
        r5.addEventListener("mouseover", e => setSWCurrent(420) );
        r5.addEventListener("mousedown", e => startAnimMove(5) );
        const r6 = main_elem.querySelector('#r6');
        r6.addEventListener("mouseover", e => setSWCurrent(525) );
        r6.addEventListener("mousedown", e => startAnimMove(6) );
        const r7 = main_elem.querySelector('#r7');
        r7.addEventListener("mouseover", e => setSWCurrent(630) );
        r7.addEventListener("mousedown", e => startAnimMove(7) );

        const r8 = main_elem.querySelector('#r8');
        r8.addEventListener("click", newGame );

        const xlinkns = "http://www.w3.org/1999/xlink"
        let player = "hum"
        let gs = "play"
        let cbScore = -10000
        let cbBest = -10000
        let cbBestMove = -1
        let comp = 0
        let compw = 0
        let compb = 0
        let hum = 0
        let humw = 0
        let humb = 0
        let gameboard = new Array(42)
        let tscore = new Array(0, 3, 4, 5, 7, 5, 4, 3
          , 4, 5, 8, 10, 8, 5, 4
          , 5, 8, 11, 13, 11, 8, 5
          , 5, 8, 11, 13, 11, 8, 5
          , 4, 5, 8, 10, 8, 5, 4
          , 3, 4, 5, 7, 5, 4, 3
        )
        let movetable = new Array(0, 36, 37, 38, 39, 40, 41, 42)
        let moveind = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0)
        let stm = 1
        let rc = 0
        let nc = 0
        let falling
        let fy1 = -250
        let fy2 = -250
        let strength = 4

        function setStrength(nr) {
          main_elem.querySelector("#btnbg" + strength).setAttributeNS("http://www.w3.org/1999/xlink", "href", "#btnp1")
          main_elem.querySelector("#btnbg" + nr).setAttributeNS("http://www.w3.org/1999/xlink", "href", "#btnp3")
          strength = nr
        }

        function newGame() {
          gameboard = new Array(42)
          cbScore = -10000
          cbBestMove = -1
          stm = 1
          player = "hum"
          gs = "play"
          movetable = new Array(0, 36, 37, 38, 39, 40, 41, 42)
          moveind = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0)
          rc = 0
          nc = 0

          const b = main_elem.querySelector("#board")
          const n = document.createElementNS("http://www.w3.org/2000/svg", "g")
          n.setAttribute("id", "board")
          b.parentNode.replaceChild(n, b)
          main_elem.querySelector("#currentStone").setAttributeNS(xlinkns, "href", "#bluestone")
          main_elem.querySelector("#gow").setAttribute("visibility", "hidden")
        }

        function gonow() {
          player = "comp"
          main_elem.querySelector("#countW").setAttribute("visibility", "visible")
          startrootLoop()
        }

        function setSWCurrent(nr) {
          main_elem.querySelector("#swCurrent").setAttribute("transform", "translate(" + nr + " 0)")

        }

        function startAnimMove(nr) {

          if (moveind[nr] < 6) {
            if (gs == "play") {
              if (player == "hum") {player = "comp"} else {player = "hum"}
              main_elem.querySelector("#sCurrent").setAttribute("transform", "translate(" + ((nr - 1) * 105) + ",0)")
              if (stm == 1) {
                main_elem.querySelector("#currentStone").setAttributeNS(xlinkns, "href", "#redstone")
                main_elem.querySelector("#playedStone").setAttributeNS(xlinkns, "href", "#bluestone")
              } else {
                main_elem.querySelector("#currentStone").setAttributeNS(xlinkns, "href", "#bluestone")
                main_elem.querySelector("#playedStone").setAttributeNS(xlinkns, "href", "#redstone")
              }
              let fa = main_elem.querySelector("#playedStone")

              let ol = fa.cloneNode(true)

              ol.setAttribute("x", (nr - 1) * 104 + 21)

              ol.setAttribute("id", "feld" + movetable[nr])
              falling = ol
              fy1 = -250
              fy2 = 519 - moveind[nr] * 102
              main_elem.querySelector("#board").appendChild(ol)
              main_elem.querySelector("#countW").setAttribute("visibility", "visible")
              domove(nr)
              window.setTimeout(fallDown, 10)

              if (won(1) == 1) {

                main_elem.querySelector("#gow").setAttribute("visibility", "visible");
                gs = "won";
                if (player == "hum") {
                  comp++
                  main_elem.querySelector("#wintext").firstChild.data = "computer wins ! score:" + comp + "/" + hum
                } else {
                  hum++
                  main_elem.querySelector("#wintext").firstChild.data = "you won ! score:" + comp + "/" + hum
                }
              }
              if (won(-1) == 1) {

                main_elem.querySelector("#gow").setAttribute("visibility", "visible");
                gs = "won";
                if (player == "hum") {
                  comp++
                  main_elem.querySelector("#wintext").firstChild.data = "computer wins ! score:" + comp + "/" + hum
                } else {
                  hum++
                  main_elem.querySelector("#wintext").firstChild.data = "you won ! score:" + comp + "/" + hum
                }
              }


              if (won(-1) == 0) {

                main_elem.querySelector("#gow").setAttribute("visibility", "visible");
                gs = "won";
                if (player == "hum") {
                  comp += 0.5
                  hum += 0.5
                  main_elem.querySelector("#wintext").firstChild.data = "draw ! score:" + comp + "/" + hum
                } else {
                  comp += 0.5
                  hum += 0.5
                  main_elem.querySelector("#wintext").firstChild.data = "draw ! score:" + comp + "/" + hum
                }
              }


            }
          }

        }

        function fallDown() {
          if (fy1 < fy2) {
            fy1 = fy1 + 97
            falling.setAttribute("y", fy1)
            window.setTimeout(fallDown, 100)
          } else {
            falling.setAttribute("y", fy2)
            startrootLoop()
          }
        }


        function domove(move) {
          gameboard[movetable[move]] = stm
          movetable[move] -= 7
          moveind[move]++
          stm = -stm
        }

        function undomove(move) {
          movetable[move] += 7
          gameboard[movetable[move]] = 0
          moveind[move]--
          stm = -stm
        }

        function startrootLoop() {
          if (player == "comp") {
            if (gs == "play") {

              cbBest = -10000

              setSWCurrent(0)

              window.setTimeout(rootLoop, 10)
            }

          } else {main_elem.querySelector("#countW").setAttribute("visibility", "hidden")}
        }


        function rootLoop() {

          //setbest to -10000
          let beta = -10000
          let alpha = -beta
          rc++
          let m = rc
          setSWCurrent(rc * 105)
          if (moveind[m] < 6) {
            cbScore = -AlphaBeta(m, beta, alpha, strength)
            //alert(cbScore+"/"+rc+"/"+cbBest)
            if (cbScore > cbBest) {
              cbBest = cbScore;
              cbBestMove = rc
            }
          }

          if (rc < 7) {window.setTimeout(rootLoop, 100)} else {

            let rn = cbBestMove
            setSWCurrent((rn - 1) * 105)
            startAnimMove(rn)

            rc = 0
          }
        }

        function gtScore() {
          let bs = 0
          let rs = 0
          for (let i = 1; i <= 42; i++) {
            if (gameboard[i] == 1) {bs += tscore[i]}
            if (gameboard[i] == -1) {rs += tscore[i]}
          }
          if (stm == -1) {return bs - rs}
          if (stm == 1) {return rs - bs}
        }

        function AlphaBeta(mov, alpha, beta, d) {
          let i = 0
          let fm = 0
          let score = -10000
          nc++;
          domove(mov)
          let w = won(-stm)
          if (w >= 0) {
            undomove(mov);
            return -((1000 * w) + d)
          }
          if (d <= 0) {
            undomove(mov);
            return gtScore()
          }
          for (let i = 1; i <= 7; i++) {
            if (moveind[i] < 6) {
              score = Max(score, -AlphaBeta(i, -beta, -Max(alpha, score), d - 1))
              if (score >= beta) {
                undomove(mov);
                return score
              }
            }
          }
          undomove(mov)
          return score
        }

        function Max(a, b) {
          if (a > b) {return a}
          return b
        }


        function won(lstm) {
          if (gameboard[39] == lstm) {if (gameboard[40] == lstm) {if (gameboard[41] == lstm) {if (gameboard[42] == lstm) {return 1;}}}}
          if (gameboard[38] == lstm) {if (gameboard[39] == lstm) {if (gameboard[40] == lstm) {if (gameboard[41] == lstm) {return 1;}}}}
          if (gameboard[37] == lstm) {if (gameboard[38] == lstm) {if (gameboard[39] == lstm) {if (gameboard[40] == lstm) {return 1;}}}}
          if (gameboard[36] == lstm) {if (gameboard[37] == lstm) {if (gameboard[38] == lstm) {if (gameboard[39] == lstm) {return 1;}}}}

          if (gameboard[29] == lstm) {if (gameboard[30] == lstm) {if (gameboard[31] == lstm) {if (gameboard[32] == lstm) {return 1}}}}
          if (gameboard[30] == lstm) {if (gameboard[31] == lstm) {if (gameboard[32] == lstm) {if (gameboard[33] == lstm) {return 1}}}}
          if (gameboard[31] == lstm) {if (gameboard[32] == lstm) {if (gameboard[33] == lstm) {if (gameboard[34] == lstm) {return 1}}}}
          if (gameboard[32] == lstm) {if (gameboard[33] == lstm) {if (gameboard[34] == lstm) {if (gameboard[35] == lstm) {return 1}}}}

          if (gameboard[22] == lstm) {if (gameboard[23] == lstm) {if (gameboard[24] == lstm) {if (gameboard[25] == lstm) {return 1}}}}
          if (gameboard[23] == lstm) {if (gameboard[24] == lstm) {if (gameboard[25] == lstm) {if (gameboard[26] == lstm) {return 1}}}}
          if (gameboard[24] == lstm) {if (gameboard[25] == lstm) {if (gameboard[26] == lstm) {if (gameboard[27] == lstm) {return 1}}}}
          if (gameboard[25] == lstm) {if (gameboard[26] == lstm) {if (gameboard[27] == lstm) {if (gameboard[28] == lstm) {return 1}}}}

          if (gameboard[15] == lstm) {if (gameboard[16] == lstm) {if (gameboard[17] == lstm) {if (gameboard[18] == lstm) {return 1}}}}
          if (gameboard[16] == lstm) {if (gameboard[17] == lstm) {if (gameboard[18] == lstm) {if (gameboard[19] == lstm) {return 1}}}}
          if (gameboard[17] == lstm) {if (gameboard[18] == lstm) {if (gameboard[19] == lstm) {if (gameboard[20] == lstm) {return 1}}}}
          if (gameboard[18] == lstm) {if (gameboard[19] == lstm) {if (gameboard[20] == lstm) {if (gameboard[21] == lstm) {return 1}}}}

          if (gameboard[8] == lstm) {if (gameboard[9] == lstm) {if (gameboard[10] == lstm) {if (gameboard[11] == lstm) {return 1}}}}
          if (gameboard[9] == lstm) {if (gameboard[10] == lstm) {if (gameboard[11] == lstm) {if (gameboard[12] == lstm) {return 1}}}}
          if (gameboard[10] == lstm) {if (gameboard[11] == lstm) {if (gameboard[12] == lstm) {if (gameboard[13] == lstm) {return 1}}}}
          if (gameboard[11] == lstm) {if (gameboard[12] == lstm) {if (gameboard[13] == lstm) {if (gameboard[14] == lstm) {return 1}}}}

          if (gameboard[1] == lstm) {if (gameboard[2] == lstm) {if (gameboard[3] == lstm) {if (gameboard[4] == lstm) {return 1}}}}
          if (gameboard[2] == lstm) {if (gameboard[3] == lstm) {if (gameboard[4] == lstm) {if (gameboard[5] == lstm) {return 1}}}}
          if (gameboard[3] == lstm) {if (gameboard[4] == lstm) {if (gameboard[5] == lstm) {if (gameboard[6] == lstm) {return 1}}}}
          if (gameboard[4] == lstm) {if (gameboard[5] == lstm) {if (gameboard[6] == lstm) {if (gameboard[7] == lstm) {return 1}}}}

          if (gameboard[1] == lstm) {if (gameboard[8] == lstm) {if (gameboard[15] == lstm) {if (gameboard[22] == lstm) {return 1}}}}
          if (gameboard[8] == lstm) {if (gameboard[15] == lstm) {if (gameboard[22] == lstm) {if (gameboard[29] == lstm) {return 1}}}}
          if (gameboard[15] == lstm) {if (gameboard[22] == lstm) {if (gameboard[29] == lstm) {if (gameboard[36] == lstm) {return 1}}}}

          if (gameboard[2] == lstm) {if (gameboard[9] == lstm) {if (gameboard[16] == lstm) {if (gameboard[23] == lstm) {return 1}}}}
          if (gameboard[9] == lstm) {if (gameboard[16] == lstm) {if (gameboard[23] == lstm) {if (gameboard[30] == lstm) {return 1}}}}
          if (gameboard[16] == lstm) {if (gameboard[23] == lstm) {if (gameboard[30] == lstm) {if (gameboard[37] == lstm) {return 1}}}}

          if (gameboard[3] == lstm) {if (gameboard[10] == lstm) {if (gameboard[17] == lstm) {if (gameboard[24] == lstm) {return 1}}}}
          if (gameboard[10] == lstm) {if (gameboard[17] == lstm) {if (gameboard[24] == lstm) {if (gameboard[31] == lstm) {return 1}}}}
          if (gameboard[17] == lstm) {if (gameboard[24] == lstm) {if (gameboard[31] == lstm) {if (gameboard[38] == lstm) {return 1}}}}

          if (gameboard[4] == lstm) {if (gameboard[11] == lstm) {if (gameboard[18] == lstm) {if (gameboard[25] == lstm) {return 1}}}}
          if (gameboard[11] == lstm) {if (gameboard[18] == lstm) {if (gameboard[25] == lstm) {if (gameboard[32] == lstm) {return 1}}}}
          if (gameboard[18] == lstm) {if (gameboard[25] == lstm) {if (gameboard[32] == lstm) {if (gameboard[39] == lstm) {return 1}}}}

          if (gameboard[5] == lstm) {if (gameboard[12] == lstm) {if (gameboard[19] == lstm) {if (gameboard[26] == lstm) {return 1}}}}
          if (gameboard[12] == lstm) {if (gameboard[19] == lstm) {if (gameboard[26] == lstm) {if (gameboard[33] == lstm) {return 1}}}}
          if (gameboard[19] == lstm) {if (gameboard[26] == lstm) {if (gameboard[33] == lstm) {if (gameboard[40] == lstm) {return 1}}}}

          if (gameboard[6] == lstm) {if (gameboard[13] == lstm) {if (gameboard[20] == lstm) {if (gameboard[27] == lstm) {return 1}}}}
          if (gameboard[13] == lstm) {if (gameboard[20] == lstm) {if (gameboard[27] == lstm) {if (gameboard[34] == lstm) {return 1}}}}
          if (gameboard[20] == lstm) {if (gameboard[27] == lstm) {if (gameboard[34] == lstm) {if (gameboard[41] == lstm) {return 1}}}}

          if (gameboard[7] == lstm) {if (gameboard[14] == lstm) {if (gameboard[21] == lstm) {if (gameboard[28] == lstm) {return 1}}}}
          if (gameboard[14] == lstm) {if (gameboard[21] == lstm) {if (gameboard[28] == lstm) {if (gameboard[35] == lstm) {return 1}}}}
          if (gameboard[21] == lstm) {if (gameboard[28] == lstm) {if (gameboard[35] == lstm) {if (gameboard[42] == lstm) {return 1}}}}

          if (gameboard[15] == lstm) {if (gameboard[23] == lstm) {if (gameboard[31] == lstm) {if (gameboard[39] == lstm) {return 1}}}}

          if (gameboard[8] == lstm) {if (gameboard[16] == lstm) {if (gameboard[24] == lstm) {if (gameboard[32] == lstm) {return 1}}}}
          if (gameboard[16] == lstm) {if (gameboard[24] == lstm) {if (gameboard[32] == lstm) {if (gameboard[40] == lstm) {return 1}}}}

          if (gameboard[1] == lstm) {if (gameboard[9] == lstm) {if (gameboard[17] == lstm) {if (gameboard[25] == lstm) {return 1}}}}
          if (gameboard[9] == lstm) {if (gameboard[17] == lstm) {if (gameboard[25] == lstm) {if (gameboard[33] == lstm) {return 1}}}}
          if (gameboard[17] == lstm) {if (gameboard[25] == lstm) {if (gameboard[33] == lstm) {if (gameboard[41] == lstm) {return 1}}}}

          if (gameboard[2] == lstm) {if (gameboard[10] == lstm) {if (gameboard[18] == lstm) {if (gameboard[26] == lstm) {return 1}}}}
          if (gameboard[10] == lstm) {if (gameboard[18] == lstm) {if (gameboard[26] == lstm) {if (gameboard[34] == lstm) {return 1}}}}
          if (gameboard[18] == lstm) {if (gameboard[26] == lstm) {if (gameboard[34] == lstm) {if (gameboard[42] == lstm) {return 1}}}}

          if (gameboard[3] == lstm) {if (gameboard[11] == lstm) {if (gameboard[19] == lstm) {if (gameboard[27] == lstm) {return 1}}}}
          if (gameboard[11] == lstm) {if (gameboard[19] == lstm) {if (gameboard[27] == lstm) {if (gameboard[35] == lstm) {return 1}}}}

          if (gameboard[4] == lstm) {if (gameboard[12] == lstm) {if (gameboard[20] == lstm) {if (gameboard[28] == lstm) {return 1}}}}


          if (gameboard[4] == lstm) {if (gameboard[10] == lstm) {if (gameboard[16] == lstm) {if (gameboard[22] == lstm) {return 1}}}}

          if (gameboard[5] == lstm) {if (gameboard[11] == lstm) {if (gameboard[17] == lstm) {if (gameboard[23] == lstm) {return 1}}}}
          if (gameboard[11] == lstm) {if (gameboard[17] == lstm) {if (gameboard[23] == lstm) {if (gameboard[29] == lstm) {return 1}}}}

          if (gameboard[6] == lstm) {if (gameboard[12] == lstm) {if (gameboard[18] == lstm) {if (gameboard[24] == lstm) {return 1}}}}
          if (gameboard[12] == lstm) {if (gameboard[18] == lstm) {if (gameboard[24] == lstm) {if (gameboard[30] == lstm) {return 1}}}}
          if (gameboard[18] == lstm) {if (gameboard[24] == lstm) {if (gameboard[30] == lstm) {if (gameboard[36] == lstm) {return 1}}}}

          if (gameboard[7] == lstm) {if (gameboard[13] == lstm) {if (gameboard[19] == lstm) {if (gameboard[25] == lstm) {return 1}}}}
          if (gameboard[13] == lstm) {if (gameboard[19] == lstm) {if (gameboard[25] == lstm) {if (gameboard[31] == lstm) {return 1}}}}
          if (gameboard[19] == lstm) {if (gameboard[25] == lstm) {if (gameboard[31] == lstm) {if (gameboard[37] == lstm) {return 1}}}}

          if (gameboard[14] == lstm) {if (gameboard[20] == lstm) {if (gameboard[26] == lstm) {if (gameboard[32] == lstm) {return 1}}}}
          if (gameboard[20] == lstm) {if (gameboard[26] == lstm) {if (gameboard[32] == lstm) {if (gameboard[38] == lstm) {return 1}}}}

          if (gameboard[21] == lstm) {if (gameboard[27] == lstm) {if (gameboard[33] == lstm) {if (gameboard[39] == lstm) {return 1}}}}
          for (let i = 1; i <= 7; i++) {
            if (moveind[i] < 6) {return -1}
          }
          return 0
        }

        // set content of own website area
        $.setContent( self.element, main_elem );

      };

    }

  };

  function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"===typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}