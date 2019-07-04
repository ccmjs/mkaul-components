
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
    headers: ["Bedingung","Systemname","Verbindlichkeit","Funktionalität","Objekt","Prozesswort", "Buttons"],
    columns: ["condition","system","modal","func","object","process"],
    initial_values: {
      condition: "Bedingung",
      system: "Das System",
      object: "Objekt",
      process: "Prozesswort"
    },
    data: {
      "store": [ "ccm.store", 'resources/datasets.js' ],
      "key": "mit_Bedingung"
    }
  },
};
