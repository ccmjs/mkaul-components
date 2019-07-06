
/**
 * @overview configs of ccm component sophist
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT) mkaul2m on 13.06.2019.
 */

ccm.files[ 'configs.js' ] = {

  "demo": {
    key: "demo",
    data: {
      "store": [ "ccm.store", 'https://ccmjs.github.io/mkaul-components/sophist/resources/datasets.js' ],
      "key": "demo"
    }
  },

  "ohne_Bedingung": {
    key: "ohne_Bedingung",
    data: {
      "store": [ "ccm.store", 'https://ccmjs.github.io/mkaul-components/sophist/resources/datasets.js' ],
      "key": "demo"
    }
  },

  "mit_Bedingung": {
    key: "mit_Bedingung",
    headers: ["Bedingung","Verbindlichkeit","Systemname","Funktionalität","Objekt","Prozesswort", "Buttons"],
    columns: ["condition","modal","system","func","object","process"],
    initial_values: {
      condition: "Bedingung",
      system: "das System",
      object: "Objekt",
      process: "Prozesswort"
    },
    data: {
      "store": [ "ccm.store", 'https://ccmjs.github.io/mkaul-components/sophist/resources/datasets.js' ],
      "key": "mit_Bedingung"
    }
  },

  "local_persistence": {
    key: "local_persistence",
    data: {
      "store": [ "ccm.store", { name: 'sophist_db' } ],
      key: "sophist_demo"
    }
  },

  "remote_persistence": {
    key: "remote_persistence",
    data: {
      "store": [ "ccm.store", { url: 'https://ccm2.inf.h-brs.de', name: 'sophist_db', dataset: 'sophist_demo' } ],
      key: "sophist_demo"
    }
  },

  "websockets": {
    key: "websockets",
    data: {
      "store": [ "ccm.store", { url: 'wss://ccm2.inf.h-brs.de', name: 'sophist_db', dataset: 'sophist_demo' } ],
      key: "sophist_demo"
    }
  }

};
