/**
 * @overview configurations of ccm component
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",
    language: 'en',
    languages: {
      en: {
        task: 'Is the sum of digits even or odd?',
        even: 'even',
        odd: 'odd',
        start_button: 'Start',
        stopp_button: 'Stopp',
        success_rate: 'success rate',
        average_time: 'average time',
        seconds: 'seconds'
      },
      de: {
        task: 'Ist die Quersumme gerade oder ungerade?',
        even: 'gerade',
        odd: 'ungerade',
        start_button: 'Start',
        stopp_button: 'Stopp',
        success_rate: 'Erfolgsrate',
        average_time: 'Durchschnittliche Reaktionszeit',
        seconds: 'Sekunden'
      }
    },
    number_range_max_exponent: 6,
    number_range_exponent: 2
  }
};