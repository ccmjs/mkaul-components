/**
 * @overview configurations of ccm component for submit
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "local": {
    "blank": [ "ccm.component", "../blank/ccm.blank.js" ],
    "data": {
      "store": [ "ccm.store", "../submit/resources/datasets.js" ],
      "key": "test"
    },
    "onfinish": {
      "store_settings": { "store": "submit", "url": "https://ccm.inf.h-brs.de" },
      "permissions": {
        "creator": "akless2m",
        "group": {
          "mkaul2m": true,
          "akless2m": true
        },
        "access": {
          "get": "all",
          "set": "creator",
          "del": "group"
        }
      },
      "log": true
    }
  }
};