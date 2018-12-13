
/**
 * @overview configs of ccm component html2json
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    "data": {
      inner: '<h1>HTML2JSON with <i>ccm</i> components</h1><ccm-clock></ccm-clock><p>from config</p> ',
      position: 6, // cursor position
      dependencies: {
        clock: [
          "ccm.component",
          "https://ccmjs.github.io/mkaul-components/clock/versions/ccm.clock-3.0.1.js",
          { width: '10em' }
        ]
      }
    }
  },
  "html": {
    id: 'main',
    inner: [
      { id: 'preview'},
      { id: 'html', inner: '%html%' },
      { id: 'json_root', tag: 'pre', inner: { id: 'json' } }
    ]
  }
};
