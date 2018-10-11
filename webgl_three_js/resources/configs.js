/**
 * @overview configurations of ccm component
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",
    html: {
      main: {
        inner: [
          { tag: 'h1', inner: 'WebGL Demo with three.js' },
          { tag: 'button', class: 'start', inner: 'Stopp!' },
          { tag: 'input', class: 'range', type: 'range', min: 1, max: 50, step: 1, value: 1 },
          { tag: 'span', inner: '1' },
          { tag: 'br' }
        ]
      }
    }
  }
};