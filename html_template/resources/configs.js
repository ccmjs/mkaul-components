
/**
 * @overview configs of ccm component html_template
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",
    x: "Hello World",
    y: "You",
    z: 3+4,
    inner: '<h1>${x} and ${y} and ${z} and ${this.fn(1+2)}</h1>'
  },
  "localhost": {
    key: "localhost",
    css: [ 'ccm.load',  '../html_template/resources/default.css' ]
  }
};
