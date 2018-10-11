/**
 * @overview configurations of ccm component
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",
    html: {
      main: {
        inner: [
          { tag: 'svg', id: 'view', xmlns: "http://www.w3.org/2000/svg",
            // viewport: "0 0 240 480",
            inner: [
              { tag: 'g', id: 'stage' },
              { tag: 'rect', id: "rect-repeat", x:"20", y: "284", width: 200, height: 20, fill: "white", display: "none" },
              { tag: "text", id: "text-repeat", x:"20", y: "300", "font-family": "Verdana", "font-size": "18", display: "none", "text-anchor": "right",
                inner: "Press Space!" }
            ]
          },
          { tag: 'p', id: "text-result", "font-family": "Verdana", "font-size": "18", style: "text-align: center; color: red; background-color: lightgrey;" },
          { tag: 'input',
            id: 'speed-slider',
            type: 'range',
            min: 1,
            max: 300,
            step: 1,
            value: 30
          },
          { tag: "span", id: "speed" },
          { tag: "button", id: "repeat", inner: "Repeat!" }
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
      input: 30,
      fall: 3,
      result: "text-result",
      repeat: "text-repeat",
      slider: "speed-slider",
      speed: "speed",
      button: "repeat"
    }
  }
};