
/**
 * @overview configs of ccm component notebook
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT) mkaul2m on 07.02.2019.
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",
    title: "First little demo",
    data: {
      "store": [ "ccm.store", 'https://ccmjs.github.io/mkaul-components/notebook/resources/datasets.js' ],
      "key": "small"
    },
  },
  "browser_store": {
    key: "browser_store",
    title: "Browser Store: Client-only App with IndexedDB.",
    data: {
      "store": [ "ccm.store", { name: 'notebook', dataset: "test" } ],
      "key": "test"
    }
  },
  "https_store": {
    key: "https_store",
    title: "Server Store: Save on server via https.",
    data: {
      "store": [ "ccm.store", { name: 'notebook', url: 'https://ccm2.inf.h-brs.de', dataset: "test" } ],
      "key": "test"
    }
  },
  "wss_store": {
    key: "wss_store",
    title: "Realtime Collaboration via WebSockets",
    data: {
      "store": [ "ccm.store", { name: "notebook", url: "wss://ccm2.inf.h-brs.de", dataset: "test" } ],
      "key": "test"
    }
  },
  "leitbild_lehre": {
    key: "leitbild_lehre",
    title: "Leitbild Lehre",
    data: {
      "store": [ "ccm.store", { name: "notebook", url: "wss://ccm2.inf.h-brs.de", dataset: "leitbild_lehre" } ],
      "key": "leitbild_lehre"
    },
  },
};
