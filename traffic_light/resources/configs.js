
/**
 * @overview configs of ccm component traffic_light
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT) mkaul2m on 05.05.2019.
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",
    next_label: "Next",
    html: {
      main: {
        inner: [
          { class: 'traffic_light', inner: '%traffic_light%' },
          { tag: 'button', class: 'next', inner: '%next_label%', onclick: '%onclick%' },
        ]
      },
      traffic_light: {
        tag: 'svg', viewBox: '0 0 200 500', xmlns: 'http://www.w3.org/2000/svg', width: '40', height: '100', inner: [
          {
            "tag": "rect",
            "style": "fill: rgb(100, 86, 86);",
            "width": "200",
            "height": "500",
            "rx": "30",
            "ry": "30"
          },
          {
            "tag": "circle",
            "id": "green",
            "style": "fill: rgb(77, 251, 3);",
            "cx": "98.65",
            "cy": "407.68",
            "r": "70.2"
          },
          {
            "tag": "circle",
            "id": "yellow",
            "style": "fill: rgb(239, 251, 3);",
            "cx": "98.78",
            "cy": "247.42",
            "r": "70.2"
          },
          {
            "tag": "circle",
            "id": "red",
            "style": "fill: rgb(251, 3, 3);",
            "cx": "99.55",
            "cy": "81.53",
            "r": "70.2"
          }
        ]
      }
    },

    // css: [ 'ccm.load',  'resources/default.css' ]
    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/traffic_light/resources/default.css' ]
  }
};
