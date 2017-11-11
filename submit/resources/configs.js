/**
 * @overview configurations of ccm component for submit
 * @author André Kless <andre.kless@web.de> 2017
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "local": {
    "rating": [ "ccm.component", "//tkless.github.io/ccm-components/thumb_rating/versions/ccm.thumb_rating-1.0.0.js", [ "ccm.get", "//tkless.github.io/ccm-components/thumb_rating/resources/configs.js", "demo" ] ],
    "data": {
      "store": [ "ccm.store", "../submit/resources/datasets.js" ],
      "key": "test"
    },
    "onfinish": {
      "store_settings": { "store": "submit", "url": "//ccm.inf.h-brs.de" },
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
  },

  "demo": {
    "rating": [ "ccm.component", "//tkless.github.io/ccm-components/thumb_rating/versions/ccm.thumb_rating-1.0.0.js", {
      "key": [ "ccm.get", "//tkless.github.io/ccm-components/thumb_rating/resources/configs.js", "demo" ],
      "data": {
        "store": [ "ccm.store", { "store": "submit_rating", "url": "wss://ccm.inf.h-brs.de" } ]
      }
    } ],
    "data": {
      "store": [ "ccm.store", "../submit/resources/datasets.js" ],
      "key": "test"
    },
    "user": [ "ccm.instance", "//akless.github.io/ccm-components/user/versions/ccm.user-2.0.0.min.js", { "sign_on": "hbrsinfkaul" } ],
    "onfinish": {
      "store_settings": { "store": "submit", "url": "//ccm.inf.h-brs.de" },
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