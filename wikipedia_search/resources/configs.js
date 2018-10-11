/**
 * @overview configurations of ccm component
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",
    html: {
      main: {
        inner: [
          { tag: 'input', id: 'input', placeholder: 'search term' },
          { id: 'results' }
        ]
      }
    }
  }
};