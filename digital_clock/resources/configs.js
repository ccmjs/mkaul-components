/**
 * @overview configurations of ccm component
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    beep: true,  // sound is on
    html: {
      main: { class: "digital_clock",
        inner: [
          { tag: 'span', class: 'stunden', inner: '00' }, ' : ',
          { tag: 'span', class: 'minuten', inner: '00' }, ' : ',
          { tag: 'span', class: 'sekunden', inner: '00' },
          { inner: [
              { tag: 'button', class: 'clear', inner: 'clear' },
              { tag: 'button', class: 'set', inner: 'set' },
              { tag: 'button', class: 'inc', inner: 'inc' }
            ] }
        ]
      }
    },
    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/digital_clock/resources/default.css' ],
  }
};