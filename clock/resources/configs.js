/**
 * @overview configurations of ccm component
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "localhost": {
    html: {
      main: { class: 'main' }
    },
    width: "100px",
    lit_html: [ 'ccm.module', 'https://ccmjs.github.io/mkaul-components/lib/lit-html.js' ]
  }
};