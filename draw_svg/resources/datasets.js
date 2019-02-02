
/**
 * @overview datasets for ccm component draw_svg
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 29.01.2019.
 */

ccm.files[ 'datasets.js' ] = {

  "void": {
    "key": "void",
    "inner": {
      "tag": "svg",
      "id": "svg",
      "width": "100%",
      "height": "100%",
      "margin": 0,
      "padding": 0
    }
  },

  "small": {
    "key": "small",
    "inner": {
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
          "inner": "Choose free drawing button and press mouse to draw",
          "x": 70,
          "y": 80
        }
      ]
    }
  },

  "medium": {
    "key": "medium",
    "inner": {}
  }
};
