
/**
 * @overview configs of ccm component peer_review
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT) Manfred Kaul <manfred.kaul@h-brs.de> 2019 on 22.12.2019.
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",

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
  "demo_dataset": {
    key: "demo_dataset",
    data: {
      store: [ "ccm.store", 'https://ccmjs.github.io/mkaul-components/peer_review/resources/datasets.js' ]
    }
  }

};
