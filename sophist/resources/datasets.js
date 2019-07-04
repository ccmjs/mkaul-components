
/**
 * @overview datasets for ccm component sophist
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 13.06.2019.
 */

ccm.files[ 'datasets.js' ] = {

  "demo": {
    "key": "demo",
    "rows": [
      {
        system: "Das System",
        modal: "MUSS",
        func: "die Möglichkeit bieten",
        object: "die Bezahlung",
        process: "zu berechnen"
      },
      {
        system: "Das Kassensystem",
        modal: "SOLLTE",
        func: "fähig sein",
        object: "die Daten",
        process: "zu speichern"
      }
    ]

  },

  "mit_Bedingung": {
    "key": "mit_Bedingung",
    "rows": [
      {
        condition: "Falls Fehler auftritt",
        system: "Das System",
        modal: "MUSS",
        func: "die Möglichkeit bieten",
        object: "die Bezahlung",
        process: "zu berechnen"
      },
      {
        condition: "Falls es regnet",
        system: "Das Kassensystem",
        modal: "SOLLTE",
        func: "fähig sein",
        object: "die Daten",
        process: "zu speichern"
      }
    ]
  }
};
