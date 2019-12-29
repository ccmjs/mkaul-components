/**
 * @overview configs of ccm component peer_builder
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT) Manfred Kaul <manfred.kaul@h-brs.de> 2019 on 25.12.2019.
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",
    taskgroup: "le05_a1",
    number_peers: 3,
    above_min_percent: 10,
    peers_key_prefix: "review",
    // ignore: [ "admin", "lecturer" ],  // user ids to be ignored in review process
    data: {
      "login": true,
      "store": [ "ccm.store", {
        "url": "https://ccm2.inf.h-brs.de",
        "name": "we_ws19_solutions",
        "method": "POST"
      } ],
      "user": true
    },
    user:   [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.0.js", { realm: "hbrsinfpseudo" } ]
  },
  "demo_dataset": {
    key: "demo_dataset",
    taskgroup: "le05_a1",
    data: {
      "store": [ "ccm.store", 'https://ccmjs.github.io/mkaul-components/peer_builder/resources/datasets.js' ],
      // "store": [ "ccm.store", './resources/datasets.js' ],
      "key": "demo"
    },
    user:   [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.0.js", { realm: "hbrsinfpseudo" } ]
  }
};
