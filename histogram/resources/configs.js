
/**
 * @overview configs of ccm component plotly
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "demo": {
    key: "demo",

    data: {
      anton: 30,
      berta: 230,
      caesar: 100,
      dora: 290
    },

    html: {
      // size of SVG image
      main:  {
        tag: 'svg',
        width:"300",
        height:"300",
        inner: []
      }
    },

    styles: {
      "fill": "coral",
      "text": {
        "font-size": 16,
        "fill": "white"
      }
    }
  },

  "EU_US_CHN": {
    key: "EU_US_CHN",

    data: {
      "EU":  100,
      "US":  290,
      "CHN": 230
    },
    html: {
      // size of SVG image
      main:  {
        tag: 'svg',
        width:"300",
        height:"300",
        inner: []
      }
    },
    styles: {
      "EU": {
        fill: "orange",
        stroke: "red",
        "stroke-width": 3,
        "fill-opacity": 0.5
      },
      "US": {
        fill: "lime",
        stroke: "purple",
        "stroke-width": 3,
        "fill-opacity": 0.5
      },
      "CHN": {
        fill: "yellow",
        stroke: "orange",
        "stroke-width": 3,
        "fill-opacity": 0.5
      },
      "text": {
        "font-family": "Verdana",
        "font-size": 18
      }
    }
  }

};
