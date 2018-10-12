/**
 * @overview configurations of ccm component
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",
    dimensions: [ 'pünktlich', 'zuverlässig', 'kooperativ', 'erreichbar', 'effektiv', 'hilfsbereit', 'durchsetzungsstark' ],
    candidates: { // values between 0 and 100
      first:  [ 10, 20, 30, 40, 50, 60, 70 ],  // one value per dimension
      second: [ 70, 60, 50, 40, 30, 20, 10 ]
    },
    styles: {  // choose color here
      first: 'fill:orange;stroke:red;stroke-width:3;',
      second: 'fill:lime;stroke:purple;stroke-width:3;'
    },
    css_styles: {  // choose opacity here
      first: {
        "fill-opacity": 0.5
      },
      second: {
        "fill-opacity": 0.5
      }
    },
    css_classes: {
      radiant_text: {
        "font-family": "Verdana",
        "font-size": "10"
      }
    },

    radiant_text: 1, // add text after x data points; 1 = every

    html: {  // size of SVG image
      main:  {
        tag: 'svg',
        style: 'padding: 15px;',
        width:"230",
        height:"200",
        viewport: "0 0 200 200",
        // transform: "translate(10, 10)",
        inner: []
      }
    }
  }
};