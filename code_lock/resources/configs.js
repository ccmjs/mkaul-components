
/**
 * @overview configs of ccm component code_lock
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT) mkaul2m on 06.05.2019.
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",
    length: 4,
    code: "e2fc714c4727ee9395f324cd2e7f331f",
    html: {
      main: {
        inner: [
          { class: 'open' },
          { class: 'code' },
          { class: 'buttons', inner: [
              { tag: 'button', id: 'a', inner: 'A', onclick: '%onclick%' },
              { tag: 'button', id: 'b', inner: 'B', onclick: '%onclick%' },
              { tag: 'button', id: 'c', inner: 'C', onclick: '%onclick%' },
              { tag: 'button', id: 'd', inner: 'D', onclick: '%onclick%' }
            ]
          }
        ]
      }
    },
    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/code_lock/resources/default.css' ],

    hash: [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/md5.js", "type": "module" } ]

  }
};
