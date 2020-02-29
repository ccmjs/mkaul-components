
/**
 * @overview configs of ccm component checkin
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT) Manfred Kaul <manfred.kaul@h-brs.de> 2020 on 28.02.2020.
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
      "store": [ "ccm.store", 'https://ccmjs.github.io/mkaul-components/checkin/resources/datasets.js' ],
      "key": "demo"
    }
  },
  /** configuration for multilingualism */
  "lang": {
    "translations": {
      "de": {
       
        "finish": "Fertig"
       
      },
      "en": {
        
        "finish": "Finish"
        
      }
    },
    "active": "de"
  }
};
