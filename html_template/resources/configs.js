
/**
 * @overview configs of ccm component html_template
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",
    data: {
      x: "Hello World"
    },
    template: '<h1>${x}</h1>'
  },
  "localhost": {
    key: "localhost",
    css: [ 'ccm.load',  '../html_template/resources/default.css' ]
  }
};
