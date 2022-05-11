/**
 * @overview data-based resources for building a PDF viewer builder
 * @author André Kless <andre.kless@web.de> 2021-2022
 * @license The MIT License (MIT)
 */

/**
 * configuration for Digital Makerspace
 * @type {Object}
 */
export const dms = {

  html: {
    main: { id: "main",
      inner: { id: "plot"}
    }
  },

  data:
    [
      {
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 4, 8, 16]
      }
    ],

  layout: {},

  plotly_lib: [ 'ccm.load', 'https://cdn.plot.ly/plotly-latest.min.js'  ],

  css: [ 'ccm.load',  'https://kaul.inf.h-brs.de/ccmjs/mkaul-components/plotly/resources/default.css' ],

  "ignore": {
    "defaults": {

      html: {
        main: { id: "main",
          inner: { id: "plot"}
        }
      },

      data:
        [
          {
            x: [1, 2, 3, 4, 5],
            y: [1, 2, 4, 8, 16]
          }
        ],

      layout: {},

      plotly_lib: [ 'ccm.load', 'https://cdn.plot.ly/plotly-latest.min.js'  ],

      css: [ 'ccm.load',  'https://kaul.inf.h-brs.de/ccmjs/mkaul-components/plotly/resources/default.css' ],

    }
  }
}
