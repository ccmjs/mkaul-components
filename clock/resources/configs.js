/**
 * @overview configurations of ccm component
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "Berlin": {
    key: "Berlin",
    width: "200px",
    title: "Berlin",
    html: {
      main: {
        id: 'main', inner: {id: 'clock'}
      }
    }
  },
  "New_York": {
    key: "New_York",
    width: "200px",
    title: "New York",
    delay: -5,
    color: '#ffffff', // white
    background: '#000000', // black
    html: {
      main: { id: 'main', inner: [
          { id: 'clock' },
          { id: 'date', inner: '%date%' },
          { id: 'time', inner: '%time%' },
          { id: 'title', inner: '%title%', style: 'width: %width%' }
        ]
      }
    },
    css: [ "ccm.load", "https://ccmjs.github.io/mkaul-components/clock/resources/default.css" ]
  },
  "small": {
    key: "small",
    width: "100px",
    html: {
      main: {
        id: 'main', inner: {id: 'clock'}
      }
    }
  },
  "large": {
    key: "large",
    width: "600px",
    html: {
      main: { id: 'main', inner: [
          { id: 'clock' },
          { id: 'date', inner: '%date%' },
          { id: 'time', inner: '%time%' },
          { id: 'title', inner: '%title%', style: 'width: %width%' }
        ]
      }
    }
  }
};