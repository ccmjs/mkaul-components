/**
 * @overview configurations of ccm component
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    "key": "demo",
    data: "https://ccmjs.github.io/mkaul-components/d3_bar_chart/resources/sales.csv",

    data_dimensions: {
      x: 'salesperson',
      y: 'sales'
    },

    size: {
      width: 640,
      height: 320,
      margin: {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
      }
    }
  }
};
 
 
