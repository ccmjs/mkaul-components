/**
 * @overview configurations of ccm component difference chart
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "edit": {
    "pairs": [
      ["Erwartungen-entsprochen", "nicht-entsprochen"],
      ["unerfreulich", "erfreulich"],
      ["unverständlich", "verständlich"],
      ["leicht zu lernen", "schwer zu lernen"]
    ],
    "values": [
      [1, 3, 4, 5],
      [5, 4, 3, 1],
      [2, 4, 5, 5],
      [3, 5, 2, 4]
    ],
    "raster": [1, 2, 3, 4, 5],
    "colors": ["red", "blue", "orange", "green"],
    "html": {
      "main": {
        "tag": "svg",
        "style": "border: green solid; margin: 2px;",
        "viewBox": "0 0 600 110",
        "inner": [
          {"tag": "rect", "stroke": "grey", "x": 180, "y": 20, "width": 250, "height": 80, "fill": "transparent"}]
      }
    }
  },

  "demo": {
    pairs: [
      ['Erwartungen-entsprochen', 'nicht-entsprochen'],
      ['unerfreulich', 'erfreulich'],
      ['unverständlich', 'verständlich'],
      ['leicht zu lernen', 'schwer zu lernen']
    ],
    values: [
      [ 1, 3, 4, 5 ],
      [ 5, 4, 3, 1 ],
      [ 2, 4, 5, 5 ],
      [ 3, 5, 2, 4 ]
    ],
    raster: [1,2,3,4,5],
    colors: ['red','blue','orange','green'],
    html: {
      main:  {
        tag: 'svg', // no width and height meaning responsive 100%
        style: 'border: green solid; margin: 2px;',
        viewBox: "0 0 600 110", // user coordinates
        // transform: "translate(10, 10)",
        inner: [
          { tag: 'rect', stroke: 'grey', x: 180, y: 20, width: 250, height: 80, fill: "transparent" }
        ]
      }
    },

    css: [ 'ccm.load',  '//kaul.inf.h-brs.de/data/ccm/difference_chart/resources/default.css' ],
    // css: [ 'ccm.load',  'https://mkaul.github.io/ccm-components/difference_chart/resources/default.css' ],
    // user:   [ 'ccm.instance', 'https://akless.github.io/ccm-components/user/versions/ccm.user-2.0.0.min.js' ],
    // logger: [ 'ccm.instance', 'https://akless.github.io/ccm-components/log/versions/ccm.log-1.0.0.min.js', [ 'ccm.get', 'https://akless.github.io/ccm-components/log/resources/log_configs.min.js', 'greedy' ] ],
    // onfinish: function( instance, results ){ console.log( results ); }
  },
  "research": {
    pairs: [
      ['Erwartungen-entsprochen', 'nicht-entsprochen'],
      ['unerfreulich', 'erfreulich'],
      ['unverständlich', 'verständlich'],
      ['leicht zu lernen', 'schwer zu lernen'],
      ['erfrischend', 'einschläfernd'],
      ['langweilig', 'spannend'],
      ['uninteressant', 'interessant'],
      ['unberechenbar', 'voraussagbar'],
      ['schnell', 'langsam'],
      ['neu', 'alt'],
      ['unbedienbar', 'bedienbar'],
      ['gut', 'schlecht'],
      ['kompliziert', 'einfach'],
      ['abstoßend', 'anziehend'],
      ['veraltet', 'modern'],
      ['unangenehm', 'angenehm'],
      ['problemorientiert', 'theoretisch'],
      ['abwechslungsreich', 'eintönig'],
      ['zuverlässig', 'unzuverlässig'],
      ['ineffizient', 'effizient'],
      ['übersichtlich', 'verwirrend'],
      ['stockend', 'flüssig'],
      ['aufgeräumt', 'überladen'],
      ['nützlich', 'zeitverschwendend'],
      ['sympathisch', 'unsympathisch'],
      ['unauffällig', 'auffällig'],
      ['strukturiert', 'chaotisch'],
      ['Konstruktiv', 'Destruktiv'],
      ['Aktiv', 'Passiv'],
      ['Kooperativ', 'Nicht-kooperativ'],
      ['Zweckbestimmt', 'Zweckfrei'],
      ['Kontext-orientiert', 'Kontextlos'],
      ['Vorwissen-berücksichtigend', 'Vorwissen-ignorierend'],
      ['Praktisch', 'Theoretisch'],
      ['Reflektierend', 'Gedankenlos'],
      ['Fließend', 'Stockend'],
      ['Innovativ', 'Alt-bekannt']
    ],
    values: [
      [
        "3.01",
        "5.12",
        "5.40",
        "4.13",
        "3.80",
        "5.05",
        "5.19",
        "4.41",
        "4.65",
        "4.43",
        "4.78",
        "4.00",
        "4.46",
        "4.76",
        "5.17",
        "4.77",
        "4.08",
        "3.70",
        "4.63",
        "4.69",
        "4.08",
        "4.66",
        "4.12",
        "4.28",
        "3.62",
        "4.38",
        "4.25",
        "3.81",
        "3.69",
        "3.58",
        "3.70",
        "3.55",
        "3.78",
        "4.08",
        "3.71",
        "4.29",
        "4.35"
      ],
      [
        "2.54",
        "4.92",
        "5.11",
        "3.61",
        "3.99",
        "4.42",
        "4.54",
        "4.33",
        "3.85",
        "4.28",
        "4.65",
        "3.62",
        "4.63",
        "4.43",
        "4.92",
        "4.70",
        "4.10",
        "3.84",
        "3.75",
        "4.92",
        "3.23",
        "4.73",
        "3.48",
        "3.83",
        "3.28",
        "3.94",
        "3.47",
        "3.35",
        "3.36",
        "3.24",
        "3.06",
        "3.10",
        "3.65",
        "4.10",
        "3.47",
        "3.91",
        "4.18"
      ],
      [
        "3.09",
        "4.77",
        "5.02",
        "4.09",
        "4.16",
        "4.95",
        "5.02",
        "4.09",
        "4.76",
        "3.95",
        "4.58",
        "4.05",
        "4.35",
        "4.63",
        "5.21",
        "4.63",
        "3.93",
        "3.88",
        "4.86",
        "4.33",
        "4.12",
        "4.30",
        "4.28",
        "4.40",
        "3.56",
        "4.67",
        "4.21",
        "3.83",
        "3.74",
        "3.95",
        "3.64",
        "3.65",
        "3.47",
        "3.93",
        "3.72",
        "4.36",
        "4.35"
      ],
      [
        "2.47",
        "5.30",
        "5.25",
        "3.58",
        "3.73",
        "4.82",
        "4.91",
        "4.14",
        "3.74",
        "3.43",
        "4.86",
        "3.42",
        "4.23",
        "4.65",
        "5.30",
        "5.00",
        "4.28",
        "3.67",
        "3.79",
        "5.16",
        "3.48",
        "4.88",
        "3.77",
        "3.72",
        "3.19",
        "4.53",
        "3.63",
        "3.35",
        "3.19",
        "2.98",
        "2.93",
        "3.00",
        "3.44",
        "4.28",
        "3.40",
        "3.77",
        "3.53"
      ]
    ],
    raster: [1,2,3,4,5,6,7],
    colors: ['red','blue','orange','green'],
    // ignore: [0,2],
    html: {
      main: {
        tag: 'svg', // no width and height meaning responsive 100%
        style: 'border: green solid; margin: 2px;',
        viewBox: "0 0 600 600", // user coordinates
        // transform: "translate(10, 10)",
        inner: [
          {tag: 'rect', stroke: 'grey', x: 180, y: 20, width: 250, height: 576, fill: "transparent"}
        ]
      }
    }
  }
};