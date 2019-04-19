
/**
 * @overview configs of ccm component greta_thunberg_counter
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT) mkaul2m on 31.03.2019.
 */

ccm.files[ 'configs.js' ] = {
  "demo": {
    key: "demo",
    html: {
      timer: {
        class: "timer",
        inner: "Noch %years% Jahre, %months% Monate, %days% Tage, %hours% Stunden, %min% Minuten, %sec% Sekunden und %msec% Millisekunden, bis sich das Klima unumkehrbar wandelt."
      },
      message: {
        class: "message",
        inner: "Jetzt handeln!"
      }
    },

    message: {
      interval: 3000, // millisconds
      duration: 1000  // millisconds
    },

    frames_per_second: 25,

    host: {
      "font-family": "Helvetica, Arial, sans-serif",
      "border": "outset 1rem cyan"
    },

    style: {
      timer: {
        "padding": "3px",
        "text-align": "center",
        "color": "red",
        "background-color": "white",
        "font-size": "x-large",
        "font-weight": "bold"
      },
      message: {
        "padding": "3rem",
        "text-align": "center",
        "background-color": "black",
        "color": "white",
        "font-size": "xx-large",
        "font-weight": "bolder"
      }
    }
  }
};
