
/**
 * @overview configs of ccm component treecontent
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT) mkaul2m on 29.01.2019.
 */

ccm.files[ 'configs.js' ] = {
  "void": {
    key: "void",
    "header": "Empty Tree Content",
    data: {
      "store": [ "ccm.store", 'https://ccmjs.github.io/mkaul-components/treecontent/resources/datasets.js' ],
      "key": "void"
    }
  },
  "small": {
    key: "small",
    "header": "Small size Tree Content",
    data: {
      "store": [ "ccm.store", 'https://ccmjs.github.io/mkaul-components/treecontent/resources/datasets.js' ],
      "key": "small"
    }
  },
  "medium": {
    key: "medium",
    "header": "Medium size Tree Content",
    data: {
      "store": [ "ccm.store", 'https://ccmjs.github.io/mkaul-components/treecontent/resources/datasets.js' ],
      "key": "medium"
    }
  },
  "leitbild": {
    key: "leitbild",
    header: "Leitbild Lehre",
    data: {
      "store": [ "ccm.store", 'https://ccmjs.github.io/mkaul-components/treecontent/resources/datasets.js' ],
      "key": "leitbild"
    }
  },
  "collab": {
    "key": "collab",
    "data": {
      "store": [ "ccm.store", { "name": "treecontent", "url": "wss://ccm2.inf.h-brs.de" } ],
      "key": "collab"
    }
  }
};
