
/**
 * @overview configs of ccm component sophist
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT) mkaul2m on 13.06.2019.
 */

ccm.files[ 'configs.js' ] = {

  "demo": {
    "key": "demo",
    "html.main.inner.0.inner": "Demo",
    "data": {
      "store": [ "ccm.store", "https://ccmjs.github.io/mkaul-components/sophist/resources/datasets.js" ],
      "key": "demo"
    }
  },

  "user_story": {
    "key": "user_story",
    "html.main.inner.0.inner": "User Story",
    "headers": ["Als","Rolle","möchte ich","Ziel/Wunsch","um","Nutzen", "Buttons"],
    "columns": ["as","role","verb","goal_objective","to","benefit"],
    "initial_values": {
      "as": "Als",
      "role": "Rolle",
      "verb": "möchte ich",
      "goal_objective": "Ziel, Wunsch",
      "to": "um",
      "benefit": "Nutzen",
    },
    "data": {
      "store": [ "ccm.store", "https://ccmjs.github.io/mkaul-components/sophist/resources/datasets.js" ],
      "key": "user_story"
    },
    "form": {
      "as": { "tag": "span", "inner": "Als" },
      "role": { "tag": "input", "type": "text", "class": "role", "value": "%role%" },
      "verb": { "tag": "span", "inner": "möchte ich" },
      "goal_objective": { "tag": "input", "type": "text", "class": "goal_objective", "value": "%goal_objective%" },
      "to": { "tag": "span", "inner": "um" },
      "benefit": { "tag": "input", "type": "text", "class": "benefit", "value": "%benefit%" }
    }
  },

  "ohne_Bedingung": {
    "key": "ohne_Bedingung",
    "html.main.inner.0.inner": "Ohne Bedingung",
    "data": {
      "store": [ "ccm.store", "https://ccmjs.github.io/mkaul-components/sophist/resources/datasets.js" ],
      "key": "demo"
    }
  },

  "mit_Bedingung": {
    "key": "mit_Bedingung",
    "html.main.inner.0.inner": "Mit Bedingung",
    "headers": ["Bedingung","Verbindlichkeit","Systemname","Funktionalität","Objekt","Prozesswort", "Buttons"],
    "columns": ["condition","modal","system","func","object","process"],
    "initial_values": {
      "condition": "Bedingung",
      "system": "das System",
      "object": "Objekt",
      "process": "Prozesswort"
    },
    "data": {
      "store": [ "ccm.store", "https://ccmjs.github.io/mkaul-components/sophist/resources/datasets.js" ],
      "key": "mit_Bedingung"
    }
  },

  "local_persistence": {
    "key": "local_persistence",
    "html.main.inner.0.inner": "Lokal persistent im Browser Store",
    "data": {
      "store": [ "ccm.store", { "name": "sophist_db" } ],
      "key": "sophist_demo"
    }
  },

  "remote_persistence": {
    "key": "remote_persistence",
    "html.main.inner.0.inner": "Remote persistent durch Server Datenbank",
    "data": {
      "store": [ "ccm.store", { "url": "https://ccm2.inf.h-brs.de", "name": "sophist_db", "dataset": "sophist_demo" } ],
      "key": "sophist_demo"
    }
  },

  "websockets": {
    "key": "websockets",
    "html.main.inner.0.inner": "Kollaboration via WebSockets",
    "data": {
      "store": [ "ccm.store", { "url": "wss://ccm2.inf.h-brs.de", "name": "sophist_db", "dataset": "sophist_demo" } ],
      "key": "sophist_demo"
    }
  },

  "submit": {

    "css": [ "ccm.load",
      { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css" },
      "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css"
    ],

    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.2.0.js", {
      "realm": "hbrsinfpseudo", "logged_in": true } ],


    // sophist as special input type
    "sophist": ["ccm.component","https://ccmjs.github.io/mkaul-components/sophist/versions/ccm.sophist-3.1.1.js", {
      "html.main.inner.0.inner": "User Story",
      "headers": ["Als","Rolle","möchte ich","Ziel/Wunsch","um","Nutzen", "Buttons"],
      "columns": ["as","role","verb","goal_objective","to","benefit"],
      "initial_values": {
        "as": "Als",
        "role": "Rolle",
        "verb": "möchte ich",
        "goal_objective": "Ziel, Wunsch",
        "to": "um",
        "benefit": "Nutzen",
      },
      "form": {
        "as": { "tag": "span", "inner": "Als" },
        "role": { "tag": "input", "type": "text", "class": "role", "value": "%role%" },
        "verb": { "tag": "span", "inner": "möchte ich" },
        "goal_objective": { "tag": "input", "type": "text", "class": "goal_objective", "value": "%goal_objective%" },
        "to": { "tag": "span", "inner": "um" },
        "benefit": { "tag": "input", "type": "text", "class": "benefit", "value": "%benefit%" }
      }
    }],

    // sophist as nested content
    "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.2.1.js", {
      "sophist": ["ccm.component","https://ccmjs.github.io/mkaul-components/sophist/versions/ccm.sophist-3.1.1.js", {
        "html.main.inner.0.inner": "Demo",
        "data": {
          "store": [ "ccm.store", "https://ccmjs.github.io/mkaul-components/sophist/resources/datasets.js" ],
          "key": "demo"
        }
      }],
    } ],


    "data": {
      "login": true,
      "store": [ "ccm.store", {
        "url": "https://ccm2.inf.h-brs.de",
        "name": "sophist",
        "method": "POST"
      } ],
      "user": true
    },
    "onfinish": {
      "login": true,
      "store": {
        "settings": {
          "url": "https://ccm2.inf.h-brs.de",
          "name": "sophist",
          "method": "POST"
        },
        "user": true,
        "permissions": {
          "creator": "4c9d704dfcb512873c39ddeefdd559e1",
          "realm": "hbrsinfpseudo",
          "group": {
            "studi": [ "%user%" ],
            "admingroup": [ "479e5f8396cec7afccd68b097eabe5f9", "4c9d704dfcb512873c39ddeefdd559e1" ],
            "studigroup": [ "479e5f8396cec7afccd68b097eabe5f9", "4c9d704dfcb512873c39ddeefdd559e1", "%user%" ]
          },
          "access": { "get": "studigroup", "set": "studigroup", "del": "admingroup" }
        }
      },
      "alert": "Gesichert!"
    }
  }

};
