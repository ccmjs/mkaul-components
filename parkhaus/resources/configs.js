/**
 * @overview configurations of ccm component
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    server_url: "http://localhost:8080/DemoServlet",
    delay: 400,
    html: {
      main: {
        inner: [
          { tag: 'h2', inner: [
              'Autos im Parkhaus: &nbsp; ',
              { tag: 'span', class: 'counter', inner: '0' }
            ] },
          { tag: 'img', class: 'entry', src: 'https://ccmjs.github.io/mkaul-components/parkhaus/resources/car.png', width: '202', height: '74' },
          { tag: 'span', class: 'traffic_light' },
          { tag: 'img', class: 'garage', src: 'https://ccmjs.github.io/mkaul-components/parkhaus/resources/parking_garage.png', width: '250', height: '235' },
          { tag: 'img', class: 'exit', src: 'https://ccmjs.github.io/mkaul-components/parkhaus/resources/empty.png', width: '202', height: '74' },
          { tag: 'hr' },
          { tag: 'button', class: 'enter', onclick: '%enter%', inner: 'Enter', title: 'Drive your car into the garage!' },
          { tag: 'button', class: 'leave', onclick: '%leave%', inner: 'Leave', title: 'Leave the garage!' },
          { class: 'extra_buttons' },
          { tag: 'hr' },
          { tag: 'table', inner: [
              { tag: 'tr', inner: [ { tag: 'th', inner: 'Nr', title: 'Nr des Autos' }, { tag: 'th', inner: 'Von', title: 'Startzeit des Parkens' }, { tag: 'th', inner: 'Bis', title: 'Endzeit des Parkens' }, { tag: 'th', inner: 'Dauer', title: 'Wie lange war das Auto im Parkhaus?' }, { tag: 'th', inner: 'Preis', title: 'Parkgebühren' } ] }
            ] }
        ]
      },
      row: { tag: 'tr', inner: [ { tag: 'td', inner: '%nr%' }, { tag: 'td', inner: '%von%' }, { tag: 'td', inner: '%bis%' }, { tag: 'td', inner: '%dauer%' }, { tag: 'td', inner: '%preis%' } ] },
      extra_button_div: { inner: [
          { tag: 'button', class: '%extra_class%', inner: '%extra_inner%', title: '%extra_popup_title%' },
          { tag: 'span', class: '%extra_class%' }
        ] }
    },
    traffic_light: {
      tag: 'svg', viewBox: '0 0 200 500', xmlns: 'http://www.w3.org/2000/svg', width: '40', height: '100', inner: [
        {
          "tag": "rect",
          "style": "fill: rgb(100, 86, 86);",
          "width": "200",
          "height": "500",
          "rx": "30",
          "ry": "30"
        },
        {
          "tag": "circle",
          "id": "green",
          "style": "fill: rgb(77, 251, 3);",
          "cx": "98.65",
          "cy": "407.68",
          "r": "70.2"
        },
        {
          "tag": "circle",
          "id": "yellow",
          "style": "fill: rgb(239, 251, 3);",
          "cx": "98.78",
          "cy": "247.42",
          "r": "70.2"
        },
        {
          "tag": "circle",
          "id": "red",
          "style": "fill: rgb(251, 3, 3);",
          "cx": "99.55",
          "cy": "81.53",
          "r": "70.2"
        }
      ]
    },
    css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/parkhaus/resources/default.css' ]
  },
  "server": {
    server_url: "http://localhost:8080/DemoServlet",
    delay: 400,
    html: {
    main: {
      inner: [
        { tag: 'h2', inner: [
            'Autos im Parkhaus: &nbsp; ',
            { tag: 'span', class: 'counter', inner: '0' }
          ] },
        { tag: 'img', class: 'entry', src: 'https://ccmjs.github.io/mkaul-components/parkhaus/resources/car.png', width: '202', height: '74' },
        { tag: 'span', class: 'traffic_light' },
        { tag: 'img', class: 'garage', src: 'https://ccmjs.github.io/mkaul-components/parkhaus/resources/parking_garage.png', width: '250', height: '235' },
        { tag: 'img', class: 'exit', src: 'https://ccmjs.github.io/mkaul-components/parkhaus/resources/empty.png', width: '202', height: '74' },
        { tag: 'hr' },
        { tag: 'button', class: 'enter', onclick: '%enter%', inner: 'Enter', title: 'Drive your car into the garage!' },
        { tag: 'button', class: 'leave', onclick: '%leave%', inner: 'Leave', title: 'Leave the garage!' },
        { class: 'extra_buttons' },
        { tag: 'hr' },
        { tag: 'table', inner: [
            { tag: 'tr', inner: [ { tag: 'th', inner: 'Nr', title: 'Nr des Autos' }, { tag: 'th', inner: 'Von', title: 'Startzeit des Parkens' }, { tag: 'th', inner: 'Bis', title: 'Endzeit des Parkens' }, { tag: 'th', inner: 'Dauer', title: 'Wie lange war das Auto im Parkhaus?' }, { tag: 'th', inner: 'Preis', title: 'Parkgebühren' } ] }
          ] }
      ]
    },
    row: { tag: 'tr', inner: [ { tag: 'td', inner: '%nr%' }, { tag: 'td', inner: '%von%' }, { tag: 'td', inner: '%bis%' }, { tag: 'td', inner: '%dauer%' }, { tag: 'td', inner: '%preis%' } ] },
    extra_button_div: { inner: [
      { tag: 'button', class: '%extra_class%', inner: '%extra_inner%', title: '%extra_popup_title%' },
      { tag: 'span', class: '%extra_class%' }
    ] }
  },
  extra_buttons: [
    {
      extra_class: 'sum',
      extra_inner: 'Sum',
      extra_popup_title: 'Sum of all parking fees'
    }
  ],
    traffic_light: {
    tag: 'svg', viewBox: '0 0 200 500', xmlns: 'http://www.w3.org/2000/svg', width: '40', height: '100', inner: [
      {
        "tag": "rect",
        "style": "fill: rgb(100, 86, 86);",
        "width": "200",
        "height": "500",
        "rx": "30",
        "ry": "30"
      },
      {
        "tag": "circle",
        "id": "green",
        "style": "fill: rgb(77, 251, 3);",
        "cx": "98.65",
        "cy": "407.68",
        "r": "70.2"
      },
      {
        "tag": "circle",
        "id": "yellow",
        "style": "fill: rgb(239, 251, 3);",
        "cx": "98.78",
        "cy": "247.42",
        "r": "70.2"
      },
      {
        "tag": "circle",
        "id": "red",
        "style": "fill: rgb(251, 3, 3);",
        "cx": "99.55",
        "cy": "81.53",
        "r": "70.2"
      }
    ]
  },
  css: [ 'ccm.load',  'https://ccmjs.github.io/mkaul-components/parkhaus/resources/default.css' ]
}
};