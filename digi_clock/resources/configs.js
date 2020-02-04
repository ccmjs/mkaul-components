
/**
 * @overview configs of ccm component digi_clock
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT) Manfred Kaul <manfred.kaul@h-brs.de> 2020 on 26.01.2020.
 */

ccm.files[ 'configs.js' ] = {

  "local": {
    key: "local",
    timeout: 490,
  },

  "demo": {
    key: "demo",
    timeout: 1000,
  },

  "builder": {
    "_id": "clock_builder",
    "entries": [
      "<div class=\"page-header\"><h2>Settings <small class=\"text-primary\">Clock</small></h2></div>",
      "<legend>Layout</legend>",
      {
        "label": "Font Size",
        "name": "fontsize",
        "type": "range",
        "min": 1,
        "max": 20,
        "step": 0.1,
        "info": "Font Size of digits im rem"
      },
      {
        "label": "Color",
        "name": "color",
        "type": "color",
        "info": "Color of digits"
      },
      {
        "label": "Background Color",
        "backgroundcolor": "color",
        "type": "color",
        "info": "Background Color of clock"
      },
      "<legend>Frequency</legend>",
      {
        "label": "Timeout",
        "name": "timeout",
        "type": "number",
        "min": 10,
        "info": "Number of Milliseconds for Refresh Cycle"
      },
      {
        "label": "Blink",
        "name": "blink",
        "type": "checkbox",
        "info": "Should delimiters blink? true / false"
      },
      "<legend>Structure</legend>",
      {
        "name": "html",
        "type": "hidden"
      },
      {
        "label": "HTML Structure",
        "name": "html.main",
        "type": "json_builder",
        "info": "Structure of display"
      },
    ],
    "json_builder": [
      "ccm.component",
      "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.4.2.js",
      {
        "html.inner.1": "",
        "directly": true
      }
    ],
    "helper": [
      "ccm.load",
      {
        "url": "https://ccmjs.github.io/akless-components/modules/helper.mjs"
      }
    ],
    "meta": [
      {
        "name": "dms-apps",
        "url": "https://ccm2.inf.h-brs.de"
      },
      "1576007697270X605402336542306"
    ],
    "created_at": "2019-12-10T20:54:57+01:00",
    "updated_at": "2019-12-10T21:42:23+01:00",
    "_": {
      "access": {
        "get": "all",
        "set": "creator",
        "del": "creator"
      },
      "creator": "mkaul2m",
      "realm": "hbrsinfkaul"
    },
    "css": [
      "ccm.load",
      {
        "context": "head",
        "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css"
      },
      "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
      "https://ccmjs.github.io/akless-components/submit/resources/default.css"
    ],
    "data": {
      "store": [
        "ccm.store"
      ]
    },
    "html": {
      "entry": {
        "class": "form-group"
      },
      "label": {
        "tag": "label",
        "class": "item-label",
        "inner": "%label%"
      },
      "info": {
        "tag": "span",
        "class": "info",
        "inner": [
          {
            "tag": "input",
            "type": "checkbox",
            "id": "%id%"
          },
          {
            "tag": "label",
            "for": "%id%",
            "inner": {
              "tag": "span",
              "class": "info-icon glyphicon glyphicon-info-sign"
            }
          },
          {
            "tag": "span",
            "class": "alert alert-info",
            "inner": "%info%"
          }
        ]
      }
    }
  }
};
