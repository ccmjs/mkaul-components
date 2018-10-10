/**
 * @overview configurations of ccm component
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",
    delay: 500,
    html: {
      main: {
        inner: [
          { tag: 'h2', inner: [
              'Autos im Parkhaus: &nbsp; ',
              { tag: 'span', class: 'counter', inner: '0' }
            ] },
          { tag: 'img', class: 'entry', src: 'https://ccmjs.github.io/mkaul-components/parkhaus/resources/car.png', width: '202', height: '74' },
          { tag: 'img', class: 'ampel', src: 'https://ccmjs.github.io/mkaul-components/parkhaus/resources/traffic-light-red.png', width: '55', height: '155' },
          { tag: 'img', class: 'garage', src: 'https://ccmjs.github.io/mkaul-components/parkhaus/resources/parking_garage.png', width: '250', height: '235' },
          { tag: 'img', class: 'exit', src: 'https://ccmjs.github.io/mkaul-components/parkhaus/resources/empty.png', width: '202', height: '74' },
          { tag: 'hr' },
          { tag: 'button', class: 'enter', onclick: '%enter%', inner: 'Enter', title: 'Drive your car into the garage!' },
          { tag: 'button', class: 'leave', onclick: '%leave%', inner: 'Leave', title: 'Leave the garage!' },
          { tag: 'hr' },
          { tag: 'table', inner: [
              { tag: 'tr', inner: [ { tag: 'th', inner: 'Nr', title: 'Nr des Autos' }, { tag: 'th', inner: 'Von', title: 'Startzeit des Parkens' }, { tag: 'th', inner: 'Bis', title: 'Endzeit des Parkens' }, { tag: 'th', inner: 'Dauer', title: 'Wie lange war das Auto im Parkhaus?' }, { tag: 'th', inner: 'Preis', title: 'Parkgebühren' } ] }
            ] }
        ]
      },
      row: { tag: 'tr', inner: [ { tag: 'td', inner: '%nr%' }, { tag: 'td', inner: '%von%' }, { tag: 'td', inner: '%bis%' }, { tag: 'td', inner: '%dauer%' }, { tag: 'td', inner: '%preis%' } ] }
    },
    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/parkhaus/resources/default.css' ]
  }
};