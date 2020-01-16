/**
 * @overview configs of ccm component excel
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT) Manfred Kaul <manfred.kaul@h-brs.de> 2020 on 16.01.2020.
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
      "store": [ "ccm.store", 'https://ccmjs.github.io/mkaul-components/excel/resources/datasets.js' ],
      "key": "demo"
    }
  },
  "database": {
    key: "database",
    data: {
      store: [ "ccm.store", { name: "excel", url: "https://ccm2.inf.h-brs.de", dataset: "demo" } ],
      key: "demo"
    }
  },
  "websockets": {
    key: "websockets",
    data: {
      store: [ "ccm.store", { name: "excel", url: "wss://ccm2.inf.h-brs.de", dataset: "demo" } ],
      key: "demo"
    }
  }
};
