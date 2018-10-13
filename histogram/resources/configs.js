
/**
 * @overview configs of ccm component plotly
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "demo": {
    key: "demo",

    data: {
      anton: 33,
      berta: 23,
      caesar: 18,
      dora: 50
    },

    html: {
      // size of SVG image
      main:  {
        tag: 'svg',
        width:"100",
        height:"100",
        inner: []
      }
    },

    styles: {
      "fill": "coral",
      "text": {
        "font-size": 8,
        "fill": "white"
      }
    }
  },

  "EU_US_CHN": {
    key: "EU_US_CHN",

    data: {
      "EU":  30,
      "US":  70,
      "CHN": 50
    },
    html: {
      // size of SVG image
      main:  {
        tag: 'svg',
        width:"100",
        height:"100",
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
        "font-size": 8
      }
    }
  }

};
