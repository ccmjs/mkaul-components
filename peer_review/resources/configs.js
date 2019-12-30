
/**
 * @overview configs of ccm component peer_review
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT) Manfred Kaul <manfred.kaul@h-brs.de> 2019 on 22.12.2019.
 */

ccm.files[ 'configs.js' ] = {
  "local": {
    key: "local",

    // peer data
    taskgroup: "le05_a1",
    task_formats: {
      Einkaufsliste: "html",
      script: "js"
    },

    peers: {
      // store: [ "ccm.store", "./resources/datasets.js" ],
      // key: "demo"
      store: [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "we_ws19_solutions" } ],
      key: [ "review", "le05_a1" ]
    },

    peer_texts: {
      store: [ "ccm.store", { name: "we_ws19_solutions", url: "https://ccm2.inf.h-brs.de" } ],
      user: true,
      login: true
    }
  },
  "demo": {
    key: "demo",
    data: {
      store: [ "ccm.store", 'https://ccmjs.github.io/mkaul-components/peer_review/resources/datasets.js' ]
    }
  },

  /** for using peer_review as input type **/
  "local_submit_config": {
    key: "local_submit_config",

    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.0.js", { "realm": "hbrsinfpseudo" } ],
    "peer_review": [ "ccm.component", "./ccm.peer_review.js", ["ccm.get","./resources/configs.js","local"] ],
    "data": {
      "login": true,
      "store": [ "ccm.store", {
        "url": "https://ccm2.inf.h-brs.de",
        "name": "we_ws19_solutions",
        "method": "POST"
      } ],
      "user": true
    },
    "onfinish": {
      "login": true,
      "store": {
        "settings": {
          "url": "https://ccm2.inf.h-brs.de",
          "name": "we_ws19_solutions",
          "method": "POST"
        },
        "user": true,
        "permissions": {
          "realm": "hbrsinfpseudo",
          "group": {
            "studi": [ "%user%" ],
            "admingroup": [ "admin" ],
            "studigroup": [ "admin", "%user%" ]
          },
          "access": [
            [ "2019-12-31T08:00", { "get": "studigroup", "set": "studi", "del": "admingroup" } ],
            [ "2020-12-31T08:00", { "get": "all", "set": "admingroup", "del": "admingroup" } ]
          ]
        }
      },
      "alert": "Gesichert!"
    }
  }

};
