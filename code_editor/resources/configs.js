
/**
 * @overview configs of ccm component code_editor
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",

    data: { // initial dataset must be an object
      inner: 'const x = 2; \\nconsole.log( x * x );'  // initial editor content
    }
  }
};
