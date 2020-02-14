
/**
 * @overview configs of ccm component links
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT) Manfred Kaul <manfred.kaul@h-brs.de> 2020 on 13.02.2020.
 */

ccm.files[ 'configs.js' ] = {
  "local": {
    key: "local",
    data: {
      "store": [ "ccm.store", '../resources/datasets.js' ],
      "key": "demo"
    }
  },
  "demo": {
    key: "demo",
    data: {
      "store": [ "ccm.store", 'https://ccmjs.github.io/mkaul-components/links/resources/datasets.js' ],
      "key": "demo"
    }
  }
};
