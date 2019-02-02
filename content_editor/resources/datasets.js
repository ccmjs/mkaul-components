
/**
 * @overview datasets for ccm component draw_svg
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 29.01.2019.
 */

ccm.files[ 'datasets.js' ] = {

  "void": {
    "key": "void",
    "inner": "Add text here"
  },

  "small": {
    "key": "small",
    "inner": {
      "components": {
        "clock-3-0-1-0": [
          "ccm.component",
          "https://ccmjs.github.io/mkaul-components/clock/versions/ccm.clock-3.0.1.js",
          {
            "width": "40px",
            "color": "#000000",
            "background": "#fff",
            "css": [
              "ccm.load",
              "https://ccmjs.github.io/mkaul-components/clock/resources/default.css"
            ],
            "lit_html": [
              "ccm.load",
              {
                "url": "https://ccmjs.github.io/mkaul-components/clock/resources/lit-html.js",
                "type": "module"
              }
            ]
          }
        ]
      },
      "indexMap": {
        "clock-3-0-1-1": "clock-3-0-1-0"
      },
      "inner": {
        "inner": [
          "Edit  ",
          {
            "tag": "ccm-clock-3-0-1-0",
            "style": "display: inline-block;",
            "inner": [
              {
                "id": "clock-3-0-1-1"
              }
            ]
          },
          " here with live Clock"
        ]
      },
      "position": 120
    }
  }

};
